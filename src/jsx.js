function appendChildren(elem, children) {
    children.forEach((child) => {
        if (child instanceof HTMLElement) {
            elem.appendChild(child);
            return;
        }
        elem.appendChild(document.createTextNode(child));        
    });
}

export default function jsx(node) {
    const { elementName, children, attributes } = node;
    const elem = document.createElement(elementName);

    for (const [key, value] of Object.entries(attributes)) {
        if (key.startsWith('on')) { // by convention, anything beginning with on is an event
            elem.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            elem.setAttribute(key, value);
        }
    }

    appendChildren(elem, children);

    return elem;
}
