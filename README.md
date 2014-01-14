[![Build Status](https://travis-ci.org/drkibitz/qi-events.png?branch=master)](https://travis-ci.org/drkibitz/qi-events)
[![Coverage Status](https://coveralls.io/repos/drkibitz/qi-events/badge.png)](https://coveralls.io/r/drkibitz/qi-events)
[![NPM version](https://badge.fury.io/js/qi-events.png)](http://badge.fury.io/js/qi-events)
[![devDependency Status](https://david-dm.org/drkibitz/qi-events/dev-status.png)](https://david-dm.org/drkibitz/qi-events#info=devDependencies)

# Qi Events

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

