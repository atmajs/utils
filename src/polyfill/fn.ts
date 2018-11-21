
import { _Array_slice } from '../refs'

if (Function.prototype.bind == null) {
	Function.prototype.bind = function(){
		if (arguments.length < 2 && typeof arguments[0] === "undefined")
			return this;
		var fn = this,
			args = _Array_slice.call(arguments),
			ctx = args.shift();
		return function() {
			return fn.apply(ctx, args.concat(_Array_slice.call(arguments)));
		};
	};
}
