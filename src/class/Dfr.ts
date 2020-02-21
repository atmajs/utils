import { fn_apply, fn_proxy } from '../fn';
import { is_Function } from '../is';
import { _Array_slice } from '../refs';

//@TODO remove constructr run
export const class_Dfr = function(mix?): void {
    if (typeof mix === 'function') {
        return class_Dfr.run(mix);
    }
};
class_Dfr.prototype = {
    _isAsync: true,
    _done: null,
    _fail: null,
    _always: null,
    _resolved: null,
    _rejected: null,

    defer: function(){
        this._rejected = null;
        this._resolved = null;
        return this;
    },
    isResolved: function(){
        return this._resolved != null;
    },
    isRejected: function(){
        return this._rejected != null;
    },
    isBusy: function(){
        return this._resolved == null && this._rejected == null;
    },
    resolve: function() {
        var done = this._done,
            always = this._always
            ;

        this._resolved = arguments;

        dfr_clearListeners(this);
        arr_callOnce(done, this, arguments);
        arr_callOnce(always, this, [ this ]);

        return this;
    },
    reject: function() {
        var fail = this._fail,
            always = this._always
            ;

        this._rejected = arguments;

        dfr_clearListeners(this);
        arr_callOnce(fail, this, arguments);
        arr_callOnce(always, this, [ this ]);
        return this;
    },
    then: function(filterSuccess, filterError){
        return this.pipe(filterSuccess, filterError);
    },
    done: function(callback) {
        if (this._rejected != null)
            return this;
        return dfr_bind(
            this,
            this._resolved,
            this._done || (this._done = []),
            callback
        );
    },
    fail: function(callback) {
        if (this._resolved != null)
            return this;
        return dfr_bind(
            this,
            this._rejected,
            this._fail || (this._fail = []),
            callback
        );
    },
    always: function(callback) {
        return dfr_bind(
            this,
            this._rejected || this._resolved,
            this._always || (this._always = []),
            callback
        );
    },
    pipe: function(mix /* ..methods */){
        var dfr;
        if (typeof mix === 'function') {
            dfr = new class_Dfr();
            var done_ = mix,
                fail_ = arguments.length > 1
                    ? arguments[1]
                    : null;

            this
                .done(delegate(dfr, 'resolve', done_))
                .fail(delegate(dfr, 'reject',  fail_))
                ;
            return dfr;
        }

        dfr = mix;
        var imax = arguments.length,
            done = imax === 1,
            fail = imax === 1,
            i = 0, x;
        while( ++i < imax ){
            x = arguments[i];
            switch(x){
                case 'done':
                    done = true;
                    break;
                case 'fail':
                    fail = true;
                    break;
                default:
                    console.error('Unsupported pipe channel', arguments[i])
                    break;
            }
        }
        done && this.done(delegate(dfr, 'resolve'));
        fail && this.fail(delegate(dfr, 'reject' ));

        function pipe(dfr, method) {
            return function(){
                dfr[method].apply(dfr, arguments);
            };
        }
        function delegate(dfr, name, fn?) {
            return function(){
                if (fn != null) {
                    var override = fn.apply(this, arguments);
                    if (override != null && override !== dfr) {
                        if (isDeferred(override)) {
                            override.then(delegate(dfr, 'resolve'), delegate(dfr, 'reject'));
                            return;
                        }

                        dfr[name](override)
                        return;
                    }
                }
                dfr[name].apply(dfr, arguments);
            };
        }

        return this;
    },
    pipeCallback: function(){
        var self = this;
        return function(error){
            if (error != null) {
                self.reject(error);
                return;
            }
            var args = _Array_slice.call(arguments, 1);
            fn_apply(self.resolve, self, args);
        };
    },
    resolveDelegate: function(){
        return fn_proxy(this.resolve, this);
    },
    
    rejectDelegate: function(){
        return fn_proxy(this.reject, this);
    },
    catch (cb) {
        return this.fail(cb);
    },
    finally (cb) {
        return this.always(cb);
    }
};
class_Dfr.resolve = function(a?, b?, c?){
    var dfr = new class_Dfr();
    return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
};
class_Dfr.reject = function(error){
    var dfr = new class_Dfr();
    return dfr.reject(error);
};
class_Dfr.run = function(fn, ctx?){
    var dfr = new class_Dfr();
    if (ctx == null)
        ctx = dfr;

    fn.call(
        ctx
        , fn_proxy(dfr.resolve, ctx)
        , fn_proxy(dfr.reject, dfr)
        , dfr
    );
    return dfr;
};
class_Dfr.all = function(promises){
    var dfr = new class_Dfr,
        arr = new Array(promises.length),
        wait = promises.length,
        error = null;
    if (wait === 0) {
        return dfr.resolve(arr);
    }
    function tick (index) {
        if (error != null) {
            return;
        }
        var args = _Array_slice.call(arguments, 1);
        arr.splice.apply(arr, [index, 0].concat(args));
        if (--wait === 0) {
            dfr.resolve(arr);
        }
    }
    function onReject (err) {
        dfr.reject(error = err);
    }
    var imax = promises.length,
        i = -1;
    while(++i < imax){
        var x = promises[i];
        if (x == null || x.then == null) {
            tick(i);
            continue;
        }
        x.then(tick.bind(null, i), onReject);
    }		
    return dfr; 
};

// PRIVATE

function dfr_bind(dfr, arguments_, listeners, callback){
    if (callback == null)
        return dfr;

    if ( arguments_ != null)
        fn_apply(callback, dfr, arguments_);
    else
        listeners.push(callback);

    return dfr;
}

function dfr_clearListeners(dfr) {
    dfr._done = null;
    dfr._fail = null;
    dfr._always = null;
}

function arr_callOnce(arr, ctx, args) {
    if (arr == null)
        return;

    var imax = arr.length,
        i = -1,
        fn;
    while ( ++i < imax ) {
        fn = arr[i];

        if (fn)
            fn_apply(fn, ctx, args);
    }
    arr.length = 0;
}
function isDeferred(x){
    return x != null 
        && typeof x === 'object' 
        && is_Function(x.then)
    ;
}
