/**
 * create([...Base], Proto)
 * Base: Function | Object
 * Proto: Object {
 *    constructor: ?Function
 *    ...
 */
var class_create,

	// with property accessor functions support
	class_createEx;
(function(){
	
	class_create = function(){
		var args = _Array_slice.call(arguments),
			Proto = args.pop();
		if (Proto == null) 
			Proto = {};
		
		var Ctor = Proto.hasOwnProperty('constructor')
			? Proto.constructor
			: function () {};
		
		var i = args.length,
			BaseCtor, x;
		while ( --i > -1 ) {
			x = args[i];
			if (typeof x === 'function') {
				BaseCtor = wrapFn(x, BaseCtor);
				x = x.prototype;
			}
			obj_extendDefaults(Proto, x);
		}
		return createClass(wrapFn(BaseCtor, Ctor), Proto);
	};
	class_createEx = function(){
		var args = _Array_slice.call(arguments),
			Proto = args.pop();
		if (Proto == null) 
			Proto = {};
		
		var Ctor = Proto.hasOwnProperty('constructor')
			? Proto.constructor
			: function () {};
			
		var imax = args.length,
			i = -1,
			BaseCtor, x;
		while ( ++i < imax ) {
			x = args[i];
			if (typeof x === 'function') {
				BaseCtor = wrapFn(BaseCtor, x);
				x = x.prototype;
			}
			obj_extendProperties(Proto, x);
		}
		return createClass(wrapFn(BaseCtor, Ctor), Proto);
	};
	
	function createClass(Ctor, Proto) {
		Proto.constructor = Ctor;
		Ctor.prototype = Proto;
		return Ctor;
	}
	function wrapFn(fnA, fnB) {
		if (fnA == null) {
			return fnB;
		}
		if (fnB == null) {
			return fnA;
		}
		return function(){
			var args = _Array_slice.call(arguments);
			var x = fnA.apply(this, args);
			if (x !== void 0) 
				return x;
			
			return fnB.apply(this, args);
		};
	}
}());