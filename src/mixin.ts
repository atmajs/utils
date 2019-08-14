
import { obj_extend, obj_copyProperty } from "./obj";
import { is_Function } from "./is";
import { fn_apply } from "./fn";
import { class_extendProtoObjects, class_inherit } from "./proto";

export type Constructor<T = {}> = {
    new (...args: any[]): T;
};

export type Statics<T> = { [P in keyof T]: T[P] };

export function mixin<
    T1 extends Constructor | object,
    T2 extends Constructor | object = {},
    T3 extends Constructor | object = {},
    T4 extends Constructor | object = {},
    T5 extends Constructor | object = {}
>(
    mix1: T1,
    mix2?: T2,
    mix3?: T3,
    mix4?: T4,
    mix5?: T5
): (T1 extends Constructor ? Statics<T1> : {}) &
    (T2 extends Constructor ? Statics<T2> : {}) &
    (T3 extends Constructor ? Statics<T3> : {}) &
    (T4 extends Constructor ? Statics<T4> : {}) &
    (T5 extends Constructor ? Statics<T5> : {}) &
    (new (
        ...args: T1 extends Constructor ? ConstructorParameters<T1> : never[]
    ) => (T1 extends Constructor ? InstanceType<T1> : T1) &
        (T2 extends Constructor ? InstanceType<T2> : T2) &
        (T3 extends Constructor ? InstanceType<T3> : T3) &
        (T4 extends Constructor ? InstanceType<T4> : T4) &
        (T5 extends Constructor ? InstanceType<T5> : T5)) {
    return mix(mix1, mix2, mix3, mix4, mix5) as any;
}

function mix(...mixins) {
    let _base = mixins[0];
    let _extends = mixins.slice(1);
    let _callable = ensureCallable(mixins);
    let _class = function (...args) {
        
        for (let i = _callable.length - 1; i > -1; i--) {
            let x = _callable[i];
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

    let proto = {};
    class_extendProtoObjects(proto, _base, _extends);
    class_inherit(_class, _base, _extends, proto);
    return _class;
}

function mixStatics (Ctor, mixins) {
    for (let i = 0; i < mixins.length; i++) {
        let Fn = mixins[i];
        if (typeof Fn !== 'function') {
            continue;
        }
        for (let key in Fn) {
            if (key in Ctor === false) {
                obj_copyProperty(Ctor, Fn, key);
            }
        }
    }
}



let ensureCallableSingle, 
	ensureCallable;
(function () {
	ensureCallable = function (arr) {
		var out = [],
			i = arr.length;
		while(--i > -1) out[i] = ensureCallableSingle(arr[i]);
		return out;
	};
	ensureCallableSingle = function (mix) {
		if (is_Function(mix) === false) {
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
			} catch (error) {
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
	function directCaller (fn, self, args) {
		return fn.apply(self, args);
	}
	function newCaller (fn, self, args) {
		var x = new (fn.bind.apply(fn, [null].concat(args)));
		obj_extend(self, x);
	}
}());