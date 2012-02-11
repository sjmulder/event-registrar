**event-registrar** implements an event system inspired by [EventEmitter](https://github.com/Wolfy87/EventEmitter) without requiring using a base (prototype) class but instead by supplying a single, standalone, `registerEvent` function.

Usage example from `sample.html`:

    var Greeter = function() {
    	registerEvent(this, 'hello');
    	registerEvent(this, 'goodbye');
    };

    var greeter = new Greeter();

    greeter.on('hello', function(subject) {
    	document.write('Hello to ' + subject + '<br>');
    });

    greeter.once('hello', function(subject) {
    	document.write('Indeed, very hello to ' + subject + '<br>');
    });

    function onGoodbye(preposition, subject) {
    	document.write('Goodbye ' + preposition + ' ' + subject + '<br>');
    };

    greeter.on('goodbye', onGoodbye);
    greeter.emit('hello', 'you');
    greeter.emit('hello', 'him');
    greeter.emit('goodbye', 'to', 'you');
    greeter.removeListener('goodbye', onGoodbye);
    greeter.emit('goodbye', 'from', 'me');

Written by and © Sijmen Mulder <sjmulder@gmail.com>. Released under the 3-clause BSD license, see `License.md`.
