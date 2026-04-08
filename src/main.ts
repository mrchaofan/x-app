import { app, Menu, webContents } from 'electron'
import TabbedWindow from './packages/window/TabbedWindow'
import FloatBall from './packages/float-ball/FloatBall'
import { ScreenShotWindow } from './packages/screenshot/Screenshot'

app.whenReady().then(() => {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        const w = webContents.getFocusedWebContents()
                        if (w) {
                            w.openDevTools({
                                mode: 'detach',
                            })
                        }
                    },
                },
                {
                    label: 'Take Screenshot',
                    accelerator: 'CmdOrCtrl+Shift+1',
                    click: () => {
                        ScreenShotWindow.start()
                    },
                },
                {
                    label: 'Stop Screenshot',
                    accelerator: 'Esc',
                    click: () => {
                        ScreenShotWindow.stop()
                    },
                },
            ],
        },
    ]))
    const mainWindow = new TabbedWindow({})

    mainWindow.addNewTab('https://www.baidu.com')

    new FloatBall()
})