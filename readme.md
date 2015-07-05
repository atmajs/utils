Util Functions
----

[![Build Status](https://travis-ci.org/atmajs/utils.png?branch=master)](https://travis-ci.org/atmajs/utils)

#### Embeddable
	
- `lib/utils.embed.js` All functions are in the top-level scope.
	
#### Module

- All functions are wrapped to an object, e.g. `require('atma-utils').obj_getProperty`

## Functions

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

	- `class_Dfr`

		Promise

	- `class_EventEmitter`

		Event Emitter

- error
	- `error_createClass(name:String, Proto:Object):Function`
	- `error_formatSource(source:String, index:Number, ?filename:String):String`
	- `error_cursor(source:String, index:Number):Array<lines, lineNum, rowNum>`
	- `error_formatCursor(lines:Array, lineNum: Number, rowNum: Number):String`

- Prototype fn references
	- `_Array_slice`
	- `_Array_splice`
	- `_Array_indexOf`
	- `_Obj_hasOwnProp_`


# Build

```bash
$ npm install
$ npm run build
```

# Release

- Bump
- Builds
- Commit `release` branch
- Push/Pulblish:
	- to `git`
	- to `npm`

```bash
$ npm install
$ npm run release
```

# Test 

```bash
$ npm install
$ npm test
```

----



:copyright: 2015 - MIT - Atma.js
