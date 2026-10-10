var Jo = { exports: {} }, vs = {}, ea = { exports: {} }, pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pd;
function Fp() {
  if (Pd) return pe;
  Pd = 1;
  var n = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), p = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), v = Symbol.iterator;
  function E(j) {
    return j === null || typeof j != "object" ? null : (j = v && j[v] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var I = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, $ = Object.assign, R = {};
  function L(j, O, ce) {
    this.props = j, this.context = O, this.refs = R, this.updater = ce || I;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(j, O) {
    if (typeof j != "object" && typeof j != "function" && j != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, j, O, "setState");
  }, L.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function F() {
  }
  F.prototype = L.prototype;
  function X(j, O, ce) {
    this.props = j, this.context = O, this.refs = R, this.updater = ce || I;
  }
  var _ = X.prototype = new F();
  _.constructor = X, $(_, L.prototype), _.isPureReactComponent = !0;
  var U = Array.isArray, re = Object.prototype.hasOwnProperty, ne = { current: null }, W = { key: !0, ref: !0, __self: !0, __source: !0 };
  function te(j, O, ce) {
    var de, me = {}, ae = null, ke = null;
    if (O != null) for (de in O.ref !== void 0 && (ke = O.ref), O.key !== void 0 && (ae = "" + O.key), O) re.call(O, de) && !W.hasOwnProperty(de) && (me[de] = O[de]);
    var ue = arguments.length - 2;
    if (ue === 1) me.children = ce;
    else if (1 < ue) {
      for (var Ne = Array(ue), Ge = 0; Ge < ue; Ge++) Ne[Ge] = arguments[Ge + 2];
      me.children = Ne;
    }
    if (j && j.defaultProps) for (de in ue = j.defaultProps, ue) me[de] === void 0 && (me[de] = ue[de]);
    return { $$typeof: n, type: j, key: ae, ref: ke, props: me, _owner: ne.current };
  }
  function we(j, O) {
    return { $$typeof: n, type: j.type, key: O, ref: j.ref, props: j.props, _owner: j._owner };
  }
  function Y(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function q(j) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(ce) {
      return O[ce];
    });
  }
  var he = /\/+/g;
  function ve(j, O) {
    return typeof j == "object" && j !== null && j.key != null ? q("" + j.key) : O.toString(36);
  }
  function be(j, O, ce, de, me) {
    var ae = typeof j;
    (ae === "undefined" || ae === "boolean") && (j = null);
    var ke = !1;
    if (j === null) ke = !0;
    else switch (ae) {
      case "string":
      case "number":
        ke = !0;
        break;
      case "object":
        switch (j.$$typeof) {
          case n:
          case s:
            ke = !0;
        }
    }
    if (ke) return ke = j, me = me(ke), j = de === "" ? "." + ve(ke, 0) : de, U(me) ? (ce = "", j != null && (ce = j.replace(he, "$&/") + "/"), be(me, O, ce, "", function(Ge) {
      return Ge;
    })) : me != null && (Y(me) && (me = we(me, ce + (!me.key || ke && ke.key === me.key ? "" : ("" + me.key).replace(he, "$&/") + "/") + j)), O.push(me)), 1;
    if (ke = 0, de = de === "" ? "." : de + ":", U(j)) for (var ue = 0; ue < j.length; ue++) {
      ae = j[ue];
      var Ne = de + ve(ae, ue);
      ke += be(ae, O, ce, Ne, me);
    }
    else if (Ne = E(j), typeof Ne == "function") for (j = Ne.call(j), ue = 0; !(ae = j.next()).done; ) ae = ae.value, Ne = de + ve(ae, ue++), ke += be(ae, O, ce, Ne, me);
    else if (ae === "object") throw O = String(j), Error("Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead.");
    return ke;
  }
  function at(j, O, ce) {
    if (j == null) return j;
    var de = [], me = 0;
    return be(j, de, "", "", function(ae) {
      return O.call(ce, ae, me++);
    }), de;
  }
  function Ze(j) {
    if (j._status === -1) {
      var O = j._result;
      O = O(), O.then(function(ce) {
        (j._status === 0 || j._status === -1) && (j._status = 1, j._result = ce);
      }, function(ce) {
        (j._status === 0 || j._status === -1) && (j._status = 2, j._result = ce);
      }), j._status === -1 && (j._status = 0, j._result = O);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var Ee = { current: null }, Z = { transition: null }, le = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: Z, ReactCurrentOwner: ne };
  function V() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return pe.Children = { map: at, forEach: function(j, O, ce) {
    at(j, function() {
      O.apply(this, arguments);
    }, ce);
  }, count: function(j) {
    var O = 0;
    return at(j, function() {
      O++;
    }), O;
  }, toArray: function(j) {
    return at(j, function(O) {
      return O;
    }) || [];
  }, only: function(j) {
    if (!Y(j)) throw Error("React.Children.only expected to receive a single React element child.");
    return j;
  } }, pe.Component = L, pe.Fragment = l, pe.Profiler = d, pe.PureComponent = X, pe.StrictMode = a, pe.Suspense = g, pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = le, pe.act = V, pe.cloneElement = function(j, O, ce) {
    if (j == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + j + ".");
    var de = $({}, j.props), me = j.key, ae = j.ref, ke = j._owner;
    if (O != null) {
      if (O.ref !== void 0 && (ae = O.ref, ke = ne.current), O.key !== void 0 && (me = "" + O.key), j.type && j.type.defaultProps) var ue = j.type.defaultProps;
      for (Ne in O) re.call(O, Ne) && !W.hasOwnProperty(Ne) && (de[Ne] = O[Ne] === void 0 && ue !== void 0 ? ue[Ne] : O[Ne]);
    }
    var Ne = arguments.length - 2;
    if (Ne === 1) de.children = ce;
    else if (1 < Ne) {
      ue = Array(Ne);
      for (var Ge = 0; Ge < Ne; Ge++) ue[Ge] = arguments[Ge + 2];
      de.children = ue;
    }
    return { $$typeof: n, type: j.type, key: me, ref: ae, props: de, _owner: ke };
  }, pe.createContext = function(j) {
    return j = { $$typeof: p, _currentValue: j, _currentValue2: j, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, j.Provider = { $$typeof: f, _context: j }, j.Consumer = j;
  }, pe.createElement = te, pe.createFactory = function(j) {
    var O = te.bind(null, j);
    return O.type = j, O;
  }, pe.createRef = function() {
    return { current: null };
  }, pe.forwardRef = function(j) {
    return { $$typeof: x, render: j };
  }, pe.isValidElement = Y, pe.lazy = function(j) {
    return { $$typeof: S, _payload: { _status: -1, _result: j }, _init: Ze };
  }, pe.memo = function(j, O) {
    return { $$typeof: b, type: j, compare: O === void 0 ? null : O };
  }, pe.startTransition = function(j) {
    var O = Z.transition;
    Z.transition = {};
    try {
      j();
    } finally {
      Z.transition = O;
    }
  }, pe.unstable_act = V, pe.useCallback = function(j, O) {
    return Ee.current.useCallback(j, O);
  }, pe.useContext = function(j) {
    return Ee.current.useContext(j);
  }, pe.useDebugValue = function() {
  }, pe.useDeferredValue = function(j) {
    return Ee.current.useDeferredValue(j);
  }, pe.useEffect = function(j, O) {
    return Ee.current.useEffect(j, O);
  }, pe.useId = function() {
    return Ee.current.useId();
  }, pe.useImperativeHandle = function(j, O, ce) {
    return Ee.current.useImperativeHandle(j, O, ce);
  }, pe.useInsertionEffect = function(j, O) {
    return Ee.current.useInsertionEffect(j, O);
  }, pe.useLayoutEffect = function(j, O) {
    return Ee.current.useLayoutEffect(j, O);
  }, pe.useMemo = function(j, O) {
    return Ee.current.useMemo(j, O);
  }, pe.useReducer = function(j, O, ce) {
    return Ee.current.useReducer(j, O, ce);
  }, pe.useRef = function(j) {
    return Ee.current.useRef(j);
  }, pe.useState = function(j) {
    return Ee.current.useState(j);
  }, pe.useSyncExternalStore = function(j, O, ce) {
    return Ee.current.useSyncExternalStore(j, O, ce);
  }, pe.useTransition = function() {
    return Ee.current.useTransition();
  }, pe.version = "18.3.1", pe;
}
var $d;
function Ea() {
  return $d || ($d = 1, ea.exports = Fp()), ea.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Md;
function zp() {
  if (Md) return vs;
  Md = 1;
  var n = Ea(), s = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, d = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(x, g, b) {
    var S, v = {}, E = null, I = null;
    b !== void 0 && (E = "" + b), g.key !== void 0 && (E = "" + g.key), g.ref !== void 0 && (I = g.ref);
    for (S in g) a.call(g, S) && !f.hasOwnProperty(S) && (v[S] = g[S]);
    if (x && x.defaultProps) for (S in g = x.defaultProps, g) v[S] === void 0 && (v[S] = g[S]);
    return { $$typeof: s, type: x, key: E, ref: I, props: v, _owner: d.current };
  }
  return vs.Fragment = l, vs.jsx = p, vs.jsxs = p, vs;
}
var Dd;
function Xp() {
  return Dd || (Dd = 1, Jo.exports = zp()), Jo.exports;
}
var i = Xp(), z = Ea(), Wi = {}, ta = { exports: {} }, mt = {}, na = { exports: {} }, ra = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ad;
function Zp() {
  return Ad || (Ad = 1, (function(n) {
    function s(Z, le) {
      var V = Z.length;
      Z.push(le);
      e: for (; 0 < V; ) {
        var j = V - 1 >>> 1, O = Z[j];
        if (0 < d(O, le)) Z[j] = le, Z[V] = O, V = j;
        else break e;
      }
    }
    function l(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function a(Z) {
      if (Z.length === 0) return null;
      var le = Z[0], V = Z.pop();
      if (V !== le) {
        Z[0] = V;
        e: for (var j = 0, O = Z.length, ce = O >>> 1; j < ce; ) {
          var de = 2 * (j + 1) - 1, me = Z[de], ae = de + 1, ke = Z[ae];
          if (0 > d(me, V)) ae < O && 0 > d(ke, me) ? (Z[j] = ke, Z[ae] = V, j = ae) : (Z[j] = me, Z[de] = V, j = de);
          else if (ae < O && 0 > d(ke, V)) Z[j] = ke, Z[ae] = V, j = ae;
          else break e;
        }
      }
      return le;
    }
    function d(Z, le) {
      var V = Z.sortIndex - le.sortIndex;
      return V !== 0 ? V : Z.id - le.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var p = Date, x = p.now();
      n.unstable_now = function() {
        return p.now() - x;
      };
    }
    var g = [], b = [], S = 1, v = null, E = 3, I = !1, $ = !1, R = !1, L = typeof setTimeout == "function" ? setTimeout : null, F = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function _(Z) {
      for (var le = l(b); le !== null; ) {
        if (le.callback === null) a(b);
        else if (le.startTime <= Z) a(b), le.sortIndex = le.expirationTime, s(g, le);
        else break;
        le = l(b);
      }
    }
    function U(Z) {
      if (R = !1, _(Z), !$) if (l(g) !== null) $ = !0, Ze(re);
      else {
        var le = l(b);
        le !== null && Ee(U, le.startTime - Z);
      }
    }
    function re(Z, le) {
      $ = !1, R && (R = !1, F(te), te = -1), I = !0;
      var V = E;
      try {
        for (_(le), v = l(g); v !== null && (!(v.expirationTime > le) || Z && !q()); ) {
          var j = v.callback;
          if (typeof j == "function") {
            v.callback = null, E = v.priorityLevel;
            var O = j(v.expirationTime <= le);
            le = n.unstable_now(), typeof O == "function" ? v.callback = O : v === l(g) && a(g), _(le);
          } else a(g);
          v = l(g);
        }
        if (v !== null) var ce = !0;
        else {
          var de = l(b);
          de !== null && Ee(U, de.startTime - le), ce = !1;
        }
        return ce;
      } finally {
        v = null, E = V, I = !1;
      }
    }
    var ne = !1, W = null, te = -1, we = 5, Y = -1;
    function q() {
      return !(n.unstable_now() - Y < we);
    }
    function he() {
      if (W !== null) {
        var Z = n.unstable_now();
        Y = Z;
        var le = !0;
        try {
          le = W(!0, Z);
        } finally {
          le ? ve() : (ne = !1, W = null);
        }
      } else ne = !1;
    }
    var ve;
    if (typeof X == "function") ve = function() {
      X(he);
    };
    else if (typeof MessageChannel < "u") {
      var be = new MessageChannel(), at = be.port2;
      be.port1.onmessage = he, ve = function() {
        at.postMessage(null);
      };
    } else ve = function() {
      L(he, 0);
    };
    function Ze(Z) {
      W = Z, ne || (ne = !0, ve());
    }
    function Ee(Z, le) {
      te = L(function() {
        Z(n.unstable_now());
      }, le);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, n.unstable_continueExecution = function() {
      $ || I || ($ = !0, Ze(re));
    }, n.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : we = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return E;
    }, n.unstable_getFirstCallbackNode = function() {
      return l(g);
    }, n.unstable_next = function(Z) {
      switch (E) {
        case 1:
        case 2:
        case 3:
          var le = 3;
          break;
        default:
          le = E;
      }
      var V = E;
      E = le;
      try {
        return Z();
      } finally {
        E = V;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(Z, le) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var V = E;
      E = Z;
      try {
        return le();
      } finally {
        E = V;
      }
    }, n.unstable_scheduleCallback = function(Z, le, V) {
      var j = n.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? j + V : j) : V = j, Z) {
        case 1:
          var O = -1;
          break;
        case 2:
          O = 250;
          break;
        case 5:
          O = 1073741823;
          break;
        case 4:
          O = 1e4;
          break;
        default:
          O = 5e3;
      }
      return O = V + O, Z = { id: S++, callback: le, priorityLevel: Z, startTime: V, expirationTime: O, sortIndex: -1 }, V > j ? (Z.sortIndex = V, s(b, Z), l(g) === null && Z === l(b) && (R ? (F(te), te = -1) : R = !0, Ee(U, V - j))) : (Z.sortIndex = O, s(g, Z), $ || I || ($ = !0, Ze(re))), Z;
    }, n.unstable_shouldYield = q, n.unstable_wrapCallback = function(Z) {
      var le = E;
      return function() {
        var V = E;
        E = le;
        try {
          return Z.apply(this, arguments);
        } finally {
          E = V;
        }
      };
    };
  })(ra)), ra;
}
var Fd;
function Wp() {
  return Fd || (Fd = 1, na.exports = Zp()), na.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zd;
function Bp() {
  if (zd) return mt;
  zd = 1;
  var n = Ea(), s = Wp();
  function l(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), d = {};
  function f(e, t) {
    p(e, t), p(e + "Capture", t);
  }
  function p(e, t) {
    for (d[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var x = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), g = Object.prototype.hasOwnProperty, b = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, S = {}, v = {};
  function E(e) {
    return g.call(v, e) ? !0 : g.call(S, e) ? !1 : b.test(e) ? v[e] = !0 : (S[e] = !0, !1);
  }
  function I(e, t, r, o) {
    if (r !== null && r.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function $(e, t, r, o) {
    if (t === null || typeof t > "u" || I(e, t, r, o)) return !0;
    if (o) return !1;
    if (r !== null) switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function R(e, t, r, o, c, u, h) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = h;
  }
  var L = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    L[e] = new R(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    L[t] = new R(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    L[e] = new R(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    L[e] = new R(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    L[e] = new R(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    L[e] = new R(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    L[e] = new R(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    L[e] = new R(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    L[e] = new R(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var F = /[\-:]([a-z])/g;
  function X(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      F,
      X
    );
    L[t] = new R(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(F, X);
    L[t] = new R(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(F, X);
    L[t] = new R(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    L[e] = new R(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), L.xlinkHref = new R("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    L[e] = new R(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function _(e, t, r, o) {
    var c = L.hasOwnProperty(t) ? L[t] : null;
    (c !== null ? c.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && ($(t, r, c, o) && (r = null), o || c === null ? E(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : c.mustUseProperty ? e[c.propertyName] = r === null ? c.type === 3 ? !1 : "" : r : (t = c.attributeName, o = c.attributeNamespace, r === null ? e.removeAttribute(t) : (c = c.type, r = c === 3 || c === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
  }
  var U = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, re = Symbol.for("react.element"), ne = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), we = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), q = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), be = Symbol.for("react.suspense_list"), at = Symbol.for("react.memo"), Ze = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), Z = Symbol.iterator;
  function le(e) {
    return e === null || typeof e != "object" ? null : (e = Z && e[Z] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var V = Object.assign, j;
  function O(e) {
    if (j === void 0) try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      j = t && t[1] || "";
    }
    return `
` + j + e;
  }
  var ce = !1;
  function de(e, t) {
    if (!e || ce) return "";
    ce = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (T) {
          var o = T;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (T) {
          o = T;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (T) {
          o = T;
        }
        e();
      }
    } catch (T) {
      if (T && o && typeof T.stack == "string") {
        for (var c = T.stack.split(`
`), u = o.stack.split(`
`), h = c.length - 1, y = u.length - 1; 1 <= h && 0 <= y && c[h] !== u[y]; ) y--;
        for (; 1 <= h && 0 <= y; h--, y--) if (c[h] !== u[y]) {
          if (h !== 1 || y !== 1)
            do
              if (h--, y--, 0 > y || c[h] !== u[y]) {
                var w = `
` + c[h].replace(" at new ", " at ");
                return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
              }
            while (1 <= h && 0 <= y);
          break;
        }
      }
    } finally {
      ce = !1, Error.prepareStackTrace = r;
    }
    return (e = e ? e.displayName || e.name : "") ? O(e) : "";
  }
  function me(e) {
    switch (e.tag) {
      case 5:
        return O(e.type);
      case 16:
        return O("Lazy");
      case 13:
        return O("Suspense");
      case 19:
        return O("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = de(e.type, !1), e;
      case 11:
        return e = de(e.type.render, !1), e;
      case 1:
        return e = de(e.type, !0), e;
      default:
        return "";
    }
  }
  function ae(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case W:
        return "Fragment";
      case ne:
        return "Portal";
      case we:
        return "Profiler";
      case te:
        return "StrictMode";
      case ve:
        return "Suspense";
      case be:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case q:
        return (e.displayName || "Context") + ".Consumer";
      case Y:
        return (e._context.displayName || "Context") + ".Provider";
      case he:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case at:
        return t = e.displayName || null, t !== null ? t : ae(e.type) || "Memo";
      case Ze:
        t = e._payload, e = e._init;
        try {
          return ae(e(t));
        } catch {
        }
    }
    return null;
  }
  function ke(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ae(t);
      case 8:
        return t === te ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ue(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Ne(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ge(e) {
    var t = Ne(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var c = r.get, u = r.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(h) {
        o = "" + h, u.call(this, h);
      } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(h) {
        o = "" + h;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function B(e) {
    e._valueTracker || (e._valueTracker = Ge(e));
  }
  function Ce(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), o = "";
    return e && (o = Ne(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
  }
  function ge(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ct(e, t) {
    var r = t.checked;
    return V({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function rn(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    r = ue(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function _n(e, t) {
    t = t.checked, t != null && _(e, "checked", t, !1);
  }
  function On(e, t) {
    _n(e, t);
    var r = ue(t.value), o = t.type;
    if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Pn(e, t.type, r) : t.hasOwnProperty("defaultValue") && Pn(e, t.type, ue(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Pr(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function Pn(e, t, r) {
    (t !== "number" || ge(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var sn = Array.isArray;
  function Ut(e, t, r, o) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < r.length; c++) t["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++) c = t.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && o && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + ue(r), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, o && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jn(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
    return V({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function $r(e, t) {
    var r = t.value;
    if (r == null) {
      if (r = t.children, t = t.defaultValue, r != null) {
        if (t != null) throw Error(l(92));
        if (sn(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        t = r;
      }
      t == null && (t = ""), r = t;
    }
    e._wrapperState = { initialValue: ue(r) };
  }
  function $n(e, t) {
    var r = ue(t.value), o = ue(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
  }
  function Mr(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Ua(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function cl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Ua(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var $s, Ya = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, o, c);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for ($s = $s || document.createElement("div"), $s.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = $s.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Dr(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ar = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Wh = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ar).forEach(function(e) {
    Wh.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ar[t] = Ar[e];
    });
  });
  function Va(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Ar.hasOwnProperty(e) && Ar[e] ? ("" + t).trim() : t + "px";
  }
  function Qa(e, t) {
    e = e.style;
    for (var r in t) if (t.hasOwnProperty(r)) {
      var o = r.indexOf("--") === 0, c = Va(r, t[r], o);
      r === "float" && (r = "cssFloat"), o ? e.setProperty(r, c) : e[r] = c;
    }
  }
  var Bh = V({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ul(e, t) {
    if (t) {
      if (Bh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(l(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(l(62));
    }
  }
  function dl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var fl = null;
  function hl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var pl = null, er = null, tr = null;
  function Ka(e) {
    if (e = ls(e)) {
      if (typeof pl != "function") throw Error(l(280));
      var t = e.stateNode;
      t && (t = si(t), pl(e.stateNode, e.type, t));
    }
  }
  function Ga(e) {
    er ? tr ? tr.push(e) : tr = [e] : er = e;
  }
  function Ja() {
    if (er) {
      var e = er, t = tr;
      if (tr = er = null, Ka(e), t) for (e = 0; e < t.length; e++) Ka(t[e]);
    }
  }
  function ec(e, t) {
    return e(t);
  }
  function tc() {
  }
  var ml = !1;
  function nc(e, t, r) {
    if (ml) return e(t, r);
    ml = !0;
    try {
      return ec(e, t, r);
    } finally {
      ml = !1, (er !== null || tr !== null) && (tc(), Ja());
    }
  }
  function Fr(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var o = si(r);
    if (o === null) return null;
    r = o[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(l(231, t, typeof r));
    return r;
  }
  var gl = !1;
  if (x) try {
    var zr = {};
    Object.defineProperty(zr, "passive", { get: function() {
      gl = !0;
    } }), window.addEventListener("test", zr, zr), window.removeEventListener("test", zr, zr);
  } catch {
    gl = !1;
  }
  function qh(e, t, r, o, c, u, h, y, w) {
    var T = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, T);
    } catch (M) {
      this.onError(M);
    }
  }
  var Xr = !1, Ms = null, Ds = !1, yl = null, Hh = { onError: function(e) {
    Xr = !0, Ms = e;
  } };
  function Uh(e, t, r, o, c, u, h, y, w) {
    Xr = !1, Ms = null, qh.apply(Hh, arguments);
  }
  function Yh(e, t, r, o, c, u, h, y, w) {
    if (Uh.apply(this, arguments), Xr) {
      if (Xr) {
        var T = Ms;
        Xr = !1, Ms = null;
      } else throw Error(l(198));
      Ds || (Ds = !0, yl = T);
    }
  }
  function Mn(e) {
    var t = e, r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (r = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function rc(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function sc(e) {
    if (Mn(e) !== e) throw Error(l(188));
  }
  function Vh(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Mn(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var r = e, o = t; ; ) {
      var c = r.return;
      if (c === null) break;
      var u = c.alternate;
      if (u === null) {
        if (o = c.return, o !== null) {
          r = o;
          continue;
        }
        break;
      }
      if (c.child === u.child) {
        for (u = c.child; u; ) {
          if (u === r) return sc(c), e;
          if (u === o) return sc(c), t;
          u = u.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== o.return) r = c, o = u;
      else {
        for (var h = !1, y = c.child; y; ) {
          if (y === r) {
            h = !0, r = c, o = u;
            break;
          }
          if (y === o) {
            h = !0, o = c, r = u;
            break;
          }
          y = y.sibling;
        }
        if (!h) {
          for (y = u.child; y; ) {
            if (y === r) {
              h = !0, r = u, o = c;
              break;
            }
            if (y === o) {
              h = !0, o = u, r = c;
              break;
            }
            y = y.sibling;
          }
          if (!h) throw Error(l(189));
        }
      }
      if (r.alternate !== o) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
    return r.stateNode.current === r ? e : t;
  }
  function ic(e) {
    return e = Vh(e), e !== null ? lc(e) : null;
  }
  function lc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = lc(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var oc = s.unstable_scheduleCallback, ac = s.unstable_cancelCallback, Qh = s.unstable_shouldYield, Kh = s.unstable_requestPaint, ze = s.unstable_now, Gh = s.unstable_getCurrentPriorityLevel, xl = s.unstable_ImmediatePriority, cc = s.unstable_UserBlockingPriority, As = s.unstable_NormalPriority, Jh = s.unstable_LowPriority, uc = s.unstable_IdlePriority, Fs = null, zt = null;
  function e0(e) {
    if (zt && typeof zt.onCommitFiberRoot == "function") try {
      zt.onCommitFiberRoot(Fs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Lt = Math.clz32 ? Math.clz32 : r0, t0 = Math.log, n0 = Math.LN2;
  function r0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (t0(e) / n0 | 0) | 0;
  }
  var zs = 64, Xs = 4194304;
  function Zr(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Zs(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var o = 0, c = e.suspendedLanes, u = e.pingedLanes, h = r & 268435455;
    if (h !== 0) {
      var y = h & ~c;
      y !== 0 ? o = Zr(y) : (u &= h, u !== 0 && (o = Zr(u)));
    } else h = r & ~c, h !== 0 ? o = Zr(h) : u !== 0 && (o = Zr(u));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, u = t & -t, c >= u || c === 16 && (u & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - Lt(t), c = 1 << r, o |= e[r], t &= ~c;
    return o;
  }
  function s0(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function i0(e, t) {
    for (var r = e.suspendedLanes, o = e.pingedLanes, c = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var h = 31 - Lt(u), y = 1 << h, w = c[h];
      w === -1 ? ((y & r) === 0 || (y & o) !== 0) && (c[h] = s0(y, t)) : w <= t && (e.expiredLanes |= y), u &= ~y;
    }
  }
  function wl(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function dc() {
    var e = zs;
    return zs <<= 1, (zs & 4194240) === 0 && (zs = 64), e;
  }
  function kl(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function Wr(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Lt(t), e[t] = r;
  }
  function l0(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var c = 31 - Lt(r), u = 1 << c;
      t[c] = 0, o[c] = -1, e[c] = -1, r &= ~u;
    }
  }
  function vl(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var o = 31 - Lt(r), c = 1 << o;
      c & t | e[o] & t && (e[o] |= t), r &= ~c;
    }
  }
  var Se = 0;
  function fc(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var hc, jl, pc, mc, gc, Sl = !1, Ws = [], ln = null, on = null, an = null, Br = /* @__PURE__ */ new Map(), qr = /* @__PURE__ */ new Map(), cn = [], o0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function yc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ln = null;
        break;
      case "dragenter":
      case "dragleave":
        on = null;
        break;
      case "mouseover":
      case "mouseout":
        an = null;
        break;
      case "pointerover":
      case "pointerout":
        Br.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        qr.delete(t.pointerId);
    }
  }
  function Hr(e, t, r, o, c, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: u, targetContainers: [c] }, t !== null && (t = ls(t), t !== null && jl(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function a0(e, t, r, o, c) {
    switch (t) {
      case "focusin":
        return ln = Hr(ln, e, t, r, o, c), !0;
      case "dragenter":
        return on = Hr(on, e, t, r, o, c), !0;
      case "mouseover":
        return an = Hr(an, e, t, r, o, c), !0;
      case "pointerover":
        var u = c.pointerId;
        return Br.set(u, Hr(Br.get(u) || null, e, t, r, o, c)), !0;
      case "gotpointercapture":
        return u = c.pointerId, qr.set(u, Hr(qr.get(u) || null, e, t, r, o, c)), !0;
    }
    return !1;
  }
  function xc(e) {
    var t = Dn(e.target);
    if (t !== null) {
      var r = Mn(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = rc(r), t !== null) {
            e.blockedOn = t, gc(e.priority, function() {
              pc(r);
            });
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Bs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = Nl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var o = new r.constructor(r.type, r);
        fl = o, r.target.dispatchEvent(o), fl = null;
      } else return t = ls(r), t !== null && jl(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function wc(e, t, r) {
    Bs(e) && r.delete(t);
  }
  function c0() {
    Sl = !1, ln !== null && Bs(ln) && (ln = null), on !== null && Bs(on) && (on = null), an !== null && Bs(an) && (an = null), Br.forEach(wc), qr.forEach(wc);
  }
  function Ur(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Sl || (Sl = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, c0)));
  }
  function Yr(e) {
    function t(c) {
      return Ur(c, e);
    }
    if (0 < Ws.length) {
      Ur(Ws[0], e);
      for (var r = 1; r < Ws.length; r++) {
        var o = Ws[r];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (ln !== null && Ur(ln, e), on !== null && Ur(on, e), an !== null && Ur(an, e), Br.forEach(t), qr.forEach(t), r = 0; r < cn.length; r++) o = cn[r], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < cn.length && (r = cn[0], r.blockedOn === null); ) xc(r), r.blockedOn === null && cn.shift();
  }
  var nr = U.ReactCurrentBatchConfig, qs = !0;
  function u0(e, t, r, o) {
    var c = Se, u = nr.transition;
    nr.transition = null;
    try {
      Se = 1, bl(e, t, r, o);
    } finally {
      Se = c, nr.transition = u;
    }
  }
  function d0(e, t, r, o) {
    var c = Se, u = nr.transition;
    nr.transition = null;
    try {
      Se = 4, bl(e, t, r, o);
    } finally {
      Se = c, nr.transition = u;
    }
  }
  function bl(e, t, r, o) {
    if (qs) {
      var c = Nl(e, t, r, o);
      if (c === null) Zl(e, t, o, Hs, r), yc(e, o);
      else if (a0(c, e, t, r, o)) o.stopPropagation();
      else if (yc(e, o), t & 4 && -1 < o0.indexOf(e)) {
        for (; c !== null; ) {
          var u = ls(c);
          if (u !== null && hc(u), u = Nl(e, t, r, o), u === null && Zl(e, t, o, Hs, r), u === c) break;
          c = u;
        }
        c !== null && o.stopPropagation();
      } else Zl(e, t, o, null, r);
    }
  }
  var Hs = null;
  function Nl(e, t, r, o) {
    if (Hs = null, e = hl(o), e = Dn(e), e !== null) if (t = Mn(e), t === null) e = null;
    else if (r = t.tag, r === 13) {
      if (e = rc(t), e !== null) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Hs = e, null;
  }
  function kc(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Gh()) {
          case xl:
            return 1;
          case cc:
            return 4;
          case As:
          case Jh:
            return 16;
          case uc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var un = null, El = null, Us = null;
  function vc() {
    if (Us) return Us;
    var e, t = El, r = t.length, o, c = "value" in un ? un.value : un.textContent, u = c.length;
    for (e = 0; e < r && t[e] === c[e]; e++) ;
    var h = r - e;
    for (o = 1; o <= h && t[r - o] === c[u - o]; o++) ;
    return Us = c.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Ys(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Vs() {
    return !0;
  }
  function jc() {
    return !1;
  }
  function xt(e) {
    function t(r, o, c, u, h) {
      this._reactName = r, this._targetInst = c, this.type = o, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (r = e[y], this[y] = r ? r(u) : u[y]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Vs : jc, this.isPropagationStopped = jc, this;
    }
    return V(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Vs);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Vs);
    }, persist: function() {
    }, isPersistent: Vs }), t;
  }
  var rr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Cl = xt(rr), Vr = V({}, rr, { view: 0, detail: 0 }), f0 = xt(Vr), Tl, Il, Qr, Qs = V({}, Vr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Rl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Qr && (Qr && e.type === "mousemove" ? (Tl = e.screenX - Qr.screenX, Il = e.screenY - Qr.screenY) : Il = Tl = 0, Qr = e), Tl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Il;
  } }), Sc = xt(Qs), h0 = V({}, Qs, { dataTransfer: 0 }), p0 = xt(h0), m0 = V({}, Vr, { relatedTarget: 0 }), Ll = xt(m0), g0 = V({}, rr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), y0 = xt(g0), x0 = V({}, rr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), w0 = xt(x0), k0 = V({}, rr, { data: 0 }), bc = xt(k0), v0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, j0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, S0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function b0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = S0[e]) ? !!t[e] : !1;
  }
  function Rl() {
    return b0;
  }
  var N0 = V({}, Vr, { key: function(e) {
    if (e.key) {
      var t = v0[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ys(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? j0[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Rl, charCode: function(e) {
    return e.type === "keypress" ? Ys(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ys(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), E0 = xt(N0), C0 = V({}, Qs, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Nc = xt(C0), T0 = V({}, Vr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Rl }), I0 = xt(T0), L0 = V({}, rr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), R0 = xt(L0), _0 = V({}, Qs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), O0 = xt(_0), P0 = [9, 13, 27, 32], _l = x && "CompositionEvent" in window, Kr = null;
  x && "documentMode" in document && (Kr = document.documentMode);
  var $0 = x && "TextEvent" in window && !Kr, Ec = x && (!_l || Kr && 8 < Kr && 11 >= Kr), Cc = " ", Tc = !1;
  function Ic(e, t) {
    switch (e) {
      case "keyup":
        return P0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Lc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var sr = !1;
  function M0(e, t) {
    switch (e) {
      case "compositionend":
        return Lc(t);
      case "keypress":
        return t.which !== 32 ? null : (Tc = !0, Cc);
      case "textInput":
        return e = t.data, e === Cc && Tc ? null : e;
      default:
        return null;
    }
  }
  function D0(e, t) {
    if (sr) return e === "compositionend" || !_l && Ic(e, t) ? (e = vc(), Us = El = un = null, sr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ec && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var A0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Rc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!A0[e.type] : t === "textarea";
  }
  function _c(e, t, r, o) {
    Ga(o), t = ti(t, "onChange"), 0 < t.length && (r = new Cl("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
  }
  var Gr = null, Jr = null;
  function F0(e) {
    Qc(e, 0);
  }
  function Ks(e) {
    var t = cr(e);
    if (Ce(t)) return e;
  }
  function z0(e, t) {
    if (e === "change") return t;
  }
  var Oc = !1;
  if (x) {
    var Ol;
    if (x) {
      var Pl = "oninput" in document;
      if (!Pl) {
        var Pc = document.createElement("div");
        Pc.setAttribute("oninput", "return;"), Pl = typeof Pc.oninput == "function";
      }
      Ol = Pl;
    } else Ol = !1;
    Oc = Ol && (!document.documentMode || 9 < document.documentMode);
  }
  function $c() {
    Gr && (Gr.detachEvent("onpropertychange", Mc), Jr = Gr = null);
  }
  function Mc(e) {
    if (e.propertyName === "value" && Ks(Jr)) {
      var t = [];
      _c(t, Jr, e, hl(e)), nc(F0, t);
    }
  }
  function X0(e, t, r) {
    e === "focusin" ? ($c(), Gr = t, Jr = r, Gr.attachEvent("onpropertychange", Mc)) : e === "focusout" && $c();
  }
  function Z0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ks(Jr);
  }
  function W0(e, t) {
    if (e === "click") return Ks(t);
  }
  function B0(e, t) {
    if (e === "input" || e === "change") return Ks(t);
  }
  function q0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Rt = typeof Object.is == "function" ? Object.is : q0;
  function es(e, t) {
    if (Rt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var r = Object.keys(e), o = Object.keys(t);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var c = r[o];
      if (!g.call(t, c) || !Rt(e[c], t[c])) return !1;
    }
    return !0;
  }
  function Dc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ac(e, t) {
    var r = Dc(e);
    e = 0;
    for (var o; r; ) {
      if (r.nodeType === 3) {
        if (o = e + r.textContent.length, e <= t && o >= t) return { node: r, offset: t - e };
        e = o;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Dc(r);
    }
  }
  function Fc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function zc() {
    for (var e = window, t = ge(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = ge(e.document);
    }
    return t;
  }
  function $l(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function H0(e) {
    var t = zc(), r = e.focusedElem, o = e.selectionRange;
    if (t !== r && r && r.ownerDocument && Fc(r.ownerDocument.documentElement, r)) {
      if (o !== null && $l(r)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var c = r.textContent.length, u = Math.min(o.start, c);
          o = o.end === void 0 ? u : Math.min(o.end, c), !e.extend && u > o && (c = o, o = u, u = c), c = Ac(r, u);
          var h = Ac(
            r,
            o
          );
          c && h && (e.rangeCount !== 1 || e.anchorNode !== c.node || e.anchorOffset !== c.offset || e.focusNode !== h.node || e.focusOffset !== h.offset) && (t = t.createRange(), t.setStart(c.node, c.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(h.node, h.offset)) : (t.setEnd(h.node, h.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var U0 = x && "documentMode" in document && 11 >= document.documentMode, ir = null, Ml = null, ts = null, Dl = !1;
  function Xc(e, t, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Dl || ir == null || ir !== ge(o) || (o = ir, "selectionStart" in o && $l(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ts && es(ts, o) || (ts = o, o = ti(Ml, "onSelect"), 0 < o.length && (t = new Cl("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = ir)));
  }
  function Gs(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var lr = { animationend: Gs("Animation", "AnimationEnd"), animationiteration: Gs("Animation", "AnimationIteration"), animationstart: Gs("Animation", "AnimationStart"), transitionend: Gs("Transition", "TransitionEnd") }, Al = {}, Zc = {};
  x && (Zc = document.createElement("div").style, "AnimationEvent" in window || (delete lr.animationend.animation, delete lr.animationiteration.animation, delete lr.animationstart.animation), "TransitionEvent" in window || delete lr.transitionend.transition);
  function Js(e) {
    if (Al[e]) return Al[e];
    if (!lr[e]) return e;
    var t = lr[e], r;
    for (r in t) if (t.hasOwnProperty(r) && r in Zc) return Al[e] = t[r];
    return e;
  }
  var Wc = Js("animationend"), Bc = Js("animationiteration"), qc = Js("animationstart"), Hc = Js("transitionend"), Uc = /* @__PURE__ */ new Map(), Yc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function dn(e, t) {
    Uc.set(e, t), f(t, [e]);
  }
  for (var Fl = 0; Fl < Yc.length; Fl++) {
    var zl = Yc[Fl], Y0 = zl.toLowerCase(), V0 = zl[0].toUpperCase() + zl.slice(1);
    dn(Y0, "on" + V0);
  }
  dn(Wc, "onAnimationEnd"), dn(Bc, "onAnimationIteration"), dn(qc, "onAnimationStart"), dn("dblclick", "onDoubleClick"), dn("focusin", "onFocus"), dn("focusout", "onBlur"), dn(Hc, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), f("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), f("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), f("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), f("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ns = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Q0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ns));
  function Vc(e, t, r) {
    var o = e.type || "unknown-event";
    e.currentTarget = r, Yh(o, t, void 0, e), e.currentTarget = null;
  }
  function Qc(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var o = e[r], c = o.event;
      o = o.listeners;
      e: {
        var u = void 0;
        if (t) for (var h = o.length - 1; 0 <= h; h--) {
          var y = o[h], w = y.instance, T = y.currentTarget;
          if (y = y.listener, w !== u && c.isPropagationStopped()) break e;
          Vc(c, y, T), u = w;
        }
        else for (h = 0; h < o.length; h++) {
          if (y = o[h], w = y.instance, T = y.currentTarget, y = y.listener, w !== u && c.isPropagationStopped()) break e;
          Vc(c, y, T), u = w;
        }
      }
    }
    if (Ds) throw e = yl, Ds = !1, yl = null, e;
  }
  function Le(e, t) {
    var r = t[Yl];
    r === void 0 && (r = t[Yl] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    r.has(o) || (Kc(t, e, 2, !1), r.add(o));
  }
  function Xl(e, t, r) {
    var o = 0;
    t && (o |= 4), Kc(r, e, o, t);
  }
  var ei = "_reactListening" + Math.random().toString(36).slice(2);
  function rs(e) {
    if (!e[ei]) {
      e[ei] = !0, a.forEach(function(r) {
        r !== "selectionchange" && (Q0.has(r) || Xl(r, !1, e), Xl(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ei] || (t[ei] = !0, Xl("selectionchange", !1, t));
    }
  }
  function Kc(e, t, r, o) {
    switch (kc(t)) {
      case 1:
        var c = u0;
        break;
      case 4:
        c = d0;
        break;
      default:
        c = bl;
    }
    r = c.bind(null, t, r, e), c = void 0, !gl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), o ? c !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: c }) : e.addEventListener(t, r, !0) : c !== void 0 ? e.addEventListener(t, r, { passive: c }) : e.addEventListener(t, r, !1);
  }
  function Zl(e, t, r, o, c) {
    var u = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var h = o.tag;
      if (h === 3 || h === 4) {
        var y = o.stateNode.containerInfo;
        if (y === c || y.nodeType === 8 && y.parentNode === c) break;
        if (h === 4) for (h = o.return; h !== null; ) {
          var w = h.tag;
          if ((w === 3 || w === 4) && (w = h.stateNode.containerInfo, w === c || w.nodeType === 8 && w.parentNode === c)) return;
          h = h.return;
        }
        for (; y !== null; ) {
          if (h = Dn(y), h === null) return;
          if (w = h.tag, w === 5 || w === 6) {
            o = u = h;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    nc(function() {
      var T = u, M = hl(r), D = [];
      e: {
        var P = Uc.get(e);
        if (P !== void 0) {
          var H = Cl, K = e;
          switch (e) {
            case "keypress":
              if (Ys(r) === 0) break e;
            case "keydown":
            case "keyup":
              H = E0;
              break;
            case "focusin":
              K = "focus", H = Ll;
              break;
            case "focusout":
              K = "blur", H = Ll;
              break;
            case "beforeblur":
            case "afterblur":
              H = Ll;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = Sc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = p0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = I0;
              break;
            case Wc:
            case Bc:
            case qc:
              H = y0;
              break;
            case Hc:
              H = R0;
              break;
            case "scroll":
              H = f0;
              break;
            case "wheel":
              H = O0;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = w0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Nc;
          }
          var G = (t & 4) !== 0, Xe = !G && e === "scroll", N = G ? P !== null ? P + "Capture" : null : P;
          G = [];
          for (var k = T, C; k !== null; ) {
            C = k;
            var A = C.stateNode;
            if (C.tag === 5 && A !== null && (C = A, N !== null && (A = Fr(k, N), A != null && G.push(ss(k, A, C)))), Xe) break;
            k = k.return;
          }
          0 < G.length && (P = new H(P, K, null, r, M), D.push({ event: P, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", P && r !== fl && (K = r.relatedTarget || r.fromElement) && (Dn(K) || K[Yt])) break e;
          if ((H || P) && (P = M.window === M ? M : (P = M.ownerDocument) ? P.defaultView || P.parentWindow : window, H ? (K = r.relatedTarget || r.toElement, H = T, K = K ? Dn(K) : null, K !== null && (Xe = Mn(K), K !== Xe || K.tag !== 5 && K.tag !== 6) && (K = null)) : (H = null, K = T), H !== K)) {
            if (G = Sc, A = "onMouseLeave", N = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (G = Nc, A = "onPointerLeave", N = "onPointerEnter", k = "pointer"), Xe = H == null ? P : cr(H), C = K == null ? P : cr(K), P = new G(A, k + "leave", H, r, M), P.target = Xe, P.relatedTarget = C, A = null, Dn(M) === T && (G = new G(N, k + "enter", K, r, M), G.target = C, G.relatedTarget = Xe, A = G), Xe = A, H && K) t: {
              for (G = H, N = K, k = 0, C = G; C; C = or(C)) k++;
              for (C = 0, A = N; A; A = or(A)) C++;
              for (; 0 < k - C; ) G = or(G), k--;
              for (; 0 < C - k; ) N = or(N), C--;
              for (; k--; ) {
                if (G === N || N !== null && G === N.alternate) break t;
                G = or(G), N = or(N);
              }
              G = null;
            }
            else G = null;
            H !== null && Gc(D, P, H, G, !1), K !== null && Xe !== null && Gc(D, Xe, K, G, !0);
          }
        }
        e: {
          if (P = T ? cr(T) : window, H = P.nodeName && P.nodeName.toLowerCase(), H === "select" || H === "input" && P.type === "file") var ee = z0;
          else if (Rc(P)) if (Oc) ee = B0;
          else {
            ee = Z0;
            var se = X0;
          }
          else (H = P.nodeName) && H.toLowerCase() === "input" && (P.type === "checkbox" || P.type === "radio") && (ee = W0);
          if (ee && (ee = ee(e, T))) {
            _c(D, ee, r, M);
            break e;
          }
          se && se(e, P, T), e === "focusout" && (se = P._wrapperState) && se.controlled && P.type === "number" && Pn(P, "number", P.value);
        }
        switch (se = T ? cr(T) : window, e) {
          case "focusin":
            (Rc(se) || se.contentEditable === "true") && (ir = se, Ml = T, ts = null);
            break;
          case "focusout":
            ts = Ml = ir = null;
            break;
          case "mousedown":
            Dl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dl = !1, Xc(D, r, M);
            break;
          case "selectionchange":
            if (U0) break;
          case "keydown":
          case "keyup":
            Xc(D, r, M);
        }
        var ie;
        if (_l) e: {
          switch (e) {
            case "compositionstart":
              var oe = "onCompositionStart";
              break e;
            case "compositionend":
              oe = "onCompositionEnd";
              break e;
            case "compositionupdate":
              oe = "onCompositionUpdate";
              break e;
          }
          oe = void 0;
        }
        else sr ? Ic(e, r) && (oe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (oe = "onCompositionStart");
        oe && (Ec && r.locale !== "ko" && (sr || oe !== "onCompositionStart" ? oe === "onCompositionEnd" && sr && (ie = vc()) : (un = M, El = "value" in un ? un.value : un.textContent, sr = !0)), se = ti(T, oe), 0 < se.length && (oe = new bc(oe, e, null, r, M), D.push({ event: oe, listeners: se }), ie ? oe.data = ie : (ie = Lc(r), ie !== null && (oe.data = ie)))), (ie = $0 ? M0(e, r) : D0(e, r)) && (T = ti(T, "onBeforeInput"), 0 < T.length && (M = new bc("onBeforeInput", "beforeinput", null, r, M), D.push({ event: M, listeners: T }), M.data = ie));
      }
      Qc(D, t);
    });
  }
  function ss(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function ti(e, t) {
    for (var r = t + "Capture", o = []; e !== null; ) {
      var c = e, u = c.stateNode;
      c.tag === 5 && u !== null && (c = u, u = Fr(e, r), u != null && o.unshift(ss(e, u, c)), u = Fr(e, t), u != null && o.push(ss(e, u, c))), e = e.return;
    }
    return o;
  }
  function or(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Gc(e, t, r, o, c) {
    for (var u = t._reactName, h = []; r !== null && r !== o; ) {
      var y = r, w = y.alternate, T = y.stateNode;
      if (w !== null && w === o) break;
      y.tag === 5 && T !== null && (y = T, c ? (w = Fr(r, u), w != null && h.unshift(ss(r, w, y))) : c || (w = Fr(r, u), w != null && h.push(ss(r, w, y)))), r = r.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var K0 = /\r\n?/g, G0 = /\u0000|\uFFFD/g;
  function Jc(e) {
    return (typeof e == "string" ? e : "" + e).replace(K0, `
`).replace(G0, "");
  }
  function ni(e, t, r) {
    if (t = Jc(t), Jc(e) !== t && r) throw Error(l(425));
  }
  function ri() {
  }
  var Wl = null, Bl = null;
  function ql(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Hl = typeof setTimeout == "function" ? setTimeout : void 0, J0 = typeof clearTimeout == "function" ? clearTimeout : void 0, eu = typeof Promise == "function" ? Promise : void 0, ep = typeof queueMicrotask == "function" ? queueMicrotask : typeof eu < "u" ? function(e) {
    return eu.resolve(null).then(e).catch(tp);
  } : Hl;
  function tp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ul(e, t) {
    var r = t, o = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8) if (r = c.data, r === "/$") {
        if (o === 0) {
          e.removeChild(c), Yr(t);
          return;
        }
        o--;
      } else r !== "$" && r !== "$?" && r !== "$!" || o++;
      r = c;
    } while (r);
    Yr(t);
  }
  function fn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function tu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0) return e;
          t--;
        } else r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var ar = Math.random().toString(36).slice(2), Xt = "__reactFiber$" + ar, is = "__reactProps$" + ar, Yt = "__reactContainer$" + ar, Yl = "__reactEvents$" + ar, np = "__reactListeners$" + ar, rp = "__reactHandles$" + ar;
  function Dn(e) {
    var t = e[Xt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Yt] || r[Xt]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = tu(e); e !== null; ) {
          if (r = e[Xt]) return r;
          e = tu(e);
        }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function ls(e) {
    return e = e[Xt] || e[Yt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function cr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(l(33));
  }
  function si(e) {
    return e[is] || null;
  }
  var Vl = [], ur = -1;
  function hn(e) {
    return { current: e };
  }
  function Re(e) {
    0 > ur || (e.current = Vl[ur], Vl[ur] = null, ur--);
  }
  function Te(e, t) {
    ur++, Vl[ur] = e.current, e.current = t;
  }
  var pn = {}, Je = hn(pn), ut = hn(!1), An = pn;
  function dr(e, t) {
    var r = e.type.contextTypes;
    if (!r) return pn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, u;
    for (u in r) c[u] = t[u];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function dt(e) {
    return e = e.childContextTypes, e != null;
  }
  function ii() {
    Re(ut), Re(Je);
  }
  function nu(e, t, r) {
    if (Je.current !== pn) throw Error(l(168));
    Te(Je, t), Te(ut, r);
  }
  function ru(e, t, r) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
    o = o.getChildContext();
    for (var c in o) if (!(c in t)) throw Error(l(108, ke(e) || "Unknown", c));
    return V({}, r, o);
  }
  function li(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pn, An = Je.current, Te(Je, e), Te(ut, ut.current), !0;
  }
  function su(e, t, r) {
    var o = e.stateNode;
    if (!o) throw Error(l(169));
    r ? (e = ru(e, t, An), o.__reactInternalMemoizedMergedChildContext = e, Re(ut), Re(Je), Te(Je, e)) : Re(ut), Te(ut, r);
  }
  var Vt = null, oi = !1, Ql = !1;
  function iu(e) {
    Vt === null ? Vt = [e] : Vt.push(e);
  }
  function sp(e) {
    oi = !0, iu(e);
  }
  function mn() {
    if (!Ql && Vt !== null) {
      Ql = !0;
      var e = 0, t = Se;
      try {
        var r = Vt;
        for (Se = 1; e < r.length; e++) {
          var o = r[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Vt = null, oi = !1;
      } catch (c) {
        throw Vt !== null && (Vt = Vt.slice(e + 1)), oc(xl, mn), c;
      } finally {
        Se = t, Ql = !1;
      }
    }
    return null;
  }
  var fr = [], hr = 0, ai = null, ci = 0, St = [], bt = 0, Fn = null, Qt = 1, Kt = "";
  function zn(e, t) {
    fr[hr++] = ci, fr[hr++] = ai, ai = e, ci = t;
  }
  function lu(e, t, r) {
    St[bt++] = Qt, St[bt++] = Kt, St[bt++] = Fn, Fn = e;
    var o = Qt;
    e = Kt;
    var c = 32 - Lt(o) - 1;
    o &= ~(1 << c), r += 1;
    var u = 32 - Lt(t) + c;
    if (30 < u) {
      var h = c - c % 5;
      u = (o & (1 << h) - 1).toString(32), o >>= h, c -= h, Qt = 1 << 32 - Lt(t) + c | r << c | o, Kt = u + e;
    } else Qt = 1 << u | r << c | o, Kt = e;
  }
  function Kl(e) {
    e.return !== null && (zn(e, 1), lu(e, 1, 0));
  }
  function Gl(e) {
    for (; e === ai; ) ai = fr[--hr], fr[hr] = null, ci = fr[--hr], fr[hr] = null;
    for (; e === Fn; ) Fn = St[--bt], St[bt] = null, Kt = St[--bt], St[bt] = null, Qt = St[--bt], St[bt] = null;
  }
  var wt = null, kt = null, Oe = !1, _t = null;
  function ou(e, t) {
    var r = Tt(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function au(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, wt = e, kt = fn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, wt = e, kt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Fn !== null ? { id: Qt, overflow: Kt } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = Tt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, wt = e, kt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Jl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function eo(e) {
    if (Oe) {
      var t = kt;
      if (t) {
        var r = t;
        if (!au(e, t)) {
          if (Jl(e)) throw Error(l(418));
          t = fn(r.nextSibling);
          var o = wt;
          t && au(e, t) ? ou(o, r) : (e.flags = e.flags & -4097 | 2, Oe = !1, wt = e);
        }
      } else {
        if (Jl(e)) throw Error(l(418));
        e.flags = e.flags & -4097 | 2, Oe = !1, wt = e;
      }
    }
  }
  function cu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    wt = e;
  }
  function ui(e) {
    if (e !== wt) return !1;
    if (!Oe) return cu(e), Oe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ql(e.type, e.memoizedProps)), t && (t = kt)) {
      if (Jl(e)) throw uu(), Error(l(418));
      for (; t; ) ou(e, t), t = fn(t.nextSibling);
    }
    if (cu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                kt = fn(e.nextSibling);
                break e;
              }
              t--;
            } else r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        kt = null;
      }
    } else kt = wt ? fn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function uu() {
    for (var e = kt; e; ) e = fn(e.nextSibling);
  }
  function pr() {
    kt = wt = null, Oe = !1;
  }
  function to(e) {
    _t === null ? _t = [e] : _t.push(e);
  }
  var ip = U.ReactCurrentBatchConfig;
  function os(e, t, r) {
    if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (r._owner) {
        if (r = r._owner, r) {
          if (r.tag !== 1) throw Error(l(309));
          var o = r.stateNode;
        }
        if (!o) throw Error(l(147, e));
        var c = o, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(h) {
          var y = c.refs;
          h === null ? delete y[u] : y[u] = h;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(l(284));
      if (!r._owner) throw Error(l(290, e));
    }
    return e;
  }
  function di(e, t) {
    throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function du(e) {
    var t = e._init;
    return t(e._payload);
  }
  function fu(e) {
    function t(N, k) {
      if (e) {
        var C = N.deletions;
        C === null ? (N.deletions = [k], N.flags |= 16) : C.push(k);
      }
    }
    function r(N, k) {
      if (!e) return null;
      for (; k !== null; ) t(N, k), k = k.sibling;
      return null;
    }
    function o(N, k) {
      for (N = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? N.set(k.key, k) : N.set(k.index, k), k = k.sibling;
      return N;
    }
    function c(N, k) {
      return N = Sn(N, k), N.index = 0, N.sibling = null, N;
    }
    function u(N, k, C) {
      return N.index = C, e ? (C = N.alternate, C !== null ? (C = C.index, C < k ? (N.flags |= 2, k) : C) : (N.flags |= 2, k)) : (N.flags |= 1048576, k);
    }
    function h(N) {
      return e && N.alternate === null && (N.flags |= 2), N;
    }
    function y(N, k, C, A) {
      return k === null || k.tag !== 6 ? (k = Uo(C, N.mode, A), k.return = N, k) : (k = c(k, C), k.return = N, k);
    }
    function w(N, k, C, A) {
      var ee = C.type;
      return ee === W ? M(N, k, C.props.children, A, C.key) : k !== null && (k.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === Ze && du(ee) === k.type) ? (A = c(k, C.props), A.ref = os(N, k, C), A.return = N, A) : (A = $i(C.type, C.key, C.props, null, N.mode, A), A.ref = os(N, k, C), A.return = N, A);
    }
    function T(N, k, C, A) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== C.containerInfo || k.stateNode.implementation !== C.implementation ? (k = Yo(C, N.mode, A), k.return = N, k) : (k = c(k, C.children || []), k.return = N, k);
    }
    function M(N, k, C, A, ee) {
      return k === null || k.tag !== 7 ? (k = Yn(C, N.mode, A, ee), k.return = N, k) : (k = c(k, C), k.return = N, k);
    }
    function D(N, k, C) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = Uo("" + k, N.mode, C), k.return = N, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case re:
            return C = $i(k.type, k.key, k.props, null, N.mode, C), C.ref = os(N, null, k), C.return = N, C;
          case ne:
            return k = Yo(k, N.mode, C), k.return = N, k;
          case Ze:
            var A = k._init;
            return D(N, A(k._payload), C);
        }
        if (sn(k) || le(k)) return k = Yn(k, N.mode, C, null), k.return = N, k;
        di(N, k);
      }
      return null;
    }
    function P(N, k, C, A) {
      var ee = k !== null ? k.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number") return ee !== null ? null : y(N, k, "" + C, A);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case re:
            return C.key === ee ? w(N, k, C, A) : null;
          case ne:
            return C.key === ee ? T(N, k, C, A) : null;
          case Ze:
            return ee = C._init, P(
              N,
              k,
              ee(C._payload),
              A
            );
        }
        if (sn(C) || le(C)) return ee !== null ? null : M(N, k, C, A, null);
        di(N, C);
      }
      return null;
    }
    function H(N, k, C, A, ee) {
      if (typeof A == "string" && A !== "" || typeof A == "number") return N = N.get(C) || null, y(k, N, "" + A, ee);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case re:
            return N = N.get(A.key === null ? C : A.key) || null, w(k, N, A, ee);
          case ne:
            return N = N.get(A.key === null ? C : A.key) || null, T(k, N, A, ee);
          case Ze:
            var se = A._init;
            return H(N, k, C, se(A._payload), ee);
        }
        if (sn(A) || le(A)) return N = N.get(C) || null, M(k, N, A, ee, null);
        di(k, A);
      }
      return null;
    }
    function K(N, k, C, A) {
      for (var ee = null, se = null, ie = k, oe = k = 0, Ve = null; ie !== null && oe < C.length; oe++) {
        ie.index > oe ? (Ve = ie, ie = null) : Ve = ie.sibling;
        var xe = P(N, ie, C[oe], A);
        if (xe === null) {
          ie === null && (ie = Ve);
          break;
        }
        e && ie && xe.alternate === null && t(N, ie), k = u(xe, k, oe), se === null ? ee = xe : se.sibling = xe, se = xe, ie = Ve;
      }
      if (oe === C.length) return r(N, ie), Oe && zn(N, oe), ee;
      if (ie === null) {
        for (; oe < C.length; oe++) ie = D(N, C[oe], A), ie !== null && (k = u(ie, k, oe), se === null ? ee = ie : se.sibling = ie, se = ie);
        return Oe && zn(N, oe), ee;
      }
      for (ie = o(N, ie); oe < C.length; oe++) Ve = H(ie, N, oe, C[oe], A), Ve !== null && (e && Ve.alternate !== null && ie.delete(Ve.key === null ? oe : Ve.key), k = u(Ve, k, oe), se === null ? ee = Ve : se.sibling = Ve, se = Ve);
      return e && ie.forEach(function(bn) {
        return t(N, bn);
      }), Oe && zn(N, oe), ee;
    }
    function G(N, k, C, A) {
      var ee = le(C);
      if (typeof ee != "function") throw Error(l(150));
      if (C = ee.call(C), C == null) throw Error(l(151));
      for (var se = ee = null, ie = k, oe = k = 0, Ve = null, xe = C.next(); ie !== null && !xe.done; oe++, xe = C.next()) {
        ie.index > oe ? (Ve = ie, ie = null) : Ve = ie.sibling;
        var bn = P(N, ie, xe.value, A);
        if (bn === null) {
          ie === null && (ie = Ve);
          break;
        }
        e && ie && bn.alternate === null && t(N, ie), k = u(bn, k, oe), se === null ? ee = bn : se.sibling = bn, se = bn, ie = Ve;
      }
      if (xe.done) return r(
        N,
        ie
      ), Oe && zn(N, oe), ee;
      if (ie === null) {
        for (; !xe.done; oe++, xe = C.next()) xe = D(N, xe.value, A), xe !== null && (k = u(xe, k, oe), se === null ? ee = xe : se.sibling = xe, se = xe);
        return Oe && zn(N, oe), ee;
      }
      for (ie = o(N, ie); !xe.done; oe++, xe = C.next()) xe = H(ie, N, oe, xe.value, A), xe !== null && (e && xe.alternate !== null && ie.delete(xe.key === null ? oe : xe.key), k = u(xe, k, oe), se === null ? ee = xe : se.sibling = xe, se = xe);
      return e && ie.forEach(function(Ap) {
        return t(N, Ap);
      }), Oe && zn(N, oe), ee;
    }
    function Xe(N, k, C, A) {
      if (typeof C == "object" && C !== null && C.type === W && C.key === null && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case re:
            e: {
              for (var ee = C.key, se = k; se !== null; ) {
                if (se.key === ee) {
                  if (ee = C.type, ee === W) {
                    if (se.tag === 7) {
                      r(N, se.sibling), k = c(se, C.props.children), k.return = N, N = k;
                      break e;
                    }
                  } else if (se.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === Ze && du(ee) === se.type) {
                    r(N, se.sibling), k = c(se, C.props), k.ref = os(N, se, C), k.return = N, N = k;
                    break e;
                  }
                  r(N, se);
                  break;
                } else t(N, se);
                se = se.sibling;
              }
              C.type === W ? (k = Yn(C.props.children, N.mode, A, C.key), k.return = N, N = k) : (A = $i(C.type, C.key, C.props, null, N.mode, A), A.ref = os(N, k, C), A.return = N, N = A);
            }
            return h(N);
          case ne:
            e: {
              for (se = C.key; k !== null; ) {
                if (k.key === se) if (k.tag === 4 && k.stateNode.containerInfo === C.containerInfo && k.stateNode.implementation === C.implementation) {
                  r(N, k.sibling), k = c(k, C.children || []), k.return = N, N = k;
                  break e;
                } else {
                  r(N, k);
                  break;
                }
                else t(N, k);
                k = k.sibling;
              }
              k = Yo(C, N.mode, A), k.return = N, N = k;
            }
            return h(N);
          case Ze:
            return se = C._init, Xe(N, k, se(C._payload), A);
        }
        if (sn(C)) return K(N, k, C, A);
        if (le(C)) return G(N, k, C, A);
        di(N, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" ? (C = "" + C, k !== null && k.tag === 6 ? (r(N, k.sibling), k = c(k, C), k.return = N, N = k) : (r(N, k), k = Uo(C, N.mode, A), k.return = N, N = k), h(N)) : r(N, k);
    }
    return Xe;
  }
  var mr = fu(!0), hu = fu(!1), fi = hn(null), hi = null, gr = null, no = null;
  function ro() {
    no = gr = hi = null;
  }
  function so(e) {
    var t = fi.current;
    Re(fi), e._currentValue = t;
  }
  function io(e, t, r) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function yr(e, t) {
    hi = e, no = gr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (ft = !0), e.firstContext = null);
  }
  function Nt(e) {
    var t = e._currentValue;
    if (no !== e) if (e = { context: e, memoizedValue: t, next: null }, gr === null) {
      if (hi === null) throw Error(l(308));
      gr = e, hi.dependencies = { lanes: 0, firstContext: e };
    } else gr = gr.next = e;
    return t;
  }
  var Xn = null;
  function lo(e) {
    Xn === null ? Xn = [e] : Xn.push(e);
  }
  function pu(e, t, r, o) {
    var c = t.interleaved;
    return c === null ? (r.next = r, lo(t)) : (r.next = c.next, c.next = r), t.interleaved = r, Gt(e, o);
  }
  function Gt(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var gn = !1;
  function oo(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function mu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Jt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function yn(e, t, r) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ye & 2) !== 0) {
      var c = o.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), o.pending = t, Gt(e, r);
    }
    return c = o.interleaved, c === null ? (t.next = t, lo(o)) : (t.next = c.next, c.next = t), o.interleaved = t, Gt(e, r);
  }
  function pi(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, vl(e, r);
    }
  }
  function gu(e, t) {
    var r = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, r === o)) {
      var c = null, u = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var h = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
          u === null ? c = u = h : u = u.next = h, r = r.next;
        } while (r !== null);
        u === null ? c = u = t : u = u.next = t;
      } else c = u = t;
      r = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: u, shared: o.shared, effects: o.effects }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  function mi(e, t, r, o) {
    var c = e.updateQueue;
    gn = !1;
    var u = c.firstBaseUpdate, h = c.lastBaseUpdate, y = c.shared.pending;
    if (y !== null) {
      c.shared.pending = null;
      var w = y, T = w.next;
      w.next = null, h === null ? u = T : h.next = T, h = w;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, y = M.lastBaseUpdate, y !== h && (y === null ? M.firstBaseUpdate = T : y.next = T, M.lastBaseUpdate = w));
    }
    if (u !== null) {
      var D = c.baseState;
      h = 0, M = T = w = null, y = u;
      do {
        var P = y.lane, H = y.eventTime;
        if ((o & P) === P) {
          M !== null && (M = M.next = {
            eventTime: H,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var K = e, G = y;
            switch (P = t, H = r, G.tag) {
              case 1:
                if (K = G.payload, typeof K == "function") {
                  D = K.call(H, D, P);
                  break e;
                }
                D = K;
                break e;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = G.payload, P = typeof K == "function" ? K.call(H, D, P) : K, P == null) break e;
                D = V({}, D, P);
                break e;
              case 2:
                gn = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, P = c.effects, P === null ? c.effects = [y] : P.push(y));
        } else H = { eventTime: H, lane: P, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, M === null ? (T = M = H, w = D) : M = M.next = H, h |= P;
        if (y = y.next, y === null) {
          if (y = c.shared.pending, y === null) break;
          P = y, y = P.next, P.next = null, c.lastBaseUpdate = P, c.shared.pending = null;
        }
      } while (!0);
      if (M === null && (w = D), c.baseState = w, c.firstBaseUpdate = T, c.lastBaseUpdate = M, t = c.shared.interleaved, t !== null) {
        c = t;
        do
          h |= c.lane, c = c.next;
        while (c !== t);
      } else u === null && (c.shared.lanes = 0);
      Bn |= h, e.lanes = h, e.memoizedState = D;
    }
  }
  function yu(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = r, typeof c != "function") throw Error(l(191, c));
        c.call(o);
      }
    }
  }
  var as = {}, Zt = hn(as), cs = hn(as), us = hn(as);
  function Zn(e) {
    if (e === as) throw Error(l(174));
    return e;
  }
  function ao(e, t) {
    switch (Te(us, t), Te(cs, e), Te(Zt, as), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : cl(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = cl(t, e);
    }
    Re(Zt), Te(Zt, t);
  }
  function xr() {
    Re(Zt), Re(cs), Re(us);
  }
  function xu(e) {
    Zn(us.current);
    var t = Zn(Zt.current), r = cl(t, e.type);
    t !== r && (Te(cs, e), Te(Zt, r));
  }
  function co(e) {
    cs.current === e && (Re(Zt), Re(cs));
  }
  var $e = hn(0);
  function gi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var uo = [];
  function fo() {
    for (var e = 0; e < uo.length; e++) uo[e]._workInProgressVersionPrimary = null;
    uo.length = 0;
  }
  var yi = U.ReactCurrentDispatcher, ho = U.ReactCurrentBatchConfig, Wn = 0, Me = null, Be = null, Ue = null, xi = !1, ds = !1, fs = 0, lp = 0;
  function et() {
    throw Error(l(321));
  }
  function po(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++) if (!Rt(e[r], t[r])) return !1;
    return !0;
  }
  function mo(e, t, r, o, c, u) {
    if (Wn = u, Me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, yi.current = e === null || e.memoizedState === null ? up : dp, e = r(o, c), ds) {
      u = 0;
      do {
        if (ds = !1, fs = 0, 25 <= u) throw Error(l(301));
        u += 1, Ue = Be = null, t.updateQueue = null, yi.current = fp, e = r(o, c);
      } while (ds);
    }
    if (yi.current = vi, t = Be !== null && Be.next !== null, Wn = 0, Ue = Be = Me = null, xi = !1, t) throw Error(l(300));
    return e;
  }
  function go() {
    var e = fs !== 0;
    return fs = 0, e;
  }
  function Wt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ue === null ? Me.memoizedState = Ue = e : Ue = Ue.next = e, Ue;
  }
  function Et() {
    if (Be === null) {
      var e = Me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Be.next;
    var t = Ue === null ? Me.memoizedState : Ue.next;
    if (t !== null) Ue = t, Be = e;
    else {
      if (e === null) throw Error(l(310));
      Be = e, e = { memoizedState: Be.memoizedState, baseState: Be.baseState, baseQueue: Be.baseQueue, queue: Be.queue, next: null }, Ue === null ? Me.memoizedState = Ue = e : Ue = Ue.next = e;
    }
    return Ue;
  }
  function hs(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function yo(e) {
    var t = Et(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = Be, c = o.baseQueue, u = r.pending;
    if (u !== null) {
      if (c !== null) {
        var h = c.next;
        c.next = u.next, u.next = h;
      }
      o.baseQueue = c = u, r.pending = null;
    }
    if (c !== null) {
      u = c.next, o = o.baseState;
      var y = h = null, w = null, T = u;
      do {
        var M = T.lane;
        if ((Wn & M) === M) w !== null && (w = w.next = { lane: 0, action: T.action, hasEagerState: T.hasEagerState, eagerState: T.eagerState, next: null }), o = T.hasEagerState ? T.eagerState : e(o, T.action);
        else {
          var D = {
            lane: M,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          };
          w === null ? (y = w = D, h = o) : w = w.next = D, Me.lanes |= M, Bn |= M;
        }
        T = T.next;
      } while (T !== null && T !== u);
      w === null ? h = o : w.next = y, Rt(o, t.memoizedState) || (ft = !0), t.memoizedState = o, t.baseState = h, t.baseQueue = w, r.lastRenderedState = o;
    }
    if (e = r.interleaved, e !== null) {
      c = e;
      do
        u = c.lane, Me.lanes |= u, Bn |= u, c = c.next;
      while (c !== e);
    } else c === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function xo(e) {
    var t = Et(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = r.dispatch, c = r.pending, u = t.memoizedState;
    if (c !== null) {
      r.pending = null;
      var h = c = c.next;
      do
        u = e(u, h.action), h = h.next;
      while (h !== c);
      Rt(u, t.memoizedState) || (ft = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
    }
    return [u, o];
  }
  function wu() {
  }
  function ku(e, t) {
    var r = Me, o = Et(), c = t(), u = !Rt(o.memoizedState, c);
    if (u && (o.memoizedState = c, ft = !0), o = o.queue, wo(Su.bind(null, r, o, e), [e]), o.getSnapshot !== t || u || Ue !== null && Ue.memoizedState.tag & 1) {
      if (r.flags |= 2048, ps(9, ju.bind(null, r, o, c, t), void 0, null), Ye === null) throw Error(l(349));
      (Wn & 30) !== 0 || vu(r, t, c);
    }
    return c;
  }
  function vu(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Me.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Me.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function ju(e, t, r, o) {
    t.value = r, t.getSnapshot = o, bu(t) && Nu(e);
  }
  function Su(e, t, r) {
    return r(function() {
      bu(t) && Nu(e);
    });
  }
  function bu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !Rt(e, r);
    } catch {
      return !0;
    }
  }
  function Nu(e) {
    var t = Gt(e, 1);
    t !== null && Mt(t, e, 1, -1);
  }
  function Eu(e) {
    var t = Wt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hs, lastRenderedState: e }, t.queue = e, e = e.dispatch = cp.bind(null, Me, e), [t.memoizedState, e];
  }
  function ps(e, t, r, o) {
    return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = Me.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Me.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Cu() {
    return Et().memoizedState;
  }
  function wi(e, t, r, o) {
    var c = Wt();
    Me.flags |= e, c.memoizedState = ps(1 | t, r, void 0, o === void 0 ? null : o);
  }
  function ki(e, t, r, o) {
    var c = Et();
    o = o === void 0 ? null : o;
    var u = void 0;
    if (Be !== null) {
      var h = Be.memoizedState;
      if (u = h.destroy, o !== null && po(o, h.deps)) {
        c.memoizedState = ps(t, r, u, o);
        return;
      }
    }
    Me.flags |= e, c.memoizedState = ps(1 | t, r, u, o);
  }
  function Tu(e, t) {
    return wi(8390656, 8, e, t);
  }
  function wo(e, t) {
    return ki(2048, 8, e, t);
  }
  function Iu(e, t) {
    return ki(4, 2, e, t);
  }
  function Lu(e, t) {
    return ki(4, 4, e, t);
  }
  function Ru(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function _u(e, t, r) {
    return r = r != null ? r.concat([e]) : null, ki(4, 4, Ru.bind(null, t, e), r);
  }
  function ko() {
  }
  function Ou(e, t) {
    var r = Et();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && po(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
  }
  function Pu(e, t) {
    var r = Et();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && po(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function $u(e, t, r) {
    return (Wn & 21) === 0 ? (e.baseState && (e.baseState = !1, ft = !0), e.memoizedState = r) : (Rt(r, t) || (r = dc(), Me.lanes |= r, Bn |= r, e.baseState = !0), t);
  }
  function op(e, t) {
    var r = Se;
    Se = r !== 0 && 4 > r ? r : 4, e(!0);
    var o = ho.transition;
    ho.transition = {};
    try {
      e(!1), t();
    } finally {
      Se = r, ho.transition = o;
    }
  }
  function Mu() {
    return Et().memoizedState;
  }
  function ap(e, t, r) {
    var o = vn(e);
    if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, Du(e)) Au(t, r);
    else if (r = pu(e, t, r, o), r !== null) {
      var c = lt();
      Mt(r, e, o, c), Fu(r, t, o);
    }
  }
  function cp(e, t, r) {
    var o = vn(e), c = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
    if (Du(e)) Au(t, c);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var h = t.lastRenderedState, y = u(h, r);
        if (c.hasEagerState = !0, c.eagerState = y, Rt(y, h)) {
          var w = t.interleaved;
          w === null ? (c.next = c, lo(t)) : (c.next = w.next, w.next = c), t.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      r = pu(e, t, c, o), r !== null && (c = lt(), Mt(r, e, o, c), Fu(r, t, o));
    }
  }
  function Du(e) {
    var t = e.alternate;
    return e === Me || t !== null && t === Me;
  }
  function Au(e, t) {
    ds = xi = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Fu(e, t, r) {
    if ((r & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, vl(e, r);
    }
  }
  var vi = { readContext: Nt, useCallback: et, useContext: et, useEffect: et, useImperativeHandle: et, useInsertionEffect: et, useLayoutEffect: et, useMemo: et, useReducer: et, useRef: et, useState: et, useDebugValue: et, useDeferredValue: et, useTransition: et, useMutableSource: et, useSyncExternalStore: et, useId: et, unstable_isNewReconciler: !1 }, up = { readContext: Nt, useCallback: function(e, t) {
    return Wt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Nt, useEffect: Tu, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, wi(
      4194308,
      4,
      Ru.bind(null, t, e),
      r
    );
  }, useLayoutEffect: function(e, t) {
    return wi(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return wi(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = Wt();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var o = Wt();
    return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = ap.bind(null, Me, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Wt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Eu, useDebugValue: ko, useDeferredValue: function(e) {
    return Wt().memoizedState = e;
  }, useTransition: function() {
    var e = Eu(!1), t = e[0];
    return e = op.bind(null, e[1]), Wt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var o = Me, c = Wt();
    if (Oe) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else {
      if (r = t(), Ye === null) throw Error(l(349));
      (Wn & 30) !== 0 || vu(o, t, r);
    }
    c.memoizedState = r;
    var u = { value: r, getSnapshot: t };
    return c.queue = u, Tu(Su.bind(
      null,
      o,
      u,
      e
    ), [e]), o.flags |= 2048, ps(9, ju.bind(null, o, u, r, t), void 0, null), r;
  }, useId: function() {
    var e = Wt(), t = Ye.identifierPrefix;
    if (Oe) {
      var r = Kt, o = Qt;
      r = (o & ~(1 << 32 - Lt(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = fs++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else r = lp++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, dp = {
    readContext: Nt,
    useCallback: Ou,
    useContext: Nt,
    useEffect: wo,
    useImperativeHandle: _u,
    useInsertionEffect: Iu,
    useLayoutEffect: Lu,
    useMemo: Pu,
    useReducer: yo,
    useRef: Cu,
    useState: function() {
      return yo(hs);
    },
    useDebugValue: ko,
    useDeferredValue: function(e) {
      var t = Et();
      return $u(t, Be.memoizedState, e);
    },
    useTransition: function() {
      var e = yo(hs)[0], t = Et().memoizedState;
      return [e, t];
    },
    useMutableSource: wu,
    useSyncExternalStore: ku,
    useId: Mu,
    unstable_isNewReconciler: !1
  }, fp = { readContext: Nt, useCallback: Ou, useContext: Nt, useEffect: wo, useImperativeHandle: _u, useInsertionEffect: Iu, useLayoutEffect: Lu, useMemo: Pu, useReducer: xo, useRef: Cu, useState: function() {
    return xo(hs);
  }, useDebugValue: ko, useDeferredValue: function(e) {
    var t = Et();
    return Be === null ? t.memoizedState = e : $u(t, Be.memoizedState, e);
  }, useTransition: function() {
    var e = xo(hs)[0], t = Et().memoizedState;
    return [e, t];
  }, useMutableSource: wu, useSyncExternalStore: ku, useId: Mu, unstable_isNewReconciler: !1 };
  function Ot(e, t) {
    if (e && e.defaultProps) {
      t = V({}, t), e = e.defaultProps;
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function vo(e, t, r, o) {
    t = e.memoizedState, r = r(o, t), r = r == null ? t : V({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var ji = { isMounted: function(e) {
    return (e = e._reactInternals) ? Mn(e) === e : !1;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var o = lt(), c = vn(e), u = Jt(o, c);
    u.payload = t, r != null && (u.callback = r), t = yn(e, u, c), t !== null && (Mt(t, e, c, o), pi(t, e, c));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var o = lt(), c = vn(e), u = Jt(o, c);
    u.tag = 1, u.payload = t, r != null && (u.callback = r), t = yn(e, u, c), t !== null && (Mt(t, e, c, o), pi(t, e, c));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = lt(), o = vn(e), c = Jt(r, o);
    c.tag = 2, t != null && (c.callback = t), t = yn(e, c, o), t !== null && (Mt(t, e, o, r), pi(t, e, o));
  } };
  function zu(e, t, r, o, c, u, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, h) : t.prototype && t.prototype.isPureReactComponent ? !es(r, o) || !es(c, u) : !0;
  }
  function Xu(e, t, r) {
    var o = !1, c = pn, u = t.contextType;
    return typeof u == "object" && u !== null ? u = Nt(u) : (c = dt(t) ? An : Je.current, o = t.contextTypes, u = (o = o != null) ? dr(e, c) : pn), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ji, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = c, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function Zu(e, t, r, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && ji.enqueueReplaceState(t, t.state, null);
  }
  function jo(e, t, r, o) {
    var c = e.stateNode;
    c.props = r, c.state = e.memoizedState, c.refs = {}, oo(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? c.context = Nt(u) : (u = dt(t) ? An : Je.current, c.context = dr(e, u)), c.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (vo(e, t, u, r), c.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (t = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), t !== c.state && ji.enqueueReplaceState(c, c.state, null), mi(e, r, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function wr(e, t) {
    try {
      var r = "", o = t;
      do
        r += me(o), o = o.return;
      while (o);
      var c = r;
    } catch (u) {
      c = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: c, digest: null };
  }
  function So(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function bo(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var hp = typeof WeakMap == "function" ? WeakMap : Map;
  function Wu(e, t, r) {
    r = Jt(-1, r), r.tag = 3, r.payload = { element: null };
    var o = t.value;
    return r.callback = function() {
      Ii || (Ii = !0, Fo = o), bo(e, t);
    }, r;
  }
  function Bu(e, t, r) {
    r = Jt(-1, r), r.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = t.value;
      r.payload = function() {
        return o(c);
      }, r.callback = function() {
        bo(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
      bo(e, t), typeof o != "function" && (wn === null ? wn = /* @__PURE__ */ new Set([this]) : wn.add(this));
      var h = t.stack;
      this.componentDidCatch(t.value, { componentStack: h !== null ? h : "" });
    }), r;
  }
  function qu(e, t, r) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new hp();
      var c = /* @__PURE__ */ new Set();
      o.set(t, c);
    } else c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c));
    c.has(r) || (c.add(r), e = Cp.bind(null, e, t, r), t.then(e, e));
  }
  function Hu(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Uu(e, t, r, o, c) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Jt(-1, 1), t.tag = 2, yn(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = c, e);
  }
  var pp = U.ReactCurrentOwner, ft = !1;
  function it(e, t, r, o) {
    t.child = e === null ? hu(t, null, r, o) : mr(t, e.child, r, o);
  }
  function Yu(e, t, r, o, c) {
    r = r.render;
    var u = t.ref;
    return yr(t, c), o = mo(e, t, r, o, u, c), r = go(), e !== null && !ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, en(e, t, c)) : (Oe && r && Kl(t), t.flags |= 1, it(e, t, o, c), t.child);
  }
  function Vu(e, t, r, o, c) {
    if (e === null) {
      var u = r.type;
      return typeof u == "function" && !Ho(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, Qu(e, t, u, o, c)) : (e = $i(r.type, null, o, t, t.mode, c), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & c) === 0) {
      var h = u.memoizedProps;
      if (r = r.compare, r = r !== null ? r : es, r(h, o) && e.ref === t.ref) return en(e, t, c);
    }
    return t.flags |= 1, e = Sn(u, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Qu(e, t, r, o, c) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (es(u, o) && e.ref === t.ref) if (ft = !1, t.pendingProps = o = u, (e.lanes & c) !== 0) (e.flags & 131072) !== 0 && (ft = !0);
      else return t.lanes = e.lanes, en(e, t, c);
    }
    return No(e, t, r, o, c);
  }
  function Ku(e, t, r) {
    var o = t.pendingProps, c = o.children, u = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Te(vr, vt), vt |= r;
    else {
      if ((r & 1073741824) === 0) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Te(vr, vt), vt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : r, Te(vr, vt), vt |= o;
    }
    else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, Te(vr, vt), vt |= o;
    return it(e, t, c, r), t.child;
  }
  function Gu(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function No(e, t, r, o, c) {
    var u = dt(r) ? An : Je.current;
    return u = dr(t, u), yr(t, c), r = mo(e, t, r, o, u, c), o = go(), e !== null && !ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, en(e, t, c)) : (Oe && o && Kl(t), t.flags |= 1, it(e, t, r, c), t.child);
  }
  function Ju(e, t, r, o, c) {
    if (dt(r)) {
      var u = !0;
      li(t);
    } else u = !1;
    if (yr(t, c), t.stateNode === null) bi(e, t), Xu(t, r, o), jo(t, r, o, c), o = !0;
    else if (e === null) {
      var h = t.stateNode, y = t.memoizedProps;
      h.props = y;
      var w = h.context, T = r.contextType;
      typeof T == "object" && T !== null ? T = Nt(T) : (T = dt(r) ? An : Je.current, T = dr(t, T));
      var M = r.getDerivedStateFromProps, D = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      D || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== o || w !== T) && Zu(t, h, o, T), gn = !1;
      var P = t.memoizedState;
      h.state = P, mi(t, o, h, c), w = t.memoizedState, y !== o || P !== w || ut.current || gn ? (typeof M == "function" && (vo(t, r, M, o), w = t.memoizedState), (y = gn || zu(t, r, y, o, P, w, T)) ? (D || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = w), h.props = o, h.state = w, h.context = T, o = y) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      h = t.stateNode, mu(e, t), y = t.memoizedProps, T = t.type === t.elementType ? y : Ot(t.type, y), h.props = T, D = t.pendingProps, P = h.context, w = r.contextType, typeof w == "object" && w !== null ? w = Nt(w) : (w = dt(r) ? An : Je.current, w = dr(t, w));
      var H = r.getDerivedStateFromProps;
      (M = typeof H == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== D || P !== w) && Zu(t, h, o, w), gn = !1, P = t.memoizedState, h.state = P, mi(t, o, h, c);
      var K = t.memoizedState;
      y !== D || P !== K || ut.current || gn ? (typeof H == "function" && (vo(t, r, H, o), K = t.memoizedState), (T = gn || zu(t, r, T, o, P, K, w) || !1) ? (M || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, K, w), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, K, w)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = K), h.props = o, h.state = K, h.context = w, o = T) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Eo(e, t, r, o, u, c);
  }
  function Eo(e, t, r, o, c, u) {
    Gu(e, t);
    var h = (t.flags & 128) !== 0;
    if (!o && !h) return c && su(t, r, !1), en(e, t, u);
    o = t.stateNode, pp.current = t;
    var y = h && typeof r.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && h ? (t.child = mr(t, e.child, null, u), t.child = mr(t, null, y, u)) : it(e, t, y, u), t.memoizedState = o.state, c && su(t, r, !0), t.child;
  }
  function ed(e) {
    var t = e.stateNode;
    t.pendingContext ? nu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && nu(e, t.context, !1), ao(e, t.containerInfo);
  }
  function td(e, t, r, o, c) {
    return pr(), to(c), t.flags |= 256, it(e, t, r, o), t.child;
  }
  var Co = { dehydrated: null, treeContext: null, retryLane: 0 };
  function To(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function nd(e, t, r) {
    var o = t.pendingProps, c = $e.current, u = !1, h = (t.flags & 128) !== 0, y;
    if ((y = h) || (y = e !== null && e.memoizedState === null ? !1 : (c & 2) !== 0), y ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (c |= 1), Te($e, c & 1), e === null)
      return eo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (h = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, h = { mode: "hidden", children: h }, (o & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = h) : u = Mi(h, o, 0, null), e = Yn(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = To(r), t.memoizedState = Co, e) : Io(t, h));
    if (c = e.memoizedState, c !== null && (y = c.dehydrated, y !== null)) return mp(e, t, h, o, y, c, r);
    if (u) {
      u = o.fallback, h = t.mode, c = e.child, y = c.sibling;
      var w = { mode: "hidden", children: o.children };
      return (h & 1) === 0 && t.child !== c ? (o = t.child, o.childLanes = 0, o.pendingProps = w, t.deletions = null) : (o = Sn(c, w), o.subtreeFlags = c.subtreeFlags & 14680064), y !== null ? u = Sn(y, u) : (u = Yn(u, h, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, h = e.child.memoizedState, h = h === null ? To(r) : { baseLanes: h.baseLanes | r, cachePool: null, transitions: h.transitions }, u.memoizedState = h, u.childLanes = e.childLanes & ~r, t.memoizedState = Co, o;
    }
    return u = e.child, e = u.sibling, o = Sn(u, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function Io(e, t) {
    return t = Mi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Si(e, t, r, o) {
    return o !== null && to(o), mr(t, e.child, null, r), e = Io(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function mp(e, t, r, o, c, u, h) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, o = So(Error(l(422))), Si(e, t, h, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, c = t.mode, o = Mi({ mode: "visible", children: o.children }, c, 0, null), u = Yn(u, c, h, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & 1) !== 0 && mr(t, e.child, null, h), t.child.memoizedState = To(h), t.memoizedState = Co, u);
    if ((t.mode & 1) === 0) return Si(e, t, h, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var y = o.dgst;
      return o = y, u = Error(l(419)), o = So(u, o, void 0), Si(e, t, h, o);
    }
    if (y = (h & e.childLanes) !== 0, ft || y) {
      if (o = Ye, o !== null) {
        switch (h & -h) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = (c & (o.suspendedLanes | h)) !== 0 ? 0 : c, c !== 0 && c !== u.retryLane && (u.retryLane = c, Gt(e, c), Mt(o, e, c, -1));
      }
      return qo(), o = So(Error(l(421))), Si(e, t, h, o);
    }
    return c.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Tp.bind(null, e), c._reactRetry = t, null) : (e = u.treeContext, kt = fn(c.nextSibling), wt = t, Oe = !0, _t = null, e !== null && (St[bt++] = Qt, St[bt++] = Kt, St[bt++] = Fn, Qt = e.id, Kt = e.overflow, Fn = t), t = Io(t, o.children), t.flags |= 4096, t);
  }
  function rd(e, t, r) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), io(e.return, t, r);
  }
  function Lo(e, t, r, o, c) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: c } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = c);
  }
  function sd(e, t, r) {
    var o = t.pendingProps, c = o.revealOrder, u = o.tail;
    if (it(e, t, o.children, r), o = $e.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && rd(e, r, t);
        else if (e.tag === 19) rd(e, r, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      o &= 1;
    }
    if (Te($e, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (r = t.child, c = null; r !== null; ) e = r.alternate, e !== null && gi(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = t.child, t.child = null) : (c = r.sibling, r.sibling = null), Lo(t, !1, c, r, u);
        break;
      case "backwards":
        for (r = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && gi(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        Lo(t, !0, r, null, u);
        break;
      case "together":
        Lo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function bi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function en(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), Bn |= t.lanes, (r & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, r = Sn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Sn(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function gp(e, t, r) {
    switch (t.tag) {
      case 3:
        ed(t), pr();
        break;
      case 5:
        xu(t);
        break;
      case 1:
        dt(t.type) && li(t);
        break;
      case 4:
        ao(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, c = t.memoizedProps.value;
        Te(fi, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (Te($e, $e.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? nd(e, t, r) : (Te($e, $e.current & 1), e = en(e, t, r), e !== null ? e.sibling : null);
        Te($e, $e.current & 1);
        break;
      case 19:
        if (o = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return sd(e, t, r);
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Te($e, $e.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Ku(e, t, r);
    }
    return en(e, t, r);
  }
  var id, Ro, ld, od;
  id = function(e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Ro = function() {
  }, ld = function(e, t, r, o) {
    var c = e.memoizedProps;
    if (c !== o) {
      e = t.stateNode, Zn(Zt.current);
      var u = null;
      switch (r) {
        case "input":
          c = ct(e, c), o = ct(e, o), u = [];
          break;
        case "select":
          c = V({}, c, { value: void 0 }), o = V({}, o, { value: void 0 }), u = [];
          break;
        case "textarea":
          c = Jn(e, c), o = Jn(e, o), u = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (e.onclick = ri);
      }
      ul(r, o);
      var h;
      r = null;
      for (T in c) if (!o.hasOwnProperty(T) && c.hasOwnProperty(T) && c[T] != null) if (T === "style") {
        var y = c[T];
        for (h in y) y.hasOwnProperty(h) && (r || (r = {}), r[h] = "");
      } else T !== "dangerouslySetInnerHTML" && T !== "children" && T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && T !== "autoFocus" && (d.hasOwnProperty(T) ? u || (u = []) : (u = u || []).push(T, null));
      for (T in o) {
        var w = o[T];
        if (y = c?.[T], o.hasOwnProperty(T) && w !== y && (w != null || y != null)) if (T === "style") if (y) {
          for (h in y) !y.hasOwnProperty(h) || w && w.hasOwnProperty(h) || (r || (r = {}), r[h] = "");
          for (h in w) w.hasOwnProperty(h) && y[h] !== w[h] && (r || (r = {}), r[h] = w[h]);
        } else r || (u || (u = []), u.push(
          T,
          r
        )), r = w;
        else T === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, y = y ? y.__html : void 0, w != null && y !== w && (u = u || []).push(T, w)) : T === "children" ? typeof w != "string" && typeof w != "number" || (u = u || []).push(T, "" + w) : T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && (d.hasOwnProperty(T) ? (w != null && T === "onScroll" && Le("scroll", e), u || y === w || (u = [])) : (u = u || []).push(T, w));
      }
      r && (u = u || []).push("style", r);
      var T = u;
      (t.updateQueue = T) && (t.flags |= 4);
    }
  }, od = function(e, t, r, o) {
    r !== o && (t.flags |= 4);
  };
  function ms(e, t) {
    if (!Oe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
        r === null ? e.tail = null : r.sibling = null;
        break;
      case "collapsed":
        r = e.tail;
        for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
        o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
    }
  }
  function tt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
    if (t) for (var c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = e, c = c.sibling;
    else for (c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= o, e.childLanes = r, t;
  }
  function yp(e, t, r) {
    var o = t.pendingProps;
    switch (Gl(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return tt(t), null;
      case 1:
        return dt(t.type) && ii(), tt(t), null;
      case 3:
        return o = t.stateNode, xr(), Re(ut), Re(Je), fo(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (ui(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, _t !== null && (Zo(_t), _t = null))), Ro(e, t), tt(t), null;
      case 5:
        co(t);
        var c = Zn(us.current);
        if (r = t.type, e !== null && t.stateNode != null) ld(e, t, r, o, c), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(l(166));
            return tt(t), null;
          }
          if (e = Zn(Zt.current), ui(t)) {
            o = t.stateNode, r = t.type;
            var u = t.memoizedProps;
            switch (o[Xt] = t, o[is] = u, e = (t.mode & 1) !== 0, r) {
              case "dialog":
                Le("cancel", o), Le("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Le("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ns.length; c++) Le(ns[c], o);
                break;
              case "source":
                Le("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Le(
                  "error",
                  o
                ), Le("load", o);
                break;
              case "details":
                Le("toggle", o);
                break;
              case "input":
                rn(o, u), Le("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!u.multiple }, Le("invalid", o);
                break;
              case "textarea":
                $r(o, u), Le("invalid", o);
            }
            ul(r, u), c = null;
            for (var h in u) if (u.hasOwnProperty(h)) {
              var y = u[h];
              h === "children" ? typeof y == "string" ? o.textContent !== y && (u.suppressHydrationWarning !== !0 && ni(o.textContent, y, e), c = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (u.suppressHydrationWarning !== !0 && ni(
                o.textContent,
                y,
                e
              ), c = ["children", "" + y]) : d.hasOwnProperty(h) && y != null && h === "onScroll" && Le("scroll", o);
            }
            switch (r) {
              case "input":
                B(o), Pr(o, u, !0);
                break;
              case "textarea":
                B(o), Mr(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (o.onclick = ri);
            }
            o = c, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            h = c.nodeType === 9 ? c : c.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ua(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = h.createElement(r, { is: o.is }) : (e = h.createElement(r), r === "select" && (h = e, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : e = h.createElementNS(e, r), e[Xt] = t, e[is] = o, id(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (h = dl(r, o), r) {
                case "dialog":
                  Le("cancel", e), Le("close", e), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Le("load", e), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ns.length; c++) Le(ns[c], e);
                  c = o;
                  break;
                case "source":
                  Le("error", e), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Le(
                    "error",
                    e
                  ), Le("load", e), c = o;
                  break;
                case "details":
                  Le("toggle", e), c = o;
                  break;
                case "input":
                  rn(e, o), c = ct(e, o), Le("invalid", e);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, c = V({}, o, { value: void 0 }), Le("invalid", e);
                  break;
                case "textarea":
                  $r(e, o), c = Jn(e, o), Le("invalid", e);
                  break;
                default:
                  c = o;
              }
              ul(r, c), y = c;
              for (u in y) if (y.hasOwnProperty(u)) {
                var w = y[u];
                u === "style" ? Qa(e, w) : u === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && Ya(e, w)) : u === "children" ? typeof w == "string" ? (r !== "textarea" || w !== "") && Dr(e, w) : typeof w == "number" && Dr(e, "" + w) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (d.hasOwnProperty(u) ? w != null && u === "onScroll" && Le("scroll", e) : w != null && _(e, u, w, h));
              }
              switch (r) {
                case "input":
                  B(e), Pr(e, o, !1);
                  break;
                case "textarea":
                  B(e), Mr(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ue(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, u = o.value, u != null ? Ut(e, !!o.multiple, u, !1) : o.defaultValue != null && Ut(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (e.onclick = ri);
              }
              switch (r) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return tt(t), null;
      case 6:
        if (e && t.stateNode != null) od(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(l(166));
          if (r = Zn(us.current), Zn(Zt.current), ui(t)) {
            if (o = t.stateNode, r = t.memoizedProps, o[Xt] = t, (u = o.nodeValue !== r) && (e = wt, e !== null)) switch (e.tag) {
              case 3:
                ni(o.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ni(o.nodeValue, r, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[Xt] = t, t.stateNode = o;
        }
        return tt(t), null;
      case 13:
        if (Re($e), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Oe && kt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) uu(), pr(), t.flags |= 98560, u = !1;
          else if (u = ui(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(l(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
              u[Xt] = t;
            } else pr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            tt(t), u = !1;
          } else _t !== null && (Zo(_t), _t = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || ($e.current & 1) !== 0 ? qe === 0 && (qe = 3) : qo())), t.updateQueue !== null && (t.flags |= 4), tt(t), null);
      case 4:
        return xr(), Ro(e, t), e === null && rs(t.stateNode.containerInfo), tt(t), null;
      case 10:
        return so(t.type._context), tt(t), null;
      case 17:
        return dt(t.type) && ii(), tt(t), null;
      case 19:
        if (Re($e), u = t.memoizedState, u === null) return tt(t), null;
        if (o = (t.flags & 128) !== 0, h = u.rendering, h === null) if (o) ms(u, !1);
        else {
          if (qe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (h = gi(e), h !== null) {
              for (t.flags |= 128, ms(u, !1), o = h.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, h = u.alternate, h === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = h.childLanes, u.lanes = h.lanes, u.child = h.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = h.memoizedProps, u.memoizedState = h.memoizedState, u.updateQueue = h.updateQueue, u.type = h.type, e = h.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
              return Te($e, $e.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && ze() > jr && (t.flags |= 128, o = !0, ms(u, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = gi(h), e !== null) {
            if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), ms(u, !0), u.tail === null && u.tailMode === "hidden" && !h.alternate && !Oe) return tt(t), null;
          } else 2 * ze() - u.renderingStartTime > jr && r !== 1073741824 && (t.flags |= 128, o = !0, ms(u, !1), t.lanes = 4194304);
          u.isBackwards ? (h.sibling = t.child, t.child = h) : (r = u.last, r !== null ? r.sibling = h : t.child = h, u.last = h);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = ze(), t.sibling = null, r = $e.current, Te($e, o ? r & 1 | 2 : r & 1), t) : (tt(t), null);
      case 22:
      case 23:
        return Bo(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (vt & 1073741824) !== 0 && (tt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : tt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function xp(e, t) {
    switch (Gl(t), t.tag) {
      case 1:
        return dt(t.type) && ii(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return xr(), Re(ut), Re(Je), fo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return co(t), null;
      case 13:
        if (Re($e), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(l(340));
          pr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Re($e), null;
      case 4:
        return xr(), null;
      case 10:
        return so(t.type._context), null;
      case 22:
      case 23:
        return Bo(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ni = !1, nt = !1, wp = typeof WeakSet == "function" ? WeakSet : Set, Q = null;
  function kr(e, t) {
    var r = e.ref;
    if (r !== null) if (typeof r == "function") try {
      r(null);
    } catch (o) {
      De(e, t, o);
    }
    else r.current = null;
  }
  function _o(e, t, r) {
    try {
      r();
    } catch (o) {
      De(e, t, o);
    }
  }
  var ad = !1;
  function kp(e, t) {
    if (Wl = qs, e = zc(), $l(e)) {
      if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        r = (r = e.ownerDocument) && r.defaultView || window;
        var o = r.getSelection && r.getSelection();
        if (o && o.rangeCount !== 0) {
          r = o.anchorNode;
          var c = o.anchorOffset, u = o.focusNode;
          o = o.focusOffset;
          try {
            r.nodeType, u.nodeType;
          } catch {
            r = null;
            break e;
          }
          var h = 0, y = -1, w = -1, T = 0, M = 0, D = e, P = null;
          t: for (; ; ) {
            for (var H; D !== r || c !== 0 && D.nodeType !== 3 || (y = h + c), D !== u || o !== 0 && D.nodeType !== 3 || (w = h + o), D.nodeType === 3 && (h += D.nodeValue.length), (H = D.firstChild) !== null; )
              P = D, D = H;
            for (; ; ) {
              if (D === e) break t;
              if (P === r && ++T === c && (y = h), P === u && ++M === o && (w = h), (H = D.nextSibling) !== null) break;
              D = P, P = D.parentNode;
            }
            D = H;
          }
          r = y === -1 || w === -1 ? null : { start: y, end: w };
        } else r = null;
      }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Bl = { focusedElem: e, selectionRange: r }, qs = !1, Q = t; Q !== null; ) if (t = Q, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Q = e;
    else for (; Q !== null; ) {
      t = Q;
      try {
        var K = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (K !== null) {
              var G = K.memoizedProps, Xe = K.memoizedState, N = t.stateNode, k = N.getSnapshotBeforeUpdate(t.elementType === t.type ? G : Ot(t.type, G), Xe);
              N.__reactInternalSnapshotBeforeUpdate = k;
            }
            break;
          case 3:
            var C = t.stateNode.containerInfo;
            C.nodeType === 1 ? C.textContent = "" : C.nodeType === 9 && C.documentElement && C.removeChild(C.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(l(163));
        }
      } catch (A) {
        De(t, t.return, A);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, Q = e;
        break;
      }
      Q = t.return;
    }
    return K = ad, ad = !1, K;
  }
  function gs(e, t, r) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & e) === e) {
          var u = c.destroy;
          c.destroy = void 0, u !== void 0 && _o(t, r, u);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ei(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var r = t = t.next;
      do {
        if ((r.tag & e) === e) {
          var o = r.create;
          r.destroy = o();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function Oo(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      switch (e.tag) {
        case 5:
          e = r;
          break;
        default:
          e = r;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function cd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, cd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Xt], delete t[is], delete t[Yl], delete t[np], delete t[rp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ud(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function dd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ud(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Po(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ri));
    else if (o !== 4 && (e = e.child, e !== null)) for (Po(e, t, r), e = e.sibling; e !== null; ) Po(e, t, r), e = e.sibling;
  }
  function $o(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for ($o(e, t, r), e = e.sibling; e !== null; ) $o(e, t, r), e = e.sibling;
  }
  var Qe = null, Pt = !1;
  function xn(e, t, r) {
    for (r = r.child; r !== null; ) fd(e, t, r), r = r.sibling;
  }
  function fd(e, t, r) {
    if (zt && typeof zt.onCommitFiberUnmount == "function") try {
      zt.onCommitFiberUnmount(Fs, r);
    } catch {
    }
    switch (r.tag) {
      case 5:
        nt || kr(r, t);
      case 6:
        var o = Qe, c = Pt;
        Qe = null, xn(e, t, r), Qe = o, Pt = c, Qe !== null && (Pt ? (e = Qe, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Qe.removeChild(r.stateNode));
        break;
      case 18:
        Qe !== null && (Pt ? (e = Qe, r = r.stateNode, e.nodeType === 8 ? Ul(e.parentNode, r) : e.nodeType === 1 && Ul(e, r), Yr(e)) : Ul(Qe, r.stateNode));
        break;
      case 4:
        o = Qe, c = Pt, Qe = r.stateNode.containerInfo, Pt = !0, xn(e, t, r), Qe = o, Pt = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!nt && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var u = c, h = u.destroy;
            u = u.tag, h !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && _o(r, t, h), c = c.next;
          } while (c !== o);
        }
        xn(e, t, r);
        break;
      case 1:
        if (!nt && (kr(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
        } catch (y) {
          De(r, t, y);
        }
        xn(e, t, r);
        break;
      case 21:
        xn(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (nt = (o = nt) || r.memoizedState !== null, xn(e, t, r), nt = o) : xn(e, t, r);
        break;
      default:
        xn(e, t, r);
    }
  }
  function hd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new wp()), t.forEach(function(o) {
        var c = Ip.bind(null, e, o);
        r.has(o) || (r.add(o), o.then(c, c));
      });
    }
  }
  function $t(e, t) {
    var r = t.deletions;
    if (r !== null) for (var o = 0; o < r.length; o++) {
      var c = r[o];
      try {
        var u = e, h = t, y = h;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 5:
              Qe = y.stateNode, Pt = !1;
              break e;
            case 3:
              Qe = y.stateNode.containerInfo, Pt = !0;
              break e;
            case 4:
              Qe = y.stateNode.containerInfo, Pt = !0;
              break e;
          }
          y = y.return;
        }
        if (Qe === null) throw Error(l(160));
        fd(u, h, c), Qe = null, Pt = !1;
        var w = c.alternate;
        w !== null && (w.return = null), c.return = null;
      } catch (T) {
        De(c, t, T);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) pd(t, e), t = t.sibling;
  }
  function pd(e, t) {
    var r = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ($t(t, e), Bt(e), o & 4) {
          try {
            gs(3, e, e.return), Ei(3, e);
          } catch (G) {
            De(e, e.return, G);
          }
          try {
            gs(5, e, e.return);
          } catch (G) {
            De(e, e.return, G);
          }
        }
        break;
      case 1:
        $t(t, e), Bt(e), o & 512 && r !== null && kr(r, r.return);
        break;
      case 5:
        if ($t(t, e), Bt(e), o & 512 && r !== null && kr(r, r.return), e.flags & 32) {
          var c = e.stateNode;
          try {
            Dr(c, "");
          } catch (G) {
            De(e, e.return, G);
          }
        }
        if (o & 4 && (c = e.stateNode, c != null)) {
          var u = e.memoizedProps, h = r !== null ? r.memoizedProps : u, y = e.type, w = e.updateQueue;
          if (e.updateQueue = null, w !== null) try {
            y === "input" && u.type === "radio" && u.name != null && _n(c, u), dl(y, h);
            var T = dl(y, u);
            for (h = 0; h < w.length; h += 2) {
              var M = w[h], D = w[h + 1];
              M === "style" ? Qa(c, D) : M === "dangerouslySetInnerHTML" ? Ya(c, D) : M === "children" ? Dr(c, D) : _(c, M, D, T);
            }
            switch (y) {
              case "input":
                On(c, u);
                break;
              case "textarea":
                $n(c, u);
                break;
              case "select":
                var P = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!u.multiple;
                var H = u.value;
                H != null ? Ut(c, !!u.multiple, H, !1) : P !== !!u.multiple && (u.defaultValue != null ? Ut(
                  c,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : Ut(c, !!u.multiple, u.multiple ? [] : "", !1));
            }
            c[is] = u;
          } catch (G) {
            De(e, e.return, G);
          }
        }
        break;
      case 6:
        if ($t(t, e), Bt(e), o & 4) {
          if (e.stateNode === null) throw Error(l(162));
          c = e.stateNode, u = e.memoizedProps;
          try {
            c.nodeValue = u;
          } catch (G) {
            De(e, e.return, G);
          }
        }
        break;
      case 3:
        if ($t(t, e), Bt(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
          Yr(t.containerInfo);
        } catch (G) {
          De(e, e.return, G);
        }
        break;
      case 4:
        $t(t, e), Bt(e);
        break;
      case 13:
        $t(t, e), Bt(e), c = e.child, c.flags & 8192 && (u = c.memoizedState !== null, c.stateNode.isHidden = u, !u || c.alternate !== null && c.alternate.memoizedState !== null || (Ao = ze())), o & 4 && hd(e);
        break;
      case 22:
        if (M = r !== null && r.memoizedState !== null, e.mode & 1 ? (nt = (T = nt) || M, $t(t, e), nt = T) : $t(t, e), Bt(e), o & 8192) {
          if (T = e.memoizedState !== null, (e.stateNode.isHidden = T) && !M && (e.mode & 1) !== 0) for (Q = e, M = e.child; M !== null; ) {
            for (D = Q = M; Q !== null; ) {
              switch (P = Q, H = P.child, P.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  gs(4, P, P.return);
                  break;
                case 1:
                  kr(P, P.return);
                  var K = P.stateNode;
                  if (typeof K.componentWillUnmount == "function") {
                    o = P, r = P.return;
                    try {
                      t = o, K.props = t.memoizedProps, K.state = t.memoizedState, K.componentWillUnmount();
                    } catch (G) {
                      De(o, r, G);
                    }
                  }
                  break;
                case 5:
                  kr(P, P.return);
                  break;
                case 22:
                  if (P.memoizedState !== null) {
                    yd(D);
                    continue;
                  }
              }
              H !== null ? (H.return = P, Q = H) : yd(D);
            }
            M = M.sibling;
          }
          e: for (M = null, D = e; ; ) {
            if (D.tag === 5) {
              if (M === null) {
                M = D;
                try {
                  c = D.stateNode, T ? (u = c.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (y = D.stateNode, w = D.memoizedProps.style, h = w != null && w.hasOwnProperty("display") ? w.display : null, y.style.display = Va("display", h));
                } catch (G) {
                  De(e, e.return, G);
                }
              }
            } else if (D.tag === 6) {
              if (M === null) try {
                D.stateNode.nodeValue = T ? "" : D.memoizedProps;
              } catch (G) {
                De(e, e.return, G);
              }
            } else if ((D.tag !== 22 && D.tag !== 23 || D.memoizedState === null || D === e) && D.child !== null) {
              D.child.return = D, D = D.child;
              continue;
            }
            if (D === e) break e;
            for (; D.sibling === null; ) {
              if (D.return === null || D.return === e) break e;
              M === D && (M = null), D = D.return;
            }
            M === D && (M = null), D.sibling.return = D.return, D = D.sibling;
          }
        }
        break;
      case 19:
        $t(t, e), Bt(e), o & 4 && hd(e);
        break;
      case 21:
        break;
      default:
        $t(
          t,
          e
        ), Bt(e);
    }
  }
  function Bt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (ud(r)) {
              var o = r;
              break e;
            }
            r = r.return;
          }
          throw Error(l(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (Dr(c, ""), o.flags &= -33);
            var u = dd(e);
            $o(e, u, c);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, y = dd(e);
            Po(e, y, h);
            break;
          default:
            throw Error(l(161));
        }
      } catch (w) {
        De(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function vp(e, t, r) {
    Q = e, md(e);
  }
  function md(e, t, r) {
    for (var o = (e.mode & 1) !== 0; Q !== null; ) {
      var c = Q, u = c.child;
      if (c.tag === 22 && o) {
        var h = c.memoizedState !== null || Ni;
        if (!h) {
          var y = c.alternate, w = y !== null && y.memoizedState !== null || nt;
          y = Ni;
          var T = nt;
          if (Ni = h, (nt = w) && !T) for (Q = c; Q !== null; ) h = Q, w = h.child, h.tag === 22 && h.memoizedState !== null ? xd(c) : w !== null ? (w.return = h, Q = w) : xd(c);
          for (; u !== null; ) Q = u, md(u), u = u.sibling;
          Q = c, Ni = y, nt = T;
        }
        gd(e);
      } else (c.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = c, Q = u) : gd(e);
    }
  }
  function gd(e) {
    for (; Q !== null; ) {
      var t = Q;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              nt || Ei(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !nt) if (r === null) o.componentDidMount();
              else {
                var c = t.elementType === t.type ? r.memoizedProps : Ot(t.type, r.memoizedProps);
                o.componentDidUpdate(c, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && yu(t, u, o);
              break;
            case 3:
              var h = t.updateQueue;
              if (h !== null) {
                if (r = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    r = t.child.stateNode;
                    break;
                  case 1:
                    r = t.child.stateNode;
                }
                yu(t, h, r);
              }
              break;
            case 5:
              var y = t.stateNode;
              if (r === null && t.flags & 4) {
                r = y;
                var w = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    w.autoFocus && r.focus();
                    break;
                  case "img":
                    w.src && (r.src = w.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var T = t.alternate;
                if (T !== null) {
                  var M = T.memoizedState;
                  if (M !== null) {
                    var D = M.dehydrated;
                    D !== null && Yr(D);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(l(163));
          }
          nt || t.flags & 512 && Oo(t);
        } catch (P) {
          De(t, t.return, P);
        }
      }
      if (t === e) {
        Q = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, Q = r;
        break;
      }
      Q = t.return;
    }
  }
  function yd(e) {
    for (; Q !== null; ) {
      var t = Q;
      if (t === e) {
        Q = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, Q = r;
        break;
      }
      Q = t.return;
    }
  }
  function xd(e) {
    for (; Q !== null; ) {
      var t = Q;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              Ei(4, t);
            } catch (w) {
              De(t, r, w);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = t.return;
              try {
                o.componentDidMount();
              } catch (w) {
                De(t, c, w);
              }
            }
            var u = t.return;
            try {
              Oo(t);
            } catch (w) {
              De(t, u, w);
            }
            break;
          case 5:
            var h = t.return;
            try {
              Oo(t);
            } catch (w) {
              De(t, h, w);
            }
        }
      } catch (w) {
        De(t, t.return, w);
      }
      if (t === e) {
        Q = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, Q = y;
        break;
      }
      Q = t.return;
    }
  }
  var jp = Math.ceil, Ci = U.ReactCurrentDispatcher, Mo = U.ReactCurrentOwner, Ct = U.ReactCurrentBatchConfig, ye = 0, Ye = null, We = null, Ke = 0, vt = 0, vr = hn(0), qe = 0, ys = null, Bn = 0, Ti = 0, Do = 0, xs = null, ht = null, Ao = 0, jr = 1 / 0, tn = null, Ii = !1, Fo = null, wn = null, Li = !1, kn = null, Ri = 0, ws = 0, zo = null, _i = -1, Oi = 0;
  function lt() {
    return (ye & 6) !== 0 ? ze() : _i !== -1 ? _i : _i = ze();
  }
  function vn(e) {
    return (e.mode & 1) === 0 ? 1 : (ye & 2) !== 0 && Ke !== 0 ? Ke & -Ke : ip.transition !== null ? (Oi === 0 && (Oi = dc()), Oi) : (e = Se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : kc(e.type)), e);
  }
  function Mt(e, t, r, o) {
    if (50 < ws) throw ws = 0, zo = null, Error(l(185));
    Wr(e, r, o), ((ye & 2) === 0 || e !== Ye) && (e === Ye && ((ye & 2) === 0 && (Ti |= r), qe === 4 && jn(e, Ke)), pt(e, o), r === 1 && ye === 0 && (t.mode & 1) === 0 && (jr = ze() + 500, oi && mn()));
  }
  function pt(e, t) {
    var r = e.callbackNode;
    i0(e, t);
    var o = Zs(e, e === Ye ? Ke : 0);
    if (o === 0) r !== null && ac(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (r != null && ac(r), t === 1) e.tag === 0 ? sp(kd.bind(null, e)) : iu(kd.bind(null, e)), ep(function() {
        (ye & 6) === 0 && mn();
      }), r = null;
      else {
        switch (fc(o)) {
          case 1:
            r = xl;
            break;
          case 4:
            r = cc;
            break;
          case 16:
            r = As;
            break;
          case 536870912:
            r = uc;
            break;
          default:
            r = As;
        }
        r = Td(r, wd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function wd(e, t) {
    if (_i = -1, Oi = 0, (ye & 6) !== 0) throw Error(l(327));
    var r = e.callbackNode;
    if (Sr() && e.callbackNode !== r) return null;
    var o = Zs(e, e === Ye ? Ke : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Pi(e, o);
    else {
      t = o;
      var c = ye;
      ye |= 2;
      var u = jd();
      (Ye !== e || Ke !== t) && (tn = null, jr = ze() + 500, Hn(e, t));
      do
        try {
          Np();
          break;
        } catch (y) {
          vd(e, y);
        }
      while (!0);
      ro(), Ci.current = u, ye = c, We !== null ? t = 0 : (Ye = null, Ke = 0, t = qe);
    }
    if (t !== 0) {
      if (t === 2 && (c = wl(e), c !== 0 && (o = c, t = Xo(e, c))), t === 1) throw r = ys, Hn(e, 0), jn(e, o), pt(e, ze()), r;
      if (t === 6) jn(e, o);
      else {
        if (c = e.current.alternate, (o & 30) === 0 && !Sp(c) && (t = Pi(e, o), t === 2 && (u = wl(e), u !== 0 && (o = u, t = Xo(e, u))), t === 1)) throw r = ys, Hn(e, 0), jn(e, o), pt(e, ze()), r;
        switch (e.finishedWork = c, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Un(e, ht, tn);
            break;
          case 3:
            if (jn(e, o), (o & 130023424) === o && (t = Ao + 500 - ze(), 10 < t)) {
              if (Zs(e, 0) !== 0) break;
              if (c = e.suspendedLanes, (c & o) !== o) {
                lt(), e.pingedLanes |= e.suspendedLanes & c;
                break;
              }
              e.timeoutHandle = Hl(Un.bind(null, e, ht, tn), t);
              break;
            }
            Un(e, ht, tn);
            break;
          case 4:
            if (jn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, c = -1; 0 < o; ) {
              var h = 31 - Lt(o);
              u = 1 << h, h = t[h], h > c && (c = h), o &= ~u;
            }
            if (o = c, o = ze() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * jp(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Hl(Un.bind(null, e, ht, tn), o);
              break;
            }
            Un(e, ht, tn);
            break;
          case 5:
            Un(e, ht, tn);
            break;
          default:
            throw Error(l(329));
        }
      }
    }
    return pt(e, ze()), e.callbackNode === r ? wd.bind(null, e) : null;
  }
  function Xo(e, t) {
    var r = xs;
    return e.current.memoizedState.isDehydrated && (Hn(e, t).flags |= 256), e = Pi(e, t), e !== 2 && (t = ht, ht = r, t !== null && Zo(t)), e;
  }
  function Zo(e) {
    ht === null ? ht = e : ht.push.apply(ht, e);
  }
  function Sp(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
          var c = r[o], u = c.getSnapshot;
          c = c.value;
          try {
            if (!Rt(u(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function jn(e, t) {
    for (t &= ~Do, t &= ~Ti, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - Lt(t), o = 1 << r;
      e[r] = -1, t &= ~o;
    }
  }
  function kd(e) {
    if ((ye & 6) !== 0) throw Error(l(327));
    Sr();
    var t = Zs(e, 0);
    if ((t & 1) === 0) return pt(e, ze()), null;
    var r = Pi(e, t);
    if (e.tag !== 0 && r === 2) {
      var o = wl(e);
      o !== 0 && (t = o, r = Xo(e, o));
    }
    if (r === 1) throw r = ys, Hn(e, 0), jn(e, t), pt(e, ze()), r;
    if (r === 6) throw Error(l(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Un(e, ht, tn), pt(e, ze()), null;
  }
  function Wo(e, t) {
    var r = ye;
    ye |= 1;
    try {
      return e(t);
    } finally {
      ye = r, ye === 0 && (jr = ze() + 500, oi && mn());
    }
  }
  function qn(e) {
    kn !== null && kn.tag === 0 && (ye & 6) === 0 && Sr();
    var t = ye;
    ye |= 1;
    var r = Ct.transition, o = Se;
    try {
      if (Ct.transition = null, Se = 1, e) return e();
    } finally {
      Se = o, Ct.transition = r, ye = t, (ye & 6) === 0 && mn();
    }
  }
  function Bo() {
    vt = vr.current, Re(vr);
  }
  function Hn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, J0(r)), We !== null) for (r = We.return; r !== null; ) {
      var o = r;
      switch (Gl(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ii();
          break;
        case 3:
          xr(), Re(ut), Re(Je), fo();
          break;
        case 5:
          co(o);
          break;
        case 4:
          xr();
          break;
        case 13:
          Re($e);
          break;
        case 19:
          Re($e);
          break;
        case 10:
          so(o.type._context);
          break;
        case 22:
        case 23:
          Bo();
      }
      r = r.return;
    }
    if (Ye = e, We = e = Sn(e.current, null), Ke = vt = t, qe = 0, ys = null, Do = Ti = Bn = 0, ht = xs = null, Xn !== null) {
      for (t = 0; t < Xn.length; t++) if (r = Xn[t], o = r.interleaved, o !== null) {
        r.interleaved = null;
        var c = o.next, u = r.pending;
        if (u !== null) {
          var h = u.next;
          u.next = c, o.next = h;
        }
        r.pending = o;
      }
      Xn = null;
    }
    return e;
  }
  function vd(e, t) {
    do {
      var r = We;
      try {
        if (ro(), yi.current = vi, xi) {
          for (var o = Me.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          xi = !1;
        }
        if (Wn = 0, Ue = Be = Me = null, ds = !1, fs = 0, Mo.current = null, r === null || r.return === null) {
          qe = 1, ys = t, We = null;
          break;
        }
        e: {
          var u = e, h = r.return, y = r, w = t;
          if (t = Ke, y.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var T = w, M = y, D = M.tag;
            if ((M.mode & 1) === 0 && (D === 0 || D === 11 || D === 15)) {
              var P = M.alternate;
              P ? (M.updateQueue = P.updateQueue, M.memoizedState = P.memoizedState, M.lanes = P.lanes) : (M.updateQueue = null, M.memoizedState = null);
            }
            var H = Hu(h);
            if (H !== null) {
              H.flags &= -257, Uu(H, h, y, u, t), H.mode & 1 && qu(u, T, t), t = H, w = T;
              var K = t.updateQueue;
              if (K === null) {
                var G = /* @__PURE__ */ new Set();
                G.add(w), t.updateQueue = G;
              } else K.add(w);
              break e;
            } else {
              if ((t & 1) === 0) {
                qu(u, T, t), qo();
                break e;
              }
              w = Error(l(426));
            }
          } else if (Oe && y.mode & 1) {
            var Xe = Hu(h);
            if (Xe !== null) {
              (Xe.flags & 65536) === 0 && (Xe.flags |= 256), Uu(Xe, h, y, u, t), to(wr(w, y));
              break e;
            }
          }
          u = w = wr(w, y), qe !== 4 && (qe = 2), xs === null ? xs = [u] : xs.push(u), u = h;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var N = Wu(u, w, t);
                gu(u, N);
                break e;
              case 1:
                y = w;
                var k = u.type, C = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof k.getDerivedStateFromError == "function" || C !== null && typeof C.componentDidCatch == "function" && (wn === null || !wn.has(C)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var A = Bu(u, y, t);
                  gu(u, A);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        bd(r);
      } catch (ee) {
        t = ee, We === r && r !== null && (We = r = r.return);
        continue;
      }
      break;
    } while (!0);
  }
  function jd() {
    var e = Ci.current;
    return Ci.current = vi, e === null ? vi : e;
  }
  function qo() {
    (qe === 0 || qe === 3 || qe === 2) && (qe = 4), Ye === null || (Bn & 268435455) === 0 && (Ti & 268435455) === 0 || jn(Ye, Ke);
  }
  function Pi(e, t) {
    var r = ye;
    ye |= 2;
    var o = jd();
    (Ye !== e || Ke !== t) && (tn = null, Hn(e, t));
    do
      try {
        bp();
        break;
      } catch (c) {
        vd(e, c);
      }
    while (!0);
    if (ro(), ye = r, Ci.current = o, We !== null) throw Error(l(261));
    return Ye = null, Ke = 0, qe;
  }
  function bp() {
    for (; We !== null; ) Sd(We);
  }
  function Np() {
    for (; We !== null && !Qh(); ) Sd(We);
  }
  function Sd(e) {
    var t = Cd(e.alternate, e, vt);
    e.memoizedProps = e.pendingProps, t === null ? bd(e) : We = t, Mo.current = null;
  }
  function bd(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (r = yp(r, t, vt), r !== null) {
          We = r;
          return;
        }
      } else {
        if (r = xp(r, t), r !== null) {
          r.flags &= 32767, We = r;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          qe = 6, We = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        We = t;
        return;
      }
      We = t = e;
    } while (t !== null);
    qe === 0 && (qe = 5);
  }
  function Un(e, t, r) {
    var o = Se, c = Ct.transition;
    try {
      Ct.transition = null, Se = 1, Ep(e, t, r, o);
    } finally {
      Ct.transition = c, Se = o;
    }
    return null;
  }
  function Ep(e, t, r, o) {
    do
      Sr();
    while (kn !== null);
    if ((ye & 6) !== 0) throw Error(l(327));
    r = e.finishedWork;
    var c = e.finishedLanes;
    if (r === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = r.lanes | r.childLanes;
    if (l0(e, u), e === Ye && (We = Ye = null, Ke = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || Li || (Li = !0, Td(As, function() {
      return Sr(), null;
    })), u = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || u) {
      u = Ct.transition, Ct.transition = null;
      var h = Se;
      Se = 1;
      var y = ye;
      ye |= 4, Mo.current = null, kp(e, r), pd(r, e), H0(Bl), qs = !!Wl, Bl = Wl = null, e.current = r, vp(r), Kh(), ye = y, Se = h, Ct.transition = u;
    } else e.current = r;
    if (Li && (Li = !1, kn = e, Ri = c), u = e.pendingLanes, u === 0 && (wn = null), e0(r.stateNode), pt(e, ze()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) c = t[r], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Ii) throw Ii = !1, e = Fo, Fo = null, e;
    return (Ri & 1) !== 0 && e.tag !== 0 && Sr(), u = e.pendingLanes, (u & 1) !== 0 ? e === zo ? ws++ : (ws = 0, zo = e) : ws = 0, mn(), null;
  }
  function Sr() {
    if (kn !== null) {
      var e = fc(Ri), t = Ct.transition, r = Se;
      try {
        if (Ct.transition = null, Se = 16 > e ? 16 : e, kn === null) var o = !1;
        else {
          if (e = kn, kn = null, Ri = 0, (ye & 6) !== 0) throw Error(l(331));
          var c = ye;
          for (ye |= 4, Q = e.current; Q !== null; ) {
            var u = Q, h = u.child;
            if ((Q.flags & 16) !== 0) {
              var y = u.deletions;
              if (y !== null) {
                for (var w = 0; w < y.length; w++) {
                  var T = y[w];
                  for (Q = T; Q !== null; ) {
                    var M = Q;
                    switch (M.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gs(8, M, u);
                    }
                    var D = M.child;
                    if (D !== null) D.return = M, Q = D;
                    else for (; Q !== null; ) {
                      M = Q;
                      var P = M.sibling, H = M.return;
                      if (cd(M), M === T) {
                        Q = null;
                        break;
                      }
                      if (P !== null) {
                        P.return = H, Q = P;
                        break;
                      }
                      Q = H;
                    }
                  }
                }
                var K = u.alternate;
                if (K !== null) {
                  var G = K.child;
                  if (G !== null) {
                    K.child = null;
                    do {
                      var Xe = G.sibling;
                      G.sibling = null, G = Xe;
                    } while (G !== null);
                  }
                }
                Q = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && h !== null) h.return = u, Q = h;
            else e: for (; Q !== null; ) {
              if (u = Q, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  gs(9, u, u.return);
              }
              var N = u.sibling;
              if (N !== null) {
                N.return = u.return, Q = N;
                break e;
              }
              Q = u.return;
            }
          }
          var k = e.current;
          for (Q = k; Q !== null; ) {
            h = Q;
            var C = h.child;
            if ((h.subtreeFlags & 2064) !== 0 && C !== null) C.return = h, Q = C;
            else e: for (h = k; Q !== null; ) {
              if (y = Q, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ei(9, y);
                }
              } catch (ee) {
                De(y, y.return, ee);
              }
              if (y === h) {
                Q = null;
                break e;
              }
              var A = y.sibling;
              if (A !== null) {
                A.return = y.return, Q = A;
                break e;
              }
              Q = y.return;
            }
          }
          if (ye = c, mn(), zt && typeof zt.onPostCommitFiberRoot == "function") try {
            zt.onPostCommitFiberRoot(Fs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Se = r, Ct.transition = t;
      }
    }
    return !1;
  }
  function Nd(e, t, r) {
    t = wr(r, t), t = Wu(e, t, 1), e = yn(e, t, 1), t = lt(), e !== null && (Wr(e, 1, t), pt(e, t));
  }
  function De(e, t, r) {
    if (e.tag === 3) Nd(e, e, r);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Nd(t, e, r);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (wn === null || !wn.has(o))) {
          e = wr(r, e), e = Bu(t, e, 1), t = yn(t, e, 1), e = lt(), t !== null && (Wr(t, 1, e), pt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Cp(e, t, r) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = lt(), e.pingedLanes |= e.suspendedLanes & r, Ye === e && (Ke & r) === r && (qe === 4 || qe === 3 && (Ke & 130023424) === Ke && 500 > ze() - Ao ? Hn(e, 0) : Do |= r), pt(e, t);
  }
  function Ed(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Xs, Xs <<= 1, (Xs & 130023424) === 0 && (Xs = 4194304)));
    var r = lt();
    e = Gt(e, t), e !== null && (Wr(e, t, r), pt(e, r));
  }
  function Tp(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), Ed(e, r);
  }
  function Ip(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, c = e.memoizedState;
        c !== null && (r = c.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(t), Ed(e, r);
  }
  var Cd;
  Cd = function(e, t, r) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || ut.current) ft = !0;
    else {
      if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return ft = !1, gp(e, t, r);
      ft = (e.flags & 131072) !== 0;
    }
    else ft = !1, Oe && (t.flags & 1048576) !== 0 && lu(t, ci, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        bi(e, t), e = t.pendingProps;
        var c = dr(t, Je.current);
        yr(t, r), c = mo(null, t, o, e, c, r);
        var u = go();
        return t.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, dt(o) ? (u = !0, li(t)) : u = !1, t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, oo(t), c.updater = ji, t.stateNode = c, c._reactInternals = t, jo(t, o, e, r), t = Eo(null, t, o, !0, u, r)) : (t.tag = 0, Oe && u && Kl(t), it(null, t, c, r), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (bi(e, t), e = t.pendingProps, c = o._init, o = c(o._payload), t.type = o, c = t.tag = Rp(o), e = Ot(o, e), c) {
            case 0:
              t = No(null, t, o, e, r);
              break e;
            case 1:
              t = Ju(null, t, o, e, r);
              break e;
            case 11:
              t = Yu(null, t, o, e, r);
              break e;
            case 14:
              t = Vu(null, t, o, Ot(o.type, e), r);
              break e;
          }
          throw Error(l(
            306,
            o,
            ""
          ));
        }
        return t;
      case 0:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Ot(o, c), No(e, t, o, c, r);
      case 1:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Ot(o, c), Ju(e, t, o, c, r);
      case 3:
        e: {
          if (ed(t), e === null) throw Error(l(387));
          o = t.pendingProps, u = t.memoizedState, c = u.element, mu(e, t), mi(t, o, null, r);
          var h = t.memoizedState;
          if (o = h.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            c = wr(Error(l(423)), t), t = td(e, t, o, r, c);
            break e;
          } else if (o !== c) {
            c = wr(Error(l(424)), t), t = td(e, t, o, r, c);
            break e;
          } else for (kt = fn(t.stateNode.containerInfo.firstChild), wt = t, Oe = !0, _t = null, r = hu(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if (pr(), o === c) {
              t = en(e, t, r);
              break e;
            }
            it(e, t, o, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return xu(t), e === null && eo(t), o = t.type, c = t.pendingProps, u = e !== null ? e.memoizedProps : null, h = c.children, ql(o, c) ? h = null : u !== null && ql(o, u) && (t.flags |= 32), Gu(e, t), it(e, t, h, r), t.child;
      case 6:
        return e === null && eo(t), null;
      case 13:
        return nd(e, t, r);
      case 4:
        return ao(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = mr(t, null, o, r) : it(e, t, o, r), t.child;
      case 11:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Ot(o, c), Yu(e, t, o, c, r);
      case 7:
        return it(e, t, t.pendingProps, r), t.child;
      case 8:
        return it(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return it(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (o = t.type._context, c = t.pendingProps, u = t.memoizedProps, h = c.value, Te(fi, o._currentValue), o._currentValue = h, u !== null) if (Rt(u.value, h)) {
            if (u.children === c.children && !ut.current) {
              t = en(e, t, r);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var y = u.dependencies;
            if (y !== null) {
              h = u.child;
              for (var w = y.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (u.tag === 1) {
                    w = Jt(-1, r & -r), w.tag = 2;
                    var T = u.updateQueue;
                    if (T !== null) {
                      T = T.shared;
                      var M = T.pending;
                      M === null ? w.next = w : (w.next = M.next, M.next = w), T.pending = w;
                    }
                  }
                  u.lanes |= r, w = u.alternate, w !== null && (w.lanes |= r), io(
                    u.return,
                    r,
                    t
                  ), y.lanes |= r;
                  break;
                }
                w = w.next;
              }
            } else if (u.tag === 10) h = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (h = u.return, h === null) throw Error(l(341));
              h.lanes |= r, y = h.alternate, y !== null && (y.lanes |= r), io(h, r, t), h = u.sibling;
            } else h = u.child;
            if (h !== null) h.return = u;
            else for (h = u; h !== null; ) {
              if (h === t) {
                h = null;
                break;
              }
              if (u = h.sibling, u !== null) {
                u.return = h.return, h = u;
                break;
              }
              h = h.return;
            }
            u = h;
          }
          it(e, t, c.children, r), t = t.child;
        }
        return t;
      case 9:
        return c = t.type, o = t.pendingProps.children, yr(t, r), c = Nt(c), o = o(c), t.flags |= 1, it(e, t, o, r), t.child;
      case 14:
        return o = t.type, c = Ot(o, t.pendingProps), c = Ot(o.type, c), Vu(e, t, o, c, r);
      case 15:
        return Qu(e, t, t.type, t.pendingProps, r);
      case 17:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Ot(o, c), bi(e, t), t.tag = 1, dt(o) ? (e = !0, li(t)) : e = !1, yr(t, r), Xu(t, o, c), jo(t, o, c, r), Eo(null, t, o, !0, e, r);
      case 19:
        return sd(e, t, r);
      case 22:
        return Ku(e, t, r);
    }
    throw Error(l(156, t.tag));
  };
  function Td(e, t) {
    return oc(e, t);
  }
  function Lp(e, t, r, o) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tt(e, t, r, o) {
    return new Lp(e, t, r, o);
  }
  function Ho(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Rp(e) {
    if (typeof e == "function") return Ho(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === he) return 11;
      if (e === at) return 14;
    }
    return 2;
  }
  function Sn(e, t) {
    var r = e.alternate;
    return r === null ? (r = Tt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function $i(e, t, r, o, c, u) {
    var h = 2;
    if (o = e, typeof e == "function") Ho(e) && (h = 1);
    else if (typeof e == "string") h = 5;
    else e: switch (e) {
      case W:
        return Yn(r.children, c, u, t);
      case te:
        h = 8, c |= 8;
        break;
      case we:
        return e = Tt(12, r, t, c | 2), e.elementType = we, e.lanes = u, e;
      case ve:
        return e = Tt(13, r, t, c), e.elementType = ve, e.lanes = u, e;
      case be:
        return e = Tt(19, r, t, c), e.elementType = be, e.lanes = u, e;
      case Ee:
        return Mi(r, c, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Y:
            h = 10;
            break e;
          case q:
            h = 9;
            break e;
          case he:
            h = 11;
            break e;
          case at:
            h = 14;
            break e;
          case Ze:
            h = 16, o = null;
            break e;
        }
        throw Error(l(130, e == null ? e : typeof e, ""));
    }
    return t = Tt(h, r, t, c), t.elementType = e, t.type = o, t.lanes = u, t;
  }
  function Yn(e, t, r, o) {
    return e = Tt(7, e, o, t), e.lanes = r, e;
  }
  function Mi(e, t, r, o) {
    return e = Tt(22, e, o, t), e.elementType = Ee, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
  }
  function Uo(e, t, r) {
    return e = Tt(6, e, null, t), e.lanes = r, e;
  }
  function Yo(e, t, r) {
    return t = Tt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function _p(e, t, r, o, c) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = kl(0), this.expirationTimes = kl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = kl(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function Vo(e, t, r, o, c, u, h, y, w) {
    return e = new _p(e, t, r, y, w), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = Tt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, oo(u), e;
  }
  function Op(e, t, r) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ne, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
  }
  function Id(e) {
    if (!e) return pn;
    e = e._reactInternals;
    e: {
      if (Mn(e) !== e || e.tag !== 1) throw Error(l(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (dt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(l(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (dt(r)) return ru(e, r, t);
    }
    return t;
  }
  function Ld(e, t, r, o, c, u, h, y, w) {
    return e = Vo(r, o, !0, e, c, u, h, y, w), e.context = Id(null), r = e.current, o = lt(), c = vn(r), u = Jt(o, c), u.callback = t ?? null, yn(r, u, c), e.current.lanes = c, Wr(e, c, o), pt(e, o), e;
  }
  function Di(e, t, r, o) {
    var c = t.current, u = lt(), h = vn(c);
    return r = Id(r), t.context === null ? t.context = r : t.pendingContext = r, t = Jt(u, h), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = yn(c, t, h), e !== null && (Mt(e, c, h, u), pi(e, c, h)), h;
  }
  function Ai(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Rd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function Qo(e, t) {
    Rd(e, t), (e = e.alternate) && Rd(e, t);
  }
  function Pp() {
    return null;
  }
  var _d = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ko(e) {
    this._internalRoot = e;
  }
  Fi.prototype.render = Ko.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    Di(e, t, null, null);
  }, Fi.prototype.unmount = Ko.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      qn(function() {
        Di(null, e, null, null);
      }), t[Yt] = null;
    }
  };
  function Fi(e) {
    this._internalRoot = e;
  }
  Fi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = mc();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < cn.length && t !== 0 && t < cn[r].priority; r++) ;
      cn.splice(r, 0, e), r === 0 && xc(e);
    }
  };
  function Go(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function zi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Od() {
  }
  function $p(e, t, r, o, c) {
    if (c) {
      if (typeof o == "function") {
        var u = o;
        o = function() {
          var T = Ai(h);
          u.call(T);
        };
      }
      var h = Ld(t, o, e, 0, null, !1, !1, "", Od);
      return e._reactRootContainer = h, e[Yt] = h.current, rs(e.nodeType === 8 ? e.parentNode : e), qn(), h;
    }
    for (; c = e.lastChild; ) e.removeChild(c);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var T = Ai(w);
        y.call(T);
      };
    }
    var w = Vo(e, 0, !1, null, null, !1, !1, "", Od);
    return e._reactRootContainer = w, e[Yt] = w.current, rs(e.nodeType === 8 ? e.parentNode : e), qn(function() {
      Di(t, w, r, o);
    }), w;
  }
  function Xi(e, t, r, o, c) {
    var u = r._reactRootContainer;
    if (u) {
      var h = u;
      if (typeof c == "function") {
        var y = c;
        c = function() {
          var w = Ai(h);
          y.call(w);
        };
      }
      Di(t, h, e, c);
    } else h = $p(r, t, e, c, o);
    return Ai(h);
  }
  hc = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Zr(t.pendingLanes);
          r !== 0 && (vl(t, r | 1), pt(t, ze()), (ye & 6) === 0 && (jr = ze() + 500, mn()));
        }
        break;
      case 13:
        qn(function() {
          var o = Gt(e, 1);
          if (o !== null) {
            var c = lt();
            Mt(o, e, 1, c);
          }
        }), Qo(e, 1);
    }
  }, jl = function(e) {
    if (e.tag === 13) {
      var t = Gt(e, 134217728);
      if (t !== null) {
        var r = lt();
        Mt(t, e, 134217728, r);
      }
      Qo(e, 134217728);
    }
  }, pc = function(e) {
    if (e.tag === 13) {
      var t = vn(e), r = Gt(e, t);
      if (r !== null) {
        var o = lt();
        Mt(r, e, t, o);
      }
      Qo(e, t);
    }
  }, mc = function() {
    return Se;
  }, gc = function(e, t) {
    var r = Se;
    try {
      return Se = e, t();
    } finally {
      Se = r;
    }
  }, pl = function(e, t, r) {
    switch (t) {
      case "input":
        if (On(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; ) r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var o = r[t];
            if (o !== e && o.form === e.form) {
              var c = si(o);
              if (!c) throw Error(l(90));
              Ce(o), On(o, c);
            }
          }
        }
        break;
      case "textarea":
        $n(e, r);
        break;
      case "select":
        t = r.value, t != null && Ut(e, !!r.multiple, t, !1);
    }
  }, ec = Wo, tc = qn;
  var Mp = { usingClientEntryPoint: !1, Events: [ls, cr, si, Ga, Ja, Wo] }, ks = { findFiberByHostInstance: Dn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Dp = { bundleType: ks.bundleType, version: ks.version, rendererPackageName: ks.rendererPackageName, rendererConfig: ks.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: U.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = ic(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: ks.findFiberByHostInstance || Pp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zi.isDisabled && Zi.supportsFiber) try {
      Fs = Zi.inject(Dp), zt = Zi;
    } catch {
    }
  }
  return mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mp, mt.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Go(t)) throw Error(l(200));
    return Op(e, t, null, r);
  }, mt.createRoot = function(e, t) {
    if (!Go(e)) throw Error(l(299));
    var r = !1, o = "", c = _d;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Vo(e, 1, !1, null, null, r, !1, o, c), e[Yt] = t.current, rs(e.nodeType === 8 ? e.parentNode : e), new Ko(t);
  }, mt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = ic(t), e = e === null ? null : e.stateNode, e;
  }, mt.flushSync = function(e) {
    return qn(e);
  }, mt.hydrate = function(e, t, r) {
    if (!zi(t)) throw Error(l(200));
    return Xi(null, e, t, !0, r);
  }, mt.hydrateRoot = function(e, t, r) {
    if (!Go(e)) throw Error(l(405));
    var o = r != null && r.hydratedSources || null, c = !1, u = "", h = _d;
    if (r != null && (r.unstable_strictMode === !0 && (c = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (h = r.onRecoverableError)), t = Ld(t, null, e, 1, r ?? null, c, !1, u, h), e[Yt] = t.current, rs(e), o) for (e = 0; e < o.length; e++) r = o[e], c = r._getVersion, c = c(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, c] : t.mutableSourceEagerHydrationData.push(
      r,
      c
    );
    return new Fi(t);
  }, mt.render = function(e, t, r) {
    if (!zi(t)) throw Error(l(200));
    return Xi(null, e, t, !1, r);
  }, mt.unmountComponentAtNode = function(e) {
    if (!zi(e)) throw Error(l(40));
    return e._reactRootContainer ? (qn(function() {
      Xi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Yt] = null;
      });
    }), !0) : !1;
  }, mt.unstable_batchedUpdates = Wo, mt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
    if (!zi(r)) throw Error(l(200));
    if (e == null || e._reactInternals === void 0) throw Error(l(38));
    return Xi(e, t, r, !1, o);
  }, mt.version = "18.3.1-next-f1338f8080-20240426", mt;
}
var Xd;
function Mf() {
  if (Xd) return ta.exports;
  Xd = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (s) {
        console.error(s);
      }
  }
  return n(), ta.exports = Bp(), ta.exports;
}
var Zd;
function qp() {
  if (Zd) return Wi;
  Zd = 1;
  var n = Mf();
  return Wi.createRoot = n.createRoot, Wi.hydrateRoot = n.hydrateRoot, Wi;
}
var Hp = qp();
function Df(n) {
  return n !== "I";
}
const Cs = 2, Af = /* @__PURE__ */ JSON.parse(`[{"allowed":["X"],"briefing":"Welcome to dispatch. Three city blocks stand in a row with two alarm stations between them. Our arsonist, Noise, only lights red fires here (X errors). A station rings when exactly one of its two blocks is burning. Read the alarms, then send one red crew.","budget":1,"challenge":{"circuit":[],"error":"IXI"},"code":"rep3","debrief":{"detectable":"At least one station is still ringing: either the original fire is still burning, or a crew lit a new one on a safe block. Replay the original alarms: both stations rang, and block 1 is the only block they share.","logical-error":"Every alarm is quiet, yet the pattern left behind is a full logical flip (XXX). A crew sent to a safe block starts a fire of its own, so silence alone never proves safety. Compare your dispatch with the alarms in the replay.","success":"Both stations rang, and block 1 is the only block they share. Your red crew met the fire head on, and two red flames cancel (X·X = I). The logical qubit is safe."},"expected":{"minWeightCorrection":"IXI","minWeightVerdict":"success","propagated":"IXI","syndrome":[1,1]},"id":"first-alarm","index":1,"kind":"dispatch","title":"First Alarm","training":[{"caption":"A red fire (X) on block 0. Station Z0 watches blocks 0 and 1, sees exactly one fire, and rings. Station Z1 watches blocks 1 and 2, sees none, and stays quiet.","circuit":[],"error":"XII"}]},{"allowed":["X","Z","Y"],"briefing":"Fires never spread on their own; gates carry them. A CNOT copies a red fire (X) from its control to its target, and copies a blue fire (Z) from its target back to its control. Watch the training runs, then predict where the fires end up and send crews there.","budget":2,"challenge":{"circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XZ"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"There are no alarm stations on bare wires, so any fire you missed, or lit by mistake, acts directly on the data. Check both colours on each block: a Y fire needs both a red and a blue component to put it out.","success":"Red went forward and blue went backward at the same time, so XZ became YY: a red-and-blue fire on both blocks. Your crews matched every component, and nothing remains."},"expected":{"minWeightCorrection":"YY","minWeightVerdict":"success","propagated":"YY","syndrome":[]},"id":"red-forward-blue-backward","index":2,"kind":"propagation","title":"Red Forward / Blue Backward","training":[{"caption":"Red forward: a red fire (X) on the control copies onto the target. XI becomes XX.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XI"},{"caption":"Blue backward: a blue fire (Z) on the target copies onto the control. IZ becomes ZZ.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"IZ"}]},{"allowed":["X","Z","Y"],"briefing":"A Hadamard gate swaps colours: red becomes blue and blue becomes red, on its own wire only. Combined with a CNOT, a single fire can change colour, copy itself, and change colour again. Follow the circuit one gate at a time.","budget":2,"challenge":{"circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1},{"kind":"H","q":1}],"error":"ZI"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"One of the fires ended up with a different colour, or on a different block, than you dispatched for. Replay the circuit: H swaps colours only on its own wire, and CNOT copies red forward and blue backward.","success":"ZI turned into XI at the first Hadamard, copied forward to XX through the CNOT, and the final Hadamard on block 1 turned that copy blue: XZ. You traced the whole path."},"expected":{"minWeightCorrection":"XZ","minWeightVerdict":"success","propagated":"XZ","syndrome":[]},"id":"color-switch","index":3,"kind":"propagation","title":"Color Switch","training":[{"caption":"Colour switch: a Hadamard turns the red fire (X) on block 0 into a blue one (Z). XI becomes ZI.","circuit":[{"kind":"H","q":0}],"error":"XI"},{"caption":"Blue turns red at the H, then red copies forward through the CNOT. ZI becomes XX.","circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1}],"error":"ZI"}]},{"allowed":["X","Z"],"briefing":"Welcome to the surface code district: nine blocks and eight alarm stations. Red stations (Z checks, diamonds) notice red fires; blue stations (X checks, squares) notice blue fires. This time the fire is hidden. Read the alarms and send one crew.","budget":1,"challenge":{"circuit":[],"error":"IIIIXIIII"},"code":"rsc3","debrief":{"detectable":"Alarms are still ringing. A red crew on a block that was not burning starts a new fire, and a blue crew cannot put out a red fire at all. Match the crew colour to the station type, then find the block that every ringing station shares.","logical-error":"The alarms went quiet, but the pattern left behind acts as a logical operator on the encoded qubit. With one hidden fire and one crew this cannot happen in this district; Silent Failure shows when it does.","success":"Stations Z0 and Z1 both rang, and block 4 is the only block they share. One red crew, fire out, logical qubit safe."},"expected":{"minWeightCorrection":"IIIIXIIII","minWeightVerdict":"success","propagated":"IIIIXIIII","syndrome":[1,1,0,0,0,0,0,0]},"id":"blind-dispatch","index":4,"kind":"dispatch","title":"Blind Dispatch","training":[{"caption":"A red fire (X) on block 0 rings only station Z0, which watches blocks 0, 1, 3 and 4. A fire on block 3 alone would ring exactly the same station, so a crew sent to block 3 is just as good a fix: the two dispatches differ by a stabilizer (the X2 station's own pattern), which the code does not care about.","circuit":[],"error":"XIIIIIIII"}]},{"allowed":["X","Z"],"briefing":"Two fires this time, and they may be different colours. Red stations only ever notice red fires and blue stations only blue ones, so read the two alarm maps separately. You have two crews of any colour, and each block takes at most one crew.","budget":2,"challenge":{"circuit":[],"error":"IXIIIIIZI"},"code":"rsc3","debrief":{"detectable":"Some stations are still ringing. Remember that a red station never sees a blue fire: solve the red alarms and the blue alarms as two separate puzzles, one crew colour each.","logical-error":"Every alarm is quiet but the leftover pattern is a logical operator: your crews and the fires together form a chain across the district instead of cancelling. The replay shows where the chain runs.","success":"Red stations Z0 and Z2 share only block 1. Blue station X1 rang alone, which points at its boundary pair, blocks 6 and 7; a blue crew on either one works, because the two choices differ by a stabilizer. Two colours, two fires, both out."},"expected":{"minWeightCorrection":"IXIIIIZII","minWeightVerdict":"success","propagated":"IXIIIIIZI","syndrome":[1,0,1,0,0,1,0,0]},"id":"two-kinds-of-trouble","index":5,"kind":"dispatch","title":"Two Kinds of Trouble","training":[]},{"allowed":["X","Z"],"briefing":"Only one alarm is ringing: station Z0. Dispatch protocol is simple: send the smallest crew that silences every station. Make the call, and then we will look at what really happened.","budget":2,"challenge":{"circuit":[],"error":"IXXIIIIII"},"code":"rsc3","debrief":{"detectable":"Stations are still ringing, so the smallest silencing crew was not sent. Protocol for a lone Z0 alarm is one red crew on block 0 or block 3 (equivalent choices); replay the alarms and compare.","logical-error":"That was the optimal call. Only Z0 rang, and the best explanation of one alarm is one fire, on block 0 or block 3 (the two differ by a stabilizer, so either crew is the same call). But Noise lit two fires, on blocks 1 and 2. Your crew plus those two fires form a red chain across the top of the district — X on blocks 0, 1, 2 or the equivalent chain through block 3 — a logical X, which every station sees as an even count and so cannot detect. This code has distance 3: any single fire is always fixed, but two fires can fool any dispatcher, because no alarm pattern justified sending crews to blocks 1 and 2. That is why real machines use bigger codes.","success":"You put out both fires, on blocks 1 and 2. Honest question: how did you know? The alarms were identical to a single fire on block 0 or block 3, so this was a guess that happened to land. Protocol would still send one crew to block 0 or block 3, and this mission awards one star at most: the alarms alone cannot win it."},"expected":{"minWeightCorrection":"XIIIIIIII","minWeightVerdict":"logical-error","propagated":"IXXIIIIII","syndrome":[1,0,0,0,0,0,0,0]},"id":"silent-failure","index":6,"kind":"dispatch","maxStars":1,"title":"Silent Failure","training":[]}]`), Up = ["I", "X", "Z", "Y"], Ki = 30;
function Yp(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(n)}`);
}
function nl(n, s) {
  if (!Number.isInteger(n) || n < 0 || n >= s) throw new RangeError(`qubit index ${String(n)} out of range for n=${String(s)}`);
}
function Ff(n) {
  return n === "I" || n === "X" || n === "Y" || n === "Z";
}
function Ts(n) {
  switch (n) {
    case "I":
      return { x: 0, z: 0 };
    case "X":
      return { x: 1, z: 0 };
    case "Z":
      return { x: 0, z: 1 };
    case "Y":
      return { x: 1, z: 1 };
  }
}
function Ca(n, s) {
  return Up[n & 1 | (s & 1) << 1] ?? "I";
}
function rl(n) {
  return Yp(n), { n, x: new Uint8Array(n), z: new Uint8Array(n) };
}
function Ae(n) {
  const s = n.length, l = new Uint8Array(s), a = new Uint8Array(s);
  for (let d = 0; d < s; d++) {
    const f = n[d] ?? "";
    if (!Ff(f)) throw new Error(`invalid Pauli letter '${f}' at position ${String(d)} in "${n}"`);
    const p = Ts(f);
    l[d] = p.x, a[d] = p.z;
  }
  return { n: s, x: l, z: a };
}
function _e(n) {
  let s = "";
  for (let l = 0; l < n.n; l++) s += Ca(n.x[l] ?? 0, n.z[l] ?? 0);
  return s;
}
function sl(n) {
  return { n: n.n, x: new Uint8Array(n.x), z: new Uint8Array(n.z) };
}
function Vp(n) {
  for (let s = 0; s < n.n; s++) if ((n.x[s] ?? 0) !== 0 || (n.z[s] ?? 0) !== 0) return !1;
  return !0;
}
function Ta(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot multiply Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  const l = new Uint8Array(n.n), a = new Uint8Array(n.n);
  for (let d = 0; d < n.n; d++)
    l[d] = (n.x[d] ?? 0) ^ (s.x[d] ?? 0), a[d] = (n.z[d] ?? 0) ^ (s.z[d] ?? 0);
  return { n: n.n, x: l, z: a };
}
function yt(n) {
  let s = 0;
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s++;
  return s;
}
function Ht(n) {
  const s = [];
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s.push(l);
  return s;
}
function zf(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot compare Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  let l = 0;
  for (let a = 0; a < n.n; a++)
    l ^= (n.x[a] ?? 0) & (s.z[a] ?? 0) ^ (n.z[a] ?? 0) & (s.x[a] ?? 0);
  return l & 1;
}
function Wd(n, s) {
  return zf(n, s) === 1;
}
function Dt(n, s) {
  return nl(s, n.n), Ca(n.x[s] ?? 0, n.z[s] ?? 0);
}
function Qp(n, s, l) {
  nl(s, n.n);
  const a = sl(n), d = Ts(l);
  return a.x[s] = d.x, a.z[s] = d.z, a;
}
function Kp(n, s, l) {
  const a = rl(n), d = /* @__PURE__ */ new Set(), f = Ts(s);
  for (const p of l) {
    if (nl(p, n), d.has(p)) throw new RangeError(`duplicate qubit ${String(p)} in support`);
    d.add(p), a.x[p] = f.x, a.z[p] = f.z;
  }
  return a;
}
function Bd(n) {
  if (n.n > Ki) throw new RangeError(`masks support at most ${String(Ki)} qubits`);
  let s = 0, l = 0;
  for (let a = 0; a < n.n; a++)
    (n.x[a] ?? 0) !== 0 && (s |= 1 << a), (n.z[a] ?? 0) !== 0 && (l |= 1 << a);
  return { x: s, z: l };
}
function Gp(n, s, l) {
  if (n > Ki) throw new RangeError(`masks support at most ${String(Ki)} qubits`);
  const a = rl(n);
  for (let d = 0; d < n; d++)
    a.x[d] = s >>> d & 1, a.z[d] = l >>> d & 1;
  return a;
}
function Xf(n) {
  const s = new Uint8Array(2 * n.n);
  return s.set(n.x, 0), s.set(n.z, n.n), s;
}
function Jp(n) {
  switch (n.kind) {
    case "H":
    case "S":
      return [n.q];
    case "CNOT":
      return [n.c, n.t];
    case "CZ":
    case "SWAP":
      return [n.a, n.b];
  }
}
function Zf(n, s) {
  const l = Jp(n);
  for (const a of l) nl(a, s);
  if (l.length === 2 && l[0] === l[1])
    throw new RangeError(`${n.kind} needs two distinct qubits, got ${String(l[0])} twice`);
}
function ya(n, s) {
  for (const l of n) Zf(l, s);
}
function em(n, s) {
  Zf(s, n.n);
  const l = sl(n), { x: a, z: d } = l;
  switch (s.kind) {
    case "H": {
      const f = s.q, p = a[f] ?? 0;
      a[f] = d[f] ?? 0, d[f] = p;
      break;
    }
    case "S": {
      const f = s.q;
      d[f] = (d[f] ?? 0) ^ (a[f] ?? 0);
      break;
    }
    case "CNOT": {
      const { c: f, t: p } = s;
      a[p] = (a[p] ?? 0) ^ (a[f] ?? 0), d[f] = (d[f] ?? 0) ^ (d[p] ?? 0);
      break;
    }
    case "CZ": {
      const { a: f, b: p } = s, x = a[f] ?? 0, g = a[p] ?? 0;
      d[f] = (d[f] ?? 0) ^ g, d[p] = (d[p] ?? 0) ^ x;
      break;
    }
    case "SWAP": {
      const { a: f, b: p } = s, x = a[f] ?? 0, g = d[f] ?? 0;
      a[f] = a[p] ?? 0, d[f] = d[p] ?? 0, a[p] = x, d[p] = g;
      break;
    }
  }
  return l;
}
function Ia(n, s) {
  ya(s, n.n);
  const l = [sl(n)];
  let a = n;
  for (const d of s)
    a = em(a, d), l.push(a);
  return { frames: l };
}
function tm(n, s) {
  const l = Ia(n, s);
  return l.frames[l.frames.length - 1] ?? sl(n);
}
function nm(n, s) {
  for (const l of n)
    if (l.length !== s) throw new RangeError(`GF(2) row width mismatch: ${String(l.length)} vs ${String(s)}`);
}
function Wf(n, s) {
  for (let l = 0; l < n.length; l++) n[l] = ((n[l] ?? 0) ^ (s[l] ?? 0)) & 1;
}
function Bf(n, s) {
  const l = s ?? n[0]?.length ?? 0;
  nm(n, l);
  const a = n.map((x) => Uint8Array.from(x, (g) => g & 1)), d = [], f = [];
  let p = 0;
  for (let x = 0; x < l && p < a.length; x++) {
    let g = -1;
    for (let v = p; v < a.length; v++)
      if ((a[v]?.[x] ?? 0) === 1) {
        g = v;
        break;
      }
    if (g === -1) continue;
    const b = a[g], S = a[p];
    if (!(b === void 0 || S === void 0)) {
      a[g] = S, a[p] = b;
      for (let v = 0; v < a.length; v++) {
        const E = a[v];
        v !== p && E !== void 0 && (E[x] ?? 0) === 1 && Wf(E, b);
      }
      d.push(x), f.push(b), p++;
    }
  }
  return { rows: f, pivots: d, width: l };
}
function rm(n, s) {
  if (s.length !== n.width) throw new RangeError(`vector width ${String(s.length)} does not match basis width ${String(n.width)}`);
  const l = Uint8Array.from(s, (a) => a & 1);
  for (let a = 0; a < n.rows.length; a++) {
    const d = n.pivots[a], f = n.rows[a];
    d === void 0 || f === void 0 || (l[d] ?? 0) === 1 && Wf(l, f);
  }
  return l;
}
function sm(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function im(n) {
  return !Array.isArray(n) && "pivots" in n;
}
function lm(n, s) {
  const l = im(n) ? n : Bf(n, s.length);
  return sm(rm(l, s));
}
const om = { name: "Distance-3 rotated surface code", n: 9, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1, 3, 4] }, { id: "Z1", type: "Z", qubits: [4, 5, 7, 8] }, { id: "Z2", type: "Z", qubits: [1, 2] }, { id: "Z3", type: "Z", qubits: [6, 7] }, { id: "X0", type: "X", qubits: [1, 2, 4, 5] }, { id: "X1", type: "X", qubits: [3, 4, 6, 7] }, { id: "X2", type: "X", qubits: [0, 3] }, { id: "X3", type: "X", qubits: [5, 8] }], logicalX: ["XXXIIIIII"], logicalZ: ["ZIIZIIZII"], layout: { kind: "grid", rows: 3, cols: 3, checkPositions: { Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 }, X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 } } }, noiseNote: "X, Z and Y errors; perfect syndrome" }, am = { name: "Three-qubit repetition code", n: 3, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1] }, { id: "Z1", type: "Z", qubits: [1, 2] }], logicalX: ["XXX"], logicalZ: ["ZII"], layout: { kind: "line", checkPositions: { Z0: { row: 0, col: 0.5 }, Z1: { row: 0, col: 1.5 } } }, noiseNote: "X noise only (a single Z is undetectable: distance 1 against Z)" }, cm = { name: "Two bare qubits (no code)", n: 2, k: 2, distance: 1, checks: [], logicalX: ["XI", "IX"], logicalZ: ["ZI", "IZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, um = { name: "Three bare qubits (no code)", n: 3, k: 3, distance: 1, checks: [], logicalX: ["XII", "IXI", "IIX"], logicalZ: ["ZII", "IZI", "IIZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, dm = {
  rsc3: om,
  rep3: am,
  trivial2: cm,
  trivial3: um
}, qf = ["trivial2", "trivial3", "rep3", "rsc3"];
function fm(n) {
  return qf.includes(n);
}
function La(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function Qi(n, s) {
  if (typeof n != "number" || !Number.isFinite(n)) throw new Error(`codes.json: ${s} must be a number`);
  return n;
}
function Is(n, s) {
  if (typeof n != "string") throw new Error(`codes.json: ${s} must be a string`);
  return n;
}
function qd(n, s) {
  if (!Array.isArray(n)) throw new Error(`codes.json: ${s} must be an array`);
  return n.map((l, a) => Is(l, `${s}[${String(a)}]`));
}
function hm(n, s) {
  if (!La(n)) throw new Error(`codes.json: ${s} must be an object`);
  const l = Is(n.type, `${s}.type`);
  if (l !== "X" && l !== "Z") throw new Error(`codes.json: ${s}.type must be X or Z`);
  if (!Array.isArray(n.qubits)) throw new Error(`codes.json: ${s}.qubits must be an array`);
  const a = n.qubits.map((d, f) => Qi(d, `${s}.qubits[${String(f)}]`));
  return { id: Is(n.id, `${s}.id`), type: l, qubits: a };
}
function pm(n, s) {
  if (!La(s)) throw new Error(`codes.json: ${n} must be an object`);
  if (!Array.isArray(s.checks)) throw new Error(`codes.json: ${n}.checks must be an array`);
  return {
    name: Is(s.name, `${n}.name`),
    n: Qi(s.n, `${n}.n`),
    k: Qi(s.k, `${n}.k`),
    distance: Qi(s.distance, `${n}.distance`),
    checks: s.checks.map((l, a) => hm(l, `${n}.checks[${String(a)}]`)),
    logicalX: qd(s.logicalX, `${n}.logicalX`),
    logicalZ: qd(s.logicalZ, `${n}.logicalZ`),
    layout: s.layout,
    noiseNote: Is(s.noiseNote, `${n}.noiseNote`)
  };
}
function mm(n, s) {
  const l = s.n, a = s.checks.map((g) => {
    const b = [...g.qubits].sort((S, v) => S - v);
    return { id: g.id, type: g.type, qubits: b, pauli: Kp(l, g.type, b) };
  });
  if (new Set(a.map((g) => g.id)).size !== a.length) throw new Error(`codes.json: ${n} has duplicate check ids`);
  const f = (g, b) => {
    if (b.length !== l) throw new Error(`codes.json: ${n} logical ${g} "${b}" has wrong length`);
    return { label: g, pauli: Ae(b) };
  }, p = s.logicalX.map((g) => f("X", g)), x = s.logicalZ.map((g) => f("Z", g));
  if (p.length !== s.k || x.length !== s.k) throw new Error(`codes.json: ${n} needs k logical X and k logical Z`);
  return { id: n, name: s.name, n: l, k: s.k, distance: s.distance, checks: a, logicalX: p, logicalZ: x, noiseNote: s.noiseNote };
}
const Hf = /* @__PURE__ */ new Map();
{
  const n = dm;
  if (!La(n)) throw new Error("codes.json: root must be an object");
  for (const s of qf) {
    if (!(s in n)) throw new Error(`codes.json: missing code '${s}'`);
    Hf.set(s, pm(s, n[s]));
  }
}
const Hd = /* @__PURE__ */ new Map(), Ud = /* @__PURE__ */ new Map();
function Fe(n) {
  let s = Hd.get(n);
  if (s === void 0) {
    const l = Hf.get(n);
    if (l === void 0) throw new Error(`unknown code '${n}'`);
    s = mm(n, l), Hd.set(n, s);
  }
  return s;
}
function gm(n) {
  return n.checks.map((s) => Xf(s.pauli));
}
function ym(n) {
  let s = Ud.get(n.id);
  return s === void 0 && (s = Bf(gm(n), 2 * n.n), Ud.set(n.id, s)), s;
}
function Lr(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id} (n=${String(n.n)})`);
  const l = new Uint8Array(n.checks.length);
  return n.checks.forEach((a, d) => {
    l[d] = zf(a.pauli, s);
  }), l;
}
function xm(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function Yd(n) {
  let s = "";
  for (let l = 0; l < n.length; l++) s += (n[l] ?? 0) === 0 ? "0" : "1";
  return s;
}
function En(n) {
  return Array.from(n, (s) => s === 0 ? 0 : 1);
}
function wm(n) {
  return Uint8Array.from(n, (s) => s === 0 ? 0 : 1);
}
function Uf(n, s) {
  const l = [];
  return n.checks.forEach((a, d) => {
    (s[d] ?? 0) !== 0 && l.push(a.id);
  }), l;
}
function km(n, s) {
  return Ta(n, s);
}
function Yf(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id}`);
  return n.checks.length === 0 ? Vp(s) : lm(ym(n), Xf(s));
}
function vm(n, s) {
  return {
    x: n.logicalZ.map((l) => Wd(s, l.pauli)),
    z: n.logicalX.map((l) => Wd(s, l.pauli))
  };
}
function jm(n, s) {
  const l = Lr(n, s), a = vm(n, s);
  let d;
  return xm(l) ? Yf(n, s) ? d = "success" : d = "logical-error" : d = "detectable", { kind: d, residual: s, syndrome: l, logicalFlip: a, weight: yt(s) };
}
function Vd(n, s, l) {
  return jm(n, km(l, s));
}
const Qd = 10, Kd = /* @__PURE__ */ new Map();
function Sm(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) ^ a & 1;
  return l;
}
function bm(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) + (a & 1);
  return l;
}
function Nm(n) {
  const s = n.n;
  if (s > Qd) throw new RangeError(`lookup decoder supports at most ${String(Qd)} qubits`);
  const l = n.checks.map((g) => Bd(g.pauli).x), a = n.checks.map((g) => Bd(g.pauli).z), d = Sm(s), f = bm(s), p = /* @__PURE__ */ new Map(), x = 4 ** s;
  for (let g = 0; g < x; g++) {
    let b = 0, S = 0, v = g;
    for (let L = 0; L < s; L++) {
      const F = v & 3;
      v >>= 2, (F & 1) !== 0 && (b |= 1 << L), (F & 2) !== 0 && (S |= 1 << L);
    }
    const E = f[b | S] ?? 0, I = (f[b] ?? 0) + (f[S] ?? 0);
    let $ = "";
    for (let L = 0; L < l.length; L++)
      $ += (d[b & (a[L] ?? 0) ^ S & (l[L] ?? 0)] ?? 0) === 0 ? "0" : "1";
    const R = p.get($);
    R === void 0 || E < R.weight || E === R.weight && I < R.symplecticWeight ? p.set($, { weight: E, symplecticWeight: I, candidates: [g] }) : E === R.weight && I === R.symplecticWeight && R.candidates.push(g);
  }
  return { n: s, entries: p };
}
function Vf(n) {
  let s = Kd.get(n.id);
  return s === void 0 && (s = Nm(n), Kd.set(n.id, s)), s;
}
function Em(n, s) {
  let l = 0, a = 0, d = s;
  for (let f = 0; f < n; f++) {
    const p = d & 3;
    d >>= 2, (p & 1) !== 0 && (l |= 1 << f), (p & 2) !== 0 && (a |= 1 << f);
  }
  return Gp(n, l, a);
}
function Cm(n, s) {
  if (s.length !== n.checks.length)
    throw new RangeError(`syndrome has ${String(s.length)} bits but code ${n.id} has ${String(n.checks.length)} checks`);
  const l = Vf(n).entries.get(Yd(s));
  if (l === void 0) throw new Error(`syndrome ${Yd(s)} is not produced by any Pauli on code ${n.id}`);
  return l;
}
function Tm(n) {
  const s = Vf(n);
  return {
    name: `min-weight lookup (${n.id})`,
    decode(l) {
      const d = Cm(n, l).candidates[0];
      return d === void 0 ? rl(s.n) : Em(s.n, d);
    }
  };
}
function Ra(n, s, l) {
  return Yf(n, Ta(s, l));
}
const Im = ["success", "logical-error", "detectable"];
function Er(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function st(n, s) {
  if (typeof n != "string") throw new Error(`missions.json: ${s} must be a string`);
  return n;
}
function Nn(n, s) {
  if (typeof n != "number" || !Number.isInteger(n)) throw new Error(`missions.json: ${s} must be an integer`);
  return n;
}
function Lm(n, s = "gate") {
  if (!Er(n)) throw new Error(`${s} must be an object`);
  const l = st(n.kind, `${s}.kind`);
  switch (l) {
    case "H":
    case "S":
      return { kind: l, q: Nn(n.q, `${s}.q`) };
    case "CNOT":
      return { kind: l, c: Nn(n.c, `${s}.c`), t: Nn(n.t, `${s}.t`) };
    case "CZ":
    case "SWAP":
      return { kind: l, a: Nn(n.a, `${s}.a`), b: Nn(n.b, `${s}.b`) };
    default:
      throw new Error(`${s}.kind '${l}' is not a supported gate`);
  }
}
function Gd(n, s = "circuit") {
  if (!Array.isArray(n)) throw new Error(`${s} must be an array`);
  return n.map((l, a) => Lm(l, `${s}[${String(a)}]`));
}
function Rm(n, s) {
  if (!Er(n)) throw new Error(`missions.json: ${s} must be an object`);
  if (!Array.isArray(n.syndrome)) throw new Error(`missions.json: ${s}.syndrome must be an array`);
  const l = n.syndrome.map((d, f) => {
    const p = Nn(d, `${s}.syndrome[${String(f)}]`);
    if (p !== 0 && p !== 1) throw new Error(`missions.json: ${s}.syndrome bits must be 0/1`);
    return p;
  }), a = st(n.minWeightVerdict, `${s}.minWeightVerdict`);
  if (!Im.includes(a)) throw new Error(`missions.json: ${s}.minWeightVerdict invalid`);
  return {
    syndrome: l,
    propagated: st(n.propagated, `${s}.propagated`),
    minWeightCorrection: st(n.minWeightCorrection, `${s}.minWeightCorrection`),
    minWeightVerdict: a
  };
}
function _m(n, s = "mission") {
  if (!Er(n)) throw new Error(`missions.json: ${s} must be an object`);
  const l = st(n.id, `${s}.id`), a = st(n.code, `${s}.code`);
  if (!fm(a)) throw new Error(`missions.json: ${l}.code '${a}' is unknown`);
  const d = Fe(a), f = st(n.kind, `${l}.kind`);
  if (f !== "dispatch" && f !== "propagation") throw new Error(`missions.json: ${l}.kind must be dispatch|propagation`);
  if (!Array.isArray(n.training)) throw new Error(`missions.json: ${l}.training must be an array`);
  const p = n.training.map((R, L) => {
    const F = `${l}.training[${String(L)}]`;
    if (!Er(R)) throw new Error(`missions.json: ${F} must be an object`);
    const X = st(R.error, `${F}.error`);
    if (Ae(X).n !== d.n) throw new Error(`missions.json: ${F}.error length must be ${String(d.n)}`);
    const _ = Gd(R.circuit, `${F}.circuit`);
    return ya(_, d.n), { error: X, circuit: _, caption: st(R.caption, `${F}.caption`) };
  }), x = n.challenge;
  if (!Er(x)) throw new Error(`missions.json: ${l}.challenge must be an object`);
  const g = st(x.error, `${l}.challenge.error`);
  if (Ae(g).n !== d.n) throw new Error(`missions.json: ${l}.challenge.error length must be ${String(d.n)}`);
  const b = Gd(x.circuit, `${l}.challenge.circuit`);
  if (ya(b, d.n), f === "dispatch" && b.length > 0) throw new Error(`missions.json: ${l} is a dispatch mission but has a circuit`);
  if (!Array.isArray(n.allowed) || n.allowed.length === 0) throw new Error(`missions.json: ${l}.allowed must be a non-empty array`);
  const S = n.allowed.map((R, L) => {
    const F = st(R, `${l}.allowed[${String(L)}]`);
    if (!Ff(F) || F === "I") throw new Error(`missions.json: ${l}.allowed[${String(L)}] must be X, Y or Z`);
    return F;
  }), v = Nn(n.budget, `${l}.budget`);
  if (v < 1 || v > d.n) throw new Error(`missions.json: ${l}.budget out of range`);
  const E = n.debrief;
  if (!Er(E)) throw new Error(`missions.json: ${l}.debrief must be an object`);
  const I = {
    success: st(E.success, `${l}.debrief.success`),
    "logical-error": st(E["logical-error"], `${l}.debrief.logical-error`),
    detectable: st(E.detectable, `${l}.debrief.detectable`)
  }, $ = n.expected === void 0 || n.expected === null ? null : Rm(n.expected, `${l}.expected`);
  return {
    id: l,
    index: Nn(n.index, `${l}.index`),
    title: st(n.title, `${l}.title`),
    code: a,
    kind: f,
    training: p,
    challenge: { error: g, circuit: b },
    allowed: S,
    budget: v,
    briefing: st(n.briefing, `${l}.briefing`),
    debrief: I,
    expected: $
  };
}
function Om(n) {
  if (!Array.isArray(n)) throw new Error("missions.json: root must be an array");
  const s = [], l = /* @__PURE__ */ new Set();
  return n.forEach((a, d) => {
    const f = _m(a, `missions[${String(d)}]`);
    if (f.expected === null) throw new Error(`missions.json: ${f.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (l.has(f.id)) throw new Error(`missions.json: duplicate id ${f.id}`);
    if (l.add(f.id), f.index !== d + 1) throw new Error(`missions.json: ${f.id} index ${String(f.index)} should be ${String(d + 1)}`);
    s.push({ ...f, expected: f.expected });
  }), s;
}
let Jd;
function Qf() {
  return Jd ??= Om(Af), Jd;
}
function Pm(n) {
  const s = Qf().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
const sa = 3;
function $m(n, s = Af) {
  if (!Array.isArray(s)) return sa;
  for (const l of s) {
    if (typeof l != "object" || l === null || Array.isArray(l)) continue;
    const a = l;
    if (a.id !== n) continue;
    const d = a.maxStars;
    return d === 1 || d === 2 || d === 3 ? d : sa;
  }
  return sa;
}
function Mm(n) {
  const s = Fe(n.code), l = n.allowed.filter(Df), a = n.kind === "dispatch" ? En(Lr(s, Ae(n.challenge.error))) : [];
  return {
    id: n.id,
    index: n.index,
    title: n.title,
    code: n.code,
    kind: n.kind,
    allowed: l,
    budget: n.budget,
    briefing: n.briefing,
    maxStars: $m(n.id),
    circuit: n.challenge.circuit,
    syndrome: a,
    visibleStart: n.kind === "propagation" ? n.challenge.error : null,
    training: n.training.map((d) => ({ fire: d.error, circuit: d.circuit, caption: d.caption }))
  };
}
let ef;
function Ln() {
  return ef ??= Qf().map(Mm), ef;
}
function In(n) {
  const s = Ln().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
function _a() {
  return Ln().reduce((n, s) => n + s.maxStars, 0);
}
function Dm(n) {
  const s = Ln(), l = s.findIndex((d) => d.id === n), a = s[l + 1];
  return a === void 0 ? null : a.id;
}
function Am(n) {
  return Pm(n);
}
function Fm(n) {
  const s = Ra(n.code, n.crews, n.decoderCrews), l = yt(n.crews) <= yt(n.decoderCrews), a = n.maxStars ?? 3;
  return s && l && n.outcome === "success" ? "optimal" : s && n.outcome === "logical-error" ? "unlucky" : n.outcome === "success" && a <= 1 && !s ? "lucky" : n.outcome === "success" ? "valid" : "off";
}
function zm({ quality: n, outcome: s, wrongBlocks: l, crewsUsed: a, maxStars: d = 3 }) {
  let f = 0;
  return s === "success" && n === "optimal" ? f = 3 : s === "success" && n === "valid" ? f = 2 : (n === "unlucky" || n === "lucky" || s === "detectable" && l <= 1 && a > 0) && (f = 1), f > d ? d : f;
}
function Xm(n) {
  const s = Fm(n), l = yt(Ta(n.crews, n.decoderCrews)), a = yt(n.crews), d = n.maxStars ?? 3, f = zm({ quality: s, outcome: n.outcome, wrongBlocks: l, crewsUsed: a, maxStars: d });
  return {
    outcome: n.outcome,
    quality: s,
    stars: f,
    maxStars: d,
    crewsUsed: a,
    minCrews: yt(n.decoderCrews),
    completed: n.outcome === "success" || s === "unlucky"
  };
}
const Zm = {
  success: "Logical qubit safe",
  "logical-error": "Silent failure — logical qubit flipped",
  detectable: "Fires still burning"
}, Wm = "Prediction missed — fires left on the wires";
function Bm(n, s) {
  return !s && n === "logical-error" ? Wm : Zm[n];
}
function tf(n) {
  switch (n.kind) {
    case "H":
      return `H on block ${String(n.q)}`;
    case "S":
      return `S on block ${String(n.q)}`;
    case "CNOT":
      return `CNOT from block ${String(n.c)} to block ${String(n.t)}`;
    case "CZ":
      return `CZ between blocks ${String(n.a)} and ${String(n.b)}`;
    case "SWAP":
      return `SWAP of blocks ${String(n.a)} and ${String(n.b)}`;
  }
}
const Kf = { X: "red", Z: "blue", Y: "red-and-blue" };
function Gi(n) {
  const s = Ht(n);
  if (s.length === 0) return "no fires";
  const l = s.map((a) => {
    const d = Dt(n, a);
    return `a ${Kf[d] ?? ""} fire (${d}) on block ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function qm(n) {
  const s = Ht(n);
  if (s.length === 0) return "no crews";
  const l = s.map((a) => {
    const d = Dt(n, a);
    return `a ${Kf[d] ?? ""} crew (${d}) to block ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function Hm(n, s) {
  if (n.checks.length === 0) return "This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.";
  const l = Uf(n, s);
  return l.length === 0 ? "Every station reads an even count and stays quiet." : `Alarms: ${l.join(", ")} ring${l.length === 1 ? "s" : ""}. Each ringing station sees an odd number of fires of its colour.`;
}
function Um(n, s) {
  switch (n.kind) {
    case "success":
      return yt(n.residual) === 0 ? "Residual is the identity: every fire is out. Logical qubit safe." : `Residual ${_e(n.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case "logical-error": {
      if (s.checks.length === 0)
        return `Residual ${_e(n.residual)} leaves ${Gi(n.residual)}. Bare wires have no stations, so a missed prediction is never caught: every leftover component acts directly on the data.`;
      const l = [];
      return n.logicalFlip.x.forEach((a, d) => {
        a && l.push(s.k === 1 ? "logical X" : `logical X${String(d)}`);
      }), n.logicalFlip.z.forEach((a, d) => {
        a && l.push(s.k === 1 ? "logical Z" : `logical Z${String(d)}`);
      }), `Residual ${_e(n.residual)} commutes with every station yet is not a stabilizer: it acts as ${l.join(" and ")}. Silent failure.`;
    }
    case "detectable":
      return `Residual ${_e(n.residual)} still trips ${Uf(s, n.syndrome).join(", ")}. Fires are still burning.`;
  }
}
function Ym(n) {
  const { code: s, start: l, circuit: a, crews: d, verdict: f } = n, p = Ia(l, a), x = [], g = p.frames[p.frames.length - 1] ?? l, b = _e(l);
  x.push({
    id: "placed",
    caption: `Noise lit ${Gi(l)}.`,
    fires: b,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: !1
  }), a.forEach(($, R) => {
    const L = p.frames[R] ?? l, F = p.frames[R + 1] ?? L, X = _e(L) !== _e(F);
    x.push({
      id: `gate-${String(R)}`,
      caption: X ? `${tf($)}: ${_e(L)} becomes ${_e(F)}.` : `${tf($)}: the fire pattern ${_e(L)} is unchanged.`,
      fires: _e(F),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: R,
      showVerdict: !1
    });
  });
  const S = Lr(s, g), v = En(S), E = _e(g);
  x.push({
    id: "alarms",
    caption: Hm(s, S),
    fires: E,
    crews: null,
    residual: null,
    syndrome: v,
    gateCursor: a.length,
    showVerdict: !1
  }), x.push({
    id: "dispatch",
    caption: `Your dispatch: ${qm(d)}.`,
    fires: E,
    crews: _e(d),
    residual: null,
    syndrome: v,
    gateCursor: a.length,
    showVerdict: !1
  });
  const I = _e(f.residual);
  return x.push({
    id: "residual",
    caption: yt(f.residual) === 0 ? "Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains." : `Crews meet fires (XOR): what remains is ${I}, that is ${Gi(f.residual)}.`,
    fires: E,
    crews: _e(d),
    residual: I,
    syndrome: En(f.syndrome),
    gateCursor: a.length,
    showVerdict: !1
  }), x.push({
    id: "verdict",
    caption: Um(f, s),
    fires: E,
    crews: _e(d),
    residual: I,
    syndrome: En(f.syndrome),
    gateCursor: a.length,
    showVerdict: !0
  }), x;
}
function nf(n) {
  return n.length === 0 ? "no blocks" : n.length === 1 ? `block ${String(n[0])}` : `blocks ${n.slice(0, -1).join(", ")} and ${String(n[n.length - 1])}`;
}
function Vm(n) {
  const { code: s, finalFire: l, crews: a, decoderCrews: d, decoderVerdict: f, equivalent: p, verdict: x } = n, g = _e(d), b = _e(a), S = _e(l), v = S !== g && S !== b;
  let E;
  if (s.checks.length === 0)
    E = p ? `The fire ended as ${S}; your crews matched it exactly, so the prediction was right.` : `The fire ended as ${S}. Your crews ${b} leave ${Gi(x.residual)} (${String(yt(x.residual))} block${yt(x.residual) === 1 ? "" : "s"}); on bare wires every leftover component acts on the data.`;
  else if (p && x.kind === "success")
    E = b === g ? "Your dispatch is exactly the minimum-weight dispatch for these alarms." : `Your dispatch ${b} and the minimum-weight dispatch ${g} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`, b === S ? E += " Your crews sat exactly on the true fires." : S !== g && (E += ` The true fires were ${S}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`);
  else if (p && x.kind === "logical-error") {
    const I = nf(Ht(l)), $ = nf(Ht(x.residual));
    E = `${b === g ? `The minimum-weight dispatch for these alarms is ${g}, and that is what you sent.` : `The minimum-weight dispatch for these alarms is ${g}; your ${b} differs from it by a stabilizer, so it is the same call.`} The true fire was ${S}, on ${I}: ${String(yt(l))} fires that look, to every station, exactly like one. Your crews plus those fires leave ${_e(x.residual)} on ${$}, a logical operator that every station sees as an even count. Crews at ${S} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.`;
  } else x.kind === "success" ? (E = `You succeeded with ${String(yt(a))} crew(s); the minimum-weight dispatch ${g} needs ${String(yt(d))} and its verdict is ${rf[f.kind]}.`, f.kind === "logical-error" && (E += ` The alarms alone could not justify your ${b}: the same stations ring for ${g}, so protocol would still have sent that.`)) : E = `The minimum-weight dispatch for these alarms is ${g} (${rf[f.kind]}). Compare it with your ${b} step by step in the replay.`;
  return {
    decoderCrews: g,
    decoderVerdict: f.kind,
    equivalentToDecoder: p,
    explanation: E,
    trueFireCrews: v ? S : null
  };
}
const rf = {
  success: "success",
  "logical-error": "silent failure",
  detectable: "fires still burning"
}, xa = "q11.save.v1", Ji = { sound: !1, reducedMotion: !1, language: "en", freeRoam: !1 };
function Bi() {
  return { version: Cs, progress: {}, settings: Ji, tutorialDone: !1 };
}
const Gf = "Saved progress was unreadable and has been reset.";
function Ls(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function sf(n) {
  if (!Ls(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (!Ls(a)) return null;
    const d = a.stars, f = a.attempts, p = a.completed;
    if (d !== 0 && d !== 1 && d !== 2 && d !== 3 || typeof f != "number" || !Number.isInteger(f) || f < 0 || typeof p != "boolean") return null;
    s[l] = { stars: d, attempts: f, completed: p };
  }
  return s;
}
function Qm(n) {
  return n === "en" || n === "ja";
}
function Jf(n) {
  if (!Ls(n)) return null;
  const s = n.sound, l = n.reducedMotion;
  return typeof s != "boolean" || typeof l != "boolean" ? null : { sound: s, reducedMotion: l, language: Ji.language, freeRoam: Ji.freeRoam };
}
function Km(n) {
  const s = Jf(n);
  if (s === null || !Ls(n)) return null;
  const l = n.language, a = n.freeRoam;
  return !Qm(l) || typeof a != "boolean" ? null : { sound: s.sound, reducedMotion: s.reducedMotion, language: l, freeRoam: a };
}
function Gm(n) {
  if (n === null) return null;
  let s;
  try {
    s = JSON.parse(n);
  } catch {
    return null;
  }
  if (!Ls(s)) return null;
  const l = s.version;
  if (l === 1) {
    const a = sf(s.progress), d = Jf(s.settings);
    return a === null || d === null ? null : { version: Cs, progress: a, settings: d, tutorialDone: Object.keys(a).length > 0 };
  }
  if (l === Cs) {
    const a = sf(s.progress), d = Km(s.settings), f = s.tutorialDone;
    return a === null || d === null || typeof f != "boolean" ? null : { version: Cs, progress: a, settings: d, tutorialDone: f };
  }
  return null;
}
function Jm(n) {
  if (n === null) return { save: Bi(), notice: null };
  let s;
  try {
    s = n.getItem(xa);
  } catch {
    return { save: Bi(), notice: null };
  }
  if (s === null) return { save: Bi(), notice: null };
  const l = Gm(s);
  if (l !== null) return { save: l, notice: null };
  const a = Bi();
  try {
    n.setItem(xa, JSON.stringify(a));
  } catch {
  }
  return { save: a, notice: Gf };
}
function eg(n, s) {
  if (n === null) return !1;
  try {
    return n.setItem(xa, JSON.stringify(s)), !0;
  } catch {
    return !1;
  }
}
function tg() {
  try {
    const n = globalThis.localStorage, s = "__q11_probe__";
    return n.setItem(s, "1"), n.removeItem(s), n;
  } catch {
    return null;
  }
}
const ng = "Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.", rg = [{ analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.15, Z1: 0.09, Z2: 0.06, Z3: 0.02 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.5, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 93, 1: 7 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.93], predictedSyndromeShare: 0.69, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000011000010011": 1, "00000100100000010": 1, "00000100100000011": 3, "00000101100000011": 1, "00000111100000011": 1, "00010011000110001": 1, "00011011000000011": 3, "00011011001000011": 1, "00011011001100011": 1, "00011011100000011": 1, "00011100001100011": 1, "00011111100000011": 7, "01101000100000001": 1, "01101000100000010": 1, "01101000100000011": 1, "01101001100000011": 1, "01101100000000011": 2, "01110011001000010": 1, "01110011100000011": 4, "01110011100010111": 1, "01110111000000011": 5, "01110111101000011": 1, "01111111110100011": 1, "10000001011000111": 1, "10000111100110011": 1, "10001001000010111": 1, "10001011000000011": 5, "10001111000000010": 1, "10001111100000011": 2, "10001111100100001": 1, "10010000000000011": 6, "10010100100000011": 5, "10010100100010001": 1, "10010101110100100": 1, "10010111100000010": 1, "10011011000000011": 1, "10110100100101011": 1, "11010000000100011": 1, "11100001100000111": 1, "11100111000000011": 6, "11100111001100011": 1, "11101000110010001": 1, "11110011100010011": 1, "11110111010010001": 1, "11111000100000011": 6, "11111011100000010": 1, "11111100000000011": 4, "11111100000010011": 1, "11111100001001010": 1, "11111111001110010": 1 }, finishedAt: "2026-10-10T01:40:30Z", jobId: "01a12378-c4f2-71ea-b5df-920acd440520", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:40:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.09, Z1: 0.07, Z2: 0.07, Z3: 0.04 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 22.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 97, 1: 3 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking) — JS/Qiskit page, on-load self-test through the JS→Python bridge", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.76, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000000001010010": 1, "00000001000010011": 1, "00000100100000011": 1, "00010011000000000": 1, "00011010000000111": 1, "00011011000000011": 6, "00011101100010111": 1, "00011110100010110": 1, "00011111100000001": 1, "00011111100000011": 4, "00100011110111011": 1, "00101100010101001": 1, "01101000001100011": 1, "01101000100000011": 8, "01101011000100011": 1, "01101100000000011": 6, "01101100000010011": 1, "01101100000100011": 1, "01110011100000011": 3, "01110100001000010": 1, "01110110001000111": 1, "01110111000000011": 7, "01110111010110011": 1, "01111010110000101": 1, "10000100110010011": 1, "10001011000000011": 6, "10001111000000011": 1, "10001111100000011": 7, "10001111100110011": 1, "10010000000000011": 5, "10010011000010011": 1, "10010100100000011": 1, "10010100100010011": 1, "10010110100000111": 1, "10111000100101001": 1, "11010000000000011": 1, "11100011100000011": 4, "11100111000000011": 1, "11101100000000011": 1, "11111000100000011": 5, "11111100000000010": 1, "11111100000000011": 4 }, finishedAt: "2026-10-10T02:14:30Z", jobId: "01a12396-c213-7984-9259-bb3fb25b8f46", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T02:14:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.06, Z1: 0.07, Z2: 0.03, Z3: 0.03 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 0, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 3, 1: 97 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.73, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "XIIIIIIII", counts: { "00000011100000001": 3, "00000100100100001": 1, "00000111000000001": 6, "00000111000010001": 1, "00001000110010001": 1, "00010111000000001": 1, "00010111000000011": 1, "00010111010000001": 1, "00011000100000001": 7, "00011000101000001": 1, "00011011001000001": 1, "00011100000000001": 5, "00111011000001001": 1, "01101011000000001": 5, "01101011000010101": 1, "01101011000110001": 1, "01101011001000001": 1, "01101111100000001": 9, "01101111100100001": 1, "01110000000000001": 4, "01110011000100001": 1, "01110100100000000": 1, "01110100100000001": 2, "10000011110000001": 1, "10001000100000001": 7, "10001100000000001": 4, "10010011001000000": 1, "10010011100000001": 4, "10010101000000101": 1, "10110000000001001": 1, "11011000100101001": 1, "11100000000000001": 3, "11100000000100000": 1, "11100011001100001": 1, "11100100100000001": 2, "11100100100010001": 1, "11100111100110000": 1, "11101000000110011": 1, "11110000010010001": 1, "11111001000000101": 1, "11111010010010110": 1, "11111011000000001": 5, "11111111100000001": 6 }, finishedAt: "2026-10-10T01:44:30Z", jobId: "01a1237b-5f60-7349-89d0-a343dca0201c", missionId: "silent-failure", prediction: { equivalentToReference: !0, logicalFlip: { x: [!0], z: [!1] }, referenceCorrection: "XIIIIIIII", referenceVerdict: "logical-error", residual: "XXXIIIIII", syndrome: [1, 0, 0, 0, 0, 0, 0, 0], verdict: "logical-error" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:44:00Z" }], sg = 1, ig = {
  note: ng,
  results: rg,
  schema: sg
};
function Oa(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function lg(n) {
  if (!Oa(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (typeof a != "number" || !Number.isFinite(a)) return null;
    s[l] = a;
  }
  return s;
}
function og(n) {
  if (!Oa(n)) return null;
  const s = n.source;
  if (s !== "local-simulator" && s !== "cached-cloud" && s !== "live-cloud") return null;
  const l = lg(n.counts);
  if (l === null) return null;
  const a = (S) => {
    const v = n[S];
    return typeof v == "string" ? v : null;
  }, d = a("missionId"), f = a("correction"), p = a("backendName"), x = a("startedAt"), g = a("finishedAt"), b = n.shots;
  return d === null || f === null || p === null || x === null || g === null || typeof b != "number" || !Number.isInteger(b) || b <= 0 ? null : {
    status: "ok",
    source: s,
    backendName: p,
    missionId: d,
    correction: f,
    shots: b,
    counts: l,
    analysis: n.analysis ?? null,
    prediction: n.prediction ?? null,
    jobId: a("jobId"),
    startedAt: x,
    finishedAt: g
  };
}
function ag(n) {
  if (!Oa(n) || n.schema !== 1 || !Array.isArray(n.results)) return [];
  const s = [];
  for (const l of n.results) {
    const a = og(l);
    a !== null && s.push(a);
  }
  return s;
}
function cg(n, s, l) {
  if (s === l) return !0;
  try {
    const a = Fe(In(n).code), d = Ae(s), f = Ae(l);
    return d.n !== a.n || f.n !== a.n ? !1 : Ra(a, d, f);
  } catch {
    return !1;
  }
}
function eh(n, s, l) {
  return n.filter((a) => a.missionId === s && (l === void 0 || cg(s, l, a.correction)));
}
function ug(n = ag(ig)) {
  return {
    kind: "none",
    cached: (s, l) => eh(n, s, l)
  };
}
const Vn = [
  { id: "station-row", missionId: "first-alarm", kind: "houses-row", hasBeacon: !1 },
  { id: "bridge", missionId: "red-forward-blue-backward", kind: "bridge", hasBeacon: !1 },
  { id: "lab", missionId: "color-switch", kind: "lab", hasBeacon: !1 },
  { id: "central", missionId: "blind-dispatch", kind: "grid", hasBeacon: !1 },
  { id: "market", missionId: "two-kinds-of-trouble", kind: "grid", hasBeacon: !1 },
  { id: "old-town", missionId: "silent-failure", kind: "grid", hasBeacon: !0 }
];
function Rs(n) {
  return Vn.find((s) => s.missionId === n);
}
function lf(n, s) {
  return s[n.missionId]?.completed === !0;
}
function th(n, s, l) {
  const a = Vn.findIndex((p) => p.id === n);
  if (a < 0) throw new Error(`unknown district '${n}'`);
  const d = Vn[a];
  if (d === void 0) throw new Error(`unknown district '${n}'`);
  return lf(d, s) ? "solved" : l || Vn.slice(0, a).every((p) => lf(p, s)) ? "available" : "locked";
}
function dg(n, s, l) {
  const a = Rs(n);
  return a === void 0 ? void 0 : th(a.id, s, l);
}
const fg = {
  trucks: 500,
  run: 450,
  stagger: 120,
  sprayAfterRun: 300,
  spray: 600,
  reveal: 300,
  alarms: 300,
  outcome: 500
};
function of(n, s) {
  const l = Ts(n), a = Ts(s);
  return Ca(l.x ^ a.x, l.z ^ a.z);
}
function il(n) {
  switch (n.verdict) {
    case "success":
      return yt(Ae(n.residual)) === 0 ? "restored" : "safe-pattern";
    case "detectable":
      return "still-burning";
    case "logical-error":
      return "logical-failure";
  }
}
function hg(n, s) {
  return s === "I" ? "extinguished" : n === "I" ? "ignited" : "changed";
}
function pg(n) {
  return Ht(Ae(n.residual));
}
function wa(n, s) {
  const l = Ae(n.fires), a = Ae(n.crews), d = Ae(n.residual);
  if (l.n !== a.n || l.n !== d.n) throw new Error("effects: fires, crews and residual must share the qubit count");
  const f = fg, p = [{ type: "trucks-arrive", t: 0, dur: f.trucks }];
  let x = f.trucks;
  Ht(a).forEach((S, v) => {
    const E = Dt(a, S);
    if (E === "I") return;
    const I = f.trucks + v * f.stagger, $ = I + f.sprayAfterRun, R = $ + f.spray, L = Dt(l, S), F = Dt(d, S);
    if (of(L, E) !== F)
      throw new Error(`effects: residual at house ${String(S)} is ${F}, but ${L} ⊕ ${E} = ${of(L, E)}`);
    p.push({ type: "crew-run", t: I, dur: f.run, q: S, crew: E }), p.push({ type: "spray-start", t: $, dur: f.spray, q: S, crew: E }), p.push({ type: "impact", t: R, dur: f.reveal, q: S, crew: E, before: L, after: F, effect: hg(L, F) }), x = Math.max(x, R + f.reveal);
  });
  const b = Ht(d).filter((S) => Dt(a, S) === "I");
  if (p.push({ type: "reveal-remaining", t: x, dur: f.reveal, qs: b }), x += f.reveal, p.push({ type: "alarms", t: x, dur: f.alarms, syndrome: [...n.syndromeOfResidual] }), x += f.alarms, p.push({ type: "outcome", t: x, dur: f.outcome, result: il(n) }), x += f.outcome, p.push({ type: "done", t: x, dur: 0 }), p.sort((S, v) => S.t - v.t), s) {
    const S = p.map((v, E) => v.type === "done" ? { ...v, t: E } : { ...v, t: E, dur: 1 });
    return { durationMs: S.length, events: S };
  }
  return { durationMs: x, events: p };
}
const mg = Vn[0]?.missionId ?? "first-alarm", Pa = "Progress reset.";
function gg(n, s = null) {
  return {
    screen: "title",
    returnTo: "title",
    missionId: null,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: "X",
    highlightedCheck: null,
    standDownDialog: !1,
    replayIndex: 0,
    autoPlay: !1,
    debrief: null,
    dispatchDone: !1,
    tutorialActive: !1,
    tutorialDone: n?.tutorialDone ?? !1,
    progress: n?.progress ?? {},
    settings: n?.settings ?? Ji,
    notice: s
  };
}
function yg(n, s) {
  let l = rl(n);
  for (const [a, d] of Object.entries(s)) l = Qp(l, Number(a), d);
  return l;
}
function Tr(n) {
  return Object.keys(n).length;
}
function ot(n) {
  return n.missionId === null ? null : In(n.missionId);
}
function nh(n, s) {
  const l = Am(n), a = Fe(l.code), d = Ae(l.challenge.error), f = tm(d, l.challenge.circuit), p = yg(a.n, s), x = Vd(a, f, p), g = En(Lr(a, d)), b = l.kind === "dispatch" ? Tm(a).decode(wm(g)) : f, S = Vd(a, f, b), v = Ra(a, p, b), E = Xm({ code: a, outcome: x.kind, crews: p, decoderCrews: b, maxStars: In(n).maxStars }), I = Ym({ kind: l.kind, code: a, start: d, circuit: l.challenge.circuit, crews: p, verdict: x }), $ = Vm({
    kind: l.kind,
    code: a,
    finalFire: f,
    crews: p,
    verdict: x,
    equivalent: v,
    decoderCrews: b,
    decoderVerdict: S
  });
  return {
    missionId: n,
    fires: _e(f),
    startFires: _e(d),
    crews: _e(p),
    residual: _e(x.residual),
    syndromeOfFires: En(Lr(a, f)),
    syndromeOfResidual: En(x.syndrome),
    verdict: x.kind,
    verdictLabel: Bm(x.kind, a.checks.length > 0),
    logicalFlip: { x: [...x.logicalFlip.x], z: [...x.logicalFlip.z] },
    score: E,
    narrative: l.debrief[x.kind],
    steps: I,
    whatIf: $
  };
}
function xg(n, s, l, a) {
  const d = n[s], f = {
    stars: d === void 0 ? l : Math.max(d.stars, l),
    attempts: (d?.attempts ?? 0) + 1,
    completed: (d?.completed ?? !1) || a
  };
  return { ...n, [s]: f };
}
function qi(n, s) {
  const l = s.allowed[0] ?? "X";
  return {
    ...n,
    screen: "challenge",
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: s.allowed.includes(n.selected) ? n.selected : l,
    highlightedCheck: null,
    standDownDialog: !1,
    debrief: null,
    dispatchDone: !1,
    replayIndex: 0,
    autoPlay: !1
  };
}
function ia(n, s) {
  const l = In(s);
  return {
    ...n,
    screen: "briefing",
    missionId: s,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    undoStack: [],
    redoStack: [],
    selected: l.allowed[0] ?? "X",
    highlightedCheck: null,
    standDownDialog: !1,
    debrief: null,
    dispatchDone: !1,
    replayIndex: 0,
    autoPlay: !1
  };
}
function la(n) {
  return { ...n, screen: "missions", standDownDialog: !1, autoPlay: !1, tutorialActive: !1, tutorialDone: !0 };
}
function oa(n, s) {
  const l = [...n.undoStack, n.placements].slice(-20);
  return { ...n, placements: s, undoStack: l, redoStack: [] };
}
const aa = ["how", "settings"];
function af(n, s) {
  let l = wg(n, s);
  return l.screen !== n.screen && (l.notice === Pa && (l = { ...l, notice: null }), l.highlightedCheck !== null && (l = { ...l, highlightedCheck: null })), l;
}
function wg(n, s) {
  switch (s.type) {
    case "HYDRATE":
      return {
        ...n,
        progress: s.save.progress,
        settings: s.save.settings,
        tutorialDone: s.save.tutorialDone,
        notice: s.notice ?? n.notice
      };
    case "PLAY":
      return n.tutorialDone ? { ...n, screen: "missions", tutorialActive: !1 } : { ...ia(n, mg), tutorialActive: !0 };
    case "TUTORIAL_SKIP":
      return n.tutorialActive ? la(n) : { ...n, tutorialDone: !0 };
    case "OPEN_HOW":
      return aa.includes(n.screen) ? { ...n, screen: "how" } : { ...n, screen: "how", returnTo: n.screen };
    case "OPEN_SETTINGS":
      return aa.includes(n.screen) ? { ...n, screen: "settings" } : { ...n, screen: "settings", returnTo: n.screen };
    case "CLOSE_OVERLAY":
      return aa.includes(n.screen) ? { ...n, screen: n.returnTo } : n;
    case "OPEN_MISSIONS":
      return la(n);
    case "OPEN_TITLE":
      return { ...n, screen: "title", standDownDialog: !1, autoPlay: !1, tutorialActive: !1 };
    case "SELECT_MISSION": {
      const l = dg(s.id, n.progress, n.settings.freeRoam);
      return l === void 0 || l === "locked" ? n : { ...ia(n, s.id), tutorialActive: !1 };
    }
    case "START_MISSION": {
      const l = ot(n);
      return l === null || n.screen !== "briefing" ? n : l.training.length > 0 ? { ...n, screen: "training", lesson: 0, lessonCursor: -1 } : qi(n, l);
    }
    case "LESSON_SELECT": {
      const l = ot(n);
      return l === null || n.screen !== "training" || s.lesson < 0 || s.lesson >= l.training.length ? n : { ...n, lesson: s.lesson, lessonCursor: -1 };
    }
    case "LESSON_CURSOR": {
      const l = ot(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      if (a === void 0) return n;
      const d = Math.max(-1, Math.min(a.circuit.length - 1, s.cursor));
      return { ...n, lessonCursor: d };
    }
    case "LESSON_NEXT": {
      const l = ot(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      return a === void 0 ? n : n.lessonCursor < a.circuit.length - 1 ? { ...n, lessonCursor: n.lessonCursor + 1 } : n.lesson < l.training.length - 1 ? { ...n, lesson: n.lesson + 1, lessonCursor: -1 } : qi(n, l);
    }
    case "LESSON_PREV": {
      const l = ot(n);
      if (l === null || n.screen !== "training") return n;
      if (n.lessonCursor > -1) return { ...n, lessonCursor: n.lessonCursor - 1 };
      if (n.lesson > 0) {
        const a = l.training[n.lesson - 1];
        return { ...n, lesson: n.lesson - 1, lessonCursor: (a?.circuit.length ?? 0) - 1 };
      }
      return n;
    }
    case "START_CHALLENGE": {
      const l = ot(n);
      return l === null || n.screen !== "training" && n.screen !== "briefing" ? n : qi(n, l);
    }
    case "SELECT_LETTER": {
      const l = ot(n);
      return l === null || n.screen !== "challenge" || !l.allowed.includes(s.letter) ? n : { ...n, selected: s.letter };
    }
    case "TOGGLE_BLOCK": {
      const l = ot(n);
      if (l === null || n.screen !== "challenge" || n.standDownDialog) return n;
      const a = Fe(l.code).n;
      if (s.qubit < 0 || s.qubit >= a) return n;
      const d = n.placements[s.qubit], f = { ...n.placements };
      if (d === n.selected)
        delete f[s.qubit];
      else if (d !== void 0)
        f[s.qubit] = n.selected;
      else {
        if (Tr(n.placements) >= l.budget) return n;
        f[s.qubit] = n.selected;
      }
      return oa(n, f);
    }
    case "RECALL_BLOCK": {
      if (n.screen !== "challenge" || n.standDownDialog || n.placements[s.qubit] === void 0) return n;
      const l = { ...n.placements };
      return delete l[s.qubit], oa(n, l);
    }
    case "CLEAR_CREWS":
      return n.screen !== "challenge" || n.standDownDialog || Tr(n.placements) === 0 ? n : oa(n, {});
    case "UNDO_PLACEMENT": {
      if (n.screen !== "challenge" || n.standDownDialog) return n;
      const l = n.undoStack[n.undoStack.length - 1];
      return l === void 0 ? n : {
        ...n,
        placements: l,
        undoStack: n.undoStack.slice(0, -1),
        redoStack: [...n.redoStack, n.placements].slice(-20)
      };
    }
    case "REDO_PLACEMENT": {
      if (n.screen !== "challenge" || n.standDownDialog) return n;
      const l = n.redoStack[n.redoStack.length - 1];
      return l === void 0 ? n : {
        ...n,
        placements: l,
        redoStack: n.redoStack.slice(0, -1),
        undoStack: [...n.undoStack, n.placements].slice(-20)
      };
    }
    case "TOGGLE_DETECTOR_HIGHLIGHT": {
      const l = ot(n);
      if (l === null) return n;
      if (s.checkIndex === null) return n.highlightedCheck === null ? n : { ...n, highlightedCheck: null };
      const a = Fe(l.code).checks.length;
      return !Number.isInteger(s.checkIndex) || s.checkIndex < 0 || s.checkIndex >= a ? n : { ...n, highlightedCheck: n.highlightedCheck === s.checkIndex ? null : s.checkIndex };
    }
    case "CONFIRM": {
      const l = ot(n);
      return l === null || n.screen !== "challenge" || n.standDownDialog ? n : Tr(n.placements) === 0 ? { ...n, standDownDialog: !0 } : cf(n, l, s.reducedMotion ?? !1);
    }
    case "STAND_DOWN_CANCEL":
      return { ...n, standDownDialog: !1 };
    case "STAND_DOWN_CONFIRM": {
      const l = ot(n);
      return l === null || n.screen !== "challenge" || !n.standDownDialog ? n : cf(n, l, s.reducedMotion ?? !1);
    }
    case "DISPATCH_DONE":
    case "DISPATCH_SKIP":
      return n.screen !== "dispatch" || n.debrief === null || n.dispatchDone ? n : { ...n, dispatchDone: !0 };
    case "OPEN_WHY": {
      if (n.debrief === null || !(n.screen === "dispatch" && n.dispatchDone) && n.screen !== "result") return n;
      const a = s.reducedMotion ?? n.settings.reducedMotion;
      return { ...n, screen: "debrief", replayIndex: 0, autoPlay: !a && n.debrief.steps.length > 1 };
    }
    case "REPLAY_GOTO": {
      if (n.debrief === null) return n;
      const l = Math.max(0, Math.min(n.debrief.steps.length - 1, s.index));
      return { ...n, replayIndex: l, autoPlay: l === n.debrief.steps.length - 1 ? !1 : n.autoPlay };
    }
    case "REPLAY_NEXT": {
      if (n.debrief === null) return n;
      const l = n.debrief.steps.length - 1, a = Math.min(l, n.replayIndex + 1);
      return { ...n, replayIndex: a, autoPlay: a === l ? !1 : n.autoPlay };
    }
    case "REPLAY_PREV":
      return n.debrief === null ? n : { ...n, replayIndex: Math.max(0, n.replayIndex - 1), autoPlay: !1 };
    case "REPLAY_AUTO": {
      if (n.debrief === null) return n;
      const l = n.debrief.steps.length - 1;
      return { ...n, autoPlay: s.on, replayIndex: s.on && n.replayIndex >= l ? 0 : n.replayIndex };
    }
    case "SHOW_RESULT":
      return n.debrief === null || !(n.screen === "dispatch" && n.dispatchDone) && n.screen !== "debrief" ? n : { ...n, screen: "result", autoPlay: !1 };
    case "TRY_AGAIN": {
      const l = ot(n);
      return l === null || n.screen !== "dispatch" && n.screen !== "debrief" && n.screen !== "result" ? n : qi(n, l);
    }
    case "NEXT_MISSION": {
      if (n.missionId === null || n.screen !== "dispatch" && n.screen !== "debrief" && n.screen !== "result" || n.screen === "dispatch" && !n.dispatchDone) return n;
      if (n.tutorialActive) return la(n);
      const l = Dm(n.missionId);
      return l === null ? { ...n, screen: "summary", autoPlay: !1 } : ia(n, l);
    }
    case "SET_SOUND":
      return { ...n, settings: { ...n.settings, sound: s.on } };
    case "SET_REDUCED_MOTION":
      return { ...n, settings: { ...n.settings, reducedMotion: s.on } };
    case "SET_LANGUAGE":
      return n.settings.language === s.language ? n : { ...n, settings: { ...n.settings, language: s.language } };
    case "SET_FREE_ROAM":
      return n.settings.freeRoam === s.on ? n : { ...n, settings: { ...n.settings, freeRoam: s.on } };
    case "RESET_PROGRESS":
      return { ...n, progress: {}, notice: Pa };
    case "SHOW_NOTICE":
      return { ...n, notice: s.text };
    case "DISMISS_NOTICE":
      return { ...n, notice: null };
  }
}
function cf(n, s, l) {
  const a = nh(s.id, n.placements), d = n.tutorialActive && a.verdict === "success";
  return {
    ...n,
    screen: "dispatch",
    standDownDialog: !1,
    debrief: a,
    dispatchDone: !1,
    replayIndex: 0,
    autoPlay: !l && a.steps.length > 1,
    progress: xg(n.progress, s.id, a.score.stars, a.score.completed),
    tutorialDone: n.tutorialDone || d
  };
}
function kg(n) {
  return { version: Cs, progress: n.progress, settings: n.settings, tutorialDone: n.tutorialDone };
}
function $a(n) {
  return Ln().reduce((s, l) => s + (n[l.id]?.stars ?? 0), 0);
}
const m = {
  /* ground + sky */
  sky: "#d4ecf8",
  skyDeep: "#bcdff2",
  cloud: "#ffffff",
  sand: "#f5e8d0",
  sandDark: "#e6d4b2",
  shadow: "#d8c49c",
  grass: "#a9d67f",
  grassDark: "#7fb95a",
  road: "#8f9099",
  roadEdge: "#6c6e79",
  roadLine: "#f8f1dc",
  river: "#8fd3f0",
  riverDark: "#5db4da",
  /* ink */
  ink: "#2b2a33",
  inkSoft: "#5a586a",
  paper: "#ffffff",
  /* houses */
  wallPeach: "#f8d9c6",
  wallMint: "#cfe9d9",
  wallButter: "#fae9ab",
  wallLilac: "#dcd6f4",
  wallRose: "#f6c8d2",
  wallPowder: "#cfe3f7",
  wallBrick: "#d9705e",
  wallStone: "#e9e3d6",
  side: "#c9b8a2",
  roofTerracotta: "#c94f3f",
  roofSlate: "#5a6e8c",
  roofMoss: "#7c9e6a",
  roofPlum: "#8c5a7c",
  windowDark: "#4a6a8f",
  windowLit: "#ffd659",
  door: "#8a5a3c",
  /* fire */
  fireX: "#e8432f",
  fireXCore: "#ffb13d",
  fireZ: "#2f7fe6",
  fireZCore: "#a3d6ff",
  fireYCore: "#fff2c4",
  smoke: "#b8bcc8",
  smokeDark: "#9a9fae",
  steam: "#f2f6fa",
  /* water (never a blue flame: pale cyan, round drops, white highlights) */
  water: "#8fe3f5",
  waterDeep: "#4ec0e2",
  waterHighlight: "#ffffff",
  /* alarms */
  alarm: "#ffb020",
  alarmRing: "#ffd24d",
  alarmDark: "#8a4b00",
  /* crews */
  crewX: "#e8432f",
  crewZ: "#2f7fe6",
  crewY: "#9b5de5",
  jacket: "#2f3b5c",
  jacketStripe: "#ffd24d",
  skin: "#f3c9a6",
  boots: "#2b2a33",
  hose: "#f0d35a",
  /* truck */
  truck: "#d8352b",
  truckDark: "#a8261f",
  truckTrim: "#f3f3f6",
  ladder: "#d9d9e0",
  wheel: "#2b2a33",
  hub: "#d5d5dc",
  glass: "#a3d6ff",
  beaconBlue: "#3d8dff",
  /* result + state */
  success: "#3fb96a",
  danger: "#d62839",
  fog: "#b9bcc6",
  fogDark: "#8d919e",
  ghost: "#6f6d7d",
  highlight: "#ff9f1c",
  flag: "#ff6b4a",
  flagPole: "#8a6a4a",
  barrier: "#ff9f1c",
  barrierStripe: "#2b2a33",
  lamp: "#fff1b8",
  lampPost: "#5a586a",
  tree: "#7fb95a",
  treeDark: "#5f9a42",
  trunk: "#8a5a3c",
  beaconDome: "#f5f1e6"
}, vg = { X: m.crewX, Z: m.crewZ, Y: m.crewY }, J = 2.5, fe = 1.6, uf = [m.wallPeach, m.wallMint, m.wallButter, m.wallLilac, m.wallRose, m.wallPowder], df = [m.roofTerracotta, m.roofSlate, m.roofMoss, m.roofPlum];
function Pe(n) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}
const _s = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
function rh(n) {
  return vg[n];
}
function Ie({ x: n, y: s, scale: l = 1, title: a, className: d, children: f }) {
  const p = l === 1 ? `translate(${Pe(n)} ${Pe(s)})` : `translate(${Pe(n)} ${Pe(s)}) scale(${Pe(l)})`;
  return /* @__PURE__ */ i.jsxs("g", { transform: p, className: d, role: a === void 0 ? void 0 : "img", "aria-label": a, children: [
    a !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: a }) : null,
    f
  ] });
}
function Cn({ cx: n, cy: s, r: l, letter: a, fill: d = m.paper, ink: f = m.ink, stroke: p = m.ink }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: l, fill: d, stroke: p, strokeWidth: J * 0.8 }),
    /* @__PURE__ */ i.jsx("text", { x: n, y: s + l * 0.72, textAnchor: "middle", fontSize: l * 1.9, fontWeight: 800, fill: f, fontFamily: _s, style: { userSelect: "none" }, children: a })
  ] });
}
function Rn({ cx: n, cy: s, rx: l, ry: a = l * 0.32 }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.shadow });
}
const sh = "M0 0 C-26 0 -38 -16 -38 -36 C-38 -52 -30 -60 -32 -74 C-24 -66 -18 -58 -16 -48 C-10 -62 -4 -76 0 -92", ih = "M0 -92 C6 -74 20 -62 28 -48 C36 -34 36 -14 22 -4 C16 0 8 0 0 0", ca = `${sh} ${ih} Z`, jg = "M0 -6 C-14 -6 -20 -16 -20 -28 C-20 -40 -12 -48 -8 -56 C-4 -46 2 -40 4 -32 C10 -40 10 -50 10 -56 C18 -46 20 -34 18 -24 C16 -12 10 -6 0 -6 Z";
function Rr({ letter: n, residual: s = !1, ghost: l = !1, ...a }) {
  const d = n === "Z" ? m.fireZ : m.fireX, f = n === "X" ? m.fireX : m.fireZ, p = n === "X" ? m.fireXCore : n === "Z" ? m.fireZCore : m.fireYCore;
  return l ? /* @__PURE__ */ i.jsxs(Ie, { ...a, children: [
    /* @__PURE__ */ i.jsx("path", { d: ca, fill: m.paper, fillOpacity: 0.6, stroke: m.ghost, strokeWidth: J, strokeDasharray: "7 5", strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: -26, r: 13, letter: n, ink: m.ghost, stroke: m.ghost })
  ] }) : /* @__PURE__ */ i.jsxs(Ie, { ...a, children: [
    s ? /* @__PURE__ */ i.jsx("path", { d: ca, fill: "none", stroke: m.danger, strokeWidth: J * 3.2, strokeLinejoin: "round" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `${sh} L0 0 Z`, fill: d }),
    /* @__PURE__ */ i.jsx("path", { d: `${ih} L0 -92 Z`, fill: f }),
    /* @__PURE__ */ i.jsx("path", { d: jg, fill: p }),
    /* @__PURE__ */ i.jsx("path", { d: ca, fill: "none", stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: -26, r: 13, letter: n })
  ] });
}
function ff({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, scale: (s.scale ?? 1) * n, children: [
    /* @__PURE__ */ i.jsxs("g", { fill: m.smoke, stroke: m.ink, strokeWidth: J * 0.8, children: [
      /* @__PURE__ */ i.jsx("circle", { cx: -10, cy: -18, r: 14 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 8, cy: -30, r: 17 }),
      /* @__PURE__ */ i.jsx("circle", { cx: -6, cy: -50, r: 13 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 14, cy: -66, r: 11 })
    ] }),
    /* @__PURE__ */ i.jsxs("g", { fill: m.smokeDark, children: [
      /* @__PURE__ */ i.jsx("circle", { cx: -14, cy: -14, r: 7 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 4, cy: -28, r: 8 })
    ] })
  ] });
}
function Sg(n) {
  return /* @__PURE__ */ i.jsx(Ie, { ...n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.steam, stroke: m.fogDark, strokeWidth: J * 0.7, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: -12, cy: -14, r: 11 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 6, cy: -22, r: 13 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -2, cy: -40, r: 9 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 14, cy: -50, r: 6 })
  ] }) });
}
function lh(n) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...n, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -16, r: 16, fill: m.success, stroke: m.ink, strokeWidth: J * 0.8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M-8 -16 L-2 -10 L9 -23", fill: "none", stroke: m.paper, strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function bg({ from: n, to: s, progress: l = 1, lift: a, title: d, className: f }) {
  const p = s.x - n.x, x = s.y - n.y, g = Math.hypot(p, x), b = a ?? Math.max(28, g * 0.35), S = (n.x + s.x) / 2, v = Math.min(n.y, s.y) - b, E = Math.max(0, Math.min(1, l)), I = { x: n.x + (S - n.x) * E, y: n.y + (v - n.y) * E }, $ = { x: S + (s.x - S) * E, y: v + (s.y - v) * E }, R = { x: I.x + ($.x - I.x) * E, y: I.y + ($.y - I.y) * E }, L = `M${Pe(n.x)} ${Pe(n.y)} Q${Pe(I.x)} ${Pe(I.y)} ${Pe(R.x)} ${Pe(R.y)}`, F = [];
  for (let X = 1; X <= 4; X++) {
    const _ = X / 5 * E, U = 1 - _, re = U * U * n.x + 2 * U * _ * S + _ * _ * s.x, ne = U * U * n.y + 2 * U * _ * v + _ * _ * s.y;
    F.push({ x: re + (X % 2 === 0 ? 9 : -9), y: ne + 10 + X % 2 * 4, r: 3.2 + X % 3 });
  }
  return /* @__PURE__ */ i.jsxs("g", { className: f, role: d === void 0 ? void 0 : "img", "aria-label": d, children: [
    d !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: d }) : null,
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.waterDeep, strokeWidth: 13, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.water, strokeWidth: 9, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.waterHighlight, strokeWidth: 2.4, strokeLinecap: "round", strokeDasharray: "10 14" }),
    F.map((X, _) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: X.x, cy: X.y, r: X.r, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: X.x - X.r * 0.3, cy: X.y - X.r * 0.3, r: X.r * 0.3, fill: m.waterHighlight })
    ] }, _)),
    E >= 1 ? /* @__PURE__ */ i.jsx("circle", { cx: s.x, cy: s.y, r: 8, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }) : null
  ] });
}
function Ng({ spread: n = 1, ...s }) {
  const l = 0.4 + 0.6 * Math.max(0, Math.min(1, n)), a = [-150, -115, -80, -50, -25, 0, 30].map((d, f) => {
    const p = d * Math.PI / 180, x = (26 + f % 2 * 10) * l;
    return { x: Math.cos(p) * x, y: Math.sin(p) * x - 4, size: 3.5 + f % 3 * 1.2 };
  });
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 26 * l, ry: 7 * l, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6 * l, cy: 1, rx: 8 * l, ry: 2.2 * l, fill: m.waterHighlight }),
    a.map((d, f) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("line", { x1: 0, y1: -4, x2: d.x * 0.55, y2: d.y * 0.55, stroke: m.water, strokeWidth: 2.2, strokeLinecap: "round" }),
      /* @__PURE__ */ i.jsx("circle", { cx: d.x, cy: d.y, r: d.size, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: d.x - d.size * 0.3, cy: d.y - d.size * 0.3, r: d.size * 0.3, fill: m.waterHighlight })
    ] }, f))
  ] });
}
function Eg(n) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...n, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M0 -40 C8 -26 16 -18 16 -8 A16 16 0 0 1 -16 -8 C-16 -18 -8 -26 0 -40 Z", fill: m.water, stroke: m.waterDeep, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6, cy: -12, rx: 3.5, ry: 5, fill: m.waterHighlight })
  ] });
}
const hf = { x: 34, y: -34 };
function Cg(n, s, l = 1, a = 1) {
  return { x: n + hf.x * l * a, y: s + hf.y * l };
}
function oh({ letter: n, pose: s = "idle", facing: l = 1, shadow: a = !0, ...d }) {
  const f = rh(n), p = Tg(s);
  return /* @__PURE__ */ i.jsxs(Ie, { ...d, children: [
    a ? /* @__PURE__ */ i.jsx(Rn, { cx: 0, cy: 1, rx: 16, ry: 4.5 }) : null,
    /* @__PURE__ */ i.jsxs("g", { transform: l === -1 ? "scale(-1 1)" : void 0, children: [
      s === "spray" ? /* @__PURE__ */ i.jsx("path", { d: "M-4 -40 L18 -34", stroke: m.jacket, strokeWidth: 7, strokeLinecap: "round" }) : null,
      /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round", children: [
        /* @__PURE__ */ i.jsx("path", { d: p.back, fill: m.jacket }),
        /* @__PURE__ */ i.jsx("path", { d: p.front, fill: m.jacket })
      ] }),
      /* @__PURE__ */ i.jsx("rect", { x: p.bootBack - 6, y: -7, width: 12, height: 7, rx: 2, fill: m.boots }),
      /* @__PURE__ */ i.jsx("rect", { x: p.bootFront - 6, y: -7, width: 12, height: 7, rx: 2, fill: m.boots }),
      /* @__PURE__ */ i.jsx("path", { d: "M-13 -24 L-13 -44 Q-13 -48 -9 -48 L9 -48 Q13 -48 13 -44 L13 -24 Z", fill: m.jacket, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: -13, y: -36, width: 26, height: 3.5, fill: m.jacketStripe }),
      /* @__PURE__ */ i.jsx("rect", { x: -13, y: -29, width: 26, height: 3.5, fill: m.jacketStripe }),
      s === "spray" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: "M6 -42 L30 -36", stroke: m.jacket, strokeWidth: 7, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: "M6 -42 L30 -36", stroke: m.jacketStripe, strokeWidth: 2, strokeLinecap: "round", strokeDasharray: "3 6" }),
        /* @__PURE__ */ i.jsx("rect", { x: 22, y: -40, width: 14, height: 9, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
        /* @__PURE__ */ i.jsx("rect", { x: 34, y: -38, width: 5, height: 5, fill: m.hose, stroke: m.ink, strokeWidth: 1 })
      ] }) : s === "idle" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: "M-13 -44 L-16 -27", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: "M13 -44 L16 -27", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: s === "run1" ? "M-12 -44 L-20 -33" : "M-12 -44 L-6 -30", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: s === "run1" ? "M12 -44 L18 -30" : "M12 -44 L22 -36", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -55, r: 9.5, fill: m.skin, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("circle", { cx: 3.5, cy: -56, r: 1.4, fill: m.ink }),
      /* @__PURE__ */ i.jsx("path", { d: "M-14 -58 Q-14 -80 0 -80 Q14 -80 14 -58 Z", fill: f, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: -17, y: -60, width: 34, height: 4.5, rx: 2, fill: f, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("g", { transform: l === -1 ? "scale(-1 1)" : void 0, children: /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: -69, r: 7.5, letter: n }) })
    ] })
  ] });
}
function Tg(n) {
  switch (n) {
    case "idle":
      return { back: "M-10 -24 L-10 -6 L-1 -6 L-1 -24 Z", front: "M1 -24 L1 -6 L10 -6 L10 -24 Z", bootBack: -5.5, bootFront: 5.5 };
    case "run1":
      return { back: "M-4 -24 L-18 -8 L-11 -4 L2 -20 Z", front: "M2 -24 L14 -10 L8 -5 L-5 -19 Z", bootBack: -15, bootFront: 12 };
    case "run2":
      return { back: "M-3 -24 L-9 -6 L0 -6 L5 -22 Z", front: "M1 -24 L8 -9 L14 -11 L10 -24 Z", bootBack: -5, bootFront: 11 };
    case "spray":
      return { back: "M-6 -24 L-14 -6 L-6 -6 L2 -22 Z", front: "M2 -24 L8 -6 L16 -6 L10 -24 Z", bootBack: -10, bootFront: 12 };
  }
}
function Ma({ letter: n, ...s }) {
  const l = rh(n);
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -8 Q-22 -40 0 -40 Q22 -40 22 -8 Z", fill: l, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("rect", { x: -27, y: -10, width: 54, height: 8, rx: 4, fill: l, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: -22, r: 10, letter: n })
  ] });
}
function ah({ facing: n = 1, lights: s = !1, wheelFrame: l = 0, ...a }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...a, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 0, cy: 2, rx: 72, ry: 6 }),
    /* @__PURE__ */ i.jsxs("g", { transform: n === -1 ? "scale(-1 1)" : void 0, children: [
      /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: fe, children: [
        /* @__PURE__ */ i.jsx("rect", { x: -66, y: -66, width: 92, height: 5, fill: m.ladder }),
        /* @__PURE__ */ i.jsx("rect", { x: -66, y: -58, width: 92, height: 5, fill: m.ladder }),
        [-58, -44, -30, -16, -2, 12].map((d) => /* @__PURE__ */ i.jsx("line", { x1: d, y1: -66, x2: d, y2: -53 }, d))
      ] }),
      /* @__PURE__ */ i.jsx("rect", { x: -72, y: -52, width: 100, height: 42, rx: 4, fill: m.truck, stroke: m.ink, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("rect", { x: -72, y: -32, width: 100, height: 6, fill: m.truckTrim }),
      /* @__PURE__ */ i.jsxs("g", { fill: m.truckDark, stroke: m.ink, strokeWidth: fe, children: [
        /* @__PURE__ */ i.jsx("rect", { x: -64, y: -47, width: 22, height: 13, rx: 2 }),
        /* @__PURE__ */ i.jsx("rect", { x: -38, y: -47, width: 22, height: 13, rx: 2 }),
        /* @__PURE__ */ i.jsx("rect", { x: -12, y: -47, width: 22, height: 13, rx: 2 })
      ] }),
      /* @__PURE__ */ i.jsx("path", { d: "M28 -10 L28 -58 Q28 -62 32 -62 L58 -62 Q66 -62 70 -54 L76 -36 L76 -10 Z", fill: m.truck, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("path", { d: "M34 -56 L58 -56 Q63 -56 65 -51 L70 -38 L34 -38 Z", fill: m.glass, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: 28, y: -32, width: 48, height: 6, fill: m.truckTrim }),
      /* @__PURE__ */ i.jsx("rect", { x: 70, y: -18, width: 10, height: 8, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("circle", { cx: -56, cy: -24, r: 6, fill: m.hose, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: 40, y: -70, width: 14, height: 8, rx: 3, fill: s ? m.beaconBlue : m.glass, stroke: m.ink, strokeWidth: fe }),
      s ? /* @__PURE__ */ i.jsx("circle", { cx: 47, cy: -66, r: 11, fill: "none", stroke: m.beaconBlue, strokeWidth: 2 }) : null,
      /* @__PURE__ */ i.jsx(pf, { cx: -42, frame: l }),
      /* @__PURE__ */ i.jsx(pf, { cx: 48, frame: l })
    ] })
  ] });
}
function pf({ cx: n, frame: s }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 13, fill: m.wheel }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 6.5, fill: m.hub, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 5, y1: s === 0 ? -13 : -18, x2: n + 5, y2: s === 0 ? -13 : -8, stroke: m.ink, strokeWidth: 1.6 })
  ] });
}
const ua = -44, jt = 16;
function ch({ type: n, ringing: s, highlighted: l }) {
  const a = n === "Z" ? m.fireX : m.fireZ, d = s ? m.alarm : m.paper, f = s ? m.alarmDark : a;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    l ? /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: jt + 9, fill: "none", stroke: m.highlight, strokeWidth: J * 1.6 }) : null,
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: jt + 7, fill: "none", stroke: m.alarmRing, strokeWidth: 2.4 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: jt + 13, fill: "none", stroke: m.alarmRing, strokeWidth: 1.6 })
    ] }) : null,
    n === "Z" ? /* @__PURE__ */ i.jsx("polygon", { points: `0,${String(-jt)} ${String(jt)},0 0,${String(jt)} ${String(-jt)},0`, fill: d, stroke: f, strokeWidth: J, strokeLinejoin: "round" }) : /* @__PURE__ */ i.jsx("rect", { x: -jt * 0.85, y: -jt * 0.85, width: jt * 1.7, height: jt * 1.7, rx: 3, fill: d, stroke: f, strokeWidth: J }),
    s ? /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: 0, r: 9, letter: "!", fill: m.paper, ink: m.alarmDark, stroke: m.alarmDark }) : /* @__PURE__ */ i.jsx("text", { x: 0, y: 6.5, textAnchor: "middle", fontSize: 18, fontWeight: 800, fill: a, fontFamily: _s, style: { userSelect: "none" }, children: n })
  ] });
}
function bs({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...a, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 0, cy: 1, rx: 10, ry: 3 }),
    l ? /* @__PURE__ */ i.jsx("line", { x1: 0, y1: ua + jt + 9, x2: 0, y2: 0, stroke: m.highlight, strokeWidth: 9, strokeLinecap: "round" }) : null,
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: ua + jt - 4, width: 6, height: 32, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -9, y: -5, width: 18, height: 5, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("g", { transform: `translate(0 ${String(ua)})`, children: /* @__PURE__ */ i.jsx(ch, { type: n, ringing: s, highlighted: l }) })
  ] });
}
function Ig({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsx(Ie, { ...a, children: /* @__PURE__ */ i.jsx(ch, { type: n, ringing: s, highlighted: l }) });
}
const Lg = {
  small: { w: 64, h: 44, roof: 30, side: 12 },
  tall: { w: 56, h: 84, roof: 22, side: 12 },
  shop: { w: 84, h: 46, roof: 16, side: 12 }
};
function He({ variant: n = "small", state: s = { kind: "normal" }, tint: l = 0, selected: a = !1, ...d }) {
  const f = Lg[n], p = uf[l % uf.length] ?? m.wallPeach, x = df[l % df.length] ?? m.roofTerracotta, g = f.w / 2, S = s.kind === "restored" ? m.windowLit : m.windowDark, v = -(f.h + f.roof), E = s.kind === "fog";
  return /* @__PURE__ */ i.jsxs(Ie, { ...d, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: f.side / 2, cy: 2, rx: g + f.side, ry: 7 }),
    s.kind === "residual" ? /* @__PURE__ */ i.jsx("rect", { x: -g - 6, y: v - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.danger, strokeWidth: J * 2.4 }) : null,
    a ? /* @__PURE__ */ i.jsx("rect", { x: -g - 8, y: v - 8, width: f.w + f.side + 16, height: f.h + f.roof + 16, rx: 10, fill: "none", stroke: m.highlight, strokeWidth: J * 1.6, strokeDasharray: "10 6" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `M${String(g)} 0 L${String(g + f.side)} ${String(-f.side * 0.6)} L${String(g + f.side)} ${String(-f.h - f.side * 0.6)} L${String(g)} ${String(-f.h)} Z`, fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -g, y: -f.h, width: f.w, height: f.h, fill: p, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(g + 4)} ${String(-f.h)} L${String(g + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(f.side)} ${String(v - f.side * 0.6)} L0 ${String(v)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-g - 5)} ${String(-f.h)} L0 ${String(v)} L${String(g + 5)} ${String(-f.h)} Z`, fill: x, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-g - 4)} ${String(-f.h)} L${String(-g - 4 + f.side)} ${String(-f.h - f.side * 0.6)} L${String(g + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(g + 4)} ${String(-f.h)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: -g - 4, y: -f.h - f.roof, width: f.w + 8, height: f.roof, fill: x, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      n === "shop" ? /* @__PURE__ */ i.jsx("path", { d: `M${String(-g - 4)} ${String(-f.h - f.roof)} H${String(g + 4)}`, stroke: m.paper, strokeWidth: 4, strokeDasharray: "8 8" }) : null
    ] }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -g + 9, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: S, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: g - 25, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: S, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -22, width: 16, height: 22, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe })
    ] }) : n === "tall" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      [0, 1, 2].map((I) => /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("rect", { x: -g + 8, y: -f.h + 10 + I * 22, width: 14, height: 13, rx: 2, fill: S, stroke: m.ink, strokeWidth: fe }),
        /* @__PURE__ */ i.jsx("rect", { x: g - 22, y: -f.h + 10 + I * 22, width: 14, height: 13, rx: 2, fill: S, stroke: m.ink, strokeWidth: fe })
      ] }, I)),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -20, width: 16, height: 20, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -g + 8, y: -f.h + 12, width: f.w - 40, height: 22, rx: 2, fill: S, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: g - 26, y: -26, width: 18, height: 26, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: -g - 4, y: -f.h + 2, width: f.w + 8, height: 6, fill: m.paper, stroke: m.ink, strokeWidth: fe })
    ] }),
    s.kind === "fire" || s.kind === "residual" ? /* @__PURE__ */ i.jsx(Rr, { letter: s.letter, x: n === "shop" ? -10 : 0, y: v + 14, scale: 0.62, residual: s.kind === "residual" }) : null,
    s.kind === "ghost" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -g - 6, y: v - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.ghost, strokeWidth: J, strokeDasharray: "8 6" }),
      /* @__PURE__ */ i.jsx(Rr, { letter: s.letter, x: 0, y: v + 14, scale: 0.62, ghost: !0 })
    ] }) : null,
    s.kind === "out" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Sg, { x: 0, y: v + 10, scale: 0.7 }),
      /* @__PURE__ */ i.jsx(lh, { x: g - 4, y: -f.h + 6, scale: 0.8 })
    ] }) : null,
    E ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -g - 10, y: v - 12, width: f.w + f.side + 20, height: f.h + f.roof + 14, rx: 14, fill: m.fog, fillOpacity: 0.82, stroke: m.fogDark, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("text", { x: f.side / 2, y: -(f.h + f.roof) / 2 + 14, textAnchor: "middle", fontSize: 38, fontWeight: 800, fill: m.paper, stroke: m.fogDark, strokeWidth: 1.2, fontFamily: _s, style: { userSelect: "none" }, children: "?" })
    ] }) : null
  ] });
}
function ll({ anomaly: n = null, lit: s = !1, ...l }) {
  const a = n === null ? s ? m.windowLit : m.beaconDome : n === "X" ? m.fireX : n === "Z" ? m.fireZ : m.crewY;
  return /* @__PURE__ */ i.jsxs(Ie, { ...l, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 6, cy: 2, rx: 44, ry: 7 }),
    /* @__PURE__ */ i.jsx("path", { d: "M26 0 L38 -7 L38 -112 L26 -118 Z", fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -26, y: -118, width: 52, height: 118, fill: m.wallStone, stroke: m.ink, strokeWidth: J }),
    [0, 1, 2].map((d) => /* @__PURE__ */ i.jsx("rect", { x: -7, y: -104 + d * 30, width: 14, height: 18, rx: 7, fill: s ? m.windowLit : m.windowDark, stroke: m.ink, strokeWidth: fe }, d)),
    /* @__PURE__ */ i.jsx("rect", { x: -10, y: -24, width: 20, height: 24, rx: 4, fill: m.door, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("rect", { x: -32, y: -126, width: 76, height: 10, fill: m.roofPlum, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("rect", { x: -22, y: -150, width: 44, height: 26, fill: m.wallStone, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M-18 -150 Q0 -176 18 -150 Z", fill: a, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("rect", { x: -22, y: -152, width: 44, height: 5, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
    n !== null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -158, r: 28, fill: "none", stroke: a, strokeWidth: 3, strokeDasharray: "6 6" }),
      n === "Y" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Cn, { cx: -14, cy: -186, r: 11, letter: "X", ink: m.fireX, stroke: m.fireX }),
        /* @__PURE__ */ i.jsx(Cn, { cx: 14, cy: -186, r: 11, letter: "Z", ink: m.fireZ, stroke: m.fireZ })
      ] }) : /* @__PURE__ */ i.jsx(Cn, { cx: 0, cy: -186, r: 12, letter: n, ink: a, stroke: a })
    ] }) : null
  ] });
}
function Rg({ open: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 8, cy: 2, rx: 84, ry: 8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M70 0 L84 -8 L84 -72 L70 -64 Z", fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -70, y: -64, width: 140, height: 64, fill: m.wallBrick, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M-74 -64 L-60 -72 L84 -72 L70 -64 Z", fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -74, y: -70, width: 148, height: 6, fill: m.truckTrim, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("rect", { x: -58, y: -46, width: 44, height: 46, rx: 4, fill: n ? m.ink : m.truckTrim, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("rect", { x: -4, y: -46, width: 44, height: 46, rx: 4, fill: m.truckTrim, stroke: m.ink, strokeWidth: J }),
    n ? null : /* @__PURE__ */ i.jsx("path", { d: "M-54 -34 H-18 M-54 -22 H-18 M-54 -10 H-18", stroke: m.ink, strokeWidth: 1.4 }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -34 H36 M0 -22 H36 M0 -10 H36", stroke: m.ink, strokeWidth: 1.4 }),
    /* @__PURE__ */ i.jsx("rect", { x: 48, y: -52, width: 14, height: 14, rx: 2, fill: m.windowDark, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("rect", { x: -50, y: -104, width: 28, height: 34, fill: m.wallBrick, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M-54 -104 L-36 -120 L-18 -104 Z", fill: m.roofTerracotta, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: "M-42 -84 Q-36 -98 -30 -84 Z", fill: m.alarmRing, stroke: m.ink, strokeWidth: fe })
  ] });
}
function uh({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 8, cy: 2, rx: 76, ry: 8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M60 0 L74 -8 L74 -62 L60 -54 Z", fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -60, y: -54, width: 120, height: 54, fill: m.wallPowder, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M-64 -54 L-50 -62 L74 -62 L60 -54 Z", fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -52, y: -44, width: 104, height: 24, rx: 4, fill: m.glass, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("path", { d: "M-40 -44 V-20 M-20 -44 V-20 M0 -44 V-20 M20 -44 V-20 M40 -44 V-20", stroke: m.paper, strokeWidth: 2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -10, y: -18, width: 20, height: 18, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx(dh, { x: 0, y: -62, scale: 0.9, active: n, label: !1 })
  ] });
}
function dh({ active: n = !1, label: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...l, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -16, y: -6, width: 32, height: 6, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: -20, width: 6, height: 14, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsxs("g", { transform: "rotate(-45 0 -30)", children: [
      /* @__PURE__ */ i.jsx("rect", { x: -22, y: -34, width: 44, height: 8, rx: 2, fill: n ? m.alarmRing : m.glass, stroke: m.ink, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("line", { x1: -16, y1: -30, x2: 14, y2: -30, stroke: m.paper, strokeWidth: 2 })
    ] }),
    s ? /* @__PURE__ */ i.jsx("text", { x: 0, y: -40, textAnchor: "middle", fontSize: 16, fontWeight: 800, fill: m.ink, fontFamily: _s, style: { userSelect: "none" }, children: "H" }) : null
  ] });
}
function fh({ width: n = 160, ...s }) {
  const l = n / 2;
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("path", { d: `M${String(-l)} 0 Q0 -46 ${String(l)} 0`, fill: "none", stroke: m.ink, strokeWidth: J + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: `M${String(-l)} 0 Q0 -46 ${String(l)} 0`, fill: "none", stroke: m.wallStone, strokeWidth: 6 }),
    /* @__PURE__ */ i.jsx("rect", { x: -l - 6, y: -12, width: n + 12, height: 12, rx: 3, fill: m.wallStone, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: fe, children: [
      /* @__PURE__ */ i.jsx("line", { x1: -l, y1: -12, x2: l, y2: -12 }),
      /* @__PURE__ */ i.jsx("line", { x1: -l - 2, y1: -26, x2: l + 2, y2: -26, stroke: m.roofSlate, strokeWidth: 3 }),
      Array.from({ length: Math.floor(n / 20) + 1 }, (a, d) => -l + d * 20).map((a) => /* @__PURE__ */ i.jsx("line", { x1: a, y1: -12, x2: a, y2: -26 }, a))
    ] }),
    /* @__PURE__ */ i.jsxs("g", { fill: m.wallStone, stroke: m.ink, strokeWidth: J, children: [
      /* @__PURE__ */ i.jsx("rect", { x: -l - 14, y: -30, width: 14, height: 30, rx: 2 }),
      /* @__PURE__ */ i.jsx("rect", { x: l, y: -30, width: 14, height: 30, rx: 2 })
    ] })
  ] });
}
function Da({ x: n = 0, y: s = 0, width: l, height: a, rx: d = 0 }) {
  return /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: d, fill: m.sand });
}
function Qn({ cx: n, cy: s, rx: l, ry: a }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.grass });
}
function _g({ d: n, width: s = 40, className: l }) {
  return /* @__PURE__ */ i.jsxs("g", { className: l, fill: "none", strokeLinecap: "butt", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadEdge, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.road, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadLine, strokeWidth: Math.max(2, s * 0.08), strokeDasharray: `${Pe(s * 0.5)} ${Pe(s * 0.45)}` })
  ] });
}
function Og({ d: n, width: s = 14 }) {
  return /* @__PURE__ */ i.jsx("path", { d: n, fill: "none", stroke: m.sandDark, strokeWidth: s, strokeLinecap: "round", strokeLinejoin: "round" });
}
function hh({ d: n, width: s = 60 }) {
  return /* @__PURE__ */ i.jsxs("g", { fill: "none", strokeLinecap: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.riverDark, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.river, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.paper, strokeWidth: 2, strokeDasharray: "14 22", transform: "translate(-10 0)" })
  ] });
}
function gt({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, scale: (s.scale ?? 1) * n, children: [
    /* @__PURE__ */ i.jsx(Rn, { cx: 2, cy: 1, rx: 14, ry: 4 }),
    /* @__PURE__ */ i.jsx("rect", { x: -4, y: -22, width: 8, height: 22, fill: m.trunk, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -38, r: 19, fill: m.tree, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("circle", { cx: -9, cy: -30, r: 11, fill: m.treeDark }),
    /* @__PURE__ */ i.jsx("circle", { cx: 7, cy: -46, r: 7, fill: m.grass })
  ] });
}
function Pg({ lit: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2.5, y: -62, width: 5, height: 62, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -8, y: -4, width: 16, height: 4, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -62 Q0 -70 10 -70", fill: "none", stroke: m.lampPost, strokeWidth: 4 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: 13, cy: -70, rx: 8, ry: 5, fill: n ? m.windowLit : m.lamp, stroke: m.ink, strokeWidth: fe }),
    n ? /* @__PURE__ */ i.jsx("path", { d: "M6 -64 L13 -52 L20 -64 Z", fill: m.windowLit, fillOpacity: 0.6 }) : null
  ] });
}
function $g({ colour: n = m.flag, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2, y: -62, width: 4, height: 62, fill: m.flagPole, stroke: m.ink, strokeWidth: 1 }),
    /* @__PURE__ */ i.jsx("path", { d: "M2 -62 L36 -50 L2 -38 Z", fill: n, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -64, r: 3.5, fill: m.alarmRing, stroke: m.ink, strokeWidth: 1 })
  ] });
}
function Mg(n) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...n, children: [
    /* @__PURE__ */ i.jsxs("g", { fill: m.barrierStripe, stroke: m.ink, strokeWidth: fe, children: [
      /* @__PURE__ */ i.jsx("rect", { x: -30, y: -22, width: 6, height: 22 }),
      /* @__PURE__ */ i.jsx("rect", { x: 24, y: -22, width: 6, height: 22 })
    ] }),
    /* @__PURE__ */ i.jsx("rect", { x: -36, y: -34, width: 72, height: 14, rx: 3, fill: m.barrier, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("g", { fill: m.barrierStripe, children: [-28, -10, 8, 26].map((s) => /* @__PURE__ */ i.jsx("path", { d: `M${String(s)} -32 L${String(s + 8)} -32 L${String(s)} -22 L${String(s - 8)} -22 Z` }, s)) })
  ] });
}
function Dg({ x: n, y: s, width: l, height: a }) {
  const d = Math.min(l, a) * 0.28;
  return /* @__PURE__ */ i.jsxs("g", { fill: m.fog, fillOpacity: 0.8, stroke: m.fogDark, strokeWidth: fe, children: [
    /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: d }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.22, cy: s + a * 0.2, r: d * 0.8 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.78, cy: s + a * 0.76, r: d * 0.9 })
  ] });
}
function ph(n) {
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(ff, { ...n, scale: (n.scale ?? 1) * 1.3 }),
    /* @__PURE__ */ i.jsx(ff, { ...n, x: n.x + 26 * (n.scale ?? 1), y: n.y - 40 * (n.scale ?? 1), scale: (n.scale ?? 1) * 0.9 })
  ] });
}
function da({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsx(Ie, { ...s, scale: (s.scale ?? 1) * n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.cloud, stroke: m.skyDeep, strokeWidth: fe, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: -10, rx: 44, ry: 12 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -14, cy: -18, r: 14 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 10, cy: -22, r: 18 })
  ] }) });
}
function el({ colour: n = m.crewZ, earned: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...l, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -54 H22 V-24 Q22 -8 0 0 Q-22 -8 -22 -24 Z", fill: s ? n : m.fog, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -44 L4.5 -35 L14 -34 L7 -27 L9 -17 L0 -22 L-9 -17 L-7 -27 L-14 -34 L-4.5 -35 Z", fill: s ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" })
  ] });
}
const _r = 1600, Or = 1e3, qt = 170, Kn = ["station-row", "bridge", "lab", "central", "market", "old-town"], Ns = { x: 80, y: 540, w: 230, h: 160, door: { x: 195 } }, Aa = 720, mh = 40, gh = 730, Ag = 60, It = [
  { id: "station-row", missionId: "first-alarm", x: 380, y: 520, w: 260, h: 180, label: { x: 510, y: 505 }, entry: { x: 510, y: 720 }, gate: { x: 396, y: 596 }, block: { x: 510, y: 700 }, smoke: { x: 510, y: 600 } },
  { id: "bridge", missionId: "red-forward-blue-backward", x: 640, y: 640, w: 180, h: 120, label: { x: 730, y: 625 }, entry: { x: 600, y: 720 }, gate: { x: 662, y: 664 }, block: { x: 628, y: 724 }, smoke: { x: 740, y: 700 } },
  { id: "lab", missionId: "color-switch", x: 860, y: 260, w: 240, h: 180, label: { x: 980, y: 245 }, entry: { x: 940, y: 460 }, gate: { x: 876, y: 404 }, block: { x: 940, y: 468 }, smoke: { x: 1010, y: 340 } },
  { id: "central", missionId: "blind-dispatch", x: 1e3, y: 470, w: 300, h: 230, label: { x: 1150, y: 455 }, entry: { x: 1150, y: 720 }, gate: { x: 1016, y: 560 }, block: { x: 1150, y: 700 }, smoke: { x: 1150, y: 560 } },
  { id: "market", missionId: "two-kinds-of-trouble", x: 1340, y: 240, w: 240, h: 200, label: { x: 1460, y: 225 }, entry: { x: 1340, y: 460 }, gate: { x: 1344, y: 424 }, block: { x: 1340, y: 468 }, smoke: { x: 1470, y: 340 } },
  { id: "old-town", missionId: "silent-failure", x: 1300, y: 770, w: 260, h: 220, label: { x: 1430, y: 755 }, entry: { x: 1430, y: 720 }, gate: { x: 1312, y: 822 }, block: { x: 1430, y: 764 }, smoke: { x: 1490, y: 850 } }
];
function br(n) {
  const s = It.find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown district ${n}`);
  return s;
}
const mf = { x: Ns.door.x, y: Aa }, Fg = {
  "station-row": "M195 720 H510",
  bridge: "M195 720 H600",
  lab: "M195 720 H920 Q940 720 940 700 V460",
  central: "M195 720 H1150",
  market: "M195 720 H1320 Q1340 720 1340 700 V460",
  "old-town": "M195 720 H1430"
}, zg = ["M150 720 H1560", "M195 700 V720", "M940 720 V440", "M1340 720 V440"];
function Xg({ states: n, showSelection: s = !0 }) {
  const l = Object.values(n).some((a) => a === "solved");
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: _r, height: qt, fill: m.sky }),
    /* @__PURE__ */ i.jsx("path", { d: `M0 ${String(qt)} Q200 110 420 ${String(qt - 20)} T840 ${String(qt - 10)} T1260 ${String(qt - 30)} T1600 ${String(qt - 6)} V${String(qt + 40)} H0 Z`, fill: m.grassDark }),
    /* @__PURE__ */ i.jsx(Da, { x: 0, y: qt + 30, width: _r, height: Or - qt - 30 }),
    /* @__PURE__ */ i.jsx(da, { x: 260, y: 80, size: 0.9 }),
    /* @__PURE__ */ i.jsx(da, { x: 1180, y: 70, size: 1.1 }),
    /* @__PURE__ */ i.jsx(da, { x: 1480, y: 110, size: 0.7 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: 300, cy: 880, rx: 200, ry: 70 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: 1140, cy: 900, rx: 160, ry: 50 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: 620, cy: 400, rx: 150, ry: 60 }),
    /* @__PURE__ */ i.jsx(hh, { d: `M${String(gh)} ${String(qt + 10)} V${String(Or)}`, width: Ag }),
    zg.map((a) => /* @__PURE__ */ i.jsx(_g, { d: a, width: mh }, a)),
    /* @__PURE__ */ i.jsx(gt, { x: 240, y: 880 }),
    /* @__PURE__ */ i.jsx(gt, { x: 300, y: 920, size: 0.8 }),
    /* @__PURE__ */ i.jsx(gt, { x: 380, y: 870, size: 1.1 }),
    /* @__PURE__ */ i.jsx(gt, { x: 460, y: 930, size: 0.9 }),
    /* @__PURE__ */ i.jsx(gt, { x: 560, y: 880 }),
    /* @__PURE__ */ i.jsx(gt, { x: 630, y: 340, size: 0.8 }),
    /* @__PURE__ */ i.jsx(gt, { x: 700, y: 420 }),
    [320, 560, 860, 1240, 1520].map((a) => /* @__PURE__ */ i.jsx(Pg, { x: a, y: Aa + 50, lit: l }, a)),
    /* @__PURE__ */ i.jsx(Rg, { x: Ns.x + Ns.w / 2, y: Ns.y + Ns.h, open: !0 }),
    It.map((a) => /* @__PURE__ */ i.jsx(Zg, { box: a, state: n[a.id], showSelection: s }, a.id))
  ] });
}
function Zg({ box: n, state: s, showSelection: l }) {
  const a = s === "solved";
  return /* @__PURE__ */ i.jsxs("g", { "data-district": n.id, "data-state": s, children: [
    s === "selected" && l ? /* @__PURE__ */ i.jsx("rect", { x: n.x - 8, y: n.y - 8, width: n.w + 16, height: n.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.25, stroke: m.highlight, strokeWidth: J * 2, strokeDasharray: "14 8" }) : null,
    /* @__PURE__ */ i.jsx(Wg, { id: n.id, box: n, solved: a }),
    s === "available" || s === "selected" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(ph, { x: n.smoke.x, y: n.smoke.y, scale: 0.9 }),
      /* @__PURE__ */ i.jsx($g, { x: n.gate.x, y: n.gate.y })
    ] }) : null,
    s === "locked" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Dg, { x: n.x, y: n.y, width: n.w, height: n.h }),
      /* @__PURE__ */ i.jsx(Mg, { x: n.block.x, y: n.block.y })
    ] }) : null
  ] });
}
function Wg({ id: n, box: s, solved: l }) {
  const a = l ? { kind: "restored" } : { kind: "normal" }, d = s.y + s.h - 20;
  switch (n) {
    case "station-row":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(He, { x: s.x + 65, y: d, tint: 0, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 145, y: d, tint: 1, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 225, y: d, tint: 2, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(gt, { x: s.x + 24, y: d + 6, size: 0.7 }) : null
      ] });
    case "bridge":
      return /* @__PURE__ */ i.jsx(fh, { x: gh, y: Aa + mh / 2 + 2, width: 170 });
    case "lab":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(uh, { x: s.x + 120, y: d, active: l }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 220, y: d, variant: "small", tint: 5, state: a, scale: 0.8 })
      ] });
    case "central":
      return /* @__PURE__ */ i.jsx("g", { children: [0, 1, 2].map(
        (f) => [0, 1, 2].map((p) => /* @__PURE__ */ i.jsx(He, { x: s.x + 70 + p * 82, y: s.y + 92 + f * 70, tint: (f * 3 + p) % 6, state: a, scale: 0.62 }, `${String(f)}-${String(p)}`))
      ) });
    case "market":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(He, { x: s.x + 80, y: d, variant: "shop", tint: 2, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 182, y: d, variant: "shop", tint: 4, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(gt, { x: s.x + 24, y: d - 60, size: 0.7 }) : null
      ] });
    case "old-town":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(ll, { x: s.x + 60, y: d + 4, lit: l }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 152, y: d, variant: "tall", tint: 3, state: a }),
        /* @__PURE__ */ i.jsx(He, { x: s.x + 232, y: d, variant: "tall", tint: 5, state: a })
      ] });
  }
}
const Cr = 100;
function yh(n, s, l) {
  return { x: n.x + l * Cr, y: n.y + s * Cr };
}
const Bg = 32, gf = 30;
function xh(n, s, l, a) {
  const d = yh(n, l, a);
  return { q: s, row: l, col: a, x: d.x, y: d.y + Bg };
}
function ka(n, s, l, a, d) {
  const f = yh(n, a, d);
  return { id: s, type: l, row: a, col: d, x: f.x, y: f.y + gf, lamp: { x: f.x, y: f.y + gf - 44 } };
}
const fa = { x: 100, y: 110 }, qg = [
  { id: "Z0", type: "Z", row: 0.5, col: 0.5 },
  { id: "Z1", type: "Z", row: 1.5, col: 1.5 },
  { id: "Z2", type: "Z", row: -0.5, col: 1.5 },
  { id: "Z3", type: "Z", row: 2.5, col: 0.5 },
  { id: "X0", type: "X", row: 0.5, col: 1.5 },
  { id: "X1", type: "X", row: 1.5, col: 0.5 },
  { id: "X2", type: "X", row: 0.5, col: -0.5 },
  { id: "X3", type: "X", row: 1.5, col: 2.5 }
], wh = {
  kind: "rsc3",
  width: 400,
  height: 420,
  origin: fa,
  houses: [0, 1, 2].flatMap((n) => [0, 1, 2].map((s) => xh(fa, n * 3 + s, n, s))),
  detectors: qg.map((n) => ka(fa, n.id, n.type, n.row, n.col))
}, Hi = { x: 100, y: 110 }, kh = {
  kind: "rep3",
  width: 400,
  height: 200,
  origin: Hi,
  houses: [0, 1, 2].map((n) => xh(Hi, n, 0, n)),
  detectors: [ka(Hi, "Z0", "Z", 0, 0.5), ka(Hi, "Z1", "Z", 0, 1.5)]
};
function Hg({ layout: n }) {
  const s = n.origin, l = n.kind === "rsc3" ? 3 : 1, a = 3, d = [];
  for (let f = 0; f < l; f++) d.push(`M${Pe(s.x - 60)} ${Pe(s.y + f * Cr + 40)} H${Pe(s.x + (a - 1) * Cr + 60)}`);
  if (l > 1) for (let f = 0; f < a; f++) d.push(`M${Pe(s.x + f * Cr + 50)} ${Pe(s.y - 60)} V${Pe(s.y + (l - 1) * Cr + 60)}`);
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Da, { width: n.width, height: n.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: n.width * 0.12, cy: n.height * 0.9, rx: n.width * 0.14, ry: n.height * 0.06 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: n.width * 0.9, cy: n.height * 0.1, rx: n.width * 0.12, ry: n.height * 0.05 }),
    d.map((f) => /* @__PURE__ */ i.jsx(Og, { d: f, width: 10 }, f)),
    /* @__PURE__ */ i.jsx(gt, { x: n.width - 28, y: n.height - 16, size: 0.7 }),
    n.kind === "rsc3" ? /* @__PURE__ */ i.jsx(gt, { x: 30, y: 56, size: 0.6 }) : null
  ] });
}
function Ug({ from: n, to: s }) {
  return /* @__PURE__ */ i.jsx("g", { children: s.map((l, a) => /* @__PURE__ */ i.jsx("line", { x1: n.x, y1: n.y, x2: l.x, y2: l.y - 40, stroke: m.highlight, strokeWidth: J * 1.6, strokeLinecap: "round", strokeDasharray: "10 7" }, a)) });
}
function Yg({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n + 6, cy: s + 2, rx: 40, ry: 14, fill: m.highlight, fillOpacity: 0.35 });
}
function Vg({ geometry: n }) {
  const s = n;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Da, { width: s.width, height: s.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(hh, { d: `M30 ${Pe(s.height - 30)} Q${Pe(s.width / 2)} ${Pe(s.height - 70)} ${Pe(s.width - 30)} ${Pe(s.height - 30)}`, width: 34 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: 40, cy: 40, rx: 50, ry: 20 }),
    /* @__PURE__ */ i.jsx(Qn, { cx: s.width - 40, cy: 40, rx: 50, ry: 20 }),
    Array.from({ length: s.lanes }, (l, a) => /* @__PURE__ */ i.jsx(Qg, { y: s.laneY(a), x1: s.inX - 40, x2: s.outX + 40 }, a))
  ] });
}
function Qg({ y: n, x1: s, x2: l }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: s, y: n - 12, width: l - s, height: 24, rx: 4, fill: m.wallStone, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("line", { x1: s + 6, y1: n - 16, x2: l - 6, y2: n - 16, stroke: m.roofSlate, strokeWidth: 3 }),
    Array.from({ length: Math.floor((l - s) / 30) }, (a, d) => s + 15 + d * 30).map((a) => /* @__PURE__ */ i.jsx("line", { x1: a, y1: n - 12, x2: a, y2: n + 12, stroke: m.ink, strokeWidth: 1, opacity: 0.4 }, a))
  ] });
}
function Kg({ geometry: n }) {
  const s = n;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { width: s.width, height: s.height, rx: 18, fill: m.wallPowder }),
    /* @__PURE__ */ i.jsxs("g", { stroke: m.paper, strokeWidth: 1.5, children: [
      Array.from({ length: Math.ceil(s.width / 50) }, (l, a) => /* @__PURE__ */ i.jsx("line", { x1: a * 50, y1: 0, x2: a * 50, y2: s.height }, `v${String(a)}`)),
      Array.from({ length: Math.ceil(s.height / 50) }, (l, a) => /* @__PURE__ */ i.jsx("line", { x1: 0, y1: a * 50, x2: s.width, y2: a * 50 }, `h${String(a)}`))
    ] }),
    Array.from({ length: s.lanes }, (l, a) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("rect", { x: s.inX - 40, y: s.laneY(a) - 11, width: s.outX - s.inX + 80, height: 22, rx: 11, fill: m.inkSoft, stroke: m.ink, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("line", { x1: s.inX - 24, y1: s.laneY(a), x2: s.outX + 24, y2: s.laneY(a), stroke: m.paper, strokeWidth: 2, strokeDasharray: "6 10" })
    ] }, a))
  ] });
}
function Gg({ x: n, controlY: s, targetY: l, active: a = !1 }) {
  const d = a ? m.highlight : m.ink;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: s, x2: n, y2: l, stroke: d, strokeWidth: J * 2 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: 10, fill: d }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: l, r: 16, fill: m.paper, stroke: d, strokeWidth: J * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 10, y1: l, x2: n + 10, y2: l, stroke: d, strokeWidth: J * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: l - 10, x2: n, y2: l + 10, stroke: d, strokeWidth: J * 1.4 })
  ] });
}
function Jg({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 18, fill: n ? m.alarmRing : m.wallButter, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 0 L0 -13", stroke: m.ink, strokeWidth: 3, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 3, fill: m.ink }),
    /* @__PURE__ */ i.jsx("text", { x: 0, y: 13, textAnchor: "middle", fontSize: 11, fontWeight: 800, fill: m.ink, fontFamily: _s, style: { userSelect: "none" }, children: "S" })
  ] });
}
function yf({ letter: n, ...s }) {
  return /* @__PURE__ */ i.jsxs(Ie, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 18, ry: 5, fill: m.shadow }),
    /* @__PURE__ */ i.jsx(Rr, { letter: n, x: 0, y: 0, scale: 0.5 })
  ] });
}
function e1({ filled: n, size: s = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: n ? "star is-filled" : "star", children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z", fill: n ? "var(--alarm)" : "var(--panel)", stroke: "var(--outline)", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function Fa({ size: n = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: n, height: n, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function vh({ size: n = 72, label: s }) {
  return /* @__PURE__ */ i.jsxs("svg", { width: n, height: n, viewBox: "0 0 512 512", role: "img", "aria-label": s ?? "Q11 mark: a Q-shaped protective ring with a small flame inside", focusable: "false", children: [
    /* @__PURE__ */ i.jsxs("g", { fill: "none", stroke: "#8fc1ff", strokeWidth: "56", strokeLinecap: "round", children: [
      /* @__PURE__ */ i.jsx("circle", { cx: "248", cy: "240", r: "170" }),
      /* @__PURE__ */ i.jsx("line", { x1: "334", y1: "326", x2: "424", y2: "416" })
    ] }),
    /* @__PURE__ */ i.jsx("path", { fill: "#ff5a3c", transform: "translate(158 125.2) scale(0.8)", d: "M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" })
  ] });
}
const jh = {
  /* ------------------------------------------------------------------ app / document titles */
  "app.name": "Q11",
  "app.tagline": "Quantum Emergency Response",
  "doc.title": "{app} — Quantum Emergency Response",
  "doc.how": "{app} — How it works",
  "doc.settings": "{app} — Settings",
  "doc.city": "{app} — City map",
  "doc.missions": "{app} — Missions",
  "doc.summary": "{app} — Shift complete",
  "doc.mission": "{app} — Mission {n} · {title}",
  /* ------------------------------------------------------------------ title screen */
  "title.heading": "Quantum Emergency Response",
  "title.lead": "Fires you cannot see. Alarms you can. Read them, send the crews, keep the quantum city safe.",
  "title.play": "Play",
  "title.continue": "Continue",
  "title.firstCall": "Take the first call",
  "title.how": "How it works",
  "title.settings": "Settings",
  "title.progress": "Progress: {stars} of {max} stars.",
  "title.foot": "Qollab × IonQ Global Quantum Hackathon 2026 entry. This effort is supported by Qollab & IonQ.",
  "title.kidLine": "Fires you cannot see. Alarms you can. Send the right crew!",
  "title.language": "Language: {lang}",
  /* ------------------------------------------------------------------ how it works */
  "how.title": "How it works",
  "how.intro": "Q11 is a fire-dispatch story about quantum error correction. Nothing here is about real fires or real firefighting: every fire, alarm and crew is a piece of quantum algebra wearing a costume.",
  "how.houses.term": "Houses",
  "how.houses.desc": "Qubits. The number on a house is its qubit index.",
  "how.fires.term": "Fires",
  "how.fires.desc": "Pauli errors lit by an arsonist called Noise. Red = X, blue = Z, split red-and-blue = Y (X and Z at once).",
  "how.alarms.term": "Alarm stations",
  "how.alarms.desc": "Stabilizer checks standing between houses. A diamond Z station rings when an odd number of its houses carry a red (X or Y) fire; a square X station rings for an odd number of blue (Z or Y) fires. A station never rings just because a fire is nearby, and it never says which house is burning.",
  "how.crews.term": "Crews",
  "how.crews.desc": "Corrections. A red crew on a red fire puts it out (X·X = I). A red crew on a safe house lights a red fire. Fires and crews combine by XOR, never by “more is better”.",
  "how.gates.term": "Gates",
  "how.gates.desc": "Fires move only through gates. CNOT copies red forward (control → target) and blue backward (target → control). H swaps red and blue on its own wire.",
  "how.verdict.term": "Verdict",
  "how.verdict.desc": "After you spray, the residual R = crews ⊕ fires is judged by the code’s algebra: Logical qubit safe if R is a stabilizer; Silent failure if every alarm is quiet but R acts as a logical operator; Fires still burning if any station still rings. Quiet alarms alone are never proof of safety.",
  "how.controls": "Controls",
  "how.controls.tap": "Tap a house to send the selected crew; tap again to call it back. Nothing happens until you press Spray.",
  "how.controls.keyboard": "Keyboard (while focus is inside the dispatch screen): 1 / 2 / 3 select X / Z / Y crews, arrows move between houses and between crew colours, Enter or Space toggles a crew, Backspace recalls the focused house’s crew (or every crew when no house is focused), C sprays.",
  "how.controls.stars": "Stars: 3 for the smallest dispatch that succeeds, 2 for a success with extra crews, 1 for the right call on a mission that could not be won (or a near miss with at least one crew sent). Standing down while fires burn scores 0. Mission 6 awards at most 1 star, so the shift totals 16.",
  "how.controls.sound": "Sound is off until you turn it on; motion follows your system setting and the toggle in Settings.",
  "how.model": "Model: Clifford + Pauli educational simulation with a perfect-syndrome assumption. The repetition code is an X-noise-only introduction; the main district is a distance-3 rotated surface code.",
  "how.quantumRules": "Same crew puts a fire out. A different crew changes it. A crew on an empty house starts one. Quantum rules!",
  "how.back": "Back",
  "how.kid.intro": "Some houses in this city are on fire, but you cannot see the flames. Alarm stations tell you something is burning. You send crews to put the fires out. It is really a game about how quantum computers fix their mistakes.",
  "how.kid.legend": "What the pictures mean",
  "how.kid.houses": "A house is a qubit: one tiny piece of quantum memory.",
  "how.kid.fires": "A fire is a mistake. Red is X, blue is Z, and both at once is Y. During a call you cannot see them.",
  "how.kid.alarms": "Alarm stations watch a few houses each. A diamond rings for red fires, a square for blue fires. They ring only for an odd number of fires, and they never say which house.",
  "how.kid.crews": "A crew is a fix. Same letter as the fire: fire out. Different letter: the fire changes. Crew on an empty house: a new fire starts.",
  "how.kid.gates": "Gates move fires along the wires. Fires never move on their own.",
  "how.kid.water": "Water is pale and round. A blue Z fire is a flame with a Z. They are never the same thing.",
  "how.kid.spray": "After Spray! the true fires are shown so you can check your plan. A real quantum computer never gets to peek.",
  /* ------------------------------------------------------------------ city map */
  "city.title": "Quantum City",
  "city.subtitle": "Tap a district with smoke to see its call.",
  "city.map": "City map",
  "city.hud.stars": "{stars} / {max} stars",
  "city.hud.solved": "{solved} of {total} districts safe",
  "city.hud.freeRoam": "Free roam",
  "city.hud.freeRoamOn": "Free roam on: every district is open.",
  "city.hud.storage.local": "Progress is saved in this browser.",
  "city.hud.storage.memory": "Progress is kept only while this page is open.",
  "city.hud.storage.qollab": "On Qollab, progress lasts for one Run.",
  "city.status.locked": "Locked",
  "city.status.available": "Fire reported",
  "city.status.selected": "Selected",
  "city.status.solved": "Safe",
  "city.status.replay": "Play again",
  "city.locked.hint": "Finish {district} first to open this road.",
  "city.select.goal": "The call",
  "city.select.lesson": "You will learn",
  "city.dispatch": "Dispatch!",
  "city.redispatch": "Dispatch again",
  "city.truck.travel": "The fire truck is on its way to {district}…",
  "city.truck.arrived": "The truck has arrived at {district}.",
  "city.truck.skip": "Skip the drive",
  "city.restored": "{district} is safe again. The smoke clears and the lights come back.",
  "city.badge": "{district} badge earned",
  "city.allSafe": "Every district is safe. The city is restored!",
  "city.station": "Fire station",
  "city.aria.map": "City map. Each district is a button.",
  "city.aria.district": "{name}, {status}",
  "city.aria.districtStars": "{name}, {status}, {stars} of {max} stars",
  "city.aria.mission": "Mission {n}: {name}, {status}, {stars}",
  "city.aria.truck": "Fire truck",
  "city.badges": "Badges",
  "city.badgeToast": "{badge} earned!",
  "city.badgeOf": "Badge: {badge}",
  "city.badgeName.firstAlarm": "Alarm Reader",
  "city.badgeName.redForwardBlueBackward": "Gate Tracker",
  "city.badgeName.colorSwitch": "Colour Switcher",
  "city.badgeName.blindDispatch": "Blind Dispatcher",
  "city.badgeName.twoKindsOfTrouble": "Two-Colour Chief",
  "city.badgeName.silentFailure": "Investigator",
  "city.select.best": "Best so far",
  "city.select.none": "Nothing selected yet.",
  /* ------------------------------------------------------------------ briefing */
  "briefing.subtitle": "Briefing",
  "briefing.goal": "Your call",
  "briefing.lesson": "What you will learn",
  "briefing.district": "District",
  "briefing.crews": "Crews",
  "briefing.budget": "Crews available",
  "briefing.budget.one": "1 crew",
  "briefing.budget.other": "{n} crews",
  "briefing.previousBest": "Previous best",
  "briefing.upTo": "(up to {n})",
  "briefing.startTraining": "Start training",
  "briefing.start": "Start",
  "briefing.skipToDispatch": "Skip to dispatch",
  "briefing.go": "Go!",
  /* ------------------------------------------------------------------ training */
  "training.subtitle": "Training · lesson {n} of {total} · fires visible",
  "training.board": "Training board, fires visible",
  "training.boardLabel": "Training board",
  "training.start": "Start:",
  "training.afterGate": "After gate {n} of {total}:",
  "training.lesson": "Lesson",
  "training.lessons": "Lessons",
  "training.lessonLabel": "Lesson {n}: {fires}",
  "training.prev": "Prev",
  "training.nextStep": "Next step",
  "training.nextLesson": "Next lesson",
  "training.startDispatch": "Start dispatch",
  "training.skip": "Skip to dispatch",
  "training.firesVisible": "Fires visible",
  "training.predict": "Guess first: where will the fire be after this gate?",
  "training.check": "Check",
  "training.predictTap": "Which house burns next? Tap it!",
  "training.predict.hit": "Yes! House {q} burns after this gate.",
  "training.predict.miss": "Not this time: house {q} stays safe. Watch where the fire goes.",
  "training.predict.waiting": "Tap a house to see the next step.",
  /* ------------------------------------------------------------------ challenge (planning) */
  "challenge.subtitle.dispatch": "Dispatch · fires hidden, alarms live",
  "challenge.subtitle.predict": "Dispatch · predict where the fires end up",
  "challenge.board": "Dispatch board",
  "challenge.startingFire": "Starting fire: {fires}. The fires travel through the circuit; send crews to where they end up.",
  "challenge.startToken": "{letter} on q{q}",
  "challenge.tapHint": "Tap a house to send the selected crew; tap again to call it back.",
  "challenge.fog": "The fire is hidden. Only the alarms can be read.",
  "challenge.panel": "Dispatch",
  "challenge.crews": "Crews: {used} / {budget}",
  "challenge.budgetReached": "all crews out",
  "challenge.placed": "Placed crews",
  "challenge.placement": "{letter} crew → house {q}",
  "challenge.noCrews": "No crews placed yet.",
  "challenge.clear": "Clear",
  "challenge.confirm": "Confirm dispatch",
  "challenge.spray": "Spray!",
  "challenge.standDown.title": "Stand down with no crews?",
  "challenge.standDown.body": "You are about to confirm without sending any crew. Whatever is burning stays burning.",
  "challenge.standDown.confirm": "Stand down",
  "challenge.standDown.cancel": "Keep dispatching",
  "challenge.detector.hint": "Tap a station to see the houses it watches.",
  "challenge.detector.watches": "{station} watches houses {list}.",
  /* ------------------------------------------------------------------ planning stage */
  "plan.title": "Plan",
  "plan.hint": "This is your plan. Nothing happens until you press Spray.",
  "plan.undo": "Undo",
  "plan.redo": "Redo",
  "plan.clear": "Clear",
  "plan.preview": "Preview",
  "plan.previewOn": "Preview on",
  "plan.previewOff": "Preview off",
  "plan.previewHint": "Preview: where each crew will spray.",
  "plan.empty": "No crews planned yet.",
  /* ------------------------------------------------------------------ first-run tutorial (three taps) */
  "tutorial.title": "First call",
  "tutorial.intro": "Three taps and the house is safe. Ready?",
  "tutorial.step1": "Pick a crew",
  "tutorial.step1.body": "Red crews (X) put out red fires. Tap the red crew.",
  "tutorial.step2": "Tap a house",
  "tutorial.step2.body": "Both alarms are ringing. Tap the house they both watch.",
  "tutorial.step3": "Spray!",
  "tutorial.step3.body": "Press Spray and watch the water fly.",
  "tutorial.done": "You did it! The house is safe and the city lights come back.",
  "tutorial.hint": "Hint",
  "tutorial.showHint": "Show a hint",
  "tutorial.skip": "Skip the tutorial",
  "tutorial.replay": "Replay the tutorial",
  "tutorial.beginnerLabel": "Beginner hint",
  /* ------------------------------------------------------------------ dispatch (spray showpiece) */
  "dispatch.subtitle": "Dispatch · crews spraying",
  "dispatch.answerCheck": "Training replay: answer check",
  "dispatch.answerCheck.note": "Now the true fires are shown so you can check your plan. A real machine can never see them directly.",
  "dispatch.skip": "Skip",
  "dispatch.watchAgain": "Watch again",
  "dispatch.why": "Why?",
  "dispatch.continue": "Continue",
  "dispatch.step": "Step {n} of {total}",
  "dispatch.aria.player": "Spray replay",
  "spray.trucksArrive": "The trucks arrive at {district}.",
  "spray.crewsRunning": "Crews running to their houses…",
  "spray.crewRun": "{crew} crew runs to house {q}.",
  "spray.waterOn": "Water on!",
  "spray.sprayStart": "{crew} crew sprays house {q}.",
  "spray.splash": "Splash!",
  "spray.extinguished": "House {q}: fire out.",
  "spray.changed": "House {q}: the {before} fire turned into a {after} fire.",
  "spray.ignited": "House {q}: a {after} fire started. That house was not burning.",
  "spray.revealRemaining": "Here is what is still burning.",
  "spray.alarms": "The alarms read again.",
  "spray.done": "All crews reported in.",
  "spray.quantumRules": "Same crew puts a fire out. A different crew changes it. A crew on an empty house starts one. Quantum rules!",
  "spray.oneShot": "Each spray is one correction. Spraying longer or twice does nothing extra.",
  /* ------------------------------------------------------------------ results (four types + beacon) */
  "result.subtitle": "Result",
  "result.heading.flawless": "Flawless dispatch",
  "result.heading.firesOut": "Fires out",
  "result.heading.unlucky": "Right call, cruel luck",
  "result.heading.lucky": "Lucky guess",
  "result.heading.close": "Close",
  "result.heading.stoodDown": "Stood down",
  "result.heading.off": "Off target",
  "result.starsOf.one": "{stars} of 1 star",
  "result.starsOf.other": "{stars} of {max} stars",
  "result.maxOne": "This mission awards at most one star: the alarms alone cannot win it.",
  "result.decision": "Decision",
  "result.outcome": "Outcome",
  "result.cost": "Cost",
  "result.costText.one": "1 crew used · minimum {min}",
  "result.costText.other": "{used} crews used · minimum {min}",
  "result.attempts": "Attempts",
  "result.next": "Next district",
  "result.summary": "Summary",
  "result.tryAgain": "Try again",
  "result.city": "Back to the city",
  "result.investigationComplete": "Investigation complete",
  "result.quality.optimal": "Optimal call",
  "result.quality.valid": "Valid, but costly",
  "result.quality.unlucky": "Optimal call, unlucky outcome",
  "result.quality.lucky": "Lucky guess — the alarms did not justify it",
  "result.quality.off": "Off target",
  "result.outcome.success": "Logical qubit safe",
  "result.outcome.logicalError": "Silent failure — logical qubit flipped",
  "result.outcome.detectable": "Fires still burning",
  "result.outcome.propagationMiss": "Prediction missed — fires left on the wires",
  "result.type.restored.title": "Fires out, houses restored",
  "result.type.restored.body": "Nothing is left. The stored quantum information is safe.",
  "result.type.safePattern.title": "Safe pattern",
  "result.type.safePattern.body": "Something is left, but it forms a harmless pattern the code ignores (a stabilizer). The stored information is safe.",
  "result.type.safePattern.details": "Raw residual: {residual}",
  "result.type.stillBurning.title": "Still burning",
  "result.type.stillBurning.body": "A fire remains and its alarms ring. Look at which stations ring, then try again.",
  "result.type.logicalFailure.title": "Silent failure",
  "result.type.logicalFailure.body": "Every alarm is quiet, but the memory beacon shows a flip. The leftover pattern acts on the stored information.",
  "result.beacon.title": "Memory beacon",
  "result.beacon.ok": "Memory beacon steady: the stored information is intact.",
  "result.beacon.logicalX": "Memory beacon: logical X flip",
  "result.beacon.logicalZ": "Memory beacon: logical Z flip",
  "result.beacon.logicalXZ": "Memory beacon: logical X and Z flip",
  "result.beacon.pattern": "Caused by this pattern: {pattern}",
  "result.beacon.note": "The beacon appears only at result time. During play, only the alarms can be read.",
  "result.badge": "Chapter badge: {district}",
  /* ------------------------------------------------------------------ why panel */
  "why.title": "Why?",
  "why.yours": "Your spray",
  "why.alternative": "The other way",
  "why.decoder": "The smallest crew that silences every alarm",
  "why.trueFires": "Crews on the true fires",
  "why.equivalent": "Your spray and the alternative differ only by a harmless pattern: the code treats them as the same correction.",
  "why.sameAlarms": "Both fire patterns ring exactly the same alarms.",
  "why.cannotDecide": "Alarms alone cannot decide.",
  "why.compare": "Compare",
  "why.replayBoth": "Replay both",
  "why.noBlame": "Nobody could have known from the alarms. That is the lesson, not a mistake.",
  "why.verdict": "→ {verdict}",
  /* ------------------------------------------------------------------ debrief (report / replay) */
  "debrief.subtitle": "Debrief · everything revealed",
  "debrief.report": "Report",
  "debrief.trueFires": "True fires",
  "debrief.startedAs": "Started as",
  "debrief.yourCrews": "Your crews",
  "debrief.residual": "Residual",
  "debrief.residualHouses": "· houses {list}",
  "debrief.nothingLeft": "· nothing left",
  "debrief.logical": "Logical",
  "debrief.logical.preserved": "preserved",
  "debrief.logical.undecided": "undecided — alarms still ringing",
  "debrief.logical.missed": "missed — fires left on {houses}",
  "debrief.logical.flipped": "flipped ({ops})",
  "debrief.decision": "Decision",
  "debrief.replayBoard": "Replay board",
  "debrief.step": "Step {n} of {total} · {title}.",
  "debrief.stepTitle.placed": "Fires placed",
  "debrief.stepTitle.gate": "Gate",
  "debrief.stepTitle.alarms": "Alarms",
  "debrief.stepTitle.dispatch": "Your dispatch",
  "debrief.stepTitle.residual": "Residual",
  "debrief.stepTitle.verdict": "Verdict",
  "debrief.prev": "Prev",
  "debrief.next": "Next",
  "debrief.autoPlay": "Auto-play",
  "debrief.whatIf": "What if",
  "debrief.whatIf.decoder": "Minimum-weight dispatch for these alarms: {crews} → {verdict}.",
  "debrief.whatIf.trueFires": "Crews matching the true fires: {crews} → Logical qubit safe.",
  "debrief.tryAgain": "Try again",
  "debrief.result": "Result",
  "debrief.nextMission": "Next district",
  "debrief.house.one": "house",
  "debrief.house.other": "houses",
  "debrief.stepByStep": "Step by step",
  /* ------------------------------------------------------------------ details fold (jargon lives here) */
  "details.show": "Details",
  "details.hide": "Hide details",
  "details.title": "Details — for curious kids and grown-ups",
  "details.residualFormula": "Residual R = C ⊕ E (crews XOR fires, phases dropped).",
  "details.stabilizer": "Success: R is a stabilizer of the code, so it acts trivially on the encoded qubit.",
  "details.logical": "Logical error: R commutes with every check but is not a stabilizer, so it acts as a logical operator.",
  "details.detectable": "Detectable: R anticommutes with at least one check, so that station still rings.",
  "details.notSyndromeZero": "Quiet alarms are necessary but never sufficient: success is decided by stabilizer membership, not by “syndrome = 0”.",
  "details.rawResidual": "Raw residual",
  "details.syndrome": "Alarm bits",
  "details.code": "Code",
  "details.englishOriginal": "Original report (English)",
  "details.replayEnglish": "Replay captions and the what-if explanation are generated in English.",
  /* ------------------------------------------------------------------ cloud verification (labels kept) */
  "cloud.title": "Quantum verification",
  "cloud.intro": "The verdict above is exact Pauli-frame algebra computed locally. Circuit-level runs (Qiskit) are labelled by where they ran and are never invented. Only runs of this dispatch ({correction}, or crews equivalent to it) are shown.",
  "cloud.empty": "No cloud result recorded for this dispatch{others}.",
  "cloud.emptyOthers": " (recorded dispatches: {list})",
  "cloud.running": "Running on {backend} (100 shots)…",
  "cloud.selectedBackend": "the selected backend",
  "cloud.failed": "Verification failed: {message}",
  "cloud.noJobs": "No job left in this run",
  "cloud.verifyOn": "Verify on {backend} (100 shots)",
  "cloud.recordedCrews": "Recorded crews:",
  "cloud.jobId": "Job id:",
  "cloud.noneLocal": "none (local run)",
  "cloud.shots": "{n} shots",
  "cloud.source.local": "Local (Aer)",
  "cloud.source.cached": "Cached cloud result",
  "cloud.source.live": "Live cloud result",
  "cloud.analysis.dominant": "Dominant alarm pattern",
  "cloud.analysis.predicted": "{dom} (predicted {pred})",
  "cloud.analysis.syndromeShare": "Shots with the predicted alarms",
  "cloud.analysis.logicalShare": "Shots with the predicted logical bit",
  "cloud.analysis.dominantMatches": "Dominant outcome agrees with the verdict",
  "cloud.analysis.exact": "Exact match with the noiseless model",
  "cloud.analysis.yes": "yes",
  "cloud.analysis.no": "no",
  "cloud.analysis.noNoise": "no (expected under a noise model)",
  "cloud.analysis.verdict": "Pauli-frame verdict",
  "cloud.analysis.prep": "Prepared / readout",
  "cloud.analysis.prepValue": "logical |{prep}⟩ / {basis} basis",
  /* ------------------------------------------------------------------ settings */
  "settings.title": "Settings",
  "settings.close": "Close settings",
  "settings.sound": "Sound",
  "settings.sound.desc": "Short, friendly tones for dispatch, spray and fire-out. Off until you turn it on.",
  "settings.motion": "Reduce motion",
  "settings.motion.desc": "Shows the spray as still frames you step through. Your system “reduce motion” preference is always respected too.",
  "settings.language": "Language",
  "settings.language.desc": "English or Japanese. You can switch any time.",
  "settings.language.en": "English",
  "settings.language.ja": "日本語",
  "settings.language.switchTo": "Switch to {lang}",
  "settings.freeRoam": "Free roam",
  "settings.freeRoam.desc": "Open every district at once (for review). Normal play opens them in order.",
  "settings.progress": "Progress",
  "settings.storage.local": "Progress is saved in this browser (localStorage, key {key}).",
  "settings.storage.memory": "Progress is kept in memory for this session only (no web storage available here).",
  "settings.storage.qollab": "On Qollab, progress lasts for one Run: the sandbox has no storage.",
  "settings.reset": "Reset progress",
  "settings.resetDialog.title": "Reset all progress?",
  "settings.resetDialog.body": "Stars and attempts for every district will be cleared. Settings are kept.",
  "settings.resetDialog.confirm": "Reset",
  "settings.on": "On",
  "settings.off": "Off",
  "settings.back": "Back",
  /* ------------------------------------------------------------------ motion (reduced-motion stepper) */
  "motion.stepper.title": "Step through",
  "motion.stepper.hint": "Motion is reduced: step through the spray one frame at a time.",
  "motion.stepper.frame": "Frame {n} of {total}",
  "motion.stepper.next": "Next frame",
  "motion.stepper.prev": "Previous frame",
  "motion.stepper.last": "Final state",
  /* ------------------------------------------------------------------ notices */
  "notice.progressReset": "Progress reset.",
  "notice.saveReset": "Saved progress was unreadable and has been reset.",
  "notice.saveMigrated": "Your saved progress was carried over to the new city.",
  "notice.dismiss": "Dismiss",
  /* ------------------------------------------------------------------ summary */
  "summary.title": "Shift complete",
  "summary.lead": "Every district is on record. Single fires are always caught in a distance-3 district; the lesson of Silent Failure is why real machines build bigger ones.",
  "summary.mission": "District",
  "summary.stars": "Stars",
  "summary.attempts": "Attempts",
  "summary.badges": "Badges",
  "summary.city": "Back to the city",
  "summary.titleBtn": "Title",
  "summary.playAgain": "Play again",
  "summary.freeRoamHint": "Want to replay any district in any order? Turn on Free roam in Settings.",
  /* ------------------------------------------------------------------ mission list / cards (legacy + city) */
  "mission.label": "Mission {n}",
  "mission.titleWithIndex": "Mission {n} · {title}",
  "mission.missions": "Missions",
  "mission.code.rep3": "Repetition code · 3 houses",
  "mission.code.rsc3": "Surface code d=3 · 9 houses",
  "mission.code.trivial2": "Two bare wires",
  "mission.code.trivial3": "Three bare wires",
  "mission.kind.dispatch": "dispatch",
  "mission.kind.propagation": "propagation",
  "mission.status.new": "New",
  "mission.status.complete": "Complete",
  "mission.status.attempts.one": "1 attempt",
  "mission.status.attempts.other": "{n} attempts",
  "mission.starsOf": "{stars} of {max} stars",
  "mission.notPlayed.one": "not played yet, up to 1 star",
  "mission.notPlayed.other": "not played yet, up to {max} stars",
  /* ------------------------------------------------------------------ shared labels: crews, fires, alarms, palette */
  "crew.X": "red (X)",
  "crew.Z": "blue (Z)",
  "crew.Y": "red-and-blue (Y)",
  "crew.name.X": "Red crew (X)",
  "crew.name.Z": "Blue crew (Z)",
  "crew.name.Y": "Mixed crew (Y)",
  "fire.X": "red fire (X)",
  "fire.Z": "blue fire (Z)",
  "fire.Y": "red-and-blue fire (Y)",
  "fire.onHouse": "{letter} fire on house {q}",
  "fire.none": "no fires",
  "palette.title": "Crews",
  "palette.group": "Crew colour",
  "palette.crew": "{letter} crew",
  "palette.putsOut.X": "puts out red fires",
  "palette.putsOut.Z": "puts out blue fires",
  "palette.putsOut.Y": "puts out red-and-blue fires",
  "palette.key": ", key {key}",
  "alarms.title": "Alarms",
  "alarms.stations": "Alarm stations",
  "alarms.noneBareWires": "No alarm stations on bare wires. Predict where the fires end up.",
  "alarms.houses": "houses {list}",
  "alarms.ringing": "RINGING",
  "alarms.quiet": "quiet",
  "alarms.notRead": "—",
  "alarms.summary.none": "This district has no alarm stations.",
  "alarms.summary.notRead": "Alarms not read yet.",
  "alarms.summary.allQuiet": "All {n} stations quiet.",
  "alarms.summary.ringing": "{ringing} of {total} stations ringing: {list}.",
  "legend.title": "Legend",
  "legend.fire": "{crew} fire",
  "legend.crew": "{crew} crew",
  "legend.alarmZ": "Z station (diamond): rings for red fires",
  "legend.alarmX": "X station (square): rings for blue fires",
  "legend.water": "Water (not a blue fire!)",
  /* ------------------------------------------------------------------ ARIA-only / announcer text */
  "a11y.house": "House {q}",
  "a11y.watchedBy": "watched by {list}",
  "a11y.residualFire": "residual {crew} fire",
  "a11y.fireOut": "fire out",
  "a11y.fire": "{crew} fire",
  "a11y.crew": "{crew} crew",
  "a11y.noCrewsLeft": "no crews left",
  "a11y.pressToSend": "press to send {crew} crew",
  "a11y.pressToSendAny": "press to send a crew",
  "a11y.pressToRecall": "press to recall the crew",
  "a11y.pressToSwitch": "press to switch to {crew} crew",
  "a11y.pressToSwitchAny": "press to switch to another crew",
  "a11y.boardGrid": "{code} dispatch board",
  "a11y.boardCircuit": "Circuit board",
  "a11y.replayBoard": "Replay board",
  "a11y.replayControls": "Replay controls",
  "a11y.replaySteps": "Replay steps",
  "a11y.step": "Step {n}: {title}",
  "a11y.gameNav": "Game",
  "a11y.backToTitle": "Q11 — back to title",
  "a11y.dismissNotice": "Dismiss notice",
  "a11y.q11mark": "Q11 mark: a Q-shaped protective ring with a small flame inside",
  "a11y.wires.start": "start",
  "a11y.wires.end": "end",
  "a11y.stationRinging": "{station}, ringing, watches houses {list}",
  "a11y.stationQuiet": "{station}, quiet, watches houses {list}",
  "a11y.fogHouse": "House {q}, hidden",
  "a11y.pressToPredict": "press to predict this house burns next",
  "a11y.screen.title": "Q11 title screen.",
  "a11y.screen.how": "How it works.",
  "a11y.screen.settings": "Settings.",
  "a11y.screen.city": "City map.",
  "a11y.screen.summary": "Shift complete: summary of every district.",
  "a11y.screen.briefing": "Mission {n} briefing.",
  "a11y.screen.training": "Mission {n} training, lesson {lesson} of {total}. Fires visible.",
  "a11y.screen.challenge.predict": "Mission {n} dispatch. Predict where the fires end up; {crews} available.",
  "a11y.screen.challenge.alarms": "Mission {n} dispatch. {summary}",
  "a11y.screen.challenge.plain": "Dispatch.",
  "a11y.screen.dispatch": "Mission {n} training replay: answer check.",
  "a11y.screen.dispatch.verdict": "Mission {n} training replay: answer check. {verdict}.",
  "a11y.screen.debrief": "Mission {n} debrief.",
  "a11y.screen.debrief.verdict": "Mission {n} debrief. {verdict}.",
  "a11y.screen.result": "Mission {n} result.",
  "a11y.screen.result.stars": "Mission {n} result: {stars} of {max} stars.",
  "a11y.crews.one": "1 crew",
  "a11y.crews.other": "{n} crews",
  /* ------------------------------------------------------------------ common */
  "common.ok": "OK",
  "common.cancel": "Cancel",
  "common.back": "Back",
  "common.close": "Close",
  "common.skip": "Skip",
  "common.next": "Next",
  "common.prev": "Prev",
  "common.and": "and",
  "common.loading": "Loading…"
}, t1 = {
  /* ------------------------------------------------------------------ app / document titles */
  "app.name": "Q11",
  "app.tagline": "クアンタム・エマージェンシー・レスポンス",
  "doc.title": "{app} — クアンタム・エマージェンシー・レスポンス",
  "doc.how": "{app} — あそび方",
  "doc.settings": "{app} — 設定",
  "doc.city": "{app} — 街の地図",
  "doc.missions": "{app} — ミッション",
  "doc.summary": "{app} — 出動完了",
  "doc.mission": "{app} — ミッション {n} · {title}",
  /* ------------------------------------------------------------------ title screen */
  "title.heading": "クアンタム・エマージェンシー・レスポンス",
  "title.lead": "見えない火。聞こえる警報 (alarm)。警報を読んで、消防隊を送り、量子の街を守ろう。",
  "title.play": "あそぶ",
  "title.continue": "つづきから",
  "title.firstCall": "はじめての出動",
  "title.how": "あそび方",
  "title.settings": "設定",
  "title.progress": "進み具合：星 {stars} / {max}",
  "title.foot": "Qollab × IonQ Global Quantum Hackathon 2026 参加作品。This effort is supported by Qollab & IonQ.",
  "title.kidLine": "見えない火事。聞こえる警報。正しい隊を送ろう！",
  "title.language": "言語：{lang}",
  /* ------------------------------------------------------------------ how it works */
  "how.title": "あそび方",
  "how.intro": "Q11 は、量子エラー訂正 (quantum error correction) を消防隊のお話にしたゲームです。本物の火事や消防の話ではありません。火も警報も隊も、ぜんぶ量子の計算が着ぐるみを着たものです。",
  "how.houses.term": "家",
  "how.houses.desc": "量子ビット (qubit) です。家の番号は量子ビットの番号です。",
  "how.fires.term": "火",
  "how.fires.desc": "放火犯ノイズ (Noise) がつけるパウリ・エラー (Pauli error) です。赤 = X、青 = Z、赤と青の半分ずつ = Y（X と Z が同時）。",
  "how.alarms.term": "警報所",
  "how.alarms.desc": "家の間に立つスタビライザー・チェック (stabilizer check) です。ひし形の Z 警報所は、見ている家のうち赤い火 (X か Y) が奇数個のときに鳴ります。四角の X 警報所は、青い火 (Z か Y) が奇数個のときに鳴ります。火が近いだけでは鳴らず、どの家が燃えているかも教えてくれません。",
  "how.crews.term": "隊",
  "how.crews.desc": "訂正 (correction) です。赤い火に赤い隊を送ると火が消えます (X·X = I)。安全な家に赤い隊を送ると、赤い火がついてしまいます。火と隊は XOR で重なります。「たくさんかければ勝ち」ではありません。",
  "how.gates.term": "ゲート",
  "how.gates.desc": "火はゲート (gate) を通ってだけ動きます。CNOT は赤を前へ（制御 → 標的）、青を後ろへ（標的 → 制御）コピーします。H は自分の線の赤と青を入れかえます。",
  "how.verdict.term": "判定",
  "how.verdict.desc": "放水のあと、残り R = 隊 ⊕ 火 を符号 (code) の計算で判定します。R が安定化子 (stabilizer) なら「論理量子ビットは安全」。警報が全部静かでも R が論理演算子としてはたらくなら「静かな失敗」。どこかの警報所がまだ鳴っていれば「火はまだ燃えている」。警報が静かなだけでは、安全の証明になりません。",
  "how.controls": "そうさ",
  "how.controls.tap": "家をタップすると選んだ隊を送ります。もう一度タップすると呼びもどします。「放水！」を押すまで何も起こりません。",
  "how.controls.keyboard": "キーボード（出動画面の中にフォーカスがあるとき）：1 / 2 / 3 で X / Z / Y 隊を選ぶ、矢印で家や隊の色を移動、Enter か Space で隊を置く・もどす、Backspace でフォーカス中の家の隊をもどす（家にフォーカスがなければ全部もどす）、C で放水。",
  "how.controls.stars": "星：成功した最小の出動で 3、隊を余分に使った成功で 2、勝てないミッションでの正しい判断（または隊を 1 つ以上送ったニアミス）で 1。火が残っているのに待機すると 0。ミッション 6 の星は最大 1 なので、合計は 16 です。",
  "how.controls.sound": "音は自分でオンにするまで鳴りません。動きは OS の設定と「設定」のスイッチにしたがいます。",
  "how.model": "モデル：クリフォード + パウリの教育用シミュレーションで、シンドローム (syndrome) は完全に読めると仮定しています。反復符号は X ノイズだけの入門、メインの地区は距離 3 の回転表面符号 (rotated surface code) です。",
  "how.quantumRules": "同じ隊なら火が消える。ちがう隊なら火が変わる。空の家に隊を送ると火がつく。量子のルール！",
  "how.back": "もどる",
  "how.kid.intro": "この街では、見えない火事が家で起きています。警報所 (alarm) が「どこかが燃えている」と教えてくれます。あなたは隊を送って火を消します。これは、量子コンピュータがまちがいを直すしくみのゲームです。",
  "how.kid.legend": "絵の意味",
  "how.kid.houses": "家は量子ビット (qubit)：小さな量子のメモリです。",
  "how.kid.fires": "火はまちがいです。赤が X、青が Z、両方いっしょが Y。出動中は火が見えません。",
  "how.kid.alarms": "警報所はそれぞれいくつかの家を見ています。ひし形は赤い火で、四角は青い火で鳴ります。鳴るのは火が奇数のときだけで、どの家かは教えてくれません。",
  "how.kid.crews": "隊は直す力です。火と同じ文字なら火が消えます。ちがう文字なら火が変わります。空の家に送ると新しい火がつきます。",
  "how.kid.gates": "ゲートが火を線にそって動かします。火はひとりでに動きません。",
  "how.kid.water": "水はうすい色の丸いしずく。青い Z の火は Z の文字がついた炎。ぜんぜん別のものです。",
  "how.kid.spray": "放水！のあとは本当の火が見えるので、作戦をたしかめられます。本物の量子コンピュータはのぞき見できません。",
  /* ------------------------------------------------------------------ city map */
  "city.title": "量子の街",
  "city.subtitle": "けむりの出ている地区をタップすると、出動のお知らせが見られます。",
  "city.map": "街の地図",
  "city.hud.stars": "星 {stars} / {max}",
  "city.hud.solved": "安全な地区 {solved} / {total}",
  "city.hud.freeRoam": "フリーモード",
  "city.hud.freeRoamOn": "フリーモード：すべての地区に行けます。",
  "city.hud.storage.local": "進み具合はこのブラウザに保存されます。",
  "city.hud.storage.memory": "進み具合は、このページを開いている間だけ残ります。",
  "city.hud.storage.qollab": "Qollab では、進み具合は 1 回の Run の間だけ残ります。",
  "city.status.locked": "まだ行けない",
  "city.status.available": "火事発生",
  "city.status.selected": "選択中",
  "city.status.solved": "安全",
  "city.status.replay": "もう一度あそぶ",
  "city.locked.hint": "{district} を終わらせると、この道が開きます。",
  "city.select.goal": "出動のお知らせ",
  "city.select.lesson": "ここで学べること",
  "city.dispatch": "出動！",
  "city.redispatch": "もう一度出動",
  "city.truck.travel": "消防車が {district} へ向かっています…",
  "city.truck.arrived": "消防車が {district} に着きました。",
  "city.truck.skip": "移動をスキップ",
  "city.restored": "{district} はまた安全になりました。けむりが晴れて、灯りがもどります。",
  "city.badge": "{district} のバッジをもらいました",
  "city.allSafe": "すべての地区が安全です。街がもどりました！",
  "city.station": "消防署",
  "city.aria.map": "街の地図。地区はそれぞれボタンです。",
  "city.aria.district": "{name}、{status}",
  "city.aria.districtStars": "{name}、{status}、星 {stars} / {max}",
  "city.aria.mission": "ミッション {n}：{name}、{status}、{stars}",
  "city.aria.truck": "消防車",
  "city.badges": "バッジ",
  "city.badgeToast": "{badge} をもらいました！",
  "city.badgeOf": "バッジ：{badge}",
  "city.badgeName.firstAlarm": "警報リーダー",
  "city.badgeName.redForwardBlueBackward": "ゲート追跡係",
  "city.badgeName.colorSwitch": "いろがえ名人",
  "city.badgeName.blindDispatch": "見えない火の指令官",
  "city.badgeName.twoKindsOfTrouble": "二色の隊長",
  "city.badgeName.silentFailure": "調査官",
  "city.select.best": "これまでのベスト",
  "city.select.none": "まだ地区を選んでいません。",
  /* ------------------------------------------------------------------ briefing */
  "briefing.subtitle": "ブリーフィング",
  "briefing.goal": "きみの出動",
  "briefing.lesson": "ここで学べること",
  "briefing.district": "地区",
  "briefing.crews": "隊",
  "briefing.budget": "使える隊",
  "briefing.budget.one": "1 隊",
  "briefing.budget.other": "{n} 隊",
  "briefing.previousBest": "これまでのベスト",
  "briefing.upTo": "（最大 {n}）",
  "briefing.startTraining": "訓練をはじめる",
  "briefing.start": "はじめる",
  "briefing.skipToDispatch": "訓練をとばして出動",
  "briefing.go": "いくぞ！",
  /* ------------------------------------------------------------------ training */
  "training.subtitle": "訓練 · レッスン {n} / {total} · 火が見えます",
  "training.board": "訓練ボード、火が見えています",
  "training.boardLabel": "訓練ボード",
  "training.start": "スタート：",
  "training.afterGate": "ゲート {n} / {total} のあと：",
  "training.lesson": "レッスン",
  "training.lessons": "レッスン一覧",
  "training.lessonLabel": "レッスン {n}：{fires}",
  "training.prev": "もどる",
  "training.nextStep": "つぎの一歩",
  "training.nextLesson": "つぎのレッスン",
  "training.startDispatch": "出動をはじめる",
  "training.skip": "訓練をとばして出動",
  "training.firesVisible": "火が見えます",
  "training.predict": "まず予想してみよう。このゲートのあと、火はどこにある？",
  "training.check": "たしかめる",
  "training.predictTap": "次に燃えるのはどの家？ タップしてみよう！",
  "training.predict.hit": "正解！ このゲートのあと、家 {q} が燃えます。",
  "training.predict.miss": "今回はちがいました：家 {q} は無事です。火がどこへ行くか見てみよう。",
  "training.predict.waiting": "家をタップすると次のステップが見られます。",
  /* ------------------------------------------------------------------ challenge (planning) */
  "challenge.subtitle.dispatch": "出動 · 火はかくれている、警報は生きている",
  "challenge.subtitle.predict": "出動 · 火がどこに着くか予想しよう",
  "challenge.board": "出動ボード",
  "challenge.startingFire": "はじめの火：{fires}。火は回路 (circuit) を通って動きます。着く先に隊を送りましょう。",
  "challenge.startToken": "q{q} に {letter}",
  "challenge.tapHint": "家をタップすると選んだ隊を送ります。もう一度タップすると呼びもどします。",
  "challenge.fog": "火はかくれています。読めるのは警報だけです。",
  "challenge.panel": "出動",
  "challenge.crews": "隊：{used} / {budget}",
  "challenge.budgetReached": "隊は全部出動中",
  "challenge.placed": "配置した隊",
  "challenge.placement": "{letter} 隊 → 家 {q}",
  "challenge.noCrews": "まだ隊を置いていません。",
  "challenge.clear": "全部もどす",
  "challenge.confirm": "出動を確定",
  "challenge.spray": "放水！",
  "challenge.standDown.title": "隊を送らずに待機しますか？",
  "challenge.standDown.body": "隊を 1 つも送らずに確定しようとしています。燃えているものは、燃えたままです。",
  "challenge.standDown.confirm": "待機する",
  "challenge.standDown.cancel": "出動をつづける",
  "challenge.detector.hint": "警報所をタップすると、見ている家が光ります。",
  "challenge.detector.watches": "{station} は家 {list} を見ています。",
  /* ------------------------------------------------------------------ planning stage */
  "plan.title": "作戦",
  "plan.hint": "これは作戦です。「放水！」を押すまで何も起こりません。",
  "plan.undo": "もどす",
  "plan.redo": "やり直す",
  "plan.clear": "全部もどす",
  "plan.preview": "プレビュー",
  "plan.previewOn": "プレビュー オン",
  "plan.previewOff": "プレビュー オフ",
  "plan.previewHint": "プレビュー：それぞれの隊がどこに放水するか。",
  "plan.empty": "まだ作戦に隊がいません。",
  /* ------------------------------------------------------------------ first-run tutorial (three taps) */
  "tutorial.title": "はじめての出動",
  "tutorial.intro": "3 回タップすれば家は安全。いくよ？",
  "tutorial.step1": "隊を選ぶ",
  "tutorial.step1.body": "赤い隊 (X) は赤い火を消します。赤い隊をタップ。",
  "tutorial.step2": "家をタップ",
  "tutorial.step2.body": "警報が 2 つ鳴っています。どちらも見ている家をタップ。",
  "tutorial.step3": "放水！",
  "tutorial.step3.body": "「放水！」を押して、水が飛ぶのを見よう。",
  "tutorial.done": "やったね！家は安全、街の灯りがもどりました。",
  "tutorial.hint": "ヒント",
  "tutorial.showHint": "ヒントを見る",
  "tutorial.skip": "チュートリアルをとばす",
  "tutorial.replay": "チュートリアルをもう一度",
  "tutorial.beginnerLabel": "はじめてのヒント",
  /* ------------------------------------------------------------------ dispatch (spray showpiece) */
  "dispatch.subtitle": "出動 · 放水中",
  "dispatch.answerCheck": "訓練リプレイ：答え合わせ",
  "dispatch.answerCheck.note": "ここでは本当の火を見せて、作戦を答え合わせします。本物の量子コンピュータは、火を直接見ることはできません。",
  "dispatch.skip": "スキップ",
  "dispatch.watchAgain": "もう一度見る",
  "dispatch.why": "なぜ？",
  "dispatch.continue": "つづける",
  "dispatch.step": "ステップ {n} / {total}",
  "dispatch.aria.player": "放水リプレイ",
  "spray.trucksArrive": "消防車が {district} に着きました。",
  "spray.crewsRunning": "隊員が家に走ります…",
  "spray.crewRun": "{crew} 隊が家 {q} へ走ります。",
  "spray.waterOn": "放水開始！",
  "spray.sprayStart": "{crew} 隊が家 {q} に放水します。",
  "spray.splash": "ザバーン！",
  "spray.extinguished": "家 {q}：火が消えました。",
  "spray.changed": "家 {q}：{before} の火が {after} の火に変わりました。",
  "spray.ignited": "家 {q}：{after} の火がつきました。この家は燃えていませんでした。",
  "spray.revealRemaining": "まだ燃えているところです。",
  "spray.alarms": "警報をもう一度読みます。",
  "spray.done": "全隊、報告完了。",
  "spray.quantumRules": "同じ隊なら火が消える。ちがう隊なら火が変わる。空の家に隊を送ると火がつく。量子のルール！",
  "spray.oneShot": "放水 1 回が訂正 1 回です。長く押しても、2 回かけても、それ以上は何も起こりません。",
  /* ------------------------------------------------------------------ results (four types + beacon) */
  "result.subtitle": "結果",
  "result.heading.flawless": "完璧な出動",
  "result.heading.firesOut": "火は消えた",
  "result.heading.unlucky": "正しい判断、運が悪かった",
  "result.heading.lucky": "運のよい当たり",
  "result.heading.close": "おしい",
  "result.heading.stoodDown": "待機した",
  "result.heading.off": "はずれ",
  "result.starsOf.one": "星 {stars} / 1",
  "result.starsOf.other": "星 {stars} / {max}",
  "result.maxOne": "このミッションの星は最大 1 つです。警報だけでは勝てないからです。",
  "result.decision": "判断",
  "result.outcome": "結果",
  "result.cost": "コスト",
  "result.costText.one": "使った隊 1 · 最小 {min}",
  "result.costText.other": "使った隊 {used} · 最小 {min}",
  "result.attempts": "ちょうせん回数",
  "result.next": "つぎの地区",
  "result.summary": "まとめ",
  "result.tryAgain": "もう一度",
  "result.city": "街にもどる",
  "result.investigationComplete": "調査完了",
  "result.quality.optimal": "最適の判断",
  "result.quality.valid": "成功、でもコスト高",
  "result.quality.unlucky": "最適の判断、運の悪い結果",
  "result.quality.lucky": "運のよい当たり — 警報からはわからなかった",
  "result.quality.off": "はずれ",
  "result.outcome.success": "論理量子ビットは安全",
  "result.outcome.logicalError": "静かな失敗 — 論理量子ビットが反転",
  "result.outcome.detectable": "火はまだ燃えている",
  "result.outcome.propagationMiss": "予想がはずれた — 線の上に火が残った",
  "result.type.restored.title": "火は消えて、家はもどった",
  "result.type.restored.body": "何も残っていません。しまってある量子の情報は安全です。",
  "result.type.safePattern.title": "安全な模様",
  "result.type.safePattern.body": "何か残っていますが、符号 (code) が気にしない無害な模様（安定化子 (stabilizer)）です。しまってある情報は安全です。",
  "result.type.safePattern.details": "残りそのまま：{residual}",
  "result.type.stillBurning.title": "まだ燃えている",
  "result.type.stillBurning.body": "火が残っていて、その警報が鳴っています。どの警報所が鳴っているか見て、もう一度やってみましょう。",
  "result.type.logicalFailure.title": "静かな失敗",
  "result.type.logicalFailure.body": "警報はすべて静かですが、記憶ビーコン (memory beacon) が反転を示しています。残った模様が、しまってある情報にはたらいています。",
  "result.beacon.title": "記憶ビーコン",
  "result.beacon.ok": "記憶ビーコンは安定：しまってある情報はそのままです。",
  "result.beacon.logicalX": "記憶ビーコン：論理 X の反転",
  "result.beacon.logicalZ": "記憶ビーコン：論理 Z の反転",
  "result.beacon.logicalXZ": "記憶ビーコン：論理 X と Z の反転",
  "result.beacon.pattern": "原因の模様：{pattern}",
  "result.beacon.note": "ビーコンは結果のときだけ見えます。プレイ中に読めるのは警報だけです。",
  "result.badge": "章のバッジ：{district}",
  /* ------------------------------------------------------------------ why panel */
  "why.title": "なぜ？",
  "why.yours": "きみの放水",
  "why.alternative": "もう一つのやり方",
  "why.decoder": "すべての警報を静かにする最小の隊",
  "why.trueFires": "本当の火に合わせた隊",
  "why.equivalent": "きみの放水ともう一つのやり方のちがいは、無害な模様だけです。符号はどちらも同じ訂正とみなします。",
  "why.sameAlarms": "どちらの火の模様も、まったく同じ警報を鳴らします。",
  "why.cannotDecide": "警報だけでは決められません。",
  "why.compare": "くらべる",
  "why.replayBoth": "両方をリプレイ",
  "why.noBlame": "警報からは、だれにもわかりませんでした。それが学びであって、まちがいではありません。",
  "why.verdict": "→ {verdict}",
  /* ------------------------------------------------------------------ debrief (report / replay) */
  "debrief.subtitle": "ふりかえり · すべて公開",
  "debrief.report": "レポート",
  "debrief.trueFires": "本当の火",
  "debrief.startedAs": "はじめの火",
  "debrief.yourCrews": "きみの隊",
  "debrief.residual": "残り",
  "debrief.residualHouses": "· 家 {list}",
  "debrief.nothingLeft": "· 何も残っていない",
  "debrief.logical": "論理",
  "debrief.logical.preserved": "守られた",
  "debrief.logical.undecided": "まだわからない — 警報が鳴っている",
  "debrief.logical.missed": "はずれ — {houses} に火が残った",
  "debrief.logical.flipped": "反転した（{ops}）",
  "debrief.decision": "判断",
  "debrief.replayBoard": "リプレイボード",
  "debrief.step": "ステップ {n} / {total} · {title}。",
  "debrief.stepTitle.placed": "火がつく",
  "debrief.stepTitle.gate": "ゲート",
  "debrief.stepTitle.alarms": "警報",
  "debrief.stepTitle.dispatch": "きみの出動",
  "debrief.stepTitle.residual": "残り",
  "debrief.stepTitle.verdict": "判定",
  "debrief.prev": "もどる",
  "debrief.next": "つぎ",
  "debrief.autoPlay": "自動再生",
  "debrief.whatIf": "もしも",
  "debrief.whatIf.decoder": "この警報に対する最小の出動：{crews} → {verdict}。",
  "debrief.whatIf.trueFires": "本当の火に合わせた隊：{crews} → 論理量子ビットは安全。",
  "debrief.tryAgain": "もう一度",
  "debrief.result": "結果",
  "debrief.nextMission": "つぎの地区",
  "debrief.house.one": "家",
  "debrief.house.other": "家",
  "debrief.stepByStep": "一歩ずつ",
  /* ------------------------------------------------------------------ details fold (jargon lives here) */
  "details.show": "くわしく",
  "details.hide": "くわしくを閉じる",
  "details.title": "くわしく — 知りたい子と大人のために",
  "details.residualFormula": "残り R = C ⊕ E（隊 XOR 火、位相は無視）。",
  "details.stabilizer": "成功：R が符号の安定化子 (stabilizer) なので、符号化された量子ビットには何もしません。",
  "details.logical": "論理エラー：R はすべてのチェックと交換しますが安定化子ではないので、論理演算子 (logical operator) としてはたらきます。",
  "details.detectable": "検出可能：R が少なくとも 1 つのチェックと反交換するので、その警報所がまだ鳴ります。",
  "details.notSyndromeZero": "警報が静かなのは必要条件であって十分条件ではありません。成功は安定化子に入っているかで決まり、「シンドローム = 0」では決まりません。",
  "details.rawResidual": "残りそのまま",
  "details.syndrome": "警報ビット",
  "details.code": "符号",
  "details.englishOriginal": "元の報告（英語）",
  "details.replayEnglish": "リプレイの説明と「もしも」の解説は英語で生成されます。",
  /* ------------------------------------------------------------------ cloud verification (labels kept) */
  "cloud.title": "量子検証",
  "cloud.intro": "上の判定は、ここで計算した正確なパウリ・フレームの代数です。回路レベルの実行 (Qiskit) は、どこで実行したかのラベルつきで、作りものは一つもありません。この出動（{correction}、またはそれと同等の隊）の実行だけを表示します。",
  "cloud.empty": "この出動のクラウド結果は記録されていません{others}。",
  "cloud.emptyOthers": "（記録のある出動：{list}）",
  "cloud.running": "{backend} で実行中（100 ショット）…",
  "cloud.selectedBackend": "選んだバックエンド",
  "cloud.failed": "検証に失敗しました：{message}",
  "cloud.noJobs": "この Run で使えるジョブはもうありません",
  "cloud.verifyOn": "{backend} で検証（100 ショット）",
  "cloud.recordedCrews": "記録された隊：",
  "cloud.jobId": "ジョブ ID：",
  "cloud.noneLocal": "なし（ローカル実行）",
  "cloud.shots": "{n} ショット",
  "cloud.source.local": "ローカル (Local, Aer)",
  "cloud.source.cached": "キャッシュ済みクラウド結果 (Cached cloud result)",
  "cloud.source.live": "ライブクラウド結果 (Live cloud result)",
  "cloud.analysis.dominant": "いちばん多い警報パターン",
  "cloud.analysis.predicted": "{dom}（予測 {pred}）",
  "cloud.analysis.syndromeShare": "予測どおりの警報だったショット",
  "cloud.analysis.logicalShare": "予測どおりの論理ビットだったショット",
  "cloud.analysis.dominantMatches": "いちばん多い結果が判定と一致",
  "cloud.analysis.exact": "ノイズなしモデルと完全一致",
  "cloud.analysis.yes": "はい",
  "cloud.analysis.no": "いいえ",
  "cloud.analysis.noNoise": "いいえ（ノイズモデルでは想定どおり）",
  "cloud.analysis.verdict": "パウリ・フレームの判定",
  "cloud.analysis.prep": "準備 / 読み出し",
  "cloud.analysis.prepValue": "論理 |{prep}⟩ / {basis} 基底",
  /* ------------------------------------------------------------------ settings */
  "settings.title": "設定",
  "settings.close": "設定を閉じる",
  "settings.sound": "音",
  "settings.sound.desc": "出動・放水・消火の短くて心地よい音です。自分でオンにするまで鳴りません。",
  "settings.motion": "動きを減らす",
  "settings.motion.desc": "放水を止め絵のコマにして、1 コマずつ進めます。OS の「視差効果を減らす」設定もいつでも守ります。",
  "settings.language": "言語 (Language)",
  "settings.language.desc": "英語か日本語。いつでも切りかえられます。",
  "settings.language.en": "English",
  "settings.language.ja": "日本語",
  "settings.language.switchTo": "{lang} に切りかえる",
  "settings.freeRoam": "フリーモード",
  "settings.freeRoam.desc": "すべての地区を一度に開きます（審査・復習用）。ふつうは順番に開きます。",
  "settings.progress": "進み具合",
  "settings.storage.local": "進み具合はこのブラウザに保存されます（localStorage、キー {key}）。",
  "settings.storage.memory": "進み具合はこのセッションの間だけメモリに残ります（ここでは web ストレージが使えません）。",
  "settings.storage.qollab": "Qollab では、進み具合は 1 回の Run の間だけ残ります。サンドボックスに保存場所がないからです。",
  "settings.reset": "進み具合をリセット",
  "settings.resetDialog.title": "進み具合をすべてリセットしますか？",
  "settings.resetDialog.body": "すべての地区の星とちょうせん回数が消えます。設定はそのままです。",
  "settings.resetDialog.confirm": "リセット",
  "settings.on": "オン",
  "settings.off": "オフ",
  "settings.back": "もどる",
  /* ------------------------------------------------------------------ motion (reduced-motion stepper) */
  "motion.stepper.title": "1 コマずつ",
  "motion.stepper.hint": "動きを減らしています。放水を 1 コマずつ進めて見ましょう。",
  "motion.stepper.frame": "コマ {n} / {total}",
  "motion.stepper.next": "つぎのコマ",
  "motion.stepper.prev": "前のコマ",
  "motion.stepper.last": "最後の状態",
  /* ------------------------------------------------------------------ notices */
  "notice.progressReset": "進み具合をリセットしました。",
  "notice.saveReset": "保存データが読めなかったので、リセットしました。",
  "notice.saveMigrated": "保存してあった進み具合を、新しい街に引きつぎました。",
  "notice.dismiss": "閉じる",
  /* ------------------------------------------------------------------ summary */
  "summary.title": "出動完了",
  "summary.lead": "すべての地区の記録がそろいました。距離 3 の地区では火 1 つならいつでも見つけられます。「静かな失敗」の学びが、本物の量子コンピュータがもっと大きな符号を作る理由です。",
  "summary.mission": "地区",
  "summary.stars": "星",
  "summary.attempts": "ちょうせん回数",
  "summary.badges": "バッジ",
  "summary.city": "街にもどる",
  "summary.titleBtn": "タイトル",
  "summary.playAgain": "もう一度遊ぶ",
  "summary.freeRoamHint": "好きな地区を好きな順で遊びたいときは、設定で「フリーモード」をオンにしよう。",
  /* ------------------------------------------------------------------ mission list / cards (legacy + city) */
  "mission.label": "ミッション {n}",
  "mission.titleWithIndex": "ミッション {n} · {title}",
  "mission.missions": "ミッション",
  "mission.code.rep3": "反復符号 · 家 3 つ",
  "mission.code.rsc3": "表面符号 d=3 · 家 9 つ",
  "mission.code.trivial2": "むき出しの線 2 本",
  "mission.code.trivial3": "むき出しの線 3 本",
  "mission.kind.dispatch": "出動",
  "mission.kind.propagation": "伝わり方",
  "mission.status.new": "新しい",
  "mission.status.complete": "クリア",
  "mission.status.attempts.one": "1 回ちょうせん",
  "mission.status.attempts.other": "{n} 回ちょうせん",
  "mission.starsOf": "星 {stars} / {max}",
  "mission.notPlayed.one": "まだあそんでいない、星は最大 1",
  "mission.notPlayed.other": "まだあそんでいない、星は最大 {max}",
  /* ------------------------------------------------------------------ shared labels: crews, fires, alarms, palette */
  "crew.X": "赤 (X)",
  "crew.Z": "青 (Z)",
  "crew.Y": "赤と青 (Y)",
  "crew.name.X": "赤い隊 (X)",
  "crew.name.Z": "青い隊 (Z)",
  "crew.name.Y": "まざった隊 (Y)",
  "fire.X": "赤い火 (X)",
  "fire.Z": "青い火 (Z)",
  "fire.Y": "赤と青の火 (Y)",
  "fire.onHouse": "家 {q} に {letter} の火",
  "fire.none": "火なし",
  "palette.title": "隊",
  "palette.group": "隊の色",
  "palette.crew": "{letter} 隊",
  "palette.putsOut.X": "赤い火を消す",
  "palette.putsOut.Z": "青い火を消す",
  "palette.putsOut.Y": "赤と青の火を消す",
  "palette.key": "、キー {key}",
  "alarms.title": "警報",
  "alarms.stations": "警報所",
  "alarms.noneBareWires": "むき出しの線には警報所がありません。火がどこに着くか予想しましょう。",
  "alarms.houses": "家 {list}",
  "alarms.ringing": "鳴っている",
  "alarms.quiet": "静か",
  "alarms.notRead": "—",
  "alarms.summary.none": "この地区には警報所がありません。",
  "alarms.summary.notRead": "警報はまだ読んでいません。",
  "alarms.summary.allQuiet": "{n} か所の警報所はすべて静かです。",
  "alarms.summary.ringing": "{total} か所のうち {ringing} か所が鳴っています：{list}。",
  "legend.title": "記号の意味",
  "legend.fire": "{crew} の火",
  "legend.crew": "{crew} の隊",
  "legend.alarmZ": "Z 警報所（ひし形）：赤い火で鳴る",
  "legend.alarmX": "X 警報所（四角）：青い火で鳴る",
  "legend.water": "水（青い火ではありません！）",
  /* ------------------------------------------------------------------ ARIA-only / announcer text */
  "a11y.house": "家 {q}",
  "a11y.watchedBy": "{list} が見ている",
  "a11y.residualFire": "残った {crew} の火",
  "a11y.fireOut": "火は消えた",
  "a11y.fire": "{crew} の火",
  "a11y.crew": "{crew} の隊",
  "a11y.noCrewsLeft": "隊はもう残っていない",
  "a11y.pressToSend": "押すと {crew} の隊を送る",
  "a11y.pressToSendAny": "押すと隊を送る",
  "a11y.pressToRecall": "押すと隊を呼びもどす",
  "a11y.pressToSwitch": "押すと {crew} の隊に切りかえる",
  "a11y.pressToSwitchAny": "押すとべつの隊に切りかえる",
  "a11y.boardGrid": "{code} の出動ボード",
  "a11y.boardCircuit": "回路ボード",
  "a11y.replayBoard": "リプレイボード",
  "a11y.replayControls": "リプレイの操作",
  "a11y.replaySteps": "リプレイのステップ",
  "a11y.step": "ステップ {n}：{title}",
  "a11y.gameNav": "ゲーム",
  "a11y.backToTitle": "Q11 — タイトルにもどる",
  "a11y.dismissNotice": "お知らせを閉じる",
  "a11y.q11mark": "Q11 のマーク：Q の形の守りの輪と、中の小さな炎",
  "a11y.wires.start": "はじめ",
  "a11y.wires.end": "おわり",
  "a11y.stationRinging": "{station}、鳴っている、家 {list} を見ている",
  "a11y.stationQuiet": "{station}、静か、家 {list} を見ている",
  "a11y.fogHouse": "家 {q}、かくれている",
  "a11y.pressToPredict": "押すとこの家が次に燃えると予想する",
  "a11y.screen.title": "Q11 タイトル画面。",
  "a11y.screen.how": "あそび方。",
  "a11y.screen.settings": "設定。",
  "a11y.screen.city": "街の地図。",
  "a11y.screen.summary": "出動完了：すべての地区のまとめ。",
  "a11y.screen.briefing": "ミッション {n} のブリーフィング。",
  "a11y.screen.training": "ミッション {n} の訓練、レッスン {lesson} / {total}。火が見えます。",
  "a11y.screen.challenge.predict": "ミッション {n} の出動。火がどこに着くか予想しましょう。使える隊は {crews}。",
  "a11y.screen.challenge.alarms": "ミッション {n} の出動。{summary}",
  "a11y.screen.challenge.plain": "出動。",
  "a11y.screen.dispatch": "ミッション {n} の訓練リプレイ：答え合わせ。",
  "a11y.screen.dispatch.verdict": "ミッション {n} の訓練リプレイ：答え合わせ。{verdict}。",
  "a11y.screen.debrief": "ミッション {n} のふりかえり。",
  "a11y.screen.debrief.verdict": "ミッション {n} のふりかえり。{verdict}。",
  "a11y.screen.result": "ミッション {n} の結果。",
  "a11y.screen.result.stars": "ミッション {n} の結果：星 {stars} / {max}。",
  "a11y.crews.one": "1 隊",
  "a11y.crews.other": "{n} 隊",
  /* ------------------------------------------------------------------ common */
  "common.ok": "OK",
  "common.cancel": "キャンセル",
  "common.back": "もどる",
  "common.close": "閉じる",
  "common.skip": "スキップ",
  "common.next": "つぎ",
  "common.prev": "もどる",
  "common.and": "と",
  "common.loading": "読み込み中…"
}, n1 = "en", xf = { en: "English", ja: "日本語" }, r1 = { en: jh, ja: t1 }, s1 = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;
function i1(n, s) {
  return s === void 0 ? n : n.replace(s1, (l, a) => {
    const d = s[a];
    return d === void 0 ? l : String(d);
  });
}
function za(n, s, l) {
  const a = r1[n][s], d = a.length > 0 ? a : jh[s];
  return i1(d, l);
}
function l1(n) {
  return (s, l) => za(n, s, l);
}
function Xa(n, s, l, a) {
  const d = l === 1 ? `${s}.one` : `${s}.other`;
  return za(n, d, { n: l, ...a });
}
const Sh = z.createContext(n1);
function o1({ language: n, children: s }) {
  return z.useEffect(() => {
    try {
      document.documentElement.lang = n;
    } catch {
    }
  }, [n]), /* @__PURE__ */ i.jsx(Sh.Provider, { value: n, children: s });
}
function Ft() {
  return z.useContext(Sh);
}
function je() {
  const n = Ft();
  return z.useCallback((s, l) => za(n, s, l), [n]);
}
const wf = "このレッスンには警報所がないので、ここで警報が鳴ることはありません。", a1 = {
  "first-alarm": {
    briefing: "出動指令室へようこそ。3 つの街区 (block) が一列に並び、その間に 2 つの警報所 (alarm station) があります。放火犯のノイズ (Noise) は、ここでは赤い火 (X エラー) しかつけません。警報所は、見ている 2 つの街区のうちちょうど 1 つが燃えているときに鳴ります。警報を読んで、赤い隊を 1 つ送りましょう。",
    training: ["街区 0 に赤い火 (X)。警報所 Z0 は街区 0 と 1 を見ていて、火がちょうど 1 つなので鳴ります。警報所 Z1 は街区 1 と 2 を見ていて、火がないので静かなままです。"],
    debrief: {
      success: "警報所は両方とも鳴り、2 つが共有する街区は 1 だけです。赤い隊は火に正面から向かい、赤い炎 2 つは打ち消し合います (X·X = I)。論理量子ビット (logical qubit) は安全です。",
      "logical-error": "すべての警報は静かですが、残った模様は完全な論理反転 (XXX) です。安全な街区に送られた隊は自分で火をつけてしまうので、静かなだけでは安全の証明になりません。リプレイで、あなたの出動と警報を見比べましょう。",
      detectable: "少なくとも 1 つの警報所がまだ鳴っています。元の火がまだ燃えているか、隊が安全な街区に新しい火をつけたかのどちらかです。最初の警報をリプレイしましょう。両方の警報所が鳴り、2 つが共有する街区は 1 だけでした。"
    }
  },
  "red-forward-blue-backward": {
    briefing: "火はひとりでは広がりません。ゲート (gate) が運ぶのです。CNOT は赤い火 (X) を制御 (control) から標的 (target) へコピーし、青い火 (Z) を標的から制御へ逆向きにコピーします。訓練の実行を見てから、火がどこに着くかを予想して、そこへ隊を送りましょう。",
    training: ["赤は前へ：制御にある赤い火 (X) は標的にコピーされます。XI は XX になります。", "青は後ろへ：標的にある青い火 (Z) は制御にコピーされます。IZ は ZZ になります。"],
    debrief: {
      success: "赤が前へ、青が後ろへ同時に進んだので、XZ は YY になりました。両方の街区に赤と青の火です。あなたの隊はすべての成分 (component) に合っていて、何も残りません。",
      "logical-error": "むき出しの線 (bare wires) には警報所がないので、見のがした火や、まちがえてつけた火は、データに直接はたらきます。各街区の両方の色を確かめましょう。Y の火を消すには、赤と青の両方の成分が必要です。",
      detectable: wf
    }
  },
  "color-switch": {
    briefing: "ハダマード (Hadamard) ゲートは色を入れかえます。赤は青に、青は赤に、ただし自分の線の上だけです。CNOT と組み合わせると、1 つの火が色を変え、自分をコピーし、また色を変えることがあります。回路 (circuit) をゲート 1 つずつたどりましょう。",
    training: ["色がえ：ハダマードは街区 0 の赤い火 (X) を青い火 (Z) に変えます。XI は ZI になります。", "H で青が赤になり、つぎに CNOT で赤が前へコピーされます。ZI は XX になります。"],
    debrief: {
      success: "ZI は最初のハダマードで XI になり、CNOT で前へコピーされて XX になり、街区 1 の最後のハダマードがそのコピーを青にして XZ になりました。道筋を全部たどれました。",
      "logical-error": "火のひとつが、あなたが出動させたのとちがう色、またはちがう街区に着きました。回路をリプレイしましょう。H は自分の線の上だけで色を入れかえ、CNOT は赤を前へ、青を後ろへコピーします。",
      detectable: wf
    }
  },
  "blind-dispatch": {
    briefing: "表面符号 (surface code) 地区へようこそ。街区は 9 つ、警報所は 8 つです。赤い警報所 (Z チェック、ひし形) は赤い火に気づき、青い警報所 (X チェック、四角) は青い火に気づきます。今回は火がかくれています。警報を読んで、隊を 1 つ送りましょう。",
    training: [
      "街区 0 の赤い火 (X) は、街区 0・1・3・4 を見ている警報所 Z0 だけを鳴らします。街区 3 だけの火でもまったく同じ警報所が鳴るので、街区 3 に送った隊でも同じくらい良い直し方です。2 つの出動のちがいは安定化子 (stabilizer)（警報所 X2 自身の模様）だけで、符号はそれを気にしません。"
    ],
    debrief: {
      success: "警報所 Z0 と Z1 が両方鳴り、2 つが共有する街区は 4 だけです。赤い隊 1 つで火は消え、論理量子ビットは安全です。",
      "logical-error": "警報は静かになりましたが、残った模様は符号化された量子ビットに論理演算子 (logical operator) としてはたらきます。かくれた火 1 つと隊 1 つでは、この地区でこれは起こりえません。いつ起こるかは「静かな失敗」で見られます。",
      detectable: "警報がまだ鳴っています。燃えていない街区に赤い隊を送ると新しい火がつき、青い隊は赤い火をまったく消せません。隊の色を警報所の種類に合わせて、鳴っているすべての警報所が共有する街区を見つけましょう。"
    }
  },
  "two-kinds-of-trouble": {
    briefing: "今回は火が 2 つで、色がちがうかもしれません。赤い警報所は赤い火だけに、青い警報所は青い火だけに気づくので、2 つの警報地図をべつべつに読みましょう。隊は好きな色で 2 つ使えますが、1 つの街区に置ける隊は最大 1 つです。",
    training: [],
    debrief: {
      success: "赤い警報所 Z0 と Z2 が共有するのは街区 1 だけです。青い警報所 X1 だけが鳴ったので、その境界のペアである街区 6 と 7 を指しています。どちらに青い隊を送ってもうまくいきます。2 つの選択のちがいは安定化子だけだからです。2 つの色、2 つの火、両方消えました。",
      "logical-error": "すべての警報は静かですが、残った模様は論理演算子です。あなたの隊と火が打ち消し合うかわりに、いっしょになって地区をまたぐ鎖を作っています。鎖がどこを走るかはリプレイで見られます。",
      detectable: "まだ鳴っている警報所があります。赤い警報所は青い火をけっして見ないことを思い出しましょう。赤の警報と青の警報を、隊の色 1 つずつの、べつべつのパズルとして解きましょう。"
    }
  },
  "silent-failure": {
    briefing: "鳴っている警報は 1 つだけ、警報所 Z0 です。出動のルール (protocol) はシンプルです。すべての警報所を静かにする最小の隊を送ること。判断を下したら、本当は何が起きたのかを見てみましょう。",
    training: [],
    debrief: {
      success: "街区 1 と 2 の火を両方消しました。正直な質問です。どうしてわかったのですか？警報は街区 0 か 3 の火 1 つのときとまったく同じだったので、これはたまたま当たった推測です。ルールどおりなら街区 0 か 3 に隊を 1 つ送ります。このミッションの星は最大 1 つです。警報だけでは勝てないからです。",
      "logical-error": "それが最適の判断でした。鳴ったのは Z0 だけで、警報 1 つのいちばん良い説明は火 1 つ、街区 0 か 3 です（2 つのちがいは安定化子だけなので、どちらの隊でも同じ判断です）。しかしノイズは街区 1 と 2 に火を 2 つつけました。あなたの隊とその 2 つの火は、地区の上側をまたぐ赤い鎖になります。街区 0・1・2 の X、または街区 3 を通る同等の鎖です。これは論理 X で、どの警報所も偶数個として見るため、見つけられません。この符号の距離 (distance) は 3 です。火 1 つならいつでも直せますが、火 2 つはどんな指令官でもだませます。街区 1 と 2 に隊を送る理由になる警報の模様がなかったからです。だから本物の量子コンピュータは、もっと大きな符号を使うのです。",
      detectable: "警報所がまだ鳴っているので、最小の静かにする隊は送られませんでした。Z0 だけの警報に対するルールは、街区 0 か 3 に赤い隊を 1 つ（同等の選択）です。警報をリプレイして見比べましょう。"
    }
  }
}, c1 = {
  "first-alarm": {
    districtName: "Rowhouse Lane",
    kidTitle: "First Alarm",
    goal: "Two alarms ring: find the one house they both watch and send the red crew there.",
    beginnerHint: "Try this first: tap the red X crew, then tap the middle house that both alarms point at.",
    lessonOneLiner: "An alarm rings when an odd number of the houses it watches is on fire; it never points at one house by itself.",
    reactions: {
      restored: "Both alarms went quiet and the house is safe. You read the alarms exactly right.",
      safePattern: "What is left is a harmless pattern the code does not notice. The stored information is safe.",
      stillBurning: "An alarm is still ringing, so a fire is still there. Look at which station rings and try again.",
      logicalFailure: "Every alarm is quiet, yet the leftover pattern flips the stored bit. Quiet alarms alone never prove safety."
    },
    whyShort: "Each alarm watches two houses. Only the middle house is watched by both, so only a fire there rings both.",
    detailsTitle: "Details: repetition code, Z checks and X errors"
  },
  "red-forward-blue-backward": {
    districtName: "Harbor Bridge",
    kidTitle: "Red Forward, Blue Backward",
    goal: "Watch the fire cross the bridge gate, then send crews to where the fires end up.",
    beginnerHint: "Red copies forward to the target, blue copies backward to the control. Both houses end up with both colours.",
    lessonOneLiner: "A CNOT gate carries a red fire (X) forward and a blue fire (Z) backward; fires never move on their own.",
    reactions: {
      restored: "Both houses are clear. You traced red forward and blue backward perfectly.",
      safePattern: "On bare wires there is no code, so only a clean cancel counts as safe. And that is what happened.",
      stillBurning: "This bridge has no alarm stations, so nothing can ring here. Watch the replay to see where the fire went.",
      logicalFailure: "A fire is left on a wire, so the prediction missed. Replay the gate: red forward, blue backward."
    },
    whyShort: "XZ through a CNOT becomes YY: the red half copies forward and the blue half copies backward at the same time.",
    detailsTitle: "Details: CNOT propagation rules (x[t] ^= x[c], z[c] ^= z[t])"
  },
  "color-switch": {
    districtName: "Conversion Lab",
    kidTitle: "Colour Switch",
    goal: "Follow the fire through three gates and send crews to its final colours and houses.",
    beginnerHint: "Step through the training first. H swaps red and blue on its own wire; CNOT copies red forward.",
    lessonOneLiner: "A Hadamard gate (H) swaps red (X) and blue (Z) on its own wire only.",
    reactions: {
      restored: "Blue, red, copy, blue again: you followed every switch. Both houses are clear.",
      safePattern: "There is no code on these wires, so only a clean cancel counts as safe. Nothing is left.",
      stillBurning: "The lab has no alarm stations, so nothing rings here. Use the replay to see each gate’s switch.",
      logicalFailure: "A fire ended with a different colour or house than you planned. Replay the gates one at a time."
    },
    whyShort: "ZI → XI at the first H, → XX through the CNOT, → XZ when the last H turns the copy blue.",
    detailsTitle: "Details: H swaps x and z; the full path ZI → XI → XX → XZ"
  },
  "blind-dispatch": {
    districtName: "Central District",
    kidTitle: "Blind Dispatch",
    goal: "Nine houses, eight alarms, one hidden fire: find the house every ringing alarm shares.",
    beginnerHint: "Tap a ringing station to see its houses. The red crew goes where the two ringing stations overlap.",
    lessonOneLiner: "Red stations (Z checks) notice red fires; blue stations (X checks) notice blue fires.",
    reactions: {
      restored: "Both stations went quiet and the middle house is safe. One crew, one fire, perfect.",
      safePattern: "Something is left, but it is a harmless pattern the code ignores. The stored information is safe.",
      stillBurning: "A station still rings. A red crew on a safe house starts a red fire, and a blue crew cannot touch a red one.",
      logicalFailure: "All alarms are quiet, yet the beacon shows a flip. With one fire and one crew that should not happen here, so open Why to see the chain."
    },
    whyShort: "Z0 watches houses 0, 1, 3, 4 and Z1 watches 4, 5, 7, 8. Only house 4 is on both lists.",
    detailsTitle: "Details: distance-3 rotated surface code (9 data qubits, 8 checks)"
  },
  "two-kinds-of-trouble": {
    districtName: "Market Square",
    kidTitle: "Two Kinds of Trouble",
    goal: "Two fires, two colours: solve the red alarms and the blue alarm as separate puzzles.",
    beginnerHint: "Red first: Z0 and Z2 share one house. Then blue: X1 rings alone, so pick one of its edge houses.",
    lessonOneLiner: "Red stations never see blue fires, so red alarms and blue alarms are two independent maps.",
    reactions: {
      restored: "Red out, blue out. You read two alarm maps at once.",
      safePattern: "Your blue crew stood next to the true blue fire, but the code treats both as the same fix. Safe!",
      stillBurning: "A station still rings. Solve red and blue separately: one red crew for the red alarms, one blue for the blue.",
      logicalFailure: "The alarms are quiet, but your crews and the fires formed a chain across the district. Open Why to see the chain."
    },
    whyShort: "Z0 and Z2 share only house 1: red there. X1 rang alone: a blue crew on house 6 or 7 works, the two differ by a stabilizer.",
    detailsTitle: "Details: CSS codes — Z checks see X, X checks see Z; why Y is not offered here"
  },
  "silent-failure": {
    districtName: "Old Town",
    kidTitle: "Silent Failure",
    goal: "Only one alarm rings: send the smallest crew that silences it, then investigate.",
    beginnerHint: "Protocol: one red crew on house 0 or house 3 silences Z0. Make that call and watch the memory tower.",
    lessonOneLiner: "Two different fires can ring the same alarms, so alarms alone cannot always decide.",
    reactions: {
      restored: "You put out both hidden fires. Honestly, the alarms could not tell you that, so this was a lucky guess.",
      safePattern: "What is left is a harmless pattern, so the information is safe. The alarms still could not have told you where the fires were.",
      stillBurning: "Z0 still rings, so the smallest silencing crew was not sent. Protocol is one red crew on house 0 or 3.",
      logicalFailure: "That was the right call, yet the memory tower flipped: two fires fooled the alarms. Investigation complete, and nobody could have known from the alarms alone."
    },
    whyShort: "Fires on houses 1 and 2 ring only Z0, exactly like one fire on house 0. Alarms alone cannot decide: distance 3 fixes one fire, not two.",
    detailsTitle: "Details: distance 3, the logical X̄ = X0 X1 X2 chain, and why bigger codes exist"
  }
}, u1 = {
  "first-alarm": {
    districtName: "長屋通り (Rowhouse Lane)",
    kidTitle: "はじめての警報",
    goal: "鳴っている 2 つの警報 (alarm) が両方とも見ている家に、赤い隊 (X) を送りましょう。",
    beginnerHint: "まず赤い X 隊をタップ。つぎに、2 つの警報が指している真ん中の家をタップしてみましょう。",
    lessonOneLiner: "警報は、見ている家のうち燃えている数が奇数のときに鳴ります。1 つの家を指すわけではありません。",
    reactions: {
      restored: "警報が 2 つとも静かになり、家は無事です。警報をぴったり読めましたね。",
      safePattern: "残った模様は無害で、符号 (code) は気づきません。しまってある情報は安全です。",
      stillBurning: "まだ警報が鳴っているので、火が残っています。どの警報所が鳴っているか見て、もう一度やってみましょう。",
      logicalFailure: "警報はすべて静かですが、残った模様が記憶をひっくり返しました。静かなだけでは安全とはいえません。"
    },
    whyShort: "それぞれの警報は 2 つの家を見ています。両方に見られているのは真ん中の家だけなので、そこが燃えると 2 つとも鳴るのです。",
    detailsTitle: "くわしく：反復符号 (repetition code)、Z チェックと X エラー"
  },
  "red-forward-blue-backward": {
    districtName: "港の橋 (Harbor Bridge)",
    kidTitle: "赤は前へ、青は後ろへ",
    goal: "橋のゲート (CNOT) を火がわたった先を予想して、火が着く家に隊を送りましょう。",
    beginnerHint: "赤 (X) は前の家へ、青 (Z) は後ろの家へコピーされます。どちらの家にも両方の色がつきます。",
    lessonOneLiner: "CNOT ゲートは赤い火 (X) を前へ、青い火 (Z) を後ろへ運びます。火は勝手に動きません。",
    reactions: {
      restored: "2 つの家ともきれいになりました。赤は前へ、青は後ろへ、ぴったり追えましたね。",
      safePattern: "むき出しの線 (bare wires) には符号がないので、きれいに消えたときだけ安全です。今回はそうなりました。",
      stillBurning: "この橋には警報所がないので、鳴ることはありません。リプレイで火の行き先を見てみましょう。",
      logicalFailure: "線の上に火が残って、予想がはずれました。ゲートをリプレイしましょう：赤は前へ、青は後ろへ。"
    },
    whyShort: "XZ が CNOT を通ると YY になります。赤の部分が前へ、青の部分が後ろへ、同時にコピーされるからです。",
    detailsTitle: "くわしく：CNOT の伝わり方 (x[t] ^= x[c], z[c] ^= z[t])"
  },
  "color-switch": {
    districtName: "変換研究所 (Conversion Lab)",
    kidTitle: "色がえの研究所",
    goal: "3 つのゲートを 1 つずつたどって、火の最後の色と家に隊を送りましょう。",
    beginnerHint: "まず訓練を 1 歩ずつ見ましょう。H は自分の線の赤と青を入れかえ、CNOT は赤を前へコピーします。",
    lessonOneLiner: "ハダマード (H) ゲートは、自分の線の赤 (X) と青 (Z) だけを入れかえます。",
    reactions: {
      restored: "青→赤→コピー→また青、ぜんぶの色がえを追えました。2 つの家ともきれいです。",
      safePattern: "この線には符号がないので、きれいに消えたときだけ安全です。何も残っていません。",
      stillBurning: "研究所には警報所がないので、鳴ることはありません。リプレイで 1 つずつ色がえを見てみましょう。",
      logicalFailure: "火の色か場所が、予想とちがいました。ゲートを 1 つずつリプレイしてみましょう。"
    },
    whyShort: "ZI は最初の H で XI に、CNOT で XX に、最後の H でコピーが青になって XZ になります。",
    detailsTitle: "くわしく：H は x と z を入れかえる（ZI → XI → XX → XZ）"
  },
  "blind-dispatch": {
    districtName: "中央地区 (Central District)",
    kidTitle: "見えない火を消せ",
    goal: "9 つの家と 8 つの警報の中にかくれた火が 1 つ、鳴っている警報がみんな見ている家をさがしましょう。",
    beginnerHint: "鳴っている警報所をタップすると、見ている家が光ります。2 つの警報がかさなる家に赤い隊を送りましょう。",
    lessonOneLiner: "赤い警報所 (Z チェック) は赤い火を、青い警報所 (X チェック) は青い火を見つけます。",
    reactions: {
      restored: "警報所が 2 つとも静かになり、真ん中の家は無事です。1 隊で火 1 つ、完璧です。",
      safePattern: "何か残っていますが、符号が気にしない無害な模様です。しまってある情報は安全です。",
      stillBurning: "まだ警報所が鳴っています。安全な家に赤い隊を送ると赤い火がつき、青い隊は赤い火にさわれません。",
      logicalFailure: "警報はすべて静かですが、ビーコン (beacon) が反転を示しています。「なぜ」ボタンで鎖を見てみましょう。"
    },
    whyShort: "Z0 は家 0・1・3・4 を、Z1 は家 4・5・7・8 を見ています。両方にある家は 4 だけです。",
    detailsTitle: "くわしく：距離 3 の回転表面符号 (rotated surface code)、データ 9・チェック 8"
  },
  "two-kinds-of-trouble": {
    districtName: "市場広場 (Market Square)",
    kidTitle: "2 しゅるいの火",
    goal: "火は 2 つで色も 2 つ、赤い警報と青い警報をべつべつのパズルとして解きましょう。",
    beginnerHint: "まず赤。Z0 と Z2 が両方見ている家は 1 つです。つぎに青。X1 だけが鳴っているので、そのはしの家を 1 つ選びましょう。",
    lessonOneLiner: "赤い警報所は青い火を見ません。だから赤の警報と青の警報は、べつべつの地図です。",
    reactions: {
      restored: "赤も青も消えました。2 つの警報地図を同時に読めましたね。",
      safePattern: "青い隊は本当の火のとなりでしたが、符号はどちらも同じ消し方とみなします。安全です！",
      stillBurning: "まだ鳴っている警報所があります。赤と青はべつべつに、赤の警報には赤い隊、青の警報には青い隊です。",
      logicalFailure: "警報は静かですが、隊と火がつながって地区をまたぐ鎖になりました。「なぜ」ボタンで鎖を見てみましょう。"
    },
    whyShort: "Z0 と Z2 がともに見るのは家 1 だけ。X1 だけが鳴ったので、青い隊は家 6 でも 7 でも OK。ちがいは安定化子 (stabilizer) だけです。",
    detailsTitle: "くわしく：CSS 符号では Z チェックが X を、X チェックが Z を見つける。なぜここに Y 隊がないのか"
  },
  "silent-failure": {
    districtName: "旧市街と記憶の塔 (Old Town)",
    kidTitle: "静かな失敗",
    goal: "鳴っている警報は 1 つだけなので、それを静かにする最小の隊を送ってから、本当は何が起きたのか調べましょう。",
    beginnerHint: "ルールどおりなら、家 0 か 3 に赤い隊を 1 つで Z0 は静かになります。そう決めて、記憶の塔を見てみましょう。",
    lessonOneLiner: "ちがう 2 つの火が同じ警報を鳴らすことがあります。だから警報だけでは決められないときがあるのです。",
    reactions: {
      restored: "かくれた 2 つの火を両方消しました。でも正直にいうと、警報からはわからなかったので、運のよい当たりです。",
      safePattern: "残ったのは無害な模様なので、情報は安全です。それでも、火の場所は警報からはわかりませんでした。",
      stillBurning: "Z0 がまだ鳴っているので、最小の隊ではありませんでした。ルールは家 0 か 3 に赤い隊を 1 つです。",
      logicalFailure: "正しい判断でしたが、2 つの火が警報をだまして記憶の塔は反転しました。調査完了です、警報からはだれにもわかりませんでした。"
    },
    whyShort: "家 1 と 2 の火は Z0 だけを鳴らし、家 0 の火 1 つと見分けがつきません。警報だけでは決められないので、距離 3 の符号は火 1 つまでしか直せません。",
    detailsTitle: "くわしく：距離 3、論理 X̄ = X0 X1 X2 の鎖、そして大きな符号が必要な理由"
  }
}, d1 = ["first-alarm", "red-forward-blue-backward", "color-switch", "blind-dispatch", "two-kinds-of-trouble", "silent-failure"];
function f1(n) {
  return typeof n == "string" && d1.includes(n);
}
function bh(n) {
  if (!f1(n)) throw new Error(`unknown mission '${n}'`);
  return n;
}
const h1 = { en: c1, ja: u1 };
function At(n, s) {
  return h1[s][bh(n)];
}
function Za(n) {
  return a1[bh(n)];
}
function p1(n, s, l) {
  return s === "ja" ? Za(n).briefing : l;
}
function m1(n, s, l, a) {
  return l !== "ja" ? a : Za(n).training[s] ?? a;
}
function Nh(n, s, l, a) {
  return l === "ja" ? Za(n).debrief[s] : a;
}
function Eh(n, s) {
  switch (s) {
    case "restored":
      return n.reactions.restored;
    case "safe-pattern":
      return n.reactions.safePattern;
    case "still-burning":
      return n.reactions.stillBurning;
    case "logical-failure":
      return n.reactions.logicalFailure;
  }
}
const g1 = 1500, y1 = 1300, x1 = 4e3, w1 = 120;
function k1(n, s) {
  const l = {};
  for (const a of Kn) l[a] = th(a, n, s);
  return l;
}
function v1(n) {
  return typeof n == "string" && Kn.includes(n);
}
function j1(n) {
  const s = Kn.indexOf(n);
  if (s <= 0) return null;
  const l = Kn[s - 1];
  return l === void 0 ? null : It.find((a) => a.id === l) ?? null;
}
function kf(n, s) {
  const l = Kn.indexOf(n), a = Kn.length;
  return Kn[(l + s + a) % a] ?? n;
}
const Ui = (n, s) => `${String(Math.round(n / s * 1e4) / 100)}%`;
function S1(n) {
  return {
    left: Ui(n.x + n.w / 2, _r),
    top: Ui(n.y + n.h / 2, Or),
    width: Ui(n.w, _r),
    height: Ui(n.h, Or)
  };
}
function b1(n) {
  const s = Math.min(1, Math.max(0, n));
  return s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2;
}
function N1(n, s, l) {
  return { x: n.x + (s.x - n.x) * l, y: n.y + (s.y - n.y) * l };
}
function vf(n, s, l, a) {
  if (n !== null && typeof n.getTotalLength == "function" && typeof n.getPointAtLength == "function") {
    const d = n.getTotalLength();
    if (Number.isFinite(d) && d > 0) {
      const f = n.getPointAtLength(a * d);
      return { x: f.x, y: f.y };
    }
  }
  return N1(s, l, a);
}
function jf() {
  if (typeof document > "u") return !1;
  if (document.querySelector('[data-reduced-motion="true"]') !== null) return !0;
  try {
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
  } catch {
    return !1;
  }
}
const E1 = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function va(n) {
  return E1[n] ?? "city.badgeName.firstAlarm";
}
const Yi = ["#e8432f", "#2f7fe6", "#9b5de5", "#2bb673", "#f2b200", "#3fb6f5"];
function Sf(n) {
  return Yi[(n % Yi.length + Yi.length) % Yi.length] ?? "#2f7fe6";
}
function C1({ state: n, dispatch: s, storageNote: l, recentlySolved: a, onSettings: d, onTitle: f, reducedMotion: p, initialSelected: x = null }) {
  const g = je(), b = Ft(), S = k1(n.progress, n.settings.freeRoam), v = p ?? (n.settings.reducedMotion ? !0 : void 0), E = z.useCallback(() => v ?? jf(), [v]), I = v1(a) && S[a] === "solved" ? a : null, [$, R] = z.useState(() => x !== null && S[x] !== "locked" ? x : null), [L, F] = z.useState(null), [X, _] = z.useState(null), [U, re] = z.useState(() => I !== null && !(v ?? jf())), [ne, W] = z.useState(() => {
    if (I === null) return null;
    const B = br(I), Ce = It.findIndex((ge) => ge.id === I);
    return { kind: "badge", text: g("city.badgeToast", { badge: g(va(B.missionId)) }), colour: Sf(Ce) };
  }), te = z.useRef(null), we = z.useRef(null), Y = z.useRef(null), q = z.useRef(null), he = z.useRef(null), ve = z.useRef(null);
  z.useEffect(() => {
    if (ne === null) return;
    const B = globalThis.setTimeout(() => W(null), x1);
    return () => globalThis.clearTimeout(B);
  }, [ne]), z.useEffect(() => {
    if (!U) return;
    const B = globalThis.setTimeout(() => re(!1), y1);
    return () => globalThis.clearTimeout(B);
  }, [U]), z.useEffect(() => {
    if ($ === null) return;
    const B = Y.current;
    B !== null && (typeof window < "u" && window.innerWidth < 1024 && B.scrollIntoView({ block: "nearest" }), we.current?.focus({ preventScroll: !0 }));
  }, [$]), z.useEffect(() => {
    if (L === null) return;
    const B = br(L), Ce = B.missionId;
    let ge = null, ct = !1;
    const rn = () => {
      ct || (ct = !0, ge !== null && globalThis.cancelAnimationFrame(ge), ge = null, he.current = null, s({ type: "SELECT_MISSION", id: Ce }), F(null), _(null));
    };
    he.current = rn;
    const _n = q.current;
    let On = null, Pr = vf(_n, mf, B.entry, 0), Pn = 1;
    const sn = (Ut) => {
      if (ct) return;
      On === null && (On = Ut);
      const Jn = Ut - On, $r = Math.min(1, Jn / g1), $n = vf(_n, mf, B.entry, b1($r)), Mr = $n.x - Pr.x;
      Mr > 0.01 ? Pn = 1 : Mr < -0.01 && (Pn = -1), Pr = $n, _({ x: $n.x, y: $n.y, facing: Pn, wheelFrame: Math.floor(Jn / w1) % 2 === 0 ? 0 : 1 }), $r < 1 ? ge = globalThis.requestAnimationFrame(sn) : rn();
    };
    return ge = globalThis.requestAnimationFrame(sn), () => {
      ge !== null && globalThis.cancelAnimationFrame(ge), he.current === rn && (he.current = null);
    };
  }, [L, s]);
  const be = z.useCallback(() => {
    he.current?.();
  }, []), at = (B) => {
    if (L !== null) return;
    if (U && re(!1), S[B] === "locked") {
      const ge = j1(B), ct = ge === null ? "" : At(ge.missionId, b).districtName;
      W({ kind: "locked", text: g("city.locked.hint", { district: ct }), colour: null });
      return;
    }
    ve.current = B, R(B);
  }, Ze = () => {
    R(null);
    const B = ve.current;
    B !== null && te.current?.querySelector(`button[data-district="${B}"]`)?.focus();
  }, Ee = () => {
    if ($ === null || L !== null) return;
    const B = br($);
    if (E()) {
      s({ type: "SELECT_MISSION", id: B.missionId });
      return;
    }
    F($);
  }, Z = (B) => {
    B.key === "Escape" && (L !== null ? (B.preventDefault(), be()) : $ !== null && (B.preventDefault(), Ze())), U && re(!1);
  }, le = (B, Ce) => {
    let ge = null;
    B.key === "ArrowRight" || B.key === "ArrowDown" ? ge = kf(Ce, 1) : B.key === "ArrowLeft" || B.key === "ArrowUp" ? ge = kf(Ce, -1) : B.key === "Home" ? ge = It[0]?.id ?? null : B.key === "End" && (ge = It[It.length - 1]?.id ?? null), ge !== null && (B.preventDefault(), te.current?.querySelector(`button[data-district="${ge}"]`)?.focus());
  }, V = (B) => {
    U && re(!1);
  }, j = {};
  for (const B of It) {
    const Ce = S[B.id];
    j[B.id] = Ce === "available" && $ === B.id && L === null ? "selected" : Ce;
  }
  const O = $a(n.progress), ce = _a(), de = It.filter((B) => S[B.id] === "solved"), me = $ !== null && L === null, ae = $ === null ? null : br($), ke = L === null ? null : br(L), ue = I === null ? null : br(I), Ne = (B) => g(B === "locked" ? "city.status.locked" : B === "solved" ? "city.status.solved" : "city.status.available"), Ge = (B) => {
    const Ce = In(B.missionId), ge = n.progress[B.missionId];
    return ge === void 0 ? Xa(b, "mission.notPlayed", Ce.maxStars, { max: Ce.maxStars }) : g("mission.starsOf", { stars: ge.stars, max: Ce.maxStars });
  };
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-city${me ? " has-panel" : ""}${L !== null ? " is-travelling" : ""}`, ref: te, onKeyDown: Z, "aria-busy": L !== null, children: [
    /* @__PURE__ */ i.jsxs("header", { className: "city-hud", children: [
      /* @__PURE__ */ i.jsxs("button", { type: "button", className: "city-brand", onClick: f, "aria-label": g("a11y.backToTitle"), "data-testid": "city-title", children: [
        /* @__PURE__ */ i.jsx(vh, { size: 40 }),
        /* @__PURE__ */ i.jsxs("span", { className: "city-brand-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-brand-name", children: g("app.name") }),
          /* @__PURE__ */ i.jsx("h1", { className: "city-brand-title", children: g("city.title") })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-hud-stats", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "city-stat", "data-testid": "city-stars", children: [
          /* @__PURE__ */ i.jsx(Ch, { filled: !0, size: 20 }),
          /* @__PURE__ */ i.jsx("span", { children: g("mission.starsOf", { stars: O, max: ce }) })
        ] }),
        /* @__PURE__ */ i.jsxs("ul", { className: "city-badges", "aria-label": g("city.badges"), "data-testid": "city-badges", children: [
          de.length === 0 ? /* @__PURE__ */ i.jsxs("li", { className: "city-badges-empty", children: [
            g("city.badges"),
            ": 0 / ",
            It.length
          ] }) : null,
          de.map((B) => {
            const Ce = It.findIndex((ct) => ct.id === B.id), ge = g(va(B.missionId));
            return /* @__PURE__ */ i.jsxs("li", { className: "city-badge", "data-badge": B.id, children: [
              /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 26, height: 31, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(el, { x: 0, y: 0, colour: Sf(Ce) }) }),
              /* @__PURE__ */ i.jsx("span", { className: "city-badge-name", children: ge })
            ] }, B.id);
          })
        ] }),
        n.settings.freeRoam ? /* @__PURE__ */ i.jsx("span", { className: "city-pill", "data-testid": "free-roam", title: g("city.hud.freeRoamOn"), children: g("city.hud.freeRoam") }) : null
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "city-storage", "data-testid": "storage-note", children: l }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-icon-btn", onClick: d, "aria-label": g("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(Fa, { size: 24 }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-body", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "city-map-wrap", "aria-label": g("city.aria.map"), "data-testid": "city-map", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "city-map", onPointerDown: V, style: { aspectRatio: `${String(_r)} / ${String(Or)}` }, children: [
          /* @__PURE__ */ i.jsxs("svg", { className: "city-svg", viewBox: `0 0 ${String(_r)} ${String(Or)}`, preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ i.jsx(Xg, { states: j, showSelection: !1 }),
            ae !== null && L === null ? /* @__PURE__ */ i.jsx("rect", { className: "city-select-ring", x: ae.x - 8, y: ae.y - 8, width: ae.w + 16, height: ae.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.22, stroke: m.highlight, strokeWidth: 5, strokeDasharray: "14 8" }) : null,
            U && ue !== null ? /* @__PURE__ */ i.jsxs("g", { className: "city-restore", "data-testid": "restore-fx", children: [
              /* @__PURE__ */ i.jsx("rect", { className: "city-restore-ring", x: ue.x - 6, y: ue.y - 6, width: ue.w + 12, height: ue.h + 12, rx: 16, fill: "none", stroke: m.success, strokeWidth: 5 }),
              /* @__PURE__ */ i.jsx("g", { className: "city-restore-smoke", children: /* @__PURE__ */ i.jsx(ph, { x: ue.smoke.x, y: ue.smoke.y, scale: 0.9 }) }),
              [0.2, 0.5, 0.8].map((B, Ce) => /* @__PURE__ */ i.jsx("g", { className: "city-restore-spark", style: { animationDelay: `${String(Ce * 120)}ms` }, children: /* @__PURE__ */ i.jsx(I1, { x: ue.x + ue.w * B, y: ue.y + ue.h * (0.3 + 0.2 * (Ce % 2)) }) }, B))
            ] }) : null,
            ke !== null ? /* @__PURE__ */ i.jsx("path", { ref: q, d: Fg[ke.id], fill: "none", stroke: "none", "data-testid": "travel-road" }) : null,
            X !== null ? /* @__PURE__ */ i.jsx("g", { className: "city-truck", "data-testid": "travel-truck", children: /* @__PURE__ */ i.jsx(ah, { x: X.x, y: X.y, scale: 0.85, facing: X.facing, lights: X.wheelFrame === 0, wheelFrame: X.wheelFrame }) }) : null
          ] }),
          It.map((B) => {
            const Ce = S[B.id], ge = In(B.missionId), ct = At(B.missionId, b), rn = g("city.aria.mission", { n: ge.index, name: ct.districtName, status: Ne(Ce), stars: Ge(B) });
            return /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `city-district is-${Ce}${$ === B.id ? " is-selected" : ""}`,
                style: S1(B),
                "data-testid": `mission-${String(ge.index)}`,
                "data-district": B.id,
                "data-status": Ce,
                "aria-label": rn,
                "aria-pressed": $ === B.id,
                "aria-disabled": L !== null ? !0 : void 0,
                onClick: () => at(B.id),
                onKeyDown: (_n) => le(_n, B.id),
                children: /* @__PURE__ */ i.jsxs("span", { className: "city-district-name", "aria-hidden": "true", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-n", children: ge.index }),
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-text", children: ct.districtName })
                ] })
              },
              B.id
            );
          })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "city-hint", children: g("city.subtitle") })
      ] }),
      /* @__PURE__ */ i.jsx("aside", { className: `city-panel${me ? " is-open" : ""}`, ref: Y, "aria-labelledby": "city-panel-heading", "data-testid": "city-panel", hidden: !me, children: ae !== null ? /* @__PURE__ */ i.jsx(T1, { box: ae, status: S[ae.id], state: n, headingRef: we, starsText: Ge(ae), statusLabel: Ne(S[ae.id]), onGo: Ee, onClose: Ze, travelling: L !== null }) : null })
    ] }),
    ke !== null ? /* @__PURE__ */ i.jsx("div", { className: "city-travel", onPointerDown: be, "data-testid": "travel-overlay", children: /* @__PURE__ */ i.jsxs("div", { className: "city-travel-card", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ i.jsx("span", { className: "city-travel-text", children: g("city.truck.travel", { district: At(ke.missionId, b).districtName }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn", onClick: be, "data-testid": "travel-skip", autoFocus: !0, children: g("city.truck.skip") })
    ] }) }) : null,
    /* @__PURE__ */ i.jsx("div", { className: "city-toast-region", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": "city-toast-region", children: ne !== null ? /* @__PURE__ */ i.jsxs("div", { className: `city-toast is-${ne.kind}`, "data-testid": `toast-${ne.kind}`, children: [
      ne.kind === "badge" ? /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 28, height: 33, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(el, { x: 0, y: 0, colour: ne.colour ?? m.crewZ }) }) : null,
      /* @__PURE__ */ i.jsx("span", { children: ne.text })
    ] }) : null })
  ] });
}
function T1({ box: n, status: s, state: l, headingRef: a, starsText: d, statusLabel: f, travelling: p, onGo: x, onClose: g }) {
  const b = je(), S = Ft(), v = In(n.missionId), E = At(n.missionId, S), I = l.progress[n.missionId], $ = s === "solved";
  return /* @__PURE__ */ i.jsxs("div", { className: "city-panel-inner", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-head", children: [
      /* @__PURE__ */ i.jsx("h2", { id: "city-panel-heading", className: "city-panel-title", ref: a, tabIndex: -1, children: E.districtName }),
      /* @__PURE__ */ i.jsxs("p", { className: "city-panel-sub", children: [
        /* @__PURE__ */ i.jsxs("span", { children: [
          b("mission.label", { n: v.index }),
          " · ",
          E.kidTitle
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: `city-status is-${s}`, "data-testid": "panel-status", children: f })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("dl", { className: "city-panel-facts", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact", children: [
        /* @__PURE__ */ i.jsx("dt", { children: b("city.select.goal") }),
        /* @__PURE__ */ i.jsx("dd", { children: E.goal })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: b("city.select.best") }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-stars", role: "img", "aria-label": d, children: Array.from({ length: v.maxStars }, (R, L) => /* @__PURE__ */ i.jsx(Ch, { filled: (I?.stars ?? 0) > L, size: 22 }, L)) }),
          /* @__PURE__ */ i.jsx("span", { className: "city-stars-text", children: d })
        ] })
      ] }),
      $ ? /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: b("city.badges") }),
        /* @__PURE__ */ i.jsx("dd", { children: b(va(n.missionId)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-primary", onClick: x, "data-testid": "dispatch-go", "aria-disabled": p ? !0 : void 0, children: b($ ? "city.status.replay" : "city.dispatch") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-ghost", onClick: g, "data-testid": "panel-close", children: b("common.close") })
    ] })
  ] });
}
function Ch({ filled: n, size: s }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: `city-star${n ? " is-filled" : ""}`, children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z", fill: n ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: 1.6, strokeLinejoin: "round" }) });
}
function I1({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("g", { transform: `translate(${String(n)} ${String(s)})`, children: /* @__PURE__ */ i.jsx("path", { d: "M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z", fill: m.windowLit, stroke: m.ink, strokeWidth: 2, strokeLinejoin: "round" }) });
}
var L1 = Mf();
const ja = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" }, R1 = { X: "palette.putsOut.X", Z: "palette.putsOut.Z", Y: "palette.putsOut.Y" }, Wa = {
  optimal: "result.quality.optimal",
  valid: "result.quality.valid",
  unlucky: "result.quality.unlucky",
  lucky: "result.quality.lucky",
  off: "result.quality.off"
};
function ol(n, s) {
  return n === "success" ? "result.outcome.success" : n === "detectable" ? "result.outcome.detectable" : s ? "result.outcome.logicalError" : "result.outcome.propagationMiss";
}
function _1(n) {
  return n.stars === 3 ? "result.heading.flawless" : n.stars === 2 ? "result.heading.firesOut" : n.quality === "unlucky" ? "result.heading.unlucky" : n.quality === "lucky" ? "result.heading.lucky" : n.stars === 1 ? "result.heading.close" : n.outcome === "detectable" && n.crewsUsed === 0 ? "result.heading.stoodDown" : "result.heading.off";
}
const O1 = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function Sa(n) {
  return O1[n] ?? "city.badges";
}
const P1 = {
  rep3: "mission.code.rep3",
  rsc3: "mission.code.rsc3",
  trivial2: "mission.code.trivial2",
  trivial3: "mission.code.trivial3"
}, $1 = {
  placed: "debrief.stepTitle.placed",
  gate: "debrief.stepTitle.gate",
  alarms: "debrief.stepTitle.alarms",
  dispatch: "debrief.stepTitle.dispatch",
  residual: "debrief.stepTitle.residual",
  verdict: "debrief.stepTitle.verdict"
};
function bf(n, s) {
  const l = $1[s.startsWith("gate-") ? "gate" : s];
  return l === void 0 ? s : n(l);
}
function Ba(n, s, l) {
  const a = Fe(s);
  if (a.checks.length === 0) return n("alarms.summary.none");
  if (l === null) return n("alarms.summary.notRead");
  const d = a.checks.filter((f, p) => (l[p] ?? 0) === 1).map((f) => f.id);
  return d.length === 0 ? n("alarms.summary.allQuiet", { n: a.checks.length }) : n("alarms.summary.ringing", { ringing: d.length, total: a.checks.length, list: d.join(", ") });
}
function M1(n, s) {
  const l = Ae(s), a = Ht(l).map((d) => n("fire.onHouse", { letter: Dt(l, d), q: d }));
  return a.length === 0 ? n("fire.none") : a.length === 1 ? a[0] ?? "" : `${a.slice(0, -1).join(", ")} ${n("common.and")} ${a[a.length - 1] ?? ""}`;
}
function D1(n, s, l) {
  const a = n("app.name");
  switch (s.screen) {
    case "title":
      return n("doc.title", { app: a });
    case "how":
      return n("doc.how", { app: a });
    case "settings":
      return n("doc.settings", { app: a });
    case "missions":
      return n("doc.city", { app: a });
    case "summary":
      return n("doc.summary", { app: a });
    case "briefing":
    case "training":
    case "challenge":
    case "dispatch":
    case "debrief":
    case "result":
      return l === null ? n("doc.city", { app: a }) : n("doc.mission", { app: a, n: l.index, title: l.title });
  }
}
function A1(n, s, l, a) {
  const d = l?.index ?? 0, f = l !== null && Fe(l.code).checks.length > 0, p = a === null ? "" : n(ol(a.verdict, f));
  switch (s.screen) {
    case "title":
      return n("a11y.screen.title");
    case "how":
      return n("a11y.screen.how");
    case "settings":
      return n("a11y.screen.settings");
    case "missions":
      return n("a11y.screen.city");
    case "summary":
      return n("a11y.screen.summary");
    case "briefing":
      return n("a11y.screen.briefing", { n: d });
    case "training":
      return n("a11y.screen.training", { n: d, lesson: s.lesson + 1, total: l?.training.length ?? 1 });
    case "challenge":
      return l === null ? n("a11y.screen.challenge.plain") : l.kind === "propagation" ? n("a11y.screen.challenge.predict", { n: d, crews: l.budget === 1 ? n("a11y.crews.one") : n("a11y.crews.other", { n: l.budget }) }) : n("a11y.screen.challenge.alarms", { n: d, summary: Ba(n, l.code, l.syndrome) });
    case "dispatch":
      return a === null || !s.dispatchDone ? n("a11y.screen.dispatch", { n: d }) : n("a11y.screen.dispatch.verdict", { n: d, verdict: p });
    case "debrief":
      return a === null ? n("a11y.screen.debrief", { n: d }) : n("a11y.screen.debrief.verdict", { n: d, verdict: p });
    case "result":
      return a === null ? n("a11y.screen.result", { n: d }) : n("a11y.screen.result.stars", { n: d, stars: a.score.stars, max: a.score.maxStars });
  }
}
function Es({ letter: n, size: s = 28, ghost: l = !1, residual: a = !1 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-flame icon-${n}`, width: s, height: s, viewBox: "-34 -100 68 104", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Rr, { letter: n, x: 0, y: 0, ghost: l, residual: a }) });
}
function Gn({ letter: n, size: s = 28 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-helmet icon-${n}`, width: s, height: s * 0.8, viewBox: "-30 -44 60 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Ma, { letter: n, x: 0, y: 0 }) });
}
function Ir({ type: n, ringing: s = !1, size: l = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-detector icon-detector-${n}${s ? " is-ringing" : ""}`, width: l, height: l, viewBox: "-30 -30 60 60", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Ig, { type: n, ringing: s, x: 0, y: 0 }) });
}
function Th({ size: n = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: "icon icon-water", width: n, height: n, viewBox: "-22 -44 44 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Eg, { x: 0, y: 0 }) });
}
function al({ codeId: n, syndrome: s, id: l, compact: a = !1, hint: d }) {
  const f = je(), p = Fe(n);
  return p.checks.length === 0 ? /* @__PURE__ */ i.jsxs("section", { className: "panel-section", "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted", id: l, children: f("alarms.noneBareWires") })
  ] }) : /* @__PURE__ */ i.jsxs("section", { className: `panel-section alarms${a ? " is-compact" : ""}`, "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "sr-only", id: l, "aria-live": "polite", children: Ba(f, n, s) }),
    /* @__PURE__ */ i.jsx("ul", { className: `alarm-list${p.checks.length > 4 ? " is-grid" : ""}${a ? " is-compact" : ""}`, "aria-label": f("alarms.stations"), children: p.checks.map((x, g) => {
      const b = s !== null && (s[g] ?? 0) === 1;
      return /* @__PURE__ */ i.jsxs("li", { className: b ? "alarm is-ringing" : "alarm", "data-check": x.id, "data-ringing": b ? "1" : "0", children: [
        /* @__PURE__ */ i.jsx(Ir, { type: x.type, ringing: b, size: 26 }),
        /* @__PURE__ */ i.jsxs("span", { className: "alarm-main", children: [
          /* @__PURE__ */ i.jsx("span", { className: "alarm-id", children: x.id }),
          /* @__PURE__ */ i.jsx("span", { className: "alarm-blocks", children: f("alarms.houses", { list: x.qubits.join(", ") }) })
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "alarm-state", children: f(s === null ? "alarms.notRead" : b ? "alarms.ringing" : "alarms.quiet") })
      ] }, x.id);
    }) }),
    d !== void 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted small alarm-hint", children: d }) : null
  ] });
}
const Nf = { X: "1", Z: "2", Y: "3" }, F1 = ["X", "Z", "Y"];
function z1({ allowed: n, selected: s, onSelect: l, callout: a }) {
  const d = je(), f = F1.filter((x) => n.includes(x)), p = (x, g) => {
    const b = f.indexOf(g);
    if (b < 0 || f.length === 0) return;
    let S;
    if (x.key === "ArrowDown" || x.key === "ArrowRight" ? S = f[(b + 1) % f.length] : x.key === "ArrowUp" || x.key === "ArrowLeft" ? S = f[(b - 1 + f.length) % f.length] : x.key === "Home" ? S = f[0] : x.key === "End" && (S = f[f.length - 1]), S === void 0) return;
    x.preventDefault(), l(S), x.currentTarget.closest('[role="radiogroup"]')?.querySelector(`[data-letter="${S}"]`)?.focus();
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section palette-section", "aria-labelledby": "palette-h", children: [
    /* @__PURE__ */ i.jsx("h2", { id: "palette-h", className: "panel-title", children: d("palette.title") }),
    a,
    /* @__PURE__ */ i.jsx("div", { className: "palette", role: "radiogroup", "aria-label": d("palette.group"), children: f.map((x) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": s === x,
        tabIndex: s === x ? 0 : -1,
        className: `palette-btn palette-${x}${s === x ? " is-selected" : ""}`,
        onClick: () => l(x),
        onKeyDown: (g) => p(g, x),
        "data-letter": x,
        "data-testid": `palette-${x}`,
        children: [
          /* @__PURE__ */ i.jsx(Gn, { letter: x, size: 44 }),
          /* @__PURE__ */ i.jsxs("span", { className: "palette-text", children: [
            /* @__PURE__ */ i.jsxs("span", { className: "palette-name", children: [
              d("palette.crew", { letter: x }),
              /* @__PURE__ */ i.jsxs("span", { className: "sr-only", children: [
                ", ",
                d(ja[x]),
                ","
              ] })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "palette-hint", children: d(R1[x]) })
          ] }),
          /* @__PURE__ */ i.jsx("kbd", { className: "palette-key", "aria-hidden": "true", children: Nf[x] }),
          /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: d("palette.key", { key: Nf[x] }) })
        ]
      },
      x
    )) })
  ] });
}
function Os({ count: n, max: s = 3, size: l = 22, label: a }) {
  const d = je();
  return /* @__PURE__ */ i.jsx("span", { className: "stars", role: "img", "aria-label": a ?? d("mission.starsOf", { stars: n, max: s }), children: Array.from({ length: Math.max(1, s) }, (f, p) => /* @__PURE__ */ i.jsx(e1, { filled: p < n, size: l }, p)) });
}
function nn({ title: n, subtitle: s, onMissions: l, onSettings: a, settingsLabel: d, onTitle: f }) {
  const p = je();
  return /* @__PURE__ */ i.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "topbar-title", children: [
      f === void 0 ? /* @__PURE__ */ i.jsx("span", { className: "brand", children: p("app.name") }) : /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost brand-btn", onClick: f, "aria-label": p("a11y.backToTitle"), children: p("app.name") }),
      /* @__PURE__ */ i.jsxs("div", { className: "topbar-text", children: [
        /* @__PURE__ */ i.jsx("h1", { className: "topbar-h", tabIndex: -1, "data-focus-target": !0, children: n }),
        s !== void 0 ? /* @__PURE__ */ i.jsx("p", { className: "topbar-sub", children: s }) : null
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("nav", { className: "topbar-actions", "aria-label": p("a11y.gameNav"), children: [
      l !== void 0 ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: l, "data-testid": "topbar-city", children: p("city.title") }) : null,
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: a, "aria-label": d ?? p("title.settings"), "data-testid": "topbar-settings", children: /* @__PURE__ */ i.jsx(Fa, {}) })
    ] })
  ] });
}
function X1({ language: n, onChange: s, testId: l = "lang-toggle" }) {
  const a = je(), d = n === "en" ? "ja" : "en";
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: "lang-pill",
      onClick: () => s(d),
      "aria-label": a("settings.language.switchTo", { lang: xf[d] }),
      title: a("title.language", { lang: xf[n] }),
      "data-testid": l,
      "data-language": n,
      children: [
        /* @__PURE__ */ i.jsx("span", { className: n === "en" ? "lang-opt is-on" : "lang-opt", "aria-hidden": "true", children: "EN" }),
        /* @__PURE__ */ i.jsx("span", { className: n === "ja" ? "lang-opt is-on" : "lang-opt", "aria-hidden": "true", children: "JA" })
      ]
    }
  );
}
function qa({ summary: n, children: s, testId: l, className: a }) {
  const d = je();
  return /* @__PURE__ */ i.jsxs("details", { className: `details-fold${a === void 0 ? "" : ` ${a}`}`, "data-testid": l, children: [
    /* @__PURE__ */ i.jsx("summary", { children: n ?? d("details.show") }),
    /* @__PURE__ */ i.jsx("div", { className: "details-body", children: s })
  ] });
}
function Z1({ text: n, onDismiss: s }) {
  const l = je();
  return /* @__PURE__ */ i.jsxs("div", { className: "notice", role: "status", "data-testid": "notice", children: [
    /* @__PURE__ */ i.jsx("span", { children: n }),
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: s, "aria-label": l("a11y.dismissNotice"), children: l("notice.dismiss") })
  ] });
}
const W1 = "[data-inert-root]", B1 = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ih({ title: n, children: s, confirmLabel: l, cancelLabel: a, onConfirm: d, onCancel: f, danger: p = !1 }) {
  const x = je(), g = z.useRef(null), b = z.useRef(null), S = z.useRef(f);
  z.useEffect(() => {
    S.current = f;
  }, [f]), z.useLayoutEffect(() => {
    const E = document.activeElement instanceof HTMLElement ? document.activeElement : null, I = Array.from(document.querySelectorAll(W1)), $ = I.map((R) => R.hasAttribute("inert"));
    return I.forEach((R) => R.setAttribute("inert", "")), g.current?.focus(), () => {
      I.forEach((R, L) => {
        ($[L] ?? !1) || R.removeAttribute("inert");
      }), E !== null && E.isConnected && E.focus();
    };
  }, []), z.useEffect(() => {
    const E = (I) => {
      if (I.key === "Escape") {
        I.preventDefault(), S.current();
        return;
      }
      if (I.key !== "Tab") return;
      const $ = b.current;
      if ($ === null) return;
      const R = Array.from($.querySelectorAll(B1));
      if (R.length === 0) return;
      const L = R[0], F = R[R.length - 1];
      if (L === void 0 || F === void 0) return;
      const X = document.activeElement;
      X instanceof Node && $.contains(X) ? I.shiftKey && X === L ? (I.preventDefault(), F.focus()) : !I.shiftKey && X === F && (I.preventDefault(), L.focus()) : (I.preventDefault(), (I.shiftKey ? F : L).focus());
    };
    return document.addEventListener("keydown", E), () => document.removeEventListener("keydown", E);
  }, []);
  const v = /* @__PURE__ */ i.jsx("div", { className: "dialog-backdrop", role: "presentation", children: /* @__PURE__ */ i.jsxs("div", { className: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "dialog-h", "aria-describedby": "dialog-d", ref: b, children: [
    /* @__PURE__ */ i.jsx("h2", { id: "dialog-h", className: "dialog-title", children: n }),
    /* @__PURE__ */ i.jsx("div", { id: "dialog-d", className: "dialog-body", children: s }),
    /* @__PURE__ */ i.jsxs("div", { className: "dialog-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", ref: g, onClick: f, children: a ?? x("common.cancel") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: p ? "btn btn-danger" : "btn btn-primary", onClick: d, children: l })
    ] })
  ] }) });
  return L1.createPortal(v, document.body);
}
function Lh({ allowed: n, alarms: s = !1, water: l = !1 }) {
  const a = je();
  return /* @__PURE__ */ i.jsxs("ul", { className: "legend", "aria-label": a("legend.title"), children: [
    n.map((d) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(Es, { letter: d, size: 24 }),
      " ",
      a("legend.fire", { crew: a(ja[d]) })
    ] }, `f-${d}`)),
    n.map((d) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(Gn, { letter: d, size: 24 }),
      " ",
      a("legend.crew", { crew: a(ja[d]) })
    ] }, `c-${d}`)),
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(Ir, { type: "Z", size: 24 }),
        " ",
        a("legend.alarmZ")
      ] }),
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(Ir, { type: "X", size: 24 }),
        " ",
        a("legend.alarmX")
      ] })
    ] }) : null,
    l ? /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(Th, { size: 24 }),
      " ",
      a("legend.water")
    ] }) : null
  ] });
}
const tl = {
  small: { w: 64, h: 74, side: 12 },
  tall: { w: 56, h: 106, side: 12 },
  shop: { w: 84, h: 62, side: 12 }
};
function q1(n, s) {
  return n === "bridge" || n === "lab" ? "small" : n === "houses-row" ? s === 1 ? "tall" : "small" : ["small", "shop", "small", "tall", "small", "small", "small", "tall", "shop"][s] ?? "small";
}
function H1(n, s) {
  return n === "rep3" ? "houses-row" : n === "rsc3" ? "grid" : s.some((l) => l.kind === "H" || l.kind === "S") ? "lab" : "bridge";
}
const U1 = 0.85, Ef = 0.8, Cf = 0.55, Tf = 0.6, Y1 = 0.6;
function V1(n) {
  return {
    width: 620,
    height: 100 + n * 100,
    lanes: n,
    laneY: (a) => 115 + a * 100,
    stepX: (a, d) => 150 + 320 * (a + 0.5) / Math.max(1, d),
    inX: 80,
    outX: 540
  };
}
function Q1(n, s) {
  const l = Fe(s).n;
  if (n === "grid" || n === "houses-row") {
    const f = n === "grid" ? wh : kh, p = f.houses.slice(0, l).map((x) => ({ q: x.q, x: x.x, y: x.y }));
    return {
      kind: n,
      codeId: s,
      width: f.width,
      height: f.height,
      n: l,
      houses: p,
      houseScale: U1,
      detectors: f.detectors,
      detectorScale: Ef,
      truck: { from: { x: -80, y: f.height - 6 }, stop: { x: 62, y: f.height - 6 }, facing: 1, scale: Tf },
      crewScale: Cf,
      tower: n === "grid" ? { x: 368, y: 108, scale: 0.52 } : { x: 368, y: 96, scale: 0.45 },
      lanes: null
    };
  }
  const a = V1(l), d = Array.from({ length: l }, (f, p) => ({ q: p, x: a.outX, y: a.laneY(p) + 26 }));
  return {
    kind: n,
    codeId: s,
    width: a.width,
    height: a.height,
    n: l,
    houses: d,
    houseScale: Y1,
    detectors: [],
    detectorScale: Ef,
    truck: { from: { x: -90, y: 56 }, stop: { x: 96, y: 56 }, facing: 1, scale: Tf },
    crewScale: Cf,
    tower: null,
    lanes: a
  };
}
function Ha(n, s) {
  const l = n.houses[s];
  if (l === void 0) throw new Error(`scene: no house ${String(s)}`);
  return l;
}
function Rh(n, s, l) {
  const a = Ha(n, s), d = tl[l], f = n.houseScale;
  return {
    x: a.x - (d.w / 2 + 10) * f,
    y: a.y - (d.h + 12) * f,
    w: (d.w + d.side + 20) * f,
    h: (d.h + 14) * f + 4
  };
}
function ba(n, s) {
  const l = Ha(n, s);
  return n.lanes !== null ? { x: l.x - 44, y: l.y + 4, facing: 1 } : { x: l.x - 20, y: l.y + 22, facing: 1 };
}
function ha(n, s, l) {
  const a = Ha(n, s), d = tl[l], f = n.houseScale, p = l === "shop" ? -10 * f : 0;
  return { x: a.x + p + 2, y: a.y + (-d.h + 14 - 22) * f };
}
function K1(n, s, l) {
  if (l === 0) return (n.inX + n.outX) / 2;
  if (s < 0) return (n.inX + n.stepX(0, l)) / 2;
  const a = n.stepX(Math.min(s, l - 1), l), d = s + 1 < l ? n.stepX(s + 1, l) : n.outX;
  return (a + d) / 2;
}
function If(n, s, l) {
  return n + (s - n) * l;
}
function _h(n, s, l) {
  return { x: If(n.x, s.x, l), y: If(n.y, s.y, l) };
}
function G1(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function J1(n) {
  const s = G1(n);
  return 1 - (1 - s) * (1 - s);
}
function Tn(n, s) {
  if (n == null || n.length === 0) return "I";
  const l = Ae(n);
  return s < l.n ? Dt(l, s) : "I";
}
function Oh(n) {
  return n === "I" ? null : n;
}
function ey(n, s) {
  if (n.fog) return { kind: "fog" };
  const l = n.atOutput ? Tn(n.fires, s) : "I", a = Tn(n.crews, s);
  if (n.residual !== null) {
    const d = Tn(n.residual, s), f = n.result;
    return d !== "I" ? f === "safe-pattern" ? { kind: "ghost", letter: d } : f === "logical-failure" ? { kind: "fire", letter: d } : { kind: "residual", letter: d } : l !== "I" || a !== "I" ? f === null ? { kind: "out" } : { kind: "restored" } : { kind: "normal" };
  }
  return l !== "I" ? { kind: "fire", letter: l } : { kind: "normal" };
}
function Ph(n) {
  const s = n.x.some(Boolean), l = n.z.some(Boolean);
  return s && l ? "Y" : s ? "X" : l ? "Z" : null;
}
const ty = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function Nr(n, s) {
  return n(ty[s]);
}
function ny(n) {
  return z.useCallback(
    (s, l) => {
      const a = s.key === "ArrowLeft" ? [-1, 0] : s.key === "ArrowRight" ? [1, 0] : s.key === "ArrowUp" ? [0, -1] : s.key === "ArrowDown" ? [0, 1] : null;
      if (a === null) return;
      s.preventDefault();
      const d = n[l];
      if (d === void 0) return;
      let f = -1, p = 1 / 0;
      if (n.forEach((g, b) => {
        if (b === l) return;
        const S = g.x - d.x, v = g.y - d.y, E = S * (a[0] ?? 0) + v * (a[1] ?? 0), I = Math.abs(S * (a[1] ?? 0)) + Math.abs(v * (a[0] ?? 0));
        if (E <= 1) return;
        const $ = E + I * 2.5;
        $ < p && (p = $, f = b);
      }), f < 0) return;
      s.currentTarget.closest("[data-scene]")?.querySelector(`[data-q="${String(f)}"]`)?.focus();
    },
    [n]
  );
}
function Ps(n) {
  const s = je(), l = n.sceneKind ?? H1(n.codeId, n.circuit), a = z.useMemo(() => Q1(l, n.codeId), [l, n.codeId]), d = Fe(n.codeId), f = n.fog ?? !1, p = n.frame, x = n.circuit.length, g = n.gateCursor ?? x, b = g >= x, S = z.useMemo(() => Array.from({ length: a.n }, (Y, q) => n.houseVariants?.[q] ?? q1(l, q)), [a.n, l, n.houseVariants]), v = n.outcome?.result ?? null, E = z.useMemo(
    () => Array.from(
      { length: a.n },
      (Y, q) => p !== void 0 ? p.houses[q] ?? { kind: "normal" } : ey({ fog: f, fires: n.fires, crews: n.crews, residual: n.residual, result: v, atOutput: b }, q)
    ),
    [a.n, p, f, n.fires, n.crews, n.residual, v, b]
  ), I = p !== void 0 ? p.syndrome : n.syndrome, $ = (Y) => I !== null && (I[Y] ?? 0) === 1, R = n.highlightedCheck ?? null, L = R === null ? [] : d.checks[R]?.qubits ?? [], F = z.useMemo(() => a.houses.map((Y) => ({ x: Y.x, y: Y.y - 30 })), [a]), X = ny(F), _ = n.outcome !== void 0 && n.outcome.result === "logical-failure" ? Ph(n.outcome.logicalFlip) : null, U = n.outcome?.beacon === !0 && a.tower !== null, re = n.outcome?.result === "logical-failure" ? n.outcome.patternQubits : [], ne = (p?.outcome ?? v) === "safe-pattern", W = (Y) => n.placements?.[Y] ?? null, te = (Y) => p !== void 0 ? null : W(Y) ?? Oh(Tn(n.crews, Y)), we = n.ariaLabel ?? (a.lanes !== null ? s("a11y.boardCircuit") : s("a11y.boardGrid", { code: d.name }));
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: ["scene", `scene-${l}`, `scene-code-${n.codeId}`, n.className ?? ""].filter(Boolean).join(" "),
      style: { aspectRatio: `${String(a.width)} / ${String(a.height)}` },
      role: "group",
      "aria-label": we,
      "aria-describedby": n.ariaDescribedBy,
      "data-board": !0,
      "data-scene": !0,
      "data-scene-kind": l,
      children: [
        /* @__PURE__ */ i.jsxs("svg", { className: "scene-svg", viewBox: `0 0 ${String(a.width)} ${String(a.height)}`, "aria-hidden": "true", focusable: "false", children: [
          a.lanes !== null ? l === "lab" ? /* @__PURE__ */ i.jsx(Kg, { geometry: a.lanes }) : /* @__PURE__ */ i.jsx(Vg, { geometry: a.lanes }) : /* @__PURE__ */ i.jsx(Hg, { layout: l === "grid" ? wh : kh }),
          a.lanes !== null ? /* @__PURE__ */ i.jsx(sy, { geo: a, circuit: n.circuit, cursor: g, fires: p !== void 0 ? null : n.fires, inputFires: n.inputFires ?? null }) : null,
          L.map((Y) => {
            const q = a.houses[Y];
            return q === void 0 ? null : /* @__PURE__ */ i.jsx("g", { className: "watch-tint", "data-watch-q": Y, children: /* @__PURE__ */ i.jsx(Yg, { x: q.x, y: q.y }) }, `tint-${String(Y)}`);
          }),
          p?.truck !== null && p?.truck !== void 0 ? /* @__PURE__ */ i.jsx(ly, { geo: a, progress: p.truck.progress, lights: p.truck.lights, wheelFrame: p.truck.wheelFrame }) : null,
          re.length > 0 ? /* @__PURE__ */ i.jsx(Lf, { geo: a, qubits: re, variants: S, part: "connector" }) : null,
          a.houses.map((Y, q) => /* @__PURE__ */ i.jsx("g", { className: `house house-${E[q]?.kind ?? "normal"}`, "data-house": q, "data-house-state": E[q]?.kind ?? "normal", children: /* @__PURE__ */ i.jsx(He, { x: Y.x, y: Y.y, tint: q, variant: S[q] ?? "small", state: E[q] ?? { kind: "normal" }, scale: a.houseScale }) }, `house-${String(q)}`)),
          re.length > 0 ? /* @__PURE__ */ i.jsx(Lf, { geo: a, qubits: re, variants: S, part: "outline" }) : null,
          a.houses.map((Y, q) => {
            const he = te(q);
            if (he === null) return null;
            const ve = ba(a, q), be = W(q) !== null;
            return /* @__PURE__ */ i.jsxs("g", { className: be ? "crew-marker crew-planned" : "crew-marker", "data-crew-q": q, "data-crew": he, children: [
              /* @__PURE__ */ i.jsx(oh, { letter: he, pose: "idle", facing: ve.facing, x: ve.x, y: ve.y, scale: a.crewScale }),
              be ? /* @__PURE__ */ i.jsx(Ma, { letter: he, x: Y.x - (tl[S[q] ?? "small"].w / 2 - 4) * a.houseScale, y: Y.y - (tl[S[q] ?? "small"].h + 2) * a.houseScale, scale: 0.45 }) : null
            ] }, `crew-${String(q)}`);
          }),
          p !== void 0 ? /* @__PURE__ */ i.jsx(oy, { geo: a, frame: p, variants: S }) : null,
          R !== null && a.detectors[R] !== void 0 ? /* @__PURE__ */ i.jsx("g", { className: "watch-lines", children: /* @__PURE__ */ i.jsx(Ug, { from: a.detectors[R].lamp, to: L.map((Y) => a.houses[Y]).filter((Y) => Y !== void 0) }) }) : null,
          a.detectors.map((Y, q) => /* @__PURE__ */ i.jsx("g", { className: `detector${$(q) ? " is-ringing" : ""}${R === q ? " is-highlighted" : ""}`, "data-detector": Y.id, "data-ringing": $(q) ? "true" : "false", children: /* @__PURE__ */ i.jsx(bs, { type: Y.type, x: Y.x, y: Y.y, ringing: $(q), highlighted: R === q, scale: a.detectorScale }) }, Y.id)),
          U && a.tower !== null ? /* @__PURE__ */ i.jsx("g", { className: "memory-tower", "data-anomaly": _ ?? "none", children: /* @__PURE__ */ i.jsx(ll, { x: a.tower.x, y: a.tower.y, scale: a.tower.scale, anomaly: _, lit: _ === null }) }) : null,
          n.children
        ] }),
        a.houses.map((Y, q) => {
          const he = Rh(a, q, S[q] ?? "small"), ve = {
            left: `${String(he.x / a.width * 100)}%`,
            top: `${String(he.y / a.height * 100)}%`,
            width: `${String(he.w / a.width * 100)}%`,
            height: `${String(he.h / a.height * 100)}%`
          };
          return /* @__PURE__ */ i.jsx("div", { className: "house-slot", style: ve, children: /* @__PURE__ */ i.jsx(
            ry,
            {
              q,
              state: E[q] ?? { kind: "normal" },
              fog: f,
              crew: te(q),
              interactive: n.interactive,
              selected: n.selected,
              budgetReached: n.budgetReached ?? !1,
              watchers: f ? [] : d.checks.filter((be) => be.qubits.includes(q)).map((be) => be.id),
              onToggle: n.onToggle,
              onKeyDown: X,
              tapHint: n.tapHint,
              t: s
            }
          ) }, `slot-${String(q)}`);
        }),
        a.detectors.map((Y, q) => {
          const he = d.checks[q];
          if (he === void 0) return null;
          const ve = 16 * a.detectorScale + 10, be = {
            left: `${String((Y.lamp.x - ve) / a.width * 100)}%`,
            top: `${String((Y.lamp.y - ve) / a.height * 100)}%`,
            width: `${String(2 * ve / a.width * 100)}%`,
            height: `${String(2 * ve / a.height * 100)}%`
          }, at = he.qubits.join(", "), Ze = s($(q) ? "a11y.stationRinging" : "a11y.stationQuiet", { station: he.id, list: at });
          if (n.onToggleDetector === void 0)
            return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: be, children: /* @__PURE__ */ i.jsx("div", { className: "detector-hit", role: "img", "aria-label": Ze, "data-detector-id": Y.id }) }, `det-${Y.id}`);
          const Ee = n.onToggleDetector;
          return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: be, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: `detector-hit${R === q ? " is-pressed" : ""}`,
              "aria-label": Ze,
              "aria-pressed": R === q,
              "data-testid": `detector-${Y.id}`,
              "data-detector-id": Y.id,
              onClick: () => Ee(R === q ? null : q)
            }
          ) }, `det-${Y.id}`);
        }),
        ne ? /* @__PURE__ */ i.jsx("span", { className: "scene-badge scene-badge-safe", "data-testid": "badge-safe", children: s("result.outcome.success") }) : null
      ]
    }
  );
}
function ry({ q: n, state: s, fog: l, crew: a, interactive: d, selected: f, budgetReached: p, watchers: x, onToggle: g, onKeyDown: b, tapHint: S, t: v }) {
  const E = [l ? v("a11y.fogHouse", { q: n }) : v("a11y.house", { q: n })];
  if (x.length > 0 && E.push(v("a11y.watchedBy", { list: x.join(", ") })), !l)
    switch (s.kind) {
      case "fire":
        E.push(v("a11y.fire", { crew: Nr(v, s.letter) }));
        break;
      case "residual":
        E.push(v("a11y.residualFire", { crew: Nr(v, s.letter) }));
        break;
      case "ghost":
        E.push(v("a11y.residualFire", { crew: Nr(v, s.letter) }));
        break;
      case "out":
      case "restored":
        E.push(v("a11y.fireOut"));
        break;
    }
  a !== null && E.push(v("a11y.crew", { crew: Nr(v, a) })), d && S !== void 0 ? E.push(S) : d && (a === null ? E.push(p ? v("a11y.noCrewsLeft") : f === void 0 ? v("a11y.pressToSendAny") : v("a11y.pressToSend", { crew: Nr(v, f) })) : a === f ? E.push(v("a11y.pressToRecall")) : E.push(f === void 0 ? v("a11y.pressToSwitchAny") : v("a11y.pressToSwitch", { crew: Nr(v, f) })));
  const I = E.join(", "), $ = ["block", `block-${s.kind}`, a !== null ? "has-crew" : "", p && a === null ? "is-budget-reached" : ""].filter(Boolean).join(" ");
  return d ? /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: $,
      "aria-label": I,
      "aria-pressed": a !== null,
      "data-q": n,
      "data-testid": `block-${String(n)}`,
      onClick: () => g?.(n),
      onKeyDown: (R) => b(R, n),
      children: [
        f !== void 0 && a === null && !p && S === void 0 ? /* @__PURE__ */ i.jsx("span", { className: "crew-preview", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -46 60 50", width: "30", height: "25", focusable: "false", children: /* @__PURE__ */ i.jsx(Ma, { letter: f, x: 0, y: 0 }) }) }) : null,
        a !== null ? /* @__PURE__ */ i.jsx("span", { className: "plan-tag", "aria-hidden": "true", children: v("plan.title") }) : null
      ]
    }
  ) : /* @__PURE__ */ i.jsx("div", { className: $, role: "img", "aria-label": I, "data-q": n, "data-testid": `block-${String(n)}` });
}
function sy({ geo: n, circuit: s, cursor: l, fires: a, inputFires: d }) {
  const f = n.lanes;
  if (f === null) return null;
  const p = s.length, x = l >= p, g = K1(f, l, p), b = (S, v) => Oh(Tn(S, v));
  return /* @__PURE__ */ i.jsxs("g", { className: "lanes", children: [
    s.map((S, v) => /* @__PURE__ */ i.jsx("g", { className: v === l ? "gate is-active" : v < l ? "gate is-done" : "gate", opacity: v <= l ? 1 : 0.6, children: /* @__PURE__ */ i.jsx(iy, { gate: S, x: f.stepX(v, p), laneY: f.laneY, active: v === l }) }, v)),
    x ? null : /* @__PURE__ */ i.jsx("line", { className: "time-cursor", x1: g, y1: 30, x2: g, y2: f.height - 40, stroke: m.alarm, strokeWidth: 2.5, strokeDasharray: "8 6" }),
    Array.from({ length: f.lanes }, (S, v) => {
      const E = b(d, v);
      return E === null ? null : /* @__PURE__ */ i.jsx(yf, { letter: E, x: f.inX, y: f.laneY(v) - 6 }, `in-${String(v)}`);
    }),
    x ? null : Array.from({ length: f.lanes }, (S, v) => {
      const E = b(a, v);
      return E === null ? null : /* @__PURE__ */ i.jsx("g", { className: "token", children: /* @__PURE__ */ i.jsx(yf, { letter: E, x: g, y: f.laneY(v) - 6 }) }, `tok-${String(v)}`);
    })
  ] });
}
function iy({ gate: n, x: s, laneY: l, active: a }) {
  switch (n.kind) {
    case "H":
      return /* @__PURE__ */ i.jsx(dh, { x: s, y: l(n.q) + 24, scale: 0.9, active: a });
    case "S":
      return /* @__PURE__ */ i.jsx(Jg, { x: s, y: l(n.q), active: a });
    case "CNOT":
      return /* @__PURE__ */ i.jsx(Gg, { x: s, controlY: l(n.c), targetY: l(n.t), active: a });
    case "CZ": {
      const d = a ? m.highlight : m.ink;
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("line", { x1: s, y1: l(n.a), x2: s, y2: l(n.b), stroke: d, strokeWidth: J * 2 }),
        /* @__PURE__ */ i.jsx("circle", { cx: s, cy: l(n.a), r: 10, fill: d }),
        /* @__PURE__ */ i.jsx("circle", { cx: s, cy: l(n.b), r: 10, fill: d })
      ] });
    }
    case "SWAP": {
      const d = a ? m.highlight : m.ink, f = (p) => /* @__PURE__ */ i.jsxs("g", { stroke: d, strokeWidth: J * 1.4, children: [
        /* @__PURE__ */ i.jsx("line", { x1: s - 9, y1: p - 9, x2: s + 9, y2: p + 9 }),
        /* @__PURE__ */ i.jsx("line", { x1: s - 9, y1: p + 9, x2: s + 9, y2: p - 9 })
      ] }, p);
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("line", { x1: s, y1: l(n.a), x2: s, y2: l(n.b), stroke: d, strokeWidth: J * 2 }),
        f(l(n.a)),
        f(l(n.b))
      ] });
    }
  }
}
function Lf({ geo: n, qubits: s, variants: l, part: a }) {
  const d = s.map((p) => Rh(n, p, l[p] ?? "small"));
  if (d.length === 0) return null;
  const f = d.map((p) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 }));
  return a === "connector" ? f.length > 1 ? /* @__PURE__ */ i.jsx("polyline", { className: "logical-chain-connector", points: f.map((p) => `${String(p.x)},${String(p.y)}`).join(" "), fill: "none", stroke: m.crewY, strokeWidth: J * 3, strokeDasharray: "12 8", strokeLinejoin: "round", strokeLinecap: "round", opacity: 0.85 }) : null : /* @__PURE__ */ i.jsx("g", { className: "logical-chain", "data-chain": s.join(","), children: d.map((p, x) => /* @__PURE__ */ i.jsx("rect", { x: p.x - 2, y: p.y - 2, width: p.w + 4, height: p.h, rx: 12, fill: "none", stroke: m.crewY, strokeWidth: J * 1.8, strokeDasharray: "10 6" }, x)) });
}
function ly({ geo: n, progress: s, lights: l, wheelFrame: a }) {
  const d = _h(n.truck.from, n.truck.stop, J1(s));
  return /* @__PURE__ */ i.jsx("g", { className: "truck", "data-progress": s.toFixed(2), children: /* @__PURE__ */ i.jsx(ah, { x: d.x, y: d.y, facing: n.truck.facing, lights: l, wheelFrame: a, scale: n.truck.scale }) });
}
function oy({ geo: n, frame: s, variants: l }) {
  const a = { x: n.truck.stop.x + 40 * n.truck.scale, y: n.truck.stop.y };
  return /* @__PURE__ */ i.jsxs("g", { className: "spray-actors", children: [
    s.streams.map((d) => {
      const f = ba(n, d.q), p = Cg(f.x, f.y, n.crewScale, f.facing);
      return /* @__PURE__ */ i.jsx("g", { className: "stream", "data-stream-q": d.q, "data-progress": d.progress.toFixed(2), children: /* @__PURE__ */ i.jsx(bg, { from: p, to: ha(n, d.q, l[d.q] ?? "small"), progress: d.progress }) }, `stream-${String(d.q)}`);
    }),
    s.splashes.map((d) => /* @__PURE__ */ i.jsx("g", { className: "splash", "data-splash-q": d.q, children: /* @__PURE__ */ i.jsx(Ng, { x: ha(n, d.q, l[d.q] ?? "small").x, y: ha(n, d.q, l[d.q] ?? "small").y + 10, spread: d.spread, scale: 0.8 }) }, `splash-${String(d.q)}`)),
    s.crews.map((d) => {
      const f = ba(n, d.q), p = _h(a, f, d.progress), x = d.progress < 1 ? f.x >= a.x ? 1 : -1 : f.facing;
      return /* @__PURE__ */ i.jsx("g", { className: `firefighter pose-${d.pose}`, "data-crew-q": d.q, "data-crew": d.crew, "data-pose": d.pose, children: /* @__PURE__ */ i.jsx(oh, { letter: d.crew, pose: d.pose, facing: x, x: p.x, y: p.y, scale: n.crewScale }) }, `ff-${String(d.q)}`);
    })
  ] });
}
function $h(n, s, l = !1) {
  if (l ? n.t >= s : n.t > s) return;
  if (n.dur <= 0) return 1;
  const a = (s - n.t) / n.dur;
  return a >= 1 ? 1 : a < 0 ? 0 : a;
}
function pa(n) {
  return n === "I" ? { kind: "normal" } : { kind: "fire", letter: n };
}
const Mh = 0.4;
function ay(n, s, l) {
  const a = l.strict ?? !1, d = Array.from({ length: l.n }, (_, U) => l.preState(U)), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), g = [], b = [];
  let S = null, v = null, E = null, I = !1, $ = !1, R = -1;
  const L = /* @__PURE__ */ new Set(), F = Math.floor(s / 120) % 2 === 0 ? 0 : 1, X = Math.floor(s / 150) % 2 === 0 ? "run1" : "run2";
  return n.events.forEach((_, U) => {
    const re = $h(_, s, a);
    if (re !== void 0)
      switch (R = U, _.type) {
        case "trucks-arrive":
          S = { progress: re, lights: re < 1, wheelFrame: re < 1 ? F : 0 };
          break;
        case "crew-run":
          x.set(_.q, { q: _.q, crew: _.crew, progress: re, pose: re < 1 ? X : "idle" });
          break;
        case "spray-start":
          x.set(_.q, { q: _.q, crew: _.crew, progress: 1, pose: "spray" }), g.push({ q: _.q, progress: re });
          break;
        case "impact": {
          f.add(_.q);
          const ne = g.findIndex((W) => W.q === _.q);
          re < 1 ? (ne >= 0 && (g[ne] = { q: _.q, progress: 1 }), b.push({ q: _.q, spread: re })) : (ne >= 0 && g.splice(ne, 1), L.add(_.q)), re < Mh ? d[_.q] = pa(_.before) : _.effect === "extinguished" ? d[_.q] = re < 1 ? { kind: "out" } : { kind: "restored" } : d[_.q] = pa(_.after), _.after !== "I" ? p.set(_.q, _.after) : p.delete(_.q);
          break;
        }
        case "reveal-remaining":
          I = !0;
          for (let ne = 0; ne < l.n; ne++) {
            if (f.has(ne)) continue;
            const W = l.preState(ne);
            d[ne] = W.kind === "fog" ? { kind: "normal" } : W;
          }
          _.qs.forEach((ne) => {
            const W = l.residualAt(ne);
            d[ne] = pa(W), W !== "I" && p.set(ne, W);
          });
          break;
        case "alarms":
          v = _.syndrome;
          break;
        case "outcome":
          E = _.result, p.forEach((ne, W) => {
            ne !== "I" && (_.result === "still-burning" ? d[W] = { kind: "residual", letter: ne } : _.result === "safe-pattern" ? d[W] = { kind: "ghost", letter: ne } : d[W] = { kind: "fire", letter: ne });
          }), _.result === "restored" && f.forEach((ne) => d[ne] = { kind: "restored" });
          break;
        case "done":
          $ = !0;
          break;
      }
  }), L.forEach((_) => {
    const U = x.get(_);
    U !== void 0 && x.set(_, { ...U, pose: "idle" });
  }), {
    houses: d,
    syndrome: v,
    truck: S,
    crews: [...x.values()].sort((_, U) => _.q - U.q),
    streams: g,
    splashes: b,
    outcome: E,
    revealed: I,
    done: $,
    residualQubits: [...p.keys()].sort((_, U) => _ - U),
    currentEvent: R
  };
}
const cy = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function js(n, s) {
  return s === "I" ? "" : n(cy[s]);
}
const Dh = {
  restored: "result.type.restored.title",
  "safe-pattern": "result.type.safePattern.title",
  "still-burning": "result.type.stillBurning.title",
  "logical-failure": "result.type.logicalFailure.title"
}, uy = {
  restored: "result.type.restored.body",
  "safe-pattern": "result.type.safePattern.body",
  "still-burning": "result.type.stillBurning.body",
  "logical-failure": "result.type.logicalFailure.body"
};
function dy(n, s, l, a) {
  switch (s.type) {
    case "trucks-arrive":
      return n("spray.trucksArrive", { district: a.district });
    case "crew-run":
      return n("spray.crewRun", { crew: js(n, s.crew), q: s.q });
    case "spray-start":
      return n("spray.sprayStart", { crew: js(n, s.crew), q: s.q });
    case "impact":
      return l < Mh ? n("spray.splash") : s.effect === "extinguished" ? n("spray.extinguished", { q: s.q }) : s.effect === "ignited" ? n("spray.ignited", { q: s.q, after: js(n, s.after) }) : n("spray.changed", { q: s.q, before: js(n, s.before), after: js(n, s.after) });
    case "reveal-remaining":
      return s.qs.length > 0 ? n("spray.revealRemaining") : null;
    case "alarms":
      return a.hasChecks ? n("spray.alarms") : null;
    case "outcome":
      return n(Dh[s.result]);
    case "done":
      return n("spray.done");
  }
}
function Na(n, s, l, a, d = !1) {
  let f = "";
  for (const p of s.events) {
    const x = $h(p, l, d);
    if (x === void 0) break;
    const g = dy(n, p, x, a);
    g !== null && (f = g);
  }
  return f;
}
function fy(n, s) {
  if (s !== void 0) return s;
  try {
    return In(n).kind;
  } catch {
    return "dispatch";
  }
}
function hy(n, s, l) {
  const a = Ae(n.fires), d = Ae(n.residual), f = (p) => {
    if (l === "dispatch") return { kind: "fog" };
    const x = Tn(n.fires, p);
    return x === "I" ? { kind: "normal" } : { kind: "fire", letter: x };
  };
  return { n: Math.max(s, a.n, d.n), preState: f, residualAt: (p) => Tn(n.residual, p) };
}
function py(n, s) {
  if (s.outcome === null) return;
  const l = Rs(n.missionId)?.hasBeacon ?? !1;
  return {
    result: s.outcome,
    logicalFlip: n.logicalFlip,
    patternQubits: Ht(Ae(n.residual)),
    beacon: l || s.outcome === "logical-failure"
  };
}
function my(n) {
  const s = Ae(n), l = {};
  for (let a = 0; a < s.n; a++) {
    const d = Dt(s, a);
    Df(d) && (l[a] = d);
  }
  return l;
}
function Ah(n) {
  const s = Ae(n.debrief.fires).n, l = fy(n.debrief.missionId, n.missionKind), a = z.useMemo(() => hy(n.debrief, s, l), [n.debrief, s, l]), d = z.useMemo(() => ay(n.timeline, n.time, { ...a, strict: n.strict ?? !1 }), [n.timeline, n.time, a, n.strict]), f = py(n.debrief, d), p = n.codeId === "trivial2" || n.codeId === "trivial3";
  return /* @__PURE__ */ i.jsx(
    Ps,
    {
      codeId: n.codeId,
      circuit: n.circuit,
      sceneKind: n.sceneKind,
      fires: n.debrief.fires,
      crews: null,
      residual: null,
      syndrome: d.syndrome,
      interactive: !1,
      gateCursor: p ? n.circuit.length : void 0,
      inputFires: p ? n.debrief.startFires : null,
      frame: d,
      outcome: f,
      ariaLabel: n.ariaLabel,
      ariaDescribedBy: n.ariaDescribedBy,
      className: n.className
    }
  );
}
function Rf() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function _f(n) {
  if (typeof requestAnimationFrame == "function") {
    const l = requestAnimationFrame(n);
    return () => cancelAnimationFrame(l);
  }
  const s = setTimeout(n, 16);
  return () => clearTimeout(s);
}
function Fh(n, s) {
  const l = n.durationMs, a = Math.max(1, n.events.length), [d, f] = z.useState(0), [p, x] = z.useState(0), [g, b] = z.useState(0), S = z.useRef(!1);
  z.useEffect(() => {
    if (s) return;
    S.current = !1;
    const F = Rf();
    let X = null, _ = !0;
    const U = () => {
      if (!_ || S.current) return;
      const re = Rf() - F;
      if (re >= l) {
        f(l);
        return;
      }
      f(re), X = _f(U);
    };
    return X = _f(U), () => {
      _ = !1, X?.();
    };
  }, [l, s, g]);
  const v = z.useCallback(() => {
    S.current = !0, f(l), x(a - 1);
  }, [l, a]), E = z.useCallback(() => {
    S.current = !1, f(0), x(0), b((F) => F + 1);
  }, []), I = z.useCallback(() => x((F) => Math.min(a - 1, F + 1)), [a]), $ = z.useCallback(() => x((F) => Math.max(0, F - 1)), []);
  if (s) {
    const F = Math.min(p, a - 1);
    return { time: F + 1, step: F, steps: a, finished: F >= a - 1, skip: v, restart: E, next: I, prev: $ };
  }
  const R = Math.min(d, l);
  let L = -1;
  return n.events.forEach((F, X) => {
    F.t <= R && (L = X);
  }), { time: R, step: L, steps: a, finished: R >= l, skip: v, restart: E, next: I, prev: $ };
}
function gy(n) {
  const s = je(), l = Fh(n.timeline, n.reducedMotion), a = z.useRef(!1), d = n.onDone;
  z.useEffect(() => {
    l.finished && !a.current && (a.current = !0, d());
  }, [l.finished, d]);
  const f = Fe(n.codeId).checks.length > 0, p = Na(s, n.timeline, l.time, { district: n.missionCopy.districtName, hasChecks: f }, n.reducedMotion), x = s("motion.stepper.frame", { n: l.step + 1, total: l.steps });
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: `spray-player${n.compact === !0 ? " spray-compact" : ""}`,
      "aria-label": s("dispatch.aria.player"),
      "data-testid": "spray-player",
      "data-finished": l.finished ? "true" : "false",
      "data-reduced-motion": n.reducedMotion ? "true" : "false",
      children: [
        n.compact === !0 ? null : /* @__PURE__ */ i.jsxs("header", { className: "spray-header", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "spray-title", children: s("dispatch.answerCheck") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost spray-skip", "data-testid": "spray-skip", onClick: l.skip, disabled: l.finished, children: s("dispatch.skip") })
        ] }),
        /* @__PURE__ */ i.jsx(
          Ah,
          {
            codeId: n.codeId,
            circuit: n.circuit,
            sceneKind: n.sceneKind,
            debrief: n.debrief,
            timeline: n.timeline,
            time: l.time,
            strict: n.reducedMotion,
            missionKind: n.missionKind,
            ariaLabel: s("dispatch.aria.player")
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "spray-caption", "aria-live": "polite", "data-testid": "spray-caption", children: p }),
        n.reducedMotion ? /* @__PURE__ */ i.jsxs("div", { className: "spray-stepper", role: "group", "aria-label": s("motion.stepper.title"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "spray-prev", onClick: l.prev, disabled: l.step <= 0, children: s("motion.stepper.prev") }),
          /* @__PURE__ */ i.jsx("span", { className: "spray-step-label", "data-testid": "spray-step", children: x }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "spray-next", onClick: l.next, disabled: l.finished, children: l.step >= l.steps - 2 ? s("motion.stepper.last") : s("motion.stepper.next") })
        ] }) : null,
        n.compact === !0 ? null : /* @__PURE__ */ i.jsx("p", { className: "spray-rules", children: s("spray.quantumRules") })
      ]
    }
  );
}
function yy(n) {
  const s = je(), l = z.useId(), { result: a, debrief: d } = n, f = Ae(d.residual), p = Ht(f), x = a === "logical-failure" ? Ph(d.logicalFlip) : null, g = n.maxStars === 1 ? s("result.starsOf.one", { stars: n.stars }) : s("result.starsOf.other", { stars: n.stars, max: n.maxStars }), b = x === "Y" ? s("result.beacon.logicalXZ") : x === "X" ? s("result.beacon.logicalX") : x === "Z" ? s("result.beacon.logicalZ") : null, S = Tn(d.residual, p[0] ?? 0);
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: `result-overlay result-${a}${n.className === void 0 ? "" : ` ${n.className}`}`,
      "aria-labelledby": l,
      "data-testid": "result-overlay",
      "data-result": a,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "result-head", children: [
          /* @__PURE__ */ i.jsx("span", { className: "result-icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsxs("svg", { viewBox: "-40 -100 80 100", width: "56", height: "70", focusable: "false", children: [
            a === "restored" ? /* @__PURE__ */ i.jsx(lh, { x: 0, y: -20, scale: 1.4 }) : null,
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx(Rr, { letter: S === "I" ? "X" : S, x: 0, y: -4, scale: 0.95, ghost: !0 }) : null,
            a === "still-burning" ? /* @__PURE__ */ i.jsx(Rr, { letter: S === "I" ? "X" : S, x: 0, y: -4, scale: 0.95, residual: !0 }) : null,
            a === "logical-failure" ? /* @__PURE__ */ i.jsx(ll, { x: 0, y: 0, scale: 0.5, anomaly: x }) : null
          ] }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "result-titles", children: [
            /* @__PURE__ */ i.jsx("h2", { id: l, className: "result-title", tabIndex: -1, "data-focus-target": !0, "data-testid": "result-title", children: s(Dh[a]) }),
            /* @__PURE__ */ i.jsxs("p", { className: "result-stars", "data-testid": "result-stars", "aria-label": g, children: [
              /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: Array.from({ length: n.maxStars }, (v, E) => /* @__PURE__ */ i.jsx("span", { className: E < n.stars ? "star star-on" : "star", children: E < n.stars ? "★" : "☆" }, E)) }),
              " ",
              /* @__PURE__ */ i.jsx("span", { className: "result-stars-text", children: g })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "result-reaction", "data-testid": "result-reaction", children: Eh(n.missionCopy, a) }),
        /* @__PURE__ */ i.jsx("p", { className: "result-body", children: s(uy[a]) }),
        b !== null ? /* @__PURE__ */ i.jsxs("p", { className: "result-beacon", "data-testid": "result-beacon", children: [
          /* @__PURE__ */ i.jsx("strong", { children: b }),
          " ",
          s("result.beacon.pattern", { pattern: d.residual })
        ] }) : null,
        /* @__PURE__ */ i.jsx("p", { className: "result-rules", children: s("spray.quantumRules") }),
        /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "result-why", onClick: n.onWhy, children: s("dispatch.why") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "result-retry", onClick: n.onRetry, children: s("result.tryAgain") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "result-next", onClick: n.onNext, children: n.nextLabel })
        ] }),
        /* @__PURE__ */ i.jsxs("details", { className: "result-details", "data-testid": "result-details", children: [
          /* @__PURE__ */ i.jsx("summary", { children: s("details.show") }),
          /* @__PURE__ */ i.jsxs("div", { className: "result-details-body", children: [
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx("p", { children: s("result.type.safePattern.details", { residual: d.residual }) }) : null,
            n.children
          ] })
        ] })
      ]
    }
  );
}
function xy(n, s) {
  return n.durationMs >= s.durationMs ? n : s;
}
const wy = { success: "result.outcome.success", "logical-error": "result.outcome.logicalError", detectable: "result.outcome.detectable" };
function ky(n) {
  const s = je(), { mine: l, alternative: a } = n, d = z.useMemo(() => nh(l.missionId, my(a.crews)), [l.missionId, a.crews]), f = z.useMemo(() => wa(l, n.reducedMotion), [l, n.reducedMotion]), p = z.useMemo(() => wa(d, n.reducedMotion), [d, n.reducedMotion]), x = xy(f, p), g = Fh(x, n.reducedMotion), b = Fe(n.codeId).checks.length > 0, S = { district: n.missionCopy.districtName, hasChecks: b }, v = Na(s, f, g.time, S, n.reducedMotion), E = Na(s, p, g.time, S, n.reducedMotion), I = l.verdict === "success" && d.verdict === "success" || l.whatIf.equivalentToDecoder && a.crews === l.whatIf.decoderCrews, $ = l.syndromeOfFires.join("") === d.syndromeOfFires.join(""), R = I ? s("why.equivalent") : l.verdict !== d.verdict && $ ? `${s("why.sameAlarms")} ${s("why.cannotDecide")}` : n.missionCopy.whyShort, L = (F, X, _, U, re) => /* @__PURE__ */ i.jsxs("div", { className: "why-pane", "data-testid": re, children: [
    /* @__PURE__ */ i.jsx("h3", { className: "why-pane-title", children: F }),
    /* @__PURE__ */ i.jsx(Ah, { codeId: n.codeId, circuit: n.circuit, sceneKind: n.sceneKind, debrief: X, timeline: _, time: g.time, strict: n.reducedMotion, ariaLabel: F }),
    /* @__PURE__ */ i.jsx("p", { className: "why-caption", "aria-live": "polite", children: U }),
    /* @__PURE__ */ i.jsx("p", { className: "why-verdict", children: s("why.verdict", { verdict: s(wy[X.verdict]) }) })
  ] });
  return /* @__PURE__ */ i.jsxs("section", { className: "why-compare", "aria-label": s("why.title"), "data-testid": "why-compare", "data-finished": g.finished ? "true" : "false", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "why-panes", children: [
      L(s("why.yours"), l, f, v, "why-mine"),
      L(`${s("why.alternative")} · ${a.label}`, d, p, E, "why-alt")
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "why-explanation", "data-testid": "why-explanation", children: R }),
    l.verdict === "logical-error" && d.verdict !== l.verdict ? /* @__PURE__ */ i.jsx("p", { className: "why-noblame", children: s("why.noBlame") }) : null,
    /* @__PURE__ */ i.jsx("div", { className: "why-controls", role: "group", "aria-label": s("why.title"), children: n.reducedMotion ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "why-prev", onClick: g.prev, disabled: g.step <= 0, children: s("motion.stepper.prev") }),
      /* @__PURE__ */ i.jsx("span", { className: "spray-step-label", children: s("motion.stepper.frame", { n: g.step + 1, total: g.steps }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "why-next", onClick: g.next, disabled: g.finished, children: s("motion.stepper.next") })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "why-skip", onClick: g.skip, disabled: g.finished, children: s("dispatch.skip") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "why-replay", onClick: g.restart, children: s("why.replayBoth") })
    ] }) })
  ] });
}
const vy = { "local-simulator": "cloud.source.local", "cached-cloud": "cloud.source.cached", "live-cloud": "cloud.source.live" };
function jy({ state: n, dispatch: s, mission: l }) {
  const a = je(), d = Ft(), f = l.training[n.lesson], p = z.useId(), [x, g] = z.useState(null), b = At(l.id, d);
  if (f === void 0) return null;
  const S = Fe(l.code), v = Ae(f.fire), E = Ia(v, f.circuit), I = n.lessonCursor, $ = E.frames[I + 1] ?? v, R = _e($), L = f.circuit.length > 0 || S.checks.length === 0, F = S.checks.length > 0 ? En(Lr(S, $)) : null, X = l.training.length, _ = I >= f.circuit.length - 1, U = n.lesson === X - 1, re = f.circuit.length > 0 && !_, ne = a(_ ? U ? "training.startDispatch" : "training.nextLesson" : "training.nextStep"), W = (Y) => {
    re && (g({ lesson: n.lesson, cursor: I + 1, q: Y }), s({ type: "LESSON_NEXT" }));
  }, te = x !== null && x.lesson === n.lesson && x.cursor === I ? Dt($, x.q) !== "I" ? a("training.predict.hit", { q: x.q }) : a("training.predict.miss", { q: x.q }) : null, we = m1(l.id, n.lesson, d, f.caption);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-training", children: [
    /* @__PURE__ */ i.jsx(
      nn,
      {
        title: b.districtName,
        subtitle: a("training.subtitle", { n: n.lesson + 1, total: X }),
        onMissions: () => s({ type: "OPEN_MISSIONS" }),
        onSettings: () => s({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": a("training.boardLabel"), children: [
        /* @__PURE__ */ i.jsx(
          Ps,
          {
            codeId: l.code,
            circuit: f.circuit,
            fires: R,
            crews: null,
            residual: null,
            syndrome: F,
            interactive: re,
            onToggle: W,
            tapHint: a("a11y.pressToPredict"),
            gateCursor: L ? I : void 0,
            inputFires: L ? f.fire : null,
            ariaDescribedBy: p,
            ariaLabel: a("training.board")
          }
        ),
        re ? /* @__PURE__ */ i.jsxs("p", { className: "predict-prompt", "data-testid": "predict-prompt", role: "status", children: [
          /* @__PURE__ */ i.jsx("strong", { children: a("training.predictTap") }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "muted", children: a("training.predict.waiting") })
        ] }) : null,
        te !== null ? /* @__PURE__ */ i.jsx("p", { className: "predict-reaction", "data-testid": "predict-reaction", role: "status", children: te }) : null,
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: p, "aria-live": "polite", "data-testid": "training-caption", children: [
          f.circuit.length > 0 ? /* @__PURE__ */ i.jsxs("strong", { className: "mono-lead", children: [
            I < 0 ? a("training.start") : a("training.afterGate", { n: I + 1, total: f.circuit.length }),
            " ",
            /* @__PURE__ */ i.jsx("span", { className: "mono", children: R })
          ] }) : null,
          " ",
          we
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", children: [
        S.checks.length > 0 ? /* @__PURE__ */ i.jsx(al, { codeId: l.code, syndrome: F }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("training.lesson") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: b.lessonOneLiner }),
          /* @__PURE__ */ i.jsx("ol", { className: "lesson-dots", "aria-label": a("training.lessons"), children: l.training.map((Y, q) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${q === n.lesson ? " is-current" : ""}`, "aria-current": q === n.lesson ? "step" : void 0, onClick: () => s({ type: "LESSON_SELECT", lesson: q }), "aria-label": a("training.lessonLabel", { n: q + 1, fires: M1(a, Y.fire) }), children: q + 1 }) }, q)) }),
          /* @__PURE__ */ i.jsx(Lh, { allowed: l.allowed, alarms: S.checks.length > 0 })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => s({ type: "LESSON_PREV" }), disabled: n.lesson === 0 && I <= -1, "data-testid": "training-prev", children: a("training.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => s({ type: "LESSON_NEXT" }), disabled: re, "aria-disabled": re, "data-testid": "training-next", children: ne }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "start-challenge", children: a("training.skip") })
        ] })
      ] })
    ] })
  ] });
}
function ma({ step: n, current: s, title: l, body: a }) {
  const d = n < s, f = n === s;
  return /* @__PURE__ */ i.jsxs("div", { className: `callout${f ? " is-active" : ""}${d ? " is-done" : ""}`, "data-testid": `tutorial-callout-${String(n)}`, "data-active": f ? "true" : "false", "data-done": d ? "true" : "false", "aria-current": f ? "step" : void 0, children: [
    /* @__PURE__ */ i.jsx("span", { className: "callout-n", "aria-hidden": "true", children: d ? "✓" : n }),
    /* @__PURE__ */ i.jsxs("span", { className: "callout-text", children: [
      /* @__PURE__ */ i.jsx("strong", { children: l }),
      " ",
      /* @__PURE__ */ i.jsx("span", { children: a })
    ] })
  ] });
}
function Sy({ mission: n, placements: s, selected: l, standDownDialog: a, highlightedCheck: d, canUndo: f, canRedo: p, tutorialActive: x, dispatch: g }) {
  const b = je(), S = Ft(), v = z.useId(), E = z.useRef(null), I = At(n.id, S), $ = Tr(s), R = $ >= n.budget, L = n.kind === "propagation", F = L ? null : n.syndrome, [X, _] = z.useState(!1), U = X ? $ === 0 ? 2 : 3 : 1;
  z.useEffect(() => {
    const W = (te) => {
      if (a || te.metaKey || te.ctrlKey || te.altKey) return;
      const we = te.target instanceof HTMLElement ? te.target : null, Y = E.current;
      if (we === null || Y === null || !Y.contains(we) || we.tagName === "INPUT" || we.tagName === "TEXTAREA") return;
      const he = { 1: "X", 2: "Z", 3: "Y" }[te.key];
      if (he !== void 0) {
        n.allowed.includes(he) && (g({ type: "SELECT_LETTER", letter: he }), _(!0)), te.preventDefault();
        return;
      }
      if (te.key === "Backspace" || te.key === "Delete") {
        const ve = we.closest("button.block[data-q]"), be = ve === null ? NaN : Number(ve.dataset.q);
        Number.isInteger(be) ? g({ type: "RECALL_BLOCK", qubit: be }) : g({ type: "CLEAR_CREWS" }), te.preventDefault();
        return;
      }
      (te.key === "c" || te.key === "C") && (g({ type: "CONFIRM" }), te.preventDefault());
    };
    return document.addEventListener("keydown", W), () => document.removeEventListener("keydown", W);
  }, [g, n.allowed, a]);
  const re = n.visibleStart === null ? [] : Array.from(n.visibleStart).map((W, te) => ({ q: te, l: W })).filter((W) => W.l !== "I"), ne = Object.entries(s).sort(([W], [te]) => Number(W) - Number(te));
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-play screen-challenge${x ? " is-tutorial" : ""}`, ref: E, "data-tutorial": x ? "true" : "false", children: [
    /* @__PURE__ */ i.jsx(
      nn,
      {
        title: I.districtName,
        subtitle: b(L ? "challenge.subtitle.predict" : "challenge.subtitle.dispatch"),
        onMissions: () => g({ type: "OPEN_MISSIONS" }),
        onSettings: () => g({ type: "OPEN_SETTINGS" })
      }
    ),
    x ? /* @__PURE__ */ i.jsxs("div", { className: "tutorial-bar", "data-testid": "tutorial-bar", children: [
      /* @__PURE__ */ i.jsxs("p", { className: "tutorial-intro", children: [
        /* @__PURE__ */ i.jsx("strong", { children: b("tutorial.title") }),
        " ",
        b("tutorial.intro")
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: () => g({ type: "TUTORIAL_SKIP" }), "data-testid": "tutorial-skip", children: b("tutorial.skip") })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: "play-layout play-layout-challenge", children: [
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-before", children: [
        L ? null : /* @__PURE__ */ i.jsx(al, { codeId: n.code, syndrome: F, compact: Fe(n.code).checks.length > 4, hint: b("challenge.detector.hint") }),
        /* @__PURE__ */ i.jsx(
          z1,
          {
            allowed: n.allowed,
            selected: l,
            onSelect: (W) => {
              g({ type: "SELECT_LETTER", letter: W }), _(!0);
            },
            callout: x ? /* @__PURE__ */ i.jsx(ma, { step: 1, current: U, title: b("tutorial.step1"), body: b("tutorial.step1.body") }) : void 0
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": b("challenge.board"), children: [
        x ? /* @__PURE__ */ i.jsx(ma, { step: 2, current: U, title: b("tutorial.step2"), body: b("tutorial.step2.body") }) : null,
        /* @__PURE__ */ i.jsx(
          Ps,
          {
            codeId: n.code,
            circuit: n.circuit,
            fires: null,
            crews: null,
            placements: s,
            residual: null,
            syndrome: F,
            fog: !L,
            interactive: !0,
            onToggle: (W) => g({ type: "TOGGLE_BLOCK", qubit: W }),
            selected: l,
            budgetReached: R,
            highlightedCheck: d,
            onToggleDetector: L ? void 0 : (W) => g({ type: "TOGGLE_DETECTOR_HIGHLIGHT", checkIndex: W }),
            gateCursor: L ? n.circuit.length : void 0,
            inputFires: L ? n.visibleStart : null,
            ariaDescribedBy: v
          }
        ),
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: v, children: [
          L ? b("challenge.startingFire", { fires: re.map((W) => b("challenge.startToken", { letter: W.l, q: W.q })).join(", ") }) : `${b("challenge.fog")} ${Ba(b, n.code, F)}`,
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "muted", children: b("challenge.tapHint") })
        ] }),
        !L && d !== null ? /* @__PURE__ */ i.jsx("p", { className: "muted small", "data-testid": "detector-watch", children: b("challenge.detector.watches", { station: Fe(n.code).checks[d]?.id ?? "", list: (Fe(n.code).checks[d]?.qubits ?? []).join(", ") }) }) : null
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-after", children: [
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section plan", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: b("plan.title") }),
          /* @__PURE__ */ i.jsxs("p", { className: "budget", "data-testid": "budget", "aria-live": "polite", children: [
            b("challenge.crews", { used: $, budget: n.budget }),
            R ? /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
              " · ",
              b("challenge.budgetReached")
            ] }) : null
          ] }),
          /* @__PURE__ */ i.jsxs("ul", { className: "placement-list", "aria-label": b("challenge.placed"), children: [
            ne.map(([W, te]) => /* @__PURE__ */ i.jsxs("li", { children: [
              /* @__PURE__ */ i.jsx(Gn, { letter: te, size: 22 }),
              " ",
              b("challenge.placement", { letter: te, q: W })
            ] }, W)),
            $ === 0 ? /* @__PURE__ */ i.jsx("li", { className: "muted", children: b("plan.empty") }) : null
          ] }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: b("plan.hint") }),
          /* @__PURE__ */ i.jsxs("div", { className: "plan-tools", children: [
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => g({ type: "REDO_PLACEMENT" }), disabled: !p, "data-testid": "redo", children: b("plan.redo") }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => g({ type: "CLEAR_CREWS" }), disabled: $ === 0, "data-testid": "clear", children: b("plan.clear") })
          ] })
        ] }),
        x ? /* @__PURE__ */ i.jsx(ma, { step: 3, current: U, title: b("tutorial.step3"), body: b("tutorial.step3.body") }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: "actions action-bar", "data-testid": "action-bar", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => g({ type: "UNDO_PLACEMENT" }), disabled: !f, "data-testid": "undo", children: b("plan.undo") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-spray", onClick: () => g({ type: "CONFIRM" }), "data-testid": "confirm", children: b("challenge.spray") })
        ] })
      ] })
    ] }),
    a ? /* @__PURE__ */ i.jsx(Ih, { title: b("challenge.standDown.title"), confirmLabel: b("challenge.standDown.confirm"), cancelLabel: b("challenge.standDown.cancel"), onConfirm: () => g({ type: "STAND_DOWN_CONFIRM" }), onCancel: () => g({ type: "STAND_DOWN_CANCEL" }), children: /* @__PURE__ */ i.jsx("p", { children: b("challenge.standDown.body") }) }) : null
  ] });
}
function zh(n) {
  const s = il(n), l = Rs(n.missionId)?.hasBeacon ?? !1;
  return { result: s, logicalFlip: n.logicalFlip, patternQubits: pg(n), beacon: l || s === "logical-failure" };
}
function by({ state: n, mission: s, debrief: l, bridge: a, children: d }) {
  const f = je(), p = Ft(), x = Fe(s.code), g = l.score;
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("dl", { className: "facts", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("details.rawResidual") }),
        /* @__PURE__ */ i.jsx("dd", { className: "mono", "data-testid": "residual", children: l.residual })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("debrief.yourCrews") }),
        /* @__PURE__ */ i.jsx("dd", { className: "mono", children: l.crews })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("details.syndrome") }),
        /* @__PURE__ */ i.jsx("dd", { className: "mono", "data-testid": "residual-syndrome", children: x.checks.length === 0 ? f("alarms.summary.none") : l.syndromeOfResidual.join("") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.decision") }),
        /* @__PURE__ */ i.jsxs("dd", { "data-testid": "decision", children: [
          f(Wa[g.quality]),
          " · ",
          /* @__PURE__ */ i.jsx(Os, { count: g.stars, max: g.maxStars, size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.outcome") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "verdict-label", children: f(ol(g.outcome, x.checks.length > 0)) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.cost") }),
        /* @__PURE__ */ i.jsx("dd", { children: g.crewsUsed === 1 ? f("result.costText.one", { min: g.minCrews }) : f("result.costText.other", { used: g.crewsUsed, min: g.minCrews }) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.attempts") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "attempts", children: n.progress[s.id]?.attempts ?? 1 })
      ] })
    ] }),
    x.checks.length > 0 ? /* @__PURE__ */ i.jsx(al, { codeId: s.code, syndrome: l.syndromeOfResidual, compact: !0 }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: Nh(s.id, l.verdict, p, l.narrative) }),
    d,
    /* @__PURE__ */ i.jsx(Xh, { bridge: a, missionId: s.id, correction: l.crews }, `${s.id}:${l.crews}`)
  ] });
}
function Ny(n) {
  const { state: s, dispatch: l, mission: a, debrief: d, reducedMotion: f } = n, p = je(), x = Ft(), g = At(a.id, x), b = z.useMemo(() => wa(d, f), [d, f]), S = z.useCallback(() => l({ type: "DISPATCH_DONE" }), [l]), v = a.index === Ln().length, E = s.tutorialActive ? p("result.city") : p(v ? "result.summary" : "result.next"), I = a.kind === "propagation";
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-dispatch", "data-dispatch-done": s.dispatchDone ? "true" : "false", children: [
    /* @__PURE__ */ i.jsx(nn, { title: g.districtName, subtitle: p("dispatch.subtitle"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    s.dispatchDone ? /* @__PURE__ */ i.jsxs("div", { className: "scene-stage", "data-testid": "dispatch-result", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "board-col", children: [
        /* @__PURE__ */ i.jsx("h2", { className: "spray-title", children: p("dispatch.answerCheck") }),
        /* @__PURE__ */ i.jsx(
          Ps,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: d.fires,
            crews: d.crews,
            residual: d.residual,
            syndrome: d.syndromeOfResidual,
            interactive: !1,
            outcome: zh(d),
            gateCursor: I ? a.circuit.length : void 0,
            inputFires: I ? d.startFires : null,
            ariaLabel: p("dispatch.answerCheck")
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
      ] }),
      /* @__PURE__ */ i.jsx(
        yy,
        {
          debrief: d,
          result: il(d),
          missionCopy: g,
          stars: d.score.stars,
          maxStars: d.score.maxStars,
          onWhy: () => l({ type: "OPEN_WHY", reducedMotion: f }),
          onRetry: () => l({ type: "TRY_AGAIN" }),
          onNext: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }),
          nextLabel: E,
          children: /* @__PURE__ */ i.jsx(by, { ...n, children: /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "OPEN_WHY", reducedMotion: f }), "data-testid": "step-by-step", children: p("debrief.stepByStep") }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") })
          ] }) })
        }
      )
    ] }) : /* @__PURE__ */ i.jsxs("div", { className: "dispatch-stage", children: [
      /* @__PURE__ */ i.jsx(gy, { codeId: a.code, circuit: a.circuit, debrief: d, timeline: b, reducedMotion: f, onDone: S, missionCopy: g }, `${d.missionId}:${d.crews}:${String(s.progress[a.id]?.attempts ?? 0)}`),
      /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
    ] })
  ] });
}
function Ey(n) {
  const { state: s, dispatch: l, mission: a, debrief: d, reducedMotion: f } = n, p = je(), x = Ft(), g = At(a.id, x), b = Fe(a.code), S = d.steps[s.replayIndex] ?? d.steps[d.steps.length - 1], v = z.useId();
  if (S === void 0) return null;
  const E = d.steps.length - 1, I = a.kind === "propagation", $ = d.whatIf.trueFireCrews !== null ? { crews: d.whatIf.trueFireCrews, verdict: "success", label: p("why.trueFires") } : { crews: d.whatIf.decoderCrews, verdict: d.whatIf.decoderVerdict, label: p("why.decoder") }, R = Ae(d.residual), L = Array.from({ length: b.n }, (_, U) => U).filter((_) => Dt(R, _) !== "I"), F = d.verdict === "success" ? p("debrief.logical.preserved") : d.verdict === "detectable" ? p("debrief.logical.undecided") : I ? p("debrief.logical.missed", { houses: L.join(", ") }) : p("debrief.logical.flipped", { ops: [d.logicalFlip.x.some(Boolean) ? "X̄" : null, d.logicalFlip.z.some(Boolean) ? "Z̄" : null].filter(Boolean).join(` ${p("common.and")} `) }), X = a.index === Ln().length;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-debrief", children: [
    /* @__PURE__ */ i.jsx(nn, { title: g.districtName, subtitle: p("why.title"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "why-section", "aria-labelledby": "why-h", children: [
      /* @__PURE__ */ i.jsx("h2", { id: "why-h", className: "section-h", tabIndex: -1, "data-focus-target": !0, "data-testid": "why-heading", children: p("why.title") }),
      /* @__PURE__ */ i.jsx("p", { className: "why-short", "data-testid": "why-short", children: g.whyShort }),
      /* @__PURE__ */ i.jsx(ky, { codeId: a.code, circuit: a.circuit, mine: d, alternative: $, reducedMotion: f, missionCopy: g })
    ] }),
    /* @__PURE__ */ i.jsx(qa, { summary: p("debrief.stepByStep"), testId: "step-details", className: "step-details", children: /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": p("debrief.replayBoard"), children: [
        /* @__PURE__ */ i.jsx(
          Ps,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: S.fires,
            crews: S.crews,
            residual: S.residual,
            syndrome: S.syndrome,
            interactive: !1,
            outcome: S.showVerdict ? zh(d) : void 0,
            gateCursor: I ? S.gateCursor : void 0,
            inputFires: I ? d.startFires : null,
            ariaDescribedBy: v,
            ariaLabel: p("a11y.replayBoard")
          }
        ),
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: v, "aria-live": "polite", "data-testid": "replay-caption", children: [
          /* @__PURE__ */ i.jsx("strong", { children: p("debrief.step", { n: s.replayIndex + 1, total: d.steps.length, title: bf(p, S.id) }) }),
          " ",
          S.caption
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("details.replayEnglish") }),
        /* @__PURE__ */ i.jsxs("div", { className: "replay-controls", role: "group", "aria-label": p("a11y.replayControls"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_PREV" }), disabled: s.replayIndex === 0, "data-testid": "replay-prev", children: p("debrief.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_NEXT" }), disabled: s.replayIndex === E, "data-testid": "replay-next", children: p("debrief.next") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: `btn${s.autoPlay ? " is-active" : ""}`, "aria-pressed": s.autoPlay, onClick: () => l({ type: "REPLAY_AUTO", on: !s.autoPlay }), "data-testid": "replay-auto", children: p("debrief.autoPlay") }),
          /* @__PURE__ */ i.jsx("ol", { className: "step-dots", "aria-label": p("a11y.replaySteps"), children: d.steps.map((_, U) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${U === s.replayIndex ? " is-current" : ""}`, "aria-current": U === s.replayIndex ? "step" : void 0, onClick: () => l({ type: "REPLAY_GOTO", index: U }), "aria-label": p("a11y.step", { n: U + 1, title: bf(p, _.id) }), children: U + 1 }) }, _.id)) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", children: [
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: p("debrief.report") }),
          /* @__PURE__ */ i.jsxs("dl", { className: "facts", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.trueFires") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: d.fires })
            ] }),
            I ? /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.startedAs") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: d.startFires })
            ] }) : null,
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.yourCrews") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: d.crews })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.residual") }),
              /* @__PURE__ */ i.jsxs("dd", { className: "mono", "data-testid": "residual", children: [
                d.residual,
                /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
                  " ",
                  L.length > 0 ? p("debrief.residualHouses", { list: L.join(", ") }) : p("debrief.nothingLeft")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.logical") }),
              /* @__PURE__ */ i.jsx("dd", { "data-testid": "logical", children: F })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.decision") }),
              /* @__PURE__ */ i.jsxs("dd", { children: [
                p(Wa[d.score.quality]),
                " · ",
                /* @__PURE__ */ i.jsx(Os, { count: d.score.stars, max: d.score.maxStars, size: 16 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: Nh(a.id, d.verdict, x, d.narrative) })
        ] }),
        b.checks.length > 0 ? /* @__PURE__ */ i.jsx(al, { codeId: a.code, syndrome: S.syndrome, compact: !0 }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section whatif", "data-testid": "whatif", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: p("debrief.whatIf") }),
          /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.decoder", { crews: d.whatIf.decoderCrews, verdict: p(ol(d.whatIf.decoderVerdict, b.checks.length > 0)) }) }),
          d.whatIf.trueFireCrews !== null ? /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.trueFires", { crews: d.whatIf.trueFireCrews }) }) : null,
          /* @__PURE__ */ i.jsx("h3", { className: "panel-title", children: p("details.englishOriginal") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted", children: d.whatIf.explanation }),
          x !== "en" ? /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d.narrative }) : null
        ] }),
        /* @__PURE__ */ i.jsx(Xh, { bridge: n.bridge, missionId: a.id, correction: d.crews }, `${a.id}:${d.crews}`)
      ] })
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: p("debrief.tryAgain") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), "data-testid": "debrief-next", children: s.tutorialActive ? p("result.city") : p(X ? "result.summary" : "debrief.nextMission") })
    ] })
  ] });
}
function Xh({ bridge: n, missionId: s, correction: l }) {
  const a = je(), [d, f] = z.useState({ kind: "idle" }), p = n.cached(s), x = eh(n.cached(s, l), s, l), g = Array.from(new Set(p.map((I) => I.correction))).filter((I) => !x.some(($) => $.correction === I)), b = n.kind === "qollab" && typeof n.run == "function", S = n.jobsRemaining?.() ?? 0, v = n.backendName ?? a("cloud.selectedBackend"), E = async () => {
    if (!b || n.run === void 0) return;
    f({ kind: "running" });
    const I = await n.run({ missionId: s, correction: l, shots: 100 });
    f({ kind: "done", result: I });
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section cloud", "data-testid": "cloud-panel", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("cloud.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small", children: a("cloud.intro", { correction: l }) }),
    x.length === 0 && d.kind === "idle" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-empty", "data-testid": "cloud-empty", children: a("cloud.empty", { others: g.length > 0 ? a("cloud.emptyOthers", { list: g.join(", ") }) : "" }) }) : null,
    x.map((I, $) => /* @__PURE__ */ i.jsx(Of, { result: I }, `${I.startedAt}-${String($)}`)),
    d.kind === "running" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-running", role: "status", children: a("cloud.running", { backend: v }) }) : null,
    d.kind === "done" ? d.result.status === "ok" ? /* @__PURE__ */ i.jsx(Of, { result: d.result }) : /* @__PURE__ */ i.jsx("p", { className: "cloud-error", role: "alert", children: a("cloud.failed", { message: d.result.message }) }) : null,
    b ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => void E(), disabled: d.kind === "running" || S <= 0, children: S <= 0 ? a("cloud.noJobs") : a("cloud.verifyOn", { backend: v }) }) : null
  ] });
}
function Of({ result: n }) {
  const s = je(), l = Object.values(n.counts).reduce((d, f) => d + f, 0), a = Object.entries(n.counts).sort(([, d], [, f]) => f - d).slice(0, 5);
  return /* @__PURE__ */ i.jsxs("div", { className: `cloud-card cloud-${n.source}`, "data-testid": "cloud-card", children: [
    /* @__PURE__ */ i.jsxs("p", { className: "cloud-source", children: [
      /* @__PURE__ */ i.jsx("span", { className: "tag", children: s(vy[n.source]) }),
      " ",
      n.backendName,
      " · ",
      s("cloud.shots", { n: n.shots }),
      " · ",
      new Date(n.finishedAt).toISOString().slice(0, 16).replace("T", " "),
      " UTC"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: "cloud-dispatch small", children: [
      s("cloud.recordedCrews"),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "mono", children: n.correction }),
      " · ",
      s("cloud.jobId"),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "mono", children: n.jobId ?? s("cloud.noneLocal") })
    ] }),
    /* @__PURE__ */ i.jsx("ul", { className: "counts", children: a.map(([d, f]) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx("span", { className: "mono", children: d }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: f }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "bar", style: { width: `${String(l > 0 ? f / l * 100 : 0)}%` }, "aria-hidden": "true" })
    ] }, d)) }),
    /* @__PURE__ */ i.jsx("dl", { className: "facts small cloud-facts", children: Cy(n, s).map(([d, f]) => /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx("dt", { children: d }),
      /* @__PURE__ */ i.jsx("dd", { children: f })
    ] }, d)) })
  ] });
}
function Cy(n, s) {
  const l = [], a = Vi(n.analysis) ? n.analysis : {}, d = Vi(n.prediction) ? n.prediction : {}, f = (I) => typeof I == "number" ? `${String(Math.round(I * 100))}%` : null, p = (I) => Array.isArray(I) && I.every(($) => $ === 0 || $ === 1) ? I.map(String).join("") : null, x = p(a.dominantSyndrome), g = p(d.syndrome);
  x !== null && l.push([s("cloud.analysis.dominant"), g !== null ? s("cloud.analysis.predicted", { dom: x, pred: g }) : x]);
  const b = f(a.predictedSyndromeShare);
  b !== null && l.push([s("cloud.analysis.syndromeShare"), b]);
  const S = a.predictedLogicalShare;
  Array.isArray(S) && typeof S[0] == "number" && l.push([s("cloud.analysis.logicalShare"), f(S[0]) ?? "—"]);
  const v = a.dominantMatches;
  if (Vi(v)) {
    const I = Object.values(v).every(($) => $ === !0 || $ === null);
    l.push([s("cloud.analysis.dominantMatches"), s(I ? "cloud.analysis.yes" : "cloud.analysis.no")]);
  }
  const E = a.exactMatchesIdealModel ?? a.matches;
  return Vi(E) && l.push([s("cloud.analysis.exact"), Object.values(E).every((I) => I === !0 || I === null) ? s("cloud.analysis.yes") : s("cloud.analysis.noNoise")]), typeof d.verdict == "string" && l.push([s("cloud.analysis.verdict"), d.verdict]), typeof a.readoutBasis == "string" && typeof a.prep == "string" && l.push([s("cloud.analysis.prep"), s("cloud.analysis.prepValue", { prep: a.prep, basis: a.readoutBasis })]), l;
}
function Vi(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
const Zh = ["#2f6fdd", "#2bb673", "#8a4fd6", "#e8432a", "#f2b200", "#3a2f2a"];
function Ty({ state: n, dispatch: s }) {
  const l = je(), a = $a(n.progress);
  return /* @__PURE__ */ i.jsx("main", { className: "screen screen-title", children: /* @__PURE__ */ i.jsxs("div", { className: "title-card", children: [
    /* @__PURE__ */ i.jsx(vh, { size: 112, label: l("a11y.q11mark") }),
    /* @__PURE__ */ i.jsxs("h1", { className: "title-h", tabIndex: -1, "data-focus-target": !0, children: [
      l("app.name"),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "title-dash", children: "—" }),
      " ",
      l("title.heading")
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "title-lead", children: l("title.kidLine") }),
    /* @__PURE__ */ i.jsxs("div", { className: "title-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large btn-play", onClick: () => s({ type: "PLAY" }), "data-testid": "play", children: n.tutorialDone ? l("title.play") : l("title.firstCall") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_HOW" }), "data-testid": "how", children: l("title.how") })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "title-tools", children: [
      /* @__PURE__ */ i.jsx(X1, { language: n.settings.language, onChange: (d) => s({ type: "SET_LANGUAGE", language: d }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: () => s({ type: "OPEN_SETTINGS" }), "aria-label": l("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(Fa, {}) })
    ] }),
    a > 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted title-progress", "data-testid": "title-progress", children: l("title.progress", { stars: a, max: _a() }) }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "title-foot muted", children: l("title.foot") })
  ] }) });
}
function Iy({ dispatch: n }) {
  const s = je();
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(nn, { title: s("how.title"), onSettings: () => n({ type: "OPEN_SETTINGS" }), onTitle: () => n({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ i.jsxs("article", { className: "doc", children: [
      /* @__PURE__ */ i.jsx("p", { className: "brief-text", children: s("how.kid.intro") }),
      /* @__PURE__ */ i.jsx("h2", { children: s("how.kid.legend") }),
      /* @__PURE__ */ i.jsxs("dl", { className: "how-list", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx("svg", { width: "40", height: "40", viewBox: "-40 -80 80 84", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(He, { x: 0, y: 0, variant: "small", state: { kind: "normal" }, tint: 0 }) }),
            s("how.houses.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.houses") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(Es, { letter: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Es, { letter: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Es, { letter: "Y", size: 30 }),
            s("how.fires.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.fires") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(Ir, { type: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Ir, { type: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Ir, { type: "Z", ringing: !0, size: 30 }),
            s("how.alarms.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.alarms") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(Gn, { letter: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Gn, { letter: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Gn, { letter: "Y", size: 30 }),
            s("how.crews.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.crews") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: s("how.gates.term") }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.gates") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(Th, { size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Es, { letter: "Z", size: 30 }),
            s("legend.water")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.water") })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "how-rule", children: s("how.quantumRules") }),
      /* @__PURE__ */ i.jsx("p", { children: s("how.kid.spray") }),
      /* @__PURE__ */ i.jsxs(qa, { summary: s("details.title"), testId: "how-details", children: [
        /* @__PURE__ */ i.jsxs("dl", { className: "how-list how-list-details", children: [
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.houses.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.houses.desc") })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.fires.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.fires.desc") })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.alarms.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.alarms.desc") })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.crews.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.crews.desc") })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.gates.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.gates.desc") })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("dt", { children: s("how.verdict.term") }),
            /* @__PURE__ */ i.jsx("dd", { children: s("how.verdict.desc") })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("h3", { children: s("how.controls") }),
        /* @__PURE__ */ i.jsxs("ul", { className: "plain-list", children: [
          /* @__PURE__ */ i.jsx("li", { children: s("how.controls.tap") }),
          /* @__PURE__ */ i.jsx("li", { children: s("how.controls.keyboard") }),
          /* @__PURE__ */ i.jsx("li", { children: s("how.controls.stars") }),
          /* @__PURE__ */ i.jsx("li", { children: s("how.controls.sound") })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: s("how.model") }),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: s("details.notSyndromeZero") })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => n({ type: "CLOSE_OVERLAY" }), "data-testid": "back", children: s("how.back") }) })
    ] })
  ] });
}
function ga({ id: n, on: s, onChange: l, testId: a }) {
  const d = je();
  return /* @__PURE__ */ i.jsxs("button", { type: "button", role: "switch", "aria-checked": s, "aria-labelledby": n, className: `switch${s ? " is-on" : ""}`, onClick: () => l(!s), "data-testid": a, children: [
    /* @__PURE__ */ i.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { className: "switch-text", children: d(s ? "settings.on" : "settings.off") })
  ] });
}
function Ly({ state: n, dispatch: s, storageLabel: l, onReset: a }) {
  const d = je(), f = (p, x) => /* @__PURE__ */ i.jsx("button", { type: "button", className: `seg-btn${n.settings.language === p ? " is-on" : ""}`, "aria-pressed": n.settings.language === p, onClick: () => s({ type: "SET_LANGUAGE", language: p }), "data-testid": `lang-${p}`, children: x });
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(nn, { title: d("settings.title"), onSettings: () => s({ type: "CLOSE_OVERLAY" }), settingsLabel: d("settings.close"), onTitle: () => s({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "doc", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-sound", children: d("settings.sound") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.sound.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(ga, { id: "set-sound", on: n.settings.sound, onChange: (p) => s({ type: "SET_SOUND", on: p }), testId: "switch-sound" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-motion", children: d("settings.motion") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.motion.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(ga, { id: "set-motion", on: n.settings.reducedMotion, onChange: (p) => s({ type: "SET_REDUCED_MOTION", on: p }), testId: "switch-motion" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-language", children: d("settings.language") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.language.desc") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "seg", role: "group", "aria-labelledby": "set-language", "data-testid": "language-group", children: [
          f("en", d("settings.language.en")),
          f("ja", d("settings.language.ja"))
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-free-roam", children: d("settings.freeRoam") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.freeRoam.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(ga, { id: "set-free-roam", on: n.settings.freeRoam, onChange: (p) => s({ type: "SET_FREE_ROAM", on: p }), testId: "switch-free-roam" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", children: d("settings.progress") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", "data-testid": "settings-storage", children: l })
        ] }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-danger", onClick: a, "data-testid": "reset-progress", children: d("settings.reset") })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => s({ type: "CLOSE_OVERLAY" }), "data-testid": "back", children: d("settings.back") }) })
    ] })
  ] });
}
function Ry({ kind: n, beacon: s = !1, size: l = 180 }) {
  let f;
  switch (n) {
    case "houses-row":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(He, { x: 70, y: 150, variant: "small", tint: 0, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(He, { x: 160, y: 150, variant: "tall", tint: 1, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(He, { x: 250, y: 150, variant: "small", tint: 2, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(bs, { type: "Z", x: 115, y: 150, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(bs, { type: "Z", x: 205, y: 150, scale: 0.8 })
      ] });
      break;
    case "bridge":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(He, { x: 48, y: 150, variant: "small", tint: 3, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(fh, { x: 160, y: 150, width: 150 }),
        /* @__PURE__ */ i.jsx(He, { x: 272, y: 150, variant: "small", tint: 4, scale: 0.8 })
      ] });
      break;
    case "lab":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(uh, { x: 160, y: 152, active: !0 }),
        /* @__PURE__ */ i.jsx(gt, { x: 40, y: 152, size: 0.9 }),
        /* @__PURE__ */ i.jsx(gt, { x: 290, y: 152, size: 0.8 })
      ] });
      break;
    case "grid":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(He, { x: 60, y: 150, variant: "shop", tint: 2, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(He, { x: 150, y: 150, variant: "small", tint: 4, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(He, { x: 230, y: 150, variant: "tall", tint: 5, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(bs, { type: "Z", x: 105, y: 150, scale: 0.75 }),
        /* @__PURE__ */ i.jsx(bs, { type: "X", x: 190, y: 150, scale: 0.75 }),
        s ? /* @__PURE__ */ i.jsx(ll, { x: 290, y: 152, scale: 0.55, lit: !0 }) : /* @__PURE__ */ i.jsx(gt, { x: 295, y: 152, size: 0.9 })
      ] });
      break;
  }
  return /* @__PURE__ */ i.jsxs("svg", { className: "district-thumb", viewBox: `0 0 ${String(320)} ${String(170)}`, width: l, height: l * 170 / 320, "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: 320, height: 170, rx: 18, fill: "var(--sky)" }),
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 118, width: 320, height: 52, fill: "var(--ground-2)" }),
    f
  ] });
}
function _y({ state: n, dispatch: s, mission: l }) {
  const a = je(), d = Ft(), f = At(l.id, d), p = Rs(l.id), x = Fe(l.code), g = l.training.length > 0;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-brief", children: [
    /* @__PURE__ */ i.jsx(nn, { title: f.districtName, subtitle: `${a("mission.label", { n: l.index })} · ${f.kidTitle}`, onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "brief panel-card", "data-testid": "briefing", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "brief-head", children: [
        /* @__PURE__ */ i.jsx(Ry, { kind: p?.kind ?? "grid", beacon: p?.hasBeacon ?? !1 }),
        /* @__PURE__ */ i.jsxs("div", { className: "brief-copy", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "brief-goal-h", children: a("briefing.goal") }),
          /* @__PURE__ */ i.jsx("p", { className: "brief-text", "data-testid": "briefing-goal", children: f.goal }),
          /* @__PURE__ */ i.jsx("h2", { className: "brief-goal-h", children: a("briefing.lesson") }),
          /* @__PURE__ */ i.jsx("p", { className: "brief-lesson", children: f.lessonOneLiner })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("dl", { className: "brief-facts", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.crews") }),
          /* @__PURE__ */ i.jsx("dd", { children: l.allowed.map((b) => /* @__PURE__ */ i.jsxs("span", { className: "inline-glyph", children: [
            /* @__PURE__ */ i.jsx(Gn, { letter: b, size: 26 }),
            " ",
            b
          ] }, b)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.budget") }),
          /* @__PURE__ */ i.jsx("dd", { children: Xa(d, "briefing.budget", l.budget) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.previousBest") }),
          /* @__PURE__ */ i.jsxs("dd", { children: [
            /* @__PURE__ */ i.jsx(Os, { count: n.progress[l.id]?.stars ?? 0, max: l.maxStars, size: 20 }),
            l.maxStars < 3 ? /* @__PURE__ */ i.jsx("span", { className: "muted small", children: a("briefing.upTo", { n: l.maxStars }) }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "brief-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => s({ type: "START_MISSION" }), "data-testid": "start-mission", children: a(g ? "briefing.startTraining" : "briefing.go") }),
        g ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "briefing-skip", children: a("briefing.skipToDispatch") }) : null
      ] }),
      /* @__PURE__ */ i.jsxs(qa, { summary: f.detailsTitle, testId: "briefing-details", children: [
        /* @__PURE__ */ i.jsx("p", { className: "brief-original", children: p1(l.id, d, l.briefing) }),
        /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
          a("details.code"),
          ": ",
          a(P1[l.code] ?? "mission.code.rsc3"),
          " · ",
          x.name
        ] })
      ] })
    ] })
  ] });
}
function Oy({ state: n, dispatch: s, mission: l, debrief: a }) {
  const d = je(), f = Ft(), p = a.score, x = At(l.id, f), g = l.index === Ln().length, b = Fe(l.code).checks.length > 0, S = n.progress[l.id]?.completed === !0, v = Vn.findIndex((R) => R.missionId === l.id), E = il(a), I = () => s(n.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), $ = n.tutorialActive ? d("result.city") : d(g ? "result.summary" : "result.next");
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-result", children: [
    /* @__PURE__ */ i.jsx(nn, { title: x.districtName, subtitle: d("result.subtitle"), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "result panel-card", "data-testid": "result", "data-result": E, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "result-top", children: [
        /* @__PURE__ */ i.jsx("svg", { className: "result-badge", viewBox: "-30 -62 60 66", width: 64, height: 70, "aria-label": d("result.badge", { district: d(Sa(l.id)) }), role: "img", focusable: "false", children: /* @__PURE__ */ i.jsx(el, { x: 0, y: 0, colour: Zh[v] ?? "#2f6fdd", earned: S }) }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "result-h", children: d(_1(p)) }),
          /* @__PURE__ */ i.jsx(Os, { count: p.stars, max: p.maxStars, size: 40 }),
          /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
            p.maxStars === 1 ? d("result.starsOf.one", { stars: p.stars }) : d("result.starsOf.other", { stars: p.stars, max: p.maxStars }),
            p.maxStars < 3 ? ` · ${d("result.maxOne")}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "result-reaction", children: Eh(x, E) }),
      /* @__PURE__ */ i.jsxs("dl", { className: "result-facts", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.decision") }),
          /* @__PURE__ */ i.jsx("dd", { children: d(Wa[p.quality]) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.outcome") }),
          /* @__PURE__ */ i.jsx("dd", { className: `outcome outcome-${p.outcome}`, children: d(ol(p.outcome, b)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.cost") }),
          /* @__PURE__ */ i.jsx("dd", { children: Xa(f, "result.costText", p.crewsUsed, { used: p.crewsUsed, min: p.minCrews }) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.attempts") }),
          /* @__PURE__ */ i.jsx("dd", { "data-testid": "result-attempts", children: n.progress[l.id]?.attempts ?? 1 })
        ] })
      ] }),
      S ? /* @__PURE__ */ i.jsx("p", { className: "result-badge-line", "data-testid": "result-badge-line", children: d("result.badge", { district: d(Sa(l.id)) }) }) : null,
      /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_WHY" }), "data-testid": "result-why", children: d("dispatch.why") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: d("result.tryAgain") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: I, "data-testid": "next-mission", children: $ })
      ] })
    ] })
  ] });
}
function Py({ state: n, dispatch: s }) {
  const l = je(), a = Ft(), d = Ln(), f = $a(n.progress);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-summary", children: [
    /* @__PURE__ */ i.jsx(nn, { title: l("summary.title"), subtitle: l("mission.starsOf", { stars: f, max: _a() }), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "summary panel-card", "data-testid": "summary", children: [
      /* @__PURE__ */ i.jsx("p", { className: "brief-text", children: l("summary.lead") }),
      /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: l("summary.badges") }),
      /* @__PURE__ */ i.jsx("ul", { className: "badge-row", "aria-label": l("summary.badges"), children: Vn.map((p, x) => {
        const g = n.progress[p.missionId]?.completed === !0;
        return /* @__PURE__ */ i.jsxs("li", { className: g ? "badge-item is-earned" : "badge-item", "data-badge": p.id, "data-earned": g ? "true" : "false", children: [
          /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -62 60 66", width: 52, height: 57, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(el, { x: 0, y: 0, colour: Zh[x] ?? "#2f6fdd", earned: g }) }),
          /* @__PURE__ */ i.jsx("span", { children: l(Sa(p.missionId)) })
        ] }, p.id);
      }) }),
      /* @__PURE__ */ i.jsxs("table", { className: "summary-table", children: [
        /* @__PURE__ */ i.jsx("thead", { children: /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.mission") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.stars") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.attempts") })
        ] }) }),
        /* @__PURE__ */ i.jsx("tbody", { children: d.map((p) => {
          const x = n.progress[p.id];
          return /* @__PURE__ */ i.jsxs("tr", { children: [
            /* @__PURE__ */ i.jsxs("th", { scope: "row", children: [
              p.index,
              ". ",
              At(p.id, a).districtName
            ] }),
            /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(Os, { count: x?.stars ?? 0, max: p.maxStars, size: 18 }) }),
            /* @__PURE__ */ i.jsx("td", { children: x?.attempts ?? 0 })
          ] }, p.id);
        }) })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "muted", children: l("summary.freeRoamHint") }),
      /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => s({ type: "OPEN_MISSIONS" }), "data-testid": "summary-city", children: l("summary.playAgain") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_SETTINGS" }), children: l("settings.freeRoam") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-large", onClick: () => s({ type: "OPEN_TITLE" }), children: l("summary.titleBtn") })
      ] }),
      /* @__PURE__ */ i.jsx(Lh, { allowed: ["X", "Z", "Y"], alarms: !0, water: !0 })
    ] })
  ] });
}
let Ss = null;
function $y() {
  if (Ss !== null) return Ss;
  const n = globalThis.AudioContext;
  if (typeof n != "function") return null;
  try {
    Ss = new n();
  } catch {
    Ss = null;
  }
  return Ss;
}
function rt(n, s, l, a, d = 0.08, f = "sine") {
  const p = n.createOscillator(), x = n.createGain();
  p.type = f, p.frequency.value = s, x.gain.setValueAtTime(0, l), x.gain.linearRampToValueAtTime(d, l + 0.01), x.gain.exponentialRampToValueAtTime(1e-4, l + a), p.connect(x).connect(n.destination), p.start(l), p.stop(l + a + 0.02);
}
function Pf(n, s) {
  if (!s) return;
  const l = $y();
  if (l === null) return;
  l.state === "suspended" && l.resume();
  const a = l.currentTime;
  switch (n) {
    case "select":
      rt(l, 660, a, 0.06);
      break;
    case "place":
      rt(l, 440, a, 0.09), rt(l, 660, a + 0.05, 0.09);
      break;
    case "remove":
      rt(l, 520, a, 0.08), rt(l, 390, a + 0.05, 0.1);
      break;
    case "confirm":
      rt(l, 523, a, 0.1), rt(l, 659, a + 0.08, 0.14);
      break;
    case "success":
      rt(l, 523, a, 0.12), rt(l, 659, a + 0.1, 0.12), rt(l, 784, a + 0.2, 0.22);
      break;
    case "failure":
      rt(l, 330, a, 0.16, 0.08, "triangle"), rt(l, 247, a + 0.14, 0.26, 0.08, "triangle");
      break;
    case "alarm":
      rt(l, 880, a, 0.08, 0.05, "square"), rt(l, 880, a + 0.14, 0.08, 0.05, "square");
      break;
    case "step":
      rt(l, 587, a, 0.05, 0.05);
      break;
    case "blocked":
      rt(l, 196, a, 0.07, 0.06, "square");
      break;
  }
}
function My(n, s, l) {
  switch (n.type) {
    case "SELECT_LETTER":
      return l.selected !== s.selected ? "select" : null;
    case "TOGGLE_BLOCK": {
      const a = s.placements[n.qubit], d = l.placements[n.qubit];
      if (a === d) {
        if (l === s && s.screen === "challenge" && !s.standDownDialog && a === void 0) {
          const f = ot(s), p = f !== null && n.qubit >= 0 && n.qubit < Fe(f.code).n;
          if (f !== null && p && Tr(s.placements) >= f.budget) return "blocked";
        }
        return null;
      }
      return d === void 0 ? "remove" : "place";
    }
    case "RECALL_BLOCK":
      return l.placements !== s.placements ? "remove" : null;
    case "CLEAR_CREWS":
      return l.placements !== s.placements && Tr(s.placements) > 0 ? "remove" : null;
    case "UNDO_PLACEMENT":
      return l.placements !== s.placements ? "remove" : null;
    case "REDO_PLACEMENT":
      return l.placements !== s.placements ? "place" : null;
    case "CONFIRM":
    case "STAND_DOWN_CONFIRM":
      return l.screen === "dispatch" && s.screen !== "dispatch" ? "confirm" : null;
    case "DISPATCH_DONE":
    case "DISPATCH_SKIP":
      return null;
    case "REPLAY_NEXT":
    case "REPLAY_PREV":
    case "REPLAY_GOTO":
      return l.replayIndex !== s.replayIndex ? "step" : null;
    default:
      return null;
  }
}
const $f = 1600;
function Dy() {
  const [n, s] = z.useState(() => {
    try {
      return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    } catch {
      return !1;
    }
  });
  return z.useEffect(() => {
    let l;
    try {
      l = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    } catch {
      l = void 0;
    }
    if (l === void 0) return;
    const a = (d) => s(d.matches);
    return l.addEventListener("change", a), () => l?.removeEventListener("change", a);
  }, []), n;
}
function Ay(n, s) {
  if (n.screen === "dispatch" && n.dispatchDone) {
    const l = s.querySelector('[data-testid="result-title"]');
    if (l !== null) return l;
  }
  if (n.screen === "debrief") {
    const l = s.querySelector('[data-testid="why-heading"]');
    if (l !== null) return l;
  }
  return s.querySelector("main h1[data-focus-target]") ?? s.querySelector("main h1");
}
const Fy = ["dispatch", "debrief", "result"];
function zy({ bridge: n = ug(), storage: s = "local" }) {
  const [l] = z.useState(() => s === "local" ? tg() : null), [a, d] = z.useReducer(af, void 0, () => {
    const { save: W, notice: te } = Jm(l);
    return gg(W, te);
  }), [f, p] = z.useState(!1), [x, g] = z.useState(null), S = Dy() || a.settings.reducedMotion, v = z.useRef(null), E = z.useRef(a), I = z.useRef(a.settings.sound), $ = z.useRef(S);
  z.useEffect(() => {
    E.current = a, I.current = a.settings.sound, $.current = S;
  });
  const R = z.useCallback((W) => {
    const te = W.type === "CONFIRM" || W.type === "STAND_DOWN_CONFIRM" || W.type === "OPEN_WHY" ? { ...W, reducedMotion: W.reducedMotion ?? $.current } : W, we = E.current, Y = af(we, te);
    if (E.current = Y, (te.type === "NEXT_MISSION" || te.type === "OPEN_MISSIONS") && Y.screen === "missions") {
      const he = Fy.includes(we.screen) && we.debrief !== null && we.debrief.score.completed ? Rs(we.debrief.missionId)?.id ?? null : null;
      g(he);
    }
    d(te);
    const q = My(te, we, Y);
    q !== null && Pf(q, I.current);
  }, []);
  z.useEffect(() => {
    a.screen === "briefing" && a.tutorialActive && R({ type: "START_CHALLENGE" });
  }, [a.screen, a.tutorialActive, R]);
  const L = z.useRef("");
  z.useEffect(() => {
    if (a.screen !== "dispatch" || !a.dispatchDone || a.debrief === null) return;
    const W = `${a.debrief.missionId}:${a.debrief.crews}:${String(a.progress[a.debrief.missionId]?.attempts ?? 0)}`;
    L.current !== W && (L.current = W, Pf(a.debrief.verdict === "success" ? "success" : "failure", a.settings.sound));
  }, [a.screen, a.dispatchDone, a.debrief, a.progress, a.settings.sound]);
  const { progress: F, settings: X, tutorialDone: _ } = a;
  z.useEffect(() => {
    eg(l, kg({ ...E.current, progress: F, settings: X, tutorialDone: _ }));
  }, [l, F, X, _]), z.useEffect(() => {
    if (!a.autoPlay || a.screen !== "debrief") return;
    const W = globalThis.setTimeout(() => d({ type: "REPLAY_NEXT" }), S ? $f + 600 : $f);
    return () => globalThis.clearTimeout(W);
  }, [a.autoPlay, a.replayIndex, a.screen, S]);
  const U = z.useRef(null), re = `${a.screen}:${a.missionId ?? ""}:${String(a.progress[a.missionId ?? ""]?.attempts ?? 0)}:${a.dispatchDone ? "done" : ""}:${a.settings.language}`, ne = z.useRef(re);
  return z.useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
    }
    const W = v.current, te = E.current, we = ot(te), Y = l1(te.settings.language);
    W !== null && re !== ne.current && Ay(te, W)?.focus({ preventScroll: !0 }), document.title = D1(Y, te, we);
    const q = U.current;
    q !== null && (q.textContent = "");
    const he = globalThis.setTimeout(() => {
      U.current !== null && (U.current.textContent = A1(Y, te, we, te.debrief));
    }, 60);
    return () => globalThis.clearTimeout(he);
  }, [re]), /* @__PURE__ */ i.jsx(o1, { language: a.settings.language, children: /* @__PURE__ */ i.jsx(Xy, { state: a, dispatch: R, bridge: n, storageMode: s, store: l, reducedMotion: S, recentlySolved: x, resetDialog: f, setResetDialog: p, contentRef: v, announcerRef: U }) });
}
function Xy({ state: n, dispatch: s, bridge: l, storageMode: a, store: d, reducedMotion: f, recentlySolved: p, resetDialog: x, setResetDialog: g, contentRef: b, announcerRef: S }) {
  const v = je(), E = ot(n), I = a === "memory" ? v("settings.storage.qollab") : d === null ? v("settings.storage.memory") : v("settings.storage.local", { key: "q11.save.v1" }), $ = v(a === "memory" ? "city.hud.storage.qollab" : d === null ? "city.hud.storage.memory" : "city.hud.storage.local"), R = n.notice === Pa ? v("notice.progressReset") : n.notice === Gf ? v("notice.saveReset") : n.notice, L = { state: n, dispatch: s, storageLabel: I }, F = /* @__PURE__ */ i.jsx(C1, { state: n, dispatch: s, storageNote: $, recentlySolved: p, onSettings: () => s({ type: "OPEN_SETTINGS" }), onTitle: () => s({ type: "OPEN_TITLE" }) }), X = E === null || n.debrief === null ? null : { state: n, dispatch: s, mission: E, debrief: n.debrief, bridge: l, reducedMotion: f };
  let _;
  switch (n.screen) {
    case "title":
      _ = /* @__PURE__ */ i.jsx(Ty, { ...L });
      break;
    case "how":
      _ = /* @__PURE__ */ i.jsx(Iy, { ...L });
      break;
    case "settings":
      _ = /* @__PURE__ */ i.jsx(Ly, { ...L, onReset: () => g(!0) });
      break;
    case "missions":
      _ = F;
      break;
    case "briefing":
      _ = E === null ? F : /* @__PURE__ */ i.jsx(_y, { ...L, mission: E });
      break;
    case "training":
      _ = E === null ? F : /* @__PURE__ */ i.jsx(jy, { state: n, dispatch: s, mission: E });
      break;
    case "challenge":
      _ = E === null ? F : /* @__PURE__ */ i.jsx(
        Sy,
        {
          mission: E,
          placements: n.placements,
          selected: n.selected,
          standDownDialog: n.standDownDialog,
          highlightedCheck: n.highlightedCheck,
          canUndo: n.undoStack.length > 0,
          canRedo: n.redoStack.length > 0,
          tutorialActive: n.tutorialActive,
          dispatch: s
        }
      );
      break;
    case "dispatch":
      _ = X === null ? F : /* @__PURE__ */ i.jsx(Ny, { ...X });
      break;
    case "debrief":
      _ = X === null ? F : /* @__PURE__ */ i.jsx(Ey, { ...X });
      break;
    case "result":
      _ = X === null ? F : /* @__PURE__ */ i.jsx(Oy, { ...L, mission: X.mission, debrief: X.debrief });
      break;
    case "summary":
      _ = /* @__PURE__ */ i.jsx(Py, { ...L });
      break;
  }
  return /* @__PURE__ */ i.jsxs("div", { className: "app", "data-reduced-motion": f ? "true" : "false", "data-screen": n.screen, "data-language": n.settings.language, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "app-content", ref: b, "data-inert-root": !0, children: [
      R !== null ? /* @__PURE__ */ i.jsx(Z1, { text: R, onDismiss: () => s({ type: "DISMISS_NOTICE" }) }) : null,
      _
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", "data-testid": "announcer", ref: S }),
    x ? /* @__PURE__ */ i.jsx(
      Ih,
      {
        title: v("settings.resetDialog.title"),
        confirmLabel: v("settings.resetDialog.confirm"),
        danger: !0,
        onConfirm: () => {
          s({ type: "RESET_PROGRESS" }), g(!1);
        },
        onCancel: () => g(!1),
        children: /* @__PURE__ */ i.jsx("p", { children: v("settings.resetDialog.body") })
      }
    ) : null
  ] });
}
function Zy(n, s = {}) {
  n.replaceChildren();
  const l = Hp.createRoot(n), a = {
    ...s.bridge === void 0 ? {} : { bridge: s.bridge },
    ...s.storage === void 0 ? {} : { storage: s.storage }
  };
  return l.render(
    /* @__PURE__ */ i.jsx(z.StrictMode, { children: /* @__PURE__ */ i.jsx(zy, { ...a }) })
  ), l;
}
export {
  Zy as mountQ11
};
