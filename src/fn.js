var fn_proxy,
	fn_apply,
	fn_doNothing;
(function(){
	fn_proxy = function(fn, ctx) {
		return function(){
			return fn_apply(fn, ctx, arguments);
		};
	};
	
	fn_apply = function(fn, ctx, args){
		var l = args.length;
		if (0 === l) 
			return fn.call(ctx);
		if (1 === l) 
			return fn.call(ctx, args[0]);
		if (2 === l) 
			return fn.call(ctx, args[0], args[1]);
		if (3 === l) 
			return fn.call(ctx, args[0], args[1], args[2]);
		if (4 === l)
			return fn.call(ctx, args[0], args[1], args[2], args[3]);
		
		return fn.apply(ctx, args);
	};
	
	fn_doNothing = function(){
		return false;
	};
}());