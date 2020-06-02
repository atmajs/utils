declare module "atma-utils" {
    export = Lib;
}

declare namespace Lib {
    export function is_Function(mix: any): boolean
    export function is_Array(mix: any): boolean
    export function is_ArrayLike(mix: any): boolean
    export function is_String(mix: any): boolean
    export function is_Object(mix: any): boolean
    export function is_notEmptyString(mix: any): boolean
    export function is_rawObject(mix: any): boolean
    export function is_Date(mix: any): boolean
    export function is_NODE(mix: any): boolean
    export function is_DOM(mix: any): boolean

    export function obj_getProperty<T>(obj: any, prop: string): T
    export function obj_setProperty<T>(obj: any, prop: string, val: T): void
    export function obj_hasProperty(obj: any, prop: string): boolean
    export function obj_extend<T1, T2>(a: T1, b: T2): T1 & T2
    export function obj_extendDefaults<T1, T2>(a: T1, b: T2): T1 & T2
    export function obj_extendMany<T1, T2, T3, T4, T5, T6>(a: T1, b: T2, c?: T3, d?: T4, e?: T5, f?: T6): T1 & T2 & T3 & T4 & T5 & T6
    export function obj_extendProperties<T1, T2>(a: T1, b: T2): T1 & T2
    export function obj_extendPropertiesDefaults<T1, T2>(a: T1, b: T2): T1 & T2
    export function obj_create<T1>(a: T1): T1
    export function obj_defineProperty(o: any, p: string, attributes: PropertyDescriptor & ThisType<any>): void;


    export class class_EventEmitter<TEvents extends Record<keyof TEvents, (...args: any) => any>  = any> {
        on<TKey extends keyof TEvents> (event: TKey, cb: TEvents[TKey]): this
        once<TKey extends keyof TEvents> (event: TKey, cb: TEvents[TKey]): this
        off<TKey extends keyof TEvents> (event: TKey, cb?: Function): this
        emit<TKey extends keyof TEvents> (event: TKey, ...args: Parameters<TEvents[TKey]>): this
        trigger<TKey extends keyof TEvents> (event: TKey, ...args: Parameters<TEvents[TKey]>): this
        pipe<TKey extends keyof TEvents> (eventName: TKey): (...args) => void
    }

    export function class_create<T1, T2, T3>(p1: T1, p2?: T2, p3?: T3): new (...args: any[]) => T3 & T2 & T1;


    type DeferredLike = class_Dfr | PromiseLike<any>;
    export class class_Dfr {
        then(onOk: (...args: any[]) => void | any | DeferredLike, onFail?: (...args: any[]) => void | any | DeferredLike)
        done (done: (...args: any[]) => void | any | DeferredLike): this
        fail (fail: (error: any | Error) => void): this
        reject(error: any | Error) : this
        resolve(...args: any[]): this
        always (always: Function): this

        defer (): this
        isResolved (): boolean
        isRejected (): boolean
        isBusy (): boolean
        resolveDelegate (): (result: any) => void | any
        rejectDelegate (): (result: Error | any) => void | any

        static run (fn: (resolve: Function, reject?: Function) => void | class_Dfr, ctx?: any): DeferredLike
        static resolve (...args: any[]): DeferredLike
        static reject (...args: any[]): DeferredLike
    }

    export class class_Uri {
        constructor (path)

        protocol: string
        value: string
        path: string
        file: string
        extension: string

        cdUp (): this
        combine (path: string): class_Uri
        toString (): string
        toLocalFile (): string
        toLocalDir (): string
        toPathAndQuery (): string
        /**
         * @return Current Uri Path{String} that is relative to @arg1 Uri
         */
        toRelativeString (uri: class_Uri): string

        isRelative (): boolean
        getName (): string

        static combine (...paths: string[]): string
    }

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
            (T5 extends Constructor ? InstanceType<T5> : T5))
    ;
}
