
export class class_Uri {
    protocol: string = null
    host: string = null
    path: string = null
    file: string = null

    extension: string = null
    search: string = null
    value: string = null

    constructor (uri?: string | class_Uri ) {
        if (uri == null) {
            return this;
        }
        if (util_isUri(uri)) {
            return util_clone(uri);
        }

        uri = normalize_path(uri);

        this.value = uri;

        parse_protocol(this);
        parse_host(this);
        parse_search(this);
        parse_file(this);


        // normilize path - "/some/path"
        this.path = normalize_pathsSlashes(this.value);
        return this;
    }
    cdUp () {
        var path = this.path;
        if (path == null || path === '' || path === '/') {
            this.path = '';
            return this;
        }
        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
        return this;
    }
    /**
     * '/path' - relative to host
     * '../path', 'path','./path' - relative to current path
     */
    combine (mix: string | class_Uri) {

        let path: string;
        if (util_isUri(mix)) {
            if (mix.protocol || mix.host) {
                return util_clone(mix);
            }
            path = mix.toString();
        } else {
            path = mix;
        }
        if (path == null || path === '') {
            return util_clone(this);
        }

        let uri = util_clone(this);

        uri.value = path;

        parse_search(uri);
        parse_file(uri);

        if (uri.value === '')  {
            return uri;
        }

        path = uri.value.replace(/^\.\//i, '');

        if (path[0] === '/') {
            uri.path = path;
            return uri;
        }

        while (/^(\.\.\/?)/ig.test(path)) {
            uri.cdUp();
            path = path.substring(3);
            if (uri.path === '') {
                break;
            }
        }

        uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));

        return uri;
    }
    toString () {
        var protocol = this.protocol ? this.protocol + '://' : '';
        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
        var str = protocol + path;

        if (!(this.file || this.search) && this.path) {
            str += '/'
        }
        return str;
    }
    toPathAndQuery () {
        return util_combinePathes(this.path, this.file) + (this.search || '');
    }
    /**
     * @return Current Uri Path{String} that is relative to @arg1 Uri
     */
    toRelativeString (uri: string | class_Uri) {
        if (typeof uri === 'string') {
            uri = new class_Uri(uri);
        }
        if (this.path.indexOf(uri.path) === 0) {
            // host folder
            var p = this.path ? this.path.replace(uri.path, '') : '';
            if (p[0] === '/')
                p = p.substring(1);


            return util_combinePathes(p, this.file) + (this.search || '');
        }

        // sub folder
        var current = this.path.split('/'),
            relative = uri.path.split('/'),
            commonpath = '',
            i = 0,
            length = Math.min(current.length, relative.length);

        for (; i < length; i++) {
            if (current[i] === relative[i])
                continue;

            break;
        }

        if (i > 0)
            commonpath = current.splice(0, i).join('/');

        if (commonpath) {
            var sub = '',
                path = uri.path,
                forward;
            while (path) {
                if (this.path.indexOf(path) === 0) {
                    forward = this.path.replace(path, '');
                    break;
                }
                path = path.replace(/\/?[^\/]+\/?$/i, '');
                sub += '../';
            }
            return util_combinePathes(sub, forward, this.file);
        }


        return this.toString();
    }

    toLocalFile () {
        var path = util_combinePathes(this.host, this.path, this.file);

        return util_win32Path(path);
    }
    toLocalDir () {
        var path = util_combinePathes(this.host, this.path, '/');

        return util_win32Path(path);
    }
    toDir () {
            var str = this.protocol ? this.protocol + '://' : '';

        return str + util_combinePathes(this.host, this.path, '/');
    }
    isRelative () {
        return !(this.protocol || this.host);
    }
    getName () {
        return this.file.replace('.' + this.extension,'');
    }

    static combinePathes = util_combinePathes;
    static combine = util_combinePathes;
};

var rgx_protocol = /^([\w\d]+):\/\//,
    rgx_extension = /\.([\w\d]+)$/i,
    rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/,
    rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i
    ;

function util_isUri(object: string | class_Uri): object is class_Uri {
    return object && typeof object === 'object' && typeof object.combine === 'function';
}

function util_combinePathes(a, b, c?, d?) {
    var args = arguments,
        str = '';
    for (var i = 0, x, imax = arguments.length; i < imax; i++){
        x = arguments[i];
        if (!x)
            continue;

        if (!str) {
            str = x;
            continue;
        }

        if (str[str.length - 1] !== '/')
            str += '/';

        str += x[0] === '/' ? x.substring(1) : x;
    }
    return str;
}

function normalize_pathsSlashes(str) {

    if (str[str.length - 1] === '/') {
        return str.substring(0, str.length - 1);
    }
    return str;
}

function util_clone(source: class_Uri) {
    var uri = new class_Uri(),
        key;
    for (key in source) {
        if (typeof source[key] === 'string') {
            uri[key] = source[key];
        }
    }
    return uri;
}

function normalize_path(str: string): string {
    str = str
        .replace(/\\/g,'/')
        .replace(/^\.\//,'')
        ;
    let double = /\/{2,}/g;
    do {
        let match = double.exec(str);
        if (match == null) {
            break;
        }
        if (match.index === 0 || str[match.index - 1] === ':') {
            continue;
        }
        str = str.substring(0, match.index) + '/' + str.substring(match.index + match[0].length + 1);
    } while (true);

    return str;
}

function util_win32Path(path) {
    if (rgx_win32Drive.test(path) && path[0] === '/') {
        return path.substring(1);
    }
    return path;
}

function parse_protocol(uri: class_Uri) {
    var match = rgx_protocol.exec(uri.value);
    if (match == null) {
        return;
    }
    uri.protocol = match[1];
    uri.value = uri.value.substring(match[0].length);
}
function parse_host(uri: class_Uri) {
    var match = rgx_win32Drive.exec(uri.value);
    if (match) {
        uri.protocol = 'file';
        uri.host = match[1];
        uri.value = uri.value.substring(uri.host.length);
    }

    if (uri.protocol == null || uri.protocol === 'file') {
        return;
    }

    let pathStartIdx = uri.value.indexOf('/', 2);
    uri.host = pathStartIdx !== -1
            ? uri.value.substring(0, pathStartIdx)
            : uri.value;

    uri.value = uri.value.replace(uri.host,'');
}

function parse_search(uri: class_Uri) {
    var question = uri.value.indexOf('?');
    if (question === -1) {
        return;
    }
    uri.search = uri.value.substring(question);
    uri.value = uri.value.substring(0, question);
}

function parse_file(obj) {
    var match = rgx_fileWithExt.exec(obj.value),
        file = match == null ? null : match[1];

    if (file == null) {
        return
    }
    obj.file = file;
    obj.value = obj.value.substring(0, obj.value.length - file.length);
    obj.value = normalize_pathsSlashes(obj.value);

    match = rgx_extension.exec(file);
    obj.extension = match == null ? null : match[1];
}

