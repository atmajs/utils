var str_format;
(function(){
	str_format = function(str_){
		var str = str_,
			imax = arguments.length,
			i = 0, x;
		while ( ++i < imax ){
			x = arguments[i];
			if (is_Object(x) && x.toJSON) {
				x = x.toJSON();
			}
			str_ = str_.replace(rgxNum(i - 1), String(x));
		}
		
		return str_;
	};
	
	var rgxNum;
	(function(){
		rgxNum = function(num){
			return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		};
		var cache_ = {};
	}());
}());