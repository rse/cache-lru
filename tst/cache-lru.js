/*
**  Cache-LRU -- In-Memory Cache with O(1) Operations and LRU Purging Strategy
**  Copyright (c) 2015-2019 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

var CacheLRU = require("../lib/cache-lru.js")

describe("Cache-LRU Library", function () {
    it("should expose the official API", function () {
        var cache = new CacheLRU();
        expect(cache).to.be.a("object")
        expect(cache).to.respondTo("limit")
        expect(cache).to.respondTo("dispose")
        expect(cache).to.respondTo("length")
        expect(cache).to.respondTo("keys")
        expect(cache).to.respondTo("values")
        expect(cache).to.respondTo("each")
        expect(cache).to.respondTo("has")
        expect(cache).to.respondTo("peek")
        expect(cache).to.respondTo("touch")
        expect(cache).to.respondTo("get")
        expect(cache).to.respondTo("set")
        expect(cache).to.respondTo("del")
        expect(cache).to.respondTo("clear")
    })
    it("should provide the expected set/get functionality", function () {
        var cache = new CacheLRU();
        cache.set("foo", true);
        cache.set("bar", "baz");
        cache.set("quux", 42);
        expect(cache.get("foo")).to.be.a("boolean").and.to.be.true
        expect(cache.get("bar")).to.be.a("string").and.to.be.equal("baz")
        expect(cache.get("quux")).to.be.a("number").and.to.be.equal(42)
    })
    it("should provide the expected LRU semantics", function () {
        var cache = new CacheLRU();
        cache.limit(0);
        cache.set("foo", true);
        expect(cache.get("foo")).to.be.equal(undefined)
        cache.limit(1);
        cache.set("foo", true);
        expect(cache.get("foo")).to.be.a("boolean").and.to.be.true
        cache.limit(2);
        cache.set("foo", true);
        cache.set("bar", "baz");
        expect(cache.get("foo")).to.be.a("boolean").and.to.be.true
        expect(cache.get("bar")).to.be.a("string").and.to.be.equal("baz")
        cache.set("quux", 42);
        expect(cache.get("foo")).to.be.equal(undefined)
    })
})

