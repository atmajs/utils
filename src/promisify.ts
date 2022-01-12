import { type class_EventEmitter } from './class/EventEmitter';

export namespace promisify {
    export function fromEvent <TEvents extends Record<keyof TEvents, (...args: any) => any> = any, TKey extends keyof TEvents = any> (
        ctx: class_EventEmitter<TEvents>,
        event: TKey,
        handlerFn?: (...args: Parameters<TEvents[TKey]>) => any | Promise<any>,
        options?: {
            timeout?: number
        }
    ) {
        return new Promise(function (resolve, reject) {
            const cb = async (...args: Parameters<TEvents[TKey]>) => {
                let timeout;
                let completed = false;
                let ms = options?.timeout;
                if (ms) {
                    timeout = setTimeout(() => {
                        if (completed) {
                            return;
                        }
                        completed = true;
                        reject(new Error(`Timeouted, event was not called within ${ms}ms`));
                    }, ms);
                }
                try {
                    let r = handlerFn == null ? args[0] : await handlerFn(...args);
                    if (completed === false) {
                        completed = true;
                        resolve(r);
                    }
                } catch (error) {
                    if (completed === false) {
                        completed = true;
                        reject(error)
                    }
                } finally {
                    clearTimeout(timeout);
                }
            };
            ctx.once(event, <any> cb);
        })
    }
}
