
// source ./ESM.js
var module = {
    exports: {}
};

var _src_arr = {};
var _src_class = {};
var _src_class_Dfr = {};
var _src_class_EventEmitter = {};
var _src_class_Uri = {};
var _src_error = {};
var _src_fn = {};
var _src_is = {};
var _src_mixin = {};
var _src_obj = {};
var _src_promisify = {};
var _src_proto = {};
var _src_refs = {};
var _src_str = {};

// source ./ModuleSimplified.js
var _src_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_is != null ? _src_is : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_NODE = exports.is_DOM = exports.is_Observable = exports.is_PromiseLike = exports.is_Date = exports.is_rawObject = exports.is_notEmptyString = exports.is_String = exports.is_ArrayLike = exports.is_Array = exports.is_Object = exports.is_Function = void 0;
function is_Function(x) {
    return typeof x === 'function';
}
exports.is_Function = is_Function;
function is_Object(x) {
    return x != null && typeof x === 'object';
}
exports.is_Object = is_Object;
function is_Array(arr) {
    return (arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function');
}
exports.is_Array = is_Array;
exports.is_ArrayLike = is_Array;
function is_String(x) {
    return typeof x === 'string';
}
exports.is_String = is_String;
function is_notEmptyString(x) {
    return typeof x === 'string' && x !== '';
}
exports.is_notEmptyString = is_notEmptyString;
function is_rawObject(x) {
    return x != null && typeof x === 'object' && (x.constructor === Object || x.constructor == null);
}
exports.is_rawObject = is_rawObject;
function is_Date(x) {
    if (x == null || typeof x !== 'object') {
        return false;
    }
    if (x.getFullYear != null && isNaN(x) === false) {
        return true;
    }
    return false;
}
exports.is_Date = is_Date;
function is_PromiseLike(x) {
    return x != null && typeof x === 'object' && typeof x.then === 'function';
}
exports.is_PromiseLike = is_PromiseLike;
function is_Observable(x) {
    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
}
exports.is_Observable = is_Observable;
exports.is_DOM = typeof window !== 'undefined' && window.navigator != null;
exports.is_NODE = !exports.is_DOM;
//# sourceMappingURL=is.js.map
//# sourceMappingURL=is.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_is === module.exports) {
        // do nothing if
    } else if (__isObj(_src_is) && __isObj(module.exports)) {
        Object.assign(_src_is, module.exports);
    } else {
        _src_is = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_refs;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_refs != null ? _src_refs : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDocument = exports._document = exports._global = exports._Object_defineProperty = exports._Object_getOwnProp = exports._Object_hasOwnProp = exports._Array_indexOf = exports._Array_splice = exports._Array_slice = void 0;
exports._Array_slice = Array.prototype.slice;
exports._Array_splice = Array.prototype.splice;
exports._Array_indexOf = Array.prototype.indexOf;
exports._Object_hasOwnProp = Object.hasOwnProperty;
exports._Object_getOwnProp = Object.getOwnPropertyDescriptor;
exports._Object_defineProperty = Object.defineProperty;
exports._global = typeof global !== 'undefined'
    ? global
    : window;
exports._document = typeof window !== 'undefined' && window.document != null
    ? window.document
    : null;
function setDocument(doc) {
    exports._document = doc;
}
exports.setDocument = setDocument;
//# sourceMappingURL=refs.js.map
//# sourceMappingURL=refs.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_refs === module.exports) {
        // do nothing if
    } else if (__isObj(_src_refs) && __isObj(module.exports)) {
        Object.assign(_src_refs, module.exports);
    } else {
        _src_refs = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_obj != null ? _src_obj : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_extendDescriptorsDefaults = exports.obj_extendDescriptors = exports.obj_clean = exports.obj_defaults = exports.obj_create = exports._Object_create = exports.obj_toFastProps = exports.obj_extendMany = exports.obj_extendPropertiesDefaults = exports.obj_extendProperties = exports.obj_extendDefaults = exports.obj_extend = exports.obj_defineProperty = exports.obj_hasProperty = exports.obj_setProperty = exports.obj_getProperty = exports.obj_copyProperty = void 0;
const is_1 = _src_is;
const refs_1 = _src_refs;
const getDescriptor = Object.getOwnPropertyDescriptor;
const defineDescriptor = Object.defineProperty;
let obj_copyProperty = getDescriptor == null
    ? (target, source, key) => target[key] = source[key]
    : (target, source, key) => {
        let descr = getDescriptor(source, key);
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
exports.obj_copyProperty = obj_copyProperty;
function obj_getProperty(obj_, path) {
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
exports.obj_getProperty = obj_getProperty;
;
function obj_setProperty(obj_, path, val) {
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
exports.obj_setProperty = obj_setProperty;
;
function obj_hasProperty(obj, path) {
    var x = obj_getProperty(obj, path);
    return x !== void 0;
}
exports.obj_hasProperty = obj_hasProperty;
;
function obj_defineProperty(obj, path, dscr) {
    var x = obj, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
    while (++i < imax) {
        key = chain[i];
        if (x[key] == null)
            x[key] = {};
        x = x[key];
    }
    key = chain[imax];
    if (refs_1._Object_defineProperty) {
        if (dscr.writable === void 0)
            dscr.writable = true;
        if (dscr.configurable === void 0)
            dscr.configurable = true;
        if (dscr.enumerable === void 0)
            dscr.enumerable = true;
        (0, refs_1._Object_defineProperty)(x, key, dscr);
        return;
    }
    x[key] = dscr.value === void 0
        ? dscr.value
        : (dscr.get && dscr.get());
}
exports.obj_defineProperty = obj_defineProperty;
;
function obj_extend(a, b) {
    if (b == null)
        return a || {};
    if (a == null)
        return (0, exports.obj_create)(b);
    for (var key in b) {
        a[key] = b[key];
    }
    return a;
}
exports.obj_extend = obj_extend;
;
function obj_extendDefaults(a, b) {
    if (b == null)
        return a || {};
    if (a == null)
        return (0, exports.obj_create)(b);
    for (let key in b) {
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
exports.obj_extendDefaults = obj_extendDefaults;
var extendPropertiesFactory = function (overwriteProps) {
    if (refs_1._Object_getOwnProp == null)
        return overwriteProps ? obj_extend : obj_extendDefaults;
    return function (a, b) {
        if (b == null)
            return a || {};
        if (a == null)
            return (0, exports.obj_create)(b);
        var key, descr, ownDescr;
        for (key in b) {
            descr = (0, refs_1._Object_getOwnProp)(b, key);
            if (descr == null)
                continue;
            if (overwriteProps !== true) {
                ownDescr = (0, refs_1._Object_getOwnProp)(a, key);
                if (ownDescr != null) {
                    continue;
                }
            }
            if (descr.hasOwnProperty('value')) {
                a[key] = descr.value;
                continue;
            }
            (0, refs_1._Object_defineProperty)(a, key, descr);
        }
        return a;
    };
};
exports.obj_extendProperties = extendPropertiesFactory(true);
exports.obj_extendPropertiesDefaults = extendPropertiesFactory(false);
function obj_extendMany(a, arg1, arg2, arg3, arg4, arg5, arg6) {
    var imax = arguments.length, i = 1;
    for (; i < imax; i++) {
        a = obj_extend(a, arguments[i]);
    }
    return a;
}
exports.obj_extendMany = obj_extendMany;
;
function obj_toFastProps(obj) {
    /*jshint -W027*/
    function F() { }
    F.prototype = obj;
    new F();
    return;
    eval(obj);
}
exports.obj_toFastProps = obj_toFastProps;
;
exports._Object_create = Object.create || function (x) {
    var Ctor = function () { };
    Ctor.prototype = x;
    return new Ctor;
};
exports.obj_create = exports._Object_create;
function obj_defaults(target, defaults) {
    for (var key in defaults) {
        if (target[key] == null)
            target[key] = defaults[key];
    }
    return target;
}
exports.obj_defaults = obj_defaults;
/**
 * Remove all NULL properties, optionally also all falsy-ies
 */
function obj_clean(json, opts = {
    removePrivate: false,
    skipProperties: null,
    removeEmptyArrays: false,
    removeFalsy: false
}) {
    var _a;
    if (json == null || typeof json !== 'object') {
        return json;
    }
    if ((0, is_1.is_ArrayLike)(json)) {
        let arr = json;
        let i = 0;
        let notNullIndex = -1;
        for (; i < arr.length; i++) {
            let val = arr[i];
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
    if ((0, is_1.is_Object)(json)) {
        for (let key in json) {
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
            let val = json[key];
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
            if (opts.removeEmptyArrays && (0, is_1.is_ArrayLike)(val) && val.length === 0) {
                delete json[key];
            }
        }
        return json;
    }
    return json;
}
exports.obj_clean = obj_clean;
function isDefault(x, opts) {
    if (x == null) {
        return true;
    }
    if (opts.removeFalsy && (x === '' || x === false)) {
        return true;
    }
    if (opts.removeEmptyArrays && (0, is_1.is_ArrayLike)(x) && x.length === 0) {
        return true;
    }
    return false;
}
let obj_extendDescriptors;
exports.obj_extendDescriptors = obj_extendDescriptors;
let obj_extendDescriptorsDefaults;
exports.obj_extendDescriptorsDefaults = obj_extendDescriptorsDefaults;
(function () {
    if (getDescriptor == null) {
        exports.obj_extendDescriptors = obj_extendDescriptors = obj_extend;
        exports.obj_extendDescriptorsDefaults = obj_extendDescriptorsDefaults = obj_defaults;
        return;
    }
    exports.obj_extendDescriptors = obj_extendDescriptors = function (target, source) {
        return _extendDescriptors(target, source, false);
    };
    exports.obj_extendDescriptorsDefaults = obj_extendDescriptorsDefaults = function (target, source) {
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
//# sourceMappingURL=obj.js.map
//# sourceMappingURL=obj.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_obj === module.exports) {
        // do nothing if
    } else if (__isObj(_src_obj) && __isObj(module.exports)) {
        Object.assign(_src_obj, module.exports);
    } else {
        _src_obj = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_class;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_class != null ? _src_class : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.class_createEx = exports.class_create = void 0;
const obj_1 = _src_obj;
const refs_1 = _src_refs;
;
/**
 * create([...Base], Proto)
 * Base: Function | Object
 * Proto: Object {
 *    constructor: ?Function
 *    ...
 */
exports.class_create = createClassFactory(obj_1.obj_extendDefaults);
// with property accessor functions support
exports.class_createEx = createClassFactory(obj_1.obj_extendPropertiesDefaults);
function createClassFactory(extendDefaultsFn) {
    return function (a, b, c, d, e, f, g, h) {
        var args = refs_1._Array_slice.call(arguments), Proto = args.pop();
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
        var args = refs_1._Array_slice.call(arguments);
        var x = fnA.apply(this, args);
        if (x !== void 0)
            return x;
        return fnB.apply(this, args);
    };
}
//# sourceMappingURL=class.js.map
//# sourceMappingURL=class.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_class === module.exports) {
        // do nothing if
    } else if (__isObj(_src_class) && __isObj(module.exports)) {
        Object.assign(_src_class, module.exports);
    } else {
        _src_class = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_arr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_arr != null ? _src_arr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr_distinct = exports.arr_pushMany = exports.arr_contains = exports.arr_indexOf = exports.arr_each = exports.arr_remove = void 0;
const obj_1 = _src_obj;
function arr_remove(array, x) {
    var i = array.indexOf(x);
    if (i === -1)
        return false;
    array.splice(i, 1);
    return true;
}
exports.arr_remove = arr_remove;
;
function arr_each(arr, fn, ctx) {
    arr.forEach(fn, ctx);
}
exports.arr_each = arr_each;
;
function arr_indexOf(arr, x) {
    return arr.indexOf(x);
}
exports.arr_indexOf = arr_indexOf;
;
function arr_contains(arr, x) {
    return arr.indexOf(x) !== -1;
}
exports.arr_contains = arr_contains;
;
function arr_pushMany(arr, arrSource) {
    if (arrSource == null || arr == null || arr === arrSource)
        return;
    var il = arr.length, jl = arrSource.length, j = -1;
    while (++j < jl) {
        arr[il + j] = arrSource[j];
    }
}
exports.arr_pushMany = arr_pushMany;
;
function arr_distinct(arr, compareFn) {
    let out = [];
    let hash = compareFn == null ? (0, obj_1.obj_create)(null) : null;
    outer: for (let i = 0; i < arr.length; i++) {
        let x = arr[i];
        if (compareFn == null) {
            if (hash[x] === 1) {
                continue;
            }
            hash[x] = 1;
        }
        else {
            for (let j = i - 1; j > -1; j--) {
                let prev = arr[j];
                if (compareFn(x, prev)) {
                    continue outer;
                }
            }
        }
        out.push(x);
    }
    return out;
}
exports.arr_distinct = arr_distinct;
//# sourceMappingURL=arr.js.map
//# sourceMappingURL=arr.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_arr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_arr) && __isObj(module.exports)) {
        Object.assign(_src_arr, module.exports);
    } else {
        _src_arr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_str;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_str != null ? _src_str : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str_dedent = exports.str_format = void 0;
const is_1 = _src_is;
function str_format(str_, a, b, c, d) {
    let imax = arguments.length;
    let i = 0;
    while (++i < imax) {
        let x = arguments[i];
        if ((0, is_1.is_Object)(x) && x.toJSON) {
            x = x.toJSON();
        }
        str_ = str_.replace(rgxNum(i - 1), String(x));
    }
    return str_;
}
exports.str_format = str_format;
;
function str_dedent(str) {
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
exports.str_dedent = str_dedent;
;
var rgxNum;
(function () {
    rgxNum = function (num) {
        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
    };
    var cache_ = {};
}());
//# sourceMappingURL=str.js.map
//# sourceMappingURL=str.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_str === module.exports) {
        // do nothing if
    } else if (__isObj(_src_str) && __isObj(module.exports)) {
        Object.assign(_src_str, module.exports);
    } else {
        _src_str = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_error;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_error != null ? _src_error : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_formatCursor = exports.error_cursor = exports.error_formatSource = exports.error_createClass = void 0;
const obj_1 = _src_obj;
const str_1 = _src_str;
function error_createClass(name, Proto, stackSliceFrom) {
    var Ctor = _createCtor(Proto, stackSliceFrom);
    Ctor.prototype = new Error;
    Proto.constructor = Error;
    Proto.name = name;
    (0, obj_1.obj_extend)(Ctor.prototype, Proto);
    return Ctor;
}
exports.error_createClass = error_createClass;
;
function error_formatSource(source, index, filename) {
    var cursor = error_cursor(source, index), lines = cursor[0], lineNum = cursor[1], rowNum = cursor[2], str = '';
    if (filename != null) {
        str += (0, str_1.str_format)(' at {0}:{1}:{2}\n', filename, lineNum, rowNum);
    }
    return str + error_formatCursor(lines, lineNum, rowNum);
}
exports.error_formatSource = error_formatSource;
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
exports.error_cursor = error_cursor;
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
exports.error_formatCursor = error_formatCursor;
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
    return function (...args) {
        (0, obj_1.obj_defineProperty)(this, 'stack', {
            value: _prepairStack(stackFrom || 3)
        });
        (0, obj_1.obj_defineProperty)(this, 'message', {
            value: str_1.str_format.apply(this, arguments)
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
//# sourceMappingURL=error.js.map
//# sourceMappingURL=error.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_error === module.exports) {
        // do nothing if
    } else if (__isObj(_src_error) && __isObj(module.exports)) {
        Object.assign(_src_error, module.exports);
    } else {
        _src_error = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fn != null ? _src_fn : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_createByPattern = exports.fn_doNothing = exports.fn_apply = exports.fn_proxy = void 0;
function fn_proxy(fn, ctx) {
    return function () {
        var imax = arguments.length, args = new Array(imax), i = 0;
        for (; i < imax; i++)
            args[i] = arguments[i];
        return fn_apply(fn, ctx, args);
    };
}
exports.fn_proxy = fn_proxy;
;
function fn_apply(fn, ctx, args) {
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
exports.fn_apply = fn_apply;
;
function fn_doNothing() {
    return false;
}
exports.fn_doNothing = fn_doNothing;
;
function fn_createByPattern(definitions, ctx) {
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
exports.fn_createByPattern = fn_createByPattern;
;
//# sourceMappingURL=fn.js.map
//# sourceMappingURL=fn.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fn === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fn) && __isObj(module.exports)) {
        Object.assign(_src_fn, module.exports);
    } else {
        _src_fn = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_class_Dfr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_class_Dfr != null ? _src_class_Dfr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.class_Dfr = void 0;
const fn_1 = _src_fn;
const is_1 = _src_is;
const refs_1 = _src_refs;
class class_Dfr {
    constructor() {
        this._isAsync = true;
        this._done = null;
        this._fail = null;
        this._always = null;
        this._resolved = null;
        this._rejected = null;
    }
    get [Symbol.toStringTag]() {
        return 'Promise';
    }
    defer() {
        this._rejected = null;
        this._resolved = null;
        return this;
    }
    isResolved() {
        return this._resolved != null;
    }
    isRejected() {
        return this._rejected != null;
    }
    isBusy() {
        return this._resolved == null && this._rejected == null;
    }
    resolve(value, ...args) {
        var done = this._done, always = this._always;
        this._resolved = arguments;
        dfr_clearListeners(this);
        arr_callOnce(done, this, arguments);
        arr_callOnce(always, this, [this]);
        return this;
    }
    reject(error, ...args) {
        var fail = this._fail, always = this._always;
        this._rejected = arguments;
        dfr_clearListeners(this);
        arr_callOnce(fail, this, arguments);
        arr_callOnce(always, this, [this]);
        return this;
    }
    then(filterSuccess, filterError) {
        var dfr = new class_Dfr();
        var done_ = filterSuccess, fail_ = filterError;
        this
            .done(delegate(dfr, 'resolve', done_))
            .fail(delegate(dfr, 'reject', fail_));
        return dfr;
    }
    done(callback) {
        if (this._rejected != null) {
            return this;
        }
        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
    }
    fail(callback) {
        if (this._resolved != null) {
            return this;
        }
        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
    }
    always(callback) {
        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
    }
    pipe(mix /* ..methods */) {
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
    }
    pipeCallback() {
        var self = this;
        return function (error) {
            if (error != null) {
                self.reject(error);
                return;
            }
            var args = refs_1._Array_slice.call(arguments, 1);
            (0, fn_1.fn_apply)(self.resolve, self, args);
        };
    }
    resolveDelegate() {
        return (0, fn_1.fn_proxy)(this.resolve, this);
    }
    rejectDelegate() {
        return (0, fn_1.fn_proxy)(this.reject, this);
    }
    catch(cb) {
        return this.fail(cb);
    }
    finally(cb) {
        return this.always(cb);
    }
    static resolve(a, b, c) {
        var dfr = new class_Dfr();
        return dfr.resolve.apply(dfr, refs_1._Array_slice.call(arguments));
    }
    static reject(error) {
        var dfr = new class_Dfr();
        return dfr.reject(error);
    }
    static run(fn, ctx) {
        var dfr = new class_Dfr();
        if (ctx == null)
            ctx = dfr;
        fn.call(ctx, (0, fn_1.fn_proxy)(dfr.resolve, ctx), (0, fn_1.fn_proxy)(dfr.reject, dfr), dfr);
        return dfr;
    }
    static all(promises) {
        var dfr = new class_Dfr, arr = new Array(promises.length), wait = promises.length, error = null;
        if (wait === 0) {
            return dfr.resolve(arr);
        }
        function tick(index) {
            if (error != null) {
                return;
            }
            var args = refs_1._Array_slice.call(arguments, 1);
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
    }
}
exports.class_Dfr = class_Dfr;
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
        (0, fn_1.fn_apply)(callback, dfr, arguments_);
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
            (0, fn_1.fn_apply)(fn, ctx, args);
    }
    arr.length = 0;
}
function isDeferred(x) {
    return x != null
        && typeof x === 'object'
        && (0, is_1.is_Function)(x.then);
}
//# sourceMappingURL=Dfr.js.map
//# sourceMappingURL=Dfr.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_class_Dfr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_class_Dfr) && __isObj(module.exports)) {
        Object.assign(_src_class_Dfr, module.exports);
    } else {
        _src_class_Dfr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_class_Uri;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_class_Uri != null ? _src_class_Uri : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.class_Uri = void 0;
class class_Uri {
    constructor(uri) {
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
    cdUp() {
        var path = this.path;
        if (path == null || path === '' || path === '/') {
            this.path = '';
            return this;
        }
        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
        return this;
    }
    /**
     * '/path' - relative to host
     * '../path', 'path','./path' - relative to current path
     */
    combine(mix) {
        let path;
        if (util_isUri(mix)) {
            if (mix.protocol || mix.host) {
                return util_clone(mix);
            }
            path = mix.toString();
        }
        else {
            path = mix;
        }
        if (path == null || path === '') {
            return util_clone(this);
        }
        let uri = util_clone(this);
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
    }
    toString() {
        var protocol = this.protocol ? this.protocol + '://' : '';
        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
        var str = protocol + path;
        if (!(this.file || this.search) && this.path) {
            str += '/';
        }
        return str;
    }
    toPathAndQuery() {
        return util_combinePathes(this.path, this.file) + (this.search || '');
    }
    /**
     * @return Current Uri Path{String} that is relative to @arg1 Uri
     */
    toRelativeString(uri) {
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
    }
    toLocalFile() {
        var path = util_combinePathes(this.host, this.path, this.file);
        return util_win32Path(path);
    }
    toLocalDir() {
        var path = util_combinePathes(this.host, this.path, '/');
        return util_win32Path(path);
    }
    toDir() {
        var str = this.protocol ? this.protocol + '://' : '';
        return str + util_combinePathes(this.host, this.path, '/');
    }
    isRelative() {
        return !(this.protocol || this.host);
    }
    getName() {
        return this.file.replace('.' + this.extension, '');
    }
}
exports.class_Uri = class_Uri;
class_Uri.combinePathes = util_combinePathes;
class_Uri.combine = util_combinePathes;
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
    let double = /\/{2,}/g;
    do {
        let match = double.exec(str);
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
    let pathStartIdx = uri.value.indexOf('/', 2);
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
//# sourceMappingURL=Uri.js.map
//# sourceMappingURL=Uri.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_class_Uri === module.exports) {
        // do nothing if
    } else if (__isObj(_src_class_Uri) && __isObj(module.exports)) {
        Object.assign(_src_class_Uri, module.exports);
    } else {
        _src_class_Uri = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_class_EventEmitter;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_class_EventEmitter != null ? _src_class_EventEmitter : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.class_EventEmitter = void 0;
const fn_1 = _src_fn;
class class_EventEmitter {
    constructor() {
        this._listeners = {};
    }
    on(event, fn) {
        if (fn != null) {
            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
        }
        return this;
    }
    once(event, fn) {
        if (fn != null) {
            fn._once = true;
            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
        }
        return this;
    }
    /**
     * Returns a function, which when called - triggers the event with the arguments passed to that function
     */
    pipe(event) {
        return (...args) => {
            this.emit(event, ...args);
        };
    }
    emit(event, ...args) {
        let fns = this._listeners[event];
        if (fns == null) {
            return this;
        }
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            (0, fn_1.fn_apply)(fn, this, args);
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
    }
    trigger(event, ...args) {
        return this.emit(event, ...args);
    }
    off(event, fn) {
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
    }
}
exports.class_EventEmitter = class_EventEmitter;
;
//# sourceMappingURL=EventEmitter.js.map
//# sourceMappingURL=EventEmitter.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_class_EventEmitter === module.exports) {
        // do nothing if
    } else if (__isObj(_src_class_EventEmitter) && __isObj(module.exports)) {
        Object.assign(_src_class_EventEmitter, module.exports);
    } else {
        _src_class_EventEmitter = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_proto;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_proto != null ? _src_proto : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proto_getKeys = exports.class_extendProtoObjects = exports.class_inherit = void 0;
const is_1 = _src_is;
const fn_1 = _src_fn;
const arr_1 = _src_arr;
const obj_1 = _src_obj;
const PROTO = "__proto__";
const _getProtoOf = Object.getPrototypeOf;
const _toString = Object.prototype.toString;
const _isArguments = function (args) {
    return _toString.call(args) === "[object Arguments]";
};
const class_inherit = PROTO in Object.prototype ? inherit : inherit_protoLess;
exports.class_inherit = class_inherit;
function class_extendProtoObjects(proto, _base, _extends) {
    var key, protoValue;
    for (key in proto) {
        protoValue = proto[key];
        if (!(0, is_1.is_rawObject)(protoValue))
            continue;
        if (_base != null) {
            if ((0, is_1.is_rawObject)(_base.prototype[key]))
                (0, obj_1.obj_defaults)(protoValue, _base.prototype[key]);
        }
        if (_extends != null) {
            (0, arr_1.arr_each)(_extends, proto_extendDefaultsDelegate(protoValue, key));
        }
    }
}
exports.class_extendProtoObjects = class_extendProtoObjects;
;
// PRIVATE
function proto_extendDefaultsDelegate(target, key) {
    return function (source) {
        var proto = proto_getProto(source), val = proto[key];
        if ((0, is_1.is_rawObject)(val)) {
            (0, obj_1.obj_defaults)(target, val);
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
        source = fillProtoHash(source, (0, obj_1.obj_create)(null));
    }
    for (let key in source) {
        if (key === "constructor") {
            continue;
        }
        let val = source[key];
        if (val != null) {
            proto[key] = val;
        }
    }
}
function proto_getKeys(mix) {
    let keys = null;
    if (_getProtoOf == null) {
        keys = [];
        for (let key in mix) {
            keys.push(key);
        }
        return keys;
    }
    let cursor = mix;
    let cursorEnd = null;
    if (typeof mix === 'function') {
        cursorEnd = Function.prototype;
    }
    else {
        cursorEnd = Object.prototype;
    }
    while (cursor != cursorEnd) {
        let names = Object.getOwnPropertyNames(cursor);
        keys = keys == null
            ? names
            : keys.concat(names);
        cursor = Object.getPrototypeOf(cursor);
    }
    return keys;
}
exports.proto_getKeys = proto_getKeys;
function proto_override(super_, fn) {
    var proxy;
    if (super_) {
        proxy = function (mix) {
            var args = arguments.length === 1 && _isArguments(mix) ? mix : arguments;
            return (0, fn_1.fn_apply)(super_, this, args);
        };
    }
    else {
        proxy = fn_1.fn_doNothing;
    }
    return function () {
        this["super"] = proxy;
        return (0, fn_1.fn_apply)(fn, this, arguments);
    };
}
function inherit(_class, _base, _extends, original) {
    let prototype = original;
    let protoCursor = original;
    prototype.constructor = _class.prototype.constructor;
    if (_extends != null) {
        protoCursor[PROTO] = {};
        (0, arr_1.arr_each)(_extends, function (x) {
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
        (0, obj_1.obj_extendDescriptors)(_class.prototype, original);
    }
    else {
        _class.prototype = Object.create(original);
    }
    _class.prototype.constructor = _class;
    if (_extends != null) {
        (0, arr_1.arr_each)(_extends, function (x) {
            (0, obj_1.obj_defaults)(_class.prototype, x);
        });
    }
    var proto = _class.prototype;
    (0, obj_1.obj_defaults)(proto, defaults);
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
        (0, arr_1.arr_each)(_extends, function (x) {
            delete x.constructor;
            proto_extend(_class, x);
        });
    }
    proto_extend(_class, original);
}
function proto_getProto(mix) {
    return (0, is_1.is_Function)(mix) ? mix.prototype : mix;
}
function fillProtoHash(proto, target) {
    let keys = Object.getOwnPropertyNames(proto);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (target[key] != null) {
            continue;
        }
        target[key] = proto[key];
    }
    let next = Object.getPrototypeOf(proto);
    if (next == null || next === Object.prototype) {
        return target;
    }
    return fillProtoHash(next, target);
}
//# sourceMappingURL=proto.js.map
//# sourceMappingURL=proto.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_proto === module.exports) {
        // do nothing if
    } else if (__isObj(_src_proto) && __isObj(module.exports)) {
        Object.assign(_src_proto, module.exports);
    } else {
        _src_proto = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mixin;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mixin != null ? _src_mixin : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = void 0;
const obj_1 = _src_obj;
const is_1 = _src_is;
const fn_1 = _src_fn;
const proto_1 = _src_proto;
function mixin(mix1, mix2, mix3, mix4, mix5) {
    return mix(mix1, mix2, mix3, mix4, mix5);
}
exports.mixin = mixin;
function mix(...mixins) {
    let _base = mixins[0];
    let _extends = mixins.slice(1);
    let _callable = ensureCallable(mixins);
    let _class = function (...args) {
        for (let i = _callable.length - 1; i > -1; i--) {
            let x = _callable[i];
            if (typeof x === 'function') {
                (0, fn_1.fn_apply)(x, this, args);
            }
        }
    };
    if ((0, is_1.is_Function)(_base) === false) {
        _extends.unshift(_base);
        _base = null;
    }
    mixStatics(_class, mixins);
    let proto = {};
    (0, proto_1.class_extendProtoObjects)(proto, _base, _extends);
    (0, proto_1.class_inherit)(_class, _base, _extends, proto);
    return _class;
}
function mixStatics(Ctor, mixins) {
    for (let i = 0; i < mixins.length; i++) {
        let Fn = mixins[i];
        if (typeof Fn !== 'function') {
            continue;
        }
        let keys = (0, proto_1.proto_getKeys)(Fn);
        for (let j = 0; j < keys.length; j++) {
            let key = keys[j];
            if (key in Ctor === false) {
                (0, obj_1.obj_copyProperty)(Ctor, Fn, key);
            }
        }
    }
}
let ensureCallableSingle;
let ensureCallable;
(function () {
    ensureCallable = function (arr) {
        var out = [], i = arr.length;
        while (--i > -1)
            out[i] = ensureCallableSingle(arr[i]);
        return out;
    };
    ensureCallableSingle = function (mix) {
        if ((0, is_1.is_Function)(mix) === false) {
            return mix;
        }
        var fn = mix;
        var caller = directCaller;
        var safe = false;
        var wrapped = function (...args) {
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
        (0, obj_1.obj_extend)(self, x);
    }
}());
//# sourceMappingURL=mixin.js.map
//# sourceMappingURL=mixin.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mixin === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mixin) && __isObj(module.exports)) {
        Object.assign(_src_mixin, module.exports);
    } else {
        _src_mixin = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_promisify;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_promisify != null ? _src_promisify : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = void 0;
var promisify;
(function (promisify) {
    function fromEvent(ctx, event, handlerFn, options) {
        return new Promise(function (resolve, reject) {
            const cb = (...args) => __awaiter(this, void 0, void 0, function* () {
                let timeout;
                let completed = false;
                let ms = options === null || options === void 0 ? void 0 : options.timeout;
                if (ms) {
                    timeout = setTimeout(() => {
                        if (completed) {
                            return;
                        }
                        completed = true;
                        reject(new Error(`Timeouted, event was not called within ${ms}ms`));
                    }, ms);
                }
                try {
                    let r = handlerFn == null ? args[0] : yield handlerFn(...args);
                    if (completed === false) {
                        completed = true;
                        resolve(r);
                    }
                }
                catch (error) {
                    if (completed === false) {
                        completed = true;
                        reject(error);
                    }
                }
                finally {
                    clearTimeout(timeout);
                }
            });
            ctx.once(event, cb);
        });
    }
    promisify.fromEvent = fromEvent;
})(promisify = exports.promisify || (exports.promisify = {}));
//# sourceMappingURL=promisify.js.map
//# sourceMappingURL=promisify.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_promisify === module.exports) {
        // do nothing if
    } else if (__isObj(_src_promisify) && __isObj(module.exports)) {
        Object.assign(_src_promisify, module.exports);
    } else {
        _src_promisify = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib = void 0;
const class_1 = _src_class;
const arr_1 = _src_arr;
const error_1 = _src_error;
const fn_1 = _src_fn;
const obj_1 = _src_obj;
const is_1 = _src_is;
const str_1 = _src_str;
const Dfr_1 = _src_class_Dfr;
const Uri_1 = _src_class_Uri;
const EventEmitter_1 = _src_class_EventEmitter;
const mixin_1 = _src_mixin;
const promisify_1 = _src_promisify;
exports.Lib = {
    class_Dfr: Dfr_1.class_Dfr,
    class_EventEmitter: EventEmitter_1.class_EventEmitter,
    class_Uri: Uri_1.class_Uri,
    class_create: class_1.class_create,
    class_createEx: class_1.class_createEx,
    arr_remove: arr_1.arr_remove,
    arr_each: arr_1.arr_each,
    arr_indexOf: arr_1.arr_indexOf,
    arr_contains: arr_1.arr_contains,
    arr_pushMany: arr_1.arr_pushMany,
    error_createClass: error_1.error_createClass,
    fn_createByPattern: fn_1.fn_createByPattern,
    fn_doNothing: fn_1.fn_doNothing,
    obj_getProperty: obj_1.obj_getProperty,
    obj_setProperty: obj_1.obj_setProperty,
    obj_hasProperty: obj_1.obj_hasProperty,
    obj_extend: obj_1.obj_extend,
    obj_extendDefaults: obj_1.obj_extendDefaults,
    obj_extendMany: obj_1.obj_extendMany,
    obj_extendProperties: obj_1.obj_extendProperties,
    obj_extendPropertiesDefaults: obj_1.obj_extendPropertiesDefaults,
    obj_create: obj_1.obj_create,
    obj_defineProperty: obj_1.obj_defineProperty,
    obj_clean: obj_1.obj_clean,
    obj_defaults: obj_1.obj_defaults,
    is_Function: is_1.is_Function,
    is_Array: is_1.is_Array,
    is_ArrayLike: is_1.is_ArrayLike,
    is_String: is_1.is_String,
    is_Object: is_1.is_Object,
    is_notEmptyString: is_1.is_notEmptyString,
    is_rawObject: is_1.is_rawObject,
    is_Date: is_1.is_Date,
    is_NODE: is_1.is_NODE,
    is_DOM: is_1.is_DOM,
    str_format: str_1.str_format,
    str_dedent: str_1.str_dedent,
    mixin: mixin_1.mixin,
    promisify: promisify_1.promisify
};
//# sourceMappingURL=export-lib.js.map
//# sourceMappingURL=export-lib.ts.map

export default module.exports;



// end:source ./ESM.js
