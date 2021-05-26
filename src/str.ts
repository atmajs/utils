import { is_Object } from './is';

export function str_format (str_, a?, b?, c?, d?){
    let imax = arguments.length;
    let i = 0;
    while ( ++i < imax ){
        let x = arguments[i];
        if (is_Object(x) && x.toJSON) {
            x = x.toJSON();
        }
        str_ = str_.replace(rgxNum(i - 1), String(x));
    }

    return str_;
};
export function str_dedent (str: string) {
    var rgx = /^[\t ]*\S/gm,
        match = rgx.exec(str),
        count = -1;
    while(match != null) {
        var x = match[0].length;
        if (count === -1 || x < count) count = x;
        match = rgx.exec(str);
    }
    if (--count < 1)
        return str;

    var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');
    return str
        .replace(replacer, '')
        .replace(/^[\t ]*\r?\n/,'')
        .replace(/\r?\n[\t ]*$/,'')
        ;
};
var rgxNum;
(function(){
    rgxNum = function(num){
        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
    };
    var cache_ = {};
}());
