import { fn_apply } from '../fn';
import { _Array_slice } from '../refs';

export class class_EventEmitter<TEvents extends Record<keyof TEvents, (...args: any) => any> = any>  {
    private _listeners: any = {}

    on<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]) {
        if (fn != null) {
            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
        }
        return this;
    }
    once<TKey extends keyof TEvents>(event: TKey, fn: TEvents[TKey]) {
        if (fn != null) {
            (fn as any)._once = true;
            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
        }
        return this;
    }

    pipe<TKey extends keyof TEvents>(event: TKey) {
        var that = this,
            args;
        return function () {
            args = _Array_slice.call(arguments);
            args.unshift(event);
            fn_apply(that.trigger, that, args);
        };
    }

    emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>) {
        let fns = this._listeners[event];
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
        var listeners = this._listeners[event];
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


