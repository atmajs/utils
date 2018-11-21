export function coll_each (coll, fn, ctx){
    if (ctx == null)
        ctx = coll;
    if (coll == null)
        return coll;

    var imax = coll.length,
        i = 0;
    for(; i< imax; i++){
        fn.call(ctx, coll[i], i);
    }
    return ctx;
};
export function coll_indexOf (coll, x){
    if (coll == null)
        return -1;
    var imax = coll.length,
        i = 0;
    for(; i < imax; i++){
        if (coll[i] === x)
            return i;
    }
    return -1;
};
export function coll_remove (coll, x){
    var i = coll_indexOf(coll, x);
    if (i === -1)
        return false;
    coll.splice(i, 1);
    return true;
};
export function coll_map (coll, fn, ctx){
    var arr = new Array(coll.length);
    coll_each(coll, function(x, i){
        arr[i] = fn.call(this, x, i);
    }, ctx);
    return arr;
};
export function coll_find (coll, fn, ctx){
    var imax = coll.length,
        i = 0;
    for(; i < imax; i++){
        if (fn.call(ctx || coll, coll[i], i))
            return true;
    }
    return false;
};