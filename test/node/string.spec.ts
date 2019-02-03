import { str_dedent } from '../../src/str';

UTest({
	'Dedent': {
		'same indent' () {
			var Foo = `
				one
				two
			`;
			eq_(str_dedent(Foo), 'one\ntwo');
		},
		'first line space' () {
			var Foo = `
				 one
				two
			`;
			eq_(str_dedent(Foo), ' one\ntwo');
		},
		'next line space' () {
			var Foo = `
				one
				 two
			`;
			eq_(str_dedent(Foo), 'one\n two');
		}
	} 
})