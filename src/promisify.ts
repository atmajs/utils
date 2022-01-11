import { type class_EventEmitter } from './class/EventEmitter';

export namespace promisify {
    export function fromEvent <TEvents extends Record<keyof TEvents, (...args: any) => any> = any> (
        ctx: class_EventEmitter<TEvents>,
        event: keyof TEvents,
        handlerFn?: () => any | Promise<any>
    ) {
        return new Promise(function (resolve, reject) {
            const cb = handlerFn == null
                ? resolve
                : async () => {
                    try {
                        let r = await handlerFn();
                        resolve(r);
                    } catch (error) {
                        reject(error)
                    }
                };

            ctx.once(event, <any> cb);
        })
    }
}
