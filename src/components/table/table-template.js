const CODE = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return (_, index) => {
        return `
            <div class="cell" contenteditable data-col="${index}" data-row="${row}">
            </div>
        `
    }
}

function toColums(char, index) {
    return `
        <div class="column" data-type="resizable" data-col=${index}>
            ${char}
            <div class="col-resize" data-resize="col" data-col-resize="${index}"></div>
        </div>
    `
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" data-resize="row" data-row-resize="${index}"></div>` : ''
    return `
        <div class="row" data-row="${index}" data-type="resizable">
            <div class="row-info">
            ${index}
            ${resize}
            </div>
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
            .map(toCell(i))
            .join('')
        rows.push(createRow(i, cells))
    }
    return rows.join('')
}
