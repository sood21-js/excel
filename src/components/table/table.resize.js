import { $ } from '@core/dom';

export function resizeHandler($root) {
    {
        const $resize = $(event.target)
        const type = $resize.data.resize
        const $parent = $resize.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        let value
        let delta

        $resize.css({
            opacity: 1,
            zIndex: 1000,
        })

        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
        const cellsResize = $root.findAll(`[data-${type}-resize="${$parent.data[type]}"]`)
        cellsResize.forEach(cell => $(cell).css({ opacity: 1 }))

        const spenProp = type === 'col'
            ? { cellType: 'right', delta: 'pageX', value: 'width' }
            : { cellType: 'bottom', delta: 'pageY', value: 'height' }

        document.onmousemove = e => {
            delta = e[spenProp.delta] - coords[spenProp.cellType]
            value = coords[spenProp.value] + delta
            $resize.css({
                [spenProp.cellType]: -delta + 'px'
            })
            cellsResize.forEach(cell => $(cell).css({ [spenProp.cellType]: -delta + 'px' }))
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (type === 'col') {
                cells.forEach(cell => $(cell).css({ width: value + 'px' }))
            } else if (type === 'row') {
                $parent.css({ height: value + 'px' })
            }
            cellsResize.forEach(cell => $(cell).css({ [spenProp.cellType]: 0, opacity: 0 }))

            $resize.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    }
}
