import { is_ArrayLike, is_Object } from './is';
import { _Object_defineProperty, _Object_getOwnProp } from './refs';

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

export { obj_copyProperty };


export function obj_getProperty (obj_: any, path: string) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    var obj = obj_,
        chain = path.split('.'),
        imax = chain.length,
        i = -1;
    while ( obj != null && ++i < imax ) {
        var key = chain[i];
        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
            key = key.slice(0, -1);
        }
        obj = obj[key];
    }
    return obj;
};
export function obj_setProperty (obj_, path, val) {
    if (path.indexOf('.') === -1) {
        obj_[path] = val;
        return;
    }
    var obj = obj_,
        chain = path.split('.'),
        imax = chain.length - 1,
        i = -1,
        key;
    while ( ++i < imax ) {
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
};
export function obj_hasProperty (obj, path) {
    var x = obj_getProperty(obj, path);
    return x !== void 0;
};
export function obj_defineProperty (obj, path, dscr) {
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
export function obj_extend (a, b){
    if (b == null)
        return a || {};

    if (a == null)
        return obj_create(b);

    for(var key in b){
        a[key] = b[key];
    }
    return a;
};
export function obj_extendDefaults (a, b){
    if (b == null)
        return a || {};
    if (a == null)
        return obj_create(b);

    for(let key in b) {
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

export const obj_extendProperties		  = extendPropertiesFactory(true);
export const obj_extendPropertiesDefaults = extendPropertiesFactory(false );

export function obj_extendMany (a, arg1?, arg2?, arg3?, arg4?, arg5?, arg6?){
    var imax = arguments.length,
        i = 1;
    for(; i<imax; i++) {
        a = obj_extend(a, arguments[i]);
    }
    return a;
};
export function obj_toFastProps (obj){
    /*jshint -W027*/
    function F() {}
    F.prototype = obj;
    new F();
    return;
    eval(obj);
};
export const _Object_create = Object.create || function(x) {
    var Ctor = function (){};
    Ctor.prototype = x;
    return new Ctor;
};
export const obj_create = _Object_create;


export function obj_defaults(target, defaults) {
    for (var key in defaults) {
        if (target[key] == null) target[key] = defaults[key];
    }
    return target;
}


interface IObjectCleanOpts {
    removePrivate?: boolean
    skipProperties?: { [key: string]: any }
    ignoreProperties?: { [key: string]: any }
    strictProperties?: { [key: string]: any }
    deep?: boolean
    removeEmptyArrays?: boolean
    removeFalsy?: boolean
    shouldRemove? (key: string , val: any): boolean
}

/**
 * Remove all NULL properties, optionally also all falsy-ies
 */
export function obj_clean<T extends any> (json:T, opts: IObjectCleanOpts = {
    removePrivate: false,
    skipProperties: null,
    removeEmptyArrays: false,
    removeFalsy: false
}): T {
    if (json == null || typeof json !== 'object') {
        return json;
    }

    if (is_ArrayLike(json)) {
        let arr = json as any[];
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

    if (is_Object(json)) {
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
            if (opts.shouldRemove?.(key, val)) {
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


function isDefault (x, opts) {
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



let obj_extendDescriptors;
let obj_extendDescriptorsDefaults;

(function() {

    if (getDescriptor == null) {
        obj_extendDescriptors = obj_extend;
        obj_extendDescriptorsDefaults = obj_defaults;
        return;
    }
    obj_extendDescriptors = function(target, source) {
        return _extendDescriptors(target, source, false);
    };
    obj_extendDescriptorsDefaults = function(target, source) {
        return _extendDescriptors(target, source, true);
    };
    function _extendDescriptors(target, source, defaultsOnly) {
        if (target == null) return {};
        if (source == null) return source;

        var descr, key;
        for (key in source) {
            if (defaultsOnly === true && target[key] != null) continue;

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

export { obj_extendDescriptors, obj_extendDescriptorsDefaults };
