import { View } from 'electron'
import Window from './Window'
import { Tab } from './Tab'
import TabView from './TabView'

export default class TabListView extends View {
    public tabViewMap = new Map<Tab, TabView>()
    constructor(private window: Window) {
        super()
        this.window.tabList.on('tab-added', this.onTabAdded)
        this.window.tabList.on('active-tab-changed', this.onActiveTabChanged)
        this.window.tabList.on('tab-removed', this.onTabRemoved)
    }

    onTabAdded = (tab: Tab) => {
        const tabView = new TabView(this.window, tab)
        this.tabViewMap.set(tab, tabView)
        tabView.setVisible(false)
        this.addChildView(tabView)
        tabView.setBounds({
            x: 0,
            y: 0,
            width: this.getBounds().width,
            height: this.getBounds().height,
        })
    }

    onActiveTabChanged = (tab: Tab, oldTab: Tab | null) => {
        const newTabView = this.tabViewMap.get(tab) ?? null
        const oldTabView = this.tabViewMap.get(oldTab) ?? null

        if (oldTabView) {
            oldTabView.onDeselected()
            oldTabView.setVisible(false)
        }

        if (newTabView) {
            newTabView.setVisible(true)
            newTabView.onSelected()
        }
    }

    onTabRemoved = (tab: Tab) => {
        const tabView = this.tabViewMap.get(tab)!
        this.tabViewMap.delete(tab)
        this.removeChildView(tabView)
        tabView.destroy()
    }
}