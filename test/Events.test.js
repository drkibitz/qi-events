describe('Events', function () {
    "use strict";

    var assert = require('assert');
    var events = require('../');
    var obj, obj2;

    function setup() {
        obj = {
            counter: 0
        };
        obj2 = {
            counterA: 0,
            counterB: 0
        };
        events.mixin(obj);
        events.mixin(obj2);
    }

    describe("on and trigger", function () {
        beforeEach(setup);

        it("counter should be incremented.", function () {
            obj.on('event', function () {
                obj.counter += 1;
            });
            obj.trigger('event');
            assert.strictEqual(obj.counter, 1);
            obj.trigger('event');
            obj.trigger('event');
            obj.trigger('event');
            obj.trigger('event');
            assert.strictEqual(obj.counter, 5);
        });
    });

    describe("binding and triggering", function () {
        beforeEach(setup);

        it("multiple events", function () {
            obj.on('a b c', function () {
                obj.counter += 1;
            });

            obj.trigger('a');
            assert.strictEqual(obj.counter, 1);

            obj.trigger('a').trigger('b');
            assert.strictEqual(obj.counter, 3);

            obj.trigger('c');
            assert.strictEqual(obj.counter, 4);

            obj.off('a c');
            obj.trigger('a').trigger('b').trigger('c');
            assert.strictEqual(obj.counter, 5);
        });

        it("with event maps", function () {
            var increment = function () {
                this.counter += 1;
            };

            obj.on({
                a: increment,
                b: increment,
                c: increment
            }, obj);

            obj.trigger('a');
            assert.strictEqual(obj.counter, 1);

            obj.trigger('a').trigger('b');
            assert.strictEqual(obj.counter, 3);

            obj.trigger('c');
            assert.strictEqual(obj.counter, 4);

            obj.off({
                a: increment,
                c: increment
            }, obj);
            obj.trigger('a').trigger('b').trigger('c');
            assert.strictEqual(obj.counter, 5);
        });
    });

    describe("on", function () {
        beforeEach(setup);

        it("then unbind all functions", function () {
            var callback = function () {
                obj.counter += 1;
            };
            obj.on('event', callback);
            obj.trigger('event');
            obj.off('event');
            obj.trigger('event');
            assert.strictEqual(obj.counter, 1); // counter should have only been incremented once
        });

        it("two callbacks, unbind only one", function () {
            var callback = function () {
                obj2.counterA += 1;
            };
            obj2.on('event', callback);
            obj2.on('event', function () {
                obj2.counterB += 1;
            });
            obj2.trigger('event');
            obj2.off('event', callback);
            obj2.trigger('event');
            assert.strictEqual(obj2.counterA, 1); // counterA should have only been incremented once
            assert.strictEqual(obj2.counterB, 2); // counterB should have been incremented twice
        });

        it("then unbind a callback in the midst of it firing", function () {
            var callback = function () {
                obj.counter += 1;
                obj.off('event', callback);
            };
            obj.on('event', callback);
            obj.trigger('event');
            obj.trigger('event');
            obj.trigger('event');
            assert.strictEqual(obj.counter, 1); // the callback should have been unbound
        });
    });

    describe("callbacks", function () {
        beforeEach(setup);

        it("that unbind themeselves", function () {
            var incrA = function () {
                obj2.counterA += 1;
                obj2.off('event', incrA);
            };
            var incrB = function () {
                obj2.counterB += 1;
                obj2.off('event', incrB);
            };
            obj2.on('event', incrA);
            obj2.on('event', incrB);
            obj2.trigger('event');
            obj2.trigger('event');
            obj2.trigger('event');
            assert.strictEqual(obj2.counterA, 1); // counterA should have only been incremented once
            assert.strictEqual(obj2.counterB, 1); // counterB should have only been incremented once
        });

        it("bound with a supplied context", function () {
            var TestClass = function () {
                return this;
            };
            TestClass.prototype.assertTrue = function () {
                assert.ok(true); //'`this` was bound to the callback
            };

            obj.on('event', function () {
                this.assertTrue();
            }, new TestClass());
            obj.trigger('event');
        });

        it("nested trigger with unbind", function () {
            var incr1 = function () {
                obj.counter += 1;
                obj.off('event', incr1);
                obj.trigger('event');
            };
            var incr2 = function () {
                obj.counter += 1;
            };
            obj.on('event', incr1);
            obj.on('event', incr2);
            obj.trigger('event');
            assert.strictEqual(obj.counter, 3); // counter should have been incremented three times
        });

        it("are not altered during trigger", function () {
            var counter = 0;
            var incr = function () {
                counter++;
            };
            obj.on('event', function () {
                    obj.on('event', incr).on('all', incr);
                })
                .trigger('event');
            assert.strictEqual(counter, 0); // bind does not alter callback list
            obj.off()
                .on('event', function () {
                    obj.off('event', incr).off('all', incr);
                })
                .on('event', incr)
                .on('all', incr)
                .trigger('event');
            assert.strictEqual(counter, 2); // unbind does not alter callback list
        });
    });

    describe("remove",  function () {
        beforeEach(setup);

        it("all events for a specific context", function () {
            obj.on('x y all', function () {
                assert.ok(true);
            });
            obj.on('x y all', function () {
                assert.ok(false);
            }, obj);
            obj.off(null, null, obj);
            obj.trigger('x y');
        });

        it("all events for a specific callback", function () {
            var success = function () {
                assert.ok(true);
            };
            var fail = function () {
                assert.ok(false);
            };
            obj.on('x y all', success);
            obj.on('x y all', fail);
            obj.off(null, fail);
            obj.trigger('x y');
        });

        it("does not skip consecutive events", function () {
            obj.on('event', function () {
                assert.ok(false);
            }, obj);
            obj.on('event', function () {
                assert.ok(false);
            }, obj);
            obj.off(null, null, obj);
            obj.trigger('event');
        });
    });

    describe("once", function () {
        beforeEach(setup);

        it("counters", function () {
            // Same as the previous test, but we use once rather than having to explicitly unbind
            var incrA = function () {
                obj2.counterA += 1;
                obj2.trigger('event');
            };
            var incrB = function () {
                obj2.counterB += 1;
            };
            obj2.once('event', incrA);
            obj2.once('event', incrB);
            obj2.trigger('event');
            assert.strictEqual(obj2.counterA, 1); // counterA should have only been incremented once
            assert.strictEqual(obj2.counterB, 1); // counterB should have only been incremented once
        });

        it("variant two", function () {
            var f = function () {
                assert.ok(true);
            };

            var a = {};
            var b = {};
            events.mixin(a);
            events.mixin(b);
            a.once('event', f);
            b.on('event', f);

            a.trigger('event');

            b.trigger('event');
            b.trigger('event');
        });

        it("variant three", function () {
            var f = function () {
                assert.ok(true);
            };

            obj.once('event', f)
                .on('event', f)
                .trigger('event')
                .trigger('event');
        });

        it("with off", function () {
            var f = function () {
                assert.ok(true);
            };

            obj.once('event', f);
            obj.off('event', f);
            obj.trigger('event');
        });

        it("with event maps", function () {
            var increment = function () {
                this.counter += 1;
            };

            obj.once({
                a: increment,
                b: increment,
                c: increment
            }, obj);

            obj.trigger('a');
            assert.strictEqual(obj.counter, 1);

            obj.trigger('a').trigger('b');
            assert.strictEqual(obj.counter, 2);

            obj.trigger('c');
            assert.strictEqual(obj.counter, 3);

            obj.trigger('a').trigger('b').trigger('c');
            assert.strictEqual(obj.counter, 3);
        });

        it("with off only by context", function () {
            var context = {};
            obj.once('event', function () {
                assert.ok(false);
            }, context);
            obj.off(null, null, context);
            obj.trigger('event');
        });

        it("with asynchronous events", function (done) {
            var doneId = null;
            var func = function () {
                assert.strictEqual(doneId, null);
                doneId = setTimeout(done, 50);
            };
            obj.once('async', func);

            setTimeout(function () {
                setTimeout(function () {
                    obj.trigger('async');
                }, 0);
                obj.trigger('async');
            }, 0);
        });

        it("with multiple events.", function () {
            obj.once('x y', function () {
                assert.ok(true);
            });
            obj.trigger('x').trigger('y');
        });

        it("Off during iteration", function () {
            var f = function () {
                this.off('event', f);
            };
            obj.on('event', f, obj);
            obj.once('event', function () {});
            obj.on('event', function () {
                assert.ok(true);
            });

            obj.trigger('event');
            obj.trigger('event');
        });
    });

    describe("`all`", function () {
        beforeEach(setup);

        it("once should work as expected", function () {
            obj.once('all', function () {
                assert.ok(true);
                obj.trigger('all');
            });
            obj.trigger('all');
        });

        it("callback list is retrieved after each event.", function () {
            var counter = 0;
            var incr = function () {
                counter++;
            };
            obj.on('x', function () {
                    obj.on('y', incr).on('all', incr);
                })
                .trigger('x').trigger('y');
            assert.strictEqual(counter, 2);
        });

        it("triggered for each event", function () {
            var a, b;
            obj.on('all', function (event) {
                obj.counter++;
                if (event == 'a') a = true;
                if (event == 'b') b = true;
            })
                .trigger('a').trigger('b');
            assert.ok(a);
            assert.ok(b);
            assert.strictEqual(obj.counter, 2);
        });
    });

    describe("noop", function () {
        beforeEach(setup);

        it("on without a callback", function () {
            obj.on('test').trigger('test');
        });

        it("once without a callback", function () {
            obj.once('event').trigger('event');
        });
    });

    it("event functions are chainable", function () {
        setup();
        function fn() {}
        assert.strictEqual(obj, obj.trigger('noeventssetyet'));
        assert.strictEqual(obj, obj.off('noeventssetyet'));
        assert.strictEqual(obj, obj.on('a', fn));
        assert.strictEqual(obj, obj.once('c', fn));
        assert.strictEqual(obj2, obj2.trigger('a'));
        assert.strictEqual(obj2, obj2.off('a c'));
    });

    it("usage example", function () {
        var args, count = 0;

        require('../').mixin({})
            .on('myevent', function () {
                count++;
                args = arguments;
            }, console)
            .trigger('myevent', 'something', 'something', 'darkside');

        assert.strictEqual(count, 1);
        assert.strictEqual(args[0], 'something');
        assert.strictEqual(args[1], 'something');
        assert.strictEqual(args[2], 'darkside');
        assert.strictEqual(args[3], undefined);
    });
});
