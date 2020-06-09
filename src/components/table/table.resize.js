import { $ } from '@core/dom';

export function resizeHandler($root) {
    {
        const rootCoords = $root.getCoords()
        const $resize = $(event.target)
        const type = $resize.data.resize
        const $parent = $resize.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        let value
        let delta
        const spenProp = type === 'col'
            ? { cellType: 'right', delta: 'pageX', value: 'width', css: 'height' }
            : { cellType: 'bottom', delta: 'pageY', value: 'height', css: 'width' }

        $resize.css({
            opacity: 1,
            zIndex: 1000,
            [spenProp.css]: rootCoords[spenProp.css] + 'px'
        })

        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
        document.onmousemove = e => {
            delta = e[spenProp.delta] - coords[spenProp.cellType]
            value = coords[spenProp.value] + delta
            $resize.css({
                [spenProp.cellType]: -delta + 'px'
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (type === 'col') {
                cells.forEach(cell => $(cell).css({ width: value + 'px' }))
            } else if (type === 'row') {
                $parent.css({ height: value + 'px' })
            }

            $resize.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    }
}
