var $ = {
    id: function (id) {
        return document.getElementById(id);
    },
    el: function (el) {
        return document.querySelector(el);
    },
    class: function (el) {
        return document.getElementsByClassName(elClass);
    },
    tag: function (el) {
        return document.getElementsByTagName(tag);
    },
    all: function (el) {
        return document.querySelectorAll(el);
    },
};