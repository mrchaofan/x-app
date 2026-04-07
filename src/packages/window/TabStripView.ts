import { View, WebContentsView } from 'electron'
import path from 'path'
import Window from './Window'


export default class TabStripView extends View {
    private webContentsView: WebContentsView
    private readPromise: Promise<void>
    constructor(public window: Window) {
        super()
        this.webContentsView = new WebContentsView({
            webPreferences: {
                sandbox: false,
                nodeIntegration: true,
                contextIsolation: false,
            },
        })
        this.addChildView(this.webContentsView)

        this.webContentsView.webContents.ipc.on('__request-select-tab', (event, id) => {
            const tab = this.window.tabList.tabs.find(t => t.id === id) ?? null
            if (tab) {
                this.window.tabList.activeTab = tab
            }
        })

        this.webContentsView.webContents.ipc.on('__request-close-tab', (event, id) => {
            const tab = this.window.tabList.tabs.find(t => t.id === id) ?? null
            if (tab) {
                this.window.tabList.removeTab(tab)
            }
        })

        this.on('bounds-changed', () => {
            this.webContentsView.setBounds({
                x: 0,
                y: 0,
                width: this.getBounds().width,
                height: 44,
            })
        })

        this.window.tabList.on('tab-added', async (tab) => {
            tab.on('title-changed', async (title) => {
                await this.readPromise
                this.webContentsView.webContents.send('__update-tab', {
                    id: tab.id,
                    title,
                    icon: tab.icon,
                })
            })

            tab.on('icon-changed', async (icon) => {
                await this.readPromise
                this.webContentsView.webContents.send('__update-tab', {
                    id: tab.id,
                    title: tab.title,
                    icon,
                })
            })

            await this.readPromise
            this.webContentsView.webContents.send('__add-tab', {
                id: tab.id,
                title: tab.title,
                icon: tab.icon,
            })
        })

        this.window.tabList.on('active-tab-changed', async (tab) => {
            await this.readPromise
            this.webContentsView.webContents.send('__select-tab', tab ? tab.id : null)
        })

        this.window.tabList.on('tab-removed', async (tab) => {
            await this.readPromise
            this.webContentsView.webContents.send('__remove-tab', tab.id)
        })

        this.readPromise = this.webContentsView.webContents.loadFile(path.join(__dirname, 'renderer/window.html'))
    }
}