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
	
	class_create   = function(){
		var args = _Array_slice.call(arguments),
			Proto = args.pop();
		if (Proto == null) 
			Proto = {};
		
		var Ctor, BaseCtor, x;
		if (Proto.hasOwnProperty('constructor')) {
			Ctor = Proto.constructor;
		}
		
		var i = args.length;
		while ( --i > -1 ) {
			x = args[i];
			if (typeof x === 'function') {
				if (BaseCtor == null) 
					BaseCtor = x;
				
				x = x.prototype;
			}
			obj_extendDefaults(Proto, x);
		}
		return createClass(createCtor(Ctor, BaseCtor), Proto);
	};
	class_createEx = function(){
		var args = _Array_slice.call(arguments),
			Orig = args[args.length - 1],
			Proto = {};
		
		var Ctor, BaseCtor, x;
		if (Orig.hasOwnProperty('constructor')) {
			Ctor = Orig.constructor;
		}
		var imax = args.length,
			i = -1;
		while ( ++i < imax ) {
			x = args[i];
			if (typeof x === 'function') {
				BaseCtor = x;
				x = x.prototype;
			}
			obj_extendProperties(Proto, x);
		}
		return createClass(createCtor(Ctor, BaseCtor), Proto);
	};
	
	function createClass(Ctor, Proto) {
		Proto.constructor = Ctor;
		Ctor.prototype = Proto;
		return Ctor;
	}
	function createCtor(Ctor, BaseCtor) {
		if (Ctor == null) {
			if (BaseCtor == null) {
				return function Constructor() {};
			}
			return function(){
				return BaseCtor.apply(this, _Array_slice.call(arguments));
			};
		}
		if (BaseCtor == null) {
			return Ctor;
		}
		return function Constructor(){
			var args = _Array_slice.call(arguments)
			var x = BaseCtor.apply(this, args);
			if (x !== void 0) 
				return x;
			return Ctor.apply(this, args);
		};
	}
}());