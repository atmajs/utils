export function arr_remove (array, x){
    var i = array.indexOf(x);
    if (i === -1)
        return false;
    array.splice(i, 1);
    return true;
};
export function arr_each (arr, fn, ctx?){
    arr.forEach(fn, ctx);
};
export function arr_indexOf (arr, x){
    return arr.indexOf(x);
};
export function arr_contains (arr, x){
    return arr.indexOf(x) !== -1;
};
export function arr_pushMany (arr, arrSource){
    if (arrSource == null || arr == null || arr === arrSource)
        return;

    var il = arr.length,
        jl = arrSource.length,
        j = -1
        ;
    while( ++j < jl ){
        arr[il + j] = arrSource[j];
    }
};
