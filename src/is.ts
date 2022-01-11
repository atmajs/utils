declare let window;

export function is_Function(x): x is Function {
    return typeof x === 'function';
}
export function is_Object<T = { [key: string]: any }> (x): x is T {
    return x != null && typeof x === 'object';
}
export function is_Array<T = any>(arr): arr is T[] {
    return (
        arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function'
    );
}
export const is_ArrayLike = is_Array;
export function is_String(x): x is string {
    return typeof x === 'string';
}
export function is_notEmptyString(x) {
    return typeof x === 'string' && x !== '';
}
export function is_rawObject(x): x is { [key: string]: any } {
    return x != null && typeof x === 'object' && (x.constructor === Object || x.constructor == null);
}
export function is_Date(x): x is Date{
    if (x == null || typeof x !== 'object') {
        return false;
    }
    if (x.getFullYear != null && isNaN(x) === false) {
        return true;
    }
    return false;
}
export function is_PromiseLike <T = any> (x): x is PromiseLike<T> {
    return x != null && typeof x === 'object' && typeof x.then === 'function';
}
export function is_Observable (x) {
    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
}
export const is_DOM = typeof window !== 'undefined' && window.navigator != null;
export const is_NODE = !is_DOM;
