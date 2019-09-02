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

class CacheLRU {
    /*  create LRU cache instance  */
    constructor () {
        this._index     = {}
        this._LRU       = { newer: null }
        this._MRU       = { older: null }
        this._LRU.newer = this._MRU
        this._MRU.older = this._LRU
        this._cur       = 0
        this._max       = Infinity
        this._dispose   = (/* key, val, op */) => {}
        return this
    }

    /*  get or set the cache limit  */
    limit (max) {
        const maxOld = this._max
        if (arguments.length > 0) {
            this._max = max
            this._purge()
        }
        return maxOld
    }

    /*  configure function to be called before item is disposed  */
    dispose (cb) {
        this._dispose = cb
        return this
    }

    /*  get number of items  */
    length () {
        return this._cur
    }

    /*  get keys of all items in order  */
    keys () {
        return this.each(function (val, key) { this.push(key) }, [])
    }

    /*  get values of all items in order */
    values () {
        return this.each(function (val /*, key */) { this.push(val) }, [])
    }

    /*  iterate over all items in order  */
    each (cb, ctx) {
        if (arguments < 2)
            ctx = this
        let i = 0
        let bucket = this._MRU.older
        while (bucket !== this._LRU) {
            cb.call(ctx, bucket.val, bucket.key, i++)
            bucket = bucket.older
        }
        return ctx
    }

    /*  check whether item exists under key  */
    has (key) {
        const bucket = this._index[key]
        return (bucket !== undefined && bucket.expires >= Date.now())
    }

    /*  get value under key without promoting item  */
    peek (key) {
        const bucket = this._index[key]
        if (bucket === undefined)
            return undefined
        if (bucket.expires < Date.now()) {
            this.del(bucket.key)
            return undefined
        }
        return bucket.val
    }

    /*  explicity promote item under key  */
    touch (key) {
        const bucket = this._index[key]
        if (bucket === undefined)
            throw new Error("touch: no such item")
        this._promote(bucket)
        return this
    }

    /*  get value under key  */
    get (key) {
        const bucket = this._index[key]
        if (bucket === undefined)
            return undefined
        if (bucket.expires < Date.now()) {
            this.del(bucket.key)
            return undefined
        }
        this._promote(bucket)
        return bucket.val
    }

    /*  set value under key  */
    set (key, val, expires) {
        if (arguments.length < 3)
            expires = Infinity
        expires += Date.now()
        let bucket = this._index[key]
        if (bucket === undefined) {
            /*  insert new bucket  */
            bucket = {
                older:   null,
                newer:   null,
                key:     key,
                val:     val,
                expires: expires
            }
            this._index[key] = bucket
            this._attach(bucket)
            this._cur++
            this._purge()
        }
        else {
            /*  replace existing bucket  */
            const valOld = bucket.val
            bucket.val = val
            this._promote(bucket)
            this._dispose.call(undefined, bucket.key, valOld, "set")
        }
        return this
    }

    /*  delete item under key  */
    del (key) {
        const bucket = this._index[key]
        if (bucket === undefined)
            throw new Error("del: no such item")
        delete this._index[key]
        this._detach(bucket)
        this._cur--
        this._dispose.call(undefined, key, bucket.val, "del")
        return this
    }

    /*  delete all items  */
    clear () {
        while (this._cur > 0)
            this.del(this._LRU.newer.key)
        return this
    }

    /*  INTERNAL: purge all LRU items above limit  */
    _purge () {
        while (this._cur > this._max)
            this.del(this._LRU.newer.key)
    }

    /*  INTERNAL: promote item  */
    _promote (bucket) {
        /*  promote bucket to be MRU bucket  */
        this._detach(bucket)
        this._attach(bucket)
    }

    /*  INTERNAL: detach bucket from list  */
    _detach (bucket) {
        bucket.older.newer = bucket.newer
        bucket.newer.older = bucket.older
        bucket.older       = null
        bucket.newer       = null
    }

    /*  INTERNAL: attach bucket to list as MRU bucket  */
    _attach (bucket) {
        bucket.older       = this._MRU.older
        bucket.newer       = this._MRU
        bucket.newer.older = bucket
        bucket.older.newer = bucket
    }
}

module.exports = CacheLRU

