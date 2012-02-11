window.registerEvent = function(object, type) {
	'use strict';

	/* © 2012 Sijmen Mulder.
	   Licensed under the 3-clause BSD license, see License.md */

	var originalAddListener = object.addListener;
	var originalRemoveListener = object.removeListener;
	var originalEmit = object.emit;
	
	var listeners = [];

	object.addListener = function(addType, listener) {
		if (type !== addType) {
			if (originalAddListener) {
				originalAddListener.apply(object, arguments);
				return;
			} else {
				throw 'Unregistered event: ' + addType;
			}
		}
		listeners.push(listener);
	};

	object.removeListener = function(removeType, listener) {
		if (type !== removeType) {
			if (originalRemoveListener) {
				originalRemoveListener.apply(object, arguments);
				return;
			} else {
				throw 'Unregistered event: ' + removeType;
			}
		}
		var i;
		for (i = 0; i < listeners.length; i++) {
			if (listeners[i] === listener) {
				listeners.splice(i, 1);
				return;
			}
		}
		throw 'Tried to remove unregistered listener';
	};

	object.emit = function(emitType) {
		if (type !== emitType) {
			if (originalEmit) {
				originalEmit.apply(object, arguments);
				return;
			} else {
				throw 'Unregistered event: ' + emitType;
			}
		}
		if (listeners.length == 0) {
			return;
		}
		var i;
		var args = [];
		for (i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		for (i = 0; i < listeners.length; i++) {
			listeners[i].apply(object, args)
		}
	};

	object.once = object.once || function(type, listener) {
		var wrappedListener = function() {
			listener.apply(object, arguments);
			object.removeListener(type, wrappedListener);
		};
		object.addListener(type, wrappedListener);
	};

	object.on = object.addListener;
};