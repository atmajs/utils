(function(factory){

	var owner, property;
	if (typeof module !== 'undefined' && module.exports) {
		owner = module;
		property = 'exports';
	}
	else {
		owner = window;
		property = 'Utils';
	}

	factory(owner, property);

}(function(owner, property){

    	var _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty;
	var is_Function,
	    is_Object,
	    is_Array,
	    is_ArrayLike,
	    is_String,
	    is_notEmptyString,
	    is_rawObject,
	    is_Date,
	    is_DOM,
	    is_NODE;
	(function(){
		is_Function = function (x) {
		    return typeof x === 'function';
		}
		is_Object = function (x) {
		    return x != null && typeof x === 'object';
		}
		is_Array = function (arr) {
		    return (arr != null &&
		        typeof arr === 'object' &&
		        typeof arr.length === 'number' &&
		        typeof arr.slice === 'function');
		}
		is_ArrayLike = is_Array;
		is_String = function (x) {
		    return typeof x === 'string';
		}
		is_notEmptyString = function (x) {
		    return typeof x === 'string' && x !== '';
		}
		is_rawObject = function (x) {
		    return x != null && typeof x === 'object' && (x.constructor === Object || x.constructor == null);
		}
		is_Date = function (x) {
		    if (x == null || typeof x !== 'object') {
		        return false;
		    }
		    if (x.getFullYear != null && isNaN(x) === false) {
		        return true;
		    }
		    return false;
		}
		function is_PromiseLike(x) {
		    return x != null && typeof x === 'object' && typeof x.then === 'function';
		}
		function is_Observable(x) {
		    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
		}
		is_DOM = typeof window !== 'undefined' && window.navigator != null;
		is_NODE = !is_DOM;
		
	}());
	var obj_copyProperty,
	    obj_getProperty,
	    obj_setProperty,
	    obj_hasProperty,
	    obj_defineProperty,
	    obj_extend,
	    obj_extendDefaults,
	    obj_extendProperties,
	    obj_extendPropertiesDefaults,
	    obj_extendMany,
	    obj_create,
	    obj_defaults,
	    obj_clean,
	    obj_extendDescriptors;
	(function(){
		(function(){
			_Array_slice = Array.prototype.slice;
			var _Array_splice = Array.prototype.splice;
			var _Array_indexOf = Array.prototype.indexOf;
			var _Object_hasOwnProp = Object.hasOwnProperty;
			_Object_getOwnProp = Object.getOwnPropertyDescriptor;
			_Object_defineProperty = Object.defineProperty;
			var _global = typeof global !== 'undefined'
			    ? global
			    : window;
			var _document = typeof window !== 'undefined' && window.document != null
			    ? window.document
			    : null;
			function setDocument(doc) {
			    _document = doc;
			}
			
		}());
		var getDescriptor = Object.getOwnPropertyDescriptor;
		var defineDescriptor = Object.defineProperty;
		obj_copyProperty = getDescriptor == null
		    ? function (target, source, key) { return target[key] = source[key]; }
		    : function (target, source, key) {
		        var descr = getDescriptor(source, key);
		        if (descr == null) {
		            target[key] = source[key];
		            return;
		        }
		        if (descr.value !== void 0) {
		            target[key] = descr.value;
		            return;
		        }
		        defineDescriptor(target, key, descr);
		    };
		
		obj_getProperty = function (obj_, path) {
		    if (obj_ == null) {
		        return null;
		    }
		    if (path.indexOf('.') === -1) {
		        return obj_[path];
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
		    while (obj != null && ++i < imax) {
		        var key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        obj = obj[key];
		    }
		    return obj;
		}
		;
		obj_setProperty = function (obj_, path, val) {
		    if (path.indexOf('.') === -1) {
		        obj_[path] = val;
		        return;
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        var x = obj[key];
		        if (x == null) {
		            x = obj[key] = {};
		        }
		        obj = x;
		    }
		    obj[chain[i]] = val;
		}
		;
		obj_hasProperty = function (obj, path) {
		    var x = obj_getProperty(obj, path);
		    return x !== void 0;
		}
		;
		obj_defineProperty = function (obj, path, dscr) {
		    var x = obj, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (x[key] == null)
		            x[key] = {};
		        x = x[key];
		    }
		    key = chain[imax];
		    if (_Object_defineProperty) {
		        if (dscr.writable === void 0)
		            dscr.writable = true;
		        if (dscr.configurable === void 0)
		            dscr.configurable = true;
		        if (dscr.enumerable === void 0)
		            dscr.enumerable = true;
		        _Object_defineProperty(x, key, dscr);
		        return;
		    }
		    x[key] = dscr.value === void 0
		        ? dscr.value
		        : (dscr.get && dscr.get());
		}
		;
		obj_extend = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        a[key] = b[key];
		    }
		    return a;
		}
		;
		obj_extendDefaults = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
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
		var extendPropertiesFactory = function (overwriteProps) {
		    if (_Object_getOwnProp == null)
		        return overwriteProps ? obj_extend : obj_extendDefaults;
		    return function (a, b) {
		        if (b == null)
		            return a || {};
		        if (a == null)
		            return obj_create(b);
		        var key, descr, ownDescr;
		        for (key in b) {
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
		obj_extendProperties = extendPropertiesFactory(true);
		obj_extendPropertiesDefaults = extendPropertiesFactory(false);
		obj_extendMany = function (a, arg1, arg2, arg3, arg4, arg5, arg6) {
		    var imax = arguments.length, i = 1;
		    for (; i < imax; i++) {
		        a = obj_extend(a, arguments[i]);
		    }
		    return a;
		}
		;
		function obj_toFastProps(obj) {
		    /*jshint -W027*/
		    function F() { }
		    F.prototype = obj;
		    new F();
		    return;
		    eval(obj);
		}
		;
		var _Object_create = Object.create || function (x) {
		    var Ctor = function () { };
		    Ctor.prototype = x;
		    return new Ctor;
		};
		obj_create = _Object_create;
		obj_defaults = function (target, defaults) {
		    for (var key in defaults) {
		        if (target[key] == null)
		            target[key] = defaults[key];
		    }
		    return target;
		}
		/**
		 * Remove all NULL properties, optionally also all falsy-ies
		 */
		obj_clean = function (json, opts) {
		    var _a;
		    if (opts === void 0) { opts = {
		        removePrivate: false,
		        skipProperties: null,
		        removeEmptyArrays: false,
		        removeFalsy: false
		    }; }
		    if (json == null || typeof json !== 'object') {
		        return json;
		    }
		    if (is_ArrayLike(json)) {
		        var arr = json;
		        var i = 0;
		        var notNullIndex = -1;
		        for (; i < arr.length; i++) {
		            var val = arr[i];
		            if (val != null) {
		                notNullIndex = i;
		            }
		            obj_clean(val, opts);
		        }
		        // clean all last nullable values
		        if (notNullIndex + 1 < arr.length) {
		            arr.splice(notNullIndex + 1);
		        }
		        return json;
		    }
		    if (is_Object(json)) {
		        for (var key in json) {
		            if (opts.skipProperties != null && key in opts.skipProperties) {
		                delete json[key];
		                continue;
		            }
		            if (opts.ignoreProperties != null && key in opts.ignoreProperties) {
		                continue;
		            }
		            if (opts.removePrivate === true && key[0] === '_') {
		                delete json[key];
		                continue;
		            }
		            var val = json[key];
		            if ((_a = opts.shouldRemove) === null || _a === void 0 ? void 0 : _a.call(opts, key, val)) {
		                delete json[key];
		                continue;
		            }
		            if (isDefault(val, opts)) {
		                if (opts.strictProperties != null && key in opts.strictProperties && val != null) {
		                    continue;
		                }
		                delete json[key];
		                continue;
		            }
		            if (opts.deep !== false) {
		                obj_clean(val, opts);
		            }
		            if (opts.removeEmptyArrays && is_ArrayLike(val) && val.length === 0) {
		                delete json[key];
		            }
		        }
		        return json;
		    }
		    return json;
		}
		function isDefault(x, opts) {
		    if (x == null) {
		        return true;
		    }
		    if (opts.removeFalsy && (x === '' || x === false)) {
		        return true;
		    }
		    if (opts.removeEmptyArrays && is_ArrayLike(x) && x.length === 0) {
		        return true;
		    }
		    return false;
		}
		obj_extendDescriptors;
		var obj_extendDescriptorsDefaults;
		(function () {
		    if (getDescriptor == null) {
		        obj_extendDescriptors = obj_extend;
		        obj_extendDescriptorsDefaults = obj_defaults;
		        return;
		    }
		    obj_extendDescriptors = function (target, source) {
		        return _extendDescriptors(target, source, false);
		    };
		    obj_extendDescriptorsDefaults = function (target, source) {
		        return _extendDescriptors(target, source, true);
		    };
		    function _extendDescriptors(target, source, defaultsOnly) {
		        if (target == null)
		            return {};
		        if (source == null)
		            return source;
		        var descr, key;
		        for (key in source) {
		            if (defaultsOnly === true && target[key] != null)
		                continue;
		            descr = getDescriptor(source, key);
		            if (descr == null) {
		                obj_extendDescriptors(target, source["__proto__"]);
		                continue;
		            }
		            if (descr.value !== void 0) {
		                target[key] = descr.value;
		                continue;
		            }
		            defineDescriptor(target, key, descr);
		        }
		        return target;
		    }
		})();
		
		
	}());
	var class_create,
	    class_createEx;
	(function(){
		;
		/**
		 * create([...Base], Proto)
		 * Base: Function | Object
		 * Proto: Object {
		 *    constructor: ?Function
		 *    ...
		 */
		class_create = createClassFactory(obj_extendDefaults);
		// with property accessor functions support
		class_createEx = createClassFactory(obj_extendPropertiesDefaults);
		function createClassFactory(extendDefaultsFn) {
		    return function (a, b, c, d, e, f, g, h) {
		        var args = _Array_slice.call(arguments), Proto = args.pop();
		        if (Proto == null)
		            Proto = {};
		        var Ctor;
		        if (Proto.hasOwnProperty('constructor')) {
		            Ctor = Proto.constructor;
		            if (Ctor.prototype === void 0) {
		                var es6Method = Ctor;
		                Ctor = function ClassCtor() {
		                    var imax = arguments.length, i = -1, args = new Array(imax);
		                    while (++i < imax)
		                        args[i] = arguments[i];
		                    return es6Method.apply(this, args);
		                };
		            }
		        }
		        else {
		            Ctor = function ClassCtor() { };
		        }
		        var i = args.length, BaseCtor, x;
		        while (--i > -1) {
		            x = args[i];
		            if (typeof x === 'function') {
		                BaseCtor = wrapFn(x, BaseCtor);
		                x = x.prototype;
		            }
		            extendDefaultsFn(Proto, x);
		        }
		        return createClass(wrapFn(BaseCtor, Ctor), Proto);
		    };
		}
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
		    return function () {
		        var args = _Array_slice.call(arguments);
		        var x = fnA.apply(this, args);
		        if (x !== void 0)
		            return x;
		        return fnB.apply(this, args);
		    };
		}
		
	}());
	var arr_remove,
	    arr_each,
	    arr_indexOf,
	    arr_contains,
	    arr_pushMany;
	(function(){
		arr_remove = function (array, x) {
		    var i = array.indexOf(x);
		    if (i === -1)
		        return false;
		    array.splice(i, 1);
		    return true;
		}
		;
		arr_each = function (arr, fn, ctx) {
		    arr.forEach(fn, ctx);
		}
		;
		arr_indexOf = function (arr, x) {
		    return arr.indexOf(x);
		}
		;
		arr_contains = function (arr, x) {
		    return arr.indexOf(x) !== -1;
		}
		;
		arr_pushMany = function (arr, arrSource) {
		    if (arrSource == null || arr == null || arr === arrSource)
		        return;
		    var il = arr.length, jl = arrSource.length, j = -1;
		    while (++j < jl) {
		        arr[il + j] = arrSource[j];
		    }
		}
		;
		function arr_distinct(arr, compareFn) {
		    var out = [];
		    var hash = compareFn == null ? obj_create(null) : null;
		    outer: for (var i = 0; i < arr.length; i++) {
		        var x = arr[i];
		        if (compareFn == null) {
		            if (hash[x] === 1) {
		                continue;
		            }
		            hash[x] = 1;
		        }
		        else {
		            for (var j = i - 1; j > -1; j--) {
		                var prev = arr[j];
		                if (compareFn(x, prev)) {
		                    continue outer;
		                }
		            }
		        }
		        out.push(x);
		    }
		    return out;
		}
		
	}());
	var str_format,
	    str_dedent;
	(function(){
		str_format = function (str_, a, b, c, d) {
		    var imax = arguments.length;
		    var i = 0;
		    while (++i < imax) {
		        var x = arguments[i];
		        if (is_Object(x) && x.toJSON) {
		            x = x.toJSON();
		        }
		        str_ = str_.replace(rgxNum(i - 1), String(x));
		    }
		    return str_;
		}
		;
		str_dedent = function (str) {
		    var rgx = /^[\t ]*\S/gm, match = rgx.exec(str), count = -1;
		    while (match != null) {
		        var x = match[0].length;
		        if (count === -1 || x < count)
		            count = x;
		        match = rgx.exec(str);
		    }
		    if (--count < 1)
		        return str;
		    var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');
		    return str
		        .replace(replacer, '')
		        .replace(/^[\t ]*\r?\n/, '')
		        .replace(/\r?\n[\t ]*$/, '');
		}
		;
		var rgxNum;
		(function () {
		    rgxNum = function (num) {
		        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		    };
		    var cache_ = {};
		}());
		
	}());
	var error_createClass;
	(function(){
		error_createClass = function (name, Proto, stackSliceFrom) {
		    var Ctor = _createCtor(Proto, stackSliceFrom);
		    Ctor.prototype = new Error;
		    Proto.constructor = Error;
		    Proto.name = name;
		    obj_extend(Ctor.prototype, Proto);
		    return Ctor;
		}
		;
		function error_formatSource(source, index, filename) {
		    var cursor = error_cursor(source, index), lines = cursor[0], lineNum = cursor[1], rowNum = cursor[2], str = '';
		    if (filename != null) {
		        str += str_format(' at {0}:{1}:{2}\n', filename, lineNum, rowNum);
		    }
		    return str + error_formatCursor(lines, lineNum, rowNum);
		}
		;
		/**
		 * @returns [ lines, lineNum, rowNum ]
		 */
		function error_cursor(str, index) {
		    var lines = str.substring(0, index).split('\n'), line = lines.length, row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		    if (line > 1) {
		        // remove trailing newline
		        row -= 1;
		    }
		    return [str.split('\n'), line, row];
		}
		;
		function error_formatCursor(lines, lineNum, rowNum) {
		    var BEFORE = 3, AFTER = 2, i = lineNum - BEFORE, imax = i + BEFORE + AFTER, str = '';
		    if (i < 0)
		        i = 0;
		    if (imax > lines.length)
		        imax = lines.length;
		    var lineNumberLength = String(imax).length, lineNumber;
		    for (; i < imax; i++) {
		        if (str)
		            str += '\n';
		        lineNumber = ensureLength(i + 1, lineNumberLength);
		        str += lineNumber + '|' + lines[i];
		        if (i + 1 === lineNum) {
		            str += '\n' + repeat(' ', lineNumberLength + 1);
		            str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
		            str += '^';
		        }
		    }
		    return str;
		}
		;
		function ensureLength(num, count) {
		    var str = String(num);
		    while (str.length < count) {
		        str += ' ';
		    }
		    return str;
		}
		function repeat(char_, count) {
		    var str = '';
		    while (--count > -1) {
		        str += char_;
		    }
		    return str;
		}
		function _createCtor(Proto, stackFrom) {
		    var Ctor = Proto.hasOwnProperty('constructor')
		        ? Proto.constructor
		        : null;
		    return function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        obj_defineProperty(this, 'stack', {
		            value: _prepairStack(stackFrom || 3)
		        });
		        obj_defineProperty(this, 'message', {
		            value: str_format.apply(this, arguments)
		        });
		        if (Ctor != null) {
		            Ctor.apply(this, arguments);
		        }
		    };
		}
		function _prepairStack(sliceFrom) {
		    var stack = new Error().stack;
		    return stack == null ? null : stack
		        .split('\n')
		        .slice(sliceFrom)
		        .join('\n');
		}
		
	}());
	var fn_proxy,
	    fn_apply,
	    fn_doNothing,
	    fn_createByPattern;
	(function(){
		fn_proxy = function (fn, ctx) {
		    return function () {
		        var imax = arguments.length, args = new Array(imax), i = 0;
		        for (; i < imax; i++)
		            args[i] = arguments[i];
		        return fn_apply(fn, ctx, args);
		    };
		}
		;
		fn_apply = function (fn, ctx, args) {
		    var l = args.length;
		    if (0 === l)
		        return fn.call(ctx);
		    if (1 === l)
		        return fn.call(ctx, args[0]);
		    if (2 === l)
		        return fn.call(ctx, args[0], args[1]);
		    if (3 === l)
		        return fn.call(ctx, args[0], args[1], args[2]);
		    if (4 === l)
		        return fn.call(ctx, args[0], args[1], args[2], args[3]);
		    return fn.apply(ctx, args);
		}
		;
		fn_doNothing = function () {
		    return false;
		}
		;
		fn_createByPattern = function (definitions, ctx) {
		    var imax = definitions.length;
		    return function () {
		        var l = arguments.length, i = -1, def;
		        outer: while (++i < imax) {
		            def = definitions[i];
		            if (def.pattern.length !== l) {
		                continue;
		            }
		            var j = -1;
		            while (++j < l) {
		                var fn = def.pattern[j];
		                var val = arguments[j];
		                if (fn(val) === false) {
		                    continue outer;
		                }
		            }
		            return def.handler.apply(ctx, arguments);
		        }
		        console.error('InvalidArgumentException for a function', definitions, arguments);
		        return null;
		    };
		}
		;
		
	}());
	var class_Dfr;
	(function(){
		class_Dfr = /** @class */ (function () {
		    function class_Dfr() {
		        this._isAsync = true;
		        this._done = null;
		        this._fail = null;
		        this._always = null;
		        this._resolved = null;
		        this._rejected = null;
		    }
		    class_Dfr.prototype.defer = function () {
		        this._rejected = null;
		        this._resolved = null;
		        return this;
		    };
		    class_Dfr.prototype.isResolved = function () {
		        return this._resolved != null;
		    };
		    class_Dfr.prototype.isRejected = function () {
		        return this._rejected != null;
		    };
		    class_Dfr.prototype.isBusy = function () {
		        return this._resolved == null && this._rejected == null;
		    };
		    class_Dfr.prototype.resolve = function (value) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var done = this._done, always = this._always;
		        this._resolved = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(done, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    };
		    class_Dfr.prototype.reject = function (error) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var fail = this._fail, always = this._always;
		        this._rejected = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(fail, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    };
		    class_Dfr.prototype.then = function (filterSuccess, filterError) {
		        var dfr = new class_Dfr();
		        var done_ = filterSuccess, fail_ = filterError;
		        this
		            .done(delegate(dfr, 'resolve', done_))
		            .fail(delegate(dfr, 'reject', fail_));
		        return dfr;
		    };
		    class_Dfr.prototype.done = function (callback) {
		        if (this._rejected != null) {
		            return this;
		        }
		        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
		    };
		    class_Dfr.prototype.fail = function (callback) {
		        if (this._resolved != null) {
		            return this;
		        }
		        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
		    };
		    class_Dfr.prototype.always = function (callback) {
		        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
		    };
		    class_Dfr.prototype.pipe = function (mix /* ..methods */) {
		        var dfr;
		        if (typeof mix === 'function') {
		            dfr = new class_Dfr();
		            var done_ = mix, fail_ = arguments.length > 1
		                ? arguments[1]
		                : null;
		            this
		                .done(delegate(dfr, 'resolve', done_))
		                .fail(delegate(dfr, 'reject', fail_));
		            return dfr;
		        }
		        dfr = mix;
		        var imax = arguments.length, done = imax === 1, fail = imax === 1, i = 0, x;
		        while (++i < imax) {
		            x = arguments[i];
		            switch (x) {
		                case 'done':
		                    done = true;
		                    break;
		                case 'fail':
		                    fail = true;
		                    break;
		                default:
		                    console.error('Unsupported pipe channel', arguments[i]);
		                    break;
		            }
		        }
		        done && this.done(delegate(dfr, 'resolve'));
		        fail && this.fail(delegate(dfr, 'reject'));
		        function pipe(dfr, method) {
		            return function () {
		                dfr[method].apply(dfr, arguments);
		            };
		        }
		        return this;
		    };
		    class_Dfr.prototype.pipeCallback = function () {
		        var self = this;
		        return function (error) {
		            if (error != null) {
		                self.reject(error);
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            fn_apply(self.resolve, self, args);
		        };
		    };
		    class_Dfr.prototype.resolveDelegate = function () {
		        return fn_proxy(this.resolve, this);
		    };
		    class_Dfr.prototype.rejectDelegate = function () {
		        return fn_proxy(this.reject, this);
		    };
		    class_Dfr.prototype.catch = function (cb) {
		        return this.fail(cb);
		    };
		    class_Dfr.prototype.finally = function (cb) {
		        return this.always(cb);
		    };
		    class_Dfr.resolve = function (a, b, c) {
		        var dfr = new class_Dfr();
		        return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
		    };
		    class_Dfr.reject = function (error) {
		        var dfr = new class_Dfr();
		        return dfr.reject(error);
		    };
		    class_Dfr.run = function (fn, ctx) {
		        var dfr = new class_Dfr();
		        if (ctx == null)
		            ctx = dfr;
		        fn.call(ctx, fn_proxy(dfr.resolve, ctx), fn_proxy(dfr.reject, dfr), dfr);
		        return dfr;
		    };
		    class_Dfr.all = function (promises) {
		        var dfr = new class_Dfr, arr = new Array(promises.length), wait = promises.length, error = null;
		        if (wait === 0) {
		            return dfr.resolve(arr);
		        }
		        function tick(index) {
		            if (error != null) {
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            arr.splice.apply(arr, [index, 0].concat(args));
		            if (--wait === 0) {
		                dfr.resolve(arr);
		            }
		        }
		        function onReject(err) {
		            dfr.reject(error = err);
		        }
		        var imax = promises.length, i = -1;
		        while (++i < imax) {
		            var x = promises[i];
		            if (x == null || x.then == null) {
		                tick(i);
		                continue;
		            }
		            x.then(tick.bind(null, i), onReject);
		        }
		        return dfr;
		    };
		    return class_Dfr;
		}());
		
		;
		// PRIVATE
		function delegate(dfr, name, fn) {
		    return function () {
		        if (fn != null) {
		            var override = fn.apply(this, arguments);
		            if (override != null && override !== dfr) {
		                if (isDeferred(override)) {
		                    override.then(delegate(dfr, 'resolve'), delegate(dfr, 'reject'));
		                    return;
		                }
		                dfr[name](override);
		                return;
		            }
		        }
		        dfr[name].apply(dfr, arguments);
		    };
		}
		function dfr_bind(dfr, arguments_, listeners, callback) {
		    if (callback == null)
		        return dfr;
		    if (arguments_ != null)
		        fn_apply(callback, dfr, arguments_);
		    else
		        listeners.push(callback);
		    return dfr;
		}
		function dfr_clearListeners(dfr) {
		    dfr._done = null;
		    dfr._fail = null;
		    dfr._always = null;
		}
		function arr_callOnce(arr, ctx, args) {
		    if (arr == null)
		        return;
		    var imax = arr.length, i = -1, fn;
		    while (++i < imax) {
		        fn = arr[i];
		        if (fn)
		            fn_apply(fn, ctx, args);
		    }
		    arr.length = 0;
		}
		function isDeferred(x) {
		    return x != null
		        && typeof x === 'object'
		        && is_Function(x.then);
		}
		
	}());
	var class_Uri;
	(function(){
		class_Uri = /** @class */ (function () {
		    function class_Uri(uri) {
		        this.protocol = null;
		        this.host = null;
		        this.path = null;
		        this.file = null;
		        this.extension = null;
		        this.search = null;
		        this.value = null;
		        if (uri == null) {
		            return this;
		        }
		        if (util_isUri(uri)) {
		            return util_clone(uri);
		        }
		        uri = normalize_path(uri);
		        this.value = uri;
		        parse_protocol(this);
		        parse_host(this);
		        parse_search(this);
		        parse_file(this);
		        // normilize path - "/some/path"
		        this.path = normalize_pathsSlashes(this.value);
		        return this;
		    }
		    class_Uri.prototype.cdUp = function () {
		        var path = this.path;
		        if (path == null || path === '' || path === '/') {
		            this.path = '';
		            return this;
		        }
		        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
		        return this;
		    };
		    /**
		     * '/path' - relative to host
		     * '../path', 'path','./path' - relative to current path
		     */
		    class_Uri.prototype.combine = function (mix) {
		        var path;
		        if (util_isUri(mix)) {
		            if (mix.protocol || mix.host) {
		                return util_clone(mix);
		            }
		            path = path.toString();
		        }
		        else {
		            path = mix;
		        }
		        if (path == null || path === '') {
		            return util_clone(this);
		        }
		        var uri = util_clone(this);
		        uri.value = path;
		        parse_search(uri);
		        parse_file(uri);
		        if (uri.value === '') {
		            return uri;
		        }
		        path = uri.value.replace(/^\.\//i, '');
		        if (path[0] === '/') {
		            uri.path = path;
		            return uri;
		        }
		        while (/^(\.\.\/?)/ig.test(path)) {
		            uri.cdUp();
		            path = path.substring(3);
		            if (uri.path === '') {
		                break;
		            }
		        }
		        uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
		        return uri;
		    };
		    class_Uri.prototype.toString = function () {
		        var protocol = this.protocol ? this.protocol + '://' : '';
		        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
		        var str = protocol + path;
		        if (!(this.file || this.search) && this.path) {
		            str += '/';
		        }
		        return str;
		    };
		    class_Uri.prototype.toPathAndQuery = function () {
		        return util_combinePathes(this.path, this.file) + (this.search || '');
		    };
		    /**
		     * @return Current Uri Path{String} that is relative to @arg1 Uri
		     */
		    class_Uri.prototype.toRelativeString = function (uri) {
		        if (typeof uri === 'string') {
		            uri = new class_Uri(uri);
		        }
		        if (this.path.indexOf(uri.path) === 0) {
		            // host folder
		            var p = this.path ? this.path.replace(uri.path, '') : '';
		            if (p[0] === '/')
		                p = p.substring(1);
		            return util_combinePathes(p, this.file) + (this.search || '');
		        }
		        // sub folder
		        var current = this.path.split('/'), relative = uri.path.split('/'), commonpath = '', i = 0, length = Math.min(current.length, relative.length);
		        for (; i < length; i++) {
		            if (current[i] === relative[i])
		                continue;
		            break;
		        }
		        if (i > 0)
		            commonpath = current.splice(0, i).join('/');
		        if (commonpath) {
		            var sub = '', path = uri.path, forward;
		            while (path) {
		                if (this.path.indexOf(path) === 0) {
		                    forward = this.path.replace(path, '');
		                    break;
		                }
		                path = path.replace(/\/?[^\/]+\/?$/i, '');
		                sub += '../';
		            }
		            return util_combinePathes(sub, forward, this.file);
		        }
		        return this.toString();
		    };
		    class_Uri.prototype.toLocalFile = function () {
		        var path = util_combinePathes(this.host, this.path, this.file);
		        return util_win32Path(path);
		    };
		    class_Uri.prototype.toLocalDir = function () {
		        var path = util_combinePathes(this.host, this.path, '/');
		        return util_win32Path(path);
		    };
		    class_Uri.prototype.toDir = function () {
		        var str = this.protocol ? this.protocol + '://' : '';
		        return str + util_combinePathes(this.host, this.path, '/');
		    };
		    class_Uri.prototype.isRelative = function () {
		        return !(this.protocol || this.host);
		    };
		    class_Uri.prototype.getName = function () {
		        return this.file.replace('.' + this.extension, '');
		    };
		    class_Uri.combinePathes = util_combinePathes;
		    class_Uri.combine = util_combinePathes;
		    return class_Uri;
		}());
		
		;
		var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
		function util_isUri(object) {
		    return object && typeof object === 'object' && typeof object.combine === 'function';
		}
		function util_combinePathes(a, b, c, d) {
		    var args = arguments, str = '';
		    for (var i = 0, x, imax = arguments.length; i < imax; i++) {
		        x = arguments[i];
		        if (!x)
		            continue;
		        if (!str) {
		            str = x;
		            continue;
		        }
		        if (str[str.length - 1] !== '/')
		            str += '/';
		        str += x[0] === '/' ? x.substring(1) : x;
		    }
		    return str;
		}
		function normalize_pathsSlashes(str) {
		    if (str[str.length - 1] === '/') {
		        return str.substring(0, str.length - 1);
		    }
		    return str;
		}
		function util_clone(source) {
		    var uri = new class_Uri(), key;
		    for (key in source) {
		        if (typeof source[key] === 'string') {
		            uri[key] = source[key];
		        }
		    }
		    return uri;
		}
		function normalize_path(str) {
		    str = str
		        .replace(/\\/g, '/')
		        .replace(/^\.\//, '');
		    var double = /\/{2,}/g;
		    do {
		        var match = double.exec(str);
		        if (match == null) {
		            break;
		        }
		        if (match.index === 0 || str[match.index - 1] === ':') {
		            continue;
		        }
		        str = str.substring(0, match.index) + '/' + str.substring(match.index + match[0].length + 1);
		    } while (true);
		    return str;
		}
		function util_win32Path(path) {
		    if (rgx_win32Drive.test(path) && path[0] === '/') {
		        return path.substring(1);
		    }
		    return path;
		}
		function parse_protocol(uri) {
		    var match = rgx_protocol.exec(uri.value);
		    if (match == null) {
		        return;
		    }
		    uri.protocol = match[1];
		    uri.value = uri.value.substring(match[0].length);
		}
		function parse_host(uri) {
		    var match = rgx_win32Drive.exec(uri.value);
		    if (match) {
		        uri.protocol = 'file';
		        uri.host = match[1];
		        uri.value = uri.value.substring(uri.host.length);
		    }
		    if (uri.protocol == null || uri.protocol === 'file') {
		        return;
		    }
		    var pathStartIdx = uri.value.indexOf('/', 2);
		    uri.host = pathStartIdx !== -1
		        ? uri.value.substring(0, pathStartIdx)
		        : uri.value;
		    uri.value = uri.value.replace(uri.host, '');
		}
		function parse_search(uri) {
		    var question = uri.value.indexOf('?');
		    if (question === -1) {
		        return;
		    }
		    uri.search = uri.value.substring(question);
		    uri.value = uri.value.substring(0, question);
		}
		function parse_file(obj) {
		    var match = rgx_fileWithExt.exec(obj.value), file = match == null ? null : match[1];
		    if (file == null) {
		        return;
		    }
		    obj.file = file;
		    obj.value = obj.value.substring(0, obj.value.length - file.length);
		    obj.value = normalize_pathsSlashes(obj.value);
		    match = rgx_extension.exec(file);
		    obj.extension = match == null ? null : match[1];
		}
		
	}());
	var class_EventEmitter;
	(function(){
		var __spreadArrays = (this && this.__spreadArrays) || function () {
		    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
		    for (var r = Array(s), k = 0, i = 0; i < il; i++)
		        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
		            r[k] = a[j];
		    return r;
		};
		class_EventEmitter = /** @class */ (function () {
		    function class_EventEmitter() {
		        this._listeners = {};
		    }
		    class_EventEmitter.prototype.on = function (event, fn) {
		        if (fn != null) {
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    };
		    class_EventEmitter.prototype.once = function (event, fn) {
		        if (fn != null) {
		            fn._once = true;
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    };
		    class_EventEmitter.prototype.pipe = function (event) {
		        var that = this, args;
		        return function () {
		            args = _Array_slice.call(arguments);
		            args.unshift(event);
		            fn_apply(that.trigger, that, args);
		        };
		    };
		    class_EventEmitter.prototype.emit = function (event) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        var fns = this._listeners[event];
		        if (fns == null) {
		            return this;
		        }
		        for (var i = 0; i < fns.length; i++) {
		            var fn = fns[i];
		            fn_apply(fn, this, args);
		            if (fn !== fns[i]) {
		                // the callback has removed itself
		                i--;
		                continue;
		            }
		            if (fn._once === true) {
		                fns.splice(i, 1);
		                i--;
		            }
		        }
		        return this;
		    };
		    class_EventEmitter.prototype.trigger = function (event) {
		        var args = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            args[_i - 1] = arguments[_i];
		        }
		        return this.emit.apply(this, __spreadArrays([event], args));
		    };
		    class_EventEmitter.prototype.off = function (event, fn) {
		        var listeners = this._listeners[event];
		        if (listeners == null)
		            return this;
		        if (arguments.length === 1) {
		            listeners.length = 0;
		            return this;
		        }
		        var imax = listeners.length, i = -1;
		        while (++i < imax) {
		            if (listeners[i] === fn) {
		                listeners.splice(i, 1);
		                i--;
		                imax--;
		            }
		        }
		        return this;
		    };
		    return class_EventEmitter;
		}());
		
		;
		
	}());
	var mixin;
	(function(){
		var class_inherit,
		    class_extendProtoObjects,
		    proto_getKeys;
		(function(){
			var PROTO = "__proto__";
			var _getProtoOf = Object.getPrototypeOf;
			var _toString = Object.prototype.toString;
			var _isArguments = function (args) {
			    return _toString.call(args) === "[object Arguments]";
			};
			class_inherit = PROTO in Object.prototype ? inherit : inherit_protoLess;
			
			class_extendProtoObjects = function (proto, _base, _extends) {
			    var key, protoValue;
			    for (key in proto) {
			        protoValue = proto[key];
			        if (!is_rawObject(protoValue))
			            continue;
			        if (_base != null) {
			            if (is_rawObject(_base.prototype[key]))
			                obj_defaults(protoValue, _base.prototype[key]);
			        }
			        if (_extends != null) {
			            arr_each(_extends, proto_extendDefaultsDelegate(protoValue, key));
			        }
			    }
			}
			;
			// PRIVATE
			function proto_extendDefaultsDelegate(target, key) {
			    return function (source) {
			        var proto = proto_getProto(source), val = proto[key];
			        if (is_rawObject(val)) {
			            obj_defaults(target, val);
			        }
			    };
			}
			function proto_extend(proto, source) {
			    if (source == null)
			        return;
			    if (typeof proto === "function") {
			        proto = proto.prototype;
			    }
			    if (typeof source === "function") {
			        source = source.prototype;
			    }
			    if (_getProtoOf != null) {
			        /** ES6 Classes: methods are not enumarable, which is needed in `inherit_` method: so convert prototype to hash */
			        source = fillProtoHash(source, obj_create(null));
			    }
			    for (var key in source) {
			        if (key === "constructor") {
			            continue;
			        }
			        var val = source[key];
			        if (val != null) {
			            proto[key] = val;
			        }
			    }
			}
			proto_getKeys = function (mix) {
			    var keys = null;
			    if (_getProtoOf == null) {
			        keys = [];
			        for (var key in mix) {
			            keys.push(key);
			        }
			        return keys;
			    }
			    var cursor = mix;
			    var cursorEnd = null;
			    if (typeof mix === 'function') {
			        cursorEnd = Function.prototype;
			    }
			    else {
			        cursorEnd = Object.prototype;
			    }
			    while (cursor != cursorEnd) {
			        var names = Object.getOwnPropertyNames(cursor);
			        keys = keys == null
			            ? names
			            : keys.concat(names);
			        cursor = Object.getPrototypeOf(cursor);
			    }
			    return keys;
			}
			function proto_override(super_, fn) {
			    var proxy;
			    if (super_) {
			        proxy = function (mix) {
			            var args = arguments.length === 1 && _isArguments(mix) ? mix : arguments;
			            return fn_apply(super_, this, args);
			        };
			    }
			    else {
			        proxy = fn_doNothing;
			    }
			    return function () {
			        this["super"] = proxy;
			        return fn_apply(fn, this, arguments);
			    };
			}
			function inherit(_class, _base, _extends, original) {
			    var prototype = original;
			    var protoCursor = original;
			    prototype.constructor = _class.prototype.constructor;
			    if (_extends != null) {
			        protoCursor[PROTO] = {};
			        arr_each(_extends, function (x) {
			            proto_extend(protoCursor[PROTO], x);
			        });
			        protoCursor = protoCursor[PROTO];
			    }
			    if (_base != null)
			        protoCursor[PROTO] = _base.prototype;
			    _class.prototype = prototype;
			}
			function inherit_Object_create(_class, _base, _extends, original, _overrides, defaults) {
			    if (_base != null) {
			        _class.prototype = Object.create(_base.prototype);
			        obj_extendDescriptors(_class.prototype, original);
			    }
			    else {
			        _class.prototype = Object.create(original);
			    }
			    _class.prototype.constructor = _class;
			    if (_extends != null) {
			        arr_each(_extends, function (x) {
			            obj_defaults(_class.prototype, x);
			        });
			    }
			    var proto = _class.prototype;
			    obj_defaults(proto, defaults);
			    for (var key in _overrides) {
			        proto[key] = proto_override(proto[key], _overrides[key]);
			    }
			}
			// browser that doesnt support __proto__
			function inherit_protoLess(_class, _base, _extends, original) {
			    if (_base != null) {
			        var tmp = function () { };
			        tmp.prototype = _base.prototype;
			        _class.prototype = new tmp();
			        _class.prototype.constructor = _class;
			    }
			    if (_extends != null) {
			        arr_each(_extends, function (x) {
			            delete x.constructor;
			            proto_extend(_class, x);
			        });
			    }
			    proto_extend(_class, original);
			}
			function proto_getProto(mix) {
			    return is_Function(mix) ? mix.prototype : mix;
			}
			function fillProtoHash(proto, target) {
			    var keys = Object.getOwnPropertyNames(proto);
			    for (var i = 0; i < keys.length; i++) {
			        var key = keys[i];
			        if (target[key] != null) {
			            continue;
			        }
			        target[key] = proto[key];
			    }
			    var next = Object.getPrototypeOf(proto);
			    if (next == null || next === Object.prototype) {
			        return target;
			    }
			    return fillProtoHash(next, target);
			}
			
		}());
		mixin = function (mix1, mix2, mix3, mix4, mix5) {
		    return mix(mix1, mix2, mix3, mix4, mix5);
		}
		function mix() {
		    var mixins = [];
		    for (var _i = 0; _i < arguments.length; _i++) {
		        mixins[_i] = arguments[_i];
		    }
		    var _base = mixins[0];
		    var _extends = mixins.slice(1);
		    var _callable = ensureCallable(mixins);
		    var _class = function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        for (var i = _callable.length - 1; i > -1; i--) {
		            var x = _callable[i];
		            if (typeof x === 'function') {
		                fn_apply(x, this, args);
		            }
		        }
		    };
		    if (is_Function(_base) === false) {
		        _extends.unshift(_base);
		        _base = null;
		    }
		    mixStatics(_class, mixins);
		    var proto = {};
		    class_extendProtoObjects(proto, _base, _extends);
		    class_inherit(_class, _base, _extends, proto);
		    return _class;
		}
		function mixStatics(Ctor, mixins) {
		    for (var i = 0; i < mixins.length; i++) {
		        var Fn = mixins[i];
		        if (typeof Fn !== 'function') {
		            continue;
		        }
		        var keys = proto_getKeys(Fn);
		        for (var j = 0; j < keys.length; j++) {
		            var key = keys[j];
		            if (key in Ctor === false) {
		                obj_copyProperty(Ctor, Fn, key);
		            }
		        }
		    }
		}
		var ensureCallableSingle;
		var ensureCallable;
		(function () {
		    ensureCallable = function (arr) {
		        var out = [], i = arr.length;
		        while (--i > -1)
		            out[i] = ensureCallableSingle(arr[i]);
		        return out;
		    };
		    ensureCallableSingle = function (mix) {
		        if (is_Function(mix) === false) {
		            return mix;
		        }
		        var fn = mix;
		        var caller = directCaller;
		        var safe = false;
		        var wrapped = function () {
		            var args = [];
		            for (var _i = 0; _i < arguments.length; _i++) {
		                args[_i] = arguments[_i];
		            }
		            var self = this;
		            var x;
		            if (safe === true) {
		                caller(fn, self, args);
		                return;
		            }
		            try {
		                x = caller(fn, self, args);
		                safe = true;
		            }
		            catch (error) {
		                caller = newCaller;
		                safe = true;
		                caller(fn, self, args);
		            }
		            if (x != null) {
		                return x;
		            }
		        };
		        return wrapped;
		    };
		    function directCaller(fn, self, args) {
		        return fn.apply(self, args);
		    }
		    function newCaller(fn, self, args) {
		        var x = new (fn.bind.apply(fn, [null].concat(args)));
		        obj_extend(self, x);
		    }
		}());
		
	}());
	var Lib = {
	    class_Dfr: class_Dfr,
	    class_EventEmitter: class_EventEmitter,
	    class_Uri: class_Uri,
	    class_create: class_create,
	    class_createEx: class_createEx,
	    arr_remove: arr_remove,
	    arr_each: arr_each,
	    arr_indexOf: arr_indexOf,
	    arr_contains: arr_contains,
	    arr_pushMany: arr_pushMany,
	    error_createClass: error_createClass,
	    fn_createByPattern: fn_createByPattern,
	    fn_doNothing: fn_doNothing,
	    obj_getProperty: obj_getProperty,
	    obj_setProperty: obj_setProperty,
	    obj_hasProperty: obj_hasProperty,
	    obj_extend: obj_extend,
	    obj_extendDefaults: obj_extendDefaults,
	    obj_extendMany: obj_extendMany,
	    obj_extendProperties: obj_extendProperties,
	    obj_extendPropertiesDefaults: obj_extendPropertiesDefaults,
	    obj_create: obj_create,
	    obj_defineProperty: obj_defineProperty,
	    obj_clean: obj_clean,
	    is_Function: is_Function,
	    is_Array: is_Array,
	    is_ArrayLike: is_ArrayLike,
	    is_String: is_String,
	    is_Object: is_Object,
	    is_notEmptyString: is_notEmptyString,
	    is_rawObject: is_rawObject,
	    is_Date: is_Date,
	    is_NODE: is_NODE,
	    is_DOM: is_DOM,
	    str_format: str_format,
	    str_dedent: str_dedent,
	    mixin: mixin
	};
	
    
    for (var key in Lib) {
        owner[property][key] = Lib[key];
    }
}));