var error_createClass,
	error_formatSource,
	error_formatCursor,
	error_cursor;
	
(function(){
	error_createClass = function(name, Proto){
		var Ctor = _createCtor(Proto);
		Ctor.prototype = new Error;
		
		Proto.constructor = Error;
		Proto.name = name;
		obj_extend(Ctor.prototype, Proto);
		return Ctor;
	};
	
	error_formatSource = function(source, index, filename) {
		var cursor  = error_cursor(source, index),
			lines   = cursor[0],
			lineNum = cursor[1],
			rowNum  = cursor[2],
			str = '';
		if (filename != null) {
			str += str_format(' at {0}({1}:{2})\n', filename, lineNum, rowNum);
		}
		return str + error_formatCursor(lines, lineNum, rowNum);
	};
	
	/**
	 * @returns [ lines, lineNum, rowNum ]
	 */
	error_cursor = function(str, index){
		var lines = str.substring(0, index).split('\n'),
			line = lines.length,
			row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		if (line > 1) {
			// remote trailing newline
			row -= 1;
		}
		return [str.split('\n'), line, row];
	};
	
	(function(){
		error_formatCursor = function(lines, lineNum, rowNum) {
				
			var BEFORE = 3,
				AFTER  = 2,
				i = lineNum - BEFORE,
				imax   = i + BEFORE + AFTER,
				str  = '';
			
			if (i < 0) i = 0;
			if (imax > lines.length) imax = lines.length;
			
			var lineNumberLength = String(imax).length,
				lineNumber;
			
			for(; i < imax; i++) {
				if (str)  str += '\n';
				
				lineNumber = ensureLength(i + 1, lineNumberLength);
				str += lineNumber + '|' + lines[i];
				
				if (i + 1 === lineNum) {
					str += '\n' + repeat(' ', lineNumberLength + 1);
					str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
					str += '^';
				}
			}
			return str;
		};
		
		function ensureLength(num, count) {
			var str = String(num);
			while(str.length < count) {
				str += ' ';
			}
			return str;
		}
		function repeat(char_, count) {
			var str = '';
			while(--count > -1) {
				str += char_;
			}
			return str;
		}
	}());
	
	function _createCtor(Proto){
		var Ctor = Proto.hasOwnProperty('constructor')
			? Proto.constructor
			: null;
			
		return function(){
			this.stack   = _prepairStack();
			this.message = str_format.apply(this, arguments);
			
			if (Ctor != null) {
				Ctor.apply(this, arguments);
			}
		};
	}
	
	function _prepairStack() {
		var stack = new Error().stack;
		return stack == null ? null : stack
			.split('\n')
			.slice(3)
			.join('\n');
	}
	
}());