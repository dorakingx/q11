var la = { exports: {} }, Ts = {}, oa = { exports: {} }, he = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dd;
function H0() {
  if (Dd) return he;
  Dd = 1;
  var n = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), p = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), k = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), S = Symbol.iterator;
  function C(j) {
    return j === null || typeof j != "object" ? null : (j = S && j[S] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var I = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, _ = Object.assign, R = {};
  function L(j, O, de) {
    this.props = j, this.context = O, this.refs = R, this.updater = de || I;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(j, O) {
    if (typeof j != "object" && typeof j != "function" && j != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, j, O, "setState");
  }, L.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function W() {
  }
  W.prototype = L.prototype;
  function $(j, O, de) {
    this.props = j, this.context = O, this.refs = R, this.updater = de || I;
  }
  var D = $.prototype = new W();
  D.constructor = $, _(D, L.prototype), D.isPureReactComponent = !0;
  var te = Array.isArray, K = Object.prototype.hasOwnProperty, Z = { current: null }, re = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ue(j, O, de) {
    var ce, pe = {}, me = null, ve = null;
    if (O != null) for (ce in O.ref !== void 0 && (ve = O.ref), O.key !== void 0 && (me = "" + O.key), O) K.call(O, ce) && !re.hasOwnProperty(ce) && (pe[ce] = O[ce]);
    var ye = arguments.length - 2;
    if (ye === 1) pe.children = de;
    else if (1 < ye) {
      for (var Te = Array(ye), tt = 0; tt < ye; tt++) Te[tt] = arguments[tt + 2];
      pe.children = Te;
    }
    if (j && j.defaultProps) for (ce in ye = j.defaultProps, ye) pe[ce] === void 0 && (pe[ce] = ye[ce]);
    return { $$typeof: n, type: j, key: me, ref: ve, props: pe, _owner: Z.current };
  }
  function Ne(j, O) {
    return { $$typeof: n, type: j.type, key: O, ref: j.ref, props: j.props, _owner: j._owner };
  }
  function $e(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function Be(j) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(de) {
      return O[de];
    });
  }
  var U = /\/+/g;
  function Y(j, O) {
    return typeof j == "object" && j !== null && j.key != null ? Be("" + j.key) : O.toString(36);
  }
  function ke(j, O, de, ce, pe) {
    var me = typeof j;
    (me === "undefined" || me === "boolean") && (j = null);
    var ve = !1;
    if (j === null) ve = !0;
    else switch (me) {
      case "string":
      case "number":
        ve = !0;
        break;
      case "object":
        switch (j.$$typeof) {
          case n:
          case s:
            ve = !0;
        }
    }
    if (ve) return ve = j, pe = pe(ve), j = ce === "" ? "." + Y(ve, 0) : ce, te(pe) ? (de = "", j != null && (de = j.replace(U, "$&/") + "/"), ke(pe, O, de, "", function(tt) {
      return tt;
    })) : pe != null && ($e(pe) && (pe = Ne(pe, de + (!pe.key || ve && ve.key === pe.key ? "" : ("" + pe.key).replace(U, "$&/") + "/") + j)), O.push(pe)), 1;
    if (ve = 0, ce = ce === "" ? "." : ce + ":", te(j)) for (var ye = 0; ye < j.length; ye++) {
      me = j[ye];
      var Te = ce + Y(me, ye);
      ve += ke(me, O, de, Te, pe);
    }
    else if (Te = C(j), typeof Te == "function") for (j = Te.call(j), ye = 0; !(me = j.next()).done; ) me = me.value, Te = ce + Y(me, ye++), ve += ke(me, O, de, Te, pe);
    else if (me === "object") throw O = String(j), Error("Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead.");
    return ve;
  }
  function oe(j, O, de) {
    if (j == null) return j;
    var ce = [], pe = 0;
    return ke(j, ce, "", "", function(me) {
      return O.call(de, me, pe++);
    }), ce;
  }
  function le(j) {
    if (j._status === -1) {
      var O = j._result;
      O = O(), O.then(function(de) {
        (j._status === 0 || j._status === -1) && (j._status = 1, j._result = de);
      }, function(de) {
        (j._status === 0 || j._status === -1) && (j._status = 2, j._result = de);
      }), j._status === -1 && (j._status = 0, j._result = O);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ge = { current: null }, X = { transition: null }, ne = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: X, ReactCurrentOwner: Z };
  function q() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return he.Children = { map: oe, forEach: function(j, O, de) {
    oe(j, function() {
      O.apply(this, arguments);
    }, de);
  }, count: function(j) {
    var O = 0;
    return oe(j, function() {
      O++;
    }), O;
  }, toArray: function(j) {
    return oe(j, function(O) {
      return O;
    }) || [];
  }, only: function(j) {
    if (!$e(j)) throw Error("React.Children.only expected to receive a single React element child.");
    return j;
  } }, he.Component = L, he.Fragment = l, he.Profiler = d, he.PureComponent = $, he.StrictMode = a, he.Suspense = x, he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne, he.act = q, he.cloneElement = function(j, O, de) {
    if (j == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + j + ".");
    var ce = _({}, j.props), pe = j.key, me = j.ref, ve = j._owner;
    if (O != null) {
      if (O.ref !== void 0 && (me = O.ref, ve = Z.current), O.key !== void 0 && (pe = "" + O.key), j.type && j.type.defaultProps) var ye = j.type.defaultProps;
      for (Te in O) K.call(O, Te) && !re.hasOwnProperty(Te) && (ce[Te] = O[Te] === void 0 && ye !== void 0 ? ye[Te] : O[Te]);
    }
    var Te = arguments.length - 2;
    if (Te === 1) ce.children = de;
    else if (1 < Te) {
      ye = Array(Te);
      for (var tt = 0; tt < Te; tt++) ye[tt] = arguments[tt + 2];
      ce.children = ye;
    }
    return { $$typeof: n, type: j.type, key: pe, ref: me, props: ce, _owner: ve };
  }, he.createContext = function(j) {
    return j = { $$typeof: p, _currentValue: j, _currentValue2: j, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, j.Provider = { $$typeof: f, _context: j }, j.Consumer = j;
  }, he.createElement = ue, he.createFactory = function(j) {
    var O = ue.bind(null, j);
    return O.type = j, O;
  }, he.createRef = function() {
    return { current: null };
  }, he.forwardRef = function(j) {
    return { $$typeof: g, render: j };
  }, he.isValidElement = $e, he.lazy = function(j) {
    return { $$typeof: b, _payload: { _status: -1, _result: j }, _init: le };
  }, he.memo = function(j, O) {
    return { $$typeof: k, type: j, compare: O === void 0 ? null : O };
  }, he.startTransition = function(j) {
    var O = X.transition;
    X.transition = {};
    try {
      j();
    } finally {
      X.transition = O;
    }
  }, he.unstable_act = q, he.useCallback = function(j, O) {
    return ge.current.useCallback(j, O);
  }, he.useContext = function(j) {
    return ge.current.useContext(j);
  }, he.useDebugValue = function() {
  }, he.useDeferredValue = function(j) {
    return ge.current.useDeferredValue(j);
  }, he.useEffect = function(j, O) {
    return ge.current.useEffect(j, O);
  }, he.useId = function() {
    return ge.current.useId();
  }, he.useImperativeHandle = function(j, O, de) {
    return ge.current.useImperativeHandle(j, O, de);
  }, he.useInsertionEffect = function(j, O) {
    return ge.current.useInsertionEffect(j, O);
  }, he.useLayoutEffect = function(j, O) {
    return ge.current.useLayoutEffect(j, O);
  }, he.useMemo = function(j, O) {
    return ge.current.useMemo(j, O);
  }, he.useReducer = function(j, O, de) {
    return ge.current.useReducer(j, O, de);
  }, he.useRef = function(j) {
    return ge.current.useRef(j);
  }, he.useState = function(j) {
    return ge.current.useState(j);
  }, he.useSyncExternalStore = function(j, O, de) {
    return ge.current.useSyncExternalStore(j, O, de);
  }, he.useTransition = function() {
    return ge.current.useTransition();
  }, he.version = "18.3.1", he;
}
var Fd;
function Ra() {
  return Fd || (Fd = 1, oa.exports = H0()), oa.exports;
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
var zd;
function U0() {
  if (zd) return Ts;
  zd = 1;
  var n = Ra(), s = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, d = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(g, x, k) {
    var b, S = {}, C = null, I = null;
    k !== void 0 && (C = "" + k), x.key !== void 0 && (C = "" + x.key), x.ref !== void 0 && (I = x.ref);
    for (b in x) a.call(x, b) && !f.hasOwnProperty(b) && (S[b] = x[b]);
    if (g && g.defaultProps) for (b in x = g.defaultProps, x) S[b] === void 0 && (S[b] = x[b]);
    return { $$typeof: s, type: g, key: C, ref: I, props: S, _owner: d.current };
  }
  return Ts.Fragment = l, Ts.jsx = p, Ts.jsxs = p, Ts;
}
var Wd;
function Y0() {
  return Wd || (Wd = 1, la.exports = U0()), la.exports;
}
var i = Y0(), F = Ra(), el = {}, aa = { exports: {} }, gt = {}, ca = { exports: {} }, ua = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xd;
function V0() {
  return Xd || (Xd = 1, (function(n) {
    function s(X, ne) {
      var q = X.length;
      X.push(ne);
      e: for (; 0 < q; ) {
        var j = q - 1 >>> 1, O = X[j];
        if (0 < d(O, ne)) X[j] = ne, X[q] = O, q = j;
        else break e;
      }
    }
    function l(X) {
      return X.length === 0 ? null : X[0];
    }
    function a(X) {
      if (X.length === 0) return null;
      var ne = X[0], q = X.pop();
      if (q !== ne) {
        X[0] = q;
        e: for (var j = 0, O = X.length, de = O >>> 1; j < de; ) {
          var ce = 2 * (j + 1) - 1, pe = X[ce], me = ce + 1, ve = X[me];
          if (0 > d(pe, q)) me < O && 0 > d(ve, pe) ? (X[j] = ve, X[me] = q, j = me) : (X[j] = pe, X[ce] = q, j = ce);
          else if (me < O && 0 > d(ve, q)) X[j] = ve, X[me] = q, j = me;
          else break e;
        }
      }
      return ne;
    }
    function d(X, ne) {
      var q = X.sortIndex - ne.sortIndex;
      return q !== 0 ? q : X.id - ne.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var p = Date, g = p.now();
      n.unstable_now = function() {
        return p.now() - g;
      };
    }
    var x = [], k = [], b = 1, S = null, C = 3, I = !1, _ = !1, R = !1, L = typeof setTimeout == "function" ? setTimeout : null, W = typeof clearTimeout == "function" ? clearTimeout : null, $ = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function D(X) {
      for (var ne = l(k); ne !== null; ) {
        if (ne.callback === null) a(k);
        else if (ne.startTime <= X) a(k), ne.sortIndex = ne.expirationTime, s(x, ne);
        else break;
        ne = l(k);
      }
    }
    function te(X) {
      if (R = !1, D(X), !_) if (l(x) !== null) _ = !0, le(K);
      else {
        var ne = l(k);
        ne !== null && ge(te, ne.startTime - X);
      }
    }
    function K(X, ne) {
      _ = !1, R && (R = !1, W(ue), ue = -1), I = !0;
      var q = C;
      try {
        for (D(ne), S = l(x); S !== null && (!(S.expirationTime > ne) || X && !Be()); ) {
          var j = S.callback;
          if (typeof j == "function") {
            S.callback = null, C = S.priorityLevel;
            var O = j(S.expirationTime <= ne);
            ne = n.unstable_now(), typeof O == "function" ? S.callback = O : S === l(x) && a(x), D(ne);
          } else a(x);
          S = l(x);
        }
        if (S !== null) var de = !0;
        else {
          var ce = l(k);
          ce !== null && ge(te, ce.startTime - ne), de = !1;
        }
        return de;
      } finally {
        S = null, C = q, I = !1;
      }
    }
    var Z = !1, re = null, ue = -1, Ne = 5, $e = -1;
    function Be() {
      return !(n.unstable_now() - $e < Ne);
    }
    function U() {
      if (re !== null) {
        var X = n.unstable_now();
        $e = X;
        var ne = !0;
        try {
          ne = re(!0, X);
        } finally {
          ne ? Y() : (Z = !1, re = null);
        }
      } else Z = !1;
    }
    var Y;
    if (typeof $ == "function") Y = function() {
      $(U);
    };
    else if (typeof MessageChannel < "u") {
      var ke = new MessageChannel(), oe = ke.port2;
      ke.port1.onmessage = U, Y = function() {
        oe.postMessage(null);
      };
    } else Y = function() {
      L(U, 0);
    };
    function le(X) {
      re = X, Z || (Z = !0, Y());
    }
    function ge(X, ne) {
      ue = L(function() {
        X(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(X) {
      X.callback = null;
    }, n.unstable_continueExecution = function() {
      _ || I || (_ = !0, le(K));
    }, n.unstable_forceFrameRate = function(X) {
      0 > X || 125 < X ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ne = 0 < X ? Math.floor(1e3 / X) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return C;
    }, n.unstable_getFirstCallbackNode = function() {
      return l(x);
    }, n.unstable_next = function(X) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = C;
      }
      var q = C;
      C = ne;
      try {
        return X();
      } finally {
        C = q;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(X, ne) {
      switch (X) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          X = 3;
      }
      var q = C;
      C = X;
      try {
        return ne();
      } finally {
        C = q;
      }
    }, n.unstable_scheduleCallback = function(X, ne, q) {
      var j = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? j + q : j) : q = j, X) {
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
      return O = q + O, X = { id: b++, callback: ne, priorityLevel: X, startTime: q, expirationTime: O, sortIndex: -1 }, q > j ? (X.sortIndex = q, s(k, X), l(x) === null && X === l(k) && (R ? (W(ue), ue = -1) : R = !0, ge(te, q - j))) : (X.sortIndex = O, s(x, X), _ || I || (_ = !0, le(K))), X;
    }, n.unstable_shouldYield = Be, n.unstable_wrapCallback = function(X) {
      var ne = C;
      return function() {
        var q = C;
        C = ne;
        try {
          return X.apply(this, arguments);
        } finally {
          C = q;
        }
      };
    };
  })(ua)), ua;
}
var Zd;
function Q0() {
  return Zd || (Zd = 1, ca.exports = V0()), ca.exports;
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
var Bd;
function K0() {
  if (Bd) return gt;
  Bd = 1;
  var n = Ra(), s = Q0();
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
  var g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), x = Object.prototype.hasOwnProperty, k = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, b = {}, S = {};
  function C(e) {
    return x.call(S, e) ? !0 : x.call(b, e) ? !1 : k.test(e) ? S[e] = !0 : (b[e] = !0, !1);
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
  function _(e, t, r, o) {
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
  var W = /[\-:]([a-z])/g;
  function $(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      W,
      $
    );
    L[t] = new R(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(W, $);
    L[t] = new R(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(W, $);
    L[t] = new R(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    L[e] = new R(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), L.xlinkHref = new R("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    L[e] = new R(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function D(e, t, r, o) {
    var c = L.hasOwnProperty(t) ? L[t] : null;
    (c !== null ? c.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (_(t, r, c, o) && (r = null), o || c === null ? C(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : c.mustUseProperty ? e[c.propertyName] = r === null ? c.type === 3 ? !1 : "" : r : (t = c.attributeName, o = c.attributeNamespace, r === null ? e.removeAttribute(t) : (c = c.type, r = c === 3 || c === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
  }
  var te = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, K = Symbol.for("react.element"), Z = Symbol.for("react.portal"), re = Symbol.for("react.fragment"), ue = Symbol.for("react.strict_mode"), Ne = Symbol.for("react.profiler"), $e = Symbol.for("react.provider"), Be = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), ke = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), ge = Symbol.for("react.offscreen"), X = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var q = Object.assign, j;
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
  var de = !1;
  function ce(e, t) {
    if (!e || de) return "";
    de = !0;
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
      de = !1, Error.prepareStackTrace = r;
    }
    return (e = e ? e.displayName || e.name : "") ? O(e) : "";
  }
  function pe(e) {
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
        return e = ce(e.type, !1), e;
      case 11:
        return e = ce(e.type.render, !1), e;
      case 1:
        return e = ce(e.type, !0), e;
      default:
        return "";
    }
  }
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case re:
        return "Fragment";
      case Z:
        return "Portal";
      case Ne:
        return "Profiler";
      case ue:
        return "StrictMode";
      case Y:
        return "Suspense";
      case ke:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Be:
        return (e.displayName || "Context") + ".Consumer";
      case $e:
        return (e._context.displayName || "Context") + ".Provider";
      case U:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case oe:
        return t = e.displayName || null, t !== null ? t : me(e.type) || "Memo";
      case le:
        t = e._payload, e = e._init;
        try {
          return me(e(t));
        } catch {
        }
    }
    return null;
  }
  function ve(e) {
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
        return me(t);
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
  function ye(e) {
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
  function Te(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function tt(e) {
    var t = Te(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
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
  function nr(e) {
    e._valueTracker || (e._valueTracker = tt(e));
  }
  function Xs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), o = "";
    return e && (o = Te(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
  }
  function rr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function sr(e, t) {
    var r = t.checked;
    return q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function Zs(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    r = ye(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Bs(e, t) {
    t = t.checked, t != null && D(e, "checked", t, !1);
  }
  function ir(e, t) {
    Bs(e, t);
    var r = ye(t.value), o = t.type;
    if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? un(e, t.type, r) : t.hasOwnProperty("defaultValue") && un(e, t.type, ye(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function wt(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function un(e, t, r) {
    (t !== "number" || rr(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Ke = Array.isArray;
  function Qt(e, t, r, o) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < r.length; c++) t["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++) c = t.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && o && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + ye(r), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, o && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lr(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
    return q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function qs(e, t) {
    var r = t.value;
    if (r == null) {
      if (r = t.children, t = t.defaultValue, r != null) {
        if (t != null) throw Error(l(92));
        if (Ke(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        t = r;
      }
      t == null && (t = ""), r = t;
    }
    e._wrapperState = { initialValue: ye(r) };
  }
  function B(e, t) {
    var r = ye(t.value), o = ye(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
  }
  function xe(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Ce(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ge(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Ce(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Wt, Dn = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, o, c);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Wt = Wt || document.createElement("div"), Wt.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Wt.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Kt(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var dn = {
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
  }, Zr = ["Webkit", "ms", "Moz", "O"];
  Object.keys(dn).forEach(function(e) {
    Zr.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), dn[t] = dn[e];
    });
  });
  function Br(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || dn.hasOwnProperty(e) && dn[e] ? ("" + t).trim() : t + "px";
  }
  function qr(e, t) {
    e = e.style;
    for (var r in t) if (t.hasOwnProperty(r)) {
      var o = r.indexOf("--") === 0, c = Br(r, t[r], o);
      r === "float" && (r = "cssFloat"), o ? e.setProperty(r, c) : e[r] = c;
    }
  }
  var Hs = q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function or(e, t) {
    if (t) {
      if (Hs[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(l(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(l(62));
    }
  }
  function fn(e, t) {
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
  var ar = null;
  function kl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var vl = null, cr = null, ur = null;
  function tc(e) {
    if (e = hs(e)) {
      if (typeof vl != "function") throw Error(l(280));
      var t = e.stateNode;
      t && (t = mi(t), vl(e.stateNode, e.type, t));
    }
  }
  function nc(e) {
    cr ? ur ? ur.push(e) : ur = [e] : cr = e;
  }
  function rc() {
    if (cr) {
      var e = cr, t = ur;
      if (ur = cr = null, tc(e), t) for (e = 0; e < t.length; e++) tc(t[e]);
    }
  }
  function sc(e, t) {
    return e(t);
  }
  function ic() {
  }
  var jl = !1;
  function lc(e, t, r) {
    if (jl) return e(t, r);
    jl = !0;
    try {
      return sc(e, t, r);
    } finally {
      jl = !1, (cr !== null || ur !== null) && (ic(), rc());
    }
  }
  function Hr(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var o = mi(r);
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
  var Sl = !1;
  if (g) try {
    var Ur = {};
    Object.defineProperty(Ur, "passive", { get: function() {
      Sl = !0;
    } }), window.addEventListener("test", Ur, Ur), window.removeEventListener("test", Ur, Ur);
  } catch {
    Sl = !1;
  }
  function Gh(e, t, r, o, c, u, h, y, w) {
    var T = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, T);
    } catch (P) {
      this.onError(P);
    }
  }
  var Yr = !1, Us = null, Ys = !1, bl = null, Jh = { onError: function(e) {
    Yr = !0, Us = e;
  } };
  function ep(e, t, r, o, c, u, h, y, w) {
    Yr = !1, Us = null, Gh.apply(Jh, arguments);
  }
  function tp(e, t, r, o, c, u, h, y, w) {
    if (ep.apply(this, arguments), Yr) {
      if (Yr) {
        var T = Us;
        Yr = !1, Us = null;
      } else throw Error(l(198));
      Ys || (Ys = !0, bl = T);
    }
  }
  function Fn(e) {
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
  function oc(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function ac(e) {
    if (Fn(e) !== e) throw Error(l(188));
  }
  function np(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Fn(e), t === null) throw Error(l(188));
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
          if (u === r) return ac(c), e;
          if (u === o) return ac(c), t;
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
  function cc(e) {
    return e = np(e), e !== null ? uc(e) : null;
  }
  function uc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = uc(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var dc = s.unstable_scheduleCallback, fc = s.unstable_cancelCallback, rp = s.unstable_shouldYield, sp = s.unstable_requestPaint, ze = s.unstable_now, ip = s.unstable_getCurrentPriorityLevel, Nl = s.unstable_ImmediatePriority, hc = s.unstable_UserBlockingPriority, Vs = s.unstable_NormalPriority, lp = s.unstable_LowPriority, pc = s.unstable_IdlePriority, Qs = null, Xt = null;
  function op(e) {
    if (Xt && typeof Xt.onCommitFiberRoot == "function") try {
      Xt.onCommitFiberRoot(Qs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Rt = Math.clz32 ? Math.clz32 : up, ap = Math.log, cp = Math.LN2;
  function up(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ap(e) / cp | 0) | 0;
  }
  var Ks = 64, Gs = 4194304;
  function Vr(e) {
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
  function Js(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var o = 0, c = e.suspendedLanes, u = e.pingedLanes, h = r & 268435455;
    if (h !== 0) {
      var y = h & ~c;
      y !== 0 ? o = Vr(y) : (u &= h, u !== 0 && (o = Vr(u)));
    } else h = r & ~c, h !== 0 ? o = Vr(h) : u !== 0 && (o = Vr(u));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, u = t & -t, c >= u || c === 16 && (u & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - Rt(t), c = 1 << r, o |= e[r], t &= ~c;
    return o;
  }
  function dp(e, t) {
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
  function fp(e, t) {
    for (var r = e.suspendedLanes, o = e.pingedLanes, c = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var h = 31 - Rt(u), y = 1 << h, w = c[h];
      w === -1 ? ((y & r) === 0 || (y & o) !== 0) && (c[h] = dp(y, t)) : w <= t && (e.expiredLanes |= y), u &= ~y;
    }
  }
  function El(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function mc() {
    var e = Ks;
    return Ks <<= 1, (Ks & 4194240) === 0 && (Ks = 64), e;
  }
  function Cl(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function Qr(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Rt(t), e[t] = r;
  }
  function hp(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var c = 31 - Rt(r), u = 1 << c;
      t[c] = 0, o[c] = -1, e[c] = -1, r &= ~u;
    }
  }
  function Tl(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var o = 31 - Rt(r), c = 1 << o;
      c & t | e[o] & t && (e[o] |= t), r &= ~c;
    }
  }
  var be = 0;
  function gc(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var yc, Il, xc, wc, kc, Ll = !1, ei = [], hn = null, pn = null, mn = null, Kr = /* @__PURE__ */ new Map(), Gr = /* @__PURE__ */ new Map(), gn = [], pp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function vc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        hn = null;
        break;
      case "dragenter":
      case "dragleave":
        pn = null;
        break;
      case "mouseover":
      case "mouseout":
        mn = null;
        break;
      case "pointerover":
      case "pointerout":
        Kr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gr.delete(t.pointerId);
    }
  }
  function Jr(e, t, r, o, c, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: u, targetContainers: [c] }, t !== null && (t = hs(t), t !== null && Il(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function mp(e, t, r, o, c) {
    switch (t) {
      case "focusin":
        return hn = Jr(hn, e, t, r, o, c), !0;
      case "dragenter":
        return pn = Jr(pn, e, t, r, o, c), !0;
      case "mouseover":
        return mn = Jr(mn, e, t, r, o, c), !0;
      case "pointerover":
        var u = c.pointerId;
        return Kr.set(u, Jr(Kr.get(u) || null, e, t, r, o, c)), !0;
      case "gotpointercapture":
        return u = c.pointerId, Gr.set(u, Jr(Gr.get(u) || null, e, t, r, o, c)), !0;
    }
    return !1;
  }
  function jc(e) {
    var t = zn(e.target);
    if (t !== null) {
      var r = Fn(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = oc(r), t !== null) {
            e.blockedOn = t, kc(e.priority, function() {
              xc(r);
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
  function ti(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = _l(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var o = new r.constructor(r.type, r);
        ar = o, r.target.dispatchEvent(o), ar = null;
      } else return t = hs(r), t !== null && Il(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function Sc(e, t, r) {
    ti(e) && r.delete(t);
  }
  function gp() {
    Ll = !1, hn !== null && ti(hn) && (hn = null), pn !== null && ti(pn) && (pn = null), mn !== null && ti(mn) && (mn = null), Kr.forEach(Sc), Gr.forEach(Sc);
  }
  function es(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ll || (Ll = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, gp)));
  }
  function ts(e) {
    function t(c) {
      return es(c, e);
    }
    if (0 < ei.length) {
      es(ei[0], e);
      for (var r = 1; r < ei.length; r++) {
        var o = ei[r];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (hn !== null && es(hn, e), pn !== null && es(pn, e), mn !== null && es(mn, e), Kr.forEach(t), Gr.forEach(t), r = 0; r < gn.length; r++) o = gn[r], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < gn.length && (r = gn[0], r.blockedOn === null); ) jc(r), r.blockedOn === null && gn.shift();
  }
  var dr = te.ReactCurrentBatchConfig, ni = !0;
  function yp(e, t, r, o) {
    var c = be, u = dr.transition;
    dr.transition = null;
    try {
      be = 1, Rl(e, t, r, o);
    } finally {
      be = c, dr.transition = u;
    }
  }
  function xp(e, t, r, o) {
    var c = be, u = dr.transition;
    dr.transition = null;
    try {
      be = 4, Rl(e, t, r, o);
    } finally {
      be = c, dr.transition = u;
    }
  }
  function Rl(e, t, r, o) {
    if (ni) {
      var c = _l(e, t, r, o);
      if (c === null) Vl(e, t, o, ri, r), vc(e, o);
      else if (mp(c, e, t, r, o)) o.stopPropagation();
      else if (vc(e, o), t & 4 && -1 < pp.indexOf(e)) {
        for (; c !== null; ) {
          var u = hs(c);
          if (u !== null && yc(u), u = _l(e, t, r, o), u === null && Vl(e, t, o, ri, r), u === c) break;
          c = u;
        }
        c !== null && o.stopPropagation();
      } else Vl(e, t, o, null, r);
    }
  }
  var ri = null;
  function _l(e, t, r, o) {
    if (ri = null, e = kl(o), e = zn(e), e !== null) if (t = Fn(e), t === null) e = null;
    else if (r = t.tag, r === 13) {
      if (e = oc(t), e !== null) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return ri = e, null;
  }
  function bc(e) {
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
        switch (ip()) {
          case Nl:
            return 1;
          case hc:
            return 4;
          case Vs:
          case lp:
            return 16;
          case pc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var yn = null, Ol = null, si = null;
  function Nc() {
    if (si) return si;
    var e, t = Ol, r = t.length, o, c = "value" in yn ? yn.value : yn.textContent, u = c.length;
    for (e = 0; e < r && t[e] === c[e]; e++) ;
    var h = r - e;
    for (o = 1; o <= h && t[r - o] === c[u - o]; o++) ;
    return si = c.slice(e, 1 < o ? 1 - o : void 0);
  }
  function ii(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function li() {
    return !0;
  }
  function Ec() {
    return !1;
  }
  function kt(e) {
    function t(r, o, c, u, h) {
      this._reactName = r, this._targetInst = c, this.type = o, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var y in e) e.hasOwnProperty(y) && (r = e[y], this[y] = r ? r(u) : u[y]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? li : Ec, this.isPropagationStopped = Ec, this;
    }
    return q(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = li);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = li);
    }, persist: function() {
    }, isPersistent: li }), t;
  }
  var fr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ml = kt(fr), ns = q({}, fr, { view: 0, detail: 0 }), wp = kt(ns), Pl, $l, rs, oi = q({}, ns, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Dl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== rs && (rs && e.type === "mousemove" ? (Pl = e.screenX - rs.screenX, $l = e.screenY - rs.screenY) : $l = Pl = 0, rs = e), Pl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : $l;
  } }), Cc = kt(oi), kp = q({}, oi, { dataTransfer: 0 }), vp = kt(kp), jp = q({}, ns, { relatedTarget: 0 }), Al = kt(jp), Sp = q({}, fr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), bp = kt(Sp), Np = q({}, fr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Ep = kt(Np), Cp = q({}, fr, { data: 0 }), Tc = kt(Cp), Tp = {
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
  }, Ip = {
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
  }, Lp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Rp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Lp[e]) ? !!t[e] : !1;
  }
  function Dl() {
    return Rp;
  }
  var _p = q({}, ns, { key: function(e) {
    if (e.key) {
      var t = Tp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = ii(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ip[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Dl, charCode: function(e) {
    return e.type === "keypress" ? ii(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? ii(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Op = kt(_p), Mp = q({}, oi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ic = kt(Mp), Pp = q({}, ns, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Dl }), $p = kt(Pp), Ap = q({}, fr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Dp = kt(Ap), Fp = q({}, oi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zp = kt(Fp), Wp = [9, 13, 27, 32], Fl = g && "CompositionEvent" in window, ss = null;
  g && "documentMode" in document && (ss = document.documentMode);
  var Xp = g && "TextEvent" in window && !ss, Lc = g && (!Fl || ss && 8 < ss && 11 >= ss), Rc = " ", _c = !1;
  function Oc(e, t) {
    switch (e) {
      case "keyup":
        return Wp.indexOf(t.keyCode) !== -1;
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
  function Mc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var hr = !1;
  function Zp(e, t) {
    switch (e) {
      case "compositionend":
        return Mc(t);
      case "keypress":
        return t.which !== 32 ? null : (_c = !0, Rc);
      case "textInput":
        return e = t.data, e === Rc && _c ? null : e;
      default:
        return null;
    }
  }
  function Bp(e, t) {
    if (hr) return e === "compositionend" || !Fl && Oc(e, t) ? (e = Nc(), si = Ol = yn = null, hr = !1, e) : null;
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
        return Lc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var qp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Pc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!qp[e.type] : t === "textarea";
  }
  function $c(e, t, r, o) {
    nc(o), t = fi(t, "onChange"), 0 < t.length && (r = new Ml("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
  }
  var is = null, ls = null;
  function Hp(e) {
    eu(e, 0);
  }
  function ai(e) {
    var t = xr(e);
    if (Xs(t)) return e;
  }
  function Up(e, t) {
    if (e === "change") return t;
  }
  var Ac = !1;
  if (g) {
    var zl;
    if (g) {
      var Wl = "oninput" in document;
      if (!Wl) {
        var Dc = document.createElement("div");
        Dc.setAttribute("oninput", "return;"), Wl = typeof Dc.oninput == "function";
      }
      zl = Wl;
    } else zl = !1;
    Ac = zl && (!document.documentMode || 9 < document.documentMode);
  }
  function Fc() {
    is && (is.detachEvent("onpropertychange", zc), ls = is = null);
  }
  function zc(e) {
    if (e.propertyName === "value" && ai(ls)) {
      var t = [];
      $c(t, ls, e, kl(e)), lc(Hp, t);
    }
  }
  function Yp(e, t, r) {
    e === "focusin" ? (Fc(), is = t, ls = r, is.attachEvent("onpropertychange", zc)) : e === "focusout" && Fc();
  }
  function Vp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ai(ls);
  }
  function Qp(e, t) {
    if (e === "click") return ai(t);
  }
  function Kp(e, t) {
    if (e === "input" || e === "change") return ai(t);
  }
  function Gp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var _t = typeof Object.is == "function" ? Object.is : Gp;
  function os(e, t) {
    if (_t(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var r = Object.keys(e), o = Object.keys(t);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var c = r[o];
      if (!x.call(t, c) || !_t(e[c], t[c])) return !1;
    }
    return !0;
  }
  function Wc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Xc(e, t) {
    var r = Wc(e);
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
      r = Wc(r);
    }
  }
  function Zc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Bc() {
    for (var e = window, t = rr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = rr(e.document);
    }
    return t;
  }
  function Xl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Jp(e) {
    var t = Bc(), r = e.focusedElem, o = e.selectionRange;
    if (t !== r && r && r.ownerDocument && Zc(r.ownerDocument.documentElement, r)) {
      if (o !== null && Xl(r)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var c = r.textContent.length, u = Math.min(o.start, c);
          o = o.end === void 0 ? u : Math.min(o.end, c), !e.extend && u > o && (c = o, o = u, u = c), c = Xc(r, u);
          var h = Xc(
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
  var e0 = g && "documentMode" in document && 11 >= document.documentMode, pr = null, Zl = null, as = null, Bl = !1;
  function qc(e, t, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Bl || pr == null || pr !== rr(o) || (o = pr, "selectionStart" in o && Xl(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), as && os(as, o) || (as = o, o = fi(Zl, "onSelect"), 0 < o.length && (t = new Ml("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = pr)));
  }
  function ci(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var mr = { animationend: ci("Animation", "AnimationEnd"), animationiteration: ci("Animation", "AnimationIteration"), animationstart: ci("Animation", "AnimationStart"), transitionend: ci("Transition", "TransitionEnd") }, ql = {}, Hc = {};
  g && (Hc = document.createElement("div").style, "AnimationEvent" in window || (delete mr.animationend.animation, delete mr.animationiteration.animation, delete mr.animationstart.animation), "TransitionEvent" in window || delete mr.transitionend.transition);
  function ui(e) {
    if (ql[e]) return ql[e];
    if (!mr[e]) return e;
    var t = mr[e], r;
    for (r in t) if (t.hasOwnProperty(r) && r in Hc) return ql[e] = t[r];
    return e;
  }
  var Uc = ui("animationend"), Yc = ui("animationiteration"), Vc = ui("animationstart"), Qc = ui("transitionend"), Kc = /* @__PURE__ */ new Map(), Gc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function xn(e, t) {
    Kc.set(e, t), f(t, [e]);
  }
  for (var Hl = 0; Hl < Gc.length; Hl++) {
    var Ul = Gc[Hl], t0 = Ul.toLowerCase(), n0 = Ul[0].toUpperCase() + Ul.slice(1);
    xn(t0, "on" + n0);
  }
  xn(Uc, "onAnimationEnd"), xn(Yc, "onAnimationIteration"), xn(Vc, "onAnimationStart"), xn("dblclick", "onDoubleClick"), xn("focusin", "onFocus"), xn("focusout", "onBlur"), xn(Qc, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), f("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), f("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), f("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), f("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var cs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), r0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(cs));
  function Jc(e, t, r) {
    var o = e.type || "unknown-event";
    e.currentTarget = r, tp(o, t, void 0, e), e.currentTarget = null;
  }
  function eu(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var o = e[r], c = o.event;
      o = o.listeners;
      e: {
        var u = void 0;
        if (t) for (var h = o.length - 1; 0 <= h; h--) {
          var y = o[h], w = y.instance, T = y.currentTarget;
          if (y = y.listener, w !== u && c.isPropagationStopped()) break e;
          Jc(c, y, T), u = w;
        }
        else for (h = 0; h < o.length; h++) {
          if (y = o[h], w = y.instance, T = y.currentTarget, y = y.listener, w !== u && c.isPropagationStopped()) break e;
          Jc(c, y, T), u = w;
        }
      }
    }
    if (Ys) throw e = bl, Ys = !1, bl = null, e;
  }
  function Re(e, t) {
    var r = t[to];
    r === void 0 && (r = t[to] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    r.has(o) || (tu(t, e, 2, !1), r.add(o));
  }
  function Yl(e, t, r) {
    var o = 0;
    t && (o |= 4), tu(r, e, o, t);
  }
  var di = "_reactListening" + Math.random().toString(36).slice(2);
  function us(e) {
    if (!e[di]) {
      e[di] = !0, a.forEach(function(r) {
        r !== "selectionchange" && (r0.has(r) || Yl(r, !1, e), Yl(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[di] || (t[di] = !0, Yl("selectionchange", !1, t));
    }
  }
  function tu(e, t, r, o) {
    switch (bc(t)) {
      case 1:
        var c = yp;
        break;
      case 4:
        c = xp;
        break;
      default:
        c = Rl;
    }
    r = c.bind(null, t, r, e), c = void 0, !Sl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), o ? c !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: c }) : e.addEventListener(t, r, !0) : c !== void 0 ? e.addEventListener(t, r, { passive: c }) : e.addEventListener(t, r, !1);
  }
  function Vl(e, t, r, o, c) {
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
          if (h = zn(y), h === null) return;
          if (w = h.tag, w === 5 || w === 6) {
            o = u = h;
            continue e;
          }
          y = y.parentNode;
        }
      }
      o = o.return;
    }
    lc(function() {
      var T = u, P = kl(r), A = [];
      e: {
        var M = Kc.get(e);
        if (M !== void 0) {
          var H = Ml, Q = e;
          switch (e) {
            case "keypress":
              if (ii(r) === 0) break e;
            case "keydown":
            case "keyup":
              H = Op;
              break;
            case "focusin":
              Q = "focus", H = Al;
              break;
            case "focusout":
              Q = "blur", H = Al;
              break;
            case "beforeblur":
            case "afterblur":
              H = Al;
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
              H = Cc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = vp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = $p;
              break;
            case Uc:
            case Yc:
            case Vc:
              H = bp;
              break;
            case Qc:
              H = Dp;
              break;
            case "scroll":
              H = wp;
              break;
            case "wheel":
              H = zp;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = Ep;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Ic;
          }
          var G = (t & 4) !== 0, We = !G && e === "scroll", N = G ? M !== null ? M + "Capture" : null : M;
          G = [];
          for (var v = T, E; v !== null; ) {
            E = v;
            var z = E.stateNode;
            if (E.tag === 5 && z !== null && (E = z, N !== null && (z = Hr(v, N), z != null && G.push(ds(v, z, E)))), We) break;
            v = v.return;
          }
          0 < G.length && (M = new H(M, Q, null, r, P), A.push({ event: M, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (M = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", M && r !== ar && (Q = r.relatedTarget || r.fromElement) && (zn(Q) || Q[Gt])) break e;
          if ((H || M) && (M = P.window === P ? P : (M = P.ownerDocument) ? M.defaultView || M.parentWindow : window, H ? (Q = r.relatedTarget || r.toElement, H = T, Q = Q ? zn(Q) : null, Q !== null && (We = Fn(Q), Q !== We || Q.tag !== 5 && Q.tag !== 6) && (Q = null)) : (H = null, Q = T), H !== Q)) {
            if (G = Cc, z = "onMouseLeave", N = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (G = Ic, z = "onPointerLeave", N = "onPointerEnter", v = "pointer"), We = H == null ? M : xr(H), E = Q == null ? M : xr(Q), M = new G(z, v + "leave", H, r, P), M.target = We, M.relatedTarget = E, z = null, zn(P) === T && (G = new G(N, v + "enter", Q, r, P), G.target = E, G.relatedTarget = We, z = G), We = z, H && Q) t: {
              for (G = H, N = Q, v = 0, E = G; E; E = gr(E)) v++;
              for (E = 0, z = N; z; z = gr(z)) E++;
              for (; 0 < v - E; ) G = gr(G), v--;
              for (; 0 < E - v; ) N = gr(N), E--;
              for (; v--; ) {
                if (G === N || N !== null && G === N.alternate) break t;
                G = gr(G), N = gr(N);
              }
              G = null;
            }
            else G = null;
            H !== null && nu(A, M, H, G, !1), Q !== null && We !== null && nu(A, We, Q, G, !0);
          }
        }
        e: {
          if (M = T ? xr(T) : window, H = M.nodeName && M.nodeName.toLowerCase(), H === "select" || H === "input" && M.type === "file") var ee = Up;
          else if (Pc(M)) if (Ac) ee = Kp;
          else {
            ee = Vp;
            var se = Yp;
          }
          else (H = M.nodeName) && H.toLowerCase() === "input" && (M.type === "checkbox" || M.type === "radio") && (ee = Qp);
          if (ee && (ee = ee(e, T))) {
            $c(A, ee, r, P);
            break e;
          }
          se && se(e, M, T), e === "focusout" && (se = M._wrapperState) && se.controlled && M.type === "number" && un(M, "number", M.value);
        }
        switch (se = T ? xr(T) : window, e) {
          case "focusin":
            (Pc(se) || se.contentEditable === "true") && (pr = se, Zl = T, as = null);
            break;
          case "focusout":
            as = Zl = pr = null;
            break;
          case "mousedown":
            Bl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bl = !1, qc(A, r, P);
            break;
          case "selectionchange":
            if (e0) break;
          case "keydown":
          case "keyup":
            qc(A, r, P);
        }
        var ie;
        if (Fl) e: {
          switch (e) {
            case "compositionstart":
              var ae = "onCompositionStart";
              break e;
            case "compositionend":
              ae = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ae = "onCompositionUpdate";
              break e;
          }
          ae = void 0;
        }
        else hr ? Oc(e, r) && (ae = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ae = "onCompositionStart");
        ae && (Lc && r.locale !== "ko" && (hr || ae !== "onCompositionStart" ? ae === "onCompositionEnd" && hr && (ie = Nc()) : (yn = P, Ol = "value" in yn ? yn.value : yn.textContent, hr = !0)), se = fi(T, ae), 0 < se.length && (ae = new Tc(ae, e, null, r, P), A.push({ event: ae, listeners: se }), ie ? ae.data = ie : (ie = Mc(r), ie !== null && (ae.data = ie)))), (ie = Xp ? Zp(e, r) : Bp(e, r)) && (T = fi(T, "onBeforeInput"), 0 < T.length && (P = new Tc("onBeforeInput", "beforeinput", null, r, P), A.push({ event: P, listeners: T }), P.data = ie));
      }
      eu(A, t);
    });
  }
  function ds(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function fi(e, t) {
    for (var r = t + "Capture", o = []; e !== null; ) {
      var c = e, u = c.stateNode;
      c.tag === 5 && u !== null && (c = u, u = Hr(e, r), u != null && o.unshift(ds(e, u, c)), u = Hr(e, t), u != null && o.push(ds(e, u, c))), e = e.return;
    }
    return o;
  }
  function gr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function nu(e, t, r, o, c) {
    for (var u = t._reactName, h = []; r !== null && r !== o; ) {
      var y = r, w = y.alternate, T = y.stateNode;
      if (w !== null && w === o) break;
      y.tag === 5 && T !== null && (y = T, c ? (w = Hr(r, u), w != null && h.unshift(ds(r, w, y))) : c || (w = Hr(r, u), w != null && h.push(ds(r, w, y)))), r = r.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var s0 = /\r\n?/g, i0 = /\u0000|\uFFFD/g;
  function ru(e) {
    return (typeof e == "string" ? e : "" + e).replace(s0, `
`).replace(i0, "");
  }
  function hi(e, t, r) {
    if (t = ru(t), ru(e) !== t && r) throw Error(l(425));
  }
  function pi() {
  }
  var Ql = null, Kl = null;
  function Gl(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jl = typeof setTimeout == "function" ? setTimeout : void 0, l0 = typeof clearTimeout == "function" ? clearTimeout : void 0, su = typeof Promise == "function" ? Promise : void 0, o0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof su < "u" ? function(e) {
    return su.resolve(null).then(e).catch(a0);
  } : Jl;
  function a0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function eo(e, t) {
    var r = t, o = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8) if (r = c.data, r === "/$") {
        if (o === 0) {
          e.removeChild(c), ts(t);
          return;
        }
        o--;
      } else r !== "$" && r !== "$?" && r !== "$!" || o++;
      r = c;
    } while (r);
    ts(t);
  }
  function wn(e) {
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
  function iu(e) {
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
  var yr = Math.random().toString(36).slice(2), Zt = "__reactFiber$" + yr, fs = "__reactProps$" + yr, Gt = "__reactContainer$" + yr, to = "__reactEvents$" + yr, c0 = "__reactListeners$" + yr, u0 = "__reactHandles$" + yr;
  function zn(e) {
    var t = e[Zt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Gt] || r[Zt]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = iu(e); e !== null; ) {
          if (r = e[Zt]) return r;
          e = iu(e);
        }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function hs(e) {
    return e = e[Zt] || e[Gt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function xr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(l(33));
  }
  function mi(e) {
    return e[fs] || null;
  }
  var no = [], wr = -1;
  function kn(e) {
    return { current: e };
  }
  function _e(e) {
    0 > wr || (e.current = no[wr], no[wr] = null, wr--);
  }
  function Ie(e, t) {
    wr++, no[wr] = e.current, e.current = t;
  }
  var vn = {}, nt = kn(vn), dt = kn(!1), Wn = vn;
  function kr(e, t) {
    var r = e.type.contextTypes;
    if (!r) return vn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, u;
    for (u in r) c[u] = t[u];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function ft(e) {
    return e = e.childContextTypes, e != null;
  }
  function gi() {
    _e(dt), _e(nt);
  }
  function lu(e, t, r) {
    if (nt.current !== vn) throw Error(l(168));
    Ie(nt, t), Ie(dt, r);
  }
  function ou(e, t, r) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
    o = o.getChildContext();
    for (var c in o) if (!(c in t)) throw Error(l(108, ve(e) || "Unknown", c));
    return q({}, r, o);
  }
  function yi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vn, Wn = nt.current, Ie(nt, e), Ie(dt, dt.current), !0;
  }
  function au(e, t, r) {
    var o = e.stateNode;
    if (!o) throw Error(l(169));
    r ? (e = ou(e, t, Wn), o.__reactInternalMemoizedMergedChildContext = e, _e(dt), _e(nt), Ie(nt, e)) : _e(dt), Ie(dt, r);
  }
  var Jt = null, xi = !1, ro = !1;
  function cu(e) {
    Jt === null ? Jt = [e] : Jt.push(e);
  }
  function d0(e) {
    xi = !0, cu(e);
  }
  function jn() {
    if (!ro && Jt !== null) {
      ro = !0;
      var e = 0, t = be;
      try {
        var r = Jt;
        for (be = 1; e < r.length; e++) {
          var o = r[e];
          do
            o = o(!0);
          while (o !== null);
        }
        Jt = null, xi = !1;
      } catch (c) {
        throw Jt !== null && (Jt = Jt.slice(e + 1)), dc(Nl, jn), c;
      } finally {
        be = t, ro = !1;
      }
    }
    return null;
  }
  var vr = [], jr = 0, wi = null, ki = 0, Nt = [], Et = 0, Xn = null, en = 1, tn = "";
  function Zn(e, t) {
    vr[jr++] = ki, vr[jr++] = wi, wi = e, ki = t;
  }
  function uu(e, t, r) {
    Nt[Et++] = en, Nt[Et++] = tn, Nt[Et++] = Xn, Xn = e;
    var o = en;
    e = tn;
    var c = 32 - Rt(o) - 1;
    o &= ~(1 << c), r += 1;
    var u = 32 - Rt(t) + c;
    if (30 < u) {
      var h = c - c % 5;
      u = (o & (1 << h) - 1).toString(32), o >>= h, c -= h, en = 1 << 32 - Rt(t) + c | r << c | o, tn = u + e;
    } else en = 1 << u | r << c | o, tn = e;
  }
  function so(e) {
    e.return !== null && (Zn(e, 1), uu(e, 1, 0));
  }
  function io(e) {
    for (; e === wi; ) wi = vr[--jr], vr[jr] = null, ki = vr[--jr], vr[jr] = null;
    for (; e === Xn; ) Xn = Nt[--Et], Nt[Et] = null, tn = Nt[--Et], Nt[Et] = null, en = Nt[--Et], Nt[Et] = null;
  }
  var vt = null, jt = null, Me = !1, Ot = null;
  function du(e, t) {
    var r = Lt(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function fu(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, vt = e, jt = wn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, vt = e, jt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Xn !== null ? { id: en, overflow: tn } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = Lt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, vt = e, jt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function lo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function oo(e) {
    if (Me) {
      var t = jt;
      if (t) {
        var r = t;
        if (!fu(e, t)) {
          if (lo(e)) throw Error(l(418));
          t = wn(r.nextSibling);
          var o = vt;
          t && fu(e, t) ? du(o, r) : (e.flags = e.flags & -4097 | 2, Me = !1, vt = e);
        }
      } else {
        if (lo(e)) throw Error(l(418));
        e.flags = e.flags & -4097 | 2, Me = !1, vt = e;
      }
    }
  }
  function hu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    vt = e;
  }
  function vi(e) {
    if (e !== vt) return !1;
    if (!Me) return hu(e), Me = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Gl(e.type, e.memoizedProps)), t && (t = jt)) {
      if (lo(e)) throw pu(), Error(l(418));
      for (; t; ) du(e, t), t = wn(t.nextSibling);
    }
    if (hu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                jt = wn(e.nextSibling);
                break e;
              }
              t--;
            } else r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        jt = null;
      }
    } else jt = vt ? wn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function pu() {
    for (var e = jt; e; ) e = wn(e.nextSibling);
  }
  function Sr() {
    jt = vt = null, Me = !1;
  }
  function ao(e) {
    Ot === null ? Ot = [e] : Ot.push(e);
  }
  var f0 = te.ReactCurrentBatchConfig;
  function ps(e, t, r) {
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
  function ji(e, t) {
    throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function mu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function gu(e) {
    function t(N, v) {
      if (e) {
        var E = N.deletions;
        E === null ? (N.deletions = [v], N.flags |= 16) : E.push(v);
      }
    }
    function r(N, v) {
      if (!e) return null;
      for (; v !== null; ) t(N, v), v = v.sibling;
      return null;
    }
    function o(N, v) {
      for (N = /* @__PURE__ */ new Map(); v !== null; ) v.key !== null ? N.set(v.key, v) : N.set(v.index, v), v = v.sibling;
      return N;
    }
    function c(N, v) {
      return N = Ln(N, v), N.index = 0, N.sibling = null, N;
    }
    function u(N, v, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < v ? (N.flags |= 2, v) : E) : (N.flags |= 2, v)) : (N.flags |= 1048576, v);
    }
    function h(N) {
      return e && N.alternate === null && (N.flags |= 2), N;
    }
    function y(N, v, E, z) {
      return v === null || v.tag !== 6 ? (v = ea(E, N.mode, z), v.return = N, v) : (v = c(v, E), v.return = N, v);
    }
    function w(N, v, E, z) {
      var ee = E.type;
      return ee === re ? P(N, v, E.props.children, z, E.key) : v !== null && (v.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === le && mu(ee) === v.type) ? (z = c(v, E.props), z.ref = ps(N, v, E), z.return = N, z) : (z = Hi(E.type, E.key, E.props, null, N.mode, z), z.ref = ps(N, v, E), z.return = N, z);
    }
    function T(N, v, E, z) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== E.containerInfo || v.stateNode.implementation !== E.implementation ? (v = ta(E, N.mode, z), v.return = N, v) : (v = c(v, E.children || []), v.return = N, v);
    }
    function P(N, v, E, z, ee) {
      return v === null || v.tag !== 7 ? (v = Kn(E, N.mode, z, ee), v.return = N, v) : (v = c(v, E), v.return = N, v);
    }
    function A(N, v, E) {
      if (typeof v == "string" && v !== "" || typeof v == "number") return v = ea("" + v, N.mode, E), v.return = N, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case K:
            return E = Hi(v.type, v.key, v.props, null, N.mode, E), E.ref = ps(N, null, v), E.return = N, E;
          case Z:
            return v = ta(v, N.mode, E), v.return = N, v;
          case le:
            var z = v._init;
            return A(N, z(v._payload), E);
        }
        if (Ke(v) || ne(v)) return v = Kn(v, N.mode, E, null), v.return = N, v;
        ji(N, v);
      }
      return null;
    }
    function M(N, v, E, z) {
      var ee = v !== null ? v.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number") return ee !== null ? null : y(N, v, "" + E, z);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case K:
            return E.key === ee ? w(N, v, E, z) : null;
          case Z:
            return E.key === ee ? T(N, v, E, z) : null;
          case le:
            return ee = E._init, M(
              N,
              v,
              ee(E._payload),
              z
            );
        }
        if (Ke(E) || ne(E)) return ee !== null ? null : P(N, v, E, z, null);
        ji(N, E);
      }
      return null;
    }
    function H(N, v, E, z, ee) {
      if (typeof z == "string" && z !== "" || typeof z == "number") return N = N.get(E) || null, y(v, N, "" + z, ee);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case K:
            return N = N.get(z.key === null ? E : z.key) || null, w(v, N, z, ee);
          case Z:
            return N = N.get(z.key === null ? E : z.key) || null, T(v, N, z, ee);
          case le:
            var se = z._init;
            return H(N, v, E, se(z._payload), ee);
        }
        if (Ke(z) || ne(z)) return N = N.get(E) || null, P(v, N, z, ee, null);
        ji(v, z);
      }
      return null;
    }
    function Q(N, v, E, z) {
      for (var ee = null, se = null, ie = v, ae = v = 0, Qe = null; ie !== null && ae < E.length; ae++) {
        ie.index > ae ? (Qe = ie, ie = null) : Qe = ie.sibling;
        var je = M(N, ie, E[ae], z);
        if (je === null) {
          ie === null && (ie = Qe);
          break;
        }
        e && ie && je.alternate === null && t(N, ie), v = u(je, v, ae), se === null ? ee = je : se.sibling = je, se = je, ie = Qe;
      }
      if (ae === E.length) return r(N, ie), Me && Zn(N, ae), ee;
      if (ie === null) {
        for (; ae < E.length; ae++) ie = A(N, E[ae], z), ie !== null && (v = u(ie, v, ae), se === null ? ee = ie : se.sibling = ie, se = ie);
        return Me && Zn(N, ae), ee;
      }
      for (ie = o(N, ie); ae < E.length; ae++) Qe = H(ie, N, ae, E[ae], z), Qe !== null && (e && Qe.alternate !== null && ie.delete(Qe.key === null ? ae : Qe.key), v = u(Qe, v, ae), se === null ? ee = Qe : se.sibling = Qe, se = Qe);
      return e && ie.forEach(function(Rn) {
        return t(N, Rn);
      }), Me && Zn(N, ae), ee;
    }
    function G(N, v, E, z) {
      var ee = ne(E);
      if (typeof ee != "function") throw Error(l(150));
      if (E = ee.call(E), E == null) throw Error(l(151));
      for (var se = ee = null, ie = v, ae = v = 0, Qe = null, je = E.next(); ie !== null && !je.done; ae++, je = E.next()) {
        ie.index > ae ? (Qe = ie, ie = null) : Qe = ie.sibling;
        var Rn = M(N, ie, je.value, z);
        if (Rn === null) {
          ie === null && (ie = Qe);
          break;
        }
        e && ie && Rn.alternate === null && t(N, ie), v = u(Rn, v, ae), se === null ? ee = Rn : se.sibling = Rn, se = Rn, ie = Qe;
      }
      if (je.done) return r(
        N,
        ie
      ), Me && Zn(N, ae), ee;
      if (ie === null) {
        for (; !je.done; ae++, je = E.next()) je = A(N, je.value, z), je !== null && (v = u(je, v, ae), se === null ? ee = je : se.sibling = je, se = je);
        return Me && Zn(N, ae), ee;
      }
      for (ie = o(N, ie); !je.done; ae++, je = E.next()) je = H(ie, N, ae, je.value, z), je !== null && (e && je.alternate !== null && ie.delete(je.key === null ? ae : je.key), v = u(je, v, ae), se === null ? ee = je : se.sibling = je, se = je);
      return e && ie.forEach(function(q0) {
        return t(N, q0);
      }), Me && Zn(N, ae), ee;
    }
    function We(N, v, E, z) {
      if (typeof E == "object" && E !== null && E.type === re && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case K:
            e: {
              for (var ee = E.key, se = v; se !== null; ) {
                if (se.key === ee) {
                  if (ee = E.type, ee === re) {
                    if (se.tag === 7) {
                      r(N, se.sibling), v = c(se, E.props.children), v.return = N, N = v;
                      break e;
                    }
                  } else if (se.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === le && mu(ee) === se.type) {
                    r(N, se.sibling), v = c(se, E.props), v.ref = ps(N, se, E), v.return = N, N = v;
                    break e;
                  }
                  r(N, se);
                  break;
                } else t(N, se);
                se = se.sibling;
              }
              E.type === re ? (v = Kn(E.props.children, N.mode, z, E.key), v.return = N, N = v) : (z = Hi(E.type, E.key, E.props, null, N.mode, z), z.ref = ps(N, v, E), z.return = N, N = z);
            }
            return h(N);
          case Z:
            e: {
              for (se = E.key; v !== null; ) {
                if (v.key === se) if (v.tag === 4 && v.stateNode.containerInfo === E.containerInfo && v.stateNode.implementation === E.implementation) {
                  r(N, v.sibling), v = c(v, E.children || []), v.return = N, N = v;
                  break e;
                } else {
                  r(N, v);
                  break;
                }
                else t(N, v);
                v = v.sibling;
              }
              v = ta(E, N.mode, z), v.return = N, N = v;
            }
            return h(N);
          case le:
            return se = E._init, We(N, v, se(E._payload), z);
        }
        if (Ke(E)) return Q(N, v, E, z);
        if (ne(E)) return G(N, v, E, z);
        ji(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" ? (E = "" + E, v !== null && v.tag === 6 ? (r(N, v.sibling), v = c(v, E), v.return = N, N = v) : (r(N, v), v = ea(E, N.mode, z), v.return = N, N = v), h(N)) : r(N, v);
    }
    return We;
  }
  var br = gu(!0), yu = gu(!1), Si = kn(null), bi = null, Nr = null, co = null;
  function uo() {
    co = Nr = bi = null;
  }
  function fo(e) {
    var t = Si.current;
    _e(Si), e._currentValue = t;
  }
  function ho(e, t, r) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function Er(e, t) {
    bi = e, co = Nr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (ht = !0), e.firstContext = null);
  }
  function Ct(e) {
    var t = e._currentValue;
    if (co !== e) if (e = { context: e, memoizedValue: t, next: null }, Nr === null) {
      if (bi === null) throw Error(l(308));
      Nr = e, bi.dependencies = { lanes: 0, firstContext: e };
    } else Nr = Nr.next = e;
    return t;
  }
  var Bn = null;
  function po(e) {
    Bn === null ? Bn = [e] : Bn.push(e);
  }
  function xu(e, t, r, o) {
    var c = t.interleaved;
    return c === null ? (r.next = r, po(t)) : (r.next = c.next, c.next = r), t.interleaved = r, nn(e, o);
  }
  function nn(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var Sn = !1;
  function mo(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function wu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function rn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function bn(e, t, r) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (we & 2) !== 0) {
      var c = o.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), o.pending = t, nn(e, r);
    }
    return c = o.interleaved, c === null ? (t.next = t, po(o)) : (t.next = c.next, c.next = t), o.interleaved = t, nn(e, r);
  }
  function Ni(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, Tl(e, r);
    }
  }
  function ku(e, t) {
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
  function Ei(e, t, r, o) {
    var c = e.updateQueue;
    Sn = !1;
    var u = c.firstBaseUpdate, h = c.lastBaseUpdate, y = c.shared.pending;
    if (y !== null) {
      c.shared.pending = null;
      var w = y, T = w.next;
      w.next = null, h === null ? u = T : h.next = T, h = w;
      var P = e.alternate;
      P !== null && (P = P.updateQueue, y = P.lastBaseUpdate, y !== h && (y === null ? P.firstBaseUpdate = T : y.next = T, P.lastBaseUpdate = w));
    }
    if (u !== null) {
      var A = c.baseState;
      h = 0, P = T = w = null, y = u;
      do {
        var M = y.lane, H = y.eventTime;
        if ((o & M) === M) {
          P !== null && (P = P.next = {
            eventTime: H,
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          });
          e: {
            var Q = e, G = y;
            switch (M = t, H = r, G.tag) {
              case 1:
                if (Q = G.payload, typeof Q == "function") {
                  A = Q.call(H, A, M);
                  break e;
                }
                A = Q;
                break e;
              case 3:
                Q.flags = Q.flags & -65537 | 128;
              case 0:
                if (Q = G.payload, M = typeof Q == "function" ? Q.call(H, A, M) : Q, M == null) break e;
                A = q({}, A, M);
                break e;
              case 2:
                Sn = !0;
            }
          }
          y.callback !== null && y.lane !== 0 && (e.flags |= 64, M = c.effects, M === null ? c.effects = [y] : M.push(y));
        } else H = { eventTime: H, lane: M, tag: y.tag, payload: y.payload, callback: y.callback, next: null }, P === null ? (T = P = H, w = A) : P = P.next = H, h |= M;
        if (y = y.next, y === null) {
          if (y = c.shared.pending, y === null) break;
          M = y, y = M.next, M.next = null, c.lastBaseUpdate = M, c.shared.pending = null;
        }
      } while (!0);
      if (P === null && (w = A), c.baseState = w, c.firstBaseUpdate = T, c.lastBaseUpdate = P, t = c.shared.interleaved, t !== null) {
        c = t;
        do
          h |= c.lane, c = c.next;
        while (c !== t);
      } else u === null && (c.shared.lanes = 0);
      Un |= h, e.lanes = h, e.memoizedState = A;
    }
  }
  function vu(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = r, typeof c != "function") throw Error(l(191, c));
        c.call(o);
      }
    }
  }
  var ms = {}, Bt = kn(ms), gs = kn(ms), ys = kn(ms);
  function qn(e) {
    if (e === ms) throw Error(l(174));
    return e;
  }
  function go(e, t) {
    switch (Ie(ys, t), Ie(gs, e), Ie(Bt, ms), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ge(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ge(t, e);
    }
    _e(Bt), Ie(Bt, t);
  }
  function Cr() {
    _e(Bt), _e(gs), _e(ys);
  }
  function ju(e) {
    qn(ys.current);
    var t = qn(Bt.current), r = Ge(t, e.type);
    t !== r && (Ie(gs, e), Ie(Bt, r));
  }
  function yo(e) {
    gs.current === e && (_e(Bt), _e(gs));
  }
  var Ae = kn(0);
  function Ci(e) {
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
  var xo = [];
  function wo() {
    for (var e = 0; e < xo.length; e++) xo[e]._workInProgressVersionPrimary = null;
    xo.length = 0;
  }
  var Ti = te.ReactCurrentDispatcher, ko = te.ReactCurrentBatchConfig, Hn = 0, De = null, qe = null, Ye = null, Ii = !1, xs = !1, ws = 0, h0 = 0;
  function rt() {
    throw Error(l(321));
  }
  function vo(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++) if (!_t(e[r], t[r])) return !1;
    return !0;
  }
  function jo(e, t, r, o, c, u) {
    if (Hn = u, De = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ti.current = e === null || e.memoizedState === null ? y0 : x0, e = r(o, c), xs) {
      u = 0;
      do {
        if (xs = !1, ws = 0, 25 <= u) throw Error(l(301));
        u += 1, Ye = qe = null, t.updateQueue = null, Ti.current = w0, e = r(o, c);
      } while (xs);
    }
    if (Ti.current = _i, t = qe !== null && qe.next !== null, Hn = 0, Ye = qe = De = null, Ii = !1, t) throw Error(l(300));
    return e;
  }
  function So() {
    var e = ws !== 0;
    return ws = 0, e;
  }
  function qt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ye === null ? De.memoizedState = Ye = e : Ye = Ye.next = e, Ye;
  }
  function Tt() {
    if (qe === null) {
      var e = De.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = Ye === null ? De.memoizedState : Ye.next;
    if (t !== null) Ye = t, qe = e;
    else {
      if (e === null) throw Error(l(310));
      qe = e, e = { memoizedState: qe.memoizedState, baseState: qe.baseState, baseQueue: qe.baseQueue, queue: qe.queue, next: null }, Ye === null ? De.memoizedState = Ye = e : Ye = Ye.next = e;
    }
    return Ye;
  }
  function ks(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function bo(e) {
    var t = Tt(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = qe, c = o.baseQueue, u = r.pending;
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
        var P = T.lane;
        if ((Hn & P) === P) w !== null && (w = w.next = { lane: 0, action: T.action, hasEagerState: T.hasEagerState, eagerState: T.eagerState, next: null }), o = T.hasEagerState ? T.eagerState : e(o, T.action);
        else {
          var A = {
            lane: P,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          };
          w === null ? (y = w = A, h = o) : w = w.next = A, De.lanes |= P, Un |= P;
        }
        T = T.next;
      } while (T !== null && T !== u);
      w === null ? h = o : w.next = y, _t(o, t.memoizedState) || (ht = !0), t.memoizedState = o, t.baseState = h, t.baseQueue = w, r.lastRenderedState = o;
    }
    if (e = r.interleaved, e !== null) {
      c = e;
      do
        u = c.lane, De.lanes |= u, Un |= u, c = c.next;
      while (c !== e);
    } else c === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function No(e) {
    var t = Tt(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = r.dispatch, c = r.pending, u = t.memoizedState;
    if (c !== null) {
      r.pending = null;
      var h = c = c.next;
      do
        u = e(u, h.action), h = h.next;
      while (h !== c);
      _t(u, t.memoizedState) || (ht = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
    }
    return [u, o];
  }
  function Su() {
  }
  function bu(e, t) {
    var r = De, o = Tt(), c = t(), u = !_t(o.memoizedState, c);
    if (u && (o.memoizedState = c, ht = !0), o = o.queue, Eo(Cu.bind(null, r, o, e), [e]), o.getSnapshot !== t || u || Ye !== null && Ye.memoizedState.tag & 1) {
      if (r.flags |= 2048, vs(9, Eu.bind(null, r, o, c, t), void 0, null), Ve === null) throw Error(l(349));
      (Hn & 30) !== 0 || Nu(r, t, c);
    }
    return c;
  }
  function Nu(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = De.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, De.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function Eu(e, t, r, o) {
    t.value = r, t.getSnapshot = o, Tu(t) && Iu(e);
  }
  function Cu(e, t, r) {
    return r(function() {
      Tu(t) && Iu(e);
    });
  }
  function Tu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !_t(e, r);
    } catch {
      return !0;
    }
  }
  function Iu(e) {
    var t = nn(e, 1);
    t !== null && At(t, e, 1, -1);
  }
  function Lu(e) {
    var t = qt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ks, lastRenderedState: e }, t.queue = e, e = e.dispatch = g0.bind(null, De, e), [t.memoizedState, e];
  }
  function vs(e, t, r, o) {
    return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = De.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, De.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Ru() {
    return Tt().memoizedState;
  }
  function Li(e, t, r, o) {
    var c = qt();
    De.flags |= e, c.memoizedState = vs(1 | t, r, void 0, o === void 0 ? null : o);
  }
  function Ri(e, t, r, o) {
    var c = Tt();
    o = o === void 0 ? null : o;
    var u = void 0;
    if (qe !== null) {
      var h = qe.memoizedState;
      if (u = h.destroy, o !== null && vo(o, h.deps)) {
        c.memoizedState = vs(t, r, u, o);
        return;
      }
    }
    De.flags |= e, c.memoizedState = vs(1 | t, r, u, o);
  }
  function _u(e, t) {
    return Li(8390656, 8, e, t);
  }
  function Eo(e, t) {
    return Ri(2048, 8, e, t);
  }
  function Ou(e, t) {
    return Ri(4, 2, e, t);
  }
  function Mu(e, t) {
    return Ri(4, 4, e, t);
  }
  function Pu(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function $u(e, t, r) {
    return r = r != null ? r.concat([e]) : null, Ri(4, 4, Pu.bind(null, t, e), r);
  }
  function Co() {
  }
  function Au(e, t) {
    var r = Tt();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && vo(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
  }
  function Du(e, t) {
    var r = Tt();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && vo(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function Fu(e, t, r) {
    return (Hn & 21) === 0 ? (e.baseState && (e.baseState = !1, ht = !0), e.memoizedState = r) : (_t(r, t) || (r = mc(), De.lanes |= r, Un |= r, e.baseState = !0), t);
  }
  function p0(e, t) {
    var r = be;
    be = r !== 0 && 4 > r ? r : 4, e(!0);
    var o = ko.transition;
    ko.transition = {};
    try {
      e(!1), t();
    } finally {
      be = r, ko.transition = o;
    }
  }
  function zu() {
    return Tt().memoizedState;
  }
  function m0(e, t, r) {
    var o = Tn(e);
    if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, Wu(e)) Xu(t, r);
    else if (r = xu(e, t, r, o), r !== null) {
      var c = ct();
      At(r, e, o, c), Zu(r, t, o);
    }
  }
  function g0(e, t, r) {
    var o = Tn(e), c = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
    if (Wu(e)) Xu(t, c);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var h = t.lastRenderedState, y = u(h, r);
        if (c.hasEagerState = !0, c.eagerState = y, _t(y, h)) {
          var w = t.interleaved;
          w === null ? (c.next = c, po(t)) : (c.next = w.next, w.next = c), t.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      r = xu(e, t, c, o), r !== null && (c = ct(), At(r, e, o, c), Zu(r, t, o));
    }
  }
  function Wu(e) {
    var t = e.alternate;
    return e === De || t !== null && t === De;
  }
  function Xu(e, t) {
    xs = Ii = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Zu(e, t, r) {
    if ((r & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, Tl(e, r);
    }
  }
  var _i = { readContext: Ct, useCallback: rt, useContext: rt, useEffect: rt, useImperativeHandle: rt, useInsertionEffect: rt, useLayoutEffect: rt, useMemo: rt, useReducer: rt, useRef: rt, useState: rt, useDebugValue: rt, useDeferredValue: rt, useTransition: rt, useMutableSource: rt, useSyncExternalStore: rt, useId: rt, unstable_isNewReconciler: !1 }, y0 = { readContext: Ct, useCallback: function(e, t) {
    return qt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: Ct, useEffect: _u, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, Li(
      4194308,
      4,
      Pu.bind(null, t, e),
      r
    );
  }, useLayoutEffect: function(e, t) {
    return Li(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Li(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = qt();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var o = qt();
    return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = m0.bind(null, De, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = qt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: Lu, useDebugValue: Co, useDeferredValue: function(e) {
    return qt().memoizedState = e;
  }, useTransition: function() {
    var e = Lu(!1), t = e[0];
    return e = p0.bind(null, e[1]), qt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var o = De, c = qt();
    if (Me) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else {
      if (r = t(), Ve === null) throw Error(l(349));
      (Hn & 30) !== 0 || Nu(o, t, r);
    }
    c.memoizedState = r;
    var u = { value: r, getSnapshot: t };
    return c.queue = u, _u(Cu.bind(
      null,
      o,
      u,
      e
    ), [e]), o.flags |= 2048, vs(9, Eu.bind(null, o, u, r, t), void 0, null), r;
  }, useId: function() {
    var e = qt(), t = Ve.identifierPrefix;
    if (Me) {
      var r = tn, o = en;
      r = (o & ~(1 << 32 - Rt(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = ws++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else r = h0++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, x0 = {
    readContext: Ct,
    useCallback: Au,
    useContext: Ct,
    useEffect: Eo,
    useImperativeHandle: $u,
    useInsertionEffect: Ou,
    useLayoutEffect: Mu,
    useMemo: Du,
    useReducer: bo,
    useRef: Ru,
    useState: function() {
      return bo(ks);
    },
    useDebugValue: Co,
    useDeferredValue: function(e) {
      var t = Tt();
      return Fu(t, qe.memoizedState, e);
    },
    useTransition: function() {
      var e = bo(ks)[0], t = Tt().memoizedState;
      return [e, t];
    },
    useMutableSource: Su,
    useSyncExternalStore: bu,
    useId: zu,
    unstable_isNewReconciler: !1
  }, w0 = { readContext: Ct, useCallback: Au, useContext: Ct, useEffect: Eo, useImperativeHandle: $u, useInsertionEffect: Ou, useLayoutEffect: Mu, useMemo: Du, useReducer: No, useRef: Ru, useState: function() {
    return No(ks);
  }, useDebugValue: Co, useDeferredValue: function(e) {
    var t = Tt();
    return qe === null ? t.memoizedState = e : Fu(t, qe.memoizedState, e);
  }, useTransition: function() {
    var e = No(ks)[0], t = Tt().memoizedState;
    return [e, t];
  }, useMutableSource: Su, useSyncExternalStore: bu, useId: zu, unstable_isNewReconciler: !1 };
  function Mt(e, t) {
    if (e && e.defaultProps) {
      t = q({}, t), e = e.defaultProps;
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function To(e, t, r, o) {
    t = e.memoizedState, r = r(o, t), r = r == null ? t : q({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Oi = { isMounted: function(e) {
    return (e = e._reactInternals) ? Fn(e) === e : !1;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var o = ct(), c = Tn(e), u = rn(o, c);
    u.payload = t, r != null && (u.callback = r), t = bn(e, u, c), t !== null && (At(t, e, c, o), Ni(t, e, c));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var o = ct(), c = Tn(e), u = rn(o, c);
    u.tag = 1, u.payload = t, r != null && (u.callback = r), t = bn(e, u, c), t !== null && (At(t, e, c, o), Ni(t, e, c));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = ct(), o = Tn(e), c = rn(r, o);
    c.tag = 2, t != null && (c.callback = t), t = bn(e, c, o), t !== null && (At(t, e, o, r), Ni(t, e, o));
  } };
  function Bu(e, t, r, o, c, u, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, h) : t.prototype && t.prototype.isPureReactComponent ? !os(r, o) || !os(c, u) : !0;
  }
  function qu(e, t, r) {
    var o = !1, c = vn, u = t.contextType;
    return typeof u == "object" && u !== null ? u = Ct(u) : (c = ft(t) ? Wn : nt.current, o = t.contextTypes, u = (o = o != null) ? kr(e, c) : vn), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Oi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = c, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function Hu(e, t, r, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && Oi.enqueueReplaceState(t, t.state, null);
  }
  function Io(e, t, r, o) {
    var c = e.stateNode;
    c.props = r, c.state = e.memoizedState, c.refs = {}, mo(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? c.context = Ct(u) : (u = ft(t) ? Wn : nt.current, c.context = kr(e, u)), c.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (To(e, t, u, r), c.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (t = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), t !== c.state && Oi.enqueueReplaceState(c, c.state, null), Ei(e, r, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Tr(e, t) {
    try {
      var r = "", o = t;
      do
        r += pe(o), o = o.return;
      while (o);
      var c = r;
    } catch (u) {
      c = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: c, digest: null };
  }
  function Lo(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function Ro(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var k0 = typeof WeakMap == "function" ? WeakMap : Map;
  function Uu(e, t, r) {
    r = rn(-1, r), r.tag = 3, r.payload = { element: null };
    var o = t.value;
    return r.callback = function() {
      zi || (zi = !0, Ho = o), Ro(e, t);
    }, r;
  }
  function Yu(e, t, r) {
    r = rn(-1, r), r.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = t.value;
      r.payload = function() {
        return o(c);
      }, r.callback = function() {
        Ro(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
      Ro(e, t), typeof o != "function" && (En === null ? En = /* @__PURE__ */ new Set([this]) : En.add(this));
      var h = t.stack;
      this.componentDidCatch(t.value, { componentStack: h !== null ? h : "" });
    }), r;
  }
  function Vu(e, t, r) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new k0();
      var c = /* @__PURE__ */ new Set();
      o.set(t, c);
    } else c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c));
    c.has(r) || (c.add(r), e = M0.bind(null, e, t, r), t.then(e, e));
  }
  function Qu(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Ku(e, t, r, o, c) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = rn(-1, 1), t.tag = 2, bn(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = c, e);
  }
  var v0 = te.ReactCurrentOwner, ht = !1;
  function at(e, t, r, o) {
    t.child = e === null ? yu(t, null, r, o) : br(t, e.child, r, o);
  }
  function Gu(e, t, r, o, c) {
    r = r.render;
    var u = t.ref;
    return Er(t, c), o = jo(e, t, r, o, u, c), r = So(), e !== null && !ht ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, sn(e, t, c)) : (Me && r && so(t), t.flags |= 1, at(e, t, o, c), t.child);
  }
  function Ju(e, t, r, o, c) {
    if (e === null) {
      var u = r.type;
      return typeof u == "function" && !Jo(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, ed(e, t, u, o, c)) : (e = Hi(r.type, null, o, t, t.mode, c), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & c) === 0) {
      var h = u.memoizedProps;
      if (r = r.compare, r = r !== null ? r : os, r(h, o) && e.ref === t.ref) return sn(e, t, c);
    }
    return t.flags |= 1, e = Ln(u, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ed(e, t, r, o, c) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (os(u, o) && e.ref === t.ref) if (ht = !1, t.pendingProps = o = u, (e.lanes & c) !== 0) (e.flags & 131072) !== 0 && (ht = !0);
      else return t.lanes = e.lanes, sn(e, t, c);
    }
    return _o(e, t, r, o, c);
  }
  function td(e, t, r) {
    var o = t.pendingProps, c = o.children, u = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ie(Lr, St), St |= r;
    else {
      if ((r & 1073741824) === 0) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ie(Lr, St), St |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : r, Ie(Lr, St), St |= o;
    }
    else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, Ie(Lr, St), St |= o;
    return at(e, t, c, r), t.child;
  }
  function nd(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function _o(e, t, r, o, c) {
    var u = ft(r) ? Wn : nt.current;
    return u = kr(t, u), Er(t, c), r = jo(e, t, r, o, u, c), o = So(), e !== null && !ht ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, sn(e, t, c)) : (Me && o && so(t), t.flags |= 1, at(e, t, r, c), t.child);
  }
  function rd(e, t, r, o, c) {
    if (ft(r)) {
      var u = !0;
      yi(t);
    } else u = !1;
    if (Er(t, c), t.stateNode === null) Pi(e, t), qu(t, r, o), Io(t, r, o, c), o = !0;
    else if (e === null) {
      var h = t.stateNode, y = t.memoizedProps;
      h.props = y;
      var w = h.context, T = r.contextType;
      typeof T == "object" && T !== null ? T = Ct(T) : (T = ft(r) ? Wn : nt.current, T = kr(t, T));
      var P = r.getDerivedStateFromProps, A = typeof P == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      A || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== o || w !== T) && Hu(t, h, o, T), Sn = !1;
      var M = t.memoizedState;
      h.state = M, Ei(t, o, h, c), w = t.memoizedState, y !== o || M !== w || dt.current || Sn ? (typeof P == "function" && (To(t, r, P, o), w = t.memoizedState), (y = Sn || Bu(t, r, y, o, M, w, T)) ? (A || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = w), h.props = o, h.state = w, h.context = T, o = y) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      h = t.stateNode, wu(e, t), y = t.memoizedProps, T = t.type === t.elementType ? y : Mt(t.type, y), h.props = T, A = t.pendingProps, M = h.context, w = r.contextType, typeof w == "object" && w !== null ? w = Ct(w) : (w = ft(r) ? Wn : nt.current, w = kr(t, w));
      var H = r.getDerivedStateFromProps;
      (P = typeof H == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (y !== A || M !== w) && Hu(t, h, o, w), Sn = !1, M = t.memoizedState, h.state = M, Ei(t, o, h, c);
      var Q = t.memoizedState;
      y !== A || M !== Q || dt.current || Sn ? (typeof H == "function" && (To(t, r, H, o), Q = t.memoizedState), (T = Sn || Bu(t, r, T, o, M, Q, w) || !1) ? (P || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, Q, w), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, Q, w)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = Q), h.props = o, h.state = Q, h.context = w, o = T) : (typeof h.componentDidUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Oo(e, t, r, o, u, c);
  }
  function Oo(e, t, r, o, c, u) {
    nd(e, t);
    var h = (t.flags & 128) !== 0;
    if (!o && !h) return c && au(t, r, !1), sn(e, t, u);
    o = t.stateNode, v0.current = t;
    var y = h && typeof r.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && h ? (t.child = br(t, e.child, null, u), t.child = br(t, null, y, u)) : at(e, t, y, u), t.memoizedState = o.state, c && au(t, r, !0), t.child;
  }
  function sd(e) {
    var t = e.stateNode;
    t.pendingContext ? lu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && lu(e, t.context, !1), go(e, t.containerInfo);
  }
  function id(e, t, r, o, c) {
    return Sr(), ao(c), t.flags |= 256, at(e, t, r, o), t.child;
  }
  var Mo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Po(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function ld(e, t, r) {
    var o = t.pendingProps, c = Ae.current, u = !1, h = (t.flags & 128) !== 0, y;
    if ((y = h) || (y = e !== null && e.memoizedState === null ? !1 : (c & 2) !== 0), y ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (c |= 1), Ie(Ae, c & 1), e === null)
      return oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (h = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, h = { mode: "hidden", children: h }, (o & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = h) : u = Ui(h, o, 0, null), e = Kn(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Po(r), t.memoizedState = Mo, e) : $o(t, h));
    if (c = e.memoizedState, c !== null && (y = c.dehydrated, y !== null)) return j0(e, t, h, o, y, c, r);
    if (u) {
      u = o.fallback, h = t.mode, c = e.child, y = c.sibling;
      var w = { mode: "hidden", children: o.children };
      return (h & 1) === 0 && t.child !== c ? (o = t.child, o.childLanes = 0, o.pendingProps = w, t.deletions = null) : (o = Ln(c, w), o.subtreeFlags = c.subtreeFlags & 14680064), y !== null ? u = Ln(y, u) : (u = Kn(u, h, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, h = e.child.memoizedState, h = h === null ? Po(r) : { baseLanes: h.baseLanes | r, cachePool: null, transitions: h.transitions }, u.memoizedState = h, u.childLanes = e.childLanes & ~r, t.memoizedState = Mo, o;
    }
    return u = e.child, e = u.sibling, o = Ln(u, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function $o(e, t) {
    return t = Ui({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Mi(e, t, r, o) {
    return o !== null && ao(o), br(t, e.child, null, r), e = $o(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function j0(e, t, r, o, c, u, h) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, o = Lo(Error(l(422))), Mi(e, t, h, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, c = t.mode, o = Ui({ mode: "visible", children: o.children }, c, 0, null), u = Kn(u, c, h, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & 1) !== 0 && br(t, e.child, null, h), t.child.memoizedState = Po(h), t.memoizedState = Mo, u);
    if ((t.mode & 1) === 0) return Mi(e, t, h, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var y = o.dgst;
      return o = y, u = Error(l(419)), o = Lo(u, o, void 0), Mi(e, t, h, o);
    }
    if (y = (h & e.childLanes) !== 0, ht || y) {
      if (o = Ve, o !== null) {
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
        c = (c & (o.suspendedLanes | h)) !== 0 ? 0 : c, c !== 0 && c !== u.retryLane && (u.retryLane = c, nn(e, c), At(o, e, c, -1));
      }
      return Go(), o = Lo(Error(l(421))), Mi(e, t, h, o);
    }
    return c.data === "$?" ? (t.flags |= 128, t.child = e.child, t = P0.bind(null, e), c._reactRetry = t, null) : (e = u.treeContext, jt = wn(c.nextSibling), vt = t, Me = !0, Ot = null, e !== null && (Nt[Et++] = en, Nt[Et++] = tn, Nt[Et++] = Xn, en = e.id, tn = e.overflow, Xn = t), t = $o(t, o.children), t.flags |= 4096, t);
  }
  function od(e, t, r) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ho(e.return, t, r);
  }
  function Ao(e, t, r, o, c) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: c } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = c);
  }
  function ad(e, t, r) {
    var o = t.pendingProps, c = o.revealOrder, u = o.tail;
    if (at(e, t, o.children, r), o = Ae.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && od(e, r, t);
        else if (e.tag === 19) od(e, r, t);
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
    if (Ie(Ae, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (r = t.child, c = null; r !== null; ) e = r.alternate, e !== null && Ci(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = t.child, t.child = null) : (c = r.sibling, r.sibling = null), Ao(t, !1, c, r, u);
        break;
      case "backwards":
        for (r = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && Ci(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        Ao(t, !0, r, null, u);
        break;
      case "together":
        Ao(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Pi(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function sn(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), Un |= t.lanes, (r & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, r = Ln(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Ln(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function S0(e, t, r) {
    switch (t.tag) {
      case 3:
        sd(t), Sr();
        break;
      case 5:
        ju(t);
        break;
      case 1:
        ft(t.type) && yi(t);
        break;
      case 4:
        go(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, c = t.memoizedProps.value;
        Ie(Si, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (Ie(Ae, Ae.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? ld(e, t, r) : (Ie(Ae, Ae.current & 1), e = sn(e, t, r), e !== null ? e.sibling : null);
        Ie(Ae, Ae.current & 1);
        break;
      case 19:
        if (o = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return ad(e, t, r);
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Ie(Ae, Ae.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, td(e, t, r);
    }
    return sn(e, t, r);
  }
  var cd, Do, ud, dd;
  cd = function(e, t) {
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
  }, Do = function() {
  }, ud = function(e, t, r, o) {
    var c = e.memoizedProps;
    if (c !== o) {
      e = t.stateNode, qn(Bt.current);
      var u = null;
      switch (r) {
        case "input":
          c = sr(e, c), o = sr(e, o), u = [];
          break;
        case "select":
          c = q({}, c, { value: void 0 }), o = q({}, o, { value: void 0 }), u = [];
          break;
        case "textarea":
          c = lr(e, c), o = lr(e, o), u = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (e.onclick = pi);
      }
      or(r, o);
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
        else T === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, y = y ? y.__html : void 0, w != null && y !== w && (u = u || []).push(T, w)) : T === "children" ? typeof w != "string" && typeof w != "number" || (u = u || []).push(T, "" + w) : T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && (d.hasOwnProperty(T) ? (w != null && T === "onScroll" && Re("scroll", e), u || y === w || (u = [])) : (u = u || []).push(T, w));
      }
      r && (u = u || []).push("style", r);
      var T = u;
      (t.updateQueue = T) && (t.flags |= 4);
    }
  }, dd = function(e, t, r, o) {
    r !== o && (t.flags |= 4);
  };
  function js(e, t) {
    if (!Me) switch (e.tailMode) {
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
  function st(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
    if (t) for (var c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = e, c = c.sibling;
    else for (c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= o, e.childLanes = r, t;
  }
  function b0(e, t, r) {
    var o = t.pendingProps;
    switch (io(t), t.tag) {
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
        return st(t), null;
      case 1:
        return ft(t.type) && gi(), st(t), null;
      case 3:
        return o = t.stateNode, Cr(), _e(dt), _e(nt), wo(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (vi(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ot !== null && (Vo(Ot), Ot = null))), Do(e, t), st(t), null;
      case 5:
        yo(t);
        var c = qn(ys.current);
        if (r = t.type, e !== null && t.stateNode != null) ud(e, t, r, o, c), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(l(166));
            return st(t), null;
          }
          if (e = qn(Bt.current), vi(t)) {
            o = t.stateNode, r = t.type;
            var u = t.memoizedProps;
            switch (o[Zt] = t, o[fs] = u, e = (t.mode & 1) !== 0, r) {
              case "dialog":
                Re("cancel", o), Re("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Re("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < cs.length; c++) Re(cs[c], o);
                break;
              case "source":
                Re("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Re(
                  "error",
                  o
                ), Re("load", o);
                break;
              case "details":
                Re("toggle", o);
                break;
              case "input":
                Zs(o, u), Re("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!u.multiple }, Re("invalid", o);
                break;
              case "textarea":
                qs(o, u), Re("invalid", o);
            }
            or(r, u), c = null;
            for (var h in u) if (u.hasOwnProperty(h)) {
              var y = u[h];
              h === "children" ? typeof y == "string" ? o.textContent !== y && (u.suppressHydrationWarning !== !0 && hi(o.textContent, y, e), c = ["children", y]) : typeof y == "number" && o.textContent !== "" + y && (u.suppressHydrationWarning !== !0 && hi(
                o.textContent,
                y,
                e
              ), c = ["children", "" + y]) : d.hasOwnProperty(h) && y != null && h === "onScroll" && Re("scroll", o);
            }
            switch (r) {
              case "input":
                nr(o), wt(o, u, !0);
                break;
              case "textarea":
                nr(o), xe(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (o.onclick = pi);
            }
            o = c, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            h = c.nodeType === 9 ? c : c.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ce(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = h.createElement(r, { is: o.is }) : (e = h.createElement(r), r === "select" && (h = e, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : e = h.createElementNS(e, r), e[Zt] = t, e[fs] = o, cd(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (h = fn(r, o), r) {
                case "dialog":
                  Re("cancel", e), Re("close", e), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Re("load", e), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < cs.length; c++) Re(cs[c], e);
                  c = o;
                  break;
                case "source":
                  Re("error", e), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Re(
                    "error",
                    e
                  ), Re("load", e), c = o;
                  break;
                case "details":
                  Re("toggle", e), c = o;
                  break;
                case "input":
                  Zs(e, o), c = sr(e, o), Re("invalid", e);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, c = q({}, o, { value: void 0 }), Re("invalid", e);
                  break;
                case "textarea":
                  qs(e, o), c = lr(e, o), Re("invalid", e);
                  break;
                default:
                  c = o;
              }
              or(r, c), y = c;
              for (u in y) if (y.hasOwnProperty(u)) {
                var w = y[u];
                u === "style" ? qr(e, w) : u === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && Dn(e, w)) : u === "children" ? typeof w == "string" ? (r !== "textarea" || w !== "") && Kt(e, w) : typeof w == "number" && Kt(e, "" + w) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (d.hasOwnProperty(u) ? w != null && u === "onScroll" && Re("scroll", e) : w != null && D(e, u, w, h));
              }
              switch (r) {
                case "input":
                  nr(e), wt(e, o, !1);
                  break;
                case "textarea":
                  nr(e), xe(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ye(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, u = o.value, u != null ? Qt(e, !!o.multiple, u, !1) : o.defaultValue != null && Qt(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (e.onclick = pi);
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
        return st(t), null;
      case 6:
        if (e && t.stateNode != null) dd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(l(166));
          if (r = qn(ys.current), qn(Bt.current), vi(t)) {
            if (o = t.stateNode, r = t.memoizedProps, o[Zt] = t, (u = o.nodeValue !== r) && (e = vt, e !== null)) switch (e.tag) {
              case 3:
                hi(o.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && hi(o.nodeValue, r, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[Zt] = t, t.stateNode = o;
        }
        return st(t), null;
      case 13:
        if (_e(Ae), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Me && jt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) pu(), Sr(), t.flags |= 98560, u = !1;
          else if (u = vi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(l(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
              u[Zt] = t;
            } else Sr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), u = !1;
          } else Ot !== null && (Vo(Ot), Ot = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ae.current & 1) !== 0 ? He === 0 && (He = 3) : Go())), t.updateQueue !== null && (t.flags |= 4), st(t), null);
      case 4:
        return Cr(), Do(e, t), e === null && us(t.stateNode.containerInfo), st(t), null;
      case 10:
        return fo(t.type._context), st(t), null;
      case 17:
        return ft(t.type) && gi(), st(t), null;
      case 19:
        if (_e(Ae), u = t.memoizedState, u === null) return st(t), null;
        if (o = (t.flags & 128) !== 0, h = u.rendering, h === null) if (o) js(u, !1);
        else {
          if (He !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (h = Ci(e), h !== null) {
              for (t.flags |= 128, js(u, !1), o = h.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, h = u.alternate, h === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = h.childLanes, u.lanes = h.lanes, u.child = h.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = h.memoizedProps, u.memoizedState = h.memoizedState, u.updateQueue = h.updateQueue, u.type = h.type, e = h.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
              return Ie(Ae, Ae.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && ze() > Rr && (t.flags |= 128, o = !0, js(u, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = Ci(h), e !== null) {
            if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), js(u, !0), u.tail === null && u.tailMode === "hidden" && !h.alternate && !Me) return st(t), null;
          } else 2 * ze() - u.renderingStartTime > Rr && r !== 1073741824 && (t.flags |= 128, o = !0, js(u, !1), t.lanes = 4194304);
          u.isBackwards ? (h.sibling = t.child, t.child = h) : (r = u.last, r !== null ? r.sibling = h : t.child = h, u.last = h);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = ze(), t.sibling = null, r = Ae.current, Ie(Ae, o ? r & 1 | 2 : r & 1), t) : (st(t), null);
      case 22:
      case 23:
        return Ko(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (St & 1073741824) !== 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function N0(e, t) {
    switch (io(t), t.tag) {
      case 1:
        return ft(t.type) && gi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Cr(), _e(dt), _e(nt), wo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return yo(t), null;
      case 13:
        if (_e(Ae), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(l(340));
          Sr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return _e(Ae), null;
      case 4:
        return Cr(), null;
      case 10:
        return fo(t.type._context), null;
      case 22:
      case 23:
        return Ko(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var $i = !1, it = !1, E0 = typeof WeakSet == "function" ? WeakSet : Set, V = null;
  function Ir(e, t) {
    var r = e.ref;
    if (r !== null) if (typeof r == "function") try {
      r(null);
    } catch (o) {
      Fe(e, t, o);
    }
    else r.current = null;
  }
  function Fo(e, t, r) {
    try {
      r();
    } catch (o) {
      Fe(e, t, o);
    }
  }
  var fd = !1;
  function C0(e, t) {
    if (Ql = ni, e = Bc(), Xl(e)) {
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
          var h = 0, y = -1, w = -1, T = 0, P = 0, A = e, M = null;
          t: for (; ; ) {
            for (var H; A !== r || c !== 0 && A.nodeType !== 3 || (y = h + c), A !== u || o !== 0 && A.nodeType !== 3 || (w = h + o), A.nodeType === 3 && (h += A.nodeValue.length), (H = A.firstChild) !== null; )
              M = A, A = H;
            for (; ; ) {
              if (A === e) break t;
              if (M === r && ++T === c && (y = h), M === u && ++P === o && (w = h), (H = A.nextSibling) !== null) break;
              A = M, M = A.parentNode;
            }
            A = H;
          }
          r = y === -1 || w === -1 ? null : { start: y, end: w };
        } else r = null;
      }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Kl = { focusedElem: e, selectionRange: r }, ni = !1, V = t; V !== null; ) if (t = V, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, V = e;
    else for (; V !== null; ) {
      t = V;
      try {
        var Q = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Q !== null) {
              var G = Q.memoizedProps, We = Q.memoizedState, N = t.stateNode, v = N.getSnapshotBeforeUpdate(t.elementType === t.type ? G : Mt(t.type, G), We);
              N.__reactInternalSnapshotBeforeUpdate = v;
            }
            break;
          case 3:
            var E = t.stateNode.containerInfo;
            E.nodeType === 1 ? E.textContent = "" : E.nodeType === 9 && E.documentElement && E.removeChild(E.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(l(163));
        }
      } catch (z) {
        Fe(t, t.return, z);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, V = e;
        break;
      }
      V = t.return;
    }
    return Q = fd, fd = !1, Q;
  }
  function Ss(e, t, r) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & e) === e) {
          var u = c.destroy;
          c.destroy = void 0, u !== void 0 && Fo(t, r, u);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ai(e, t) {
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
  function zo(e) {
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
  function hd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, hd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Zt], delete t[fs], delete t[to], delete t[c0], delete t[u0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function pd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function md(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || pd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wo(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = pi));
    else if (o !== 4 && (e = e.child, e !== null)) for (Wo(e, t, r), e = e.sibling; e !== null; ) Wo(e, t, r), e = e.sibling;
  }
  function Xo(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Xo(e, t, r), e = e.sibling; e !== null; ) Xo(e, t, r), e = e.sibling;
  }
  var Je = null, Pt = !1;
  function Nn(e, t, r) {
    for (r = r.child; r !== null; ) gd(e, t, r), r = r.sibling;
  }
  function gd(e, t, r) {
    if (Xt && typeof Xt.onCommitFiberUnmount == "function") try {
      Xt.onCommitFiberUnmount(Qs, r);
    } catch {
    }
    switch (r.tag) {
      case 5:
        it || Ir(r, t);
      case 6:
        var o = Je, c = Pt;
        Je = null, Nn(e, t, r), Je = o, Pt = c, Je !== null && (Pt ? (e = Je, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Je.removeChild(r.stateNode));
        break;
      case 18:
        Je !== null && (Pt ? (e = Je, r = r.stateNode, e.nodeType === 8 ? eo(e.parentNode, r) : e.nodeType === 1 && eo(e, r), ts(e)) : eo(Je, r.stateNode));
        break;
      case 4:
        o = Je, c = Pt, Je = r.stateNode.containerInfo, Pt = !0, Nn(e, t, r), Je = o, Pt = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!it && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var u = c, h = u.destroy;
            u = u.tag, h !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && Fo(r, t, h), c = c.next;
          } while (c !== o);
        }
        Nn(e, t, r);
        break;
      case 1:
        if (!it && (Ir(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
        } catch (y) {
          Fe(r, t, y);
        }
        Nn(e, t, r);
        break;
      case 21:
        Nn(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (it = (o = it) || r.memoizedState !== null, Nn(e, t, r), it = o) : Nn(e, t, r);
        break;
      default:
        Nn(e, t, r);
    }
  }
  function yd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new E0()), t.forEach(function(o) {
        var c = $0.bind(null, e, o);
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
              Je = y.stateNode, Pt = !1;
              break e;
            case 3:
              Je = y.stateNode.containerInfo, Pt = !0;
              break e;
            case 4:
              Je = y.stateNode.containerInfo, Pt = !0;
              break e;
          }
          y = y.return;
        }
        if (Je === null) throw Error(l(160));
        gd(u, h, c), Je = null, Pt = !1;
        var w = c.alternate;
        w !== null && (w.return = null), c.return = null;
      } catch (T) {
        Fe(c, t, T);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) xd(t, e), t = t.sibling;
  }
  function xd(e, t) {
    var r = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ($t(t, e), Ht(e), o & 4) {
          try {
            Ss(3, e, e.return), Ai(3, e);
          } catch (G) {
            Fe(e, e.return, G);
          }
          try {
            Ss(5, e, e.return);
          } catch (G) {
            Fe(e, e.return, G);
          }
        }
        break;
      case 1:
        $t(t, e), Ht(e), o & 512 && r !== null && Ir(r, r.return);
        break;
      case 5:
        if ($t(t, e), Ht(e), o & 512 && r !== null && Ir(r, r.return), e.flags & 32) {
          var c = e.stateNode;
          try {
            Kt(c, "");
          } catch (G) {
            Fe(e, e.return, G);
          }
        }
        if (o & 4 && (c = e.stateNode, c != null)) {
          var u = e.memoizedProps, h = r !== null ? r.memoizedProps : u, y = e.type, w = e.updateQueue;
          if (e.updateQueue = null, w !== null) try {
            y === "input" && u.type === "radio" && u.name != null && Bs(c, u), fn(y, h);
            var T = fn(y, u);
            for (h = 0; h < w.length; h += 2) {
              var P = w[h], A = w[h + 1];
              P === "style" ? qr(c, A) : P === "dangerouslySetInnerHTML" ? Dn(c, A) : P === "children" ? Kt(c, A) : D(c, P, A, T);
            }
            switch (y) {
              case "input":
                ir(c, u);
                break;
              case "textarea":
                B(c, u);
                break;
              case "select":
                var M = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!u.multiple;
                var H = u.value;
                H != null ? Qt(c, !!u.multiple, H, !1) : M !== !!u.multiple && (u.defaultValue != null ? Qt(
                  c,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : Qt(c, !!u.multiple, u.multiple ? [] : "", !1));
            }
            c[fs] = u;
          } catch (G) {
            Fe(e, e.return, G);
          }
        }
        break;
      case 6:
        if ($t(t, e), Ht(e), o & 4) {
          if (e.stateNode === null) throw Error(l(162));
          c = e.stateNode, u = e.memoizedProps;
          try {
            c.nodeValue = u;
          } catch (G) {
            Fe(e, e.return, G);
          }
        }
        break;
      case 3:
        if ($t(t, e), Ht(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
          ts(t.containerInfo);
        } catch (G) {
          Fe(e, e.return, G);
        }
        break;
      case 4:
        $t(t, e), Ht(e);
        break;
      case 13:
        $t(t, e), Ht(e), c = e.child, c.flags & 8192 && (u = c.memoizedState !== null, c.stateNode.isHidden = u, !u || c.alternate !== null && c.alternate.memoizedState !== null || (qo = ze())), o & 4 && yd(e);
        break;
      case 22:
        if (P = r !== null && r.memoizedState !== null, e.mode & 1 ? (it = (T = it) || P, $t(t, e), it = T) : $t(t, e), Ht(e), o & 8192) {
          if (T = e.memoizedState !== null, (e.stateNode.isHidden = T) && !P && (e.mode & 1) !== 0) for (V = e, P = e.child; P !== null; ) {
            for (A = V = P; V !== null; ) {
              switch (M = V, H = M.child, M.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ss(4, M, M.return);
                  break;
                case 1:
                  Ir(M, M.return);
                  var Q = M.stateNode;
                  if (typeof Q.componentWillUnmount == "function") {
                    o = M, r = M.return;
                    try {
                      t = o, Q.props = t.memoizedProps, Q.state = t.memoizedState, Q.componentWillUnmount();
                    } catch (G) {
                      Fe(o, r, G);
                    }
                  }
                  break;
                case 5:
                  Ir(M, M.return);
                  break;
                case 22:
                  if (M.memoizedState !== null) {
                    vd(A);
                    continue;
                  }
              }
              H !== null ? (H.return = M, V = H) : vd(A);
            }
            P = P.sibling;
          }
          e: for (P = null, A = e; ; ) {
            if (A.tag === 5) {
              if (P === null) {
                P = A;
                try {
                  c = A.stateNode, T ? (u = c.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (y = A.stateNode, w = A.memoizedProps.style, h = w != null && w.hasOwnProperty("display") ? w.display : null, y.style.display = Br("display", h));
                } catch (G) {
                  Fe(e, e.return, G);
                }
              }
            } else if (A.tag === 6) {
              if (P === null) try {
                A.stateNode.nodeValue = T ? "" : A.memoizedProps;
              } catch (G) {
                Fe(e, e.return, G);
              }
            } else if ((A.tag !== 22 && A.tag !== 23 || A.memoizedState === null || A === e) && A.child !== null) {
              A.child.return = A, A = A.child;
              continue;
            }
            if (A === e) break e;
            for (; A.sibling === null; ) {
              if (A.return === null || A.return === e) break e;
              P === A && (P = null), A = A.return;
            }
            P === A && (P = null), A.sibling.return = A.return, A = A.sibling;
          }
        }
        break;
      case 19:
        $t(t, e), Ht(e), o & 4 && yd(e);
        break;
      case 21:
        break;
      default:
        $t(
          t,
          e
        ), Ht(e);
    }
  }
  function Ht(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (pd(r)) {
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
            o.flags & 32 && (Kt(c, ""), o.flags &= -33);
            var u = md(e);
            Xo(e, u, c);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, y = md(e);
            Wo(e, y, h);
            break;
          default:
            throw Error(l(161));
        }
      } catch (w) {
        Fe(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function T0(e, t, r) {
    V = e, wd(e);
  }
  function wd(e, t, r) {
    for (var o = (e.mode & 1) !== 0; V !== null; ) {
      var c = V, u = c.child;
      if (c.tag === 22 && o) {
        var h = c.memoizedState !== null || $i;
        if (!h) {
          var y = c.alternate, w = y !== null && y.memoizedState !== null || it;
          y = $i;
          var T = it;
          if ($i = h, (it = w) && !T) for (V = c; V !== null; ) h = V, w = h.child, h.tag === 22 && h.memoizedState !== null ? jd(c) : w !== null ? (w.return = h, V = w) : jd(c);
          for (; u !== null; ) V = u, wd(u), u = u.sibling;
          V = c, $i = y, it = T;
        }
        kd(e);
      } else (c.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = c, V = u) : kd(e);
    }
  }
  function kd(e) {
    for (; V !== null; ) {
      var t = V;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              it || Ai(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !it) if (r === null) o.componentDidMount();
              else {
                var c = t.elementType === t.type ? r.memoizedProps : Mt(t.type, r.memoizedProps);
                o.componentDidUpdate(c, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && vu(t, u, o);
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
                vu(t, h, r);
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
                  var P = T.memoizedState;
                  if (P !== null) {
                    var A = P.dehydrated;
                    A !== null && ts(A);
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
          it || t.flags & 512 && zo(t);
        } catch (M) {
          Fe(t, t.return, M);
        }
      }
      if (t === e) {
        V = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, V = r;
        break;
      }
      V = t.return;
    }
  }
  function vd(e) {
    for (; V !== null; ) {
      var t = V;
      if (t === e) {
        V = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, V = r;
        break;
      }
      V = t.return;
    }
  }
  function jd(e) {
    for (; V !== null; ) {
      var t = V;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              Ai(4, t);
            } catch (w) {
              Fe(t, r, w);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = t.return;
              try {
                o.componentDidMount();
              } catch (w) {
                Fe(t, c, w);
              }
            }
            var u = t.return;
            try {
              zo(t);
            } catch (w) {
              Fe(t, u, w);
            }
            break;
          case 5:
            var h = t.return;
            try {
              zo(t);
            } catch (w) {
              Fe(t, h, w);
            }
        }
      } catch (w) {
        Fe(t, t.return, w);
      }
      if (t === e) {
        V = null;
        break;
      }
      var y = t.sibling;
      if (y !== null) {
        y.return = t.return, V = y;
        break;
      }
      V = t.return;
    }
  }
  var I0 = Math.ceil, Di = te.ReactCurrentDispatcher, Zo = te.ReactCurrentOwner, It = te.ReactCurrentBatchConfig, we = 0, Ve = null, Ze = null, et = 0, St = 0, Lr = kn(0), He = 0, bs = null, Un = 0, Fi = 0, Bo = 0, Ns = null, pt = null, qo = 0, Rr = 1 / 0, ln = null, zi = !1, Ho = null, En = null, Wi = !1, Cn = null, Xi = 0, Es = 0, Uo = null, Zi = -1, Bi = 0;
  function ct() {
    return (we & 6) !== 0 ? ze() : Zi !== -1 ? Zi : Zi = ze();
  }
  function Tn(e) {
    return (e.mode & 1) === 0 ? 1 : (we & 2) !== 0 && et !== 0 ? et & -et : f0.transition !== null ? (Bi === 0 && (Bi = mc()), Bi) : (e = be, e !== 0 || (e = window.event, e = e === void 0 ? 16 : bc(e.type)), e);
  }
  function At(e, t, r, o) {
    if (50 < Es) throw Es = 0, Uo = null, Error(l(185));
    Qr(e, r, o), ((we & 2) === 0 || e !== Ve) && (e === Ve && ((we & 2) === 0 && (Fi |= r), He === 4 && In(e, et)), mt(e, o), r === 1 && we === 0 && (t.mode & 1) === 0 && (Rr = ze() + 500, xi && jn()));
  }
  function mt(e, t) {
    var r = e.callbackNode;
    fp(e, t);
    var o = Js(e, e === Ve ? et : 0);
    if (o === 0) r !== null && fc(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (r != null && fc(r), t === 1) e.tag === 0 ? d0(bd.bind(null, e)) : cu(bd.bind(null, e)), o0(function() {
        (we & 6) === 0 && jn();
      }), r = null;
      else {
        switch (gc(o)) {
          case 1:
            r = Nl;
            break;
          case 4:
            r = hc;
            break;
          case 16:
            r = Vs;
            break;
          case 536870912:
            r = pc;
            break;
          default:
            r = Vs;
        }
        r = _d(r, Sd.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function Sd(e, t) {
    if (Zi = -1, Bi = 0, (we & 6) !== 0) throw Error(l(327));
    var r = e.callbackNode;
    if (_r() && e.callbackNode !== r) return null;
    var o = Js(e, e === Ve ? et : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = qi(e, o);
    else {
      t = o;
      var c = we;
      we |= 2;
      var u = Ed();
      (Ve !== e || et !== t) && (ln = null, Rr = ze() + 500, Vn(e, t));
      do
        try {
          _0();
          break;
        } catch (y) {
          Nd(e, y);
        }
      while (!0);
      uo(), Di.current = u, we = c, Ze !== null ? t = 0 : (Ve = null, et = 0, t = He);
    }
    if (t !== 0) {
      if (t === 2 && (c = El(e), c !== 0 && (o = c, t = Yo(e, c))), t === 1) throw r = bs, Vn(e, 0), In(e, o), mt(e, ze()), r;
      if (t === 6) In(e, o);
      else {
        if (c = e.current.alternate, (o & 30) === 0 && !L0(c) && (t = qi(e, o), t === 2 && (u = El(e), u !== 0 && (o = u, t = Yo(e, u))), t === 1)) throw r = bs, Vn(e, 0), In(e, o), mt(e, ze()), r;
        switch (e.finishedWork = c, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Qn(e, pt, ln);
            break;
          case 3:
            if (In(e, o), (o & 130023424) === o && (t = qo + 500 - ze(), 10 < t)) {
              if (Js(e, 0) !== 0) break;
              if (c = e.suspendedLanes, (c & o) !== o) {
                ct(), e.pingedLanes |= e.suspendedLanes & c;
                break;
              }
              e.timeoutHandle = Jl(Qn.bind(null, e, pt, ln), t);
              break;
            }
            Qn(e, pt, ln);
            break;
          case 4:
            if (In(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, c = -1; 0 < o; ) {
              var h = 31 - Rt(o);
              u = 1 << h, h = t[h], h > c && (c = h), o &= ~u;
            }
            if (o = c, o = ze() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * I0(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Jl(Qn.bind(null, e, pt, ln), o);
              break;
            }
            Qn(e, pt, ln);
            break;
          case 5:
            Qn(e, pt, ln);
            break;
          default:
            throw Error(l(329));
        }
      }
    }
    return mt(e, ze()), e.callbackNode === r ? Sd.bind(null, e) : null;
  }
  function Yo(e, t) {
    var r = Ns;
    return e.current.memoizedState.isDehydrated && (Vn(e, t).flags |= 256), e = qi(e, t), e !== 2 && (t = pt, pt = r, t !== null && Vo(t)), e;
  }
  function Vo(e) {
    pt === null ? pt = e : pt.push.apply(pt, e);
  }
  function L0(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
          var c = r[o], u = c.getSnapshot;
          c = c.value;
          try {
            if (!_t(u(), c)) return !1;
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
  function In(e, t) {
    for (t &= ~Bo, t &= ~Fi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - Rt(t), o = 1 << r;
      e[r] = -1, t &= ~o;
    }
  }
  function bd(e) {
    if ((we & 6) !== 0) throw Error(l(327));
    _r();
    var t = Js(e, 0);
    if ((t & 1) === 0) return mt(e, ze()), null;
    var r = qi(e, t);
    if (e.tag !== 0 && r === 2) {
      var o = El(e);
      o !== 0 && (t = o, r = Yo(e, o));
    }
    if (r === 1) throw r = bs, Vn(e, 0), In(e, t), mt(e, ze()), r;
    if (r === 6) throw Error(l(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Qn(e, pt, ln), mt(e, ze()), null;
  }
  function Qo(e, t) {
    var r = we;
    we |= 1;
    try {
      return e(t);
    } finally {
      we = r, we === 0 && (Rr = ze() + 500, xi && jn());
    }
  }
  function Yn(e) {
    Cn !== null && Cn.tag === 0 && (we & 6) === 0 && _r();
    var t = we;
    we |= 1;
    var r = It.transition, o = be;
    try {
      if (It.transition = null, be = 1, e) return e();
    } finally {
      be = o, It.transition = r, we = t, (we & 6) === 0 && jn();
    }
  }
  function Ko() {
    St = Lr.current, _e(Lr);
  }
  function Vn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, l0(r)), Ze !== null) for (r = Ze.return; r !== null; ) {
      var o = r;
      switch (io(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && gi();
          break;
        case 3:
          Cr(), _e(dt), _e(nt), wo();
          break;
        case 5:
          yo(o);
          break;
        case 4:
          Cr();
          break;
        case 13:
          _e(Ae);
          break;
        case 19:
          _e(Ae);
          break;
        case 10:
          fo(o.type._context);
          break;
        case 22:
        case 23:
          Ko();
      }
      r = r.return;
    }
    if (Ve = e, Ze = e = Ln(e.current, null), et = St = t, He = 0, bs = null, Bo = Fi = Un = 0, pt = Ns = null, Bn !== null) {
      for (t = 0; t < Bn.length; t++) if (r = Bn[t], o = r.interleaved, o !== null) {
        r.interleaved = null;
        var c = o.next, u = r.pending;
        if (u !== null) {
          var h = u.next;
          u.next = c, o.next = h;
        }
        r.pending = o;
      }
      Bn = null;
    }
    return e;
  }
  function Nd(e, t) {
    do {
      var r = Ze;
      try {
        if (uo(), Ti.current = _i, Ii) {
          for (var o = De.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Ii = !1;
        }
        if (Hn = 0, Ye = qe = De = null, xs = !1, ws = 0, Zo.current = null, r === null || r.return === null) {
          He = 1, bs = t, Ze = null;
          break;
        }
        e: {
          var u = e, h = r.return, y = r, w = t;
          if (t = et, y.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var T = w, P = y, A = P.tag;
            if ((P.mode & 1) === 0 && (A === 0 || A === 11 || A === 15)) {
              var M = P.alternate;
              M ? (P.updateQueue = M.updateQueue, P.memoizedState = M.memoizedState, P.lanes = M.lanes) : (P.updateQueue = null, P.memoizedState = null);
            }
            var H = Qu(h);
            if (H !== null) {
              H.flags &= -257, Ku(H, h, y, u, t), H.mode & 1 && Vu(u, T, t), t = H, w = T;
              var Q = t.updateQueue;
              if (Q === null) {
                var G = /* @__PURE__ */ new Set();
                G.add(w), t.updateQueue = G;
              } else Q.add(w);
              break e;
            } else {
              if ((t & 1) === 0) {
                Vu(u, T, t), Go();
                break e;
              }
              w = Error(l(426));
            }
          } else if (Me && y.mode & 1) {
            var We = Qu(h);
            if (We !== null) {
              (We.flags & 65536) === 0 && (We.flags |= 256), Ku(We, h, y, u, t), ao(Tr(w, y));
              break e;
            }
          }
          u = w = Tr(w, y), He !== 4 && (He = 2), Ns === null ? Ns = [u] : Ns.push(u), u = h;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var N = Uu(u, w, t);
                ku(u, N);
                break e;
              case 1:
                y = w;
                var v = u.type, E = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof v.getDerivedStateFromError == "function" || E !== null && typeof E.componentDidCatch == "function" && (En === null || !En.has(E)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var z = Yu(u, y, t);
                  ku(u, z);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        Td(r);
      } catch (ee) {
        t = ee, Ze === r && r !== null && (Ze = r = r.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Ed() {
    var e = Di.current;
    return Di.current = _i, e === null ? _i : e;
  }
  function Go() {
    (He === 0 || He === 3 || He === 2) && (He = 4), Ve === null || (Un & 268435455) === 0 && (Fi & 268435455) === 0 || In(Ve, et);
  }
  function qi(e, t) {
    var r = we;
    we |= 2;
    var o = Ed();
    (Ve !== e || et !== t) && (ln = null, Vn(e, t));
    do
      try {
        R0();
        break;
      } catch (c) {
        Nd(e, c);
      }
    while (!0);
    if (uo(), we = r, Di.current = o, Ze !== null) throw Error(l(261));
    return Ve = null, et = 0, He;
  }
  function R0() {
    for (; Ze !== null; ) Cd(Ze);
  }
  function _0() {
    for (; Ze !== null && !rp(); ) Cd(Ze);
  }
  function Cd(e) {
    var t = Rd(e.alternate, e, St);
    e.memoizedProps = e.pendingProps, t === null ? Td(e) : Ze = t, Zo.current = null;
  }
  function Td(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (r = b0(r, t, St), r !== null) {
          Ze = r;
          return;
        }
      } else {
        if (r = N0(r, t), r !== null) {
          r.flags &= 32767, Ze = r;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          He = 6, Ze = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Ze = t;
        return;
      }
      Ze = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function Qn(e, t, r) {
    var o = be, c = It.transition;
    try {
      It.transition = null, be = 1, O0(e, t, r, o);
    } finally {
      It.transition = c, be = o;
    }
    return null;
  }
  function O0(e, t, r, o) {
    do
      _r();
    while (Cn !== null);
    if ((we & 6) !== 0) throw Error(l(327));
    r = e.finishedWork;
    var c = e.finishedLanes;
    if (r === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = r.lanes | r.childLanes;
    if (hp(e, u), e === Ve && (Ze = Ve = null, et = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || Wi || (Wi = !0, _d(Vs, function() {
      return _r(), null;
    })), u = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || u) {
      u = It.transition, It.transition = null;
      var h = be;
      be = 1;
      var y = we;
      we |= 4, Zo.current = null, C0(e, r), xd(r, e), Jp(Kl), ni = !!Ql, Kl = Ql = null, e.current = r, T0(r), sp(), we = y, be = h, It.transition = u;
    } else e.current = r;
    if (Wi && (Wi = !1, Cn = e, Xi = c), u = e.pendingLanes, u === 0 && (En = null), op(r.stateNode), mt(e, ze()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) c = t[r], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (zi) throw zi = !1, e = Ho, Ho = null, e;
    return (Xi & 1) !== 0 && e.tag !== 0 && _r(), u = e.pendingLanes, (u & 1) !== 0 ? e === Uo ? Es++ : (Es = 0, Uo = e) : Es = 0, jn(), null;
  }
  function _r() {
    if (Cn !== null) {
      var e = gc(Xi), t = It.transition, r = be;
      try {
        if (It.transition = null, be = 16 > e ? 16 : e, Cn === null) var o = !1;
        else {
          if (e = Cn, Cn = null, Xi = 0, (we & 6) !== 0) throw Error(l(331));
          var c = we;
          for (we |= 4, V = e.current; V !== null; ) {
            var u = V, h = u.child;
            if ((V.flags & 16) !== 0) {
              var y = u.deletions;
              if (y !== null) {
                for (var w = 0; w < y.length; w++) {
                  var T = y[w];
                  for (V = T; V !== null; ) {
                    var P = V;
                    switch (P.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ss(8, P, u);
                    }
                    var A = P.child;
                    if (A !== null) A.return = P, V = A;
                    else for (; V !== null; ) {
                      P = V;
                      var M = P.sibling, H = P.return;
                      if (hd(P), P === T) {
                        V = null;
                        break;
                      }
                      if (M !== null) {
                        M.return = H, V = M;
                        break;
                      }
                      V = H;
                    }
                  }
                }
                var Q = u.alternate;
                if (Q !== null) {
                  var G = Q.child;
                  if (G !== null) {
                    Q.child = null;
                    do {
                      var We = G.sibling;
                      G.sibling = null, G = We;
                    } while (G !== null);
                  }
                }
                V = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && h !== null) h.return = u, V = h;
            else e: for (; V !== null; ) {
              if (u = V, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Ss(9, u, u.return);
              }
              var N = u.sibling;
              if (N !== null) {
                N.return = u.return, V = N;
                break e;
              }
              V = u.return;
            }
          }
          var v = e.current;
          for (V = v; V !== null; ) {
            h = V;
            var E = h.child;
            if ((h.subtreeFlags & 2064) !== 0 && E !== null) E.return = h, V = E;
            else e: for (h = v; V !== null; ) {
              if (y = V, (y.flags & 2048) !== 0) try {
                switch (y.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ai(9, y);
                }
              } catch (ee) {
                Fe(y, y.return, ee);
              }
              if (y === h) {
                V = null;
                break e;
              }
              var z = y.sibling;
              if (z !== null) {
                z.return = y.return, V = z;
                break e;
              }
              V = y.return;
            }
          }
          if (we = c, jn(), Xt && typeof Xt.onPostCommitFiberRoot == "function") try {
            Xt.onPostCommitFiberRoot(Qs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        be = r, It.transition = t;
      }
    }
    return !1;
  }
  function Id(e, t, r) {
    t = Tr(r, t), t = Uu(e, t, 1), e = bn(e, t, 1), t = ct(), e !== null && (Qr(e, 1, t), mt(e, t));
  }
  function Fe(e, t, r) {
    if (e.tag === 3) Id(e, e, r);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Id(t, e, r);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (En === null || !En.has(o))) {
          e = Tr(r, e), e = Yu(t, e, 1), t = bn(t, e, 1), e = ct(), t !== null && (Qr(t, 1, e), mt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function M0(e, t, r) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = ct(), e.pingedLanes |= e.suspendedLanes & r, Ve === e && (et & r) === r && (He === 4 || He === 3 && (et & 130023424) === et && 500 > ze() - qo ? Vn(e, 0) : Bo |= r), mt(e, t);
  }
  function Ld(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Gs, Gs <<= 1, (Gs & 130023424) === 0 && (Gs = 4194304)));
    var r = ct();
    e = nn(e, t), e !== null && (Qr(e, t, r), mt(e, r));
  }
  function P0(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), Ld(e, r);
  }
  function $0(e, t) {
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
    o !== null && o.delete(t), Ld(e, r);
  }
  var Rd;
  Rd = function(e, t, r) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || dt.current) ht = !0;
    else {
      if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return ht = !1, S0(e, t, r);
      ht = (e.flags & 131072) !== 0;
    }
    else ht = !1, Me && (t.flags & 1048576) !== 0 && uu(t, ki, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Pi(e, t), e = t.pendingProps;
        var c = kr(t, nt.current);
        Er(t, r), c = jo(null, t, o, e, c, r);
        var u = So();
        return t.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ft(o) ? (u = !0, yi(t)) : u = !1, t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, mo(t), c.updater = Oi, t.stateNode = c, c._reactInternals = t, Io(t, o, e, r), t = Oo(null, t, o, !0, u, r)) : (t.tag = 0, Me && u && so(t), at(null, t, c, r), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Pi(e, t), e = t.pendingProps, c = o._init, o = c(o._payload), t.type = o, c = t.tag = D0(o), e = Mt(o, e), c) {
            case 0:
              t = _o(null, t, o, e, r);
              break e;
            case 1:
              t = rd(null, t, o, e, r);
              break e;
            case 11:
              t = Gu(null, t, o, e, r);
              break e;
            case 14:
              t = Ju(null, t, o, Mt(o.type, e), r);
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
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Mt(o, c), _o(e, t, o, c, r);
      case 1:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Mt(o, c), rd(e, t, o, c, r);
      case 3:
        e: {
          if (sd(t), e === null) throw Error(l(387));
          o = t.pendingProps, u = t.memoizedState, c = u.element, wu(e, t), Ei(t, o, null, r);
          var h = t.memoizedState;
          if (o = h.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            c = Tr(Error(l(423)), t), t = id(e, t, o, r, c);
            break e;
          } else if (o !== c) {
            c = Tr(Error(l(424)), t), t = id(e, t, o, r, c);
            break e;
          } else for (jt = wn(t.stateNode.containerInfo.firstChild), vt = t, Me = !0, Ot = null, r = yu(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if (Sr(), o === c) {
              t = sn(e, t, r);
              break e;
            }
            at(e, t, o, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return ju(t), e === null && oo(t), o = t.type, c = t.pendingProps, u = e !== null ? e.memoizedProps : null, h = c.children, Gl(o, c) ? h = null : u !== null && Gl(o, u) && (t.flags |= 32), nd(e, t), at(e, t, h, r), t.child;
      case 6:
        return e === null && oo(t), null;
      case 13:
        return ld(e, t, r);
      case 4:
        return go(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = br(t, null, o, r) : at(e, t, o, r), t.child;
      case 11:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Mt(o, c), Gu(e, t, o, c, r);
      case 7:
        return at(e, t, t.pendingProps, r), t.child;
      case 8:
        return at(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return at(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (o = t.type._context, c = t.pendingProps, u = t.memoizedProps, h = c.value, Ie(Si, o._currentValue), o._currentValue = h, u !== null) if (_t(u.value, h)) {
            if (u.children === c.children && !dt.current) {
              t = sn(e, t, r);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var y = u.dependencies;
            if (y !== null) {
              h = u.child;
              for (var w = y.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (u.tag === 1) {
                    w = rn(-1, r & -r), w.tag = 2;
                    var T = u.updateQueue;
                    if (T !== null) {
                      T = T.shared;
                      var P = T.pending;
                      P === null ? w.next = w : (w.next = P.next, P.next = w), T.pending = w;
                    }
                  }
                  u.lanes |= r, w = u.alternate, w !== null && (w.lanes |= r), ho(
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
              h.lanes |= r, y = h.alternate, y !== null && (y.lanes |= r), ho(h, r, t), h = u.sibling;
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
          at(e, t, c.children, r), t = t.child;
        }
        return t;
      case 9:
        return c = t.type, o = t.pendingProps.children, Er(t, r), c = Ct(c), o = o(c), t.flags |= 1, at(e, t, o, r), t.child;
      case 14:
        return o = t.type, c = Mt(o, t.pendingProps), c = Mt(o.type, c), Ju(e, t, o, c, r);
      case 15:
        return ed(e, t, t.type, t.pendingProps, r);
      case 17:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : Mt(o, c), Pi(e, t), t.tag = 1, ft(o) ? (e = !0, yi(t)) : e = !1, Er(t, r), qu(t, o, c), Io(t, o, c, r), Oo(null, t, o, !0, e, r);
      case 19:
        return ad(e, t, r);
      case 22:
        return td(e, t, r);
    }
    throw Error(l(156, t.tag));
  };
  function _d(e, t) {
    return dc(e, t);
  }
  function A0(e, t, r, o) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Lt(e, t, r, o) {
    return new A0(e, t, r, o);
  }
  function Jo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function D0(e) {
    if (typeof e == "function") return Jo(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === U) return 11;
      if (e === oe) return 14;
    }
    return 2;
  }
  function Ln(e, t) {
    var r = e.alternate;
    return r === null ? (r = Lt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function Hi(e, t, r, o, c, u) {
    var h = 2;
    if (o = e, typeof e == "function") Jo(e) && (h = 1);
    else if (typeof e == "string") h = 5;
    else e: switch (e) {
      case re:
        return Kn(r.children, c, u, t);
      case ue:
        h = 8, c |= 8;
        break;
      case Ne:
        return e = Lt(12, r, t, c | 2), e.elementType = Ne, e.lanes = u, e;
      case Y:
        return e = Lt(13, r, t, c), e.elementType = Y, e.lanes = u, e;
      case ke:
        return e = Lt(19, r, t, c), e.elementType = ke, e.lanes = u, e;
      case ge:
        return Ui(r, c, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case $e:
            h = 10;
            break e;
          case Be:
            h = 9;
            break e;
          case U:
            h = 11;
            break e;
          case oe:
            h = 14;
            break e;
          case le:
            h = 16, o = null;
            break e;
        }
        throw Error(l(130, e == null ? e : typeof e, ""));
    }
    return t = Lt(h, r, t, c), t.elementType = e, t.type = o, t.lanes = u, t;
  }
  function Kn(e, t, r, o) {
    return e = Lt(7, e, o, t), e.lanes = r, e;
  }
  function Ui(e, t, r, o) {
    return e = Lt(22, e, o, t), e.elementType = ge, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
  }
  function ea(e, t, r) {
    return e = Lt(6, e, null, t), e.lanes = r, e;
  }
  function ta(e, t, r) {
    return t = Lt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function F0(e, t, r, o, c) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Cl(0), this.expirationTimes = Cl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cl(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function na(e, t, r, o, c, u, h, y, w) {
    return e = new F0(e, t, r, y, w), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = Lt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, mo(u), e;
  }
  function z0(e, t, r) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Z, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
  }
  function Od(e) {
    if (!e) return vn;
    e = e._reactInternals;
    e: {
      if (Fn(e) !== e || e.tag !== 1) throw Error(l(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ft(t.type)) {
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
      if (ft(r)) return ou(e, r, t);
    }
    return t;
  }
  function Md(e, t, r, o, c, u, h, y, w) {
    return e = na(r, o, !0, e, c, u, h, y, w), e.context = Od(null), r = e.current, o = ct(), c = Tn(r), u = rn(o, c), u.callback = t ?? null, bn(r, u, c), e.current.lanes = c, Qr(e, c, o), mt(e, o), e;
  }
  function Yi(e, t, r, o) {
    var c = t.current, u = ct(), h = Tn(c);
    return r = Od(r), t.context === null ? t.context = r : t.pendingContext = r, t = rn(u, h), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = bn(c, t, h), e !== null && (At(e, c, h, u), Ni(e, c, h)), h;
  }
  function Vi(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Pd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function ra(e, t) {
    Pd(e, t), (e = e.alternate) && Pd(e, t);
  }
  function W0() {
    return null;
  }
  var $d = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function sa(e) {
    this._internalRoot = e;
  }
  Qi.prototype.render = sa.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    Yi(e, t, null, null);
  }, Qi.prototype.unmount = sa.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Yn(function() {
        Yi(null, e, null, null);
      }), t[Gt] = null;
    }
  };
  function Qi(e) {
    this._internalRoot = e;
  }
  Qi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = wc();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < gn.length && t !== 0 && t < gn[r].priority; r++) ;
      gn.splice(r, 0, e), r === 0 && jc(e);
    }
  };
  function ia(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ki(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ad() {
  }
  function X0(e, t, r, o, c) {
    if (c) {
      if (typeof o == "function") {
        var u = o;
        o = function() {
          var T = Vi(h);
          u.call(T);
        };
      }
      var h = Md(t, o, e, 0, null, !1, !1, "", Ad);
      return e._reactRootContainer = h, e[Gt] = h.current, us(e.nodeType === 8 ? e.parentNode : e), Yn(), h;
    }
    for (; c = e.lastChild; ) e.removeChild(c);
    if (typeof o == "function") {
      var y = o;
      o = function() {
        var T = Vi(w);
        y.call(T);
      };
    }
    var w = na(e, 0, !1, null, null, !1, !1, "", Ad);
    return e._reactRootContainer = w, e[Gt] = w.current, us(e.nodeType === 8 ? e.parentNode : e), Yn(function() {
      Yi(t, w, r, o);
    }), w;
  }
  function Gi(e, t, r, o, c) {
    var u = r._reactRootContainer;
    if (u) {
      var h = u;
      if (typeof c == "function") {
        var y = c;
        c = function() {
          var w = Vi(h);
          y.call(w);
        };
      }
      Yi(t, h, e, c);
    } else h = X0(r, t, e, c, o);
    return Vi(h);
  }
  yc = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Vr(t.pendingLanes);
          r !== 0 && (Tl(t, r | 1), mt(t, ze()), (we & 6) === 0 && (Rr = ze() + 500, jn()));
        }
        break;
      case 13:
        Yn(function() {
          var o = nn(e, 1);
          if (o !== null) {
            var c = ct();
            At(o, e, 1, c);
          }
        }), ra(e, 1);
    }
  }, Il = function(e) {
    if (e.tag === 13) {
      var t = nn(e, 134217728);
      if (t !== null) {
        var r = ct();
        At(t, e, 134217728, r);
      }
      ra(e, 134217728);
    }
  }, xc = function(e) {
    if (e.tag === 13) {
      var t = Tn(e), r = nn(e, t);
      if (r !== null) {
        var o = ct();
        At(r, e, t, o);
      }
      ra(e, t);
    }
  }, wc = function() {
    return be;
  }, kc = function(e, t) {
    var r = be;
    try {
      return be = e, t();
    } finally {
      be = r;
    }
  }, vl = function(e, t, r) {
    switch (t) {
      case "input":
        if (ir(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; ) r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var o = r[t];
            if (o !== e && o.form === e.form) {
              var c = mi(o);
              if (!c) throw Error(l(90));
              Xs(o), ir(o, c);
            }
          }
        }
        break;
      case "textarea":
        B(e, r);
        break;
      case "select":
        t = r.value, t != null && Qt(e, !!r.multiple, t, !1);
    }
  }, sc = Qo, ic = Yn;
  var Z0 = { usingClientEntryPoint: !1, Events: [hs, xr, mi, nc, rc, Qo] }, Cs = { findFiberByHostInstance: zn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, B0 = { bundleType: Cs.bundleType, version: Cs.version, rendererPackageName: Cs.rendererPackageName, rendererConfig: Cs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: te.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = cc(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Cs.findFiberByHostInstance || W0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ji.isDisabled && Ji.supportsFiber) try {
      Qs = Ji.inject(B0), Xt = Ji;
    } catch {
    }
  }
  return gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z0, gt.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ia(t)) throw Error(l(200));
    return z0(e, t, null, r);
  }, gt.createRoot = function(e, t) {
    if (!ia(e)) throw Error(l(299));
    var r = !1, o = "", c = $d;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = na(e, 1, !1, null, null, r, !1, o, c), e[Gt] = t.current, us(e.nodeType === 8 ? e.parentNode : e), new sa(t);
  }, gt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = cc(t), e = e === null ? null : e.stateNode, e;
  }, gt.flushSync = function(e) {
    return Yn(e);
  }, gt.hydrate = function(e, t, r) {
    if (!Ki(t)) throw Error(l(200));
    return Gi(null, e, t, !0, r);
  }, gt.hydrateRoot = function(e, t, r) {
    if (!ia(e)) throw Error(l(405));
    var o = r != null && r.hydratedSources || null, c = !1, u = "", h = $d;
    if (r != null && (r.unstable_strictMode === !0 && (c = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (h = r.onRecoverableError)), t = Md(t, null, e, 1, r ?? null, c, !1, u, h), e[Gt] = t.current, us(e), o) for (e = 0; e < o.length; e++) r = o[e], c = r._getVersion, c = c(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, c] : t.mutableSourceEagerHydrationData.push(
      r,
      c
    );
    return new Qi(t);
  }, gt.render = function(e, t, r) {
    if (!Ki(t)) throw Error(l(200));
    return Gi(null, e, t, !1, r);
  }, gt.unmountComponentAtNode = function(e) {
    if (!Ki(e)) throw Error(l(40));
    return e._reactRootContainer ? (Yn(function() {
      Gi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Gt] = null;
      });
    }), !0) : !1;
  }, gt.unstable_batchedUpdates = Qo, gt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
    if (!Ki(r)) throw Error(l(200));
    if (e == null || e._reactInternals === void 0) throw Error(l(38));
    return Gi(e, t, r, !1, o);
  }, gt.version = "18.3.1-next-f1338f8080-20240426", gt;
}
var qd;
function qf() {
  if (qd) return aa.exports;
  qd = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (s) {
        console.error(s);
      }
  }
  return n(), aa.exports = K0(), aa.exports;
}
var Hd;
function G0() {
  if (Hd) return el;
  Hd = 1;
  var n = qf();
  return el.createRoot = n.createRoot, el.hydrateRoot = n.hydrateRoot, el;
}
var J0 = G0();
function em(n) {
  return n !== "I";
}
const Os = 2, Hf = /* @__PURE__ */ JSON.parse(`[{"allowed":["X"],"briefing":"Welcome to dispatch. Three houses stand in a row with two alarm stations between them. Our arsonist, Noise, only lights red fires here (X errors). A station rings when exactly one of its two houses is burning. Read the alarms, then send one red crew.","budget":1,"challenge":{"circuit":[],"error":"IXI"},"code":"rep3","debrief":{"detectable":"At least one station is still ringing: either the original fire is still burning, or a crew lit a new one on a safe house. Replay the original alarms: both stations rang, and house 1 is the only house they share.","logical-error":"Every alarm is quiet, yet the pattern left behind is a full logical flip (XXX). A crew sent to a safe house starts a fire of its own, so silence alone never proves safety. Compare your dispatch with the alarms in the replay.","success":"Both stations rang, and house 1 is the only house they share. Your red crew met the fire head on, and two red flames cancel (X·X = I). The logical qubit is safe."},"expected":{"minWeightCorrection":"IXI","minWeightVerdict":"success","propagated":"IXI","syndrome":[1,1]},"id":"first-alarm","index":1,"kind":"dispatch","title":"First Alarm","training":[{"caption":"A red fire (X) on house 0. Station Z0 watches houses 0 and 1, sees exactly one fire, and rings. Station Z1 watches houses 1 and 2, sees none, and stays quiet.","circuit":[],"error":"XII"}]},{"allowed":["X","Z","Y"],"briefing":"Fires never spread on their own; gates carry them. A CNOT copies a red fire (X) from its control to its target, and copies a blue fire (Z) from its target back to its control. Watch the training runs, then predict where the fires end up and send crews there.","budget":2,"challenge":{"circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XZ"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"There are no alarm stations on bare wires, so any fire you missed, or lit by mistake, acts directly on the data. Check both colours on each house: a Y fire needs both a red and a blue component to put it out.","success":"Red went forward and blue went backward at the same time, so XZ became YY: a red-and-blue fire on both houses. Your crews matched every component, and nothing remains."},"expected":{"minWeightCorrection":"YY","minWeightVerdict":"success","propagated":"YY","syndrome":[]},"id":"red-forward-blue-backward","index":2,"kind":"propagation","title":"Red Forward / Blue Backward","training":[{"caption":"Red forward: a red fire (X) on the control copies onto the target. XI becomes XX.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XI"},{"caption":"Blue backward: a blue fire (Z) on the target copies onto the control. IZ becomes ZZ.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"IZ"}]},{"allowed":["X","Z","Y"],"briefing":"A Hadamard gate swaps colours: red becomes blue and blue becomes red, on its own wire only. Combined with a CNOT, a single fire can change colour, copy itself, and change colour again. Follow the circuit one gate at a time.","budget":2,"challenge":{"circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1},{"kind":"H","q":1}],"error":"ZI"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"One of the fires ended up with a different colour, or on a different house, than you dispatched for. Replay the circuit: H swaps colours only on its own wire, and CNOT copies red forward and blue backward.","success":"ZI turned into XI at the first Hadamard, copied forward to XX through the CNOT, and the final Hadamard on house 1 turned that copy blue: XZ. You traced the whole path."},"expected":{"minWeightCorrection":"XZ","minWeightVerdict":"success","propagated":"XZ","syndrome":[]},"id":"color-switch","index":3,"kind":"propagation","title":"Color Switch","training":[{"caption":"Colour switch: a Hadamard turns the red fire (X) on house 0 into a blue one (Z). XI becomes ZI.","circuit":[{"kind":"H","q":0}],"error":"XI"},{"caption":"Blue turns red at the H, then red copies forward through the CNOT. ZI becomes XX.","circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1}],"error":"ZI"}]},{"allowed":["X","Z"],"briefing":"Welcome to the surface code district: nine houses and eight alarm stations. Red stations (Z checks, diamonds) notice red fires; blue stations (X checks, squares) notice blue fires. This time the fire is hidden. Read the alarms and send one crew.","budget":1,"challenge":{"circuit":[],"error":"IIIIXIIII"},"code":"rsc3","debrief":{"detectable":"Alarms are still ringing. A red crew on a house that was not burning starts a new fire, and a blue crew cannot put out a red fire at all. Match the crew colour to the station type, then find the house that every ringing station shares.","logical-error":"The alarms went quiet, but the pattern left behind acts as a logical operator on the encoded qubit. With one hidden fire and one crew this cannot happen in this district; Silent Failure shows when it does.","success":"Stations Z0 and Z1 both rang, and house 4 is the only house they share. One red crew, fire out, logical qubit safe."},"expected":{"minWeightCorrection":"IIIIXIIII","minWeightVerdict":"success","propagated":"IIIIXIIII","syndrome":[1,1,0,0,0,0,0,0]},"id":"blind-dispatch","index":4,"kind":"dispatch","title":"Blind Dispatch","training":[{"caption":"A red fire (X) on house 0 rings only station Z0, which watches houses 0, 1, 3 and 4. A fire on house 3 alone would ring exactly the same station, so a crew sent to house 3 is just as good a fix: the two dispatches differ by a stabilizer (the X2 station's own pattern), which the code does not care about.","circuit":[],"error":"XIIIIIIII"}]},{"allowed":["X","Z"],"briefing":"Two fires this time, and they may be different colours. Red stations only ever notice red fires and blue stations only blue ones, so read the two alarm maps separately. You have two crews of any colour, and each house takes at most one crew.","budget":2,"challenge":{"circuit":[],"error":"IXIIIIIZI"},"code":"rsc3","debrief":{"detectable":"Some stations are still ringing. Remember that a red station never sees a blue fire: solve the red alarms and the blue alarms as two separate puzzles, one crew colour each.","logical-error":"Every alarm is quiet but the leftover pattern is a logical operator: your crews and the fires together form a chain across the district instead of cancelling. The replay shows where the chain runs.","success":"Red stations Z0 and Z2 share only house 1. Blue station X1 rang alone, which points at its boundary pair, houses 6 and 7; a blue crew on either one works, because the two choices differ by a stabilizer. Two colours, two fires, both out."},"expected":{"minWeightCorrection":"IXIIIIZII","minWeightVerdict":"success","propagated":"IXIIIIIZI","syndrome":[1,0,1,0,0,1,0,0]},"id":"two-kinds-of-trouble","index":5,"kind":"dispatch","title":"Two Kinds of Trouble","training":[]},{"allowed":["X","Z"],"briefing":"Only one alarm is ringing: station Z0. Dispatch protocol is simple: send the smallest crew that silences every station. Make the call, and then we will look at what really happened.","budget":2,"challenge":{"circuit":[],"error":"IXXIIIIII"},"code":"rsc3","debrief":{"detectable":"Stations are still ringing, so the smallest silencing crew was not sent. Protocol for a lone Z0 alarm is one red crew on house 0 or house 3 (equivalent choices); replay the alarms and compare.","logical-error":"That was the optimal call. Only Z0 rang, and the best explanation of one alarm is one fire, on house 0 or house 3 (the two differ by a stabilizer, so either crew is the same call). But Noise lit two fires, on houses 1 and 2. Your crew plus those two fires form a red chain across the top of the district — X on houses 0, 1, 2 or the equivalent chain through house 3 — a logical X, which every station sees as an even count and so cannot detect. This code has distance 3: any single fire is always fixed, but two fires can fool any dispatcher, because no alarm pattern justified sending crews to houses 1 and 2. That is why real machines use bigger codes.","success":"You put out both fires, on houses 1 and 2. Honest question: how did you know? The alarms were identical to a single fire on house 0 or house 3, so this was a guess that happened to land. Protocol would still send one crew to house 0 or house 3, and this mission awards one star at most: the alarms alone cannot win it."},"expected":{"minWeightCorrection":"XIIIIIIII","minWeightVerdict":"logical-error","propagated":"IXXIIIIII","syndrome":[1,0,0,0,0,0,0,0]},"id":"silent-failure","index":6,"kind":"dispatch","maxStars":1,"title":"Silent Failure","training":[]}]`), tm = ["I", "X", "Z", "Y"], cl = 30;
function nm(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(n)}`);
}
function pl(n, s) {
  if (!Number.isInteger(n) || n < 0 || n >= s) throw new RangeError(`qubit index ${String(n)} out of range for n=${String(s)}`);
}
function Uf(n) {
  return n === "I" || n === "X" || n === "Y" || n === "Z";
}
function $s(n) {
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
function _a(n, s) {
  return tm[n & 1 | (s & 1) << 1] ?? "I";
}
function ml(n) {
  return nm(n), { n, x: new Uint8Array(n), z: new Uint8Array(n) };
}
function Xe(n) {
  const s = n.length, l = new Uint8Array(s), a = new Uint8Array(s);
  for (let d = 0; d < s; d++) {
    const f = n[d] ?? "";
    if (!Uf(f)) throw new Error(`invalid Pauli letter '${f}' at position ${String(d)} in "${n}"`);
    const p = $s(f);
    l[d] = p.x, a[d] = p.z;
  }
  return { n: s, x: l, z: a };
}
function Ee(n) {
  let s = "";
  for (let l = 0; l < n.n; l++) s += _a(n.x[l] ?? 0, n.z[l] ?? 0);
  return s;
}
function gl(n) {
  return { n: n.n, x: new Uint8Array(n.x), z: new Uint8Array(n.z) };
}
function rm(n) {
  for (let s = 0; s < n.n; s++) if ((n.x[s] ?? 0) !== 0 || (n.z[s] ?? 0) !== 0) return !1;
  return !0;
}
function Oa(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot multiply Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  const l = new Uint8Array(n.n), a = new Uint8Array(n.n);
  for (let d = 0; d < n.n; d++)
    l[d] = (n.x[d] ?? 0) ^ (s.x[d] ?? 0), a[d] = (n.z[d] ?? 0) ^ (s.z[d] ?? 0);
  return { n: n.n, x: l, z: a };
}
function xt(n) {
  let s = 0;
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s++;
  return s;
}
function Vt(n) {
  const s = [];
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s.push(l);
  return s;
}
function Yf(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot compare Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  let l = 0;
  for (let a = 0; a < n.n; a++)
    l ^= (n.x[a] ?? 0) & (s.z[a] ?? 0) ^ (n.z[a] ?? 0) & (s.x[a] ?? 0);
  return l & 1;
}
function Ud(n, s) {
  return Yf(n, s) === 1;
}
function Yt(n, s) {
  return pl(s, n.n), _a(n.x[s] ?? 0, n.z[s] ?? 0);
}
function sm(n, s, l) {
  pl(s, n.n);
  const a = gl(n), d = $s(l);
  return a.x[s] = d.x, a.z[s] = d.z, a;
}
function im(n, s, l) {
  const a = ml(n), d = /* @__PURE__ */ new Set(), f = $s(s);
  for (const p of l) {
    if (pl(p, n), d.has(p)) throw new RangeError(`duplicate qubit ${String(p)} in support`);
    d.add(p), a.x[p] = f.x, a.z[p] = f.z;
  }
  return a;
}
function Yd(n) {
  if (n.n > cl) throw new RangeError(`masks support at most ${String(cl)} qubits`);
  let s = 0, l = 0;
  for (let a = 0; a < n.n; a++)
    (n.x[a] ?? 0) !== 0 && (s |= 1 << a), (n.z[a] ?? 0) !== 0 && (l |= 1 << a);
  return { x: s, z: l };
}
function lm(n, s, l) {
  if (n > cl) throw new RangeError(`masks support at most ${String(cl)} qubits`);
  const a = ml(n);
  for (let d = 0; d < n; d++)
    a.x[d] = s >>> d & 1, a.z[d] = l >>> d & 1;
  return a;
}
function Vf(n) {
  const s = new Uint8Array(2 * n.n);
  return s.set(n.x, 0), s.set(n.z, n.n), s;
}
function om(n) {
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
function Qf(n, s) {
  const l = om(n);
  for (const a of l) pl(a, s);
  if (l.length === 2 && l[0] === l[1])
    throw new RangeError(`${n.kind} needs two distinct qubits, got ${String(l[0])} twice`);
}
function ja(n, s) {
  for (const l of n) Qf(l, s);
}
function am(n, s) {
  Qf(s, n.n);
  const l = gl(n), { x: a, z: d } = l;
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
      const { a: f, b: p } = s, g = a[f] ?? 0, x = a[p] ?? 0;
      d[f] = (d[f] ?? 0) ^ x, d[p] = (d[p] ?? 0) ^ g;
      break;
    }
    case "SWAP": {
      const { a: f, b: p } = s, g = a[f] ?? 0, x = d[f] ?? 0;
      a[f] = a[p] ?? 0, d[f] = d[p] ?? 0, a[p] = g, d[p] = x;
      break;
    }
  }
  return l;
}
function Ma(n, s) {
  ja(s, n.n);
  const l = [gl(n)];
  let a = n;
  for (const d of s)
    a = am(a, d), l.push(a);
  return { frames: l };
}
function cm(n, s) {
  const l = Ma(n, s);
  return l.frames[l.frames.length - 1] ?? gl(n);
}
function um(n, s) {
  for (const l of n)
    if (l.length !== s) throw new RangeError(`GF(2) row width mismatch: ${String(l.length)} vs ${String(s)}`);
}
function Kf(n, s) {
  for (let l = 0; l < n.length; l++) n[l] = ((n[l] ?? 0) ^ (s[l] ?? 0)) & 1;
}
function Gf(n, s) {
  const l = s ?? n[0]?.length ?? 0;
  um(n, l);
  const a = n.map((g) => Uint8Array.from(g, (x) => x & 1)), d = [], f = [];
  let p = 0;
  for (let g = 0; g < l && p < a.length; g++) {
    let x = -1;
    for (let S = p; S < a.length; S++)
      if ((a[S]?.[g] ?? 0) === 1) {
        x = S;
        break;
      }
    if (x === -1) continue;
    const k = a[x], b = a[p];
    if (!(k === void 0 || b === void 0)) {
      a[x] = b, a[p] = k;
      for (let S = 0; S < a.length; S++) {
        const C = a[S];
        S !== p && C !== void 0 && (C[g] ?? 0) === 1 && Kf(C, k);
      }
      d.push(g), f.push(k), p++;
    }
  }
  return { rows: f, pivots: d, width: l };
}
function dm(n, s) {
  if (s.length !== n.width) throw new RangeError(`vector width ${String(s.length)} does not match basis width ${String(n.width)}`);
  const l = Uint8Array.from(s, (a) => a & 1);
  for (let a = 0; a < n.rows.length; a++) {
    const d = n.pivots[a], f = n.rows[a];
    d === void 0 || f === void 0 || (l[d] ?? 0) === 1 && Kf(l, f);
  }
  return l;
}
function fm(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function hm(n) {
  return !Array.isArray(n) && "pivots" in n;
}
function pm(n, s) {
  const l = hm(n) ? n : Gf(n, s.length);
  return fm(dm(l, s));
}
const mm = { name: "Distance-3 rotated surface code", n: 9, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1, 3, 4] }, { id: "Z1", type: "Z", qubits: [4, 5, 7, 8] }, { id: "Z2", type: "Z", qubits: [1, 2] }, { id: "Z3", type: "Z", qubits: [6, 7] }, { id: "X0", type: "X", qubits: [1, 2, 4, 5] }, { id: "X1", type: "X", qubits: [3, 4, 6, 7] }, { id: "X2", type: "X", qubits: [0, 3] }, { id: "X3", type: "X", qubits: [5, 8] }], logicalX: ["XXXIIIIII"], logicalZ: ["ZIIZIIZII"], layout: { kind: "grid", rows: 3, cols: 3, checkPositions: { Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 }, X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 } } }, noiseNote: "X, Z and Y errors; perfect syndrome" }, gm = { name: "Three-qubit repetition code", n: 3, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1] }, { id: "Z1", type: "Z", qubits: [1, 2] }], logicalX: ["XXX"], logicalZ: ["ZII"], layout: { kind: "line", checkPositions: { Z0: { row: 0, col: 0.5 }, Z1: { row: 0, col: 1.5 } } }, noiseNote: "X noise only (a single Z is undetectable: distance 1 against Z)" }, ym = { name: "Two bare qubits (no code)", n: 2, k: 2, distance: 1, checks: [], logicalX: ["XI", "IX"], logicalZ: ["ZI", "IZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, xm = { name: "Three bare qubits (no code)", n: 3, k: 3, distance: 1, checks: [], logicalX: ["XII", "IXI", "IIX"], logicalZ: ["ZII", "IZI", "IIZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, wm = {
  rsc3: mm,
  rep3: gm,
  trivial2: ym,
  trivial3: xm
}, Jf = ["trivial2", "trivial3", "rep3", "rsc3"];
function km(n) {
  return Jf.includes(n);
}
function Pa(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function al(n, s) {
  if (typeof n != "number" || !Number.isFinite(n)) throw new Error(`codes.json: ${s} must be a number`);
  return n;
}
function As(n, s) {
  if (typeof n != "string") throw new Error(`codes.json: ${s} must be a string`);
  return n;
}
function Vd(n, s) {
  if (!Array.isArray(n)) throw new Error(`codes.json: ${s} must be an array`);
  return n.map((l, a) => As(l, `${s}[${String(a)}]`));
}
function vm(n, s) {
  if (!Pa(n)) throw new Error(`codes.json: ${s} must be an object`);
  const l = As(n.type, `${s}.type`);
  if (l !== "X" && l !== "Z") throw new Error(`codes.json: ${s}.type must be X or Z`);
  if (!Array.isArray(n.qubits)) throw new Error(`codes.json: ${s}.qubits must be an array`);
  const a = n.qubits.map((d, f) => al(d, `${s}.qubits[${String(f)}]`));
  return { id: As(n.id, `${s}.id`), type: l, qubits: a };
}
function jm(n, s) {
  if (!Pa(s)) throw new Error(`codes.json: ${n} must be an object`);
  if (!Array.isArray(s.checks)) throw new Error(`codes.json: ${n}.checks must be an array`);
  return {
    name: As(s.name, `${n}.name`),
    n: al(s.n, `${n}.n`),
    k: al(s.k, `${n}.k`),
    distance: al(s.distance, `${n}.distance`),
    checks: s.checks.map((l, a) => vm(l, `${n}.checks[${String(a)}]`)),
    logicalX: Vd(s.logicalX, `${n}.logicalX`),
    logicalZ: Vd(s.logicalZ, `${n}.logicalZ`),
    layout: s.layout,
    noiseNote: As(s.noiseNote, `${n}.noiseNote`)
  };
}
function Sm(n, s) {
  const l = s.n, a = s.checks.map((x) => {
    const k = [...x.qubits].sort((b, S) => b - S);
    return { id: x.id, type: x.type, qubits: k, pauli: im(l, x.type, k) };
  });
  if (new Set(a.map((x) => x.id)).size !== a.length) throw new Error(`codes.json: ${n} has duplicate check ids`);
  const f = (x, k) => {
    if (k.length !== l) throw new Error(`codes.json: ${n} logical ${x} "${k}" has wrong length`);
    return { label: x, pauli: Xe(k) };
  }, p = s.logicalX.map((x) => f("X", x)), g = s.logicalZ.map((x) => f("Z", x));
  if (p.length !== s.k || g.length !== s.k) throw new Error(`codes.json: ${n} needs k logical X and k logical Z`);
  return { id: n, name: s.name, n: l, k: s.k, distance: s.distance, checks: a, logicalX: p, logicalZ: g, noiseNote: s.noiseNote };
}
const eh = /* @__PURE__ */ new Map();
{
  const n = wm;
  if (!Pa(n)) throw new Error("codes.json: root must be an object");
  for (const s of Jf) {
    if (!(s in n)) throw new Error(`codes.json: missing code '${s}'`);
    eh.set(s, jm(s, n[s]));
  }
}
const Qd = /* @__PURE__ */ new Map(), Kd = /* @__PURE__ */ new Map();
function Oe(n) {
  let s = Qd.get(n);
  if (s === void 0) {
    const l = eh.get(n);
    if (l === void 0) throw new Error(`unknown code '${n}'`);
    s = Sm(n, l), Qd.set(n, s);
  }
  return s;
}
function bm(n) {
  return n.checks.map((s) => Vf(s.pauli));
}
function Nm(n) {
  let s = Kd.get(n.id);
  return s === void 0 && (s = Gf(bm(n), 2 * n.n), Kd.set(n.id, s)), s;
}
function Fr(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id} (n=${String(n.n)})`);
  const l = new Uint8Array(n.checks.length);
  return n.checks.forEach((a, d) => {
    l[d] = Yf(a.pauli, s);
  }), l;
}
function Em(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function Gd(n) {
  let s = "";
  for (let l = 0; l < n.length; l++) s += (n[l] ?? 0) === 0 ? "0" : "1";
  return s;
}
function on(n) {
  return Array.from(n, (s) => s === 0 ? 0 : 1);
}
function Cm(n) {
  return Uint8Array.from(n, (s) => s === 0 ? 0 : 1);
}
function th(n, s) {
  const l = [];
  return n.checks.forEach((a, d) => {
    (s[d] ?? 0) !== 0 && l.push(a.id);
  }), l;
}
function Tm(n, s) {
  return Oa(n, s);
}
function nh(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id}`);
  return n.checks.length === 0 ? rm(s) : pm(Nm(n), Vf(s));
}
function Im(n, s) {
  return {
    x: n.logicalZ.map((l) => Ud(s, l.pauli)),
    z: n.logicalX.map((l) => Ud(s, l.pauli))
  };
}
function Lm(n, s) {
  const l = Fr(n, s), a = Im(n, s);
  let d;
  return Em(l) ? nh(n, s) ? d = "success" : d = "logical-error" : d = "detectable", { kind: d, residual: s, syndrome: l, logicalFlip: a, weight: xt(s) };
}
function da(n, s, l) {
  return Lm(n, Tm(l, s));
}
const Jd = 10, ef = /* @__PURE__ */ new Map();
function Rm(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) ^ a & 1;
  return l;
}
function _m(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) + (a & 1);
  return l;
}
function Om(n) {
  const s = n.n;
  if (s > Jd) throw new RangeError(`lookup decoder supports at most ${String(Jd)} qubits`);
  const l = n.checks.map((x) => Yd(x.pauli).x), a = n.checks.map((x) => Yd(x.pauli).z), d = Rm(s), f = _m(s), p = /* @__PURE__ */ new Map(), g = 4 ** s;
  for (let x = 0; x < g; x++) {
    let k = 0, b = 0, S = x;
    for (let L = 0; L < s; L++) {
      const W = S & 3;
      S >>= 2, (W & 1) !== 0 && (k |= 1 << L), (W & 2) !== 0 && (b |= 1 << L);
    }
    const C = f[k | b] ?? 0, I = (f[k] ?? 0) + (f[b] ?? 0);
    let _ = "";
    for (let L = 0; L < l.length; L++)
      _ += (d[k & (a[L] ?? 0) ^ b & (l[L] ?? 0)] ?? 0) === 0 ? "0" : "1";
    const R = p.get(_);
    R === void 0 || C < R.weight || C === R.weight && I < R.symplecticWeight ? p.set(_, { weight: C, symplecticWeight: I, candidates: [x] }) : C === R.weight && I === R.symplecticWeight && R.candidates.push(x);
  }
  return { n: s, entries: p };
}
function rh(n) {
  let s = ef.get(n.id);
  return s === void 0 && (s = Om(n), ef.set(n.id, s)), s;
}
function Mm(n, s) {
  let l = 0, a = 0, d = s;
  for (let f = 0; f < n; f++) {
    const p = d & 3;
    d >>= 2, (p & 1) !== 0 && (l |= 1 << f), (p & 2) !== 0 && (a |= 1 << f);
  }
  return lm(n, l, a);
}
function Pm(n, s) {
  if (s.length !== n.checks.length)
    throw new RangeError(`syndrome has ${String(s.length)} bits but code ${n.id} has ${String(n.checks.length)} checks`);
  const l = rh(n).entries.get(Gd(s));
  if (l === void 0) throw new Error(`syndrome ${Gd(s)} is not produced by any Pauli on code ${n.id}`);
  return l;
}
function $m(n) {
  const s = rh(n);
  return {
    name: `min-weight lookup (${n.id})`,
    decode(l) {
      const d = Pm(n, l).candidates[0];
      return d === void 0 ? ml(s.n) : Mm(s.n, d);
    }
  };
}
function $a(n, s, l) {
  return nh(n, Oa(s, l));
}
const Am = ["success", "logical-error", "detectable"];
function Pr(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function ot(n, s) {
  if (typeof n != "string") throw new Error(`missions.json: ${s} must be a string`);
  return n;
}
function _n(n, s) {
  if (typeof n != "number" || !Number.isInteger(n)) throw new Error(`missions.json: ${s} must be an integer`);
  return n;
}
function Dm(n, s = "gate") {
  if (!Pr(n)) throw new Error(`${s} must be an object`);
  const l = ot(n.kind, `${s}.kind`);
  switch (l) {
    case "H":
    case "S":
      return { kind: l, q: _n(n.q, `${s}.q`) };
    case "CNOT":
      return { kind: l, c: _n(n.c, `${s}.c`), t: _n(n.t, `${s}.t`) };
    case "CZ":
    case "SWAP":
      return { kind: l, a: _n(n.a, `${s}.a`), b: _n(n.b, `${s}.b`) };
    default:
      throw new Error(`${s}.kind '${l}' is not a supported gate`);
  }
}
function tf(n, s = "circuit") {
  if (!Array.isArray(n)) throw new Error(`${s} must be an array`);
  return n.map((l, a) => Dm(l, `${s}[${String(a)}]`));
}
function Fm(n, s) {
  if (!Pr(n)) throw new Error(`missions.json: ${s} must be an object`);
  if (!Array.isArray(n.syndrome)) throw new Error(`missions.json: ${s}.syndrome must be an array`);
  const l = n.syndrome.map((d, f) => {
    const p = _n(d, `${s}.syndrome[${String(f)}]`);
    if (p !== 0 && p !== 1) throw new Error(`missions.json: ${s}.syndrome bits must be 0/1`);
    return p;
  }), a = ot(n.minWeightVerdict, `${s}.minWeightVerdict`);
  if (!Am.includes(a)) throw new Error(`missions.json: ${s}.minWeightVerdict invalid`);
  return {
    syndrome: l,
    propagated: ot(n.propagated, `${s}.propagated`),
    minWeightCorrection: ot(n.minWeightCorrection, `${s}.minWeightCorrection`),
    minWeightVerdict: a
  };
}
function zm(n, s = "mission") {
  if (!Pr(n)) throw new Error(`missions.json: ${s} must be an object`);
  const l = ot(n.id, `${s}.id`), a = ot(n.code, `${s}.code`);
  if (!km(a)) throw new Error(`missions.json: ${l}.code '${a}' is unknown`);
  const d = Oe(a), f = ot(n.kind, `${l}.kind`);
  if (f !== "dispatch" && f !== "propagation") throw new Error(`missions.json: ${l}.kind must be dispatch|propagation`);
  if (!Array.isArray(n.training)) throw new Error(`missions.json: ${l}.training must be an array`);
  const p = n.training.map((R, L) => {
    const W = `${l}.training[${String(L)}]`;
    if (!Pr(R)) throw new Error(`missions.json: ${W} must be an object`);
    const $ = ot(R.error, `${W}.error`);
    if (Xe($).n !== d.n) throw new Error(`missions.json: ${W}.error length must be ${String(d.n)}`);
    const D = tf(R.circuit, `${W}.circuit`);
    return ja(D, d.n), { error: $, circuit: D, caption: ot(R.caption, `${W}.caption`) };
  }), g = n.challenge;
  if (!Pr(g)) throw new Error(`missions.json: ${l}.challenge must be an object`);
  const x = ot(g.error, `${l}.challenge.error`);
  if (Xe(x).n !== d.n) throw new Error(`missions.json: ${l}.challenge.error length must be ${String(d.n)}`);
  const k = tf(g.circuit, `${l}.challenge.circuit`);
  if (ja(k, d.n), f === "dispatch" && k.length > 0) throw new Error(`missions.json: ${l} is a dispatch mission but has a circuit`);
  if (!Array.isArray(n.allowed) || n.allowed.length === 0) throw new Error(`missions.json: ${l}.allowed must be a non-empty array`);
  const b = n.allowed.map((R, L) => {
    const W = ot(R, `${l}.allowed[${String(L)}]`);
    if (!Uf(W) || W === "I") throw new Error(`missions.json: ${l}.allowed[${String(L)}] must be X, Y or Z`);
    return W;
  }), S = _n(n.budget, `${l}.budget`);
  if (S < 1 || S > d.n) throw new Error(`missions.json: ${l}.budget out of range`);
  const C = n.debrief;
  if (!Pr(C)) throw new Error(`missions.json: ${l}.debrief must be an object`);
  const I = {
    success: ot(C.success, `${l}.debrief.success`),
    "logical-error": ot(C["logical-error"], `${l}.debrief.logical-error`),
    detectable: ot(C.detectable, `${l}.debrief.detectable`)
  }, _ = n.expected === void 0 || n.expected === null ? null : Fm(n.expected, `${l}.expected`);
  return {
    id: l,
    index: _n(n.index, `${l}.index`),
    title: ot(n.title, `${l}.title`),
    code: a,
    kind: f,
    training: p,
    challenge: { error: x, circuit: k },
    allowed: b,
    budget: S,
    briefing: ot(n.briefing, `${l}.briefing`),
    debrief: I,
    expected: _
  };
}
function Wm(n) {
  if (!Array.isArray(n)) throw new Error("missions.json: root must be an array");
  const s = [], l = /* @__PURE__ */ new Set();
  return n.forEach((a, d) => {
    const f = zm(a, `missions[${String(d)}]`);
    if (f.expected === null) throw new Error(`missions.json: ${f.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (l.has(f.id)) throw new Error(`missions.json: duplicate id ${f.id}`);
    if (l.add(f.id), f.index !== d + 1) throw new Error(`missions.json: ${f.id} index ${String(f.index)} should be ${String(d + 1)}`);
    s.push({ ...f, expected: f.expected });
  }), s;
}
let nf;
function sh() {
  return nf ??= Wm(Hf), nf;
}
function Xm(n) {
  const s = sh().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
const fa = 3;
function Zm(n, s = Hf) {
  if (!Array.isArray(s)) return fa;
  for (const l of s) {
    if (typeof l != "object" || l === null || Array.isArray(l)) continue;
    const a = l;
    if (a.id !== n) continue;
    const d = a.maxStars;
    return d === 1 || d === 2 || d === 3 ? d : fa;
  }
  return fa;
}
function Bm(n) {
  const s = Oe(n.code), l = n.allowed.filter(em), a = n.kind === "dispatch" ? on(Fr(s, Xe(n.challenge.error))) : [];
  return {
    id: n.id,
    index: n.index,
    title: n.title,
    code: n.code,
    kind: n.kind,
    allowed: l,
    budget: n.budget,
    briefing: n.briefing,
    maxStars: Zm(n.id),
    circuit: n.challenge.circuit,
    syndrome: a,
    visibleStart: n.kind === "propagation" ? n.challenge.error : null,
    training: n.training.map((d) => ({ fire: d.error, circuit: d.circuit, caption: d.caption }))
  };
}
let rf;
function $n() {
  return rf ??= sh().map(Bm), rf;
}
function an(n) {
  const s = $n().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
function Aa() {
  return $n().reduce((n, s) => n + s.maxStars, 0);
}
function ih(n) {
  const s = $n(), l = s.findIndex((d) => d.id === n), a = s[l + 1];
  return a === void 0 ? null : a.id;
}
function qm(n) {
  return Xm(n);
}
function Hm(n) {
  const s = $a(n.code, n.crews, n.decoderCrews), l = xt(n.crews) <= xt(n.decoderCrews), a = n.maxStars ?? 3;
  return s && l && n.outcome === "success" ? "optimal" : s && n.outcome === "logical-error" ? "unlucky" : n.outcome === "success" && a <= 1 && !s ? "lucky" : n.outcome === "success" ? "valid" : "off";
}
function Um({ quality: n, outcome: s, wrongBlocks: l, crewsUsed: a, maxStars: d = 3 }) {
  let f = 0;
  return s === "success" && n === "optimal" ? f = 3 : s === "success" && n === "valid" ? f = 2 : (n === "unlucky" || n === "lucky" || s === "detectable" && l <= 1 && a > 0) && (f = 1), f > d ? d : f;
}
function Ym(n) {
  const s = Hm(n), l = xt(Oa(n.crews, n.decoderCrews)), a = xt(n.crews), d = n.maxStars ?? 3, f = Um({ quality: s, outcome: n.outcome, wrongBlocks: l, crewsUsed: a, maxStars: d });
  return {
    outcome: n.outcome,
    quality: s,
    stars: f,
    maxStars: d,
    crewsUsed: a,
    minCrews: xt(n.decoderCrews),
    completed: n.outcome === "success" || s === "unlucky"
  };
}
const Vm = {
  success: "Logical qubit safe",
  "logical-error": "Silent failure — logical qubit flipped",
  detectable: "Fires still burning"
}, Qm = "Prediction missed — fires left on the wires";
function Km(n, s) {
  return !s && n === "logical-error" ? Qm : Vm[n];
}
function sf(n) {
  switch (n.kind) {
    case "H":
      return `H on house ${String(n.q)}`;
    case "S":
      return `S on house ${String(n.q)}`;
    case "CNOT":
      return `CNOT from house ${String(n.c)} to house ${String(n.t)}`;
    case "CZ":
      return `CZ between houses ${String(n.a)} and ${String(n.b)}`;
    case "SWAP":
      return `SWAP of houses ${String(n.a)} and ${String(n.b)}`;
  }
}
const lh = { X: "red", Z: "blue", Y: "red-and-blue" };
function ul(n) {
  const s = Vt(n);
  if (s.length === 0) return "no fires";
  const l = s.map((a) => {
    const d = Yt(n, a);
    return `a ${lh[d] ?? ""} fire (${d}) on house ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function Gm(n) {
  const s = Vt(n);
  if (s.length === 0) return "no crews";
  const l = s.map((a) => {
    const d = Yt(n, a);
    return `a ${lh[d] ?? ""} crew (${d}) to house ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function Jm(n, s) {
  if (n.checks.length === 0) return "This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.";
  const l = th(n, s);
  return l.length === 0 ? "Every station reads an even count and stays quiet." : `Alarms: ${l.join(", ")} ring${l.length === 1 ? "s" : ""}. Each ringing station sees an odd number of fires of its colour.`;
}
function eg(n, s) {
  switch (n.kind) {
    case "success":
      return xt(n.residual) === 0 ? "Residual is the identity: every fire is out. Logical qubit safe." : `Residual ${Ee(n.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case "logical-error": {
      if (s.checks.length === 0)
        return `Residual ${Ee(n.residual)} leaves ${ul(n.residual)}. Bare wires have no stations, so a missed prediction is never caught: every leftover component acts directly on the data.`;
      const l = [];
      return n.logicalFlip.x.forEach((a, d) => {
        a && l.push(s.k === 1 ? "logical X" : `logical X${String(d)}`);
      }), n.logicalFlip.z.forEach((a, d) => {
        a && l.push(s.k === 1 ? "logical Z" : `logical Z${String(d)}`);
      }), `Residual ${Ee(n.residual)} commutes with every station yet is not a stabilizer: it acts as ${l.join(" and ")}. Silent failure.`;
    }
    case "detectable":
      return `Residual ${Ee(n.residual)} still trips ${th(s, n.syndrome).join(", ")}. Fires are still burning.`;
  }
}
function tg(n) {
  const { code: s, start: l, circuit: a, crews: d, verdict: f } = n, p = Ma(l, a), g = [], x = p.frames[p.frames.length - 1] ?? l, k = Ee(l);
  g.push({
    id: "placed",
    caption: `Noise lit ${ul(l)}.`,
    fires: k,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: !1
  }), a.forEach((_, R) => {
    const L = p.frames[R] ?? l, W = p.frames[R + 1] ?? L, $ = Ee(L) !== Ee(W);
    g.push({
      id: `gate-${String(R)}`,
      caption: $ ? `${sf(_)}: ${Ee(L)} becomes ${Ee(W)}.` : `${sf(_)}: the fire pattern ${Ee(L)} is unchanged.`,
      fires: Ee(W),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: R,
      showVerdict: !1
    });
  });
  const b = Fr(s, x), S = on(b), C = Ee(x);
  g.push({
    id: "alarms",
    caption: Jm(s, b),
    fires: C,
    crews: null,
    residual: null,
    syndrome: S,
    gateCursor: a.length,
    showVerdict: !1
  }), g.push({
    id: "dispatch",
    caption: `Your dispatch: ${Gm(d)}.`,
    fires: C,
    crews: Ee(d),
    residual: null,
    syndrome: S,
    gateCursor: a.length,
    showVerdict: !1
  });
  const I = Ee(f.residual);
  return g.push({
    id: "residual",
    caption: xt(f.residual) === 0 ? "Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains." : `Crews meet fires (XOR): what remains is ${I}, that is ${ul(f.residual)}.`,
    fires: C,
    crews: Ee(d),
    residual: I,
    syndrome: on(f.syndrome),
    gateCursor: a.length,
    showVerdict: !1
  }), g.push({
    id: "verdict",
    caption: eg(f, s),
    fires: C,
    crews: Ee(d),
    residual: I,
    syndrome: on(f.syndrome),
    gateCursor: a.length,
    showVerdict: !0
  }), g;
}
function lf(n) {
  return n.length === 0 ? "no houses" : n.length === 1 ? `house ${String(n[0])}` : `houses ${n.slice(0, -1).join(", ")} and ${String(n[n.length - 1])}`;
}
function ng(n) {
  const { code: s, finalFire: l, crews: a, decoderCrews: d, decoderVerdict: f, equivalent: p, verdict: g } = n, x = Ee(d), k = Ee(a), b = Ee(l), S = b !== x && b !== k;
  let C;
  if (s.checks.length === 0)
    C = p ? `The fire ended as ${b}; your crews matched it exactly, so the prediction was right.` : `The fire ended as ${b}. Your crews ${k} leave ${ul(g.residual)} (${String(xt(g.residual))} house${xt(g.residual) === 1 ? "" : "s"}); on bare wires every leftover component acts on the data.`;
  else if (p && g.kind === "success")
    C = k === x ? "Your dispatch is exactly the minimum-weight dispatch for these alarms." : `Your dispatch ${k} and the minimum-weight dispatch ${x} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`, k === b ? C += " Your crews sat exactly on the true fires." : b !== x && (C += ` The true fires were ${b}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`);
  else if (p && g.kind === "logical-error") {
    const I = lf(Vt(l)), _ = lf(Vt(g.residual));
    C = `${k === x ? `The minimum-weight dispatch for these alarms is ${x}, and that is what you sent.` : `The minimum-weight dispatch for these alarms is ${x}; your ${k} differs from it by a stabilizer, so it is the same call.`} The true fire was ${b}, on ${I}: ${String(xt(l))} fires that look, to every station, exactly like one. Your crews plus those fires leave ${Ee(g.residual)} on ${_}, a logical operator that every station sees as an even count. Crews at ${b} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.`;
  } else g.kind === "success" ? (C = `You succeeded with ${String(xt(a))} crew(s); the minimum-weight dispatch ${x} needs ${String(xt(d))} and its verdict is ${of[f.kind]}.`, f.kind === "logical-error" && (C += ` The alarms alone could not justify your ${k}: the same stations ring for ${x}, so protocol would still have sent that.`)) : C = `The minimum-weight dispatch for these alarms is ${x} (${of[f.kind]}). Compare it with your ${k} step by step in the replay.`;
  return {
    decoderCrews: x,
    decoderVerdict: f.kind,
    equivalentToDecoder: p,
    explanation: C,
    trueFireCrews: S ? b : null
  };
}
const of = {
  success: "success",
  "logical-error": "silent failure",
  detectable: "fires still burning"
}, Sa = "q11.save.v1", dl = { sound: !1, reducedMotion: !1, language: "en", freeRoam: !1 };
function tl() {
  return { version: Os, progress: {}, settings: dl, tutorialDone: !1 };
}
const oh = "Saved progress was unreadable and has been reset.";
function Ds(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function af(n) {
  if (!Ds(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (!Ds(a)) return null;
    const d = a.stars, f = a.attempts, p = a.completed;
    if (d !== 0 && d !== 1 && d !== 2 && d !== 3 || typeof f != "number" || !Number.isInteger(f) || f < 0 || typeof p != "boolean") return null;
    s[l] = { stars: d, attempts: f, completed: p };
  }
  return s;
}
function rg(n) {
  return n === "en" || n === "ja";
}
function ah(n) {
  if (!Ds(n)) return null;
  const s = n.sound, l = n.reducedMotion;
  return typeof s != "boolean" || typeof l != "boolean" ? null : { sound: s, reducedMotion: l, language: dl.language, freeRoam: dl.freeRoam };
}
function sg(n) {
  const s = ah(n);
  if (s === null || !Ds(n)) return null;
  const l = n.language, a = n.freeRoam;
  return !rg(l) || typeof a != "boolean" ? null : { sound: s.sound, reducedMotion: s.reducedMotion, language: l, freeRoam: a };
}
function ig(n) {
  if (n === null) return null;
  let s;
  try {
    s = JSON.parse(n);
  } catch {
    return null;
  }
  if (!Ds(s)) return null;
  const l = s.version;
  if (l === 1) {
    const a = af(s.progress), d = ah(s.settings);
    return a === null || d === null ? null : { version: Os, progress: a, settings: d, tutorialDone: Object.keys(a).length > 0 };
  }
  if (l === Os) {
    const a = af(s.progress), d = sg(s.settings), f = s.tutorialDone;
    return a === null || d === null || typeof f != "boolean" ? null : { version: Os, progress: a, settings: d, tutorialDone: f };
  }
  return null;
}
function lg(n) {
  if (n === null) return { save: tl(), notice: null };
  let s;
  try {
    s = n.getItem(Sa);
  } catch {
    return { save: tl(), notice: null };
  }
  if (s === null) return { save: tl(), notice: null };
  const l = ig(s);
  if (l !== null) return { save: l, notice: null };
  const a = tl();
  try {
    n.setItem(Sa, JSON.stringify(a));
  } catch {
  }
  return { save: a, notice: oh };
}
function og(n, s) {
  if (n === null) return !1;
  try {
    return n.setItem(Sa, JSON.stringify(s)), !0;
  } catch {
    return !1;
  }
}
function ag() {
  try {
    const n = globalThis.localStorage, s = "__q11_probe__";
    return n.setItem(s, "1"), n.removeItem(s), n;
  } catch {
    return null;
  }
}
const cg = "Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.", ug = [{ analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.15, Z1: 0.09, Z2: 0.06, Z3: 0.02 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.5, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 93, 1: 7 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.93], predictedSyndromeShare: 0.69, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000011000010011": 1, "00000100100000010": 1, "00000100100000011": 3, "00000101100000011": 1, "00000111100000011": 1, "00010011000110001": 1, "00011011000000011": 3, "00011011001000011": 1, "00011011001100011": 1, "00011011100000011": 1, "00011100001100011": 1, "00011111100000011": 7, "01101000100000001": 1, "01101000100000010": 1, "01101000100000011": 1, "01101001100000011": 1, "01101100000000011": 2, "01110011001000010": 1, "01110011100000011": 4, "01110011100010111": 1, "01110111000000011": 5, "01110111101000011": 1, "01111111110100011": 1, "10000001011000111": 1, "10000111100110011": 1, "10001001000010111": 1, "10001011000000011": 5, "10001111000000010": 1, "10001111100000011": 2, "10001111100100001": 1, "10010000000000011": 6, "10010100100000011": 5, "10010100100010001": 1, "10010101110100100": 1, "10010111100000010": 1, "10011011000000011": 1, "10110100100101011": 1, "11010000000100011": 1, "11100001100000111": 1, "11100111000000011": 6, "11100111001100011": 1, "11101000110010001": 1, "11110011100010011": 1, "11110111010010001": 1, "11111000100000011": 6, "11111011100000010": 1, "11111100000000011": 4, "11111100000010011": 1, "11111100001001010": 1, "11111111001110010": 1 }, finishedAt: "2026-10-10T01:40:30Z", jobId: "01a12378-c4f2-71ea-b5df-920acd440520", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:40:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.09, Z1: 0.07, Z2: 0.07, Z3: 0.04 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 22.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 97, 1: 3 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking) — JS/Qiskit page, on-load self-test through the JS→Python bridge", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.76, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000000001010010": 1, "00000001000010011": 1, "00000100100000011": 1, "00010011000000000": 1, "00011010000000111": 1, "00011011000000011": 6, "00011101100010111": 1, "00011110100010110": 1, "00011111100000001": 1, "00011111100000011": 4, "00100011110111011": 1, "00101100010101001": 1, "01101000001100011": 1, "01101000100000011": 8, "01101011000100011": 1, "01101100000000011": 6, "01101100000010011": 1, "01101100000100011": 1, "01110011100000011": 3, "01110100001000010": 1, "01110110001000111": 1, "01110111000000011": 7, "01110111010110011": 1, "01111010110000101": 1, "10000100110010011": 1, "10001011000000011": 6, "10001111000000011": 1, "10001111100000011": 7, "10001111100110011": 1, "10010000000000011": 5, "10010011000010011": 1, "10010100100000011": 1, "10010100100010011": 1, "10010110100000111": 1, "10111000100101001": 1, "11010000000000011": 1, "11100011100000011": 4, "11100111000000011": 1, "11101100000000011": 1, "11111000100000011": 5, "11111100000000010": 1, "11111100000000011": 4 }, finishedAt: "2026-10-10T02:14:30Z", jobId: "01a12396-c213-7984-9259-bb3fb25b8f46", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T02:14:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.06, Z1: 0.07, Z2: 0.03, Z3: 0.03 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 0, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 3, 1: 97 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.73, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "XIIIIIIII", counts: { "00000011100000001": 3, "00000100100100001": 1, "00000111000000001": 6, "00000111000010001": 1, "00001000110010001": 1, "00010111000000001": 1, "00010111000000011": 1, "00010111010000001": 1, "00011000100000001": 7, "00011000101000001": 1, "00011011001000001": 1, "00011100000000001": 5, "00111011000001001": 1, "01101011000000001": 5, "01101011000010101": 1, "01101011000110001": 1, "01101011001000001": 1, "01101111100000001": 9, "01101111100100001": 1, "01110000000000001": 4, "01110011000100001": 1, "01110100100000000": 1, "01110100100000001": 2, "10000011110000001": 1, "10001000100000001": 7, "10001100000000001": 4, "10010011001000000": 1, "10010011100000001": 4, "10010101000000101": 1, "10110000000001001": 1, "11011000100101001": 1, "11100000000000001": 3, "11100000000100000": 1, "11100011001100001": 1, "11100100100000001": 2, "11100100100010001": 1, "11100111100110000": 1, "11101000000110011": 1, "11110000010010001": 1, "11111001000000101": 1, "11111010010010110": 1, "11111011000000001": 5, "11111111100000001": 6 }, finishedAt: "2026-10-10T01:44:30Z", jobId: "01a1237b-5f60-7349-89d0-a343dca0201c", missionId: "silent-failure", prediction: { equivalentToReference: !0, logicalFlip: { x: [!0], z: [!1] }, referenceCorrection: "XIIIIIIII", referenceVerdict: "logical-error", residual: "XXXIIIIII", syndrome: [1, 0, 0, 0, 0, 0, 0, 0], verdict: "logical-error" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:44:00Z" }], dg = 1, fg = {
  note: cg,
  results: ug,
  schema: dg
};
function Da(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function hg(n) {
  if (!Da(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (typeof a != "number" || !Number.isFinite(a)) return null;
    s[l] = a;
  }
  return s;
}
function pg(n) {
  if (!Da(n)) return null;
  const s = n.source;
  if (s !== "local-simulator" && s !== "cached-cloud" && s !== "live-cloud") return null;
  const l = hg(n.counts);
  if (l === null) return null;
  const a = (b) => {
    const S = n[b];
    return typeof S == "string" ? S : null;
  }, d = a("missionId"), f = a("correction"), p = a("backendName"), g = a("startedAt"), x = a("finishedAt"), k = n.shots;
  return d === null || f === null || p === null || g === null || x === null || typeof k != "number" || !Number.isInteger(k) || k <= 0 ? null : {
    status: "ok",
    source: s,
    backendName: p,
    missionId: d,
    correction: f,
    shots: k,
    counts: l,
    analysis: n.analysis ?? null,
    prediction: n.prediction ?? null,
    jobId: a("jobId"),
    startedAt: g,
    finishedAt: x
  };
}
function mg(n) {
  if (!Da(n) || n.schema !== 1 || !Array.isArray(n.results)) return [];
  const s = [];
  for (const l of n.results) {
    const a = pg(l);
    a !== null && s.push(a);
  }
  return s;
}
function gg(n, s, l) {
  if (s === l) return !0;
  try {
    const a = Oe(an(n).code), d = Xe(s), f = Xe(l);
    return d.n !== a.n || f.n !== a.n ? !1 : $a(a, d, f);
  } catch {
    return !1;
  }
}
function ch(n, s, l) {
  return n.filter((a) => a.missionId === s && (l === void 0 || gg(s, l, a.correction)));
}
function yg(n = mg(fg)) {
  return {
    kind: "none",
    cached: (s, l) => ch(n, s, l)
  };
}
const On = [
  { id: "station-row", missionId: "first-alarm", kind: "houses-row", hasBeacon: !1 },
  { id: "bridge", missionId: "red-forward-blue-backward", kind: "bridge", hasBeacon: !1 },
  { id: "lab", missionId: "color-switch", kind: "lab", hasBeacon: !1 },
  { id: "central", missionId: "blind-dispatch", kind: "grid", hasBeacon: !1 },
  { id: "market", missionId: "two-kinds-of-trouble", kind: "grid", hasBeacon: !1 },
  { id: "old-town", missionId: "silent-failure", kind: "grid", hasBeacon: !0 }
];
function tr(n) {
  return On.find((s) => s.missionId === n);
}
function ba(n, s) {
  return s[n.missionId]?.completed === !0;
}
function Fa(n, s, l) {
  const a = On.findIndex((p) => p.id === n);
  if (a < 0) throw new Error(`unknown district '${n}'`);
  const d = On[a];
  if (d === void 0) throw new Error(`unknown district '${n}'`);
  return ba(d, s) ? "solved" : l || On.slice(0, a).every((p) => ba(p, s)) ? "available" : "locked";
}
function xg(n, s, l) {
  const a = tr(n);
  return a === void 0 ? void 0 : Fa(a.id, s, l);
}
function wg(n) {
  return On.find((s) => !ba(s, n)) ?? null;
}
const kg = {
  trucks: 400,
  run: 400,
  stagger: 420,
  sprayAfterRun: 250,
  spray: 500,
  impact: 300,
  hold: 420,
  reveal: 300,
  alarms: 300,
  outcome: 400
};
function cf(n, s) {
  const l = $s(n), a = $s(s);
  return _a(l.x ^ a.x, l.z ^ a.z);
}
function uf(n) {
  try {
    return Oe(an(n).code).checks.length > 0;
  } catch {
    return !0;
  }
}
function yl(n) {
  switch (n.verdict) {
    case "success":
      return xt(Xe(n.residual)) === 0 ? "restored" : "safe-pattern";
    case "detectable":
      return uf(n.missionId) ? "still-burning" : "prediction-miss";
    case "logical-error":
      return uf(n.missionId) ? "logical-failure" : "prediction-miss";
  }
}
function vg(n, s) {
  return s === "I" ? "extinguished" : n === "I" ? "ignited" : "changed";
}
function jg(n) {
  return Vt(Xe(n.residual));
}
function Na(n, s) {
  const l = Xe(n.fires), a = Xe(n.crews), d = Xe(n.residual);
  if (l.n !== a.n || l.n !== d.n) throw new Error("effects: fires, crews and residual must share the qubit count");
  const f = kg, p = [{ type: "trucks-arrive", t: 0, dur: f.trucks }];
  let g = f.trucks;
  Vt(a).forEach((b, S) => {
    const C = Yt(a, b);
    if (C === "I") return;
    const I = f.trucks + S * f.stagger, _ = I + f.sprayAfterRun, R = _ + f.spray, L = Yt(l, b), W = Yt(d, b);
    if (cf(L, C) !== W)
      throw new Error(`effects: residual at house ${String(b)} is ${W}, but ${L} ⊕ ${C} = ${cf(L, C)}`);
    p.push({ type: "crew-run", t: I, dur: f.run, q: b, crew: C }), p.push({ type: "spray-start", t: _, dur: f.spray, q: b, crew: C, before: L }), p.push({ type: "impact", t: R, dur: f.impact, q: b, crew: C, before: L, after: W, effect: vg(L, W) }), g = Math.max(g, R + f.hold);
  });
  const k = Vt(d).filter((b) => Yt(a, b) === "I");
  if (p.push({ type: "reveal-remaining", t: g, dur: f.reveal, qs: k }), g += f.reveal, p.push({ type: "alarms", t: g, dur: f.alarms, syndrome: [...n.syndromeOfResidual] }), g += f.alarms, p.push({ type: "outcome", t: g, dur: f.outcome, result: yl(n) }), g += f.outcome, p.push({ type: "done", t: g, dur: 0 }), p.sort((b, S) => b.t - S.t), s) {
    const b = p.map((S, C) => S.type === "done" ? { ...S, t: C } : { ...S, t: C, dur: 1 });
    return { durationMs: b.length, events: b };
  }
  return { durationMs: g, events: p };
}
const Sg = On[0]?.missionId ?? "first-alarm", za = "Progress reset.";
function bg(n, s = null) {
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
    motionReduced: n?.settings.reducedMotion ?? !1,
    celebrate: null,
    citySelect: null,
    tutorialActive: !1,
    tutorialDone: n?.tutorialDone ?? !1,
    progress: n?.progress ?? {},
    settings: n?.settings ?? dl,
    notice: s
  };
}
function Ng(n, s) {
  let l = ml(n);
  for (const [a, d] of Object.entries(s)) l = sm(l, Number(a), d);
  return l;
}
function Ar(n) {
  return Object.keys(n).length;
}
function ut(n) {
  return n.missionId === null ? null : an(n.missionId);
}
function Eg(n, s) {
  const l = qm(n), a = Oe(l.code), d = Xe(l.challenge.error), f = cm(d, l.challenge.circuit), p = Ng(a.n, s), g = da(a, f, p), x = on(Fr(a, d)), k = l.kind === "dispatch" ? $m(a).decode(Cm(x)) : f, b = da(a, f, k), S = $a(a, p, k), C = Ym({ code: a, outcome: g.kind, crews: p, decoderCrews: k, maxStars: an(n).maxStars }), I = tg({ kind: l.kind, code: a, start: d, circuit: l.challenge.circuit, crews: p, verdict: g }), _ = ng({
    kind: l.kind,
    code: a,
    finalFire: f,
    crews: p,
    verdict: g,
    equivalent: S,
    decoderCrews: k,
    decoderVerdict: b
  }), R = Ee(f), L = (S || g.kind === "success") && R !== Ee(p), W = L ? f : k, $ = L ? da(a, f, f) : b, D = {
    crews: Ee(W),
    verdict: $.kind,
    kind: L ? "true-fires" : "decoder",
    residual: Ee($.residual),
    syndromeOfResidual: on($.syndrome),
    logicalFlip: { x: [...$.logicalFlip.x], z: [...$.logicalFlip.z] }
  };
  return {
    missionId: n,
    fires: R,
    startFires: Ee(d),
    crews: Ee(p),
    residual: Ee(g.residual),
    syndromeOfFires: on(Fr(a, f)),
    syndromeOfResidual: on(g.syndrome),
    verdict: g.kind,
    verdictLabel: Km(g.kind, a.checks.length > 0),
    logicalFlip: { x: [...g.logicalFlip.x], z: [...g.logicalFlip.z] },
    score: C,
    narrative: l.debrief[g.kind],
    steps: I,
    whatIf: _,
    alternative: D
  };
}
function Cg(n, s, l, a) {
  const d = n[s], f = {
    stars: d === void 0 ? l : Math.max(d.stars, l),
    attempts: (d?.attempts ?? 0) + 1,
    completed: (d?.completed ?? !1) || a
  };
  return { ...n, [s]: f };
}
function nl(n, s) {
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
function df(n, s) {
  const l = an(s);
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
    autoPlay: !1,
    // City-only state is spent once a district is entered.
    celebrate: null,
    citySelect: null
  };
}
const uh = ["dispatch", "debrief", "result"];
function Tg(n) {
  const s = n.debrief;
  if (s === null || !uh.includes(n.screen)) return { celebrate: null, citySelect: null };
  const l = tr(s.missionId) ?? null, a = s.score.completed ? l?.id ?? null : null, d = ih(s.missionId), f = d === null ? null : tr(d) ?? null, p = f !== null && (n.settings.freeRoam || Fa(f.id, n.progress, !1) === "available");
  return { celebrate: a, citySelect: p ? f.id : l?.id ?? null };
}
function ha(n) {
  return { ...n, screen: "missions", standDownDialog: !1, autoPlay: !1, tutorialActive: !1, tutorialDone: !0, ...Tg(n) };
}
function pa(n, s) {
  const l = [...n.undoStack, n.placements].slice(-20);
  return { ...n, placements: s, undoStack: l, redoStack: [] };
}
const ma = ["how", "settings"];
function ff(n, s) {
  let l = Ig(n, s);
  return l.screen !== n.screen && (l.notice === za && (l = { ...l, notice: null }), l.highlightedCheck !== null && (l = { ...l, highlightedCheck: null })), l;
}
function Ig(n, s) {
  switch (s.type) {
    case "HYDRATE":
      return {
        ...n,
        progress: s.save.progress,
        settings: s.save.settings,
        motionReduced: n.motionReduced || s.save.settings.reducedMotion,
        tutorialDone: s.save.tutorialDone,
        notice: s.notice ?? n.notice
      };
    case "PLAY":
      return n.tutorialDone ? { ...n, screen: "missions", tutorialActive: !1, celebrate: null, citySelect: null } : { ...df(n, Sg), tutorialActive: !0 };
    case "TUTORIAL_SKIP":
      return n.tutorialActive ? ha(n) : { ...n, tutorialDone: !0 };
    case "OPEN_HOW":
      return ma.includes(n.screen) ? { ...n, screen: "how" } : { ...n, screen: "how", returnTo: n.screen };
    case "OPEN_SETTINGS":
      return ma.includes(n.screen) ? { ...n, screen: "settings" } : { ...n, screen: "settings", returnTo: n.screen };
    case "CLOSE_OVERLAY":
      return ma.includes(n.screen) ? { ...n, screen: n.returnTo } : n;
    case "OPEN_MISSIONS":
      return ha(n);
    case "OPEN_TITLE":
      return { ...n, screen: "title", standDownDialog: !1, autoPlay: !1, tutorialActive: !1, celebrate: null, citySelect: null };
    case "CELEBRATED":
      return n.celebrate === null ? n : { ...n, celebrate: null };
    case "SELECT_MISSION": {
      const l = xg(s.id, n.progress, n.settings.freeRoam);
      return l === void 0 || l === "locked" ? n : { ...df(n, s.id), tutorialActive: !1 };
    }
    case "START_MISSION": {
      const l = ut(n);
      return l === null || n.screen !== "briefing" ? n : l.training.length > 0 ? { ...n, screen: "training", lesson: 0, lessonCursor: -1 } : nl(n, l);
    }
    case "LESSON_SELECT": {
      const l = ut(n);
      return l === null || n.screen !== "training" || s.lesson < 0 || s.lesson >= l.training.length ? n : { ...n, lesson: s.lesson, lessonCursor: -1 };
    }
    case "LESSON_CURSOR": {
      const l = ut(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      if (a === void 0) return n;
      const d = Math.max(-1, Math.min(a.circuit.length - 1, s.cursor));
      return { ...n, lessonCursor: d };
    }
    case "LESSON_NEXT": {
      const l = ut(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      return a === void 0 ? n : n.lessonCursor < a.circuit.length - 1 ? { ...n, lessonCursor: n.lessonCursor + 1 } : n.lesson < l.training.length - 1 ? { ...n, lesson: n.lesson + 1, lessonCursor: -1 } : nl(n, l);
    }
    case "LESSON_PREV": {
      const l = ut(n);
      if (l === null || n.screen !== "training") return n;
      if (n.lessonCursor > -1) return { ...n, lessonCursor: n.lessonCursor - 1 };
      if (n.lesson > 0) {
        const a = l.training[n.lesson - 1];
        return { ...n, lesson: n.lesson - 1, lessonCursor: (a?.circuit.length ?? 0) - 1 };
      }
      return n;
    }
    case "START_CHALLENGE": {
      const l = ut(n);
      return l === null || n.screen !== "training" && n.screen !== "briefing" ? n : nl(n, l);
    }
    case "SELECT_LETTER": {
      const l = ut(n);
      return l === null || n.screen !== "challenge" || !l.allowed.includes(s.letter) ? n : { ...n, selected: s.letter };
    }
    case "TOGGLE_BLOCK": {
      const l = ut(n);
      if (l === null || n.screen !== "challenge" || n.standDownDialog) return n;
      const a = Oe(l.code).n;
      if (s.qubit < 0 || s.qubit >= a) return n;
      const d = n.placements[s.qubit], f = { ...n.placements };
      if (d === n.selected)
        delete f[s.qubit];
      else if (d !== void 0)
        f[s.qubit] = n.selected;
      else {
        if (Ar(n.placements) >= l.budget) return n;
        f[s.qubit] = n.selected;
      }
      return pa(n, f);
    }
    case "RECALL_BLOCK": {
      if (n.screen !== "challenge" || n.standDownDialog || n.placements[s.qubit] === void 0) return n;
      const l = { ...n.placements };
      return delete l[s.qubit], pa(n, l);
    }
    case "CLEAR_CREWS":
      return n.screen !== "challenge" || n.standDownDialog || Ar(n.placements) === 0 ? n : pa(n, {});
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
      const l = ut(n);
      if (l === null) return n;
      if (s.checkIndex === null) return n.highlightedCheck === null ? n : { ...n, highlightedCheck: null };
      const a = Oe(l.code).checks.length;
      return !Number.isInteger(s.checkIndex) || s.checkIndex < 0 || s.checkIndex >= a ? n : { ...n, highlightedCheck: n.highlightedCheck === s.checkIndex ? null : s.checkIndex };
    }
    case "CONFIRM": {
      const l = ut(n);
      return l === null || n.screen !== "challenge" || n.standDownDialog ? n : Ar(n.placements) === 0 ? { ...n, standDownDialog: !0 } : hf(n, l, s.reducedMotion ?? n.settings.reducedMotion);
    }
    case "STAND_DOWN_CANCEL":
      return { ...n, standDownDialog: !1 };
    case "STAND_DOWN_CONFIRM": {
      const l = ut(n);
      return l === null || n.screen !== "challenge" || !n.standDownDialog ? n : hf(n, l, s.reducedMotion ?? n.settings.reducedMotion);
    }
    case "DISPATCH_DONE":
    case "DISPATCH_SKIP":
      return n.screen !== "dispatch" || n.debrief === null || n.dispatchDone ? n : { ...n, dispatchDone: !0 };
    case "OPEN_WHY": {
      if (n.debrief === null || !(n.screen === "dispatch" && n.dispatchDone) && n.screen !== "result") return n;
      const a = s.reducedMotion ?? n.settings.reducedMotion;
      return { ...n, screen: "debrief", replayIndex: 0, motionReduced: a, autoPlay: !a && n.debrief.steps.length > 1 };
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
      const l = (s.reducedMotion ?? !1) || n.motionReduced || n.settings.reducedMotion, a = s.on && !l;
      if (a === n.autoPlay && (!a || n.replayIndex < n.debrief.steps.length - 1)) return n;
      const d = n.debrief.steps.length - 1;
      return { ...n, autoPlay: a, replayIndex: a && n.replayIndex >= d ? 0 : n.replayIndex };
    }
    case "SHOW_RESULT":
      return n.debrief === null || !(n.screen === "dispatch" && n.dispatchDone) && n.screen !== "debrief" ? n : { ...n, screen: "result", autoPlay: !1 };
    case "TRY_AGAIN": {
      const l = ut(n);
      return l === null || n.screen !== "dispatch" && n.screen !== "debrief" && n.screen !== "result" ? n : nl(n, l);
    }
    case "NEXT_MISSION":
      return n.missionId === null || n.debrief === null || !uh.includes(n.screen) || n.screen === "dispatch" && !n.dispatchDone ? n : !n.tutorialActive && ih(n.missionId) === null && n.debrief.score.completed ? { ...n, screen: "summary", autoPlay: !1, celebrate: null, citySelect: null } : ha(n);
    case "SET_SOUND":
      return { ...n, settings: { ...n.settings, sound: s.on } };
    case "SET_REDUCED_MOTION":
      return { ...n, settings: { ...n.settings, reducedMotion: s.on }, motionReduced: s.on, autoPlay: s.on ? !1 : n.autoPlay };
    case "SET_LANGUAGE":
      return n.settings.language === s.language ? n : { ...n, settings: { ...n.settings, language: s.language } };
    case "SET_FREE_ROAM":
      return n.settings.freeRoam === s.on ? n : { ...n, settings: { ...n.settings, freeRoam: s.on } };
    case "RESET_PROGRESS":
      return { ...n, progress: {}, notice: za };
    case "SHOW_NOTICE":
      return { ...n, notice: s.text };
    case "DISMISS_NOTICE":
      return { ...n, notice: null };
  }
}
function hf(n, s, l) {
  const a = Eg(s.id, n.placements), d = n.tutorialActive && a.verdict === "success";
  return {
    ...n,
    screen: "dispatch",
    standDownDialog: !1,
    debrief: a,
    dispatchDone: !1,
    replayIndex: 0,
    motionReduced: l,
    autoPlay: !l && a.steps.length > 1,
    progress: Cg(n.progress, s.id, a.score.stars, a.score.completed),
    tutorialDone: n.tutorialDone || d
  };
}
function Lg(n) {
  return { version: Os, progress: n.progress, settings: n.settings, tutorialDone: n.tutorialDone };
}
function Wa(n) {
  return $n().reduce((s, l) => s + (n[l.id]?.stars ?? 0), 0);
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
}, Rg = { X: m.crewX, Z: m.crewZ, Y: m.crewY }, J = 2.5, fe = 1.6, pf = [m.wallPeach, m.wallMint, m.wallButter, m.wallLilac, m.wallRose, m.wallPowder], mf = [m.roofTerracotta, m.roofSlate, m.roofMoss, m.roofPlum];
function Pe(n) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}
const Xr = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
function dh(n) {
  return Rg[n];
}
function Le({ x: n, y: s, scale: l = 1, title: a, className: d, children: f }) {
  const p = l === 1 ? `translate(${Pe(n)} ${Pe(s)})` : `translate(${Pe(n)} ${Pe(s)}) scale(${Pe(l)})`;
  return /* @__PURE__ */ i.jsxs("g", { transform: p, className: d, role: a === void 0 ? void 0 : "img", "aria-label": a, children: [
    a !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: a }) : null,
    f
  ] });
}
function Mn({ cx: n, cy: s, r: l, letter: a, fill: d = m.paper, ink: f = m.ink, stroke: p = m.ink }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: l, fill: d, stroke: p, strokeWidth: J * 0.8 }),
    /* @__PURE__ */ i.jsx("text", { x: n, y: s + l * 0.72, textAnchor: "middle", fontSize: l * 1.9, fontWeight: 800, fill: f, fontFamily: Xr, style: { userSelect: "none" }, children: a })
  ] });
}
function An({ cx: n, cy: s, rx: l, ry: a = l * 0.32 }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.shadow });
}
const fh = "M0 0 C-26 0 -38 -16 -38 -36 C-38 -52 -30 -60 -32 -74 C-24 -66 -18 -58 -16 -48 C-10 -62 -4 -76 0 -92", hh = "M0 -92 C6 -74 20 -62 28 -48 C36 -34 36 -14 22 -4 C16 0 8 0 0 0", ga = `${fh} ${hh} Z`, _g = "M0 -6 C-14 -6 -20 -16 -20 -28 C-20 -40 -12 -48 -8 -56 C-4 -46 2 -40 4 -32 C10 -40 10 -50 10 -56 C18 -46 20 -34 18 -24 C16 -12 10 -6 0 -6 Z";
function Gn({ letter: n, residual: s = !1, ghost: l = !1, ...a }) {
  const d = n === "Z" ? m.fireZ : m.fireX, f = n === "X" ? m.fireX : m.fireZ, p = n === "X" ? m.fireXCore : n === "Z" ? m.fireZCore : m.fireYCore;
  return l ? /* @__PURE__ */ i.jsxs(Le, { ...a, children: [
    /* @__PURE__ */ i.jsx("path", { d: ga, fill: m.paper, fillOpacity: 0.6, stroke: m.ghost, strokeWidth: J, strokeDasharray: "7 5", strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: -26, r: 13, letter: n, ink: m.ghost, stroke: m.ghost })
  ] }) : /* @__PURE__ */ i.jsxs(Le, { ...a, children: [
    s ? /* @__PURE__ */ i.jsx("path", { d: ga, fill: "none", stroke: m.danger, strokeWidth: J * 3.2, strokeLinejoin: "round" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `${fh} L0 0 Z`, fill: d }),
    /* @__PURE__ */ i.jsx("path", { d: `${hh} L0 -92 Z`, fill: f }),
    /* @__PURE__ */ i.jsx("path", { d: _g, fill: p }),
    /* @__PURE__ */ i.jsx("path", { d: ga, fill: "none", stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: -26, r: 13, letter: n })
  ] });
}
function gf({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, scale: (s.scale ?? 1) * n, children: [
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
function Og(n) {
  return /* @__PURE__ */ i.jsx(Le, { ...n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.steam, stroke: m.fogDark, strokeWidth: J * 0.7, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: -12, cy: -14, r: 11 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 6, cy: -22, r: 13 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -2, cy: -40, r: 9 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 14, cy: -50, r: 6 })
  ] }) });
}
function ph(n) {
  return /* @__PURE__ */ i.jsxs(Le, { ...n, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -16, r: 16, fill: m.success, stroke: m.ink, strokeWidth: J * 0.8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M-8 -16 L-2 -10 L9 -23", fill: "none", stroke: m.paper, strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Mg({ from: n, to: s, progress: l = 1, lift: a, title: d, className: f }) {
  const p = s.x - n.x, g = s.y - n.y, x = Math.hypot(p, g), k = a ?? Math.max(28, x * 0.35), b = (n.x + s.x) / 2, S = Math.min(n.y, s.y) - k, C = Math.max(0, Math.min(1, l)), I = { x: n.x + (b - n.x) * C, y: n.y + (S - n.y) * C }, _ = { x: b + (s.x - b) * C, y: S + (s.y - S) * C }, R = { x: I.x + (_.x - I.x) * C, y: I.y + (_.y - I.y) * C }, L = `M${Pe(n.x)} ${Pe(n.y)} Q${Pe(I.x)} ${Pe(I.y)} ${Pe(R.x)} ${Pe(R.y)}`, W = [];
  for (let $ = 1; $ <= 4; $++) {
    const D = $ / 5 * C, te = 1 - D, K = te * te * n.x + 2 * te * D * b + D * D * s.x, Z = te * te * n.y + 2 * te * D * S + D * D * s.y;
    W.push({ x: K + ($ % 2 === 0 ? 9 : -9), y: Z + 10 + $ % 2 * 4, r: 3.2 + $ % 3 });
  }
  return /* @__PURE__ */ i.jsxs("g", { className: f, role: d === void 0 ? void 0 : "img", "aria-label": d, children: [
    d !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: d }) : null,
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.waterDeep, strokeWidth: 13, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.water, strokeWidth: 9, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: L, fill: "none", stroke: m.waterHighlight, strokeWidth: 2.4, strokeLinecap: "round", strokeDasharray: "10 14" }),
    W.map(($, D) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: $.x, cy: $.y, r: $.r, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: $.x - $.r * 0.3, cy: $.y - $.r * 0.3, r: $.r * 0.3, fill: m.waterHighlight })
    ] }, D)),
    C >= 1 ? /* @__PURE__ */ i.jsx("circle", { cx: s.x, cy: s.y, r: 8, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }) : null
  ] });
}
function Pg({ spread: n = 1, ...s }) {
  const l = 0.4 + 0.6 * Math.max(0, Math.min(1, n)), a = [-150, -115, -80, -50, -25, 0, 30].map((d, f) => {
    const p = d * Math.PI / 180, g = (26 + f % 2 * 10) * l;
    return { x: Math.cos(p) * g, y: Math.sin(p) * g - 4, size: 3.5 + f % 3 * 1.2 };
  });
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 26 * l, ry: 7 * l, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6 * l, cy: 1, rx: 8 * l, ry: 2.2 * l, fill: m.waterHighlight }),
    a.map((d, f) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("line", { x1: 0, y1: -4, x2: d.x * 0.55, y2: d.y * 0.55, stroke: m.water, strokeWidth: 2.2, strokeLinecap: "round" }),
      /* @__PURE__ */ i.jsx("circle", { cx: d.x, cy: d.y, r: d.size, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: d.x - d.size * 0.3, cy: d.y - d.size * 0.3, r: d.size * 0.3, fill: m.waterHighlight })
    ] }, f))
  ] });
}
function $g(n) {
  return /* @__PURE__ */ i.jsxs(Le, { ...n, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M0 -40 C8 -26 16 -18 16 -8 A16 16 0 0 1 -16 -8 C-16 -18 -8 -26 0 -40 Z", fill: m.water, stroke: m.waterDeep, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6, cy: -12, rx: 3.5, ry: 5, fill: m.waterHighlight })
  ] });
}
const yf = { x: 34, y: -34 };
function Ag(n, s, l = 1, a = 1) {
  return { x: n + yf.x * l * a, y: s + yf.y * l };
}
function mh({ letter: n, pose: s = "idle", facing: l = 1, shadow: a = !0, ...d }) {
  const f = dh(n), p = Dg(s);
  return /* @__PURE__ */ i.jsxs(Le, { ...d, children: [
    a ? /* @__PURE__ */ i.jsx(An, { cx: 0, cy: 1, rx: 16, ry: 4.5 }) : null,
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
      /* @__PURE__ */ i.jsx("g", { transform: l === -1 ? "scale(-1 1)" : void 0, children: /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: -69, r: 7.5, letter: n }) })
    ] })
  ] });
}
function Dg(n) {
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
function Xa({ letter: n, ...s }) {
  const l = dh(n);
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -8 Q-22 -40 0 -40 Q22 -40 22 -8 Z", fill: l, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("rect", { x: -27, y: -10, width: 54, height: 8, rx: 4, fill: l, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: -22, r: 10, letter: n })
  ] });
}
function gh({ facing: n = 1, lights: s = !1, wheelFrame: l = 0, ...a }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...a, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 0, cy: 2, rx: 72, ry: 6 }),
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
      /* @__PURE__ */ i.jsx(xf, { cx: -42, frame: l }),
      /* @__PURE__ */ i.jsx(xf, { cx: 48, frame: l })
    ] })
  ] });
}
function xf({ cx: n, frame: s }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 13, fill: m.wheel }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 6.5, fill: m.hub, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 5, y1: s === 0 ? -13 : -18, x2: n + 5, y2: s === 0 ? -13 : -8, stroke: m.ink, strokeWidth: 1.6 })
  ] });
}
const ya = -44, bt = 16;
function yh({ type: n, ringing: s, highlighted: l }) {
  const a = n === "Z" ? m.fireX : m.fireZ, d = s ? m.alarm : m.paper, f = s ? m.alarmDark : a;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    l ? /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: bt + 9, fill: "none", stroke: m.highlight, strokeWidth: J * 1.6 }) : null,
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: bt + 7, fill: "none", stroke: m.alarmRing, strokeWidth: 2.4 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: bt + 13, fill: "none", stroke: m.alarmRing, strokeWidth: 1.6 })
    ] }) : null,
    n === "Z" ? /* @__PURE__ */ i.jsx("polygon", { points: `0,${String(-bt)} ${String(bt)},0 0,${String(bt)} ${String(-bt)},0`, fill: d, stroke: f, strokeWidth: J, strokeLinejoin: "round" }) : /* @__PURE__ */ i.jsx("rect", { x: -bt * 0.85, y: -bt * 0.85, width: bt * 1.7, height: bt * 1.7, rx: 3, fill: d, stroke: f, strokeWidth: J }),
    s ? /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: 0, r: 9, letter: "!", fill: m.paper, ink: m.alarmDark, stroke: m.alarmDark }) : /* @__PURE__ */ i.jsx("text", { x: 0, y: 6.5, textAnchor: "middle", fontSize: 18, fontWeight: 800, fill: a, fontFamily: Xr, style: { userSelect: "none" }, children: n })
  ] });
}
function Ls({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...a, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 0, cy: 1, rx: 10, ry: 3 }),
    l ? /* @__PURE__ */ i.jsx("line", { x1: 0, y1: ya + bt + 9, x2: 0, y2: 0, stroke: m.highlight, strokeWidth: 9, strokeLinecap: "round" }) : null,
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: ya + bt - 4, width: 6, height: 32, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -9, y: -5, width: 18, height: 5, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("g", { transform: `translate(0 ${String(ya)})`, children: /* @__PURE__ */ i.jsx(yh, { type: n, ringing: s, highlighted: l }) })
  ] });
}
function Fg({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsx(Le, { ...a, children: /* @__PURE__ */ i.jsx(yh, { type: n, ringing: s, highlighted: l }) });
}
const zg = {
  small: { w: 64, h: 44, roof: 30, side: 12 },
  tall: { w: 56, h: 84, roof: 22, side: 12 },
  shop: { w: 84, h: 46, roof: 16, side: 12 }
};
function Ue({ variant: n = "small", state: s = { kind: "normal" }, tint: l = 0, selected: a = !1, ...d }) {
  const f = zg[n], p = pf[l % pf.length] ?? m.wallPeach, g = mf[l % mf.length] ?? m.roofTerracotta, x = f.w / 2, b = s.kind === "restored" ? m.windowLit : m.windowDark, S = -(f.h + f.roof), C = s.kind === "fog";
  return /* @__PURE__ */ i.jsxs(Le, { ...d, children: [
    /* @__PURE__ */ i.jsx(An, { cx: f.side / 2, cy: 2, rx: x + f.side, ry: 7 }),
    s.kind === "residual" ? /* @__PURE__ */ i.jsx("rect", { x: -x - 6, y: S - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.danger, strokeWidth: J * 2.4 }) : null,
    a ? /* @__PURE__ */ i.jsx("rect", { x: -x - 8, y: S - 8, width: f.w + f.side + 16, height: f.h + f.roof + 16, rx: 10, fill: "none", stroke: m.highlight, strokeWidth: J * 1.6, strokeDasharray: "10 6" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `M${String(x)} 0 L${String(x + f.side)} ${String(-f.side * 0.6)} L${String(x + f.side)} ${String(-f.h - f.side * 0.6)} L${String(x)} ${String(-f.h)} Z`, fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -x, y: -f.h, width: f.w, height: f.h, fill: p, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(x + 4)} ${String(-f.h)} L${String(x + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(f.side)} ${String(S - f.side * 0.6)} L0 ${String(S)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-x - 5)} ${String(-f.h)} L0 ${String(S)} L${String(x + 5)} ${String(-f.h)} Z`, fill: g, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-x - 4)} ${String(-f.h)} L${String(-x - 4 + f.side)} ${String(-f.h - f.side * 0.6)} L${String(x + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(x + 4)} ${String(-f.h)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: -x - 4, y: -f.h - f.roof, width: f.w + 8, height: f.roof, fill: g, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
      n === "shop" ? /* @__PURE__ */ i.jsx("path", { d: `M${String(-x - 4)} ${String(-f.h - f.roof)} H${String(x + 4)}`, stroke: m.paper, strokeWidth: 4, strokeDasharray: "8 8" }) : null
    ] }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -x + 9, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: b, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: x - 25, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: b, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -22, width: 16, height: 22, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe })
    ] }) : n === "tall" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      [0, 1, 2].map((I) => /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("rect", { x: -x + 8, y: -f.h + 10 + I * 22, width: 14, height: 13, rx: 2, fill: b, stroke: m.ink, strokeWidth: fe }),
        /* @__PURE__ */ i.jsx("rect", { x: x - 22, y: -f.h + 10 + I * 22, width: 14, height: 13, rx: 2, fill: b, stroke: m.ink, strokeWidth: fe })
      ] }, I)),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -20, width: 16, height: 20, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -x + 8, y: -f.h + 12, width: f.w - 40, height: 22, rx: 2, fill: b, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: x - 26, y: -26, width: 18, height: 26, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe }),
      /* @__PURE__ */ i.jsx("rect", { x: -x - 4, y: -f.h + 2, width: f.w + 8, height: 6, fill: m.paper, stroke: m.ink, strokeWidth: fe })
    ] }),
    s.kind === "fire" || s.kind === "residual" ? /* @__PURE__ */ i.jsx(Gn, { letter: s.letter, x: n === "shop" ? -10 : 0, y: S + 14, scale: 0.62, residual: s.kind === "residual" }) : null,
    s.kind === "ghost" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -x - 6, y: S - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.ghost, strokeWidth: J, strokeDasharray: "8 6" }),
      /* @__PURE__ */ i.jsx(Gn, { letter: s.letter, x: 0, y: S + 14, scale: 0.62, ghost: !0 })
    ] }) : null,
    s.kind === "out" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Og, { x: 0, y: S + 10, scale: 0.7 }),
      /* @__PURE__ */ i.jsx(ph, { x: x - 4, y: -f.h + 6, scale: 0.8 })
    ] }) : null,
    C ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -x - 10, y: S - 12, width: f.w + f.side + 20, height: f.h + f.roof + 14, rx: 14, fill: m.fog, fillOpacity: 0.82, stroke: m.fogDark, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("text", { x: f.side / 2, y: -(f.h + f.roof) / 2 + 14, textAnchor: "middle", fontSize: 38, fontWeight: 800, fill: m.paper, stroke: m.fogDark, strokeWidth: 1.2, fontFamily: Xr, style: { userSelect: "none" }, children: "?" })
    ] }) : null
  ] });
}
function xl({ anomaly: n = null, lit: s = !1, ...l }) {
  const a = n === null ? s ? m.windowLit : m.beaconDome : n === "X" ? m.fireX : n === "Z" ? m.fireZ : m.crewY;
  return /* @__PURE__ */ i.jsxs(Le, { ...l, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 6, cy: 2, rx: 44, ry: 7 }),
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
        /* @__PURE__ */ i.jsx(Mn, { cx: -14, cy: -186, r: 11, letter: "X", ink: m.fireX, stroke: m.fireX }),
        /* @__PURE__ */ i.jsx(Mn, { cx: 14, cy: -186, r: 11, letter: "Z", ink: m.fireZ, stroke: m.fireZ })
      ] }) : /* @__PURE__ */ i.jsx(Mn, { cx: 0, cy: -186, r: 12, letter: n, ink: a, stroke: a })
    ] }) : null
  ] });
}
function Wg({ open: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 8, cy: 2, rx: 84, ry: 8 }),
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
function xh({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 8, cy: 2, rx: 76, ry: 8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M60 0 L74 -8 L74 -62 L60 -54 Z", fill: m.side, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -60, y: -54, width: 120, height: 54, fill: m.wallPowder, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M-64 -54 L-50 -62 L74 -62 L60 -54 Z", fill: m.roofSlate, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -52, y: -44, width: 104, height: 24, rx: 4, fill: m.glass, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("path", { d: "M-40 -44 V-20 M-20 -44 V-20 M0 -44 V-20 M20 -44 V-20 M40 -44 V-20", stroke: m.paper, strokeWidth: 2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -10, y: -18, width: 20, height: 18, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx(wh, { x: 0, y: -62, scale: 0.9, active: n, label: !1 })
  ] });
}
function wh({ active: n = !1, label: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...l, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -16, y: -6, width: 32, height: 6, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: -20, width: 6, height: 14, fill: m.inkSoft, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsxs("g", { transform: "rotate(-45 0 -30)", children: [
      /* @__PURE__ */ i.jsx("rect", { x: -22, y: -34, width: 44, height: 8, rx: 2, fill: n ? m.alarmRing : m.glass, stroke: m.ink, strokeWidth: J }),
      /* @__PURE__ */ i.jsx("line", { x1: -16, y1: -30, x2: 14, y2: -30, stroke: m.paper, strokeWidth: 2 })
    ] }),
    s ? /* @__PURE__ */ i.jsx("text", { x: 0, y: -40, textAnchor: "middle", fontSize: 16, fontWeight: 800, fill: m.ink, fontFamily: Xr, style: { userSelect: "none" }, children: "H" }) : null
  ] });
}
function kh({ width: n = 160, ...s }) {
  const l = n / 2;
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
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
function Za({ x: n = 0, y: s = 0, width: l, height: a, rx: d = 0 }) {
  return /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: d, fill: m.sand });
}
function Jn({ cx: n, cy: s, rx: l, ry: a }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.grass });
}
function Xg({ d: n, width: s = 40, className: l }) {
  return /* @__PURE__ */ i.jsxs("g", { className: l, fill: "none", strokeLinecap: "butt", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadEdge, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.road, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadLine, strokeWidth: Math.max(2, s * 0.08), strokeDasharray: `${Pe(s * 0.5)} ${Pe(s * 0.45)}` })
  ] });
}
function Zg({ d: n, width: s = 14 }) {
  return /* @__PURE__ */ i.jsx("path", { d: n, fill: "none", stroke: m.sandDark, strokeWidth: s, strokeLinecap: "round", strokeLinejoin: "round" });
}
function vh({ d: n, width: s = 60 }) {
  return /* @__PURE__ */ i.jsxs("g", { fill: "none", strokeLinecap: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.riverDark, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.river, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.paper, strokeWidth: 2, strokeDasharray: "14 22", transform: "translate(-10 0)" })
  ] });
}
function yt({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, scale: (s.scale ?? 1) * n, children: [
    /* @__PURE__ */ i.jsx(An, { cx: 2, cy: 1, rx: 14, ry: 4 }),
    /* @__PURE__ */ i.jsx("rect", { x: -4, y: -22, width: 8, height: 22, fill: m.trunk, stroke: m.ink, strokeWidth: fe }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -38, r: 19, fill: m.tree, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("circle", { cx: -9, cy: -30, r: 11, fill: m.treeDark }),
    /* @__PURE__ */ i.jsx("circle", { cx: 7, cy: -46, r: 7, fill: m.grass })
  ] });
}
function Bg({ lit: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2.5, y: -62, width: 5, height: 62, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -8, y: -4, width: 16, height: 4, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -62 Q0 -70 10 -70", fill: "none", stroke: m.lampPost, strokeWidth: 4 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: 13, cy: -70, rx: 8, ry: 5, fill: n ? m.windowLit : m.lamp, stroke: m.ink, strokeWidth: fe }),
    n ? /* @__PURE__ */ i.jsx("path", { d: "M6 -64 L13 -52 L20 -64 Z", fill: m.windowLit, fillOpacity: 0.6 }) : null
  ] });
}
function qg({ colour: n = m.flag, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2, y: -62, width: 4, height: 62, fill: m.flagPole, stroke: m.ink, strokeWidth: 1 }),
    /* @__PURE__ */ i.jsx("path", { d: "M2 -62 L36 -50 L2 -38 Z", fill: n, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -64, r: 3.5, fill: m.alarmRing, stroke: m.ink, strokeWidth: 1 })
  ] });
}
function Hg(n) {
  return /* @__PURE__ */ i.jsxs(Le, { ...n, children: [
    /* @__PURE__ */ i.jsxs("g", { fill: m.barrierStripe, stroke: m.ink, strokeWidth: fe, children: [
      /* @__PURE__ */ i.jsx("rect", { x: -30, y: -22, width: 6, height: 22 }),
      /* @__PURE__ */ i.jsx("rect", { x: 24, y: -22, width: 6, height: 22 })
    ] }),
    /* @__PURE__ */ i.jsx("rect", { x: -36, y: -34, width: 72, height: 14, rx: 3, fill: m.barrier, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("g", { fill: m.barrierStripe, children: [-28, -10, 8, 26].map((s) => /* @__PURE__ */ i.jsx("path", { d: `M${String(s)} -32 L${String(s + 8)} -32 L${String(s)} -22 L${String(s - 8)} -22 Z` }, s)) })
  ] });
}
function Ug({ x: n, y: s, width: l, height: a }) {
  const d = Math.min(l, a) * 0.28;
  return /* @__PURE__ */ i.jsxs("g", { fill: m.fog, fillOpacity: 0.8, stroke: m.fogDark, strokeWidth: fe, children: [
    /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: d }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.22, cy: s + a * 0.2, r: d * 0.8 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.78, cy: s + a * 0.76, r: d * 0.9 })
  ] });
}
function jh(n) {
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(gf, { ...n, scale: (n.scale ?? 1) * 1.3 }),
    /* @__PURE__ */ i.jsx(gf, { ...n, x: n.x + 26 * (n.scale ?? 1), y: n.y - 40 * (n.scale ?? 1), scale: (n.scale ?? 1) * 0.9 })
  ] });
}
function xa({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsx(Le, { ...s, scale: (s.scale ?? 1) * n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.cloud, stroke: m.skyDeep, strokeWidth: fe, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: -10, rx: 44, ry: 12 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -14, cy: -18, r: 14 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 10, cy: -22, r: 18 })
  ] }) });
}
function fl({ colour: n = m.crewZ, earned: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...l, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -54 H22 V-24 Q22 -8 0 0 Q-22 -8 -22 -24 Z", fill: s ? n : m.fog, stroke: m.ink, strokeWidth: J, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -44 L4.5 -35 L14 -34 L7 -27 L9 -17 L0 -22 L-9 -17 L-7 -27 L-14 -34 L-4.5 -35 Z", fill: s ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: fe, strokeLinejoin: "round" })
  ] });
}
const zr = 1600, Wr = 1e3, Ut = 170, Ms = ["station-row", "bridge", "lab", "central", "market", "old-town"], Rs = { x: 80, y: 540, w: 230, h: 160, door: { x: 195 } }, Ba = 720, Sh = 40, bh = 730, Yg = 60, Dt = [
  { id: "station-row", missionId: "first-alarm", x: 380, y: 520, w: 260, h: 180, label: { x: 510, y: 505 }, entry: { x: 510, y: 720 }, gate: { x: 396, y: 596 }, block: { x: 510, y: 700 }, smoke: { x: 510, y: 600 } },
  { id: "bridge", missionId: "red-forward-blue-backward", x: 640, y: 640, w: 180, h: 120, label: { x: 730, y: 625 }, entry: { x: 600, y: 720 }, gate: { x: 662, y: 664 }, block: { x: 628, y: 724 }, smoke: { x: 740, y: 700 } },
  { id: "lab", missionId: "color-switch", x: 860, y: 260, w: 240, h: 180, label: { x: 980, y: 245 }, entry: { x: 940, y: 460 }, gate: { x: 876, y: 404 }, block: { x: 940, y: 468 }, smoke: { x: 1010, y: 340 } },
  { id: "central", missionId: "blind-dispatch", x: 1e3, y: 470, w: 300, h: 230, label: { x: 1150, y: 455 }, entry: { x: 1150, y: 720 }, gate: { x: 1016, y: 560 }, block: { x: 1150, y: 700 }, smoke: { x: 1150, y: 560 } },
  { id: "market", missionId: "two-kinds-of-trouble", x: 1340, y: 240, w: 240, h: 200, label: { x: 1460, y: 225 }, entry: { x: 1340, y: 460 }, gate: { x: 1344, y: 424 }, block: { x: 1340, y: 468 }, smoke: { x: 1470, y: 340 } },
  { id: "old-town", missionId: "silent-failure", x: 1300, y: 770, w: 260, h: 220, label: { x: 1430, y: 755 }, entry: { x: 1430, y: 720 }, gate: { x: 1312, y: 822 }, block: { x: 1430, y: 764 }, smoke: { x: 1490, y: 850 } }
];
function Or(n) {
  const s = Dt.find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown district ${n}`);
  return s;
}
const wf = { x: Rs.door.x, y: Ba }, Vg = {
  "station-row": "M195 720 H510",
  bridge: "M195 720 H600",
  lab: "M195 720 H920 Q940 720 940 700 V460",
  central: "M195 720 H1150",
  market: "M195 720 H1320 Q1340 720 1340 700 V460",
  "old-town": "M195 720 H1430"
}, Qg = ["M150 720 H1560", "M195 700 V720", "M940 720 V440", "M1340 720 V440"];
function Kg({ states: n, showSelection: s = !0 }) {
  const l = Object.values(n).some((a) => a === "solved");
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: zr, height: Ut, fill: m.sky }),
    /* @__PURE__ */ i.jsx("path", { d: `M0 ${String(Ut)} Q200 110 420 ${String(Ut - 20)} T840 ${String(Ut - 10)} T1260 ${String(Ut - 30)} T1600 ${String(Ut - 6)} V${String(Ut + 40)} H0 Z`, fill: m.grassDark }),
    /* @__PURE__ */ i.jsx(Za, { x: 0, y: Ut + 30, width: zr, height: Wr - Ut - 30 }),
    /* @__PURE__ */ i.jsx(xa, { x: 260, y: 80, size: 0.9 }),
    /* @__PURE__ */ i.jsx(xa, { x: 1180, y: 70, size: 1.1 }),
    /* @__PURE__ */ i.jsx(xa, { x: 1480, y: 110, size: 0.7 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 300, cy: 880, rx: 200, ry: 70 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 1140, cy: 900, rx: 160, ry: 50 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 620, cy: 400, rx: 150, ry: 60 }),
    /* @__PURE__ */ i.jsx(vh, { d: `M${String(bh)} ${String(Ut + 10)} V${String(Wr)}`, width: Yg }),
    Qg.map((a) => /* @__PURE__ */ i.jsx(Xg, { d: a, width: Sh }, a)),
    /* @__PURE__ */ i.jsx(yt, { x: 240, y: 880 }),
    /* @__PURE__ */ i.jsx(yt, { x: 300, y: 920, size: 0.8 }),
    /* @__PURE__ */ i.jsx(yt, { x: 380, y: 870, size: 1.1 }),
    /* @__PURE__ */ i.jsx(yt, { x: 460, y: 930, size: 0.9 }),
    /* @__PURE__ */ i.jsx(yt, { x: 560, y: 880 }),
    /* @__PURE__ */ i.jsx(yt, { x: 630, y: 340, size: 0.8 }),
    /* @__PURE__ */ i.jsx(yt, { x: 700, y: 420 }),
    [320, 560, 860, 1240, 1520].map((a) => /* @__PURE__ */ i.jsx(Bg, { x: a, y: Ba + 50, lit: l }, a)),
    /* @__PURE__ */ i.jsx(Wg, { x: Rs.x + Rs.w / 2, y: Rs.y + Rs.h, open: !0 }),
    Dt.map((a) => /* @__PURE__ */ i.jsx(Gg, { box: a, state: n[a.id], showSelection: s }, a.id))
  ] });
}
function Gg({ box: n, state: s, showSelection: l }) {
  const a = s === "solved";
  return /* @__PURE__ */ i.jsxs("g", { "data-district": n.id, "data-state": s, children: [
    s === "selected" && l ? /* @__PURE__ */ i.jsx("rect", { x: n.x - 8, y: n.y - 8, width: n.w + 16, height: n.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.25, stroke: m.highlight, strokeWidth: J * 2, strokeDasharray: "14 8" }) : null,
    /* @__PURE__ */ i.jsx(Jg, { id: n.id, box: n, solved: a }),
    s === "available" || s === "selected" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(jh, { x: n.smoke.x, y: n.smoke.y, scale: 0.9 }),
      /* @__PURE__ */ i.jsx(qg, { x: n.gate.x, y: n.gate.y })
    ] }) : null,
    s === "locked" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Ug, { x: n.x, y: n.y, width: n.w, height: n.h }),
      /* @__PURE__ */ i.jsx(Hg, { x: n.block.x, y: n.block.y })
    ] }) : null
  ] });
}
function Jg({ id: n, box: s, solved: l }) {
  const a = l ? { kind: "restored" } : { kind: "normal" }, d = s.y + s.h - 20;
  switch (n) {
    case "station-row":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 65, y: d, tint: 0, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 145, y: d, tint: 1, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 225, y: d, tint: 2, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(yt, { x: s.x + 24, y: d + 6, size: 0.7 }) : null
      ] });
    case "bridge":
      return /* @__PURE__ */ i.jsx(kh, { x: bh, y: Ba + Sh / 2 + 2, width: 170 });
    case "lab":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(xh, { x: s.x + 120, y: d, active: l }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 220, y: d, variant: "small", tint: 5, state: a, scale: 0.8 })
      ] });
    case "central":
      return /* @__PURE__ */ i.jsx("g", { children: [0, 1, 2].map(
        (f) => [0, 1, 2].map((p) => /* @__PURE__ */ i.jsx(Ue, { x: s.x + 70 + p * 82, y: s.y + 92 + f * 70, tint: (f * 3 + p) % 6, state: a, scale: 0.62 }, `${String(f)}-${String(p)}`))
      ) });
    case "market":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 80, y: d, variant: "shop", tint: 2, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 182, y: d, variant: "shop", tint: 4, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(yt, { x: s.x + 24, y: d - 60, size: 0.7 }) : null
      ] });
    case "old-town":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(xl, { x: s.x + 60, y: d + 4, lit: l }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 152, y: d, variant: "tall", tint: 3, state: a }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 232, y: d, variant: "tall", tint: 5, state: a })
      ] });
  }
}
const $r = 100;
function Nh(n, s, l) {
  return { x: n.x + l * $r, y: n.y + s * $r };
}
const ey = 32, kf = 30;
function Eh(n, s, l, a) {
  const d = Nh(n, l, a);
  return { q: s, row: l, col: a, x: d.x, y: d.y + ey };
}
function Ea(n, s, l, a, d) {
  const f = Nh(n, a, d);
  return { id: s, type: l, row: a, col: d, x: f.x, y: f.y + kf, lamp: { x: f.x, y: f.y + kf - 44 } };
}
const wa = { x: 100, y: 110 }, ty = [
  { id: "Z0", type: "Z", row: 0.5, col: 0.5 },
  { id: "Z1", type: "Z", row: 1.5, col: 1.5 },
  { id: "Z2", type: "Z", row: -0.5, col: 1.5 },
  { id: "Z3", type: "Z", row: 2.5, col: 0.5 },
  { id: "X0", type: "X", row: 0.5, col: 1.5 },
  { id: "X1", type: "X", row: 1.5, col: 0.5 },
  { id: "X2", type: "X", row: 0.5, col: -0.5 },
  { id: "X3", type: "X", row: 1.5, col: 2.5 }
], Ch = {
  kind: "rsc3",
  width: 400,
  height: 420,
  origin: wa,
  houses: [0, 1, 2].flatMap((n) => [0, 1, 2].map((s) => Eh(wa, n * 3 + s, n, s))),
  detectors: ty.map((n) => Ea(wa, n.id, n.type, n.row, n.col))
}, rl = { x: 100, y: 110 }, Th = {
  kind: "rep3",
  width: 400,
  height: 200,
  origin: rl,
  houses: [0, 1, 2].map((n) => Eh(rl, n, 0, n)),
  detectors: [Ea(rl, "Z0", "Z", 0, 0.5), Ea(rl, "Z1", "Z", 0, 1.5)]
};
function ny({ layout: n }) {
  const s = n.origin, l = n.kind === "rsc3" ? 3 : 1, a = 3, d = [];
  for (let f = 0; f < l; f++) d.push(`M${Pe(s.x - 60)} ${Pe(s.y + f * $r + 40)} H${Pe(s.x + (a - 1) * $r + 60)}`);
  if (l > 1) for (let f = 0; f < a; f++) d.push(`M${Pe(s.x + f * $r + 50)} ${Pe(s.y - 60)} V${Pe(s.y + (l - 1) * $r + 60)}`);
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Za, { width: n.width, height: n.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: n.width * 0.12, cy: n.height * 0.9, rx: n.width * 0.14, ry: n.height * 0.06 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: n.width * 0.9, cy: n.height * 0.1, rx: n.width * 0.12, ry: n.height * 0.05 }),
    d.map((f) => /* @__PURE__ */ i.jsx(Zg, { d: f, width: 10 }, f)),
    /* @__PURE__ */ i.jsx(yt, { x: n.width - 28, y: n.height - 16, size: 0.7 }),
    n.kind === "rsc3" ? /* @__PURE__ */ i.jsx(yt, { x: 30, y: 56, size: 0.6 }) : null
  ] });
}
function ry({ from: n, to: s }) {
  return /* @__PURE__ */ i.jsx("g", { children: s.map((l, a) => /* @__PURE__ */ i.jsx("line", { x1: n.x, y1: n.y, x2: l.x, y2: l.y - 40, stroke: m.highlight, strokeWidth: J * 1.6, strokeLinecap: "round", strokeDasharray: "10 7" }, a)) });
}
function sy({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n + 6, cy: s + 2, rx: 40, ry: 14, fill: m.highlight, fillOpacity: 0.35 });
}
function iy({ geometry: n }) {
  const s = n;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Za, { width: s.width, height: s.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(vh, { d: `M30 ${Pe(s.height - 30)} Q${Pe(s.width / 2)} ${Pe(s.height - 70)} ${Pe(s.width - 30)} ${Pe(s.height - 30)}`, width: 34 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 40, cy: 40, rx: 50, ry: 20 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: s.width - 40, cy: 40, rx: 50, ry: 20 }),
    Array.from({ length: s.lanes }, (l, a) => /* @__PURE__ */ i.jsx(ly, { y: s.laneY(a), x1: s.inX - 40, x2: s.outX + 40 }, a))
  ] });
}
function ly({ y: n, x1: s, x2: l }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: s, y: n - 12, width: l - s, height: 24, rx: 4, fill: m.wallStone, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("line", { x1: s + 6, y1: n - 16, x2: l - 6, y2: n - 16, stroke: m.roofSlate, strokeWidth: 3 }),
    Array.from({ length: Math.floor((l - s) / 30) }, (a, d) => s + 15 + d * 30).map((a) => /* @__PURE__ */ i.jsx("line", { x1: a, y1: n - 12, x2: a, y2: n + 12, stroke: m.ink, strokeWidth: 1, opacity: 0.4 }, a))
  ] });
}
function oy({ geometry: n }) {
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
function ay({ x: n, controlY: s, targetY: l, active: a = !1 }) {
  const d = a ? m.highlight : m.ink;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: s, x2: n, y2: l, stroke: d, strokeWidth: J * 2 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: 10, fill: d }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: l, r: 16, fill: m.paper, stroke: d, strokeWidth: J * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 10, y1: l, x2: n + 10, y2: l, stroke: d, strokeWidth: J * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: l - 10, x2: n, y2: l + 10, stroke: d, strokeWidth: J * 1.4 })
  ] });
}
function cy({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 18, fill: n ? m.alarmRing : m.wallButter, stroke: m.ink, strokeWidth: J }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 0 L0 -13", stroke: m.ink, strokeWidth: 3, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 3, fill: m.ink }),
    /* @__PURE__ */ i.jsx("text", { x: 0, y: 13, textAnchor: "middle", fontSize: 11, fontWeight: 800, fill: m.ink, fontFamily: Xr, style: { userSelect: "none" }, children: "S" })
  ] });
}
function vf({ letter: n, ...s }) {
  return /* @__PURE__ */ i.jsxs(Le, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 18, ry: 5, fill: m.shadow }),
    /* @__PURE__ */ i.jsx(Gn, { letter: n, x: 0, y: 0, scale: 0.5 })
  ] });
}
function uy({ filled: n, size: s = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: n ? "star is-filled" : "star", children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z", fill: n ? "var(--alarm)" : "var(--panel)", stroke: "var(--outline)", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function qa({ size: n = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: n, height: n, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function Ih({ size: n = 72, label: s }) {
  return /* @__PURE__ */ i.jsxs("svg", { width: n, height: n, viewBox: "0 0 512 512", role: "img", "aria-label": s ?? "Q11 mark: a Q-shaped protective ring with a small flame inside", focusable: "false", children: [
    /* @__PURE__ */ i.jsxs("g", { fill: "none", stroke: "#8fc1ff", strokeWidth: "56", strokeLinecap: "round", children: [
      /* @__PURE__ */ i.jsx("circle", { cx: "248", cy: "240", r: "170" }),
      /* @__PURE__ */ i.jsx("line", { x1: "334", y1: "326", x2: "424", y2: "416" })
    ] }),
    /* @__PURE__ */ i.jsx("path", { fill: "#ff5a3c", transform: "translate(158 125.2) scale(0.8)", d: "M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" })
  ] });
}
const Lh = {
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
  "city.locked.hint": "Districts open in order — {district} is next.",
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
  "city.aria.mission": "{n} {name} — {status}, {stars}",
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
  "result.type.predictionMiss.title": "Prediction missed",
  "result.type.predictionMiss.body": "A fire is still on the wire. Bare wires have no code and no alarms, so every leftover fire acts straight on the information.",
  "result.startBadge": "start",
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
  "why.trueEnd": "Crews where the fires really ended",
  "why.identical": "Your spray is exactly the smallest correction for these alarms.",
  "why.identicalWires": "Your crews sat exactly where the fires ended.",
  "why.equivalent": "Your spray and the alternative differ only by a harmless pattern: the code treats them as the same correction.",
  "why.sameAlarms": "Both fire patterns ring exactly the same alarms.",
  "why.cannotDecide": "Alarms alone cannot decide.",
  "why.compare": "Compare",
  "why.replayBoth": "Replay both",
  "why.noBlame": "Nobody could have known from the alarms. That is the lesson, not a mistake.",
  "why.verdict": "→ {verdict}",
  "why.comparison": "Why? Your spray compared with the other way",
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
  "summary.lead": "Every district is on record. In the surface-code districts a single fire is always caught; the lesson of Silent Failure is why real machines build bigger codes.",
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
  "a11y.cityBackToTitle": "Q11 Quantum City — back to title",
  "a11y.langPill": "Language: EN / JA, switch to {lang}",
  "a11y.alarmsAndCrews": "Alarms and crews",
  "a11y.tutorialSteps": "First call: three steps",
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
}, dy = {
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
  "city.locked.hint": "地区は順番に開きます — つぎは {district} です。",
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
  "city.aria.mission": "{n} {name} — {status}、{stars}",
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
  "result.type.predictionMiss.title": "予想がはずれた",
  "result.type.predictionMiss.body": "線の上に火が残っています。むき出しの線には符号も警報もないので、残った火はそのまま情報にはたらきます。",
  "result.startBadge": "はじめ",
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
  "why.trueEnd": "火が本当に着いた場所の隊",
  "why.identical": "きみの放水は、この警報に対するいちばん小さな訂正そのものです。",
  "why.identicalWires": "きみの隊は、火が着いた場所にぴったり立っていました。",
  "why.equivalent": "きみの放水ともう一つのやり方のちがいは、無害な模様だけです。符号はどちらも同じ訂正とみなします。",
  "why.sameAlarms": "どちらの火の模様も、まったく同じ警報を鳴らします。",
  "why.cannotDecide": "警報だけでは決められません。",
  "why.compare": "くらべる",
  "why.replayBoth": "両方をリプレイ",
  "why.noBlame": "警報からは、だれにもわかりませんでした。それが学びであって、まちがいではありません。",
  "why.verdict": "→ {verdict}",
  "why.comparison": "なぜ？ あなたの放水と、もう一つのやり方をくらべます",
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
  "summary.lead": "すべての地区の記録がそろいました。表面符号の地区では火 1 つならいつでも見つけられます。「静かな失敗」の学びが、本物の量子コンピュータがもっと大きな符号を作る理由です。",
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
  "a11y.cityBackToTitle": "Q11 量子の街 — タイトルにもどる",
  "a11y.langPill": "言語：EN / JA、{lang} に切りかえる",
  "a11y.alarmsAndCrews": "警報と隊",
  "a11y.tutorialSteps": "はじめての出動：3 つの手順",
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
}, fy = "en", jf = { en: "English", ja: "日本語" }, hy = { en: Lh, ja: dy }, py = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;
function my(n, s) {
  return s === void 0 ? n : n.replace(py, (l, a) => {
    const d = s[a];
    return d === void 0 ? l : String(d);
  });
}
function Ha(n, s, l) {
  const a = hy[n][s], d = a.length > 0 ? a : Lh[s];
  return my(d, l);
}
function gy(n) {
  return (s, l) => Ha(n, s, l);
}
function Ua(n, s, l, a) {
  const d = l === 1 ? `${s}.one` : `${s}.other`;
  return Ha(n, d, { n: l, ...a });
}
const Rh = F.createContext(fy);
function yy({ language: n, children: s }) {
  return F.useEffect(() => {
    try {
      document.documentElement.lang = n;
    } catch {
    }
  }, [n]), /* @__PURE__ */ i.jsx(Rh.Provider, { value: n, children: s });
}
function zt() {
  return F.useContext(Rh);
}
function Se() {
  const n = zt();
  return F.useCallback((s, l) => Ha(n, s, l), [n]);
}
const Sf = "このレッスンには警報所がないので、ここで警報が鳴ることはありません。", xy = {
  "first-alarm": {
    briefing: "出動指令室へようこそ。3 つの家 (house) が一列に並び、その間に 2 つの警報所 (alarm station) があります。放火犯のノイズ (Noise) は、ここでは赤い火 (X エラー) しかつけません。警報所は、見ている 2 つの家のうちちょうど 1 つが燃えているときに鳴ります。警報を読んで、赤い隊を 1 つ送りましょう。",
    training: ["家 0 に赤い火 (X)。警報所 Z0 は家 0 と 1 を見ていて、火がちょうど 1 つなので鳴ります。警報所 Z1 は家 1 と 2 を見ていて、火がないので静かなままです。"],
    debrief: {
      success: "警報所は両方とも鳴り、2 つが共有する家は 1 だけです。赤い隊は火に正面から向かい、赤い炎 2 つは打ち消し合います (X·X = I)。論理量子ビット (logical qubit) は安全です。",
      "logical-error": "すべての警報は静かですが、残った模様は完全な論理反転 (XXX) です。安全な家に送られた隊は自分で火をつけてしまうので、静かなだけでは安全の証明になりません。リプレイで、あなたの出動と警報を見比べましょう。",
      detectable: "少なくとも 1 つの警報所がまだ鳴っています。元の火がまだ燃えているか、隊が安全な家に新しい火をつけたかのどちらかです。最初の警報をリプレイしましょう。両方の警報所が鳴り、2 つが共有する家は 1 だけでした。"
    }
  },
  "red-forward-blue-backward": {
    briefing: "火はひとりでは広がりません。ゲート (gate) が運ぶのです。CNOT は赤い火 (X) を制御 (control) から標的 (target) へコピーし、青い火 (Z) を標的から制御へ逆向きにコピーします。訓練の実行を見てから、火がどこに着くかを予想して、そこへ隊を送りましょう。",
    training: ["赤は前へ：制御にある赤い火 (X) は標的にコピーされます。XI は XX になります。", "青は後ろへ：標的にある青い火 (Z) は制御にコピーされます。IZ は ZZ になります。"],
    debrief: {
      success: "赤が前へ、青が後ろへ同時に進んだので、XZ は YY になりました。両方の家に赤と青の火です。あなたの隊はすべての成分 (component) に合っていて、何も残りません。",
      "logical-error": "むき出しの線 (bare wires) には警報所がないので、見のがした火や、まちがえてつけた火は、データに直接はたらきます。各家の両方の色を確かめましょう。Y の火を消すには、赤と青の両方の成分が必要です。",
      detectable: Sf
    }
  },
  "color-switch": {
    briefing: "ハダマード (Hadamard) ゲートは色を入れかえます。赤は青に、青は赤に、ただし自分の線の上だけです。CNOT と組み合わせると、1 つの火が色を変え、自分をコピーし、また色を変えることがあります。回路 (circuit) をゲート 1 つずつたどりましょう。",
    training: ["色がえ：ハダマードは家 0 の赤い火 (X) を青い火 (Z) に変えます。XI は ZI になります。", "H で青が赤になり、つぎに CNOT で赤が前へコピーされます。ZI は XX になります。"],
    debrief: {
      success: "ZI は最初のハダマードで XI になり、CNOT で前へコピーされて XX になり、家 1 の最後のハダマードがそのコピーを青にして XZ になりました。道筋を全部たどれました。",
      "logical-error": "火のひとつが、あなたが出動させたのとちがう色、またはちがう家に着きました。回路をリプレイしましょう。H は自分の線の上だけで色を入れかえ、CNOT は赤を前へ、青を後ろへコピーします。",
      detectable: Sf
    }
  },
  "blind-dispatch": {
    briefing: "表面符号 (surface code) 地区へようこそ。家は 9 つ、警報所は 8 つです。赤い警報所 (Z チェック、ひし形) は赤い火に気づき、青い警報所 (X チェック、四角) は青い火に気づきます。今回は火がかくれています。警報を読んで、隊を 1 つ送りましょう。",
    training: [
      "家 0 の赤い火 (X) は、家 0・1・3・4 を見ている警報所 Z0 だけを鳴らします。家 3 だけの火でもまったく同じ警報所が鳴るので、家 3 に送った隊でも同じくらい良い直し方です。2 つの出動のちがいは安定化子 (stabilizer)（警報所 X2 自身の模様）だけで、符号はそれを気にしません。"
    ],
    debrief: {
      success: "警報所 Z0 と Z1 が両方鳴り、2 つが共有する家は 4 だけです。赤い隊 1 つで火は消え、論理量子ビットは安全です。",
      "logical-error": "警報は静かになりましたが、残った模様は符号化された量子ビットに論理演算子 (logical operator) としてはたらきます。かくれた火 1 つと隊 1 つでは、この地区でこれは起こりえません。いつ起こるかは「静かな失敗」で見られます。",
      detectable: "警報がまだ鳴っています。燃えていない家に赤い隊を送ると新しい火がつき、青い隊は赤い火をまったく消せません。隊の色を警報所の種類に合わせて、鳴っているすべての警報所が共有する家を見つけましょう。"
    }
  },
  "two-kinds-of-trouble": {
    briefing: "今回は火が 2 つで、色がちがうかもしれません。赤い警報所は赤い火だけに、青い警報所は青い火だけに気づくので、2 つの警報地図をべつべつに読みましょう。隊は好きな色で 2 つ使えますが、1 つの家に置ける隊は最大 1 つです。",
    training: [],
    debrief: {
      success: "赤い警報所 Z0 と Z2 が共有するのは家 1 だけです。青い警報所 X1 だけが鳴ったので、その境界のペアである家 6 と 7 を指しています。どちらに青い隊を送ってもうまくいきます。2 つの選択のちがいは安定化子だけだからです。2 つの色、2 つの火、両方消えました。",
      "logical-error": "すべての警報は静かですが、残った模様は論理演算子です。あなたの隊と火が打ち消し合うかわりに、いっしょになって地区をまたぐ鎖を作っています。鎖がどこを走るかはリプレイで見られます。",
      detectable: "まだ鳴っている警報所があります。赤い警報所は青い火をけっして見ないことを思い出しましょう。赤の警報と青の警報を、隊の色 1 つずつの、べつべつのパズルとして解きましょう。"
    }
  },
  "silent-failure": {
    briefing: "鳴っている警報は 1 つだけ、警報所 Z0 です。出動のルール (protocol) はシンプルです。すべての警報所を静かにする最小の隊を送ること。判断を下したら、本当は何が起きたのかを見てみましょう。",
    training: [],
    debrief: {
      success: "家 1 と 2 の火を両方消しました。正直な質問です。どうしてわかったのですか？警報は家 0 か 3 の火 1 つのときとまったく同じだったので、これはたまたま当たった推測です。ルールどおりなら家 0 か 3 に隊を 1 つ送ります。このミッションの星は最大 1 つです。警報だけでは勝てないからです。",
      "logical-error": "それが最適の判断でした。鳴ったのは Z0 だけで、警報 1 つのいちばん良い説明は火 1 つ、家 0 か 3 です（2 つのちがいは安定化子だけなので、どちらの隊でも同じ判断です）。しかしノイズは家 1 と 2 に火を 2 つつけました。あなたの隊とその 2 つの火は、地区の上側をまたぐ赤い鎖になります。家 0・1・2 の X、または家 3 を通る同等の鎖です。これは論理 X で、どの警報所も偶数個として見るため、見つけられません。この符号の距離 (distance) は 3 です。火 1 つならいつでも直せますが、火 2 つはどんな指令官でもだませます。家 1 と 2 に隊を送る理由になる警報の模様がなかったからです。だから本物の量子コンピュータは、もっと大きな符号を使うのです。",
      detectable: "警報所がまだ鳴っているので、最小の静かにする隊は送られませんでした。Z0 だけの警報に対するルールは、家 0 か 3 に赤い隊を 1 つ（同等の選択）です。警報をリプレイして見比べましょう。"
    }
  }
}, wy = {
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
      stillBurning: "A station still rings. A red crew on a safe house starts a red fire, and a blue crew on a red fire turns it into a Y fire that rings even more stations.",
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
}, ky = {
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
      stillBurning: "まだ警報所が鳴っています。安全な家に赤い隊を送ると赤い火がつき、赤い火に青い隊を送ると Y の火に変わって、もっと多くの警報所が鳴ります。",
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
    whyShort: "家 1 と 2 の火は Z0 だけを鳴らし、家 0 の火 1 つと見分けがつきません。だから警報だけでは決められないのです。距離 3 の符号が必ず直せるのは火 1 つまでで、火 2 つはどんな指令官でもだませます。",
    detailsTitle: "くわしく：距離 3、論理 X̄ = X0 X1 X2 の鎖、そして大きな符号が必要な理由"
  }
}, vy = ["first-alarm", "red-forward-blue-backward", "color-switch", "blind-dispatch", "two-kinds-of-trouble", "silent-failure"];
function jy(n) {
  return typeof n == "string" && vy.includes(n);
}
function _h(n) {
  if (!jy(n)) throw new Error(`unknown mission '${n}'`);
  return n;
}
const Sy = { en: wy, ja: ky };
function Ft(n, s) {
  return Sy[s][_h(n)];
}
function Ya(n) {
  return xy[_h(n)];
}
function by(n, s, l) {
  return s === "ja" ? Ya(n).briefing : l;
}
function Ny(n, s, l, a) {
  return l !== "ja" ? a : Ya(n).training[s] ?? a;
}
function Oh(n, s, l, a) {
  return l === "ja" ? Ya(n).debrief[s] : a;
}
function Mh(n, s) {
  switch (s) {
    case "restored":
      return n.reactions.restored;
    case "safe-pattern":
      return n.reactions.safePattern;
    case "still-burning":
      return n.reactions.stillBurning;
    case "logical-failure":
    case "prediction-miss":
      return n.reactions.logicalFailure;
  }
}
const Ey = 1500, Cy = 1300, Ty = 4e3, Iy = 120;
function Ly(n, s) {
  const l = {};
  for (const a of Ms) l[a] = Fa(a, n, s);
  return l;
}
function bf(n) {
  return typeof n == "string" && Ms.includes(n);
}
function Nf(n, s) {
  const l = Ms.indexOf(n), a = Ms.length;
  return Ms[(l + s + a) % a] ?? n;
}
const sl = (n, s) => `${String(Math.round(n / s * 1e4) / 100)}%`;
function Ry(n) {
  return {
    left: sl(n.x + n.w / 2, zr),
    top: sl(n.y + n.h / 2, Wr),
    width: sl(n.w, zr),
    height: sl(n.h, Wr)
  };
}
function _y(n) {
  const s = Math.min(1, Math.max(0, n));
  return s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2;
}
function Oy(n, s, l) {
  return { x: n.x + (s.x - n.x) * l, y: n.y + (s.y - n.y) * l };
}
function Ef(n, s, l, a) {
  if (n !== null && typeof n.getTotalLength == "function" && typeof n.getPointAtLength == "function") {
    const d = n.getTotalLength();
    if (Number.isFinite(d) && d > 0) {
      const f = n.getPointAtLength(a * d);
      return { x: f.x, y: f.y };
    }
  }
  return Oy(s, l, a);
}
function Cf() {
  if (typeof document > "u") return !1;
  if (document.querySelector('[data-reduced-motion="true"]') !== null) return !0;
  try {
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
  } catch {
    return !1;
  }
}
const My = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function Ca(n) {
  return My[n] ?? "city.badgeName.firstAlarm";
}
const il = ["#e8432f", "#2f7fe6", "#9b5de5", "#2bb673", "#f2b200", "#3fb6f5"];
function Tf(n) {
  return il[(n % il.length + il.length) % il.length] ?? "#2f7fe6";
}
const If = 1024;
function Py({ state: n, dispatch: s, storageNote: l, recentlySolved: a, onSettings: d, onTitle: f, onCelebrated: p, reducedMotion: g, initialSelected: x = null }) {
  const k = Se(), b = zt(), S = Ly(n.progress, n.settings.freeRoam), C = g ?? (n.settings.reducedMotion ? !0 : void 0), I = F.useCallback(() => C ?? Cf(), [C]), [_] = F.useState(() => bf(a) && S[a] === "solved" ? a : null), R = (B) => bf(B) && S[B] !== "locked" ? B : null, [L, W] = F.useState(() => R(x)), [$, D] = F.useState(null), [te, K] = F.useState(null), [Z, re] = F.useState(() => _ !== null && !(C ?? Cf())), [ue, Ne] = F.useState(() => {
    if (_ === null) return null;
    const B = Or(_), xe = Dt.findIndex((Ce) => Ce.id === _);
    return { kind: "badge", text: k("city.badgeToast", { badge: k(Ca(B.missionId)) }), colour: Tf(xe) };
  }), [$e, Be] = F.useState(null), U = F.useRef(null), Y = F.useRef(null), ke = F.useRef(null), oe = F.useRef(null), le = F.useRef(null), ge = F.useRef(null), [X, ne] = F.useState(!1), q = F.useRef(_ === null ? "none" : "pending"), j = F.useRef(p);
  F.useEffect(() => {
    j.current = p;
  }, [p]), F.useEffect(() => {
    if (ue === null) return;
    const B = globalThis.setTimeout(() => Ne(null), Ty);
    return () => globalThis.clearTimeout(B);
  }, [ue]), F.useEffect(() => {
    if (!Z) return;
    const B = globalThis.setTimeout(() => re(!1), Cy);
    return () => globalThis.clearTimeout(B);
  }, [Z]);
  const O = Z || ue !== null && ue.kind === "badge";
  F.useEffect(() => {
    q.current !== "pending" || O || (q.current = "done", j.current?.());
  }, [O]), F.useEffect(
    () => () => {
      q.current === "pending" && (q.current = "done", j.current?.());
    },
    []
  );
  const de = () => {
    Z && re(!1), Ne((B) => B !== null && B.kind === "badge" ? null : B);
  }, ce = R(x), [pe, me] = F.useState(ce);
  ce !== pe && (me(ce), ce !== null && (ne(!1), W(ce))), F.useEffect(() => {
    if (ce === null) return;
    const B = globalThis.setTimeout(() => {
      const xe = U.current?.querySelector(`button[data-district="${ce}"]`);
      xe != null && typeof xe.scrollIntoView == "function" && xe.scrollIntoView({ block: "nearest" });
    }, 0);
    return () => globalThis.clearTimeout(B);
  }, [ce]), F.useEffect(() => {
    if (L === null) return;
    const B = ke.current;
    B !== null && X && (typeof window < "u" && window.innerWidth < If && typeof B.scrollIntoView == "function" && B.scrollIntoView({ block: "nearest" }), Y.current?.focus({ preventScroll: !0 }));
  }, [L, X]);
  const ve = L !== null && $ === null;
  F.useEffect(() => {
    const B = ke.current;
    if (!ve || B === null || typeof window > "u") {
      Be(null);
      return;
    }
    const xe = () => Be(window.innerWidth < If ? Math.ceil(B.getBoundingClientRect().height) : null);
    xe();
    const Ce = globalThis.ResizeObserver, Ge = typeof Ce == "function" ? new Ce(xe) : null;
    return Ge?.observe(B), window.addEventListener("resize", xe), () => {
      Ge?.disconnect(), window.removeEventListener("resize", xe);
    };
  }, [ve, L]), F.useEffect(() => {
    if ($ === null) return;
    const B = Or($), xe = B.missionId;
    let Ce = null, Ge = !1;
    const Wt = () => {
      Ge || (Ge = !0, Ce !== null && globalThis.cancelAnimationFrame(Ce), Ce = null, le.current = null, s({ type: "SELECT_MISSION", id: xe }), D(null), K(null));
    };
    le.current = Wt;
    const Dn = oe.current;
    let Kt = null, dn = Ef(Dn, wf, B.entry, 0), Zr = 1;
    const Br = (qr) => {
      if (Ge) return;
      Kt === null && (Kt = qr);
      const Hs = qr - Kt, or = Math.min(1, Hs / Ey), fn = Ef(Dn, wf, B.entry, _y(or)), ar = fn.x - dn.x;
      ar > 0.01 ? Zr = 1 : ar < -0.01 && (Zr = -1), dn = fn, K({ x: fn.x, y: fn.y, facing: Zr, wheelFrame: Math.floor(Hs / Iy) % 2 === 0 ? 0 : 1 }), or < 1 ? Ce = globalThis.requestAnimationFrame(Br) : Wt();
    };
    return Ce = globalThis.requestAnimationFrame(Br), () => {
      Ce !== null && globalThis.cancelAnimationFrame(Ce), le.current === Wt && (le.current = null);
    };
  }, [$, s]);
  const ye = F.useCallback(() => {
    le.current?.();
  }, []), Te = (B) => {
    if ($ !== null) return;
    if (de(), S[B] === "locked") {
      const Ce = wg(n.progress), Ge = Ce === null ? "" : Ft(Ce.missionId, b).districtName;
      Ne({ kind: "locked", text: k("city.locked.hint", { district: Ge }), colour: null });
      return;
    }
    ge.current = B, ne(!0), W(B);
  }, tt = () => {
    W(null);
    const B = ge.current;
    B !== null && U.current?.querySelector(`button[data-district="${B}"]`)?.focus();
  }, nr = () => {
    if (L === null || $ !== null) return;
    const B = Or(L);
    if (I()) {
      s({ type: "SELECT_MISSION", id: B.missionId });
      return;
    }
    D(L);
  }, Xs = (B) => {
    B.key === "Escape" && ($ !== null ? (B.preventDefault(), ye()) : L !== null && (B.preventDefault(), tt())), Z && de();
  }, rr = (B) => {
    O && de();
  }, sr = {};
  for (const B of Dt) {
    const xe = S[B.id];
    sr[B.id] = xe === "available" && L === B.id && $ === null ? "selected" : xe;
  }
  const Zs = Wa(n.progress), Bs = Aa(), ir = Dt.filter((B) => S[B.id] === "solved"), wt = L === null ? null : Or(L), un = $ === null ? null : Or($), Ke = _ === null ? null : Or(_), Qt = (B) => k(B === "locked" ? "city.status.locked" : B === "solved" ? "city.status.solved" : "city.status.available"), lr = (B) => {
    const xe = an(B.missionId), Ce = n.progress[B.missionId];
    return Ce === void 0 ? Ua(b, "mission.notPlayed", xe.maxStars, { max: xe.maxStars }) : k("mission.starsOf", { stars: Ce.stars, max: xe.maxStars });
  }, qs = $e === null ? void 0 : { "--city-sheet-h": `${String($e)}px` };
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-city${ve ? " has-panel" : ""}${$ !== null ? " is-travelling" : ""}`, ref: U, onKeyDown: Xs, "aria-busy": $ !== null, style: qs, children: [
    /* @__PURE__ */ i.jsxs("header", { className: "city-hud", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "city-brand-group", children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", className: "city-brand", onClick: f, "aria-label": k("a11y.cityBackToTitle"), "data-testid": "city-title", children: [
          /* @__PURE__ */ i.jsx(Ih, { size: 40 }),
          /* @__PURE__ */ i.jsx("span", { className: "city-brand-name", children: k("app.name") })
        ] }),
        /* @__PURE__ */ i.jsx("h1", { className: "city-brand-title", tabIndex: -1, "data-focus-target": !0, children: k("city.title") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-hud-stats", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "city-stat", "data-testid": "city-stars", children: [
          /* @__PURE__ */ i.jsx(Ph, { filled: !0, size: 20 }),
          /* @__PURE__ */ i.jsx("span", { children: k("mission.starsOf", { stars: Zs, max: Bs }) })
        ] }),
        /* @__PURE__ */ i.jsxs("ul", { className: "city-badges", "aria-label": k("city.badges"), "data-testid": "city-badges", children: [
          ir.length === 0 ? /* @__PURE__ */ i.jsxs("li", { className: "city-badges-empty", children: [
            k("city.badges"),
            ": 0 / ",
            Dt.length
          ] }) : null,
          ir.map((B) => {
            const xe = Dt.findIndex((Ge) => Ge.id === B.id), Ce = k(Ca(B.missionId));
            return /* @__PURE__ */ i.jsxs("li", { className: "city-badge", "data-badge": B.id, children: [
              /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 26, height: 31, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(fl, { x: 0, y: 0, colour: Tf(xe) }) }),
              /* @__PURE__ */ i.jsx("span", { className: "city-badge-name", children: Ce })
            ] }, B.id);
          })
        ] }),
        n.settings.freeRoam ? /* @__PURE__ */ i.jsxs("span", { className: "city-free-roam", "data-testid": "free-roam", children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-pill", children: k("city.hud.freeRoam") }),
          /* @__PURE__ */ i.jsx("span", { className: "city-free-roam-desc", children: k("city.hud.freeRoamOn") })
        ] }) : null
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "city-storage", "data-testid": "storage-note", children: l }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-icon-btn", onClick: d, "aria-label": k("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(qa, { size: 24 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "city-toast-anchor", children: /* @__PURE__ */ i.jsx("div", { className: "city-toast-region", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": "city-toast-region", children: ue !== null ? /* @__PURE__ */ i.jsxs("div", { className: `city-toast is-${ue.kind}`, "data-testid": `toast-${ue.kind}`, children: [
      ue.kind === "badge" ? /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 28, height: 33, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(fl, { x: 0, y: 0, colour: ue.colour ?? m.crewZ }) }) : null,
      /* @__PURE__ */ i.jsx("span", { children: ue.text })
    ] }) : null }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-body", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "city-map-wrap", "aria-label": k("city.aria.map"), "data-testid": "city-map", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "city-map", onPointerDown: rr, style: { aspectRatio: `${String(zr)} / ${String(Wr)}` }, children: [
          /* @__PURE__ */ i.jsxs("svg", { className: "city-svg", viewBox: `0 0 ${String(zr)} ${String(Wr)}`, preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ i.jsx(Kg, { states: sr, showSelection: !1 }),
            wt !== null && $ === null ? /* @__PURE__ */ i.jsx("rect", { className: "city-select-ring", x: wt.x - 8, y: wt.y - 8, width: wt.w + 16, height: wt.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.22, stroke: m.highlight, strokeWidth: 5, strokeDasharray: "14 8" }) : null,
            Z && Ke !== null ? /* @__PURE__ */ i.jsxs("g", { className: "city-restore", "data-testid": "restore-fx", children: [
              /* @__PURE__ */ i.jsx("rect", { className: "city-restore-ring", x: Ke.x - 6, y: Ke.y - 6, width: Ke.w + 12, height: Ke.h + 12, rx: 16, fill: "none", stroke: m.success, strokeWidth: 5 }),
              /* @__PURE__ */ i.jsx("g", { className: "city-restore-smoke", children: /* @__PURE__ */ i.jsx(jh, { x: Ke.smoke.x, y: Ke.smoke.y, scale: 0.9 }) }),
              [0.2, 0.5, 0.8].map((B, xe) => /* @__PURE__ */ i.jsx("g", { className: "city-restore-spark", style: { animationDelay: `${String(xe * 120)}ms` }, children: /* @__PURE__ */ i.jsx(Dy, { x: Ke.x + Ke.w * B, y: Ke.y + Ke.h * (0.3 + 0.2 * (xe % 2)) }) }, B))
            ] }) : null,
            un !== null ? /* @__PURE__ */ i.jsx("path", { ref: oe, d: Vg[un.id], fill: "none", stroke: "none", "data-testid": "travel-road" }) : null,
            te !== null ? /* @__PURE__ */ i.jsx("g", { className: "city-truck", "data-testid": "travel-truck", children: /* @__PURE__ */ i.jsx(gh, { x: te.x, y: te.y, scale: 0.85, facing: te.facing, lights: te.wheelFrame === 0, wheelFrame: te.wheelFrame }) }) : null
          ] }),
          Dt.map((B) => {
            const xe = S[B.id], Ce = an(B.missionId), Ge = Ft(B.missionId, b), Wt = k("city.aria.mission", { n: Ce.index, name: Ge.districtName, status: Qt(xe), stars: lr(B) });
            return /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `city-district is-${xe}${L === B.id ? " is-selected" : ""}`,
                style: Ry(B),
                "data-testid": `mission-${String(Ce.index)}`,
                "data-district": B.id,
                "data-status": xe,
                "aria-label": Wt,
                "aria-pressed": L === B.id,
                "aria-disabled": $ !== null ? !0 : void 0,
                onClick: () => Te(B.id),
                onKeyDown: (Dn) => $y(Dn, B.id, U),
                children: /* @__PURE__ */ i.jsxs("span", { className: "city-district-name", "aria-hidden": "true", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-n", children: Ce.index }),
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-text", children: Ge.districtName })
                ] })
              },
              B.id
            );
          })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "city-hint", children: k("city.subtitle") })
      ] }),
      /* @__PURE__ */ i.jsx("aside", { className: `city-panel${ve ? " is-open" : ""}`, ref: ke, "aria-labelledby": "city-panel-heading", "data-testid": "city-panel", hidden: !ve, children: wt !== null ? /* @__PURE__ */ i.jsx(Ay, { box: wt, status: S[wt.id], state: n, headingRef: Y, starsText: lr(wt), statusLabel: Qt(S[wt.id]), onGo: nr, onClose: tt, travelling: $ !== null }) : null })
    ] }),
    un !== null ? /* @__PURE__ */ i.jsx("div", { className: "city-travel", onPointerDown: ye, "data-testid": "travel-overlay", children: /* @__PURE__ */ i.jsxs("div", { className: "city-travel-card", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ i.jsx("span", { className: "city-travel-text", children: k("city.truck.travel", { district: Ft(un.missionId, b).districtName }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn", onClick: ye, "data-testid": "travel-skip", autoFocus: !0, children: k("city.truck.skip") })
    ] }) }) : null
  ] });
}
function $y(n, s, l) {
  let a = null;
  n.key === "ArrowRight" || n.key === "ArrowDown" ? a = Nf(s, 1) : n.key === "ArrowLeft" || n.key === "ArrowUp" ? a = Nf(s, -1) : n.key === "Home" ? a = Dt[0]?.id ?? null : n.key === "End" && (a = Dt[Dt.length - 1]?.id ?? null), a !== null && (n.preventDefault(), l.current?.querySelector(`button[data-district="${a}"]`)?.focus());
}
function Ay({ box: n, status: s, state: l, headingRef: a, starsText: d, statusLabel: f, travelling: p, onGo: g, onClose: x }) {
  const k = Se(), b = zt(), S = an(n.missionId), C = Ft(n.missionId, b), I = l.progress[n.missionId], _ = s === "solved";
  return /* @__PURE__ */ i.jsxs("div", { className: "city-panel-inner", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-head", children: [
      /* @__PURE__ */ i.jsx("h2", { id: "city-panel-heading", className: "city-panel-title", ref: a, tabIndex: -1, children: C.districtName }),
      /* @__PURE__ */ i.jsxs("p", { className: "city-panel-sub", children: [
        /* @__PURE__ */ i.jsxs("span", { children: [
          k("mission.label", { n: S.index }),
          " · ",
          C.kidTitle
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: `city-status is-${s}`, "data-testid": "panel-status", children: f })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("dl", { className: "city-panel-facts", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact", children: [
        /* @__PURE__ */ i.jsx("dt", { children: k("city.select.goal") }),
        /* @__PURE__ */ i.jsx("dd", { children: C.goal })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: k("city.select.best") }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-stars", role: "img", "aria-label": d, children: Array.from({ length: S.maxStars }, (R, L) => /* @__PURE__ */ i.jsx(Ph, { filled: (I?.stars ?? 0) > L, size: 22 }, L)) }),
          /* @__PURE__ */ i.jsx("span", { className: "city-stars-text", children: d })
        ] })
      ] }),
      _ ? /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: k("city.badges") }),
        /* @__PURE__ */ i.jsx("dd", { children: k(Ca(n.missionId)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-primary", onClick: g, "data-testid": "dispatch-go", "aria-disabled": p ? !0 : void 0, children: k(_ ? "city.status.replay" : "city.dispatch") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-ghost", onClick: x, "data-testid": "panel-close", children: k("common.close") })
    ] })
  ] });
}
function Ph({ filled: n, size: s }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: `city-star${n ? " is-filled" : ""}`, children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z", fill: n ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: 1.6, strokeLinejoin: "round" }) });
}
function Dy({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("g", { transform: `translate(${String(n)} ${String(s)})`, children: /* @__PURE__ */ i.jsx("path", { d: "M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z", fill: m.windowLit, stroke: m.ink, strokeWidth: 2, strokeLinejoin: "round" }) });
}
var Fy = qf();
const Ta = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" }, zy = { X: "palette.putsOut.X", Z: "palette.putsOut.Z", Y: "palette.putsOut.Y" }, Va = {
  optimal: "result.quality.optimal",
  valid: "result.quality.valid",
  unlucky: "result.quality.unlucky",
  lucky: "result.quality.lucky",
  off: "result.quality.off"
};
function wl(n, s) {
  return n === "success" ? "result.outcome.success" : n === "detectable" ? "result.outcome.detectable" : s ? "result.outcome.logicalError" : "result.outcome.propagationMiss";
}
function Qa(n, s, l, a) {
  const d = s.score.completed;
  return a ? { nextLabel: n("result.city"), primary: d ? "next" : "retry" } : d ? { nextLabel: n(l ? "result.summary" : "result.next"), primary: "next" } : { nextLabel: n("result.city"), primary: "retry" };
}
function Wy(n) {
  return n.stars === 3 ? "result.heading.flawless" : n.stars === 2 ? "result.heading.firesOut" : n.quality === "unlucky" ? "result.heading.unlucky" : n.quality === "lucky" ? "result.heading.lucky" : n.stars === 1 ? "result.heading.close" : n.outcome === "detectable" && n.crewsUsed === 0 ? "result.heading.stoodDown" : "result.heading.off";
}
const Xy = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function Ia(n) {
  return Xy[n] ?? "city.badges";
}
const Zy = {
  rep3: "mission.code.rep3",
  rsc3: "mission.code.rsc3",
  trivial2: "mission.code.trivial2",
  trivial3: "mission.code.trivial3"
}, By = {
  placed: "debrief.stepTitle.placed",
  gate: "debrief.stepTitle.gate",
  alarms: "debrief.stepTitle.alarms",
  dispatch: "debrief.stepTitle.dispatch",
  residual: "debrief.stepTitle.residual",
  verdict: "debrief.stepTitle.verdict"
};
function Lf(n, s) {
  const l = By[s.startsWith("gate-") ? "gate" : s];
  return l === void 0 ? s : n(l);
}
function Ka(n, s, l) {
  const a = Oe(s);
  if (a.checks.length === 0) return n("alarms.summary.none");
  if (l === null) return n("alarms.summary.notRead");
  const d = a.checks.filter((f, p) => (l[p] ?? 0) === 1).map((f) => f.id);
  return d.length === 0 ? n("alarms.summary.allQuiet", { n: a.checks.length }) : n("alarms.summary.ringing", { ringing: d.length, total: a.checks.length, list: d.join(", ") });
}
function qy(n, s) {
  const l = Xe(s), a = Vt(l).map((d) => n("fire.onHouse", { letter: Yt(l, d), q: d }));
  return a.length === 0 ? n("fire.none") : a.length === 1 ? a[0] ?? "" : `${a.slice(0, -1).join(", ")} ${n("common.and")} ${a[a.length - 1] ?? ""}`;
}
function Hy(n, s, l) {
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
function Uy(n, s, l, a) {
  const d = l?.index ?? 0, f = l !== null && Oe(l.code).checks.length > 0, p = a === null ? "" : n(wl(a.verdict, f));
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
      return l === null ? n("a11y.screen.challenge.plain") : l.kind === "propagation" ? n("a11y.screen.challenge.predict", { n: d, crews: l.budget === 1 ? n("a11y.crews.one") : n("a11y.crews.other", { n: l.budget }) }) : n("a11y.screen.challenge.alarms", { n: d, summary: Ka(n, l.code, l.syndrome) });
    case "dispatch":
      return a === null || !s.dispatchDone ? n("a11y.screen.dispatch", { n: d }) : n("a11y.screen.dispatch.verdict", { n: d, verdict: p });
    case "debrief":
      return a === null ? n("a11y.screen.debrief", { n: d }) : n("a11y.screen.debrief.verdict", { n: d, verdict: p });
    case "result":
      return a === null ? n("a11y.screen.result", { n: d }) : n("a11y.screen.result.stars", { n: d, stars: a.score.stars, max: a.score.maxStars });
  }
}
function _s({ letter: n, size: s = 28, ghost: l = !1, residual: a = !1 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-flame icon-${n}`, width: s, height: s, viewBox: "-34 -100 68 104", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Gn, { letter: n, x: 0, y: 0, ghost: l, residual: a }) });
}
function er({ letter: n, size: s = 28 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-helmet icon-${n}`, width: s, height: s * 0.8, viewBox: "-30 -44 60 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Xa, { letter: n, x: 0, y: 0 }) });
}
function Dr({ type: n, ringing: s = !1, size: l = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-detector icon-detector-${n}${s ? " is-ringing" : ""}`, width: l, height: l, viewBox: "-30 -30 60 60", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Fg, { type: n, ringing: s, x: 0, y: 0 }) });
}
function $h({ size: n = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: "icon icon-water", width: n, height: n, viewBox: "-22 -44 44 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx($g, { x: 0, y: 0 }) });
}
function Fs({ codeId: n, syndrome: s, id: l, compact: a = !1, hint: d }) {
  const f = Se(), p = Oe(n);
  return p.checks.length === 0 ? /* @__PURE__ */ i.jsxs("section", { className: "panel-section", "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted", id: l, children: f("alarms.noneBareWires") })
  ] }) : /* @__PURE__ */ i.jsxs("section", { className: `panel-section alarms${a ? " is-compact" : ""}`, "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "sr-only", id: l, "aria-live": "polite", children: Ka(f, n, s) }),
    /* @__PURE__ */ i.jsx("ul", { className: `alarm-list${p.checks.length > 4 ? " is-grid" : ""}${a ? " is-compact" : ""}`, "aria-label": f("alarms.stations"), children: p.checks.map((g, x) => {
      const k = s !== null && (s[x] ?? 0) === 1;
      return /* @__PURE__ */ i.jsxs("li", { className: k ? "alarm is-ringing" : "alarm", "data-check": g.id, "data-ringing": k ? "1" : "0", children: [
        /* @__PURE__ */ i.jsx(Dr, { type: g.type, ringing: k, size: 26 }),
        /* @__PURE__ */ i.jsxs("span", { className: "alarm-main", children: [
          /* @__PURE__ */ i.jsx("span", { className: "alarm-id", children: g.id }),
          /* @__PURE__ */ i.jsx("span", { className: "alarm-blocks", children: f("alarms.houses", { list: g.qubits.join(", ") }) })
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "alarm-state", children: f(s === null ? "alarms.notRead" : k ? "alarms.ringing" : "alarms.quiet") })
      ] }, g.id);
    }) }),
    d !== void 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted small alarm-hint", children: d }) : null
  ] });
}
const Rf = { X: "1", Z: "2", Y: "3" }, Yy = ["X", "Z", "Y"];
function Vy({ allowed: n, selected: s, onSelect: l, callout: a }) {
  const d = Se(), f = Yy.filter((g) => n.includes(g)), p = (g, x) => {
    const k = f.indexOf(x);
    if (k < 0 || f.length === 0) return;
    let b;
    if (g.key === "ArrowDown" || g.key === "ArrowRight" ? b = f[(k + 1) % f.length] : g.key === "ArrowUp" || g.key === "ArrowLeft" ? b = f[(k - 1 + f.length) % f.length] : g.key === "Home" ? b = f[0] : g.key === "End" && (b = f[f.length - 1]), b === void 0) return;
    g.preventDefault(), l(b), g.currentTarget.closest('[role="radiogroup"]')?.querySelector(`[data-letter="${b}"]`)?.focus();
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section palette-section", "aria-labelledby": "palette-h", children: [
    /* @__PURE__ */ i.jsx("h2", { id: "palette-h", className: "panel-title", children: d("palette.title") }),
    a,
    /* @__PURE__ */ i.jsx("div", { className: "palette", role: "radiogroup", "aria-label": d("palette.group"), children: f.map((g) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": s === g,
        tabIndex: s === g ? 0 : -1,
        className: `palette-btn palette-${g}${s === g ? " is-selected" : ""}`,
        onClick: () => l(g),
        onKeyDown: (x) => p(x, g),
        "data-letter": g,
        "data-testid": `palette-${g}`,
        children: [
          /* @__PURE__ */ i.jsx(er, { letter: g, size: 44 }),
          /* @__PURE__ */ i.jsxs("span", { className: "palette-text", children: [
            /* @__PURE__ */ i.jsxs("span", { className: "palette-name", children: [
              d("palette.crew", { letter: g }),
              /* @__PURE__ */ i.jsxs("span", { className: "sr-only", children: [
                ", ",
                d(Ta[g]),
                ","
              ] })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "palette-hint", children: d(zy[g]) })
          ] }),
          /* @__PURE__ */ i.jsx("kbd", { className: "palette-key", "aria-hidden": "true", children: Rf[g] }),
          /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: d("palette.key", { key: Rf[g] }) })
        ]
      },
      g
    )) })
  ] });
}
function zs({ count: n, max: s = 3, size: l = 22, label: a }) {
  const d = Se();
  return /* @__PURE__ */ i.jsx("span", { className: "stars", role: "img", "aria-label": a ?? d("mission.starsOf", { stars: n, max: s }), children: Array.from({ length: Math.max(1, s) }, (f, p) => /* @__PURE__ */ i.jsx(uy, { filled: p < n, size: l }, p)) });
}
function cn({ title: n, subtitle: s, onMissions: l, onSettings: a, settingsLabel: d, onTitle: f }) {
  const p = Se();
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
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: a, "aria-label": d ?? p("title.settings"), "data-testid": "topbar-settings", children: /* @__PURE__ */ i.jsx(qa, {}) })
    ] })
  ] });
}
function Qy({ language: n, onChange: s, testId: l = "lang-toggle" }) {
  const a = Se(), d = n === "en" ? "ja" : "en";
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: "lang-pill",
      onClick: () => s(d),
      "aria-label": a("a11y.langPill", { lang: jf[d] }),
      title: a("title.language", { lang: jf[n] }),
      "data-testid": l,
      "data-language": n,
      children: [
        /* @__PURE__ */ i.jsx("span", { className: n === "en" ? "lang-opt is-on" : "lang-opt", children: "EN" }),
        /* @__PURE__ */ i.jsx("span", { className: "lang-sep", "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ i.jsx("span", { className: n === "ja" ? "lang-opt is-on" : "lang-opt", children: "JA" })
      ]
    }
  );
}
function Ga({ summary: n, children: s, testId: l, className: a }) {
  const d = Se();
  return /* @__PURE__ */ i.jsxs("details", { className: `details-fold${a === void 0 ? "" : ` ${a}`}`, "data-testid": l, children: [
    /* @__PURE__ */ i.jsx("summary", { children: n ?? d("details.show") }),
    /* @__PURE__ */ i.jsx("div", { className: "details-body", children: s })
  ] });
}
function Ky({ text: n, onDismiss: s }) {
  const l = Se();
  return /* @__PURE__ */ i.jsxs("div", { className: "notice", role: "status", "data-testid": "notice", children: [
    /* @__PURE__ */ i.jsx("span", { children: n }),
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: s, "aria-label": l("a11y.dismissNotice"), children: l("notice.dismiss") })
  ] });
}
const Gy = "[data-inert-root]", Jy = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Ah({ title: n, children: s, confirmLabel: l, cancelLabel: a, onConfirm: d, onCancel: f, danger: p = !1 }) {
  const g = Se(), x = F.useRef(null), k = F.useRef(null), b = F.useRef(f);
  F.useEffect(() => {
    b.current = f;
  }, [f]), F.useLayoutEffect(() => {
    const C = document.activeElement instanceof HTMLElement ? document.activeElement : null, I = Array.from(document.querySelectorAll(Gy)), _ = I.map((R) => R.hasAttribute("inert"));
    return I.forEach((R) => R.setAttribute("inert", "")), x.current?.focus(), () => {
      I.forEach((R, L) => {
        (_[L] ?? !1) || R.removeAttribute("inert");
      }), C !== null && C.isConnected && C.focus();
    };
  }, []), F.useEffect(() => {
    const C = (I) => {
      if (I.key === "Escape") {
        I.preventDefault(), b.current();
        return;
      }
      if (I.key !== "Tab") return;
      const _ = k.current;
      if (_ === null) return;
      const R = Array.from(_.querySelectorAll(Jy));
      if (R.length === 0) return;
      const L = R[0], W = R[R.length - 1];
      if (L === void 0 || W === void 0) return;
      const $ = document.activeElement;
      $ instanceof Node && _.contains($) ? I.shiftKey && $ === L ? (I.preventDefault(), W.focus()) : !I.shiftKey && $ === W && (I.preventDefault(), L.focus()) : (I.preventDefault(), (I.shiftKey ? W : L).focus());
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, []);
  const S = /* @__PURE__ */ i.jsx("div", { className: "dialog-backdrop", role: "presentation", children: /* @__PURE__ */ i.jsxs("div", { className: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "dialog-h", "aria-describedby": "dialog-d", ref: k, children: [
    /* @__PURE__ */ i.jsx("h2", { id: "dialog-h", className: "dialog-title", children: n }),
    /* @__PURE__ */ i.jsx("div", { id: "dialog-d", className: "dialog-body", children: s }),
    /* @__PURE__ */ i.jsxs("div", { className: "dialog-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", ref: x, onClick: f, children: a ?? g("common.cancel") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: p ? "btn btn-danger" : "btn btn-primary", onClick: d, children: l })
    ] })
  ] }) });
  return Fy.createPortal(S, document.body);
}
function Dh({ allowed: n, alarms: s = !1, water: l = !1 }) {
  const a = Se();
  return /* @__PURE__ */ i.jsxs("ul", { className: "legend", "aria-label": a("legend.title"), children: [
    n.map((d) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(_s, { letter: d, size: 24 }),
      " ",
      a("legend.fire", { crew: a(Ta[d]) })
    ] }, `f-${d}`)),
    n.map((d) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(er, { letter: d, size: 24 }),
      " ",
      a("legend.crew", { crew: a(Ta[d]) })
    ] }, `c-${d}`)),
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(Dr, { type: "Z", size: 24 }),
        " ",
        a("legend.alarmZ")
      ] }),
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(Dr, { type: "X", size: 24 }),
        " ",
        a("legend.alarmX")
      ] })
    ] }) : null,
    l ? /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx($h, { size: 24 }),
      " ",
      a("legend.water")
    ] }) : null
  ] });
}
const hl = {
  small: { w: 64, h: 74, side: 12 },
  tall: { w: 56, h: 106, side: 12 },
  shop: { w: 84, h: 62, side: 12 }
};
function e1(n, s) {
  return n === "bridge" || n === "lab" ? "small" : n === "houses-row" ? s === 1 ? "tall" : "small" : ["tall", "small", "tall", "small", "shop", "small", "small", "shop", "small"][s] ?? "small";
}
function t1(n, s) {
  return n === "rep3" ? "houses-row" : n === "rsc3" ? "grid" : s.some((l) => l.kind === "H" || l.kind === "S") ? "lab" : "bridge";
}
const n1 = 0.85, _f = 0.8, Of = 0.55, r1 = 0.5, Mf = 0.6, s1 = 0.6, Pf = 64;
function i1(n) {
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
function l1(n, s) {
  const l = Oe(s).n;
  if (n === "grid" || n === "houses-row") {
    const f = n === "grid" ? Ch : Th, p = f.houses.slice(0, l).map((g) => ({ q: g.q, x: g.x, y: g.y }));
    return {
      kind: n,
      codeId: s,
      width: f.width + Pf,
      height: f.height,
      n: l,
      houses: p,
      houseScale: n1,
      detectors: f.detectors,
      detectorScale: _f,
      truck: { from: { x: -80, y: f.height - 6 }, stop: { x: 62, y: f.height - 6 }, facing: 1, scale: Mf },
      crewScale: n === "grid" ? r1 : Of,
      // The tower stands in the reserved strip, on the ground line of the bottom row, clear of houses and detectors.
      tower: { x: f.width + Pf / 2, y: f.height - 24, scale: 0.5 },
      lanes: null
    };
  }
  const a = i1(l), d = Array.from({ length: l }, (f, p) => ({ q: p, x: a.outX, y: a.laneY(p) + 26 }));
  return {
    kind: n,
    codeId: s,
    width: a.width,
    height: a.height,
    n: l,
    houses: d,
    houseScale: s1,
    detectors: [],
    detectorScale: _f,
    truck: { from: { x: -90, y: 56 }, stop: { x: 96, y: 56 }, facing: 1, scale: Mf },
    crewScale: Of,
    tower: null,
    lanes: a
  };
}
function Ja(n, s) {
  const l = n.houses[s];
  if (l === void 0) throw new Error(`scene: no house ${String(s)}`);
  return l;
}
function Fh(n, s, l) {
  const a = Ja(n, s), d = hl[l], f = n.houseScale;
  return {
    x: a.x - (d.w / 2 + 10) * f,
    y: a.y - (d.h + 12) * f,
    w: (d.w + d.side + 20) * f,
    h: (d.h + 14) * f + 4
  };
}
function La(n, s) {
  const l = Ja(n, s);
  return n.lanes !== null ? { x: l.x - 44, y: l.y + 4, facing: 1 } : { x: l.x - 20, y: l.y + 22, facing: 1 };
}
function ka(n, s, l) {
  const a = Ja(n, s), d = hl[l], f = n.houseScale, p = l === "shop" ? -10 * f : 0;
  return { x: a.x + p + 2, y: a.y + (-d.h + 14 - 22) * f };
}
function o1(n, s, l) {
  if (l === 0) return (n.inX + n.outX) / 2;
  if (s < 0) return (n.inX + n.stepX(0, l)) / 2;
  const a = n.stepX(Math.min(s, l - 1), l), d = s + 1 < l ? n.stepX(s + 1, l) : n.outX;
  return (a + d) / 2;
}
function $f(n, s, l) {
  return n + (s - n) * l;
}
function zh(n, s, l) {
  return { x: $f(n.x, s.x, l), y: $f(n.y, s.y, l) };
}
function a1(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function c1(n) {
  const s = a1(n);
  return 1 - (1 - s) * (1 - s);
}
function Pn(n, s) {
  if (n == null || n.length === 0) return "I";
  const l = Xe(n);
  return s < l.n ? Yt(l, s) : "I";
}
function Wh(n) {
  return n === "I" ? null : n;
}
function u1(n, s) {
  if (n.fog) return { kind: "fog" };
  const l = n.atOutput ? Pn(n.fires, s) : "I", a = Pn(n.crews, s);
  if (n.residual !== null) {
    const d = Pn(n.residual, s), f = n.result;
    return d !== "I" ? f === "safe-pattern" ? { kind: "ghost", letter: d } : f === "logical-failure" || f === "prediction-miss" ? { kind: "fire", letter: d } : { kind: "residual", letter: d } : l !== "I" || a !== "I" ? f === null ? { kind: "out" } : { kind: "restored" } : { kind: "normal" };
  }
  return l !== "I" ? { kind: "fire", letter: l } : { kind: "normal" };
}
function Xh(n) {
  const s = n.x.some(Boolean), l = n.z.some(Boolean);
  return s && l ? "Y" : s ? "X" : l ? "Z" : null;
}
const d1 = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function Mr(n, s) {
  return n(d1[s]);
}
function f1(n) {
  return F.useCallback(
    (s, l) => {
      const a = s.key === "ArrowLeft" ? [-1, 0] : s.key === "ArrowRight" ? [1, 0] : s.key === "ArrowUp" ? [0, -1] : s.key === "ArrowDown" ? [0, 1] : null;
      if (a === null) return;
      s.preventDefault();
      const d = n[l];
      if (d === void 0) return;
      let f = -1, p = 1 / 0;
      if (n.forEach((x, k) => {
        if (k === l) return;
        const b = x.x - d.x, S = x.y - d.y, C = b * (a[0] ?? 0) + S * (a[1] ?? 0), I = Math.abs(b * (a[1] ?? 0)) + Math.abs(S * (a[0] ?? 0));
        if (C <= 1) return;
        const _ = C + I * 2.5;
        _ < p && (p = _, f = k);
      }), f < 0) return;
      s.currentTarget.closest("[data-scene]")?.querySelector(`[data-q="${String(f)}"]`)?.focus();
    },
    [n]
  );
}
function Ws(n) {
  const s = Se(), l = n.sceneKind ?? t1(n.codeId, n.circuit), a = F.useMemo(() => l1(l, n.codeId), [l, n.codeId]), d = Oe(n.codeId), f = n.fog ?? !1, p = n.frame, g = n.circuit.length, x = n.gateCursor ?? g, k = x >= g, b = F.useMemo(() => Array.from({ length: a.n }, (U, Y) => n.houseVariants?.[Y] ?? e1(l, Y)), [a.n, l, n.houseVariants]), S = n.outcome?.result ?? null, C = F.useMemo(
    () => Array.from(
      { length: a.n },
      (U, Y) => p !== void 0 ? p.houses[Y] ?? { kind: "normal" } : u1({ fog: f, fires: n.fires, crews: n.crews, residual: n.residual, result: S, atOutput: k }, Y)
    ),
    [a.n, p, f, n.fires, n.crews, n.residual, S, k]
  ), I = p !== void 0 ? p.syndrome : n.syndrome, _ = (U) => I !== null && (I[U] ?? 0) === 1, R = n.highlightedCheck ?? null, L = R === null ? [] : d.checks[R]?.qubits ?? [], W = F.useMemo(() => a.houses.map((U) => ({ x: U.x, y: U.y - 30 })), [a]), $ = f1(W), D = n.outcome !== void 0 && n.outcome.result === "logical-failure" ? Xh(n.outcome.logicalFlip) : null, te = n.outcome?.beacon === !0 && a.tower !== null, K = n.outcome?.result === "logical-failure" ? n.outcome.patternQubits : [], Z = p?.outcome ?? S, re = Z === "safe-pattern", ue = l === "grid" ? Ch : Th, Ne = (U) => n.placements?.[U] ?? null, $e = (U) => p !== void 0 ? null : Ne(U) ?? Wh(Pn(n.crews, U)), Be = n.ariaLabel ?? (a.lanes !== null ? s("a11y.boardCircuit") : s("a11y.boardGrid", { code: d.name }));
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: ["scene", `scene-${l}`, `scene-code-${n.codeId}`, n.className ?? ""].filter(Boolean).join(" "),
      role: "group",
      "aria-label": Be,
      "aria-describedby": n.ariaDescribedBy,
      "data-board": !0,
      "data-scene": !0,
      "data-scene-kind": l,
      children: [
        re ? /* @__PURE__ */ i.jsx("div", { className: "scene-header", "data-testid": "scene-header", children: /* @__PURE__ */ i.jsx("span", { className: "scene-badge scene-badge-safe", "data-testid": "badge-safe", children: s("result.outcome.success") }) }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: "scene-board", style: { aspectRatio: `${String(a.width)} / ${String(a.height)}` }, children: [
          /* @__PURE__ */ i.jsxs("svg", { className: "scene-svg", viewBox: `0 0 ${String(a.width)} ${String(a.height)}`, "aria-hidden": "true", focusable: "false", children: [
            a.lanes !== null ? l === "lab" ? /* @__PURE__ */ i.jsx(oy, { geometry: a.lanes }) : /* @__PURE__ */ i.jsx(iy, { geometry: a.lanes }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsx("rect", { className: "tower-strip", x: ue.width - 24, y: 0, width: a.width - ue.width + 24, height: a.height, rx: 18, fill: m.sand }),
              /* @__PURE__ */ i.jsx(ny, { layout: ue })
            ] }),
            a.lanes !== null ? /* @__PURE__ */ i.jsx(p1, { geo: a, circuit: n.circuit, cursor: x, fires: p !== void 0 ? null : n.fires, inputFires: n.inputFires ?? null, startFaded: Z !== null, startLabel: s("result.startBadge") }) : null,
            L.map((U) => {
              const Y = a.houses[U];
              return Y === void 0 ? null : /* @__PURE__ */ i.jsx("g", { className: "watch-tint", "data-watch-q": U, children: /* @__PURE__ */ i.jsx(sy, { x: Y.x, y: Y.y }) }, `tint-${String(U)}`);
            }),
            p?.truck !== null && p?.truck !== void 0 ? /* @__PURE__ */ i.jsx(g1, { geo: a, progress: p.truck.progress, lights: p.truck.lights, wheelFrame: p.truck.wheelFrame }) : null,
            K.length > 0 ? /* @__PURE__ */ i.jsx(Af, { geo: a, qubits: K, variants: b, part: "connector" }) : null,
            a.houses.map((U, Y) => /* @__PURE__ */ i.jsx("g", { className: `house house-${C[Y]?.kind ?? "normal"}`, "data-house": Y, "data-house-state": C[Y]?.kind ?? "normal", children: /* @__PURE__ */ i.jsx(Ue, { x: U.x, y: U.y, tint: Y, variant: b[Y] ?? "small", state: C[Y] ?? { kind: "normal" }, scale: a.houseScale }) }, `house-${String(Y)}`)),
            K.length > 0 ? /* @__PURE__ */ i.jsx(Af, { geo: a, qubits: K, variants: b, part: "outline" }) : null,
            a.houses.map((U, Y) => {
              const ke = $e(Y);
              if (ke === null) return null;
              const oe = La(a, Y), le = Ne(Y) !== null;
              return /* @__PURE__ */ i.jsxs("g", { className: le ? "crew-marker crew-planned" : "crew-marker", "data-crew-q": Y, "data-crew": ke, children: [
                /* @__PURE__ */ i.jsx(mh, { letter: ke, pose: "idle", facing: oe.facing, x: oe.x, y: oe.y, scale: a.crewScale }),
                le ? /* @__PURE__ */ i.jsx(Xa, { letter: ke, x: U.x - (hl[b[Y] ?? "small"].w / 2 - 4) * a.houseScale, y: U.y - (hl[b[Y] ?? "small"].h + 2) * a.houseScale, scale: 0.45 }) : null
              ] }, `crew-${String(Y)}`);
            }),
            p !== void 0 ? /* @__PURE__ */ i.jsx(y1, { geo: a, frame: p, variants: b }) : null,
            R !== null && a.detectors[R] !== void 0 ? /* @__PURE__ */ i.jsx("g", { className: "watch-lines", children: /* @__PURE__ */ i.jsx(ry, { from: a.detectors[R].lamp, to: L.map((U) => a.houses[U]).filter((U) => U !== void 0) }) }) : null,
            a.detectors.map((U, Y) => /* @__PURE__ */ i.jsx("g", { className: `detector${_(Y) ? " is-ringing" : ""}${R === Y ? " is-highlighted" : ""}`, "data-detector": U.id, "data-ringing": _(Y) ? "true" : "false", children: /* @__PURE__ */ i.jsx(Ls, { type: U.type, x: U.x, y: U.y, ringing: _(Y), highlighted: R === Y, scale: a.detectorScale }) }, U.id)),
            te && a.tower !== null ? /* @__PURE__ */ i.jsx("g", { className: "memory-tower", "data-anomaly": D ?? "none", children: /* @__PURE__ */ i.jsx(xl, { x: a.tower.x, y: a.tower.y, scale: a.tower.scale, anomaly: D, lit: D === null }) }) : null,
            n.children
          ] }),
          a.houses.map((U, Y) => {
            const ke = Fh(a, Y, b[Y] ?? "small"), oe = {
              left: `${String(ke.x / a.width * 100)}%`,
              top: `${String(ke.y / a.height * 100)}%`,
              width: `${String(ke.w / a.width * 100)}%`,
              height: `${String(ke.h / a.height * 100)}%`
            };
            return /* @__PURE__ */ i.jsx("div", { className: "house-slot", style: oe, children: /* @__PURE__ */ i.jsx(
              h1,
              {
                q: Y,
                state: C[Y] ?? { kind: "normal" },
                fog: f,
                crew: $e(Y),
                interactive: n.interactive,
                selected: n.selected,
                budgetReached: n.budgetReached ?? !1,
                watchers: f ? [] : d.checks.filter((le) => le.qubits.includes(Y)).map((le) => le.id),
                onToggle: n.onToggle,
                onKeyDown: $,
                tapHint: n.tapHint,
                t: s
              }
            ) }, `slot-${String(Y)}`);
          }),
          a.detectors.map((U, Y) => {
            const ke = d.checks[Y];
            if (ke === void 0) return null;
            const oe = 16 * a.detectorScale + 10, le = {
              left: `${String((U.lamp.x - oe) / a.width * 100)}%`,
              top: `${String((U.lamp.y - oe) / a.height * 100)}%`,
              width: `${String(2 * oe / a.width * 100)}%`,
              height: `${String(2 * oe / a.height * 100)}%`
            }, ge = ke.qubits.join(", "), X = s(_(Y) ? "a11y.stationRinging" : "a11y.stationQuiet", { station: ke.id, list: ge });
            if (n.onToggleDetector === void 0)
              return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: le, children: /* @__PURE__ */ i.jsx("div", { className: "detector-hit", role: "img", "aria-label": X, "data-detector-id": U.id }) }, `det-${U.id}`);
            const ne = n.onToggleDetector;
            return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: le, children: /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `detector-hit${R === Y ? " is-pressed" : ""}`,
                "aria-label": X,
                "aria-pressed": R === Y,
                "data-testid": `detector-${U.id}`,
                "data-detector-id": U.id,
                onClick: () => ne(R === Y ? null : Y)
              }
            ) }, `det-${U.id}`);
          })
        ] })
      ]
    }
  );
}
function h1({ q: n, state: s, fog: l, crew: a, interactive: d, selected: f, budgetReached: p, watchers: g, onToggle: x, onKeyDown: k, tapHint: b, t: S }) {
  const C = [l ? S("a11y.fogHouse", { q: n }) : S("a11y.house", { q: n })];
  if (g.length > 0 && C.push(S("a11y.watchedBy", { list: g.join(", ") })), !l)
    switch (s.kind) {
      case "fire":
        C.push(S("a11y.fire", { crew: Mr(S, s.letter) }));
        break;
      case "residual":
        C.push(S("a11y.residualFire", { crew: Mr(S, s.letter) }));
        break;
      case "ghost":
        C.push(S("a11y.residualFire", { crew: Mr(S, s.letter) }));
        break;
      case "out":
      case "restored":
        C.push(S("a11y.fireOut"));
        break;
    }
  a !== null && C.push(S("a11y.crew", { crew: Mr(S, a) })), d && b !== void 0 ? C.push(b) : d && (a === null ? C.push(p ? S("a11y.noCrewsLeft") : f === void 0 ? S("a11y.pressToSendAny") : S("a11y.pressToSend", { crew: Mr(S, f) })) : a === f ? C.push(S("a11y.pressToRecall")) : C.push(f === void 0 ? S("a11y.pressToSwitchAny") : S("a11y.pressToSwitch", { crew: Mr(S, f) })));
  const I = C.join(", "), _ = ["block", `block-${s.kind}`, a !== null ? "has-crew" : "", p && a === null ? "is-budget-reached" : ""].filter(Boolean).join(" ");
  return d ? /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: _,
      "aria-label": I,
      "aria-pressed": a !== null,
      "data-q": n,
      "data-testid": `block-${String(n)}`,
      onClick: () => x?.(n),
      onKeyDown: (R) => k(R, n),
      children: [
        f !== void 0 && a === null && !p && b === void 0 ? /* @__PURE__ */ i.jsx("span", { className: "crew-preview", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -46 60 50", width: "30", height: "25", focusable: "false", children: /* @__PURE__ */ i.jsx(Xa, { letter: f, x: 0, y: 0 }) }) }) : null,
        a !== null ? /* @__PURE__ */ i.jsx("span", { className: "plan-tag", "aria-hidden": "true", children: S("plan.title") }) : null
      ]
    }
  ) : /* @__PURE__ */ i.jsx("div", { className: _, role: "img", "aria-label": I, "data-q": n, "data-testid": `block-${String(n)}` });
}
function p1({ geo: n, circuit: s, cursor: l, fires: a, inputFires: d, startFaded: f, startLabel: p }) {
  const g = n.lanes;
  if (g === null) return null;
  const x = s.length, k = l >= x, b = o1(g, l, x), S = (C, I) => Wh(Pn(C, I));
  return /* @__PURE__ */ i.jsxs("g", { className: "lanes", children: [
    s.map((C, I) => /* @__PURE__ */ i.jsx("g", { className: I === l ? "gate is-active" : I < l ? "gate is-done" : "gate", opacity: I <= l ? 1 : 0.6, children: /* @__PURE__ */ i.jsx(m1, { gate: C, x: g.stepX(I, x), laneY: g.laneY, active: I === l }) }, I)),
    k ? null : /* @__PURE__ */ i.jsx("line", { className: "time-cursor", x1: b, y1: 30, x2: b, y2: g.height - 40, stroke: m.alarm, strokeWidth: 2.5, strokeDasharray: "8 6" }),
    Array.from({ length: g.lanes }, (C, I) => {
      const _ = S(d, I);
      return _ === null ? null : /* @__PURE__ */ i.jsxs("g", { className: f ? "lane-start is-faded" : "lane-start", "data-start-q": I, "data-faded": f ? "true" : "false", opacity: f ? 0.45 : 1, children: [
        /* @__PURE__ */ i.jsx(vf, { letter: _, x: g.inX, y: g.laneY(I) - 6 }),
        f ? /* @__PURE__ */ i.jsx("text", { className: "lane-start-badge", x: g.inX, y: g.laneY(I) + 22, textAnchor: "middle", fontSize: 11, fontWeight: 800, fill: m.inkSoft, fontFamily: Xr, style: { userSelect: "none" }, children: p }) : null
      ] }, `in-${String(I)}`);
    }),
    k ? null : Array.from({ length: g.lanes }, (C, I) => {
      const _ = S(a, I);
      return _ === null ? null : /* @__PURE__ */ i.jsx("g", { className: "token", children: /* @__PURE__ */ i.jsx(vf, { letter: _, x: b, y: g.laneY(I) - 6 }) }, `tok-${String(I)}`);
    })
  ] });
}
function m1({ gate: n, x: s, laneY: l, active: a }) {
  switch (n.kind) {
    case "H":
      return /* @__PURE__ */ i.jsx(wh, { x: s, y: l(n.q) + 24, scale: 0.9, active: a });
    case "S":
      return /* @__PURE__ */ i.jsx(cy, { x: s, y: l(n.q), active: a });
    case "CNOT":
      return /* @__PURE__ */ i.jsx(ay, { x: s, controlY: l(n.c), targetY: l(n.t), active: a });
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
function Af({ geo: n, qubits: s, variants: l, part: a }) {
  const d = s.map((p) => Fh(n, p, l[p] ?? "small"));
  if (d.length === 0) return null;
  const f = d.map((p) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 }));
  return a === "connector" ? f.length > 1 ? /* @__PURE__ */ i.jsx("polyline", { className: "logical-chain-connector", points: f.map((p) => `${String(p.x)},${String(p.y)}`).join(" "), fill: "none", stroke: m.crewY, strokeWidth: J * 3, strokeDasharray: "12 8", strokeLinejoin: "round", strokeLinecap: "round", opacity: 0.85 }) : null : /* @__PURE__ */ i.jsx("g", { className: "logical-chain", "data-chain": s.join(","), children: d.map((p, g) => /* @__PURE__ */ i.jsx("rect", { x: p.x - 2, y: p.y - 2, width: p.w + 4, height: p.h, rx: 12, fill: "none", stroke: m.crewY, strokeWidth: J * 1.8, strokeDasharray: "10 6" }, g)) });
}
function g1({ geo: n, progress: s, lights: l, wheelFrame: a }) {
  const d = zh(n.truck.from, n.truck.stop, c1(s));
  return /* @__PURE__ */ i.jsx("g", { className: "truck", "data-progress": s.toFixed(2), children: /* @__PURE__ */ i.jsx(gh, { x: d.x, y: d.y, facing: n.truck.facing, lights: l, wheelFrame: a, scale: n.truck.scale }) });
}
function y1({ geo: n, frame: s, variants: l }) {
  const a = { x: n.truck.stop.x + 40 * n.truck.scale, y: n.truck.stop.y };
  return /* @__PURE__ */ i.jsxs("g", { className: "spray-actors", children: [
    s.streams.map((d) => {
      const f = La(n, d.q), p = Ag(f.x, f.y, n.crewScale, f.facing);
      return /* @__PURE__ */ i.jsx("g", { className: "stream", "data-stream-q": d.q, "data-progress": d.progress.toFixed(2), children: /* @__PURE__ */ i.jsx(Mg, { from: p, to: ka(n, d.q, l[d.q] ?? "small"), progress: d.progress }) }, `stream-${String(d.q)}`);
    }),
    s.splashes.map((d) => /* @__PURE__ */ i.jsx("g", { className: "splash", "data-splash-q": d.q, children: /* @__PURE__ */ i.jsx(Pg, { x: ka(n, d.q, l[d.q] ?? "small").x, y: ka(n, d.q, l[d.q] ?? "small").y + 10, spread: d.spread, scale: 0.8 }) }, `splash-${String(d.q)}`)),
    s.crews.map((d) => {
      const f = La(n, d.q), p = zh(a, f, d.progress), g = d.progress < 1 ? f.x >= a.x ? 1 : -1 : f.facing;
      return /* @__PURE__ */ i.jsx("g", { className: `firefighter pose-${d.pose}`, "data-crew-q": d.q, "data-crew": d.crew, "data-pose": d.pose, children: /* @__PURE__ */ i.jsx(mh, { letter: d.crew, pose: d.pose, facing: g, x: p.x, y: p.y, scale: n.crewScale }) }, `ff-${String(d.q)}`);
    })
  ] });
}
function ec(n, s, l = !1) {
  if (l ? n.t >= s : n.t > s) return;
  if (n.dur <= 0) return 1;
  const a = (s - n.t) / n.dur;
  return a >= 1 ? 1 : a < 0 ? 0 : a;
}
function ll(n) {
  return n === "I" ? { kind: "normal" } : { kind: "fire", letter: n };
}
const x1 = 0.4;
function w1(n, s, l) {
  const a = l.strict ?? !1, d = Array.from({ length: l.n }, (D, te) => l.preState(te)), f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), x = [], k = [];
  let b = null, S = l.initialSyndrome ?? null, C = null, I = !1, _ = !1, R = -1;
  const L = /* @__PURE__ */ new Set(), W = Math.floor(s / 120) % 2 === 0 ? 0 : 1, $ = Math.floor(s / 150) % 2 === 0 ? "run1" : "run2";
  return n.events.forEach((D, te) => {
    const K = ec(D, s, a);
    if (K !== void 0)
      switch (R = te, D.type) {
        case "trucks-arrive":
          b = { progress: K, lights: K < 1, wheelFrame: K < 1 ? W : 0 };
          break;
        case "crew-run":
          g.set(D.q, { q: D.q, crew: D.crew, progress: K, pose: K < 1 ? $ : "idle" });
          break;
        case "spray-start":
          g.set(D.q, { q: D.q, crew: D.crew, progress: 1, pose: "spray" }), x.push({ q: D.q, progress: K }), f.add(D.q), d[D.q] = ll(D.before);
          break;
        case "impact": {
          f.add(D.q);
          const Z = x.findIndex((re) => re.q === D.q);
          K < 1 ? (Z >= 0 && (x[Z] = { q: D.q, progress: 1 }), k.push({ q: D.q, spread: K })) : (Z >= 0 && x.splice(Z, 1), L.add(D.q)), K < x1 ? d[D.q] = ll(D.before) : D.effect === "extinguished" ? d[D.q] = K < 1 ? { kind: "out" } : { kind: "restored" } : d[D.q] = ll(D.after), D.after !== "I" ? p.set(D.q, D.after) : p.delete(D.q);
          break;
        }
        case "reveal-remaining":
          I = !0;
          for (let Z = 0; Z < l.n; Z++) {
            if (f.has(Z)) continue;
            const re = l.preState(Z);
            d[Z] = re.kind === "fog" ? { kind: "normal" } : re;
          }
          D.qs.forEach((Z) => {
            const re = l.residualAt(Z);
            d[Z] = ll(re), re !== "I" && p.set(Z, re);
          });
          break;
        case "alarms":
          S = D.syndrome;
          break;
        case "outcome":
          C = D.result, p.forEach((Z, re) => {
            Z !== "I" && (D.result === "still-burning" ? d[re] = { kind: "residual", letter: Z } : D.result === "safe-pattern" ? d[re] = { kind: "ghost", letter: Z } : d[re] = { kind: "fire", letter: Z });
          }), D.result === "restored" && f.forEach((Z) => d[Z] = { kind: "restored" });
          break;
        case "done":
          _ = !0;
          break;
      }
  }), L.forEach((D) => {
    const te = g.get(D);
    te !== void 0 && g.set(D, { ...te, pose: "idle" });
  }), {
    houses: d,
    syndrome: S,
    truck: b,
    crews: [...g.values()].sort((D, te) => D.q - te.q),
    streams: x,
    splashes: k,
    outcome: C,
    revealed: I,
    done: _,
    residualQubits: [...p.keys()].sort((D, te) => D - te),
    currentEvent: R
  };
}
const k1 = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function Ps(n, s) {
  return s === "I" ? "" : n(k1[s]);
}
const Zh = {
  restored: "result.type.restored.title",
  "safe-pattern": "result.type.safePattern.title",
  "still-burning": "result.type.stillBurning.title",
  "logical-failure": "result.type.logicalFailure.title",
  "prediction-miss": "result.type.predictionMiss.title"
}, v1 = {
  restored: "result.type.restored.body",
  "safe-pattern": "result.type.safePattern.body",
  "still-burning": "result.type.stillBurning.body",
  "logical-failure": "result.type.logicalFailure.body",
  "prediction-miss": "result.type.predictionMiss.body"
};
function j1(n, s) {
  return s.effect === "extinguished" ? n("spray.extinguished", { q: s.q }) : s.effect === "ignited" ? n("spray.ignited", { q: s.q, after: Ps(n, s.after) }) : n("spray.changed", { q: s.q, before: Ps(n, s.before), after: Ps(n, s.after) });
}
function Bh(n, s, l, a) {
  switch (s.type) {
    case "trucks-arrive":
      return n("spray.trucksArrive", { district: a.district });
    case "crew-run":
      return n("spray.crewRun", { crew: Ps(n, s.crew), q: s.q });
    case "spray-start":
      return n("spray.sprayStart", { crew: Ps(n, s.crew), q: s.q });
    case "impact":
      return `${n("spray.splash")} ${j1(n, s)}`;
    case "reveal-remaining":
      return s.qs.length > 0 ? n("spray.revealRemaining") : null;
    case "alarms":
      return a.hasChecks ? n("spray.alarms") : null;
    case "outcome":
      return n(Zh[s.result]);
    case "done":
      return n("spray.done");
  }
}
function qh(n, s, l, a, d = !1) {
  let f = "";
  for (const p of s.events) {
    const g = ec(p, l, d);
    if (g === void 0) break;
    const x = Bh(n, p, g, a);
    x !== null && (f = x);
  }
  return f;
}
const S1 = /* @__PURE__ */ new Set(["trucks-arrive", "impact", "outcome"]);
function Hh(n, s, l, a, d = !1) {
  let f = "";
  for (const p of s.events) {
    const g = ec(p, l, d);
    if (g === void 0) break;
    if (!S1.has(p.type)) continue;
    const x = Bh(n, p, g, a);
    x !== null && (f = x);
  }
  return f;
}
function b1(n, s) {
  if (s !== void 0) return s;
  try {
    return an(n).kind;
  } catch {
    return "dispatch";
  }
}
function N1(n, s, l) {
  const a = Xe(n.fires), d = Xe(n.residual), f = (p) => {
    if (l === "dispatch") return { kind: "fog" };
    const g = Pn(n.fires, p);
    return g === "I" ? { kind: "normal" } : { kind: "fire", letter: g };
  };
  return {
    n: Math.max(s, a.n, d.n),
    preState: f,
    residualAt: (p) => Pn(n.residual, p),
    initialSyndrome: n.syndromeOfFires.length > 0 ? n.syndromeOfFires : null
  };
}
function E1(n, s) {
  if (s.outcome === null) return;
  const l = tr(n.missionId)?.hasBeacon ?? !1;
  return {
    result: s.outcome,
    logicalFlip: n.logicalFlip,
    patternQubits: Vt(Xe(n.residual)),
    beacon: l || s.outcome === "logical-failure"
  };
}
function C1(n) {
  const s = n.alternative;
  return { ...n, crews: s.crews, residual: s.residual, syndromeOfResidual: s.syndromeOfResidual, verdict: s.verdict, logicalFlip: s.logicalFlip };
}
function Uh(n) {
  const s = Xe(n.debrief.fires).n, l = b1(n.debrief.missionId, n.missionKind), a = F.useMemo(() => N1(n.debrief, s, l), [n.debrief, s, l]), d = F.useMemo(() => w1(n.timeline, n.time, { ...a, strict: n.strict ?? !1 }), [n.timeline, n.time, a, n.strict]), f = E1(n.debrief, d), p = n.codeId === "trivial2" || n.codeId === "trivial3";
  return /* @__PURE__ */ i.jsx(
    Ws,
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
function Df() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function Ff(n) {
  if (typeof requestAnimationFrame == "function") {
    const l = requestAnimationFrame(n);
    return () => cancelAnimationFrame(l);
  }
  const s = setTimeout(n, 16);
  return () => clearTimeout(s);
}
function Yh(n, s) {
  const l = n.durationMs, a = Math.max(1, n.events.length), [d, f] = F.useState(0), [p, g] = F.useState(0), [x, k] = F.useState(0), b = F.useRef(!1);
  F.useEffect(() => {
    if (s) return;
    b.current = !1;
    const W = Df();
    let $ = null, D = !0;
    const te = () => {
      if (!D || b.current) return;
      const K = Df() - W;
      if (K >= l) {
        f(l);
        return;
      }
      f(K), $ = Ff(te);
    };
    return $ = Ff(te), () => {
      D = !1, $?.();
    };
  }, [l, s, x]);
  const S = F.useCallback(() => {
    b.current = !0, f(l), g(a - 1);
  }, [l, a]), C = F.useCallback(() => {
    b.current = !1, f(0), g(0), k((W) => W + 1);
  }, []), I = F.useCallback(() => g((W) => Math.min(a - 1, W + 1)), [a]), _ = F.useCallback(() => g((W) => Math.max(0, W - 1)), []);
  if (s) {
    const W = Math.min(p, a - 1);
    return { time: W + 1, step: W, steps: a, finished: W >= a - 1, skip: S, restart: C, next: I, prev: _ };
  }
  const R = Math.min(d, l);
  let L = -1;
  return n.events.forEach((W, $) => {
    W.t <= R && (L = $);
  }), { time: R, step: L, steps: a, finished: R >= l, skip: S, restart: C, next: I, prev: _ };
}
function T1(n) {
  const s = Se(), l = Yh(n.timeline, n.reducedMotion), a = F.useRef(!1), d = n.onDone;
  F.useEffect(() => {
    l.finished && !a.current && (a.current = !0, d());
  }, [l.finished, d]);
  const f = Oe(n.codeId).checks.length > 0, p = { district: n.missionCopy.districtName, hasChecks: f }, g = qh(s, n.timeline, l.time, p, n.reducedMotion), x = Hh(s, n.timeline, l.time, p, n.reducedMotion), k = s("motion.stepper.frame", { n: l.step + 1, total: l.steps });
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
          Uh,
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
        /* @__PURE__ */ i.jsx("p", { className: "spray-caption", "data-testid": "spray-caption", children: g }),
        /* @__PURE__ */ i.jsx("p", { className: "spray-sr", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": "spray-announcer", children: x }),
        n.reducedMotion ? /* @__PURE__ */ i.jsxs("div", { className: "spray-stepper", role: "group", "aria-label": s("motion.stepper.title"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "spray-prev", onClick: l.prev, disabled: l.step <= 0, children: s("motion.stepper.prev") }),
          /* @__PURE__ */ i.jsx("span", { className: "spray-step-label", "data-testid": "spray-step", children: k }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "spray-next", onClick: l.next, disabled: l.finished, children: l.step >= l.steps - 2 ? s("motion.stepper.last") : s("motion.stepper.next") })
        ] }) : null,
        n.compact === !0 ? null : /* @__PURE__ */ i.jsxs("p", { className: "spray-rules", children: [
          s("spray.quantumRules"),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "spray-rules-note", children: s("spray.oneShot") })
        ] })
      ]
    }
  );
}
function I1(n) {
  const s = Se(), l = F.useId(), { result: a, debrief: d } = n, f = Xe(d.residual), p = Vt(f), g = a === "logical-failure" ? Xh(d.logicalFlip) : null, x = n.maxStars === 1 ? s("result.starsOf.one", { stars: n.stars }) : s("result.starsOf.other", { stars: n.stars, max: n.maxStars }), k = g === "Y" ? s("result.beacon.logicalXZ") : g === "X" ? s("result.beacon.logicalX") : g === "Z" ? s("result.beacon.logicalZ") : null, b = tr(d.missionId)?.hasBeacon ?? !1, S = b && (a === "restored" || a === "safe-pattern"), C = Pn(d.residual, p[0] ?? 0), I = C === "I" ? "X" : C;
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
            a === "restored" ? /* @__PURE__ */ i.jsx(ph, { x: 0, y: -20, scale: 1.4 }) : null,
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx(Gn, { letter: I, x: 0, y: -4, scale: 0.95, ghost: !0 }) : null,
            a === "still-burning" ? /* @__PURE__ */ i.jsx(Gn, { letter: I, x: 0, y: -4, scale: 0.95, residual: !0 }) : null,
            a === "prediction-miss" ? /* @__PURE__ */ i.jsx(Gn, { letter: I, x: 0, y: -4, scale: 0.95 }) : null,
            a === "logical-failure" ? /* @__PURE__ */ i.jsx(xl, { x: 0, y: 0, scale: 0.5, anomaly: g }) : null
          ] }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "result-titles", children: [
            /* @__PURE__ */ i.jsx("h2", { id: l, className: "result-title", tabIndex: -1, "data-focus-target": !0, "data-testid": "result-title", children: s(Zh[a]) }),
            /* @__PURE__ */ i.jsxs("p", { className: "result-stars", "data-testid": "result-stars", "aria-label": x, children: [
              /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: Array.from({ length: n.maxStars }, (_, R) => /* @__PURE__ */ i.jsx("span", { className: R < n.stars ? "star star-on" : "star", children: R < n.stars ? "★" : "☆" }, R)) }),
              " ",
              /* @__PURE__ */ i.jsx("span", { className: "result-stars-text", children: x })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "result-reaction", "data-testid": "result-reaction", children: Mh(n.missionCopy, a) }),
        /* @__PURE__ */ i.jsx("p", { className: "result-body", children: s(v1[a]) }),
        k !== null ? /* @__PURE__ */ i.jsxs("p", { className: "result-beacon", "data-testid": "result-beacon", children: [
          /* @__PURE__ */ i.jsx("strong", { children: k }),
          " ",
          s("result.beacon.pattern", { pattern: d.residual })
        ] }) : null,
        S ? /* @__PURE__ */ i.jsx("p", { className: "result-beacon result-beacon-ok", "data-testid": "result-beacon-ok", children: s("result.beacon.ok") }) : null,
        /* @__PURE__ */ i.jsxs("p", { className: "result-rules", children: [
          s("spray.quantumRules"),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "spray-rules-note", children: s("spray.oneShot") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "result-why", onClick: n.onWhy, children: s("dispatch.why") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "result-retry", onClick: n.onRetry, children: s("result.tryAgain") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "result-next", onClick: n.onNext, children: n.nextLabel })
        ] }),
        /* @__PURE__ */ i.jsxs("details", { className: "result-details", "data-testid": "result-details", children: [
          /* @__PURE__ */ i.jsx("summary", { children: s("details.show") }),
          /* @__PURE__ */ i.jsxs("div", { className: "result-details-body", children: [
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx("p", { children: s("result.type.safePattern.details", { residual: d.residual }) }) : null,
            a === "logical-failure" || b ? /* @__PURE__ */ i.jsx("p", { className: "muted", children: s("result.beacon.note") }) : null,
            n.children
          ] })
        ] })
      ]
    }
  );
}
function L1(n, s) {
  return n.durationMs >= s.durationMs ? n : s;
}
const R1 = { success: "result.outcome.success", "logical-error": "result.outcome.logicalError", detectable: "result.outcome.detectable" }, _1 = { success: "result.outcome.success", "logical-error": "result.outcome.propagationMiss", detectable: "result.outcome.detectable" }, zf = (n) => n.every((s) => s === 0);
function O1(n) {
  const s = Se(), { mine: l } = n, a = F.useMemo(() => C1(l), [l]), d = F.useMemo(() => Na(l, n.reducedMotion), [l, n.reducedMotion]), f = F.useMemo(() => Na(a, n.reducedMotion), [a, n.reducedMotion]), p = L1(d, f), g = Yh(p, n.reducedMotion), x = Oe(n.codeId).checks.length > 0, k = { district: n.missionCopy.districtName, hasChecks: x }, b = x ? R1 : _1, S = a.crews === l.crews, C = x && !S && l.verdict === "success" && a.verdict === "success", I = x && !S && l.verdict !== a.verdict && zf(l.syndromeOfResidual) && zf(a.syndromeOfResidual), _ = S ? s(x ? "why.identical" : "why.identicalWires") : C ? s("why.equivalent") : I ? `${s("why.sameAlarms")} ${s("why.cannotDecide")}` : n.missionCopy.whyShort, R = l.alternative.kind === "true-fires" ? s("why.trueFires") : s(x ? "why.decoder" : "why.trueEnd"), L = (W, $, D, te) => /* @__PURE__ */ i.jsxs("div", { className: "why-pane", "data-testid": te, children: [
    /* @__PURE__ */ i.jsx("h3", { className: "why-pane-title", children: W }),
    /* @__PURE__ */ i.jsx(Uh, { codeId: n.codeId, circuit: n.circuit, sceneKind: n.sceneKind, debrief: $, timeline: D, time: g.time, strict: n.reducedMotion, ariaLabel: W }),
    /* @__PURE__ */ i.jsx("p", { className: "why-caption", children: qh(s, D, g.time, k, n.reducedMotion) }),
    /* @__PURE__ */ i.jsx("p", { className: "spray-sr", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": `${te}-announcer`, children: Hh(s, D, g.time, k, n.reducedMotion) }),
    /* @__PURE__ */ i.jsx("p", { className: "why-verdict", children: s("why.verdict", { verdict: s(b[$.verdict]) }) })
  ] });
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: "why-compare",
      "aria-label": s("why.title"),
      "data-testid": "why-compare",
      "data-finished": g.finished ? "true" : "false",
      "data-alternative": l.alternative.kind,
      "data-relation": S ? "identical" : C ? "equivalent" : I ? "undecidable" : "other",
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "why-panes", children: [
          L(s("why.yours"), l, d, "why-mine"),
          L(`${s("why.alternative")} · ${R}`, a, f, "why-alt")
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "why-explanation", "data-testid": "why-explanation", children: _ }),
        I && l.verdict === "logical-error" ? /* @__PURE__ */ i.jsx("p", { className: "why-noblame", children: s("why.noBlame") }) : null,
        /* @__PURE__ */ i.jsx("div", { className: "why-controls", role: "group", "aria-label": s("why.title"), children: n.reducedMotion ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "why-prev", onClick: g.prev, disabled: g.step <= 0, children: s("motion.stepper.prev") }),
          /* @__PURE__ */ i.jsx("span", { className: "spray-step-label", children: s("motion.stepper.frame", { n: g.step + 1, total: g.steps }) }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "why-next", onClick: g.next, disabled: g.finished, children: s("motion.stepper.next") })
        ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "why-skip", onClick: g.skip, disabled: g.finished, children: s("dispatch.skip") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", "data-testid": "why-replay", onClick: g.restart, children: s("why.replayBoth") })
        ] }) })
      ]
    }
  );
}
const M1 = { "local-simulator": "cloud.source.local", "cached-cloud": "cloud.source.cached", "live-cloud": "cloud.source.live" }, P1 = "(max-width: 1023px)";
function $1(n) {
  const [s, l] = F.useState(() => {
    try {
      return globalThis.matchMedia?.(n).matches ?? !1;
    } catch {
      return !1;
    }
  });
  return F.useEffect(() => {
    let a;
    try {
      a = globalThis.matchMedia?.(n);
    } catch {
      a = void 0;
    }
    if (a === void 0) return;
    const d = (f) => l(f.matches);
    return a.addEventListener("change", d), () => a?.removeEventListener("change", d);
  }, [n]), s;
}
function A1({ state: n, dispatch: s, mission: l }) {
  const a = Se(), d = zt(), f = l.training[n.lesson], p = F.useId(), [g, x] = F.useState(null), k = F.useRef(null);
  F.useEffect(() => {
    g !== null && k.current?.focus({ preventScroll: !0 });
  }, [g]);
  const b = Ft(l.id, d);
  if (f === void 0) return null;
  const S = Oe(l.code), C = Xe(f.fire), I = Ma(C, f.circuit), _ = n.lessonCursor, R = I.frames[_ + 1] ?? C, L = Ee(R), W = f.circuit.length > 0 || S.checks.length === 0, $ = S.checks.length > 0 ? on(Fr(S, R)) : null, D = l.training.length, te = _ >= f.circuit.length - 1, K = n.lesson === D - 1, Z = f.circuit.length > 0 && !te, re = a(te ? K ? "training.startDispatch" : "training.nextLesson" : "training.nextStep"), ue = (Be) => {
    Z && (x({ lesson: n.lesson, cursor: _ + 1, q: Be }), s({ type: "LESSON_NEXT" }));
  }, Ne = g !== null && g.lesson === n.lesson && g.cursor === _ ? Yt(R, g.q) !== "I" ? a("training.predict.hit", { q: g.q }) : a("training.predict.miss", { q: g.q }) : null, $e = Ny(l.id, n.lesson, d, f.caption);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-training", children: [
    /* @__PURE__ */ i.jsx(
      cn,
      {
        title: b.districtName,
        subtitle: a("training.subtitle", { n: n.lesson + 1, total: D }),
        onMissions: () => s({ type: "OPEN_MISSIONS" }),
        onSettings: () => s({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": a("training.boardLabel"), children: [
        /* @__PURE__ */ i.jsx(
          Ws,
          {
            codeId: l.code,
            circuit: f.circuit,
            fires: L,
            crews: null,
            residual: null,
            syndrome: $,
            interactive: Z,
            onToggle: ue,
            tapHint: a("a11y.pressToPredict"),
            gateCursor: W ? _ : void 0,
            inputFires: W ? f.fire : null,
            ariaDescribedBy: p,
            ariaLabel: a("training.board")
          }
        ),
        Z ? /* @__PURE__ */ i.jsxs("p", { className: "predict-prompt", "data-testid": "predict-prompt", role: "status", children: [
          /* @__PURE__ */ i.jsx("strong", { children: a("training.predictTap") }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "muted", children: a("training.predict.waiting") })
        ] }) : null,
        Ne !== null ? /* @__PURE__ */ i.jsx("p", { className: "predict-reaction", "data-testid": "predict-reaction", role: "status", tabIndex: -1, ref: k, children: Ne }) : null,
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: p, "aria-live": "polite", "data-testid": "training-caption", children: [
          f.circuit.length > 0 ? /* @__PURE__ */ i.jsxs("strong", { className: "mono-lead", children: [
            _ < 0 ? a("training.start") : a("training.afterGate", { n: _ + 1, total: f.circuit.length }),
            " ",
            /* @__PURE__ */ i.jsx("span", { className: "mono", children: L })
          ] }) : null,
          " ",
          $e
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", "aria-label": a("training.lesson"), children: [
        S.checks.length > 0 ? /* @__PURE__ */ i.jsx(Fs, { codeId: l.code, syndrome: $ }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("training.lesson") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: b.lessonOneLiner }),
          /* @__PURE__ */ i.jsx("ol", { className: "lesson-dots", "aria-label": a("training.lessons"), children: l.training.map((Be, U) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${U === n.lesson ? " is-current" : ""}`, "aria-current": U === n.lesson ? "step" : void 0, onClick: () => s({ type: "LESSON_SELECT", lesson: U }), "aria-label": a("training.lessonLabel", { n: U + 1, fires: qy(a, Be.fire) }), children: U + 1 }) }, U)) }),
          /* @__PURE__ */ i.jsx(Dh, { allowed: l.allowed, alarms: S.checks.length > 0 })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => s({ type: "LESSON_PREV" }), disabled: n.lesson === 0 && _ <= -1, "data-testid": "training-prev", children: a("training.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => s({ type: "LESSON_NEXT" }), disabled: Z, "aria-disabled": Z, "data-testid": "training-next", children: re }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "start-challenge", children: a("training.skip") })
        ] })
      ] })
    ] })
  ] });
}
const Wf = {
  1: { title: "tutorial.step1", body: "tutorial.step1.body" },
  2: { title: "tutorial.step2", body: "tutorial.step2.body" },
  3: { title: "tutorial.step3", body: "tutorial.step3.body" }
};
function D1({ step: n, current: s, title: l, body: a }) {
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
function F1({ mission: n, placements: s, selected: l, standDownDialog: a, highlightedCheck: d, canUndo: f, canRedo: p, tutorialActive: g, dispatch: x }) {
  const k = Se(), b = zt(), S = F.useId(), C = F.useRef(null), I = Ft(n.id, b), _ = Ar(s), R = _ >= n.budget, L = n.kind === "propagation", W = L ? null : n.syndrome, [$, D] = F.useState(!1), te = $ ? _ === 0 ? 2 : 3 : 1, K = $1(P1);
  F.useEffect(() => {
    const oe = (le) => {
      if (a || le.metaKey || le.ctrlKey || le.altKey) return;
      const ge = le.target instanceof HTMLElement ? le.target : null, X = C.current;
      if (ge === null || X === null || !X.contains(ge) || ge.tagName === "INPUT" || ge.tagName === "TEXTAREA") return;
      const q = { 1: "X", 2: "Z", 3: "Y" }[le.key];
      if (q !== void 0) {
        n.allowed.includes(q) && (x({ type: "SELECT_LETTER", letter: q }), D(!0)), le.preventDefault();
        return;
      }
      if (le.key === "Backspace" || le.key === "Delete") {
        const j = ge.closest("button.block[data-q]"), O = j === null ? NaN : Number(j.dataset.q);
        Number.isInteger(O) ? x({ type: "RECALL_BLOCK", qubit: O }) : x({ type: "CLEAR_CREWS" }), le.preventDefault();
        return;
      }
      (le.key === "c" || le.key === "C") && (x({ type: "CONFIRM" }), le.preventDefault());
    };
    return document.addEventListener("keydown", oe), () => document.removeEventListener("keydown", oe);
  }, [x, n.allowed, a]);
  const Z = n.visibleStart === null ? [] : Array.from(n.visibleStart).map((oe, le) => ({ q: le, l: oe })).filter((oe) => oe.l !== "I"), re = Object.entries(s).sort(([oe], [le]) => Number(oe) - Number(le)), ue = (oe) => /* @__PURE__ */ i.jsx(D1, { step: oe, current: te, title: k(Wf[oe].title), body: k(Wf[oe].body) }), Ne = L ? null : /* @__PURE__ */ i.jsx(Fs, { codeId: n.code, syndrome: W, compact: Oe(n.code).checks.length > 4, hint: k("challenge.detector.hint") }), $e = /* @__PURE__ */ i.jsx(
    Vy,
    {
      allowed: n.allowed,
      selected: l,
      onSelect: (oe) => {
        x({ type: "SELECT_LETTER", letter: oe }), D(!0);
      },
      callout: g && !K ? ue(1) : void 0
    }
  ), Be = /* @__PURE__ */ i.jsx(
    Ws,
    {
      codeId: n.code,
      circuit: n.circuit,
      fires: null,
      crews: null,
      placements: s,
      residual: null,
      syndrome: W,
      fog: !L,
      interactive: !0,
      onToggle: (oe) => x({ type: "TOGGLE_BLOCK", qubit: oe }),
      selected: l,
      budgetReached: R,
      highlightedCheck: d,
      onToggleDetector: L ? void 0 : (oe) => x({ type: "TOGGLE_DETECTOR_HIGHLIGHT", checkIndex: oe }),
      gateCursor: L ? n.circuit.length : void 0,
      inputFires: L ? n.visibleStart : null,
      ariaDescribedBy: S
    }
  ), U = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: S, children: [
      L ? k("challenge.startingFire", { fires: Z.map((oe) => k("challenge.startToken", { letter: oe.l, q: oe.q })).join(", ") }) : `${k("challenge.fog")} ${Ka(k, n.code, W)}`,
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: k("challenge.tapHint") })
    ] }),
    !L && d !== null ? /* @__PURE__ */ i.jsx("p", { className: "muted small", "data-testid": "detector-watch", children: k("challenge.detector.watches", { station: Oe(n.code).checks[d]?.id ?? "", list: (Oe(n.code).checks[d]?.qubits ?? []).join(", ") }) }) : null
  ] }), Y = /* @__PURE__ */ i.jsxs("section", { className: "panel-section plan", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: k("plan.title") }),
    /* @__PURE__ */ i.jsxs("p", { className: "budget", "data-testid": "budget", "aria-live": "polite", children: [
      k("challenge.crews", { used: _, budget: n.budget }),
      R ? /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        " · ",
        k("challenge.budgetReached")
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("ul", { className: "placement-list", "aria-label": k("challenge.placed"), children: [
      re.map(([oe, le]) => /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(er, { letter: le, size: 22 }),
        " ",
        k("challenge.placement", { letter: le, q: oe })
      ] }, oe)),
      _ === 0 ? /* @__PURE__ */ i.jsx("li", { className: "muted", children: k("plan.empty") }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small", children: k("plan.hint") }),
    /* @__PURE__ */ i.jsxs("div", { className: "plan-tools", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => x({ type: "REDO_PLACEMENT" }), disabled: !p, "data-testid": "redo", children: k("plan.redo") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => x({ type: "CLEAR_CREWS" }), disabled: _ === 0, "data-testid": "clear", children: k("plan.clear") })
    ] })
  ] }), ke = /* @__PURE__ */ i.jsxs("div", { className: "actions action-bar", "data-testid": "action-bar", children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => x({ type: "UNDO_PLACEMENT" }), disabled: !f, "data-testid": "undo", children: k("plan.undo") }),
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-spray", onClick: () => x({ type: "CONFIRM" }), "data-testid": "confirm", children: k("challenge.spray") })
  ] });
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-play screen-challenge${g ? " is-tutorial" : ""}`, ref: C, "data-tutorial": g ? "true" : "false", "data-layout": K ? "compact" : "wide", children: [
    /* @__PURE__ */ i.jsx(
      cn,
      {
        title: I.districtName,
        subtitle: k(L ? "challenge.subtitle.predict" : "challenge.subtitle.dispatch"),
        onMissions: () => x({ type: "OPEN_MISSIONS" }),
        onSettings: () => x({ type: "OPEN_SETTINGS" })
      }
    ),
    g ? /* @__PURE__ */ i.jsxs("div", { className: "tutorial-bar", "data-testid": "tutorial-bar", children: [
      /* @__PURE__ */ i.jsxs("p", { className: "tutorial-intro", children: [
        /* @__PURE__ */ i.jsx("strong", { children: k("tutorial.title") }),
        " ",
        k("tutorial.intro")
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: () => x({ type: "TUTORIAL_SKIP" }), "data-testid": "tutorial-skip", children: k("tutorial.skip") })
    ] }) : null,
    K ? /* @__PURE__ */ i.jsxs("div", { className: "play-layout play-layout-challenge is-compact", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": k("challenge.board"), children: [
        g ? /* @__PURE__ */ i.jsxs("ol", { className: "tutorial-strip", "data-testid": "tutorial-strip", "aria-label": k("a11y.tutorialSteps"), children: [
          /* @__PURE__ */ i.jsx("li", { children: ue(1) }),
          /* @__PURE__ */ i.jsx("li", { children: ue(2) }),
          /* @__PURE__ */ i.jsx("li", { children: ue(3) })
        ] }) : null,
        Be,
        U
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-before", "aria-label": k("a11y.alarmsAndCrews"), children: [
        $e,
        Ne
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-after", "aria-label": k("plan.title"), children: [
        Y,
        ke
      ] })
    ] }) : /* @__PURE__ */ i.jsxs("div", { className: "play-layout play-layout-challenge", children: [
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-before", "aria-label": k("a11y.alarmsAndCrews"), children: [
        g ? $e : Ne,
        g ? Ne : $e
      ] }),
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": k("challenge.board"), children: [
        Be,
        g ? ue(2) : null,
        U
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-after", "aria-label": k("plan.title"), children: [
        Y,
        g ? ue(3) : null,
        ke
      ] })
    ] }),
    a ? /* @__PURE__ */ i.jsx(Ah, { title: k("challenge.standDown.title"), confirmLabel: k("challenge.standDown.confirm"), cancelLabel: k("challenge.standDown.cancel"), onConfirm: () => x({ type: "STAND_DOWN_CONFIRM" }), onCancel: () => x({ type: "STAND_DOWN_CANCEL" }), children: /* @__PURE__ */ i.jsx("p", { children: k("challenge.standDown.body") }) }) : null
  ] });
}
function Vh(n) {
  const s = yl(n), l = tr(n.missionId)?.hasBeacon ?? !1;
  return { result: s, logicalFlip: n.logicalFlip, patternQubits: jg(n), beacon: l || s === "logical-failure" };
}
function z1({ state: n, mission: s, debrief: l, bridge: a, children: d }) {
  const f = Se(), p = zt(), g = Oe(s.code), x = l.score;
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
        /* @__PURE__ */ i.jsx("dd", { className: "mono", "data-testid": "residual-syndrome", children: g.checks.length === 0 ? f("alarms.summary.none") : l.syndromeOfResidual.join("") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.decision") }),
        /* @__PURE__ */ i.jsxs("dd", { "data-testid": "decision", children: [
          f(Va[x.quality]),
          " · ",
          /* @__PURE__ */ i.jsx(zs, { count: x.stars, max: x.maxStars, size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.outcome") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "verdict-label", children: f(wl(x.outcome, g.checks.length > 0)) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.cost") }),
        /* @__PURE__ */ i.jsx("dd", { children: x.crewsUsed === 1 ? f("result.costText.one", { min: x.minCrews }) : f("result.costText.other", { used: x.crewsUsed, min: x.minCrews }) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.attempts") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "attempts", children: n.progress[s.id]?.attempts ?? 1 })
      ] })
    ] }),
    g.checks.length > 0 ? /* @__PURE__ */ i.jsx(Fs, { codeId: s.code, syndrome: l.syndromeOfResidual, compact: !0 }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: Oh(s.id, l.verdict, p, l.narrative) }),
    d,
    /* @__PURE__ */ i.jsx(Qh, { bridge: a, missionId: s.id, correction: l.crews }, `${s.id}:${l.crews}`)
  ] });
}
function W1(n) {
  const { state: s, dispatch: l, mission: a, debrief: d, reducedMotion: f } = n, p = Se(), g = zt(), x = Ft(a.id, g), k = F.useMemo(() => Na(d, f), [d, f]), b = F.useCallback(() => l({ type: "DISPATCH_DONE" }), [l]), S = a.index === $n().length, { nextLabel: C, primary: I } = Qa(p, d, S, s.tutorialActive), _ = a.kind === "propagation", R = Oe(a.code).checks.length > 0;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-dispatch", "data-dispatch-done": s.dispatchDone ? "true" : "false", children: [
    /* @__PURE__ */ i.jsx(cn, { title: x.districtName, subtitle: p("dispatch.subtitle"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    s.dispatchDone ? /* @__PURE__ */ i.jsxs("div", { className: "scene-stage", "data-testid": "dispatch-result", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "board-col", children: [
        /* @__PURE__ */ i.jsx("h2", { className: "spray-title", children: p("dispatch.answerCheck") }),
        /* @__PURE__ */ i.jsx(
          Ws,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: d.fires,
            crews: d.crews,
            residual: d.residual,
            syndrome: d.syndromeOfResidual,
            interactive: !1,
            outcome: Vh(d),
            gateCursor: _ ? a.circuit.length : void 0,
            inputFires: _ ? d.startFires : null,
            ariaLabel: p("dispatch.answerCheck")
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
      ] }),
      /* @__PURE__ */ i.jsx(
        I1,
        {
          debrief: d,
          result: yl(d),
          missionCopy: x,
          stars: d.score.stars,
          maxStars: d.score.maxStars,
          onWhy: () => l({ type: "OPEN_WHY", reducedMotion: f }),
          onRetry: () => l({ type: "TRY_AGAIN" }),
          onNext: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }),
          nextLabel: C,
          className: I === "retry" ? "is-primary-retry" : void 0,
          children: /* @__PURE__ */ i.jsx(z1, { ...n, children: /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "OPEN_WHY", reducedMotion: f }), "data-testid": "step-by-step", children: p("debrief.stepByStep") }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") })
          ] }) })
        }
      )
    ] }) : /* @__PURE__ */ i.jsxs("div", { className: `dispatch-live${R ? " has-alarms" : ""}`, "data-testid": "dispatch-live", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "dispatch-stage", children: [
        /* @__PURE__ */ i.jsx(T1, { codeId: a.code, circuit: a.circuit, debrief: d, timeline: k, reducedMotion: f, onDone: b, missionCopy: x }, `${d.missionId}:${d.crews}:${String(s.progress[a.id]?.attempts ?? 0)}`),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
      ] }),
      R ? /* @__PURE__ */ i.jsx("aside", { className: "dispatch-alarms", "aria-label": p("alarms.title"), "data-testid": "dispatch-alarms", children: /* @__PURE__ */ i.jsx(Fs, { codeId: a.code, syndrome: a.syndrome, compact: Oe(a.code).checks.length > 4 }) }) : null
    ] })
  ] });
}
function X1(n) {
  const { state: s, dispatch: l, mission: a, debrief: d, reducedMotion: f } = n, p = Se(), g = zt(), x = Ft(a.id, g), k = Oe(a.code), b = d.steps[s.replayIndex] ?? d.steps[d.steps.length - 1], S = F.useId();
  if (b === void 0) return null;
  const C = d.steps.length - 1, I = a.kind === "propagation", _ = d.alternative, R = { crews: _.crews, verdict: _.verdict, label: _.kind === "true-fires" ? p("why.trueFires") : p("why.decoder") }, L = (Z) => {
    const re = Z.target instanceof HTMLElement ? Z.target : null;
    if (re === null || re.closest('[data-testid="why-skip"]') === null) return;
    const ue = Z.currentTarget;
    globalThis.setTimeout(() => ue.querySelector('[data-testid="why-replay"]')?.focus(), 0);
  }, W = Xe(d.residual), $ = Array.from({ length: k.n }, (Z, re) => re).filter((Z) => Yt(W, Z) !== "I"), D = d.verdict === "success" ? p("debrief.logical.preserved") : d.verdict === "detectable" ? p("debrief.logical.undecided") : I ? p("debrief.logical.missed", { houses: $.join(", ") }) : p("debrief.logical.flipped", { ops: [d.logicalFlip.x.some(Boolean) ? "X̄" : null, d.logicalFlip.z.some(Boolean) ? "Z̄" : null].filter(Boolean).join(` ${p("common.and")} `) }), te = a.index === $n().length, { nextLabel: K } = Qa(p, d, te, s.tutorialActive);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-debrief", children: [
    /* @__PURE__ */ i.jsx(cn, { title: x.districtName, subtitle: p("why.title"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "why-section", "aria-label": p("why.comparison"), "data-testid": "why-section", onClick: L, children: [
      /* @__PURE__ */ i.jsx("h2", { id: "why-h", className: "section-h", tabIndex: -1, "data-focus-target": !0, "data-testid": "why-heading", children: p("why.title") }),
      /* @__PURE__ */ i.jsx("p", { className: "why-short", "data-testid": "why-short", children: x.whyShort }),
      /* @__PURE__ */ i.jsx(O1, { codeId: a.code, circuit: a.circuit, mine: d, alternative: R, reducedMotion: f, missionCopy: x })
    ] }),
    /* @__PURE__ */ i.jsx(Ga, { summary: p("debrief.stepByStep"), testId: "step-details", className: "step-details", children: /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": p("debrief.replayBoard"), children: [
        /* @__PURE__ */ i.jsx(
          Ws,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: b.fires,
            crews: b.crews,
            residual: b.residual,
            syndrome: b.syndrome,
            interactive: !1,
            outcome: b.showVerdict ? Vh(d) : void 0,
            gateCursor: I ? b.gateCursor : void 0,
            inputFires: I ? d.startFires : null,
            ariaDescribedBy: S,
            ariaLabel: p("a11y.replayBoard")
          }
        ),
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: S, "aria-live": "polite", "data-testid": "replay-caption", children: [
          /* @__PURE__ */ i.jsx("strong", { children: p("debrief.step", { n: s.replayIndex + 1, total: d.steps.length, title: Lf(p, b.id) }) }),
          " ",
          b.caption
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("details.replayEnglish") }),
        /* @__PURE__ */ i.jsxs("div", { className: "replay-controls", role: "group", "aria-label": p("a11y.replayControls"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_PREV" }), disabled: s.replayIndex === 0, "data-testid": "replay-prev", children: p("debrief.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_NEXT" }), disabled: s.replayIndex === C, "data-testid": "replay-next", children: p("debrief.next") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: `btn${s.autoPlay ? " is-active" : ""}`, "aria-pressed": s.autoPlay, onClick: () => l({ type: "REPLAY_AUTO", on: !s.autoPlay }), "data-testid": "replay-auto", children: p("debrief.autoPlay") }),
          /* @__PURE__ */ i.jsx("ol", { className: "step-dots", "aria-label": p("a11y.replaySteps"), children: d.steps.map((Z, re) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${re === s.replayIndex ? " is-current" : ""}`, "aria-current": re === s.replayIndex ? "step" : void 0, onClick: () => l({ type: "REPLAY_GOTO", index: re }), "aria-label": p("a11y.step", { n: re + 1, title: Lf(p, Z.id) }), children: re + 1 }) }, Z.id)) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", "aria-label": p("debrief.report"), children: [
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
                  $.length > 0 ? p("debrief.residualHouses", { list: $.join(", ") }) : p("debrief.nothingLeft")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.logical") }),
              /* @__PURE__ */ i.jsx("dd", { "data-testid": "logical", children: D })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.decision") }),
              /* @__PURE__ */ i.jsxs("dd", { children: [
                p(Va[d.score.quality]),
                " · ",
                /* @__PURE__ */ i.jsx(zs, { count: d.score.stars, max: d.score.maxStars, size: 16 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: Oh(a.id, d.verdict, g, d.narrative) })
        ] }),
        k.checks.length > 0 ? /* @__PURE__ */ i.jsx(Fs, { codeId: a.code, syndrome: b.syndrome, compact: !0 }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section whatif", "data-testid": "whatif", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: p("debrief.whatIf") }),
          /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.decoder", { crews: d.whatIf.decoderCrews, verdict: p(wl(d.whatIf.decoderVerdict, k.checks.length > 0)) }) }),
          d.whatIf.trueFireCrews !== null ? /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.trueFires", { crews: d.whatIf.trueFireCrews }) }) : null,
          /* @__PURE__ */ i.jsx("h3", { className: "panel-title", children: p("details.englishOriginal") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted", children: d.whatIf.explanation }),
          g !== "en" ? /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d.narrative }) : null
        ] }),
        /* @__PURE__ */ i.jsx(Qh, { bridge: n.bridge, missionId: a.id, correction: d.crews }, `${a.id}:${d.crews}`)
      ] })
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: p("debrief.tryAgain") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), "data-testid": "debrief-next", children: K })
    ] })
  ] });
}
function Qh({ bridge: n, missionId: s, correction: l }) {
  const a = Se(), [d, f] = F.useState({ kind: "idle" }), p = n.cached(s), g = ch(n.cached(s, l), s, l), x = Array.from(new Set(p.map((I) => I.correction))).filter((I) => !g.some((_) => _.correction === I)), k = n.kind === "qollab" && typeof n.run == "function", b = n.jobsRemaining?.() ?? 0, S = n.backendName ?? a("cloud.selectedBackend"), C = async () => {
    if (!k || n.run === void 0) return;
    f({ kind: "running" });
    const I = await n.run({ missionId: s, correction: l, shots: 100 });
    f({ kind: "done", result: I });
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section cloud", "data-testid": "cloud-panel", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("cloud.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small", children: a("cloud.intro", { correction: l }) }),
    g.length === 0 && d.kind === "idle" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-empty", "data-testid": "cloud-empty", children: a("cloud.empty", { others: x.length > 0 ? a("cloud.emptyOthers", { list: x.join(", ") }) : "" }) }) : null,
    g.map((I, _) => /* @__PURE__ */ i.jsx(Xf, { result: I }, `${I.startedAt}-${String(_)}`)),
    d.kind === "running" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-running", role: "status", children: a("cloud.running", { backend: S }) }) : null,
    d.kind === "done" ? d.result.status === "ok" ? /* @__PURE__ */ i.jsx(Xf, { result: d.result }) : /* @__PURE__ */ i.jsx("p", { className: "cloud-error", role: "alert", children: a("cloud.failed", { message: d.result.message }) }) : null,
    k ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => void C(), disabled: d.kind === "running" || b <= 0, children: b <= 0 ? a("cloud.noJobs") : a("cloud.verifyOn", { backend: S }) }) : null
  ] });
}
function Xf({ result: n }) {
  const s = Se(), l = Object.values(n.counts).reduce((d, f) => d + f, 0), a = Object.entries(n.counts).sort(([, d], [, f]) => f - d).slice(0, 5);
  return /* @__PURE__ */ i.jsxs("div", { className: `cloud-card cloud-${n.source}`, "data-testid": "cloud-card", children: [
    /* @__PURE__ */ i.jsxs("p", { className: "cloud-source", children: [
      /* @__PURE__ */ i.jsx("span", { className: "tag", children: s(M1[n.source]) }),
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
    /* @__PURE__ */ i.jsx("dl", { className: "facts small cloud-facts", children: Z1(n, s).map(([d, f]) => /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx("dt", { children: d }),
      /* @__PURE__ */ i.jsx("dd", { children: f })
    ] }, d)) })
  ] });
}
function Z1(n, s) {
  const l = [], a = ol(n.analysis) ? n.analysis : {}, d = ol(n.prediction) ? n.prediction : {}, f = (I) => typeof I == "number" ? `${String(Math.round(I * 100))}%` : null, p = (I) => Array.isArray(I) && I.every((_) => _ === 0 || _ === 1) ? I.map(String).join("") : null, g = p(a.dominantSyndrome), x = p(d.syndrome);
  g !== null && l.push([s("cloud.analysis.dominant"), x !== null ? s("cloud.analysis.predicted", { dom: g, pred: x }) : g]);
  const k = f(a.predictedSyndromeShare);
  k !== null && l.push([s("cloud.analysis.syndromeShare"), k]);
  const b = a.predictedLogicalShare;
  Array.isArray(b) && typeof b[0] == "number" && l.push([s("cloud.analysis.logicalShare"), f(b[0]) ?? "—"]);
  const S = a.dominantMatches;
  if (ol(S)) {
    const I = Object.values(S).every((_) => _ === !0 || _ === null);
    l.push([s("cloud.analysis.dominantMatches"), s(I ? "cloud.analysis.yes" : "cloud.analysis.no")]);
  }
  const C = a.exactMatchesIdealModel ?? a.matches;
  return ol(C) && l.push([s("cloud.analysis.exact"), Object.values(C).every((I) => I === !0 || I === null) ? s("cloud.analysis.yes") : s("cloud.analysis.noNoise")]), typeof d.verdict == "string" && l.push([s("cloud.analysis.verdict"), d.verdict]), typeof a.readoutBasis == "string" && typeof a.prep == "string" && l.push([s("cloud.analysis.prep"), s("cloud.analysis.prepValue", { prep: a.prep, basis: a.readoutBasis })]), l;
}
function ol(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
const Kh = ["#2f6fdd", "#2bb673", "#8a4fd6", "#e8432a", "#f2b200", "#3a2f2a"];
function B1({ state: n, dispatch: s }) {
  const l = Se(), a = Wa(n.progress);
  return /* @__PURE__ */ i.jsx("main", { className: "screen screen-title", children: /* @__PURE__ */ i.jsxs("div", { className: "title-card", children: [
    /* @__PURE__ */ i.jsx(Ih, { size: 112, label: l("a11y.q11mark") }),
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
      /* @__PURE__ */ i.jsx(Qy, { language: n.settings.language, onChange: (d) => s({ type: "SET_LANGUAGE", language: d }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: () => s({ type: "OPEN_SETTINGS" }), "aria-label": l("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(qa, {}) })
    ] }),
    a > 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted title-progress", "data-testid": "title-progress", children: l("title.progress", { stars: a, max: Aa() }) }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "title-foot muted", children: l("title.foot") })
  ] }) });
}
function q1({ dispatch: n }) {
  const s = Se();
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(cn, { title: s("how.title"), onSettings: () => n({ type: "OPEN_SETTINGS" }), onTitle: () => n({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ i.jsxs("article", { className: "doc", children: [
      /* @__PURE__ */ i.jsx("p", { className: "brief-text", children: s("how.kid.intro") }),
      /* @__PURE__ */ i.jsx("h2", { children: s("how.kid.legend") }),
      /* @__PURE__ */ i.jsxs("dl", { className: "how-list", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx("svg", { width: "40", height: "40", viewBox: "-40 -80 80 84", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Ue, { x: 0, y: 0, variant: "small", state: { kind: "normal" }, tint: 0 }) }),
            s("how.houses.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.houses") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(_s, { letter: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(_s, { letter: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(_s, { letter: "Y", size: 30 }),
            s("how.fires.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.fires") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(Dr, { type: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Dr, { type: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Dr, { type: "Z", ringing: !0, size: 30 }),
            s("how.alarms.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.alarms") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(er, { letter: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(er, { letter: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(er, { letter: "Y", size: 30 }),
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
            /* @__PURE__ */ i.jsx($h, { size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(_s, { letter: "Z", size: 30 }),
            s("legend.water")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.water") })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "how-rule", children: s("how.quantumRules") }),
      /* @__PURE__ */ i.jsx("p", { children: s("how.kid.spray") }),
      /* @__PURE__ */ i.jsxs(Ga, { summary: s("details.title"), testId: "how-details", children: [
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
function va({ id: n, on: s, onChange: l, testId: a }) {
  const d = Se();
  return /* @__PURE__ */ i.jsxs("button", { type: "button", role: "switch", "aria-checked": s, "aria-labelledby": n, className: `switch${s ? " is-on" : ""}`, onClick: () => l(!s), "data-testid": a, children: [
    /* @__PURE__ */ i.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { className: "switch-text", children: d(s ? "settings.on" : "settings.off") })
  ] });
}
function H1({ state: n, dispatch: s, storageLabel: l, onReset: a }) {
  const d = Se(), f = (p, g) => /* @__PURE__ */ i.jsx("button", { type: "button", className: `seg-btn${n.settings.language === p ? " is-on" : ""}`, "aria-pressed": n.settings.language === p, onClick: () => s({ type: "SET_LANGUAGE", language: p }), "data-testid": `lang-${p}`, children: g });
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(cn, { title: d("settings.title"), onSettings: () => s({ type: "CLOSE_OVERLAY" }), settingsLabel: d("settings.close"), onTitle: () => s({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "doc", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-sound", children: d("settings.sound") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.sound.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(va, { id: "set-sound", on: n.settings.sound, onChange: (p) => s({ type: "SET_SOUND", on: p }), testId: "switch-sound" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-motion", children: d("settings.motion") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: d("settings.motion.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(va, { id: "set-motion", on: n.settings.reducedMotion, onChange: (p) => s({ type: "SET_REDUCED_MOTION", on: p }), testId: "switch-motion" })
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
        /* @__PURE__ */ i.jsx(va, { id: "set-free-roam", on: n.settings.freeRoam, onChange: (p) => s({ type: "SET_FREE_ROAM", on: p }), testId: "switch-free-roam" })
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
function U1({ kind: n, beacon: s = !1, size: l = 180 }) {
  let f;
  switch (n) {
    case "houses-row":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 70, y: 150, variant: "small", tint: 0, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 160, y: 150, variant: "tall", tint: 1, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 250, y: 150, variant: "small", tint: 2, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ls, { type: "Z", x: 115, y: 150, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ls, { type: "Z", x: 205, y: 150, scale: 0.8 })
      ] });
      break;
    case "bridge":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 48, y: 150, variant: "small", tint: 3, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(kh, { x: 160, y: 150, width: 150 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 272, y: 150, variant: "small", tint: 4, scale: 0.8 })
      ] });
      break;
    case "lab":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(xh, { x: 160, y: 152, active: !0 }),
        /* @__PURE__ */ i.jsx(yt, { x: 40, y: 152, size: 0.9 }),
        /* @__PURE__ */ i.jsx(yt, { x: 290, y: 152, size: 0.8 })
      ] });
      break;
    case "grid":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 60, y: 150, variant: "shop", tint: 2, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 150, y: 150, variant: "small", tint: 4, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 230, y: 150, variant: "tall", tint: 5, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ls, { type: "Z", x: 105, y: 150, scale: 0.75 }),
        /* @__PURE__ */ i.jsx(Ls, { type: "X", x: 190, y: 150, scale: 0.75 }),
        s ? /* @__PURE__ */ i.jsx(xl, { x: 290, y: 152, scale: 0.55, lit: !0 }) : /* @__PURE__ */ i.jsx(yt, { x: 295, y: 152, size: 0.9 })
      ] });
      break;
  }
  return /* @__PURE__ */ i.jsxs("svg", { className: "district-thumb", viewBox: `0 0 ${String(320)} ${String(170)}`, width: l, height: l * 170 / 320, "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: 320, height: 170, rx: 18, fill: "var(--sky)" }),
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 118, width: 320, height: 52, fill: "var(--ground-2)" }),
    f
  ] });
}
function Y1({ state: n, dispatch: s, mission: l }) {
  const a = Se(), d = zt(), f = Ft(l.id, d), p = tr(l.id), g = Oe(l.code), x = l.training.length > 0;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-brief", children: [
    /* @__PURE__ */ i.jsx(cn, { title: f.districtName, subtitle: `${a("mission.label", { n: l.index })} · ${f.kidTitle}`, onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "brief panel-card", "data-testid": "briefing", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "brief-head", children: [
        /* @__PURE__ */ i.jsx(U1, { kind: p?.kind ?? "grid", beacon: p?.hasBeacon ?? !1 }),
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
          /* @__PURE__ */ i.jsx("dd", { children: l.allowed.map((k) => /* @__PURE__ */ i.jsxs("span", { className: "inline-glyph", children: [
            /* @__PURE__ */ i.jsx(er, { letter: k, size: 26 }),
            " ",
            k
          ] }, k)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.budget") }),
          /* @__PURE__ */ i.jsx("dd", { children: Ua(d, "briefing.budget", l.budget) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.previousBest") }),
          /* @__PURE__ */ i.jsxs("dd", { children: [
            /* @__PURE__ */ i.jsx(zs, { count: n.progress[l.id]?.stars ?? 0, max: l.maxStars, size: 20 }),
            l.maxStars < 3 ? /* @__PURE__ */ i.jsx("span", { className: "muted small", children: a("briefing.upTo", { n: l.maxStars }) }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "brief-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => s({ type: "START_MISSION" }), "data-testid": "start-mission", children: a(x ? "briefing.startTraining" : "briefing.go") }),
        x ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "briefing-skip", children: a("briefing.skipToDispatch") }) : null
      ] }),
      /* @__PURE__ */ i.jsxs(Ga, { summary: f.detailsTitle, testId: "briefing-details", children: [
        /* @__PURE__ */ i.jsx("p", { className: "brief-original", children: by(l.id, d, l.briefing) }),
        /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
          a("details.code"),
          ": ",
          a(Zy[l.code] ?? "mission.code.rsc3"),
          " · ",
          g.name
        ] })
      ] })
    ] })
  ] });
}
function V1({ state: n, dispatch: s, mission: l, debrief: a }) {
  const d = Se(), f = zt(), p = a.score, g = Ft(l.id, f), x = l.index === $n().length, k = Oe(l.code).checks.length > 0, b = n.progress[l.id]?.completed === !0, S = On.findIndex((L) => L.missionId === l.id), C = yl(a), I = () => s(n.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), { nextLabel: _, primary: R } = Qa(d, a, x, n.tutorialActive);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-result", children: [
    /* @__PURE__ */ i.jsx(cn, { title: g.districtName, subtitle: d("result.subtitle"), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "result panel-card", "data-testid": "result", "data-result": C, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "result-top", children: [
        /* @__PURE__ */ i.jsx("svg", { className: "result-badge", viewBox: "-30 -62 60 66", width: 64, height: 70, "aria-label": d("result.badge", { district: d(Ia(l.id)) }), role: "img", focusable: "false", children: /* @__PURE__ */ i.jsx(fl, { x: 0, y: 0, colour: Kh[S] ?? "#2f6fdd", earned: b }) }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "result-h", children: d(Wy(p)) }),
          /* @__PURE__ */ i.jsx(zs, { count: p.stars, max: p.maxStars, size: 40 }),
          /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
            p.maxStars === 1 ? d("result.starsOf.one", { stars: p.stars }) : d("result.starsOf.other", { stars: p.stars, max: p.maxStars }),
            p.maxStars < 3 ? ` · ${d("result.maxOne")}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "result-reaction", children: Mh(g, C) }),
      /* @__PURE__ */ i.jsxs("dl", { className: "result-facts", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.decision") }),
          /* @__PURE__ */ i.jsx("dd", { children: d(Va[p.quality]) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.outcome") }),
          /* @__PURE__ */ i.jsx("dd", { className: `outcome outcome-${p.outcome}`, children: d(wl(p.outcome, k)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.cost") }),
          /* @__PURE__ */ i.jsx("dd", { children: Ua(f, "result.costText", p.crewsUsed, { used: p.crewsUsed, min: p.minCrews }) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: d("result.attempts") }),
          /* @__PURE__ */ i.jsx("dd", { "data-testid": "result-attempts", children: n.progress[l.id]?.attempts ?? 1 })
        ] })
      ] }),
      b ? /* @__PURE__ */ i.jsx("p", { className: "result-badge-line", "data-testid": "result-badge-line", children: d("result.badge", { district: d(Ia(l.id)) }) }) : null,
      /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_WHY" }), "data-testid": "result-why", children: d("dispatch.why") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: R === "retry" ? "btn btn-primary btn-large" : "btn btn-large", onClick: () => s({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: d("result.tryAgain") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: R === "next" ? "btn btn-primary btn-large" : "btn btn-ghost btn-large", onClick: I, "data-testid": "next-mission", children: _ })
      ] })
    ] })
  ] });
}
function Q1({ state: n, dispatch: s }) {
  const l = Se(), a = zt(), d = $n(), f = Wa(n.progress);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-summary", children: [
    /* @__PURE__ */ i.jsx(cn, { title: l("summary.title"), subtitle: l("mission.starsOf", { stars: f, max: Aa() }), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "summary panel-card", "data-testid": "summary", children: [
      /* @__PURE__ */ i.jsx("p", { className: "brief-text", children: l("summary.lead") }),
      /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: l("summary.badges") }),
      /* @__PURE__ */ i.jsx("ul", { className: "badge-row", "aria-label": l("summary.badges"), children: On.map((p, g) => {
        const x = n.progress[p.missionId]?.completed === !0;
        return /* @__PURE__ */ i.jsxs("li", { className: x ? "badge-item is-earned" : "badge-item", "data-badge": p.id, "data-earned": x ? "true" : "false", children: [
          /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -62 60 66", width: 52, height: 57, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(fl, { x: 0, y: 0, colour: Kh[g] ?? "#2f6fdd", earned: x }) }),
          /* @__PURE__ */ i.jsx("span", { children: l(Ia(p.missionId)) })
        ] }, p.id);
      }) }),
      /* @__PURE__ */ i.jsxs("table", { className: "summary-table", children: [
        /* @__PURE__ */ i.jsx("thead", { children: /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.mission") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.stars") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.attempts") })
        ] }) }),
        /* @__PURE__ */ i.jsx("tbody", { children: d.map((p) => {
          const g = n.progress[p.id];
          return /* @__PURE__ */ i.jsxs("tr", { children: [
            /* @__PURE__ */ i.jsxs("th", { scope: "row", children: [
              p.index,
              ". ",
              Ft(p.id, a).districtName
            ] }),
            /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(zs, { count: g?.stars ?? 0, max: p.maxStars, size: 18 }) }),
            /* @__PURE__ */ i.jsx("td", { children: g?.attempts ?? 0 })
          ] }, p.id);
        }) })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "muted", children: l("summary.freeRoamHint") }),
      /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => s({ type: "OPEN_MISSIONS" }), "data-testid": "summary-city", children: l("summary.playAgain") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_SETTINGS" }), children: l("settings.freeRoam") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-large", onClick: () => s({ type: "OPEN_TITLE" }), children: l("summary.titleBtn") })
      ] }),
      /* @__PURE__ */ i.jsx(Dh, { allowed: ["X", "Z", "Y"], alarms: !0, water: !0 })
    ] })
  ] });
}
let Is = null;
function K1() {
  if (Is !== null) return Is;
  const n = globalThis.AudioContext;
  if (typeof n != "function") return null;
  try {
    Is = new n();
  } catch {
    Is = null;
  }
  return Is;
}
function lt(n, s, l, a, d = 0.08, f = "sine") {
  const p = n.createOscillator(), g = n.createGain();
  p.type = f, p.frequency.value = s, g.gain.setValueAtTime(0, l), g.gain.linearRampToValueAtTime(d, l + 0.01), g.gain.exponentialRampToValueAtTime(1e-4, l + a), p.connect(g).connect(n.destination), p.start(l), p.stop(l + a + 0.02);
}
function Zf(n, s) {
  if (!s) return;
  const l = K1();
  if (l === null) return;
  l.state === "suspended" && l.resume();
  const a = l.currentTime;
  switch (n) {
    case "select":
      lt(l, 660, a, 0.06);
      break;
    case "place":
      lt(l, 440, a, 0.09), lt(l, 660, a + 0.05, 0.09);
      break;
    case "remove":
      lt(l, 520, a, 0.08), lt(l, 390, a + 0.05, 0.1);
      break;
    case "confirm":
      lt(l, 523, a, 0.1), lt(l, 659, a + 0.08, 0.14);
      break;
    case "success":
      lt(l, 523, a, 0.12), lt(l, 659, a + 0.1, 0.12), lt(l, 784, a + 0.2, 0.22);
      break;
    case "failure":
      lt(l, 330, a, 0.16, 0.08, "triangle"), lt(l, 247, a + 0.14, 0.26, 0.08, "triangle");
      break;
    case "alarm":
      lt(l, 880, a, 0.08, 0.05, "square"), lt(l, 880, a + 0.14, 0.08, 0.05, "square");
      break;
    case "step":
      lt(l, 587, a, 0.05, 0.05);
      break;
    case "blocked":
      lt(l, 196, a, 0.07, 0.06, "square");
      break;
  }
}
function G1(n, s, l) {
  switch (n.type) {
    case "SELECT_LETTER":
      return l.selected !== s.selected ? "select" : null;
    case "TOGGLE_BLOCK": {
      const a = s.placements[n.qubit], d = l.placements[n.qubit];
      if (a === d) {
        if (l === s && s.screen === "challenge" && !s.standDownDialog && a === void 0) {
          const f = ut(s), p = f !== null && n.qubit >= 0 && n.qubit < Oe(f.code).n;
          if (f !== null && p && Ar(s.placements) >= f.budget) return "blocked";
        }
        return null;
      }
      return d === void 0 ? "remove" : "place";
    }
    case "RECALL_BLOCK":
      return l.placements !== s.placements ? "remove" : null;
    case "CLEAR_CREWS":
      return l.placements !== s.placements && Ar(s.placements) > 0 ? "remove" : null;
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
const Bf = 1600;
function J1() {
  const [n, s] = F.useState(() => {
    try {
      return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    } catch {
      return !1;
    }
  });
  return F.useEffect(() => {
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
function ex(n, s) {
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
function tx({ bridge: n = yg(), storage: s = "local" }) {
  const [l] = F.useState(() => s === "local" ? ag() : null), [a, d] = F.useReducer(ff, void 0, () => {
    const { save: K, notice: Z } = lg(l);
    return bg(K, Z);
  }), [f, p] = F.useState(!1), x = J1() || a.settings.reducedMotion, k = F.useRef(null), b = F.useRef(a), S = F.useRef(a.settings.sound), C = F.useRef(x);
  F.useEffect(() => {
    b.current = a, S.current = a.settings.sound, C.current = x;
  });
  const I = F.useCallback((K) => {
    const Z = K.type === "CONFIRM" || K.type === "STAND_DOWN_CONFIRM" || K.type === "OPEN_WHY" || K.type === "REPLAY_AUTO" ? { ...K, reducedMotion: K.reducedMotion ?? C.current } : K, re = b.current, ue = ff(re, Z);
    b.current = ue, d(Z);
    const Ne = G1(Z, re, ue);
    Ne !== null && Zf(Ne, S.current);
  }, []);
  F.useEffect(() => {
    a.screen === "briefing" && a.tutorialActive && I({ type: "START_CHALLENGE" });
  }, [a.screen, a.tutorialActive, I]);
  const _ = F.useRef("");
  F.useEffect(() => {
    if (a.screen !== "dispatch" || !a.dispatchDone || a.debrief === null) return;
    const K = `${a.debrief.missionId}:${a.debrief.crews}:${String(a.progress[a.debrief.missionId]?.attempts ?? 0)}`;
    _.current !== K && (_.current = K, Zf(a.debrief.verdict === "success" ? "success" : "failure", a.settings.sound));
  }, [a.screen, a.dispatchDone, a.debrief, a.progress, a.settings.sound]);
  const { progress: R, settings: L, tutorialDone: W } = a;
  F.useEffect(() => {
    og(l, Lg({ ...b.current, progress: R, settings: L, tutorialDone: W }));
  }, [l, R, L, W]), F.useEffect(() => {
    if (!a.autoPlay || a.screen !== "debrief") return;
    const K = globalThis.setTimeout(() => d({ type: "REPLAY_NEXT" }), x ? Bf + 600 : Bf);
    return () => globalThis.clearTimeout(K);
  }, [a.autoPlay, a.replayIndex, a.screen, x]);
  const $ = F.useRef(null), D = `${a.screen}:${a.missionId ?? ""}:${String(a.progress[a.missionId ?? ""]?.attempts ?? 0)}:${a.dispatchDone ? "done" : ""}:${a.settings.language}`, te = F.useRef(D);
  return F.useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
    }
    const K = k.current, Z = b.current, re = ut(Z), ue = gy(Z.settings.language);
    K !== null && D !== te.current && ex(Z, K)?.focus({ preventScroll: !0 }), document.title = Hy(ue, Z, re);
    const Ne = $.current;
    Ne !== null && (Ne.textContent = "");
    const $e = globalThis.setTimeout(() => {
      $.current !== null && ($.current.textContent = Uy(ue, Z, re, Z.debrief));
    }, 60);
    return () => globalThis.clearTimeout($e);
  }, [D]), /* @__PURE__ */ i.jsx(yy, { language: a.settings.language, children: /* @__PURE__ */ i.jsx(nx, { state: a, dispatch: I, bridge: n, storageMode: s, store: l, reducedMotion: x, resetDialog: f, setResetDialog: p, contentRef: k, announcerRef: $ }) });
}
function nx({ state: n, dispatch: s, bridge: l, storageMode: a, store: d, reducedMotion: f, resetDialog: p, setResetDialog: g, contentRef: x, announcerRef: k }) {
  const b = Se(), S = ut(n), C = a === "memory" ? b("settings.storage.qollab") : d === null ? b("settings.storage.memory") : b("settings.storage.local", { key: "q11.save.v1" }), I = b(a === "memory" ? "city.hud.storage.qollab" : d === null ? "city.hud.storage.memory" : "city.hud.storage.local"), _ = n.notice === za ? b("notice.progressReset") : n.notice === oh ? b("notice.saveReset") : n.notice, R = { state: n, dispatch: s, storageLabel: C }, L = /* @__PURE__ */ i.jsx(
    Py,
    {
      state: n,
      dispatch: s,
      storageNote: I,
      recentlySolved: n.celebrate,
      initialSelected: n.citySelect,
      onCelebrated: () => s({ type: "CELEBRATED" }),
      onSettings: () => s({ type: "OPEN_SETTINGS" }),
      onTitle: () => s({ type: "OPEN_TITLE" })
    }
  ), W = S === null || n.debrief === null ? null : { state: n, dispatch: s, mission: S, debrief: n.debrief, bridge: l, reducedMotion: f };
  let $;
  switch (n.screen) {
    case "title":
      $ = /* @__PURE__ */ i.jsx(B1, { ...R });
      break;
    case "how":
      $ = /* @__PURE__ */ i.jsx(q1, { ...R });
      break;
    case "settings":
      $ = /* @__PURE__ */ i.jsx(H1, { ...R, onReset: () => g(!0) });
      break;
    case "missions":
      $ = L;
      break;
    case "briefing":
      $ = S === null ? L : /* @__PURE__ */ i.jsx(Y1, { ...R, mission: S });
      break;
    case "training":
      $ = S === null ? L : /* @__PURE__ */ i.jsx(A1, { state: n, dispatch: s, mission: S });
      break;
    case "challenge":
      $ = S === null ? L : /* @__PURE__ */ i.jsx(
        F1,
        {
          mission: S,
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
      $ = W === null ? L : /* @__PURE__ */ i.jsx(W1, { ...W });
      break;
    case "debrief":
      $ = W === null ? L : /* @__PURE__ */ i.jsx(X1, { ...W });
      break;
    case "result":
      $ = W === null ? L : /* @__PURE__ */ i.jsx(V1, { ...R, mission: W.mission, debrief: W.debrief });
      break;
    case "summary":
      $ = /* @__PURE__ */ i.jsx(Q1, { ...R });
      break;
  }
  return /* @__PURE__ */ i.jsxs("div", { className: "app", "data-reduced-motion": f ? "true" : "false", "data-screen": n.screen, "data-language": n.settings.language, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "app-content", ref: x, "data-inert-root": !0, children: [
      _ !== null ? /* @__PURE__ */ i.jsx(Ky, { text: _, onDismiss: () => s({ type: "DISMISS_NOTICE" }) }) : null,
      $
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", "data-testid": "announcer", ref: k }),
    p ? /* @__PURE__ */ i.jsx(
      Ah,
      {
        title: b("settings.resetDialog.title"),
        confirmLabel: b("settings.resetDialog.confirm"),
        danger: !0,
        onConfirm: () => {
          s({ type: "RESET_PROGRESS" }), g(!1);
        },
        onCancel: () => g(!1),
        children: /* @__PURE__ */ i.jsx("p", { children: b("settings.resetDialog.body") })
      }
    ) : null
  ] });
}
function rx(n, s = {}) {
  n.replaceChildren();
  const l = J0.createRoot(n), a = {
    ...s.bridge === void 0 ? {} : { bridge: s.bridge },
    ...s.storage === void 0 ? {} : { storage: s.storage }
  };
  return l.render(
    /* @__PURE__ */ i.jsx(F.StrictMode, { children: /* @__PURE__ */ i.jsx(tx, { ...a }) })
  ), l;
}
export {
  rx as mountQ11
};
