/**
 * This module is an instance of {@link module:qi-events.Events}.
 * @module qi-events
 * @author Dr. Kibitz <info@drkibitz.com>
 */
'use strict';

/**
 * Regular expression used to split event strings.
 * @ignore
 */
var typeSplitter = /\s+/;

/**
 * Implement fancy features of the events API such as multiple event
 * names `"change blur"`, jQuery-style event maps `{change: action}`.
 * @param {module:qi-events.Events|Object} obj
 * @param {Function} fn
 * @param {string|Array.<string>|Object.<string>} name
 * @param {} [varname] [description]context
 * @return {boolean|void} true if processing single event name or nothing
 * @ignore
 */
function eventsApi(obj, fn, name, callback, context) {
    var names, i, l;
    if (!name) return true;

    if (typeof name === 'string') {
        if (typeSplitter.test(name)) {
            names = name.split(typeSplitter);
            for (i = 0, l = names.length; i < l; i++) {
                fn.call(obj, names[i], callback, context);
            }
        }
        return true; // Single name

    } else if (Array.isArray(name)) {
        for (i = 0, l = name.length; i < l; i++) {
            fn.call(obj, name[i], callback, context);
        }
    } else {
        for (var key in name) {
            fn.call(obj, key, name[key], callback); // callback is context
        }
    }
}

/**
 * Optimized internal dispatch function for triggering events. Tries to
 * keep the usual cases speedy (most have 3 arguments).
 * @param {Array.<Object>} events
 * @param {Array|Arguments} args
 * @param {number} aStart
 * @ignore
 */
function triggerEvents(events, args, aStart) {
    /*jshint indent:false */
    var o, i = -1, l = events.length,
        a1 = args[aStart], a2 = args[aStart + 1], a3 = args[aStart + 2];
    switch (args.length - aStart) {
    case 0:
        while (++i < l) (o = events[i]).callback.call(o.context); return;
    case 1:
        while (++i < l) (o = events[i]).callback.call(o.context, a1); return;
    case 2:
        while (++i < l) (o = events[i]).callback.call(o.context, a1, a2); return;
    case 3:
        while (++i < l) (o = events[i]).callback.call(o.context, a1, a2, a3); return;
    default:
        args = aStart ? Array.prototype.slice.call(args, aStart) : args;
        while (++i < l) (o = events[i]).callback.apply(o.context, args);
    }
}

/**
 * @memberof module:qi-events
 * @constructor
 */
function Events() {}

/**
 * The special catch all event type.
 * @memberof module:qi-events.Events
 * @type {string}
 * @const
 */
Events.ALL = 'all';

/** @alias module:qi-events.Events# */
var proto = Events.prototype;

/**
 * Mixes in methods from this module's prototype to *any object*
 * in order to provide it with custom events.
 * @param {Object} obj
 * @returns {Object} obj passed
 */
proto.mixin = function mixin(obj) {
    obj.on = proto.on;
    obj.once = proto.once;
    obj.off = proto.off;
    obj.trigger = proto.trigger;
    return obj;
};

/**
 * Bind one or more space separated events, or an events map,
 * to a `callback` function. Passing `ALL` will bind the
 * callback to all events fired.
 * @param {(string|Array.<string>|Object)} name String of space delimited events, array of event strings, or event map
 * @param {(Function|Object)=} callback May be function or context if passing event map
 * @param {Object=} context
 * @return {Object} this object
 */
proto.on = function on(name, callback, context) {
    if (!eventsApi(this, on, name, callback, context) || !callback) return this;
    if (!this._events) this._events = {};
    if (!this._events[name]) this._events[name] = [];
    this._events[name].push({callback: callback, context: context || this});
    return this;
};

/**
 * Bind events to only be triggered a single time. After the
 * first time the callback is invoked, it will be removed.
 * @param {(string|Array.<string>|Object)} name String of space delimited events, array of event strings, or event map
 * @param {(Function|Object)=} callback May be function or context if passing event map
 * @param {Object=} context
 * @return {Object} this object
 */
proto.once = function once(name, callback, context) {
    if (!eventsApi(this, once, name, callback, context) || !callback) return this;
    var that = this, called;
    var onceCb = function () {
        if (called) return;
        called = true;
        that.off(name, onceCb);
        callback.apply(this, arguments);
    };
    onceCb._callback = callback;
    return this.on(name, onceCb, context);
};

/**
 * Remove one or many callbacks. If `context` is null, removes all callbacks
 * with that function. If `callback` is null, removes all callbacks for the event.
 * If `name` is null, removes all bound callbacks for all events.
 * @param {(string|Array.<string>|Object)} name String of space delimited events, array of event strings, or event map
 * @param {(Function|Object)=} callback May be function or context if passing event map
 * @param {Object=} context
 * @return {Object} this object
 */
proto.off = function off(name, callback, context) {
    var retain, ev, events, names, i, l, j, k;
    if (!this._events || !eventsApi(this, off, name, callback, context)) return this;
    if (!name && !callback && !context) {
        this._events = null;
        return this;
    }

    names = name ? [name] : Object.keys(this._events);
    for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        events = this._events[name];
        if (events) {
            this._events[name] = retain = [];
            if (callback || context) {
                for (j = 0, k = events.length; j < k; j++) {
                    ev = events[j];
                    if ((callback && callback !== ev.callback &&
                        callback !== ev.callback._callback) ||
                        (context && context !== ev.context)) {
                        retain.push(ev);
                    }
                }
            }
            if (!retain.length) this._events[name] = null;
        }
    }
    return this;
};

/**
 * Trigger one event by name, firing all bound callbacks. Callbacks are
 * passed the same arguments as `trigger` is, apart from the event name
 * (unless you're listening on `ALL`, which will cause your callback to
 * receive the true name of the event as the first argument).
 * @param {string} name Single event name
 * @param {...*=} arg
 * @return {Object} this object
 */
proto.trigger = function trigger(name) {
    var events = this._events, allEvents;
    if (!events) return this;
    allEvents = events[Events.ALL];
    if (events[name]) triggerEvents(events[name], arguments, 1);
    if (allEvents) triggerEvents(allEvents, arguments, 0);
    return this;
};

exports = module.exports = new Events();
exports.Events = Events;
