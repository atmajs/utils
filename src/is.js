var is_Function,
	is_Array,
	is_ArrayLike,
	is_String,
	is_Object,
	is_notEmptyString,
	is_rawObject,
	is_Date,
	is_NODE,
	is_DOM;

(function() {
	is_Function = function(x) {
		return typeof x === 'function';
	};
	is_Object = function(x) {
		return x != null && typeof x === 'object';
	};
	is_Array = is_ArrayLike = function(arr) {
		return arr != null
			&& typeof arr === 'object'
			&& typeof arr.length === 'number'
			&& typeof arr.slice === 'function'
			;
	};
	is_String = function(x) {
		return typeof x === 'string';
	};
	is_notEmptyString = function(x) {
		return typeof x === 'string' && x !== '';
	};
	is_rawObject = function(obj) {
		if (obj == null || typeof obj !== 'object')
			return false;

		return obj.constructor === Object;
	};
	is_Date = function(x) {
		if (x == null || typeof x !== 'object') {
			return false;
		}
		if (x.getFullYear != null && isNaN(x) === false) {
			return true;
		}
		return false;
	};
	is_DOM = typeof window !== 'undefined' && window.navigator != null;
	is_NODE = !is_DOM;

}());
