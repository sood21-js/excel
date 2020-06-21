import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = { emitter: this.emitter }
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const comnponent = new Component($el, componentOptions)
            $el.html(comnponent.toHTML())
            $root.append($el)
            return comnponent
        });
        return $root
    }

    render() {
        // add html
        this.$el.append(this.getRoot())

        // add listeners
        this.components.forEach(component => component.init())
    }
}
