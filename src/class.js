/**
 * ([...Base], Proto)
 * Base: Function | Object
 * Proto: Object {
 *    constructor: ?Function
 *    ...
 */
var class_create;
(function(){
	class_create = function () {
		var args = _Array_slice.call(arguments),
			Proto = args.pop();
		if (Proto == null) {
			Proto = {};
		}
		var Ctor = Proto.hasOwnProperty('constructor')
				? Proto.constructor
				: null,
			BaseCtor;
		
		
		var i = args.length, x, Parent;
		while ( --i > -1 ) {
			x = args[i];
			if (typeof x === 'function') {
				if (BaseCtor == null) 
					BaseCtor = x;
				
				x = x.prototype;
			}
			for(var key in x){
				if (Proto[key] == null) {
					Proto[key] = x[key];
				}
			}
			if (Parent == null) {
				Parent = x;
			}
		}
		
		Proto.Parent = Parent
		
		if (Ctor == null)  {
			Ctor = BaseCtor == null
				? function(){}
				: function(){
					return BaseCtor.apply(this, _Array_slice.call(arguments));
				};
		}
		else if (BaseCtor) {
			var _Ctor = Ctor;
			Ctor = function(){
				var args = _Array_slice.call(arguments)
				var x = BaseCtor.apply(this, args);
				if (x !== void 0) 
					return x;
				return _Ctor.apply(this, args);
			};
		}
		
		Ctor.prototype = Proto;
		return Ctor;
	};
}());