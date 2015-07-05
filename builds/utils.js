(function(factory){

	var exports = typeof module != null && typeof exports != null
		? exports : null;

	if (exports == null) {
		exports = window.Utils = {};
	}

	factory(exports);

}(function(exports){

	// import utils.embed.js

	exports = {
		class: {
			Deferred: class_Dfr,
			EventEmitter: class_EventEmitter,
			Uri: class_Uri,
			create: class_create,
			createEx: class_createEx,
		},
		arr: {
			remove  : arr_remove,
			each    : arr_each,
			indexOf : arr_indexOf,
			contains: arr_contains,
			pushMany: arr_pushMany
		},
		error: {
			createClass: error_createClass
		},
		fn: {
			createByPattern: fn_createByPattern,
			doNothing: fn_doNothing,
		},
		obj: {
			getProperty					: obj_getProperty,
			setProperty					: obj_setProperty,
			hasProperty					: obj_hasProperty,
			extend						: obj_extend,
			extendDefaults				: obj_extendDefaults,
			extendMany					: obj_extendMany,
			extendProperties			: obj_extendProperties,
			extendPropertiesDefaults	: obj_extendPropertiesDefaults,
			create						: obj_create,
			defineProperty				: obj_defineProperty
		},
		is: {
			Function		: is_Function,
			Array			: is_Array,
			ArrayLike		: is_ArrayLike,
			String			: is_String,
			Object			: is_Object,
			NotEmptyString	: is_notEmptyString,
			RawObject		: is_rawObject,
			Date			: is_Date,
			NODE			: is_NODE,
			DOM				: is_DOM
		}
	};

}));
