describe('index', function () {
    "use strict";

    var assert = require('assert');
    var events = require('../');
    var counter = 0;

    function listener() { counter++; }

    it("has Events member.", function () {
        assert.strictEqual(typeof events.Events, 'function');
    });

    it("is an Events.", function () {
        assert.strictEqual(events instanceof events.Events, true);
    });

    it("can mixin an object.", function () {
        var obj = events.mixin({});
        assert.deepEqual(obj, {
            off: events.off,
            on: events.on,
            once: events.once,
            trigger: events.trigger
        });
    });

    it("can add a listener.", function () {
        events.on('test', listener);
    });

    it("can trigger an event.", function () {
        assert.strictEqual(counter, 0);
        events.trigger('test');
        assert.strictEqual(counter, 1);
    });
});
