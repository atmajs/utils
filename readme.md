Util Functions
----

_**Embeddable**_: all functions are in the toplevel scope.

- Object
	- `obj_getProperty(obj, path)`
	- `obj_setProperty(obj, path, val)`
	- `obj_extend(a, b)`
	- `obj_extendMany(a, [ ...args])`
	- `obj_create(obj)`
- Array
	- `arr_remove`
- Function
	- `fn_proxy(fn, ctx)`
	- `fn_doNothing`
- is
	- `is_Function(x)`
	- `is_String(x)`
	- `is_notEmptyString(x)`
	- `is_Array(x)`
	- `is_ArrayLike(x)`
	- `is_Object(x)`
	- `is_rawObject(x)`

- class
	- `class_create([...Base:Function|Object], Proto:Object)`
	
		```javascript
		Proto := Object {
			constructor: Function,
			...
		}
		```
		
	- `class_createEx`
		
		Similar to `class_create` but also handles the property accessors. The `class_create` is in this way much more simple and has better performance.
	
- Prototype fn references
	- `_Array_slice`
	- `_Array_splice`
	- `_Array_indexOf`
	- `_Obj_hasOwnProp_`

----

:copyright: 2015 - MIT - Atma.js