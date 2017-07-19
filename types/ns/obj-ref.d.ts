declare namespace Obj {
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
}
