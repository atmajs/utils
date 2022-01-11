import { class_EventEmitter } from '../../src/class/EventEmitter';
import { promisify } from '../../src/promisify';

UTest({
    async 'should promisify the event' () {
        let events = new class_EventEmitter();
        let dfr = promisify.fromEvent(events, 'foo');

        events.emit('foo', 'bar');

        let r = await dfr;
        eq_(r, 'bar');
    }
})
