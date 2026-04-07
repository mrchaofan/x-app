import { BaseWindow, HandlerDetails, WindowOpenHandlerResponse } from 'electron'
import { v4 as uuid } from 'uuid'
import TabList from './TabList'
import TabStripView from './TabStripView'
import { Tab } from './Tab'
import TabListView from './TabListView'

export interface IWindowConstructorOptions {
    x?: number
    y?: number
    width?: number
    height?: number
}

export default class Window extends BaseWindow {
    public tabList = new TabList()
    public tabStripView: TabStripView = new TabStripView(this)
    public tabListView = new TabListView(this)
    constructor(private options: IWindowConstructorOptions) {
        super({
            x: options.x,
            y: options.y,
            width: options.width ?? 1300,
            height: options.height ?? 800,
        })
        this.menuBarVisible = false
        this.setMenu(null)

        this.contentView.addChildView(this.tabStripView)
        this.contentView.addChildView(this.tabListView)
        this.tabStripView.setBounds(this.contentView.getBounds())
        this.tabListView.setBounds({
            x: 0,
            y: 44,
            width: this.contentView.getBounds().width,
            height: this.contentView.getBounds().height - 44,
        })

        this.tabList.on('tab-removed', () => {
            if (this.tabList.tabs.length === 0) {
                this.close()
            }
        })
    }
    addNewTab(url: string, title?: string, icon?: string, activate = true) {
        const newTab = new Tab(uuid(), url, title, icon)
        this.tabList.addTab(newTab)
        if (activate) {
            this.tabList.activeTab = newTab
        }
    }
    windowOpenHandler: (details: HandlerDetails) => WindowOpenHandlerResponse = (details) => {
        this.addNewTab(details.url)
        return { action: 'deny' }
    }
}