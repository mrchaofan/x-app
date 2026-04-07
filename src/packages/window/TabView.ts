import { View, WebContentsView } from 'electron'
import Window from './Window'
import { Tab } from './Tab'


export default class TabView extends View {
    public webView?: WebContentsView
    constructor(private window: Window, private tab: Tab) {
        super()
        this.on('bounds-changed', this.onResized)
    }
    onSelected = () => {
        if (!this.webView) {
            this.webView = new WebContentsView()
            this.addChildView(this.webView)
            this.onResized()

            this.webView.webContents.on('page-title-updated', (event, title) => {
                this.tab.title = title
            })

            this.webView.webContents.on('page-favicon-updated', (event, favicons) => {
                if (favicons.length > 0) {
                    this.tab.icon = favicons[0]
                }
            })
            this.webView.webContents.setWindowOpenHandler(this.window.windowOpenHandler)
            this.webView.webContents.loadURL(this.tab.url)
        }
        this.webView.webContents.focus()
    }
    onDeselected = () => {

    }
    onResized = () => {
        if (this.webView) {
            this.webView.setBounds(this.getBounds())
        }
    }

    destroy() {
        if (this.webView) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - Undocumented API
            this.webView.webContents.destroy()
            this.webView = undefined
        }
    }
}
