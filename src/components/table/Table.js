import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table-template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell } from './table-functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
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
    }

    onMousedown(event) {
        console.log(event)
        if (shouldResize(event)) resizeHandler(this.$root)
        else if (isCell(event) && event.shiftKey) this.selection.selectGroup($(event.target))
        else if (isCell(event)) this.selection.select($(event.target))
    }
}
