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


    export class class_EventEmitter {
        on: (event: string, cb: Function) => this
        once: (event: string, cb: Function) => this
        off: (event: string, cb?: Function) => this
        emit: (event: string, ...args: any[]) => this
        trigger: (event: string, ...args: any[]) => this
        pipe: (eventName: string) => (...args) => void         
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
}