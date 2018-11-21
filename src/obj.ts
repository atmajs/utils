import { _Object_defineProperty, _Object_getOwnProp } from './refs';

export function obj_getProperty (obj_, path){
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

export const obj_extendProperties		 = extendPropertiesFactory(true);
export const obj_extendPropertiesDefaults = extendPropertiesFactory(false );

export function obj_extendMany (a){
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
