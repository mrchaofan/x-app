import {app, Menu, webContents } from 'electron'
import TabbedWindow from './packages/window/TabbedWindow'
import FloatBall from './packages/float-ball/FloatBall'

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
            ],
        },
    ]))
    const mainWindow = new TabbedWindow({})

    mainWindow.addNewTab('https://www.baidu.com')

    new FloatBall()
})