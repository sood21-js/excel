import { $ } from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        console.log($root)
        this.components.forEach(Component => {
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const $el = $.create('div', Component.className)
            const comnponent = new Component($el)
            $el.html(comnponent.toHTML())
            $root.append($el)
            // $root.insertAdjacentHTML('beforeend', comnponent.toHTML())
        });
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}
