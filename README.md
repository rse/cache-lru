
Cache-LRU
=========

In-Memory Cache with O(1) Operations and LRU Purging Strategy

<p/>
<img src="https://nodei.co/npm/cache-lru.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/cache-lru.png" alt=""/>

About
-----

Cache-LRU is a small JavaScript library, providing an in-memory
key-indexed object cache data structure with Least-Recently-Used (LRU)
object purging strategy and main operations which all have strict O(1), i.e.,
constant and hence independent of the number of cached objects, time
complexity (including the internal LRU purging functionality).

Installation
------------

#### Node environments (with NPM package manager):

```shell
$ npm install cache-lru
```

#### Browser environments (with Bower package manager):

```shell
$ bower install cache-lru
```

Usage
-----

### Main Operations

- `new CacheLRU(): CacheLRU`: [O(1)]<br/>
  Create a new cache instance -- with initially no cached objects
  and an infinite caching limit.

- `CacheLRU#limit(max?: Number): Number`: [O(1)]<br/>
  Set a new or get current maximum number of objects in the cache. On
  setting a new maximum, if previously already more than `max`
  objects are in the cache, the `length() - max` LRU ojects are
  automatically deleted.

- `CacheLRU#length(): Number`: [O(1)]<br/>
  Get number of objects in the cache.

- `CacheLRU#dispose(callback: (key, val, op) =&gt; Void): CacheLRU`: [O(1)]<br/>
  Set a callback which is called once for every object just before it is
  disposed off the cache, either because it is replaced by a `set()`
  call or deleted by a `del()` call. The parameters to the callback are
  the key under which the object was stored, the value of the object which
  was stored and the operation (either `set` or `del`) which caused the
  object disposal. This is usually used for explicit resource deallocation reasons.

- `CacheLRU#has(key: String): Boolean`: [O(1)]<br/>
  Check whether object exists under `key` -- without promoting the
  corresponding object to be the new MRU object.

- `CacheLRU#peek(key: String): Object`: [O(1)]<br/>
  Get value of object under `key` -- without promoting the
  corresponding object to be the new MRU object. If no
  object exists under `key` the value `undefined` is returned.

- `CacheLRU#touch(key: String): CacheLRU`: [O(1)]<br/>
  Touch object under `key` and this way explicitly promote the
  object to be the new MRU object.
  If no object exists under `key` an exception is thrown.

- `CacheLRU#get(key: String): Object`: [O(1)]<br/>
  Get value of object under `key` -- and promote the
  object to be the new MRU object.
  If no object exists under `key` the value `undefined` is returned.

- `CacheLRU#set(key: String, val: Object, expires?: Number): CacheLRU`: [O(1)]<br/>
  Set value of object under `key`. If there is already an object stored
  under `key`, replace it. Else insert as a new object into the cache.
  In both cases, promote the affected object to be the new MRU object.
  If the optional `expires` parameter is given, it should be the
  duration in milliseconds the object should maximally last in the cache (it still
  can be disposed earlier because of LRU purging of the cache). By
  default this is `Infinity`.

- `CacheLRU#del(key: String): CacheLRU`: [O(1)]<br/>
  Delete object under `key`.
  If no object exists under `key` an exception is thrown.

- `CacheLRU#clear(key: String): CacheLRU`: [O(1)]<br/>
  Delete object under `key`.
  If no object exists under `key` an exception is thrown.

### Convenience Operations

- `CacheLRU#keys(): String[]`: [O(n)]<br/>
  Get the list of keys of all objects in the cache, in MRU to LRU order.

- `CacheLRU#values(): Object[]`: [O(n)]<br/>
  Get the list of values of all objects in the cache, in MRU to LRU order.

- `CacheLRU#each(callback: (val: Object, key: String, order: Number) =&gt;, ctx: Object): Object`: [O(n)]<br/>
  Iterate over all objects in the cache, in MRU to LRU order, and call
  the `callback` function for each object. The function receives the
  object value, the object key and the iteration order (starting from
  zero and steadily increasing).

Implementation Notice
---------------------

Although Cache-LRU is written in ECMAScript 6, it is transpiled to ECMAScript
5 and this way runs in really all(!) current (as of 2015) JavaScript
environments, of course.

Internally, Cache-LRU is based on a managing all objects in a two-headed
double-linked list of buckets. This way it can achieve the O(1) time
complexity in all its main operations, including the automatically
happening LRU purging functionality.

License
-------

Copyright (c) 2015 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

