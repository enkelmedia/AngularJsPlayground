﻿/**
 Used to initiate a new Angular "App", this must load before everything else
 */
angular.module('ngDemo', []);

/*
 * Polifyl for IE
 */

// .closest()
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) { };
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}