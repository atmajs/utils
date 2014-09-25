if (Array.prototype.forEach === void 0) {
	Array.prototype.forEach = function(fn, ctx){
		var imax = this.length,
			i, x;
		for(i = 0; i < imax; i++ ){
			x = this[i];
			if (ctx === void 0) {
				fn(x, i);
				continue;
			}
			fn.call(ctx, x, i);
		}
	};
}
if (Array.prototype.indexOf === void 0) {
	Array.prototype.indexOf = function(x){
		var imax = this.length,
			i;
		for(i = 0; i < imax; i++ ){
			if (x === this[i]) 
				return i;
		}
		return -1;
	};
}
