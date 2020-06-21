import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keyup'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">f(x)</div>
            <div id="input" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        const $formula = this.$root.find('#input')
        super.init()
        this.emitter.subscribe('table:input', text => {
            $formula.text(text)
        })
    }

    onInput() {
        const text = event.target.textContent.trim()

        this.emitter.emit('formula:input', text)

    }

    onKeyup(event) {
        const keys = [
            'Enter',
        ]
        const { key } = event
        if (keys.includes(key)) {
            event.preventDefault()
            this.emitter.emit('formula:focus')
        }
    }
}
