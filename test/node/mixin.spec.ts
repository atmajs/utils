import { mixin } from '../../src/mixin'

UTest({
    'should mix two objects' () {
        let Ctor = mixin({ 
            foo: 1, 
            fooFn: () => 1 
        }, { 
            bar: 2, 
            barFn: () => 2
        });

        let obj = new Ctor;
        eq_(obj.foo, 1);
        eq_(obj.fooFn(), 1);
        eq_(obj.bar, 2);
        eq_(obj.barFn(), 2);
    },
    'shoud mix classes': {
        'simple class' () {
            class Foo {
                foo = 1
                fooFromCtor = null;
                constructor () {
                    this.fooFromCtor = 1;
                }
                fooFn() { return this.foo }
                static Foo = 1
            }
            class Bar {
                bar = 2
                barFromCtor = null
                constructor () {
                    this.barFromCtor = 2;
                }
                barFn() { return this.bar }
                static Bar = 2
            }
            let Ctor = mixin(Foo, Bar);
            let obj = new Ctor;
            eq_(obj.foo, 1);
            eq_(obj.fooFn(), 1);
            eq_(obj.bar, 2);
            eq_(obj.barFn(), 2);

            eq_(obj.fooFromCtor, 1);
            eq_(obj.barFromCtor, 2);

            eq_(Ctor.Foo, 1);
            eq_(Ctor.Bar, 2);
        }
    }
})