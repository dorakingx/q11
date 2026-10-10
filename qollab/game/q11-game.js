var so = { exports: {} }, Zr = {}, oo = { exports: {} }, K = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nc;
function T0() {
  if (Nc) return K;
  Nc = 1;
  var l = Symbol.for("react.element"), u = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), w = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), T = Symbol.iterator;
  function E(y) {
    return y === null || typeof y != "object" ? null : (y = T && y[T] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var z = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, H = Object.assign, A = {};
  function R(y, I, G) {
    this.props = y, this.context = I, this.refs = A, this.updater = G || z;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(y, I) {
    if (typeof y != "object" && typeof y != "function" && y != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, y, I, "setState");
  }, R.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function O() {
  }
  O.prototype = R.prototype;
  function q(y, I, G) {
    this.props = y, this.context = I, this.refs = A, this.updater = G || z;
  }
  var je = q.prototype = new O();
  je.constructor = q, H(je, R.prototype), je.isPureReactComponent = !0;
  var Te = Array.isArray, ut = Object.prototype.hasOwnProperty, ze = { current: null }, De = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Je(y, I, G) {
    var J, te = {}, ne = null, oe = null;
    if (I != null) for (J in I.ref !== void 0 && (oe = I.ref), I.key !== void 0 && (ne = "" + I.key), I) ut.call(I, J) && !De.hasOwnProperty(J) && (te[J] = I[J]);
    var le = arguments.length - 2;
    if (le === 1) te.children = G;
    else if (1 < le) {
      for (var de = Array(le), Qe = 0; Qe < le; Qe++) de[Qe] = arguments[Qe + 2];
      te.children = de;
    }
    if (y && y.defaultProps) for (J in le = y.defaultProps, le) te[J] === void 0 && (te[J] = le[J]);
    return { $$typeof: l, type: y, key: ne, ref: oe, props: te, _owner: ze.current };
  }
  function At(y, I) {
    return { $$typeof: l, type: y.type, key: I, ref: y.ref, props: y.props, _owner: y._owner };
  }
  function Ct(y) {
    return typeof y == "object" && y !== null && y.$$typeof === l;
  }
  function cn(y) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(G) {
      return I[G];
    });
  }
  var wt = /\/+/g;
  function He(y, I) {
    return typeof y == "object" && y !== null && y.key != null ? cn("" + y.key) : I.toString(36);
  }
  function at(y, I, G, J, te) {
    var ne = typeof y;
    (ne === "undefined" || ne === "boolean") && (y = null);
    var oe = !1;
    if (y === null) oe = !0;
    else switch (ne) {
      case "string":
      case "number":
        oe = !0;
        break;
      case "object":
        switch (y.$$typeof) {
          case l:
          case u:
            oe = !0;
        }
    }
    if (oe) return oe = y, te = te(oe), y = J === "" ? "." + He(oe, 0) : J, Te(te) ? (G = "", y != null && (G = y.replace(wt, "$&/") + "/"), at(te, I, G, "", function(Qe) {
      return Qe;
    })) : te != null && (Ct(te) && (te = At(te, G + (!te.key || oe && oe.key === te.key ? "" : ("" + te.key).replace(wt, "$&/") + "/") + y)), I.push(te)), 1;
    if (oe = 0, J = J === "" ? "." : J + ":", Te(y)) for (var le = 0; le < y.length; le++) {
      ne = y[le];
      var de = J + He(ne, le);
      oe += at(ne, I, G, de, te);
    }
    else if (de = E(y), typeof de == "function") for (y = de.call(y), le = 0; !(ne = y.next()).done; ) ne = ne.value, de = J + He(ne, le++), oe += at(ne, I, G, de, te);
    else if (ne === "object") throw I = String(y), Error("Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead.");
    return oe;
  }
  function xt(y, I, G) {
    if (y == null) return y;
    var J = [], te = 0;
    return at(y, J, "", "", function(ne) {
      return I.call(G, ne, te++);
    }), J;
  }
  function Fe(y) {
    if (y._status === -1) {
      var I = y._result;
      I = I(), I.then(function(G) {
        (y._status === 0 || y._status === -1) && (y._status = 1, y._result = G);
      }, function(G) {
        (y._status === 0 || y._status === -1) && (y._status = 2, y._result = G);
      }), y._status === -1 && (y._status = 0, y._result = I);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var me = { current: null }, M = { transition: null }, Q = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: M, ReactCurrentOwner: ze };
  function F() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return K.Children = { map: xt, forEach: function(y, I, G) {
    xt(y, function() {
      I.apply(this, arguments);
    }, G);
  }, count: function(y) {
    var I = 0;
    return xt(y, function() {
      I++;
    }), I;
  }, toArray: function(y) {
    return xt(y, function(I) {
      return I;
    }) || [];
  }, only: function(y) {
    if (!Ct(y)) throw Error("React.Children.only expected to receive a single React element child.");
    return y;
  } }, K.Component = R, K.Fragment = s, K.Profiler = f, K.PureComponent = q, K.StrictMode = c, K.Suspense = S, K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q, K.act = F, K.cloneElement = function(y, I, G) {
    if (y == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + y + ".");
    var J = H({}, y.props), te = y.key, ne = y.ref, oe = y._owner;
    if (I != null) {
      if (I.ref !== void 0 && (ne = I.ref, oe = ze.current), I.key !== void 0 && (te = "" + I.key), y.type && y.type.defaultProps) var le = y.type.defaultProps;
      for (de in I) ut.call(I, de) && !De.hasOwnProperty(de) && (J[de] = I[de] === void 0 && le !== void 0 ? le[de] : I[de]);
    }
    var de = arguments.length - 2;
    if (de === 1) J.children = G;
    else if (1 < de) {
      le = Array(de);
      for (var Qe = 0; Qe < de; Qe++) le[Qe] = arguments[Qe + 2];
      J.children = le;
    }
    return { $$typeof: l, type: y.type, key: te, ref: ne, props: J, _owner: oe };
  }, K.createContext = function(y) {
    return y = { $$typeof: w, _currentValue: y, _currentValue2: y, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, y.Provider = { $$typeof: m, _context: y }, y.Consumer = y;
  }, K.createElement = Je, K.createFactory = function(y) {
    var I = Je.bind(null, y);
    return I.type = y, I;
  }, K.createRef = function() {
    return { current: null };
  }, K.forwardRef = function(y) {
    return { $$typeof: j, render: y };
  }, K.isValidElement = Ct, K.lazy = function(y) {
    return { $$typeof: L, _payload: { _status: -1, _result: y }, _init: Fe };
  }, K.memo = function(y, I) {
    return { $$typeof: C, type: y, compare: I === void 0 ? null : I };
  }, K.startTransition = function(y) {
    var I = M.transition;
    M.transition = {};
    try {
      y();
    } finally {
      M.transition = I;
    }
  }, K.unstable_act = F, K.useCallback = function(y, I) {
    return me.current.useCallback(y, I);
  }, K.useContext = function(y) {
    return me.current.useContext(y);
  }, K.useDebugValue = function() {
  }, K.useDeferredValue = function(y) {
    return me.current.useDeferredValue(y);
  }, K.useEffect = function(y, I) {
    return me.current.useEffect(y, I);
  }, K.useId = function() {
    return me.current.useId();
  }, K.useImperativeHandle = function(y, I, G) {
    return me.current.useImperativeHandle(y, I, G);
  }, K.useInsertionEffect = function(y, I) {
    return me.current.useInsertionEffect(y, I);
  }, K.useLayoutEffect = function(y, I) {
    return me.current.useLayoutEffect(y, I);
  }, K.useMemo = function(y, I) {
    return me.current.useMemo(y, I);
  }, K.useReducer = function(y, I, G) {
    return me.current.useReducer(y, I, G);
  }, K.useRef = function(y) {
    return me.current.useRef(y);
  }, K.useState = function(y) {
    return me.current.useState(y);
  }, K.useSyncExternalStore = function(y, I, G) {
    return me.current.useSyncExternalStore(y, I, G);
  }, K.useTransition = function() {
    return me.current.useTransition();
  }, K.version = "18.3.1", K;
}
var Cc;
function xo() {
  return Cc || (Cc = 1, oo.exports = T0()), oo.exports;
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
var Ic;
function $0() {
  if (Ic) return Zr;
  Ic = 1;
  var l = xo(), u = Symbol.for("react.element"), s = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, f = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(j, S, C) {
    var L, T = {}, E = null, z = null;
    C !== void 0 && (E = "" + C), S.key !== void 0 && (E = "" + S.key), S.ref !== void 0 && (z = S.ref);
    for (L in S) c.call(S, L) && !m.hasOwnProperty(L) && (T[L] = S[L]);
    if (j && j.defaultProps) for (L in S = j.defaultProps, S) T[L] === void 0 && (T[L] = S[L]);
    return { $$typeof: u, type: j, key: E, ref: z, props: T, _owner: f.current };
  }
  return Zr.Fragment = s, Zr.jsx = w, Zr.jsxs = w, Zr;
}
var _c;
function P0() {
  return _c || (_c = 1, so.exports = $0()), so.exports;
}
var a = P0(), xe = xo(), ri = {}, uo = { exports: {} }, Ve = {}, ao = { exports: {} }, co = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc;
function R0() {
  return Tc || (Tc = 1, (function(l) {
    function u(M, Q) {
      var F = M.length;
      M.push(Q);
      e: for (; 0 < F; ) {
        var y = F - 1 >>> 1, I = M[y];
        if (0 < f(I, Q)) M[y] = Q, M[F] = I, F = y;
        else break e;
      }
    }
    function s(M) {
      return M.length === 0 ? null : M[0];
    }
    function c(M) {
      if (M.length === 0) return null;
      var Q = M[0], F = M.pop();
      if (F !== Q) {
        M[0] = F;
        e: for (var y = 0, I = M.length, G = I >>> 1; y < G; ) {
          var J = 2 * (y + 1) - 1, te = M[J], ne = J + 1, oe = M[ne];
          if (0 > f(te, F)) ne < I && 0 > f(oe, te) ? (M[y] = oe, M[ne] = F, y = ne) : (M[y] = te, M[J] = F, y = J);
          else if (ne < I && 0 > f(oe, F)) M[y] = oe, M[ne] = F, y = ne;
          else break e;
        }
      }
      return Q;
    }
    function f(M, Q) {
      var F = M.sortIndex - Q.sortIndex;
      return F !== 0 ? F : M.id - Q.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      l.unstable_now = function() {
        return m.now();
      };
    } else {
      var w = Date, j = w.now();
      l.unstable_now = function() {
        return w.now() - j;
      };
    }
    var S = [], C = [], L = 1, T = null, E = 3, z = !1, H = !1, A = !1, R = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, q = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function je(M) {
      for (var Q = s(C); Q !== null; ) {
        if (Q.callback === null) c(C);
        else if (Q.startTime <= M) c(C), Q.sortIndex = Q.expirationTime, u(S, Q);
        else break;
        Q = s(C);
      }
    }
    function Te(M) {
      if (A = !1, je(M), !H) if (s(S) !== null) H = !0, Fe(ut);
      else {
        var Q = s(C);
        Q !== null && me(Te, Q.startTime - M);
      }
    }
    function ut(M, Q) {
      H = !1, A && (A = !1, O(Je), Je = -1), z = !0;
      var F = E;
      try {
        for (je(Q), T = s(S); T !== null && (!(T.expirationTime > Q) || M && !cn()); ) {
          var y = T.callback;
          if (typeof y == "function") {
            T.callback = null, E = T.priorityLevel;
            var I = y(T.expirationTime <= Q);
            Q = l.unstable_now(), typeof I == "function" ? T.callback = I : T === s(S) && c(S), je(Q);
          } else c(S);
          T = s(S);
        }
        if (T !== null) var G = !0;
        else {
          var J = s(C);
          J !== null && me(Te, J.startTime - Q), G = !1;
        }
        return G;
      } finally {
        T = null, E = F, z = !1;
      }
    }
    var ze = !1, De = null, Je = -1, At = 5, Ct = -1;
    function cn() {
      return !(l.unstable_now() - Ct < At);
    }
    function wt() {
      if (De !== null) {
        var M = l.unstable_now();
        Ct = M;
        var Q = !0;
        try {
          Q = De(!0, M);
        } finally {
          Q ? He() : (ze = !1, De = null);
        }
      } else ze = !1;
    }
    var He;
    if (typeof q == "function") He = function() {
      q(wt);
    };
    else if (typeof MessageChannel < "u") {
      var at = new MessageChannel(), xt = at.port2;
      at.port1.onmessage = wt, He = function() {
        xt.postMessage(null);
      };
    } else He = function() {
      R(wt, 0);
    };
    function Fe(M) {
      De = M, ze || (ze = !0, He());
    }
    function me(M, Q) {
      Je = R(function() {
        M(l.unstable_now());
      }, Q);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, l.unstable_continueExecution = function() {
      H || z || (H = !0, Fe(ut));
    }, l.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : At = 0 < M ? Math.floor(1e3 / M) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return E;
    }, l.unstable_getFirstCallbackNode = function() {
      return s(S);
    }, l.unstable_next = function(M) {
      switch (E) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = E;
      }
      var F = E;
      E = Q;
      try {
        return M();
      } finally {
        E = F;
      }
    }, l.unstable_pauseExecution = function() {
    }, l.unstable_requestPaint = function() {
    }, l.unstable_runWithPriority = function(M, Q) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var F = E;
      E = M;
      try {
        return Q();
      } finally {
        E = F;
      }
    }, l.unstable_scheduleCallback = function(M, Q, F) {
      var y = l.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? y + F : y) : F = y, M) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return I = F + I, M = { id: L++, callback: Q, priorityLevel: M, startTime: F, expirationTime: I, sortIndex: -1 }, F > y ? (M.sortIndex = F, u(C, M), s(S) === null && M === s(C) && (A ? (O(Je), Je = -1) : A = !0, me(Te, F - y))) : (M.sortIndex = I, u(S, M), H || z || (H = !0, Fe(ut))), M;
    }, l.unstable_shouldYield = cn, l.unstable_wrapCallback = function(M) {
      var Q = E;
      return function() {
        var F = E;
        E = Q;
        try {
          return M.apply(this, arguments);
        } finally {
          E = F;
        }
      };
    };
  })(co)), co;
}
var $c;
function L0() {
  return $c || ($c = 1, ao.exports = R0()), ao.exports;
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
var Pc;
function O0() {
  if (Pc) return Ve;
  Pc = 1;
  var l = xo(), u = L0();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var c = /* @__PURE__ */ new Set(), f = {};
  function m(e, t) {
    w(e, t), w(e + "Capture", t);
  }
  function w(e, t) {
    for (f[e] = t, e = 0; e < t.length; e++) c.add(t[e]);
  }
  var j = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), S = Object.prototype.hasOwnProperty, C = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, L = {}, T = {};
  function E(e) {
    return S.call(T, e) ? !0 : S.call(L, e) ? !1 : C.test(e) ? T[e] = !0 : (L[e] = !0, !1);
  }
  function z(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function H(e, t, n, r) {
    if (t === null || typeof t > "u" || z(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
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
  function A(e, t, n, r, i, o, d) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = d;
  }
  var R = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    R[e] = new A(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    R[t] = new A(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    R[e] = new A(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    R[e] = new A(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    R[e] = new A(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    R[e] = new A(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    R[e] = new A(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    R[e] = new A(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    R[e] = new A(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var O = /[\-:]([a-z])/g;
  function q(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      O,
      q
    );
    R[t] = new A(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(O, q);
    R[t] = new A(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(O, q);
    R[t] = new A(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    R[e] = new A(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), R.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    R[e] = new A(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function je(e, t, n, r) {
    var i = R.hasOwnProperty(t) ? R[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (H(t, n, i, r) && (n = null), r || i === null ? E(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Te = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ut = Symbol.for("react.element"), ze = Symbol.for("react.portal"), De = Symbol.for("react.fragment"), Je = Symbol.for("react.strict_mode"), At = Symbol.for("react.profiler"), Ct = Symbol.for("react.provider"), cn = Symbol.for("react.context"), wt = Symbol.for("react.forward_ref"), He = Symbol.for("react.suspense"), at = Symbol.for("react.suspense_list"), xt = Symbol.for("react.memo"), Fe = Symbol.for("react.lazy"), me = Symbol.for("react.offscreen"), M = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = M && e[M] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var F = Object.assign, y;
  function I(e) {
    if (y === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      y = t && t[1] || "";
    }
    return `
` + y + e;
  }
  var G = !1;
  function J(e, t) {
    if (!e || G) return "";
    G = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (k) {
          var r = k;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (k) {
          r = k;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (k) {
          r = k;
        }
        e();
      }
    } catch (k) {
      if (k && r && typeof k.stack == "string") {
        for (var i = k.stack.split(`
`), o = r.stack.split(`
`), d = i.length - 1, p = o.length - 1; 1 <= d && 0 <= p && i[d] !== o[p]; ) p--;
        for (; 1 <= d && 0 <= p; d--, p--) if (i[d] !== o[p]) {
          if (d !== 1 || p !== 1)
            do
              if (d--, p--, 0 > p || i[d] !== o[p]) {
                var h = `
` + i[d].replace(" at new ", " at ");
                return e.displayName && h.includes("<anonymous>") && (h = h.replace("<anonymous>", e.displayName)), h;
              }
            while (1 <= d && 0 <= p);
          break;
        }
      }
    } finally {
      G = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? I(e) : "";
  }
  function te(e) {
    switch (e.tag) {
      case 5:
        return I(e.type);
      case 16:
        return I("Lazy");
      case 13:
        return I("Suspense");
      case 19:
        return I("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = J(e.type, !1), e;
      case 11:
        return e = J(e.type.render, !1), e;
      case 1:
        return e = J(e.type, !0), e;
      default:
        return "";
    }
  }
  function ne(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case De:
        return "Fragment";
      case ze:
        return "Portal";
      case At:
        return "Profiler";
      case Je:
        return "StrictMode";
      case He:
        return "Suspense";
      case at:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case cn:
        return (e.displayName || "Context") + ".Consumer";
      case Ct:
        return (e._context.displayName || "Context") + ".Provider";
      case wt:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case xt:
        return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
      case Fe:
        t = e._payload, e = e._init;
        try {
          return ne(e(t));
        } catch {
        }
    }
    return null;
  }
  function oe(e) {
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
        return ne(t);
      case 8:
        return t === Je ? "StrictMode" : "Mode";
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
  function le(e) {
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
  function de(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Qe(e) {
    var t = de(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(d) {
        r = "" + d, o.call(this, d);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(d) {
        r = "" + d;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Hr(e) {
    e._valueTracker || (e._valueTracker = Qe(e));
  }
  function Po(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = de(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Qr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function pi(e, t) {
    var n = t.checked;
    return F({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Ro(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = le(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Lo(e, t) {
    t = t.checked, t != null && je(e, "checked", t, !1);
  }
  function hi(e, t) {
    Lo(e, t);
    var n = le(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? mi(e, t.type, n) : t.hasOwnProperty("defaultValue") && mi(e, t.type, le(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Oo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function mi(e, t, n) {
    (t !== "number" || Qr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var ir = Array.isArray;
  function Nn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + le(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function gi(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return F({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function zo(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(s(92));
        if (ir(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: le(n) };
  }
  function Ao(e, t) {
    var n = le(t.value), r = le(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Mo(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function bo(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function yi(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? bo(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Yr, Do = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Yr = Yr || document.createElement("div"), Yr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Yr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function sr(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var or = {
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
  }, Rd = ["Webkit", "ms", "Moz", "O"];
  Object.keys(or).forEach(function(e) {
    Rd.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), or[t] = or[e];
    });
  });
  function Fo(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || or.hasOwnProperty(e) && or[e] ? ("" + t).trim() : t + "px";
  }
  function Xo(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = Fo(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var Ld = F({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function vi(e, t) {
    if (t) {
      if (Ld[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function wi(e, t) {
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
  var xi = null;
  function ki(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Si = null, Cn = null, In = null;
  function Wo(e) {
    if (e = Tr(e)) {
      if (typeof Si != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = vl(t), Si(e.stateNode, e.type, t));
    }
  }
  function Uo(e) {
    Cn ? In ? In.push(e) : In = [e] : Cn = e;
  }
  function Zo() {
    if (Cn) {
      var e = Cn, t = In;
      if (In = Cn = null, Wo(e), t) for (e = 0; e < t.length; e++) Wo(t[e]);
    }
  }
  function Bo(e, t) {
    return e(t);
  }
  function Vo() {
  }
  var ji = !1;
  function Ho(e, t, n) {
    if (ji) return e(t, n);
    ji = !0;
    try {
      return Bo(e, t, n);
    } finally {
      ji = !1, (Cn !== null || In !== null) && (Vo(), Zo());
    }
  }
  function ur(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = vl(n);
    if (r === null) return null;
    n = r[t];
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
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var Ei = !1;
  if (j) try {
    var ar = {};
    Object.defineProperty(ar, "passive", { get: function() {
      Ei = !0;
    } }), window.addEventListener("test", ar, ar), window.removeEventListener("test", ar, ar);
  } catch {
    Ei = !1;
  }
  function Od(e, t, n, r, i, o, d, p, h) {
    var k = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, k);
    } catch (_) {
      this.onError(_);
    }
  }
  var cr = !1, qr = null, Gr = !1, Ni = null, zd = { onError: function(e) {
    cr = !0, qr = e;
  } };
  function Ad(e, t, n, r, i, o, d, p, h) {
    cr = !1, qr = null, Od.apply(zd, arguments);
  }
  function Md(e, t, n, r, i, o, d, p, h) {
    if (Ad.apply(this, arguments), cr) {
      if (cr) {
        var k = qr;
        cr = !1, qr = null;
      } else throw Error(s(198));
      Gr || (Gr = !0, Ni = k);
    }
  }
  function dn(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Qo(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Yo(e) {
    if (dn(e) !== e) throw Error(s(188));
  }
  function bd(e) {
    var t = e.alternate;
    if (!t) {
      if (t = dn(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var o = i.alternate;
      if (o === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (o = i.child; o; ) {
          if (o === n) return Yo(i), e;
          if (o === r) return Yo(i), t;
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = i, r = o;
      else {
        for (var d = !1, p = i.child; p; ) {
          if (p === n) {
            d = !0, n = i, r = o;
            break;
          }
          if (p === r) {
            d = !0, r = i, n = o;
            break;
          }
          p = p.sibling;
        }
        if (!d) {
          for (p = o.child; p; ) {
            if (p === n) {
              d = !0, n = o, r = i;
              break;
            }
            if (p === r) {
              d = !0, r = o, n = i;
              break;
            }
            p = p.sibling;
          }
          if (!d) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function qo(e) {
    return e = bd(e), e !== null ? Go(e) : null;
  }
  function Go(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Go(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ko = u.unstable_scheduleCallback, Jo = u.unstable_cancelCallback, Dd = u.unstable_shouldYield, Fd = u.unstable_requestPaint, ye = u.unstable_now, Xd = u.unstable_getCurrentPriorityLevel, Ci = u.unstable_ImmediatePriority, eu = u.unstable_UserBlockingPriority, Kr = u.unstable_NormalPriority, Wd = u.unstable_LowPriority, tu = u.unstable_IdlePriority, Jr = null, kt = null;
  function Ud(e) {
    if (kt && typeof kt.onCommitFiberRoot == "function") try {
      kt.onCommitFiberRoot(Jr, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var ct = Math.clz32 ? Math.clz32 : Vd, Zd = Math.log, Bd = Math.LN2;
  function Vd(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Zd(e) / Bd | 0) | 0;
  }
  var el = 64, tl = 4194304;
  function dr(e) {
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
  function nl(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, i = e.suspendedLanes, o = e.pingedLanes, d = n & 268435455;
    if (d !== 0) {
      var p = d & ~i;
      p !== 0 ? r = dr(p) : (o &= d, o !== 0 && (r = dr(o)));
    } else d = n & ~i, d !== 0 ? r = dr(d) : o !== 0 && (r = dr(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ct(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function Hd(e, t) {
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
  function Qd(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var d = 31 - ct(o), p = 1 << d, h = i[d];
      h === -1 ? ((p & n) === 0 || (p & r) !== 0) && (i[d] = Hd(p, t)) : h <= t && (e.expiredLanes |= p), o &= ~p;
    }
  }
  function Ii(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function nu() {
    var e = el;
    return el <<= 1, (el & 4194240) === 0 && (el = 64), e;
  }
  function _i(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function fr(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ct(t), e[t] = n;
  }
  function Yd(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - ct(n), o = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
    }
  }
  function Ti(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - ct(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var ie = 0;
  function ru(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var lu, $i, iu, su, ou, Pi = !1, rl = [], Mt = null, bt = null, Dt = null, pr = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new Map(), Ft = [], qd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function uu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Mt = null;
        break;
      case "dragenter":
      case "dragleave":
        bt = null;
        break;
      case "mouseover":
      case "mouseout":
        Dt = null;
        break;
      case "pointerover":
      case "pointerout":
        pr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hr.delete(t.pointerId);
    }
  }
  function mr(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = Tr(t), t !== null && $i(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Gd(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return Mt = mr(Mt, e, t, n, r, i), !0;
      case "dragenter":
        return bt = mr(bt, e, t, n, r, i), !0;
      case "mouseover":
        return Dt = mr(Dt, e, t, n, r, i), !0;
      case "pointerover":
        var o = i.pointerId;
        return pr.set(o, mr(pr.get(o) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return o = i.pointerId, hr.set(o, mr(hr.get(o) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function au(e) {
    var t = fn(e.target);
    if (t !== null) {
      var n = dn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Qo(n), t !== null) {
            e.blockedOn = t, ou(e.priority, function() {
              iu(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ll(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Li(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        xi = r, n.target.dispatchEvent(r), xi = null;
      } else return t = Tr(n), t !== null && $i(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function cu(e, t, n) {
    ll(e) && n.delete(t);
  }
  function Kd() {
    Pi = !1, Mt !== null && ll(Mt) && (Mt = null), bt !== null && ll(bt) && (bt = null), Dt !== null && ll(Dt) && (Dt = null), pr.forEach(cu), hr.forEach(cu);
  }
  function gr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Pi || (Pi = !0, u.unstable_scheduleCallback(u.unstable_NormalPriority, Kd)));
  }
  function yr(e) {
    function t(i) {
      return gr(i, e);
    }
    if (0 < rl.length) {
      gr(rl[0], e);
      for (var n = 1; n < rl.length; n++) {
        var r = rl[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Mt !== null && gr(Mt, e), bt !== null && gr(bt, e), Dt !== null && gr(Dt, e), pr.forEach(t), hr.forEach(t), n = 0; n < Ft.length; n++) r = Ft[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Ft.length && (n = Ft[0], n.blockedOn === null); ) au(n), n.blockedOn === null && Ft.shift();
  }
  var _n = Te.ReactCurrentBatchConfig, il = !0;
  function Jd(e, t, n, r) {
    var i = ie, o = _n.transition;
    _n.transition = null;
    try {
      ie = 1, Ri(e, t, n, r);
    } finally {
      ie = i, _n.transition = o;
    }
  }
  function ef(e, t, n, r) {
    var i = ie, o = _n.transition;
    _n.transition = null;
    try {
      ie = 4, Ri(e, t, n, r);
    } finally {
      ie = i, _n.transition = o;
    }
  }
  function Ri(e, t, n, r) {
    if (il) {
      var i = Li(e, t, n, r);
      if (i === null) qi(e, t, r, sl, n), uu(e, r);
      else if (Gd(i, e, t, n, r)) r.stopPropagation();
      else if (uu(e, r), t & 4 && -1 < qd.indexOf(e)) {
        for (; i !== null; ) {
          var o = Tr(i);
          if (o !== null && lu(o), o = Li(e, t, n, r), o === null && qi(e, t, r, sl, n), o === i) break;
          i = o;
        }
        i !== null && r.stopPropagation();
      } else qi(e, t, r, null, n);
    }
  }
  var sl = null;
  function Li(e, t, n, r) {
    if (sl = null, e = ki(r), e = fn(e), e !== null) if (t = dn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = Qo(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return sl = e, null;
  }
  function du(e) {
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
        switch (Xd()) {
          case Ci:
            return 1;
          case eu:
            return 4;
          case Kr:
          case Wd:
            return 16;
          case tu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Xt = null, Oi = null, ol = null;
  function fu() {
    if (ol) return ol;
    var e, t = Oi, n = t.length, r, i = "value" in Xt ? Xt.value : Xt.textContent, o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var d = n - e;
    for (r = 1; r <= d && t[n - r] === i[o - r]; r++) ;
    return ol = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function ul(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function al() {
    return !0;
  }
  function pu() {
    return !1;
  }
  function Ye(e) {
    function t(n, r, i, o, d) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = d, this.currentTarget = null;
      for (var p in e) e.hasOwnProperty(p) && (n = e[p], this[p] = n ? n(o) : o[p]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? al : pu, this.isPropagationStopped = pu, this;
    }
    return F(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = al);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = al);
    }, persist: function() {
    }, isPersistent: al }), t;
  }
  var Tn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, zi = Ye(Tn), vr = F({}, Tn, { view: 0, detail: 0 }), tf = Ye(vr), Ai, Mi, wr, cl = F({}, vr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Di, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== wr && (wr && e.type === "mousemove" ? (Ai = e.screenX - wr.screenX, Mi = e.screenY - wr.screenY) : Mi = Ai = 0, wr = e), Ai);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Mi;
  } }), hu = Ye(cl), nf = F({}, cl, { dataTransfer: 0 }), rf = Ye(nf), lf = F({}, vr, { relatedTarget: 0 }), bi = Ye(lf), sf = F({}, Tn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), of = Ye(sf), uf = F({}, Tn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), af = Ye(uf), cf = F({}, Tn, { data: 0 }), mu = Ye(cf), df = {
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
  }, ff = {
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
  }, pf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function hf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = pf[e]) ? !!t[e] : !1;
  }
  function Di() {
    return hf;
  }
  var mf = F({}, vr, { key: function(e) {
    if (e.key) {
      var t = df[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = ul(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ff[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Di, charCode: function(e) {
    return e.type === "keypress" ? ul(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ul(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), gf = Ye(mf), yf = F({}, cl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), gu = Ye(yf), vf = F({}, vr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Di }), wf = Ye(vf), xf = F({}, Tn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), kf = Ye(xf), Sf = F({}, cl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), jf = Ye(Sf), Ef = [9, 13, 27, 32], Fi = j && "CompositionEvent" in window, xr = null;
  j && "documentMode" in document && (xr = document.documentMode);
  var Nf = j && "TextEvent" in window && !xr, yu = j && (!Fi || xr && 8 < xr && 11 >= xr), vu = " ", wu = !1;
  function xu(e, t) {
    switch (e) {
      case "keyup":
        return Ef.indexOf(t.keyCode) !== -1;
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
  function ku(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $n = !1;
  function Cf(e, t) {
    switch (e) {
      case "compositionend":
        return ku(t);
      case "keypress":
        return t.which !== 32 ? null : (wu = !0, vu);
      case "textInput":
        return e = t.data, e === vu && wu ? null : e;
      default:
        return null;
    }
  }
  function If(e, t) {
    if ($n) return e === "compositionend" || !Fi && xu(e, t) ? (e = fu(), ol = Oi = Xt = null, $n = !1, e) : null;
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
        return yu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _f = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_f[e.type] : t === "textarea";
  }
  function ju(e, t, n, r) {
    Uo(r), t = ml(t, "onChange"), 0 < t.length && (n = new zi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var kr = null, Sr = null;
  function Tf(e) {
    Xu(e, 0);
  }
  function dl(e) {
    var t = zn(e);
    if (Po(t)) return e;
  }
  function $f(e, t) {
    if (e === "change") return t;
  }
  var Eu = !1;
  if (j) {
    var Xi;
    if (j) {
      var Wi = "oninput" in document;
      if (!Wi) {
        var Nu = document.createElement("div");
        Nu.setAttribute("oninput", "return;"), Wi = typeof Nu.oninput == "function";
      }
      Xi = Wi;
    } else Xi = !1;
    Eu = Xi && (!document.documentMode || 9 < document.documentMode);
  }
  function Cu() {
    kr && (kr.detachEvent("onpropertychange", Iu), Sr = kr = null);
  }
  function Iu(e) {
    if (e.propertyName === "value" && dl(Sr)) {
      var t = [];
      ju(t, Sr, e, ki(e)), Ho(Tf, t);
    }
  }
  function Pf(e, t, n) {
    e === "focusin" ? (Cu(), kr = t, Sr = n, kr.attachEvent("onpropertychange", Iu)) : e === "focusout" && Cu();
  }
  function Rf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return dl(Sr);
  }
  function Lf(e, t) {
    if (e === "click") return dl(t);
  }
  function Of(e, t) {
    if (e === "input" || e === "change") return dl(t);
  }
  function zf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var dt = typeof Object.is == "function" ? Object.is : zf;
  function jr(e, t) {
    if (dt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!S.call(t, i) || !dt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function _u(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Tu(e, t) {
    var n = _u(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = _u(n);
    }
  }
  function $u(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? $u(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Pu() {
    for (var e = window, t = Qr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Qr(e.document);
    }
    return t;
  }
  function Ui(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Af(e) {
    var t = Pu(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && $u(n.ownerDocument.documentElement, n)) {
      if (r !== null && Ui(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, o = Math.min(r.start, i);
          r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Tu(n, o);
          var d = Tu(
            n,
            r
          );
          i && d && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== d.node || e.focusOffset !== d.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(d.node, d.offset)) : (t.setEnd(d.node, d.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Mf = j && "documentMode" in document && 11 >= document.documentMode, Pn = null, Zi = null, Er = null, Bi = !1;
  function Ru(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Bi || Pn == null || Pn !== Qr(r) || (r = Pn, "selectionStart" in r && Ui(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Er && jr(Er, r) || (Er = r, r = ml(Zi, "onSelect"), 0 < r.length && (t = new zi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Pn)));
  }
  function fl(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Rn = { animationend: fl("Animation", "AnimationEnd"), animationiteration: fl("Animation", "AnimationIteration"), animationstart: fl("Animation", "AnimationStart"), transitionend: fl("Transition", "TransitionEnd") }, Vi = {}, Lu = {};
  j && (Lu = document.createElement("div").style, "AnimationEvent" in window || (delete Rn.animationend.animation, delete Rn.animationiteration.animation, delete Rn.animationstart.animation), "TransitionEvent" in window || delete Rn.transitionend.transition);
  function pl(e) {
    if (Vi[e]) return Vi[e];
    if (!Rn[e]) return e;
    var t = Rn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Lu) return Vi[e] = t[n];
    return e;
  }
  var Ou = pl("animationend"), zu = pl("animationiteration"), Au = pl("animationstart"), Mu = pl("transitionend"), bu = /* @__PURE__ */ new Map(), Du = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Wt(e, t) {
    bu.set(e, t), m(t, [e]);
  }
  for (var Hi = 0; Hi < Du.length; Hi++) {
    var Qi = Du[Hi], bf = Qi.toLowerCase(), Df = Qi[0].toUpperCase() + Qi.slice(1);
    Wt(bf, "on" + Df);
  }
  Wt(Ou, "onAnimationEnd"), Wt(zu, "onAnimationIteration"), Wt(Au, "onAnimationStart"), Wt("dblclick", "onDoubleClick"), Wt("focusin", "onFocus"), Wt("focusout", "onBlur"), Wt(Mu, "onTransitionEnd"), w("onMouseEnter", ["mouseout", "mouseover"]), w("onMouseLeave", ["mouseout", "mouseover"]), w("onPointerEnter", ["pointerout", "pointerover"]), w("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Nr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ff = new Set("cancel close invalid load scroll toggle".split(" ").concat(Nr));
  function Fu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Md(r, t, void 0, e), e.currentTarget = null;
  }
  function Xu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var d = r.length - 1; 0 <= d; d--) {
          var p = r[d], h = p.instance, k = p.currentTarget;
          if (p = p.listener, h !== o && i.isPropagationStopped()) break e;
          Fu(i, p, k), o = h;
        }
        else for (d = 0; d < r.length; d++) {
          if (p = r[d], h = p.instance, k = p.currentTarget, p = p.listener, h !== o && i.isPropagationStopped()) break e;
          Fu(i, p, k), o = h;
        }
      }
    }
    if (Gr) throw e = Ni, Gr = !1, Ni = null, e;
  }
  function ae(e, t) {
    var n = t[ns];
    n === void 0 && (n = t[ns] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Wu(t, e, 2, !1), n.add(r));
  }
  function Yi(e, t, n) {
    var r = 0;
    t && (r |= 4), Wu(n, e, r, t);
  }
  var hl = "_reactListening" + Math.random().toString(36).slice(2);
  function Cr(e) {
    if (!e[hl]) {
      e[hl] = !0, c.forEach(function(n) {
        n !== "selectionchange" && (Ff.has(n) || Yi(n, !1, e), Yi(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[hl] || (t[hl] = !0, Yi("selectionchange", !1, t));
    }
  }
  function Wu(e, t, n, r) {
    switch (du(t)) {
      case 1:
        var i = Jd;
        break;
      case 4:
        i = ef;
        break;
      default:
        i = Ri;
    }
    n = i.bind(null, t, n, e), i = void 0, !Ei || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function qi(e, t, n, r, i) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var d = r.tag;
      if (d === 3 || d === 4) {
        var p = r.stateNode.containerInfo;
        if (p === i || p.nodeType === 8 && p.parentNode === i) break;
        if (d === 4) for (d = r.return; d !== null; ) {
          var h = d.tag;
          if ((h === 3 || h === 4) && (h = d.stateNode.containerInfo, h === i || h.nodeType === 8 && h.parentNode === i)) return;
          d = d.return;
        }
        for (; p !== null; ) {
          if (d = fn(p), d === null) return;
          if (h = d.tag, h === 5 || h === 6) {
            r = o = d;
            continue e;
          }
          p = p.parentNode;
        }
      }
      r = r.return;
    }
    Ho(function() {
      var k = o, _ = ki(n), $ = [];
      e: {
        var N = bu.get(e);
        if (N !== void 0) {
          var b = zi, X = e;
          switch (e) {
            case "keypress":
              if (ul(n) === 0) break e;
            case "keydown":
            case "keyup":
              b = gf;
              break;
            case "focusin":
              X = "focus", b = bi;
              break;
            case "focusout":
              X = "blur", b = bi;
              break;
            case "beforeblur":
            case "afterblur":
              b = bi;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = hu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = rf;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = wf;
              break;
            case Ou:
            case zu:
            case Au:
              b = of;
              break;
            case Mu:
              b = kf;
              break;
            case "scroll":
              b = tf;
              break;
            case "wheel":
              b = jf;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = af;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = gu;
          }
          var W = (t & 4) !== 0, ve = !W && e === "scroll", v = W ? N !== null ? N + "Capture" : null : N;
          W = [];
          for (var g = k, x; g !== null; ) {
            x = g;
            var P = x.stateNode;
            if (x.tag === 5 && P !== null && (x = P, v !== null && (P = ur(g, v), P != null && W.push(Ir(g, P, x)))), ve) break;
            g = g.return;
          }
          0 < W.length && (N = new b(N, X, null, n, _), $.push({ event: N, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (N = e === "mouseover" || e === "pointerover", b = e === "mouseout" || e === "pointerout", N && n !== xi && (X = n.relatedTarget || n.fromElement) && (fn(X) || X[It])) break e;
          if ((b || N) && (N = _.window === _ ? _ : (N = _.ownerDocument) ? N.defaultView || N.parentWindow : window, b ? (X = n.relatedTarget || n.toElement, b = k, X = X ? fn(X) : null, X !== null && (ve = dn(X), X !== ve || X.tag !== 5 && X.tag !== 6) && (X = null)) : (b = null, X = k), b !== X)) {
            if (W = hu, P = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (W = gu, P = "onPointerLeave", v = "onPointerEnter", g = "pointer"), ve = b == null ? N : zn(b), x = X == null ? N : zn(X), N = new W(P, g + "leave", b, n, _), N.target = ve, N.relatedTarget = x, P = null, fn(_) === k && (W = new W(v, g + "enter", X, n, _), W.target = x, W.relatedTarget = ve, P = W), ve = P, b && X) t: {
              for (W = b, v = X, g = 0, x = W; x; x = Ln(x)) g++;
              for (x = 0, P = v; P; P = Ln(P)) x++;
              for (; 0 < g - x; ) W = Ln(W), g--;
              for (; 0 < x - g; ) v = Ln(v), x--;
              for (; g--; ) {
                if (W === v || v !== null && W === v.alternate) break t;
                W = Ln(W), v = Ln(v);
              }
              W = null;
            }
            else W = null;
            b !== null && Uu($, N, b, W, !1), X !== null && ve !== null && Uu($, ve, X, W, !0);
          }
        }
        e: {
          if (N = k ? zn(k) : window, b = N.nodeName && N.nodeName.toLowerCase(), b === "select" || b === "input" && N.type === "file") var U = $f;
          else if (Su(N)) if (Eu) U = Of;
          else {
            U = Rf;
            var B = Pf;
          }
          else (b = N.nodeName) && b.toLowerCase() === "input" && (N.type === "checkbox" || N.type === "radio") && (U = Lf);
          if (U && (U = U(e, k))) {
            ju($, U, n, _);
            break e;
          }
          B && B(e, N, k), e === "focusout" && (B = N._wrapperState) && B.controlled && N.type === "number" && mi(N, "number", N.value);
        }
        switch (B = k ? zn(k) : window, e) {
          case "focusin":
            (Su(B) || B.contentEditable === "true") && (Pn = B, Zi = k, Er = null);
            break;
          case "focusout":
            Er = Zi = Pn = null;
            break;
          case "mousedown":
            Bi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bi = !1, Ru($, n, _);
            break;
          case "selectionchange":
            if (Mf) break;
          case "keydown":
          case "keyup":
            Ru($, n, _);
        }
        var V;
        if (Fi) e: {
          switch (e) {
            case "compositionstart":
              var Y = "onCompositionStart";
              break e;
            case "compositionend":
              Y = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Y = "onCompositionUpdate";
              break e;
          }
          Y = void 0;
        }
        else $n ? xu(e, n) && (Y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Y = "onCompositionStart");
        Y && (yu && n.locale !== "ko" && ($n || Y !== "onCompositionStart" ? Y === "onCompositionEnd" && $n && (V = fu()) : (Xt = _, Oi = "value" in Xt ? Xt.value : Xt.textContent, $n = !0)), B = ml(k, Y), 0 < B.length && (Y = new mu(Y, e, null, n, _), $.push({ event: Y, listeners: B }), V ? Y.data = V : (V = ku(n), V !== null && (Y.data = V)))), (V = Nf ? Cf(e, n) : If(e, n)) && (k = ml(k, "onBeforeInput"), 0 < k.length && (_ = new mu("onBeforeInput", "beforeinput", null, n, _), $.push({ event: _, listeners: k }), _.data = V));
      }
      Xu($, t);
    });
  }
  function Ir(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function ml(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, o = i.stateNode;
      i.tag === 5 && o !== null && (i = o, o = ur(e, n), o != null && r.unshift(Ir(e, o, i)), o = ur(e, t), o != null && r.push(Ir(e, o, i))), e = e.return;
    }
    return r;
  }
  function Ln(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Uu(e, t, n, r, i) {
    for (var o = t._reactName, d = []; n !== null && n !== r; ) {
      var p = n, h = p.alternate, k = p.stateNode;
      if (h !== null && h === r) break;
      p.tag === 5 && k !== null && (p = k, i ? (h = ur(n, o), h != null && d.unshift(Ir(n, h, p))) : i || (h = ur(n, o), h != null && d.push(Ir(n, h, p)))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var Xf = /\r\n?/g, Wf = /\u0000|\uFFFD/g;
  function Zu(e) {
    return (typeof e == "string" ? e : "" + e).replace(Xf, `
`).replace(Wf, "");
  }
  function gl(e, t, n) {
    if (t = Zu(t), Zu(e) !== t && n) throw Error(s(425));
  }
  function yl() {
  }
  var Gi = null, Ki = null;
  function Ji(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var es = typeof setTimeout == "function" ? setTimeout : void 0, Uf = typeof clearTimeout == "function" ? clearTimeout : void 0, Bu = typeof Promise == "function" ? Promise : void 0, Zf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Bu < "u" ? function(e) {
    return Bu.resolve(null).then(e).catch(Bf);
  } : es;
  function Bf(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ts(e, t) {
    var n = t, r = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
        if (r === 0) {
          e.removeChild(i), yr(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = i;
    } while (n);
    yr(t);
  }
  function Ut(e) {
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
  function Vu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var On = Math.random().toString(36).slice(2), St = "__reactFiber$" + On, _r = "__reactProps$" + On, It = "__reactContainer$" + On, ns = "__reactEvents$" + On, Vf = "__reactListeners$" + On, Hf = "__reactHandles$" + On;
  function fn(e) {
    var t = e[St];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[It] || n[St]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Vu(e); e !== null; ) {
          if (n = e[St]) return n;
          e = Vu(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Tr(e) {
    return e = e[St] || e[It], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function zn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function vl(e) {
    return e[_r] || null;
  }
  var rs = [], An = -1;
  function Zt(e) {
    return { current: e };
  }
  function ce(e) {
    0 > An || (e.current = rs[An], rs[An] = null, An--);
  }
  function ue(e, t) {
    An++, rs[An] = e.current, e.current = t;
  }
  var Bt = {}, $e = Zt(Bt), Xe = Zt(!1), pn = Bt;
  function Mn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Bt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, o;
    for (o in n) i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function We(e) {
    return e = e.childContextTypes, e != null;
  }
  function wl() {
    ce(Xe), ce($e);
  }
  function Hu(e, t, n) {
    if ($e.current !== Bt) throw Error(s(168));
    ue($e, t), ue(Xe, n);
  }
  function Qu(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(s(108, oe(e) || "Unknown", i));
    return F({}, n, r);
  }
  function xl(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Bt, pn = $e.current, ue($e, e), ue(Xe, Xe.current), !0;
  }
  function Yu(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = Qu(e, t, pn), r.__reactInternalMemoizedMergedChildContext = e, ce(Xe), ce($e), ue($e, e)) : ce(Xe), ue(Xe, n);
  }
  var _t = null, kl = !1, ls = !1;
  function qu(e) {
    _t === null ? _t = [e] : _t.push(e);
  }
  function Qf(e) {
    kl = !0, qu(e);
  }
  function Vt() {
    if (!ls && _t !== null) {
      ls = !0;
      var e = 0, t = ie;
      try {
        var n = _t;
        for (ie = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        _t = null, kl = !1;
      } catch (i) {
        throw _t !== null && (_t = _t.slice(e + 1)), Ko(Ci, Vt), i;
      } finally {
        ie = t, ls = !1;
      }
    }
    return null;
  }
  var bn = [], Dn = 0, Sl = null, jl = 0, et = [], tt = 0, hn = null, Tt = 1, $t = "";
  function mn(e, t) {
    bn[Dn++] = jl, bn[Dn++] = Sl, Sl = e, jl = t;
  }
  function Gu(e, t, n) {
    et[tt++] = Tt, et[tt++] = $t, et[tt++] = hn, hn = e;
    var r = Tt;
    e = $t;
    var i = 32 - ct(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - ct(t) + i;
    if (30 < o) {
      var d = i - i % 5;
      o = (r & (1 << d) - 1).toString(32), r >>= d, i -= d, Tt = 1 << 32 - ct(t) + i | n << i | r, $t = o + e;
    } else Tt = 1 << o | n << i | r, $t = e;
  }
  function is(e) {
    e.return !== null && (mn(e, 1), Gu(e, 1, 0));
  }
  function ss(e) {
    for (; e === Sl; ) Sl = bn[--Dn], bn[Dn] = null, jl = bn[--Dn], bn[Dn] = null;
    for (; e === hn; ) hn = et[--tt], et[tt] = null, $t = et[--tt], et[tt] = null, Tt = et[--tt], et[tt] = null;
  }
  var qe = null, Ge = null, fe = !1, ft = null;
  function Ku(e, t) {
    var n = it(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Ju(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, qe = e, Ge = Ut(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, qe = e, Ge = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = hn !== null ? { id: Tt, overflow: $t } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = it(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, qe = e, Ge = null, !0) : !1;
      default:
        return !1;
    }
  }
  function os(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function us(e) {
    if (fe) {
      var t = Ge;
      if (t) {
        var n = t;
        if (!Ju(e, t)) {
          if (os(e)) throw Error(s(418));
          t = Ut(n.nextSibling);
          var r = qe;
          t && Ju(e, t) ? Ku(r, n) : (e.flags = e.flags & -4097 | 2, fe = !1, qe = e);
        }
      } else {
        if (os(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, fe = !1, qe = e;
      }
    }
  }
  function ea(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    qe = e;
  }
  function El(e) {
    if (e !== qe) return !1;
    if (!fe) return ea(e), fe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ji(e.type, e.memoizedProps)), t && (t = Ge)) {
      if (os(e)) throw ta(), Error(s(418));
      for (; t; ) Ku(e, t), t = Ut(t.nextSibling);
    }
    if (ea(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Ge = Ut(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Ge = null;
      }
    } else Ge = qe ? Ut(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ta() {
    for (var e = Ge; e; ) e = Ut(e.nextSibling);
  }
  function Fn() {
    Ge = qe = null, fe = !1;
  }
  function as(e) {
    ft === null ? ft = [e] : ft.push(e);
  }
  var Yf = Te.ReactCurrentBatchConfig;
  function $r(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var i = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(d) {
          var p = i.refs;
          d === null ? delete p[o] : p[o] = d;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Nl(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function na(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ra(e) {
    function t(v, g) {
      if (e) {
        var x = v.deletions;
        x === null ? (v.deletions = [g], v.flags |= 16) : x.push(g);
      }
    }
    function n(v, g) {
      if (!e) return null;
      for (; g !== null; ) t(v, g), g = g.sibling;
      return null;
    }
    function r(v, g) {
      for (v = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? v.set(g.key, g) : v.set(g.index, g), g = g.sibling;
      return v;
    }
    function i(v, g) {
      return v = en(v, g), v.index = 0, v.sibling = null, v;
    }
    function o(v, g, x) {
      return v.index = x, e ? (x = v.alternate, x !== null ? (x = x.index, x < g ? (v.flags |= 2, g) : x) : (v.flags |= 2, g)) : (v.flags |= 1048576, g);
    }
    function d(v) {
      return e && v.alternate === null && (v.flags |= 2), v;
    }
    function p(v, g, x, P) {
      return g === null || g.tag !== 6 ? (g = eo(x, v.mode, P), g.return = v, g) : (g = i(g, x), g.return = v, g);
    }
    function h(v, g, x, P) {
      var U = x.type;
      return U === De ? _(v, g, x.props.children, P, x.key) : g !== null && (g.elementType === U || typeof U == "object" && U !== null && U.$$typeof === Fe && na(U) === g.type) ? (P = i(g, x.props), P.ref = $r(v, g, x), P.return = v, P) : (P = Yl(x.type, x.key, x.props, null, v.mode, P), P.ref = $r(v, g, x), P.return = v, P);
    }
    function k(v, g, x, P) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = to(x, v.mode, P), g.return = v, g) : (g = i(g, x.children || []), g.return = v, g);
    }
    function _(v, g, x, P, U) {
      return g === null || g.tag !== 7 ? (g = jn(x, v.mode, P, U), g.return = v, g) : (g = i(g, x), g.return = v, g);
    }
    function $(v, g, x) {
      if (typeof g == "string" && g !== "" || typeof g == "number") return g = eo("" + g, v.mode, x), g.return = v, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ut:
            return x = Yl(g.type, g.key, g.props, null, v.mode, x), x.ref = $r(v, null, g), x.return = v, x;
          case ze:
            return g = to(g, v.mode, x), g.return = v, g;
          case Fe:
            var P = g._init;
            return $(v, P(g._payload), x);
        }
        if (ir(g) || Q(g)) return g = jn(g, v.mode, x, null), g.return = v, g;
        Nl(v, g);
      }
      return null;
    }
    function N(v, g, x, P) {
      var U = g !== null ? g.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number") return U !== null ? null : p(v, g, "" + x, P);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ut:
            return x.key === U ? h(v, g, x, P) : null;
          case ze:
            return x.key === U ? k(v, g, x, P) : null;
          case Fe:
            return U = x._init, N(
              v,
              g,
              U(x._payload),
              P
            );
        }
        if (ir(x) || Q(x)) return U !== null ? null : _(v, g, x, P, null);
        Nl(v, x);
      }
      return null;
    }
    function b(v, g, x, P, U) {
      if (typeof P == "string" && P !== "" || typeof P == "number") return v = v.get(x) || null, p(g, v, "" + P, U);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case ut:
            return v = v.get(P.key === null ? x : P.key) || null, h(g, v, P, U);
          case ze:
            return v = v.get(P.key === null ? x : P.key) || null, k(g, v, P, U);
          case Fe:
            var B = P._init;
            return b(v, g, x, B(P._payload), U);
        }
        if (ir(P) || Q(P)) return v = v.get(x) || null, _(g, v, P, U, null);
        Nl(g, P);
      }
      return null;
    }
    function X(v, g, x, P) {
      for (var U = null, B = null, V = g, Y = g = 0, Ce = null; V !== null && Y < x.length; Y++) {
        V.index > Y ? (Ce = V, V = null) : Ce = V.sibling;
        var re = N(v, V, x[Y], P);
        if (re === null) {
          V === null && (V = Ce);
          break;
        }
        e && V && re.alternate === null && t(v, V), g = o(re, g, Y), B === null ? U = re : B.sibling = re, B = re, V = Ce;
      }
      if (Y === x.length) return n(v, V), fe && mn(v, Y), U;
      if (V === null) {
        for (; Y < x.length; Y++) V = $(v, x[Y], P), V !== null && (g = o(V, g, Y), B === null ? U = V : B.sibling = V, B = V);
        return fe && mn(v, Y), U;
      }
      for (V = r(v, V); Y < x.length; Y++) Ce = b(V, v, Y, x[Y], P), Ce !== null && (e && Ce.alternate !== null && V.delete(Ce.key === null ? Y : Ce.key), g = o(Ce, g, Y), B === null ? U = Ce : B.sibling = Ce, B = Ce);
      return e && V.forEach(function(tn) {
        return t(v, tn);
      }), fe && mn(v, Y), U;
    }
    function W(v, g, x, P) {
      var U = Q(x);
      if (typeof U != "function") throw Error(s(150));
      if (x = U.call(x), x == null) throw Error(s(151));
      for (var B = U = null, V = g, Y = g = 0, Ce = null, re = x.next(); V !== null && !re.done; Y++, re = x.next()) {
        V.index > Y ? (Ce = V, V = null) : Ce = V.sibling;
        var tn = N(v, V, re.value, P);
        if (tn === null) {
          V === null && (V = Ce);
          break;
        }
        e && V && tn.alternate === null && t(v, V), g = o(tn, g, Y), B === null ? U = tn : B.sibling = tn, B = tn, V = Ce;
      }
      if (re.done) return n(
        v,
        V
      ), fe && mn(v, Y), U;
      if (V === null) {
        for (; !re.done; Y++, re = x.next()) re = $(v, re.value, P), re !== null && (g = o(re, g, Y), B === null ? U = re : B.sibling = re, B = re);
        return fe && mn(v, Y), U;
      }
      for (V = r(v, V); !re.done; Y++, re = x.next()) re = b(V, v, Y, re.value, P), re !== null && (e && re.alternate !== null && V.delete(re.key === null ? Y : re.key), g = o(re, g, Y), B === null ? U = re : B.sibling = re, B = re);
      return e && V.forEach(function(_0) {
        return t(v, _0);
      }), fe && mn(v, Y), U;
    }
    function ve(v, g, x, P) {
      if (typeof x == "object" && x !== null && x.type === De && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ut:
            e: {
              for (var U = x.key, B = g; B !== null; ) {
                if (B.key === U) {
                  if (U = x.type, U === De) {
                    if (B.tag === 7) {
                      n(v, B.sibling), g = i(B, x.props.children), g.return = v, v = g;
                      break e;
                    }
                  } else if (B.elementType === U || typeof U == "object" && U !== null && U.$$typeof === Fe && na(U) === B.type) {
                    n(v, B.sibling), g = i(B, x.props), g.ref = $r(v, B, x), g.return = v, v = g;
                    break e;
                  }
                  n(v, B);
                  break;
                } else t(v, B);
                B = B.sibling;
              }
              x.type === De ? (g = jn(x.props.children, v.mode, P, x.key), g.return = v, v = g) : (P = Yl(x.type, x.key, x.props, null, v.mode, P), P.ref = $r(v, g, x), P.return = v, v = P);
            }
            return d(v);
          case ze:
            e: {
              for (B = x.key; g !== null; ) {
                if (g.key === B) if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                  n(v, g.sibling), g = i(g, x.children || []), g.return = v, v = g;
                  break e;
                } else {
                  n(v, g);
                  break;
                }
                else t(v, g);
                g = g.sibling;
              }
              g = to(x, v.mode, P), g.return = v, v = g;
            }
            return d(v);
          case Fe:
            return B = x._init, ve(v, g, B(x._payload), P);
        }
        if (ir(x)) return X(v, g, x, P);
        if (Q(x)) return W(v, g, x, P);
        Nl(v, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(v, g.sibling), g = i(g, x), g.return = v, v = g) : (n(v, g), g = eo(x, v.mode, P), g.return = v, v = g), d(v)) : n(v, g);
    }
    return ve;
  }
  var Xn = ra(!0), la = ra(!1), Cl = Zt(null), Il = null, Wn = null, cs = null;
  function ds() {
    cs = Wn = Il = null;
  }
  function fs(e) {
    var t = Cl.current;
    ce(Cl), e._currentValue = t;
  }
  function ps(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Un(e, t) {
    Il = e, cs = Wn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ue = !0), e.firstContext = null);
  }
  function nt(e) {
    var t = e._currentValue;
    if (cs !== e) if (e = { context: e, memoizedValue: t, next: null }, Wn === null) {
      if (Il === null) throw Error(s(308));
      Wn = e, Il.dependencies = { lanes: 0, firstContext: e };
    } else Wn = Wn.next = e;
    return t;
  }
  var gn = null;
  function hs(e) {
    gn === null ? gn = [e] : gn.push(e);
  }
  function ia(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, hs(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Pt(e, r);
  }
  function Pt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ht = !1;
  function ms(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function sa(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Rt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (ee & 2) !== 0) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Pt(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, hs(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Pt(e, n);
  }
  function _l(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Ti(e, n);
    }
  }
  function oa(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var i = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? i = o = d : o = o.next = d, n = n.next;
        } while (n !== null);
        o === null ? i = o = t : o = o.next = t;
      } else i = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Tl(e, t, n, r) {
    var i = e.updateQueue;
    Ht = !1;
    var o = i.firstBaseUpdate, d = i.lastBaseUpdate, p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var h = p, k = h.next;
      h.next = null, d === null ? o = k : d.next = k, d = h;
      var _ = e.alternate;
      _ !== null && (_ = _.updateQueue, p = _.lastBaseUpdate, p !== d && (p === null ? _.firstBaseUpdate = k : p.next = k, _.lastBaseUpdate = h));
    }
    if (o !== null) {
      var $ = i.baseState;
      d = 0, _ = k = h = null, p = o;
      do {
        var N = p.lane, b = p.eventTime;
        if ((r & N) === N) {
          _ !== null && (_ = _.next = {
            eventTime: b,
            lane: 0,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null
          });
          e: {
            var X = e, W = p;
            switch (N = t, b = n, W.tag) {
              case 1:
                if (X = W.payload, typeof X == "function") {
                  $ = X.call(b, $, N);
                  break e;
                }
                $ = X;
                break e;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = W.payload, N = typeof X == "function" ? X.call(b, $, N) : X, N == null) break e;
                $ = F({}, $, N);
                break e;
              case 2:
                Ht = !0;
            }
          }
          p.callback !== null && p.lane !== 0 && (e.flags |= 64, N = i.effects, N === null ? i.effects = [p] : N.push(p));
        } else b = { eventTime: b, lane: N, tag: p.tag, payload: p.payload, callback: p.callback, next: null }, _ === null ? (k = _ = b, h = $) : _ = _.next = b, d |= N;
        if (p = p.next, p === null) {
          if (p = i.shared.pending, p === null) break;
          N = p, p = N.next, N.next = null, i.lastBaseUpdate = N, i.shared.pending = null;
        }
      } while (!0);
      if (_ === null && (h = $), i.baseState = h, i.firstBaseUpdate = k, i.lastBaseUpdate = _, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          d |= i.lane, i = i.next;
        while (i !== t);
      } else o === null && (i.shared.lanes = 0);
      wn |= d, e.lanes = d, e.memoizedState = $;
    }
  }
  function ua(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(s(191, i));
        i.call(r);
      }
    }
  }
  var Pr = {}, jt = Zt(Pr), Rr = Zt(Pr), Lr = Zt(Pr);
  function yn(e) {
    if (e === Pr) throw Error(s(174));
    return e;
  }
  function gs(e, t) {
    switch (ue(Lr, t), ue(Rr, e), ue(jt, Pr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : yi(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = yi(t, e);
    }
    ce(jt), ue(jt, t);
  }
  function Zn() {
    ce(jt), ce(Rr), ce(Lr);
  }
  function aa(e) {
    yn(Lr.current);
    var t = yn(jt.current), n = yi(t, e.type);
    t !== n && (ue(Rr, e), ue(jt, n));
  }
  function ys(e) {
    Rr.current === e && (ce(jt), ce(Rr));
  }
  var pe = Zt(0);
  function $l(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
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
  var vs = [];
  function ws() {
    for (var e = 0; e < vs.length; e++) vs[e]._workInProgressVersionPrimary = null;
    vs.length = 0;
  }
  var Pl = Te.ReactCurrentDispatcher, xs = Te.ReactCurrentBatchConfig, vn = 0, he = null, ke = null, Ee = null, Rl = !1, Or = !1, zr = 0, qf = 0;
  function Pe() {
    throw Error(s(321));
  }
  function ks(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!dt(e[n], t[n])) return !1;
    return !0;
  }
  function Ss(e, t, n, r, i, o) {
    if (vn = o, he = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Pl.current = e === null || e.memoizedState === null ? e0 : t0, e = n(r, i), Or) {
      o = 0;
      do {
        if (Or = !1, zr = 0, 25 <= o) throw Error(s(301));
        o += 1, Ee = ke = null, t.updateQueue = null, Pl.current = n0, e = n(r, i);
      } while (Or);
    }
    if (Pl.current = zl, t = ke !== null && ke.next !== null, vn = 0, Ee = ke = he = null, Rl = !1, t) throw Error(s(300));
    return e;
  }
  function js() {
    var e = zr !== 0;
    return zr = 0, e;
  }
  function Et() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ee === null ? he.memoizedState = Ee = e : Ee = Ee.next = e, Ee;
  }
  function rt() {
    if (ke === null) {
      var e = he.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ke.next;
    var t = Ee === null ? he.memoizedState : Ee.next;
    if (t !== null) Ee = t, ke = e;
    else {
      if (e === null) throw Error(s(310));
      ke = e, e = { memoizedState: ke.memoizedState, baseState: ke.baseState, baseQueue: ke.baseQueue, queue: ke.queue, next: null }, Ee === null ? he.memoizedState = Ee = e : Ee = Ee.next = e;
    }
    return Ee;
  }
  function Ar(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Es(e) {
    var t = rt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = ke, i = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (i !== null) {
        var d = i.next;
        i.next = o.next, o.next = d;
      }
      r.baseQueue = i = o, n.pending = null;
    }
    if (i !== null) {
      o = i.next, r = r.baseState;
      var p = d = null, h = null, k = o;
      do {
        var _ = k.lane;
        if ((vn & _) === _) h !== null && (h = h.next = { lane: 0, action: k.action, hasEagerState: k.hasEagerState, eagerState: k.eagerState, next: null }), r = k.hasEagerState ? k.eagerState : e(r, k.action);
        else {
          var $ = {
            lane: _,
            action: k.action,
            hasEagerState: k.hasEagerState,
            eagerState: k.eagerState,
            next: null
          };
          h === null ? (p = h = $, d = r) : h = h.next = $, he.lanes |= _, wn |= _;
        }
        k = k.next;
      } while (k !== null && k !== o);
      h === null ? d = r : h.next = p, dt(r, t.memoizedState) || (Ue = !0), t.memoizedState = r, t.baseState = d, t.baseQueue = h, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        o = i.lane, he.lanes |= o, wn |= o, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ns(e) {
    var t = rt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, o = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var d = i = i.next;
      do
        o = e(o, d.action), d = d.next;
      while (d !== i);
      dt(o, t.memoizedState) || (Ue = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function ca() {
  }
  function da(e, t) {
    var n = he, r = rt(), i = t(), o = !dt(r.memoizedState, i);
    if (o && (r.memoizedState = i, Ue = !0), r = r.queue, Cs(ha.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Ee !== null && Ee.memoizedState.tag & 1) {
      if (n.flags |= 2048, Mr(9, pa.bind(null, n, r, i, t), void 0, null), Ne === null) throw Error(s(349));
      (vn & 30) !== 0 || fa(n, t, i);
    }
    return i;
  }
  function fa(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = he.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, he.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function pa(e, t, n, r) {
    t.value = n, t.getSnapshot = r, ma(t) && ga(e);
  }
  function ha(e, t, n) {
    return n(function() {
      ma(t) && ga(e);
    });
  }
  function ma(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !dt(e, n);
    } catch {
      return !0;
    }
  }
  function ga(e) {
    var t = Pt(e, 1);
    t !== null && gt(t, e, 1, -1);
  }
  function ya(e) {
    var t = Et();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ar, lastRenderedState: e }, t.queue = e, e = e.dispatch = Jf.bind(null, he, e), [t.memoizedState, e];
  }
  function Mr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = he.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, he.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function va() {
    return rt().memoizedState;
  }
  function Ll(e, t, n, r) {
    var i = Et();
    he.flags |= e, i.memoizedState = Mr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Ol(e, t, n, r) {
    var i = rt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (ke !== null) {
      var d = ke.memoizedState;
      if (o = d.destroy, r !== null && ks(r, d.deps)) {
        i.memoizedState = Mr(t, n, o, r);
        return;
      }
    }
    he.flags |= e, i.memoizedState = Mr(1 | t, n, o, r);
  }
  function wa(e, t) {
    return Ll(8390656, 8, e, t);
  }
  function Cs(e, t) {
    return Ol(2048, 8, e, t);
  }
  function xa(e, t) {
    return Ol(4, 2, e, t);
  }
  function ka(e, t) {
    return Ol(4, 4, e, t);
  }
  function Sa(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function ja(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ol(4, 4, Sa.bind(null, t, e), n);
  }
  function Is() {
  }
  function Ea(e, t) {
    var n = rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ks(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Na(e, t) {
    var n = rt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ks(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Ca(e, t, n) {
    return (vn & 21) === 0 ? (e.baseState && (e.baseState = !1, Ue = !0), e.memoizedState = n) : (dt(n, t) || (n = nu(), he.lanes |= n, wn |= n, e.baseState = !0), t);
  }
  function Gf(e, t) {
    var n = ie;
    ie = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = xs.transition;
    xs.transition = {};
    try {
      e(!1), t();
    } finally {
      ie = n, xs.transition = r;
    }
  }
  function Ia() {
    return rt().memoizedState;
  }
  function Kf(e, t, n) {
    var r = Kt(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, _a(e)) Ta(t, n);
    else if (n = ia(e, t, n, r), n !== null) {
      var i = Me();
      gt(n, e, r, i), $a(n, t, r);
    }
  }
  function Jf(e, t, n) {
    var r = Kt(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (_a(e)) Ta(t, i);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var d = t.lastRenderedState, p = o(d, n);
        if (i.hasEagerState = !0, i.eagerState = p, dt(p, d)) {
          var h = t.interleaved;
          h === null ? (i.next = i, hs(t)) : (i.next = h.next, h.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
      n = ia(e, t, i, r), n !== null && (i = Me(), gt(n, e, r, i), $a(n, t, r));
    }
  }
  function _a(e) {
    var t = e.alternate;
    return e === he || t !== null && t === he;
  }
  function Ta(e, t) {
    Or = Rl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function $a(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Ti(e, n);
    }
  }
  var zl = { readContext: nt, useCallback: Pe, useContext: Pe, useEffect: Pe, useImperativeHandle: Pe, useInsertionEffect: Pe, useLayoutEffect: Pe, useMemo: Pe, useReducer: Pe, useRef: Pe, useState: Pe, useDebugValue: Pe, useDeferredValue: Pe, useTransition: Pe, useMutableSource: Pe, useSyncExternalStore: Pe, useId: Pe, unstable_isNewReconciler: !1 }, e0 = { readContext: nt, useCallback: function(e, t) {
    return Et().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: nt, useEffect: wa, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ll(
      4194308,
      4,
      Sa.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return Ll(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Ll(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Et();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Et();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Kf.bind(null, he, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Et();
    return e = { current: e }, t.memoizedState = e;
  }, useState: ya, useDebugValue: Is, useDeferredValue: function(e) {
    return Et().memoizedState = e;
  }, useTransition: function() {
    var e = ya(!1), t = e[0];
    return e = Gf.bind(null, e[1]), Et().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = he, i = Et();
    if (fe) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), Ne === null) throw Error(s(349));
      (vn & 30) !== 0 || fa(r, t, n);
    }
    i.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return i.queue = o, wa(ha.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, Mr(9, pa.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Et(), t = Ne.identifierPrefix;
    if (fe) {
      var n = $t, r = Tt;
      n = (r & ~(1 << 32 - ct(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = qf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, t0 = {
    readContext: nt,
    useCallback: Ea,
    useContext: nt,
    useEffect: Cs,
    useImperativeHandle: ja,
    useInsertionEffect: xa,
    useLayoutEffect: ka,
    useMemo: Na,
    useReducer: Es,
    useRef: va,
    useState: function() {
      return Es(Ar);
    },
    useDebugValue: Is,
    useDeferredValue: function(e) {
      var t = rt();
      return Ca(t, ke.memoizedState, e);
    },
    useTransition: function() {
      var e = Es(Ar)[0], t = rt().memoizedState;
      return [e, t];
    },
    useMutableSource: ca,
    useSyncExternalStore: da,
    useId: Ia,
    unstable_isNewReconciler: !1
  }, n0 = { readContext: nt, useCallback: Ea, useContext: nt, useEffect: Cs, useImperativeHandle: ja, useInsertionEffect: xa, useLayoutEffect: ka, useMemo: Na, useReducer: Ns, useRef: va, useState: function() {
    return Ns(Ar);
  }, useDebugValue: Is, useDeferredValue: function(e) {
    var t = rt();
    return ke === null ? t.memoizedState = e : Ca(t, ke.memoizedState, e);
  }, useTransition: function() {
    var e = Ns(Ar)[0], t = rt().memoizedState;
    return [e, t];
  }, useMutableSource: ca, useSyncExternalStore: da, useId: Ia, unstable_isNewReconciler: !1 };
  function pt(e, t) {
    if (e && e.defaultProps) {
      t = F({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function _s(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : F({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Al = { isMounted: function(e) {
    return (e = e._reactInternals) ? dn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Me(), i = Kt(e), o = Rt(r, i);
    o.payload = t, n != null && (o.callback = n), t = Qt(e, o, i), t !== null && (gt(t, e, i, r), _l(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Me(), i = Kt(e), o = Rt(r, i);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Qt(e, o, i), t !== null && (gt(t, e, i, r), _l(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Me(), r = Kt(e), i = Rt(n, r);
    i.tag = 2, t != null && (i.callback = t), t = Qt(e, i, r), t !== null && (gt(t, e, r, n), _l(t, e, r));
  } };
  function Pa(e, t, n, r, i, o, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, d) : t.prototype && t.prototype.isPureReactComponent ? !jr(n, r) || !jr(i, o) : !0;
  }
  function Ra(e, t, n) {
    var r = !1, i = Bt, o = t.contextType;
    return typeof o == "object" && o !== null ? o = nt(o) : (i = We(t) ? pn : $e.current, r = t.contextTypes, o = (r = r != null) ? Mn(e, i) : Bt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Al, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function La(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Al.enqueueReplaceState(t, t.state, null);
  }
  function Ts(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, ms(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = nt(o) : (o = We(t) ? pn : $e.current, i.context = Mn(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (_s(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Al.enqueueReplaceState(i, i.state, null), Tl(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Bn(e, t) {
    try {
      var n = "", r = t;
      do
        n += te(r), r = r.return;
      while (r);
      var i = n;
    } catch (o) {
      i = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function $s(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Ps(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var r0 = typeof WeakMap == "function" ? WeakMap : Map;
  function Oa(e, t, n) {
    n = Rt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Ul || (Ul = !0, Vs = r), Ps(e, t);
    }, n;
  }
  function za(e, t, n) {
    n = Rt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        Ps(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      Ps(e, t), typeof r != "function" && (qt === null ? qt = /* @__PURE__ */ new Set([this]) : qt.add(this));
      var d = t.stack;
      this.componentDidCatch(t.value, { componentStack: d !== null ? d : "" });
    }), n;
  }
  function Aa(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new r0();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = y0.bind(null, e, t, n), t.then(e, e));
  }
  function Ma(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function ba(e, t, n, r, i) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Rt(-1, 1), t.tag = 2, Qt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e);
  }
  var l0 = Te.ReactCurrentOwner, Ue = !1;
  function Ae(e, t, n, r) {
    t.child = e === null ? la(t, null, n, r) : Xn(t, e.child, n, r);
  }
  function Da(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return Un(t, i), r = Ss(e, t, n, r, o, i), n = js(), e !== null && !Ue ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Lt(e, t, i)) : (fe && n && is(t), t.flags |= 1, Ae(e, t, r, i), t.child);
  }
  function Fa(e, t, n, r, i) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Js(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Xa(e, t, o, r, i)) : (e = Yl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & i) === 0) {
      var d = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : jr, n(d, r) && e.ref === t.ref) return Lt(e, t, i);
    }
    return t.flags |= 1, e = en(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Xa(e, t, n, r, i) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (jr(o, r) && e.ref === t.ref) if (Ue = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (Ue = !0);
      else return t.lanes = e.lanes, Lt(e, t, i);
    }
    return Rs(e, t, n, r, i);
  }
  function Wa(e, t, n) {
    var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ue(Hn, Ke), Ke |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ue(Hn, Ke), Ke |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, ue(Hn, Ke), Ke |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, ue(Hn, Ke), Ke |= r;
    return Ae(e, t, i, n), t.child;
  }
  function Ua(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Rs(e, t, n, r, i) {
    var o = We(n) ? pn : $e.current;
    return o = Mn(t, o), Un(t, i), n = Ss(e, t, n, r, o, i), r = js(), e !== null && !Ue ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, Lt(e, t, i)) : (fe && r && is(t), t.flags |= 1, Ae(e, t, n, i), t.child);
  }
  function Za(e, t, n, r, i) {
    if (We(n)) {
      var o = !0;
      xl(t);
    } else o = !1;
    if (Un(t, i), t.stateNode === null) bl(e, t), Ra(t, n, r), Ts(t, n, r, i), r = !0;
    else if (e === null) {
      var d = t.stateNode, p = t.memoizedProps;
      d.props = p;
      var h = d.context, k = n.contextType;
      typeof k == "object" && k !== null ? k = nt(k) : (k = We(n) ? pn : $e.current, k = Mn(t, k));
      var _ = n.getDerivedStateFromProps, $ = typeof _ == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      $ || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (p !== r || h !== k) && La(t, d, r, k), Ht = !1;
      var N = t.memoizedState;
      d.state = N, Tl(t, r, d, i), h = t.memoizedState, p !== r || N !== h || Xe.current || Ht ? (typeof _ == "function" && (_s(t, n, _, r), h = t.memoizedState), (p = Ht || Pa(t, n, p, r, N, h, k)) ? ($ || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = h), d.props = r, d.state = h, d.context = k, r = p) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      d = t.stateNode, sa(e, t), p = t.memoizedProps, k = t.type === t.elementType ? p : pt(t.type, p), d.props = k, $ = t.pendingProps, N = d.context, h = n.contextType, typeof h == "object" && h !== null ? h = nt(h) : (h = We(n) ? pn : $e.current, h = Mn(t, h));
      var b = n.getDerivedStateFromProps;
      (_ = typeof b == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (p !== $ || N !== h) && La(t, d, r, h), Ht = !1, N = t.memoizedState, d.state = N, Tl(t, r, d, i);
      var X = t.memoizedState;
      p !== $ || N !== X || Xe.current || Ht ? (typeof b == "function" && (_s(t, n, b, r), X = t.memoizedState), (k = Ht || Pa(t, n, k, r, N, X, h) || !1) ? (_ || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, X, h), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(r, X, h)), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || p === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = X), d.props = r, d.state = X, d.context = h, r = k) : (typeof d.componentDidUpdate != "function" || p === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Ls(e, t, n, r, o, i);
  }
  function Ls(e, t, n, r, i, o) {
    Ua(e, t);
    var d = (t.flags & 128) !== 0;
    if (!r && !d) return i && Yu(t, n, !1), Lt(e, t, o);
    r = t.stateNode, l0.current = t;
    var p = d && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && d ? (t.child = Xn(t, e.child, null, o), t.child = Xn(t, null, p, o)) : Ae(e, t, p, o), t.memoizedState = r.state, i && Yu(t, n, !0), t.child;
  }
  function Ba(e) {
    var t = e.stateNode;
    t.pendingContext ? Hu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Hu(e, t.context, !1), gs(e, t.containerInfo);
  }
  function Va(e, t, n, r, i) {
    return Fn(), as(i), t.flags |= 256, Ae(e, t, n, r), t.child;
  }
  var Os = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zs(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ha(e, t, n) {
    var r = t.pendingProps, i = pe.current, o = !1, d = (t.flags & 128) !== 0, p;
    if ((p = d) || (p = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), p ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ue(pe, i & 1), e === null)
      return us(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (d = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, d = { mode: "hidden", children: d }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = d) : o = ql(d, r, 0, null), e = jn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = zs(n), t.memoizedState = Os, e) : As(t, d));
    if (i = e.memoizedState, i !== null && (p = i.dehydrated, p !== null)) return i0(e, t, d, r, p, i, n);
    if (o) {
      o = r.fallback, d = t.mode, i = e.child, p = i.sibling;
      var h = { mode: "hidden", children: r.children };
      return (d & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = h, t.deletions = null) : (r = en(i, h), r.subtreeFlags = i.subtreeFlags & 14680064), p !== null ? o = en(p, o) : (o = jn(o, d, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, d = e.child.memoizedState, d = d === null ? zs(n) : { baseLanes: d.baseLanes | n, cachePool: null, transitions: d.transitions }, o.memoizedState = d, o.childLanes = e.childLanes & ~n, t.memoizedState = Os, r;
    }
    return o = e.child, e = o.sibling, r = en(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function As(e, t) {
    return t = ql({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Ml(e, t, n, r) {
    return r !== null && as(r), Xn(t, e.child, null, n), e = As(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function i0(e, t, n, r, i, o, d) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = $s(Error(s(422))), Ml(e, t, d, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = ql({ mode: "visible", children: r.children }, i, 0, null), o = jn(o, i, d, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && Xn(t, e.child, null, d), t.child.memoizedState = zs(d), t.memoizedState = Os, o);
    if ((t.mode & 1) === 0) return Ml(e, t, d, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var p = r.dgst;
      return r = p, o = Error(s(419)), r = $s(o, r, void 0), Ml(e, t, d, r);
    }
    if (p = (d & e.childLanes) !== 0, Ue || p) {
      if (r = Ne, r !== null) {
        switch (d & -d) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
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
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        i = (i & (r.suspendedLanes | d)) !== 0 ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Pt(e, i), gt(r, e, i, -1));
      }
      return Ks(), r = $s(Error(s(421))), Ml(e, t, d, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = v0.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Ge = Ut(i.nextSibling), qe = t, fe = !0, ft = null, e !== null && (et[tt++] = Tt, et[tt++] = $t, et[tt++] = hn, Tt = e.id, $t = e.overflow, hn = t), t = As(t, r.children), t.flags |= 4096, t);
  }
  function Qa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), ps(e.return, t, n);
  }
  function Ms(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
  }
  function Ya(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, o = r.tail;
    if (Ae(e, t, r.children, n), r = pe.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Qa(e, n, t);
        else if (e.tag === 19) Qa(e, n, t);
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
      r &= 1;
    }
    if (ue(pe, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && $l(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ms(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && $l(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Ms(t, !0, n, null, o);
        break;
      case "together":
        Ms(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function bl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Lt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), wn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = en(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = en(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function s0(e, t, n) {
    switch (t.tag) {
      case 3:
        Ba(t), Fn();
        break;
      case 5:
        aa(t);
        break;
      case 1:
        We(t.type) && xl(t);
        break;
      case 4:
        gs(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        ue(Cl, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (ue(pe, pe.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Ha(e, t, n) : (ue(pe, pe.current & 1), e = Lt(e, t, n), e !== null ? e.sibling : null);
        ue(pe, pe.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return Ya(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ue(pe, pe.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Wa(e, t, n);
    }
    return Lt(e, t, n);
  }
  var qa, bs, Ga, Ka;
  qa = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, bs = function() {
  }, Ga = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, yn(jt.current);
      var o = null;
      switch (n) {
        case "input":
          i = pi(e, i), r = pi(e, r), o = [];
          break;
        case "select":
          i = F({}, i, { value: void 0 }), r = F({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          i = gi(e, i), r = gi(e, r), o = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = yl);
      }
      vi(n, r);
      var d;
      n = null;
      for (k in i) if (!r.hasOwnProperty(k) && i.hasOwnProperty(k) && i[k] != null) if (k === "style") {
        var p = i[k];
        for (d in p) p.hasOwnProperty(d) && (n || (n = {}), n[d] = "");
      } else k !== "dangerouslySetInnerHTML" && k !== "children" && k !== "suppressContentEditableWarning" && k !== "suppressHydrationWarning" && k !== "autoFocus" && (f.hasOwnProperty(k) ? o || (o = []) : (o = o || []).push(k, null));
      for (k in r) {
        var h = r[k];
        if (p = i?.[k], r.hasOwnProperty(k) && h !== p && (h != null || p != null)) if (k === "style") if (p) {
          for (d in p) !p.hasOwnProperty(d) || h && h.hasOwnProperty(d) || (n || (n = {}), n[d] = "");
          for (d in h) h.hasOwnProperty(d) && p[d] !== h[d] && (n || (n = {}), n[d] = h[d]);
        } else n || (o || (o = []), o.push(
          k,
          n
        )), n = h;
        else k === "dangerouslySetInnerHTML" ? (h = h ? h.__html : void 0, p = p ? p.__html : void 0, h != null && p !== h && (o = o || []).push(k, h)) : k === "children" ? typeof h != "string" && typeof h != "number" || (o = o || []).push(k, "" + h) : k !== "suppressContentEditableWarning" && k !== "suppressHydrationWarning" && (f.hasOwnProperty(k) ? (h != null && k === "onScroll" && ae("scroll", e), o || p === h || (o = [])) : (o = o || []).push(k, h));
      }
      n && (o = o || []).push("style", n);
      var k = o;
      (t.updateQueue = k) && (t.flags |= 4);
    }
  }, Ka = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function br(e, t) {
    if (!fe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function o0(e, t, n) {
    var r = t.pendingProps;
    switch (ss(t), t.tag) {
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
        return Re(t), null;
      case 1:
        return We(t.type) && wl(), Re(t), null;
      case 3:
        return r = t.stateNode, Zn(), ce(Xe), ce($e), ws(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (El(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ft !== null && (Ys(ft), ft = null))), bs(e, t), Re(t), null;
      case 5:
        ys(t);
        var i = yn(Lr.current);
        if (n = t.type, e !== null && t.stateNode != null) Ga(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return Re(t), null;
          }
          if (e = yn(jt.current), El(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[St] = t, r[_r] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                ae("cancel", r), ae("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ae("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Nr.length; i++) ae(Nr[i], r);
                break;
              case "source":
                ae("error", r);
                break;
              case "img":
              case "image":
              case "link":
                ae(
                  "error",
                  r
                ), ae("load", r);
                break;
              case "details":
                ae("toggle", r);
                break;
              case "input":
                Ro(r, o), ae("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, ae("invalid", r);
                break;
              case "textarea":
                zo(r, o), ae("invalid", r);
            }
            vi(n, o), i = null;
            for (var d in o) if (o.hasOwnProperty(d)) {
              var p = o[d];
              d === "children" ? typeof p == "string" ? r.textContent !== p && (o.suppressHydrationWarning !== !0 && gl(r.textContent, p, e), i = ["children", p]) : typeof p == "number" && r.textContent !== "" + p && (o.suppressHydrationWarning !== !0 && gl(
                r.textContent,
                p,
                e
              ), i = ["children", "" + p]) : f.hasOwnProperty(d) && p != null && d === "onScroll" && ae("scroll", r);
            }
            switch (n) {
              case "input":
                Hr(r), Oo(r, o, !0);
                break;
              case "textarea":
                Hr(r), Mo(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = yl);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            d = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = bo(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = d.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = d.createElement(n, { is: r.is }) : (e = d.createElement(n), n === "select" && (d = e, r.multiple ? d.multiple = !0 : r.size && (d.size = r.size))) : e = d.createElementNS(e, n), e[St] = t, e[_r] = r, qa(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (d = wi(n, r), n) {
                case "dialog":
                  ae("cancel", e), ae("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  ae("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Nr.length; i++) ae(Nr[i], e);
                  i = r;
                  break;
                case "source":
                  ae("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  ae(
                    "error",
                    e
                  ), ae("load", e), i = r;
                  break;
                case "details":
                  ae("toggle", e), i = r;
                  break;
                case "input":
                  Ro(e, r), i = pi(e, r), ae("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = F({}, r, { value: void 0 }), ae("invalid", e);
                  break;
                case "textarea":
                  zo(e, r), i = gi(e, r), ae("invalid", e);
                  break;
                default:
                  i = r;
              }
              vi(n, i), p = i;
              for (o in p) if (p.hasOwnProperty(o)) {
                var h = p[o];
                o === "style" ? Xo(e, h) : o === "dangerouslySetInnerHTML" ? (h = h ? h.__html : void 0, h != null && Do(e, h)) : o === "children" ? typeof h == "string" ? (n !== "textarea" || h !== "") && sr(e, h) : typeof h == "number" && sr(e, "" + h) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (f.hasOwnProperty(o) ? h != null && o === "onScroll" && ae("scroll", e) : h != null && je(e, o, h, d));
              }
              switch (n) {
                case "input":
                  Hr(e), Oo(e, r, !1);
                  break;
                case "textarea":
                  Hr(e), Mo(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + le(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? Nn(e, !!r.multiple, o, !1) : r.defaultValue != null && Nn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = yl);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Re(t), null;
      case 6:
        if (e && t.stateNode != null) Ka(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = yn(Lr.current), yn(jt.current), El(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[St] = t, (o = r.nodeValue !== n) && (e = qe, e !== null)) switch (e.tag) {
              case 3:
                gl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && gl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[St] = t, t.stateNode = r;
        }
        return Re(t), null;
      case 13:
        if (ce(pe), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (fe && Ge !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ta(), Fn(), t.flags |= 98560, o = !1;
          else if (o = El(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[St] = t;
            } else Fn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), o = !1;
          } else ft !== null && (Ys(ft), ft = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (pe.current & 1) !== 0 ? Se === 0 && (Se = 3) : Ks())), t.updateQueue !== null && (t.flags |= 4), Re(t), null);
      case 4:
        return Zn(), bs(e, t), e === null && Cr(t.stateNode.containerInfo), Re(t), null;
      case 10:
        return fs(t.type._context), Re(t), null;
      case 17:
        return We(t.type) && wl(), Re(t), null;
      case 19:
        if (ce(pe), o = t.memoizedState, o === null) return Re(t), null;
        if (r = (t.flags & 128) !== 0, d = o.rendering, d === null) if (r) br(o, !1);
        else {
          if (Se !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (d = $l(e), d !== null) {
              for (t.flags |= 128, br(o, !1), r = d.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, d = o.alternate, d === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = d.childLanes, o.lanes = d.lanes, o.child = d.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = d.memoizedProps, o.memoizedState = d.memoizedState, o.updateQueue = d.updateQueue, o.type = d.type, e = d.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return ue(pe, pe.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && ye() > Qn && (t.flags |= 128, r = !0, br(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = $l(d), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), br(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !fe) return Re(t), null;
          } else 2 * ye() - o.renderingStartTime > Qn && n !== 1073741824 && (t.flags |= 128, r = !0, br(o, !1), t.lanes = 4194304);
          o.isBackwards ? (d.sibling = t.child, t.child = d) : (n = o.last, n !== null ? n.sibling = d : t.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ye(), t.sibling = null, n = pe.current, ue(pe, r ? n & 1 | 2 : n & 1), t) : (Re(t), null);
      case 22:
      case 23:
        return Gs(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (Ke & 1073741824) !== 0 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Re(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function u0(e, t) {
    switch (ss(t), t.tag) {
      case 1:
        return We(t.type) && wl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Zn(), ce(Xe), ce($e), ws(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ys(t), null;
      case 13:
        if (ce(pe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Fn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ce(pe), null;
      case 4:
        return Zn(), null;
      case 10:
        return fs(t.type._context), null;
      case 22:
      case 23:
        return Gs(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Dl = !1, Le = !1, a0 = typeof WeakSet == "function" ? WeakSet : Set, D = null;
  function Vn(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      ge(e, t, r);
    }
    else n.current = null;
  }
  function Ds(e, t, n) {
    try {
      n();
    } catch (r) {
      ge(e, t, r);
    }
  }
  var Ja = !1;
  function c0(e, t) {
    if (Gi = il, e = Pu(), Ui(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var d = 0, p = -1, h = -1, k = 0, _ = 0, $ = e, N = null;
          t: for (; ; ) {
            for (var b; $ !== n || i !== 0 && $.nodeType !== 3 || (p = d + i), $ !== o || r !== 0 && $.nodeType !== 3 || (h = d + r), $.nodeType === 3 && (d += $.nodeValue.length), (b = $.firstChild) !== null; )
              N = $, $ = b;
            for (; ; ) {
              if ($ === e) break t;
              if (N === n && ++k === i && (p = d), N === o && ++_ === r && (h = d), (b = $.nextSibling) !== null) break;
              $ = N, N = $.parentNode;
            }
            $ = b;
          }
          n = p === -1 || h === -1 ? null : { start: p, end: h };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Ki = { focusedElem: e, selectionRange: n }, il = !1, D = t; D !== null; ) if (t = D, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, D = e;
    else for (; D !== null; ) {
      t = D;
      try {
        var X = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (X !== null) {
              var W = X.memoizedProps, ve = X.memoizedState, v = t.stateNode, g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? W : pt(t.type, W), ve);
              v.__reactInternalSnapshotBeforeUpdate = g;
            }
            break;
          case 3:
            var x = t.stateNode.containerInfo;
            x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (P) {
        ge(t, t.return, P);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, D = e;
        break;
      }
      D = t.return;
    }
    return X = Ja, Ja = !1, X;
  }
  function Dr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.destroy;
          i.destroy = void 0, o !== void 0 && Ds(t, n, o);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function Fl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Fs(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function ec(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ec(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[St], delete t[_r], delete t[ns], delete t[Vf], delete t[Hf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function tc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function nc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || tc(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Xs(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = yl));
    else if (r !== 4 && (e = e.child, e !== null)) for (Xs(e, t, n), e = e.sibling; e !== null; ) Xs(e, t, n), e = e.sibling;
  }
  function Ws(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Ws(e, t, n), e = e.sibling; e !== null; ) Ws(e, t, n), e = e.sibling;
  }
  var Ie = null, ht = !1;
  function Yt(e, t, n) {
    for (n = n.child; n !== null; ) rc(e, t, n), n = n.sibling;
  }
  function rc(e, t, n) {
    if (kt && typeof kt.onCommitFiberUnmount == "function") try {
      kt.onCommitFiberUnmount(Jr, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Le || Vn(n, t);
      case 6:
        var r = Ie, i = ht;
        Ie = null, Yt(e, t, n), Ie = r, ht = i, Ie !== null && (ht ? (e = Ie, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Ie.removeChild(n.stateNode));
        break;
      case 18:
        Ie !== null && (ht ? (e = Ie, n = n.stateNode, e.nodeType === 8 ? ts(e.parentNode, n) : e.nodeType === 1 && ts(e, n), yr(e)) : ts(Ie, n.stateNode));
        break;
      case 4:
        r = Ie, i = ht, Ie = n.stateNode.containerInfo, ht = !0, Yt(e, t, n), Ie = r, ht = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Le && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var o = i, d = o.destroy;
            o = o.tag, d !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Ds(n, t, d), i = i.next;
          } while (i !== r);
        }
        Yt(e, t, n);
        break;
      case 1:
        if (!Le && (Vn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (p) {
          ge(n, t, p);
        }
        Yt(e, t, n);
        break;
      case 21:
        Yt(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Le = (r = Le) || n.memoizedState !== null, Yt(e, t, n), Le = r) : Yt(e, t, n);
        break;
      default:
        Yt(e, t, n);
    }
  }
  function lc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new a0()), t.forEach(function(r) {
        var i = w0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function mt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e, d = t, p = d;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 5:
              Ie = p.stateNode, ht = !1;
              break e;
            case 3:
              Ie = p.stateNode.containerInfo, ht = !0;
              break e;
            case 4:
              Ie = p.stateNode.containerInfo, ht = !0;
              break e;
          }
          p = p.return;
        }
        if (Ie === null) throw Error(s(160));
        rc(o, d, i), Ie = null, ht = !1;
        var h = i.alternate;
        h !== null && (h.return = null), i.return = null;
      } catch (k) {
        ge(i, t, k);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ic(t, e), t = t.sibling;
  }
  function ic(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (mt(t, e), Nt(e), r & 4) {
          try {
            Dr(3, e, e.return), Fl(3, e);
          } catch (W) {
            ge(e, e.return, W);
          }
          try {
            Dr(5, e, e.return);
          } catch (W) {
            ge(e, e.return, W);
          }
        }
        break;
      case 1:
        mt(t, e), Nt(e), r & 512 && n !== null && Vn(n, n.return);
        break;
      case 5:
        if (mt(t, e), Nt(e), r & 512 && n !== null && Vn(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            sr(i, "");
          } catch (W) {
            ge(e, e.return, W);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var o = e.memoizedProps, d = n !== null ? n.memoizedProps : o, p = e.type, h = e.updateQueue;
          if (e.updateQueue = null, h !== null) try {
            p === "input" && o.type === "radio" && o.name != null && Lo(i, o), wi(p, d);
            var k = wi(p, o);
            for (d = 0; d < h.length; d += 2) {
              var _ = h[d], $ = h[d + 1];
              _ === "style" ? Xo(i, $) : _ === "dangerouslySetInnerHTML" ? Do(i, $) : _ === "children" ? sr(i, $) : je(i, _, $, k);
            }
            switch (p) {
              case "input":
                hi(i, o);
                break;
              case "textarea":
                Ao(i, o);
                break;
              case "select":
                var N = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var b = o.value;
                b != null ? Nn(i, !!o.multiple, b, !1) : N !== !!o.multiple && (o.defaultValue != null ? Nn(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : Nn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[_r] = o;
          } catch (W) {
            ge(e, e.return, W);
          }
        }
        break;
      case 6:
        if (mt(t, e), Nt(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          i = e.stateNode, o = e.memoizedProps;
          try {
            i.nodeValue = o;
          } catch (W) {
            ge(e, e.return, W);
          }
        }
        break;
      case 3:
        if (mt(t, e), Nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          yr(t.containerInfo);
        } catch (W) {
          ge(e, e.return, W);
        }
        break;
      case 4:
        mt(t, e), Nt(e);
        break;
      case 13:
        mt(t, e), Nt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Bs = ye())), r & 4 && lc(e);
        break;
      case 22:
        if (_ = n !== null && n.memoizedState !== null, e.mode & 1 ? (Le = (k = Le) || _, mt(t, e), Le = k) : mt(t, e), Nt(e), r & 8192) {
          if (k = e.memoizedState !== null, (e.stateNode.isHidden = k) && !_ && (e.mode & 1) !== 0) for (D = e, _ = e.child; _ !== null; ) {
            for ($ = D = _; D !== null; ) {
              switch (N = D, b = N.child, N.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dr(4, N, N.return);
                  break;
                case 1:
                  Vn(N, N.return);
                  var X = N.stateNode;
                  if (typeof X.componentWillUnmount == "function") {
                    r = N, n = N.return;
                    try {
                      t = r, X.props = t.memoizedProps, X.state = t.memoizedState, X.componentWillUnmount();
                    } catch (W) {
                      ge(r, n, W);
                    }
                  }
                  break;
                case 5:
                  Vn(N, N.return);
                  break;
                case 22:
                  if (N.memoizedState !== null) {
                    uc($);
                    continue;
                  }
              }
              b !== null ? (b.return = N, D = b) : uc($);
            }
            _ = _.sibling;
          }
          e: for (_ = null, $ = e; ; ) {
            if ($.tag === 5) {
              if (_ === null) {
                _ = $;
                try {
                  i = $.stateNode, k ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (p = $.stateNode, h = $.memoizedProps.style, d = h != null && h.hasOwnProperty("display") ? h.display : null, p.style.display = Fo("display", d));
                } catch (W) {
                  ge(e, e.return, W);
                }
              }
            } else if ($.tag === 6) {
              if (_ === null) try {
                $.stateNode.nodeValue = k ? "" : $.memoizedProps;
              } catch (W) {
                ge(e, e.return, W);
              }
            } else if (($.tag !== 22 && $.tag !== 23 || $.memoizedState === null || $ === e) && $.child !== null) {
              $.child.return = $, $ = $.child;
              continue;
            }
            if ($ === e) break e;
            for (; $.sibling === null; ) {
              if ($.return === null || $.return === e) break e;
              _ === $ && (_ = null), $ = $.return;
            }
            _ === $ && (_ = null), $.sibling.return = $.return, $ = $.sibling;
          }
        }
        break;
      case 19:
        mt(t, e), Nt(e), r & 4 && lc(e);
        break;
      case 21:
        break;
      default:
        mt(
          t,
          e
        ), Nt(e);
    }
  }
  function Nt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (tc(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (sr(i, ""), r.flags &= -33);
            var o = nc(e);
            Ws(e, o, i);
            break;
          case 3:
          case 4:
            var d = r.stateNode.containerInfo, p = nc(e);
            Xs(e, p, d);
            break;
          default:
            throw Error(s(161));
        }
      } catch (h) {
        ge(e, e.return, h);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function d0(e, t, n) {
    D = e, sc(e);
  }
  function sc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; D !== null; ) {
      var i = D, o = i.child;
      if (i.tag === 22 && r) {
        var d = i.memoizedState !== null || Dl;
        if (!d) {
          var p = i.alternate, h = p !== null && p.memoizedState !== null || Le;
          p = Dl;
          var k = Le;
          if (Dl = d, (Le = h) && !k) for (D = i; D !== null; ) d = D, h = d.child, d.tag === 22 && d.memoizedState !== null ? ac(i) : h !== null ? (h.return = d, D = h) : ac(i);
          for (; o !== null; ) D = o, sc(o), o = o.sibling;
          D = i, Dl = p, Le = k;
        }
        oc(e);
      } else (i.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = i, D = o) : oc(e);
    }
  }
  function oc(e) {
    for (; D !== null; ) {
      var t = D;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Le || Fl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Le) if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : pt(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && ua(t, o, r);
              break;
            case 3:
              var d = t.updateQueue;
              if (d !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ua(t, d, n);
              }
              break;
            case 5:
              var p = t.stateNode;
              if (n === null && t.flags & 4) {
                n = p;
                var h = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    h.autoFocus && n.focus();
                    break;
                  case "img":
                    h.src && (n.src = h.src);
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
                var k = t.alternate;
                if (k !== null) {
                  var _ = k.memoizedState;
                  if (_ !== null) {
                    var $ = _.dehydrated;
                    $ !== null && yr($);
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
              throw Error(s(163));
          }
          Le || t.flags & 512 && Fs(t);
        } catch (N) {
          ge(t, t.return, N);
        }
      }
      if (t === e) {
        D = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function uc(e) {
    for (; D !== null; ) {
      var t = D;
      if (t === e) {
        D = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, D = n;
        break;
      }
      D = t.return;
    }
  }
  function ac(e) {
    for (; D !== null; ) {
      var t = D;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Fl(4, t);
            } catch (h) {
              ge(t, n, h);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (h) {
                ge(t, i, h);
              }
            }
            var o = t.return;
            try {
              Fs(t);
            } catch (h) {
              ge(t, o, h);
            }
            break;
          case 5:
            var d = t.return;
            try {
              Fs(t);
            } catch (h) {
              ge(t, d, h);
            }
        }
      } catch (h) {
        ge(t, t.return, h);
      }
      if (t === e) {
        D = null;
        break;
      }
      var p = t.sibling;
      if (p !== null) {
        p.return = t.return, D = p;
        break;
      }
      D = t.return;
    }
  }
  var f0 = Math.ceil, Xl = Te.ReactCurrentDispatcher, Us = Te.ReactCurrentOwner, lt = Te.ReactCurrentBatchConfig, ee = 0, Ne = null, we = null, _e = 0, Ke = 0, Hn = Zt(0), Se = 0, Fr = null, wn = 0, Wl = 0, Zs = 0, Xr = null, Ze = null, Bs = 0, Qn = 1 / 0, Ot = null, Ul = !1, Vs = null, qt = null, Zl = !1, Gt = null, Bl = 0, Wr = 0, Hs = null, Vl = -1, Hl = 0;
  function Me() {
    return (ee & 6) !== 0 ? ye() : Vl !== -1 ? Vl : Vl = ye();
  }
  function Kt(e) {
    return (e.mode & 1) === 0 ? 1 : (ee & 2) !== 0 && _e !== 0 ? _e & -_e : Yf.transition !== null ? (Hl === 0 && (Hl = nu()), Hl) : (e = ie, e !== 0 || (e = window.event, e = e === void 0 ? 16 : du(e.type)), e);
  }
  function gt(e, t, n, r) {
    if (50 < Wr) throw Wr = 0, Hs = null, Error(s(185));
    fr(e, n, r), ((ee & 2) === 0 || e !== Ne) && (e === Ne && ((ee & 2) === 0 && (Wl |= n), Se === 4 && Jt(e, _e)), Be(e, r), n === 1 && ee === 0 && (t.mode & 1) === 0 && (Qn = ye() + 500, kl && Vt()));
  }
  function Be(e, t) {
    var n = e.callbackNode;
    Qd(e, t);
    var r = nl(e, e === Ne ? _e : 0);
    if (r === 0) n !== null && Jo(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Jo(n), t === 1) e.tag === 0 ? Qf(dc.bind(null, e)) : qu(dc.bind(null, e)), Zf(function() {
        (ee & 6) === 0 && Vt();
      }), n = null;
      else {
        switch (ru(r)) {
          case 1:
            n = Ci;
            break;
          case 4:
            n = eu;
            break;
          case 16:
            n = Kr;
            break;
          case 536870912:
            n = tu;
            break;
          default:
            n = Kr;
        }
        n = wc(n, cc.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function cc(e, t) {
    if (Vl = -1, Hl = 0, (ee & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (Yn() && e.callbackNode !== n) return null;
    var r = nl(e, e === Ne ? _e : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Ql(e, r);
    else {
      t = r;
      var i = ee;
      ee |= 2;
      var o = pc();
      (Ne !== e || _e !== t) && (Ot = null, Qn = ye() + 500, kn(e, t));
      do
        try {
          m0();
          break;
        } catch (p) {
          fc(e, p);
        }
      while (!0);
      ds(), Xl.current = o, ee = i, we !== null ? t = 0 : (Ne = null, _e = 0, t = Se);
    }
    if (t !== 0) {
      if (t === 2 && (i = Ii(e), i !== 0 && (r = i, t = Qs(e, i))), t === 1) throw n = Fr, kn(e, 0), Jt(e, r), Be(e, ye()), n;
      if (t === 6) Jt(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !p0(i) && (t = Ql(e, r), t === 2 && (o = Ii(e), o !== 0 && (r = o, t = Qs(e, o))), t === 1)) throw n = Fr, kn(e, 0), Jt(e, r), Be(e, ye()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Sn(e, Ze, Ot);
            break;
          case 3:
            if (Jt(e, r), (r & 130023424) === r && (t = Bs + 500 - ye(), 10 < t)) {
              if (nl(e, 0) !== 0) break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                Me(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = es(Sn.bind(null, e, Ze, Ot), t);
              break;
            }
            Sn(e, Ze, Ot);
            break;
          case 4:
            if (Jt(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var d = 31 - ct(r);
              o = 1 << d, d = t[d], d > i && (i = d), r &= ~o;
            }
            if (r = i, r = ye() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * f0(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = es(Sn.bind(null, e, Ze, Ot), r);
              break;
            }
            Sn(e, Ze, Ot);
            break;
          case 5:
            Sn(e, Ze, Ot);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Be(e, ye()), e.callbackNode === n ? cc.bind(null, e) : null;
  }
  function Qs(e, t) {
    var n = Xr;
    return e.current.memoizedState.isDehydrated && (kn(e, t).flags |= 256), e = Ql(e, t), e !== 2 && (t = Ze, Ze = n, t !== null && Ys(t)), e;
  }
  function Ys(e) {
    Ze === null ? Ze = e : Ze.push.apply(Ze, e);
  }
  function p0(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], o = i.getSnapshot;
          i = i.value;
          try {
            if (!dt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
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
  function Jt(e, t) {
    for (t &= ~Zs, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - ct(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function dc(e) {
    if ((ee & 6) !== 0) throw Error(s(327));
    Yn();
    var t = nl(e, 0);
    if ((t & 1) === 0) return Be(e, ye()), null;
    var n = Ql(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Ii(e);
      r !== 0 && (t = r, n = Qs(e, r));
    }
    if (n === 1) throw n = Fr, kn(e, 0), Jt(e, t), Be(e, ye()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Sn(e, Ze, Ot), Be(e, ye()), null;
  }
  function qs(e, t) {
    var n = ee;
    ee |= 1;
    try {
      return e(t);
    } finally {
      ee = n, ee === 0 && (Qn = ye() + 500, kl && Vt());
    }
  }
  function xn(e) {
    Gt !== null && Gt.tag === 0 && (ee & 6) === 0 && Yn();
    var t = ee;
    ee |= 1;
    var n = lt.transition, r = ie;
    try {
      if (lt.transition = null, ie = 1, e) return e();
    } finally {
      ie = r, lt.transition = n, ee = t, (ee & 6) === 0 && Vt();
    }
  }
  function Gs() {
    Ke = Hn.current, ce(Hn);
  }
  function kn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Uf(n)), we !== null) for (n = we.return; n !== null; ) {
      var r = n;
      switch (ss(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && wl();
          break;
        case 3:
          Zn(), ce(Xe), ce($e), ws();
          break;
        case 5:
          ys(r);
          break;
        case 4:
          Zn();
          break;
        case 13:
          ce(pe);
          break;
        case 19:
          ce(pe);
          break;
        case 10:
          fs(r.type._context);
          break;
        case 22:
        case 23:
          Gs();
      }
      n = n.return;
    }
    if (Ne = e, we = e = en(e.current, null), _e = Ke = t, Se = 0, Fr = null, Zs = Wl = wn = 0, Ze = Xr = null, gn !== null) {
      for (t = 0; t < gn.length; t++) if (n = gn[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, o = n.pending;
        if (o !== null) {
          var d = o.next;
          o.next = i, r.next = d;
        }
        n.pending = r;
      }
      gn = null;
    }
    return e;
  }
  function fc(e, t) {
    do {
      var n = we;
      try {
        if (ds(), Pl.current = zl, Rl) {
          for (var r = he.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          Rl = !1;
        }
        if (vn = 0, Ee = ke = he = null, Or = !1, zr = 0, Us.current = null, n === null || n.return === null) {
          Se = 1, Fr = t, we = null;
          break;
        }
        e: {
          var o = e, d = n.return, p = n, h = t;
          if (t = _e, p.flags |= 32768, h !== null && typeof h == "object" && typeof h.then == "function") {
            var k = h, _ = p, $ = _.tag;
            if ((_.mode & 1) === 0 && ($ === 0 || $ === 11 || $ === 15)) {
              var N = _.alternate;
              N ? (_.updateQueue = N.updateQueue, _.memoizedState = N.memoizedState, _.lanes = N.lanes) : (_.updateQueue = null, _.memoizedState = null);
            }
            var b = Ma(d);
            if (b !== null) {
              b.flags &= -257, ba(b, d, p, o, t), b.mode & 1 && Aa(o, k, t), t = b, h = k;
              var X = t.updateQueue;
              if (X === null) {
                var W = /* @__PURE__ */ new Set();
                W.add(h), t.updateQueue = W;
              } else X.add(h);
              break e;
            } else {
              if ((t & 1) === 0) {
                Aa(o, k, t), Ks();
                break e;
              }
              h = Error(s(426));
            }
          } else if (fe && p.mode & 1) {
            var ve = Ma(d);
            if (ve !== null) {
              (ve.flags & 65536) === 0 && (ve.flags |= 256), ba(ve, d, p, o, t), as(Bn(h, p));
              break e;
            }
          }
          o = h = Bn(h, p), Se !== 4 && (Se = 2), Xr === null ? Xr = [o] : Xr.push(o), o = d;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = Oa(o, h, t);
                oa(o, v);
                break e;
              case 1:
                p = h;
                var g = o.type, x = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof g.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (qt === null || !qt.has(x)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var P = za(o, p, t);
                  oa(o, P);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        mc(n);
      } catch (U) {
        t = U, we === n && n !== null && (we = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function pc() {
    var e = Xl.current;
    return Xl.current = zl, e === null ? zl : e;
  }
  function Ks() {
    (Se === 0 || Se === 3 || Se === 2) && (Se = 4), Ne === null || (wn & 268435455) === 0 && (Wl & 268435455) === 0 || Jt(Ne, _e);
  }
  function Ql(e, t) {
    var n = ee;
    ee |= 2;
    var r = pc();
    (Ne !== e || _e !== t) && (Ot = null, kn(e, t));
    do
      try {
        h0();
        break;
      } catch (i) {
        fc(e, i);
      }
    while (!0);
    if (ds(), ee = n, Xl.current = r, we !== null) throw Error(s(261));
    return Ne = null, _e = 0, Se;
  }
  function h0() {
    for (; we !== null; ) hc(we);
  }
  function m0() {
    for (; we !== null && !Dd(); ) hc(we);
  }
  function hc(e) {
    var t = vc(e.alternate, e, Ke);
    e.memoizedProps = e.pendingProps, t === null ? mc(e) : we = t, Us.current = null;
  }
  function mc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = o0(n, t, Ke), n !== null) {
          we = n;
          return;
        }
      } else {
        if (n = u0(n, t), n !== null) {
          n.flags &= 32767, we = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Se = 6, we = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        we = t;
        return;
      }
      we = t = e;
    } while (t !== null);
    Se === 0 && (Se = 5);
  }
  function Sn(e, t, n) {
    var r = ie, i = lt.transition;
    try {
      lt.transition = null, ie = 1, g0(e, t, n, r);
    } finally {
      lt.transition = i, ie = r;
    }
    return null;
  }
  function g0(e, t, n, r) {
    do
      Yn();
    while (Gt !== null);
    if ((ee & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Yd(e, o), e === Ne && (we = Ne = null, _e = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || Zl || (Zl = !0, wc(Kr, function() {
      return Yn(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = lt.transition, lt.transition = null;
      var d = ie;
      ie = 1;
      var p = ee;
      ee |= 4, Us.current = null, c0(e, n), ic(n, e), Af(Ki), il = !!Gi, Ki = Gi = null, e.current = n, d0(n), Fd(), ee = p, ie = d, lt.transition = o;
    } else e.current = n;
    if (Zl && (Zl = !1, Gt = e, Bl = i), o = e.pendingLanes, o === 0 && (qt = null), Ud(n.stateNode), Be(e, ye()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Ul) throw Ul = !1, e = Vs, Vs = null, e;
    return (Bl & 1) !== 0 && e.tag !== 0 && Yn(), o = e.pendingLanes, (o & 1) !== 0 ? e === Hs ? Wr++ : (Wr = 0, Hs = e) : Wr = 0, Vt(), null;
  }
  function Yn() {
    if (Gt !== null) {
      var e = ru(Bl), t = lt.transition, n = ie;
      try {
        if (lt.transition = null, ie = 16 > e ? 16 : e, Gt === null) var r = !1;
        else {
          if (e = Gt, Gt = null, Bl = 0, (ee & 6) !== 0) throw Error(s(331));
          var i = ee;
          for (ee |= 4, D = e.current; D !== null; ) {
            var o = D, d = o.child;
            if ((D.flags & 16) !== 0) {
              var p = o.deletions;
              if (p !== null) {
                for (var h = 0; h < p.length; h++) {
                  var k = p[h];
                  for (D = k; D !== null; ) {
                    var _ = D;
                    switch (_.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Dr(8, _, o);
                    }
                    var $ = _.child;
                    if ($ !== null) $.return = _, D = $;
                    else for (; D !== null; ) {
                      _ = D;
                      var N = _.sibling, b = _.return;
                      if (ec(_), _ === k) {
                        D = null;
                        break;
                      }
                      if (N !== null) {
                        N.return = b, D = N;
                        break;
                      }
                      D = b;
                    }
                  }
                }
                var X = o.alternate;
                if (X !== null) {
                  var W = X.child;
                  if (W !== null) {
                    X.child = null;
                    do {
                      var ve = W.sibling;
                      W.sibling = null, W = ve;
                    } while (W !== null);
                  }
                }
                D = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && d !== null) d.return = o, D = d;
            else e: for (; D !== null; ) {
              if (o = D, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  Dr(9, o, o.return);
              }
              var v = o.sibling;
              if (v !== null) {
                v.return = o.return, D = v;
                break e;
              }
              D = o.return;
            }
          }
          var g = e.current;
          for (D = g; D !== null; ) {
            d = D;
            var x = d.child;
            if ((d.subtreeFlags & 2064) !== 0 && x !== null) x.return = d, D = x;
            else e: for (d = g; D !== null; ) {
              if (p = D, (p.flags & 2048) !== 0) try {
                switch (p.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Fl(9, p);
                }
              } catch (U) {
                ge(p, p.return, U);
              }
              if (p === d) {
                D = null;
                break e;
              }
              var P = p.sibling;
              if (P !== null) {
                P.return = p.return, D = P;
                break e;
              }
              D = p.return;
            }
          }
          if (ee = i, Vt(), kt && typeof kt.onPostCommitFiberRoot == "function") try {
            kt.onPostCommitFiberRoot(Jr, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        ie = n, lt.transition = t;
      }
    }
    return !1;
  }
  function gc(e, t, n) {
    t = Bn(n, t), t = Oa(e, t, 1), e = Qt(e, t, 1), t = Me(), e !== null && (fr(e, 1, t), Be(e, t));
  }
  function ge(e, t, n) {
    if (e.tag === 3) gc(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        gc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (qt === null || !qt.has(r))) {
          e = Bn(n, e), e = za(t, e, 1), t = Qt(t, e, 1), e = Me(), t !== null && (fr(t, 1, e), Be(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function y0(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Me(), e.pingedLanes |= e.suspendedLanes & n, Ne === e && (_e & n) === n && (Se === 4 || Se === 3 && (_e & 130023424) === _e && 500 > ye() - Bs ? kn(e, 0) : Zs |= n), Be(e, t);
  }
  function yc(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = tl, tl <<= 1, (tl & 130023424) === 0 && (tl = 4194304)));
    var n = Me();
    e = Pt(e, t), e !== null && (fr(e, t, n), Be(e, n));
  }
  function v0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), yc(e, n);
  }
  function w0(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), yc(e, n);
  }
  var vc;
  vc = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Xe.current) Ue = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Ue = !1, s0(e, t, n);
      Ue = (e.flags & 131072) !== 0;
    }
    else Ue = !1, fe && (t.flags & 1048576) !== 0 && Gu(t, jl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        bl(e, t), e = t.pendingProps;
        var i = Mn(t, $e.current);
        Un(t, n), i = Ss(null, t, r, e, i, n);
        var o = js();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, We(r) ? (o = !0, xl(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, ms(t), i.updater = Al, t.stateNode = i, i._reactInternals = t, Ts(t, r, e, n), t = Ls(null, t, r, !0, o, n)) : (t.tag = 0, fe && o && is(t), Ae(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (bl(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = k0(r), e = pt(r, e), i) {
            case 0:
              t = Rs(null, t, r, e, n);
              break e;
            case 1:
              t = Za(null, t, r, e, n);
              break e;
            case 11:
              t = Da(null, t, r, e, n);
              break e;
            case 14:
              t = Fa(null, t, r, pt(r.type, e), n);
              break e;
          }
          throw Error(s(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : pt(r, i), Rs(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : pt(r, i), Za(e, t, r, i, n);
      case 3:
        e: {
          if (Ba(t), e === null) throw Error(s(387));
          r = t.pendingProps, o = t.memoizedState, i = o.element, sa(e, t), Tl(t, r, null, n);
          var d = t.memoizedState;
          if (r = d.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: d.cache, pendingSuspenseBoundaries: d.pendingSuspenseBoundaries, transitions: d.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            i = Bn(Error(s(423)), t), t = Va(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Bn(Error(s(424)), t), t = Va(e, t, r, n, i);
            break e;
          } else for (Ge = Ut(t.stateNode.containerInfo.firstChild), qe = t, fe = !0, ft = null, n = la(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Fn(), r === i) {
              t = Lt(e, t, n);
              break e;
            }
            Ae(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return aa(t), e === null && us(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, d = i.children, Ji(r, i) ? d = null : o !== null && Ji(r, o) && (t.flags |= 32), Ua(e, t), Ae(e, t, d, n), t.child;
      case 6:
        return e === null && us(t), null;
      case 13:
        return Ha(e, t, n);
      case 4:
        return gs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xn(t, null, r, n) : Ae(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : pt(r, i), Da(e, t, r, i, n);
      case 7:
        return Ae(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ae(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ae(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, d = i.value, ue(Cl, r._currentValue), r._currentValue = d, o !== null) if (dt(o.value, d)) {
            if (o.children === i.children && !Xe.current) {
              t = Lt(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var p = o.dependencies;
            if (p !== null) {
              d = o.child;
              for (var h = p.firstContext; h !== null; ) {
                if (h.context === r) {
                  if (o.tag === 1) {
                    h = Rt(-1, n & -n), h.tag = 2;
                    var k = o.updateQueue;
                    if (k !== null) {
                      k = k.shared;
                      var _ = k.pending;
                      _ === null ? h.next = h : (h.next = _.next, _.next = h), k.pending = h;
                    }
                  }
                  o.lanes |= n, h = o.alternate, h !== null && (h.lanes |= n), ps(
                    o.return,
                    n,
                    t
                  ), p.lanes |= n;
                  break;
                }
                h = h.next;
              }
            } else if (o.tag === 10) d = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (d = o.return, d === null) throw Error(s(341));
              d.lanes |= n, p = d.alternate, p !== null && (p.lanes |= n), ps(d, n, t), d = o.sibling;
            } else d = o.child;
            if (d !== null) d.return = o;
            else for (d = o; d !== null; ) {
              if (d === t) {
                d = null;
                break;
              }
              if (o = d.sibling, o !== null) {
                o.return = d.return, d = o;
                break;
              }
              d = d.return;
            }
            o = d;
          }
          Ae(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, Un(t, n), i = nt(i), r = r(i), t.flags |= 1, Ae(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = pt(r, t.pendingProps), i = pt(r.type, i), Fa(e, t, r, i, n);
      case 15:
        return Xa(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : pt(r, i), bl(e, t), t.tag = 1, We(r) ? (e = !0, xl(t)) : e = !1, Un(t, n), Ra(t, r, i), Ts(t, r, i, n), Ls(null, t, r, !0, e, n);
      case 19:
        return Ya(e, t, n);
      case 22:
        return Wa(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function wc(e, t) {
    return Ko(e, t);
  }
  function x0(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function it(e, t, n, r) {
    return new x0(e, t, n, r);
  }
  function Js(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function k0(e) {
    if (typeof e == "function") return Js(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === wt) return 11;
      if (e === xt) return 14;
    }
    return 2;
  }
  function en(e, t) {
    var n = e.alternate;
    return n === null ? (n = it(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Yl(e, t, n, r, i, o) {
    var d = 2;
    if (r = e, typeof e == "function") Js(e) && (d = 1);
    else if (typeof e == "string") d = 5;
    else e: switch (e) {
      case De:
        return jn(n.children, i, o, t);
      case Je:
        d = 8, i |= 8;
        break;
      case At:
        return e = it(12, n, t, i | 2), e.elementType = At, e.lanes = o, e;
      case He:
        return e = it(13, n, t, i), e.elementType = He, e.lanes = o, e;
      case at:
        return e = it(19, n, t, i), e.elementType = at, e.lanes = o, e;
      case me:
        return ql(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Ct:
            d = 10;
            break e;
          case cn:
            d = 9;
            break e;
          case wt:
            d = 11;
            break e;
          case xt:
            d = 14;
            break e;
          case Fe:
            d = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = it(d, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function jn(e, t, n, r) {
    return e = it(7, e, r, t), e.lanes = n, e;
  }
  function ql(e, t, n, r) {
    return e = it(22, e, r, t), e.elementType = me, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function eo(e, t, n) {
    return e = it(6, e, null, t), e.lanes = n, e;
  }
  function to(e, t, n) {
    return t = it(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function S0(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = _i(0), this.expirationTimes = _i(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _i(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function no(e, t, n, r, i, o, d, p, h) {
    return e = new S0(e, t, n, p, h), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = it(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ms(o), e;
  }
  function j0(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ze, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function xc(e) {
    if (!e) return Bt;
    e = e._reactInternals;
    e: {
      if (dn(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (We(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (We(n)) return Qu(e, n, t);
    }
    return t;
  }
  function kc(e, t, n, r, i, o, d, p, h) {
    return e = no(n, r, !0, e, i, o, d, p, h), e.context = xc(null), n = e.current, r = Me(), i = Kt(n), o = Rt(r, i), o.callback = t ?? null, Qt(n, o, i), e.current.lanes = i, fr(e, i, r), Be(e, r), e;
  }
  function Gl(e, t, n, r) {
    var i = t.current, o = Me(), d = Kt(i);
    return n = xc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Rt(o, d), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qt(i, t, d), e !== null && (gt(e, i, d, o), _l(e, i, d)), d;
  }
  function Kl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Sc(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ro(e, t) {
    Sc(e, t), (e = e.alternate) && Sc(e, t);
  }
  function E0() {
    return null;
  }
  var jc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function lo(e) {
    this._internalRoot = e;
  }
  Jl.prototype.render = lo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    Gl(e, t, null, null);
  }, Jl.prototype.unmount = lo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      xn(function() {
        Gl(null, e, null, null);
      }), t[It] = null;
    }
  };
  function Jl(e) {
    this._internalRoot = e;
  }
  Jl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = su();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ft.length && t !== 0 && t < Ft[n].priority; n++) ;
      Ft.splice(n, 0, e), n === 0 && au(e);
    }
  };
  function io(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ei(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ec() {
  }
  function N0(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var k = Kl(d);
          o.call(k);
        };
      }
      var d = kc(t, r, e, 0, null, !1, !1, "", Ec);
      return e._reactRootContainer = d, e[It] = d.current, Cr(e.nodeType === 8 ? e.parentNode : e), xn(), d;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var p = r;
      r = function() {
        var k = Kl(h);
        p.call(k);
      };
    }
    var h = no(e, 0, !1, null, null, !1, !1, "", Ec);
    return e._reactRootContainer = h, e[It] = h.current, Cr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
      Gl(t, h, n, r);
    }), h;
  }
  function ti(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
      var d = o;
      if (typeof i == "function") {
        var p = i;
        i = function() {
          var h = Kl(d);
          p.call(h);
        };
      }
      Gl(t, d, e, i);
    } else d = N0(n, t, e, i, r);
    return Kl(d);
  }
  lu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = dr(t.pendingLanes);
          n !== 0 && (Ti(t, n | 1), Be(t, ye()), (ee & 6) === 0 && (Qn = ye() + 500, Vt()));
        }
        break;
      case 13:
        xn(function() {
          var r = Pt(e, 1);
          if (r !== null) {
            var i = Me();
            gt(r, e, 1, i);
          }
        }), ro(e, 1);
    }
  }, $i = function(e) {
    if (e.tag === 13) {
      var t = Pt(e, 134217728);
      if (t !== null) {
        var n = Me();
        gt(t, e, 134217728, n);
      }
      ro(e, 134217728);
    }
  }, iu = function(e) {
    if (e.tag === 13) {
      var t = Kt(e), n = Pt(e, t);
      if (n !== null) {
        var r = Me();
        gt(n, e, t, r);
      }
      ro(e, t);
    }
  }, su = function() {
    return ie;
  }, ou = function(e, t) {
    var n = ie;
    try {
      return ie = e, t();
    } finally {
      ie = n;
    }
  }, Si = function(e, t, n) {
    switch (t) {
      case "input":
        if (hi(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = vl(r);
              if (!i) throw Error(s(90));
              Po(r), hi(r, i);
            }
          }
        }
        break;
      case "textarea":
        Ao(e, n);
        break;
      case "select":
        t = n.value, t != null && Nn(e, !!n.multiple, t, !1);
    }
  }, Bo = qs, Vo = xn;
  var C0 = { usingClientEntryPoint: !1, Events: [Tr, zn, vl, Uo, Zo, qs] }, Ur = { findFiberByHostInstance: fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, I0 = { bundleType: Ur.bundleType, version: Ur.version, rendererPackageName: Ur.rendererPackageName, rendererConfig: Ur.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Te.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = qo(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Ur.findFiberByHostInstance || E0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ni = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ni.isDisabled && ni.supportsFiber) try {
      Jr = ni.inject(I0), kt = ni;
    } catch {
    }
  }
  return Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = C0, Ve.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!io(t)) throw Error(s(200));
    return j0(e, t, null, n);
  }, Ve.createRoot = function(e, t) {
    if (!io(e)) throw Error(s(299));
    var n = !1, r = "", i = jc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = no(e, 1, !1, null, null, n, !1, r, i), e[It] = t.current, Cr(e.nodeType === 8 ? e.parentNode : e), new lo(t);
  }, Ve.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = qo(t), e = e === null ? null : e.stateNode, e;
  }, Ve.flushSync = function(e) {
    return xn(e);
  }, Ve.hydrate = function(e, t, n) {
    if (!ei(t)) throw Error(s(200));
    return ti(null, e, t, !0, n);
  }, Ve.hydrateRoot = function(e, t, n) {
    if (!io(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, i = !1, o = "", d = jc;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (d = n.onRecoverableError)), t = kc(t, null, e, 1, n ?? null, i, !1, o, d), e[It] = t.current, Cr(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
      n,
      i
    );
    return new Jl(t);
  }, Ve.render = function(e, t, n) {
    if (!ei(t)) throw Error(s(200));
    return ti(null, e, t, !1, n);
  }, Ve.unmountComponentAtNode = function(e) {
    if (!ei(e)) throw Error(s(40));
    return e._reactRootContainer ? (xn(function() {
      ti(null, null, e, !1, function() {
        e._reactRootContainer = null, e[It] = null;
      });
    }), !0) : !1;
  }, Ve.unstable_batchedUpdates = qs, Ve.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!ei(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return ti(e, t, n, !1, r);
  }, Ve.version = "18.3.1-next-f1338f8080-20240426", Ve;
}
var Rc;
function z0() {
  if (Rc) return uo.exports;
  Rc = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (u) {
        console.error(u);
      }
  }
  return l(), uo.exports = O0(), uo.exports;
}
var Lc;
function A0() {
  if (Lc) return ri;
  Lc = 1;
  var l = z0();
  return ri.createRoot = l.createRoot, ri.hydrateRoot = l.hydrateRoot, ri;
}
var M0 = A0();
function b0(l) {
  return l !== "I";
}
const ho = 1, D0 = ["I", "X", "Z", "Y"], oi = 30;
function F0(l) {
  if (!Number.isInteger(l) || l < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(l)}`);
}
function ai(l, u) {
  if (!Number.isInteger(l) || l < 0 || l >= u) throw new RangeError(`qubit index ${String(l)} out of range for n=${String(u)}`);
}
function od(l) {
  return l === "I" || l === "X" || l === "Y" || l === "Z";
}
function ko(l) {
  switch (l) {
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
function ud(l, u) {
  return D0[l & 1 | (u & 1) << 1] ?? "I";
}
function ci(l) {
  return F0(l), { n: l, x: new Uint8Array(l), z: new Uint8Array(l) };
}
function an(l) {
  const u = l.length, s = new Uint8Array(u), c = new Uint8Array(u);
  for (let f = 0; f < u; f++) {
    const m = l[f] ?? "";
    if (!od(m)) throw new Error(`invalid Pauli letter '${m}' at position ${String(f)} in "${l}"`);
    const w = ko(m);
    s[f] = w.x, c[f] = w.z;
  }
  return { n: u, x: s, z: c };
}
function se(l) {
  let u = "";
  for (let s = 0; s < l.n; s++) u += ud(l.x[s] ?? 0, l.z[s] ?? 0);
  return u;
}
function di(l) {
  return { n: l.n, x: new Uint8Array(l.x), z: new Uint8Array(l.z) };
}
function X0(l) {
  for (let u = 0; u < l.n; u++) if ((l.x[u] ?? 0) !== 0 || (l.z[u] ?? 0) !== 0) return !1;
  return !0;
}
function So(l, u) {
  if (l.n !== u.n) throw new RangeError(`cannot multiply Paulis on ${String(l.n)} and ${String(u.n)} qubits`);
  const s = new Uint8Array(l.n), c = new Uint8Array(l.n);
  for (let f = 0; f < l.n; f++)
    s[f] = (l.x[f] ?? 0) ^ (u.x[f] ?? 0), c[f] = (l.z[f] ?? 0) ^ (u.z[f] ?? 0);
  return { n: l.n, x: s, z: c };
}
function vt(l) {
  let u = 0;
  for (let s = 0; s < l.n; s++) ((l.x[s] ?? 0) | (l.z[s] ?? 0)) !== 0 && u++;
  return u;
}
function ad(l) {
  const u = [];
  for (let s = 0; s < l.n; s++) ((l.x[s] ?? 0) | (l.z[s] ?? 0)) !== 0 && u.push(s);
  return u;
}
function cd(l, u) {
  if (l.n !== u.n) throw new RangeError(`cannot compare Paulis on ${String(l.n)} and ${String(u.n)} qubits`);
  let s = 0;
  for (let c = 0; c < l.n; c++)
    s ^= (l.x[c] ?? 0) & (u.z[c] ?? 0) ^ (l.z[c] ?? 0) & (u.x[c] ?? 0);
  return s & 1;
}
function Oc(l, u) {
  return cd(l, u) === 1;
}
function fi(l, u) {
  return ai(u, l.n), ud(l.x[u] ?? 0, l.z[u] ?? 0);
}
function W0(l, u, s) {
  ai(u, l.n);
  const c = di(l), f = ko(s);
  return c.x[u] = f.x, c.z[u] = f.z, c;
}
function U0(l, u, s) {
  const c = ci(l), f = /* @__PURE__ */ new Set(), m = ko(u);
  for (const w of s) {
    if (ai(w, l), f.has(w)) throw new RangeError(`duplicate qubit ${String(w)} in support`);
    f.add(w), c.x[w] = m.x, c.z[w] = m.z;
  }
  return c;
}
function zc(l) {
  if (l.n > oi) throw new RangeError(`masks support at most ${String(oi)} qubits`);
  let u = 0, s = 0;
  for (let c = 0; c < l.n; c++)
    (l.x[c] ?? 0) !== 0 && (u |= 1 << c), (l.z[c] ?? 0) !== 0 && (s |= 1 << c);
  return { x: u, z: s };
}
function Z0(l, u, s) {
  if (l > oi) throw new RangeError(`masks support at most ${String(oi)} qubits`);
  const c = ci(l);
  for (let f = 0; f < l; f++)
    c.x[f] = u >>> f & 1, c.z[f] = s >>> f & 1;
  return c;
}
function dd(l) {
  const u = new Uint8Array(2 * l.n);
  return u.set(l.x, 0), u.set(l.z, l.n), u;
}
function B0(l) {
  switch (l.kind) {
    case "H":
    case "S":
      return [l.q];
    case "CNOT":
      return [l.c, l.t];
    case "CZ":
    case "SWAP":
      return [l.a, l.b];
  }
}
function fd(l, u) {
  const s = B0(l);
  for (const c of s) ai(c, u);
  if (s.length === 2 && s[0] === s[1])
    throw new RangeError(`${l.kind} needs two distinct qubits, got ${String(s[0])} twice`);
}
function mo(l, u) {
  for (const s of l) fd(s, u);
}
function V0(l, u) {
  fd(u, l.n);
  const s = di(l), { x: c, z: f } = s;
  switch (u.kind) {
    case "H": {
      const m = u.q, w = c[m] ?? 0;
      c[m] = f[m] ?? 0, f[m] = w;
      break;
    }
    case "S": {
      const m = u.q;
      f[m] = (f[m] ?? 0) ^ (c[m] ?? 0);
      break;
    }
    case "CNOT": {
      const { c: m, t: w } = u;
      c[w] = (c[w] ?? 0) ^ (c[m] ?? 0), f[m] = (f[m] ?? 0) ^ (f[w] ?? 0);
      break;
    }
    case "CZ": {
      const { a: m, b: w } = u, j = c[m] ?? 0, S = c[w] ?? 0;
      f[m] = (f[m] ?? 0) ^ S, f[w] = (f[w] ?? 0) ^ j;
      break;
    }
    case "SWAP": {
      const { a: m, b: w } = u, j = c[m] ?? 0, S = f[m] ?? 0;
      c[m] = c[w] ?? 0, f[m] = f[w] ?? 0, c[w] = j, f[w] = S;
      break;
    }
  }
  return s;
}
function jo(l, u) {
  mo(u, l.n);
  const s = [di(l)];
  let c = l;
  for (const f of u)
    c = V0(c, f), s.push(c);
  return { frames: s };
}
function H0(l, u) {
  const s = jo(l, u);
  return s.frames[s.frames.length - 1] ?? di(l);
}
function Q0(l, u) {
  for (const s of l)
    if (s.length !== u) throw new RangeError(`GF(2) row width mismatch: ${String(s.length)} vs ${String(u)}`);
}
function pd(l, u) {
  for (let s = 0; s < l.length; s++) l[s] = ((l[s] ?? 0) ^ (u[s] ?? 0)) & 1;
}
function hd(l, u) {
  const s = u ?? l[0]?.length ?? 0;
  Q0(l, s);
  const c = l.map((j) => Uint8Array.from(j, (S) => S & 1)), f = [], m = [];
  let w = 0;
  for (let j = 0; j < s && w < c.length; j++) {
    let S = -1;
    for (let T = w; T < c.length; T++)
      if ((c[T]?.[j] ?? 0) === 1) {
        S = T;
        break;
      }
    if (S === -1) continue;
    const C = c[S], L = c[w];
    if (!(C === void 0 || L === void 0)) {
      c[S] = L, c[w] = C;
      for (let T = 0; T < c.length; T++) {
        const E = c[T];
        T !== w && E !== void 0 && (E[j] ?? 0) === 1 && pd(E, C);
      }
      f.push(j), m.push(C), w++;
    }
  }
  return { rows: m, pivots: f, width: s };
}
function Y0(l, u) {
  if (u.length !== l.width) throw new RangeError(`vector width ${String(u.length)} does not match basis width ${String(l.width)}`);
  const s = Uint8Array.from(u, (c) => c & 1);
  for (let c = 0; c < l.rows.length; c++) {
    const f = l.pivots[c], m = l.rows[c];
    f === void 0 || m === void 0 || (s[f] ?? 0) === 1 && pd(s, m);
  }
  return s;
}
function q0(l) {
  for (let u = 0; u < l.length; u++) if ((l[u] ?? 0) !== 0) return !1;
  return !0;
}
function G0(l) {
  return !Array.isArray(l) && "pivots" in l;
}
function K0(l, u) {
  const s = G0(l) ? l : hd(l, u.length);
  return q0(Y0(s, u));
}
const J0 = { name: "Distance-3 rotated surface code", n: 9, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1, 3, 4] }, { id: "Z1", type: "Z", qubits: [4, 5, 7, 8] }, { id: "Z2", type: "Z", qubits: [1, 2] }, { id: "Z3", type: "Z", qubits: [6, 7] }, { id: "X0", type: "X", qubits: [1, 2, 4, 5] }, { id: "X1", type: "X", qubits: [3, 4, 6, 7] }, { id: "X2", type: "X", qubits: [0, 3] }, { id: "X3", type: "X", qubits: [5, 8] }], logicalX: ["XXXIIIIII"], logicalZ: ["ZIIZIIZII"], layout: { kind: "grid", rows: 3, cols: 3, checkPositions: { Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 }, X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 } } }, noiseNote: "X, Z and Y errors; perfect syndrome" }, ep = { name: "Three-qubit repetition code", n: 3, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1] }, { id: "Z1", type: "Z", qubits: [1, 2] }], logicalX: ["XXX"], logicalZ: ["ZII"], layout: { kind: "line", checkPositions: { Z0: { row: 0, col: 0.5 }, Z1: { row: 0, col: 1.5 } } }, noiseNote: "X noise only (a single Z is undetectable: distance 1 against Z)" }, tp = { name: "Two bare qubits (no code)", n: 2, k: 2, distance: 1, checks: [], logicalX: ["XI", "IX"], logicalZ: ["ZI", "IZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, np = { name: "Three bare qubits (no code)", n: 3, k: 3, distance: 1, checks: [], logicalX: ["XII", "IXI", "IIX"], logicalZ: ["ZII", "IZI", "IIZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, rp = {
  rsc3: J0,
  rep3: ep,
  trivial2: tp,
  trivial3: np
}, md = ["trivial2", "trivial3", "rep3", "rsc3"];
function lp(l) {
  return md.includes(l);
}
function tr(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function sn(l, u) {
  if (typeof l != "number" || !Number.isFinite(l)) throw new Error(`codes.json: ${u} must be a number`);
  return l;
}
function nr(l, u) {
  if (typeof l != "string") throw new Error(`codes.json: ${u} must be a string`);
  return l;
}
function Ac(l, u) {
  if (!Array.isArray(l)) throw new Error(`codes.json: ${u} must be an array`);
  return l.map((s, c) => nr(s, `${u}[${String(c)}]`));
}
function ip(l, u) {
  if (!tr(l)) throw new Error(`codes.json: ${u} must be an object`);
  const s = nr(l.type, `${u}.type`);
  if (s !== "X" && s !== "Z") throw new Error(`codes.json: ${u}.type must be X or Z`);
  if (!Array.isArray(l.qubits)) throw new Error(`codes.json: ${u}.qubits must be an array`);
  const c = l.qubits.map((f, m) => sn(f, `${u}.qubits[${String(m)}]`));
  return { id: nr(l.id, `${u}.id`), type: s, qubits: c };
}
function sp(l, u) {
  if (!tr(u)) throw new Error(`codes.json: ${l} must be an object`);
  if (!Array.isArray(u.checks)) throw new Error(`codes.json: ${l}.checks must be an array`);
  return {
    name: nr(u.name, `${l}.name`),
    n: sn(u.n, `${l}.n`),
    k: sn(u.k, `${l}.k`),
    distance: sn(u.distance, `${l}.distance`),
    checks: u.checks.map((s, c) => ip(s, `${l}.checks[${String(c)}]`)),
    logicalX: Ac(u.logicalX, `${l}.logicalX`),
    logicalZ: Ac(u.logicalZ, `${l}.logicalZ`),
    layout: u.layout,
    noiseNote: nr(u.noiseNote, `${l}.noiseNote`)
  };
}
function Mc(l, u) {
  if (!tr(l)) throw new Error(`codes.json: ${u} must be an object`);
  const s = {};
  for (const [c, f] of Object.entries(l)) {
    if (!tr(f)) throw new Error(`codes.json: ${u}.${c} must be an object`);
    s[c] = { row: sn(f.row, `${u}.${c}.row`), col: sn(f.col, `${u}.${c}.col`) };
  }
  return s;
}
function op(l, u) {
  const s = u.layout;
  if (!tr(s)) throw new Error(`codes.json: ${l}.layout must be an object`);
  const c = nr(s.kind, `${l}.layout.kind`);
  switch (c) {
    case "grid": {
      const f = sn(s.rows, `${l}.layout.rows`), m = sn(s.cols, `${l}.layout.cols`);
      if (f * m !== u.n) throw new Error(`codes.json: ${l}.layout grid size does not match n`);
      const w = [];
      for (let S = 0; S < u.n; S++) w.push({ q: S, row: Math.floor(S / m), col: S % m });
      const j = Mc(s.checkPositions, `${l}.layout.checkPositions`);
      for (const S of u.checks)
        if (!(S.id in j)) throw new Error(`codes.json: ${l}.layout has no position for check ${S.id}`);
      return { kind: "grid", rows: f, cols: m, blocks: w, checkPositions: j };
    }
    case "line": {
      const f = [];
      for (let w = 0; w < u.n; w++) f.push({ q: w, row: 0, col: w });
      const m = Mc(s.checkPositions, `${l}.layout.checkPositions`);
      for (const w of u.checks)
        if (!(w.id in m)) throw new Error(`codes.json: ${l}.layout has no position for check ${w.id}`);
      return { kind: "line", blocks: f, checkPositions: m };
    }
    case "wires":
      return { kind: "wires", wires: u.n };
    default:
      throw new Error(`codes.json: ${l}.layout.kind '${c}' is unknown`);
  }
}
function up(l, u) {
  const s = u.n, c = u.checks.map((S) => {
    const C = [...S.qubits].sort((L, T) => L - T);
    return { id: S.id, type: S.type, qubits: C, pauli: U0(s, S.type, C) };
  });
  if (new Set(c.map((S) => S.id)).size !== c.length) throw new Error(`codes.json: ${l} has duplicate check ids`);
  const m = (S, C) => {
    if (C.length !== s) throw new Error(`codes.json: ${l} logical ${S} "${C}" has wrong length`);
    return { label: S, pauli: an(C) };
  }, w = u.logicalX.map((S) => m("X", S)), j = u.logicalZ.map((S) => m("Z", S));
  if (w.length !== u.k || j.length !== u.k) throw new Error(`codes.json: ${l} needs k logical X and k logical Z`);
  return { id: l, name: u.name, n: s, k: u.k, distance: u.distance, checks: c, logicalX: w, logicalZ: j, noiseNote: u.noiseNote };
}
const Eo = /* @__PURE__ */ new Map();
{
  const l = rp;
  if (!tr(l)) throw new Error("codes.json: root must be an object");
  for (const u of md) {
    if (!(u in l)) throw new Error(`codes.json: missing code '${u}'`);
    Eo.set(u, sp(u, l[u]));
  }
}
const bc = /* @__PURE__ */ new Map(), Dc = /* @__PURE__ */ new Map(), Fc = /* @__PURE__ */ new Map();
function ot(l) {
  let u = bc.get(l);
  if (u === void 0) {
    const s = Eo.get(l);
    if (s === void 0) throw new Error(`unknown code '${l}'`);
    u = up(l, s), bc.set(l, u);
  }
  return u;
}
function No(l) {
  let u = Dc.get(l);
  if (u === void 0) {
    const s = Eo.get(l);
    if (s === void 0) throw new Error(`unknown code '${l}'`);
    u = op(l, s), Dc.set(l, u);
  }
  return u;
}
function ap(l) {
  return l.checks.map((u) => dd(u.pauli));
}
function cp(l) {
  let u = Fc.get(l.id);
  return u === void 0 && (u = hd(ap(l), 2 * l.n), Fc.set(l.id, u)), u;
}
function rr(l, u) {
  if (u.n !== l.n) throw new RangeError(`Pauli on ${String(u.n)} qubits does not fit code ${l.id} (n=${String(l.n)})`);
  const s = new Uint8Array(l.checks.length);
  return l.checks.forEach((c, f) => {
    s[f] = cd(c.pauli, u);
  }), s;
}
function dp(l) {
  for (let u = 0; u < l.length; u++) if ((l[u] ?? 0) !== 0) return !1;
  return !0;
}
function Xc(l) {
  let u = "";
  for (let s = 0; s < l.length; s++) u += (l[s] ?? 0) === 0 ? "0" : "1";
  return u;
}
function on(l) {
  return Array.from(l, (u) => u === 0 ? 0 : 1);
}
function fp(l) {
  return Uint8Array.from(l, (u) => u === 0 ? 0 : 1);
}
function gd(l, u) {
  const s = [];
  return l.checks.forEach((c, f) => {
    (u[f] ?? 0) !== 0 && s.push(c.id);
  }), s;
}
function pp(l, u) {
  return So(l, u);
}
function yd(l, u) {
  if (u.n !== l.n) throw new RangeError(`Pauli on ${String(u.n)} qubits does not fit code ${l.id}`);
  return l.checks.length === 0 ? X0(u) : K0(cp(l), dd(u));
}
function hp(l, u) {
  return {
    x: l.logicalZ.map((s) => Oc(u, s.pauli)),
    z: l.logicalX.map((s) => Oc(u, s.pauli))
  };
}
function mp(l, u) {
  const s = rr(l, u), c = hp(l, u);
  let f;
  return dp(s) ? yd(l, u) ? f = "success" : f = "logical-error" : f = "detectable", { kind: f, residual: u, syndrome: s, logicalFlip: c, weight: vt(u) };
}
function Wc(l, u, s) {
  return mp(l, pp(s, u));
}
const Uc = 10, Zc = /* @__PURE__ */ new Map();
function gp(l) {
  const u = 1 << l, s = new Uint8Array(u);
  for (let c = 1; c < u; c++) s[c] = (s[c >> 1] ?? 0) ^ c & 1;
  return s;
}
function yp(l) {
  const u = 1 << l, s = new Uint8Array(u);
  for (let c = 1; c < u; c++) s[c] = (s[c >> 1] ?? 0) + (c & 1);
  return s;
}
function vp(l) {
  const u = l.n;
  if (u > Uc) throw new RangeError(`lookup decoder supports at most ${String(Uc)} qubits`);
  const s = l.checks.map((S) => zc(S.pauli).x), c = l.checks.map((S) => zc(S.pauli).z), f = gp(u), m = yp(u), w = /* @__PURE__ */ new Map(), j = 4 ** u;
  for (let S = 0; S < j; S++) {
    let C = 0, L = 0, T = S;
    for (let R = 0; R < u; R++) {
      const O = T & 3;
      T >>= 2, (O & 1) !== 0 && (C |= 1 << R), (O & 2) !== 0 && (L |= 1 << R);
    }
    const E = m[C | L] ?? 0, z = (m[C] ?? 0) + (m[L] ?? 0);
    let H = "";
    for (let R = 0; R < s.length; R++)
      H += (f[C & (c[R] ?? 0) ^ L & (s[R] ?? 0)] ?? 0) === 0 ? "0" : "1";
    const A = w.get(H);
    A === void 0 || E < A.weight || E === A.weight && z < A.symplecticWeight ? w.set(H, { weight: E, symplecticWeight: z, candidates: [S] }) : E === A.weight && z === A.symplecticWeight && A.candidates.push(S);
  }
  return { n: u, entries: w };
}
function vd(l) {
  let u = Zc.get(l.id);
  return u === void 0 && (u = vp(l), Zc.set(l.id, u)), u;
}
function wp(l, u) {
  let s = 0, c = 0, f = u;
  for (let m = 0; m < l; m++) {
    const w = f & 3;
    f >>= 2, (w & 1) !== 0 && (s |= 1 << m), (w & 2) !== 0 && (c |= 1 << m);
  }
  return Z0(l, s, c);
}
function xp(l, u) {
  if (u.length !== l.checks.length)
    throw new RangeError(`syndrome has ${String(u.length)} bits but code ${l.id} has ${String(l.checks.length)} checks`);
  const s = vd(l).entries.get(Xc(u));
  if (s === void 0) throw new Error(`syndrome ${Xc(u)} is not produced by any Pauli on code ${l.id}`);
  return s;
}
function kp(l) {
  const u = vd(l);
  return {
    name: `min-weight lookup (${l.id})`,
    decode(s) {
      const f = xp(l, s).candidates[0];
      return f === void 0 ? ci(u.n) : wp(u.n, f);
    }
  };
}
function wd(l, u, s) {
  return yd(l, So(u, s));
}
const Sp = [
  {
    allowed: [
      "X"
    ],
    briefing: "Welcome to dispatch. Three city blocks stand in a row with two alarm stations between them. Our arsonist, Noise, only lights red fires here (X errors). A station rings when exactly one of its two blocks is burning. Read the alarms, then send one red crew.",
    budget: 1,
    challenge: {
      circuit: [],
      error: "IXI"
    },
    code: "rep3",
    debrief: {
      detectable: "At least one station is still ringing: either the original fire is still burning, or a crew lit a new one on a safe block. Each station watches two blocks; the burning block is the one every ringing station shares.",
      "logical-error": "Every alarm is quiet, yet the pattern left behind is a full logical flip (XXX). A crew sent to a safe block starts a fire of its own, so silence alone never proves safety. Compare your dispatch with the alarms in the replay.",
      success: "Both stations rang, and block 1 is the only block they share. Your red crew met the fire head on, and two red flames cancel (X·X = I). The logical qubit is safe."
    },
    expected: {
      minWeightCorrection: "IXI",
      minWeightVerdict: "success",
      propagated: "IXI",
      syndrome: [
        1,
        1
      ]
    },
    id: "first-alarm",
    index: 1,
    kind: "dispatch",
    title: "First Alarm",
    training: [
      {
        caption: "A red fire (X) on block 0. Station Z0 watches blocks 0 and 1, sees exactly one fire, and rings. Station Z1 watches blocks 1 and 2, sees none, and stays quiet.",
        circuit: [],
        error: "XII"
      }
    ]
  },
  {
    allowed: [
      "X",
      "Z",
      "Y"
    ],
    briefing: "Fires never spread on their own; gates carry them. A CNOT copies a red fire (X) from its control to its target, and copies a blue fire (Z) from its target back to its control. Watch the training runs, then predict where the fires end up and send crews there.",
    budget: 2,
    challenge: {
      circuit: [
        {
          c: 0,
          kind: "CNOT",
          t: 1
        }
      ],
      error: "XZ"
    },
    code: "trivial2",
    debrief: {
      detectable: "This lesson has no alarm stations, so a ringing alarm cannot occur here.",
      "logical-error": "There are no alarm stations on bare wires, so any fire you missed, or lit by mistake, acts directly on the data. Check both colours on each block: a Y fire needs both a red and a blue component to put it out.",
      success: "Red went forward and blue went backward at the same time, so XZ became YY: a red-and-blue fire on both blocks. Your crews matched every component, and nothing remains."
    },
    expected: {
      minWeightCorrection: "YY",
      minWeightVerdict: "success",
      propagated: "YY",
      syndrome: []
    },
    id: "red-forward-blue-backward",
    index: 2,
    kind: "propagation",
    title: "Red Forward / Blue Backward",
    training: [
      {
        caption: "Red forward: a red fire (X) on the control copies onto the target. XI becomes XX.",
        circuit: [
          {
            c: 0,
            kind: "CNOT",
            t: 1
          }
        ],
        error: "XI"
      },
      {
        caption: "Blue backward: a blue fire (Z) on the target copies onto the control. IZ becomes ZZ.",
        circuit: [
          {
            c: 0,
            kind: "CNOT",
            t: 1
          }
        ],
        error: "IZ"
      }
    ]
  },
  {
    allowed: [
      "X",
      "Z",
      "Y"
    ],
    briefing: "A Hadamard gate swaps colours: red becomes blue and blue becomes red, on its own wire only. Combined with a CNOT, a single fire can change colour, copy itself, and change colour again. Follow the circuit one gate at a time.",
    budget: 2,
    challenge: {
      circuit: [
        {
          kind: "H",
          q: 0
        },
        {
          c: 0,
          kind: "CNOT",
          t: 1
        },
        {
          kind: "H",
          q: 1
        }
      ],
      error: "ZI"
    },
    code: "trivial2",
    debrief: {
      detectable: "This lesson has no alarm stations, so a ringing alarm cannot occur here.",
      "logical-error": "One of the fires ended up with a different colour, or on a different block, than you dispatched for. Replay the circuit: H swaps colours only on its own wire, and CNOT copies red forward and blue backward.",
      success: "ZI turned into XI at the first Hadamard, copied forward to XX through the CNOT, and the final Hadamard on block 1 turned that copy blue: XZ. You traced the whole path."
    },
    expected: {
      minWeightCorrection: "XZ",
      minWeightVerdict: "success",
      propagated: "XZ",
      syndrome: []
    },
    id: "color-switch",
    index: 3,
    kind: "propagation",
    title: "Color Switch",
    training: [
      {
        caption: "Colour switch: a Hadamard turns the red fire (X) on block 0 into a blue one (Z). XI becomes ZI.",
        circuit: [
          {
            kind: "H",
            q: 0
          }
        ],
        error: "XI"
      },
      {
        caption: "Blue turns red at the H, then red copies forward through the CNOT. ZI becomes XX.",
        circuit: [
          {
            kind: "H",
            q: 0
          },
          {
            c: 0,
            kind: "CNOT",
            t: 1
          }
        ],
        error: "ZI"
      }
    ]
  },
  {
    allowed: [
      "X",
      "Z"
    ],
    briefing: "Welcome to the surface code district: nine blocks and eight alarm stations. Red stations (Z checks, diamonds) notice red fires; blue stations (X checks, squares) notice blue fires. This time the fire is hidden. Read the alarms and send one crew.",
    budget: 1,
    challenge: {
      circuit: [],
      error: "IIIIXIIII"
    },
    code: "rsc3",
    debrief: {
      detectable: "Alarms are still ringing. A red crew on a block that was not burning starts a new fire, and a blue crew cannot put out a red fire at all. Match the crew colour to the station type, then find the block that every ringing station shares.",
      "logical-error": "The alarms went quiet, but the pattern left behind acts as a logical operator on the encoded qubit. With one hidden fire and one crew this cannot happen in this district; Silent Failure shows when it does.",
      success: "Stations Z0 and Z1 both rang, and block 4 is the only block they share. One red crew, fire out, logical qubit safe."
    },
    expected: {
      minWeightCorrection: "IIIIXIIII",
      minWeightVerdict: "success",
      propagated: "IIIIXIIII",
      syndrome: [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    id: "blind-dispatch",
    index: 4,
    kind: "dispatch",
    title: "Blind Dispatch",
    training: [
      {
        caption: "A red fire (X) on block 0 rings only station Z0, which watches blocks 0, 1, 3 and 4. A fire on block 3 alone would ring exactly the same station, so a crew sent to block 3 is just as good a fix: the two dispatches differ by a stabilizer (the X2 station's own pattern), which the code does not care about.",
        circuit: [],
        error: "XIIIIIIII"
      }
    ]
  },
  {
    allowed: [
      "X",
      "Z"
    ],
    briefing: "Two fires this time, and they may be different colours. Red stations only ever notice red fires and blue stations only blue ones, so read the two alarm maps separately. You have two crews, one red and one blue, and each block takes at most one crew.",
    budget: 2,
    challenge: {
      circuit: [],
      error: "IXIIIIIZI"
    },
    code: "rsc3",
    debrief: {
      detectable: "Some stations are still ringing. Remember that a red station never sees a blue fire: solve the red alarms and the blue alarms as two separate puzzles, one crew colour each.",
      "logical-error": "Every alarm is quiet but the leftover pattern is a logical operator: your crews and the fires together form a chain across the district instead of cancelling. The replay shows where the chain runs.",
      success: "Red stations Z0 and Z2 share only block 1. Blue station X1 rang alone, which points at its boundary pair, blocks 6 and 7; a blue crew on either one works, because the two choices differ by a stabilizer. Two colours, two fires, both out."
    },
    expected: {
      minWeightCorrection: "IXIIIIZII",
      minWeightVerdict: "success",
      propagated: "IXIIIIIZI",
      syndrome: [
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0
      ]
    },
    id: "two-kinds-of-trouble",
    index: 5,
    kind: "dispatch",
    title: "Two Kinds of Trouble",
    training: []
  },
  {
    allowed: [
      "X",
      "Z"
    ],
    briefing: "Only one alarm is ringing: station Z0. Dispatch protocol is simple: send the smallest crew that silences every station. Make the call, and then we will look at what really happened.",
    budget: 2,
    challenge: {
      circuit: [],
      error: "IXXIIIIII"
    },
    code: "rsc3",
    debrief: {
      detectable: "Stations are still ringing, so the smallest silencing crew was not sent. Protocol for a lone Z0 alarm is one red crew on block 0 or block 3; replay the alarms and compare.",
      "logical-error": "That was the optimal call. Only Z0 rang, and the best explanation of one alarm is one fire, on block 0 or block 3. But Noise lit two fires, on blocks 1 and 2. Your crew plus those two fires form X on blocks 0, 1 and 2: a logical X, which every station sees as an even count and so cannot detect. This code has distance 3: any single fire is always fixed, but two fires can fool any dispatcher, because no alarm pattern justified sending crews to blocks 1 and 2. That is why real machines use bigger codes.",
      success: "You put out both fires, on blocks 1 and 2. Honest question: how did you know? The alarms were identical to a single fire on block 0 or block 3, so this was a guess that happened to land. Protocol would still send one crew to block 0."
    },
    expected: {
      minWeightCorrection: "XIIIIIIII",
      minWeightVerdict: "logical-error",
      propagated: "IXXIIIIII",
      syndrome: [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    },
    id: "silent-failure",
    index: 6,
    kind: "dispatch",
    title: "Silent Failure",
    training: []
  }
], jp = ["success", "logical-error", "detectable"];
function er(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Oe(l, u) {
  if (typeof l != "string") throw new Error(`missions.json: ${u} must be a string`);
  return l;
}
function nn(l, u) {
  if (typeof l != "number" || !Number.isInteger(l)) throw new Error(`missions.json: ${u} must be an integer`);
  return l;
}
function Ep(l, u = "gate") {
  if (!er(l)) throw new Error(`${u} must be an object`);
  const s = Oe(l.kind, `${u}.kind`);
  switch (s) {
    case "H":
    case "S":
      return { kind: s, q: nn(l.q, `${u}.q`) };
    case "CNOT":
      return { kind: s, c: nn(l.c, `${u}.c`), t: nn(l.t, `${u}.t`) };
    case "CZ":
    case "SWAP":
      return { kind: s, a: nn(l.a, `${u}.a`), b: nn(l.b, `${u}.b`) };
    default:
      throw new Error(`${u}.kind '${s}' is not a supported gate`);
  }
}
function Bc(l, u = "circuit") {
  if (!Array.isArray(l)) throw new Error(`${u} must be an array`);
  return l.map((s, c) => Ep(s, `${u}[${String(c)}]`));
}
function Np(l, u) {
  if (!er(l)) throw new Error(`missions.json: ${u} must be an object`);
  if (!Array.isArray(l.syndrome)) throw new Error(`missions.json: ${u}.syndrome must be an array`);
  const s = l.syndrome.map((f, m) => {
    const w = nn(f, `${u}.syndrome[${String(m)}]`);
    if (w !== 0 && w !== 1) throw new Error(`missions.json: ${u}.syndrome bits must be 0/1`);
    return w;
  }), c = Oe(l.minWeightVerdict, `${u}.minWeightVerdict`);
  if (!jp.includes(c)) throw new Error(`missions.json: ${u}.minWeightVerdict invalid`);
  return {
    syndrome: s,
    propagated: Oe(l.propagated, `${u}.propagated`),
    minWeightCorrection: Oe(l.minWeightCorrection, `${u}.minWeightCorrection`),
    minWeightVerdict: c
  };
}
function Cp(l, u = "mission") {
  if (!er(l)) throw new Error(`missions.json: ${u} must be an object`);
  const s = Oe(l.id, `${u}.id`), c = Oe(l.code, `${u}.code`);
  if (!lp(c)) throw new Error(`missions.json: ${s}.code '${c}' is unknown`);
  const f = ot(c), m = Oe(l.kind, `${s}.kind`);
  if (m !== "dispatch" && m !== "propagation") throw new Error(`missions.json: ${s}.kind must be dispatch|propagation`);
  if (!Array.isArray(l.training)) throw new Error(`missions.json: ${s}.training must be an array`);
  const w = l.training.map((A, R) => {
    const O = `${s}.training[${String(R)}]`;
    if (!er(A)) throw new Error(`missions.json: ${O} must be an object`);
    const q = Oe(A.error, `${O}.error`);
    if (an(q).n !== f.n) throw new Error(`missions.json: ${O}.error length must be ${String(f.n)}`);
    const je = Bc(A.circuit, `${O}.circuit`);
    return mo(je, f.n), { error: q, circuit: je, caption: Oe(A.caption, `${O}.caption`) };
  }), j = l.challenge;
  if (!er(j)) throw new Error(`missions.json: ${s}.challenge must be an object`);
  const S = Oe(j.error, `${s}.challenge.error`);
  if (an(S).n !== f.n) throw new Error(`missions.json: ${s}.challenge.error length must be ${String(f.n)}`);
  const C = Bc(j.circuit, `${s}.challenge.circuit`);
  if (mo(C, f.n), m === "dispatch" && C.length > 0) throw new Error(`missions.json: ${s} is a dispatch mission but has a circuit`);
  if (!Array.isArray(l.allowed) || l.allowed.length === 0) throw new Error(`missions.json: ${s}.allowed must be a non-empty array`);
  const L = l.allowed.map((A, R) => {
    const O = Oe(A, `${s}.allowed[${String(R)}]`);
    if (!od(O) || O === "I") throw new Error(`missions.json: ${s}.allowed[${String(R)}] must be X, Y or Z`);
    return O;
  }), T = nn(l.budget, `${s}.budget`);
  if (T < 1 || T > f.n) throw new Error(`missions.json: ${s}.budget out of range`);
  const E = l.debrief;
  if (!er(E)) throw new Error(`missions.json: ${s}.debrief must be an object`);
  const z = {
    success: Oe(E.success, `${s}.debrief.success`),
    "logical-error": Oe(E["logical-error"], `${s}.debrief.logical-error`),
    detectable: Oe(E.detectable, `${s}.debrief.detectable`)
  }, H = l.expected === void 0 || l.expected === null ? null : Np(l.expected, `${s}.expected`);
  return {
    id: s,
    index: nn(l.index, `${s}.index`),
    title: Oe(l.title, `${s}.title`),
    code: c,
    kind: m,
    training: w,
    challenge: { error: S, circuit: C },
    allowed: L,
    budget: T,
    briefing: Oe(l.briefing, `${s}.briefing`),
    debrief: z,
    expected: H
  };
}
function Ip(l) {
  if (!Array.isArray(l)) throw new Error("missions.json: root must be an array");
  const u = [], s = /* @__PURE__ */ new Set();
  return l.forEach((c, f) => {
    const m = Cp(c, `missions[${String(f)}]`);
    if (m.expected === null) throw new Error(`missions.json: ${m.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (s.has(m.id)) throw new Error(`missions.json: duplicate id ${m.id}`);
    if (s.add(m.id), m.index !== f + 1) throw new Error(`missions.json: ${m.id} index ${String(m.index)} should be ${String(f + 1)}`);
    u.push({ ...m, expected: m.expected });
  }), u;
}
let Vc;
function xd() {
  return Vc ??= Ip(Sp), Vc;
}
function _p(l) {
  const u = xd().find((s) => s.id === l);
  if (u === void 0) throw new Error(`unknown mission '${l}'`);
  return u;
}
function Tp(l) {
  const u = ot(l.code), s = l.allowed.filter(b0), c = l.kind === "dispatch" ? on(rr(u, an(l.challenge.error))) : [];
  return {
    id: l.id,
    index: l.index,
    title: l.title,
    code: l.code,
    kind: l.kind,
    allowed: s,
    budget: l.budget,
    briefing: l.briefing,
    circuit: l.challenge.circuit,
    syndrome: c,
    visibleStart: l.kind === "propagation" ? l.challenge.error : null,
    training: l.training.map((f) => ({ fire: f.error, circuit: f.circuit, caption: f.caption }))
  };
}
let Hc;
function lr() {
  return Hc ??= xd().map(Tp), Hc;
}
function kd(l) {
  const u = lr().find((s) => s.id === l);
  if (u === void 0) throw new Error(`unknown mission '${l}'`);
  return u;
}
function $p(l) {
  const u = lr(), s = u.findIndex((f) => f.id === l), c = u[s + 1];
  return c === void 0 ? null : c.id;
}
function Pp(l) {
  return _p(l);
}
function Rp(l) {
  const u = wd(l.code, l.crews, l.decoderCrews), s = vt(l.crews) <= vt(l.decoderCrews);
  return u && s && l.outcome === "success" ? "optimal" : u && l.outcome === "logical-error" ? "unlucky" : l.outcome === "success" ? "valid" : "off";
}
function Lp(l, u, s) {
  return u === "success" && l === "optimal" ? 3 : u === "success" && l === "valid" ? 2 : l === "unlucky" || u === "detectable" && s <= 1 ? 1 : 0;
}
function Op(l) {
  const u = Rp(l), s = vt(So(l.crews, l.decoderCrews)), c = Lp(u, l.outcome, s);
  return {
    outcome: l.outcome,
    quality: u,
    stars: c,
    crewsUsed: vt(l.crews),
    minCrews: vt(l.decoderCrews),
    completed: l.outcome === "success" || u === "unlucky"
  };
}
const Sd = {
  optimal: "Optimal call",
  valid: "Valid, but costly",
  unlucky: "Optimal call, unlucky outcome",
  off: "Off target"
}, Co = {
  success: "Logical qubit safe",
  "logical-error": "Silent failure — logical qubit flipped",
  detectable: "Fires still burning"
};
function Qc(l) {
  switch (l.kind) {
    case "H":
      return `H on block ${String(l.q)}`;
    case "S":
      return `S on block ${String(l.q)}`;
    case "CNOT":
      return `CNOT from block ${String(l.c)} to block ${String(l.t)}`;
    case "CZ":
      return `CZ between blocks ${String(l.a)} and ${String(l.b)}`;
    case "SWAP":
      return `SWAP of blocks ${String(l.a)} and ${String(l.b)}`;
  }
}
const jd = { X: "red", Z: "blue", Y: "red-and-blue" };
function Yc(l) {
  const u = ad(l);
  if (u.length === 0) return "no fires";
  const s = u.map((c) => {
    const f = fi(l, c);
    return `a ${jd[f] ?? ""} fire (${f}) on block ${String(c)}`;
  });
  return s.length === 1 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1] ?? ""}`;
}
function zp(l) {
  const u = ad(l);
  if (u.length === 0) return "no crews";
  const s = u.map((c) => {
    const f = fi(l, c);
    return `a ${jd[f] ?? ""} crew (${f}) to block ${String(c)}`;
  });
  return s.length === 1 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1] ?? ""}`;
}
function Ap(l, u) {
  if (l.checks.length === 0) return "This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.";
  const s = gd(l, u);
  return s.length === 0 ? "Every station reads an even count and stays quiet." : `Alarms: ${s.join(", ")} ring${s.length === 1 ? "s" : ""}. Each ringing station sees an odd number of fires of its colour.`;
}
function Mp(l, u) {
  switch (l.kind) {
    case "success":
      return vt(l.residual) === 0 ? "Residual is the identity: every fire is out. Logical qubit safe." : `Residual ${se(l.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case "logical-error": {
      const s = [];
      return l.logicalFlip.x.forEach((c, f) => {
        c && s.push(u.k === 1 ? "logical X" : `logical X${String(f)}`);
      }), l.logicalFlip.z.forEach((c, f) => {
        c && s.push(u.k === 1 ? "logical Z" : `logical Z${String(f)}`);
      }), `Residual ${se(l.residual)} commutes with every station yet is not a stabilizer: it acts as ${s.join(" and ")}. Silent failure.`;
    }
    case "detectable":
      return `Residual ${se(l.residual)} still trips ${gd(u, l.syndrome).join(", ")}. Fires are still burning.`;
  }
}
function bp(l) {
  const { code: u, start: s, circuit: c, crews: f, verdict: m } = l, w = jo(s, c), j = [], S = w.frames[w.frames.length - 1] ?? s, C = se(s);
  j.push({
    id: "placed",
    caption: `Noise lit ${Yc(s)}.`,
    fires: C,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: !1
  }), c.forEach((H, A) => {
    const R = w.frames[A] ?? s, O = w.frames[A + 1] ?? R, q = se(R) !== se(O);
    j.push({
      id: `gate-${String(A)}`,
      caption: q ? `${Qc(H)}: ${se(R)} becomes ${se(O)}.` : `${Qc(H)}: the fire pattern ${se(R)} is unchanged.`,
      fires: se(O),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: A,
      showVerdict: !1
    });
  });
  const L = rr(u, S), T = on(L), E = se(S);
  j.push({
    id: "alarms",
    caption: Ap(u, L),
    fires: E,
    crews: null,
    residual: null,
    syndrome: T,
    gateCursor: c.length,
    showVerdict: !1
  }), j.push({
    id: "dispatch",
    caption: `Your dispatch: ${zp(f)}.`,
    fires: E,
    crews: se(f),
    residual: null,
    syndrome: T,
    gateCursor: c.length,
    showVerdict: !1
  });
  const z = se(m.residual);
  return j.push({
    id: "residual",
    caption: vt(m.residual) === 0 ? "Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains." : `Crews meet fires (XOR): what remains is ${z}, that is ${Yc(m.residual)}.`,
    fires: E,
    crews: se(f),
    residual: z,
    syndrome: on(m.syndrome),
    gateCursor: c.length,
    showVerdict: !1
  }), j.push({
    id: "verdict",
    caption: Mp(m, u),
    fires: E,
    crews: se(f),
    residual: z,
    syndrome: on(m.syndrome),
    gateCursor: c.length,
    showVerdict: !0
  }), j;
}
function Dp(l) {
  const { code: u, finalFire: s, crews: c, decoderCrews: f, decoderVerdict: m, equivalent: w, verdict: j } = l, S = se(f), C = se(s), L = C !== S;
  let T;
  return u.checks.length === 0 ? T = w ? `The fire ended as ${C}; your crews matched it exactly, so the prediction was right.` : `The fire ended as ${C}. Crews ${se(c)} differ from it on ${String(vt(j.residual))} block(s); on bare wires every leftover component acts on the data.` : w && j.kind === "success" ? (T = se(c) === S ? "Your dispatch is exactly the minimum-weight dispatch for these alarms." : `Your dispatch ${se(c)} and the minimum-weight dispatch ${S} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`, L && (T += ` The true fires were ${C}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`)) : w && j.kind === "logical-error" ? T = `The minimum-weight dispatch for these alarms is ${S}, and that is what you sent. The true fire was ${C}: two fires that look, to every station, exactly like one. Crews at ${se(s)} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.` : j.kind === "success" ? T = `You succeeded with ${String(vt(c))} crew(s); the minimum-weight dispatch ${S} needs ${String(vt(f))} and its verdict is ${qc[m.kind]}.` : T = `The minimum-weight dispatch for these alarms is ${S} (${qc[m.kind]}). Compare it with your ${se(c)} step by step in the replay.`, {
    decoderCrews: S,
    decoderVerdict: m.kind,
    equivalentToDecoder: w,
    explanation: T,
    trueFireCrews: L ? C : null
  };
}
const qc = {
  success: "success",
  "logical-error": "silent failure",
  detectable: "fires still burning"
}, go = "q11.save.v1", Ed = { sound: !1, reducedMotion: !1 };
function li() {
  return { version: ho, progress: {}, settings: Ed };
}
const Fp = "Saved progress was unreadable and has been reset.";
function ui(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Xp(l) {
  if (!ui(l)) return null;
  const u = {};
  for (const [s, c] of Object.entries(l)) {
    if (!ui(c)) return null;
    const f = c.stars, m = c.attempts, w = c.completed;
    if (f !== 0 && f !== 1 && f !== 2 && f !== 3 || typeof m != "number" || !Number.isInteger(m) || m < 0 || typeof w != "boolean") return null;
    u[s] = { stars: f, attempts: m, completed: w };
  }
  return u;
}
function Wp(l) {
  if (!ui(l)) return null;
  const u = l.sound, s = l.reducedMotion;
  return typeof u != "boolean" || typeof s != "boolean" ? null : { sound: u, reducedMotion: s };
}
function Up(l) {
  if (l === null) return null;
  let u;
  try {
    u = JSON.parse(l);
  } catch {
    return null;
  }
  if (!ui(u) || u.version !== ho) return null;
  const s = Xp(u.progress), c = Wp(u.settings);
  return s === null || c === null ? null : { version: ho, progress: s, settings: c };
}
function Zp(l) {
  if (l === null) return { save: li(), notice: null };
  let u;
  try {
    u = l.getItem(go);
  } catch {
    return { save: li(), notice: null };
  }
  if (u === null) return { save: li(), notice: null };
  const s = Up(u);
  if (s !== null) return { save: s, notice: null };
  const c = li();
  try {
    l.setItem(go, JSON.stringify(c));
  } catch {
  }
  return { save: c, notice: Fp };
}
function Bp(l, u) {
  if (l === null) return !1;
  try {
    return l.setItem(go, JSON.stringify(u)), !0;
  } catch {
    return !1;
  }
}
function Vp() {
  try {
    const l = globalThis.localStorage, u = "__q11_probe__";
    return l.setItem(u, "1"), l.removeItem(u), l;
  } catch {
    return null;
  }
}
const Hp = "Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.", Qp = [{ analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.15, Z1: 0.09, Z2: 0.06, Z3: 0.02 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.5, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 93, 1: 7 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.93], predictedSyndromeShare: 0.69, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000011000010011": 1, "00000100100000010": 1, "00000100100000011": 3, "00000101100000011": 1, "00000111100000011": 1, "00010011000110001": 1, "00011011000000011": 3, "00011011001000011": 1, "00011011001100011": 1, "00011011100000011": 1, "00011100001100011": 1, "00011111100000011": 7, "01101000100000001": 1, "01101000100000010": 1, "01101000100000011": 1, "01101001100000011": 1, "01101100000000011": 2, "01110011001000010": 1, "01110011100000011": 4, "01110011100010111": 1, "01110111000000011": 5, "01110111101000011": 1, "01111111110100011": 1, "10000001011000111": 1, "10000111100110011": 1, "10001001000010111": 1, "10001011000000011": 5, "10001111000000010": 1, "10001111100000011": 2, "10001111100100001": 1, "10010000000000011": 6, "10010100100000011": 5, "10010100100010001": 1, "10010101110100100": 1, "10010111100000010": 1, "10011011000000011": 1, "10110100100101011": 1, "11010000000100011": 1, "11100001100000111": 1, "11100111000000011": 6, "11100111001100011": 1, "11101000110010001": 1, "11110011100010011": 1, "11110111010010001": 1, "11111000100000011": 6, "11111011100000010": 1, "11111100000000011": 4, "11111100000010011": 1, "11111100001001010": 1, "11111111001110010": 1 }, finishedAt: "2026-10-10T01:40:30Z", jobId: "01a12378-c4f2-71ea-b5df-920acd440520", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:40:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.06, Z1: 0.07, Z2: 0.03, Z3: 0.03 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 0, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 3, 1: 97 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.73, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "XIIIIIIII", counts: { "00000011100000001": 3, "00000100100100001": 1, "00000111000000001": 6, "00000111000010001": 1, "00001000110010001": 1, "00010111000000001": 1, "00010111000000011": 1, "00010111010000001": 1, "00011000100000001": 7, "00011000101000001": 1, "00011011001000001": 1, "00011100000000001": 5, "00111011000001001": 1, "01101011000000001": 5, "01101011000010101": 1, "01101011000110001": 1, "01101011001000001": 1, "01101111100000001": 9, "01101111100100001": 1, "01110000000000001": 4, "01110011000100001": 1, "01110100100000000": 1, "01110100100000001": 2, "10000011110000001": 1, "10001000100000001": 7, "10001100000000001": 4, "10010011001000000": 1, "10010011100000001": 4, "10010101000000101": 1, "10110000000001001": 1, "11011000100101001": 1, "11100000000000001": 3, "11100000000100000": 1, "11100011001100001": 1, "11100100100000001": 2, "11100100100010001": 1, "11100111100110000": 1, "11101000000110011": 1, "11110000010010001": 1, "11111001000000101": 1, "11111010010010110": 1, "11111011000000001": 5, "11111111100000001": 6 }, finishedAt: "2026-10-10T01:44:30Z", jobId: "01a1237b-5f60-7349-89d0-a343dca0201c", missionId: "silent-failure", prediction: { equivalentToReference: !0, logicalFlip: { x: [!0], z: [!1] }, referenceCorrection: "XIIIIIIII", referenceVerdict: "logical-error", residual: "XXXIIIIII", syndrome: [1, 0, 0, 0, 0, 0, 0, 0], verdict: "logical-error" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:44:00Z" }], Yp = 1, qp = {
  note: Hp,
  results: Qp,
  schema: Yp
}, Gp = {
  "local-simulator": "Local (Aer)",
  "cached-cloud": "Cached cloud result",
  "live-cloud": "Live cloud result"
};
function Io(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Kp(l) {
  if (!Io(l)) return null;
  const u = {};
  for (const [s, c] of Object.entries(l)) {
    if (typeof c != "number" || !Number.isFinite(c)) return null;
    u[s] = c;
  }
  return u;
}
function Jp(l) {
  if (!Io(l)) return null;
  const u = l.source;
  if (u !== "local-simulator" && u !== "cached-cloud" && u !== "live-cloud") return null;
  const s = Kp(l.counts);
  if (s === null) return null;
  const c = (L) => {
    const T = l[L];
    return typeof T == "string" ? T : null;
  }, f = c("missionId"), m = c("correction"), w = c("backendName"), j = c("startedAt"), S = c("finishedAt"), C = l.shots;
  return f === null || m === null || w === null || j === null || S === null || typeof C != "number" || !Number.isInteger(C) || C <= 0 ? null : {
    status: "ok",
    source: u,
    backendName: w,
    missionId: f,
    correction: m,
    shots: C,
    counts: s,
    analysis: l.analysis ?? null,
    prediction: l.prediction ?? null,
    jobId: c("jobId"),
    startedAt: j,
    finishedAt: S
  };
}
function eh(l) {
  if (!Io(l) || l.schema !== 1 || !Array.isArray(l.results)) return [];
  const u = [];
  for (const s of l.results) {
    const c = Jp(s);
    c !== null && u.push(c);
  }
  return u;
}
function th(l = eh(qp)) {
  return {
    kind: "none",
    cached: (u) => l.filter((s) => s.missionId === u)
  };
}
function nh(l, u = null) {
  return {
    screen: "title",
    returnTo: "title",
    missionId: null,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    selected: "X",
    standDownDialog: !1,
    replayIndex: 0,
    autoPlay: !1,
    debrief: null,
    progress: l?.progress ?? {},
    settings: l?.settings ?? Ed,
    notice: u
  };
}
function rh(l, u) {
  let s = ci(l);
  for (const [c, f] of Object.entries(u)) s = W0(s, Number(c), f);
  return s;
}
function yo(l) {
  return Object.keys(l).length;
}
function st(l) {
  return l.missionId === null ? null : kd(l.missionId);
}
function lh(l, u) {
  const s = Pp(l), c = ot(s.code), f = an(s.challenge.error), m = H0(f, s.challenge.circuit), w = rh(c.n, u), j = Wc(c, m, w), S = on(rr(c, f)), C = s.kind === "dispatch" ? kp(c).decode(fp(S)) : m, L = Wc(c, m, C), T = wd(c, w, C), E = Op({ code: c, outcome: j.kind, crews: w, decoderCrews: C }), z = bp({ kind: s.kind, code: c, start: f, circuit: s.challenge.circuit, crews: w, verdict: j }), H = Dp({
    kind: s.kind,
    code: c,
    finalFire: m,
    crews: w,
    verdict: j,
    equivalent: T,
    decoderCrews: C,
    decoderVerdict: L
  });
  return {
    missionId: l,
    fires: se(m),
    startFires: se(f),
    crews: se(w),
    residual: se(j.residual),
    syndromeOfFires: on(rr(c, m)),
    syndromeOfResidual: on(j.syndrome),
    verdict: j.kind,
    logicalFlip: { x: [...j.logicalFlip.x], z: [...j.logicalFlip.z] },
    score: E,
    narrative: s.debrief[j.kind],
    steps: z,
    whatIf: H
  };
}
function ih(l, u, s, c) {
  const f = l[u], m = {
    stars: f === void 0 ? s : Math.max(f.stars, s),
    attempts: (f?.attempts ?? 0) + 1,
    completed: (f?.completed ?? !1) || c
  };
  return { ...l, [u]: m };
}
function ii(l, u) {
  const s = u.allowed[0] ?? "X";
  return {
    ...l,
    screen: "challenge",
    placements: {},
    selected: u.allowed.includes(l.selected) ? l.selected : s,
    standDownDialog: !1,
    debrief: null,
    replayIndex: 0,
    autoPlay: !1
  };
}
function Gc(l, u) {
  const s = kd(u);
  return {
    ...l,
    screen: "briefing",
    missionId: u,
    lesson: 0,
    lessonCursor: -1,
    placements: {},
    selected: s.allowed[0] ?? "X",
    standDownDialog: !1,
    debrief: null,
    replayIndex: 0,
    autoPlay: !1
  };
}
const fo = ["how", "settings"];
function sh(l, u) {
  switch (u.type) {
    case "HYDRATE":
      return { ...l, progress: u.save.progress, settings: u.save.settings, notice: u.notice ?? l.notice };
    case "PLAY":
      return { ...l, screen: "missions", notice: l.notice };
    case "OPEN_HOW":
      return fo.includes(l.screen) ? { ...l, screen: "how" } : { ...l, screen: "how", returnTo: l.screen };
    case "OPEN_SETTINGS":
      return fo.includes(l.screen) ? { ...l, screen: "settings" } : { ...l, screen: "settings", returnTo: l.screen };
    case "CLOSE_OVERLAY":
      return fo.includes(l.screen) ? { ...l, screen: l.returnTo } : l;
    case "OPEN_MISSIONS":
      return { ...l, screen: "missions", standDownDialog: !1, autoPlay: !1 };
    case "OPEN_TITLE":
      return { ...l, screen: "title", standDownDialog: !1, autoPlay: !1 };
    case "SELECT_MISSION":
      return Gc(l, u.id);
    case "START_MISSION": {
      const s = st(l);
      return s === null || l.screen !== "briefing" ? l : s.training.length > 0 ? { ...l, screen: "training", lesson: 0, lessonCursor: -1 } : ii(l, s);
    }
    case "LESSON_SELECT": {
      const s = st(l);
      return s === null || l.screen !== "training" || u.lesson < 0 || u.lesson >= s.training.length ? l : { ...l, lesson: u.lesson, lessonCursor: -1 };
    }
    case "LESSON_CURSOR": {
      const s = st(l);
      if (s === null || l.screen !== "training") return l;
      const c = s.training[l.lesson];
      if (c === void 0) return l;
      const f = Math.max(-1, Math.min(c.circuit.length - 1, u.cursor));
      return { ...l, lessonCursor: f };
    }
    case "LESSON_NEXT": {
      const s = st(l);
      if (s === null || l.screen !== "training") return l;
      const c = s.training[l.lesson];
      return c === void 0 ? l : l.lessonCursor < c.circuit.length - 1 ? { ...l, lessonCursor: l.lessonCursor + 1 } : l.lesson < s.training.length - 1 ? { ...l, lesson: l.lesson + 1, lessonCursor: -1 } : ii(l, s);
    }
    case "LESSON_PREV": {
      const s = st(l);
      if (s === null || l.screen !== "training") return l;
      if (l.lessonCursor > -1) return { ...l, lessonCursor: l.lessonCursor - 1 };
      if (l.lesson > 0) {
        const c = s.training[l.lesson - 1];
        return { ...l, lesson: l.lesson - 1, lessonCursor: (c?.circuit.length ?? 0) - 1 };
      }
      return l;
    }
    case "START_CHALLENGE": {
      const s = st(l);
      return s === null || l.screen !== "training" && l.screen !== "briefing" ? l : ii(l, s);
    }
    case "SELECT_LETTER": {
      const s = st(l);
      return s === null || l.screen !== "challenge" || !s.allowed.includes(u.letter) ? l : { ...l, selected: u.letter };
    }
    case "TOGGLE_BLOCK": {
      const s = st(l);
      if (s === null || l.screen !== "challenge" || l.standDownDialog) return l;
      const c = ot(s.code).n;
      if (u.qubit < 0 || u.qubit >= c) return l;
      const f = l.placements[u.qubit], m = { ...l.placements };
      if (f === l.selected)
        delete m[u.qubit];
      else if (f !== void 0)
        m[u.qubit] = l.selected;
      else {
        if (yo(l.placements) >= s.budget) return l;
        m[u.qubit] = l.selected;
      }
      return { ...l, placements: m };
    }
    case "CLEAR_CREWS":
      return l.screen !== "challenge" ? l : { ...l, placements: {} };
    case "CONFIRM": {
      const s = st(l);
      return s === null || l.screen !== "challenge" ? l : yo(l.placements) === 0 ? { ...l, standDownDialog: !0 } : Kc(l, s);
    }
    case "STAND_DOWN_CANCEL":
      return { ...l, standDownDialog: !1 };
    case "STAND_DOWN_CONFIRM": {
      const s = st(l);
      return s === null || l.screen !== "challenge" || !l.standDownDialog ? l : Kc(l, s);
    }
    case "REPLAY_GOTO": {
      if (l.debrief === null) return l;
      const s = Math.max(0, Math.min(l.debrief.steps.length - 1, u.index));
      return { ...l, replayIndex: s, autoPlay: s === l.debrief.steps.length - 1 ? !1 : l.autoPlay };
    }
    case "REPLAY_NEXT": {
      if (l.debrief === null) return l;
      const s = l.debrief.steps.length - 1, c = Math.min(s, l.replayIndex + 1);
      return { ...l, replayIndex: c, autoPlay: c === s ? !1 : l.autoPlay };
    }
    case "REPLAY_PREV":
      return l.debrief === null ? l : { ...l, replayIndex: Math.max(0, l.replayIndex - 1), autoPlay: !1 };
    case "REPLAY_AUTO": {
      if (l.debrief === null) return l;
      const s = l.debrief.steps.length - 1;
      return { ...l, autoPlay: u.on, replayIndex: u.on && l.replayIndex >= s ? 0 : l.replayIndex };
    }
    case "SHOW_RESULT":
      return l.debrief === null || l.screen !== "debrief" ? l : { ...l, screen: "result", autoPlay: !1 };
    case "TRY_AGAIN": {
      const s = st(l);
      return s === null || l.screen !== "debrief" && l.screen !== "result" ? l : ii(l, s);
    }
    case "NEXT_MISSION": {
      if (l.missionId === null) return l;
      const s = $p(l.missionId);
      return s === null ? { ...l, screen: "summary", autoPlay: !1 } : Gc(l, s);
    }
    case "SET_SOUND":
      return { ...l, settings: { ...l.settings, sound: u.on } };
    case "SET_REDUCED_MOTION":
      return { ...l, settings: { ...l.settings, reducedMotion: u.on } };
    case "RESET_PROGRESS":
      return { ...l, progress: {}, notice: "Progress reset." };
    case "SHOW_NOTICE":
      return { ...l, notice: u.text };
    case "DISMISS_NOTICE":
      return { ...l, notice: null };
  }
}
function Kc(l, u) {
  const s = lh(u.id, l.placements);
  return {
    ...l,
    screen: "debrief",
    standDownDialog: !1,
    debrief: s,
    replayIndex: s.steps.length - 1,
    autoPlay: !1,
    progress: ih(l.progress, u.id, s.score.stars, s.score.completed)
  };
}
function _o(l) {
  return lr().reduce((u, s) => u + (l[s.id]?.stars ?? 0), 0);
}
const Z = {
  X: "#ff5a3c",
  Z: "#3c8dff",
  Y: "#b86cff",
  alarm: "#ffc53d",
  success: "#3ddc97",
  text: "#e8eefc",
  muted: "#9fb3d9",
  line: "#27416f",
  navy: "#0b1a33",
  panel: "#12264a"
}, rn = { X: "red (X)", Z: "blue (Z)", Y: "red-and-blue (Y)" }, oh = "M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z";
function En({ letter: l, size: u = 28, outlined: s = !1, title: c }) {
  const f = `flame-${l}-${s ? "o" : "f"}`, m = l === "Y" ? `url(#${f}-split)` : Z[l];
  return /* @__PURE__ */ a.jsxs("svg", { className: `glyph glyph-flame glyph-${l}`, width: u, height: u, viewBox: "0 0 24 24", "aria-hidden": c === void 0, role: c === void 0 ? void 0 : "img", children: [
    c !== void 0 ? /* @__PURE__ */ a.jsx("title", { children: c }) : null,
    l === "Y" ? /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("linearGradient", { id: `${f}-split`, x1: "0", x2: "1", y1: "0", y2: "0", children: [
      /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: Z.X }),
      /* @__PURE__ */ a.jsx("stop", { offset: "0.5", stopColor: Z.X }),
      /* @__PURE__ */ a.jsx("stop", { offset: "0.5", stopColor: Z.Z }),
      /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: Z.Z })
    ] }) }) : null,
    /* @__PURE__ */ a.jsx("path", { d: oh, fill: m, fillOpacity: s ? 0.35 : 1, stroke: s ? Z.text : "rgba(0,0,0,0.35)", strokeWidth: s ? 1.6 : 0.8 }),
    /* @__PURE__ */ a.jsx("text", { x: "12", y: "22.6", textAnchor: "middle", fontSize: "6.5", fontWeight: "700", fill: Z.text, fontFamily: "system-ui, sans-serif", children: s ? "R" : l })
  ] });
}
function un({ letter: l, size: u = 24, title: s }) {
  return /* @__PURE__ */ a.jsxs("svg", { className: `glyph glyph-helmet glyph-${l}`, width: u, height: u, viewBox: "0 0 24 24", "aria-hidden": s === void 0, role: s === void 0 ? void 0 : "img", children: [
    s !== void 0 ? /* @__PURE__ */ a.jsx("title", { children: s }) : null,
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "11", fill: Z.navy, stroke: Z[l], strokeWidth: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M5.5 13.5a6.5 6.5 0 0 1 13 0Z", fill: Z[l] }),
    /* @__PURE__ */ a.jsx("rect", { x: "4", y: "13.2", width: "16", height: "2.4", rx: "1.2", fill: Z.text }),
    /* @__PURE__ */ a.jsx("text", { x: "12", y: "21.2", textAnchor: "middle", fontSize: "6.6", fontWeight: "800", fill: Z.text, fontFamily: "system-ui, sans-serif", children: l })
  ] });
}
function vo({ type: l, ringing: u, size: s = 22, title: c }) {
  return /* @__PURE__ */ a.jsxs("svg", { className: `glyph glyph-station ${u ? "is-ringing" : ""}`, width: s, height: s, viewBox: "-14 -14 28 28", "aria-hidden": c === void 0, role: c === void 0 ? void 0 : "img", children: [
    c !== void 0 ? /* @__PURE__ */ a.jsx("title", { children: c }) : null,
    /* @__PURE__ */ a.jsx(Nd, { type: l, ringing: u, r: 10 })
  ] });
}
function Nd({ type: l, ringing: u, r: s }) {
  const c = u ? Z.alarm : l === "Z" ? Z.X : Z.Z, f = u ? Z.alarm : Z.panel, m = u ? Z.navy : Z.text, w = l === "Z" ? /* @__PURE__ */ a.jsx("polygon", { points: `0,${String(-s)} ${String(s)},0 0,${String(s)} ${String(-s)},0`, fill: f, stroke: c, strokeWidth: u ? 3 : 1.6, strokeLinejoin: "round" }) : /* @__PURE__ */ a.jsx("rect", { x: -s * 0.85, y: -s * 0.85, width: s * 1.7, height: s * 1.7, rx: s * 0.18, fill: f, stroke: c, strokeWidth: u ? 3 : 1.6 });
  return /* @__PURE__ */ a.jsxs("g", { className: u ? "station-shape is-ringing" : "station-shape", children: [
    u ? /* @__PURE__ */ a.jsx("circle", { r: s * 1.45, fill: "none", stroke: Z.alarm, strokeWidth: 1.2, opacity: 0.7, className: "station-pulse" }) : null,
    w,
    /* @__PURE__ */ a.jsx("text", { y: s * 0.42, textAnchor: "middle", fontSize: s * 1.05, fontWeight: 800, fill: m, fontFamily: "system-ui, sans-serif", children: u ? "!" : l })
  ] });
}
function uh({ filled: l, size: u = 22 }) {
  return /* @__PURE__ */ a.jsx("svg", { width: u, height: u, viewBox: "0 0 24 24", "aria-hidden": "true", className: l ? "star is-filled" : "star", children: /* @__PURE__ */ a.jsx("path", { d: "M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z", fill: l ? Z.alarm : "none", stroke: l ? Z.alarm : Z.muted, strokeWidth: "1.5", strokeLinejoin: "round" }) });
}
function Cd({ size: l = 22 }) {
  return /* @__PURE__ */ a.jsx("svg", { width: l, height: l, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function ah({ size: l = 72 }) {
  return /* @__PURE__ */ a.jsxs("svg", { width: l, height: l, viewBox: "0 0 512 512", role: "img", "aria-label": "Q11 mark: a Q-shaped protective ring with a small flame inside", children: [
    /* @__PURE__ */ a.jsxs("g", { fill: "none", stroke: "#8fc1ff", strokeWidth: "56", strokeLinecap: "round", children: [
      /* @__PURE__ */ a.jsx("circle", { cx: "248", cy: "240", r: "170" }),
      /* @__PURE__ */ a.jsx("line", { x1: "334", y1: "326", x2: "424", y2: "416" })
    ] }),
    /* @__PURE__ */ a.jsx("path", { fill: "#ff5a3c", transform: "translate(158 125.2) scale(0.8)", d: "M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" })
  ] });
}
function Id(l, u) {
  const s = ot(l);
  if (s.checks.length === 0) return "This district has no alarm stations.";
  if (u === null) return "Alarms not read yet.";
  const c = s.checks.filter((f, m) => (u[m] ?? 0) === 1).map((f) => f.id);
  return c.length === 0 ? `All ${String(s.checks.length)} stations quiet.` : `${String(c.length)} of ${String(s.checks.length)} stations ringing: ${c.join(", ")}.`;
}
function To({ codeId: l, syndrome: u, id: s, compact: c = !1 }) {
  const f = ot(l);
  return f.checks.length === 0 ? /* @__PURE__ */ a.jsxs("section", { className: "panel-section", "aria-labelledby": s === void 0 ? void 0 : `${s}-h`, children: [
    /* @__PURE__ */ a.jsx("h3", { id: s === void 0 ? void 0 : `${s}-h`, className: "panel-title", children: "Alarms" }),
    /* @__PURE__ */ a.jsx("p", { className: "muted", id: s, children: "No alarm stations on bare wires. Predict where the fires end up." })
  ] }) : /* @__PURE__ */ a.jsxs("section", { className: "panel-section", "aria-labelledby": s === void 0 ? void 0 : `${s}-h`, children: [
    /* @__PURE__ */ a.jsx("h3", { id: s === void 0 ? void 0 : `${s}-h`, className: "panel-title", children: "Alarms" }),
    /* @__PURE__ */ a.jsx("p", { className: "sr-only", id: s, "aria-live": "polite", children: Id(l, u) }),
    /* @__PURE__ */ a.jsx("ul", { className: `alarm-list ${f.checks.length > 4 ? "is-grid" : ""} ${c ? "is-compact" : ""}`, "aria-label": "Alarm stations", children: f.checks.map((m, w) => {
      const j = u !== null && (u[w] ?? 0) === 1;
      return /* @__PURE__ */ a.jsxs("li", { className: j ? "alarm is-ringing" : "alarm", "data-check": m.id, "data-ringing": j ? "1" : "0", children: [
        /* @__PURE__ */ a.jsx(vo, { type: m.type, ringing: j, size: 22 }),
        /* @__PURE__ */ a.jsxs("span", { className: "alarm-main", children: [
          /* @__PURE__ */ a.jsx("span", { className: "alarm-id", children: m.id }),
          /* @__PURE__ */ a.jsxs("span", { className: "alarm-blocks", children: [
            "blocks ",
            m.qubits.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ a.jsx("span", { className: "alarm-state", children: u === null ? "—" : j ? "RINGING" : "quiet" })
      ] }, m.id);
    }) })
  ] });
}
const Jc = { X: "1", Z: "2", Y: "3" }, ed = { X: "puts out red fires", Z: "puts out blue fires", Y: "puts out red-and-blue fires" };
function ch({ allowed: l, selected: u, onSelect: s }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "panel-section", "aria-labelledby": "palette-h", children: [
    /* @__PURE__ */ a.jsx("h3", { id: "palette-h", className: "panel-title", children: "Crews" }),
    /* @__PURE__ */ a.jsx("div", { className: "palette", role: "radiogroup", "aria-label": "Crew colour", children: ["X", "Z", "Y"].filter((c) => l.includes(c)).map((c) => /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": u === c,
        className: `palette-btn palette-${c} ${u === c ? "is-selected" : ""}`,
        onClick: () => s(c),
        "aria-label": `${rn[c]} crew, ${ed[c]}, key ${Jc[c]}`,
        "data-testid": `palette-${c}`,
        children: [
          /* @__PURE__ */ a.jsx(un, { letter: c, size: 30 }),
          /* @__PURE__ */ a.jsxs("span", { className: "palette-text", children: [
            /* @__PURE__ */ a.jsxs("span", { className: "palette-name", children: [
              c,
              " crew"
            ] }),
            /* @__PURE__ */ a.jsx("span", { className: "palette-hint", children: ed[c] })
          ] }),
          /* @__PURE__ */ a.jsx("kbd", { className: "palette-key", "aria-hidden": "true", children: Jc[c] })
        ]
      },
      c
    )) })
  ] });
}
function dh({ verdict: l }) {
  return /* @__PURE__ */ a.jsxs("div", { className: `verdict verdict-${l}`, role: "status", "data-testid": "verdict", children: [
    /* @__PURE__ */ a.jsx("span", { className: "verdict-icon", "aria-hidden": "true", children: l === "success" ? /* @__PURE__ */ a.jsx(fh, {}) : l === "detectable" ? /* @__PURE__ */ a.jsx(En, { letter: "X", size: 26 }) : /* @__PURE__ */ a.jsx(ph, {}) }),
    /* @__PURE__ */ a.jsx("span", { className: "verdict-text", children: Co[l] })
  ] });
}
function fh() {
  return /* @__PURE__ */ a.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "10.5", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 12.5l3.2 3.2L17 8.8", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ph() {
  return /* @__PURE__ */ a.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 3 2.5 20h19Z", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 9v5", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "17", r: "1.3", fill: "currentColor" })
  ] });
}
function Vr({ count: l, size: u = 22, label: s }) {
  return /* @__PURE__ */ a.jsx("span", { className: "stars", role: "img", "aria-label": s ?? `${String(l)} of 3 stars`, children: [0, 1, 2].map((c) => /* @__PURE__ */ a.jsx(uh, { filled: c < l, size: u }, c)) });
}
function zt({ title: l, subtitle: u, onMissions: s, onSettings: c, onTitle: f }) {
  return /* @__PURE__ */ a.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "topbar-title", children: [
      f === void 0 ? /* @__PURE__ */ a.jsx("span", { className: "brand", children: "Q11" }) : /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost brand-btn", onClick: f, "aria-label": "Back to title", children: "Q11" }),
      /* @__PURE__ */ a.jsxs("div", { className: "topbar-text", children: [
        /* @__PURE__ */ a.jsx("h1", { className: "topbar-h", children: l }),
        u !== void 0 ? /* @__PURE__ */ a.jsx("p", { className: "topbar-sub", children: u }) : null
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("nav", { className: "topbar-actions", "aria-label": "Game", children: [
      s !== void 0 ? /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost", onClick: s, children: "Missions" }) : null,
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: c, "aria-label": "Settings", children: /* @__PURE__ */ a.jsx(Cd, {}) })
    ] })
  ] });
}
function hh({ text: l, onDismiss: u }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "notice", role: "status", "data-testid": "notice", children: [
    /* @__PURE__ */ a.jsx("span", { children: l }),
    /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: u, "aria-label": "Dismiss notice", children: "Dismiss" })
  ] });
}
function _d({ title: l, children: u, confirmLabel: s, cancelLabel: c = "Cancel", onConfirm: f, onCancel: m, danger: w = !1 }) {
  const j = xe.useRef(null);
  return xe.useEffect(() => {
    j.current?.focus();
    const S = (C) => {
      C.key === "Escape" && m();
    };
    return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [m]), /* @__PURE__ */ a.jsx("div", { className: "dialog-backdrop", role: "presentation", children: /* @__PURE__ */ a.jsxs("div", { className: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "dialog-h", "aria-describedby": "dialog-d", children: [
    /* @__PURE__ */ a.jsx("h2", { id: "dialog-h", className: "dialog-title", children: l }),
    /* @__PURE__ */ a.jsx("div", { id: "dialog-d", className: "dialog-body", children: u }),
    /* @__PURE__ */ a.jsxs("div", { className: "dialog-actions", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", ref: j, onClick: m, children: c }),
      /* @__PURE__ */ a.jsx("button", { type: "button", className: w ? "btn btn-danger" : "btn btn-primary", onClick: f, children: s })
    ] })
  ] }) });
}
function mh({ allowed: l }) {
  return /* @__PURE__ */ a.jsxs("ul", { className: "legend", "aria-label": "Legend", children: [
    l.map((u) => /* @__PURE__ */ a.jsxs("li", { children: [
      /* @__PURE__ */ a.jsx(En, { letter: u, size: 20 }),
      " ",
      rn[u],
      " fire"
    ] }, `f-${u}`)),
    l.map((u) => /* @__PURE__ */ a.jsxs("li", { children: [
      /* @__PURE__ */ a.jsx(un, { letter: u, size: 20 }),
      " ",
      rn[u],
      " crew"
    ] }, `c-${u}`))
  ] });
}
const yt = 100, td = 34;
function ln(l, u) {
  if (l === null) return "I";
  const s = an(l);
  return u < s.n ? fi(s, u) : "I";
}
function Td(l) {
  return l === "I" ? null : l;
}
function $o(l) {
  return No(l.codeId).kind === "wires" ? /* @__PURE__ */ a.jsx(kh, { ...l }) : /* @__PURE__ */ a.jsx(vh, { ...l });
}
function $d({ q: l, center: u, r: s, W: c, H: f, fire: m, crew: w, residual: j, interactive: S, selected: C, budgetReached: L, onToggle: T, onKeyDown: E }) {
  const z = {
    left: `${String(u.x / c * 100)}%`,
    top: `${String(u.y / f * 100)}%`,
    width: `${String(2 * s / c * 100)}%`
  }, H = [`Block ${String(l)}`];
  j !== null ? j !== "I" ? H.push(`residual ${rn[j]} fire`) : (m !== "I" || w !== null) && H.push("fire out") : m !== "I" && H.push(`${rn[m]} fire`), w !== null && H.push(`${rn[w]} crew`), S && (w === null ? H.push(L ? "no crews left" : `press to send ${C === void 0 ? "a" : rn[C]} crew`) : w === C ? H.push("press to recall the crew") : H.push(`press to switch to ${C === void 0 ? "another" : rn[C]} crew`));
  const A = H.join(", "), R = j !== null, O = /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("span", { className: "block-label", "aria-hidden": "true", children: l }),
    /* @__PURE__ */ a.jsx("span", { className: "block-center", "aria-hidden": "true", children: R ? j !== "I" ? /* @__PURE__ */ a.jsx(En, { letter: j, outlined: !0, size: 30 }) : m !== "I" || w !== null ? /* @__PURE__ */ a.jsx(gh, {}) : null : m !== "I" ? /* @__PURE__ */ a.jsx(En, { letter: m, size: 30 }) : null }),
    w !== null ? /* @__PURE__ */ a.jsx("span", { className: "block-crew", "aria-hidden": "true", children: /* @__PURE__ */ a.jsx(un, { letter: w, size: 24 }) }) : null
  ] }), q = ["block", m !== "I" ? "is-burning" : "", w !== null ? "has-crew" : "", R && j !== "I" ? "has-residual" : ""].filter(Boolean).join(" ");
  return S ? /* @__PURE__ */ a.jsx(
    "button",
    {
      type: "button",
      className: q,
      style: z,
      "aria-label": A,
      "aria-pressed": w !== null,
      "data-q": l,
      "data-testid": `block-${String(l)}`,
      onClick: () => T?.(l),
      onKeyDown: (je) => E(je, l),
      children: O
    }
  ) : /* @__PURE__ */ a.jsx("div", { className: q, style: z, role: "img", "aria-label": A, "data-q": l, children: O });
}
function gh() {
  return /* @__PURE__ */ a.jsx("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", className: "glyph glyph-out", children: /* @__PURE__ */ a.jsx("path", { d: "M5 12.5l4.2 4.2L19 7.5", fill: "none", stroke: Z.success, strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Pd(l) {
  return xe.useCallback(
    (u, s) => {
      const c = u.key === "ArrowLeft" ? [-1, 0] : u.key === "ArrowRight" ? [1, 0] : u.key === "ArrowUp" ? [0, -1] : u.key === "ArrowDown" ? [0, 1] : null;
      if (c === null) return;
      u.preventDefault();
      const f = l[s];
      if (f === void 0) return;
      let m = -1, w = 1 / 0;
      if (l.forEach((C, L) => {
        if (L === s) return;
        const T = C.x - f.x, E = C.y - f.y, z = T * (c[0] ?? 0) + E * (c[1] ?? 0), H = Math.abs(T * (c[1] ?? 0)) + Math.abs(E * (c[0] ?? 0));
        if (z <= 1) return;
        const A = z + H * 2.5;
        A < w && (w = A, m = L);
      }), m < 0) return;
      u.currentTarget.closest("[data-board]")?.querySelector(`[data-q="${String(m)}"]`)?.focus();
    },
    [l]
  );
}
function yh(l) {
  const u = ot(l), s = No(l);
  if (s.kind === "wires") return { centers: [], isLine: !1, W: yt, H: yt, yShift: 0 };
  const c = s.kind === "line", f = c ? u.n : s.cols, m = c ? 1 : s.rows, w = (f + 1) * yt, j = c ? 1.5 * yt : (m + 1) * yt, S = c ? -0.25 * yt : 0;
  return { centers: s.blocks.map((L) => ({ x: (L.col + 1) * yt, y: (L.row + 1) * yt + S })), isLine: c, W: w, H: j, yShift: S };
}
function vh(l) {
  const u = ot(l.codeId), s = No(l.codeId), { centers: c, isLine: f, W: m, H: w, yShift: j } = yh(l.codeId), S = Pd(c);
  if (s.kind === "wires") return null;
  const C = (E) => {
    const z = s.checkPositions[E] ?? { row: 0, col: 0 };
    return { x: (z.col + 1) * yt, y: (z.row + 1) * yt + (f ? -0.52 * yt : 0) };
  }, L = (E) => l.syndrome !== null && (l.syndrome[E] ?? 0) === 1, T = f ? 15 : 18;
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: `board board-grid board-${l.codeId}`,
      style: { aspectRatio: `${String(m)} / ${String(w)}` },
      role: "group",
      "aria-label": l.ariaLabel ?? `${u.name} dispatch board`,
      "aria-describedby": l.ariaDescribedBy,
      "data-board": !0,
      children: [
        /* @__PURE__ */ a.jsxs("svg", { className: "board-svg", viewBox: `0 0 ${String(m)} ${String(w)}`, "aria-hidden": "true", focusable: "false", children: [
          u.checks.map((E, z) => {
            const H = C(E.id), A = { x: H.x, y: H.y + j };
            return E.qubits.map((R) => {
              const O = c[R];
              return O === void 0 ? null : /* @__PURE__ */ a.jsx(
                "line",
                {
                  x1: A.x,
                  y1: A.y,
                  x2: O.x,
                  y2: O.y,
                  stroke: L(z) ? Z.alarm : Z.line,
                  strokeWidth: L(z) ? 3 : 1.5,
                  strokeOpacity: L(z) ? 0.85 : 0.9,
                  strokeDasharray: L(z) ? void 0 : "4 4"
                },
                `${E.id}-${String(R)}`
              );
            });
          }),
          c.map((E, z) => /* @__PURE__ */ a.jsx("circle", { cx: E.x, cy: E.y, r: td, fill: Z.panel, stroke: Z.line, strokeWidth: "2" }, z)),
          u.checks.map((E, z) => {
            const H = C(E.id);
            return /* @__PURE__ */ a.jsx("g", { transform: `translate(${String(H.x)} ${String(H.y + j)})`, className: "station", "data-station": E.id, children: /* @__PURE__ */ a.jsx(Nd, { type: E.type, ringing: L(z), r: T }) }, E.id);
          })
        ] }),
        c.map((E, z) => /* @__PURE__ */ a.jsx(
          $d,
          {
            q: z,
            center: E,
            r: td,
            W: m,
            H: w,
            fire: ln(l.fires, z),
            crew: l.placements?.[z] ?? Td(ln(l.crews, z)),
            residual: l.residual === null ? null : ln(l.residual, z),
            interactive: l.interactive,
            selected: l.selected,
            budgetReached: l.budgetReached ?? !1,
            onToggle: l.onToggle,
            onKeyDown: S
          },
          z
        ))
      ]
    }
  );
}
const nd = 80, wo = 70, qn = 48, wh = 118, po = 30;
function Gn(l) {
  return wh + l * wo;
}
function xh({ g: l, wireY: u }) {
  switch (l.kind) {
    case "H":
    case "S": {
      const s = u(l.q);
      return /* @__PURE__ */ a.jsxs("g", { children: [
        /* @__PURE__ */ a.jsx("rect", { x: -18, y: s - 18, width: 36, height: 36, rx: 6, fill: Z.panel, stroke: Z.text, strokeWidth: "2" }),
        /* @__PURE__ */ a.jsx("text", { y: s + 6, textAnchor: "middle", fontSize: "18", fontWeight: "700", fill: Z.text, fontFamily: "system-ui, sans-serif", children: l.kind })
      ] });
    }
    case "CNOT": {
      const s = u(l.c), c = u(l.t);
      return /* @__PURE__ */ a.jsxs("g", { children: [
        /* @__PURE__ */ a.jsx("line", { x1: 0, y1: s, x2: 0, y2: c, stroke: Z.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ a.jsx("circle", { cy: s, r: 7, fill: Z.text }),
        /* @__PURE__ */ a.jsx("circle", { cy: c, r: 15, fill: Z.navy, stroke: Z.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ a.jsx("line", { x1: -15, y1: c, x2: 15, y2: c, stroke: Z.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ a.jsx("line", { x1: 0, y1: c - 15, x2: 0, y2: c + 15, stroke: Z.text, strokeWidth: "2.5" })
      ] });
    }
    case "CZ": {
      const s = u(l.a), c = u(l.b);
      return /* @__PURE__ */ a.jsxs("g", { children: [
        /* @__PURE__ */ a.jsx("line", { x1: 0, y1: s, x2: 0, y2: c, stroke: Z.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ a.jsx("circle", { cy: s, r: 7, fill: Z.text }),
        /* @__PURE__ */ a.jsx("circle", { cy: c, r: 7, fill: Z.text })
      ] });
    }
    case "SWAP": {
      const s = u(l.a), c = u(l.b), f = (m) => /* @__PURE__ */ a.jsxs("g", { children: [
        /* @__PURE__ */ a.jsx("line", { x1: -9, y1: m - 9, x2: 9, y2: m + 9, stroke: Z.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ a.jsx("line", { x1: -9, y1: m + 9, x2: 9, y2: m - 9, stroke: Z.text, strokeWidth: "2.5" })
      ] }, m);
      return /* @__PURE__ */ a.jsxs("g", { children: [
        /* @__PURE__ */ a.jsx("line", { x1: 0, y1: s, x2: 0, y2: c, stroke: Z.text, strokeWidth: "2.5" }),
        f(s),
        f(c)
      ] });
    }
  }
}
function rd({ x: l, y: u, letter: s, size: c = 34 }) {
  const f = c / 24, m = s === "Y" ? "url(#wire-split)" : Z[s];
  return /* @__PURE__ */ a.jsxs("g", { transform: `translate(${String(l - c / 2)} ${String(u - c / 2)}) scale(${String(f)})`, className: `token token-${s}`, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "13", fill: Z.navy, stroke: Z.line, strokeWidth: "1.2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z", fill: m, stroke: "rgba(0,0,0,0.35)", strokeWidth: "0.8" }),
    /* @__PURE__ */ a.jsx("text", { x: "12", y: "22.6", textAnchor: "middle", fontSize: "6.5", fontWeight: "700", fill: Z.text, fontFamily: "system-ui, sans-serif", children: s })
  ] });
}
function kh(l) {
  const s = ot(l.codeId).n, c = l.circuit.length, f = Gn(c) + 10, m = f + po + 24, w = nd * s + 40, j = (R) => 60 + R * nd, S = Array.from({ length: s }, (R, O) => ({ x: f, y: j(O) })), C = Pd(S), L = l.gateCursor ?? c, T = L >= c, E = L < 0 ? (qn + Gn(0)) / 2 + 6 : Gn(L) + wo / 2, z = L < 0 ? (qn + Gn(0)) / 2 + 6 : Gn(L) + wo / 2, H = l.fires, A = !T && H !== null;
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: "board board-wires",
      style: { aspectRatio: `${String(m)} / ${String(w)}` },
      role: "group",
      "aria-label": l.ariaLabel ?? "Circuit board",
      "aria-describedby": l.ariaDescribedBy,
      "data-board": !0,
      children: [
        /* @__PURE__ */ a.jsxs("svg", { className: "board-svg", viewBox: `0 0 ${String(m)} ${String(w)}`, "aria-hidden": "true", focusable: "false", children: [
          /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("linearGradient", { id: "wire-split", x1: "0", x2: "1", y1: "0", y2: "0", children: [
            /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: Z.X }),
            /* @__PURE__ */ a.jsx("stop", { offset: "0.5", stopColor: Z.X }),
            /* @__PURE__ */ a.jsx("stop", { offset: "0.5", stopColor: Z.Z }),
            /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: Z.Z })
          ] }) }),
          Array.from({ length: s }, (R, O) => /* @__PURE__ */ a.jsxs("g", { children: [
            /* @__PURE__ */ a.jsx("line", { x1: qn, y1: j(O), x2: f, y2: j(O), stroke: Z.line, strokeWidth: "3" }),
            /* @__PURE__ */ a.jsxs("text", { x: qn - 30, y: j(O) + 5, fontSize: "14", fill: Z.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: [
              "q",
              O
            ] })
          ] }, O)),
          l.circuit.map((R, O) => /* @__PURE__ */ a.jsx("g", { transform: `translate(${String(Gn(O))} 0)`, className: O <= L ? "gate is-done" : "gate", opacity: l.gateCursor === void 0 || O <= L ? 1 : 0.55, children: /* @__PURE__ */ a.jsx(xh, { g: R, wireY: j }) }, O)),
          l.gateCursor !== void 0 && !T ? /* @__PURE__ */ a.jsx("line", { x1: z, y1: 18, x2: z, y2: w - 18, stroke: Z.alarm, strokeWidth: "2", strokeDasharray: "6 5", className: "time-cursor" }) : null,
          l.inputFires !== null && l.inputFires !== void 0 ? Array.from({ length: s }, (R, O) => {
            const q = ln(l.inputFires ?? null, O);
            return q === "I" ? null : /* @__PURE__ */ a.jsx(rd, { x: qn, y: j(O), letter: q, size: 30 }, `in-${String(O)}`);
          }) : null,
          A ? Array.from({ length: s }, (R, O) => {
            const q = ln(H, O);
            return q === "I" ? null : /* @__PURE__ */ a.jsx(rd, { x: E, y: j(O), letter: q }, `tok-${String(O)}`);
          }) : null,
          S.map((R, O) => /* @__PURE__ */ a.jsx("circle", { cx: R.x, cy: R.y, r: po, fill: Z.panel, stroke: Z.line, strokeWidth: "2" }, O)),
          /* @__PURE__ */ a.jsx("text", { x: qn, y: w - 8, fontSize: "12", fill: Z.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: "start" }),
          /* @__PURE__ */ a.jsx("text", { x: f, y: w - 8, fontSize: "12", fill: Z.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: "end" })
        ] }),
        S.map((R, O) => /* @__PURE__ */ a.jsx(
          $d,
          {
            q: O,
            center: R,
            r: po,
            W: m,
            H: w,
            fire: T ? ln(H, O) : "I",
            crew: l.placements?.[O] ?? Td(ln(l.crews, O)),
            residual: l.residual === null ? null : ln(l.residual, O),
            interactive: l.interactive,
            selected: l.selected,
            budgetReached: l.budgetReached ?? !1,
            onToggle: l.onToggle,
            onKeyDown: C
          },
          O
        ))
      ]
    }
  );
}
function Sh({ state: l, dispatch: u, mission: s }) {
  const c = s.training[l.lesson], f = xe.useId();
  if (c === void 0) return null;
  const m = ot(s.code), w = an(c.fire), j = jo(w, c.circuit), S = l.lessonCursor, C = j.frames[S + 1] ?? w, L = se(C), T = c.circuit.length > 0 || m.checks.length === 0, E = m.checks.length > 0 ? on(rr(m, C)) : null, z = s.training.length, H = S >= c.circuit.length - 1, A = l.lesson === z - 1, R = H ? A ? "Start dispatch" : "Next lesson" : "Next step";
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-play", children: [
    /* @__PURE__ */ a.jsx(
      zt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: `Training · lesson ${String(l.lesson + 1)} of ${String(z)} · fires visible`,
        onMissions: () => u({ type: "OPEN_MISSIONS" }),
        onSettings: () => u({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ a.jsxs("section", { className: "board-col", "aria-label": "Training board", children: [
        /* @__PURE__ */ a.jsx(
          $o,
          {
            codeId: s.code,
            circuit: c.circuit,
            fires: L,
            crews: null,
            residual: null,
            syndrome: E,
            interactive: !1,
            gateCursor: T ? S : void 0,
            inputFires: T ? c.fire : null,
            ariaDescribedBy: f,
            ariaLabel: "Training board, fires visible"
          }
        ),
        /* @__PURE__ */ a.jsxs("p", { className: "board-caption", id: f, "aria-live": "polite", "data-testid": "training-caption", children: [
          c.circuit.length > 0 ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            /* @__PURE__ */ a.jsxs("strong", { children: [
              S < 0 ? "Start: " : `After gate ${String(S + 1)} of ${String(c.circuit.length)}: `,
              L
            ] }),
            " "
          ] }) : null,
          c.caption
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("aside", { className: "panel", children: [
        m.checks.length > 0 ? /* @__PURE__ */ a.jsx(To, { codeId: s.code, syndrome: E }) : null,
        /* @__PURE__ */ a.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ a.jsx("h3", { className: "panel-title", children: "Lesson" }),
          /* @__PURE__ */ a.jsx("ol", { className: "lesson-dots", "aria-label": "Lessons", children: s.training.map((O, q) => /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsx("button", { type: "button", className: `dot ${q === l.lesson ? "is-current" : ""}`, "aria-current": q === l.lesson ? "step" : void 0, onClick: () => u({ type: "LESSON_SELECT", lesson: q }), "aria-label": `Lesson ${String(q + 1)}: ${O.fire}`, children: q + 1 }) }, q)) }),
          /* @__PURE__ */ a.jsx(mh, { allowed: s.allowed })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => u({ type: "LESSON_PREV" }), disabled: l.lesson === 0 && S <= -1, "data-testid": "training-prev", children: "Prev" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => u({ type: "LESSON_NEXT" }), "data-testid": "training-next", children: R }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => u({ type: "START_CHALLENGE" }), "data-testid": "start-challenge", children: "Skip to dispatch" })
        ] })
      ] })
    ] })
  ] });
}
function jh({ mission: l, placements: u, selected: s, standDownDialog: c, dispatch: f }) {
  const m = xe.useId(), w = yo(u), j = w >= l.budget, S = l.kind === "propagation", C = S ? null : l.syndrome;
  xe.useEffect(() => {
    const T = (E) => {
      if (c || E.metaKey || E.ctrlKey || E.altKey) return;
      const z = E.target;
      if (z !== null && (z.tagName === "INPUT" || z.tagName === "TEXTAREA")) return;
      const A = { 1: "X", 2: "Z", 3: "Y" }[E.key];
      if (A !== void 0) {
        l.allowed.includes(A) && f({ type: "SELECT_LETTER", letter: A }), E.preventDefault();
        return;
      }
      if (E.key === "Backspace" || E.key === "Delete") {
        f({ type: "CLEAR_CREWS" }), E.preventDefault();
        return;
      }
      (E.key === "c" || E.key === "C") && (f({ type: "CONFIRM" }), E.preventDefault());
    };
    return document.addEventListener("keydown", T), () => document.removeEventListener("keydown", T);
  }, [f, l.allowed, c]);
  const L = l.visibleStart === null ? [] : Array.from(l.visibleStart).map((T, E) => ({ q: E, l: T })).filter((T) => T.l !== "I");
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-play screen-challenge", children: [
    /* @__PURE__ */ a.jsx(
      zt,
      {
        title: `Mission ${String(l.index)} · ${l.title}`,
        subtitle: S ? "Dispatch · predict where the fires end up" : "Dispatch · fires hidden, alarms live",
        onMissions: () => f({ type: "OPEN_MISSIONS" }),
        onSettings: () => f({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ a.jsxs("section", { className: "board-col", "aria-label": "Dispatch board", children: [
        /* @__PURE__ */ a.jsx(
          $o,
          {
            codeId: l.code,
            circuit: l.circuit,
            fires: null,
            crews: null,
            placements: u,
            residual: null,
            syndrome: C,
            interactive: !0,
            onToggle: (T) => f({ type: "TOGGLE_BLOCK", qubit: T }),
            selected: s,
            budgetReached: j,
            inputFires: S ? l.visibleStart : null,
            ariaDescribedBy: m
          }
        ),
        /* @__PURE__ */ a.jsxs("p", { className: "board-caption", id: m, children: [
          S ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            "Starting fire: ",
            L.map((T) => `${T.l} on q${String(T.q)}`).join(", "),
            ". The fires travel through the circuit; send crews to where they",
            /* @__PURE__ */ a.jsx("em", { children: " end up" }),
            "."
          ] }) : Id(l.code, C),
          " ",
          /* @__PURE__ */ a.jsx("span", { className: "muted", children: "Tap a block to send the selected crew; tap again to recall it." })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("aside", { className: "panel", children: [
        S ? null : /* @__PURE__ */ a.jsx(To, { codeId: l.code, syndrome: C }),
        /* @__PURE__ */ a.jsx(ch, { allowed: l.allowed, selected: s, onSelect: (T) => f({ type: "SELECT_LETTER", letter: T }) }),
        /* @__PURE__ */ a.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ a.jsx("h3", { className: "panel-title", children: "Dispatch" }),
          /* @__PURE__ */ a.jsxs("p", { className: "budget", "data-testid": "budget", "aria-live": "polite", children: [
            "Crews: ",
            /* @__PURE__ */ a.jsx("strong", { children: w }),
            " / ",
            l.budget,
            j ? /* @__PURE__ */ a.jsx("span", { className: "muted", children: " · budget reached" }) : null
          ] }),
          /* @__PURE__ */ a.jsxs("ul", { className: "placement-list", "aria-label": "Placed crews", children: [
            Object.entries(u).sort(([T], [E]) => Number(T) - Number(E)).map(([T, E]) => /* @__PURE__ */ a.jsxs("li", { children: [
              /* @__PURE__ */ a.jsx(un, { letter: E, size: 18 }),
              " ",
              E,
              " crew → block ",
              T
            ] }, T)),
            w === 0 ? /* @__PURE__ */ a.jsx("li", { className: "muted", children: "No crews placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "actions actions-sticky", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => f({ type: "CLEAR_CREWS" }), disabled: w === 0, children: "Clear" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => f({ type: "CONFIRM" }), "data-testid": "confirm", children: "Confirm dispatch" })
        ] })
      ] })
    ] }),
    c ? /* @__PURE__ */ a.jsx(_d, { title: "Stand down with no crews?", confirmLabel: "Stand down", cancelLabel: "Keep dispatching", onConfirm: () => f({ type: "STAND_DOWN_CONFIRM" }), onCancel: () => f({ type: "STAND_DOWN_CANCEL" }), children: /* @__PURE__ */ a.jsx("p", { children: "You are about to confirm without sending any crew. Whatever is burning stays burning." }) }) : null
  ] });
}
function Eh({ state: l, dispatch: u, mission: s, debrief: c, bridge: f }) {
  const m = c.steps[l.replayIndex] ?? c.steps[c.steps.length - 1], w = xe.useId(), j = ot(s.code);
  if (m === void 0) return null;
  const S = c.steps.length - 1, C = s.kind === "propagation", L = an(c.residual), T = Array.from({ length: j.n }, (E, z) => z).filter((E) => fi(L, E) !== "I");
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-play screen-debrief", children: [
    /* @__PURE__ */ a.jsx(
      zt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: "Debrief · everything revealed",
        onMissions: () => u({ type: "OPEN_MISSIONS" }),
        onSettings: () => u({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ a.jsxs("section", { className: "board-col", "aria-label": "Replay board", children: [
        m.showVerdict ? /* @__PURE__ */ a.jsx(dh, { verdict: c.verdict }) : /* @__PURE__ */ a.jsxs("div", { className: "verdict verdict-pending", "aria-hidden": "true", children: [
          "Replay · step ",
          l.replayIndex + 1,
          " of ",
          c.steps.length
        ] }),
        /* @__PURE__ */ a.jsx(
          $o,
          {
            codeId: s.code,
            circuit: s.circuit,
            fires: m.fires,
            crews: m.crews,
            residual: m.residual,
            syndrome: m.syndrome,
            interactive: !1,
            gateCursor: C ? m.gateCursor : void 0,
            inputFires: C ? c.startFires : null,
            ariaDescribedBy: w,
            ariaLabel: "Replay board"
          }
        ),
        /* @__PURE__ */ a.jsxs("p", { className: "board-caption", id: w, "aria-live": "polite", "data-testid": "replay-caption", children: [
          /* @__PURE__ */ a.jsxs("strong", { children: [
            ld[m.id.startsWith("gate-") ? "gate" : m.id] ?? m.id,
            "."
          ] }),
          " ",
          m.caption
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "replay-controls", role: "group", "aria-label": "Replay controls", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => u({ type: "REPLAY_PREV" }), disabled: l.replayIndex === 0, "data-testid": "replay-prev", children: "Prev" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => u({ type: "REPLAY_NEXT" }), disabled: l.replayIndex === S, "data-testid": "replay-next", children: "Next" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: `btn ${l.autoPlay ? "is-active" : ""}`, "aria-pressed": l.autoPlay, onClick: () => u({ type: "REPLAY_AUTO", on: !l.autoPlay }), "data-testid": "replay-auto", children: l.autoPlay ? "Pause" : "Auto-play" }),
          /* @__PURE__ */ a.jsx("ol", { className: "step-dots", "aria-label": "Replay steps", children: c.steps.map((E, z) => /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsx("button", { type: "button", className: `dot ${z === l.replayIndex ? "is-current" : ""}`, "aria-current": z === l.replayIndex ? "step" : void 0, onClick: () => u({ type: "REPLAY_GOTO", index: z }), "aria-label": `Step ${String(z + 1)}: ${ld[E.id.startsWith("gate-") ? "gate" : E.id] ?? E.id}`, children: z + 1 }) }, E.id)) })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("aside", { className: "panel", children: [
        /* @__PURE__ */ a.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ a.jsx("h3", { className: "panel-title", children: "Report" }),
          /* @__PURE__ */ a.jsxs("dl", { className: "facts", children: [
            /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "True fires" }),
              /* @__PURE__ */ a.jsx("dd", { className: "mono", children: c.fires })
            ] }),
            C ? /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "Started as" }),
              /* @__PURE__ */ a.jsx("dd", { className: "mono", children: c.startFires })
            ] }) : null,
            /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "Your crews" }),
              /* @__PURE__ */ a.jsx("dd", { className: "mono", children: c.crews })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "Residual" }),
              /* @__PURE__ */ a.jsxs("dd", { className: "mono", "data-testid": "residual", children: [
                c.residual,
                T.length > 0 ? /* @__PURE__ */ a.jsxs("span", { className: "muted", children: [
                  " · blocks ",
                  T.join(", ")
                ] }) : /* @__PURE__ */ a.jsx("span", { className: "muted", children: " · nothing left" })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "Logical" }),
              /* @__PURE__ */ a.jsx("dd", { children: c.verdict === "logical-error" ? `flipped (${[c.logicalFlip.x.some(Boolean) ? "X̄" : null, c.logicalFlip.z.some(Boolean) ? "Z̄" : null].filter(Boolean).join(" and ")})` : c.verdict === "success" ? "preserved" : "undecided — alarms still ringing" })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx("dt", { children: "Decision" }),
              /* @__PURE__ */ a.jsxs("dd", { children: [
                Sd[c.score.quality],
                " · ",
                /* @__PURE__ */ a.jsx(Vr, { count: c.score.stars, size: 16 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ a.jsx("p", { className: "narrative", "data-testid": "narrative", children: c.narrative })
        ] }),
        j.checks.length > 0 ? /* @__PURE__ */ a.jsx(To, { codeId: s.code, syndrome: m.syndrome, compact: !0 }) : null,
        /* @__PURE__ */ a.jsxs("section", { className: "panel-section whatif", "data-testid": "whatif", children: [
          /* @__PURE__ */ a.jsx("h3", { className: "panel-title", children: "What if" }),
          /* @__PURE__ */ a.jsxs("p", { children: [
            "Minimum-weight dispatch for these alarms: ",
            /* @__PURE__ */ a.jsx("span", { className: "mono", children: c.whatIf.decoderCrews }),
            " → ",
            Co[c.whatIf.decoderVerdict],
            "."
          ] }),
          c.whatIf.trueFireCrews !== null ? /* @__PURE__ */ a.jsxs("p", { children: [
            "Crews matching the true fires: ",
            /* @__PURE__ */ a.jsx("span", { className: "mono", children: c.whatIf.trueFireCrews }),
            " → Logical qubit safe."
          ] }) : null,
          /* @__PURE__ */ a.jsx("p", { className: "muted", children: c.whatIf.explanation })
        ] }),
        /* @__PURE__ */ a.jsx(Nh, { bridge: f, missionId: s.id, correction: c.crews }, `${s.id}:${c.crews}`),
        /* @__PURE__ */ a.jsxs("div", { className: "actions actions-sticky", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => u({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: "Try again" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => u({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: "Result" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => u({ type: "NEXT_MISSION" }), "data-testid": "debrief-next", children: "Next mission" })
        ] })
      ] })
    ] })
  ] });
}
const ld = {
  placed: "Fires placed",
  gate: "Gate",
  alarms: "Alarms",
  dispatch: "Your dispatch",
  residual: "Residual",
  verdict: "Verdict"
};
function Nh({ bridge: l, missionId: u, correction: s }) {
  const [c, f] = xe.useState({ kind: "idle" }), m = l.cached(u), w = l.kind === "qollab" && typeof l.run == "function", j = l.jobsRemaining?.() ?? 0, S = async () => {
    if (!w || l.run === void 0) return;
    f({ kind: "running" });
    const C = await l.run({ missionId: u, correction: s, shots: 100 });
    f({ kind: "done", result: C });
  };
  return /* @__PURE__ */ a.jsxs("section", { className: "panel-section cloud", "data-testid": "cloud-panel", children: [
    /* @__PURE__ */ a.jsx("h3", { className: "panel-title", children: "Quantum verification" }),
    /* @__PURE__ */ a.jsx("p", { className: "muted small", children: "The verdict above is exact Pauli-frame algebra computed locally. Circuit-level runs (Qiskit) are labelled by where they ran and are never invented." }),
    m.length === 0 && c.kind === "idle" ? /* @__PURE__ */ a.jsx("p", { className: "cloud-empty", children: "No cloud result recorded yet." }) : null,
    m.map((C, L) => /* @__PURE__ */ a.jsx(id, { result: C }, `${C.startedAt}-${String(L)}`)),
    c.kind === "running" ? /* @__PURE__ */ a.jsxs("p", { className: "cloud-running", role: "status", children: [
      "Running on ",
      l.backendName ?? "the selected backend",
      " (100 shots)…"
    ] }) : null,
    c.kind === "done" ? c.result.status === "ok" ? /* @__PURE__ */ a.jsx(id, { result: c.result }) : /* @__PURE__ */ a.jsxs("p", { className: "cloud-error", role: "alert", children: [
      "Verification failed: ",
      c.result.message
    ] }) : null,
    w ? /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn", onClick: () => void S(), disabled: c.kind === "running" || j <= 0, children: j <= 0 ? "No job left in this run" : `Verify on ${l.backendName ?? "selected backend"} (100 shots)` }) : null
  ] });
}
function id({ result: l }) {
  const u = Object.values(l.counts).reduce((c, f) => c + f, 0), s = Object.entries(l.counts).sort(([, c], [, f]) => f - c).slice(0, 5);
  return /* @__PURE__ */ a.jsxs("div", { className: `cloud-card cloud-${l.source}`, children: [
    /* @__PURE__ */ a.jsxs("p", { className: "cloud-source", children: [
      /* @__PURE__ */ a.jsx("span", { className: "tag", children: Gp[l.source] }),
      " ",
      l.backendName,
      " · ",
      l.shots,
      " shots · ",
      new Date(l.finishedAt).toISOString().slice(0, 16).replace("T", " "),
      " UTC"
    ] }),
    /* @__PURE__ */ a.jsx("ul", { className: "counts", children: s.map(([c, f]) => /* @__PURE__ */ a.jsxs("li", { children: [
      /* @__PURE__ */ a.jsx("span", { className: "mono", children: c }),
      " ",
      /* @__PURE__ */ a.jsx("span", { className: "muted", children: f }),
      " ",
      /* @__PURE__ */ a.jsx("span", { className: "bar", style: { width: `${String(u > 0 ? f / u * 100 : 0)}%` }, "aria-hidden": "true" })
    ] }, c)) }),
    /* @__PURE__ */ a.jsx("dl", { className: "facts small cloud-facts", children: Ch(l).map(([c, f]) => /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("dt", { children: c }),
      /* @__PURE__ */ a.jsx("dd", { children: f })
    ] }, c)) })
  ] });
}
function Ch(l) {
  const u = [], s = si(l.analysis) ? l.analysis : {}, c = si(l.prediction) ? l.prediction : {}, f = (E) => typeof E == "number" ? `${String(Math.round(E * 100))}%` : null, m = (E) => Array.isArray(E) && E.every((z) => z === 0 || z === 1) ? E.map(String).join("") : null, w = m(s.dominantSyndrome), j = m(c.syndrome);
  w !== null && u.push(["Dominant alarm pattern", j !== null ? `${w} (predicted ${j})` : w]);
  const S = f(s.predictedSyndromeShare);
  S !== null && u.push(["Shots with the predicted alarms", S]);
  const C = s.predictedLogicalShare;
  Array.isArray(C) && typeof C[0] == "number" && u.push(["Shots with the predicted logical bit", f(C[0]) ?? "—"]);
  const L = s.dominantMatches;
  if (si(L)) {
    const E = Object.values(L).every((z) => z === !0 || z === null);
    u.push(["Dominant outcome agrees with the verdict", E ? "yes" : "no"]);
  }
  const T = s.exactMatchesIdealModel ?? s.matches;
  return si(T) && u.push(["Exact match with the noiseless model", Object.values(T).every((E) => E === !0 || E === null) ? "yes" : "no (expected under a noise model)"]), typeof c.verdict == "string" && u.push(["Pauli-frame verdict", c.verdict]), l.jobId !== null && u.push(["Job id", l.jobId]), typeof s.readoutBasis == "string" && typeof s.prep == "string" && u.push(["Prepared / readout", `logical |${s.prep}⟩ / ${s.readoutBasis} basis`]), u;
}
function si(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Ih({ state: l, dispatch: u }) {
  const s = _o(l.progress);
  return /* @__PURE__ */ a.jsx("main", { className: "screen screen-title", children: /* @__PURE__ */ a.jsxs("div", { className: "title-card", children: [
    /* @__PURE__ */ a.jsx(ah, { size: 96 }),
    /* @__PURE__ */ a.jsxs("h1", { className: "title-h", children: [
      "Q11 ",
      /* @__PURE__ */ a.jsx("span", { className: "title-dash", children: "—" }),
      " Quantum Emergency Response"
    ] }),
    /* @__PURE__ */ a.jsx("p", { className: "title-lead", children: "Read the alarms, dispatch the firefighters, protect the logical qubit." }),
    /* @__PURE__ */ a.jsxs("div", { className: "title-actions", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => u({ type: "PLAY" }), "data-testid": "play", children: "Play" }),
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-large", onClick: () => u({ type: "OPEN_HOW" }), children: "How it works" }),
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost btn-icon btn-large", onClick: () => u({ type: "OPEN_SETTINGS" }), "aria-label": "Settings", children: /* @__PURE__ */ a.jsx(Cd, {}) })
    ] }),
    s > 0 ? /* @__PURE__ */ a.jsxs("p", { className: "muted title-progress", children: [
      "Progress: ",
      s,
      " of 18 stars."
    ] }) : null,
    /* @__PURE__ */ a.jsx("p", { className: "title-foot muted", children: "Qollab × IonQ Global Quantum Hackathon 2026 entry. This effort is supported by Qollab & IonQ." })
  ] }) });
}
function _h({ dispatch: l }) {
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ a.jsx(zt, { title: "How it works", onSettings: () => l({ type: "OPEN_SETTINGS" }), onTitle: () => l({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ a.jsxs("article", { className: "doc", children: [
      /* @__PURE__ */ a.jsxs("p", { children: [
        "Q11 is a ",
        /* @__PURE__ */ a.jsx("strong", { children: "fire-dispatch metaphor" }),
        " for quantum error correction. Nothing here is about real fires or real firefighting; every fire, alarm and crew is a piece of quantum algebra."
      ] }),
      /* @__PURE__ */ a.jsxs("dl", { className: "how-list", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Blocks" }),
          /* @__PURE__ */ a.jsx("dd", { children: "Qubits. The number is the qubit index." })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsxs("dt", { children: [
            "Fires ",
            /* @__PURE__ */ a.jsx(En, { letter: "X", size: 20 }),
            " ",
            /* @__PURE__ */ a.jsx(En, { letter: "Z", size: 20 }),
            " ",
            /* @__PURE__ */ a.jsx(En, { letter: "Y", size: 20 })
          ] }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            "Pauli errors lit by an arsonist called ",
            /* @__PURE__ */ a.jsx("em", { children: "Noise" }),
            ". Red = X, blue = Z, split red-and-blue = Y (= X and Z at once)."
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsxs("dt", { children: [
            "Alarm stations ",
            /* @__PURE__ */ a.jsx(vo, { type: "Z", ringing: !1 }),
            " ",
            /* @__PURE__ */ a.jsx(vo, { type: "X", ringing: !1 })
          ] }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            "Stabilizer checks that stand between blocks. A ",
            /* @__PURE__ */ a.jsx("strong", { children: "diamond Z station" }),
            " rings when an ",
            /* @__PURE__ */ a.jsx("em", { children: "odd" }),
            " number of its blocks carry a red (X or Y) fire; a ",
            /* @__PURE__ */ a.jsx("strong", { children: "square X station" }),
            " rings for an odd number of blue (Z or Y) fires. A station never rings just because a fire is nearby, and it never says which block is burning."
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsxs("dt", { children: [
            "Crews ",
            /* @__PURE__ */ a.jsx(un, { letter: "X", size: 20 }),
            " ",
            /* @__PURE__ */ a.jsx(un, { letter: "Z", size: 20 }),
            " ",
            /* @__PURE__ */ a.jsx(un, { letter: "Y", size: 20 })
          ] }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            "Corrections. A red crew on a red fire puts it out (X·X = I). A red crew on a safe block ",
            /* @__PURE__ */ a.jsx("em", { children: "lights" }),
            " a red fire. Fires and crews combine by XOR, never by “more is better”."
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Gates" }),
          /* @__PURE__ */ a.jsx("dd", { children: "Fires move only through gates. CNOT copies red forward (control → target) and blue backward (target → control). H swaps red and blue on its own wire." })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Verdict" }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            "After you confirm, the residual R = crews ⊕ fires is judged by the code’s algebra: ",
            /* @__PURE__ */ a.jsx("strong", { children: "Logical qubit safe" }),
            " if R is a stabilizer; ",
            /* @__PURE__ */ a.jsx("strong", { children: "Silent failure" }),
            " if every alarm is quiet but R acts as a logical operator; ",
            /* @__PURE__ */ a.jsx("strong", { children: "Fires still burning" }),
            " if any station still rings. Quiet alarms alone are never proof of safety."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("h2", { children: "Controls" }),
      /* @__PURE__ */ a.jsxs("ul", { className: "plain-list", children: [
        /* @__PURE__ */ a.jsx("li", { children: "Tap or click a block to send the selected crew; tap again to recall it." }),
        /* @__PURE__ */ a.jsxs("li", { children: [
          "Keyboard: ",
          /* @__PURE__ */ a.jsx("kbd", { children: "1" }),
          "/",
          /* @__PURE__ */ a.jsx("kbd", { children: "2" }),
          "/",
          /* @__PURE__ */ a.jsx("kbd", { children: "3" }),
          " select X/Z/Y crews, arrows move between blocks, ",
          /* @__PURE__ */ a.jsx("kbd", { children: "Enter" }),
          " or",
          " ",
          /* @__PURE__ */ a.jsx("kbd", { children: "Space" }),
          " toggles a crew, ",
          /* @__PURE__ */ a.jsx("kbd", { children: "Backspace" }),
          " clears, ",
          /* @__PURE__ */ a.jsx("kbd", { children: "C" }),
          " confirms."
        ] }),
        /* @__PURE__ */ a.jsx("li", { children: "Sound is off by default; motion follows your system setting and the manual toggle in Settings." })
      ] }),
      /* @__PURE__ */ a.jsx("p", { className: "muted small", children: "Model: Clifford + Pauli educational simulation with a perfect-syndrome assumption. The repetition code is an X-noise-only introduction; the main district is a distance-3 rotated surface code." }),
      /* @__PURE__ */ a.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => l({ type: "CLOSE_OVERLAY" }), children: "Back" }) })
    ] })
  ] });
}
const Th = {
  rep3: "Repetition code · 3 blocks",
  rsc3: "Surface code d=3 · 9 blocks",
  trivial2: "Two bare wires",
  trivial3: "Three bare wires"
};
function Kn({ state: l, dispatch: u }) {
  const s = lr();
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-missions", children: [
    /* @__PURE__ */ a.jsx(
      zt,
      {
        title: "Missions",
        subtitle: `${String(_o(l.progress))} of 18 stars`,
        onSettings: () => u({ type: "OPEN_SETTINGS" }),
        onTitle: () => u({ type: "OPEN_TITLE" })
      }
    ),
    /* @__PURE__ */ a.jsx("ol", { className: "mission-list", "aria-label": "Missions", children: s.map((c) => {
      const f = l.progress[c.id];
      return /* @__PURE__ */ a.jsx("li", { children: /* @__PURE__ */ a.jsxs("button", { type: "button", className: `mission-card ${f?.completed ? "is-complete" : ""}`, onClick: () => u({ type: "SELECT_MISSION", id: c.id }), "data-testid": `mission-${String(c.index)}`, children: [
        /* @__PURE__ */ a.jsx("span", { className: "mission-index", "aria-hidden": "true", children: c.index }),
        /* @__PURE__ */ a.jsxs("span", { className: "mission-body", children: [
          /* @__PURE__ */ a.jsxs("span", { className: "mission-title", children: [
            /* @__PURE__ */ a.jsxs("span", { className: "sr-only", children: [
              "Mission ",
              c.index,
              ": "
            ] }),
            c.title
          ] }),
          /* @__PURE__ */ a.jsxs("span", { className: "mission-meta", children: [
            Th[c.code] ?? c.code,
            " · ",
            c.kind === "dispatch" ? "dispatch" : "propagation"
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("span", { className: "mission-stars", children: [
          /* @__PURE__ */ a.jsx(Vr, { count: f?.stars ?? 0, size: 18, label: f === void 0 ? "not played yet" : `${String(f.stars)} of 3 stars` }),
          /* @__PURE__ */ a.jsx("span", { className: "mission-status", children: f === void 0 ? "New" : f.completed ? "Complete" : `${String(f.attempts)} attempt${f.attempts === 1 ? "" : "s"}` })
        ] })
      ] }) }, c.id);
    }) })
  ] });
}
function $h({ state: l, dispatch: u, storageLabel: s, onReset: c }) {
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ a.jsx(zt, { title: "Settings", onSettings: () => u({ type: "CLOSE_OVERLAY" }), onTitle: () => u({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ a.jsxs("section", { className: "doc", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("span", { className: "setting-name", id: "set-sound", children: "Sound" }),
          /* @__PURE__ */ a.jsx("p", { className: "muted small", children: "Simple tones for crews, alarms and verdicts. Off by default." })
        ] }),
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": l.settings.sound,
            "aria-labelledby": "set-sound",
            className: `switch ${l.settings.sound ? "is-on" : ""}`,
            onClick: () => u({ type: "SET_SOUND", on: !l.settings.sound }),
            "data-testid": "switch-sound",
            children: [
              /* @__PURE__ */ a.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
              /* @__PURE__ */ a.jsx("span", { className: "switch-text", children: l.settings.sound ? "On" : "Off" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("span", { className: "setting-name", id: "set-motion", children: "Reduce motion" }),
          /* @__PURE__ */ a.jsx("p", { className: "muted small", children: "Stops the alarm pulse and transitions. Your system “reduce motion” preference is always respected too." })
        ] }),
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": l.settings.reducedMotion,
            "aria-labelledby": "set-motion",
            className: `switch ${l.settings.reducedMotion ? "is-on" : ""}`,
            onClick: () => u({ type: "SET_REDUCED_MOTION", on: !l.settings.reducedMotion }),
            "data-testid": "switch-motion",
            children: [
              /* @__PURE__ */ a.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
              /* @__PURE__ */ a.jsx("span", { className: "switch-text", children: l.settings.reducedMotion ? "On" : "Off" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("span", { className: "setting-name", children: "Progress" }),
          /* @__PURE__ */ a.jsx("p", { className: "muted small", children: s })
        ] }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-danger", onClick: c, "data-testid": "reset-progress", children: "Reset progress" })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => u({ type: "CLOSE_OVERLAY" }), children: "Back" }) })
    ] })
  ] });
}
function Ph({ state: l, dispatch: u, mission: s }) {
  const c = ot(s.code);
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-brief", children: [
    /* @__PURE__ */ a.jsx(
      zt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: "Briefing",
        onMissions: () => u({ type: "OPEN_MISSIONS" }),
        onSettings: () => u({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ a.jsxs("section", { className: "brief", children: [
      /* @__PURE__ */ a.jsx("p", { className: "brief-text", children: s.briefing }),
      /* @__PURE__ */ a.jsxs("dl", { className: "brief-facts", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "District" }),
          /* @__PURE__ */ a.jsx("dd", { children: c.name })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Crews" }),
          /* @__PURE__ */ a.jsx("dd", { children: s.allowed.map((f) => /* @__PURE__ */ a.jsxs("span", { className: "inline-glyph", children: [
            /* @__PURE__ */ a.jsx(un, { letter: f, size: 20 }),
            " ",
            f
          ] }, f)) })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Budget" }),
          /* @__PURE__ */ a.jsx("dd", { children: s.budget === 1 ? "1 crew" : `${String(s.budget)} crews` })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Previous best" }),
          /* @__PURE__ */ a.jsx("dd", { children: /* @__PURE__ */ a.jsx(Vr, { count: l.progress[s.id]?.stars ?? 0, size: 18 }) })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "brief-actions", children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => u({ type: "START_MISSION" }), "data-testid": "start-mission", children: s.training.length > 0 ? "Start training" : "Start" }),
        s.training.length > 0 ? /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-large", onClick: () => u({ type: "START_CHALLENGE" }), children: "Skip to dispatch" }) : null
      ] })
    ] })
  ] });
}
function Rh({ state: l, dispatch: u, mission: s, debrief: c }) {
  const f = c.score, m = s.index === lr().length;
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-result", children: [
    /* @__PURE__ */ a.jsx(zt, { title: `Mission ${String(s.index)} · ${s.title}`, subtitle: "Result", onMissions: () => u({ type: "OPEN_MISSIONS" }), onSettings: () => u({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ a.jsxs("section", { className: "result", "data-testid": "result", children: [
      /* @__PURE__ */ a.jsx(Vr, { count: f.stars, size: 44 }),
      /* @__PURE__ */ a.jsx("h2", { className: "result-h", children: f.stars === 3 ? "Flawless dispatch" : f.stars === 2 ? "Fires out" : f.stars === 1 ? f.quality === "unlucky" ? "Right call, cruel luck" : "Close" : "Try again" }),
      /* @__PURE__ */ a.jsxs("dl", { className: "result-facts", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Decision" }),
          /* @__PURE__ */ a.jsx("dd", { children: Sd[f.quality] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Outcome" }),
          /* @__PURE__ */ a.jsx("dd", { className: `outcome outcome-${f.outcome}`, children: Co[f.outcome] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Cost" }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            f.crewsUsed,
            " crew",
            f.crewsUsed === 1 ? "" : "s",
            " used · minimum ",
            f.minCrews
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Attempts" }),
          /* @__PURE__ */ a.jsx("dd", { children: l.progress[s.id]?.attempts ?? 1 })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => u({ type: "NEXT_MISSION" }), "data-testid": "next-mission", children: m ? "Summary" : "Next mission" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-large", onClick: () => u({ type: "TRY_AGAIN" }), children: "Try again" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-ghost btn-large", onClick: () => u({ type: "OPEN_MISSIONS" }), children: "Missions" })
      ] })
    ] })
  ] });
}
function Lh({ state: l, dispatch: u }) {
  const s = lr(), c = _o(l.progress);
  return /* @__PURE__ */ a.jsxs("main", { className: "screen screen-summary", children: [
    /* @__PURE__ */ a.jsx(zt, { title: "Shift complete", subtitle: `${String(c)} of 18 stars`, onMissions: () => u({ type: "OPEN_MISSIONS" }), onSettings: () => u({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ a.jsxs("section", { className: "summary", "data-testid": "summary", children: [
      /* @__PURE__ */ a.jsx("p", { className: "brief-text", children: "Every mission is on record. Single fires are always caught in a distance-3 district; the lesson of Silent Failure is why real machines build bigger ones." }),
      /* @__PURE__ */ a.jsxs("table", { className: "summary-table", children: [
        /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
          /* @__PURE__ */ a.jsx("th", { scope: "col", children: "Mission" }),
          /* @__PURE__ */ a.jsx("th", { scope: "col", children: "Stars" }),
          /* @__PURE__ */ a.jsx("th", { scope: "col", children: "Attempts" })
        ] }) }),
        /* @__PURE__ */ a.jsx("tbody", { children: s.map((f) => {
          const m = l.progress[f.id];
          return /* @__PURE__ */ a.jsxs("tr", { children: [
            /* @__PURE__ */ a.jsxs("th", { scope: "row", children: [
              f.index,
              ". ",
              f.title
            ] }),
            /* @__PURE__ */ a.jsx("td", { children: /* @__PURE__ */ a.jsx(Vr, { count: m?.stars ?? 0, size: 18 }) }),
            /* @__PURE__ */ a.jsx("td", { children: m?.attempts ?? 0 })
          ] }, f.id);
        }) })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => u({ type: "OPEN_MISSIONS" }), children: "Missions" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: "btn btn-large", onClick: () => u({ type: "OPEN_TITLE" }), children: "Title" })
      ] })
    ] })
  ] });
}
let Br = null;
function Oh() {
  if (Br !== null) return Br;
  const l = globalThis.AudioContext;
  if (typeof l != "function") return null;
  try {
    Br = new l();
  } catch {
    Br = null;
  }
  return Br;
}
function be(l, u, s, c, f = 0.08, m = "sine") {
  const w = l.createOscillator(), j = l.createGain();
  w.type = m, w.frequency.value = u, j.gain.setValueAtTime(0, s), j.gain.linearRampToValueAtTime(f, s + 0.01), j.gain.exponentialRampToValueAtTime(1e-4, s + c), w.connect(j).connect(l.destination), w.start(s), w.stop(s + c + 0.02);
}
function Jn(l, u) {
  if (!u) return;
  const s = Oh();
  if (s === null) return;
  s.state === "suspended" && s.resume();
  const c = s.currentTime;
  switch (l) {
    case "select":
      be(s, 660, c, 0.06);
      break;
    case "place":
      be(s, 440, c, 0.09), be(s, 660, c + 0.05, 0.09);
      break;
    case "remove":
      be(s, 520, c, 0.08), be(s, 390, c + 0.05, 0.1);
      break;
    case "confirm":
      be(s, 523, c, 0.1), be(s, 659, c + 0.08, 0.14);
      break;
    case "success":
      be(s, 523, c, 0.12), be(s, 659, c + 0.1, 0.12), be(s, 784, c + 0.2, 0.22);
      break;
    case "failure":
      be(s, 330, c, 0.16, 0.08, "triangle"), be(s, 247, c + 0.14, 0.26, 0.08, "triangle");
      break;
    case "alarm":
      be(s, 880, c, 0.08, 0.05, "square"), be(s, 880, c + 0.14, 0.08, 0.05, "square");
      break;
    case "step":
      be(s, 587, c, 0.05, 0.05);
      break;
  }
}
const sd = 1600;
function zh() {
  const [l, u] = xe.useState(() => {
    try {
      return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    } catch {
      return !1;
    }
  });
  return xe.useEffect(() => {
    let s;
    try {
      s = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    } catch {
      s = void 0;
    }
    if (s === void 0) return;
    const c = (f) => u(f.matches);
    return s.addEventListener("change", c), () => s?.removeEventListener("change", c);
  }, []), l;
}
function Ah({ bridge: l = th(), storage: u = "local" }) {
  const [s] = xe.useState(() => u === "local" ? Vp() : null), [c, f] = xe.useReducer(sh, void 0, () => {
    const { save: q, notice: je } = Zp(s);
    return nh(q, je);
  }), [m, w] = xe.useState(!1), S = zh() || c.settings.reducedMotion, C = c.settings.sound, L = xe.useCallback(
    (q) => {
      switch (f(q), q.type) {
        case "SELECT_LETTER":
          Jn("select", C);
          break;
        case "TOGGLE_BLOCK":
          Jn("place", C);
          break;
        case "CLEAR_CREWS":
          Jn("remove", C);
          break;
        case "CONFIRM":
        case "STAND_DOWN_CONFIRM":
          Jn("confirm", C);
          break;
        case "REPLAY_NEXT":
        case "REPLAY_PREV":
        case "REPLAY_GOTO":
          Jn("step", C);
          break;
      }
    },
    [C]
  ), T = xe.useRef("");
  xe.useEffect(() => {
    if (c.screen !== "debrief" || c.debrief === null) return;
    const q = `${c.debrief.missionId}:${c.debrief.crews}:${String(c.progress[c.debrief.missionId]?.attempts ?? 0)}`;
    T.current !== q && (T.current = q, Jn(c.debrief.verdict === "success" ? "success" : "failure", C));
  }, [c.screen, c.debrief, c.progress, C]);
  const { progress: E, settings: z } = c;
  xe.useEffect(() => {
    Bp(s, { version: 1, progress: E, settings: z });
  }, [s, E, z]), xe.useEffect(() => {
    if (!c.autoPlay || c.screen !== "debrief") return;
    const q = globalThis.setTimeout(() => f({ type: "REPLAY_NEXT" }), S ? sd + 600 : sd);
    return () => globalThis.clearTimeout(q);
  }, [c.autoPlay, c.replayIndex, c.screen, S]), xe.useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
    }
  }, [c.screen]);
  const H = s === null ? "Progress is kept in memory for this session only (no web storage available here)." : "Progress is saved in this browser (localStorage, key q11.save.v1).", A = st(c), R = { state: c, dispatch: L, storageLabel: H };
  let O;
  switch (c.screen) {
    case "title":
      O = /* @__PURE__ */ a.jsx(Ih, { ...R });
      break;
    case "how":
      O = /* @__PURE__ */ a.jsx(_h, { ...R });
      break;
    case "settings":
      O = /* @__PURE__ */ a.jsx($h, { ...R, onReset: () => w(!0) });
      break;
    case "missions":
      O = /* @__PURE__ */ a.jsx(Kn, { ...R });
      break;
    case "briefing":
      O = A === null ? /* @__PURE__ */ a.jsx(Kn, { ...R }) : /* @__PURE__ */ a.jsx(Ph, { ...R, mission: A });
      break;
    case "training":
      O = A === null ? /* @__PURE__ */ a.jsx(Kn, { ...R }) : /* @__PURE__ */ a.jsx(Sh, { state: c, dispatch: L, mission: A });
      break;
    case "challenge":
      O = A === null ? /* @__PURE__ */ a.jsx(Kn, { ...R }) : /* @__PURE__ */ a.jsx(jh, { mission: A, placements: c.placements, selected: c.selected, standDownDialog: c.standDownDialog, dispatch: L });
      break;
    case "debrief":
      O = A === null || c.debrief === null ? /* @__PURE__ */ a.jsx(Kn, { ...R }) : /* @__PURE__ */ a.jsx(Eh, { state: c, dispatch: L, mission: A, debrief: c.debrief, bridge: l });
      break;
    case "result":
      O = A === null || c.debrief === null ? /* @__PURE__ */ a.jsx(Kn, { ...R }) : /* @__PURE__ */ a.jsx(Rh, { ...R, mission: A, debrief: c.debrief });
      break;
    case "summary":
      O = /* @__PURE__ */ a.jsx(Lh, { ...R });
      break;
  }
  return /* @__PURE__ */ a.jsxs("div", { className: "app", "data-reduced-motion": S ? "true" : "false", "data-screen": c.screen, children: [
    c.notice !== null ? /* @__PURE__ */ a.jsx(hh, { text: c.notice, onDismiss: () => L({ type: "DISMISS_NOTICE" }) }) : null,
    O,
    m ? /* @__PURE__ */ a.jsx(
      _d,
      {
        title: "Reset all progress?",
        confirmLabel: "Reset",
        danger: !0,
        onConfirm: () => {
          L({ type: "RESET_PROGRESS" }), w(!1);
        },
        onCancel: () => w(!1),
        children: /* @__PURE__ */ a.jsx("p", { children: "Stars and attempts for every mission will be cleared. Settings are kept." })
      }
    ) : null
  ] });
}
function Mh(l, u = {}) {
  l.replaceChildren();
  const s = M0.createRoot(l), c = {
    ...u.bridge === void 0 ? {} : { bridge: u.bridge },
    ...u.storage === void 0 ? {} : { storage: u.storage }
  };
  return s.render(
    /* @__PURE__ */ a.jsx(xe.StrictMode, { children: /* @__PURE__ */ a.jsx(Ah, { ...c }) })
  ), s;
}
export {
  Mh as mountQ11
};
