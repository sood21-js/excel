import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table-template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, getSelector } from './table-functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keyup', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(20)
    }

    prepare() { }

    init() {
        super.init()
        this.selection = new TableSelection
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)

        this.emitter.subscribe('formula:input', text => {
            this.selection.current.text(text)
        })

        this.emitter.subscribe('formula:focus', () => {
            this.selection.current.addFocus()
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) resizeHandler(this.$root)
        else if (isCell(event) && event.shiftKey) {
            const $target = $(event.target)
            const $cells = matrix(this.selection.current, $target)
                .map(id => this.$root.find(`[data-id="${id}"]`))
            this.selection.selectGroup($cells)
        } else if (isCell(event)) {
            this.selection.select($(event.target))
            const text = $(event.target).text()
            this.emitter.emit('table:input', text)

        }
    }

    onKeyup(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowDown',
            'ArrowRight',
            'ArrowLeft',
            'ArrowUp',
        ]
        const { key } = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const selector = getSelector(id, key)
            const $cell = this.$root.find(selector)
            this.selection.select($cell)
            this.emitter.emit('table:input', $cell.text())
        }
    }

    onInput(event) {
        this.emitter.emit('table:input', $(event.target).text())
    }
}

