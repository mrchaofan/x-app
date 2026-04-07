import { makeDraggable, Mouse } from '@/util/mouse'
import { BrowserWindow, screen } from 'electron'
import path from 'path'

export default class FloatBall extends BrowserWindow {
    constructor() {
        const screenBounds = screen.getPrimaryDisplay().bounds
        super({
            x: screenBounds.width - 60 - 80,
            y: screenBounds.width - 60 - 20,
            width: 60,
            height: 60,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            resizable: false,
            webPreferences: {
                sandbox: false,
                nodeIntegration: true,
                contextIsolation: false,
            },
        })
        makeDraggable(this, new Mouse(this.webContents))
        this.loadFile(path.join(__dirname, 'renderer/float-ball.html'))
    }
}
