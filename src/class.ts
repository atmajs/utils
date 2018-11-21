import { obj_extendDefaults, obj_extendPropertiesDefaults } from './obj';
import { _Array_slice } from './refs';


export type Constructor<T = {}> = {
    new (...args: any[]): T;
};

export type Statics<T> = { [P in keyof T]: T[P] };

export interface ClassFactory { 
    <
    T1 extends Constructor | object,
    T2 extends Constructor | object = {},
    T3 extends Constructor | object = {},
    T4 extends Constructor | object = {},
    T5 extends Constructor | object = {}
> (
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
        (T5 extends Constructor ? InstanceType<T5> : T5))
};


/**
 * create([...Base], Proto)
 * Base: Function | Object
 * Proto: Object {
 *    constructor: ?Function
 *    ...
 */
export const class_create: ClassFactory = createClassFactory(obj_extendDefaults);

// with property accessor functions support
export const class_createEx = createClassFactory(obj_extendPropertiesDefaults);

function createClassFactory(extendDefaultsFn) {
    return function(a, b?, c?){
        var args = _Array_slice.call(arguments),
            Proto = args.pop();
        if (Proto == null)
            Proto = {};

        var Ctor;

        if (Proto.hasOwnProperty('constructor')) {
            Ctor = Proto.constructor;
            if (Ctor.prototype === void 0) {
                var es6Method = Ctor;
                Ctor = function ClassCtor () {
                    var imax = arguments.length, i = -1, args = new Array(imax);
                    while (++i < imax) args[i] = arguments[i];
                    return es6Method.apply(this, args);
                };
            }
        }
        else {
            Ctor = function ClassCtor () {};
        }

        var i = args.length,
            BaseCtor, x;
        while ( --i > -1 ) {
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
    return function(){
        var args = _Array_slice.call(arguments);
        var x = fnA.apply(this, args);
        if (x !== void 0)
            return x;

        return fnB.apply(this, args);
    };
}
