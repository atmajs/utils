var arr_remove;
(function(){
	arr_remove = function(array, x){
		var i = array.indexOf(x);
		if (i === -1) 
			return;
		array.splice(i, 1);
	};
}());