function $(select) {
    return document.querySelector(select)
}
function $$(select) {
    return document.querySelectorAll(select)
}

function $$$(tagName) {
    return document.createElement(tagName);
}
