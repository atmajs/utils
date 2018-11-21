(function(factory){

	var owner, property;
	if (typeof module !== 'undefined' && module.exports) {
		owner = module;
		property = 'exports';
	}
	else {
		owner = window;
		property = 'Utils';
	}

	factory(owner, property);

}(function(owner, property){

    /**MODULE**/
    
    for (var key in Lib) {
        owner[property][key] = Lib[key];
    }
}));