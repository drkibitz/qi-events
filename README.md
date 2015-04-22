# Qi Events

[![Version npm](https://img.shields.io/npm/v/qi-events.svg?style=flat-square)](https://www.npmjs.com/package/qi-events)[![Build Status](https://img.shields.io/travis/drkibitz/qi-events/master.svg?style=flat-square)](https://travis-ci.org/drkibitz/qi-events)[![Dependencies](https://img.shields.io/david/dev/drkibitz/qi-events.svg?style=flat-square)](https://david-dm.org/drkibitz/qi-events#info=devDependencies)[![Coverage Status](https://img.shields.io/coveralls/drkibitz/qi-events/master.svg?style=flat-square)](https://coveralls.io/r/drkibitz/qi-events?branch=master)[![API Documentation](https://img.shields.io/badge/API-Documentation-0099dd.svg?style=flat-square)](https://drkibitz.github.io/qi-events/api/latest/)

http://drkibitz.github.io/qi-events/

A no nonsense event API (*BASED ON* Backbone.Events).

> Backbone.js 0.9.10
> (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
> Backbone may be freely distributed under the MIT license.
> For all details and documentation:
> http://backbonejs.org

## Usage

```javascript
require('qi-events').mixin({});
    .on('myevent', console.log, console)
    .trigger('myevent', 'something', 'something', 'darkside');

// > something something darkside
```

## Goals

- Maintain a no nonsense event dispatching/emitting/triggering API.
- Test it.
- Find a happy medium between simplicity, speed, and usage.
- Should be able to perform well in high performance situations.
- Allow for the most common use cases, but within reason to maintain high performance.
- Embrace CommonJS Module format
- Allow for UglifyJS and Closure Compiler with ADVANCED_OPTIMIZATIONS.
- Allow for use as the basis of other event implmentations (scenegraph)

## Changes *since Backbone.Events*

1. Added "use strict"
2. Converted to CommonJS module
3. Module is a constructor that can be used with class inheritence
4. Removed very minor dependencies on underscore.js and Backbone.js

    1. Added mixin method to replace Backbone mixin functionality
    2. Underscore was only used for slice, just using the native method

5. Completely removed listenTo(), listenToOnce(), and stopListening() methods
6. Change eventsApi() to accept an array of event names
7. Change eventsApi() to receive function references instead of "action" strings

    1. This is a micro optimization and allows better obfuscation

8. trigger() no longer calls eventsApi(), this is a very rare (and mostly unnecessary) use case that can be avoided

    1. Optimization is important when triggering, but convenience is important when adding and removing

9. With trigger not using eventsApi(), it allowed further optimizations on eventsApi() and trigger()

    1. Removed ctx property from _events[name] object, just use context property instead
    2. Fixed lint errors in the process

10. Added aStart argument to triggerEvents() as a logical slice removing slice call for most cases


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/drkibitz/qi-events/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

