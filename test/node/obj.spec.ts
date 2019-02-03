import { obj_getProperty, obj_setProperty } from '../../src/obj';

UTest({
	'elvis in getter' () {
		var x = obj_getProperty({ foo: { bar: 'bar'}}, 'foo?.bar');
		eq_(x, 'bar');
	},
	'elvis in setter' () {
		var x = <any> {};
		obj_setProperty(x, 'foo?.bar', 'test');
		eq_(x.foo.bar, 'test');
	}
})