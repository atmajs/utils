export function is_Function(x) {
    return typeof x === 'function';
}
export function is_Object(x) {
    return x != null && typeof x === 'object';
}
export function is_Array(arr) {
    return (
        arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function'
    );
}
export const is_ArrayLike = is_Array;
export function is_String(x) {
    return typeof x === 'string';
}
export function is_notEmptyString(x) {
    return typeof x === 'string' && x !== '';
}
export function is_rawObject(x) {
    return x != null && typeof x === 'object' && x.constructor === Object;
}
export function is_Date(x) {
    if (x == null || typeof x !== 'object') {
        return false;
    }
    if (x.getFullYear != null && isNaN(x) === false) {
        return true;
    }
    return false;
}
export function is_PromiseLike (x) {
    return x != null && typeof x === 'object' && typeof x.then === 'function';
}
export function is_Observable (x) {
    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
}
export const is_DOM = typeof window !== 'undefined' && window.navigator != null;
export const is_NODE = !is_DOM;
