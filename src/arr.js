var arr_remove,
	arr_each,
	arr_indexOf,
	arr_contains,
	arr_pushMany;
(function(){
	arr_remove = function(array, x){
		var i = array.indexOf(x);
		if (i === -1) 
			return false;
		array.splice(i, 1);
		return true;
	};
	arr_each = function(arr, fn, ctx){
		arr.forEach(fn, ctx);
	};
	arr_indexOf = function(arr, x){
		return arr.indexOf(x);
	};
	arr_contains = function(arr, x){
		return arr.indexOf(x) !== -1;
	};
	arr_pushMany = function(arr, arrSource){
		if (arrSource == null || arr == null || arr === arrSource) 
			return;
		
		var il = arr.length,
			jl = arrSource.length,
			j = -1
			;
		while( ++j < jl ){
			arr[il + j] = arrSource[j];
		}
	};
}());