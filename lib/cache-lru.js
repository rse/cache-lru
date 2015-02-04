/*
**  Cache-LRU -- In-Memory Cache with O(1) Operations and LRU Purging Strategy
**  Copyright (c) 2015 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CacheLRU=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";var _prototypeProperties=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},CacheLRU=function(){function e(){return _classCallCheck(this,e),this._index={},this._LRU={newer:null},this._MRU={older:null},this._LRU.newer=this._MRU,this._MRU.older=this._LRU,this._cur=0,this._max=1/0,this._dispose=function(){},this}return _prototypeProperties(e,null,{limit:{value:function(e){var t=this._max;return arguments.length>0&&(this._max=e,this._purge()),t},writable:!0,configurable:!0},dispose:{value:function(e){return this._dispose=e,this},writable:!0,configurable:!0},length:{value:function(){return this._cur},writable:!0,configurable:!0},keys:{value:function(){return this.each(function(e,t){this.push(t)},[])},writable:!0,configurable:!0},values:{value:function(){return this.each(function(e){this.push(e)},[])},writable:!0,configurable:!0},each:{value:function(e,t){arguments<2&&(t=this);for(var i=0,r=this._MRU.older;r!==this._LRU;)e.call(t,r.val,r.key,i++),r=r.older;return t},writable:!0,configurable:!0},has:{value:function(e){var t=this._index[e];return void 0!==t},writable:!0,configurable:!0},peek:{value:function(e){var t=this._index[e];return void 0===t?void 0:t.expires<Date.now()?void this.del(t.key):t.val},writable:!0,configurable:!0},touch:{value:function(e){var t=this._index[e];if(void 0===t)throw new Error("touch: no such item");return this._promote(t),this},writable:!0,configurable:!0},get:{value:function(e){var t=this._index[e];return void 0===t?void 0:t.expires<Date.now()?void this.del(t.key):(this._promote(t),t.val)},writable:!0,configurable:!0},set:{value:function(e,t,i){arguments.length<3&&(i=1/0),i+=Date.now();var r=this._index[e];if(void 0===r)r={older:null,newer:null,key:e,val:t,expires:i},this._index[e]=r,this._attach(r),this._cur++,this._purge();else{var n=r.val;r.val=t,this._promote(r),this._dispose.call(void 0,r.key,n,"set")}return this},writable:!0,configurable:!0},del:{value:function(e){var t=this._index[e];if(void 0===t)throw new Error("del: no such item");return delete this._index[e],this._detach(t),this._cur--,this._dispose.call(void 0,e,t.val,"del"),this},writable:!0,configurable:!0},clear:{value:function(){for(;this._cur>0;)this.del(this._LRU.newer.key);return this},writable:!0,configurable:!0},_purge:{value:function(){for(;this._cur>this._max;)this.del(this._LRU.newer.key)},writable:!0,configurable:!0},_promote:{value:function(e){this._detach(e),this._attach(e)},writable:!0,configurable:!0},_detach:{value:function(e){e.older.newer=e.newer,e.newer.older=e.older,e.older=null,e.newer=null},writable:!0,configurable:!0},_attach:{value:function(e){e.older=this._MRU.older,e.newer=this._MRU,e.newer.older=e,e.older.newer=e},writable:!0,configurable:!0}}),e}();module.exports=CacheLRU;
},{}]},{},[1])(1)
});


//# sourceMappingURL=bundle.map