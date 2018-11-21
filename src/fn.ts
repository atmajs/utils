export function fn_proxy (fn, ctx) {
    return function(){
        var imax = arguments.length,
            args = new Array(imax),
            i = 0;
        for(; i<imax; i++) args[i] = arguments[i];
        return fn_apply(fn, ctx, args);
    };
};

export function fn_apply (fn, ctx, args){
    var l = args.length;
    if (0 === l)
        return fn.call(ctx);
    if (1 === l)
        return fn.call(ctx, args[0]);
    if (2 === l)
        return fn.call(ctx, args[0], args[1]);
    if (3 === l)
        return fn.call(ctx, args[0], args[1], args[2]);
    if (4 === l)
        return fn.call(ctx, args[0], args[1], args[2], args[3]);

    return fn.apply(ctx, args);
};

export function fn_doNothing (){
    return false;
};

export function fn_createByPattern (definitions, ctx){
    var imax = definitions.length;
    return function(){
        var l = arguments.length,
            i = -1,
            def;

        outer: while(++i < imax){
            def = definitions[i];
            if (def.pattern.length !== l) {
                continue;
            }
            var j = -1;
            while(++j < l){
                var fn  = def.pattern[j];
                var val = arguments[j];
                if (fn(val) === false) {
                    continue outer;
                }
            }
            return def.handler.apply(ctx, arguments);
        }

        console.error('InvalidArgumentException for a function', definitions, arguments);
        return null;
    };
};
