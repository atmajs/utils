import { obj_create } from './obj';

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
export function arr_distinct (arr, compareFn?) {
    let out = [];
    let hash = compareFn == null ? obj_create(null) : null;
    
    outer: for (let i = 0; i < arr.length; i++) {
        let x = arr[i];
        if (compareFn == null) {
            if (hash[x] === 1) {
                continue;
            }
            hash[x] = 1;
        }
        else {
            for (let j = i - 1; j > -1; j--) {
                let prev = arr[j];
                if (compareFn(x, prev)) {
                    continue outer;
                }
            }
        }
        out.push(x);
    }
    return out;
}

