import { capitalize } from './utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DOMListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
            }
            this[method] = this[method].bind(this)
            // this is addEvenListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            // this is removeEvenListener
            this.$root.off(listener, this[method])
        })
    }
}
