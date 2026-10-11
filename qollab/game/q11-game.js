var ua = { exports: {} }, Ls = {}, da = { exports: {} }, ge = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bd;
function J0() {
  if (Bd) return ge;
  Bd = 1;
  var n = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), p = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), w = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), j = Symbol.iterator;
  function C(S) {
    return S === null || typeof S != "object" ? null : (S = j && S[j] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var L = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, O = Object.assign, R = {};
  function I(S, M, de) {
    this.props = S, this.context = M, this.refs = R, this.updater = de || L;
  }
  I.prototype.isReactComponent = {}, I.prototype.setState = function(S, M) {
    if (typeof S != "object" && typeof S != "function" && S != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, S, M, "setState");
  }, I.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function P() {
  }
  P.prototype = I.prototype;
  function _(S, M, de) {
    this.props = S, this.context = M, this.refs = R, this.updater = de || L;
  }
  var V = _.prototype = new P();
  V.constructor = _, O(V, I.prototype), V.isPureReactComponent = !0;
  var ne = Array.isArray, te = Object.prototype.hasOwnProperty, J = { current: null }, fe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function $(S, M, de) {
    var ue, ye = {}, xe = null, be = null;
    if (M != null) for (ue in M.ref !== void 0 && (be = M.ref), M.key !== void 0 && (xe = "" + M.key), M) te.call(M, ue) && !fe.hasOwnProperty(ue) && (ye[ue] = M[ue]);
    var ke = arguments.length - 2;
    if (ke === 1) ye.children = de;
    else if (1 < ke) {
      for (var Re = Array(ke), nt = 0; nt < ke; nt++) Re[nt] = arguments[nt + 2];
      ye.children = Re;
    }
    if (S && S.defaultProps) for (ue in ke = S.defaultProps, ke) ye[ue] === void 0 && (ye[ue] = ke[ue]);
    return { $$typeof: n, type: S, key: xe, ref: be, props: ye, _owner: J.current };
  }
  function me(S, M) {
    return { $$typeof: n, type: S.type, key: M, ref: S.ref, props: S.props, _owner: S._owner };
  }
  function he(S) {
    return typeof S == "object" && S !== null && S.$$typeof === n;
  }
  function oe(S) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(de) {
      return M[de];
    });
  }
  var Z = /\/+/g;
  function U(S, M) {
    return typeof S == "object" && S !== null && S.key != null ? oe("" + S.key) : M.toString(36);
  }
  function Se(S, M, de, ue, ye) {
    var xe = typeof S;
    (xe === "undefined" || xe === "boolean") && (S = null);
    var be = !1;
    if (S === null) be = !0;
    else switch (xe) {
      case "string":
      case "number":
        be = !0;
        break;
      case "object":
        switch (S.$$typeof) {
          case n:
          case s:
            be = !0;
        }
    }
    if (be) return be = S, ye = ye(be), S = ue === "" ? "." + U(be, 0) : ue, ne(ye) ? (de = "", S != null && (de = S.replace(Z, "$&/") + "/"), Se(ye, M, de, "", function(nt) {
      return nt;
    })) : ye != null && (he(ye) && (ye = me(ye, de + (!ye.key || be && be.key === ye.key ? "" : ("" + ye.key).replace(Z, "$&/") + "/") + S)), M.push(ye)), 1;
    if (be = 0, ue = ue === "" ? "." : ue + ":", ne(S)) for (var ke = 0; ke < S.length; ke++) {
      xe = S[ke];
      var Re = ue + U(xe, ke);
      be += Se(xe, M, de, Re, ye);
    }
    else if (Re = C(S), typeof Re == "function") for (S = Re.call(S), ke = 0; !(xe = S.next()).done; ) xe = xe.value, Re = ue + U(xe, ke++), be += Se(xe, M, de, Re, ye);
    else if (xe === "object") throw M = String(S), Error("Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead.");
    return be;
  }
  function ae(S, M, de) {
    if (S == null) return S;
    var ue = [], ye = 0;
    return Se(S, ue, "", "", function(xe) {
      return M.call(de, xe, ye++);
    }), ue;
  }
  function le(S) {
    if (S._status === -1) {
      var M = S._result;
      M = M(), M.then(function(de) {
        (S._status === 0 || S._status === -1) && (S._status = 1, S._result = de);
      }, function(de) {
        (S._status === 0 || S._status === -1) && (S._status = 2, S._result = de);
      }), S._status === -1 && (S._status = 0, S._result = M);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var we = { current: null }, W = { transition: null }, re = { ReactCurrentDispatcher: we, ReactCurrentBatchConfig: W, ReactCurrentOwner: J };
  function q() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ge.Children = { map: ae, forEach: function(S, M, de) {
    ae(S, function() {
      M.apply(this, arguments);
    }, de);
  }, count: function(S) {
    var M = 0;
    return ae(S, function() {
      M++;
    }), M;
  }, toArray: function(S) {
    return ae(S, function(M) {
      return M;
    }) || [];
  }, only: function(S) {
    if (!he(S)) throw Error("React.Children.only expected to receive a single React element child.");
    return S;
  } }, ge.Component = I, ge.Fragment = l, ge.Profiler = u, ge.PureComponent = _, ge.StrictMode = a, ge.Suspense = y, ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = re, ge.act = q, ge.cloneElement = function(S, M, de) {
    if (S == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + S + ".");
    var ue = O({}, S.props), ye = S.key, xe = S.ref, be = S._owner;
    if (M != null) {
      if (M.ref !== void 0 && (xe = M.ref, be = J.current), M.key !== void 0 && (ye = "" + M.key), S.type && S.type.defaultProps) var ke = S.type.defaultProps;
      for (Re in M) te.call(M, Re) && !fe.hasOwnProperty(Re) && (ue[Re] = M[Re] === void 0 && ke !== void 0 ? ke[Re] : M[Re]);
    }
    var Re = arguments.length - 2;
    if (Re === 1) ue.children = de;
    else if (1 < Re) {
      ke = Array(Re);
      for (var nt = 0; nt < Re; nt++) ke[nt] = arguments[nt + 2];
      ue.children = ke;
    }
    return { $$typeof: n, type: S.type, key: ye, ref: xe, props: ue, _owner: be };
  }, ge.createContext = function(S) {
    return S = { $$typeof: p, _currentValue: S, _currentValue2: S, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, S.Provider = { $$typeof: f, _context: S }, S.Consumer = S;
  }, ge.createElement = $, ge.createFactory = function(S) {
    var M = $.bind(null, S);
    return M.type = S, M;
  }, ge.createRef = function() {
    return { current: null };
  }, ge.forwardRef = function(S) {
    return { $$typeof: g, render: S };
  }, ge.isValidElement = he, ge.lazy = function(S) {
    return { $$typeof: b, _payload: { _status: -1, _result: S }, _init: le };
  }, ge.memo = function(S, M) {
    return { $$typeof: w, type: S, compare: M === void 0 ? null : M };
  }, ge.startTransition = function(S) {
    var M = W.transition;
    W.transition = {};
    try {
      S();
    } finally {
      W.transition = M;
    }
  }, ge.unstable_act = q, ge.useCallback = function(S, M) {
    return we.current.useCallback(S, M);
  }, ge.useContext = function(S) {
    return we.current.useContext(S);
  }, ge.useDebugValue = function() {
  }, ge.useDeferredValue = function(S) {
    return we.current.useDeferredValue(S);
  }, ge.useEffect = function(S, M) {
    return we.current.useEffect(S, M);
  }, ge.useId = function() {
    return we.current.useId();
  }, ge.useImperativeHandle = function(S, M, de) {
    return we.current.useImperativeHandle(S, M, de);
  }, ge.useInsertionEffect = function(S, M) {
    return we.current.useInsertionEffect(S, M);
  }, ge.useLayoutEffect = function(S, M) {
    return we.current.useLayoutEffect(S, M);
  }, ge.useMemo = function(S, M) {
    return we.current.useMemo(S, M);
  }, ge.useReducer = function(S, M, de) {
    return we.current.useReducer(S, M, de);
  }, ge.useRef = function(S) {
    return we.current.useRef(S);
  }, ge.useState = function(S) {
    return we.current.useState(S);
  }, ge.useSyncExternalStore = function(S, M, de) {
    return we.current.useSyncExternalStore(S, M, de);
  }, ge.useTransition = function() {
    return we.current.useTransition();
  }, ge.version = "18.3.1", ge;
}
var qd;
function Aa() {
  return qd || (qd = 1, da.exports = J0()), da.exports;
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
var Hd;
function em() {
  if (Hd) return Ls;
  Hd = 1;
  var n = Aa(), s = Symbol.for("react.element"), l = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(g, y, w) {
    var b, j = {}, C = null, L = null;
    w !== void 0 && (C = "" + w), y.key !== void 0 && (C = "" + y.key), y.ref !== void 0 && (L = y.ref);
    for (b in y) a.call(y, b) && !f.hasOwnProperty(b) && (j[b] = y[b]);
    if (g && g.defaultProps) for (b in y = g.defaultProps, y) j[b] === void 0 && (j[b] = y[b]);
    return { $$typeof: s, type: g, key: C, ref: L, props: j, _owner: u.current };
  }
  return Ls.Fragment = l, Ls.jsx = p, Ls.jsxs = p, Ls;
}
var Ud;
function tm() {
  return Ud || (Ud = 1, ua.exports = em()), ua.exports;
}
var i = tm(), z = Aa(), nl = {}, fa = { exports: {} }, yt = {}, ha = { exports: {} }, pa = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yd;
function nm() {
  return Yd || (Yd = 1, (function(n) {
    function s(W, re) {
      var q = W.length;
      W.push(re);
      e: for (; 0 < q; ) {
        var S = q - 1 >>> 1, M = W[S];
        if (0 < u(M, re)) W[S] = re, W[q] = M, q = S;
        else break e;
      }
    }
    function l(W) {
      return W.length === 0 ? null : W[0];
    }
    function a(W) {
      if (W.length === 0) return null;
      var re = W[0], q = W.pop();
      if (q !== re) {
        W[0] = q;
        e: for (var S = 0, M = W.length, de = M >>> 1; S < de; ) {
          var ue = 2 * (S + 1) - 1, ye = W[ue], xe = ue + 1, be = W[xe];
          if (0 > u(ye, q)) xe < M && 0 > u(be, ye) ? (W[S] = be, W[xe] = q, S = xe) : (W[S] = ye, W[ue] = q, S = ue);
          else if (xe < M && 0 > u(be, q)) W[S] = be, W[xe] = q, S = xe;
          else break e;
        }
      }
      return re;
    }
    function u(W, re) {
      var q = W.sortIndex - re.sortIndex;
      return q !== 0 ? q : W.id - re.id;
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
    var y = [], w = [], b = 1, j = null, C = 3, L = !1, O = !1, R = !1, I = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function V(W) {
      for (var re = l(w); re !== null; ) {
        if (re.callback === null) a(w);
        else if (re.startTime <= W) a(w), re.sortIndex = re.expirationTime, s(y, re);
        else break;
        re = l(w);
      }
    }
    function ne(W) {
      if (R = !1, V(W), !O) if (l(y) !== null) O = !0, le(te);
      else {
        var re = l(w);
        re !== null && we(ne, re.startTime - W);
      }
    }
    function te(W, re) {
      O = !1, R && (R = !1, P($), $ = -1), L = !0;
      var q = C;
      try {
        for (V(re), j = l(y); j !== null && (!(j.expirationTime > re) || W && !oe()); ) {
          var S = j.callback;
          if (typeof S == "function") {
            j.callback = null, C = j.priorityLevel;
            var M = S(j.expirationTime <= re);
            re = n.unstable_now(), typeof M == "function" ? j.callback = M : j === l(y) && a(y), V(re);
          } else a(y);
          j = l(y);
        }
        if (j !== null) var de = !0;
        else {
          var ue = l(w);
          ue !== null && we(ne, ue.startTime - re), de = !1;
        }
        return de;
      } finally {
        j = null, C = q, L = !1;
      }
    }
    var J = !1, fe = null, $ = -1, me = 5, he = -1;
    function oe() {
      return !(n.unstable_now() - he < me);
    }
    function Z() {
      if (fe !== null) {
        var W = n.unstable_now();
        he = W;
        var re = !0;
        try {
          re = fe(!0, W);
        } finally {
          re ? U() : (J = !1, fe = null);
        }
      } else J = !1;
    }
    var U;
    if (typeof _ == "function") U = function() {
      _(Z);
    };
    else if (typeof MessageChannel < "u") {
      var Se = new MessageChannel(), ae = Se.port2;
      Se.port1.onmessage = Z, U = function() {
        ae.postMessage(null);
      };
    } else U = function() {
      I(Z, 0);
    };
    function le(W) {
      fe = W, J || (J = !0, U());
    }
    function we(W, re) {
      $ = I(function() {
        W(n.unstable_now());
      }, re);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(W) {
      W.callback = null;
    }, n.unstable_continueExecution = function() {
      O || L || (O = !0, le(te));
    }, n.unstable_forceFrameRate = function(W) {
      0 > W || 125 < W ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : me = 0 < W ? Math.floor(1e3 / W) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return C;
    }, n.unstable_getFirstCallbackNode = function() {
      return l(y);
    }, n.unstable_next = function(W) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var re = 3;
          break;
        default:
          re = C;
      }
      var q = C;
      C = re;
      try {
        return W();
      } finally {
        C = q;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(W, re) {
      switch (W) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          W = 3;
      }
      var q = C;
      C = W;
      try {
        return re();
      } finally {
        C = q;
      }
    }, n.unstable_scheduleCallback = function(W, re, q) {
      var S = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? S + q : S) : q = S, W) {
        case 1:
          var M = -1;
          break;
        case 2:
          M = 250;
          break;
        case 5:
          M = 1073741823;
          break;
        case 4:
          M = 1e4;
          break;
        default:
          M = 5e3;
      }
      return M = q + M, W = { id: b++, callback: re, priorityLevel: W, startTime: q, expirationTime: M, sortIndex: -1 }, q > S ? (W.sortIndex = q, s(w, W), l(y) === null && W === l(w) && (R ? (P($), $ = -1) : R = !0, we(ne, q - S))) : (W.sortIndex = M, s(y, W), O || L || (O = !0, le(te))), W;
    }, n.unstable_shouldYield = oe, n.unstable_wrapCallback = function(W) {
      var re = C;
      return function() {
        var q = C;
        C = re;
        try {
          return W.apply(this, arguments);
        } finally {
          C = q;
        }
      };
    };
  })(pa)), pa;
}
var Vd;
function rm() {
  return Vd || (Vd = 1, ha.exports = nm()), ha.exports;
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
var Qd;
function sm() {
  if (Qd) return yt;
  Qd = 1;
  var n = Aa(), s = rm();
  function l(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), u = {};
  function f(e, t) {
    p(e, t), p(e + "Capture", t);
  }
  function p(e, t) {
    for (u[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), y = Object.prototype.hasOwnProperty, w = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, b = {}, j = {};
  function C(e) {
    return y.call(j, e) ? !0 : y.call(b, e) ? !1 : w.test(e) ? j[e] = !0 : (b[e] = !0, !1);
  }
  function L(e, t, r, o) {
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
  function O(e, t, r, o) {
    if (t === null || typeof t > "u" || L(e, t, r, o)) return !0;
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
  function R(e, t, r, o, c, d, h) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = h;
  }
  var I = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    I[e] = new R(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    I[t] = new R(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    I[e] = new R(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    I[e] = new R(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    I[e] = new R(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    I[e] = new R(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    I[e] = new R(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    I[e] = new R(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    I[e] = new R(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var P = /[\-:]([a-z])/g;
  function _(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      P,
      _
    );
    I[t] = new R(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(P, _);
    I[t] = new R(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(P, _);
    I[t] = new R(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    I[e] = new R(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), I.xlinkHref = new R("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    I[e] = new R(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function V(e, t, r, o) {
    var c = I.hasOwnProperty(t) ? I[t] : null;
    (c !== null ? c.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (O(t, r, c, o) && (r = null), o || c === null ? C(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : c.mustUseProperty ? e[c.propertyName] = r === null ? c.type === 3 ? !1 : "" : r : (t = c.attributeName, o = c.attributeNamespace, r === null ? e.removeAttribute(t) : (c = c.type, r = c === 3 || c === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
  }
  var ne = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, te = Symbol.for("react.element"), J = Symbol.for("react.portal"), fe = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), me = Symbol.for("react.profiler"), he = Symbol.for("react.provider"), oe = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), Se = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), le = Symbol.for("react.lazy"), we = Symbol.for("react.offscreen"), W = Symbol.iterator;
  function re(e) {
    return e === null || typeof e != "object" ? null : (e = W && e[W] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var q = Object.assign, S;
  function M(e) {
    if (S === void 0) try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      S = t && t[1] || "";
    }
    return `
` + S + e;
  }
  var de = !1;
  function ue(e, t) {
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
`), d = o.stack.split(`
`), h = c.length - 1, x = d.length - 1; 1 <= h && 0 <= x && c[h] !== d[x]; ) x--;
        for (; 1 <= h && 0 <= x; h--, x--) if (c[h] !== d[x]) {
          if (h !== 1 || x !== 1)
            do
              if (h--, x--, 0 > x || c[h] !== d[x]) {
                var k = `
` + c[h].replace(" at new ", " at ");
                return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), k;
              }
            while (1 <= h && 0 <= x);
          break;
        }
      }
    } finally {
      de = !1, Error.prepareStackTrace = r;
    }
    return (e = e ? e.displayName || e.name : "") ? M(e) : "";
  }
  function ye(e) {
    switch (e.tag) {
      case 5:
        return M(e.type);
      case 16:
        return M("Lazy");
      case 13:
        return M("Suspense");
      case 19:
        return M("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = ue(e.type, !1), e;
      case 11:
        return e = ue(e.type.render, !1), e;
      case 1:
        return e = ue(e.type, !0), e;
      default:
        return "";
    }
  }
  function xe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case fe:
        return "Fragment";
      case J:
        return "Portal";
      case me:
        return "Profiler";
      case $:
        return "StrictMode";
      case U:
        return "Suspense";
      case Se:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case oe:
        return (e.displayName || "Context") + ".Consumer";
      case he:
        return (e._context.displayName || "Context") + ".Provider";
      case Z:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ae:
        return t = e.displayName || null, t !== null ? t : xe(e.type) || "Memo";
      case le:
        t = e._payload, e = e._init;
        try {
          return xe(e(t));
        } catch {
        }
    }
    return null;
  }
  function be(e) {
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
        return xe(t);
      case 8:
        return t === $ ? "StrictMode" : "Mode";
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
  function ke(e) {
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
  function Re(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function nt(e) {
    var t = Re(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var c = r.get, d = r.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(h) {
        o = "" + h, d.call(this, h);
      } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(h) {
        o = "" + h;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function rr(e) {
    e._valueTracker || (e._valueTracker = nt(e));
  }
  function Bs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(), o = "";
    return e && (o = Re(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
  }
  function sr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ir(e, t) {
    var r = t.checked;
    return q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
  }
  function qs(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    r = ke(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Hs(e, t) {
    t = t.checked, t != null && V(e, "checked", t, !1);
  }
  function lr(e, t) {
    Hs(e, t);
    var r = ke(t.value), o = t.type;
    if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? dn(e, t.type, r) : t.hasOwnProperty("defaultValue") && dn(e, t.type, ke(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function kt(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
  }
  function dn(e, t, r) {
    (t !== "number" || sr(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Ke = Array.isArray;
  function Kt(e, t, r, o) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < r.length; c++) t["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++) c = t.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && o && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + ke(r), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, o && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function or(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(l(91));
    return q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Us(e, t) {
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
    e._wrapperState = { initialValue: ke(r) };
  }
  function B(e, t) {
    var r = ke(t.value), o = ke(t.defaultValue);
    r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
  }
  function ve(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Le(e) {
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
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Le(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Zt, Fn = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, r, o, c);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Zt = Zt || document.createElement("div"), Zt.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Zt.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Gt(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var fn = {
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
  }, qr = ["Webkit", "ms", "Moz", "O"];
  Object.keys(fn).forEach(function(e) {
    qr.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), fn[t] = fn[e];
    });
  });
  function Hr(e, t, r) {
    return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || fn.hasOwnProperty(e) && fn[e] ? ("" + t).trim() : t + "px";
  }
  function Ur(e, t) {
    e = e.style;
    for (var r in t) if (t.hasOwnProperty(r)) {
      var o = r.indexOf("--") === 0, c = Hr(r, t[r], o);
      r === "float" && (r = "cssFloat"), o ? e.setProperty(r, c) : e[r] = c;
    }
  }
  var Ys = q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ar(e, t) {
    if (t) {
      if (Ys[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(l(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(l(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(l(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(l(62));
    }
  }
  function hn(e, t) {
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
  var cr = null;
  function bl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Nl = null, ur = null, dr = null;
  function oc(e) {
    if (e = ms(e)) {
      if (typeof Nl != "function") throw Error(l(280));
      var t = e.stateNode;
      t && (t = yi(t), Nl(e.stateNode, e.type, t));
    }
  }
  function ac(e) {
    ur ? dr ? dr.push(e) : dr = [e] : ur = e;
  }
  function cc() {
    if (ur) {
      var e = ur, t = dr;
      if (dr = ur = null, oc(e), t) for (e = 0; e < t.length; e++) oc(t[e]);
    }
  }
  function uc(e, t) {
    return e(t);
  }
  function dc() {
  }
  var El = !1;
  function fc(e, t, r) {
    if (El) return e(t, r);
    El = !0;
    try {
      return uc(e, t, r);
    } finally {
      El = !1, (ur !== null || dr !== null) && (dc(), cc());
    }
  }
  function Yr(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var o = yi(r);
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
  var Cl = !1;
  if (g) try {
    var Vr = {};
    Object.defineProperty(Vr, "passive", { get: function() {
      Cl = !0;
    } }), window.addEventListener("test", Vr, Vr), window.removeEventListener("test", Vr, Vr);
  } catch {
    Cl = !1;
  }
  function ip(e, t, r, o, c, d, h, x, k) {
    var T = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, T);
    } catch (D) {
      this.onError(D);
    }
  }
  var Qr = !1, Vs = null, Qs = !1, Tl = null, lp = { onError: function(e) {
    Qr = !0, Vs = e;
  } };
  function op(e, t, r, o, c, d, h, x, k) {
    Qr = !1, Vs = null, ip.apply(lp, arguments);
  }
  function ap(e, t, r, o, c, d, h, x, k) {
    if (op.apply(this, arguments), Qr) {
      if (Qr) {
        var T = Vs;
        Qr = !1, Vs = null;
      } else throw Error(l(198));
      Qs || (Qs = !0, Tl = T);
    }
  }
  function zn(e) {
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
  function hc(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function pc(e) {
    if (zn(e) !== e) throw Error(l(188));
  }
  function cp(e) {
    var t = e.alternate;
    if (!t) {
      if (t = zn(e), t === null) throw Error(l(188));
      return t !== e ? null : e;
    }
    for (var r = e, o = t; ; ) {
      var c = r.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          r = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === r) return pc(c), e;
          if (d === o) return pc(c), t;
          d = d.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== o.return) r = c, o = d;
      else {
        for (var h = !1, x = c.child; x; ) {
          if (x === r) {
            h = !0, r = c, o = d;
            break;
          }
          if (x === o) {
            h = !0, o = c, r = d;
            break;
          }
          x = x.sibling;
        }
        if (!h) {
          for (x = d.child; x; ) {
            if (x === r) {
              h = !0, r = d, o = c;
              break;
            }
            if (x === o) {
              h = !0, o = d, r = c;
              break;
            }
            x = x.sibling;
          }
          if (!h) throw Error(l(189));
        }
      }
      if (r.alternate !== o) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
    return r.stateNode.current === r ? e : t;
  }
  function mc(e) {
    return e = cp(e), e !== null ? gc(e) : null;
  }
  function gc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = gc(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var yc = s.unstable_scheduleCallback, xc = s.unstable_cancelCallback, up = s.unstable_shouldYield, dp = s.unstable_requestPaint, We = s.unstable_now, fp = s.unstable_getCurrentPriorityLevel, Il = s.unstable_ImmediatePriority, wc = s.unstable_UserBlockingPriority, Ks = s.unstable_NormalPriority, hp = s.unstable_LowPriority, kc = s.unstable_IdlePriority, Gs = null, Bt = null;
  function pp(e) {
    if (Bt && typeof Bt.onCommitFiberRoot == "function") try {
      Bt.onCommitFiberRoot(Gs, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ot = Math.clz32 ? Math.clz32 : yp, mp = Math.log, gp = Math.LN2;
  function yp(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (mp(e) / gp | 0) | 0;
  }
  var Js = 64, ei = 4194304;
  function Kr(e) {
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
  function ti(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var o = 0, c = e.suspendedLanes, d = e.pingedLanes, h = r & 268435455;
    if (h !== 0) {
      var x = h & ~c;
      x !== 0 ? o = Kr(x) : (d &= h, d !== 0 && (o = Kr(d)));
    } else h = r & ~c, h !== 0 ? o = Kr(h) : d !== 0 && (o = Kr(d));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, d = t & -t, c >= d || c === 16 && (d & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - Ot(t), c = 1 << r, o |= e[r], t &= ~c;
    return o;
  }
  function xp(e, t) {
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
  function wp(e, t) {
    for (var r = e.suspendedLanes, o = e.pingedLanes, c = e.expirationTimes, d = e.pendingLanes; 0 < d; ) {
      var h = 31 - Ot(d), x = 1 << h, k = c[h];
      k === -1 ? ((x & r) === 0 || (x & o) !== 0) && (c[h] = xp(x, t)) : k <= t && (e.expiredLanes |= x), d &= ~x;
    }
  }
  function Ll(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function vc() {
    var e = Js;
    return Js <<= 1, (Js & 4194240) === 0 && (Js = 64), e;
  }
  function Rl(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function Gr(e, t, r) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ot(t), e[t] = r;
  }
  function kp(e, t) {
    var r = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var c = 31 - Ot(r), d = 1 << c;
      t[c] = 0, o[c] = -1, e[c] = -1, r &= ~d;
    }
  }
  function _l(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var o = 31 - Ot(r), c = 1 << o;
      c & t | e[o] & t && (e[o] |= t), r &= ~c;
    }
  }
  var Ie = 0;
  function jc(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Sc, Ol, bc, Nc, Ec, Ml = !1, ni = [], pn = null, mn = null, gn = null, Jr = /* @__PURE__ */ new Map(), es = /* @__PURE__ */ new Map(), yn = [], vp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Cc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        pn = null;
        break;
      case "dragenter":
      case "dragleave":
        mn = null;
        break;
      case "mouseover":
      case "mouseout":
        gn = null;
        break;
      case "pointerover":
      case "pointerout":
        Jr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        es.delete(t.pointerId);
    }
  }
  function ts(e, t, r, o, c, d) {
    return e === null || e.nativeEvent !== d ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, t !== null && (t = ms(t), t !== null && Ol(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function jp(e, t, r, o, c) {
    switch (t) {
      case "focusin":
        return pn = ts(pn, e, t, r, o, c), !0;
      case "dragenter":
        return mn = ts(mn, e, t, r, o, c), !0;
      case "mouseover":
        return gn = ts(gn, e, t, r, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Jr.set(d, ts(Jr.get(d) || null, e, t, r, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, es.set(d, ts(es.get(d) || null, e, t, r, o, c)), !0;
    }
    return !1;
  }
  function Tc(e) {
    var t = Xn(e.target);
    if (t !== null) {
      var r = zn(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = hc(r), t !== null) {
            e.blockedOn = t, Ec(e.priority, function() {
              bc(r);
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
  function ri(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = $l(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var o = new r.constructor(r.type, r);
        cr = o, r.target.dispatchEvent(o), cr = null;
      } else return t = ms(r), t !== null && Ol(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function Ic(e, t, r) {
    ri(e) && r.delete(t);
  }
  function Sp() {
    Ml = !1, pn !== null && ri(pn) && (pn = null), mn !== null && ri(mn) && (mn = null), gn !== null && ri(gn) && (gn = null), Jr.forEach(Ic), es.forEach(Ic);
  }
  function ns(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ml || (Ml = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, Sp)));
  }
  function rs(e) {
    function t(c) {
      return ns(c, e);
    }
    if (0 < ni.length) {
      ns(ni[0], e);
      for (var r = 1; r < ni.length; r++) {
        var o = ni[r];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (pn !== null && ns(pn, e), mn !== null && ns(mn, e), gn !== null && ns(gn, e), Jr.forEach(t), es.forEach(t), r = 0; r < yn.length; r++) o = yn[r], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < yn.length && (r = yn[0], r.blockedOn === null); ) Tc(r), r.blockedOn === null && yn.shift();
  }
  var fr = ne.ReactCurrentBatchConfig, si = !0;
  function bp(e, t, r, o) {
    var c = Ie, d = fr.transition;
    fr.transition = null;
    try {
      Ie = 1, Pl(e, t, r, o);
    } finally {
      Ie = c, fr.transition = d;
    }
  }
  function Np(e, t, r, o) {
    var c = Ie, d = fr.transition;
    fr.transition = null;
    try {
      Ie = 4, Pl(e, t, r, o);
    } finally {
      Ie = c, fr.transition = d;
    }
  }
  function Pl(e, t, r, o) {
    if (si) {
      var c = $l(e, t, r, o);
      if (c === null) Jl(e, t, o, ii, r), Cc(e, o);
      else if (jp(c, e, t, r, o)) o.stopPropagation();
      else if (Cc(e, o), t & 4 && -1 < vp.indexOf(e)) {
        for (; c !== null; ) {
          var d = ms(c);
          if (d !== null && Sc(d), d = $l(e, t, r, o), d === null && Jl(e, t, o, ii, r), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Jl(e, t, o, null, r);
    }
  }
  var ii = null;
  function $l(e, t, r, o) {
    if (ii = null, e = bl(o), e = Xn(e), e !== null) if (t = zn(e), t === null) e = null;
    else if (r = t.tag, r === 13) {
      if (e = hc(t), e !== null) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return ii = e, null;
  }
  function Lc(e) {
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
        switch (fp()) {
          case Il:
            return 1;
          case wc:
            return 4;
          case Ks:
          case hp:
            return 16;
          case kc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var xn = null, Al = null, li = null;
  function Rc() {
    if (li) return li;
    var e, t = Al, r = t.length, o, c = "value" in xn ? xn.value : xn.textContent, d = c.length;
    for (e = 0; e < r && t[e] === c[e]; e++) ;
    var h = r - e;
    for (o = 1; o <= h && t[r - o] === c[d - o]; o++) ;
    return li = c.slice(e, 1 < o ? 1 - o : void 0);
  }
  function oi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ai() {
    return !0;
  }
  function _c() {
    return !1;
  }
  function vt(e) {
    function t(r, o, c, d, h) {
      this._reactName = r, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = h, this.currentTarget = null;
      for (var x in e) e.hasOwnProperty(x) && (r = e[x], this[x] = r ? r(d) : d[x]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ai : _c, this.isPropagationStopped = _c, this;
    }
    return q(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = ai);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = ai);
    }, persist: function() {
    }, isPersistent: ai }), t;
  }
  var hr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Dl = vt(hr), ss = q({}, hr, { view: 0, detail: 0 }), Ep = vt(ss), Fl, zl, is, ci = q({}, ss, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Wl, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== is && (is && e.type === "mousemove" ? (Fl = e.screenX - is.screenX, zl = e.screenY - is.screenY) : zl = Fl = 0, is = e), Fl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : zl;
  } }), Oc = vt(ci), Cp = q({}, ci, { dataTransfer: 0 }), Tp = vt(Cp), Ip = q({}, ss, { relatedTarget: 0 }), Xl = vt(Ip), Lp = q({}, hr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rp = vt(Lp), _p = q({}, hr, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Op = vt(_p), Mp = q({}, hr, { data: 0 }), Mc = vt(Mp), Pp = {
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
  }, $p = {
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
  }, Ap = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Dp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Ap[e]) ? !!t[e] : !1;
  }
  function Wl() {
    return Dp;
  }
  var Fp = q({}, ss, { key: function(e) {
    if (e.key) {
      var t = Pp[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = oi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $p[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Wl, charCode: function(e) {
    return e.type === "keypress" ? oi(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? oi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), zp = vt(Fp), Xp = q({}, ci, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pc = vt(Xp), Wp = q({}, ss, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Wl }), Zp = vt(Wp), Bp = q({}, hr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qp = vt(Bp), Hp = q({}, ci, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Up = vt(Hp), Yp = [9, 13, 27, 32], Zl = g && "CompositionEvent" in window, ls = null;
  g && "documentMode" in document && (ls = document.documentMode);
  var Vp = g && "TextEvent" in window && !ls, $c = g && (!Zl || ls && 8 < ls && 11 >= ls), Ac = " ", Dc = !1;
  function Fc(e, t) {
    switch (e) {
      case "keyup":
        return Yp.indexOf(t.keyCode) !== -1;
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
  function zc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pr = !1;
  function Qp(e, t) {
    switch (e) {
      case "compositionend":
        return zc(t);
      case "keypress":
        return t.which !== 32 ? null : (Dc = !0, Ac);
      case "textInput":
        return e = t.data, e === Ac && Dc ? null : e;
      default:
        return null;
    }
  }
  function Kp(e, t) {
    if (pr) return e === "compositionend" || !Zl && Fc(e, t) ? (e = Rc(), li = Al = xn = null, pr = !1, e) : null;
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
        return $c && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Gp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Xc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Gp[e.type] : t === "textarea";
  }
  function Wc(e, t, r, o) {
    ac(o), t = pi(t, "onChange"), 0 < t.length && (r = new Dl("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
  }
  var os = null, as = null;
  function Jp(e) {
    lu(e, 0);
  }
  function ui(e) {
    var t = wr(e);
    if (Bs(t)) return e;
  }
  function e0(e, t) {
    if (e === "change") return t;
  }
  var Zc = !1;
  if (g) {
    var Bl;
    if (g) {
      var ql = "oninput" in document;
      if (!ql) {
        var Bc = document.createElement("div");
        Bc.setAttribute("oninput", "return;"), ql = typeof Bc.oninput == "function";
      }
      Bl = ql;
    } else Bl = !1;
    Zc = Bl && (!document.documentMode || 9 < document.documentMode);
  }
  function qc() {
    os && (os.detachEvent("onpropertychange", Hc), as = os = null);
  }
  function Hc(e) {
    if (e.propertyName === "value" && ui(as)) {
      var t = [];
      Wc(t, as, e, bl(e)), fc(Jp, t);
    }
  }
  function t0(e, t, r) {
    e === "focusin" ? (qc(), os = t, as = r, os.attachEvent("onpropertychange", Hc)) : e === "focusout" && qc();
  }
  function n0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return ui(as);
  }
  function r0(e, t) {
    if (e === "click") return ui(t);
  }
  function s0(e, t) {
    if (e === "input" || e === "change") return ui(t);
  }
  function i0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Mt = typeof Object.is == "function" ? Object.is : i0;
  function cs(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var r = Object.keys(e), o = Object.keys(t);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var c = r[o];
      if (!y.call(t, c) || !Mt(e[c], t[c])) return !1;
    }
    return !0;
  }
  function Uc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Yc(e, t) {
    var r = Uc(e);
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
      r = Uc(r);
    }
  }
  function Vc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Qc() {
    for (var e = window, t = sr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = sr(e.document);
    }
    return t;
  }
  function Hl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function l0(e) {
    var t = Qc(), r = e.focusedElem, o = e.selectionRange;
    if (t !== r && r && r.ownerDocument && Vc(r.ownerDocument.documentElement, r)) {
      if (o !== null && Hl(r)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
        else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var c = r.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !e.extend && d > o && (c = o, o = d, d = c), c = Yc(r, d);
          var h = Yc(
            r,
            o
          );
          c && h && (e.rangeCount !== 1 || e.anchorNode !== c.node || e.anchorOffset !== c.offset || e.focusNode !== h.node || e.focusOffset !== h.offset) && (t = t.createRange(), t.setStart(c.node, c.offset), e.removeAllRanges(), d > o ? (e.addRange(t), e.extend(h.node, h.offset)) : (t.setEnd(h.node, h.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var o0 = g && "documentMode" in document && 11 >= document.documentMode, mr = null, Ul = null, us = null, Yl = !1;
  function Kc(e, t, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Yl || mr == null || mr !== sr(o) || (o = mr, "selectionStart" in o && Hl(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), us && cs(us, o) || (us = o, o = pi(Ul, "onSelect"), 0 < o.length && (t = new Dl("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = mr)));
  }
  function di(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var gr = { animationend: di("Animation", "AnimationEnd"), animationiteration: di("Animation", "AnimationIteration"), animationstart: di("Animation", "AnimationStart"), transitionend: di("Transition", "TransitionEnd") }, Vl = {}, Gc = {};
  g && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete gr.animationend.animation, delete gr.animationiteration.animation, delete gr.animationstart.animation), "TransitionEvent" in window || delete gr.transitionend.transition);
  function fi(e) {
    if (Vl[e]) return Vl[e];
    if (!gr[e]) return e;
    var t = gr[e], r;
    for (r in t) if (t.hasOwnProperty(r) && r in Gc) return Vl[e] = t[r];
    return e;
  }
  var Jc = fi("animationend"), eu = fi("animationiteration"), tu = fi("animationstart"), nu = fi("transitionend"), ru = /* @__PURE__ */ new Map(), su = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function wn(e, t) {
    ru.set(e, t), f(t, [e]);
  }
  for (var Ql = 0; Ql < su.length; Ql++) {
    var Kl = su[Ql], a0 = Kl.toLowerCase(), c0 = Kl[0].toUpperCase() + Kl.slice(1);
    wn(a0, "on" + c0);
  }
  wn(Jc, "onAnimationEnd"), wn(eu, "onAnimationIteration"), wn(tu, "onAnimationStart"), wn("dblclick", "onDoubleClick"), wn("focusin", "onFocus"), wn("focusout", "onBlur"), wn(nu, "onTransitionEnd"), p("onMouseEnter", ["mouseout", "mouseover"]), p("onMouseLeave", ["mouseout", "mouseover"]), p("onPointerEnter", ["pointerout", "pointerover"]), p("onPointerLeave", ["pointerout", "pointerover"]), f("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), f("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), f("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), f("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), f("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ds = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), u0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ds));
  function iu(e, t, r) {
    var o = e.type || "unknown-event";
    e.currentTarget = r, ap(o, t, void 0, e), e.currentTarget = null;
  }
  function lu(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var o = e[r], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (t) for (var h = o.length - 1; 0 <= h; h--) {
          var x = o[h], k = x.instance, T = x.currentTarget;
          if (x = x.listener, k !== d && c.isPropagationStopped()) break e;
          iu(c, x, T), d = k;
        }
        else for (h = 0; h < o.length; h++) {
          if (x = o[h], k = x.instance, T = x.currentTarget, x = x.listener, k !== d && c.isPropagationStopped()) break e;
          iu(c, x, T), d = k;
        }
      }
    }
    if (Qs) throw e = Tl, Qs = !1, Tl = null, e;
  }
  function Me(e, t) {
    var r = t[io];
    r === void 0 && (r = t[io] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    r.has(o) || (ou(t, e, 2, !1), r.add(o));
  }
  function Gl(e, t, r) {
    var o = 0;
    t && (o |= 4), ou(r, e, o, t);
  }
  var hi = "_reactListening" + Math.random().toString(36).slice(2);
  function fs(e) {
    if (!e[hi]) {
      e[hi] = !0, a.forEach(function(r) {
        r !== "selectionchange" && (u0.has(r) || Gl(r, !1, e), Gl(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[hi] || (t[hi] = !0, Gl("selectionchange", !1, t));
    }
  }
  function ou(e, t, r, o) {
    switch (Lc(t)) {
      case 1:
        var c = bp;
        break;
      case 4:
        c = Np;
        break;
      default:
        c = Pl;
    }
    r = c.bind(null, t, r, e), c = void 0, !Cl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), o ? c !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: c }) : e.addEventListener(t, r, !0) : c !== void 0 ? e.addEventListener(t, r, { passive: c }) : e.addEventListener(t, r, !1);
  }
  function Jl(e, t, r, o, c) {
    var d = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var h = o.tag;
      if (h === 3 || h === 4) {
        var x = o.stateNode.containerInfo;
        if (x === c || x.nodeType === 8 && x.parentNode === c) break;
        if (h === 4) for (h = o.return; h !== null; ) {
          var k = h.tag;
          if ((k === 3 || k === 4) && (k = h.stateNode.containerInfo, k === c || k.nodeType === 8 && k.parentNode === c)) return;
          h = h.return;
        }
        for (; x !== null; ) {
          if (h = Xn(x), h === null) return;
          if (k = h.tag, k === 5 || k === 6) {
            o = d = h;
            continue e;
          }
          x = x.parentNode;
        }
      }
      o = o.return;
    }
    fc(function() {
      var T = d, D = bl(r), F = [];
      e: {
        var A = ru.get(e);
        if (A !== void 0) {
          var H = Dl, K = e;
          switch (e) {
            case "keypress":
              if (oi(r) === 0) break e;
            case "keydown":
            case "keyup":
              H = zp;
              break;
            case "focusin":
              K = "focus", H = Xl;
              break;
            case "focusout":
              K = "blur", H = Xl;
              break;
            case "beforeblur":
            case "afterblur":
              H = Xl;
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
              H = Oc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = Tp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = Zp;
              break;
            case Jc:
            case eu:
            case tu:
              H = Rp;
              break;
            case nu:
              H = qp;
              break;
            case "scroll":
              H = Ep;
              break;
            case "wheel":
              H = Up;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = Op;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = Pc;
          }
          var G = (t & 4) !== 0, Ze = !G && e === "scroll", N = G ? A !== null ? A + "Capture" : null : A;
          G = [];
          for (var v = T, E; v !== null; ) {
            E = v;
            var X = E.stateNode;
            if (E.tag === 5 && X !== null && (E = X, N !== null && (X = Yr(v, N), X != null && G.push(hs(v, X, E)))), Ze) break;
            v = v.return;
          }
          0 < G.length && (A = new H(A, K, null, r, D), F.push({ event: A, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (A = e === "mouseover" || e === "pointerover", H = e === "mouseout" || e === "pointerout", A && r !== cr && (K = r.relatedTarget || r.fromElement) && (Xn(K) || K[Jt])) break e;
          if ((H || A) && (A = D.window === D ? D : (A = D.ownerDocument) ? A.defaultView || A.parentWindow : window, H ? (K = r.relatedTarget || r.toElement, H = T, K = K ? Xn(K) : null, K !== null && (Ze = zn(K), K !== Ze || K.tag !== 5 && K.tag !== 6) && (K = null)) : (H = null, K = T), H !== K)) {
            if (G = Oc, X = "onMouseLeave", N = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (G = Pc, X = "onPointerLeave", N = "onPointerEnter", v = "pointer"), Ze = H == null ? A : wr(H), E = K == null ? A : wr(K), A = new G(X, v + "leave", H, r, D), A.target = Ze, A.relatedTarget = E, X = null, Xn(D) === T && (G = new G(N, v + "enter", K, r, D), G.target = E, G.relatedTarget = Ze, X = G), Ze = X, H && K) t: {
              for (G = H, N = K, v = 0, E = G; E; E = yr(E)) v++;
              for (E = 0, X = N; X; X = yr(X)) E++;
              for (; 0 < v - E; ) G = yr(G), v--;
              for (; 0 < E - v; ) N = yr(N), E--;
              for (; v--; ) {
                if (G === N || N !== null && G === N.alternate) break t;
                G = yr(G), N = yr(N);
              }
              G = null;
            }
            else G = null;
            H !== null && au(F, A, H, G, !1), K !== null && Ze !== null && au(F, Ze, K, G, !0);
          }
        }
        e: {
          if (A = T ? wr(T) : window, H = A.nodeName && A.nodeName.toLowerCase(), H === "select" || H === "input" && A.type === "file") var ee = e0;
          else if (Xc(A)) if (Zc) ee = s0;
          else {
            ee = n0;
            var se = t0;
          }
          else (H = A.nodeName) && H.toLowerCase() === "input" && (A.type === "checkbox" || A.type === "radio") && (ee = r0);
          if (ee && (ee = ee(e, T))) {
            Wc(F, ee, r, D);
            break e;
          }
          se && se(e, A, T), e === "focusout" && (se = A._wrapperState) && se.controlled && A.type === "number" && dn(A, "number", A.value);
        }
        switch (se = T ? wr(T) : window, e) {
          case "focusin":
            (Xc(se) || se.contentEditable === "true") && (mr = se, Ul = T, us = null);
            break;
          case "focusout":
            us = Ul = mr = null;
            break;
          case "mousedown":
            Yl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Yl = !1, Kc(F, r, D);
            break;
          case "selectionchange":
            if (o0) break;
          case "keydown":
          case "keyup":
            Kc(F, r, D);
        }
        var ie;
        if (Zl) e: {
          switch (e) {
            case "compositionstart":
              var ce = "onCompositionStart";
              break e;
            case "compositionend":
              ce = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ce = "onCompositionUpdate";
              break e;
          }
          ce = void 0;
        }
        else pr ? Fc(e, r) && (ce = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ce = "onCompositionStart");
        ce && ($c && r.locale !== "ko" && (pr || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && pr && (ie = Rc()) : (xn = D, Al = "value" in xn ? xn.value : xn.textContent, pr = !0)), se = pi(T, ce), 0 < se.length && (ce = new Mc(ce, e, null, r, D), F.push({ event: ce, listeners: se }), ie ? ce.data = ie : (ie = zc(r), ie !== null && (ce.data = ie)))), (ie = Vp ? Qp(e, r) : Kp(e, r)) && (T = pi(T, "onBeforeInput"), 0 < T.length && (D = new Mc("onBeforeInput", "beforeinput", null, r, D), F.push({ event: D, listeners: T }), D.data = ie));
      }
      lu(F, t);
    });
  }
  function hs(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function pi(e, t) {
    for (var r = t + "Capture", o = []; e !== null; ) {
      var c = e, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Yr(e, r), d != null && o.unshift(hs(e, d, c)), d = Yr(e, t), d != null && o.push(hs(e, d, c))), e = e.return;
    }
    return o;
  }
  function yr(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function au(e, t, r, o, c) {
    for (var d = t._reactName, h = []; r !== null && r !== o; ) {
      var x = r, k = x.alternate, T = x.stateNode;
      if (k !== null && k === o) break;
      x.tag === 5 && T !== null && (x = T, c ? (k = Yr(r, d), k != null && h.unshift(hs(r, k, x))) : c || (k = Yr(r, d), k != null && h.push(hs(r, k, x)))), r = r.return;
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var d0 = /\r\n?/g, f0 = /\u0000|\uFFFD/g;
  function cu(e) {
    return (typeof e == "string" ? e : "" + e).replace(d0, `
`).replace(f0, "");
  }
  function mi(e, t, r) {
    if (t = cu(t), cu(e) !== t && r) throw Error(l(425));
  }
  function gi() {
  }
  var eo = null, to = null;
  function no(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ro = typeof setTimeout == "function" ? setTimeout : void 0, h0 = typeof clearTimeout == "function" ? clearTimeout : void 0, uu = typeof Promise == "function" ? Promise : void 0, p0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof uu < "u" ? function(e) {
    return uu.resolve(null).then(e).catch(m0);
  } : ro;
  function m0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function so(e, t) {
    var r = t, o = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8) if (r = c.data, r === "/$") {
        if (o === 0) {
          e.removeChild(c), rs(t);
          return;
        }
        o--;
      } else r !== "$" && r !== "$?" && r !== "$!" || o++;
      r = c;
    } while (r);
    rs(t);
  }
  function kn(e) {
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
  function du(e) {
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
  var xr = Math.random().toString(36).slice(2), qt = "__reactFiber$" + xr, ps = "__reactProps$" + xr, Jt = "__reactContainer$" + xr, io = "__reactEvents$" + xr, g0 = "__reactListeners$" + xr, y0 = "__reactHandles$" + xr;
  function Xn(e) {
    var t = e[qt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Jt] || r[qt]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = du(e); e !== null; ) {
          if (r = e[qt]) return r;
          e = du(e);
        }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function ms(e) {
    return e = e[qt] || e[Jt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function wr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(l(33));
  }
  function yi(e) {
    return e[ps] || null;
  }
  var lo = [], kr = -1;
  function vn(e) {
    return { current: e };
  }
  function Pe(e) {
    0 > kr || (e.current = lo[kr], lo[kr] = null, kr--);
  }
  function _e(e, t) {
    kr++, lo[kr] = e.current, e.current = t;
  }
  var jn = {}, rt = vn(jn), ft = vn(!1), Wn = jn;
  function vr(e, t) {
    var r = e.type.contextTypes;
    if (!r) return jn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in r) c[d] = t[d];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function ht(e) {
    return e = e.childContextTypes, e != null;
  }
  function xi() {
    Pe(ft), Pe(rt);
  }
  function fu(e, t, r) {
    if (rt.current !== jn) throw Error(l(168));
    _e(rt, t), _e(ft, r);
  }
  function hu(e, t, r) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
    o = o.getChildContext();
    for (var c in o) if (!(c in t)) throw Error(l(108, be(e) || "Unknown", c));
    return q({}, r, o);
  }
  function wi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jn, Wn = rt.current, _e(rt, e), _e(ft, ft.current), !0;
  }
  function pu(e, t, r) {
    var o = e.stateNode;
    if (!o) throw Error(l(169));
    r ? (e = hu(e, t, Wn), o.__reactInternalMemoizedMergedChildContext = e, Pe(ft), Pe(rt), _e(rt, e)) : Pe(ft), _e(ft, r);
  }
  var en = null, ki = !1, oo = !1;
  function mu(e) {
    en === null ? en = [e] : en.push(e);
  }
  function x0(e) {
    ki = !0, mu(e);
  }
  function Sn() {
    if (!oo && en !== null) {
      oo = !0;
      var e = 0, t = Ie;
      try {
        var r = en;
        for (Ie = 1; e < r.length; e++) {
          var o = r[e];
          do
            o = o(!0);
          while (o !== null);
        }
        en = null, ki = !1;
      } catch (c) {
        throw en !== null && (en = en.slice(e + 1)), yc(Il, Sn), c;
      } finally {
        Ie = t, oo = !1;
      }
    }
    return null;
  }
  var jr = [], Sr = 0, vi = null, ji = 0, Ct = [], Tt = 0, Zn = null, tn = 1, nn = "";
  function Bn(e, t) {
    jr[Sr++] = ji, jr[Sr++] = vi, vi = e, ji = t;
  }
  function gu(e, t, r) {
    Ct[Tt++] = tn, Ct[Tt++] = nn, Ct[Tt++] = Zn, Zn = e;
    var o = tn;
    e = nn;
    var c = 32 - Ot(o) - 1;
    o &= ~(1 << c), r += 1;
    var d = 32 - Ot(t) + c;
    if (30 < d) {
      var h = c - c % 5;
      d = (o & (1 << h) - 1).toString(32), o >>= h, c -= h, tn = 1 << 32 - Ot(t) + c | r << c | o, nn = d + e;
    } else tn = 1 << d | r << c | o, nn = e;
  }
  function ao(e) {
    e.return !== null && (Bn(e, 1), gu(e, 1, 0));
  }
  function co(e) {
    for (; e === vi; ) vi = jr[--Sr], jr[Sr] = null, ji = jr[--Sr], jr[Sr] = null;
    for (; e === Zn; ) Zn = Ct[--Tt], Ct[Tt] = null, nn = Ct[--Tt], Ct[Tt] = null, tn = Ct[--Tt], Ct[Tt] = null;
  }
  var jt = null, St = null, Ae = !1, Pt = null;
  function yu(e, t) {
    var r = _t(5, null, null, 0);
    r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
  }
  function xu(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, jt = e, St = kn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, jt = e, St = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Zn !== null ? { id: tn, overflow: nn } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = _t(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, jt = e, St = null, !0) : !1;
      default:
        return !1;
    }
  }
  function uo(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function fo(e) {
    if (Ae) {
      var t = St;
      if (t) {
        var r = t;
        if (!xu(e, t)) {
          if (uo(e)) throw Error(l(418));
          t = kn(r.nextSibling);
          var o = jt;
          t && xu(e, t) ? yu(o, r) : (e.flags = e.flags & -4097 | 2, Ae = !1, jt = e);
        }
      } else {
        if (uo(e)) throw Error(l(418));
        e.flags = e.flags & -4097 | 2, Ae = !1, jt = e;
      }
    }
  }
  function wu(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    jt = e;
  }
  function Si(e) {
    if (e !== jt) return !1;
    if (!Ae) return wu(e), Ae = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !no(e.type, e.memoizedProps)), t && (t = St)) {
      if (uo(e)) throw ku(), Error(l(418));
      for (; t; ) yu(e, t), t = kn(t.nextSibling);
    }
    if (wu(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                St = kn(e.nextSibling);
                break e;
              }
              t--;
            } else r !== "$" && r !== "$!" && r !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        St = null;
      }
    } else St = jt ? kn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ku() {
    for (var e = St; e; ) e = kn(e.nextSibling);
  }
  function br() {
    St = jt = null, Ae = !1;
  }
  function ho(e) {
    Pt === null ? Pt = [e] : Pt.push(e);
  }
  var w0 = ne.ReactCurrentBatchConfig;
  function gs(e, t, r) {
    if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (r._owner) {
        if (r = r._owner, r) {
          if (r.tag !== 1) throw Error(l(309));
          var o = r.stateNode;
        }
        if (!o) throw Error(l(147, e));
        var c = o, d = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === d ? t.ref : (t = function(h) {
          var x = c.refs;
          h === null ? delete x[d] : x[d] = h;
        }, t._stringRef = d, t);
      }
      if (typeof e != "string") throw Error(l(284));
      if (!r._owner) throw Error(l(290, e));
    }
    return e;
  }
  function bi(e, t) {
    throw e = Object.prototype.toString.call(t), Error(l(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function vu(e) {
    var t = e._init;
    return t(e._payload);
  }
  function ju(e) {
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
      return N = Rn(N, v), N.index = 0, N.sibling = null, N;
    }
    function d(N, v, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < v ? (N.flags |= 2, v) : E) : (N.flags |= 2, v)) : (N.flags |= 1048576, v);
    }
    function h(N) {
      return e && N.alternate === null && (N.flags |= 2), N;
    }
    function x(N, v, E, X) {
      return v === null || v.tag !== 6 ? (v = sa(E, N.mode, X), v.return = N, v) : (v = c(v, E), v.return = N, v);
    }
    function k(N, v, E, X) {
      var ee = E.type;
      return ee === fe ? D(N, v, E.props.children, X, E.key) : v !== null && (v.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === le && vu(ee) === v.type) ? (X = c(v, E.props), X.ref = gs(N, v, E), X.return = N, X) : (X = Yi(E.type, E.key, E.props, null, N.mode, X), X.ref = gs(N, v, E), X.return = N, X);
    }
    function T(N, v, E, X) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== E.containerInfo || v.stateNode.implementation !== E.implementation ? (v = ia(E, N.mode, X), v.return = N, v) : (v = c(v, E.children || []), v.return = N, v);
    }
    function D(N, v, E, X, ee) {
      return v === null || v.tag !== 7 ? (v = Gn(E, N.mode, X, ee), v.return = N, v) : (v = c(v, E), v.return = N, v);
    }
    function F(N, v, E) {
      if (typeof v == "string" && v !== "" || typeof v == "number") return v = sa("" + v, N.mode, E), v.return = N, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case te:
            return E = Yi(v.type, v.key, v.props, null, N.mode, E), E.ref = gs(N, null, v), E.return = N, E;
          case J:
            return v = ia(v, N.mode, E), v.return = N, v;
          case le:
            var X = v._init;
            return F(N, X(v._payload), E);
        }
        if (Ke(v) || re(v)) return v = Gn(v, N.mode, E, null), v.return = N, v;
        bi(N, v);
      }
      return null;
    }
    function A(N, v, E, X) {
      var ee = v !== null ? v.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number") return ee !== null ? null : x(N, v, "" + E, X);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case te:
            return E.key === ee ? k(N, v, E, X) : null;
          case J:
            return E.key === ee ? T(N, v, E, X) : null;
          case le:
            return ee = E._init, A(
              N,
              v,
              ee(E._payload),
              X
            );
        }
        if (Ke(E) || re(E)) return ee !== null ? null : D(N, v, E, X, null);
        bi(N, E);
      }
      return null;
    }
    function H(N, v, E, X, ee) {
      if (typeof X == "string" && X !== "" || typeof X == "number") return N = N.get(E) || null, x(v, N, "" + X, ee);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case te:
            return N = N.get(X.key === null ? E : X.key) || null, k(v, N, X, ee);
          case J:
            return N = N.get(X.key === null ? E : X.key) || null, T(v, N, X, ee);
          case le:
            var se = X._init;
            return H(N, v, E, se(X._payload), ee);
        }
        if (Ke(X) || re(X)) return N = N.get(E) || null, D(v, N, X, ee, null);
        bi(v, X);
      }
      return null;
    }
    function K(N, v, E, X) {
      for (var ee = null, se = null, ie = v, ce = v = 0, Qe = null; ie !== null && ce < E.length; ce++) {
        ie.index > ce ? (Qe = ie, ie = null) : Qe = ie.sibling;
        var Ne = A(N, ie, E[ce], X);
        if (Ne === null) {
          ie === null && (ie = Qe);
          break;
        }
        e && ie && Ne.alternate === null && t(N, ie), v = d(Ne, v, ce), se === null ? ee = Ne : se.sibling = Ne, se = Ne, ie = Qe;
      }
      if (ce === E.length) return r(N, ie), Ae && Bn(N, ce), ee;
      if (ie === null) {
        for (; ce < E.length; ce++) ie = F(N, E[ce], X), ie !== null && (v = d(ie, v, ce), se === null ? ee = ie : se.sibling = ie, se = ie);
        return Ae && Bn(N, ce), ee;
      }
      for (ie = o(N, ie); ce < E.length; ce++) Qe = H(ie, N, ce, E[ce], X), Qe !== null && (e && Qe.alternate !== null && ie.delete(Qe.key === null ? ce : Qe.key), v = d(Qe, v, ce), se === null ? ee = Qe : se.sibling = Qe, se = Qe);
      return e && ie.forEach(function(_n) {
        return t(N, _n);
      }), Ae && Bn(N, ce), ee;
    }
    function G(N, v, E, X) {
      var ee = re(E);
      if (typeof ee != "function") throw Error(l(150));
      if (E = ee.call(E), E == null) throw Error(l(151));
      for (var se = ee = null, ie = v, ce = v = 0, Qe = null, Ne = E.next(); ie !== null && !Ne.done; ce++, Ne = E.next()) {
        ie.index > ce ? (Qe = ie, ie = null) : Qe = ie.sibling;
        var _n = A(N, ie, Ne.value, X);
        if (_n === null) {
          ie === null && (ie = Qe);
          break;
        }
        e && ie && _n.alternate === null && t(N, ie), v = d(_n, v, ce), se === null ? ee = _n : se.sibling = _n, se = _n, ie = Qe;
      }
      if (Ne.done) return r(
        N,
        ie
      ), Ae && Bn(N, ce), ee;
      if (ie === null) {
        for (; !Ne.done; ce++, Ne = E.next()) Ne = F(N, Ne.value, X), Ne !== null && (v = d(Ne, v, ce), se === null ? ee = Ne : se.sibling = Ne, se = Ne);
        return Ae && Bn(N, ce), ee;
      }
      for (ie = o(N, ie); !Ne.done; ce++, Ne = E.next()) Ne = H(ie, N, ce, Ne.value, X), Ne !== null && (e && Ne.alternate !== null && ie.delete(Ne.key === null ? ce : Ne.key), v = d(Ne, v, ce), se === null ? ee = Ne : se.sibling = Ne, se = Ne);
      return e && ie.forEach(function(G0) {
        return t(N, G0);
      }), Ae && Bn(N, ce), ee;
    }
    function Ze(N, v, E, X) {
      if (typeof E == "object" && E !== null && E.type === fe && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case te:
            e: {
              for (var ee = E.key, se = v; se !== null; ) {
                if (se.key === ee) {
                  if (ee = E.type, ee === fe) {
                    if (se.tag === 7) {
                      r(N, se.sibling), v = c(se, E.props.children), v.return = N, N = v;
                      break e;
                    }
                  } else if (se.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === le && vu(ee) === se.type) {
                    r(N, se.sibling), v = c(se, E.props), v.ref = gs(N, se, E), v.return = N, N = v;
                    break e;
                  }
                  r(N, se);
                  break;
                } else t(N, se);
                se = se.sibling;
              }
              E.type === fe ? (v = Gn(E.props.children, N.mode, X, E.key), v.return = N, N = v) : (X = Yi(E.type, E.key, E.props, null, N.mode, X), X.ref = gs(N, v, E), X.return = N, N = X);
            }
            return h(N);
          case J:
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
              v = ia(E, N.mode, X), v.return = N, N = v;
            }
            return h(N);
          case le:
            return se = E._init, Ze(N, v, se(E._payload), X);
        }
        if (Ke(E)) return K(N, v, E, X);
        if (re(E)) return G(N, v, E, X);
        bi(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" ? (E = "" + E, v !== null && v.tag === 6 ? (r(N, v.sibling), v = c(v, E), v.return = N, N = v) : (r(N, v), v = sa(E, N.mode, X), v.return = N, N = v), h(N)) : r(N, v);
    }
    return Ze;
  }
  var Nr = ju(!0), Su = ju(!1), Ni = vn(null), Ei = null, Er = null, po = null;
  function mo() {
    po = Er = Ei = null;
  }
  function go(e) {
    var t = Ni.current;
    Pe(Ni), e._currentValue = t;
  }
  function yo(e, t, r) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function Cr(e, t) {
    Ei = e, po = Er = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (pt = !0), e.firstContext = null);
  }
  function It(e) {
    var t = e._currentValue;
    if (po !== e) if (e = { context: e, memoizedValue: t, next: null }, Er === null) {
      if (Ei === null) throw Error(l(308));
      Er = e, Ei.dependencies = { lanes: 0, firstContext: e };
    } else Er = Er.next = e;
    return t;
  }
  var qn = null;
  function xo(e) {
    qn === null ? qn = [e] : qn.push(e);
  }
  function bu(e, t, r, o) {
    var c = t.interleaved;
    return c === null ? (r.next = r, xo(t)) : (r.next = c.next, c.next = r), t.interleaved = r, rn(e, o);
  }
  function rn(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
    return r.tag === 3 ? r.stateNode : null;
  }
  var bn = !1;
  function wo(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Nu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function sn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Nn(e, t, r) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (je & 2) !== 0) {
      var c = o.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), o.pending = t, rn(e, r);
    }
    return c = o.interleaved, c === null ? (t.next = t, xo(o)) : (t.next = c.next, c.next = t), o.interleaved = t, rn(e, r);
  }
  function Ci(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, _l(e, r);
    }
  }
  function Eu(e, t) {
    var r = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, r === o)) {
      var c = null, d = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var h = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
          d === null ? c = d = h : d = d.next = h, r = r.next;
        } while (r !== null);
        d === null ? c = d = t : d = d.next = t;
      } else c = d = t;
      r = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  function Ti(e, t, r, o) {
    var c = e.updateQueue;
    bn = !1;
    var d = c.firstBaseUpdate, h = c.lastBaseUpdate, x = c.shared.pending;
    if (x !== null) {
      c.shared.pending = null;
      var k = x, T = k.next;
      k.next = null, h === null ? d = T : h.next = T, h = k;
      var D = e.alternate;
      D !== null && (D = D.updateQueue, x = D.lastBaseUpdate, x !== h && (x === null ? D.firstBaseUpdate = T : x.next = T, D.lastBaseUpdate = k));
    }
    if (d !== null) {
      var F = c.baseState;
      h = 0, D = T = k = null, x = d;
      do {
        var A = x.lane, H = x.eventTime;
        if ((o & A) === A) {
          D !== null && (D = D.next = {
            eventTime: H,
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          });
          e: {
            var K = e, G = x;
            switch (A = t, H = r, G.tag) {
              case 1:
                if (K = G.payload, typeof K == "function") {
                  F = K.call(H, F, A);
                  break e;
                }
                F = K;
                break e;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = G.payload, A = typeof K == "function" ? K.call(H, F, A) : K, A == null) break e;
                F = q({}, F, A);
                break e;
              case 2:
                bn = !0;
            }
          }
          x.callback !== null && x.lane !== 0 && (e.flags |= 64, A = c.effects, A === null ? c.effects = [x] : A.push(x));
        } else H = { eventTime: H, lane: A, tag: x.tag, payload: x.payload, callback: x.callback, next: null }, D === null ? (T = D = H, k = F) : D = D.next = H, h |= A;
        if (x = x.next, x === null) {
          if (x = c.shared.pending, x === null) break;
          A = x, x = A.next, A.next = null, c.lastBaseUpdate = A, c.shared.pending = null;
        }
      } while (!0);
      if (D === null && (k = F), c.baseState = k, c.firstBaseUpdate = T, c.lastBaseUpdate = D, t = c.shared.interleaved, t !== null) {
        c = t;
        do
          h |= c.lane, c = c.next;
        while (c !== t);
      } else d === null && (c.shared.lanes = 0);
      Yn |= h, e.lanes = h, e.memoizedState = F;
    }
  }
  function Cu(e, t, r) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = r, typeof c != "function") throw Error(l(191, c));
        c.call(o);
      }
    }
  }
  var ys = {}, Ht = vn(ys), xs = vn(ys), ws = vn(ys);
  function Hn(e) {
    if (e === ys) throw Error(l(174));
    return e;
  }
  function ko(e, t) {
    switch (_e(ws, t), _e(xs, e), _e(Ht, ys), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ge(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ge(t, e);
    }
    Pe(Ht), _e(Ht, t);
  }
  function Tr() {
    Pe(Ht), Pe(xs), Pe(ws);
  }
  function Tu(e) {
    Hn(ws.current);
    var t = Hn(Ht.current), r = Ge(t, e.type);
    t !== r && (_e(xs, e), _e(Ht, r));
  }
  function vo(e) {
    xs.current === e && (Pe(Ht), Pe(xs));
  }
  var Fe = vn(0);
  function Ii(e) {
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
  var jo = [];
  function So() {
    for (var e = 0; e < jo.length; e++) jo[e]._workInProgressVersionPrimary = null;
    jo.length = 0;
  }
  var Li = ne.ReactCurrentDispatcher, bo = ne.ReactCurrentBatchConfig, Un = 0, ze = null, qe = null, Ye = null, Ri = !1, ks = !1, vs = 0, k0 = 0;
  function st() {
    throw Error(l(321));
  }
  function No(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++) if (!Mt(e[r], t[r])) return !1;
    return !0;
  }
  function Eo(e, t, r, o, c, d) {
    if (Un = d, ze = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Li.current = e === null || e.memoizedState === null ? b0 : N0, e = r(o, c), ks) {
      d = 0;
      do {
        if (ks = !1, vs = 0, 25 <= d) throw Error(l(301));
        d += 1, Ye = qe = null, t.updateQueue = null, Li.current = E0, e = r(o, c);
      } while (ks);
    }
    if (Li.current = Mi, t = qe !== null && qe.next !== null, Un = 0, Ye = qe = ze = null, Ri = !1, t) throw Error(l(300));
    return e;
  }
  function Co() {
    var e = vs !== 0;
    return vs = 0, e;
  }
  function Ut() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ye === null ? ze.memoizedState = Ye = e : Ye = Ye.next = e, Ye;
  }
  function Lt() {
    if (qe === null) {
      var e = ze.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = Ye === null ? ze.memoizedState : Ye.next;
    if (t !== null) Ye = t, qe = e;
    else {
      if (e === null) throw Error(l(310));
      qe = e, e = { memoizedState: qe.memoizedState, baseState: qe.baseState, baseQueue: qe.baseQueue, queue: qe.queue, next: null }, Ye === null ? ze.memoizedState = Ye = e : Ye = Ye.next = e;
    }
    return Ye;
  }
  function js(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function To(e) {
    var t = Lt(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = qe, c = o.baseQueue, d = r.pending;
    if (d !== null) {
      if (c !== null) {
        var h = c.next;
        c.next = d.next, d.next = h;
      }
      o.baseQueue = c = d, r.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var x = h = null, k = null, T = d;
      do {
        var D = T.lane;
        if ((Un & D) === D) k !== null && (k = k.next = { lane: 0, action: T.action, hasEagerState: T.hasEagerState, eagerState: T.eagerState, next: null }), o = T.hasEagerState ? T.eagerState : e(o, T.action);
        else {
          var F = {
            lane: D,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          };
          k === null ? (x = k = F, h = o) : k = k.next = F, ze.lanes |= D, Yn |= D;
        }
        T = T.next;
      } while (T !== null && T !== d);
      k === null ? h = o : k.next = x, Mt(o, t.memoizedState) || (pt = !0), t.memoizedState = o, t.baseState = h, t.baseQueue = k, r.lastRenderedState = o;
    }
    if (e = r.interleaved, e !== null) {
      c = e;
      do
        d = c.lane, ze.lanes |= d, Yn |= d, c = c.next;
      while (c !== e);
    } else c === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function Io(e) {
    var t = Lt(), r = t.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var o = r.dispatch, c = r.pending, d = t.memoizedState;
    if (c !== null) {
      r.pending = null;
      var h = c = c.next;
      do
        d = e(d, h.action), h = h.next;
      while (h !== c);
      Mt(d, t.memoizedState) || (pt = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), r.lastRenderedState = d;
    }
    return [d, o];
  }
  function Iu() {
  }
  function Lu(e, t) {
    var r = ze, o = Lt(), c = t(), d = !Mt(o.memoizedState, c);
    if (d && (o.memoizedState = c, pt = !0), o = o.queue, Lo(Ou.bind(null, r, o, e), [e]), o.getSnapshot !== t || d || Ye !== null && Ye.memoizedState.tag & 1) {
      if (r.flags |= 2048, Ss(9, _u.bind(null, r, o, c, t), void 0, null), Ve === null) throw Error(l(349));
      (Un & 30) !== 0 || Ru(r, t, c);
    }
    return c;
  }
  function Ru(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function _u(e, t, r, o) {
    t.value = r, t.getSnapshot = o, Mu(t) && Pu(e);
  }
  function Ou(e, t, r) {
    return r(function() {
      Mu(t) && Pu(e);
    });
  }
  function Mu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !Mt(e, r);
    } catch {
      return !0;
    }
  }
  function Pu(e) {
    var t = rn(e, 1);
    t !== null && Ft(t, e, 1, -1);
  }
  function $u(e) {
    var t = Ut();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: js, lastRenderedState: e }, t.queue = e, e = e.dispatch = S0.bind(null, ze, e), [t.memoizedState, e];
  }
  function Ss(e, t, r, o) {
    return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = ze.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ze.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function Au() {
    return Lt().memoizedState;
  }
  function _i(e, t, r, o) {
    var c = Ut();
    ze.flags |= e, c.memoizedState = Ss(1 | t, r, void 0, o === void 0 ? null : o);
  }
  function Oi(e, t, r, o) {
    var c = Lt();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (qe !== null) {
      var h = qe.memoizedState;
      if (d = h.destroy, o !== null && No(o, h.deps)) {
        c.memoizedState = Ss(t, r, d, o);
        return;
      }
    }
    ze.flags |= e, c.memoizedState = Ss(1 | t, r, d, o);
  }
  function Du(e, t) {
    return _i(8390656, 8, e, t);
  }
  function Lo(e, t) {
    return Oi(2048, 8, e, t);
  }
  function Fu(e, t) {
    return Oi(4, 2, e, t);
  }
  function zu(e, t) {
    return Oi(4, 4, e, t);
  }
  function Xu(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Wu(e, t, r) {
    return r = r != null ? r.concat([e]) : null, Oi(4, 4, Xu.bind(null, t, e), r);
  }
  function Ro() {
  }
  function Zu(e, t) {
    var r = Lt();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && No(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
  }
  function Bu(e, t) {
    var r = Lt();
    t = t === void 0 ? null : t;
    var o = r.memoizedState;
    return o !== null && t !== null && No(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
  }
  function qu(e, t, r) {
    return (Un & 21) === 0 ? (e.baseState && (e.baseState = !1, pt = !0), e.memoizedState = r) : (Mt(r, t) || (r = vc(), ze.lanes |= r, Yn |= r, e.baseState = !0), t);
  }
  function v0(e, t) {
    var r = Ie;
    Ie = r !== 0 && 4 > r ? r : 4, e(!0);
    var o = bo.transition;
    bo.transition = {};
    try {
      e(!1), t();
    } finally {
      Ie = r, bo.transition = o;
    }
  }
  function Hu() {
    return Lt().memoizedState;
  }
  function j0(e, t, r) {
    var o = In(e);
    if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, Uu(e)) Yu(t, r);
    else if (r = bu(e, t, r, o), r !== null) {
      var c = ut();
      Ft(r, e, o, c), Vu(r, t, o);
    }
  }
  function S0(e, t, r) {
    var o = In(e), c = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
    if (Uu(e)) Yu(t, c);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null)) try {
        var h = t.lastRenderedState, x = d(h, r);
        if (c.hasEagerState = !0, c.eagerState = x, Mt(x, h)) {
          var k = t.interleaved;
          k === null ? (c.next = c, xo(t)) : (c.next = k.next, k.next = c), t.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      r = bu(e, t, c, o), r !== null && (c = ut(), Ft(r, e, o, c), Vu(r, t, o));
    }
  }
  function Uu(e) {
    var t = e.alternate;
    return e === ze || t !== null && t === ze;
  }
  function Yu(e, t) {
    ks = Ri = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Vu(e, t, r) {
    if ((r & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, r |= o, t.lanes = r, _l(e, r);
    }
  }
  var Mi = { readContext: It, useCallback: st, useContext: st, useEffect: st, useImperativeHandle: st, useInsertionEffect: st, useLayoutEffect: st, useMemo: st, useReducer: st, useRef: st, useState: st, useDebugValue: st, useDeferredValue: st, useTransition: st, useMutableSource: st, useSyncExternalStore: st, useId: st, unstable_isNewReconciler: !1 }, b0 = { readContext: It, useCallback: function(e, t) {
    return Ut().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: It, useEffect: Du, useImperativeHandle: function(e, t, r) {
    return r = r != null ? r.concat([e]) : null, _i(
      4194308,
      4,
      Xu.bind(null, t, e),
      r
    );
  }, useLayoutEffect: function(e, t) {
    return _i(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return _i(4, 2, e, t);
  }, useMemo: function(e, t) {
    var r = Ut();
    return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
  }, useReducer: function(e, t, r) {
    var o = Ut();
    return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = j0.bind(null, ze, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Ut();
    return e = { current: e }, t.memoizedState = e;
  }, useState: $u, useDebugValue: Ro, useDeferredValue: function(e) {
    return Ut().memoizedState = e;
  }, useTransition: function() {
    var e = $u(!1), t = e[0];
    return e = v0.bind(null, e[1]), Ut().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, r) {
    var o = ze, c = Ut();
    if (Ae) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else {
      if (r = t(), Ve === null) throw Error(l(349));
      (Un & 30) !== 0 || Ru(o, t, r);
    }
    c.memoizedState = r;
    var d = { value: r, getSnapshot: t };
    return c.queue = d, Du(Ou.bind(
      null,
      o,
      d,
      e
    ), [e]), o.flags |= 2048, Ss(9, _u.bind(null, o, d, r, t), void 0, null), r;
  }, useId: function() {
    var e = Ut(), t = Ve.identifierPrefix;
    if (Ae) {
      var r = nn, o = tn;
      r = (o & ~(1 << 32 - Ot(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = vs++, 0 < r && (t += "H" + r.toString(32)), t += ":";
    } else r = k0++, t = ":" + t + "r" + r.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, N0 = {
    readContext: It,
    useCallback: Zu,
    useContext: It,
    useEffect: Lo,
    useImperativeHandle: Wu,
    useInsertionEffect: Fu,
    useLayoutEffect: zu,
    useMemo: Bu,
    useReducer: To,
    useRef: Au,
    useState: function() {
      return To(js);
    },
    useDebugValue: Ro,
    useDeferredValue: function(e) {
      var t = Lt();
      return qu(t, qe.memoizedState, e);
    },
    useTransition: function() {
      var e = To(js)[0], t = Lt().memoizedState;
      return [e, t];
    },
    useMutableSource: Iu,
    useSyncExternalStore: Lu,
    useId: Hu,
    unstable_isNewReconciler: !1
  }, E0 = { readContext: It, useCallback: Zu, useContext: It, useEffect: Lo, useImperativeHandle: Wu, useInsertionEffect: Fu, useLayoutEffect: zu, useMemo: Bu, useReducer: Io, useRef: Au, useState: function() {
    return Io(js);
  }, useDebugValue: Ro, useDeferredValue: function(e) {
    var t = Lt();
    return qe === null ? t.memoizedState = e : qu(t, qe.memoizedState, e);
  }, useTransition: function() {
    var e = Io(js)[0], t = Lt().memoizedState;
    return [e, t];
  }, useMutableSource: Iu, useSyncExternalStore: Lu, useId: Hu, unstable_isNewReconciler: !1 };
  function $t(e, t) {
    if (e && e.defaultProps) {
      t = q({}, t), e = e.defaultProps;
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function _o(e, t, r, o) {
    t = e.memoizedState, r = r(o, t), r = r == null ? t : q({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Pi = { isMounted: function(e) {
    return (e = e._reactInternals) ? zn(e) === e : !1;
  }, enqueueSetState: function(e, t, r) {
    e = e._reactInternals;
    var o = ut(), c = In(e), d = sn(o, c);
    d.payload = t, r != null && (d.callback = r), t = Nn(e, d, c), t !== null && (Ft(t, e, c, o), Ci(t, e, c));
  }, enqueueReplaceState: function(e, t, r) {
    e = e._reactInternals;
    var o = ut(), c = In(e), d = sn(o, c);
    d.tag = 1, d.payload = t, r != null && (d.callback = r), t = Nn(e, d, c), t !== null && (Ft(t, e, c, o), Ci(t, e, c));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var r = ut(), o = In(e), c = sn(r, o);
    c.tag = 2, t != null && (c.callback = t), t = Nn(e, c, o), t !== null && (Ft(t, e, o, r), Ci(t, e, o));
  } };
  function Qu(e, t, r, o, c, d, h) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, d, h) : t.prototype && t.prototype.isPureReactComponent ? !cs(r, o) || !cs(c, d) : !0;
  }
  function Ku(e, t, r) {
    var o = !1, c = jn, d = t.contextType;
    return typeof d == "object" && d !== null ? d = It(d) : (c = ht(t) ? Wn : rt.current, o = t.contextTypes, d = (o = o != null) ? vr(e, c) : jn), t = new t(r, d), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Pi, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = c, e.__reactInternalMemoizedMaskedChildContext = d), t;
  }
  function Gu(e, t, r, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && Pi.enqueueReplaceState(t, t.state, null);
  }
  function Oo(e, t, r, o) {
    var c = e.stateNode;
    c.props = r, c.state = e.memoizedState, c.refs = {}, wo(e);
    var d = t.contextType;
    typeof d == "object" && d !== null ? c.context = It(d) : (d = ht(t) ? Wn : rt.current, c.context = vr(e, d)), c.state = e.memoizedState, d = t.getDerivedStateFromProps, typeof d == "function" && (_o(e, t, d, r), c.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (t = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), t !== c.state && Pi.enqueueReplaceState(c, c.state, null), Ti(e, r, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Ir(e, t) {
    try {
      var r = "", o = t;
      do
        r += ye(o), o = o.return;
      while (o);
      var c = r;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: e, source: t, stack: c, digest: null };
  }
  function Mo(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function Po(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  var C0 = typeof WeakMap == "function" ? WeakMap : Map;
  function Ju(e, t, r) {
    r = sn(-1, r), r.tag = 3, r.payload = { element: null };
    var o = t.value;
    return r.callback = function() {
      Wi || (Wi = !0, Qo = o), Po(e, t);
    }, r;
  }
  function ed(e, t, r) {
    r = sn(-1, r), r.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = t.value;
      r.payload = function() {
        return o(c);
      }, r.callback = function() {
        Po(e, t);
      };
    }
    var d = e.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (r.callback = function() {
      Po(e, t), typeof o != "function" && (Cn === null ? Cn = /* @__PURE__ */ new Set([this]) : Cn.add(this));
      var h = t.stack;
      this.componentDidCatch(t.value, { componentStack: h !== null ? h : "" });
    }), r;
  }
  function td(e, t, r) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new C0();
      var c = /* @__PURE__ */ new Set();
      o.set(t, c);
    } else c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c));
    c.has(r) || (c.add(r), e = X0.bind(null, e, t, r), t.then(e, e));
  }
  function nd(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function rd(e, t, r, o, c) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = sn(-1, 1), t.tag = 2, Nn(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = c, e);
  }
  var T0 = ne.ReactCurrentOwner, pt = !1;
  function ct(e, t, r, o) {
    t.child = e === null ? Su(t, null, r, o) : Nr(t, e.child, r, o);
  }
  function sd(e, t, r, o, c) {
    r = r.render;
    var d = t.ref;
    return Cr(t, c), o = Eo(e, t, r, o, d, c), r = Co(), e !== null && !pt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, ln(e, t, c)) : (Ae && r && ao(t), t.flags |= 1, ct(e, t, o, c), t.child);
  }
  function id(e, t, r, o, c) {
    if (e === null) {
      var d = r.type;
      return typeof d == "function" && !ra(d) && d.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = d, ld(e, t, d, o, c)) : (e = Yi(r.type, null, o, t, t.mode, c), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, (e.lanes & c) === 0) {
      var h = d.memoizedProps;
      if (r = r.compare, r = r !== null ? r : cs, r(h, o) && e.ref === t.ref) return ln(e, t, c);
    }
    return t.flags |= 1, e = Rn(d, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ld(e, t, r, o, c) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (cs(d, o) && e.ref === t.ref) if (pt = !1, t.pendingProps = o = d, (e.lanes & c) !== 0) (e.flags & 131072) !== 0 && (pt = !0);
      else return t.lanes = e.lanes, ln(e, t, c);
    }
    return $o(e, t, r, o, c);
  }
  function od(e, t, r) {
    var o = t.pendingProps, c = o.children, d = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(Rr, bt), bt |= r;
    else {
      if ((r & 1073741824) === 0) return e = d !== null ? d.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, _e(Rr, bt), bt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : r, _e(Rr, bt), bt |= o;
    }
    else d !== null ? (o = d.baseLanes | r, t.memoizedState = null) : o = r, _e(Rr, bt), bt |= o;
    return ct(e, t, c, r), t.child;
  }
  function ad(e, t) {
    var r = t.ref;
    (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
  }
  function $o(e, t, r, o, c) {
    var d = ht(r) ? Wn : rt.current;
    return d = vr(t, d), Cr(t, c), r = Eo(e, t, r, o, d, c), o = Co(), e !== null && !pt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~c, ln(e, t, c)) : (Ae && o && ao(t), t.flags |= 1, ct(e, t, r, c), t.child);
  }
  function cd(e, t, r, o, c) {
    if (ht(r)) {
      var d = !0;
      wi(t);
    } else d = !1;
    if (Cr(t, c), t.stateNode === null) Ai(e, t), Ku(t, r, o), Oo(t, r, o, c), o = !0;
    else if (e === null) {
      var h = t.stateNode, x = t.memoizedProps;
      h.props = x;
      var k = h.context, T = r.contextType;
      typeof T == "object" && T !== null ? T = It(T) : (T = ht(r) ? Wn : rt.current, T = vr(t, T));
      var D = r.getDerivedStateFromProps, F = typeof D == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      F || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== o || k !== T) && Gu(t, h, o, T), bn = !1;
      var A = t.memoizedState;
      h.state = A, Ti(t, o, h, c), k = t.memoizedState, x !== o || A !== k || ft.current || bn ? (typeof D == "function" && (_o(t, r, D, o), k = t.memoizedState), (x = bn || Qu(t, r, x, o, A, k, T)) ? (F || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = k), h.props = o, h.state = k, h.context = T, o = x) : (typeof h.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      h = t.stateNode, Nu(e, t), x = t.memoizedProps, T = t.type === t.elementType ? x : $t(t.type, x), h.props = T, F = t.pendingProps, A = h.context, k = r.contextType, typeof k == "object" && k !== null ? k = It(k) : (k = ht(r) ? Wn : rt.current, k = vr(t, k));
      var H = r.getDerivedStateFromProps;
      (D = typeof H == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== F || A !== k) && Gu(t, h, o, k), bn = !1, A = t.memoizedState, h.state = A, Ti(t, o, h, c);
      var K = t.memoizedState;
      x !== F || A !== K || ft.current || bn ? (typeof H == "function" && (_o(t, r, H, o), K = t.memoizedState), (T = bn || Qu(t, r, T, o, A, K, k) || !1) ? (D || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, K, k), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, K, k)), typeof h.componentDidUpdate == "function" && (t.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && A === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && A === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = K), h.props = o, h.state = K, h.context = k, o = T) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && A === e.memoizedState || (t.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && A === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ao(e, t, r, o, d, c);
  }
  function Ao(e, t, r, o, c, d) {
    ad(e, t);
    var h = (t.flags & 128) !== 0;
    if (!o && !h) return c && pu(t, r, !1), ln(e, t, d);
    o = t.stateNode, T0.current = t;
    var x = h && typeof r.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && h ? (t.child = Nr(t, e.child, null, d), t.child = Nr(t, null, x, d)) : ct(e, t, x, d), t.memoizedState = o.state, c && pu(t, r, !0), t.child;
  }
  function ud(e) {
    var t = e.stateNode;
    t.pendingContext ? fu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && fu(e, t.context, !1), ko(e, t.containerInfo);
  }
  function dd(e, t, r, o, c) {
    return br(), ho(c), t.flags |= 256, ct(e, t, r, o), t.child;
  }
  var Do = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Fo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function fd(e, t, r) {
    var o = t.pendingProps, c = Fe.current, d = !1, h = (t.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (c & 2) !== 0), x ? (d = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (c |= 1), _e(Fe, c & 1), e === null)
      return fo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (h = o.children, e = o.fallback, d ? (o = t.mode, d = t.child, h = { mode: "hidden", children: h }, (o & 1) === 0 && d !== null ? (d.childLanes = 0, d.pendingProps = h) : d = Vi(h, o, 0, null), e = Gn(e, o, r, null), d.return = t, e.return = t, d.sibling = e, t.child = d, t.child.memoizedState = Fo(r), t.memoizedState = Do, e) : zo(t, h));
    if (c = e.memoizedState, c !== null && (x = c.dehydrated, x !== null)) return I0(e, t, h, o, x, c, r);
    if (d) {
      d = o.fallback, h = t.mode, c = e.child, x = c.sibling;
      var k = { mode: "hidden", children: o.children };
      return (h & 1) === 0 && t.child !== c ? (o = t.child, o.childLanes = 0, o.pendingProps = k, t.deletions = null) : (o = Rn(c, k), o.subtreeFlags = c.subtreeFlags & 14680064), x !== null ? d = Rn(x, d) : (d = Gn(d, h, r, null), d.flags |= 2), d.return = t, o.return = t, o.sibling = d, t.child = o, o = d, d = t.child, h = e.child.memoizedState, h = h === null ? Fo(r) : { baseLanes: h.baseLanes | r, cachePool: null, transitions: h.transitions }, d.memoizedState = h, d.childLanes = e.childLanes & ~r, t.memoizedState = Do, o;
    }
    return d = e.child, e = d.sibling, o = Rn(d, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function zo(e, t) {
    return t = Vi({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function $i(e, t, r, o) {
    return o !== null && ho(o), Nr(t, e.child, null, r), e = zo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function I0(e, t, r, o, c, d, h) {
    if (r)
      return t.flags & 256 ? (t.flags &= -257, o = Mo(Error(l(422))), $i(e, t, h, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (d = o.fallback, c = t.mode, o = Vi({ mode: "visible", children: o.children }, c, 0, null), d = Gn(d, c, h, null), d.flags |= 2, o.return = t, d.return = t, o.sibling = d, t.child = o, (t.mode & 1) !== 0 && Nr(t, e.child, null, h), t.child.memoizedState = Fo(h), t.memoizedState = Do, d);
    if ((t.mode & 1) === 0) return $i(e, t, h, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var x = o.dgst;
      return o = x, d = Error(l(419)), o = Mo(d, o, void 0), $i(e, t, h, o);
    }
    if (x = (h & e.childLanes) !== 0, pt || x) {
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
        c = (c & (o.suspendedLanes | h)) !== 0 ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, rn(e, c), Ft(o, e, c, -1));
      }
      return na(), o = Mo(Error(l(421))), $i(e, t, h, o);
    }
    return c.data === "$?" ? (t.flags |= 128, t.child = e.child, t = W0.bind(null, e), c._reactRetry = t, null) : (e = d.treeContext, St = kn(c.nextSibling), jt = t, Ae = !0, Pt = null, e !== null && (Ct[Tt++] = tn, Ct[Tt++] = nn, Ct[Tt++] = Zn, tn = e.id, nn = e.overflow, Zn = t), t = zo(t, o.children), t.flags |= 4096, t);
  }
  function hd(e, t, r) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), yo(e.return, t, r);
  }
  function Xo(e, t, r, o, c) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: c } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = r, d.tailMode = c);
  }
  function pd(e, t, r) {
    var o = t.pendingProps, c = o.revealOrder, d = o.tail;
    if (ct(e, t, o.children, r), o = Fe.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && hd(e, r, t);
        else if (e.tag === 19) hd(e, r, t);
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
    if (_e(Fe, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (r = t.child, c = null; r !== null; ) e = r.alternate, e !== null && Ii(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = t.child, t.child = null) : (c = r.sibling, r.sibling = null), Xo(t, !1, c, r, d);
        break;
      case "backwards":
        for (r = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && Ii(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        Xo(t, !0, r, null, d);
        break;
      case "together":
        Xo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ai(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function ln(e, t, r) {
    if (e !== null && (t.dependencies = e.dependencies), Yn |= t.lanes, (r & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(l(153));
    if (t.child !== null) {
      for (e = t.child, r = Rn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Rn(e, e.pendingProps), r.return = t;
      r.sibling = null;
    }
    return t.child;
  }
  function L0(e, t, r) {
    switch (t.tag) {
      case 3:
        ud(t), br();
        break;
      case 5:
        Tu(t);
        break;
      case 1:
        ht(t.type) && wi(t);
        break;
      case 4:
        ko(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, c = t.memoizedProps.value;
        _e(Ni, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (_e(Fe, Fe.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? fd(e, t, r) : (_e(Fe, Fe.current & 1), e = ln(e, t, r), e !== null ? e.sibling : null);
        _e(Fe, Fe.current & 1);
        break;
      case 19:
        if (o = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return pd(e, t, r);
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), _e(Fe, Fe.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, od(e, t, r);
    }
    return ln(e, t, r);
  }
  var md, Wo, gd, yd;
  md = function(e, t) {
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
  }, Wo = function() {
  }, gd = function(e, t, r, o) {
    var c = e.memoizedProps;
    if (c !== o) {
      e = t.stateNode, Hn(Ht.current);
      var d = null;
      switch (r) {
        case "input":
          c = ir(e, c), o = ir(e, o), d = [];
          break;
        case "select":
          c = q({}, c, { value: void 0 }), o = q({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = or(e, c), o = or(e, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (e.onclick = gi);
      }
      ar(r, o);
      var h;
      r = null;
      for (T in c) if (!o.hasOwnProperty(T) && c.hasOwnProperty(T) && c[T] != null) if (T === "style") {
        var x = c[T];
        for (h in x) x.hasOwnProperty(h) && (r || (r = {}), r[h] = "");
      } else T !== "dangerouslySetInnerHTML" && T !== "children" && T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && T !== "autoFocus" && (u.hasOwnProperty(T) ? d || (d = []) : (d = d || []).push(T, null));
      for (T in o) {
        var k = o[T];
        if (x = c?.[T], o.hasOwnProperty(T) && k !== x && (k != null || x != null)) if (T === "style") if (x) {
          for (h in x) !x.hasOwnProperty(h) || k && k.hasOwnProperty(h) || (r || (r = {}), r[h] = "");
          for (h in k) k.hasOwnProperty(h) && x[h] !== k[h] && (r || (r = {}), r[h] = k[h]);
        } else r || (d || (d = []), d.push(
          T,
          r
        )), r = k;
        else T === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, x = x ? x.__html : void 0, k != null && x !== k && (d = d || []).push(T, k)) : T === "children" ? typeof k != "string" && typeof k != "number" || (d = d || []).push(T, "" + k) : T !== "suppressContentEditableWarning" && T !== "suppressHydrationWarning" && (u.hasOwnProperty(T) ? (k != null && T === "onScroll" && Me("scroll", e), d || x === k || (d = [])) : (d = d || []).push(T, k));
      }
      r && (d = d || []).push("style", r);
      var T = d;
      (t.updateQueue = T) && (t.flags |= 4);
    }
  }, yd = function(e, t, r, o) {
    r !== o && (t.flags |= 4);
  };
  function bs(e, t) {
    if (!Ae) switch (e.tailMode) {
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
  function it(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
    if (t) for (var c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = e, c = c.sibling;
    else for (c = e.child; c !== null; ) r |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= o, e.childLanes = r, t;
  }
  function R0(e, t, r) {
    var o = t.pendingProps;
    switch (co(t), t.tag) {
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
        return it(t), null;
      case 1:
        return ht(t.type) && xi(), it(t), null;
      case 3:
        return o = t.stateNode, Tr(), Pe(ft), Pe(rt), So(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Si(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Pt !== null && (Jo(Pt), Pt = null))), Wo(e, t), it(t), null;
      case 5:
        vo(t);
        var c = Hn(ws.current);
        if (r = t.type, e !== null && t.stateNode != null) gd(e, t, r, o, c), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(l(166));
            return it(t), null;
          }
          if (e = Hn(Ht.current), Si(t)) {
            o = t.stateNode, r = t.type;
            var d = t.memoizedProps;
            switch (o[qt] = t, o[ps] = d, e = (t.mode & 1) !== 0, r) {
              case "dialog":
                Me("cancel", o), Me("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Me("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ds.length; c++) Me(ds[c], o);
                break;
              case "source":
                Me("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Me(
                  "error",
                  o
                ), Me("load", o);
                break;
              case "details":
                Me("toggle", o);
                break;
              case "input":
                qs(o, d), Me("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Me("invalid", o);
                break;
              case "textarea":
                Us(o, d), Me("invalid", o);
            }
            ar(r, d), c = null;
            for (var h in d) if (d.hasOwnProperty(h)) {
              var x = d[h];
              h === "children" ? typeof x == "string" ? o.textContent !== x && (d.suppressHydrationWarning !== !0 && mi(o.textContent, x, e), c = ["children", x]) : typeof x == "number" && o.textContent !== "" + x && (d.suppressHydrationWarning !== !0 && mi(
                o.textContent,
                x,
                e
              ), c = ["children", "" + x]) : u.hasOwnProperty(h) && x != null && h === "onScroll" && Me("scroll", o);
            }
            switch (r) {
              case "input":
                rr(o), kt(o, d, !0);
                break;
              case "textarea":
                rr(o), ve(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = gi);
            }
            o = c, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            h = c.nodeType === 9 ? c : c.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Le(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = h.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = h.createElement(r, { is: o.is }) : (e = h.createElement(r), r === "select" && (h = e, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : e = h.createElementNS(e, r), e[qt] = t, e[ps] = o, md(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (h = hn(r, o), r) {
                case "dialog":
                  Me("cancel", e), Me("close", e), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Me("load", e), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ds.length; c++) Me(ds[c], e);
                  c = o;
                  break;
                case "source":
                  Me("error", e), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Me(
                    "error",
                    e
                  ), Me("load", e), c = o;
                  break;
                case "details":
                  Me("toggle", e), c = o;
                  break;
                case "input":
                  qs(e, o), c = ir(e, o), Me("invalid", e);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, c = q({}, o, { value: void 0 }), Me("invalid", e);
                  break;
                case "textarea":
                  Us(e, o), c = or(e, o), Me("invalid", e);
                  break;
                default:
                  c = o;
              }
              ar(r, c), x = c;
              for (d in x) if (x.hasOwnProperty(d)) {
                var k = x[d];
                d === "style" ? Ur(e, k) : d === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && Fn(e, k)) : d === "children" ? typeof k == "string" ? (r !== "textarea" || k !== "") && Gt(e, k) : typeof k == "number" && Gt(e, "" + k) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (u.hasOwnProperty(d) ? k != null && d === "onScroll" && Me("scroll", e) : k != null && V(e, d, k, h));
              }
              switch (r) {
                case "input":
                  rr(e), kt(e, o, !1);
                  break;
                case "textarea":
                  rr(e), ve(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ke(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, d = o.value, d != null ? Kt(e, !!o.multiple, d, !1) : o.defaultValue != null && Kt(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (e.onclick = gi);
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
        return it(t), null;
      case 6:
        if (e && t.stateNode != null) yd(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(l(166));
          if (r = Hn(ws.current), Hn(Ht.current), Si(t)) {
            if (o = t.stateNode, r = t.memoizedProps, o[qt] = t, (d = o.nodeValue !== r) && (e = jt, e !== null)) switch (e.tag) {
              case 3:
                mi(o.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && mi(o.nodeValue, r, (e.mode & 1) !== 0);
            }
            d && (t.flags |= 4);
          } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[qt] = t, t.stateNode = o;
        }
        return it(t), null;
      case 13:
        if (Pe(Fe), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Ae && St !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ku(), br(), t.flags |= 98560, d = !1;
          else if (d = Si(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(l(318));
              if (d = t.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(l(317));
              d[qt] = t;
            } else br(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            it(t), d = !1;
          } else Pt !== null && (Jo(Pt), Pt = null), d = !0;
          if (!d) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Fe.current & 1) !== 0 ? He === 0 && (He = 3) : na())), t.updateQueue !== null && (t.flags |= 4), it(t), null);
      case 4:
        return Tr(), Wo(e, t), e === null && fs(t.stateNode.containerInfo), it(t), null;
      case 10:
        return go(t.type._context), it(t), null;
      case 17:
        return ht(t.type) && xi(), it(t), null;
      case 19:
        if (Pe(Fe), d = t.memoizedState, d === null) return it(t), null;
        if (o = (t.flags & 128) !== 0, h = d.rendering, h === null) if (o) bs(d, !1);
        else {
          if (He !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (h = Ii(e), h !== null) {
              for (t.flags |= 128, bs(d, !1), o = h.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) d = r, e = o, d.flags &= 14680066, h = d.alternate, h === null ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = h.childLanes, d.lanes = h.lanes, d.child = h.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = h.memoizedProps, d.memoizedState = h.memoizedState, d.updateQueue = h.updateQueue, d.type = h.type, e = h.dependencies, d.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
              return _e(Fe, Fe.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          d.tail !== null && We() > _r && (t.flags |= 128, o = !0, bs(d, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = Ii(h), e !== null) {
            if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), bs(d, !0), d.tail === null && d.tailMode === "hidden" && !h.alternate && !Ae) return it(t), null;
          } else 2 * We() - d.renderingStartTime > _r && r !== 1073741824 && (t.flags |= 128, o = !0, bs(d, !1), t.lanes = 4194304);
          d.isBackwards ? (h.sibling = t.child, t.child = h) : (r = d.last, r !== null ? r.sibling = h : t.child = h, d.last = h);
        }
        return d.tail !== null ? (t = d.tail, d.rendering = t, d.tail = t.sibling, d.renderingStartTime = We(), t.sibling = null, r = Fe.current, _e(Fe, o ? r & 1 | 2 : r & 1), t) : (it(t), null);
      case 22:
      case 23:
        return ta(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (bt & 1073741824) !== 0 && (it(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : it(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(l(156, t.tag));
  }
  function _0(e, t) {
    switch (co(t), t.tag) {
      case 1:
        return ht(t.type) && xi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Tr(), Pe(ft), Pe(rt), So(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return vo(t), null;
      case 13:
        if (Pe(Fe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(l(340));
          br();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Pe(Fe), null;
      case 4:
        return Tr(), null;
      case 10:
        return go(t.type._context), null;
      case 22:
      case 23:
        return ta(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Di = !1, lt = !1, O0 = typeof WeakSet == "function" ? WeakSet : Set, Y = null;
  function Lr(e, t) {
    var r = e.ref;
    if (r !== null) if (typeof r == "function") try {
      r(null);
    } catch (o) {
      Xe(e, t, o);
    }
    else r.current = null;
  }
  function Zo(e, t, r) {
    try {
      r();
    } catch (o) {
      Xe(e, t, o);
    }
  }
  var xd = !1;
  function M0(e, t) {
    if (eo = si, e = Qc(), Hl(e)) {
      if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        r = (r = e.ownerDocument) && r.defaultView || window;
        var o = r.getSelection && r.getSelection();
        if (o && o.rangeCount !== 0) {
          r = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            r.nodeType, d.nodeType;
          } catch {
            r = null;
            break e;
          }
          var h = 0, x = -1, k = -1, T = 0, D = 0, F = e, A = null;
          t: for (; ; ) {
            for (var H; F !== r || c !== 0 && F.nodeType !== 3 || (x = h + c), F !== d || o !== 0 && F.nodeType !== 3 || (k = h + o), F.nodeType === 3 && (h += F.nodeValue.length), (H = F.firstChild) !== null; )
              A = F, F = H;
            for (; ; ) {
              if (F === e) break t;
              if (A === r && ++T === c && (x = h), A === d && ++D === o && (k = h), (H = F.nextSibling) !== null) break;
              F = A, A = F.parentNode;
            }
            F = H;
          }
          r = x === -1 || k === -1 ? null : { start: x, end: k };
        } else r = null;
      }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (to = { focusedElem: e, selectionRange: r }, si = !1, Y = t; Y !== null; ) if (t = Y, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Y = e;
    else for (; Y !== null; ) {
      t = Y;
      try {
        var K = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (K !== null) {
              var G = K.memoizedProps, Ze = K.memoizedState, N = t.stateNode, v = N.getSnapshotBeforeUpdate(t.elementType === t.type ? G : $t(t.type, G), Ze);
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
      } catch (X) {
        Xe(t, t.return, X);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, Y = e;
        break;
      }
      Y = t.return;
    }
    return K = xd, xd = !1, K;
  }
  function Ns(e, t, r) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & e) === e) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Zo(t, r, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Fi(e, t) {
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
  function Bo(e) {
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
  function wd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[qt], delete t[ps], delete t[io], delete t[g0], delete t[y0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function kd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function vd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || kd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function qo(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = gi));
    else if (o !== 4 && (e = e.child, e !== null)) for (qo(e, t, r), e = e.sibling; e !== null; ) qo(e, t, r), e = e.sibling;
  }
  function Ho(e, t, r) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Ho(e, t, r), e = e.sibling; e !== null; ) Ho(e, t, r), e = e.sibling;
  }
  var Je = null, At = !1;
  function En(e, t, r) {
    for (r = r.child; r !== null; ) jd(e, t, r), r = r.sibling;
  }
  function jd(e, t, r) {
    if (Bt && typeof Bt.onCommitFiberUnmount == "function") try {
      Bt.onCommitFiberUnmount(Gs, r);
    } catch {
    }
    switch (r.tag) {
      case 5:
        lt || Lr(r, t);
      case 6:
        var o = Je, c = At;
        Je = null, En(e, t, r), Je = o, At = c, Je !== null && (At ? (e = Je, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Je.removeChild(r.stateNode));
        break;
      case 18:
        Je !== null && (At ? (e = Je, r = r.stateNode, e.nodeType === 8 ? so(e.parentNode, r) : e.nodeType === 1 && so(e, r), rs(e)) : so(Je, r.stateNode));
        break;
      case 4:
        o = Je, c = At, Je = r.stateNode.containerInfo, At = !0, En(e, t, r), Je = o, At = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!lt && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, h = d.destroy;
            d = d.tag, h !== void 0 && ((d & 2) !== 0 || (d & 4) !== 0) && Zo(r, t, h), c = c.next;
          } while (c !== o);
        }
        En(e, t, r);
        break;
      case 1:
        if (!lt && (Lr(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
        } catch (x) {
          Xe(r, t, x);
        }
        En(e, t, r);
        break;
      case 21:
        En(e, t, r);
        break;
      case 22:
        r.mode & 1 ? (lt = (o = lt) || r.memoizedState !== null, En(e, t, r), lt = o) : En(e, t, r);
        break;
      default:
        En(e, t, r);
    }
  }
  function Sd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      r === null && (r = e.stateNode = new O0()), t.forEach(function(o) {
        var c = Z0.bind(null, e, o);
        r.has(o) || (r.add(o), o.then(c, c));
      });
    }
  }
  function Dt(e, t) {
    var r = t.deletions;
    if (r !== null) for (var o = 0; o < r.length; o++) {
      var c = r[o];
      try {
        var d = e, h = t, x = h;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 5:
              Je = x.stateNode, At = !1;
              break e;
            case 3:
              Je = x.stateNode.containerInfo, At = !0;
              break e;
            case 4:
              Je = x.stateNode.containerInfo, At = !0;
              break e;
          }
          x = x.return;
        }
        if (Je === null) throw Error(l(160));
        jd(d, h, c), Je = null, At = !1;
        var k = c.alternate;
        k !== null && (k.return = null), c.return = null;
      } catch (T) {
        Xe(c, t, T);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) bd(t, e), t = t.sibling;
  }
  function bd(e, t) {
    var r = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Dt(t, e), Yt(e), o & 4) {
          try {
            Ns(3, e, e.return), Fi(3, e);
          } catch (G) {
            Xe(e, e.return, G);
          }
          try {
            Ns(5, e, e.return);
          } catch (G) {
            Xe(e, e.return, G);
          }
        }
        break;
      case 1:
        Dt(t, e), Yt(e), o & 512 && r !== null && Lr(r, r.return);
        break;
      case 5:
        if (Dt(t, e), Yt(e), o & 512 && r !== null && Lr(r, r.return), e.flags & 32) {
          var c = e.stateNode;
          try {
            Gt(c, "");
          } catch (G) {
            Xe(e, e.return, G);
          }
        }
        if (o & 4 && (c = e.stateNode, c != null)) {
          var d = e.memoizedProps, h = r !== null ? r.memoizedProps : d, x = e.type, k = e.updateQueue;
          if (e.updateQueue = null, k !== null) try {
            x === "input" && d.type === "radio" && d.name != null && Hs(c, d), hn(x, h);
            var T = hn(x, d);
            for (h = 0; h < k.length; h += 2) {
              var D = k[h], F = k[h + 1];
              D === "style" ? Ur(c, F) : D === "dangerouslySetInnerHTML" ? Fn(c, F) : D === "children" ? Gt(c, F) : V(c, D, F, T);
            }
            switch (x) {
              case "input":
                lr(c, d);
                break;
              case "textarea":
                B(c, d);
                break;
              case "select":
                var A = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var H = d.value;
                H != null ? Kt(c, !!d.multiple, H, !1) : A !== !!d.multiple && (d.defaultValue != null ? Kt(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Kt(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[ps] = d;
          } catch (G) {
            Xe(e, e.return, G);
          }
        }
        break;
      case 6:
        if (Dt(t, e), Yt(e), o & 4) {
          if (e.stateNode === null) throw Error(l(162));
          c = e.stateNode, d = e.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (G) {
            Xe(e, e.return, G);
          }
        }
        break;
      case 3:
        if (Dt(t, e), Yt(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
          rs(t.containerInfo);
        } catch (G) {
          Xe(e, e.return, G);
        }
        break;
      case 4:
        Dt(t, e), Yt(e);
        break;
      case 13:
        Dt(t, e), Yt(e), c = e.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Vo = We())), o & 4 && Sd(e);
        break;
      case 22:
        if (D = r !== null && r.memoizedState !== null, e.mode & 1 ? (lt = (T = lt) || D, Dt(t, e), lt = T) : Dt(t, e), Yt(e), o & 8192) {
          if (T = e.memoizedState !== null, (e.stateNode.isHidden = T) && !D && (e.mode & 1) !== 0) for (Y = e, D = e.child; D !== null; ) {
            for (F = Y = D; Y !== null; ) {
              switch (A = Y, H = A.child, A.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ns(4, A, A.return);
                  break;
                case 1:
                  Lr(A, A.return);
                  var K = A.stateNode;
                  if (typeof K.componentWillUnmount == "function") {
                    o = A, r = A.return;
                    try {
                      t = o, K.props = t.memoizedProps, K.state = t.memoizedState, K.componentWillUnmount();
                    } catch (G) {
                      Xe(o, r, G);
                    }
                  }
                  break;
                case 5:
                  Lr(A, A.return);
                  break;
                case 22:
                  if (A.memoizedState !== null) {
                    Cd(F);
                    continue;
                  }
              }
              H !== null ? (H.return = A, Y = H) : Cd(F);
            }
            D = D.sibling;
          }
          e: for (D = null, F = e; ; ) {
            if (F.tag === 5) {
              if (D === null) {
                D = F;
                try {
                  c = F.stateNode, T ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (x = F.stateNode, k = F.memoizedProps.style, h = k != null && k.hasOwnProperty("display") ? k.display : null, x.style.display = Hr("display", h));
                } catch (G) {
                  Xe(e, e.return, G);
                }
              }
            } else if (F.tag === 6) {
              if (D === null) try {
                F.stateNode.nodeValue = T ? "" : F.memoizedProps;
              } catch (G) {
                Xe(e, e.return, G);
              }
            } else if ((F.tag !== 22 && F.tag !== 23 || F.memoizedState === null || F === e) && F.child !== null) {
              F.child.return = F, F = F.child;
              continue;
            }
            if (F === e) break e;
            for (; F.sibling === null; ) {
              if (F.return === null || F.return === e) break e;
              D === F && (D = null), F = F.return;
            }
            D === F && (D = null), F.sibling.return = F.return, F = F.sibling;
          }
        }
        break;
      case 19:
        Dt(t, e), Yt(e), o & 4 && Sd(e);
        break;
      case 21:
        break;
      default:
        Dt(
          t,
          e
        ), Yt(e);
    }
  }
  function Yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (kd(r)) {
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
            o.flags & 32 && (Gt(c, ""), o.flags &= -33);
            var d = vd(e);
            Ho(e, d, c);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, x = vd(e);
            qo(e, x, h);
            break;
          default:
            throw Error(l(161));
        }
      } catch (k) {
        Xe(e, e.return, k);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function P0(e, t, r) {
    Y = e, Nd(e);
  }
  function Nd(e, t, r) {
    for (var o = (e.mode & 1) !== 0; Y !== null; ) {
      var c = Y, d = c.child;
      if (c.tag === 22 && o) {
        var h = c.memoizedState !== null || Di;
        if (!h) {
          var x = c.alternate, k = x !== null && x.memoizedState !== null || lt;
          x = Di;
          var T = lt;
          if (Di = h, (lt = k) && !T) for (Y = c; Y !== null; ) h = Y, k = h.child, h.tag === 22 && h.memoizedState !== null ? Td(c) : k !== null ? (k.return = h, Y = k) : Td(c);
          for (; d !== null; ) Y = d, Nd(d), d = d.sibling;
          Y = c, Di = x, lt = T;
        }
        Ed(e);
      } else (c.subtreeFlags & 8772) !== 0 && d !== null ? (d.return = c, Y = d) : Ed(e);
    }
  }
  function Ed(e) {
    for (; Y !== null; ) {
      var t = Y;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              lt || Fi(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !lt) if (r === null) o.componentDidMount();
              else {
                var c = t.elementType === t.type ? r.memoizedProps : $t(t.type, r.memoizedProps);
                o.componentDidUpdate(c, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = t.updateQueue;
              d !== null && Cu(t, d, o);
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
                Cu(t, h, r);
              }
              break;
            case 5:
              var x = t.stateNode;
              if (r === null && t.flags & 4) {
                r = x;
                var k = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && r.focus();
                    break;
                  case "img":
                    k.src && (r.src = k.src);
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
                  var D = T.memoizedState;
                  if (D !== null) {
                    var F = D.dehydrated;
                    F !== null && rs(F);
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
          lt || t.flags & 512 && Bo(t);
        } catch (A) {
          Xe(t, t.return, A);
        }
      }
      if (t === e) {
        Y = null;
        break;
      }
      if (r = t.sibling, r !== null) {
        r.return = t.return, Y = r;
        break;
      }
      Y = t.return;
    }
  }
  function Cd(e) {
    for (; Y !== null; ) {
      var t = Y;
      if (t === e) {
        Y = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        r.return = t.return, Y = r;
        break;
      }
      Y = t.return;
    }
  }
  function Td(e) {
    for (; Y !== null; ) {
      var t = Y;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              Fi(4, t);
            } catch (k) {
              Xe(t, r, k);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = t.return;
              try {
                o.componentDidMount();
              } catch (k) {
                Xe(t, c, k);
              }
            }
            var d = t.return;
            try {
              Bo(t);
            } catch (k) {
              Xe(t, d, k);
            }
            break;
          case 5:
            var h = t.return;
            try {
              Bo(t);
            } catch (k) {
              Xe(t, h, k);
            }
        }
      } catch (k) {
        Xe(t, t.return, k);
      }
      if (t === e) {
        Y = null;
        break;
      }
      var x = t.sibling;
      if (x !== null) {
        x.return = t.return, Y = x;
        break;
      }
      Y = t.return;
    }
  }
  var $0 = Math.ceil, zi = ne.ReactCurrentDispatcher, Uo = ne.ReactCurrentOwner, Rt = ne.ReactCurrentBatchConfig, je = 0, Ve = null, Be = null, et = 0, bt = 0, Rr = vn(0), He = 0, Es = null, Yn = 0, Xi = 0, Yo = 0, Cs = null, mt = null, Vo = 0, _r = 1 / 0, on = null, Wi = !1, Qo = null, Cn = null, Zi = !1, Tn = null, Bi = 0, Ts = 0, Ko = null, qi = -1, Hi = 0;
  function ut() {
    return (je & 6) !== 0 ? We() : qi !== -1 ? qi : qi = We();
  }
  function In(e) {
    return (e.mode & 1) === 0 ? 1 : (je & 2) !== 0 && et !== 0 ? et & -et : w0.transition !== null ? (Hi === 0 && (Hi = vc()), Hi) : (e = Ie, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Lc(e.type)), e);
  }
  function Ft(e, t, r, o) {
    if (50 < Ts) throw Ts = 0, Ko = null, Error(l(185));
    Gr(e, r, o), ((je & 2) === 0 || e !== Ve) && (e === Ve && ((je & 2) === 0 && (Xi |= r), He === 4 && Ln(e, et)), gt(e, o), r === 1 && je === 0 && (t.mode & 1) === 0 && (_r = We() + 500, ki && Sn()));
  }
  function gt(e, t) {
    var r = e.callbackNode;
    wp(e, t);
    var o = ti(e, e === Ve ? et : 0);
    if (o === 0) r !== null && xc(r), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (r != null && xc(r), t === 1) e.tag === 0 ? x0(Ld.bind(null, e)) : mu(Ld.bind(null, e)), p0(function() {
        (je & 6) === 0 && Sn();
      }), r = null;
      else {
        switch (jc(o)) {
          case 1:
            r = Il;
            break;
          case 4:
            r = wc;
            break;
          case 16:
            r = Ks;
            break;
          case 536870912:
            r = kc;
            break;
          default:
            r = Ks;
        }
        r = Dd(r, Id.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = r;
    }
  }
  function Id(e, t) {
    if (qi = -1, Hi = 0, (je & 6) !== 0) throw Error(l(327));
    var r = e.callbackNode;
    if (Or() && e.callbackNode !== r) return null;
    var o = ti(e, e === Ve ? et : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Ui(e, o);
    else {
      t = o;
      var c = je;
      je |= 2;
      var d = _d();
      (Ve !== e || et !== t) && (on = null, _r = We() + 500, Qn(e, t));
      do
        try {
          F0();
          break;
        } catch (x) {
          Rd(e, x);
        }
      while (!0);
      mo(), zi.current = d, je = c, Be !== null ? t = 0 : (Ve = null, et = 0, t = He);
    }
    if (t !== 0) {
      if (t === 2 && (c = Ll(e), c !== 0 && (o = c, t = Go(e, c))), t === 1) throw r = Es, Qn(e, 0), Ln(e, o), gt(e, We()), r;
      if (t === 6) Ln(e, o);
      else {
        if (c = e.current.alternate, (o & 30) === 0 && !A0(c) && (t = Ui(e, o), t === 2 && (d = Ll(e), d !== 0 && (o = d, t = Go(e, d))), t === 1)) throw r = Es, Qn(e, 0), Ln(e, o), gt(e, We()), r;
        switch (e.finishedWork = c, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(l(345));
          case 2:
            Kn(e, mt, on);
            break;
          case 3:
            if (Ln(e, o), (o & 130023424) === o && (t = Vo + 500 - We(), 10 < t)) {
              if (ti(e, 0) !== 0) break;
              if (c = e.suspendedLanes, (c & o) !== o) {
                ut(), e.pingedLanes |= e.suspendedLanes & c;
                break;
              }
              e.timeoutHandle = ro(Kn.bind(null, e, mt, on), t);
              break;
            }
            Kn(e, mt, on);
            break;
          case 4:
            if (Ln(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, c = -1; 0 < o; ) {
              var h = 31 - Ot(o);
              d = 1 << h, h = t[h], h > c && (c = h), o &= ~d;
            }
            if (o = c, o = We() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * $0(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = ro(Kn.bind(null, e, mt, on), o);
              break;
            }
            Kn(e, mt, on);
            break;
          case 5:
            Kn(e, mt, on);
            break;
          default:
            throw Error(l(329));
        }
      }
    }
    return gt(e, We()), e.callbackNode === r ? Id.bind(null, e) : null;
  }
  function Go(e, t) {
    var r = Cs;
    return e.current.memoizedState.isDehydrated && (Qn(e, t).flags |= 256), e = Ui(e, t), e !== 2 && (t = mt, mt = r, t !== null && Jo(t)), e;
  }
  function Jo(e) {
    mt === null ? mt = e : mt.push.apply(mt, e);
  }
  function A0(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
          var c = r[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Mt(d(), c)) return !1;
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
  function Ln(e, t) {
    for (t &= ~Yo, t &= ~Xi, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var r = 31 - Ot(t), o = 1 << r;
      e[r] = -1, t &= ~o;
    }
  }
  function Ld(e) {
    if ((je & 6) !== 0) throw Error(l(327));
    Or();
    var t = ti(e, 0);
    if ((t & 1) === 0) return gt(e, We()), null;
    var r = Ui(e, t);
    if (e.tag !== 0 && r === 2) {
      var o = Ll(e);
      o !== 0 && (t = o, r = Go(e, o));
    }
    if (r === 1) throw r = Es, Qn(e, 0), Ln(e, t), gt(e, We()), r;
    if (r === 6) throw Error(l(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Kn(e, mt, on), gt(e, We()), null;
  }
  function ea(e, t) {
    var r = je;
    je |= 1;
    try {
      return e(t);
    } finally {
      je = r, je === 0 && (_r = We() + 500, ki && Sn());
    }
  }
  function Vn(e) {
    Tn !== null && Tn.tag === 0 && (je & 6) === 0 && Or();
    var t = je;
    je |= 1;
    var r = Rt.transition, o = Ie;
    try {
      if (Rt.transition = null, Ie = 1, e) return e();
    } finally {
      Ie = o, Rt.transition = r, je = t, (je & 6) === 0 && Sn();
    }
  }
  function ta() {
    bt = Rr.current, Pe(Rr);
  }
  function Qn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var r = e.timeoutHandle;
    if (r !== -1 && (e.timeoutHandle = -1, h0(r)), Be !== null) for (r = Be.return; r !== null; ) {
      var o = r;
      switch (co(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && xi();
          break;
        case 3:
          Tr(), Pe(ft), Pe(rt), So();
          break;
        case 5:
          vo(o);
          break;
        case 4:
          Tr();
          break;
        case 13:
          Pe(Fe);
          break;
        case 19:
          Pe(Fe);
          break;
        case 10:
          go(o.type._context);
          break;
        case 22:
        case 23:
          ta();
      }
      r = r.return;
    }
    if (Ve = e, Be = e = Rn(e.current, null), et = bt = t, He = 0, Es = null, Yo = Xi = Yn = 0, mt = Cs = null, qn !== null) {
      for (t = 0; t < qn.length; t++) if (r = qn[t], o = r.interleaved, o !== null) {
        r.interleaved = null;
        var c = o.next, d = r.pending;
        if (d !== null) {
          var h = d.next;
          d.next = c, o.next = h;
        }
        r.pending = o;
      }
      qn = null;
    }
    return e;
  }
  function Rd(e, t) {
    do {
      var r = Be;
      try {
        if (mo(), Li.current = Mi, Ri) {
          for (var o = ze.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Ri = !1;
        }
        if (Un = 0, Ye = qe = ze = null, ks = !1, vs = 0, Uo.current = null, r === null || r.return === null) {
          He = 1, Es = t, Be = null;
          break;
        }
        e: {
          var d = e, h = r.return, x = r, k = t;
          if (t = et, x.flags |= 32768, k !== null && typeof k == "object" && typeof k.then == "function") {
            var T = k, D = x, F = D.tag;
            if ((D.mode & 1) === 0 && (F === 0 || F === 11 || F === 15)) {
              var A = D.alternate;
              A ? (D.updateQueue = A.updateQueue, D.memoizedState = A.memoizedState, D.lanes = A.lanes) : (D.updateQueue = null, D.memoizedState = null);
            }
            var H = nd(h);
            if (H !== null) {
              H.flags &= -257, rd(H, h, x, d, t), H.mode & 1 && td(d, T, t), t = H, k = T;
              var K = t.updateQueue;
              if (K === null) {
                var G = /* @__PURE__ */ new Set();
                G.add(k), t.updateQueue = G;
              } else K.add(k);
              break e;
            } else {
              if ((t & 1) === 0) {
                td(d, T, t), na();
                break e;
              }
              k = Error(l(426));
            }
          } else if (Ae && x.mode & 1) {
            var Ze = nd(h);
            if (Ze !== null) {
              (Ze.flags & 65536) === 0 && (Ze.flags |= 256), rd(Ze, h, x, d, t), ho(Ir(k, x));
              break e;
            }
          }
          d = k = Ir(k, x), He !== 4 && (He = 2), Cs === null ? Cs = [d] : Cs.push(d), d = h;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, t &= -t, d.lanes |= t;
                var N = Ju(d, k, t);
                Eu(d, N);
                break e;
              case 1:
                x = k;
                var v = d.type, E = d.stateNode;
                if ((d.flags & 128) === 0 && (typeof v.getDerivedStateFromError == "function" || E !== null && typeof E.componentDidCatch == "function" && (Cn === null || !Cn.has(E)))) {
                  d.flags |= 65536, t &= -t, d.lanes |= t;
                  var X = ed(d, x, t);
                  Eu(d, X);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Md(r);
      } catch (ee) {
        t = ee, Be === r && r !== null && (Be = r = r.return);
        continue;
      }
      break;
    } while (!0);
  }
  function _d() {
    var e = zi.current;
    return zi.current = Mi, e === null ? Mi : e;
  }
  function na() {
    (He === 0 || He === 3 || He === 2) && (He = 4), Ve === null || (Yn & 268435455) === 0 && (Xi & 268435455) === 0 || Ln(Ve, et);
  }
  function Ui(e, t) {
    var r = je;
    je |= 2;
    var o = _d();
    (Ve !== e || et !== t) && (on = null, Qn(e, t));
    do
      try {
        D0();
        break;
      } catch (c) {
        Rd(e, c);
      }
    while (!0);
    if (mo(), je = r, zi.current = o, Be !== null) throw Error(l(261));
    return Ve = null, et = 0, He;
  }
  function D0() {
    for (; Be !== null; ) Od(Be);
  }
  function F0() {
    for (; Be !== null && !up(); ) Od(Be);
  }
  function Od(e) {
    var t = Ad(e.alternate, e, bt);
    e.memoizedProps = e.pendingProps, t === null ? Md(e) : Be = t, Uo.current = null;
  }
  function Md(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (r = R0(r, t, bt), r !== null) {
          Be = r;
          return;
        }
      } else {
        if (r = _0(r, t), r !== null) {
          r.flags &= 32767, Be = r;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          He = 6, Be = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Be = t;
        return;
      }
      Be = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function Kn(e, t, r) {
    var o = Ie, c = Rt.transition;
    try {
      Rt.transition = null, Ie = 1, z0(e, t, r, o);
    } finally {
      Rt.transition = c, Ie = o;
    }
    return null;
  }
  function z0(e, t, r, o) {
    do
      Or();
    while (Tn !== null);
    if ((je & 6) !== 0) throw Error(l(327));
    r = e.finishedWork;
    var c = e.finishedLanes;
    if (r === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(l(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var d = r.lanes | r.childLanes;
    if (kp(e, d), e === Ve && (Be = Ve = null, et = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || Zi || (Zi = !0, Dd(Ks, function() {
      return Or(), null;
    })), d = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || d) {
      d = Rt.transition, Rt.transition = null;
      var h = Ie;
      Ie = 1;
      var x = je;
      je |= 4, Uo.current = null, M0(e, r), bd(r, e), l0(to), si = !!eo, to = eo = null, e.current = r, P0(r), dp(), je = x, Ie = h, Rt.transition = d;
    } else e.current = r;
    if (Zi && (Zi = !1, Tn = e, Bi = c), d = e.pendingLanes, d === 0 && (Cn = null), pp(r.stateNode), gt(e, We()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) c = t[r], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Wi) throw Wi = !1, e = Qo, Qo = null, e;
    return (Bi & 1) !== 0 && e.tag !== 0 && Or(), d = e.pendingLanes, (d & 1) !== 0 ? e === Ko ? Ts++ : (Ts = 0, Ko = e) : Ts = 0, Sn(), null;
  }
  function Or() {
    if (Tn !== null) {
      var e = jc(Bi), t = Rt.transition, r = Ie;
      try {
        if (Rt.transition = null, Ie = 16 > e ? 16 : e, Tn === null) var o = !1;
        else {
          if (e = Tn, Tn = null, Bi = 0, (je & 6) !== 0) throw Error(l(331));
          var c = je;
          for (je |= 4, Y = e.current; Y !== null; ) {
            var d = Y, h = d.child;
            if ((Y.flags & 16) !== 0) {
              var x = d.deletions;
              if (x !== null) {
                for (var k = 0; k < x.length; k++) {
                  var T = x[k];
                  for (Y = T; Y !== null; ) {
                    var D = Y;
                    switch (D.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ns(8, D, d);
                    }
                    var F = D.child;
                    if (F !== null) F.return = D, Y = F;
                    else for (; Y !== null; ) {
                      D = Y;
                      var A = D.sibling, H = D.return;
                      if (wd(D), D === T) {
                        Y = null;
                        break;
                      }
                      if (A !== null) {
                        A.return = H, Y = A;
                        break;
                      }
                      Y = H;
                    }
                  }
                }
                var K = d.alternate;
                if (K !== null) {
                  var G = K.child;
                  if (G !== null) {
                    K.child = null;
                    do {
                      var Ze = G.sibling;
                      G.sibling = null, G = Ze;
                    } while (G !== null);
                  }
                }
                Y = d;
              }
            }
            if ((d.subtreeFlags & 2064) !== 0 && h !== null) h.return = d, Y = h;
            else e: for (; Y !== null; ) {
              if (d = Y, (d.flags & 2048) !== 0) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Ns(9, d, d.return);
              }
              var N = d.sibling;
              if (N !== null) {
                N.return = d.return, Y = N;
                break e;
              }
              Y = d.return;
            }
          }
          var v = e.current;
          for (Y = v; Y !== null; ) {
            h = Y;
            var E = h.child;
            if ((h.subtreeFlags & 2064) !== 0 && E !== null) E.return = h, Y = E;
            else e: for (h = v; Y !== null; ) {
              if (x = Y, (x.flags & 2048) !== 0) try {
                switch (x.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Fi(9, x);
                }
              } catch (ee) {
                Xe(x, x.return, ee);
              }
              if (x === h) {
                Y = null;
                break e;
              }
              var X = x.sibling;
              if (X !== null) {
                X.return = x.return, Y = X;
                break e;
              }
              Y = x.return;
            }
          }
          if (je = c, Sn(), Bt && typeof Bt.onPostCommitFiberRoot == "function") try {
            Bt.onPostCommitFiberRoot(Gs, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Ie = r, Rt.transition = t;
      }
    }
    return !1;
  }
  function Pd(e, t, r) {
    t = Ir(r, t), t = Ju(e, t, 1), e = Nn(e, t, 1), t = ut(), e !== null && (Gr(e, 1, t), gt(e, t));
  }
  function Xe(e, t, r) {
    if (e.tag === 3) Pd(e, e, r);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Pd(t, e, r);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Cn === null || !Cn.has(o))) {
          e = Ir(r, e), e = ed(t, e, 1), t = Nn(t, e, 1), e = ut(), t !== null && (Gr(t, 1, e), gt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function X0(e, t, r) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = ut(), e.pingedLanes |= e.suspendedLanes & r, Ve === e && (et & r) === r && (He === 4 || He === 3 && (et & 130023424) === et && 500 > We() - Vo ? Qn(e, 0) : Yo |= r), gt(e, t);
  }
  function $d(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = ei, ei <<= 1, (ei & 130023424) === 0 && (ei = 4194304)));
    var r = ut();
    e = rn(e, t), e !== null && (Gr(e, t, r), gt(e, r));
  }
  function W0(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), $d(e, r);
  }
  function Z0(e, t) {
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
    o !== null && o.delete(t), $d(e, r);
  }
  var Ad;
  Ad = function(e, t, r) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || ft.current) pt = !0;
    else {
      if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return pt = !1, L0(e, t, r);
      pt = (e.flags & 131072) !== 0;
    }
    else pt = !1, Ae && (t.flags & 1048576) !== 0 && gu(t, ji, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Ai(e, t), e = t.pendingProps;
        var c = vr(t, rt.current);
        Cr(t, r), c = Eo(null, t, o, e, c, r);
        var d = Co();
        return t.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ht(o) ? (d = !0, wi(t)) : d = !1, t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, wo(t), c.updater = Pi, t.stateNode = c, c._reactInternals = t, Oo(t, o, e, r), t = Ao(null, t, o, !0, d, r)) : (t.tag = 0, Ae && d && ao(t), ct(null, t, c, r), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Ai(e, t), e = t.pendingProps, c = o._init, o = c(o._payload), t.type = o, c = t.tag = q0(o), e = $t(o, e), c) {
            case 0:
              t = $o(null, t, o, e, r);
              break e;
            case 1:
              t = cd(null, t, o, e, r);
              break e;
            case 11:
              t = sd(null, t, o, e, r);
              break e;
            case 14:
              t = id(null, t, o, $t(o.type, e), r);
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
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : $t(o, c), $o(e, t, o, c, r);
      case 1:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : $t(o, c), cd(e, t, o, c, r);
      case 3:
        e: {
          if (ud(t), e === null) throw Error(l(387));
          o = t.pendingProps, d = t.memoizedState, c = d.element, Nu(e, t), Ti(t, o, null, r);
          var h = t.memoizedState;
          if (o = h.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
            c = Ir(Error(l(423)), t), t = dd(e, t, o, r, c);
            break e;
          } else if (o !== c) {
            c = Ir(Error(l(424)), t), t = dd(e, t, o, r, c);
            break e;
          } else for (St = kn(t.stateNode.containerInfo.firstChild), jt = t, Ae = !0, Pt = null, r = Su(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
          else {
            if (br(), o === c) {
              t = ln(e, t, r);
              break e;
            }
            ct(e, t, o, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Tu(t), e === null && fo(t), o = t.type, c = t.pendingProps, d = e !== null ? e.memoizedProps : null, h = c.children, no(o, c) ? h = null : d !== null && no(o, d) && (t.flags |= 32), ad(e, t), ct(e, t, h, r), t.child;
      case 6:
        return e === null && fo(t), null;
      case 13:
        return fd(e, t, r);
      case 4:
        return ko(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = Nr(t, null, o, r) : ct(e, t, o, r), t.child;
      case 11:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : $t(o, c), sd(e, t, o, c, r);
      case 7:
        return ct(e, t, t.pendingProps, r), t.child;
      case 8:
        return ct(e, t, t.pendingProps.children, r), t.child;
      case 12:
        return ct(e, t, t.pendingProps.children, r), t.child;
      case 10:
        e: {
          if (o = t.type._context, c = t.pendingProps, d = t.memoizedProps, h = c.value, _e(Ni, o._currentValue), o._currentValue = h, d !== null) if (Mt(d.value, h)) {
            if (d.children === c.children && !ft.current) {
              t = ln(e, t, r);
              break e;
            }
          } else for (d = t.child, d !== null && (d.return = t); d !== null; ) {
            var x = d.dependencies;
            if (x !== null) {
              h = d.child;
              for (var k = x.firstContext; k !== null; ) {
                if (k.context === o) {
                  if (d.tag === 1) {
                    k = sn(-1, r & -r), k.tag = 2;
                    var T = d.updateQueue;
                    if (T !== null) {
                      T = T.shared;
                      var D = T.pending;
                      D === null ? k.next = k : (k.next = D.next, D.next = k), T.pending = k;
                    }
                  }
                  d.lanes |= r, k = d.alternate, k !== null && (k.lanes |= r), yo(
                    d.return,
                    r,
                    t
                  ), x.lanes |= r;
                  break;
                }
                k = k.next;
              }
            } else if (d.tag === 10) h = d.type === t.type ? null : d.child;
            else if (d.tag === 18) {
              if (h = d.return, h === null) throw Error(l(341));
              h.lanes |= r, x = h.alternate, x !== null && (x.lanes |= r), yo(h, r, t), h = d.sibling;
            } else h = d.child;
            if (h !== null) h.return = d;
            else for (h = d; h !== null; ) {
              if (h === t) {
                h = null;
                break;
              }
              if (d = h.sibling, d !== null) {
                d.return = h.return, h = d;
                break;
              }
              h = h.return;
            }
            d = h;
          }
          ct(e, t, c.children, r), t = t.child;
        }
        return t;
      case 9:
        return c = t.type, o = t.pendingProps.children, Cr(t, r), c = It(c), o = o(c), t.flags |= 1, ct(e, t, o, r), t.child;
      case 14:
        return o = t.type, c = $t(o, t.pendingProps), c = $t(o.type, c), id(e, t, o, c, r);
      case 15:
        return ld(e, t, t.type, t.pendingProps, r);
      case 17:
        return o = t.type, c = t.pendingProps, c = t.elementType === o ? c : $t(o, c), Ai(e, t), t.tag = 1, ht(o) ? (e = !0, wi(t)) : e = !1, Cr(t, r), Ku(t, o, c), Oo(t, o, c, r), Ao(null, t, o, !0, e, r);
      case 19:
        return pd(e, t, r);
      case 22:
        return od(e, t, r);
    }
    throw Error(l(156, t.tag));
  };
  function Dd(e, t) {
    return yc(e, t);
  }
  function B0(e, t, r, o) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, r, o) {
    return new B0(e, t, r, o);
  }
  function ra(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function q0(e) {
    if (typeof e == "function") return ra(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === Z) return 11;
      if (e === ae) return 14;
    }
    return 2;
  }
  function Rn(e, t) {
    var r = e.alternate;
    return r === null ? (r = _t(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
  }
  function Yi(e, t, r, o, c, d) {
    var h = 2;
    if (o = e, typeof e == "function") ra(e) && (h = 1);
    else if (typeof e == "string") h = 5;
    else e: switch (e) {
      case fe:
        return Gn(r.children, c, d, t);
      case $:
        h = 8, c |= 8;
        break;
      case me:
        return e = _t(12, r, t, c | 2), e.elementType = me, e.lanes = d, e;
      case U:
        return e = _t(13, r, t, c), e.elementType = U, e.lanes = d, e;
      case Se:
        return e = _t(19, r, t, c), e.elementType = Se, e.lanes = d, e;
      case we:
        return Vi(r, c, d, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case he:
            h = 10;
            break e;
          case oe:
            h = 9;
            break e;
          case Z:
            h = 11;
            break e;
          case ae:
            h = 14;
            break e;
          case le:
            h = 16, o = null;
            break e;
        }
        throw Error(l(130, e == null ? e : typeof e, ""));
    }
    return t = _t(h, r, t, c), t.elementType = e, t.type = o, t.lanes = d, t;
  }
  function Gn(e, t, r, o) {
    return e = _t(7, e, o, t), e.lanes = r, e;
  }
  function Vi(e, t, r, o) {
    return e = _t(22, e, o, t), e.elementType = we, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
  }
  function sa(e, t, r) {
    return e = _t(6, e, null, t), e.lanes = r, e;
  }
  function ia(e, t, r) {
    return t = _t(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function H0(e, t, r, o, c) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Rl(0), this.expirationTimes = Rl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rl(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function la(e, t, r, o, c, d, h, x, k) {
    return e = new H0(e, t, r, x, k), t === 1 ? (t = 1, d === !0 && (t |= 8)) : t = 0, d = _t(3, null, null, t), e.current = d, d.stateNode = e, d.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, wo(d), e;
  }
  function U0(e, t, r) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: J, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
  }
  function Fd(e) {
    if (!e) return jn;
    e = e._reactInternals;
    e: {
      if (zn(e) !== e || e.tag !== 1) throw Error(l(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ht(t.type)) {
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
      if (ht(r)) return hu(e, r, t);
    }
    return t;
  }
  function zd(e, t, r, o, c, d, h, x, k) {
    return e = la(r, o, !0, e, c, d, h, x, k), e.context = Fd(null), r = e.current, o = ut(), c = In(r), d = sn(o, c), d.callback = t ?? null, Nn(r, d, c), e.current.lanes = c, Gr(e, c, o), gt(e, o), e;
  }
  function Qi(e, t, r, o) {
    var c = t.current, d = ut(), h = In(c);
    return r = Fd(r), t.context === null ? t.context = r : t.pendingContext = r, t = sn(d, h), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = Nn(c, t, h), e !== null && (Ft(e, c, h, d), Ci(e, c, h)), h;
  }
  function Ki(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Xd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function oa(e, t) {
    Xd(e, t), (e = e.alternate) && Xd(e, t);
  }
  function Y0() {
    return null;
  }
  var Wd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function aa(e) {
    this._internalRoot = e;
  }
  Gi.prototype.render = aa.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(l(409));
    Qi(e, t, null, null);
  }, Gi.prototype.unmount = aa.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Vn(function() {
        Qi(null, e, null, null);
      }), t[Jt] = null;
    }
  };
  function Gi(e) {
    this._internalRoot = e;
  }
  Gi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Nc();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < yn.length && t !== 0 && t < yn[r].priority; r++) ;
      yn.splice(r, 0, e), r === 0 && Tc(e);
    }
  };
  function ca(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Ji(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Zd() {
  }
  function V0(e, t, r, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var T = Ki(h);
          d.call(T);
        };
      }
      var h = zd(t, o, e, 0, null, !1, !1, "", Zd);
      return e._reactRootContainer = h, e[Jt] = h.current, fs(e.nodeType === 8 ? e.parentNode : e), Vn(), h;
    }
    for (; c = e.lastChild; ) e.removeChild(c);
    if (typeof o == "function") {
      var x = o;
      o = function() {
        var T = Ki(k);
        x.call(T);
      };
    }
    var k = la(e, 0, !1, null, null, !1, !1, "", Zd);
    return e._reactRootContainer = k, e[Jt] = k.current, fs(e.nodeType === 8 ? e.parentNode : e), Vn(function() {
      Qi(t, k, r, o);
    }), k;
  }
  function el(e, t, r, o, c) {
    var d = r._reactRootContainer;
    if (d) {
      var h = d;
      if (typeof c == "function") {
        var x = c;
        c = function() {
          var k = Ki(h);
          x.call(k);
        };
      }
      Qi(t, h, e, c);
    } else h = V0(r, t, e, c, o);
    return Ki(h);
  }
  Sc = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Kr(t.pendingLanes);
          r !== 0 && (_l(t, r | 1), gt(t, We()), (je & 6) === 0 && (_r = We() + 500, Sn()));
        }
        break;
      case 13:
        Vn(function() {
          var o = rn(e, 1);
          if (o !== null) {
            var c = ut();
            Ft(o, e, 1, c);
          }
        }), oa(e, 1);
    }
  }, Ol = function(e) {
    if (e.tag === 13) {
      var t = rn(e, 134217728);
      if (t !== null) {
        var r = ut();
        Ft(t, e, 134217728, r);
      }
      oa(e, 134217728);
    }
  }, bc = function(e) {
    if (e.tag === 13) {
      var t = In(e), r = rn(e, t);
      if (r !== null) {
        var o = ut();
        Ft(r, e, t, o);
      }
      oa(e, t);
    }
  }, Nc = function() {
    return Ie;
  }, Ec = function(e, t) {
    var r = Ie;
    try {
      return Ie = e, t();
    } finally {
      Ie = r;
    }
  }, Nl = function(e, t, r) {
    switch (t) {
      case "input":
        if (lr(e, r), t = r.name, r.type === "radio" && t != null) {
          for (r = e; r.parentNode; ) r = r.parentNode;
          for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
            var o = r[t];
            if (o !== e && o.form === e.form) {
              var c = yi(o);
              if (!c) throw Error(l(90));
              Bs(o), lr(o, c);
            }
          }
        }
        break;
      case "textarea":
        B(e, r);
        break;
      case "select":
        t = r.value, t != null && Kt(e, !!r.multiple, t, !1);
    }
  }, uc = ea, dc = Vn;
  var Q0 = { usingClientEntryPoint: !1, Events: [ms, wr, yi, ac, cc, ea] }, Is = { findFiberByHostInstance: Xn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, K0 = { bundleType: Is.bundleType, version: Is.version, rendererPackageName: Is.rendererPackageName, rendererConfig: Is.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ne.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = mc(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: Is.findFiberByHostInstance || Y0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var tl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!tl.isDisabled && tl.supportsFiber) try {
      Gs = tl.inject(K0), Bt = tl;
    } catch {
    }
  }
  return yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Q0, yt.createPortal = function(e, t) {
    var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ca(t)) throw Error(l(200));
    return U0(e, t, null, r);
  }, yt.createRoot = function(e, t) {
    if (!ca(e)) throw Error(l(299));
    var r = !1, o = "", c = Wd;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = la(e, 1, !1, null, null, r, !1, o, c), e[Jt] = t.current, fs(e.nodeType === 8 ? e.parentNode : e), new aa(t);
  }, yt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = mc(t), e = e === null ? null : e.stateNode, e;
  }, yt.flushSync = function(e) {
    return Vn(e);
  }, yt.hydrate = function(e, t, r) {
    if (!Ji(t)) throw Error(l(200));
    return el(null, e, t, !0, r);
  }, yt.hydrateRoot = function(e, t, r) {
    if (!ca(e)) throw Error(l(405));
    var o = r != null && r.hydratedSources || null, c = !1, d = "", h = Wd;
    if (r != null && (r.unstable_strictMode === !0 && (c = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onRecoverableError !== void 0 && (h = r.onRecoverableError)), t = zd(t, null, e, 1, r ?? null, c, !1, d, h), e[Jt] = t.current, fs(e), o) for (e = 0; e < o.length; e++) r = o[e], c = r._getVersion, c = c(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, c] : t.mutableSourceEagerHydrationData.push(
      r,
      c
    );
    return new Gi(t);
  }, yt.render = function(e, t, r) {
    if (!Ji(t)) throw Error(l(200));
    return el(null, e, t, !1, r);
  }, yt.unmountComponentAtNode = function(e) {
    if (!Ji(e)) throw Error(l(40));
    return e._reactRootContainer ? (Vn(function() {
      el(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Jt] = null;
      });
    }), !0) : !1;
  }, yt.unstable_batchedUpdates = ea, yt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
    if (!Ji(r)) throw Error(l(200));
    if (e == null || e._reactInternals === void 0) throw Error(l(38));
    return el(e, t, r, !1, o);
  }, yt.version = "18.3.1-next-f1338f8080-20240426", yt;
}
var Kd;
function Gf() {
  if (Kd) return fa.exports;
  Kd = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (s) {
        console.error(s);
      }
  }
  return n(), fa.exports = sm(), fa.exports;
}
var Gd;
function im() {
  if (Gd) return nl;
  Gd = 1;
  var n = Gf();
  return nl.createRoot = n.createRoot, nl.hydrateRoot = n.hydrateRoot, nl;
}
var lm = im();
function om(n) {
  return n !== "I";
}
const Ps = 2, Jf = /* @__PURE__ */ JSON.parse(`[{"allowed":["X"],"briefing":"Welcome to dispatch. Three houses stand in a row with two alarm stations between them. Our arsonist, Noise, only lights red fires here (X errors). A station rings when exactly one of its two houses is burning. Read the alarms, then send one red crew.","budget":1,"challenge":{"circuit":[],"error":"IXI"},"code":"rep3","debrief":{"detectable":"At least one station is still ringing: either the original fire is still burning, or a crew lit a new one on a safe house. Replay the original alarms: both stations rang, and house 1 is the only house they share.","logical-error":"Every alarm is quiet, yet the pattern left behind is a full logical flip (XXX). A crew sent to a safe house starts a fire of its own, so silence alone never proves safety. Compare your dispatch with the alarms in the replay.","success":"Both stations rang, and house 1 is the only house they share. Your red crew met the fire head on, and two red flames cancel (X·X = I). The logical qubit is safe."},"expected":{"minWeightCorrection":"IXI","minWeightVerdict":"success","propagated":"IXI","syndrome":[1,1]},"id":"first-alarm","index":1,"kind":"dispatch","title":"First Alarm","training":[{"caption":"A red fire (X) on house 0. Station Z0 watches houses 0 and 1, sees exactly one fire, and rings. Station Z1 watches houses 1 and 2, sees none, and stays quiet.","circuit":[],"error":"XII"}]},{"allowed":["X","Z","Y"],"briefing":"Fires never spread on their own; gates carry them. A CNOT copies a red fire (X) from its control to its target, and copies a blue fire (Z) from its target back to its control. Watch the training runs, then predict where the fires end up and send crews there.","budget":2,"challenge":{"circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XZ"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"There are no alarm stations on bare wires, so any fire you missed, or lit by mistake, acts directly on the data. Check both colours on each house: a Y fire needs both a red and a blue component to put it out.","success":"Red went forward and blue went backward at the same time, so XZ became YY: a red-and-blue fire on both houses. Your crews matched every component, and nothing remains."},"expected":{"minWeightCorrection":"YY","minWeightVerdict":"success","propagated":"YY","syndrome":[]},"id":"red-forward-blue-backward","index":2,"kind":"propagation","title":"Red Forward / Blue Backward","training":[{"caption":"Red forward: a red fire (X) on the control copies onto the target. XI becomes XX.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"XI"},{"caption":"Blue backward: a blue fire (Z) on the target copies onto the control. IZ becomes ZZ.","circuit":[{"c":0,"kind":"CNOT","t":1}],"error":"IZ"}]},{"allowed":["X","Z","Y"],"briefing":"A Hadamard gate swaps colours: red becomes blue and blue becomes red, on its own wire only. Combined with a CNOT, a single fire can change colour, copy itself, and change colour again. Follow the circuit one gate at a time.","budget":2,"challenge":{"circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1},{"kind":"H","q":1}],"error":"ZI"},"code":"trivial2","debrief":{"detectable":"This lesson has no alarm stations, so a ringing alarm cannot occur here.","logical-error":"One of the fires ended up with a different colour, or on a different house, than you dispatched for. Replay the circuit: H swaps colours only on its own wire, and CNOT copies red forward and blue backward.","success":"ZI turned into XI at the first Hadamard, copied forward to XX through the CNOT, and the final Hadamard on house 1 turned that copy blue: XZ. You traced the whole path."},"expected":{"minWeightCorrection":"XZ","minWeightVerdict":"success","propagated":"XZ","syndrome":[]},"id":"color-switch","index":3,"kind":"propagation","title":"Color Switch","training":[{"caption":"Colour switch: a Hadamard turns the red fire (X) on house 0 into a blue one (Z). XI becomes ZI.","circuit":[{"kind":"H","q":0}],"error":"XI"},{"caption":"Blue turns red at the H, then red copies forward through the CNOT. ZI becomes XX.","circuit":[{"kind":"H","q":0},{"c":0,"kind":"CNOT","t":1}],"error":"ZI"}]},{"allowed":["X","Z"],"briefing":"Welcome to the surface code district: nine houses and eight alarm stations. Red stations (Z checks, diamonds) notice red fires; blue stations (X checks, squares) notice blue fires. This time the fire is hidden. Read the alarms and send one crew.","budget":1,"challenge":{"circuit":[],"error":"IIIIXIIII"},"code":"rsc3","debrief":{"detectable":"Alarms are still ringing. A red crew on a house that was not burning starts a new fire, and a blue crew cannot put out a red fire at all. Match the crew colour to the station type, then find the house that every ringing station shares.","logical-error":"The alarms went quiet, but the pattern left behind acts as a logical operator on the encoded qubit. With one hidden fire and one crew this cannot happen in this district; Silent Failure shows when it does.","success":"Stations Z0 and Z1 both rang, and house 4 is the only house they share. One red crew, fire out, logical qubit safe."},"expected":{"minWeightCorrection":"IIIIXIIII","minWeightVerdict":"success","propagated":"IIIIXIIII","syndrome":[1,1,0,0,0,0,0,0]},"id":"blind-dispatch","index":4,"kind":"dispatch","title":"Blind Dispatch","training":[{"caption":"A red fire (X) on house 0 rings only station Z0, which watches houses 0, 1, 3 and 4. A fire on house 3 alone would ring exactly the same station, so a crew sent to house 3 is just as good a fix: the two dispatches differ by a stabilizer (the X2 station's own pattern), which the code does not care about.","circuit":[],"error":"XIIIIIIII"}]},{"allowed":["X","Z"],"briefing":"Two fires this time, and they may be different colours. Red stations only ever notice red fires and blue stations only blue ones, so read the two alarm maps separately. You have two crews of any colour, and each house takes at most one crew.","budget":2,"challenge":{"circuit":[],"error":"IXIIIIIZI"},"code":"rsc3","debrief":{"detectable":"Some stations are still ringing. Remember that a red station never sees a blue fire: solve the red alarms and the blue alarms as two separate puzzles, one crew colour each.","logical-error":"Every alarm is quiet but the leftover pattern is a logical operator: your crews and the fires together form a chain across the district instead of cancelling. The replay shows where the chain runs.","success":"Red stations Z0 and Z2 share only house 1. Blue station X1 rang alone, which points at its boundary pair, houses 6 and 7; a blue crew on either one works, because the two choices differ by a stabilizer. Two colours, two fires, both out."},"expected":{"minWeightCorrection":"IXIIIIZII","minWeightVerdict":"success","propagated":"IXIIIIIZI","syndrome":[1,0,1,0,0,1,0,0]},"id":"two-kinds-of-trouble","index":5,"kind":"dispatch","title":"Two Kinds of Trouble","training":[]},{"allowed":["X","Z"],"briefing":"Only one alarm is ringing: station Z0. Dispatch protocol is simple: send the smallest crew that silences every station. Make the call, and then we will look at what really happened.","budget":2,"challenge":{"circuit":[],"error":"IXXIIIIII"},"code":"rsc3","debrief":{"detectable":"Stations are still ringing, so the smallest silencing crew was not sent. Protocol for a lone Z0 alarm is one red crew on house 0 or house 3 (equivalent choices); replay the alarms and compare.","logical-error":"That was the optimal call. Only Z0 rang, and the best explanation of one alarm is one fire, on house 0 or house 3 (the two differ by a stabilizer, so either crew is the same call). But Noise lit two fires, on houses 1 and 2. Your crew plus those two fires form a red chain across the top of the district — X on houses 0, 1, 2 or the equivalent chain through house 3 — a logical X, which every station sees as an even count and so cannot detect. This code has distance 3: any single fire is always fixed, but two fires can fool any dispatcher, because no alarm pattern justified sending crews to houses 1 and 2. That is why real machines use bigger codes.","success":"You put out both fires, on houses 1 and 2. Honest question: how did you know? The alarms were identical to a single fire on house 0 or house 3, so this was a guess that happened to land. Protocol would still send one crew to house 0 or house 3, and this mission awards one star at most: the alarms alone cannot win it."},"expected":{"minWeightCorrection":"XIIIIIIII","minWeightVerdict":"logical-error","propagated":"IXXIIIIII","syndrome":[1,0,0,0,0,0,0,0]},"id":"silent-failure","index":6,"kind":"dispatch","maxStars":1,"title":"Silent Failure","training":[]}]`), am = ["I", "X", "Z", "Y"], dl = 30;
function cm(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError(`qubit count must be a non-negative integer, got ${String(n)}`);
}
function yl(n, s) {
  if (!Number.isInteger(n) || n < 0 || n >= s) throw new RangeError(`qubit index ${String(n)} out of range for n=${String(s)}`);
}
function eh(n) {
  return n === "I" || n === "X" || n === "Y" || n === "Z";
}
function Ds(n) {
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
function Da(n, s) {
  return am[n & 1 | (s & 1) << 1] ?? "I";
}
function xl(n) {
  return cm(n), { n, x: new Uint8Array(n), z: new Uint8Array(n) };
}
function Te(n) {
  const s = n.length, l = new Uint8Array(s), a = new Uint8Array(s);
  for (let u = 0; u < s; u++) {
    const f = n[u] ?? "";
    if (!eh(f)) throw new Error(`invalid Pauli letter '${f}' at position ${String(u)} in "${n}"`);
    const p = Ds(f);
    l[u] = p.x, a[u] = p.z;
  }
  return { n: s, x: l, z: a };
}
function Ee(n) {
  let s = "";
  for (let l = 0; l < n.n; l++) s += Da(n.x[l] ?? 0, n.z[l] ?? 0);
  return s;
}
function wl(n) {
  return { n: n.n, x: new Uint8Array(n.x), z: new Uint8Array(n.z) };
}
function um(n) {
  for (let s = 0; s < n.n; s++) if ((n.x[s] ?? 0) !== 0 || (n.z[s] ?? 0) !== 0) return !1;
  return !0;
}
function Fa(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot multiply Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  const l = new Uint8Array(n.n), a = new Uint8Array(n.n);
  for (let u = 0; u < n.n; u++)
    l[u] = (n.x[u] ?? 0) ^ (s.x[u] ?? 0), a[u] = (n.z[u] ?? 0) ^ (s.z[u] ?? 0);
  return { n: n.n, x: l, z: a };
}
function wt(n) {
  let s = 0;
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s++;
  return s;
}
function Et(n) {
  const s = [];
  for (let l = 0; l < n.n; l++) ((n.x[l] ?? 0) | (n.z[l] ?? 0)) !== 0 && s.push(l);
  return s;
}
function th(n, s) {
  if (n.n !== s.n) throw new RangeError(`cannot compare Paulis on ${String(n.n)} and ${String(s.n)} qubits`);
  let l = 0;
  for (let a = 0; a < n.n; a++)
    l ^= (n.x[a] ?? 0) & (s.z[a] ?? 0) ^ (n.z[a] ?? 0) & (s.x[a] ?? 0);
  return l & 1;
}
function Jd(n, s) {
  return th(n, s) === 1;
}
function tt(n, s) {
  return yl(s, n.n), Da(n.x[s] ?? 0, n.z[s] ?? 0);
}
function dm(n, s, l) {
  yl(s, n.n);
  const a = wl(n), u = Ds(l);
  return a.x[s] = u.x, a.z[s] = u.z, a;
}
function fm(n, s, l) {
  const a = xl(n), u = /* @__PURE__ */ new Set(), f = Ds(s);
  for (const p of l) {
    if (yl(p, n), u.has(p)) throw new RangeError(`duplicate qubit ${String(p)} in support`);
    u.add(p), a.x[p] = f.x, a.z[p] = f.z;
  }
  return a;
}
function ef(n) {
  if (n.n > dl) throw new RangeError(`masks support at most ${String(dl)} qubits`);
  let s = 0, l = 0;
  for (let a = 0; a < n.n; a++)
    (n.x[a] ?? 0) !== 0 && (s |= 1 << a), (n.z[a] ?? 0) !== 0 && (l |= 1 << a);
  return { x: s, z: l };
}
function hm(n, s, l) {
  if (n > dl) throw new RangeError(`masks support at most ${String(dl)} qubits`);
  const a = xl(n);
  for (let u = 0; u < n; u++)
    a.x[u] = s >>> u & 1, a.z[u] = l >>> u & 1;
  return a;
}
function nh(n) {
  const s = new Uint8Array(2 * n.n);
  return s.set(n.x, 0), s.set(n.z, n.n), s;
}
function pm(n) {
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
function rh(n, s) {
  const l = pm(n);
  for (const a of l) yl(a, s);
  if (l.length === 2 && l[0] === l[1])
    throw new RangeError(`${n.kind} needs two distinct qubits, got ${String(l[0])} twice`);
}
function Ca(n, s) {
  for (const l of n) rh(l, s);
}
function mm(n, s) {
  rh(s, n.n);
  const l = wl(n), { x: a, z: u } = l;
  switch (s.kind) {
    case "H": {
      const f = s.q, p = a[f] ?? 0;
      a[f] = u[f] ?? 0, u[f] = p;
      break;
    }
    case "S": {
      const f = s.q;
      u[f] = (u[f] ?? 0) ^ (a[f] ?? 0);
      break;
    }
    case "CNOT": {
      const { c: f, t: p } = s;
      a[p] = (a[p] ?? 0) ^ (a[f] ?? 0), u[f] = (u[f] ?? 0) ^ (u[p] ?? 0);
      break;
    }
    case "CZ": {
      const { a: f, b: p } = s, g = a[f] ?? 0, y = a[p] ?? 0;
      u[f] = (u[f] ?? 0) ^ y, u[p] = (u[p] ?? 0) ^ g;
      break;
    }
    case "SWAP": {
      const { a: f, b: p } = s, g = a[f] ?? 0, y = u[f] ?? 0;
      a[f] = a[p] ?? 0, u[f] = u[p] ?? 0, a[p] = g, u[p] = y;
      break;
    }
  }
  return l;
}
function kl(n, s) {
  Ca(s, n.n);
  const l = [wl(n)];
  let a = n;
  for (const u of s)
    a = mm(a, u), l.push(a);
  return { frames: l };
}
function gm(n, s) {
  const l = kl(n, s);
  return l.frames[l.frames.length - 1] ?? wl(n);
}
function ym(n, s) {
  for (const l of n)
    if (l.length !== s) throw new RangeError(`GF(2) row width mismatch: ${String(l.length)} vs ${String(s)}`);
}
function sh(n, s) {
  for (let l = 0; l < n.length; l++) n[l] = ((n[l] ?? 0) ^ (s[l] ?? 0)) & 1;
}
function ih(n, s) {
  const l = s ?? n[0]?.length ?? 0;
  ym(n, l);
  const a = n.map((g) => Uint8Array.from(g, (y) => y & 1)), u = [], f = [];
  let p = 0;
  for (let g = 0; g < l && p < a.length; g++) {
    let y = -1;
    for (let j = p; j < a.length; j++)
      if ((a[j]?.[g] ?? 0) === 1) {
        y = j;
        break;
      }
    if (y === -1) continue;
    const w = a[y], b = a[p];
    if (!(w === void 0 || b === void 0)) {
      a[y] = b, a[p] = w;
      for (let j = 0; j < a.length; j++) {
        const C = a[j];
        j !== p && C !== void 0 && (C[g] ?? 0) === 1 && sh(C, w);
      }
      u.push(g), f.push(w), p++;
    }
  }
  return { rows: f, pivots: u, width: l };
}
function xm(n, s) {
  if (s.length !== n.width) throw new RangeError(`vector width ${String(s.length)} does not match basis width ${String(n.width)}`);
  const l = Uint8Array.from(s, (a) => a & 1);
  for (let a = 0; a < n.rows.length; a++) {
    const u = n.pivots[a], f = n.rows[a];
    u === void 0 || f === void 0 || (l[u] ?? 0) === 1 && sh(l, f);
  }
  return l;
}
function wm(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function km(n) {
  return !Array.isArray(n) && "pivots" in n;
}
function vm(n, s) {
  const l = km(n) ? n : ih(n, s.length);
  return wm(xm(l, s));
}
const jm = { name: "Distance-3 rotated surface code", n: 9, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1, 3, 4] }, { id: "Z1", type: "Z", qubits: [4, 5, 7, 8] }, { id: "Z2", type: "Z", qubits: [1, 2] }, { id: "Z3", type: "Z", qubits: [6, 7] }, { id: "X0", type: "X", qubits: [1, 2, 4, 5] }, { id: "X1", type: "X", qubits: [3, 4, 6, 7] }, { id: "X2", type: "X", qubits: [0, 3] }, { id: "X3", type: "X", qubits: [5, 8] }], logicalX: ["XXXIIIIII"], logicalZ: ["ZIIZIIZII"], layout: { kind: "grid", rows: 3, cols: 3, checkPositions: { Z0: { row: 0.5, col: 0.5 }, Z1: { row: 1.5, col: 1.5 }, Z2: { row: -0.5, col: 1.5 }, Z3: { row: 2.5, col: 0.5 }, X0: { row: 0.5, col: 1.5 }, X1: { row: 1.5, col: 0.5 }, X2: { row: 0.5, col: -0.5 }, X3: { row: 1.5, col: 2.5 } } }, noiseNote: "X, Z and Y errors; perfect syndrome" }, Sm = { name: "Three-qubit repetition code", n: 3, k: 1, distance: 3, checks: [{ id: "Z0", type: "Z", qubits: [0, 1] }, { id: "Z1", type: "Z", qubits: [1, 2] }], logicalX: ["XXX"], logicalZ: ["ZII"], layout: { kind: "line", checkPositions: { Z0: { row: 0, col: 0.5 }, Z1: { row: 0, col: 1.5 } } }, noiseNote: "X noise only (a single Z is undetectable: distance 1 against Z)" }, bm = { name: "Two bare qubits (no code)", n: 2, k: 2, distance: 1, checks: [], logicalX: ["XI", "IX"], logicalZ: ["ZI", "IZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, Nm = { name: "Three bare qubits (no code)", n: 3, k: 3, distance: 1, checks: [], logicalX: ["XII", "IXI", "IIX"], logicalZ: ["ZII", "IZI", "IIZ"], layout: { kind: "wires" }, noiseNote: "no code; propagation lessons" }, Em = {
  rsc3: jm,
  rep3: Sm,
  trivial2: bm,
  trivial3: Nm
}, lh = ["trivial2", "trivial3", "rep3", "rsc3"];
function Cm(n) {
  return lh.includes(n);
}
function za(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function ul(n, s) {
  if (typeof n != "number" || !Number.isFinite(n)) throw new Error(`codes.json: ${s} must be a number`);
  return n;
}
function Fs(n, s) {
  if (typeof n != "string") throw new Error(`codes.json: ${s} must be a string`);
  return n;
}
function tf(n, s) {
  if (!Array.isArray(n)) throw new Error(`codes.json: ${s} must be an array`);
  return n.map((l, a) => Fs(l, `${s}[${String(a)}]`));
}
function Tm(n, s) {
  if (!za(n)) throw new Error(`codes.json: ${s} must be an object`);
  const l = Fs(n.type, `${s}.type`);
  if (l !== "X" && l !== "Z") throw new Error(`codes.json: ${s}.type must be X or Z`);
  if (!Array.isArray(n.qubits)) throw new Error(`codes.json: ${s}.qubits must be an array`);
  const a = n.qubits.map((u, f) => ul(u, `${s}.qubits[${String(f)}]`));
  return { id: Fs(n.id, `${s}.id`), type: l, qubits: a };
}
function Im(n, s) {
  if (!za(s)) throw new Error(`codes.json: ${n} must be an object`);
  if (!Array.isArray(s.checks)) throw new Error(`codes.json: ${n}.checks must be an array`);
  return {
    name: Fs(s.name, `${n}.name`),
    n: ul(s.n, `${n}.n`),
    k: ul(s.k, `${n}.k`),
    distance: ul(s.distance, `${n}.distance`),
    checks: s.checks.map((l, a) => Tm(l, `${n}.checks[${String(a)}]`)),
    logicalX: tf(s.logicalX, `${n}.logicalX`),
    logicalZ: tf(s.logicalZ, `${n}.logicalZ`),
    layout: s.layout,
    noiseNote: Fs(s.noiseNote, `${n}.noiseNote`)
  };
}
function Lm(n, s) {
  const l = s.n, a = s.checks.map((y) => {
    const w = [...y.qubits].sort((b, j) => b - j);
    return { id: y.id, type: y.type, qubits: w, pauli: fm(l, y.type, w) };
  });
  if (new Set(a.map((y) => y.id)).size !== a.length) throw new Error(`codes.json: ${n} has duplicate check ids`);
  const f = (y, w) => {
    if (w.length !== l) throw new Error(`codes.json: ${n} logical ${y} "${w}" has wrong length`);
    return { label: y, pauli: Te(w) };
  }, p = s.logicalX.map((y) => f("X", y)), g = s.logicalZ.map((y) => f("Z", y));
  if (p.length !== s.k || g.length !== s.k) throw new Error(`codes.json: ${n} needs k logical X and k logical Z`);
  return { id: n, name: s.name, n: l, k: s.k, distance: s.distance, checks: a, logicalX: p, logicalZ: g, noiseNote: s.noiseNote };
}
const oh = /* @__PURE__ */ new Map();
{
  const n = Em;
  if (!za(n)) throw new Error("codes.json: root must be an object");
  for (const s of lh) {
    if (!(s in n)) throw new Error(`codes.json: missing code '${s}'`);
    oh.set(s, Im(s, n[s]));
  }
}
const nf = /* @__PURE__ */ new Map(), rf = /* @__PURE__ */ new Map();
function $e(n) {
  let s = nf.get(n);
  if (s === void 0) {
    const l = oh.get(n);
    if (l === void 0) throw new Error(`unknown code '${n}'`);
    s = Lm(n, l), nf.set(n, s);
  }
  return s;
}
function Rm(n) {
  return n.checks.map((s) => nh(s.pauli));
}
function _m(n) {
  let s = rf.get(n.id);
  return s === void 0 && (s = ih(Rm(n), 2 * n.n), rf.set(n.id, s)), s;
}
function Wr(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id} (n=${String(n.n)})`);
  const l = new Uint8Array(n.checks.length);
  return n.checks.forEach((a, u) => {
    l[u] = th(a.pauli, s);
  }), l;
}
function Om(n) {
  for (let s = 0; s < n.length; s++) if ((n[s] ?? 0) !== 0) return !1;
  return !0;
}
function sf(n) {
  let s = "";
  for (let l = 0; l < n.length; l++) s += (n[l] ?? 0) === 0 ? "0" : "1";
  return s;
}
function an(n) {
  return Array.from(n, (s) => s === 0 ? 0 : 1);
}
function Mm(n) {
  return Uint8Array.from(n, (s) => s === 0 ? 0 : 1);
}
function ah(n, s) {
  const l = [];
  return n.checks.forEach((a, u) => {
    (s[u] ?? 0) !== 0 && l.push(a.id);
  }), l;
}
function Pm(n, s) {
  return Fa(n, s);
}
function ch(n, s) {
  if (s.n !== n.n) throw new RangeError(`Pauli on ${String(s.n)} qubits does not fit code ${n.id}`);
  return n.checks.length === 0 ? um(s) : vm(_m(n), nh(s));
}
function $m(n, s) {
  return {
    x: n.logicalZ.map((l) => Jd(s, l.pauli)),
    z: n.logicalX.map((l) => Jd(s, l.pauli))
  };
}
function Am(n, s) {
  const l = Wr(n, s), a = $m(n, s);
  let u;
  return Om(l) ? ch(n, s) ? u = "success" : u = "logical-error" : u = "detectable", { kind: u, residual: s, syndrome: l, logicalFlip: a, weight: wt(s) };
}
function ma(n, s, l) {
  return Am(n, Pm(l, s));
}
const lf = 10, of = /* @__PURE__ */ new Map();
function Dm(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) ^ a & 1;
  return l;
}
function Fm(n) {
  const s = 1 << n, l = new Uint8Array(s);
  for (let a = 1; a < s; a++) l[a] = (l[a >> 1] ?? 0) + (a & 1);
  return l;
}
function zm(n) {
  const s = n.n;
  if (s > lf) throw new RangeError(`lookup decoder supports at most ${String(lf)} qubits`);
  const l = n.checks.map((y) => ef(y.pauli).x), a = n.checks.map((y) => ef(y.pauli).z), u = Dm(s), f = Fm(s), p = /* @__PURE__ */ new Map(), g = 4 ** s;
  for (let y = 0; y < g; y++) {
    let w = 0, b = 0, j = y;
    for (let I = 0; I < s; I++) {
      const P = j & 3;
      j >>= 2, (P & 1) !== 0 && (w |= 1 << I), (P & 2) !== 0 && (b |= 1 << I);
    }
    const C = f[w | b] ?? 0, L = (f[w] ?? 0) + (f[b] ?? 0);
    let O = "";
    for (let I = 0; I < l.length; I++)
      O += (u[w & (a[I] ?? 0) ^ b & (l[I] ?? 0)] ?? 0) === 0 ? "0" : "1";
    const R = p.get(O);
    R === void 0 || C < R.weight || C === R.weight && L < R.symplecticWeight ? p.set(O, { weight: C, symplecticWeight: L, candidates: [y] }) : C === R.weight && L === R.symplecticWeight && R.candidates.push(y);
  }
  return { n: s, entries: p };
}
function uh(n) {
  let s = of.get(n.id);
  return s === void 0 && (s = zm(n), of.set(n.id, s)), s;
}
function Xm(n, s) {
  let l = 0, a = 0, u = s;
  for (let f = 0; f < n; f++) {
    const p = u & 3;
    u >>= 2, (p & 1) !== 0 && (l |= 1 << f), (p & 2) !== 0 && (a |= 1 << f);
  }
  return hm(n, l, a);
}
function Wm(n, s) {
  if (s.length !== n.checks.length)
    throw new RangeError(`syndrome has ${String(s.length)} bits but code ${n.id} has ${String(n.checks.length)} checks`);
  const l = uh(n).entries.get(sf(s));
  if (l === void 0) throw new Error(`syndrome ${sf(s)} is not produced by any Pauli on code ${n.id}`);
  return l;
}
function Zm(n) {
  const s = uh(n);
  return {
    name: `min-weight lookup (${n.id})`,
    decode(l) {
      const u = Wm(n, l).candidates[0];
      return u === void 0 ? xl(s.n) : Xm(s.n, u);
    }
  };
}
function Xa(n, s, l) {
  return ch(n, Fa(s, l));
}
const Bm = ["success", "logical-error", "detectable"];
function Ar(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function at(n, s) {
  if (typeof n != "string") throw new Error(`missions.json: ${s} must be a string`);
  return n;
}
function On(n, s) {
  if (typeof n != "number" || !Number.isInteger(n)) throw new Error(`missions.json: ${s} must be an integer`);
  return n;
}
function qm(n, s = "gate") {
  if (!Ar(n)) throw new Error(`${s} must be an object`);
  const l = at(n.kind, `${s}.kind`);
  switch (l) {
    case "H":
    case "S":
      return { kind: l, q: On(n.q, `${s}.q`) };
    case "CNOT":
      return { kind: l, c: On(n.c, `${s}.c`), t: On(n.t, `${s}.t`) };
    case "CZ":
    case "SWAP":
      return { kind: l, a: On(n.a, `${s}.a`), b: On(n.b, `${s}.b`) };
    default:
      throw new Error(`${s}.kind '${l}' is not a supported gate`);
  }
}
function af(n, s = "circuit") {
  if (!Array.isArray(n)) throw new Error(`${s} must be an array`);
  return n.map((l, a) => qm(l, `${s}[${String(a)}]`));
}
function Hm(n, s) {
  if (!Ar(n)) throw new Error(`missions.json: ${s} must be an object`);
  if (!Array.isArray(n.syndrome)) throw new Error(`missions.json: ${s}.syndrome must be an array`);
  const l = n.syndrome.map((u, f) => {
    const p = On(u, `${s}.syndrome[${String(f)}]`);
    if (p !== 0 && p !== 1) throw new Error(`missions.json: ${s}.syndrome bits must be 0/1`);
    return p;
  }), a = at(n.minWeightVerdict, `${s}.minWeightVerdict`);
  if (!Bm.includes(a)) throw new Error(`missions.json: ${s}.minWeightVerdict invalid`);
  return {
    syndrome: l,
    propagated: at(n.propagated, `${s}.propagated`),
    minWeightCorrection: at(n.minWeightCorrection, `${s}.minWeightCorrection`),
    minWeightVerdict: a
  };
}
function Um(n, s = "mission") {
  if (!Ar(n)) throw new Error(`missions.json: ${s} must be an object`);
  const l = at(n.id, `${s}.id`), a = at(n.code, `${s}.code`);
  if (!Cm(a)) throw new Error(`missions.json: ${l}.code '${a}' is unknown`);
  const u = $e(a), f = at(n.kind, `${l}.kind`);
  if (f !== "dispatch" && f !== "propagation") throw new Error(`missions.json: ${l}.kind must be dispatch|propagation`);
  if (!Array.isArray(n.training)) throw new Error(`missions.json: ${l}.training must be an array`);
  const p = n.training.map((R, I) => {
    const P = `${l}.training[${String(I)}]`;
    if (!Ar(R)) throw new Error(`missions.json: ${P} must be an object`);
    const _ = at(R.error, `${P}.error`);
    if (Te(_).n !== u.n) throw new Error(`missions.json: ${P}.error length must be ${String(u.n)}`);
    const V = af(R.circuit, `${P}.circuit`);
    return Ca(V, u.n), { error: _, circuit: V, caption: at(R.caption, `${P}.caption`) };
  }), g = n.challenge;
  if (!Ar(g)) throw new Error(`missions.json: ${l}.challenge must be an object`);
  const y = at(g.error, `${l}.challenge.error`);
  if (Te(y).n !== u.n) throw new Error(`missions.json: ${l}.challenge.error length must be ${String(u.n)}`);
  const w = af(g.circuit, `${l}.challenge.circuit`);
  if (Ca(w, u.n), f === "dispatch" && w.length > 0) throw new Error(`missions.json: ${l} is a dispatch mission but has a circuit`);
  if (!Array.isArray(n.allowed) || n.allowed.length === 0) throw new Error(`missions.json: ${l}.allowed must be a non-empty array`);
  const b = n.allowed.map((R, I) => {
    const P = at(R, `${l}.allowed[${String(I)}]`);
    if (!eh(P) || P === "I") throw new Error(`missions.json: ${l}.allowed[${String(I)}] must be X, Y or Z`);
    return P;
  }), j = On(n.budget, `${l}.budget`);
  if (j < 1 || j > u.n) throw new Error(`missions.json: ${l}.budget out of range`);
  const C = n.debrief;
  if (!Ar(C)) throw new Error(`missions.json: ${l}.debrief must be an object`);
  const L = {
    success: at(C.success, `${l}.debrief.success`),
    "logical-error": at(C["logical-error"], `${l}.debrief.logical-error`),
    detectable: at(C.detectable, `${l}.debrief.detectable`)
  }, O = n.expected === void 0 || n.expected === null ? null : Hm(n.expected, `${l}.expected`);
  return {
    id: l,
    index: On(n.index, `${l}.index`),
    title: at(n.title, `${l}.title`),
    code: a,
    kind: f,
    training: p,
    challenge: { error: y, circuit: w },
    allowed: b,
    budget: j,
    briefing: at(n.briefing, `${l}.briefing`),
    debrief: L,
    expected: O
  };
}
function Ym(n) {
  if (!Array.isArray(n)) throw new Error("missions.json: root must be an array");
  const s = [], l = /* @__PURE__ */ new Set();
  return n.forEach((a, u) => {
    const f = Um(a, `missions[${String(u)}]`);
    if (f.expected === null) throw new Error(`missions.json: ${f.id} has no expected block (run scripts/gen-fixtures.ts)`);
    if (l.has(f.id)) throw new Error(`missions.json: duplicate id ${f.id}`);
    if (l.add(f.id), f.index !== u + 1) throw new Error(`missions.json: ${f.id} index ${String(f.index)} should be ${String(u + 1)}`);
    s.push({ ...f, expected: f.expected });
  }), s;
}
let cf;
function dh() {
  return cf ??= Ym(Jf), cf;
}
function Vm(n) {
  const s = dh().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
const ga = 3;
function Qm(n, s = Jf) {
  if (!Array.isArray(s)) return ga;
  for (const l of s) {
    if (typeof l != "object" || l === null || Array.isArray(l)) continue;
    const a = l;
    if (a.id !== n) continue;
    const u = a.maxStars;
    return u === 1 || u === 2 || u === 3 ? u : ga;
  }
  return ga;
}
function Km(n) {
  const s = $e(n.code), l = n.allowed.filter(om), a = n.kind === "dispatch" ? an(Wr(s, Te(n.challenge.error))) : [];
  return {
    id: n.id,
    index: n.index,
    title: n.title,
    code: n.code,
    kind: n.kind,
    allowed: l,
    budget: n.budget,
    briefing: n.briefing,
    maxStars: Qm(n.id),
    circuit: n.challenge.circuit,
    syndrome: a,
    visibleStart: n.kind === "propagation" ? n.challenge.error : null,
    training: n.training.map((u) => ({ fire: u.error, circuit: u.circuit, caption: u.caption }))
  };
}
let uf;
function An() {
  return uf ??= dh().map(Km), uf;
}
function Qt(n) {
  const s = An().find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown mission '${n}'`);
  return s;
}
function Wa() {
  return An().reduce((n, s) => n + s.maxStars, 0);
}
function fh(n) {
  const s = An(), l = s.findIndex((u) => u.id === n), a = s[l + 1];
  return a === void 0 ? null : a.id;
}
function Gm(n) {
  return Vm(n);
}
function Jm(n) {
  const s = Xa(n.code, n.crews, n.decoderCrews), l = wt(n.crews) <= wt(n.decoderCrews), a = n.maxStars ?? 3;
  return s && l && n.outcome === "success" ? "optimal" : s && n.outcome === "logical-error" ? "unlucky" : n.outcome === "success" && a <= 1 && !s ? "lucky" : n.outcome === "success" ? "valid" : "off";
}
function eg({ quality: n, outcome: s, wrongBlocks: l, crewsUsed: a, maxStars: u = 3 }) {
  let f = 0;
  return s === "success" && n === "optimal" ? f = 3 : s === "success" && n === "valid" ? f = 2 : (n === "unlucky" || n === "lucky" || s === "detectable" && l <= 1 && a > 0) && (f = 1), f > u ? u : f;
}
function tg(n) {
  const s = Jm(n), l = wt(Fa(n.crews, n.decoderCrews)), a = wt(n.crews), u = n.maxStars ?? 3, f = eg({ quality: s, outcome: n.outcome, wrongBlocks: l, crewsUsed: a, maxStars: u });
  return {
    outcome: n.outcome,
    quality: s,
    stars: f,
    maxStars: u,
    crewsUsed: a,
    minCrews: wt(n.decoderCrews),
    completed: n.outcome === "success" || s === "unlucky"
  };
}
const ng = {
  success: "Logical qubit safe",
  "logical-error": "Silent failure — logical qubit flipped",
  detectable: "Fires still burning"
}, rg = "Prediction missed — fires left on the wires";
function sg(n, s) {
  return !s && n === "logical-error" ? rg : ng[n];
}
function df(n) {
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
const hh = { X: "red", Z: "blue", Y: "red-and-blue" };
function fl(n) {
  const s = Et(n);
  if (s.length === 0) return "no fires";
  const l = s.map((a) => {
    const u = tt(n, a);
    return `a ${hh[u] ?? ""} fire (${u}) on house ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function ig(n) {
  const s = Et(n);
  if (s.length === 0) return "no crews";
  const l = s.map((a) => {
    const u = tt(n, a);
    return `a ${hh[u] ?? ""} crew (${u}) to house ${String(a)}`;
  });
  return l.length === 1 ? l[0] ?? "" : `${l.slice(0, -1).join(", ")} and ${l[l.length - 1] ?? ""}`;
}
function lg(n, s) {
  if (n.checks.length === 0) return "This district has no alarm stations: on bare wires nothing rings, so the dispatch must come from the prediction alone.";
  const l = ah(n, s);
  return l.length === 0 ? "Every station reads an even count and stays quiet." : `Alarms: ${l.join(", ")} ring${l.length === 1 ? "s" : ""}. Each ringing station sees an odd number of fires of its colour.`;
}
function og(n, s) {
  switch (n.kind) {
    case "success":
      return wt(n.residual) === 0 ? "Residual is the identity: every fire is out. Logical qubit safe." : `Residual ${Ee(n.residual)} is a stabilizer of the code (it acts trivially on the encoded qubit). Logical qubit safe.`;
    case "logical-error": {
      if (s.checks.length === 0)
        return `Residual ${Ee(n.residual)} leaves ${fl(n.residual)}. Bare wires have no stations, so a missed prediction is never caught: every leftover component acts directly on the data.`;
      const l = [];
      return n.logicalFlip.x.forEach((a, u) => {
        a && l.push(s.k === 1 ? "logical X" : `logical X${String(u)}`);
      }), n.logicalFlip.z.forEach((a, u) => {
        a && l.push(s.k === 1 ? "logical Z" : `logical Z${String(u)}`);
      }), `Residual ${Ee(n.residual)} commutes with every station yet is not a stabilizer: it acts as ${l.join(" and ")}. Silent failure.`;
    }
    case "detectable":
      return `Residual ${Ee(n.residual)} still trips ${ah(s, n.syndrome).join(", ")}. Fires are still burning.`;
  }
}
function ag(n) {
  const { code: s, start: l, circuit: a, crews: u, verdict: f } = n, p = kl(l, a), g = [], y = p.frames[p.frames.length - 1] ?? l, w = Ee(l);
  g.push({
    id: "placed",
    caption: `Noise lit ${fl(l)}.`,
    fires: w,
    crews: null,
    residual: null,
    syndrome: null,
    gateCursor: -1,
    showVerdict: !1
  }), a.forEach((O, R) => {
    const I = p.frames[R] ?? l, P = p.frames[R + 1] ?? I, _ = Ee(I) !== Ee(P);
    g.push({
      id: `gate-${String(R)}`,
      caption: _ ? `${df(O)}: ${Ee(I)} becomes ${Ee(P)}.` : `${df(O)}: the fire pattern ${Ee(I)} is unchanged.`,
      fires: Ee(P),
      crews: null,
      residual: null,
      syndrome: null,
      gateCursor: R,
      showVerdict: !1
    });
  });
  const b = Wr(s, y), j = an(b), C = Ee(y);
  g.push({
    id: "alarms",
    caption: lg(s, b),
    fires: C,
    crews: null,
    residual: null,
    syndrome: j,
    gateCursor: a.length,
    showVerdict: !1
  }), g.push({
    id: "dispatch",
    caption: `Your dispatch: ${ig(u)}.`,
    fires: C,
    crews: Ee(u),
    residual: null,
    syndrome: j,
    gateCursor: a.length,
    showVerdict: !1
  });
  const L = Ee(f.residual);
  return g.push({
    id: "residual",
    caption: wt(f.residual) === 0 ? "Crews meet fires: every pair cancels (X·X = I, Z·Z = I, Y·Y = I). Nothing remains." : `Crews meet fires (XOR): what remains is ${L}, that is ${fl(f.residual)}.`,
    fires: C,
    crews: Ee(u),
    residual: L,
    syndrome: an(f.syndrome),
    gateCursor: a.length,
    showVerdict: !1
  }), g.push({
    id: "verdict",
    caption: og(f, s),
    fires: C,
    crews: Ee(u),
    residual: L,
    syndrome: an(f.syndrome),
    gateCursor: a.length,
    showVerdict: !0
  }), g;
}
function ff(n) {
  return n.length === 0 ? "no houses" : n.length === 1 ? `house ${String(n[0])}` : `houses ${n.slice(0, -1).join(", ")} and ${String(n[n.length - 1])}`;
}
function cg(n) {
  const { code: s, finalFire: l, crews: a, decoderCrews: u, decoderVerdict: f, equivalent: p, verdict: g } = n, y = Ee(u), w = Ee(a), b = Ee(l), j = b !== y && b !== w;
  let C;
  if (s.checks.length === 0)
    C = p ? `The fire ended as ${b}; your crews matched it exactly, so the prediction was right.` : `The fire ended as ${b}. Your crews ${w} leave ${fl(g.residual)} (${String(wt(g.residual))} house${wt(g.residual) === 1 ? "" : "s"}); on bare wires every leftover component acts on the data.`;
  else if (p && g.kind === "success")
    C = w === y ? "Your dispatch is exactly the minimum-weight dispatch for these alarms." : `Your dispatch ${w} and the minimum-weight dispatch ${y} differ by a stabilizer, so they are equivalent corrections: the code cannot tell them apart and both succeed.`, w === b ? C += " Your crews sat exactly on the true fires." : b !== y && (C += ` The true fires were ${b}; crews there would differ from yours by a stabilizer as well, so the code treats both dispatches as the same correction.`);
  else if (p && g.kind === "logical-error") {
    const L = ff(Et(l)), O = ff(Et(g.residual));
    C = `${w === y ? `The minimum-weight dispatch for these alarms is ${y}, and that is what you sent.` : `The minimum-weight dispatch for these alarms is ${y}; your ${w} differs from it by a stabilizer, so it is the same call.`} The true fire was ${b}, on ${L}: ${String(wt(l))} fires that look, to every station, exactly like one. Your crews plus those fires leave ${Ee(g.residual)} on ${O}, a logical operator that every station sees as an even count. Crews at ${b} would have worked, but no alarm pattern justified them. Distance 3 means any single fire is always fixed and two fires can fool any dispatcher.`;
  } else g.kind === "success" ? (C = `You succeeded with ${String(wt(a))} crew(s); the minimum-weight dispatch ${y} needs ${String(wt(u))} and its verdict is ${hf[f.kind]}.`, f.kind === "logical-error" && (C += ` The alarms alone could not justify your ${w}: the same stations ring for ${y}, so protocol would still have sent that.`)) : C = `The minimum-weight dispatch for these alarms is ${y} (${hf[f.kind]}). Compare it with your ${w} step by step in the replay.`;
  return {
    decoderCrews: y,
    decoderVerdict: f.kind,
    equivalentToDecoder: p,
    explanation: C,
    trueFireCrews: j ? b : null
  };
}
const hf = {
  success: "success",
  "logical-error": "silent failure",
  detectable: "fires still burning"
}, Ta = "q11.save.v1", hl = { sound: !1, reducedMotion: !1, language: "en", freeRoam: !1 };
function rl() {
  return { version: Ps, progress: {}, settings: hl, tutorialDone: !1 };
}
const ph = "Saved progress was unreadable and has been reset.";
function zs(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function pf(n) {
  if (!zs(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (!zs(a)) return null;
    const u = a.stars, f = a.attempts, p = a.completed;
    if (u !== 0 && u !== 1 && u !== 2 && u !== 3 || typeof f != "number" || !Number.isInteger(f) || f < 0 || typeof p != "boolean") return null;
    s[l] = { stars: u, attempts: f, completed: p };
  }
  return s;
}
function ug(n) {
  return n === "en" || n === "ja";
}
function mh(n) {
  if (!zs(n)) return null;
  const s = n.sound, l = n.reducedMotion;
  return typeof s != "boolean" || typeof l != "boolean" ? null : { sound: s, reducedMotion: l, language: hl.language, freeRoam: hl.freeRoam };
}
function dg(n) {
  const s = mh(n);
  if (s === null || !zs(n)) return null;
  const l = n.language, a = n.freeRoam;
  return !ug(l) || typeof a != "boolean" ? null : { sound: s.sound, reducedMotion: s.reducedMotion, language: l, freeRoam: a };
}
function fg(n) {
  if (n === null) return null;
  let s;
  try {
    s = JSON.parse(n);
  } catch {
    return null;
  }
  if (!zs(s)) return null;
  const l = s.version;
  if (l === 1) {
    const a = pf(s.progress), u = mh(s.settings);
    return a === null || u === null ? null : { version: Ps, progress: a, settings: u, tutorialDone: Object.keys(a).length > 0 };
  }
  if (l === Ps) {
    const a = pf(s.progress), u = dg(s.settings), f = s.tutorialDone;
    return a === null || u === null || typeof f != "boolean" ? null : { version: Ps, progress: a, settings: u, tutorialDone: f };
  }
  return null;
}
function hg(n) {
  if (n === null) return { save: rl(), notice: null };
  let s;
  try {
    s = n.getItem(Ta);
  } catch {
    return { save: rl(), notice: null };
  }
  if (s === null) return { save: rl(), notice: null };
  const l = fg(s);
  if (l !== null) return { save: l, notice: null };
  const a = rl();
  try {
    n.setItem(Ta, JSON.stringify(a));
  } catch {
  }
  return { save: a, notice: ph };
}
function pg(n, s) {
  if (n === null) return !1;
  try {
    return n.setItem(Ta, JSON.stringify(s)), !0;
  } catch {
    return !1;
  }
}
function mg() {
  try {
    const n = globalThis.localStorage, s = "__q11_probe__";
    return n.setItem(s, "1"), n.removeItem(s), n;
  } catch {
    return null;
  }
}
const gg = "Only results that were actually executed. Recorded from the Qollab draft project (IonQ Aria 1 remote noise-model simulator, free). Raw transcripts: reports/qollab-runs/*.json.", yg = [{ analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.15, Z1: 0.09, Z2: 0.06, Z3: 0.02 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.5, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 93, 1: 7 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.93], predictedSyndromeShare: 0.69, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000011000010011": 1, "00000100100000010": 1, "00000100100000011": 3, "00000101100000011": 1, "00000111100000011": 1, "00010011000110001": 1, "00011011000000011": 3, "00011011001000011": 1, "00011011001100011": 1, "00011011100000011": 1, "00011100001100011": 1, "00011111100000011": 7, "01101000100000001": 1, "01101000100000010": 1, "01101000100000011": 1, "01101001100000011": 1, "01101100000000011": 2, "01110011001000010": 1, "01110011100000011": 4, "01110011100010111": 1, "01110111000000011": 5, "01110111101000011": 1, "01111111110100011": 1, "10000001011000111": 1, "10000111100110011": 1, "10001001000010111": 1, "10001011000000011": 5, "10001111000000010": 1, "10001111100000011": 2, "10001111100100001": 1, "10010000000000011": 6, "10010100100000011": 5, "10010100100010001": 1, "10010101110100100": 1, "10010111100000010": 1, "10011011000000011": 1, "10110100100101011": 1, "11010000000100011": 1, "11100001100000111": 1, "11100111000000011": 6, "11100111001100011": 1, "11101000110010001": 1, "11110011100010011": 1, "11110111010010001": 1, "11111000100000011": 6, "11111011100000010": 1, "11111100000000011": 4, "11111100000010011": 1, "11111100001001010": 1, "11111111001110010": 1 }, finishedAt: "2026-10-10T01:40:30Z", jobId: "01a12378-c4f2-71ea-b5df-920acd440520", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:40:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.09, Z1: 0.07, Z2: 0.07, Z3: 0.04 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 1, 0, 0, 0, 0, 0, 0], endToEndSeconds: 22.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 97, 1: 3 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking) — JS/Qiskit page, on-load self-test through the JS→Python bridge", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.76, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "IIIIXIIII", counts: { "00000000000000011": 5, "00000000001010010": 1, "00000001000010011": 1, "00000100100000011": 1, "00010011000000000": 1, "00011010000000111": 1, "00011011000000011": 6, "00011101100010111": 1, "00011110100010110": 1, "00011111100000001": 1, "00011111100000011": 4, "00100011110111011": 1, "00101100010101001": 1, "01101000001100011": 1, "01101000100000011": 8, "01101011000100011": 1, "01101100000000011": 6, "01101100000010011": 1, "01101100000100011": 1, "01110011100000011": 3, "01110100001000010": 1, "01110110001000111": 1, "01110111000000011": 7, "01110111010110011": 1, "01111010110000101": 1, "10000100110010011": 1, "10001011000000011": 6, "10001111000000011": 1, "10001111100000011": 7, "10001111100110011": 1, "10010000000000011": 5, "10010011000010011": 1, "10010100100000011": 1, "10010100100010011": 1, "10010110100000111": 1, "10111000100101001": 1, "11010000000000011": 1, "11100011100000011": 4, "11100111000000011": 1, "11101100000000011": 1, "11111000100000011": 5, "11111100000000010": 1, "11111100000000011": 4 }, finishedAt: "2026-10-10T02:14:30Z", jobId: "01a12396-c213-7984-9259-bb3fb25b8f46", missionId: "blind-dispatch", prediction: { equivalentToReference: !0, logicalFlip: { x: [!1], z: [!1] }, referenceCorrection: "IIIIXIIII", referenceVerdict: "success", residual: "IIIIIIIII", syndrome: [1, 1, 0, 0, 0, 0, 0, 0], verdict: "success" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T02:14:00Z" }, { analysis: { circuitExecutionMs: 1e3, dataCheckOddFraction: { Z0: 0.06, Z1: 0.07, Z2: 0.03, Z3: 0.03 }, dominantMatches: { dataChecks: !0, logical: !0, syndrome: !0 }, dominantSyndrome: [1, 0, 0, 0, 0, 0, 0, 0], endToEndSeconds: 12.7, exactMatchesIdealModel: { dataChecks: !1, logical: !1, syndrome: !1 }, logicalHistograms: [{ 0: 3, 1: 97 }], platform: "qollab.xyz draft project q11-quantum-emergency-response (owner doraking)", predictedLogicalShare: [0.97], predictedSyndromeShare: 0.73, prep: "0", readoutBasis: "Z" }, backendName: "IonQ Aria 1 simulator (25q) — ionq_simulator (noise model, free)", correction: "XIIIIIIII", counts: { "00000011100000001": 3, "00000100100100001": 1, "00000111000000001": 6, "00000111000010001": 1, "00001000110010001": 1, "00010111000000001": 1, "00010111000000011": 1, "00010111010000001": 1, "00011000100000001": 7, "00011000101000001": 1, "00011011001000001": 1, "00011100000000001": 5, "00111011000001001": 1, "01101011000000001": 5, "01101011000010101": 1, "01101011000110001": 1, "01101011001000001": 1, "01101111100000001": 9, "01101111100100001": 1, "01110000000000001": 4, "01110011000100001": 1, "01110100100000000": 1, "01110100100000001": 2, "10000011110000001": 1, "10001000100000001": 7, "10001100000000001": 4, "10010011001000000": 1, "10010011100000001": 4, "10010101000000101": 1, "10110000000001001": 1, "11011000100101001": 1, "11100000000000001": 3, "11100000000100000": 1, "11100011001100001": 1, "11100100100000001": 2, "11100100100010001": 1, "11100111100110000": 1, "11101000000110011": 1, "11110000010010001": 1, "11111001000000101": 1, "11111010010010110": 1, "11111011000000001": 5, "11111111100000001": 6 }, finishedAt: "2026-10-10T01:44:30Z", jobId: "01a1237b-5f60-7349-89d0-a343dca0201c", missionId: "silent-failure", prediction: { equivalentToReference: !0, logicalFlip: { x: [!0], z: [!1] }, referenceCorrection: "XIIIIIIII", referenceVerdict: "logical-error", residual: "XXXIIIIII", syndrome: [1, 0, 0, 0, 0, 0, 0, 0], verdict: "logical-error" }, shots: 100, source: "cached-cloud", startedAt: "2026-10-10T01:44:00Z" }], xg = 1, wg = {
  note: gg,
  results: yg,
  schema: xg
};
function Za(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function kg(n) {
  if (!Za(n)) return null;
  const s = {};
  for (const [l, a] of Object.entries(n)) {
    if (typeof a != "number" || !Number.isFinite(a)) return null;
    s[l] = a;
  }
  return s;
}
function vg(n) {
  if (!Za(n)) return null;
  const s = n.source;
  if (s !== "local-simulator" && s !== "cached-cloud" && s !== "live-cloud") return null;
  const l = kg(n.counts);
  if (l === null) return null;
  const a = (b) => {
    const j = n[b];
    return typeof j == "string" ? j : null;
  }, u = a("missionId"), f = a("correction"), p = a("backendName"), g = a("startedAt"), y = a("finishedAt"), w = n.shots;
  return u === null || f === null || p === null || g === null || y === null || typeof w != "number" || !Number.isInteger(w) || w <= 0 ? null : {
    status: "ok",
    source: s,
    backendName: p,
    missionId: u,
    correction: f,
    shots: w,
    counts: l,
    analysis: n.analysis ?? null,
    prediction: n.prediction ?? null,
    jobId: a("jobId"),
    startedAt: g,
    finishedAt: y
  };
}
function jg(n) {
  if (!Za(n) || n.schema !== 1 || !Array.isArray(n.results)) return [];
  const s = [];
  for (const l of n.results) {
    const a = vg(l);
    a !== null && s.push(a);
  }
  return s;
}
function Sg(n, s, l) {
  if (s === l) return !0;
  try {
    const a = $e(Qt(n).code), u = Te(s), f = Te(l);
    return u.n !== a.n || f.n !== a.n ? !1 : Xa(a, u, f);
  } catch {
    return !1;
  }
}
function gh(n, s, l) {
  return n.filter((a) => a.missionId === s && (l === void 0 || Sg(s, l, a.correction)));
}
function bg(n = jg(wg)) {
  return {
    kind: "none",
    cached: (s, l) => gh(n, s, l)
  };
}
const Mn = [
  { id: "station-row", missionId: "first-alarm", kind: "houses-row", hasBeacon: !1 },
  { id: "bridge", missionId: "red-forward-blue-backward", kind: "bridge", hasBeacon: !1 },
  { id: "lab", missionId: "color-switch", kind: "lab", hasBeacon: !1 },
  { id: "central", missionId: "blind-dispatch", kind: "grid", hasBeacon: !1 },
  { id: "market", missionId: "two-kinds-of-trouble", kind: "grid", hasBeacon: !1 },
  { id: "old-town", missionId: "silent-failure", kind: "grid", hasBeacon: !0 }
];
function tr(n) {
  return Mn.find((s) => s.missionId === n);
}
function Ia(n, s) {
  return s[n.missionId]?.completed === !0;
}
function Ba(n, s, l) {
  const a = Mn.findIndex((p) => p.id === n);
  if (a < 0) throw new Error(`unknown district '${n}'`);
  const u = Mn[a];
  if (u === void 0) throw new Error(`unknown district '${n}'`);
  return Ia(u, s) ? "solved" : l || Mn.slice(0, a).every((p) => Ia(p, s)) ? "available" : "locked";
}
function Ng(n, s, l) {
  const a = tr(n);
  return a === void 0 ? void 0 : Ba(a.id, s, l);
}
function Eg(n) {
  return Mn.find((s) => !Ia(s, n)) ?? null;
}
const yh = {
  /** Prelude: the start tokens appear. */
  firesStart: 450,
  /** Prelude: one gate (travel to the column, then the pattern switch). */
  gate: 750,
  /** Prelude: the tokens reach the output houses. */
  arrive: 450,
  /**
   * Prelude: the fires sit in the houses (with the "fires reach the houses" line) before the trucks start. Without
   * it the trucks' caption would replace the arrival line the instant it appears. ≥ CAPTION_HOLD.
   */
  arriveHold: 500,
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
}, Cg = 0.55, xh = /* @__PURE__ */ new Set(["fires-start", "gate", "fires-arrive"]);
function Tg(n) {
  return n.events.some((s) => xh.has(s.type));
}
function Ig(n, s) {
  if (s.circuit !== void 0) return s.circuit;
  try {
    return Qt(n.missionId).circuit;
  } catch {
    return [];
  }
}
function mf(n, s) {
  const l = Ds(n), a = Ds(s);
  return Da(l.x ^ a.x, l.z ^ a.z);
}
function gf(n) {
  try {
    return $e(Qt(n).code).checks.length > 0;
  } catch {
    return !0;
  }
}
function vl(n) {
  switch (n.verdict) {
    case "success":
      return wt(Te(n.residual)) === 0 ? "restored" : "safe-pattern";
    case "detectable":
      return gf(n.missionId) ? "still-burning" : "prediction-miss";
    case "logical-error":
      return gf(n.missionId) ? "logical-failure" : "prediction-miss";
  }
}
function Lg(n, s) {
  return s === "I" ? "extinguished" : n === "I" ? "ignited" : "changed";
}
function Rg(n) {
  return Et(Te(n.residual));
}
function _g(n, s) {
  const l = yh, a = Te(n.startFires), u = kl(a, s), f = u.frames[u.frames.length - 1];
  if (f === void 0 || Ee(f) !== n.fires)
    throw new Error(`effects: propagating ${n.startFires} through the circuit gives ${f === void 0 ? "?" : Ee(f)}, but the debrief says ${n.fires}`);
  const p = [{ type: "fires-start", t: 0, dur: l.firesStart, fires: n.startFires }];
  let g = l.firesStart;
  return s.forEach((y, w) => {
    const b = u.frames[w], j = u.frames[w + 1];
    if (b === void 0 || j === void 0) throw new Error(`effects: propagate() returned no frame for gate ${String(w)}`);
    const C = Ee(b), L = Ee(j);
    p.push({ type: "gate", t: g, dur: l.gate, index: w, gate: y, before: C, after: L, changed: L !== C, travel: Cg }), g += l.gate;
  }), p.push({ type: "fires-arrive", t: g, dur: l.arrive, fires: n.fires }), { events: p, end: g + l.arrive + l.arriveHold };
}
function La(n, s, l = {}) {
  const a = Te(n.fires), u = Te(n.crews), f = Te(n.residual);
  if (a.n !== u.n || a.n !== f.n) throw new Error("effects: fires, crews and residual must share the qubit count");
  const p = yh, g = l.propagation === !1 ? [] : Ig(n, l), y = g.length > 0 ? _g(n, g) : { events: [], end: 0 }, w = y.end, b = [...y.events, { type: "trucks-arrive", t: w, dur: p.trucks }];
  let j = w + p.trucks;
  Et(u).forEach((O, R) => {
    const I = tt(u, O);
    if (I === "I") return;
    const P = w + p.trucks + R * p.stagger, _ = P + p.sprayAfterRun, V = _ + p.spray, ne = tt(a, O), te = tt(f, O);
    if (mf(ne, I) !== te)
      throw new Error(`effects: residual at house ${String(O)} is ${te}, but ${ne} ⊕ ${I} = ${mf(ne, I)}`);
    b.push({ type: "crew-run", t: P, dur: p.run, q: O, crew: I }), b.push({ type: "spray-start", t: _, dur: p.spray, q: O, crew: I, before: ne }), b.push({ type: "impact", t: V, dur: p.impact, q: O, crew: I, before: ne, after: te, effect: Lg(ne, te) }), j = Math.max(j, V + p.hold);
  });
  const L = Et(f).filter((O) => tt(u, O) === "I");
  if (b.push({ type: "reveal-remaining", t: j, dur: p.reveal, qs: L }), j += p.reveal, b.push({ type: "alarms", t: j, dur: p.alarms, syndrome: [...n.syndromeOfResidual] }), j += p.alarms, b.push({ type: "outcome", t: j, dur: p.outcome, result: vl(n) }), j += p.outcome, b.push({ type: "done", t: j, dur: 0 }), b.sort((O, R) => O.t - R.t), s) {
    const O = b.map((R, I) => R.type === "done" ? { ...R, t: I } : { ...R, t: I, dur: 1 });
    return { durationMs: O.length, events: O };
  }
  return { durationMs: j, events: b };
}
const Og = Mn[0]?.missionId ?? "first-alarm", qa = "Progress reset.";
function Mg(n, s = null) {
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
    settings: n?.settings ?? hl,
    notice: s
  };
}
function Pg(n, s) {
  let l = xl(n);
  for (const [a, u] of Object.entries(s)) l = dm(l, Number(a), u);
  return l;
}
function Fr(n) {
  return Object.keys(n).length;
}
function dt(n) {
  return n.missionId === null ? null : Qt(n.missionId);
}
function $g(n, s) {
  const l = Gm(n), a = $e(l.code), u = Te(l.challenge.error), f = gm(u, l.challenge.circuit), p = Pg(a.n, s), g = ma(a, f, p), y = an(Wr(a, u)), w = l.kind === "dispatch" ? Zm(a).decode(Mm(y)) : f, b = ma(a, f, w), j = Xa(a, p, w), C = tg({ code: a, outcome: g.kind, crews: p, decoderCrews: w, maxStars: Qt(n).maxStars }), L = ag({ kind: l.kind, code: a, start: u, circuit: l.challenge.circuit, crews: p, verdict: g }), O = cg({
    kind: l.kind,
    code: a,
    finalFire: f,
    crews: p,
    verdict: g,
    equivalent: j,
    decoderCrews: w,
    decoderVerdict: b
  }), R = Ee(f), I = (j || g.kind === "success") && R !== Ee(p), P = I ? f : w, _ = I ? ma(a, f, f) : b, V = {
    crews: Ee(P),
    verdict: _.kind,
    kind: I ? "true-fires" : "decoder",
    residual: Ee(_.residual),
    syndromeOfResidual: an(_.syndrome),
    logicalFlip: { x: [..._.logicalFlip.x], z: [..._.logicalFlip.z] }
  };
  return {
    missionId: n,
    fires: R,
    startFires: Ee(u),
    crews: Ee(p),
    residual: Ee(g.residual),
    syndromeOfFires: an(Wr(a, f)),
    syndromeOfResidual: an(g.syndrome),
    verdict: g.kind,
    verdictLabel: sg(g.kind, a.checks.length > 0),
    logicalFlip: { x: [...g.logicalFlip.x], z: [...g.logicalFlip.z] },
    score: C,
    narrative: l.debrief[g.kind],
    steps: L,
    whatIf: O,
    alternative: V
  };
}
function Ag(n, s, l, a) {
  const u = n[s], f = {
    stars: u === void 0 ? l : Math.max(u.stars, l),
    attempts: (u?.attempts ?? 0) + 1,
    completed: (u?.completed ?? !1) || a
  };
  return { ...n, [s]: f };
}
function sl(n, s) {
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
function yf(n, s) {
  const l = Qt(s);
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
const wh = ["dispatch", "debrief", "result"];
function Dg(n) {
  const s = n.debrief;
  if (s === null || !wh.includes(n.screen)) return { celebrate: null, citySelect: null };
  const l = tr(s.missionId) ?? null, a = s.score.completed ? l?.id ?? null : null, u = fh(s.missionId), f = u === null ? null : tr(u) ?? null, p = f !== null && (n.settings.freeRoam || Ba(f.id, n.progress, !1) === "available");
  return { celebrate: a, citySelect: p ? f.id : l?.id ?? null };
}
function ya(n) {
  return { ...n, screen: "missions", standDownDialog: !1, autoPlay: !1, tutorialActive: !1, tutorialDone: !0, ...Dg(n) };
}
function xa(n, s) {
  const l = [...n.undoStack, n.placements].slice(-20);
  return { ...n, placements: s, undoStack: l, redoStack: [] };
}
const wa = ["how", "settings"];
function xf(n, s) {
  let l = Fg(n, s);
  return l.screen !== n.screen && (l.notice === qa && (l = { ...l, notice: null }), l.highlightedCheck !== null && (l = { ...l, highlightedCheck: null })), l;
}
function Fg(n, s) {
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
      return { ...n, screen: "missions", tutorialActive: !1, celebrate: null, citySelect: null };
    case "TUTORIAL_SKIP":
      return n.tutorialActive ? ya(n) : { ...n, tutorialDone: !0 };
    case "OPEN_HOW":
      return wa.includes(n.screen) ? { ...n, screen: "how" } : { ...n, screen: "how", returnTo: n.screen };
    case "OPEN_SETTINGS":
      return wa.includes(n.screen) ? { ...n, screen: "settings" } : { ...n, screen: "settings", returnTo: n.screen };
    case "CLOSE_OVERLAY":
      return wa.includes(n.screen) ? { ...n, screen: n.returnTo } : n;
    case "OPEN_MISSIONS":
      return ya(n);
    case "OPEN_TITLE":
      return { ...n, screen: "title", standDownDialog: !1, autoPlay: !1, tutorialActive: !1, celebrate: null, citySelect: null };
    case "CELEBRATED":
      return n.celebrate === null ? n : { ...n, celebrate: null };
    case "SELECT_MISSION": {
      const l = Ng(s.id, n.progress, n.settings.freeRoam);
      return l === void 0 || l === "locked" ? n : { ...yf(n, s.id), tutorialActive: !n.tutorialDone && s.id === Og };
    }
    case "START_MISSION": {
      const l = dt(n);
      return l === null || n.screen !== "briefing" ? n : l.training.length > 0 ? { ...n, screen: "training", lesson: 0, lessonCursor: -1 } : sl(n, l);
    }
    case "LESSON_SELECT": {
      const l = dt(n);
      return l === null || n.screen !== "training" || s.lesson < 0 || s.lesson >= l.training.length ? n : { ...n, lesson: s.lesson, lessonCursor: -1 };
    }
    case "LESSON_CURSOR": {
      const l = dt(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      if (a === void 0) return n;
      const u = Math.max(-1, Math.min(a.circuit.length - 1, s.cursor));
      return { ...n, lessonCursor: u };
    }
    case "LESSON_NEXT": {
      const l = dt(n);
      if (l === null || n.screen !== "training") return n;
      const a = l.training[n.lesson];
      return a === void 0 ? n : n.lessonCursor < a.circuit.length - 1 ? { ...n, lessonCursor: n.lessonCursor + 1 } : n.lesson < l.training.length - 1 ? { ...n, lesson: n.lesson + 1, lessonCursor: -1 } : sl(n, l);
    }
    case "LESSON_PREV": {
      const l = dt(n);
      if (l === null || n.screen !== "training") return n;
      if (n.lessonCursor > -1) return { ...n, lessonCursor: n.lessonCursor - 1 };
      if (n.lesson > 0) {
        const a = l.training[n.lesson - 1];
        return { ...n, lesson: n.lesson - 1, lessonCursor: (a?.circuit.length ?? 0) - 1 };
      }
      return n;
    }
    case "BACK_TO_BRIEFING":
      return n.missionId === null || n.screen !== "training" && n.screen !== "challenge" ? n : { ...yf(n, n.missionId), tutorialActive: !1 };
    case "START_CHALLENGE": {
      const l = dt(n);
      return l === null || n.screen !== "training" && n.screen !== "briefing" ? n : sl(n, l);
    }
    case "SELECT_LETTER": {
      const l = dt(n);
      return l === null || n.screen !== "challenge" || !l.allowed.includes(s.letter) ? n : { ...n, selected: s.letter };
    }
    case "TOGGLE_BLOCK": {
      const l = dt(n);
      if (l === null || n.screen !== "challenge" || n.standDownDialog) return n;
      const a = $e(l.code).n;
      if (s.qubit < 0 || s.qubit >= a) return n;
      const u = n.placements[s.qubit], f = { ...n.placements };
      if (u === n.selected)
        delete f[s.qubit];
      else if (u !== void 0)
        f[s.qubit] = n.selected;
      else {
        if (Fr(n.placements) >= l.budget) return n;
        f[s.qubit] = n.selected;
      }
      return xa(n, f);
    }
    case "RECALL_BLOCK": {
      if (n.screen !== "challenge" || n.standDownDialog || n.placements[s.qubit] === void 0) return n;
      const l = { ...n.placements };
      return delete l[s.qubit], xa(n, l);
    }
    case "CLEAR_CREWS":
      return n.screen !== "challenge" || n.standDownDialog || Fr(n.placements) === 0 ? n : xa(n, {});
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
      const l = dt(n);
      if (l === null) return n;
      if (s.checkIndex === null) return n.highlightedCheck === null ? n : { ...n, highlightedCheck: null };
      const a = $e(l.code).checks.length;
      return !Number.isInteger(s.checkIndex) || s.checkIndex < 0 || s.checkIndex >= a ? n : { ...n, highlightedCheck: n.highlightedCheck === s.checkIndex ? null : s.checkIndex };
    }
    case "CONFIRM": {
      const l = dt(n);
      return l === null || n.screen !== "challenge" || n.standDownDialog ? n : Fr(n.placements) === 0 ? { ...n, standDownDialog: !0 } : wf(n, l, s.reducedMotion ?? n.settings.reducedMotion);
    }
    case "STAND_DOWN_CANCEL":
      return { ...n, standDownDialog: !1 };
    case "STAND_DOWN_CONFIRM": {
      const l = dt(n);
      return l === null || n.screen !== "challenge" || !n.standDownDialog ? n : wf(n, l, s.reducedMotion ?? n.settings.reducedMotion);
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
      const u = n.debrief.steps.length - 1;
      return { ...n, autoPlay: a, replayIndex: a && n.replayIndex >= u ? 0 : n.replayIndex };
    }
    case "SHOW_RESULT":
      return n.debrief === null || !(n.screen === "dispatch" && n.dispatchDone) && n.screen !== "debrief" ? n : { ...n, screen: "result", autoPlay: !1 };
    case "TRY_AGAIN": {
      const l = dt(n);
      return l === null || n.screen !== "dispatch" && n.screen !== "debrief" && n.screen !== "result" ? n : sl(n, l);
    }
    case "NEXT_MISSION":
      return n.missionId === null || n.debrief === null || !wh.includes(n.screen) || n.screen === "dispatch" && !n.dispatchDone ? n : !n.tutorialActive && fh(n.missionId) === null && n.debrief.score.completed ? { ...n, screen: "summary", autoPlay: !1, celebrate: null, citySelect: null } : ya(n);
    case "SET_SOUND":
      return { ...n, settings: { ...n.settings, sound: s.on } };
    case "SET_REDUCED_MOTION":
      return { ...n, settings: { ...n.settings, reducedMotion: s.on }, motionReduced: s.on, autoPlay: s.on ? !1 : n.autoPlay };
    case "SET_LANGUAGE":
      return n.settings.language === s.language ? n : { ...n, settings: { ...n.settings, language: s.language } };
    case "SET_FREE_ROAM":
      return n.settings.freeRoam === s.on ? n : { ...n, settings: { ...n.settings, freeRoam: s.on } };
    case "RESET_PROGRESS":
      return { ...n, progress: {}, notice: qa };
    case "SHOW_NOTICE":
      return { ...n, notice: s.text };
    case "DISMISS_NOTICE":
      return { ...n, notice: null };
  }
}
function wf(n, s, l) {
  const a = $g(s.id, n.placements), u = n.tutorialActive && a.verdict === "success";
  return {
    ...n,
    screen: "dispatch",
    standDownDialog: !1,
    debrief: a,
    dispatchDone: !1,
    replayIndex: 0,
    motionReduced: l,
    autoPlay: !l && a.steps.length > 1,
    progress: Ag(n.progress, s.id, a.score.stars, a.score.completed),
    tutorialDone: n.tutorialDone || u
  };
}
function zg(n) {
  return { version: Ps, progress: n.progress, settings: n.settings, tutorialDone: n.tutorialDone };
}
function Ha(n) {
  return An().reduce((s, l) => s + (n[l.id]?.stars ?? 0), 0);
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
}, Xg = { X: m.crewX, Z: m.crewZ, Y: m.crewY }, Q = 2.5, pe = 1.6, kf = [m.wallPeach, m.wallMint, m.wallButter, m.wallLilac, m.wallRose, m.wallPowder], vf = [m.roofTerracotta, m.roofSlate, m.roofMoss, m.roofPlum];
function De(n) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}
const nr = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
function kh(n) {
  return Xg[n];
}
function Oe({ x: n, y: s, scale: l = 1, title: a, className: u, children: f }) {
  const p = l === 1 ? `translate(${De(n)} ${De(s)})` : `translate(${De(n)} ${De(s)}) scale(${De(l)})`;
  return /* @__PURE__ */ i.jsxs("g", { transform: p, className: u, role: a === void 0 ? void 0 : "img", "aria-label": a, children: [
    a !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: a }) : null,
    f
  ] });
}
function Pn({ cx: n, cy: s, r: l, letter: a, fill: u = m.paper, ink: f = m.ink, stroke: p = m.ink }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: l, fill: u, stroke: p, strokeWidth: Q * 0.8 }),
    /* @__PURE__ */ i.jsx("text", { x: n, y: s + l * 0.72, textAnchor: "middle", fontSize: l * 1.9, fontWeight: 800, fill: f, fontFamily: nr, style: { userSelect: "none" }, children: a })
  ] });
}
function Dn({ cx: n, cy: s, rx: l, ry: a = l * 0.32 }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.shadow });
}
const vh = "M0 0 C-26 0 -38 -16 -38 -36 C-38 -52 -30 -60 -32 -74 C-24 -66 -18 -58 -16 -48 C-10 -62 -4 -76 0 -92", jh = "M0 -92 C6 -74 20 -62 28 -48 C36 -34 36 -14 22 -4 C16 0 8 0 0 0", ka = `${vh} ${jh} Z`, Wg = "M0 -6 C-14 -6 -20 -16 -20 -28 C-20 -40 -12 -48 -8 -56 C-4 -46 2 -40 4 -32 C10 -40 10 -50 10 -56 C18 -46 20 -34 18 -24 C16 -12 10 -6 0 -6 Z";
function cn({ letter: n, residual: s = !1, ghost: l = !1, ...a }) {
  const u = n === "Z" ? m.fireZ : m.fireX, f = n === "X" ? m.fireX : m.fireZ, p = n === "X" ? m.fireXCore : n === "Z" ? m.fireZCore : m.fireYCore;
  return l ? /* @__PURE__ */ i.jsxs(Oe, { ...a, children: [
    /* @__PURE__ */ i.jsx("path", { d: ka, fill: m.paper, fillOpacity: 0.6, stroke: m.ghost, strokeWidth: Q, strokeDasharray: "7 5", strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: -26, r: 13, letter: n, ink: m.ghost, stroke: m.ghost })
  ] }) : /* @__PURE__ */ i.jsxs(Oe, { ...a, children: [
    s ? /* @__PURE__ */ i.jsx("path", { d: ka, fill: "none", stroke: m.danger, strokeWidth: Q * 3.2, strokeLinejoin: "round" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `${vh} L0 0 Z`, fill: u }),
    /* @__PURE__ */ i.jsx("path", { d: `${jh} L0 -92 Z`, fill: f }),
    /* @__PURE__ */ i.jsx("path", { d: Wg, fill: p }),
    /* @__PURE__ */ i.jsx("path", { d: ka, fill: "none", stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: -26, r: 13, letter: n })
  ] });
}
function jf({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, scale: (s.scale ?? 1) * n, children: [
    /* @__PURE__ */ i.jsxs("g", { fill: m.smoke, stroke: m.ink, strokeWidth: Q * 0.8, children: [
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
function Zg(n) {
  return /* @__PURE__ */ i.jsx(Oe, { ...n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.steam, stroke: m.fogDark, strokeWidth: Q * 0.7, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: -12, cy: -14, r: 11 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 6, cy: -22, r: 13 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -2, cy: -40, r: 9 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 14, cy: -50, r: 6 })
  ] }) });
}
function Sh(n) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...n, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -16, r: 16, fill: m.success, stroke: m.ink, strokeWidth: Q * 0.8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M-8 -16 L-2 -10 L9 -23", fill: "none", stroke: m.paper, strokeWidth: 4.5, strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Bg({ from: n, to: s, progress: l = 1, lift: a, title: u, className: f }) {
  const p = s.x - n.x, g = s.y - n.y, y = Math.hypot(p, g), w = a ?? Math.max(28, y * 0.35), b = (n.x + s.x) / 2, j = Math.min(n.y, s.y) - w, C = Math.max(0, Math.min(1, l)), L = { x: n.x + (b - n.x) * C, y: n.y + (j - n.y) * C }, O = { x: b + (s.x - b) * C, y: j + (s.y - j) * C }, R = { x: L.x + (O.x - L.x) * C, y: L.y + (O.y - L.y) * C }, I = `M${De(n.x)} ${De(n.y)} Q${De(L.x)} ${De(L.y)} ${De(R.x)} ${De(R.y)}`, P = [];
  for (let _ = 1; _ <= 4; _++) {
    const V = _ / 5 * C, ne = 1 - V, te = ne * ne * n.x + 2 * ne * V * b + V * V * s.x, J = ne * ne * n.y + 2 * ne * V * j + V * V * s.y;
    P.push({ x: te + (_ % 2 === 0 ? 9 : -9), y: J + 10 + _ % 2 * 4, r: 3.2 + _ % 3 });
  }
  return /* @__PURE__ */ i.jsxs("g", { className: f, role: u === void 0 ? void 0 : "img", "aria-label": u, children: [
    u !== void 0 ? /* @__PURE__ */ i.jsx("title", { children: u }) : null,
    /* @__PURE__ */ i.jsx("path", { d: I, fill: "none", stroke: m.waterDeep, strokeWidth: 13, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: I, fill: "none", stroke: m.water, strokeWidth: 9, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: I, fill: "none", stroke: m.waterHighlight, strokeWidth: 2.4, strokeLinecap: "round", strokeDasharray: "10 14" }),
    P.map((_, V) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: _.x, cy: _.y, r: _.r, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: _.x - _.r * 0.3, cy: _.y - _.r * 0.3, r: _.r * 0.3, fill: m.waterHighlight })
    ] }, V)),
    C >= 1 ? /* @__PURE__ */ i.jsx("circle", { cx: s.x, cy: s.y, r: 8, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }) : null
  ] });
}
function qg({ spread: n = 1, ...s }) {
  const l = 0.4 + 0.6 * Math.max(0, Math.min(1, n)), a = [-150, -115, -80, -50, -25, 0, 30].map((u, f) => {
    const p = u * Math.PI / 180, g = (26 + f % 2 * 10) * l;
    return { x: Math.cos(p) * g, y: Math.sin(p) * g - 4, size: 3.5 + f % 3 * 1.2 };
  });
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 26 * l, ry: 7 * l, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.5 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6 * l, cy: 1, rx: 8 * l, ry: 2.2 * l, fill: m.waterHighlight }),
    a.map((u, f) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("line", { x1: 0, y1: -4, x2: u.x * 0.55, y2: u.y * 0.55, stroke: m.water, strokeWidth: 2.2, strokeLinecap: "round" }),
      /* @__PURE__ */ i.jsx("circle", { cx: u.x, cy: u.y, r: u.size, fill: m.water, stroke: m.waterDeep, strokeWidth: 1.2 }),
      /* @__PURE__ */ i.jsx("circle", { cx: u.x - u.size * 0.3, cy: u.y - u.size * 0.3, r: u.size * 0.3, fill: m.waterHighlight })
    ] }, f))
  ] });
}
function Hg(n) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...n, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M0 -40 C8 -26 16 -18 16 -8 A16 16 0 0 1 -16 -8 C-16 -18 -8 -26 0 -40 Z", fill: m.water, stroke: m.waterDeep, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: -6, cy: -12, rx: 3.5, ry: 5, fill: m.waterHighlight })
  ] });
}
const Sf = { x: 34, y: -34 };
function Ug(n, s, l = 1, a = 1) {
  return { x: n + Sf.x * l * a, y: s + Sf.y * l };
}
function bh({ letter: n, pose: s = "idle", facing: l = 1, shadow: a = !0, ...u }) {
  const f = kh(n), p = Yg(s);
  return /* @__PURE__ */ i.jsxs(Oe, { ...u, children: [
    a ? /* @__PURE__ */ i.jsx(Dn, { cx: 0, cy: 1, rx: 16, ry: 4.5 }) : null,
    /* @__PURE__ */ i.jsxs("g", { transform: l === -1 ? "scale(-1 1)" : void 0, children: [
      s === "spray" ? /* @__PURE__ */ i.jsx("path", { d: "M-4 -40 L18 -34", stroke: m.jacket, strokeWidth: 7, strokeLinecap: "round" }) : null,
      /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: pe, strokeLinejoin: "round", children: [
        /* @__PURE__ */ i.jsx("path", { d: p.back, fill: m.jacket }),
        /* @__PURE__ */ i.jsx("path", { d: p.front, fill: m.jacket })
      ] }),
      /* @__PURE__ */ i.jsx("rect", { x: p.bootBack - 6, y: -7, width: 12, height: 7, rx: 2, fill: m.boots }),
      /* @__PURE__ */ i.jsx("rect", { x: p.bootFront - 6, y: -7, width: 12, height: 7, rx: 2, fill: m.boots }),
      /* @__PURE__ */ i.jsx("path", { d: "M-13 -24 L-13 -44 Q-13 -48 -9 -48 L9 -48 Q13 -48 13 -44 L13 -24 Z", fill: m.jacket, stroke: m.ink, strokeWidth: pe, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: -13, y: -36, width: 26, height: 3.5, fill: m.jacketStripe }),
      /* @__PURE__ */ i.jsx("rect", { x: -13, y: -29, width: 26, height: 3.5, fill: m.jacketStripe }),
      s === "spray" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: "M6 -42 L30 -36", stroke: m.jacket, strokeWidth: 7, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: "M6 -42 L30 -36", stroke: m.jacketStripe, strokeWidth: 2, strokeLinecap: "round", strokeDasharray: "3 6" }),
        /* @__PURE__ */ i.jsx("rect", { x: 22, y: -40, width: 14, height: 9, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: pe }),
        /* @__PURE__ */ i.jsx("rect", { x: 34, y: -38, width: 5, height: 5, fill: m.hose, stroke: m.ink, strokeWidth: 1 })
      ] }) : s === "idle" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: "M-13 -44 L-16 -27", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: "M13 -44 L16 -27", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("path", { d: s === "run1" ? "M-12 -44 L-20 -33" : "M-12 -44 L-6 -30", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" }),
        /* @__PURE__ */ i.jsx("path", { d: s === "run1" ? "M12 -44 L18 -30" : "M12 -44 L22 -36", stroke: m.jacket, strokeWidth: 6, strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -55, r: 9.5, fill: m.skin, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("circle", { cx: 3.5, cy: -56, r: 1.4, fill: m.ink }),
      /* @__PURE__ */ i.jsx("path", { d: "M-14 -58 Q-14 -80 0 -80 Q14 -80 14 -58 Z", fill: f, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: -17, y: -60, width: 34, height: 4.5, rx: 2, fill: f, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("g", { transform: l === -1 ? "scale(-1 1)" : void 0, children: /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: -69, r: 7.5, letter: n }) })
    ] })
  ] });
}
function Yg(n) {
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
function Ua({ letter: n, ...s }) {
  const l = kh(n);
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -8 Q-22 -40 0 -40 Q22 -40 22 -8 Z", fill: l, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("rect", { x: -27, y: -10, width: 54, height: 8, rx: 4, fill: l, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: -22, r: 10, letter: n })
  ] });
}
function Ya({ facing: n = 1, lights: s = !1, wheelFrame: l = 0, plain: a = !1, lettering: u, ...f }) {
  const p = a || u !== void 0;
  return /* @__PURE__ */ i.jsxs(Oe, { ...f, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 0, cy: 2, rx: 72, ry: 6 }),
    /* @__PURE__ */ i.jsxs("g", { transform: n === -1 ? "scale(-1 1)" : void 0, children: [
      /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: pe, children: [
        /* @__PURE__ */ i.jsx("rect", { x: -66, y: -66, width: 92, height: 5, fill: m.ladder }),
        /* @__PURE__ */ i.jsx("rect", { x: -66, y: -58, width: 92, height: 5, fill: m.ladder }),
        [-58, -44, -30, -16, -2, 12].map((g) => /* @__PURE__ */ i.jsx("line", { x1: g, y1: -66, x2: g, y2: -53 }, g))
      ] }),
      /* @__PURE__ */ i.jsx("rect", { x: -72, y: -52, width: 100, height: 42, rx: 4, fill: m.truck, stroke: m.ink, strokeWidth: Q }),
      /* @__PURE__ */ i.jsx("rect", { x: -72 + Q / 2, y: -32, width: 100 - Q, height: 6, fill: m.truckTrim }),
      p ? null : /* @__PURE__ */ i.jsxs("g", { fill: m.truckDark, stroke: m.ink, strokeWidth: pe, children: [
        /* @__PURE__ */ i.jsx("rect", { x: -64, y: -47, width: 22, height: 13, rx: 2 }),
        /* @__PURE__ */ i.jsx("rect", { x: -38, y: -47, width: 22, height: 13, rx: 2 }),
        /* @__PURE__ */ i.jsx("rect", { x: -12, y: -47, width: 22, height: 13, rx: 2 })
      ] }),
      /* @__PURE__ */ i.jsx("path", { d: "M28 -10 L28 -58 Q28 -62 32 -62 L58 -62 Q66 -62 70 -54 L76 -36 L76 -10 Z", fill: m.truck, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("path", { d: "M34 -56 L58 -56 Q63 -56 65 -51 L70 -38 L34 -38 Z", fill: m.glass, stroke: m.ink, strokeWidth: pe, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: 28 + Q / 2, y: -32, width: 48 - Q, height: 6, fill: m.truckTrim }),
      /* @__PURE__ */ i.jsx("rect", { x: 70, y: -18, width: 10, height: 8, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: pe }),
      p ? null : /* @__PURE__ */ i.jsx("circle", { cx: -56, cy: -24, r: 6, fill: m.hose, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: 40, y: -70, width: 14, height: 8, rx: 3, fill: s ? m.beaconBlue : m.glass, stroke: m.ink, strokeWidth: pe }),
      s ? /* @__PURE__ */ i.jsx("circle", { cx: 47, cy: -66, r: 11, fill: "none", stroke: m.beaconBlue, strokeWidth: 2 }) : null,
      /* @__PURE__ */ i.jsx(bf, { cx: -42, frame: l }),
      /* @__PURE__ */ i.jsx(bf, { cx: 48, frame: l })
    ] }),
    u !== void 0 ? /* @__PURE__ */ i.jsx(
      "text",
      {
        x: n === -1 ? 22 : -22,
        y: -35,
        textAnchor: "middle",
        fontSize: 20,
        fontWeight: 900,
        fill: m.paper,
        stroke: m.ink,
        strokeWidth: 1.1,
        strokeLinejoin: "round",
        paintOrder: "stroke",
        fontFamily: nr,
        letterSpacing: 1,
        style: { userSelect: "none" },
        children: u
      }
    ) : null
  ] });
}
function bf({ cx: n, frame: s }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 13, fill: m.wheel }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: -13, r: 6.5, fill: m.hub, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 5, y1: s === 0 ? -13 : -18, x2: n + 5, y2: s === 0 ? -13 : -8, stroke: m.ink, strokeWidth: 1.6 })
  ] });
}
const va = -44, Nt = 16;
function Nh({ type: n, ringing: s, highlighted: l }) {
  const a = n === "Z" ? m.fireX : m.fireZ, u = s ? m.alarm : m.paper, f = s ? m.alarmDark : a;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    l ? /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: Nt + 9, fill: "none", stroke: m.highlight, strokeWidth: Q * 1.6 }) : null,
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: Nt + 7, fill: "none", stroke: m.alarmRing, strokeWidth: 2.4 }),
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: Nt + 13, fill: "none", stroke: m.alarmRing, strokeWidth: 1.6 })
    ] }) : null,
    n === "Z" ? /* @__PURE__ */ i.jsx("polygon", { points: `0,${String(-Nt)} ${String(Nt)},0 0,${String(Nt)} ${String(-Nt)},0`, fill: u, stroke: f, strokeWidth: Q, strokeLinejoin: "round" }) : /* @__PURE__ */ i.jsx("rect", { x: -Nt * 0.85, y: -Nt * 0.85, width: Nt * 1.7, height: Nt * 1.7, rx: 3, fill: u, stroke: f, strokeWidth: Q }),
    s ? /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: 0, r: 9, letter: "!", fill: m.paper, ink: m.alarmDark, stroke: m.alarmDark }) : /* @__PURE__ */ i.jsx("text", { x: 0, y: 6.5, textAnchor: "middle", fontSize: 18, fontWeight: 800, fill: a, fontFamily: nr, style: { userSelect: "none" }, children: n })
  ] });
}
function _s({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...a, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 0, cy: 1, rx: 10, ry: 3 }),
    l ? /* @__PURE__ */ i.jsx("line", { x1: 0, y1: va + Nt + 9, x2: 0, y2: 0, stroke: m.highlight, strokeWidth: 9, strokeLinecap: "round" }) : null,
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: va + Nt - 4, width: 6, height: 32, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -9, y: -5, width: 18, height: 5, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("g", { transform: `translate(0 ${String(va)})`, children: /* @__PURE__ */ i.jsx(Nh, { type: n, ringing: s, highlighted: l }) })
  ] });
}
function Vg({ type: n, ringing: s = !1, highlighted: l = !1, ...a }) {
  return /* @__PURE__ */ i.jsx(Oe, { ...a, children: /* @__PURE__ */ i.jsx(Nh, { type: n, ringing: s, highlighted: l }) });
}
const Qg = {
  small: { w: 64, h: 44, roof: 30, side: 12 },
  tall: { w: 56, h: 84, roof: 22, side: 12 },
  shop: { w: 84, h: 46, roof: 16, side: 12 }
};
function Ue({ variant: n = "small", state: s = { kind: "normal" }, tint: l = 0, selected: a = !1, ...u }) {
  const f = Qg[n], p = kf[l % kf.length] ?? m.wallPeach, g = vf[l % vf.length] ?? m.roofTerracotta, y = f.w / 2, b = s.kind === "restored" ? m.windowLit : m.windowDark, j = -(f.h + f.roof), C = s.kind === "fog";
  return /* @__PURE__ */ i.jsxs(Oe, { ...u, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: f.side / 2, cy: 2, rx: y + f.side, ry: 7 }),
    s.kind === "residual" ? /* @__PURE__ */ i.jsx("rect", { x: -y - 6, y: j - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.danger, strokeWidth: Q * 2.4 }) : null,
    a ? /* @__PURE__ */ i.jsx("rect", { x: -y - 8, y: j - 8, width: f.w + f.side + 16, height: f.h + f.roof + 16, rx: 10, fill: "none", stroke: m.highlight, strokeWidth: Q * 1.6, strokeDasharray: "10 6" }) : null,
    /* @__PURE__ */ i.jsx("path", { d: `M${String(y)} 0 L${String(y + f.side)} ${String(-f.side * 0.6)} L${String(y + f.side)} ${String(-f.h - f.side * 0.6)} L${String(y)} ${String(-f.h)} Z`, fill: m.side, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -y, y: -f.h, width: f.w, height: f.h, fill: p, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(y + 4)} ${String(-f.h)} L${String(y + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(f.side)} ${String(j - f.side * 0.6)} L0 ${String(j)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-y - 5)} ${String(-f.h)} L0 ${String(j)} L${String(y + 5)} ${String(-f.h)} Z`, fill: g, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("path", { d: `M${String(-y - 4)} ${String(-f.h)} L${String(-y - 4 + f.side)} ${String(-f.h - f.side * 0.6)} L${String(y + f.side + 4)} ${String(-f.h - f.side * 0.6)} L${String(y + 4)} ${String(-f.h)} Z`, fill: m.roofSlate, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
      /* @__PURE__ */ i.jsx("rect", { x: -y - 4, y: -f.h - f.roof, width: f.w + 8, height: f.roof, fill: g, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
      n === "shop" ? /* @__PURE__ */ i.jsx("path", { d: `M${String(-y - 4)} ${String(-f.h - f.roof)} H${String(y + 4)}`, stroke: m.paper, strokeWidth: 4, strokeDasharray: "8 8" }) : null
    ] }),
    n === "small" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -y + 9, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: b, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: y - 25, y: -f.h + 10, width: 16, height: 14, rx: 2, fill: b, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -22, width: 16, height: 22, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: pe })
    ] }) : n === "tall" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      [0, 1, 2].map((L) => /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("rect", { x: -y + 8, y: -f.h + 10 + L * 22, width: 14, height: 13, rx: 2, fill: b, stroke: m.ink, strokeWidth: pe }),
        /* @__PURE__ */ i.jsx("rect", { x: y - 22, y: -f.h + 10 + L * 22, width: 14, height: 13, rx: 2, fill: b, stroke: m.ink, strokeWidth: pe })
      ] }, L)),
      /* @__PURE__ */ i.jsx("rect", { x: -8, y: -20, width: 16, height: 20, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: pe })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -y + 8, y: -f.h + 12, width: f.w - 40, height: 22, rx: 2, fill: b, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: y - 26, y: -26, width: 18, height: 26, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: pe }),
      /* @__PURE__ */ i.jsx("rect", { x: -y - 4, y: -f.h + 2, width: f.w + 8, height: 6, fill: m.paper, stroke: m.ink, strokeWidth: pe })
    ] }),
    s.kind === "fire" || s.kind === "residual" ? /* @__PURE__ */ i.jsx(cn, { letter: s.letter, x: n === "shop" ? -10 : 0, y: j + 14, scale: 0.62, residual: s.kind === "residual" }) : null,
    s.kind === "ghost" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -y - 6, y: j - 6, width: f.w + f.side + 12, height: f.h + f.roof + 12, rx: 8, fill: "none", stroke: m.ghost, strokeWidth: Q, strokeDasharray: "8 6" }),
      /* @__PURE__ */ i.jsx(cn, { letter: s.letter, x: 0, y: j + 14, scale: 0.62, ghost: !0 })
    ] }) : null,
    s.kind === "out" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Zg, { x: 0, y: j + 10, scale: 0.7 }),
      /* @__PURE__ */ i.jsx(Sh, { x: y - 4, y: -f.h + 6, scale: 0.8 })
    ] }) : null,
    C ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("rect", { x: -y - 10, y: j - 12, width: f.w + f.side + 20, height: f.h + f.roof + 14, rx: 14, fill: m.fog, fillOpacity: 0.82, stroke: m.fogDark, strokeWidth: Q }),
      /* @__PURE__ */ i.jsx("text", { x: f.side / 2, y: -(f.h + f.roof) / 2 + 14, textAnchor: "middle", fontSize: 38, fontWeight: 800, fill: m.paper, stroke: m.fogDark, strokeWidth: 1.2, fontFamily: nr, style: { userSelect: "none" }, children: "?" })
    ] }) : null
  ] });
}
function jl({ anomaly: n = null, lit: s = !1, ...l }) {
  const a = n === null ? s ? m.windowLit : m.beaconDome : n === "X" ? m.fireX : n === "Z" ? m.fireZ : m.crewY;
  return /* @__PURE__ */ i.jsxs(Oe, { ...l, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 6, cy: 2, rx: 44, ry: 7 }),
    /* @__PURE__ */ i.jsx("path", { d: "M26 0 L38 -7 L38 -112 L26 -118 Z", fill: m.side, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -26, y: -118, width: 52, height: 118, fill: m.wallStone, stroke: m.ink, strokeWidth: Q }),
    [0, 1, 2].map((u) => /* @__PURE__ */ i.jsx("rect", { x: -7, y: -104 + u * 30, width: 14, height: 18, rx: 7, fill: s ? m.windowLit : m.windowDark, stroke: m.ink, strokeWidth: pe }, u)),
    /* @__PURE__ */ i.jsx("rect", { x: -10, y: -24, width: 20, height: 24, rx: 4, fill: m.door, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("rect", { x: -32, y: -126, width: 76, height: 10, fill: m.roofPlum, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("rect", { x: -22, y: -150, width: 44, height: 26, fill: m.wallStone, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("path", { d: "M-18 -150 Q0 -176 18 -150 Z", fill: a, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("rect", { x: -22, y: -152, width: 44, height: 5, fill: m.inkSoft, stroke: m.ink, strokeWidth: pe }),
    n !== null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -158, r: 28, fill: "none", stroke: a, strokeWidth: 3, strokeDasharray: "6 6" }),
      n === "Y" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Pn, { cx: -14, cy: -186, r: 11, letter: "X", ink: m.fireX, stroke: m.fireX }),
        /* @__PURE__ */ i.jsx(Pn, { cx: 14, cy: -186, r: 11, letter: "Z", ink: m.fireZ, stroke: m.fireZ })
      ] }) : /* @__PURE__ */ i.jsx(Pn, { cx: 0, cy: -186, r: 12, letter: n, ink: a, stroke: a })
    ] }) : null
  ] });
}
function Kg({ open: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 8, cy: 2, rx: 84, ry: 8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M70 0 L84 -8 L84 -72 L70 -64 Z", fill: m.side, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -70, y: -64, width: 140, height: 64, fill: m.wallBrick, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("path", { d: "M-74 -64 L-60 -72 L84 -72 L70 -64 Z", fill: m.roofSlate, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -74, y: -70, width: 148, height: 6, fill: m.truckTrim, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("rect", { x: -58, y: -46, width: 44, height: 46, rx: 4, fill: n ? m.ink : m.truckTrim, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("rect", { x: -4, y: -46, width: 44, height: 46, rx: 4, fill: m.truckTrim, stroke: m.ink, strokeWidth: Q }),
    n ? null : /* @__PURE__ */ i.jsx("path", { d: "M-54 -34 H-18 M-54 -22 H-18 M-54 -10 H-18", stroke: m.ink, strokeWidth: 1.4 }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -34 H36 M0 -22 H36 M0 -10 H36", stroke: m.ink, strokeWidth: 1.4 }),
    /* @__PURE__ */ i.jsx("rect", { x: 48, y: -52, width: 14, height: 14, rx: 2, fill: m.windowDark, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("rect", { x: -50, y: -104, width: 28, height: 34, fill: m.wallBrick, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("path", { d: "M-54 -104 L-36 -120 L-18 -104 Z", fill: m.roofTerracotta, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: "M-42 -84 Q-36 -98 -30 -84 Z", fill: m.alarmRing, stroke: m.ink, strokeWidth: pe })
  ] });
}
function Eh({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 8, cy: 2, rx: 76, ry: 8 }),
    /* @__PURE__ */ i.jsx("path", { d: "M60 0 L74 -8 L74 -62 L60 -54 Z", fill: m.side, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -60, y: -54, width: 120, height: 54, fill: m.wallPowder, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("path", { d: "M-64 -54 L-50 -62 L74 -62 L60 -54 Z", fill: m.roofSlate, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("rect", { x: -52, y: -44, width: 104, height: 24, rx: 4, fill: m.glass, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("path", { d: "M-40 -44 V-20 M-20 -44 V-20 M0 -44 V-20 M20 -44 V-20 M40 -44 V-20", stroke: m.paper, strokeWidth: 2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -10, y: -18, width: 20, height: 18, rx: 3, fill: m.door, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx(Ch, { x: 0, y: -62, scale: 0.9, active: n, label: !1 })
  ] });
}
function Ch({ active: n = !1, label: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...l, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -16, y: -6, width: 32, height: 6, rx: 2, fill: m.inkSoft, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("rect", { x: -3, y: -20, width: 6, height: 14, fill: m.inkSoft, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsxs("g", { transform: "rotate(-45 0 -30)", children: [
      /* @__PURE__ */ i.jsx("rect", { x: -22, y: -34, width: 44, height: 8, rx: 2, fill: n ? m.alarmRing : m.glass, stroke: m.ink, strokeWidth: Q }),
      /* @__PURE__ */ i.jsx("line", { x1: -16, y1: -30, x2: 14, y2: -30, stroke: m.paper, strokeWidth: 2 })
    ] }),
    s ? /* @__PURE__ */ i.jsx("text", { x: 0, y: -40, textAnchor: "middle", fontSize: 16, fontWeight: 800, fill: m.ink, fontFamily: nr, style: { userSelect: "none" }, children: "H" }) : null
  ] });
}
function Th({ width: n = 160, ...s }) {
  const l = n / 2;
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("path", { d: `M${String(-l)} 0 Q0 -46 ${String(l)} 0`, fill: "none", stroke: m.ink, strokeWidth: Q + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: `M${String(-l)} 0 Q0 -46 ${String(l)} 0`, fill: "none", stroke: m.wallStone, strokeWidth: 6 }),
    /* @__PURE__ */ i.jsx("rect", { x: -l - 6, y: -12, width: n + 12, height: 12, rx: 3, fill: m.wallStone, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsxs("g", { stroke: m.ink, strokeWidth: pe, children: [
      /* @__PURE__ */ i.jsx("line", { x1: -l, y1: -12, x2: l, y2: -12 }),
      /* @__PURE__ */ i.jsx("line", { x1: -l - 2, y1: -26, x2: l + 2, y2: -26, stroke: m.roofSlate, strokeWidth: 3 }),
      Array.from({ length: Math.floor(n / 20) + 1 }, (a, u) => -l + u * 20).map((a) => /* @__PURE__ */ i.jsx("line", { x1: a, y1: -12, x2: a, y2: -26 }, a))
    ] }),
    /* @__PURE__ */ i.jsxs("g", { fill: m.wallStone, stroke: m.ink, strokeWidth: Q, children: [
      /* @__PURE__ */ i.jsx("rect", { x: -l - 14, y: -30, width: 14, height: 30, rx: 2 }),
      /* @__PURE__ */ i.jsx("rect", { x: l, y: -30, width: 14, height: 30, rx: 2 })
    ] })
  ] });
}
function Va({ x: n = 0, y: s = 0, width: l, height: a, rx: u = 0 }) {
  return /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: u, fill: m.sand });
}
function Jn({ cx: n, cy: s, rx: l, ry: a }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n, cy: s, rx: l, ry: a, fill: m.grass });
}
function Gg({ d: n, width: s = 40, className: l }) {
  return /* @__PURE__ */ i.jsxs("g", { className: l, fill: "none", strokeLinecap: "butt", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadEdge, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.road, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.roadLine, strokeWidth: Math.max(2, s * 0.08), strokeDasharray: `${De(s * 0.5)} ${De(s * 0.45)}` })
  ] });
}
function Jg({ d: n, width: s = 14 }) {
  return /* @__PURE__ */ i.jsx("path", { d: n, fill: "none", stroke: m.sandDark, strokeWidth: s, strokeLinecap: "round", strokeLinejoin: "round" });
}
function Ih({ d: n, width: s = 60 }) {
  return /* @__PURE__ */ i.jsxs("g", { fill: "none", strokeLinecap: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.riverDark, strokeWidth: s + 6 }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.river, strokeWidth: s }),
    /* @__PURE__ */ i.jsx("path", { d: n, stroke: m.paper, strokeWidth: 2, strokeDasharray: "14 22", transform: "translate(-10 0)" })
  ] });
}
function xt({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, scale: (s.scale ?? 1) * n, children: [
    /* @__PURE__ */ i.jsx(Dn, { cx: 2, cy: 1, rx: 14, ry: 4 }),
    /* @__PURE__ */ i.jsx("rect", { x: -4, y: -22, width: 8, height: 22, fill: m.trunk, stroke: m.ink, strokeWidth: pe }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -38, r: 19, fill: m.tree, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("circle", { cx: -9, cy: -30, r: 11, fill: m.treeDark }),
    /* @__PURE__ */ i.jsx("circle", { cx: 7, cy: -46, r: 7, fill: m.grass })
  ] });
}
function ey({ lit: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2.5, y: -62, width: 5, height: 62, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("rect", { x: -8, y: -4, width: 16, height: 4, rx: 1.5, fill: m.lampPost, stroke: m.ink, strokeWidth: 1.2 }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -62 Q0 -70 10 -70", fill: "none", stroke: m.lampPost, strokeWidth: 4 }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: 13, cy: -70, rx: 8, ry: 5, fill: n ? m.windowLit : m.lamp, stroke: m.ink, strokeWidth: pe }),
    n ? /* @__PURE__ */ i.jsx("path", { d: "M6 -64 L13 -52 L20 -64 Z", fill: m.windowLit, fillOpacity: 0.6 }) : null
  ] });
}
function ty({ colour: n = m.flag, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("rect", { x: -2, y: -62, width: 4, height: 62, fill: m.flagPole, stroke: m.ink, strokeWidth: 1 }),
    /* @__PURE__ */ i.jsx("path", { d: "M2 -62 L36 -50 L2 -38 Z", fill: n, stroke: m.ink, strokeWidth: pe, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: -64, r: 3.5, fill: m.alarmRing, stroke: m.ink, strokeWidth: 1 })
  ] });
}
function ny(n) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...n, children: [
    /* @__PURE__ */ i.jsxs("g", { fill: m.barrierStripe, stroke: m.ink, strokeWidth: pe, children: [
      /* @__PURE__ */ i.jsx("rect", { x: -30, y: -22, width: 6, height: 22 }),
      /* @__PURE__ */ i.jsx("rect", { x: 24, y: -22, width: 6, height: 22 })
    ] }),
    /* @__PURE__ */ i.jsx("rect", { x: -36, y: -34, width: 72, height: 14, rx: 3, fill: m.barrier, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("g", { fill: m.barrierStripe, children: [-28, -10, 8, 26].map((s) => /* @__PURE__ */ i.jsx("path", { d: `M${String(s)} -32 L${String(s + 8)} -32 L${String(s)} -22 L${String(s - 8)} -22 Z` }, s)) })
  ] });
}
function ry({ x: n, y: s, width: l, height: a }) {
  const u = Math.min(l, a) * 0.28;
  return /* @__PURE__ */ i.jsxs("g", { fill: m.fog, fillOpacity: 0.8, stroke: m.fogDark, strokeWidth: pe, children: [
    /* @__PURE__ */ i.jsx("rect", { x: n, y: s, width: l, height: a, rx: u }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.22, cy: s + a * 0.2, r: u * 0.8 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n + l * 0.78, cy: s + a * 0.76, r: u * 0.9 })
  ] });
}
function Lh(n) {
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(jf, { ...n, scale: (n.scale ?? 1) * 1.3 }),
    /* @__PURE__ */ i.jsx(jf, { ...n, x: n.x + 26 * (n.scale ?? 1), y: n.y - 40 * (n.scale ?? 1), scale: (n.scale ?? 1) * 0.9 })
  ] });
}
function ja({ size: n = 1, ...s }) {
  return /* @__PURE__ */ i.jsx(Oe, { ...s, scale: (s.scale ?? 1) * n, children: /* @__PURE__ */ i.jsxs("g", { fill: m.cloud, stroke: m.skyDeep, strokeWidth: pe, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: -10, rx: 44, ry: 12 }),
    /* @__PURE__ */ i.jsx("circle", { cx: -14, cy: -18, r: 14 }),
    /* @__PURE__ */ i.jsx("circle", { cx: 10, cy: -22, r: 18 })
  ] }) });
}
function pl({ colour: n = m.crewZ, earned: s = !0, ...l }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...l, children: [
    /* @__PURE__ */ i.jsx("path", { d: "M-22 -54 H22 V-24 Q22 -8 0 0 Q-22 -8 -22 -24 Z", fill: s ? n : m.fog, stroke: m.ink, strokeWidth: Q, strokeLinejoin: "round" }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 -44 L4.5 -35 L14 -34 L7 -27 L9 -17 L0 -22 L-9 -17 L-7 -27 L-14 -34 L-4.5 -35 Z", fill: s ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: pe, strokeLinejoin: "round" })
  ] });
}
const Zr = 1600, Br = 1e3, Vt = 170, $s = ["station-row", "bridge", "lab", "central", "market", "old-town"], Os = { x: 80, y: 540, w: 230, h: 160, door: { x: 195 } }, Qa = 720, Rh = 40, _h = 730, sy = 60, zt = [
  { id: "station-row", missionId: "first-alarm", x: 380, y: 520, w: 260, h: 180, label: { x: 510, y: 505 }, entry: { x: 510, y: 720 }, gate: { x: 396, y: 596 }, block: { x: 510, y: 700 }, smoke: { x: 510, y: 600 } },
  { id: "bridge", missionId: "red-forward-blue-backward", x: 640, y: 640, w: 180, h: 120, label: { x: 730, y: 625 }, entry: { x: 600, y: 720 }, gate: { x: 662, y: 664 }, block: { x: 628, y: 724 }, smoke: { x: 740, y: 700 } },
  { id: "lab", missionId: "color-switch", x: 860, y: 260, w: 240, h: 180, label: { x: 980, y: 245 }, entry: { x: 940, y: 460 }, gate: { x: 876, y: 404 }, block: { x: 940, y: 468 }, smoke: { x: 1010, y: 340 } },
  { id: "central", missionId: "blind-dispatch", x: 1e3, y: 470, w: 300, h: 230, label: { x: 1150, y: 455 }, entry: { x: 1150, y: 720 }, gate: { x: 1016, y: 560 }, block: { x: 1150, y: 700 }, smoke: { x: 1150, y: 560 } },
  { id: "market", missionId: "two-kinds-of-trouble", x: 1340, y: 240, w: 240, h: 200, label: { x: 1460, y: 225 }, entry: { x: 1340, y: 460 }, gate: { x: 1344, y: 424 }, block: { x: 1340, y: 468 }, smoke: { x: 1470, y: 340 } },
  { id: "old-town", missionId: "silent-failure", x: 1300, y: 770, w: 260, h: 220, label: { x: 1430, y: 755 }, entry: { x: 1430, y: 720 }, gate: { x: 1312, y: 822 }, block: { x: 1430, y: 764 }, smoke: { x: 1490, y: 850 } }
];
function Mr(n) {
  const s = zt.find((l) => l.id === n);
  if (s === void 0) throw new Error(`unknown district ${n}`);
  return s;
}
const Nf = { x: Os.door.x, y: Qa }, iy = {
  "station-row": "M195 720 H510",
  bridge: "M195 720 H600",
  lab: "M195 720 H920 Q940 720 940 700 V460",
  central: "M195 720 H1150",
  market: "M195 720 H1320 Q1340 720 1340 700 V460",
  "old-town": "M195 720 H1430"
}, ly = ["M150 720 H1560", "M195 700 V720", "M940 720 V440", "M1340 720 V440"];
function oy({ states: n, showSelection: s = !0 }) {
  const l = Object.values(n).some((a) => a === "solved");
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: Zr, height: Vt, fill: m.sky }),
    /* @__PURE__ */ i.jsx("path", { d: `M0 ${String(Vt)} Q200 110 420 ${String(Vt - 20)} T840 ${String(Vt - 10)} T1260 ${String(Vt - 30)} T1600 ${String(Vt - 6)} V${String(Vt + 40)} H0 Z`, fill: m.grassDark }),
    /* @__PURE__ */ i.jsx(Va, { x: 0, y: Vt + 30, width: Zr, height: Br - Vt - 30 }),
    /* @__PURE__ */ i.jsx(ja, { x: 260, y: 80, size: 0.9 }),
    /* @__PURE__ */ i.jsx(ja, { x: 1180, y: 70, size: 1.1 }),
    /* @__PURE__ */ i.jsx(ja, { x: 1480, y: 110, size: 0.7 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 300, cy: 880, rx: 200, ry: 70 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 1140, cy: 900, rx: 160, ry: 50 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 620, cy: 400, rx: 150, ry: 60 }),
    /* @__PURE__ */ i.jsx(Ih, { d: `M${String(_h)} ${String(Vt + 10)} V${String(Br)}`, width: sy }),
    ly.map((a) => /* @__PURE__ */ i.jsx(Gg, { d: a, width: Rh }, a)),
    /* @__PURE__ */ i.jsx(xt, { x: 240, y: 880 }),
    /* @__PURE__ */ i.jsx(xt, { x: 300, y: 920, size: 0.8 }),
    /* @__PURE__ */ i.jsx(xt, { x: 380, y: 870, size: 1.1 }),
    /* @__PURE__ */ i.jsx(xt, { x: 460, y: 930, size: 0.9 }),
    /* @__PURE__ */ i.jsx(xt, { x: 560, y: 880 }),
    /* @__PURE__ */ i.jsx(xt, { x: 630, y: 340, size: 0.8 }),
    /* @__PURE__ */ i.jsx(xt, { x: 700, y: 420 }),
    [320, 560, 860, 1240, 1520].map((a) => /* @__PURE__ */ i.jsx(ey, { x: a, y: Qa + 50, lit: l }, a)),
    /* @__PURE__ */ i.jsx(Kg, { x: Os.x + Os.w / 2, y: Os.y + Os.h, open: !0 }),
    zt.map((a) => /* @__PURE__ */ i.jsx(ay, { box: a, state: n[a.id], showSelection: s }, a.id))
  ] });
}
function ay({ box: n, state: s, showSelection: l }) {
  const a = s === "solved";
  return /* @__PURE__ */ i.jsxs("g", { "data-district": n.id, "data-state": s, children: [
    s === "selected" && l ? /* @__PURE__ */ i.jsx("rect", { x: n.x - 8, y: n.y - 8, width: n.w + 16, height: n.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.25, stroke: m.highlight, strokeWidth: Q * 2, strokeDasharray: "14 8" }) : null,
    /* @__PURE__ */ i.jsx(cy, { id: n.id, box: n, solved: a }),
    s === "available" || s === "selected" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Lh, { x: n.smoke.x, y: n.smoke.y, scale: 0.9 }),
      /* @__PURE__ */ i.jsx(ty, { x: n.gate.x, y: n.gate.y })
    ] }) : null,
    s === "locked" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(ry, { x: n.x, y: n.y, width: n.w, height: n.h }),
      /* @__PURE__ */ i.jsx(ny, { x: n.block.x, y: n.block.y })
    ] }) : null
  ] });
}
function cy({ id: n, box: s, solved: l }) {
  const a = l ? { kind: "restored" } : { kind: "normal" }, u = s.y + s.h - 20;
  switch (n) {
    case "station-row":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 65, y: u, tint: 0, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 145, y: u, tint: 1, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 225, y: u, tint: 2, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(xt, { x: s.x + 24, y: u + 6, size: 0.7 }) : null
      ] });
    case "bridge":
      return /* @__PURE__ */ i.jsx(Th, { x: _h, y: Qa + Rh / 2 + 2, width: 170 });
    case "lab":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(Eh, { x: s.x + 120, y: u, active: l }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 220, y: u, variant: "small", tint: 5, state: a, scale: 0.8 })
      ] });
    case "central":
      return /* @__PURE__ */ i.jsx("g", { children: [0, 1, 2].map(
        (f) => [0, 1, 2].map((p) => /* @__PURE__ */ i.jsx(Ue, { x: s.x + 70 + p * 82, y: s.y + 92 + f * 70, tint: (f * 3 + p) % 6, state: a, scale: 0.62 }, `${String(f)}-${String(p)}`))
      ) });
    case "market":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 80, y: u, variant: "shop", tint: 2, state: a, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 182, y: u, variant: "shop", tint: 4, state: a, scale: 0.9 }),
        l ? /* @__PURE__ */ i.jsx(xt, { x: s.x + 24, y: u - 60, size: 0.7 }) : null
      ] });
    case "old-town":
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx(jl, { x: s.x + 60, y: u + 4, lit: l }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 152, y: u, variant: "tall", tint: 3, state: a }),
        /* @__PURE__ */ i.jsx(Ue, { x: s.x + 232, y: u, variant: "tall", tint: 5, state: a })
      ] });
  }
}
const Dr = 100;
function Oh(n, s, l) {
  return { x: n.x + l * Dr, y: n.y + s * Dr };
}
const uy = 32, Ef = 30;
function Mh(n, s, l, a) {
  const u = Oh(n, l, a);
  return { q: s, row: l, col: a, x: u.x, y: u.y + uy };
}
function Ra(n, s, l, a, u) {
  const f = Oh(n, a, u);
  return { id: s, type: l, row: a, col: u, x: f.x, y: f.y + Ef, lamp: { x: f.x, y: f.y + Ef - 44 } };
}
const Sa = { x: 100, y: 110 }, dy = [
  { id: "Z0", type: "Z", row: 0.5, col: 0.5 },
  { id: "Z1", type: "Z", row: 1.5, col: 1.5 },
  { id: "Z2", type: "Z", row: -0.5, col: 1.5 },
  { id: "Z3", type: "Z", row: 2.5, col: 0.5 },
  { id: "X0", type: "X", row: 0.5, col: 1.5 },
  { id: "X1", type: "X", row: 1.5, col: 0.5 },
  { id: "X2", type: "X", row: 0.5, col: -0.5 },
  { id: "X3", type: "X", row: 1.5, col: 2.5 }
], Ph = {
  kind: "rsc3",
  width: 400,
  height: 420,
  origin: Sa,
  houses: [0, 1, 2].flatMap((n) => [0, 1, 2].map((s) => Mh(Sa, n * 3 + s, n, s))),
  detectors: dy.map((n) => Ra(Sa, n.id, n.type, n.row, n.col))
}, il = { x: 100, y: 110 }, $h = {
  kind: "rep3",
  width: 400,
  height: 200,
  origin: il,
  houses: [0, 1, 2].map((n) => Mh(il, n, 0, n)),
  detectors: [Ra(il, "Z0", "Z", 0, 0.5), Ra(il, "Z1", "Z", 0, 1.5)]
};
function fy({ layout: n }) {
  const s = n.origin, l = n.kind === "rsc3" ? 3 : 1, a = 3, u = [];
  for (let f = 0; f < l; f++) u.push(`M${De(s.x - 60)} ${De(s.y + f * Dr + 40)} H${De(s.x + (a - 1) * Dr + 60)}`);
  if (l > 1) for (let f = 0; f < a; f++) u.push(`M${De(s.x + f * Dr + 50)} ${De(s.y - 60)} V${De(s.y + (l - 1) * Dr + 60)}`);
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Va, { width: n.width, height: n.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: n.width * 0.12, cy: n.height * 0.9, rx: n.width * 0.14, ry: n.height * 0.06 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: n.width * 0.9, cy: n.height * 0.1, rx: n.width * 0.12, ry: n.height * 0.05 }),
    u.map((f) => /* @__PURE__ */ i.jsx(Jg, { d: f, width: 10 }, f)),
    /* @__PURE__ */ i.jsx(xt, { x: n.width - 28, y: n.height - 16, size: 0.7 }),
    n.kind === "rsc3" ? /* @__PURE__ */ i.jsx(xt, { x: 30, y: 56, size: 0.6 }) : null
  ] });
}
function hy({ from: n, to: s }) {
  return /* @__PURE__ */ i.jsx("g", { children: s.map((l, a) => /* @__PURE__ */ i.jsx("line", { x1: n.x, y1: n.y, x2: l.x, y2: l.y - 40, stroke: m.highlight, strokeWidth: Q * 1.6, strokeLinecap: "round", strokeDasharray: "10 7" }, a)) });
}
function py({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("ellipse", { cx: n + 6, cy: s + 2, rx: 40, ry: 14, fill: m.highlight, fillOpacity: 0.35 });
}
function my({ geometry: n }) {
  const s = n;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(Va, { width: s.width, height: s.height, rx: 18 }),
    /* @__PURE__ */ i.jsx(Ih, { d: `M30 ${De(s.height - 30)} Q${De(s.width / 2)} ${De(s.height - 70)} ${De(s.width - 30)} ${De(s.height - 30)}`, width: 34 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: 40, cy: 40, rx: 50, ry: 20 }),
    /* @__PURE__ */ i.jsx(Jn, { cx: s.width - 40, cy: 40, rx: 50, ry: 20 }),
    Array.from({ length: s.lanes }, (l, a) => /* @__PURE__ */ i.jsx(gy, { y: s.laneY(a), x1: s.inX - 40, x2: s.outX + 40 }, a))
  ] });
}
function gy({ y: n, x1: s, x2: l }) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { x: s, y: n - 12, width: l - s, height: 24, rx: 4, fill: m.wallStone, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("line", { x1: s + 6, y1: n - 16, x2: l - 6, y2: n - 16, stroke: m.roofSlate, strokeWidth: 3 }),
    Array.from({ length: Math.floor((l - s) / 30) }, (a, u) => s + 15 + u * 30).map((a) => /* @__PURE__ */ i.jsx("line", { x1: a, y1: n - 12, x2: a, y2: n + 12, stroke: m.ink, strokeWidth: 1, opacity: 0.4 }, a))
  ] });
}
function yy({ geometry: n }) {
  const s = n;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("rect", { width: s.width, height: s.height, rx: 18, fill: m.wallPowder }),
    /* @__PURE__ */ i.jsxs("g", { stroke: m.paper, strokeWidth: 1.5, children: [
      Array.from({ length: Math.ceil(s.width / 50) }, (l, a) => /* @__PURE__ */ i.jsx("line", { x1: a * 50, y1: 0, x2: a * 50, y2: s.height }, `v${String(a)}`)),
      Array.from({ length: Math.ceil(s.height / 50) }, (l, a) => /* @__PURE__ */ i.jsx("line", { x1: 0, y1: a * 50, x2: s.width, y2: a * 50 }, `h${String(a)}`))
    ] }),
    Array.from({ length: s.lanes }, (l, a) => /* @__PURE__ */ i.jsxs("g", { children: [
      /* @__PURE__ */ i.jsx("rect", { x: s.inX - 40, y: s.laneY(a) - 11, width: s.outX - s.inX + 80, height: 22, rx: 11, fill: m.inkSoft, stroke: m.ink, strokeWidth: Q }),
      /* @__PURE__ */ i.jsx("line", { x1: s.inX - 24, y1: s.laneY(a), x2: s.outX + 24, y2: s.laneY(a), stroke: m.paper, strokeWidth: 2, strokeDasharray: "6 10" })
    ] }, a))
  ] });
}
function xy({ x: n, controlY: s, targetY: l, active: a = !1 }) {
  const u = a ? m.highlight : m.ink;
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: s, x2: n, y2: l, stroke: u, strokeWidth: Q * 2 }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: s, r: 10, fill: u }),
    /* @__PURE__ */ i.jsx("circle", { cx: n, cy: l, r: 16, fill: m.paper, stroke: u, strokeWidth: Q * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n - 10, y1: l, x2: n + 10, y2: l, stroke: u, strokeWidth: Q * 1.4 }),
    /* @__PURE__ */ i.jsx("line", { x1: n, y1: l - 10, x2: n, y2: l + 10, stroke: u, strokeWidth: Q * 1.4 })
  ] });
}
function wy({ active: n = !1, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 18, fill: n ? m.alarmRing : m.wallButter, stroke: m.ink, strokeWidth: Q }),
    /* @__PURE__ */ i.jsx("path", { d: "M0 0 L0 -13", stroke: m.ink, strokeWidth: 3, strokeLinecap: "round" }),
    /* @__PURE__ */ i.jsx("circle", { cx: 0, cy: 0, r: 3, fill: m.ink }),
    /* @__PURE__ */ i.jsx("text", { x: 0, y: 13, textAnchor: "middle", fontSize: 11, fontWeight: 800, fill: m.ink, fontFamily: nr, style: { userSelect: "none" }, children: "S" })
  ] });
}
function ba({ letter: n, ...s }) {
  return /* @__PURE__ */ i.jsxs(Oe, { ...s, children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: 0, cy: 2, rx: 18, ry: 5, fill: m.shadow }),
    /* @__PURE__ */ i.jsx(cn, { letter: n, x: 0, y: 0, scale: 0.5 })
  ] });
}
const ky = { x0: 40, y0: 108, x1: 496, y1: 448 }, vy = "Q11 Emergency mark: the red fire truck with Q11 painted in white on its side and a red X flame and a blue Z flame side by side above it";
function jy({ lettering: n = "Q11" } = {}) {
  return /* @__PURE__ */ i.jsxs("g", { children: [
    /* @__PURE__ */ i.jsx(cn, { letter: "X", x: 150, y: 240, scale: 1.4 }),
    /* @__PURE__ */ i.jsx(cn, { letter: "Z", x: 262, y: 240, scale: 1.4 }),
    /* @__PURE__ */ i.jsx(Ya, { x: 256, y: 440, scale: 3, lettering: n })
  ] });
}
function Sy({ size: n = 72, label: s, lettering: l, fluid: a = !1, crop: u = !1 }) {
  const f = ky, p = a || u, g = f.x1 - f.x0, y = f.y1 - f.y0, w = p ? `${String(f.x0)} ${String(f.y0)} ${String(g)} ${String(y)}` : "0 0 512 512", b = a ? "100%" : u ? Math.round(n * g / y) : n;
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      width: b,
      height: a ? void 0 : n,
      viewBox: w,
      role: "img",
      "aria-label": s ?? vy,
      focusable: "false",
      style: a ? { display: "block", height: "auto" } : { display: "block" },
      children: /* @__PURE__ */ i.jsx(jy, { lettering: l })
    }
  );
}
function by({ filled: n, size: s = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: n ? "star is-filled" : "star", children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z", fill: n ? "var(--alarm)" : "var(--panel)", stroke: "var(--outline)", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function Ka({ size: n = 22 }) {
  return /* @__PURE__ */ i.jsx("svg", { width: n, height: n, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function Cf({ size: n = 72, label: s, lettering: l, fluid: a, crop: u }) {
  return /* @__PURE__ */ i.jsx(Sy, { size: n, label: s, lettering: l, fluid: a ?? !1, crop: u ?? !1 });
}
const Ah = {
  /* ------------------------------------------------------------------ app / document titles */
  "app.name": "Q11 Emergency",
  /** What is painted on the brand-mark truck: "Q11" (from 911) in English, "11Q" (from 119) in Japanese. */
  "app.lettering": "Q11",
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
  "title.how": "How it works",
  "title.settings": "Settings",
  "title.progress": "Progress: {stars} of {max} stars.",
  "title.foot": "Qollab × IonQ Global Quantum Hackathon 2026 entry. This effort is supported by Qollab & IonQ.",
  "title.kidLine": "Fires you cannot see. Alarms you can. Send the right crew!",
  "title.language": "Language: {lang}",
  /* ------------------------------------------------------------------ how it works */
  "how.title": "How it works",
  "how.intro": "Q11 Emergency is a fire-dispatch story about quantum error correction. Nothing here is about real fires or real firefighting: every fire, alarm and crew is a piece of quantum algebra wearing a costume.",
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
  "briefing.back": "Back to briefing",
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
  /* propagation prelude (lane boards): the fires travel through the gates before the trucks arrive */
  "spray.firesStart": "The fire starts here: {list}.",
  "spray.firesStart.none": "No fire at the start.",
  "spray.gate.cnotBoth": "Through the coupler: the {red} fire copies forward onto house {t} and the {blue} fire copies backward onto house {c}.",
  "spray.gate.cnotForward": "Through the coupler: the {red} fire copies forward onto house {t}.",
  "spray.gate.cnotBackward": "Through the coupler: the {blue} fire copies backward onto house {c}.",
  "spray.gate.cnotNone": "Through the coupler: nothing to copy, the fires pass unchanged.",
  "spray.gate.h": "The mirror machine on house {q} swaps {red} and {blue}.",
  "spray.gate.hNone": "The mirror machine on house {q}: nothing changes here.",
  "spray.gate.s": "The dial on house {q}: the {red} fire picks up a {blue} part.",
  "spray.gate.sDrop": "The dial on house {q}: the {mixed} fire drops its {blue} part.",
  "spray.gate.sNone": "The dial on house {q}: nothing changes here.",
  "spray.gate.generic": "{gate}: {before} becomes {after}.",
  "spray.gate.genericNone": "{gate}: the fire pattern {before} is unchanged.",
  "spray.gateName.h": "H on house {q}",
  "spray.gateName.s": "S on house {q}",
  "spray.gateName.cnot": "CNOT from house {c} to house {t}",
  "spray.gateName.cz": "CZ between houses {a} and {b}",
  "spray.gateName.swap": "SWAP of houses {a} and {b}",
  "spray.firesArrive": "The fires reach the houses: {list}.",
  "spray.firesArrive.none": "No fire reaches the houses.",
  "spray.list.and": "{a} and {b}",
  "spray.list.comma": "{a}, {b}",
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
  "a11y.backToTitle": "Q11 Emergency — back to title",
  "a11y.cityBackToTitle": "Q11 Emergency — back to title",
  "a11y.backToCity": "Q11 Emergency — back to the city map",
  "a11y.langPill": "Language: EN / JA, switch to {lang}",
  "a11y.alarmsAndCrews": "Alarms and crews",
  "a11y.tutorialSteps": "First call: three steps",
  "a11y.dismissNotice": "Dismiss notice",
  "a11y.q11mark": "Q11 Emergency mark: the red fire truck with Q11 painted on its side and a red X flame and a blue Z flame above it",
  "a11y.wires.start": "start",
  "a11y.wires.end": "end",
  "a11y.stationRinging": "{station}, ringing, watches houses {list}",
  "a11y.stationQuiet": "{station}, quiet, watches houses {list}",
  "a11y.fogHouse": "House {q}, hidden",
  "a11y.pressToPredict": "press to predict this house burns next",
  "a11y.screen.title": "Q11 Emergency title screen.",
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
}, Ny = {
  /* ------------------------------------------------------------------ app / document titles */
  "app.name": "11Q Emergency",
  "app.lettering": "11Q",
  "app.tagline": "量子エラー訂正の消防ゲーム",
  "doc.title": "{app} — 量子エラー訂正の消防ゲーム",
  "doc.how": "{app} — あそび方",
  "doc.settings": "{app} — 設定",
  "doc.city": "{app} — 街の地図",
  "doc.missions": "{app} — ミッション",
  "doc.summary": "{app} — 任務完了",
  "doc.mission": "{app} — ミッション {n} · {title}",
  /* ------------------------------------------------------------------ title screen */
  "title.heading": "量子エラー訂正の消防ゲーム",
  "title.lead": "火は見えない。でも警報は聞こえる。警報を読んで隊を送り、量子の街を守ろう。",
  "title.play": "あそぶ",
  "title.continue": "つづきから",
  "title.how": "あそび方",
  "title.settings": "設定",
  "title.progress": "進み具合：星 {stars} / {max}",
  "title.foot": "Qollab × IonQ Global Quantum Hackathon 2026 参加作品。This effort is supported by Qollab & IonQ.",
  "title.kidLine": "見えない火事、聞こえる警報。正しい隊を送ろう！",
  "title.language": "言語：{lang}",
  /* ------------------------------------------------------------------ how it works */
  "how.title": "あそび方",
  "how.intro": "11Q Emergency は、量子エラー訂正のしくみを消防隊の物語にしたゲームです。本物の火事や消防の話ではありません。火も警報も隊も、すべて量子の計算が着ぐるみを着た姿です。",
  "how.houses.term": "家",
  "how.houses.desc": "量子ビット (qubit) です。家の番号が、量子ビットの番号です。",
  "how.fires.term": "火",
  "how.fires.desc": "放火犯「ノイズ」がつけるパウリエラー (Pauli error) です。赤 = X、青 = Z、赤と青の半分ずつ = Y（X と Z が同時）。",
  "how.alarms.term": "警報ステーション",
  "how.alarms.desc": "家と家の間に立つスタビライザー検査（パリティ検査）です。ひし形の Z ステーションは、見守っている家のうち赤い火 (X か Y) が奇数個のときに鳴ります。四角の X ステーションは、青い火 (Z か Y) が奇数個のときに鳴ります。火が近くにあるだけでは鳴らず、どの家が燃えているかも教えてくれません。",
  "how.crews.term": "隊",
  "how.crews.desc": "訂正 (correction) です。赤い火に赤い隊を送ると、火が消えます (X·X = I)。燃えていない家に赤い隊を送ると、赤い火がついてしまいます。火と隊は XOR で重なります。「たくさん送れば安心」ではありません。",
  "how.gates.term": "ゲート",
  "how.gates.desc": "火はゲートを通るときだけ動きます。CNOT は赤を前へ（制御 → 標的）、青を後ろへ（標的 → 制御）コピーします。H は自分の線の赤と青を入れかえます。",
  "how.verdict.term": "判定",
  "how.verdict.desc": "放水のあと、残った成分 R = 隊 ⊕ 火 を符号の計算で判定します。R がスタビライザー (stabilizer) なら「論理量子ビットは安全」。警報が全部静かでも、R が論理演算子としてはたらくなら「静かな失敗」。どこかのステーションがまだ鳴っていれば「火はまだ燃えている」。警報が静かなだけでは、安全の証明にはなりません。",
  "how.controls": "操作",
  "how.controls.tap": "家をタップすると、選んだ隊を送ります。もう一度タップすると呼びもどします。「放水！」を押すまで、何も起こりません。",
  "how.controls.keyboard": "キーボード（出動画面にフォーカスがあるとき）：1 / 2 / 3 で X / Z / Y 隊を選ぶ、矢印キーで家や隊の色を移動、Enter か Space で隊を置く・もどす、Backspace でフォーカス中の家の隊をもどす（家にフォーカスがなければ全部もどす）、C で放水。",
  "how.controls.stars": "星：いちばん少ない隊で成功すると 3、隊を余分に使って成功すると 2、勝てないミッションで正しい判断をしたとき（または隊を 1 つ以上送っておしかったとき）は 1。火が残っているのに待機すると 0。ミッション 6 の星は最大 1 なので、合計は 16 です。",
  "how.controls.sound": "音は、自分でオンにするまで鳴りません。動きは OS の設定と「設定」のスイッチにしたがいます。",
  "how.model": "モデル：クリフォード + パウリの教育用シミュレーションで、シンドローム (syndrome) は完全に読めると仮定しています。反復符号は X ノイズだけの入門、メインの地区は距離 3 の回転表面符号 (rotated surface code) です。",
  "how.quantumRules": "同じ隊なら火は消える。ちがう隊なら火は変わる。燃えていない家に隊を送ると火がつく。これが量子のルール！",
  "how.back": "もどる",
  "how.kid.intro": "この街では、見えない火事が起きています。どこかが燃えていることは、警報ステーションが教えてくれます。隊を送って、火を消しましょう。じつはこれ、量子コンピュータがまちがいを直すしくみのゲームです。",
  "how.kid.legend": "絵の意味",
  "how.kid.houses": "家は量子ビット。量子の小さな記憶のかけらです。",
  "how.kid.fires": "火はまちがい。赤が X、青が Z、両方いっしょなら Y。出動中は火が見えません。",
  "how.kid.alarms": "警報ステーションは、それぞれいくつかの家を見守っています。ひし形は赤い火、四角は青い火で鳴ります。鳴るのは火が奇数個（1 つ、3 つ…）のときだけで、どの家かは教えてくれません。",
  "how.kid.crews": "隊は直す力。火と同じ文字なら、火は消えます。ちがう文字なら、火は変わります。燃えていない家に送ると、新しい火がつきます。",
  "how.kid.gates": "ゲートが火を線にそって運びます。火がひとりで動くことはありません。",
  "how.kid.water": "水は、うすい色の丸いしずく。青い Z の火は、Z の文字がついた炎。まったく別のものです。",
  "how.kid.spray": "放水！のあとは本当の火が見えるので、作戦を答え合わせできます。本物の量子コンピュータは、のぞき見できません。",
  /* ------------------------------------------------------------------ city map */
  "city.title": "量子の街",
  "city.subtitle": "けむりが出ている地区をタップしよう。",
  "city.map": "街の地図",
  "city.hud.stars": "星 {stars} / {max}",
  "city.hud.solved": "安全な地区 {solved} / {total}",
  "city.hud.freeRoam": "自由選択",
  "city.hud.freeRoamOn": "自由選択がオン：すべての地区に行けます。",
  "city.hud.storage.local": "進み具合はこのブラウザに保存されます。",
  "city.hud.storage.memory": "進み具合は、このページを開いている間だけ残ります。",
  "city.hud.storage.qollab": "Qollab では、進み具合は 1 回の Run の間だけ残ります。",
  "city.status.locked": "まだ行けない",
  "city.status.available": "火事発生",
  "city.status.selected": "選択中",
  "city.status.solved": "安全",
  "city.status.replay": "もう一度あそぶ",
  "city.locked.hint": "地区は順番に開きます。つぎは{district}です。",
  "city.select.goal": "通報",
  "city.select.lesson": "ここで学べること",
  "city.dispatch": "出動！",
  "city.redispatch": "もう一度出動",
  "city.truck.travel": "消防車が{district}へ向かっています…",
  "city.truck.arrived": "消防車が{district}に着きました。",
  "city.truck.skip": "移動をスキップ",
  "city.restored": "{district}は安全になりました。けむりが晴れて、灯りがもどります。",
  "city.badge": "{district}のバッジを獲得",
  "city.allSafe": "すべての地区が安全になりました。街がもどってきました！",
  "city.station": "消防署",
  "city.aria.map": "街の地図。それぞれの地区がボタンです。",
  "city.aria.district": "{name}、{status}",
  "city.aria.districtStars": "{name}、{status}、星 {stars} / {max}",
  "city.aria.mission": "{n} {name} — {status}、{stars}",
  "city.aria.truck": "消防車",
  "city.badges": "バッジ",
  "city.badgeToast": "{badge}を獲得！",
  "city.badgeOf": "バッジ：{badge}",
  "city.badgeName.firstAlarm": "警報の達人",
  "city.badgeName.redForwardBlueBackward": "ゲート追跡係",
  "city.badgeName.colorSwitch": "色がえ名人",
  "city.badgeName.blindDispatch": "見えない火の指令官",
  "city.badgeName.twoKindsOfTrouble": "2 色の隊長",
  "city.badgeName.silentFailure": "調査官",
  "city.select.best": "ベスト記録",
  "city.select.none": "まだ地区を選んでいません。",
  /* ------------------------------------------------------------------ briefing */
  "briefing.subtitle": "作戦説明",
  "briefing.goal": "今回の通報",
  "briefing.lesson": "ここで学べること",
  "briefing.district": "地区",
  "briefing.crews": "隊",
  "briefing.budget": "使える隊",
  "briefing.budget.one": "1 隊",
  "briefing.budget.other": "{n} 隊",
  "briefing.previousBest": "ベスト記録",
  "briefing.upTo": "（最大 {n}）",
  "briefing.startTraining": "訓練をはじめる",
  "briefing.start": "はじめる",
  "briefing.skipToDispatch": "訓練をとばして出動",
  "briefing.go": "いくぞ！",
  "briefing.back": "作戦説明にもどる",
  /* ------------------------------------------------------------------ training */
  "training.subtitle": "訓練 · レッスン {n} / {total} · 火が見える",
  "training.board": "訓練ボード（火が見えています）",
  "training.boardLabel": "訓練ボード",
  "training.start": "スタート：",
  "training.afterGate": "ゲート {n} / {total} のあと：",
  "training.lesson": "レッスン",
  "training.lessons": "レッスン一覧",
  "training.lessonLabel": "レッスン {n}：{fires}",
  "training.prev": "もどる",
  "training.nextStep": "つぎへ",
  "training.nextLesson": "つぎのレッスン",
  "training.startDispatch": "出動する",
  "training.skip": "訓練をとばして出動",
  "training.firesVisible": "火が見える",
  "training.predict": "まず予想してみよう。このゲートのあと、火はどこにある？",
  "training.check": "たしかめる",
  "training.predictTap": "つぎに燃えるのはどの家？ タップしよう！",
  "training.predict.hit": "正解！ このゲートのあと、家 {q} が燃えます。",
  "training.predict.miss": "今回はちがいました。家 {q} は燃えません。火がどこへ行くか見てみよう。",
  "training.predict.waiting": "家をタップすると、つぎのステップが見られます。",
  /* ------------------------------------------------------------------ challenge (planning) */
  "challenge.subtitle.dispatch": "出動 · 火は見えない、警報は読める",
  "challenge.subtitle.predict": "出動 · 火がどこに着くか予想しよう",
  "challenge.board": "出動ボード",
  "challenge.startingFire": "はじめの火：{fires}。火は回路を通って動きます。着く先に隊を送ろう。",
  "challenge.startToken": "q{q} に {letter}",
  "challenge.tapHint": "家をタップすると、選んだ隊を送ります。もう一度タップすると呼びもどします。",
  "challenge.fog": "火は見えません。読めるのは警報だけです。",
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
  "challenge.standDown.body": "隊を 1 つも送らずに確定しようとしています。燃えている火は、そのまま燃えつづけます。",
  "challenge.standDown.confirm": "待機する",
  "challenge.standDown.cancel": "出動をつづける",
  "challenge.detector.hint": "ステーションをタップすると、見守っている家がわかります。",
  "challenge.detector.watches": "{station} は家 {list} を見守っています。",
  /* ------------------------------------------------------------------ planning stage */
  "plan.title": "作戦",
  "plan.hint": "ここで作戦を立てます。「放水！」を押すまで、何も起こりません。",
  "plan.undo": "もどす",
  "plan.redo": "やり直す",
  "plan.clear": "全部もどす",
  "plan.preview": "プレビュー",
  "plan.previewOn": "プレビュー オン",
  "plan.previewOff": "プレビュー オフ",
  "plan.previewHint": "プレビュー：隊がどこに放水するかを見せます。",
  "plan.empty": "まだ隊を置いていません。",
  /* ------------------------------------------------------------------ first-run tutorial (three taps) */
  "tutorial.title": "はじめての通報",
  "tutorial.intro": "3 回タップすれば、家は安全。準備はいい？",
  "tutorial.step1": "隊を選ぶ",
  "tutorial.step1.body": "赤い隊 (X) は赤い火を消します。赤い隊をタップしよう。",
  "tutorial.step2": "家をタップ",
  "tutorial.step2.body": "警報が 2 つ鳴っています。両方が見守っている家をタップしよう。",
  "tutorial.step3": "放水！",
  "tutorial.step3.body": "「放水！」を押して、水が飛ぶのを見よう。",
  "tutorial.done": "やったね！ 家は安全になり、街の灯りがもどりました。",
  "tutorial.hint": "ヒント",
  "tutorial.showHint": "ヒントを見る",
  "tutorial.skip": "チュートリアルをとばす",
  "tutorial.replay": "チュートリアルをもう一度",
  "tutorial.beginnerLabel": "はじめての人へ",
  /* ------------------------------------------------------------------ dispatch (spray showpiece) */
  "dispatch.subtitle": "出動 · 放水中",
  "dispatch.answerCheck": "訓練リプレイ：答え合わせ",
  "dispatch.answerCheck.note": "ここでは本当の火を見せて、作戦を答え合わせします。本物の量子コンピュータは、火を直接見ることができません。",
  "dispatch.skip": "スキップ",
  "dispatch.watchAgain": "もう一度見る",
  "dispatch.why": "なぜ？",
  "dispatch.continue": "つづける",
  "dispatch.step": "ステップ {n} / {total}",
  "dispatch.aria.player": "放水リプレイ",
  "spray.trucksArrive": "消防車が{district}に着きました。",
  "spray.crewsRunning": "隊員が家へ走ります…",
  "spray.crewRun": "{crew} 隊が家 {q} へ走ります。",
  "spray.waterOn": "放水開始！",
  "spray.sprayStart": "{crew} 隊が家 {q} に放水します。",
  "spray.splash": "ザバーン！",
  "spray.extinguished": "家 {q}：火が消えました。",
  "spray.changed": "家 {q}：{before} の火が {after} の火に変わりました。",
  "spray.ignited": "家 {q}：{after} の火がつきました。この家は燃えていなかったのです。",
  "spray.revealRemaining": "まだ燃えているのはここです。",
  "spray.alarms": "警報をもう一度読みます。",
  "spray.done": "全隊、報告完了。",
  /* 伝わり方の前置き（線路ボード）：消防車が来る前に、火がゲートを通って進む */
  "spray.firesStart": "火はここから始まります：{list}。",
  "spray.firesStart.none": "はじめは火がありません。",
  "spray.gate.cnotBoth": "連結器を通ると、{red} の火は前へ家 {t} に、{blue} の火は後ろへ家 {c} にコピーされます。",
  "spray.gate.cnotForward": "連結器を通ると、{red} の火は前へ家 {t} にコピーされます。",
  "spray.gate.cnotBackward": "連結器を通ると、{blue} の火は後ろへ家 {c} にコピーされます。",
  "spray.gate.cnotNone": "連結器を通ります。コピーするものはなく、火はそのまま進みます。",
  "spray.gate.h": "家 {q} の鏡の機械が、{red} と {blue} を入れかえます。",
  "spray.gate.hNone": "家 {q} の鏡の機械：ここでは何も変わりません。",
  "spray.gate.s": "家 {q} のダイヤル：{red} の火に {blue} の成分が加わります。",
  "spray.gate.sDrop": "家 {q} のダイヤル：{mixed} の火から {blue} の成分が消えます。",
  "spray.gate.sNone": "家 {q} のダイヤル：ここでは何も変わりません。",
  "spray.gate.generic": "{gate}：{before} が {after} になります。",
  "spray.gate.genericNone": "{gate}：火のパターン {before} は変わりません。",
  "spray.gateName.h": "家 {q} の H",
  "spray.gateName.s": "家 {q} の S",
  "spray.gateName.cnot": "家 {c} から家 {t} への CNOT",
  "spray.gateName.cz": "家 {a} と家 {b} の CZ",
  "spray.gateName.swap": "家 {a} と家 {b} の SWAP",
  "spray.firesArrive": "火が家に着きました：{list}。",
  "spray.firesArrive.none": "家に着く火はありません。",
  "spray.list.and": "{a} と {b}",
  "spray.list.comma": "{a}、{b}",
  "spray.quantumRules": "同じ隊なら火は消える。ちがう隊なら火は変わる。燃えていない家に隊を送ると火がつく。これが量子のルール！",
  "spray.oneShot": "放水 1 回が訂正 1 回です。長くかけても、2 回かけても、それ以上は何も起こりません。",
  /* ------------------------------------------------------------------ results (four types + beacon) */
  "result.subtitle": "結果",
  "result.heading.flawless": "みごとな出動",
  "result.heading.firesOut": "火は消えた",
  "result.heading.unlucky": "正しい判断、でも運が悪かった",
  "result.heading.lucky": "まぐれ当たり",
  "result.heading.close": "おしい",
  "result.heading.stoodDown": "出動せず",
  "result.heading.off": "はずれ",
  "result.starsOf.one": "星 {stars} / 1",
  "result.starsOf.other": "星 {stars} / {max}",
  "result.maxOne": "このミッションの星は最大 1 つ。警報だけでは勝てないからです。",
  "result.decision": "判断",
  "result.outcome": "結果",
  "result.cost": "コスト",
  "result.costText.one": "使った隊 1 · 最小 {min}",
  "result.costText.other": "使った隊 {used} · 最小 {min}",
  "result.attempts": "挑戦回数",
  "result.next": "つぎの地区へ",
  "result.summary": "まとめ",
  "result.tryAgain": "もう一度",
  "result.city": "街にもどる",
  "result.investigationComplete": "調査完了",
  "result.quality.optimal": "最適な判断",
  "result.quality.valid": "成功、でも隊を多く使った",
  "result.quality.unlucky": "最適な判断、でも運が悪かった",
  "result.quality.lucky": "まぐれ当たり — 警報からは決められなかった",
  "result.quality.off": "はずれ",
  "result.outcome.success": "論理量子ビットは安全",
  "result.outcome.logicalError": "静かな失敗 — 論理量子ビットが反転",
  "result.outcome.detectable": "火はまだ燃えている",
  "result.outcome.propagationMiss": "予想がはずれ — 線の上に火が残った",
  "result.type.restored.title": "火は消え、家はもどった",
  "result.type.restored.body": "何も残っていません。しまってある量子の情報は無事です。",
  "result.type.safePattern.title": "安全なパターン",
  "result.type.safePattern.body": "何かが残っていますが、符号が気にしない無害なパターン（スタビライザー）です。しまってある情報は無事です。",
  "result.type.safePattern.details": "残差（そのまま）：{residual}",
  "result.type.stillBurning.title": "まだ燃えている",
  "result.type.stillBurning.body": "火が残っていて、その警報が鳴っています。どのステーションが鳴っているか見て、もう一度やってみよう。",
  "result.type.logicalFailure.title": "静かな失敗",
  "result.type.logicalFailure.body": "警報はすべて静かですが、記憶の塔のランプが反転を知らせています。残ったパターンが、しまってある情報を変えてしまいました。",
  "result.type.predictionMiss.title": "予想がはずれた",
  "result.type.predictionMiss.body": "線の上に火が残っています。むき出しの線には符号も警報もないので、残った火はそのまま情報にはたらきます。",
  "result.startBadge": "スタート",
  "result.beacon.title": "記憶の塔のランプ",
  "result.beacon.ok": "記憶の塔のランプは安定：しまってある情報はそのままです。",
  "result.beacon.logicalX": "記憶の塔のランプ：論理 X が反転",
  "result.beacon.logicalZ": "記憶の塔のランプ：論理 Z が反転",
  "result.beacon.logicalXZ": "記憶の塔のランプ：論理 X と Z が反転",
  "result.beacon.pattern": "原因のパターン：{pattern}",
  "result.beacon.note": "ランプは結果のときだけ見えます。プレイ中に読めるのは警報だけです。",
  "result.badge": "バッジ：{district}",
  /* ------------------------------------------------------------------ why panel */
  "why.title": "なぜ？",
  "why.yours": "あなたの放水",
  "why.alternative": "もう一つのやり方",
  "why.decoder": "すべての警報を静かにする、いちばん少ない隊",
  "why.trueFires": "本当の火に合わせた隊",
  "why.trueEnd": "火が本当に着いた場所に合わせた隊",
  "why.identical": "この放水は、この警報に対するいちばん小さな訂正そのものです。",
  "why.identicalWires": "隊は、火が着いた場所にぴったり立っていました。",
  "why.equivalent": "あなたの放水ともう一つのやり方のちがいは、無害なパターンだけ。符号はどちらも同じ訂正とみなします。",
  "why.sameAlarms": "どちらの火のパターンも、まったく同じ警報を鳴らします。",
  "why.cannotDecide": "警報だけでは決められません。",
  "why.compare": "くらべる",
  "why.replayBoth": "両方をリプレイ",
  "why.noBlame": "警報からは、だれにもわかりませんでした。これは学びであって、まちがいではありません。",
  "why.verdict": "→ {verdict}",
  "why.comparison": "なぜ？ あなたの放水と、もう一つのやり方をくらべます",
  /* ------------------------------------------------------------------ debrief (report / replay) */
  "debrief.subtitle": "ふりかえり · すべて公開",
  "debrief.report": "レポート",
  "debrief.trueFires": "本当の火",
  "debrief.startedAs": "はじめの火",
  "debrief.yourCrews": "送った隊",
  "debrief.residual": "残った成分",
  "debrief.residualHouses": "· 家 {list}",
  "debrief.nothingLeft": "· 何も残っていない",
  "debrief.logical": "論理",
  "debrief.logical.preserved": "守られた",
  "debrief.logical.undecided": "まだわからない — 警報が鳴っている",
  "debrief.logical.missed": "はずれ — 家 {houses} に火が残った",
  "debrief.logical.flipped": "反転した（{ops}）",
  "debrief.decision": "判断",
  "debrief.replayBoard": "リプレイボード",
  "debrief.step": "ステップ {n} / {total} · {title}。",
  "debrief.stepTitle.placed": "火がつく",
  "debrief.stepTitle.gate": "ゲート",
  "debrief.stepTitle.alarms": "警報",
  "debrief.stepTitle.dispatch": "出動",
  "debrief.stepTitle.residual": "残った成分",
  "debrief.stepTitle.verdict": "判定",
  "debrief.prev": "もどる",
  "debrief.next": "つぎ",
  "debrief.autoPlay": "自動再生",
  "debrief.whatIf": "もしも",
  "debrief.whatIf.decoder": "この警報に対するいちばん少ない出動：{crews} → {verdict}。",
  "debrief.whatIf.trueFires": "本当の火に合わせた隊：{crews} → 論理量子ビットは安全。",
  "debrief.tryAgain": "もう一度",
  "debrief.result": "結果",
  "debrief.nextMission": "つぎの地区へ",
  "debrief.house.one": "家",
  "debrief.house.other": "家",
  "debrief.stepByStep": "一歩ずつ",
  /* ------------------------------------------------------------------ details fold (jargon lives here) */
  "details.show": "詳細",
  "details.hide": "詳細をとじる",
  "details.title": "詳細 — もっと知りたい人へ",
  "details.residualFormula": "残差 R = C ⊕ E（隊 XOR 火。位相は無視）。",
  "details.stabilizer": "成功：R は符号のスタビライザー (stabilizer、安定化子) なので、符号化された量子ビットには何もしません。",
  "details.logical": "論理エラー：R はすべての検査と可換ですが、スタビライザーではないので、論理演算子 (logical operator) としてはたらきます。",
  "details.detectable": "検出可能：R が少なくとも 1 つの検査と反可換なので、そのステーションがまだ鳴ります。",
  "details.notSyndromeZero": "警報が静かなことは必要条件であって、十分条件ではありません。成功はスタビライザーに入っているかどうかで決まり、「シンドローム = 0」では決まりません。",
  "details.rawResidual": "残差（そのまま）",
  "details.syndrome": "警報ビット",
  "details.code": "符号",
  "details.englishOriginal": "元のレポート（英語）",
  "details.replayEnglish": "リプレイの説明と「もしも」の解説は、英語で生成されます。",
  /* ------------------------------------------------------------------ cloud verification (labels kept) */
  "cloud.title": "量子検証",
  "cloud.intro": "上の判定は、この場で計算したパウリフレームの正確な代数計算の結果です。回路レベルの実行 (Qiskit) には実行した場所のラベルがつき、実際に実行していない結果は決して表示しません。表示されるのは、この出動（{correction}、またはそれと同等の隊）の実行だけです。",
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
  "cloud.analysis.verdict": "パウリフレームの判定",
  "cloud.analysis.prep": "準備 / 読み出し",
  "cloud.analysis.prepValue": "論理 |{prep}⟩ / {basis} 基底",
  /* ------------------------------------------------------------------ settings */
  "settings.title": "設定",
  "settings.close": "設定をとじる",
  "settings.sound": "音",
  "settings.sound.desc": "出動・放水・消火のときに、短くやさしい音が鳴ります。自分でオンにするまで鳴りません。",
  "settings.motion": "動きを減らす",
  "settings.motion.desc": "放水を止め絵にして、1 コマずつ進めます。OS の「視差効果を減らす」設定にも、いつでもしたがいます。",
  "settings.language": "言語 (Language)",
  "settings.language.desc": "英語か日本語。いつでも切りかえられます。",
  "settings.language.en": "English",
  "settings.language.ja": "日本語",
  "settings.language.switchTo": "{lang} に切りかえる",
  "settings.freeRoam": "自由選択",
  "settings.freeRoam.desc": "すべての地区を最初から開きます（復習や審査用）。ふつうは順番に開きます。",
  "settings.progress": "進み具合",
  "settings.storage.local": "進み具合はこのブラウザに保存されます（localStorage、キー {key}）。",
  "settings.storage.memory": "進み具合は、このセッションの間だけメモリに残ります（ここでは Web ストレージが使えません）。",
  "settings.storage.qollab": "Qollab では、進み具合は 1 回の Run の間だけ残ります。サンドボックスには保存場所がないためです。",
  "settings.reset": "進み具合をリセット",
  "settings.resetDialog.title": "進み具合をすべてリセットしますか？",
  "settings.resetDialog.body": "すべての地区の星と挑戦回数が消えます。設定はそのまま残ります。",
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
  "notice.saveReset": "保存データが読めなかったため、リセットしました。",
  "notice.saveMigrated": "保存してあった進み具合を、新しい街に引きつぎました。",
  "notice.dismiss": "とじる",
  /* ------------------------------------------------------------------ summary */
  "summary.title": "任務完了",
  "summary.lead": "すべての地区の記録がそろいました。表面符号の地区では、火が 1 つなら必ず見つけられます。「静かな失敗」で学んだことが、本物の量子コンピュータがもっと大きな符号を使う理由です。",
  "summary.mission": "地区",
  "summary.stars": "星",
  "summary.attempts": "挑戦回数",
  "summary.badges": "バッジ",
  "summary.city": "街にもどる",
  "summary.titleBtn": "タイトル",
  "summary.playAgain": "もう一度あそぶ",
  "summary.freeRoamHint": "好きな地区を好きな順番であそびたいときは、設定で「自由選択」をオンにしよう。",
  /* ------------------------------------------------------------------ mission list / cards (legacy + city) */
  "mission.label": "ミッション {n}",
  "mission.titleWithIndex": "ミッション {n} · {title}",
  "mission.missions": "ミッション",
  "mission.code.rep3": "反復符号 · 家 3 軒",
  "mission.code.rsc3": "表面符号 d=3 · 家 9 軒",
  "mission.code.trivial2": "むき出しの線 2 本",
  "mission.code.trivial3": "むき出しの線 3 本",
  "mission.kind.dispatch": "出動",
  "mission.kind.propagation": "伝わり方",
  "mission.status.new": "未プレイ",
  "mission.status.complete": "クリア",
  "mission.status.attempts.one": "挑戦 1 回",
  "mission.status.attempts.other": "挑戦 {n} 回",
  "mission.starsOf": "星 {stars} / {max}",
  "mission.notPlayed.one": "まだあそんでいない、星は最大 1",
  "mission.notPlayed.other": "まだあそんでいない、星は最大 {max}",
  /* ------------------------------------------------------------------ shared labels: crews, fires, alarms, palette */
  "crew.X": "赤 (X)",
  "crew.Z": "青 (Z)",
  "crew.Y": "赤青 (Y)",
  "crew.name.X": "赤い隊 (X)",
  "crew.name.Z": "青い隊 (Z)",
  "crew.name.Y": "赤青の隊 (Y)",
  "fire.X": "赤い火 (X)",
  "fire.Z": "青い火 (Z)",
  "fire.Y": "赤青の火 (Y)",
  "fire.onHouse": "家 {q} に {letter} の火",
  "fire.none": "火なし",
  "palette.title": "隊",
  "palette.group": "隊の色",
  "palette.crew": "{letter} 隊",
  "palette.putsOut.X": "赤い火を消す",
  "palette.putsOut.Z": "青い火を消す",
  "palette.putsOut.Y": "赤青の火を消す",
  "palette.key": "、キー {key}",
  "alarms.title": "警報",
  "alarms.stations": "警報ステーション",
  "alarms.noneBareWires": "むき出しの線には警報ステーションがありません。火がどこに着くか予想しよう。",
  "alarms.houses": "家 {list}",
  "alarms.ringing": "鳴っている",
  "alarms.quiet": "静か",
  "alarms.notRead": "—",
  "alarms.summary.none": "この地区には警報ステーションがありません。",
  "alarms.summary.notRead": "警報はまだ読んでいません。",
  "alarms.summary.allQuiet": "{n} か所のステーションは、すべて静かです。",
  "alarms.summary.ringing": "{total} か所のうち {ringing} か所が鳴っています：{list}。",
  "legend.title": "マークの意味",
  "legend.fire": "{crew} の火",
  "legend.crew": "{crew} の隊",
  "legend.alarmZ": "Z ステーション（ひし形）：赤い火で鳴る",
  "legend.alarmX": "X ステーション（四角）：青い火で鳴る",
  "legend.water": "水（青い火ではありません！）",
  /* ------------------------------------------------------------------ ARIA-only / announcer text */
  "a11y.house": "家 {q}",
  "a11y.watchedBy": "{list} が見守っている",
  "a11y.residualFire": "残った {crew} の火",
  "a11y.fireOut": "火は消えた",
  "a11y.fire": "{crew} の火",
  "a11y.crew": "{crew} の隊",
  "a11y.noCrewsLeft": "隊はもう残っていない",
  "a11y.pressToSend": "押すと {crew} の隊を送る",
  "a11y.pressToSendAny": "押すと隊を送る",
  "a11y.pressToRecall": "押すと隊を呼びもどす",
  "a11y.pressToSwitch": "押すと {crew} の隊に切りかえる",
  "a11y.pressToSwitchAny": "押すと別の隊に切りかえる",
  "a11y.boardGrid": "{code} の出動ボード",
  "a11y.boardCircuit": "回路ボード",
  "a11y.replayBoard": "リプレイボード",
  "a11y.replayControls": "リプレイの操作",
  "a11y.replaySteps": "リプレイのステップ",
  "a11y.step": "ステップ {n}：{title}",
  "a11y.gameNav": "ゲーム",
  "a11y.backToTitle": "11Q Emergency — タイトルにもどる",
  "a11y.cityBackToTitle": "11Q Emergency — タイトルにもどる",
  "a11y.backToCity": "11Q Emergency — 街の地図にもどる",
  "a11y.langPill": "言語：EN / JA、{lang} に切りかえる",
  "a11y.alarmsAndCrews": "警報と隊",
  "a11y.tutorialSteps": "はじめての通報：3 つの手順",
  "a11y.dismissNotice": "お知らせをとじる",
  "a11y.q11mark": "11Q Emergency のマーク：側面に 11Q と書かれた赤い消防車と、その上に並ぶ赤い X の炎と青い Z の炎",
  "a11y.wires.start": "はじめ",
  "a11y.wires.end": "おわり",
  "a11y.stationRinging": "{station}、鳴っている、家 {list} を見守っている",
  "a11y.stationQuiet": "{station}、静か、家 {list} を見守っている",
  "a11y.fogHouse": "家 {q}、かくれている",
  "a11y.pressToPredict": "押すと「つぎに燃えるのはこの家」と予想する",
  "a11y.screen.title": "11Q Emergency のタイトル画面。",
  "a11y.screen.how": "あそび方。",
  "a11y.screen.settings": "設定。",
  "a11y.screen.city": "街の地図。",
  "a11y.screen.summary": "任務完了：すべての地区のまとめ。",
  "a11y.screen.briefing": "ミッション {n} の作戦説明。",
  "a11y.screen.training": "ミッション {n} の訓練、レッスン {lesson} / {total}。火が見えます。",
  "a11y.screen.challenge.predict": "ミッション {n} の出動。火がどこに着くか予想しよう。使える隊は {crews}。",
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
  "common.close": "とじる",
  "common.skip": "スキップ",
  "common.next": "つぎ",
  "common.prev": "もどる",
  "common.and": "と",
  "common.loading": "読み込み中…"
}, Ey = "en", Tf = { en: "English", ja: "日本語" }, Cy = { en: Ah, ja: Ny }, Ty = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;
function Iy(n, s) {
  return s === void 0 ? n : n.replace(Ty, (l, a) => {
    const u = s[a];
    return u === void 0 ? l : String(u);
  });
}
function Ga(n, s, l) {
  const a = Cy[n][s], u = a.length > 0 ? a : Ah[s];
  return Iy(u, l);
}
function Ly(n) {
  return (s, l) => Ga(n, s, l);
}
function Ja(n, s, l, a) {
  const u = l === 1 ? `${s}.one` : `${s}.other`;
  return Ga(n, u, { n: l, ...a });
}
const Dh = z.createContext(Ey);
function Ry({ language: n, children: s }) {
  return z.useEffect(() => {
    try {
      document.documentElement.lang = n;
    } catch {
    }
  }, [n]), /* @__PURE__ */ i.jsx(Dh.Provider, { value: n, children: s });
}
function Wt() {
  return z.useContext(Dh);
}
function Ce() {
  const n = Wt();
  return z.useCallback((s, l) => Ga(n, s, l), [n]);
}
const If = "このレッスンには警報ステーションがないので、ここで警報が鳴ることはありません。", _y = {
  "first-alarm": {
    briefing: "出動指令室へようこそ。家が 3 軒並び、その間に警報ステーションが 2 つあります。放火犯のノイズは、ここでは赤い火 (X エラー) しかつけません。ステーションは、見守っている 2 つの家のうちちょうど 1 つが燃えているときに鳴ります。警報を読んで、赤い隊を 1 つ送りましょう。",
    training: ["家 0 に赤い火 (X)。ステーション Z0 は家 0 と 1 を見守っていて、火がちょうど 1 つあるので鳴ります。ステーション Z1 は家 1 と 2 を見守っていて、火がないので静かなままです。"],
    debrief: {
      success: "ステーションは 2 つとも鳴り、両方が見守る家は 1 だけです。赤い隊は火に正面から向かい、赤い炎 2 つは打ち消し合います (X·X = I)。論理量子ビットは無事です。",
      "logical-error": "警報はすべて静かですが、残ったパターンは完全な論理反転 (XXX) です。燃えていない家に送られた隊は自分で火をつけてしまうので、静かなだけでは安全の証明にはなりません。リプレイで、出動と警報を見比べましょう。",
      detectable: "少なくとも 1 つのステーションがまだ鳴っています。もとの火がまだ燃えているか、隊が燃えていない家に新しい火をつけたかのどちらかです。最初の警報をリプレイしましょう。ステーションは 2 つとも鳴り、両方が見守る家は 1 だけでした。"
    }
  },
  "red-forward-blue-backward": {
    briefing: "火はひとりでに広がりません。ゲートが運ぶのです。CNOT は赤い火 (X) を制御から標的へコピーし、青い火 (Z) を標的から制御へ逆向きにコピーします。訓練で動きを見てから、火がどこに着くかを予想して、そこへ隊を送りましょう。",
    training: ["赤は前へ：制御にある赤い火 (X) は標的にコピーされます。XI は XX になります。", "青は後ろへ：標的にある青い火 (Z) は制御にコピーされます。IZ は ZZ になります。"],
    debrief: {
      success: "赤が前へ、青が後ろへ同時に進んだので、XZ は YY になりました。どちらの家にも赤青の火です。隊はすべての成分に合っていて、何も残りません。",
      "logical-error": "むき出しの線には警報ステーションがないので、見のがした火も、まちがえてつけた火も、データに直接はたらきます。それぞれの家の両方の色を確かめましょう。Y の火を消すには、赤と青の両方の成分が必要です。",
      detectable: If
    }
  },
  "color-switch": {
    briefing: "アダマールゲート (H) は色を入れかえます。赤は青に、青は赤に、ただし自分の線の上だけです。CNOT と組み合わせると、1 つの火が色を変え、自分をコピーし、また色を変えることがあります。回路をゲート 1 つずつたどりましょう。",
    training: ["色の入れかえ：アダマールが家 0 の赤い火 (X) を青い火 (Z) に変えます。XI は ZI になります。", "H で青が赤になり、つぎに CNOT で赤が前へコピーされます。ZI は XX になります。"],
    debrief: {
      success: "ZI は最初のアダマールで XI になり、CNOT で前へコピーされて XX になり、家 1 の最後のアダマールがそのコピーを青にして XZ になりました。道筋を全部たどれました。",
      "logical-error": "火のどれかが、隊を送った先とちがう色か、ちがう家に着きました。回路をリプレイしましょう。H は自分の線の上だけで色を入れかえ、CNOT は赤を前へ、青を後ろへコピーします。",
      detectable: If
    }
  },
  "blind-dispatch": {
    briefing: "表面符号の地区へようこそ。家は 9 軒、警報ステーションは 8 つです。赤いステーション (Z 検査、ひし形) は赤い火に、青いステーション (X 検査、四角) は青い火に気づきます。今回は火がかくれています。警報を読んで、隊を 1 つ送りましょう。",
    training: [
      "家 0 の赤い火 (X) は、家 0・1・3・4 を見守るステーション Z0 だけを鳴らします。家 3 だけに火があってもまったく同じステーションが鳴るので、家 3 に隊を送っても同じくらい良い直し方です。2 つの出動のちがいは、ステーション X2 自身のパターンというスタビライザー (stabilizer) だけで、符号はそれを気にしません。"
    ],
    debrief: {
      success: "ステーション Z0 と Z1 が両方鳴り、両方が見守る家は 4 だけです。赤い隊 1 つで火は消え、論理量子ビットは無事です。",
      "logical-error": "警報は静かになりましたが、残ったパターンは符号化された量子ビットに論理演算子としてはたらきます。かくれた火 1 つと隊 1 つでは、この地区でこれは起こりえません。いつ起こるのかは「静かな失敗」で見られます。",
      detectable: "警報がまだ鳴っています。燃えていない家に赤い隊を送ると新しい火がつき、青い隊では赤い火をまったく消せません。隊の色をステーションの種類に合わせて、鳴っているすべてのステーションが見守る家を見つけましょう。"
    }
  },
  "two-kinds-of-trouble": {
    briefing: "今回は火が 2 つで、色がちがうかもしれません。赤いステーションは赤い火だけに、青いステーションは青い火だけに気づくので、2 枚の警報地図をべつべつに読みましょう。隊は好きな色で 2 つ使えますが、1 つの家に置ける隊は 1 つまでです。",
    training: [],
    debrief: {
      success: "赤いステーション Z0 と Z2 が両方見守るのは家 1 だけです。青いステーション X1 だけが鳴りました。X1 は地区のはしにあり、見守っている家のうち、はしの家 6 と 7 はほかの青いステーションが見ていないので、青い火はそのどちらかです。どちらに青い隊を送ってもうまくいきます。2 つの選択のちがいはスタビライザーだけだからです。2 つの色、2 つの火、両方消えました。",
      "logical-error": "警報はすべて静かですが、残ったパターンは論理演算子です。隊と火が打ち消し合うかわりに、いっしょになって地区をまたぐ鎖を作っています。鎖がどこを通るかは、リプレイで見られます。",
      detectable: "まだ鳴っているステーションがあります。赤いステーションは青い火をけっして見ないことを思い出しましょう。赤の警報と青の警報を、隊の色 1 つずつのべつべつのパズルとして解きましょう。"
    }
  },
  "silent-failure": {
    briefing: "鳴っている警報は 1 つだけ、ステーション Z0 です。出動のルールはシンプルです。すべてのステーションを静かにする、いちばん少ない隊を送ること。判断したら、本当は何が起きたのかを見てみましょう。",
    training: [],
    debrief: {
      success: "家 1 と 2 の火を両方消しました。正直に聞きます。どうしてわかったのですか？ 警報は、家 0 か 3 に火が 1 つあるときとまったく同じだったので、これはたまたま当たった推測です。ルールどおりなら、家 0 か 3 に隊を 1 つ送ります。このミッションの星は最大 1 つです。警報だけでは勝てないからです。",
      "logical-error": "それが最適な判断でした。鳴ったのは Z0 だけで、警報 1 つのいちばん良い説明は火 1 つ、家 0 か家 3 です（2 つのちがいはスタビライザーだけなので、どちらの隊でも同じ判断です）。しかしノイズは、家 1 と 2 に火を 2 つつけました。送った隊とその 2 つの火は、地区の上側をまたぐ赤い鎖になります。家 0・1・2 の X、または家 3 を通る同等の鎖です。これは論理 X で、どのステーションも偶数個として見るため、見つけられません。この符号の距離 (distance) は 3 です。火 1 つなら必ず直せますが、火 2 つはどんな指令官でもだませます。家 1 と 2 に隊を送る理由になる警報のパターンが、なかったからです。だから本物の量子コンピュータは、もっと大きな符号を使うのです。",
      detectable: "ステーションがまだ鳴っているので、いちばん少ない隊は送られませんでした。Z0 だけが鳴ったときのルールは、家 0 か家 3 に赤い隊を 1 つ（どちらも同じ判断）です。警報をリプレイして見比べましょう。"
    }
  }
}, Oy = {
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
}, My = {
  "first-alarm": {
    districtName: "ながや通り",
    kidTitle: "はじめての警報",
    goal: "鳴っている 2 つの警報が両方とも見守っている家を見つけて、そこに赤い隊を送ろう。",
    beginnerHint: "まず赤い隊 (X) をタップ。つぎに、2 つの警報が指している真ん中の家をタップしてみよう。",
    lessonOneLiner: "警報は、見守っている家のうち燃えている数が奇数のときに鳴ります。1 つの家を指すわけではありません。",
    reactions: {
      restored: "警報が 2 つとも静かになり、家は無事です。警報をぴったり読めましたね。",
      safePattern: "残っているのは、符号が気にしない無害なパターンです。しまってある情報は無事です。",
      stillBurning: "まだ警報が鳴っているので、火が残っています。どのステーションが鳴っているか見て、もう一度やってみよう。",
      logicalFailure: "警報はすべて静かですが、残ったパターンがしまってある情報を反転させました。警報が静かなだけでは、安全とはいえません。"
    },
    whyShort: "それぞれの警報は 2 つの家を見守っています。両方に見守られているのは真ん中の家だけなので、そこが燃えたときだけ 2 つとも鳴るのです。",
    detailsTitle: "詳細：反復符号、Z 検査と X エラー"
  },
  "red-forward-blue-backward": {
    districtName: "みなと橋",
    kidTitle: "赤は前へ、青は後ろへ",
    goal: "橋のゲートを火がわたる様子を見て、火が着く先の家に隊を送ろう。",
    beginnerHint: "赤 (X) は前の家（標的）へ、青 (Z) は後ろの家（制御）へコピーされます。最後はどちらの家にも両方の色がつきます。",
    lessonOneLiner: "CNOT ゲートは、赤い火 (X) を前へ、青い火 (Z) を後ろへ運びます。火が勝手に動くことはありません。",
    reactions: {
      restored: "2 つの家ともきれいになりました。赤は前へ、青は後ろへ、ぴったり追えましたね。",
      safePattern: "むき出しの線には符号がないので、きれいに消えたときだけ安全です。今回はそのとおりになりました。",
      stillBurning: "この橋には警報ステーションがないので、ここで警報が鳴ることはありません。リプレイで火の行き先を見てみよう。",
      logicalFailure: "線の上に火が残り、予想がはずれました。ゲートをリプレイしてみよう：赤は前へ、青は後ろへ。"
    },
    whyShort: "XZ が CNOT を通ると YY になります。赤の成分が前へ、青の成分が後ろへ、同時にコピーされるからです。",
    detailsTitle: "詳細：CNOT の伝わり方のルール (x[t] ^= x[c], z[c] ^= z[t])"
  },
  "color-switch": {
    districtName: "変換ラボ",
    kidTitle: "色の入れかえ",
    goal: "3 つのゲートを通る火を追いかけて、最後の色と家に合わせて隊を送ろう。",
    beginnerHint: "まず訓練を 1 歩ずつ見てみよう。H は自分の線の赤と青を入れかえ、CNOT は赤を前へコピーします。",
    lessonOneLiner: "アダマールゲート (H) は、自分の線の上だけで赤 (X) と青 (Z) を入れかえます。",
    reactions: {
      restored: "青→赤→コピー→また青と、入れかえを全部追えました。2 つの家ともきれいです。",
      safePattern: "この線には符号がないので、きれいに消えたときだけ安全です。何も残っていません。",
      stillBurning: "ラボには警報ステーションがないので、ここで警報が鳴ることはありません。リプレイで、ゲートごとの入れかえを見てみよう。",
      logicalFailure: "火の色か家が、予想とちがっていました。ゲートを 1 つずつリプレイしてみよう。"
    },
    whyShort: "ZI は最初の H で XI に、CNOT で XX に、最後の H でコピーが青になって XZ になります。",
    detailsTitle: "詳細：H は x と z を入れかえる。道筋は ZI → XI → XX → XZ"
  },
  "blind-dispatch": {
    districtName: "中央地区",
    kidTitle: "見えない火を消せ",
    goal: "家は 9 軒、警報は 8 つ、かくれた火は 1 つ — 鳴っている警報がすべて見守っている家をさがそう。",
    beginnerHint: "鳴っているステーションをタップすると、見守っている家がわかります。鳴っている 2 つのステーションがかさなる家に、赤い隊を送ろう。",
    lessonOneLiner: "赤いステーション (Z 検査) は赤い火に、青いステーション (X 検査) は青い火に気づきます。",
    reactions: {
      restored: "ステーションが 2 つとも静かになり、真ん中の家は無事です。隊 1 つで火 1 つ、みごとです。",
      safePattern: "何かが残っていますが、符号が気にしない無害なパターンです。しまってある情報は無事です。",
      stillBurning: "まだ鳴っているステーションがあります。燃えていない家に赤い隊を送ると赤い火がつき、赤い火に青い隊を送ると Y の火に変わって、もっと多くのステーションが鳴ります。",
      logicalFailure: "警報はすべて静かですが、記憶の塔のランプが反転を知らせています。火 1 つと隊 1 つならここでは起こらないはずなので、「なぜ」ボタンで鎖を見てみよう。"
    },
    whyShort: "Z0 は家 0・1・3・4 を、Z1 は家 4・5・7・8 を見守っています。両方のリストにある家は 4 だけです。",
    detailsTitle: "詳細：距離 3 の回転表面符号（データ量子ビット 9、検査 8）"
  },
  "two-kinds-of-trouble": {
    districtName: "市場ひろば",
    kidTitle: "2 色の火事",
    goal: "火は 2 つ、色も 2 つ、赤い警報と青い警報をべつべつのパズルとして解こう。",
    beginnerHint: "まず赤。Z0 と Z2 が両方見守っている家は 1 つだけです。つぎに青。X1 だけが鳴っているので、そのはしの家を 1 つ選ぼう。",
    lessonOneLiner: "赤いステーションは青い火に気づきません。だから赤の警報と青の警報は、べつべつの地図なのです。",
    reactions: {
      restored: "赤も青も消えました。2 枚の警報地図を同時に読めましたね。",
      safePattern: "青い隊は本当の青い火のとなりでしたが、符号はどちらも同じ直し方とみなします。安全です！",
      stillBurning: "まだ鳴っているステーションがあります。赤と青はべつべつに、赤の警報には赤い隊、青の警報には青い隊です。",
      logicalFailure: "警報は静かですが、隊と火がつながって、地区をまたぐ鎖になりました。「なぜ」ボタンで鎖を見てみよう。"
    },
    whyShort: "Z0 と Z2 が両方見守るのは家 1 だけなので、そこに赤。X1 だけが鳴ったので、青い隊は家 6 でも 7 でもよく、2 つのちがいはスタビライザーだけです。",
    detailsTitle: "詳細：CSS 符号 — Z 検査は X を、X 検査は Z を見つける。ここに Y 隊がない理由"
  },
  "silent-failure": {
    districtName: "旧市街",
    kidTitle: "静かな失敗",
    goal: "鳴っている警報は 1 つだけなので、それを静かにするいちばん少ない隊を送り、そのあと調べよう。",
    beginnerHint: "ルールでは、家 0 か家 3 に赤い隊を 1 つ送れば Z0 は静かになります。そう判断して、記憶の塔を見てみよう。",
    lessonOneLiner: "ちがう 2 つの火が、同じ警報を鳴らすことがあります。だから警報だけでは、いつも決められるわけではないのです。",
    reactions: {
      restored: "かくれていた 2 つの火を両方消しました。でも正直にいうと、警報からはわからなかったので、まぐれ当たりです。",
      safePattern: "残ったのは無害なパターンなので、情報は無事です。それでも、火の場所は警報からはわかりませんでした。",
      stillBurning: "Z0 がまだ鳴っているので、いちばん少ない隊ではありませんでした。ルールは、家 0 か 3 に赤い隊を 1 つです。",
      logicalFailure: "正しい判断でしたが、2 つの火が警報をだまし、記憶の塔は反転しました。これで調査完了、警報だけではだれにもわからなかったのです。"
    },
    whyShort: "家 1 と 2 の火は Z0 だけを鳴らし、家 0 の火 1 つとまったく同じに見えます。だから警報だけでは決められないのです。距離 3 の符号が必ず直せるのは火 1 つまでで、火 2 つはどんな指令官でもだませます。",
    detailsTitle: "詳細：距離 3、論理 X̄ = X0 X1 X2 の鎖、そして大きな符号がある理由"
  }
}, Py = ["first-alarm", "red-forward-blue-backward", "color-switch", "blind-dispatch", "two-kinds-of-trouble", "silent-failure"];
function $y(n) {
  return typeof n == "string" && Py.includes(n);
}
function Fh(n) {
  if (!$y(n)) throw new Error(`unknown mission '${n}'`);
  return n;
}
const Ay = { en: Oy, ja: My };
function Xt(n, s) {
  return Ay[s][Fh(n)];
}
function ec(n) {
  return _y[Fh(n)];
}
function Dy(n, s, l) {
  return s === "ja" ? ec(n).briefing : l;
}
function Fy(n, s, l, a) {
  return l !== "ja" ? a : ec(n).training[s] ?? a;
}
function zh(n, s, l, a) {
  return l === "ja" ? ec(n).debrief[s] : a;
}
function Xh(n, s) {
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
var zy = Gf();
const _a = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" }, Xy = { X: "palette.putsOut.X", Z: "palette.putsOut.Z", Y: "palette.putsOut.Y" }, tc = {
  optimal: "result.quality.optimal",
  valid: "result.quality.valid",
  unlucky: "result.quality.unlucky",
  lucky: "result.quality.lucky",
  off: "result.quality.off"
};
function Sl(n, s) {
  return n === "success" ? "result.outcome.success" : n === "detectable" ? "result.outcome.detectable" : s ? "result.outcome.logicalError" : "result.outcome.propagationMiss";
}
function nc(n, s, l, a) {
  const u = s.score.completed;
  return a ? { nextLabel: n("result.city"), primary: u ? "next" : "retry" } : u ? { nextLabel: n(l ? "result.summary" : "result.next"), primary: "next" } : { nextLabel: n("result.city"), primary: "retry" };
}
function Wy(n) {
  return n.stars === 3 ? "result.heading.flawless" : n.stars === 2 ? "result.heading.firesOut" : n.quality === "unlucky" ? "result.heading.unlucky" : n.quality === "lucky" ? "result.heading.lucky" : n.stars === 1 ? "result.heading.close" : n.outcome === "detectable" && n.crewsUsed === 0 ? "result.heading.stoodDown" : "result.heading.off";
}
const Zy = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function Oa(n) {
  return Zy[n] ?? "city.badges";
}
const By = {
  rep3: "mission.code.rep3",
  rsc3: "mission.code.rsc3",
  trivial2: "mission.code.trivial2",
  trivial3: "mission.code.trivial3"
}, qy = {
  placed: "debrief.stepTitle.placed",
  gate: "debrief.stepTitle.gate",
  alarms: "debrief.stepTitle.alarms",
  dispatch: "debrief.stepTitle.dispatch",
  residual: "debrief.stepTitle.residual",
  verdict: "debrief.stepTitle.verdict"
};
function Lf(n, s) {
  const l = qy[s.startsWith("gate-") ? "gate" : s];
  return l === void 0 ? s : n(l);
}
function rc(n, s, l) {
  const a = $e(s);
  if (a.checks.length === 0) return n("alarms.summary.none");
  if (l === null) return n("alarms.summary.notRead");
  const u = a.checks.filter((f, p) => (l[p] ?? 0) === 1).map((f) => f.id);
  return u.length === 0 ? n("alarms.summary.allQuiet", { n: a.checks.length }) : n("alarms.summary.ringing", { ringing: u.length, total: a.checks.length, list: u.join(", ") });
}
function Hy(n, s) {
  const l = Te(s), a = Et(l).map((f) => n("fire.onHouse", { letter: tt(l, f), q: f }));
  if (a.length === 0) return n("fire.none");
  let u = a[0] ?? "";
  for (let f = 1; f < a.length; f++) {
    const p = a[f] ?? "";
    u = f === a.length - 1 ? n("spray.list.and", { a: u, b: p }) : n("spray.list.comma", { a: u, b: p });
  }
  return u;
}
function Uy(n, s, l) {
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
function Yy(n, s, l, a) {
  const u = l?.index ?? 0, f = l !== null && $e(l.code).checks.length > 0, p = a === null ? "" : n(Sl(a.verdict, f));
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
      return n("a11y.screen.briefing", { n: u });
    case "training":
      return n("a11y.screen.training", { n: u, lesson: s.lesson + 1, total: l?.training.length ?? 1 });
    case "challenge":
      return l === null ? n("a11y.screen.challenge.plain") : l.kind === "propagation" ? n("a11y.screen.challenge.predict", { n: u, crews: l.budget === 1 ? n("a11y.crews.one") : n("a11y.crews.other", { n: l.budget }) }) : n("a11y.screen.challenge.alarms", { n: u, summary: rc(n, l.code, l.syndrome) });
    case "dispatch":
      return a === null || !s.dispatchDone ? n("a11y.screen.dispatch", { n: u }) : n("a11y.screen.dispatch.verdict", { n: u, verdict: p });
    case "debrief":
      return a === null ? n("a11y.screen.debrief", { n: u }) : n("a11y.screen.debrief.verdict", { n: u, verdict: p });
    case "result":
      return a === null ? n("a11y.screen.result", { n: u }) : n("a11y.screen.result.stars", { n: u, stars: a.score.stars, max: a.score.maxStars });
  }
}
function Ms({ letter: n, size: s = 28, ghost: l = !1, residual: a = !1 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-flame icon-${n}`, width: s, height: s, viewBox: "-34 -100 68 104", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(cn, { letter: n, x: 0, y: 0, ghost: l, residual: a }) });
}
function er({ letter: n, size: s = 28 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-helmet icon-${n}`, width: s, height: s * 0.8, viewBox: "-30 -44 60 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Ua, { letter: n, x: 0, y: 0 }) });
}
function zr({ type: n, ringing: s = !1, size: l = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: `icon icon-detector icon-detector-${n}${s ? " is-ringing" : ""}`, width: l, height: l, viewBox: "-30 -30 60 60", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Vg, { type: n, ringing: s, x: 0, y: 0 }) });
}
function Wh({ size: n = 26 }) {
  return /* @__PURE__ */ i.jsx("svg", { className: "icon icon-water", width: n, height: n, viewBox: "-22 -44 44 48", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(Hg, { x: 0, y: 0 }) });
}
function Xs({ codeId: n, syndrome: s, id: l, compact: a = !1, hint: u }) {
  const f = Ce(), p = $e(n);
  return p.checks.length === 0 ? /* @__PURE__ */ i.jsxs("section", { className: "panel-section", "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted", id: l, children: f("alarms.noneBareWires") })
  ] }) : /* @__PURE__ */ i.jsxs("section", { className: `panel-section alarms${a ? " is-compact" : ""}`, "aria-labelledby": l === void 0 ? void 0 : `${l}-h`, children: [
    /* @__PURE__ */ i.jsx("h2", { id: l === void 0 ? void 0 : `${l}-h`, className: "panel-title", children: f("alarms.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "sr-only", id: l, "aria-live": "polite", children: rc(f, n, s) }),
    /* @__PURE__ */ i.jsx("ul", { className: `alarm-list${p.checks.length > 4 ? " is-grid" : ""}${a ? " is-compact" : ""}`, "aria-label": f("alarms.stations"), children: p.checks.map((g, y) => {
      const w = s !== null && (s[y] ?? 0) === 1;
      return /* @__PURE__ */ i.jsxs("li", { className: w ? "alarm is-ringing" : "alarm", "data-check": g.id, "data-ringing": w ? "1" : "0", children: [
        /* @__PURE__ */ i.jsx(zr, { type: g.type, ringing: w, size: 26 }),
        /* @__PURE__ */ i.jsxs("span", { className: "alarm-main", children: [
          /* @__PURE__ */ i.jsx("span", { className: "alarm-id", children: g.id }),
          /* @__PURE__ */ i.jsx("span", { className: "alarm-blocks", children: f("alarms.houses", { list: g.qubits.join(", ") }) })
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "alarm-state", children: f(s === null ? "alarms.notRead" : w ? "alarms.ringing" : "alarms.quiet") })
      ] }, g.id);
    }) }),
    u !== void 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted small alarm-hint", children: u }) : null
  ] });
}
const Rf = { X: "1", Z: "2", Y: "3" }, Vy = ["X", "Z", "Y"];
function Qy({ allowed: n, selected: s, onSelect: l, callout: a }) {
  const u = Ce(), f = Vy.filter((g) => n.includes(g)), p = (g, y) => {
    const w = f.indexOf(y);
    if (w < 0 || f.length === 0) return;
    let b;
    if (g.key === "ArrowDown" || g.key === "ArrowRight" ? b = f[(w + 1) % f.length] : g.key === "ArrowUp" || g.key === "ArrowLeft" ? b = f[(w - 1 + f.length) % f.length] : g.key === "Home" ? b = f[0] : g.key === "End" && (b = f[f.length - 1]), b === void 0) return;
    g.preventDefault(), l(b), g.currentTarget.closest('[role="radiogroup"]')?.querySelector(`[data-letter="${b}"]`)?.focus();
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section palette-section", "aria-labelledby": "palette-h", children: [
    /* @__PURE__ */ i.jsx("h2", { id: "palette-h", className: "panel-title", children: u("palette.title") }),
    a,
    /* @__PURE__ */ i.jsx("div", { className: "palette", role: "radiogroup", "aria-label": u("palette.group"), children: f.map((g) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": s === g,
        tabIndex: s === g ? 0 : -1,
        className: `palette-btn palette-${g}${s === g ? " is-selected" : ""}`,
        onClick: () => l(g),
        onKeyDown: (y) => p(y, g),
        "data-letter": g,
        "data-testid": `palette-${g}`,
        children: [
          /* @__PURE__ */ i.jsx(er, { letter: g, size: 44 }),
          /* @__PURE__ */ i.jsxs("span", { className: "palette-text", children: [
            /* @__PURE__ */ i.jsxs("span", { className: "palette-name", children: [
              u("palette.crew", { letter: g }),
              /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: `${u("spray.list.comma", { a: "", b: "" })}${u(_a[g])}${u("spray.list.comma", { a: "", b: "" })}` })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "palette-hint", children: u(Xy[g]) })
          ] }),
          /* @__PURE__ */ i.jsx("kbd", { className: "palette-key", "aria-hidden": "true", children: Rf[g] }),
          /* @__PURE__ */ i.jsx("span", { className: "sr-only", children: u("palette.key", { key: Rf[g] }) })
        ]
      },
      g
    )) })
  ] });
}
function Ws({ count: n, max: s = 3, size: l = 22, label: a }) {
  const u = Ce();
  return /* @__PURE__ */ i.jsx("span", { className: "stars", role: "img", "aria-label": a ?? u("mission.starsOf", { stars: n, max: s }), children: Array.from({ length: Math.max(1, s) }, (f, p) => /* @__PURE__ */ i.jsx(by, { filled: p < n, size: l }, p)) });
}
function Ky() {
  const n = Ce();
  return /* @__PURE__ */ i.jsx(i.Fragment, { children: n("app.name") });
}
function As({ size: n = "small", nameAs: s = "span", nameProps: l, layout: a = "stack" }) {
  const u = Ce(), f = s;
  return /* @__PURE__ */ i.jsxs("span", { className: `brand-lockup brand-lockup-${n} brand-lockup-${a}`, children: [
    /* @__PURE__ */ i.jsx("span", { className: a === "row" ? "brand-mark" : "brand-mark brand-mark-fluid", "aria-hidden": s === "span" ? "true" : void 0, children: a === "row" ? /* @__PURE__ */ i.jsx(Cf, { crop: !0, size: 40, lettering: u("app.lettering") }) : /* @__PURE__ */ i.jsx(Cf, { fluid: !0, lettering: u("app.lettering"), label: s === "span" ? void 0 : u("a11y.q11mark") }) }),
    /* @__PURE__ */ i.jsx(f, { className: `brand-lockup-name${s === "h1" ? " title-h" : ""}`, ...l ?? {}, children: /* @__PURE__ */ i.jsx(Ky, {}) })
  ] });
}
function un({ title: n, subtitle: s, onMissions: l, onSettings: a, settingsLabel: u, onTitle: f }) {
  const p = Ce(), g = l !== void 0 ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost brand-btn", onClick: l, "aria-label": p("a11y.backToCity"), "data-testid": "topbar-city", children: /* @__PURE__ */ i.jsx(As, { layout: "row" }) }) : f !== void 0 ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost brand-btn", onClick: f, "aria-label": p("a11y.backToTitle"), children: /* @__PURE__ */ i.jsx(As, { layout: "row" }) }) : /* @__PURE__ */ i.jsx("span", { className: "brand", children: /* @__PURE__ */ i.jsx(As, { layout: "row" }) });
  return /* @__PURE__ */ i.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "topbar-title", children: [
      g,
      /* @__PURE__ */ i.jsxs("div", { className: "topbar-text", children: [
        /* @__PURE__ */ i.jsx("h1", { className: "topbar-h", tabIndex: -1, "data-focus-target": !0, children: n }),
        s !== void 0 ? /* @__PURE__ */ i.jsx("p", { className: "topbar-sub", children: s }) : null
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("nav", { className: "topbar-actions", "aria-label": p("a11y.gameNav"), children: /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: a, "aria-label": u ?? p("title.settings"), "data-testid": "topbar-settings", children: /* @__PURE__ */ i.jsx(Ka, {}) }) })
  ] });
}
function Gy({ language: n, onChange: s, testId: l = "lang-toggle" }) {
  const a = Ce(), u = n === "en" ? "ja" : "en";
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: "lang-pill",
      onClick: () => s(u),
      "aria-label": a("a11y.langPill", { lang: Tf[u] }),
      title: a("title.language", { lang: Tf[n] }),
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
function sc({ summary: n, children: s, testId: l, className: a }) {
  const u = Ce();
  return /* @__PURE__ */ i.jsxs("details", { className: `details-fold${a === void 0 ? "" : ` ${a}`}`, "data-testid": l, children: [
    /* @__PURE__ */ i.jsx("summary", { children: n ?? u("details.show") }),
    /* @__PURE__ */ i.jsx("div", { className: "details-body", children: s })
  ] });
}
function Jy({ text: n, onDismiss: s }) {
  const l = Ce();
  return /* @__PURE__ */ i.jsxs("div", { className: "notice", role: "status", "data-testid": "notice", children: [
    /* @__PURE__ */ i.jsx("span", { children: n }),
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: s, "aria-label": l("a11y.dismissNotice"), children: l("notice.dismiss") })
  ] });
}
const e1 = "[data-inert-root]", t1 = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Zh({ title: n, children: s, confirmLabel: l, cancelLabel: a, onConfirm: u, onCancel: f, danger: p = !1 }) {
  const g = Ce(), y = z.useRef(null), w = z.useRef(null), b = z.useRef(f);
  z.useEffect(() => {
    b.current = f;
  }, [f]), z.useLayoutEffect(() => {
    const C = document.activeElement instanceof HTMLElement ? document.activeElement : null, L = Array.from(document.querySelectorAll(e1)), O = L.map((R) => R.hasAttribute("inert"));
    return L.forEach((R) => R.setAttribute("inert", "")), y.current?.focus(), () => {
      L.forEach((R, I) => {
        (O[I] ?? !1) || R.removeAttribute("inert");
      }), C !== null && C.isConnected && C.focus();
    };
  }, []), z.useEffect(() => {
    const C = (L) => {
      if (L.key === "Escape") {
        L.preventDefault(), b.current();
        return;
      }
      if (L.key !== "Tab") return;
      const O = w.current;
      if (O === null) return;
      const R = Array.from(O.querySelectorAll(t1));
      if (R.length === 0) return;
      const I = R[0], P = R[R.length - 1];
      if (I === void 0 || P === void 0) return;
      const _ = document.activeElement;
      _ instanceof Node && O.contains(_) ? L.shiftKey && _ === I ? (L.preventDefault(), P.focus()) : !L.shiftKey && _ === P && (L.preventDefault(), I.focus()) : (L.preventDefault(), (L.shiftKey ? P : I).focus());
    };
    return document.addEventListener("keydown", C), () => document.removeEventListener("keydown", C);
  }, []);
  const j = /* @__PURE__ */ i.jsx("div", { className: "dialog-backdrop", role: "presentation", children: /* @__PURE__ */ i.jsxs("div", { className: "dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "dialog-h", "aria-describedby": "dialog-d", ref: w, children: [
    /* @__PURE__ */ i.jsx("h2", { id: "dialog-h", className: "dialog-title", children: n }),
    /* @__PURE__ */ i.jsx("div", { id: "dialog-d", className: "dialog-body", children: s }),
    /* @__PURE__ */ i.jsxs("div", { className: "dialog-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", ref: y, onClick: f, children: a ?? g("common.cancel") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: p ? "btn btn-danger" : "btn btn-primary", onClick: u, children: l })
    ] })
  ] }) });
  return zy.createPortal(j, document.body);
}
function Bh({ allowed: n, alarms: s = !1, water: l = !1 }) {
  const a = Ce();
  return /* @__PURE__ */ i.jsxs("ul", { className: "legend", "aria-label": a("legend.title"), children: [
    n.map((u) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(Ms, { letter: u, size: 24 }),
      " ",
      a("legend.fire", { crew: a(_a[u]) })
    ] }, `f-${u}`)),
    n.map((u) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(er, { letter: u, size: 24 }),
      " ",
      a("legend.crew", { crew: a(_a[u]) })
    ] }, `c-${u}`)),
    s ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(zr, { type: "Z", size: 24 }),
        " ",
        a("legend.alarmZ")
      ] }),
      /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(zr, { type: "X", size: 24 }),
        " ",
        a("legend.alarmX")
      ] })
    ] }) : null,
    l ? /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx(Wh, { size: 24 }),
      " ",
      a("legend.water")
    ] }) : null
  ] });
}
const n1 = 1500, r1 = 1300, s1 = 4e3, i1 = 120;
function l1(n, s) {
  const l = {};
  for (const a of $s) l[a] = Ba(a, n, s);
  return l;
}
function _f(n) {
  return typeof n == "string" && $s.includes(n);
}
function Of(n, s) {
  const l = $s.indexOf(n), a = $s.length;
  return $s[(l + s + a) % a] ?? n;
}
const ll = (n, s) => `${String(Math.round(n / s * 1e4) / 100)}%`;
function o1(n) {
  return {
    left: ll(n.x + n.w / 2, Zr),
    top: ll(n.y + n.h / 2, Br),
    width: ll(n.w, Zr),
    height: ll(n.h, Br)
  };
}
function a1(n) {
  const s = Math.min(1, Math.max(0, n));
  return s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2;
}
function c1(n, s, l) {
  return { x: n.x + (s.x - n.x) * l, y: n.y + (s.y - n.y) * l };
}
function Mf(n, s, l, a) {
  if (n !== null && typeof n.getTotalLength == "function" && typeof n.getPointAtLength == "function") {
    const u = n.getTotalLength();
    if (Number.isFinite(u) && u > 0) {
      const f = n.getPointAtLength(a * u);
      return { x: f.x, y: f.y };
    }
  }
  return c1(s, l, a);
}
function Pf() {
  if (typeof document > "u") return !1;
  if (document.querySelector('[data-reduced-motion="true"]') !== null) return !0;
  try {
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
  } catch {
    return !1;
  }
}
const u1 = {
  "first-alarm": "city.badgeName.firstAlarm",
  "red-forward-blue-backward": "city.badgeName.redForwardBlueBackward",
  "color-switch": "city.badgeName.colorSwitch",
  "blind-dispatch": "city.badgeName.blindDispatch",
  "two-kinds-of-trouble": "city.badgeName.twoKindsOfTrouble",
  "silent-failure": "city.badgeName.silentFailure"
};
function Ma(n) {
  return u1[n] ?? "city.badgeName.firstAlarm";
}
const ol = ["#e8432f", "#2f7fe6", "#9b5de5", "#2bb673", "#f2b200", "#3fb6f5"];
function $f(n) {
  return ol[(n % ol.length + ol.length) % ol.length] ?? "#2f7fe6";
}
const Af = 1024;
function d1({ state: n, dispatch: s, storageNote: l, recentlySolved: a, onSettings: u, onTitle: f, onCelebrated: p, reducedMotion: g, initialSelected: y = null }) {
  const w = Ce(), b = Wt(), j = l1(n.progress, n.settings.freeRoam), C = g ?? (n.settings.reducedMotion ? !0 : void 0), L = z.useCallback(() => C ?? Pf(), [C]), [O] = z.useState(() => _f(a) && j[a] === "solved" ? a : null), R = (B) => _f(B) && j[B] !== "locked" ? B : null, [I, P] = z.useState(() => R(y)), [_, V] = z.useState(null), [ne, te] = z.useState(null), [J, fe] = z.useState(() => O !== null && !(C ?? Pf())), [$, me] = z.useState(() => {
    if (O === null) return null;
    const B = Mr(O), ve = zt.findIndex((Le) => Le.id === O);
    return { kind: "badge", text: w("city.badgeToast", { badge: w(Ma(B.missionId)) }), colour: $f(ve) };
  }), [he, oe] = z.useState(null), Z = z.useRef(null), U = z.useRef(null), Se = z.useRef(null), ae = z.useRef(null), le = z.useRef(null), we = z.useRef(null), [W, re] = z.useState(!1), q = z.useRef(O === null ? "none" : "pending"), S = z.useRef(p);
  z.useEffect(() => {
    S.current = p;
  }, [p]), z.useEffect(() => {
    if ($ === null) return;
    const B = globalThis.setTimeout(() => me(null), s1);
    return () => globalThis.clearTimeout(B);
  }, [$]), z.useEffect(() => {
    if (!J) return;
    const B = globalThis.setTimeout(() => fe(!1), r1);
    return () => globalThis.clearTimeout(B);
  }, [J]);
  const M = J || $ !== null && $.kind === "badge";
  z.useEffect(() => {
    q.current !== "pending" || M || (q.current = "done", S.current?.());
  }, [M]), z.useEffect(
    () => () => {
      q.current === "pending" && (q.current = "done", S.current?.());
    },
    []
  );
  const de = () => {
    J && fe(!1), me((B) => B !== null && B.kind === "badge" ? null : B);
  }, ue = R(y), [ye, xe] = z.useState(ue);
  ue !== ye && (xe(ue), ue !== null && (re(!1), P(ue))), z.useEffect(() => {
    if (ue === null) return;
    const B = globalThis.setTimeout(() => {
      const ve = Z.current?.querySelector(`button[data-district="${ue}"]`);
      ve != null && typeof ve.scrollIntoView == "function" && ve.scrollIntoView({ block: "nearest" });
    }, 0);
    return () => globalThis.clearTimeout(B);
  }, [ue]), z.useEffect(() => {
    if (I === null) return;
    const B = Se.current;
    B !== null && W && (typeof window < "u" && window.innerWidth < Af && typeof B.scrollIntoView == "function" && B.scrollIntoView({ block: "nearest" }), U.current?.focus({ preventScroll: !0 }));
  }, [I, W]);
  const be = I !== null && _ === null;
  z.useEffect(() => {
    const B = Se.current;
    if (!be || B === null || typeof window > "u") {
      oe(null);
      return;
    }
    const ve = () => oe(window.innerWidth < Af ? Math.ceil(B.getBoundingClientRect().height) : null);
    ve();
    const Le = globalThis.ResizeObserver, Ge = typeof Le == "function" ? new Le(ve) : null;
    return Ge?.observe(B), window.addEventListener("resize", ve), () => {
      Ge?.disconnect(), window.removeEventListener("resize", ve);
    };
  }, [be, I]), z.useEffect(() => {
    if (_ === null) return;
    const B = Mr(_), ve = B.missionId;
    let Le = null, Ge = !1;
    const Zt = () => {
      Ge || (Ge = !0, Le !== null && globalThis.cancelAnimationFrame(Le), Le = null, le.current = null, s({ type: "SELECT_MISSION", id: ve }), V(null), te(null));
    };
    le.current = Zt;
    const Fn = ae.current;
    let Gt = null, fn = Mf(Fn, Nf, B.entry, 0), qr = 1;
    const Hr = (Ur) => {
      if (Ge) return;
      Gt === null && (Gt = Ur);
      const Ys = Ur - Gt, ar = Math.min(1, Ys / n1), hn = Mf(Fn, Nf, B.entry, a1(ar)), cr = hn.x - fn.x;
      cr > 0.01 ? qr = 1 : cr < -0.01 && (qr = -1), fn = hn, te({ x: hn.x, y: hn.y, facing: qr, wheelFrame: Math.floor(Ys / i1) % 2 === 0 ? 0 : 1 }), ar < 1 ? Le = globalThis.requestAnimationFrame(Hr) : Zt();
    };
    return Le = globalThis.requestAnimationFrame(Hr), () => {
      Le !== null && globalThis.cancelAnimationFrame(Le), le.current === Zt && (le.current = null);
    };
  }, [_, s]);
  const ke = z.useCallback(() => {
    le.current?.();
  }, []), Re = (B) => {
    if (_ !== null) return;
    if (de(), j[B] === "locked") {
      const Le = Eg(n.progress), Ge = Le === null ? "" : Xt(Le.missionId, b).districtName;
      me({ kind: "locked", text: w("city.locked.hint", { district: Ge }), colour: null });
      return;
    }
    we.current = B, re(!0), P(B);
  }, nt = () => {
    P(null);
    const B = we.current;
    B !== null && Z.current?.querySelector(`button[data-district="${B}"]`)?.focus();
  }, rr = () => {
    if (I === null || _ !== null) return;
    const B = Mr(I);
    if (L()) {
      s({ type: "SELECT_MISSION", id: B.missionId });
      return;
    }
    V(I);
  }, Bs = (B) => {
    B.key === "Escape" && (_ !== null ? (B.preventDefault(), ke()) : I !== null && (B.preventDefault(), nt())), J && de();
  }, sr = (B) => {
    M && de();
  }, ir = {};
  for (const B of zt) {
    const ve = j[B.id];
    ir[B.id] = ve === "available" && I === B.id && _ === null ? "selected" : ve;
  }
  const qs = Ha(n.progress), Hs = Wa(), lr = zt.filter((B) => j[B.id] === "solved"), kt = I === null ? null : Mr(I), dn = _ === null ? null : Mr(_), Ke = O === null ? null : Mr(O), Kt = (B) => w(B === "locked" ? "city.status.locked" : B === "solved" ? "city.status.solved" : "city.status.available"), or = (B) => {
    const ve = Qt(B.missionId), Le = n.progress[B.missionId];
    return Le === void 0 ? Ja(b, "mission.notPlayed", ve.maxStars, { max: ve.maxStars }) : w("mission.starsOf", { stars: Le.stars, max: ve.maxStars });
  }, Us = he === null ? void 0 : { "--city-sheet-h": `${String(he)}px` };
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-city${be ? " has-panel" : ""}${_ !== null ? " is-travelling" : ""}`, ref: Z, onKeyDown: Bs, "aria-busy": _ !== null, style: Us, children: [
    /* @__PURE__ */ i.jsxs("header", { className: "city-hud", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "city-brand-group", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-brand", onClick: f, "aria-label": w("a11y.cityBackToTitle"), "data-testid": "city-title", children: /* @__PURE__ */ i.jsx(As, { layout: "row" }) }),
        /* @__PURE__ */ i.jsx("h1", { className: "city-brand-title sr-only", tabIndex: -1, "data-focus-target": !0, children: w("city.title") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-hud-stats", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "city-stat", "data-testid": "city-stars", children: [
          /* @__PURE__ */ i.jsx(qh, { filled: !0, size: 20 }),
          /* @__PURE__ */ i.jsx("span", { children: w("mission.starsOf", { stars: qs, max: Hs }) })
        ] }),
        /* @__PURE__ */ i.jsxs("ul", { className: "city-badges", "aria-label": w("city.badges"), "data-testid": "city-badges", children: [
          lr.length === 0 ? /* @__PURE__ */ i.jsxs("li", { className: "city-badges-empty", children: [
            w("city.badges"),
            ": 0 / ",
            zt.length
          ] }) : null,
          lr.map((B) => {
            const ve = zt.findIndex((Ge) => Ge.id === B.id), Le = w(Ma(B.missionId));
            return /* @__PURE__ */ i.jsxs("li", { className: "city-badge", "data-badge": B.id, children: [
              /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 26, height: 31, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(pl, { x: 0, y: 0, colour: $f(ve) }) }),
              /* @__PURE__ */ i.jsx("span", { className: "city-badge-name", children: Le })
            ] }, B.id);
          })
        ] }),
        n.settings.freeRoam ? /* @__PURE__ */ i.jsxs("span", { className: "city-free-roam", "data-testid": "free-roam", children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-pill", children: w("city.hud.freeRoam") }),
          /* @__PURE__ */ i.jsx("span", { className: "city-free-roam-desc", children: w("city.hud.freeRoamOn") })
        ] }) : null
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "city-storage", "data-testid": "storage-note", children: l }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-icon-btn", onClick: u, "aria-label": w("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(Ka, { size: 24 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "city-toast-anchor", children: /* @__PURE__ */ i.jsx("div", { className: "city-toast-region", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": "city-toast-region", children: $ !== null ? /* @__PURE__ */ i.jsxs("div", { className: `city-toast is-${$.kind}`, "data-testid": `toast-${$.kind}`, children: [
      $.kind === "badge" ? /* @__PURE__ */ i.jsx("svg", { viewBox: "-26 -58 52 62", width: 28, height: 33, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(pl, { x: 0, y: 0, colour: $.colour ?? m.crewZ }) }) : null,
      /* @__PURE__ */ i.jsx("span", { children: $.text })
    ] }) : null }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-body", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "city-map-wrap", "aria-label": w("city.aria.map"), "data-testid": "city-map", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "city-map", onPointerDown: sr, style: { aspectRatio: `${String(Zr)} / ${String(Br)}` }, children: [
          /* @__PURE__ */ i.jsxs("svg", { className: "city-svg", viewBox: `0 0 ${String(Zr)} ${String(Br)}`, preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ i.jsx(oy, { states: ir, showSelection: !1 }),
            kt !== null && _ === null ? /* @__PURE__ */ i.jsx("rect", { className: "city-select-ring", x: kt.x - 8, y: kt.y - 8, width: kt.w + 16, height: kt.h + 16, rx: 18, fill: m.alarmRing, fillOpacity: 0.22, stroke: m.highlight, strokeWidth: 5, strokeDasharray: "14 8" }) : null,
            J && Ke !== null ? /* @__PURE__ */ i.jsxs("g", { className: "city-restore", "data-testid": "restore-fx", children: [
              /* @__PURE__ */ i.jsx("rect", { className: "city-restore-ring", x: Ke.x - 6, y: Ke.y - 6, width: Ke.w + 12, height: Ke.h + 12, rx: 16, fill: "none", stroke: m.success, strokeWidth: 5 }),
              /* @__PURE__ */ i.jsx("g", { className: "city-restore-smoke", children: /* @__PURE__ */ i.jsx(Lh, { x: Ke.smoke.x, y: Ke.smoke.y, scale: 0.9 }) }),
              [0.2, 0.5, 0.8].map((B, ve) => /* @__PURE__ */ i.jsx("g", { className: "city-restore-spark", style: { animationDelay: `${String(ve * 120)}ms` }, children: /* @__PURE__ */ i.jsx(p1, { x: Ke.x + Ke.w * B, y: Ke.y + Ke.h * (0.3 + 0.2 * (ve % 2)) }) }, B))
            ] }) : null,
            dn !== null ? /* @__PURE__ */ i.jsx("path", { ref: ae, d: iy[dn.id], fill: "none", stroke: "none", "data-testid": "travel-road" }) : null,
            ne !== null ? /* @__PURE__ */ i.jsx("g", { className: "city-truck", "data-testid": "travel-truck", children: /* @__PURE__ */ i.jsx(Ya, { x: ne.x, y: ne.y, scale: 0.85, facing: ne.facing, lights: ne.wheelFrame === 0, wheelFrame: ne.wheelFrame, lettering: w("app.lettering") }) }) : null
          ] }),
          zt.map((B) => {
            const ve = j[B.id], Le = Qt(B.missionId), Ge = Xt(B.missionId, b), Zt = w("city.aria.mission", { n: Le.index, name: Ge.districtName, status: Kt(ve), stars: or(B) });
            return /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `city-district is-${ve}${I === B.id ? " is-selected" : ""}`,
                style: o1(B),
                "data-testid": `mission-${String(Le.index)}`,
                "data-district": B.id,
                "data-status": ve,
                "aria-label": Zt,
                "aria-pressed": I === B.id,
                "aria-disabled": _ !== null ? !0 : void 0,
                onClick: () => Re(B.id),
                onKeyDown: (Fn) => f1(Fn, B.id, Z),
                children: /* @__PURE__ */ i.jsxs("span", { className: "city-district-name", "aria-hidden": "true", children: [
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-n", children: Le.index }),
                  /* @__PURE__ */ i.jsx("span", { className: "city-district-text", children: Ge.districtName })
                ] })
              },
              B.id
            );
          })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "city-hint", children: w("city.subtitle") })
      ] }),
      /* @__PURE__ */ i.jsx("aside", { className: `city-panel${be ? " is-open" : ""}`, ref: Se, "aria-labelledby": "city-panel-heading", "data-testid": "city-panel", hidden: !be, children: kt !== null ? /* @__PURE__ */ i.jsx(h1, { box: kt, status: j[kt.id], state: n, headingRef: U, starsText: or(kt), statusLabel: Kt(j[kt.id]), onGo: rr, onClose: nt, travelling: _ !== null }) : null })
    ] }),
    dn !== null ? /* @__PURE__ */ i.jsx("div", { className: "city-travel", onPointerDown: ke, "data-testid": "travel-overlay", children: /* @__PURE__ */ i.jsxs("div", { className: "city-travel-card", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ i.jsx("span", { className: "city-travel-text", children: w("city.truck.travel", { district: Xt(dn.missionId, b).districtName }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn", onClick: ke, "data-testid": "travel-skip", autoFocus: !0, children: w("city.truck.skip") })
    ] }) }) : null
  ] });
}
function f1(n, s, l) {
  let a = null;
  n.key === "ArrowRight" || n.key === "ArrowDown" ? a = Of(s, 1) : n.key === "ArrowLeft" || n.key === "ArrowUp" ? a = Of(s, -1) : n.key === "Home" ? a = zt[0]?.id ?? null : n.key === "End" && (a = zt[zt.length - 1]?.id ?? null), a !== null && (n.preventDefault(), l.current?.querySelector(`button[data-district="${a}"]`)?.focus());
}
function h1({ box: n, status: s, state: l, headingRef: a, starsText: u, statusLabel: f, travelling: p, onGo: g, onClose: y }) {
  const w = Ce(), b = Wt(), j = Qt(n.missionId), C = Xt(n.missionId, b), L = l.progress[n.missionId], O = s === "solved";
  return /* @__PURE__ */ i.jsxs("div", { className: "city-panel-inner", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-head", children: [
      /* @__PURE__ */ i.jsx("h2", { id: "city-panel-heading", className: "city-panel-title", ref: a, tabIndex: -1, children: C.districtName }),
      /* @__PURE__ */ i.jsxs("p", { className: "city-panel-sub", children: [
        /* @__PURE__ */ i.jsxs("span", { children: [
          w("mission.label", { n: j.index }),
          " · ",
          C.kidTitle
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: `city-status is-${s}`, "data-testid": "panel-status", children: f })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("dl", { className: "city-panel-facts", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact", children: [
        /* @__PURE__ */ i.jsx("dt", { children: w("city.select.goal") }),
        /* @__PURE__ */ i.jsx("dd", { children: C.goal })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: w("city.select.best") }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "city-stars", role: "img", "aria-label": u, children: Array.from({ length: j.maxStars }, (R, I) => /* @__PURE__ */ i.jsx(qh, { filled: (L?.stars ?? 0) > I, size: 22 }, I)) }),
          /* @__PURE__ */ i.jsx("span", { className: "city-stars-text", children: u })
        ] })
      ] }),
      O ? /* @__PURE__ */ i.jsxs("div", { className: "city-fact city-fact-row", children: [
        /* @__PURE__ */ i.jsx("dt", { children: w("city.badges") }),
        /* @__PURE__ */ i.jsx("dd", { children: w(Ma(n.missionId)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "city-panel-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-primary", onClick: g, "data-testid": "dispatch-go", "aria-disabled": p ? !0 : void 0, children: w(O ? "city.status.replay" : "city.dispatch") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "city-btn city-btn-ghost", onClick: y, "data-testid": "panel-close", children: w("common.close") })
    ] })
  ] });
}
function qh({ filled: n, size: s }) {
  return /* @__PURE__ */ i.jsx("svg", { width: s, height: s, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: `city-star${n ? " is-filled" : ""}`, children: /* @__PURE__ */ i.jsx("path", { d: "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z", fill: n ? m.alarmRing : m.paper, stroke: m.ink, strokeWidth: 1.6, strokeLinejoin: "round" }) });
}
function p1({ x: n, y: s }) {
  return /* @__PURE__ */ i.jsx("g", { transform: `translate(${String(n)} ${String(s)})`, children: /* @__PURE__ */ i.jsx("path", { d: "M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z", fill: m.windowLit, stroke: m.ink, strokeWidth: 2, strokeLinejoin: "round" }) });
}
const ml = {
  small: { w: 64, h: 74, side: 12 },
  tall: { w: 56, h: 106, side: 12 },
  shop: { w: 84, h: 62, side: 12 }
};
function m1(n, s) {
  return n === "bridge" || n === "lab" ? "small" : n === "houses-row" ? s === 1 ? "tall" : "small" : ["tall", "small", "tall", "small", "shop", "small", "small", "shop", "small"][s] ?? "small";
}
function g1(n, s) {
  return n === "rep3" ? "houses-row" : n === "rsc3" ? "grid" : s.some((l) => l.kind === "H" || l.kind === "S") ? "lab" : "bridge";
}
const y1 = 0.85, Df = 0.8, Ff = 0.55, x1 = 0.5, zf = 0.6, w1 = 0.6, Xf = 64;
function k1(n) {
  return {
    width: 620,
    height: 100 + n * 100,
    lanes: n,
    laneY: (a) => 115 + a * 100,
    stepX: (a, u) => 150 + 320 * (a + 0.5) / Math.max(1, u),
    inX: 80,
    outX: 540
  };
}
function v1(n, s) {
  const l = $e(s).n;
  if (n === "grid" || n === "houses-row") {
    const f = n === "grid" ? Ph : $h, p = f.houses.slice(0, l).map((g) => ({ q: g.q, x: g.x, y: g.y }));
    return {
      kind: n,
      codeId: s,
      width: f.width + Xf,
      height: f.height,
      n: l,
      houses: p,
      houseScale: y1,
      detectors: f.detectors,
      detectorScale: Df,
      truck: { from: { x: -80, y: f.height - 6 }, stop: { x: 62, y: f.height - 6 }, facing: 1, scale: zf },
      crewScale: n === "grid" ? x1 : Ff,
      // The tower stands in the reserved strip, on the ground line of the bottom row, clear of houses and detectors.
      tower: { x: f.width + Xf / 2, y: f.height - 24, scale: 0.5 },
      lanes: null
    };
  }
  const a = k1(l), u = Array.from({ length: l }, (f, p) => ({ q: p, x: a.outX, y: a.laneY(p) + 26 }));
  return {
    kind: n,
    codeId: s,
    width: a.width,
    height: a.height,
    n: l,
    houses: u,
    houseScale: w1,
    detectors: [],
    detectorScale: Df,
    truck: { from: { x: -90, y: 56 }, stop: { x: 96, y: 56 }, facing: 1, scale: zf },
    crewScale: Ff,
    tower: null,
    lanes: a
  };
}
function ic(n, s) {
  const l = n.houses[s];
  if (l === void 0) throw new Error(`scene: no house ${String(s)}`);
  return l;
}
function Hh(n, s, l) {
  const a = ic(n, s), u = ml[l], f = n.houseScale;
  return {
    x: a.x - (u.w / 2 + 10) * f,
    y: a.y - (u.h + 12) * f,
    w: (u.w + u.side + 20) * f,
    h: (u.h + 14) * f + 4
  };
}
function Pa(n, s) {
  const l = ic(n, s);
  return n.lanes !== null ? { x: l.x - 44, y: l.y + 4, facing: 1 } : { x: l.x - 20, y: l.y + 22, facing: 1 };
}
function Na(n, s, l) {
  const a = ic(n, s), u = ml[l], f = n.houseScale, p = l === "shop" ? -10 * f : 0;
  return { x: a.x + p + 2, y: a.y + (-u.h + 14 - 22) * f };
}
function j1(n, s, l) {
  if (l === 0) return (n.inX + n.outX) / 2;
  if (s < 0) return (n.inX + n.stepX(0, l)) / 2;
  const a = n.stepX(Math.min(s, l - 1), l), u = s + 1 < l ? n.stepX(s + 1, l) : n.outX;
  return (a + u) / 2;
}
function gl(n, s, l) {
  return n + (s - n) * l;
}
function Uh(n, s, l) {
  return { x: gl(n.x, s.x, l), y: gl(n.y, s.y, l) };
}
function S1(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function $a(n) {
  const s = S1(n);
  return 1 - (1 - s) * (1 - s);
}
function $n(n, s) {
  if (n == null || n.length === 0) return "I";
  const l = Te(n);
  return s < l.n ? tt(l, s) : "I";
}
function Yh(n) {
  return n === "I" ? null : n;
}
function b1(n, s) {
  if (n.fog) return { kind: "fog" };
  const l = n.atOutput ? $n(n.fires, s) : "I", a = $n(n.crews, s);
  if (n.residual !== null) {
    const u = $n(n.residual, s), f = n.result;
    return u !== "I" ? f === "safe-pattern" ? { kind: "ghost", letter: u } : f === "logical-failure" || f === "prediction-miss" ? { kind: "fire", letter: u } : { kind: "residual", letter: u } : l !== "I" || a !== "I" ? f === null ? { kind: "out" } : { kind: "restored" } : { kind: "normal" };
  }
  return l !== "I" ? { kind: "fire", letter: l } : { kind: "normal" };
}
function Vh(n) {
  const s = n.x.some(Boolean), l = n.z.some(Boolean);
  return s && l ? "Y" : s ? "X" : l ? "Z" : null;
}
const N1 = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function Pr(n, s) {
  return n(N1[s]);
}
function E1(n) {
  return z.useCallback(
    (s, l) => {
      const a = s.key === "ArrowLeft" ? [-1, 0] : s.key === "ArrowRight" ? [1, 0] : s.key === "ArrowUp" ? [0, -1] : s.key === "ArrowDown" ? [0, 1] : null;
      if (a === null) return;
      s.preventDefault();
      const u = n[l];
      if (u === void 0) return;
      let f = -1, p = 1 / 0;
      if (n.forEach((y, w) => {
        if (w === l) return;
        const b = y.x - u.x, j = y.y - u.y, C = b * (a[0] ?? 0) + j * (a[1] ?? 0), L = Math.abs(b * (a[1] ?? 0)) + Math.abs(j * (a[0] ?? 0));
        if (C <= 1) return;
        const O = C + L * 2.5;
        O < p && (p = O, f = w);
      }), f < 0) return;
      s.currentTarget.closest("[data-scene]")?.querySelector(`[data-q="${String(f)}"]`)?.focus();
    },
    [n]
  );
}
function Zs(n) {
  const s = Ce(), l = n.sceneKind ?? g1(n.codeId, n.circuit), a = z.useMemo(() => v1(l, n.codeId), [l, n.codeId]), u = $e(n.codeId), f = n.fog ?? !1, p = n.frame, g = n.circuit.length, y = n.gateCursor ?? g, w = y >= g, b = z.useMemo(() => Array.from({ length: a.n }, (Z, U) => n.houseVariants?.[U] ?? m1(l, U)), [a.n, l, n.houseVariants]), j = n.outcome?.result ?? null, C = z.useMemo(
    () => Array.from(
      { length: a.n },
      (Z, U) => p !== void 0 ? p.houses[U] ?? { kind: "normal" } : b1({ fog: f, fires: n.fires, crews: n.crews, residual: n.residual, result: j, atOutput: w }, U)
    ),
    [a.n, p, f, n.fires, n.crews, n.residual, j, w]
  ), L = p !== void 0 ? p.syndrome : n.syndrome, O = (Z) => L !== null && (L[Z] ?? 0) === 1, R = n.highlightedCheck ?? null, I = R === null ? [] : u.checks[R]?.qubits ?? [], P = z.useMemo(() => a.houses.map((Z) => ({ x: Z.x, y: Z.y - 30 })), [a]), _ = E1(P), V = n.outcome !== void 0 && n.outcome.result === "logical-failure" ? Vh(n.outcome.logicalFlip) : null, ne = n.outcome?.beacon === !0 && a.tower !== null, te = n.outcome?.result === "logical-failure" ? n.outcome.patternQubits : [], J = p?.outcome ?? j, fe = J === "safe-pattern", $ = l === "grid" ? Ph : $h, me = (Z) => n.placements?.[Z] ?? null, he = (Z) => p !== void 0 ? null : me(Z) ?? Yh($n(n.crews, Z)), oe = n.ariaLabel ?? (a.lanes !== null ? s("a11y.boardCircuit") : s("a11y.boardGrid", { code: u.name }));
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: ["scene", `scene-${l}`, `scene-code-${n.codeId}`, n.className ?? ""].filter(Boolean).join(" "),
      role: "group",
      "aria-label": oe,
      "aria-describedby": n.ariaDescribedBy,
      "data-board": !0,
      "data-scene": !0,
      "data-scene-kind": l,
      children: [
        fe ? /* @__PURE__ */ i.jsx("div", { className: "scene-header", "data-testid": "scene-header", children: /* @__PURE__ */ i.jsx("span", { className: "scene-badge scene-badge-safe", "data-testid": "badge-safe", children: s("result.outcome.success") }) }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: "scene-board", style: { aspectRatio: `${String(a.width)} / ${String(a.height)}` }, children: [
          /* @__PURE__ */ i.jsxs("svg", { className: "scene-svg", viewBox: `0 0 ${String(a.width)} ${String(a.height)}`, "aria-hidden": "true", focusable: "false", children: [
            a.lanes !== null ? l === "lab" ? /* @__PURE__ */ i.jsx(yy, { geometry: a.lanes }) : /* @__PURE__ */ i.jsx(my, { geometry: a.lanes }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsx("rect", { className: "tower-strip", x: $.width - 24, y: 0, width: a.width - $.width + 24, height: a.height, rx: 18, fill: m.sand }),
              /* @__PURE__ */ i.jsx(fy, { layout: $ })
            ] }),
            a.lanes !== null ? /* @__PURE__ */ i.jsx(T1, { geo: a, circuit: n.circuit, cursor: y, fires: p !== void 0 ? null : n.fires, lanes: p?.lanes ?? null, inputFires: n.inputFires ?? null, startFaded: J !== null, startLabel: s("result.startBadge") }) : null,
            I.map((Z) => {
              const U = a.houses[Z];
              return U === void 0 ? null : /* @__PURE__ */ i.jsx("g", { className: "watch-tint", "data-watch-q": Z, children: /* @__PURE__ */ i.jsx(py, { x: U.x, y: U.y }) }, `tint-${String(Z)}`);
            }),
            p?.truck !== null && p?.truck !== void 0 ? /* @__PURE__ */ i.jsx(L1, { geo: a, progress: p.truck.progress, lights: p.truck.lights, wheelFrame: p.truck.wheelFrame, lettering: s("app.lettering") }) : null,
            te.length > 0 ? /* @__PURE__ */ i.jsx(Wf, { geo: a, qubits: te, variants: b, part: "connector" }) : null,
            a.houses.map((Z, U) => /* @__PURE__ */ i.jsx("g", { className: `house house-${C[U]?.kind ?? "normal"}`, "data-house": U, "data-house-state": C[U]?.kind ?? "normal", children: /* @__PURE__ */ i.jsx(Ue, { x: Z.x, y: Z.y, tint: U, variant: b[U] ?? "small", state: C[U] ?? { kind: "normal" }, scale: a.houseScale }) }, `house-${String(U)}`)),
            te.length > 0 ? /* @__PURE__ */ i.jsx(Wf, { geo: a, qubits: te, variants: b, part: "outline" }) : null,
            a.houses.map((Z, U) => {
              const Se = he(U);
              if (Se === null) return null;
              const ae = Pa(a, U), le = me(U) !== null;
              return /* @__PURE__ */ i.jsxs("g", { className: le ? "crew-marker crew-planned" : "crew-marker", "data-crew-q": U, "data-crew": Se, children: [
                /* @__PURE__ */ i.jsx(bh, { letter: Se, pose: "idle", facing: ae.facing, x: ae.x, y: ae.y, scale: a.crewScale }),
                le ? /* @__PURE__ */ i.jsx(Ua, { letter: Se, x: Z.x - (ml[b[U] ?? "small"].w / 2 - 4) * a.houseScale, y: Z.y - (ml[b[U] ?? "small"].h + 2) * a.houseScale, scale: 0.45 }) : null
              ] }, `crew-${String(U)}`);
            }),
            p !== void 0 ? /* @__PURE__ */ i.jsx(R1, { geo: a, frame: p, variants: b }) : null,
            R !== null && a.detectors[R] !== void 0 ? /* @__PURE__ */ i.jsx("g", { className: "watch-lines", children: /* @__PURE__ */ i.jsx(hy, { from: a.detectors[R].lamp, to: I.map((Z) => a.houses[Z]).filter((Z) => Z !== void 0) }) }) : null,
            a.detectors.map((Z, U) => /* @__PURE__ */ i.jsx("g", { className: `detector${O(U) ? " is-ringing" : ""}${R === U ? " is-highlighted" : ""}`, "data-detector": Z.id, "data-ringing": O(U) ? "true" : "false", children: /* @__PURE__ */ i.jsx(_s, { type: Z.type, x: Z.x, y: Z.y, ringing: O(U), highlighted: R === U, scale: a.detectorScale }) }, Z.id)),
            ne && a.tower !== null ? /* @__PURE__ */ i.jsx("g", { className: "memory-tower", "data-anomaly": V ?? "none", children: /* @__PURE__ */ i.jsx(jl, { x: a.tower.x, y: a.tower.y, scale: a.tower.scale, anomaly: V, lit: V === null }) }) : null,
            n.children
          ] }),
          a.houses.map((Z, U) => {
            const Se = Hh(a, U, b[U] ?? "small"), ae = {
              left: `${String(Se.x / a.width * 100)}%`,
              top: `${String(Se.y / a.height * 100)}%`,
              width: `${String(Se.w / a.width * 100)}%`,
              height: `${String(Se.h / a.height * 100)}%`
            };
            return /* @__PURE__ */ i.jsx("div", { className: "house-slot", style: ae, children: /* @__PURE__ */ i.jsx(
              C1,
              {
                q: U,
                state: C[U] ?? { kind: "normal" },
                fog: f,
                crew: he(U),
                interactive: n.interactive,
                selected: n.selected,
                budgetReached: n.budgetReached ?? !1,
                watchers: f ? [] : u.checks.filter((le) => le.qubits.includes(U)).map((le) => le.id),
                onToggle: n.onToggle,
                onKeyDown: _,
                tapHint: n.tapHint,
                t: s
              }
            ) }, `slot-${String(U)}`);
          }),
          a.detectors.map((Z, U) => {
            const Se = u.checks[U];
            if (Se === void 0) return null;
            const ae = 16 * a.detectorScale + 10, le = {
              left: `${String((Z.lamp.x - ae) / a.width * 100)}%`,
              top: `${String((Z.lamp.y - ae) / a.height * 100)}%`,
              width: `${String(2 * ae / a.width * 100)}%`,
              height: `${String(2 * ae / a.height * 100)}%`
            }, we = Se.qubits.join(", "), W = s(O(U) ? "a11y.stationRinging" : "a11y.stationQuiet", { station: Se.id, list: we });
            if (n.onToggleDetector === void 0)
              return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: le, children: /* @__PURE__ */ i.jsx("div", { className: "detector-hit", role: "img", "aria-label": W, "data-detector-id": Z.id }) }, `det-${Z.id}`);
            const re = n.onToggleDetector;
            return /* @__PURE__ */ i.jsx("div", { className: "detector-slot", style: le, children: /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `detector-hit${R === U ? " is-pressed" : ""}`,
                "aria-label": W,
                "aria-pressed": R === U,
                "data-testid": `detector-${Z.id}`,
                "data-detector-id": Z.id,
                onClick: () => re(R === U ? null : U)
              }
            ) }, `det-${Z.id}`);
          })
        ] })
      ]
    }
  );
}
function C1({ q: n, state: s, fog: l, crew: a, interactive: u, selected: f, budgetReached: p, watchers: g, onToggle: y, onKeyDown: w, tapHint: b, t: j }) {
  const C = [l ? j("a11y.fogHouse", { q: n }) : j("a11y.house", { q: n })];
  if (g.length > 0 && C.push(j("a11y.watchedBy", { list: g.join(", ") })), !l)
    switch (s.kind) {
      case "fire":
        C.push(j("a11y.fire", { crew: Pr(j, s.letter) }));
        break;
      case "residual":
        C.push(j("a11y.residualFire", { crew: Pr(j, s.letter) }));
        break;
      case "ghost":
        C.push(j("a11y.residualFire", { crew: Pr(j, s.letter) }));
        break;
      case "out":
      case "restored":
        C.push(j("a11y.fireOut"));
        break;
    }
  a !== null && C.push(j("a11y.crew", { crew: Pr(j, a) })), u && b !== void 0 ? C.push(b) : u && (a === null ? C.push(p ? j("a11y.noCrewsLeft") : f === void 0 ? j("a11y.pressToSendAny") : j("a11y.pressToSend", { crew: Pr(j, f) })) : a === f ? C.push(j("a11y.pressToRecall")) : C.push(f === void 0 ? j("a11y.pressToSwitchAny") : j("a11y.pressToSwitch", { crew: Pr(j, f) })));
  const L = C.join(j("spray.list.comma", { a: "", b: "" })), O = ["block", `block-${s.kind}`, a !== null ? "has-crew" : "", p && a === null ? "is-budget-reached" : ""].filter(Boolean).join(" ");
  return u ? /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: O,
      "aria-label": L,
      "aria-pressed": a !== null,
      "data-q": n,
      "data-testid": `block-${String(n)}`,
      onClick: () => y?.(n),
      onKeyDown: (R) => w(R, n),
      children: [
        f !== void 0 && a === null && !p && b === void 0 ? /* @__PURE__ */ i.jsx("span", { className: "crew-preview", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -46 60 50", width: "30", height: "25", focusable: "false", children: /* @__PURE__ */ i.jsx(Ua, { letter: f, x: 0, y: 0 }) }) }) : null,
        a !== null ? /* @__PURE__ */ i.jsx("span", { className: "plan-tag", "aria-hidden": "true", children: j("plan.title") }) : null
      ]
    }
  ) : /* @__PURE__ */ i.jsx("div", { className: O, role: "img", "aria-label": L, "data-q": n, "data-testid": `block-${String(n)}` });
}
function T1({ geo: n, circuit: s, cursor: l, fires: a, lanes: u, inputFires: f, startFaded: p, startLabel: g }) {
  const y = n.lanes;
  if (y === null) return null;
  const w = s.length, b = (P) => P < 0 ? y.inX : P >= w ? y.outX : y.stepX(P, w), j = u !== null ? u.cursor : l, C = u !== null ? u.arrived : j >= w, L = u?.tokens[0], O = L === void 0 ? null : gl(b(L.from), b(L.to), $a(L.progress)), R = u !== null ? O ?? b(Math.min(j, w)) : j1(y, j, w), I = (P, _) => Yh($n(P, _));
  return /* @__PURE__ */ i.jsxs("g", { className: "lanes", children: [
    s.map((P, _) => /* @__PURE__ */ i.jsx("g", { className: _ === j ? "gate is-active" : _ < j ? "gate is-done" : "gate", opacity: _ <= j ? 1 : 0.6, "data-gate-index": _, "data-gate-state": _ === j ? "active" : _ < j ? "done" : "pending", children: /* @__PURE__ */ i.jsx(I1, { gate: P, x: y.stepX(_, w), laneY: y.laneY, active: _ === j }) }, _)),
    C ? null : /* @__PURE__ */ i.jsx("line", { className: "time-cursor", x1: R, y1: 30, x2: R, y2: y.height - 40, stroke: m.alarm, strokeWidth: 2.5, strokeDasharray: "8 6" }),
    Array.from({ length: y.lanes }, (P, _) => {
      const V = I(f, _);
      return V === null ? null : /* @__PURE__ */ i.jsxs("g", { className: p ? "lane-start is-faded" : "lane-start", "data-start-q": _, "data-faded": p ? "true" : "false", opacity: p ? 0.45 : 1, children: [
        /* @__PURE__ */ i.jsx(ba, { letter: V, x: y.inX, y: y.laneY(_) - 6 }),
        p ? /* @__PURE__ */ i.jsx("text", { className: "lane-start-badge", x: y.inX, y: y.laneY(_) + 22, textAnchor: "middle", fontSize: 11, fontWeight: 800, fill: m.inkSoft, fontFamily: nr, style: { userSelect: "none" }, children: g }) : null
      ] }, `in-${String(_)}`);
    }),
    u !== null ? u.tokens.map((P) => {
      const _ = gl(b(P.from), b(P.to), $a(P.progress));
      return /* @__PURE__ */ i.jsx("g", { className: "token lane-token", "data-testid": "lane-token", "data-lane-q": P.q, "data-letter": P.letter, "data-progress": P.progress.toFixed(2), children: /* @__PURE__ */ i.jsx(ba, { letter: P.letter, x: _, y: y.laneY(P.q) - 6 }) }, `tok-${String(P.q)}`);
    }) : C ? null : Array.from({ length: y.lanes }, (P, _) => {
      const V = I(a, _);
      return V === null ? null : /* @__PURE__ */ i.jsx("g", { className: "token", children: /* @__PURE__ */ i.jsx(ba, { letter: V, x: R, y: y.laneY(_) - 6 }) }, `tok-${String(_)}`);
    })
  ] });
}
function I1({ gate: n, x: s, laneY: l, active: a }) {
  switch (n.kind) {
    case "H":
      return /* @__PURE__ */ i.jsx(Ch, { x: s, y: l(n.q) + 24, scale: 0.9, active: a });
    case "S":
      return /* @__PURE__ */ i.jsx(wy, { x: s, y: l(n.q), active: a });
    case "CNOT":
      return /* @__PURE__ */ i.jsx(xy, { x: s, controlY: l(n.c), targetY: l(n.t), active: a });
    case "CZ": {
      const u = a ? m.highlight : m.ink;
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("line", { x1: s, y1: l(n.a), x2: s, y2: l(n.b), stroke: u, strokeWidth: Q * 2 }),
        /* @__PURE__ */ i.jsx("circle", { cx: s, cy: l(n.a), r: 10, fill: u }),
        /* @__PURE__ */ i.jsx("circle", { cx: s, cy: l(n.b), r: 10, fill: u })
      ] });
    }
    case "SWAP": {
      const u = a ? m.highlight : m.ink, f = (p) => /* @__PURE__ */ i.jsxs("g", { stroke: u, strokeWidth: Q * 1.4, children: [
        /* @__PURE__ */ i.jsx("line", { x1: s - 9, y1: p - 9, x2: s + 9, y2: p + 9 }),
        /* @__PURE__ */ i.jsx("line", { x1: s - 9, y1: p + 9, x2: s + 9, y2: p - 9 })
      ] }, p);
      return /* @__PURE__ */ i.jsxs("g", { children: [
        /* @__PURE__ */ i.jsx("line", { x1: s, y1: l(n.a), x2: s, y2: l(n.b), stroke: u, strokeWidth: Q * 2 }),
        f(l(n.a)),
        f(l(n.b))
      ] });
    }
  }
}
function Wf({ geo: n, qubits: s, variants: l, part: a }) {
  const u = s.map((p) => Hh(n, p, l[p] ?? "small"));
  if (u.length === 0) return null;
  const f = u.map((p) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 }));
  return a === "connector" ? f.length > 1 ? /* @__PURE__ */ i.jsx("polyline", { className: "logical-chain-connector", points: f.map((p) => `${String(p.x)},${String(p.y)}`).join(" "), fill: "none", stroke: m.crewY, strokeWidth: Q * 3, strokeDasharray: "12 8", strokeLinejoin: "round", strokeLinecap: "round", opacity: 0.85 }) : null : /* @__PURE__ */ i.jsx("g", { className: "logical-chain", "data-chain": s.join(","), children: u.map((p, g) => /* @__PURE__ */ i.jsx("rect", { x: p.x - 2, y: p.y - 2, width: p.w + 4, height: p.h, rx: 12, fill: "none", stroke: m.crewY, strokeWidth: Q * 1.8, strokeDasharray: "10 6" }, g)) });
}
function L1({ geo: n, progress: s, lights: l, wheelFrame: a, lettering: u }) {
  const f = Uh(n.truck.from, n.truck.stop, $a(s));
  return /* @__PURE__ */ i.jsx("g", { className: "truck", "data-progress": s.toFixed(2), children: /* @__PURE__ */ i.jsx(Ya, { x: f.x, y: f.y, facing: n.truck.facing, lights: l, wheelFrame: a, scale: n.truck.scale, lettering: u }) });
}
function R1({ geo: n, frame: s, variants: l }) {
  const a = { x: n.truck.stop.x + 40 * n.truck.scale, y: n.truck.stop.y };
  return /* @__PURE__ */ i.jsxs("g", { className: "spray-actors", children: [
    s.streams.map((u) => {
      const f = Pa(n, u.q), p = Ug(f.x, f.y, n.crewScale, f.facing);
      return /* @__PURE__ */ i.jsx("g", { className: "stream", "data-stream-q": u.q, "data-progress": u.progress.toFixed(2), children: /* @__PURE__ */ i.jsx(Bg, { from: p, to: Na(n, u.q, l[u.q] ?? "small"), progress: u.progress }) }, `stream-${String(u.q)}`);
    }),
    s.splashes.map((u) => /* @__PURE__ */ i.jsx("g", { className: "splash", "data-splash-q": u.q, children: /* @__PURE__ */ i.jsx(qg, { x: Na(n, u.q, l[u.q] ?? "small").x, y: Na(n, u.q, l[u.q] ?? "small").y + 10, spread: u.spread, scale: 0.8 }) }, `splash-${String(u.q)}`)),
    s.crews.map((u) => {
      const f = Pa(n, u.q), p = Uh(a, f, u.progress), g = u.progress < 1 ? f.x >= a.x ? 1 : -1 : f.facing;
      return /* @__PURE__ */ i.jsx("g", { className: `firefighter pose-${u.pose}`, "data-crew-q": u.q, "data-crew": u.crew, "data-pose": u.pose, children: /* @__PURE__ */ i.jsx(bh, { letter: u.crew, pose: u.pose, facing: g, x: p.x, y: p.y, scale: n.crewScale }) }, `ff-${String(u.q)}`);
    })
  ] });
}
function lc(n, s, l = !1) {
  if (l ? n.t >= s : n.t > s) return;
  if (n.dur <= 0) return 1;
  const a = (s - n.t) / n.dur;
  return a >= 1 ? 1 : a < 0 ? 0 : a;
}
function $r(n) {
  return n === "I" ? { kind: "normal" } : { kind: "fire", letter: n };
}
function al(n, s, l, a) {
  const u = [];
  for (let f = 0; f < n.n; f++) {
    const p = tt(n, f);
    p !== "I" && u.push({ q: f, letter: p, from: s, to: l, progress: a });
  }
  return u;
}
const _1 = 0.4;
function O1(n, s, l) {
  const a = l.strict ?? !1, u = Array.from({ length: l.n }, ($, me) => l.preState(me)), f = n.events.filter(($) => $.type === "gate").length, p = n.events.some(($) => xh.has($.type));
  let g = -1, y = [], w = null;
  const b = /* @__PURE__ */ new Set(), j = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), L = [], O = [];
  let R = null, I = l.initialSyndrome ?? null, P = null, _ = !1, V = !1, ne = -1;
  const te = /* @__PURE__ */ new Set(), J = Math.floor(s / 120) % 2 === 0 ? 0 : 1, fe = Math.floor(s / 150) % 2 === 0 ? "run1" : "run2";
  return n.events.forEach(($, me) => {
    const he = lc($, s, a);
    if (he !== void 0)
      switch (ne = me, $.type) {
        case "fires-start":
          g = -1, y = al(Te($.fires), -1, -1, he);
          break;
        case "gate":
          g = $.index, he < $.travel ? y = al(Te($.before), $.index - 1, $.index, $.travel <= 0 ? 1 : he / $.travel) : y = al(Te($.after), $.index, $.index, 1);
          break;
        case "fires-arrive":
          if (g = f, he < 1)
            y = al(Te($.fires), f - 1, f, he);
          else {
            y = [], w = Te($.fires);
            for (let oe = 0; oe < l.n; oe++) u[oe] = $r(oe < w.n ? tt(w, oe) : "I");
          }
          break;
        case "trucks-arrive":
          R = { progress: he, lights: he < 1, wheelFrame: he < 1 ? J : 0 };
          break;
        case "crew-run":
          C.set($.q, { q: $.q, crew: $.crew, progress: he, pose: he < 1 ? fe : "idle" });
          break;
        case "spray-start":
          C.set($.q, { q: $.q, crew: $.crew, progress: 1, pose: "spray" }), L.push({ q: $.q, progress: he }), b.add($.q), u[$.q] = $r($.before);
          break;
        case "impact": {
          b.add($.q);
          const oe = L.findIndex((Z) => Z.q === $.q);
          he < 1 ? (oe >= 0 && (L[oe] = { q: $.q, progress: 1 }), O.push({ q: $.q, spread: he })) : (oe >= 0 && L.splice(oe, 1), te.add($.q)), he < _1 ? u[$.q] = $r($.before) : $.effect === "extinguished" ? u[$.q] = he < 1 ? { kind: "out" } : { kind: "restored" } : u[$.q] = $r($.after), $.after !== "I" ? j.set($.q, $.after) : j.delete($.q);
          break;
        }
        case "reveal-remaining":
          _ = !0;
          for (let oe = 0; oe < l.n; oe++) {
            if (b.has(oe)) continue;
            const Z = w !== null ? $r(oe < w.n ? tt(w, oe) : "I") : l.preState(oe);
            u[oe] = Z.kind === "fog" ? { kind: "normal" } : Z;
          }
          $.qs.forEach((oe) => {
            const Z = l.residualAt(oe);
            u[oe] = $r(Z), Z !== "I" && j.set(oe, Z);
          });
          break;
        case "alarms":
          I = $.syndrome;
          break;
        case "outcome":
          P = $.result, j.forEach((oe, Z) => {
            oe !== "I" && ($.result === "still-burning" ? u[Z] = { kind: "residual", letter: oe } : $.result === "safe-pattern" ? u[Z] = { kind: "ghost", letter: oe } : u[Z] = { kind: "fire", letter: oe });
          }), $.result === "restored" && b.forEach((oe) => u[oe] = { kind: "restored" });
          break;
        case "done":
          V = !0;
          break;
      }
  }), te.forEach(($) => {
    const me = C.get($);
    me !== void 0 && C.set($, { ...me, pose: "idle" });
  }), {
    houses: u,
    lanes: p ? { cursor: g, tokens: y, arrived: w !== null } : null,
    syndrome: I,
    truck: R,
    crews: [...C.values()].sort(($, me) => $.q - me.q),
    streams: L,
    splashes: O,
    outcome: P,
    revealed: _,
    done: V,
    residualQubits: [...j.keys()].sort(($, me) => $ - me),
    currentEvent: ne
  };
}
const M1 = { X: "crew.X", Z: "crew.Z", Y: "crew.Y" };
function Xr(n, s) {
  return s === "I" ? "" : n(M1[s]);
}
const Qh = {
  restored: "result.type.restored.title",
  "safe-pattern": "result.type.safePattern.title",
  "still-burning": "result.type.stillBurning.title",
  "logical-failure": "result.type.logicalFailure.title",
  "prediction-miss": "result.type.predictionMiss.title"
}, P1 = {
  restored: "result.type.restored.body",
  "safe-pattern": "result.type.safePattern.body",
  "still-burning": "result.type.stillBurning.body",
  "logical-failure": "result.type.logicalFailure.body",
  "prediction-miss": "result.type.predictionMiss.body"
};
function $1(n, s) {
  return s.effect === "extinguished" ? n("spray.extinguished", { q: s.q }) : s.effect === "ignited" ? n("spray.ignited", { q: s.q, after: Xr(n, s.after) }) : n("spray.changed", { q: s.q, before: Xr(n, s.before), after: Xr(n, s.after) });
}
function Zf(n, s) {
  const l = Et(s).map((a) => n("fire.onHouse", { letter: Xr(n, tt(s, a)), q: a }));
  return A1(n, l);
}
function A1(n, s) {
  if (s.length === 0) return "";
  let l = s[0] ?? "";
  for (let a = 1; a < s.length; a++) {
    const u = s[a] ?? "";
    l = a === s.length - 1 ? n("spray.list.and", { a: l, b: u }) : n("spray.list.comma", { a: l, b: u });
  }
  return l;
}
function D1(n) {
  return n === "X" || n === "Y";
}
function F1(n) {
  return n === "Z" || n === "Y";
}
function Bf(n, s) {
  switch (s.kind) {
    case "H":
      return n("spray.gateName.h", { q: s.q });
    case "S":
      return n("spray.gateName.s", { q: s.q });
    case "CNOT":
      return n("spray.gateName.cnot", { c: s.c, t: s.t });
    case "CZ":
      return n("spray.gateName.cz", { a: s.a, b: s.b });
    case "SWAP":
      return n("spray.gateName.swap", { a: s.a, b: s.b });
  }
}
function z1(n, s) {
  const l = Te(s.before), a = n("crew.X"), u = n("crew.Z"), f = s.gate;
  switch (f.kind) {
    case "CNOT": {
      const p = D1(tt(l, f.c)), g = F1(tt(l, f.t));
      return p && g ? n("spray.gate.cnotBoth", { red: a, blue: u, c: f.c, t: f.t }) : p ? n("spray.gate.cnotForward", { red: a, t: f.t }) : g ? n("spray.gate.cnotBackward", { blue: u, c: f.c }) : n("spray.gate.cnotNone");
    }
    case "H":
      return s.changed ? n("spray.gate.h", { q: f.q, red: a, blue: u }) : n("spray.gate.hNone", { q: f.q });
    case "S": {
      const p = tt(l, f.q);
      return p === "X" ? n("spray.gate.s", { q: f.q, red: a, blue: u }) : p === "Y" ? n("spray.gate.sDrop", { q: f.q, mixed: n("crew.Y"), blue: u }) : n("spray.gate.sNone", { q: f.q });
    }
    case "CZ":
    case "SWAP":
      return s.changed ? n("spray.gate.generic", { gate: Bf(n, f), before: s.before, after: s.after }) : n("spray.gate.genericNone", { gate: Bf(n, f), before: s.before });
  }
}
function Kh(n, s, l, a) {
  switch (s.type) {
    case "fires-start": {
      const u = Te(s.fires);
      return Et(u).length > 0 ? n("spray.firesStart", { list: Zf(n, u) }) : n("spray.firesStart.none");
    }
    case "gate":
      return l < s.travel ? null : z1(n, s);
    case "fires-arrive": {
      if (l < 1) return null;
      const u = Te(s.fires);
      return Et(u).length > 0 ? n("spray.firesArrive", { list: Zf(n, u) }) : n("spray.firesArrive.none");
    }
    case "trucks-arrive":
      return n("spray.trucksArrive", { district: a.district });
    case "crew-run":
      return n("spray.crewRun", { crew: Xr(n, s.crew), q: s.q });
    case "spray-start":
      return n("spray.sprayStart", { crew: Xr(n, s.crew), q: s.q });
    case "impact":
      return `${n("spray.splash")} ${$1(n, s)}`;
    case "reveal-remaining":
      return s.qs.length > 0 ? n("spray.revealRemaining") : null;
    case "alarms":
      return a.hasChecks ? n("spray.alarms") : null;
    case "outcome":
      return n(Qh[s.result]);
    case "done":
      return n("spray.done");
  }
}
function Gh(n, s, l, a, u = !1) {
  let f = "";
  for (const p of s.events) {
    const g = lc(p, l, u);
    if (g === void 0) break;
    const y = Kh(n, p, g, a);
    y !== null && (f = y);
  }
  return f;
}
const X1 = /* @__PURE__ */ new Set(["fires-arrive", "trucks-arrive", "impact", "outcome"]);
function Jh(n, s, l, a, u = !1) {
  let f = "";
  for (const p of s.events) {
    const g = lc(p, l, u);
    if (g === void 0) break;
    if (!X1.has(p.type)) continue;
    const y = Kh(n, p, g, a);
    y !== null && (f = y);
  }
  return f;
}
function W1(n, s) {
  if (s !== void 0) return s;
  try {
    return Qt(n).kind;
  } catch {
    return "dispatch";
  }
}
function Z1(n, s, l, a = !1) {
  const u = Te(n.fires), f = Te(n.residual), p = (g) => {
    if (l === "dispatch") return { kind: "fog" };
    if (a) return { kind: "normal" };
    const y = $n(n.fires, g);
    return y === "I" ? { kind: "normal" } : { kind: "fire", letter: y };
  };
  return {
    n: Math.max(s, u.n, f.n),
    preState: p,
    residualAt: (g) => $n(n.residual, g),
    initialSyndrome: n.syndromeOfFires.length > 0 ? n.syndromeOfFires : null
  };
}
function B1(n, s) {
  if (s.outcome === null) return;
  const l = tr(n.missionId)?.hasBeacon ?? !1;
  return {
    result: s.outcome,
    logicalFlip: n.logicalFlip,
    patternQubits: Et(Te(n.residual)),
    beacon: l || s.outcome === "logical-failure"
  };
}
function q1(n) {
  const s = n.alternative;
  return { ...n, crews: s.crews, residual: s.residual, syndromeOfResidual: s.syndromeOfResidual, verdict: s.verdict, logicalFlip: s.logicalFlip };
}
function ep(n) {
  const s = Te(n.debrief.fires).n, l = W1(n.debrief.missionId, n.missionKind), a = Tg(n.timeline), u = z.useMemo(() => Z1(n.debrief, s, l, a), [n.debrief, s, l, a]), f = z.useMemo(() => O1(n.timeline, n.time, { ...u, strict: n.strict ?? !1 }), [n.timeline, n.time, u, n.strict]), p = B1(n.debrief, f), g = n.codeId === "trivial2" || n.codeId === "trivial3", y = f.lanes !== null ? f.lanes.cursor : n.circuit.length;
  return /* @__PURE__ */ i.jsx(
    Zs,
    {
      codeId: n.codeId,
      circuit: n.circuit,
      sceneKind: n.sceneKind,
      fires: n.debrief.fires,
      crews: null,
      residual: null,
      syndrome: f.syndrome,
      interactive: !1,
      gateCursor: g ? y : void 0,
      inputFires: g ? n.debrief.startFires : null,
      frame: f,
      outcome: p,
      ariaLabel: n.ariaLabel,
      ariaDescribedBy: n.ariaDescribedBy,
      className: n.className
    }
  );
}
function qf() {
  return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
}
function Hf(n) {
  if (typeof requestAnimationFrame == "function") {
    const l = requestAnimationFrame(n);
    return () => cancelAnimationFrame(l);
  }
  const s = setTimeout(n, 16);
  return () => clearTimeout(s);
}
function tp(n, s) {
  const l = n.durationMs, a = Math.max(1, n.events.length), [u, f] = z.useState(0), [p, g] = z.useState(0), [y, w] = z.useState(0), b = z.useRef(!1);
  z.useEffect(() => {
    if (s) return;
    b.current = !1;
    const P = qf();
    let _ = null, V = !0;
    const ne = () => {
      if (!V || b.current) return;
      const te = qf() - P;
      if (te >= l) {
        f(l);
        return;
      }
      f(te), _ = Hf(ne);
    };
    return _ = Hf(ne), () => {
      V = !1, _?.();
    };
  }, [l, s, y]);
  const j = z.useCallback(() => {
    b.current = !0, f(l), g(a - 1);
  }, [l, a]), C = z.useCallback(() => {
    b.current = !1, f(0), g(0), w((P) => P + 1);
  }, []), L = z.useCallback(() => g((P) => Math.min(a - 1, P + 1)), [a]), O = z.useCallback(() => g((P) => Math.max(0, P - 1)), []);
  if (s) {
    const P = Math.min(p, a - 1);
    return { time: P + 1, step: P, steps: a, finished: P >= a - 1, skip: j, restart: C, next: L, prev: O };
  }
  const R = Math.min(u, l);
  let I = -1;
  return n.events.forEach((P, _) => {
    P.t <= R && (I = _);
  }), { time: R, step: I, steps: a, finished: R >= l, skip: j, restart: C, next: L, prev: O };
}
function H1(n) {
  const s = Ce(), l = tp(n.timeline, n.reducedMotion), a = z.useRef(!1), u = n.onDone;
  z.useEffect(() => {
    l.finished && !a.current && (a.current = !0, u());
  }, [l.finished, u]);
  const f = $e(n.codeId).checks.length > 0, p = { district: n.missionCopy.districtName, hasChecks: f }, g = Gh(s, n.timeline, l.time, p, n.reducedMotion), y = Jh(s, n.timeline, l.time, p, n.reducedMotion), w = s("motion.stepper.frame", { n: l.step + 1, total: l.steps });
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
          ep,
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
        /* @__PURE__ */ i.jsx("p", { className: "spray-sr", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": "spray-announcer", children: y }),
        n.reducedMotion ? /* @__PURE__ */ i.jsxs("div", { className: "spray-stepper", role: "group", "aria-label": s("motion.stepper.title"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", "data-testid": "spray-prev", onClick: l.prev, disabled: l.step <= 0, children: s("motion.stepper.prev") }),
          /* @__PURE__ */ i.jsx("span", { className: "spray-step-label", "data-testid": "spray-step", children: w }),
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
function U1(n) {
  const s = Ce(), l = z.useId(), { result: a, debrief: u } = n, f = Te(u.residual), p = Et(f), g = a === "logical-failure" ? Vh(u.logicalFlip) : null, y = n.maxStars === 1 ? s("result.starsOf.one", { stars: n.stars }) : s("result.starsOf.other", { stars: n.stars, max: n.maxStars }), w = g === "Y" ? s("result.beacon.logicalXZ") : g === "X" ? s("result.beacon.logicalX") : g === "Z" ? s("result.beacon.logicalZ") : null, b = tr(u.missionId)?.hasBeacon ?? !1, j = b && (a === "restored" || a === "safe-pattern"), C = $n(u.residual, p[0] ?? 0), L = C === "I" ? "X" : C;
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
            a === "restored" ? /* @__PURE__ */ i.jsx(Sh, { x: 0, y: -20, scale: 1.4 }) : null,
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx(cn, { letter: L, x: 0, y: -4, scale: 0.95, ghost: !0 }) : null,
            a === "still-burning" ? /* @__PURE__ */ i.jsx(cn, { letter: L, x: 0, y: -4, scale: 0.95, residual: !0 }) : null,
            a === "prediction-miss" ? /* @__PURE__ */ i.jsx(cn, { letter: L, x: 0, y: -4, scale: 0.95 }) : null,
            a === "logical-failure" ? /* @__PURE__ */ i.jsx(jl, { x: 0, y: 0, scale: 0.5, anomaly: g }) : null
          ] }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "result-titles", children: [
            /* @__PURE__ */ i.jsx("h2", { id: l, className: "result-title", tabIndex: -1, "data-focus-target": !0, "data-testid": "result-title", children: s(Qh[a]) }),
            /* @__PURE__ */ i.jsxs("p", { className: "result-stars", "data-testid": "result-stars", "aria-label": y, children: [
              /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: Array.from({ length: n.maxStars }, (O, R) => /* @__PURE__ */ i.jsx("span", { className: R < n.stars ? "star star-on" : "star", children: R < n.stars ? "★" : "☆" }, R)) }),
              " ",
              /* @__PURE__ */ i.jsx("span", { className: "result-stars-text", children: y })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "result-reaction", "data-testid": "result-reaction", children: Xh(n.missionCopy, a) }),
        /* @__PURE__ */ i.jsx("p", { className: "result-body", children: s(P1[a]) }),
        w !== null ? /* @__PURE__ */ i.jsxs("p", { className: "result-beacon", "data-testid": "result-beacon", children: [
          /* @__PURE__ */ i.jsx("strong", { children: w }),
          " ",
          s("result.beacon.pattern", { pattern: u.residual })
        ] }) : null,
        j ? /* @__PURE__ */ i.jsx("p", { className: "result-beacon result-beacon-ok", "data-testid": "result-beacon-ok", children: s("result.beacon.ok") }) : null,
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
            a === "safe-pattern" ? /* @__PURE__ */ i.jsx("p", { children: s("result.type.safePattern.details", { residual: u.residual }) }) : null,
            a === "logical-failure" || b ? /* @__PURE__ */ i.jsx("p", { className: "muted", children: s("result.beacon.note") }) : null,
            n.children
          ] })
        ] })
      ]
    }
  );
}
function Y1(n, s) {
  return n.durationMs >= s.durationMs ? n : s;
}
const V1 = { success: "result.outcome.success", "logical-error": "result.outcome.logicalError", detectable: "result.outcome.detectable" }, Q1 = { success: "result.outcome.success", "logical-error": "result.outcome.propagationMiss", detectable: "result.outcome.detectable" }, Uf = (n) => n.every((s) => s === 0);
function K1(n) {
  const s = Ce(), { mine: l } = n, a = z.useMemo(() => q1(l), [l]), u = z.useMemo(() => La(l, n.reducedMotion, { propagation: !1 }), [l, n.reducedMotion]), f = z.useMemo(() => La(a, n.reducedMotion, { propagation: !1 }), [a, n.reducedMotion]), p = Y1(u, f), g = tp(p, n.reducedMotion), y = $e(n.codeId).checks.length > 0, w = { district: n.missionCopy.districtName, hasChecks: y }, b = y ? V1 : Q1, j = a.crews === l.crews, C = y && !j && l.verdict === "success" && a.verdict === "success", L = y && !j && l.verdict !== a.verdict && Uf(l.syndromeOfResidual) && Uf(a.syndromeOfResidual), O = j ? s(y ? "why.identical" : "why.identicalWires") : C ? s("why.equivalent") : L ? `${s("why.sameAlarms")} ${s("why.cannotDecide")}` : n.missionCopy.whyShort, R = l.alternative.kind === "true-fires" ? s("why.trueFires") : s(y ? "why.decoder" : "why.trueEnd"), I = (P, _, V, ne) => /* @__PURE__ */ i.jsxs("div", { className: "why-pane", "data-testid": ne, children: [
    /* @__PURE__ */ i.jsx("h3", { className: "why-pane-title", children: P }),
    /* @__PURE__ */ i.jsx(ep, { codeId: n.codeId, circuit: n.circuit, sceneKind: n.sceneKind, debrief: _, timeline: V, time: g.time, strict: n.reducedMotion, ariaLabel: P }),
    /* @__PURE__ */ i.jsx("p", { className: "why-caption", children: Gh(s, V, g.time, w, n.reducedMotion) }),
    /* @__PURE__ */ i.jsx("p", { className: "spray-sr", role: "status", "aria-live": "polite", "aria-atomic": "true", "data-testid": `${ne}-announcer`, children: Jh(s, V, g.time, w, n.reducedMotion) }),
    /* @__PURE__ */ i.jsx("p", { className: "why-verdict", children: s("why.verdict", { verdict: s(b[_.verdict]) }) })
  ] });
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: "why-compare",
      "aria-label": s("why.title"),
      "data-testid": "why-compare",
      "data-finished": g.finished ? "true" : "false",
      "data-alternative": l.alternative.kind,
      "data-relation": j ? "identical" : C ? "equivalent" : L ? "undecidable" : "other",
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "why-panes", children: [
          I(s("why.yours"), l, u, "why-mine"),
          I(`${s("why.alternative")} · ${R}`, a, f, "why-alt")
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "why-explanation", "data-testid": "why-explanation", children: O }),
        L && l.verdict === "logical-error" ? /* @__PURE__ */ i.jsx("p", { className: "why-noblame", children: s("why.noBlame") }) : null,
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
const G1 = { "local-simulator": "cloud.source.local", "cached-cloud": "cloud.source.cached", "live-cloud": "cloud.source.live" }, J1 = "(max-width: 1023px)";
function ex(n) {
  const [s, l] = z.useState(() => {
    try {
      return globalThis.matchMedia?.(n).matches ?? !1;
    } catch {
      return !1;
    }
  });
  return z.useEffect(() => {
    let a;
    try {
      a = globalThis.matchMedia?.(n);
    } catch {
      a = void 0;
    }
    if (a === void 0) return;
    const u = (f) => l(f.matches);
    return a.addEventListener("change", u), () => a?.removeEventListener("change", u);
  }, [n]), s;
}
function tx({ state: n, dispatch: s, mission: l }) {
  const a = Ce(), u = Wt(), f = l.training[n.lesson], p = z.useId(), [g, y] = z.useState(null), w = z.useRef(null);
  z.useEffect(() => {
    g !== null && w.current?.focus({ preventScroll: !0 });
  }, [g]);
  const b = Xt(l.id, u);
  if (f === void 0) return null;
  const j = $e(l.code), C = Te(f.fire), L = kl(C, f.circuit), O = n.lessonCursor, R = L.frames[O + 1] ?? C, I = Ee(R), P = f.circuit.length > 0 || j.checks.length === 0, _ = j.checks.length > 0 ? an(Wr(j, R)) : null, V = l.training.length, ne = O >= f.circuit.length - 1, te = n.lesson === V - 1, J = f.circuit.length > 0 && !ne, fe = a(ne ? te ? "training.startDispatch" : "training.nextLesson" : "training.nextStep"), $ = (oe) => {
    J && (y({ lesson: n.lesson, cursor: O + 1, q: oe }), s({ type: "LESSON_NEXT" }));
  }, me = g !== null && g.lesson === n.lesson && g.cursor === O ? tt(R, g.q) !== "I" ? a("training.predict.hit", { q: g.q }) : a("training.predict.miss", { q: g.q }) : null, he = Fy(l.id, n.lesson, u, f.caption);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-training", children: [
    /* @__PURE__ */ i.jsx(
      un,
      {
        title: b.districtName,
        subtitle: a("training.subtitle", { n: n.lesson + 1, total: V }),
        onMissions: () => s({ type: "OPEN_MISSIONS" }),
        onSettings: () => s({ type: "OPEN_SETTINGS" })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": a("training.boardLabel"), children: [
        /* @__PURE__ */ i.jsx(
          Zs,
          {
            codeId: l.code,
            circuit: f.circuit,
            fires: I,
            crews: null,
            residual: null,
            syndrome: _,
            interactive: J,
            onToggle: $,
            tapHint: a("a11y.pressToPredict"),
            gateCursor: P ? O : void 0,
            inputFires: P ? f.fire : null,
            ariaDescribedBy: p,
            ariaLabel: a("training.board")
          }
        ),
        J ? /* @__PURE__ */ i.jsxs("p", { className: "predict-prompt", "data-testid": "predict-prompt", role: "status", children: [
          /* @__PURE__ */ i.jsx("strong", { children: a("training.predictTap") }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "muted", children: a("training.predict.waiting") })
        ] }) : null,
        me !== null ? /* @__PURE__ */ i.jsx("p", { className: "predict-reaction", "data-testid": "predict-reaction", role: "status", tabIndex: -1, ref: w, children: me }) : null,
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: p, "aria-live": "polite", "data-testid": "training-caption", children: [
          f.circuit.length > 0 ? /* @__PURE__ */ i.jsxs("strong", { className: "mono-lead", children: [
            O < 0 ? a("training.start") : a("training.afterGate", { n: O + 1, total: f.circuit.length }),
            " ",
            /* @__PURE__ */ i.jsx("span", { className: "mono", children: I })
          ] }) : null,
          " ",
          he
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", "aria-label": a("training.lesson"), children: [
        j.checks.length > 0 ? /* @__PURE__ */ i.jsx(Xs, { codeId: l.code, syndrome: _ }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("training.lesson") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: b.lessonOneLiner }),
          /* @__PURE__ */ i.jsx("ol", { className: "lesson-dots", "aria-label": a("training.lessons"), children: l.training.map((oe, Z) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${Z === n.lesson ? " is-current" : ""}`, "aria-current": Z === n.lesson ? "step" : void 0, onClick: () => s({ type: "LESSON_SELECT", lesson: Z }), "aria-label": a("training.lessonLabel", { n: Z + 1, fires: Hy(a, oe.fire) }), children: Z + 1 }) }, Z)) }),
          /* @__PURE__ */ i.jsx(Bh, { allowed: l.allowed, alarms: j.checks.length > 0 })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => s({ type: "LESSON_PREV" }), disabled: n.lesson === 0 && O <= -1, "data-testid": "training-prev", children: a("training.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => s({ type: "LESSON_NEXT" }), disabled: J, "aria-disabled": J, "data-testid": "training-next", children: fe }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "start-challenge", children: a("training.skip") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => s({ type: "BACK_TO_BRIEFING" }), "data-testid": "back-to-briefing", children: a("briefing.back") })
        ] })
      ] })
    ] })
  ] });
}
const Yf = {
  1: { title: "tutorial.step1", body: "tutorial.step1.body" },
  2: { title: "tutorial.step2", body: "tutorial.step2.body" },
  3: { title: "tutorial.step3", body: "tutorial.step3.body" }
};
function nx({ step: n, current: s, title: l, body: a }) {
  const u = n < s, f = n === s;
  return /* @__PURE__ */ i.jsxs("div", { className: `callout${f ? " is-active" : ""}${u ? " is-done" : ""}`, "data-testid": `tutorial-callout-${String(n)}`, "data-active": f ? "true" : "false", "data-done": u ? "true" : "false", "aria-current": f ? "step" : void 0, children: [
    /* @__PURE__ */ i.jsx("span", { className: "callout-n", "aria-hidden": "true", children: u ? "✓" : n }),
    /* @__PURE__ */ i.jsxs("span", { className: "callout-text", children: [
      /* @__PURE__ */ i.jsx("strong", { children: l }),
      " ",
      /* @__PURE__ */ i.jsx("span", { children: a })
    ] })
  ] });
}
function rx({ mission: n, placements: s, selected: l, standDownDialog: a, highlightedCheck: u, canUndo: f, canRedo: p, tutorialActive: g, dispatch: y }) {
  const w = Ce(), b = Wt(), j = z.useId(), C = z.useRef(null), L = Xt(n.id, b), O = Fr(s), R = O >= n.budget, I = n.kind === "propagation", P = I ? null : n.syndrome, [_, V] = z.useState(!1), ne = _ ? O === 0 ? 2 : 3 : 1, te = ex(J1);
  z.useEffect(() => {
    const ae = (le) => {
      if (a || le.metaKey || le.ctrlKey || le.altKey) return;
      const we = le.target instanceof HTMLElement ? le.target : null, W = C.current;
      if (we === null || W === null || !W.contains(we) || we.tagName === "INPUT" || we.tagName === "TEXTAREA") return;
      const q = { 1: "X", 2: "Z", 3: "Y" }[le.key];
      if (q !== void 0) {
        n.allowed.includes(q) && (y({ type: "SELECT_LETTER", letter: q }), V(!0)), le.preventDefault();
        return;
      }
      if (le.key === "Backspace" || le.key === "Delete") {
        const S = we.closest("button.block[data-q]"), M = S === null ? NaN : Number(S.dataset.q);
        Number.isInteger(M) ? y({ type: "RECALL_BLOCK", qubit: M }) : y({ type: "CLEAR_CREWS" }), le.preventDefault();
        return;
      }
      (le.key === "c" || le.key === "C") && (y({ type: "CONFIRM" }), le.preventDefault());
    };
    return document.addEventListener("keydown", ae), () => document.removeEventListener("keydown", ae);
  }, [y, n.allowed, a]);
  const J = n.visibleStart === null ? [] : Array.from(n.visibleStart).map((ae, le) => ({ q: le, l: ae })).filter((ae) => ae.l !== "I"), fe = Object.entries(s).sort(([ae], [le]) => Number(ae) - Number(le)), $ = (ae) => /* @__PURE__ */ i.jsx(nx, { step: ae, current: ne, title: w(Yf[ae].title), body: w(Yf[ae].body) }), me = I ? null : /* @__PURE__ */ i.jsx(Xs, { codeId: n.code, syndrome: P, compact: $e(n.code).checks.length > 4, hint: w("challenge.detector.hint") }), he = /* @__PURE__ */ i.jsx(
    Qy,
    {
      allowed: n.allowed,
      selected: l,
      onSelect: (ae) => {
        y({ type: "SELECT_LETTER", letter: ae }), V(!0);
      },
      callout: g && !te ? $(1) : void 0
    }
  ), oe = /* @__PURE__ */ i.jsx(
    Zs,
    {
      codeId: n.code,
      circuit: n.circuit,
      fires: null,
      crews: null,
      placements: s,
      residual: null,
      syndrome: P,
      fog: !I,
      interactive: !0,
      onToggle: (ae) => y({ type: "TOGGLE_BLOCK", qubit: ae }),
      selected: l,
      budgetReached: R,
      highlightedCheck: u,
      onToggleDetector: I ? void 0 : (ae) => y({ type: "TOGGLE_DETECTOR_HIGHLIGHT", checkIndex: ae }),
      gateCursor: I ? n.circuit.length : void 0,
      inputFires: I ? n.visibleStart : null,
      ariaDescribedBy: j
    }
  ), Z = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: j, children: [
      I ? w("challenge.startingFire", { fires: J.map((ae) => w("challenge.startToken", { letter: ae.l, q: ae.q })).join(w("spray.list.comma", { a: "", b: "" })) }) : `${w("challenge.fog")} ${rc(w, n.code, P)}`,
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: w("challenge.tapHint") })
    ] }),
    !I && u !== null ? /* @__PURE__ */ i.jsx("p", { className: "muted small", "data-testid": "detector-watch", children: w("challenge.detector.watches", { station: $e(n.code).checks[u]?.id ?? "", list: ($e(n.code).checks[u]?.qubits ?? []).join(", ") }) }) : null
  ] }), U = /* @__PURE__ */ i.jsxs("section", { className: "panel-section plan", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: w("plan.title") }),
    /* @__PURE__ */ i.jsxs("p", { className: "budget", "data-testid": "budget", "aria-live": "polite", children: [
      w("challenge.crews", { used: O, budget: n.budget }),
      R ? /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        " · ",
        w("challenge.budgetReached")
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("ul", { className: "placement-list", "aria-label": w("challenge.placed"), children: [
      fe.map(([ae, le]) => /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsx(er, { letter: le, size: 22 }),
        " ",
        w("challenge.placement", { letter: le, q: ae })
      ] }, ae)),
      O === 0 ? /* @__PURE__ */ i.jsx("li", { className: "muted", children: w("plan.empty") }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small", children: w("plan.hint") }),
    /* @__PURE__ */ i.jsxs("div", { className: "plan-tools", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => y({ type: "REDO_PLACEMENT" }), disabled: !p, "data-testid": "redo", children: w("plan.redo") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => y({ type: "CLEAR_CREWS" }), disabled: O === 0, "data-testid": "clear", children: w("plan.clear") }),
      g ? null : /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small btn-ghost", onClick: () => y({ type: "BACK_TO_BRIEFING" }), "data-testid": "back-to-briefing", children: w("briefing.back") })
    ] })
  ] }), Se = /* @__PURE__ */ i.jsxs("div", { className: "actions action-bar", "data-testid": "action-bar", children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => y({ type: "UNDO_PLACEMENT" }), disabled: !f, "data-testid": "undo", children: w("plan.undo") }),
    /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-spray", onClick: () => y({ type: "CONFIRM" }), "data-testid": "confirm", children: w("challenge.spray") })
  ] });
  return /* @__PURE__ */ i.jsxs("main", { className: `screen screen-play screen-challenge${g ? " is-tutorial" : ""}`, ref: C, "data-tutorial": g ? "true" : "false", "data-layout": te ? "compact" : "wide", children: [
    /* @__PURE__ */ i.jsx(
      un,
      {
        title: L.districtName,
        subtitle: w(I ? "challenge.subtitle.predict" : "challenge.subtitle.dispatch"),
        onMissions: () => y({ type: "OPEN_MISSIONS" }),
        onSettings: () => y({ type: "OPEN_SETTINGS" })
      }
    ),
    g ? /* @__PURE__ */ i.jsxs("div", { className: "tutorial-bar", "data-testid": "tutorial-bar", children: [
      /* @__PURE__ */ i.jsxs("p", { className: "tutorial-intro", children: [
        /* @__PURE__ */ i.jsx("strong", { children: w("tutorial.title") }),
        " ",
        w("tutorial.intro")
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-small", onClick: () => y({ type: "TUTORIAL_SKIP" }), "data-testid": "tutorial-skip", children: w("tutorial.skip") })
    ] }) : null,
    te ? /* @__PURE__ */ i.jsxs("div", { className: "play-layout play-layout-challenge is-compact", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": w("challenge.board"), children: [
        g ? /* @__PURE__ */ i.jsxs("ol", { className: "tutorial-strip", "data-testid": "tutorial-strip", "aria-label": w("a11y.tutorialSteps"), children: [
          /* @__PURE__ */ i.jsx("li", { children: $(1) }),
          /* @__PURE__ */ i.jsx("li", { children: $(2) }),
          /* @__PURE__ */ i.jsx("li", { children: $(3) })
        ] }) : null,
        oe,
        Z
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-before", "aria-label": w("a11y.alarmsAndCrews"), children: [
        he,
        me
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-after", "aria-label": w("plan.title"), children: [
        U,
        Se
      ] })
    ] }) : /* @__PURE__ */ i.jsxs("div", { className: "play-layout play-layout-challenge", children: [
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-before", "aria-label": w("a11y.alarmsAndCrews"), children: [
        g ? he : me,
        g ? me : he
      ] }),
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": w("challenge.board"), children: [
        oe,
        g ? $(2) : null,
        Z
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel panel-after", "aria-label": w("plan.title"), children: [
        U,
        g ? $(3) : null,
        Se
      ] })
    ] }),
    a ? /* @__PURE__ */ i.jsx(Zh, { title: w("challenge.standDown.title"), confirmLabel: w("challenge.standDown.confirm"), cancelLabel: w("challenge.standDown.cancel"), onConfirm: () => y({ type: "STAND_DOWN_CONFIRM" }), onCancel: () => y({ type: "STAND_DOWN_CANCEL" }), children: /* @__PURE__ */ i.jsx("p", { children: w("challenge.standDown.body") }) }) : null
  ] });
}
function np(n) {
  const s = vl(n), l = tr(n.missionId)?.hasBeacon ?? !1;
  return { result: s, logicalFlip: n.logicalFlip, patternQubits: Rg(n), beacon: l || s === "logical-failure" };
}
function sx({ state: n, mission: s, debrief: l, bridge: a, children: u }) {
  const f = Ce(), p = Wt(), g = $e(s.code), y = l.score;
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
          f(tc[y.quality]),
          " · ",
          /* @__PURE__ */ i.jsx(Ws, { count: y.stars, max: y.maxStars, size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.outcome") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "verdict-label", children: f(Sl(y.outcome, g.checks.length > 0)) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.cost") }),
        /* @__PURE__ */ i.jsx("dd", { children: y.crewsUsed === 1 ? f("result.costText.one", { min: y.minCrews }) : f("result.costText.other", { used: y.crewsUsed, min: y.minCrews }) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: f("result.attempts") }),
        /* @__PURE__ */ i.jsx("dd", { "data-testid": "attempts", children: n.progress[s.id]?.attempts ?? 1 })
      ] })
    ] }),
    g.checks.length > 0 ? /* @__PURE__ */ i.jsx(Xs, { codeId: s.code, syndrome: l.syndromeOfResidual, compact: !0 }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: zh(s.id, l.verdict, p, l.narrative) }),
    u,
    /* @__PURE__ */ i.jsx(rp, { bridge: a, missionId: s.id, correction: l.crews }, `${s.id}:${l.crews}`)
  ] });
}
function ix(n) {
  const { state: s, dispatch: l, mission: a, debrief: u, reducedMotion: f } = n, p = Ce(), g = Wt(), y = Xt(a.id, g), w = z.useMemo(() => La(u, f), [u, f]), b = z.useCallback(() => l({ type: "DISPATCH_DONE" }), [l]), j = a.index === An().length, { nextLabel: C, primary: L } = nc(p, u, j, s.tutorialActive), O = a.kind === "propagation", R = $e(a.code).checks.length > 0;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-dispatch", "data-dispatch-done": s.dispatchDone ? "true" : "false", children: [
    /* @__PURE__ */ i.jsx(un, { title: y.districtName, subtitle: p("dispatch.subtitle"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    s.dispatchDone ? /* @__PURE__ */ i.jsxs("div", { className: "scene-stage", "data-testid": "dispatch-result", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "board-col", children: [
        /* @__PURE__ */ i.jsx("h2", { className: "spray-title", children: p("dispatch.answerCheck") }),
        /* @__PURE__ */ i.jsx(
          Zs,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: u.fires,
            crews: u.crews,
            residual: u.residual,
            syndrome: u.syndromeOfResidual,
            interactive: !1,
            outcome: np(u),
            gateCursor: O ? a.circuit.length : void 0,
            inputFires: O ? u.startFires : null,
            ariaLabel: p("dispatch.answerCheck")
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
      ] }),
      /* @__PURE__ */ i.jsx(
        U1,
        {
          debrief: u,
          result: vl(u),
          missionCopy: y,
          stars: u.score.stars,
          maxStars: u.score.maxStars,
          onWhy: () => l({ type: "OPEN_WHY", reducedMotion: f }),
          onRetry: () => l({ type: "TRY_AGAIN" }),
          onNext: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }),
          nextLabel: C,
          className: L === "retry" ? "is-primary-retry" : void 0,
          children: /* @__PURE__ */ i.jsx(sx, { ...n, children: /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "OPEN_WHY", reducedMotion: f }), "data-testid": "step-by-step", children: p("debrief.stepByStep") }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-small", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") })
          ] }) })
        }
      )
    ] }) : /* @__PURE__ */ i.jsxs("div", { className: `dispatch-live${R ? " has-alarms" : ""}`, "data-testid": "dispatch-live", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "dispatch-stage", children: [
        /* @__PURE__ */ i.jsx(H1, { codeId: a.code, circuit: a.circuit, debrief: u, timeline: w, reducedMotion: f, onDone: b, missionCopy: y }, `${u.missionId}:${u.crews}:${String(s.progress[a.id]?.attempts ?? 0)}`),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("dispatch.answerCheck.note") })
      ] }),
      R ? /* @__PURE__ */ i.jsx("aside", { className: "dispatch-alarms", "aria-label": p("alarms.title"), "data-testid": "dispatch-alarms", children: /* @__PURE__ */ i.jsx(Xs, { codeId: a.code, syndrome: a.syndrome, compact: $e(a.code).checks.length > 4 }) }) : null
    ] })
  ] });
}
function lx(n) {
  const { state: s, dispatch: l, mission: a, debrief: u, reducedMotion: f } = n, p = Ce(), g = Wt(), y = Xt(a.id, g), w = $e(a.code), b = u.steps[s.replayIndex] ?? u.steps[u.steps.length - 1], j = z.useId();
  if (b === void 0) return null;
  const C = u.steps.length - 1, L = a.kind === "propagation", O = u.alternative, R = { crews: O.crews, verdict: O.verdict, label: O.kind === "true-fires" ? p("why.trueFires") : p("why.decoder") }, I = (J) => {
    const fe = J.target instanceof HTMLElement ? J.target : null;
    if (fe === null || fe.closest('[data-testid="why-skip"]') === null) return;
    const $ = J.currentTarget;
    globalThis.setTimeout(() => $.querySelector('[data-testid="why-replay"]')?.focus(), 0);
  }, P = Te(u.residual), _ = Array.from({ length: w.n }, (J, fe) => fe).filter((J) => tt(P, J) !== "I"), V = u.verdict === "success" ? p("debrief.logical.preserved") : u.verdict === "detectable" ? p("debrief.logical.undecided") : L ? p("debrief.logical.missed", { houses: _.join(", ") }) : p("debrief.logical.flipped", { ops: [u.logicalFlip.x.some(Boolean) ? "X̄" : null, u.logicalFlip.z.some(Boolean) ? "Z̄" : null].filter(Boolean).join(` ${p("common.and")} `) }), ne = a.index === An().length, { nextLabel: te } = nc(p, u, ne, s.tutorialActive);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-play screen-debrief", children: [
    /* @__PURE__ */ i.jsx(un, { title: y.districtName, subtitle: p("why.title"), onMissions: () => l({ type: "OPEN_MISSIONS" }), onSettings: () => l({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "why-section", "aria-label": p("why.comparison"), "data-testid": "why-section", onClick: I, children: [
      /* @__PURE__ */ i.jsx("h2", { id: "why-h", className: "section-h", tabIndex: -1, "data-focus-target": !0, "data-testid": "why-heading", children: p("why.title") }),
      /* @__PURE__ */ i.jsx("p", { className: "why-short", "data-testid": "why-short", children: y.whyShort }),
      /* @__PURE__ */ i.jsx(K1, { codeId: a.code, circuit: a.circuit, mine: u, alternative: R, reducedMotion: f, missionCopy: y })
    ] }),
    /* @__PURE__ */ i.jsx(sc, { summary: p("debrief.stepByStep"), testId: "step-details", className: "step-details", children: /* @__PURE__ */ i.jsxs("div", { className: "play-layout", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "board-col", "aria-label": p("debrief.replayBoard"), children: [
        /* @__PURE__ */ i.jsx(
          Zs,
          {
            codeId: a.code,
            circuit: a.circuit,
            fires: b.fires,
            crews: b.crews,
            residual: b.residual,
            syndrome: b.syndrome,
            interactive: !1,
            outcome: b.showVerdict ? np(u) : void 0,
            gateCursor: L ? b.gateCursor : void 0,
            inputFires: L ? u.startFires : null,
            ariaDescribedBy: j,
            ariaLabel: p("a11y.replayBoard")
          }
        ),
        /* @__PURE__ */ i.jsxs("p", { className: "board-caption", id: j, "aria-live": "polite", "data-testid": "replay-caption", children: [
          /* @__PURE__ */ i.jsx("strong", { children: p("debrief.step", { n: s.replayIndex + 1, total: u.steps.length, title: Lf(p, b.id) }) }),
          " ",
          b.caption
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "muted small", children: p("details.replayEnglish") }),
        /* @__PURE__ */ i.jsxs("div", { className: "replay-controls", role: "group", "aria-label": p("a11y.replayControls"), children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_PREV" }), disabled: s.replayIndex === 0, "data-testid": "replay-prev", children: p("debrief.prev") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "REPLAY_NEXT" }), disabled: s.replayIndex === C, "data-testid": "replay-next", children: p("debrief.next") }),
          /* @__PURE__ */ i.jsx("button", { type: "button", className: `btn${s.autoPlay ? " is-active" : ""}`, "aria-pressed": s.autoPlay, onClick: () => l({ type: "REPLAY_AUTO", on: !s.autoPlay }), "data-testid": "replay-auto", children: p("debrief.autoPlay") }),
          /* @__PURE__ */ i.jsx("ol", { className: "step-dots", "aria-label": p("a11y.replaySteps"), children: u.steps.map((J, fe) => /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: `dot${fe === s.replayIndex ? " is-current" : ""}`, "aria-current": fe === s.replayIndex ? "step" : void 0, onClick: () => l({ type: "REPLAY_GOTO", index: fe }), "aria-label": p("a11y.step", { n: fe + 1, title: Lf(p, J.id) }), children: fe + 1 }) }, J.id)) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("aside", { className: "panel", "aria-label": p("debrief.report"), children: [
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: p("debrief.report") }),
          /* @__PURE__ */ i.jsxs("dl", { className: "facts", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.trueFires") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: u.fires })
            ] }),
            L ? /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.startedAs") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: u.startFires })
            ] }) : null,
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.yourCrews") }),
              /* @__PURE__ */ i.jsx("dd", { className: "mono", children: u.crews })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.residual") }),
              /* @__PURE__ */ i.jsxs("dd", { className: "mono", "data-testid": "residual", children: [
                u.residual,
                /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
                  " ",
                  _.length > 0 ? p("debrief.residualHouses", { list: _.join(", ") }) : p("debrief.nothingLeft")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.logical") }),
              /* @__PURE__ */ i.jsx("dd", { "data-testid": "logical", children: V })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("dt", { children: p("debrief.decision") }),
              /* @__PURE__ */ i.jsxs("dd", { children: [
                p(tc[u.score.quality]),
                " · ",
                /* @__PURE__ */ i.jsx(Ws, { count: u.score.stars, max: u.score.maxStars, size: 16 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx("p", { className: "narrative", "data-testid": "narrative", children: zh(a.id, u.verdict, g, u.narrative) })
        ] }),
        w.checks.length > 0 ? /* @__PURE__ */ i.jsx(Xs, { codeId: a.code, syndrome: b.syndrome, compact: !0 }) : null,
        /* @__PURE__ */ i.jsxs("section", { className: "panel-section whatif", "data-testid": "whatif", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: p("debrief.whatIf") }),
          /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.decoder", { crews: u.whatIf.decoderCrews, verdict: p(Sl(u.whatIf.decoderVerdict, w.checks.length > 0)) }) }),
          u.whatIf.trueFireCrews !== null ? /* @__PURE__ */ i.jsx("p", { children: p("debrief.whatIf.trueFires", { crews: u.whatIf.trueFireCrews }) }) : null,
          /* @__PURE__ */ i.jsx("h3", { className: "panel-title", children: p("details.englishOriginal") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted", children: u.whatIf.explanation }),
          g !== "en" ? /* @__PURE__ */ i.jsx("p", { className: "muted small", children: u.narrative }) : null
        ] }),
        /* @__PURE__ */ i.jsx(rp, { bridge: n.bridge, missionId: a.id, correction: u.crews }, `${a.id}:${u.crews}`)
      ] })
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => l({ type: "SHOW_RESULT" }), "data-testid": "to-result", children: p("debrief.result") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => l({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: p("debrief.tryAgain") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost", onClick: () => l(s.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), "data-testid": "debrief-next", children: te })
    ] })
  ] });
}
function rp({ bridge: n, missionId: s, correction: l }) {
  const a = Ce(), [u, f] = z.useState({ kind: "idle" }), p = n.cached(s), g = gh(n.cached(s, l), s, l), y = Array.from(new Set(p.map((L) => L.correction))).filter((L) => !g.some((O) => O.correction === L)), w = n.kind === "qollab" && typeof n.run == "function", b = n.jobsRemaining?.() ?? 0, j = n.backendName ?? a("cloud.selectedBackend"), C = async () => {
    if (!w || n.run === void 0) return;
    f({ kind: "running" });
    const L = await n.run({ missionId: s, correction: l, shots: 100 });
    f({ kind: "done", result: L });
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "panel-section cloud", "data-testid": "cloud-panel", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: a("cloud.title") }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small", children: a("cloud.intro", { correction: l }) }),
    g.length === 0 && u.kind === "idle" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-empty", "data-testid": "cloud-empty", children: a("cloud.empty", { others: y.length > 0 ? a("cloud.emptyOthers", { list: y.join(", ") }) : "" }) }) : null,
    g.map((L, O) => /* @__PURE__ */ i.jsx(Vf, { result: L }, `${L.startedAt}-${String(O)}`)),
    u.kind === "running" ? /* @__PURE__ */ i.jsx("p", { className: "cloud-running", role: "status", children: a("cloud.running", { backend: j }) }) : null,
    u.kind === "done" ? u.result.status === "ok" ? /* @__PURE__ */ i.jsx(Vf, { result: u.result }) : /* @__PURE__ */ i.jsx("p", { className: "cloud-error", role: "alert", children: a("cloud.failed", { message: u.result.message }) }) : null,
    w ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn", onClick: () => void C(), disabled: u.kind === "running" || b <= 0, children: b <= 0 ? a("cloud.noJobs") : a("cloud.verifyOn", { backend: j }) }) : null
  ] });
}
function Vf({ result: n }) {
  const s = Ce(), l = Object.values(n.counts).reduce((u, f) => u + f, 0), a = Object.entries(n.counts).sort(([, u], [, f]) => f - u).slice(0, 5);
  return /* @__PURE__ */ i.jsxs("div", { className: `cloud-card cloud-${n.source}`, "data-testid": "cloud-card", children: [
    /* @__PURE__ */ i.jsxs("p", { className: "cloud-source", children: [
      /* @__PURE__ */ i.jsx("span", { className: "tag", children: s(G1[n.source]) }),
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
    /* @__PURE__ */ i.jsx("ul", { className: "counts", children: a.map(([u, f]) => /* @__PURE__ */ i.jsxs("li", { children: [
      /* @__PURE__ */ i.jsx("span", { className: "mono", children: u }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: f }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: "bar", style: { width: `${String(l > 0 ? f / l * 100 : 0)}%` }, "aria-hidden": "true" })
    ] }, u)) }),
    /* @__PURE__ */ i.jsx("dl", { className: "facts small cloud-facts", children: ox(n, s).map(([u, f]) => /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx("dt", { children: u }),
      /* @__PURE__ */ i.jsx("dd", { children: f })
    ] }, u)) })
  ] });
}
function ox(n, s) {
  const l = [], a = cl(n.analysis) ? n.analysis : {}, u = cl(n.prediction) ? n.prediction : {}, f = (L) => typeof L == "number" ? `${String(Math.round(L * 100))}%` : null, p = (L) => Array.isArray(L) && L.every((O) => O === 0 || O === 1) ? L.map(String).join("") : null, g = p(a.dominantSyndrome), y = p(u.syndrome);
  g !== null && l.push([s("cloud.analysis.dominant"), y !== null ? s("cloud.analysis.predicted", { dom: g, pred: y }) : g]);
  const w = f(a.predictedSyndromeShare);
  w !== null && l.push([s("cloud.analysis.syndromeShare"), w]);
  const b = a.predictedLogicalShare;
  Array.isArray(b) && typeof b[0] == "number" && l.push([s("cloud.analysis.logicalShare"), f(b[0]) ?? "—"]);
  const j = a.dominantMatches;
  if (cl(j)) {
    const L = Object.values(j).every((O) => O === !0 || O === null);
    l.push([s("cloud.analysis.dominantMatches"), s(L ? "cloud.analysis.yes" : "cloud.analysis.no")]);
  }
  const C = a.exactMatchesIdealModel ?? a.matches;
  return cl(C) && l.push([s("cloud.analysis.exact"), Object.values(C).every((L) => L === !0 || L === null) ? s("cloud.analysis.yes") : s("cloud.analysis.noNoise")]), typeof u.verdict == "string" && l.push([s("cloud.analysis.verdict"), u.verdict]), typeof a.readoutBasis == "string" && typeof a.prep == "string" && l.push([s("cloud.analysis.prep"), s("cloud.analysis.prepValue", { prep: a.prep, basis: a.readoutBasis })]), l;
}
function cl(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
const sp = ["#2f6fdd", "#2bb673", "#8a4fd6", "#e8432a", "#f2b200", "#3a2f2a"];
function ax({ text: n }) {
  const s = n.split("・");
  return s.length === 1 ? /* @__PURE__ */ i.jsx(i.Fragment, { children: n }) : /* @__PURE__ */ i.jsx(i.Fragment, { children: s.map((l, a) => /* @__PURE__ */ i.jsxs(z.Fragment, { children: [
    a > 0 ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      "・",
      /* @__PURE__ */ i.jsx("wbr", {})
    ] }) : null,
    l
  ] }, a)) });
}
function cx({ state: n, dispatch: s }) {
  const l = Ce(), a = Ha(n.progress);
  return /* @__PURE__ */ i.jsx("main", { className: "screen screen-title", children: /* @__PURE__ */ i.jsxs("div", { className: "title-card", children: [
    /* @__PURE__ */ i.jsx(As, { size: "title", nameAs: "h1", nameProps: { tabIndex: -1, "data-focus-target": !0 } }),
    /* @__PURE__ */ i.jsx("p", { className: "title-kicker", "data-testid": "title-kicker", children: /* @__PURE__ */ i.jsx(ax, { text: l("title.heading") }) }),
    /* @__PURE__ */ i.jsx("p", { className: "title-lead", children: l("title.kidLine") }),
    /* @__PURE__ */ i.jsxs("div", { className: "title-actions", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large btn-play", onClick: () => s({ type: "PLAY" }), "data-testid": "play", children: l("title.play") }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_HOW" }), "data-testid": "how", children: l("title.how") })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "title-tools", children: [
      /* @__PURE__ */ i.jsx(Gy, { language: n.settings.language, onChange: (u) => s({ type: "SET_LANGUAGE", language: u }) }),
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-ghost btn-icon", onClick: () => s({ type: "OPEN_SETTINGS" }), "aria-label": l("title.settings"), "data-testid": "settings", children: /* @__PURE__ */ i.jsx(Ka, {}) })
    ] }),
    a > 0 ? /* @__PURE__ */ i.jsx("p", { className: "muted title-progress", "data-testid": "title-progress", children: l("title.progress", { stars: a, max: Wa() }) }) : null,
    /* @__PURE__ */ i.jsx("p", { className: "title-foot muted", children: l("title.foot") })
  ] }) });
}
function ux({ dispatch: n }) {
  const s = Ce();
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(un, { title: s("how.title"), onSettings: () => n({ type: "OPEN_SETTINGS" }), onTitle: () => n({ type: "OPEN_TITLE" }) }),
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
            /* @__PURE__ */ i.jsx(Ms, { letter: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Ms, { letter: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Ms, { letter: "Y", size: 30 }),
            s("how.fires.term")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.fires") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("dt", { children: [
            /* @__PURE__ */ i.jsx(zr, { type: "Z", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(zr, { type: "X", size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(zr, { type: "Z", ringing: !0, size: 30 }),
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
            /* @__PURE__ */ i.jsx(Wh, { size: 30 }),
            " ",
            /* @__PURE__ */ i.jsx(Ms, { letter: "Z", size: 30 }),
            s("legend.water")
          ] }),
          /* @__PURE__ */ i.jsx("dd", { children: s("how.kid.water") })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "how-rule", children: s("how.quantumRules") }),
      /* @__PURE__ */ i.jsx("p", { children: s("how.kid.spray") }),
      /* @__PURE__ */ i.jsxs(sc, { summary: s("details.title"), testId: "how-details", children: [
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
function Ea({ id: n, on: s, onChange: l, testId: a }) {
  const u = Ce();
  return /* @__PURE__ */ i.jsxs("button", { type: "button", role: "switch", "aria-checked": s, "aria-labelledby": n, className: `switch${s ? " is-on" : ""}`, onClick: () => l(!s), "data-testid": a, children: [
    /* @__PURE__ */ i.jsx("span", { className: "switch-knob", "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { className: "switch-text", children: u(s ? "settings.on" : "settings.off") })
  ] });
}
function dx({ state: n, dispatch: s, storageLabel: l, onReset: a }) {
  const u = Ce(), f = (p, g) => /* @__PURE__ */ i.jsx("button", { type: "button", className: `seg-btn${n.settings.language === p ? " is-on" : ""}`, "aria-pressed": n.settings.language === p, onClick: () => s({ type: "SET_LANGUAGE", language: p }), "data-testid": `lang-${p}`, children: g });
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-doc", children: [
    /* @__PURE__ */ i.jsx(un, { title: u("settings.title"), onSettings: () => s({ type: "CLOSE_OVERLAY" }), settingsLabel: u("settings.close"), onTitle: () => s({ type: "OPEN_TITLE" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "doc", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-sound", children: u("settings.sound") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: u("settings.sound.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(Ea, { id: "set-sound", on: n.settings.sound, onChange: (p) => s({ type: "SET_SOUND", on: p }), testId: "switch-sound" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-motion", children: u("settings.motion") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: u("settings.motion.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(Ea, { id: "set-motion", on: n.settings.reducedMotion, onChange: (p) => s({ type: "SET_REDUCED_MOTION", on: p }), testId: "switch-motion" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-language", children: u("settings.language") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: u("settings.language.desc") })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "seg", role: "group", "aria-labelledby": "set-language", "data-testid": "language-group", children: [
          f("en", u("settings.language.en")),
          f("ja", u("settings.language.ja"))
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", id: "set-free-roam", children: u("settings.freeRoam") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", children: u("settings.freeRoam.desc") })
        ] }),
        /* @__PURE__ */ i.jsx(Ea, { id: "set-free-roam", on: n.settings.freeRoam, onChange: (p) => s({ type: "SET_FREE_ROAM", on: p }), testId: "switch-free-roam" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "setting-row", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "setting-name", children: u("settings.progress") }),
          /* @__PURE__ */ i.jsx("p", { className: "muted small", "data-testid": "settings-storage", children: l })
        ] }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-danger", onClick: a, "data-testid": "reset-progress", children: u("settings.reset") })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "doc-actions", children: /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary", onClick: () => s({ type: "CLOSE_OVERLAY" }), "data-testid": "back", children: u("settings.back") }) })
    ] })
  ] });
}
function fx({ kind: n, beacon: s = !1, size: l = 180 }) {
  let f;
  switch (n) {
    case "houses-row":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 70, y: 150, variant: "small", tint: 0, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 160, y: 150, variant: "tall", tint: 1, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 250, y: 150, variant: "small", tint: 2, scale: 0.9 }),
        /* @__PURE__ */ i.jsx(_s, { type: "Z", x: 115, y: 150, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(_s, { type: "Z", x: 205, y: 150, scale: 0.8 })
      ] });
      break;
    case "bridge":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 48, y: 150, variant: "small", tint: 3, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Th, { x: 160, y: 150, width: 150 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 272, y: 150, variant: "small", tint: 4, scale: 0.8 })
      ] });
      break;
    case "lab":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Eh, { x: 160, y: 152, active: !0 }),
        /* @__PURE__ */ i.jsx(xt, { x: 40, y: 152, size: 0.9 }),
        /* @__PURE__ */ i.jsx(xt, { x: 290, y: 152, size: 0.8 })
      ] });
      break;
    case "grid":
      f = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Ue, { x: 60, y: 150, variant: "shop", tint: 2, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 150, y: 150, variant: "small", tint: 4, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(Ue, { x: 230, y: 150, variant: "tall", tint: 5, scale: 0.8 }),
        /* @__PURE__ */ i.jsx(_s, { type: "Z", x: 105, y: 150, scale: 0.75 }),
        /* @__PURE__ */ i.jsx(_s, { type: "X", x: 190, y: 150, scale: 0.75 }),
        s ? /* @__PURE__ */ i.jsx(jl, { x: 290, y: 152, scale: 0.55, lit: !0 }) : /* @__PURE__ */ i.jsx(xt, { x: 295, y: 152, size: 0.9 })
      ] });
      break;
  }
  return /* @__PURE__ */ i.jsxs("svg", { className: "district-thumb", viewBox: `0 0 ${String(320)} ${String(170)}`, width: l, height: l * 170 / 320, "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 0, width: 320, height: 170, rx: 18, fill: "var(--sky)" }),
    /* @__PURE__ */ i.jsx("rect", { x: 0, y: 118, width: 320, height: 52, fill: "var(--ground-2)" }),
    f
  ] });
}
function hx({ state: n, dispatch: s, mission: l }) {
  const a = Ce(), u = Wt(), f = Xt(l.id, u), p = tr(l.id), g = $e(l.code), y = l.training.length > 0;
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-brief", children: [
    /* @__PURE__ */ i.jsx(un, { title: f.districtName, subtitle: `${a("mission.label", { n: l.index })} · ${f.kidTitle}`, onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "brief panel-card", "data-testid": "briefing", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "brief-head", children: [
        /* @__PURE__ */ i.jsx(fx, { kind: p?.kind ?? "grid", beacon: p?.hasBeacon ?? !1 }),
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
          /* @__PURE__ */ i.jsx("dd", { children: l.allowed.map((w) => /* @__PURE__ */ i.jsxs("span", { className: "inline-glyph", children: [
            /* @__PURE__ */ i.jsx(er, { letter: w, size: 26 }),
            " ",
            w
          ] }, w)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.budget") }),
          /* @__PURE__ */ i.jsx("dd", { children: Ja(u, "briefing.budget", l.budget) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: a("briefing.previousBest") }),
          /* @__PURE__ */ i.jsxs("dd", { children: [
            /* @__PURE__ */ i.jsx(Ws, { count: n.progress[l.id]?.stars ?? 0, max: l.maxStars, size: 20 }),
            l.maxStars < 3 ? /* @__PURE__ */ i.jsx("span", { className: "muted small", children: a("briefing.upTo", { n: l.maxStars }) }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "brief-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-primary btn-large", onClick: () => s({ type: "START_MISSION" }), "data-testid": "start-mission", children: a(y ? "briefing.startTraining" : "briefing.go") }),
        y ? /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "START_CHALLENGE" }), "data-testid": "briefing-skip", children: a("briefing.skipToDispatch") }) : null
      ] }),
      /* @__PURE__ */ i.jsxs(sc, { summary: f.detailsTitle, testId: "briefing-details", children: [
        /* @__PURE__ */ i.jsx("p", { className: "brief-original", children: Dy(l.id, u, l.briefing) }),
        /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
          a("details.code"),
          ": ",
          a(By[l.code] ?? "mission.code.rsc3"),
          " · ",
          g.name
        ] })
      ] })
    ] })
  ] });
}
function px({ state: n, dispatch: s, mission: l, debrief: a }) {
  const u = Ce(), f = Wt(), p = a.score, g = Xt(l.id, f), y = l.index === An().length, w = $e(l.code).checks.length > 0, b = n.progress[l.id]?.completed === !0, j = Mn.findIndex((I) => I.missionId === l.id), C = vl(a), L = () => s(n.tutorialActive ? { type: "OPEN_MISSIONS" } : { type: "NEXT_MISSION" }), { nextLabel: O, primary: R } = nc(u, a, y, n.tutorialActive);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-result", children: [
    /* @__PURE__ */ i.jsx(un, { title: g.districtName, subtitle: u("result.subtitle"), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "result panel-card", "data-testid": "result", "data-result": C, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "result-top", children: [
        /* @__PURE__ */ i.jsx("svg", { className: "result-badge", viewBox: "-30 -62 60 66", width: 64, height: 70, "aria-label": u("result.badge", { district: u(Oa(l.id)) }), role: "img", focusable: "false", children: /* @__PURE__ */ i.jsx(pl, { x: 0, y: 0, colour: sp[j] ?? "#2f6fdd", earned: b }) }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "result-h", children: u(Wy(p)) }),
          /* @__PURE__ */ i.jsx(Ws, { count: p.stars, max: p.maxStars, size: 40 }),
          /* @__PURE__ */ i.jsxs("p", { className: "muted small", children: [
            p.maxStars === 1 ? u("result.starsOf.one", { stars: p.stars }) : u("result.starsOf.other", { stars: p.stars, max: p.maxStars }),
            p.maxStars < 3 ? ` · ${u("result.maxOne")}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "result-reaction", children: Xh(g, C) }),
      /* @__PURE__ */ i.jsxs("dl", { className: "result-facts", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: u("result.decision") }),
          /* @__PURE__ */ i.jsx("dd", { children: u(tc[p.quality]) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: u("result.outcome") }),
          /* @__PURE__ */ i.jsx("dd", { className: `outcome outcome-${p.outcome}`, children: u(Sl(p.outcome, w)) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: u("result.cost") }),
          /* @__PURE__ */ i.jsx("dd", { children: Ja(f, "result.costText", p.crewsUsed, { used: p.crewsUsed, min: p.minCrews }) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: u("result.attempts") }),
          /* @__PURE__ */ i.jsx("dd", { "data-testid": "result-attempts", children: n.progress[l.id]?.attempts ?? 1 })
        ] })
      ] }),
      b ? /* @__PURE__ */ i.jsx("p", { className: "result-badge-line", "data-testid": "result-badge-line", children: u("result.badge", { district: u(Oa(l.id)) }) }) : null,
      /* @__PURE__ */ i.jsxs("div", { className: "result-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: "btn btn-large", onClick: () => s({ type: "OPEN_WHY" }), "data-testid": "result-why", children: u("dispatch.why") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: R === "retry" ? "btn btn-primary btn-large" : "btn btn-large", onClick: () => s({ type: "TRY_AGAIN" }), "data-testid": "try-again", children: u("result.tryAgain") }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: R === "next" ? "btn btn-primary btn-large" : "btn btn-ghost btn-large", onClick: L, "data-testid": "next-mission", children: O })
      ] })
    ] })
  ] });
}
function mx({ state: n, dispatch: s }) {
  const l = Ce(), a = Wt(), u = An(), f = Ha(n.progress);
  return /* @__PURE__ */ i.jsxs("main", { className: "screen screen-summary", children: [
    /* @__PURE__ */ i.jsx(un, { title: l("summary.title"), subtitle: l("mission.starsOf", { stars: f, max: Wa() }), onMissions: () => s({ type: "OPEN_MISSIONS" }), onSettings: () => s({ type: "OPEN_SETTINGS" }) }),
    /* @__PURE__ */ i.jsxs("section", { className: "summary panel-card", "data-testid": "summary", children: [
      /* @__PURE__ */ i.jsx("p", { className: "brief-text", children: l("summary.lead") }),
      /* @__PURE__ */ i.jsx("h2", { className: "panel-title", children: l("summary.badges") }),
      /* @__PURE__ */ i.jsx("ul", { className: "badge-row", "aria-label": l("summary.badges"), children: Mn.map((p, g) => {
        const y = n.progress[p.missionId]?.completed === !0;
        return /* @__PURE__ */ i.jsxs("li", { className: y ? "badge-item is-earned" : "badge-item", "data-badge": p.id, "data-earned": y ? "true" : "false", children: [
          /* @__PURE__ */ i.jsx("svg", { viewBox: "-30 -62 60 66", width: 52, height: 57, "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ i.jsx(pl, { x: 0, y: 0, colour: sp[g] ?? "#2f6fdd", earned: y }) }),
          /* @__PURE__ */ i.jsx("span", { children: l(Oa(p.missionId)) })
        ] }, p.id);
      }) }),
      /* @__PURE__ */ i.jsxs("table", { className: "summary-table", children: [
        /* @__PURE__ */ i.jsx("thead", { children: /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.mission") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.stars") }),
          /* @__PURE__ */ i.jsx("th", { scope: "col", children: l("summary.attempts") })
        ] }) }),
        /* @__PURE__ */ i.jsx("tbody", { children: u.map((p) => {
          const g = n.progress[p.id];
          return /* @__PURE__ */ i.jsxs("tr", { children: [
            /* @__PURE__ */ i.jsxs("th", { scope: "row", children: [
              p.index,
              ". ",
              Xt(p.id, a).districtName
            ] }),
            /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(Ws, { count: g?.stars ?? 0, max: p.maxStars, size: 18 }) }),
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
      /* @__PURE__ */ i.jsx(Bh, { allowed: ["X", "Z", "Y"], alarms: !0, water: !0 })
    ] })
  ] });
}
let Rs = null;
function gx() {
  if (Rs !== null) return Rs;
  const n = globalThis.AudioContext;
  if (typeof n != "function") return null;
  try {
    Rs = new n();
  } catch {
    Rs = null;
  }
  return Rs;
}
function ot(n, s, l, a, u = 0.08, f = "sine") {
  const p = n.createOscillator(), g = n.createGain();
  p.type = f, p.frequency.value = s, g.gain.setValueAtTime(0, l), g.gain.linearRampToValueAtTime(u, l + 0.01), g.gain.exponentialRampToValueAtTime(1e-4, l + a), p.connect(g).connect(n.destination), p.start(l), p.stop(l + a + 0.02);
}
function Qf(n, s) {
  if (!s) return;
  const l = gx();
  if (l === null) return;
  l.state === "suspended" && l.resume();
  const a = l.currentTime;
  switch (n) {
    case "select":
      ot(l, 660, a, 0.06);
      break;
    case "place":
      ot(l, 440, a, 0.09), ot(l, 660, a + 0.05, 0.09);
      break;
    case "remove":
      ot(l, 520, a, 0.08), ot(l, 390, a + 0.05, 0.1);
      break;
    case "confirm":
      ot(l, 523, a, 0.1), ot(l, 659, a + 0.08, 0.14);
      break;
    case "success":
      ot(l, 523, a, 0.12), ot(l, 659, a + 0.1, 0.12), ot(l, 784, a + 0.2, 0.22);
      break;
    case "failure":
      ot(l, 330, a, 0.16, 0.08, "triangle"), ot(l, 247, a + 0.14, 0.26, 0.08, "triangle");
      break;
    case "alarm":
      ot(l, 880, a, 0.08, 0.05, "square"), ot(l, 880, a + 0.14, 0.08, 0.05, "square");
      break;
    case "step":
      ot(l, 587, a, 0.05, 0.05);
      break;
    case "blocked":
      ot(l, 196, a, 0.07, 0.06, "square");
      break;
  }
}
function yx(n, s, l) {
  switch (n.type) {
    case "SELECT_LETTER":
      return l.selected !== s.selected ? "select" : null;
    case "TOGGLE_BLOCK": {
      const a = s.placements[n.qubit], u = l.placements[n.qubit];
      if (a === u) {
        if (l === s && s.screen === "challenge" && !s.standDownDialog && a === void 0) {
          const f = dt(s), p = f !== null && n.qubit >= 0 && n.qubit < $e(f.code).n;
          if (f !== null && p && Fr(s.placements) >= f.budget) return "blocked";
        }
        return null;
      }
      return u === void 0 ? "remove" : "place";
    }
    case "RECALL_BLOCK":
      return l.placements !== s.placements ? "remove" : null;
    case "CLEAR_CREWS":
      return l.placements !== s.placements && Fr(s.placements) > 0 ? "remove" : null;
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
const Kf = 1600;
function xx() {
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
    const a = (u) => s(u.matches);
    return l.addEventListener("change", a), () => l?.removeEventListener("change", a);
  }, []), n;
}
function wx(n, s) {
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
function kx({ bridge: n = bg(), storage: s = "local" }) {
  const [l] = z.useState(() => s === "local" ? mg() : null), [a, u] = z.useReducer(xf, void 0, () => {
    const { save: te, notice: J } = hg(l);
    return Mg(te, J);
  }), [f, p] = z.useState(!1), y = xx() || a.settings.reducedMotion, w = z.useRef(null), b = z.useRef(a), j = z.useRef(a.settings.sound), C = z.useRef(y);
  z.useEffect(() => {
    b.current = a, j.current = a.settings.sound, C.current = y;
  });
  const L = z.useCallback((te) => {
    const J = te.type === "CONFIRM" || te.type === "STAND_DOWN_CONFIRM" || te.type === "OPEN_WHY" || te.type === "REPLAY_AUTO" ? { ...te, reducedMotion: te.reducedMotion ?? C.current } : te, fe = b.current, $ = xf(fe, J);
    b.current = $, u(J);
    const me = yx(J, fe, $);
    me !== null && Qf(me, j.current);
  }, []);
  z.useEffect(() => {
    a.screen === "briefing" && a.tutorialActive && L({ type: "START_CHALLENGE" });
  }, [a.screen, a.tutorialActive, L]);
  const O = z.useRef("");
  z.useEffect(() => {
    if (a.screen !== "dispatch" || !a.dispatchDone || a.debrief === null) return;
    const te = `${a.debrief.missionId}:${a.debrief.crews}:${String(a.progress[a.debrief.missionId]?.attempts ?? 0)}`;
    O.current !== te && (O.current = te, Qf(a.debrief.verdict === "success" ? "success" : "failure", a.settings.sound));
  }, [a.screen, a.dispatchDone, a.debrief, a.progress, a.settings.sound]);
  const { progress: R, settings: I, tutorialDone: P } = a;
  z.useEffect(() => {
    pg(l, zg({ ...b.current, progress: R, settings: I, tutorialDone: P }));
  }, [l, R, I, P]), z.useEffect(() => {
    if (!a.autoPlay || a.screen !== "debrief") return;
    const te = globalThis.setTimeout(() => u({ type: "REPLAY_NEXT" }), y ? Kf + 600 : Kf);
    return () => globalThis.clearTimeout(te);
  }, [a.autoPlay, a.replayIndex, a.screen, y]);
  const _ = z.useRef(null), V = `${a.screen}:${a.missionId ?? ""}:${String(a.progress[a.missionId ?? ""]?.attempts ?? 0)}:${a.dispatchDone ? "done" : ""}:${a.settings.language}`, ne = z.useRef(V);
  return z.useEffect(() => {
    try {
      globalThis.scrollTo?.({ top: 0 });
    } catch {
    }
    const te = w.current, J = b.current, fe = dt(J), $ = Ly(J.settings.language);
    te !== null && V !== ne.current && wx(J, te)?.focus({ preventScroll: !0 }), document.title = Uy($, J, fe);
    const me = _.current;
    me !== null && (me.textContent = "");
    const he = globalThis.setTimeout(() => {
      _.current !== null && (_.current.textContent = Yy($, J, fe, J.debrief));
    }, 60);
    return () => globalThis.clearTimeout(he);
  }, [V]), /* @__PURE__ */ i.jsx(Ry, { language: a.settings.language, children: /* @__PURE__ */ i.jsx(vx, { state: a, dispatch: L, bridge: n, storageMode: s, store: l, reducedMotion: y, resetDialog: f, setResetDialog: p, contentRef: w, announcerRef: _ }) });
}
function vx({ state: n, dispatch: s, bridge: l, storageMode: a, store: u, reducedMotion: f, resetDialog: p, setResetDialog: g, contentRef: y, announcerRef: w }) {
  const b = Ce(), j = dt(n), C = a === "memory" ? b("settings.storage.qollab") : u === null ? b("settings.storage.memory") : b("settings.storage.local", { key: "q11.save.v1" }), L = b(a === "memory" ? "city.hud.storage.qollab" : u === null ? "city.hud.storage.memory" : "city.hud.storage.local"), O = n.notice === qa ? b("notice.progressReset") : n.notice === ph ? b("notice.saveReset") : n.notice, R = { state: n, dispatch: s, storageLabel: C }, I = /* @__PURE__ */ i.jsx(
    d1,
    {
      state: n,
      dispatch: s,
      storageNote: L,
      recentlySolved: n.celebrate,
      initialSelected: n.citySelect,
      onCelebrated: () => s({ type: "CELEBRATED" }),
      onSettings: () => s({ type: "OPEN_SETTINGS" }),
      onTitle: () => s({ type: "OPEN_TITLE" })
    }
  ), P = j === null || n.debrief === null ? null : { state: n, dispatch: s, mission: j, debrief: n.debrief, bridge: l, reducedMotion: f };
  let _;
  switch (n.screen) {
    case "title":
      _ = /* @__PURE__ */ i.jsx(cx, { ...R });
      break;
    case "how":
      _ = /* @__PURE__ */ i.jsx(ux, { ...R });
      break;
    case "settings":
      _ = /* @__PURE__ */ i.jsx(dx, { ...R, onReset: () => g(!0) });
      break;
    case "missions":
      _ = I;
      break;
    case "briefing":
      _ = j === null ? I : /* @__PURE__ */ i.jsx(hx, { ...R, mission: j });
      break;
    case "training":
      _ = j === null ? I : /* @__PURE__ */ i.jsx(tx, { state: n, dispatch: s, mission: j });
      break;
    case "challenge":
      _ = j === null ? I : /* @__PURE__ */ i.jsx(
        rx,
        {
          mission: j,
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
      _ = P === null ? I : /* @__PURE__ */ i.jsx(ix, { ...P });
      break;
    case "debrief":
      _ = P === null ? I : /* @__PURE__ */ i.jsx(lx, { ...P });
      break;
    case "result":
      _ = P === null ? I : /* @__PURE__ */ i.jsx(px, { ...R, mission: P.mission, debrief: P.debrief });
      break;
    case "summary":
      _ = /* @__PURE__ */ i.jsx(mx, { ...R });
      break;
  }
  return /* @__PURE__ */ i.jsxs("div", { className: "app", "data-reduced-motion": f ? "true" : "false", "data-screen": n.screen, "data-language": n.settings.language, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "app-content", ref: y, "data-inert-root": !0, children: [
      O !== null ? /* @__PURE__ */ i.jsx(Jy, { text: O, onDismiss: () => s({ type: "DISMISS_NOTICE" }) }) : null,
      _
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", "data-testid": "announcer", ref: w }),
    p ? /* @__PURE__ */ i.jsx(
      Zh,
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
function jx(n, s = {}) {
  n.replaceChildren();
  const l = lm.createRoot(n), a = {
    ...s.bridge === void 0 ? {} : { bridge: s.bridge },
    ...s.storage === void 0 ? {} : { storage: s.storage }
  };
  return l.render(
    /* @__PURE__ */ i.jsx(z.StrictMode, { children: /* @__PURE__ */ i.jsx(kx, { ...a }) })
  ), l;
}
export {
  jx as mountQ11
};
