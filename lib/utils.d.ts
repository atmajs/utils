// Generated by dts-bundle v0.7.3

declare module 'atma-utils' {
    
    
    export * from 'atma-utils/refs';
    export * from 'atma-utils/polyfill/arr';
    export * from 'atma-utils/coll';
    export * from 'atma-utils/is';
    export * from 'atma-utils/obj';
    export * from 'atma-utils/arr';
    export * from 'atma-utils/fn';
    export * from 'atma-utils/str';
    export * from 'atma-utils/class';
    export * from 'atma-utils/error';
    export * from 'atma-utils/promisify';
    export * from 'atma-utils/class/Dfr';
    export * from 'atma-utils/class/EventEmitter';
    export * from 'atma-utils/class/Uri';
    export { mixin } from 'atma-utils/mixin';
}

declare module 'atma-utils/refs' {
    export const _Array_slice: (start?: number, end?: number) => any[];
    export const _Array_splice: {
        (start: number, deleteCount?: number): any[];
        (start: number, deleteCount: number, ...items: any[]): any[];
    };
    export const _Array_indexOf: (searchElement: any, fromIndex?: number) => number;
    export const _Object_hasOwnProp: (v: PropertyKey) => boolean;
    export const _Object_getOwnProp: (o: any, p: PropertyKey) => PropertyDescriptor;
    export const _Object_defineProperty: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
    export let _global: any;
    export let _document: any;
    export function setDocument(doc: any): void;
}

declare module 'atma-utils/polyfill/arr' {
    export {};
}

declare module 'atma-utils/coll' {
    export function coll_each(coll: any, fn: any, ctx?: any): any;
    export function coll_indexOf(coll: any, x: any): number;
    export function coll_remove(coll: any, x: any): boolean;
    export function coll_map(coll: any, fn: any, ctx?: any): any[];
    export function coll_find(coll: any, fn: any, ctx?: any): boolean;
}

declare module 'atma-utils/is' {
    export function is_Function(x: any): x is Function;
    export function is_Object<T = {
        [key: string]: any;
    }>(x: any): x is T;
    export function is_Array<T = any>(arr: any): arr is T[];
    export const is_ArrayLike: typeof is_Array;
    export function is_String(x: any): x is string;
    export function is_notEmptyString(x: any): boolean;
    export function is_rawObject(x: any): x is {
        [key: string]: any;
    };
    export function is_Date(x: any): x is Date;
    export function is_PromiseLike<T = any>(x: any): x is PromiseLike<T>;
    export function is_Observable(x: any): boolean;
    export const is_DOM: boolean;
    export const is_NODE: boolean;
}

declare module 'atma-utils/obj' {
    let obj_copyProperty: (target: any, source: any, key: any) => any;
    export { obj_copyProperty };
    export function obj_getProperty<T = any>(obj_: any, path: string): T;
    export function obj_setProperty(obj_: any, path: string, val: any): void;
    export function obj_hasProperty(obj: any, path: string): boolean;
    export function obj_defineProperty(obj: any, path: string, dscr: PropertyDescriptor & ThisType<any>): void;
    export function obj_extend(a: any, b: any): any;
    export function obj_extendDefaults(a: any, b: any): any;
    export const obj_extendProperties: typeof obj_extend;
    export const obj_extendPropertiesDefaults: typeof obj_extend;
    export function obj_extendMany(a: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any): any;
    export function obj_toFastProps(obj: any): void;
    export const _Object_create: {
        (o: object): any;
        (o: object, properties: PropertyDescriptorMap & ThisType<any>): any;
    };
    export const obj_create: {
        (o: object): any;
        (o: object, properties: PropertyDescriptorMap & ThisType<any>): any;
    };
    export function obj_defaults(target: any, defaults: any): any;
    interface IObjectCleanOpts {
        removePrivate?: boolean;
        skipProperties?: {
            [key: string]: any;
        };
        ignoreProperties?: {
            [key: string]: any;
        };
        strictProperties?: {
            [key: string]: any;
        };
        deep?: boolean;
        removeEmptyArrays?: boolean;
        removeFalsy?: boolean;
        shouldRemove?(key: string, val: any): boolean;
    }
    /**
      * Remove all NULL properties, optionally also all falsy-ies
      */
    export function obj_clean<T extends any>(json: T, opts?: IObjectCleanOpts): T;
    let obj_extendDescriptors: any;
    let obj_extendDescriptorsDefaults: any;
    export { obj_extendDescriptors, obj_extendDescriptorsDefaults };
}

declare module 'atma-utils/arr' {
    export function arr_remove(array: any, x: any): boolean;
    export function arr_each(arr: any, fn: any, ctx?: any): void;
    export function arr_indexOf(arr: any, x: any): any;
    export function arr_contains(arr: any, x: any): boolean;
    export function arr_pushMany(arr: any, arrSource: any): void;
    export function arr_distinct(arr: any, compareFn?: any): any[];
}

declare module 'atma-utils/fn' {
    export function fn_proxy(fn: any, ctx: any): () => any;
    export function fn_apply(fn: any, ctx: any, args: any): any;
    export function fn_doNothing(): boolean;
    export function fn_createByPattern(definitions: any, ctx?: any): () => any;
}

declare module 'atma-utils/str' {
    export function str_format(str_: any, a?: any, b?: any, c?: any, d?: any): any;
    export function str_dedent(str: string): string;
}

declare module 'atma-utils/class' {
    export type Constructor<T = {}> = {
        new (...args: any[]): T;
    };
    export type Statics<T> = {
        [P in keyof T]: T[P];
    };
    export interface ClassFactory {
        <T1 extends Constructor | object, T2 extends Constructor | object = {}, T3 extends Constructor | object = {}, T4 extends Constructor | object = {}, T5 extends Constructor | object = {}>(mix1: T1, mix2?: T2, mix3?: T3, mix4?: T4, mix5?: T5): (T1 extends Constructor ? Statics<T1> : {}) & (T2 extends Constructor ? Statics<T2> : {}) & (T3 extends Constructor ? Statics<T3> : {}) & (T4 extends Constructor ? Statics<T4> : {}) & (T5 extends Constructor ? Statics<T5> : {}) & (new (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any) => (T1 extends Constructor ? InstanceType<T1> : T1) & (T2 extends Constructor ? InstanceType<T2> : T2) & (T3 extends Constructor ? InstanceType<T3> : T3) & (T4 extends Constructor ? InstanceType<T4> : T4) & (T5 extends Constructor ? InstanceType<T5> : T5));
    }
    /**
      * create([...Base], Proto)
      * Base: Function | Object
      * Proto: Object {
      *    constructor: ?Function
      *    ...
      */
    export const class_create: ClassFactory;
    export const class_createEx: (a: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
}

declare module 'atma-utils/error' {
    export function error_createClass(name: any, Proto: any, stackSliceFrom?: any): (...args: any[]) => void;
    export function error_formatSource(source: any, index: any, filename?: any): string;
    /**
      * @returns [ lines, lineNum, rowNum ]
      */
    export function error_cursor(str: any, index: any): any[];
    export function error_formatCursor(lines: any, lineNum: any, rowNum: any): string;
}

declare module 'atma-utils/promisify' {
    import { type class_EventEmitter } from 'atma-utils/class/EventEmitter';
    export namespace promisify {
        function fromEvent<TEvents extends Record<keyof TEvents, (...args: any) => any> = any, TKey extends keyof TEvents = any>(ctx: class_EventEmitter<TEvents>, event: TKey, handlerFn?: (...args: Parameters<TEvents[TKey]>) => any | Promise<any>, options?: {
            timeout?: number;
        }): Promise<unknown>;
    }
}

declare module 'atma-utils/class/Dfr' {
    export class class_Dfr<T = any> implements PromiseLike<T> {
        _isAsync: boolean;
        _done: any;
        _fail: any;
        _always: any;
        _resolved: any;
        _rejected: any;
        get [Symbol.toStringTag](): string;
        defer(): this;
        isResolved(): boolean;
        isRejected(): boolean;
        isBusy(): boolean;
        resolve(value?: T, ...args: any[]): this;
        reject(error: Error | any, ...args: any[]): this;
        then<TResult1 = T, TResult2 = never>(filterSuccess?: ((value: T, ...args: any[]) => TResult1 | PromiseLike<TResult1>) | undefined | null, filterError?: ((reason: Error | any) => TResult2 | PromiseLike<TResult2>) | undefined | null): class_Dfr<TResult1 | TResult2>;
        done<TResult1 = T, TResult2 = never>(callback: ((value: T, ...args: any[]) => TResult1 | PromiseLike<TResult1>) | undefined | null): class_Dfr<TResult1 | TResult2>;
        fail<TResult1 = T, TResult2 = never>(callback: ((reason: Error | any) => TResult2 | PromiseLike<TResult2>) | undefined | null): class_Dfr<TResult1 | TResult2>;
        always(callback: any): any;
        pipe(mix: any): any;
        pipeCallback(): (error: any) => void;
        resolveDelegate(): () => any;
        rejectDelegate(): () => any;
        catch(cb: any): class_Dfr<T>;
        finally(cb: any): any;
        static resolve(a?: any, b?: any, c?: any): any;
        static reject(error: any): class_Dfr<any>;
        static run(fn: any, ctx?: any): class_Dfr<any>;
        static all(promises: any): class_Dfr<any>;
    }
}

declare module 'atma-utils/class/EventEmitter' {
    export class class_EventEmitter<TEvents extends Record<keyof TEvents, (...args: any) => any> = any> {
        _listeners: {
            [event: string]: (Function & {
                _once?: boolean;
            })[];
        };
        on<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]): this;
        once<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]): this;
        /**
          * Returns a function, which when called - triggers the event with the arguments passed to that function
          */
        pipe<TKey extends keyof TEvents>(event: TKey): (...args: Parameters<TEvents[TKey]>) => void;
        emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>): this;
        trigger<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>): this;
        off<TKey extends keyof TEvents>(event: TKey, fn?: Function): this;
    }
}

declare module 'atma-utils/class/Uri' {
    export class class_Uri {
            protocol: string;
            host: string;
            path: string;
            file: string;
            extension: string;
            search: string;
            value: string;
            constructor(uri?: string | class_Uri);
            cdUp(): this;
            /**
                * '/path' - relative to host
                * '../path', 'path','./path' - relative to current path
                */
            combine(mix: string | class_Uri): class_Uri;
            toString(): string;
            toPathAndQuery(): string;
            /**
                * @return Current Uri Path{String} that is relative to @arg1 Uri
                */
            toRelativeString(uri: string | class_Uri): string;
            toLocalFile(): any;
            toLocalDir(): any;
            toDir(): string;
            isRelative(): boolean;
            getName(): string;
            static combinePathes: typeof util_combinePathes;
            static combine: typeof util_combinePathes;
    }
    function util_combinePathes(a: any, b: any, c?: any, d?: any): string;
    export {};
}

declare module 'atma-utils/mixin' {
    export type Constructor<T = {}> = {
        new (...args: any[]): T;
    };
    export type Statics<T> = {
        [P in keyof T]: T[P];
    };
    export function mixin<T1 extends Constructor | object, T2 extends Constructor | object = {}, T3 extends Constructor | object = {}, T4 extends Constructor | object = {}, T5 extends Constructor | object = {}>(mix1: T1, mix2?: T2, mix3?: T3, mix4?: T4, mix5?: T5): (T1 extends Constructor ? Statics<T1> : {}) & (T2 extends Constructor ? Statics<T2> : {}) & (T3 extends Constructor ? Statics<T3> : {}) & (T4 extends Constructor ? Statics<T4> : {}) & (T5 extends Constructor ? Statics<T5> : {}) & (new (...args: T1 extends Constructor ? ConstructorParameters<T1> : never[]) => (T1 extends Constructor ? InstanceType<T1> : T1) & (T2 extends Constructor ? InstanceType<T2> : T2) & (T3 extends Constructor ? InstanceType<T3> : T3) & (T4 extends Constructor ? InstanceType<T4> : T4) & (T5 extends Constructor ? InstanceType<T5> : T5));
}

