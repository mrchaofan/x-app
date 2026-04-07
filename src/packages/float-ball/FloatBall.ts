import { makeDraggable, Mouse } from '@/util/mouse'
import { BrowserWindow, screen } from 'electron'
import path from 'path'

export default class FloatBall extends BrowserWindow {
    constructor() {
        const workArea = screen.getPrimaryDisplay().workArea
        super({
            x: workArea.x + workArea.width - 60 - 80,
            y: workArea.y + workArea.height - 60 - 20,
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
