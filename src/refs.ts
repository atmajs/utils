export const _Array_slice = Array.prototype.slice;
export const _Array_splice = Array.prototype.splice;
export const _Array_indexOf = Array.prototype.indexOf;

export const _Object_hasOwnProp = Object.hasOwnProperty;
export const _Object_getOwnProp = Object.getOwnPropertyDescriptor;
export const _Object_defineProperty = Object.defineProperty;

declare var global: any;
declare var window: any;

export const _global = typeof global !== 'undefined' 
    ? global 
    : window;
export const _document = typeof window !== 'undefined' && window.document != null 
    ? window.document 
    : null;
