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
	
	class_create   = compile(obj_extend);
	class_createEx = compile(obj_extendProperties);
	
	function compile(extendFn) {
		return function(){
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
				extendFn(Proto, x);
			}
			return createClass(createCtor(Ctor, BaseCtor), Proto);
		};
	}
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