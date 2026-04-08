import { BrowserWindow, screen } from 'electron'
import path from 'path'

export class ScreenShotWindow extends BrowserWindow {
    private static instance: ScreenShotWindow | null = null
    static start() {
        if (this.instance) {
            this.instance.focus()
            return
        }
        this.instance = new ScreenShotWindow()
        this.instance.on('closed', () => {
            this.instance = null
        })
    }
    static stop() {
        if (this.instance) {
            this.instance.destroy()
            this.instance = null
        }
    }
    constructor() {
        const bounds = screen.getPrimaryDisplay().bounds
        super({
            type: 'panel',
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
            frame: false,
            transparent: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            show: false,
            hasShadow: false,
            hiddenInMissionControl: true,
            enableLargerThanScreen: true,
            webPreferences: {
                sandbox: false,
                nodeIntegration: true,
                contextIsolation: false,
            },
        })

        this.setAlwaysOnTop(true, 'screen-saver')

        this.setContentProtection(true)

        this.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

        this.webContents.ipc.on('set-ignore-mouse-events', (event: Electron.Event, ignore: boolean) => {
            this.setIgnoreMouseEvents(ignore, {
                forward: true,
            })
        })

        this.loadFile(path.join(__dirname, 'renderer/screenshot.html'))

        setTimeout(() => {
            if (!this.isDestroyed()) {
                this.show()
            }
        }, 0)
    }
}