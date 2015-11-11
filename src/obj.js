var obj_getProperty,
	obj_setProperty,
	obj_hasProperty,
	obj_extend,
	obj_extendDefaults,
	obj_extendMany,
	obj_extendProperties,
	obj_extendPropertiesDefaults,
	obj_create,
	obj_toFastProps,
	obj_defineProperty;
(function(){
	obj_getProperty = function(obj_, path){
		if ('.' === path) // obsolete
			return obj_;

		var obj = obj_,
			chain = path.split('.'),
			imax = chain.length,
			i = -1;
		while ( obj != null && ++i < imax ) {
			obj = obj[chain[i]];
		}
		return obj;
	};
	obj_setProperty = function(obj_, path, val) {
		var obj = obj_,
			chain = path.split('.'),
			imax = chain.length - 1,
			i = -1,
			key;
		while ( ++i < imax ) {
			key = chain[i];
			if (obj[key] == null)
				obj[key] = {};

			obj = obj[key];
		}
		obj[chain[i]] = val;
	};
	obj_hasProperty = function(obj, path) {
		var x = obj_getProperty(obj, path);
		return x !== void 0;
	};
	obj_defineProperty = function(obj, path, dscr) {
		var x = obj,
			chain = path.split('.'),
			imax = chain.length - 1,
			i = -1, key;
		while (++i < imax) {
			key = chain[i];
			if (x[key] == null)
				x[key] = {};
			x = x[key];
		}
		key = chain[imax];
		if (_Object_defineProperty) {
			if (dscr.writable	 === void 0) dscr.writable	 = true;
			if (dscr.configurable === void 0) dscr.configurable = true;
			if (dscr.enumerable   === void 0) dscr.enumerable   = true;
			_Object_defineProperty(x, key, dscr);
			return;
		}
		x[key] = dscr.value === void 0
			? dscr.value
			: (dscr.get && dscr.get());
	};
	obj_extend = function(a, b){
		if (b == null)
			return a || {};

		if (a == null)
			return obj_create(b);

		for(var key in b){
			a[key] = b[key];
		}
		return a;
	};
	obj_extendDefaults = function(a, b){
		if (b == null)
			return a || {};
		if (a == null)
			return obj_create(b);

		for(var key in b) {
			if (a[key] == null) {
				a[key] = b[key];
				continue;
			}
			if (key === 'toString' && a[key] === Object.prototype.toString) {
				a[key] = b[key];
			}
		}
		return a;
	}
	var extendPropertiesFactory = function(overwriteProps){
		if (_Object_getOwnProp == null)
			return overwriteProps ? obj_extend : obj_extendDefaults;

		return function(a, b){
			if (b == null)
				return a || {};

			if (a == null)
				return obj_create(b);

			var key, descr, ownDescr;
			for(key in b){
				descr = _Object_getOwnProp(b, key);
				if (descr == null)
					continue;
				if (overwriteProps !== true) {
					ownDescr = _Object_getOwnProp(a, key);
					if (ownDescr != null) {
						continue;
					}
				}
				if (descr.hasOwnProperty('value')) {
					a[key] = descr.value;
					continue;
				}
				_Object_defineProperty(a, key, descr);
			}
			return a;
		};
	};

	obj_extendProperties		 = extendPropertiesFactory(true);
	obj_extendPropertiesDefaults = extendPropertiesFactory(false );

	obj_extendMany = function(a){
		var imax = arguments.length,
			i = 1;
		for(; i<imax; i++) {
			a = obj_extend(a, arguments[i]);
		}
		return a;
	};
	obj_toFastProps = function(obj){
		/*jshint -W027*/
		function F() {}
		F.prototype = obj;
		new F();
		return;
		eval(obj);
	};
	_Object_create = obj_create = Object.create || function(x) {
		var Ctor = function(){};
		Ctor.prototype = x;
		return new Ctor;
	};
}());
