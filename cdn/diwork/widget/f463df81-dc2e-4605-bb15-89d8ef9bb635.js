/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(33);
var toPrimitive = __webpack_require__(18);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(32);
var hide = __webpack_require__(7);
var has = __webpack_require__(2);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(61);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(17)('wks');
var uid = __webpack_require__(13);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(17)('keys');
var uid = __webpack_require__(13);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(12) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(55);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(70);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(60);
var enumBugKeys = __webpack_require__(24);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(65).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(2);
var TAG = __webpack_require__(9)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(9);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(12);
var wksExt = __webpack_require__(26);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(2);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(12);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(36);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(59);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(30);
var ITERATOR = __webpack_require__(9)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(2);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(62)(false);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(13)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(2);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(37);
var hiddenKeys = __webpack_require__(24).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(28);
var createDesc = __webpack_require__(14);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(18);
var has = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(33);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__download_svg__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__download_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__download_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_css__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_widgetInstance__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_widgetInstance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_widgetInstance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_widgetTool__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_widgetTool___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_widgetTool__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_widgetContext__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_widgetContext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_widgetContext__);
var echart=__webpack_require__(97);var httpList={'workbench.yyuap.com':'http://hrcloud.yyuap.com','www.diwork.com':'https://hr.diwork.com','workbench-daily.yyuap.com':'https://hr-daily.yyuap.com','u8c-daily.yyuap.com':'https://hr-u8c-daily.yyuap.com','yonsuite-pre.diwork.com':'https://hr-yonsuite-pre.diwork.com','yonsuite.diwork.com':'https://hr.diwork.com'};var serverUrl=window.location.href.split('/')[2];var CostAnalysis=function(_Component){__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(CostAnalysis,_Component);function CostAnalysis(props){__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this,CostAnalysis);var _this2=__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this,(CostAnalysis.__proto__||__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(CostAnalysis)).call(this,props));_this2.generatePeriod=function(){var currentMonth=new Date().getMonth();var data=[];var beginMonth=new Date(new Date().setMonth(currentMonth-5)).getMonth();data.push(beginMonth+1);for(var i=1;i<6;i++){var value=new Date(new Date().setMonth(beginMonth+i)).getMonth()+1;data.push(value);}return data;};_this2.getData=function(){var _this=_this2;var url=httpList[serverUrl]+"/attend-report/attendqueryRpt/queryAttendCtieRptVO";var xhr=_this2.createCORSRequest('GET',url);if(!xhr){console.log('CORS not supported');return;}var params={"year":new Date().getFullYear(),'count':'6'};xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){var res=JSON.parse(xhr.responseText);var datas=res.data;var period=[],data=[];for(var key in datas){period.push(key);data.push(datas[key]);}_this.setState({data:data,period:period},function(){_this.renderEchart();});}else{_this.renderEchart();}};xhr.onerror=function(){_this.renderEchart();};xhr.send();};_this2.createCORSRequest=function(method,url){var xhr=new XMLHttpRequest();if("withCredentials"in xhr){xhr.withCredentials=true;xhr.open(method,url,true);}else if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();xhr.open(method,url);}else{xhr=null;}return xhr;};_this2.reLoad=function(e){e.preventDefault();e.stopPropagation();_this2.getData();};_this2.renderEchart=function(){var that=_this2;_this2.echartLine.setOption({title:{show:false},toolbox:{show:false},tooltip:{show:false},grid:{left:'32px',right:'32px',bottom:'32px',top:'18px',containLabel:true},color:['#4A5A69'],axisPointer:{triggerTooltip:false,triggerOn:'none'},xAxis:{type:'category',boundaryGap:false,axisTick:{show:false},axisLabel:{formatter:function formatter(value,index){if(__WEBPACK_IMPORTED_MODULE_10_widgetContext__["locale"]==='zh_CN'||__WEBPACK_IMPORTED_MODULE_10_widgetContext__["locale"]==='zh_TW'){return value+'月';}else{return that.state.mounthI18n[__WEBPACK_IMPORTED_MODULE_10_widgetContext__["locale"]]&&that.state.mounthI18n[__WEBPACK_IMPORTED_MODULE_10_widgetContext__["locale"]][value-1];}}},axisLine:{lineStyle:{color:'#888888'}},data:_this2.getxAxisData()},yAxis:{show:true,type:'value',axisTick:{show:false},axisLabel:{show:false},axisPointer:{triggerTooltip:false},axisLine:{show:false}},series:[{name:'部门假勤',type:'line',smooth:false,data:_this2.state.data,areaStyle:{normal:{color:new echart.echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(74,90,105,1)'},{offset:1,color:'rgba(207,241,255,0)'}])}}}]});};_this2.getxAxisData=function(){return _this2.state.period.map(function(value,index){var obj={textStyle:{fontSize:12,color:'#888888'}};obj['value']=value;if(index===0){obj.textStyle['align']='left';}else if(index+1===_this2.state.period.length){obj.textStyle['align']='right';}return obj;});};_this2.state={data:[0,0,0,0,0,0],period:_this2.generatePeriod(),trend:{zh_CN:'平均工时变动趋势',zh_TW:'平均工時變動趨勢',en_US:'Avg. Work Hrs Trend'},mounthI18n:{en_US:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}};return _this2;}__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(CostAnalysis,[{key:'componentDidMount',value:function componentDidMount(){this.echartLine=echart.echarts.init(document.getElementById('attend_echart_line'));this.getData();}},{key:'clickHandler',value:function clickHandler(){Object(__WEBPACK_IMPORTED_MODULE_9_widgetTool__["dispatch"])('openService',{serviceCode:__WEBPACK_IMPORTED_MODULE_8_widgetInstance__["serviceCode"]});}},{key:'render',value:function render(){return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_7__index_css__["wrap"],onClick:this.clickHandler},__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_7__index_css__["titleContainer"]},__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_7__index_css__["title"]},__WEBPACK_IMPORTED_MODULE_8_widgetInstance__["widgetName"])),__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div',{id:'attend_echart_line',className:__WEBPACK_IMPORTED_MODULE_7__index_css__["echartContainer"]}),__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('a',null,__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img',{className:__WEBPACK_IMPORTED_MODULE_7__index_css__["svg"],src:__WEBPACK_IMPORTED_MODULE_6__download_svg___default.a,onClick:this.reLoad}),__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('span',{className:__WEBPACK_IMPORTED_MODULE_7__index_css__["worktimeTitle"]},this.state.trend[__WEBPACK_IMPORTED_MODULE_10_widgetContext__["locale"]]))));}}]);return CostAnalysis;}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (CostAnalysis);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(29);
var $getPrototypeOf = __webpack_require__(30);

__webpack_require__(31)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(51);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
__webpack_require__(66);
module.exports = __webpack_require__(26).f('iterator');


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(58)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(35)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);
var defined = __webpack_require__(15);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(22);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(38);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(63);
var toAbsoluteIndex = __webpack_require__(64);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(20);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
var global = __webpack_require__(1);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(21);
var TO_STRING_TAG = __webpack_require__(9)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68);
var step = __webpack_require__(69);
var Iterators = __webpack_require__(21);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(35)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(78);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(36);
var META = __webpack_require__(39).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(17);
var setToStringTag = __webpack_require__(25);
var uid = __webpack_require__(13);
var wks = __webpack_require__(9);
var wksExt = __webpack_require__(26);
var wksDefine = __webpack_require__(27);
var enumKeys = __webpack_require__(73);
var isArray = __webpack_require__(74);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(18);
var createDesc = __webpack_require__(14);
var _create = __webpack_require__(22);
var gOPNExt = __webpack_require__(75);
var $GOPD = __webpack_require__(42);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(23);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(28).f = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(12)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(28);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(38);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(41).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('asyncIterator');


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('observable');


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(80);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(84);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(83).set });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(32)(Function.call, __webpack_require__(42).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(22) });


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGQ9Ik01MTIgMTI4Yy0xODcuNzQ0IDAtMzQxLjM0NCAxNTMuNi0zNDEuMzQ0IDM0MS4zNDQgMCAxNzIuOCAxMzAuMTQ0IDMxNS43NDQgMjk2LjU0NCAzMzcuMDU2bC01Ny42IDQwLjU0NGMtMTAuNjU2IDYuNC0xMi44IDE5LjItNC4yNTYgMjkuODU2IDQuMjU2IDYuNCAxMC42NTYgOC41NDQgMTcuMDU2IDguNTQ0IDQuMjU2IDAgOC41NDQtMi4xNDQgMTIuOC00LjI1NmwxMTUuMi04MS4wNTYtODEuMDU2LTExNS4yYy02LjQtMTAuNjU2LTE5LjItMTIuOC0yOS44NTYtNC4yNTYtMTAuNjU2IDYuNC0xMi44IDE5LjItNC4yNTYgMjkuODU2bDM2LjI1NiA1MS4yYy0xNDUuMDU2LTIxLjM0NC0yNTYtMTQ1LjA1Ni0yNTYtMjk0LjQgMC0xNjQuMjU2IDEzNC40LTI5OC42NTYgMjk4LjY1Ni0yOTguNjU2czI5OC42NTYgMTM0LjQgMjk4LjY1NiAyOTguNjU2YzAgOTYtNDYuOTQ0IDE4NS42LTEyMy43NDQgMjQzLjJsMjUuNiAzNC4xNDRjODkuNi02NCAxNDAuOC0xNjguNTQ0IDE0MC44LTI3Ny4zNDQtMi4xNDQtMTg1LjYtMTU1Ljc0NC0zMzkuMi0zNDMuNDU2LTMzOS4yeiI+PC9wYXRoPgo8L3N2Zz4K"

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(92)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(91)(false);
// imports


// module
exports.push([module.i, ".scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__wrap--BIsLw{position:absolute;margin-top:-42px;width:360px;height:176px;background:#fff;-webkit-box-shadow:0 1px 1px 0 rgba(74,81,93,.1);box-shadow:0 1px 1px 0 rgba(74,81,93,.1);border-radius:3px;overflow:hidden}.scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__titleContainer--3Uszw{display:-webkit-box}.scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__title--3Q6U2{margin-top:14px;-webkit-box-flex:1.0;-webkit-box-pack:start;line-height:21px;padding-left:8px;font-size:16px;color:#111;font-family:tahoma,Hiragino Sans GB,arial,Heiti SC,Microsoft YaHei,\"sans-serif\"}.scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__echartContainer--3pcoU{height:134px}.scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__svg--1afhx{width:16px;height:19px;cursor:pointer;opacity:.4;position:absolute;left:9px;bottom:5px}.scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__worktimeTitle--2lF3i{position:absolute;right:9px;bottom:5px;font-size:12px;font-family:MicrosoftYaHei;color:#888;line-height:16px}", ""]);

// exports
exports.locals = {
	"wrap": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__wrap--BIsLw",
	"titleContainer": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__titleContainer--3Uszw",
	"title": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__title--3Q6U2",
	"echartContainer": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__echartContainer--3pcoU",
	"svg": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__svg--1afhx",
	"worktimeTitle": "scripts-f463df81-dc2e-4605-bb15-89d8ef9bb635-index__worktimeTitle--2lF3i"
};

/***/ }),
/* 91 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(93);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 93 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = widgetInstance;

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = widgetTool;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = widgetContext;

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
!function(t,e){"object"==(typeof exports==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(exports))&&"undefined"!=typeof module?e(exports):"function"==typeof define&&__webpack_require__(101)?define(["exports"],e):e(t.echarts={});}(this,function(t){"use strict";function e(t){var e={},n={},i=t.match(/Firefox\/([\d.]+)/),r=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),a=t.match(/Edge\/([\d.]+)/),o=/micromessenger/i.test(t);return i&&(n.firefox=!0,n.version=i[1]),r&&(n.ie=!0,n.version=r[1]),a&&(n.edge=!0,n.version=a[1]),o&&(n.weChat=!0),{browser:n,os:e,node:!1,canvasSupported:!!document.createElement("canvas").getContext,svgSupported:"undefined"!=typeof SVGRect,touchEventsSupported:"ontouchstart"in window&&!n.ie&&!n.edge,pointerEventsSupported:"onpointerdown"in window&&(n.edge||n.ie&&n.version>=11)};}function n(t,e){"createCanvas"===t&&(ef=null),Jc[t]=e;}function i(t){if(null==t||"object"!=(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t)))return t;var e=t,n=Uc.call(t);if("[object Array]"===n){if(!z(t)){e=[];for(var r=0,a=t.length;a>r;r++){e[r]=i(t[r]);}}}else if(qc[n]){if(!z(t)){var o=t.constructor;if(t.constructor.from)e=o.from(t);else{e=new o(t.length);for(var r=0,a=t.length;a>r;r++){e[r]=i(t[r]);}}}}else if(!jc[n]&&!z(t)&&!I(t)){e={};for(var s in t){t.hasOwnProperty(s)&&(e[s]=i(t[s]));}}return e;}function r(t,e,n){if(!M(e)||!M(t))return n?i(e):t;for(var a in e){if(e.hasOwnProperty(a)){var o=t[a],s=e[a];!M(s)||!M(o)||x(s)||x(o)||I(s)||I(o)||S(s)||S(o)||z(s)||z(o)?!n&&a in t||(t[a]=i(e[a],!0)):r(o,s,n);}}return t;}function a(t,e){for(var n=t[0],i=1,a=t.length;a>i;i++){n=r(n,t[i],e);}return n;}function o(t,e){for(var n in e){e.hasOwnProperty(n)&&(t[n]=e[n]);}return t;}function s(t,e,n){for(var i in e){e.hasOwnProperty(i)&&(n?null!=e[i]:null==t[i])&&(t[i]=e[i]);}return t;}function l(){return ef||(ef=tf().getContext("2d")),ef;}function u(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;i>n;n++){if(t[n]===e)return n;}}return-1;}function h(t,e){function n(){}var i=t.prototype;n.prototype=e.prototype,t.prototype=new n();for(var r in i){t.prototype[r]=i[r];}t.prototype.constructor=t,t.superClass=e;}function c(t,e,n){t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,s(t,e,n);}function f(t){return t?"string"==typeof t?!1:"number"==typeof t.length:void 0;}function d(t,e,n){if(t&&e)if(t.forEach&&t.forEach===Yc)t.forEach(e,n);else if(t.length===+t.length)for(var i=0,r=t.length;r>i;i++){e.call(n,t[i],i,t);}else for(var a in t){t.hasOwnProperty(a)&&e.call(n,t[a],a,t);}}function p(t,e,n){if(t&&e){if(t.map&&t.map===Kc)return t.map(e,n);for(var i=[],r=0,a=t.length;a>r;r++){i.push(e.call(n,t[r],r,t));}return i;}}function g(t,e,n,i){if(t&&e){if(t.reduce&&t.reduce===Qc)return t.reduce(e,n,i);for(var r=0,a=t.length;a>r;r++){n=e.call(i,n,t[r],r,t);}return n;}}function v(t,e,n){if(t&&e){if(t.filter&&t.filter===Zc)return t.filter(e,n);for(var i=[],r=0,a=t.length;a>r;r++){e.call(n,t[r],r,t)&&i.push(t[r]);}return i;}}function m(t,e,n){if(t&&e)for(var i=0,r=t.length;r>i;i++){if(e.call(n,t[i],i,t))return t[i];}}function y(t,e){var n=$c.call(arguments,2);return function(){return t.apply(e,n.concat($c.call(arguments)));};}function _(t){var e=$c.call(arguments,1);return function(){return t.apply(this,e.concat($c.call(arguments)));};}function x(t){return"[object Array]"===Uc.call(t);}function w(t){return"function"==typeof t;}function b(t){return"[object String]"===Uc.call(t);}function M(t){var e=typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t);return"function"===e||!!t&&"object"==e;}function S(t){return!!jc[Uc.call(t)];}function C(t){return!!qc[Uc.call(t)];}function I(t){return"object"==(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t))&&"number"==typeof t.nodeType&&"object"==__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t.ownerDocument);}function D(t){return t!==t;}function T(){for(var t=0,e=arguments.length;e>t;t++){if(null!=arguments[t])return arguments[t];}}function k(t,e){return null!=t?t:e;}function A(t,e,n){return null!=t?t:null!=e?e:n;}function L(){return Function.call.apply($c,arguments);}function P(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t;}function O(t,e){if(!t)throw new Error(e);}function E(t){return null==t?null:"function"==typeof t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");}function R(t){t[nf]=!0;}function z(t){return t[nf];}function B(t){function e(t,e){n?i.set(t,e):i.set(e,t);}var n=x(t),i=this;t instanceof B?t.each(e):t&&d(t,e);}function N(t){return new B(t);}function F(t,e){for(var n=new t.constructor(t.length+e.length),i=0;i<t.length;i++){n[i]=t[i];}var r=t.length;for(i=0;i<e.length;i++){n[i+r]=e[i];}return n;}function V(){}function H(t,e){var n=new af(2);return null==t&&(t=0),null==e&&(e=0),n[0]=t,n[1]=e,n;}function W(t,e){return t[0]=e[0],t[1]=e[1],t;}function G(t){var e=new af(2);return e[0]=t[0],e[1]=t[1],e;}function j(t,e,n){return t[0]=e,t[1]=n,t;}function q(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t;}function U(t,e,n,i){return t[0]=e[0]+n[0]*i,t[1]=e[1]+n[1]*i,t;}function X(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t;}function Y(t){return Math.sqrt(Z(t));}function Z(t){return t[0]*t[0]+t[1]*t[1];}function $(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t;}function K(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t;}function Q(t,e){return t[0]*e[0]+t[1]*e[1];}function J(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t;}function te(t,e){var n=Y(e);return 0===n?(t[0]=0,t[1]=0):(t[0]=e[0]/n,t[1]=e[1]/n),t;}function ee(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]));}function ne(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]);}function ie(t,e){return t[0]=-e[0],t[1]=-e[1],t;}function re(t,e,n,i){return t[0]=e[0]+i*(n[0]-e[0]),t[1]=e[1]+i*(n[1]-e[1]),t;}function ae(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[2]*r+n[4],t[1]=n[1]*i+n[3]*r+n[5],t;}function oe(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t;}function se(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t;}function le(){this.on("mousedown",this._dragStart,this),this.on("mousemove",this._drag,this),this.on("mouseup",this._dragEnd,this),this.on("globalout",this._dragEnd,this);}function ue(t,e){return{target:t,topTarget:e&&e.topTarget};}function he(t,e,n){return{type:t,event:n,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:n.zrX,offsetY:n.zrY,gestureEvent:n.gestureEvent,pinchX:n.pinchX,pinchY:n.pinchY,pinchScale:n.pinchScale,wheelDelta:n.zrDelta,zrByTouch:n.zrByTouch,which:n.which};}function ce(){}function fe(t,e,n){if(t[t.rectHover?"rectContain":"contain"](e,n)){for(var i,r=t;r;){if(r.clipPath&&!r.clipPath.contain(e,n))return!1;r.silent&&(i=!0),r=r.parent;}return i?df:!0;}return!1;}function de(){var t=new vf(6);return pe(t),t;}function pe(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;}function ge(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t;}function ve(t,e,n){var i=e[0]*n[0]+e[2]*n[1],r=e[1]*n[0]+e[3]*n[1],a=e[0]*n[2]+e[2]*n[3],o=e[1]*n[2]+e[3]*n[3],s=e[0]*n[4]+e[2]*n[5]+e[4],l=e[1]*n[4]+e[3]*n[5]+e[5];return t[0]=i,t[1]=r,t[2]=a,t[3]=o,t[4]=s,t[5]=l,t;}function me(t,e,n){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+n[0],t[5]=e[5]+n[1],t;}function ye(t,e,n){var i=e[0],r=e[2],a=e[4],o=e[1],s=e[3],l=e[5],u=Math.sin(n),h=Math.cos(n);return t[0]=i*h+o*u,t[1]=-i*u+o*h,t[2]=r*h+s*u,t[3]=-r*u+h*s,t[4]=h*a+u*l,t[5]=h*l-u*a,t;}function _e(t,e,n){var i=n[0],r=n[1];return t[0]=e[0]*i,t[1]=e[1]*r,t[2]=e[2]*i,t[3]=e[3]*r,t[4]=e[4]*i,t[5]=e[5]*r,t;}function xe(t,e){var n=e[0],i=e[2],r=e[4],a=e[1],o=e[3],s=e[5],l=n*o-a*i;return l?(l=1/l,t[0]=o*l,t[1]=-a*l,t[2]=-i*l,t[3]=n*l,t[4]=(i*s-o*r)*l,t[5]=(a*r-n*s)*l,t):null;}function we(t){var e=de();return ge(e,t),e;}function be(t){return t>_f||-_f>t;}function Me(t){this._target=t.target,this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null==t.loop?!1:t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart,this._pausedTime=0,this._paused=!1;}function Se(t){return t=Math.round(t),0>t?0:t>255?255:t;}function Ce(t){return t=Math.round(t),0>t?0:t>360?360:t;}function Ie(t){return 0>t?0:t>1?1:t;}function De(t){return Se(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100*255:parseInt(t,10));}function Te(t){return Ie(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100:parseFloat(t));}function ke(t,e,n){return 0>n?n+=1:n>1&&(n-=1),1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t;}function Ae(t,e,n){return t+(e-t)*n;}function Le(t,e,n,i,r){return t[0]=e,t[1]=n,t[2]=i,t[3]=r,t;}function Pe(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;}function Oe(t,e){Lf&&Pe(Lf,e),Lf=Af.put(t,Lf||e.slice());}function Ee(t,e){if(t){e=e||[];var n=Af.get(t);if(n)return Pe(e,n);t+="";var i=t.replace(/ /g,"").toLowerCase();if(i in kf)return Pe(e,kf[i]),Oe(t,e),e;if("#"!==i.charAt(0)){var r=i.indexOf("("),a=i.indexOf(")");if(-1!==r&&a+1===i.length){var o=i.substr(0,r),s=i.substr(r+1,a-(r+1)).split(","),l=1;switch(o){case"rgba":if(4!==s.length)return void Le(e,0,0,0,1);l=Te(s.pop());case"rgb":return 3!==s.length?void Le(e,0,0,0,1):(Le(e,De(s[0]),De(s[1]),De(s[2]),l),Oe(t,e),e);case"hsla":return 4!==s.length?void Le(e,0,0,0,1):(s[3]=Te(s[3]),Re(s,e),Oe(t,e),e);case"hsl":return 3!==s.length?void Le(e,0,0,0,1):(Re(s,e),Oe(t,e),e);default:return;}}Le(e,0,0,0,1);}else{if(4===i.length){var u=parseInt(i.substr(1),16);return u>=0&&4095>=u?(Le(e,(3840&u)>>4|(3840&u)>>8,240&u|(240&u)>>4,15&u|(15&u)<<4,1),Oe(t,e),e):void Le(e,0,0,0,1);}if(7===i.length){var u=parseInt(i.substr(1),16);return u>=0&&16777215>=u?(Le(e,(16711680&u)>>16,(65280&u)>>8,255&u,1),Oe(t,e),e):void Le(e,0,0,0,1);}}}}function Re(t,e){var n=(parseFloat(t[0])%360+360)%360/360,i=Te(t[1]),r=Te(t[2]),a=.5>=r?r*(i+1):r+i-r*i,o=2*r-a;return e=e||[],Le(e,Se(255*ke(o,a,n+1/3)),Se(255*ke(o,a,n)),Se(255*ke(o,a,n-1/3)),1),4===t.length&&(e[3]=t[3]),e;}function ze(t){if(t){var e,n,i=t[0]/255,r=t[1]/255,a=t[2]/255,o=Math.min(i,r,a),s=Math.max(i,r,a),l=s-o,u=(s+o)/2;if(0===l)e=0,n=0;else{n=.5>u?l/(s+o):l/(2-s-o);var h=((s-i)/6+l/2)/l,c=((s-r)/6+l/2)/l,f=((s-a)/6+l/2)/l;i===s?e=f-c:r===s?e=1/3+h-f:a===s&&(e=2/3+c-h),0>e&&(e+=1),e>1&&(e-=1);}var d=[360*e,n,u];return null!=t[3]&&d.push(t[3]),d;}}function Be(t,e){var n=Ee(t);if(n){for(var i=0;3>i;i++){n[i]=0>e?n[i]*(1-e)|0:(255-n[i])*e+n[i]|0,n[i]>255?n[i]=255:t[i]<0&&(n[i]=0);}return Ge(n,4===n.length?"rgba":"rgb");}}function Ne(t){var e=Ee(t);return e?((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1):void 0;}function Fe(t,e,n){if(e&&e.length&&t>=0&&1>=t){n=n||[];var i=t*(e.length-1),r=Math.floor(i),a=Math.ceil(i),o=e[r],s=e[a],l=i-r;return n[0]=Se(Ae(o[0],s[0],l)),n[1]=Se(Ae(o[1],s[1],l)),n[2]=Se(Ae(o[2],s[2],l)),n[3]=Ie(Ae(o[3],s[3],l)),n;}}function Ve(t,e,n){if(e&&e.length&&t>=0&&1>=t){var i=t*(e.length-1),r=Math.floor(i),a=Math.ceil(i),o=Ee(e[r]),s=Ee(e[a]),l=i-r,u=Ge([Se(Ae(o[0],s[0],l)),Se(Ae(o[1],s[1],l)),Se(Ae(o[2],s[2],l)),Ie(Ae(o[3],s[3],l))],"rgba");return n?{color:u,leftIndex:r,rightIndex:a,value:i}:u;}}function He(t,e,n,i){return t=Ee(t),t?(t=ze(t),null!=e&&(t[0]=Ce(e)),null!=n&&(t[1]=Te(n)),null!=i&&(t[2]=Te(i)),Ge(Re(t),"rgba")):void 0;}function We(t,e){return t=Ee(t),t&&null!=e?(t[3]=Ie(e),Ge(t,"rgba")):void 0;}function Ge(t,e){if(t&&t.length){var n=t[0]+","+t[1]+","+t[2];return("rgba"===e||"hsva"===e||"hsla"===e)&&(n+=","+t[3]),e+"("+n+")";}}function je(t,e){return t[e];}function qe(t,e,n){t[e]=n;}function Ue(t,e,n){return(e-t)*n+t;}function Xe(t,e,n){return n>.5?e:t;}function Ye(t,e,n,i,r){var a=t.length;if(1==r)for(var o=0;a>o;o++){i[o]=Ue(t[o],e[o],n);}else for(var s=a&&t[0].length,o=0;a>o;o++){for(var l=0;s>l;l++){i[o][l]=Ue(t[o][l],e[o][l],n);}}}function Ze(t,e,n){var i=t.length,r=e.length;if(i!==r){var a=i>r;if(a)t.length=r;else for(var o=i;r>o;o++){t.push(1===n?e[o]:Rf.call(e[o]));}}for(var s=t[0]&&t[0].length,o=0;o<t.length;o++){if(1===n)isNaN(t[o])&&(t[o]=e[o]);else for(var l=0;s>l;l++){isNaN(t[o][l])&&(t[o][l]=e[o][l]);}}}function $e(t,e,n){if(t===e)return!0;var i=t.length;if(i!==e.length)return!1;if(1===n){for(var r=0;i>r;r++){if(t[r]!==e[r])return!1;}}else for(var a=t[0].length,r=0;i>r;r++){for(var o=0;a>o;o++){if(t[r][o]!==e[r][o])return!1;}}return!0;}function Ke(t,e,n,i,r,a,o,s,l){var u=t.length;if(1==l)for(var h=0;u>h;h++){s[h]=Qe(t[h],e[h],n[h],i[h],r,a,o);}else for(var c=t[0].length,h=0;u>h;h++){for(var f=0;c>f;f++){s[h][f]=Qe(t[h][f],e[h][f],n[h][f],i[h][f],r,a,o);}}}function Qe(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e;}function Je(t){if(f(t)){var e=t.length;if(f(t[0])){for(var n=[],i=0;e>i;i++){n.push(Rf.call(t[i]));}return n;}return Rf.call(t);}return t;}function tn(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")";}function en(t){var e=t[t.length-1].value;return f(e&&e[0])?2:1;}function nn(t,e,n,i,r,a){var o=t._getter,s=t._setter,l="spline"===e,u=i.length;if(u){var h,c=i[0].value,d=f(c),p=!1,g=!1,v=d?en(i):0;i.sort(function(t,e){return t.time-e.time;}),h=i[u-1].time;for(var m=[],y=[],_=i[0].value,x=!0,w=0;u>w;w++){m.push(i[w].time/h);var b=i[w].value;if(d&&$e(b,_,v)||!d&&b===_||(x=!1),_=b,"string"==typeof b){var M=Ee(b);M?(b=M,p=!0):g=!0;}y.push(b);}if(a||!x){for(var S=y[u-1],w=0;u-1>w;w++){d?Ze(y[w],S,v):!isNaN(y[w])||isNaN(S)||g||p||(y[w]=S);}d&&Ze(o(t._target,r),S,v);var C,I,D,T,k,A,L=0,P=0;if(p)var O=[0,0,0,0];var E=function E(t,e){var n;if(0>e)n=0;else if(P>e){for(C=Math.min(L+1,u-1),n=C;n>=0&&!(m[n]<=e);n--){}n=Math.min(n,u-2);}else{for(n=L;u>n&&!(m[n]>e);n++){}n=Math.min(n-1,u-2);}L=n,P=e;var i=m[n+1]-m[n];if(0!==i)if(I=(e-m[n])/i,l){if(T=y[n],D=y[0===n?n:n-1],k=y[n>u-2?u-1:n+1],A=y[n>u-3?u-1:n+2],d)Ke(D,T,k,A,I,I*I,I*I*I,o(t,r),v);else{var a;if(p)a=Ke(D,T,k,A,I,I*I,I*I*I,O,1),a=tn(O);else{if(g)return Xe(T,k,I);a=Qe(D,T,k,A,I,I*I,I*I*I);}s(t,r,a);}}else if(d)Ye(y[n],y[n+1],I,o(t,r),v);else{var a;if(p)Ye(y[n],y[n+1],I,O,1),a=tn(O);else{if(g)return Xe(y[n],y[n+1],I);a=Ue(y[n],y[n+1],I);}s(t,r,a);}},R=new Me({target:t._target,life:h,loop:t._loop,delay:t._delay,onframe:E,ondestroy:n});return e&&"spline"!==e&&(R.easing=e),R;}}}function rn(t,e,n,i){0>n&&(t+=n,n=-n),0>i&&(e+=i,i=-i),this.x=t,this.y=e,this.width=n,this.height=i;}function an(t){for(var e=0;t>=Yf;){e|=1&t,t>>=1;}return t+e;}function on(t,e,n,i){var r=e+1;if(r===n)return 1;if(i(t[r++],t[e])<0){for(;n>r&&i(t[r],t[r-1])<0;){r++;}sn(t,e,r);}else for(;n>r&&i(t[r],t[r-1])>=0;){r++;}return r-e;}function sn(t,e,n){for(n--;n>e;){var i=t[e];t[e++]=t[n],t[n--]=i;}}function ln(t,e,n,i,r){for(i===e&&i++;n>i;i++){for(var a,o=t[i],s=e,l=i;l>s;){a=s+l>>>1,r(o,t[a])<0?l=a:s=a+1;}var u=i-s;switch(u){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;u>0;){t[s+u]=t[s+u-1],u--;}}t[s]=o;}}function un(t,e,n,i,r,a){var o=0,s=0,l=1;if(a(t,e[n+r])>0){for(s=i-r;s>l&&a(t,e[n+r+l])>0;){o=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),o+=r,l+=r;}else{for(s=r+1;s>l&&a(t,e[n+r-l])<=0;){o=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var u=o;o=r-l,l=r-u;}for(o++;l>o;){var h=o+(l-o>>>1);a(t,e[n+h])>0?o=h+1:l=h;}return l;}function hn(t,e,n,i,r,a){var o=0,s=0,l=1;if(a(t,e[n+r])<0){for(s=r+1;s>l&&a(t,e[n+r-l])<0;){o=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var u=o;o=r-l,l=r-u;}else{for(s=i-r;s>l&&a(t,e[n+r+l])>=0;){o=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),o+=r,l+=r;}for(o++;l>o;){var h=o+(l-o>>>1);a(t,e[n+h])<0?l=h:o=h+1;}return l;}function cn(t,e){function n(t,e){l[c]=t,u[c]=e,c+=1;}function i(){for(;c>1;){var t=c-2;if(t>=1&&u[t-1]<=u[t]+u[t+1]||t>=2&&u[t-2]<=u[t]+u[t-1])u[t-1]<u[t+1]&&t--;else if(u[t]>u[t+1])break;a(t);}}function r(){for(;c>1;){var t=c-2;t>0&&u[t-1]<u[t+1]&&t--,a(t);}}function a(n){var i=l[n],r=u[n],a=l[n+1],h=u[n+1];u[n]=r+h,n===c-3&&(l[n+1]=l[n+2],u[n+1]=u[n+2]),c--;var f=hn(t[a],t,i,r,0,e);i+=f,r-=f,0!==r&&(h=un(t[i+r-1],t,a,h,h-1,e),0!==h&&(h>=r?o(i,r,a,h):s(i,r,a,h)));}function o(n,i,r,a){var o=0;for(o=0;i>o;o++){f[o]=t[n+o];}var s=0,l=r,u=n;if(t[u++]=t[l++],0!==--a){if(1===i){for(o=0;a>o;o++){t[u+o]=t[l+o];}return void(t[u+a]=f[s]);}for(var c,d,p,g=h;;){c=0,d=0,p=!1;do{if(e(t[l],f[s])<0){if(t[u++]=t[l++],d++,c=0,0===--a){p=!0;break;}}else if(t[u++]=f[s++],c++,d=0,1===--i){p=!0;break;}}while(g>(c|d));if(p)break;do{if(c=hn(t[l],f,s,i,0,e),0!==c){for(o=0;c>o;o++){t[u+o]=f[s+o];}if(u+=c,s+=c,i-=c,1>=i){p=!0;break;}}if(t[u++]=t[l++],0===--a){p=!0;break;}if(d=un(f[s],t,l,a,0,e),0!==d){for(o=0;d>o;o++){t[u+o]=t[l+o];}if(u+=d,l+=d,a-=d,0===a){p=!0;break;}}if(t[u++]=f[s++],1===--i){p=!0;break;}g--;}while(c>=Zf||d>=Zf);if(p)break;0>g&&(g=0),g+=2;}if(h=g,1>h&&(h=1),1===i){for(o=0;a>o;o++){t[u+o]=t[l+o];}t[u+a]=f[s];}else{if(0===i)throw new Error();for(o=0;i>o;o++){t[u+o]=f[s+o];}}}else for(o=0;i>o;o++){t[u+o]=f[s+o];}}function s(n,i,r,a){var o=0;for(o=0;a>o;o++){f[o]=t[r+o];}var s=n+i-1,l=a-1,u=r+a-1,c=0,d=0;if(t[u--]=t[s--],0!==--i){if(1===a){for(u-=i,s-=i,d=u+1,c=s+1,o=i-1;o>=0;o--){t[d+o]=t[c+o];}return void(t[u]=f[l]);}for(var p=h;;){var g=0,v=0,m=!1;do{if(e(f[l],t[s])<0){if(t[u--]=t[s--],g++,v=0,0===--i){m=!0;break;}}else if(t[u--]=f[l--],v++,g=0,1===--a){m=!0;break;}}while(p>(g|v));if(m)break;do{if(g=i-hn(f[l],t,n,i,i-1,e),0!==g){for(u-=g,s-=g,i-=g,d=u+1,c=s+1,o=g-1;o>=0;o--){t[d+o]=t[c+o];}if(0===i){m=!0;break;}}if(t[u--]=f[l--],1===--a){m=!0;break;}if(v=a-un(t[s],f,0,a,a-1,e),0!==v){for(u-=v,l-=v,a-=v,d=u+1,c=l+1,o=0;v>o;o++){t[d+o]=f[c+o];}if(1>=a){m=!0;break;}}if(t[u--]=t[s--],0===--i){m=!0;break;}p--;}while(g>=Zf||v>=Zf);if(m)break;0>p&&(p=0),p+=2;}if(h=p,1>h&&(h=1),1===a){for(u-=i,s-=i,d=u+1,c=s+1,o=i-1;o>=0;o--){t[d+o]=t[c+o];}t[u]=f[l];}else{if(0===a)throw new Error();for(c=u-(a-1),o=0;a>o;o++){t[c+o]=f[o];}}}else for(c=u-(a-1),o=0;a>o;o++){t[c+o]=f[o];}}var l,u,h=Zf,c=0,f=[];l=[],u=[],this.mergeRuns=i,this.forceMergeRuns=r,this.pushRun=n;}function fn(t,e,n,i){n||(n=0),i||(i=t.length);var r=i-n;if(!(2>r)){var a=0;if(Yf>r)return a=on(t,n,i,e),void ln(t,n,i,n+a,e);var o=new cn(t,e),s=an(r);do{if(a=on(t,n,i,e),s>a){var l=r;l>s&&(l=s),ln(t,n,n+l,n+a,e),a=l;}o.pushRun(n,a),o.mergeRuns(),r-=a,n+=a;}while(0!==r);o.forceMergeRuns();}}function dn(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel;}function pn(t,e,n){var i=null==e.x?0:e.x,r=null==e.x2?1:e.x2,a=null==e.y?0:e.y,o=null==e.y2?0:e.y2;e.global||(i=i*n.width+n.x,r=r*n.width+n.x,a=a*n.height+n.y,o=o*n.height+n.y),i=isNaN(i)?0:i,r=isNaN(r)?1:r,a=isNaN(a)?0:a,o=isNaN(o)?0:o;var s=t.createLinearGradient(i,a,r,o);return s;}function gn(t,e,n){var i=n.width,r=n.height,a=Math.min(i,r),o=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;e.global||(o=o*i+n.x,s=s*r+n.y,l*=a);var u=t.createRadialGradient(o,s,0,o,s,l);return u;}function vn(){return!1;}function mn(t,e,n){var i=tf(),r=e.getWidth(),a=e.getHeight(),o=i.style;return o&&(o.position="absolute",o.left=0,o.top=0,o.width=r+"px",o.height=a+"px",i.setAttribute("data-zr-dom-id",t)),i.width=r*n,i.height=a*n,i;}function yn(t){if("string"==typeof t){var e=sd.get(t);return e&&e.image;}return t;}function _n(t,e,n,i,r){if(t){if("string"==typeof t){if(e&&e.__zrImageSrc===t||!n)return e;var a=sd.get(t),o={hostEl:n,cb:i,cbPayload:r};return a?(e=a.image,!wn(e)&&a.pending.push(o)):(!e&&(e=new Image()),e.onload=xn,sd.put(t,e.__cachedImgObj={image:e,pending:[o]}),e.src=e.__zrImageSrc=t),e;}return t;}return e;}function xn(){var t=this.__cachedImgObj;this.onload=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var n=t.pending[e],i=n.cb;i&&i(this,n.cbPayload),n.hostEl.dirty();}t.pending.length=0;}function wn(t){return t&&t.width&&t.height;}function bn(t,e){e=e||fd;var n=t+":"+e;if(ld[n])return ld[n];for(var i=(t+"").split("\n"),r=0,a=0,o=i.length;o>a;a++){r=Math.max(En(i[a],e).width,r);}return ud>hd&&(ud=0,ld={}),ud++,ld[n]=r,r;}function Mn(t,e,n,i,r,a,o){return a?Cn(t,e,n,i,r,a,o):Sn(t,e,n,i,r,o);}function Sn(t,e,n,i,r,a){var o=Rn(t,e,r,a),s=bn(t,e);r&&(s+=r[1]+r[3]);var l=o.outerHeight,u=In(0,s,n),h=Dn(0,l,i),c=new rn(u,h,s,l);return c.lineHeight=o.lineHeight,c;}function Cn(t,e,n,i,r,a,o){var s=zn(t,{rich:a,truncate:o,font:e,textAlign:n,textPadding:r}),l=s.outerWidth,u=s.outerHeight,h=In(0,l,n),c=Dn(0,u,i);return new rn(h,c,l,u);}function In(t,e,n){return"right"===n?t-=e:"center"===n&&(t-=e/2),t;}function Dn(t,e,n){return"middle"===n?t-=e/2:"bottom"===n&&(t-=e),t;}function Tn(t,e,n){var i=e.x,r=e.y,a=e.height,o=e.width,s=a/2,l="left",u="top";switch(t){case"left":i-=n,r+=s,l="right",u="middle";break;case"right":i+=n+o,r+=s,u="middle";break;case"top":i+=o/2,r-=n,l="center",u="bottom";break;case"bottom":i+=o/2,r+=a+n,l="center";break;case"inside":i+=o/2,r+=s,l="center",u="middle";break;case"insideLeft":i+=n,r+=s,u="middle";break;case"insideRight":i+=o-n,r+=s,l="right",u="middle";break;case"insideTop":i+=o/2,r+=n,l="center";break;case"insideBottom":i+=o/2,r+=a-n,l="center",u="bottom";break;case"insideTopLeft":i+=n,r+=n;break;case"insideTopRight":i+=o-n,r+=n,l="right";break;case"insideBottomLeft":i+=n,r+=a-n,u="bottom";break;case"insideBottomRight":i+=o-n,r+=a-n,l="right",u="bottom";}return{x:i,y:r,textAlign:l,textVerticalAlign:u};}function kn(t,e,n,i,r){if(!e)return"";var a=(t+"").split("\n");r=An(e,n,i,r);for(var o=0,s=a.length;s>o;o++){a[o]=Ln(a[o],r);}return a.join("\n");}function An(t,e,n,i){i=o({},i),i.font=e;var n=k(n,"...");i.maxIterations=k(i.maxIterations,2);var r=i.minChar=k(i.minChar,0);i.cnCharWidth=bn("国",e);var a=i.ascCharWidth=bn("a",e);i.placeholder=k(i.placeholder,"");for(var s=t=Math.max(0,t-1),l=0;r>l&&s>=a;l++){s-=a;}var u=bn(n);return u>s&&(n="",u=0),s=t-u,i.ellipsis=n,i.ellipsisWidth=u,i.contentWidth=s,i.containerWidth=t,i;}function Ln(t,e){var n=e.containerWidth,i=e.font,r=e.contentWidth;if(!n)return"";var a=bn(t,i);if(n>=a)return t;for(var o=0;;o++){if(r>=a||o>=e.maxIterations){t+=e.ellipsis;break;}var s=0===o?Pn(t,r,e.ascCharWidth,e.cnCharWidth):a>0?Math.floor(t.length*r/a):0;t=t.substr(0,s),a=bn(t,i);}return""===t&&(t=e.placeholder),t;}function Pn(t,e,n,i){for(var r=0,a=0,o=t.length;o>a&&e>r;a++){var s=t.charCodeAt(a);r+=s>=0&&127>=s?n:i;}return a;}function On(t){return bn("国",t);}function En(t,e){return dd.measureText(t,e);}function Rn(t,e,n,i){null!=t&&(t+="");var r=On(e),a=t?t.split("\n"):[],o=a.length*r,s=o;if(n&&(s+=n[0]+n[2]),t&&i){var l=i.outerHeight,u=i.outerWidth;if(null!=l&&s>l)t="",a=[];else if(null!=u)for(var h=An(u-(n?n[1]+n[3]:0),e,i.ellipsis,{minChar:i.minChar,placeholder:i.placeholder}),c=0,f=a.length;f>c;c++){a[c]=Ln(a[c],h);}}return{lines:a,height:o,outerHeight:s,lineHeight:r};}function zn(t,e){var n={lines:[],width:0,height:0};if(null!=t&&(t+=""),!t)return n;for(var i,r=cd.lastIndex=0;null!=(i=cd.exec(t));){var a=i.index;a>r&&Bn(n,t.substring(r,a)),Bn(n,i[2],i[1]),r=cd.lastIndex;}r<t.length&&Bn(n,t.substring(r,t.length));var o=n.lines,s=0,l=0,u=[],h=e.textPadding,c=e.truncate,f=c&&c.outerWidth,d=c&&c.outerHeight;h&&(null!=f&&(f-=h[1]+h[3]),null!=d&&(d-=h[0]+h[2]));for(var p=0;p<o.length;p++){for(var g=o[p],v=0,m=0,y=0;y<g.tokens.length;y++){var _=g.tokens[y],x=_.styleName&&e.rich[_.styleName]||{},w=_.textPadding=x.textPadding,b=_.font=x.font||e.font,M=_.textHeight=k(x.textHeight,On(b));if(w&&(M+=w[0]+w[2]),_.height=M,_.lineHeight=A(x.textLineHeight,e.textLineHeight,M),_.textAlign=x&&x.textAlign||e.textAlign,_.textVerticalAlign=x&&x.textVerticalAlign||"middle",null!=d&&s+_.lineHeight>d)return{lines:[],width:0,height:0};_.textWidth=bn(_.text,b);var S=x.textWidth,C=null==S||"auto"===S;if("string"==typeof S&&"%"===S.charAt(S.length-1))_.percentWidth=S,u.push(_),S=0;else{if(C){S=_.textWidth;var I=x.textBackgroundColor,D=I&&I.image;D&&(D=yn(D),wn(D)&&(S=Math.max(S,D.width*M/D.height)));}var T=w?w[1]+w[3]:0;S+=T;var L=null!=f?f-m:null;null!=L&&S>L&&(!C||T>L?(_.text="",_.textWidth=S=0):(_.text=kn(_.text,L-T,b,c.ellipsis,{minChar:c.minChar}),_.textWidth=bn(_.text,b),S=_.textWidth+T));}m+=_.width=S,x&&(v=Math.max(v,_.lineHeight));}g.width=m,g.lineHeight=v,s+=v,l=Math.max(l,m);}n.outerWidth=n.width=k(e.textWidth,l),n.outerHeight=n.height=k(e.textHeight,s),h&&(n.outerWidth+=h[1]+h[3],n.outerHeight+=h[0]+h[2]);for(var p=0;p<u.length;p++){var _=u[p],P=_.percentWidth;_.width=parseInt(P,10)/100*l;}return n;}function Bn(t,e,n){for(var i=""===e,r=e.split("\n"),a=t.lines,o=0;o<r.length;o++){var s=r[o],l={styleName:n,text:s,isLineHolder:!s&&!i};if(o)a.push({tokens:[l]});else{var u=(a[a.length-1]||(a[0]={tokens:[]})).tokens,h=u.length;1===h&&u[0].isLineHolder?u[0]=l:(s||!h||i)&&u.push(l);}}}function Nn(t){var e=(t.fontSize||t.fontFamily)&&[t.fontStyle,t.fontWeight,(t.fontSize||12)+"px",t.fontFamily||"sans-serif"].join(" ");return e&&E(e)||t.textFont||t.font;}function Fn(t,e){var n,i,r,a,o=e.x,s=e.y,l=e.width,u=e.height,h=e.r;0>l&&(o+=l,l=-l),0>u&&(s+=u,u=-u),"number"==typeof h?n=i=r=a=h:h instanceof Array?1===h.length?n=i=r=a=h[0]:2===h.length?(n=r=h[0],i=a=h[1]):3===h.length?(n=h[0],i=a=h[1],r=h[2]):(n=h[0],i=h[1],r=h[2],a=h[3]):n=i=r=a=0;var c;n+i>l&&(c=n+i,n*=l/c,i*=l/c),r+a>l&&(c=r+a,r*=l/c,a*=l/c),i+r>u&&(c=i+r,i*=u/c,r*=u/c),n+a>u&&(c=n+a,n*=u/c,a*=u/c),t.moveTo(o+n,s),t.lineTo(o+l-i,s),0!==i&&t.arc(o+l-i,s+i,i,-Math.PI/2,0),t.lineTo(o+l,s+u-r),0!==r&&t.arc(o+l-r,s+u-r,r,0,Math.PI/2),t.lineTo(o+a,s+u),0!==a&&t.arc(o+a,s+u-a,a,Math.PI/2,Math.PI),t.lineTo(o,s+n),0!==n&&t.arc(o+n,s+n,n,Math.PI,1.5*Math.PI);}function Vn(t){return Hn(t),d(t.rich,Hn),t;}function Hn(t){if(t){t.font=Nn(t);var e=t.textAlign;"middle"===e&&(e="center"),t.textAlign=null==e||pd[e]?e:"left";var n=t.textVerticalAlign||t.textBaseline;"center"===n&&(n="middle"),t.textVerticalAlign=null==n||gd[n]?n:"top";var i=t.textPadding;i&&(t.textPadding=P(t.textPadding));}}function Wn(t,e,n,i,r){i.rich?jn(t,e,n,i,r):Gn(t,e,n,i,r);}function Gn(t,e,n,i,r){var a=Qn(e,"font",i.font||fd),o=i.textPadding,s=t.__textCotentBlock;(!s||t.__dirty)&&(s=t.__textCotentBlock=Rn(n,a,o,i.truncate));var l=s.outerHeight,u=s.lines,h=s.lineHeight,c=Kn(l,i,r),f=c.baseX,d=c.baseY,p=c.textAlign,g=c.textVerticalAlign;Un(e,i,r,f,d);var v=Dn(d,l,g),m=f,y=v,_=Yn(i);if(_||o){var x=bn(n,a),w=x;o&&(w+=o[1]+o[3]);var b=In(f,w,p);_&&Zn(t,e,i,b,v,w,l),o&&(m=ni(f,p,o),y+=o[0]);}Qn(e,"textAlign",p||"left"),Qn(e,"textBaseline","middle"),Qn(e,"shadowBlur",i.textShadowBlur||0),Qn(e,"shadowColor",i.textShadowColor||"transparent"),Qn(e,"shadowOffsetX",i.textShadowOffsetX||0),Qn(e,"shadowOffsetY",i.textShadowOffsetY||0),y+=h/2;var M=i.textStrokeWidth,S=Jn(i.textStroke,M),C=ti(i.textFill);S&&(Qn(e,"lineWidth",M),Qn(e,"strokeStyle",S)),C&&Qn(e,"fillStyle",C);for(var I=0;I<u.length;I++){S&&e.strokeText(u[I],m,y),C&&e.fillText(u[I],m,y),y+=h;}}function jn(t,e,n,i,r){var a=t.__textCotentBlock;(!a||t.__dirty)&&(a=t.__textCotentBlock=zn(n,i)),qn(t,e,a,i,r);}function qn(t,e,n,i,r){var a=n.width,o=n.outerWidth,s=n.outerHeight,l=i.textPadding,u=Kn(s,i,r),h=u.baseX,c=u.baseY,f=u.textAlign,d=u.textVerticalAlign;Un(e,i,r,h,c);var p=In(h,o,f),g=Dn(c,s,d),v=p,m=g;l&&(v+=l[3],m+=l[0]);var y=v+a;Yn(i)&&Zn(t,e,i,p,g,o,s);for(var _=0;_<n.lines.length;_++){for(var x,w=n.lines[_],b=w.tokens,M=b.length,S=w.lineHeight,C=w.width,I=0,D=v,T=y,k=M-1;M>I&&(x=b[I],!x.textAlign||"left"===x.textAlign);){Xn(t,e,x,i,S,m,D,"left"),C-=x.width,D+=x.width,I++;}for(;k>=0&&(x=b[k],"right"===x.textAlign);){Xn(t,e,x,i,S,m,T,"right"),C-=x.width,T-=x.width,k--;}for(D+=(a-(D-v)-(y-T)-C)/2;k>=I;){x=b[I],Xn(t,e,x,i,S,m,D+x.width/2,"center"),D+=x.width,I++;}m+=S;}}function Un(t,e,n,i,r){if(n&&e.textRotation){var a=e.textOrigin;"center"===a?(i=n.width/2+n.x,r=n.height/2+n.y):a&&(i=a[0]+n.x,r=a[1]+n.y),t.translate(i,r),t.rotate(-e.textRotation),t.translate(-i,-r);}}function Xn(t,e,n,i,r,a,o,s){var l=i.rich[n.styleName]||{},u=n.textVerticalAlign,h=a+r/2;"top"===u?h=a+n.height/2:"bottom"===u&&(h=a+r-n.height/2),!n.isLineHolder&&Yn(l)&&Zn(t,e,l,"right"===s?o-n.width:"center"===s?o-n.width/2:o,h-n.height/2,n.width,n.height);var c=n.textPadding;c&&(o=ni(o,s,c),h-=n.height/2-c[2]-n.textHeight/2),Qn(e,"shadowBlur",A(l.textShadowBlur,i.textShadowBlur,0)),Qn(e,"shadowColor",l.textShadowColor||i.textShadowColor||"transparent"),Qn(e,"shadowOffsetX",A(l.textShadowOffsetX,i.textShadowOffsetX,0)),Qn(e,"shadowOffsetY",A(l.textShadowOffsetY,i.textShadowOffsetY,0)),Qn(e,"textAlign",s),Qn(e,"textBaseline","middle"),Qn(e,"font",n.font||fd);var f=Jn(l.textStroke||i.textStroke,p),d=ti(l.textFill||i.textFill),p=k(l.textStrokeWidth,i.textStrokeWidth);f&&(Qn(e,"lineWidth",p),Qn(e,"strokeStyle",f),e.strokeText(n.text,o,h)),d&&(Qn(e,"fillStyle",d),e.fillText(n.text,o,h));}function Yn(t){return t.textBackgroundColor||t.textBorderWidth&&t.textBorderColor;}function Zn(t,e,n,i,r,a,o){var s=n.textBackgroundColor,l=n.textBorderWidth,u=n.textBorderColor,h=b(s);if(Qn(e,"shadowBlur",n.textBoxShadowBlur||0),Qn(e,"shadowColor",n.textBoxShadowColor||"transparent"),Qn(e,"shadowOffsetX",n.textBoxShadowOffsetX||0),Qn(e,"shadowOffsetY",n.textBoxShadowOffsetY||0),h||l&&u){e.beginPath();var c=n.textBorderRadius;c?Fn(e,{x:i,y:r,width:a,height:o,r:c}):e.rect(i,r,a,o),e.closePath();}if(h)Qn(e,"fillStyle",s),e.fill();else if(M(s)){var f=s.image;f=_n(f,null,t,$n,s),f&&wn(f)&&e.drawImage(f,i,r,a,o);}l&&u&&(Qn(e,"lineWidth",l),Qn(e,"strokeStyle",u),e.stroke());}function $n(t,e){e.image=t;}function Kn(t,e,n){var i=e.x||0,r=e.y||0,a=e.textAlign,o=e.textVerticalAlign;if(n){var s=e.textPosition;if(s instanceof Array)i=n.x+ei(s[0],n.width),r=n.y+ei(s[1],n.height);else{var l=Tn(s,n,e.textDistance);i=l.x,r=l.y,a=a||l.textAlign,o=o||l.textVerticalAlign;}var u=e.textOffset;u&&(i+=u[0],r+=u[1]);}return{baseX:i,baseY:r,textAlign:a,textVerticalAlign:o};}function Qn(t,e,n){return t[e]=Qf(t,e,n),t[e];}function Jn(t,e){return null==t||0>=e||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t;}function ti(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t;}function ei(t,e){return"string"==typeof t?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t;}function ni(t,e,n){return"right"===e?t-n[1]:"center"===e?t+n[3]/2-n[1]/2:t+n[3];}function ii(t,e){return null!=t&&(t||e.textBackgroundColor||e.textBorderWidth&&e.textBorderColor||e.textPadding);}function ri(t){t=t||{},Gf.call(this,t);for(var e in t){t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);}this.style=new td(t.style,this),this._rect=null,this.__clipPaths=[];}function ai(t){ri.call(this,t);}function oi(t){return parseInt(t,10);}function si(t){return t?t.__builtin__?!0:"function"!=typeof t.resize||"function"!=typeof t.refresh?!1:!0:!1;}function li(t,e,n){return bd.copy(t.getBoundingRect()),t.transform&&bd.applyTransform(t.transform),Md.width=e,Md.height=n,!bd.intersect(Md);}function ui(t,e){if(t==e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var n=0;n<t.length;n++){if(t[n]!==e[n])return!0;}}function hi(t,e){for(var n=0;n<t.length;n++){var i=t[n];i.setTransform(e),e.beginPath(),i.buildPath(e,i.shape),e.clip(),i.restoreTransform(e);}}function ci(t,e){var n=document.createElement("div");return n.style.cssText=["position:relative","overflow:hidden","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",n;}function fi(t){return t.getBoundingClientRect?t.getBoundingClientRect():{left:0,top:0};}function di(t,e,n,i){return n=n||{},i||!Gc.canvasSupported?pi(t,e,n):Gc.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(n.zrX=e.layerX,n.zrY=e.layerY):null!=e.offsetX?(n.zrX=e.offsetX,n.zrY=e.offsetY):pi(t,e,n),n;}function pi(t,e,n){var i=fi(t);n.zrX=e.clientX-i.left,n.zrY=e.clientY-i.top;}function gi(t,e,n){if(e=e||window.event,null!=e.zrX)return e;var i=e.type,r=i&&i.indexOf("touch")>=0;if(r){var a="touchend"!=i?e.targetTouches[0]:e.changedTouches[0];a&&di(t,a,e,n);}else di(t,e,e,n),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;var o=e.button;return null==e.which&&void 0!==o&&Id.test(e.type)&&(e.which=1&o?1:2&o?3:4&o?2:0),e;}function vi(t,e,n){Cd?t.addEventListener(e,n):t.attachEvent("on"+e,n);}function mi(t,e,n){Cd?t.removeEventListener(e,n):t.detachEvent("on"+e,n);}function yi(t){var e=t[1][0]-t[0][0],n=t[1][1]-t[0][1];return Math.sqrt(e*e+n*n);}function _i(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2];}function xi(t){return"mousewheel"===t&&Gc.browser.firefox?"DOMMouseScroll":t;}function wi(t,e,n){var i=t._gestureMgr;"start"===n&&i.clear();var r=i.recognize(e,t.handler.findHover(e.zrX,e.zrY,null).target,t.dom);if("end"===n&&i.clear(),r){var a=r.type;e.gestureEvent=a,t.handler.dispatchToElement({target:r.target},a,r.event);}}function bi(t){t._touching=!0,clearTimeout(t._touchTimer),t._touchTimer=setTimeout(function(){t._touching=!1;},700);}function Mi(t){var e=t.pointerType;return"pen"===e||"touch"===e;}function Si(t){function e(t,e){return function(){return e._touching?void 0:t.apply(e,arguments);};}d(Pd,function(e){t._handlers[e]=y(Rd[e],t);}),d(Ed,function(e){t._handlers[e]=y(Rd[e],t);}),d(Ld,function(n){t._handlers[n]=e(Rd[n],t);});}function Ci(t){function e(e,n){d(e,function(e){vi(t,xi(e),n._handlers[e]);},n);}ff.call(this),this.dom=t,this._touching=!1,this._touchTimer,this._gestureMgr=new Td(),this._handlers={},Si(this),Gc.pointerEventsSupported?e(Ed,this):(Gc.touchEventsSupported&&e(Pd,this),e(Ld,this));}function Ii(t,e){var n=new Hd(Hc(),t,e);return Fd[n.id]=n,n;}function Di(t){if(t)t.dispose();else{for(var e in Fd){Fd.hasOwnProperty(e)&&Fd[e].dispose();}Fd={};}return this;}function Ti(t){return Fd[t];}function ki(t,e){Nd[t]=e;}function Ai(t){delete Fd[t];}function Li(t){return t instanceof Array?t:null==t?[]:[t];}function Pi(t,e,n){if(t){t[e]=t[e]||{},t.emphasis=t.emphasis||{},t.emphasis[e]=t.emphasis[e]||{};for(var i=0,r=n.length;r>i;i++){var a=n[i];!t.emphasis[e].hasOwnProperty(a)&&t[e].hasOwnProperty(a)&&(t.emphasis[e][a]=t[e][a]);}}}function Oi(t){return!jd(t)||qd(t)||t instanceof Date?t:t.value;}function Ei(t){return jd(t)&&!(t instanceof Array);}function Ri(t,e){e=(e||[]).slice();var n=p(t||[],function(t){return{exist:t};});return Gd(e,function(t,i){if(jd(t)){for(var r=0;r<n.length;r++){if(!n[r].option&&null!=t.id&&n[r].exist.id===t.id+"")return n[r].option=t,void(e[i]=null);}for(var r=0;r<n.length;r++){var a=n[r].exist;if(!(n[r].option||null!=a.id&&null!=t.id||null==t.name||Ni(t)||Ni(a)||a.name!==t.name+""))return n[r].option=t,void(e[i]=null);}}}),Gd(e,function(t){if(jd(t)){for(var e=0;e<n.length;e++){var i=n[e].exist;if(!n[e].option&&!Ni(i)&&null==t.id){n[e].option=t;break;}}e>=n.length&&n.push({option:t});}}),n;}function zi(t){var e=N();Gd(t,function(t){var n=t.exist;n&&e.set(n.id,t);}),Gd(t,function(t){var n=t.option;O(!n||null==n.id||!e.get(n.id)||e.get(n.id)===t,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&e.set(n.id,t),!t.keyInfo&&(t.keyInfo={});}),Gd(t,function(t,n){var i=t.exist,r=t.option,a=t.keyInfo;if(jd(r)){if(a.name=null!=r.name?r.name+"":i?i.name:Ud+n,i)a.id=i.id;else if(null!=r.id)a.id=r.id+"";else{var o=0;do{a.id="\x00"+a.name+"\x00"+o++;}while(e.get(a.id));}e.set(a.id,t);}});}function Bi(t){var e=t.name;return!(!e||!e.indexOf(Ud));}function Ni(t){return jd(t)&&t.id&&0===(t.id+"").indexOf("\x00_ec_\x00");}function Fi(t,e){return null!=e.dataIndexInside?e.dataIndexInside:null!=e.dataIndex?x(e.dataIndex)?p(e.dataIndex,function(e){return t.indexOfRawIndex(e);}):t.indexOfRawIndex(e.dataIndex):null!=e.name?x(e.name)?p(e.name,function(e){return t.indexOfName(e);}):t.indexOfName(e.name):void 0;}function Vi(){var t="__\x00ec_inner_"+Yd++ +"_"+Math.random().toFixed(5);return function(e){return e[t]||(e[t]={});};}function Hi(t,e,n){if(b(e)){var i={};i[e+"Index"]=0,e=i;}var r=n&&n.defaultMainType;!r||Wi(e,r+"Index")||Wi(e,r+"Id")||Wi(e,r+"Name")||(e[r+"Index"]=0);var a={};return Gd(e,function(i,r){var i=e[r];if("dataIndex"===r||"dataIndexInside"===r)return void(a[r]=i);var o=r.match(/^(\w+)(Index|Id|Name)$/)||[],s=o[1],l=(o[2]||"").toLowerCase();if(!(!s||!l||null==i||"index"===l&&"none"===i||n&&n.includeMainTypes&&u(n.includeMainTypes,s)<0)){var h={mainType:s};("index"!==l||"all"!==i)&&(h[l]=i);var c=t.queryComponents(h);a[s+"Models"]=c,a[s+"Model"]=c[0];}}),a;}function Wi(t,e){return t&&t.hasOwnProperty(e);}function Gi(t,e,n){t.setAttribute?t.setAttribute(e,n):t[e]=n;}function ji(t,e){return t.getAttribute?t.getAttribute(e):t[e];}function qi(t){var e={main:"",sub:""};return t&&(t=t.split(Zd),e.main=t[0]||"",e.sub=t[1]||""),e;}function Ui(t){O(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal');}function Xi(t){t.$constructor=t,t.extend=function(t){var e=this,n=function n(){t.$constructor?t.$constructor.apply(this,arguments):e.apply(this,arguments);};return o(n.prototype,t),n.extend=this.extend,n.superCall=Zi,n.superApply=$i,h(n,this),n.superClass=e,n;};}function Yi(t){var e=["__\x00is_clz",Kd++,Math.random().toFixed(3)].join("_");t.prototype[e]=!0,t.isInstance=function(t){return!(!t||!t[e]);};}function Zi(t,e){var n=L(arguments,2);return this.superClass.prototype[e].apply(t,n);}function $i(t,e,n){return this.superClass.prototype[e].apply(t,n);}function Ki(t,e){function n(t){var e=i[t.main];return e&&e[$d]||(e=i[t.main]={},e[$d]=!0),e;}e=e||{};var i={};if(t.registerClass=function(t,e){if(e)if(Ui(e),e=qi(e),e.sub){if(e.sub!==$d){var r=n(e);r[e.sub]=t;}}else i[e.main]=t;return t;},t.getClass=function(t,e,n){var r=i[t];if(r&&r[$d]&&(r=e?r[e]:null),n&&!r)throw new Error(e?"Component "+t+"."+(e||"")+" not exists. Load it first.":t+".type should be specified.");return r;},t.getClassesByMainType=function(t){t=qi(t);var e=[],n=i[t.main];return n&&n[$d]?d(n,function(t,n){n!==$d&&e.push(t);}):e.push(n),e;},t.hasClass=function(t){return t=qi(t),!!i[t.main];},t.getAllClassMainTypes=function(){var t=[];return d(i,function(e,n){t.push(n);}),t;},t.hasSubTypes=function(t){t=qi(t);var e=i[t.main];return e&&e[$d];},t.parseClassType=qi,e.registerWhenExtend){var r=t.extend;r&&(t.extend=function(e){var n=r.call(this,e);return t.registerClass(n,e.type);});}return t;}function Qi(t){return t>-ap&&ap>t;}function Ji(t){return t>ap||-ap>t;}function tr(t,e,n,i,r){var a=1-r;return a*a*(a*t+3*r*e)+r*r*(r*i+3*a*n);}function er(t,e,n,i,r){var a=1-r;return 3*(((e-t)*a+2*(n-e)*r)*a+(i-n)*r*r);}function nr(t,e,n,i,r,a){var o=i+3*(e-n)-t,s=3*(n-2*e+t),l=3*(e-t),u=t-r,h=s*s-3*o*l,c=s*l-9*o*u,f=l*l-3*s*u,d=0;if(Qi(h)&&Qi(c)){if(Qi(s))a[0]=0;else{var p=-l/s;p>=0&&1>=p&&(a[d++]=p);}}else{var g=c*c-4*h*f;if(Qi(g)){var v=c/h,p=-s/o+v,m=-v/2;p>=0&&1>=p&&(a[d++]=p),m>=0&&1>=m&&(a[d++]=m);}else if(g>0){var y=rp(g),_=h*s+1.5*o*(-c+y),x=h*s+1.5*o*(-c-y);_=0>_?-ip(-_,lp):ip(_,lp),x=0>x?-ip(-x,lp):ip(x,lp);var p=(-s-(_+x))/(3*o);p>=0&&1>=p&&(a[d++]=p);}else{var w=(2*h*s-3*o*c)/(2*rp(h*h*h)),b=Math.acos(w)/3,M=rp(h),S=Math.cos(b),p=(-s-2*M*S)/(3*o),m=(-s+M*(S+sp*Math.sin(b)))/(3*o),C=(-s+M*(S-sp*Math.sin(b)))/(3*o);p>=0&&1>=p&&(a[d++]=p),m>=0&&1>=m&&(a[d++]=m),C>=0&&1>=C&&(a[d++]=C);}}return d;}function ir(t,e,n,i,r){var a=6*n-12*e+6*t,o=9*e+3*i-3*t-9*n,s=3*e-3*t,l=0;if(Qi(o)){if(Ji(a)){var u=-s/a;u>=0&&1>=u&&(r[l++]=u);}}else{var h=a*a-4*o*s;if(Qi(h))r[0]=-a/(2*o);else if(h>0){var c=rp(h),u=(-a+c)/(2*o),f=(-a-c)/(2*o);u>=0&&1>=u&&(r[l++]=u),f>=0&&1>=f&&(r[l++]=f);}}return l;}function rr(t,e,n,i,r,a){var o=(e-t)*r+t,s=(n-e)*r+e,l=(i-n)*r+n,u=(s-o)*r+o,h=(l-s)*r+s,c=(h-u)*r+u;a[0]=t,a[1]=o,a[2]=u,a[3]=c,a[4]=c,a[5]=h,a[6]=l,a[7]=i;}function ar(t,e,n,i,r,a,o,s,l,u,h){var c,f,d,p,g,v=.005,m=1/0;up[0]=l,up[1]=u;for(var y=0;1>y;y+=.05){hp[0]=tr(t,n,r,o,y),hp[1]=tr(e,i,a,s,y),p=uf(up,hp),m>p&&(c=y,m=p);}m=1/0;for(var _=0;32>_&&!(op>v);_++){f=c-v,d=c+v,hp[0]=tr(t,n,r,o,f),hp[1]=tr(e,i,a,s,f),p=uf(hp,up),f>=0&&m>p?(c=f,m=p):(cp[0]=tr(t,n,r,o,d),cp[1]=tr(e,i,a,s,d),g=uf(cp,up),1>=d&&m>g?(c=d,m=g):v*=.5);}return h&&(h[0]=tr(t,n,r,o,c),h[1]=tr(e,i,a,s,c)),rp(m);}function or(t,e,n,i){var r=1-i;return r*(r*t+2*i*e)+i*i*n;}function sr(t,e,n,i){return 2*((1-i)*(e-t)+i*(n-e));}function lr(t,e,n,i,r){var a=t-2*e+n,o=2*(e-t),s=t-i,l=0;if(Qi(a)){if(Ji(o)){var u=-s/o;u>=0&&1>=u&&(r[l++]=u);}}else{var h=o*o-4*a*s;if(Qi(h)){var u=-o/(2*a);u>=0&&1>=u&&(r[l++]=u);}else if(h>0){var c=rp(h),u=(-o+c)/(2*a),f=(-o-c)/(2*a);u>=0&&1>=u&&(r[l++]=u),f>=0&&1>=f&&(r[l++]=f);}}return l;}function ur(t,e,n){var i=t+n-2*e;return 0===i?.5:(t-e)/i;}function hr(t,e,n,i,r){var a=(e-t)*i+t,o=(n-e)*i+e,s=(o-a)*i+a;r[0]=t,r[1]=a,r[2]=s,r[3]=s,r[4]=o,r[5]=n;}function cr(t,e,n,i,r,a,o,s,l){var u,h=.005,c=1/0;up[0]=o,up[1]=s;for(var f=0;1>f;f+=.05){hp[0]=or(t,n,r,f),hp[1]=or(e,i,a,f);var d=uf(up,hp);c>d&&(u=f,c=d);}c=1/0;for(var p=0;32>p&&!(op>h);p++){var g=u-h,v=u+h;hp[0]=or(t,n,r,g),hp[1]=or(e,i,a,g);var d=uf(hp,up);if(g>=0&&c>d)u=g,c=d;else{cp[0]=or(t,n,r,v),cp[1]=or(e,i,a,v);var m=uf(cp,up);1>=v&&c>m?(u=v,c=m):h*=.5;}}return l&&(l[0]=or(t,n,r,u),l[1]=or(e,i,a,u)),rp(c);}function fr(t,e,n){if(0!==t.length){var i,r=t[0],a=r[0],o=r[0],s=r[1],l=r[1];for(i=1;i<t.length;i++){r=t[i],a=fp(a,r[0]),o=dp(o,r[0]),s=fp(s,r[1]),l=dp(l,r[1]);}e[0]=a,e[1]=s,n[0]=o,n[1]=l;}}function dr(t,e,n,i,r,a){r[0]=fp(t,n),r[1]=fp(e,i),a[0]=dp(t,n),a[1]=dp(e,i);}function pr(t,e,n,i,r,a,o,s,l,u){var h,c=ir,f=tr,d=c(t,n,r,o,xp);for(l[0]=1/0,l[1]=1/0,u[0]=-1/0,u[1]=-1/0,h=0;d>h;h++){var p=f(t,n,r,o,xp[h]);l[0]=fp(p,l[0]),u[0]=dp(p,u[0]);}for(d=c(e,i,a,s,wp),h=0;d>h;h++){var g=f(e,i,a,s,wp[h]);l[1]=fp(g,l[1]),u[1]=dp(g,u[1]);}l[0]=fp(t,l[0]),u[0]=dp(t,u[0]),l[0]=fp(o,l[0]),u[0]=dp(o,u[0]),l[1]=fp(e,l[1]),u[1]=dp(e,u[1]),l[1]=fp(s,l[1]),u[1]=dp(s,u[1]);}function gr(t,e,n,i,r,a,o,s){var l=ur,u=or,h=dp(fp(l(t,n,r),1),0),c=dp(fp(l(e,i,a),1),0),f=u(t,n,r,h),d=u(e,i,a,c);o[0]=fp(t,r,f),o[1]=fp(e,a,d),s[0]=dp(t,r,f),s[1]=dp(e,a,d);}function vr(t,e,n,i,r,a,o,s,l){var u=oe,h=se,c=Math.abs(r-a);if(1e-4>c%vp&&c>1e-4)return s[0]=t-n,s[1]=e-i,l[0]=t+n,void(l[1]=e+i);if(mp[0]=gp(r)*n+t,mp[1]=pp(r)*i+e,yp[0]=gp(a)*n+t,yp[1]=pp(a)*i+e,u(s,mp,yp),h(l,mp,yp),r%=vp,0>r&&(r+=vp),a%=vp,0>a&&(a+=vp),r>a&&!o?a+=vp:a>r&&o&&(r+=vp),o){var f=a;a=r,r=f;}for(var d=0;a>d;d+=Math.PI/2){d>r&&(_p[0]=gp(d)*n+t,_p[1]=pp(d)*i+e,u(s,_p,s),h(l,_p,l));}}function mr(t,e,n,i,r,a,o){if(0===r)return!1;var s=r,l=0,u=t;if(o>e+s&&o>i+s||e-s>o&&i-s>o||a>t+s&&a>n+s||t-s>a&&n-s>a)return!1;if(t===n)return Math.abs(a-t)<=s/2;l=(e-i)/(t-n),u=(t*i-n*e)/(t-n);var h=l*a-o+u,c=h*h/(l*l+1);return s/2*s/2>=c;}function yr(t,e,n,i,r,a,o,s,l,u,h){if(0===l)return!1;var c=l;if(h>e+c&&h>i+c&&h>a+c&&h>s+c||e-c>h&&i-c>h&&a-c>h&&s-c>h||u>t+c&&u>n+c&&u>r+c&&u>o+c||t-c>u&&n-c>u&&r-c>u&&o-c>u)return!1;var f=ar(t,e,n,i,r,a,o,s,u,h,null);return c/2>=f;}function _r(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var u=o;if(l>e+u&&l>i+u&&l>a+u||e-u>l&&i-u>l&&a-u>l||s>t+u&&s>n+u&&s>r+u||t-u>s&&n-u>s&&r-u>s)return!1;var h=cr(t,e,n,i,r,a,s,l,null);return u/2>=h;}function xr(t){return t%=Rp,0>t&&(t+=Rp),t;}function wr(t,e,n,i,r,a,o,s,l){if(0===o)return!1;var u=o;s-=t,l-=e;var h=Math.sqrt(s*s+l*l);if(h-u>n||n>h+u)return!1;if(Math.abs(i-r)%zp<1e-4)return!0;if(a){var c=i;i=xr(r),r=xr(c);}else i=xr(i),r=xr(r);i>r&&(r+=zp);var f=Math.atan2(l,s);return 0>f&&(f+=zp),f>=i&&r>=f||f+zp>=i&&r>=f+zp;}function br(t,e,n,i,r,a){if(a>e&&a>i||e>a&&i>a)return 0;if(i===e)return 0;var o=e>i?1:-1,s=(a-e)/(i-e);(1===s||0===s)&&(o=e>i?.5:-.5);var l=s*(n-t)+t;return l===r?1/0:l>r?o:0;}function Mr(t,e){return Math.abs(t-e)<Fp;}function Sr(){var t=Hp[0];Hp[0]=Hp[1],Hp[1]=t;}function Cr(t,e,n,i,r,a,o,s,l,u){if(u>e&&u>i&&u>a&&u>s||e>u&&i>u&&a>u&&s>u)return 0;var h=nr(e,i,a,s,u,Vp);if(0===h)return 0;for(var c,f,d=0,p=-1,g=0;h>g;g++){var v=Vp[g],m=0===v||1===v?.5:1,y=tr(t,n,r,o,v);l>y||(0>p&&(p=ir(e,i,a,s,Hp),Hp[1]<Hp[0]&&p>1&&Sr(),c=tr(e,i,a,s,Hp[0]),p>1&&(f=tr(e,i,a,s,Hp[1]))),d+=2==p?v<Hp[0]?e>c?m:-m:v<Hp[1]?c>f?m:-m:f>s?m:-m:v<Hp[0]?e>c?m:-m:c>s?m:-m);}return d;}function Ir(t,e,n,i,r,a,o,s){if(s>e&&s>i&&s>a||e>s&&i>s&&a>s)return 0;var l=lr(e,i,a,s,Vp);if(0===l)return 0;var u=ur(e,i,a);if(u>=0&&1>=u){for(var h=0,c=or(e,i,a,u),f=0;l>f;f++){var d=0===Vp[f]||1===Vp[f]?.5:1,p=or(t,n,r,Vp[f]);o>p||(h+=Vp[f]<u?e>c?d:-d:c>a?d:-d);}return h;}var d=0===Vp[0]||1===Vp[0]?.5:1,p=or(t,n,r,Vp[0]);return o>p?0:e>a?d:-d;}function Dr(t,e,n,i,r,a,o,s){if(s-=e,s>n||-n>s)return 0;var l=Math.sqrt(n*n-s*s);Vp[0]=-l,Vp[1]=l;var u=Math.abs(i-r);if(1e-4>u)return 0;if(1e-4>u%Np){i=0,r=Np;var h=a?1:-1;return o>=Vp[0]+t&&o<=Vp[1]+t?h:0;}if(a){var l=i;i=xr(r),r=xr(l);}else i=xr(i),r=xr(r);i>r&&(r+=Np);for(var c=0,f=0;2>f;f++){var d=Vp[f];if(d+t>o){var p=Math.atan2(s,d),h=a?1:-1;0>p&&(p=Np+p),(p>=i&&r>=p||p+Np>=i&&r>=p+Np)&&(p>Math.PI/2&&p<1.5*Math.PI&&(h=-h),c+=h);}}return c;}function Tr(t,e,n,i,r){for(var a=0,o=0,s=0,l=0,u=0,h=0;h<t.length;){var c=t[h++];switch(c===Bp.M&&h>1&&(n||(a+=br(o,s,l,u,i,r))),1==h&&(o=t[h],s=t[h+1],l=o,u=s),c){case Bp.M:l=t[h++],u=t[h++],o=l,s=u;break;case Bp.L:if(n){if(mr(o,s,t[h],t[h+1],e,i,r))return!0;}else a+=br(o,s,t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case Bp.C:if(n){if(yr(o,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],e,i,r))return!0;}else a+=Cr(o,s,t[h++],t[h++],t[h++],t[h++],t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case Bp.Q:if(n){if(_r(o,s,t[h++],t[h++],t[h],t[h+1],e,i,r))return!0;}else a+=Ir(o,s,t[h++],t[h++],t[h],t[h+1],i,r)||0;o=t[h++],s=t[h++];break;case Bp.A:var f=t[h++],d=t[h++],p=t[h++],g=t[h++],v=t[h++],m=t[h++],y=(t[h++],1-t[h++]),_=Math.cos(v)*p+f,x=Math.sin(v)*g+d;h>1?a+=br(o,s,_,x,i,r):(l=_,u=x);var w=(i-f)*g/p+f;if(n){if(wr(f,d,g,v,v+m,y,e,w,r))return!0;}else a+=Dr(f,d,g,v,v+m,y,w,r);o=Math.cos(v+m)*p+f,s=Math.sin(v+m)*g+d;break;case Bp.R:l=o=t[h++],u=s=t[h++];var b=t[h++],M=t[h++],_=l+b,x=u+M;if(n){if(mr(l,u,_,u,e,i,r)||mr(_,u,_,x,e,i,r)||mr(_,x,l,x,e,i,r)||mr(l,x,l,u,e,i,r))return!0;}else a+=br(_,u,_,x,i,r),a+=br(l,x,l,u,i,r);break;case Bp.Z:if(n){if(mr(o,s,l,u,e,i,r))return!0;}else a+=br(o,s,l,u,i,r);o=l,s=u;}}return n||Mr(s,u)||(a+=br(o,s,l,u,i,r)||0),0!==a;}function kr(t,e,n){return Tr(t,0,!1,e,n);}function Ar(t,e,n,i){return Tr(t,e,!0,n,i);}function Lr(t){ri.call(this,t),this.path=null;}function Pr(t,e,n,i,r,a,o,s,l,u,h){var c=l*(tg/180),f=Jp(c)*(t-n)/2+Qp(c)*(e-i)/2,d=-1*Qp(c)*(t-n)/2+Jp(c)*(e-i)/2,p=f*f/(o*o)+d*d/(s*s);p>1&&(o*=Kp(p),s*=Kp(p));var g=(r===a?-1:1)*Kp((o*o*s*s-o*o*d*d-s*s*f*f)/(o*o*d*d+s*s*f*f))||0,v=g*o*d/s,m=g*-s*f/o,y=(t+n)/2+Jp(c)*v-Qp(c)*m,_=(e+i)/2+Qp(c)*v+Jp(c)*m,x=ig([1,0],[(f-v)/o,(d-m)/s]),w=[(f-v)/o,(d-m)/s],b=[(-1*f-v)/o,(-1*d-m)/s],M=ig(w,b);ng(w,b)<=-1&&(M=tg),ng(w,b)>=1&&(M=0),0===a&&M>0&&(M-=2*tg),1===a&&0>M&&(M+=2*tg),h.addData(u,y,_,o,s,x,M,c,a);}function Or(t){if(!t)return[];var e,n=t.replace(/-/g," -").replace(/  /g," ").replace(/ /g,",").replace(/,,/g,",");for(e=0;e<$p.length;e++){n=n.replace(new RegExp($p[e],"g"),"|"+$p[e]);}var i,r=n.split("|"),a=0,o=0,s=new Ep(),l=Ep.CMD;for(e=1;e<r.length;e++){var u,h=r[e],c=h.charAt(0),f=0,d=h.slice(1).replace(/e,-/g,"e-").split(",");d.length>0&&""===d[0]&&d.shift();for(var p=0;p<d.length;p++){d[p]=parseFloat(d[p]);}for(;f<d.length&&!isNaN(d[f])&&!isNaN(d[0]);){var g,v,m,y,_,x,w,b=a,M=o;switch(c){case"l":a+=d[f++],o+=d[f++],u=l.L,s.addData(u,a,o);break;case"L":a=d[f++],o=d[f++],u=l.L,s.addData(u,a,o);break;case"m":a+=d[f++],o+=d[f++],u=l.M,s.addData(u,a,o),c="l";break;case"M":a=d[f++],o=d[f++],u=l.M,s.addData(u,a,o),c="L";break;case"h":a+=d[f++],u=l.L,s.addData(u,a,o);break;case"H":a=d[f++],u=l.L,s.addData(u,a,o);break;case"v":o+=d[f++],u=l.L,s.addData(u,a,o);break;case"V":o=d[f++],u=l.L,s.addData(u,a,o);break;case"C":u=l.C,s.addData(u,d[f++],d[f++],d[f++],d[f++],d[f++],d[f++]),a=d[f-2],o=d[f-1];break;case"c":u=l.C,s.addData(u,d[f++]+a,d[f++]+o,d[f++]+a,d[f++]+o,d[f++]+a,d[f++]+o),a+=d[f-2],o+=d[f-1];break;case"S":g=a,v=o;var S=s.len(),C=s.data;i===l.C&&(g+=a-C[S-4],v+=o-C[S-3]),u=l.C,b=d[f++],M=d[f++],a=d[f++],o=d[f++],s.addData(u,g,v,b,M,a,o);break;case"s":g=a,v=o;var S=s.len(),C=s.data;i===l.C&&(g+=a-C[S-4],v+=o-C[S-3]),u=l.C,b=a+d[f++],M=o+d[f++],a+=d[f++],o+=d[f++],s.addData(u,g,v,b,M,a,o);break;case"Q":b=d[f++],M=d[f++],a=d[f++],o=d[f++],u=l.Q,s.addData(u,b,M,a,o);break;case"q":b=d[f++]+a,M=d[f++]+o,a+=d[f++],o+=d[f++],u=l.Q,s.addData(u,b,M,a,o);break;case"T":g=a,v=o;var S=s.len(),C=s.data;i===l.Q&&(g+=a-C[S-4],v+=o-C[S-3]),a=d[f++],o=d[f++],u=l.Q,s.addData(u,g,v,a,o);break;case"t":g=a,v=o;var S=s.len(),C=s.data;i===l.Q&&(g+=a-C[S-4],v+=o-C[S-3]),a+=d[f++],o+=d[f++],u=l.Q,s.addData(u,g,v,a,o);break;case"A":m=d[f++],y=d[f++],_=d[f++],x=d[f++],w=d[f++],b=a,M=o,a=d[f++],o=d[f++],u=l.A,Pr(b,M,a,o,x,w,m,y,_,u,s);break;case"a":m=d[f++],y=d[f++],_=d[f++],x=d[f++],w=d[f++],b=a,M=o,a+=d[f++],o+=d[f++],u=l.A,Pr(b,M,a,o,x,w,m,y,_,u,s);}}("z"===c||"Z"===c)&&(u=l.Z,s.addData(u)),i=u;}return s.toStatic(),s;}function Er(t,e){var n=Or(t);return e=e||{},e.buildPath=function(t){if(t.setData){t.setData(n.data);var e=t.getContext();e&&t.rebuildPath(e);}else{var e=t;n.rebuildPath(e);}},e.applyTransform=function(t){Zp(n,t),this.dirty(!0);},e;}function Rr(t,e){return new Lr(Er(t,e));}function zr(t,e){return Lr.extend(Er(t,e));}function Br(t,e){for(var n=[],i=t.length,r=0;i>r;r++){var a=t[r];a.path||a.createPathProxy(),a.__dirtyPath&&a.buildPath(a.path,a.shape,!0),n.push(a.path);}var o=new Lr(e);return o.createPathProxy(),o.buildPath=function(t){t.appendPath(n);var e=t.getContext();e&&t.rebuildPath(e);},o;}function Nr(t,e,n,i,r,a,o){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*o+(-3*(e-n)-2*s-l)*a+s*r+e;}function Fr(t,e,n){var i=e.points,r=e.smooth;if(i&&i.length>=2){if(r&&"spline"!==r){var a=cg(i,r,n,e.smoothConstraint);t.moveTo(i[0][0],i[0][1]);for(var o=i.length,s=0;(n?o:o-1)>s;s++){var l=a[2*s],u=a[2*s+1],h=i[(s+1)%o];t.bezierCurveTo(l[0],l[1],u[0],u[1],h[0],h[1]);}}else{"spline"===r&&(i=hg(i,n)),t.moveTo(i[0][0],i[0][1]);for(var s=1,c=i.length;c>s;s++){t.lineTo(i[s][0],i[s][1]);}}n&&t.closePath();}}function Vr(t,e,n){var i=t.cpx2,r=t.cpy2;return null===i||null===r?[(n?er:tr)(t.x1,t.cpx1,t.cpx2,t.x2,e),(n?er:tr)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(n?sr:or)(t.x1,t.cpx1,t.x2,e),(n?sr:or)(t.y1,t.cpy1,t.y2,e)];}function Hr(t){ri.call(this,t),this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.notClear=!0;}function Wr(t){return Lr.extend(t);}function Gr(t,e){return zr(t,e);}function jr(t,e,n,i){var r=Rr(t,e),a=r.getBoundingRect();return n&&("center"===i&&(n=Ur(n,a)),Xr(r,n)),r;}function qr(t,e,n){var i=new ai({style:{image:t,x:e.x,y:e.y,width:e.width,height:e.height},onload:function onload(t){if("center"===n){var r={width:t.width,height:t.height};i.setStyle(Ur(e,r));}}});return i;}function Ur(t,e){var n,i=e.width/e.height,r=t.height*i;r<=t.width?n=t.height:(r=t.width,n=r/i);var a=t.x+t.width/2,o=t.y+t.height/2;return{x:a-r/2,y:o-n/2,width:r,height:n};}function Xr(t,e){if(t.applyTransform){var n=t.getBoundingRect(),i=n.calculateTransform(e);t.applyTransform(i);}}function Yr(t){var e=t.shape,n=t.style.lineWidth;return Sg(2*e.x1)===Sg(2*e.x2)&&(e.x1=e.x2=$r(e.x1,n,!0)),Sg(2*e.y1)===Sg(2*e.y2)&&(e.y1=e.y2=$r(e.y1,n,!0)),t;}function Zr(t){var e=t.shape,n=t.style.lineWidth,i=e.x,r=e.y,a=e.width,o=e.height;return e.x=$r(e.x,n,!0),e.y=$r(e.y,n,!0),e.width=Math.max($r(i+a,n,!1)-e.x,0===a?0:1),e.height=Math.max($r(r+o,n,!1)-e.y,0===o?0:1),t;}function $r(t,e,n){var i=Sg(2*t);return(i+Sg(e))%2===0?i/2:(i+(n?1:-1))/2;}function Kr(t){return null!=t&&"none"!=t;}function Qr(t){return"string"==typeof t?Be(t,-.1):t;}function Jr(t){if(t.__hoverStlDirty){var e=t.style.stroke,n=t.style.fill,i=t.__hoverStl;i.fill=i.fill||(Kr(n)?Qr(n):null),i.stroke=i.stroke||(Kr(e)?Qr(e):null);var r={};for(var a in i){null!=i[a]&&(r[a]=t.style[a]);}t.__normalStl=r,t.__hoverStlDirty=!1;}}function ta(t){if(!t.__isHover){if(Jr(t),t.useHoverLayer)t.__zr&&t.__zr.addHover(t,t.__hoverStl);else{var e=t.style,n=e.insideRollbackOpt;n&&ya(e),e.extendFrom(t.__hoverStl),n&&(ma(e,e.insideOriginalTextPosition,n),null==e.textFill&&(e.textFill=n.autoColor)),t.dirty(!1),t.z2+=1;}t.__isHover=!0;}}function ea(t){if(t.__isHover){var e=t.__normalStl;t.useHoverLayer?t.__zr&&t.__zr.removeHover(t):(e&&t.setStyle(e),t.z2-=1),t.__isHover=!1;}}function na(t){"group"===t.type?t.traverse(function(t){"group"!==t.type&&ta(t);}):ta(t);}function ia(t){"group"===t.type?t.traverse(function(t){"group"!==t.type&&ea(t);}):ea(t);}function ra(t,e){t.__hoverStl=t.hoverStyle||e||{},t.__hoverStlDirty=!0,t.__isHover&&Jr(t);}function aa(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasis&&na(this);}function oa(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasis&&ia(this);}function sa(){this.__isEmphasis=!0,na(this);}function la(){this.__isEmphasis=!1,ia(this);}function ua(t,e,n){t.__hoverSilentOnTouch=n&&n.hoverSilentOnTouch,"group"===t.type?t.traverse(function(t){"group"!==t.type&&ra(t,e);}):ra(t,e),t.on("mouseover",aa).on("mouseout",oa),t.on("emphasis",sa).on("normal",la);}function ha(t,e,n,i,r,a,o){r=r||Dg;var s,l=r.labelFetcher,u=r.labelDataIndex,h=r.labelDimIndex,c=n.getShallow("show"),f=i.getShallow("show");(c||f)&&(l&&(s=l.getFormattedLabel(u,"normal",null,h)),null==s&&(s=w(r.defaultText)?r.defaultText(u,r):r.defaultText));var d=c?s:null,p=f?k(l?l.getFormattedLabel(u,"emphasis",null,h):null,s):null;(null!=d||null!=p)&&(ca(t,n,a,r),ca(e,i,o,r,!0)),t.text=d,e.text=p;}function ca(t,e,n,i,r){return da(t,e,i,r),n&&o(t,n),t.host&&t.host.dirty&&t.host.dirty(!1),t;}function fa(t,e,n){var i,r={isRectText:!0};n===!1?i=!0:r.autoColor=n,da(t,e,r,i),t.host&&t.host.dirty&&t.host.dirty(!1);}function da(t,e,n,i){if(n=n||Dg,n.isRectText){var r=e.getShallow("position")||(i?null:"inside");"outside"===r&&(r="top"),t.textPosition=r,t.textOffset=e.getShallow("offset");var a=e.getShallow("rotate");null!=a&&(a*=Math.PI/180),t.textRotation=a,t.textDistance=k(e.getShallow("distance"),i?null:5);}var o,s=e.ecModel,l=s&&s.option.textStyle,u=pa(e);if(u){o={};for(var h in u){if(u.hasOwnProperty(h)){var c=e.getModel(["rich",h]);ga(o[h]={},c,l,n,i);}}}return t.rich=o,ga(t,e,l,n,i,!0),n.forceRich&&!n.textStyle&&(n.textStyle={}),t;}function pa(t){for(var e;t&&t!==t.ecModel;){var n=(t.option||Dg).rich;if(n){e=e||{};for(var i in n){n.hasOwnProperty(i)&&(e[i]=1);}}t=t.parentModel;}return e;}function ga(t,e,n,i,r,a){if(n=!r&&n||Dg,t.textFill=va(e.getShallow("color"),i)||n.color,t.textStroke=va(e.getShallow("textBorderColor"),i)||n.textBorderColor,t.textStrokeWidth=k(e.getShallow("textBorderWidth"),n.textBorderWidth),!r){if(a){var o=t.textPosition;t.insideRollback=ma(t,o,i),t.insideOriginalTextPosition=o,t.insideRollbackOpt=i;}null==t.textFill&&(t.textFill=i.autoColor);}t.fontStyle=e.getShallow("fontStyle")||n.fontStyle,t.fontWeight=e.getShallow("fontWeight")||n.fontWeight,t.fontSize=e.getShallow("fontSize")||n.fontSize,t.fontFamily=e.getShallow("fontFamily")||n.fontFamily,t.textAlign=e.getShallow("align"),t.textVerticalAlign=e.getShallow("verticalAlign")||e.getShallow("baseline"),t.textLineHeight=e.getShallow("lineHeight"),t.textWidth=e.getShallow("width"),t.textHeight=e.getShallow("height"),t.textTag=e.getShallow("tag"),a&&i.disableBox||(t.textBackgroundColor=va(e.getShallow("backgroundColor"),i),t.textPadding=e.getShallow("padding"),t.textBorderColor=va(e.getShallow("borderColor"),i),t.textBorderWidth=e.getShallow("borderWidth"),t.textBorderRadius=e.getShallow("borderRadius"),t.textBoxShadowColor=e.getShallow("shadowColor"),t.textBoxShadowBlur=e.getShallow("shadowBlur"),t.textBoxShadowOffsetX=e.getShallow("shadowOffsetX"),t.textBoxShadowOffsetY=e.getShallow("shadowOffsetY")),t.textShadowColor=e.getShallow("textShadowColor")||n.textShadowColor,t.textShadowBlur=e.getShallow("textShadowBlur")||n.textShadowBlur,t.textShadowOffsetX=e.getShallow("textShadowOffsetX")||n.textShadowOffsetX,t.textShadowOffsetY=e.getShallow("textShadowOffsetY")||n.textShadowOffsetY;}function va(t,e){return"auto"!==t?t:e&&e.autoColor?e.autoColor:null;}function ma(t,e,n){var i,r=n.useInsideStyle;return null==t.textFill&&r!==!1&&(r===!0||n.isRectText&&e&&"string"==typeof e&&e.indexOf("inside")>=0)&&(i={textFill:null,textStroke:t.textStroke,textStrokeWidth:t.textStrokeWidth},t.textFill="#fff",null==t.textStroke&&(t.textStroke=n.autoColor,null==t.textStrokeWidth&&(t.textStrokeWidth=2))),i;}function ya(t){var e=t.insideRollback;e&&(t.textFill=e.textFill,t.textStroke=e.textStroke,t.textStrokeWidth=e.textStrokeWidth);}function _a(t,e){var n=e||e.getModel("textStyle");return E([t.fontStyle||n&&n.getShallow("fontStyle")||"",t.fontWeight||n&&n.getShallow("fontWeight")||"",(t.fontSize||n&&n.getShallow("fontSize")||12)+"px",t.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" "));}function xa(t,e,n,i,r,a){"function"==typeof r&&(a=r,r=null);var o=i&&i.isAnimationEnabled();if(o){var s=t?"Update":"",l=i.getShallow("animationDuration"+s),u=i.getShallow("animationEasing"+s),h=i.getShallow("animationDelay"+s);"function"==typeof h&&(h=h(r,i.getAnimationDelayParams?i.getAnimationDelayParams(e,r):null)),"function"==typeof l&&(l=l(r)),l>0?e.animateTo(n,l,h||0,u,a,!!a):(e.stopAnimation(),e.attr(n),a&&a());}else e.stopAnimation(),e.attr(n),a&&a();}function wa(t,e,n,i,r){xa(!0,t,e,n,i,r);}function ba(t,e,n,i,r){xa(!1,t,e,n,i,r);}function Ma(t,e){for(var n=pe([]);t&&t!==e;){ve(n,t.getLocalTransform(),n),t=t.parent;}return n;}function Sa(t,e,n){return e&&!f(e)&&(e=xf.getLocalTransform(e)),n&&(e=xe([],e)),ae([],t,e);}function Ca(t,e,n){var i=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),a=["left"===t?-i:"right"===t?i:0,"top"===t?-r:"bottom"===t?r:0];return a=Sa(a,e,n),Math.abs(a[0])>Math.abs(a[1])?a[0]>0?"right":"left":a[1]>0?"bottom":"top";}function Ia(t,e,n){function i(t){var e={};return t.traverse(function(t){!t.isGroup&&t.anid&&(e[t.anid]=t);}),e;}function r(t){var e={position:G(t.position),rotation:t.rotation};return t.shape&&(e.shape=o({},t.shape)),e;}if(t&&e){var a=i(t);e.traverse(function(t){if(!t.isGroup&&t.anid){var e=a[t.anid];if(e){var i=r(t);t.attr(r(e)),wa(t,i,n,t.dataIndex);}}});}}function Da(t,e){return p(t,function(t){var n=t[0];n=Cg(n,e.x),n=Ig(n,e.x+e.width);var i=t[1];return i=Cg(i,e.y),i=Ig(i,e.y+e.height),[n,i];});}function Ta(t,e){var n=Cg(t.x,e.x),i=Ig(t.x+t.width,e.x+e.width),r=Cg(t.y,e.y),a=Ig(t.y+t.height,e.y+e.height);return i>=n&&a>=r?{x:n,y:r,width:i-n,height:a-r}:void 0;}function ka(t,e,n){e=o({rectHover:!0},e);var i=e.style={strokeNoScale:!0};return n=n||{x:-1,y:-1,width:2,height:2},t?0===t.indexOf("image://")?(i.image=t.slice(8),s(i,n),new ai(e)):jr(t.replace("path://",""),e,n,"center"):void 0;}function Aa(t,e,n){this.parentModel=e,this.ecModel=n,this.option=t;}function La(t,e,n){for(var i=0;i<e.length&&(!e[i]||(t=t&&"object"==(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t))?t[e[i]]:null,null!=t));i++){}return null==t&&n&&(t=n.get(e)),t;}function Pa(t,e){var n=Rg(t).getParent;return n?n.call(t,e):t.parentModel;}function Oa(t){return[t||"",zg++,Math.random().toFixed(5)].join("_");}function Ea(t){var e={};return t.registerSubTypeDefaulter=function(t,n){t=qi(t),e[t.main]=n;},t.determineSubType=function(n,i){var r=i.type;if(!r){var a=qi(n).main;t.hasSubTypes(n)&&e[a]&&(r=e[a](i));}return r;},t;}function Ra(t,e){function n(t){var n={},a=[];return d(t,function(o){var s=i(n,o),l=s.originalDeps=e(o),h=r(l,t);s.entryCount=h.length,0===s.entryCount&&a.push(o),d(h,function(t){u(s.predecessor,t)<0&&s.predecessor.push(t);var e=i(n,t);u(e.successor,t)<0&&e.successor.push(o);});}),{graph:n,noEntryList:a};}function i(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e];}function r(t,e){var n=[];return d(t,function(t){u(e,t)>=0&&n.push(t);}),n;}t.topologicalTravel=function(t,e,i,r){function a(t){l[t].entryCount--,0===l[t].entryCount&&u.push(t);}function o(t){h[t]=!0,a(t);}if(t.length){var s=n(e),l=s.graph,u=s.noEntryList,h={};for(d(t,function(t){h[t]=!0;});u.length;){var c=u.pop(),f=l[c],p=!!h[c];p&&(i.call(r,c,f.originalDeps.slice()),delete h[c]),d(f.successor,p?o:a);}d(h,function(){throw new Error("Circle dependency may exists");});}};}function za(t){return t.replace(/^\s+/,"").replace(/\s+$/,"");}function Ba(t,e,n,i){var r=e[1]-e[0],a=n[1]-n[0];if(0===r)return 0===a?n[0]:(n[0]+n[1])/2;if(i){if(r>0){if(t<=e[0])return n[0];if(t>=e[1])return n[1];}else{if(t>=e[0])return n[0];if(t<=e[1])return n[1];}}else{if(t===e[0])return n[0];if(t===e[1])return n[1];}return(t-e[0])/r*a+n[0];}function Na(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%";}return"string"==typeof t?za(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?0/0:+t;}function Fa(t,e,n){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),n?t:+t;}function Va(t){return t.sort(function(t,e){return t-e;}),t;}function Ha(t){if(t=+t,isNaN(t))return 0;for(var e=1,n=0;Math.round(t*e)/e!==t;){e*=10,n++;}return n;}function Wa(t){var e=t.toString(),n=e.indexOf("e");if(n>0){var i=+e.slice(n+1);return 0>i?-i:0;}var r=e.indexOf(".");return 0>r?0:e.length-1-r;}function Ga(t,e){var n=Math.log,i=Math.LN10,r=Math.floor(n(t[1]-t[0])/i),a=Math.round(n(Math.abs(e[1]-e[0]))/i),o=Math.min(Math.max(-r+a,0),20);return isFinite(o)?o:20;}function ja(t,e,n){if(!t[e])return 0;var i=g(t,function(t,e){return t+(isNaN(e)?0:e);},0);if(0===i)return 0;for(var r=Math.pow(10,n),a=p(t,function(t){return(isNaN(t)?0:t)/i*r*100;}),o=100*r,s=p(a,function(t){return Math.floor(t);}),l=g(s,function(t,e){return t+e;},0),u=p(a,function(t,e){return t-s[e];});o>l;){for(var h=Number.NEGATIVE_INFINITY,c=null,f=0,d=u.length;d>f;++f){u[f]>h&&(h=u[f],c=f);}++s[c],u[c]=0,++l;}return s[e]/r;}function qa(t){var e=2*Math.PI;return(t%e+e)%e;}function Ua(t){return t>-Bg&&Bg>t;}function Xa(t){if(t instanceof Date)return t;if("string"==typeof t){var e=Fg.exec(t);if(!e)return new Date(0/0);if(e[8]){var n=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(n-=e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,n,+(e[5]||0),+e[6]||0,+e[7]||0));}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0);}return new Date(null==t?0/0:Math.round(t));}function Ya(t){return Math.pow(10,Za(t));}function Za(t){return Math.floor(Math.log(t)/Math.LN10);}function $a(t,e){var n,i=Za(t),r=Math.pow(10,i),a=t/r;return n=e?1.5>a?1:2.5>a?2:4>a?3:7>a?5:10:1>a?1:2>a?2:3>a?3:5>a?5:10,t=n*r,i>=-20?+t.toFixed(0>i?-i:0):t;}function Ka(t){function e(t,n,i){return t.interval[i]<n.interval[i]||t.interval[i]===n.interval[i]&&(t.close[i]-n.close[i]===(i?-1:1)||!i&&e(t,n,1));}t.sort(function(t,n){return e(t,n,0)?-1:1;});for(var n=-1/0,i=1,r=0;r<t.length;){for(var a=t[r].interval,o=t[r].close,s=0;2>s;s++){a[s]<=n&&(a[s]=n,o[s]=s?1:1-i),n=a[s],i=o[s];}a[0]===a[1]&&o[0]*o[1]!==1?t.splice(r,1):r++;}return t;}function Qa(t){return t-parseFloat(t)>=0;}function Ja(t){return isNaN(t)?"-":(t=(t+"").split("."),t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(t.length>1?"."+t[1]:""));}function to(t,e){return t=(t||"").toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase();}),e&&t&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t;}function eo(t){return null==t?"":(t+"").replace(Wg,function(t,e){return Gg[e];});}function no(t,e,n){x(e)||(e=[e]);var i=e.length;if(!i)return"";for(var r=e[0].$vars||[],a=0;a<r.length;a++){var o=jg[a];t=t.replace(qg(o),qg(o,0));}for(var s=0;i>s;s++){for(var l=0;l<r.length;l++){var u=e[s][r[l]];t=t.replace(qg(jg[l],s),n?eo(u):u);}}return t;}function io(t,e,n){return d(e,function(e,i){t=t.replace("{"+i+"}",n?eo(e):e);}),t;}function ro(t,e){t=b(t)?{color:t,extraCssText:e}:t||{};var n=t.color,i=t.type,e=t.extraCssText;return n?"subItem"===i?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+eo(n)+";"+(e||"")+'"></span>':'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+eo(n)+";"+(e||"")+'"></span>':"";}function ao(t,e){return t+="","0000".substr(0,e-t.length)+t;}function oo(t,e,n){("week"===t||"month"===t||"quarter"===t||"half-year"===t||"year"===t)&&(t="MM-dd\nyyyy");var i=Xa(e),r=n?"UTC":"",a=i["get"+r+"FullYear"](),o=i["get"+r+"Month"]()+1,s=i["get"+r+"Date"](),l=i["get"+r+"Hours"](),u=i["get"+r+"Minutes"](),h=i["get"+r+"Seconds"](),c=i["get"+r+"Milliseconds"]();return t=t.replace("MM",ao(o,2)).replace("M",o).replace("yyyy",a).replace("yy",a%100).replace("dd",ao(s,2)).replace("d",s).replace("hh",ao(l,2)).replace("h",l).replace("mm",ao(u,2)).replace("m",u).replace("ss",ao(h,2)).replace("s",h).replace("SSS",ao(c,3));}function so(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t;}function lo(t,e,n,i,r){var a=0,o=0;null==i&&(i=1/0),null==r&&(r=1/0);var s=0;e.eachChild(function(l,u){var h,c,f=l.position,d=l.getBoundingRect(),p=e.childAt(u+1),g=p&&p.getBoundingRect();if("horizontal"===t){var v=d.width+(g?-g.x+d.x:0);h=a+v,h>i||l.newline?(a=0,h=v,o+=s+n,s=d.height):s=Math.max(s,d.height);}else{var m=d.height+(g?-g.y+d.y:0);c=o+m,c>r||l.newline?(a+=s+n,o=0,c=m,s=d.width):s=Math.max(s,d.width);}l.newline||(f[0]=a,f[1]=o,"horizontal"===t?a=h+n:o=c+n);});}function uo(t,e,n){n=Hg(n||0);var i=e.width,r=e.height,a=Na(t.left,i),o=Na(t.top,r),s=Na(t.right,i),l=Na(t.bottom,r),u=Na(t.width,i),h=Na(t.height,r),c=n[2]+n[0],f=n[1]+n[3],d=t.aspect;switch(isNaN(u)&&(u=i-s-f-a),isNaN(h)&&(h=r-l-c-o),null!=d&&(isNaN(u)&&isNaN(h)&&(d>i/r?u=.8*i:h=.8*r),isNaN(u)&&(u=d*h),isNaN(h)&&(h=u/d)),isNaN(a)&&(a=i-s-u-f),isNaN(o)&&(o=r-l-h-c),t.left||t.right){case"center":a=i/2-u/2-n[3];break;case"right":a=i-u-f;}switch(t.top||t.bottom){case"middle":case"center":o=r/2-h/2-n[0];break;case"bottom":o=r-h-c;}a=a||0,o=o||0,isNaN(u)&&(u=i-f-a-(s||0)),isNaN(h)&&(h=r-c-o-(l||0));var p=new rn(a+n[3],o+n[0],u,h);return p.margin=n,p;}function ho(t,e,n){function i(n,i){var o={},l=0,u={},h=0,c=2;if(Zg(n,function(e){u[e]=t[e];}),Zg(n,function(t){r(e,t)&&(o[t]=u[t]=e[t]),a(o,t)&&l++,a(u,t)&&h++;}),s[i])return a(e,n[1])?u[n[2]]=null:a(e,n[2])&&(u[n[1]]=null),u;if(h!==c&&l){if(l>=c)return o;for(var f=0;f<n.length;f++){var d=n[f];if(!r(o,d)&&r(t,d)){o[d]=t[d];break;}}return o;}return u;}function r(t,e){return t.hasOwnProperty(e);}function a(t,e){return null!=t[e]&&"auto"!==t[e];}function o(t,e,n){Zg(t,function(t){e[t]=n[t];});}!M(n)&&(n={});var s=n.ignoreSize;!x(s)&&(s=[s,s]);var l=i(Kg[0],0),u=i(Kg[1],1);o(Kg[0],t,l),o(Kg[1],t,u);}function co(t){return fo({},t);}function fo(t,e){return e&&t&&Zg($g,function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t;}function po(t){var e=[];return d(tv.getClassesByMainType(t),function(t){e=e.concat(t.prototype.dependencies||[]);}),e=p(e,function(t){return qi(t).main;}),"dataset"!==t&&u(e,"dataset")<=0&&e.unshift("dataset"),e;}function go(t,e){for(var n=t.length,i=0;n>i;i++){if(t[i].length>e)return t[i];}return t[n-1];}function vo(t){var e=t.get("coordinateSystem"),n={coordSysName:e,coordSysDims:[],axisMap:N(),categoryAxisMap:N()},i=av[e];return i?(i(t,n,n.axisMap,n.categoryAxisMap),n):void 0;}function mo(t){return"category"===t.get("type");}function yo(t){this.fromDataset=t.fromDataset,this.data=t.data||(t.sourceFormat===uv?{}:[]),this.sourceFormat=t.sourceFormat||hv,this.seriesLayoutBy=t.seriesLayoutBy||fv,this.dimensionsDefine=t.dimensionsDefine,this.encodeDefine=t.encodeDefine&&N(t.encodeDefine),this.startIndex=t.startIndex||0,this.dimensionsDetectCount=t.dimensionsDetectCount;}function _o(t){var e=t.option.source,n=hv;if(C(e))n=cv;else if(x(e))for(var i=0,r=e.length;r>i;i++){var a=e[i];if(null!=a){if(x(a)){n=sv;break;}if(M(a)){n=lv;break;}}}else if(M(e)){for(var o in e){if(e.hasOwnProperty(o)&&f(e[o])){n=uv;break;}}}else if(null!=e)throw new Error("Invalid data");pv(t).sourceFormat=n;}function xo(t){return pv(t).source;}function wo(t){pv(t).datasetMap=N();}function bo(t){var e=t.option,n=e.data,i=C(n)?cv:ov,r=!1,a=e.seriesLayoutBy,o=e.sourceHeader,s=e.dimensions,l=To(t);if(l){var u=l.option;n=u.source,i=pv(l).sourceFormat,r=!0,a=a||u.seriesLayoutBy,null==o&&(o=u.sourceHeader),s=s||u.dimensions;}var h=Mo(n,i,a,o,s),c=e.encode;!c&&l&&(c=Do(t,l,n,i,a,h)),pv(t).source=new yo({data:n,fromDataset:r,seriesLayoutBy:a,sourceFormat:i,dimensionsDefine:h.dimensionsDefine,startIndex:h.startIndex,dimensionsDetectCount:h.dimensionsDetectCount,encodeDefine:c});}function Mo(t,e,n,i,r){if(!t)return{dimensionsDefine:So(r)};var a,o,s;if(e===sv)"auto"===i||null==i?Co(function(t){null!=t&&"-"!==t&&(b(t)?null==o&&(o=1):o=0);},n,t,10):o=i?1:0,r||1!==o||(r=[],Co(function(t,e){r[e]=null!=t?t:"";},n,t)),a=r?r.length:n===dv?t.length:t[0]?t[0].length:null;else if(e===lv)r||(r=Io(t),s=!0);else if(e===uv)r||(r=[],s=!0,d(t,function(t,e){r.push(e);}));else if(e===ov){var l=Oi(t[0]);a=x(l)&&l.length||1;}var u;return s&&d(r,function(t,e){"name"===(M(t)?t.name:t)&&(u=e);}),{startIndex:o,dimensionsDefine:So(r),dimensionsDetectCount:a,potentialNameDimIndex:u};}function So(t){if(t){var e=N();return p(t,function(t){if(t=o({},M(t)?t:{name:t}),null==t.name)return t;t.name+="",null==t.displayName&&(t.displayName=t.name);var n=e.get(t.name);return n?t.name+="-"+n.count++:e.set(t.name,{count:1}),t;});}}function Co(t,e,n,i){if(null==i&&(i=1/0),e===dv)for(var r=0;r<n.length&&i>r;r++){t(n[r]?n[r][0]:null,r);}else for(var a=n[0]||[],r=0;r<a.length&&i>r;r++){t(a[r],r);}}function Io(t){for(var e,n=0;n<t.length&&!(e=t[n++]);){}if(e){var i=[];return d(e,function(t,e){i.push(e);}),i;}}function Do(t,e,n,i,r,a){var o=vo(t),s={},l=[],u=[],h=t.subType,c=N(["pie","map","funnel"]),f=N(["line","bar","pictorialBar","scatter","effectScatter","candlestick","boxplot"]);if(o&&null!=f.get(h)){var p=t.ecModel,g=pv(p).datasetMap,v=e.uid+"_"+r,m=g.get(v)||g.set(v,{categoryWayDim:1,valueWayDim:0});d(o.coordSysDims,function(t){if(null==o.firstCategoryDimIndex){var e=m.valueWayDim++;s[t]=e,u.push(e);}else if(o.categoryAxisMap.get(t))s[t]=0,l.push(0);else{var e=m.categoryWayDim++;s[t]=e,u.push(e);}});}else if(null!=c.get(h)){for(var y,_=0;5>_&&null==y;_++){Ao(n,i,r,a.dimensionsDefine,a.startIndex,_)||(y=_);}if(null!=y){s.value=y;var x=a.potentialNameDimIndex||Math.max(y-1,0);u.push(x),l.push(x);}}return l.length&&(s.itemName=l),u.length&&(s.seriesName=u),s;}function To(t){var e=t.option,n=e.data;return n?void 0:t.ecModel.getComponent("dataset",e.datasetIndex||0);}function ko(t,e){return Ao(t.data,t.sourceFormat,t.seriesLayoutBy,t.dimensionsDefine,t.startIndex,e);}function Ao(t,e,n,i,r,a){function o(t){return null!=t&&isFinite(t)&&""!==t?!1:b(t)&&"-"!==t?!0:void 0;}var s,l=5;if(C(t))return!1;var u;if(i&&(u=i[a],u=M(u)?u.name:u),e===sv){if(n===dv){for(var h=t[a],c=0;c<(h||[]).length&&l>c;c++){if(null!=(s=o(h[r+c])))return s;}}else for(var c=0;c<t.length&&l>c;c++){var f=t[r+c];if(f&&null!=(s=o(f[a])))return s;}}else if(e===lv){if(!u)return;for(var c=0;c<t.length&&l>c;c++){var d=t[c];if(d&&null!=(s=o(d[u])))return s;}}else if(e===uv){if(!u)return;var h=t[u];if(!h||C(h))return!1;for(var c=0;c<h.length&&l>c;c++){if(null!=(s=o(h[c])))return s;}}else if(e===ov)for(var c=0;c<t.length&&l>c;c++){var d=t[c],p=Oi(d);if(!x(p))return!1;if(null!=(s=o(p[a])))return s;}return!1;}function Lo(t,e){if(e){var n=e.seiresIndex,i=e.seriesId,r=e.seriesName;return null!=n&&t.componentIndex!==n||null!=i&&t.id!==i||null!=r&&t.name!==r;}}function Po(t,e){var n=t.color&&!t.colorLayer;d(e,function(e,a){"colorLayer"===a&&n||tv.hasClass(a)||("object"==(typeof e==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(e))?t[a]=t[a]?r(t[a],e,!1):i(e):null==t[a]&&(t[a]=e));});}function Oo(t){t=t,this.option={},this.option[gv]=1,this._componentsMap=N({series:[]}),this._seriesIndices,this._seriesIndicesMap,Po(t,this._theme.option),r(t,nv,!1),this.mergeOption(t);}function Eo(t,e){x(e)||(e=e?[e]:[]);var n={};return d(e,function(e){n[e]=(t.get(e)||[]).slice();}),n;}function Ro(t,e,n){var i=e.type?e.type:n?n.subType:tv.determineSubType(t,e);return i;}function zo(t,e){t._seriesIndicesMap=N(t._seriesIndices=p(e,function(t){return t.componentIndex;})||[]);}function Bo(t,e){return e.hasOwnProperty("subType")?v(t,function(t){return t.subType===e.subType;}):t;}function No(t){d(mv,function(e){this[e]=y(t[e],t);},this);}function Fo(){this._coordinateSystems=[];}function Vo(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption;}function Ho(t,e,n){var i,r,a=[],o=[],s=t.timeline;if(t.baseOption&&(r=t.baseOption),(s||t.options)&&(r=r||{},a=(t.options||[]).slice()),t.media){r=r||{};var l=t.media;_v(l,function(t){t&&t.option&&(t.query?o.push(t):i||(i=t));});}return r||(r=t),r.timeline||(r.timeline=s),_v([r].concat(a).concat(p(o,function(t){return t.option;})),function(t){_v(e,function(e){e(t,n);});}),{baseOption:r,timelineOptions:a,mediaDefault:i,mediaList:o};}function Wo(t,e,n){var i={width:e,height:n,aspectratio:e/n},r=!0;return d(t,function(t,e){var n=e.match(Mv);if(n&&n[1]&&n[2]){var a=n[1],o=n[2].toLowerCase();Go(i[o],t,a)||(r=!1);}}),r;}function Go(t,e,n){return"min"===n?t>=e:"max"===n?e>=t:t===e;}function jo(t,e){return t.join(",")===e.join(",");}function qo(t,e){e=e||{},_v(e,function(e,n){if(null!=e){var i=t[n];if(tv.hasClass(n)){e=Li(e),i=Li(i);var r=Ri(i,e);t[n]=wv(r,function(t){return t.option&&t.exist?bv(t.exist,t.option,!0):t.exist||t.option;});}else t[n]=bv(i,e,!0);}});}function Uo(t){var e=t&&t.itemStyle;if(e)for(var n=0,i=Iv.length;i>n;n++){var a=Iv[n],o=e.normal,s=e.emphasis;o&&o[a]&&(t[a]=t[a]||{},t[a].normal?r(t[a].normal,o[a]):t[a].normal=o[a],o[a]=null),s&&s[a]&&(t[a]=t[a]||{},t[a].emphasis?r(t[a].emphasis,s[a]):t[a].emphasis=s[a],s[a]=null);}}function Xo(t,e,n){if(t&&t[e]&&(t[e].normal||t[e].emphasis)){var i=t[e].normal,r=t[e].emphasis;i&&(n?(t[e].normal=t[e].emphasis=null,s(t[e],i)):t[e]=i),r&&(t.emphasis=t.emphasis||{},t.emphasis[e]=r);}}function Yo(t){Xo(t,"itemStyle"),Xo(t,"lineStyle"),Xo(t,"areaStyle"),Xo(t,"label"),Xo(t,"labelLine"),Xo(t,"upperLabel"),Xo(t,"edgeLabel");}function Zo(t,e){var n=Cv(t)&&t[e],i=Cv(n)&&n.textStyle;if(i)for(var r=0,a=Xd.length;a>r;r++){var e=Xd[r];i.hasOwnProperty(e)&&(n[e]=i[e]);}}function $o(t){t&&(Yo(t),Zo(t,"label"),t.emphasis&&Zo(t.emphasis,"label"));}function Ko(t){if(Cv(t)){Uo(t),Yo(t),Zo(t,"label"),Zo(t,"upperLabel"),Zo(t,"edgeLabel"),t.emphasis&&(Zo(t.emphasis,"label"),Zo(t.emphasis,"upperLabel"),Zo(t.emphasis,"edgeLabel"));var e=t.markPoint;e&&(Uo(e),$o(e));var n=t.markLine;n&&(Uo(n),$o(n));var i=t.markArea;i&&$o(i);var r=t.data;if("graph"===t.type){r=r||t.nodes;var a=t.links||t.edges;if(a&&!C(a))for(var o=0;o<a.length;o++){$o(a[o]);}d(t.categories,function(t){Yo(t);});}if(r&&!C(r))for(var o=0;o<r.length;o++){$o(r[o]);}var e=t.markPoint;if(e&&e.data)for(var s=e.data,o=0;o<s.length;o++){$o(s[o]);}var n=t.markLine;if(n&&n.data)for(var l=n.data,o=0;o<l.length;o++){x(l[o])?($o(l[o][0]),$o(l[o][1])):$o(l[o]);}"gauge"===t.type?(Zo(t,"axisLabel"),Zo(t,"title"),Zo(t,"detail")):"treemap"===t.type?(Xo(t.breadcrumb,"itemStyle"),d(t.levels,function(t){Yo(t);})):"tree"===t.type&&Yo(t.leaves);}}function Qo(t){return x(t)?t:t?[t]:[];}function Jo(t){return(x(t)?t[0]:t)||{};}function ts(t,e){e=e.split(",");for(var n=t,i=0;i<e.length&&(n=n&&n[e[i]],null!=n);i++){}return n;}function es(t,e,n,i){e=e.split(",");for(var r,a=t,o=0;o<e.length-1;o++){r=e[o],null==a[r]&&(a[r]={}),a=a[r];}(i||null==a[e[o]])&&(a[e[o]]=n);}function ns(t){d(Tv,function(e){e[0]in t&&!(e[1]in t)&&(t[e[1]]=t[e[0]]);});}function is(t){d(t,function(e,n){var i=[],r=[0/0,0/0],a=[e.stackResultDimension,e.stackedOverDimension],o=e.data,s=e.isStackedByIndex,l=o.map(a,function(a,l,u){var h=o.get(e.stackedDimension,u);if(isNaN(h))return r;var c,f;s?f=o.getRawIndex(u):c=o.get(e.stackedByDimension,u);for(var d=0/0,p=n-1;p>=0;p--){var g=t[p];if(s||(f=g.data.rawIndexOf(g.stackedByDimension,c)),f>=0){var v=g.data.getByRawIndex(g.stackResultDimension,f);if(h>=0&&v>0||0>=h&&0>v){h+=v,d=v;break;}}}return i[0]=h,i[1]=d,i;});o.hostModel.setData(l),e.data=l;});}function rs(t,e){yo.isInstance(t)||(t=yo.seriesDataToSource(t)),this._source=t;var n=this._data=t.data,i=t.sourceFormat;i===cv&&(this._offset=0,this._dimSize=e,this._data=n);var r=Ov[i===sv?i+"_"+t.seriesLayoutBy:i];o(this,r);}function as(){return this._data.length;}function os(t){return this._data[t];}function ss(t){for(var e=0;e<t.length;e++){this._data.push(t[e]);}}function ls(t,e,n){return null!=n?t[n]:t;}function us(t,e,n,i){return hs(t[i],this._dimensionInfos[e]);}function hs(t,e){var n=e&&e.type;if("ordinal"===n){var i=e&&e.ordinalMeta;return i?i.parseAndCollect(t):t;}return"time"===n&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+Xa(t)),null==t||""===t?0/0:+t;}function cs(t,e,n){if(t){var i=t.getRawDataItem(e);if(null!=i){var r,a,o=t.getProvider().getSource().sourceFormat,s=t.getDimensionInfo(n);return s&&(r=s.name,a=s.index),Ev[o](i,e,a,r);}}}function fs(t){return new ds(t);}function ds(t){t=t||{},this._reset=t.reset,this._plan=t.plan,this._count=t.count,this._onDirty=t.onDirty,this._dirty=!0,this.context;}function ps(t,e,n,i,r,a){Fv.reset(n,i,r,a),t._callingProgress=e,t._callingProgress({start:n,end:i,count:i-n,next:Fv.next},t.context);}function gs(t,e){t._dueIndex=t._outputDueEnd=t._dueEnd=0,t._settedOutputEnd=null;var n,i;!e&&t._reset&&(n=t._reset(t.context),n&&n.progress&&(i=n.forceFirstProgress,n=n.progress),x(n)&&!n.length&&(n=null)),t._progress=n,t._modBy=t._modDataCount=null;var r=t._downstream;return r&&r.dirty(),i;}function vs(t){var e=t.name;Bi(t)||(t.name=ms(t)||e);}function ms(t){var e=t.getRawData(),n=e.mapDimension("seriesName",!0),i=[];return d(n,function(t){var n=e.getDimensionInfo(t);n.displayName&&i.push(n.displayName);}),i.join(" ");}function ys(t){return t.model.getRawData().count();}function _s(t){var e=t.model;return e.setData(e.getRawData().cloneShallow()),xs;}function xs(t,e){t.end>e.outputData.count()&&e.model.getRawData().cloneShallow(e.outputData);}function ws(t,e){d(t.CHANGABLE_METHODS,function(n){t.wrapMethod(n,_(bs,e));});}function bs(t){var e=Ms(t);e&&e.setOutputEnd(this.count());}function Ms(t){var e=(t.ecModel||{}).scheduler,n=e&&e.getPipeline(t.uid);if(n){var i=n.currentTask;if(i){var r=i.agentStubMap;r&&(i=r.get(t.uid));}return i;}}function Ss(){this.group=new Xf(),this.uid=Oa("viewChart"),this.renderTask=fs({plan:Ds,reset:Ts}),this.renderTask.context={view:this};}function Cs(t,e){if(t&&(t.trigger(e),"group"===t.type))for(var n=0;n<t.childCount();n++){Cs(t.childAt(n),e);}}function Is(t,e,n){var i=Fi(t,e);null!=i?d(Li(i),function(e){Cs(t.getItemGraphicEl(e),n);}):t.eachItemGraphicEl(function(t){Cs(t,n);});}function Ds(t){return Uv(t.model);}function Ts(t){var e=t.model,n=t.ecModel,i=t.api,r=t.payload,a=e.pipelineContext.progressiveRender,o=t.view,s=r&&qv(r).updateMethod,l=a?"incrementalPrepareRender":s&&o[s]?s:"render";return"render"!==l&&o[l](e,n,i,r),Yv[l];}function ks(t,e,n){function i(){h=new Date().getTime(),c=null,t.apply(o,s||[]);}var r,a,o,s,l,u=0,h=0,c=null;e=e||0;var f=function f(){r=new Date().getTime(),o=this,s=arguments;var t=l||e,f=l||n;l=null,a=r-(f?u:h)-t,clearTimeout(c),f?c=setTimeout(i,t):a>=0?i():c=setTimeout(i,-a),u=r;};return f.clear=function(){c&&(clearTimeout(c),c=null);},f.debounceNextCall=function(t){l=t;},f;}function As(t,e,n,i){this.ecInstance=t,this.api=e,this.unfinished;var n=this._dataProcessorHandlers=n.slice(),i=this._visualHandlers=i.slice();this._allHandlers=n.concat(i),this._stageTaskMap=N();}function Ls(t,e,n,i,r){function a(t,e){return t.setDirty&&(!t.dirtyMap||t.dirtyMap.get(e.__pipeline.id));}r=r||{};var o;d(e,function(e){if(!r.visualType||r.visualType===e.visualType){var s=t._stageTaskMap.get(e.uid),l=s.seriesTaskMap,u=s.overallTask;if(u){var h,c=u.agentStubMap;c.each(function(t){a(r,t)&&(t.dirty(),h=!0);}),h&&u.dirty(),em(u,i);var f=t.getPerformArgs(u,r.block);c.each(function(t){t.perform(f);}),o|=u.perform(f);}else l&&l.each(function(s){a(r,s)&&s.dirty();var l=t.getPerformArgs(s,r.block);l.skip=!e.performRawSeries&&n.isSeriesFiltered(s.context.model),em(s,i),o|=s.perform(l);});}}),t.unfinished|=o;}function Ps(t,e,n,i,r){function a(n){var a=n.uid,s=o.get(a)||o.set(a,fs({plan:Ns,reset:Fs,count:Hs}));s.context={model:n,ecModel:i,api:r,useClearVisual:e.isVisual&&!e.isLayout,plan:e.plan,reset:e.reset,scheduler:t},Ws(t,n,s);}var o=n.seriesTaskMap||(n.seriesTaskMap=N()),s=e.seriesType,l=e.getTargetSeries;e.createOnAllSeries?i.eachRawSeries(a):s?i.eachRawSeriesByType(s,a):l&&l(i,r).each(a);var u=t._pipelineMap;o.each(function(t,e){u.get(e)||(t.dispose(),o.removeKey(e));});}function Os(t,e,n,i,r){function a(e){var n=e.uid,i=s.get(n);i||(i=s.set(n,fs({reset:Rs,onDirty:Bs})),o.dirty()),i.context={model:e,overallProgress:h,modifyOutputEnd:c},i.agent=o,i.__block=h,Ws(t,e,i);}var o=n.overallTask=n.overallTask||fs({reset:Es});o.context={ecModel:i,api:r,overallReset:e.overallReset,scheduler:t};var s=o.agentStubMap=o.agentStubMap||N(),l=e.seriesType,u=e.getTargetSeries,h=!0,c=e.modifyOutputEnd;l?i.eachRawSeriesByType(l,a):u?u(i,r).each(a):(h=!1,d(i.getSeries(),a));var f=t._pipelineMap;s.each(function(t,e){f.get(e)||(t.dispose(),o.dirty(),s.removeKey(e));});}function Es(t){t.overallReset(t.ecModel,t.api,t.payload);}function Rs(t){return t.overallProgress&&zs;}function zs(){this.agent.dirty(),this.getDownstream().dirty();}function Bs(){this.agent&&this.agent.dirty();}function Ns(t){return t.plan&&t.plan(t.model,t.ecModel,t.api,t.payload);}function Fs(t){t.useClearVisual&&t.data.clearAllVisual();var e=t.resetDefines=Li(t.reset(t.model,t.ecModel,t.api,t.payload));return e.length>1?p(e,function(t,e){return Vs(e);}):nm;}function Vs(t){return function(e,n){var i=n.data,r=n.resetDefines[t];if(r&&r.dataEach)for(var a=e.start;a<e.end;a++){r.dataEach(i,a);}else r&&r.progress&&r.progress(e,i);};}function Hs(t){return t.data.count();}function Ws(t,e,n){var i=e.uid,r=t._pipelineMap.get(i);!r.head&&(r.head=n),r.tail&&r.tail.pipe(n),r.tail=n,n.__idxInPipeline=r.count++,n.__pipeline=r;}function Gs(t){im=null;try{t(rm,am);}catch(e){}return im;}function js(t,e){for(var n in e.prototype){t[n]=V;}}function qs(t){return function(e,n,i){e=e&&e.toLowerCase(),ff.prototype[t].call(this,e,n,i);};}function Us(){ff.call(this);}function Xs(t,e,n){function r(t,e){return t.__prio-e.__prio;}n=n||{},"string"==typeof e&&(e=Vm[e]),this.id,this.group,this._dom=t;var a="canvas",o=this._zr=Ii(t,{renderer:n.renderer||a,devicePixelRatio:n.devicePixelRatio,width:n.width,height:n.height});this._throttledZrFlush=ks(y(o.flush,o),17);var e=i(e);e&&Av(e,!0),this._theme=e,this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._coordSysMgr=new Fo();var s=this._api=cl(this);fn(Fm,r),fn(zm,r),this._scheduler=new As(this,s,zm,Fm),ff.call(this),this._messageCenter=new Us(),this._initEvents(),this.resize=y(this.resize,this),this._pendingActions=[],o.animation.on("frame",this._onframe,this),el(o,this),R(this);}function Ys(t,e,n){var i,r=this._model,a=this._coordSysMgr.getCoordinateSystems();e=Hi(r,e);for(var o=0;o<a.length;o++){var s=a[o];if(s[t]&&null!=(i=s[t](r,e,n)))return i;}}function Zs(t){var e=t._model,n=t._scheduler;n.restorePipelines(e),n.prepareStageTasks(),nl(t,"component",e,n),nl(t,"chart",e,n),n.plan();}function $s(t,e,n,i,r){function a(i){i&&i.__alive&&i[e]&&i[e](i.__model,o,t._api,n);}var o=t._model;if(!i)return void dm(t._componentsViews.concat(t._chartsViews),a);var s={};s[i+"Id"]=n[i+"Id"],s[i+"Index"]=n[i+"Index"],s[i+"Name"]=n[i+"Name"];var l={mainType:i,query:s};r&&(l.subType=r);var u=n.excludeSeriesId;null!=u&&(u=N(Li(u))),o&&o.eachComponent(l,function(e){u&&null!=u.get(e.id)||a(t["series"===i?"_chartsMap":"_componentsMap"][e.__viewId]);},t);}function Ks(t,e){var n=t._chartsMap,i=t._scheduler;e.eachSeries(function(t){i.updateStreamModes(t,n[t.__viewId]);});}function Qs(t,e){var n=t.type,i=t.escapeConnect,r=Em[n],a=r.actionInfo,l=(a.update||"update").split(":"),u=l.pop();l=null!=l[0]&&vm(l[0]),this[Tm]=!0;var h=[t],c=!1;t.batch&&(c=!0,h=p(t.batch,function(e){return e=s(o({},e),t),e.batch=null,e;}));var f,d=[],g="highlight"===n||"downplay"===n;dm(h,function(t){f=r.action(t,this._model,this._api),f=f||o({},t),f.type=a.event||f.type,d.push(f),g?$s(this,u,t,"series"):l&&$s(this,u,t,l.main,l.sub);},this),"none"===u||g||l||(this[km]?(Zs(this),Pm.update.call(this,t),this[km]=!1):Pm[u].call(this,t)),f=c?{type:a.event||n,escapeConnect:i,batch:d}:d[0],this[Tm]=!1,!e&&this._messageCenter.trigger(f.type,f);}function Js(t){for(var e=this._pendingActions;e.length;){var n=e.shift();Qs.call(this,n,t);}}function tl(t){!t&&this.trigger("updated");}function el(t,e){t.on("rendered",function(){e.trigger("rendered"),!t.animation.isFinished()||e[km]||e._scheduler.unfinished||e._pendingActions.length||e.trigger("finished");});}function nl(t,e,n,i){function r(t){var e="_ec_"+t.id+"_"+t.type,r=s[e];if(!r){var h=vm(t.type),c=a?Wv.getClass(h.main,h.sub):Ss.getClass(h.sub);r=new c(),r.init(n,u),s[e]=r,o.push(r),l.add(r.group);}t.__viewId=r.__id=e,r.__alive=!0,r.__model=t,r.group.__ecComponentInfo={mainType:t.mainType,index:t.componentIndex},!a&&i.prepareView(r,t,n,u);}for(var a="component"===e,o=a?t._componentsViews:t._chartsViews,s=a?t._componentsMap:t._chartsMap,l=t._zr,u=t._api,h=0;h<o.length;h++){o[h].__alive=!1;}a?n.eachComponent(function(t,e){"series"!==t&&r(e);}):n.eachSeries(r);for(var h=0;h<o.length;){var c=o[h];c.__alive?h++:(!a&&c.renderTask.dispose(),l.remove(c.group),c.dispose(n,u),o.splice(h,1),delete s[c.__id],c.__id=c.group.__ecComponentInfo=null);}}function il(t){t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette();});}function rl(t,e,n,i){al(t,e,n,i),dm(t._chartsViews,function(t){t.__alive=!1;}),ol(t,e,n,i),dm(t._chartsViews,function(t){t.__alive||t.remove(e,n);});}function al(t,e,n,i,r){dm(r||t._componentsViews,function(t){var r=t.__model;t.render(r,e,n,i),hl(r,t);});}function ol(t,e,n,i,r){var a,o=t._scheduler;e.eachSeries(function(e){var n=t._chartsMap[e.__viewId];n.__alive=!0;var s=n.renderTask;o.updatePayload(s,i),r&&r.get(e.uid)&&s.dirty(),a|=s.perform(o.getPerformArgs(s)),n.group.silent=!!e.get("silent"),hl(e,n),ul(e,n);}),o.unfinished|=a,ll(t._zr,e),Kv(t._zr.dom,e);}function sl(t,e){dm(Nm,function(n){n(t,e);});}function ll(t,e){var n=t.storage,i=0;n.traverse(function(t){t.isGroup||i++;}),i>e.get("hoverLayerThreshold")&&!Gc.node&&n.traverse(function(t){t.isGroup||(t.useHoverLayer=!0);});}function ul(t,e){var n=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||t.style.blend!==n&&t.setStyle("blend",n),t.eachPendingDisplayable&&t.eachPendingDisplayable(function(t){t.setStyle("blend",n);});});}function hl(t,e){var n=t.get("z"),i=t.get("zlevel");e.group.traverse(function(t){"group"!==t.type&&(null!=n&&(t.z=n),null!=i&&(t.zlevel=i));});}function cl(t){var e=t._coordSysMgr;return o(new No(t),{getCoordinateSystems:y(e.getCoordinateSystems,e),getComponentByElement:function getComponentByElement(e){for(;e;){var n=e.__ecComponentInfo;if(null!=n)return t._model.getComponent(n.mainType,n.index);e=e.parent;}}});}function fl(t){function e(t,e){for(var n=0;n<t.length;n++){var i=t[n];i[a]=e;}}var n=0,i=1,r=2,a="__connectUpdateStatus";dm(Rm,function(o,s){t._messageCenter.on(s,function(o){if(Gm[t.group]&&t[a]!==n){if(o&&o.escapeConnect)return;var s=t.makeActionFromEvent(o),l=[];dm(Wm,function(e){e!==t&&e.group===t.group&&l.push(e);}),e(l,n),dm(l,function(t){t[a]!==i&&t.dispatchAction(s);}),e(l,r);}});});}function dl(t,e,n){var i=ml(t);if(i)return i;var r=new Xs(t,e,n);return r.id="ec_"+jm++,Wm[r.id]=r,Gi(t,Um,r.id),fl(r),r;}function pl(t){if(x(t)){var e=t;t=null,dm(e,function(e){null!=e.group&&(t=e.group);}),t=t||"g_"+qm++,dm(e,function(e){e.group=t;});}return Gm[t]=!0,t;}function gl(t){Gm[t]=!1;}function vl(t){"string"==typeof t?t=Wm[t]:t instanceof Xs||(t=ml(t)),t instanceof Xs&&!t.isDisposed()&&t.dispose();}function ml(t){return Wm[ji(t,Um)];}function yl(t){return Wm[t];}function _l(t,e){Vm[t]=e;}function xl(t){Bm.push(t);}function wl(t,e){Tl(zm,t,e,xm);}function bl(t){Nm.push(t);}function Ml(t,e,n){"function"==typeof e&&(n=e,e="");var i=gm(t)?t.type:[t,t={event:e}][0];t.event=(t.event||i).toLowerCase(),e=t.event,fm(Am.test(i)&&Am.test(e)),Em[i]||(Em[i]={action:n,actionInfo:t}),Rm[e]=i;}function Sl(t,e){Fo.register(t,e);}function Cl(t){var e=Fo.get(t);return e?e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice():void 0;}function Il(t,e){Tl(Fm,t,e,bm,"layout");}function Dl(t,e){Tl(Fm,t,e,Sm,"visual");}function Tl(t,e,n,i,r){(pm(e)||gm(e))&&(n=e,e=i);var a=As.wrapStageHandler(n,r);return a.__prio=e,a.__raw=n,t.push(a),a;}function kl(t,e){Hm[t]=e;}function Al(t){return tv.extend(t);}function Ll(t){return Wv.extend(t);}function Pl(t){return Hv.extend(t);}function Ol(t){return Ss.extend(t);}function El(t){n("createCanvas",t);}function Rl(t,e,n){e.geoJson&&!e.features&&(n=e.specialAreas,e=e.geoJson),"string"==typeof e&&(e="undefined"!=typeof JSON&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")()),Xm[t]={geoJson:e,specialAreas:n};}function zl(t){return Xm[t];}function Bl(t){return t;}function Nl(t,e,n,i,r){this._old=t,this._new=e,this._oldKeyGetter=n||Bl,this._newKeyGetter=i||Bl,this.context=r;}function Fl(t,e,n,i,r){for(var a=0;a<t.length;a++){var o="_ec_"+r[i](t[a],a),s=e[o];null==s?(n.push(o),e[o]=a):(s.length||(e[o]=s=[s]),s.push(a));}}function Vl(t){var e={},n=e.encode={},i=N(),r=[],a=[];d(t.dimensions,function(e){var o=t.getDimensionInfo(e),s=o.coordDim;if(s){var l=n[s];n.hasOwnProperty(s)||(l=n[s]=[]),l[o.coordDimIndex]=e,o.isExtraCoord||(i.set(s,1),Wl(o.type)&&(r[0]=e)),o.defaultTooltip&&a.push(e);}$m.each(function(t,e){var i=n[e];n.hasOwnProperty(e)||(i=n[e]=[]);var r=o.otherDims[e];null!=r&&r!==!1&&(i[r]=o.name);});});var o=[],s={};i.each(function(t,e){var i=n[e];s[e]=i[0],o=o.concat(i);}),e.dataDimsOnCoord=o,e.encodeFirstDimNotExtra=s;var l=n.label;l&&l.length&&(r=l.slice());var u=n.tooltip;return u&&u.length?a=u.slice():a.length||(a=r.slice()),n.defaultedLabel=r,n.defaultedTooltip=a,e;}function Hl(t){return"category"===t?"ordinal":"time"===t?"time":"float";}function Wl(t){return!("ordinal"===t||"time"===t);}function Gl(t){return t._rawCount>65535?ey:ny;}function jl(t){var e=t.constructor;return e===Array?t.slice():new e(t);}function ql(t,e){d(iy.concat(e.__wrappedMethods||[]),function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t.__wrappedMethods=e.__wrappedMethods,d(ry,function(n){t[n]=i(e[n]);}),t._calculationInfo=o(e._calculationInfo);}function Ul(t){var e=t._invertedIndicesMap;d(e,function(n,i){var r=t._dimensionInfos[i],a=r.ordinalMeta;if(a){n=e[i]=new ey(a.categories.length);for(var o=0;o<n.length;o++){n[o]=0/0;}for(var o=0;o<t._count;o++){n[t.get(i,o)]=o;}}});}function Xl(t,e,n){var i;if(null!=e){var r=t._chunkSize,a=Math.floor(n/r),o=n%r,s=t.dimensions[e],l=t._storage[s][a];if(l){i=l[o];var u=t._dimensionInfos[s].ordinalMeta;u&&u.categories.length&&(i=u.categories[i]);}}return i;}function Yl(t){return t;}function Zl(t){return t<this._count&&t>=0?this._indices[t]:-1;}function $l(t,e){var n=t._idList[e];return null==n&&(n=Xl(t,t._idDimIdx,e)),null==n&&(n=Jm+e),n;}function Kl(t){return x(t)||(t=[t]),t;}function Ql(t,e){var n=t.dimensions,i=new ay(p(n,t.getDimensionInfo,t),t.hostModel);ql(i,t);for(var r=i._storage={},a=t._storage,o=0;o<n.length;o++){var s=n[o];a[s]&&(u(e,s)>=0?(r[s]=Jl(a[s]),i._rawExtent[s]=tu(),i._extent[s]=null):r[s]=a[s]);}return i;}function Jl(t){for(var e=new Array(t.length),n=0;n<t.length;n++){e[n]=jl(t[n]);}return e;}function tu(){return[1/0,-1/0];}function eu(t,e,n){function r(t,e,n){null!=$m.get(e)?t.otherDims[e]=n:(t.coordDim=e,t.coordDimIndex=n,h.set(e,!0));}yo.isInstance(e)||(e=yo.seriesDataToSource(e)),n=n||{},t=(t||[]).slice();for(var a=(n.dimsDef||[]).slice(),l=N(n.encodeDef),u=N(),h=N(),c=[],f=nu(e,t,a,n.dimCount),p=0;f>p;p++){var g=a[p]=o({},M(a[p])?a[p]:{name:a[p]}),v=g.name,m=c[p]={otherDims:{}};null!=v&&null==u.get(v)&&(m.name=m.displayName=v,u.set(v,p)),null!=g.type&&(m.type=g.type),null!=g.displayName&&(m.displayName=g.displayName);}l.each(function(t,e){t=Li(t).slice();var n=l.set(e,[]);d(t,function(t,i){b(t)&&(t=u.get(t)),null!=t&&f>t&&(n[i]=t,r(c[t],e,i));});});var y=0;d(t,function(t){var e,t,n,a;if(b(t))e=t,t={};else{e=t.name;var o=t.ordinalMeta;t.ordinalMeta=null,t=i(t),t.ordinalMeta=o,n=t.dimsDef,a=t.otherDims,t.name=t.coordDim=t.coordDimIndex=t.dimsDef=t.otherDims=null;}var u=Li(l.get(e));if(!u.length)for(var h=0;h<(n&&n.length||1);h++){for(;y<c.length&&null!=c[y].coordDim;){y++;}y<c.length&&u.push(y++);}d(u,function(i,o){var l=c[i];if(r(s(l,t),e,o),null==l.name&&n){var u=n[o];!M(u)&&(u={name:u}),l.name=l.displayName=u.name,l.defaultTooltip=u.defaultTooltip;}a&&s(l.otherDims,a);});});var _=n.generateCoord,x=n.generateCoordCount,w=null!=x;x=_?x||1:0;for(var S=_||"value",C=0;f>C;C++){var m=c[C]=c[C]||{},I=m.coordDim;null==I&&(m.coordDim=iu(S,h,w),m.coordDimIndex=0,(!_||0>=x)&&(m.isExtraCoord=!0),x--),null==m.name&&(m.name=iu(m.coordDim,u)),null==m.type&&ko(e,C,m.name)&&(m.type="ordinal");}return c;}function nu(t,e,n,i){var r=Math.max(t.dimensionsDetectCount||1,e.length,n.length,i||0);return d(e,function(t){var e=t.dimsDef;e&&(r=Math.max(r,e.length));}),r;}function iu(t,e,n){if(n||null!=e.get(t)){for(var i=0;null!=e.get(t+i);){i++;}t+=i;}return e.set(t,!0),t;}function ru(t,e,n){n=n||{};var i,r,a,o,s=n.byIndex,l=n.stackedCoordDimension,u=!(!t||!t.get("stack"));if(d(e,function(t,n){b(t)&&(e[n]=t={name:t}),u&&!t.isExtraCoord&&(s||i||!t.ordinalMeta||(i=t),r||"ordinal"===t.type||"time"===t.type||l&&l!==t.coordDim||(r=t));}),!r||s||i||(s=!0),r){a="__\x00ecstackresult",o="__\x00ecstackedover",i&&(i.createInvertedIndices=!0);var h=r.coordDim,c=r.type,f=0;d(e,function(t){t.coordDim===h&&f++;}),e.push({name:a,coordDim:h,coordDimIndex:f,type:c,isExtraCoord:!0,isCalculationCoord:!0}),f++,e.push({name:o,coordDim:o,coordDimIndex:f,type:c,isExtraCoord:!0,isCalculationCoord:!0});}return{stackedDimension:r&&r.name,stackedByDimension:i&&i.name,isStackedByIndex:s,stackedOverDimension:o,stackResultDimension:a};}function au(t,e){return!!e&&e===t.getCalculationInfo("stackedDimension");}function ou(t,e){return au(t,e)?t.getCalculationInfo("stackResultDimension"):e;}function su(t,e,n){n=n||{},yo.isInstance(t)||(t=yo.seriesDataToSource(t));var i,r=e.get("coordinateSystem"),a=Fo.get(r),o=vo(e);o&&(i=p(o.coordSysDims,function(t){var e={name:t},n=o.axisMap.get(t);if(n){var i=n.get("type");e.type=Hl(i);}return e;})),i||(i=a&&(a.getDimensionsInfo?a.getDimensionsInfo():a.dimensions.slice())||["x","y"]);var s,l,u=ly(t,{coordDimensions:i,generateCoord:n.generateCoord});o&&d(u,function(t,e){var n=t.coordDim,i=o.categoryAxisMap.get(n);i&&(null==s&&(s=e),t.ordinalMeta=i.getOrdinalMeta()),null!=t.otherDims.itemName&&(l=!0);}),l||null==s||(u[s].otherDims.itemName=0);var h=ru(e,u),c=new ay(u,e);c.setCalculationInfo(h);var f=null!=s&&lu(t)?function(t,e,n,i){return i===s?n:this.defaultDimValueGetter(t,e,n,i);}:null;return c.hasItemOption=!1,c.initData(t,null,f),c;}function lu(t){if(t.sourceFormat===ov){var e=uu(t.data||[]);return null!=e&&!x(Oi(e));}}function uu(t){for(var e=0;e<t.length&&null==t[e];){e++;}return t[e];}function hu(t){this._setting=t||{},this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments);}function cu(t){this.categories=t.categories||[],this._needCollect=t.needCollect,this._deduplication=t.deduplication,this._map;}function fu(t){return t._map||(t._map=N(t.categories));}function du(t){return M(t)&&null!=t.value?t.value:t+"";}function pu(t,e,n,i){var r={},a=t[1]-t[0],o=r.interval=$a(a/e,!0);null!=n&&n>o&&(o=r.interval=n),null!=i&&o>i&&(o=r.interval=i);var s=r.intervalPrecision=gu(o),l=r.niceTickExtent=[fy(Math.ceil(t[0]/o)*o,s),fy(Math.floor(t[1]/o)*o,s)];return mu(l,t),r;}function gu(t){return Wa(t)+2;}function vu(t,e,n){t[e]=Math.max(Math.min(t[e],n[1]),n[0]);}function mu(t,e){!isFinite(t[0])&&(t[0]=e[0]),!isFinite(t[1])&&(t[1]=e[1]),vu(t,0,e),vu(t,1,e),t[0]>t[1]&&(t[0]=t[1]);}function yu(t,e,n,i){var r=[];if(!t)return r;var a=1e4;e[0]<n[0]&&r.push(e[0]);for(var o=n[0];o<=n[1]&&(r.push(o),o=fy(o+t,i),o!==r[r.length-1]);){if(r.length>a)return[];}return e[1]>(r.length?r[r.length-1]:n[1])&&r.push(e[1]),r;}function _u(t){return t.get("stack")||gy+t.seriesIndex;}function xu(t){return t.dim+t.index;}function wu(t,e){var n=[];return e.eachSeriesByType(t,function(t){Cu(t)&&!Iu(t)&&n.push(t);}),n;}function bu(t){var e=[];return d(t,function(t){var n=t.getData(),i=t.coordinateSystem,r=i.getBaseAxis(),a=r.getExtent(),o="category"===r.type?r.getBandWidth():Math.abs(a[1]-a[0])/n.count(),s=Na(t.get("barWidth"),o),l=Na(t.get("barMaxWidth"),o),u=t.get("barGap"),h=t.get("barCategoryGap");e.push({bandWidth:o,barWidth:s,barMaxWidth:l,barGap:u,barCategoryGap:h,axisKey:xu(r),stackId:_u(t)});}),Mu(e);}function Mu(t){var e={};d(t,function(t){var n=t.axisKey,i=t.bandWidth,r=e[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},a=r.stacks;e[n]=r;var o=t.stackId;a[o]||r.autoWidthCount++,a[o]=a[o]||{width:0,maxWidth:0};var s=t.barWidth;s&&!a[o].width&&(a[o].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=t.barMaxWidth;l&&(a[o].maxWidth=l);var u=t.barGap;null!=u&&(r.gap=u);var h=t.barCategoryGap;null!=h&&(r.categoryGap=h);});var n={};return d(e,function(t,e){n[e]={};var i=t.stacks,r=t.bandWidth,a=Na(t.categoryGap,r),o=Na(t.gap,1),s=t.remainedWidth,l=t.autoWidthCount,u=(s-a)/(l+(l-1)*o);u=Math.max(u,0),d(i,function(t){var e=t.maxWidth;e&&u>e&&(e=Math.min(e,s),t.width&&(e=Math.min(e,t.width)),s-=e,t.width=e,l--);}),u=(s-a)/(l+(l-1)*o),u=Math.max(u,0);var h,c=0;d(i,function(t){t.width||(t.width=u),h=t,c+=t.width*(1+o);}),h&&(c-=h.width*o);var f=-c/2;d(i,function(t,i){n[e][i]=n[e][i]||{offset:f,width:t.width},f+=t.width*(1+o);});}),n;}function Su(t,e,n){if(t&&e){var i=t[xu(e)];return null!=i&&null!=n&&(i=i[_u(n)]),i;}}function Cu(t){return t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type;}function Iu(t){return t.pipelineContext&&t.pipelineContext.large;}function Du(t,e,n){return u(t.getAxesOnZeroOf(),e)>=0||n?e.toGlobalCoord(e.dataToCoord(0)):e.getGlobalExtent()[0];}function Tu(t,e){return Ly(t,Ay(e));}function ku(t,e){var n,i,r,a=t.type,o=e.getMin(),s=e.getMax(),l=null!=o,u=null!=s,h=t.getExtent();"ordinal"===a?n=e.getCategories().length:(i=e.get("boundaryGap"),x(i)||(i=[i||0,i||0]),"boolean"==typeof i[0]&&(i=[0,0]),i[0]=Na(i[0],1),i[1]=Na(i[1],1),r=h[1]-h[0]||Math.abs(h[0])),null==o&&(o="ordinal"===a?n?0:0/0:h[0]-i[0]*r),null==s&&(s="ordinal"===a?n?n-1:0/0:h[1]+i[1]*r),"dataMin"===o?o=h[0]:"function"==typeof o&&(o=o({min:h[0],max:h[1]})),"dataMax"===s?s=h[1]:"function"==typeof s&&(s=s({min:h[0],max:h[1]})),(null==o||!isFinite(o))&&(o=0/0),(null==s||!isFinite(s))&&(s=0/0),t.setBlank(D(o)||D(s)||"ordinal"===a&&!t.getOrdinalMeta().categories.length),e.getNeedCrossZero()&&(o>0&&s>0&&!l&&(o=0),0>o&&0>s&&!u&&(s=0));var c=e.ecModel;if(c&&"time"===a){var f,p=wu("bar",c);if(d(p,function(t){f|=t.getBaseAxis()===e.axis;}),f){var g=bu(p),v=Au(o,s,e,g);o=v.min,s=v.max;}}return[o,s];}function Au(t,e,n,i){var r=n.axis.getExtent(),a=r[1]-r[0],o=Su(i,n.axis);if(void 0===o)return{min:t,max:e};var s=1/0;d(o,function(t){s=Math.min(t.offset,s);});var l=-1/0;d(o,function(t){l=Math.max(t.offset+t.width,l);}),s=Math.abs(s),l=Math.abs(l);var u=s+l,h=e-t,c=1-(s+l)/a,f=h/c-h;return e+=f*(l/u),t-=f*(s/u),{min:t,max:e};}function Lu(t,e){var n=ku(t,e),i=null!=e.getMin(),r=null!=e.getMax(),a=e.get("splitNumber");"log"===t.type&&(t.base=e.get("logBase"));var o=t.type;t.setExtent(n[0],n[1]),t.niceExtent({splitNumber:a,fixMin:i,fixMax:r,minInterval:"interval"===o||"time"===o?e.get("minInterval"):null,maxInterval:"interval"===o||"time"===o?e.get("maxInterval"):null});var s=e.get("interval");null!=s&&t.setInterval&&t.setInterval(s);}function Pu(t,e){if(e=e||t.get("type"))switch(e){case"category":return new cy(t.getOrdinalMeta?t.getOrdinalMeta():t.getCategories(),[1/0,-1/0]);case"value":return new py();default:return(hu.getClass(e)||py).create(t);}}function Ou(t){var e=t.scale.getExtent(),n=e[0],i=e[1];return!(n>0&&i>0||0>n&&0>i);}function Eu(t){var e=t.getLabelModel().get("formatter"),n="category"===t.type?t.scale.getExtent()[0]:null;return"string"==typeof e?e=function(t){return function(e){return t.replace("{value}",null!=e?e:"");};}(e):"function"==typeof e?function(i,r){return null!=n&&(r=i-n),e(Ru(t,i),r);}:function(e){return t.scale.getLabel(e);};}function Ru(t,e){return"category"===t.type?t.scale.getLabel(e):e;}function zu(t){var e=t.model,n=t.scale;if(e.get("axisLabel.show")&&!n.isBlank()){var i,r,a="category"===t.type,o=n.getExtent();a?r=n.count():(i=n.getTicks(),r=i.length);var s,l=t.getLabelModel(),u=Eu(t),h=1;r>40&&(h=Math.ceil(r/40));for(var c=0;r>c;c+=h){var f=i?i[c]:o[0]+c,d=u(f),p=l.getTextRect(d),g=Bu(p,l.get("rotate")||0);s?s.union(g):s=g;}return s;}}function Bu(t,e){var n=e*Math.PI/180,i=t.plain(),r=i.width,a=i.height,o=r*Math.cos(n)+a*Math.sin(n),s=r*Math.sin(n)+a*Math.cos(n),l=new rn(i.x,i.y,o,s);return l;}function Nu(t,e){if("image"!==this.type){var n=this.style,i=this.shape;i&&"line"===i.symbolType?n.stroke=t:this.__isEmptyBrush?(n.stroke=t,n.fill=e||"#fff"):(n.fill&&(n.fill=t),n.stroke&&(n.stroke=t)),this.dirty(!1);}}function Fu(t,e,n,i,r,a,o){var s=0===t.indexOf("empty");s&&(t=t.substr(5,1).toLowerCase()+t.substr(6));var l;return l=0===t.indexOf("image://")?qr(t.slice(8),new rn(e,n,i,r),o?"center":"cover"):0===t.indexOf("path://")?jr(t.slice(7),{},new rn(e,n,i,r),o?"center":"cover"):new qy({shape:{symbolType:t,x:e,y:n,width:i,height:r}}),l.__isEmptyBrush=s,l.setColor=Nu,l.setColor(a),l;}function Vu(t){return su(t.getSource(),t);}function Hu(t,e){var n=e;Aa.isInstance(e)||(n=new Aa(e),c(n,By));var i=Pu(n);return i.setExtent(t[0],t[1]),Lu(i,n),i;}function Wu(t){c(t,By);}function Gu(t,e){return Math.abs(t-e)<Yy;}function ju(t,e,n){var i=0,r=t[0];if(!r)return!1;for(var a=1;a<t.length;a++){var o=t[a];i+=br(r[0],r[1],o[0],o[1],e,n),r=o;}var s=t[0];return Gu(r[0],s[0])&&Gu(r[1],s[1])||(i+=br(r[0],r[1],s[0],s[1],e,n)),0!==i;}function qu(t,e,n){if(this.name=t,this.geometries=e,n)n=[n[0],n[1]];else{var i=this.getBoundingRect();n=[i.x+i.width/2,i.y+i.height/2];}this.center=n;}function Uu(t){if(!t.UTF8Encoding)return t;var e=t.UTF8Scale;null==e&&(e=1024);for(var n=t.features,i=0;i<n.length;i++){for(var r=n[i],a=r.geometry,o=a.coordinates,s=a.encodeOffsets,l=0;l<o.length;l++){var u=o[l];if("Polygon"===a.type)o[l]=Xu(u,s[l],e);else if("MultiPolygon"===a.type)for(var h=0;h<u.length;h++){var c=u[h];u[h]=Xu(c,s[l][h],e);}}}return t.UTF8Encoding=!1,t;}function Xu(t,e,n){for(var i=[],r=e[0],a=e[1],o=0;o<t.length;o+=2){var s=t.charCodeAt(o)-64,l=t.charCodeAt(o+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),s+=r,l+=a,r=s,a=l,i.push([s/n,l/n]);}return i;}function Yu(t){return"category"===t.type?$u(t):Ju(t);}function Zu(t,e){return"category"===t.type?Qu(t,e):{ticks:t.scale.getTicks()};}function $u(t){var e=t.getLabelModel(),n=Ku(t,e);return!e.get("show")||t.scale.isBlank()?{labels:[],labelCategoryInterval:n.labelCategoryInterval}:n;}function Ku(t,e){var n=th(t,"labels"),i=lh(e),r=eh(n,i);if(r)return r;var a,o;return w(i)?a=sh(t,i):(o="auto"===i?ih(t):i,a=oh(t,o)),nh(n,i,{labels:a,labelCategoryInterval:o});}function Qu(t,e){var n=th(t,"ticks"),i=lh(e),r=eh(n,i);if(r)return r;var a,o;if((!e.get("show")||t.scale.isBlank())&&(a=[]),w(i))a=sh(t,i,!0);else if("auto"===i){var s=Ku(t,t.getLabelModel());o=s.labelCategoryInterval,a=p(s.labels,function(t){return t.tickValue;});}else o=i,a=oh(t,o,!0);return nh(n,i,{ticks:a,tickCategoryInterval:o});}function Ju(t){var e=t.scale.getTicks(),n=Eu(t);return{labels:p(e,function(e,i){return{formattedLabel:n(e,i),rawLabel:t.scale.getLabel(e),tickValue:e};})};}function th(t,e){return $y(t)[e]||($y(t)[e]=[]);}function eh(t,e){for(var n=0;n<t.length;n++){if(t[n].key===e)return t[n].value;}}function nh(t,e,n){return t.push({key:e,value:n}),n;}function ih(t){var e=$y(t).autoInterval;return null!=e?e:$y(t).autoInterval=t.calculateCategoryInterval();}function rh(t){var e=ah(t),n=Eu(t),i=(e.axisRotate-e.labelRotate)/180*Math.PI,r=t.scale,a=r.getExtent(),o=r.count();if(a[1]-a[0]<1)return 0;var s=1;o>40&&(s=Math.max(1,Math.floor(o/40)));for(var l=a[0],u=t.dataToCoord(l+1)-t.dataToCoord(l),h=Math.abs(u*Math.cos(i)),c=Math.abs(u*Math.sin(i)),f=0,d=0;l<=a[1];l+=s){var p=0,g=0,v=Mn(n(l),e.font,"center","top");p=1.3*v.width,g=1.3*v.height,f=Math.max(f,p,7),d=Math.max(d,g,7);}var m=f/h,y=d/c;isNaN(m)&&(m=1/0),isNaN(y)&&(y=1/0);var _=Math.max(0,Math.floor(Math.min(m,y))),x=$y(t.model),w=x.lastAutoInterval,b=x.lastTickCount;return null!=w&&null!=b&&Math.abs(w-_)<=1&&Math.abs(b-o)<=1&&w>_?_=w:(x.lastTickCount=o,x.lastAutoInterval=_),_;}function ah(t){var e=t.getLabelModel();return{axisRotate:t.getRotate?t.getRotate():t.isHorizontal&&!t.isHorizontal()?90:0,labelRotate:e.get("rotate")||0,font:e.getFont()};}function oh(t,e,n){function i(t){l.push(n?t:{formattedLabel:r(t),rawLabel:a.getLabel(t),tickValue:t});}var r=Eu(t),a=t.scale,o=a.getExtent(),s=t.getLabelModel(),l=[],u=Math.max((e||0)+1,1),h=o[0],c=a.count();0!==h&&u>1&&c/u>2&&(h=Math.round(Math.ceil(h/u)*u));var f={min:s.get("showMinLabel"),max:s.get("showMaxLabel")};f.min&&h!==o[0]&&i(o[0]);for(var d=h;d<=o[1];d+=u){i(d);}return f.max&&d!==o[1]&&i(o[1]),l;}function sh(t,e,n){var i=t.scale,r=Eu(t),a=[];return d(i.getTicks(),function(t){var o=i.getLabel(t);e(t,o)&&a.push(n?t:{formattedLabel:r(t),rawLabel:o,tickValue:t});}),a;}function lh(t){var e=t.get("interval");return null==e?"auto":e;}function uh(t,e){var n=t[1]-t[0],i=e,r=n/i/2;t[0]+=r,t[1]-=r;}function hh(t,e,n,i,r){function a(t,e){return h?t>e:e>t;}var o=e.length;if(t.onBand&&!i&&o){var s,l=t.getExtent();if(1===o)e[0].coord=l[0],s=e[1]={coord:l[0]};else{var u=e[1].coord-e[0].coord;d(e,function(t){t.coord-=u/2;var e=e||0;e%2>0&&(t.coord-=u/(2*(e+1)));}),s={coord:e[o-1].coord+u},e.push(s);}var h=l[0]>l[1];a(e[0].coord,l[0])&&(r?e[0].coord=l[0]:e.shift()),r&&a(l[0],e[0].coord)&&e.unshift({coord:l[0]}),a(l[1],s.coord)&&(r?s.coord=l[1]:e.pop()),r&&a(s.coord,l[1])&&e.push({coord:l[1]});}}function ch(t,e){var n=t.mapDimension("defaultedLabel",!0),i=n.length;if(1===i)return cs(t,e,n[0]);if(i){for(var r=[],a=0;a<n.length;a++){var o=cs(t,e,n[a]);r.push(o);}return r.join(" ");}}function fh(t,e,n){Xf.call(this),this.updateData(t,e,n);}function dh(t){return[t[0]/2,t[1]/2];}function ph(t,e){this.parent.drift(t,e);}function gh(t){this.group=new Xf(),this._symbolCtor=t||fh;}function vh(t,e,n,i){return!(!e||isNaN(e[0])||isNaN(e[1])||i.isIgnore&&i.isIgnore(n)||i.clipShape&&!i.clipShape.contain(e[0],e[1])||"none"===t.getItemVisual(n,"symbol"));}function mh(t){return null==t||M(t)||(t={isIgnore:t}),t||{};}function yh(t){var e=t.hostModel;return{itemStyle:e.getModel("itemStyle").getItemStyle(["color"]),hoverItemStyle:e.getModel("emphasis.itemStyle").getItemStyle(),symbolRotate:e.get("symbolRotate"),symbolOffset:e.get("symbolOffset"),hoverAnimation:e.get("hoverAnimation"),labelModel:e.getModel("label"),hoverLabelModel:e.getModel("emphasis.label"),cursorStyle:e.get("cursor")};}function _h(t,e,n){var i,r=t.getBaseAxis(),a=t.getOtherAxis(r),o=xh(a,n),s=r.dim,l=a.dim,u=e.mapDimension(l),h=e.mapDimension(s),c="x"===l||"radius"===l?1:0,f=p(t.dimensions,function(t){return e.mapDimension(t);}),d=e.getCalculationInfo("stackResultDimension");return(i|=au(e,f[0]))&&(f[0]=d),(i|=au(e,f[1]))&&(f[1]=d),{dataDimsForPoint:f,valueStart:o,valueAxisDim:l,baseAxisDim:s,stacked:!!i,valueDim:u,baseDim:h,baseDataOffset:c,stackedOverDimension:e.getCalculationInfo("stackedOverDimension")};}function xh(t,e){var n=0,i=t.scale.getExtent();return"start"===e?n=i[0]:"end"===e?n=i[1]:i[0]>0?n=i[0]:i[1]<0&&(n=i[1]),n;}function wh(t,e,n,i){var r=0/0;t.stacked&&(r=n.get(n.getCalculationInfo("stackedOverDimension"),i)),isNaN(r)&&(r=t.valueStart);var a=t.baseDataOffset,o=[];return o[a]=n.get(t.baseDim,i),o[1-a]=r,e.dataToPoint(o);}function bh(t,e){var n=[];return e.diff(t).add(function(t){n.push({cmd:"+",idx:t});}).update(function(t,e){n.push({cmd:"=",idx:e,idx1:t});}).remove(function(t){n.push({cmd:"-",idx:t});}).execute(),n;}function Mh(t){return isNaN(t[0])||isNaN(t[1]);}function Sh(t,e,n,i,r,a,o,s,l,u){return"none"!==u&&u?Ch.apply(this,arguments):Ih.apply(this,arguments);}function Ch(t,e,n,i,r,a,o,s,l,u,h){for(var c=0,f=n,d=0;i>d;d++){var p=e[f];if(f>=r||0>f)break;if(Mh(p)){if(h){f+=a;continue;}break;}if(f===n)t[a>0?"moveTo":"lineTo"](p[0],p[1]);else if(l>0){var g=e[c],v="y"===u?1:0,m=(p[v]-g[v])*l;f_(p_,g),p_[v]=g[v]+m,f_(g_,p),g_[v]=p[v]-m,t.bezierCurveTo(p_[0],p_[1],g_[0],g_[1],p[0],p[1]);}else t.lineTo(p[0],p[1]);c=f,f+=a;}return d;}function Ih(t,e,n,i,r,a,o,s,l,u,h){for(var c=0,f=n,d=0;i>d;d++){var p=e[f];if(f>=r||0>f)break;if(Mh(p)){if(h){f+=a;continue;}break;}if(f===n)t[a>0?"moveTo":"lineTo"](p[0],p[1]),f_(p_,p);else if(l>0){var g=f+a,v=e[g];if(h)for(;v&&Mh(e[g]);){g+=a,v=e[g];}var m=.5,y=e[c],v=e[g];if(!v||Mh(v))f_(g_,p);else{Mh(v)&&!h&&(v=p),X(d_,v,y);var _,x;if("x"===u||"y"===u){var w="x"===u?0:1;_=Math.abs(p[w]-y[w]),x=Math.abs(p[w]-v[w]);}else _=lf(p,y),x=lf(p,v);m=x/(x+_),c_(g_,p,d_,-l*(1-m));}u_(p_,p_,s),h_(p_,p_,o),u_(g_,g_,s),h_(g_,g_,o),t.bezierCurveTo(p_[0],p_[1],g_[0],g_[1],p[0],p[1]),c_(p_,p,d_,l*m);}else t.lineTo(p[0],p[1]);c=f,f+=a;}return d;}function Dh(t,e){var n=[1/0,1/0],i=[-1/0,-1/0];if(e)for(var r=0;r<t.length;r++){var a=t[r];a[0]<n[0]&&(n[0]=a[0]),a[1]<n[1]&&(n[1]=a[1]),a[0]>i[0]&&(i[0]=a[0]),a[1]>i[1]&&(i[1]=a[1]);}return{min:e?n:i,max:e?i:n};}function Th(t,e){if(t.length===e.length){for(var n=0;n<t.length;n++){var i=t[n],r=e[n];if(i[0]!==r[0]||i[1]!==r[1])return;}return!0;}}function kh(t){return"number"==typeof t?t:t?.5:0;}function Ah(t){var e=t.getGlobalExtent();if(t.onBand){var n=t.getBandWidth()/2-1,i=e[1]>e[0]?1:-1;e[0]+=i*n,e[1]-=i*n;}return e;}function Lh(t,e,n){if(!n.valueDim)return[];for(var i=[],r=0,a=e.count();a>r;r++){i.push(wh(n,t,e,r));}return i;}function Ph(t,e,n,i){var r=Ah(t.getAxis("x")),a=Ah(t.getAxis("y")),o=t.getBaseAxis().isHorizontal(),s=Math.min(r[0],r[1]),l=Math.min(a[0],a[1]),u=Math.max(r[0],r[1])-s,h=Math.max(a[0],a[1])-l;if(n)s-=.5,u+=.5,l-=.5,h+=.5;else{var c=i.get("lineStyle.width")||2,f=i.get("clipOverflow")?c/2:Math.max(u,h);o?(l-=f,h+=2*f):(s-=f,u+=2*f);}var d=new pg({shape:{x:s,y:l,width:u,height:h}});return e&&(d.shape[o?"width":"height"]=0,ba(d,{shape:{width:u,height:h}},i)),d;}function Oh(t,e,n,i){var r=t.getAngleAxis(),a=t.getRadiusAxis(),o=a.getExtent().slice();o[0]>o[1]&&o.reverse();var s=r.getExtent(),l=Math.PI/180;n&&(o[0]-=.5,o[1]+=.5);var u=new lg({shape:{cx:Fa(t.cx,1),cy:Fa(t.cy,1),r0:Fa(o[0],1),r:Fa(o[1],1),startAngle:-s[0]*l,endAngle:-s[1]*l,clockwise:r.inverse}});return e&&(u.shape.endAngle=-s[0]*l,ba(u,{shape:{endAngle:-s[1]*l}},i)),u;}function Eh(t,e,n,i){return"polar"===t.type?Oh(t,e,n,i):Ph(t,e,n,i);}function Rh(t,e,n){for(var i=e.getBaseAxis(),r="x"===i.dim||"radius"===i.dim?0:1,a=[],o=0;o<t.length-1;o++){var s=t[o+1],l=t[o];a.push(l);var u=[];switch(n){case"end":u[r]=s[r],u[1-r]=l[1-r],a.push(u);break;case"middle":var h=(l[r]+s[r])/2,c=[];u[r]=c[r]=h,u[1-r]=l[1-r],c[1-r]=s[1-r],a.push(u),a.push(c);break;default:u[r]=l[r],u[1-r]=s[1-r],a.push(u);}}return t[o]&&a.push(t[o]),a;}function zh(t,e){var n=t.getVisual("visualMeta");if(n&&n.length&&t.count()&&"cartesian2d"===e.type){for(var i,r,a=n.length-1;a>=0;a--){var o=n[a].dimension,s=t.dimensions[o],l=t.getDimensionInfo(s);if(i=l&&l.coordDim,"x"===i||"y"===i){r=n[a];break;}}if(r){var u=e.getAxis(i),h=p(r.stops,function(t){return{coord:u.toGlobalCoord(u.dataToCoord(t.value)),color:t.color};}),c=h.length,f=r.outerColors.slice();c&&h[0].coord>h[c-1].coord&&(h.reverse(),f.reverse());var g=10,v=h[0].coord-g,m=h[c-1].coord+g,y=m-v;if(.001>y)return"transparent";d(h,function(t){t.offset=(t.coord-v)/y;}),h.push({offset:c?h[c-1].offset:.5,color:f[1]||"transparent"}),h.unshift({offset:c?h[0].offset:.5,color:f[0]||"transparent"});var _=new wg(0,0,0,0,h,!0);return _[i]=v,_[i+"2"]=m,_;}}}function Bh(t,e,n){var i=t.get("showAllSymbol"),r="auto"===i;if(!i||r){var a=n.getAxesByScale("ordinal")[0];if(a&&(!r||!Nh(a,e))){var o=e.mapDimension(a.dim),s={};return d(a.getViewLabels(),function(t){s[t.tickValue]=1;}),function(t){return!s.hasOwnProperty(e.get(o,t));};}}}function Nh(t,e){var n=t.getExtent(),i=Math.abs(n[1]-n[0])/t.scale.count();isNaN(i)&&(i=0);for(var r=e.count(),a=Math.max(1,Math.round(r/5)),o=0;r>o;o+=a){if(1.5*fh.getSymbolSize(e,o)[t.isHorizontal()?1:0]>i)return!1;}return!0;}function Fh(t){return this._axes[t];}function Vh(t){M_.call(this,t);}function Hh(t,e){return e.type||(e.data?"category":"value");}function Wh(t,e){return t.getCoordSysModel()===e;}function Gh(t,e,n){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,n),this.model=t;}function jh(t,e,n){n.getAxesOnZeroOf=function(){return i?[i]:[];};var i,r=t[e],a=n.model,o=a.get("axisLine.onZero"),s=a.get("axisLine.onZeroAxisIndex");if(o){if(null!=s)return void(qh(r[s])&&(i=r[s]));for(var l in r){if(r.hasOwnProperty(l)&&qh(r[l])){i=r[l];break;}}}}function qh(t){return t&&"category"!==t.type&&"time"!==t.type&&Ou(t);}function Uh(t,e){var n=t.getExtent(),i=n[0]+n[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e;}:function(t){return i-t+e;},t.toLocalCoord="x"===t.dim?function(t){return t-e;}:function(t){return i-t+e;};}function Xh(t){return p(P_,function(e){var n=t.getReferringComponents(e)[0];return n;});}function Yh(t){return"cartesian2d"===t.get("coordinateSystem");}function Zh(t){var e={componentType:t.mainType};return e[t.mainType+"Index"]=t.componentIndex,e;}function $h(t,e,n,i){var r,a,o=qa(n-t.rotation),s=i[0]>i[1],l="start"===e&&!s||"start"!==e&&s;return Ua(o-O_/2)?(a=l?"bottom":"top",r="center"):Ua(o-1.5*O_)?(a=l?"top":"bottom",r="center"):(a="middle",r=1.5*O_>o&&o>O_/2?l?"left":"right":l?"right":"left"),{rotation:o,textAlign:r,textVerticalAlign:a};}function Kh(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show);}function Qh(t,e,n){var i=t.get("axisLabel.showMinLabel"),r=t.get("axisLabel.showMaxLabel");e=e||[],n=n||[];var a=e[0],o=e[1],s=e[e.length-1],l=e[e.length-2],u=n[0],h=n[1],c=n[n.length-1],f=n[n.length-2];i===!1?(Jh(a),Jh(u)):tc(a,o)&&(i?(Jh(o),Jh(h)):(Jh(a),Jh(u))),r===!1?(Jh(s),Jh(c)):tc(l,s)&&(r?(Jh(l),Jh(f)):(Jh(s),Jh(c)));}function Jh(t){t&&(t.ignore=!0);}function tc(t,e){var n=t&&t.getBoundingRect().clone(),i=e&&e.getBoundingRect().clone();if(n&&i){var r=pe([]);return ye(r,r,-t.rotation),n.applyTransform(ve([],r,t.getLocalTransform())),i.applyTransform(ve([],r,e.getLocalTransform())),n.intersect(i);}}function ec(t){return"middle"===t||"center"===t;}function nc(t,e,n){var i=e.axis;if(e.get("axisTick.show")&&!i.scale.isBlank()){for(var r=e.getModel("axisTick"),a=r.getModel("lineStyle"),o=r.get("length"),l=i.getTicksCoords(),u=[],h=[],c=t._transform,f=[],d=0;d<l.length;d++){var p=l[d].coord;u[0]=p,u[1]=0,h[0]=p,h[1]=n.tickDirection*o,c&&(ae(u,u,c),ae(h,h,c));var g=new gg(Yr({anid:"tick_"+l[d].tickValue,shape:{x1:u[0],y1:u[1],x2:h[0],y2:h[1]},style:s(a.getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")}),z2:2,silent:!0}));t.group.add(g),f.push(g);}return f;}}function ic(t,e,n){var i=e.axis,r=T(n.axisLabelShow,e.get("axisLabel.show"));if(r&&!i.scale.isBlank()){var a=e.getModel("axisLabel"),o=a.get("margin"),s=i.getViewLabels(),l=(T(n.labelRotate,a.get("rotate"))||0)*O_/180,u=z_(n.rotation,l,n.labelDirection),h=e.getCategories(!0),c=[],f=Kh(e),p=e.get("triggerEvent");return d(s,function(r,s){var l=r.tickValue,d=r.formattedLabel,g=r.rawLabel,v=a;h&&h[l]&&h[l].textStyle&&(v=new Aa(h[l].textStyle,a,e.ecModel));var m=v.getTextColor()||e.get("axisLine.lineStyle.color"),y=i.dataToCoord(l),_=[y,n.labelOffset+n.labelDirection*o],x=new rg({anid:"label_"+l,position:_,rotation:u.rotation,silent:f,z2:10});ca(x.style,v,{text:d,textAlign:v.getShallow("align",!0)||u.textAlign,textVerticalAlign:v.getShallow("verticalAlign",!0)||v.getShallow("baseline",!0)||u.textVerticalAlign,textFill:"function"==typeof m?m("category"===i.type?g:"value"===i.type?l+"":l,s):m}),p&&(x.eventData=Zh(e),x.eventData.targetType="axisLabel",x.eventData.value=g),t._dumbGroup.add(x),x.updateTransform(),c.push(x),t.group.add(x),x.decomposeTransform();}),c;}}function rc(t){var e=ac(t);if(e){var n=e.axisPointerModel,i=e.axis.scale,r=n.option,a=n.get("status"),o=n.get("value");null!=o&&(o=i.parse(o));var s=sc(n);null==a&&(r.status=s?"show":"hide");var l=i.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==o||o>l[1])&&(o=l[1]),o<l[0]&&(o=l[0]),r.value=o,s&&(r.status=e.axis.scale.isBlank()?"hide":"show");}}function ac(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[lc(t)];}function oc(t){var e=ac(t);return e&&e.axisPointerModel;}function sc(t){return!!t.get("handle.show");}function lc(t){return t.type+"||"+t.id;}function uc(t,e,n,i,r,a){var o=B_.getAxisPointerClass(t.axisPointerClass);if(o){var s=oc(e);s?(t._axisPointer||(t._axisPointer=new o())).render(e,s,i,a):hc(t,i);}}function hc(t,e,n){var i=t._axisPointer;i&&i.dispose(e,n),t._axisPointer=null;}function cc(t,e,n){n=n||{};var i=t.coordinateSystem,r=e.axis,a={},o=r.getAxesOnZeroOf()[0],s=r.position,l=o?"onZero":s,u=r.dim,h=i.getRect(),c=[h.x,h.x+h.width,h.y,h.y+h.height],f={left:0,right:1,top:0,bottom:1,onZero:2},d=e.get("offset")||0,p="x"===u?[c[2]-d,c[3]+d]:[c[0]-d,c[1]+d];if(o){var g=o.toGlobalCoord(o.dataToCoord(0));p[f.onZero]=Math.max(Math.min(g,p[1]),p[0]);}a.position=["y"===u?p[f[l]]:c[0],"x"===u?p[f[l]]:c[3]],a.rotation=Math.PI/2*("x"===u?0:1);var v={top:-1,bottom:1,left:-1,right:1};a.labelDirection=a.tickDirection=a.nameDirection=v[s],a.labelOffset=o?p[f[s]]-p[f.onZero]:0,e.get("axisTick.inside")&&(a.tickDirection=-a.tickDirection),T(n.labelInside,e.get("axisLabel.inside"))&&(a.labelDirection=-a.labelDirection);var m=e.get("axisLabel.rotate");return a.labelRotate="top"===l?-m:m,a.z2=1,a;}function fc(t){Pi(t,"label",["show"]);}function dc(t){return!(isNaN(parseFloat(t.x))&&isNaN(parseFloat(t.y)));}function pc(t){return!isNaN(parseFloat(t.x))&&!isNaN(parseFloat(t.y));}function gc(t,e,n,i,r,a){var o=[],s=au(e,i),l=s?e.getCalculationInfo("stackResultDimension"):i,u=wc(e,l,t),h=e.indicesOfNearest(l,u)[0];o[r]=e.get(n,h),o[a]=e.get(i,h);var c=Ha(e.get(i,h));return c=Math.min(c,20),c>=0&&(o[a]=+o[a].toFixed(c)),o;}function vc(t,e){var n=t.getData(),r=t.coordinateSystem;if(e&&!pc(e)&&!x(e.coord)&&r){var a=r.dimensions,o=mc(e,n,r,t);if(e=i(e),e.type&&X_[e.type]&&o.baseAxis&&o.valueAxis){var s=q_(a,o.baseAxis.dim),l=q_(a,o.valueAxis.dim);e.coord=X_[e.type](n,o.baseDataDim,o.valueDataDim,s,l),e.value=e.coord[l];}else{for(var u=[null!=e.xAxis?e.xAxis:e.radiusAxis,null!=e.yAxis?e.yAxis:e.angleAxis],h=0;2>h;h++){X_[u[h]]&&(u[h]=wc(n,n.mapDimension(a[h]),u[h]));}e.coord=u;}}return e;}function mc(t,e,n,i){var r={};return null!=t.valueIndex||null!=t.valueDim?(r.valueDataDim=null!=t.valueIndex?e.getDimension(t.valueIndex):t.valueDim,r.valueAxis=n.getAxis(yc(i,r.valueDataDim)),r.baseAxis=n.getOtherAxis(r.valueAxis),r.baseDataDim=e.mapDimension(r.baseAxis.dim)):(r.baseAxis=i.getBaseAxis(),r.valueAxis=n.getOtherAxis(r.baseAxis),r.baseDataDim=e.mapDimension(r.baseAxis.dim),r.valueDataDim=e.mapDimension(r.valueAxis.dim)),r;}function yc(t,e){var n=t.getData(),i=n.dimensions;e=n.getDimension(e);for(var r=0;r<i.length;r++){var a=n.getDimensionInfo(i[r]);if(a.name===e)return a.coordDim;}}function _c(t,e){return t&&t.containData&&e.coord&&!dc(e)?t.containData(e.coord):!0;}function xc(t,e,n,i){return 2>i?t.coord&&t.coord[i]:t.value;}function wc(t,e,n){if("average"===n){var i=0,r=0;return t.each(e,function(t){isNaN(t)||(i+=t,r++);}),i/r;}return"median"===n?t.getMedian(e):t.getDataExtent(e,!0)["max"===n?1:0];}function bc(t){return isNaN(+t.cpx1)||isNaN(+t.cpy1);}function Mc(t){return"_"+t+"Type";}function Sc(t,e,n){var i=e.getItemVisual(n,"color"),r=e.getItemVisual(n,t),a=e.getItemVisual(n,t+"Size");if(r&&"none"!==r){x(a)||(a=[a,a]);var o=Fu(r,-a[0]/2,-a[1]/2,a[0],a[1],i);return o.name=t,o;}}function Cc(t){var e=new $_({name:"line"});return Ic(e.shape,t),e;}function Ic(t,e){var n=e[0],i=e[1],r=e[2];t.x1=n[0],t.y1=n[1],t.x2=i[0],t.y2=i[1],t.percent=1,r?(t.cpx1=r[0],t.cpy1=r[1]):(t.cpx1=0/0,t.cpy1=0/0);}function Dc(){var t=this,e=t.childOfName("fromSymbol"),n=t.childOfName("toSymbol"),i=t.childOfName("label");if(e||n||!i.ignore){for(var r=1,a=this.parent;a;){a.scale&&(r/=a.scale[0]),a=a.parent;}var o=t.childOfName("line");if(this.__dirty||o.__dirty){var s=o.shape.percent,l=o.pointAt(0),u=o.pointAt(s),h=X([],u,l);if(te(h,h),e){e.attr("position",l);var c=o.tangentAt(0);e.attr("rotation",Math.PI/2-Math.atan2(c[1],c[0])),e.attr("scale",[r*s,r*s]);}if(n){n.attr("position",u);var c=o.tangentAt(1);n.attr("rotation",-Math.PI/2-Math.atan2(c[1],c[0])),n.attr("scale",[r*s,r*s]);}if(!i.ignore){i.attr("position",u);var f,d,p,g=5*r;if("end"===i.__position)f=[h[0]*g+u[0],h[1]*g+u[1]],d=h[0]>.8?"left":h[0]<-.8?"right":"center",p=h[1]>.8?"top":h[1]<-.8?"bottom":"middle";else if("middle"===i.__position){var v=s/2,c=o.tangentAt(v),m=[c[1],-c[0]],y=o.pointAt(v);m[1]>0&&(m[0]=-m[0],m[1]=-m[1]),f=[y[0]+m[0]*g,y[1]+m[1]*g],d="center",p="bottom";var _=-Math.atan2(c[1],c[0]);u[0]<l[0]&&(_=Math.PI+_),i.attr("rotation",_);}else f=[-h[0]*g+l[0],-h[1]*g+l[1]],d=h[0]>.8?"right":h[0]<-.8?"left":"center",p=h[1]>.8?"bottom":h[1]<-.8?"top":"middle";i.attr({style:{textVerticalAlign:i.__verticalAlign||p,textAlign:i.__textAlign||d},position:f,scale:[r,r]});}}}}function Tc(t,e,n){Xf.call(this),this._createLine(t,e,n);}function kc(t){this._ctor=t||Tc,this.group=new Xf();}function Ac(t,e,n,i){var r=e.getItemLayout(n);if(Ec(r)){var a=new t._ctor(e,n,i);e.setItemGraphicEl(n,a),t.group.add(a);}}function Lc(t,e,n,i,r,a){var o=e.getItemGraphicEl(i);return Ec(n.getItemLayout(r))?(o?o.updateData(n,r,a):o=new t._ctor(n,r,a),n.setItemGraphicEl(r,o),void t.group.add(o)):void t.group.remove(o);}function Pc(t){var e=t.hostModel;return{lineStyle:e.getModel("lineStyle").getLineStyle(),hoverLineStyle:e.getModel("emphasis.lineStyle").getLineStyle(),labelModel:e.getModel("label"),hoverLabelModel:e.getModel("emphasis.label")};}function Oc(t){return isNaN(t[0])||isNaN(t[1]);}function Ec(t){return!Oc(t[0])&&!Oc(t[1]);}function Rc(t){return!isNaN(t)&&!isFinite(t);}function zc(t,e,n,i){var r=1-t,a=i.dimensions[t];return Rc(e[r])&&Rc(n[r])&&e[t]===n[t]&&i.getAxis(a).containData(e[t]);}function Bc(t,e){if("cartesian2d"===t.type){var n=e[0].coord,i=e[1].coord;if(n&&i&&(zc(1,n,i,t)||zc(0,n,i,t)))return!0;}return _c(t,e[0])&&_c(t,e[1]);}function Nc(t,e,n,i,r){var a,o=i.coordinateSystem,s=t.getItemModel(e),l=Na(s.get("x"),r.getWidth()),u=Na(s.get("y"),r.getHeight());if(isNaN(l)||isNaN(u)){if(i.getMarkerPosition)a=i.getMarkerPosition(t.getValues(t.dimensions,e));else{var h=o.dimensions,c=t.get(h[0],e),f=t.get(h[1],e);a=o.dataToPoint([c,f]);}if("cartesian2d"===o.type){var d=o.getAxis("x"),p=o.getAxis("y"),h=o.dimensions;Rc(t.get(h[0],e))?a[0]=d.toGlobalCoord(d.getExtent()[n?0:1]):Rc(t.get(h[1],e))&&(a[1]=p.toGlobalCoord(p.getExtent()[n?0:1]));}isNaN(l)||(a[0]=l),isNaN(u)||(a[1]=u);}else a=[l,u];t.setItemLayout(e,a);}function Fc(t,e,n){var i;i=t?p(t&&t.dimensions,function(t){var n=e.getData().getDimensionInfo(e.getData().mapDimension(t))||{};return s({name:t},n);}):[{name:"value",type:"float"}];var r=new ay(i,n),a=new ay(i,n),o=new ay([],n),l=p(n.get("data"),_(ex,e,t,n));t&&(l=v(l,_(Bc,t)));var u=t?xc:function(t){return t.value;};return r.initData(p(l,function(t){return t[0];}),null,u),a.initData(p(l,function(t){return t[1];}),null,u),o.initData(p(l,function(t){return t[2];})),o.hasItemOption=!0,{from:r,to:a,line:o};}var Vc=2311,Hc=function Hc(){return Vc++;},Wc={};Wc="object"==(typeof wx==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(wx))&&"function"==typeof wx.getSystemInfoSync?{browser:{},os:{},node:!1,wxa:!0,canvasSupported:!0,svgSupported:!1,touchEventsSupported:!0}:"undefined"==typeof document&&"undefined"!=typeof self?{browser:{},os:{},node:!1,worker:!0,canvasSupported:!0}:"undefined"==typeof navigator?{browser:{},os:{},node:!0,worker:!1,canvasSupported:!0,svgSupported:!0}:e(navigator.userAgent);var Gc=Wc,jc={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1,"[object Canvas]":1},qc={"[object Int8Array]":1,"[object Uint8Array]":1,"[object Uint8ClampedArray]":1,"[object Int16Array]":1,"[object Uint16Array]":1,"[object Int32Array]":1,"[object Uint32Array]":1,"[object Float32Array]":1,"[object Float64Array]":1},Uc=Object.prototype.toString,Xc=Array.prototype,Yc=Xc.forEach,Zc=Xc.filter,$c=Xc.slice,Kc=Xc.map,Qc=Xc.reduce,Jc={},tf=function tf(){return Jc.createCanvas();};Jc.createCanvas=function(){return document.createElement("canvas");};var ef,nf="__ec_primitive__";B.prototype={constructor:B,get:function get(t){return this.hasOwnProperty(t)?this[t]:null;},set:function set(t,e){return this[t]=e;},each:function each(t,e){void 0!==e&&(t=y(t,e));for(var n in this){this.hasOwnProperty(n)&&t(this[n],n);}},removeKey:function removeKey(t){delete this[t];}};var rf=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({$override:n,clone:i,merge:r,mergeAll:a,extend:o,defaults:s,createCanvas:tf,getContext:l,indexOf:u,inherits:h,mixin:c,isArrayLike:f,each:d,map:p,reduce:g,filter:v,find:m,bind:y,curry:_,isArray:x,isFunction:w,isString:b,isObject:M,isBuiltInObject:S,isTypedArray:C,isDom:I,eqNaN:D,retrieve:T,retrieve2:k,retrieve3:A,slice:L,normalizeCssArray:P,assert:O,trim:E,setAsPrimitive:R,isPrimitive:z,createHashMap:N,concatArray:F,noop:V}),af="undefined"==typeof Float32Array?Array:Float32Array,of=Y,sf=Z,lf=ee,uf=ne,hf=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({create:H,copy:W,clone:G,set:j,add:q,scaleAndAdd:U,sub:X,len:Y,length:of,lenSquare:Z,lengthSquare:sf,mul:$,div:K,dot:Q,scale:J,normalize:te,distance:ee,dist:lf,distanceSquare:ne,distSquare:uf,negate:ie,lerp:re,applyTransform:ae,min:oe,max:se});le.prototype={constructor:le,_dragStart:function _dragStart(t){var e=t.target;e&&e.draggable&&(this._draggingTarget=e,e.dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(ue(e,t),"dragstart",t.event));},_drag:function _drag(t){var e=this._draggingTarget;if(e){var n=t.offsetX,i=t.offsetY,r=n-this._x,a=i-this._y;this._x=n,this._y=i,e.drift(r,a,t),this.dispatchToElement(ue(e,t),"drag",t.event);var o=this.findHover(n,i,e).target,s=this._dropTarget;this._dropTarget=o,e!==o&&(s&&o!==s&&this.dispatchToElement(ue(s,t),"dragleave",t.event),o&&o!==s&&this.dispatchToElement(ue(o,t),"dragenter",t.event));}},_dragEnd:function _dragEnd(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(ue(e,t),"dragend",t.event),this._dropTarget&&this.dispatchToElement(ue(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null;}};var cf=Array.prototype.slice,ff=function ff(){this._$handlers={};};ff.prototype={constructor:ff,one:function one(t,e,n){var i=this._$handlers;if(!e||!t)return this;i[t]||(i[t]=[]);for(var r=0;r<i[t].length;r++){if(i[t][r].h===e)return this;}return i[t].push({h:e,one:!0,ctx:n||this}),this;},on:function on(t,e,n){var i=this._$handlers;if(!e||!t)return this;i[t]||(i[t]=[]);for(var r=0;r<i[t].length;r++){if(i[t][r].h===e)return this;}return i[t].push({h:e,one:!1,ctx:n||this}),this;},isSilent:function isSilent(t){var e=this._$handlers;return e[t]&&e[t].length;},off:function off(t,e){var n=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(n[t]){for(var i=[],r=0,a=n[t].length;a>r;r++){n[t][r].h!=e&&i.push(n[t][r]);}n[t]=i;}n[t]&&0===n[t].length&&delete n[t];}else delete n[t];return this;},trigger:function trigger(t){if(this._$handlers[t]){var e=arguments,n=e.length;n>3&&(e=cf.call(e,1));for(var i=this._$handlers[t],r=i.length,a=0;r>a;){switch(n){case 1:i[a].h.call(i[a].ctx);break;case 2:i[a].h.call(i[a].ctx,e[1]);break;case 3:i[a].h.call(i[a].ctx,e[1],e[2]);break;default:i[a].h.apply(i[a].ctx,e);}i[a].one?(i.splice(a,1),r--):a++;}}return this;},triggerWithContext:function triggerWithContext(t){if(this._$handlers[t]){var e=arguments,n=e.length;n>4&&(e=cf.call(e,1,e.length-1));for(var i=e[e.length-1],r=this._$handlers[t],a=r.length,o=0;a>o;){switch(n){case 1:r[o].h.call(i);break;case 2:r[o].h.call(i,e[1]);break;case 3:r[o].h.call(i,e[1],e[2]);break;default:r[o].h.apply(i,e);}r[o].one?(r.splice(o,1),a--):o++;}}return this;}};var df="silent";ce.prototype.dispose=function(){};var pf=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],gf=function gf(t,e,n,i){ff.call(this),this.storage=t,this.painter=e,this.painterRoot=i,n=n||new ce(),this.proxy=null,this._hovered={},this._lastTouchMoment,this._lastX,this._lastY,le.call(this),this.setHandlerProxy(n);};gf.prototype={constructor:gf,setHandlerProxy:function setHandlerProxy(t){this.proxy&&this.proxy.dispose(),t&&(d(pf,function(e){t.on&&t.on(e,this[e],this);},this),t.handler=this),this.proxy=t;},mousemove:function mousemove(t){var e=t.zrX,n=t.zrY,i=this._hovered,r=i.target;r&&!r.__zr&&(i=this.findHover(i.x,i.y),r=i.target);var a=this._hovered=this.findHover(e,n),o=a.target,s=this.proxy;s.setCursor&&s.setCursor(o?o.cursor:"default"),r&&o!==r&&this.dispatchToElement(i,"mouseout",t),this.dispatchToElement(a,"mousemove",t),o&&o!==r&&this.dispatchToElement(a,"mouseover",t);},mouseout:function mouseout(t){this.dispatchToElement(this._hovered,"mouseout",t);var e,n=t.toElement||t.relatedTarget;do{n=n&&n.parentNode;}while(n&&9!=n.nodeType&&!(e=n===this.painterRoot));!e&&this.trigger("globalout",{event:t});},resize:function resize(){this._hovered={};},dispatch:function dispatch(t,e){var n=this[t];n&&n.call(this,e);},dispose:function dispose(){this.proxy.dispose(),this.storage=this.proxy=this.painter=null;},setCursorStyle:function setCursorStyle(t){var e=this.proxy;e.setCursor&&e.setCursor(t);},dispatchToElement:function dispatchToElement(t,e,n){t=t||{};var i=t.target;if(!i||!i.silent){for(var r="on"+e,a=he(e,t,n);i&&(i[r]&&(a.cancelBubble=i[r].call(i,a)),i.trigger(e,a),i=i.parent,!a.cancelBubble);){}a.cancelBubble||(this.trigger(e,a),this.painter&&this.painter.eachOtherLayer(function(t){"function"==typeof t[r]&&t[r].call(t,a),t.trigger&&t.trigger(e,a);}));}},findHover:function findHover(t,e,n){for(var i=this.storage.getDisplayList(),r={x:t,y:e},a=i.length-1;a>=0;a--){var o;if(i[a]!==n&&!i[a].ignore&&(o=fe(i[a],t,e))&&(!r.topTarget&&(r.topTarget=i[a]),o!==df)){r.target=i[a];break;}}return r;}},d(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){gf.prototype[t]=function(e){var n=this.findHover(e.zrX,e.zrY),i=n.target;if("mousedown"===t)this._downEl=i,this._downPoint=[e.zrX,e.zrY],this._upEl=i;else if("mouseup"===t)this._upEl=i;else if("click"===t){if(this._downEl!==this._upEl||!this._downPoint||lf(this._downPoint,[e.zrX,e.zrY])>4)return;this._downPoint=null;}this.dispatchToElement(n,t,e);};}),c(gf,ff),c(gf,le);var vf="undefined"==typeof Float32Array?Array:Float32Array,mf=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({create:de,identity:pe,copy:ge,mul:ve,translate:me,rotate:ye,scale:_e,invert:xe,clone:we}),yf=pe,_f=5e-5,xf=function xf(t){t=t||{},t.position||(this.position=[0,0]),null==t.rotation&&(this.rotation=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null;},wf=xf.prototype;wf.transform=null,wf.needLocalTransform=function(){return be(this.rotation)||be(this.position[0])||be(this.position[1])||be(this.scale[0]-1)||be(this.scale[1]-1);},wf.updateTransform=function(){var t=this.parent,e=t&&t.transform,n=this.needLocalTransform(),i=this.transform;return n||e?(i=i||de(),n?this.getLocalTransform(i):yf(i),e&&(n?ve(i,t.transform,i):ge(i,t.transform)),this.transform=i,this.invTransform=this.invTransform||de(),void xe(this.invTransform,i)):void(i&&yf(i));},wf.getLocalTransform=function(t){return xf.getLocalTransform(this,t);},wf.setTransform=function(t){var e=this.transform,n=t.dpr||1;e?t.setTransform(n*e[0],n*e[1],n*e[2],n*e[3],n*e[4],n*e[5]):t.setTransform(n,0,0,n,0,0);},wf.restoreTransform=function(t){var e=t.dpr||1;t.setTransform(e,0,0,e,0,0);};var bf=[];wf.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(ve(bf,t.invTransform,e),e=bf);var n=e[0]*e[0]+e[1]*e[1],i=e[2]*e[2]+e[3]*e[3],r=this.position,a=this.scale;be(n-1)&&(n=Math.sqrt(n)),be(i-1)&&(i=Math.sqrt(i)),e[0]<0&&(n=-n),e[3]<0&&(i=-i),r[0]=e[4],r[1]=e[5],a[0]=n,a[1]=i,this.rotation=Math.atan2(-e[1]/i,e[0]/n);}},wf.getGlobalScale=function(){var t=this.transform;if(!t)return[1,1];var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]),n=Math.sqrt(t[2]*t[2]+t[3]*t[3]);return t[0]<0&&(e=-e),t[3]<0&&(n=-n),[e,n];},wf.transformCoordToLocal=function(t,e){var n=[t,e],i=this.invTransform;return i&&ae(n,n,i),n;},wf.transformCoordToGlobal=function(t,e){var n=[t,e],i=this.transform;return i&&ae(n,n,i),n;},xf.getLocalTransform=function(t,e){e=e||[],yf(e);var n=t.origin,i=t.scale||[1,1],r=t.rotation||0,a=t.position||[0,0];return n&&(e[4]-=n[0],e[5]-=n[1]),_e(e,e,i),r&&ye(e,e,r),n&&(e[4]+=n[0],e[5]+=n[1]),e[4]+=a[0],e[5]+=a[1],e;};var Mf={linear:function linear(t){return t;},quadraticIn:function quadraticIn(t){return t*t;},quadraticOut:function quadraticOut(t){return t*(2-t);},quadraticInOut:function quadraticInOut(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1);},cubicIn:function cubicIn(t){return t*t*t;},cubicOut:function cubicOut(t){return--t*t*t+1;},cubicInOut:function cubicInOut(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2);},quarticIn:function quarticIn(t){return t*t*t*t;},quarticOut:function quarticOut(t){return 1- --t*t*t*t;},quarticInOut:function quarticInOut(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2);},quinticIn:function quinticIn(t){return t*t*t*t*t;},quinticOut:function quinticOut(t){return--t*t*t*t*t+1;},quinticInOut:function quinticInOut(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2);},sinusoidalIn:function sinusoidalIn(t){return 1-Math.cos(t*Math.PI/2);},sinusoidalOut:function sinusoidalOut(t){return Math.sin(t*Math.PI/2);},sinusoidalInOut:function sinusoidalInOut(t){return .5*(1-Math.cos(Math.PI*t));},exponentialIn:function exponentialIn(t){return 0===t?0:Math.pow(1024,t-1);},exponentialOut:function exponentialOut(t){return 1===t?1:1-Math.pow(2,-10*t);},exponentialInOut:function exponentialInOut(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2);},circularIn:function circularIn(t){return 1-Math.sqrt(1-t*t);},circularOut:function circularOut(t){return Math.sqrt(1- --t*t);},circularInOut:function circularInOut(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1);},elasticIn:function elasticIn(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),-(n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)));},elasticOut:function elasticOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/i)+1);},elasticInOut:function elasticInOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?-.5*n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i):n*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)*.5+1);},backIn:function backIn(t){var e=1.70158;return t*t*((e+1)*t-e);},backOut:function backOut(t){var e=1.70158;return--t*t*((e+1)*t+e)+1;},backInOut:function backInOut(t){var e=2.5949095;return(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2);},bounceIn:function bounceIn(t){return 1-Mf.bounceOut(1-t);},bounceOut:function bounceOut(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;},bounceInOut:function bounceInOut(t){return .5>t?.5*Mf.bounceIn(2*t):.5*Mf.bounceOut(2*t-1)+.5;}};Me.prototype={constructor:Me,step:function step(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)return void(this._pausedTime+=e);var n=(t-this._startTime-this._pausedTime)/this._life;if(!(0>n)){n=Math.min(n,1);var i=this.easing,r="string"==typeof i?Mf[i]:i,a="function"==typeof r?r(n):n;return this.fire("frame",a),1==n?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null;}},restart:function restart(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0,this._needsRemove=!1;},fire:function fire(t,e){t="on"+t,this[t]&&this[t](this._target,e);},pause:function pause(){this._paused=!0;},resume:function resume(){this._paused=!1;}};var Sf=function Sf(){this.head=null,this.tail=null,this._len=0;},Cf=Sf.prototype;Cf.insert=function(t){var e=new If(t);return this.insertEntry(e),e;},Cf.insertEntry=function(t){this.head?(this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++;},Cf.remove=function(t){var e=t.prev,n=t.next;e?e.next=n:this.head=n,n?n.prev=e:this.tail=e,t.next=t.prev=null,this._len--;},Cf.len=function(){return this._len;},Cf.clear=function(){this.head=this.tail=null,this._len=0;};var If=function If(t){this.value=t,this.next,this.prev;},Df=function Df(t){this._list=new Sf(),this._map={},this._maxSize=t||10,this._lastRemovedEntry=null;},Tf=Df.prototype;Tf.put=function(t,e){var n=this._list,i=this._map,r=null;if(null==i[t]){var a=n.len(),o=this._lastRemovedEntry;if(a>=this._maxSize&&a>0){var s=n.head;n.remove(s),delete i[s.key],r=s.value,this._lastRemovedEntry=s;}o?o.value=e:o=new If(e),o.key=t,n.insertEntry(o),i[t]=o;}return r;},Tf.get=function(t){var e=this._map[t],n=this._list;return null!=e?(e!==n.tail&&(n.remove(e),n.insertEntry(e)),e.value):void 0;},Tf.clear=function(){this._list.clear(),this._map={};};var kf={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]},Af=new Df(20),Lf=null,Pf=Fe,Of=Ve,Ef=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({parse:Ee,lift:Be,toHex:Ne,fastLerp:Fe,fastMapToColor:Pf,lerp:Ve,mapToColor:Of,modifyHSL:He,modifyAlpha:We,stringify:Ge}),Rf=Array.prototype.slice,zf=function zf(t,e,n,i){this._tracks={},this._target=t,this._loop=e||!1,this._getter=n||je,this._setter=i||qe,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[];};zf.prototype={when:function when(t,e){var n=this._tracks;for(var i in e){if(e.hasOwnProperty(i)){if(!n[i]){n[i]=[];var r=this._getter(this._target,i);if(null==r)continue;0!==t&&n[i].push({time:0,value:Je(r)});}n[i].push({time:t,value:e[i]});}}return this;},during:function during(t){return this._onframeList.push(t),this;},pause:function pause(){for(var t=0;t<this._clipList.length;t++){this._clipList[t].pause();}this._paused=!0;},resume:function resume(){for(var t=0;t<this._clipList.length;t++){this._clipList[t].resume();}this._paused=!1;},isPaused:function isPaused(){return!!this._paused;},_doneCallback:function _doneCallback(){this._tracks={},this._clipList.length=0;for(var t=this._doneList,e=t.length,n=0;e>n;n++){t[n].call(this);}},start:function start(t,e){var n,i=this,r=0,a=function a(){r--,r||i._doneCallback();};for(var o in this._tracks){if(this._tracks.hasOwnProperty(o)){var s=nn(this,t,a,this._tracks[o],o,e);s&&(this._clipList.push(s),r++,this.animation&&this.animation.addClip(s),n=s);}}if(n){var l=n.onframe;n.onframe=function(t,e){l(t,e);for(var n=0;n<i._onframeList.length;n++){i._onframeList[n](t,e);}};}return r||this._doneCallback(),this;},stop:function stop(t){for(var e=this._clipList,n=this.animation,i=0;i<e.length;i++){var r=e[i];t&&r.onframe(this._target,1),n&&n.removeClip(r);}e.length=0;},delay:function delay(t){return this._delay=t,this;},done:function done(t){return t&&this._doneList.push(t),this;},getClips:function getClips(){return this._clipList;}};var Bf=1;"undefined"!=typeof window&&(Bf=Math.max(window.devicePixelRatio||1,1));var Nf=0,Ff=Bf,Vf=function Vf(){};1===Nf?Vf=function Vf(){for(var t in arguments){throw new Error(arguments[t]);}}:Nf>1&&(Vf=function Vf(){for(var t in arguments){console.log(arguments[t]);}});var Hf=Vf,Wf=function Wf(){this.animators=[];};Wf.prototype={constructor:Wf,animate:function animate(t,e){var n,i=!1,r=this,a=this.__zr;if(t){var o=t.split("."),s=r;i="shape"===o[0];for(var l=0,h=o.length;h>l;l++){s&&(s=s[o[l]]);}s&&(n=s);}else n=r;if(!n)return void Hf('Property "'+t+'" is not existed in element '+r.id);var c=r.animators,f=new zf(n,e);return f.during(function(){r.dirty(i);}).done(function(){c.splice(u(c,f),1);}),c.push(f),a&&a.animation.addAnimator(f),f;},stopAnimation:function stopAnimation(t){for(var e=this.animators,n=e.length,i=0;n>i;i++){e[i].stop(t);}return e.length=0,this;},animateTo:function animateTo(t,e,n,i,r,a){function o(){l--,l||r&&r();}b(n)?(r=i,i=n,n=0):w(i)?(r=i,i="linear",n=0):w(n)?(r=n,n=0):w(e)?(r=e,e=500):e||(e=500),this.stopAnimation(),this._animateToShallow("",this,t,e,n);var s=this.animators.slice(),l=s.length;l||r&&r();for(var u=0;u<s.length;u++){s[u].done(o).start(i,a);}},_animateToShallow:function _animateToShallow(t,e,n,i,r){var a={},o=0;for(var s in n){if(n.hasOwnProperty(s))if(null!=e[s])M(n[s])&&!f(n[s])?this._animateToShallow(t?t+"."+s:s,e[s],n[s],i,r):(a[s]=n[s],o++);else if(null!=n[s])if(t){var l={};l[t]={},l[t][s]=n[s],this.attr(l);}else this.attr(s,n[s]);}return o>0&&this.animate(t,!1).when(null==i?500:i,a).delay(r||0),this;}};var Gf=function Gf(t){xf.call(this,t),ff.call(this,t),Wf.call(this,t),this.id=t.id||Hc();};Gf.prototype={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,isGroup:!1,drift:function drift(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0;}var n=this.transform;n||(n=this.transform=[1,0,0,1,0,0]),n[4]+=t,n[5]+=e,this.decomposeTransform(),this.dirty(!1);},beforeUpdate:function beforeUpdate(){},afterUpdate:function afterUpdate(){},update:function update(){this.updateTransform();},traverse:function traverse(){},attrKV:function attrKV(t,e){if("position"===t||"scale"===t||"origin"===t){if(e){var n=this[t];n||(n=this[t]=[]),n[0]=e[0],n[1]=e[1];}}else this[t]=e;},hide:function hide(){this.ignore=!0,this.__zr&&this.__zr.refresh();},show:function show(){this.ignore=!1,this.__zr&&this.__zr.refresh();},attr:function attr(t,e){if("string"==typeof t)this.attrKV(t,e);else if(M(t))for(var n in t){t.hasOwnProperty(n)&&this.attrKV(n,t[n]);}return this.dirty(!1),this;},setClipPath:function setClipPath(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),this.clipPath=t,t.__zr=e,t.__clipTarget=this,this.dirty(!1);},removeClipPath:function removeClipPath(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1));},addSelfToZr:function addSelfToZr(t){this.__zr=t;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.addAnimator(e[n]);}this.clipPath&&this.clipPath.addSelfToZr(t);},removeSelfFromZr:function removeSelfFromZr(t){this.__zr=null;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.removeAnimator(e[n]);}this.clipPath&&this.clipPath.removeSelfFromZr(t);}},c(Gf,Wf),c(Gf,xf),c(Gf,ff);var jf=ae,qf=Math.min,Uf=Math.max;rn.prototype={constructor:rn,union:function union(t){var e=qf(t.x,this.x),n=qf(t.y,this.y);this.width=Uf(t.x+t.width,this.x+this.width)-e,this.height=Uf(t.y+t.height,this.y+this.height)-n,this.x=e,this.y=n;},applyTransform:function(){var t=[],e=[],n=[],i=[];return function(r){if(r){t[0]=n[0]=this.x,t[1]=i[1]=this.y,e[0]=i[0]=this.x+this.width,e[1]=n[1]=this.y+this.height,jf(t,t,r),jf(e,e,r),jf(n,n,r),jf(i,i,r),this.x=qf(t[0],e[0],n[0],i[0]),this.y=qf(t[1],e[1],n[1],i[1]);var a=Uf(t[0],e[0],n[0],i[0]),o=Uf(t[1],e[1],n[1],i[1]);this.width=a-this.x,this.height=o-this.y;}};}(),calculateTransform:function calculateTransform(t){var e=this,n=t.width/e.width,i=t.height/e.height,r=de();return me(r,r,[-e.x,-e.y]),_e(r,r,[n,i]),me(r,r,[t.x,t.y]),r;},intersect:function intersect(t){if(!t)return!1;t instanceof rn||(t=rn.create(t));var e=this,n=e.x,i=e.x+e.width,r=e.y,a=e.y+e.height,o=t.x,s=t.x+t.width,l=t.y,u=t.y+t.height;return!(o>i||n>s||l>a||r>u);},contain:function contain(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height;},clone:function clone(){return new rn(this.x,this.y,this.width,this.height);},copy:function copy(t){this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height;},plain:function plain(){return{x:this.x,y:this.y,width:this.width,height:this.height};}},rn.create=function(t){return new rn(t.x,t.y,t.width,t.height);};var Xf=function Xf(t){t=t||{},Gf.call(this,t);for(var e in t){t.hasOwnProperty(e)&&(this[e]=t[e]);}this._children=[],this.__storage=null,this.__dirty=!0;};Xf.prototype={constructor:Xf,isGroup:!0,type:"group",silent:!1,children:function children(){return this._children.slice();},childAt:function childAt(t){return this._children[t];},childOfName:function childOfName(t){for(var e=this._children,n=0;n<e.length;n++){if(e[n].name===t)return e[n];}},childCount:function childCount(){return this._children.length;},add:function add(t){return t&&t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),this;},addBefore:function addBefore(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var n=this._children,i=n.indexOf(e);i>=0&&(n.splice(i,0,t),this._doAdd(t));}return this;},_doAdd:function _doAdd(t){t.parent&&t.parent.remove(t),t.parent=this;var e=this.__storage,n=this.__zr;e&&e!==t.__storage&&(e.addToStorage(t),t instanceof Xf&&t.addChildrenToStorage(e)),n&&n.refresh();},remove:function remove(t){var e=this.__zr,n=this.__storage,i=this._children,r=u(i,t);return 0>r?this:(i.splice(r,1),t.parent=null,n&&(n.delFromStorage(t),t instanceof Xf&&t.delChildrenFromStorage(n)),e&&e.refresh(),this);},removeAll:function removeAll(){var t,e,n=this._children,i=this.__storage;for(e=0;e<n.length;e++){t=n[e],i&&(i.delFromStorage(t),t instanceof Xf&&t.delChildrenFromStorage(i)),t.parent=null;}return n.length=0,this;},eachChild:function eachChild(t,e){for(var n=this._children,i=0;i<n.length;i++){var r=n[i];t.call(e,r,i);}return this;},traverse:function traverse(t,e){for(var n=0;n<this._children.length;n++){var i=this._children[n];t.call(e,i),"group"===i.type&&i.traverse(t,e);}return this;},addChildrenToStorage:function addChildrenToStorage(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.addToStorage(n),n instanceof Xf&&n.addChildrenToStorage(t);}},delChildrenFromStorage:function delChildrenFromStorage(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.delFromStorage(n),n instanceof Xf&&n.delChildrenFromStorage(t);}},dirty:function dirty(){return this.__dirty=!0,this.__zr&&this.__zr.refresh(),this;},getBoundingRect:function getBoundingRect(t){for(var e=null,n=new rn(0,0,0,0),i=t||this._children,r=[],a=0;a<i.length;a++){var o=i[a];if(!o.ignore&&!o.invisible){var s=o.getBoundingRect(),l=o.getLocalTransform(r);l?(n.copy(s),n.applyTransform(l),e=e||n.clone(),e.union(n)):(e=e||s.clone(),e.union(s));}}return e||n;}},h(Xf,Gf);var Yf=32,Zf=7,$f=function $f(){this._roots=[],this._displayList=[],this._displayListLen=0;};$f.prototype={constructor:$f,traverse:function traverse(t,e){for(var n=0;n<this._roots.length;n++){this._roots[n].traverse(t,e);}},getDisplayList:function getDisplayList(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList;},updateDisplayList:function updateDisplayList(t){this._displayListLen=0;for(var e=this._roots,n=this._displayList,i=0,r=e.length;r>i;i++){this._updateAndAddDisplayable(e[i],null,t);}n.length=this._displayListLen,Gc.canvasSupported&&fn(n,dn);},_updateAndAddDisplayable:function _updateAndAddDisplayable(t,e,n){if(!t.ignore||n){t.beforeUpdate(),t.__dirty&&t.update(),t.afterUpdate();var i=t.clipPath;if(i){e=e?e.slice():[];for(var r=i,a=t;r;){r.parent=a,r.updateTransform(),e.push(r),a=r,r=r.clipPath;}}if(t.isGroup){for(var o=t._children,s=0;s<o.length;s++){var l=o[s];t.__dirty&&(l.__dirty=!0),this._updateAndAddDisplayable(l,e,n);}t.__dirty=!1;}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t;}},addRoot:function addRoot(t){t.__storage!==this&&(t instanceof Xf&&t.addChildrenToStorage(this),this.addToStorage(t),this._roots.push(t));},delRoot:function delRoot(t){if(null==t){for(var e=0;e<this._roots.length;e++){var n=this._roots[e];n instanceof Xf&&n.delChildrenFromStorage(this);}return this._roots=[],this._displayList=[],void(this._displayListLen=0);}if(t instanceof Array)for(var e=0,i=t.length;i>e;e++){this.delRoot(t[e]);}else{var r=u(this._roots,t);r>=0&&(this.delFromStorage(t),this._roots.splice(r,1),t instanceof Xf&&t.delChildrenFromStorage(this));}},addToStorage:function addToStorage(t){return t&&(t.__storage=this,t.dirty(!1)),this;},delFromStorage:function delFromStorage(t){return t&&(t.__storage=null),this;},dispose:function dispose(){this._renderList=this._roots=null;},displayableSortFunc:dn};var Kf={shadowBlur:1,shadowOffsetX:1,shadowOffsetY:1,textShadowBlur:1,textShadowOffsetX:1,textShadowOffsetY:1,textBoxShadowBlur:1,textBoxShadowOffsetX:1,textBoxShadowOffsetY:1},Qf=function Qf(t,e,n){return Kf.hasOwnProperty(e)?n*=t.dpr:n;},Jf=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],td=function td(t,e){this.extendFrom(t,!1),this.host=e;};td.prototype={constructor:td,host:null,fill:"#000",stroke:null,opacity:1,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,font:null,textFont:null,fontStyle:null,fontWeight:null,fontSize:null,fontFamily:null,textTag:null,textFill:"#000",textStroke:null,textWidth:null,textHeight:null,textStrokeWidth:0,textLineHeight:null,textPosition:"inside",textRect:null,textOffset:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowColor:"transparent",textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textBoxShadowColor:"transparent",textBoxShadowBlur:0,textBoxShadowOffsetX:0,textBoxShadowOffsetY:0,transformText:!1,textRotation:0,textOrigin:null,textBackgroundColor:null,textBorderColor:null,textBorderWidth:0,textBorderRadius:0,textPadding:null,rich:null,truncate:null,blend:null,bind:function bind(t,e,n){for(var i=this,r=n&&n.style,a=!r,o=0;o<Jf.length;o++){var s=Jf[o],l=s[0];(a||i[l]!==r[l])&&(t[l]=Qf(t,l,i[l]||s[1]));}if((a||i.fill!==r.fill)&&(t.fillStyle=i.fill),(a||i.stroke!==r.stroke)&&(t.strokeStyle=i.stroke),(a||i.opacity!==r.opacity)&&(t.globalAlpha=null==i.opacity?1:i.opacity),(a||i.blend!==r.blend)&&(t.globalCompositeOperation=i.blend||"source-over"),this.hasStroke()){var u=i.lineWidth;t.lineWidth=u/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1);}},hasFill:function hasFill(){var t=this.fill;return null!=t&&"none"!==t;},hasStroke:function hasStroke(){var t=this.stroke;return null!=t&&"none"!==t&&this.lineWidth>0;},extendFrom:function extendFrom(t,e){if(t)for(var n in t){!t.hasOwnProperty(n)||e!==!0&&(e===!1?this.hasOwnProperty(n):null==t[n])||(this[n]=t[n]);}},set:function set(t,e){"string"==typeof t?this[t]=e:this.extendFrom(t,!0);},clone:function clone(){var t=new this.constructor();return t.extendFrom(this,!0),t;},getGradient:function getGradient(t,e,n){for(var i="radial"===e.type?gn:pn,r=i(t,e,n),a=e.colorStops,o=0;o<a.length;o++){r.addColorStop(a[o].offset,a[o].color);}return r;}};for(var ed=td.prototype,nd=0;nd<Jf.length;nd++){var id=Jf[nd];id[0]in ed||(ed[id[0]]=id[1]);}td.getGradient=ed.getGradient;var rd=function rd(t,e){this.image=t,this.repeat=e,this.type="pattern";};rd.prototype.getCanvasPattern=function(t){return t.createPattern(this.image,this.repeat||"repeat");};var ad=function ad(t,e,n){var i;n=n||Ff,"string"==typeof t?i=mn(t,e,n):M(t)&&(i=t,t=i.id),this.id=t,this.dom=i;var r=i.style;r&&(i.onselectstart=vn,r["-webkit-user-select"]="none",r["user-select"]="none",r["-webkit-touch-callout"]="none",r["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",r.padding=0,r.margin=0,r["border-width"]=0),this.domBack=null,this.ctxBack=null,this.painter=e,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=n;};ad.prototype={constructor:ad,__dirty:!0,__used:!1,__drawIndex:0,__startIndex:0,__endIndex:0,incremental:!1,getElementCount:function getElementCount(){return this.__endIndex-this.__startIndex;},initContext:function initContext(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr;},createBackBuffer:function createBackBuffer(){var t=this.dpr;this.domBack=mn("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!=t&&this.ctxBack.scale(t,t);},resize:function resize(t,e){var n=this.dpr,i=this.dom,r=i.style,a=this.domBack;r&&(r.width=t+"px",r.height=e+"px"),i.width=t*n,i.height=e*n,a&&(a.width=t*n,a.height=e*n,1!=n&&this.ctxBack.scale(n,n));},clear:function clear(t,e){var n=this.dom,i=this.ctx,r=n.width,a=n.height,e=e||this.clearColor,o=this.motionBlur&&!t,s=this.lastFrameAlpha,l=this.dpr;if(o&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(n,0,0,r/l,a/l)),i.clearRect(0,0,r,a),e&&"transparent"!==e){var u;e.colorStops?(u=e.__canvasGradient||td.getGradient(i,e,{x:0,y:0,width:r,height:a}),e.__canvasGradient=u):e.image&&(u=rd.prototype.getCanvasPattern.call(e,i)),i.save(),i.fillStyle=u||e,i.fillRect(0,0,r,a),i.restore();}if(o){var h=this.domBack;i.save(),i.globalAlpha=s,i.drawImage(h,0,0,r,a),i.restore();}}};var od="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16);},sd=new Df(50),ld={},ud=0,hd=5e3,cd=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,fd="12px sans-serif",dd={};dd.measureText=function(t,e){var n=l();return n.font=e||fd,n.measureText(t);};var pd={left:1,right:1,center:1},gd={top:1,bottom:1,middle:1},vd=new rn(),md=function md(){};md.prototype={constructor:md,drawRectText:function drawRectText(t,e){var n=this.style;e=n.textRect||e,this.__dirty&&Vn(n,!0);var i=n.text;if(null!=i&&(i+=""),ii(i,n)){t.save();var r=this.transform;n.transformText?this.setTransform(t):r&&(vd.copy(e),vd.applyTransform(r),e=vd),Wn(this,t,i,n,e),t.restore();}}},ri.prototype={constructor:ri,type:"displayable",__dirty:!0,invisible:!1,z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:!1,incremental:!1,inplace:!1,beforeBrush:function beforeBrush(){},afterBrush:function afterBrush(){},brush:function brush(){},getBoundingRect:function getBoundingRect(){},contain:function contain(t,e){return this.rectContain(t,e);},traverse:function traverse(t,e){t.call(e,this);},rectContain:function rectContain(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();return i.contain(n[0],n[1]);},dirty:function dirty(){this.__dirty=!0,this._rect=null,this.__zr&&this.__zr.refresh();},animateStyle:function animateStyle(t){return this.animate("style",t);},attrKV:function attrKV(t,e){"style"!==t?Gf.prototype.attrKV.call(this,t,e):this.style.set(e);},setStyle:function setStyle(t,e){return this.style.set(t,e),this.dirty(!1),this;},useStyle:function useStyle(t){return this.style=new td(t,this),this.dirty(!1),this;}},h(ri,Gf),c(ri,md),ai.prototype={constructor:ai,type:"image",brush:function brush(t,e){var n=this.style,i=n.image;n.bind(t,this,e);var r=this._image=_n(i,this._image,this,this.onload);if(r&&wn(r)){var a=n.x||0,o=n.y||0,s=n.width,l=n.height,u=r.width/r.height;if(null==s&&null!=l?s=l*u:null==l&&null!=s?l=s/u:null==s&&null==l&&(s=r.width,l=r.height),this.setTransform(t),n.sWidth&&n.sHeight){var h=n.sx||0,c=n.sy||0;t.drawImage(r,h,c,n.sWidth,n.sHeight,a,o,s,l);}else if(n.sx&&n.sy){var h=n.sx,c=n.sy,f=s-h,d=l-c;t.drawImage(r,h,c,f,d,a,o,s,l);}else t.drawImage(r,a,o,s,l);null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()));}},getBoundingRect:function getBoundingRect(){var t=this.style;return this._rect||(this._rect=new rn(t.x||0,t.y||0,t.width||0,t.height||0)),this._rect;}},h(ai,ri);var yd=1e5,_d=314159,xd=.01,wd=.001,bd=new rn(0,0,0,0),Md=new rn(0,0,0,0),Sd=function Sd(t,e,n){this.type="canvas";var i=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=n=o({},n||{}),this.dpr=n.devicePixelRatio||Ff,this._singleCanvas=i,this.root=t;var r=t.style;r&&(r["-webkit-tap-highlight-color"]="transparent",r["-webkit-user-select"]=r["user-select"]=r["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var a=this._zlevelList=[],s=this._layers={};if(this._layerConfig={},this._needsManuallyCompositing=!1,i){var l=t.width,u=t.height;null!=n.width&&(l=n.width),null!=n.height&&(u=n.height),this.dpr=n.devicePixelRatio||1,t.width=l*this.dpr,t.height=u*this.dpr,this._width=l,this._height=u;var h=new ad(t,this,this.dpr);h.__builtin__=!0,h.initContext(),s[_d]=h,h.zlevel=_d,a.push(_d),this._domRoot=t;}else{this._width=this._getSize(0),this._height=this._getSize(1);var c=this._domRoot=ci(this._width,this._height);t.appendChild(c);}this._hoverlayer=null,this._hoverElements=[];};Sd.prototype={constructor:Sd,getType:function getType(){return"canvas";},isSingleCanvas:function isSingleCanvas(){return this._singleCanvas;},getViewportRoot:function getViewportRoot(){return this._domRoot;},getViewportRootOffset:function getViewportRootOffset(){var t=this.getViewportRoot();return t?{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}:void 0;},refresh:function refresh(t){var e=this.storage.getDisplayList(!0),n=this._zlevelList;this._redrawId=Math.random(),this._paintList(e,t,this._redrawId);for(var i=0;i<n.length;i++){var r=n[i],a=this._layers[r];if(!a.__builtin__&&a.refresh){var o=0===i?this._backgroundColor:null;a.refresh(o);}}return this.refreshHover(),this;},addHover:function addHover(t,e){if(!t.__hoverMir){var n=new t.constructor({style:t.style,shape:t.shape});n.__from=t,t.__hoverMir=n,n.setStyle(e),this._hoverElements.push(n);}},removeHover:function removeHover(t){var e=t.__hoverMir,n=this._hoverElements,i=u(n,e);i>=0&&n.splice(i,1),t.__hoverMir=null;},clearHover:function clearHover(){for(var t=this._hoverElements,e=0;e<t.length;e++){var n=t[e].__from;n&&(n.__hoverMir=null);}t.length=0;},refreshHover:function refreshHover(){var t=this._hoverElements,e=t.length,n=this._hoverlayer;if(n&&n.clear(),e){fn(t,this.storage.displayableSortFunc),n||(n=this._hoverlayer=this.getLayer(yd));var i={};n.ctx.save();for(var r=0;e>r;){var a=t[r],o=a.__from;o&&o.__zr?(r++,o.invisible||(a.transform=o.transform,a.invTransform=o.invTransform,a.__clipPaths=o.__clipPaths,this._doPaintEl(a,n,!0,i))):(t.splice(r,1),o.__hoverMir=null,e--);}n.ctx.restore();}},getHoverLayer:function getHoverLayer(){return this.getLayer(yd);},_paintList:function _paintList(t,e,n){if(this._redrawId===n){e=e||!1,this._updateLayerStatus(t);var i=this._doPaintList(t,e);if(this._needsManuallyCompositing&&this._compositeManually(),!i){var r=this;od(function(){r._paintList(t,e,n);});}}},_compositeManually:function _compositeManually(){var t=this.getLayer(_d).ctx,e=this._domRoot.width,n=this._domRoot.height;t.clearRect(0,0,e,n),this.eachBuiltinLayer(function(i){i.virtual&&t.drawImage(i.dom,0,0,e,n);});},_doPaintList:function _doPaintList(t,e){for(var n=[],i=0;i<this._zlevelList.length;i++){var r=this._zlevelList[i],a=this._layers[r];a.__builtin__&&a!==this._hoverlayer&&(a.__dirty||e)&&n.push(a);}for(var o=!0,s=0;s<n.length;s++){var a=n[s],l=a.ctx,u={};l.save();var h=e?a.__startIndex:a.__drawIndex,c=!e&&a.incremental&&Date.now,f=c&&Date.now(),p=a.zlevel===this._zlevelList[0]?this._backgroundColor:null;if(a.__startIndex===a.__endIndex)a.clear(!1,p);else if(h===a.__startIndex){var g=t[h];g.incremental&&g.notClear&&!e||a.clear(!1,p);}-1===h&&(console.error("For some unknown reason. drawIndex is -1"),h=a.__startIndex);for(var v=h;v<a.__endIndex;v++){var m=t[v];if(this._doPaintEl(m,a,e,u),m.__dirty=!1,c){var y=Date.now()-f;if(y>15)break;}}a.__drawIndex=v,a.__drawIndex<a.__endIndex&&(o=!1),u.prevElClipPaths&&l.restore(),l.restore();}return Gc.wxa&&d(this._layers,function(t){t&&t.ctx&&t.ctx.draw&&t.ctx.draw();}),o;},_doPaintEl:function _doPaintEl(t,e,n,i){var r=e.ctx,a=t.transform;if(!(!e.__dirty&&!n||t.invisible||0===t.style.opacity||a&&!a[0]&&!a[3]||t.culling&&li(t,this._width,this._height))){var o=t.__clipPaths;(!i.prevElClipPaths||ui(o,i.prevElClipPaths))&&(i.prevElClipPaths&&(e.ctx.restore(),i.prevElClipPaths=null,i.prevEl=null),o&&(r.save(),hi(o,r),i.prevElClipPaths=o)),t.beforeBrush&&t.beforeBrush(r),t.brush(r,i.prevEl||null),i.prevEl=t,t.afterBrush&&t.afterBrush(r);}},getLayer:function getLayer(t,e){this._singleCanvas&&!this._needsManuallyCompositing&&(t=_d);var n=this._layers[t];return n||(n=new ad("zr_"+t,this,this.dpr),n.zlevel=t,n.__builtin__=!0,this._layerConfig[t]&&r(n,this._layerConfig[t],!0),e&&(n.virtual=e),this.insertLayer(t,n),n.initContext()),n;},insertLayer:function insertLayer(t,e){var n=this._layers,i=this._zlevelList,r=i.length,a=null,o=-1,s=this._domRoot;if(n[t])return void Hf("ZLevel "+t+" has been used already");if(!si(e))return void Hf("Layer of zlevel "+t+" is not valid");if(r>0&&t>i[0]){for(o=0;r-1>o&&!(i[o]<t&&i[o+1]>t);o++){}a=n[i[o]];}if(i.splice(o+1,0,t),n[t]=e,!e.virtual)if(a){var l=a.dom;l.nextSibling?s.insertBefore(e.dom,l.nextSibling):s.appendChild(e.dom);}else s.firstChild?s.insertBefore(e.dom,s.firstChild):s.appendChild(e.dom);},eachLayer:function eachLayer(t,e){var n,i,r=this._zlevelList;for(i=0;i<r.length;i++){n=r[i],t.call(e,this._layers[n],n);}},eachBuiltinLayer:function eachBuiltinLayer(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++){i=a[r],n=this._layers[i],n.__builtin__&&t.call(e,n,i);}},eachOtherLayer:function eachOtherLayer(t,e){var n,i,r,a=this._zlevelList;for(r=0;r<a.length;r++){i=a[r],n=this._layers[i],n.__builtin__||t.call(e,n,i);}},getLayers:function getLayers(){return this._layers;},_updateLayerStatus:function _updateLayerStatus(t){function e(t){r&&(r.__endIndex!==t&&(r.__dirty=!0),r.__endIndex=t);}if(this.eachBuiltinLayer(function(t){t.__dirty=t.__used=!1;}),this._singleCanvas)for(var n=1;n<t.length;n++){var i=t[n];if(i.zlevel!==t[n-1].zlevel||i.incremental){this._needsManuallyCompositing=!0;break;}}for(var r=null,a=0,n=0;n<t.length;n++){var o,i=t[n],s=i.zlevel;i.incremental?(o=this.getLayer(s+wd,this._needsManuallyCompositing),o.incremental=!0,a=1):o=this.getLayer(s+(a>0?xd:0),this._needsManuallyCompositing),o.__builtin__||Hf("ZLevel "+s+" has been used by unkown layer "+o.id),o!==r&&(o.__used=!0,o.__startIndex!==n&&(o.__dirty=!0),o.__startIndex=n,o.__drawIndex=o.incremental?-1:n,e(n),r=o),i.__dirty&&(o.__dirty=!0,o.incremental&&o.__drawIndex<0&&(o.__drawIndex=n));}e(n),this.eachBuiltinLayer(function(t){!t.__used&&t.getElementCount()>0&&(t.__dirty=!0,t.__startIndex=t.__endIndex=t.__drawIndex=0),t.__dirty&&t.__drawIndex<0&&(t.__drawIndex=t.__startIndex);});},clear:function clear(){return this.eachBuiltinLayer(this._clearLayer),this;},_clearLayer:function _clearLayer(t){t.clear();},setBackgroundColor:function setBackgroundColor(t){this._backgroundColor=t;},configLayer:function configLayer(t,e){if(e){var n=this._layerConfig;n[t]?r(n[t],e,!0):n[t]=e;for(var i=0;i<this._zlevelList.length;i++){var a=this._zlevelList[i];if(a===t||a===t+xd){var o=this._layers[a];r(o,n[t],!0);}}}},delLayer:function delLayer(t){var e=this._layers,n=this._zlevelList,i=e[t];i&&(i.dom.parentNode.removeChild(i.dom),delete e[t],n.splice(u(n,t),1));},resize:function resize(t,e){if(this._domRoot.style){var n=this._domRoot;n.style.display="none";var i=this._opts;if(null!=t&&(i.width=t),null!=e&&(i.height=e),t=this._getSize(0),e=this._getSize(1),n.style.display="",this._width!=t||e!=this._height){n.style.width=t+"px",n.style.height=e+"px";for(var r in this._layers){this._layers.hasOwnProperty(r)&&this._layers[r].resize(t,e);}d(this._progressiveLayers,function(n){n.resize(t,e);}),this.refresh(!0);}this._width=t,this._height=e;}else{if(null==t||null==e)return;this._width=t,this._height=e,this.getLayer(_d).resize(t,e);}return this;},clearLayer:function clearLayer(t){var e=this._layers[t];e&&e.clear();},dispose:function dispose(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null;},getRenderedCanvas:function getRenderedCanvas(t){if(t=t||{},this._singleCanvas&&!this._compositeManually)return this._layers[_d].dom;var e=new ad("image",this,t.pixelRatio||this.dpr);if(e.initContext(),e.clear(!1,t.backgroundColor||this._backgroundColor),t.pixelRatio<=this.dpr){this.refresh();var n=e.dom.width,i=e.dom.height,r=e.ctx;this.eachLayer(function(t){t.__builtin__?r.drawImage(t.dom,0,0,n,i):t.renderToCanvas&&(e.ctx.save(),t.renderToCanvas(e.ctx),e.ctx.restore());});}else for(var a={},o=this.storage.getDisplayList(!0),s=0;s<o.length;s++){var l=o[s];this._doPaintEl(l,e,!0,a);}return e.dom;},getWidth:function getWidth(){return this._width;},getHeight:function getHeight(){return this._height;},_getSize:function _getSize(t){var e=this._opts,n=["width","height"][t],i=["clientWidth","clientHeight"][t],r=["paddingLeft","paddingTop"][t],a=["paddingRight","paddingBottom"][t];if(null!=e[n]&&"auto"!==e[n])return parseFloat(e[n]);var o=this.root,s=document.defaultView.getComputedStyle(o);return(o[i]||oi(s[n])||oi(o.style[n]))-(oi(s[r])||0)-(oi(s[a])||0)|0;},pathToImage:function pathToImage(t,e){e=e||this.dpr;var n=document.createElement("canvas"),i=n.getContext("2d"),r=t.getBoundingRect(),a=t.style,o=a.shadowBlur*e,s=a.shadowOffsetX*e,l=a.shadowOffsetY*e,u=a.hasStroke()?a.lineWidth:0,h=Math.max(u/2,-s+o),c=Math.max(u/2,s+o),f=Math.max(u/2,-l+o),d=Math.max(u/2,l+o),p=r.width+h+c,g=r.height+f+d;n.width=p*e,n.height=g*e,i.scale(e,e),i.clearRect(0,0,p,g),i.dpr=e;var v={position:t.position,rotation:t.rotation,scale:t.scale};t.position=[h-r.x,f-r.y],t.rotation=0,t.scale=[1,1],t.updateTransform(),t&&t.brush(i);var m=ai,y=new m({style:{x:0,y:0,image:n}});return null!=v.position&&(y.position=t.position=v.position),null!=v.rotation&&(y.rotation=t.rotation=v.rotation),null!=v.scale&&(y.scale=t.scale=v.scale),y;}};var Cd="undefined"!=typeof window&&!!window.addEventListener,Id=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Dd=function Dd(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,ff.call(this);};Dd.prototype={constructor:Dd,addClip:function addClip(t){this._clips.push(t);},addAnimator:function addAnimator(t){t.animation=this;for(var e=t.getClips(),n=0;n<e.length;n++){this.addClip(e[n]);}},removeClip:function removeClip(t){var e=u(this._clips,t);e>=0&&this._clips.splice(e,1);},removeAnimator:function removeAnimator(t){for(var e=t.getClips(),n=0;n<e.length;n++){this.removeClip(e[n]);}t.animation=null;},_update:function _update(){for(var t=new Date().getTime()-this._pausedTime,e=t-this._time,n=this._clips,i=n.length,r=[],a=[],o=0;i>o;o++){var s=n[o],l=s.step(t,e);l&&(r.push(l),a.push(s));}for(var o=0;i>o;){n[o]._needsRemove?(n[o]=n[i-1],n.pop(),i--):o++;}i=r.length;for(var o=0;i>o;o++){a[o].fire(r[o]);}this._time=t,this.onframe(e),this.trigger("frame",e),this.stage.update&&this.stage.update();},_startLoop:function _startLoop(){function t(){e._running&&(od(t),!e._paused&&e._update());}var e=this;this._running=!0,od(t);},start:function start(){this._time=new Date().getTime(),this._pausedTime=0,this._startLoop();},stop:function stop(){this._running=!1;},pause:function pause(){this._paused||(this._pauseStart=new Date().getTime(),this._paused=!0);},resume:function resume(){this._paused&&(this._pausedTime+=new Date().getTime()-this._pauseStart,this._paused=!1);},clear:function clear(){this._clips=[];},isFinished:function isFinished(){return!this._clips.length;},animate:function animate(t,e){e=e||{};var n=new zf(t,e.loop,e.getter,e.setter);return this.addAnimator(n),n;}},c(Dd,ff);var Td=function Td(){this._track=[];};Td.prototype={constructor:Td,recognize:function recognize(t,e,n){return this._doTrack(t,e,n),this._recognize(t);},clear:function clear(){return this._track.length=0,this;},_doTrack:function _doTrack(t,e,n){var i=t.touches;if(i){for(var r={points:[],touches:[],target:e,event:t},a=0,o=i.length;o>a;a++){var s=i[a],l=di(n,s,{});r.points.push([l.zrX,l.zrY]),r.touches.push(s);}this._track.push(r);}},_recognize:function _recognize(t){for(var e in kd){if(kd.hasOwnProperty(e)){var n=kd[e](this._track,t);if(n)return n;}}}};var kd={pinch:function pinch(t,e){var n=t.length;if(n){var i=(t[n-1]||{}).points,r=(t[n-2]||{}).points||i;if(r&&r.length>1&&i&&i.length>1){var a=yi(i)/yi(r);!isFinite(a)&&(a=1),e.pinchScale=a;var o=_i(i);return e.pinchX=o[0],e.pinchY=o[1],{type:"pinch",target:t[0].target,event:e};}}}},Ad=300,Ld=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],Pd=["touchstart","touchend","touchmove"],Od={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},Ed=p(Ld,function(t){var e=t.replace("mouse","pointer");return Od[e]?e:t;}),Rd={mousemove:function mousemove(t){t=gi(this.dom,t),this.trigger("mousemove",t);},mouseout:function mouseout(t){t=gi(this.dom,t);var e=t.toElement||t.relatedTarget;if(e!=this.dom)for(;e&&9!=e.nodeType;){if(e===this.dom)return;e=e.parentNode;}this.trigger("mouseout",t);},touchstart:function touchstart(t){t=gi(this.dom,t),t.zrByTouch=!0,this._lastTouchMoment=new Date(),wi(this,t,"start"),Rd.mousemove.call(this,t),Rd.mousedown.call(this,t),bi(this);},touchmove:function touchmove(t){t=gi(this.dom,t),t.zrByTouch=!0,wi(this,t,"change"),Rd.mousemove.call(this,t),bi(this);},touchend:function touchend(t){t=gi(this.dom,t),t.zrByTouch=!0,wi(this,t,"end"),Rd.mouseup.call(this,t),+new Date()-this._lastTouchMoment<Ad&&Rd.click.call(this,t),bi(this);},pointerdown:function pointerdown(t){Rd.mousedown.call(this,t);},pointermove:function pointermove(t){Mi(t)||Rd.mousemove.call(this,t);},pointerup:function pointerup(t){Rd.mouseup.call(this,t);},pointerout:function pointerout(t){Mi(t)||Rd.mouseout.call(this,t);}};d(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){Rd[t]=function(e){e=gi(this.dom,e),this.trigger(t,e);};});var zd=Ci.prototype;zd.dispose=function(){for(var t=Ld.concat(Pd),e=0;e<t.length;e++){var n=t[e];mi(this.dom,xi(n),this._handlers[n]);}},zd.setCursor=function(t){this.dom.style&&(this.dom.style.cursor=t||"default");},c(Ci,ff);var Bd=!Gc.canvasSupported,Nd={canvas:Sd},Fd={},Vd="4.0.4",Hd=function Hd(t,e,n){n=n||{},this.dom=e,this.id=t;var i=this,r=new $f(),a=n.renderer;if(Bd){if(!Nd.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");a="vml";}else a&&Nd[a]||(a="canvas");var o=new Nd[a](e,r,n,t);this.storage=r,this.painter=o;var s=Gc.node||Gc.worker?null:new Ci(o.getViewportRoot());this.handler=new gf(r,o,s,o.root),this.animation=new Dd({stage:{update:y(this.flush,this)}}),this.animation.start(),this._needsRefresh;var l=r.delFromStorage,u=r.addToStorage;r.delFromStorage=function(t){l.call(r,t),t&&t.removeSelfFromZr(i);},r.addToStorage=function(t){u.call(r,t),t.addSelfToZr(i);};};Hd.prototype={constructor:Hd,getId:function getId(){return this.id;},add:function add(t){this.storage.addRoot(t),this._needsRefresh=!0;},remove:function remove(t){this.storage.delRoot(t),this._needsRefresh=!0;},configLayer:function configLayer(t,e){this.painter.configLayer&&this.painter.configLayer(t,e),this._needsRefresh=!0;},setBackgroundColor:function setBackgroundColor(t){this.painter.setBackgroundColor&&this.painter.setBackgroundColor(t),this._needsRefresh=!0;},refreshImmediately:function refreshImmediately(){this._needsRefresh=!1,this.painter.refresh(),this._needsRefresh=!1;},refresh:function refresh(){this._needsRefresh=!0;},flush:function flush(){var t;this._needsRefresh&&(t=!0,this.refreshImmediately()),this._needsRefreshHover&&(t=!0,this.refreshHoverImmediately()),t&&this.trigger("rendered");},addHover:function addHover(t,e){this.painter.addHover&&(this.painter.addHover(t,e),this.refreshHover());},removeHover:function removeHover(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover());},clearHover:function clearHover(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover());},refreshHover:function refreshHover(){this._needsRefreshHover=!0;},refreshHoverImmediately:function refreshHoverImmediately(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover();},resize:function resize(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize();},clearAnimation:function clearAnimation(){this.animation.clear();},getWidth:function getWidth(){return this.painter.getWidth();},getHeight:function getHeight(){return this.painter.getHeight();},pathToImage:function pathToImage(t,e){return this.painter.pathToImage(t,e);},setCursorStyle:function setCursorStyle(t){this.handler.setCursorStyle(t);},findHover:function findHover(t,e){return this.handler.findHover(t,e);},on:function on(t,e,n){this.handler.on(t,e,n);},off:function off(t,e){this.handler.off(t,e);},trigger:function trigger(t,e){this.handler.trigger(t,e);},clear:function clear(){this.storage.delRoot(),this.painter.clear();},dispose:function dispose(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,Ai(this.id);}};var Wd=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({version:Vd,init:Ii,dispose:Di,getInstance:Ti,registerPainter:ki}),Gd=d,jd=M,qd=x,Ud="series\x00",Xd=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"],Yd=0,Zd=".",$d="___EC__COMPONENT__CONTAINER___",Kd=0,Qd=function Qd(t){for(var e=0;e<t.length;e++){t[e][1]||(t[e][1]=t[e][0]);}return function(e,n,i){for(var r={},a=0;a<t.length;a++){var o=t[a][1];if(!(n&&u(n,o)>=0||i&&u(i,o)<0)){var s=e.getShallow(o);null!=s&&(r[t[a][0]]=s);}}return r;};},Jd=Qd([["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),tp={getLineStyle:function getLineStyle(t){var e=Jd(this,t),n=this.getLineDash(e.lineWidth);return n&&(e.lineDash=n),e;},getLineDash:function getLineDash(t){null==t&&(t=1);var e=this.get("type"),n=Math.max(t,2),i=4*t;return"solid"===e||null==e?null:"dashed"===e?[i,i]:[n,n];}},ep=Qd([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),np={getAreaStyle:function getAreaStyle(t,e){return ep(this,t,e);}},ip=Math.pow,rp=Math.sqrt,ap=1e-8,op=1e-4,sp=rp(3),lp=1/3,up=H(),hp=H(),cp=H(),fp=Math.min,dp=Math.max,pp=Math.sin,gp=Math.cos,vp=2*Math.PI,mp=H(),yp=H(),_p=H(),xp=[],wp=[],bp={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},Mp=[],Sp=[],Cp=[],Ip=[],Dp=Math.min,Tp=Math.max,kp=Math.cos,Ap=Math.sin,Lp=Math.sqrt,Pp=Math.abs,Op="undefined"!=typeof Float32Array,Ep=function Ep(t){this._saveData=!t,this._saveData&&(this.data=[]),this._ctx=null;};Ep.prototype={constructor:Ep,_xi:0,_yi:0,_x0:0,_y0:0,_ux:0,_uy:0,_len:0,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function setScale(t,e){this._ux=Pp(1/Ff/t)||0,this._uy=Pp(1/Ff/e)||0;},getContext:function getContext(){return this._ctx;},beginPath:function beginPath(t){return this._ctx=t,t&&t.beginPath(),t&&(this.dpr=t.dpr),this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this;},moveTo:function moveTo(t,e){return this.addData(bp.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this;},lineTo:function lineTo(t,e){var n=Pp(t-this._xi)>this._ux||Pp(e-this._yi)>this._uy||this._len<5;return this.addData(bp.L,t,e),this._ctx&&n&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),n&&(this._xi=t,this._yi=e),this;},bezierCurveTo:function bezierCurveTo(t,e,n,i,r,a){return this.addData(bp.C,t,e,n,i,r,a),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,n,i,r,a):this._ctx.bezierCurveTo(t,e,n,i,r,a)),this._xi=r,this._yi=a,this;},quadraticCurveTo:function quadraticCurveTo(t,e,n,i){return this.addData(bp.Q,t,e,n,i),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,n,i):this._ctx.quadraticCurveTo(t,e,n,i)),this._xi=n,this._yi=i,this;},arc:function arc(t,e,n,i,r,a){return this.addData(bp.A,t,e,n,n,i,r-i,0,a?0:1),this._ctx&&this._ctx.arc(t,e,n,i,r,a),this._xi=kp(r)*n+t,this._yi=Ap(r)*n+t,this;},arcTo:function arcTo(t,e,n,i,r){return this._ctx&&this._ctx.arcTo(t,e,n,i,r),this;},rect:function rect(t,e,n,i){return this._ctx&&this._ctx.rect(t,e,n,i),this.addData(bp.R,t,e,n,i),this;},closePath:function closePath(){this.addData(bp.Z);var t=this._ctx,e=this._x0,n=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,n),t.closePath()),this._xi=e,this._yi=n,this;},fill:function fill(t){t&&t.fill(),this.toStatic();},stroke:function stroke(t){t&&t.stroke(),this.toStatic();},setLineDash:function setLineDash(t){if(t instanceof Array){this._lineDash=t,this._dashIdx=0;for(var e=0,n=0;n<t.length;n++){e+=t[n];}this._dashSum=e;}return this;},setLineDashOffset:function setLineDashOffset(t){return this._dashOffset=t,this;},len:function len(){return this._len;},setData:function setData(t){var e=t.length;this.data&&this.data.length==e||!Op||(this.data=new Float32Array(e));for(var n=0;e>n;n++){this.data[n]=t[n];}this._len=e;},appendPath:function appendPath(t){t instanceof Array||(t=[t]);for(var e=t.length,n=0,i=this._len,r=0;e>r;r++){n+=t[r].len();}Op&&this.data instanceof Float32Array&&(this.data=new Float32Array(i+n));for(var r=0;e>r;r++){for(var a=t[r].data,o=0;o<a.length;o++){this.data[i++]=a[o];}}this._len=i;},addData:function addData(t){if(this._saveData){var e=this.data;this._len+arguments.length>e.length&&(this._expandData(),e=this.data);for(var n=0;n<arguments.length;n++){e[this._len++]=arguments[n];}this._prevCmd=t;}},_expandData:function _expandData(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++){t[e]=this.data[e];}this.data=t;}},_needsDash:function _needsDash(){return this._lineDash;},_dashedLineTo:function _dashedLineTo(t,e){var n,i,r=this._dashSum,a=this._dashOffset,o=this._lineDash,s=this._ctx,l=this._xi,u=this._yi,h=t-l,c=e-u,f=Lp(h*h+c*c),d=l,p=u,g=o.length;for(h/=f,c/=f,0>a&&(a=r+a),a%=r,d-=a*h,p-=a*c;h>0&&t>=d||0>h&&d>=t||0==h&&(c>0&&e>=p||0>c&&p>=e);){i=this._dashIdx,n=o[i],d+=h*n,p+=c*n,this._dashIdx=(i+1)%g,h>0&&l>d||0>h&&d>l||c>0&&u>p||0>c&&p>u||s[i%2?"moveTo":"lineTo"](h>=0?Dp(d,t):Tp(d,t),c>=0?Dp(p,e):Tp(p,e));}h=d-t,c=p-e,this._dashOffset=-Lp(h*h+c*c);},_dashedBezierTo:function _dashedBezierTo(t,e,n,i,r,a){var o,s,l,u,h,c=this._dashSum,f=this._dashOffset,d=this._lineDash,p=this._ctx,g=this._xi,v=this._yi,m=tr,y=0,_=this._dashIdx,x=d.length,w=0;for(0>f&&(f=c+f),f%=c,o=0;1>o;o+=.1){s=m(g,t,n,r,o+.1)-m(g,t,n,r,o),l=m(v,e,i,a,o+.1)-m(v,e,i,a,o),y+=Lp(s*s+l*l);}for(;x>_&&(w+=d[_],!(w>f));_++){}for(o=(w-f)/y;1>=o;){u=m(g,t,n,r,o),h=m(v,e,i,a,o),_%2?p.moveTo(u,h):p.lineTo(u,h),o+=d[_]/y,_=(_+1)%x;}_%2!==0&&p.lineTo(r,a),s=r-u,l=a-h,this._dashOffset=-Lp(s*s+l*l);},_dashedQuadraticTo:function _dashedQuadraticTo(t,e,n,i){var r=n,a=i;n=(n+2*t)/3,i=(i+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,n,i,r,a);},toStatic:function toStatic(){var t=this.data;t instanceof Array&&(t.length=this._len,Op&&(this.data=new Float32Array(t)));},getBoundingRect:function getBoundingRect(){Mp[0]=Mp[1]=Cp[0]=Cp[1]=Number.MAX_VALUE,Sp[0]=Sp[1]=Ip[0]=Ip[1]=-Number.MAX_VALUE;for(var t=this.data,e=0,n=0,i=0,r=0,a=0;a<t.length;){var o=t[a++];switch(1==a&&(e=t[a],n=t[a+1],i=e,r=n),o){case bp.M:i=t[a++],r=t[a++],e=i,n=r,Cp[0]=i,Cp[1]=r,Ip[0]=i,Ip[1]=r;break;case bp.L:dr(e,n,t[a],t[a+1],Cp,Ip),e=t[a++],n=t[a++];break;case bp.C:pr(e,n,t[a++],t[a++],t[a++],t[a++],t[a],t[a+1],Cp,Ip),e=t[a++],n=t[a++];break;case bp.Q:gr(e,n,t[a++],t[a++],t[a],t[a+1],Cp,Ip),e=t[a++],n=t[a++];break;case bp.A:var s=t[a++],l=t[a++],u=t[a++],h=t[a++],c=t[a++],f=t[a++]+c,d=(t[a++],1-t[a++]);1==a&&(i=kp(c)*u+s,r=Ap(c)*h+l),vr(s,l,u,h,c,f,d,Cp,Ip),e=kp(f)*u+s,n=Ap(f)*h+l;break;case bp.R:i=e=t[a++],r=n=t[a++];var p=t[a++],g=t[a++];dr(i,r,i+p,r+g,Cp,Ip);break;case bp.Z:e=i,n=r;}oe(Mp,Mp,Cp),se(Sp,Sp,Ip);}return 0===a&&(Mp[0]=Mp[1]=Sp[0]=Sp[1]=0),new rn(Mp[0],Mp[1],Sp[0]-Mp[0],Sp[1]-Mp[1]);},rebuildPath:function rebuildPath(t){for(var e,n,i,r,a,o,s=this.data,l=this._ux,u=this._uy,h=this._len,c=0;h>c;){var f=s[c++];switch(1==c&&(i=s[c],r=s[c+1],e=i,n=r),f){case bp.M:e=i=s[c++],n=r=s[c++],t.moveTo(i,r);break;case bp.L:a=s[c++],o=s[c++],(Pp(a-i)>l||Pp(o-r)>u||c===h-1)&&(t.lineTo(a,o),i=a,r=o);break;case bp.C:t.bezierCurveTo(s[c++],s[c++],s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case bp.Q:t.quadraticCurveTo(s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case bp.A:var d=s[c++],p=s[c++],g=s[c++],v=s[c++],m=s[c++],y=s[c++],_=s[c++],x=s[c++],w=g>v?g:v,b=g>v?1:g/v,M=g>v?v/g:1,S=Math.abs(g-v)>.001,C=m+y;S?(t.translate(d,p),t.rotate(_),t.scale(b,M),t.arc(0,0,w,m,C,1-x),t.scale(1/b,1/M),t.rotate(-_),t.translate(-d,-p)):t.arc(d,p,w,m,C,1-x),1==c&&(e=kp(m)*g+d,n=Ap(m)*v+p),i=kp(C)*g+d,r=Ap(C)*v+p;break;case bp.R:e=i=s[c],n=r=s[c+1],t.rect(s[c++],s[c++],s[c++],s[c++]);break;case bp.Z:t.closePath(),i=e,r=n;}}}},Ep.CMD=bp;var Rp=2*Math.PI,zp=2*Math.PI,Bp=Ep.CMD,Np=2*Math.PI,Fp=1e-4,Vp=[-1,-1,-1],Hp=[-1,-1],Wp=rd.prototype.getCanvasPattern,Gp=Math.abs,jp=new Ep(!0);Lr.prototype={constructor:Lr,type:"path",__dirtyPath:!0,strokeContainThreshold:5,brush:function brush(t,e){var n=this.style,i=this.path||jp,r=n.hasStroke(),a=n.hasFill(),o=n.fill,s=n.stroke,l=a&&!!o.colorStops,u=r&&!!s.colorStops,h=a&&!!o.image,c=r&&!!s.image;if(n.bind(t,this,e),this.setTransform(t),this.__dirty){var f;l&&(f=f||this.getBoundingRect(),this._fillGradient=n.getGradient(t,o,f)),u&&(f=f||this.getBoundingRect(),this._strokeGradient=n.getGradient(t,s,f));}l?t.fillStyle=this._fillGradient:h&&(t.fillStyle=Wp.call(o,t)),u?t.strokeStyle=this._strokeGradient:c&&(t.strokeStyle=Wp.call(s,t));var d=n.lineDash,p=n.lineDashOffset,g=!!t.setLineDash,v=this.getGlobalScale();i.setScale(v[0],v[1]),this.__dirtyPath||d&&!g&&r?(i.beginPath(t),d&&!g&&(i.setLineDash(d),i.setLineDashOffset(p)),this.buildPath(i,this.shape,!1),this.path&&(this.__dirtyPath=!1)):(t.beginPath(),this.path.rebuildPath(t)),a&&i.fill(t),d&&g&&(t.setLineDash(d),t.lineDashOffset=p),r&&i.stroke(t),d&&g&&t.setLineDash([]),null!=n.text&&(this.restoreTransform(t),this.drawRectText(t,this.getBoundingRect()));},buildPath:function buildPath(){},createPathProxy:function createPathProxy(){this.path=new Ep();},getBoundingRect:function getBoundingRect(){var t=this._rect,e=this.style,n=!t;if(n){var i=this.path;i||(i=this.path=new Ep()),this.__dirtyPath&&(i.beginPath(),this.buildPath(i,this.shape,!1)),t=i.getBoundingRect();}if(this._rect=t,e.hasStroke()){var r=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||n){r.copy(t);var a=e.lineWidth,o=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(a=Math.max(a,this.strokeContainThreshold||4)),o>1e-10&&(r.width+=a/o,r.height+=a/o,r.x-=a/o/2,r.y-=a/o/2);}return r;}return t;},contain:function contain(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect(),r=this.style;if(t=n[0],e=n[1],i.contain(t,e)){var a=this.path.data;if(r.hasStroke()){var o=r.lineWidth,s=r.strokeNoScale?this.getLineScale():1;if(s>1e-10&&(r.hasFill()||(o=Math.max(o,this.strokeContainThreshold)),Ar(a,o/s,t,e)))return!0;}if(r.hasFill())return kr(a,t,e);}return!1;},dirty:function dirty(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this.__dirty=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty();},animateShape:function animateShape(t){return this.animate("shape",t);},attrKV:function attrKV(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):ri.prototype.attrKV.call(this,t,e);},setShape:function setShape(t,e){var n=this.shape;if(n){if(M(t))for(var i in t){t.hasOwnProperty(i)&&(n[i]=t[i]);}else n[t]=e;this.dirty(!0);}return this;},getLineScale:function getLineScale(){var t=this.transform;return t&&Gp(t[0]-1)>1e-10&&Gp(t[3]-1)>1e-10?Math.sqrt(Gp(t[0]*t[3]-t[2]*t[1])):1;}},Lr.extend=function(t){var e=function e(_e2){Lr.call(this,_e2),t.style&&this.style.extendFrom(t.style,!1);var n=t.shape;if(n){this.shape=this.shape||{};var i=this.shape;for(var r in n){!i.hasOwnProperty(r)&&n.hasOwnProperty(r)&&(i[r]=n[r]);}}t.init&&t.init.call(this,_e2);};h(e,Lr);for(var n in t){"style"!==n&&"shape"!==n&&(e.prototype[n]=t[n]);}return e;},h(Lr,ri);var qp=Ep.CMD,Up=[[],[],[]],Xp=Math.sqrt,Yp=Math.atan2,Zp=function Zp(t,e){var n,i,r,a,o,s,l=t.data,u=qp.M,h=qp.C,c=qp.L,f=qp.R,d=qp.A,p=qp.Q;for(r=0,a=0;r<l.length;){switch(n=l[r++],a=r,i=0,n){case u:i=1;break;case c:i=1;break;case h:i=3;break;case p:i=2;break;case d:var g=e[4],v=e[5],m=Xp(e[0]*e[0]+e[1]*e[1]),y=Xp(e[2]*e[2]+e[3]*e[3]),_=Yp(-e[1]/y,e[0]/m);l[r]*=m,l[r++]+=g,l[r]*=y,l[r++]+=v,l[r++]*=m,l[r++]*=y,l[r++]+=_,l[r++]+=_,r+=2,a=r;break;case f:s[0]=l[r++],s[1]=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1],s[0]+=l[r++],s[1]+=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1];}for(o=0;i>o;o++){var s=Up[o];s[0]=l[r++],s[1]=l[r++],ae(s,s,e),l[a++]=s[0],l[a++]=s[1];}}},$p=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"],Kp=Math.sqrt,Qp=Math.sin,Jp=Math.cos,tg=Math.PI,eg=function eg(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]);},ng=function ng(t,e){return(t[0]*e[0]+t[1]*e[1])/(eg(t)*eg(e));},ig=function ig(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(ng(t,e));},rg=function rg(t){ri.call(this,t);};rg.prototype={constructor:rg,type:"text",brush:function brush(t,e){var n=this.style;this.__dirty&&Vn(n,!0),n.fill=n.stroke=n.shadowBlur=n.shadowColor=n.shadowOffsetX=n.shadowOffsetY=null;var i=n.text;null!=i&&(i+=""),n.bind(t,this,e),ii(i,n)&&(this.setTransform(t),Wn(this,t,i,n),this.restoreTransform(t));},getBoundingRect:function getBoundingRect(){var t=this.style;if(this.__dirty&&Vn(t,!0),!this._rect){var e=t.text;null!=e?e+="":e="";var n=Mn(t.text+"",t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.rich);if(n.x+=t.x||0,n.y+=t.y||0,Jn(t.textStroke,t.textStrokeWidth)){var i=t.textStrokeWidth;n.x-=i/2,n.y-=i/2,n.width+=i,n.height+=i;}this._rect=n;}return this._rect;}},h(rg,ri);var ag=Lr.extend({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function buildPath(t,e,n){n&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0);}}),og=[["shadowBlur",0],["shadowColor","#000"],["shadowOffsetX",0],["shadowOffsetY",0]],sg=function sg(t){return Gc.browser.ie&&Gc.browser.version>=11?function(){var e,n=this.__clipPaths,i=this.style;if(n)for(var r=0;r<n.length;r++){var a=n[r],o=a&&a.shape,s=a&&a.type;if(o&&("sector"===s&&o.startAngle===o.endAngle||"rect"===s&&(!o.width||!o.height))){for(var l=0;l<og.length;l++){og[l][2]=i[og[l][0]],i[og[l][0]]=og[l][1];}e=!0;break;}}if(t.apply(this,arguments),e)for(var l=0;l<og.length;l++){i[og[l][0]]=og[l][2];}}:t;},lg=Lr.extend({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},brush:sg(Lr.prototype.brush),buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),a=Math.max(e.r,0),o=e.startAngle,s=e.endAngle,l=e.clockwise,u=Math.cos(o),h=Math.sin(o);t.moveTo(u*r+n,h*r+i),t.lineTo(u*a+n,h*a+i),t.arc(n,i,a,o,s,!l),t.lineTo(Math.cos(s)*r+n,Math.sin(s)*r+i),0!==r&&t.arc(n,i,r,s,o,l),t.closePath();}}),ug=Lr.extend({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=2*Math.PI;t.moveTo(n+e.r,i),t.arc(n,i,e.r,0,r,!1),t.moveTo(n+e.r0,i),t.arc(n,i,e.r0,0,r,!0);}}),hg=function hg(t,e){for(var n=t.length,i=[],r=0,a=1;n>a;a++){r+=ee(t[a-1],t[a]);}var o=r/2;o=n>o?n:o;for(var a=0;o>a;a++){var s,l,u,h=a/(o-1)*(e?n:n-1),c=Math.floor(h),f=h-c,d=t[c%n];e?(s=t[(c-1+n)%n],l=t[(c+1)%n],u=t[(c+2)%n]):(s=t[0===c?c:c-1],l=t[c>n-2?n-1:c+1],u=t[c>n-3?n-1:c+2]);var p=f*f,g=f*p;i.push([Nr(s[0],d[0],l[0],u[0],f,p,g),Nr(s[1],d[1],l[1],u[1],f,p,g)]);}return i;},cg=function cg(t,e,n,i){var r,a,o,s,l=[],u=[],h=[],c=[];if(i){o=[1/0,1/0],s=[-1/0,-1/0];for(var f=0,d=t.length;d>f;f++){oe(o,o,t[f]),se(s,s,t[f]);}oe(o,o,i[0]),se(s,s,i[1]);}for(var f=0,d=t.length;d>f;f++){var p=t[f];if(n)r=t[f?f-1:d-1],a=t[(f+1)%d];else{if(0===f||f===d-1){l.push(G(t[f]));continue;}r=t[f-1],a=t[f+1];}X(u,a,r),J(u,u,e);var g=ee(p,r),v=ee(p,a),m=g+v;0!==m&&(g/=m,v/=m),J(h,u,-g),J(c,u,v);var y=q([],p,h),_=q([],p,c);i&&(se(y,y,o),oe(y,y,s),se(_,_,o),oe(_,_,s)),l.push(y),l.push(_);}return n&&l.push(l.shift()),l;},fg=Lr.extend({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function buildPath(t,e){Fr(t,e,!0);}}),dg=Lr.extend({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){Fr(t,e,!1);}}),pg=Lr.extend({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.x,i=e.y,r=e.width,a=e.height;e.r?Fn(t,e):t.rect(n,i,r,a),t.closePath();}}),gg=Lr.extend({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.x1,i=e.y1,r=e.x2,a=e.y2,o=e.percent;0!==o&&(t.moveTo(n,i),1>o&&(r=n*(1-o)+r*o,a=i*(1-o)+a*o),t.lineTo(r,a));},pointAt:function pointAt(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t];}}),vg=[],mg=Lr.extend({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.x1,i=e.y1,r=e.x2,a=e.y2,o=e.cpx1,s=e.cpy1,l=e.cpx2,u=e.cpy2,h=e.percent;0!==h&&(t.moveTo(n,i),null==l||null==u?(1>h&&(hr(n,o,r,h,vg),o=vg[1],r=vg[2],hr(i,s,a,h,vg),s=vg[1],a=vg[2]),t.quadraticCurveTo(o,s,r,a)):(1>h&&(rr(n,o,l,r,h,vg),o=vg[1],l=vg[2],r=vg[3],rr(i,s,u,a,h,vg),s=vg[1],u=vg[2],a=vg[3]),t.bezierCurveTo(o,s,l,u,r,a)));},pointAt:function pointAt(t){return Vr(this.shape,t,!1);},tangentAt:function tangentAt(t){var e=Vr(this.shape,t,!0);return te(e,e);}}),yg=Lr.extend({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r,0),a=e.startAngle,o=e.endAngle,s=e.clockwise,l=Math.cos(a),u=Math.sin(a);t.moveTo(l*r+n,u*r+i),t.arc(n,i,r,a,o,!s);}}),_g=Lr.extend({type:"compound",shape:{paths:null},_updatePathDirty:function _updatePathDirty(){for(var t=this.__dirtyPath,e=this.shape.paths,n=0;n<e.length;n++){t=t||e[n].__dirtyPath;}this.__dirtyPath=t,this.__dirty=this.__dirty||t;},beforeBrush:function beforeBrush(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),n=0;n<t.length;n++){t[n].path||t[n].createPathProxy(),t[n].path.setScale(e[0],e[1]);}},buildPath:function buildPath(t,e){for(var n=e.paths||[],i=0;i<n.length;i++){n[i].buildPath(t,n[i].shape,!0);}},afterBrush:function afterBrush(){for(var t=this.shape.paths||[],e=0;e<t.length;e++){t[e].__dirtyPath=!1;}},getBoundingRect:function getBoundingRect(){return this._updatePathDirty(),Lr.prototype.getBoundingRect.call(this);}}),xg=function xg(t){this.colorStops=t||[];};xg.prototype={constructor:xg,addColorStop:function addColorStop(t,e){this.colorStops.push({offset:t,color:e});}};var wg=function wg(t,e,n,i,r,a){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==n?1:n,this.y2=null==i?0:i,this.type="linear",this.global=a||!1,xg.call(this,r);};wg.prototype={constructor:wg},h(wg,xg);var bg=function bg(t,e,n,i,r){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==n?.5:n,this.type="radial",this.global=r||!1,xg.call(this,i);};bg.prototype={constructor:bg},h(bg,xg),Hr.prototype.incremental=!0,Hr.prototype.clearDisplaybles=function(){this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.dirty(),this.notClear=!1;},Hr.prototype.addDisplayable=function(t,e){e?this._temporaryDisplayables.push(t):this._displayables.push(t),this.dirty();},Hr.prototype.addDisplayables=function(t,e){e=e||!1;for(var n=0;n<t.length;n++){this.addDisplayable(t[n],e);}},Hr.prototype.eachPendingDisplayable=function(t){for(var e=this._cursor;e<this._displayables.length;e++){t&&t(this._displayables[e]);}for(var e=0;e<this._temporaryDisplayables.length;e++){t&&t(this._temporaryDisplayables[e]);}},Hr.prototype.update=function(){this.updateTransform();for(var t=this._cursor;t<this._displayables.length;t++){var e=this._displayables[t];e.parent=this,e.update(),e.parent=null;}for(var t=0;t<this._temporaryDisplayables.length;t++){var e=this._temporaryDisplayables[t];e.parent=this,e.update(),e.parent=null;}},Hr.prototype.brush=function(t){for(var e=this._cursor;e<this._displayables.length;e++){var n=this._displayables[e];n.beforeBrush&&n.beforeBrush(t),n.brush(t,e===this._cursor?null:this._displayables[e-1]),n.afterBrush&&n.afterBrush(t);}this._cursor=e;for(var e=0;e<this._temporaryDisplayables.length;e++){var n=this._temporaryDisplayables[e];n.beforeBrush&&n.beforeBrush(t),n.brush(t,0===e?null:this._temporaryDisplayables[e-1]),n.afterBrush&&n.afterBrush(t);}this._temporaryDisplayables=[],this.notClear=!0;};var Mg=[];Hr.prototype.getBoundingRect=function(){if(!this._rect){for(var t=new rn(1/0,1/0,-1/0,-1/0),e=0;e<this._displayables.length;e++){var n=this._displayables[e],i=n.getBoundingRect().clone();n.needLocalTransform()&&i.applyTransform(n.getLocalTransform(Mg)),t.union(i);}this._rect=t;}return this._rect;},Hr.prototype.contain=function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();if(i.contain(n[0],n[1]))for(var r=0;r<this._displayables.length;r++){var a=this._displayables[r];if(a.contain(t,e))return!0;}return!1;},h(Hr,ri);var Sg=Math.round,Cg=Math.max,Ig=Math.min,Dg={},Tg=Br,kg=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({extendShape:Wr,extendPath:Gr,makePath:jr,makeImage:qr,mergePath:Tg,resizePath:Xr,subPixelOptimizeLine:Yr,subPixelOptimizeRect:Zr,subPixelOptimize:$r,setHoverStyle:ua,setLabelStyle:ha,setTextStyle:ca,setText:fa,getFont:_a,updateProps:wa,initProps:ba,getTransform:Ma,applyTransform:Sa,transformDirection:Ca,groupTransition:Ia,clipPointsByRect:Da,clipRectByRect:Ta,createIcon:ka,Group:Xf,Image:ai,Text:rg,Circle:ag,Sector:lg,Ring:ug,Polygon:fg,Polyline:dg,Rect:pg,Line:gg,BezierCurve:mg,Arc:yg,IncrementalDisplayable:Hr,CompoundPath:_g,LinearGradient:wg,RadialGradient:bg,BoundingRect:rn}),Ag=["textStyle","color"],Lg={getTextColor:function getTextColor(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(Ag):null);},getFont:function getFont(){return _a({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel);},getTextRect:function getTextRect(t){return Mn(t,this.getFont(),this.getShallow("align"),this.getShallow("verticalAlign")||this.getShallow("baseline"),this.getShallow("padding"),this.getShallow("rich"),this.getShallow("truncateText"));}},Pg=Qd([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["textPosition"],["textAlign"]]),Og={getItemStyle:function getItemStyle(t,e){var n=Pg(this,t,e),i=this.getBorderLineDash();return i&&(n.lineDash=i),n;},getBorderLineDash:function getBorderLineDash(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1];}},Eg=c,Rg=Vi();Aa.prototype={constructor:Aa,init:null,mergeOption:function mergeOption(t){r(this.option,t,!0);},get:function get(t,e){return null==t?this.option:La(this.option,this.parsePath(t),!e&&Pa(this,t));},getShallow:function getShallow(t,e){var n=this.option,i=null==n?n:n[t],r=!e&&Pa(this,t);return null==i&&r&&(i=r.getShallow(t)),i;},getModel:function getModel(t,e){var n,i=null==t?this.option:La(this.option,t=this.parsePath(t));return e=e||(n=Pa(this,t))&&n.getModel(t),new Aa(i,e,this.ecModel);},isEmpty:function isEmpty(){return null==this.option;},restoreData:function restoreData(){},clone:function clone(){var t=this.constructor;return new t(i(this.option));},setReadOnly:function setReadOnly(){},parsePath:function parsePath(t){return"string"==typeof t&&(t=t.split(".")),t;},customizeGetParent:function customizeGetParent(t){Rg(this).getParent=t;},isAnimationEnabled:function isAnimationEnabled(){if(!Gc.node){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled();}}},Xi(Aa),Yi(Aa),Eg(Aa,tp),Eg(Aa,np),Eg(Aa,Lg),Eg(Aa,Og);var zg=0,Bg=1e-4,Ng=9007199254740991,Fg=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,Vg=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({linearMap:Ba,parsePercent:Na,round:Fa,asc:Va,getPrecision:Ha,getPrecisionSafe:Wa,getPixelPrecision:Ga,getPercentWithPrecision:ja,MAX_SAFE_INTEGER:Ng,remRadian:qa,isRadianAroundZero:Ua,parseDate:Xa,quantity:Ya,nice:$a,reformIntervals:Ka,isNumeric:Qa}),Hg=P,Wg=/([&<>"'])/g,Gg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},jg=["a","b","c","d","e","f","g"],qg=function qg(t,e){return"{"+t+(null==e?"":e)+"}";},Ug=kn,Xg=Mn,Yg=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({addCommas:Ja,toCamelCase:to,normalizeCssArray:Hg,encodeHTML:eo,formatTpl:no,formatTplSimple:io,getTooltipMarker:ro,formatTime:oo,capitalFirst:so,truncateText:Ug,getTextRect:Xg}),Zg=d,$g=["left","right","top","bottom","width","height"],Kg=[["width","left","right"],["height","top","bottom"]],Qg=(_(lo,"vertical"),_(lo,"horizontal"),{getBoxLayoutParams:function getBoxLayoutParams(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get("bottom"),width:this.get("width"),height:this.get("height")};}}),Jg=Vi(),tv=Aa.extend({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function $constructor(t,e,n,i){Aa.call(this,t,e,n,i),this.uid=Oa("ec_cpt_model");},init:function init(t,e,n){this.mergeDefaultAndTheme(t,n);},mergeDefaultAndTheme:function mergeDefaultAndTheme(t,e){var n=this.layoutMode,i=n?co(t):{},a=e.getTheme();r(t,a.get(this.mainType)),r(t,this.getDefaultOption()),n&&ho(t,i,n);},mergeOption:function mergeOption(t){r(this.option,t,!0);var e=this.layoutMode;e&&ho(this.option,t,e);},optionUpdated:function optionUpdated(){},getDefaultOption:function getDefaultOption(){var t=Jg(this);if(!t.defaultOption){for(var e=[],n=this.constructor;n;){var i=n.prototype.defaultOption;i&&e.push(i),n=n.superClass;}for(var a={},o=e.length-1;o>=0;o--){a=r(a,e[o],!0);}t.defaultOption=a;}return t.defaultOption;},getReferringComponents:function getReferringComponents(t){return this.ecModel.queryComponents({mainType:t,index:this.get(t+"Index",!0),id:this.get(t+"Id",!0)});}});Ki(tv,{registerWhenExtend:!0}),Ea(tv),Ra(tv,po),c(tv,Qg);var ev="";"undefined"!=typeof navigator&&(ev=navigator.platform||"");var nv={color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],gradientColor:["#f6efa6","#d88273","#bf444c"],textStyle:{fontFamily:ev.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:"auto",animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},iv=Vi(),rv={clearColorPalette:function clearColorPalette(){iv(this).colorIdx=0,iv(this).colorNameMap={};},getColorFromPalette:function getColorFromPalette(t,e,n){e=e||this;var i=iv(e),r=i.colorIdx||0,a=i.colorNameMap=i.colorNameMap||{};if(a.hasOwnProperty(t))return a[t];var o=Li(this.get("color",!0)),s=this.get("colorLayer",!0),l=null!=n&&s?go(s,n):o;if(l=l||o,l&&l.length){var u=l[r];return t&&(a[t]=u),i.colorIdx=(r+1)%l.length,u;}}},av={cartesian2d:function cartesian2d(t,e,n,i){var r=t.getReferringComponents("xAxis")[0],a=t.getReferringComponents("yAxis")[0];e.coordSysDims=["x","y"],n.set("x",r),n.set("y",a),mo(r)&&(i.set("x",r),e.firstCategoryDimIndex=0),mo(a)&&(i.set("y",a),e.firstCategoryDimIndex=1);},singleAxis:function singleAxis(t,e,n,i){var r=t.getReferringComponents("singleAxis")[0];e.coordSysDims=["single"],n.set("single",r),mo(r)&&(i.set("single",r),e.firstCategoryDimIndex=0);},polar:function polar(t,e,n,i){var r=t.getReferringComponents("polar")[0],a=r.findAxisModel("radiusAxis"),o=r.findAxisModel("angleAxis");e.coordSysDims=["radius","angle"],n.set("radius",a),n.set("angle",o),mo(a)&&(i.set("radius",a),e.firstCategoryDimIndex=0),mo(o)&&(i.set("angle",o),e.firstCategoryDimIndex=1);},geo:function geo(t,e){e.coordSysDims=["lng","lat"];},parallel:function parallel(t,e,n,i){var r=t.ecModel,a=r.getComponent("parallel",t.get("parallelIndex")),o=e.coordSysDims=a.dimensions.slice();d(a.parallelAxisIndex,function(t,a){var s=r.getComponent("parallelAxis",t),l=o[a];n.set(l,s),mo(s)&&null==e.firstCategoryDimIndex&&(i.set(l,s),e.firstCategoryDimIndex=a);});}},ov="original",sv="arrayRows",lv="objectRows",uv="keyedColumns",hv="unknown",cv="typedArray",fv="column",dv="row";yo.seriesDataToSource=function(t){return new yo({data:t,sourceFormat:C(t)?cv:ov,fromDataset:!1});},Yi(yo);var pv=Vi(),gv="\x00_ec_inner",vv=Aa.extend({init:function init(t,e,n,i){n=n||{},this.option=null,this._theme=new Aa(n),this._optionManager=i;},setOption:function setOption(t,e){O(!(gv in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption(null);},resetOption:function resetOption(t){var e=!1,n=this._optionManager;if(!t||"recreate"===t){var i=n.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this.mergeOption(i)):Oo.call(this,i),e=!0;}if(("timeline"===t||"media"===t)&&this.restoreData(),!t||"recreate"===t||"timeline"===t){var r=n.getTimelineOption(this);r&&(this.mergeOption(r),e=!0);}if(!t||"recreate"===t||"media"===t){var a=n.getMediaOption(this,this._api);a.length&&d(a,function(t){this.mergeOption(t,e=!0);},this);}return e;},mergeOption:function mergeOption(t){function e(e,i){var r=Li(t[e]),s=Ri(a.get(e),r);zi(s),d(s,function(t){var n=t.option;M(n)&&(t.keyInfo.mainType=e,t.keyInfo.subType=Ro(e,n,t.exist));});var l=Eo(a,i);n[e]=[],a.set(e,[]),d(s,function(t,i){var r=t.exist,s=t.option;if(O(M(s)||r,"Empty component definition"),s){var u=tv.getClass(e,t.keyInfo.subType,!0);if(r&&r instanceof u)r.name=t.keyInfo.name,r.mergeOption(s,this),r.optionUpdated(s,!1);else{var h=o({dependentModels:l,componentIndex:i},t.keyInfo);r=new u(s,this,this,h),o(r,h),r.init(s,this,this,h),r.optionUpdated(null,!0);}}else r.mergeOption({},this),r.optionUpdated({},!1);a.get(e)[i]=r,n[e][i]=r.option;},this),"series"===e&&zo(this,a.get("series"));}var n=this.option,a=this._componentsMap,s=[];wo(this),d(t,function(t,e){null!=t&&(tv.hasClass(e)?e&&s.push(e):n[e]=null==n[e]?i(t):r(n[e],t,!0));}),tv.topologicalTravel(s,tv.getAllClassMainTypes(),e,this),this._seriesIndicesMap=N(this._seriesIndices=this._seriesIndices||[]);},getOption:function getOption(){var t=i(this.option);return d(t,function(e,n){if(tv.hasClass(n)){for(var e=Li(e),i=e.length-1;i>=0;i--){Ni(e[i])&&e.splice(i,1);}t[n]=e;}}),delete t[gv],t;},getTheme:function getTheme(){return this._theme;},getComponent:function getComponent(t,e){var n=this._componentsMap.get(t);return n?n[e||0]:void 0;},queryComponents:function queryComponents(t){var e=t.mainType;if(!e)return[];var n=t.index,i=t.id,r=t.name,a=this._componentsMap.get(e);if(!a||!a.length)return[];var o;if(null!=n)x(n)||(n=[n]),o=v(p(n,function(t){return a[t];}),function(t){return!!t;});else if(null!=i){var s=x(i);o=v(a,function(t){return s&&u(i,t.id)>=0||!s&&t.id===i;});}else if(null!=r){var l=x(r);o=v(a,function(t){return l&&u(r,t.name)>=0||!l&&t.name===r;});}else o=a.slice();return Bo(o,t);},findComponents:function findComponents(t){function e(t){var e=r+"Index",n=r+"Id",i=r+"Name";return!t||null==t[e]&&null==t[n]&&null==t[i]?null:{mainType:r,index:t[e],id:t[n],name:t[i]};}function n(e){return t.filter?v(e,t.filter):e;}var i=t.query,r=t.mainType,a=e(i),o=a?this.queryComponents(a):this._componentsMap.get(r);return n(Bo(o,t));},eachComponent:function eachComponent(t,e,n){var i=this._componentsMap;if("function"==typeof t)n=e,e=t,i.each(function(t,i){d(t,function(t,r){e.call(n,i,t,r);});});else if(b(t))d(i.get(t),e,n);else if(M(t)){var r=this.findComponents(t);d(r,e,n);}},getSeriesByName:function getSeriesByName(t){var e=this._componentsMap.get("series");return v(e,function(e){return e.name===t;});},getSeriesByIndex:function getSeriesByIndex(t){return this._componentsMap.get("series")[t];},getSeriesByType:function getSeriesByType(t){var e=this._componentsMap.get("series");return v(e,function(e){return e.subType===t;});},getSeries:function getSeries(){return this._componentsMap.get("series").slice();},getSeriesCount:function getSeriesCount(){return this._componentsMap.get("series").length;},eachSeries:function eachSeries(t,e){d(this._seriesIndices,function(n){var i=this._componentsMap.get("series")[n];t.call(e,i,n);},this);},eachRawSeries:function eachRawSeries(t,e){d(this._componentsMap.get("series"),t,e);},eachSeriesByType:function eachSeriesByType(t,e,n){d(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];r.subType===t&&e.call(n,r,i);},this);},eachRawSeriesByType:function eachRawSeriesByType(t,e,n){return d(this.getSeriesByType(t),e,n);},isSeriesFiltered:function isSeriesFiltered(t){return null==this._seriesIndicesMap.get(t.componentIndex);},getCurrentSeriesIndices:function getCurrentSeriesIndices(){return(this._seriesIndices||[]).slice();},filterSeries:function filterSeries(t,e){var n=v(this._componentsMap.get("series"),t,e);zo(this,n);},restoreData:function restoreData(t){var e=this._componentsMap;zo(this,e.get("series"));var n=[];e.each(function(t,e){n.push(e);}),tv.topologicalTravel(n,tv.getAllClassMainTypes(),function(n){d(e.get(n),function(e){("series"!==n||!Lo(e,t))&&e.restoreData();});});}});c(vv,rv);var mv=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getModel","getOption","getViewOfComponentModel","getViewOfSeriesModel"],yv={};Fo.prototype={constructor:Fo,create:function create(t,e){var n=[];d(yv,function(i){var r=i.create(t,e);n=n.concat(r||[]);}),this._coordinateSystems=n;},update:function update(t,e){d(this._coordinateSystems,function(n){n.update&&n.update(t,e);});},getCoordinateSystems:function getCoordinateSystems(){return this._coordinateSystems.slice();}},Fo.register=function(t,e){yv[t]=e;},Fo.get=function(t){return yv[t];};var _v=d,xv=i,wv=p,bv=r,Mv=/^(min|max)?(.+)$/;Vo.prototype={constructor:Vo,setOption:function setOption(t,e){t&&d(Li(t.series),function(t){t&&t.data&&C(t.data)&&R(t.data);}),t=xv(t,!0);var n=this._optionBackup,i=Ho.call(this,t,e,!n);this._newBaseOption=i.baseOption,n?(qo(n.baseOption,i.baseOption),i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i;},mountOption:function mountOption(t){var e=this._optionBackup;return this._timelineOptions=wv(e.timelineOptions,xv),this._mediaList=wv(e.mediaList,xv),this._mediaDefault=xv(e.mediaDefault),this._currentMediaIndices=[],xv(t?e.baseOption:this._newBaseOption);},getTimelineOption:function getTimelineOption(t){var e,n=this._timelineOptions;if(n.length){var i=t.getComponent("timeline");i&&(e=xv(n[i.getCurrentIndex()],!0));}return e;},getMediaOption:function getMediaOption(){var t=this._api.getWidth(),e=this._api.getHeight(),n=this._mediaList,i=this._mediaDefault,r=[],a=[];if(!n.length&&!i)return a;for(var o=0,s=n.length;s>o;o++){Wo(n[o].query,t,e)&&r.push(o);}return!r.length&&i&&(r=[-1]),r.length&&!jo(r,this._currentMediaIndices)&&(a=wv(r,function(t){return xv(-1===t?i.option:n[t].option);})),this._currentMediaIndices=r,a;}};var Sv=d,Cv=M,Iv=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"],Dv=function Dv(t,e){Sv(Qo(t.series),function(t){Cv(t)&&Ko(t);});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];e&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),Sv(n,function(e){Sv(Qo(t[e]),function(t){t&&(Zo(t,"axisLabel"),Zo(t.axisPointer,"label"));});}),Sv(Qo(t.parallel),function(t){var e=t&&t.parallelAxisDefault;Zo(e,"axisLabel"),Zo(e&&e.axisPointer,"label");}),Sv(Qo(t.calendar),function(t){Xo(t,"itemStyle"),Zo(t,"dayLabel"),Zo(t,"monthLabel"),Zo(t,"yearLabel");}),Sv(Qo(t.radar),function(t){Zo(t,"name");}),Sv(Qo(t.geo),function(t){Cv(t)&&($o(t),Sv(Qo(t.regions),function(t){$o(t);}));}),Sv(Qo(t.timeline),function(t){$o(t),Xo(t,"label"),Xo(t,"itemStyle"),Xo(t,"controlStyle",!0);var e=t.data;x(e)&&d(e,function(t){M(t)&&(Xo(t,"label"),Xo(t,"itemStyle"));});}),Sv(Qo(t.toolbox),function(t){Xo(t,"iconStyle"),Sv(t.feature,function(t){Xo(t,"iconStyle");});}),Zo(Jo(t.axisPointer),"label"),Zo(Jo(t.tooltip).axisPointer,"label");},Tv=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],kv=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],Av=function Av(t,e){Dv(t,e),t.series=Li(t.series),d(t.series,function(t){if(M(t)){var e=t.type;if(("pie"===e||"gauge"===e)&&null!=t.clockWise&&(t.clockwise=t.clockWise),"gauge"===e){var n=ts(t,"pointer.color");null!=n&&es(t,"itemStyle.normal.color",n);}ns(t);}}),t.dataRange&&(t.visualMap=t.dataRange),d(kv,function(e){var n=t[e];n&&(x(n)||(n=[n]),d(n,function(t){ns(t);}));});},Lv=function Lv(t){var e=N();t.eachSeries(function(t){var n=t.get("stack");if(n){var i=e.get(n)||e.set(n,[]),r=t.getData(),a={stackResultDimension:r.getCalculationInfo("stackResultDimension"),stackedOverDimension:r.getCalculationInfo("stackedOverDimension"),stackedDimension:r.getCalculationInfo("stackedDimension"),stackedByDimension:r.getCalculationInfo("stackedByDimension"),isStackedByIndex:r.getCalculationInfo("isStackedByIndex"),data:r,seriesModel:t};if(!a.stackedDimension||!a.isStackedByIndex&&!a.stackedByDimension)return;i.length&&r.setCalculationInfo("stackedOnSeries",i[i.length-1].seriesModel),i.push(a);}}),e.each(is);},Pv=rs.prototype;Pv.pure=!1,Pv.persistent=!0,Pv.getSource=function(){return this._source;};var Ov={arrayRows_column:{pure:!0,count:function count(){return Math.max(0,this._data.length-this._source.startIndex);},getItem:function getItem(t){return this._data[t+this._source.startIndex];},appendData:ss},arrayRows_row:{pure:!0,count:function count(){var t=this._data[0];return t?Math.max(0,t.length-this._source.startIndex):0;},getItem:function getItem(t){t+=this._source.startIndex;for(var e=[],n=this._data,i=0;i<n.length;i++){var r=n[i];e.push(r?r[t]:null);}return e;},appendData:function appendData(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".');}},objectRows:{pure:!0,count:as,getItem:os,appendData:ss},keyedColumns:{pure:!0,count:function count(){var t=this._source.dimensionsDefine[0].name,e=this._data[t];return e?e.length:0;},getItem:function getItem(t){for(var e=[],n=this._source.dimensionsDefine,i=0;i<n.length;i++){var r=this._data[n[i].name];e.push(r?r[t]:null);}return e;},appendData:function appendData(t){var e=this._data;d(t,function(t,n){for(var i=e[n]||(e[n]=[]),r=0;r<(t||[]).length;r++){i.push(t[r]);}});}},original:{count:as,getItem:os,appendData:ss},typedArray:{persistent:!1,pure:!0,count:function count(){return this._data?this._data.length/this._dimSize:0;},getItem:function getItem(t,e){t-=this._offset,e=e||[];for(var n=this._dimSize*t,i=0;i<this._dimSize;i++){e[i]=this._data[n+i];}return e;},appendData:function appendData(t){this._data=t;},clean:function clean(){this._offset+=this.count(),this._data=null;}}},Ev={arrayRows:ls,objectRows:function objectRows(t,e,n,i){return null!=n?t[i]:t;},keyedColumns:ls,original:function original(t,e,n){var i=Oi(t);return null!=n&&i instanceof Array?i[n]:i;},typedArray:ls},Rv={arrayRows:us,objectRows:function objectRows(t,e){return hs(t[e],this._dimensionInfos[e]);},keyedColumns:us,original:function original(t,e,n,i){var r=t&&(null==t.value?t:t.value);return!this._rawData.pure&&Ei(t)&&(this.hasItemOption=!0),hs(r instanceof Array?r[i]:r,this._dimensionInfos[e]);},typedArray:function typedArray(t,e,n,i){return t[i];}},zv=/\{@(.+?)\}/g,Bv={getDataParams:function getDataParams(t,e){var n=this.getData(e),i=this.getRawValue(t,e),r=n.getRawIndex(t),a=n.getName(t),o=n.getRawDataItem(t),s=n.getItemVisual(t,"color");return{componentType:this.mainType,componentSubType:this.subType,seriesType:"series"===this.mainType?this.subType:null,seriesIndex:this.seriesIndex,seriesId:this.id,seriesName:this.name,name:a,dataIndex:r,data:o,dataType:e,value:i,color:s,marker:ro(s),$vars:["seriesName","name","value"]};},getFormattedLabel:function getFormattedLabel(t,e,n,i,r){e=e||"normal";var a=this.getData(n),o=a.getItemModel(t),s=this.getDataParams(t,n);null!=i&&s.value instanceof Array&&(s.value=s.value[i]);var l=o.get("normal"===e?[r||"label","formatter"]:[e,r||"label","formatter"]);if("function"==typeof l)return s.status=e,l(s);if("string"==typeof l){var u=no(l,s);return u.replace(zv,function(e,n){var i=n.length;return"["===n.charAt(0)&&"]"===n.charAt(i-1)&&(n=+n.slice(1,i-1)),cs(a,t,n);});}},getRawValue:function getRawValue(t,e){return cs(this.getData(e),t);},formatTooltip:function formatTooltip(){}},Nv=ds.prototype;Nv.perform=function(t){function e(t){return!(t>=1)&&(t=1),t;}var n=this._upstream,i=t&&t.skip;if(this._dirty&&n){var r=this.context;r.data=r.outputData=n.context.outputData;}this.__pipeline&&(this.__pipeline.currentTask=this);var a;this._plan&&!i&&(a=this._plan(this.context));var o=e(this._modBy),s=this._modDataCount||0,l=e(t&&t.modBy),u=t&&t.modDataCount||0;(o!==l||s!==u)&&(a="reset");var h;(this._dirty||"reset"===a)&&(this._dirty=!1,h=gs(this,i)),this._modBy=l,this._modDataCount=u;var c=t&&t.step;if(this._dueEnd=n?n._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var f=this._dueIndex,d=Math.min(null!=c?this._dueIndex+c:1/0,this._dueEnd);if(!i&&(h||d>f)){var p=this._progress;if(x(p))for(var g=0;g<p.length;g++){ps(this,p[g],f,d,l,u);}else ps(this,p,f,d,l,u);}this._dueIndex=d;var v=null!=this._settedOutputEnd?this._settedOutputEnd:d;this._outputDueEnd=v;}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished();};var Fv=function(){function t(){return n>i?i++:null;}function e(){var t=i%o*r+Math.ceil(i/o),e=i>=n?null:a>t?t:i;return i++,e;}var n,i,r,a,o,s={reset:function reset(l,u,h,c){i=l,n=u,r=h,a=c,o=Math.ceil(a/r),s.next=r>1&&a>0?e:t;}};return s;}();Nv.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context);},Nv.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd;},Nv.pipe=function(t){(this._downstream!==t||this._dirty)&&(this._downstream=t,t._upstream=this,t.dirty());},Nv.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0);},Nv.getUpstream=function(){return this._upstream;},Nv.getDownstream=function(){return this._downstream;},Nv.setOutputEnd=function(t){this._outputDueEnd=this._settedOutputEnd=t;};var Vv=Vi(),Hv=tv.extend({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendDataProvider:null,visualColorAccessPath:"itemStyle.color",layoutMode:null,init:function init(t,e,n){this.seriesIndex=this.componentIndex,this.dataTask=fs({count:ys,reset:_s}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(t,n),bo(this);var i=this.getInitialData(t,n);ws(i,this),this.dataTask.context.data=i,Vv(this).dataBeforeProcessed=i,vs(this);},mergeDefaultAndTheme:function mergeDefaultAndTheme(t,e){var n=this.layoutMode,i=n?co(t):{},a=this.subType;tv.hasClass(a)&&(a+="Series"),r(t,e.getTheme().get(this.subType)),r(t,this.getDefaultOption()),Pi(t,"label",["show"]),this.fillDataTextStyle(t.data),n&&ho(t,i,n);},mergeOption:function mergeOption(t,e){t=r(this.option,t,!0),this.fillDataTextStyle(t.data);var n=this.layoutMode;n&&ho(this.option,t,n),bo(this);var i=this.getInitialData(t,e);ws(i,this),this.dataTask.dirty(),this.dataTask.context.data=i,Vv(this).dataBeforeProcessed=i,vs(this);},fillDataTextStyle:function fillDataTextStyle(t){if(t&&!C(t))for(var e=["show"],n=0;n<t.length;n++){t[n]&&t[n].label&&Pi(t[n],"label",e);}},getInitialData:function getInitialData(){},appendData:function appendData(t){var e=this.getRawData();e.appendData(t.data);},getData:function getData(t){var e=Ms(this);if(e){var n=e.context.data;return null==t?n:n.getLinkedData(t);}return Vv(this).data;},setData:function setData(t){var e=Ms(this);if(e){var n=e.context;n.data!==t&&e.modifyOutputEnd&&e.setOutputEnd(t.count()),n.outputData=t,e!==this.dataTask&&(n.data=t);}Vv(this).data=t;},getSource:function getSource(){return xo(this);},getRawData:function getRawData(){return Vv(this).dataBeforeProcessed;},getBaseAxis:function getBaseAxis(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis();},formatTooltip:function formatTooltip(t,e){function n(n){function i(t,n){var i=r.getDimensionInfo(n);if(i&&i.otherDims.tooltip!==!1){var a=i.type,l=ro({color:u,type:"subItem"}),h=(o?l+eo(i.displayName||"-")+": ":"")+eo("ordinal"===a?t+"":"time"===a?e?"":oo("yyyy/MM/dd hh:mm:ss",t):Ja(t));h&&s.push(h);}}var o=g(n,function(t,e,n){var i=r.getDimensionInfo(n);return t|=i&&i.tooltip!==!1&&null!=i.displayName;},0),s=[];return a.length?d(a,function(e){i(cs(r,t,e),e);}):d(n,i),(o?"<br/>":"")+s.join(o?"<br/>":", ");}function i(t){return eo(Ja(t));}var r=this.getData(),a=r.mapDimension("defaultedTooltip",!0),o=a.length,s=this.getRawValue(t),l=x(s),u=r.getItemVisual(t,"color");M(u)&&u.colorStops&&(u=(u.colorStops[0]||{}).color),u=u||"transparent";var h=o>1||l&&!o?n(s):i(o?cs(r,t,a[0]):l?s[0]:s),c=ro(u),f=r.getName(t),p=this.name;return Bi(this)||(p=""),p=p?eo(p)+(e?": ":"<br/>"):"",e?c+p+h:p+c+(f?eo(f)+": "+h:h);},isAnimationEnabled:function isAnimationEnabled(){if(Gc.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),t;},restoreData:function restoreData(){this.dataTask.dirty();},getColorFromPalette:function getColorFromPalette(t,e,n){var i=this.ecModel,r=rv.getColorFromPalette.call(this,t,e,n);return r||(r=i.getColorFromPalette(t,e,n)),r;},coordDimToDataDim:function coordDimToDataDim(t){return this.getRawData().mapDimension(t,!0);},getProgressive:function getProgressive(){return this.get("progressive");},getProgressiveThreshold:function getProgressiveThreshold(){return this.get("progressiveThreshold");},getAxisTooltipData:null,getTooltipPosition:null,pipeTask:null,preventIncremental:null,pipelineContext:null});c(Hv,Bv),c(Hv,rv);var Wv=function Wv(){this.group=new Xf(),this.uid=Oa("viewComponent");};Wv.prototype={constructor:Wv,init:function init(){},render:function render(){},dispose:function dispose(){}};var Gv=Wv.prototype;Gv.updateView=Gv.updateLayout=Gv.updateVisual=function(){},Xi(Wv),Ki(Wv,{registerWhenExtend:!0});var jv=function jv(){var t=Vi();return function(e){var n=t(e),i=e.pipelineContext,r=n.large,a=n.progressiveRender,o=n.large=i.large,s=n.progressiveRender=i.progressiveRender;return!!(r^o||a^s)&&"reset";};},qv=Vi(),Uv=jv();Ss.prototype={type:"chart",init:function init(){},render:function render(){},highlight:function highlight(t,e,n,i){Is(t.getData(),i,"emphasis");},downplay:function downplay(t,e,n,i){Is(t.getData(),i,"normal");},remove:function remove(){this.group.removeAll();},dispose:function dispose(){},incrementalPrepareRender:null,incrementalRender:null,updateTransform:null};var Xv=Ss.prototype;Xv.updateView=Xv.updateLayout=Xv.updateVisual=function(t,e,n,i){this.render(t,e,n,i);},Xi(Ss,["dispose"]),Ki(Ss,{registerWhenExtend:!0}),Ss.markUpdateMethod=function(t,e){qv(t).updateMethod=e;};var Yv={incrementalPrepareRender:{progress:function progress(t,e){e.view.incrementalRender(t,e.model,e.ecModel,e.api,e.payload);}},render:{forceFirstProgress:!0,progress:function progress(t,e){e.view.render(e.model,e.ecModel,e.api,e.payload);}}},Zv={createOnAllSeries:!0,performRawSeries:!0,reset:function reset(t,e){var n=t.getData(),i=(t.visualColorAccessPath||"itemStyle.color").split("."),r=t.get(i)||t.getColorFromPalette(t.name,null,e.getSeriesCount());if(n.setVisual("color",r),!e.isSeriesFiltered(t)){"function"!=typeof r||r instanceof xg||n.each(function(e){n.setItemVisual(e,"color",r(t.getDataParams(e)));});var a=function a(t,e){var n=t.getItemModel(e),r=n.get(i,!0);null!=r&&t.setItemVisual(e,"color",r);};return{dataEach:n.hasItemOption?a:null};}}},$v={toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}},Kv=function Kv(t,e){function n(t,e){if("string"!=typeof t)return t;var n=t;return d(e,function(t,e){n=n.replace(new RegExp("\\{\\s*"+e+"\\s*\\}","g"),t);}),n;}function i(t){var e=o.get(t);if(null==e){for(var n=t.split("."),i=$v.aria,r=0;r<n.length;++r){i=i[n[r]];}return i;}return e;}function r(){var t=e.getModel("title").option;return t&&t.length&&(t=t[0]),t&&t.text;}function a(t){return $v.series.typeNames[t]||"自定义图";}var o=e.getModel("aria");if(o.get("show")){if(o.get("description"))return void t.setAttribute("aria-label",o.get("description"));var s=0;e.eachSeries(function(){++s;},this);var l,u=o.get("data.maxCount")||10,h=o.get("series.maxCount")||10,c=Math.min(s,h);if(!(1>s)){var f=r();l=f?n(i("general.withTitle"),{title:f}):i("general.withoutTitle");var p=[],g=s>1?"series.multiple.prefix":"series.single.prefix";l+=n(i(g),{seriesCount:s}),e.eachSeries(function(t,e){if(c>e){var r,o=t.get("name"),l="series."+(s>1?"multiple":"single")+".";r=i(o?l+"withName":l+"withoutName"),r=n(r,{seriesId:t.seriesIndex,seriesName:t.get("name"),seriesType:a(t.subType)});var h=t.getData();window.data=h,r+=h.count()>u?n(i("data.partialData"),{displayCnt:u}):i("data.allData");for(var f=[],d=0;d<h.count();d++){if(u>d){var g=h.getName(d),v=cs(h,d);f.push(n(i(g?"data.withName":"data.withoutName"),{name:g,value:v}));}}r+=f.join(i("data.separator.middle"))+i("data.separator.end"),p.push(r);}}),l+=p.join(i("series.multiple.separator.middle"))+i("series.multiple.separator.end"),t.setAttribute("aria-label",l);}}},Qv=Math.PI,Jv=function Jv(t,e){e=e||{},s(e,{text:"loading",color:"#c23531",textColor:"#000",maskColor:"rgba(255, 255, 255, 0.8)",zlevel:0});var n=new pg({style:{fill:e.maskColor},zlevel:e.zlevel,z:1e4}),i=new yg({shape:{startAngle:-Qv/2,endAngle:-Qv/2+.1,r:10},style:{stroke:e.color,lineCap:"round",lineWidth:5},zlevel:e.zlevel,z:10001}),r=new pg({style:{fill:"none",text:e.text,textPosition:"right",textDistance:10,textFill:e.textColor},zlevel:e.zlevel,z:10001});i.animateShape(!0).when(1e3,{endAngle:3*Qv/2}).start("circularInOut"),i.animateShape(!0).when(1e3,{startAngle:3*Qv/2}).delay(300).start("circularInOut");var a=new Xf();return a.add(i),a.add(r),a.add(n),a.resize=function(){var e=t.getWidth()/2,a=t.getHeight()/2;i.setShape({cx:e,cy:a});var o=i.shape.r;r.setShape({x:e-o,y:a-o,width:2*o,height:2*o}),n.setShape({x:0,y:0,width:t.getWidth(),height:t.getHeight()});},a.resize(),a;},tm=As.prototype;tm.restoreData=function(t,e){t.restoreData(e),this._stageTaskMap.each(function(t){var e=t.overallTask;e&&e.dirty();});},tm.getPerformArgs=function(t,e){if(t.__pipeline){var n=this._pipelineMap.get(t.__pipeline.id),i=n.context,r=!e&&n.progressiveEnabled&&(!i||i.progressiveRender)&&t.__idxInPipeline>n.blockIndex,a=r?n.step:null,o=i&&i.modDataCount,s=null!=o?Math.ceil(o/a):null;return{step:a,modBy:s,modDataCount:o};}},tm.getPipeline=function(t){return this._pipelineMap.get(t);},tm.updateStreamModes=function(t,e){var n=this._pipelineMap.get(t.uid),i=t.getData(),r=i.count(),a=n.progressiveEnabled&&e.incrementalPrepareRender&&r>=n.threshold,o=t.get("large")&&r>=t.get("largeThreshold"),s="mod"===t.get("progressiveChunkMode")?r:null;t.pipelineContext=n.context={progressiveRender:a,modDataCount:s,large:o};},tm.restorePipelines=function(t){var e=this,n=e._pipelineMap=N();t.eachSeries(function(t){var i=t.getProgressive(),r=t.uid;n.set(r,{id:r,head:null,tail:null,threshold:t.getProgressiveThreshold(),progressiveEnabled:i&&!(t.preventIncremental&&t.preventIncremental()),blockIndex:-1,step:Math.round(i||700),count:0}),Ws(e,t,t.dataTask);});},tm.prepareStageTasks=function(){var t=this._stageTaskMap,e=this.ecInstance.getModel(),n=this.api;d(this._allHandlers,function(i){var r=t.get(i.uid)||t.set(i.uid,[]);i.reset&&Ps(this,i,r,e,n),i.overallReset&&Os(this,i,r,e,n);},this);},tm.prepareView=function(t,e,n,i){var r=t.renderTask,a=r.context;a.model=e,a.ecModel=n,a.api=i,r.__block=!t.incrementalPrepareRender,Ws(this,e,r);},tm.performDataProcessorTasks=function(t,e){Ls(this,this._dataProcessorHandlers,t,e,{block:!0});},tm.performVisualTasks=function(t,e,n){Ls(this,this._visualHandlers,t,e,n);},tm.performSeriesTasks=function(t){var e;t.eachSeries(function(t){e|=t.dataTask.perform();}),this.unfinished|=e;},tm.plan=function(){this._pipelineMap.each(function(t){var e=t.tail;do{if(e.__block){t.blockIndex=e.__idxInPipeline;break;}e=e.getUpstream();}while(e);});};var em=tm.updatePayload=function(t,e){"remain"!==e&&(t.context.payload=e);},nm=Vs(0);As.wrapStageHandler=function(t,e){return w(t)&&(t={overallReset:t,seriesType:Gs(t)}),t.uid=Oa("stageHandler"),e&&(t.visualType=e),t;};var im,rm={},am={};js(rm,vv),js(am,No),rm.eachSeriesByType=rm.eachRawSeriesByType=function(t){im=t;},rm.eachComponent=function(t){"series"===t.mainType&&t.subType&&(im=t.subType);};var om=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],sm={color:om,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],om]},lm="#eee",um=function um(){return{axisLine:{lineStyle:{color:lm}},axisTick:{lineStyle:{color:lm}},axisLabel:{textStyle:{color:lm}},splitLine:{lineStyle:{type:"dashed",color:"#aaa"}},splitArea:{areaStyle:{color:lm}}};},hm=["#dd6b66","#759aa0","#e69d87","#8dc1a9","#ea7e53","#eedd78","#73a373","#73b9bc","#7289ab","#91ca8c","#f49f42"],cm={color:hm,backgroundColor:"#333",tooltip:{axisPointer:{lineStyle:{color:lm},crossStyle:{color:lm}}},legend:{textStyle:{color:lm}},textStyle:{color:lm},title:{textStyle:{color:lm}},toolbox:{iconStyle:{normal:{borderColor:lm}}},dataZoom:{textStyle:{color:lm}},visualMap:{textStyle:{color:lm}},timeline:{lineStyle:{color:lm},itemStyle:{normal:{color:hm[1]}},label:{normal:{textStyle:{color:lm}}},controlStyle:{normal:{color:lm,borderColor:lm}}},timeAxis:um(),logAxis:um(),valueAxis:um(),categoryAxis:um(),line:{symbol:"circle"},graph:{color:hm},gauge:{title:{textStyle:{color:lm}}},candlestick:{itemStyle:{normal:{color:"#FD1050",color0:"#0CF49B",borderColor:"#FD1050",borderColor0:"#0CF49B"}}}};cm.categoryAxis.splitLine.show=!1,tv.extend({type:"dataset",defaultOption:{seriesLayoutBy:fv,sourceHeader:null,dimensions:null,source:null},optionUpdated:function optionUpdated(){_o(this);}}),Wv.extend({type:"dataset"});var fm=O,dm=d,pm=w,gm=M,vm=tv.parseClassType,mm="4.1.0",ym={zrender:"4.0.4"},_m=1,xm=1e3,wm=5e3,bm=1e3,Mm=2e3,Sm=3e3,Cm=4e3,Im=5e3,Dm={PROCESSOR:{FILTER:xm,STATISTIC:wm},VISUAL:{LAYOUT:bm,GLOBAL:Mm,CHART:Sm,COMPONENT:Cm,BRUSH:Im}},Tm="__flagInMainProcess",km="__optionUpdated",Am=/^[a-zA-Z0-9_]+$/;Us.prototype.on=qs("on"),Us.prototype.off=qs("off"),Us.prototype.one=qs("one"),c(Us,ff);var Lm=Xs.prototype;Lm._onframe=function(){if(!this._disposed){var t=this._scheduler;if(this[km]){var e=this[km].silent;this[Tm]=!0,Zs(this),Pm.update.call(this),this[Tm]=!1,this[km]=!1,Js.call(this,e),tl.call(this,e);}else if(t.unfinished){var n=_m,i=this._model,r=this._api;t.unfinished=!1;do{var a=+new Date();t.performSeriesTasks(i),t.performDataProcessorTasks(i),Ks(this,i),t.performVisualTasks(i),ol(this,this._model,r,"remain"),n-=+new Date()-a;}while(n>0&&t.unfinished);t.unfinished||this._zr.flush();}}},Lm.getDom=function(){return this._dom;},Lm.getZr=function(){return this._zr;},Lm.setOption=function(t,e,n){var i;if(gm(e)&&(n=e.lazyUpdate,i=e.silent,e=e.notMerge),this[Tm]=!0,!this._model||e){var r=new Vo(this._api),a=this._theme,o=this._model=new vv(null,null,a,r);o.scheduler=this._scheduler,o.init(null,null,a,r);}this._model.setOption(t,Bm),n?(this[km]={silent:i},this[Tm]=!1):(Zs(this),Pm.update.call(this),this._zr.flush(),this[km]=!1,this[Tm]=!1,Js.call(this,i),tl.call(this,i));},Lm.setTheme=function(){console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0");},Lm.getModel=function(){return this._model;},Lm.getOption=function(){return this._model&&this._model.getOption();},Lm.getWidth=function(){return this._zr.getWidth();},Lm.getHeight=function(){return this._zr.getHeight();},Lm.getDevicePixelRatio=function(){return this._zr.painter.dpr||window.devicePixelRatio||1;},Lm.getRenderedCanvas=function(t){if(Gc.canvasSupported){t=t||{},t.pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor");var e=this._zr;return e.painter.getRenderedCanvas(t);}},Lm.getSvgDataUrl=function(){if(Gc.svgSupported){var t=this._zr,e=t.storage.getDisplayList();return d(e,function(t){t.stopAnimation(!0);}),t.painter.pathToDataUrl();}},Lm.getDataURL=function(t){t=t||{};var e=t.excludeComponents,n=this._model,i=[],r=this;dm(e,function(t){n.eachComponent({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group.ignore||(i.push(e),e.group.ignore=!0);});});var a="svg"===this._zr.painter.getType()?this.getSvgDataUrl():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return dm(i,function(t){t.group.ignore=!1;}),a;},Lm.getConnectedDataURL=function(t){if(Gc.canvasSupported){var e=this.group,n=Math.min,r=Math.max,a=1/0;if(Gm[e]){var o=a,s=a,l=-a,u=-a,h=[],c=t&&t.pixelRatio||1;d(Wm,function(a){if(a.group===e){var c=a.getRenderedCanvas(i(t)),f=a.getDom().getBoundingClientRect();o=n(f.left,o),s=n(f.top,s),l=r(f.right,l),u=r(f.bottom,u),h.push({dom:c,left:f.left,top:f.top});}}),o*=c,s*=c,l*=c,u*=c;var f=l-o,p=u-s,g=tf();g.width=f,g.height=p;var v=Ii(g);return dm(h,function(t){var e=new ai({style:{x:t.left*c-o,y:t.top*c-s,image:t.dom}});v.add(e);}),v.refreshImmediately(),g.toDataURL("image/"+(t&&t.type||"png"));}return this.getDataURL(t);}},Lm.convertToPixel=_(Ys,"convertToPixel"),Lm.convertFromPixel=_(Ys,"convertFromPixel"),Lm.containPixel=function(t,e){var n,i=this._model;return t=Hi(i,t),d(t,function(t,i){i.indexOf("Models")>=0&&d(t,function(t){var r=t.coordinateSystem;if(r&&r.containPoint)n|=!!r.containPoint(e);else if("seriesModels"===i){var a=this._chartsMap[t.__viewId];a&&a.containPoint&&(n|=a.containPoint(e,t));}},this);},this),!!n;},Lm.getVisual=function(t,e){var n=this._model;t=Hi(n,t,{defaultMainType:"series"});var i=t.seriesModel,r=i.getData(),a=t.hasOwnProperty("dataIndexInside")?t.dataIndexInside:t.hasOwnProperty("dataIndex")?r.indexOfRawIndex(t.dataIndex):null;return null!=a?r.getItemVisual(a,e):r.getVisual(e);},Lm.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId];},Lm.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId];};var Pm={prepareAndUpdate:function prepareAndUpdate(t){Zs(this),Pm.update.call(this,t);},update:function update(t){var e=this._model,n=this._api,i=this._zr,r=this._coordSysMgr,a=this._scheduler;if(e){a.restoreData(e,t),a.performSeriesTasks(e),r.create(e,n),a.performDataProcessorTasks(e,t),Ks(this,e),r.update(e,n),il(e),a.performVisualTasks(e,t),rl(this,e,n,t);var o=e.get("backgroundColor")||"transparent";if(Gc.canvasSupported)i.setBackgroundColor(o);else{var s=Ee(o);o=Ge(s,"rgb"),0===s[3]&&(o="transparent");}sl(e,n);}},updateTransform:function updateTransform(t){var e=this._model,n=this,i=this._api;if(e){var r=[];e.eachComponent(function(a,o){var s=n.getViewOfComponentModel(o);if(s&&s.__alive)if(s.updateTransform){var l=s.updateTransform(o,e,i,t);l&&l.update&&r.push(s);}else r.push(s);});var a=N();e.eachSeries(function(r){var o=n._chartsMap[r.__viewId];if(o.updateTransform){var s=o.updateTransform(r,e,i,t);s&&s.update&&a.set(r.uid,1);}else a.set(r.uid,1);}),il(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0,dirtyMap:a}),ol(n,e,i,t,a),sl(e,this._api);}},updateView:function updateView(t){var e=this._model;e&&(Ss.markUpdateMethod(t,"updateView"),il(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0}),rl(this,this._model,this._api,t),sl(e,this._api));},updateVisual:function updateVisual(t){Pm.update.call(this,t);},updateLayout:function updateLayout(t){Pm.update.call(this,t);}};Lm.resize=function(t){this._zr.resize(t);var e=this._model;if(this._loadingFX&&this._loadingFX.resize(),e){var n=e.resetOption("media"),i=t&&t.silent;this[Tm]=!0,n&&Zs(this),Pm.update.call(this),this[Tm]=!1,Js.call(this,i),tl.call(this,i);}},Lm.showLoading=function(t,e){if(gm(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),Hm[t]){var n=Hm[t](this._api,e),i=this._zr;this._loadingFX=n,i.add(n);}},Lm.hideLoading=function(){this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null;},Lm.makeActionFromEvent=function(t){var e=o({},t);return e.type=Rm[t.type],e;},Lm.dispatchAction=function(t,e){if(gm(e)||(e={silent:!!e}),Em[t.type]&&this._model){if(this[Tm])return void this._pendingActions.push(t);Qs.call(this,t,e.silent),e.flush?this._zr.flush(!0):e.flush!==!1&&Gc.browser.weChat&&this._throttledZrFlush(),Js.call(this,e.silent),tl.call(this,e.silent);}},Lm.appendData=function(t){var e=t.seriesIndex,n=this.getModel(),i=n.getSeriesByIndex(e);i.appendData(t),this._scheduler.unfinished=!0;},Lm.on=qs("on"),Lm.off=qs("off"),Lm.one=qs("one");var Om=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"];Lm._initEvents=function(){dm(Om,function(t){this._zr.on(t,function(e){var n,i=this.getModel(),r=e.target;if("globalout"===t)n={};else if(r&&null!=r.dataIndex){var a=r.dataModel||i.getSeriesByIndex(r.seriesIndex);n=a&&a.getDataParams(r.dataIndex,r.dataType)||{};}else r&&r.eventData&&(n=o({},r.eventData));n&&(n.event=e,n.type=t,this.trigger(t,n));},this);},this),dm(Rm,function(t,e){this._messageCenter.on(e,function(t){this.trigger(e,t);},this);},this);},Lm.isDisposed=function(){return this._disposed;},Lm.clear=function(){this.setOption({series:[]},!0);},Lm.dispose=function(){if(!this._disposed){this._disposed=!0,Gi(this.getDom(),Um,"");var t=this._api,e=this._model;dm(this._componentsViews,function(n){n.dispose(e,t);}),dm(this._chartsViews,function(n){n.dispose(e,t);}),this._zr.dispose(),delete Wm[this.id];}},c(Xs,ff);var Em={},Rm={},zm=[],Bm=[],Nm=[],Fm=[],Vm={},Hm={},Wm={},Gm={},jm=new Date()-0,qm=new Date()-0,Um="_echarts_instance_",Xm={},Ym=gl;Dl(Mm,Zv),xl(Av),wl(wm,Lv),kl("default",Jv),Ml({type:"highlight",event:"highlight",update:"highlight"},V),Ml({type:"downplay",event:"downplay",update:"downplay"},V),_l("light",sm),_l("dark",cm);var Zm={};Nl.prototype={constructor:Nl,add:function add(t){return this._add=t,this;},update:function update(t){return this._update=t,this;},remove:function remove(t){return this._remove=t,this;},execute:function execute(){var t,e=this._old,n=this._new,i={},r={},a=[],o=[];for(Fl(e,i,a,"_oldKeyGetter",this),Fl(n,r,o,"_newKeyGetter",this),t=0;t<e.length;t++){var s=a[t],l=r[s];if(null!=l){var u=l.length;u?(1===u&&(r[s]=null),l=l.unshift()):r[s]=null,this._update&&this._update(l,t);}else this._remove&&this._remove(t);}for(var t=0;t<o.length;t++){var s=o[t];if(r.hasOwnProperty(s)){var l=r[s];if(null==l)continue;if(l.length)for(var h=0,u=l.length;u>h;h++){this._add&&this._add(l[h]);}else this._add&&this._add(l);}}}};var $m=N(["tooltip","label","itemName","itemId","seriesName"]),Km=M,Qm="undefined",Jm="e\x00\x00",ty={"float":(typeof Float64Array==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(Float64Array))===Qm?Array:Float64Array,"int":(typeof Int32Array==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(Int32Array))===Qm?Array:Int32Array,ordinal:Array,number:Array,time:Array},ey=(typeof Uint32Array==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(Uint32Array))===Qm?Array:Uint32Array,ny=(typeof Uint16Array==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(Uint16Array))===Qm?Array:Uint16Array,iy=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_rawData","_chunkSize","_chunkCount","_dimValueGetter","_count","_rawCount","_nameDimIdx","_idDimIdx"],ry=["_extent","_approximateExtent","_rawExtent"],ay=function ay(t,e){t=t||["x","y"];for(var n={},i=[],r={},a=0;a<t.length;a++){var o=t[a];b(o)&&(o={name:o});var s=o.name;o.type=o.type||"float",o.coordDim||(o.coordDim=s,o.coordDimIndex=0),o.otherDims=o.otherDims||{},i.push(s),n[s]=o,o.index=a,o.createInvertedIndices&&(r[s]=[]);}this.dimensions=i,this._dimensionInfos=n,this.hostModel=e,this.dataType,this._indices=null,this._count=0,this._rawCount=0,this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this._visual={},this._layout={},this._itemVisuals=[],this.hasItemVisual={},this._itemLayouts=[],this._graphicEls=[],this._chunkSize=1e5,this._chunkCount=0,this._rawData,this._rawExtent={},this._extent={},this._approximateExtent={},this._dimensionsSummary=Vl(this),this._invertedIndicesMap=r,this._calculationInfo={};},oy=ay.prototype;oy.type="list",oy.hasItemOption=!0,oy.getDimension=function(t){return isNaN(t)||(t=this.dimensions[t]||t),t;},oy.getDimensionInfo=function(t){return this._dimensionInfos[this.getDimension(t)];},oy.getDimensionsOnCoord=function(){return this._dimensionsSummary.dataDimsOnCoord.slice();},oy.mapDimension=function(t,e){var n=this._dimensionsSummary;if(null==e)return n.encodeFirstDimNotExtra[t];var i=n.encode[t];return e===!0?(i||[]).slice():i&&i[e];},oy.initData=function(t,e,n){var i=yo.isInstance(t)||f(t);i&&(t=new rs(t,this.dimensions.length)),this._rawData=t,this._storage={},this._indices=null,this._nameList=e||[],this._idList=[],this._nameRepeatCount={},n||(this.hasItemOption=!1),this.defaultDimValueGetter=Rv[this._rawData.getSource().sourceFormat],this._dimValueGetter=n=n||this.defaultDimValueGetter,this._rawExtent={},this._initDataFromProvider(0,t.count()),t.pure&&(this.hasItemOption=!1);},oy.getProvider=function(){return this._rawData;},oy.appendData=function(t){var e=this._rawData,n=this.count();e.appendData(t);var i=e.count();e.persistent||(i+=n),this._initDataFromProvider(n,i);},oy._initDataFromProvider=function(t,e){if(!(t>=e)){for(var n,i=this._chunkSize,r=this._rawData,a=this._storage,o=this.dimensions,s=o.length,l=this._dimensionInfos,u=this._nameList,h=this._idList,c=this._rawExtent,f=this._nameRepeatCount={},d=this._chunkCount,p=d-1,g=0;s>g;g++){var v=o[g];c[v]||(c[v]=tu());var m=l[v];0===m.otherDims.itemName&&(n=this._nameDimIdx=g),0===m.otherDims.itemId&&(this._idDimIdx=g);var y=ty[m.type];a[v]||(a[v]=[]);var _=a[v][p];if(_&&_.length<i){for(var x=new y(Math.min(e-p*i,i)),w=0;w<_.length;w++){x[w]=_[w];}a[v][p]=x;}for(var b=d*i;e>b;b+=i){a[v].push(new y(Math.min(e-b,i)));}this._chunkCount=a[v].length;}for(var M=new Array(s),S=t;e>S;S++){M=r.getItem(S,M);for(var C=Math.floor(S/i),I=S%i,b=0;s>b;b++){var v=o[b],D=a[v][C],T=this._dimValueGetter(M,v,S,b);D[I]=T;var k=c[v];T<k[0]&&(k[0]=T),T>k[1]&&(k[1]=T);}if(!r.pure){var A=u[S];if(M&&null==A)if(null!=M.name)u[S]=A=M.name;else if(null!=n){var L=o[n],P=a[L][C];if(P){A=P[I];var O=l[L].ordinalMeta;O&&O.categories.length&&(A=O.categories[A]);}}var E=null==M?null:M.id;null==E&&null!=A&&(f[A]=f[A]||0,E=A,f[A]>0&&(E+="__ec__"+f[A]),f[A]++),null!=E&&(h[S]=E);}}!r.persistent&&r.clean&&r.clean(),this._rawCount=this._count=e,this._extent={},Ul(this);}},oy.count=function(){return this._count;},oy.getIndices=function(){var t,e=this._indices;if(e){var n=e.constructor,i=this._count;if(n===Array){t=new n(i);for(var r=0;i>r;r++){t[r]=e[r];}}else t=new n(e.buffer,0,i);}else for(var n=Gl(this),t=new n(this.count()),r=0;r<t.length;r++){t[r]=r;}return t;},oy.get=function(t,e){if(!(e>=0&&e<this._count))return 0/0;var n=this._storage;if(!n[t])return 0/0;e=this.getRawIndex(e);var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize,a=n[t][i],o=a[r];return o;},oy.getByRawIndex=function(t,e){if(!(e>=0&&e<this._rawCount))return 0/0;var n=this._storage[t];if(!n)return 0/0;var i=Math.floor(e/this._chunkSize),r=e%this._chunkSize,a=n[i];return a[r];},oy._getFast=function(t,e){var n=Math.floor(e/this._chunkSize),i=e%this._chunkSize,r=this._storage[t][n];return r[i];},oy.getValues=function(t,e){var n=[];x(t)||(e=t,t=this.dimensions);for(var i=0,r=t.length;r>i;i++){n.push(this.get(t[i],e));}return n;},oy.hasValue=function(t){for(var e=this._dimensionsSummary.dataDimsOnCoord,n=this._dimensionInfos,i=0,r=e.length;r>i;i++){if("ordinal"!==n[e[i]].type&&isNaN(this.get(e[i],t)))return!1;}return!0;},oy.getDataExtent=function(t){t=this.getDimension(t);var e=this._storage[t],n=tu();if(!e)return n;var i,r=this.count(),a=!this._indices;if(a)return this._rawExtent[t].slice();if(i=this._extent[t])return i.slice();i=n;for(var o=i[0],s=i[1],l=0;r>l;l++){var u=this._getFast(t,this.getRawIndex(l));o>u&&(o=u),u>s&&(s=u);}return i=[o,s],this._extent[t]=i,i;},oy.getApproximateExtent=function(t){return t=this.getDimension(t),this._approximateExtent[t]||this.getDataExtent(t);},oy.setApproximateExtent=function(t,e){e=this.getDimension(e),this._approximateExtent[e]=t.slice();},oy.getCalculationInfo=function(t){return this._calculationInfo[t];},oy.setCalculationInfo=function(t,e){Km(t)?o(this._calculationInfo,t):this._calculationInfo[t]=e;},oy.getSum=function(t){var e=this._storage[t],n=0;if(e)for(var i=0,r=this.count();r>i;i++){var a=this.get(t,i);isNaN(a)||(n+=a);}return n;},oy.getMedian=function(t){var e=[];this.each(t,function(t){isNaN(t)||e.push(t);});var n=[].concat(e).sort(function(t,e){return t-e;}),i=this.count();return 0===i?0:i%2===1?n[(i-1)/2]:(n[i/2]+n[i/2-1])/2;},oy.rawIndexOf=function(t,e){var n=t&&this._invertedIndicesMap[t],i=n[e];return null==i||isNaN(i)?-1:i;},oy.indexOfName=function(t){for(var e=0,n=this.count();n>e;e++){if(this.getName(e)===t)return e;}return-1;},oy.indexOfRawIndex=function(t){if(!this._indices)return t;if(t>=this._rawCount||0>t)return-1;var e=this._indices,n=e[t];if(null!=n&&n<this._count&&n===t)return t;for(var i=0,r=this._count-1;r>=i;){var a=(i+r)/2|0;if(e[a]<t)i=a+1;else{if(!(e[a]>t))return a;r=a-1;}}return-1;},oy.indicesOfNearest=function(t,e,n){var i=this._storage,r=i[t],a=[];if(!r)return a;null==n&&(n=1/0);for(var o=Number.MAX_VALUE,s=-1,l=0,u=this.count();u>l;l++){var h=e-this.get(t,l),c=Math.abs(h);n>=h&&o>=c&&((o>c||h>=0&&0>s)&&(o=c,s=h,a.length=0),a.push(l));}return a;},oy.getRawIndex=Yl,oy.getRawDataItem=function(t){if(this._rawData.persistent)return this._rawData.getItem(this.getRawIndex(t));for(var e=[],n=0;n<this.dimensions.length;n++){var i=this.dimensions[n];e.push(this.get(i,t));}return e;},oy.getName=function(t){var e=this.getRawIndex(t);return this._nameList[e]||Xl(this,this._nameDimIdx,e)||"";},oy.getId=function(t){return $l(this,this.getRawIndex(t));},oy.each=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this,t=p(Kl(t),this.getDimension,this);for(var r=t.length,a=0;a<this.count();a++){switch(r){case 0:e.call(n,a);break;case 1:e.call(n,this.get(t[0],a),a);break;case 2:e.call(n,this.get(t[0],a),this.get(t[1],a),a);break;default:for(var o=0,s=[];r>o;o++){s[o]=this.get(t[o],a);}s[o]=a,e.apply(n,s);}}}},oy.filterSelf=function(t,e,n,i){if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this,t=p(Kl(t),this.getDimension,this);for(var r=this.count(),a=Gl(this),o=new a(r),s=[],l=t.length,u=0,h=t[0],c=0;r>c;c++){var f,d=this.getRawIndex(c);if(0===l)f=e.call(n,c);else if(1===l){var g=this._getFast(h,d);f=e.call(n,g,c);}else{for(var v=0;l>v;v++){s[v]=this._getFast(h,d);}s[v]=c,f=e.apply(n,s);}f&&(o[u++]=d);}return r>u&&(this._indices=o),this._count=u,this._extent={},this.getRawIndex=this._indices?Zl:Yl,this;}},oy.selectRange=function(t){if(this._count){var e=[];for(var n in t){t.hasOwnProperty(n)&&e.push(n);}var i=e.length;if(i){var r=this.count(),a=Gl(this),o=new a(r),s=0,l=e[0],u=t[l][0],h=t[l][1],c=!1;if(!this._indices){var f=0;if(1===i){for(var d=this._storage[e[0]],p=0;p<this._chunkCount;p++){for(var g=d[p],v=Math.min(this._count-p*this._chunkSize,this._chunkSize),m=0;v>m;m++){var y=g[m];(y>=u&&h>=y||isNaN(y))&&(o[s++]=f),f++;}}c=!0;}else if(2===i){for(var d=this._storage[l],_=this._storage[e[1]],x=t[e[1]][0],w=t[e[1]][1],p=0;p<this._chunkCount;p++){for(var g=d[p],b=_[p],v=Math.min(this._count-p*this._chunkSize,this._chunkSize),m=0;v>m;m++){var y=g[m],M=b[m];(y>=u&&h>=y||isNaN(y))&&(M>=x&&w>=M||isNaN(M))&&(o[s++]=f),f++;}}c=!0;}}if(!c)if(1===i)for(var m=0;r>m;m++){var S=this.getRawIndex(m),y=this._getFast(l,S);(y>=u&&h>=y||isNaN(y))&&(o[s++]=S);}else for(var m=0;r>m;m++){for(var C=!0,S=this.getRawIndex(m),p=0;i>p;p++){var I=e[p],y=this._getFast(n,S);(y<t[I][0]||y>t[I][1])&&(C=!1);}C&&(o[s++]=this.getRawIndex(m));}return r>s&&(this._indices=o),this._count=s,this._extent={},this.getRawIndex=this._indices?Zl:Yl,this;}}},oy.mapArray=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this;var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments));},n),r;},oy.map=function(t,e,n,i){n=n||i||this,t=p(Kl(t),this.getDimension,this);var r=Ql(this,t);r._indices=this._indices,r.getRawIndex=r._indices?Zl:Yl;for(var a=r._storage,o=[],s=this._chunkSize,l=t.length,u=this.count(),h=[],c=r._rawExtent,f=0;u>f;f++){for(var d=0;l>d;d++){h[d]=this.get(t[d],f);}h[l]=f;var g=e&&e.apply(n,h);if(null!=g){"object"!=(typeof g==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(g))&&(o[0]=g,g=o);for(var v=this.getRawIndex(f),m=Math.floor(v/s),y=v%s,_=0;_<g.length;_++){var x=t[_],w=g[_],b=c[x],M=a[x];M&&(M[m][y]=w),w<b[0]&&(b[0]=w),w>b[1]&&(b[1]=w);}}}return r;},oy.downSample=function(t,e,n,i){for(var r=Ql(this,[t]),a=r._storage,o=[],s=Math.floor(1/e),l=a[t],u=this.count(),h=this._chunkSize,c=r._rawExtent[t],f=new(Gl(this))(u),d=0,p=0;u>p;p+=s){s>u-p&&(s=u-p,o.length=s);for(var g=0;s>g;g++){var v=this.getRawIndex(p+g),m=Math.floor(v/h),y=v%h;o[g]=l[m][y];}var _=n(o),x=this.getRawIndex(Math.min(p+i(o,_)||0,u-1)),w=Math.floor(x/h),b=x%h;l[w][b]=_,_<c[0]&&(c[0]=_),_>c[1]&&(c[1]=_),f[d++]=x;}return r._count=d,r._indices=f,r.getRawIndex=Zl,r;},oy.getItemModel=function(t){var e=this.hostModel;return new Aa(this.getRawDataItem(t),e,e&&e.ecModel);},oy.diff=function(t){var e=this;return new Nl(t?t.getIndices():[],this.getIndices(),function(e){return $l(t,e);},function(t){return $l(e,t);});},oy.getVisual=function(t){var e=this._visual;return e&&e[t];},oy.setVisual=function(t,e){if(Km(t))for(var n in t){t.hasOwnProperty(n)&&this.setVisual(n,t[n]);}else this._visual=this._visual||{},this._visual[t]=e;},oy.setLayout=function(t,e){if(Km(t))for(var n in t){t.hasOwnProperty(n)&&this.setLayout(n,t[n]);}else this._layout[t]=e;},oy.getLayout=function(t){return this._layout[t];},oy.getItemLayout=function(t){return this._itemLayouts[t];},oy.setItemLayout=function(t,e,n){this._itemLayouts[t]=n?o(this._itemLayouts[t]||{},e):e;},oy.clearItemLayouts=function(){this._itemLayouts.length=0;},oy.getItemVisual=function(t,e,n){var i=this._itemVisuals[t],r=i&&i[e];return null!=r||n?r:this.getVisual(e);},oy.setItemVisual=function(t,e,n){var i=this._itemVisuals[t]||{},r=this.hasItemVisual;if(this._itemVisuals[t]=i,Km(e))for(var a in e){e.hasOwnProperty(a)&&(i[a]=e[a],r[a]=!0);}else i[e]=n,r[e]=!0;},oy.clearAllVisual=function(){this._visual={},this._itemVisuals=[],this.hasItemVisual={};};var sy=function sy(t){t.seriesIndex=this.seriesIndex,t.dataIndex=this.dataIndex,t.dataType=this.dataType;};oy.setItemGraphicEl=function(t,e){var n=this.hostModel;e&&(e.dataIndex=t,e.dataType=this.dataType,e.seriesIndex=n&&n.seriesIndex,"group"===e.type&&e.traverse(sy,e)),this._graphicEls[t]=e;},oy.getItemGraphicEl=function(t){return this._graphicEls[t];},oy.eachItemGraphicEl=function(t,e){d(this._graphicEls,function(n,i){n&&t&&t.call(e,n,i);});},oy.cloneShallow=function(t){if(!t){var e=p(this.dimensions,this.getDimensionInfo,this);t=new ay(e,this.hostModel);}if(t._storage=this._storage,ql(t,this),this._indices){var n=this._indices.constructor;t._indices=new n(this._indices);}else t._indices=null;return t.getRawIndex=t._indices?Zl:Yl,t;},oy.wrapMethod=function(t,e){var n=this[t];"function"==typeof n&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=n.apply(this,arguments);return e.apply(this,[t].concat(L(arguments)));});},oy.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],oy.CHANGABLE_METHODS=["filterSelf","selectRange"];var ly=function ly(t,e){return e=e||{},eu(e.coordDimensions||[],t,{dimsDef:e.dimensionsDefine||t.dimensionsDefine,encodeDef:e.encodeDefine||t.encodeDefine,dimCount:e.dimensionsCount,generateCoord:e.generateCoord,generateCoordCount:e.generateCoordCount});};hu.prototype.parse=function(t){return t;},hu.prototype.getSetting=function(t){return this._setting[t];},hu.prototype.contain=function(t){var e=this._extent;return t>=e[0]&&t<=e[1];},hu.prototype.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0]);},hu.prototype.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0];},hu.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]);},hu.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e));},hu.prototype.getExtent=function(){return this._extent.slice();},hu.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=t),isNaN(e)||(n[1]=e);},hu.prototype.isBlank=function(){return this._isBlank;},hu.prototype.setBlank=function(t){this._isBlank=t;},hu.prototype.getLabel=null,Xi(hu),Ki(hu,{registerWhenExtend:!0}),cu.createByAxisModel=function(t){var e=t.option,n=e.data,i=n&&p(n,du);return new cu({categories:i,needCollect:!i,deduplication:e.dedplication!==!1});};var uy=cu.prototype;uy.getOrdinal=function(t){return fu(this).get(t);},uy.parseAndCollect=function(t){var e,n=this._needCollect;if("string"!=typeof t&&!n)return t;if(n&&!this._deduplication)return e=this.categories.length,this.categories[e]=t,e;var i=fu(this);return e=i.get(t),null==e&&(n?(e=this.categories.length,this.categories[e]=t,i.set(t,e)):e=0/0),e;};var hy=hu.prototype,cy=hu.extend({type:"ordinal",init:function init(t,e){(!t||x(t))&&(t=new cu({categories:t})),this._ordinalMeta=t,this._extent=e||[0,t.categories.length-1];},parse:function parse(t){return"string"==typeof t?this._ordinalMeta.getOrdinal(t):Math.round(t);},contain:function contain(t){return t=this.parse(t),hy.contain.call(this,t)&&null!=this._ordinalMeta.categories[t];},normalize:function normalize(t){return hy.normalize.call(this,this.parse(t));},scale:function scale(t){return Math.round(hy.scale.call(this,t));},getTicks:function getTicks(){for(var t=[],e=this._extent,n=e[0];n<=e[1];){t.push(n),n++;}return t;},getLabel:function getLabel(t){return this.isBlank()?void 0:this._ordinalMeta.categories[t];},count:function count(){return this._extent[1]-this._extent[0]+1;},unionExtentFromData:function unionExtentFromData(t,e){this.unionExtent(t.getApproximateExtent(e));},getOrdinalMeta:function getOrdinalMeta(){return this._ordinalMeta;},niceTicks:V,niceExtent:V});cy.create=function(){return new cy();};var fy=Fa,dy=Fa,py=hu.extend({type:"interval",_interval:0,_intervalPrecision:2,setExtent:function setExtent(t,e){var n=this._extent;isNaN(t)||(n[0]=parseFloat(t)),isNaN(e)||(n[1]=parseFloat(e));},unionExtent:function unionExtent(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),py.prototype.setExtent.call(this,e[0],e[1]);},getInterval:function getInterval(){return this._interval;},setInterval:function setInterval(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=gu(t);},getTicks:function getTicks(){return yu(this._interval,this._extent,this._niceExtent,this._intervalPrecision);},getLabel:function getLabel(t,e){if(null==t)return"";var n=e&&e.precision;return null==n?n=Wa(t)||0:"auto"===n&&(n=this._intervalPrecision),t=dy(t,n,!0),Ja(t);},niceTicks:function niceTicks(t,e,n){t=t||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){0>r&&(r=-r,i.reverse());var a=pu(i,t,e,n);this._intervalPrecision=a.intervalPrecision,this._interval=a.interval,this._niceExtent=a.niceTickExtent;}},niceExtent:function niceExtent(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var n=e[0];t.fixMax?e[0]-=n/2:(e[1]+=n/2,e[0]-=n/2);}else e[1]=1;var i=e[1]-e[0];isFinite(i)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var r=this._interval;t.fixMin||(e[0]=dy(Math.floor(e[0]/r)*r)),t.fixMax||(e[1]=dy(Math.ceil(e[1]/r)*r));}});py.create=function(){return new py();};var gy="__ec_stack_",vy=.5,my="undefined"!=typeof Float32Array?Float32Array:Array,yy=({seriesType:"bar",plan:jv(),reset:function reset(t){function e(t,e){for(var n,c=new my(2*t.count),f=[],d=[],p=0;null!=(n=t.next());){d[u]=e.get(o,n),d[1-u]=e.get(s,n),f=i.dataToPoint(d,null,f),c[p++]=f[0],c[p++]=f[1];}e.setLayout({largePoints:c,barWidth:h,valueAxisStart:Du(r,a,!1),valueAxisHorizontal:l});}if(Cu(t)&&Iu(t)){var n=t.getData(),i=t.coordinateSystem,r=i.getBaseAxis(),a=i.getOtherAxis(r),o=n.mapDimension(a.dim),s=n.mapDimension(r.dim),l=a.isHorizontal(),u=l?0:1,h=Su(bu([t]),r,t).width;return h>vy||(h=vy),{progress:e};}}},py.prototype),_y=Math.ceil,xy=Math.floor,wy=1e3,by=60*wy,My=60*by,Sy=24*My,Cy=function Cy(t,e,n,i){for(;i>n;){var r=n+i>>>1;t[r][1]<e?n=r+1:i=r;}return n;},Iy=py.extend({type:"time",getLabel:function getLabel(t){var e=this._stepLvl,n=new Date(t);return oo(e[0],n,this.getSetting("useUTC"));},niceExtent:function niceExtent(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=Sy,e[1]+=Sy),e[1]===-1/0&&1/0===e[0]){var n=new Date();e[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),e[0]=e[1]-Sy;}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var i=this._interval;t.fixMin||(e[0]=Fa(xy(e[0]/i)*i)),t.fixMax||(e[1]=Fa(_y(e[1]/i)*i));},niceTicks:function niceTicks(t,e,n){t=t||10;var i=this._extent,r=i[1]-i[0],a=r/t;null!=e&&e>a&&(a=e),null!=n&&a>n&&(a=n);var o=Dy.length,s=Cy(Dy,a,0,o),l=Dy[Math.min(s,o-1)],u=l[1];if("year"===l[0]){var h=r/u,c=$a(h/t,!0);u*=c;}var f=this.getSetting("useUTC")?0:60*new Date(+i[0]||+i[1]).getTimezoneOffset()*1e3,d=[Math.round(_y((i[0]-f)/u)*u+f),Math.round(xy((i[1]-f)/u)*u+f)];mu(d,i),this._stepLvl=l,this._interval=u,this._niceExtent=d;},parse:function parse(t){return+Xa(t);}});d(["contain","normalize"],function(t){Iy.prototype[t]=function(e){return yy[t].call(this,this.parse(e));};});var Dy=[["hh:mm:ss",wy],["hh:mm:ss",5*wy],["hh:mm:ss",10*wy],["hh:mm:ss",15*wy],["hh:mm:ss",30*wy],["hh:mm\nMM-dd",by],["hh:mm\nMM-dd",5*by],["hh:mm\nMM-dd",10*by],["hh:mm\nMM-dd",15*by],["hh:mm\nMM-dd",30*by],["hh:mm\nMM-dd",My],["hh:mm\nMM-dd",2*My],["hh:mm\nMM-dd",6*My],["hh:mm\nMM-dd",12*My],["MM-dd\nyyyy",Sy],["MM-dd\nyyyy",2*Sy],["MM-dd\nyyyy",3*Sy],["MM-dd\nyyyy",4*Sy],["MM-dd\nyyyy",5*Sy],["MM-dd\nyyyy",6*Sy],["week",7*Sy],["MM-dd\nyyyy",10*Sy],["week",14*Sy],["week",21*Sy],["month",31*Sy],["week",42*Sy],["month",62*Sy],["week",42*Sy],["quarter",380*Sy/4],["month",31*Sy*4],["month",31*Sy*5],["half-year",380*Sy/2],["month",31*Sy*8],["month",31*Sy*10],["year",380*Sy]];Iy.create=function(t){return new Iy({useUTC:t.ecModel.get("useUTC")});};var Ty=hu.prototype,ky=py.prototype,Ay=Wa,Ly=Fa,Py=Math.floor,Oy=Math.ceil,Ey=Math.pow,Ry=Math.log,zy=hu.extend({type:"log",base:10,$constructor:function $constructor(){hu.apply(this,arguments),this._originalScale=new py();},getTicks:function getTicks(){var t=this._originalScale,e=this._extent,n=t.getExtent();return p(ky.getTicks.call(this),function(i){var r=Fa(Ey(this.base,i));return r=i===e[0]&&t.__fixMin?Tu(r,n[0]):r,r=i===e[1]&&t.__fixMax?Tu(r,n[1]):r;},this);},getLabel:ky.getLabel,scale:function scale(t){return t=Ty.scale.call(this,t),Ey(this.base,t);},setExtent:function setExtent(t,e){var n=this.base;t=Ry(t)/Ry(n),e=Ry(e)/Ry(n),ky.setExtent.call(this,t,e);},getExtent:function getExtent(){var t=this.base,e=Ty.getExtent.call(this);e[0]=Ey(t,e[0]),e[1]=Ey(t,e[1]);var n=this._originalScale,i=n.getExtent();return n.__fixMin&&(e[0]=Tu(e[0],i[0])),n.__fixMax&&(e[1]=Tu(e[1],i[1])),e;},unionExtent:function unionExtent(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=Ry(t[0])/Ry(e),t[1]=Ry(t[1])/Ry(e),Ty.unionExtent.call(this,t);},unionExtentFromData:function unionExtentFromData(t,e){this.unionExtent(t.getApproximateExtent(e));},niceTicks:function niceTicks(t){t=t||10;var e=this._extent,n=e[1]-e[0];if(!(1/0===n||0>=n)){var i=Ya(n),r=t/n*i;for(.5>=r&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&Math.abs(i)>0;){i*=10;}var a=[Fa(Oy(e[0]/i)*i),Fa(Py(e[1]/i)*i)];this._interval=i,this._niceExtent=a;}},niceExtent:function niceExtent(t){ky.niceExtent.call(this,t);var e=this._originalScale;e.__fixMin=t.fixMin,e.__fixMax=t.fixMax;}});d(["contain","normalize"],function(t){zy.prototype[t]=function(e){return e=Ry(e)/Ry(this.base),Ty[t].call(this,e);};}),zy.create=function(){return new zy();};var By={getMin:function getMin(t){var e=this.option,n=t||null==e.rangeStart?e.min:e.rangeStart;return this.axis&&null!=n&&"dataMin"!==n&&"function"!=typeof n&&!D(n)&&(n=this.axis.scale.parse(n)),n;},getMax:function getMax(t){var e=this.option,n=t||null==e.rangeEnd?e.max:e.rangeEnd;return this.axis&&null!=n&&"dataMax"!==n&&"function"!=typeof n&&!D(n)&&(n=this.axis.scale.parse(n)),n;},getNeedCrossZero:function getNeedCrossZero(){var t=this.option;return null!=t.rangeStart||null!=t.rangeEnd?!1:!t.scale;},getCoordSysModel:V,setRange:function setRange(t,e){this.option.rangeStart=t,this.option.rangeEnd=e;},resetRange:function resetRange(){this.option.rangeStart=this.option.rangeEnd=null;}},Ny=Wr({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i+a),t.lineTo(n-r,i+a),t.closePath();}}),Fy=Wr({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,a=e.height/2;t.moveTo(n,i-a),t.lineTo(n+r,i),t.lineTo(n,i+a),t.lineTo(n-r,i),t.closePath();}}),Vy=Wr({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.x,i=e.y,r=e.width/5*3,a=Math.max(r,e.height),o=r/2,s=o*o/(a-o),l=i-a+o+s,u=Math.asin(s/o),h=Math.cos(u)*o,c=Math.sin(u),f=Math.cos(u),d=.6*o,p=.7*o;t.moveTo(n-h,l+s),t.arc(n,l,o,Math.PI-u,2*Math.PI+u),t.bezierCurveTo(n+h-c*d,l+s+f*d,n,i-p,n,i),t.bezierCurveTo(n,i-p,n-h+c*d,l+s+f*d,n-h,l+s),t.closePath();}}),Hy=Wr({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.height,i=e.width,r=e.x,a=e.y,o=i/3*2;t.moveTo(r,a),t.lineTo(r+o,a+n),t.lineTo(r,a+n/4*3),t.lineTo(r-o,a+n),t.lineTo(r,a),t.closePath();}}),Wy={line:gg,rect:pg,roundRect:pg,square:pg,circle:ag,diamond:Fy,pin:Vy,arrow:Hy,triangle:Ny},Gy={line:function line(t,e,n,i,r){r.x1=t,r.y1=e+i/2,r.x2=t+n,r.y2=e+i/2;},rect:function rect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i;},roundRect:function roundRect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i,r.r=Math.min(n,i)/4;},square:function square(t,e,n,i,r){var a=Math.min(n,i);r.x=t,r.y=e,r.width=a,r.height=a;},circle:function circle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.r=Math.min(n,i)/2;},diamond:function diamond(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;},pin:function pin(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},arrow:function arrow(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},triangle:function triangle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;}},jy={};d(Wy,function(t,e){jy[e]=new t();});var qy=Wr({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},beforeBrush:function beforeBrush(){var t=this.style,e=this.shape;"pin"===e.symbolType&&"inside"===t.textPosition&&(t.textPosition=["50%","40%"],t.textAlign="center",t.textVerticalAlign="middle");},buildPath:function buildPath(t,e,n){var i=e.symbolType,r=jy[i];"none"!==e.symbolType&&(r||(i="rect",r=jy[i]),Gy[i](e.x,e.y,e.width,e.height,r.shape),r.buildPath(t,r.shape,n));}}),Uy={isDimensionStacked:au,enableDataStack:ru,getStackedDimension:ou},Xy=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({createList:Vu,getLayoutRect:uo,dataStack:Uy,createScale:Hu,mixinAxisModelCommonMethods:Wu,completeDimensions:eu,createDimensions:ly,createSymbol:Fu}),Yy=1e-8;qu.prototype={constructor:qu,properties:null,getBoundingRect:function getBoundingRect(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,n=[e,e],i=[-e,-e],r=[],a=[],o=this.geometries,s=0;s<o.length;s++){if("polygon"===o[s].type){var l=o[s].exterior;fr(l,r,a),oe(n,n,r),se(i,i,a);}}return 0===s&&(n[0]=n[1]=i[0]=i[1]=0),this._rect=new rn(n[0],n[1],i[0]-n[0],i[1]-n[1]);},contain:function contain(t){var e=this.getBoundingRect(),n=this.geometries;if(!e.contain(t[0],t[1]))return!1;t:for(var i=0,r=n.length;r>i;i++){if("polygon"===n[i].type){var a=n[i].exterior,o=n[i].interiors;if(ju(a,t[0],t[1])){for(var s=0;s<(o?o.length:0);s++){if(ju(o[s]))continue t;}return!0;}}}return!1;},transformTo:function transformTo(t,e,n,i){var r=this.getBoundingRect(),a=r.width/r.height;n?i||(i=n/a):n=a*i;for(var o=new rn(t,e,n,i),s=r.calculateTransform(o),l=this.geometries,u=0;u<l.length;u++){if("polygon"===l[u].type){for(var h=l[u].exterior,c=l[u].interiors,f=0;f<h.length;f++){ae(h[f],h[f],s);}for(var d=0;d<(c?c.length:0);d++){for(var f=0;f<c[d].length;f++){ae(c[d][f],c[d][f],s);}}}}r=this._rect,r.copy(o),this.center=[r.x+r.width/2,r.y+r.height/2];}};var Zy=function Zy(t){return Uu(t),p(v(t.features,function(t){return t.geometry&&t.properties&&t.geometry.coordinates.length>0;}),function(t){var e=t.properties,n=t.geometry,i=n.coordinates,r=[];"Polygon"===n.type&&r.push({type:"polygon",exterior:i[0],interiors:i.slice(1)}),"MultiPolygon"===n.type&&d(i,function(t){t[0]&&r.push({type:"polygon",exterior:t[0],interiors:t.slice(1)});});var a=new qu(e.name,r,e.cp);return a.properties=e,a;});},$y=Vi(),Ky=[0,1],Qy=function Qy(t,e,n){this.dim=t,this.scale=e,this._extent=n||[0,0],this.inverse=!1,this.onBand=!1;};Qy.prototype={constructor:Qy,contain:function contain(t){var e=this._extent,n=Math.min(e[0],e[1]),i=Math.max(e[0],e[1]);return t>=n&&i>=t;},containData:function containData(t){return this.contain(this.dataToCoord(t));},getExtent:function getExtent(){return this._extent.slice();},getPixelPrecision:function getPixelPrecision(t){return Ga(t||this.scale.getExtent(),this._extent);},setExtent:function setExtent(t,e){var n=this._extent;n[0]=t,n[1]=e;},dataToCoord:function dataToCoord(t,e){var n=this._extent,i=this.scale;return t=i.normalize(t),this.onBand&&"ordinal"===i.type&&(n=n.slice(),uh(n,i.count())),Ba(t,Ky,n,e);},coordToData:function coordToData(t,e){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&(n=n.slice(),uh(n,i.count()));var r=Ba(t,n,Ky,e);return this.scale.scale(r);},pointToData:function pointToData(){},getTicksCoords:function getTicksCoords(t){t=t||{};var e=t.tickModel||this.getTickModel(),n=Zu(this,e),i=n.ticks,r=p(i,function(t){return{coord:this.dataToCoord(t),tickValue:t};},this),a=e.get("alignWithLabel");return hh(this,r,n.tickCategoryInterval,a,t.clamp),r;},getViewLabels:function getViewLabels(){return Yu(this).labels;},getLabelModel:function getLabelModel(){return this.model.getModel("axisLabel");},getTickModel:function getTickModel(){return this.model.getModel("axisTick");},getBandWidth:function getBandWidth(){var t=this._extent,e=this.scale.getExtent(),n=e[1]-e[0]+(this.onBand?1:0);0===n&&(n=1);var i=Math.abs(t[1]-t[0]);return Math.abs(i)/n;},isHorizontal:null,getRotate:null,calculateCategoryInterval:function calculateCategoryInterval(){return rh(this);}};var Jy=Zy,t_={};d(["map","each","filter","indexOf","inherits","reduce","filter","bind","curry","isArray","isString","isObject","isFunction","extend","defaults","clone","merge"],function(t){t_[t]=rf[t];}),Hv.extend({type:"series.line",dependencies:["grid","polar"],getInitialData:function getInitialData(){return su(this.getSource(),this);},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,clipOverflow:!0,label:{position:"top"},lineStyle:{width:2,type:"solid"},step:!1,smooth:!1,smoothMonotone:null,symbol:"emptyCircle",symbolSize:4,symbolRotate:null,showSymbol:!0,showAllSymbol:"auto",connectNulls:!1,sampling:"none",animationEasing:"linear",progressive:0,hoverLayerThreshold:1/0}});var e_=fh.prototype,n_=fh.getSymbolSize=function(t,e){var n=t.getItemVisual(e,"symbolSize");return n instanceof Array?n.slice():[+n,+n];};e_._createSymbol=function(t,e,n,i,r){this.removeAll();var a=e.getItemVisual(n,"color"),o=Fu(t,-1,-1,2,2,a,r);o.attr({z2:100,culling:!0,scale:dh(i)}),o.drift=ph,this._symbolType=t,this.add(o);},e_.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(t);},e_.getSymbolPath=function(){return this.childAt(0);},e_.getScale=function(){return this.childAt(0).scale;},e_.highlight=function(){this.childAt(0).trigger("emphasis");},e_.downplay=function(){this.childAt(0).trigger("normal");},e_.setZ=function(t,e){var n=this.childAt(0);n.zlevel=t,n.z=e;},e_.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":"pointer";},e_.updateData=function(t,e,n){this.silent=!1;var i=t.getItemVisual(e,"symbol")||"circle",r=t.hostModel,a=n_(t,e),o=i!==this._symbolType;if(o){var s=t.getItemVisual(e,"symbolKeepAspect");this._createSymbol(i,t,e,a,s);}else{var l=this.childAt(0);l.silent=!1,wa(l,{scale:dh(a)},r,e);}if(this._updateCommon(t,e,a,n),o){var l=this.childAt(0),u=n&&n.fadeIn,h={scale:l.scale.slice()};u&&(h.style={opacity:l.style.opacity}),l.scale=[0,0],u&&(l.style.opacity=0),ba(l,h,r,e);}this._seriesModel=r;};var i_=["itemStyle"],r_=["emphasis","itemStyle"],a_=["label"],o_=["emphasis","label"];e_._updateCommon=function(t,e,n,i){function r(e){return b?t.getName(e):ch(t,e);}var a=this.childAt(0),s=t.hostModel,l=t.getItemVisual(e,"color");"image"!==a.type&&a.useStyle({strokeNoScale:!0});var u=i&&i.itemStyle,h=i&&i.hoverItemStyle,c=i&&i.symbolRotate,f=i&&i.symbolOffset,d=i&&i.labelModel,p=i&&i.hoverLabelModel,g=i&&i.hoverAnimation,v=i&&i.cursorStyle;if(!i||t.hasItemOption){var m=i&&i.itemModel?i.itemModel:t.getItemModel(e);u=m.getModel(i_).getItemStyle(["color"]),h=m.getModel(r_).getItemStyle(),c=m.getShallow("symbolRotate"),f=m.getShallow("symbolOffset"),d=m.getModel(a_),p=m.getModel(o_),g=m.getShallow("hoverAnimation"),v=m.getShallow("cursor");}else h=o({},h);var y=a.style;a.attr("rotation",(c||0)*Math.PI/180||0),f&&a.attr("position",[Na(f[0],n[0]),Na(f[1],n[1])]),v&&a.attr("cursor",v),a.setColor(l,i&&i.symbolInnerColor),a.setStyle(u);var _=t.getItemVisual(e,"opacity");null!=_&&(y.opacity=_);var x=t.getItemVisual(e,"liftZ"),w=a.__z2Origin;null!=x?null==w&&(a.__z2Origin=a.z2,a.z2+=x):null!=w&&(a.z2=w,a.__z2Origin=null);var b=i&&i.useNameLabel;ha(y,h,d,p,{labelFetcher:s,labelDataIndex:e,defaultText:r,isRectText:!0,autoColor:l}),a.off("mouseover").off("mouseout").off("emphasis").off("normal"),a.hoverStyle=h,ua(a);var M=dh(n);if(g&&s.isAnimationEnabled()){var S=function S(){if(!this.incremental){var t=M[1]/M[0];this.animateTo({scale:[Math.max(1.1*M[0],M[0]+3),Math.max(1.1*M[1],M[1]+3*t)]},400,"elasticOut");}},C=function C(){this.incremental||this.animateTo({scale:M},400,"elasticOut");};a.on("mouseover",S).on("mouseout",C).on("emphasis",S).on("normal",C);}},e_.fadeOut=function(t,e){var n=this.childAt(0);this.silent=n.silent=!0,!(e&&e.keepLabel)&&(n.style.text=null),wa(n,{style:{opacity:0},scale:[0,0]},this._seriesModel,this.dataIndex,t);},h(fh,Xf);var s_=gh.prototype;s_.updateData=function(t,e){e=mh(e);var n=this.group,i=t.hostModel,r=this._data,a=this._symbolCtor,o=yh(t);r||n.removeAll(),t.diff(r).add(function(i){var r=t.getItemLayout(i);if(vh(t,r,i,e)){var s=new a(t,i,o);s.attr("position",r),t.setItemGraphicEl(i,s),n.add(s);}}).update(function(s,l){var u=r.getItemGraphicEl(l),h=t.getItemLayout(s);return vh(t,h,s,e)?(u?(u.updateData(t,s,o),wa(u,{position:h},i)):(u=new a(t,s),u.attr("position",h)),n.add(u),void t.setItemGraphicEl(s,u)):void n.remove(u);}).remove(function(t){var e=r.getItemGraphicEl(t);e&&e.fadeOut(function(){n.remove(e);});}).execute(),this._data=t;},s_.isPersistent=function(){return!0;},s_.updateLayout=function(){var t=this._data;t&&t.eachItemGraphicEl(function(e,n){var i=t.getItemLayout(n);e.attr("position",i);});},s_.incrementalPrepareUpdate=function(t){this._seriesScope=yh(t),this._data=null,this.group.removeAll();},s_.incrementalUpdate=function(t,e,n){function i(t){t.isGroup||(t.incremental=t.useHoverLayer=!0);}n=mh(n);for(var r=t.start;r<t.end;r++){var a=e.getItemLayout(r);if(vh(e,a,r,n)){var o=new this._symbolCtor(e,r,this._seriesScope);o.traverse(i),o.attr("position",a),this.group.add(o),e.setItemGraphicEl(r,o);}}},s_.remove=function(t){var e=this.group,n=this._data;n&&t?n.eachItemGraphicEl(function(t){t.fadeOut(function(){e.remove(t);});}):e.removeAll();};var l_=function l_(t,e,n,i,r,a,o,s){for(var l=bh(t,e),u=[],h=[],c=[],f=[],d=[],p=[],g=[],v=_h(r,e,o),m=_h(a,t,s),y=0;y<l.length;y++){var _=l[y],x=!0;switch(_.cmd){case"=":var w=t.getItemLayout(_.idx),b=e.getItemLayout(_.idx1);(isNaN(w[0])||isNaN(w[1]))&&(w=b.slice()),u.push(w),h.push(b),c.push(n[_.idx]),f.push(i[_.idx1]),g.push(e.getRawIndex(_.idx1));break;case"+":var M=_.idx;u.push(r.dataToPoint([e.get(v.dataDimsForPoint[0],M),e.get(v.dataDimsForPoint[1],M)])),h.push(e.getItemLayout(M).slice()),c.push(wh(v,r,e,M)),f.push(i[M]),g.push(e.getRawIndex(M));break;case"-":var M=_.idx,S=t.getRawIndex(M);S!==M?(u.push(t.getItemLayout(M)),h.push(a.dataToPoint([t.get(m.dataDimsForPoint[0],M),t.get(m.dataDimsForPoint[1],M)])),c.push(n[M]),f.push(wh(m,a,t,M)),g.push(S)):x=!1;}x&&(d.push(_),p.push(p.length));}p.sort(function(t,e){return g[t]-g[e];});for(var C=[],I=[],D=[],T=[],k=[],y=0;y<p.length;y++){var M=p[y];C[y]=u[M],I[y]=h[M],D[y]=c[M],T[y]=f[M],k[y]=d[M];}return{current:C,next:I,stackedOnCurrent:D,stackedOnNext:T,status:k};},u_=oe,h_=se,c_=U,f_=W,d_=[],p_=[],g_=[],v_=Lr.extend({type:"ec-polyline",shape:{points:[],smooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},style:{fill:null,stroke:"#000"},brush:sg(Lr.prototype.brush),buildPath:function buildPath(t,e){var n=e.points,i=0,r=n.length,a=Dh(n,e.smoothConstraint);if(e.connectNulls){for(;r>0&&Mh(n[r-1]);r--){}for(;r>i&&Mh(n[i]);i++){}}for(;r>i;){i+=Sh(t,n,i,r,r,1,a.min,a.max,e.smooth,e.smoothMonotone,e.connectNulls)+1;}}}),m_=Lr.extend({type:"ec-polygon",shape:{points:[],stackedOnPoints:[],smooth:0,stackedOnSmooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},brush:sg(Lr.prototype.brush),buildPath:function buildPath(t,e){var n=e.points,i=e.stackedOnPoints,r=0,a=n.length,o=e.smoothMonotone,s=Dh(n,e.smoothConstraint),l=Dh(i,e.smoothConstraint);if(e.connectNulls){for(;a>0&&Mh(n[a-1]);a--){}for(;a>r&&Mh(n[r]);r++){}}for(;a>r;){var u=Sh(t,n,r,a,a,1,s.min,s.max,e.smooth,o,e.connectNulls);Sh(t,i,r+u-1,u,a,-1,l.min,l.max,e.stackedOnSmooth,o,e.connectNulls),r+=u+1,t.closePath();}}});Ss.extend({type:"line",init:function init(){var t=new Xf(),e=new gh();this.group.add(e.group),this._symbolDraw=e,this._lineGroup=t;},render:function render(t,e,n){var i=t.coordinateSystem,r=this.group,a=t.getData(),o=t.getModel("lineStyle"),l=t.getModel("areaStyle"),u=a.mapArray(a.getItemLayout),h="polar"===i.type,c=this._coordSys,f=this._symbolDraw,d=this._polyline,p=this._polygon,g=this._lineGroup,v=t.get("animation"),m=!l.isEmpty(),y=l.get("origin"),_=_h(i,a,y),x=Lh(i,a,_),w=t.get("showSymbol"),b=w&&!h&&Bh(t,a,i),M=this._data;M&&M.eachItemGraphicEl(function(t,e){t.__temp&&(r.remove(t),M.setItemGraphicEl(e,null));}),w||f.remove(),r.add(g);var S=!h&&t.get("step");d&&c.type===i.type&&S===this._step?(m&&!p?p=this._newPolygon(u,x,i,v):p&&!m&&(g.remove(p),p=this._polygon=null),g.setClipPath(Eh(i,!1,!1,t)),w&&f.updateData(a,{isIgnore:b,clipShape:Eh(i,!1,!0,t)}),a.eachItemGraphicEl(function(t){t.stopAnimation(!0);}),Th(this._stackedOnPoints,x)&&Th(this._points,u)||(v?this._updateAnimation(a,x,i,n,S,y):(S&&(u=Rh(u,i,S),x=Rh(x,i,S)),d.setShape({points:u}),p&&p.setShape({points:u,stackedOnPoints:x})))):(w&&f.updateData(a,{isIgnore:b,clipShape:Eh(i,!1,!0,t)}),S&&(u=Rh(u,i,S),x=Rh(x,i,S)),d=this._newPolyline(u,i,v),m&&(p=this._newPolygon(u,x,i,v)),g.setClipPath(Eh(i,!0,!1,t)));var C=zh(a,i)||a.getVisual("color");d.useStyle(s(o.getLineStyle(),{fill:"none",stroke:C,lineJoin:"bevel"}));var I=t.get("smooth");if(I=kh(t.get("smooth")),d.setShape({smooth:I,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")}),p){var D=a.getCalculationInfo("stackedOnSeries"),T=0;p.useStyle(s(l.getAreaStyle(),{fill:C,opacity:.7,lineJoin:"bevel"})),D&&(T=kh(D.get("smooth"))),p.setShape({smooth:I,stackedOnSmooth:T,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")});}this._data=a,this._coordSys=i,this._stackedOnPoints=x,this._points=u,this._step=S,this._valueOrigin=y;},dispose:function dispose(){},highlight:function highlight(t,e,n,i){var r=t.getData(),a=Fi(r,i);if(!(a instanceof Array)&&null!=a&&a>=0){var o=r.getItemGraphicEl(a);if(!o){var s=r.getItemLayout(a);if(!s)return;o=new fh(r,a),o.position=s,o.setZ(t.get("zlevel"),t.get("z")),o.ignore=isNaN(s[0])||isNaN(s[1]),o.__temp=!0,r.setItemGraphicEl(a,o),o.stopSymbolAnimation(!0),this.group.add(o);}o.highlight();}else Ss.prototype.highlight.call(this,t,e,n,i);},downplay:function downplay(t,e,n,i){var r=t.getData(),a=Fi(r,i);if(null!=a&&a>=0){var o=r.getItemGraphicEl(a);o&&(o.__temp?(r.setItemGraphicEl(a,null),this.group.remove(o)):o.downplay());}else Ss.prototype.downplay.call(this,t,e,n,i);},_newPolyline:function _newPolyline(t){var e=this._polyline;return e&&this._lineGroup.remove(e),e=new v_({shape:{points:t},silent:!0,z2:10}),this._lineGroup.add(e),this._polyline=e,e;},_newPolygon:function _newPolygon(t,e){var n=this._polygon;return n&&this._lineGroup.remove(n),n=new m_({shape:{points:t,stackedOnPoints:e},silent:!0}),this._lineGroup.add(n),this._polygon=n,n;},_updateAnimation:function _updateAnimation(t,e,n,i,r,a){var o=this._polyline,s=this._polygon,l=t.hostModel,u=l_(this._data,t,this._stackedOnPoints,e,this._coordSys,n,this._valueOrigin,a),h=u.current,c=u.stackedOnCurrent,f=u.next,d=u.stackedOnNext;r&&(h=Rh(u.current,n,r),c=Rh(u.stackedOnCurrent,n,r),f=Rh(u.next,n,r),d=Rh(u.stackedOnNext,n,r)),o.shape.__points=u.current,o.shape.points=h,wa(o,{shape:{points:f}},l),s&&(s.setShape({points:h,stackedOnPoints:c}),wa(s,{shape:{points:f,stackedOnPoints:d}},l));for(var p=[],g=u.status,v=0;v<g.length;v++){var m=g[v].cmd;if("="===m){var y=t.getItemGraphicEl(g[v].idx1);y&&p.push({el:y,ptIdx:v});}}o.animators&&o.animators.length&&o.animators[0].during(function(){for(var t=0;t<p.length;t++){var e=p[t].el;e.attr("position",o.shape.__points[p[t].ptIdx]);}});},remove:function remove(){var t=this.group,e=this._data;this._lineGroup.removeAll(),this._symbolDraw.remove(!0),e&&e.eachItemGraphicEl(function(n,i){n.__temp&&(t.remove(n),e.setItemGraphicEl(i,null));}),this._polyline=this._polygon=this._coordSys=this._points=this._stackedOnPoints=this._data=null;}});var y_=function y_(t,e,n){return{seriesType:t,performRawSeries:!0,reset:function reset(t,i){function r(e,n){if("function"==typeof s){var i=t.getRawValue(n),r=t.getDataParams(n);e.setItemVisual(n,"symbolSize",s(i,r));}if(e.hasItemOption){var a=e.getItemModel(n),o=a.getShallow("symbol",!0),l=a.getShallow("symbolSize",!0),u=a.getShallow("symbolKeepAspect",!0);null!=o&&e.setItemVisual(n,"symbol",o),null!=l&&e.setItemVisual(n,"symbolSize",l),null!=u&&e.setItemVisual(n,"symbolKeepAspect",u);}}var a=t.getData(),o=t.get("symbol")||e,s=t.get("symbolSize"),l=t.get("symbolKeepAspect");if(a.setVisual({legendSymbol:n||o,symbol:o,symbolSize:s,symbolKeepAspect:l}),!i.isSeriesFiltered(t)){var u="function"==typeof s;return{dataEach:a.hasItemOption||u?r:null};}}};},__=function __(t){return{seriesType:t,plan:jv(),reset:function reset(t){function e(t,e){for(var n=t.end-t.start,r=a&&new Float32Array(n*s),l=t.start,u=0,h=[],c=[];l<t.end;l++){var f;if(1===s){var d=e.get(o[0],l);f=!isNaN(d)&&i.dataToPoint(d,null,c);}else{var d=h[0]=e.get(o[0],l),p=h[1]=e.get(o[1],l);f=!isNaN(d)&&!isNaN(p)&&i.dataToPoint(h,null,c);}a?(r[u++]=f?f[0]:0/0,r[u++]=f?f[1]:0/0):e.setItemLayout(l,f&&f.slice()||[0/0,0/0]);}a&&e.setLayout("symbolPoints",r);}var n=t.getData(),i=t.coordinateSystem,r=t.pipelineContext,a=r.large;if(i){var o=p(i.dimensions,function(t){return n.mapDimension(t);}).slice(0,2),s=o.length,l=n.getCalculationInfo("stackResultDimension");return au(n,o[0])&&(o[0]=l),au(n,o[1])&&(o[1]=l),s&&{progress:e};}}};},x_={average:function average(t){for(var e=0,n=0,i=0;i<t.length;i++){isNaN(t[i])||(e+=t[i],n++);}return 0===n?0/0:e/n;},sum:function sum(t){for(var e=0,n=0;n<t.length;n++){e+=t[n]||0;}return e;},max:function max(t){for(var e=-1/0,n=0;n<t.length;n++){t[n]>e&&(e=t[n]);}return isFinite(e)?e:0/0;},min:function min(t){for(var e=1/0,n=0;n<t.length;n++){t[n]<e&&(e=t[n]);}return isFinite(e)?e:0/0;},nearest:function nearest(t){return t[0];}},w_=function w_(t){return Math.round(t.length/2);},b_=function b_(t){return{seriesType:t,modifyOutputEnd:!0,reset:function reset(t){var e=t.getData(),n=t.get("sampling"),i=t.coordinateSystem;if("cartesian2d"===i.type&&n){var r=i.getBaseAxis(),a=i.getOtherAxis(r),o=r.getExtent(),s=o[1]-o[0],l=Math.round(e.count()/s);if(l>1){var u;"string"==typeof n?u=x_[n]:"function"==typeof n&&(u=n),u&&t.setData(e.downSample(e.mapDimension(a.dim),1/l,u,w_));}}}};},M_=function M_(t){this._axes={},this._dimList=[],this.name=t||"";};M_.prototype={constructor:M_,type:"cartesian",getAxis:function getAxis(t){return this._axes[t];},getAxes:function getAxes(){return p(this._dimList,Fh,this);},getAxesByScale:function getAxesByScale(t){return t=t.toLowerCase(),v(this.getAxes(),function(e){return e.scale.type===t;});},addAxis:function addAxis(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e);},dataToCoord:function dataToCoord(t){return this._dataCoordConvert(t,"dataToCoord");},coordToData:function coordToData(t){return this._dataCoordConvert(t,"coordToData");},_dataCoordConvert:function _dataCoordConvert(t,e){for(var n=this._dimList,i=t instanceof Array?[]:{},r=0;r<n.length;r++){var a=n[r],o=this._axes[a];i[a]=o[e](t[a]);}return i;}},Vh.prototype={constructor:Vh,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function getBaseAxis(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x");},containPoint:function containPoint(t){var e=this.getAxis("x"),n=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&n.contain(n.toLocalCoord(t[1]));},containData:function containData(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1]);},dataToPoint:function dataToPoint(t,e,n){var i=this.getAxis("x"),r=this.getAxis("y");return n=n||[],n[0]=i.toGlobalCoord(i.dataToCoord(t[0])),n[1]=r.toGlobalCoord(r.dataToCoord(t[1])),n;},clampData:function clampData(t,e){var n=this.getAxis("x").scale,i=this.getAxis("y").scale,r=n.getExtent(),a=i.getExtent(),o=n.parse(t[0]),s=i.parse(t[1]);return e=e||[],e[0]=Math.min(Math.max(Math.min(r[0],r[1]),o),Math.max(r[0],r[1])),e[1]=Math.min(Math.max(Math.min(a[0],a[1]),s),Math.max(a[0],a[1])),e;},pointToData:function pointToData(t,e){var n=this.getAxis("x"),i=this.getAxis("y");return e=e||[],e[0]=n.coordToData(n.toLocalCoord(t[0])),e[1]=i.coordToData(i.toLocalCoord(t[1])),e;},getOtherAxis:function getOtherAxis(t){return this.getAxis("x"===t.dim?"y":"x");}},h(Vh,M_);var S_=function S_(t,e,n,i,r){Qy.call(this,t,e,n),this.type=i||"value",this.position=r||"bottom";};S_.prototype={constructor:S_,index:0,getAxesOnZeroOf:null,model:null,isHorizontal:function isHorizontal(){var t=this.position;return"top"===t||"bottom"===t;},getGlobalExtent:function getGlobalExtent(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e;},getOtherAxis:function getOtherAxis(){this.grid.getOtherAxis();},pointToData:function pointToData(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e);},toLocalCoord:null,toGlobalCoord:null},h(S_,Qy);var C_={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},I_={};I_.categoryAxis=r({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},C_),I_.valueAxis=r({boundaryGap:[0,0],splitNumber:5},C_),I_.timeAxis=s({scale:!0,min:"dataMin",max:"dataMax"},I_.valueAxis),I_.logAxis=s({scale:!0,logBase:10},I_.valueAxis);var D_=["value","category","time","log"],T_=function T_(t,e,n,i){d(D_,function(o){e.extend({type:t+"Axis."+o,mergeDefaultAndTheme:function mergeDefaultAndTheme(e,i){var a=this.layoutMode,s=a?co(e):{},l=i.getTheme();r(e,l.get(o+"Axis")),r(e,this.getDefaultOption()),e.type=n(t,e),a&&ho(e,s,a);},optionUpdated:function optionUpdated(){var t=this.option;"category"===t.type&&(this.__ordinalMeta=cu.createByAxisModel(this));},getCategories:function getCategories(t){var e=this.option;return"category"===e.type?t?e.data:this.__ordinalMeta.categories:void 0;},getOrdinalMeta:function getOrdinalMeta(){return this.__ordinalMeta;},defaultOption:a([{},I_[o+"Axis"],i],!0)});}),tv.registerSubTypeDefaulter(t+"Axis",_(n,t));},k_=tv.extend({type:"cartesian2dAxis",axis:null,init:function init(){k_.superApply(this,"init",arguments),this.resetRange();},mergeOption:function mergeOption(){k_.superApply(this,"mergeOption",arguments),this.resetRange();},restoreData:function restoreData(){k_.superApply(this,"restoreData",arguments),this.resetRange();},getCoordSysModel:function getCoordSysModel(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0];}});r(k_.prototype,By);var A_={offset:0};T_("x",k_,Hh,A_),T_("y",k_,Hh,A_),tv.extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});var L_=Gh.prototype;L_.type="grid",L_.axisPointerEnabled=!0,L_.getRect=function(){return this._rect;},L_.update=function(t,e){var n=this._axesMap;this._updateScale(t,this.model),d(n.x,function(t){Lu(t.scale,t.model);}),d(n.y,function(t){Lu(t.scale,t.model);}),d(n.x,function(t){jh(n,"y",t);}),d(n.y,function(t){jh(n,"x",t);}),this.resize(this.model,e);},L_.resize=function(t,e,n){function i(){d(a,function(t){var e=t.isHorizontal(),n=e?[0,r.width]:[0,r.height],i=t.inverse?1:0;t.setExtent(n[i],n[1-i]),Uh(t,e?r.x:r.y);});}var r=uo(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});this._rect=r;var a=this._axesList;i(),!n&&t.get("containLabel")&&(d(a,function(t){if(!t.model.get("axisLabel.inside")){var e=zu(t);if(e){var n=t.isHorizontal()?"height":"width",i=t.model.get("axisLabel.margin");r[n]-=e[n]+i,"top"===t.position?r.y+=e.height+i:"left"===t.position&&(r.x+=e.width+i);}}}),i());},L_.getAxis=function(t,e){var n=this._axesMap[t];if(null!=n){if(null==e)for(var i in n){if(n.hasOwnProperty(i))return n[i];}return n[e];}},L_.getAxes=function(){return this._axesList.slice();},L_.getCartesian=function(t,e){if(null!=t&&null!=e){var n="x"+t+"y"+e;return this._coordsMap[n];}M(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++){if(r[i].getAxis("x").index===t||r[i].getAxis("y").index===e)return r[i];}},L_.getCartesians=function(){return this._coordsList.slice();},L_.convertToPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.dataToPoint(n):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(n)):null;},L_.convertFromPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.pointToData(n):i.axis?i.axis.coordToData(i.axis.toLocalCoord(n)):null;},L_._findConvertTarget=function(t,e){var n,i,r=e.seriesModel,a=e.xAxisModel||r&&r.getReferringComponents("xAxis")[0],o=e.yAxisModel||r&&r.getReferringComponents("yAxis")[0],s=e.gridModel,l=this._coordsList;if(r)n=r.coordinateSystem,u(l,n)<0&&(n=null);else if(a&&o)n=this.getCartesian(a.componentIndex,o.componentIndex);else if(a)i=this.getAxis("x",a.componentIndex);else if(o)i=this.getAxis("y",o.componentIndex);else if(s){var h=s.coordinateSystem;h===this&&(n=this._coordsList[0]);}return{cartesian:n,axis:i};},L_.containPoint=function(t){var e=this._coordsList[0];return e?e.containPoint(t):void 0;},L_._initCartesian=function(t,e){function n(n){return function(o,s){if(Wh(o,t,e)){var l=o.get("position");"x"===n?"top"!==l&&"bottom"!==l&&(l="bottom",i[l]&&(l="top"===l?"bottom":"top")):"left"!==l&&"right"!==l&&(l="left",i[l]&&(l="left"===l?"right":"left")),i[l]=!0;var u=new S_(n,Pu(o),[0,0],o.get("type"),l),h="category"===u.type;u.onBand=h&&o.get("boundaryGap"),u.inverse=o.get("inverse"),o.axis=u,u.model=o,u.grid=this,u.index=s,this._axesList.push(u),r[n][s]=u,a[n]++;}};}var i={left:!1,right:!1,top:!1,bottom:!1},r={x:{},y:{}},a={x:0,y:0};return e.eachComponent("xAxis",n("x"),this),e.eachComponent("yAxis",n("y"),this),a.x&&a.y?(this._axesMap=r,void d(r.x,function(e,n){d(r.y,function(i,r){var a="x"+n+"y"+r,o=new Vh(a);o.grid=this,o.model=t,this._coordsMap[a]=o,this._coordsList.push(o),o.addAxis(e),o.addAxis(i);},this);},this)):(this._axesMap={},void(this._axesList=[]));},L_._updateScale=function(t,e){function n(t,e){d(t.mapDimension(e.dim,!0),function(n){e.scale.unionExtentFromData(t,ou(t,n));});}d(this._axesList,function(t){t.scale.setExtent(1/0,-1/0);}),t.eachSeries(function(i){if(Yh(i)){var r=Xh(i,t),a=r[0],o=r[1];if(!Wh(a,e,t)||!Wh(o,e,t))return;var s=this.getCartesian(a.componentIndex,o.componentIndex),l=i.getData(),u=s.getAxis("x"),h=s.getAxis("y");"list"===l.type&&(n(l,u,i),n(l,h,i));}},this);},L_.getTooltipAxes=function(t){var e=[],n=[];return d(this.getCartesians(),function(i){var r=null!=t&&"auto"!==t?i.getAxis(t):i.getBaseAxis(),a=i.getOtherAxis(r);u(e,r)<0&&e.push(r),u(n,a)<0&&n.push(a);}),{baseAxes:e,otherAxes:n};};var P_=["xAxis","yAxis"];Gh.create=function(t,e){var n=[];return t.eachComponent("grid",function(i,r){var a=new Gh(i,t,e);a.name="grid_"+r,a.resize(i,e,!0),i.coordinateSystem=a,n.push(a);}),t.eachSeries(function(e){if(Yh(e)){var n=Xh(e,t),i=n[0],r=n[1],a=i.getCoordSysModel(),o=a.coordinateSystem;e.coordinateSystem=o.getCartesian(i.componentIndex,r.componentIndex);}}),n;},Gh.dimensions=Gh.prototype.dimensions=Vh.prototype.dimensions,Fo.register("cartesian2d",Gh);var O_=Math.PI,E_=function E_(t,e){this.opt=e,this.axisModel=t,s(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new Xf();var n=new Xf({position:e.position.slice(),rotation:e.rotation});n.updateTransform(),this._transform=n.transform,this._dumbGroup=n;};E_.prototype={constructor:E_,hasBuilder:function hasBuilder(t){return!!R_[t];},add:function add(t){R_[t].call(this);},getGroup:function getGroup(){return this.group;}};var R_={axisLine:function axisLine(){var t=this.opt,e=this.axisModel;if(e.get("axisLine.show")){var n=this.axisModel.axis.getExtent(),i=this._transform,r=[n[0],0],a=[n[1],0];i&&(ae(r,r,i),ae(a,a,i));var s=o({lineCap:"round"},e.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new gg(Yr({anid:"line",shape:{x1:r[0],y1:r[1],x2:a[0],y2:a[1]},style:s,strokeContainThreshold:t.strokeContainThreshold||5,silent:!0,z2:1})));var l=e.get("axisLine.symbol"),u=e.get("axisLine.symbolSize"),h=e.get("axisLine.symbolOffset")||0;if("number"==typeof h&&(h=[h,h]),null!=l){"string"==typeof l&&(l=[l,l]),("string"==typeof u||"number"==typeof u)&&(u=[u,u]);var c=u[0],f=u[1];d([{rotate:t.rotation+Math.PI/2,offset:h[0],r:0},{rotate:t.rotation-Math.PI/2,offset:h[1],r:Math.sqrt((r[0]-a[0])*(r[0]-a[0])+(r[1]-a[1])*(r[1]-a[1]))}],function(e,n){if("none"!==l[n]&&null!=l[n]){var i=Fu(l[n],-c/2,-f/2,c,f,s.stroke,!0),a=e.r+e.offset,o=[r[0]+a*Math.cos(t.rotation),r[1]-a*Math.sin(t.rotation)];i.attr({rotation:e.rotate,position:o,silent:!0}),this.group.add(i);}},this);}}},axisTickLabel:function axisTickLabel(){var t=this.axisModel,e=this.opt,n=nc(this,t,e),i=ic(this,t,e);Qh(t,i,n);},axisName:function axisName(){var t=this.opt,e=this.axisModel,n=T(t.axisName,e.get("name"));if(n){var i,r=e.get("nameLocation"),a=t.nameDirection,s=e.getModel("nameTextStyle"),l=e.get("nameGap")||0,u=this.axisModel.axis.getExtent(),h=u[0]>u[1]?-1:1,c=["start"===r?u[0]-h*l:"end"===r?u[1]+h*l:(u[0]+u[1])/2,ec(r)?t.labelOffset+a*l:0],f=e.get("nameRotate");null!=f&&(f=f*O_/180);var d;ec(r)?i=z_(t.rotation,null!=f?f:t.rotation,a):(i=$h(t,r,f||0,u),d=t.axisNameAvailableWidth,null!=d&&(d=Math.abs(d/Math.sin(i.rotation)),!isFinite(d)&&(d=null)));var p=s.getFont(),g=e.get("nameTruncate",!0)||{},v=g.ellipsis,m=T(t.nameTruncateMaxWidth,g.maxWidth,d),y=null!=v&&null!=m?Ug(n,m,p,v,{minChar:2,placeholder:g.placeholder}):n,_=e.get("tooltip",!0),x=e.mainType,w={componentType:x,name:n,$vars:["name"]};w[x+"Index"]=e.componentIndex;var b=new rg({anid:"name",__fullText:n,__truncatedText:y,position:c,rotation:i.rotation,silent:Kh(e),z2:1,tooltip:_&&_.show?o({content:n,formatter:function formatter(){return n;},formatterParams:w},_):null});ca(b.style,s,{text:y,textFont:p,textFill:s.getTextColor()||e.get("axisLine.lineStyle.color"),textAlign:i.textAlign,textVerticalAlign:i.textVerticalAlign}),e.get("triggerEvent")&&(b.eventData=Zh(e),b.eventData.targetType="axisName",b.eventData.name=n),this._dumbGroup.add(b),b.updateTransform(),this.group.add(b),b.decomposeTransform();}}},z_=E_.innerTextLayout=function(t,e,n){var i,r,a=qa(e-t);return Ua(a)?(r=n>0?"top":"bottom",i="center"):Ua(a-O_)?(r=n>0?"bottom":"top",i="center"):(r="middle",i=a>0&&O_>a?n>0?"right":"left":n>0?"left":"right"),{rotation:a,textAlign:i,textVerticalAlign:r};},B_=Ll({type:"axis",_axisPointer:null,axisPointerClass:null,render:function render(t,e,n,i){this.axisPointerClass&&rc(t),B_.superApply(this,"render",arguments),uc(this,t,e,n,i,!0);},updateAxisPointer:function updateAxisPointer(t,e,n,i){uc(this,t,e,n,i,!1);},remove:function remove(t,e){var n=this._axisPointer;n&&n.remove(e),B_.superApply(this,"remove",arguments);},dispose:function dispose(t,e){hc(this,e),B_.superApply(this,"dispose",arguments);}}),N_=[];B_.registerAxisPointerClass=function(t,e){N_[t]=e;},B_.getAxisPointerClass=function(t){return t&&N_[t];};var F_=["axisLine","axisTickLabel","axisName"],V_=["splitArea","splitLine"],H_=B_.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function render(t,e,n,i){this.group.removeAll();var r=this._axisGroup;if(this._axisGroup=new Xf(),this.group.add(this._axisGroup),t.get("show")){var a=t.getCoordSysModel(),o=cc(a,t),s=new E_(t,o);d(F_,s.add,s),this._axisGroup.add(s.getGroup()),d(V_,function(e){t.get(e+".show")&&this["_"+e](t,a);},this),Ia(r,this._axisGroup,t),H_.superCall(this,"render",t,e,n,i);}},remove:function remove(){this._splitAreaColors=null;},_splitLine:function _splitLine(t,e){var n=t.axis;if(!n.scale.isBlank()){var i=t.getModel("splitLine"),r=i.getModel("lineStyle"),a=r.get("color");a=x(a)?a:[a];for(var o=e.coordinateSystem.getRect(),l=n.isHorizontal(),u=0,h=n.getTicksCoords({tickModel:i}),c=[],f=[],d=r.getLineStyle(),p=0;p<h.length;p++){var g=n.toGlobalCoord(h[p].coord);l?(c[0]=g,c[1]=o.y,f[0]=g,f[1]=o.y+o.height):(c[0]=o.x,c[1]=g,f[0]=o.x+o.width,f[1]=g);var v=u++%a.length,m=h[p].tickValue;this._axisGroup.add(new gg(Yr({anid:null!=m?"line_"+h[p].tickValue:null,shape:{x1:c[0],y1:c[1],x2:f[0],y2:f[1]},style:s({stroke:a[v]},d),silent:!0})));}}},_splitArea:function _splitArea(t,e){var n=t.axis;if(!n.scale.isBlank()){var i=t.getModel("splitArea"),r=i.getModel("areaStyle"),a=r.get("color"),o=e.coordinateSystem.getRect(),l=n.getTicksCoords({tickModel:i,clamp:!0});if(l.length){var u=a.length,h=this._splitAreaColors,c=N(),f=0;if(h)for(var d=0;d<l.length;d++){var p=h.get(l[d].tickValue);if(null!=p){f=(p+(u-1)*d)%u;break;}}var g=n.toGlobalCoord(l[0].coord),v=r.getAreaStyle();a=x(a)?a:[a];for(var d=1;d<l.length;d++){var m,y,_,w,b=n.toGlobalCoord(l[d].coord);n.isHorizontal()?(m=g,y=o.y,_=b-m,w=o.height,g=m+_):(m=o.x,y=g,_=o.width,w=b-y,g=y+w);var M=l[d-1].tickValue;null!=M&&c.set(M,f),this._axisGroup.add(new pg({anid:null!=M?"area_"+M:null,shape:{x:m,y:y,width:_,height:w},style:s({fill:a[f]},v),silent:!0})),f=(f+1)%u;}this._splitAreaColors=c;}}}});H_.extend({type:"xAxis"}),H_.extend({type:"yAxis"}),Ll({type:"grid",render:function render(t){this.group.removeAll(),t.get("show")&&this.group.add(new pg({shape:t.coordinateSystem.getRect(),style:s({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}));}}),xl(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={});}),Dl(y_("line","circle","line")),Il(__("line")),wl(Dm.PROCESSOR.STATISTIC,b_("line"));var W_=Ja,G_=eo,j_=Al({type:"marker",dependencies:["series","grid","polar","geo"],init:function init(t,e,n,i){this.mergeDefaultAndTheme(t,n),this.mergeOption(t,n,i.createdBySelf,!0);},isAnimationEnabled:function isAnimationEnabled(){if(Gc.node)return!1;var t=this.__hostSeries;return this.getShallow("animation")&&t&&t.isAnimationEnabled();},mergeOption:function mergeOption(t,e,n,i){var r=this.constructor,a=this.mainType+"Model";n||e.eachSeries(function(t){var n=t.get(this.mainType,!0),s=t[a];return n&&n.data?(s?s.mergeOption(n,e,!0):(i&&fc(n),d(n.data,function(t){t instanceof Array?(fc(t[0]),fc(t[1])):fc(t);}),s=new r(n,this,e),o(s,{mainType:this.mainType,seriesIndex:t.seriesIndex,name:t.name,createdBySelf:!0}),s.__hostSeries=t),void(t[a]=s)):void(t[a]=null);},this);},formatTooltip:function formatTooltip(t){var e=this.getData(),n=this.getRawValue(t),i=x(n)?p(n,W_).join(", "):W_(n),r=e.getName(t),a=G_(this.name);return(null!=n||r)&&(a+="<br />"),r&&(a+=G_(r),null!=n&&(a+=" : ")),null!=n&&(a+=G_(i)),a;},getData:function getData(){return this._data;},setData:function setData(t){this._data=t;}});c(j_,Bv),j_.extend({type:"markLine",defaultOption:{zlevel:0,z:5,symbol:["circle","arrow"],symbolSize:[8,16],precision:2,tooltip:{trigger:"item"},label:{show:!0,position:"end"},lineStyle:{type:"dashed"},emphasis:{label:{show:!0},lineStyle:{width:3}},animationEasing:"linear"}});var q_=u,U_=_,X_={min:U_(gc,"min"),max:U_(gc,"max"),average:U_(gc,"average")},Y_=gg.prototype,Z_=mg.prototype,$_=Wr({type:"ec-line",style:{stroke:"#000",fill:null},shape:{x1:0,y1:0,x2:0,y2:0,percent:1,cpx1:null,cpy1:null},buildPath:function buildPath(t,e){(bc(e)?Y_:Z_).buildPath(t,e);},pointAt:function pointAt(t){return bc(this.shape)?Y_.pointAt.call(this,t):Z_.pointAt.call(this,t);},tangentAt:function tangentAt(t){var e=this.shape,n=bc(e)?[e.x2-e.x1,e.y2-e.y1]:Z_.tangentAt.call(this,t);return te(n,n);}}),K_=["fromSymbol","toSymbol"],Q_=Tc.prototype;Q_.beforeUpdate=Dc,Q_._createLine=function(t,e,n){var i=t.hostModel,r=t.getItemLayout(e),a=Cc(r);a.shape.percent=0,ba(a,{shape:{percent:1}},i,e),this.add(a);var o=new rg({name:"label"});this.add(o),d(K_,function(n){var i=Sc(n,t,e);this.add(i),this[Mc(n)]=t.getItemVisual(e,n);},this),this._updateCommonStl(t,e,n);},Q_.updateData=function(t,e,n){var i=t.hostModel,r=this.childOfName("line"),a=t.getItemLayout(e),o={shape:{}};Ic(o.shape,a),wa(r,o,i,e),d(K_,function(n){var i=t.getItemVisual(e,n),r=Mc(n);if(this[r]!==i){this.remove(this.childOfName(n));var a=Sc(n,t,e);this.add(a);}this[r]=i;},this),this._updateCommonStl(t,e,n);},Q_._updateCommonStl=function(t,e,n){var i=t.hostModel,r=this.childOfName("line"),a=n&&n.lineStyle,o=n&&n.hoverLineStyle,l=n&&n.labelModel,u=n&&n.hoverLabelModel;if(!n||t.hasItemOption){var h=t.getItemModel(e);a=h.getModel("lineStyle").getLineStyle(),o=h.getModel("emphasis.lineStyle").getLineStyle(),l=h.getModel("label"),u=h.getModel("emphasis.label");}var c=t.getItemVisual(e,"color"),f=A(t.getItemVisual(e,"opacity"),a.opacity,1);r.useStyle(s({strokeNoScale:!0,fill:"none",stroke:c,opacity:f},a)),r.hoverStyle=o,d(K_,function(t){var e=this.childOfName(t);e&&(e.setColor(c),e.setStyle({opacity:f}));},this);var p,g,v=l.getShallow("show"),m=u.getShallow("show"),y=this.childOfName("label");if((v||m)&&(p=c||"#000",g=i.getFormattedLabel(e,"normal",t.dataType),null==g)){var _=i.getRawValue(e);g=null==_?t.getName(e):isFinite(_)?Fa(_):_;}var x=v?g:null,w=m?k(i.getFormattedLabel(e,"emphasis",t.dataType),g):null,b=y.style;(null!=x||null!=w)&&(ca(y.style,l,{text:x},{autoColor:p}),y.__textAlign=b.textAlign,y.__verticalAlign=b.textVerticalAlign,y.__position=l.get("position")||"middle"),y.hoverStyle=null!=w?{text:w,textFill:u.getTextColor(!0),fontStyle:u.getShallow("fontStyle"),fontWeight:u.getShallow("fontWeight"),fontSize:u.getShallow("fontSize"),fontFamily:u.getShallow("fontFamily")}:{text:null},y.ignore=!v&&!m,ua(this);},Q_.highlight=function(){this.trigger("emphasis");},Q_.downplay=function(){this.trigger("normal");},Q_.updateLayout=function(t,e){this.setLinePoints(t.getItemLayout(e));},Q_.setLinePoints=function(t){var e=this.childOfName("line");Ic(e.shape,t),e.dirty();},h(Tc,Xf);var J_=kc.prototype;J_.isPersistent=function(){return!0;},J_.updateData=function(t){var e=this,n=e.group,i=e._lineData;e._lineData=t,i||n.removeAll();var r=Pc(t);t.diff(i).add(function(n){Ac(e,t,n,r);}).update(function(n,a){Lc(e,i,t,a,n,r);}).remove(function(t){n.remove(i.getItemGraphicEl(t));}).execute();},J_.updateLayout=function(){var t=this._lineData;t&&t.eachItemGraphicEl(function(e,n){e.updateLayout(t,n);},this);},J_.incrementalPrepareUpdate=function(t){this._seriesScope=Pc(t),this._lineData=null,this.group.removeAll();},J_.incrementalUpdate=function(t,e){function n(t){t.isGroup||(t.incremental=t.useHoverLayer=!0);}for(var i=t.start;i<t.end;i++){var r=e.getItemLayout(i);if(Ec(r)){var a=new this._ctor(e,i,this._seriesScope);a.traverse(n),this.group.add(a),e.setItemGraphicEl(i,a);}}},J_.remove=function(){this._clearIncremental(),this._incremental=null,this.group.removeAll();},J_._clearIncremental=function(){var t=this._incremental;t&&t.clearDisplaybles();};var tx=Ll({type:"marker",init:function init(){this.markerGroupMap=N();},render:function render(t,e,n){var i=this.markerGroupMap;i.each(function(t){t.__keep=!1;});var r=this.type+"Model";e.eachSeries(function(t){var i=t[r];i&&this.renderSeries(t,i,e,n);},this),i.each(function(t){!t.__keep&&this.group.remove(t.group);},this);},renderSeries:function renderSeries(){}}),ex=function ex(t,e,n,a){var s=t.getData(),l=a.type;if(!x(a)&&("min"===l||"max"===l||"average"===l||"median"===l||null!=a.xAxis||null!=a.yAxis)){var u,h,c;if(null!=a.yAxis||null!=a.xAxis)h=null!=a.yAxis?"y":"x",u=e.getAxis(h),c=T(a.yAxis,a.xAxis);else{var f=mc(a,s,e,t);h=f.valueDataDim,u=f.valueAxis,c=wc(s,h,l);}var d="x"===h?0:1,p=1-d,g=i(a),v={};g.type=null,g.coord=[],v.coord=[],g.coord[p]=-1/0,v.coord[p]=1/0;var m=n.get("precision");m>=0&&"number"==typeof c&&(c=+c.toFixed(Math.min(m,20))),g.coord[d]=v.coord[d]=c,a=[g,v,{type:l,valueIndex:a.valueIndex,value:c}];}return a=[vc(t,a[0]),vc(t,a[1]),o({},a[2])],a[2].type=a[2].type||"",r(a[2],a[0]),r(a[2],a[1]),a;};tx.extend({type:"markLine",updateTransform:function updateTransform(t,e,n){e.eachSeries(function(t){var e=t.markLineModel;if(e){var i=e.getData(),r=e.__from,a=e.__to;r.each(function(e){Nc(r,e,!0,t,n),Nc(a,e,!1,t,n);}),i.each(function(t){i.setItemLayout(t,[r.getItemLayout(t),a.getItemLayout(t)]);}),this.markerGroupMap.get(t.id).updateLayout();}},this);},renderSeries:function renderSeries(t,e,n,i){function r(e,n,r){var a=e.getItemModel(n);Nc(e,n,r,t,i),e.setItemVisual(n,{symbolSize:a.get("symbolSize")||g[r?0:1],symbol:a.get("symbol",!0)||p[r?0:1],color:a.get("itemStyle.color")||s.getVisual("color")});}var a=t.coordinateSystem,o=t.id,s=t.getData(),l=this.markerGroupMap,u=l.get(o)||l.set(o,new kc());this.group.add(u.group);var h=Fc(a,t,e),c=h.from,f=h.to,d=h.line;e.__from=c,e.__to=f,e.setData(d);var p=e.get("symbol"),g=e.get("symbolSize");x(p)||(p=[p,p]),"number"==typeof g&&(g=[g,g]),h.from.each(function(t){r(c,t,!0),r(f,t,!1);}),d.each(function(t){var e=d.getItemModel(t).get("lineStyle.color");d.setItemVisual(t,{color:e||c.getItemVisual(t,"color")}),d.setItemLayout(t,[c.getItemLayout(t),f.getItemLayout(t)]),d.setItemVisual(t,{fromSymbolSize:c.getItemVisual(t,"symbolSize"),fromSymbol:c.getItemVisual(t,"symbol"),toSymbolSize:f.getItemVisual(t,"symbolSize"),toSymbol:f.getItemVisual(t,"symbol")});}),u.updateData(d),h.line.eachItemGraphicEl(function(t){t.traverse(function(t){t.dataModel=e;});}),u.__keep=!0,u.group.silent=e.get("silent")||t.get("silent");}}),xl(function(t){t.markLine=t.markLine||{};}),t.version=mm,t.dependencies=ym,t.PRIORITY=Dm,t.init=dl,t.connect=pl,t.disConnect=gl,t.disconnect=Ym,t.dispose=vl,t.getInstanceByDom=ml,t.getInstanceById=yl,t.registerTheme=_l,t.registerPreprocessor=xl,t.registerProcessor=wl,t.registerPostUpdate=bl,t.registerAction=Ml,t.registerCoordinateSystem=Sl,t.getCoordinateSystemDimensions=Cl,t.registerLayout=Il,t.registerVisual=Dl,t.registerLoading=kl,t.extendComponentModel=Al,t.extendComponentView=Ll,t.extendSeriesModel=Pl,t.extendChartView=Ol,t.setCanvasCreator=El,t.registerMap=Rl,t.getMap=zl,t.dataTool=Zm,t.zrender=Wd,t.graphic=kg,t.number=Vg,t.format=Yg,t.throttle=ks,t.helper=Xy,t.matrix=mf,t.vector=hf,t.color=Ef,t.parseGeoJSON=Zy,t.parseGeoJson=Jy,t.util=t_,t.List=ay,t.Model=Aa,t.Axis=Qy,t.env=Gc;});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(39).onFreeze;

__webpack_require__(31)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);