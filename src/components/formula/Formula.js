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
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.emitter.subscribe('changeCellsText', text => {
            this.$root.find('.input').text(text)
        })
        this.emitter.subscribe('changeCell', text => {
            this.$root.find('.input').text(text)
        })
    }

    onInput() {
        const text = event.target.textContent.trim()
        this.emitter.emit('changeFormula', text)
    }

    onKeyup(event) {
        const keys = [
            'Enter',
        ]
        const { key } = event
        if (keys.includes(key)) {
            event.preventDefault()
            this.emitter.emit('changeFocusToCell')
        }
    }
}
