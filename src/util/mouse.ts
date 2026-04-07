import { screen } from 'electron'
import { EventEmitter } from 'events'

export class Mouse extends EventEmitter {
    private mouseIn_ = false
    private mouseDown_ = false
    constructor(private webContents: Electron.WebContents) {
        super()
        webContents.on('input-event', this.onInputEvent)
    }
    get mouseIn() {
        return this.mouseIn_
    }
    get mouseDown() {
        return this.mouseDown_
    }
    destroy() {
        this.webContents.off('input-event', this.onInputEvent)
    }
    private onInputEvent = (event: Electron.Event, input: Electron.InputEvent) => {
        if (input.type === 'mouseDown') {
            this.mouseDown_ = true
            this.emit('mouse-down')
        } else if (input.type === 'mouseUp') {
            this.mouseDown_ = false
            this.emit('mouse-up')
        } else if (input.type === 'mouseEnter') {
            if (!this.mouseIn_) {
                this.mouseIn_ = true
                this.emit('mouse-enter')
            }
        } else if (input.type === 'mouseLeave') {
            if (this.mouseIn_) {
                this.mouseIn_ = false
                this.emit('mouse-leave')
            }
        } else if (input.type === 'mouseMove') {
            this.emit('mouse-move')
        }
    }
}

export function makeDraggable(window: Electron.BaseWindow, mouse: Mouse) {
    let dragCtx: {
        mX: number
        mY: number
        wX: number
        wY: number
    } | null = null

    mouse.on('mouse-down', () => {
        const cursorPos = screen.getCursorScreenPoint()
        dragCtx = {
            mX: cursorPos.x,
            mY: cursorPos.y,
            wX: window.getBounds().x,
            wY: window.getBounds().y,
        }
    })

    mouse.on('mouse-move', () => {
        if (mouse.mouseDown && dragCtx) {
            const cursorPos = screen.getCursorScreenPoint()
            const deltaX = cursorPos.x - dragCtx.mX
            const deltaY = cursorPos.y - dragCtx.mY
            window.setBounds({
                x: dragCtx.wX + deltaX,
                y: dragCtx.wY + deltaY,
                width: window.getBounds().width,
                height: window.getBounds().height,
            })
        }
    })

    mouse.on('mouse-up', () => {
        dragCtx = null
    })
}