import { is_Function, is_rawObject } from "./is";
import { fn_doNothing, fn_apply } from "./fn";
import { arr_each } from "./arr";
import {
    obj_create,
    obj_defaults,
    obj_extendDescriptors
} from "./obj";

const PROTO = "__proto__";

const _getProtoOf = Object.getPrototypeOf
const _toString = Object.prototype.toString;
const _isArguments = function(args) {
    return _toString.call(args) === "[object Arguments]";
};

const class_inherit = PROTO in Object.prototype ? inherit : inherit_protoLess;

export { class_inherit };

export function class_extendProtoObjects (proto, _base, _extends) {
    var key, protoValue;

    for (key in proto) {
        protoValue = proto[key];

        if (!is_rawObject(protoValue)) continue;

        if (_base != null) {
            if (is_rawObject(_base.prototype[key]))
                obj_defaults(protoValue, _base.prototype[key]);
        }

        if (_extends != null) {
            arr_each(_extends, proto_extendDefaultsDelegate(protoValue, key));
        }
    }
};

// PRIVATE

function proto_extendDefaultsDelegate(target, key) {
    return function(source) {
        var proto = proto_getProto(source),
            val = proto[key];
        if (is_rawObject(val)) {
            obj_defaults(target, val);
        }
    };
}

function proto_extend(proto, source) {
    if (source == null) return;

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

function proto_override(super_, fn) {
    var proxy;

    if (super_) {
        proxy = function(mix) {
            var args =
                arguments.length === 1 && _isArguments(mix) ? mix : arguments;

            return fn_apply(super_, this, args);
        };
    } else {
        proxy = fn_doNothing;
    }

    return function() {
        this["super"] = proxy;

        return fn_apply(fn, this, arguments);
    };
}

function inherit(_class, _base, _extends, original) {
    let prototype = original;
    let protoCursor = original;

    prototype.constructor = _class.prototype.constructor;

    if (_extends != null) {
        protoCursor[PROTO] = {};

        arr_each(_extends, function(x) {
            proto_extend(protoCursor[PROTO], x);
        });
        protoCursor = protoCursor[PROTO];
    }

    if (_base != null) protoCursor[PROTO] = _base.prototype;


    _class.prototype = prototype;
}
function inherit_Object_create(
    _class,
    _base,
    _extends,
    original,
    _overrides,
    defaults
) {
    if (_base != null) {
        _class.prototype = Object.create(_base.prototype);
        obj_extendDescriptors(_class.prototype, original);
    } else {
        _class.prototype = Object.create(original);
    }

    _class.prototype.constructor = _class;

    if (_extends != null) {
        arr_each(_extends, function(x) {
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
function inherit_protoLess(
    _class,
    _base,
    _extends,
    original
) {
    if (_base != null) {
        var tmp = function() {};

        tmp.prototype = _base.prototype;

        _class.prototype = new tmp();
        _class.prototype.constructor = _class;
    }

    if (_extends != null) {
        arr_each(_extends, function(x) {
            delete x.constructor;
            proto_extend(_class, x);
        });
    }

    proto_extend(_class, original);
}

function proto_getProto(mix) {
    return is_Function(mix) ? mix.prototype : mix;
}


function fillProtoHash (proto: object, target: object) {
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
