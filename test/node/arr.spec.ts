import { arr_distinct } from '../../src/arr';

UTest({
    'distinct strings' () {
        let arr = arr_distinct(['foo', 'oo', 'foo']);
        deepEq_(arr, ['foo', 'oo']);
    }
})