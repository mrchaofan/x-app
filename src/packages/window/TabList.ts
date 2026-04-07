import { EventEmitter } from 'events'
import { Tab } from './Tab'

export default class TabList extends EventEmitter   {
    private tabs_: Tab[] = []
    private activeTab_: Tab | null = null
    get tabs() {
        return this.tabs_
    }
    get activeTab() {
        return this.activeTab_
    }
    set activeTab(tab: Tab | null) {
        if (this.activeTab_ !== tab) {
            const oldTab = this.activeTab_ ?? null
            this.activeTab_ = tab
            this.emit('active-tab-changed', tab, oldTab)
        }
    }

    addTab(tab: Tab) {
        this.tabs_.push(tab)
        this.emit('tab-added', tab)
        if (this.activeTab === null) {
            this.activeTab = tab
        }
    }
    removeTab(tab: Tab) {
        const index = this.tabs_.indexOf(tab)
        if (index !== -1) {
            this.tabs_.splice(index, 1)
            if (this.activeTab === tab) {
                this.activeTab = this.tabs[index] || this.tabs[index - 1] || null
            }
            this.emit('tab-removed', tab)
        }
    }
}