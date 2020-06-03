import { $ } from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const comnponent = new Component($el)
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
