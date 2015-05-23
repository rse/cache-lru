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

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CacheLRU = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),CacheLRU=function(){function e(){return _classCallCheck(this,e),this._index={},this._LRU={newer:null},this._MRU={older:null},this._LRU.newer=this._MRU,this._MRU.older=this._LRU,this._cur=0,this._max=1/0,this._dispose=function(){},this}return _createClass(e,[{key:"limit",value:function(e){var t=this._max;return arguments.length>0&&(this._max=e,this._purge()),t}},{key:"dispose",value:function(e){return this._dispose=e,this}},{key:"length",value:function(){return this._cur}},{key:"keys",value:function(){return this.each(function(e,t){this.push(t)},[])}},{key:"values",value:function(){return this.each(function(e){this.push(e)},[])}},{key:"each",value:function(e,t){arguments<2&&(t=this);for(var i=0,n=this._MRU.older;n!==this._LRU;)e.call(t,n.val,n.key,i++),n=n.older;return t}},{key:"has",value:function(e){var t=this._index[e];return void 0!==t}},{key:"peek",value:function(e){var t=this._index[e];return void 0===t?void 0:t.expires<Date.now()?void this.del(t.key):t.val}},{key:"touch",value:function(e){var t=this._index[e];if(void 0===t)throw new Error("touch: no such item");return this._promote(t),this}},{key:"get",value:function(e){var t=this._index[e];return void 0===t?void 0:t.expires<Date.now()?void this.del(t.key):(this._promote(t),t.val)}},{key:"set",value:function(e,t,i){arguments.length<3&&(i=1/0),i+=Date.now();var n=this._index[e];if(void 0===n)n={older:null,newer:null,key:e,val:t,expires:i},this._index[e]=n,this._attach(n),this._cur++,this._purge();else{var r=n.val;n.val=t,this._promote(n),this._dispose.call(void 0,n.key,r,"set")}return this}},{key:"del",value:function(e){var t=this._index[e];if(void 0===t)throw new Error("del: no such item");return delete this._index[e],this._detach(t),this._cur--,this._dispose.call(void 0,e,t.val,"del"),this}},{key:"clear",value:function(){for(;this._cur>0;)this.del(this._LRU.newer.key);return this}},{key:"_purge",value:function(){for(;this._cur>this._max;)this.del(this._LRU.newer.key)}},{key:"_promote",value:function(e){this._detach(e),this._attach(e)}},{key:"_detach",value:function(e){e.older.newer=e.newer,e.newer.older=e.older,e.older=null,e.newer=null}},{key:"_attach",value:function(e){e.older=this._MRU.older,e.newer=this._MRU,e.newer.older=e,e.older.newer=e}}]),e}();exports["default"]=CacheLRU,module.exports=exports["default"];
},{}]},{},[1])(1)
});


//# sourceMappingURL=bundle.map