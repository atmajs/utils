import { error_createClass, error_cursor, error_formatCursor } from '../../src/error';

UTest({
    'Error Constructor' () {
        var FooError = error_createClass('FooError', {

        });

        var foo = new FooError('I am {0}!', 'Baz');
        eq_(foo.name, 'FooError');
        eq_(foo.message, 'I am Baz!');

        eq_(String(foo), 'FooError: I am Baz!');

        has_(foo.stack.split('\n')[0], '.spec.ts');
        is_(foo, Error);
        is_(foo, FooError);
    },

    'format cursor' () {
        var source = '01234';
        var cursor = error_cursor(source, 3);
        eq_(cursor[1], 1, 'Line number is wrong');
        eq_(cursor[2], 4, 'Row number is wrong');


        var str = error_formatCursor.apply(null, cursor);
        var lines = str.split('\n');
        eq_(lines[0], '1|01234');
        eq_(lines[1], '     ^');
    }
})
