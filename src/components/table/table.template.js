const CODE = {
    A: 65,
    Z: 90
}

function toCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function toColums(char) {
    return `
        <div class="column">${char}</div>
    `
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = 1) {
    const colsCount = CODE.Z - CODE.A + 1

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColums)
        .join('')
    const rows = []
    rows.push(createRow('', cols))
    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i, cells))
    }
    return rows.join('')
}
