<template>
  <div class="screen-mask-container">
    <konva-stage ref="stage" :config="stageConfig" @mousedown="handleStageMouseDown">
      <!-- 第一层：实现镂空效果 -->
      <konva-layer>
        <konva-rect :config="fullScreenMask" />
        <konva-rect ref="hole" :config="holeConfig" @dragmove="handleTransform" @transform="handleTransform" />
      </konva-layer>

      <!-- 第二层：UI 装饰层 -->
      <konva-layer>
        <konva-rect :config="selectionBorder" />
        <konva-transformer ref="transformer" :config="transformerConfig" />
      </konva-layer>
    </konva-stage>
  </div>
</template>

<script>

function ensureLargerThan(num1, num2) {
  return Math.max(num1, num2)
}

export default {
  props: {
    initHoleState: {
      type: Object,
      required: false,
    },
  },
  data() {
    let width = window.innerWidth
    let height = window.innerHeight
    const holdState = { x: 0, y: 0, width: 1, height: 1, scaleX: window.innerWidth, scaleY: window.innerHeight }
    if (this.initHoleState) {
      holdState.x = this.initHoleState.x
      holdState.y = this.initHoleState.y
      holdState.scaleX = this.initHoleState.width
      holdState.scaleY = this.initHoleState.height
      width = this.initHoleState.width
      height = this.initHoleState.height
    }
    return {
      stageConfig: { width, height },
      fullScreenMask: {
        x: 0, y: 0, width, height,
        fill: 'rgba(0, 0, 0, 0.5)',
        listening: false,
      },
      isDragging: false,
      // 选区状态
      holeState: holdState,
      firstMouseDown: false,
      pendingHoleState: {
        ...holdState,
      },
      startPos: { x: 0, y: 0 }, // 划选起点
    }
  },
  watch: {
    holeState: {
      handler() {
        this.$emit('hole-state-changed', {
          x: this.holeState.x,
          y: this.holeState.y,
          width: this.holeState.scaleX,
          height: this.holeState.scaleY,
        })
      },
      deep: true,
    },
  },
  computed: {
    holeConfig() {
      return {
        ...this.holeState,
        fill: 'black',
        draggable: true,
        globalCompositeOperation: 'destination-out',
        visible: this.holeState.scaleX !== 0 || this.holeState.scaleY !== 0,
        listening: this.firstMouseDown,
      }
    },
    selectionBorder() {
      return {
        x: this.holeState.x,
        y: this.holeState.y,
        width: this.holeState.width * this.holeState.scaleX,
        height: this.holeState.height * this.holeState.scaleY,
        stroke: '#00a1ff',
        strokeWidth: 2,
        listening: false,
        visible: this.holeState.scaleX !== 0 || this.holeState.scaleY !== 0,
      }
    },
    transformerConfig() {
      return {
        rotateEnabled: false,
        keepRatio: false,
        enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right'],
        anchorSize: 10,
        anchorFill: '#ffffff',
        anchorStroke: '#00a1ff',
        anchorCornerRadius: 5,
        borderStroke: '#00a1ff',
        borderDash: [4, 4],
        visible: this.holeState.scaleX !== 0 || this.holeState.scaleY !== 0,
      }
    },
  },
  mounted() {
    this.updateTransformer()
  },
  methods: {
    // 1. 鼠标按下：开始划选
    handleStageMouseDown(e) {
      const pos = e.target.getStage().getPointerPosition()
      this.startPos = { x: pos.x, y: pos.y }
      // if (e.target !== e.target.getStage()) return;
      if (e.target !== e.target.getStage() && this.$refs.transformer.getStage().nodes().length > 0) {
        return
      }
      this.clearEvent()
      document.addEventListener('mousemove', this.handleStageMouseMove)
      document.addEventListener('mouseup', this.handleStageMouseUp)
      this.isDragging = true
      this.firstMouseDown = true

      this.pendingHoleState = {
        ...this.holeState,
      }

      // 初始化位置
      this.pendingHoleState.x = pos.x
      this.pendingHoleState.y = pos.y
      this.pendingHoleState.scaleX = 0
      this.pendingHoleState.scaleY = 0
      // this.updateTransformer()
    },

    // 2. 鼠标移动：拉伸选区
    handleStageMouseMove(e) {
      if (!this.isDragging) return

      const clientRect = this.$refs.stage.getStage().container().getBoundingClientRect()
      const pos = {
        x: e.clientX - clientRect.left,
        y: e.clientY - clientRect.top,
      }
      this.holeState = this.pendingHoleState
      // 计算宽高（支持四个方向划选）
      this.holeState.x = Math.min(pos.x, this.startPos.x)
      this.holeState.y = Math.min(pos.y, this.startPos.y)

      this.holeState.scaleX = ensureLargerThan(Math.abs(pos.x - this.startPos.x), 10)
      this.holeState.scaleY = ensureLargerThan(Math.abs(pos.y - this.startPos.y), 10)
      this.updateTransformer(true)
    },

    // 3. 鼠标松开：结束划选
    handleStageMouseUp() {
      this.clearEvent()
      if (!this.isDragging) return
      this.isDragging = false

      this.updateTransformer(true)
    },

    updateTransformer(withNode = false) {
      const transformerNode = this.$refs.transformer.getStage()
      if (!withNode) {
        transformerNode.nodes([])
        transformerNode.getLayer().batchDraw()
        return
      }
      const holeNode = this.$refs.hole.getStage()
      transformerNode.nodes([holeNode])
      transformerNode.getLayer().batchDraw()
    },

    handleTransform(e) {
      const node = e.target
      this.holeState.x = node.x()
      this.holeState.y = node.y()
      this.holeState.scaleX = ensureLargerThan(node.scaleX(), 10)
      this.holeState.scaleY = ensureLargerThan(node.scaleY(), 10)
    },
    clearEvent() {
      document.removeEventListener('mousemove', this.handleStageMouseMove)
      document.removeEventListener('mouseup', this.handleStageMouseUp)
    },
  },
  unmounted() {
    this.clearEvent()
  },
}
</script>

<style scoped>
.screen-mask-container {
  position: fixed;
  z-index: 99;
  pointer-events: none;
  background: transparent;
}

.screen-mask-container /deep/ .konvajs-content {
  pointer-events: auto;
}
</style>