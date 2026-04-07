<template>
    <div class="tab-strip-item" :class="{ active }" @click="$emit('select')">
        <div class="tab-strip-item-icon">
            <img v-if="icon" :src="icon" :alt="title" />
        </div>
        <div class="tab-strip-item-title">
            {{ title }}
        </div>
        <div class="close-btn" @click.stop="$emit('close')">×</div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['select', 'close'])
</script>

<style scoped>
.tab-strip-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 44px;
    cursor: pointer;
    gap: 4px;
    flex: 1 1 auto;
    border: 1px solid transparent;
    max-width: 220px;
}

.tab-strip-item.active {
    border: 1px solid #2b2b2b;
}

.tab-strip-item-icon {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;

    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.tab-strip-item-title {
    font-size: 14px;
    color: #2b2b2b;
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #2b2b2b;
}
</style>