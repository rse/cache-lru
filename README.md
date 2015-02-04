
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
object purging strategy and operations which all have strict O(1), i.e.,
constant and hence independent of the number of cached objects, time
complexity (including the internal LRU purging functionality).

Installation
------------

#### Node environments (with NPM package manager):

```shell
$ npm install asty
```

#### Browser environments (with Bower package manager):

```shell
$ bower install asty
```

Usage
-----

- `new CacheLRU(): CacheLRU`:<br/>
  Create a new cache instance -- with initially no cached items and an infinite caching limit.

- `CacheLRU#limit(maxItems?: Number): Number`:<br/>
  Set a new or get current maximum number of items in the cache. On
  setting a new maximum, if previously already more than `maxItems`
  items are in the cache, the `length() - maxItems` LRU items are
  automatically deleted.

- `CacheLRU#dispose(callback: (key, val, op) =&gt; Void): CacheLRU`:<br/>
  Set a callback which is called once for every item just before it is
  disposed off the cache, either because it is replaced by a `set()`
  call or deleted by a `del()` call. The parameters to the callback are
  the key under which the item was stored, the value of the item which
  was stored and the operation (either `set` or `del`) which caused the
  disposal. This is usually used for explicit resource deallocation reasons.

- ...

Implementation Notice
---------------------

Although Cache-LRU is written in ECMAScript 6, it is transpiled to ECMAScript
5 and this way runs in really all(!) current (as of 2015) JavaScript
environments, of course.

Internally, Cache-LRU is based on a managing all objects in a two-headed
double-linked list of buckets.

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

