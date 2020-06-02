class Dom {
    constructor(selector) {
        console.log(selector)
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        console.log(html)
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        console.log()
        this.html('')
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
}

export function $(selector) {
    console.log(selector)
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    console.log(tagName, classes)
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
