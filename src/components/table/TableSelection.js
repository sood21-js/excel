export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.className)
        $el.addFocus()
    }

    selectGroup($cells = []) {
        this.clear()
        this.group = $cells
        this.group.map($el => $el.addClass(TableSelection.className))
    }

    clear() {
        if (this.group.length > 0) {
            this.group.forEach($element => $element.removeClass(TableSelection.className))
            this.group = []
        }
    }
}
