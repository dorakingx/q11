var co = { exports: {} }, Zr = {}, fo = { exports: {} }, K = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rc;
function M0() {
  if (Rc) return K;
  Rc = 1;
  var l = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), w = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), I = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), $ = Symbol.iterator;
  function j(y) {
    return y === null || typeof y != "object" ? null : (y = $ && y[$] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var N = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, M = Object.assign, b = {};
  function z(y, _, G) {
    this.props = y, this.context = _, this.refs = b, this.updater = G || N;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(y, _) {
    if (typeof y != "object" && typeof y != "function" && y != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, y, _, "setState");
  }, z.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function O() {
  }
  O.prototype = z.prototype;
  function Y(y, _, G) {
    this.props = y, this.context = _, this.refs = b, this.updater = G || N;
  }
  var ye = Y.prototype = new O();
  ye.constructor = Y, M(ye, z.prototype), ye.isPureReactComponent = !0;
  var Ee = Array.isArray, ot = Object.prototype.hasOwnProperty, oe = { current: null }, ae = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ue(y, _, G) {
    var J, te = {}, ne = null, ce = null;
    if (_ != null) for (J in _.ref !== void 0 && (ce = _.ref), _.key !== void 0 && (ne = "" + _.key), _) ot.call(_, J) && !ae.hasOwnProperty(J) && (te[J] = _[J]);
    var ie = arguments.length - 2;
    if (ie === 1) te.children = G;
    else if (1 < ie) {
      for (var me = Array(ie), tt = 0; tt < ie; tt++) me[tt] = arguments[tt + 2];
      te.children = me;
    }
    if (y && y.defaultProps) for (J in ie = y.defaultProps, ie) te[J] === void 0 && (te[J] = ie[J]);
    return { $$typeof: l, type: y, key: ne, ref: ce, props: te, _owner: oe.current };
  }
  function Ne(y, _) {
    return { $$typeof: l, type: y.type, key: _, ref: y.ref, props: y.props, _owner: y._owner };
  }
  function Fe(y) {
    return typeof y == "object" && y !== null && y.$$typeof === l;
  }
  function Je(y) {
    var _ = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(G) {
      return _[G];
    });
  }
  var Xe = /\/+/g;
  function et(y, _) {
    return typeof y == "object" && y !== null && y.key != null ? Je("" + y.key) : _.toString(36);
  }
  function ht(y, _, G, J, te) {
    var ne = typeof y;
    (ne === "undefined" || ne === "boolean") && (y = null);
    var ce = !1;
    if (y === null) ce = !0;
    else switch (ne) {
      case "string":
      case "number":
        ce = !0;
        break;
      case "object":
        switch (y.$$typeof) {
          case l:
          case o:
            ce = !0;
        }
    }
    if (ce) return ce = y, te = te(ce), y = J === "" ? "." + et(ce, 0) : J, Ee(te) ? (G = "", y != null && (G = y.replace(Xe, "$&/") + "/"), ht(te, _, G, "", function(tt) {
      return tt;
    })) : te != null && (Fe(te) && (te = Ne(te, G + (!te.key || ce && ce.key === te.key ? "" : ("" + te.key).replace(Xe, "$&/") + "/") + y)), _.push(te)), 1;
    if (ce = 0, J = J === "" ? "." : J + ":", Ee(y)) for (var ie = 0; ie < y.length; ie++) {
      ne = y[ie];
      var me = J + et(ne, ie);
      ce += ht(ne, _, G, me, te);
    }
    else if (me = j(y), typeof me == "function") for (y = me.call(y), ie = 0; !(ne = y.next()).done; ) ne = ne.value, me = J + et(ne, ie++), ce += ht(ne, _, G, me, te);
    else if (ne === "object") throw _ = String(y), Error("Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead.");
    return ce;
  }
  function Et(y, _, G) {
    if (y == null) return y;
    var J = [], te = 0;
    return ht(y, J, "", "", function(ne) {
      return _.call(G, ne, te++);
    }), J;
  }
  function Be(y) {
    if (y._status === -1) {
      var _ = y._result;
      _ = _(), _.then(function(G) {
        (y._status === 0 || y._status === -1) && (y._status = 1, y._result = G);
      }, function(G) {
        (y._status === 0 || y._status === -1) && (y._status = 2, y._result = G);
      }), y._status === -1 && (y._status = 0, y._result = _);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var xe = { current: null }, A = { transition: null }, q = { ReactCurrentDispatcher: xe, ReactCurrentBatchConfig: A, ReactCurrentOwner: oe };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return K.Children = { map: Et, forEach: function(y, _, G) {
    Et(y, function() {
      _.apply(this, arguments);
    }, G);
  }, count: function(y) {
    var _ = 0;
    return Et(y, function() {
      _++;
    }), _;
  }, toArray: function(y) {
    return Et(y, function(_) {
      return _;
    }) || [];
  }, only: function(y) {
    if (!Fe(y)) throw Error("React.Children.only expected to receive a single React element child.");
    return y;
  } }, K.Component = z, K.Fragment = s, K.Profiler = f, K.PureComponent = Y, K.StrictMode = a, K.Suspense = S, K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q, K.act = X, K.cloneElement = function(y, _, G) {
    if (y == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + y + ".");
    var J = M({}, y.props), te = y.key, ne = y.ref, ce = y._owner;
    if (_ != null) {
      if (_.ref !== void 0 && (ne = _.ref, ce = oe.current), _.key !== void 0 && (te = "" + _.key), y.type && y.type.defaultProps) var ie = y.type.defaultProps;
      for (me in _) ot.call(_, me) && !ae.hasOwnProperty(me) && (J[me] = _[me] === void 0 && ie !== void 0 ? ie[me] : _[me]);
    }
    var me = arguments.length - 2;
    if (me === 1) J.children = G;
    else if (1 < me) {
      ie = Array(me);
      for (var tt = 0; tt < me; tt++) ie[tt] = arguments[tt + 2];
      J.children = ie;
    }
    return { $$typeof: l, type: y.type, key: te, ref: ne, props: J, _owner: ce };
  }, K.createContext = function(y) {
    return y = { $$typeof: w, _currentValue: y, _currentValue2: y, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, y.Provider = { $$typeof: p, _context: y }, y.Consumer = y;
  }, K.createElement = ue, K.createFactory = function(y) {
    var _ = ue.bind(null, y);
    return _.type = y, _;
  }, K.createRef = function() {
    return { current: null };
  }, K.forwardRef = function(y) {
    return { $$typeof: E, render: y };
  }, K.isValidElement = Fe, K.lazy = function(y) {
    return { $$typeof: P, _payload: { _status: -1, _result: y }, _init: Be };
  }, K.memo = function(y, _) {
    return { $$typeof: I, type: y, compare: _ === void 0 ? null : _ };
  }, K.startTransition = function(y) {
    var _ = A.transition;
    A.transition = {};
    try {
      y();
    } finally {
      A.transition = _;
    }
  }, K.unstable_act = X, K.useCallback = function(y, _) {
    return xe.current.useCallback(y, _);
  }, K.useContext = function(y) {
    return xe.current.useContext(y);
  }, K.useDebugValue = function() {
  }, K.useDeferredValue = function(y) {
    return xe.current.useDeferredValue(y);
  }, K.useEffect = function(y, _) {
    return xe.current.useEffect(y, _);
  }, K.useId = function() {
    return xe.current.useId();
  }, K.useImperativeHandle = function(y, _, G) {
    return xe.current.useImperativeHandle(y, _, G);
  }, K.useInsertionEffect = function(y, _) {
    return xe.current.useInsertionEffect(y, _);
  }, K.useLayoutEffect = function(y, _) {
    return xe.current.useLayoutEffect(y, _);
  }, K.useMemo = function(y, _) {
    return xe.current.useMemo(y, _);
  }, K.useReducer = function(y, _, G) {
    return xe.current.useReducer(y, _, G);
  }, K.useRef = function(y) {
    return xe.current.useRef(y);
  }, K.useState = function(y) {
    return xe.current.useState(y);
  }, K.useSyncExternalStore = function(y, _, G) {
    return xe.current.useSyncExternalStore(y, _, G);
  }, K.useTransition = function() {
    return xe.current.useTransition();
  }, K.version = "18.3.1", K;
}
var Pc;
function Eo() {
  return Pc || (Pc = 1, fo.exports = M0()), fo.exports;
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
var Lc;
function D0() {
  if (Lc) return Zr;
  Lc = 1;
  var l = Eo(), o = Symbol.for("react.element"), s = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, f = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(E, S, I) {
    var P, $ = {}, j = null, N = null;
    I !== void 0 && (j = "" + I), S.key !== void 0 && (j = "" + S.key), S.ref !== void 0 && (N = S.ref);
    for (P in S) a.call(S, P) && !p.hasOwnProperty(P) && ($[P] = S[P]);
    if (E && E.defaultProps) for (P in S = E.defaultProps, S) $[P] === void 0 && ($[P] = S[P]);
    return { $$typeof: o, type: E, key: j, ref: N, props: $, _owner: f.current };
  }
  return Zr.Fragment = s, Zr.jsx = w, Zr.jsxs = w, Zr;
}
var Oc;
function F0() {
  return Oc || (Oc = 1, co.exports = D0()), co.exports;
}
var c = F0(), le = Eo(), si = {}, po = { exports: {} }, Ge = {}, ho = { exports: {} }, mo = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc;
function X0() {
  return bc || (bc = 1, (function(l) {
    function o(A, q) {
      var X = A.length;
      A.push(q);
      e: for (; 0 < X; ) {
        var y = X - 1 >>> 1, _ = A[y];
        if (0 < f(_, q)) A[y] = q, A[X] = _, X = y;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function a(A) {
      if (A.length === 0) return null;
      var q = A[0], X = A.pop();
      if (X !== q) {
        A[0] = X;
        e: for (var y = 0, _ = A.length, G = _ >>> 1; y < G; ) {
          var J = 2 * (y + 1) - 1, te = A[J], ne = J + 1, ce = A[ne];
          if (0 > f(te, X)) ne < _ && 0 > f(ce, te) ? (A[y] = ce, A[ne] = X, y = ne) : (A[y] = te, A[J] = X, y = J);
          else if (ne < _ && 0 > f(ce, X)) A[y] = ce, A[ne] = X, y = ne;
          else break e;
        }
      }
      return q;
    }
    function f(A, q) {
      var X = A.sortIndex - q.sortIndex;
      return X !== 0 ? X : A.id - q.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var p = performance;
      l.unstable_now = function() {
        return p.now();
      };
    } else {
      var w = Date, E = w.now();
      l.unstable_now = function() {
        return w.now() - E;
      };
    }
    var S = [], I = [], P = 1, $ = null, j = 3, N = !1, M = !1, b = !1, z = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ye(A) {
      for (var q = s(I); q !== null; ) {
        if (q.callback === null) a(I);
        else if (q.startTime <= A) a(I), q.sortIndex = q.expirationTime, o(S, q);
        else break;
        q = s(I);
      }
    }
    function Ee(A) {
      if (b = !1, ye(A), !M) if (s(S) !== null) M = !0, Be(ot);
      else {
        var q = s(I);
        q !== null && xe(Ee, q.startTime - A);
      }
    }
    function ot(A, q) {
      M = !1, b && (b = !1, O(ue), ue = -1), N = !0;
      var X = j;
      try {
        for (ye(q), $ = s(S); $ !== null && (!($.expirationTime > q) || A && !Je()); ) {
          var y = $.callback;
          if (typeof y == "function") {
            $.callback = null, j = $.priorityLevel;
            var _ = y($.expirationTime <= q);
            q = l.unstable_now(), typeof _ == "function" ? $.callback = _ : $ === s(S) && a(S), ye(q);
          } else a(S);
          $ = s(S);
        }
        if ($ !== null) var G = !0;
        else {
          var J = s(I);
          J !== null && xe(Ee, J.startTime - q), G = !1;
        }
        return G;
      } finally {
        $ = null, j = X, N = !1;
      }
    }
    var oe = !1, ae = null, ue = -1, Ne = 5, Fe = -1;
    function Je() {
      return !(l.unstable_now() - Fe < Ne);
    }
    function Xe() {
      if (ae !== null) {
        var A = l.unstable_now();
        Fe = A;
        var q = !0;
        try {
          q = ae(!0, A);
        } finally {
          q ? et() : (oe = !1, ae = null);
        }
      } else oe = !1;
    }
    var et;
    if (typeof Y == "function") et = function() {
      Y(Xe);
    };
    else if (typeof MessageChannel < "u") {
      var ht = new MessageChannel(), Et = ht.port2;
      ht.port1.onmessage = Xe, et = function() {
        Et.postMessage(null);
      };
    } else et = function() {
      z(Xe, 0);
    };
    function Be(A) {
      ae = A, oe || (oe = !0, et());
    }
    function xe(A, q) {
      ue = z(function() {
        A(l.unstable_now());
      }, q);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, l.unstable_continueExecution = function() {
      M || N || (M = !0, Be(ot));
    }, l.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ne = 0 < A ? Math.floor(1e3 / A) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, l.unstable_getFirstCallbackNode = function() {
      return s(S);
    }, l.unstable_next = function(A) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = j;
      }
      var X = j;
      j = q;
      try {
        return A();
      } finally {
        j = X;
      }
    }, l.unstable_pauseExecution = function() {
    }, l.unstable_requestPaint = function() {
    }, l.unstable_runWithPriority = function(A, q) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var X = j;
      j = A;
      try {
        return q();
      } finally {
        j = X;
      }
    }, l.unstable_scheduleCallback = function(A, q, X) {
      var y = l.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? y + X : y) : X = y, A) {
        case 1:
          var _ = -1;
          break;
        case 2:
          _ = 250;
          break;
        case 5:
          _ = 1073741823;
          break;
        case 4:
          _ = 1e4;
          break;
        default:
          _ = 5e3;
      }
      return _ = X + _, A = { id: P++, callback: q, priorityLevel: A, startTime: X, expirationTime: _, sortIndex: -1 }, X > y ? (A.sortIndex = X, o(I, A), s(S) === null && A === s(I) && (b ? (O(ue), ue = -1) : b = !0, xe(Ee, X - y))) : (A.sortIndex = _, o(S, A), M || N || (M = !0, Be(ot))), A;
    }, l.unstable_shouldYield = Je, l.unstable_wrapCallback = function(A) {
      var q = j;
      return function() {
        var X = j;
        j = q;
        try {
          return A.apply(this, arguments);
        } finally {
          j = X;
        }
      };
    };
  })(mo)), mo;
}
var zc;
function W0() {
  return zc || (zc = 1, ho.exports = X0()), ho.exports;
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
var Ac;
function U0() {
  if (Ac) return Ge;
  Ac = 1;
  var l = Eo(), o = W0();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), f = {};
  function p(e, t) {
    w(e, t), w(e + "Capture", t);
  }
  function w(e, t) {
    for (f[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), S = Object.prototype.hasOwnProperty, I = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, P = {}, $ = {};
  function j(e) {
    return S.call($, e) ? !0 : S.call(P, e) ? !1 : I.test(e) ? $[e] = !0 : (P[e] = !0, !1);
  }
  function N(e, t, n, r) {
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
  function M(e, t, n, r) {
    if (t === null || typeof t > "u" || N(e, t, n, r)) return !0;
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
  function b(e, t, n, r, i, u, d) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = d;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    z[e] = new b(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    z[t] = new b(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    z[e] = new b(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    z[e] = new b(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    z[e] = new b(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    z[e] = new b(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    z[e] = new b(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    z[e] = new b(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    z[e] = new b(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var O = /[\-:]([a-z])/g;
  function Y(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      O,
      Y
    );
    z[t] = new b(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(O, Y);
    z[t] = new b(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(O, Y);
    z[t] = new b(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    z[e] = new b(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), z.xlinkHref = new b("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    z[e] = new b(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function ye(e, t, n, r) {
    var i = z.hasOwnProperty(t) ? z[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (M(t, n, i, r) && (n = null), r || i === null ? j(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Ee = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ot = Symbol.for("react.element"), oe = Symbol.for("react.portal"), ae = Symbol.for("react.fragment"), ue = Symbol.for("react.strict_mode"), Ne = Symbol.for("react.profiler"), Fe = Symbol.for("react.provider"), Je = Symbol.for("react.context"), Xe = Symbol.for("react.forward_ref"), et = Symbol.for("react.suspense"), ht = Symbol.for("react.suspense_list"), Et = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), xe = Symbol.for("react.offscreen"), A = Symbol.iterator;
  function q(e) {
    return e === null || typeof e != "object" ? null : (e = A && e[A] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var X = Object.assign, y;
  function _(e) {
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
`), u = r.stack.split(`
`), d = i.length - 1, h = u.length - 1; 1 <= d && 0 <= h && i[d] !== u[h]; ) h--;
        for (; 1 <= d && 0 <= h; d--, h--) if (i[d] !== u[h]) {
          if (d !== 1 || h !== 1)
            do
              if (d--, h--, 0 > h || i[d] !== u[h]) {
                var m = `
` + i[d].replace(" at new ", " at ");
                return e.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", e.displayName)), m;
              }
            while (1 <= d && 0 <= h);
          break;
        }
      }
    } finally {
      G = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? _(e) : "";
  }
  function te(e) {
    switch (e.tag) {
      case 5:
        return _(e.type);
      case 16:
        return _("Lazy");
      case 13:
        return _("Suspense");
      case 19:
        return _("SuspenseList");
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
      case ae:
        return "Fragment";
      case oe:
        return "Portal";
      case Ne:
        return "Profiler";
      case ue:
        return "StrictMode";
      case et:
        return "Suspense";
      case ht:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Je:
        return (e.displayName || "Context") + ".Consumer";
      case Fe:
        return (e._context.displayName || "Context") + ".Provider";
      case Xe:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Et:
        return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
      case Be:
        t = e._payload, e = e._init;
        try {
          return ne(e(t));
        } catch {
        }
    }
    return null;
  }
  function ce(e) {
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
        return t === ue ? "StrictMode" : "Mode";
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
  function ie(e) {
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
  function me(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function tt(e) {
    var t = me(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var i = n.get, u = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return i.call(this);
      }, set: function(d) {
        r = "" + d, u.call(this, d);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(d) {
        r = "" + d;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Yr(e) {
    e._valueTracker || (e._valueTracker = tt(e));
  }
  function Ao(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = me(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Gr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function yi(e, t) {
    var n = t.checked;
    return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Mo(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = ie(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Do(e, t) {
    t = t.checked, t != null && ye(e, "checked", t, !1);
  }
  function vi(e, t) {
    Do(e, t);
    var n = ie(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? wi(e, t.type, n) : t.hasOwnProperty("defaultValue") && wi(e, t.type, ie(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function Fo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function wi(e, t, n) {
    (t !== "number" || Gr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var ir = Array.isArray;
  function In(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ie(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, r && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function xi(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Xo(e, t) {
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
    e._wrapperState = { initialValue: ie(n) };
  }
  function Wo(e, t) {
    var n = ie(t.value), r = ie(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Uo(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Zo(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ki(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Zo(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Kr, Bo = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, i);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Kr = Kr || document.createElement("div"), Kr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Kr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
  }, Xd = ["Webkit", "ms", "Moz", "O"];
  Object.keys(or).forEach(function(e) {
    Xd.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), or[t] = or[e];
    });
  });
  function Vo(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || or.hasOwnProperty(e) && or[e] ? ("" + t).trim() : t + "px";
  }
  function Ho(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, i = Vo(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
    }
  }
  var Wd = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Si(e, t) {
    if (t) {
      if (Wd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function ji(e, t) {
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
  var Ei = null;
  function Ni(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ci = null, _n = null, Tn = null;
  function qo(e) {
    if (e = Tr(e)) {
      if (typeof Ci != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = kl(t), Ci(e.stateNode, e.type, t));
    }
  }
  function Qo(e) {
    _n ? Tn ? Tn.push(e) : Tn = [e] : _n = e;
  }
  function Yo() {
    if (_n) {
      var e = _n, t = Tn;
      if (Tn = _n = null, qo(e), t) for (e = 0; e < t.length; e++) qo(t[e]);
    }
  }
  function Go(e, t) {
    return e(t);
  }
  function Ko() {
  }
  var Ii = !1;
  function Jo(e, t, n) {
    if (Ii) return e(t, n);
    Ii = !0;
    try {
      return Go(e, t, n);
    } finally {
      Ii = !1, (_n !== null || Tn !== null) && (Ko(), Yo());
    }
  }
  function ur(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = kl(n);
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
  var _i = !1;
  if (E) try {
    var ar = {};
    Object.defineProperty(ar, "passive", { get: function() {
      _i = !0;
    } }), window.addEventListener("test", ar, ar), window.removeEventListener("test", ar, ar);
  } catch {
    _i = !1;
  }
  function Ud(e, t, n, r, i, u, d, h, m) {
    var k = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, k);
    } catch (T) {
      this.onError(T);
    }
  }
  var cr = !1, Jr = null, el = !1, Ti = null, Zd = { onError: function(e) {
    cr = !0, Jr = e;
  } };
  function Bd(e, t, n, r, i, u, d, h, m) {
    cr = !1, Jr = null, Ud.apply(Zd, arguments);
  }
  function Vd(e, t, n, r, i, u, d, h, m) {
    if (Bd.apply(this, arguments), cr) {
      if (cr) {
        var k = Jr;
        cr = !1, Jr = null;
      } else throw Error(s(198));
      el || (el = !0, Ti = k);
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
  function eu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function tu(e) {
    if (dn(e) !== e) throw Error(s(188));
  }
  function Hd(e) {
    var t = e.alternate;
    if (!t) {
      if (t = dn(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var u = i.alternate;
      if (u === null) {
        if (r = i.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === u.child) {
        for (u = i.child; u; ) {
          if (u === n) return tu(i), e;
          if (u === r) return tu(i), t;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = i, r = u;
      else {
        for (var d = !1, h = i.child; h; ) {
          if (h === n) {
            d = !0, n = i, r = u;
            break;
          }
          if (h === r) {
            d = !0, r = i, n = u;
            break;
          }
          h = h.sibling;
        }
        if (!d) {
          for (h = u.child; h; ) {
            if (h === n) {
              d = !0, n = u, r = i;
              break;
            }
            if (h === r) {
              d = !0, r = u, n = i;
              break;
            }
            h = h.sibling;
          }
          if (!d) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function nu(e) {
    return e = Hd(e), e !== null ? ru(e) : null;
  }
  function ru(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ru(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var lu = o.unstable_scheduleCallback, iu = o.unstable_cancelCallback, qd = o.unstable_shouldYield, Qd = o.unstable_requestPaint, Se = o.unstable_now, Yd = o.unstable_getCurrentPriorityLevel, $i = o.unstable_ImmediatePriority, su = o.unstable_UserBlockingPriority, tl = o.unstable_NormalPriority, Gd = o.unstable_LowPriority, ou = o.unstable_IdlePriority, nl = null, Nt = null;
  function Kd(e) {
    if (Nt && typeof Nt.onCommitFiberRoot == "function") try {
      Nt.onCommitFiberRoot(nl, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var mt = Math.clz32 ? Math.clz32 : tf, Jd = Math.log, ef = Math.LN2;
  function tf(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Jd(e) / ef | 0) | 0;
  }
  var rl = 64, ll = 4194304;
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
  function il(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, i = e.suspendedLanes, u = e.pingedLanes, d = n & 268435455;
    if (d !== 0) {
      var h = d & ~i;
      h !== 0 ? r = dr(h) : (u &= d, u !== 0 && (r = dr(u)));
    } else d = n & ~i, d !== 0 ? r = dr(d) : u !== 0 && (r = dr(u));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, u = t & -t, i >= u || i === 16 && (u & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - mt(t), i = 1 << n, r |= e[n], t &= ~i;
    return r;
  }
  function nf(e, t) {
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
  function rf(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var d = 31 - mt(u), h = 1 << d, m = i[d];
      m === -1 ? ((h & n) === 0 || (h & r) !== 0) && (i[d] = nf(h, t)) : m <= t && (e.expiredLanes |= h), u &= ~h;
    }
  }
  function Ri(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function uu() {
    var e = rl;
    return rl <<= 1, (rl & 4194240) === 0 && (rl = 64), e;
  }
  function Pi(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function fr(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - mt(t), e[t] = n;
  }
  function lf(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var i = 31 - mt(n), u = 1 << i;
      t[i] = 0, r[i] = -1, e[i] = -1, n &= ~u;
    }
  }
  function Li(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - mt(n), i = 1 << r;
      i & t | e[r] & t && (e[r] |= t), n &= ~i;
    }
  }
  var se = 0;
  function au(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var cu, Oi, du, fu, pu, bi = !1, sl = [], Dt = null, Ft = null, Xt = null, pr = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new Map(), Wt = [], sf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function hu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Dt = null;
        break;
      case "dragenter":
      case "dragleave":
        Ft = null;
        break;
      case "mouseover":
      case "mouseout":
        Xt = null;
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
  function mr(e, t, n, r, i, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: u, targetContainers: [i] }, t !== null && (t = Tr(t), t !== null && Oi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function of(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return Dt = mr(Dt, e, t, n, r, i), !0;
      case "dragenter":
        return Ft = mr(Ft, e, t, n, r, i), !0;
      case "mouseover":
        return Xt = mr(Xt, e, t, n, r, i), !0;
      case "pointerover":
        var u = i.pointerId;
        return pr.set(u, mr(pr.get(u) || null, e, t, n, r, i)), !0;
      case "gotpointercapture":
        return u = i.pointerId, hr.set(u, mr(hr.get(u) || null, e, t, n, r, i)), !0;
    }
    return !1;
  }
  function mu(e) {
    var t = fn(e.target);
    if (t !== null) {
      var n = dn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = eu(n), t !== null) {
            e.blockedOn = t, pu(e.priority, function() {
              du(n);
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
  function ol(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ai(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        Ei = r, n.target.dispatchEvent(r), Ei = null;
      } else return t = Tr(n), t !== null && Oi(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function gu(e, t, n) {
    ol(e) && n.delete(t);
  }
  function uf() {
    bi = !1, Dt !== null && ol(Dt) && (Dt = null), Ft !== null && ol(Ft) && (Ft = null), Xt !== null && ol(Xt) && (Xt = null), pr.forEach(gu), hr.forEach(gu);
  }
  function gr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, bi || (bi = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, uf)));
  }
  function yr(e) {
    function t(i) {
      return gr(i, e);
    }
    if (0 < sl.length) {
      gr(sl[0], e);
      for (var n = 1; n < sl.length; n++) {
        var r = sl[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Dt !== null && gr(Dt, e), Ft !== null && gr(Ft, e), Xt !== null && gr(Xt, e), pr.forEach(t), hr.forEach(t), n = 0; n < Wt.length; n++) r = Wt[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Wt.length && (n = Wt[0], n.blockedOn === null); ) mu(n), n.blockedOn === null && Wt.shift();
  }
  var $n = Ee.ReactCurrentBatchConfig, ul = !0;
  function af(e, t, n, r) {
    var i = se, u = $n.transition;
    $n.transition = null;
    try {
      se = 1, zi(e, t, n, r);
    } finally {
      se = i, $n.transition = u;
    }
  }
  function cf(e, t, n, r) {
    var i = se, u = $n.transition;
    $n.transition = null;
    try {
      se = 4, zi(e, t, n, r);
    } finally {
      se = i, $n.transition = u;
    }
  }
  function zi(e, t, n, r) {
    if (ul) {
      var i = Ai(e, t, n, r);
      if (i === null) es(e, t, r, al, n), hu(e, r);
      else if (of(i, e, t, n, r)) r.stopPropagation();
      else if (hu(e, r), t & 4 && -1 < sf.indexOf(e)) {
        for (; i !== null; ) {
          var u = Tr(i);
          if (u !== null && cu(u), u = Ai(e, t, n, r), u === null && es(e, t, r, al, n), u === i) break;
          i = u;
        }
        i !== null && r.stopPropagation();
      } else es(e, t, r, null, n);
    }
  }
  var al = null;
  function Ai(e, t, n, r) {
    if (al = null, e = Ni(r), e = fn(e), e !== null) if (t = dn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = eu(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return al = e, null;
  }
  function yu(e) {
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
        switch (Yd()) {
          case $i:
            return 1;
          case su:
            return 4;
          case tl:
          case Gd:
            return 16;
          case ou:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ut = null, Mi = null, cl = null;
  function vu() {
    if (cl) return cl;
    var e, t = Mi, n = t.length, r, i = "value" in Ut ? Ut.value : Ut.textContent, u = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var d = n - e;
    for (r = 1; r <= d && t[n - r] === i[u - r]; r++) ;
    return cl = i.slice(e, 1 < r ? 1 - r : void 0);
  }
  function dl(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function fl() {
    return !0;
  }
  function wu() {
    return !1;
  }
  function nt(e) {
    function t(n, r, i, u, d) {
      this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = u, this.target = d, this.currentTarget = null;
      for (var h in e) e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(u) : u[h]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? fl : wu, this.isPropagationStopped = wu, this;
    }
    return X(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = fl);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = fl);
    }, persist: function() {
    }, isPersistent: fl }), t;
  }
  var Rn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Di = nt(Rn), vr = X({}, Rn, { view: 0, detail: 0 }), df = nt(vr), Fi, Xi, wr, pl = X({}, vr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ui, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== wr && (wr && e.type === "mousemove" ? (Fi = e.screenX - wr.screenX, Xi = e.screenY - wr.screenY) : Xi = Fi = 0, wr = e), Fi);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Xi;
  } }), xu = nt(pl), ff = X({}, pl, { dataTransfer: 0 }), pf = nt(ff), hf = X({}, vr, { relatedTarget: 0 }), Wi = nt(hf), mf = X({}, Rn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), gf = nt(mf), yf = X({}, Rn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), vf = nt(yf), wf = X({}, Rn, { data: 0 }), ku = nt(wf), xf = {
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
  }, kf = {
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
  }, Sf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function jf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Sf[e]) ? !!t[e] : !1;
  }
  function Ui() {
    return jf;
  }
  var Ef = X({}, vr, { key: function(e) {
    if (e.key) {
      var t = xf[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = dl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? kf[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ui, charCode: function(e) {
    return e.type === "keypress" ? dl(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? dl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Nf = nt(Ef), Cf = X({}, pl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Su = nt(Cf), If = X({}, vr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ui }), _f = nt(If), Tf = X({}, Rn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $f = nt(Tf), Rf = X({}, pl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Pf = nt(Rf), Lf = [9, 13, 27, 32], Zi = E && "CompositionEvent" in window, xr = null;
  E && "documentMode" in document && (xr = document.documentMode);
  var Of = E && "TextEvent" in window && !xr, ju = E && (!Zi || xr && 8 < xr && 11 >= xr), Eu = " ", Nu = !1;
  function Cu(e, t) {
    switch (e) {
      case "keyup":
        return Lf.indexOf(t.keyCode) !== -1;
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
  function Iu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Pn = !1;
  function bf(e, t) {
    switch (e) {
      case "compositionend":
        return Iu(t);
      case "keypress":
        return t.which !== 32 ? null : (Nu = !0, Eu);
      case "textInput":
        return e = t.data, e === Eu && Nu ? null : e;
      default:
        return null;
    }
  }
  function zf(e, t) {
    if (Pn) return e === "compositionend" || !Zi && Cu(e, t) ? (e = vu(), cl = Mi = Ut = null, Pn = !1, e) : null;
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
        return ju && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Af = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function _u(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Af[e.type] : t === "textarea";
  }
  function Tu(e, t, n, r) {
    Qo(r), t = vl(t, "onChange"), 0 < t.length && (n = new Di("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var kr = null, Sr = null;
  function Mf(e) {
    Hu(e, 0);
  }
  function hl(e) {
    var t = An(e);
    if (Ao(t)) return e;
  }
  function Df(e, t) {
    if (e === "change") return t;
  }
  var $u = !1;
  if (E) {
    var Bi;
    if (E) {
      var Vi = "oninput" in document;
      if (!Vi) {
        var Ru = document.createElement("div");
        Ru.setAttribute("oninput", "return;"), Vi = typeof Ru.oninput == "function";
      }
      Bi = Vi;
    } else Bi = !1;
    $u = Bi && (!document.documentMode || 9 < document.documentMode);
  }
  function Pu() {
    kr && (kr.detachEvent("onpropertychange", Lu), Sr = kr = null);
  }
  function Lu(e) {
    if (e.propertyName === "value" && hl(Sr)) {
      var t = [];
      Tu(t, Sr, e, Ni(e)), Jo(Mf, t);
    }
  }
  function Ff(e, t, n) {
    e === "focusin" ? (Pu(), kr = t, Sr = n, kr.attachEvent("onpropertychange", Lu)) : e === "focusout" && Pu();
  }
  function Xf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return hl(Sr);
  }
  function Wf(e, t) {
    if (e === "click") return hl(t);
  }
  function Uf(e, t) {
    if (e === "input" || e === "change") return hl(t);
  }
  function Zf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var gt = typeof Object.is == "function" ? Object.is : Zf;
  function jr(e, t) {
    if (gt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!S.call(t, i) || !gt(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Ou(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bu(e, t) {
    var n = Ou(e);
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
      n = Ou(n);
    }
  }
  function zu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Au() {
    for (var e = window, t = Gr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Gr(e.document);
    }
    return t;
  }
  function Hi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Bf(e) {
    var t = Au(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && zu(n.ownerDocument.documentElement, n)) {
      if (r !== null && Hi(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var i = n.textContent.length, u = Math.min(r.start, i);
          r = r.end === void 0 ? u : Math.min(r.end, i), !e.extend && u > r && (i = r, r = u, u = i), i = bu(n, u);
          var d = bu(
            n,
            r
          );
          i && d && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== d.node || e.focusOffset !== d.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), u > r ? (e.addRange(t), e.extend(d.node, d.offset)) : (t.setEnd(d.node, d.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Vf = E && "documentMode" in document && 11 >= document.documentMode, Ln = null, qi = null, Er = null, Qi = !1;
  function Mu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Qi || Ln == null || Ln !== Gr(r) || (r = Ln, "selectionStart" in r && Hi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Er && jr(Er, r) || (Er = r, r = vl(qi, "onSelect"), 0 < r.length && (t = new Di("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ln)));
  }
  function ml(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var On = { animationend: ml("Animation", "AnimationEnd"), animationiteration: ml("Animation", "AnimationIteration"), animationstart: ml("Animation", "AnimationStart"), transitionend: ml("Transition", "TransitionEnd") }, Yi = {}, Du = {};
  E && (Du = document.createElement("div").style, "AnimationEvent" in window || (delete On.animationend.animation, delete On.animationiteration.animation, delete On.animationstart.animation), "TransitionEvent" in window || delete On.transitionend.transition);
  function gl(e) {
    if (Yi[e]) return Yi[e];
    if (!On[e]) return e;
    var t = On[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Du) return Yi[e] = t[n];
    return e;
  }
  var Fu = gl("animationend"), Xu = gl("animationiteration"), Wu = gl("animationstart"), Uu = gl("transitionend"), Zu = /* @__PURE__ */ new Map(), Bu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Zt(e, t) {
    Zu.set(e, t), p(t, [e]);
  }
  for (var Gi = 0; Gi < Bu.length; Gi++) {
    var Ki = Bu[Gi], Hf = Ki.toLowerCase(), qf = Ki[0].toUpperCase() + Ki.slice(1);
    Zt(Hf, "on" + qf);
  }
  Zt(Fu, "onAnimationEnd"), Zt(Xu, "onAnimationIteration"), Zt(Wu, "onAnimationStart"), Zt("dblclick", "onDoubleClick"), Zt("focusin", "onFocus"), Zt("focusout", "onBlur"), Zt(Uu, "onTransitionEnd"), w("onMouseEnter", ["mouseout", "mouseover"]), w("onMouseLeave", ["mouseout", "mouseover"]), w("onPointerEnter", ["pointerout", "pointerover"]), w("onPointerLeave", ["pointerout", "pointerover"]), p("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), p("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), p("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), p("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), p("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), p("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Nr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Qf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Nr));
  function Vu(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Vd(r, t, void 0, e), e.currentTarget = null;
  }
  function Hu(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], i = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t) for (var d = r.length - 1; 0 <= d; d--) {
          var h = r[d], m = h.instance, k = h.currentTarget;
          if (h = h.listener, m !== u && i.isPropagationStopped()) break e;
          Vu(i, h, k), u = m;
        }
        else for (d = 0; d < r.length; d++) {
          if (h = r[d], m = h.instance, k = h.currentTarget, h = h.listener, m !== u && i.isPropagationStopped()) break e;
          Vu(i, h, k), u = m;
        }
      }
    }
    if (el) throw e = Ti, el = !1, Ti = null, e;
  }
  function fe(e, t) {
    var n = t[ss];
    n === void 0 && (n = t[ss] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (qu(t, e, 2, !1), n.add(r));
  }
  function Ji(e, t, n) {
    var r = 0;
    t && (r |= 4), qu(n, e, r, t);
  }
  var yl = "_reactListening" + Math.random().toString(36).slice(2);
  function Cr(e) {
    if (!e[yl]) {
      e[yl] = !0, a.forEach(function(n) {
        n !== "selectionchange" && (Qf.has(n) || Ji(n, !1, e), Ji(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yl] || (t[yl] = !0, Ji("selectionchange", !1, t));
    }
  }
  function qu(e, t, n, r) {
    switch (yu(t)) {
      case 1:
        var i = af;
        break;
      case 4:
        i = cf;
        break;
      default:
        i = zi;
    }
    n = i.bind(null, t, n, e), i = void 0, !_i || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
  }
  function es(e, t, n, r, i) {
    var u = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var d = r.tag;
      if (d === 3 || d === 4) {
        var h = r.stateNode.containerInfo;
        if (h === i || h.nodeType === 8 && h.parentNode === i) break;
        if (d === 4) for (d = r.return; d !== null; ) {
          var m = d.tag;
          if ((m === 3 || m === 4) && (m = d.stateNode.containerInfo, m === i || m.nodeType === 8 && m.parentNode === i)) return;
          d = d.return;
        }
        for (; h !== null; ) {
          if (d = fn(h), d === null) return;
          if (m = d.tag, m === 5 || m === 6) {
            r = u = d;
            continue e;
          }
          h = h.parentNode;
        }
      }
      r = r.return;
    }
    Jo(function() {
      var k = u, T = Ni(n), R = [];
      e: {
        var C = Zu.get(e);
        if (C !== void 0) {
          var D = Di, W = e;
          switch (e) {
            case "keypress":
              if (dl(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = Nf;
              break;
            case "focusin":
              W = "focus", D = Wi;
              break;
            case "focusout":
              W = "blur", D = Wi;
              break;
            case "beforeblur":
            case "afterblur":
              D = Wi;
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
              D = xu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = pf;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = _f;
              break;
            case Fu:
            case Xu:
            case Wu:
              D = gf;
              break;
            case Uu:
              D = $f;
              break;
            case "scroll":
              D = df;
              break;
            case "wheel":
              D = Pf;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = vf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = Su;
          }
          var U = (t & 4) !== 0, je = !U && e === "scroll", v = U ? C !== null ? C + "Capture" : null : C;
          U = [];
          for (var g = k, x; g !== null; ) {
            x = g;
            var L = x.stateNode;
            if (x.tag === 5 && L !== null && (x = L, v !== null && (L = ur(g, v), L != null && U.push(Ir(g, L, x)))), je) break;
            g = g.return;
          }
          0 < U.length && (C = new D(C, W, null, n, T), R.push({ event: C, listeners: U }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (C = e === "mouseover" || e === "pointerover", D = e === "mouseout" || e === "pointerout", C && n !== Ei && (W = n.relatedTarget || n.fromElement) && (fn(W) || W[$t])) break e;
          if ((D || C) && (C = T.window === T ? T : (C = T.ownerDocument) ? C.defaultView || C.parentWindow : window, D ? (W = n.relatedTarget || n.toElement, D = k, W = W ? fn(W) : null, W !== null && (je = dn(W), W !== je || W.tag !== 5 && W.tag !== 6) && (W = null)) : (D = null, W = k), D !== W)) {
            if (U = xu, L = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (U = Su, L = "onPointerLeave", v = "onPointerEnter", g = "pointer"), je = D == null ? C : An(D), x = W == null ? C : An(W), C = new U(L, g + "leave", D, n, T), C.target = je, C.relatedTarget = x, L = null, fn(T) === k && (U = new U(v, g + "enter", W, n, T), U.target = x, U.relatedTarget = je, L = U), je = L, D && W) t: {
              for (U = D, v = W, g = 0, x = U; x; x = bn(x)) g++;
              for (x = 0, L = v; L; L = bn(L)) x++;
              for (; 0 < g - x; ) U = bn(U), g--;
              for (; 0 < x - g; ) v = bn(v), x--;
              for (; g--; ) {
                if (U === v || v !== null && U === v.alternate) break t;
                U = bn(U), v = bn(v);
              }
              U = null;
            }
            else U = null;
            D !== null && Qu(R, C, D, U, !1), W !== null && je !== null && Qu(R, je, W, U, !0);
          }
        }
        e: {
          if (C = k ? An(k) : window, D = C.nodeName && C.nodeName.toLowerCase(), D === "select" || D === "input" && C.type === "file") var Z = Df;
          else if (_u(C)) if ($u) Z = Uf;
          else {
            Z = Xf;
            var V = Ff;
          }
          else (D = C.nodeName) && D.toLowerCase() === "input" && (C.type === "checkbox" || C.type === "radio") && (Z = Wf);
          if (Z && (Z = Z(e, k))) {
            Tu(R, Z, n, T);
            break e;
          }
          V && V(e, C, k), e === "focusout" && (V = C._wrapperState) && V.controlled && C.type === "number" && wi(C, "number", C.value);
        }
        switch (V = k ? An(k) : window, e) {
          case "focusin":
            (_u(V) || V.contentEditable === "true") && (Ln = V, qi = k, Er = null);
            break;
          case "focusout":
            Er = qi = Ln = null;
            break;
          case "mousedown":
            Qi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qi = !1, Mu(R, n, T);
            break;
          case "selectionchange":
            if (Vf) break;
          case "keydown":
          case "keyup":
            Mu(R, n, T);
        }
        var H;
        if (Zi) e: {
          switch (e) {
            case "compositionstart":
              var Q = "onCompositionStart";
              break e;
            case "compositionend":
              Q = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Q = "onCompositionUpdate";
              break e;
          }
          Q = void 0;
        }
        else Pn ? Cu(e, n) && (Q = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Q = "onCompositionStart");
        Q && (ju && n.locale !== "ko" && (Pn || Q !== "onCompositionStart" ? Q === "onCompositionEnd" && Pn && (H = vu()) : (Ut = T, Mi = "value" in Ut ? Ut.value : Ut.textContent, Pn = !0)), V = vl(k, Q), 0 < V.length && (Q = new ku(Q, e, null, n, T), R.push({ event: Q, listeners: V }), H ? Q.data = H : (H = Iu(n), H !== null && (Q.data = H)))), (H = Of ? bf(e, n) : zf(e, n)) && (k = vl(k, "onBeforeInput"), 0 < k.length && (T = new ku("onBeforeInput", "beforeinput", null, n, T), R.push({ event: T, listeners: k }), T.data = H));
      }
      Hu(R, t);
    });
  }
  function Ir(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function vl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var i = e, u = i.stateNode;
      i.tag === 5 && u !== null && (i = u, u = ur(e, n), u != null && r.unshift(Ir(e, u, i)), u = ur(e, t), u != null && r.push(Ir(e, u, i))), e = e.return;
    }
    return r;
  }
  function bn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Qu(e, t, n, r, i) {
    for (var u = t._reactName, d = []; n !== null && n !== r; ) {
      var h = n, m = h.alternate, k = h.stateNode;
      if (m !== null && m === r) break;
      h.tag === 5 && k !== null && (h = k, i ? (m = ur(n, u), m != null && d.unshift(Ir(n, m, h))) : i || (m = ur(n, u), m != null && d.push(Ir(n, m, h)))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var Yf = /\r\n?/g, Gf = /\u0000|\uFFFD/g;
  function Yu(e) {
    return (typeof e == "string" ? e : "" + e).replace(Yf, `
`).replace(Gf, "");
  }
  function wl(e, t, n) {
    if (t = Yu(t), Yu(e) !== t && n) throw Error(s(425));
  }
  function xl() {
  }
  var ts = null, ns = null;
  function rs(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ls = typeof setTimeout == "function" ? setTimeout : void 0, Kf = typeof clearTimeout == "function" ? clearTimeout : void 0, Gu = typeof Promise == "function" ? Promise : void 0, Jf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Gu < "u" ? function(e) {
    return Gu.resolve(null).then(e).catch(e0);
  } : ls;
  function e0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function is(e, t) {
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
  function Bt(e) {
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
  function Ku(e) {
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
  var zn = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + zn, _r = "__reactProps$" + zn, $t = "__reactContainer$" + zn, ss = "__reactEvents$" + zn, t0 = "__reactListeners$" + zn, n0 = "__reactHandles$" + zn;
  function fn(e) {
    var t = e[Ct];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[$t] || n[Ct]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ku(e); e !== null; ) {
          if (n = e[Ct]) return n;
          e = Ku(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Tr(e) {
    return e = e[Ct] || e[$t], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function An(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function kl(e) {
    return e[_r] || null;
  }
  var os = [], Mn = -1;
  function Vt(e) {
    return { current: e };
  }
  function pe(e) {
    0 > Mn || (e.current = os[Mn], os[Mn] = null, Mn--);
  }
  function de(e, t) {
    Mn++, os[Mn] = e.current, e.current = t;
  }
  var Ht = {}, Oe = Vt(Ht), Ve = Vt(!1), pn = Ht;
  function Dn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ht;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, u;
    for (u in n) i[u] = t[u];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function He(e) {
    return e = e.childContextTypes, e != null;
  }
  function Sl() {
    pe(Ve), pe(Oe);
  }
  function Ju(e, t, n) {
    if (Oe.current !== Ht) throw Error(s(168));
    de(Oe, t), de(Ve, n);
  }
  function ea(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(s(108, ce(e) || "Unknown", i));
    return X({}, n, r);
  }
  function jl(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ht, pn = Oe.current, de(Oe, e), de(Ve, Ve.current), !0;
  }
  function ta(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = ea(e, t, pn), r.__reactInternalMemoizedMergedChildContext = e, pe(Ve), pe(Oe), de(Oe, e)) : pe(Ve), de(Ve, n);
  }
  var Rt = null, El = !1, us = !1;
  function na(e) {
    Rt === null ? Rt = [e] : Rt.push(e);
  }
  function r0(e) {
    El = !0, na(e);
  }
  function qt() {
    if (!us && Rt !== null) {
      us = !0;
      var e = 0, t = se;
      try {
        var n = Rt;
        for (se = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Rt = null, El = !1;
      } catch (i) {
        throw Rt !== null && (Rt = Rt.slice(e + 1)), lu($i, qt), i;
      } finally {
        se = t, us = !1;
      }
    }
    return null;
  }
  var Fn = [], Xn = 0, Nl = null, Cl = 0, ut = [], at = 0, hn = null, Pt = 1, Lt = "";
  function mn(e, t) {
    Fn[Xn++] = Cl, Fn[Xn++] = Nl, Nl = e, Cl = t;
  }
  function ra(e, t, n) {
    ut[at++] = Pt, ut[at++] = Lt, ut[at++] = hn, hn = e;
    var r = Pt;
    e = Lt;
    var i = 32 - mt(r) - 1;
    r &= ~(1 << i), n += 1;
    var u = 32 - mt(t) + i;
    if (30 < u) {
      var d = i - i % 5;
      u = (r & (1 << d) - 1).toString(32), r >>= d, i -= d, Pt = 1 << 32 - mt(t) + i | n << i | r, Lt = u + e;
    } else Pt = 1 << u | n << i | r, Lt = e;
  }
  function as(e) {
    e.return !== null && (mn(e, 1), ra(e, 1, 0));
  }
  function cs(e) {
    for (; e === Nl; ) Nl = Fn[--Xn], Fn[Xn] = null, Cl = Fn[--Xn], Fn[Xn] = null;
    for (; e === hn; ) hn = ut[--at], ut[at] = null, Lt = ut[--at], ut[at] = null, Pt = ut[--at], ut[at] = null;
  }
  var rt = null, lt = null, ge = !1, yt = null;
  function la(e, t) {
    var n = pt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function ia(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, rt = e, lt = Bt(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, rt = e, lt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = hn !== null ? { id: Pt, overflow: Lt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = pt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, rt = e, lt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ds(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function fs(e) {
    if (ge) {
      var t = lt;
      if (t) {
        var n = t;
        if (!ia(e, t)) {
          if (ds(e)) throw Error(s(418));
          t = Bt(n.nextSibling);
          var r = rt;
          t && ia(e, t) ? la(r, n) : (e.flags = e.flags & -4097 | 2, ge = !1, rt = e);
        }
      } else {
        if (ds(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, ge = !1, rt = e;
      }
    }
  }
  function sa(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    rt = e;
  }
  function Il(e) {
    if (e !== rt) return !1;
    if (!ge) return sa(e), ge = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !rs(e.type, e.memoizedProps)), t && (t = lt)) {
      if (ds(e)) throw oa(), Error(s(418));
      for (; t; ) la(e, t), t = Bt(t.nextSibling);
    }
    if (sa(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                lt = Bt(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        lt = null;
      }
    } else lt = rt ? Bt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function oa() {
    for (var e = lt; e; ) e = Bt(e.nextSibling);
  }
  function Wn() {
    lt = rt = null, ge = !1;
  }
  function ps(e) {
    yt === null ? yt = [e] : yt.push(e);
  }
  var l0 = Ee.ReactCurrentBatchConfig;
  function $r(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var i = r, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(d) {
          var h = i.refs;
          d === null ? delete h[u] : h[u] = d;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function _l(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function ua(e) {
    var t = e._init;
    return t(e._payload);
  }
  function aa(e) {
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
      return v = nn(v, g), v.index = 0, v.sibling = null, v;
    }
    function u(v, g, x) {
      return v.index = x, e ? (x = v.alternate, x !== null ? (x = x.index, x < g ? (v.flags |= 2, g) : x) : (v.flags |= 2, g)) : (v.flags |= 1048576, g);
    }
    function d(v) {
      return e && v.alternate === null && (v.flags |= 2), v;
    }
    function h(v, g, x, L) {
      return g === null || g.tag !== 6 ? (g = lo(x, v.mode, L), g.return = v, g) : (g = i(g, x), g.return = v, g);
    }
    function m(v, g, x, L) {
      var Z = x.type;
      return Z === ae ? T(v, g, x.props.children, L, x.key) : g !== null && (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Be && ua(Z) === g.type) ? (L = i(g, x.props), L.ref = $r(v, g, x), L.return = v, L) : (L = Kl(x.type, x.key, x.props, null, v.mode, L), L.ref = $r(v, g, x), L.return = v, L);
    }
    function k(v, g, x, L) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = io(x, v.mode, L), g.return = v, g) : (g = i(g, x.children || []), g.return = v, g);
    }
    function T(v, g, x, L, Z) {
      return g === null || g.tag !== 7 ? (g = jn(x, v.mode, L, Z), g.return = v, g) : (g = i(g, x), g.return = v, g);
    }
    function R(v, g, x) {
      if (typeof g == "string" && g !== "" || typeof g == "number") return g = lo("" + g, v.mode, x), g.return = v, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ot:
            return x = Kl(g.type, g.key, g.props, null, v.mode, x), x.ref = $r(v, null, g), x.return = v, x;
          case oe:
            return g = io(g, v.mode, x), g.return = v, g;
          case Be:
            var L = g._init;
            return R(v, L(g._payload), x);
        }
        if (ir(g) || q(g)) return g = jn(g, v.mode, x, null), g.return = v, g;
        _l(v, g);
      }
      return null;
    }
    function C(v, g, x, L) {
      var Z = g !== null ? g.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number") return Z !== null ? null : h(v, g, "" + x, L);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ot:
            return x.key === Z ? m(v, g, x, L) : null;
          case oe:
            return x.key === Z ? k(v, g, x, L) : null;
          case Be:
            return Z = x._init, C(
              v,
              g,
              Z(x._payload),
              L
            );
        }
        if (ir(x) || q(x)) return Z !== null ? null : T(v, g, x, L, null);
        _l(v, x);
      }
      return null;
    }
    function D(v, g, x, L, Z) {
      if (typeof L == "string" && L !== "" || typeof L == "number") return v = v.get(x) || null, h(g, v, "" + L, Z);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case ot:
            return v = v.get(L.key === null ? x : L.key) || null, m(g, v, L, Z);
          case oe:
            return v = v.get(L.key === null ? x : L.key) || null, k(g, v, L, Z);
          case Be:
            var V = L._init;
            return D(v, g, x, V(L._payload), Z);
        }
        if (ir(L) || q(L)) return v = v.get(x) || null, T(g, v, L, Z, null);
        _l(g, L);
      }
      return null;
    }
    function W(v, g, x, L) {
      for (var Z = null, V = null, H = g, Q = g = 0, Re = null; H !== null && Q < x.length; Q++) {
        H.index > Q ? (Re = H, H = null) : Re = H.sibling;
        var re = C(v, H, x[Q], L);
        if (re === null) {
          H === null && (H = Re);
          break;
        }
        e && H && re.alternate === null && t(v, H), g = u(re, g, Q), V === null ? Z = re : V.sibling = re, V = re, H = Re;
      }
      if (Q === x.length) return n(v, H), ge && mn(v, Q), Z;
      if (H === null) {
        for (; Q < x.length; Q++) H = R(v, x[Q], L), H !== null && (g = u(H, g, Q), V === null ? Z = H : V.sibling = H, V = H);
        return ge && mn(v, Q), Z;
      }
      for (H = r(v, H); Q < x.length; Q++) Re = D(H, v, Q, x[Q], L), Re !== null && (e && Re.alternate !== null && H.delete(Re.key === null ? Q : Re.key), g = u(Re, g, Q), V === null ? Z = Re : V.sibling = Re, V = Re);
      return e && H.forEach(function(rn) {
        return t(v, rn);
      }), ge && mn(v, Q), Z;
    }
    function U(v, g, x, L) {
      var Z = q(x);
      if (typeof Z != "function") throw Error(s(150));
      if (x = Z.call(x), x == null) throw Error(s(151));
      for (var V = Z = null, H = g, Q = g = 0, Re = null, re = x.next(); H !== null && !re.done; Q++, re = x.next()) {
        H.index > Q ? (Re = H, H = null) : Re = H.sibling;
        var rn = C(v, H, re.value, L);
        if (rn === null) {
          H === null && (H = Re);
          break;
        }
        e && H && rn.alternate === null && t(v, H), g = u(rn, g, Q), V === null ? Z = rn : V.sibling = rn, V = rn, H = Re;
      }
      if (re.done) return n(
        v,
        H
      ), ge && mn(v, Q), Z;
      if (H === null) {
        for (; !re.done; Q++, re = x.next()) re = R(v, re.value, L), re !== null && (g = u(re, g, Q), V === null ? Z = re : V.sibling = re, V = re);
        return ge && mn(v, Q), Z;
      }
      for (H = r(v, H); !re.done; Q++, re = x.next()) re = D(H, v, Q, re.value, L), re !== null && (e && re.alternate !== null && H.delete(re.key === null ? Q : re.key), g = u(re, g, Q), V === null ? Z = re : V.sibling = re, V = re);
      return e && H.forEach(function(A0) {
        return t(v, A0);
      }), ge && mn(v, Q), Z;
    }
    function je(v, g, x, L) {
      if (typeof x == "object" && x !== null && x.type === ae && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ot:
            e: {
              for (var Z = x.key, V = g; V !== null; ) {
                if (V.key === Z) {
                  if (Z = x.type, Z === ae) {
                    if (V.tag === 7) {
                      n(v, V.sibling), g = i(V, x.props.children), g.return = v, v = g;
                      break e;
                    }
                  } else if (V.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Be && ua(Z) === V.type) {
                    n(v, V.sibling), g = i(V, x.props), g.ref = $r(v, V, x), g.return = v, v = g;
                    break e;
                  }
                  n(v, V);
                  break;
                } else t(v, V);
                V = V.sibling;
              }
              x.type === ae ? (g = jn(x.props.children, v.mode, L, x.key), g.return = v, v = g) : (L = Kl(x.type, x.key, x.props, null, v.mode, L), L.ref = $r(v, g, x), L.return = v, v = L);
            }
            return d(v);
          case oe:
            e: {
              for (V = x.key; g !== null; ) {
                if (g.key === V) if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                  n(v, g.sibling), g = i(g, x.children || []), g.return = v, v = g;
                  break e;
                } else {
                  n(v, g);
                  break;
                }
                else t(v, g);
                g = g.sibling;
              }
              g = io(x, v.mode, L), g.return = v, v = g;
            }
            return d(v);
          case Be:
            return V = x._init, je(v, g, V(x._payload), L);
        }
        if (ir(x)) return W(v, g, x, L);
        if (q(x)) return U(v, g, x, L);
        _l(v, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(v, g.sibling), g = i(g, x), g.return = v, v = g) : (n(v, g), g = lo(x, v.mode, L), g.return = v, v = g), d(v)) : n(v, g);
    }
    return je;
  }
  var Un = aa(!0), ca = aa(!1), Tl = Vt(null), $l = null, Zn = null, hs = null;
  function ms() {
    hs = Zn = $l = null;
  }
  function gs(e) {
    var t = Tl.current;
    pe(Tl), e._currentValue = t;
  }
  function ys(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Bn(e, t) {
    $l = e, hs = Zn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (qe = !0), e.firstContext = null);
  }
  function ct(e) {
    var t = e._currentValue;
    if (hs !== e) if (e = { context: e, memoizedValue: t, next: null }, Zn === null) {
      if ($l === null) throw Error(s(308));
      Zn = e, $l.dependencies = { lanes: 0, firstContext: e };
    } else Zn = Zn.next = e;
    return t;
  }
  var gn = null;
  function vs(e) {
    gn === null ? gn = [e] : gn.push(e);
  }
  function da(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, vs(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Ot(e, r);
  }
  function Ot(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Qt = !1;
  function ws(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function fa(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function bt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Yt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (ee & 2) !== 0) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Ot(e, n);
    }
    return i = r.interleaved, i === null ? (t.next = t, vs(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Ot(e, n);
  }
  function Rl(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Li(e, n);
    }
  }
  function pa(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var i = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          u === null ? i = u = d : u = u.next = d, n = n.next;
        } while (n !== null);
        u === null ? i = u = t : u = u.next = t;
      } else i = u = t;
      n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: u, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Pl(e, t, n, r) {
    var i = e.updateQueue;
    Qt = !1;
    var u = i.firstBaseUpdate, d = i.lastBaseUpdate, h = i.shared.pending;
    if (h !== null) {
      i.shared.pending = null;
      var m = h, k = m.next;
      m.next = null, d === null ? u = k : d.next = k, d = m;
      var T = e.alternate;
      T !== null && (T = T.updateQueue, h = T.lastBaseUpdate, h !== d && (h === null ? T.firstBaseUpdate = k : h.next = k, T.lastBaseUpdate = m));
    }
    if (u !== null) {
      var R = i.baseState;
      d = 0, T = k = m = null, h = u;
      do {
        var C = h.lane, D = h.eventTime;
        if ((r & C) === C) {
          T !== null && (T = T.next = {
            eventTime: D,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          e: {
            var W = e, U = h;
            switch (C = t, D = n, U.tag) {
              case 1:
                if (W = U.payload, typeof W == "function") {
                  R = W.call(D, R, C);
                  break e;
                }
                R = W;
                break e;
              case 3:
                W.flags = W.flags & -65537 | 128;
              case 0:
                if (W = U.payload, C = typeof W == "function" ? W.call(D, R, C) : W, C == null) break e;
                R = X({}, R, C);
                break e;
              case 2:
                Qt = !0;
            }
          }
          h.callback !== null && h.lane !== 0 && (e.flags |= 64, C = i.effects, C === null ? i.effects = [h] : C.push(h));
        } else D = { eventTime: D, lane: C, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, T === null ? (k = T = D, m = R) : T = T.next = D, d |= C;
        if (h = h.next, h === null) {
          if (h = i.shared.pending, h === null) break;
          C = h, h = C.next, C.next = null, i.lastBaseUpdate = C, i.shared.pending = null;
        }
      } while (!0);
      if (T === null && (m = R), i.baseState = m, i.firstBaseUpdate = k, i.lastBaseUpdate = T, t = i.shared.interleaved, t !== null) {
        i = t;
        do
          d |= i.lane, i = i.next;
        while (i !== t);
      } else u === null && (i.shared.lanes = 0);
      wn |= d, e.lanes = d, e.memoizedState = R;
    }
  }
  function ha(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], i = r.callback;
      if (i !== null) {
        if (r.callback = null, r = n, typeof i != "function") throw Error(s(191, i));
        i.call(r);
      }
    }
  }
  var Rr = {}, It = Vt(Rr), Pr = Vt(Rr), Lr = Vt(Rr);
  function yn(e) {
    if (e === Rr) throw Error(s(174));
    return e;
  }
  function xs(e, t) {
    switch (de(Lr, t), de(Pr, e), de(It, Rr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : ki(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ki(t, e);
    }
    pe(It), de(It, t);
  }
  function Vn() {
    pe(It), pe(Pr), pe(Lr);
  }
  function ma(e) {
    yn(Lr.current);
    var t = yn(It.current), n = ki(t, e.type);
    t !== n && (de(Pr, e), de(It, n));
  }
  function ks(e) {
    Pr.current === e && (pe(It), pe(Pr));
  }
  var ve = Vt(0);
  function Ll(e) {
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
  var Ss = [];
  function js() {
    for (var e = 0; e < Ss.length; e++) Ss[e]._workInProgressVersionPrimary = null;
    Ss.length = 0;
  }
  var Ol = Ee.ReactCurrentDispatcher, Es = Ee.ReactCurrentBatchConfig, vn = 0, we = null, Ie = null, Te = null, bl = !1, Or = !1, br = 0, i0 = 0;
  function be() {
    throw Error(s(321));
  }
  function Ns(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!gt(e[n], t[n])) return !1;
    return !0;
  }
  function Cs(e, t, n, r, i, u) {
    if (vn = u, we = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ol.current = e === null || e.memoizedState === null ? a0 : c0, e = n(r, i), Or) {
      u = 0;
      do {
        if (Or = !1, br = 0, 25 <= u) throw Error(s(301));
        u += 1, Te = Ie = null, t.updateQueue = null, Ol.current = d0, e = n(r, i);
      } while (Or);
    }
    if (Ol.current = Ml, t = Ie !== null && Ie.next !== null, vn = 0, Te = Ie = we = null, bl = !1, t) throw Error(s(300));
    return e;
  }
  function Is() {
    var e = br !== 0;
    return br = 0, e;
  }
  function _t() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Te === null ? we.memoizedState = Te = e : Te = Te.next = e, Te;
  }
  function dt() {
    if (Ie === null) {
      var e = we.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = Te === null ? we.memoizedState : Te.next;
    if (t !== null) Te = t, Ie = e;
    else {
      if (e === null) throw Error(s(310));
      Ie = e, e = { memoizedState: Ie.memoizedState, baseState: Ie.baseState, baseQueue: Ie.baseQueue, queue: Ie.queue, next: null }, Te === null ? we.memoizedState = Te = e : Te = Te.next = e;
    }
    return Te;
  }
  function zr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function _s(e) {
    var t = dt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = Ie, i = r.baseQueue, u = n.pending;
    if (u !== null) {
      if (i !== null) {
        var d = i.next;
        i.next = u.next, u.next = d;
      }
      r.baseQueue = i = u, n.pending = null;
    }
    if (i !== null) {
      u = i.next, r = r.baseState;
      var h = d = null, m = null, k = u;
      do {
        var T = k.lane;
        if ((vn & T) === T) m !== null && (m = m.next = { lane: 0, action: k.action, hasEagerState: k.hasEagerState, eagerState: k.eagerState, next: null }), r = k.hasEagerState ? k.eagerState : e(r, k.action);
        else {
          var R = {
            lane: T,
            action: k.action,
            hasEagerState: k.hasEagerState,
            eagerState: k.eagerState,
            next: null
          };
          m === null ? (h = m = R, d = r) : m = m.next = R, we.lanes |= T, wn |= T;
        }
        k = k.next;
      } while (k !== null && k !== u);
      m === null ? d = r : m.next = h, gt(r, t.memoizedState) || (qe = !0), t.memoizedState = r, t.baseState = d, t.baseQueue = m, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      i = e;
      do
        u = i.lane, we.lanes |= u, wn |= u, i = i.next;
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Ts(e) {
    var t = dt(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, i = n.pending, u = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var d = i = i.next;
      do
        u = e(u, d.action), d = d.next;
      while (d !== i);
      gt(u, t.memoizedState) || (qe = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, r];
  }
  function ga() {
  }
  function ya(e, t) {
    var n = we, r = dt(), i = t(), u = !gt(r.memoizedState, i);
    if (u && (r.memoizedState = i, qe = !0), r = r.queue, $s(xa.bind(null, n, r, e), [e]), r.getSnapshot !== t || u || Te !== null && Te.memoizedState.tag & 1) {
      if (n.flags |= 2048, Ar(9, wa.bind(null, n, r, i, t), void 0, null), $e === null) throw Error(s(349));
      (vn & 30) !== 0 || va(n, t, i);
    }
    return i;
  }
  function va(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = we.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, we.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function wa(e, t, n, r) {
    t.value = n, t.getSnapshot = r, ka(t) && Sa(e);
  }
  function xa(e, t, n) {
    return n(function() {
      ka(t) && Sa(e);
    });
  }
  function ka(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !gt(e, n);
    } catch {
      return !0;
    }
  }
  function Sa(e) {
    var t = Ot(e, 1);
    t !== null && kt(t, e, 1, -1);
  }
  function ja(e) {
    var t = _t();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: zr, lastRenderedState: e }, t.queue = e, e = e.dispatch = u0.bind(null, we, e), [t.memoizedState, e];
  }
  function Ar(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = we.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, we.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Ea() {
    return dt().memoizedState;
  }
  function zl(e, t, n, r) {
    var i = _t();
    we.flags |= e, i.memoizedState = Ar(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Al(e, t, n, r) {
    var i = dt();
    r = r === void 0 ? null : r;
    var u = void 0;
    if (Ie !== null) {
      var d = Ie.memoizedState;
      if (u = d.destroy, r !== null && Ns(r, d.deps)) {
        i.memoizedState = Ar(t, n, u, r);
        return;
      }
    }
    we.flags |= e, i.memoizedState = Ar(1 | t, n, u, r);
  }
  function Na(e, t) {
    return zl(8390656, 8, e, t);
  }
  function $s(e, t) {
    return Al(2048, 8, e, t);
  }
  function Ca(e, t) {
    return Al(4, 2, e, t);
  }
  function Ia(e, t) {
    return Al(4, 4, e, t);
  }
  function _a(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Ta(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Al(4, 4, _a.bind(null, t, e), n);
  }
  function Rs() {
  }
  function $a(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ns(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Ra(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ns(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Pa(e, t, n) {
    return (vn & 21) === 0 ? (e.baseState && (e.baseState = !1, qe = !0), e.memoizedState = n) : (gt(n, t) || (n = uu(), we.lanes |= n, wn |= n, e.baseState = !0), t);
  }
  function s0(e, t) {
    var n = se;
    se = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Es.transition;
    Es.transition = {};
    try {
      e(!1), t();
    } finally {
      se = n, Es.transition = r;
    }
  }
  function La() {
    return dt().memoizedState;
  }
  function o0(e, t, n) {
    var r = en(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Oa(e)) ba(t, n);
    else if (n = da(e, t, n, r), n !== null) {
      var i = Ue();
      kt(n, e, r, i), za(n, t, r);
    }
  }
  function u0(e, t, n) {
    var r = en(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Oa(e)) ba(t, i);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var d = t.lastRenderedState, h = u(d, n);
        if (i.hasEagerState = !0, i.eagerState = h, gt(h, d)) {
          var m = t.interleaved;
          m === null ? (i.next = i, vs(t)) : (i.next = m.next, m.next = i), t.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
      n = da(e, t, i, r), n !== null && (i = Ue(), kt(n, e, r, i), za(n, t, r));
    }
  }
  function Oa(e) {
    var t = e.alternate;
    return e === we || t !== null && t === we;
  }
  function ba(e, t) {
    Or = bl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function za(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Li(e, n);
    }
  }
  var Ml = { readContext: ct, useCallback: be, useContext: be, useEffect: be, useImperativeHandle: be, useInsertionEffect: be, useLayoutEffect: be, useMemo: be, useReducer: be, useRef: be, useState: be, useDebugValue: be, useDeferredValue: be, useTransition: be, useMutableSource: be, useSyncExternalStore: be, useId: be, unstable_isNewReconciler: !1 }, a0 = { readContext: ct, useCallback: function(e, t) {
    return _t().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: ct, useEffect: Na, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, zl(
      4194308,
      4,
      _a.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return zl(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return zl(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = _t();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = _t();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = o0.bind(null, we, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = _t();
    return e = { current: e }, t.memoizedState = e;
  }, useState: ja, useDebugValue: Rs, useDeferredValue: function(e) {
    return _t().memoizedState = e;
  }, useTransition: function() {
    var e = ja(!1), t = e[0];
    return e = s0.bind(null, e[1]), _t().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = we, i = _t();
    if (ge) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), $e === null) throw Error(s(349));
      (vn & 30) !== 0 || va(r, t, n);
    }
    i.memoizedState = n;
    var u = { value: n, getSnapshot: t };
    return i.queue = u, Na(xa.bind(
      null,
      r,
      u,
      e
    ), [e]), r.flags |= 2048, Ar(9, wa.bind(null, r, u, n, t), void 0, null), n;
  }, useId: function() {
    var e = _t(), t = $e.identifierPrefix;
    if (ge) {
      var n = Lt, r = Pt;
      n = (r & ~(1 << 32 - mt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = br++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = i0++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, c0 = {
    readContext: ct,
    useCallback: $a,
    useContext: ct,
    useEffect: $s,
    useImperativeHandle: Ta,
    useInsertionEffect: Ca,
    useLayoutEffect: Ia,
    useMemo: Ra,
    useReducer: _s,
    useRef: Ea,
    useState: function() {
      return _s(zr);
    },
    useDebugValue: Rs,
    useDeferredValue: function(e) {
      var t = dt();
      return Pa(t, Ie.memoizedState, e);
    },
    useTransition: function() {
      var e = _s(zr)[0], t = dt().memoizedState;
      return [e, t];
    },
    useMutableSource: ga,
    useSyncExternalStore: ya,
    useId: La,
    unstable_isNewReconciler: !1
  }, d0 = { readContext: ct, useCallback: $a, useContext: ct, useEffect: $s, useImperativeHandle: Ta, useInsertionEffect: Ca, useLayoutEffect: Ia, useMemo: Ra, useReducer: Ts, useRef: Ea, useState: function() {
    return Ts(zr);
  }, useDebugValue: Rs, useDeferredValue: function(e) {
    var t = dt();
    return Ie === null ? t.memoizedState = e : Pa(t, Ie.memoizedState, e);
  }, useTransition: function() {
    var e = Ts(zr)[0], t = dt().memoizedState;
    return [e, t];
  }, useMutableSource: ga, useSyncExternalStore: ya, useId: La, unstable_isNewReconciler: !1 };
  function vt(e, t) {
    if (e && e.defaultProps) {
      t = X({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Ps(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Dl = { isMounted: function(e) {
    return (e = e._reactInternals) ? dn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ue(), i = en(e), u = bt(r, i);
    u.payload = t, n != null && (u.callback = n), t = Yt(e, u, i), t !== null && (kt(t, e, i, r), Rl(t, e, i));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Ue(), i = en(e), u = bt(r, i);
    u.tag = 1, u.payload = t, n != null && (u.callback = n), t = Yt(e, u, i), t !== null && (kt(t, e, i, r), Rl(t, e, i));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Ue(), r = en(e), i = bt(n, r);
    i.tag = 2, t != null && (i.callback = t), t = Yt(e, i, r), t !== null && (kt(t, e, r, n), Rl(t, e, r));
  } };
  function Aa(e, t, n, r, i, u, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, d) : t.prototype && t.prototype.isPureReactComponent ? !jr(n, r) || !jr(i, u) : !0;
  }
  function Ma(e, t, n) {
    var r = !1, i = Ht, u = t.contextType;
    return typeof u == "object" && u !== null ? u = ct(u) : (i = He(t) ? pn : Oe.current, r = t.contextTypes, u = (r = r != null) ? Dn(e, i) : Ht), t = new t(n, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Dl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function Da(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Dl.enqueueReplaceState(t, t.state, null);
  }
  function Ls(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, ws(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? i.context = ct(u) : (u = He(t) ? pn : Oe.current, i.context = Dn(e, u)), i.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (Ps(e, t, u, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Dl.enqueueReplaceState(i, i.state, null), Pl(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Hn(e, t) {
    try {
      var n = "", r = t;
      do
        n += te(r), r = r.return;
      while (r);
      var i = n;
    } catch (u) {
      i = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function Os(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function bs(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var f0 = typeof WeakMap == "function" ? WeakMap : Map;
  function Fa(e, t, n) {
    n = bt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      Vl || (Vl = !0, Ys = r), bs(e, t);
    }, n;
  }
  function Xa(e, t, n) {
    n = bt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      n.payload = function() {
        return r(i);
      }, n.callback = function() {
        bs(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (n.callback = function() {
      bs(e, t), typeof r != "function" && (Kt === null ? Kt = /* @__PURE__ */ new Set([this]) : Kt.add(this));
      var d = t.stack;
      this.componentDidCatch(t.value, { componentStack: d !== null ? d : "" });
    }), n;
  }
  function Wa(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new f0();
      var i = /* @__PURE__ */ new Set();
      r.set(t, i);
    } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
    i.has(n) || (i.add(n), e = C0.bind(null, e, t, n), t.then(e, e));
  }
  function Ua(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Za(e, t, n, r, i) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = bt(-1, 1), t.tag = 2, Yt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = i, e);
  }
  var p0 = Ee.ReactCurrentOwner, qe = !1;
  function We(e, t, n, r) {
    t.child = e === null ? ca(t, null, n, r) : Un(t, e.child, n, r);
  }
  function Ba(e, t, n, r, i) {
    n = n.render;
    var u = t.ref;
    return Bn(t, i), r = Cs(e, t, n, r, u, i), n = Is(), e !== null && !qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, zt(e, t, i)) : (ge && n && as(t), t.flags |= 1, We(e, t, r, i), t.child);
  }
  function Va(e, t, n, r, i) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !ro(u) && u.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = u, Ha(e, t, u, r, i)) : (e = Kl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & i) === 0) {
      var d = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : jr, n(d, r) && e.ref === t.ref) return zt(e, t, i);
    }
    return t.flags |= 1, e = nn(u, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Ha(e, t, n, r, i) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (jr(u, r) && e.ref === t.ref) if (qe = !1, t.pendingProps = r = u, (e.lanes & i) !== 0) (e.flags & 131072) !== 0 && (qe = !0);
      else return t.lanes = e.lanes, zt(e, t, i);
    }
    return zs(e, t, n, r, i);
  }
  function qa(e, t, n) {
    var r = t.pendingProps, i = r.children, u = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, de(Qn, it), it |= n;
    else {
      if ((n & 1073741824) === 0) return e = u !== null ? u.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, de(Qn, it), it |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = u !== null ? u.baseLanes : n, de(Qn, it), it |= r;
    }
    else u !== null ? (r = u.baseLanes | n, t.memoizedState = null) : r = n, de(Qn, it), it |= r;
    return We(e, t, i, n), t.child;
  }
  function Qa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function zs(e, t, n, r, i) {
    var u = He(n) ? pn : Oe.current;
    return u = Dn(t, u), Bn(t, i), n = Cs(e, t, n, r, u, i), r = Is(), e !== null && !qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, zt(e, t, i)) : (ge && r && as(t), t.flags |= 1, We(e, t, n, i), t.child);
  }
  function Ya(e, t, n, r, i) {
    if (He(n)) {
      var u = !0;
      jl(t);
    } else u = !1;
    if (Bn(t, i), t.stateNode === null) Xl(e, t), Ma(t, n, r), Ls(t, n, r, i), r = !0;
    else if (e === null) {
      var d = t.stateNode, h = t.memoizedProps;
      d.props = h;
      var m = d.context, k = n.contextType;
      typeof k == "object" && k !== null ? k = ct(k) : (k = He(n) ? pn : Oe.current, k = Dn(t, k));
      var T = n.getDerivedStateFromProps, R = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      R || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h !== r || m !== k) && Da(t, d, r, k), Qt = !1;
      var C = t.memoizedState;
      d.state = C, Pl(t, r, d, i), m = t.memoizedState, h !== r || C !== m || Ve.current || Qt ? (typeof T == "function" && (Ps(t, n, T, r), m = t.memoizedState), (h = Qt || Aa(t, n, h, r, C, m, k)) ? (R || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = m), d.props = r, d.state = m, d.context = k, r = h) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      d = t.stateNode, fa(e, t), h = t.memoizedProps, k = t.type === t.elementType ? h : vt(t.type, h), d.props = k, R = t.pendingProps, C = d.context, m = n.contextType, typeof m == "object" && m !== null ? m = ct(m) : (m = He(n) ? pn : Oe.current, m = Dn(t, m));
      var D = n.getDerivedStateFromProps;
      (T = typeof D == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h !== R || C !== m) && Da(t, d, r, m), Qt = !1, C = t.memoizedState, d.state = C, Pl(t, r, d, i);
      var W = t.memoizedState;
      h !== R || C !== W || Ve.current || Qt ? (typeof D == "function" && (Ps(t, n, D, r), W = t.memoizedState), (k = Qt || Aa(t, n, k, r, C, W, m) || !1) ? (T || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, W, m), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(r, W, m)), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = W), d.props = r, d.state = W, d.context = m, r = k) : (typeof d.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return As(e, t, n, r, u, i);
  }
  function As(e, t, n, r, i, u) {
    Qa(e, t);
    var d = (t.flags & 128) !== 0;
    if (!r && !d) return i && ta(t, n, !1), zt(e, t, u);
    r = t.stateNode, p0.current = t;
    var h = d && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && d ? (t.child = Un(t, e.child, null, u), t.child = Un(t, null, h, u)) : We(e, t, h, u), t.memoizedState = r.state, i && ta(t, n, !0), t.child;
  }
  function Ga(e) {
    var t = e.stateNode;
    t.pendingContext ? Ju(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ju(e, t.context, !1), xs(e, t.containerInfo);
  }
  function Ka(e, t, n, r, i) {
    return Wn(), ps(i), t.flags |= 256, We(e, t, n, r), t.child;
  }
  var Ms = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ds(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ja(e, t, n) {
    var r = t.pendingProps, i = ve.current, u = !1, d = (t.flags & 128) !== 0, h;
    if ((h = d) || (h = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), h ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), de(ve, i & 1), e === null)
      return fs(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (d = r.children, e = r.fallback, u ? (r = t.mode, u = t.child, d = { mode: "hidden", children: d }, (r & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = d) : u = Jl(d, r, 0, null), e = jn(e, r, n, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Ds(n), t.memoizedState = Ms, e) : Fs(t, d));
    if (i = e.memoizedState, i !== null && (h = i.dehydrated, h !== null)) return h0(e, t, d, r, h, i, n);
    if (u) {
      u = r.fallback, d = t.mode, i = e.child, h = i.sibling;
      var m = { mode: "hidden", children: r.children };
      return (d & 1) === 0 && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = m, t.deletions = null) : (r = nn(i, m), r.subtreeFlags = i.subtreeFlags & 14680064), h !== null ? u = nn(h, u) : (u = jn(u, d, n, null), u.flags |= 2), u.return = t, r.return = t, r.sibling = u, t.child = r, r = u, u = t.child, d = e.child.memoizedState, d = d === null ? Ds(n) : { baseLanes: d.baseLanes | n, cachePool: null, transitions: d.transitions }, u.memoizedState = d, u.childLanes = e.childLanes & ~n, t.memoizedState = Ms, r;
    }
    return u = e.child, e = u.sibling, r = nn(u, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function Fs(e, t) {
    return t = Jl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Fl(e, t, n, r) {
    return r !== null && ps(r), Un(t, e.child, null, n), e = Fs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function h0(e, t, n, r, i, u, d) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Os(Error(s(422))), Fl(e, t, d, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = r.fallback, i = t.mode, r = Jl({ mode: "visible", children: r.children }, i, 0, null), u = jn(u, i, d, null), u.flags |= 2, r.return = t, u.return = t, r.sibling = u, t.child = r, (t.mode & 1) !== 0 && Un(t, e.child, null, d), t.child.memoizedState = Ds(d), t.memoizedState = Ms, u);
    if ((t.mode & 1) === 0) return Fl(e, t, d, null);
    if (i.data === "$!") {
      if (r = i.nextSibling && i.nextSibling.dataset, r) var h = r.dgst;
      return r = h, u = Error(s(419)), r = Os(u, r, void 0), Fl(e, t, d, r);
    }
    if (h = (d & e.childLanes) !== 0, qe || h) {
      if (r = $e, r !== null) {
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
        i = (i & (r.suspendedLanes | d)) !== 0 ? 0 : i, i !== 0 && i !== u.retryLane && (u.retryLane = i, Ot(e, i), kt(r, e, i, -1));
      }
      return no(), r = Os(Error(s(421))), Fl(e, t, d, r);
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = I0.bind(null, e), i._reactRetry = t, null) : (e = u.treeContext, lt = Bt(i.nextSibling), rt = t, ge = !0, yt = null, e !== null && (ut[at++] = Pt, ut[at++] = Lt, ut[at++] = hn, Pt = e.id, Lt = e.overflow, hn = t), t = Fs(t, r.children), t.flags |= 4096, t);
  }
  function ec(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), ys(e.return, t, n);
  }
  function Xs(e, t, n, r, i) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = r, u.tail = n, u.tailMode = i);
  }
  function tc(e, t, n) {
    var r = t.pendingProps, i = r.revealOrder, u = r.tail;
    if (We(e, t, r.children, n), r = ve.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ec(e, n, t);
        else if (e.tag === 19) ec(e, n, t);
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
    if (de(ve, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Ll(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Xs(t, !1, i, n, u);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Ll(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Xs(t, !0, n, null, u);
        break;
      case "together":
        Xs(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Xl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function zt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), wn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = nn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = nn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function m0(e, t, n) {
    switch (t.tag) {
      case 3:
        Ga(t), Wn();
        break;
      case 5:
        ma(t);
        break;
      case 1:
        He(t.type) && jl(t);
        break;
      case 4:
        xs(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, i = t.memoizedProps.value;
        de(Tl, r._currentValue), r._currentValue = i;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (de(ve, ve.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Ja(e, t, n) : (de(ve, ve.current & 1), e = zt(e, t, n), e !== null ? e.sibling : null);
        de(ve, ve.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return tc(e, t, n);
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), de(ve, ve.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, qa(e, t, n);
    }
    return zt(e, t, n);
  }
  var nc, Ws, rc, lc;
  nc = function(e, t) {
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
  }, Ws = function() {
  }, rc = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      e = t.stateNode, yn(It.current);
      var u = null;
      switch (n) {
        case "input":
          i = yi(e, i), r = yi(e, r), u = [];
          break;
        case "select":
          i = X({}, i, { value: void 0 }), r = X({}, r, { value: void 0 }), u = [];
          break;
        case "textarea":
          i = xi(e, i), r = xi(e, r), u = [];
          break;
        default:
          typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = xl);
      }
      Si(n, r);
      var d;
      n = null;
      for (k in i) if (!r.hasOwnProperty(k) && i.hasOwnProperty(k) && i[k] != null) if (k === "style") {
        var h = i[k];
        for (d in h) h.hasOwnProperty(d) && (n || (n = {}), n[d] = "");
      } else k !== "dangerouslySetInnerHTML" && k !== "children" && k !== "suppressContentEditableWarning" && k !== "suppressHydrationWarning" && k !== "autoFocus" && (f.hasOwnProperty(k) ? u || (u = []) : (u = u || []).push(k, null));
      for (k in r) {
        var m = r[k];
        if (h = i?.[k], r.hasOwnProperty(k) && m !== h && (m != null || h != null)) if (k === "style") if (h) {
          for (d in h) !h.hasOwnProperty(d) || m && m.hasOwnProperty(d) || (n || (n = {}), n[d] = "");
          for (d in m) m.hasOwnProperty(d) && h[d] !== m[d] && (n || (n = {}), n[d] = m[d]);
        } else n || (u || (u = []), u.push(
          k,
          n
        )), n = m;
        else k === "dangerouslySetInnerHTML" ? (m = m ? m.__html : void 0, h = h ? h.__html : void 0, m != null && h !== m && (u = u || []).push(k, m)) : k === "children" ? typeof m != "string" && typeof m != "number" || (u = u || []).push(k, "" + m) : k !== "suppressContentEditableWarning" && k !== "suppressHydrationWarning" && (f.hasOwnProperty(k) ? (m != null && k === "onScroll" && fe("scroll", e), u || h === m || (u = [])) : (u = u || []).push(k, m));
      }
      n && (u = u || []).push("style", n);
      var k = u;
      (t.updateQueue = k) && (t.flags |= 4);
    }
  }, lc = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function Mr(e, t) {
    if (!ge) switch (e.tailMode) {
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
  function ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function g0(e, t, n) {
    var r = t.pendingProps;
    switch (cs(t), t.tag) {
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
        return ze(t), null;
      case 1:
        return He(t.type) && Sl(), ze(t), null;
      case 3:
        return r = t.stateNode, Vn(), pe(Ve), pe(Oe), js(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Il(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, yt !== null && (Js(yt), yt = null))), Ws(e, t), ze(t), null;
      case 5:
        ks(t);
        var i = yn(Lr.current);
        if (n = t.type, e !== null && t.stateNode != null) rc(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return ze(t), null;
          }
          if (e = yn(It.current), Il(t)) {
            r = t.stateNode, n = t.type;
            var u = t.memoizedProps;
            switch (r[Ct] = t, r[_r] = u, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                fe("cancel", r), fe("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                fe("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Nr.length; i++) fe(Nr[i], r);
                break;
              case "source":
                fe("error", r);
                break;
              case "img":
              case "image":
              case "link":
                fe(
                  "error",
                  r
                ), fe("load", r);
                break;
              case "details":
                fe("toggle", r);
                break;
              case "input":
                Mo(r, u), fe("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!u.multiple }, fe("invalid", r);
                break;
              case "textarea":
                Xo(r, u), fe("invalid", r);
            }
            Si(n, u), i = null;
            for (var d in u) if (u.hasOwnProperty(d)) {
              var h = u[d];
              d === "children" ? typeof h == "string" ? r.textContent !== h && (u.suppressHydrationWarning !== !0 && wl(r.textContent, h, e), i = ["children", h]) : typeof h == "number" && r.textContent !== "" + h && (u.suppressHydrationWarning !== !0 && wl(
                r.textContent,
                h,
                e
              ), i = ["children", "" + h]) : f.hasOwnProperty(d) && h != null && d === "onScroll" && fe("scroll", r);
            }
            switch (n) {
              case "input":
                Yr(r), Fo(r, u, !0);
                break;
              case "textarea":
                Yr(r), Uo(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (r.onclick = xl);
            }
            r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            d = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Zo(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = d.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = d.createElement(n, { is: r.is }) : (e = d.createElement(n), n === "select" && (d = e, r.multiple ? d.multiple = !0 : r.size && (d.size = r.size))) : e = d.createElementNS(e, n), e[Ct] = t, e[_r] = r, nc(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (d = ji(n, r), n) {
                case "dialog":
                  fe("cancel", e), fe("close", e), i = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  fe("load", e), i = r;
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < Nr.length; i++) fe(Nr[i], e);
                  i = r;
                  break;
                case "source":
                  fe("error", e), i = r;
                  break;
                case "img":
                case "image":
                case "link":
                  fe(
                    "error",
                    e
                  ), fe("load", e), i = r;
                  break;
                case "details":
                  fe("toggle", e), i = r;
                  break;
                case "input":
                  Mo(e, r), i = yi(e, r), fe("invalid", e);
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, i = X({}, r, { value: void 0 }), fe("invalid", e);
                  break;
                case "textarea":
                  Xo(e, r), i = xi(e, r), fe("invalid", e);
                  break;
                default:
                  i = r;
              }
              Si(n, i), h = i;
              for (u in h) if (h.hasOwnProperty(u)) {
                var m = h[u];
                u === "style" ? Ho(e, m) : u === "dangerouslySetInnerHTML" ? (m = m ? m.__html : void 0, m != null && Bo(e, m)) : u === "children" ? typeof m == "string" ? (n !== "textarea" || m !== "") && sr(e, m) : typeof m == "number" && sr(e, "" + m) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (f.hasOwnProperty(u) ? m != null && u === "onScroll" && fe("scroll", e) : m != null && ye(e, u, m, d));
              }
              switch (n) {
                case "input":
                  Yr(e), Fo(e, r, !1);
                  break;
                case "textarea":
                  Yr(e), Uo(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ie(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, u = r.value, u != null ? In(e, !!r.multiple, u, !1) : r.defaultValue != null && In(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = xl);
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
        return ze(t), null;
      case 6:
        if (e && t.stateNode != null) lc(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = yn(Lr.current), yn(It.current), Il(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Ct] = t, (u = r.nodeValue !== n) && (e = rt, e !== null)) switch (e.tag) {
              case 3:
                wl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && wl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ct] = t, t.stateNode = r;
        }
        return ze(t), null;
      case 13:
        if (pe(ve), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ge && lt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) oa(), Wn(), t.flags |= 98560, u = !1;
          else if (u = Il(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Ct] = t;
            } else Wn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ze(t), u = !1;
          } else yt !== null && (Js(yt), yt = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ve.current & 1) !== 0 ? _e === 0 && (_e = 3) : no())), t.updateQueue !== null && (t.flags |= 4), ze(t), null);
      case 4:
        return Vn(), Ws(e, t), e === null && Cr(t.stateNode.containerInfo), ze(t), null;
      case 10:
        return gs(t.type._context), ze(t), null;
      case 17:
        return He(t.type) && Sl(), ze(t), null;
      case 19:
        if (pe(ve), u = t.memoizedState, u === null) return ze(t), null;
        if (r = (t.flags & 128) !== 0, d = u.rendering, d === null) if (r) Mr(u, !1);
        else {
          if (_e !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (d = Ll(e), d !== null) {
              for (t.flags |= 128, Mr(u, !1), r = d.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) u = n, e = r, u.flags &= 14680066, d = u.alternate, d === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = d.childLanes, u.lanes = d.lanes, u.child = d.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = d.memoizedProps, u.memoizedState = d.memoizedState, u.updateQueue = d.updateQueue, u.type = d.type, e = d.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return de(ve, ve.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && Se() > Yn && (t.flags |= 128, r = !0, Mr(u, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Ll(d), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Mr(u, !0), u.tail === null && u.tailMode === "hidden" && !d.alternate && !ge) return ze(t), null;
          } else 2 * Se() - u.renderingStartTime > Yn && n !== 1073741824 && (t.flags |= 128, r = !0, Mr(u, !1), t.lanes = 4194304);
          u.isBackwards ? (d.sibling = t.child, t.child = d) : (n = u.last, n !== null ? n.sibling = d : t.child = d, u.last = d);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = Se(), t.sibling = null, n = ve.current, de(ve, r ? n & 1 | 2 : n & 1), t) : (ze(t), null);
      case 22:
      case 23:
        return to(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (it & 1073741824) !== 0 && (ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ze(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function y0(e, t) {
    switch (cs(t), t.tag) {
      case 1:
        return He(t.type) && Sl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Vn(), pe(Ve), pe(Oe), js(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return ks(t), null;
      case 13:
        if (pe(ve), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Wn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return pe(ve), null;
      case 4:
        return Vn(), null;
      case 10:
        return gs(t.type._context), null;
      case 22:
      case 23:
        return to(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Wl = !1, Ae = !1, v0 = typeof WeakSet == "function" ? WeakSet : Set, F = null;
  function qn(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      ke(e, t, r);
    }
    else n.current = null;
  }
  function Us(e, t, n) {
    try {
      n();
    } catch (r) {
      ke(e, t, r);
    }
  }
  var ic = !1;
  function w0(e, t) {
    if (ts = ul, e = Au(), Hi(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset, u = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, u.nodeType;
          } catch {
            n = null;
            break e;
          }
          var d = 0, h = -1, m = -1, k = 0, T = 0, R = e, C = null;
          t: for (; ; ) {
            for (var D; R !== n || i !== 0 && R.nodeType !== 3 || (h = d + i), R !== u || r !== 0 && R.nodeType !== 3 || (m = d + r), R.nodeType === 3 && (d += R.nodeValue.length), (D = R.firstChild) !== null; )
              C = R, R = D;
            for (; ; ) {
              if (R === e) break t;
              if (C === n && ++k === i && (h = d), C === u && ++T === r && (m = d), (D = R.nextSibling) !== null) break;
              R = C, C = R.parentNode;
            }
            R = D;
          }
          n = h === -1 || m === -1 ? null : { start: h, end: m };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ns = { focusedElem: e, selectionRange: n }, ul = !1, F = t; F !== null; ) if (t = F, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, F = e;
    else for (; F !== null; ) {
      t = F;
      try {
        var W = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (W !== null) {
              var U = W.memoizedProps, je = W.memoizedState, v = t.stateNode, g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? U : vt(t.type, U), je);
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
      } catch (L) {
        ke(t, t.return, L);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, F = e;
        break;
      }
      F = t.return;
    }
    return W = ic, ic = !1, W;
  }
  function Dr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var i = r = r.next;
      do {
        if ((i.tag & e) === e) {
          var u = i.destroy;
          i.destroy = void 0, u !== void 0 && Us(t, n, u);
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function Ul(e, t) {
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
  function Zs(e) {
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
  function sc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ct], delete t[_r], delete t[ss], delete t[t0], delete t[n0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function oc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function uc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || oc(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Bs(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = xl));
    else if (r !== 4 && (e = e.child, e !== null)) for (Bs(e, t, n), e = e.sibling; e !== null; ) Bs(e, t, n), e = e.sibling;
  }
  function Vs(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (Vs(e, t, n), e = e.sibling; e !== null; ) Vs(e, t, n), e = e.sibling;
  }
  var Pe = null, wt = !1;
  function Gt(e, t, n) {
    for (n = n.child; n !== null; ) ac(e, t, n), n = n.sibling;
  }
  function ac(e, t, n) {
    if (Nt && typeof Nt.onCommitFiberUnmount == "function") try {
      Nt.onCommitFiberUnmount(nl, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Ae || qn(n, t);
      case 6:
        var r = Pe, i = wt;
        Pe = null, Gt(e, t, n), Pe = r, wt = i, Pe !== null && (wt ? (e = Pe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Pe.removeChild(n.stateNode));
        break;
      case 18:
        Pe !== null && (wt ? (e = Pe, n = n.stateNode, e.nodeType === 8 ? is(e.parentNode, n) : e.nodeType === 1 && is(e, n), yr(e)) : is(Pe, n.stateNode));
        break;
      case 4:
        r = Pe, i = wt, Pe = n.stateNode.containerInfo, wt = !0, Gt(e, t, n), Pe = r, wt = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ae && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          i = r = r.next;
          do {
            var u = i, d = u.destroy;
            u = u.tag, d !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && Us(n, t, d), i = i.next;
          } while (i !== r);
        }
        Gt(e, t, n);
        break;
      case 1:
        if (!Ae && (qn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (h) {
          ke(n, t, h);
        }
        Gt(e, t, n);
        break;
      case 21:
        Gt(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Ae = (r = Ae) || n.memoizedState !== null, Gt(e, t, n), Ae = r) : Gt(e, t, n);
        break;
      default:
        Gt(e, t, n);
    }
  }
  function cc(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new v0()), t.forEach(function(r) {
        var i = _0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
    }
  }
  function xt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var u = e, d = t, h = d;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 5:
              Pe = h.stateNode, wt = !1;
              break e;
            case 3:
              Pe = h.stateNode.containerInfo, wt = !0;
              break e;
            case 4:
              Pe = h.stateNode.containerInfo, wt = !0;
              break e;
          }
          h = h.return;
        }
        if (Pe === null) throw Error(s(160));
        ac(u, d, i), Pe = null, wt = !1;
        var m = i.alternate;
        m !== null && (m.return = null), i.return = null;
      } catch (k) {
        ke(i, t, k);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dc(t, e), t = t.sibling;
  }
  function dc(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (xt(t, e), Tt(e), r & 4) {
          try {
            Dr(3, e, e.return), Ul(3, e);
          } catch (U) {
            ke(e, e.return, U);
          }
          try {
            Dr(5, e, e.return);
          } catch (U) {
            ke(e, e.return, U);
          }
        }
        break;
      case 1:
        xt(t, e), Tt(e), r & 512 && n !== null && qn(n, n.return);
        break;
      case 5:
        if (xt(t, e), Tt(e), r & 512 && n !== null && qn(n, n.return), e.flags & 32) {
          var i = e.stateNode;
          try {
            sr(i, "");
          } catch (U) {
            ke(e, e.return, U);
          }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
          var u = e.memoizedProps, d = n !== null ? n.memoizedProps : u, h = e.type, m = e.updateQueue;
          if (e.updateQueue = null, m !== null) try {
            h === "input" && u.type === "radio" && u.name != null && Do(i, u), ji(h, d);
            var k = ji(h, u);
            for (d = 0; d < m.length; d += 2) {
              var T = m[d], R = m[d + 1];
              T === "style" ? Ho(i, R) : T === "dangerouslySetInnerHTML" ? Bo(i, R) : T === "children" ? sr(i, R) : ye(i, T, R, k);
            }
            switch (h) {
              case "input":
                vi(i, u);
                break;
              case "textarea":
                Wo(i, u);
                break;
              case "select":
                var C = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!u.multiple;
                var D = u.value;
                D != null ? In(i, !!u.multiple, D, !1) : C !== !!u.multiple && (u.defaultValue != null ? In(
                  i,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : In(i, !!u.multiple, u.multiple ? [] : "", !1));
            }
            i[_r] = u;
          } catch (U) {
            ke(e, e.return, U);
          }
        }
        break;
      case 6:
        if (xt(t, e), Tt(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          i = e.stateNode, u = e.memoizedProps;
          try {
            i.nodeValue = u;
          } catch (U) {
            ke(e, e.return, U);
          }
        }
        break;
      case 3:
        if (xt(t, e), Tt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          yr(t.containerInfo);
        } catch (U) {
          ke(e, e.return, U);
        }
        break;
      case 4:
        xt(t, e), Tt(e);
        break;
      case 13:
        xt(t, e), Tt(e), i = e.child, i.flags & 8192 && (u = i.memoizedState !== null, i.stateNode.isHidden = u, !u || i.alternate !== null && i.alternate.memoizedState !== null || (Qs = Se())), r & 4 && cc(e);
        break;
      case 22:
        if (T = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ae = (k = Ae) || T, xt(t, e), Ae = k) : xt(t, e), Tt(e), r & 8192) {
          if (k = e.memoizedState !== null, (e.stateNode.isHidden = k) && !T && (e.mode & 1) !== 0) for (F = e, T = e.child; T !== null; ) {
            for (R = F = T; F !== null; ) {
              switch (C = F, D = C.child, C.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dr(4, C, C.return);
                  break;
                case 1:
                  qn(C, C.return);
                  var W = C.stateNode;
                  if (typeof W.componentWillUnmount == "function") {
                    r = C, n = C.return;
                    try {
                      t = r, W.props = t.memoizedProps, W.state = t.memoizedState, W.componentWillUnmount();
                    } catch (U) {
                      ke(r, n, U);
                    }
                  }
                  break;
                case 5:
                  qn(C, C.return);
                  break;
                case 22:
                  if (C.memoizedState !== null) {
                    hc(R);
                    continue;
                  }
              }
              D !== null ? (D.return = C, F = D) : hc(R);
            }
            T = T.sibling;
          }
          e: for (T = null, R = e; ; ) {
            if (R.tag === 5) {
              if (T === null) {
                T = R;
                try {
                  i = R.stateNode, k ? (u = i.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (h = R.stateNode, m = R.memoizedProps.style, d = m != null && m.hasOwnProperty("display") ? m.display : null, h.style.display = Vo("display", d));
                } catch (U) {
                  ke(e, e.return, U);
                }
              }
            } else if (R.tag === 6) {
              if (T === null) try {
                R.stateNode.nodeValue = k ? "" : R.memoizedProps;
              } catch (U) {
                ke(e, e.return, U);
              }
            } else if ((R.tag !== 22 && R.tag !== 23 || R.memoizedState === null || R === e) && R.child !== null) {
              R.child.return = R, R = R.child;
              continue;
            }
            if (R === e) break e;
            for (; R.sibling === null; ) {
              if (R.return === null || R.return === e) break e;
              T === R && (T = null), R = R.return;
            }
            T === R && (T = null), R.sibling.return = R.return, R = R.sibling;
          }
        }
        break;
      case 19:
        xt(t, e), Tt(e), r & 4 && cc(e);
        break;
      case 21:
        break;
      default:
        xt(
          t,
          e
        ), Tt(e);
    }
  }
  function Tt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (oc(n)) {
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
            var u = uc(e);
            Vs(e, u, i);
            break;
          case 3:
          case 4:
            var d = r.stateNode.containerInfo, h = uc(e);
            Bs(e, h, d);
            break;
          default:
            throw Error(s(161));
        }
      } catch (m) {
        ke(e, e.return, m);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function x0(e, t, n) {
    F = e, fc(e);
  }
  function fc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; F !== null; ) {
      var i = F, u = i.child;
      if (i.tag === 22 && r) {
        var d = i.memoizedState !== null || Wl;
        if (!d) {
          var h = i.alternate, m = h !== null && h.memoizedState !== null || Ae;
          h = Wl;
          var k = Ae;
          if (Wl = d, (Ae = m) && !k) for (F = i; F !== null; ) d = F, m = d.child, d.tag === 22 && d.memoizedState !== null ? mc(i) : m !== null ? (m.return = d, F = m) : mc(i);
          for (; u !== null; ) F = u, fc(u), u = u.sibling;
          F = i, Wl = h, Ae = k;
        }
        pc(e);
      } else (i.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = i, F = u) : pc(e);
    }
  }
  function pc(e) {
    for (; F !== null; ) {
      var t = F;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ae || Ul(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ae) if (n === null) r.componentDidMount();
              else {
                var i = t.elementType === t.type ? n.memoizedProps : vt(t.type, n.memoizedProps);
                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && ha(t, u, r);
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
                ha(t, d, n);
              }
              break;
            case 5:
              var h = t.stateNode;
              if (n === null && t.flags & 4) {
                n = h;
                var m = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    m.autoFocus && n.focus();
                    break;
                  case "img":
                    m.src && (n.src = m.src);
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
                  var T = k.memoizedState;
                  if (T !== null) {
                    var R = T.dehydrated;
                    R !== null && yr(R);
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
          Ae || t.flags & 512 && Zs(t);
        } catch (C) {
          ke(t, t.return, C);
        }
      }
      if (t === e) {
        F = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, F = n;
        break;
      }
      F = t.return;
    }
  }
  function hc(e) {
    for (; F !== null; ) {
      var t = F;
      if (t === e) {
        F = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, F = n;
        break;
      }
      F = t.return;
    }
  }
  function mc(e) {
    for (; F !== null; ) {
      var t = F;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Ul(4, t);
            } catch (m) {
              ke(t, n, m);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (m) {
                ke(t, i, m);
              }
            }
            var u = t.return;
            try {
              Zs(t);
            } catch (m) {
              ke(t, u, m);
            }
            break;
          case 5:
            var d = t.return;
            try {
              Zs(t);
            } catch (m) {
              ke(t, d, m);
            }
        }
      } catch (m) {
        ke(t, t.return, m);
      }
      if (t === e) {
        F = null;
        break;
      }
      var h = t.sibling;
      if (h !== null) {
        h.return = t.return, F = h;
        break;
      }
      F = t.return;
    }
  }
  var k0 = Math.ceil, Zl = Ee.ReactCurrentDispatcher, Hs = Ee.ReactCurrentOwner, ft = Ee.ReactCurrentBatchConfig, ee = 0, $e = null, Ce = null, Le = 0, it = 0, Qn = Vt(0), _e = 0, Fr = null, wn = 0, Bl = 0, qs = 0, Xr = null, Qe = null, Qs = 0, Yn = 1 / 0, At = null, Vl = !1, Ys = null, Kt = null, Hl = !1, Jt = null, ql = 0, Wr = 0, Gs = null, Ql = -1, Yl = 0;
  function Ue() {
    return (ee & 6) !== 0 ? Se() : Ql !== -1 ? Ql : Ql = Se();
  }
  function en(e) {
    return (e.mode & 1) === 0 ? 1 : (ee & 2) !== 0 && Le !== 0 ? Le & -Le : l0.transition !== null ? (Yl === 0 && (Yl = uu()), Yl) : (e = se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : yu(e.type)), e);
  }
  function kt(e, t, n, r) {
    if (50 < Wr) throw Wr = 0, Gs = null, Error(s(185));
    fr(e, n, r), ((ee & 2) === 0 || e !== $e) && (e === $e && ((ee & 2) === 0 && (Bl |= n), _e === 4 && tn(e, Le)), Ye(e, r), n === 1 && ee === 0 && (t.mode & 1) === 0 && (Yn = Se() + 500, El && qt()));
  }
  function Ye(e, t) {
    var n = e.callbackNode;
    rf(e, t);
    var r = il(e, e === $e ? Le : 0);
    if (r === 0) n !== null && iu(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && iu(n), t === 1) e.tag === 0 ? r0(yc.bind(null, e)) : na(yc.bind(null, e)), Jf(function() {
        (ee & 6) === 0 && qt();
      }), n = null;
      else {
        switch (au(r)) {
          case 1:
            n = $i;
            break;
          case 4:
            n = su;
            break;
          case 16:
            n = tl;
            break;
          case 536870912:
            n = ou;
            break;
          default:
            n = tl;
        }
        n = Nc(n, gc.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function gc(e, t) {
    if (Ql = -1, Yl = 0, (ee & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (Gn() && e.callbackNode !== n) return null;
    var r = il(e, e === $e ? Le : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Gl(e, r);
    else {
      t = r;
      var i = ee;
      ee |= 2;
      var u = wc();
      ($e !== e || Le !== t) && (At = null, Yn = Se() + 500, kn(e, t));
      do
        try {
          E0();
          break;
        } catch (h) {
          vc(e, h);
        }
      while (!0);
      ms(), Zl.current = u, ee = i, Ce !== null ? t = 0 : ($e = null, Le = 0, t = _e);
    }
    if (t !== 0) {
      if (t === 2 && (i = Ri(e), i !== 0 && (r = i, t = Ks(e, i))), t === 1) throw n = Fr, kn(e, 0), tn(e, r), Ye(e, Se()), n;
      if (t === 6) tn(e, r);
      else {
        if (i = e.current.alternate, (r & 30) === 0 && !S0(i) && (t = Gl(e, r), t === 2 && (u = Ri(e), u !== 0 && (r = u, t = Ks(e, u))), t === 1)) throw n = Fr, kn(e, 0), tn(e, r), Ye(e, Se()), n;
        switch (e.finishedWork = i, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Sn(e, Qe, At);
            break;
          case 3:
            if (tn(e, r), (r & 130023424) === r && (t = Qs + 500 - Se(), 10 < t)) {
              if (il(e, 0) !== 0) break;
              if (i = e.suspendedLanes, (i & r) !== r) {
                Ue(), e.pingedLanes |= e.suspendedLanes & i;
                break;
              }
              e.timeoutHandle = ls(Sn.bind(null, e, Qe, At), t);
              break;
            }
            Sn(e, Qe, At);
            break;
          case 4:
            if (tn(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, i = -1; 0 < r; ) {
              var d = 31 - mt(r);
              u = 1 << d, d = t[d], d > i && (i = d), r &= ~u;
            }
            if (r = i, r = Se() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * k0(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = ls(Sn.bind(null, e, Qe, At), r);
              break;
            }
            Sn(e, Qe, At);
            break;
          case 5:
            Sn(e, Qe, At);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Ye(e, Se()), e.callbackNode === n ? gc.bind(null, e) : null;
  }
  function Ks(e, t) {
    var n = Xr;
    return e.current.memoizedState.isDehydrated && (kn(e, t).flags |= 256), e = Gl(e, t), e !== 2 && (t = Qe, Qe = n, t !== null && Js(t)), e;
  }
  function Js(e) {
    Qe === null ? Qe = e : Qe.push.apply(Qe, e);
  }
  function S0(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var i = n[r], u = i.getSnapshot;
          i = i.value;
          try {
            if (!gt(u(), i)) return !1;
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
  function tn(e, t) {
    for (t &= ~qs, t &= ~Bl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - mt(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function yc(e) {
    if ((ee & 6) !== 0) throw Error(s(327));
    Gn();
    var t = il(e, 0);
    if ((t & 1) === 0) return Ye(e, Se()), null;
    var n = Gl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Ri(e);
      r !== 0 && (t = r, n = Ks(e, r));
    }
    if (n === 1) throw n = Fr, kn(e, 0), tn(e, t), Ye(e, Se()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Sn(e, Qe, At), Ye(e, Se()), null;
  }
  function eo(e, t) {
    var n = ee;
    ee |= 1;
    try {
      return e(t);
    } finally {
      ee = n, ee === 0 && (Yn = Se() + 500, El && qt());
    }
  }
  function xn(e) {
    Jt !== null && Jt.tag === 0 && (ee & 6) === 0 && Gn();
    var t = ee;
    ee |= 1;
    var n = ft.transition, r = se;
    try {
      if (ft.transition = null, se = 1, e) return e();
    } finally {
      se = r, ft.transition = n, ee = t, (ee & 6) === 0 && qt();
    }
  }
  function to() {
    it = Qn.current, pe(Qn);
  }
  function kn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Kf(n)), Ce !== null) for (n = Ce.return; n !== null; ) {
      var r = n;
      switch (cs(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Sl();
          break;
        case 3:
          Vn(), pe(Ve), pe(Oe), js();
          break;
        case 5:
          ks(r);
          break;
        case 4:
          Vn();
          break;
        case 13:
          pe(ve);
          break;
        case 19:
          pe(ve);
          break;
        case 10:
          gs(r.type._context);
          break;
        case 22:
        case 23:
          to();
      }
      n = n.return;
    }
    if ($e = e, Ce = e = nn(e.current, null), Le = it = t, _e = 0, Fr = null, qs = Bl = wn = 0, Qe = Xr = null, gn !== null) {
      for (t = 0; t < gn.length; t++) if (n = gn[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var i = r.next, u = n.pending;
        if (u !== null) {
          var d = u.next;
          u.next = i, r.next = d;
        }
        n.pending = r;
      }
      gn = null;
    }
    return e;
  }
  function vc(e, t) {
    do {
      var n = Ce;
      try {
        if (ms(), Ol.current = Ml, bl) {
          for (var r = we.memoizedState; r !== null; ) {
            var i = r.queue;
            i !== null && (i.pending = null), r = r.next;
          }
          bl = !1;
        }
        if (vn = 0, Te = Ie = we = null, Or = !1, br = 0, Hs.current = null, n === null || n.return === null) {
          _e = 1, Fr = t, Ce = null;
          break;
        }
        e: {
          var u = e, d = n.return, h = n, m = t;
          if (t = Le, h.flags |= 32768, m !== null && typeof m == "object" && typeof m.then == "function") {
            var k = m, T = h, R = T.tag;
            if ((T.mode & 1) === 0 && (R === 0 || R === 11 || R === 15)) {
              var C = T.alternate;
              C ? (T.updateQueue = C.updateQueue, T.memoizedState = C.memoizedState, T.lanes = C.lanes) : (T.updateQueue = null, T.memoizedState = null);
            }
            var D = Ua(d);
            if (D !== null) {
              D.flags &= -257, Za(D, d, h, u, t), D.mode & 1 && Wa(u, k, t), t = D, m = k;
              var W = t.updateQueue;
              if (W === null) {
                var U = /* @__PURE__ */ new Set();
                U.add(m), t.updateQueue = U;
              } else W.add(m);
              break e;
            } else {
              if ((t & 1) === 0) {
                Wa(u, k, t), no();
                break e;
              }
              m = Error(s(426));
            }
          } else if (ge && h.mode & 1) {
            var je = Ua(d);
            if (je !== null) {
              (je.flags & 65536) === 0 && (je.flags |= 256), Za(je, d, h, u, t), ps(Hn(m, h));
              break e;
            }
          }
          u = m = Hn(m, h), _e !== 4 && (_e = 2), Xr === null ? Xr = [u] : Xr.push(u), u = d;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var v = Fa(u, m, t);
                pa(u, v);
                break e;
              case 1:
                h = m;
                var g = u.type, x = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof g.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (Kt === null || !Kt.has(x)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var L = Xa(u, h, t);
                  pa(u, L);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        kc(n);
      } catch (Z) {
        t = Z, Ce === n && n !== null && (Ce = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function wc() {
    var e = Zl.current;
    return Zl.current = Ml, e === null ? Ml : e;
  }
  function no() {
    (_e === 0 || _e === 3 || _e === 2) && (_e = 4), $e === null || (wn & 268435455) === 0 && (Bl & 268435455) === 0 || tn($e, Le);
  }
  function Gl(e, t) {
    var n = ee;
    ee |= 2;
    var r = wc();
    ($e !== e || Le !== t) && (At = null, kn(e, t));
    do
      try {
        j0();
        break;
      } catch (i) {
        vc(e, i);
      }
    while (!0);
    if (ms(), ee = n, Zl.current = r, Ce !== null) throw Error(s(261));
    return $e = null, Le = 0, _e;
  }
  function j0() {
    for (; Ce !== null; ) xc(Ce);
  }
  function E0() {
    for (; Ce !== null && !qd(); ) xc(Ce);
  }
  function xc(e) {
    var t = Ec(e.alternate, e, it);
    e.memoizedProps = e.pendingProps, t === null ? kc(e) : Ce = t, Hs.current = null;
  }
  function kc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = g0(n, t, it), n !== null) {
          Ce = n;
          return;
        }
      } else {
        if (n = y0(n, t), n !== null) {
          n.flags &= 32767, Ce = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          _e = 6, Ce = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    _e === 0 && (_e = 5);
  }
  function Sn(e, t, n) {
    var r = se, i = ft.transition;
    try {
      ft.transition = null, se = 1, N0(e, t, n, r);
    } finally {
      ft.transition = i, se = r;
    }
    return null;
  }
  function N0(e, t, n, r) {
    do
      Gn();
    while (Jt !== null);
    if ((ee & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = n.lanes | n.childLanes;
    if (lf(e, u), e === $e && (Ce = $e = null, Le = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || Hl || (Hl = !0, Nc(tl, function() {
      return Gn(), null;
    })), u = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || u) {
      u = ft.transition, ft.transition = null;
      var d = se;
      se = 1;
      var h = ee;
      ee |= 4, Hs.current = null, w0(e, n), dc(n, e), Bf(ns), ul = !!ts, ns = ts = null, e.current = n, x0(n), Qd(), ee = h, se = d, ft.transition = u;
    } else e.current = n;
    if (Hl && (Hl = !1, Jt = e, ql = i), u = e.pendingLanes, u === 0 && (Kt = null), Kd(n.stateNode), Ye(e, Se()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
    if (Vl) throw Vl = !1, e = Ys, Ys = null, e;
    return (ql & 1) !== 0 && e.tag !== 0 && Gn(), u = e.pendingLanes, (u & 1) !== 0 ? e === Gs ? Wr++ : (Wr = 0, Gs = e) : Wr = 0, qt(), null;
  }
  function Gn() {
    if (Jt !== null) {
      var e = au(ql), t = ft.transition, n = se;
      try {
        if (ft.transition = null, se = 16 > e ? 16 : e, Jt === null) var r = !1;
        else {
          if (e = Jt, Jt = null, ql = 0, (ee & 6) !== 0) throw Error(s(331));
          var i = ee;
          for (ee |= 4, F = e.current; F !== null; ) {
            var u = F, d = u.child;
            if ((F.flags & 16) !== 0) {
              var h = u.deletions;
              if (h !== null) {
                for (var m = 0; m < h.length; m++) {
                  var k = h[m];
                  for (F = k; F !== null; ) {
                    var T = F;
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Dr(8, T, u);
                    }
                    var R = T.child;
                    if (R !== null) R.return = T, F = R;
                    else for (; F !== null; ) {
                      T = F;
                      var C = T.sibling, D = T.return;
                      if (sc(T), T === k) {
                        F = null;
                        break;
                      }
                      if (C !== null) {
                        C.return = D, F = C;
                        break;
                      }
                      F = D;
                    }
                  }
                }
                var W = u.alternate;
                if (W !== null) {
                  var U = W.child;
                  if (U !== null) {
                    W.child = null;
                    do {
                      var je = U.sibling;
                      U.sibling = null, U = je;
                    } while (U !== null);
                  }
                }
                F = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && d !== null) d.return = u, F = d;
            else e: for (; F !== null; ) {
              if (u = F, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Dr(9, u, u.return);
              }
              var v = u.sibling;
              if (v !== null) {
                v.return = u.return, F = v;
                break e;
              }
              F = u.return;
            }
          }
          var g = e.current;
          for (F = g; F !== null; ) {
            d = F;
            var x = d.child;
            if ((d.subtreeFlags & 2064) !== 0 && x !== null) x.return = d, F = x;
            else e: for (d = g; F !== null; ) {
              if (h = F, (h.flags & 2048) !== 0) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ul(9, h);
                }
              } catch (Z) {
                ke(h, h.return, Z);
              }
              if (h === d) {
                F = null;
                break e;
              }
              var L = h.sibling;
              if (L !== null) {
                L.return = h.return, F = L;
                break e;
              }
              F = h.return;
            }
          }
          if (ee = i, qt(), Nt && typeof Nt.onPostCommitFiberRoot == "function") try {
            Nt.onPostCommitFiberRoot(nl, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        se = n, ft.transition = t;
      }
    }
    return !1;
  }
  function Sc(e, t, n) {
    t = Hn(n, t), t = Fa(e, t, 1), e = Yt(e, t, 1), t = Ue(), e !== null && (fr(e, 1, t), Ye(e, t));
  }
  function ke(e, t, n) {
    if (e.tag === 3) Sc(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Sc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Kt === null || !Kt.has(r))) {
          e = Hn(n, e), e = Xa(t, e, 1), t = Yt(t, e, 1), e = Ue(), t !== null && (fr(t, 1, e), Ye(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function C0(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Ue(), e.pingedLanes |= e.suspendedLanes & n, $e === e && (Le & n) === n && (_e === 4 || _e === 3 && (Le & 130023424) === Le && 500 > Se() - Qs ? kn(e, 0) : qs |= n), Ye(e, t);
  }
  function jc(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = ll, ll <<= 1, (ll & 130023424) === 0 && (ll = 4194304)));
    var n = Ue();
    e = Ot(e, t), e !== null && (fr(e, t, n), Ye(e, n));
  }
  function I0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), jc(e, n);
  }
  function _0(e, t) {
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
    r !== null && r.delete(t), jc(e, n);
  }
  var Ec;
  Ec = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Ve.current) qe = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return qe = !1, m0(e, t, n);
      qe = (e.flags & 131072) !== 0;
    }
    else qe = !1, ge && (t.flags & 1048576) !== 0 && ra(t, Cl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Xl(e, t), e = t.pendingProps;
        var i = Dn(t, Oe.current);
        Bn(t, n), i = Cs(null, t, r, e, i, n);
        var u = Is();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, He(r) ? (u = !0, jl(t)) : u = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, ws(t), i.updater = Dl, t.stateNode = i, i._reactInternals = t, Ls(t, r, e, n), t = As(null, t, r, !0, u, n)) : (t.tag = 0, ge && u && as(t), We(null, t, i, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Xl(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = $0(r), e = vt(r, e), i) {
            case 0:
              t = zs(null, t, r, e, n);
              break e;
            case 1:
              t = Ya(null, t, r, e, n);
              break e;
            case 11:
              t = Ba(null, t, r, e, n);
              break e;
            case 14:
              t = Va(null, t, r, vt(r.type, e), n);
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
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : vt(r, i), zs(e, t, r, i, n);
      case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : vt(r, i), Ya(e, t, r, i, n);
      case 3:
        e: {
          if (Ga(t), e === null) throw Error(s(387));
          r = t.pendingProps, u = t.memoizedState, i = u.element, fa(e, t), Pl(t, r, null, n);
          var d = t.memoizedState;
          if (r = d.element, u.isDehydrated) if (u = { element: r, isDehydrated: !1, cache: d.cache, pendingSuspenseBoundaries: d.pendingSuspenseBoundaries, transitions: d.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            i = Hn(Error(s(423)), t), t = Ka(e, t, r, n, i);
            break e;
          } else if (r !== i) {
            i = Hn(Error(s(424)), t), t = Ka(e, t, r, n, i);
            break e;
          } else for (lt = Bt(t.stateNode.containerInfo.firstChild), rt = t, ge = !0, yt = null, n = ca(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Wn(), r === i) {
              t = zt(e, t, n);
              break e;
            }
            We(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return ma(t), e === null && fs(t), r = t.type, i = t.pendingProps, u = e !== null ? e.memoizedProps : null, d = i.children, rs(r, i) ? d = null : u !== null && rs(r, u) && (t.flags |= 32), Qa(e, t), We(e, t, d, n), t.child;
      case 6:
        return e === null && fs(t), null;
      case 13:
        return Ja(e, t, n);
      case 4:
        return xs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Un(t, null, r, n) : We(e, t, r, n), t.child;
      case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : vt(r, i), Ba(e, t, r, i, n);
      case 7:
        return We(e, t, t.pendingProps, n), t.child;
      case 8:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, i = t.pendingProps, u = t.memoizedProps, d = i.value, de(Tl, r._currentValue), r._currentValue = d, u !== null) if (gt(u.value, d)) {
            if (u.children === i.children && !Ve.current) {
              t = zt(e, t, n);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var h = u.dependencies;
            if (h !== null) {
              d = u.child;
              for (var m = h.firstContext; m !== null; ) {
                if (m.context === r) {
                  if (u.tag === 1) {
                    m = bt(-1, n & -n), m.tag = 2;
                    var k = u.updateQueue;
                    if (k !== null) {
                      k = k.shared;
                      var T = k.pending;
                      T === null ? m.next = m : (m.next = T.next, T.next = m), k.pending = m;
                    }
                  }
                  u.lanes |= n, m = u.alternate, m !== null && (m.lanes |= n), ys(
                    u.return,
                    n,
                    t
                  ), h.lanes |= n;
                  break;
                }
                m = m.next;
              }
            } else if (u.tag === 10) d = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (d = u.return, d === null) throw Error(s(341));
              d.lanes |= n, h = d.alternate, h !== null && (h.lanes |= n), ys(d, n, t), d = u.sibling;
            } else d = u.child;
            if (d !== null) d.return = u;
            else for (d = u; d !== null; ) {
              if (d === t) {
                d = null;
                break;
              }
              if (u = d.sibling, u !== null) {
                u.return = d.return, d = u;
                break;
              }
              d = d.return;
            }
            u = d;
          }
          We(e, t, i.children, n), t = t.child;
        }
        return t;
      case 9:
        return i = t.type, r = t.pendingProps.children, Bn(t, n), i = ct(i), r = r(i), t.flags |= 1, We(e, t, r, n), t.child;
      case 14:
        return r = t.type, i = vt(r, t.pendingProps), i = vt(r.type, i), Va(e, t, r, i, n);
      case 15:
        return Ha(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : vt(r, i), Xl(e, t), t.tag = 1, He(r) ? (e = !0, jl(t)) : e = !1, Bn(t, n), Ma(t, r, i), Ls(t, r, i, n), As(null, t, r, !0, e, n);
      case 19:
        return tc(e, t, n);
      case 22:
        return qa(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Nc(e, t) {
    return lu(e, t);
  }
  function T0(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function pt(e, t, n, r) {
    return new T0(e, t, n, r);
  }
  function ro(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function $0(e) {
    if (typeof e == "function") return ro(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Xe) return 11;
      if (e === Et) return 14;
    }
    return 2;
  }
  function nn(e, t) {
    var n = e.alternate;
    return n === null ? (n = pt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Kl(e, t, n, r, i, u) {
    var d = 2;
    if (r = e, typeof e == "function") ro(e) && (d = 1);
    else if (typeof e == "string") d = 5;
    else e: switch (e) {
      case ae:
        return jn(n.children, i, u, t);
      case ue:
        d = 8, i |= 8;
        break;
      case Ne:
        return e = pt(12, n, t, i | 2), e.elementType = Ne, e.lanes = u, e;
      case et:
        return e = pt(13, n, t, i), e.elementType = et, e.lanes = u, e;
      case ht:
        return e = pt(19, n, t, i), e.elementType = ht, e.lanes = u, e;
      case xe:
        return Jl(n, i, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Fe:
            d = 10;
            break e;
          case Je:
            d = 9;
            break e;
          case Xe:
            d = 11;
            break e;
          case Et:
            d = 14;
            break e;
          case Be:
            d = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = pt(d, n, t, i), t.elementType = e, t.type = r, t.lanes = u, t;
  }
  function jn(e, t, n, r) {
    return e = pt(7, e, r, t), e.lanes = n, e;
  }
  function Jl(e, t, n, r) {
    return e = pt(22, e, r, t), e.elementType = xe, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function lo(e, t, n) {
    return e = pt(6, e, null, t), e.lanes = n, e;
  }
  function io(e, t, n) {
    return t = pt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function R0(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Pi(0), this.expirationTimes = Pi(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pi(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
  }
  function so(e, t, n, r, i, u, d, h, m) {
    return e = new R0(e, t, n, h, m), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = pt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ws(u), e;
  }
  function P0(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: oe, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Cc(e) {
    if (!e) return Ht;
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
            if (He(t.type)) {
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
      if (He(n)) return ea(e, n, t);
    }
    return t;
  }
  function Ic(e, t, n, r, i, u, d, h, m) {
    return e = so(n, r, !0, e, i, u, d, h, m), e.context = Cc(null), n = e.current, r = Ue(), i = en(n), u = bt(r, i), u.callback = t ?? null, Yt(n, u, i), e.current.lanes = i, fr(e, i, r), Ye(e, r), e;
  }
  function ei(e, t, n, r) {
    var i = t.current, u = Ue(), d = en(i);
    return n = Cc(n), t.context === null ? t.context = n : t.pendingContext = n, t = bt(u, d), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Yt(i, t, d), e !== null && (kt(e, i, d, u), Rl(e, i, d)), d;
  }
  function ti(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function _c(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function oo(e, t) {
    _c(e, t), (e = e.alternate) && _c(e, t);
  }
  function L0() {
    return null;
  }
  var Tc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function uo(e) {
    this._internalRoot = e;
  }
  ni.prototype.render = uo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    ei(e, t, null, null);
  }, ni.prototype.unmount = uo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      xn(function() {
        ei(null, e, null, null);
      }), t[$t] = null;
    }
  };
  function ni(e) {
    this._internalRoot = e;
  }
  ni.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = fu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Wt.length && t !== 0 && t < Wt[n].priority; n++) ;
      Wt.splice(n, 0, e), n === 0 && mu(e);
    }
  };
  function ao(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function ri(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function $c() {
  }
  function O0(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var u = r;
        r = function() {
          var k = ti(d);
          u.call(k);
        };
      }
      var d = Ic(t, r, e, 0, null, !1, !1, "", $c);
      return e._reactRootContainer = d, e[$t] = d.current, Cr(e.nodeType === 8 ? e.parentNode : e), xn(), d;
    }
    for (; i = e.lastChild; ) e.removeChild(i);
    if (typeof r == "function") {
      var h = r;
      r = function() {
        var k = ti(m);
        h.call(k);
      };
    }
    var m = so(e, 0, !1, null, null, !1, !1, "", $c);
    return e._reactRootContainer = m, e[$t] = m.current, Cr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
      ei(t, m, n, r);
    }), m;
  }
  function li(e, t, n, r, i) {
    var u = n._reactRootContainer;
    if (u) {
      var d = u;
      if (typeof i == "function") {
        var h = i;
        i = function() {
          var m = ti(d);
          h.call(m);
        };
      }
      ei(t, d, e, i);
    } else d = O0(n, t, e, i, r);
    return ti(d);
  }
  cu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = dr(t.pendingLanes);
          n !== 0 && (Li(t, n | 1), Ye(t, Se()), (ee & 6) === 0 && (Yn = Se() + 500, qt()));
        }
        break;
      case 13:
        xn(function() {
          var r = Ot(e, 1);
          if (r !== null) {
            var i = Ue();
            kt(r, e, 1, i);
          }
        }), oo(e, 1);
    }
  }, Oi = function(e) {
    if (e.tag === 13) {
      var t = Ot(e, 134217728);
      if (t !== null) {
        var n = Ue();
        kt(t, e, 134217728, n);
      }
      oo(e, 134217728);
    }
  }, du = function(e) {
    if (e.tag === 13) {
      var t = en(e), n = Ot(e, t);
      if (n !== null) {
        var r = Ue();
        kt(n, e, t, r);
      }
      oo(e, t);
    }
  }, fu = function() {
    return se;
  }, pu = function(e, t) {
    var n = se;
    try {
      return se = e, t();
    } finally {
      se = n;
    }
  }, Ci = function(e, t, n) {
    switch (t) {
      case "input":
        if (vi(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = kl(r);
              if (!i) throw Error(s(90));
              Ao(r), vi(r, i);
            }
          }
        }
        break;
      case "textarea":
        Wo(e, n);
        break;
      case "select":
        t = n.value, t != null && In(e, !!n.multiple, t, !1);
    }
  }, Go = eo, Ko = xn;
  var b0 = { usingClientEntryPoint: !1, Events: [Tr, An, kl, Qo, Yo, eo] }, Ur = { findFiberByHostInstance: fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, z0 = { bundleType: Ur.bundleType, version: Ur.version, rendererPackageName: Ur.rendererPackageName, rendererConfig: Ur.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ee.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = nu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Ur.findFiberByHostInstance || L0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ii = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ii.isDisabled && ii.supportsFiber) try {
      nl = ii.inject(z0), Nt = ii;
    } catch {
    }
  }
  return Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b0, Ge.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ao(t)) throw Error(s(200));
    return P0(e, t, null, n);
  }, Ge.createRoot = function(e, t) {
    if (!ao(e)) throw Error(s(299));
    var n = !1, r = "", i = Tc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = so(e, 1, !1, null, null, n, !1, r, i), e[$t] = t.current, Cr(e.nodeType === 8 ? e.parentNode : e), new uo(t);
  }, Ge.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = nu(t), e = e === null ? null : e.stateNode, e;
  }, Ge.flushSync = function(e) {
    return xn(e);
  }, Ge.hydrate = function(e, t, n) {
    if (!ri(t)) throw Error(s(200));
    return li(null, e, t, !0, n);
  }, Ge.hydrateRoot = function(e, t, n) {
    if (!ao(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, i = !1, u = "", d = Tc;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (d = n.onRecoverableError)), t = Ic(t, null, e, 1, n ?? null, i, !1, u, d), e[$t] = t.current, Cr(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
      n,
      i
    );
    return new ni(t);
  }, Ge.render = function(e, t, n) {
    if (!ri(t)) throw Error(s(200));
    return li(null, e, t, !1, n);
  }, Ge.unmountComponentAtNode = function(e) {
    if (!ri(e)) throw Error(s(40));
    return e._reactRootContainer ? (xn(function() {
      li(null, null, e, !1, function() {
        e._reactRootContainer = null, e[$t] = null;
      });
    }), !0) : !1;
  }, Ge.unstable_batchedUpdates = eo, Ge.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!ri(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return li(e, t, n, !1, r);
  }, Ge.version = "18.3.1-next-f1338f8080-20240426", Ge;
}
var Mc;
function hd() {
  if (Mc) return po.exports;
  Mc = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (o) {
        console.error(o);
      }
  }
  return l(), po.exports = U0(), po.exports;
}
var Dc;
function Z0() {
  if (Dc) return si;
  Dc = 1;
  var l = hd();
  return si.createRoot = l.createRoot, si.hydrateRoot = l.hydrateRoot, si;
}
var B0 = Z0();
function V0(l) {
  return l !== "I";
}
const wo = 1, md = /* @__PURE__ */ JSON.parse(`[{"allowed":["X"],"briefing":"Welcome to dispatch. Three city blocks stand in a row with two alarm stations between them. Our arsonist, Noise, only lights red fires here (X errors). A station rings when exactly one of its two blocks is burning. Read the alarms, then send one red crew.","budget":1,"challenge":{"circuit":[],"error":"IXI"},"code":"rep3","debrief":{"detectable":"At least one station is still ringing: either the original fire is still burning, or a crew lit a new one on a safe block. Replay the original alarms: both stations rang, and block 1 is the only block they share.","logical-error":"Every alarm is quiet, yet the pattern left behind is a full logical flip (XXX). A crew sent to a safe block starts a fire of its own, so silence alone never proves safety. Compare your dispatch with the alarms in the replay.","success":"Both stations rang, and block 1 is the only block they share. Your red crew met the fire head on, and two red flames cancel (X·X = I). The logical qubit is safe."},"expected":{"minWeightCorrection":"IXI","minWeightVerdict":"success","propagated":"IXI","syndrome":[1,1]},"id":"first-alarm","index":1,"kind":"dispatch","title":"First Alarm","training":[{"caption":"A red fire (X) on block 0. Station Z0 watches blocks 0 and 1, sees exactly one fire, and rings. Station Z1 watches blocks 1 and 2, sees none, and stays quiet.","circuit":[],"error":"XII"}]},{"allowed":["X","Z","Y"],"briefing":"Fires never spread on their own; gates carry them. A CNOT copies a red fire (X) from its control to its target, and copies a blue fire (Z) from its target back to its control. Watch the training runs, then predict where the fires end up and send crews there.","budget":2,"challenge":{"circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XZ"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"There are no alarm stations on bare wires, so any fire you missed, or lit by mistake, acts directly on the data. Check both colours on each block: a Y fire needs both a red and a blue component to put it out.","success":"Red went forward and blue went backward at the same time, so XZ became YY: a red-and-blue fire on both blocks. Your crews matched every component, and nothing remains."},"expected":{"minWeightCorrection":"YY","minWeightVerdict":"success","propagated":"YY","syndrome":[]},"id":"red-forward-blue-backward","index":2,"kind":"propagation","title":"Red Forward / Blue Backward","training":[{"caption":"Red forward: a red fire (X) on the control copies onto the target. XI becomes XX.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XI"},{"caption":"Blue backward: a blue fire (Z) on the target copies onto the control. IZ becomes ZZ.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"IZ"}]},{"allowed":["X","Z","Y"],"briefing":"A Hadamard gate swaps colours: red becomes blue and blue becomes red, on its own wire only. Combined with a CNOT, a single fire can change colour, copy itself, and change colour again. Follow the circuit one gate at a time.","budget":2,"challenge":{"circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1},{"kind":"H","q":1}],"error":"ZI"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"One of the fires ended up with a different colour, or on a different block, than you dispatched for. Replay the circuit: H swaps colours only on its own wire, and CNOT copies red forward and blue backward.","success":"ZI turned into XI at the first Hadamard, copied forward to XX through the CNOT, and the final Hadamard on block 1 turned that copy blue: XZ. You traced the whole path."},"expected":{"minWeightCorrection":"XZ","minWeightVerdict":"success","propagated":"XZ","syndrome":[]},"id":"color-switch","index":3,"kind":"propagation","title":"Color Switch","training":[{"caption":"Colour switch: a Hadamard turns the red fire (X) on block 0 into a blue one (Z). XI becomes ZI.","circuit":[{"kind":"H","q":0}],"error":"XI"},{"caption":"Blue turns red at the H, then red copies forward through the CNOT. ZI becomes XX.","circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1}],"error":"ZI"}]},{"allowed":["X","Z"],"briefing":"Welcome to the surface code district: nine blocks and eight alarm stations. Red stations (Z checks, diamonds) notice red fires; blue stations (X checks, squares) notice blue fires. This time the fire is hidden. Read the alarms and send one crew.","budget":1,"challenge":{"circuit":[],"error":"IIIIXIIII"},"code":"rsc3","debrief":{"detectable":"Alarms are still ringing. A red crew on a block that was not burning starts a new fire, and a blue crew cannot put out a red fire at all. Match the crew colour to the station type, then find the block that every ringing station shares.","logical-error":"The alarms went quiet, but the pattern left behind acts as a logical operator on the encoded qubit. With one hidden fire and one crew this cannot happen in this district; Silent Failure shows when it does.","success":"Stations Z0 and Z1 both rang, and block 4 is the only block they share. One red crew, fire out, logical qubit safe."},"expected":{"minWeightCorrection":"IIIIXIIII","minWeightVerdict":"success","propagated":"IIIIXIIII","syndrome":[1,1,0,0,0,0,0,0]},"id":"blind-dispatch","index":4,"kind":"dispatch","title":"Blind Dispatch","training":[{"caption":"A red fire (X) on block 0 rings only station Z0, which watches blocks 0, 1, 3 and 4. A fire on block 3 alone would ring exactly the same station, so a crew sent to block 3 is just as good a fix: the two dispatches differ by a stabilizer (the X2 station's own pattern), which the code does not care about.","circuit":[],"error":"XIIIIIIII"}]},{"allowed":["X","Z"],"briefing":"Two fires this time, and they may be different colours. Red stations only ever notice red fires and blue stations only blue ones, so read the two alarm maps separately. You have two crews of any colour, and each block takes at most one crew.","budget":2,"challenge":{"circuit":[],"error":"IXIIIIIZI"},"code":"rsc3","debrief":{"detectable":"Some stations are still ringing. Remember that a red station never sees a blue fire: solve the red alarms and the blue alarms as two separate puzzles, one crew colour each.","logical-error":"Every alarm is quiet but the leftover pattern is a logical operator: your crews and the fires together form a chain across the district instead of cancelling. The replay shows where the chain runs.","success":"Red stations Z0 and Z2 share only block 1. Blue station X1 rang alone, which points at its boundary pair, blocks 6 and 7; a blue crew on either one works, because the two choices differ by a stabilizer. Two colours, two fires, both out."},"expected":{"minWeightCorrection":"IXIIIIZII","minWeightVerdict":"success","propagated":"IXIIIIIZI","syndrome":[1,0,1,0,0,1,0,0]},"id":"two-kinds-of-trouble","index":5,"kind":"dispatch","title":"Two Kinds of Trouble","training":[]},{"allowed":["X","Z"],"briefing":"Only one alarm is ringing: station Z0. Dispatch protocol is simple: send the smallest crew that silences every station. Make the call, and then we will look at what really happened.","budget":2,"challenge":{"circuit":[],"error":"IXXIIIIII"},"code":"rsc3","debrief":{"detectable":"Stations are still ringing, so the smallest silencing crew was not sent. Protocol for a lone Z0 alarm is one red crew on block 0 or block 3 (equivalent choices); replay the alarms and compare.","logical-error":"That was the optimal call. Only Z0 rang, and the best explanation of one alarm is one fire, on block 0 or block 3 (the two differ by a stabilizer, so either crew is the same call). But Noise lit two fires, on blocks 1 and 2. Your crew plus those two fires form a red chain across the top of the district — X on blocks 0, 1, 2 or the equivalent chain through block 3 — a logical X, which every station sees as an even count and so cannot detect. This code has distance 3: any single fire is always fixed, but two fires can fool any dispatcher, because no alarm pattern justified sending crews to blocks 1 and 2. That is why real machines use bigger codes.","success":"You put out both fires, on blocks 1 and 2. Honest question: how did you know? The alarms were identical to a single fire on block 0 or block 3, so this was a guess that happened to land. Protocol would still send one crew to block 0 or block 3, and this mission awards one star at most: the alarms alone cannot win it."},"expected":{"minWeightCorrection":"XIIIIIIII","minWeightVerdict":"logical-error","propagated":"IXXIIIIII","syndrome":[1,0,0,0,0,0,0,0]},"id":"silent-failure","index":6,"kind":"dispatch","maxStars":1,"title":"Silent Failure","training":[]}]`), H0 = ["I", "X", "Z", "Y"], ci = 30;
function q0(l) {
  if (!Number.isInteger(l) || l < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(l)}`);
}
function pi(l, o) {
  if (!Number.isInteger(l) || l < 0 || l >= o) throw new RangeError(`qubit index ${String(l)} out of range for n=${String(o)}`);
}
function gd(l) {
  return l === "I" || l === "X" || l === "Y" || l === "Z";
}
function No(l) {
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
function yd(l, o) {
  return H0[l & 1 | (o & 1) << 1] ?? "I";
}
function hi(l) {
  return q0(l), { n: l, x: new Uint8Array(l), z: new Uint8Array(l) };
}
function jt(l) {
  const o = l.length, s = new Uint8Array(o), a = new Uint8Array(o);
  for (let f = 0; f < o; f++) {
    const p = l[f] ?? "";
    if (!gd(p)) throw new Error(`invalid Pauli letter '${p}' at position ${String(f)} in "${l}"`);
    const w = No(p);
    s[f] = w.x, a[f] = w.z;
  }
  return { n: o, x: s, z: a };
}
function he(l) {
  let o = "";
  for (let s = 0; s < l.n; s++) o += yd(l.x[s] ?? 0, l.z[s] ?? 0);
  return o;
}
function mi(l) {
  return { n: l.n, x: new Uint8Array(l.x), z: new Uint8Array(l.z) };
}
function Q0(l) {
  for (let o = 0; o < l.n; o++) if ((l.x[o] ?? 0) !== 0 || (l.z[o] ?? 0) !== 0) return !1;
  return !0;
}
function Co(l, o) {
  if (l.n !== o.n) throw new RangeError(`cannot multiply Paulis on ${String(l.n)} and ${String(o.n)} qubits`);
  const s = new Uint8Array(l.n), a = new Uint8Array(l.n);
  for (let f = 0; f < l.n; f++)
    s[f] = (l.x[f] ?? 0) ^ (o.x[f] ?? 0), a[f] = (l.z[f] ?? 0) ^ (o.z[f] ?? 0);
  return { n: l.n, x: s, z: a };
}
function st(l) {
  let o = 0;
  for (let s = 0; s < l.n; s++) ((l.x[s] ?? 0) | (l.z[s] ?? 0)) !== 0 && o++;
  return o;
}
function Vr(l) {
  const o = [];
  for (let s = 0; s < l.n; s++) ((l.x[s] ?? 0) | (l.z[s] ?? 0)) !== 0 && o.push(s);
  return o;
}
function vd(l, o) {
  if (l.n !== o.n) throw new RangeError(`cannot compare Paulis on ${String(l.n)} and ${String(o.n)} qubits`);
  let s = 0;
  for (let a = 0; a < l.n; a++)
    s ^= (l.x[a] ?? 0) & (o.z[a] ?? 0) ^ (l.z[a] ?? 0) & (o.x[a] ?? 0);
  return s & 1;
}
function Fc(l, o) {
  return vd(l, o) === 1;
}
function qr(l, o) {
  return pi(o, l.n), yd(l.x[o] ?? 0, l.z[o] ?? 0);
}
function Y0(l, o, s) {
  pi(o, l.n);
  const a = mi(l), f = No(s);
  return a.x[o] = f.x, a.z[o] = f.z, a;
}
function G0(l, o, s) {
  const a = hi(l), f = /* @__PURE__ */ new Set(), p = No(o);
  for (const w of s) {
    if (pi(w, l), f.has(w)) throw new RangeError(`duplicate qubit ${String(w)} in support`);
    f.add(w), a.x[w] = p.x, a.z[w] = p.z;
  }
  return a;
}
function Xc(l) {
  if (l.n > ci) throw new RangeError(`masks support at most ${String(ci)} qubits`);
  let o = 0, s = 0;
  for (let a = 0; a < l.n; a++)
    (l.x[a] ?? 0) !== 0 && (o |= 1 << a), (l.z[a] ?? 0) !== 0 && (s |= 1 << a);
  return { x: o, z: s };
}
function K0(l, o, s) {
  if (l > ci) throw new RangeError(`masks support at most ${String(ci)} qubits`);
  const a = hi(l);
  for (let f = 0; f < l; f++)
    a.x[f] = o >>> f & 1, a.z[f] = s >>> f & 1;
  return a;
}
function wd(l) {
  const o = new Uint8Array(2 * l.n);
  return o.set(l.x, 0), o.set(l.z, l.n), o;
}
function J0(l) {
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
function xd(l, o) {
  const s = J0(l);
  for (const a of s) pi(a, o);
  if (s.length === 2 && s[0] === s[1])
    throw new RangeError(`${l.kind} needs two distinct qubits, got ${String(s[0])} twice`);
}
function xo(l, o) {
  for (const s of l) xd(s, o);
}
function ep(l, o) {
  xd(o, l.n);
  const s = mi(l), { x: a, z: f } = s;
  switch (o.kind) {
    case "H": {
      const p = o.q, w = a[p] ?? 0;
      a[p] = f[p] ?? 0, f[p] = w;
      break;
    }
    case "S": {
      const p = o.q;
      f[p] = (f[p] ?? 0) ^ (a[p] ?? 0);
      break;
    }
    case "CNOT": {
      const { c: p, t: w } = o;
      a[w] = (a[w] ?? 0) ^ (a[p] ?? 0), f[p] = (f[p] ?? 0) ^ (f[w] ?? 0);
      break;
    }
    case "CZ": {
      const { a: p, b: w } = o, E = a[p] ?? 0, S = a[w] ?? 0;
      f[p] = (f[p] ?? 0) ^ S, f[w] = (f[w] ?? 0) ^ E;
      break;
    }
    case "SWAP": {
      const { a: p, b: w } = o, E = a[p] ?? 0, S = f[p] ?? 0;
      a[p] = a[w] ?? 0, f[p] = f[w] ?? 0, a[w] = E, f[w] = S;
      break;
    }
  }
  return s;
}
function Io(l, o) {
  xo(o, l.n);
  const s = [mi(l)];
  let a = l;
  for (const f of o)
    a = ep(a, f), s.push(a);
  return { frames: s };
}
function tp(l, o) {
  const s = Io(l, o);
  return s.frames[s.frames.length - 1] ?? mi(l);
}
function np(l, o) {
  for (const s of l)
    if (s.length !== o) throw new RangeError(`GF(2) row width mismatch: ${String(s.length)} vs ${String(o)}`);
}
function kd(l, o) {
  for (let s = 0; s < l.length; s++) l[s] = ((l[s] ?? 0) ^ (o[s] ?? 0)) & 1;
}
function Sd(l, o) {
  const s = o ?? l[0]?.length ?? 0;
  np(l, s);
  const a = l.map((E) => Uint8Array.from(E, (S) => S & 1)), f = [], p = [];
  let w = 0;
  for (let E = 0; E < s && w < a.length; E++) {
    let S = -1;
    for (let $ = w; $ < a.length; $++)
      if ((a[$]?.[E] ?? 0) === 1) {
        S = $;
        break;
      }
    if (S === -1) continue;
    const I = a[S], P = a[w];
    if (!(I === void 0 || P === void 0)) {
      a[S] = P, a[w] = I;
      for (let $ = 0; $ < a.length; $++) {
        const j = a[$];
        $ !== w && j !== void 0 && (j[E] ?? 0) === 1 && kd(j, I);
      }
      f.push(E), p.push(I), w++;
    }
  }
  return { rows: p, pivots: f, width: s };
}
function rp(l, o) {
  if (o.length !== l.width) throw new RangeError(`vector width ${String(o.length)} does not match basis width ${String(l.width)}`);
  const s = Uint8Array.from(o, (a) => a & 1);
  for (let a = 0; a < l.rows.length; a++) {
    const f = l.pivots[a], p = l.rows[a];
    f === void 0 || p === void 0 || (s[f] ?? 0) === 1 && kd(s, p);
  }
  return s;
}
function lp(l) {
  for (let o = 0; o < l.length; o++) if ((l[o] ?? 0) !== 0) return !1;
  return !0;
}
function ip(l) {
  return !Array.isArray(l) && "pivots" in l;
}
function sp(l, o) {
  const s = ip(l) ? l : Sd(l, o.length);
  return lp(rp(s, o));
}
const op = { name: "Distance-3 rotated surface code", n: 9, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1, 3, 4] }, { id: "Z1", type: "Z", qubits: [4, 5, 7, 8] }, { id: "Z2", type: "Z", qubits: [1, 2] }, { id: "Z3", type: "Z", qubits: [6, 7] }, { id: "X0", type: "X", qubits: [1, 2, 4, 5] }, { id: "X1", type: "X", qubits: [3, 4, 6, 7] }, { id: "X2", type: "X", qubits: [0, 3] }, { id: "X3", type: "X", qubits: [5, 8] }], logicalX: ["XXXIIIIII"], logicalZ: ["ZIIZIIZII"], layout: { kind: "grid", rows: 3, cols: 3, checkPositions: { Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 }, X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 } } }, noiseNote: "X, Z and Y errors; perfect syndrome" }, up = { name: "Three-qubit repetition code", n: 3, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1] }, { id: "Z1", type: "Z", qubits: [1, 2] }], logicalX: ["XXX"], logicalZ: ["ZII"], layout: { kind: "line", checkPositions: { Z0: { row: 0, col: 0.5 }, Z1: { row: 0, col: 1.5 } } }, noiseNote: "X noise only (a single Z is undetectable: distance 1 against Z)" }, ap = { name: "Two bare qubits (no code)", n: 2, k: 2, distance: 1, checks: [], logicalX: ["XI", "IX"], logicalZ: ["ZI", "IZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, cp = { name: "Three bare qubits (no code)", n: 3, k: 3, distance: 1, checks: [], logicalX: ["XII", "IXI", "IIX"], logicalZ: ["ZII", "IZI", "IIZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, dp = {
  rsc3: op,
  rep3: up,
  trivial2: ap,
  trivial3: cp
}, jd = ["trivial2", "trivial3", "rep3", "rsc3"];
function fp(l) {
  return jd.includes(l);
}
function nr(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function un(l, o) {
  if (typeof l != "number" || !Number.isFinite(l)) throw new Error(`codes.json: ${o} must be a number`);
  return l;
}
function rr(l, o) {
  if (typeof l != "string") throw new Error(`codes.json: ${o} must be a string`);
  return l;
}
function Wc(l, o) {
  if (!Array.isArray(l)) throw new Error(`codes.json: ${o} must be an array`);
  return l.map((s, a) => rr(s, `${o}[${String(a)}]`));
}
function pp(l, o) {
  if (!nr(l)) throw new Error(`codes.json: ${o} must be an object`);
  const s = rr(l.type, `${o}.type`);
  if (s !== "X" && s !== "Z") throw new Error(`codes.json: ${o}.type must be X or Z`);
  if (!Array.isArray(l.qubits)) throw new Error(`codes.json: ${o}.qubits must be an array`);
  const a = l.qubits.map((f, p) => un(f, `${o}.qubits[${String(p)}]`));
  return { id: rr(l.id, `${o}.id`), type: s, qubits: a };
}
function hp(l, o) {
  if (!nr(o)) throw new Error(`codes.json: ${l} must be an object`);
  if (!Array.isArray(o.checks)) throw new Error(`codes.json: ${l}.checks must be an array`);
  return {
    name: rr(o.name, `${l}.name`),
    n: un(o.n, `${l}.n`),
    k: un(o.k, `${l}.k`),
    distance: un(o.distance, `${l}.distance`),
    checks: o.checks.map((s, a) => pp(s, `${l}.checks[${String(a)}]`)),
    logicalX: Wc(o.logicalX, `${l}.logicalX`),
    logicalZ: Wc(o.logicalZ, `${l}.logicalZ`),
    layout: o.layout,
    noiseNote: rr(o.noiseNote, `${l}.noiseNote`)
  };
}
function Uc(l, o) {
  if (!nr(l)) throw new Error(`codes.json: ${o} must be an object`);
  const s = {};
  for (const [a, f] of Object.entries(l)) {
    if (!nr(f)) throw new Error(`codes.json: ${o}.${a} must be an object`);
    s[a] = { row: un(f.row, `${o}.${a}.row`), col: un(f.col, `${o}.${a}.col`) };
  }
  return s;
}
function mp(l, o) {
  const s = o.layout;
  if (!nr(s)) throw new Error(`codes.json: ${l}.layout must be an object`);
  const a = rr(s.kind, `${l}.layout.kind`);
  switch (a) {
    case "grid": {
      const f = un(s.rows, `${l}.layout.rows`), p = un(s.cols, `${l}.layout.cols`);
      if (f * p !== o.n) throw new Error(`codes.json: ${l}.layout grid size does not match n`);
      const w = [];
      for (let S = 0; S < o.n; S++) w.push({ q: S, row: Math.floor(S / p), col: S % p });
      const E = Uc(s.checkPositions, `${l}.layout.checkPositions`);
      for (const S of o.checks)
        if (!(S.id in E)) throw new Error(`codes.json: ${l}.layout has no position for check ${S.id}`);
      return { kind: "grid", rows: f, cols: p, blocks: w, checkPositions: E };
    }
    case "line": {
      const f = [];
      for (let w = 0; w < o.n; w++) f.push({ q: w, row: 0, col: w });
      const p = Uc(s.checkPositions, `${l}.layout.checkPositions`);
      for (const w of o.checks)
        if (!(w.id in p)) throw new Error(`codes.json: ${l}.layout has no position for check ${w.id}`);
      return { kind: "line", blocks: f, checkPositions: p };
    }
    case "wires":
      return { kind: "wires", wires: o.n };
    default:
      throw new Error(`codes.json: ${l}.layout.kind '${a}' is unknown`);
  }
}
function gp(l, o) {
  const s = o.n, a = o.checks.map((S) => {
    const I = [...S.qubits].sort((P, $) => P - $);
    return { id: S.id, type: S.type, qubits: I, pauli: G0(s, S.type, I) };
  });
  if (new Set(a.map((S) => S.id)).size !== a.length) throw new Error(`codes.json: ${l} has duplicate check ids`);
  const p = (S, I) => {
    if (I.length !== s) throw new Error(`codes.json: ${l} logical ${S} "${I}" has wrong length`);
    return { label: S, pauli: jt(I) };
  }, w = o.logicalX.map((S) => p("X", S)), E = o.logicalZ.map((S) => p("Z", S));
  if (w.length !== o.k || E.length !== o.k) throw new Error(`codes.json: ${l} needs k logical X and k logical Z`);
  return { id: l, name: o.name, n: s, k: o.k, distance: o.distance, checks: a, logicalX: w, logicalZ: E, noiseNote: o.noiseNote };
}
const _o = /* @__PURE__ */ new Map();
{
  const l = dp;
  if (!nr(l)) throw new Error("codes.json: root must be an object");
  for (const o of jd) {
    if (!(o in l)) throw new Error(`codes.json: missing code '${o}'`);
    _o.set(o, hp(o, l[o]));
  }
}
const Zc = /* @__PURE__ */ new Map(), Bc = /* @__PURE__ */ new Map(), Vc = /* @__PURE__ */ new Map();
function Ze(l) {
  let o = Zc.get(l);
  if (o === void 0) {
    const s = _o.get(l);
    if (s === void 0) throw new Error(`unknown code '${l}'`);
    o = gp(l, s), Zc.set(l, o);
  }
  return o;
}
function To(l) {
  let o = Bc.get(l);
  if (o === void 0) {
    const s = _o.get(l);
    if (s === void 0) throw new Error(`unknown code '${l}'`);
    o = mp(l, s), Bc.set(l, o);
  }
  return o;
}
function yp(l) {
  return l.checks.map((o) => wd(o.pauli));
}
function vp(l) {
  let o = Vc.get(l.id);
  return o === void 0 && (o = Sd(yp(l), 2 * l.n), Vc.set(l.id, o)), o;
}
function lr(l, o) {
  if (o.n !== l.n) throw new RangeError(`Pauli on ${String(o.n)} qubits does not fit code ${l.id} (n=${String(l.n)})`);
  const s = new Uint8Array(l.checks.length);
  return l.checks.forEach((a, f) => {
    s[f] = vd(a.pauli, o);
  }), s;
}
function wp(l) {
  for (let o = 0; o < l.length; o++) if ((l[o] ?? 0) !== 0) return !1;
  return !0;
}
function Hc(l) {
  let o = "";
  for (let s = 0; s < l.length; s++) o += (l[s] ?? 0) === 0 ? "0" : "1";
  return o;
}
function an(l) {
  return Array.from(l, (o) => o === 0 ? 0 : 1);
}
function xp(l) {
  return Uint8Array.from(l, (o) => o === 0 ? 0 : 1);
}
function Ed(l, o) {
  const s = [];
  return l.checks.forEach((a, f) => {
    (o[f] ?? 0) !== 0 && s.push(a.id);
  }), s;
}
function kp(l, o) {
  return Co(l, o);
}
function Nd(l, o) {
  if (o.n !== l.n) throw new RangeError(`Pauli on ${String(o.n)} qubits does not fit code ${l.id}`);
  return l.checks.length === 0 ? Q0(o) : sp(vp(l), wd(o));
}
function Sp(l, o) {
  return {
    x: l.logicalZ.map((s) => Fc(o, s.pauli)),
    z: l.logicalX.map((s) => Fc(o, s.pauli))
  };
}
function jp(l, o) {
  const s = lr(l, o), a = Sp(l, o);
  let f;
  return wp(s) ? Nd(l, o) ? f = "success" : f = "logical-error" : f = "detectable", { kind: f, residual: o, syndrome: s, logicalFlip: a, weight: st(o) };
}
function qc(l, o, s) {
  return jp(l, kp(s, o));
}
const Qc = 10, Yc = /* @__PURE__ */ new Map();
function Ep(l) {
  const o = 1 << l, s = new Uint8Array(o);
  for (let a = 1; a < o; a++) s[a] = (s[a >> 1] ?? 0) ^ a & 1;
  return s;
}
function Np(l) {
  const o = 1 << l, s = new Uint8Array(o);
  for (let a = 1; a < o; a++) s[a] = (s[a >> 1] ?? 0) + (a & 1);
  return s;
}
function Cp(l) {
  const o = l.n;
  if (o > Qc) throw new RangeError(`lookup decoder supports at most ${String(Qc)} qubits`);
  const s = l.checks.map((S) => Xc(S.pauli).x), a = l.checks.map((S) => Xc(S.pauli).z), f = Ep(o), p = Np(o), w = /* @__PURE__ */ new Map(), E = 4 ** o;
  for (let S = 0; S < E; S++) {
    let I = 0, P = 0, $ = S;
    for (let z = 0; z < o; z++) {
      const O = $ & 3;
      $ >>= 2, (O & 1) !== 0 && (I |= 1 << z), (O & 2) !== 0 && (P |= 1 << z);
    }
    const j = p[I | P] ?? 0, N = (p[I] ?? 0) + (p[P] ?? 0);
    let M = "";
    for (let z = 0; z < s.length; z++)
      M += (f[I & (a[z] ?? 0) ^ P & (s[z] ?? 0)] ?? 0) === 0 ? "0" : "1";
    const b = w.get(M);
    b === void 0 || j < b.weight || j === b.weight && N < b.symplecticWeight ? w.set(M, { weight: j, symplecticWeight: N, candidates: [S] }) : j === b.weight && N === b.symplecticWeight && b.candidates.push(S);
  }
  return { n: o, entries: w };
}
function Cd(l) {
  let o = Yc.get(l.id);
  return o === void 0 && (o = Cp(l), Yc.set(l.id, o)), o;
}
function Ip(l, o) {
  let s = 0, a = 0, f = o;
  for (let p = 0; p < l; p++) {
    const w = f & 3;
    f >>= 2, (w & 1) !== 0 && (s |= 1 << p), (w & 2) !== 0 && (a |= 1 << p);
  }
  return K0(l, s, a);
}
function _p(l, o) {
  if (o.length !== l.checks.length)
    throw new RangeError(`syndrome has ${String(o.length)} bits but code ${l.id} has ${String(l.checks.length)} checks`);
  const s = Cd(l).entries.get(Hc(o));
  if (s === void 0) throw new Error(`syndrome ${Hc(o)} is not produced by any Pauli on code ${l.id}`);
  return s;
}
function Tp(l) {
  const o = Cd(l);
  return {
    name: `min-weight lookup (${l.id})`,
    decode(s) {
      const f = _p(l, s).candidates[0];
      return f === void 0 ? hi(o.n) : Ip(o.n, f);
    }
  };
}
function $o(l, o, s) {
  return Nd(l, Co(o, s));
}
const $p = ["success", "logical-error", "detectable"];
function tr(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function De(l, o) {
  if (typeof l != "string") throw new Error(`missions.json: ${o} must be a string`);
  return l;
}
function ln(l, o) {
  if (typeof l != "number" || !Number.isInteger(l)) throw new Error(`missions.json: ${o} must be an integer`);
  return l;
}
function Rp(l, o = "gate") {
  if (!tr(l)) throw new Error(`${o} must be an object`);
  const s = De(l.kind, `${o}.kind`);
  switch (s) {
    case "H":
    case "S":
      return { kind: s, q: ln(l.q, `${o}.q`) };
    case "CNOT":
      return { kind: s, c: ln(l.c, `${o}.c`), t: ln(l.t, `${o}.t`) };
    case "CZ":
    case "SWAP":
      return { kind: s, a: ln(l.a, `${o}.a`), b: ln(l.b, `${o}.b`) };
    default:
      throw new Error(`${o}.kind '${s}' is not a supported gate`);
  }
}
function Gc(l, o = "circuit") {
  if (!Array.isArray(l)) throw new Error(`${o} must be an array`);
  return l.map((s, a) => Rp(s, `${o}[${String(a)}]`));
}
function Pp(l, o) {
  if (!tr(l)) throw new Error(`missions.json: ${o} must be an object`);
  if (!Array.isArray(l.syndrome)) throw new Error(`missions.json: ${o}.syndrome must be an array`);
  const s = l.syndrome.map((f, p) => {
    const w = ln(f, `${o}.syndrome[${String(p)}]`);
    if (w !== 0 && w !== 1) throw new Error(`missions.json: ${o}.syndrome bits must be 0/1`);
    return w;
  }), a = De(l.minWeightVerdict, `${o}.minWeightVerdict`);
  if (!$p.includes(a)) throw new Error(`missions.json: ${o}.minWeightVerdict invalid`);
  return {
    syndrome: s,
    propagated: De(l.propagated, `${o}.propagated`),
    minWeightCorrection: De(l.minWeightCorrection, `${o}.minWeightCorrection`),
    minWeightVerdict: a
  };
}
function Lp(l, o = "mission") {
  if (!tr(l)) throw new Error(`missions.json: ${o} must be an object`);
  const s = De(l.id, `${o}.id`), a = De(l.code, `${o}.code`);
  if (!fp(a)) throw new Error(`missions.json: ${s}.code '${a}' is unknown`);
  const f = Ze(a), p = De(l.kind, `${s}.kind`);
  if (p !== "dispatch" && p !== "propagation") throw new Error(`missions.json: ${s}.kind must be dispatch|propagation`);
  if (!Array.isArray(l.training)) throw new Error(`missions.json: ${s}.training must be an array`);
  const w = l.training.map((b, z) => {
    const O = `${s}.training[${String(z)}]`;
    if (!tr(b)) throw new Error(`missions.json: ${O} must be an object`);
    const Y = De(b.error, `${O}.error`);
    if (jt(Y).n !== f.n) throw new Error(`missions.json: ${O}.error length must be ${String(f.n)}`);
    const ye = Gc(b.circuit, `${O}.circuit`);
    return xo(ye, f.n), { error: Y, circuit: ye, caption: De(b.caption, `${O}.caption`) };
  }), E = l.challenge;
  if (!tr(E)) throw new Error(`missions.json: ${s}.challenge must be an object`);
  const S = De(E.error, `${s}.challenge.error`);
  if (jt(S).n !== f.n) throw new Error(`missions.json: ${s}.challenge.error length must be ${String(f.n)}`);
  const I = Gc(E.circuit, `${s}.challenge.circuit`);
  if (xo(I, f.n), p === "dispatch" && I.length > 0) throw new Error(`missions.json: ${s} is a dispatch mission but has a circuit`);
  if (!Array.isArray(l.allowed) || l.allowed.length === 0) throw new Error(`missions.json: ${s}.allowed must be a non-empty array`);
  const P = l.allowed.map((b, z) => {
    const O = De(b, `${s}.allowed[${String(z)}]`);
    if (!gd(O) || O === "I") throw new Error(`missions.json: ${s}.allowed[${String(z)}] must be X, Y or Z`);
    return O;
  }), $ = ln(l.budget, `${s}.budget`);
  if ($ < 1 || $ > f.n) throw new Error(`missions.json: ${s}.budget out of range`);
  const j = l.debrief;
  if (!tr(j)) throw new Error(`missions.json: ${s}.debrief must be an object`);
  const N = {
    success: De(j.success, `${s}.debrief.success`),
    "logical-error": De(j["logical-error"], `${s}.debrief.logical-error`),
    detectable: De(j.detectable, `${s}.debrief.detectable`)
  }, M = l.expected === void 0 || l.expected === null ? null : Pp(l.expected, `${s}.expected`);
  return {
    id: s,
    index: ln(l.index, `${s}.index`),
    title: De(l.title, `${s}.title`),
    code: a,
    kind: p,
    training: w,
    challenge: { error: S, circuit: I },
    allowed: P,
    budget: $,
    briefing: De(l.briefing, `${s}.briefing`),
    debrief: N,
    expected: M
  };
}
function Op(l) {
  if (!Array.isArray(l)) throw new Error("missions.json: root must be an array");
  const o = [], s = /* @__PURE__ */ new Set();
  return l.forEach((a, f) => {
    const p = Lp(a, `missions[${String(f)}]`);
    if (p.expected === null) throw new Error(`missions.json: ${p.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (s.has(p.id)) throw new Error(`missions.json: duplicate id ${p.id}`);
    if (s.add(p.id), p.index !== f + 1) throw new Error(`missions.json: ${p.id} index ${String(p.index)} should be ${String(f + 1)}`);
    o.push({ ...p, expected: p.expected });
  }), o;
}
let Kc;
function Id() {
  return Kc ??= Op(md), Kc;
}
function bp(l) {
  const o = Id().find((s) => s.id === l);
  if (o === void 0) throw new Error(`unknown mission '${l}'`);
  return o;
}
const go = 3;
function zp(l, o = md) {
  if (!Array.isArray(o)) return go;
  for (const s of o) {
    if (typeof s != "object" || s === null || Array.isArray(s)) continue;
    const a = s;
    if (a.id !== l) continue;
    const f = a.maxStars;
    return f === 1 || f === 2 || f === 3 ? f : go;
  }
  return go;
}
function Ap(l) {
  const o = Ze(l.code), s = l.allowed.filter(V0), a = l.kind === "dispatch" ? an(lr(o, jt(l.challenge.error))) : [];
  return {
    id: l.id,
    index: l.index,
    title: l.title,
    code: l.code,
    kind: l.kind,
    allowed: s,
    budget: l.budget,
    briefing: l.briefing,
    maxStars: zp(l.id),
    circuit: l.challenge.circuit,
    syndrome: a,
    visibleStart: l.kind === "propagation" ? l.challenge.error : null,
    training: l.training.map((f) => ({ fire: f.error, circuit: f.circuit, caption: f.caption }))
  };
}
let Jc;
function Cn() {
  return Jc ??= Id().map(Ap), Jc;
}
function gi(l) {
  const o = Cn().find((s) => s.id === l);
  if (o === void 0) throw new Error(`unknown mission '${l}'`);
  return o;
}
function Ro() {
  return Cn().reduce((l, o) => l + o.maxStars, 0);
}
function Mp(l) {
  const o = Cn(), s = o.findIndex((f) => f.id === l), a = o[s + 1];
  return a === void 0 ? null : a.id;
}
function Dp(l) {
  return bp(l);
}
function Fp(l) {
  const o = $o(l.code, l.crews, l.decoderCrews), s = st(l.crews) <= st(l.decoderCrews), a = l.maxStars ?? 3;
  return o && s && l.outcome === "success" ? "optimal" : o && l.outcome === "logical-error" ? "unlucky" : l.outcome === "success" && a <= 1 && !o ? "lucky" : l.outcome === "success" ? "valid" : "off";
}
function Xp({ quality: l, outcome: o, wrongBlocks: s, crewsUsed: a, maxStars: f = 3 }) {
  let p = 0;
  return o === "success" && l === "optimal" ? p = 3 : o === "success" && l === "valid" ? p = 2 : (l === "unlucky" || l === "lucky" || o === "detectable" && s <= 1 && a > 0) && (p = 1), p > f ? f : p;
}
function Wp(l) {
  const o = Fp(l), s = st(Co(l.crews, l.decoderCrews)), a = st(l.crews), f = l.maxStars ?? 3, p = Xp({ quality: o, outcome: l.outcome, wrongBlocks: s, crewsUsed: a, maxStars: f });
  return {
    outcome: l.outcome,
    quality: o,
    stars: p,
    maxStars: f,
    crewsUsed: a,
    minCrews: st(l.decoderCrews),
    completed: l.outcome === "success" || o === "unlucky"
  };
}
const _d = {
  optimal: "Optimal call",
  valid: "Valid, but costly",
  unlucky: "Optimal call, unlucky outcome",
  lucky: "Lucky guess — the alarms did not justify it",
  off: "Off target"
}, Td = {
  success: "Logical qubit safe",
  "logical-error": "Silent failure — logical qubit flipped",
  detectable: "Fires still burning"
}, Up = "Prediction missed — fires left on the wires";
function $d(l, o) {
  return !o && l === "logical-error" ? Up : Td[l];
}
function Zp(l) {
  return l.stars === 3 ? "Flawless dispatch" : l.stars === 2 ? "Fires out" : l.quality === "unlucky" ? "Right call, cruel luck" : l.quality === "lucky" ? "Lucky guess" : l.stars === 1 ? "Close" : l.outcome === "detectable" && l.crewsUsed === 0 ? "Stood down" : "Off target";
}
function ed(l) {
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
const Rd = { X: "red", Z: "blue", Y: "red-and-blue" };
function di(l) {
  const o = Vr(l);
  if (o.length === 0) return "no fires";
  const s = o.map((a) => {
    const f = qr(l, a);
    return `a ${Rd[f] ?? ""} fire (${f}) on block ${String(a)}`;
  });
  return s.length === 1 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1] ?? ""}`;
}
function Bp(l) {
  const o = Vr(l);
  if (o.length === 0) return "no crews";
  const s = o.map((a) => {
    const f = qr(l, a);
    return `a ${Rd[f] ?? ""} crew (${f}) to block ${String(a)}`;
  });
  return s.length === 1 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1] ?? ""}`;
}
function Vp(l, o) {
  if (l.checks.length === 0) return "This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.";
  const s = Ed(l, o);
  return s.length === 0 ? "Every station reads an even count and stays quiet." : `Alarms: ${s.join(", ")} ring${s.length === 1 ? "s" : ""}. Each ringing station sees an odd number of fires of its colour.`;
}
function Hp(l, o) {
  switch (l.kind) {
    case "success":
      return st(l.residual) === 0 ? "Residual is the identity: every fire is out. Logical qubit safe." : `Residual ${he(l.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case "logical-error": {
      if (o.checks.length === 0)
        return `Residual ${he(l.residual)} leaves ${di(l.residual)}. Bare wires have no stations, so a missed prediction is never caught: every leftover component acts directly on the data.`;
      const s = [];
      return l.logicalFlip.x.forEach((a, f) => {
        a && s.push(o.k === 1 ? "logical X" : `logical X${String(f)}`);
      }), l.logicalFlip.z.forEach((a, f) => {
        a && s.push(o.k === 1 ? "logical Z" : `logical Z${String(f)}`);
      }), `Residual ${he(l.residual)} commutes with every station yet is not a stabilizer: it acts as ${s.join(" and ")}. Silent failure.`;
    }
    case "detectable":
      return `Residual ${he(l.residual)} still trips ${Ed(o, l.syndrome).join(", ")}. Fires are still burning.`;
  }
}
function qp(l) {
  const { code: o, start: s, circuit: a, crews: f, verdict: p } = l, w = Io(s, a), E = [], S = w.frames[w.frames.length - 1] ?? s, I = he(s);
  E.push({
    id: "placed",
    caption: `Noise lit ${di(s)}.`,
    fires: I,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: !1
  }), a.forEach((M, b) => {
    const z = w.frames[b] ?? s, O = w.frames[b + 1] ?? z, Y = he(z) !== he(O);
    E.push({
      id: `gate-${String(b)}`,
      caption: Y ? `${ed(M)}: ${he(z)} becomes ${he(O)}.` : `${ed(M)}: the fire pattern ${he(z)} is unchanged.`,
      fires: he(O),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: b,
      showVerdict: !1
    });
  });
  const P = lr(o, S), $ = an(P), j = he(S);
  E.push({
    id: "alarms",
    caption: Vp(o, P),
    fires: j,
    crews: null,
    residual: null,
    syndrome: $,
    gateCursor: a.length,
    showVerdict: !1
  }), E.push({
    id: "dispatch",
    caption: `Your dispatch: ${Bp(f)}.`,
    fires: j,
    crews: he(f),
    residual: null,
    syndrome: $,
    gateCursor: a.length,
    showVerdict: !1
  });
  const N = he(p.residual);
  return E.push({
    id: "residual",
    caption: st(p.residual) === 0 ? "Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains." : `Crews meet fires (XOR): what remains is ${N}, that is ${di(p.residual)}.`,
    fires: j,
    crews: he(f),
    residual: N,
    syndrome: an(p.syndrome),
    gateCursor: a.length,
    showVerdict: !1
  }), E.push({
    id: "verdict",
    caption: Hp(p, o),
    fires: j,
    crews: he(f),
    residual: N,
    syndrome: an(p.syndrome),
    gateCursor: a.length,
    showVerdict: !0
  }), E;
}
function td(l) {
  return l.length === 0 ? "no blocks" : l.length === 1 ? `block ${String(l[0])}` : `blocks ${l.slice(0, -1).join(", ")} and ${String(l[l.length - 1])}`;
}
function Qp(l) {
  const { code: o, finalFire: s, crews: a, decoderCrews: f, decoderVerdict: p, equivalent: w, verdict: E } = l, S = he(f), I = he(a), P = he(s), $ = P !== S && P !== I;
  let j;
  if (o.checks.length === 0)
    j = w ? `The fire ended as ${P}; your crews matched it exactly, so the prediction was right.` : `The fire ended as ${P}. Your crews ${I} leave ${di(E.residual)} (${String(st(E.residual))} block${st(E.residual) === 1 ? "" : "s"}); on bare wires every leftover component acts on the data.`;
  else if (w && E.kind === "success")
    j = I === S ? "Your dispatch is exactly the minimum-weight dispatch for these alarms." : `Your dispatch ${I} and the minimum-weight dispatch ${S} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`, I === P ? j += " Your crews sat exactly on the true fires." : P !== S && (j += ` The true fires were ${P}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`);
  else if (w && E.kind === "logical-error") {
    const N = td(Vr(s)), M = td(Vr(E.residual));
    j = `${I === S ? `The minimum-weight dispatch for these alarms is ${S}, and that is what you sent.` : `The minimum-weight dispatch for these alarms is ${S}; your ${I} differs from it by a stabilizer, so it is the same call.`} The true fire was ${P}, on ${N}: ${String(st(s))} fires that look, to every station, exactly like one. Your crews plus those fires leave ${he(E.residual)} on ${M}, a logical operator that every station sees as an even count. Crews at ${P} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.`;
  } else E.kind === "success" ? (j = `You succeeded with ${String(st(a))} crew(s); the minimum-weight dispatch ${S} needs ${String(st(f))} and its verdict is ${nd[p.kind]}.`, p.kind === "logical-error" && (j += ` The alarms alone could not justify your ${I}: the same stations ring for ${S}, so protocol would still have sent that.`)) : j = `The minimum-weight dispatch for these alarms is ${S} (${nd[p.kind]}). Compare it with your ${I} step by step in the replay.`;
  return {
    decoderCrews: S,
    decoderVerdict: p.kind,
    equivalentToDecoder: w,
    explanation: j,
    trueFireCrews: $ ? P : null
  };
}
const nd = {
  success: "success",
  "logical-error": "silent failure",
  detectable: "fires still burning"
}, ko = "q11.save.v1", Pd = { sound: !1, reducedMotion: !1 };
function oi() {
  return { version: wo, progress: {}, settings: Pd };
}
const Yp = "Saved progress was unreadable and has been reset.";
function fi(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Gp(l) {
  if (!fi(l)) return null;
  const o = {};
  for (const [s, a] of Object.entries(l)) {
    if (!fi(a)) return null;
    const f = a.stars, p = a.attempts, w = a.completed;
    if (f !== 0 && f !== 1 && f !== 2 && f !== 3 || typeof p != "number" || !Number.isInteger(p) || p < 0 || typeof w != "boolean") return null;
    o[s] = { stars: f, attempts: p, completed: w };
  }
  return o;
}
function Kp(l) {
  if (!fi(l)) return null;
  const o = l.sound, s = l.reducedMotion;
  return typeof o != "boolean" || typeof s != "boolean" ? null : { sound: o, reducedMotion: s };
}
function Jp(l) {
  if (l === null) return null;
  let o;
  try {
    o = JSON.parse(l);
  } catch {
    return null;
  }
  if (!fi(o) || o.version !== wo) return null;
  const s = Gp(o.progress), a = Kp(o.settings);
  return s === null || a === null ? null : { version: wo, progress: s, settings: a };
}
function eh(l) {
  if (l === null) return { save: oi(), notice: null };
  let o;
  try {
    o = l.getItem(ko);
  } catch {
    return { save: oi(), notice: null };
  }
  if (o === null) return { save: oi(), notice: null };
  const s = Jp(o);
  if (s !== null) return { save: s, notice: null };
  const a = oi();
  try {
    l.setItem(ko, JSON.stringify(a));
  } catch {
  }
  return { save: a, notice: Yp };
}
function th(l, o) {
  if (l === null) return !1;
  try {
    return l.setItem(ko, JSON.stringify(o)), !0;
  } catch {
    return !1;
  }
}
function nh() {
  try {
    const l = globalThis.localStorage, o = "__q11_probe__";
    return l.setItem(o, "1"), l.removeItem(o), l;
  } catch {
    return null;
  }
}
const rh = "Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.", lh = [{ analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.15, Z1: 0.09, Z2: 0.06, Z3: 0.02 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.5, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 93, 1: 7 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.93], predictedSyndromeShare: 0.69, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000011000010011": 1, "00000100100000010": 1, "00000100100000011": 3, "00000101100000011": 1, "00000111100000011": 1, "00010011000110001": 1, "00011011000000011": 3, "00011011001000011": 1, "00011011001100011": 1, "00011011100000011": 1, "00011100001100011": 1, "00011111100000011": 7, "01101000100000001": 1, "01101000100000010": 1, "01101000100000011": 1, "01101001100000011": 1, "01101100000000011": 2, "01110011001000010": 1, "01110011100000011": 4, "01110011100010111": 1, "01110111000000011": 5, "01110111101000011": 1, "01111111110100011": 1, "10000001011000111": 1, "10000111100110011": 1, "10001001000010111": 1, "10001011000000011": 5, "10001111000000010": 1, "10001111100000011": 2, "10001111100100001": 1, "10010000000000011": 6, "10010100100000011": 5, "10010100100010001": 1, "10010101110100100": 1, "10010111100000010": 1, "10011011000000011": 1, "10110100100101011": 1, "11010000000100011": 1, "11100001100000111": 1, "11100111000000011": 6, "11100111001100011": 1, "11101000110010001": 1, "11110011100010011": 1, "11110111010010001": 1, "11111000100000011": 6, "11111011100000010": 1, "11111100000000011": 4, "11111100000010011": 1, "11111100001001010": 1, "11111111001110010": 1 }, finishedAt: "2026-10-10T01:40:30Z", jobId: "01a12378-c4f2-71ea-b5df-920acd440520", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:40:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.09, Z1: 0.07, Z2: 0.07, Z3: 0.04 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 22.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 97, 1: 3 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking) — JS/Qiskit page, on-load self-test through the JS→Python bridge", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.76, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000000001010010": 1, "00000001000010011": 1, "00000100100000011": 1, "00010011000000000": 1, "00011010000000111": 1, "00011011000000011": 6, "00011101100010111": 1, "00011110100010110": 1, "00011111100000001": 1, "00011111100000011": 4, "00100011110111011": 1, "00101100010101001": 1, "01101000001100011": 1, "01101000100000011": 8, "01101011000100011": 1, "01101100000000011": 6, "01101100000010011": 1, "01101100000100011": 1, "01110011100000011": 3, "01110100001000010": 1, "01110110001000111": 1, "01110111000000011": 7, "01110111010110011": 1, "01111010110000101": 1, "10000100110010011": 1, "10001011000000011": 6, "10001111000000011": 1, "10001111100000011": 7, "10001111100110011": 1, "10010000000000011": 5, "10010011000010011": 1, "10010100100000011": 1, "10010100100010011": 1, "10010110100000111": 1, "10111000100101001": 1, "11010000000000011": 1, "11100011100000011": 4, "11100111000000011": 1, "11101100000000011": 1, "11111000100000011": 5, "11111100000000010": 1, "11111100000000011": 4 }, finishedAt: "2026-10-10T02:14:30Z", jobId: "01a12396-c213-7984-9259-bb3fb25b8f46", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T02:14:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.06, Z1: 0.07, Z2: 0.03, Z3: 0.03 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 0, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 3, 1: 97 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.73, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "XIIIIIIII", counts: { "00000011100000001": 3, "00000100100100001": 1, "00000111000000001": 6, "00000111000010001": 1, "00001000110010001": 1, "00010111000000001": 1, "00010111000000011": 1, "00010111010000001": 1, "00011000100000001": 7, "00011000101000001": 1, "00011011001000001": 1, "00011100000000001": 5, "00111011000001001": 1, "01101011000000001": 5, "01101011000010101": 1, "01101011000110001": 1, "01101011001000001": 1, "01101111100000001": 9, "01101111100100001": 1, "01110000000000001": 4, "01110011000100001": 1, "01110100100000000": 1, "01110100100000001": 2, "10000011110000001": 1, "10001000100000001": 7, "10001100000000001": 4, "10010011001000000": 1, "10010011100000001": 4, "10010101000000101": 1, "10110000000001001": 1, "11011000100101001": 1, "11100000000000001": 3, "11100000000100000": 1, "11100011001100001": 1, "11100100100000001": 2, "11100100100010001": 1, "11100111100110000": 1, "11101000000110011": 1, "11110000010010001": 1, "11111001000000101": 1, "11111010010010110": 1, "11111011000000001": 5, "11111111100000001": 6 }, finishedAt: "2026-10-10T01:44:30Z", jobId: "01a1237b-5f60-7349-89d0-a343dca0201c", missionId: "silent-failure", prediction: { equivalentToReference: !0, logicalFlip: { x: [!0], z: [!1] }, referenceCorrection: "XIIIIIIII", referenceVerdict: "logical-error", residual: "XXXIIIIII", syndrome: [1, 0, 0, 0, 0, 0, 0, 0], verdict: "logical-error" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:44:00Z" }], ih = 1, sh = {
  note: rh,
  results: lh,
  schema: ih
}, oh = {
  "local-simulator": "Local (Aer)",
  "cached-cloud": "Cached cloud result",
  "live-cloud": "Live cloud result"
};
function Po(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function uh(l) {
  if (!Po(l)) return null;
  const o = {};
  for (const [s, a] of Object.entries(l)) {
    if (typeof a != "number" || !Number.isFinite(a)) return null;
    o[s] = a;
  }
  return o;
}
function ah(l) {
  if (!Po(l)) return null;
  const o = l.source;
  if (o !== "local-simulator" && o !== "cached-cloud" && o !== "live-cloud") return null;
  const s = uh(l.counts);
  if (s === null) return null;
  const a = (P) => {
    const $ = l[P];
    return typeof $ == "string" ? $ : null;
  }, f = a("missionId"), p = a("correction"), w = a("backendName"), E = a("startedAt"), S = a("finishedAt"), I = l.shots;
  return f === null || p === null || w === null || E === null || S === null || typeof I != "number" || !Number.isInteger(I) || I <= 0 ? null : {
    status: "ok",
    source: o,
    backendName: w,
    missionId: f,
    correction: p,
    shots: I,
    counts: s,
    analysis: l.analysis ?? null,
    prediction: l.prediction ?? null,
    jobId: a("jobId"),
    startedAt: E,
    finishedAt: S
  };
}
function ch(l) {
  if (!Po(l) || l.schema !== 1 || !Array.isArray(l.results)) return [];
  const o = [];
  for (const s of l.results) {
    const a = ah(s);
    a !== null && o.push(a);
  }
  return o;
}
function dh(l, o, s) {
  if (o === s) return !0;
  try {
    const a = Ze(gi(l).code), f = jt(o), p = jt(s);
    return f.n !== a.n || p.n !== a.n ? !1 : $o(a, f, p);
  } catch {
    return !1;
  }
}
function Ld(l, o, s) {
  return l.filter((a) => a.missionId === o && (s === void 0 || dh(o, s, a.correction)));
}
function fh(l = ch(sh)) {
  return {
    kind: "none",
    cached: (o, s) => Ld(l, o, s)
  };
}
const Od = "Progress reset.";
function ph(l, o = null) {
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
    settings: l?.settings ?? Pd,
    notice: o
  };
}
function hh(l, o) {
  let s = hi(l);
  for (const [a, f] of Object.entries(o)) s = Y0(s, Number(a), f);
  return s;
}
function Hr(l) {
  return Object.keys(l).length;
}
function Ke(l) {
  return l.missionId === null ? null : gi(l.missionId);
}
function mh(l, o) {
  const s = Dp(l), a = Ze(s.code), f = jt(s.challenge.error), p = tp(f, s.challenge.circuit), w = hh(a.n, o), E = qc(a, p, w), S = an(lr(a, f)), I = s.kind === "dispatch" ? Tp(a).decode(xp(S)) : p, P = qc(a, p, I), $ = $o(a, w, I), j = Wp({ code: a, outcome: E.kind, crews: w, decoderCrews: I, maxStars: gi(l).maxStars }), N = qp({ kind: s.kind, code: a, start: f, circuit: s.challenge.circuit, crews: w, verdict: E }), M = Qp({
    kind: s.kind,
    code: a,
    finalFire: p,
    crews: w,
    verdict: E,
    equivalent: $,
    decoderCrews: I,
    decoderVerdict: P
  });
  return {
    missionId: l,
    fires: he(p),
    startFires: he(f),
    crews: he(w),
    residual: he(E.residual),
    syndromeOfFires: an(lr(a, p)),
    syndromeOfResidual: an(E.syndrome),
    verdict: E.kind,
    verdictLabel: $d(E.kind, a.checks.length > 0),
    logicalFlip: { x: [...E.logicalFlip.x], z: [...E.logicalFlip.z] },
    score: j,
    narrative: s.debrief[E.kind],
    steps: N,
    whatIf: M
  };
}
function gh(l, o, s, a) {
  const f = l[o], p = {
    stars: f === void 0 ? s : Math.max(f.stars, s),
    attempts: (f?.attempts ?? 0) + 1,
    completed: (f?.completed ?? !1) || a
  };
  return { ...l, [o]: p };
}
function ui(l, o) {
  const s = o.allowed[0] ?? "X";
  return {
    ...l,
    screen: "challenge",
    placements: {},
    selected: o.allowed.includes(l.selected) ? l.selected : s,
    standDownDialog: !1,
    debrief: null,
    replayIndex: 0,
    autoPlay: !1
  };
}
function rd(l, o) {
  const s = gi(o);
  return {
    ...l,
    screen: "briefing",
    missionId: o,
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
const yo = ["how", "settings"];
function ld(l, o) {
  const s = yh(l, o);
  return s.screen !== l.screen && s.notice === Od ? { ...s, notice: null } : s;
}
function yh(l, o) {
  switch (o.type) {
    case "HYDRATE":
      return { ...l, progress: o.save.progress, settings: o.save.settings, notice: o.notice ?? l.notice };
    case "PLAY":
      return { ...l, screen: "missions", notice: l.notice };
    case "OPEN_HOW":
      return yo.includes(l.screen) ? { ...l, screen: "how" } : { ...l, screen: "how", returnTo: l.screen };
    case "OPEN_SETTINGS":
      return yo.includes(l.screen) ? { ...l, screen: "settings" } : { ...l, screen: "settings", returnTo: l.screen };
    case "CLOSE_OVERLAY":
      return yo.includes(l.screen) ? { ...l, screen: l.returnTo } : l;
    case "OPEN_MISSIONS":
      return { ...l, screen: "missions", standDownDialog: !1, autoPlay: !1 };
    case "OPEN_TITLE":
      return { ...l, screen: "title", standDownDialog: !1, autoPlay: !1 };
    case "SELECT_MISSION":
      return rd(l, o.id);
    case "START_MISSION": {
      const s = Ke(l);
      return s === null || l.screen !== "briefing" ? l : s.training.length > 0 ? { ...l, screen: "training", lesson: 0, lessonCursor: -1 } : ui(l, s);
    }
    case "LESSON_SELECT": {
      const s = Ke(l);
      return s === null || l.screen !== "training" || o.lesson < 0 || o.lesson >= s.training.length ? l : { ...l, lesson: o.lesson, lessonCursor: -1 };
    }
    case "LESSON_CURSOR": {
      const s = Ke(l);
      if (s === null || l.screen !== "training") return l;
      const a = s.training[l.lesson];
      if (a === void 0) return l;
      const f = Math.max(-1, Math.min(a.circuit.length - 1, o.cursor));
      return { ...l, lessonCursor: f };
    }
    case "LESSON_NEXT": {
      const s = Ke(l);
      if (s === null || l.screen !== "training") return l;
      const a = s.training[l.lesson];
      return a === void 0 ? l : l.lessonCursor < a.circuit.length - 1 ? { ...l, lessonCursor: l.lessonCursor + 1 } : l.lesson < s.training.length - 1 ? { ...l, lesson: l.lesson + 1, lessonCursor: -1 } : ui(l, s);
    }
    case "LESSON_PREV": {
      const s = Ke(l);
      if (s === null || l.screen !== "training") return l;
      if (l.lessonCursor > -1) return { ...l, lessonCursor: l.lessonCursor - 1 };
      if (l.lesson > 0) {
        const a = s.training[l.lesson - 1];
        return { ...l, lesson: l.lesson - 1, lessonCursor: (a?.circuit.length ?? 0) - 1 };
      }
      return l;
    }
    case "START_CHALLENGE": {
      const s = Ke(l);
      return s === null || l.screen !== "training" && l.screen !== "briefing" ? l : ui(l, s);
    }
    case "SELECT_LETTER": {
      const s = Ke(l);
      return s === null || l.screen !== "challenge" || !s.allowed.includes(o.letter) ? l : { ...l, selected: o.letter };
    }
    case "TOGGLE_BLOCK": {
      const s = Ke(l);
      if (s === null || l.screen !== "challenge" || l.standDownDialog) return l;
      const a = Ze(s.code).n;
      if (o.qubit < 0 || o.qubit >= a) return l;
      const f = l.placements[o.qubit], p = { ...l.placements };
      if (f === l.selected)
        delete p[o.qubit];
      else if (f !== void 0)
        p[o.qubit] = l.selected;
      else {
        if (Hr(l.placements) >= s.budget) return l;
        p[o.qubit] = l.selected;
      }
      return { ...l, placements: p };
    }
    case "RECALL_BLOCK": {
      if (l.screen !== "challenge" || l.standDownDialog || l.placements[o.qubit] === void 0) return l;
      const s = { ...l.placements };
      return delete s[o.qubit], { ...l, placements: s };
    }
    case "CLEAR_CREWS":
      return l.screen !== "challenge" || l.standDownDialog ? l : { ...l, placements: {} };
    case "CONFIRM": {
      const s = Ke(l);
      return s === null || l.screen !== "challenge" || l.standDownDialog ? l : Hr(l.placements) === 0 ? { ...l, standDownDialog: !0 } : id(l, s, o.reducedMotion ?? !1);
    }
    case "STAND_DOWN_CANCEL":
      return { ...l, standDownDialog: !1 };
    case "STAND_DOWN_CONFIRM": {
      const s = Ke(l);
      return s === null || l.screen !== "challenge" || !l.standDownDialog ? l : id(l, s, o.reducedMotion ?? !1);
    }
    case "REPLAY_GOTO": {
      if (l.debrief === null) return l;
      const s = Math.max(0, Math.min(l.debrief.steps.length - 1, o.index));
      return { ...l, replayIndex: s, autoPlay: s === l.debrief.steps.length - 1 ? !1 : l.autoPlay };
    }
    case "REPLAY_NEXT": {
      if (l.debrief === null) return l;
      const s = l.debrief.steps.length - 1, a = Math.min(s, l.replayIndex + 1);
      return { ...l, replayIndex: a, autoPlay: a === s ? !1 : l.autoPlay };
    }
    case "REPLAY_PREV":
      return l.debrief === null ? l : { ...l, replayIndex: Math.max(0, l.replayIndex - 1), autoPlay: !1 };
    case "REPLAY_AUTO": {
      if (l.debrief === null) return l;
      const s = l.debrief.steps.length - 1;
      return { ...l, autoPlay: o.on, replayIndex: o.on && l.replayIndex >= s ? 0 : l.replayIndex };
    }
    case "SHOW_RESULT":
      return l.debrief === null || l.screen !== "debrief" ? l : { ...l, screen: "result", autoPlay: !1 };
    case "TRY_AGAIN": {
      const s = Ke(l);
      return s === null || l.screen !== "debrief" && l.screen !== "result" ? l : ui(l, s);
    }
    case "NEXT_MISSION": {
      if (l.missionId === null) return l;
      const s = Mp(l.missionId);
      return s === null ? { ...l, screen: "summary", autoPlay: !1 } : rd(l, s);
    }
    case "SET_SOUND":
      return { ...l, settings: { ...l.settings, sound: o.on } };
    case "SET_REDUCED_MOTION":
      return { ...l, settings: { ...l.settings, reducedMotion: o.on } };
    case "RESET_PROGRESS":
      return { ...l, progress: {}, notice: Od };
    case "SHOW_NOTICE":
      return { ...l, notice: o.text };
    case "DISMISS_NOTICE":
      return { ...l, notice: null };
  }
}
function id(l, o, s) {
  const a = mh(o.id, l.placements);
  return {
    ...l,
    screen: "debrief",
    standDownDialog: !1,
    debrief: a,
    replayIndex: 0,
    autoPlay: !s && a.steps.length > 1,
    progress: gh(l.progress, o.id, a.score.stars, a.score.completed)
  };
}
function Lo(l) {
  return Cn().reduce((o, s) => o + (l[s.id]?.stars ?? 0), 0);
}
var vh = hd();
const B = {
  X: "#ff5a3c",
  Z: "#3c8dff",
  Y: "#b86cff",
  alarm: "#ffc53d",
  success: "#3ddc97",
  text: "#e8eefc",
  muted: "#9fb3d9",
  line: "#27416f",
  /** Non-text boundaries that must be readable (block outlines, quiet watch lines): 3.7:1 on the panel #12264a and 3.3:1 on the block fill #173059 (the suggested #3c5a94 is only 2.2:1). */
  lineStrong: "#5a7fbf",
  navy: "#0b1a33",
  panel: "#12264a"
}, sn = { X: "red (X)", Z: "blue (Z)", Y: "red-and-blue (Y)" }, wh = "M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z";
function Nn({ letter: l, size: o = 28, outlined: s = !1, title: a }) {
  const f = `flame-${l}-${s ? "o" : "f"}`, p = l === "Y" ? `url(#${f}-split)` : B[l];
  return /* @__PURE__ */ c.jsxs("svg", { className: `glyph glyph-flame glyph-${l}`, width: o, height: o, viewBox: "0 0 24 24", "aria-hidden": a === void 0, role: a === void 0 ? void 0 : "img", children: [
    a !== void 0 ? /* @__PURE__ */ c.jsx("title", { children: a }) : null,
    l === "Y" ? /* @__PURE__ */ c.jsx("defs", { children: /* @__PURE__ */ c.jsxs("linearGradient", { id: `${f}-split`, x1: "0", x2: "1", y1: "0", y2: "0", children: [
      /* @__PURE__ */ c.jsx("stop", { offset: "0", stopColor: B.X }),
      /* @__PURE__ */ c.jsx("stop", { offset: "0.5", stopColor: B.X }),
      /* @__PURE__ */ c.jsx("stop", { offset: "0.5", stopColor: B.Z }),
      /* @__PURE__ */ c.jsx("stop", { offset: "1", stopColor: B.Z })
    ] }) }) : null,
    /* @__PURE__ */ c.jsx("path", { d: wh, fill: p, fillOpacity: s ? 0.35 : 1, stroke: s ? B.text : "rgba(0,0,0,0.35)", strokeWidth: s ? 1.6 : 0.8 }),
    /* @__PURE__ */ c.jsx("text", { x: "12", y: "22.6", textAnchor: "middle", fontSize: "6.5", fontWeight: "700", fill: B.text, fontFamily: "system-ui, sans-serif", children: s ? "R" : l })
  ] });
}
function cn({ letter: l, size: o = 24, title: s }) {
  return /* @__PURE__ */ c.jsxs("svg", { className: `glyph glyph-helmet glyph-${l}`, width: o, height: o, viewBox: "0 0 24 24", "aria-hidden": s === void 0, role: s === void 0 ? void 0 : "img", children: [
    s !== void 0 ? /* @__PURE__ */ c.jsx("title", { children: s }) : null,
    /* @__PURE__ */ c.jsx("circle", { cx: "12", cy: "12", r: "11", fill: B.navy, stroke: B[l], strokeWidth: "2" }),
    /* @__PURE__ */ c.jsx("path", { d: "M5.5 13.5a6.5 6.5 0 0 1 13 0Z", fill: B[l] }),
    /* @__PURE__ */ c.jsx("rect", { x: "4", y: "13.2", width: "16", height: "2.4", rx: "1.2", fill: B.text }),
    /* @__PURE__ */ c.jsx("text", { x: "12", y: "21.2", textAnchor: "middle", fontSize: "6.6", fontWeight: "800", fill: B.text, fontFamily: "system-ui, sans-serif", children: l })
  ] });
}
function So({ type: l, ringing: o, size: s = 22, title: a }) {
  return /* @__PURE__ */ c.jsxs("svg", { className: `glyph glyph-station ${o ? "is-ringing" : ""}`, width: s, height: s, viewBox: "-14 -14 28 28", "aria-hidden": a === void 0, role: a === void 0 ? void 0 : "img", children: [
    a !== void 0 ? /* @__PURE__ */ c.jsx("title", { children: a }) : null,
    /* @__PURE__ */ c.jsx(bd, { type: l, ringing: o, r: 10 })
  ] });
}
function bd({ type: l, ringing: o, r: s }) {
  const a = o ? B.alarm : l === "Z" ? B.X : B.Z, f = o ? B.alarm : B.panel, p = o ? B.navy : B.text, w = l === "Z" ? /* @__PURE__ */ c.jsx("polygon", { points: `0,${String(-s)} ${String(s)},0 0,${String(s)} ${String(-s)},0`, fill: f, stroke: a, strokeWidth: o ? 3 : 1.6, strokeLinejoin: "round" }) : /* @__PURE__ */ c.jsx("rect", { x: -s * 0.85, y: -s * 0.85, width: s * 1.7, height: s * 1.7, rx: s * 0.18, fill: f, stroke: a, strokeWidth: o ? 3 : 1.6 });
  return /* @__PURE__ */ c.jsxs("g", { className: o ? "station-shape is-ringing" : "station-shape", children: [
    o ? /* @__PURE__ */ c.jsx("circle", { r: s * 1.45, fill: "none", stroke: B.alarm, strokeWidth: 1.2, opacity: 0.7, className: "station-pulse" }) : null,
    w,
    /* @__PURE__ */ c.jsx("text", { y: s * 0.42, textAnchor: "middle", fontSize: s * 1.05, fontWeight: 800, fill: p, fontFamily: "system-ui, sans-serif", children: o ? "!" : l })
  ] });
}
function xh({ filled: l, size: o = 22 }) {
  return /* @__PURE__ */ c.jsx("svg", { width: o, height: o, viewBox: "0 0 24 24", "aria-hidden": "true", className: l ? "star is-filled" : "star", children: /* @__PURE__ */ c.jsx("path", { d: "M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z", fill: l ? B.alarm : "none", stroke: l ? B.alarm : B.muted, strokeWidth: "1.5", strokeLinejoin: "round" }) });
}
function zd({ size: l = 22 }) {
  return /* @__PURE__ */ c.jsx("svg", { width: l, height: l, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function kh({ size: l = 72 }) {
  return /* @__PURE__ */ c.jsxs("svg", { width: l, height: l, viewBox: "0 0 512 512", role: "img", "aria-label": "Q11 mark: a Q-shaped protective ring with a small flame inside", children: [
    /* @__PURE__ */ c.jsxs("g", { fill: "none", stroke: "#8fc1ff", strokeWidth: "56", strokeLinecap: "round", children: [
      /* @__PURE__ */ c.jsx("circle", { cx: "248", cy: "240", r: "170" }),
      /* @__PURE__ */ c.jsx("line", { x1: "334", y1: "326", x2: "424", y2: "416" })
    ] }),
    /* @__PURE__ */ c.jsx("path", { fill: "#ff5a3c", transform: "translate(158 125.2) scale(0.8)", d: "M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" })
  ] });
}
function Oo(l, o) {
  const s = Ze(l);
  if (s.checks.length === 0) return "This district has no alarm stations.";
  if (o === null) return "Alarms not read yet.";
  const a = s.checks.filter((f, p) => (o[p] ?? 0) === 1).map((f) => f.id);
  return a.length === 0 ? `All ${String(s.checks.length)} stations quiet.` : `${String(a.length)} of ${String(s.checks.length)} stations ringing: ${a.join(", ")}.`;
}
function Sh(l) {
  const o = jt(l), s = Vr(o).map((a) => `${qr(o, a)} fire on block ${String(a)}`);
  return s.length === 0 ? "no fires" : s.length === 1 ? s[0] ?? "" : `${s.slice(0, -1).join(", ")} and ${s[s.length - 1] ?? ""}`;
}
function jh(l, o) {
  return Ze(l).checks.filter((s) => s.qubits.includes(o)).map((s) => s.id);
}
const En = "Q11";
function Eh(l, o) {
  const s = o === null ? null : `Mission ${String(o.index)} · ${o.title}`;
  switch (l.screen) {
    case "title":
      return `${En} — Quantum Emergency Response`;
    case "how":
      return `${En} — How it works`;
    case "settings":
      return `${En} — Settings`;
    case "missions":
      return `${En} — Missions`;
    case "summary":
      return `${En} — Shift complete`;
    case "briefing":
    case "training":
    case "challenge":
    case "debrief":
    case "result":
      return s === null ? `${En} — Missions` : `${En} — ${s}`;
  }
}
function Nh(l, o, s) {
  const a = o === null ? "" : `Mission ${String(o.index)}`;
  switch (l.screen) {
    case "title":
      return "Q11 title screen.";
    case "how":
      return "How it works.";
    case "settings":
      return "Settings.";
    case "missions":
      return "Mission list.";
    case "summary":
      return "Shift complete: summary of every mission.";
    case "briefing":
      return `${a} briefing.`;
    case "training":
      return `${a} training, lesson ${String(l.lesson + 1)}${o === null ? "" : ` of ${String(o.training.length)}`}. Fires visible.`;
    case "challenge":
      return o === null ? "Dispatch." : o.kind === "propagation" ? `${a} dispatch. Predict where the fires end up; ${String(o.budget)} crew${o.budget === 1 ? "" : "s"} available.` : `${a} dispatch. ${Oo(o.code, o.syndrome)}`;
    case "debrief":
      return s === null ? `${a} debrief.` : `${a} debrief. ${s.verdictLabel}.`;
    case "result":
      return s === null ? `${a} result.` : `${a} result: ${String(s.score.stars)} of ${String(s.score.maxStars)} stars.`;
  }
}
function bo({ codeId: l, syndrome: o, id: s, compact: a = !1 }) {
  const f = Ze(l);
  return f.checks.length === 0 ? /* @__PURE__ */ c.jsxs("section", { className: "panel-section", "aria-labelledby": s === void 0 ? void 0 : `${s}-h`, children: [
    /* @__PURE__ */ c.jsx("h2", { id: s === void 0 ? void 0 : `${s}-h`, className: "panel-title", children: "Alarms" }),
    /* @__PURE__ */ c.jsx("p", { className: "muted", id: s, children: "No alarm stations on bare wires. Predict where the fires end up." })
  ] }) : /* @__PURE__ */ c.jsxs("section", { className: "panel-section", "aria-labelledby": s === void 0 ? void 0 : `${s}-h`, children: [
    /* @__PURE__ */ c.jsx("h2", { id: s === void 0 ? void 0 : `${s}-h`, className: "panel-title", children: "Alarms" }),
    /* @__PURE__ */ c.jsx("p", { className: "sr-only", id: s, "aria-live": "polite", children: Oo(l, o) }),
    /* @__PURE__ */ c.jsx("ul", { className: `alarm-list ${f.checks.length > 4 ? "is-grid" : ""} ${a ? "is-compact" : ""}`, "aria-label": "Alarm stations", children: f.checks.map((p, w) => {
      const E = o !== null && (o[w] ?? 0) === 1;
      return /* @__PURE__ */ c.jsxs("li", { className: E ? "alarm is-ringing" : "alarm", "data-check": p.id, "data-ringing": E ? "1" : "0", children: [
        /* @__PURE__ */ c.jsx(So, { type: p.type, ringing: E, size: 22 }),
        /* @__PURE__ */ c.jsxs("span", { className: "alarm-main", children: [
          /* @__PURE__ */ c.jsx("span", { className: "alarm-id", children: p.id }),
          /* @__PURE__ */ c.jsxs("span", { className: "alarm-blocks", children: [
            "blocks ",
            p.qubits.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "alarm-state", children: o === null ? "—" : E ? "RINGING" : "quiet" })
      ] }, p.id);
    }) })
  ] });
}
const sd = { X: "1", Z: "2", Y: "3" }, Ch = { X: "puts out red fires", Z: "puts out blue fires", Y: "puts out red-and-blue fires" }, Ih = ["X", "Z", "Y"];
function _h({ allowed: l, selected: o, onSelect: s }) {
  const a = Ih.filter((p) => l.includes(p)), f = (p, w) => {
    const E = a.indexOf(w);
    if (E < 0 || a.length === 0) return;
    let S;
    if (p.key === "ArrowDown" || p.key === "ArrowRight" ? S = a[(E + 1) % a.length] : p.key === "ArrowUp" || p.key === "ArrowLeft" ? S = a[(E - 1 + a.length) % a.length] : p.key === "Home" ? S = a[0] : p.key === "End" && (S = a[a.length - 1]), S === void 0) return;
    p.preventDefault(), s(S), p.currentTarget.closest('[role="radiogroup"]')?.querySelector(`[data-letter="${S}"]`)?.focus();
  };
  return /* @__PURE__ */ c.jsxs("section", { className: "panel-section", "aria-labelledby": "palette-h", children: [
    /* @__PURE__ */ c.jsx("h2", { id: "palette-h", className: "panel-title", children: "Crews" }),
    /* @__PURE__ */ c.jsx("div", { className: "palette", role: "radiogroup", "aria-label": "Crew colour", children: a.map((p) => /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": o === p,
        tabIndex: o === p ? 0 : -1,
        className: `palette-btn palette-${p} ${o === p ? "is-selected" : ""}`,
        onClick: () => s(p),
        onKeyDown: (w) => f(w, p),
        "data-letter": p,
        "data-testid": `palette-${p}`,
        children: [
          /* @__PURE__ */ c.jsx(cn, { letter: p, size: 30 }),
          /* @__PURE__ */ c.jsxs("span", { className: "palette-text", children: [
            /* @__PURE__ */ c.jsxs("span", { className: "palette-name", children: [
              p,
              " crew",
              /* @__PURE__ */ c.jsxs("span", { className: "sr-only", children: [
                ", ",
                sn[p],
                ","
              ] })
            ] }),
            /* @__PURE__ */ c.jsx("span", { className: "palette-hint", children: Ch[p] })
          ] }),
          /* @__PURE__ */ c.jsx("kbd", { className: "palette-key", "aria-hidden": "true", children: sd[p] }),
          /* @__PURE__ */ c.jsxs("span", { className: "sr-only", children: [
            ", key ",
            sd[p]
          ] })
        ]
      },
      p
    )) })
  ] });
}
function Th({ verdict: l, label: o }) {
  return /* @__PURE__ */ c.jsxs("div", { className: `verdict verdict-${l}`, role: "status", "data-testid": "verdict", tabIndex: -1, "data-focus-target": !0, children: [
    /* @__PURE__ */ c.jsx("span", { className: "verdict-icon", "aria-hidden": "true", children: l === "success" ? /* @__PURE__ */ c.jsx($h, {}) : l === "detectable" ? /* @__PURE__ */ c.jsx(Nn, { letter: "X", size: 26 }) : /* @__PURE__ */ c.jsx(Rh, {}) }),
    /* @__PURE__ */ c.jsx("span", { className: "verdict-text", children: o ?? Td[l] })
  ] });
}
function $h() {
  return /* @__PURE__ */ c.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsx("circle", { cx: "12", cy: "12", r: "10.5", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ c.jsx("path", { d: "M7 12.5l3.2 3.2L17 8.8", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Rh() {
  return /* @__PURE__ */ c.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsx("path", { d: "M12 3 2.5 20h19Z", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round" }),
    /* @__PURE__ */ c.jsx("path", { d: "M12 9v5", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }),
    /* @__PURE__ */ c.jsx("circle", { cx: "12", cy: "17", r: "1.3", fill: "currentColor" })
  ] });
}
function Qr({ count: l, max: o = 3, size: s = 22, label: a }) {
  return /* @__PURE__ */ c.jsx("span", { className: "stars", role: "img", "aria-label": a ?? `${String(l)} of ${String(o)} stars`, children: Array.from({ length: Math.max(1, o) }, (f, p) => /* @__PURE__ */ c.jsx(xh, { filled: p < l, size: s }, p)) });
}
function Mt({ title: l, subtitle: o, onMissions: s, onSettings: a, settingsLabel: f = "Settings", onTitle: p }) {
  return /* @__PURE__ */ c.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "topbar-title", children: [
      p === void 0 ? /* @__PURE__ */ c.jsx("span", { className: "brand", children: "Q11" }) : /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost brand-btn", onClick: p, "aria-label": "Q11 — back to title", children: "Q11" }),
      /* @__PURE__ */ c.jsxs("div", { className: "topbar-text", children: [
        /* @__PURE__ */ c.jsx("h1", { className: "topbar-h", tabIndex: -1, "data-focus-target": !0, children: l }),
        o !== void 0 ? /* @__PURE__ */ c.jsx("p", { className: "topbar-sub", children: o }) : null
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("nav", { className: "topbar-actions", "aria-label": "Game", children: [
      s !== void 0 ? /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost", onClick: s, children: "Missions" }) : null,
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: a, "aria-label": f, "data-testid": "topbar-settings", children: /* @__PURE__ */ c.jsx(zd, {}) })
    ] })
  ] });
}
function Ph({ text: l, onDismiss: o }) {
  return /* @__PURE__ */ c.jsxs("div", { className: "notice", role: "status", "data-testid": "notice", children: [
    /* @__PURE__ */ c.jsx("span", { children: l }),
    /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: o, "aria-label": "Dismiss notice", children: "Dismiss" })
  ] });
}
const Lh = "[data-inert-root]", Oh = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ad({ title: l, children: o, confirmLabel: s, cancelLabel: a = "Cancel", onConfirm: f, onCancel: p, danger: w = !1 }) {
  const E = le.useRef(null), S = le.useRef(null), I = le.useRef(p);
  le.useEffect(() => {
    I.current = p;
  }, [p]), le.useLayoutEffect(() => {
    const $ = document.activeElement instanceof HTMLElement ? document.activeElement : null, j = Array.from(document.querySelectorAll(Lh)), N = j.map((M) => M.hasAttribute("inert"));
    return j.forEach((M) => M.setAttribute("inert", "")), E.current?.focus(), () => {
      j.forEach((M, b) => {
        (N[b] ?? !1) || M.removeAttribute("inert");
      }), $ !== null && $.isConnected && $.focus();
    };
  }, []), le.useEffect(() => {
    const $ = (j) => {
      if (j.key === "Escape") {
        j.preventDefault(), I.current();
        return;
      }
      if (j.key !== "Tab") return;
      const N = S.current;
      if (N === null) return;
      const M = Array.from(N.querySelectorAll(Oh));
      if (M.length === 0) return;
      const b = M[0], z = M[M.length - 1];
      if (b === void 0 || z === void 0) return;
      const O = document.activeElement;
      O instanceof Node && N.contains(O) ? j.shiftKey && O === b ? (j.preventDefault(), z.focus()) : !j.shiftKey && O === z && (j.preventDefault(), b.focus()) : (j.preventDefault(), (j.shiftKey ? z : b).focus());
    };
    return document.addEventListener("keydown", $), () => document.removeEventListener("keydown", $);
  }, []);
  const P = /* @__PURE__ */ c.jsx("div", { className: "dialog-backdrop", role: "presentation", children: /* @__PURE__ */ c.jsxs("div", { className: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "dialog-h", "aria-describedby": "dialog-d", ref: S, children: [
    /* @__PURE__ */ c.jsx("h2", { id: "dialog-h", className: "dialog-title", children: l }),
    /* @__PURE__ */ c.jsx("div", { id: "dialog-d", className: "dialog-body", children: o }),
    /* @__PURE__ */ c.jsxs("div", { className: "dialog-actions", children: [
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", ref: E, onClick: p, children: a }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: w ? "btn btn-danger" : "btn btn-primary", onClick: f, children: s })
    ] })
  ] }) });
  return vh.createPortal(P, document.body);
}
function bh({ allowed: l }) {
  return /* @__PURE__ */ c.jsxs("ul", { className: "legend", "aria-label": "Legend", children: [
    l.map((o) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx(Nn, { letter: o, size: 20 }),
      " ",
      sn[o],
      " fire"
    ] }, `f-${o}`)),
    l.map((o) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx(cn, { letter: o, size: 20 }),
      " ",
      sn[o],
      " crew"
    ] }, `c-${o}`))
  ] });
}
const St = 100, od = 34;
function on(l, o) {
  if (l === null) return "I";
  const s = jt(l);
  return o < s.n ? qr(s, o) : "I";
}
function Md(l) {
  return l === "I" ? null : l;
}
function zo(l) {
  return To(l.codeId).kind === "wires" ? /* @__PURE__ */ c.jsx(Xh, { ...l }) : /* @__PURE__ */ c.jsx(Mh, { ...l });
}
function Dd({ q: l, center: o, r: s, W: a, H: f, fire: p, crew: w, residual: E, interactive: S, selected: I, budgetReached: P, watchers: $, onToggle: j, onKeyDown: N }) {
  const M = {
    left: `${String(o.x / a * 100)}%`,
    top: `${String(o.y / f * 100)}%`,
    width: `${String(2 * s / a * 100)}%`
  }, b = [`Block ${String(l)}`];
  $.length > 0 && b.push(`watched by ${$.join(", ")}`), E !== null ? E !== "I" ? b.push(`residual ${sn[E]} fire`) : (p !== "I" || w !== null) && b.push("fire out") : p !== "I" && b.push(`${sn[p]} fire`), w !== null && b.push(`${sn[w]} crew`), S && (w === null ? b.push(P ? "no crews left" : `press to send ${I === void 0 ? "a" : sn[I]} crew`) : w === I ? b.push("press to recall the crew") : b.push(`press to switch to ${I === void 0 ? "another" : sn[I]} crew`));
  const z = b.join(", "), O = E !== null, Y = /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("span", { className: "block-label", "aria-hidden": "true", children: l }),
    /* @__PURE__ */ c.jsx("span", { className: "block-center", "aria-hidden": "true", children: O ? E !== "I" ? /* @__PURE__ */ c.jsx(Nn, { letter: E, outlined: !0, size: 30 }) : p !== "I" || w !== null ? /* @__PURE__ */ c.jsx(zh, {}) : null : p !== "I" ? /* @__PURE__ */ c.jsx(Nn, { letter: p, size: 30 }) : null }),
    w !== null ? /* @__PURE__ */ c.jsx("span", { className: "block-crew", "aria-hidden": "true", children: /* @__PURE__ */ c.jsx(cn, { letter: w, size: 24 }) }) : null
  ] }), ye = ["block", p !== "I" ? "is-burning" : "", w !== null ? "has-crew" : "", O && E !== "I" ? "has-residual" : ""].filter(Boolean).join(" ");
  return S ? /* @__PURE__ */ c.jsx(
    "button",
    {
      type: "button",
      className: ye,
      style: M,
      "aria-label": z,
      "aria-pressed": w !== null,
      "data-q": l,
      "data-testid": `block-${String(l)}`,
      onClick: () => j?.(l),
      onKeyDown: (Ee) => N(Ee, l),
      children: Y
    }
  ) : /* @__PURE__ */ c.jsx("div", { className: ye, style: M, role: "img", "aria-label": z, "data-q": l, children: Y });
}
function zh() {
  return /* @__PURE__ */ c.jsx("svg", { width: "26", height: "26", viewBox: "0 0 24 24", "aria-hidden": "true", className: "glyph glyph-out", children: /* @__PURE__ */ c.jsx("path", { d: "M5 12.5l4.2 4.2L19 7.5", fill: "none", stroke: B.success, strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Fd(l) {
  return le.useCallback(
    (o, s) => {
      const a = o.key === "ArrowLeft" ? [-1, 0] : o.key === "ArrowRight" ? [1, 0] : o.key === "ArrowUp" ? [0, -1] : o.key === "ArrowDown" ? [0, 1] : null;
      if (a === null) return;
      o.preventDefault();
      const f = l[s];
      if (f === void 0) return;
      let p = -1, w = 1 / 0;
      if (l.forEach((I, P) => {
        if (P === s) return;
        const $ = I.x - f.x, j = I.y - f.y, N = $ * (a[0] ?? 0) + j * (a[1] ?? 0), M = Math.abs($ * (a[1] ?? 0)) + Math.abs(j * (a[0] ?? 0));
        if (N <= 1) return;
        const b = N + M * 2.5;
        b < w && (w = b, p = P);
      }), p < 0) return;
      o.currentTarget.closest("[data-board]")?.querySelector(`[data-q="${String(p)}"]`)?.focus();
    },
    [l]
  );
}
function Ah(l) {
  const o = Ze(l), s = To(l);
  if (s.kind === "wires") return { centers: [], isLine: !1, W: St, H: St, yShift: 0 };
  const a = s.kind === "line", f = a ? o.n : s.cols, p = a ? 1 : s.rows, w = (f + 1) * St, E = a ? 1.5 * St : (p + 1) * St, S = a ? -0.25 * St : 0;
  return { centers: s.blocks.map((P) => ({ x: (P.col + 1) * St, y: (P.row + 1) * St + S })), isLine: a, W: w, H: E, yShift: S };
}
function Mh(l) {
  const o = Ze(l.codeId), s = To(l.codeId), { centers: a, isLine: f, W: p, H: w, yShift: E } = Ah(l.codeId), S = Fd(a);
  if (s.kind === "wires") return null;
  const I = (j) => {
    const N = s.checkPositions[j] ?? { row: 0, col: 0 };
    return { x: (N.col + 1) * St, y: (N.row + 1) * St + (f ? -0.52 * St : 0) };
  }, P = (j) => l.syndrome !== null && (l.syndrome[j] ?? 0) === 1, $ = f ? 15 : 18;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: `board board-grid board-${l.codeId}`,
      style: { aspectRatio: `${String(p)} / ${String(w)}` },
      role: "group",
      "aria-label": l.ariaLabel ?? `${o.name} dispatch board`,
      "aria-describedby": l.ariaDescribedBy,
      "data-board": !0,
      children: [
        /* @__PURE__ */ c.jsxs("svg", { className: "board-svg", viewBox: `0 0 ${String(p)} ${String(w)}`, "aria-hidden": "true", focusable: "false", children: [
          o.checks.map((j, N) => {
            const M = I(j.id), b = { x: M.x, y: M.y + E };
            return j.qubits.map((z) => {
              const O = a[z];
              return O === void 0 ? null : /* @__PURE__ */ c.jsx(
                "line",
                {
                  x1: b.x,
                  y1: b.y,
                  x2: O.x,
                  y2: O.y,
                  stroke: P(N) ? B.alarm : B.lineStrong,
                  strokeWidth: P(N) ? 3 : 1.5,
                  strokeOpacity: P(N) ? 0.85 : 1,
                  strokeDasharray: P(N) ? void 0 : "4 4"
                },
                `${j.id}-${String(z)}`
              );
            });
          }),
          a.map((j, N) => /* @__PURE__ */ c.jsx("circle", { cx: j.x, cy: j.y, r: od, fill: B.panel, stroke: B.lineStrong, strokeWidth: "2" }, N)),
          o.checks.map((j, N) => {
            const M = I(j.id);
            return /* @__PURE__ */ c.jsx("g", { transform: `translate(${String(M.x)} ${String(M.y + E)})`, className: "station", "data-station": j.id, children: /* @__PURE__ */ c.jsx(bd, { type: j.type, ringing: P(N), r: $ }) }, j.id);
          })
        ] }),
        a.map((j, N) => /* @__PURE__ */ c.jsx(
          Dd,
          {
            q: N,
            center: j,
            r: od,
            W: p,
            H: w,
            fire: on(l.fires, N),
            crew: l.placements?.[N] ?? Md(on(l.crews, N)),
            residual: l.residual === null ? null : on(l.residual, N),
            interactive: l.interactive,
            selected: l.selected,
            budgetReached: l.budgetReached ?? !1,
            watchers: jh(l.codeId, N),
            onToggle: l.onToggle,
            onKeyDown: S
          },
          N
        ))
      ]
    }
  );
}
const ud = 80, jo = 70, Kn = 48, Dh = 118, vo = 30;
function Jn(l) {
  return Dh + l * jo;
}
function Fh({ g: l, wireY: o }) {
  switch (l.kind) {
    case "H":
    case "S": {
      const s = o(l.q);
      return /* @__PURE__ */ c.jsxs("g", { children: [
        /* @__PURE__ */ c.jsx("rect", { x: -18, y: s - 18, width: 36, height: 36, rx: 6, fill: B.panel, stroke: B.text, strokeWidth: "2" }),
        /* @__PURE__ */ c.jsx("text", { y: s + 6, textAnchor: "middle", fontSize: "18", fontWeight: "700", fill: B.text, fontFamily: "system-ui, sans-serif", children: l.kind })
      ] });
    }
    case "CNOT": {
      const s = o(l.c), a = o(l.t);
      return /* @__PURE__ */ c.jsxs("g", { children: [
        /* @__PURE__ */ c.jsx("line", { x1: 0, y1: s, x2: 0, y2: a, stroke: B.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ c.jsx("circle", { cy: s, r: 7, fill: B.text }),
        /* @__PURE__ */ c.jsx("circle", { cy: a, r: 15, fill: B.navy, stroke: B.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ c.jsx("line", { x1: -15, y1: a, x2: 15, y2: a, stroke: B.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ c.jsx("line", { x1: 0, y1: a - 15, x2: 0, y2: a + 15, stroke: B.text, strokeWidth: "2.5" })
      ] });
    }
    case "CZ": {
      const s = o(l.a), a = o(l.b);
      return /* @__PURE__ */ c.jsxs("g", { children: [
        /* @__PURE__ */ c.jsx("line", { x1: 0, y1: s, x2: 0, y2: a, stroke: B.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ c.jsx("circle", { cy: s, r: 7, fill: B.text }),
        /* @__PURE__ */ c.jsx("circle", { cy: a, r: 7, fill: B.text })
      ] });
    }
    case "SWAP": {
      const s = o(l.a), a = o(l.b), f = (p) => /* @__PURE__ */ c.jsxs("g", { children: [
        /* @__PURE__ */ c.jsx("line", { x1: -9, y1: p - 9, x2: 9, y2: p + 9, stroke: B.text, strokeWidth: "2.5" }),
        /* @__PURE__ */ c.jsx("line", { x1: -9, y1: p + 9, x2: 9, y2: p - 9, stroke: B.text, strokeWidth: "2.5" })
      ] }, p);
      return /* @__PURE__ */ c.jsxs("g", { children: [
        /* @__PURE__ */ c.jsx("line", { x1: 0, y1: s, x2: 0, y2: a, stroke: B.text, strokeWidth: "2.5" }),
        f(s),
        f(a)
      ] });
    }
  }
}
function ad({ x: l, y: o, letter: s, size: a = 34 }) {
  const f = a / 24, p = s === "Y" ? "url(#wire-split)" : B[s];
  return /* @__PURE__ */ c.jsxs("g", { transform: `translate(${String(l - a / 2)} ${String(o - a / 2)}) scale(${String(f)})`, className: `token token-${s}`, children: [
    /* @__PURE__ */ c.jsx("circle", { cx: "12", cy: "12", r: "13", fill: B.navy, stroke: B.line, strokeWidth: "1.2" }),
    /* @__PURE__ */ c.jsx("path", { d: "M12 1.5c1.3 4.4 4.6 8.6 4.6 13.9a4.6 4.6 0 0 1-9.2 0c0-3 2-4.6 2-7 0-1.1-.5-1.9-.8-2.5 1.5.6 2.2 1.9 2.4 2.8C11.8 7 12 4.6 12 1.5Z", fill: p, stroke: "rgba(0,0,0,0.35)", strokeWidth: "0.8" }),
    /* @__PURE__ */ c.jsx("text", { x: "12", y: "22.6", textAnchor: "middle", fontSize: "6.5", fontWeight: "700", fill: B.text, fontFamily: "system-ui, sans-serif", children: s })
  ] });
}
function Xh(l) {
  const s = Ze(l.codeId).n, a = l.circuit.length, f = Jn(a) + 10, p = f + vo + 24, w = ud * s + 40, E = (z) => 60 + z * ud, S = Array.from({ length: s }, (z, O) => ({ x: f, y: E(O) })), I = Fd(S), P = l.gateCursor ?? a, $ = P >= a, j = P < 0 ? (Kn + Jn(0)) / 2 + 6 : Jn(P) + jo / 2, N = P < 0 ? (Kn + Jn(0)) / 2 + 6 : Jn(P) + jo / 2, M = l.fires, b = !$ && M !== null;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: "board board-wires",
      style: { aspectRatio: `${String(p)} / ${String(w)}` },
      role: "group",
      "aria-label": l.ariaLabel ?? "Circuit board",
      "aria-describedby": l.ariaDescribedBy,
      "data-board": !0,
      children: [
        /* @__PURE__ */ c.jsxs("svg", { className: "board-svg", viewBox: `0 0 ${String(p)} ${String(w)}`, "aria-hidden": "true", focusable: "false", children: [
          /* @__PURE__ */ c.jsx("defs", { children: /* @__PURE__ */ c.jsxs("linearGradient", { id: "wire-split", x1: "0", x2: "1", y1: "0", y2: "0", children: [
            /* @__PURE__ */ c.jsx("stop", { offset: "0", stopColor: B.X }),
            /* @__PURE__ */ c.jsx("stop", { offset: "0.5", stopColor: B.X }),
            /* @__PURE__ */ c.jsx("stop", { offset: "0.5", stopColor: B.Z }),
            /* @__PURE__ */ c.jsx("stop", { offset: "1", stopColor: B.Z })
          ] }) }),
          Array.from({ length: s }, (z, O) => /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx("line", { x1: Kn, y1: E(O), x2: f, y2: E(O), stroke: B.lineStrong, strokeWidth: "3" }),
            /* @__PURE__ */ c.jsxs("text", { x: Kn - 30, y: E(O) + 5, fontSize: "14", fill: B.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: [
              "q",
              O
            ] })
          ] }, O)),
          l.circuit.map((z, O) => /* @__PURE__ */ c.jsx("g", { transform: `translate(${String(Jn(O))} 0)`, className: O <= P ? "gate is-done" : "gate", opacity: l.gateCursor === void 0 || O <= P ? 1 : 0.55, children: /* @__PURE__ */ c.jsx(Fh, { g: z, wireY: E }) }, O)),
          l.gateCursor !== void 0 && !$ ? /* @__PURE__ */ c.jsx("line", { x1: N, y1: 18, x2: N, y2: w - 18, stroke: B.alarm, strokeWidth: "2", strokeDasharray: "6 5", className: "time-cursor" }) : null,
          l.inputFires !== null && l.inputFires !== void 0 ? Array.from({ length: s }, (z, O) => {
            const Y = on(l.inputFires ?? null, O);
            return Y === "I" ? null : /* @__PURE__ */ c.jsx(ad, { x: Kn, y: E(O), letter: Y, size: 30 }, `in-${String(O)}`);
          }) : null,
          b ? Array.from({ length: s }, (z, O) => {
            const Y = on(M, O);
            return Y === "I" ? null : /* @__PURE__ */ c.jsx(ad, { x: j, y: E(O), letter: Y }, `tok-${String(O)}`);
          }) : null,
          S.map((z, O) => /* @__PURE__ */ c.jsx("circle", { cx: z.x, cy: z.y, r: vo, fill: B.panel, stroke: B.lineStrong, strokeWidth: "2" }, O)),
          /* @__PURE__ */ c.jsx("text", { x: Kn, y: w - 8, fontSize: "12", fill: B.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: "start" }),
          /* @__PURE__ */ c.jsx("text", { x: f, y: w - 8, fontSize: "12", fill: B.muted, fontFamily: "system-ui, sans-serif", textAnchor: "middle", children: "end" })
        ] }),
        S.map((z, O) => /* @__PURE__ */ c.jsx(
          Dd,
          {
            q: O,
            center: z,
            r: vo,
            W: p,
            H: w,
            fire: $ ? on(M, O) : "I",
            crew: l.placements?.[O] ?? Md(on(l.crews, O)),
            residual: l.residual === null ? null : on(l.residual, O),
            interactive: l.interactive,
            selected: l.selected,
            budgetReached: l.budgetReached ?? !1,
            watchers: [],
            onToggle: l.onToggle,
            onKeyDown: I
          },
          O
        ))
      ]
    }
  );
}
function Wh({ state: l, dispatch: o, mission: s }) {
  const a = s.training[l.lesson], f = le.useId();
  if (a === void 0) return null;
  const p = Ze(s.code), w = jt(a.fire), E = Io(w, a.circuit), S = l.lessonCursor, I = E.frames[S + 1] ?? w, P = he(I), $ = a.circuit.length > 0 || p.checks.length === 0, j = p.checks.length > 0 ? an(lr(p, I)) : null, N = s.training.length, M = S >= a.circuit.length - 1, b = l.lesson === N - 1, z = M ? b ? "Start dispatch" : "Next lesson" : "Next step";
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-play", children: [
    /* @__PURE__ */ c.jsx(
      Mt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: `Training · lesson ${String(l.lesson + 1)} of ${String(N)} · fires visible`,
        onMissions: () => o({ type: "OPEN_MISSIONS" }),
        onSettings: () => o({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ c.jsxs("section", { className: "board-col", "aria-label": "Training board", children: [
        /* @__PURE__ */ c.jsx(
          zo,
          {
            codeId: s.code,
            circuit: a.circuit,
            fires: P,
            crews: null,
            residual: null,
            syndrome: j,
            interactive: !1,
            gateCursor: $ ? S : void 0,
            inputFires: $ ? a.fire : null,
            ariaDescribedBy: f,
            ariaLabel: "Training board, fires visible"
          }
        ),
        /* @__PURE__ */ c.jsxs("p", { className: "board-caption", id: f, "aria-live": "polite", "data-testid": "training-caption", children: [
          a.circuit.length > 0 ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsxs("strong", { children: [
              S < 0 ? "Start: " : `After gate ${String(S + 1)} of ${String(a.circuit.length)}: `,
              P
            ] }),
            " "
          ] }) : null,
          a.caption
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("aside", { className: "panel", children: [
        p.checks.length > 0 ? /* @__PURE__ */ c.jsx(bo, { codeId: s.code, syndrome: j }) : null,
        /* @__PURE__ */ c.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ c.jsx("h2", { className: "panel-title", children: "Lesson" }),
          /* @__PURE__ */ c.jsx("ol", { className: "lesson-dots", "aria-label": "Lessons", children: s.training.map((O, Y) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx("button", { type: "button", className: `dot ${Y === l.lesson ? "is-current" : ""}`, "aria-current": Y === l.lesson ? "step" : void 0, onClick: () => o({ type: "LESSON_SELECT", lesson: Y }), "aria-label": `Lesson ${String(Y + 1)}: ${Sh(O.fire)}`, children: Y + 1 }) }, Y)) }),
          /* @__PURE__ */ c.jsx(bh, { allowed: s.allowed })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => o({ type: "LESSON_PREV" }), disabled: l.lesson === 0 && S <= -1, "data-testid": "training-prev", children: "Prev" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => o({ type: "LESSON_NEXT" }), "data-testid": "training-next", children: z }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => o({ type: "START_CHALLENGE" }), "data-testid": "start-challenge", children: "Skip to dispatch" })
        ] })
      ] })
    ] })
  ] });
}
function Uh({ mission: l, placements: o, selected: s, standDownDialog: a, dispatch: f }) {
  const p = le.useId(), w = le.useRef(null), E = Hr(o), S = E >= l.budget, I = l.kind === "propagation", P = I ? null : l.syndrome;
  le.useEffect(() => {
    const j = (N) => {
      if (a || N.metaKey || N.ctrlKey || N.altKey) return;
      const M = N.target instanceof HTMLElement ? N.target : null, b = w.current;
      if (M === null || b === null || !b.contains(M) || M.tagName === "INPUT" || M.tagName === "TEXTAREA") return;
      const O = { 1: "X", 2: "Z", 3: "Y" }[N.key];
      if (O !== void 0) {
        l.allowed.includes(O) && f({ type: "SELECT_LETTER", letter: O }), N.preventDefault();
        return;
      }
      if (N.key === "Backspace" || N.key === "Delete") {
        const Y = M.closest("button.block[data-q]"), ye = Y === null ? NaN : Number(Y.dataset.q);
        Number.isInteger(ye) ? f({ type: "RECALL_BLOCK", qubit: ye }) : f({ type: "CLEAR_CREWS" }), N.preventDefault();
        return;
      }
      (N.key === "c" || N.key === "C") && (f({ type: "CONFIRM" }), N.preventDefault());
    };
    return document.addEventListener("keydown", j), () => document.removeEventListener("keydown", j);
  }, [f, l.allowed, a]);
  const $ = l.visibleStart === null ? [] : Array.from(l.visibleStart).map((j, N) => ({ q: N, l: j })).filter((j) => j.l !== "I");
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-play screen-challenge", ref: w, children: [
    /* @__PURE__ */ c.jsx(
      Mt,
      {
        title: `Mission ${String(l.index)} · ${l.title}`,
        subtitle: I ? "Dispatch · predict where the fires end up" : "Dispatch · fires hidden, alarms live",
        onMissions: () => f({ type: "OPEN_MISSIONS" }),
        onSettings: () => f({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "play-layout play-layout-challenge", children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "panel panel-before", children: [
        I ? null : /* @__PURE__ */ c.jsx(bo, { codeId: l.code, syndrome: P }),
        /* @__PURE__ */ c.jsx(_h, { allowed: l.allowed, selected: s, onSelect: (j) => f({ type: "SELECT_LETTER", letter: j }) })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: "board-col", "aria-label": "Dispatch board", children: [
        /* @__PURE__ */ c.jsx(
          zo,
          {
            codeId: l.code,
            circuit: l.circuit,
            fires: null,
            crews: null,
            placements: o,
            residual: null,
            syndrome: P,
            interactive: !0,
            onToggle: (j) => f({ type: "TOGGLE_BLOCK", qubit: j }),
            selected: s,
            budgetReached: S,
            inputFires: I ? l.visibleStart : null,
            ariaDescribedBy: p
          }
        ),
        /* @__PURE__ */ c.jsxs("p", { className: "board-caption", id: p, children: [
          I ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            "Starting fire: ",
            $.map((j) => `${j.l} on q${String(j.q)}`).join(", "),
            ". The fires travel through the circuit; send crews to where they",
            /* @__PURE__ */ c.jsx("em", { children: " end up" }),
            "."
          ] }) : Oo(l.code, P),
          " ",
          /* @__PURE__ */ c.jsx("span", { className: "muted", children: "Tap a block to send the selected crew; tap again to recall it." })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("aside", { className: "panel panel-after", children: [
        /* @__PURE__ */ c.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ c.jsx("h2", { className: "panel-title", children: "Dispatch" }),
          /* @__PURE__ */ c.jsxs("p", { className: "budget", "data-testid": "budget", "aria-live": "polite", children: [
            "Crews: ",
            /* @__PURE__ */ c.jsx("strong", { children: E }),
            " / ",
            l.budget,
            S ? /* @__PURE__ */ c.jsx("span", { className: "muted", children: " · budget reached" }) : null
          ] }),
          /* @__PURE__ */ c.jsxs("ul", { className: "placement-list", "aria-label": "Placed crews", children: [
            Object.entries(o).sort(([j], [N]) => Number(j) - Number(N)).map(([j, N]) => /* @__PURE__ */ c.jsxs("li", { children: [
              /* @__PURE__ */ c.jsx(cn, { letter: N, size: 18 }),
              " ",
              N,
              " crew → block ",
              j
            ] }, j)),
            E === 0 ? /* @__PURE__ */ c.jsx("li", { className: "muted", children: "No crews placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "actions actions-sticky", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => f({ type: "CLEAR_CREWS" }), disabled: E === 0, children: "Clear" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => f({ type: "CONFIRM" }), "data-testid": "confirm", children: "Confirm dispatch" })
        ] })
      ] })
    ] }),
    a ? /* @__PURE__ */ c.jsx(Ad, { title: "Stand down with no crews?", confirmLabel: "Stand down", cancelLabel: "Keep dispatching", onConfirm: () => f({ type: "STAND_DOWN_CONFIRM" }), onCancel: () => f({ type: "STAND_DOWN_CANCEL" }), children: /* @__PURE__ */ c.jsx("p", { children: "You are about to confirm without sending any crew. Whatever is burning stays burning." }) }) : null
  ] });
}
function Zh({ state: l, dispatch: o, mission: s, debrief: a, bridge: f }) {
  const p = a.steps[l.replayIndex] ?? a.steps[a.steps.length - 1], w = le.useId(), E = Ze(s.code);
  if (p === void 0) return null;
  const S = a.steps.length - 1, I = s.kind === "propagation", P = jt(a.residual), $ = Array.from({ length: E.n }, (N, M) => M).filter((N) => qr(P, N) !== "I"), j = a.verdict === "success" ? "preserved" : a.verdict === "detectable" ? "undecided — alarms still ringing" : I ? `missed — fires left on ${$.length === 1 ? "block" : "blocks"} ${$.join(", ")}` : `flipped (${[a.logicalFlip.x.some(Boolean) ? "X̄" : null, a.logicalFlip.z.some(Boolean) ? "Z̄" : null].filter(Boolean).join(" and ")})`;
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-play screen-debrief", children: [
    /* @__PURE__ */ c.jsx(
      Mt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: "Debrief · everything revealed",
        onMissions: () => o({ type: "OPEN_MISSIONS" }),
        onSettings: () => o({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ c.jsxs("section", { className: "board-col", "aria-label": "Replay board", children: [
        /* @__PURE__ */ c.jsx(Th, { verdict: a.verdict, label: a.verdictLabel }),
        /* @__PURE__ */ c.jsx(
          zo,
          {
            codeId: s.code,
            circuit: s.circuit,
            fires: p.fires,
            crews: p.crews,
            residual: p.residual,
            syndrome: p.syndrome,
            interactive: !1,
            gateCursor: I ? p.gateCursor : void 0,
            inputFires: I ? a.startFires : null,
            ariaDescribedBy: w,
            ariaLabel: "Replay board"
          }
        ),
        /* @__PURE__ */ c.jsxs("p", { className: "board-caption", id: w, "aria-live": "polite", "data-testid": "replay-caption", children: [
          /* @__PURE__ */ c.jsxs("strong", { children: [
            "Step ",
            l.replayIndex + 1,
            " of ",
            a.steps.length,
            " · ",
            cd[p.id.startsWith("gate-") ? "gate" : p.id] ?? p.id,
            "."
          ] }),
          " ",
          p.caption
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "replay-controls", role: "group", "aria-label": "Replay controls", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => o({ type: "REPLAY_PREV" }), disabled: l.replayIndex === 0, "data-testid": "replay-prev", children: "Prev" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => o({ type: "REPLAY_NEXT" }), disabled: l.replayIndex === S, "data-testid": "replay-next", children: "Next" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: `btn ${l.autoPlay ? "is-active" : ""}`, "aria-pressed": l.autoPlay, onClick: () => o({ type: "REPLAY_AUTO", on: !l.autoPlay }), "data-testid": "replay-auto", children: "Auto-play" }),
          /* @__PURE__ */ c.jsx("ol", { className: "step-dots", "aria-label": "Replay steps", children: a.steps.map((N, M) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx("button", { type: "button", className: `dot ${M === l.replayIndex ? "is-current" : ""}`, "aria-current": M === l.replayIndex ? "step" : void 0, onClick: () => o({ type: "REPLAY_GOTO", index: M }), "aria-label": `Step ${String(M + 1)}: ${cd[N.id.startsWith("gate-") ? "gate" : N.id] ?? N.id}`, children: M + 1 }) }, N.id)) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("aside", { className: "panel", children: [
        /* @__PURE__ */ c.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ c.jsx("h2", { className: "panel-title", children: "Report" }),
          /* @__PURE__ */ c.jsxs("dl", { className: "facts", children: [
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "True fires" }),
              /* @__PURE__ */ c.jsx("dd", { className: "mono", children: a.fires })
            ] }),
            I ? /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "Started as" }),
              /* @__PURE__ */ c.jsx("dd", { className: "mono", children: a.startFires })
            ] }) : null,
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "Your crews" }),
              /* @__PURE__ */ c.jsx("dd", { className: "mono", children: a.crews })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "Residual" }),
              /* @__PURE__ */ c.jsxs("dd", { className: "mono", "data-testid": "residual", children: [
                a.residual,
                $.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: "muted", children: [
                  " · blocks ",
                  $.join(", ")
                ] }) : /* @__PURE__ */ c.jsx("span", { className: "muted", children: " · nothing left" })
              ] })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "Logical" }),
              /* @__PURE__ */ c.jsx("dd", { children: j })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("dt", { children: "Decision" }),
              /* @__PURE__ */ c.jsxs("dd", { children: [
                _d[a.score.quality],
                " · ",
                /* @__PURE__ */ c.jsx(Qr, { count: a.score.stars, max: a.score.maxStars, size: 16 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ c.jsx("p", { className: "narrative", "data-testid": "narrative", children: a.narrative })
        ] }),
        E.checks.length > 0 ? /* @__PURE__ */ c.jsx(bo, { codeId: s.code, syndrome: p.syndrome, compact: !0 }) : null,
        /* @__PURE__ */ c.jsxs("section", { className: "panel-section whatif", "data-testid": "whatif", children: [
          /* @__PURE__ */ c.jsx("h2", { className: "panel-title", children: "What if" }),
          /* @__PURE__ */ c.jsxs("p", { children: [
            "Minimum-weight dispatch for these alarms: ",
            /* @__PURE__ */ c.jsx("span", { className: "mono", children: a.whatIf.decoderCrews }),
            " → ",
            $d(a.whatIf.decoderVerdict, E.checks.length > 0),
            "."
          ] }),
          a.whatIf.trueFireCrews !== null ? /* @__PURE__ */ c.jsxs("p", { children: [
            "Crews matching the true fires: ",
            /* @__PURE__ */ c.jsx("span", { className: "mono", children: a.whatIf.trueFireCrews }),
            " → Logical qubit safe."
          ] }) : null,
          /* @__PURE__ */ c.jsx("p", { className: "muted", children: a.whatIf.explanation })
        ] }),
        /* @__PURE__ */ c.jsx(Bh, { bridge: f, missionId: s.id, correction: a.crews }, `${s.id}:${a.crews}`),
        /* @__PURE__ */ c.jsxs("div", { className: "actions actions-sticky", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => o({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: "Try again" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => o({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: "Result" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => o({ type: "NEXT_MISSION" }), "data-testid": "debrief-next", children: "Next mission" })
        ] })
      ] })
    ] })
  ] });
}
const cd = {
  placed: "Fires placed",
  gate: "Gate",
  alarms: "Alarms",
  dispatch: "Your dispatch",
  residual: "Residual",
  verdict: "Verdict"
};
function Bh({ bridge: l, missionId: o, correction: s }) {
  const [a, f] = le.useState({ kind: "idle" }), p = l.cached(o), w = Ld(l.cached(o, s), o, s), E = Array.from(new Set(p.map(($) => $.correction))).filter(($) => !w.some((j) => j.correction === $)), S = l.kind === "qollab" && typeof l.run == "function", I = l.jobsRemaining?.() ?? 0, P = async () => {
    if (!S || l.run === void 0) return;
    f({ kind: "running" });
    const $ = await l.run({ missionId: o, correction: s, shots: 100 });
    f({ kind: "done", result: $ });
  };
  return /* @__PURE__ */ c.jsxs("section", { className: "panel-section cloud", "data-testid": "cloud-panel", children: [
    /* @__PURE__ */ c.jsx("h2", { className: "panel-title", children: "Quantum verification" }),
    /* @__PURE__ */ c.jsxs("p", { className: "muted small", children: [
      "The verdict above is exact Pauli-frame algebra computed locally. Circuit-level runs (Qiskit) are labelled by where they ran and are never invented. Only runs of this dispatch (",
      /* @__PURE__ */ c.jsx("span", { className: "mono", children: s }),
      ", or crews equivalent to it) are shown."
    ] }),
    w.length === 0 && a.kind === "idle" ? /* @__PURE__ */ c.jsxs("p", { className: "cloud-empty", "data-testid": "cloud-empty", children: [
      "No cloud result recorded for this dispatch",
      E.length > 0 ? ` (recorded dispatches: ${E.join(", ")})` : "",
      "."
    ] }) : null,
    w.map(($, j) => /* @__PURE__ */ c.jsx(dd, { result: $ }, `${$.startedAt}-${String(j)}`)),
    a.kind === "running" ? /* @__PURE__ */ c.jsxs("p", { className: "cloud-running", role: "status", children: [
      "Running on ",
      l.backendName ?? "the selected backend",
      " (100 shots)…"
    ] }) : null,
    a.kind === "done" ? a.result.status === "ok" ? /* @__PURE__ */ c.jsx(dd, { result: a.result }) : /* @__PURE__ */ c.jsxs("p", { className: "cloud-error", role: "alert", children: [
      "Verification failed: ",
      a.result.message
    ] }) : null,
    S ? /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn", onClick: () => void P(), disabled: a.kind === "running" || I <= 0, children: I <= 0 ? "No job left in this run" : `Verify on ${l.backendName ?? "selected backend"} (100 shots)` }) : null
  ] });
}
function dd({ result: l }) {
  const o = Object.values(l.counts).reduce((a, f) => a + f, 0), s = Object.entries(l.counts).sort(([, a], [, f]) => f - a).slice(0, 5);
  return /* @__PURE__ */ c.jsxs("div", { className: `cloud-card cloud-${l.source}`, "data-testid": "cloud-card", children: [
    /* @__PURE__ */ c.jsxs("p", { className: "cloud-source", children: [
      /* @__PURE__ */ c.jsx("span", { className: "tag", children: oh[l.source] }),
      " ",
      l.backendName,
      " · ",
      l.shots,
      " shots · ",
      new Date(l.finishedAt).toISOString().slice(0, 16).replace("T", " "),
      " UTC"
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: "cloud-dispatch small", children: [
      "Recorded crews: ",
      /* @__PURE__ */ c.jsx("span", { className: "mono", children: l.correction }),
      " · Job id: ",
      /* @__PURE__ */ c.jsx("span", { className: "mono", children: l.jobId ?? "none (local run)" })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: "counts", children: s.map(([a, f]) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("span", { className: "mono", children: a }),
      " ",
      /* @__PURE__ */ c.jsx("span", { className: "muted", children: f }),
      " ",
      /* @__PURE__ */ c.jsx("span", { className: "bar", style: { width: `${String(o > 0 ? f / o * 100 : 0)}%` }, "aria-hidden": "true" })
    ] }, a)) }),
    /* @__PURE__ */ c.jsx("dl", { className: "facts small cloud-facts", children: Vh(l).map(([a, f]) => /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("dt", { children: a }),
      /* @__PURE__ */ c.jsx("dd", { children: f })
    ] }, a)) })
  ] });
}
function Vh(l) {
  const o = [], s = ai(l.analysis) ? l.analysis : {}, a = ai(l.prediction) ? l.prediction : {}, f = (j) => typeof j == "number" ? `${String(Math.round(j * 100))}%` : null, p = (j) => Array.isArray(j) && j.every((N) => N === 0 || N === 1) ? j.map(String).join("") : null, w = p(s.dominantSyndrome), E = p(a.syndrome);
  w !== null && o.push(["Dominant alarm pattern", E !== null ? `${w} (predicted ${E})` : w]);
  const S = f(s.predictedSyndromeShare);
  S !== null && o.push(["Shots with the predicted alarms", S]);
  const I = s.predictedLogicalShare;
  Array.isArray(I) && typeof I[0] == "number" && o.push(["Shots with the predicted logical bit", f(I[0]) ?? "—"]);
  const P = s.dominantMatches;
  if (ai(P)) {
    const j = Object.values(P).every((N) => N === !0 || N === null);
    o.push(["Dominant outcome agrees with the verdict", j ? "yes" : "no"]);
  }
  const $ = s.exactMatchesIdealModel ?? s.matches;
  return ai($) && o.push(["Exact match with the noiseless model", Object.values($).every((j) => j === !0 || j === null) ? "yes" : "no (expected under a noise model)"]), typeof a.verdict == "string" && o.push(["Pauli-frame verdict", a.verdict]), typeof s.readoutBasis == "string" && typeof s.prep == "string" && o.push(["Prepared / readout", `logical |${s.prep}⟩ / ${s.readoutBasis} basis`]), o;
}
function ai(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
function Hh({ state: l, dispatch: o }) {
  const s = Lo(l.progress);
  return /* @__PURE__ */ c.jsx("main", { className: "screen screen-title", children: /* @__PURE__ */ c.jsxs("div", { className: "title-card", children: [
    /* @__PURE__ */ c.jsx(kh, { size: 96 }),
    /* @__PURE__ */ c.jsxs("h1", { className: "title-h", tabIndex: -1, "data-focus-target": !0, children: [
      "Q11 ",
      /* @__PURE__ */ c.jsx("span", { className: "title-dash", children: "—" }),
      " Quantum Emergency Response"
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: "title-lead", children: "Read the alarms, dispatch the firefighters, protect the logical qubit." }),
    /* @__PURE__ */ c.jsxs("div", { className: "title-actions", children: [
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => o({ type: "PLAY" }), "data-testid": "play", children: "Play" }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-large", onClick: () => o({ type: "OPEN_HOW" }), children: "How it works" }),
      /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost btn-icon btn-large", onClick: () => o({ type: "OPEN_SETTINGS" }), "aria-label": "Settings", children: /* @__PURE__ */ c.jsx(zd, {}) })
    ] }),
    s > 0 ? /* @__PURE__ */ c.jsxs("p", { className: "muted title-progress", children: [
      "Progress: ",
      s,
      " of ",
      Ro(),
      " stars."
    ] }) : null,
    /* @__PURE__ */ c.jsx("p", { className: "title-foot muted", children: "Qollab × IonQ Global Quantum Hackathon 2026 entry. This effort is supported by Qollab & IonQ." })
  ] }) });
}
function qh({ dispatch: l }) {
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ c.jsx(Mt, { title: "How it works", onSettings: () => l({ type: "OPEN_SETTINGS" }), onTitle: () => l({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ c.jsxs("article", { className: "doc", children: [
      /* @__PURE__ */ c.jsxs("p", { children: [
        "Q11 is a ",
        /* @__PURE__ */ c.jsx("strong", { children: "fire-dispatch metaphor" }),
        " for quantum error correction. Nothing here is about real fires or real firefighting; every fire, alarm and crew is a piece of quantum algebra."
      ] }),
      /* @__PURE__ */ c.jsxs("dl", { className: "how-list", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Blocks" }),
          /* @__PURE__ */ c.jsx("dd", { children: "Qubits. The number is the qubit index." })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsxs("dt", { children: [
            "Fires ",
            /* @__PURE__ */ c.jsx(Nn, { letter: "X", size: 20 }),
            " ",
            /* @__PURE__ */ c.jsx(Nn, { letter: "Z", size: 20 }),
            " ",
            /* @__PURE__ */ c.jsx(Nn, { letter: "Y", size: 20 })
          ] }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            "Pauli errors lit by an arsonist called ",
            /* @__PURE__ */ c.jsx("em", { children: "Noise" }),
            ". Red = X, blue = Z, split red-and-blue = Y (= X and Z at once)."
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsxs("dt", { children: [
            "Alarm stations ",
            /* @__PURE__ */ c.jsx(So, { type: "Z", ringing: !1 }),
            " ",
            /* @__PURE__ */ c.jsx(So, { type: "X", ringing: !1 })
          ] }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            "Stabilizer checks that stand between blocks. A ",
            /* @__PURE__ */ c.jsx("strong", { children: "diamond Z station" }),
            " rings when an ",
            /* @__PURE__ */ c.jsx("em", { children: "odd" }),
            " number of its blocks carry a red (X or Y) fire; a ",
            /* @__PURE__ */ c.jsx("strong", { children: "square X station" }),
            " rings for an odd number of blue (Z or Y) fires. A station never rings just because a fire is nearby, and it never says which block is burning."
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsxs("dt", { children: [
            "Crews ",
            /* @__PURE__ */ c.jsx(cn, { letter: "X", size: 20 }),
            " ",
            /* @__PURE__ */ c.jsx(cn, { letter: "Z", size: 20 }),
            " ",
            /* @__PURE__ */ c.jsx(cn, { letter: "Y", size: 20 })
          ] }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            "Corrections. A red crew on a red fire puts it out (X·X = I). A red crew on a safe block ",
            /* @__PURE__ */ c.jsx("em", { children: "lights" }),
            " a red fire. Fires and crews combine by XOR, never by “more is better”."
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Gates" }),
          /* @__PURE__ */ c.jsx("dd", { children: "Fires move only through gates. CNOT copies red forward (control → target) and blue backward (target → control). H swaps red and blue on its own wire." })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Verdict" }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            "After you confirm, the residual R = crews ⊕ fires is judged by the code’s algebra: ",
            /* @__PURE__ */ c.jsx("strong", { children: "Logical qubit safe" }),
            " if R is a stabilizer; ",
            /* @__PURE__ */ c.jsx("strong", { children: "Silent failure" }),
            " if every alarm is quiet but R acts as a logical operator; ",
            /* @__PURE__ */ c.jsx("strong", { children: "Fires still burning" }),
            " if any station still rings. Quiet alarms alone are never proof of safety."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("h2", { children: "Controls" }),
      /* @__PURE__ */ c.jsxs("ul", { className: "plain-list", children: [
        /* @__PURE__ */ c.jsx("li", { children: "Tap or click a block to send the selected crew; tap again to recall it." }),
        /* @__PURE__ */ c.jsxs("li", { children: [
          "Keyboard (while focus is inside the dispatch screen): ",
          /* @__PURE__ */ c.jsx("kbd", { children: "1" }),
          "/",
          /* @__PURE__ */ c.jsx("kbd", { children: "2" }),
          "/",
          /* @__PURE__ */ c.jsx("kbd", { children: "3" }),
          " select X/Z/Y crews, arrows move between blocks and between crew colours, ",
          /* @__PURE__ */ c.jsx("kbd", { children: "Enter" }),
          " or ",
          /* @__PURE__ */ c.jsx("kbd", { children: "Space" }),
          " toggles a crew, ",
          /* @__PURE__ */ c.jsx("kbd", { children: "Backspace" }),
          " recalls the focused block’s crew (or every crew when no block is focused), ",
          /* @__PURE__ */ c.jsx("kbd", { children: "C" }),
          " confirms."
        ] }),
        /* @__PURE__ */ c.jsx("li", { children: "Stars: 3 for the minimum-weight dispatch that succeeds, 2 for a success with extra crews, 1 for the right call on a mission that could not be won (or a near miss with at least one crew sent). Standing down while fires burn scores 0. Mission 6 awards at most 1 star, so the shift totals 16." }),
        /* @__PURE__ */ c.jsx("li", { children: "Sound is off by default; motion follows your system setting and the manual toggle in Settings." })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: "muted small", children: "Model: Clifford + Pauli educational simulation with a perfect-syndrome assumption. The repetition code is an X-noise-only introduction; the main district is a distance-3 rotated surface code." }),
      /* @__PURE__ */ c.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => l({ type: "CLOSE_OVERLAY" }), children: "Back" }) })
    ] })
  ] });
}
const Qh = {
  rep3: "Repetition code · 3 blocks",
  rsc3: "Surface code d=3 · 9 blocks",
  trivial2: "Two bare wires",
  trivial3: "Three bare wires"
};
function er({ state: l, dispatch: o }) {
  const s = Cn();
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-missions", children: [
    /* @__PURE__ */ c.jsx(
      Mt,
      {
        title: "Missions",
        subtitle: `${String(Lo(l.progress))} of ${String(Ro())} stars`,
        onSettings: () => o({ type: "OPEN_SETTINGS" }),
        onTitle: () => o({ type: "OPEN_TITLE" })
      }
    ),
    /* @__PURE__ */ c.jsx("ol", { className: "mission-list", "aria-label": "Missions", children: s.map((a) => {
      const f = l.progress[a.id];
      return /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs("button", { type: "button", className: `mission-card ${f?.completed ? "is-complete" : ""}`, onClick: () => o({ type: "SELECT_MISSION", id: a.id }), "data-testid": `mission-${String(a.index)}`, children: [
        /* @__PURE__ */ c.jsx("span", { className: "mission-index", "aria-hidden": "true", children: a.index }),
        /* @__PURE__ */ c.jsxs("span", { className: "mission-body", children: [
          /* @__PURE__ */ c.jsxs("span", { className: "mission-title", children: [
            /* @__PURE__ */ c.jsxs("span", { className: "sr-only", children: [
              "Mission ",
              a.index,
              ": "
            ] }),
            a.title
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: "mission-meta", children: [
            Qh[a.code] ?? a.code,
            " · ",
            a.kind === "dispatch" ? "dispatch" : "propagation"
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "mission-stars", children: [
          /* @__PURE__ */ c.jsx(Qr, { count: f?.stars ?? 0, max: a.maxStars, size: 18, label: f === void 0 ? `not played yet, up to ${String(a.maxStars)} star${a.maxStars === 1 ? "" : "s"}` : `${String(f.stars)} of ${String(a.maxStars)} stars` }),
          /* @__PURE__ */ c.jsx("span", { className: "mission-status", children: f === void 0 ? "New" : f.completed ? "Complete" : `${String(f.attempts)} attempt${f.attempts === 1 ? "" : "s"}` })
        ] })
      ] }) }, a.id);
    }) })
  ] });
}
function Yh({ state: l, dispatch: o, storageLabel: s, onReset: a }) {
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ c.jsx(Mt, { title: "Settings", onSettings: () => o({ type: "CLOSE_OVERLAY" }), settingsLabel: "Close settings", onTitle: () => o({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ c.jsxs("section", { className: "doc", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "setting-name", id: "set-sound", children: "Sound" }),
          /* @__PURE__ */ c.jsx("p", { className: "muted small", children: "Simple tones for crews, alarms and verdicts. Off by default." })
        ] }),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": l.settings.sound,
            "aria-labelledby": "set-sound",
            className: `switch ${l.settings.sound ? "is-on" : ""}`,
            onClick: () => o({ type: "SET_SOUND", on: !l.settings.sound }),
            "data-testid": "switch-sound",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: "switch-text", children: l.settings.sound ? "On" : "Off" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "setting-name", id: "set-motion", children: "Reduce motion" }),
          /* @__PURE__ */ c.jsx("p", { className: "muted small", children: "Stops the alarm pulse and transitions. Your system “reduce motion” preference is always respected too." })
        ] }),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": l.settings.reducedMotion,
            "aria-labelledby": "set-motion",
            className: `switch ${l.settings.reducedMotion ? "is-on" : ""}`,
            onClick: () => o({ type: "SET_REDUCED_MOTION", on: !l.settings.reducedMotion }),
            "data-testid": "switch-motion",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: "switch-text", children: l.settings.reducedMotion ? "On" : "Off" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "setting-name", children: "Progress" }),
          /* @__PURE__ */ c.jsx("p", { className: "muted small", children: s })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-danger", onClick: a, "data-testid": "reset-progress", children: "Reset progress" })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => o({ type: "CLOSE_OVERLAY" }), children: "Back" }) })
    ] })
  ] });
}
function Gh({ state: l, dispatch: o, mission: s }) {
  const a = Ze(s.code);
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-brief", children: [
    /* @__PURE__ */ c.jsx(
      Mt,
      {
        title: `Mission ${String(s.index)} · ${s.title}`,
        subtitle: "Briefing",
        onMissions: () => o({ type: "OPEN_MISSIONS" }),
        onSettings: () => o({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ c.jsxs("section", { className: "brief", children: [
      /* @__PURE__ */ c.jsx("p", { className: "brief-text", children: s.briefing }),
      /* @__PURE__ */ c.jsxs("dl", { className: "brief-facts", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "District" }),
          /* @__PURE__ */ c.jsx("dd", { children: a.name })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Crews" }),
          /* @__PURE__ */ c.jsx("dd", { children: s.allowed.map((f) => /* @__PURE__ */ c.jsxs("span", { className: "inline-glyph", children: [
            /* @__PURE__ */ c.jsx(cn, { letter: f, size: 20 }),
            " ",
            f
          ] }, f)) })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Budget" }),
          /* @__PURE__ */ c.jsx("dd", { children: s.budget === 1 ? "1 crew" : `${String(s.budget)} crews` })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Previous best" }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            /* @__PURE__ */ c.jsx(Qr, { count: l.progress[s.id]?.stars ?? 0, max: s.maxStars, size: 18 }),
            s.maxStars < 3 ? /* @__PURE__ */ c.jsxs("span", { className: "muted small", children: [
              "(up to ",
              s.maxStars,
              ")"
            ] }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "brief-actions", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => o({ type: "START_MISSION" }), "data-testid": "start-mission", children: s.training.length > 0 ? "Start training" : "Start" }),
        s.training.length > 0 ? /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-large", onClick: () => o({ type: "START_CHALLENGE" }), children: "Skip to dispatch" }) : null
      ] })
    ] })
  ] });
}
function Kh({ state: l, dispatch: o, mission: s, debrief: a }) {
  const f = a.score, p = s.index === Cn().length;
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-result", children: [
    /* @__PURE__ */ c.jsx(Mt, { title: `Mission ${String(s.index)} · ${s.title}`, subtitle: "Result", onMissions: () => o({ type: "OPEN_MISSIONS" }), onSettings: () => o({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ c.jsxs("section", { className: "result", "data-testid": "result", children: [
      /* @__PURE__ */ c.jsx(Qr, { count: f.stars, max: f.maxStars, size: 44 }),
      /* @__PURE__ */ c.jsx("h2", { className: "result-h", children: Zp(f) }),
      /* @__PURE__ */ c.jsxs("p", { className: "muted small", children: [
        f.stars,
        " of ",
        f.maxStars,
        " star",
        f.maxStars === 1 ? "" : "s",
        f.maxStars < 3 ? " · this mission awards at most one star: the alarms alone cannot win it" : ""
      ] }),
      /* @__PURE__ */ c.jsxs("dl", { className: "result-facts", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Decision" }),
          /* @__PURE__ */ c.jsx("dd", { children: _d[f.quality] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Outcome" }),
          /* @__PURE__ */ c.jsx("dd", { className: `outcome outcome-${f.outcome}`, children: a.verdictLabel })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Cost" }),
          /* @__PURE__ */ c.jsxs("dd", { children: [
            f.crewsUsed,
            " crew",
            f.crewsUsed === 1 ? "" : "s",
            " used · minimum ",
            f.minCrews
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("dt", { children: "Attempts" }),
          /* @__PURE__ */ c.jsx("dd", { children: l.progress[s.id]?.attempts ?? 1 })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => o({ type: "NEXT_MISSION" }), "data-testid": "next-mission", children: p ? "Summary" : "Next mission" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-large", onClick: () => o({ type: "TRY_AGAIN" }), children: "Try again" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-ghost btn-large", onClick: () => o({ type: "OPEN_MISSIONS" }), children: "Missions" })
      ] })
    ] })
  ] });
}
function Jh({ state: l, dispatch: o }) {
  const s = Cn(), a = Lo(l.progress);
  return /* @__PURE__ */ c.jsxs("main", { className: "screen screen-summary", children: [
    /* @__PURE__ */ c.jsx(Mt, { title: "Shift complete", subtitle: `${String(a)} of ${String(Ro())} stars`, onMissions: () => o({ type: "OPEN_MISSIONS" }), onSettings: () => o({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ c.jsxs("section", { className: "summary", "data-testid": "summary", children: [
      /* @__PURE__ */ c.jsx("p", { className: "brief-text", children: "Every mission is on record. Single fires are always caught in a distance-3 district; the lesson of Silent Failure is why real machines build bigger ones." }),
      /* @__PURE__ */ c.jsxs("table", { className: "summary-table", children: [
        /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
          /* @__PURE__ */ c.jsx("th", { scope: "col", children: "Mission" }),
          /* @__PURE__ */ c.jsx("th", { scope: "col", children: "Stars" }),
          /* @__PURE__ */ c.jsx("th", { scope: "col", children: "Attempts" })
        ] }) }),
        /* @__PURE__ */ c.jsx("tbody", { children: s.map((f) => {
          const p = l.progress[f.id];
          return /* @__PURE__ */ c.jsxs("tr", { children: [
            /* @__PURE__ */ c.jsxs("th", { scope: "row", children: [
              f.index,
              ". ",
              f.title
            ] }),
            /* @__PURE__ */ c.jsx("td", { children: /* @__PURE__ */ c.jsx(Qr, { count: p?.stars ?? 0, max: f.maxStars, size: 18 }) }),
            /* @__PURE__ */ c.jsx("td", { children: p?.attempts ?? 0 })
          ] }, f.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => o({ type: "OPEN_MISSIONS" }), children: "Missions" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-large", onClick: () => o({ type: "OPEN_TITLE" }), children: "Title" })
      ] })
    ] })
  ] });
}
let Br = null;
function e1() {
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
function Me(l, o, s, a, f = 0.08, p = "sine") {
  const w = l.createOscillator(), E = l.createGain();
  w.type = p, w.frequency.value = o, E.gain.setValueAtTime(0, s), E.gain.linearRampToValueAtTime(f, s + 0.01), E.gain.exponentialRampToValueAtTime(1e-4, s + a), w.connect(E).connect(l.destination), w.start(s), w.stop(s + a + 0.02);
}
function fd(l, o) {
  if (!o) return;
  const s = e1();
  if (s === null) return;
  s.state === "suspended" && s.resume();
  const a = s.currentTime;
  switch (l) {
    case "select":
      Me(s, 660, a, 0.06);
      break;
    case "place":
      Me(s, 440, a, 0.09), Me(s, 660, a + 0.05, 0.09);
      break;
    case "remove":
      Me(s, 520, a, 0.08), Me(s, 390, a + 0.05, 0.1);
      break;
    case "confirm":
      Me(s, 523, a, 0.1), Me(s, 659, a + 0.08, 0.14);
      break;
    case "success":
      Me(s, 523, a, 0.12), Me(s, 659, a + 0.1, 0.12), Me(s, 784, a + 0.2, 0.22);
      break;
    case "failure":
      Me(s, 330, a, 0.16, 0.08, "triangle"), Me(s, 247, a + 0.14, 0.26, 0.08, "triangle");
      break;
    case "alarm":
      Me(s, 880, a, 0.08, 0.05, "square"), Me(s, 880, a + 0.14, 0.08, 0.05, "square");
      break;
    case "step":
      Me(s, 587, a, 0.05, 0.05);
      break;
    case "blocked":
      Me(s, 196, a, 0.07, 0.06, "square");
      break;
  }
}
function t1(l, o, s) {
  switch (l.type) {
    case "SELECT_LETTER":
      return s.selected !== o.selected ? "select" : null;
    case "TOGGLE_BLOCK": {
      const a = o.placements[l.qubit], f = s.placements[l.qubit];
      if (a === f) {
        if (s === o && o.screen === "challenge" && !o.standDownDialog && a === void 0) {
          const p = Ke(o), w = p !== null && l.qubit >= 0 && l.qubit < Ze(p.code).n;
          if (p !== null && w && Hr(o.placements) >= p.budget) return "blocked";
        }
        return null;
      }
      return f === void 0 ? "remove" : "place";
    }
    case "RECALL_BLOCK":
      return s.placements !== o.placements ? "remove" : null;
    case "CLEAR_CREWS":
      return s.placements !== o.placements && Hr(o.placements) > 0 ? "remove" : null;
    case "CONFIRM":
    case "STAND_DOWN_CONFIRM":
      return s.screen === "debrief" && o.screen !== "debrief" ? "confirm" : null;
    case "REPLAY_NEXT":
    case "REPLAY_PREV":
    case "REPLAY_GOTO":
      return s.replayIndex !== o.replayIndex ? "step" : null;
    default:
      return null;
  }
}
const pd = 1600;
function n1() {
  const [l, o] = le.useState(() => {
    try {
      return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    } catch {
      return !1;
    }
  });
  return le.useEffect(() => {
    let s;
    try {
      s = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    } catch {
      s = void 0;
    }
    if (s === void 0) return;
    const a = (f) => o(f.matches);
    return s.addEventListener("change", a), () => s?.removeEventListener("change", a);
  }, []), l;
}
function r1(l, o) {
  if (l === "debrief") {
    const s = o.querySelector('[data-testid="verdict"]');
    if (s !== null) return s;
  }
  return o.querySelector("main h1[data-focus-target]") ?? o.querySelector("main h1");
}
function l1({ bridge: l = fh(), storage: o = "local" }) {
  const [s] = le.useState(() => o === "local" ? nh() : null), [a, f] = le.useReducer(ld, void 0, () => {
    const { save: ue, notice: Ne } = eh(s);
    return ph(ue, Ne);
  }), [p, w] = le.useState(!1), S = n1() || a.settings.reducedMotion, I = le.useRef(null), P = le.useRef(a), $ = le.useRef(a.settings.sound), j = le.useRef(S);
  le.useEffect(() => {
    P.current = a, $.current = a.settings.sound, j.current = S;
  });
  const N = le.useCallback((ue) => {
    const Ne = ue.type === "CONFIRM" || ue.type === "STAND_DOWN_CONFIRM" ? { ...ue, reducedMotion: j.current } : ue, Fe = P.current, Je = ld(Fe, Ne);
    P.current = Je, f(Ne);
    const Xe = t1(Ne, Fe, Je);
    Xe !== null && fd(Xe, $.current);
  }, []), M = le.useRef("");
  le.useEffect(() => {
    if (a.screen !== "debrief" || a.debrief === null) return;
    const ue = `${a.debrief.missionId}:${a.debrief.crews}:${String(a.progress[a.debrief.missionId]?.attempts ?? 0)}`;
    M.current !== ue && (M.current = ue, fd(a.debrief.verdict === "success" ? "success" : "failure", a.settings.sound));
  }, [a.screen, a.debrief, a.progress, a.settings.sound]);
  const { progress: b, settings: z } = a;
  le.useEffect(() => {
    th(s, { version: 1, progress: b, settings: z });
  }, [s, b, z]), le.useEffect(() => {
    if (!a.autoPlay || a.screen !== "debrief") return;
    const ue = globalThis.setTimeout(() => f({ type: "REPLAY_NEXT" }), S ? pd + 600 : pd);
    return () => globalThis.clearTimeout(ue);
  }, [a.autoPlay, a.replayIndex, a.screen, S]);
  const O = Ke(a), Y = le.useRef(null), ye = le.useRef(!0), Ee = `${a.screen}:${a.missionId ?? ""}:${String(a.progress[a.missionId ?? ""]?.attempts ?? 0)}`;
  le.useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
    }
    const ue = I.current, Ne = P.current, Fe = Ke(Ne);
    ue !== null && !ye.current && r1(Ne.screen, ue)?.focus({ preventScroll: !0 }), ye.current = !1, document.title = Eh(Ne, Fe);
    const Je = Y.current;
    Je !== null && (Je.textContent = "");
    const Xe = globalThis.setTimeout(() => {
      Y.current !== null && (Y.current.textContent = Nh(Ne, Fe, Ne.debrief));
    }, 60);
    return () => globalThis.clearTimeout(Xe);
  }, [Ee]);
  const oe = { state: a, dispatch: N, storageLabel: s === null ? "Progress is kept in memory for this session only (no web storage available here)." : "Progress is saved in this browser (localStorage, key q11.save.v1)." };
  let ae;
  switch (a.screen) {
    case "title":
      ae = /* @__PURE__ */ c.jsx(Hh, { ...oe });
      break;
    case "how":
      ae = /* @__PURE__ */ c.jsx(qh, { ...oe });
      break;
    case "settings":
      ae = /* @__PURE__ */ c.jsx(Yh, { ...oe, onReset: () => w(!0) });
      break;
    case "missions":
      ae = /* @__PURE__ */ c.jsx(er, { ...oe });
      break;
    case "briefing":
      ae = O === null ? /* @__PURE__ */ c.jsx(er, { ...oe }) : /* @__PURE__ */ c.jsx(Gh, { ...oe, mission: O });
      break;
    case "training":
      ae = O === null ? /* @__PURE__ */ c.jsx(er, { ...oe }) : /* @__PURE__ */ c.jsx(Wh, { state: a, dispatch: N, mission: O });
      break;
    case "challenge":
      ae = O === null ? /* @__PURE__ */ c.jsx(er, { ...oe }) : /* @__PURE__ */ c.jsx(Uh, { mission: O, placements: a.placements, selected: a.selected, standDownDialog: a.standDownDialog, dispatch: N });
      break;
    case "debrief":
      ae = O === null || a.debrief === null ? /* @__PURE__ */ c.jsx(er, { ...oe }) : /* @__PURE__ */ c.jsx(Zh, { state: a, dispatch: N, mission: O, debrief: a.debrief, bridge: l });
      break;
    case "result":
      ae = O === null || a.debrief === null ? /* @__PURE__ */ c.jsx(er, { ...oe }) : /* @__PURE__ */ c.jsx(Kh, { ...oe, mission: O, debrief: a.debrief });
      break;
    case "summary":
      ae = /* @__PURE__ */ c.jsx(Jh, { ...oe });
      break;
  }
  return /* @__PURE__ */ c.jsxs("div", { className: "app", "data-reduced-motion": S ? "true" : "false", "data-screen": a.screen, children: [
    /* @__PURE__ */ c.jsxs("div", { className: "app-content", ref: I, "data-inert-root": !0, children: [
      a.notice !== null ? /* @__PURE__ */ c.jsx(Ph, { text: a.notice, onDismiss: () => N({ type: "DISMISS_NOTICE" }) }) : null,
      ae
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", "data-testid": "announcer", ref: Y }),
    p ? /* @__PURE__ */ c.jsx(
      Ad,
      {
        title: "Reset all progress?",
        confirmLabel: "Reset",
        danger: !0,
        onConfirm: () => {
          N({ type: "RESET_PROGRESS" }), w(!1);
        },
        onCancel: () => w(!1),
        children: /* @__PURE__ */ c.jsx("p", { children: "Stars and attempts for every mission will be cleared. Settings are kept." })
      }
    ) : null
  ] });
}
function i1(l, o = {}) {
  l.replaceChildren();
  const s = B0.createRoot(l), a = {
    ...o.bridge === void 0 ? {} : { bridge: o.bridge },
    ...o.storage === void 0 ? {} : { storage: o.storage }
  };
  return s.render(
    /* @__PURE__ */ c.jsx(le.StrictMode, { children: /* @__PURE__ */ c.jsx(l1, { ...a }) })
  ), s;
}
export {
  i1 as mountQ11
};
