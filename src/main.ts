import {app, Menu, webContents } from 'electron'
import Window from './packages/window/Window'
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
    const window = new Window({
        
    })

    window.addNewTab('https://www.baidu.com')

    new FloatBall()
})