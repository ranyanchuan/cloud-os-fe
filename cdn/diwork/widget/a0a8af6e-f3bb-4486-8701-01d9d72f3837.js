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

var core = module.exports = { version: '2.5.1' };
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
var toPrimitive = __webpack_require__(17);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(32);
var hide = __webpack_require__(6);
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
    if (own && key in exports) continue;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(63);
var defined = __webpack_require__(14);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(16)('wks');
var uid = __webpack_require__(12);
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

var isObject = __webpack_require__(7);
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

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(16)('keys');
var uid = __webpack_require__(12);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(57);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(72);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(62);
var enumBugKeys = __webpack_require__(24);
var IE_PROTO = __webpack_require__(15)('IE_PROTO');
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
  __webpack_require__(67).appendChild(iframe);
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
var LIBRARY = __webpack_require__(20);
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
var defined = __webpack_require__(14);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(2);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(15)('IE_PROTO');
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
var $export = __webpack_require__(5);
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
var aFunction = __webpack_require__(50);
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

module.exports = !__webpack_require__(4) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
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

var LIBRARY = __webpack_require__(20);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(36);
var hide = __webpack_require__(6);
var has = __webpack_require__(2);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(61);
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
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
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

module.exports = __webpack_require__(6);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(2);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(64)(false);
var IE_PROTO = __webpack_require__(15)('IE_PROTO');

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

var META = __webpack_require__(12)('meta');
var isObject = __webpack_require__(7);
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
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(17);
var has = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(33);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__download_svg__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__download_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__download_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_css__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_widgetInstance__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_widgetInstance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_widgetInstance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_widgetTool__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_widgetTool___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_widgetTool__);
var MylocaleList=__webpack_require__(98);var echart=__webpack_require__(99);var SERVER_URL='https://u8cacc-daily.yyuap.com';var CostAnalysis1=function(_Component){__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(CostAnalysis1,_Component);function CostAnalysis1(props){__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this,CostAnalysis1);var _this2=__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this,(CostAnalysis1.__proto__||__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(CostAnalysis1)).call(this,props));_this2.getData=function(){var _this=_this2;var url=SERVER_URL+"/fids/digitalExperience/queryProfitStatement";var xhr=_this2.createCORSRequest('POST',url);if(!xhr){console.log('CORS not supported');return;}var params={};xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){var responseData=JSON.parse(xhr.responseText);var success=responseData.success;if(success){_this.setState({responseData:responseData},function(){_this.renderEchart();});}}};xhr.setRequestHeader('Content-Type','application/json');xhr.send(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(params));};_this2.createCORSRequest=function(method,url){var xhr=new XMLHttpRequest();if("withCredentials"in xhr){xhr.withCredentials=true;xhr.open(method,url,true);}else if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();xhr.open(method,url);}else{xhr=null;}return xhr;};_this2.reLoad=function(e){e.preventDefault();e.stopPropagation();_this2.getData();};_this2.renderEchart=function(){_this2.echartLine.setOption({color:['#00B59E','#6558E7','#FBAE49','#00B59E','#E34B41','#FBAE49'],legend:{itemHeight:6,itemWidth:6,orient:'vertical',bottom:'0',right:"0",data:_this2.state.dataX,icon:'circle',textStyle:{fontWeight:400,fontSize:9,color:'#333333'}},tooltip:{backgroundColor:'transparent',position:['38%','38%'],formatter:'{c}<br/>{d}%',textStyle:{fontWeight:400,fontSize:12,color:'black'}},labelLine:{normal:{lineStyle:{color:'#CCCCCC'},smooth:0.2}},series:[{name:'',type:'pie',radius:['35px','48px'],center:['45%','56%'],label:{normal:{formatter:' {b|{b}}\n   {per|{d}%}  ',rich:{per:{fontSize:8,color:'#666666'}},textStyle:{fontWeight:300,fontSize:9}},emphasis:{show:true,textStyle:{fontWeight:'bold'}}},triggerOn:"mousemove",data:_this2.state.dataY}]});};_this2.state={responseData:null,dataY:null,dataX:null,locale:'zh_CN'};if(typeof window.diworkContext==='function'){var _window$diworkContext=window.diworkContext(),locale=_window$diworkContext.locale;_this2.state.locale=locale;}_this2.mylocaleList=MylocaleList[_this2.state.locale];return _this2;}__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(CostAnalysis1,[{key:'componentWillMount',value:function componentWillMount(){var localAddress=window.location.host;if(localAddress.includes("pre")){SERVER_URL="https://acc-y3me-pre.diwork.com";}else if(localAddress.includes("daily")){SERVER_URL='https://u8cacc-daily.yyuap.com';}else if(localAddress.includes("test")){SERVER_URL='http://u8cacc-test.yyuap.com';}this.getData();}},{key:'componentDidMount',value:function componentDidMount(){var _this3=this;this.echartLine=echart.echarts.init(document.getElementById('income_statement'));if(this.state.responseData&&this.state.responseData.dataX&&this.state.responseData.dataY){this.setState({dataX:this.state.responseData.dataX,dataY:this.state.responseData.dataY},function(){_this3.renderEchart();});}else{this.setState({dataX:["营业收入","利润总额","税金"],dataY:[{"name":"营业收入","value":582.1466},{"name":"利润总额","value":536.5646},{"name":"税金","value":45.582}]},function(){_this3.renderEchart();});}}},{key:'clickHandler',value:function clickHandler(){Object(__WEBPACK_IMPORTED_MODULE_10_widgetTool__["dispatch"])('openService',{serviceCode:__WEBPACK_IMPORTED_MODULE_9_widgetInstance__["serviceCode"]});}},{key:'render',value:function render(){return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_8__index_css__["wrap"],onClick:this.clickHandler},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_8__index_css__["titleContainer"]},__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{className:__WEBPACK_IMPORTED_MODULE_8__index_css__["title"]},this.mylocaleList['利润表'])),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',{id:'income_statement',className:__WEBPACK_IMPORTED_MODULE_8__index_css__["echartContainer"]}),__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('a',null,__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img',{className:__WEBPACK_IMPORTED_MODULE_8__index_css__["svg"],src:__WEBPACK_IMPORTED_MODULE_7__download_svg___default.a,onClick:this.reLoad}))));}}]);return CostAnalysis1;}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);/* harmony default export */ __webpack_exports__["default"] = (CostAnalysis1);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(53);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(18);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
__webpack_require__(68);
module.exports = __webpack_require__(26).f('iterator');


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(60)(true);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(14);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(22);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(38);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(65);
var toAbsoluteIndex = __webpack_require__(66);
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
var global = __webpack_require__(1);
var hide = __webpack_require__(6);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(70);
var step = __webpack_require__(71);
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
/* 70 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(36);
var META = __webpack_require__(39).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(16);
var setToStringTag = __webpack_require__(25);
var uid = __webpack_require__(12);
var wks = __webpack_require__(9);
var wksExt = __webpack_require__(26);
var wksDefine = __webpack_require__(27);
var enumKeys = __webpack_require__(75);
var isArray = __webpack_require__(76);
var anObject = __webpack_require__(10);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(17);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(22);
var gOPNExt = __webpack_require__(77);
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

  if (DESCRIPTORS && !__webpack_require__(20)) {
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
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(38);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 77 */
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
/* 78 */
/***/ (function(module, exports) {



/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('asyncIterator');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('observable');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(82);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(86);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(18);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(85).set });


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(22) });


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPg0KPHRpdGxlPjwvdGl0bGU+DQo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPg0KPC9nPg0KPHBhdGggZD0iTTUxMiAxMjhjLTE4Ny43NDQgMC0zNDEuMzQ0IDE1My42LTM0MS4zNDQgMzQxLjM0NCAwIDE3Mi44IDEzMC4xNDQgMzE1Ljc0NCAyOTYuNTQ0IDMzNy4wNTZsLTU3LjYgNDAuNTQ0Yy0xMC42NTYgNi40LTEyLjggMTkuMi00LjI1NiAyOS44NTYgNC4yNTYgNi40IDEwLjY1NiA4LjU0NCAxNy4wNTYgOC41NDQgNC4yNTYgMCA4LjU0NC0yLjE0NCAxMi44LTQuMjU2bDExNS4yLTgxLjA1Ni04MS4wNTYtMTE1LjJjLTYuNC0xMC42NTYtMTkuMi0xMi44LTI5Ljg1Ni00LjI1Ni0xMC42NTYgNi40LTEyLjggMTkuMi00LjI1NiAyOS44NTZsMzYuMjU2IDUxLjJjLTE0NS4wNTYtMjEuMzQ0LTI1Ni0xNDUuMDU2LTI1Ni0yOTQuNCAwLTE2NC4yNTYgMTM0LjQtMjk4LjY1NiAyOTguNjU2LTI5OC42NTZzMjk4LjY1NiAxMzQuNCAyOTguNjU2IDI5OC42NTZjMCA5Ni00Ni45NDQgMTg1LjYtMTIzLjc0NCAyNDMuMmwyNS42IDM0LjE0NGM4OS42LTY0IDE0MC44LTE2OC41NDQgMTQwLjgtMjc3LjM0NC0yLjE0NC0xODUuNi0xNTUuNzQ0LTMzOS4yLTM0My40NTYtMzM5LjJ6Ij48L3BhdGg+DQo8L3N2Zz4NCg=="

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":false}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(94)(content, options);
if(content.locals) module.exports = content.locals;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(93)(false);
// imports


// module
exports.push([module.i, ".scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__wrap--2Ba8d{position:absolute;margin-top:-42px;width:360px;height:176px;background:#fff;box-shadow:0 1px 1px 0 rgba(74,81,93,.1);border-radius:3px;overflow:hidden}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__titleContainer--1EEz8{display:-webkit-box}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title--3XnXd{-webkit-box-flex:1.0;-webkit-box-pack:start;padding-left:8px}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title--3XnXd,.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title_right--Q7ats{margin-top:14px;line-height:21px;font-size:16px;color:#111;font-family:tahoma,Hiragino Sans GB,arial,Heiti SC,Microsoft YaHei,\"sans-serif\"}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title_right--Q7ats{-webkit-box-pack:end;margin-right:10px;height:28px;width:165px;border:1px solid #111}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__year_quarter_month--16ArF{width:54px;border-right:1px solid #111;float:left;line-height:28px;text-align:center}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__year_quarter_month--16ArF:last-child{border-right-width:0}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__echartContainer--3FkZw{height:134px}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__echartContainer--3FkZw canvas{cursor:pointer}.scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__svg--2YIAb{width:16px;height:19px;cursor:pointer;opacity:.4;position:absolute;left:9px;bottom:5px}", ""]);

// exports
exports.locals = {
	"wrap": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__wrap--2Ba8d",
	"titleContainer": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__titleContainer--1EEz8",
	"title": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title--3XnXd",
	"title_right": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__title_right--Q7ats",
	"year_quarter_month": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__year_quarter_month--16ArF",
	"echartContainer": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__echartContainer--3FkZw",
	"svg": "scripts-a0a8af6e-f3bb-4486-8701-01d9d72f3837-index__svg--2YIAb"
};

/***/ }),
/* 93 */
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
/* 94 */
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

var	fixUrls = __webpack_require__(95);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

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
/* 95 */
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
/* 96 */
/***/ (function(module, exports) {

module.exports = widgetInstance;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = widgetTool;

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports={en_US:{'利润表':'Income statement',MonthShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},zh_TW:{'利润表':'利润表',MonthShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},zh_CN:{'利润表':'利润表',MonthShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}};

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
!function(t,e){"object"==(typeof exports==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(exports))&&"undefined"!=typeof module?e(exports):"function"==typeof define&&__webpack_require__(104)?define(["exports"],e):e(t.echarts={});}(this,function(t){"use strict";function e(t){var e={},n={},i=t.match(/Firefox\/([\d.]+)/),r=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),o=t.match(/Edge\/([\d.]+)/),a=/micromessenger/i.test(t);return i&&(n.firefox=!0,n.version=i[1]),r&&(n.ie=!0,n.version=r[1]),o&&(n.edge=!0,n.version=o[1]),a&&(n.weChat=!0),{browser:n,os:e,node:!1,canvasSupported:!!document.createElement("canvas").getContext,svgSupported:"undefined"!=typeof SVGRect,touchEventsSupported:"ontouchstart"in window&&!n.ie&&!n.edge,pointerEventsSupported:"onpointerdown"in window&&(n.edge||n.ie&&n.version>=11)};}function n(t,e){oc[t]=e;}function i(t){if(null==t||"object"!=(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t)))return t;var e=t,n=Qu.call(t);if("[object Array]"===n){e=[];for(var r=0,o=t.length;o>r;r++){e[r]=i(t[r]);}}else if(Ku[n]){var a=t.constructor;if(t.constructor.from)e=a.from(t);else{e=new a(t.length);for(var r=0,o=t.length;o>r;r++){e[r]=i(t[r]);}}}else if(!$u[n]&&!z(t)&&!T(t)){e={};for(var s in t){t.hasOwnProperty(s)&&(e[s]=i(t[s]));}}return e;}function r(t,e,n){if(!S(e)||!S(t))return n?i(e):t;for(var o in e){if(e.hasOwnProperty(o)){var a=t[o],s=e[o];!S(s)||!S(a)||_(s)||_(a)||T(s)||T(a)||M(s)||M(a)||z(s)||z(a)?!n&&o in t||(t[o]=i(e[o],!0)):r(a,s,n);}}return t;}function o(t,e){for(var n=t[0],i=1,o=t.length;o>i;i++){n=r(n,t[i],e);}return n;}function a(t,e){for(var n in e){e.hasOwnProperty(n)&&(t[n]=e[n]);}return t;}function s(t,e,n){for(var i in e){e.hasOwnProperty(i)&&(n?null!=e[i]:null==t[i])&&(t[i]=e[i]);}return t;}function l(){return sc||(sc=ac().getContext("2d")),sc;}function h(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;i>n;n++){if(t[n]===e)return n;}}return-1;}function u(t,e){function n(){}var i=t.prototype;n.prototype=e.prototype,t.prototype=new n();for(var r in i){t.prototype[r]=i[r];}t.prototype.constructor=t,t.superClass=e;}function c(t,e,n){t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,s(t,e,n);}function d(t){return t?"string"==typeof t?!1:"number"==typeof t.length:void 0;}function f(t,e,n){if(t&&e)if(t.forEach&&t.forEach===tc)t.forEach(e,n);else if(t.length===+t.length)for(var i=0,r=t.length;r>i;i++){e.call(n,t[i],i,t);}else for(var o in t){t.hasOwnProperty(o)&&e.call(n,t[o],o,t);}}function g(t,e,n){if(t&&e){if(t.map&&t.map===ic)return t.map(e,n);for(var i=[],r=0,o=t.length;o>r;r++){i.push(e.call(n,t[r],r,t));}return i;}}function p(t,e,n,i){if(t&&e){if(t.reduce&&t.reduce===rc)return t.reduce(e,n,i);for(var r=0,o=t.length;o>r;r++){n=e.call(i,n,t[r],r,t);}return n;}}function v(t,e,n){if(t&&e){if(t.filter&&t.filter===ec)return t.filter(e,n);for(var i=[],r=0,o=t.length;o>r;r++){e.call(n,t[r],r,t)&&i.push(t[r]);}return i;}}function m(t,e,n){if(t&&e)for(var i=0,r=t.length;r>i;i++){if(e.call(n,t[i],i,t))return t[i];}}function y(t,e){var n=nc.call(arguments,2);return function(){return t.apply(e,n.concat(nc.call(arguments)));};}function x(t){var e=nc.call(arguments,1);return function(){return t.apply(this,e.concat(nc.call(arguments)));};}function _(t){return"[object Array]"===Qu.call(t);}function w(t){return"function"==typeof t;}function b(t){return"[object String]"===Qu.call(t);}function S(t){var e=typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t);return"function"===e||!!t&&"object"==e;}function M(t){return!!$u[Qu.call(t)];}function T(t){return"object"==(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t))&&"number"==typeof t.nodeType&&"object"==__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t.ownerDocument);}function I(t){return t!==t;}function C(){for(var t=0,e=arguments.length;e>t;t++){if(null!=arguments[t])return arguments[t];}}function A(t,e){return null!=t?t:e;}function D(t,e,n){return null!=t?t:null!=e?e:n;}function k(){return Function.call.apply(nc,arguments);}function P(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t;}function L(t,e){if(!t)throw new Error(e);}function O(t){t[lc]=!0;}function z(t){return t[lc];}function B(t){t&&f(t,function(t,e){this.set(e,t);},this);}function E(t){return new B(t);}function R(){}function N(t,e){var n=new dc(2);return null==t&&(t=0),null==e&&(e=0),n[0]=t,n[1]=e,n;}function F(t,e){return t[0]=e[0],t[1]=e[1],t;}function G(t){var e=new dc(2);return e[0]=t[0],e[1]=t[1],e;}function H(t,e,n){return t[0]=e,t[1]=n,t;}function W(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t;}function V(t,e,n,i){return t[0]=e[0]+n[0]*i,t[1]=e[1]+n[1]*i,t;}function X(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t;}function q(t){return Math.sqrt(Y(t));}function Y(t){return t[0]*t[0]+t[1]*t[1];}function Z(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t;}function j(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t;}function U(t,e){return t[0]*e[0]+t[1]*e[1];}function $(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t;}function K(t,e){var n=q(e);return 0===n?(t[0]=0,t[1]=0):(t[0]=e[0]/n,t[1]=e[1]/n),t;}function Q(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]));}function J(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]);}function te(t,e){return t[0]=-e[0],t[1]=-e[1],t;}function ee(t,e,n,i){return t[0]=e[0]+i*(n[0]-e[0]),t[1]=e[1]+i*(n[1]-e[1]),t;}function ne(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[2]*r+n[4],t[1]=n[1]*i+n[3]*r+n[5],t;}function ie(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t;}function re(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t;}function oe(){this.on("mousedown",this._dragStart,this),this.on("mousemove",this._drag,this),this.on("mouseup",this._dragEnd,this),this.on("globalout",this._dragEnd,this);}function ae(t,e){return{target:t,topTarget:e&&e.topTarget};}function se(t,e,n){return{type:t,event:n,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:n.zrX,offsetY:n.zrY,gestureEvent:n.gestureEvent,pinchX:n.pinchX,pinchY:n.pinchY,pinchScale:n.pinchScale,wheelDelta:n.zrDelta,zrByTouch:n.zrByTouch,which:n.which};}function le(){}function he(t,e,n){if(t[t.rectHover?"rectContain":"contain"](e,n)){for(var i,r=t;r;){if(r.clipPath&&!r.clipPath.contain(e,n))return!1;r.silent&&(i=!0),r=r.parent;}return i?_c:!0;}return!1;}function ue(){var t=new Sc(6);return ce(t),t;}function ce(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;}function de(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t;}function fe(t,e,n){var i=e[0]*n[0]+e[2]*n[1],r=e[1]*n[0]+e[3]*n[1],o=e[0]*n[2]+e[2]*n[3],a=e[1]*n[2]+e[3]*n[3],s=e[0]*n[4]+e[2]*n[5]+e[4],l=e[1]*n[4]+e[3]*n[5]+e[5];return t[0]=i,t[1]=r,t[2]=o,t[3]=a,t[4]=s,t[5]=l,t;}function ge(t,e,n){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+n[0],t[5]=e[5]+n[1],t;}function pe(t,e,n){var i=e[0],r=e[2],o=e[4],a=e[1],s=e[3],l=e[5],h=Math.sin(n),u=Math.cos(n);return t[0]=i*u+a*h,t[1]=-i*h+a*u,t[2]=r*u+s*h,t[3]=-r*h+u*s,t[4]=u*o+h*l,t[5]=u*l-h*o,t;}function ve(t,e,n){var i=n[0],r=n[1];return t[0]=e[0]*i,t[1]=e[1]*r,t[2]=e[2]*i,t[3]=e[3]*r,t[4]=e[4]*i,t[5]=e[5]*r,t;}function me(t,e){var n=e[0],i=e[2],r=e[4],o=e[1],a=e[3],s=e[5],l=n*a-o*i;return l?(l=1/l,t[0]=a*l,t[1]=-o*l,t[2]=-i*l,t[3]=n*l,t[4]=(i*s-a*r)*l,t[5]=(o*r-n*s)*l,t):null;}function ye(t){return t>Ic||-Ic>t;}function xe(t){this._target=t.target,this._life=t.life||1e3,this._delay=t.delay||0,this._initialized=!1,this.loop=null==t.loop?!1:t.loop,this.gap=t.gap||0,this.easing=t.easing||"Linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart,this._pausedTime=0,this._paused=!1;}function _e(t){return t=Math.round(t),0>t?0:t>255?255:t;}function we(t){return t=Math.round(t),0>t?0:t>360?360:t;}function be(t){return 0>t?0:t>1?1:t;}function Se(t){return _e(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100*255:parseInt(t,10));}function Me(t){return be(t.length&&"%"===t.charAt(t.length-1)?parseFloat(t)/100:parseFloat(t));}function Te(t,e,n){return 0>n?n+=1:n>1&&(n-=1),1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t;}function Ie(t,e,n){return t+(e-t)*n;}function Ce(t,e,n,i,r){return t[0]=e,t[1]=n,t[2]=i,t[3]=r,t;}function Ae(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;}function De(t,e){Nc&&Ae(Nc,e),Nc=Rc.put(t,Nc||e.slice());}function ke(t,e){if(t){e=e||[];var n=Rc.get(t);if(n)return Ae(e,n);t+="";var i=t.replace(/ /g,"").toLowerCase();if(i in Ec)return Ae(e,Ec[i]),De(t,e),e;if("#"!==i.charAt(0)){var r=i.indexOf("("),o=i.indexOf(")");if(-1!==r&&o+1===i.length){var a=i.substr(0,r),s=i.substr(r+1,o-(r+1)).split(","),l=1;switch(a){case"rgba":if(4!==s.length)return void Ce(e,0,0,0,1);l=Me(s.pop());case"rgb":return 3!==s.length?void Ce(e,0,0,0,1):(Ce(e,Se(s[0]),Se(s[1]),Se(s[2]),l),De(t,e),e);case"hsla":return 4!==s.length?void Ce(e,0,0,0,1):(s[3]=Me(s[3]),Pe(s,e),De(t,e),e);case"hsl":return 3!==s.length?void Ce(e,0,0,0,1):(Pe(s,e),De(t,e),e);default:return;}}Ce(e,0,0,0,1);}else{if(4===i.length){var h=parseInt(i.substr(1),16);return h>=0&&4095>=h?(Ce(e,(3840&h)>>4|(3840&h)>>8,240&h|(240&h)>>4,15&h|(15&h)<<4,1),De(t,e),e):void Ce(e,0,0,0,1);}if(7===i.length){var h=parseInt(i.substr(1),16);return h>=0&&16777215>=h?(Ce(e,(16711680&h)>>16,(65280&h)>>8,255&h,1),De(t,e),e):void Ce(e,0,0,0,1);}}}}function Pe(t,e){var n=(parseFloat(t[0])%360+360)%360/360,i=Me(t[1]),r=Me(t[2]),o=.5>=r?r*(i+1):r+i-r*i,a=2*r-o;return e=e||[],Ce(e,_e(255*Te(a,o,n+1/3)),_e(255*Te(a,o,n)),_e(255*Te(a,o,n-1/3)),1),4===t.length&&(e[3]=t[3]),e;}function Le(t){if(t){var e,n,i=t[0]/255,r=t[1]/255,o=t[2]/255,a=Math.min(i,r,o),s=Math.max(i,r,o),l=s-a,h=(s+a)/2;if(0===l)e=0,n=0;else{n=.5>h?l/(s+a):l/(2-s-a);var u=((s-i)/6+l/2)/l,c=((s-r)/6+l/2)/l,d=((s-o)/6+l/2)/l;i===s?e=d-c:r===s?e=1/3+u-d:o===s&&(e=2/3+c-u),0>e&&(e+=1),e>1&&(e-=1);}var f=[360*e,n,h];return null!=t[3]&&f.push(t[3]),f;}}function Oe(t,e){var n=ke(t);if(n){for(var i=0;3>i;i++){n[i]=0>e?n[i]*(1-e)|0:(255-n[i])*e+n[i]|0;}return Fe(n,4===n.length?"rgba":"rgb");}}function ze(t){var e=ke(t);return e?((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1):void 0;}function Be(t,e,n){if(e&&e.length&&t>=0&&1>=t){n=n||[];var i=t*(e.length-1),r=Math.floor(i),o=Math.ceil(i),a=e[r],s=e[o],l=i-r;return n[0]=_e(Ie(a[0],s[0],l)),n[1]=_e(Ie(a[1],s[1],l)),n[2]=_e(Ie(a[2],s[2],l)),n[3]=be(Ie(a[3],s[3],l)),n;}}function Ee(t,e,n){if(e&&e.length&&t>=0&&1>=t){var i=t*(e.length-1),r=Math.floor(i),o=Math.ceil(i),a=ke(e[r]),s=ke(e[o]),l=i-r,h=Fe([_e(Ie(a[0],s[0],l)),_e(Ie(a[1],s[1],l)),_e(Ie(a[2],s[2],l)),be(Ie(a[3],s[3],l))],"rgba");return n?{color:h,leftIndex:r,rightIndex:o,value:i}:h;}}function Re(t,e,n,i){return t=ke(t),t?(t=Le(t),null!=e&&(t[0]=we(e)),null!=n&&(t[1]=Me(n)),null!=i&&(t[2]=Me(i)),Fe(Pe(t),"rgba")):void 0;}function Ne(t,e){return t=ke(t),t&&null!=e?(t[3]=be(e),Fe(t,"rgba")):void 0;}function Fe(t,e){if(t&&t.length){var n=t[0]+","+t[1]+","+t[2];return("rgba"===e||"hsva"===e||"hsla"===e)&&(n+=","+t[3]),e+"("+n+")";}}function Ge(t,e){return t[e];}function He(t,e,n){t[e]=n;}function We(t,e,n){return(e-t)*n+t;}function Ve(t,e,n){return n>.5?e:t;}function Xe(t,e,n,i,r){var o=t.length;if(1==r)for(var a=0;o>a;a++){i[a]=We(t[a],e[a],n);}else for(var s=o&&t[0].length,a=0;o>a;a++){for(var l=0;s>l;l++){i[a][l]=We(t[a][l],e[a][l],n);}}}function qe(t,e,n){var i=t.length,r=e.length;if(i!==r){var o=i>r;if(o)t.length=r;else for(var a=i;r>a;a++){t.push(1===n?e[a]:Wc.call(e[a]));}}for(var s=t[0]&&t[0].length,a=0;a<t.length;a++){if(1===n)isNaN(t[a])&&(t[a]=e[a]);else for(var l=0;s>l;l++){isNaN(t[a][l])&&(t[a][l]=e[a][l]);}}}function Ye(t,e,n){if(t===e)return!0;var i=t.length;if(i!==e.length)return!1;if(1===n){for(var r=0;i>r;r++){if(t[r]!==e[r])return!1;}}else for(var o=t[0].length,r=0;i>r;r++){for(var a=0;o>a;a++){if(t[r][a]!==e[r][a])return!1;}}return!0;}function Ze(t,e,n,i,r,o,a,s,l){var h=t.length;if(1==l)for(var u=0;h>u;u++){s[u]=je(t[u],e[u],n[u],i[u],r,o,a);}else for(var c=t[0].length,u=0;h>u;u++){for(var d=0;c>d;d++){s[u][d]=je(t[u][d],e[u][d],n[u][d],i[u][d],r,o,a);}}}function je(t,e,n,i,r,o,a){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*a+(-3*(e-n)-2*s-l)*o+s*r+e;}function Ue(t){if(d(t)){var e=t.length;if(d(t[0])){for(var n=[],i=0;e>i;i++){n.push(Wc.call(t[i]));}return n;}return Wc.call(t);}return t;}function $e(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")";}function Ke(t){var e=t[t.length-1].value;return d(e&&e[0])?2:1;}function Qe(t,e,n,i,r,o){var a=t._getter,s=t._setter,l="spline"===e,h=i.length;if(h){var u,c=i[0].value,f=d(c),g=!1,p=!1,v=f?Ke(i):0;i.sort(function(t,e){return t.time-e.time;}),u=i[h-1].time;for(var m=[],y=[],x=i[0].value,_=!0,w=0;h>w;w++){m.push(i[w].time/u);var b=i[w].value;if(f&&Ye(b,x,v)||!f&&b===x||(_=!1),x=b,"string"==typeof b){var S=ke(b);S?(b=S,g=!0):p=!0;}y.push(b);}if(o||!_){for(var M=y[h-1],w=0;h-1>w;w++){f?qe(y[w],M,v):!isNaN(y[w])||isNaN(M)||p||g||(y[w]=M);}f&&qe(a(t._target,r),M,v);var T,I,C,A,D,k,P=0,L=0;if(g)var O=[0,0,0,0];var z=function z(t,e){var n;if(0>e)n=0;else if(L>e){for(T=Math.min(P+1,h-1),n=T;n>=0&&!(m[n]<=e);n--){}n=Math.min(n,h-2);}else{for(n=P;h>n&&!(m[n]>e);n++){}n=Math.min(n-1,h-2);}P=n,L=e;var i=m[n+1]-m[n];if(0!==i)if(I=(e-m[n])/i,l){if(A=y[n],C=y[0===n?n:n-1],D=y[n>h-2?h-1:n+1],k=y[n>h-3?h-1:n+2],f)Ze(C,A,D,k,I,I*I,I*I*I,a(t,r),v);else{var o;if(g)o=Ze(C,A,D,k,I,I*I,I*I*I,O,1),o=$e(O);else{if(p)return Ve(A,D,I);o=je(C,A,D,k,I,I*I,I*I*I);}s(t,r,o);}}else if(f)Xe(y[n],y[n+1],I,a(t,r),v);else{var o;if(g)Xe(y[n],y[n+1],I,O,1),o=$e(O);else{if(p)return Ve(y[n],y[n+1],I);o=We(y[n],y[n+1],I);}s(t,r,o);}},B=new xe({target:t._target,life:u,loop:t._loop,delay:t._delay,onframe:z,ondestroy:n});return e&&"spline"!==e&&(B.easing=e),B;}}}function Je(t,e,n,i){0>n&&(t+=n,n=-n),0>i&&(e+=i,i=-i),this.x=t,this.y=e,this.width=n,this.height=i;}function tn(t){for(var e=0;t>=ed;){e|=1&t,t>>=1;}return t+e;}function en(t,e,n,i){var r=e+1;if(r===n)return 1;if(i(t[r++],t[e])<0){for(;n>r&&i(t[r],t[r-1])<0;){r++;}nn(t,e,r);}else for(;n>r&&i(t[r],t[r-1])>=0;){r++;}return r-e;}function nn(t,e,n){for(n--;n>e;){var i=t[e];t[e++]=t[n],t[n--]=i;}}function rn(t,e,n,i,r){for(i===e&&i++;n>i;i++){for(var o,a=t[i],s=e,l=i;l>s;){o=s+l>>>1,r(a,t[o])<0?l=o:s=o+1;}var h=i-s;switch(h){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;h>0;){t[s+h]=t[s+h-1],h--;}}t[s]=a;}}function on(t,e,n,i,r,o){var a=0,s=0,l=1;if(o(t,e[n+r])>0){for(s=i-r;s>l&&o(t,e[n+r+l])>0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),a+=r,l+=r;}else{for(s=r+1;s>l&&o(t,e[n+r-l])<=0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var h=a;a=r-l,l=r-h;}for(a++;l>a;){var u=a+(l-a>>>1);o(t,e[n+u])>0?a=u+1:l=u;}return l;}function an(t,e,n,i,r,o){var a=0,s=0,l=1;if(o(t,e[n+r])<0){for(s=r+1;s>l&&o(t,e[n+r-l])<0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var h=a;a=r-l,l=r-h;}else{for(s=i-r;s>l&&o(t,e[n+r+l])>=0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),a+=r,l+=r;}for(a++;l>a;){var u=a+(l-a>>>1);o(t,e[n+u])<0?l=u:a=u+1;}return l;}function sn(t,e){function n(t,e){l[c]=t,h[c]=e,c+=1;}function i(){for(;c>1;){var t=c-2;if(t>=1&&h[t-1]<=h[t]+h[t+1]||t>=2&&h[t-2]<=h[t]+h[t-1])h[t-1]<h[t+1]&&t--;else if(h[t]>h[t+1])break;o(t);}}function r(){for(;c>1;){var t=c-2;t>0&&h[t-1]<h[t+1]&&t--,o(t);}}function o(n){var i=l[n],r=h[n],o=l[n+1],u=h[n+1];h[n]=r+u,n===c-3&&(l[n+1]=l[n+2],h[n+1]=h[n+2]),c--;var d=an(t[o],t,i,r,0,e);i+=d,r-=d,0!==r&&(u=on(t[i+r-1],t,o,u,u-1,e),0!==u&&(u>=r?a(i,r,o,u):s(i,r,o,u)));}function a(n,i,r,o){var a=0;for(a=0;i>a;a++){d[a]=t[n+a];}var s=0,l=r,h=n;if(t[h++]=t[l++],0!==--o){if(1===i){for(a=0;o>a;a++){t[h+a]=t[l+a];}return void(t[h+o]=d[s]);}for(var c,f,g,p=u;;){c=0,f=0,g=!1;do{if(e(t[l],d[s])<0){if(t[h++]=t[l++],f++,c=0,0===--o){g=!0;break;}}else if(t[h++]=d[s++],c++,f=0,1===--i){g=!0;break;}}while(p>(c|f));if(g)break;do{if(c=an(t[l],d,s,i,0,e),0!==c){for(a=0;c>a;a++){t[h+a]=d[s+a];}if(h+=c,s+=c,i-=c,1>=i){g=!0;break;}}if(t[h++]=t[l++],0===--o){g=!0;break;}if(f=on(d[s],t,l,o,0,e),0!==f){for(a=0;f>a;a++){t[h+a]=t[l+a];}if(h+=f,l+=f,o-=f,0===o){g=!0;break;}}if(t[h++]=d[s++],1===--i){g=!0;break;}p--;}while(c>=nd||f>=nd);if(g)break;0>p&&(p=0),p+=2;}if(u=p,1>u&&(u=1),1===i){for(a=0;o>a;a++){t[h+a]=t[l+a];}t[h+o]=d[s];}else{if(0===i)throw new Error();for(a=0;i>a;a++){t[h+a]=d[s+a];}}}else for(a=0;i>a;a++){t[h+a]=d[s+a];}}function s(n,i,r,o){var a=0;for(a=0;o>a;a++){d[a]=t[r+a];}var s=n+i-1,l=o-1,h=r+o-1,c=0,f=0;if(t[h--]=t[s--],0!==--i){if(1===o){for(h-=i,s-=i,f=h+1,c=s+1,a=i-1;a>=0;a--){t[f+a]=t[c+a];}return void(t[h]=d[l]);}for(var g=u;;){var p=0,v=0,m=!1;do{if(e(d[l],t[s])<0){if(t[h--]=t[s--],p++,v=0,0===--i){m=!0;break;}}else if(t[h--]=d[l--],v++,p=0,1===--o){m=!0;break;}}while(g>(p|v));if(m)break;do{if(p=i-an(d[l],t,n,i,i-1,e),0!==p){for(h-=p,s-=p,i-=p,f=h+1,c=s+1,a=p-1;a>=0;a--){t[f+a]=t[c+a];}if(0===i){m=!0;break;}}if(t[h--]=d[l--],1===--o){m=!0;break;}if(v=o-on(t[s],d,0,o,o-1,e),0!==v){for(h-=v,l-=v,o-=v,f=h+1,c=l+1,a=0;v>a;a++){t[f+a]=d[c+a];}if(1>=o){m=!0;break;}}if(t[h--]=t[s--],0===--i){m=!0;break;}g--;}while(p>=nd||v>=nd);if(m)break;0>g&&(g=0),g+=2;}if(u=g,1>u&&(u=1),1===o){for(h-=i,s-=i,f=h+1,c=s+1,a=i-1;a>=0;a--){t[f+a]=t[c+a];}t[h]=d[l];}else{if(0===o)throw new Error();for(c=h-(o-1),a=0;o>a;a++){t[c+a]=d[a];}}}else for(c=h-(o-1),a=0;o>a;a++){t[c+a]=d[a];}}var l,h,u=nd,c=0,d=[];l=[],h=[],this.mergeRuns=i,this.forceMergeRuns=r,this.pushRun=n;}function ln(t,e,n,i){n||(n=0),i||(i=t.length);var r=i-n;if(!(2>r)){var o=0;if(ed>r)return o=en(t,n,i,e),void rn(t,n,i,n+o,e);var a=new sn(t,e),s=tn(r);do{if(o=en(t,n,i,e),s>o){var l=r;l>s&&(l=s),rn(t,n,n+l,n+o,e),o=l;}a.pushRun(n,o),a.mergeRuns(),r-=o,n+=o;}while(0!==r);a.forceMergeRuns();}}function hn(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel;}function un(t,e,n){var i=null==e.x?0:e.x,r=null==e.x2?1:e.x2,o=null==e.y?0:e.y,a=null==e.y2?0:e.y2;e.global||(i=i*n.width+n.x,r=r*n.width+n.x,o=o*n.height+n.y,a=a*n.height+n.y);var s=t.createLinearGradient(i,o,r,a);return s;}function cn(t,e,n){var i=n.width,r=n.height,o=Math.min(i,r),a=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;e.global||(a=a*i+n.x,s=s*r+n.y,l*=o);var h=t.createRadialGradient(a,s,0,a,s,l);return h;}function dn(){return!1;}function fn(t,e,n){var i=ac(),r=e.getWidth(),o=e.getHeight(),a=i.style;return a.position="absolute",a.left=0,a.top=0,a.width=r+"px",a.height=o+"px",i.width=r*n,i.height=o*n,i.setAttribute("data-zr-dom-id",t),i;}function gn(t){if("string"==typeof t){var e=dd.get(t);return e&&e.image;}return t;}function pn(t,e,n,i,r){if(t){if("string"==typeof t){if(e&&e.__zrImageSrc===t||!n)return e;var o=dd.get(t),a={hostEl:n,cb:i,cbPayload:r};return o?(e=o.image,!mn(e)&&o.pending.push(a)):(!e&&(e=new Image()),e.onload=vn,dd.put(t,e.__cachedImgObj={image:e,pending:[a]}),e.src=e.__zrImageSrc=t),e;}return t;}return e;}function vn(){var t=this.__cachedImgObj;this.onload=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var n=t.pending[e],i=n.cb;i&&i(this,n.cbPayload),n.hostEl.dirty();}t.pending.length=0;}function mn(t){return t&&t.width&&t.height;}function yn(t,e){e=e||md;var n=t+":"+e;if(fd[n])return fd[n];for(var i=(t+"").split("\n"),r=0,o=0,a=i.length;a>o;o++){r=Math.max(kn(i[o],e).width,r);}return gd>pd&&(gd=0,fd={}),gd++,fd[n]=r,r;}function xn(t,e,n,i,r,o,a){return o?wn(t,e,n,i,r,o,a):_n(t,e,n,i,r,a);}function _n(t,e,n,i,r,o){var a=Pn(t,e,r,o),s=yn(t,e);r&&(s+=r[1]+r[3]);var l=a.outerHeight,h=bn(0,s,n),u=Sn(0,l,i),c=new Je(h,u,s,l);return c.lineHeight=a.lineHeight,c;}function wn(t,e,n,i,r,o,a){var s=Ln(t,{rich:o,truncate:a,font:e,textAlign:n,textPadding:r}),l=s.outerWidth,h=s.outerHeight,u=bn(0,l,n),c=Sn(0,h,i);return new Je(u,c,l,h);}function bn(t,e,n){return"right"===n?t-=e:"center"===n&&(t-=e/2),t;}function Sn(t,e,n){return"middle"===n?t-=e/2:"bottom"===n&&(t-=e),t;}function Mn(t,e,n){var i=e.x,r=e.y,o=e.height,a=e.width,s=o/2,l="left",h="top";switch(t){case"left":i-=n,r+=s,l="right",h="middle";break;case"right":i+=n+a,r+=s,h="middle";break;case"top":i+=a/2,r-=n,l="center",h="bottom";break;case"bottom":i+=a/2,r+=o+n,l="center";break;case"inside":i+=a/2,r+=s,l="center",h="middle";break;case"insideLeft":i+=n,r+=s,h="middle";break;case"insideRight":i+=a-n,r+=s,l="right",h="middle";break;case"insideTop":i+=a/2,r+=n,l="center";break;case"insideBottom":i+=a/2,r+=o-n,l="center",h="bottom";break;case"insideTopLeft":i+=n,r+=n;break;case"insideTopRight":i+=a-n,r+=n,l="right";break;case"insideBottomLeft":i+=n,r+=o-n,h="bottom";break;case"insideBottomRight":i+=a-n,r+=o-n,l="right",h="bottom";}return{x:i,y:r,textAlign:l,textVerticalAlign:h};}function Tn(t,e,n,i,r){if(!e)return"";var o=(t+"").split("\n");r=In(e,n,i,r);for(var a=0,s=o.length;s>a;a++){o[a]=Cn(o[a],r);}return o.join("\n");}function In(t,e,n,i){i=a({},i),i.font=e;var n=A(n,"...");i.maxIterations=A(i.maxIterations,2);var r=i.minChar=A(i.minChar,0);i.cnCharWidth=yn("国",e);var o=i.ascCharWidth=yn("a",e);i.placeholder=A(i.placeholder,"");for(var s=t=Math.max(0,t-1),l=0;r>l&&s>=o;l++){s-=o;}var h=yn(n);return h>s&&(n="",h=0),s=t-h,i.ellipsis=n,i.ellipsisWidth=h,i.contentWidth=s,i.containerWidth=t,i;}function Cn(t,e){var n=e.containerWidth,i=e.font,r=e.contentWidth;if(!n)return"";var o=yn(t,i);if(n>=o)return t;for(var a=0;;a++){if(r>=o||a>=e.maxIterations){t+=e.ellipsis;break;}var s=0===a?An(t,r,e.ascCharWidth,e.cnCharWidth):o>0?Math.floor(t.length*r/o):0;t=t.substr(0,s),o=yn(t,i);}return""===t&&(t=e.placeholder),t;}function An(t,e,n,i){for(var r=0,o=0,a=t.length;a>o&&e>r;o++){var s=t.charCodeAt(o);r+=s>=0&&127>=s?n:i;}return o;}function Dn(t){return yn("国",t);}function kn(t,e){return yd.measureText(t,e);}function Pn(t,e,n,i){null!=t&&(t+="");var r=Dn(e),o=t?t.split("\n"):[],a=o.length*r,s=a;if(n&&(s+=n[0]+n[2]),t&&i){var l=i.outerHeight,h=i.outerWidth;if(null!=l&&s>l)t="",o=[];else if(null!=h)for(var u=In(h-(n?n[1]+n[3]:0),e,i.ellipsis,{minChar:i.minChar,placeholder:i.placeholder}),c=0,d=o.length;d>c;c++){o[c]=Cn(o[c],u);}}return{lines:o,height:a,outerHeight:s,lineHeight:r};}function Ln(t,e){var n={lines:[],width:0,height:0};if(null!=t&&(t+=""),!t)return n;for(var i,r=vd.lastIndex=0;null!=(i=vd.exec(t));){var o=i.index;o>r&&On(n,t.substring(r,o)),On(n,i[2],i[1]),r=vd.lastIndex;}r<t.length&&On(n,t.substring(r,t.length));var a=n.lines,s=0,l=0,h=[],u=e.textPadding,c=e.truncate,d=c&&c.outerWidth,f=c&&c.outerHeight;u&&(null!=d&&(d-=u[1]+u[3]),null!=f&&(f-=u[0]+u[2]));for(var g=0;g<a.length;g++){for(var p=a[g],v=0,m=0,y=0;y<p.tokens.length;y++){var x=p.tokens[y],_=x.styleName&&e.rich[x.styleName]||{},w=x.textPadding=_.textPadding,b=x.font=_.font||e.font,S=x.textHeight=A(_.textHeight,Dn(b));if(w&&(S+=w[0]+w[2]),x.height=S,x.lineHeight=D(_.textLineHeight,e.textLineHeight,S),x.textAlign=_&&_.textAlign||e.textAlign,x.textVerticalAlign=_&&_.textVerticalAlign||"middle",null!=f&&s+x.lineHeight>f)return{lines:[],width:0,height:0};x.textWidth=yn(x.text,b);var M=_.textWidth,T=null==M||"auto"===M;if("string"==typeof M&&"%"===M.charAt(M.length-1))x.percentWidth=M,h.push(x),M=0;else{if(T){M=x.textWidth;var I=_.textBackgroundColor,C=I&&I.image;C&&(C=gn(C),mn(C)&&(M=Math.max(M,C.width*S/C.height)));}var k=w?w[1]+w[3]:0;M+=k;var P=null!=d?d-m:null;null!=P&&M>P&&(!T||k>P?(x.text="",x.textWidth=M=0):(x.text=Tn(x.text,P-k,b,c.ellipsis,{minChar:c.minChar}),x.textWidth=yn(x.text,b),M=x.textWidth+k));}m+=x.width=M,_&&(v=Math.max(v,x.lineHeight));}p.width=m,p.lineHeight=v,s+=v,l=Math.max(l,m);}n.outerWidth=n.width=A(e.textWidth,l),n.outerHeight=n.height=A(e.textHeight,s),u&&(n.outerWidth+=u[1]+u[3],n.outerHeight+=u[0]+u[2]);for(var g=0;g<h.length;g++){var x=h[g],L=x.percentWidth;x.width=parseInt(L,10)/100*l;}return n;}function On(t,e,n){for(var i=""===e,r=e.split("\n"),o=t.lines,a=0;a<r.length;a++){var s=r[a],l={styleName:n,text:s,isLineHolder:!s&&!i};if(a)o.push({tokens:[l]});else{var h=(o[o.length-1]||(o[0]={tokens:[]})).tokens,u=h.length;1===u&&h[0].isLineHolder?h[0]=l:(s||!u||i)&&h.push(l);}}}function zn(t){return(t.fontSize||t.fontFamily)&&[t.fontStyle,t.fontWeight,(t.fontSize||12)+"px",t.fontFamily||"sans-serif"].join(" ")||t.textFont||t.font;}function Bn(t,e){var n,i,r,o,a=e.x,s=e.y,l=e.width,h=e.height,u=e.r;0>l&&(a+=l,l=-l),0>h&&(s+=h,h=-h),"number"==typeof u?n=i=r=o=u:u instanceof Array?1===u.length?n=i=r=o=u[0]:2===u.length?(n=r=u[0],i=o=u[1]):3===u.length?(n=u[0],i=o=u[1],r=u[2]):(n=u[0],i=u[1],r=u[2],o=u[3]):n=i=r=o=0;var c;n+i>l&&(c=n+i,n*=l/c,i*=l/c),r+o>l&&(c=r+o,r*=l/c,o*=l/c),i+r>h&&(c=i+r,i*=h/c,r*=h/c),n+o>h&&(c=n+o,n*=h/c,o*=h/c),t.moveTo(a+n,s),t.lineTo(a+l-i,s),0!==i&&t.quadraticCurveTo(a+l,s,a+l,s+i),t.lineTo(a+l,s+h-r),0!==r&&t.quadraticCurveTo(a+l,s+h,a+l-r,s+h),t.lineTo(a+o,s+h),0!==o&&t.quadraticCurveTo(a,s+h,a,s+h-o),t.lineTo(a,s+n),0!==n&&t.quadraticCurveTo(a,s,a+n,s);}function En(t){return Rn(t),f(t.rich,Rn),t;}function Rn(t){if(t){t.font=zn(t);var e=t.textAlign;"middle"===e&&(e="center"),t.textAlign=null==e||xd[e]?e:"left";var n=t.textVerticalAlign||t.textBaseline;"center"===n&&(n="middle"),t.textVerticalAlign=null==n||_d[n]?n:"top";var i=t.textPadding;i&&(t.textPadding=P(t.textPadding));}}function Nn(t,e,n,i,r){i.rich?Gn(t,e,n,i,r):Fn(t,e,n,i,r);}function Fn(t,e,n,i,r){var o=jn(e,"font",i.font||md),a=i.textPadding,s=t.__textCotentBlock;(!s||t.__dirty)&&(s=t.__textCotentBlock=Pn(n,o,a,i.truncate));var l=s.outerHeight,h=s.lines,u=s.lineHeight,c=Zn(l,i,r),d=c.baseX,f=c.baseY,g=c.textAlign,p=c.textVerticalAlign;Wn(e,i,r,d,f);var v=Sn(f,l,p),m=d,y=v,x=Xn(i);if(x||a){var _=yn(n,o),w=_;a&&(w+=a[1]+a[3]);var b=bn(d,w,g);x&&qn(t,e,i,b,v,w,l),a&&(m=Qn(d,g,a),y+=a[0]);}jn(e,"textAlign",g||"left"),jn(e,"textBaseline","middle"),jn(e,"shadowBlur",i.textShadowBlur||0),jn(e,"shadowColor",i.textShadowColor||"transparent"),jn(e,"shadowOffsetX",i.textShadowOffsetX||0),jn(e,"shadowOffsetY",i.textShadowOffsetY||0),y+=u/2;var S=i.textStrokeWidth,M=Un(i.textStroke,S),T=$n(i.textFill);M&&(jn(e,"lineWidth",S),jn(e,"strokeStyle",M)),T&&jn(e,"fillStyle",T);for(var I=0;I<h.length;I++){M&&e.strokeText(h[I],m,y),T&&e.fillText(h[I],m,y),y+=u;}}function Gn(t,e,n,i,r){var o=t.__textCotentBlock;(!o||t.__dirty)&&(o=t.__textCotentBlock=Ln(n,i)),Hn(t,e,o,i,r);}function Hn(t,e,n,i,r){var o=n.width,a=n.outerWidth,s=n.outerHeight,l=i.textPadding,h=Zn(s,i,r),u=h.baseX,c=h.baseY,d=h.textAlign,f=h.textVerticalAlign;Wn(e,i,r,u,c);var g=bn(u,a,d),p=Sn(c,s,f),v=g,m=p;l&&(v+=l[3],m+=l[0]);var y=v+o;Xn(i)&&qn(t,e,i,g,p,a,s);for(var x=0;x<n.lines.length;x++){for(var _,w=n.lines[x],b=w.tokens,S=b.length,M=w.lineHeight,T=w.width,I=0,C=v,A=y,D=S-1;S>I&&(_=b[I],!_.textAlign||"left"===_.textAlign);){Vn(t,e,_,i,M,m,C,"left"),T-=_.width,C+=_.width,I++;}for(;D>=0&&(_=b[D],"right"===_.textAlign);){Vn(t,e,_,i,M,m,A,"right"),T-=_.width,A-=_.width,D--;}for(C+=(o-(C-v)-(y-A)-T)/2;D>=I;){_=b[I],Vn(t,e,_,i,M,m,C+_.width/2,"center"),C+=_.width,I++;}m+=M;}}function Wn(t,e,n,i,r){if(n&&e.textRotation){var o=e.textOrigin;"center"===o?(i=n.width/2+n.x,r=n.height/2+n.y):o&&(i=o[0]+n.x,r=o[1]+n.y),t.translate(i,r),t.rotate(-e.textRotation),t.translate(-i,-r);}}function Vn(t,e,n,i,r,o,a,s){var l=i.rich[n.styleName]||{},h=n.textVerticalAlign,u=o+r/2;"top"===h?u=o+n.height/2:"bottom"===h&&(u=o+r-n.height/2),!n.isLineHolder&&Xn(l)&&qn(t,e,l,"right"===s?a-n.width:"center"===s?a-n.width/2:a,u-n.height/2,n.width,n.height);var c=n.textPadding;c&&(a=Qn(a,s,c),u-=n.height/2-c[2]-n.textHeight/2),jn(e,"shadowBlur",D(l.textShadowBlur,i.textShadowBlur,0)),jn(e,"shadowColor",l.textShadowColor||i.textShadowColor||"transparent"),jn(e,"shadowOffsetX",D(l.textShadowOffsetX,i.textShadowOffsetX,0)),jn(e,"shadowOffsetY",D(l.textShadowOffsetY,i.textShadowOffsetY,0)),jn(e,"textAlign",s),jn(e,"textBaseline","middle"),jn(e,"font",n.font||md);var d=Un(l.textStroke||i.textStroke,g),f=$n(l.textFill||i.textFill),g=A(l.textStrokeWidth,i.textStrokeWidth);d&&(jn(e,"lineWidth",g),jn(e,"strokeStyle",d),e.strokeText(n.text,a,u)),f&&(jn(e,"fillStyle",f),e.fillText(n.text,a,u));}function Xn(t){return t.textBackgroundColor||t.textBorderWidth&&t.textBorderColor;}function qn(t,e,n,i,r,o,a){var s=n.textBackgroundColor,l=n.textBorderWidth,h=n.textBorderColor,u=b(s);if(jn(e,"shadowBlur",n.textBoxShadowBlur||0),jn(e,"shadowColor",n.textBoxShadowColor||"transparent"),jn(e,"shadowOffsetX",n.textBoxShadowOffsetX||0),jn(e,"shadowOffsetY",n.textBoxShadowOffsetY||0),u||l&&h){e.beginPath();var c=n.textBorderRadius;c?Bn(e,{x:i,y:r,width:o,height:a,r:c}):e.rect(i,r,o,a),e.closePath();}if(u)jn(e,"fillStyle",s),e.fill();else if(S(s)){var d=s.image;d=pn(d,null,t,Yn,s),d&&mn(d)&&e.drawImage(d,i,r,o,a);}l&&h&&(jn(e,"lineWidth",l),jn(e,"strokeStyle",h),e.stroke());}function Yn(t,e){e.image=t;}function Zn(t,e,n){var i=e.x||0,r=e.y||0,o=e.textAlign,a=e.textVerticalAlign;if(n){var s=e.textPosition;if(s instanceof Array)i=n.x+Kn(s[0],n.width),r=n.y+Kn(s[1],n.height);else{var l=Mn(s,n,e.textDistance);i=l.x,r=l.y,o=o||l.textAlign,a=a||l.textVerticalAlign;}var h=e.textOffset;h&&(i+=h[0],r+=h[1]);}return{baseX:i,baseY:r,textAlign:o,textVerticalAlign:a};}function jn(t,e,n){return t[e]=n,t[e];}function Un(t,e){return null==t||0>=e||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t;}function $n(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t;}function Kn(t,e){return"string"==typeof t?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t;}function Qn(t,e,n){return"right"===e?t-n[1]:"center"===e?t+n[3]/2-n[1]/2:t+n[3];}function Jn(t,e){return null!=t&&(t||e.textBackgroundColor||e.textBorderWidth&&e.textBorderColor||e.textPadding);}function ti(t){t=t||{},$c.call(this,t);for(var e in t){t.hasOwnProperty(e)&&"style"!==e&&(this[e]=t[e]);}this.style=new od(t.style,this),this._rect=null,this.__clipPaths=[];}function ei(t){ti.call(this,t);}function ni(t){return parseInt(t,10);}function ii(t){return t?t.__builtin__?!0:"function"!=typeof t.resize||"function"!=typeof t.refresh?!1:!0:!1;}function ri(t){t.__unusedCount++;}function oi(t){1==t.__unusedCount&&t.clear();}function ai(t,e,n){return Md.copy(t.getBoundingRect()),t.transform&&Md.applyTransform(t.transform),Td.width=e,Td.height=n,!Md.intersect(Td);}function si(t,e){if(t==e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var n=0;n<t.length;n++){if(t[n]!==e[n])return!0;}}function li(t,e){for(var n=0;n<t.length;n++){var i=t[n];i.setTransform(e),e.beginPath(),i.buildPath(e,i.shape),e.clip(),i.restoreTransform(e);}}function hi(t,e){var n=document.createElement("div");return n.style.cssText=["position:relative","overflow:hidden","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",n;}function ui(t){return t.getBoundingClientRect?t.getBoundingClientRect():{left:0,top:0};}function ci(t,e,n,i){return n=n||{},i||!Uu.canvasSupported?di(t,e,n):Uu.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(n.zrX=e.layerX,n.zrY=e.layerY):null!=e.offsetX?(n.zrX=e.offsetX,n.zrY=e.offsetY):di(t,e,n),n;}function di(t,e,n){var i=ui(t);n.zrX=e.clientX-i.left,n.zrY=e.clientY-i.top;}function fi(t,e,n){if(e=e||window.event,null!=e.zrX)return e;var i=e.type,r=i&&i.indexOf("touch")>=0;if(r){var o="touchend"!=i?e.targetTouches[0]:e.changedTouches[0];o&&ci(t,o,e,n);}else ci(t,e,e,n),e.zrDelta=e.wheelDelta?e.wheelDelta/120:-(e.detail||0)/3;var a=e.button;return null==e.which&&void 0!==a&&Ad.test(e.type)&&(e.which=1&a?1:2&a?3:4&a?2:0),e;}function gi(t,e,n){Cd?t.addEventListener(e,n):t.attachEvent("on"+e,n);}function pi(t,e,n){Cd?t.removeEventListener(e,n):t.detachEvent("on"+e,n);}function vi(t){var e=t[1][0]-t[0][0],n=t[1][1]-t[0][1];return Math.sqrt(e*e+n*n);}function mi(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2];}function yi(t){return"mousewheel"===t&&Uu.browser.firefox?"DOMMouseScroll":t;}function xi(t,e,n){var i=t._gestureMgr;"start"===n&&i.clear();var r=i.recognize(e,t.handler.findHover(e.zrX,e.zrY,null).target,t.dom);if("end"===n&&i.clear(),r){var o=r.type;e.gestureEvent=o,t.handler.dispatchToElement({target:r.target},o,r.event);}}function _i(t){t._touching=!0,clearTimeout(t._touchTimer),t._touchTimer=setTimeout(function(){t._touching=!1;},700);}function wi(t){var e=t.pointerType;return"pen"===e||"touch"===e;}function bi(t){function e(t,e){return function(){return e._touching?void 0:t.apply(e,arguments);};}f(Bd,function(e){t._handlers[e]=y(Nd[e],t);}),f(Rd,function(e){t._handlers[e]=y(Nd[e],t);}),f(zd,function(n){t._handlers[n]=e(Nd[n],t);});}function Si(t){function e(e,n){f(e,function(e){gi(t,yi(e),n._handlers[e]);},n);}xc.call(this),this.dom=t,this._touching=!1,this._touchTimer,this._gestureMgr=new Pd(),this._handlers={},bi(this),Uu.pointerEventsSupported?e(Rd,this):(Uu.touchEventsSupported&&e(Bd,this),e(zd,this));}function Mi(t,e){var n=new Xd(Zu(),t,e);return Wd[n.id]=n,n;}function Ti(t){if(t)t.dispose();else{for(var e in Wd){Wd.hasOwnProperty(e)&&Wd[e].dispose();}Wd={};}return this;}function Ii(t){return Wd[t];}function Ci(t,e){Hd[t]=e;}function Ai(t){delete Wd[t];}function Di(t){return t.replace(/^\s+/,"").replace(/\s+$/,"");}function ki(t,e,n,i){var r=e[1]-e[0],o=n[1]-n[0];if(0===r)return 0===o?n[0]:(n[0]+n[1])/2;if(i){if(r>0){if(t<=e[0])return n[0];if(t>=e[1])return n[1];}else{if(t>=e[0])return n[0];if(t<=e[1])return n[1];}}else{if(t===e[0])return n[0];if(t===e[1])return n[1];}return(t-e[0])/r*o+n[0];}function Pi(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%";}return"string"==typeof t?Di(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?0/0:+t;}function Li(t,e,n){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),n?t:+t;}function Oi(t){return t.sort(function(t,e){return t-e;}),t;}function zi(t){if(t=+t,isNaN(t))return 0;for(var e=1,n=0;Math.round(t*e)/e!==t;){e*=10,n++;}return n;}function Bi(t){var e=t.toString(),n=e.indexOf("e");if(n>0){var i=+e.slice(n+1);return 0>i?-i:0;}var r=e.indexOf(".");return 0>r?0:e.length-1-r;}function Ei(t,e){var n=Math.log,i=Math.LN10,r=Math.floor(n(t[1]-t[0])/i),o=Math.round(n(Math.abs(e[1]-e[0]))/i),a=Math.min(Math.max(-r+o,0),20);return isFinite(a)?a:20;}function Ri(t,e,n){if(!t[e])return 0;var i=p(t,function(t,e){return t+(isNaN(e)?0:e);},0);if(0===i)return 0;for(var r=Math.pow(10,n),o=g(t,function(t){return(isNaN(t)?0:t)/i*r*100;}),a=100*r,s=g(o,function(t){return Math.floor(t);}),l=p(s,function(t,e){return t+e;},0),h=g(o,function(t,e){return t-s[e];});a>l;){for(var u=Number.NEGATIVE_INFINITY,c=null,d=0,f=h.length;f>d;++d){h[d]>u&&(u=h[d],c=d);}++s[c],h[c]=0,++l;}return s[e]/r;}function Ni(t){var e=2*Math.PI;return(t%e+e)%e;}function Fi(t){return t>-Yd&&Yd>t;}function Gi(t){if(t instanceof Date)return t;if("string"==typeof t){var e=jd.exec(t);if(!e)return new Date(0/0);if(e[8]){var n=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(n-=e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,n,+(e[5]||0),+e[6]||0,+e[7]||0));}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0);}return new Date(null==t?0/0:Math.round(t));}function Hi(t){return Math.pow(10,Wi(t));}function Wi(t){return Math.floor(Math.log(t)/Math.LN10);}function Vi(t,e){var n,i=Wi(t),r=Math.pow(10,i),o=t/r;return n=e?1.5>o?1:2.5>o?2:4>o?3:7>o?5:10:1>o?1:2>o?2:3>o?3:5>o?5:10,t=n*r,i>=-20?+t.toFixed(0>i?-i:0):t;}function Xi(t){function e(t,n,i){return t.interval[i]<n.interval[i]||t.interval[i]===n.interval[i]&&(t.close[i]-n.close[i]===(i?-1:1)||!i&&e(t,n,1));}t.sort(function(t,n){return e(t,n,0)?-1:1;});for(var n=-1/0,i=1,r=0;r<t.length;){for(var o=t[r].interval,a=t[r].close,s=0;2>s;s++){o[s]<=n&&(o[s]=n,a[s]=s?1:1-i),n=o[s],i=a[s];}o[0]===o[1]&&a[0]*a[1]!==1?t.splice(r,1):r++;}return t;}function qi(t){return t-parseFloat(t)>=0;}function Yi(t){return isNaN(t)?"-":(t=(t+"").split("."),t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(t.length>1?"."+t[1]:""));}function Zi(t,e){return t=(t||"").toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase();}),e&&t&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t;}function ji(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}function Ui(t,e,n){_(e)||(e=[e]);var i=e.length;if(!i)return"";for(var r=e[0].$vars||[],o=0;o<r.length;o++){var a=Kd[o],s=Qd(a,0);t=t.replace(Qd(a),n?ji(s):s);}for(var l=0;i>l;l++){for(var h=0;h<r.length;h++){var s=e[l][r[h]];t=t.replace(Qd(Kd[h],l),n?ji(s):s);}}return t;}function $i(t,e,n){return f(e,function(e,i){t=t.replace("{"+i+"}",n?ji(e):e);}),t;}function Ki(t,e){return t?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+ji(t)+";"+(e||"")+'"></span>':"";}function Qi(t,e,n){("week"===t||"month"===t||"quarter"===t||"half-year"===t||"year"===t)&&(t="MM-dd\nyyyy");var i=Gi(e),r=n?"UTC":"",o=i["get"+r+"FullYear"](),a=i["get"+r+"Month"]()+1,s=i["get"+r+"Date"](),l=i["get"+r+"Hours"](),h=i["get"+r+"Minutes"](),u=i["get"+r+"Seconds"]();return t=t.replace("MM",Jd(a)).replace("M",a).replace("yyyy",o).replace("yy",o%100).replace("dd",Jd(s)).replace("d",s).replace("hh",Jd(l)).replace("h",l).replace("mm",Jd(h)).replace("m",h).replace("ss",Jd(u)).replace("s",u);}function Ji(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t;}function tr(t,e,n){return t[af+e]=n;}function er(t,e){return t[af+e];}function nr(t,e){return t.hasOwnProperty(af+e);}function ir(t){var e={main:"",sub:""};return t&&(t=t.split(rf),e.main=t[0]||"",e.sub=t[1]||""),e;}function rr(t){L(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal');}function or(t){t.$constructor=t,t.extend=function(t){var e=this,n=function n(){t.$constructor?t.$constructor.apply(this,arguments):e.apply(this,arguments);};return a(n.prototype,t),n.extend=this.extend,n.superCall=ar,n.superApply=sr,u(n,this),n.superClass=e,n;};}function ar(t,e){var n=k(arguments,2);return this.superClass.prototype[e].apply(t,n);}function sr(t,e,n){return this.superClass.prototype[e].apply(t,n);}function lr(t,e){function n(t){var e=i[t.main];return e&&e[of]||(e=i[t.main]={},e[of]=!0),e;}e=e||{};var i={};if(t.registerClass=function(t,e){if(e)if(rr(e),e=ir(e),e.sub){if(e.sub!==of){var r=n(e);r[e.sub]=t;}}else i[e.main]=t;return t;},t.getClass=function(t,e,n){var r=i[t];if(r&&r[of]&&(r=e?r[e]:null),n&&!r)throw new Error(e?"Component "+t+"."+(e||"")+" not exists. Load it first.":t+".type should be specified.");return r;},t.getClassesByMainType=function(t){t=ir(t);var e=[],n=i[t.main];return n&&n[of]?f(n,function(t,n){n!==of&&e.push(t);}):e.push(n),e;},t.hasClass=function(t){return t=ir(t),!!i[t.main];},t.getAllClassMainTypes=function(){var t=[];return f(i,function(e,n){t.push(n);}),t;},t.hasSubTypes=function(t){t=ir(t);var e=i[t.main];return e&&e[of];},t.parseClassType=ir,e.registerWhenExtend){var r=t.extend;r&&(t.extend=function(e){var n=r.call(this,e);return t.registerClass(n,e.type);});}return t;}function hr(t){return t>-gf&&gf>t;}function ur(t){return t>gf||-gf>t;}function cr(t,e,n,i,r){var o=1-r;return o*o*(o*t+3*r*e)+r*r*(r*i+3*o*n);}function dr(t,e,n,i,r){var o=1-r;return 3*(((e-t)*o+2*(n-e)*r)*o+(i-n)*r*r);}function fr(t,e,n,i,r,o){var a=i+3*(e-n)-t,s=3*(n-2*e+t),l=3*(e-t),h=t-r,u=s*s-3*a*l,c=s*l-9*a*h,d=l*l-3*s*h,f=0;if(hr(u)&&hr(c)){if(hr(s))o[0]=0;else{var g=-l/s;g>=0&&1>=g&&(o[f++]=g);}}else{var p=c*c-4*u*d;if(hr(p)){var v=c/u,g=-s/a+v,m=-v/2;g>=0&&1>=g&&(o[f++]=g),m>=0&&1>=m&&(o[f++]=m);}else if(p>0){var y=ff(p),x=u*s+1.5*a*(-c+y),_=u*s+1.5*a*(-c-y);x=0>x?-df(-x,mf):df(x,mf),_=0>_?-df(-_,mf):df(_,mf);var g=(-s-(x+_))/(3*a);g>=0&&1>=g&&(o[f++]=g);}else{var w=(2*u*s-3*a*c)/(2*ff(u*u*u)),b=Math.acos(w)/3,S=ff(u),M=Math.cos(b),g=(-s-2*S*M)/(3*a),m=(-s+S*(M+vf*Math.sin(b)))/(3*a),T=(-s+S*(M-vf*Math.sin(b)))/(3*a);g>=0&&1>=g&&(o[f++]=g),m>=0&&1>=m&&(o[f++]=m),T>=0&&1>=T&&(o[f++]=T);}}return f;}function gr(t,e,n,i,r){var o=6*n-12*e+6*t,a=9*e+3*i-3*t-9*n,s=3*e-3*t,l=0;if(hr(a)){if(ur(o)){var h=-s/o;h>=0&&1>=h&&(r[l++]=h);}}else{var u=o*o-4*a*s;if(hr(u))r[0]=-o/(2*a);else if(u>0){var c=ff(u),h=(-o+c)/(2*a),d=(-o-c)/(2*a);h>=0&&1>=h&&(r[l++]=h),d>=0&&1>=d&&(r[l++]=d);}}return l;}function pr(t,e,n,i,r,o){var a=(e-t)*r+t,s=(n-e)*r+e,l=(i-n)*r+n,h=(s-a)*r+a,u=(l-s)*r+s,c=(u-h)*r+h;o[0]=t,o[1]=a,o[2]=h,o[3]=c,o[4]=c,o[5]=u,o[6]=l,o[7]=i;}function vr(t,e,n,i,r,o,a,s,l,h,u){var c,d,f,g,p,v=.005,m=1/0;yf[0]=l,yf[1]=h;for(var y=0;1>y;y+=.05){xf[0]=cr(t,n,r,a,y),xf[1]=cr(e,i,o,s,y),g=vc(yf,xf),m>g&&(c=y,m=g);}m=1/0;for(var x=0;32>x&&!(pf>v);x++){d=c-v,f=c+v,xf[0]=cr(t,n,r,a,d),xf[1]=cr(e,i,o,s,d),g=vc(xf,yf),d>=0&&m>g?(c=d,m=g):(_f[0]=cr(t,n,r,a,f),_f[1]=cr(e,i,o,s,f),p=vc(_f,yf),1>=f&&m>p?(c=f,m=p):v*=.5);}return u&&(u[0]=cr(t,n,r,a,c),u[1]=cr(e,i,o,s,c)),ff(m);}function mr(t,e,n,i){var r=1-i;return r*(r*t+2*i*e)+i*i*n;}function yr(t,e,n,i){return 2*((1-i)*(e-t)+i*(n-e));}function xr(t,e,n,i,r){var o=t-2*e+n,a=2*(e-t),s=t-i,l=0;if(hr(o)){if(ur(a)){var h=-s/a;h>=0&&1>=h&&(r[l++]=h);}}else{var u=a*a-4*o*s;if(hr(u)){var h=-a/(2*o);h>=0&&1>=h&&(r[l++]=h);}else if(u>0){var c=ff(u),h=(-a+c)/(2*o),d=(-a-c)/(2*o);h>=0&&1>=h&&(r[l++]=h),d>=0&&1>=d&&(r[l++]=d);}}return l;}function _r(t,e,n){var i=t+n-2*e;return 0===i?.5:(t-e)/i;}function wr(t,e,n,i,r){var o=(e-t)*i+t,a=(n-e)*i+e,s=(a-o)*i+o;r[0]=t,r[1]=o,r[2]=s,r[3]=s,r[4]=a,r[5]=n;}function br(t,e,n,i,r,o,a,s,l){var h,u=.005,c=1/0;yf[0]=a,yf[1]=s;for(var d=0;1>d;d+=.05){xf[0]=mr(t,n,r,d),xf[1]=mr(e,i,o,d);var f=vc(yf,xf);c>f&&(h=d,c=f);}c=1/0;for(var g=0;32>g&&!(pf>u);g++){var p=h-u,v=h+u;xf[0]=mr(t,n,r,p),xf[1]=mr(e,i,o,p);var f=vc(xf,yf);if(p>=0&&c>f)h=p,c=f;else{_f[0]=mr(t,n,r,v),_f[1]=mr(e,i,o,v);var m=vc(_f,yf);1>=v&&c>m?(h=v,c=m):u*=.5;}}return l&&(l[0]=mr(t,n,r,h),l[1]=mr(e,i,o,h)),ff(c);}function Sr(t,e,n){if(0!==t.length){var i,r=t[0],o=r[0],a=r[0],s=r[1],l=r[1];for(i=1;i<t.length;i++){r=t[i],o=wf(o,r[0]),a=bf(a,r[0]),s=wf(s,r[1]),l=bf(l,r[1]);}e[0]=o,e[1]=s,n[0]=a,n[1]=l;}}function Mr(t,e,n,i,r,o){r[0]=wf(t,n),r[1]=wf(e,i),o[0]=bf(t,n),o[1]=bf(e,i);}function Tr(t,e,n,i,r,o,a,s,l,h){var u,c=gr,d=cr,f=c(t,n,r,a,Df);for(l[0]=1/0,l[1]=1/0,h[0]=-1/0,h[1]=-1/0,u=0;f>u;u++){var g=d(t,n,r,a,Df[u]);l[0]=wf(g,l[0]),h[0]=bf(g,h[0]);}for(f=c(e,i,o,s,kf),u=0;f>u;u++){var p=d(e,i,o,s,kf[u]);l[1]=wf(p,l[1]),h[1]=bf(p,h[1]);}l[0]=wf(t,l[0]),h[0]=bf(t,h[0]),l[0]=wf(a,l[0]),h[0]=bf(a,h[0]),l[1]=wf(e,l[1]),h[1]=bf(e,h[1]),l[1]=wf(s,l[1]),h[1]=bf(s,h[1]);}function Ir(t,e,n,i,r,o,a,s){var l=_r,h=mr,u=bf(wf(l(t,n,r),1),0),c=bf(wf(l(e,i,o),1),0),d=h(t,n,r,u),f=h(e,i,o,c);a[0]=wf(t,r,d),a[1]=wf(e,o,f),s[0]=bf(t,r,d),s[1]=bf(e,o,f);}function Cr(t,e,n,i,r,o,a,s,l){var h=ie,u=re,c=Math.abs(r-o);if(1e-4>c%Tf&&c>1e-4)return s[0]=t-n,s[1]=e-i,l[0]=t+n,void(l[1]=e+i);if(If[0]=Mf(r)*n+t,If[1]=Sf(r)*i+e,Cf[0]=Mf(o)*n+t,Cf[1]=Sf(o)*i+e,h(s,If,Cf),u(l,If,Cf),r%=Tf,0>r&&(r+=Tf),o%=Tf,0>o&&(o+=Tf),r>o&&!a?o+=Tf:o>r&&a&&(r+=Tf),a){var d=o;o=r,r=d;}for(var f=0;o>f;f+=Math.PI/2){f>r&&(Af[0]=Mf(f)*n+t,Af[1]=Sf(f)*i+e,h(s,Af,s),u(l,Af,l));}}function Ar(t,e,n,i,r,o,a){if(0===r)return!1;var s=r,l=0,h=t;if(a>e+s&&a>i+s||e-s>a&&i-s>a||o>t+s&&o>n+s||t-s>o&&n-s>o)return!1;if(t===n)return Math.abs(o-t)<=s/2;l=(e-i)/(t-n),h=(t*i-n*e)/(t-n);var u=l*o-a+h,c=u*u/(l*l+1);return s/2*s/2>=c;}function Dr(t,e,n,i,r,o,a,s,l,h,u){if(0===l)return!1;var c=l;if(u>e+c&&u>i+c&&u>o+c&&u>s+c||e-c>u&&i-c>u&&o-c>u&&s-c>u||h>t+c&&h>n+c&&h>r+c&&h>a+c||t-c>h&&n-c>h&&r-c>h&&a-c>h)return!1;var d=vr(t,e,n,i,r,o,a,s,h,u,null);return c/2>=d;}function kr(t,e,n,i,r,o,a,s,l){if(0===a)return!1;var h=a;if(l>e+h&&l>i+h&&l>o+h||e-h>l&&i-h>l&&o-h>l||s>t+h&&s>n+h&&s>r+h||t-h>s&&n-h>s&&r-h>s)return!1;var u=br(t,e,n,i,r,o,s,l,null);return h/2>=u;}function Pr(t){return t%=Xf,0>t&&(t+=Xf),t;}function Lr(t,e,n,i,r,o,a,s,l){if(0===a)return!1;var h=a;s-=t,l-=e;var u=Math.sqrt(s*s+l*l);if(u-h>n||n>u+h)return!1;if(Math.abs(i-r)%qf<1e-4)return!0;if(o){var c=i;i=Pr(r),r=Pr(c);}else i=Pr(i),r=Pr(r);i>r&&(r+=qf);var d=Math.atan2(l,s);return 0>d&&(d+=qf),d>=i&&r>=d||d+qf>=i&&r>=d+qf;}function Or(t,e,n,i,r,o){if(o>e&&o>i||e>o&&i>o)return 0;if(i===e)return 0;var a=e>i?1:-1,s=(o-e)/(i-e);(1===s||0===s)&&(a=e>i?.5:-.5);var l=s*(n-t)+t;return l>r?a:0;}function zr(t,e){return Math.abs(t-e)<jf;}function Br(){var t=$f[0];$f[0]=$f[1],$f[1]=t;}function Er(t,e,n,i,r,o,a,s,l,h){if(h>e&&h>i&&h>o&&h>s||e>h&&i>h&&o>h&&s>h)return 0;var u=fr(e,i,o,s,h,Uf);if(0===u)return 0;for(var c,d,f=0,g=-1,p=0;u>p;p++){var v=Uf[p],m=0===v||1===v?.5:1,y=cr(t,n,r,a,v);l>y||(0>g&&(g=gr(e,i,o,s,$f),$f[1]<$f[0]&&g>1&&Br(),c=cr(e,i,o,s,$f[0]),g>1&&(d=cr(e,i,o,s,$f[1]))),f+=2==g?v<$f[0]?e>c?m:-m:v<$f[1]?c>d?m:-m:d>s?m:-m:v<$f[0]?e>c?m:-m:c>s?m:-m);}return f;}function Rr(t,e,n,i,r,o,a,s){if(s>e&&s>i&&s>o||e>s&&i>s&&o>s)return 0;var l=xr(e,i,o,s,Uf);if(0===l)return 0;var h=_r(e,i,o);if(h>=0&&1>=h){for(var u=0,c=mr(e,i,o,h),d=0;l>d;d++){var f=0===Uf[d]||1===Uf[d]?.5:1,g=mr(t,n,r,Uf[d]);a>g||(u+=Uf[d]<h?e>c?f:-f:c>o?f:-f);}return u;}var f=0===Uf[0]||1===Uf[0]?.5:1,g=mr(t,n,r,Uf[0]);return a>g?0:e>o?f:-f;}function Nr(t,e,n,i,r,o,a,s){if(s-=e,s>n||-n>s)return 0;var l=Math.sqrt(n*n-s*s);Uf[0]=-l,Uf[1]=l;var h=Math.abs(i-r);if(1e-4>h)return 0;if(1e-4>h%Zf){i=0,r=Zf;var u=o?1:-1;return a>=Uf[0]+t&&a<=Uf[1]+t?u:0;}if(o){var l=i;i=Pr(r),r=Pr(l);}else i=Pr(i),r=Pr(r);i>r&&(r+=Zf);for(var c=0,d=0;2>d;d++){var f=Uf[d];if(f+t>a){var g=Math.atan2(s,f),u=o?1:-1;0>g&&(g=Zf+g),(g>=i&&r>=g||g+Zf>=i&&r>=g+Zf)&&(g>Math.PI/2&&g<1.5*Math.PI&&(u=-u),c+=u);}}return c;}function Fr(t,e,n,i,r){for(var o=0,a=0,s=0,l=0,h=0,u=0;u<t.length;){var c=t[u++];switch(c===Yf.M&&u>1&&(n||(o+=Or(a,s,l,h,i,r))),1==u&&(a=t[u],s=t[u+1],l=a,h=s),c){case Yf.M:l=t[u++],h=t[u++],a=l,s=h;break;case Yf.L:if(n){if(Ar(a,s,t[u],t[u+1],e,i,r))return!0;}else o+=Or(a,s,t[u],t[u+1],i,r)||0;a=t[u++],s=t[u++];break;case Yf.C:if(n){if(Dr(a,s,t[u++],t[u++],t[u++],t[u++],t[u],t[u+1],e,i,r))return!0;}else o+=Er(a,s,t[u++],t[u++],t[u++],t[u++],t[u],t[u+1],i,r)||0;a=t[u++],s=t[u++];break;case Yf.Q:if(n){if(kr(a,s,t[u++],t[u++],t[u],t[u+1],e,i,r))return!0;}else o+=Rr(a,s,t[u++],t[u++],t[u],t[u+1],i,r)||0;a=t[u++],s=t[u++];break;case Yf.A:var d=t[u++],f=t[u++],g=t[u++],p=t[u++],v=t[u++],m=t[u++],y=(t[u++],1-t[u++]),x=Math.cos(v)*g+d,_=Math.sin(v)*p+f;u>1?o+=Or(a,s,x,_,i,r):(l=x,h=_);var w=(i-d)*p/g+d;if(n){if(Lr(d,f,p,v,v+m,y,e,w,r))return!0;}else o+=Nr(d,f,p,v,v+m,y,w,r);a=Math.cos(v+m)*g+d,s=Math.sin(v+m)*p+f;break;case Yf.R:l=a=t[u++],h=s=t[u++];var b=t[u++],S=t[u++],x=l+b,_=h+S;if(n){if(Ar(l,h,x,h,e,i,r)||Ar(x,h,x,_,e,i,r)||Ar(x,_,l,_,e,i,r)||Ar(l,_,l,h,e,i,r))return!0;}else o+=Or(x,h,x,_,i,r),o+=Or(l,_,l,h,i,r);break;case Yf.Z:if(n){if(Ar(a,s,l,h,e,i,r))return!0;}else o+=Or(a,s,l,h,i,r);a=l,s=h;}}return n||zr(s,h)||(o+=Or(a,s,l,h,i,r)||0),0!==o;}function Gr(t,e,n){return Fr(t,0,!1,e,n);}function Hr(t,e,n,i){return Fr(t,e,!0,n,i);}function Wr(t){ti.call(this,t),this.path=null;}function Vr(t,e,n,i,r,o,a,s,l,h,u){var c=l*(hg/180),d=lg(c)*(t-n)/2+sg(c)*(e-i)/2,f=-1*sg(c)*(t-n)/2+lg(c)*(e-i)/2,g=d*d/(a*a)+f*f/(s*s);g>1&&(a*=ag(g),s*=ag(g));var p=(r===o?-1:1)*ag((a*a*s*s-a*a*f*f-s*s*d*d)/(a*a*f*f+s*s*d*d))||0,v=p*a*f/s,m=p*-s*d/a,y=(t+n)/2+lg(c)*v-sg(c)*m,x=(e+i)/2+sg(c)*v+lg(c)*m,_=dg([1,0],[(d-v)/a,(f-m)/s]),w=[(d-v)/a,(f-m)/s],b=[(-1*d-v)/a,(-1*f-m)/s],S=dg(w,b);cg(w,b)<=-1&&(S=hg),cg(w,b)>=1&&(S=0),0===o&&S>0&&(S-=2*hg),1===o&&0>S&&(S+=2*hg),u.addData(h,y,x,a,s,_,S,c,o);}function Xr(t){if(!t)return[];var e,n=t.replace(/-/g," -").replace(/  /g," ").replace(/ /g,",").replace(/,,/g,",");for(e=0;e<og.length;e++){n=n.replace(new RegExp(og[e],"g"),"|"+og[e]);}var i,r=n.split("|"),o=0,a=0,s=new Vf(),l=Vf.CMD;for(e=1;e<r.length;e++){var h,u=r[e],c=u.charAt(0),d=0,f=u.slice(1).replace(/e,-/g,"e-").split(",");f.length>0&&""===f[0]&&f.shift();for(var g=0;g<f.length;g++){f[g]=parseFloat(f[g]);}for(;d<f.length&&!isNaN(f[d])&&!isNaN(f[0]);){var p,v,m,y,x,_,w,b=o,S=a;switch(c){case"l":o+=f[d++],a+=f[d++],h=l.L,s.addData(h,o,a);break;case"L":o=f[d++],a=f[d++],h=l.L,s.addData(h,o,a);break;case"m":o+=f[d++],a+=f[d++],h=l.M,s.addData(h,o,a),c="l";break;case"M":o=f[d++],a=f[d++],h=l.M,s.addData(h,o,a),c="L";break;case"h":o+=f[d++],h=l.L,s.addData(h,o,a);break;case"H":o=f[d++],h=l.L,s.addData(h,o,a);break;case"v":a+=f[d++],h=l.L,s.addData(h,o,a);break;case"V":a=f[d++],h=l.L,s.addData(h,o,a);break;case"C":h=l.C,s.addData(h,f[d++],f[d++],f[d++],f[d++],f[d++],f[d++]),o=f[d-2],a=f[d-1];break;case"c":h=l.C,s.addData(h,f[d++]+o,f[d++]+a,f[d++]+o,f[d++]+a,f[d++]+o,f[d++]+a),o+=f[d-2],a+=f[d-1];break;case"S":p=o,v=a;var M=s.len(),T=s.data;i===l.C&&(p+=o-T[M-4],v+=a-T[M-3]),h=l.C,b=f[d++],S=f[d++],o=f[d++],a=f[d++],s.addData(h,p,v,b,S,o,a);break;case"s":p=o,v=a;var M=s.len(),T=s.data;i===l.C&&(p+=o-T[M-4],v+=a-T[M-3]),h=l.C,b=o+f[d++],S=a+f[d++],o+=f[d++],a+=f[d++],s.addData(h,p,v,b,S,o,a);break;case"Q":b=f[d++],S=f[d++],o=f[d++],a=f[d++],h=l.Q,s.addData(h,b,S,o,a);break;case"q":b=f[d++]+o,S=f[d++]+a,o+=f[d++],a+=f[d++],h=l.Q,s.addData(h,b,S,o,a);break;case"T":p=o,v=a;var M=s.len(),T=s.data;i===l.Q&&(p+=o-T[M-4],v+=a-T[M-3]),o=f[d++],a=f[d++],h=l.Q,s.addData(h,p,v,o,a);break;case"t":p=o,v=a;var M=s.len(),T=s.data;i===l.Q&&(p+=o-T[M-4],v+=a-T[M-3]),o+=f[d++],a+=f[d++],h=l.Q,s.addData(h,p,v,o,a);break;case"A":m=f[d++],y=f[d++],x=f[d++],_=f[d++],w=f[d++],b=o,S=a,o=f[d++],a=f[d++],h=l.A,Vr(b,S,o,a,_,w,m,y,x,h,s);break;case"a":m=f[d++],y=f[d++],x=f[d++],_=f[d++],w=f[d++],b=o,S=a,o+=f[d++],a+=f[d++],h=l.A,Vr(b,S,o,a,_,w,m,y,x,h,s);}}("z"===c||"Z"===c)&&(h=l.Z,s.addData(h)),i=h;}return s.toStatic(),s;}function qr(t,e){var n=Xr(t);return e=e||{},e.buildPath=function(t){if(t.setData){t.setData(n.data);var e=t.getContext();e&&t.rebuildPath(e);}else{var e=t;n.rebuildPath(e);}},e.applyTransform=function(t){rg(n,t),this.dirty(!0);},e;}function Yr(t,e){return new Wr(qr(t,e));}function Zr(t,e){return Wr.extend(qr(t,e));}function jr(t,e){for(var n=[],i=t.length,r=0;i>r;r++){var o=t[r];o.path||o.createPathProxy(),o.__dirtyPath&&o.buildPath(o.path,o.shape,!0),n.push(o.path);}var a=new Wr(e);return a.createPathProxy(),a.buildPath=function(t){t.appendPath(n);var e=t.getContext();e&&t.rebuildPath(e);},a;}function Ur(t,e,n,i,r,o,a){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*a+(-3*(e-n)-2*s-l)*o+s*r+e;}function $r(t,e,n){var i=e.points,r=e.smooth;if(i&&i.length>=2){if(r&&"spline"!==r){var o=_g(i,r,n,e.smoothConstraint);t.moveTo(i[0][0],i[0][1]);for(var a=i.length,s=0;(n?a:a-1)>s;s++){var l=o[2*s],h=o[2*s+1],u=i[(s+1)%a];t.bezierCurveTo(l[0],l[1],h[0],h[1],u[0],u[1]);}}else{"spline"===r&&(i=xg(i,n)),t.moveTo(i[0][0],i[0][1]);for(var s=1,c=i.length;c>s;s++){t.lineTo(i[s][0],i[s][1]);}}n&&t.closePath();}}function Kr(t,e,n){var i=t.cpx2,r=t.cpy2;return null===i||null===r?[(n?dr:cr)(t.x1,t.cpx1,t.cpx2,t.x2,e),(n?dr:cr)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(n?yr:mr)(t.x1,t.cpx1,t.x2,e),(n?yr:mr)(t.y1,t.cpy1,t.y2,e)];}function Qr(t){return Wr.extend(t);}function Jr(t,e){return Zr(t,e);}function to(t,e,n,i){var r=Yr(t,e),o=r.getBoundingRect();return n&&("center"===i&&(n=no(n,o)),io(r,n)),r;}function eo(t,e,n){var i=new ei({style:{image:t,x:e.x,y:e.y,width:e.width,height:e.height},onload:function onload(t){if("center"===n){var r={width:t.width,height:t.height};i.setStyle(no(e,r));}}});return i;}function no(t,e){var n,i=e.width/e.height,r=t.height*i;r<=t.width?n=t.height:(r=t.width,n=r/i);var o=t.x+t.width/2,a=t.y+t.height/2;return{x:o-r/2,y:a-n/2,width:r,height:n};}function io(t,e){if(t.applyTransform){var n=t.getBoundingRect(),i=n.calculateTransform(e);t.applyTransform(i);}}function ro(t){var e=t.shape,n=t.style.lineWidth;return Lg(2*e.x1)===Lg(2*e.x2)&&(e.x1=e.x2=ao(e.x1,n,!0)),Lg(2*e.y1)===Lg(2*e.y2)&&(e.y1=e.y2=ao(e.y1,n,!0)),t;}function oo(t){var e=t.shape,n=t.style.lineWidth,i=e.x,r=e.y,o=e.width,a=e.height;return e.x=ao(e.x,n,!0),e.y=ao(e.y,n,!0),e.width=Math.max(ao(i+o,n,!1)-e.x,0===o?0:1),e.height=Math.max(ao(r+a,n,!1)-e.y,0===a?0:1),t;}function ao(t,e,n){var i=Lg(2*t);return(i+Lg(e))%2===0?i/2:(i+(n?1:-1))/2;}function so(t){return null!=t&&"none"!=t;}function lo(t){return"string"==typeof t?Oe(t,-.1):t;}function ho(t){if(t.__hoverStlDirty){var e=t.style.stroke,n=t.style.fill,i=t.__hoverStl;i.fill=i.fill||(so(n)?lo(n):null),i.stroke=i.stroke||(so(e)?lo(e):null);var r={};for(var o in i){null!=i[o]&&(r[o]=t.style[o]);}t.__normalStl=r,t.__hoverStlDirty=!1;}}function uo(t){if(!t.__isHover){if(ho(t),t.useHoverLayer)t.__zr&&t.__zr.addHover(t,t.__hoverStl);else{var e=t.style,n=e.insideRollbackOpt;n&&Do(e),e.extendFrom(t.__hoverStl),n&&(Ao(e,e.insideOriginalTextPosition,n),null==e.textFill&&(e.textFill=n.autoColor)),t.dirty(!1),t.z2+=1;}t.__isHover=!0;}}function co(t){if(t.__isHover){var e=t.__normalStl;t.useHoverLayer?t.__zr&&t.__zr.removeHover(t):(e&&t.setStyle(e),t.z2-=1),t.__isHover=!1;}}function fo(t){"group"===t.type?t.traverse(function(t){"group"!==t.type&&uo(t);}):uo(t);}function go(t){"group"===t.type?t.traverse(function(t){"group"!==t.type&&co(t);}):co(t);}function po(t,e){t.__hoverStl=t.hoverStyle||e||{},t.__hoverStlDirty=!0,t.__isHover&&ho(t);}function vo(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasis&&fo(this);}function mo(t){this.__hoverSilentOnTouch&&t.zrByTouch||!this.__isEmphasis&&go(this);}function yo(){this.__isEmphasis=!0,fo(this);}function xo(){this.__isEmphasis=!1,go(this);}function _o(t,e,n){t.__hoverSilentOnTouch=n&&n.hoverSilentOnTouch,"group"===t.type?t.traverse(function(t){"group"!==t.type&&po(t,e);}):po(t,e),t.on("mouseover",vo).on("mouseout",mo),t.on("emphasis",yo).on("normal",xo);}function wo(t,e,n,i,r,o,a){r=r||Bg;var s=r.labelFetcher,l=r.labelDataIndex,h=r.labelDimIndex,u=n.getShallow("show"),c=i.getShallow("show"),d=u||c?A(s?s.getFormattedLabel(l,"normal",null,h):null,r.defaultText):null,f=u?d:null,g=c?A(s?s.getFormattedLabel(l,"emphasis",null,h):null,d):null;(null!=f||null!=g)&&(bo(t,n,o,r),bo(e,i,a,r,!0)),t.text=f,e.text=g;}function bo(t,e,n,i,r){return Mo(t,e,i,r),n&&a(t,n),t.host&&t.host.dirty&&t.host.dirty(!1),t;}function So(t,e,n){var i,r={isRectText:!0};n===!1?i=!0:r.autoColor=n,Mo(t,e,r,i),t.host&&t.host.dirty&&t.host.dirty(!1);}function Mo(t,e,n,i){if(n=n||Bg,n.isRectText){var r=e.getShallow("position")||(i?null:"inside");"outside"===r&&(r="top"),t.textPosition=r,t.textOffset=e.getShallow("offset");var o=e.getShallow("rotate");null!=o&&(o*=Math.PI/180),t.textRotation=o,t.textDistance=A(e.getShallow("distance"),i?null:5);}var a,s=e.ecModel,l=s&&s.option.textStyle,h=To(e);if(h){a={};for(var u in h){if(h.hasOwnProperty(u)){var c=e.getModel(["rich",u]);Io(a[u]={},c,l,n,i);}}}return t.rich=a,Io(t,e,l,n,i,!0),n.forceRich&&!n.textStyle&&(n.textStyle={}),t;}function To(t){for(var e;t&&t!==t.ecModel;){var n=(t.option||Bg).rich;if(n){e=e||{};for(var i in n){n.hasOwnProperty(i)&&(e[i]=1);}}t=t.parentModel;}return e;}function Io(t,e,n,i,r,o){if(n=!r&&n||Bg,t.textFill=Co(e.getShallow("color"),i)||n.color,t.textStroke=Co(e.getShallow("textBorderColor"),i)||n.textBorderColor,t.textStrokeWidth=A(e.getShallow("textBorderWidth"),n.textBorderWidth),!r){if(o){var a=t.textPosition;t.insideRollback=Ao(t,a,i),t.insideOriginalTextPosition=a,t.insideRollbackOpt=i;}null==t.textFill&&(t.textFill=i.autoColor);}t.fontStyle=e.getShallow("fontStyle")||n.fontStyle,t.fontWeight=e.getShallow("fontWeight")||n.fontWeight,t.fontSize=e.getShallow("fontSize")||n.fontSize,t.fontFamily=e.getShallow("fontFamily")||n.fontFamily,t.textAlign=e.getShallow("align"),t.textVerticalAlign=e.getShallow("verticalAlign")||e.getShallow("baseline"),t.textLineHeight=e.getShallow("lineHeight"),t.textWidth=e.getShallow("width"),t.textHeight=e.getShallow("height"),t.textTag=e.getShallow("tag"),o&&i.disableBox||(t.textBackgroundColor=Co(e.getShallow("backgroundColor"),i),t.textPadding=e.getShallow("padding"),t.textBorderColor=Co(e.getShallow("borderColor"),i),t.textBorderWidth=e.getShallow("borderWidth"),t.textBorderRadius=e.getShallow("borderRadius"),t.textBoxShadowColor=e.getShallow("shadowColor"),t.textBoxShadowBlur=e.getShallow("shadowBlur"),t.textBoxShadowOffsetX=e.getShallow("shadowOffsetX"),t.textBoxShadowOffsetY=e.getShallow("shadowOffsetY")),t.textShadowColor=e.getShallow("textShadowColor")||n.textShadowColor,t.textShadowBlur=e.getShallow("textShadowBlur")||n.textShadowBlur,t.textShadowOffsetX=e.getShallow("textShadowOffsetX")||n.textShadowOffsetX,t.textShadowOffsetY=e.getShallow("textShadowOffsetY")||n.textShadowOffsetY;}function Co(t,e){return"auto"!==t?t:e&&e.autoColor?e.autoColor:null;}function Ao(t,e,n){var i,r=n.useInsideStyle;return null==t.textFill&&r!==!1&&(r===!0||n.isRectText&&e&&"string"==typeof e&&e.indexOf("inside")>=0)&&(i={textFill:null,textStroke:t.textStroke,textStrokeWidth:t.textStrokeWidth},t.textFill="#fff",null==t.textStroke&&(t.textStroke=n.autoColor,null==t.textStrokeWidth&&(t.textStrokeWidth=2))),i;}function Do(t){var e=t.insideRollback;e&&(t.textFill=e.textFill,t.textStroke=e.textStroke,t.textStrokeWidth=e.textStrokeWidth);}function ko(t,e){var n=e||e.getModel("textStyle");return[t.fontStyle||n&&n.getShallow("fontStyle")||"",t.fontWeight||n&&n.getShallow("fontWeight")||"",(t.fontSize||n&&n.getShallow("fontSize")||12)+"px",t.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" ");}function Po(t,e,n,i,r,o){"function"==typeof r&&(o=r,r=null);var a=i&&i.isAnimationEnabled();if(a){var s=t?"Update":"",l=i.getShallow("animationDuration"+s),h=i.getShallow("animationEasing"+s),u=i.getShallow("animationDelay"+s);"function"==typeof u&&(u=u(r,i.getAnimationDelayParams?i.getAnimationDelayParams(e,r):null)),"function"==typeof l&&(l=l(r)),l>0?e.animateTo(n,l,u||0,h,o,!!o):(e.stopAnimation(),e.attr(n),o&&o());}else e.stopAnimation(),e.attr(n),o&&o();}function Lo(t,e,n,i,r){Po(!0,t,e,n,i,r);}function Oo(t,e,n,i,r){Po(!1,t,e,n,i,r);}function zo(t,e){for(var n=ce([]);t&&t!==e;){fe(n,t.getLocalTransform(),n),t=t.parent;}return n;}function Bo(t,e,n){return e&&!d(e)&&(e=Cc.getLocalTransform(e)),n&&(e=me([],e)),ne([],t,e);}function Eo(t,e,n){var i=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),o=["left"===t?-i:"right"===t?i:0,"top"===t?-r:"bottom"===t?r:0];return o=Bo(o,e,n),Math.abs(o[0])>Math.abs(o[1])?o[0]>0?"right":"left":o[1]>0?"bottom":"top";}function Ro(t,e,n){function i(t){var e={};return t.traverse(function(t){!t.isGroup&&t.anid&&(e[t.anid]=t);}),e;}function r(t){var e={position:G(t.position),rotation:t.rotation};return t.shape&&(e.shape=a({},t.shape)),e;}if(t&&e){var o=i(t);e.traverse(function(t){if(!t.isGroup&&t.anid){var e=o[t.anid];if(e){var i=r(t);t.attr(r(e)),Lo(t,i,n,t.dataIndex);}}});}}function No(t,e){return g(t,function(t){var n=t[0];n=Og(n,e.x),n=zg(n,e.x+e.width);var i=t[1];return i=Og(i,e.y),i=zg(i,e.y+e.height),[n,i];});}function Fo(t,e){var n=Og(t.x,e.x),i=zg(t.x+t.width,e.x+e.width),r=Og(t.y,e.y),o=zg(t.y+t.height,e.y+e.height);return i>=n&&o>=r?{x:n,y:r,width:i-n,height:o-r}:void 0;}function Go(t,e,n){e=a({rectHover:!0},e);var i=e.style={strokeNoScale:!0};return n=n||{x:-1,y:-1,width:2,height:2},t?0===t.indexOf("image://")?(i.image=t.slice(8),s(i,n),new ei(e)):to(t.replace("path://",""),e,n,"center"):void 0;}function Ho(t,e,n){this.parentModel=e,this.ecModel=n,this.option=t;}function Wo(t,e,n){for(var i=0;i<e.length&&(!e[i]||(t=t&&"object"==(typeof t==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(t))?t[e[i]]:null,null!=t));i++){}return null==t&&n&&(t=n.get(e)),t;}function Vo(t,e){var n=er(t,"getParent");return n?n.call(t,e):t.parentModel;}function Xo(t){return t instanceof Array?t:null==t?[]:[t];}function qo(t,e){if(t)for(var n=t.emphasis=t.emphasis||{},i=t.normal=t.normal||{},r=0,o=e.length;o>r;r++){var a=e[r];!n.hasOwnProperty(a)&&i.hasOwnProperty(a)&&(n[a]=i[a]);}}function Yo(t){return t&&(null==t.value?t:t.value);}function Zo(t){return Xg(t)&&!(t instanceof Array);}function jo(t,e){var n=e&&e.type;return"ordinal"===n?t:("time"===n&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+Gi(t)),null==t||""===t?0/0:+t);}function Uo(t,e){e=(e||[]).slice();var n=g(t||[],function(t){return{exist:t};});return Vg(e,function(t,i){if(Xg(t)){for(var r=0;r<n.length;r++){if(!n[r].option&&null!=t.id&&n[r].exist.id===t.id+"")return n[r].option=t,void(e[i]=null);}for(var r=0;r<n.length;r++){var o=n[r].exist;if(!(n[r].option||null!=o.id&&null!=t.id||null==t.name||Ko(t)||Ko(o)||o.name!==t.name+""))return n[r].option=t,void(e[i]=null);}}}),Vg(e,function(t){if(Xg(t)){for(var e=0;e<n.length;e++){var i=n[e].exist;if(!n[e].option&&!Ko(i)&&null==t.id){n[e].option=t;break;}}e>=n.length&&n.push({option:t});}}),n;}function $o(t){var e=E();Vg(t,function(t){var n=t.exist;n&&e.set(n.id,t);}),Vg(t,function(t){var n=t.option;L(!n||null==n.id||!e.get(n.id)||e.get(n.id)===t,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&e.set(n.id,t),!t.keyInfo&&(t.keyInfo={});}),Vg(t,function(t){var n=t.exist,i=t.option,r=t.keyInfo;if(Xg(i)){if(r.name=null!=i.name?i.name+"":n?n.name:"\x00-",n)r.id=n.id;else if(null!=i.id)r.id=i.id+"";else{var o=0;do{r.id="\x00"+r.name+"\x00"+o++;}while(e.get(r.id));}e.set(r.id,t);}});}function Ko(t){return Xg(t)&&t.id&&0===(t.id+"").indexOf("\x00_ec_\x00");}function Qo(t,e){return null!=e.dataIndexInside?e.dataIndexInside:null!=e.dataIndex?_(e.dataIndex)?g(e.dataIndex,function(e){return t.indexOfRawIndex(e);}):t.indexOfRawIndex(e.dataIndex):null!=e.name?_(e.name)?g(e.name,function(e){return t.indexOfName(e);}):t.indexOfName(e.name):void 0;}function Jo(t,e,n){if(b(e)){var i={};i[e+"Index"]=0,e=i;}var r=n&&n.defaultMainType;!r||ia(e,r+"Index")||ia(e,r+"Id")||ia(e,r+"Name")||(e[r+"Index"]=0);var o={};return Vg(e,function(i,r){var i=e[r];if("dataIndex"===r||"dataIndexInside"===r)return void(o[r]=i);var a=r.match(/^(\w+)(Index|Id|Name)$/)||[],s=a[1],l=(a[2]||"").toLowerCase();if(!(!s||!l||null==i||"index"===l&&"none"===i||n&&n.includeMainTypes&&h(n.includeMainTypes,s)<0)){var u={mainType:s};("index"!==l||"all"!==i)&&(u[l]=i);var c=t.queryComponents(u);o[s+"Models"]=c,o[s+"Model"]=c[0];}}),o;}function ta(t,e){var n=t.dimensions;e=t.getDimension(e);for(var i=0;i<n.length;i++){var r=t.getDimensionInfo(n[i]);if(r.name===e)return r.coordDim;}}function ea(t,e){var n=[];return Vg(t.dimensions,function(i){var r=t.getDimensionInfo(i);r.coordDim===e&&(n[r.coordDimIndex]=r.name);}),n;}function na(t,e){var n=[];return Vg(t.dimensions,function(i){var r=t.getDimensionInfo(i),o=r.otherDims,a=o[e];null!=a&&a!==!1&&(n[a]=r.name);}),n;}function ia(t,e){return t&&t.hasOwnProperty(e);}function ra(t){return[t||"",jg++,Math.random()].join(Ug);}function oa(t){var e={};return t.registerSubTypeDefaulter=function(t,n){t=ir(t),e[t.main]=n;},t.determineSubType=function(n,i){var r=i.type;if(!r){var o=ir(n).main;t.hasSubTypes(n)&&e[o]&&(r=e[o](i));}return r;},t;}function aa(t,e){function n(t){var n={},o=[];return f(t,function(a){var s=i(n,a),l=s.originalDeps=e(a),u=r(l,t);s.entryCount=u.length,0===s.entryCount&&o.push(a),f(u,function(t){h(s.predecessor,t)<0&&s.predecessor.push(t);var e=i(n,t);h(e.successor,t)<0&&e.successor.push(a);});}),{graph:n,noEntryList:o};}function i(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e];}function r(t,e){var n=[];return f(t,function(t){h(e,t)>=0&&n.push(t);}),n;}t.topologicalTravel=function(t,e,i,r){function o(t){l[t].entryCount--,0===l[t].entryCount&&h.push(t);}function a(t){u[t]=!0,o(t);}if(t.length){var s=n(e),l=s.graph,h=s.noEntryList,u={};for(f(t,function(t){u[t]=!0;});h.length;){var c=h.pop(),d=l[c],g=!!u[c];g&&(i.call(r,c,d.originalDeps.slice()),delete u[c]),f(d.successor,g?a:o);}f(u,function(){throw new Error("Circle dependency may exists");});}};}function sa(t,e,n,i,r){var o=0,a=0;null==i&&(i=1/0),null==r&&(r=1/0);var s=0;e.eachChild(function(l,h){var u,c,d=l.position,f=l.getBoundingRect(),g=e.childAt(h+1),p=g&&g.getBoundingRect();if("horizontal"===t){var v=f.width+(p?-p.x+f.x:0);u=o+v,u>i||l.newline?(o=0,u=v,a+=s+n,s=f.height):s=Math.max(s,f.height);}else{var m=f.height+(p?-p.y+f.y:0);c=a+m,c>r||l.newline?(o+=s+n,a=0,c=m,s=f.width):s=Math.max(s,f.width);}l.newline||(d[0]=o,d[1]=a,"horizontal"===t?o=u+n:a=c+n);});}function la(t,e,n){n=$d(n||0);var i=e.width,r=e.height,o=Pi(t.left,i),a=Pi(t.top,r),s=Pi(t.right,i),l=Pi(t.bottom,r),h=Pi(t.width,i),u=Pi(t.height,r),c=n[2]+n[0],d=n[1]+n[3],f=t.aspect;switch(isNaN(h)&&(h=i-s-d-o),isNaN(u)&&(u=r-l-c-a),null!=f&&(isNaN(h)&&isNaN(u)&&(f>i/r?h=.8*i:u=.8*r),isNaN(h)&&(h=f*u),isNaN(u)&&(u=h/f)),isNaN(o)&&(o=i-s-h-d),isNaN(a)&&(a=r-l-u-c),t.left||t.right){case"center":o=i/2-h/2-n[3];break;case"right":o=i-h-d;}switch(t.top||t.bottom){case"middle":case"center":a=r/2-u/2-n[0];break;case"bottom":a=r-u-c;}o=o||0,a=a||0,isNaN(h)&&(h=i-d-o-(s||0)),isNaN(u)&&(u=r-c-a-(l||0));var g=new Je(o+n[3],a+n[0],h,u);return g.margin=n,g;}function ha(t,e,n){function i(n,i){var a={},l=0,h={},u=0,c=2;if($g(n,function(e){h[e]=t[e];}),$g(n,function(t){r(e,t)&&(a[t]=h[t]=e[t]),o(a,t)&&l++,o(h,t)&&u++;}),s[i])return o(e,n[1])?h[n[2]]=null:o(e,n[2])&&(h[n[1]]=null),h;if(u!==c&&l){if(l>=c)return a;for(var d=0;d<n.length;d++){var f=n[d];if(!r(a,f)&&r(t,f)){a[f]=t[f];break;}}return a;}return h;}function r(t,e){return t.hasOwnProperty(e);}function o(t,e){return null!=t[e]&&"auto"!==t[e];}function a(t,e,n){$g(t,function(t){e[t]=n[t];});}!S(n)&&(n={});var s=n.ignoreSize;!_(s)&&(s=[s,s]);var l=i(Qg[0],0),h=i(Qg[1],1);a(Qg[0],t,l),a(Qg[1],t,h);}function ua(t){return ca({},t);}function ca(t,e){return e&&t&&$g(Kg,function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t;}function da(t){var e=[];return f(np.getClassesByMainType(t),function(t){ep.apply(e,t.prototype.dependencies||[]);}),g(e,function(t){return ir(t).main;});}function fa(t,e){f(e,function(e,n){np.hasClass(n)||("object"==(typeof e==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(e))?t[n]=t[n]?r(t[n],e,!1):i(e):null==t[n]&&(t[n]=e));});}function ga(t){t=t,this.option={},this.option[dp]=1,this._componentsMap=E({series:[]}),this._seriesIndices=null,fa(t,this._theme.option),r(t,rp,!1),this.mergeOption(t);}function pa(t,e){_(e)||(e=e?[e]:[]);var n={};return ap(e,function(e){n[e]=(t.get(e)||[]).slice();}),n;}function va(t,e,n){var i=e.type?e.type:n?n.subType:np.determineSubType(t,e);return i;}function ma(t){return lp(t,function(t){return t.componentIndex;})||[];}function ya(t,e){return e.hasOwnProperty("subType")?sp(t,function(t){return t.subType===e.subType;}):t;}function xa(t){f(gp,function(e){this[e]=y(t[e],t);},this);}function _a(){this._coordinateSystems=[];}function wa(t){this._api=t,this._timelineOptions=[],this._mediaList=[],this._mediaDefault,this._currentMediaIndices=[],this._optionBackup,this._newBaseOption;}function ba(t,e,n){var i,r,o=[],a=[],s=t.timeline;if(t.baseOption&&(r=t.baseOption),(s||t.options)&&(r=r||{},o=(t.options||[]).slice()),t.media){r=r||{};var l=t.media;vp(l,function(t){t&&t.option&&(t.query?a.push(t):i||(i=t));});}return r||(r=t),r.timeline||(r.timeline=s),vp([r].concat(o).concat(g(a,function(t){return t.option;})),function(t){vp(e,function(e){e(t,n);});}),{baseOption:r,timelineOptions:o,mediaDefault:i,mediaList:a};}function Sa(t,e,n){var i={width:e,height:n,aspectratio:e/n},r=!0;return f(t,function(t,e){var n=e.match(_p);if(n&&n[1]&&n[2]){var o=n[1],a=n[2].toLowerCase();Ma(i[a],t,o)||(r=!1);}}),r;}function Ma(t,e,n){return"min"===n?t>=e:"max"===n?e>=t:t===e;}function Ta(t,e){return t.join(",")===e.join(",");}function Ia(t,e){e=e||{},vp(e,function(e,n){if(null!=e){var i=t[n];if(np.hasClass(n)){e=Xo(e),i=Xo(i);var r=Uo(i,e);t[n]=yp(r,function(t){return t.option&&t.exist?xp(t.exist,t.option,!0):t.exist||t.option;});}else t[n]=xp(i,e,!0);}});}function Ca(t){var e=t&&t.itemStyle;if(e)for(var n=0,i=Sp.length;i>n;n++){var o=Sp[n],a=e.normal,s=e.emphasis;a&&a[o]&&(t[o]=t[o]||{},t[o].normal?r(t[o].normal,a[o]):t[o].normal=a[o],a[o]=null),s&&s[o]&&(t[o]=t[o]||{},t[o].emphasis?r(t[o].emphasis,s[o]):t[o].emphasis=s[o],s[o]=null);}}function Aa(t,e){var n=bp(t)&&t[e],i=bp(n)&&n.textStyle;if(i)for(var r=0,o=qg.length;o>r;r++){var e=qg[r];i.hasOwnProperty(e)&&(n[e]=i[e]);}}function Da(t){bp(t)&&(Aa(t,"normal"),Aa(t,"emphasis"));}function ka(t){if(bp(t)){Ca(t),Da(t.label),Da(t.upperLabel),Da(t.edgeLabel);var e=t.markPoint;Ca(e),Da(e&&e.label);var n=t.markLine;Ca(t.markLine),Da(n&&n.label);var i=t.markArea;Da(i&&i.label),Aa(t,"axisLabel"),Aa(t,"title"),Aa(t,"detail");var r=t.data;if(r)for(var o=0;o<r.length;o++){Ca(r[o]),Da(r[o]&&r[o].label);}var e=t.markPoint;if(e&&e.data)for(var a=e.data,o=0;o<a.length;o++){Ca(a[o]),Da(a[o]&&a[o].label);}var n=t.markLine;if(n&&n.data)for(var s=n.data,o=0;o<s.length;o++){_(s[o])?(Ca(s[o][0]),Da(s[o][0]&&s[o][0].label),Ca(s[o][1]),Da(s[o][1]&&s[o][1].label)):(Ca(s[o]),Da(s[o]&&s[o].label));}}}function Pa(t){return _(t)?t:t?[t]:[];}function La(t){return(_(t)?t[0]:t)||{};}function Oa(t,e){e=e.split(",");for(var n=t,i=0;i<e.length&&(n=n&&n[e[i]],null!=n);i++){}return n;}function za(t,e,n,i){e=e.split(",");for(var r,o=t,a=0;a<e.length-1;a++){r=e[a],null==o[r]&&(o[r]={}),o=o[r];}(i||null==o[e[a]])&&(o[e[a]]=n);}function Ba(t){f(Tp,function(e){e[0]in t&&!(e[1]in t)&&(t[e[1]]=t[e[0]]);});}function Ea(){this.group=new td(),this.uid=ra("viewChart");}function Ra(t,e){if(t&&(t.trigger(e),"group"===t.type))for(var n=0;n<t.childCount();n++){Ra(t.childAt(n),e);}}function Na(t,e,n){var i=Qo(t,e);null!=i?f(Xo(i),function(e){Ra(t.getItemGraphicEl(e),n);}):t.eachItemGraphicEl(function(t){Ra(t,n);});}function Fa(t,e,n){function i(){u=new Date().getTime(),c=null,t.apply(a,s||[]);}var r,o,a,s,l,h=0,u=0,c=null;e=e||0;var d=function d(){r=new Date().getTime(),a=this,s=arguments;var t=l||e,d=l||n;l=null,o=r-(d?h:u)-t,clearTimeout(c),d?c=setTimeout(i,t):o>=0?i():c=setTimeout(i,-o),h=r;};return d.clear=function(){c&&(clearTimeout(c),c=null);},d.debounceNextCall=function(t){l=t;},d;}function Ga(t,e,n,i){var r=t[e];if(r){var o=r[Op]||r,a=r[Bp],s=r[zp];if(s!==n||a!==i){if(null==n||!i)return t[e]=o;r=t[e]=Fa(o,n,"debounce"===i),r[Op]=o,r[Bp]=i,r[zp]=n;}return r;}}function Ha(t){return function(e,n,i){e=e&&e.toLowerCase(),xc.prototype[t].call(this,e,n,i);};}function Wa(){xc.call(this);}function Va(t,e,n){function r(t,e){return t.prio-e.prio;}n=n||{},"string"==typeof e&&(e=uv[e]),this.id,this.group,this._dom=t;var o="canvas",a=this._zr=Mi(t,{renderer:n.renderer||o,devicePixelRatio:n.devicePixelRatio,width:n.width,height:n.height});this._throttledZrFlush=Fa(y(a.flush,a),17);var e=i(e);e&&Ap(e,!0),this._theme=e,this._chartsViews=[],this._chartsMap={},this._componentsViews=[],this._componentsMap={},this._coordSysMgr=new _a(),this._api=os(this),xc.call(this),this._messageCenter=new Wa(),this._initEvents(),this.resize=y(this.resize,this),this._pendingActions=[],ln(hv,r),ln(av,r),a.animation.on("frame",this._onframe,this),O(this);}function Xa(t,e,n){var i,r=this._model,o=this._coordSysMgr.getCoordinateSystems();e=Jo(r,e);for(var a=0;a<o.length;a++){var s=o[a];if(s[t]&&null!=(i=s[t](r,e,n)))return i;}}function qa(t,e,n,i,r){function o(i){i&&i.__alive&&i[e]&&i[e](i.__model,a,t._api,n);}var a=t._model;if(!i)return void Fp(t._componentsViews.concat(t._chartsViews),o);var s={};s[i+"Id"]=n[i+"Id"],s[i+"Index"]=n[i+"Index"],s[i+"Name"]=n[i+"Name"];var l={mainType:i,query:s};r&&(l.subType=r),a&&a.eachComponent(l,function(e){o(t["series"===i?"_chartsMap":"_componentsMap"][e.__viewId]);},t);}function Ya(t,e){var n=t.type,i=t.escapeConnect,r=rv[n],o=r.actionInfo,l=(o.update||"update").split(":"),h=l.pop();l=null!=l[0]&&Gp(l[0]),this[Kp]=!0;var u=[t],c=!1;t.batch&&(c=!0,u=g(t.batch,function(e){return e=s(a({},e),t),e.batch=null,e;}));var d,f=[],p="highlight"===n||"downplay"===n;Fp(u,function(t){d=r.action(t,this._model,this._api),d=d||a({},t),d.type=o.event||d.type,f.push(d),p?qa(this,h,t,"series"):l&&qa(this,h,t,l.main,l.sub);},this),"none"===h||p||l||(this[Jp]?(nv.prepareAndUpdate.call(this,t),this[Jp]=!1):nv[h].call(this,t)),d=c?{type:o.event||n,escapeConnect:i,batch:f}:f[0],this[Kp]=!1,!e&&this._messageCenter.trigger(d.type,d);}function Za(t){for(var e=this._pendingActions;e.length;){var n=e.shift();Ya.call(this,n,t);}}function ja(t){!t&&this.trigger("updated");}function Ua(t,e,n){var i=this._api;Fp(this._componentsViews,function(r){var o=r.__model;r[t](o,e,i,n),rs(o,r);},this),e.eachSeries(function(r){var o=this._chartsMap[r.__viewId];o[t](r,e,i,n),rs(r,o),is(r,o);},this),ns(this._zr,e),Fp(lv,function(t){t(e,i);});}function $a(t,e){for(var n="component"===t,i=n?this._componentsViews:this._chartsViews,r=n?this._componentsMap:this._chartsMap,o=this._zr,a=0;a<i.length;a++){i[a].__alive=!1;}e[n?"eachComponent":"eachSeries"](function(t,a){if(n){if("series"===t)return;}else a=t;var s="_ec_"+a.id+"_"+a.type,l=r[s];if(!l){var h=Gp(a.type),u=n?kp.getClass(h.main,h.sub):Ea.getClass(h.sub);if(!u)return;l=new u(),l.init(e,this._api),r[s]=l,i.push(l),o.add(l.group);}a.__viewId=l.__id=s,l.__alive=!0,l.__model=a,l.group.__ecComponentInfo={mainType:a.mainType,index:a.componentIndex};},this);for(var a=0;a<i.length;){var s=i[a];s.__alive?a++:(o.remove(s.group),s.dispose(e,this._api),i.splice(a,1),delete r[s.__id],s.__id=s.group.__ecComponentInfo=null);}}function Ka(t,e){Fp(av,function(n){n.func(t,e);});}function Qa(t){var e={};t.eachSeries(function(t){var n=t.get("stack"),i=t.getData();if(n&&"list"===i.type){var r=e[n];e.hasOwnProperty(n)&&r&&(i.stackedOn=r),e[n]=i;}});}function Ja(t,e){var n=this._api;Fp(hv,function(i){i.isLayout&&i.func(t,n,e);});}function ts(t,e,n){var i=this._api;t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette();}),Fp(hv,function(r){(!n||!r.isLayout)&&r.func(t,i,e);});}function es(t,e){var n=this._api;Fp(this._componentsViews,function(i){var r=i.__model;i.render(r,t,n,e),rs(r,i);},this),Fp(this._chartsViews,function(t){t.__alive=!1;},this),t.eachSeries(function(i){var r=this._chartsMap[i.__viewId];r.__alive=!0,r.render(i,t,n,e),r.group.silent=!!i.get("silent"),rs(i,r),is(i,r);},this),ns(this._zr,t),Fp(this._chartsViews,function(e){e.__alive||e.remove(t,n);},this);}function ns(t,e){var n=t.storage,i=0;n.traverse(function(t){t.isGroup||i++;}),i>e.get("hoverLayerThreshold")&&!Uu.node&&n.traverse(function(t){t.isGroup||(t.useHoverLayer=!0);});}function is(t,e){var n=0;e.group.traverse(function(t){"group"===t.type||t.ignore||n++;});var i=+t.get("progressive"),r=n>t.get("progressiveThreshold")&&i&&!Uu.node;r&&e.group.traverse(function(t){t.isGroup||(t.progressive=r?Math.floor(n++/i):-1,r&&t.stopAnimation(!0));});var o=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||t.setStyle("blend",o);});}function rs(t,e){var n=t.get("z"),i=t.get("zlevel");e.group.traverse(function(t){"group"!==t.type&&(null!=n&&(t.z=n),null!=i&&(t.zlevel=i));});}function os(t){var e=t._coordSysMgr;return a(new xa(t),{getCoordinateSystems:y(e.getCoordinateSystems,e),getComponentByElement:function getComponentByElement(e){for(;e;){var n=e.__ecComponentInfo;if(null!=n)return t._model.getComponent(n.mainType,n.index);e=e.parent;}}});}function as(t){function e(t,e){for(var n=0;n<t.length;n++){var i=t[n];i[o]=e;}}var n=0,i=1,r=2,o="__connectUpdateStatus";f(ov,function(a,s){t._messageCenter.on(s,function(a){if(fv[t.group]&&t[o]!==n){if(a&&a.escapeConnect)return;var s=t.makeActionFromEvent(a),l=[];f(dv,function(e){e!==t&&e.group===t.group&&l.push(e);}),e(l,n),Fp(l,function(t){t[o]!==i&&t.dispatchAction(s);}),e(l,r);}});});}function ss(t,e,n){var i=cs(t);if(i)return i;var r=new Va(t,e,n);return r.id="ec_"+gv++,dv[r.id]=r,t.setAttribute?t.setAttribute(vv,r.id):t[vv]=r.id,as(r),r;}function ls(t){if(_(t)){var e=t;t=null,f(e,function(e){null!=e.group&&(t=e.group);}),t=t||"g_"+pv++,f(e,function(e){e.group=t;});}return fv[t]=!0,t;}function hs(t){fv[t]=!1;}function us(t){"string"==typeof t?t=dv[t]:t instanceof Va||(t=cs(t)),t instanceof Va&&!t.isDisposed()&&t.dispose();}function cs(t){var e;return e=t.getAttribute?t.getAttribute(vv):t[vv],dv[e];}function ds(t){return dv[t];}function fs(t,e){uv[t]=e;}function gs(t){sv.push(t);}function ps(t,e){"function"==typeof t&&(e=t,t=Vp),av.push({prio:t,func:e});}function vs(t){lv.push(t);}function ms(t,e,n){"function"==typeof e&&(n=e,e="");var i=S(t)?t.type:[t,t={event:e}][0];t.event=(t.event||i).toLowerCase(),e=t.event,L(tv.test(i)&&tv.test(e)),rv[i]||(rv[i]={action:n,actionInfo:t}),ov[e]=i;}function ys(t,e){_a.register(t,e);}function xs(t){var e=_a.get(t);return e?e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice():void 0;}function _s(t,e){"function"==typeof t&&(e=t,t=qp),hv.push({prio:t,func:e,isLayout:!0});}function ws(t,e){"function"==typeof t&&(e=t,t=Zp),hv.push({prio:t,func:e});}function bs(t,e){cv[t]=e;}function Ss(t){return np.extend(t);}function Ms(t){return kp.extend(t);}function Ts(t){return Dp.extend(t);}function Is(t){return Ea.extend(t);}function Cs(t){n("createCanvas",t);}function As(t,e,n){e.geoJson&&!e.features&&(n=e.specialAreas,e=e.geoJson),"string"==typeof e&&(e="undefined"!=typeof JSON&&JSON.parse?JSON.parse(e):new Function("return ("+e+");")()),mv[t]={geoJson:e,specialAreas:n};}function Ds(t){return mv[t];}function ks(t){return t;}function Ps(t,e,n,i,r){this._old=t,this._new=e,this._oldKeyGetter=n||ks,this._newKeyGetter=i||ks,this.context=r;}function Ls(t,e,n,i,r){for(var o=0;o<t.length;o++){var a="_ec_"+r[i](t[o],o),s=e[a];null==s?(n.push(a),e[a]=o):(s.length||(e[a]=s=[s]),s.push(o));}}function Os(t,e){f(Mv.concat(e.__wrappedMethods||[]),function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t.__wrappedMethods=e.__wrappedMethods;}function zs(t){this._array=t||[];}function Bs(t){return _(t)||(t=[t]),t;}function Es(t,e){var n=t.dimensions,i=new Tv(g(n,t.getDimensionInfo,t),t.hostModel);Os(i,t);for(var r=i._storage={},o=t._storage,a=0;a<n.length;a++){var s=n[a],l=o[s];r[s]=h(e,s)>=0?new l.constructor(o[s].length):o[s];}return i;}function Rs(t,e,n){function r(t,e,n){Pv[e]?t.otherDims[e]=n:(t.coordDim=e,t.coordDimIndex=n,h.set(e,!0));}function o(t,e,n){if(n||null!=e.get(t)){for(var i=0;null!=e.get(t+i);){i++;}t+=i;}return e.set(t,!0),t;}e=e||[],n=n||{},t=(t||[]).slice();var a=(n.dimsDef||[]).slice(),s=E(n.encodeDef),l=E(),h=E(),u=[],c=n.dimCount;if(null==c){var d=Ns(e[0]);c=Math.max(_(d)&&d.length||1,t.length,a.length),Av(t,function(t){var e=t.dimsDef;e&&(c=Math.max(c,e.length));});}for(var f=0;c>f;f++){var g=Dv(a[f])?{name:a[f]}:a[f]||{},p=g.name,v=u[f]={otherDims:{}};null!=p&&null==l.get(p)&&(v.name=v.tooltipName=p,l.set(p,f)),null!=g.type&&(v.type=g.type);}s.each(function(t,e){t=s.set(e,Xo(t).slice()),Av(t,function(n,i){Dv(n)&&(n=l.get(n)),null!=n&&c>n&&(t[i]=n,r(u[n],e,i));});});var m=0;Av(t,function(t){var e,t,n,o;Dv(t)?(e=t,t={}):(e=t.name,t=i(t),n=t.dimsDef,o=t.otherDims,t.name=t.coordDim=t.coordDimIndex=t.dimsDef=t.otherDims=null);var a=Xo(s.get(e));if(!a.length)for(var l=0;l<(n&&n.length||1);l++){for(;m<u.length&&null!=u[m].coordDim;){m++;}m<u.length&&a.push(m++);}Av(a,function(i,a){var s=u[i];r(kv(s,t),e,a),null==s.name&&n&&(s.name=s.tooltipName=n[a]),o&&kv(s.otherDims,o);});});for(var y=n.extraPrefix||"value",x=0;c>x;x++){var v=u[x]=u[x]||{},w=v.coordDim;null==w&&(v.coordDim=o(y,h,n.extraFromZero),v.coordDimIndex=0,v.isExtraCoord=!0),null==v.name&&(v.name=o(v.coordDim,l)),null==v.type&&Lv(e,x)&&(v.type="ordinal");}return u;}function Ns(t){return _(t)?t:S(t)?t.value:t;}function Fs(t){for(var e=0;e<t.length&&null==t[e];){e++;}return t[e];}function Gs(t){var e=Fs(t);return null!=e&&!_(Yo(e));}function Hs(t,e,n){t=t||[];var i=e.get("coordinateSystem"),r=Ov[i],o=_a.get(i),a={encodeDef:e.get("encode"),dimsDef:e.get("dimensions")},s=r&&r(t,e,n,a),l=s&&s.dimensions;l||(l=o&&(o.getDimensionsInfo?o.getDimensionsInfo():o.dimensions.slice())||["x","y"],l=Rs(l,t,a));var u=s?s.categoryIndex:-1,c=new Tv(l,e),d=Xs(s,t),f={},g=u>=0&&Gs(t)?function(t,e,n,i){return Zo(t)&&(c.hasItemOption=!0),i===u?n:jo(Yo(t),l[i]);}:function(t,e,n,i){var r=Yo(t),o=jo(r&&r[i],l[i]);Zo(t)&&(c.hasItemOption=!0);var a=s&&s.categoryAxesModels;return a&&a[e]&&"string"==typeof o&&(f[e]=f[e]||a[e].getCategories(),o=h(f[e],o),0>o&&!isNaN(o)&&(o=+o)),o;};return c.hasItemOption=!1,c.initData(t,d,g),c;}function Ws(t){return"category"!==t&&"time"!==t;}function Vs(t){return"category"===t?"ordinal":"time"===t?"time":"float";}function Xs(t,e){var n,i=[],r=t&&t.dimensions[t.categoryIndex];if(r&&(n=t.categoryAxesModels[r.name]),n){var o=n.getCategories();if(o){var a=e.length;if(_(e[0])&&e[0].length>1){i=[];for(var s=0;a>s;s++){i[s]=o[e[s][t.categoryIndex||0]];}}else i=o.slice(0);}}return i;}function qs(t){this._setting=t||{},this._extent=[1/0,-1/0],this._interval=0,this.init&&this.init.apply(this,arguments);}function Ys(t,e,n,i){var r={},o=t[1]-t[0],a=r.interval=Vi(o/e,!0);null!=n&&n>a&&(a=r.interval=n),null!=i&&a>i&&(a=r.interval=i);var s=r.intervalPrecision=Zs(a),l=r.niceTickExtent=[Ev(Math.ceil(t[0]/a)*a,s),Ev(Math.floor(t[1]/a)*a,s)];return Us(l,t),r;}function Zs(t){return Bi(t)+2;}function js(t,e,n){t[e]=Math.max(Math.min(t[e],n[1]),n[0]);}function Us(t,e){!isFinite(t[0])&&(t[0]=e[0]),!isFinite(t[1])&&(t[1]=e[1]),js(t,0,e),js(t,1,e),t[0]>t[1]&&(t[0]=t[1]);}function $s(t,e,n,i){var r=[];if(!t)return r;var o=1e4;e[0]<n[0]&&r.push(e[0]);for(var a=n[0];a<=n[1]&&(r.push(a),a=Ev(a+t,i),a!==r[r.length-1]);){if(r.length>o)return[];}return e[1]>(r.length?r[r.length-1]:n[1])&&r.push(e[1]),r;}function Ks(t,e){return Qv(t,Kv(e));}function Qs(t,e){var n,i,r,o=t.type,a=e.getMin(),s=e.getMax(),l=null!=a,h=null!=s,u=t.getExtent();return"ordinal"===o?n=(e.get("data")||[]).length:(i=e.get("boundaryGap"),_(i)||(i=[i||0,i||0]),"boolean"==typeof i[0]&&(i=[0,0]),i[0]=Pi(i[0],1),i[1]=Pi(i[1],1),r=u[1]-u[0]||Math.abs(u[0])),null==a&&(a="ordinal"===o?n?0:0/0:u[0]-i[0]*r),null==s&&(s="ordinal"===o?n?n-1:0/0:u[1]+i[1]*r),"dataMin"===a?a=u[0]:"function"==typeof a&&(a=a({min:u[0],max:u[1]})),"dataMax"===s?s=u[1]:"function"==typeof s&&(s=s({min:u[0],max:u[1]})),(null==a||!isFinite(a))&&(a=0/0),(null==s||!isFinite(s))&&(s=0/0),t.setBlank(I(a)||I(s)),e.getNeedCrossZero()&&(a>0&&s>0&&!l&&(a=0),0>a&&0>s&&!h&&(s=0)),[a,s];}function Js(t,e){var n=Qs(t,e),i=null!=e.getMin(),r=null!=e.getMax(),o=e.get("splitNumber");"log"===t.type&&(t.base=e.get("logBase"));var a=t.type;t.setExtent(n[0],n[1]),t.niceExtent({splitNumber:o,fixMin:i,fixMax:r,minInterval:"interval"===a||"time"===a?e.get("minInterval"):null,maxInterval:"interval"===a||"time"===a?e.get("maxInterval"):null});var s=e.get("interval");null!=s&&t.setInterval&&t.setInterval(s);}function tl(t,e){if(e=e||t.get("type"))switch(e){case"category":return new Bv(t.getCategories(),[1/0,-1/0]);case"value":return new Nv();default:return(qs.getClass(e)||Nv).create(t);}}function el(t){var e=t.scale.getExtent(),n=e[0],i=e[1];return!(n>0&&i>0||0>n&&0>i);}function nl(t,e,n,i,r){var o,a=0,s=0,l=(i-r)/180*Math.PI,h=1;e.length>40&&(h=Math.floor(e.length/40));for(var u=0;u<t.length;u+=h){var c=t[u],d=xn(e[u],n,"center","top");d.x+=c*Math.cos(l),d.y+=c*Math.sin(l),d.width*=1.3,d.height*=1.3,o?o.intersect(d)?(s++,a=Math.max(a,s)):(o.union(d),s=0):o=d.clone();}return 0===a&&h>1?h:(a+1)*h-1;}function il(t,e){var n=t.scale,i=n.getTicksLabels(),r=n.getTicks();return"string"==typeof e?(e=function(t){return function(e){return t.replace("{value}",null!=e?e:"");};}(e),g(i,e)):"function"==typeof e?g(r,function(n,i){return e(rl(t,n),i);},this):i;}function rl(t,e){return"category"===t.type?t.scale.getLabel(e):e;}function ol(t){return S(t)&&null!=t.value?t.value:t+"";}function al(t,e){if("image"!==this.type){var n=this.style,i=this.shape;i&&"line"===i.symbolType?n.stroke=t:this.__isEmptyBrush?(n.stroke=t,n.fill=e||"#fff"):(n.fill&&(n.fill=t),n.stroke&&(n.stroke=t)),this.dirty(!1);}}function sl(t,e,n,i,r,o,a){var s=0===t.indexOf("empty");s&&(t=t.substr(5,1).toLowerCase()+t.substr(6));var l;return l=0===t.indexOf("image://")?eo(t.slice(8),new Je(e,n,i,r),a?"center":"cover"):0===t.indexOf("path://")?to(t.slice(7),{},new Je(e,n,i,r),a?"center":"cover"):new dm({shape:{symbolType:t,x:e,y:n,width:i,height:r}}),l.__isEmptyBrush=s,l.setColor=al,l.setColor(o),l;}function ll(t){var e=t.get("data");return Hs(e,t,t.ecModel);}function hl(t,e){var n=e;e instanceof Ho||(n=new Ho(e),c(n,rm));var i=tl(n);return i.setExtent(t[0],t[1]),Js(i,n),i;}function ul(t){c(t,rm);}function cl(t,e){var n=t[1]-t[0],i=e,r=n/i/2;t[0]+=r,t[1]-=r;}function dl(t,e){return Math.abs(t-e)<mm;}function fl(t,e,n){var i=0,r=t[0];if(!r)return!1;for(var o=1;o<t.length;o++){var a=t[o];i+=Or(r[0],r[1],a[0],a[1],e,n),r=a;}var s=t[0];return dl(r[0],s[0])&&dl(r[1],s[1])||(i+=Or(r[0],r[1],s[0],s[1],e,n)),0!==i;}function gl(t,e,n){if(this.name=t,this.geometries=e,n)n=[n[0],n[1]];else{var i=this.getBoundingRect();n=[i.x+i.width/2,i.y+i.height/2];}this.center=n;}function pl(t){if(!t.UTF8Encoding)return t;var e=t.UTF8Scale;null==e&&(e=1024);for(var n=t.features,i=0;i<n.length;i++){for(var r=n[i],o=r.geometry,a=o.coordinates,s=o.encodeOffsets,l=0;l<a.length;l++){var h=a[l];if("Polygon"===o.type)a[l]=vl(h,s[l],e);else if("MultiPolygon"===o.type)for(var u=0;u<h.length;u++){var c=h[u];h[u]=vl(c,s[l][u],e);}}}return t.UTF8Encoding=!1,t;}function vl(t,e,n){for(var i=[],r=e[0],o=e[1],a=0;a<t.length;a+=2){var s=t.charCodeAt(a)-64,l=t.charCodeAt(a+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),s+=r,l+=o,r=s,o=l,i.push([s/n,l/n]);}return i;}function ml(t){return t.get("stack")||_m+t.seriesIndex;}function yl(t){return t.dim+t.index;}function xl(t,e){var n=[],i=t.axis,r="axis0";if("category"===i.type){for(var o=i.getBandWidth(),a=0;a<t.count;a++){n.push(s({bandWidth:o,axisKey:r,stackId:_m+a},t));}for(var l=wl(n,e),h=[],a=0;a<t.count;a++){var u=l[r][_m+a];u.offsetCenter=u.offset+u.width/2,h.push(u);}return h;}}function _l(t,e){var n=g(t,function(t){var e=t.getData(),n=t.coordinateSystem,i=n.getBaseAxis(),r=i.getExtent(),o="category"===i.type?i.getBandWidth():Math.abs(r[1]-r[0])/e.count(),a=Pi(t.get("barWidth"),o),s=Pi(t.get("barMaxWidth"),o),l=t.get("barGap"),h=t.get("barCategoryGap");return{bandWidth:o,barWidth:a,barMaxWidth:s,barGap:l,barCategoryGap:h,axisKey:yl(i),stackId:ml(t)};});return wl(n,e);}function wl(t){var e={};f(t,function(t){var n=t.axisKey,i=t.bandWidth,r=e[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},o=r.stacks;e[n]=r;var a=t.stackId;o[a]||r.autoWidthCount++,o[a]=o[a]||{width:0,maxWidth:0};var s=t.barWidth;s&&!o[a].width&&(o[a].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=t.barMaxWidth;l&&(o[a].maxWidth=l);var h=t.barGap;null!=h&&(r.gap=h);var u=t.barCategoryGap;null!=u&&(r.categoryGap=u);});var n={};return f(e,function(t,e){n[e]={};var i=t.stacks,r=t.bandWidth,o=Pi(t.categoryGap,r),a=Pi(t.gap,1),s=t.remainedWidth,l=t.autoWidthCount,h=(s-o)/(l+(l-1)*a);h=Math.max(h,0),f(i,function(t){var e=t.maxWidth;e&&h>e&&(e=Math.min(e,s),t.width&&(e=Math.min(e,t.width)),s-=e,t.width=e,l--);}),h=(s-o)/(l+(l-1)*a),h=Math.max(h,0);var u,c=0;f(i,function(t){t.width||(t.width=h),u=t,c+=t.width*(1+a);}),u&&(c-=u.width*a);var d=-c/2;f(i,function(t,i){n[e][i]=n[e][i]||{offset:d,width:t.width},d+=t.width*(1+a);});}),n;}function bl(t,e){var n=_l(v(e.getSeriesByType(t),function(t){return!e.isSeriesFiltered(t)&&t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type;})),i={},r={};e.eachSeriesByType(t,function(t){if("cartesian2d"===t.coordinateSystem.type){var e=t.getData(),o=t.coordinateSystem,a=o.getBaseAxis(),s=ml(t),l=n[yl(a)][s],h=l.offset,u=l.width,c=o.getOtherAxis(a),d=t.get("barMinHeight")||0,f=a.onZero?c.toGlobalCoord(c.dataToCoord(0)):c.getGlobalExtent()[0],g=[t.coordDimToDataDim("x")[0],t.coordDimToDataDim("y")[0]],p=e.mapArray(g,function(t,e){return o.dataToPoint([t,e]);},!0);i[s]=i[s]||[],r[s]=r[s]||[],e.setLayout({offset:h,size:u}),e.each(t.coordDimToDataDim(c.dim)[0],function(t,n){if(!isNaN(t)){i[s][n]||(i[s][n]={p:f,n:f},r[s][n]={p:f,n:f});var o,a,l,g,v=t>=0?"p":"n",m=p[n],y=i[s][n][v],x=r[s][n][v];c.isHorizontal()?(o=y,a=m[1]+h,l=m[0]-x,g=u,r[s][n][v]+=l,Math.abs(l)<d&&(l=(0>l?-1:1)*d),i[s][n][v]+=l):(o=m[0]+h,a=y,l=u,g=m[1]-x,r[s][n][v]+=g,Math.abs(g)<d&&(g=(0>=g?-1:1)*d),i[s][n][v]+=g),e.setItemLayout(n,{x:o,y:a,width:l,height:g});}},!0);}},this);}function Sl(t){return this._axes[t];}function Ml(t){wm.call(this,t);}function Tl(t,e){return e.type||(e.data?"category":"value");}function Il(t,e){return t.getCoordSysModel()===e;}function Cl(t,e){var n=e*Math.PI/180,i=t.plain(),r=i.width,o=i.height,a=r*Math.cos(n)+o*Math.sin(n),s=r*Math.sin(n)+o*Math.cos(n),l=new Je(i.x,i.y,a,s);return l;}function Al(t){var e,n=t.model,i=n.getFormattedLabels(),r=n.getModel("axisLabel"),o=1,a=i.length;a>40&&(o=Math.ceil(a/40));for(var s=0;a>s;s+=o){if(!t.isLabelIgnored(s)){var l=r.getTextRect(i[s]),h=Cl(l,r.get("rotate")||0);e?e.union(h):e=h;}}return e;}function Dl(t,e,n){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(t,e,n),this.model=t;}function kl(t,e,n){var i=t[e];if(n.onZero){var r=n.onZeroAxisIndex;if(null!=r){var o=i[r];return void(o&&Pl(o)&&(n.onZero=!1));}for(var a in i){if(i.hasOwnProperty(a)){var o=i[a];if(o&&!Pl(o)){r=+a;break;}}}null==r&&(n.onZero=!1),n.onZeroAxisIndex=r;}}function Pl(t){return"category"===t.type||"time"===t.type||!km(t);}function Ll(t,e){var n=t.getExtent(),i=n[0]+n[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e;}:function(t){return i-t+e;},t.toLocalCoord="x"===t.dim?function(t){return t-e;}:function(t){return i-t+e;};}function Ol(t){return g(Om,function(e){var n=t.getReferringComponents(e)[0];return n;});}function zl(t){return"cartesian2d"===t.get("coordinateSystem");}function Bl(t,e,n,i,r,o){var a=n.getModel("label.normal"),s=n.getModel("label.emphasis");wo(t,e,a,s,{labelFetcher:r,labelDataIndex:o,defaultText:r.getRawValue(o),isRectText:!0,autoColor:i}),El(t),El(e);}function El(t,e){"outside"===t.textPosition&&(t.textPosition=e);}function Rl(t,e,n){n.style.text=null,Lo(n,{shape:{width:0}},e,t,function(){n.parent&&n.parent.remove(n);});}function Nl(t,e,n){n.style.text=null,Lo(n,{shape:{r:n.shape.r0}},e,t,function(){n.parent&&n.parent.remove(n);});}function Fl(t,e,n,i,r,o,a,l){var h=e.getItemVisual(n,"color"),u=e.getItemVisual(n,"opacity"),c=i.getModel("itemStyle.normal"),d=i.getModel("itemStyle.emphasis").getBarItemStyle();l||t.setShape("r",c.get("barBorderRadius")||0),t.useStyle(s({fill:h,opacity:u},c.getBarItemStyle()));var f=i.getShallow("cursor");f&&t.attr("cursor",f);var g=a?r.height>0?"bottom":"top":r.width>0?"left":"right";l||Bl(t.style,d,i,h,o,n,g),_o(t,d);}function Gl(t,e){var n=t.get(Rm)||0;return Math.min(n,Math.abs(e.width),Math.abs(e.height));}function Hl(t){var e={componentType:t.mainType};return e[t.mainType+"Index"]=t.componentIndex,e;}function Wl(t,e,n,i){var r,o,a=Ni(n-t.rotation),s=i[0]>i[1],l="start"===e&&!s||"start"!==e&&s;return Fi(a-Gm/2)?(o=l?"bottom":"top",r="center"):Fi(a-1.5*Gm)?(o=l?"top":"bottom",r="center"):(o="middle",r=1.5*Gm>a&&a>Gm/2?l?"left":"right":l?"right":"left"),{rotation:a,textAlign:r,textVerticalAlign:o};}function Vl(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show);}function Xl(t,e,n){var i=t.get("axisLabel.showMinLabel"),r=t.get("axisLabel.showMaxLabel");e=e||[],n=n||[];var o=e[0],a=e[1],s=e[e.length-1],l=e[e.length-2],h=n[0],u=n[1],c=n[n.length-1],d=n[n.length-2];i===!1?(ql(o),ql(h)):Yl(o,a)&&(i?(ql(a),ql(u)):(ql(o),ql(h))),r===!1?(ql(s),ql(c)):Yl(l,s)&&(r?(ql(l),ql(d)):(ql(s),ql(c)));}function ql(t){t&&(t.ignore=!0);}function Yl(t,e){var n=t&&t.getBoundingRect().clone(),i=e&&e.getBoundingRect().clone();if(n&&i){var r=ce([]);return pe(r,r,-t.rotation),n.applyTransform(fe([],r,t.getLocalTransform())),i.applyTransform(fe([],r,e.getLocalTransform())),n.intersect(i);}}function Zl(t){return"middle"===t||"center"===t;}function jl(t,e,n){var i=e.axis;if(e.get("axisTick.show")&&!i.scale.isBlank()){for(var r=e.getModel("axisTick"),o=r.getModel("lineStyle"),a=r.get("length"),l=qm(r,n.labelInterval),h=i.getTicksCoords(r.get("alignWithLabel")),u=i.scale.getTicks(),c=e.get("axisLabel.showMinLabel"),d=e.get("axisLabel.showMaxLabel"),f=[],g=[],p=t._transform,v=[],m=h.length,y=0;m>y;y++){if(!Xm(i,y,l,m,c,d)){var x=h[y];f[0]=x,f[1]=0,g[0]=x,g[1]=n.tickDirection*a,p&&(ne(f,f,p),ne(g,g,p));var _=new Mg(ro({anid:"tick_"+u[y],shape:{x1:f[0],y1:f[1],x2:g[0],y2:g[1]},style:s(o.getLineStyle(),{stroke:e.get("axisLine.lineStyle.color")}),z2:2,silent:!0}));t.group.add(_),v.push(_);}}return v;}}function Ul(t,e,n){var i=e.axis,r=C(n.axisLabelShow,e.get("axisLabel.show"));if(r&&!i.scale.isBlank()){var o=e.getModel("axisLabel"),a=o.get("margin"),s=i.scale.getTicks(),l=e.getFormattedLabels(),h=(C(n.labelRotate,o.get("rotate"))||0)*Gm/180,u=Vm(n.rotation,h,n.labelDirection),c=e.get("data"),d=[],g=Vl(e),p=e.get("triggerEvent"),v=e.get("axisLabel.showMinLabel"),m=e.get("axisLabel.showMaxLabel");return f(s,function(r,h){if(!Xm(i,h,n.labelInterval,s.length,v,m)){var f=o;c&&c[r]&&c[r].textStyle&&(f=new Ho(c[r].textStyle,o,e.ecModel));var y=f.getTextColor()||e.get("axisLine.lineStyle.color"),x=i.dataToCoord(r),_=[x,n.labelOffset+n.labelDirection*a],w=i.scale.getLabel(r),b=new fg({anid:"label_"+r,position:_,rotation:u.rotation,silent:g,z2:10});bo(b.style,f,{text:l[h],textAlign:f.getShallow("align",!0)||u.textAlign,textVerticalAlign:f.getShallow("verticalAlign",!0)||f.getShallow("baseline",!0)||u.textVerticalAlign,textFill:"function"==typeof y?y("category"===i.type?w:"value"===i.type?r+"":r,h):y}),p&&(b.eventData=Hl(e),b.eventData.targetType="axisLabel",b.eventData.value=w),t._dumbGroup.add(b),b.updateTransform(),d.push(b),t.group.add(b),b.decomposeTransform();}}),d;}}function $l(t,e){var n={axesInfo:{},seriesInvolved:!1,coordSysAxesInfo:{},coordSysMap:{}};return Kl(n,t,e),n.seriesInvolved&&Jl(n,t),n;}function Kl(t,e,n){var i=e.getComponent("tooltip"),r=e.getComponent("axisPointer"),o=r.get("link",!0)||[],a=[];Ym(n.getCoordinateSystems(),function(n){function s(i,s,l){var u=l.model.getModel("axisPointer",r),d=u.get("show");if(d&&("auto"!==d||i||oh(u))){null==s&&(s=u.get("triggerTooltip")),u=i?Ql(l,c,r,e,i,s):u;var f=u.get("snap"),g=ah(l.model),p=s||f||"category"===l.type,v=t.axesInfo[g]={key:g,axis:l,coordSys:n,axisPointerModel:u,triggerTooltip:s,involveSeries:p,snap:f,useHandle:oh(u),seriesModels:[]};h[g]=v,t.seriesInvolved|=p;var m=th(o,l);if(null!=m){var y=a[m]||(a[m]={axesInfo:{}});y.axesInfo[g]=v,y.mapper=o[m].mapper,v.linkGroup=y;}}}if(n.axisPointerEnabled){var l=ah(n.model),h=t.coordSysAxesInfo[l]={};t.coordSysMap[l]=n;var u=n.model,c=u.getModel("tooltip",i);if(Ym(n.getAxes(),Zm(s,!1,null)),n.getTooltipAxes&&i&&c.get("show")){var d="axis"===c.get("trigger"),f="cross"===c.get("axisPointer.type"),g=n.getTooltipAxes(c.get("axisPointer.axis"));(d||f)&&Ym(g.baseAxes,Zm(s,f?"cross":!0,d)),f&&Ym(g.otherAxes,Zm(s,"cross",!1));}}});}function Ql(t,e,n,r,o,a){var l=e.getModel("axisPointer"),h={};Ym(["type","snap","lineStyle","shadowStyle","label","animation","animationDurationUpdate","animationEasingUpdate","z"],function(t){h[t]=i(l.get(t));}),h.snap="category"!==t.type&&!!a,"cross"===l.get("type")&&(h.type="line");var u=h.label||(h.label={});if(null==u.show&&(u.show=!1),"cross"===o&&(u.show=!0,!a)){var c=h.lineStyle=l.get("crossStyle");c&&s(u,c.textStyle);}return t.model.getModel("axisPointer",new Ho(h,n,r));}function Jl(t,e){e.eachSeries(function(e){var n=e.coordinateSystem,i=e.get("tooltip.trigger",!0),r=e.get("tooltip.show",!0);n&&"none"!==i&&i!==!1&&"item"!==i&&r!==!1&&e.get("axisPointer.show",!0)!==!1&&Ym(t.coordSysAxesInfo[ah(n.model)],function(t){var i=t.axis;n.getAxis(i.dim)===i&&(t.seriesModels.push(e),null==t.seriesDataCount&&(t.seriesDataCount=0),t.seriesDataCount+=e.getData().count());});},this);}function th(t,e){for(var n=e.model,i=e.dim,r=0;r<t.length;r++){var o=t[r]||{};if(eh(o[i+"AxisId"],n.id)||eh(o[i+"AxisIndex"],n.componentIndex)||eh(o[i+"AxisName"],n.name))return r;}}function eh(t,e){return"all"===t||_(t)&&h(t,e)>=0||t===e;}function nh(t){var e=ih(t);if(e){var n=e.axisPointerModel,i=e.axis.scale,r=n.option,o=n.get("status"),a=n.get("value");null!=a&&(a=i.parse(a));var s=oh(n);null==o&&(r.status=s?"show":"hide");var l=i.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==a||a>l[1])&&(a=l[1]),a<l[0]&&(a=l[0]),r.value=a,s&&(r.status=e.axis.scale.isBlank()?"hide":"show");}}function ih(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[ah(t)];}function rh(t){var e=ih(t);return e&&e.axisPointerModel;}function oh(t){return!!t.get("handle.show");}function ah(t){return t.type+"||"+t.id;}function sh(t,e,n,i,r,o){var a=jm.getAxisPointerClass(t.axisPointerClass);if(a){var s=rh(e);s?(t._axisPointer||(t._axisPointer=new a())).render(e,s,i,o):lh(t,i);}}function lh(t,e,n){var i=t._axisPointer;i&&i.dispose(e,n),t._axisPointer=null;}function hh(t,e,n){n=n||{};var i=t.coordinateSystem,r=e.axis,o={},a=r.position,s=r.onZero?"onZero":a,l=r.dim,h=i.getRect(),u=[h.x,h.x+h.width,h.y,h.y+h.height],c={left:0,right:1,top:0,bottom:1,onZero:2},d=e.get("offset")||0,f="x"===l?[u[2]-d,u[3]+d]:[u[0]-d,u[1]+d];if(r.onZero){var g=i.getAxis("x"===l?"y":"x",r.onZeroAxisIndex),p=g.toGlobalCoord(g.dataToCoord(0));f[c.onZero]=Math.max(Math.min(p,f[1]),f[0]);}o.position=["y"===l?f[c[s]]:u[0],"x"===l?f[c[s]]:u[3]],o.rotation=Math.PI/2*("x"===l?0:1);var v={top:-1,bottom:1,left:-1,right:1};o.labelDirection=o.tickDirection=o.nameDirection=v[a],o.labelOffset=r.onZero?f[c[a]]-f[c.onZero]:0,e.get("axisTick.inside")&&(o.tickDirection=-o.tickDirection),C(n.labelInside,e.get("axisLabel.inside"))&&(o.labelDirection=-o.labelDirection);var m=e.get("axisLabel.rotate");return o.labelRotate="top"===s?-m:m,o.labelInterval=r.getLabelInterval(),o.z2=1,o;}function uh(t){var e,n=na(t,"label");if(n.length)e=n[0];else for(var i,r=t.dimensions.slice();r.length&&(e=r.pop(),i=t.getDimensionInfo(e).type,"ordinal"===i||"time"===i);){}return e;}function ch(t,e){var n=t.getItemVisual(e,"symbolSize");return n instanceof Array?n.slice():[+n,+n];}function dh(t){return[t[0]/2,t[1]/2];}function fh(t,e,n){td.call(this),this.updateData(t,e,n);}function gh(t,e){this.parent.drift(t,e);}function ph(t){this.group=new td(),this._symbolCtor=t||fh;}function vh(t,e,n){var i=t.getItemLayout(e);return!(!i||isNaN(i[0])||isNaN(i[1])||n&&n(e)||"none"===t.getItemVisual(e,"symbol"));}function mh(t){return t>=0?1:-1;}function yh(t,e,n){for(var i,r=t.getBaseAxis(),o=t.getOtherAxis(r),a=r.onZero?0:o.scale.getExtent()[0],s=o.dim,l="x"===s||"radius"===s?1:0,h=e.stackedOn,u=e.get(s,n);h&&mh(h.get(s,n))===mh(u);){i=h;break;}var c=[];return c[l]=e.get(r.dim,n),c[1-l]=i?i.get(s,n,!0):a,t.dataToPoint(c);}function xh(t,e){var n=[];return e.diff(t).add(function(t){n.push({cmd:"+",idx:t});}).update(function(t,e){n.push({cmd:"=",idx:e,idx1:t});}).remove(function(t){n.push({cmd:"-",idx:t});}).execute(),n;}function _h(t){return isNaN(t[0])||isNaN(t[1]);}function wh(t,e,n,i,r,o,a,s,l,h,u){for(var c=0,d=n,f=0;i>f;f++){var g=e[d];if(d>=r||0>d)break;if(_h(g)){if(u){d+=o;continue;}break;}if(d===n)t[o>0?"moveTo":"lineTo"](g[0],g[1]),cy(fy,g);else if(l>0){var p=d+o,v=e[p];if(u)for(;v&&_h(e[p]);){p+=o,v=e[p];}var m=.5,y=e[c],v=e[p];if(!v||_h(v))cy(gy,g);else{_h(v)&&!u&&(v=g),X(dy,v,y);var x,_;if("x"===h||"y"===h){var w="x"===h?0:1;x=Math.abs(g[w]-y[w]),_=Math.abs(g[w]-v[w]);}else x=pc(g,y),_=pc(g,v);m=_/(_+x),uy(gy,g,dy,-l*(1-m));}ly(fy,fy,s),hy(fy,fy,a),ly(gy,gy,s),hy(gy,gy,a),t.bezierCurveTo(fy[0],fy[1],gy[0],gy[1],g[0],g[1]),uy(fy,g,dy,l*m);}else t.lineTo(g[0],g[1]);c=d,d+=o;}return f;}function bh(t,e){var n=[1/0,1/0],i=[-1/0,-1/0];if(e)for(var r=0;r<t.length;r++){var o=t[r];o[0]<n[0]&&(n[0]=o[0]),o[1]<n[1]&&(n[1]=o[1]),o[0]>i[0]&&(i[0]=o[0]),o[1]>i[1]&&(i[1]=o[1]);}return{min:e?n:i,max:e?i:n};}function Sh(t,e){if(t.length===e.length){for(var n=0;n<t.length;n++){var i=t[n],r=e[n];if(i[0]!==r[0]||i[1]!==r[1])return;}return!0;}}function Mh(t){return"number"==typeof t?t:t?.3:0;}function Th(t){var e=t.getGlobalExtent();if(t.onBand){var n=t.getBandWidth()/2-1,i=e[1]>e[0]?1:-1;e[0]+=i*n,e[1]-=i*n;}return e;}function Ih(t){return t>=0?1:-1;}function Ch(t,e){var n=t.getBaseAxis(),i=t.getOtherAxis(n),r=0;if(!n.onZero){var o=i.scale.getExtent();o[0]>0?r=o[0]:o[1]<0&&(r=o[1]);}var a=i.dim,s="x"===a||"radius"===a?1:0;return e.mapArray([a],function(i,o){for(var l,h=e.stackedOn;h&&Ih(h.get(a,o))===Ih(i);){l=h;break;}var u=[];return u[s]=e.get(n.dim,o),u[1-s]=l?l.get(a,o,!0):r,t.dataToPoint(u);},!0);}function Ah(t,e,n){var i=Th(t.getAxis("x")),r=Th(t.getAxis("y")),o=t.getBaseAxis().isHorizontal(),a=Math.min(i[0],i[1]),s=Math.min(r[0],r[1]),l=Math.max(i[0],i[1])-a,h=Math.max(r[0],r[1])-s,u=n.get("lineStyle.normal.width")||2,c=n.get("clipOverflow")?u/2:Math.max(l,h);o?(s-=c,h+=2*c):(a-=c,l+=2*c);var d=new Sg({shape:{x:a,y:s,width:l,height:h}});return e&&(d.shape[o?"width":"height"]=0,Oo(d,{shape:{width:l,height:h}},n)),d;}function Dh(t,e,n){var i=t.getAngleAxis(),r=t.getRadiusAxis(),o=r.getExtent(),a=i.getExtent(),s=Math.PI/180,l=new mg({shape:{cx:t.cx,cy:t.cy,r0:o[0],r:o[1],startAngle:-a[0]*s,endAngle:-a[1]*s,clockwise:i.inverse}});return e&&(l.shape.endAngle=-a[0]*s,Oo(l,{shape:{endAngle:-a[1]*s}},n)),l;}function kh(t,e,n){return"polar"===t.type?Dh(t,e,n):Ah(t,e,n);}function Ph(t,e,n){for(var i=e.getBaseAxis(),r="x"===i.dim||"radius"===i.dim?0:1,o=[],a=0;a<t.length-1;a++){var s=t[a+1],l=t[a];o.push(l);var h=[];switch(n){case"end":h[r]=s[r],h[1-r]=l[1-r],o.push(h);break;case"middle":var u=(l[r]+s[r])/2,c=[];h[r]=c[r]=u,h[1-r]=l[1-r],c[1-r]=s[1-r],o.push(h),o.push(c);break;default:h[r]=l[r],h[1-r]=s[1-r],o.push(h);}}return t[a]&&o.push(t[a]),o;}function Lh(t,e){var n=t.getVisual("visualMeta");if(n&&n.length&&t.count()){for(var i,r=n.length-1;r>=0;r--){if(n[r].dimension<2){i=n[r];break;}}if(i&&"cartesian2d"===e.type){var o=i.dimension,a=t.dimensions[o],s=e.getAxis(a),l=g(i.stops,function(t){return{coord:s.toGlobalCoord(s.dataToCoord(t.value)),color:t.color};}),h=l.length,u=i.outerColors.slice();h&&l[0].coord>l[h-1].coord&&(l.reverse(),u.reverse());var c=10,d=l[0].coord-c,p=l[h-1].coord+c,v=p-d;if(.001>v)return"transparent";f(l,function(t){t.offset=(t.coord-d)/v;}),l.push({offset:h?l[h-1].offset:.5,color:u[1]||"transparent"}),l.unshift({offset:h?l[0].offset:.5,color:u[0]||"transparent"});var m=new kg(0,0,0,0,l,!0);return m[a]=d,m[a+"2"]=p,m;}}}function Oh(t,e,n,i){var r=e.getData(),o=this.dataIndex,a=r.getName(o),s=e.get("selectedOffset");i.dispatchAction({type:"pieToggleSelect",from:t,name:a,seriesId:e.id}),r.each(function(t){zh(r.getItemGraphicEl(t),r.getItemLayout(t),e.isSelected(r.getName(t)),s,n);});}function zh(t,e,n,i,r){var o=(e.startAngle+e.endAngle)/2,a=Math.cos(o),s=Math.sin(o),l=n?i:0,h=[a*l,s*l];r?t.animate().when(200,{position:h}).start("bounceOut"):t.attr("position",h);}function Bh(t,e){function n(){o.ignore=o.hoverIgnore,a.ignore=a.hoverIgnore;}function i(){o.ignore=o.normalIgnore,a.ignore=a.normalIgnore;}td.call(this);var r=new mg({z2:2}),o=new bg(),a=new fg();this.add(r),this.add(o),this.add(a),this.updateData(t,e,!0),this.on("emphasis",n).on("normal",i).on("mouseover",n).on("mouseout",i);}function Eh(t,e,n,i,r,o,a){function s(e,n,i){for(var r=e;n>r;r++){if(t[r].y+=i,r>e&&n>r+1&&t[r+1].y>t[r].y+t[r].height)return void l(r,i/2);}l(n-1,i/2);}function l(e,n){for(var i=e;i>=0&&(t[i].y-=n,!(i>0&&t[i].y>t[i-1].y+t[i-1].height));i--){}}function h(t,e,n,i,r,o){for(var a=o>0?e?Number.MAX_VALUE:0:e?Number.MAX_VALUE:0,s=0,l=t.length;l>s;s++){if("center"!==t[s].position){var h=Math.abs(t[s].y-i),u=t[s].len,c=t[s].len2,d=r+u>h?Math.sqrt((r+u+c)*(r+u+c)-h*h):Math.abs(t[s].x-n);e&&d>=a&&(d=a-10),!e&&a>=d&&(d=a+10),t[s].x=n+d*o,a=d;}}}t.sort(function(t,e){return t.y-e.y;});for(var u,c=0,d=t.length,f=[],g=[],p=0;d>p;p++){u=t[p].y-c,0>u&&s(p,d,-u,r),c=t[p].y+t[p].height;}0>a-c&&l(d-1,c-a);for(var p=0;d>p;p++){t[p].y>=n?g.push(t[p]):f.push(t[p]);}h(f,!1,e,n,i,r),h(g,!0,e,n,i,r);}function Rh(t,e,n,i,r,o){for(var a=[],s=[],l=0;l<t.length;l++){t[l].x<e?a.push(t[l]):s.push(t[l]);}Eh(s,e,n,i,1,r,o),Eh(a,e,n,i,-1,r,o);for(var l=0;l<t.length;l++){var h=t[l].linePoints;if(h){var u=h[1][0]-h[2][0];h[2][0]=t[l].x<e?t[l].x+3:t[l].x-3,h[1][1]=h[2][1]=t[l].y,h[1][0]=h[2][0]+u;}}}function Nh(t,e,n){var i,r={},o="toggleSelected"===t;return n.eachComponent("legend",function(n){o&&null!=i?n[i?"select":"unSelect"](e.name):(n[t](e.name),i=n.isSelected(e.name));var a=n.getData();f(a,function(t){var e=t.get("name");if("\n"!==e&&""!==e){var i=n.isSelected(e);r[e]=r.hasOwnProperty(e)?r[e]&&i:i;}});}),{name:e.name,selected:r};}function Fh(t,e){var n=$d(e.get("padding")),i=e.getItemStyle(["color","opacity"]);i.fill=e.get("backgroundColor");var t=new Sg({shape:{x:t.x-n[3],y:t.y-n[0],width:t.width+n[1]+n[3],height:t.height+n[0]+n[2],r:e.get("borderRadius")},style:i,silent:!0,z2:-1});return t;}function Gh(t,e){e.dispatchAction({type:"legendToggleSelect",name:t});}function Hh(t,e,n){var i=n.getZr().storage.getDisplayList()[0];i&&i.useHoverLayer||t.get("legendHoverLink")&&n.dispatchAction({type:"highlight",seriesName:t.name,name:e});}function Wh(t,e,n){var i=n.getZr().storage.getDisplayList()[0];i&&i.useHoverLayer||t.get("legendHoverLink")&&n.dispatchAction({type:"downplay",seriesName:t.name,name:e});}function Vh(t,e,n){var i=t.getOrient(),r=[1,1];r[i.index]=0,ha(e,n,{type:"box",ignoreSize:r});}function Xh(t,e,n,i,r){var o=t.axis;if(!o.scale.isBlank()&&o.containData(e)){if(!t.involveSeries)return void n.showPointer(t,e);var s=qh(e,t),l=s.payloadBatch,h=s.snapToValue;l[0]&&null==r.seriesIndex&&a(r,l[0]),!i&&t.snap&&o.containData(h)&&null!=h&&(e=h),n.showPointer(t,e,l,r),n.showTooltip(t,s,h);}}function qh(t,e){var n=e.axis,i=n.dim,r=t,o=[],a=Number.MAX_VALUE,s=-1;return Xy(e.seriesModels,function(e){var l,h,u=e.coordDimToDataDim(i);if(e.getAxisTooltipData){var c=e.getAxisTooltipData(u,t,n);h=c.dataIndices,l=c.nestestValue;}else{if(h=e.getData().indicesOfNearest(u[0],t,!1,"category"===n.type?.5:null),!h.length)return;l=e.getData().get(u[0],h[0]);}if(null!=l&&isFinite(l)){var d=t-l,f=Math.abs(d);a>=f&&((a>f||d>=0&&0>s)&&(a=f,s=d,r=l,o.length=0),Xy(h,function(t){o.push({seriesIndex:e.seriesIndex,dataIndexInside:t,dataIndex:e.getData().getRawIndex(t)});}));}}),{payloadBatch:o,snapToValue:r};}function Yh(t,e,n,i){t[e.key]={value:n,payloadBatch:i};}function Zh(t,e,n,i){var r=n.payloadBatch,o=e.axis,a=o.model,s=e.axisPointerModel;if(e.triggerTooltip&&r.length){var l=e.coordSys.model,h=ah(l),u=t.map[h];u||(u=t.map[h]={coordSysId:l.id,coordSysIndex:l.componentIndex,coordSysType:l.type,coordSysMainType:l.mainType,dataByAxis:[]},t.list.push(u)),u.dataByAxis.push({axisDim:o.dim,axisIndex:a.componentIndex,axisType:a.type,axisId:a.id,value:i,valueLabelOpt:{precision:s.get("label.precision"),formatter:s.get("label.formatter")},seriesDataIndices:r.slice()});}}function jh(t,e,n){var i=n.axesInfo=[];Xy(e,function(e,n){var r=e.axisPointerModel.option,o=t[n];o?(!e.useHandle&&(r.status="show"),r.value=o.value,r.seriesDataIndices=(o.payloadBatch||[]).slice()):!e.useHandle&&(r.status="hide"),"show"===r.status&&i.push({axisDim:e.axis.dim,axisIndex:e.axis.model.componentIndex,value:r.value});});}function Uh(t,e,n,i){if(Jh(e)||!t.list.length)return void i({type:"hideTip"});var r=((t.list[0].dataByAxis[0]||{}).seriesDataIndices||[])[0]||{};i({type:"showTip",escapeConnect:!0,x:e[0],y:e[1],tooltipOption:n.tooltipOption,position:n.position,dataIndexInside:r.dataIndexInside,dataIndex:r.dataIndex,seriesIndex:r.seriesIndex,dataByCoordSys:t.list});}function $h(t,e,n){var i=n.getZr(),r="axisPointerLastHighlights",o=Yy(i)[r]||{},a=Yy(i)[r]={};Xy(t,function(t){var e=t.axisPointerModel.option;"show"===e.status&&Xy(e.seriesDataIndices,function(t){var e=t.seriesIndex+" | "+t.dataIndex;a[e]=t;});});var s=[],l=[];f(o,function(t,e){!a[e]&&l.push(t);}),f(a,function(t,e){!o[e]&&s.push(t);}),l.length&&n.dispatchAction({type:"downplay",escapeConnect:!0,batch:l}),s.length&&n.dispatchAction({type:"highlight",escapeConnect:!0,batch:s});}function Kh(t,e){for(var n=0;n<(t||[]).length;n++){var i=t[n];if(e.axis.dim===i.axisDim&&e.axis.model.componentIndex===i.axisIndex)return i;}}function Qh(t){var e=t.axis.model,n={},i=n.axisDim=t.axis.dim;return n.axisIndex=n[i+"AxisIndex"]=e.componentIndex,n.axisName=n[i+"AxisName"]=e.name,n.axisId=n[i+"AxisId"]=e.id,n;}function Jh(t){return!t||null==t[0]||isNaN(t[0])||null==t[1]||isNaN(t[1]);}function tu(t,e,n){if(!Uu.node){var i=e.getZr();jy(i).records||(jy(i).records={}),eu(i,e);var r=jy(i).records[t]||(jy(i).records[t]={});r.handler=n;}}function eu(t,e){function n(n,i){t.on(n,function(n){var r=ou(e);Uy(jy(t).records,function(t){t&&i(t,n,r.dispatchAction);}),nu(r.pendings,e);});}jy(t).initialized||(jy(t).initialized=!0,n("click",x(ru,"click")),n("mousemove",x(ru,"mousemove")),n("globalout",iu));}function nu(t,e){var n,i=t.showTip.length,r=t.hideTip.length;i?n=t.showTip[i-1]:r&&(n=t.hideTip[r-1]),n&&(n.dispatchAction=null,e.dispatchAction(n));}function iu(t,e,n){t.handler("leave",null,n);}function ru(t,e,n,i){e.handler(t,n,i);}function ou(t){var e={showTip:[],hideTip:[]},n=function n(i){var r=e[i.type];r?r.push(i):(i.dispatchAction=n,t.dispatchAction(i));};return{dispatchAction:n,pendings:e};}function au(t,e){if(!Uu.node){var n=e.getZr(),i=(jy(n).records||{})[t];i&&(jy(n).records[t]=null);}}function su(){}function lu(t,e,n,i){hu(Ky(n).lastProp,i)||(Ky(n).lastProp=i,e?Lo(n,i,t):(n.stopAnimation(),n.attr(i)));}function hu(t,e){if(S(t)&&S(e)){var n=!0;return f(e,function(e,i){n=n&&hu(t[i],e);}),!!n;}return t===e;}function uu(t,e){t[e.get("label.show")?"show":"hide"]();}function cu(t){return{position:t.position.slice(),rotation:t.rotation||0};}function du(t,e,n){var i=e.get("z"),r=e.get("zlevel");t&&t.traverse(function(t){"group"!==t.type&&(null!=i&&(t.z=i),null!=r&&(t.zlevel=r),t.silent=n);});}function fu(t){var e,n=t.get("type"),i=t.getModel(n+"Style");return"line"===n?(e=i.getLineStyle(),e.fill=null):"shadow"===n&&(e=i.getAreaStyle(),e.stroke=null),e;}function gu(t,e,n,i,r){var o=n.get("value"),a=vu(o,e.axis,e.ecModel,n.get("seriesDataIndices"),{precision:n.get("label.precision"),formatter:n.get("label.formatter")}),s=n.getModel("label"),l=$d(s.get("padding")||0),h=s.getFont(),u=xn(a,h),c=r.position,d=u.width+l[1]+l[3],f=u.height+l[0]+l[2],g=r.align;"right"===g&&(c[0]-=d),"center"===g&&(c[0]-=d/2);var p=r.verticalAlign;"bottom"===p&&(c[1]-=f),"middle"===p&&(c[1]-=f/2),pu(c,d,f,i);var v=s.get("backgroundColor");v&&"auto"!==v||(v=e.get("axisLine.lineStyle.color")),t.label={shape:{x:0,y:0,width:d,height:f,r:s.get("borderRadius")},position:c.slice(),style:{text:a,textFont:h,textFill:s.getTextColor(),textPosition:"inside",fill:v,stroke:s.get("borderColor")||"transparent",lineWidth:s.get("borderWidth")||0,shadowBlur:s.get("shadowBlur"),shadowColor:s.get("shadowColor"),shadowOffsetX:s.get("shadowOffsetX"),shadowOffsetY:s.get("shadowOffsetY")},z2:10};}function pu(t,e,n,i){var r=i.getWidth(),o=i.getHeight();t[0]=Math.min(t[0]+e,r)-e,t[1]=Math.min(t[1]+n,o)-n,t[0]=Math.max(t[0],0),t[1]=Math.max(t[1],0);}function vu(t,e,n,i,r){var o=e.scale.getLabel(t,{precision:r.precision}),a=r.formatter;if(a){var s={value:rl(e,t),seriesData:[]};f(i,function(t){var e=n.getSeriesByIndex(t.seriesIndex),i=t.dataIndexInside,r=e&&e.getDataParams(i);r&&s.seriesData.push(r);}),b(a)?o=a.replace("{value}",o):w(a)&&(o=a(s));}return o;}function mu(t,e,n){var i=ue();return pe(i,i,n.rotation),ge(i,i,n.position),Bo([t.dataToCoord(e),(n.labelOffset||0)+(n.labelDirection||1)*(n.labelMargin||0)],i);}function yu(t,e,n,i,r,o){var a=Hm.innerTextLayout(n.rotation,0,n.labelDirection);n.labelMargin=r.get("label.margin"),gu(e,i,r,o,{position:mu(i.axis,t,n),align:a.textAlign,verticalAlign:a.textVerticalAlign});}function xu(t,e,n){return n=n||0,{x1:t[n],y1:t[1-n],x2:e[n],y2:e[1-n]};}function _u(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]};}function wu(t,e){var n={};return n[e.dim+"AxisIndex"]=e.index,t.getCartesian(n);}function bu(t){return"x"===t.dim?0:1;}function Su(t){var e="cubic-bezier(0.23, 1, 0.32, 1)",n="left "+t+"s "+e+",top "+t+"s "+e;return g(rx,function(t){return t+"transition:"+n;}).join(";");}function Mu(t){var e=[],n=t.get("fontSize"),i=t.getTextColor();return i&&e.push("color:"+i),e.push("font:"+t.getFont()),n&&e.push("line-height:"+Math.round(3*n/2)+"px"),nx(["decoration","align"],function(n){var i=t.get(n);i&&e.push("text-"+n+":"+i);}),e.join(";");}function Tu(t){var e=[],n=t.get("transitionDuration"),i=t.get("backgroundColor"),r=t.getModel("textStyle"),o=t.get("padding");return n&&e.push(Su(n)),i&&(Uu.canvasSupported?e.push("background-Color:"+i):(e.push("background-Color:#"+ze(i)),e.push("filter:alpha(opacity=70)"))),nx(["width","color","radius"],function(n){var i="border-"+n,r=ix(i),o=t.get(r);null!=o&&e.push(i+":"+o+("color"===n?"":"px"));}),e.push(Mu(r)),null!=o&&e.push("padding:"+$d(o).join("px ")+"px"),e.join(";")+";";}function Iu(t,e){var n=document.createElement("div"),i=this._zr=e.getZr();this.el=n,this._x=e.getWidth()/2,this._y=e.getHeight()/2,t.appendChild(n),this._container=t,this._show=!1,this._hideTimeout;var r=this;n.onmouseenter=function(){r._enterable&&(clearTimeout(r._hideTimeout),r._show=!0),r._inContent=!0;},n.onmousemove=function(e){if(e=e||window.event,!r._enterable){var n=i.handler;fi(t,e,!0),n.dispatch("mousemove",e);}},n.onmouseleave=function(){r._enterable&&r._show&&r.hideLater(r._hideDelay),r._inContent=!1;};}function Cu(t){for(var e=t.pop();t.length;){var n=t.pop();n&&(n instanceof Ho&&(n=n.get("tooltip",!0)),"string"==typeof n&&(n={formatter:n}),e=new Ho(n,e,e.ecModel));}return e;}function Au(t,e){return t.dispatchAction||y(e.dispatchAction,e);}function Du(t,e,n,i,r,o,a){var s=Pu(n),l=s.width,h=s.height;return null!=o&&(t+l+o>i?t-=l+o:t+=o),null!=a&&(e+h+a>r?e-=h+a:e+=a),[t,e];}function ku(t,e,n,i,r){var o=Pu(n),a=o.width,s=o.height;return t=Math.min(t+a,i)-a,e=Math.min(e+s,r)-s,t=Math.max(t,0),e=Math.max(e,0),[t,e];}function Pu(t){var e=t.clientWidth,n=t.clientHeight;if(document.defaultView&&document.defaultView.getComputedStyle){var i=document.defaultView.getComputedStyle(t);i&&(e+=parseInt(i.paddingLeft,10)+parseInt(i.paddingRight,10)+parseInt(i.borderLeftWidth,10)+parseInt(i.borderRightWidth,10),n+=parseInt(i.paddingTop,10)+parseInt(i.paddingBottom,10)+parseInt(i.borderTopWidth,10)+parseInt(i.borderBottomWidth,10));}return{width:e,height:n};}function Lu(t,e,n){var i=n[0],r=n[1],o=5,a=0,s=0,l=e.width,h=e.height;switch(t){case"inside":a=e.x+l/2-i/2,s=e.y+h/2-r/2;break;case"top":a=e.x+l/2-i/2,s=e.y-r-o;break;case"bottom":a=e.x+l/2-i/2,s=e.y+h+o;break;case"left":a=e.x-i-o,s=e.y+h/2-r/2;break;case"right":a=e.x+l+o,s=e.y+h/2-r/2;}return[a,s];}function Ou(t){return"center"===t||"middle"===t;}function zu(t){qo(t.label,["show"]);}function Bu(t){return!(isNaN(parseFloat(t.x))&&isNaN(parseFloat(t.y)));}function Eu(t){return!isNaN(parseFloat(t.x))&&!isNaN(parseFloat(t.y));}function Ru(t,e,n){var i=-1;do{i=Math.max(zi(t.get(e,n)),i),t=t.stackedOn;}while(t);return i;}function Nu(t,e,n,i,r,o){var a=[],s=Vu(e,i,t),l=e.indicesOfNearest(i,s,!0)[0];a[r]=e.get(n,l,!0),a[o]=e.get(i,l,!0);var h=Ru(e,i,l);return h=Math.min(h,20),h>=0&&(a[o]=+a[o].toFixed(h)),a;}function Fu(t,e){var n=t.getData(),r=t.coordinateSystem;if(e&&!Eu(e)&&!_(e.coord)&&r){var o=r.dimensions,a=Gu(e,n,r,t);if(e=i(e),e.type&&px[e.type]&&a.baseAxis&&a.valueAxis){var s=fx(o,a.baseAxis.dim),l=fx(o,a.valueAxis.dim);e.coord=px[e.type](n,a.baseDataDim,a.valueDataDim,s,l),e.value=e.coord[l];}else{for(var h=[null!=e.xAxis?e.xAxis:e.radiusAxis,null!=e.yAxis?e.yAxis:e.angleAxis],u=0;2>u;u++){if(px[h[u]]){var c=t.coordDimToDataDim(o[u])[0];h[u]=Vu(n,c,h[u]);}}e.coord=h;}}return e;}function Gu(t,e,n,i){var r={};return null!=t.valueIndex||null!=t.valueDim?(r.valueDataDim=null!=t.valueIndex?e.getDimension(t.valueIndex):t.valueDim,r.valueAxis=n.getAxis(i.dataDimToCoordDim(r.valueDataDim)),r.baseAxis=n.getOtherAxis(r.valueAxis),r.baseDataDim=i.coordDimToDataDim(r.baseAxis.dim)[0]):(r.baseAxis=i.getBaseAxis(),r.valueAxis=n.getOtherAxis(r.baseAxis),r.baseDataDim=i.coordDimToDataDim(r.baseAxis.dim)[0],r.valueDataDim=i.coordDimToDataDim(r.valueAxis.dim)[0]),r;}function Hu(t,e){return t&&t.containData&&e.coord&&!Bu(e)?t.containData(e.coord):!0;}function Wu(t,e,n,i){return 2>i?t.coord&&t.coord[i]:t.value;}function Vu(t,e,n){if("average"===n){var i=0,r=0;return t.each(e,function(t){isNaN(t)||(i+=t,r++);},!0),i/r;}return t.getDataExtent(e,!0)["max"===n?1:0];}function Xu(t,e,n){var i=e.coordinateSystem;t.each(function(r){var o,a=t.getItemModel(r),s=Pi(a.get("x"),n.getWidth()),l=Pi(a.get("y"),n.getHeight());if(isNaN(s)||isNaN(l)){if(e.getMarkerPosition)o=e.getMarkerPosition(t.getValues(t.dimensions,r));else if(i){var h=t.get(i.dimensions[0],r),u=t.get(i.dimensions[1],r);o=i.dataToPoint([h,u]);}}else o=[s,l];isNaN(s)||(o[0]=s),isNaN(l)||(o[1]=l),t.setItemLayout(r,o);});}function qu(t,e,n){var i;i=t?g(t&&t.dimensions,function(t){var n=e.getData().getDimensionInfo(e.coordDimToDataDim(t)[0])||{};return n.name=t,n;}):[{name:"value",type:"float"}];var r=new Tv(i,n),o=g(n.get("data"),x(Fu,e));return t&&(o=v(o,x(Hu,t))),r.initData(o,null,t?Wu:function(t){return t.value;}),r;}var Yu=2311,Zu=function Zu(){return Yu++;},ju={};ju="undefined"==typeof navigator?{browser:{},os:{},node:!0,canvasSupported:!0,svgSupported:!0}:e(navigator.userAgent);var Uu=ju,$u={"[object Function]":1,"[object RegExp]":1,"[object Date]":1,"[object Error]":1,"[object CanvasGradient]":1,"[object CanvasPattern]":1,"[object Image]":1,"[object Canvas]":1},Ku={"[object Int8Array]":1,"[object Uint8Array]":1,"[object Uint8ClampedArray]":1,"[object Int16Array]":1,"[object Uint16Array]":1,"[object Int32Array]":1,"[object Uint32Array]":1,"[object Float32Array]":1,"[object Float64Array]":1},Qu=Object.prototype.toString,Ju=Array.prototype,tc=Ju.forEach,ec=Ju.filter,nc=Ju.slice,ic=Ju.map,rc=Ju.reduce,oc={},ac=function ac(){return oc.createCanvas();};oc.createCanvas=function(){return document.createElement("canvas");};var sc,lc="__ec_primitive__",hc="_ec_",uc=4;B.prototype={constructor:B,get:function get(t){return this[hc+t];},set:function set(t,e){return this[hc+t]=e,e;},each:function each(t,e){void 0!==e&&(t=y(t,e));for(var n in this){this.hasOwnProperty(n)&&t(this[n],n.slice(uc));}},removeKey:function removeKey(t){delete this[hc+t];}};var cc=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({$override:n,clone:i,merge:r,mergeAll:o,extend:a,defaults:s,createCanvas:ac,getContext:l,indexOf:h,inherits:u,mixin:c,isArrayLike:d,each:f,map:g,reduce:p,filter:v,find:m,bind:y,curry:x,isArray:_,isFunction:w,isString:b,isObject:S,isBuiltInObject:M,isDom:T,eqNaN:I,retrieve:C,retrieve2:A,retrieve3:D,slice:k,normalizeCssArray:P,assert:L,setAsPrimitive:O,isPrimitive:z,createHashMap:E,noop:R}),dc="undefined"==typeof Float32Array?Array:Float32Array,fc=q,gc=Y,pc=Q,vc=J,mc=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({create:N,copy:F,clone:G,set:H,add:W,scaleAndAdd:V,sub:X,len:q,length:fc,lenSquare:Y,lengthSquare:gc,mul:Z,div:j,dot:U,scale:$,normalize:K,distance:Q,dist:pc,distanceSquare:J,distSquare:vc,negate:te,lerp:ee,applyTransform:ne,min:ie,max:re});oe.prototype={constructor:oe,_dragStart:function _dragStart(t){var e=t.target;e&&e.draggable&&(this._draggingTarget=e,e.dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.dispatchToElement(ae(e,t),"dragstart",t.event));},_drag:function _drag(t){var e=this._draggingTarget;if(e){var n=t.offsetX,i=t.offsetY,r=n-this._x,o=i-this._y;this._x=n,this._y=i,e.drift(r,o,t),this.dispatchToElement(ae(e,t),"drag",t.event);var a=this.findHover(n,i,e).target,s=this._dropTarget;this._dropTarget=a,e!==a&&(s&&a!==s&&this.dispatchToElement(ae(s,t),"dragleave",t.event),a&&a!==s&&this.dispatchToElement(ae(a,t),"dragenter",t.event));}},_dragEnd:function _dragEnd(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.dispatchToElement(ae(e,t),"dragend",t.event),this._dropTarget&&this.dispatchToElement(ae(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null;}};var yc=Array.prototype.slice,xc=function xc(){this._$handlers={};};xc.prototype={constructor:xc,one:function one(t,e,n){var i=this._$handlers;if(!e||!t)return this;i[t]||(i[t]=[]);for(var r=0;r<i[t].length;r++){if(i[t][r].h===e)return this;}return i[t].push({h:e,one:!0,ctx:n||this}),this;},on:function on(t,e,n){var i=this._$handlers;if(!e||!t)return this;i[t]||(i[t]=[]);for(var r=0;r<i[t].length;r++){if(i[t][r].h===e)return this;}return i[t].push({h:e,one:!1,ctx:n||this}),this;},isSilent:function isSilent(t){var e=this._$handlers;return e[t]&&e[t].length;},off:function off(t,e){var n=this._$handlers;if(!t)return this._$handlers={},this;if(e){if(n[t]){for(var i=[],r=0,o=n[t].length;o>r;r++){n[t][r].h!=e&&i.push(n[t][r]);}n[t]=i;}n[t]&&0===n[t].length&&delete n[t];}else delete n[t];return this;},trigger:function trigger(t){if(this._$handlers[t]){var e=arguments,n=e.length;n>3&&(e=yc.call(e,1));for(var i=this._$handlers[t],r=i.length,o=0;r>o;){switch(n){case 1:i[o].h.call(i[o].ctx);break;case 2:i[o].h.call(i[o].ctx,e[1]);break;case 3:i[o].h.call(i[o].ctx,e[1],e[2]);break;default:i[o].h.apply(i[o].ctx,e);}i[o].one?(i.splice(o,1),r--):o++;}}return this;},triggerWithContext:function triggerWithContext(t){if(this._$handlers[t]){var e=arguments,n=e.length;n>4&&(e=yc.call(e,1,e.length-1));for(var i=e[e.length-1],r=this._$handlers[t],o=r.length,a=0;o>a;){switch(n){case 1:r[a].h.call(i);break;case 2:r[a].h.call(i,e[1]);break;case 3:r[a].h.call(i,e[1],e[2]);break;default:r[a].h.apply(i,e);}r[a].one?(r.splice(a,1),o--):a++;}}return this;}};var _c="silent";le.prototype.dispose=function(){};var wc=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],bc=function bc(t,e,n,i){xc.call(this),this.storage=t,this.painter=e,this.painterRoot=i,n=n||new le(),this.proxy=n,n.handler=this,this._hovered={},this._lastTouchMoment,this._lastX,this._lastY,oe.call(this),f(wc,function(t){n.on&&n.on(t,this[t],this);},this);};bc.prototype={constructor:bc,mousemove:function mousemove(t){var e=t.zrX,n=t.zrY,i=this._hovered,r=i.target;r&&!r.__zr&&(i=this.findHover(i.x,i.y),r=i.target);var o=this._hovered=this.findHover(e,n),a=o.target,s=this.proxy;s.setCursor&&s.setCursor(a?a.cursor:"default"),r&&a!==r&&this.dispatchToElement(i,"mouseout",t),this.dispatchToElement(o,"mousemove",t),a&&a!==r&&this.dispatchToElement(o,"mouseover",t);},mouseout:function mouseout(t){this.dispatchToElement(this._hovered,"mouseout",t);var e,n=t.toElement||t.relatedTarget;do{n=n&&n.parentNode;}while(n&&9!=n.nodeType&&!(e=n===this.painterRoot));!e&&this.trigger("globalout",{event:t});},resize:function resize(){this._hovered={};},dispatch:function dispatch(t,e){var n=this[t];n&&n.call(this,e);},dispose:function dispose(){this.proxy.dispose(),this.storage=this.proxy=this.painter=null;},setCursorStyle:function setCursorStyle(t){var e=this.proxy;e.setCursor&&e.setCursor(t);},dispatchToElement:function dispatchToElement(t,e,n){t=t||{};var i=t.target;if(!i||!i.silent){for(var r="on"+e,o=se(e,t,n);i&&(i[r]&&(o.cancelBubble=i[r].call(i,o)),i.trigger(e,o),i=i.parent,!o.cancelBubble);){}o.cancelBubble||(this.trigger(e,o),this.painter&&this.painter.eachOtherLayer(function(t){"function"==typeof t[r]&&t[r].call(t,o),t.trigger&&t.trigger(e,o);}));}},findHover:function findHover(t,e,n){for(var i=this.storage.getDisplayList(),r={x:t,y:e},o=i.length-1;o>=0;o--){var a;if(i[o]!==n&&!i[o].ignore&&(a=he(i[o],t,e))&&(!r.topTarget&&(r.topTarget=i[o]),a!==_c)){r.target=i[o];break;}}return r;}},f(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){bc.prototype[t]=function(e){var n=this.findHover(e.zrX,e.zrY),i=n.target;if("mousedown"===t)this._downEl=i,this._downPoint=[e.zrX,e.zrY],this._upEl=i;else if("mosueup"===t)this._upEl=i;else if("click"===t){if(this._downEl!==this._upEl||!this._downPoint||pc(this._downPoint,[e.zrX,e.zrY])>4)return;this._downPoint=null;}this.dispatchToElement(n,t,e);};}),c(bc,xc),c(bc,oe);var Sc="undefined"==typeof Float32Array?Array:Float32Array,Mc=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({create:ue,identity:ce,copy:de,mul:fe,translate:ge,rotate:pe,scale:ve,invert:me}),Tc=ce,Ic=5e-5,Cc=function Cc(t){t=t||{},t.position||(this.position=[0,0]),null==t.rotation&&(this.rotation=0),t.scale||(this.scale=[1,1]),this.origin=this.origin||null;},Ac=Cc.prototype;Ac.transform=null,Ac.needLocalTransform=function(){return ye(this.rotation)||ye(this.position[0])||ye(this.position[1])||ye(this.scale[0]-1)||ye(this.scale[1]-1);},Ac.updateTransform=function(){var t=this.parent,e=t&&t.transform,n=this.needLocalTransform(),i=this.transform;return n||e?(i=i||ue(),n?this.getLocalTransform(i):Tc(i),e&&(n?fe(i,t.transform,i):de(i,t.transform)),this.transform=i,this.invTransform=this.invTransform||ue(),void me(this.invTransform,i)):void(i&&Tc(i));},Ac.getLocalTransform=function(t){return Cc.getLocalTransform(this,t);},Ac.setTransform=function(t){var e=this.transform,n=t.dpr||1;e?t.setTransform(n*e[0],n*e[1],n*e[2],n*e[3],n*e[4],n*e[5]):t.setTransform(n,0,0,n,0,0);},Ac.restoreTransform=function(t){var e=t.dpr||1;t.setTransform(e,0,0,e,0,0);};var Dc=[];Ac.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(fe(Dc,t.invTransform,e),e=Dc);var n=e[0]*e[0]+e[1]*e[1],i=e[2]*e[2]+e[3]*e[3],r=this.position,o=this.scale;ye(n-1)&&(n=Math.sqrt(n)),ye(i-1)&&(i=Math.sqrt(i)),e[0]<0&&(n=-n),e[3]<0&&(i=-i),r[0]=e[4],r[1]=e[5],o[0]=n,o[1]=i,this.rotation=Math.atan2(-e[1]/i,e[0]/n);}},Ac.getGlobalScale=function(){var t=this.transform;if(!t)return[1,1];var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]),n=Math.sqrt(t[2]*t[2]+t[3]*t[3]);return t[0]<0&&(e=-e),t[3]<0&&(n=-n),[e,n];},Ac.transformCoordToLocal=function(t,e){var n=[t,e],i=this.invTransform;return i&&ne(n,n,i),n;},Ac.transformCoordToGlobal=function(t,e){var n=[t,e],i=this.transform;return i&&ne(n,n,i),n;},Cc.getLocalTransform=function(t,e){e=e||[],Tc(e);var n=t.origin,i=t.scale||[1,1],r=t.rotation||0,o=t.position||[0,0];return n&&(e[4]-=n[0],e[5]-=n[1]),ve(e,e,i),r&&pe(e,e,r),n&&(e[4]+=n[0],e[5]+=n[1]),e[4]+=o[0],e[5]+=o[1],e;};var kc={linear:function linear(t){return t;},quadraticIn:function quadraticIn(t){return t*t;},quadraticOut:function quadraticOut(t){return t*(2-t);},quadraticInOut:function quadraticInOut(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1);},cubicIn:function cubicIn(t){return t*t*t;},cubicOut:function cubicOut(t){return--t*t*t+1;},cubicInOut:function cubicInOut(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2);},quarticIn:function quarticIn(t){return t*t*t*t;},quarticOut:function quarticOut(t){return 1- --t*t*t*t;},quarticInOut:function quarticInOut(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2);},quinticIn:function quinticIn(t){return t*t*t*t*t;},quinticOut:function quinticOut(t){return--t*t*t*t*t+1;},quinticInOut:function quinticInOut(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2);},sinusoidalIn:function sinusoidalIn(t){return 1-Math.cos(t*Math.PI/2);},sinusoidalOut:function sinusoidalOut(t){return Math.sin(t*Math.PI/2);},sinusoidalInOut:function sinusoidalInOut(t){return .5*(1-Math.cos(Math.PI*t));},exponentialIn:function exponentialIn(t){return 0===t?0:Math.pow(1024,t-1);},exponentialOut:function exponentialOut(t){return 1===t?1:1-Math.pow(2,-10*t);},exponentialInOut:function exponentialInOut(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2);},circularIn:function circularIn(t){return 1-Math.sqrt(1-t*t);},circularOut:function circularOut(t){return Math.sqrt(1- --t*t);},circularInOut:function circularInOut(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1);},elasticIn:function elasticIn(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),-(n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)));},elasticOut:function elasticOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/i)+1);},elasticInOut:function elasticInOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?-.5*n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i):n*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)*.5+1);},backIn:function backIn(t){var e=1.70158;return t*t*((e+1)*t-e);},backOut:function backOut(t){var e=1.70158;return--t*t*((e+1)*t+e)+1;},backInOut:function backInOut(t){var e=2.5949095;return(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2);},bounceIn:function bounceIn(t){return 1-kc.bounceOut(1-t);},bounceOut:function bounceOut(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;},bounceInOut:function bounceInOut(t){return .5>t?.5*kc.bounceIn(2*t):.5*kc.bounceOut(2*t-1)+.5;}};xe.prototype={constructor:xe,step:function step(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)return void(this._pausedTime+=e);var n=(t-this._startTime-this._pausedTime)/this._life;if(!(0>n)){n=Math.min(n,1);var i=this.easing,r="string"==typeof i?kc[i]:i,o="function"==typeof r?r(n):n;return this.fire("frame",o),1==n?this.loop?(this.restart(t),"restart"):(this._needsRemove=!0,"destroy"):null;}},restart:function restart(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0,this._needsRemove=!1;},fire:function fire(t,e){t="on"+t,this[t]&&this[t](this._target,e);},pause:function pause(){this._paused=!0;},resume:function resume(){this._paused=!1;}};var Pc=function Pc(){this.head=null,this.tail=null,this._len=0;},Lc=Pc.prototype;Lc.insert=function(t){var e=new Oc(t);return this.insertEntry(e),e;},Lc.insertEntry=function(t){this.head?(this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++;},Lc.remove=function(t){var e=t.prev,n=t.next;e?e.next=n:this.head=n,n?n.prev=e:this.tail=e,t.next=t.prev=null,this._len--;},Lc.len=function(){return this._len;},Lc.clear=function(){this.head=this.tail=null,this._len=0;};var Oc=function Oc(t){this.value=t,this.next,this.prev;},zc=function zc(t){this._list=new Pc(),this._map={},this._maxSize=t||10,this._lastRemovedEntry=null;},Bc=zc.prototype;Bc.put=function(t,e){var n=this._list,i=this._map,r=null;if(null==i[t]){var o=n.len(),a=this._lastRemovedEntry;if(o>=this._maxSize&&o>0){var s=n.head;n.remove(s),delete i[s.key],r=s.value,this._lastRemovedEntry=s;}a?a.value=e:a=new Oc(e),a.key=t,n.insertEntry(a),i[t]=a;}return r;},Bc.get=function(t){var e=this._map[t],n=this._list;return null!=e?(e!==n.tail&&(n.remove(e),n.insertEntry(e)),e.value):void 0;},Bc.clear=function(){this._list.clear(),this._map={};};var Ec={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]},Rc=new zc(20),Nc=null,Fc=Be,Gc=Ee,Hc=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({parse:ke,lift:Oe,toHex:ze,fastLerp:Be,fastMapToColor:Fc,lerp:Ee,mapToColor:Gc,modifyHSL:Re,modifyAlpha:Ne,stringify:Fe}),Wc=Array.prototype.slice,Vc=function Vc(t,e,n,i){this._tracks={},this._target=t,this._loop=e||!1,this._getter=n||Ge,this._setter=i||He,this._clipCount=0,this._delay=0,this._doneList=[],this._onframeList=[],this._clipList=[];};Vc.prototype={when:function when(t,e){var n=this._tracks;for(var i in e){if(e.hasOwnProperty(i)){if(!n[i]){n[i]=[];var r=this._getter(this._target,i);if(null==r)continue;0!==t&&n[i].push({time:0,value:Ue(r)});}n[i].push({time:t,value:e[i]});}}return this;},during:function during(t){return this._onframeList.push(t),this;},pause:function pause(){for(var t=0;t<this._clipList.length;t++){this._clipList[t].pause();}this._paused=!0;},resume:function resume(){for(var t=0;t<this._clipList.length;t++){this._clipList[t].resume();}this._paused=!1;},isPaused:function isPaused(){return!!this._paused;},_doneCallback:function _doneCallback(){this._tracks={},this._clipList.length=0;for(var t=this._doneList,e=t.length,n=0;e>n;n++){t[n].call(this);}},start:function start(t,e){var n,i=this,r=0,o=function o(){r--,r||i._doneCallback();};for(var a in this._tracks){if(this._tracks.hasOwnProperty(a)){var s=Qe(this,t,o,this._tracks[a],a,e);s&&(this._clipList.push(s),r++,this.animation&&this.animation.addClip(s),n=s);}}if(n){var l=n.onframe;n.onframe=function(t,e){l(t,e);for(var n=0;n<i._onframeList.length;n++){i._onframeList[n](t,e);}};}return r||this._doneCallback(),this;},stop:function stop(t){for(var e=this._clipList,n=this.animation,i=0;i<e.length;i++){var r=e[i];t&&r.onframe(this._target,1),n&&n.removeClip(r);}e.length=0;},delay:function delay(t){return this._delay=t,this;},done:function done(t){return t&&this._doneList.push(t),this;},getClips:function getClips(){return this._clipList;}};var Xc=1;"undefined"!=typeof window&&(Xc=Math.max(window.devicePixelRatio||1,1));var qc=0,Yc=Xc,Zc=function Zc(){};1===qc?Zc=function Zc(){for(var t in arguments){throw new Error(arguments[t]);}}:qc>1&&(Zc=function Zc(){for(var t in arguments){console.log(arguments[t]);}});var jc=Zc,Uc=function Uc(){this.animators=[];};Uc.prototype={constructor:Uc,animate:function animate(t,e){var n,i=!1,r=this,o=this.__zr;if(t){var a=t.split("."),s=r;i="shape"===a[0];for(var l=0,u=a.length;u>l;l++){s&&(s=s[a[l]]);}s&&(n=s);}else n=r;if(!n)return void jc('Property "'+t+'" is not existed in element '+r.id);var c=r.animators,d=new Vc(n,e);return d.during(function(){r.dirty(i);}).done(function(){c.splice(h(c,d),1);}),c.push(d),o&&o.animation.addAnimator(d),d;},stopAnimation:function stopAnimation(t){for(var e=this.animators,n=e.length,i=0;n>i;i++){e[i].stop(t);}return e.length=0,this;},animateTo:function animateTo(t,e,n,i,r,o){function a(){l--,l||r&&r();}b(n)?(r=i,i=n,n=0):w(i)?(r=i,i="linear",n=0):w(n)?(r=n,n=0):w(e)?(r=e,e=500):e||(e=500),this.stopAnimation(),this._animateToShallow("",this,t,e,n);var s=this.animators.slice(),l=s.length;l||r&&r();for(var h=0;h<s.length;h++){s[h].done(a).start(i,o);}},_animateToShallow:function _animateToShallow(t,e,n,i,r){var o={},a=0;for(var s in n){if(n.hasOwnProperty(s))if(null!=e[s])S(n[s])&&!d(n[s])?this._animateToShallow(t?t+"."+s:s,e[s],n[s],i,r):(o[s]=n[s],a++);else if(null!=n[s])if(t){var l={};l[t]={},l[t][s]=n[s],this.attr(l);}else this.attr(s,n[s]);}return a>0&&this.animate(t,!1).when(null==i?500:i,o).delay(r||0),this;}};var $c=function $c(t){Cc.call(this,t),xc.call(this,t),Uc.call(this,t),this.id=t.id||Zu();};$c.prototype={type:"element",name:"",__zr:null,ignore:!1,clipPath:null,drift:function drift(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0;}var n=this.transform;n||(n=this.transform=[1,0,0,1,0,0]),n[4]+=t,n[5]+=e,this.decomposeTransform(),this.dirty(!1);},beforeUpdate:function beforeUpdate(){},afterUpdate:function afterUpdate(){},update:function update(){this.updateTransform();},traverse:function traverse(){},attrKV:function attrKV(t,e){if("position"===t||"scale"===t||"origin"===t){if(e){var n=this[t];n||(n=this[t]=[]),n[0]=e[0],n[1]=e[1];}}else this[t]=e;},hide:function hide(){this.ignore=!0,this.__zr&&this.__zr.refresh();},show:function show(){this.ignore=!1,this.__zr&&this.__zr.refresh();},attr:function attr(t,e){if("string"==typeof t)this.attrKV(t,e);else if(S(t))for(var n in t){t.hasOwnProperty(n)&&this.attrKV(n,t[n]);}return this.dirty(!1),this;},setClipPath:function setClipPath(t){var e=this.__zr;e&&t.addSelfToZr(e),this.clipPath&&this.clipPath!==t&&this.removeClipPath(),this.clipPath=t,t.__zr=e,t.__clipTarget=this,this.dirty(!1);},removeClipPath:function removeClipPath(){var t=this.clipPath;t&&(t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__clipTarget=null,this.clipPath=null,this.dirty(!1));},addSelfToZr:function addSelfToZr(t){this.__zr=t;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.addAnimator(e[n]);}this.clipPath&&this.clipPath.addSelfToZr(t);},removeSelfFromZr:function removeSelfFromZr(t){this.__zr=null;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.removeAnimator(e[n]);}this.clipPath&&this.clipPath.removeSelfFromZr(t);}},c($c,Uc),c($c,Cc),c($c,xc);var Kc=ne,Qc=Math.min,Jc=Math.max;Je.prototype={constructor:Je,union:function union(t){var e=Qc(t.x,this.x),n=Qc(t.y,this.y);this.width=Jc(t.x+t.width,this.x+this.width)-e,this.height=Jc(t.y+t.height,this.y+this.height)-n,this.x=e,this.y=n;},applyTransform:function(){var t=[],e=[],n=[],i=[];return function(r){if(r){t[0]=n[0]=this.x,t[1]=i[1]=this.y,e[0]=i[0]=this.x+this.width,e[1]=n[1]=this.y+this.height,Kc(t,t,r),Kc(e,e,r),Kc(n,n,r),Kc(i,i,r),this.x=Qc(t[0],e[0],n[0],i[0]),this.y=Qc(t[1],e[1],n[1],i[1]);var o=Jc(t[0],e[0],n[0],i[0]),a=Jc(t[1],e[1],n[1],i[1]);this.width=o-this.x,this.height=a-this.y;}};}(),calculateTransform:function calculateTransform(t){var e=this,n=t.width/e.width,i=t.height/e.height,r=ue();return ge(r,r,[-e.x,-e.y]),ve(r,r,[n,i]),ge(r,r,[t.x,t.y]),r;},intersect:function intersect(t){if(!t)return!1;t instanceof Je||(t=Je.create(t));var e=this,n=e.x,i=e.x+e.width,r=e.y,o=e.y+e.height,a=t.x,s=t.x+t.width,l=t.y,h=t.y+t.height;return!(a>i||n>s||l>o||r>h);},contain:function contain(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height;},clone:function clone(){return new Je(this.x,this.y,this.width,this.height);},copy:function copy(t){this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height;},plain:function plain(){return{x:this.x,y:this.y,width:this.width,height:this.height};}},Je.create=function(t){return new Je(t.x,t.y,t.width,t.height);};var td=function td(t){t=t||{},$c.call(this,t);for(var e in t){t.hasOwnProperty(e)&&(this[e]=t[e]);}this._children=[],this.__storage=null,this.__dirty=!0;};td.prototype={constructor:td,isGroup:!0,type:"group",silent:!1,children:function children(){return this._children.slice();},childAt:function childAt(t){return this._children[t];},childOfName:function childOfName(t){for(var e=this._children,n=0;n<e.length;n++){if(e[n].name===t)return e[n];}},childCount:function childCount(){return this._children.length;},add:function add(t){return t&&t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),this;},addBefore:function addBefore(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var n=this._children,i=n.indexOf(e);i>=0&&(n.splice(i,0,t),this._doAdd(t));}return this;},_doAdd:function _doAdd(t){t.parent&&t.parent.remove(t),t.parent=this;var e=this.__storage,n=this.__zr;e&&e!==t.__storage&&(e.addToStorage(t),t instanceof td&&t.addChildrenToStorage(e)),n&&n.refresh();},remove:function remove(t){var e=this.__zr,n=this.__storage,i=this._children,r=h(i,t);return 0>r?this:(i.splice(r,1),t.parent=null,n&&(n.delFromStorage(t),t instanceof td&&t.delChildrenFromStorage(n)),e&&e.refresh(),this);},removeAll:function removeAll(){var t,e,n=this._children,i=this.__storage;for(e=0;e<n.length;e++){t=n[e],i&&(i.delFromStorage(t),t instanceof td&&t.delChildrenFromStorage(i)),t.parent=null;}return n.length=0,this;},eachChild:function eachChild(t,e){for(var n=this._children,i=0;i<n.length;i++){var r=n[i];t.call(e,r,i);}return this;},traverse:function traverse(t,e){for(var n=0;n<this._children.length;n++){var i=this._children[n];t.call(e,i),"group"===i.type&&i.traverse(t,e);}return this;},addChildrenToStorage:function addChildrenToStorage(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.addToStorage(n),n instanceof td&&n.addChildrenToStorage(t);}},delChildrenFromStorage:function delChildrenFromStorage(t){for(var e=0;e<this._children.length;e++){var n=this._children[e];t.delFromStorage(n),n instanceof td&&n.delChildrenFromStorage(t);}},dirty:function dirty(){return this.__dirty=!0,this.__zr&&this.__zr.refresh(),this;},getBoundingRect:function getBoundingRect(t){for(var e=null,n=new Je(0,0,0,0),i=t||this._children,r=[],o=0;o<i.length;o++){var a=i[o];if(!a.ignore&&!a.invisible){var s=a.getBoundingRect(),l=a.getLocalTransform(r);l?(n.copy(s),n.applyTransform(l),e=e||n.clone(),e.union(n)):(e=e||s.clone(),e.union(s));}}return e||n;}},u(td,$c);var ed=32,nd=7,id=function id(){this._roots=[],this._displayList=[],this._displayListLen=0;};id.prototype={constructor:id,traverse:function traverse(t,e){for(var n=0;n<this._roots.length;n++){this._roots[n].traverse(t,e);}},getDisplayList:function getDisplayList(t,e){return e=e||!1,t&&this.updateDisplayList(e),this._displayList;},updateDisplayList:function updateDisplayList(t){this._displayListLen=0;for(var e=this._roots,n=this._displayList,i=0,r=e.length;r>i;i++){this._updateAndAddDisplayable(e[i],null,t);}n.length=this._displayListLen,Uu.canvasSupported&&ln(n,hn);},_updateAndAddDisplayable:function _updateAndAddDisplayable(t,e,n){if(!t.ignore||n){t.beforeUpdate(),t.__dirty&&t.update(),t.afterUpdate();var i=t.clipPath;if(i){e=e?e.slice():[];for(var r=i,o=t;r;){r.parent=o,r.updateTransform(),e.push(r),o=r,r=r.clipPath;}}if(t.isGroup){for(var a=t._children,s=0;s<a.length;s++){var l=a[s];t.__dirty&&(l.__dirty=!0),this._updateAndAddDisplayable(l,e,n);}t.__dirty=!1;}else t.__clipPaths=e,this._displayList[this._displayListLen++]=t;}},addRoot:function addRoot(t){t.__storage!==this&&(t instanceof td&&t.addChildrenToStorage(this),this.addToStorage(t),this._roots.push(t));},delRoot:function delRoot(t){if(null==t){for(var e=0;e<this._roots.length;e++){var n=this._roots[e];n instanceof td&&n.delChildrenFromStorage(this);}return this._roots=[],this._displayList=[],void(this._displayListLen=0);}if(t instanceof Array)for(var e=0,i=t.length;i>e;e++){this.delRoot(t[e]);}else{var r=h(this._roots,t);r>=0&&(this.delFromStorage(t),this._roots.splice(r,1),t instanceof td&&t.delChildrenFromStorage(this));}},addToStorage:function addToStorage(t){return t.__storage=this,t.dirty(!1),this;},delFromStorage:function delFromStorage(t){return t&&(t.__storage=null),this;},dispose:function dispose(){this._renderList=this._roots=null;},displayableSortFunc:hn};var rd=[["shadowBlur",0],["shadowOffsetX",0],["shadowOffsetY",0],["shadowColor","#000"],["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],od=function od(t,e){this.extendFrom(t,!1),this.host=e;};od.prototype={constructor:od,host:null,fill:"#000",stroke:null,opacity:1,lineDash:null,lineDashOffset:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,lineWidth:1,strokeNoScale:!1,text:null,font:null,textFont:null,fontStyle:null,fontWeight:null,fontSize:null,fontFamily:null,textTag:null,textFill:"#000",textStroke:null,textWidth:null,textHeight:null,textStrokeWidth:0,textLineHeight:null,textPosition:"inside",textRect:null,textOffset:null,textAlign:null,textVerticalAlign:null,textDistance:5,textShadowColor:"transparent",textShadowBlur:0,textShadowOffsetX:0,textShadowOffsetY:0,textBoxShadowColor:"transparent",textBoxShadowBlur:0,textBoxShadowOffsetX:0,textBoxShadowOffsetY:0,transformText:!1,textRotation:0,textOrigin:null,textBackgroundColor:null,textBorderColor:null,textBorderWidth:0,textBorderRadius:0,textPadding:null,rich:null,truncate:null,blend:null,bind:function bind(t,e,n){for(var i=this,r=n&&n.style,o=!r,a=0;a<rd.length;a++){var s=rd[a],l=s[0];(o||i[l]!==r[l])&&(t[l]=i[l]||s[1]);}if((o||i.fill!==r.fill)&&(t.fillStyle=i.fill),(o||i.stroke!==r.stroke)&&(t.strokeStyle=i.stroke),(o||i.opacity!==r.opacity)&&(t.globalAlpha=null==i.opacity?1:i.opacity),(o||i.blend!==r.blend)&&(t.globalCompositeOperation=i.blend||"source-over"),this.hasStroke()){var h=i.lineWidth;t.lineWidth=h/(this.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1);}},hasFill:function hasFill(){var t=this.fill;return null!=t&&"none"!==t;},hasStroke:function hasStroke(){var t=this.stroke;return null!=t&&"none"!==t&&this.lineWidth>0;},extendFrom:function extendFrom(t,e){if(t)for(var n in t){!t.hasOwnProperty(n)||e!==!0&&(e===!1?this.hasOwnProperty(n):null==t[n])||(this[n]=t[n]);}},set:function set(t,e){"string"==typeof t?this[t]=e:this.extendFrom(t,!0);},clone:function clone(){var t=new this.constructor();return t.extendFrom(this,!0),t;},getGradient:function getGradient(t,e,n){for(var i="radial"===e.type?cn:un,r=i(t,e,n),o=e.colorStops,a=0;a<o.length;a++){r.addColorStop(o[a].offset,o[a].color);}return r;}};for(var ad=od.prototype,sd=0;sd<rd.length;sd++){var ld=rd[sd];ld[0]in ad||(ad[ld[0]]=ld[1]);}od.getGradient=ad.getGradient;var hd=function hd(t,e){this.image=t,this.repeat=e,this.type="pattern";};hd.prototype.getCanvasPattern=function(t){return t.createPattern(this.image,this.repeat||"repeat");};var ud=function ud(t,e,n){var i;n=n||Yc,"string"==typeof t?i=fn(t,e,n):S(t)&&(i=t,t=i.id),this.id=t,this.dom=i;var r=i.style;r&&(i.onselectstart=dn,r["-webkit-user-select"]="none",r["user-select"]="none",r["-webkit-touch-callout"]="none",r["-webkit-tap-highlight-color"]="rgba(0,0,0,0)",r.padding=0,r.margin=0,r["border-width"]=0),this.domBack=null,this.ctxBack=null,this.painter=e,this.config=null,this.clearColor=0,this.motionBlur=!1,this.lastFrameAlpha=.7,this.dpr=n;};ud.prototype={constructor:ud,elCount:0,__dirty:!0,initContext:function initContext(){this.ctx=this.dom.getContext("2d"),this.ctx.__currentValues={},this.ctx.dpr=this.dpr;},createBackBuffer:function createBackBuffer(){var t=this.dpr;this.domBack=fn("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),this.ctxBack.__currentValues={},1!=t&&this.ctxBack.scale(t,t);},resize:function resize(t,e){var n=this.dpr,i=this.dom,r=i.style,o=this.domBack;r.width=t+"px",r.height=e+"px",i.width=t*n,i.height=e*n,o&&(o.width=t*n,o.height=e*n,1!=n&&this.ctxBack.scale(n,n));},clear:function clear(t){var e=this.dom,n=this.ctx,i=e.width,r=e.height,o=this.clearColor,a=this.motionBlur&&!t,s=this.lastFrameAlpha,l=this.dpr;if(a&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(e,0,0,i/l,r/l)),n.clearRect(0,0,i,r),o){var h;o.colorStops?(h=o.__canvasGradient||od.getGradient(n,o,{x:0,y:0,width:i,height:r}),o.__canvasGradient=h):o.image&&(h=hd.prototype.getCanvasPattern.call(o,n)),n.save(),n.fillStyle=h||o,n.fillRect(0,0,i,r),n.restore();}if(a){var u=this.domBack;n.save(),n.globalAlpha=s,n.drawImage(u,0,0,i,r),n.restore();}}};var cd="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){setTimeout(t,16);},dd=new zc(50),fd={},gd=0,pd=5e3,vd=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,md="12px sans-serif",yd={};yd.measureText=function(t,e){var n=l();return n.font=e||md,n.measureText(t);};var xd={left:1,right:1,center:1},_d={top:1,bottom:1,middle:1},wd=new Je(),bd=function bd(){};bd.prototype={constructor:bd,drawRectText:function drawRectText(t,e){var n=this.style;e=n.textRect||e,this.__dirty&&En(n,!0);var i=n.text;if(null!=i&&(i+=""),Jn(i,n)){t.save();var r=this.transform;n.transformText?this.setTransform(t):r&&(wd.copy(e),wd.applyTransform(r),e=wd),Nn(this,t,i,n,e),t.restore();}}},ti.prototype={constructor:ti,type:"displayable",__dirty:!0,invisible:!1,z:0,z2:0,zlevel:0,draggable:!1,dragging:!1,silent:!1,culling:!1,cursor:"pointer",rectHover:!1,progressive:-1,beforeBrush:function beforeBrush(){},afterBrush:function afterBrush(){},brush:function brush(){},getBoundingRect:function getBoundingRect(){},contain:function contain(t,e){return this.rectContain(t,e);},traverse:function traverse(t,e){t.call(e,this);},rectContain:function rectContain(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();return i.contain(n[0],n[1]);},dirty:function dirty(){this.__dirty=!0,this._rect=null,this.__zr&&this.__zr.refresh();},animateStyle:function animateStyle(t){return this.animate("style",t);},attrKV:function attrKV(t,e){"style"!==t?$c.prototype.attrKV.call(this,t,e):this.style.set(e);},setStyle:function setStyle(t,e){return this.style.set(t,e),this.dirty(!1),this;},useStyle:function useStyle(t){return this.style=new od(t,this),this.dirty(!1),this;}},u(ti,$c),c(ti,bd),ei.prototype={constructor:ei,type:"image",brush:function brush(t,e){var n=this.style,i=n.image;n.bind(t,this,e);var r=this._image=pn(i,this._image,this,this.onload);if(r&&mn(r)){var o=n.x||0,a=n.y||0,s=n.width,l=n.height,h=r.width/r.height;if(null==s&&null!=l?s=l*h:null==l&&null!=s?l=s/h:null==s&&null==l&&(s=r.width,l=r.height),this.setTransform(t),n.sWidth&&n.sHeight){var u=n.sx||0,c=n.sy||0;t.drawImage(r,u,c,n.sWidth,n.sHeight,o,a,s,l);}else if(n.sx&&n.sy){var u=n.sx,c=n.sy,d=s-u,f=l-c;t.drawImage(r,u,c,d,f,o,a,s,l);}else t.drawImage(r,o,a,s,l);this.restoreTransform(t),null!=n.text&&this.drawRectText(t,this.getBoundingRect());}},getBoundingRect:function getBoundingRect(){var t=this.style;return this._rect||(this._rect=new Je(t.x||0,t.y||0,t.width||0,t.height||0)),this._rect;}},u(ei,ti);var Sd=5,Md=new Je(0,0,0,0),Td=new Je(0,0,0,0),Id=function Id(t,e,n){this.type="canvas";var i=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=n=a({},n||{}),this.dpr=n.devicePixelRatio||Yc,this._singleCanvas=i,this.root=t;var r=t.style;r&&(r["-webkit-tap-highlight-color"]="transparent",r["-webkit-user-select"]=r["user-select"]=r["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var o=this._zlevelList=[],s=this._layers={};if(this._layerConfig={},i){null!=n.width&&(t.width=n.width),null!=n.height&&(t.height=n.height);var l=t.width,h=t.height;this._width=l,this._height=h;var u=new ud(t,this,1);u.initContext(),s[0]=u,o.push(0),this._domRoot=t;}else{this._width=this._getSize(0),this._height=this._getSize(1);var c=this._domRoot=hi(this._width,this._height);t.appendChild(c);}this._progressiveLayers=[],this._hoverlayer,this._hoverElements=[];};Id.prototype={constructor:Id,getType:function getType(){return"canvas";},isSingleCanvas:function isSingleCanvas(){return this._singleCanvas;},getViewportRoot:function getViewportRoot(){return this._domRoot;},getViewportRootOffset:function getViewportRootOffset(){var t=this.getViewportRoot();return t?{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}:void 0;},refresh:function refresh(t){var e=this.storage.getDisplayList(!0),n=this._zlevelList;this._paintList(e,t);for(var i=0;i<n.length;i++){var r=n[i],o=this._layers[r];!o.__builtin__&&o.refresh&&o.refresh();}return this.refreshHover(),this._progressiveLayers.length&&this._startProgessive(),this;},addHover:function addHover(t,e){if(!t.__hoverMir){var n=new t.constructor({style:t.style,shape:t.shape});n.__from=t,t.__hoverMir=n,n.setStyle(e),this._hoverElements.push(n);}},removeHover:function removeHover(t){var e=t.__hoverMir,n=this._hoverElements,i=h(n,e);i>=0&&n.splice(i,1),t.__hoverMir=null;},clearHover:function clearHover(){for(var t=this._hoverElements,e=0;e<t.length;e++){var n=t[e].__from;n&&(n.__hoverMir=null);}t.length=0;},refreshHover:function refreshHover(){var t=this._hoverElements,e=t.length,n=this._hoverlayer;if(n&&n.clear(),e){ln(t,this.storage.displayableSortFunc),n||(n=this._hoverlayer=this.getLayer(1e5));var i={};n.ctx.save();for(var r=0;e>r;){var o=t[r],a=o.__from;a&&a.__zr?(r++,a.invisible||(o.transform=a.transform,o.invTransform=a.invTransform,o.__clipPaths=a.__clipPaths,this._doPaintEl(o,n,!0,i))):(t.splice(r,1),a.__hoverMir=null,e--);}n.ctx.restore();}},_startProgessive:function _startProgessive(){function t(){n===e._progressiveToken&&e.storage&&(e._doPaintList(e.storage.getDisplayList()),e._furtherProgressive?(e._progress++,cd(t)):e._progressiveToken=-1);}var e=this;if(e._furtherProgressive){var n=e._progressiveToken=+new Date();e._progress++,cd(t);}},_clearProgressive:function _clearProgressive(){this._progressiveToken=-1,this._progress=0,f(this._progressiveLayers,function(t){t.__dirty&&t.clear();});},_paintList:function _paintList(t,e){null==e&&(e=!1),this._updateLayerStatus(t),this._clearProgressive(),this.eachBuiltinLayer(ri),this._doPaintList(t,e),this.eachBuiltinLayer(oi);},_doPaintList:function _doPaintList(t,e){function n(t){var e=o.dpr||1;o.save(),o.globalAlpha=1,o.shadowBlur=0,i.__dirty=!0,o.setTransform(1,0,0,1,0,0),o.drawImage(t.dom,0,0,u*e,c*e),o.restore();}for(var i,r,o,a,s,l,h=0,u=this._width,c=this._height,d=this._progress,g=0,p=t.length;p>g;g++){var v=t[g],m=this._singleCanvas?0:v.zlevel,y=v.__frame;if(0>y&&s&&(n(s),s=null),r!==m&&(o&&o.restore(),a={},r=m,i=this.getLayer(r),i.__builtin__||jc("ZLevel "+r+" has been used by unkown layer "+i.id),o=i.ctx,o.save(),i.__unusedCount=0,(i.__dirty||e)&&i.clear()),i.__dirty||e){if(y>=0){if(!s){if(s=this._progressiveLayers[Math.min(h++,Sd-1)],s.ctx.save(),s.renderScope={},s&&s.__progress>s.__maxProgress){g=s.__nextIdxNotProg-1;continue;}l=s.__progress,s.__dirty||(d=l),s.__progress=d+1;}y===d&&this._doPaintEl(v,s,!0,s.renderScope);}else this._doPaintEl(v,i,e,a);v.__dirty=!1;}}s&&n(s),o&&o.restore(),this._furtherProgressive=!1,f(this._progressiveLayers,function(t){t.__maxProgress>=t.__progress&&(this._furtherProgressive=!0);},this);},_doPaintEl:function _doPaintEl(t,e,n,i){var r=e.ctx,o=t.transform;if(!(!e.__dirty&&!n||t.invisible||0===t.style.opacity||o&&!o[0]&&!o[3]||t.culling&&ai(t,this._width,this._height))){var a=t.__clipPaths;(i.prevClipLayer!==e||si(a,i.prevElClipPaths))&&(i.prevElClipPaths&&(i.prevClipLayer.ctx.restore(),i.prevClipLayer=i.prevElClipPaths=null,i.prevEl=null),a&&(r.save(),li(a,r),i.prevClipLayer=e,i.prevElClipPaths=a)),t.beforeBrush&&t.beforeBrush(r),t.brush(r,i.prevEl||null),i.prevEl=t,t.afterBrush&&t.afterBrush(r);}},getLayer:function getLayer(t){if(this._singleCanvas)return this._layers[0];var e=this._layers[t];return e||(e=new ud("zr_"+t,this,this.dpr),e.__builtin__=!0,this._layerConfig[t]&&r(e,this._layerConfig[t],!0),this.insertLayer(t,e),e.initContext()),e;},insertLayer:function insertLayer(t,e){var n=this._layers,i=this._zlevelList,r=i.length,o=null,a=-1,s=this._domRoot;if(n[t])return void jc("ZLevel "+t+" has been used already");if(!ii(e))return void jc("Layer of zlevel "+t+" is not valid");if(r>0&&t>i[0]){for(a=0;r-1>a&&!(i[a]<t&&i[a+1]>t);a++){}o=n[i[a]];}if(i.splice(a+1,0,t),n[t]=e,!e.virtual)if(o){var l=o.dom;l.nextSibling?s.insertBefore(e.dom,l.nextSibling):s.appendChild(e.dom);}else s.firstChild?s.insertBefore(e.dom,s.firstChild):s.appendChild(e.dom);},eachLayer:function eachLayer(t,e){var n,i,r=this._zlevelList;for(i=0;i<r.length;i++){n=r[i],t.call(e,this._layers[n],n);}},eachBuiltinLayer:function eachBuiltinLayer(t,e){var n,i,r,o=this._zlevelList;for(r=0;r<o.length;r++){i=o[r],n=this._layers[i],n.__builtin__&&t.call(e,n,i);}},eachOtherLayer:function eachOtherLayer(t,e){var n,i,r,o=this._zlevelList;for(r=0;r<o.length;r++){i=o[r],n=this._layers[i],n.__builtin__||t.call(e,n,i);}},getLayers:function getLayers(){return this._layers;},_updateLayerStatus:function _updateLayerStatus(t){var e=this._layers,n=this._progressiveLayers,i={},r={};this.eachBuiltinLayer(function(t,e){i[e]=t.elCount,t.elCount=0,t.__dirty=!1;}),f(n,function(t,e){r[e]=t.elCount,t.elCount=0,t.__dirty=!1;});for(var o,a,s=0,l=0,h=0,u=t.length;u>h;h++){var c=t[h],d=this._singleCanvas?0:c.zlevel,g=e[d],p=c.progressive;if(g&&(g.elCount++,g.__dirty=g.__dirty||c.__dirty),p>=0){a!==p&&(a=p,l++);var v=c.__frame=l-1;if(!o){var m=Math.min(s,Sd-1);o=n[m],o||(o=n[m]=new ud("progressive",this,this.dpr),o.initContext()),o.__maxProgress=0;}o.__dirty=o.__dirty||c.__dirty,o.elCount++,o.__maxProgress=Math.max(o.__maxProgress,v),o.__maxProgress>=o.__progress&&(g.__dirty=!0);}else c.__frame=-1,o&&(o.__nextIdxNotProg=h,s++,o=null);}o&&(s++,o.__nextIdxNotProg=h),this.eachBuiltinLayer(function(t,e){i[e]!==t.elCount&&(t.__dirty=!0);}),n.length=Math.min(s,Sd),f(n,function(t,e){r[e]!==t.elCount&&(c.__dirty=!0),t.__dirty&&(t.__progress=0);});},clear:function clear(){return this.eachBuiltinLayer(this._clearLayer),this;},_clearLayer:function _clearLayer(t){t.clear();},configLayer:function configLayer(t,e){if(e){var n=this._layerConfig;n[t]?r(n[t],e,!0):n[t]=e;var i=this._layers[t];i&&r(i,n[t],!0);}},delLayer:function delLayer(t){var e=this._layers,n=this._zlevelList,i=e[t];i&&(i.dom.parentNode.removeChild(i.dom),delete e[t],n.splice(h(n,t),1));},resize:function resize(t,e){var n=this._domRoot;n.style.display="none";var i=this._opts;if(null!=t&&(i.width=t),null!=e&&(i.height=e),t=this._getSize(0),e=this._getSize(1),n.style.display="",this._width!=t||e!=this._height){n.style.width=t+"px",n.style.height=e+"px";for(var r in this._layers){this._layers.hasOwnProperty(r)&&this._layers[r].resize(t,e);}f(this._progressiveLayers,function(n){n.resize(t,e);}),this.refresh(!0);}return this._width=t,this._height=e,this;},clearLayer:function clearLayer(t){var e=this._layers[t];e&&e.clear();},dispose:function dispose(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null;},getRenderedCanvas:function getRenderedCanvas(t){function e(t,e){var i=a._zlevelList;null==t&&(t=-1/0);for(var r,o=0;o<i.length;o++){var s=i[o],l=a._layers[s];if(!l.__builtin__&&s>t&&e>s){r=l;break;}}r&&r.renderToCanvas&&(n.ctx.save(),r.renderToCanvas(n.ctx),n.ctx.restore());}if(t=t||{},this._singleCanvas)return this._layers[0].dom;var n=new ud("image",this,t.pixelRatio||this.dpr);n.initContext(),n.clearColor=t.backgroundColor,n.clear();for(var i,r=this.storage.getDisplayList(!0),o={},a=this,s=0;s<r.length;s++){var l=r[s];l.zlevel!==i&&(e(i,l.zlevel),i=l.zlevel),this._doPaintEl(l,n,!0,o);}return e(i,1/0),n.dom;},getWidth:function getWidth(){return this._width;},getHeight:function getHeight(){return this._height;},_getSize:function _getSize(t){var e=this._opts,n=["width","height"][t],i=["clientWidth","clientHeight"][t],r=["paddingLeft","paddingTop"][t],o=["paddingRight","paddingBottom"][t];if(null!=e[n]&&"auto"!==e[n])return parseFloat(e[n]);var a=this.root,s=document.defaultView.getComputedStyle(a);return(a[i]||ni(s[n])||ni(a.style[n]))-(ni(s[r])||0)-(ni(s[o])||0)|0;},pathToImage:function pathToImage(t,e){e=e||this.dpr;var n=document.createElement("canvas"),i=n.getContext("2d"),r=t.getBoundingRect(),o=t.style,a=o.shadowBlur,s=o.shadowOffsetX,l=o.shadowOffsetY,h=o.hasStroke()?o.lineWidth:0,u=Math.max(h/2,-s+a),c=Math.max(h/2,s+a),d=Math.max(h/2,-l+a),f=Math.max(h/2,l+a),g=r.width+u+c,p=r.height+d+f;n.width=g*e,n.height=p*e,i.scale(e,e),i.clearRect(0,0,g,p),i.dpr=e;var v={position:t.position,rotation:t.rotation,scale:t.scale};t.position=[u-r.x,d-r.y],t.rotation=0,t.scale=[1,1],t.updateTransform(),t&&t.brush(i);var m=ei,y=new m({style:{x:0,y:0,image:n}});return null!=v.position&&(y.position=t.position=v.position),null!=v.rotation&&(y.rotation=t.rotation=v.rotation),null!=v.scale&&(y.scale=t.scale=v.scale),y;}};var Cd="undefined"!=typeof window&&!!window.addEventListener,Ad=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Dd=Cd?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0;}:function(t){t.returnValue=!1,t.cancelBubble=!0;},kd=function kd(t){t=t||{},this.stage=t.stage||{},this.onframe=t.onframe||function(){},this._clips=[],this._running=!1,this._time,this._pausedTime,this._pauseStart,this._paused=!1,xc.call(this);};kd.prototype={constructor:kd,addClip:function addClip(t){this._clips.push(t);},addAnimator:function addAnimator(t){t.animation=this;for(var e=t.getClips(),n=0;n<e.length;n++){this.addClip(e[n]);}},removeClip:function removeClip(t){var e=h(this._clips,t);e>=0&&this._clips.splice(e,1);},removeAnimator:function removeAnimator(t){for(var e=t.getClips(),n=0;n<e.length;n++){this.removeClip(e[n]);}t.animation=null;},_update:function _update(){for(var t=new Date().getTime()-this._pausedTime,e=t-this._time,n=this._clips,i=n.length,r=[],o=[],a=0;i>a;a++){var s=n[a],l=s.step(t,e);l&&(r.push(l),o.push(s));}for(var a=0;i>a;){n[a]._needsRemove?(n[a]=n[i-1],n.pop(),i--):a++;}i=r.length;for(var a=0;i>a;a++){o[a].fire(r[a]);}this._time=t,this.onframe(e),this.trigger("frame",e),this.stage.update&&this.stage.update();},_startLoop:function _startLoop(){function t(){e._running&&(cd(t),!e._paused&&e._update());}var e=this;this._running=!0,cd(t);},start:function start(){this._time=new Date().getTime(),this._pausedTime=0,this._startLoop();},stop:function stop(){this._running=!1;},pause:function pause(){this._paused||(this._pauseStart=new Date().getTime(),this._paused=!0);},resume:function resume(){this._paused&&(this._pausedTime+=new Date().getTime()-this._pauseStart,this._paused=!1);},clear:function clear(){this._clips=[];},animate:function animate(t,e){e=e||{};var n=new Vc(t,e.loop,e.getter,e.setter);return this.addAnimator(n),n;}},c(kd,xc);var Pd=function Pd(){this._track=[];};Pd.prototype={constructor:Pd,recognize:function recognize(t,e,n){return this._doTrack(t,e,n),this._recognize(t);},clear:function clear(){return this._track.length=0,this;},_doTrack:function _doTrack(t,e,n){var i=t.touches;if(i){for(var r={points:[],touches:[],target:e,event:t},o=0,a=i.length;a>o;o++){var s=i[o],l=ci(n,s,{});r.points.push([l.zrX,l.zrY]),r.touches.push(s);}this._track.push(r);}},_recognize:function _recognize(t){for(var e in Ld){if(Ld.hasOwnProperty(e)){var n=Ld[e](this._track,t);if(n)return n;}}}};var Ld={pinch:function pinch(t,e){var n=t.length;if(n){var i=(t[n-1]||{}).points,r=(t[n-2]||{}).points||i;if(r&&r.length>1&&i&&i.length>1){var o=vi(i)/vi(r);!isFinite(o)&&(o=1),e.pinchScale=o;var a=mi(i);return e.pinchX=a[0],e.pinchY=a[1],{type:"pinch",target:t[0].target,event:e};}}}},Od=300,zd=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],Bd=["touchstart","touchend","touchmove"],Ed={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},Rd=g(zd,function(t){var e=t.replace("mouse","pointer");return Ed[e]?e:t;}),Nd={mousemove:function mousemove(t){t=fi(this.dom,t),this.trigger("mousemove",t);},mouseout:function mouseout(t){t=fi(this.dom,t);var e=t.toElement||t.relatedTarget;if(e!=this.dom)for(;e&&9!=e.nodeType;){if(e===this.dom)return;e=e.parentNode;}this.trigger("mouseout",t);},touchstart:function touchstart(t){t=fi(this.dom,t),t.zrByTouch=!0,this._lastTouchMoment=new Date(),xi(this,t,"start"),Nd.mousemove.call(this,t),Nd.mousedown.call(this,t),_i(this);},touchmove:function touchmove(t){t=fi(this.dom,t),t.zrByTouch=!0,xi(this,t,"change"),Nd.mousemove.call(this,t),_i(this);},touchend:function touchend(t){t=fi(this.dom,t),t.zrByTouch=!0,xi(this,t,"end"),Nd.mouseup.call(this,t),+new Date()-this._lastTouchMoment<Od&&Nd.click.call(this,t),_i(this);},pointerdown:function pointerdown(t){Nd.mousedown.call(this,t);},pointermove:function pointermove(t){wi(t)||Nd.mousemove.call(this,t);},pointerup:function pointerup(t){Nd.mouseup.call(this,t);},pointerout:function pointerout(t){wi(t)||Nd.mouseout.call(this,t);}};f(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){Nd[t]=function(e){e=fi(this.dom,e),this.trigger(t,e);};});var Fd=Si.prototype;Fd.dispose=function(){for(var t=zd.concat(Bd),e=0;e<t.length;e++){var n=t[e];pi(this.dom,yi(n),this._handlers[n]);}},Fd.setCursor=function(t){this.dom.style.cursor=t||"default";},c(Si,xc);var Gd=!Uu.canvasSupported,Hd={canvas:Id},Wd={},Vd="3.7.3",Xd=function Xd(t,e,n){n=n||{},this.dom=e,this.id=t;var i=this,r=new id(),o=n.renderer;if(Gd){if(!Hd.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");o="vml";}else o&&Hd[o]||(o="canvas");var a=new Hd[o](e,r,n);this.storage=r,this.painter=a;var s=Uu.node?null:new Si(a.getViewportRoot());this.handler=new bc(r,a,s,a.root),this.animation=new kd({stage:{update:y(this.flush,this)}}),this.animation.start(),this._needsRefresh;var l=r.delFromStorage,h=r.addToStorage;r.delFromStorage=function(t){l.call(r,t),t&&t.removeSelfFromZr(i);},r.addToStorage=function(t){h.call(r,t),t.addSelfToZr(i);};};Xd.prototype={constructor:Xd,getId:function getId(){return this.id;},add:function add(t){this.storage.addRoot(t),this._needsRefresh=!0;},remove:function remove(t){this.storage.delRoot(t),this._needsRefresh=!0;},configLayer:function configLayer(t,e){this.painter.configLayer(t,e),this._needsRefresh=!0;},refreshImmediately:function refreshImmediately(){this._needsRefresh=!1,this.painter.refresh(),this._needsRefresh=!1;},refresh:function refresh(){this._needsRefresh=!0;},flush:function flush(){this._needsRefresh&&this.refreshImmediately(),this._needsRefreshHover&&this.refreshHoverImmediately();},addHover:function addHover(t,e){this.painter.addHover&&(this.painter.addHover(t,e),this.refreshHover());},removeHover:function removeHover(t){this.painter.removeHover&&(this.painter.removeHover(t),this.refreshHover());},clearHover:function clearHover(){this.painter.clearHover&&(this.painter.clearHover(),this.refreshHover());},refreshHover:function refreshHover(){this._needsRefreshHover=!0;},refreshHoverImmediately:function refreshHoverImmediately(){this._needsRefreshHover=!1,this.painter.refreshHover&&this.painter.refreshHover();},resize:function resize(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize();},clearAnimation:function clearAnimation(){this.animation.clear();},getWidth:function getWidth(){return this.painter.getWidth();},getHeight:function getHeight(){return this.painter.getHeight();},pathToImage:function pathToImage(t,e){return this.painter.pathToImage(t,e);},setCursorStyle:function setCursorStyle(t){this.handler.setCursorStyle(t);},findHover:function findHover(t,e){return this.handler.findHover(t,e);},on:function on(t,e,n){this.handler.on(t,e,n);},off:function off(t,e){this.handler.off(t,e);},trigger:function trigger(t,e){this.handler.trigger(t,e);},clear:function clear(){this.storage.delRoot(),this.painter.clear();},dispose:function dispose(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,Ai(this.id);}};var qd=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({version:Vd,init:Mi,dispose:Ti,getInstance:Ii,registerPainter:Ci}),Yd=1e-4,Zd=9007199254740991,jd=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,Ud=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({linearMap:ki,parsePercent:Pi,round:Li,asc:Oi,getPrecision:zi,getPrecisionSafe:Bi,getPixelPrecision:Ei,getPercentWithPrecision:Ri,MAX_SAFE_INTEGER:Zd,remRadian:Ni,isRadianAroundZero:Fi,parseDate:Gi,quantity:Hi,nice:Vi,reformIntervals:Xi,isNumeric:qi}),$d=P,Kd=["a","b","c","d","e","f","g"],Qd=function Qd(t,e){return"{"+t+(null==e?"":e)+"}";},Jd=function Jd(t){return 10>t?"0"+t:t;},tf=Tn,ef=xn,nf=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({addCommas:Yi,toCamelCase:Zi,normalizeCssArray:$d,encodeHTML:ji,formatTpl:Ui,formatTplSimple:$i,getTooltipMarker:Ki,formatTime:Qi,capitalFirst:Ji,truncateText:tf,getTextRect:ef}),rf=".",of="___EC__COMPONENT__CONTAINER___",af="\x00ec_\x00",sf=function sf(t){for(var e=0;e<t.length;e++){t[e][1]||(t[e][1]=t[e][0]);}return function(e,n,i){for(var r={},o=0;o<t.length;o++){var a=t[o][1];if(!(n&&h(n,a)>=0||i&&h(i,a)<0)){var s=e.getShallow(a);null!=s&&(r[t[o][0]]=s);}}return r;};},lf=sf([["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),hf={getLineStyle:function getLineStyle(t){var e=lf(this,t),n=this.getLineDash(e.lineWidth);return n&&(e.lineDash=n),e;},getLineDash:function getLineDash(t){null==t&&(t=1);var e=this.get("type"),n=Math.max(t,2),i=4*t;return"solid"===e||null==e?null:"dashed"===e?[i,i]:[n,n];}},uf=sf([["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]]),cf={getAreaStyle:function getAreaStyle(t,e){return uf(this,t,e);}},df=Math.pow,ff=Math.sqrt,gf=1e-8,pf=1e-4,vf=ff(3),mf=1/3,yf=N(),xf=N(),_f=N(),wf=Math.min,bf=Math.max,Sf=Math.sin,Mf=Math.cos,Tf=2*Math.PI,If=N(),Cf=N(),Af=N(),Df=[],kf=[],Pf={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},Lf=[],Of=[],zf=[],Bf=[],Ef=Math.min,Rf=Math.max,Nf=Math.cos,Ff=Math.sin,Gf=Math.sqrt,Hf=Math.abs,Wf="undefined"!=typeof Float32Array,Vf=function Vf(t){this._saveData=!t,this._saveData&&(this.data=[]),this._ctx=null;};Vf.prototype={constructor:Vf,_xi:0,_yi:0,_x0:0,_y0:0,_ux:0,_uy:0,_len:0,_lineDash:null,_dashOffset:0,_dashIdx:0,_dashSum:0,setScale:function setScale(t,e){this._ux=Hf(1/Yc/t)||0,this._uy=Hf(1/Yc/e)||0;},getContext:function getContext(){return this._ctx;},beginPath:function beginPath(t){return this._ctx=t,t&&t.beginPath(),t&&(this.dpr=t.dpr),this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this;},moveTo:function moveTo(t,e){return this.addData(Pf.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this;},lineTo:function lineTo(t,e){var n=Hf(t-this._xi)>this._ux||Hf(e-this._yi)>this._uy||this._len<5;return this.addData(Pf.L,t,e),this._ctx&&n&&(this._needsDash()?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),n&&(this._xi=t,this._yi=e),this;},bezierCurveTo:function bezierCurveTo(t,e,n,i,r,o){return this.addData(Pf.C,t,e,n,i,r,o),this._ctx&&(this._needsDash()?this._dashedBezierTo(t,e,n,i,r,o):this._ctx.bezierCurveTo(t,e,n,i,r,o)),this._xi=r,this._yi=o,this;},quadraticCurveTo:function quadraticCurveTo(t,e,n,i){return this.addData(Pf.Q,t,e,n,i),this._ctx&&(this._needsDash()?this._dashedQuadraticTo(t,e,n,i):this._ctx.quadraticCurveTo(t,e,n,i)),this._xi=n,this._yi=i,this;},arc:function arc(t,e,n,i,r,o){return this.addData(Pf.A,t,e,n,n,i,r-i,0,o?0:1),this._ctx&&this._ctx.arc(t,e,n,i,r,o),this._xi=Nf(r)*n+t,this._yi=Ff(r)*n+t,this;},arcTo:function arcTo(t,e,n,i,r){return this._ctx&&this._ctx.arcTo(t,e,n,i,r),this;},rect:function rect(t,e,n,i){return this._ctx&&this._ctx.rect(t,e,n,i),this.addData(Pf.R,t,e,n,i),this;},closePath:function closePath(){this.addData(Pf.Z);var t=this._ctx,e=this._x0,n=this._y0;return t&&(this._needsDash()&&this._dashedLineTo(e,n),t.closePath()),this._xi=e,this._yi=n,this;},fill:function fill(t){t&&t.fill(),this.toStatic();},stroke:function stroke(t){t&&t.stroke(),this.toStatic();},setLineDash:function setLineDash(t){if(t instanceof Array){this._lineDash=t,this._dashIdx=0;for(var e=0,n=0;n<t.length;n++){e+=t[n];}this._dashSum=e;}return this;},setLineDashOffset:function setLineDashOffset(t){return this._dashOffset=t,this;},len:function len(){return this._len;},setData:function setData(t){var e=t.length;this.data&&this.data.length==e||!Wf||(this.data=new Float32Array(e));for(var n=0;e>n;n++){this.data[n]=t[n];}this._len=e;},appendPath:function appendPath(t){t instanceof Array||(t=[t]);for(var e=t.length,n=0,i=this._len,r=0;e>r;r++){n+=t[r].len();}Wf&&this.data instanceof Float32Array&&(this.data=new Float32Array(i+n));for(var r=0;e>r;r++){for(var o=t[r].data,a=0;a<o.length;a++){this.data[i++]=o[a];}}this._len=i;},addData:function addData(t){if(this._saveData){var e=this.data;this._len+arguments.length>e.length&&(this._expandData(),e=this.data);for(var n=0;n<arguments.length;n++){e[this._len++]=arguments[n];}this._prevCmd=t;}},_expandData:function _expandData(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++){t[e]=this.data[e];}this.data=t;}},_needsDash:function _needsDash(){return this._lineDash;},_dashedLineTo:function _dashedLineTo(t,e){var n,i,r=this._dashSum,o=this._dashOffset,a=this._lineDash,s=this._ctx,l=this._xi,h=this._yi,u=t-l,c=e-h,d=Gf(u*u+c*c),f=l,g=h,p=a.length;for(u/=d,c/=d,0>o&&(o=r+o),o%=r,f-=o*u,g-=o*c;u>0&&t>=f||0>u&&f>=t||0==u&&(c>0&&e>=g||0>c&&g>=e);){i=this._dashIdx,n=a[i],f+=u*n,g+=c*n,this._dashIdx=(i+1)%p,u>0&&l>f||0>u&&f>l||c>0&&h>g||0>c&&g>h||s[i%2?"moveTo":"lineTo"](u>=0?Ef(f,t):Rf(f,t),c>=0?Ef(g,e):Rf(g,e));}u=f-t,c=g-e,this._dashOffset=-Gf(u*u+c*c);},_dashedBezierTo:function _dashedBezierTo(t,e,n,i,r,o){var a,s,l,h,u,c=this._dashSum,d=this._dashOffset,f=this._lineDash,g=this._ctx,p=this._xi,v=this._yi,m=cr,y=0,x=this._dashIdx,_=f.length,w=0;for(0>d&&(d=c+d),d%=c,a=0;1>a;a+=.1){s=m(p,t,n,r,a+.1)-m(p,t,n,r,a),l=m(v,e,i,o,a+.1)-m(v,e,i,o,a),y+=Gf(s*s+l*l);}for(;_>x&&(w+=f[x],!(w>d));x++){}for(a=(w-d)/y;1>=a;){h=m(p,t,n,r,a),u=m(v,e,i,o,a),x%2?g.moveTo(h,u):g.lineTo(h,u),a+=f[x]/y,x=(x+1)%_;}x%2!==0&&g.lineTo(r,o),s=r-h,l=o-u,this._dashOffset=-Gf(s*s+l*l);},_dashedQuadraticTo:function _dashedQuadraticTo(t,e,n,i){var r=n,o=i;n=(n+2*t)/3,i=(i+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,n,i,r,o);},toStatic:function toStatic(){var t=this.data;t instanceof Array&&(t.length=this._len,Wf&&(this.data=new Float32Array(t)));},getBoundingRect:function getBoundingRect(){Lf[0]=Lf[1]=zf[0]=zf[1]=Number.MAX_VALUE,Of[0]=Of[1]=Bf[0]=Bf[1]=-Number.MAX_VALUE;for(var t=this.data,e=0,n=0,i=0,r=0,o=0;o<t.length;){var a=t[o++];switch(1==o&&(e=t[o],n=t[o+1],i=e,r=n),a){case Pf.M:i=t[o++],r=t[o++],e=i,n=r,zf[0]=i,zf[1]=r,Bf[0]=i,Bf[1]=r;break;case Pf.L:Mr(e,n,t[o],t[o+1],zf,Bf),e=t[o++],n=t[o++];break;case Pf.C:Tr(e,n,t[o++],t[o++],t[o++],t[o++],t[o],t[o+1],zf,Bf),e=t[o++],n=t[o++];break;case Pf.Q:Ir(e,n,t[o++],t[o++],t[o],t[o+1],zf,Bf),e=t[o++],n=t[o++];break;case Pf.A:var s=t[o++],l=t[o++],h=t[o++],u=t[o++],c=t[o++],d=t[o++]+c,f=(t[o++],1-t[o++]);1==o&&(i=Nf(c)*h+s,r=Ff(c)*u+l),Cr(s,l,h,u,c,d,f,zf,Bf),e=Nf(d)*h+s,n=Ff(d)*u+l;break;case Pf.R:i=e=t[o++],r=n=t[o++];var g=t[o++],p=t[o++];Mr(i,r,i+g,r+p,zf,Bf);break;case Pf.Z:e=i,n=r;}ie(Lf,Lf,zf),re(Of,Of,Bf);}return 0===o&&(Lf[0]=Lf[1]=Of[0]=Of[1]=0),new Je(Lf[0],Lf[1],Of[0]-Lf[0],Of[1]-Lf[1]);},rebuildPath:function rebuildPath(t){for(var e,n,i,r,o,a,s=this.data,l=this._ux,h=this._uy,u=this._len,c=0;u>c;){var d=s[c++];switch(1==c&&(i=s[c],r=s[c+1],e=i,n=r),d){case Pf.M:e=i=s[c++],n=r=s[c++],t.moveTo(i,r);break;case Pf.L:o=s[c++],a=s[c++],(Hf(o-i)>l||Hf(a-r)>h||c===u-1)&&(t.lineTo(o,a),i=o,r=a);break;case Pf.C:t.bezierCurveTo(s[c++],s[c++],s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case Pf.Q:t.quadraticCurveTo(s[c++],s[c++],s[c++],s[c++]),i=s[c-2],r=s[c-1];break;case Pf.A:var f=s[c++],g=s[c++],p=s[c++],v=s[c++],m=s[c++],y=s[c++],x=s[c++],_=s[c++],w=p>v?p:v,b=p>v?1:p/v,S=p>v?v/p:1,M=Math.abs(p-v)>.001,T=m+y;M?(t.translate(f,g),t.rotate(x),t.scale(b,S),t.arc(0,0,w,m,T,1-_),t.scale(1/b,1/S),t.rotate(-x),t.translate(-f,-g)):t.arc(f,g,w,m,T,1-_),1==c&&(e=Nf(m)*p+f,n=Ff(m)*v+g),i=Nf(T)*p+f,r=Ff(T)*v+g;break;case Pf.R:e=i=s[c],n=r=s[c+1],t.rect(s[c++],s[c++],s[c++],s[c++]);break;case Pf.Z:t.closePath(),i=e,r=n;}}}},Vf.CMD=Pf;var Xf=2*Math.PI,qf=2*Math.PI,Yf=Vf.CMD,Zf=2*Math.PI,jf=1e-4,Uf=[-1,-1,-1],$f=[-1,-1],Kf=hd.prototype.getCanvasPattern,Qf=Math.abs,Jf=new Vf(!0);Wr.prototype={constructor:Wr,type:"path",__dirtyPath:!0,strokeContainThreshold:5,brush:function brush(t,e){var n=this.style,i=this.path||Jf,r=n.hasStroke(),o=n.hasFill(),a=n.fill,s=n.stroke,l=o&&!!a.colorStops,h=r&&!!s.colorStops,u=o&&!!a.image,c=r&&!!s.image;if(n.bind(t,this,e),this.setTransform(t),this.__dirty){var d;l&&(d=d||this.getBoundingRect(),this._fillGradient=n.getGradient(t,a,d)),h&&(d=d||this.getBoundingRect(),this._strokeGradient=n.getGradient(t,s,d));}l?t.fillStyle=this._fillGradient:u&&(t.fillStyle=Kf.call(a,t)),h?t.strokeStyle=this._strokeGradient:c&&(t.strokeStyle=Kf.call(s,t));var f=n.lineDash,g=n.lineDashOffset,p=!!t.setLineDash,v=this.getGlobalScale();i.setScale(v[0],v[1]),this.__dirtyPath||f&&!p&&r?(i.beginPath(t),f&&!p&&(i.setLineDash(f),i.setLineDashOffset(g)),this.buildPath(i,this.shape,!1),this.path&&(this.__dirtyPath=!1)):(t.beginPath(),this.path.rebuildPath(t)),o&&i.fill(t),f&&p&&(t.setLineDash(f),t.lineDashOffset=g),r&&i.stroke(t),f&&p&&t.setLineDash([]),this.restoreTransform(t),null!=n.text&&this.drawRectText(t,this.getBoundingRect());},buildPath:function buildPath(){},createPathProxy:function createPathProxy(){this.path=new Vf();},getBoundingRect:function getBoundingRect(){var t=this._rect,e=this.style,n=!t;if(n){var i=this.path;i||(i=this.path=new Vf()),this.__dirtyPath&&(i.beginPath(),this.buildPath(i,this.shape,!1)),t=i.getBoundingRect();}if(this._rect=t,e.hasStroke()){var r=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||n){r.copy(t);var o=e.lineWidth,a=e.strokeNoScale?this.getLineScale():1;e.hasFill()||(o=Math.max(o,this.strokeContainThreshold||4)),a>1e-10&&(r.width+=o/a,r.height+=o/a,r.x-=o/a/2,r.y-=o/a/2);}return r;}return t;},contain:function contain(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect(),r=this.style;if(t=n[0],e=n[1],i.contain(t,e)){var o=this.path.data;if(r.hasStroke()){var a=r.lineWidth,s=r.strokeNoScale?this.getLineScale():1;if(s>1e-10&&(r.hasFill()||(a=Math.max(a,this.strokeContainThreshold)),Hr(o,a/s,t,e)))return!0;}if(r.hasFill())return Gr(o,t,e);}return!1;},dirty:function dirty(t){null==t&&(t=!0),t&&(this.__dirtyPath=t,this._rect=null),this.__dirty=!0,this.__zr&&this.__zr.refresh(),this.__clipTarget&&this.__clipTarget.dirty();},animateShape:function animateShape(t){return this.animate("shape",t);},attrKV:function attrKV(t,e){"shape"===t?(this.setShape(e),this.__dirtyPath=!0,this._rect=null):ti.prototype.attrKV.call(this,t,e);},setShape:function setShape(t,e){var n=this.shape;if(n){if(S(t))for(var i in t){t.hasOwnProperty(i)&&(n[i]=t[i]);}else n[t]=e;this.dirty(!0);}return this;},getLineScale:function getLineScale(){var t=this.transform;return t&&Qf(t[0]-1)>1e-10&&Qf(t[3]-1)>1e-10?Math.sqrt(Qf(t[0]*t[3]-t[2]*t[1])):1;}},Wr.extend=function(t){var e=function e(_e2){Wr.call(this,_e2),t.style&&this.style.extendFrom(t.style,!1);var n=t.shape;if(n){this.shape=this.shape||{};var i=this.shape;for(var r in n){!i.hasOwnProperty(r)&&n.hasOwnProperty(r)&&(i[r]=n[r]);}}t.init&&t.init.call(this,_e2);};u(e,Wr);for(var n in t){"style"!==n&&"shape"!==n&&(e.prototype[n]=t[n]);}return e;},u(Wr,ti);var tg=Vf.CMD,eg=[[],[],[]],ng=Math.sqrt,ig=Math.atan2,rg=function rg(t,e){var n,i,r,o,a,s,l=t.data,h=tg.M,u=tg.C,c=tg.L,d=tg.R,f=tg.A,g=tg.Q;for(r=0,o=0;r<l.length;){switch(n=l[r++],o=r,i=0,n){case h:i=1;break;case c:i=1;break;case u:i=3;break;case g:i=2;break;case f:var p=e[4],v=e[5],m=ng(e[0]*e[0]+e[1]*e[1]),y=ng(e[2]*e[2]+e[3]*e[3]),x=ig(-e[1]/y,e[0]/m);l[r]*=m,l[r++]+=p,l[r]*=y,l[r++]+=v,l[r++]*=m,l[r++]*=y,l[r++]+=x,l[r++]+=x,r+=2,o=r;break;case d:s[0]=l[r++],s[1]=l[r++],ne(s,s,e),l[o++]=s[0],l[o++]=s[1],s[0]+=l[r++],s[1]+=l[r++],ne(s,s,e),l[o++]=s[0],l[o++]=s[1];}for(a=0;i>a;a++){var s=eg[a];s[0]=l[r++],s[1]=l[r++],ne(s,s,e),l[o++]=s[0],l[o++]=s[1];}}},og=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"],ag=Math.sqrt,sg=Math.sin,lg=Math.cos,hg=Math.PI,ug=function ug(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]);},cg=function cg(t,e){return(t[0]*e[0]+t[1]*e[1])/(ug(t)*ug(e));},dg=function dg(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(cg(t,e));},fg=function fg(t){ti.call(this,t);};fg.prototype={constructor:fg,type:"text",brush:function brush(t,e){var n=this.style;this.__dirty&&En(n,!0),n.fill=n.stroke=n.shadowBlur=n.shadowColor=n.shadowOffsetX=n.shadowOffsetY=null;var i=n.text;null!=i&&(i+=""),n.bind(t,this,e),Jn(i,n)&&(this.setTransform(t),Nn(this,t,i,n),this.restoreTransform(t));},getBoundingRect:function getBoundingRect(){var t=this.style;if(this.__dirty&&En(t,!0),!this._rect){var e=t.text;null!=e?e+="":e="";var n=xn(t.text+"",t.font,t.textAlign,t.textVerticalAlign,t.textPadding,t.rich);if(n.x+=t.x||0,n.y+=t.y||0,Un(t.textStroke,t.textStrokeWidth)){var i=t.textStrokeWidth;n.x-=i/2,n.y-=i/2,n.width+=i,n.height+=i;}this._rect=n;}return this._rect;}},u(fg,ti);var gg=Wr.extend({type:"circle",shape:{cx:0,cy:0,r:0},buildPath:function buildPath(t,e,n){n&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI,!0);}}),pg=[["shadowBlur",0],["shadowColor","#000"],["shadowOffsetX",0],["shadowOffsetY",0]],vg=function vg(t){return Uu.browser.ie&&Uu.browser.version>=11?function(){var e,n=this.__clipPaths,i=this.style;if(n)for(var r=0;r<n.length;r++){var o=n[r],a=o&&o.shape,s=o&&o.type;if(a&&("sector"===s&&a.startAngle===a.endAngle||"rect"===s&&(!a.width||!a.height))){for(var l=0;l<pg.length;l++){pg[l][2]=i[pg[l][0]],i[pg[l][0]]=pg[l][1];}e=!0;break;}}if(t.apply(this,arguments),e)for(var l=0;l<pg.length;l++){i[pg[l][0]]=pg[l][2];}}:t;},mg=Wr.extend({type:"sector",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},brush:vg(Wr.prototype.brush),buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),o=Math.max(e.r,0),a=e.startAngle,s=e.endAngle,l=e.clockwise,h=Math.cos(a),u=Math.sin(a);t.moveTo(h*r+n,u*r+i),t.lineTo(h*o+n,u*o+i),t.arc(n,i,o,a,s,!l),t.lineTo(Math.cos(s)*r+n,Math.sin(s)*r+i),0!==r&&t.arc(n,i,r,s,a,l),t.closePath();}}),yg=Wr.extend({type:"ring",shape:{cx:0,cy:0,r:0,r0:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=2*Math.PI;t.moveTo(n+e.r,i),t.arc(n,i,e.r,0,r,!1),t.moveTo(n+e.r0,i),t.arc(n,i,e.r0,0,r,!0);}}),xg=function xg(t,e){for(var n=t.length,i=[],r=0,o=1;n>o;o++){r+=Q(t[o-1],t[o]);}var a=r/2;a=n>a?n:a;for(var o=0;a>o;o++){var s,l,h,u=o/(a-1)*(e?n:n-1),c=Math.floor(u),d=u-c,f=t[c%n];e?(s=t[(c-1+n)%n],l=t[(c+1)%n],h=t[(c+2)%n]):(s=t[0===c?c:c-1],l=t[c>n-2?n-1:c+1],h=t[c>n-3?n-1:c+2]);var g=d*d,p=d*g;i.push([Ur(s[0],f[0],l[0],h[0],d,g,p),Ur(s[1],f[1],l[1],h[1],d,g,p)]);}return i;},_g=function _g(t,e,n,i){var r,o,a,s,l=[],h=[],u=[],c=[];if(i){a=[1/0,1/0],s=[-1/0,-1/0];for(var d=0,f=t.length;f>d;d++){ie(a,a,t[d]),re(s,s,t[d]);}ie(a,a,i[0]),re(s,s,i[1]);}for(var d=0,f=t.length;f>d;d++){var g=t[d];if(n)r=t[d?d-1:f-1],o=t[(d+1)%f];else{if(0===d||d===f-1){l.push(G(t[d]));continue;}r=t[d-1],o=t[d+1];}X(h,o,r),$(h,h,e);var p=Q(g,r),v=Q(g,o),m=p+v;0!==m&&(p/=m,v/=m),$(u,h,-p),$(c,h,v);var y=W([],g,u),x=W([],g,c);i&&(re(y,y,a),ie(y,y,s),re(x,x,a),ie(x,x,s)),l.push(y),l.push(x);}return n&&l.push(l.shift()),l;},wg=Wr.extend({type:"polygon",shape:{points:null,smooth:!1,smoothConstraint:null},buildPath:function buildPath(t,e){$r(t,e,!0);}}),bg=Wr.extend({type:"polyline",shape:{points:null,smooth:!1,smoothConstraint:null},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){$r(t,e,!1);}}),Sg=Wr.extend({type:"rect",shape:{r:0,x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.x,i=e.y,r=e.width,o=e.height;e.r?Bn(t,e):t.rect(n,i,r,o),t.closePath();}}),Mg=Wr.extend({type:"line",shape:{x1:0,y1:0,x2:0,y2:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.x1,i=e.y1,r=e.x2,o=e.y2,a=e.percent;0!==a&&(t.moveTo(n,i),1>a&&(r=n*(1-a)+r*a,o=i*(1-a)+o*a),t.lineTo(r,o));},pointAt:function pointAt(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t];}}),Tg=[],Ig=Wr.extend({type:"bezier-curve",shape:{x1:0,y1:0,x2:0,y2:0,cpx1:0,cpy1:0,percent:1},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.x1,i=e.y1,r=e.x2,o=e.y2,a=e.cpx1,s=e.cpy1,l=e.cpx2,h=e.cpy2,u=e.percent;0!==u&&(t.moveTo(n,i),null==l||null==h?(1>u&&(wr(n,a,r,u,Tg),a=Tg[1],r=Tg[2],wr(i,s,o,u,Tg),s=Tg[1],o=Tg[2]),t.quadraticCurveTo(a,s,r,o)):(1>u&&(pr(n,a,l,r,u,Tg),a=Tg[1],l=Tg[2],r=Tg[3],pr(i,s,h,o,u,Tg),s=Tg[1],h=Tg[2],o=Tg[3]),t.bezierCurveTo(a,s,l,h,r,o)));},pointAt:function pointAt(t){return Kr(this.shape,t,!1);},tangentAt:function tangentAt(t){var e=Kr(this.shape,t,!0);return K(e,e);}}),Cg=Wr.extend({type:"arc",shape:{cx:0,cy:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},style:{stroke:"#000",fill:null},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r,0),o=e.startAngle,a=e.endAngle,s=e.clockwise,l=Math.cos(o),h=Math.sin(o);t.moveTo(l*r+n,h*r+i),t.arc(n,i,r,o,a,!s);}}),Ag=Wr.extend({type:"compound",shape:{paths:null},_updatePathDirty:function _updatePathDirty(){for(var t=this.__dirtyPath,e=this.shape.paths,n=0;n<e.length;n++){t=t||e[n].__dirtyPath;}this.__dirtyPath=t,this.__dirty=this.__dirty||t;},beforeBrush:function beforeBrush(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),n=0;n<t.length;n++){t[n].path||t[n].createPathProxy(),t[n].path.setScale(e[0],e[1]);}},buildPath:function buildPath(t,e){for(var n=e.paths||[],i=0;i<n.length;i++){n[i].buildPath(t,n[i].shape,!0);}},afterBrush:function afterBrush(){for(var t=this.shape.paths||[],e=0;e<t.length;e++){t[e].__dirtyPath=!1;}},getBoundingRect:function getBoundingRect(){return this._updatePathDirty(),Wr.prototype.getBoundingRect.call(this);}}),Dg=function Dg(t){this.colorStops=t||[];};Dg.prototype={constructor:Dg,addColorStop:function addColorStop(t,e){this.colorStops.push({offset:t,color:e});}};var kg=function kg(t,e,n,i,r,o){this.x=null==t?0:t,this.y=null==e?0:e,this.x2=null==n?1:n,this.y2=null==i?0:i,this.type="linear",this.global=o||!1,Dg.call(this,r);};kg.prototype={constructor:kg},u(kg,Dg);var Pg=function Pg(t,e,n,i,r){this.x=null==t?.5:t,this.y=null==e?.5:e,this.r=null==n?.5:n,this.type="radial",this.global=r||!1,Dg.call(this,i);};Pg.prototype={constructor:Pg},u(Pg,Dg);var Lg=Math.round,Og=Math.max,zg=Math.min,Bg={},Eg=jr,Rg=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({extendShape:Qr,extendPath:Jr,makePath:to,makeImage:eo,mergePath:Eg,resizePath:io,subPixelOptimizeLine:ro,subPixelOptimizeRect:oo,subPixelOptimize:ao,setHoverStyle:_o,setLabelStyle:wo,setTextStyle:bo,setText:So,getFont:ko,updateProps:Lo,initProps:Oo,getTransform:zo,applyTransform:Bo,transformDirection:Eo,groupTransition:Ro,clipPointsByRect:No,clipRectByRect:Fo,createIcon:Go,Group:td,Image:ei,Text:fg,Circle:gg,Sector:mg,Ring:yg,Polygon:wg,Polyline:bg,Rect:Sg,Line:Mg,BezierCurve:Ig,Arc:Cg,CompoundPath:Ag,LinearGradient:kg,RadialGradient:Pg,BoundingRect:Je}),Ng=["textStyle","color"],Fg={getTextColor:function getTextColor(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(Ng):null);},getFont:function getFont(){return ko({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel);},getTextRect:function getTextRect(t){return xn(t,this.getFont(),this.getShallow("align"),this.getShallow("verticalAlign")||this.getShallow("baseline"),this.getShallow("padding"),this.getShallow("rich"),this.getShallow("truncateText"));}},Gg=sf([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["textPosition"],["textAlign"]]),Hg={getItemStyle:function getItemStyle(t,e){var n=Gg(this,t,e),i=this.getBorderLineDash();return i&&(n.lineDash=i),n;},getBorderLineDash:function getBorderLineDash(){var t=this.get("borderType");return"solid"===t||null==t?null:"dashed"===t?[5,5]:[1,1];}},Wg=c;Ho.prototype={constructor:Ho,init:null,mergeOption:function mergeOption(t){r(this.option,t,!0);},get:function get(t,e){return null==t?this.option:Wo(this.option,this.parsePath(t),!e&&Vo(this,t));},getShallow:function getShallow(t,e){var n=this.option,i=null==n?n:n[t],r=!e&&Vo(this,t);return null==i&&r&&(i=r.getShallow(t)),i;},getModel:function getModel(t,e){var n,i=null==t?this.option:Wo(this.option,t=this.parsePath(t));return e=e||(n=Vo(this,t))&&n.getModel(t),new Ho(i,e,this.ecModel);},isEmpty:function isEmpty(){return null==this.option;},restoreData:function restoreData(){},clone:function clone(){var t=this.constructor;return new t(i(this.option));},setReadOnly:function setReadOnly(){},parsePath:function parsePath(t){return"string"==typeof t&&(t=t.split(".")),t;},customizeGetParent:function customizeGetParent(t){tr(this,"getParent",t);},isAnimationEnabled:function isAnimationEnabled(){if(!Uu.node){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled();}}},or(Ho),Wg(Ho,hf),Wg(Ho,cf),Wg(Ho,Fg),Wg(Ho,Hg);var Vg=f,Xg=S,qg=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"],Yg={getDataParams:function getDataParams(t,e){var n=this.getData(e),i=this.getRawValue(t,e),r=n.getRawIndex(t),o=n.getName(t,!0),a=n.getRawDataItem(t),s=n.getItemVisual(t,"color");return{componentType:this.mainType,componentSubType:this.subType,seriesType:"series"===this.mainType?this.subType:null,seriesIndex:this.seriesIndex,seriesId:this.id,seriesName:this.name,name:o,dataIndex:r,data:a,dataType:e,value:i,color:s,marker:Ki(s),$vars:["seriesName","name","value"]};},getFormattedLabel:function getFormattedLabel(t,e,n,i,r){e=e||"normal";var o=this.getData(n),a=o.getItemModel(t),s=this.getDataParams(t,n);null!=i&&s.value instanceof Array&&(s.value=s.value[i]);var l=a.get([r||"label",e,"formatter"]);return"function"==typeof l?(s.status=e,l(s)):"string"==typeof l?Ui(l,s):void 0;},getRawValue:function getRawValue(t,e){var n=this.getData(e),i=n.getRawDataItem(t);return null!=i?!Xg(i)||i instanceof Array?i:i.value:void 0;},formatTooltip:R},Zg=function(){var t=0;return function(){var e="\x00__ec_prop_getter_"+t++;return function(t){return t[e]||(t[e]={});};};}(),jg=0,Ug="_",$g=f,Kg=["left","right","top","bottom","width","height"],Qg=[["width","left","right"],["height","top","bottom"]],Jg=sa,tp=(x(sa,"vertical"),x(sa,"horizontal"),{getBoxLayoutParams:function getBoxLayoutParams(){return{left:this.get("left"),top:this.get("top"),right:this.get("right"),bottom:this.get("bottom"),width:this.get("width"),height:this.get("height")};}}),ep=Array.prototype.push,np=Ho.extend({type:"component",id:"",name:"",mainType:"",subType:"",componentIndex:0,defaultOption:null,ecModel:null,dependentModels:[],uid:null,layoutMode:null,$constructor:function $constructor(t,e,n,i){Ho.call(this,t,e,n,i),this.uid=ra("componentModel");},init:function init(t,e,n){this.mergeDefaultAndTheme(t,n);},mergeDefaultAndTheme:function mergeDefaultAndTheme(t,e){var n=this.layoutMode,i=n?ua(t):{},o=e.getTheme();r(t,o.get(this.mainType)),r(t,this.getDefaultOption()),n&&ha(t,i,n);},mergeOption:function mergeOption(t){r(this.option,t,!0);var e=this.layoutMode;e&&ha(this.option,t,e);},optionUpdated:function optionUpdated(){},getDefaultOption:function getDefaultOption(){if(!nr(this,"__defaultOption")){for(var t=[],e=this.constructor;e;){var n=e.prototype.defaultOption;n&&t.push(n),e=e.superClass;}for(var i={},o=t.length-1;o>=0;o--){i=r(i,t[o],!0);}tr(this,"__defaultOption",i);}return er(this,"__defaultOption");},getReferringComponents:function getReferringComponents(t){return this.ecModel.queryComponents({mainType:t,index:this.get(t+"Index",!0),id:this.get(t+"Id",!0)});}});lr(np,{registerWhenExtend:!0}),oa(np),aa(np,da),c(np,tp);var ip="";"undefined"!=typeof navigator&&(ip=navigator.platform||"");var rp={color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3"],textStyle:{fontFamily:ip.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,animation:"auto",animationDuration:1e3,animationDurationUpdate:300,animationEasing:"exponentialOut",animationEasingUpdate:"cubicOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},op={clearColorPalette:function clearColorPalette(){tr(this,"colorIdx",0),tr(this,"colorNameMap",{});},getColorFromPalette:function getColorFromPalette(t,e){e=e||this;var n=er(e,"colorIdx")||0,i=er(e,"colorNameMap")||tr(e,"colorNameMap",{});if(i.hasOwnProperty(t))return i[t];var r=this.get("color",!0)||[];if(r.length){var o=r[n];return t&&(i[t]=o),tr(e,"colorIdx",(n+1)%r.length),o;}}},ap=f,sp=v,lp=g,hp=_,up=h,cp=S,dp="\x00_ec_inner",fp=Ho.extend({constructor:fp,init:function init(t,e,n,i){n=n||{},this.option=null,this._theme=new Ho(n),this._optionManager=i;},setOption:function setOption(t,e){L(!(dp in t),"please use chart.getOption()"),this._optionManager.setOption(t,e),this.resetOption(null);},resetOption:function resetOption(t){var e=!1,n=this._optionManager;if(!t||"recreate"===t){var i=n.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this.mergeOption(i)):ga.call(this,i),e=!0;}if(("timeline"===t||"media"===t)&&this.restoreData(),!t||"recreate"===t||"timeline"===t){var r=n.getTimelineOption(this);r&&(this.mergeOption(r),e=!0);}if(!t||"recreate"===t||"media"===t){var o=n.getMediaOption(this,this._api);o.length&&ap(o,function(t){this.mergeOption(t,e=!0);},this);}return e;},mergeOption:function mergeOption(t){function e(e,i){var r=Xo(t[e]),s=Uo(o.get(e),r);$o(s),ap(s,function(t){var n=t.option;cp(n)&&(t.keyInfo.mainType=e,t.keyInfo.subType=va(e,n,t.exist));});var l=pa(o,i);n[e]=[],o.set(e,[]),ap(s,function(t,i){var r=t.exist,s=t.option;if(L(cp(s)||r,"Empty component definition"),s){var h=np.getClass(e,t.keyInfo.subType,!0);if(r&&r instanceof h)r.name=t.keyInfo.name,r.mergeOption(s,this),r.optionUpdated(s,!1);else{var u=a({dependentModels:l,componentIndex:i},t.keyInfo);r=new h(s,this,this,u),a(r,u),r.init(s,this,this,u),r.optionUpdated(null,!0);}}else r.mergeOption({},this),r.optionUpdated({},!1);o.get(e)[i]=r,n[e][i]=r.option;},this),"series"===e&&(this._seriesIndices=ma(o.get("series")));}var n=this.option,o=this._componentsMap,s=[];ap(t,function(t,e){null!=t&&(np.hasClass(e)?s.push(e):n[e]=null==n[e]?i(t):r(n[e],t,!0));}),np.topologicalTravel(s,np.getAllClassMainTypes(),e,this),this._seriesIndices=this._seriesIndices||[];},getOption:function getOption(){var t=i(this.option);return ap(t,function(e,n){if(np.hasClass(n)){for(var e=Xo(e),i=e.length-1;i>=0;i--){Ko(e[i])&&e.splice(i,1);}t[n]=e;}}),delete t[dp],t;},getTheme:function getTheme(){return this._theme;},getComponent:function getComponent(t,e){var n=this._componentsMap.get(t);return n?n[e||0]:void 0;},queryComponents:function queryComponents(t){var e=t.mainType;if(!e)return[];var n=t.index,i=t.id,r=t.name,o=this._componentsMap.get(e);if(!o||!o.length)return[];var a;if(null!=n)hp(n)||(n=[n]),a=sp(lp(n,function(t){return o[t];}),function(t){return!!t;});else if(null!=i){var s=hp(i);a=sp(o,function(t){return s&&up(i,t.id)>=0||!s&&t.id===i;});}else if(null!=r){var l=hp(r);a=sp(o,function(t){return l&&up(r,t.name)>=0||!l&&t.name===r;});}else a=o.slice();return ya(a,t);},findComponents:function findComponents(t){function e(t){var e=r+"Index",n=r+"Id",i=r+"Name";return!t||null==t[e]&&null==t[n]&&null==t[i]?null:{mainType:r,index:t[e],id:t[n],name:t[i]};}function n(e){return t.filter?sp(e,t.filter):e;}var i=t.query,r=t.mainType,o=e(i),a=o?this.queryComponents(o):this._componentsMap.get(r);return n(ya(a,t));},eachComponent:function eachComponent(t,e,n){var i=this._componentsMap;if("function"==typeof t)n=e,e=t,i.each(function(t,i){ap(t,function(t,r){e.call(n,i,t,r);});});else if(b(t))ap(i.get(t),e,n);else if(cp(t)){var r=this.findComponents(t);ap(r,e,n);}},getSeriesByName:function getSeriesByName(t){var e=this._componentsMap.get("series");return sp(e,function(e){return e.name===t;});},getSeriesByIndex:function getSeriesByIndex(t){return this._componentsMap.get("series")[t];},getSeriesByType:function getSeriesByType(t){var e=this._componentsMap.get("series");return sp(e,function(e){return e.subType===t;});},getSeries:function getSeries(){return this._componentsMap.get("series").slice();},eachSeries:function eachSeries(t,e){ap(this._seriesIndices,function(n){var i=this._componentsMap.get("series")[n];t.call(e,i,n);},this);},eachRawSeries:function eachRawSeries(t,e){ap(this._componentsMap.get("series"),t,e);},eachSeriesByType:function eachSeriesByType(t,e,n){ap(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];r.subType===t&&e.call(n,r,i);},this);},eachRawSeriesByType:function eachRawSeriesByType(t,e,n){return ap(this.getSeriesByType(t),e,n);},isSeriesFiltered:function isSeriesFiltered(t){return h(this._seriesIndices,t.componentIndex)<0;},getCurrentSeriesIndices:function getCurrentSeriesIndices(){return(this._seriesIndices||[]).slice();},filterSeries:function filterSeries(t,e){var n=sp(this._componentsMap.get("series"),t,e);this._seriesIndices=ma(n);},restoreData:function restoreData(){var t=this._componentsMap;this._seriesIndices=ma(t.get("series"));var e=[];t.each(function(t,n){e.push(n);}),np.topologicalTravel(e,np.getAllClassMainTypes(),function(e){ap(t.get(e),function(t){t.restoreData();});});}});c(fp,op);var gp=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getModel","getOption","getViewOfComponentModel","getViewOfSeriesModel"],pp={};_a.prototype={constructor:_a,create:function create(t,e){var n=[];f(pp,function(i){var r=i.create(t,e);n=n.concat(r||[]);}),this._coordinateSystems=n;},update:function update(t,e){f(this._coordinateSystems,function(n){n.update&&n.update(t,e);});},getCoordinateSystems:function getCoordinateSystems(){return this._coordinateSystems.slice();}},_a.register=function(t,e){pp[t]=e;},_a.get=function(t){return pp[t];};var vp=f,mp=i,yp=g,xp=r,_p=/^(min|max)?(.+)$/;wa.prototype={constructor:wa,setOption:function setOption(t,e){t=mp(t,!0);var n=this._optionBackup,i=ba.call(this,t,e,!n);this._newBaseOption=i.baseOption,n?(Ia(n.baseOption,i.baseOption),i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i;},mountOption:function mountOption(t){var e=this._optionBackup;return this._timelineOptions=yp(e.timelineOptions,mp),this._mediaList=yp(e.mediaList,mp),this._mediaDefault=mp(e.mediaDefault),this._currentMediaIndices=[],mp(t?e.baseOption:this._newBaseOption);},getTimelineOption:function getTimelineOption(t){var e,n=this._timelineOptions;if(n.length){var i=t.getComponent("timeline");i&&(e=mp(n[i.getCurrentIndex()],!0));}return e;},getMediaOption:function getMediaOption(){var t=this._api.getWidth(),e=this._api.getHeight(),n=this._mediaList,i=this._mediaDefault,r=[],o=[];if(!n.length&&!i)return o;for(var a=0,s=n.length;s>a;a++){Sa(n[a].query,t,e)&&r.push(a);}return!r.length&&i&&(r=[-1]),r.length&&!Ta(r,this._currentMediaIndices)&&(o=yp(r,function(t){return mp(-1===t?i.option:n[t].option);})),this._currentMediaIndices=r,o;}};var wp=f,bp=S,Sp=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"],Mp=function Mp(t,e){wp(Pa(t.series),function(t){bp(t)&&ka(t);});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];e&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),wp(n,function(e){wp(Pa(t[e]),function(t){t&&(Aa(t,"axisLabel"),Aa(t.axisPointer,"label"));});}),wp(Pa(t.parallel),function(t){var e=t&&t.parallelAxisDefault;Aa(e,"axisLabel"),Aa(e&&e.axisPointer,"label");}),wp(Pa(t.calendar),function(t){Aa(t,"dayLabel"),Aa(t,"monthLabel"),Aa(t,"yearLabel");}),wp(Pa(t.radar),function(t){Aa(t,"name");}),wp(Pa(t.geo),function(t){bp(t)&&(Da(t.label),wp(Pa(t.regions),function(t){Da(t.label);}));}),Da(La(t.timeline).label),Aa(La(t.axisPointer),"label"),Aa(La(t.tooltip).axisPointer,"label");},Tp=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],Ip=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],Cp=["bar","boxplot","candlestick","chord","effectScatter","funnel","gauge","lines","graph","heatmap","line","map","parallel","pie","radar","sankey","scatter","treemap"],Ap=function Ap(t,e){Mp(t,e),t.series=Xo(t.series),f(t.series,function(t){if(S(t)){var e=t.type;if(("pie"===e||"gauge"===e)&&null!=t.clockWise&&(t.clockwise=t.clockWise),"gauge"===e){var n=Oa(t,"pointer.color");null!=n&&za(t,"itemStyle.normal.color",n);}for(var i=0;i<Cp.length;i++){if(Cp[i]===t.type){Ba(t);break;}}}}),t.dataRange&&(t.visualMap=t.dataRange),f(Ip,function(e){var n=t[e];n&&(_(n)||(n=[n]),f(n,function(t){Ba(t);}));});},Dp=np.extend({type:"series.__base__",seriesIndex:0,coordinateSystem:null,defaultOption:null,legendDataProvider:null,visualColorAccessPath:"itemStyle.normal.color",layoutMode:null,init:function init(t,e,n){this.seriesIndex=this.componentIndex,this.mergeDefaultAndTheme(t,n);var i=this.getInitialData(t,n);tr(this,"dataBeforeProcessed",i),this.restoreData();},mergeDefaultAndTheme:function mergeDefaultAndTheme(t,e){var n=this.layoutMode,i=n?ua(t):{},o=this.subType;np.hasClass(o)&&(o+="Series"),r(t,e.getTheme().get(this.subType)),r(t,this.getDefaultOption()),qo(t.label,["show"]),this.fillDataTextStyle(t.data),n&&ha(t,i,n);},mergeOption:function mergeOption(t,e){t=r(this.option,t,!0),this.fillDataTextStyle(t.data);var n=this.layoutMode;n&&ha(this.option,t,n);var i=this.getInitialData(t,e);i&&(tr(this,"data",i),tr(this,"dataBeforeProcessed",i.cloneShallow()));},fillDataTextStyle:function fillDataTextStyle(t){if(t)for(var e=["show"],n=0;n<t.length;n++){t[n]&&t[n].label&&qo(t[n].label,e);}},getInitialData:function getInitialData(){},getData:function getData(t){var e=er(this,"data");return null==t?e:e.getLinkedData(t);},setData:function setData(t){tr(this,"data",t);},getRawData:function getRawData(){return er(this,"dataBeforeProcessed");},coordDimToDataDim:function coordDimToDataDim(t){return ea(this.getData(),t);},dataDimToCoordDim:function dataDimToCoordDim(t){return ta(this.getData(),t);},getBaseAxis:function getBaseAxis(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis();},formatTooltip:function formatTooltip(t,e){function n(n){function r(t,n){var r=i.getDimensionInfo(n);if(r&&r.otherDims.tooltip!==!1){var s=r.type,l=(o?"- "+(r.tooltipName||r.name)+": ":"")+("ordinal"===s?t+"":"time"===s?e?"":Qi("yyyy/MM/dd hh:mm:ss",t):Yi(t));l&&a.push(ji(l));}}var o=p(n,function(t,e,n){var r=i.getDimensionInfo(n);return t|=r&&r.tooltip!==!1&&null!=r.tooltipName;},0),a=[],s=na(i,"tooltip");return s.length?f(s,function(e){r(i.get(e,t),e);}):f(n,r),(o?"<br/>":"")+a.join(o?"<br/>":", ");}var i=er(this,"data"),r=this.getRawValue(t),o=_(r)?n(r):ji(Yi(r)),a=i.getName(t),s=i.getItemVisual(t,"color");S(s)&&s.colorStops&&(s=(s.colorStops[0]||{}).color),s=s||"transparent";var l=Ki(s),h=this.name;return"\x00-"===h&&(h=""),h=h?ji(h)+(e?": ":"<br/>"):"",e?l+h+o:h+l+(a?ji(a)+": "+o:o);},isAnimationEnabled:function isAnimationEnabled(){if(Uu.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),t;},restoreData:function restoreData(){tr(this,"data",er(this,"dataBeforeProcessed").cloneShallow());},getColorFromPalette:function getColorFromPalette(t,e){var n=this.ecModel,i=op.getColorFromPalette.call(this,t,e);return i||(i=n.getColorFromPalette(t,e)),i;},getAxisTooltipData:null,getTooltipPosition:null});c(Dp,Yg),c(Dp,op);var kp=function kp(){this.group=new td(),this.uid=ra("viewComponent");};kp.prototype={constructor:kp,init:function init(){},render:function render(){},dispose:function dispose(){}};var Pp=kp.prototype;Pp.updateView=Pp.updateLayout=Pp.updateVisual=function(){},or(kp),lr(kp,{registerWhenExtend:!0}),Ea.prototype={type:"chart",init:function init(){},render:function render(){},highlight:function highlight(t,e,n,i){Na(t.getData(),i,"emphasis");},downplay:function downplay(t,e,n,i){Na(t.getData(),i,"normal");},remove:function remove(){this.group.removeAll();},dispose:function dispose(){}};var Lp=Ea.prototype;Lp.updateView=Lp.updateLayout=Lp.updateVisual=function(t,e,n,i){this.render(t,e,n,i);},or(Ea,["dispose"]),lr(Ea,{registerWhenExtend:!0});var Op="\x00__throttleOriginMethod",zp="\x00__throttleRate",Bp="\x00__throttleType",Ep=function Ep(t){function e(e){var n=(e.visualColorAccessPath||"itemStyle.normal.color").split("."),i=e.getData(),r=e.get(n)||e.getColorFromPalette(e.get("name"));i.setVisual("color",r),t.isSeriesFiltered(e)||("function"!=typeof r||r instanceof Dg||i.each(function(t){i.setItemVisual(t,"color",r(e.getDataParams(t)));}),i.each(function(t){var e=i.getItemModel(t),r=e.get(n,!0);null!=r&&i.setItemVisual(t,"color",r);}));}t.eachRawSeries(e);},Rp=Math.PI,Np=function Np(t,e){e=e||{},s(e,{text:"loading",color:"#c23531",textColor:"#000",maskColor:"rgba(255, 255, 255, 0.8)",zlevel:0});var n=new Sg({style:{fill:e.maskColor},zlevel:e.zlevel,z:1e4}),i=new Cg({shape:{startAngle:-Rp/2,endAngle:-Rp/2+.1,r:10},style:{stroke:e.color,lineCap:"round",lineWidth:5},zlevel:e.zlevel,z:10001}),r=new Sg({style:{fill:"none",text:e.text,textPosition:"right",textDistance:10,textFill:e.textColor},zlevel:e.zlevel,z:10001});i.animateShape(!0).when(1e3,{endAngle:3*Rp/2}).start("circularInOut"),i.animateShape(!0).when(1e3,{startAngle:3*Rp/2}).delay(300).start("circularInOut");var o=new td();return o.add(i),o.add(r),o.add(n),o.resize=function(){var e=t.getWidth()/2,o=t.getHeight()/2;i.setShape({cx:e,cy:o});var a=i.shape.r;r.setShape({x:e-a,y:o-a,width:2*a,height:2*a}),n.setShape({x:0,y:0,width:t.getWidth(),height:t.getHeight()});},o.resize(),o;},Fp=f,Gp=np.parseClassType,Hp="3.8.4",Wp={zrender:"3.7.3"},Vp=1e3,Xp=5e3,qp=1e3,Yp=2e3,Zp=3e3,jp=4e3,Up=5e3,$p={PROCESSOR:{FILTER:Vp,STATISTIC:Xp},VISUAL:{LAYOUT:qp,GLOBAL:Yp,CHART:Zp,COMPONENT:jp,BRUSH:Up}},Kp="__flagInMainProcess",Qp="__hasGradientOrPatternBg",Jp="__optionUpdated",tv=/^[a-zA-Z0-9_]+$/;Wa.prototype.on=Ha("on"),Wa.prototype.off=Ha("off"),Wa.prototype.one=Ha("one"),c(Wa,xc);var ev=Va.prototype;ev._onframe=function(){if(this[Jp]){var t=this[Jp].silent;this[Kp]=!0,nv.prepareAndUpdate.call(this),this[Kp]=!1,this[Jp]=!1,Za.call(this,t),ja.call(this,t);}},ev.getDom=function(){return this._dom;},ev.getZr=function(){return this._zr;},ev.setOption=function(t,e,n){var i;if(S(e)&&(n=e.lazyUpdate,i=e.silent,e=e.notMerge),this[Kp]=!0,!this._model||e){var r=new wa(this._api),o=this._theme,a=this._model=new fp(null,null,o,r);a.init(null,null,o,r);}this._model.setOption(t,sv),n?(this[Jp]={silent:i},this[Kp]=!1):(nv.prepareAndUpdate.call(this),this._zr.flush(),this[Jp]=!1,this[Kp]=!1,Za.call(this,i),ja.call(this,i));},ev.setTheme=function(){console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0");},ev.getModel=function(){return this._model;},ev.getOption=function(){return this._model&&this._model.getOption();},ev.getWidth=function(){return this._zr.getWidth();},ev.getHeight=function(){return this._zr.getHeight();},ev.getDevicePixelRatio=function(){return this._zr.painter.dpr||window.devicePixelRatio||1;},ev.getRenderedCanvas=function(t){if(Uu.canvasSupported){t=t||{},t.pixelRatio=t.pixelRatio||1,t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor");var e=this._zr,n=e.storage.getDisplayList();return f(n,function(t){t.stopAnimation(!0);}),e.painter.getRenderedCanvas(t);}},ev.getSvgDataUrl=function(){if(Uu.svgSupported){var t=this._zr,e=t.storage.getDisplayList();return f(e,function(t){t.stopAnimation(!0);}),t.painter.pathToSvg();}},ev.getDataURL=function(t){t=t||{};var e=t.excludeComponents,n=this._model,i=[],r=this;Fp(e,function(t){n.eachComponent({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group.ignore||(i.push(e),e.group.ignore=!0);});});var o="svg"===this._zr.painter.getType()?this.getSvgDataUrl():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return Fp(i,function(t){t.group.ignore=!1;}),o;},ev.getConnectedDataURL=function(t){if(Uu.canvasSupported){var e=this.group,n=Math.min,r=Math.max,o=1/0;if(fv[e]){var a=o,s=o,l=-o,h=-o,u=[],c=t&&t.pixelRatio||1;f(dv,function(o){if(o.group===e){var c=o.getRenderedCanvas(i(t)),d=o.getDom().getBoundingClientRect();a=n(d.left,a),s=n(d.top,s),l=r(d.right,l),h=r(d.bottom,h),u.push({dom:c,left:d.left,top:d.top});}}),a*=c,s*=c,l*=c,h*=c;var d=l-a,g=h-s,p=ac();p.width=d,p.height=g;var v=Mi(p);return Fp(u,function(t){var e=new ei({style:{x:t.left*c-a,y:t.top*c-s,image:t.dom}});v.add(e);}),v.refreshImmediately(),p.toDataURL("image/"+(t&&t.type||"png"));}return this.getDataURL(t);}},ev.convertToPixel=x(Xa,"convertToPixel"),ev.convertFromPixel=x(Xa,"convertFromPixel"),ev.containPixel=function(t,e){var n,i=this._model;return t=Jo(i,t),f(t,function(t,i){i.indexOf("Models")>=0&&f(t,function(t){var r=t.coordinateSystem;if(r&&r.containPoint)n|=!!r.containPoint(e);else if("seriesModels"===i){var o=this._chartsMap[t.__viewId];o&&o.containPoint&&(n|=o.containPoint(e,t));}},this);},this),!!n;},ev.getVisual=function(t,e){var n=this._model;t=Jo(n,t,{defaultMainType:"series"});var i=t.seriesModel,r=i.getData(),o=t.hasOwnProperty("dataIndexInside")?t.dataIndexInside:t.hasOwnProperty("dataIndex")?r.indexOfRawIndex(t.dataIndex):null;return null!=o?r.getItemVisual(o,e):r.getVisual(e);},ev.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId];},ev.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId];};var nv={update:function update(t){var e=this._model,n=this._api,i=this._coordSysMgr,r=this._zr;if(e){e.restoreData(),i.create(this._model,this._api),Ka.call(this,e,n),Qa.call(this,e),i.update(e,n),ts.call(this,e,t),es.call(this,e,t);var o=e.get("backgroundColor")||"transparent",a=r.painter;if(a.isSingleCanvas&&a.isSingleCanvas())r.configLayer(0,{clearColor:o});else{if(!Uu.canvasSupported){var s=ke(o);o=Fe(s,"rgb"),0===s[3]&&(o="transparent");}o.colorStops||o.image?(r.configLayer(0,{clearColor:o}),this[Qp]=!0,this._dom.style.background="transparent"):(this[Qp]&&r.configLayer(0,{clearColor:null}),this[Qp]=!1,this._dom.style.background=o);}Fp(lv,function(t){t(e,n);});}},updateView:function updateView(t){var e=this._model;e&&(e.eachSeries(function(t){t.getData().clearAllVisual();}),ts.call(this,e,t),Ua.call(this,"updateView",e,t));},updateVisual:function updateVisual(t){var e=this._model;e&&(e.eachSeries(function(t){t.getData().clearAllVisual();}),ts.call(this,e,t,!0),Ua.call(this,"updateVisual",e,t));},updateLayout:function updateLayout(t){var e=this._model;e&&(Ja.call(this,e,t),Ua.call(this,"updateLayout",e,t));},prepareAndUpdate:function prepareAndUpdate(t){var e=this._model;$a.call(this,"component",e),$a.call(this,"chart",e),nv.update.call(this,t);}};ev.resize=function(t){this[Kp]=!0,this._zr.resize(t);var e=this._model&&this._model.resetOption("media"),n=e?"prepareAndUpdate":"update";nv[n].call(this),this._loadingFX&&this._loadingFX.resize(),this[Kp]=!1;var i=t&&t.silent;Za.call(this,i),ja.call(this,i);},ev.showLoading=function(t,e){if(S(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),cv[t]){var n=cv[t](this._api,e),i=this._zr;this._loadingFX=n,i.add(n);}},ev.hideLoading=function(){this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null;},ev.makeActionFromEvent=function(t){var e=a({},t);return e.type=ov[t.type],e;},ev.dispatchAction=function(t,e){if(S(e)||(e={silent:!!e}),rv[t.type]&&this._model){if(this[Kp])return void this._pendingActions.push(t);Ya.call(this,t,e.silent),e.flush?this._zr.flush(!0):e.flush!==!1&&Uu.browser.weChat&&this._throttledZrFlush(),Za.call(this,e.silent),ja.call(this,e.silent);}},ev.on=Ha("on"),ev.off=Ha("off"),ev.one=Ha("one");var iv=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"];ev._initEvents=function(){Fp(iv,function(t){this._zr.on(t,function(e){var n,i=this.getModel(),r=e.target;if("globalout"===t)n={};else if(r&&null!=r.dataIndex){var o=r.dataModel||i.getSeriesByIndex(r.seriesIndex);n=o&&o.getDataParams(r.dataIndex,r.dataType)||{};}else r&&r.eventData&&(n=a({},r.eventData));n&&(n.event=e,n.type=t,this.trigger(t,n));},this);},this),Fp(ov,function(t,e){this._messageCenter.on(e,function(t){this.trigger(e,t);},this);},this);},ev.isDisposed=function(){return this._disposed;},ev.clear=function(){this.setOption({series:[]},!0);},ev.dispose=function(){if(!this._disposed){this._disposed=!0;var t=this._api,e=this._model;Fp(this._componentsViews,function(n){n.dispose(e,t);}),Fp(this._chartsViews,function(n){n.dispose(e,t);}),this._zr.dispose(),delete dv[this.id];}},c(Va,xc);var rv={},ov={},av=[],sv=[],lv=[],hv=[],uv={},cv={},dv={},fv={},gv=new Date()-0,pv=new Date()-0,vv="_echarts_instance_",mv={},yv=hs;ws(Yp,Ep),gs(Ap),bs("default",Np),ms({type:"highlight",event:"highlight",update:"highlight"},R),ms({type:"downplay",event:"downplay",update:"downplay"},R);var xv={};Ps.prototype={constructor:Ps,add:function add(t){return this._add=t,this;},update:function update(t){return this._update=t,this;},remove:function remove(t){return this._remove=t,this;},execute:function execute(){var t,e=this._old,n=this._new,i={},r={},o=[],a=[];for(Ls(e,i,o,"_oldKeyGetter",this),Ls(n,r,a,"_newKeyGetter",this),t=0;t<e.length;t++){var s=o[t],l=r[s];if(null!=l){var h=l.length;h?(1===h&&(r[s]=null),l=l.unshift()):r[s]=null,this._update&&this._update(l,t);}else this._remove&&this._remove(t);}for(var t=0;t<a.length;t++){var s=a[t];if(r.hasOwnProperty(s)){var l=r[s];if(null==l)continue;if(l.length)for(var u=0,h=l.length;h>u;u++){this._add&&this._add(l[u]);}else this._add&&this._add(l);}}}};var _v=S,wv="undefined",bv=(typeof window==="undefined"?"undefined":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(window))===wv?global:window,Sv={"float":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(bv.Float64Array)===wv?Array:bv.Float64Array,"int":__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(bv.Int32Array)===wv?Array:bv.Int32Array,ordinal:Array,number:Array,time:Array},Mv=["stackedOn","hasItemOption","_nameList","_idList","_rawData"];zs.prototype.pure=!1,zs.prototype.count=function(){return this._array.length;},zs.prototype.getItem=function(t){return this._array[t];};var Tv=function Tv(t,e){t=t||["x","y"];for(var n={},i=[],r=0;r<t.length;r++){var o,a={};"string"==typeof t[r]?(o=t[r],a={name:o,coordDim:o,coordDimIndex:0,stackable:!1,type:"number"}):(a=t[r],o=a.name,a.type=a.type||"number",a.coordDim||(a.coordDim=o,a.coordDimIndex=0)),a.otherDims=a.otherDims||{},i.push(o),n[o]=a;}this.dimensions=i,this._dimensionInfos=n,this.hostModel=e,this.dataType,this.indices=[],this._storage={},this._nameList=[],this._idList=[],this._optionModels=[],this.stackedOn=null,this._visual={},this._layout={},this._itemVisuals=[],this._itemLayouts=[],this._graphicEls=[],this._rawData,this._extent;},Iv=Tv.prototype;Iv.type="list",Iv.hasItemOption=!0,Iv.getDimension=function(t){return isNaN(t)||(t=this.dimensions[t]||t),t;},Iv.getDimensionInfo=function(t){return i(this._dimensionInfos[this.getDimension(t)]);},Iv.initData=function(t,e,n){t=t||[];var i=_(t);i&&(t=new zs(t)),this._rawData=t;var r,o=this._storage={},a=this.indices=[],s=this.dimensions,l=this._dimensionInfos,h=t.count(),u=[],c={};e=e||[];for(var d=0;d<s.length;d++){var f=l[s[d]];0===f.otherDims.itemName&&(r=d);var g=Sv[f.type];o[s[d]]=new g(h);}var p=this;n||(p.hasItemOption=!1),n=n||function(t,e,n,i){var r=Yo(t);return Zo(t)&&(p.hasItemOption=!0),jo(r instanceof Array?r[i]:r,l[e]);};for(var d=0;h>d;d++){for(var v=t.getItem(d),m=0;m<s.length;m++){var y=s[m],x=o[y];x[d]=n(v,y,d,m);}a.push(d);}for(var d=0;h>d;d++){var v=t.getItem(d);!e[d]&&v&&(null!=v.name?e[d]=v.name:null!=r&&(e[d]=o[s[r]][d]));var w=e[d]||"",b=v&&v.id;!b&&w&&(c[w]=c[w]||0,b=w,c[w]>0&&(b+="__ec__"+c[w]),c[w]++),b&&(u[d]=b);}this._nameList=e,this._idList=u;},Iv.count=function(){return this.indices.length;},Iv.get=function(t,e,n){var i=this._storage,r=this.indices[e];if(null==r||!i[t])return 0/0;var o=i[t][r];if(n){var a=this._dimensionInfos[t];if(a&&a.stackable)for(var s=this.stackedOn;s;){var l=s.get(t,e);(o>=0&&l>0||0>=o&&0>l)&&(o+=l),s=s.stackedOn;}}return o;},Iv.getValues=function(t,e,n){var i=[];_(t)||(n=e,e=t,t=this.dimensions);for(var r=0,o=t.length;o>r;r++){i.push(this.get(t[r],e,n));}return i;},Iv.hasValue=function(t){for(var e=this.dimensions,n=this._dimensionInfos,i=0,r=e.length;r>i;i++){if("ordinal"!==n[e[i]].type&&isNaN(this.get(e[i],t)))return!1;}return!0;},Iv.getDataExtent=function(t,e,n){t=this.getDimension(t);var i=this._storage[t],r=this.getDimensionInfo(t);e=r&&r.stackable&&e;var o,a=(this._extent||(this._extent={}))[t+!!e];if(a)return a;if(i){for(var s=1/0,l=-1/0,h=0,u=this.count();u>h;h++){o=this.get(t,h,e),(!n||n(o,t,h))&&(s>o&&(s=o),o>l&&(l=o));}return this._extent[t+!!e]=[s,l];}return[1/0,-1/0];},Iv.getSum=function(t,e){var n=this._storage[t],i=0;if(n)for(var r=0,o=this.count();o>r;r++){var a=this.get(t,r,e);isNaN(a)||(i+=a);}return i;},Iv.indexOf=function(t,e){var n=this._storage,i=n[t],r=this.indices;if(i)for(var o=0,a=r.length;a>o;o++){var s=r[o];if(i[s]===e)return o;}return-1;},Iv.indexOfName=function(t){for(var e=this.indices,n=this._nameList,i=0,r=e.length;r>i;i++){var o=e[i];if(n[o]===t)return i;}return-1;},Iv.indexOfRawIndex=function(t){var e=this.indices,n=e[t];if(null!=n&&n===t)return t;for(var i=0,r=e.length-1;r>=i;){var o=(i+r)/2|0;if(e[o]<t)i=o+1;else{if(!(e[o]>t))return o;r=o-1;}}return-1;},Iv.indicesOfNearest=function(t,e,n,i){var r=this._storage,o=r[t],a=[];if(!o)return a;null==i&&(i=1/0);for(var s=Number.MAX_VALUE,l=-1,h=0,u=this.count();u>h;h++){var c=e-this.get(t,h,n),d=Math.abs(c);i>=c&&s>=d&&((s>d||c>=0&&0>l)&&(s=d,l=c,a.length=0),a.push(h));}return a;},Iv.getRawIndex=function(t){var e=this.indices[t];return null==e?-1:e;},Iv.getRawDataItem=function(t){return this._rawData.getItem(this.getRawIndex(t));},Iv.getName=function(t){return this._nameList[this.indices[t]]||"";},Iv.getId=function(t){return this._idList[this.indices[t]]||this.getRawIndex(t)+"";},Iv.each=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),t=g(Bs(t),this.getDimension,this);var r=[],o=t.length,a=this.indices;i=i||this;for(var s=0;s<a.length;s++){switch(o){case 0:e.call(i,s);break;case 1:e.call(i,this.get(t[0],s,n),s);break;case 2:e.call(i,this.get(t[0],s,n),this.get(t[1],s,n),s);break;default:for(var l=0;o>l;l++){r[l]=this.get(t[l],s,n);}r[l]=s,e.apply(i,r);}}},Iv.filterSelf=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),t=g(Bs(t),this.getDimension,this);var r=[],o=[],a=t.length,s=this.indices;i=i||this;for(var l=0;l<s.length;l++){var h;if(a){if(1===a)h=e.call(i,this.get(t[0],l,n),l);else{for(var u=0;a>u;u++){o[u]=this.get(t[u],l,n);}o[u]=l,h=e.apply(i,o);}}else h=e.call(i,l);h&&r.push(s[l]);}return this.indices=r,this._extent={},this;},Iv.mapArray=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]);var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments));},n,i),r;},Iv.map=function(t,e,n,i){t=g(Bs(t),this.getDimension,this);var r=Es(this,t),o=r.indices=this.indices,a=r._storage,s=[];return this.each(t,function(){var n=arguments[arguments.length-1],i=e&&e.apply(this,arguments);if(null!=i){"number"==typeof i&&(s[0]=i,i=s);for(var r=0;r<i.length;r++){var l=t[r],h=a[l],u=o[n];h&&(h[u]=i[r]);}}},n,i),r;},Iv.downSample=function(t,e,n,i){for(var r=Es(this,[t]),o=this._storage,a=r._storage,s=this.indices,l=r.indices=[],h=[],u=[],c=Math.floor(1/e),d=a[t],f=this.count(),g=0;g<o[t].length;g++){a[t][g]=o[t][g];}for(var g=0;f>g;g+=c){c>f-g&&(c=f-g,h.length=c);for(var p=0;c>p;p++){var v=s[g+p];h[p]=d[v],u[p]=v;}var m=n(h),v=u[i(h,m)||0];d[v]=m,l.push(v);}return r;},Iv.getItemModel=function(t){var e=this.hostModel;return t=this.indices[t],new Ho(this._rawData.getItem(t),e,e&&e.ecModel);},Iv.diff=function(t){var e,n=this._idList,i=t&&t._idList,r="e\x00\x00";return new Ps(t?t.indices:[],this.indices,function(t){return null!=(e=i[t])?e:r+t;},function(t){return null!=(e=n[t])?e:r+t;});},Iv.getVisual=function(t){var e=this._visual;return e&&e[t];},Iv.setVisual=function(t,e){if(_v(t))for(var n in t){t.hasOwnProperty(n)&&this.setVisual(n,t[n]);}else this._visual=this._visual||{},this._visual[t]=e;},Iv.setLayout=function(t,e){if(_v(t))for(var n in t){t.hasOwnProperty(n)&&this.setLayout(n,t[n]);}else this._layout[t]=e;},Iv.getLayout=function(t){return this._layout[t];},Iv.getItemLayout=function(t){return this._itemLayouts[t];},Iv.setItemLayout=function(t,e,n){this._itemLayouts[t]=n?a(this._itemLayouts[t]||{},e):e;},Iv.clearItemLayouts=function(){this._itemLayouts.length=0;},Iv.getItemVisual=function(t,e,n){var i=this._itemVisuals[t],r=i&&i[e];return null!=r||n?r:this.getVisual(e);},Iv.setItemVisual=function(t,e,n){var i=this._itemVisuals[t]||{};if(this._itemVisuals[t]=i,_v(e))for(var r in e){e.hasOwnProperty(r)&&(i[r]=e[r]);}else i[e]=n;},Iv.clearAllVisual=function(){this._visual={},this._itemVisuals=[];};var Cv=function Cv(t){t.seriesIndex=this.seriesIndex,t.dataIndex=this.dataIndex,t.dataType=this.dataType;};Iv.setItemGraphicEl=function(t,e){var n=this.hostModel;e&&(e.dataIndex=t,e.dataType=this.dataType,e.seriesIndex=n&&n.seriesIndex,"group"===e.type&&e.traverse(Cv,e)),this._graphicEls[t]=e;},Iv.getItemGraphicEl=function(t){return this._graphicEls[t];},Iv.eachItemGraphicEl=function(t,e){f(this._graphicEls,function(n,i){n&&t&&t.call(e,n,i);});},Iv.cloneShallow=function(){var t=g(this.dimensions,this.getDimensionInfo,this),e=new Tv(t,this.hostModel);return e._storage=this._storage,Os(e,this),e.indices=this.indices.slice(),this._extent&&(e._extent=a({},this._extent)),e;},Iv.wrapMethod=function(t,e){var n=this[t];"function"==typeof n&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=n.apply(this,arguments);return e.apply(this,[t].concat(k(arguments)));});},Iv.TRANSFERABLE_METHODS=["cloneShallow","downSample","map"],Iv.CHANGABLE_METHODS=["filterSelf"];var Av=f,Dv=b,kv=s,Pv={tooltip:1,label:1,itemName:1},Lv=Rs.guessOrdinal=function(t,e){for(var n=0,i=t.length;i>n;n++){var r=Ns(t[n]);if(!_(r))return!1;var r=r[e];if(null!=r&&isFinite(r)&&""!==r)return!1;if(Dv(r)&&"-"!==r)return!0;}return!1;},Ov={cartesian2d:function cartesian2d(t,e,n,i){var r=g(["xAxis","yAxis"],function(t){return n.queryComponents({mainType:t,index:e.get(t+"Index"),id:e.get(t+"Id")})[0];}),o=r[0],a=r[1],s=o.get("type"),l=a.get("type"),h=[{name:"x",type:Vs(s),stackable:Ws(s)},{name:"y",type:Vs(l),stackable:Ws(l)}],u="category"===s,c="category"===l;h=Rs(h,t,i);var d={};return u&&(d.x=o),c&&(d.y=a),{dimensions:h,categoryIndex:u?0:c?1:-1,categoryAxesModels:d};},singleAxis:function singleAxis(t,e,n,i){var r=n.queryComponents({mainType:"singleAxis",index:e.get("singleAxisIndex"),id:e.get("singleAxisId")})[0],o=r.get("type"),a="category"===o,s=[{name:"single",type:Vs(o),stackable:Ws(o)}];s=Rs(s,t,i);var l={};return a&&(l.single=r),{dimensions:s,categoryIndex:a?0:-1,categoryAxesModels:l};},polar:function polar(t,e,n,i){var r=n.queryComponents({mainType:"polar",index:e.get("polarIndex"),id:e.get("polarId")})[0],o=r.findAxisModel("angleAxis"),a=r.findAxisModel("radiusAxis"),s=a.get("type"),l=o.get("type"),h=[{name:"radius",type:Vs(s),stackable:Ws(s)},{name:"angle",type:Vs(l),stackable:Ws(l)}],u="category"===l,c="category"===s;h=Rs(h,t,i);var d={};return c&&(d.radius=a),u&&(d.angle=o),{dimensions:h,categoryIndex:u?1:c?0:-1,categoryAxesModels:d};},geo:function geo(t,e,n,i){return{dimensions:Rs([{name:"lng"},{name:"lat"}],t,i)};}};qs.prototype.parse=function(t){return t;},qs.prototype.getSetting=function(t){return this._setting[t];},qs.prototype.contain=function(t){var e=this._extent;return t>=e[0]&&t<=e[1];},qs.prototype.normalize=function(t){var e=this._extent;return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0]);},qs.prototype.scale=function(t){var e=this._extent;return t*(e[1]-e[0])+e[0];},qs.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]);},qs.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getDataExtent(e,!0));},qs.prototype.getExtent=function(){return this._extent.slice();},qs.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=t),isNaN(e)||(n[1]=e);},qs.prototype.getTicksLabels=function(){for(var t=[],e=this.getTicks(),n=0;n<e.length;n++){t.push(this.getLabel(e[n]));}return t;},qs.prototype.isBlank=function(){return this._isBlank;},qs.prototype.setBlank=function(t){this._isBlank=t;},or(qs),lr(qs,{registerWhenExtend:!0});var zv=qs.prototype,Bv=qs.extend({type:"ordinal",init:function init(t,e){this._data=t,this._extent=e||[0,t.length-1];},parse:function parse(t){return"string"==typeof t?h(this._data,t):Math.round(t);},contain:function contain(t){return t=this.parse(t),zv.contain.call(this,t)&&null!=this._data[t];},normalize:function normalize(t){return zv.normalize.call(this,this.parse(t));},scale:function scale(t){return Math.round(zv.scale.call(this,t));},getTicks:function getTicks(){for(var t=[],e=this._extent,n=e[0];n<=e[1];){t.push(n),n++;}return t;},getLabel:function getLabel(t){return this._data[t];},count:function count(){return this._extent[1]-this._extent[0]+1;},unionExtentFromData:function unionExtentFromData(t,e){this.unionExtent(t.getDataExtent(e,!1));},niceTicks:R,niceExtent:R});Bv.create=function(){return new Bv();};var Ev=Li,Rv=Li,Nv=qs.extend({type:"interval",_interval:0,_intervalPrecision:2,setExtent:function setExtent(t,e){var n=this._extent;isNaN(t)||(n[0]=parseFloat(t)),isNaN(e)||(n[1]=parseFloat(e));},unionExtent:function unionExtent(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),Nv.prototype.setExtent.call(this,e[0],e[1]);},getInterval:function getInterval(){return this._interval;},setInterval:function setInterval(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=Zs(t);},getTicks:function getTicks(){return $s(this._interval,this._extent,this._niceExtent,this._intervalPrecision);},getTicksLabels:function getTicksLabels(){for(var t=[],e=this.getTicks(),n=0;n<e.length;n++){t.push(this.getLabel(e[n]));}return t;},getLabel:function getLabel(t,e){if(null==t)return"";var n=e&&e.precision;return null==n?n=Bi(t)||0:"auto"===n&&(n=this._intervalPrecision),t=Rv(t,n,!0),Yi(t);},niceTicks:function niceTicks(t,e,n){t=t||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){0>r&&(r=-r,i.reverse());var o=Ys(i,t,e,n);this._intervalPrecision=o.intervalPrecision,this._interval=o.interval,this._niceExtent=o.niceTickExtent;}},niceExtent:function niceExtent(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var n=e[0];t.fixMax?e[0]-=n/2:(e[1]+=n/2,e[0]-=n/2);}else e[1]=1;var i=e[1]-e[0];isFinite(i)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var r=this._interval;t.fixMin||(e[0]=Rv(Math.floor(e[0]/r)*r)),t.fixMax||(e[1]=Rv(Math.ceil(e[1]/r)*r));}});Nv.create=function(){return new Nv();};var Fv=Nv.prototype,Gv=Math.ceil,Hv=Math.floor,Wv=1e3,Vv=60*Wv,Xv=60*Vv,qv=24*Xv,Yv=function Yv(t,e,n,i){for(;i>n;){var r=n+i>>>1;t[r][1]<e?n=r+1:i=r;}return n;},Zv=Nv.extend({type:"time",getLabel:function getLabel(t){var e=this._stepLvl,n=new Date(t);return Qi(e[0],n,this.getSetting("useUTC"));},niceExtent:function niceExtent(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=qv,e[1]+=qv),e[1]===-1/0&&1/0===e[0]){var n=new Date();e[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),e[0]=e[1]-qv;}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var i=this._interval;t.fixMin||(e[0]=Li(Hv(e[0]/i)*i)),t.fixMax||(e[1]=Li(Gv(e[1]/i)*i));},niceTicks:function niceTicks(t,e,n){t=t||10;var i=this._extent,r=i[1]-i[0],o=r/t;null!=e&&e>o&&(o=e),null!=n&&o>n&&(o=n);var a=jv.length,s=Yv(jv,o,0,a),l=jv[Math.min(s,a-1)],h=l[1];if("year"===l[0]){var u=r/h,c=Vi(u/t,!0);h*=c;}var d=this.getSetting("useUTC")?0:60*new Date(+i[0]||+i[1]).getTimezoneOffset()*1e3,f=[Math.round(Gv((i[0]-d)/h)*h+d),Math.round(Hv((i[1]-d)/h)*h+d)];Us(f,i),this._stepLvl=l,this._interval=h,this._niceExtent=f;},parse:function parse(t){return+Gi(t);}});f(["contain","normalize"],function(t){Zv.prototype[t]=function(e){return Fv[t].call(this,this.parse(e));};});var jv=[["hh:mm:ss",Wv],["hh:mm:ss",5*Wv],["hh:mm:ss",10*Wv],["hh:mm:ss",15*Wv],["hh:mm:ss",30*Wv],["hh:mm\nMM-dd",Vv],["hh:mm\nMM-dd",5*Vv],["hh:mm\nMM-dd",10*Vv],["hh:mm\nMM-dd",15*Vv],["hh:mm\nMM-dd",30*Vv],["hh:mm\nMM-dd",Xv],["hh:mm\nMM-dd",2*Xv],["hh:mm\nMM-dd",6*Xv],["hh:mm\nMM-dd",12*Xv],["MM-dd\nyyyy",qv],["MM-dd\nyyyy",2*qv],["MM-dd\nyyyy",3*qv],["MM-dd\nyyyy",4*qv],["MM-dd\nyyyy",5*qv],["MM-dd\nyyyy",6*qv],["week",7*qv],["MM-dd\nyyyy",10*qv],["week",14*qv],["week",21*qv],["month",31*qv],["week",42*qv],["month",62*qv],["week",42*qv],["quarter",380*qv/4],["month",31*qv*4],["month",31*qv*5],["half-year",380*qv/2],["month",31*qv*8],["month",31*qv*10],["year",380*qv]];Zv.create=function(t){return new Zv({useUTC:t.ecModel.get("useUTC")});};var Uv=qs.prototype,$v=Nv.prototype,Kv=Bi,Qv=Li,Jv=Math.floor,tm=Math.ceil,em=Math.pow,nm=Math.log,im=qs.extend({type:"log",base:10,$constructor:function $constructor(){qs.apply(this,arguments),this._originalScale=new Nv();},getTicks:function getTicks(){var t=this._originalScale,e=this._extent,n=t.getExtent();return g($v.getTicks.call(this),function(i){var r=Li(em(this.base,i));return r=i===e[0]&&t.__fixMin?Ks(r,n[0]):r,r=i===e[1]&&t.__fixMax?Ks(r,n[1]):r;},this);},getLabel:$v.getLabel,scale:function scale(t){return t=Uv.scale.call(this,t),em(this.base,t);},setExtent:function setExtent(t,e){var n=this.base;t=nm(t)/nm(n),e=nm(e)/nm(n),$v.setExtent.call(this,t,e);},getExtent:function getExtent(){var t=this.base,e=Uv.getExtent.call(this);e[0]=em(t,e[0]),e[1]=em(t,e[1]);var n=this._originalScale,i=n.getExtent();return n.__fixMin&&(e[0]=Ks(e[0],i[0])),n.__fixMax&&(e[1]=Ks(e[1],i[1])),e;},unionExtent:function unionExtent(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=nm(t[0])/nm(e),t[1]=nm(t[1])/nm(e),Uv.unionExtent.call(this,t);},unionExtentFromData:function unionExtentFromData(t,e){this.unionExtent(t.getDataExtent(e,!0,function(t){return t>0;}));},niceTicks:function niceTicks(t){t=t||10;var e=this._extent,n=e[1]-e[0];if(!(1/0===n||0>=n)){var i=Hi(n),r=t/n*i;for(.5>=r&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&Math.abs(i)>0;){i*=10;}var o=[Li(tm(e[0]/i)*i),Li(Jv(e[1]/i)*i)];this._interval=i,this._niceExtent=o;}},niceExtent:function niceExtent(t){$v.niceExtent.call(this,t);var e=this._originalScale;e.__fixMin=t.fixMin,e.__fixMax=t.fixMax;}});f(["contain","normalize"],function(t){im.prototype[t]=function(e){return e=nm(e)/nm(this.base),Uv[t].call(this,e);};}),im.create=function(){return new im();};var rm={getFormattedLabels:function getFormattedLabels(){return il(this.axis,this.get("axisLabel.formatter"));},getCategories:function getCategories(){return"category"===this.get("type")&&g(this.get("data"),ol);},getMin:function getMin(t){var e=this.option,n=t||null==e.rangeStart?e.min:e.rangeStart;return this.axis&&null!=n&&"dataMin"!==n&&"function"!=typeof n&&!I(n)&&(n=this.axis.scale.parse(n)),n;},getMax:function getMax(t){var e=this.option,n=t||null==e.rangeEnd?e.max:e.rangeEnd;return this.axis&&null!=n&&"dataMax"!==n&&"function"!=typeof n&&!I(n)&&(n=this.axis.scale.parse(n)),n;},getNeedCrossZero:function getNeedCrossZero(){var t=this.option;return null!=t.rangeStart||null!=t.rangeEnd?!1:!t.scale;},getCoordSysModel:R,setRange:function setRange(t,e){this.option.rangeStart=t,this.option.rangeEnd=e;},resetRange:function resetRange(){this.option.rangeStart=this.option.rangeEnd=null;}},om=Qr({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,o=e.height/2;t.moveTo(n,i-o),t.lineTo(n+r,i+o),t.lineTo(n-r,i+o),t.closePath();}}),am=Qr({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,o=e.height/2;t.moveTo(n,i-o),t.lineTo(n+r,i),t.lineTo(n,i+o),t.lineTo(n-r,i),t.closePath();}}),sm=Qr({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.x,i=e.y,r=e.width/5*3,o=Math.max(r,e.height),a=r/2,s=a*a/(o-a),l=i-o+a+s,h=Math.asin(s/a),u=Math.cos(h)*a,c=Math.sin(h),d=Math.cos(h),f=.6*a,g=.7*a;t.moveTo(n-u,l+s),t.arc(n,l,a,Math.PI-h,2*Math.PI+h),t.bezierCurveTo(n+u-c*f,l+s+d*f,n,i-g,n,i),t.bezierCurveTo(n,i-g,n-u+c*f,l+s+d*f,n-u,l+s),t.closePath();}}),lm=Qr({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.height,i=e.width,r=e.x,o=e.y,a=i/3*2;t.moveTo(r,o),t.lineTo(r+a,o+n),t.lineTo(r,o+n/4*3),t.lineTo(r-a,o+n),t.lineTo(r,o),t.closePath();}}),hm={line:Mg,rect:Sg,roundRect:Sg,square:Sg,circle:gg,diamond:am,pin:sm,arrow:lm,triangle:om},um={line:function line(t,e,n,i,r){r.x1=t,r.y1=e+i/2,r.x2=t+n,r.y2=e+i/2;},rect:function rect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i;},roundRect:function roundRect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i,r.r=Math.min(n,i)/4;},square:function square(t,e,n,i,r){var o=Math.min(n,i);r.x=t,r.y=e,r.width=o,r.height=o;},circle:function circle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.r=Math.min(n,i)/2;},diamond:function diamond(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;},pin:function pin(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},arrow:function arrow(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},triangle:function triangle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;}},cm={};f(hm,function(t,e){cm[e]=new t();});var dm=Qr({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},beforeBrush:function beforeBrush(){var t=this.style,e=this.shape;"pin"===e.symbolType&&"inside"===t.textPosition&&(t.textPosition=["50%","40%"],t.textAlign="center",t.textVerticalAlign="middle");},buildPath:function buildPath(t,e,n){var i=e.symbolType,r=cm[i];"none"!==e.symbolType&&(r||(i="rect",r=cm[i]),um[i](e.x,e.y,e.width,e.height,r.shape),r.buildPath(t,r.shape,n));}}),fm=(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_freeze___default.a||Object)({createList:ll,createScale:hl,mixinAxisModelCommonMethods:ul,completeDimensions:Rs,createSymbol:sl}),gm=ki,pm=[0,1],vm=function vm(t,e,n){this.dim=t,this.scale=e,this._extent=n||[0,0],this.inverse=!1,this.onBand=!1,this._labelInterval;};vm.prototype={constructor:vm,contain:function contain(t){var e=this._extent,n=Math.min(e[0],e[1]),i=Math.max(e[0],e[1]);return t>=n&&i>=t;},containData:function containData(t){return this.contain(this.dataToCoord(t));},getExtent:function getExtent(){return this._extent.slice();},getPixelPrecision:function getPixelPrecision(t){return Ei(t||this.scale.getExtent(),this._extent);},setExtent:function setExtent(t,e){var n=this._extent;n[0]=t,n[1]=e;},dataToCoord:function dataToCoord(t,e){var n=this._extent,i=this.scale;return t=i.normalize(t),this.onBand&&"ordinal"===i.type&&(n=n.slice(),cl(n,i.count())),gm(t,pm,n,e);},coordToData:function coordToData(t,e){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&(n=n.slice(),cl(n,i.count()));var r=gm(t,n,pm,e);return this.scale.scale(r);},pointToData:function pointToData(){},getTicksCoords:function getTicksCoords(t){if(this.onBand&&!t){for(var e=this.getBands(),n=[],i=0;i<e.length;i++){n.push(e[i][0]);}return e[i-1]&&n.push(e[i-1][1]),n;}return g(this.scale.getTicks(),this.dataToCoord,this);},getLabelsCoords:function getLabelsCoords(){return g(this.scale.getTicks(),this.dataToCoord,this);},getBands:function getBands(){for(var t=this.getExtent(),e=[],n=this.scale.count(),i=t[0],r=t[1],o=r-i,a=0;n>a;a++){e.push([o*a/n+i,o*(a+1)/n+i]);}return e;},getBandWidth:function getBandWidth(){var t=this._extent,e=this.scale.getExtent(),n=e[1]-e[0]+(this.onBand?1:0);0===n&&(n=1);var i=Math.abs(t[1]-t[0]);return Math.abs(i)/n;},isHorizontal:null,getRotate:null,getLabelInterval:function getLabelInterval(){var t=this._labelInterval;if(!t){var e=this.model,n=e.getModel("axisLabel");t=n.get("interval"),"category"!==this.type||null!=t&&"auto"!==t||(t=nl(g(this.scale.getTicks(),this.dataToCoord,this),e.getFormattedLabels(),n.getFont(),this.getRotate?this.getRotate():this.isHorizontal&&!this.isHorizontal()?90:0,n.get("rotate"))),this._labelInterval=t;}return t;}};var mm=1e-8;gl.prototype={constructor:gl,properties:null,getBoundingRect:function getBoundingRect(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,n=[e,e],i=[-e,-e],r=[],o=[],a=this.geometries,s=0;s<a.length;s++){if("polygon"===a[s].type){var l=a[s].exterior;Sr(l,r,o),ie(n,n,r),re(i,i,o);}}return 0===s&&(n[0]=n[1]=i[0]=i[1]=0),this._rect=new Je(n[0],n[1],i[0]-n[0],i[1]-n[1]);},contain:function contain(t){var e=this.getBoundingRect(),n=this.geometries;if(!e.contain(t[0],t[1]))return!1;t:for(var i=0,r=n.length;r>i;i++){if("polygon"===n[i].type){var o=n[i].exterior,a=n[i].interiors;if(fl(o,t[0],t[1])){for(var s=0;s<(a?a.length:0);s++){if(fl(a[s]))continue t;}return!0;}}}return!1;},transformTo:function transformTo(t,e,n,i){var r=this.getBoundingRect(),o=r.width/r.height;n?i||(i=n/o):n=o*i;for(var a=new Je(t,e,n,i),s=r.calculateTransform(a),l=this.geometries,h=0;h<l.length;h++){if("polygon"===l[h].type){for(var u=l[h].exterior,c=l[h].interiors,d=0;d<u.length;d++){ne(u[d],u[d],s);}for(var f=0;f<(c?c.length:0);f++){for(var d=0;d<c[f].length;d++){ne(c[f][d],c[f][d],s);}}}}r=this._rect,r.copy(a),this.center=[r.x+r.width/2,r.y+r.height/2];}};var ym=function ym(t){return pl(t),g(v(t.features,function(t){return t.geometry&&t.properties&&t.geometry.coordinates.length>0;}),function(t){var e=t.properties,n=t.geometry,i=n.coordinates,r=[];"Polygon"===n.type&&r.push({type:"polygon",exterior:i[0],interiors:i.slice(1)}),"MultiPolygon"===n.type&&f(i,function(t){t[0]&&r.push({type:"polygon",exterior:t[0],interiors:t.slice(1)});});var o=new gl(e.name,r,e.cp);return o.properties=e,o;});},xm={};f(["map","each","filter","indexOf","inherits","reduce","filter","bind","curry","isArray","isString","isObject","isFunction","extend","defaults","clone","merge"],function(t){xm[t]=cc[t];});var _m="__ec_stack_";bl.getLayoutOnAxis=xl;var wm=function wm(t){this._axes={},this._dimList=[],this.name=t||"";};wm.prototype={constructor:wm,type:"cartesian",getAxis:function getAxis(t){return this._axes[t];},getAxes:function getAxes(){return g(this._dimList,Sl,this);},getAxesByScale:function getAxesByScale(t){return t=t.toLowerCase(),v(this.getAxes(),function(e){return e.scale.type===t;});},addAxis:function addAxis(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e);},dataToCoord:function dataToCoord(t){return this._dataCoordConvert(t,"dataToCoord");},coordToData:function coordToData(t){return this._dataCoordConvert(t,"coordToData");},_dataCoordConvert:function _dataCoordConvert(t,e){for(var n=this._dimList,i=t instanceof Array?[]:{},r=0;r<n.length;r++){var o=n[r],a=this._axes[o];i[o]=a[e](t[o]);}return i;}},Ml.prototype={constructor:Ml,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function getBaseAxis(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x");},containPoint:function containPoint(t){var e=this.getAxis("x"),n=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&n.contain(n.toLocalCoord(t[1]));},containData:function containData(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1]);},dataToPoint:function dataToPoint(t,e){var n=this.getAxis("x"),i=this.getAxis("y");return[n.toGlobalCoord(n.dataToCoord(t[0],e)),i.toGlobalCoord(i.dataToCoord(t[1],e))];},pointToData:function pointToData(t,e){var n=this.getAxis("x"),i=this.getAxis("y");return[n.coordToData(n.toLocalCoord(t[0]),e),i.coordToData(i.toLocalCoord(t[1]),e)];},getOtherAxis:function getOtherAxis(t){return this.getAxis("x"===t.dim?"y":"x");}},u(Ml,wm);var bm=function bm(t,e,n,i,r){vm.call(this,t,e,n),this.type=i||"value",this.position=r||"bottom";};bm.prototype={constructor:bm,index:0,onZero:!1,model:null,isHorizontal:function isHorizontal(){var t=this.position;return"top"===t||"bottom"===t;},getGlobalExtent:function getGlobalExtent(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e;},getOtherAxis:function getOtherAxis(){this.grid.getOtherAxis();},isLabelIgnored:function isLabelIgnored(t){if("category"===this.type){var e=this.getLabelInterval();return"function"==typeof e&&!e(t,this.scale.getLabel(t))||t%(e+1);}},pointToData:function pointToData(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e);},toLocalCoord:null,toGlobalCoord:null},u(bm,vm);var Sm={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},Mm={};Mm.categoryAxis=r({boundaryGap:!0,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},Sm),Mm.valueAxis=r({boundaryGap:[0,0],splitNumber:5},Sm),Mm.timeAxis=s({scale:!0,min:"dataMin",max:"dataMax"},Mm.valueAxis),Mm.logAxis=s({scale:!0,logBase:10},Mm.valueAxis);var Tm=["value","category","time","log"],Im=function Im(t,e,n,i){f(Tm,function(a){e.extend({type:t+"Axis."+a,mergeDefaultAndTheme:function mergeDefaultAndTheme(e,i){var o=this.layoutMode,s=o?ua(e):{},l=i.getTheme();r(e,l.get(a+"Axis")),r(e,this.getDefaultOption()),e.type=n(t,e),o&&ha(e,s,o);},defaultOption:o([{},Mm[a+"Axis"],i],!0)});}),np.registerSubTypeDefaulter(t+"Axis",x(n,t));},Cm=np.extend({type:"cartesian2dAxis",axis:null,init:function init(){Cm.superApply(this,"init",arguments),this.resetRange();},mergeOption:function mergeOption(){Cm.superApply(this,"mergeOption",arguments),this.resetRange();},restoreData:function restoreData(){Cm.superApply(this,"restoreData",arguments),this.resetRange();},getCoordSysModel:function getCoordSysModel(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0];}});r(Cm.prototype,rm);var Am={offset:0};Im("x",Cm,Tl,Am),Im("y",Cm,Tl,Am),np.extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});var Dm=f,km=el,Pm=Js,Lm=Dl.prototype;Lm.type="grid",Lm.axisPointerEnabled=!0,Lm.getRect=function(){return this._rect;},Lm.update=function(t,e){var n=this._axesMap;this._updateScale(t,this.model),Dm(n.x,function(t){Pm(t.scale,t.model);}),Dm(n.y,function(t){Pm(t.scale,t.model);}),Dm(n.x,function(t){kl(n,"y",t);}),Dm(n.y,function(t){kl(n,"x",t);}),this.resize(this.model,e);},Lm.resize=function(t,e,n){function i(){Dm(o,function(t){var e=t.isHorizontal(),n=e?[0,r.width]:[0,r.height],i=t.inverse?1:0;t.setExtent(n[i],n[1-i]),Ll(t,e?r.x:r.y);});}var r=la(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});this._rect=r;var o=this._axesList;i(),!n&&t.get("containLabel")&&(Dm(o,function(t){if(!t.model.get("axisLabel.inside")){var e=Al(t);if(e){var n=t.isHorizontal()?"height":"width",i=t.model.get("axisLabel.margin");r[n]-=e[n]+i,"top"===t.position?r.y+=e.height+i:"left"===t.position&&(r.x+=e.width+i);}}}),i());},Lm.getAxis=function(t,e){var n=this._axesMap[t];if(null!=n){if(null==e)for(var i in n){if(n.hasOwnProperty(i))return n[i];}return n[e];}},Lm.getAxes=function(){return this._axesList.slice();},Lm.getCartesian=function(t,e){if(null!=t&&null!=e){var n="x"+t+"y"+e;return this._coordsMap[n];}S(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++){if(r[i].getAxis("x").index===t||r[i].getAxis("y").index===e)return r[i];}},Lm.getCartesians=function(){return this._coordsList.slice();},Lm.convertToPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.dataToPoint(n):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(n)):null;},Lm.convertFromPixel=function(t,e,n){var i=this._findConvertTarget(t,e);return i.cartesian?i.cartesian.pointToData(n):i.axis?i.axis.coordToData(i.axis.toLocalCoord(n)):null;},Lm._findConvertTarget=function(t,e){var n,i,r=e.seriesModel,o=e.xAxisModel||r&&r.getReferringComponents("xAxis")[0],a=e.yAxisModel||r&&r.getReferringComponents("yAxis")[0],s=e.gridModel,l=this._coordsList;if(r)n=r.coordinateSystem,h(l,n)<0&&(n=null);else if(o&&a)n=this.getCartesian(o.componentIndex,a.componentIndex);else if(o)i=this.getAxis("x",o.componentIndex);else if(a)i=this.getAxis("y",a.componentIndex);else if(s){var u=s.coordinateSystem;u===this&&(n=this._coordsList[0]);}return{cartesian:n,axis:i};},Lm.containPoint=function(t){var e=this._coordsList[0];return e?e.containPoint(t):void 0;},Lm._initCartesian=function(t,e){function n(n){return function(a,s){if(Il(a,t,e)){var l=a.get("position");"x"===n?"top"!==l&&"bottom"!==l&&(l="bottom",i[l]&&(l="top"===l?"bottom":"top")):"left"!==l&&"right"!==l&&(l="left",i[l]&&(l="left"===l?"right":"left")),i[l]=!0;var h=new bm(n,tl(a),[0,0],a.get("type"),l),u="category"===h.type;h.onBand=u&&a.get("boundaryGap"),h.inverse=a.get("inverse"),h.onZero=a.get("axisLine.onZero"),h.onZeroAxisIndex=a.get("axisLine.onZeroAxisIndex"),a.axis=h,h.model=a,h.grid=this,h.index=s,this._axesList.push(h),r[n][s]=h,o[n]++;}};}var i={left:!1,right:!1,top:!1,bottom:!1},r={x:{},y:{}},o={x:0,y:0};return e.eachComponent("xAxis",n("x"),this),e.eachComponent("yAxis",n("y"),this),o.x&&o.y?(this._axesMap=r,void Dm(r.x,function(e,n){Dm(r.y,function(i,r){var o="x"+n+"y"+r,a=new Ml(o);a.grid=this,a.model=t,this._coordsMap[o]=a,this._coordsList.push(a),a.addAxis(e),a.addAxis(i);},this);},this)):(this._axesMap={},void(this._axesList=[]));},Lm._updateScale=function(t,e){function n(t,e,n){Dm(n.coordDimToDataDim(e.dim),function(n){e.scale.unionExtentFromData(t,n);});}f(this._axesList,function(t){t.scale.setExtent(1/0,-1/0);}),t.eachSeries(function(i){if(zl(i)){var r=Ol(i,t),o=r[0],a=r[1];if(!Il(o,e,t)||!Il(a,e,t))return;var s=this.getCartesian(o.componentIndex,a.componentIndex),l=i.getData(),h=s.getAxis("x"),u=s.getAxis("y");"list"===l.type&&(n(l,h,i),n(l,u,i));}},this);},Lm.getTooltipAxes=function(t){var e=[],n=[];return Dm(this.getCartesians(),function(i){var r=null!=t&&"auto"!==t?i.getAxis(t):i.getBaseAxis(),o=i.getOtherAxis(r);h(e,r)<0&&e.push(r),h(n,o)<0&&n.push(o);}),{baseAxes:e,otherAxes:n};};var Om=["xAxis","yAxis"];Dl.create=function(t,e){var n=[];return t.eachComponent("grid",function(i,r){var o=new Dl(i,t,e);o.name="grid_"+r,o.resize(i,e,!0),i.coordinateSystem=o,n.push(o);}),t.eachSeries(function(e){if(zl(e)){var n=Ol(e,t),i=n[0],r=n[1],o=i.getCoordSysModel(),a=o.coordinateSystem;e.coordinateSystem=a.getCartesian(i.componentIndex,r.componentIndex);}}),n;},Dl.dimensions=Dl.prototype.dimensions=Ml.prototype.dimensions,_a.register("cartesian2d",Dl);var zm=Dp.extend({type:"series.__base_bar__",getInitialData:function getInitialData(t,e){return Hs(t.data,this,e);},getMarkerPosition:function getMarkerPosition(t){var e=this.coordinateSystem;if(e){var n=e.dataToPoint(t,!0),i=this.getData(),r=i.getLayout("offset"),o=i.getLayout("size"),a=e.getBaseAxis().isHorizontal()?0:1;return n[a]+=r+o/2,n;}return[0/0,0/0];},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,barMinAngle:0,itemStyle:{}}});zm.extend({type:"series.bar",dependencies:["grid","polar"],brushSelector:"rect"});var Bm=sf([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["stroke","barBorderColor"],["lineWidth","barBorderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),Em={getBarItemStyle:function getBarItemStyle(t){var e=Bm(this,t);if(this.getBorderLineDash){var n=this.getBorderLineDash();n&&(e.lineDash=n);}return e;}},Rm=["itemStyle","normal","barBorderWidth"];a(Ho.prototype,Em),Is({type:"bar",render:function render(t,e,n){var i=t.get("coordinateSystem");return("cartesian2d"===i||"polar"===i)&&this._render(t,e,n),this.group;},dispose:R,_render:function _render(t){var e,n=this.group,i=t.getData(),r=this._data,o=t.coordinateSystem,a=o.getBaseAxis();"cartesian2d"===o.type?e=a.isHorizontal():"polar"===o.type&&(e="angle"===a.dim);var s=t.isAnimationEnabled()?t:null;i.diff(r).add(function(r){if(i.hasValue(r)){var a=i.getItemModel(r),l=Fm[o.type](i,r,a),h=Nm[o.type](i,r,a,l,e,s);i.setItemGraphicEl(r,h),n.add(h),Fl(h,i,r,a,l,t,e,"polar"===o.type);}}).update(function(a,l){var h=r.getItemGraphicEl(l);if(!i.hasValue(a))return void n.remove(h);var u=i.getItemModel(a),c=Fm[o.type](i,a,u);h?Lo(h,{shape:c},s,a):h=Nm[o.type](i,a,u,c,e,s,!0),i.setItemGraphicEl(a,h),n.add(h),Fl(h,i,a,u,c,t,e,"polar"===o.type);}).remove(function(t){var e=r.getItemGraphicEl(t);"cartesian2d"===o.type?e&&Rl(t,s,e):e&&Nl(t,s,e);}).execute(),this._data=i;},remove:function remove(t){var e=this.group,n=this._data;t.get("animation")?n&&n.eachItemGraphicEl(function(e){"sector"===e.type?Nl(e.dataIndex,t,e):Rl(e.dataIndex,t,e);}):e.removeAll();}});var Nm={cartesian2d:function cartesian2d(t,e,n,i,r,o,s){var l=new Sg({shape:a({},i)});if(o){var h=l.shape,u=r?"height":"width",c={};h[u]=0,c[u]=i[u],Rg[s?"updateProps":"initProps"](l,{shape:c},o,e);}return l;},polar:function polar(t,e,n,i,r,o,s){var l=new mg({shape:a({},i)});if(o){var h=l.shape,u=r?"r":"endAngle",c={};h[u]=r?0:i.startAngle,c[u]=i[u],Rg[s?"updateProps":"initProps"](l,{shape:c},o,e);}return l;}},Fm={cartesian2d:function cartesian2d(t,e,n){var i=t.getItemLayout(e),r=Gl(n,i),o=i.width>0?1:-1,a=i.height>0?1:-1;return{x:i.x+o*r/2,y:i.y+a*r/2,width:i.width-o*r,height:i.height-a*r};},polar:function polar(t,e){var n=t.getItemLayout(e);return{cx:n.cx,cy:n.cy,r0:n.r0,r:n.r,startAngle:n.startAngle,endAngle:n.endAngle};}},Gm=Math.PI,Hm=function Hm(t,e){this.opt=e,this.axisModel=t,s(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0}),this.group=new td();var n=new td({position:e.position.slice(),rotation:e.rotation});n.updateTransform(),this._transform=n.transform,this._dumbGroup=n;};Hm.prototype={constructor:Hm,hasBuilder:function hasBuilder(t){return!!Wm[t];},add:function add(t){Wm[t].call(this);},getGroup:function getGroup(){return this.group;}};var Wm={axisLine:function axisLine(){var t=this.opt,e=this.axisModel;if(e.get("axisLine.show")){var n=this.axisModel.axis.getExtent(),i=this._transform,r=[n[0],0],o=[n[1],0];i&&(ne(r,r,i),ne(o,o,i));var s=a({lineCap:"round"},e.getModel("axisLine.lineStyle").getLineStyle());this.group.add(new Mg(ro({anid:"line",shape:{x1:r[0],y1:r[1],x2:o[0],y2:o[1]},style:s,strokeContainThreshold:t.strokeContainThreshold||5,silent:!0,z2:1})));var l=e.get("axisLine.symbol"),h=e.get("axisLine.symbolSize");if(null!=l){"string"==typeof l&&(l=[l,l]),("string"==typeof h||"number"==typeof h)&&(h=[h,h]);var u=h[0],c=h[1];f([[t.rotation+Math.PI/2,r],[t.rotation-Math.PI/2,o]],function(t,e){if("none"!==l[e]&&null!=l[e]){var n=sl(l[e],-u/2,-c/2,u,c,s.stroke,!0);n.attr({rotation:t[0],position:t[1],silent:!0}),this.group.add(n);}},this);}}},axisTickLabel:function axisTickLabel(){var t=this.axisModel,e=this.opt,n=jl(this,t,e),i=Ul(this,t,e);Xl(t,i,n);},axisName:function axisName(){var t=this.opt,e=this.axisModel,n=C(t.axisName,e.get("name"));if(n){var i,r=e.get("nameLocation"),o=t.nameDirection,s=e.getModel("nameTextStyle"),l=e.get("nameGap")||0,h=this.axisModel.axis.getExtent(),u=h[0]>h[1]?-1:1,c=["start"===r?h[0]-u*l:"end"===r?h[1]+u*l:(h[0]+h[1])/2,Zl(r)?t.labelOffset+o*l:0],d=e.get("nameRotate");null!=d&&(d=d*Gm/180);var f;Zl(r)?i=Vm(t.rotation,null!=d?d:t.rotation,o):(i=Wl(t,r,d||0,h),f=t.axisNameAvailableWidth,null!=f&&(f=Math.abs(f/Math.sin(i.rotation)),!isFinite(f)&&(f=null)));var g=s.getFont(),p=e.get("nameTruncate",!0)||{},v=p.ellipsis,m=C(t.nameTruncateMaxWidth,p.maxWidth,f),y=null!=v&&null!=m?tf(n,m,g,v,{minChar:2,placeholder:p.placeholder}):n,x=e.get("tooltip",!0),_=e.mainType,w={componentType:_,name:n,$vars:["name"]};w[_+"Index"]=e.componentIndex;var b=new fg({anid:"name",__fullText:n,__truncatedText:y,position:c,rotation:i.rotation,silent:Vl(e),z2:1,tooltip:x&&x.show?a({content:n,formatter:function formatter(){return n;},formatterParams:w},x):null});bo(b.style,s,{text:y,textFont:g,textFill:s.getTextColor()||e.get("axisLine.lineStyle.color"),textAlign:i.textAlign,textVerticalAlign:i.textVerticalAlign}),e.get("triggerEvent")&&(b.eventData=Hl(e),b.eventData.targetType="axisName",b.eventData.name=n),this._dumbGroup.add(b),b.updateTransform(),this.group.add(b),b.decomposeTransform();}}},Vm=Hm.innerTextLayout=function(t,e,n){var i,r,o=Ni(e-t);return Fi(o)?(r=n>0?"top":"bottom",i="center"):Fi(o-Gm)?(r=n>0?"bottom":"top",i="center"):(r="middle",i=o>0&&Gm>o?n>0?"right":"left":n>0?"left":"right"),{rotation:o,textAlign:i,textVerticalAlign:r};},Xm=Hm.ifIgnoreOnTick=function(t,e,n,i,r,o){if(0===e&&r||e===i-1&&o)return!1;var a,s=t.scale;return"ordinal"===s.type&&("function"==typeof n?(a=s.getTicks()[e],!n(a,s.getLabel(a))):e%(n+1));},qm=Hm.getInterval=function(t,e){var n=t.get("interval");return(null==n||"auto"==n)&&(n=e),n;},Ym=f,Zm=x,jm=Ms({type:"axis",_axisPointer:null,axisPointerClass:null,render:function render(t,e,n,i){this.axisPointerClass&&nh(t),jm.superApply(this,"render",arguments),sh(this,t,e,n,i,!0);},updateAxisPointer:function updateAxisPointer(t,e,n,i){sh(this,t,e,n,i,!1);},remove:function remove(t,e){var n=this._axisPointer;n&&n.remove(e),jm.superApply(this,"remove",arguments);},dispose:function dispose(t,e){lh(this,e),jm.superApply(this,"dispose",arguments);}}),Um=[];jm.registerAxisPointerClass=function(t,e){Um[t]=e;},jm.getAxisPointerClass=function(t){return t&&Um[t];};var $m=Hm.ifIgnoreOnTick,Km=Hm.getInterval,Qm=["axisLine","axisTickLabel","axisName"],Jm=["splitArea","splitLine"],ty=jm.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function render(t,e,n,i){this.group.removeAll();var r=this._axisGroup;if(this._axisGroup=new td(),this.group.add(this._axisGroup),t.get("show")){var o=t.getCoordSysModel(),a=hh(o,t),s=new Hm(t,a);f(Qm,s.add,s),this._axisGroup.add(s.getGroup()),f(Jm,function(e){t.get(e+".show")&&this["_"+e](t,o,a.labelInterval);},this),Ro(r,this._axisGroup,t),ty.superCall(this,"render",t,e,n,i);}},_splitLine:function _splitLine(t,e,n){var i=t.axis;if(!i.scale.isBlank()){var r=t.getModel("splitLine"),o=r.getModel("lineStyle"),a=o.get("color"),l=Km(r,n);a=_(a)?a:[a];for(var h=e.coordinateSystem.getRect(),u=i.isHorizontal(),c=0,d=i.getTicksCoords(),f=i.scale.getTicks(),g=t.get("axisLabel.showMinLabel"),p=t.get("axisLabel.showMaxLabel"),v=[],m=[],y=o.getLineStyle(),x=0;x<d.length;x++){if(!$m(i,x,l,d.length,g,p)){var w=i.toGlobalCoord(d[x]);u?(v[0]=w,v[1]=h.y,m[0]=w,m[1]=h.y+h.height):(v[0]=h.x,v[1]=w,m[0]=h.x+h.width,m[1]=w);var b=c++%a.length;this._axisGroup.add(new Mg(ro({anid:"line_"+f[x],shape:{x1:v[0],y1:v[1],x2:m[0],y2:m[1]},style:s({stroke:a[b]},y),silent:!0})));}}}},_splitArea:function _splitArea(t,e,n){var i=t.axis;if(!i.scale.isBlank()){var r=t.getModel("splitArea"),o=r.getModel("areaStyle"),a=o.get("color"),l=e.coordinateSystem.getRect(),h=i.getTicksCoords(),u=i.scale.getTicks(),c=i.toGlobalCoord(h[0]),d=i.toGlobalCoord(h[0]),f=0,g=Km(r,n),p=o.getAreaStyle();a=_(a)?a:[a];for(var v=t.get("axisLabel.showMinLabel"),m=t.get("axisLabel.showMaxLabel"),y=1;y<h.length;y++){if(!$m(i,y,g,h.length,v,m)){var x,w,b,S,M=i.toGlobalCoord(h[y]);i.isHorizontal()?(x=c,w=l.y,b=M-x,S=l.height):(x=l.x,w=d,b=l.width,S=M-w);var T=f++%a.length;this._axisGroup.add(new Sg({anid:"area_"+u[y],shape:{x:x,y:w,width:b,height:S},style:s({fill:a[T]},p),silent:!0})),c=x+b,d=w+S;}}}}});ty.extend({type:"xAxis"}),ty.extend({type:"yAxis"}),Ms({type:"grid",render:function render(t){this.group.removeAll(),t.get("show")&&this.group.add(new Sg({shape:t.coordinateSystem.getRect(),style:s({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}));}}),gs(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={});}),_s(x(bl,"bar")),ws(function(t){t.eachSeriesByType("bar",function(t){var e=t.getData();e.setVisual("legendSymbol","roundRect");});}),Dp.extend({type:"series.line",dependencies:["grid","polar"],getInitialData:function getInitialData(t,e){return Hs(t.data,this,e);},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,hoverAnimation:!0,clipOverflow:!0,label:{normal:{position:"top"}},lineStyle:{normal:{width:2,type:"solid"}},step:!1,smooth:!1,smoothMonotone:null,symbol:"emptyCircle",symbolSize:4,symbolRotate:null,showSymbol:!0,showAllSymbol:!1,connectNulls:!1,sampling:"none",animationEasing:"linear",progressive:0,hoverLayerThreshold:1/0}});var ey=fh.prototype;ey._createSymbol=function(t,e,n,i){this.removeAll();var r=e.getItemVisual(n,"color"),o=sl(t,-1,-1,2,2,r);o.attr({z2:100,culling:!0,scale:dh(i)}),o.drift=gh,this._symbolType=t,this.add(o);},ey.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(t);},ey.getSymbolPath=function(){return this.childAt(0);},ey.getScale=function(){return this.childAt(0).scale;},ey.highlight=function(){this.childAt(0).trigger("emphasis");},ey.downplay=function(){this.childAt(0).trigger("normal");},ey.setZ=function(t,e){var n=this.childAt(0);n.zlevel=t,n.z=e;},ey.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":"pointer";},ey.updateData=function(t,e,n){this.silent=!1;var i=t.getItemVisual(e,"symbol")||"circle",r=t.hostModel,o=ch(t,e),a=i!==this._symbolType;if(a)this._createSymbol(i,t,e,o);else{var s=this.childAt(0);s.silent=!1,Lo(s,{scale:dh(o)},r,e);}if(this._updateCommon(t,e,o,n),a){var s=this.childAt(0),l=n&&n.fadeIn,h={scale:s.scale.slice()};l&&(h.style={opacity:s.style.opacity}),s.scale=[0,0],l&&(s.style.opacity=0),Oo(s,h,r,e);}this._seriesModel=r;};var ny=["itemStyle","normal"],iy=["itemStyle","emphasis"],ry=["label","normal"],oy=["label","emphasis"];ey._updateCommon=function(t,e,n,i){var r=this.childAt(0),o=t.hostModel,s=t.getItemVisual(e,"color");"image"!==r.type&&r.useStyle({strokeNoScale:!0});var l=i&&i.itemStyle,h=i&&i.hoverItemStyle,u=i&&i.symbolRotate,c=i&&i.symbolOffset,d=i&&i.labelModel,f=i&&i.hoverLabelModel,g=i&&i.hoverAnimation,p=i&&i.cursorStyle;if(!i||t.hasItemOption){var v=i&&i.itemModel?i.itemModel:t.getItemModel(e);l=v.getModel(ny).getItemStyle(["color"]),h=v.getModel(iy).getItemStyle(),u=v.getShallow("symbolRotate"),c=v.getShallow("symbolOffset"),d=v.getModel(ry),f=v.getModel(oy),g=v.getShallow("hoverAnimation"),p=v.getShallow("cursor");}else h=a({},h);var m=r.style;r.attr("rotation",(u||0)*Math.PI/180||0),c&&r.attr("position",[Pi(c[0],n[0]),Pi(c[1],n[1])]),p&&r.attr("cursor",p),r.setColor(s,i&&i.symbolInnerColor),r.setStyle(l);var y=t.getItemVisual(e,"opacity");null!=y&&(m.opacity=y);var x=i&&i.useNameLabel,_=!x&&uh(t);(x||null!=_)&&wo(m,h,d,f,{labelFetcher:o,labelDataIndex:e,defaultText:x?t.getName(e):t.get(_,e),isRectText:!0,autoColor:s}),r.off("mouseover").off("mouseout").off("emphasis").off("normal"),r.hoverStyle=h,_o(r);var w=dh(n);if(g&&o.isAnimationEnabled()){var b=function b(){var t=w[1]/w[0];this.animateTo({scale:[Math.max(1.1*w[0],w[0]+3),Math.max(1.1*w[1],w[1]+3*t)]},400,"elasticOut");},S=function S(){this.animateTo({scale:w},400,"elasticOut");};r.on("mouseover",b).on("mouseout",S).on("emphasis",b).on("normal",S);}},ey.fadeOut=function(t,e){var n=this.childAt(0);this.silent=n.silent=!0,!(e&&e.keepLabel)&&(n.style.text=null),Lo(n,{style:{opacity:0},scale:[0,0]},this._seriesModel,this.dataIndex,t);},u(fh,td);var ay=ph.prototype;ay.updateData=function(t,e){var n=this.group,i=t.hostModel,r=this._data,o=this._symbolCtor,a={itemStyle:i.getModel("itemStyle.normal").getItemStyle(["color"]),hoverItemStyle:i.getModel("itemStyle.emphasis").getItemStyle(),symbolRotate:i.get("symbolRotate"),symbolOffset:i.get("symbolOffset"),hoverAnimation:i.get("hoverAnimation"),labelModel:i.getModel("label.normal"),hoverLabelModel:i.getModel("label.emphasis"),cursorStyle:i.get("cursor")};t.diff(r).add(function(i){var r=t.getItemLayout(i);if(vh(t,i,e)){var s=new o(t,i,a);s.attr("position",r),t.setItemGraphicEl(i,s),n.add(s);}}).update(function(s,l){var h=r.getItemGraphicEl(l),u=t.getItemLayout(s);return vh(t,s,e)?(h?(h.updateData(t,s,a),Lo(h,{position:u},i)):(h=new o(t,s),h.attr("position",u)),n.add(h),void t.setItemGraphicEl(s,h)):void n.remove(h);}).remove(function(t){var e=r.getItemGraphicEl(t);e&&e.fadeOut(function(){n.remove(e);});}).execute(),this._data=t;},ay.updateLayout=function(){var t=this._data;t&&t.eachItemGraphicEl(function(e,n){var i=t.getItemLayout(n);e.attr("position",i);});},ay.remove=function(t){var e=this.group,n=this._data;n&&(t?n.eachItemGraphicEl(function(t){t.fadeOut(function(){e.remove(t);});}):e.removeAll());};var sy=function sy(t,e,n,i,r,o){for(var a=xh(t,e),s=[],l=[],h=[],u=[],c=[],d=[],f=[],g=o.dimensions,p=0;p<a.length;p++){var v=a[p],m=!0;switch(v.cmd){case"=":var y=t.getItemLayout(v.idx),x=e.getItemLayout(v.idx1);(isNaN(y[0])||isNaN(y[1]))&&(y=x.slice()),s.push(y),l.push(x),h.push(n[v.idx]),u.push(i[v.idx1]),f.push(e.getRawIndex(v.idx1));break;case"+":var _=v.idx;s.push(r.dataToPoint([e.get(g[0],_,!0),e.get(g[1],_,!0)])),l.push(e.getItemLayout(_).slice()),h.push(yh(r,e,_)),u.push(i[_]),f.push(e.getRawIndex(_));break;case"-":var _=v.idx,w=t.getRawIndex(_);w!==_?(s.push(t.getItemLayout(_)),l.push(o.dataToPoint([t.get(g[0],_,!0),t.get(g[1],_,!0)])),h.push(n[_]),u.push(yh(o,t,_)),f.push(w)):m=!1;}m&&(c.push(v),d.push(d.length));}d.sort(function(t,e){return f[t]-f[e];});for(var b=[],S=[],M=[],T=[],I=[],p=0;p<d.length;p++){var _=d[p];b[p]=s[_],S[p]=l[_],M[p]=h[_],T[p]=u[_],I[p]=c[_];}return{current:b,next:S,stackedOnCurrent:M,stackedOnNext:T,status:I};},ly=ie,hy=re,uy=V,cy=F,dy=[],fy=[],gy=[],py=Wr.extend({type:"ec-polyline",shape:{points:[],smooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},style:{fill:null,stroke:"#000"},brush:vg(Wr.prototype.brush),buildPath:function buildPath(t,e){var n=e.points,i=0,r=n.length,o=bh(n,e.smoothConstraint);if(e.connectNulls){for(;r>0&&_h(n[r-1]);r--){}for(;r>i&&_h(n[i]);i++){}}for(;r>i;){i+=wh(t,n,i,r,r,1,o.min,o.max,e.smooth,e.smoothMonotone,e.connectNulls)+1;}}}),vy=Wr.extend({type:"ec-polygon",shape:{points:[],stackedOnPoints:[],smooth:0,stackedOnSmooth:0,smoothConstraint:!0,smoothMonotone:null,connectNulls:!1},brush:vg(Wr.prototype.brush),buildPath:function buildPath(t,e){var n=e.points,i=e.stackedOnPoints,r=0,o=n.length,a=e.smoothMonotone,s=bh(n,e.smoothConstraint),l=bh(i,e.smoothConstraint);if(e.connectNulls){for(;o>0&&_h(n[o-1]);o--){}for(;o>r&&_h(n[r]);r++){}}for(;o>r;){var h=wh(t,n,r,o,o,1,s.min,s.max,e.smooth,a,e.connectNulls);wh(t,i,r+h-1,h,o,-1,l.min,l.max,e.stackedOnSmooth,a,e.connectNulls),r+=h+1,t.closePath();}}});Ea.extend({type:"line",init:function init(){var t=new td(),e=new ph();this.group.add(e.group),this._symbolDraw=e,this._lineGroup=t;},render:function render(t,e,n){var i=t.coordinateSystem,r=this.group,o=t.getData(),a=t.getModel("lineStyle.normal"),l=t.getModel("areaStyle.normal"),h=o.mapArray(o.getItemLayout,!0),u="polar"===i.type,c=this._coordSys,d=this._symbolDraw,f=this._polyline,g=this._polygon,p=this._lineGroup,v=t.get("animation"),m=!l.isEmpty(),y=Ch(i,o),x=t.get("showSymbol"),_=x&&!u&&!t.get("showAllSymbol")&&this._getSymbolIgnoreFunc(o,i),w=this._data;w&&w.eachItemGraphicEl(function(t,e){t.__temp&&(r.remove(t),w.setItemGraphicEl(e,null));}),x||d.remove(),r.add(p);var b=!u&&t.get("step");f&&c.type===i.type&&b===this._step?(m&&!g?g=this._newPolygon(h,y,i,v):g&&!m&&(p.remove(g),g=this._polygon=null),p.setClipPath(kh(i,!1,t)),x&&d.updateData(o,_),o.eachItemGraphicEl(function(t){t.stopAnimation(!0);}),Sh(this._stackedOnPoints,y)&&Sh(this._points,h)||(v?this._updateAnimation(o,y,i,n,b):(b&&(h=Ph(h,i,b),y=Ph(y,i,b)),f.setShape({points:h}),g&&g.setShape({points:h,stackedOnPoints:y})))):(x&&d.updateData(o,_),b&&(h=Ph(h,i,b),y=Ph(y,i,b)),f=this._newPolyline(h,i,v),m&&(g=this._newPolygon(h,y,i,v)),p.setClipPath(kh(i,!0,t)));var S=Lh(o,i)||o.getVisual("color");f.useStyle(s(a.getLineStyle(),{fill:"none",stroke:S,lineJoin:"bevel"}));var M=t.get("smooth");if(M=Mh(t.get("smooth")),f.setShape({smooth:M,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")}),g){var T=o.stackedOn,I=0;if(g.useStyle(s(l.getAreaStyle(),{fill:S,opacity:.7,lineJoin:"bevel"})),T){var C=T.hostModel;I=Mh(C.get("smooth"));}g.setShape({smooth:M,stackedOnSmooth:I,smoothMonotone:t.get("smoothMonotone"),connectNulls:t.get("connectNulls")});}this._data=o,this._coordSys=i,this._stackedOnPoints=y,this._points=h,this._step=b;},dispose:function dispose(){},highlight:function highlight(t,e,n,i){var r=t.getData(),o=Qo(r,i);if(!(o instanceof Array)&&null!=o&&o>=0){var a=r.getItemGraphicEl(o);if(!a){var s=r.getItemLayout(o);if(!s)return;a=new fh(r,o),a.position=s,a.setZ(t.get("zlevel"),t.get("z")),a.ignore=isNaN(s[0])||isNaN(s[1]),a.__temp=!0,r.setItemGraphicEl(o,a),a.stopSymbolAnimation(!0),this.group.add(a);}a.highlight();}else Ea.prototype.highlight.call(this,t,e,n,i);},downplay:function downplay(t,e,n,i){var r=t.getData(),o=Qo(r,i);if(null!=o&&o>=0){var a=r.getItemGraphicEl(o);a&&(a.__temp?(r.setItemGraphicEl(o,null),this.group.remove(a)):a.downplay());}else Ea.prototype.downplay.call(this,t,e,n,i);},_newPolyline:function _newPolyline(t){var e=this._polyline;return e&&this._lineGroup.remove(e),e=new py({shape:{points:t},silent:!0,z2:10}),this._lineGroup.add(e),this._polyline=e,e;},_newPolygon:function _newPolygon(t,e){var n=this._polygon;return n&&this._lineGroup.remove(n),n=new vy({shape:{points:t,stackedOnPoints:e},silent:!0}),this._lineGroup.add(n),this._polygon=n,n;},_getSymbolIgnoreFunc:function _getSymbolIgnoreFunc(t,e){var n=e.getAxesByScale("ordinal")[0];return n&&n.isLabelIgnored?y(n.isLabelIgnored,n):void 0;},_updateAnimation:function _updateAnimation(t,e,n,i,r){var o=this._polyline,a=this._polygon,s=t.hostModel,l=sy(this._data,t,this._stackedOnPoints,e,this._coordSys,n),h=l.current,u=l.stackedOnCurrent,c=l.next,d=l.stackedOnNext;r&&(h=Ph(l.current,n,r),u=Ph(l.stackedOnCurrent,n,r),c=Ph(l.next,n,r),d=Ph(l.stackedOnNext,n,r)),o.shape.__points=l.current,o.shape.points=h,Lo(o,{shape:{points:c}},s),a&&(a.setShape({points:h,stackedOnPoints:u}),Lo(a,{shape:{points:c,stackedOnPoints:d}},s));for(var f=[],g=l.status,p=0;p<g.length;p++){var v=g[p].cmd;if("="===v){var m=t.getItemGraphicEl(g[p].idx1);m&&f.push({el:m,ptIdx:p});}}o.animators&&o.animators.length&&o.animators[0].during(function(){for(var t=0;t<f.length;t++){var e=f[t].el;e.attr("position",o.shape.__points[f[t].ptIdx]);}});},remove:function remove(){var t=this.group,e=this._data;this._lineGroup.removeAll(),this._symbolDraw.remove(!0),e&&e.eachItemGraphicEl(function(n,i){n.__temp&&(t.remove(n),e.setItemGraphicEl(i,null));}),this._polyline=this._polygon=this._coordSys=this._points=this._stackedOnPoints=this._data=null;}});var my=function my(t,e,n,i){i.eachRawSeriesByType(t,function(t){var r=t.getData(),o=t.get("symbol")||e,a=t.get("symbolSize");r.setVisual({legendSymbol:n||o,symbol:o,symbolSize:a}),i.isSeriesFiltered(t)||("function"==typeof a&&r.each(function(e){var n=t.getRawValue(e),i=t.getDataParams(e);r.setItemVisual(e,"symbolSize",a(n,i));}),r.each(function(t){var e=r.getItemModel(t),n=e.getShallow("symbol",!0),i=e.getShallow("symbolSize",!0);null!=n&&r.setItemVisual(t,"symbol",n),null!=i&&r.setItemVisual(t,"symbolSize",i);}));});},yy=function yy(t,e){e.eachSeriesByType(t,function(t){var e=t.getData(),n=t.coordinateSystem;if(n){for(var i=[],r=n.dimensions,o=0;o<r.length;o++){i.push(t.coordDimToDataDim(n.dimensions[o])[0]);}1===i.length?e.each(i[0],function(t,i){e.setItemLayout(i,isNaN(t)?[0/0,0/0]:n.dataToPoint(t));}):2===i.length&&e.each(i,function(t,i,r){e.setItemLayout(r,isNaN(t)||isNaN(i)?[0/0,0/0]:n.dataToPoint([t,i]));},!0);}});},xy={average:function average(t){for(var e=0,n=0,i=0;i<t.length;i++){isNaN(t[i])||(e+=t[i],n++);}return 0===n?0/0:e/n;},sum:function sum(t){for(var e=0,n=0;n<t.length;n++){e+=t[n]||0;}return e;},max:function max(t){for(var e=-1/0,n=0;n<t.length;n++){t[n]>e&&(e=t[n]);}return e;},min:function min(t){for(var e=1/0,n=0;n<t.length;n++){t[n]<e&&(e=t[n]);}return e;},nearest:function nearest(t){return t[0];}},_y=function _y(t){return Math.round(t.length/2);},wy=function wy(t,e){e.eachSeriesByType(t,function(t){var e=t.getData(),n=t.get("sampling"),i=t.coordinateSystem;if("cartesian2d"===i.type&&n){var r=i.getBaseAxis(),o=i.getOtherAxis(r),a=r.getExtent(),s=a[1]-a[0],l=Math.round(e.count()/s);if(l>1){var h;"string"==typeof n?h=xy[n]:"function"==typeof n&&(h=n),h&&(e=e.downSample(o.dim,1/l,h,_y),t.setData(e));}}},this);};ws(x(my,"line","circle","line")),_s(x(yy,"line")),ps($p.PROCESSOR.STATISTIC,x(wy,"line"));var by={updateSelectedMap:function updateSelectedMap(t){this._targetList=t.slice(),this._selectTargetMap=p(t||[],function(t,e){return t.set(e.name,e),t;},E());},select:function select(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t),i=this.get("selectedMode");"single"===i&&this._selectTargetMap.each(function(t){t.selected=!1;}),n&&(n.selected=!0);},unSelect:function unSelect(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);n&&(n.selected=!1);},toggleSelected:function toggleSelected(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);return null!=n?(this[n.selected?"unSelect":"select"](t,e),n.selected):void 0;},isSelected:function isSelected(t,e){var n=null!=e?this._targetList[e]:this._selectTargetMap.get(t);return n&&n.selected;}},Sy=Ts({type:"series.pie",init:function init(t){Sy.superApply(this,"init",arguments),this.legendDataProvider=function(){return this.getRawData();},this.updateSelectedMap(t.data),this._defaultLabelLine(t);},mergeOption:function mergeOption(t){Sy.superCall(this,"mergeOption",t),this.updateSelectedMap(this.option.data);},getInitialData:function getInitialData(t){var e=Rs(["value"],t.data),n=new Tv(e,this);return n.initData(t.data),n;},getDataParams:function getDataParams(t){var e=this.getData(),n=Sy.superCall(this,"getDataParams",t),i=[];return e.each("value",function(t){i.push(t);}),n.percent=Ri(i,t,e.hostModel.get("percentPrecision")),n.$vars.push("percent"),n;},_defaultLabelLine:function _defaultLabelLine(t){qo(t.labelLine,["show"]);var e=t.labelLine.normal,n=t.labelLine.emphasis;e.show=e.show&&t.label.normal.show,n.show=n.show&&t.label.emphasis.show;},defaultOption:{zlevel:0,z:2,legendHoverLink:!0,hoverAnimation:!0,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,selectedOffset:10,hoverOffset:10,avoidLabelOverlap:!0,percentPrecision:2,stillShowZeroSum:!0,label:{normal:{rotate:!1,show:!0,position:"outer"},emphasis:{}},labelLine:{normal:{show:!0,length:15,length2:15,smooth:!1,lineStyle:{width:1,type:"solid"}}},itemStyle:{normal:{borderWidth:1},emphasis:{}},animationType:"expansion",animationEasing:"cubicOut",data:[]}});c(Sy,by);var My=Bh.prototype;My.updateData=function(t,e,n){function i(){o.stopAnimation(!0),o.animateTo({shape:{r:u.r+l.get("hoverOffset")}},300,"elasticOut");}function r(){o.stopAnimation(!0),o.animateTo({shape:{r:u.r}},300,"elasticOut");}var o=this.childAt(0),l=t.hostModel,h=t.getItemModel(e),u=t.getItemLayout(e),c=a({},u);if(c.label=null,n){o.setShape(c);var d=l.getShallow("animationType");"scale"===d?(o.shape.r=u.r0,Oo(o,{shape:{r:u.r}},l,e)):(o.shape.endAngle=u.startAngle,Lo(o,{shape:{endAngle:u.endAngle}},l,e));}else Lo(o,{shape:c},l,e);var f=h.getModel("itemStyle"),g=t.getItemVisual(e,"color");o.useStyle(s({lineJoin:"bevel",fill:g},f.getModel("normal").getItemStyle())),o.hoverStyle=f.getModel("emphasis").getItemStyle();var p=h.getShallow("cursor");p&&o.attr("cursor",p),zh(this,t.getItemLayout(e),h.get("selected"),l.get("selectedOffset"),l.get("animation")),o.off("mouseover").off("mouseout").off("emphasis").off("normal"),h.get("hoverAnimation")&&l.isAnimationEnabled()&&o.on("mouseover",i).on("mouseout",r).on("emphasis",i).on("normal",r),this._updateLabel(t,e),_o(this);},My._updateLabel=function(t,e){var n=this.childAt(1),i=this.childAt(2),r=t.hostModel,o=t.getItemModel(e),a=t.getItemLayout(e),s=a.label,l=t.getItemVisual(e,"color");Lo(n,{shape:{points:s.linePoints||[[s.x,s.y],[s.x,s.y],[s.x,s.y]]}},r,e),Lo(i,{style:{x:s.x,y:s.y}},r,e),i.attr({rotation:s.rotation,origin:[s.x,s.y],z2:10});var h=o.getModel("label.normal"),u=o.getModel("label.emphasis"),c=o.getModel("labelLine.normal"),d=o.getModel("labelLine.emphasis"),l=t.getItemVisual(e,"color");wo(i.style,i.hoverStyle={},h,u,{labelFetcher:t.hostModel,labelDataIndex:e,defaultText:t.getName(e),autoColor:l,useInsideStyle:!!s.inside},{textAlign:s.textAlign,textVerticalAlign:s.verticalAlign,opacity:t.getItemVisual(e,"opacity")}),i.ignore=i.normalIgnore=!h.get("show"),i.hoverIgnore=!u.get("show"),n.ignore=n.normalIgnore=!c.get("show"),n.hoverIgnore=!d.get("show"),n.setStyle({stroke:l,opacity:t.getItemVisual(e,"opacity")}),n.setStyle(c.getModel("lineStyle").getLineStyle()),n.hoverStyle=d.getModel("lineStyle").getLineStyle();var f=c.get("smooth");f&&f===!0&&(f=.4),n.setShape({smooth:f});},u(Bh,td);var Ty=(Ea.extend({type:"pie",init:function init(){var t=new td();this._sectorGroup=t;},render:function render(t,e,n,i){if(!i||i.from!==this.uid){var r=t.getData(),o=this._data,a=this.group,s=e.get("animation"),l=!o,h=t.get("animationType"),u=x(Oh,this.uid,t,s,n),c=t.get("selectedMode");if(r.diff(o).add(function(t){var e=new Bh(r,t);l&&"scale"!==h&&e.eachChild(function(t){t.stopAnimation(!0);}),c&&e.on("click",u),r.setItemGraphicEl(t,e),a.add(e);}).update(function(t,e){var n=o.getItemGraphicEl(e);n.updateData(r,t),n.off("click"),c&&n.on("click",u),a.add(n),r.setItemGraphicEl(t,n);}).remove(function(t){var e=o.getItemGraphicEl(t);a.remove(e);}).execute(),s&&l&&r.count()>0&&"scale"!==h){var d=r.getItemLayout(0),f=Math.max(n.getWidth(),n.getHeight())/2,g=y(a.removeClipPath,a);a.setClipPath(this._createClipPath(d.cx,d.cy,f,d.startAngle,d.clockwise,g,t));}this._data=r;}},dispose:function dispose(){},_createClipPath:function _createClipPath(t,e,n,i,r,o,a){var s=new mg({shape:{cx:t,cy:e,r0:0,r:n,startAngle:i,endAngle:i,clockwise:r}});return Oo(s,{shape:{endAngle:i+(r?1:-1)*Math.PI*2}},a,o),s;},containPoint:function containPoint(t,e){var n=e.getData(),i=n.getItemLayout(0);if(i){var r=t[0]-i.cx,o=t[1]-i.cy,a=Math.sqrt(r*r+o*o);return a<=i.r&&a>=i.r0;}}}),function(t,e){f(e,function(e){e.update="updateView",ms(e,function(n,i){var r={};return i.eachComponent({mainType:"series",subType:t,query:n},function(t){t[e.method]&&t[e.method](n.name,n.dataIndex);var i=t.getData();i.each(function(e){var n=i.getName(e);r[n]=t.isSelected(n)||!1;});}),{name:n.name,selected:r};});});}),Iy=function Iy(t,e){var n={};e.eachRawSeriesByType(t,function(t){var i=t.getRawData(),r={};if(!e.isSeriesFiltered(t)){var o=t.getData();o.each(function(t){var e=o.getRawIndex(t);r[e]=t;}),i.each(function(e){var a=r[e],s=null!=a&&o.getItemVisual(a,"color",!0);if(s)i.setItemVisual(e,"color",s);else{var l=i.getItemModel(e),h=l.get("itemStyle.normal.color")||t.getColorFromPalette(i.getName(e),n);i.setItemVisual(e,"color",h),null!=a&&o.setItemVisual(a,"color",h);}});}});},Cy=function Cy(t,e,n,i){var r,o,a=t.getData(),s=[],l=!1;a.each(function(n){var i,h,u,c,d=a.getItemLayout(n),f=a.getItemModel(n),g=f.getModel("label.normal"),p=g.get("position")||f.get("label.emphasis.position"),v=f.getModel("labelLine.normal"),m=v.get("length"),y=v.get("length2"),x=(d.startAngle+d.endAngle)/2,_=Math.cos(x),w=Math.sin(x);r=d.cx,o=d.cy;var b="inside"===p||"inner"===p;if("center"===p)i=d.cx,h=d.cy,c="center";else{var S=(b?(d.r+d.r0)/2*_:d.r*_)+r,M=(b?(d.r+d.r0)/2*w:d.r*w)+o;if(i=S+3*_,h=M+3*w,!b){var T=S+_*(m+e-d.r),I=M+w*(m+e-d.r),C=T+(0>_?-1:1)*y,A=I;i=C+(0>_?-5:5),h=A,u=[[S,M],[T,I],[C,A]];}c=b?"center":_>0?"left":"right";}var D=g.getFont(),k=g.get("rotate")?0>_?-x+Math.PI:-x:0,P=t.getFormattedLabel(n,"normal")||a.getName(n),L=xn(P,D,c,"top");l=!!k,d.label={x:i,y:h,position:p,height:L.height,len:m,len2:y,linePoints:u,textAlign:c,verticalAlign:"middle",rotation:k,inside:b},b||s.push(d.label);}),!l&&t.get("avoidLabelOverlap")&&Rh(s,r,o,e,n,i);},Ay=2*Math.PI,Dy=Math.PI/180,ky=function ky(t,e,n){e.eachSeriesByType(t,function(t){var e=t.get("center"),i=t.get("radius");_(i)||(i=[0,i]),_(e)||(e=[e,e]);var r=n.getWidth(),o=n.getHeight(),a=Math.min(r,o),s=Pi(e[0],r),l=Pi(e[1],o),h=Pi(i[0],a/2),u=Pi(i[1],a/2),c=t.getData(),d=-t.get("startAngle")*Dy,f=t.get("minAngle")*Dy,g=0;c.each("value",function(t){!isNaN(t)&&g++;});var p=c.getSum("value"),v=Math.PI/(p||g)*2,m=t.get("clockwise"),y=t.get("roseType"),x=t.get("stillShowZeroSum"),w=c.getDataExtent("value");w[0]=0;var b=Ay,S=0,M=d,T=m?1:-1;if(c.each("value",function(t,e){var n;if(isNaN(t))return void c.setItemLayout(e,{angle:0/0,startAngle:0/0,endAngle:0/0,clockwise:m,cx:s,cy:l,r0:h,r:y?0/0:u});n="area"!==y?0===p&&x?v:t*v:Ay/g,f>n?(n=f,b-=f):S+=t;var i=M+T*n;c.setItemLayout(e,{angle:n,startAngle:M,endAngle:i,clockwise:m,cx:s,cy:l,r0:h,r:y?ki(t,w,[h,u]):u}),M=i;},!0),Ay>b&&g)if(.001>=b){var I=Ay/g;c.each("value",function(t,e){if(!isNaN(t)){var n=c.getItemLayout(e);n.angle=I,n.startAngle=d+T*e*I,n.endAngle=d+T*(e+1)*I;}});}else v=b/S,M=d,c.each("value",function(t,e){if(!isNaN(t)){var n=c.getItemLayout(e),i=n.angle===f?f:t*v;n.startAngle=M,n.endAngle=M+T*i,M+=T*i;}});Cy(t,u,r,o);});},Py=function Py(t,e){var n=e.findComponents({mainType:"legend"});n&&n.length&&e.eachSeriesByType(t,function(t){var e=t.getData();e.filterSelf(function(t){for(var i=e.getName(t),r=0;r<n.length;r++){if(!n[r].isSelected(i))return!1;}return!0;},this);},this);};Ty("pie",[{type:"pieToggleSelect",event:"pieselectchanged",method:"toggleSelected"},{type:"pieSelect",event:"pieselected",method:"select"},{type:"pieUnSelect",event:"pieunselected",method:"unSelect"}]),ws(x(Iy,"pie")),_s(x(ky,"pie")),ps(x(Py,"pie")),Ss({type:"title",layoutMode:{type:"box",ignoreSize:!0},defaultOption:{zlevel:0,z:6,show:!0,text:"",target:"blank",subtext:"",subtarget:"blank",left:0,top:0,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,textStyle:{fontSize:18,fontWeight:"bolder",color:"#333"},subtextStyle:{color:"#aaa"}}}),Ms({type:"title",render:function render(t,e,n){if(this.group.removeAll(),t.get("show")){var i=this.group,r=t.getModel("textStyle"),o=t.getModel("subtextStyle"),a=t.get("textAlign"),s=t.get("textBaseline"),l=new fg({style:bo({},r,{text:t.get("text"),textFill:r.getTextColor()},{disableBox:!0}),z2:10}),h=l.getBoundingRect(),u=t.get("subtext"),c=new fg({style:bo({},o,{text:u,textFill:o.getTextColor(),y:h.height+t.get("itemGap"),textVerticalAlign:"top"},{disableBox:!0}),z2:10}),d=t.get("link"),f=t.get("sublink");l.silent=!d,c.silent=!f,d&&l.on("click",function(){window.open(d,"_"+t.get("target"));}),f&&c.on("click",function(){window.open(f,"_"+t.get("subtarget"));}),i.add(l),u&&i.add(c);var g=i.getBoundingRect(),p=t.getBoxLayoutParams();p.width=g.width,p.height=g.height;var v=la(p,{width:n.getWidth(),height:n.getHeight()},t.get("padding"));a||(a=t.get("left")||t.get("right"),"middle"===a&&(a="center"),"right"===a?v.x+=v.width:"center"===a&&(v.x+=v.width/2)),s||(s=t.get("top")||t.get("bottom"),"center"===s&&(s="middle"),"bottom"===s?v.y+=v.height:"middle"===s&&(v.y+=v.height/2),s=s||"top"),i.attr("position",[v.x,v.y]);var m={textAlign:a,textVerticalAlign:s};l.setStyle(m),c.setStyle(m),g=i.getBoundingRect();var y=v.margin,x=t.getItemStyle(["color","opacity"]);x.fill=t.get("backgroundColor");var _=new Sg({shape:{x:g.x-y[3],y:g.y-y[0],width:g.width+y[1]+y[3],height:g.height+y[0]+y[2],r:t.get("borderRadius")},style:x,silent:!0});oo(_),i.add(_);}}});var Ly=Ss({type:"legend.plain",dependencies:["series"],layoutMode:{type:"box",ignoreSize:!0},init:function init(t,e,n){this.mergeDefaultAndTheme(t,n),t.selected=t.selected||{};},mergeOption:function mergeOption(t){Ly.superCall(this,"mergeOption",t);},optionUpdated:function optionUpdated(){this._updateData(this.ecModel);var t=this._data;if(t[0]&&"single"===this.get("selectedMode")){for(var e=!1,n=0;n<t.length;n++){var i=t[n].get("name");if(this.isSelected(i)){this.select(i),e=!0;break;}}!e&&this.select(t[0].get("name"));}},_updateData:function _updateData(t){var e=g(this.get("data")||[],function(t){return("string"==typeof t||"number"==typeof t)&&(t={name:t}),new Ho(t,this,this.ecModel);},this);this._data=e;var n=g(t.getSeries(),function(t){return t.name;});t.eachSeries(function(t){if(t.legendDataProvider){var e=t.legendDataProvider();n=n.concat(e.mapArray(e.getName));}}),this._availableNames=n;},getData:function getData(){return this._data;},select:function select(t){var e=this.option.selected,n=this.get("selectedMode");if("single"===n){var i=this._data;f(i,function(t){e[t.get("name")]=!1;});}e[t]=!0;},unSelect:function unSelect(t){"single"!==this.get("selectedMode")&&(this.option.selected[t]=!1);},toggleSelected:function toggleSelected(t){var e=this.option.selected;e.hasOwnProperty(t)||(e[t]=!0),this[e[t]?"unSelect":"select"](t);},isSelected:function isSelected(t){var e=this.option.selected;return!(e.hasOwnProperty(t)&&!e[t])&&h(this._availableNames,t)>=0;},defaultOption:{zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:0,align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,inactiveColor:"#ccc",textStyle:{color:"#333"},selectedMode:!0,tooltip:{show:!1}}});ms("legendToggleSelect","legendselectchanged",x(Nh,"toggleSelected")),ms("legendSelect","legendselected",x(Nh,"select")),ms("legendUnSelect","legendunselected",x(Nh,"unSelect"));var Oy=x,zy=f,By=td,Ey=Ms({type:"legend.plain",newlineDisabled:!1,init:function init(){this.group.add(this._contentGroup=new By()),this._backgroundEl;},getContentGroup:function getContentGroup(){return this._contentGroup;},render:function render(t,e,n){if(this.resetInner(),t.get("show",!0)){var i=t.get("align");i&&"auto"!==i||(i="right"===t.get("left")&&"vertical"===t.get("orient")?"right":"left"),this.renderInner(i,t,e,n);var r=t.getBoxLayoutParams(),o={width:n.getWidth(),height:n.getHeight()},a=t.get("padding"),l=la(r,o,a),h=this.layoutInner(t,i,l),u=la(s({width:h.width,height:h.height},r),o,a);this.group.attr("position",[u.x-h.x,u.y-h.y]),this.group.add(this._backgroundEl=Fh(h,t));}},resetInner:function resetInner(){this.getContentGroup().removeAll(),this._backgroundEl&&this.group.remove(this._backgroundEl);},renderInner:function renderInner(t,e,n,i){var r=this.getContentGroup(),o=E(),a=e.get("selectedMode");zy(e.getData(),function(s,l){var h=s.get("name");if(!this.newlineDisabled&&(""===h||"\n"===h))return void r.add(new By({newline:!0}));var u=n.getSeriesByName(h)[0];if(!o.get(h))if(u){var c=u.getData(),d=c.getVisual("color");"function"==typeof d&&(d=d(u.getDataParams(0)));var f=c.getVisual("legendSymbol")||"roundRect",g=c.getVisual("symbol"),p=this._createItem(h,l,s,e,f,g,t,d,a);p.on("click",Oy(Gh,h,i)).on("mouseover",Oy(Hh,u,null,i)).on("mouseout",Oy(Wh,u,null,i)),o.set(h,!0);}else n.eachRawSeries(function(n){if(!o.get(h)&&n.legendDataProvider){var r=n.legendDataProvider(),u=r.indexOfName(h);if(0>u)return;var c=r.getItemVisual(u,"color"),d="roundRect",f=this._createItem(h,l,s,e,d,null,t,c,a);f.on("click",Oy(Gh,h,i)).on("mouseover",Oy(Hh,n,h,i)).on("mouseout",Oy(Wh,n,h,i)),o.set(h,!0);}},this);},this);},_createItem:function _createItem(t,e,n,i,r,o,s,l,h){var u=i.get("itemWidth"),c=i.get("itemHeight"),d=i.get("inactiveColor"),f=i.isSelected(t),g=new By(),p=n.getModel("textStyle"),v=n.get("icon"),m=n.getModel("tooltip"),y=m.parentModel;if(r=v||r,g.add(sl(r,0,0,u,c,f?l:d,!0)),!v&&o&&(o!==r||"none"==o)){var x=.8*c;"none"===o&&(o="circle"),g.add(sl(o,(u-x)/2,(c-x)/2,x,x,f?l:d));}var _="left"===s?u+5:-5,w=s,b=i.get("formatter"),S=t;"string"==typeof b&&b?S=b.replace("{name}",null!=t?t:""):"function"==typeof b&&(S=b(t)),g.add(new fg({style:bo({},p,{text:S,x:_,y:c/2,textFill:f?p.getTextColor():d,textAlign:w,textVerticalAlign:"middle"})}));var M=new Sg({shape:g.getBoundingRect(),invisible:!0,tooltip:m.get("show")?a({content:t,formatter:y.get("formatter",!0)||function(){return t;},formatterParams:{componentType:"legend",legendIndex:i.componentIndex,name:t,$vars:["name"]}},m.option):null});return g.add(M),g.eachChild(function(t){t.silent=!0;}),M.silent=!h,this.getContentGroup().add(g),_o(g),g.__legendDataIndex=e,g;},layoutInner:function layoutInner(t,e,n){var i=this.getContentGroup();Jg(t.get("orient"),i,t.get("itemGap"),n.width,n.height);var r=i.getBoundingRect();return i.attr("position",[-r.x,-r.y]),this.group.getBoundingRect();}}),Ry=function Ry(t){var e=t.findComponents({mainType:"legend"});e&&e.length&&t.filterSeries(function(t){for(var n=0;n<e.length;n++){if(!e[n].isSelected(t.name))return!1;}return!0;});};ps(Ry),np.registerSubTypeDefaulter("legend",function(){return"plain";});var Ny=Ly.extend({type:"legend.scroll",setScrollDataIndex:function setScrollDataIndex(t){this.option.scrollDataIndex=t;},defaultOption:{scrollDataIndex:0,pageButtonItemGap:5,pageButtonGap:null,pageButtonPosition:"end",pageFormatter:"{current}/{total}",pageIcons:{horizontal:["M0,0L12,-10L12,10z","M0,0L-12,-10L-12,10z"],vertical:["M0,0L20,0L10,-20z","M0,0L20,0L10,20z"]},pageIconColor:"#2f4554",pageIconInactiveColor:"#aaa",pageIconSize:15,pageTextStyle:{color:"#333"},animationDurationUpdate:800},init:function init(t,e,n,i){var r=ua(t);Ny.superCall(this,"init",t,e,n,i),Vh(this,t,r);},mergeOption:function mergeOption(t,e){Ny.superCall(this,"mergeOption",t,e),Vh(this,this.option,t);},getOrient:function getOrient(){return"vertical"===this.get("orient")?{index:1,name:"vertical"}:{index:0,name:"horizontal"};}}),Fy=td,Gy=["width","height"],Hy=["x","y"],Wy=Ey.extend({type:"legend.scroll",newlineDisabled:!0,init:function init(){Wy.superCall(this,"init"),this._currentIndex=0,this.group.add(this._containerGroup=new Fy()),this._containerGroup.add(this.getContentGroup()),this.group.add(this._controllerGroup=new Fy()),this._showController;},resetInner:function resetInner(){Wy.superCall(this,"resetInner"),this._controllerGroup.removeAll(),this._containerGroup.removeClipPath(),this._containerGroup.__rectSize=null;},renderInner:function renderInner(t,e,n,i){function r(t,n){var r=t+"DataIndex",l=Go(e.get("pageIcons",!0)[e.getOrient().name][n],{onclick:y(o._pageGo,o,r,e,i)},{x:-s[0]/2,y:-s[1]/2,width:s[0],height:s[1]});l.name=t,a.add(l);}var o=this;Wy.superCall(this,"renderInner",t,e,n,i);var a=this._controllerGroup,s=e.get("pageIconSize",!0);_(s)||(s=[s,s]),r("pagePrev",0);var l=e.getModel("pageTextStyle");a.add(new fg({name:"pageText",style:{textFill:l.getTextColor(),font:l.getFont(),textVerticalAlign:"middle",textAlign:"center"},silent:!0})),r("pageNext",1);},layoutInner:function layoutInner(t,e,n){var i=this.getContentGroup(),r=this._containerGroup,o=this._controllerGroup,a=t.getOrient().index,s=Gy[a],l=Gy[1-a],h=Hy[1-a];Jg(t.get("orient"),i,t.get("itemGap"),a?n.width:null,a?null:n.height),Jg("horizontal",o,t.get("pageButtonItemGap",!0));var u=i.getBoundingRect(),c=o.getBoundingRect(),d=this._showController=u[s]>n[s],f=[-u.x,-u.y];f[a]=i.position[a];var g=[0,0],p=[-c.x,-c.y],v=A(t.get("pageButtonGap",!0),t.get("itemGap",!0));if(d){var m=t.get("pageButtonPosition",!0);"end"===m?p[a]+=n[s]-c[s]:g[a]+=c[s]+v;}p[1-a]+=u[l]/2-c[l]/2,i.attr("position",f),r.attr("position",g),o.attr("position",p);var y=this.group.getBoundingRect(),y={x:0,y:0};if(y[s]=d?n[s]:u[s],y[l]=Math.max(u[l],c[l]),y[h]=Math.min(0,c[h]+p[1-a]),r.__rectSize=n[s],d){var x={x:0,y:0};x[s]=Math.max(n[s]-c[s]-v,0),x[l]=y[l],r.setClipPath(new Sg({shape:x})),r.__rectSize=x[s];}else o.eachChild(function(t){t.attr({invisible:!0,silent:!0});});var _=this._getPageInfo(t);return null!=_.pageIndex&&Lo(i,{position:_.contentPosition},d?t:!1),this._updatePageInfoView(t,_),y;},_pageGo:function _pageGo(t,e,n){var i=this._getPageInfo(e)[t];null!=i&&n.dispatchAction({type:"legendScroll",scrollDataIndex:i,legendId:e.id});},_updatePageInfoView:function _updatePageInfoView(t,e){var n=this._controllerGroup;f(["pagePrev","pageNext"],function(i){var r=null!=e[i+"DataIndex"],o=n.childOfName(i);o&&(o.setStyle("fill",r?t.get("pageIconColor",!0):t.get("pageIconInactiveColor",!0)),o.cursor=r?"pointer":"default");});var i=n.childOfName("pageText"),r=t.get("pageFormatter"),o=e.pageIndex,a=null!=o?o+1:0,s=e.pageCount;i&&r&&i.setStyle("text",b(r)?r.replace("{current}",a).replace("{total}",s):r({current:a,total:s}));},_getPageInfo:function _getPageInfo(t){function e(t){var e=t.getBoundingRect().clone();return e[f]+=t.position[u],e;}var n,i,r,o,a=t.get("scrollDataIndex",!0),s=this.getContentGroup(),l=s.getBoundingRect(),h=this._containerGroup.__rectSize,u=t.getOrient().index,c=Gy[u],d=Gy[1-u],f=Hy[u],g=s.position.slice();this._showController?s.eachChild(function(t){t.__legendDataIndex===a&&(o=t);}):o=s.childAt(0);var p=h?Math.ceil(l[c]/h):0;if(o){var v=o.getBoundingRect(),m=o.position[u]+v[f];g[u]=-m-l[f],n=Math.floor(p*(m+v[f]+h/2)/l[c]),n=l[c]&&p?Math.max(0,Math.min(p-1,n)):-1;var y={x:0,y:0};y[c]=h,y[d]=l[d],y[f]=-g[u]-l[f];var x,_=s.children();if(s.eachChild(function(t,n){var i=e(t);i.intersect(y)&&(null==x&&(x=n),r=t.__legendDataIndex),n===_.length-1&&i[f]+i[c]<=y[f]+y[c]&&(r=null);}),null!=x){var w=_[x],b=e(w);if(y[f]=b[f]+b[c]-y[c],0>=x&&b[f]>=y[f])i=null;else{for(;x>0&&e(_[x-1]).intersect(y);){x--;}i=_[x].__legendDataIndex;}}}return{contentPosition:g,pageIndex:n,pageCount:p,pagePrevDataIndex:i,pageNextDataIndex:r};}});ms("legendScroll","legendscroll",function(t,e){var n=t.scrollDataIndex;null!=n&&e.eachComponent({mainType:"legend",subType:"scroll",query:t},function(t){t.setScrollDataIndex(n);});});var Vy=function Vy(t,e){var n,i=[],r=t.seriesIndex;if(null==r||!(n=e.getSeriesByIndex(r)))return{point:[]};var o=n.getData(),a=Qo(o,t);if(null==a||_(a))return{point:[]};var s=o.getItemGraphicEl(a),l=n.coordinateSystem;if(n.getTooltipPosition)i=n.getTooltipPosition(a)||[];else if(l&&l.dataToPoint)i=l.dataToPoint(o.getValues(g(l.dimensions,function(t){return n.coordDimToDataDim(t)[0];}),a,!0))||[];else if(s){var h=s.getBoundingRect().clone();h.applyTransform(s.transform),i=[h.x+h.width/2,h.y+h.height/2];}return{point:i,el:s};},Xy=f,qy=x,Yy=Zg(),Zy=function Zy(t,e,n){var i=t.currTrigger,r=[t.x,t.y],o=t,a=t.dispatchAction||y(n.dispatchAction,n),s=e.getComponent("axisPointer").coordSysAxesInfo;if(s){Jh(r)&&(r=Vy({seriesIndex:o.seriesIndex,dataIndex:o.dataIndex},e).point);var l=Jh(r),h=o.axesInfo,u=s.axesInfo,c="leave"===i||Jh(r),d={},f={},g={list:[],map:{}},p={showPointer:qy(Yh,f),showTooltip:qy(Zh,g)};Xy(s.coordSysMap,function(t,e){var n=l||t.containPoint(r);Xy(s.coordSysAxesInfo[e],function(t){var e=t.axis,i=Kh(h,t);if(!c&&n&&(!h||i)){var o=i&&i.value;null!=o||l||(o=e.pointToData(r)),null!=o&&Xh(t,o,p,!1,d);}});});var v={};return Xy(u,function(t,e){var n=t.linkGroup;n&&!f[e]&&Xy(n.axesInfo,function(e,i){var r=f[i];if(e!==t&&r){var o=r.value;n.mapper&&(o=t.axis.scale.parse(n.mapper(o,Qh(e),Qh(t)))),v[t.key]=o;}});}),Xy(v,function(t,e){Xh(u[e],t,p,!0,d);}),jh(f,u,d),Uh(g,r,t,a),$h(u,a,n),d;}},jy=(Ss({type:"axisPointer",coordSysAxesInfo:null,defaultOption:{show:"auto",triggerOn:null,zlevel:0,z:50,type:"line",snap:!1,triggerTooltip:!0,value:null,status:null,link:[],animation:null,animationDurationUpdate:200,lineStyle:{color:"#aaa",width:1,type:"solid"},shadowStyle:{color:"rgba(150,150,150,0.3)"},label:{show:!0,formatter:null,precision:"auto",margin:3,color:"#fff",padding:[5,7,5,7],backgroundColor:"auto",borderColor:null,borderWidth:0,shadowBlur:3,shadowColor:"#aaa"},handle:{show:!1,icon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",size:45,margin:50,color:"#333",shadowBlur:3,shadowColor:"#aaa",shadowOffsetX:0,shadowOffsetY:2,throttle:40}}}),Zg()),Uy=f,$y=Ms({type:"axisPointer",render:function render(t,e,n){var i=e.getComponent("tooltip"),r=t.get("triggerOn")||i&&i.get("triggerOn")||"mousemove|click";tu("axisPointer",n,function(t,e,n){"none"!==r&&("leave"===t||r.indexOf(t)>=0)&&n({type:"updateAxisPointer",currTrigger:t,x:e&&e.offsetX,y:e&&e.offsetY});});},remove:function remove(t,e){au(e.getZr(),"axisPointer"),$y.superApply(this._model,"remove",arguments);},dispose:function dispose(t,e){au("axisPointer",e),$y.superApply(this._model,"dispose",arguments);}}),Ky=Zg(),Qy=i,Jy=y;su.prototype={_group:null,_lastGraphicKey:null,_handle:null,_dragging:!1,_lastValue:null,_lastStatus:null,_payloadInfo:null,animationThreshold:15,render:function render(t,e,n,i){var r=e.get("value"),o=e.get("status");if(this._axisModel=t,this._axisPointerModel=e,this._api=n,i||this._lastValue!==r||this._lastStatus!==o){this._lastValue=r,this._lastStatus=o;var a=this._group,s=this._handle;if(!o||"hide"===o)return a&&a.hide(),void(s&&s.hide());a&&a.show(),s&&s.show();var l={};this.makeElOption(l,r,t,e,n);var h=l.graphicKey;h!==this._lastGraphicKey&&this.clear(n),this._lastGraphicKey=h;var u=this._moveAnimation=this.determineAnimation(t,e);if(a){var c=x(lu,e,u);this.updatePointerEl(a,l,c,e),this.updateLabelEl(a,l,c,e);}else a=this._group=new td(),this.createPointerEl(a,l,t,e),this.createLabelEl(a,l,t,e),n.getZr().add(a);du(a,e,!0),this._renderHandle(r);}},remove:function remove(t){this.clear(t);},dispose:function dispose(t){this.clear(t);},determineAnimation:function determineAnimation(t,e){var n=e.get("animation"),i=t.axis,r="category"===i.type,o=e.get("snap");if(!o&&!r)return!1;if("auto"===n||null==n){var a=this.animationThreshold;if(r&&i.getBandWidth()>a)return!0;if(o){var s=ih(t).seriesDataCount,l=i.getExtent();return Math.abs(l[0]-l[1])/s>a;}return!1;}return n===!0;},makeElOption:function makeElOption(){},createPointerEl:function createPointerEl(t,e){var n=e.pointer;if(n){var i=Ky(t).pointerEl=new Rg[n.type](Qy(e.pointer));t.add(i);}},createLabelEl:function createLabelEl(t,e,n,i){if(e.label){var r=Ky(t).labelEl=new Sg(Qy(e.label));t.add(r),uu(r,i);}},updatePointerEl:function updatePointerEl(t,e,n){var i=Ky(t).pointerEl;i&&(i.setStyle(e.pointer.style),n(i,{shape:e.pointer.shape}));},updateLabelEl:function updateLabelEl(t,e,n,i){var r=Ky(t).labelEl;r&&(r.setStyle(e.label.style),n(r,{shape:e.label.shape,position:e.label.position}),uu(r,i));},_renderHandle:function _renderHandle(t){if(!this._dragging&&this.updateHandleTransform){var e=this._axisPointerModel,n=this._api.getZr(),i=this._handle,r=e.getModel("handle"),o=e.get("status");if(!r.get("show")||!o||"hide"===o)return i&&n.remove(i),void(this._handle=null);var a;this._handle||(a=!0,i=this._handle=Go(r.get("icon"),{cursor:"move",draggable:!0,onmousemove:function onmousemove(t){Dd(t.event);},onmousedown:Jy(this._onHandleDragMove,this,0,0),drift:Jy(this._onHandleDragMove,this),ondragend:Jy(this._onHandleDragEnd,this)}),n.add(i)),du(i,e,!1);var s=["color","borderColor","borderWidth","opacity","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"];i.setStyle(r.getItemStyle(null,s));var l=r.get("size");_(l)||(l=[l,l]),i.attr("scale",[l[0]/2,l[1]/2]),Ga(this,"_doDispatchAxisPointer",r.get("throttle")||0,"fixRate"),this._moveHandleToValue(t,a);}},_moveHandleToValue:function _moveHandleToValue(t,e){lu(this._axisPointerModel,!e&&this._moveAnimation,this._handle,cu(this.getHandleTransform(t,this._axisModel,this._axisPointerModel)));},_onHandleDragMove:function _onHandleDragMove(t,e){var n=this._handle;if(n){this._dragging=!0;var i=this.updateHandleTransform(cu(n),[t,e],this._axisModel,this._axisPointerModel);this._payloadInfo=i,n.stopAnimation(),n.attr(cu(i)),Ky(n).lastProp=null,this._doDispatchAxisPointer();}},_doDispatchAxisPointer:function _doDispatchAxisPointer(){var t=this._handle;if(t){var e=this._payloadInfo,n=this._axisModel;this._api.dispatchAction({type:"updateAxisPointer",x:e.cursorPoint[0],y:e.cursorPoint[1],tooltipOption:e.tooltipOption,axesInfo:[{axisDim:n.axis.dim,axisIndex:n.componentIndex}]});}},_onHandleDragEnd:function _onHandleDragEnd(){this._dragging=!1;var t=this._handle;if(t){var e=this._axisPointerModel.get("value");this._moveHandleToValue(e),this._api.dispatchAction({type:"hideTip"});}},getHandleTransform:null,updateHandleTransform:null,clear:function clear(t){this._lastValue=null,this._lastStatus=null;var e=t.getZr(),n=this._group,i=this._handle;e&&n&&(this._lastGraphicKey=null,n&&e.remove(n),i&&e.remove(i),this._group=null,this._handle=null,this._payloadInfo=null);},doClear:function doClear(){},buildLabel:function buildLabel(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]};}},su.prototype.constructor=su,or(su);var tx=su.extend({makeElOption:function makeElOption(t,e,n,i,r){var o=n.axis,a=o.grid,s=i.get("type"),l=wu(a,o).getOtherAxis(o).getGlobalExtent(),h=o.toGlobalCoord(o.dataToCoord(e,!0));if(s&&"none"!==s){var u=fu(i),c=ex[s](o,h,l,u);c.style=u,t.graphicKey=c.type,t.pointer=c;}var d=hh(a.model,n);yu(e,t,d,n,i,r);},getHandleTransform:function getHandleTransform(t,e,n){var i=hh(e.axis.grid.model,e,{labelInside:!1});return i.labelMargin=n.get("handle.margin"),{position:mu(e.axis,t,i),rotation:i.rotation+(i.labelDirection<0?Math.PI:0)};},updateHandleTransform:function updateHandleTransform(t,e,n){var i=n.axis,r=i.grid,o=i.getGlobalExtent(!0),a=wu(r,i).getOtherAxis(i).getGlobalExtent(),s="x"===i.dim?0:1,l=t.position;l[s]+=e[s],l[s]=Math.min(o[1],l[s]),l[s]=Math.max(o[0],l[s]);var h=(a[1]+a[0])/2,u=[h,h];u[s]=l[s];var c=[{verticalAlign:"middle"},{align:"center"}];return{position:l,rotation:t.rotation,cursorPoint:u,tooltipOption:c[s]};}}),ex={line:function line(t,e,n,i){var r=xu([e,n[0]],[e,n[1]],bu(t));return ro({shape:r,style:i}),{type:"Line",shape:r};},shadow:function shadow(t,e,n){var i=t.getBandWidth(),r=n[1]-n[0];return{type:"Rect",shape:_u([e-i/2,n[0]],[i,r],bu(t))};}};jm.registerAxisPointerClass("CartesianAxisPointer",tx),gs(function(t){if(t){(!t.axisPointer||0===t.axisPointer.length)&&(t.axisPointer={});var e=t.axisPointer.link;e&&!_(e)&&(t.axisPointer.link=[e]);}}),ps($p.PROCESSOR.STATISTIC,function(t,e){t.getComponent("axisPointer").coordSysAxesInfo=$l(t,e);}),ms({type:"updateAxisPointer",event:"updateAxisPointer",update:":updateAxisPointer"},Zy),Ss({type:"tooltip",dependencies:["axisPointer"],defaultOption:{zlevel:0,z:8,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove|click",alwaysShowContent:!1,displayMode:"single",confine:!1,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"rgba(50,50,50,0.7)",borderColor:"#333",borderRadius:4,borderWidth:0,padding:5,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:"auto",animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",crossStyle:{color:"#999",width:1,type:"dashed",textStyle:{}}},textStyle:{color:"#fff",fontSize:14}}});var nx=f,ix=Zi,rx=["","-webkit-","-moz-","-o-"],ox="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";Iu.prototype={constructor:Iu,_enterable:!0,update:function update(){var t=this._container,e=t.currentStyle||document.defaultView.getComputedStyle(t),n=t.style;"absolute"!==n.position&&"absolute"!==e.position&&(n.position="relative");},show:function show(t){clearTimeout(this._hideTimeout);var e=this.el;e.style.cssText=ox+Tu(t)+";left:"+this._x+"px;top:"+this._y+"px;"+(t.get("extraCssText")||""),e.style.display=e.innerHTML?"block":"none",this._show=!0;},setContent:function setContent(t){this.el.innerHTML=null==t?"":t;},setEnterable:function setEnterable(t){this._enterable=t;},getSize:function getSize(){var t=this.el;return[t.clientWidth,t.clientHeight];},moveTo:function moveTo(t,e){var n,i=this._zr;i&&i.painter&&(n=i.painter.getViewportRootOffset())&&(t+=n.offsetLeft,e+=n.offsetTop);var r=this.el.style;r.left=t+"px",r.top=e+"px",this._x=t,this._y=e;},hide:function hide(){this.el.style.display="none",this._show=!1;},hideLater:function hideLater(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(y(this.hide,this),t)):this.hide());},isShow:function isShow(){return this._show;}};var ax=y,sx=f,lx=Pi,hx=new Sg({shape:{x:-1,y:-1,width:2,height:2}});Ms({type:"tooltip",init:function init(t,e){if(!Uu.node){var n=new Iu(e.getDom(),e);this._tooltipContent=n;}},render:function render(t,e,n){if(!Uu.node){this.group.removeAll(),this._tooltipModel=t,this._ecModel=e,this._api=n,this._lastDataByCoordSys=null,this._alwaysShowContent=t.get("alwaysShowContent");var i=this._tooltipContent;i.update(),i.setEnterable(t.get("enterable")),this._initGlobalListener(),this._keepShow();}},_initGlobalListener:function _initGlobalListener(){var t=this._tooltipModel,e=t.get("triggerOn");tu("itemTooltip",this._api,ax(function(t,n,i){"none"!==e&&(e.indexOf(t)>=0?this._tryShow(n,i):"leave"===t&&this._hide(i));},this));},_keepShow:function _keepShow(){var t=this._tooltipModel,e=this._ecModel,n=this._api;if(null!=this._lastX&&null!=this._lastY&&"none"!==t.get("triggerOn")){var i=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout(function(){i.manuallyShowTip(t,e,n,{x:i._lastX,y:i._lastY});});}},manuallyShowTip:function manuallyShowTip(t,e,n,i){if(i.from!==this.uid&&!Uu.node){var r=Au(i,n);this._ticket="";var o=i.dataByCoordSys;if(i.tooltip&&null!=i.x&&null!=i.y){var a=hx;a.position=[i.x,i.y],a.update(),a.tooltip=i.tooltip,this._tryShow({offsetX:i.x,offsetY:i.y,target:a},r);}else if(o)this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,event:{},dataByCoordSys:i.dataByCoordSys,tooltipOption:i.tooltipOption},r);else if(null!=i.seriesIndex){if(this._manuallyAxisShowTip(t,e,n,i))return;var s=Vy(i,e),l=s.point[0],h=s.point[1];null!=l&&null!=h&&this._tryShow({offsetX:l,offsetY:h,position:i.position,target:s.el,event:{}},r);}else null!=i.x&&null!=i.y&&(n.dispatchAction({type:"updateAxisPointer",x:i.x,y:i.y}),this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,target:n.getZr().findHover(i.x,i.y).target,event:{}},r));}},manuallyHideTip:function manuallyHideTip(t,e,n,i){var r=this._tooltipContent;this._alwaysShowContent||r.hideLater(this._tooltipModel.get("hideDelay")),this._lastX=this._lastY=null,i.from!==this.uid&&this._hide(Au(i,n));},_manuallyAxisShowTip:function _manuallyAxisShowTip(t,e,n,i){var r=i.seriesIndex,o=i.dataIndex,a=e.getComponent("axisPointer").coordSysAxesInfo;if(null!=r&&null!=o&&null!=a){var s=e.getSeriesByIndex(r);if(s){var l=s.getData(),t=Cu([l.getItemModel(o),s,(s.coordinateSystem||{}).model,t]);if("axis"===t.get("trigger"))return n.dispatchAction({type:"updateAxisPointer",seriesIndex:r,dataIndex:o,position:i.position}),!0;}}},_tryShow:function _tryShow(t,e){var n=t.target,i=this._tooltipModel;if(i){this._lastX=t.offsetX,this._lastY=t.offsetY;var r=t.dataByCoordSys;r&&r.length?this._showAxisTooltip(r,t):n&&null!=n.dataIndex?(this._lastDataByCoordSys=null,this._showSeriesItemTooltip(t,n,e)):n&&n.tooltip?(this._lastDataByCoordSys=null,this._showComponentItemTooltip(t,n,e)):(this._lastDataByCoordSys=null,this._hide(e));}},_showOrMove:function _showOrMove(t,e){var n=t.get("showDelay");e=y(e,this),clearTimeout(this._showTimout),n>0?this._showTimout=setTimeout(e,n):e();},_showAxisTooltip:function _showAxisTooltip(t,e){var n=this._ecModel,i=this._tooltipModel,r=[e.offsetX,e.offsetY],o=[],a=[],s=Cu([e.tooltipOption,i]);sx(t,function(t){sx(t.dataByAxis,function(t){var e=n.getComponent(t.axisDim+"Axis",t.axisIndex),i=t.value,r=[];if(e&&null!=i){var s=vu(i,e.axis,n,t.seriesDataIndices,t.valueLabelOpt);f(t.seriesDataIndices,function(o){var l=n.getSeriesByIndex(o.seriesIndex),h=o.dataIndexInside,u=l&&l.getDataParams(h);u.axisDim=t.axisDim,u.axisIndex=t.axisIndex,u.axisType=t.axisType,u.axisId=t.axisId,u.axisValue=rl(e.axis,i),u.axisValueLabel=s,u&&(a.push(u),r.push(l.formatTooltip(h,!0)));});var l=s;o.push((l?ji(l)+"<br />":"")+r.join("<br />"));}});},this),o.reverse(),o=o.join("<br /><br />");var l=e.position;this._showOrMove(s,function(){this._updateContentNotChangedOnAxis(t)?this._updatePosition(s,l,r[0],r[1],this._tooltipContent,a):this._showTooltipContent(s,o,a,Math.random(),r[0],r[1],l);});},_showSeriesItemTooltip:function _showSeriesItemTooltip(t,e,n){var i=this._ecModel,r=e.seriesIndex,o=i.getSeriesByIndex(r),a=e.dataModel||o,s=e.dataIndex,l=e.dataType,h=a.getData(),u=Cu([h.getItemModel(s),a,o&&(o.coordinateSystem||{}).model,this._tooltipModel]),c=u.get("trigger");if(null==c||"item"===c){var d=a.getDataParams(s,l),f=a.formatTooltip(s,!1,l),g="item_"+a.name+"_"+s;this._showOrMove(u,function(){this._showTooltipContent(u,f,d,g,t.offsetX,t.offsetY,t.position,t.target);}),n({type:"showTip",dataIndexInside:s,dataIndex:h.getRawIndex(s),seriesIndex:r,from:this.uid});}},_showComponentItemTooltip:function _showComponentItemTooltip(t,e,n){var i=e.tooltip;if("string"==typeof i){var r=i;i={content:r,formatter:r};}var o=new Ho(i,this._tooltipModel,this._ecModel),a=o.get("content"),s=Math.random();this._showOrMove(o,function(){this._showTooltipContent(o,a,o.get("formatterParams")||{},s,t.offsetX,t.offsetY,t.position,e);}),n({type:"showTip",from:this.uid});},_showTooltipContent:function _showTooltipContent(t,e,n,i,r,o,a,s){if(this._ticket="",t.get("showContent")&&t.get("show")){var l=this._tooltipContent,h=t.get("formatter");a=a||t.get("position");var u=e;if(h&&"string"==typeof h)u=Ui(h,n,!0);else if("function"==typeof h){var c=ax(function(e,i){e===this._ticket&&(l.setContent(i),this._updatePosition(t,a,r,o,l,n,s));},this);this._ticket=i,u=h(n,i,c);}l.setContent(u),l.show(t),this._updatePosition(t,a,r,o,l,n,s);}},_updatePosition:function _updatePosition(t,e,n,i,r,o,a){var s=this._api.getWidth(),l=this._api.getHeight();e=e||t.get("position");var h=r.getSize(),u=t.get("align"),c=t.get("verticalAlign"),d=a&&a.getBoundingRect().clone();if(a&&d.applyTransform(a.transform),"function"==typeof e&&(e=e([n,i],o,r.el,d,{viewSize:[s,l],contentSize:h.slice()})),_(e))n=lx(e[0],s),i=lx(e[1],l);else if(S(e)){e.width=h[0],e.height=h[1];var f=la(e,{width:s,height:l});n=f.x,i=f.y,u=null,c=null;}else if("string"==typeof e&&a){var g=Lu(e,d,h);n=g[0],i=g[1];}else{var g=Du(n,i,r.el,s,l,u?null:20,c?null:20);n=g[0],i=g[1];}if(u&&(n-=Ou(u)?h[0]/2:"right"===u?h[0]:0),c&&(i-=Ou(c)?h[1]/2:"bottom"===c?h[1]:0),t.get("confine")){var g=ku(n,i,r.el,s,l);n=g[0],i=g[1];}r.moveTo(n,i);},_updateContentNotChangedOnAxis:function _updateContentNotChangedOnAxis(t){var e=this._lastDataByCoordSys,n=!!e&&e.length===t.length;return n&&sx(e,function(e,i){var r=e.dataByAxis||{},o=t[i]||{},a=o.dataByAxis||[];n&=r.length===a.length,n&&sx(r,function(t,e){var i=a[e]||{},r=t.seriesDataIndices||[],o=i.seriesDataIndices||[];n&=t.value===i.value&&t.axisType===i.axisType&&t.axisId===i.axisId&&r.length===o.length,n&&sx(r,function(t,e){var i=o[e];n&=t.seriesIndex===i.seriesIndex&&t.dataIndex===i.dataIndex;});});}),this._lastDataByCoordSys=t,!!n;},_hide:function _hide(t){this._lastDataByCoordSys=null,t({type:"hideTip",from:this.uid});},dispose:function dispose(t,e){Uu.node||(this._tooltipContent.hide(),au("itemTooltip",e));}}),ms({type:"showTip",event:"showTip",update:"tooltip:manuallyShowTip"},function(){}),ms({type:"hideTip",event:"hideTip",update:"tooltip:manuallyHideTip"},function(){});var ux=Yi,cx=ji,dx=Ss({type:"marker",dependencies:["series","grid","polar","geo"],init:function init(t,e,n,i){this.mergeDefaultAndTheme(t,n),this.mergeOption(t,n,i.createdBySelf,!0);},isAnimationEnabled:function isAnimationEnabled(){if(Uu.node)return!1;var t=this.__hostSeries;return this.getShallow("animation")&&t&&t.isAnimationEnabled();},mergeOption:function mergeOption(t,e,n,i){var r=this.constructor,o=this.mainType+"Model";n||e.eachSeries(function(t){var n=t.get(this.mainType),s=t[o];return n&&n.data?(s?s.mergeOption(n,e,!0):(i&&zu(n),f(n.data,function(t){t instanceof Array?(zu(t[0]),zu(t[1])):zu(t);}),s=new r(n,this,e),a(s,{mainType:this.mainType,seriesIndex:t.seriesIndex,name:t.name,createdBySelf:!0}),s.__hostSeries=t),void(t[o]=s)):void(t[o]=null);},this);},formatTooltip:function formatTooltip(t){var e=this.getData(),n=this.getRawValue(t),i=_(n)?g(n,ux).join(", "):ux(n),r=e.getName(t),o=cx(this.name);return(null!=n||r)&&(o+="<br />"),r&&(o+=cx(r),null!=n&&(o+=" : ")),null!=n&&(o+=cx(i)),o;},getData:function getData(){return this._data;},setData:function setData(t){this._data=t;}});c(dx,Yg),dx.extend({type:"markPoint",defaultOption:{zlevel:0,z:5,symbol:"pin",symbolSize:50,tooltip:{trigger:"item"},label:{normal:{show:!0,position:"inside"},emphasis:{show:!0}},itemStyle:{normal:{borderWidth:2}}}});var fx=h,gx=x,px={min:gx(Nu,"min"),max:gx(Nu,"max"),average:gx(Nu,"average")},vx=Ms({type:"marker",init:function init(){this.markerGroupMap=E();},render:function render(t,e,n){var i=this.markerGroupMap;i.each(function(t){t.__keep=!1;});var r=this.type+"Model";e.eachSeries(function(t){var i=t[r];i&&this.renderSeries(t,i,e,n);},this),i.each(function(t){!t.__keep&&this.group.remove(t.group);},this);},renderSeries:function renderSeries(){}});vx.extend({type:"markPoint",updateLayout:function updateLayout(t,e,n){e.eachSeries(function(t){var e=t.markPointModel;e&&(Xu(e.getData(),t,n),this.markerGroupMap.get(t.id).updateLayout(e));},this);},renderSeries:function renderSeries(t,e,n,i){var r=t.coordinateSystem,o=t.id,a=t.getData(),s=this.markerGroupMap,l=s.get(o)||s.set(o,new ph()),h=qu(r,t,e);e.setData(h),Xu(e.getData(),t,i),h.each(function(t){var n=h.getItemModel(t),i=n.getShallow("symbolSize");"function"==typeof i&&(i=i(e.getRawValue(t),e.getDataParams(t))),h.setItemVisual(t,{symbolSize:i,color:n.get("itemStyle.normal.color")||a.getVisual("color"),symbol:n.getShallow("symbol")});}),l.updateData(h),this.group.add(l.group),h.eachItemGraphicEl(function(t){t.traverse(function(t){t.dataModel=e;});}),l.__keep=!0,l.group.silent=e.get("silent")||t.get("silent");}}),gs(function(t){t.markPoint=t.markPoint||{};}),t.version=Hp,t.dependencies=Wp,t.PRIORITY=$p,t.init=ss,t.connect=ls,t.disConnect=hs,t.disconnect=yv,t.dispose=us,t.getInstanceByDom=cs,t.getInstanceById=ds,t.registerTheme=fs,t.registerPreprocessor=gs,t.registerProcessor=ps,t.registerPostUpdate=vs,t.registerAction=ms,t.registerCoordinateSystem=ys,t.getCoordinateSystemDimensions=xs,t.registerLayout=_s,t.registerVisual=ws,t.registerLoading=bs,t.extendComponentModel=Ss,t.extendComponentView=Ms,t.extendSeriesModel=Ts,t.extendChartView=Is,t.setCanvasCreator=Cs,t.registerMap=As,t.getMap=Ds,t.dataTool=xv,t.zrender=qd,t.graphic=Rg,t.number=Ud,t.format=nf,t.throttle=Fa,t.helper=fm,t.matrix=Mc,t.vector=mc,t.color=Hc,t.util=xm,t.List=Tv,t.Model=Ho,t.Axis=vm,t.env=Uu,t.parseGeoJson=ym;});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(100)))

/***/ }),
/* 100 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(7);
var meta = __webpack_require__(39).onFreeze;

__webpack_require__(31)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);