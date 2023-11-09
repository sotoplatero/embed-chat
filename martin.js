function t(t) {
    return Object.keys(t).reduce(((e, r) => {
        var n = t[r];
        return e[r] = Object.assign({}, n), !s(n.value) || function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }(n.value) || Array.isArray(n.value) || (e[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (e[r].value = n.value.slice(0)), e
    }), {})
}

function e(t) {
    if (t) try {
        return JSON.parse(t)
    } catch (e) {
        return t
    }
}

function r(t, e, r) {
    if (null == r || !1 === r) return t.removeAttribute(e);
    let s = JSON.stringify(r);
    t.__updating[e] = !0, "true" === s && (s = ""), t.setAttribute(e, s), Promise.resolve().then((() => delete t.__updating[e]))
}

function s(t) {
    return null != t && ("object" == typeof t || "function" == typeof t)
}
let n;

function o(s, o) {
    const i = Object.keys(o);
    return class extends s {
        static get observedAttributes() {
            return i.map((t => o[t].attribute))
        }
        constructor() {
            super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {}
        }
        connectedCallback() {
            if (!this.__initialized) {
                this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = function(s, n) {
                    const o = t(n);
                    return Object.keys(n).forEach((t => {
                        const n = o[t],
                            i = s.getAttribute(n.attribute),
                            a = s[t];
                        i && (n.value = n.parse ? e(i) : i), null != a && (n.value = Array.isArray(a) ? a.slice(0) : a), n.reflect && r(s, n.attribute, n.value), Object.defineProperty(s, t, {
                            get: () => n.value,
                            set(e) {
                                var s = n.value;
                                n.value = e, n.reflect && r(this, n.attribute, n.value);
                                for (let r = 0, n = this.__propertyChangedCallbacks.length; r < n; r++) this.__propertyChangedCallbacks[r](t, e, s)
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    })), o
                }(this, o);
                var s = function(t) {
                        return Object.keys(t).reduce(((e, r) => (e[r] = t[r].value, e)), {})
                    }(this.props),
                    i = this.Component,
                    a = n;
                try {
                    (n = this).__initialized = !0,
                        function(t) {
                            return "function" == typeof t && 0 === t.toString().indexOf("class")
                        }(i) ? new i(s, {
                            element: this
                        }) : i(s, {
                            element: this
                        })
                } finally {
                    n = a
                }
            }
        }
        async disconnectedCallback() {
            if (await Promise.resolve(), !this.isConnected) {
                this.__propertyChangedCallbacks.length = 0;
                for (var t = null; t = this.__releaseCallbacks.pop();) t(this);
                delete this.__initialized, this.__released = !0
            }
        }
        attributeChangedCallback(t, r, s) {
            !this.__initialized || this.__updating[t] || (t = this.lookupProp(t)) in o && (null == s && !this[t] || (this[t] = o[t].parse ? e(s) : s))
        }
        lookupProp(t) {
            if (o) return i.find((e => t === e || t === o[e].attribute))
        }
        get renderRoot() {
            return this.shadowRoot || this.attachShadow({
                mode: "open"
            })
        }
        addReleaseCallback(t) {
            this.__releaseCallbacks.push(t)
        }
        addPropertyChangedCallback(t) {
            this.__propertyChangedCallbacks.push(t)
        }
    }
}

function i(t, e = {}, r = {}) {
    const {
        BaseElement: n = HTMLElement,
        extension: i
    } = r;
    return r => {
        if (!t) throw new Error("tag is required to register a Component");
        let a = customElements.get(t);
        return a ? a.prototype.Component = r : ((a = o(n, function(t) {
            return t ? Object.keys(t).reduce(((e, r) => {
                var n = t[r];
                return e[r] = s(n) && "value" in n ? n : {
                    value: n
                }, e[r].attribute || (e[r].attribute = function(t) {
                    return t.replace(/\.?([A-Z]+)/g, ((t, e) => "-" + e.toLowerCase())).replace("_", "-").replace(/^-/, "")
                }(r)), e[r].parse = "parse" in e[r] ? e[r].parse : "string" != typeof e[r].value, e
            }), {}) : {}
        }(e))).prototype.Component = r, a.prototype.registeredTag = t, customElements.define(t, a, i)), a
    }
}
const a = Symbol("solid-proxy"),
    l = Symbol("solid-track"),
    c = {
        equals: (t, e) => t === e
    };
let h = L;
const u = 1,
    p = 2,
    d = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var f = null;
let g = null,
    b = null,
    y = null,
    m = null,
    v = 0;

function w(t, e) {
    const r = b,
        s = f,
        n = 0 === t.length,
        o = n ? d : {
            owned: null,
            cleanups: null,
            context: null,
            owner: void 0 === e ? s : e
        },
        i = n ? t : () => t((() => S((() => z(o)))));
    f = o, b = null;
    try {
        return B(i, !0)
    } finally {
        b = r, f = s
    }
}

function x(t, e) {
    const r = {
        value: t,
        observers: null,
        observerSlots: null,
        comparator: (e = e ? Object.assign({}, c, e) : c).equals || void 0
    };
    return [$.bind(r), t => ("function" == typeof t && (t = t(r.value)), T(r, t))]
}

function k(t, e, r) {
    E(R(t, e, !1, u))
}

function _(t, e, r) {
    h = N, (t = R(t, e, !1, u)).user = !0, m ? m.push(t) : E(t)
}

function C(t, e, r) {
    return r = r ? Object.assign({}, c, r) : c, (t = R(t, e, !0, 0)).observers = null, t.observerSlots = null, t.comparator = r.equals || void 0, E(t), $.bind(t)
}

function S(t) {
    if (null === b) return t();
    var e = b;
    b = null;
    try {
        return t()
    } finally {
        b = e
    }
}

function A(t) {
    _((() => S(t)))
}

function P(t) {
    return null !== f && (null === f.cleanups ? f.cleanups = [t] : f.cleanups.push(t)), t
}

function $() {
    var t;
    return this.sources && this.state && (this.state === u ? E(this) : (t = y, y = null, B((() => j(this)), !1), y = t)), b && (t = this.observers ? this.observers.length : 0, b.sources ? (b.sources.push(this), b.sourceSlots.push(t)) : (b.sources = [this], b.sourceSlots = [t]), this.observers ? (this.observers.push(b), this.observerSlots.push(b.sources.length - 1)) : (this.observers = [b], this.observerSlots = [b.sources.length - 1])), this.value
}

function T(t, e, r) {
    var s = t.value;
    return t.comparator && t.comparator(s, e) || (t.value = e, t.observers && t.observers.length && B((() => {
        for (let s = 0; s < t.observers.length; s += 1) {
            var e = t.observers[s],
                r = g && g.running;
            r && g.disposed.has(e), (r ? e.tState : e.state) || ((e.pure ? y : m).push(e), e.observers && I(e)), r || (e.state = u)
        }
        if (1e6 < y.length) throw y = [], new Error
    }), !1)), e
}

function E(t) {
    var e, r, s;
    t.fn && (z(t), e = f, r = b, s = v, function(t, e, r) {
        let s;
        try {
            s = t.fn(e)
        } catch (e) {
            return t.pure && (t.state = u, t.owned && t.owned.forEach(z), t.owned = null), t.updatedAt = r + 1, M(e)
        }(!t.updatedAt || t.updatedAt <= r) && (null != t.updatedAt && "observers" in t ? T(t, s) : t.value = s, t.updatedAt = r)
    }(b = f = t, t.value, s), b = r, f = e)
}

function R(t, e, r, s = u, n) {
    return t = {
        fn: t,
        state: s,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: e,
        owner: f,
        context: null,
        pure: r
    }, null !== f && f !== d && (f.owned ? f.owned.push(t) : f.owned = [t]), t
}

function O(t) {
    if (0 !== t.state) {
        if (t.state === p) return j(t);
        if (t.suspense && S(t.suspense.inFallback)) return t.suspense.effects.push(t);
        const r = [t];
        for (;
            (t = t.owner) && (!t.updatedAt || t.updatedAt < v);) t.state && r.push(t);
        for (let s = r.length - 1; 0 <= s; s--) {
            var e;
            (t = r[s]).state === u ? E(t) : t.state === p && (e = y, y = null, B((() => j(t, r[0])), !1), y = e)
        }
    }
}

function B(t, e) {
    if (y) return t();
    let r = !1;
    e || (y = []), m ? r = !0 : m = [], v++;
    try {
        var s = t();
        return function(t) {
            if (y && (L(y), y = null), !t) {
                const t = m;
                m = null, t.length && B((() => h(t)), !1)
            }
        }(r), s
    } catch (t) {
        r || (m = null), y = null, M(t)
    }
}

function L(t) {
    for (let e = 0; e < t.length; e++) O(t[e])
}

function N(t) {
    let e, r = 0;
    for (e = 0; e < t.length; e++) {
        var s = t[e];
        s.user ? t[r++] = s : O(s)
    }
    for (e = 0; e < r; e++) O(t[e])
}

function j(t, e) {
    for (let n = t.state = 0; n < t.sources.length; n += 1) {
        var r, s = t.sources[n];
        s.sources && ((r = s.state) === u ? s !== e && (!s.updatedAt || s.updatedAt < v) && O(s) : r === p && j(s, e))
    }
}

function I(t) {
    for (let r = 0; r < t.observers.length; r += 1) {
        var e = t.observers[r];
        e.state || (e.state = p, (e.pure ? y : m).push(e), e.observers && I(e))
    }
}

function z(t) {
    let e;
    if (t.sources)
        for (; t.sources.length;) {
            var r, s, n = t.sources.pop(),
                o = t.sourceSlots.pop(),
                i = n.observers;
            i && i.length && (r = i.pop(), s = n.observerSlots.pop(), o < i.length) && (i[r.sourceSlots[s] = o] = r, n.observerSlots[o] = s)
        }
    if (t.owned) {
        for (e = t.owned.length - 1; 0 <= e; e--) z(t.owned[e]);
        t.owned = null
    }
    if (t.cleanups) {
        for (e = t.cleanups.length - 1; 0 <= e; e--) t.cleanups[e]();
        t.cleanups = null
    }
    t.state = 0, t.context = null
}

function M(t) {
    throw t
}
const q = Symbol("fallback");

function D(t) {
    for (let e = 0; e < t.length; e++) t[e]()
}

function U(t, e) {
    return S((() => t(e || {})))
}

function F() {
    return !0
}
const G = {
    get: (t, e, r) => e === a ? r : t.get(e),
    has: (t, e) => e === a || t.has(e),
    set: F,
    deleteProperty: F,
    getOwnPropertyDescriptor: (t, e) => ({
        configurable: !0,
        enumerable: !0,
        get: () => t.get(e),
        set: F,
        deleteProperty: F
    }),
    ownKeys: t => t.keys()
};

function H(t) {
    return (t = "function" == typeof t ? t() : t) || {}
}

function W(...t) {
    let e = !1;
    for (let s = 0; s < t.length; s++) {
        var r = t[s];
        e = e || !!r && a in r, t[s] = "function" == typeof r ? (e = !0, C(r)) : r
    }
    if (e) return new Proxy({
        get(e) {
            for (let s = t.length - 1; 0 <= s; s--) {
                var r = H(t[s])[e];
                if (void 0 !== r) return r
            }
        },
        has(e) {
            for (let r = t.length - 1; 0 <= r; r--)
                if (e in H(t[r])) return !0;
            return !1
        },
        keys() {
            var e = [];
            for (let r = 0; r < t.length; r++) e.push(...Object.keys(H(t[r])));
            return [...new Set(e)]
        }
    }, G);
    var s = {};
    for (let e = t.length - 1; 0 <= e; e--)
        if (t[e])
            for (const r in Object.getOwnPropertyDescriptors(t[e])) r in s || Object.defineProperty(s, r, {
                enumerable: !0,
                get() {
                    for (let s = t.length - 1; 0 <= s; s--) {
                        var e = (t[s] || {})[r];
                        if (void 0 !== e) return e
                    }
                }
            });
    return s
}

function V(t, ...e) {
    const r = new Set(e.flat());
    var s;
    if (a in t) return (s = e.map((e => new Proxy({
        get: r => e.includes(r) ? t[r] : void 0,
        has: r => e.includes(r) && r in t,
        keys: () => e.filter((e => e in t))
    }, G)))).push(new Proxy({
        get: e => r.has(e) ? void 0 : t[e],
        has: e => !r.has(e) && e in t,
        keys: () => Object.keys(t).filter((t => !r.has(t)))
    }, G)), s;
    const n = Object.getOwnPropertyDescriptors(t);
    return e.push(Object.keys(n).filter((t => !r.has(t)))), e.map((e => {
        var r = {};
        for (let s = 0; s < e.length; s++) {
            const o = e[s];
            o in t && Object.defineProperty(r, o, n[o] || {
                get: () => t[o],
                set: () => !0,
                enumerable: !0
            })
        }
        return r
    }))
}

function Y(t) {
    var e = "fallback" in t && {
        fallback: () => t.fallback
    };
    return C(function(t, e, r = {}) {
        let s = [],
            n = [],
            o = [],
            i = 0,
            a = 1 < e.length ? [] : null;
        return P((() => D(o))), () => {
            let c, h, u = t() || [];
            return u[l], S((() => {
                let t, e, l, d, f, g, b, y, m, v = u.length;
                if (0 === v) 0 !== i && (D(o), o = [], s = [], n = [], i = 0, a = a && []), r.fallback && (s = [q], n[0] = w((t => (o[0] = t, r.fallback()))), i = 1);
                else if (0 === i) {
                    for (n = new Array(v), h = 0; h < v; h++) s[h] = u[h], n[h] = w(p);
                    i = v
                } else {
                    for (l = new Array(v), d = new Array(v), a && (f = new Array(v)), g = 0, b = Math.min(i, v); g < b && s[g] === u[g]; g++);
                    for (b = i - 1, y = v - 1; b >= g && y >= g && s[b] === u[y]; b--, y--) l[y] = n[b], d[y] = o[b], a && (f[y] = a[b]);
                    for (t = new Map, e = new Array(y + 1), h = y; h >= g; h--) m = u[h], c = t.get(m), e[h] = void 0 === c ? -1 : c, t.set(m, h);
                    for (c = g; c <= b; c++) m = s[c], void 0 !== (h = t.get(m)) && -1 !== h ? (l[h] = n[c], d[h] = o[c], a && (f[h] = a[c]), h = e[h], t.set(m, h)) : o[c]();
                    for (h = g; h < v; h++) h in l ? (n[h] = l[h], o[h] = d[h], a && (a[h] = f[h], a[h](h))) : n[h] = w(p);
                    n = n.slice(0, i = v), s = u.slice(0)
                }
                return n
            }));

            function p(t) {
                var r;
                return o[h] = t, a ? ([t, r] = x(h), a[h] = r, e(u[h], t)) : e(u[h])
            }
        }
    }((() => t.each), t.children, e || void 0))
}

function X(t) {
    const e = t.keyed,
        r = C((() => t.when), void 0, {
            equals: (t, r) => e ? t === r : !t == !r
        });
    return C((() => {
        const s = r();
        if (s) {
            const n = t.children;
            return "function" == typeof n && 0 < n.length ? S((() => n(e ? s : () => {
                if (S(r)) return t.when;
                throw (t => `Stale read from <${t}>.`)("Show")
            }))) : n
        }
        return t.fallback
    }), void 0, void 0)
}
const J = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
    K = new Set(["innerHTML", "textContent", "innerText", "children"]),
    Q = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    Z = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });
const tt = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    et = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
const rt = "_$DX_DELEGATE";

function st(t, e, r) {
    let s;
    const n = () => {
        var e = document.createElement("template");
        return e.innerHTML = t, (r ? e.content.firstChild : e.content).firstChild
    };
    return (e = e ? () => (s = s || n()).cloneNode(!0) : () => S((() => document.importNode(s = s || n(), !0)))).cloneNode = e
}

function nt(t, e = window.document) {
    var r = e[rt] || (e[rt] = new Set);
    for (let n = 0, o = t.length; n < o; n++) {
        var s = t[n];
        r.has(s) || (r.add(s), e.addEventListener(s, pt))
    }
}

function ot(t, e, r) {
    null == r ? t.removeAttribute(e) : t.setAttribute(e, r)
}

function it(t, e) {
    null == e ? t.removeAttribute("class") : t.className = e
}

function at(t, e = {}, r, s) {
    const n = {};
    return s || k((() => n.children = dt(t, e.children, n.children))), k((() => e.ref && e.ref(t))), k((() => function(t, e, r, s, n = {}, o = !1) {
        e = e || {};
        for (const s in n) s in e || "children" !== s && (n[s] = ut(t, s, null, n[s], r, o));
        for (const a in e) {
            var i;
            "children" === a ? s || dt(t, e.children) : (i = e[a], n[a] = ut(t, a, i, n[a], r, o))
        }
    }(t, e, r, !0, n, !0))), n
}

function lt(t, e, r) {
    return S((() => t(e, r)))
}

function ct(t, e, r, s) {
    if (void 0 !== r && (s = s || []), "function" != typeof e) return dt(t, e, s, r);
    k((s => dt(t, e(), s, r)), s)
}

function ht(t, e, r) {
    var s = e.trim().split(/\s+/);
    for (let e = 0, n = s.length; e < n; e++) t.classList.toggle(s[e], r)
}

function ut(t, e, r, s, n, o) {
    let i, a, l, c, h;
    var u;
    return "style" === e ? function(t, e, r) {
        if (!e) return r ? ot(t, "style") : e;
        var s = t.style;
        if ("string" == typeof e) return s.cssText = e;
        let n, o;
        for (o in "string" == typeof r && (s.cssText = r = void 0), e = e || {}, r = r || {}) null == e[o] && s.removeProperty(o), delete r[o];
        for (o in e)(n = e[o]) !== r[o] && (s.setProperty(o, n), r[o] = n);
        return r
    }(t, r, s) : "classList" === e ? function(t, e, r = {}) {
        var s = Object.keys(e || {}),
            n = Object.keys(r);
        let o, i;
        for (o = 0, i = n.length; o < i; o++) {
            var a = n[o];
            a && "undefined" !== a && !e[a] && (ht(t, a, !1), delete r[a])
        }
        for (o = 0, i = s.length; o < i; o++) {
            var l = s[o],
                c = !!e[l];
            l && "undefined" !== l && r[l] !== c && c && (ht(t, l, !0), r[l] = c)
        }
        return r
    }(t, r, s) : r === s ? s : ("ref" === e ? o || r(t) : "on:" === e.slice(0, 3) ? (o = e.slice(3), s && t.removeEventListener(o, s), r && t.addEventListener(o, r)) : "oncapture:" === e.slice(0, 10) ? (o = e.slice(10), s && t.removeEventListener(o, s, !0), r && t.addEventListener(o, r, !0)) : "on" === e.slice(0, 2) ? (o = e.slice(2).toLowerCase(), !(u = tt.has(o)) && s && (s = Array.isArray(s) ? s[0] : s, t.removeEventListener(o, s)), (u || r) && (function(t, e, r, s) {
        if (s) Array.isArray(r) ? (t["$$" + e] = r[0], t[`$$${e}Data`] = r[1]) : t["$$" + e] = r;
        else if (Array.isArray(r)) {
            const s = r[0];
            t.addEventListener(e, r[0] = e => s.call(t, r[1], e))
        } else t.addEventListener(e, r)
    }(t, o, r, u), u) && nt([o])) : "attr:" === e.slice(0, 5) ? ot(t, e.slice(5), r) : (h = "prop:" === e.slice(0, 5)) || (l = K.has(e)) || !n && ((c = function(t, e) {
        return "object" == typeof(t = Z[t]) ? t[e] ? t.$ : void 0 : t
    }(e, t.tagName)) || (a = J.has(e))) || (i = t.nodeName.includes("-")) ? (h && (e = e.slice(5), a = !0), "class" === e || "className" === e ? it(t, r) : !i || a || l ? t[c || e] = r : t[function(t) {
        return t.toLowerCase().replace(/-([a-z])/g, ((t, e) => e.toUpperCase()))
    }(e)] = r) : (s = n && -1 < e.indexOf(":") && et[e.split(":")[0]]) ? function(t, e, r, s) {
        null == s ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, s)
    }(t, s, e, r) : ot(t, Q[e] || e, r), r)
}

function pt(t) {
    var e = "$$" + t.type;
    let r = t.composedPath && t.composedPath()[0] || t.target;
    for (t.target !== r && Object.defineProperty(t, "target", {
            configurable: !0,
            value: r
        }), Object.defineProperty(t, "currentTarget", {
            configurable: !0,
            get: () => r || document
        }); r;) {
        var s = r[e];
        if (s && !r.disabled) {
            var n = r[e + "Data"];
            if (void 0 !== n ? s.call(r, n, t) : s.call(r, t), t.cancelBubble) return
        }
        r = r._$host || r.parentNode || r.host
    }
}

function dt(t, e, r, s, n) {
    for (;
        "function" == typeof r;) r = r();
    if (e !== r) {
        var o = typeof e,
            i = void 0 !== s;
        if (t = i && r[0] && r[0].parentNode || t, "string" == o || "number" == o)
            if ("number" == o && (e = e.toString()), i) {
                let n = r[0];
                n && 3 === n.nodeType ? n.data = e : n = document.createTextNode(e), r = bt(t, r, s, n)
            } else r = "" !== r && "string" == typeof r ? t.firstChild.data = e : t.textContent = e;
        else if (null == e || "boolean" == o) r = bt(t, r, s);
        else {
            if ("function" == o) return k((() => {
                let n = e();
                for (;
                    "function" == typeof n;) n = n();
                r = dt(t, n, r, s)
            })), () => r;
            if (Array.isArray(e)) {
                const a = [];
                if (o = r && Array.isArray(r), ft(a, e, r, n)) return k((() => r = dt(t, a, r, s, !0))), () => r;
                if (0 === a.length) {
                    if (r = bt(t, r, s), i) return r
                } else o ? 0 === r.length ? gt(t, a, s) : function(t, e, r) {
                    let s = r.length,
                        n = e.length,
                        o = s,
                        i = 0,
                        a = 0,
                        l = e[n - 1].nextSibling,
                        c = null;
                    for (; i < n || a < o;)
                        if (e[i] === r[a]) i++, a++;
                        else {
                            for (; e[n - 1] === r[o - 1];) n--, o--;
                            if (n === i)
                                for (var h = o < s ? a ? r[a - 1].nextSibling : r[o - a] : l; a < o;) t.insertBefore(r[a++], h);
                            else if (o === a)
                                for (; i < n;) c && c.has(e[i]) || e[i].remove(), i++;
                            else if (e[i] === r[o - 1] && r[a] === e[n - 1]) {
                                var u = e[--n].nextSibling;
                                t.insertBefore(r[a++], e[i++].nextSibling), t.insertBefore(r[--o], u), e[n] = r[o]
                            } else {
                                if (!c) {
                                    c = new Map;
                                    let t = a;
                                    for (; t < o;) c.set(r[t], t++)
                                }
                                var p = c.get(e[i]);
                                if (null != p)
                                    if (a < p && p < o) {
                                        let s, l = i,
                                            h = 1;
                                        for (; ++l < n && l < o && null != (s = c.get(e[l])) && s === p + h;) h++;
                                        if (h > p - a)
                                            for (var d = e[i]; a < p;) t.insertBefore(r[a++], d);
                                        else t.replaceChild(r[a++], e[i++])
                                    } else i++;
                                else e[i++].remove()
                            }
                        }
                }(t, r, a) : (r && bt(t), gt(t, a));
                r = a
            } else if (e instanceof Node) {
                if (Array.isArray(r)) {
                    if (i) return r = bt(t, r, s, e);
                    bt(t, r, null, e)
                } else null != r && "" !== r && t.firstChild ? t.replaceChild(e, t.firstChild) : t.appendChild(e);
                r = e
            } else console.warn("Unrecognized value. Skipped inserting", e)
        }
    }
    return r
}

function ft(t, e, r, s) {
    let n = !1;
    for (let i = 0, a = e.length; i < a; i++) {
        let a = e[i],
            l = r && r[i];
        if (a instanceof Node) t.push(a);
        else if (null != a && !0 !== a && !1 !== a)
            if (Array.isArray(a)) n = ft(t, a, l) || n;
            else if ("function" == typeof a)
            if (s) {
                for (;
                    "function" == typeof a;) a = a();
                n = ft(t, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || n
            } else t.push(a), n = !0;
        else {
            var o = String(a);
            l && 3 === l.nodeType ? (l.data = o, t.push(l)) : t.push(document.createTextNode(o))
        }
    }
    return n
}

function gt(t, e, r = null) {
    for (let s = 0, n = e.length; s < n; s++) t.insertBefore(e[s], r)
}

function bt(t, e, r, s) {
    if (void 0 === r) return t.textContent = "";
    var n = s || document.createTextNode("");
    if (e.length) {
        let s = !1;
        for (let a = e.length - 1; 0 <= a; a--) {
            var o, i = e[a];
            n !== i ? (o = i.parentNode === t, s || a ? o && i.remove() : o ? t.replaceChild(n, i) : t.insertBefore(n, r)) : s = !0
        }
    } else t.insertBefore(n, r);
    return [n]
}

function yt(t) {
    return (e, r) => {
        const s = r.element;
        return w((n => {
            const o = function(t) {
                var e = Object.keys(t),
                    r = {};
                for (let s = 0; s < e.length; s++) {
                    const [n, o] = x(t[e[s]]);
                    Object.defineProperty(r, e[s], {
                        get: n,
                        set(t) {
                            o((() => t))
                        }
                    })
                }
                return r
            }(e);
            s.addPropertyChangedCallback(((t, e) => o[t] = e)), s.addReleaseCallback((() => {
                s.renderRoot.textContent = "", n()
            }));
            var i = t(o, r);
            return ct(s.renderRoot, i)
        }), function(t) {
            if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
            let e = t.parentNode;
            for (; e && !e._$owner && (!e.assignedSlot || !e.assignedSlot._$owner);) e = e.parentNode;
            return (e && e.assignedSlot ? e.assignedSlot : t)._$owner
        }(s))
    }
}

function mt(t, e, r) {
    return 2 === arguments.length && (r = e, e = {}), i(t, e)(yt(r))
}
const vt = {
    chatflowid: "",
    apiHost: void 0,
    chatflowConfig: void 0,
    theme: void 0
};
var wt = '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.left-0{left:0}.top-0{top:0}.z-10{z-index:10}.my-2{margin-bottom:8px;margin-top:8px}.-ml-1{margin-left:-4px}.mb-2{margin-bottom:8px}.ml-1{margin-left:4px}.ml-2{margin-left:8px}.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mr-3{margin-right:12px}.block{display:block}.flex{display:flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-32{height:128px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-9{height:36px}.h-full{height:100%}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-9{width:36px}.w-full{width:100%}.min-w-full{min-width:100%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-4{padding:16px}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-semibold{font-weight:600}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#0042da;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#3b81f6;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}a{color:#16bed7;font-weight:500}a:hover{text-decoration:underline}pre{word-wrap:break-word;font-size:13px;margin:5px;overflow:auto;padding:5px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;width:auto}.string{color:green}.number{color:#ff8c00}.boolean{color:blue}.null{color:#f0f}.key{color:#002b36}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--chatbot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:#9095a0!important;opacity:1!important}.text-input::placeholder{color:#9095a0!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.chatbot-button{background-color:#0042da;border:1px solid #0042da;border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{border:1px solid #0042da}.chatbot-button.selectable,.chatbot-host-bubble{background-color:#f7f8ff;color:var(--chatbot-host-bubble-color)}.chatbot-host-bubble>.bubble-typing{background-color:#f7f8ff;border:var(--chatbot-host-bubble-border);border-radius:6px}.chatbot-host-bubble iframe,.chatbot-host-bubble img,.chatbot-host-bubble video{border-radius:var(--chatbot-border-radius)}.chatbot-guest-bubble{background-color:#3b81f6;border-radius:6px;color:var(--chatbot-guest-bubble-color)}.chatbot-input{background-color:#fff;border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1);color:#303235}.chatbot-input-error-message{color:#303235}.chatbot-button>.send-icon{fill:var(--chatbot-button-color)}.chatbot-chat-view{max-width:800px}.ping span{background-color:#0042da}.rating-icon-container svg{stroke:#0042da;fill:#f7f8ff;height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:#0042da}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{background-color:#0042da;border-radius:var(--chatbot-border-radius)}.total-files-indicator{background-color:#0042da;color:var(--chatbot-button-color);font-size:10px}.chatbot-upload-input{transition:border-color .1s ease-out}.chatbot-upload-input.dragging-over{border-color:#0042da}.secondary-button{background-color:#f7f8ff;border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.chatbot-country-select{color:#303235}.chatbot-country-select,.chatbot-date-input{background-color:#fff;border-radius:var(--chatbot-border-radius)}.chatbot-date-input{color:#303235;color-scheme:light}.chatbot-popup-blocked-toast{border-radius:var(--chatbot-border-radius)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}';
const xt = t => null == t,
    kt = t => null != t,
    _t = async t => {
        try {
            var e = "string" == typeof t ? t : t.url,
                r = await fetch(e, {
                    method: "string" == typeof t ? "GET" : t.method,
                    mode: "cors",
                    headers: "string" != typeof t && kt(t.body) ? {
                        "Content-Type": "application/json"
                    } : void 0,
                    body: "string" != typeof t && kt(t.body) ? JSON.stringify(t.body) : void 0
                });
            let n;
            var s = r.headers.get("Content-Type");
            if (n = s && s.includes("application/json") ? await r.json() : await r.text(), r.ok) return {
                data: n
            };
            {
                let t;
                throw t = "object" == typeof n && "error" in n ? n.error : n || r.statusText
            }
        } catch (t) {
            return console.error(t), {
                error: t
            }
        }
    }, Ct = st('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'), St = st('<img alt="Bubble button icon">'), At = st('<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'), Pt = t => {
        {
            const e = At(),
                r = e.firstChild;
            return e.$$click = () => t.toggleBot(), e.style.setProperty("z-index", "42424242"), ct(e, U(X, {
                get when() {
                    return xt(t.customIconSrc)
                },
                keyed: !0,
                get children() {
                    const e = Ct();
                    return k((r => {
                        var s = t.iconColor ?? "white",
                            n = "stroke-2 fill-transparent absolute duration-200 transition " + (t.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === t.size ? " w-9" : " w-7");
                        return s !== r._v$ && (null != (r._v$ = s) ? e.style.setProperty("stroke", s) : e.style.removeProperty("stroke")), n !== r._v$2 && ot(e, "class", r._v$2 = n), r
                    }), {
                        _v$: void 0,
                        _v$2: void 0
                    }), e
                }
            }), r), ct(e, U(X, {
                get when() {
                    return t.customIconSrc
                },
                get children() {
                    const e = St();
                    return k((r => {
                        var s = t.customIconSrc,
                            n = "rounded-full object-cover" + (t.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === t.size ? " w-9 h-9" : " w-7 h-7");
                        return s !== r._v$3 && ot(e, "src", r._v$3 = s), n !== r._v$4 && it(e, r._v$4 = n), r
                    }), {
                        _v$3: void 0,
                        _v$4: void 0
                    }), e
                }
            }), r), k((s => {
                var n = "fixed shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in" + ("large" === t.size ? " w-16 h-16" : " w-12 h-12"),
                    o = t.backgroundColor ?? "#3B81F6",
                    i = t.right ? t.right.toString() + "px" : "20px",
                    a = t.bottom ? t.bottom.toString() + "px" : "20px",
                    l = t.iconColor ?? "white",
                    c = "absolute duration-200 transition " + (t.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0") + ("large" === t.size ? " w-9" : " w-7");
                return n !== s._v$5 && it(e, s._v$5 = n), o !== s._v$6 && (null != (s._v$6 = o) ? e.style.setProperty("background-color", o) : e.style.removeProperty("background-color")), i !== s._v$7 && (null != (s._v$7 = i) ? e.style.setProperty("right", i) : e.style.removeProperty("right")), a !== s._v$8 && (null != (s._v$8 = a) ? e.style.setProperty("bottom", a) : e.style.removeProperty("bottom")), l !== s._v$9 && (null != (s._v$9 = l) ? r.style.setProperty("fill", l) : r.style.removeProperty("fill")), c !== s._v$10 && ot(r, "class", s._v$10 = c), s
            }), {
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0,
                _v$8: void 0,
                _v$9: void 0,
                _v$10: void 0
            }), e
        }
    };
let $t;
nt(["click"]);
const Tt = new Uint8Array(16);

function Et() {
    if ($t = $t || "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) return $t(Tt);
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")
}
const Rt = [];
for (let t = 0; t < 256; ++t) Rt.push((t + 256).toString(16).slice(1));
var Ot, Bt, Lt = {
    randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
};

function Nt(t, e, r) {
    if (Lt.randomUUID && !e && !t) return Lt.randomUUID();
    var s = (t = t || {}).random || (t.rng || Et)();
    if (s[6] = 15 & s[6] | 64, s[8] = 63 & s[8] | 128, e) {
        r = r || 0;
        for (let t = 0; t < 16; ++t) e[r + t] = s[t];
        return e
    }
    return function(t, e = 0) {
        return Rt[t[e + 0]] + Rt[t[e + 1]] + Rt[t[e + 2]] + Rt[t[e + 3]] + "-" + Rt[t[e + 4]] + Rt[t[e + 5]] + "-" + Rt[t[e + 6]] + Rt[t[e + 7]] + "-" + Rt[t[e + 8]] + Rt[t[e + 9]] + "-" + Rt[t[e + 10]] + Rt[t[e + 11]] + Rt[t[e + 12]] + Rt[t[e + 13]] + Rt[t[e + 14]] + Rt[t[e + 15]]
    }(s)
}
const jt = st('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100" type="text">'),
    It = t => {
        const [e, r] = V(t, ["ref", "onInput"]);
        return (s = jt()).$$input = t => e.onInput(t.currentTarget.value), "function" == typeof(n = t.ref) ? lt(n, s) : t.ref = s, at(s, W({
            get disabled() {
                return t.disabled
            },
            get style() {
                return {
                    "font-size": t.fontSize ? t.fontSize + "px" : "16px"
                }
            }
        }, r), !1, !1), s;
        var s, n
    },
    [zt, Mt] = (nt(["input"]), x()),
    qt = st('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'),
    Dt = t => {
        return at(e = qt(), W({
            get style() {
                return {
                    fill: t.color ?? "#3B81F6"
                }
            }
        }, t), !0, !0), e;
        var e
    },
    Ut = st('<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4">'),
    Ft = t => {
        {
            const e = Ut();
            return k((() => ot(e, "stroke", t.color ?? "#3B81F6"))), e
        }
    },
    Gt = st('<button type="submit">'),
    Ht = st('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'),
    Wt = t => {
        return at(e = Gt(), W({
            get disabled() {
                return t.isDisabled || t.isLoading
            }
        }, t, {
            get class() {
                return "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " + t.class
            },
            style: {
                background: "transparent",
                border: "none"
            }
        }), !1, !0), ct(e, U(X, {
            get when() {
                return !t.isLoading
            },
            get fallback() {
                return U(Yt, {
                    class: "text-white"
                })
            },
            get children() {
                return U(Dt, {
                    get color() {
                        return t.sendButtonColor
                    },
                    get class() {
                        return "send-icon flex " + (t.disableIcon ? "hidden" : "")
                    }
                })
            }
        })), e;
        var e
    },
    Vt = t => {
        return at(e = Gt(), W({
            get disabled() {
                return t.isDisabled || t.isLoading
            }
        }, t, {
            get class() {
                return "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " + t.class
            },
            style: {
                background: "transparent",
                border: "none"
            },
            title: "New Chat"
        }), !1, !0), ct(e, U(X, {
            get when() {
                return !t.isLoading
            },
            get fallback() {
                return U(Yt, {
                    class: "text-white"
                })
            },
            get children() {
                return U(Ft, {
                    get color() {
                        return t.sendButtonColor
                    },
                    get class() {
                        return "send-icon flex " + (t.disableIcon ? "hidden" : "")
                    }
                })
            }
        })), e;
        var e
    },
    Yt = t => {
        return at(e = Ht(), W(t, {
            get class() {
                return "animate-spin -ml-1 mr-3 h-5 w-5 " + t.class
            },
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "data-testid": "loading-spinner"
        }), !0, !0), e;
        var e
    },
    Xt = st("<span>Send"),
    Jt = st('<div class="flex items-end justify-between chatbot-input" data-testid="input">'),
    Kt = t => {
        const [e, r] = x(t.defaultValue ?? "");
        let s;
        const n = t => r(t),
            o = () => {
                "" !== e() && s?.reportValidity() && t.onSubmit(e()), r("")
            },
            i = t => {
                var e = t.isComposing || 229 === t.keyCode;
                "Enter" !== t.key || e || o()
            };
        _((() => {
            t.disabled || zt() || !s || s.focus()
        })), A((() => {
            !zt() && s && s.focus()
        }));
        {
            const r = Jt();
            return r.$$keydown = i, r.style.setProperty("border-top", "1px solid #eeeeee"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "20px"), r.style.setProperty("right", "20px"), r.style.setProperty("bottom", "40px"), r.style.setProperty("margin", "auto"), r.style.setProperty("z-index", "1000"), ct(r, U(It, {
                ref(t) {
                    "function" == typeof s ? s(t) : s = t
                },
                onInput: n,
                get value() {
                    return e()
                },
                get fontSize() {
                    return t.fontSize
                },
                get disabled() {
                    return t.disabled
                },
                get placeholder() {
                    return t.placeholder ?? "Type your question"
                }
            }), null), ct(r, U(Wt, {
                get sendButtonColor() {
                    return t.sendButtonColor
                },
                type: "button",
                get isDisabled() {
                    return t.disabled || "" === e()
                },
                class: "my-2 ml-2",
                "on:click": o,
                get children() {
                    var t = Xt();
                    return t.style.setProperty("font-family", "Poppins, sans-serif"), t
                }
            }), null), k((e => {
                var s = t.backgroundColor ?? "#ffffff",
                    n = t.textColor ?? "#303235";
                return s !== e._v$ && (null != (e._v$ = s) ? r.style.setProperty("background-color", s) : r.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    },
    Qt = (nt(["keydown"]), st('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">')),
    Zt = () => {
        {
            const t = Qt(),
                e = t.firstChild;
            return k((r => {
                var s = "flex justify-center items-center rounded-full text-white relative " + (zt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                    n = "absolute top-0 left-0 " + (zt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
                return s !== r._v$ && it(t, r._v$ = s), n !== r._v$2 && ot(e, "class", r._v$2 = n), r
            }), {
                _v$: void 0,
                _v$2: void 0
            }), t
        }
    },
    te = st('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full">'),
    ee = t => {
        const [e, r] = x(t.initialAvatarSrc);
        return _((() => {
            e()?.startsWith("{{") && t.initialAvatarSrc?.startsWith("http") && r(t.initialAvatarSrc)
        })), U(X, {
            get when() {
                return (t => null != t && "" !== t)(e())
            },
            keyed: !0,
            get fallback() {
                return U(Zt, {})
            },
            get children() {
                const t = te(),
                    r = t.firstChild;
                return k((s => {
                    var n = "flex justify-center items-center rounded-full text-white relative flex-shrink-0 " + (zt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                        o = e();
                    return n !== s._v$ && it(t, s._v$ = n), o !== s._v$2 && ot(r, "src", s._v$2 = o), s
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), t
            }
        })
    };
class re {
    source;
    flags;
    constructor(t, e = "") {
        this.source = t.source, this.flags = e
    }
    setGroup(t, e) {
        let r = "string" == typeof e ? e : e.source;
        return r = r.replace(/(^|[^\[])\^/g, "$1"), this.source = this.source.replace(t, r), this
    }
    getRegexp() {
        return new RegExp(this.source, this.flags)
    }
}
const se = /[&<>"']/,
    ne = /[&<>"']/g,
    oe = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    ie = /[<>"']|&(?!#?\w+;)/,
    ae = /[<>"']|&(?!#?\w+;)/g;

function le(t, e) {
    if (e) {
        if (se.test(t)) return t.replace(ne, (t => oe[t]))
    } else if (ie.test(t)) return t.replace(ae, (t => oe[t]));
    return t
}

function ce(t) {
    return t.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, (function(t, e) {
        return "colon" === (e = e.toLowerCase()) ? ":" : "#" === e.charAt(0) ? "x" === e.charAt(1) ? String.fromCharCode(parseInt(e.substring(2), 16)) : String.fromCharCode(+e.substring(1)) : ""
    }))
}
var he;
(he = Ot = Ot || {})[he.space = 1] = "space", he[he.text = 2] = "text", he[he.paragraph = 3] = "paragraph", he[he.heading = 4] = "heading", he[he.listStart = 5] = "listStart", he[he.listEnd = 6] = "listEnd", he[he.looseItemStart = 7] = "looseItemStart", he[he.looseItemEnd = 8] = "looseItemEnd", he[he.listItemStart = 9] = "listItemStart", he[he.listItemEnd = 10] = "listItemEnd", he[he.blockquoteStart = 11] = "blockquoteStart", he[he.blockquoteEnd = 12] = "blockquoteEnd", he[he.code = 13] = "code", he[he.table = 14] = "table", he[he.html = 15] = "html", he[he.hr = 16] = "hr";
class ue {
    gfm = !0;
    tables = !0;
    breaks = !1;
    pedantic = !1;
    sanitize = !1;
    sanitizer;
    mangle = !0;
    smartLists = !1;
    silent = !1;
    highlight;
    langPrefix = "lang-";
    smartypants = !1;
    headerPrefix = "";
    renderer;
    xhtml = !1;
    escape = le;
    unescape = ce;
    isNoP
}
class pe {
    options;
    constructor(t) {
        this.options = t || ge.options
    }
    code(t, e, r, s) {
        this.options.highlight && null != (n = this.options.highlight(t, e)) && n !== t && (r = !0, t = n);
        var n = r ? t : this.options.escape(t, !0);
        return e ? `\n<pre><code class="${this.options.langPrefix+this.options.escape(e,!0)}">${n}\n</code></pre>\n` : `\n<pre><code>${n}\n</code></pre>\n`
    }
    blockquote(t) {
        return `<blockquote>\n${t}</blockquote>\n`
    }
    html(t) {
        return t
    }
    heading(t, e, r) {
        return `<h${e} id="${this.options.headerPrefix+r.toLowerCase().replace(/[^\w]+/g,"-")}">${t}</h${e}>\n`
    }
    hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
    }
    list(t, e) {
        return `\n<${e=e?"ol":"ul"}>\n${t}</${e}>\n`
    }
    listitem(t) {
        return "<li>" + t + "</li>\n"
    }
    paragraph(t) {
        return "<p>" + t + "</p>\n"
    }
    table(t, e) {
        return `\n<table>\n<thead>\n${t}</thead>\n<tbody>\n${e}</tbody>\n</table>\n`
    }
    tablerow(t) {
        return "<tr>\n" + t + "</tr>\n"
    }
    tablecell(t, e) {
        var r = e.header ? "th" : "td";
        return (e.align ? "<" + r + ' style="text-align:' + e.align + '">' : "<" + r + ">") + t + "</" + r + ">\n"
    }
    strong(t) {
        return "<strong>" + t + "</strong>"
    }
    em(t) {
        return "<em>" + t + "</em>"
    }
    codespan(t) {
        return "<code>" + t + "</code>"
    }
    br() {
        return this.options.xhtml ? "<br/>" : "<br>"
    }
    del(t) {
        return "<del>" + t + "</del>"
    }
    link(t, e, r) {
        if (this.options.sanitize) {
            let s;
            try {
                s = decodeURIComponent(this.options.unescape(t)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
                return r
            }
            if (0 === s.indexOf("javascript:") || 0 === s.indexOf("vbscript:") || 0 === s.indexOf("data:")) return r
        }
        let s = '<a href="' + t + '"';
        return e && (s += ' title="' + e + '"'), s + ">" + r + "</a>"
    }
    image(t, e, r) {
        let s = '<img src="' + t + '" alt="' + r + '"';
        return e && (s += ' title="' + e + '"'), s + (this.options.xhtml ? "/>" : ">")
    }
    text(t) {
        return t
    }
}
class de {
    staticThis;
    links;
    options;
    static rulesBase = null;
    static rulesPedantic = null;
    static rulesGfm = null;
    static rulesBreaks = null;
    rules;
    renderer;
    inLink;
    hasRulesGfm;
    ruleCallbacks;
    constructor(t, e, r = ge.options, s) {
        if (this.staticThis = t, this.links = e, this.options = r, this.renderer = s || this.options.renderer || new pe(this.options), !this.links) throw new Error("InlineLexer requires 'links' parameter.");
        this.setRules()
    }
    static output(t, e, r) {
        return new this(this, e, r).output(t)
    }
    static getRulesBase() {
        var t;
        return this.rulesBase || ((t = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
            tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
            link: /^!?\[(inside)\]\(href\)/,
            reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
            _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
            _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
        }).link = new re(t.link).setGroup("inside", t._inside).setGroup("href", t._href).getRegexp(), t.reflink = new re(t.reflink).setGroup("inside", t._inside).getRegexp(), this.rulesBase = t)
    }
    static getRulesPedantic() {
        return this.rulesPedantic || (this.rulesPedantic = {
            ...this.getRulesBase(),
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
        })
    }
    static getRulesGfm() {
        var t, e, r;
        return this.rulesGfm || (t = this.getRulesBase(), e = new re(t.escape).setGroup("])", "~|])").getRegexp(), r = new re(t.text).setGroup("]|", "~]|").setGroup("|", "|https?://|").getRegexp(), this.rulesGfm = {
            ...t,
            escape: e,
            url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
            del: /^~~(?=\S)([\s\S]*?\S)~~/,
            text: r
        })
    }
    static getRulesBreaks() {
        var t, e;
        return this.rulesBreaks || (t = this.getRulesGfm(), e = this.getRulesGfm(), this.rulesBreaks = {
            ...e,
            br: new re(t.br).setGroup("{2,}", "*").getRegexp(),
            text: new re(e.text).setGroup("{2,}", "*").getRegexp()
        })
    }
    setRules() {
        this.options.gfm ? this.options.breaks ? this.rules = this.staticThis.getRulesBreaks() : this.rules = this.staticThis.getRulesGfm() : this.options.pedantic ? this.rules = this.staticThis.getRulesPedantic() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.url
    }
    output(t) {
        let e, r = "";
        for (; t;)
            if (e = this.rules.escape.exec(t)) t = t.substring(e[0].length), r += e[1];
            else if (e = this.rules.autolink.exec(t)) {
            let s, n;
            t = t.substring(e[0].length), n = "@" === e[2] ? (s = this.options.escape(":" === e[1].charAt(6) ? this.mangle(e[1].substring(7)) : this.mangle(e[1])), this.mangle("mailto:") + s) : s = this.options.escape(e[1]), r += this.renderer.link(n, null, s)
        } else if (!this.inLink && this.hasRulesGfm && (e = this.rules.url.exec(t))) {
            t = t.substring(e[0].length);
            var s = this.options.escape(e[1]);
            r += this.renderer.link(s, null, s)
        } else if (e = this.rules.tag.exec(t)) !this.inLink && /^<a /i.test(e[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(e[0]) && (this.inLink = !1), t = t.substring(e[0].length), r += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : this.options.escape(e[0]) : e[0];
        else if (e = this.rules.link.exec(t)) t = t.substring(e[0].length), this.inLink = !0, r += this.outputLink(e, {
            href: e[2],
            title: e[3]
        }), this.inLink = !1;
        else if (e = (e = this.rules.reflink.exec(t)) || this.rules.nolink.exec(t)) {
            t = t.substring(e[0].length);
            s = (e[2] || e[1]).replace(/\s+/g, " ");
            var n = this.links[s.toLowerCase()];
            n && n.href ? (this.inLink = !0, r += this.outputLink(e, n), this.inLink = !1) : (r += e[0].charAt(0), t = e[0].substring(1) + t)
        } else if (e = this.rules.strong.exec(t)) t = t.substring(e[0].length), r += this.renderer.strong(this.output(e[2] || e[1]));
        else if (e = this.rules.em.exec(t)) t = t.substring(e[0].length), r += this.renderer.em(this.output(e[2] || e[1]));
        else if (e = this.rules.code.exec(t)) t = t.substring(e[0].length), r += this.renderer.codespan(this.options.escape(e[2].trim(), !0));
        else if (e = this.rules.br.exec(t)) t = t.substring(e[0].length), r += this.renderer.br();
        else if (this.hasRulesGfm && (e = this.rules.del.exec(t))) t = t.substring(e[0].length), r += this.renderer.del(this.output(e[1]));
        else if (e = this.rules.text.exec(t)) t = t.substring(e[0].length), r += this.renderer.text(this.options.escape(this.smartypants(e[0])));
        else if (t) throw new Error("Infinite loop on byte: " + t.charCodeAt(0));
        return r
    }
    outputLink(t, e) {
        var r = this.options.escape(e.href);
        e = e.title ? this.options.escape(e.title) : null;
        return "!" !== t[0].charAt(0) ? this.renderer.link(r, e, this.output(t[1])) : this.renderer.image(r, e, this.options.escape(t[1]))
    }
    smartypants(t) {
        return this.options.smartypants ? t.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/([{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/([{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : t
    }
    mangle(t) {
        if (!this.options.mangle) return t;
        let e = "";
        var r = t.length;
        for (let s = 0; s < r; s++) {
            let r;
            .5 < Math.random() && (r = "x" + t.charCodeAt(s).toString(16)), e += "&#" + r + ";"
        }
        return e
    }
}
class fe {
    simpleRenderers = [];
    tokens;
    token;
    inlineLexer;
    options;
    renderer;
    line = 0;
    constructor(t) {
        this.tokens = [], this.token = null, this.options = t || ge.options, this.renderer = this.options.renderer || new pe(this.options)
    }
    static parse(t, e, r) {
        return new this(r).parse(e, t)
    }
    parse(t, e) {
        this.inlineLexer = new de(de, t, this.options, this.renderer), this.tokens = e.reverse();
        let r = "";
        for (; this.next();) r += this.tok();
        return r
    }
    debug(t, e) {
        this.inlineLexer = new de(de, t, this.options, this.renderer), this.tokens = e.reverse();
        let r = "";
        for (; this.next();) {
            var s = this.tok();
            this.token.line = this.line += s.split("\n").length - 1, r += s
        }
        return r
    }
    next() {
        return this.token = this.tokens.pop()
    }
    getNextElement() {
        return this.tokens[this.tokens.length - 1]
    }
    parseText() {
        let t = this.token.text;
        for (var e;
            (e = this.getNextElement()) && e.type == Ot.text;) t += "\n" + this.next().text;
        return this.inlineLexer.output(t)
    }
    tok() {
        switch (this.token.type) {
            case Ot.space:
                return "";
            case Ot.paragraph:
                return this.renderer.paragraph(this.inlineLexer.output(this.token.text));
            case Ot.text:
                return this.options.isNoP ? this.parseText() : this.renderer.paragraph(this.parseText());
            case Ot.heading:
                return this.renderer.heading(this.inlineLexer.output(this.token.text), this.token.depth, this.token.text);
            case Ot.listStart: {
                let e = "";
                for (var t = this.token.ordered; this.next().type != Ot.listEnd;) e += this.tok();
                return this.renderer.list(e, t)
            }
            case Ot.listItemStart: {
                let t = "";
                for (; this.next().type != Ot.listItemEnd;) t += this.token.type == Ot.text ? this.parseText() : this.tok();
                return this.renderer.listitem(t)
            }
            case Ot.looseItemStart: {
                let t = "";
                for (; this.next().type != Ot.listItemEnd;) t += this.tok();
                return this.renderer.listitem(t)
            }
            case Ot.code:
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped, this.token.meta);
            case Ot.table: {
                t = "";
                let s, n = "";
                s = "";
                for (let t = 0; t < this.token.header.length; t++) {
                    var e = {
                            header: !0,
                            align: this.token.align[t]
                        },
                        r = this.inlineLexer.output(this.token.header[t]);
                    s += this.renderer.tablecell(r, e)
                }
                t += this.renderer.tablerow(s);
                for (const t of this.token.cells) {
                    s = "";
                    for (let e = 0; e < t.length; e++) s += this.renderer.tablecell(this.inlineLexer.output(t[e]), {
                        header: !1,
                        align: this.token.align[e]
                    });
                    n += this.renderer.tablerow(s)
                }
                return this.renderer.table(t, n)
            }
            case Ot.blockquoteStart: {
                let t = "";
                for (; this.next().type != Ot.blockquoteEnd;) t += this.tok();
                return this.renderer.blockquote(t)
            }
            case Ot.hr:
                return this.renderer.hr();
            case Ot.html:
                return t = this.token.pre || this.options.pedantic ? this.token.text : this.inlineLexer.output(this.token.text), this.renderer.html(t);
            default:
                if (this.simpleRenderers.length)
                    for (let t = 0; t < this.simpleRenderers.length; t++)
                        if (this.token.type == "simpleRule" + (t + 1)) return this.simpleRenderers[t].call(this.renderer, this.token.execArr);
                if (t = `Token with "${this.token.type}" type was not found.`, !this.options.silent) throw new Error(t);
                console.log(t)
        }
    }
}
class ge {
    static options = new ue;
    static simpleRenderers = [];
    static setOptions(t) {
        return Object.assign(this.options, t), this
    }
    static setBlockRule(t, e = (() => "")) {
        return be.simpleRules.push(t), this.simpleRenderers.push(e), this
    }
    static parse(t, e) {
        try {
            e = {
                ...this.options,
                ...e
            };
            var {
                tokens: r,
                links: s
            } = this.callBlockLexer(t, e);
            return this.callParser(r, s, e)
        } catch (t) {
            return this.callMe(t)
        }
    }
    static debug(t, e = this.options) {
        var {
            tokens: t,
            links: r
        } = this.callBlockLexer(t, e);
        let s = t.slice();
        return (e = new fe(e)).simpleRenderers = this.simpleRenderers, e = e.debug(r, t), {
            tokens: s = s.map((t => {
                t.type = Ot[t.type] || t.type;
                var e = t.line;
                return delete t.line, e ? {
                    line: e,
                    ...t
                } : t
            })),
            links: r,
            result: e
        }
    }
    static callBlockLexer(t = "", e) {
        if ("string" != typeof t) throw new Error(`Expected that the 'src' parameter would have a 'string' type, got '${typeof t}'`);
        return t = t.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n").replace(/^ +$/gm, ""), be.lex(t, e, !0)
    }
    static callParser(t, e, r) {
        var s;
        return this.simpleRenderers.length ? ((s = new fe(r)).simpleRenderers = this.simpleRenderers, s.parse(e, t)) : fe.parse(t, e, r)
    }
    static callMe(t) {
        if (t.message += "\nPlease report this to https://github.com/ts-stack/markdown", this.options.silent) return "<p>An error occured:</p><pre>" + this.options.escape(t.message + "", !0) + "</pre>";
        throw t
    }
}
class be {
    staticThis;
    static simpleRules = [];
    static rulesBase = null;
    static rulesGfm = null;
    static rulesTables = null;
    rules;
    options;
    links = {};
    tokens = [];
    hasRulesGfm;
    hasRulesTables;
    constructor(t, e) {
        this.staticThis = t, this.options = e || ge.options, this.setRules()
    }
    static lex(t, e, r, s) {
        return new this(this, e).getTokens(t, r, s)
    }
    static getRulesBase() {
        var t, e;
        return this.rulesBase || ((t = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
            list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
            text: /^[^\n]+/,
            bullet: /(?:[*+-]|\d+\.)/,
            item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
        }).item = new re(t.item, "gm").setGroup(/bull/g, t.bullet).getRegexp(), t.list = new re(t.list).setGroup(/bull/g, t.bullet).setGroup("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))").setGroup("def", "\\n+(?=" + t.def.source + ")").getRegexp(), e = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", t.html = new re(t.html).setGroup("comment", /<!--[\s\S]*?-->/).setGroup("closed", /<(tag)[\s\S]+?<\/\1>/).setGroup("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/).setGroup(/tag/g, e).getRegexp(), t.paragraph = new re(t.paragraph).setGroup("hr", t.hr).setGroup("heading", t.heading).setGroup("lheading", t.lheading).setGroup("blockquote", t.blockquote).setGroup("tag", "<" + e).setGroup("def", t.def).getRegexp(), this.rulesBase = t)
    }
    static getRulesGfm() {
        var t, e, r, s;
        return this.rulesGfm || (r = (e = {
            ...t = this.getRulesBase(),
            fences: /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
            paragraph: /^/,
            heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        }).fences.source.replace("\\1", "\\2"), s = t.list.source.replace("\\1", "\\3"), e.paragraph = new re(t.paragraph).setGroup("(?!", `(?!${r}|${s}|`).getRegexp(), this.rulesGfm = e)
    }
    static getRulesTable() {
        return this.rulesTables || (this.rulesTables = {
            ...this.getRulesGfm(),
            nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
            table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
        })
    }
    setRules() {
        this.options.gfm ? this.options.tables ? this.rules = this.staticThis.getRulesTable() : this.rules = this.staticThis.getRulesGfm() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.fences, this.hasRulesTables = void 0 !== this.rules.table
    }
    getTokens(t, e, r) {
        let s, n = t;
        t: for (; n;)
            if ((s = this.rules.newline.exec(n)) && (n = n.substring(s[0].length), 1 < s[0].length) && this.tokens.push({
                    type: Ot.space
                }), s = this.rules.code.exec(n)) {
                n = n.substring(s[0].length);
                var o = s[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                    type: Ot.code,
                    text: this.options.pedantic ? o : o.replace(/\n+$/, "")
                })
            } else if (this.hasRulesGfm && (s = this.rules.fences.exec(n))) n = n.substring(s[0].length), this.tokens.push({
            type: Ot.code,
            meta: s[2],
            lang: s[3],
            text: s[4] || ""
        });
        else if (s = this.rules.heading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ot.heading,
            depth: s[1].length,
            text: s[2]
        });
        else if (e && this.hasRulesTables && (s = this.rules.nptable.exec(n))) {
            n = n.substring(s[0].length);
            var i = {
                type: Ot.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < i.align.length; t++) /^ *-+: *$/.test(i.align[t]) ? i.align[t] = "right" : /^ *:-+: *$/.test(i.align[t]) ? i.align[t] = "center" : /^ *:-+ *$/.test(i.align[t]) ? i.align[t] = "left" : i.align[t] = null;
            var a = s[3].replace(/\n$/, "").split("\n");
            for (let t = 0; t < a.length; t++) i.cells[t] = a[t].split(/ *\| */);
            this.tokens.push(i)
        } else if (s = this.rules.lheading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ot.heading,
            depth: "=" === s[2] ? 1 : 2,
            text: s[1]
        });
        else if (s = this.rules.hr.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ot.hr
        });
        else if (s = this.rules.blockquote.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ot.blockquoteStart
        }), o = s[0].replace(/^ *> ?/gm, ""), this.getTokens(o), this.tokens.push({
            type: Ot.blockquoteEnd
        });
        else if (s = this.rules.list.exec(n)) {
            n = n.substring(s[0].length);
            var l, c = s[2],
                h = (this.tokens.push({
                    type: Ot.listStart,
                    ordered: 1 < c.length
                }), s[0].match(this.rules.item)),
                u = h.length;
            let t, e = !1;
            for (let s = 0; s < u; s++) {
                let o = h[s];
                l = o.length, -1 !== (o = o.replace(/^ *([*+-]|\d+\.) +/, "")).indexOf("\n ") && (l -= o.length, o = this.options.pedantic ? o.replace(/^ {1,4}/gm, "") : o.replace(new RegExp("^ {1," + l + "}", "gm"), "")), !this.options.smartLists || s === u - 1 || c === (l = this.staticThis.getRulesBase().bullet.exec(h[s + 1])[0]) || 1 < c.length && 1 < l.length || (n = h.slice(s + 1).join("\n") + n, s = u - 1), t = e || /\n\n(?!\s*$)/.test(o), s !== u - 1 && (e = "\n" === o.charAt(o.length - 1), t = t || e), this.tokens.push({
                    type: t ? Ot.looseItemStart : Ot.listItemStart
                }), this.getTokens(o, !1, r), this.tokens.push({
                    type: Ot.listItemEnd
                })
            }
            this.tokens.push({
                type: Ot.listEnd
            })
        } else if (s = this.rules.html.exec(n)) {
            n = n.substring(s[0].length);
            var p = s[1];
            this.tokens.push({
                type: this.options.sanitize ? Ot.paragraph : Ot.html,
                pre: !this.options.sanitizer && ("pre" === p || "script" === p || "style" === p),
                text: s[0]
            })
        } else if (e && (s = this.rules.def.exec(n))) n = n.substring(s[0].length), this.links[s[1].toLowerCase()] = {
            href: s[2],
            title: s[3]
        };
        else if (e && this.hasRulesTables && (s = this.rules.table.exec(n))) {
            n = n.substring(s[0].length);
            var d = {
                type: Ot.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < d.align.length; t++) /^ *-+: *$/.test(d.align[t]) ? d.align[t] = "right" : /^ *:-+: *$/.test(d.align[t]) ? d.align[t] = "center" : /^ *:-+ *$/.test(d.align[t]) ? d.align[t] = "left" : d.align[t] = null;
            var f = s[3].replace(/(?: *\| *)?\n$/, "").split("\n");
            for (let t = 0; t < f.length; t++) d.cells[t] = f[t].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            this.tokens.push(d)
        } else {
            if (this.staticThis.simpleRules.length) {
                var g = this.staticThis.simpleRules;
                for (let t = 0; t < g.length; t++)
                    if (s = g[t].exec(n)) {
                        n = n.substring(s[0].length);
                        var b = "simpleRule" + (t + 1);
                        this.tokens.push({
                            type: b,
                            execArr: s
                        });
                        continue t
                    }
            }
            if (e && (s = this.rules.paragraph.exec(n))) n = n.substring(s[0].length), "\n" === s[1].slice(-1) ? this.tokens.push({
                type: Ot.paragraph,
                text: s[1].slice(0, -1)
            }) : this.tokens.push({
                type: 0 < this.tokens.length ? Ot.paragraph : Ot.text,
                text: s[1]
            });
            else if (s = this.rules.text.exec(n)) n = n.substring(s[0].length), this.tokens.push({
                type: Ot.text,
                text: s[0]
            });
            else if (n) throw new Error("Infinite loop on byte: " + n.charCodeAt(0) + `, near text '${n.slice(0,30)}...'`)
        }
        return {
            tokens: this.tokens,
            links: this.links
        }
    }
}
const ye = st('<div class="flex justify-end mb-2 items-end guest-container"><span class="px-4 py-2 mr-2 whitespace-pre-wrap max-w-full chatbot-guest-bubble" data-testid="guest-bubble">'),
    me = (ge.setOptions({
        isNoP: !0
    }), t => {
        let e;
        A((() => {
            e && (e.innerHTML = ge.parse(t.message))
        }));
        {
            const r = ye(),
                s = r.firstChild;
            r.style.setProperty("margin-left", "50px");
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("border-radius", "6px"), ct(r, U(X, {
                get when() {
                    return t.showAvatar
                },
                get children() {
                    return U(ee, {
                        get initialAvatarSrc() {
                            return t.avatarSrc
                        }
                    })
                }
            }), null), k((e => {
                var r = t.backgroundColor ?? "#3B81F6",
                    n = t.textColor ?? "#ffffff";
                return r !== e._v$ && (null != (e._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    }),
    ve = st('<div class="flex justify-start mb-2 items-start host-container"><span class="px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    we = (ge.setOptions({
        isNoP: !0
    }), t => {
        let e;
        A((() => {
            e && (e.innerHTML = ge.parse(t.message))
        }));
        {
            const r = ve(),
                s = r.firstChild;
            r.style.setProperty("margin-right", "50px"), ct(r, U(X, {
                get when() {
                    return t.showAvatar
                },
                get children() {
                    return U(ee, {
                        get initialAvatarSrc() {
                            return t.avatarSrc
                        }
                    })
                }
            }), s);
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("border-radius", "6px"), k((e => {
                var r = t.backgroundColor ?? "#f7f8ff",
                    n = t.textColor ?? "#303235";
                return r !== e._v$ && (null != (e._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    }),
    xe = st('<div class="flex items-center"><div class="w-2 h-2 mr-1 rounded-full bubble1"></div><div class="w-2 h-2 mr-1 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'),
    ke = () => xe(),
    _e = st('<div class="flex justify-start mb-2 items-start animate-fade-in host-container"><span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    Ce = () => {
        return ct((t = _e()).firstChild, U(ke, {})), t;
        var t
    },
    Se = st('<div data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="flex justify-start mb-2 items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"><span class="px-2 py-1 ml-1 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    Ae = t => {
        return r = (e = Se()).firstChild, e.$$click = () => t.onSourceClick?.(), r.style.setProperty("width", "max-content"), r.style.setProperty("max-width", "80px"), r.style.setProperty("font-size", "13px"), r.style.setProperty("border-radius", "15px"), r.style.setProperty("cursor", "pointer"), r.style.setProperty("text-overflow", "ellipsis"), r.style.setProperty("overflow", "hidden"), r.style.setProperty("white-space", "nowrap"), ct(r, (() => t.pageContent)), e;
        var e, r
    },
    Pe = (nt(["click"]), st('<span style="display:none;"><a href="#"><span>')),
    $e = "#303235",
    Te = t => {
        let e, r;
        const s = r => {
            r.forEach((r => {
                r.removedNodes.forEach((r => {
                    "id" in r && e && "lite-badge" == r.id && (console.log("Sorry, you can't remove the brand 😅"), t.botContainer?.append(e))
                }))
            }))
        };
        A((() => {
            document && t.botContainer && (r = new MutationObserver(s)).observe(t.botContainer, {
                subtree: !1,
                childList: !0
            })
        })), P((() => {
            r && r.disconnect()
        }));
        {
            const r = Pe(),
                s = r.firstChild.nextSibling;
                r.style.setProperty("display", "none");
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("font-weight", "bold"), k((e => {
                var n = t.poweredByTextColor ?? $e,
                    o = t.badgeBackgroundColor ?? "#ffffff",
                    i = t.poweredByTextColor ?? $e;
                return n !== e._v$ && (null != (e._v$ = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), o !== e._v$2 && (null != (e._v$2 = o) ? r.style.setProperty("background-color", o) : r.style.removeProperty("background-color")), i !== e._v$3 && (null != (e._v$3 = i) ? s.style.setProperty("color", i) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), r
        }
    },
    Ee = Object.create(null),
    Re = (Ee.open = "0", Ee.close = "1", Ee.ping = "2", Ee.pong = "3", Ee.message = "4", Ee.upgrade = "5", Ee.noop = "6", Object.create(null)),
    Oe = (Object.keys(Ee).forEach((t => {
        Re[Ee[t]] = t
    })), {
        type: "error",
        data: "parser error"
    }),
    Be = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob),
    Le = "function" == typeof ArrayBuffer,
    Ne = t => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer,
    je = ({
        type: t,
        data: e
    }, r, s) => Be && e instanceof Blob ? r ? s(e) : Ie(e, s) : Le && (e instanceof ArrayBuffer || Ne(e)) ? r ? s(e) : Ie(new Blob([e]), s) : s(Ee[t] + (e || "")),
    Ie = (t, e) => {
        const r = new FileReader;
        return r.onload = function() {
            var t = r.result.split(",")[1];
            e("b" + (t || ""))
        }, r.readAsDataURL(t)
    };

function ze(t) {
    return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
}
let Me;
const qe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    De = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
for (let t = 0; t < 64; t++) De[qe.charCodeAt(t)] = t;
const Ue = "function" == typeof ArrayBuffer,
    Fe = (t, e) => {
        var r;
        return "string" != typeof t ? {
            type: "message",
            data: He(t, e)
        } : "b" === (r = t.charAt(0)) ? {
            type: "message",
            data: Ge(t.substring(1), e)
        } : Re[r] ? 1 < t.length ? {
            type: Re[r],
            data: t.substring(1)
        } : {
            type: Re[r]
        } : Oe
    },
    Ge = (t, e) => {
        var r;
        return Ue ? (r = (t => {
            let e, r, s, n, o, i = .75 * t.length,
                a = t.length,
                l = 0;
            "=" === t[t.length - 1] && (i--, "=" === t[t.length - 2]) && i--;
            var c = new ArrayBuffer(i),
                h = new Uint8Array(c);
            for (e = 0; e < a; e += 4) r = De[t.charCodeAt(e)], s = De[t.charCodeAt(e + 1)], n = De[t.charCodeAt(e + 2)], o = De[t.charCodeAt(e + 3)], h[l++] = r << 2 | s >> 4, h[l++] = (15 & s) << 4 | n >> 2, h[l++] = (3 & n) << 6 | 63 & o;
            return c
        })(t), He(r, e)) : {
            base64: !0,
            data: t
        }
    },
    He = (t, e) => "blob" !== e ? t instanceof ArrayBuffer ? t : t.buffer : t instanceof Blob ? t : new Blob([t]),
    We = String.fromCharCode(30);

function Ve() {
    return new TransformStream({
        transform(t, e) {
            ! function(t, e) {
                Be && t.data instanceof Blob ? t.data.arrayBuffer().then(ze).then(e) : Le && (t.data instanceof ArrayBuffer || Ne(t.data)) ? e(ze(t.data)) : je(t, !1, (t => {
                    Me = Me || new TextEncoder, e(Me.encode(t))
                }))
            }(t, (r => {
                var s, n = r.length;
                let o;
                n < 126 ? (o = new Uint8Array(1), new DataView(o.buffer).setUint8(0, n)) : n < 65536 ? (o = new Uint8Array(3), (s = new DataView(o.buffer)).setUint8(0, 126), s.setUint16(1, n)) : (o = new Uint8Array(9), (s = new DataView(o.buffer)).setUint8(0, 127), s.setBigUint64(1, BigInt(n))), t.data && "string" != typeof t.data && (o[0] |= 128), e.enqueue(o), e.enqueue(r)
            }))
        }
    })
}
let Ye;

function Xe(t) {
    return t.reduce(((t, e) => t + e.length), 0)
}

function Je(t, e) {
    if (t[0].length === e) return t.shift();
    var r = new Uint8Array(e);
    let s = 0;
    for (let n = 0; n < e; n++) r[n] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
    return t.length && s < t[0].length && (t[0] = t[0].slice(s)), r
}

function Ke(t) {
    if (t) return function(t) {
        for (var e in Ke.prototype) t[e] = Ke.prototype[e];
        return t
    }(t)
}
Ke.prototype.on = Ke.prototype.addEventListener = function(t, e) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
}, Ke.prototype.once = function(t, e) {
    function r() {
        this.off(t, r), e.apply(this, arguments)
    }
    return r.fn = e, this.on(t, r), this
}, Ke.prototype.off = Ke.prototype.removeListener = Ke.prototype.removeAllListeners = Ke.prototype.removeEventListener = function(t, e) {
    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) this._callbacks = {};
    else {
        var r = this._callbacks["$" + t];
        if (r)
            if (1 == arguments.length) delete this._callbacks["$" + t];
            else {
                for (var s, n = 0; n < r.length; n++)
                    if ((s = r[n]) === e || s.fn === e) {
                        r.splice(n, 1);
                        break
                    } 0 === r.length && delete this._callbacks["$" + t]
            }
    }
    return this
}, Ke.prototype.emit = function(t) {
    this._callbacks = this._callbacks || {};
    for (var e = new Array(arguments.length - 1), r = this._callbacks["$" + t], s = 1; s < arguments.length; s++) e[s - 1] = arguments[s];
    if (r) {
        s = 0;
        for (var n = (r = r.slice(0)).length; s < n; ++s) r[s].apply(this, e)
    }
    return this
}, Ke.prototype.emitReserved = Ke.prototype.emit, Ke.prototype.listeners = function(t) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
}, Ke.prototype.hasListeners = function(t) {
    return !!this.listeners(t).length
};
const Qe = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();

function Ze(t, ...e) {
    return e.reduce(((e, r) => (t.hasOwnProperty(r) && (e[r] = t[r]), e)), {})
}
const tr = Qe.setTimeout,
    er = Qe.clearTimeout;

function rr(t, e) {
    e.useNativeTimers ? (t.setTimeoutFn = tr.bind(Qe), t.clearTimeoutFn = er.bind(Qe)) : (t.setTimeoutFn = Qe.setTimeout.bind(Qe), t.clearTimeoutFn = Qe.clearTimeout.bind(Qe))
}

function sr(t) {
    return "string" == typeof t ? function(t) {
        let e, r = 0;
        for (let s = 0, n = t.length; s < n; s++)(e = t.charCodeAt(s)) < 128 ? r += 1 : e < 2048 ? r += 2 : e < 55296 || 57344 <= e ? r += 3 : (s++, r += 4);
        return r
    }(t) : Math.ceil(1.33 * (t.byteLength || t.size))
}
class nr extends Error {
    constructor(t, e, r) {
        super(t), this.description = e, this.context = r, this.type = "TransportError"
    }
}
class or extends Ke {
    constructor(t) {
        super(), this.writable = !1, rr(this, t), this.opts = t, this.query = t.query, this.socket = t.socket
    }
    onError(t, e, r) {
        return super.emitReserved("error", new nr(t, e, r)), this
    }
    open() {
        return this.readyState = "opening", this.doOpen(), this
    }
    close() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }
    send(t) {
        "open" === this.readyState && this.write(t)
    }
    onOpen() {
        this.readyState = "open", this.writable = !0, super.emitReserved("open")
    }
    onData(t) {
        t = Fe(t, this.socket.binaryType), this.onPacket(t)
    }
    onPacket(t) {
        super.emitReserved("packet", t)
    }
    onClose(t) {
        this.readyState = "closed", super.emitReserved("close", t)
    }
    pause(t) {}
    createUri(t, e = {}) {
        return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(e)
    }
    _hostname() {
        var t = this.opts.hostname;
        return -1 === t.indexOf(":") ? t : "[" + t + "]"
    }
    _port() {
        return this.opts.port && (this.opts.secure && Number(443 !== this.opts.port) || !this.opts.secure && 80 !== Number(this.opts.port)) ? ":" + this.opts.port : ""
    }
    _query(t) {
        return (t = function(t) {
            let e = "";
            for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
            return e
        }(t)).length ? "?" + t : ""
    }
}
const ir = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
    ar = 64,
    lr = {};
let cr, hr = 0,
    ur = 0;

function pr(t) {
    let e = "";
    for (; e = ir[t % ar] + e, 0 < (t = Math.floor(t / ar)););
    return e
}

function dr() {
    var t = pr(+new Date);
    return t !== cr ? (hr = 0, cr = t) : t + "." + pr(hr++)
}
for (; ur < ar; ur++) lr[ir[ur]] = ur;
let fr = !1;
try {
    fr = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
} catch (he) {}
const gr = fr;

function br(t) {
    t = t.xdomain;
    try {
        if ("undefined" != typeof XMLHttpRequest && (!t || gr)) return new XMLHttpRequest
    } catch (t) {}
    if (!t) try {
        return new(Qe[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
    } catch (t) {}
}

function yr() {}
const mr = null != new br({
    xdomain: !1
}).responseType;
class vr extends Ke {
    constructor(t, e) {
        super(), rr(this, e), this.opts = e, this.method = e.method || "GET", this.uri = t, this.data = void 0 !== e.data ? e.data : null, this.create()
    }
    create() {
        var t, e = Ze(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        e.xdomain = !!this.opts.xd;
        const r = this.xhr = new br(e);
        try {
            r.open(this.method, this.uri, !0);
            try {
                if (this.opts.extraHeaders)
                    for (var s in r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0), this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(s) && r.setRequestHeader(s, this.opts.extraHeaders[s])
            } catch (t) {}
            if ("POST" === this.method) try {
                r.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
            } catch (t) {}
            try {
                r.setRequestHeader("Accept", "*/*")
            } catch (t) {}
            null != (t = this.opts.cookieJar) && t.addCookies(r), "withCredentials" in r && (r.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (r.timeout = this.opts.requestTimeout), r.onreadystatechange = () => {
                var t;
                3 === r.readyState && null != (t = this.opts.cookieJar) && t.parseCookies(r), 4 === r.readyState && (200 === r.status || 1223 === r.status ? this.onLoad() : this.setTimeoutFn((() => {
                    this.onError("number" == typeof r.status ? r.status : 0)
                }), 0))
            }, r.send(this.data)
        } catch (t) {
            return void this.setTimeoutFn((() => {
                this.onError(t)
            }), 0)
        }
        "undefined" != typeof document && (this.index = vr.requestsCount++, vr.requests[this.index] = this)
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr), this.cleanup(!0)
    }
    cleanup(t) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.xhr.onreadystatechange = yr, t) try {
                this.xhr.abort()
            } catch (t) {}
            "undefined" != typeof document && delete vr.requests[this.index], this.xhr = null
        }
    }
    onLoad() {
        var t = this.xhr.responseText;
        null !== t && (this.emitReserved("data", t), this.emitReserved("success"), this.cleanup())
    }
    abort() {
        this.cleanup()
    }
}
if (vr.requestsCount = 0, vr.requests = {}, "undefined" != typeof document)
    if ("function" == typeof attachEvent) attachEvent("onunload", wr);
    else if ("function" == typeof addEventListener) {
    addEventListener("onpagehide" in Qe ? "pagehide" : "unload", wr, !1)
}

function wr() {
    for (var t in vr.requests) vr.requests.hasOwnProperty(t) && vr.requests[t].abort()
}
const xr = "function" == typeof Promise && "function" == typeof Promise.resolve ? t => Promise.resolve().then(t) : (t, e) => e(t, 0),
    kr = Qe.WebSocket || Qe.MozWebSocket,
    _r = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
const Cr = {
        websocket: class extends or {
            constructor(t) {
                super(t), this.supportsBinary = !t.forceBase64
            }
            get name() {
                return "websocket"
            }
            doOpen() {
                if (this.check()) {
                    var t = this.uri(),
                        e = this.opts.protocols,
                        r = _r ? {} : Ze(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
                    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
                    try {
                        this.ws = _r ? new kr(t, e, r) : e ? new kr(t, e) : new kr(t)
                    } catch (t) {
                        return this.emitReserved("error", t)
                    }
                    this.ws.binaryType = this.socket.binaryType, this.addEventListeners()
                }
            }
            addEventListeners() {
                this.ws.onopen = () => {
                    this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
                }, this.ws.onclose = t => this.onClose({
                    description: "websocket connection closed",
                    context: t
                }), this.ws.onmessage = t => this.onData(t.data), this.ws.onerror = t => this.onError("websocket error", t)
            }
            write(t) {
                this.writable = !1;
                for (let r = 0; r < t.length; r++) {
                    var e = t[r];
                    const s = r === t.length - 1;
                    je(e, this.supportsBinary, (t => {
                        try {
                            this.ws.send(t)
                        } catch (t) {}
                        s && xr((() => {
                            this.writable = !0, this.emitReserved("drain")
                        }), this.setTimeoutFn)
                    }))
                }
            }
            doClose() {
                void 0 !== this.ws && (this.ws.close(), this.ws = null)
            }
            uri() {
                var t = this.opts.secure ? "wss" : "ws",
                    e = this.query || {};
                return this.opts.timestampRequests && (e[this.opts.timestampParam] = dr()), this.supportsBinary || (e.b64 = 1), this.createUri(t, e)
            }
            check() {
                return !!kr
            }
        },
        webtransport: class extends or {
            get name() {
                return "webtransport"
            }
            doOpen() {
                "function" == typeof WebTransport && (this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]), this.transport.closed.then((() => {
                    this.onClose()
                })).catch((t => {
                    this.onError("webtransport error", t)
                })), this.transport.ready.then((() => {
                    this.transport.createBidirectionalStream().then((t => {
                        var e = function(t, e) {
                            Ye = Ye || new TextDecoder;
                            const r = [];
                            let s = 0,
                                n = -1,
                                o = !1;
                            return new TransformStream({
                                transform(i, a) {
                                    for (r.push(i);;) {
                                        if (0 === s) {
                                            if (Xe(r) < 1) break;
                                            var l = Je(r, 1);
                                            o = 128 == (128 & l[0]), n = 127 & l[0], s = n < 126 ? 3 : 126 === n ? 1 : 2
                                        } else if (1 === s) {
                                            if (Xe(r) < 2) break;
                                            l = Je(r, 2), n = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3
                                        } else if (2 === s) {
                                            if (Xe(r) < 8) break;
                                            var c = Je(r, 8),
                                                h = (c = new DataView(c.buffer, c.byteOffset, c.length)).getUint32(0);
                                            if (h > Math.pow(2, 21) - 1) {
                                                a.enqueue(Oe);
                                                break
                                            }
                                            n = h * Math.pow(2, 32) + c.getUint32(4), s = 3
                                        } else {
                                            if (Xe(r) < n) break;
                                            h = Je(r, n), a.enqueue(Fe(o ? h : Ye.decode(h), e)), s = 0
                                        }
                                        if (0 === n || n > t) {
                                            a.enqueue(Oe);
                                            break
                                        }
                                    }
                                }
                            })
                        }(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                        const r = t.readable.pipeThrough(e).getReader();
                        (e = Ve()).readable.pipeTo(t.writable), this.writer = e.writable.getWriter();
                        const s = () => {
                            r.read().then((({
                                done: t,
                                value: e
                            }) => {
                                t || (this.onPacket(e), s())
                            })).catch((t => {}))
                        };
                        s(), t = {
                            type: "open"
                        }, this.query.sid && (t.data = `{"sid":"${this.query.sid}"}`), this.writer.write(t).then((() => this.onOpen()))
                    }))
                })))
            }
            write(t) {
                this.writable = !1;
                for (let r = 0; r < t.length; r++) {
                    var e = t[r];
                    const s = r === t.length - 1;
                    this.writer.write(e).then((() => {
                        s && xr((() => {
                            this.writable = !0, this.emitReserved("drain")
                        }), this.setTimeoutFn)
                    }))
                }
            }
            doClose() {
                var t;
                null != (t = this.transport) && t.close()
            }
        },
        polling: class extends or {
            constructor(t) {
                if (super(t), this.polling = !1, "undefined" != typeof location) {
                    var e = "https:" === location.protocol;
                    let r = location.port;
                    r = r || (e ? "443" : "80"), this.xd = "undefined" != typeof location && t.hostname !== location.hostname || r !== t.port
                }
                e = t && t.forceBase64, this.supportsBinary = mr && !e, this.opts.withCredentials && (this.cookieJar = void 0)
            }
            get name() {
                return "polling"
            }
            doOpen() {
                this.poll()
            }
            pause(t) {
                this.readyState = "pausing";
                const e = () => {
                    this.readyState = "paused", t()
                };
                if (this.polling || !this.writable) {
                    let t = 0;
                    this.polling && (t++, this.once("pollComplete", (function() {
                        --t || e()
                    }))), this.writable || (t++, this.once("drain", (function() {
                        --t || e()
                    })))
                } else e()
            }
            poll() {
                this.polling = !0, this.doPoll(), this.emitReserved("poll")
            }
            onData(t) {
                ((t, e) => {
                    var r = t.split(We),
                        s = [];
                    for (let t = 0; t < r.length; t++) {
                        var n = Fe(r[t], e);
                        if (s.push(n), "error" === n.type) break
                    }
                    return s
                })(t, this.socket.binaryType).forEach((t => {
                    if ("opening" === this.readyState && "open" === t.type && this.onOpen(), "close" === t.type) return this.onClose({
                        description: "transport closed by the server"
                    }), !1;
                    this.onPacket(t)
                })), "closed" !== this.readyState && (this.polling = !1, this.emitReserved("pollComplete"), "open" === this.readyState) && this.poll()
            }
            doClose() {
                var t = () => {
                    this.write([{
                        type: "close"
                    }])
                };
                "open" === this.readyState ? t() : this.once("open", t)
            }
            write(t) {
                this.writable = !1, ((t, e) => {
                    const r = t.length,
                        s = new Array(r);
                    let n = 0;
                    t.forEach(((t, o) => {
                        je(t, !1, (t => {
                            s[o] = t, ++n === r && e(s.join(We))
                        }))
                    }))
                })(t, (t => {
                    this.doWrite(t, (() => {
                        this.writable = !0, this.emitReserved("drain")
                    }))
                }))
            }
            uri() {
                var t = this.opts.secure ? "https" : "http",
                    e = this.query || {};
                return !1 !== this.opts.timestampRequests && (e[this.opts.timestampParam] = dr()), this.supportsBinary || e.sid || (e.b64 = 1), this.createUri(t, e)
            }
            request(t = {}) {
                return Object.assign(t, {
                    xd: this.xd,
                    cookieJar: this.cookieJar
                }, this.opts), new vr(this.uri(), t)
            }
            doWrite(t, e) {
                (t = this.request({
                    method: "POST",
                    data: t
                })).on("success", e), t.on("error", ((t, e) => {
                    this.onError("xhr post error", t, e)
                }))
            }
            doPoll() {
                var t = this.request();
                t.on("data", this.onData.bind(this)), t.on("error", ((t, e) => {
                    this.onError("xhr poll error", t, e)
                })), this.pollXhr = t
            }
        }
    },
    Sr = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    Ar = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];

function Pr(t) {
    var e = t,
        r = t.indexOf("["),
        s = t.indexOf("]"); - 1 != r && -1 != s && (t = t.substring(0, r) + t.substring(r, s).replace(/:/g, ";") + t.substring(s, t.length));
    let n = Sr.exec(t || ""),
        o = {},
        i = 14;
    for (; i--;) o[Ar[i]] = n[i] || "";
    return -1 != r && -1 != s && (o.source = e, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = function(t, e) {
        var r = e.replace(/\/{2,9}/g, "/").split("/");
        return "/" != e.slice(0, 1) && 0 !== e.length || r.splice(0, 1), "/" == e.slice(-1) && r.splice(r.length - 1, 1), r
    }(0, o.path), o.queryKey = function(t, e) {
        const r = {};
        return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, s) {
            e && (r[e] = s)
        })), r
    }(0, o.query), o
}
let $r = class t extends Ke {
    constructor(t, e = {}) {
        super(), this.binaryType = "arraybuffer", this.writeBuffer = [], t && "object" == typeof t && (e = t, t = null), t ? (t = Pr(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = Pr(e.host).host), rr(this, e), this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? "443" : "80"), this.transports = e.transports || ["polling", "websocket", "webtransport"], this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: !1
        }, e), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), "string" == typeof this.opts.query && (this.opts.query = function(t) {
            var e = {},
                r = t.split("&");
            for (let t = 0, n = r.length; t < n; t++) {
                var s = r[t].split("=");
                e[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
            }
            return e
        }(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, "function" == typeof addEventListener && (this.opts.closeOnBeforeunload && (this.beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close())
        }, addEventListener("beforeunload", this.beforeunloadEventListener, !1)), "localhost" !== this.hostname) && (this.offlineEventListener = () => {
            this.onClose("transport close", {
                description: "network connection lost"
            })
        }, addEventListener("offline", this.offlineEventListener, !1)), this.open()
    }
    createTransport(t) {
        var e = ((e = Object.assign({}, this.opts.query)).EIO = 4, e.transport = t, this.id && (e.sid = this.id), Object.assign({}, this.opts, {
            query: e,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[t]));
        return new Cr[t](e)
    }
    open() {
        let e;
        if (this.opts.rememberUpgrade && t.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
        else {
            if (0 === this.transports.length) return void this.setTimeoutFn((() => {
                this.emitReserved("error", "No transports available")
            }), 0);
            e = this.transports[0]
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e)
        } catch (e) {
            return this.transports.shift(), void this.open()
        }
        e.open(), this.setTransport(e)
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(), (this.transport = t).on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (t => this.onClose("transport close", t)))
    }
    probe(e) {
        let r = this.createTransport(e),
            s = !1;
        t.priorWebsocketSuccess = !1;
        const n = () => {
            s || (r.send([{
                type: "ping",
                data: "probe"
            }]), r.once("packet", (e => {
                s || ("pong" === e.type && "probe" === e.data ? (this.upgrading = !0, this.emitReserved("upgrading", r), r && (t.priorWebsocketSuccess = "websocket" === r.name, this.transport.pause((() => {
                    s || "closed" !== this.readyState && (h(), this.setTransport(r), r.send([{
                        type: "upgrade"
                    }]), this.emitReserved("upgrade", r), r = null, this.upgrading = !1, this.flush())
                })))) : ((e = new Error("probe error")).transport = r.name, this.emitReserved("upgradeError", e)))
            })))
        };

        function o() {
            s || (s = !0, h(), r.close(), r = null)
        }
        const i = t => {
            (t = new Error("probe error: " + t)).transport = r.name, o(), this.emitReserved("upgradeError", t)
        };

        function a() {
            i("transport closed")
        }

        function l() {
            i("socket closed")
        }

        function c(t) {
            r && t.name !== r.name && o()
        }
        const h = () => {
            r.removeListener("open", n), r.removeListener("error", i), r.removeListener("close", a), this.off("close", l), this.off("upgrading", c)
        };
        r.once("open", n), r.once("error", i), r.once("close", a), this.once("close", l), this.once("upgrading", c), -1 !== this.upgrades.indexOf("webtransport") && "webtransport" !== e ? this.setTimeoutFn((() => {
            s || r.open()
        }), 200) : r.open()
    }
    onOpen() {
        if (this.readyState = "open", t.priorWebsocketSuccess = "websocket" === this.transport.name, this.emitReserved("open"), this.flush(), "open" === this.readyState && this.opts.upgrade) {
            let t = 0;
            for (var e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
        }
    }
    onPacket(t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), this.resetPingTimeout(), t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "ping":
                this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
                break;
            case "error":
                var e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;
            case "message":
                this.emitReserved("data", t.data), this.emitReserved("message", t.data)
        }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.maxPayload = t.maxPayload, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout()
    }
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn((() => {
            this.onClose("ping timeout")
        }), this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref()
    }
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen), (this.prevBufferLen = 0) === this.writeBuffer.length ? this.emitReserved("drain") : this.flush()
    }
    flush() {
        var t;
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (t = this.getWritablePackets(), this.transport.send(t), this.prevBufferLen = t.length, this.emitReserved("flush"))
    }
    getWritablePackets() {
        if (this.maxPayload && "polling" === this.transport.name && 1 < this.writeBuffer.length) {
            let e = 1;
            for (let r = 0; r < this.writeBuffer.length; r++) {
                var t = this.writeBuffer[r].data;
                if (t && (e += sr(t)), 0 < r && e > this.maxPayload) return this.writeBuffer.slice(0, r);
                e += 2
            }
        }
        return this.writeBuffer
    }
    write(t, e, r) {
        return this.sendPacket("message", t, e, r), this
    }
    send(t, e, r) {
        return this.sendPacket("message", t, e, r), this
    }
    sendPacket(t, e, r, s) {
        "function" == typeof e && (s = e, e = void 0), "function" == typeof r && (s = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState && ((r = r || {}).compress = !1 !== r.compress, this.emitReserved("packetCreate", t = {
            type: t,
            data: e,
            options: r
        }), this.writeBuffer.push(t), s && this.once("flush", s), this.flush())
    }
    close() {
        const t = () => {
                this.onClose("forced close"), this.transport.close()
            },
            e = () => {
                this.off("upgrade", e), this.off("upgradeError", e), t()
            },
            r = () => {
                this.once("upgrade", e), this.once("upgradeError", e)
            };
        return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", (() => {
            (this.upgrading ? r : t)()
        })) : (this.upgrading ? r : t)()), this
    }
    onError(e) {
        t.priorWebsocketSuccess = !1, this.emitReserved("error", e), this.onClose("transport error", e)
    }
    onClose(t, e) {
        "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1), removeEventListener("offline", this.offlineEventListener, !1)), this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0)
    }
    filterUpgrades(t) {
        var e = [];
        let r = 0;
        for (var s = t.length; r < s; r++) ~this.transports.indexOf(t[r]) && e.push(t[r]);
        return e
    }
};
$r.protocol = 4;
const Tr = "function" == typeof ArrayBuffer,
    Er = t => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer,
    Rr = Object.prototype.toString,
    Or = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Rr.call(Blob),
    Br = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === Rr.call(File);

function Lr(t) {
    return Tr && (t instanceof ArrayBuffer || Er(t)) || Or && t instanceof Blob || Br && t instanceof File
}

function Nr(t, e) {
    if (t && "object" == typeof t)
        if (Array.isArray(t)) {
            for (let e = 0, r = t.length; e < r; e++)
                if (Nr(t[e])) return !0
        } else {
            if (Lr(t)) return !0;
            if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return Nr(t.toJSON(), !0);
            for (const e in t)
                if (Object.prototype.hasOwnProperty.call(t, e) && Nr(t[e])) return !0
        } return !1
}

function jr(t) {
    var e = [],
        r = t.data;
    return t.data = Ir(r, e), t.attachments = e.length, {
        packet: t,
        buffers: e
    }
}

function Ir(t, e) {
    if (!t) return t;
    var r;
    if (Lr(t)) return r = {
        _placeholder: !0,
        num: e.length
    }, e.push(t), r;
    if (Array.isArray(t)) {
        var s = new Array(t.length);
        for (let r = 0; r < t.length; r++) s[r] = Ir(t[r], e);
        return s
    }
    if ("object" != typeof t || t instanceof Date) return t;
    var n = {};
    for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = Ir(t[r], e));
    return n
}

function zr(t, e) {
    return t.data = Mr(t.data, e), delete t.attachments, t
}

function Mr(t, e) {
    if (t) {
        if (t && !0 === t._placeholder) {
            if ("number" == typeof t.num && 0 <= t.num && t.num < e.length) return e[t.num];
            throw new Error("illegal attachments")
        }
        if (Array.isArray(t))
            for (let r = 0; r < t.length; r++) t[r] = Mr(t[r], e);
        else if ("object" == typeof t)
            for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (t[r] = Mr(t[r], e))
    }
    return t
}
const qr = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener"];
! function(t) {
    t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK"
}(Bt = Bt || {});

function Dr(t) {
    return "[object Object]" === Object.prototype.toString.call(t)
}
class Ur extends Ke {
    constructor(t) {
        super(), this.reviver = t
    }
    add(t) {
        let e;
        if ("string" == typeof t) {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            var r = (e = this.decodeString(t)).type === Bt.BINARY_EVENT;
            (!r && e.type !== Bt.BINARY_ACK || (e.type = r ? Bt.EVENT : Bt.ACK, this.reconstructor = new Fr(e), 0 === e.attachments)) && super.emitReserved("decoded", e)
        } else {
            if (!Lr(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (e = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, super.emitReserved("decoded", e))
        }
    }
    decodeString(t) {
        let e = 0;
        var r = {
            type: Number(t.charAt(0))
        };
        if (void 0 === Bt[r.type]) throw new Error("unknown packet type " + r.type);
        if (r.type === Bt.BINARY_EVENT || r.type === Bt.BINARY_ACK) {
            for (var s = e + 1;
                "-" !== t.charAt(++e) && e != t.length;);
            if ((s = t.substring(s, e)) != Number(s) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
            r.attachments = Number(s)
        }
        if ("/" === t.charAt(e + 1)) {
            for (s = e + 1; ++e && "," !== t.charAt(e) && e !== t.length;);
            r.nsp = t.substring(s, e)
        } else r.nsp = "/";
        if ("" !== (s = t.charAt(e + 1)) && Number(s) == s) {
            for (s = e + 1; ++e;) {
                var n = t.charAt(e);
                if (null == n || Number(n) != n) {
                    --e;
                    break
                }
                if (e === t.length) break
            }
            r.id = Number(t.substring(s, e + 1))
        }
        if (t.charAt(++e)) {
            if (s = this.tryParse(t.substr(e)), !Ur.isPayloadValid(r.type, s)) throw new Error("invalid payload");
            r.data = s
        }
        return r
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver)
        } catch (t) {
            return !1
        }
    }
    static isPayloadValid(t, e) {
        switch (t) {
            case Bt.CONNECT:
                return Dr(e);
            case Bt.DISCONNECT:
                return void 0 === e;
            case Bt.CONNECT_ERROR:
                return "string" == typeof e || Dr(e);
            case Bt.EVENT:
            case Bt.BINARY_EVENT:
                return Array.isArray(e) && ("number" == typeof e[0] || "string" == typeof e[0] && -1 === qr.indexOf(e[0]));
            case Bt.ACK:
            case Bt.BINARY_ACK:
                return Array.isArray(e)
        }
    }
    destroy() {
        this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null)
    }
}
class Fr {
    constructor(t) {
        this.packet = t, this.buffers = [], this.reconPack = t
    }
    takeBinaryData(t) {
        return this.buffers.push(t), this.buffers.length === this.reconPack.attachments ? (t = zr(this.reconPack, this.buffers), this.finishedReconstruction(), t) : null
    }
    finishedReconstruction() {
        this.reconPack = null, this.buffers = []
    }
}
var Gr = Object.freeze({
    __proto__: null,
    Decoder: Ur,
    Encoder: class {
        constructor(t) {
            this.replacer = t
        }
        encode(t) {
            return t.type !== Bt.EVENT && t.type !== Bt.ACK || !Nr(t) ? [this.encodeAsString(t)] : this.encodeAsBinary({
                type: t.type === Bt.EVENT ? Bt.BINARY_EVENT : Bt.BINARY_ACK,
                nsp: t.nsp,
                data: t.data,
                id: t.id
            })
        }
        encodeAsString(t) {
            let e = "" + t.type;
            return t.type !== Bt.BINARY_EVENT && t.type !== Bt.BINARY_ACK || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data, this.replacer)), e
        }
        encodeAsBinary(t) {
            t = jr(t);
            var e = this.encodeAsString(t.packet);
            return (t = t.buffers).unshift(e), t
        }
    },
    get PacketType() {
        return Bt
    },
    protocol: 5
});

function Hr(t, e, r) {
    return t.on(e, r),
        function() {
            t.off(e, r)
        }
}
const Wr = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
});
class Vr extends Ke {
    constructor(t, e, r) {
        super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = e, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open()
    }
    get disconnected() {
        return !this.connected
    }
    subEvents() {
        var t;
        this.subs || (t = this.io, this.subs = [Hr(t, "open", this.onopen.bind(this)), Hr(t, "packet", this.onpacket.bind(this)), Hr(t, "error", this.onerror.bind(this)), Hr(t, "close", this.onclose.bind(this))])
    }
    get active() {
        return !!this.subs
    }
    connect() {
        return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this
    }
    open() {
        return this.connect()
    }
    send(...t) {
        return t.unshift("message"), this.emit.apply(this, t), this
    }
    emit(t, ...e) {
        if (Wr.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
        var r, s;
        return e.unshift(t), !this._opts.retries || this.flags.fromQueue || this.flags.volatile ? ((t = {
            type: Bt.EVENT,
            data: e,
            options: {}
        }).options.compress = !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (r = this.ids++, s = e.pop(), this._registerAckCallback(r, s), t.id = r), s = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable, (!this.flags.volatile || s && this.connected) && (this.connected ? (this.notifyOutgoingListeners(t), this.packet(t)) : this.sendBuffer.push(t)), this.flags = {}) : this._addToQueue(e), this
    }
    _registerAckCallback(t, e) {
        var r = null != (r = this.flags.timeout) ? r : this._opts.ackTimeout;
        if (void 0 === r) this.acks[t] = e;
        else {
            const s = this.io.setTimeoutFn((() => {
                delete this.acks[t];
                for (let e = 0; e < this.sendBuffer.length; e++) this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
                e.call(this, new Error("operation has timed out"))
            }), r);
            this.acks[t] = (...t) => {
                this.io.clearTimeoutFn(s), e.apply(this, [null, ...t])
            }
        }
    }
    emitWithAck(t, ...e) {
        const r = void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
        return new Promise(((s, n) => {
            e.push(((t, e) => r ? t ? n(t) : s(e) : s(t))), this.emit(t, ...e)
        }))
    }
    _addToQueue(t) {
        let e;
        "function" == typeof t[t.length - 1] && (e = t.pop());
        const r = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({
                fromQueue: !0
            }, this.flags)
        };
        t.push(((t, ...s) => {
            if (r === this._queue[0]) return null !== t ? r.tryCount > this._opts.retries && (this._queue.shift(), e) && e(t) : (this._queue.shift(), e && e(null, ...s)), r.pending = !1, this._drainQueue()
        })), this._queue.push(r), this._drainQueue()
    }
    _drainQueue(t = !1) {
        var e;
        !this.connected || 0 === this._queue.length || (e = this._queue[0]).pending && !t || (e.pending = !0, e.tryCount++, this.flags = e.flags, this.emit.apply(this, e.args))
    }
    packet(t) {
        t.nsp = this.nsp, this.io._packet(t)
    }
    onopen() {
        "function" == typeof this.auth ? this.auth((t => {
            this._sendConnectPacket(t)
        })) : this._sendConnectPacket(this.auth)
    }
    _sendConnectPacket(t) {
        this.packet({
            type: Bt.CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, t) : t
        })
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t)
    }
    onclose(t, e) {
        this.connected = !1, delete this.id, this.emitReserved("disconnect", t, e)
    }
    onpacket(t) {
        if (t.nsp === this.nsp) switch (t.type) {
            case Bt.CONNECT:
                t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case Bt.EVENT:
            case Bt.BINARY_EVENT:
                this.onevent(t);
                break;
            case Bt.ACK:
            case Bt.BINARY_ACK:
                this.onack(t);
                break;
            case Bt.DISCONNECT:
                this.ondisconnect();
                break;
            case Bt.CONNECT_ERROR:
                this.destroy();
                var e = new Error(t.data.message);
                e.data = t.data.data, this.emitReserved("connect_error", e)
        }
    }
    onevent(t) {
        var e = t.data || [];
        null != t.id && e.push(this.ack(t.id)), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e))
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length)
            for (const e of this._anyListeners.slice()) e.apply(this, t);
        super.emit.apply(this, t), this._pid && t.length && "string" == typeof t[t.length - 1] && (this._lastOffset = t[t.length - 1])
    }
    ack(t) {
        const e = this;
        let r = !1;
        return function(...s) {
            r || (r = !0, e.packet({
                type: Bt.ACK,
                id: t,
                data: s
            }))
        }
    }
    onack(t) {
        var e = this.acks[t.id];
        "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id])
    }
    onconnect(t, e) {
        this.id = t, this.recovered = e && this._pid === e, this._pid = e, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0)
    }
    emitBuffered() {
        this.receiveBuffer.forEach((t => this.emitEvent(t))), this.receiveBuffer = [], this.sendBuffer.forEach((t => {
            this.notifyOutgoingListeners(t), this.packet(t)
        })), this.sendBuffer = []
    }
    ondisconnect() {
        this.destroy(), this.onclose("io server disconnect")
    }
    destroy() {
        this.subs && (this.subs.forEach((t => t())), this.subs = void 0), this.io._destroy(this)
    }
    disconnect() {
        return this.connected && this.packet({
            type: Bt.DISCONNECT
        }), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }
    close() {
        return this.disconnect()
    }
    compress(t) {
        return this.flags.compress = t, this
    }
    get volatile() {
        return this.flags.volatile = !0, this
    }
    timeout(t) {
        return this.flags.timeout = t, this
    }
    onAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this
    }
    prependAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this
    }
    offAny(t) {
        if (this._anyListeners)
            if (t) {
                var e = this._anyListeners;
                for (let r = 0; r < e.length; r++)
                    if (t === e[r]) return e.splice(r, 1), this
            } else this._anyListeners = [];
        return this
    }
    listenersAny() {
        return this._anyListeners || []
    }
    onAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this
    }
    prependAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this
    }
    offAnyOutgoing(t) {
        if (this._anyOutgoingListeners)
            if (t) {
                var e = this._anyOutgoingListeners;
                for (let r = 0; r < e.length; r++)
                    if (t === e[r]) return e.splice(r, 1), this
            } else this._anyOutgoingListeners = [];
        return this
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || []
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length)
            for (const e of this._anyOutgoingListeners.slice()) e.apply(this, t.data)
    }
}

function Yr(t) {
    this.ms = (t = t || {}).min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
}
Yr.prototype.duration = function() {
    var t, e, r = this.ms * Math.pow(this.factor, this.attempts++);
    return this.jitter && (t = Math.random(), e = Math.floor(t * this.jitter * r), r = 0 == (1 & Math.floor(10 * t)) ? r - e : r + e), 0 | Math.min(r, this.max)
}, Yr.prototype.reset = function() {
    this.attempts = 0
}, Yr.prototype.setMin = function(t) {
    this.ms = t
}, Yr.prototype.setMax = function(t) {
    this.max = t
}, Yr.prototype.setJitter = function(t) {
    this.jitter = t
};
class Xr extends Ke {
    constructor(t, e) {
        super(), this.nsps = {}, this.subs = [], t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.opts = e, rr(this, e), this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(null != (r = e.randomizationFactor) ? r : .5), this.backoff = new Yr({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this._readyState = "closed", this.uri = t;
        var r = e.parser || Gr;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this._autoConnect = !1 !== e.autoConnect, this._autoConnect && this.open()
    }
    reconnection(t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
    }
    reconnectionAttempts(t) {
        return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this)
    }
    reconnectionDelay(t) {
        var e;
        return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null != (e = this.backoff) && e.setMin(t), this)
    }
    randomizationFactor(t) {
        var e;
        return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, null != (e = this.backoff) && e.setJitter(t), this)
    }
    reconnectionDelayMax(t) {
        var e;
        return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, null != (e = this.backoff) && e.setMax(t), this)
    }
    timeout(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout
    }
    maybeReconnectOnOpen() {
        !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }
    open(t) {
        if (!~this._readyState.indexOf("open")) {
            this.engine = new $r(this.uri, this.opts);
            const s = this.engine,
                n = this,
                o = (this._readyState = "opening", this.skipReconnect = !1, Hr(s, "open", (function() {
                    n.onopen(), t && t()
                }))),
                i = e => {
                    this.cleanup(), this._readyState = "closed", this.emitReserved("error", e), t ? t(e) : this.maybeReconnectOnOpen()
                };
            var e = Hr(s, "error", i);
            if (!1 !== this._timeout) {
                var r = this._timeout;
                const t = this.setTimeoutFn((() => {
                    o(), i(new Error("timeout")), s.close()
                }), r);
                this.opts.autoUnref && t.unref(), this.subs.push((() => {
                    this.clearTimeoutFn(t)
                }))
            }
            this.subs.push(o), this.subs.push(e)
        }
        return this
    }
    connect(t) {
        return this.open(t)
    }
    onopen() {
        this.cleanup(), this._readyState = "open", this.emitReserved("open");
        var t = this.engine;
        this.subs.push(Hr(t, "ping", this.onping.bind(this)), Hr(t, "data", this.ondata.bind(this)), Hr(t, "error", this.onerror.bind(this)), Hr(t, "close", this.onclose.bind(this)), Hr(this.decoder, "decoded", this.ondecoded.bind(this)))
    }
    onping() {
        this.emitReserved("ping")
    }
    ondata(t) {
        try {
            this.decoder.add(t)
        } catch (t) {
            this.onclose("parse error", t)
        }
    }
    ondecoded(t) {
        xr((() => {
            this.emitReserved("packet", t)
        }), this.setTimeoutFn)
    }
    onerror(t) {
        this.emitReserved("error", t)
    }
    socket(t, e) {
        let r = this.nsps[t];
        return r ? this._autoConnect && !r.active && r.connect() : (r = new Vr(this, t, e), this.nsps[t] = r), r
    }
    _destroy(t) {
        for (const t of Object.keys(this.nsps)) {
            if (this.nsps[t].active) return
        }
        this._close()
    }
    _packet(t) {
        var e = this.encoder.encode(t);
        for (let r = 0; r < e.length; r++) this.engine.write(e[r], t.options)
    }
    cleanup() {
        this.subs.forEach((t => t())), this.subs.length = 0, this.decoder.destroy()
    }
    _close() {
        this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close()
    }
    disconnect() {
        return this._close()
    }
    onclose(t, e) {
        this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, e), this._reconnection && !this.skipReconnect && this.reconnect()
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
        else {
            var e = this.backoff.duration();
            this._reconnecting = !0;
            const r = this.setTimeoutFn((() => {
                t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), t.skipReconnect) || t.open((e => {
                    e ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", e)) : t.onreconnect()
                }))
            }), e);
            this.opts.autoUnref && r.unref(), this.subs.push((() => {
                this.clearTimeoutFn(r)
            }))
        }
    }
    onreconnect() {
        var t = this.backoff.attempts;
        this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t)
    }
}
const Jr = {};

function Kr(t, e) {
    "object" == typeof t && (e = t, t = void 0);
    t = function(t, e = "", r) {
        let s = t;
        return r = r || "undefined" != typeof location && location, "string" == typeof(t = null == t ? r.protocol + "//" + r.host : t) && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t), /^(https?|wss?):\/\//.test(t) || (t = void 0 !== r ? r.protocol + "//" + t : "https://" + t), s = Pr(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/", t = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host, s.id = s.protocol + "://" + t + ":" + s.port + e, s.href = s.protocol + "://" + t + (r && r.port === s.port ? "" : ":" + s.port), s
    }(t, (e = e || {}).path || "/socket.io");
    var r = t.source,
        s = t.id,
        n = t.path;
    n = Jr[s] && n in Jr[s].nsps;
    let o;
    return o = (n = e.forceNew || e["force new connection"] || !1 === e.multiplex || n) ? new Xr(r, e) : (Jr[s] || (Jr[s] = new Xr(r, e)), Jr[s]), t.query && !e.query && (e.query = t.queryKey), o.socket(t.path, e)
}
Object.assign(Kr, {
    Manager: Xr,
    Socket: Vr,
    io: Kr,
    connect: Kr
});
const Qr = st("<style>"),
    Zr = st('<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">'),
    ts = st("<div><pre>");
const es = t => {
        let e;
        const [r] = V(t, ["onOpen", "onClose", "isOpen", "value"]), [s, n] = (A((() => {
            e && (e.innerHTML = function(t) {
                return (t = (t = "string" != typeof t ? JSON.stringify(t, void 0, 2) : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (function(t) {
                    let e = "number";
                    return /^"/.test(t) ? e = /:$/.test(t) ? "key" : "string" : /true|false/.test(t) ? e = "boolean" : /null/.test(t) && (e = "null"), '<span class="' + e + '">' + t + "</span>"
                }))
            }(JSON.stringify(t?.value, void 0, 2)))
        })), x(r.isOpen ?? !1)), o = (_((() => {
            xt(t.isOpen) || t.isOpen === s() || a()
        })), t => {
            t.stopPropagation()
        }), i = () => {
            n(!1), r.onClose?.(), document.body.style.overflow = "auto"
        }, a = () => {
            s() ? i() : (n(!0), r.onOpen?.(), document.body.style.overflow = "hidden")
        };
        return U(X, {
            get when() {
                return s()
            },
            get children() {
                return [(ct(n = Qr(), wt), n), (n = Zr(), r = n.firstChild, s = r.nextSibling.nextSibling.firstChild.firstChild, n.style.setProperty("z-index", "1100"), n.addEventListener("click", i), ct(r, wt), s.style.setProperty("background-color", "transparent"), s.style.setProperty("margin-left", "20px"), s.style.setProperty("margin-right", "20px"), s.addEventListener("click", o), s.addEventListener("pointerdown", o), ct(s, (() => {
                    const r = C((() => !!t.value));
                    return () => {
                        return r() && (s = (t = ts()).firstChild, t.style.setProperty("background", "white"), t.style.setProperty("margin", "auto"), t.style.setProperty("padding", "7px"), "function" == typeof(n = e) ? lt(n, s) : e = s, t);
                        var t, s, n
                    }
                })()), n)];
                var r, s, n
            }
        })
    },
    rs = st("<div>"),
    ss = st('<span class="px-3 whitespace-pre-wrap font-semibold max-w-full">'),
    ns = st("<span>Clear"),
    os = st('<div><div class="flex w-full h-full justify-center"><div class="overflow-y-scroll min-w-full w-full min-h-full px-3 pt-10 relative scrollable-container chatbot-chat-view scroll-smooth"></div><div><div>'),
    is = st('<div class="w-full h-32">'),
    as = "Hi there! How can I help?",
    ls = t => {
        let e, r, s;
        const [n, o] = x(""), [i, a] = x(!1), [l, c] = x(!1), [h, u] = x({}), [p, d] = x([{
            message: t.welcomeMessage ?? as,
            type: "apiMessage"
        }], {
            equals: !1
        }), [f, g] = x(""), [b, y] = x(!1), [m, v] = x(Nt()), w = (A((() => {
            r && setTimeout((() => {
                e?.scrollTo(0, e.scrollHeight)
            }), 50)
        })), () => {
            setTimeout((() => {
                e?.scrollTo(0, e.scrollHeight)
            }), 50)
        }), S = e => {
            localStorage.setItem(t.chatflowid + "_EXTERNAL", JSON.stringify({
                chatId: m(),
                chatHistory: e
            }))
        }, P = t => {
            d((e => {
                var r = e.map(((r, s) => s === e.length - 1 ? {
                    ...r,
                    message: r.message + t
                } : r));
                return S(r), [...r]
            }))
        }, $ = t => {
            d((e => {
                var r = e.map(((r, s) => s === e.length - 1 ? {
                    ...r,
                    sourceDocuments: t
                } : r));
                return S(r), [...r]
            }))
        }, T = async e => {
            if (o(e), "" !== e.trim()) {
                a(!0), w();
                const n = t.welcomeMessage ?? as;
                var r, s = p().filter((t => t.message !== n));
                s = (d((t => (t = [...t, {
                    message: e,
                    type: "userMessage"
                }], S(t), t))), {
                    question: e,
                    history: s,
                    chatId: m()
                }), s = (t.chatflowConfig && (s.overrideConfig = t.chatflowConfig), b() && (s.socketIOClientId = f()), await (({
                    chatflowid: t,
                    apiHost: e = "http://localhost:3000",
                    body: r
                }) => _t({
                    method: "POST",
                    url: e + "/api/v1/prediction/" + t,
                    body: r
                }))({
                    chatflowid: t.chatflowid,
                    apiHost: t.apiHost,
                    body: s
                }));
                if (s.data) {
                    const t = s.data;
                    if (!b()) {
                        let e = "";
                        e = t.text || (t.json ? JSON.stringify(t.json, null, 2) : JSON.stringify(t, null, 2)), d((r => (r = [...r, {
                            message: e,
                            sourceDocuments: t?.sourceDocuments,
                            type: "apiMessage"
                        }], S(r), r)))
                    }
                    a(!1), o(""), w()
                }
                s.error && (s = s.error, console.error(s), s = "string" == typeof s ? s : s.response.data || s.response.status + ": " + s.response.statusText, [r = "Oops! There seems to be an error. Please try again."] = [s], d((t => (t = [...t, {
                    message: r,
                    type: "apiMessage"
                }], S(t), t))), a(!1), o(""), w())
            }
        }, E = () => {
            try {
                localStorage.removeItem(t.chatflowid + "_EXTERNAL"), v(Nt()), d([{
                    message: t.welcomeMessage ?? as,
                    type: "apiMessage"
                }])
            } catch (t) {
                var e = t.response.data || t.response.status + ": " + t.response.statusText;
                console.error("error: " + e)
            }
        }, R = (_((() => {
            p() && w()
        })), _((() => {
            t.fontSize && s && (s.style.fontSize = t.fontSize + "px")
        })), _((async () => {
            var e = ((e = localStorage.getItem(t.chatflowid + "_EXTERNAL")) && (e = JSON.parse(e), v(e.chatId), e = e.chatHistory.map((t => {
                var e = {
                    message: t.message,
                    type: t.type
                };
                return t.sourceDocuments && (e.sourceDocuments = t.sourceDocuments), e
            })), d([...e])), await (({
                chatflowid: t,
                apiHost: e = "http://localhost:3000"
            }) => _t({
                method: "GET",
                url: e + "/api/v1/chatflows-streaming/" + t
            }))({
                chatflowid: t.chatflowid,
                apiHost: t.apiHost
            })).data;
            e && y(e?.isStreaming ?? !1);
            const r = Kr(t.apiHost);
            return r.on("connect", (() => {
                g(r.id)
            })), r.on("start", (() => {
                d((t => [...t, {
                    message: "",
                    type: "apiMessage"
                }]))
            })), r.on("sourceDocuments", $), r.on("token", P), () => {
                o(""), a(!1), d([{
                    message: t.welcomeMessage ?? as,
                    type: "apiMessage"
                }]), r && (r.disconnect(), g(""))
            }
        })), t => {
            try {
                return new URL(t)
            } catch (t) {}
        });
        return [(() => {
            const o = os(),
                a = o.firstChild,
                l = a.firstChild,
                h = l.nextSibling,
                d = h.firstChild;
            var f;
            return "function" == typeof(f = ("function" == typeof(f = s) ? lt(f, o) : s = o, e)) ? lt(f, l) : e = l, l.style.setProperty("padding-bottom", "100px"), l.style.setProperty("padding-top", "70px"), ct(l, U(Y, {
                get each() {
                    return [...p()]
                },
                children: (e, r) => [C((() => {
                    const r = C((() => "userMessage" === e.type));
                    return () => r() && U(me, {
                        get message() {
                            return e.message
                        },
                        get backgroundColor() {
                            return t.userMessage?.backgroundColor
                        },
                        get textColor() {
                            return t.userMessage?.textColor
                        },
                        get showAvatar() {
                            return t.userMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return t.userMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const r = C((() => "apiMessage" === e.type));
                    return () => r() && U(we, {
                        get message() {
                            return e.message
                        },
                        get backgroundColor() {
                            return t.botMessage?.backgroundColor
                        },
                        get textColor() {
                            return t.botMessage?.textColor
                        },
                        get showAvatar() {
                            return t.botMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return t.botMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const t = C((() => !("userMessage" !== e.type || !i() || r() !== p().length - 1)));
                    return () => t() && U(Ce, {})
                })()), C((() => {
                    const t = C((() => !(!e.sourceDocuments || !e.sourceDocuments.length)));
                    return () => {
                        return t() && ((r = rs()).style.setProperty("display", "flex"), r.style.setProperty("flex-direction", "row"), r.style.setProperty("width", "100%"), ct(r, U(Y, {
                            get each() {
                                return [...(t => {
                                    const e = [],
                                        r = [];
                                    return t.sourceDocuments.forEach((t => {
                                        R(t.metadata.source) && !e.includes(t.metadata.source) ? (e.push(t.metadata.source), r.push(t)) : R(t.metadata.source) || r.push(t)
                                    })), r
                                })(e)]
                            },
                            children: t => {
                                const e = R(t.metadata.source);
                                return U(Ae, {
                                    get pageContent() {
                                        return e ? e.pathname : t.pageContent
                                    },
                                    get metadata() {
                                        return t.metadata
                                    },
                                    onSourceClick: () => {
                                        e ? window.open(t.metadata.source, "_blank") : (u(t), c(!0))
                                    }
                                })
                            }
                        })), r);
                        var r
                    }
                })())]
            })), h.style.setProperty("display", "flex"), h.style.setProperty("flex-direction", "row"), h.style.setProperty("align-items", "center"), h.style.setProperty("height", "50px"), h.style.setProperty("top", "0"), h.style.setProperty("left", "0"), h.style.setProperty("width", "100%"), ct(h, U(X, {
                get when() {
                    return t.titleAvatarSrc
                },
                get children() {
                    return [((e = rs()).style.setProperty("width", "15px"), e), U(ee, {
                        get initialAvatarSrc() {
                            return t.titleAvatarSrc
                        }
                    })];
                    var e
                }
            }), d), ct(h, U(X, {
                get when() {
                    return t.title
                },
                get children() {
                    var e = ss();
                    return ct(e, (() => t.title)), e
                }
            }), d), d.style.setProperty("flex", "1"), ct(h, U(Vt, {
                get sendButtonColor() {
                    return t.bubbleTextColor
                },
                type: "button",
                get isDisabled() {
                    return 1 === p().length
                },
                class: "my-2 ml-2",
                "on:click": E,
                get children() {
                    var t = ns();
                    return t.style.setProperty("font-family", "Poppins, sans-serif"), t
                }
            }), null), ct(a, U(Kt, {
                get backgroundColor() {
                    return t.textInput?.backgroundColor
                },
                get textColor() {
                    return t.textInput?.textColor
                },
                get placeholder() {
                    return t.textInput?.placeholder
                },
                get sendButtonColor() {
                    return t.textInput?.sendButtonColor
                },
                get fontSize() {
                    return t.fontSize
                },
                get disabled() {
                    return i()
                },
                get defaultValue() {
                    return n()
                },
                onSubmit: T
            }), null), ct(o, U(Te, {
                get badgeBackgroundColor() {
                    return t.badgeBackgroundColor
                },
                get poweredByTextColor() {
                    return t.poweredByTextColor
                },
                botContainer: s
            }), null), ct(o, U(cs, {
                ref(t) {
                    "function" == typeof r ? r(t) : r = t
                }
            }), null), k((e => {
                var r = "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center chatbot-container " + t.class,
                    s = t.isFullPage ? "fixed" : "absolute",
                    n = t.bubbleBackgroundColor,
                    i = t.bubbleTextColor,
                    a = t.isFullPage ? "0px" : "6px",
                    l = t.isFullPage ? "0px" : "6px";
                return r !== e._v$ && it(o, e._v$ = r), s !== e._v$2 && (null != (e._v$2 = s) ? h.style.setProperty("position", s) : h.style.removeProperty("position")), n !== e._v$3 && (null != (e._v$3 = n) ? h.style.setProperty("background", n) : h.style.removeProperty("background")), i !== e._v$4 && (null != (e._v$4 = i) ? h.style.setProperty("color", i) : h.style.removeProperty("color")), a !== e._v$5 && (null != (e._v$5 = a) ? h.style.setProperty("border-top-left-radius", a) : h.style.removeProperty("border-top-left-radius")), l !== e._v$6 && (null != (e._v$6 = l) ? h.style.setProperty("border-top-right-radius", l) : h.style.removeProperty("border-top-right-radius")), e
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0
            }), o
        })(), C((() => {
            const t = C((() => !!l()));
            return () => t() && U(es, {
                get isOpen() {
                    return l()
                },
                get value() {
                    return h()
                },
                onClose: () => c(!1)
            })
        })())]
    },
    cs = t => {
        return e = is(), "function" == typeof(r = t.ref) ? lt(r, e) : t.ref = e, e;
        var e, r
    },
    hs = st("<style>"),
    us = st('<div part="bot">'),
    ps = t => {
        const [e] = V(t, ["theme"]), [r, s] = x(!1), [n, o] = x(!1);
        var i;
        return [(ct(i = hs(), wt), i), U(Pt, W((() => e.theme?.button), {
            toggleBot: () => {
                r() ? s(!1) : (n() || o(!0), s(!0))
            },
            get isBotOpened() {
                return r()
            }
        })), (() => {
            const s = us();
            return s.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"), s.style.setProperty("transform-origin", "bottom right"), s.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"), s.style.setProperty("z-index", "42424242"), ct(s, U(X, {
                get when() {
                    return n()
                },
                get children() {
                    return U(ls, {
                        get badgeBackgroundColor() {
                            return e.theme?.chatWindow?.backgroundColor
                        },
                        get bubbleBackgroundColor() {
                            return e.theme?.button?.backgroundColor ?? "#3B81F6"
                        },
                        get bubbleTextColor() {
                            return e.theme?.button?.iconColor ?? "white"
                        },
                        get title() {
                            return e.theme?.chatWindow?.title
                        },
                        get titleAvatarSrc() {
                            return e.theme?.chatWindow?.titleAvatarSrc
                        },
                        get welcomeMessage() {
                            return e.theme?.chatWindow?.welcomeMessage
                        },
                        get poweredByTextColor() {
                            return e.theme?.chatWindow?.poweredByTextColor
                        },
                        get textInput() {
                            return e.theme?.chatWindow?.textInput
                        },
                        get botMessage() {
                            return e.theme?.chatWindow?.botMessage
                        },
                        get userMessage() {
                            return e.theme?.chatWindow?.userMessage
                        },
                        get fontSize() {
                            return e.theme?.chatWindow?.fontSize
                        },
                        get chatflowid() {
                            return t.chatflowid
                        },
                        get chatflowConfig() {
                            return t.chatflowConfig
                        },
                        get apiHost() {
                            return t.apiHost
                        }
                    })
                }
            })), k((n => {
                var o = e.theme?.chatWindow?.height ? e.theme?.chatWindow?.height.toString() + "px" : "calc(100% - 100px)",
                    i = r() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                    a = e.theme?.chatWindow?.backgroundColor || "#ffffff",
                    l = "fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]" + (r() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === t.theme?.button?.size ? " bottom-24" : " bottom-20");
                return o !== n._v$ && (null != (n._v$ = o) ? s.style.setProperty("height", o) : s.style.removeProperty("height")), i !== n._v$2 && (null != (n._v$2 = i) ? s.style.setProperty("transform", i) : s.style.removeProperty("transform")), a !== n._v$3 && (null != (n._v$3 = a) ? s.style.setProperty("background-color", a) : s.style.removeProperty("background-color")), l !== n._v$4 && it(s, n._v$4 = l), n
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), s
        })()]
    },
    ds = st("<style>"),
    fs = st("<div>"),
    gs = (t, {
        element: e
    }) => {
        const [r, s] = x(!1), n = new IntersectionObserver((t => {
            t.some((t => t.isIntersecting)) && s(!0)
        }));
        return A((() => {
            n.observe(e)
        })), P((() => {
            n.disconnect()
        })), [(ct(o = ds(), wt), o), U(X, {
            get when() {
                return r()
            },
            get children() {
                const e = fs();
                return e.style.setProperty("margin", "0px"), ct(e, U(ls, {
                    get badgeBackgroundColor() {
                        return t.theme?.chatWindow?.backgroundColor
                    },
                    get bubbleBackgroundColor() {
                        return t.theme?.button?.backgroundColor ?? "#3B81F6"
                    },
                    get bubbleTextColor() {
                        return t.theme?.button?.iconColor ?? "white"
                    },
                    get title() {
                        return t.theme?.chatWindow?.title
                    },
                    get titleAvatarSrc() {
                        return t.theme?.chatWindow?.titleAvatarSrc
                    },
                    get welcomeMessage() {
                        return t.theme?.chatWindow?.welcomeMessage
                    },
                    get poweredByTextColor() {
                        return t.theme?.chatWindow?.poweredByTextColor
                    },
                    get textInput() {
                        return t.theme?.chatWindow?.textInput
                    },
                    get botMessage() {
                        return t.theme?.chatWindow?.botMessage
                    },
                    get userMessage() {
                        return t.theme?.chatWindow?.userMessage
                    },
                    get fontSize() {
                        return t.theme?.chatWindow?.fontSize
                    },
                    get chatflowid() {
                        return t.chatflowid
                    },
                    get chatflowConfig() {
                        return t.chatflowConfig
                    },
                    get apiHost() {
                        return t.apiHost
                    },
                    isFullPage: !0
                })), k((r => {
                    var s = t.theme?.chatWindow?.backgroundColor || "#ffffff",
                        n = t.theme?.chatWindow?.height ? t.theme?.chatWindow?.height.toString() + "px" : "100vh",
                        o = t.theme?.chatWindow?.width ? t.theme?.chatWindow?.width.toString() + "px" : "100%";
                    return s !== r._v$ && (null != (r._v$ = s) ? e.style.setProperty("background-color", s) : e.style.removeProperty("background-color")), n !== r._v$2 && (null != (r._v$2 = n) ? e.style.setProperty("height", n) : e.style.removeProperty("height")), o !== r._v$3 && (null != (r._v$3 = o) ? e.style.setProperty("width", o) : e.style.removeProperty("width")), r
                }), {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), e
            }
        })];
        var o
    },
    bs = t => {
        var e = t.id ? document.getElementById(t.id) : document.querySelector("flowise-fullchatbot");
        if (!e) throw new Error("<flowise-fullchatbot> element not found.");
        Object.assign(e, t)
    },
    ys = t => {
        var e = document.createElement("flowise-chatbot");
        Object.assign(e, t), document.body.appendChild(e)
    },
    ms = ("undefined" != typeof window && (mt("flowise-fullchatbot", vt, gs), mt("flowise-chatbot", vt, ps)), {
        initFull: bs,
        init: ys
    });
(t => {
    "undefined" != typeof window && (window.Chatbot = {
        ...t
    })
})(ms);
export {
    ms as
    default
};
