export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
    }

    select($el) {
        this.clear()
        this.group.push($el)
        $el.addClass(TableSelection.className)
    }

    selectGroup($el) {
        this.group.push($el)
        $el.addClass(TableSelection.className)
    }

    clear() {
        if (this.group.length > 0) {
            this.group.forEach($element => $element.removeClass(TableSelection.className))
            this.group = []
        }
    }
}
