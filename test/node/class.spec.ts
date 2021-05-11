import { class_create, class_createEx } from '../../src/class';
import { class_Dfr } from '../../src/class/Dfr';
import { class_EventEmitter } from '../../src/class/EventEmitter';

testClassFactory(class_create);
testClassFactory(class_createEx);

function testClassFactory(factory) {
    UTest({
        'inheritance - constructor returns' : {
            'return last' () {
                var obj = { baz : 3 };
                var A = assert.await(() => void 0);
                var B = assert.await(() => void 0);
                var C = factory(A, B, {
                    constructor: () => obj
                });
                has_(new C, obj);
            },
            'return first' () {
                var obj = { baz : 3 };
                var A = assert.await(() => obj);
                var B = assert.avoid();
                var C = factory(A, B, {
                    foo: 1,
                    constructor: assert.avoid()
                });
                has_(new C, { baz: 3 });
            },
            'return middle' () {
                var obj = { baz : 3 };
                var A = assert.await(() => void 0);
                var B = assert.await(() => obj);
                var C = factory(A, B, {
                    foo: 1,
                    constructor: assert.avoid()
                });
                has_(new C, obj);
            },
        },
        'classes' () {
            const Foo = factory(class_Dfr, class_EventEmitter, {});
            const foo = new Foo();

            is_(foo.then, Function);
            is_(foo.on, Function);

        }
    });
}
