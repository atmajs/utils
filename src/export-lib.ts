import { class_create, class_createEx } from './class';
import { arr_remove, arr_each, arr_indexOf, arr_contains, arr_pushMany } from './arr';
import { error_createClass } from './error';
import { fn_createByPattern, fn_doNothing } from './fn';
import {
    obj_getProperty,
    obj_setProperty,
    obj_hasProperty,
    obj_extend,
    obj_extendDefaults,
    obj_extendMany,
    obj_extendProperties,
    obj_extendPropertiesDefaults,
    obj_create,
    obj_defineProperty,
    obj_clean,
} from './obj';

import { is_Function, is_Array, is_ArrayLike, is_String, is_Object, is_notEmptyString, is_rawObject, is_Date, is_NODE, is_DOM } from './is';
import { str_format, str_dedent } from './str';
import { class_Dfr } from './class/Dfr';
import { class_Uri } from './class/Uri';
import { class_EventEmitter } from './class/EventEmitter';
import { mixin } from './mixin'

export const Lib = {

    class_Dfr,
    class_EventEmitter,
    class_Uri,
    class_create,
    class_createEx,

    arr_remove,
    arr_each,
    arr_indexOf,
    arr_contains,
    arr_pushMany,

    error_createClass,

    fn_createByPattern,
    fn_doNothing,


    obj_getProperty,
    obj_setProperty,
    obj_hasProperty,
    obj_extend,
    obj_extendDefaults,
    obj_extendMany,
    obj_extendProperties,
    obj_extendPropertiesDefaults,
    obj_create,
    obj_defineProperty,
    obj_clean,

    is_Function,
    is_Array,
    is_ArrayLike,
    is_String,
    is_Object,
    is_notEmptyString,
    is_rawObject,
    is_Date,
    is_NODE,
    is_DOM,

    str_format,
    str_dedent,
    mixin
};
