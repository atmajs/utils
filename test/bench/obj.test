UTest.benchmark({
	'//different property getters': {
		'get property by split' () {
			obj_getProperty_Split({ name: 'Foo'}, 'name');
			obj_getProperty_Split({ foo: { bar: 1 }}, 'foo.bar');
			obj_getProperty_Split({ foo: { bar: { qux: {baz: 1} } }}, 'foo.bar.qux.baz');
		},
		'get property by split with check' () {
			obj_getProperty_SplitWithCheck({ name: 'Foo'}, 'name');
			obj_getProperty_SplitWithCheck({ foo: { bar: 1 }}, 'foo.bar');
			obj_getProperty_Split({ foo: { bar: { qux: {baz: 1} } }}, 'foo.bar.qux.baz');
		},
		'get property by substringing' () {
			obj_getProperty_Substring({ name: 'Foo'}, 'name');
			obj_getProperty_Substring({ foo: { bar: 1 }}, 'foo.bar');
			obj_getProperty_Substring({ foo: { bar: { qux: {baz: 1} } }}, 'foo.bar.qux.baz');
		}
	}
});

function obj_getProperty_Split (obj_, path){
	var obj = obj_,
		chain = path.split('.'),
		imax = chain.length,
		i = -1;
	while ( obj != null && ++i < imax ) {
		obj = obj[chain[i]];
	}
	return obj;
};
function obj_getProperty_SplitWithCheck (obj_, path){
	if (path.indexOf('.') === -1) {
		return obj_[path];
	}
	var obj = obj_,
		chain = path.split('.'),
		imax = chain.length,
		i = -1;
	while ( obj != null && ++i < imax ) {
		obj = obj[chain[i]];
	}
	return obj;
};
function obj_getProperty_Substring (obj_, path){
	var obj = obj_, 
		start = 0,
		i = path.indexOf('.', start);
	while (i !== -1) {
		var key = path.substring(start, i);
		obj = obj[key];
		if (obj == null) {
			return null;
		}
		start = ++i;
		i = path.indexOf('.', i);
	}
	if (start === 0) {
		return obj[path];
	}
	return obj[path.substring(start, path.length)]
};
