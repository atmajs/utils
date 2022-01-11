import { fn_apply } from '../fn';
import { _Array_slice } from '../refs';

export class class_EventEmitter<TEvents extends Record<keyof TEvents, (...args: any) => any> = any>  {
    public _listeners = {} as {
        [event: string]: (Function & { _once?: boolean }) []
    }

    on<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]) {
        if (fn != null) {
            (this._listeners[event as string] || (this._listeners[event as string] = [])).push(fn);
        }
        return this;
    }
    once<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]) {
        if (fn != null) {
            (fn as any)._once = true;
            (this._listeners[event as string] || (this._listeners[event as string] = [])).push(fn);
        }
        return this;
    }

    /**
     * Returns a function, which when called - triggers the event with the arguments passed to that function
     */
    pipe<TKey extends keyof TEvents>(event: TKey) {
        return (...args: Parameters<TEvents[TKey]>) => {
            this.emit(event, ...args);
        };
    }

    emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>) {
        let fns = this._listeners[event as string];
        if (fns == null) {
            return this;
        }

        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            fn_apply(fn, this, args);

            if (fn !== fns[i]) {
                // the callback has removed itself
                i--;
                continue;
            }

            if (fn._once === true) {
                fns.splice(i, 1);
                i--;
            }
        }
        return this;
    }
    trigger<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>) {
        return this.emit(event, ...args);
    }

    off<TKey extends keyof TEvents>(event: TKey, fn?: Function) {
        var listeners = this._listeners[event as string];
        if (listeners == null)
            return this;

        if (arguments.length === 1) {
            listeners.length = 0;
            return this;
        }

        var imax = listeners.length,
            i = -1;
        while (++i < imax) {

            if (listeners[i] === fn) {
                listeners.splice(i, 1);
                i--;
                imax--;
            }

        }
        return this;
    }
};


