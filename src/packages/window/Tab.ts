import { EventEmitter } from 'events'

export class Tab extends EventEmitter {
    constructor(private id_: string, private url_: string, private title_ = 'New Tab', private icon_ = '') {
        super()
    }
    get id() {
        return this.id_
    }
    get url() {
        return this.url_
    }
    set url(url: string) {
        this.url_ = url
        this.emit('url-changed', url)
    }
    get title() {
        return this.title_
    }
    set title(title: string) {
        this.title_ = title
        this.emit('title-changed', title)
    }
    get icon() {
        return this.icon_
    }
    set icon(icon: string) {
        this.icon_ = icon
        this.emit('icon-changed', icon)
    }
}