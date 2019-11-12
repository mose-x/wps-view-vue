var e, t, n = function () {
    return (n = Object.assign || function (e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e
    }).apply(this, arguments)
}, o = function () {
    function e() {
    }

    return e.add = function (t) {
        e._handleList.push(t), window.addEventListener("message", t, !1)
    }, e.remove = function (t) {
        var n = e._handleList.indexOf(t);
        n >= 0 && e._handleList.splice(n, 1), window.removeEventListener("message", t, !1)
    }, e.empty = function () {
        for (; e._handleList.length;) window.removeEventListener("message", e._handleList.shift(), !1)
    }, e.parse = function (e) {
        return "object" == typeof e ? e : JSON.parse(e)
    }, e._handleList = [], e
}();
!function (e) {
    e.unknown = "unknown", e.spreadsheet = "s", e.writer = "w", e.presentation = "p", e.pdf = "f"
}(e || (e = {})), function (e) {
    e.wps = "w", e.et = "s", e.presentation = "p", e.pdf = "f"
}(t || (t = {}));
var r, i, a, p, c, s, u, d = (r = 0, function () {
        return ++r
    }), f = (i = null, function (e, t) {
        if (!i) {
            i = document.createElement("iframe");
            var n = {
                id: "wps-iframe",
                src: e,
                scrolling: "no",
                frameborder: "0",
                allowfullscreen: "allowfullscreen",
                webkitallowfullscreen: "true",
                mozallowfullscreen: "true",
                height: 'auto',
                width: '100%'
            };
            for (var o in n) i.setAttribute(o, n[o]);
            t ? t.appendChild(i) : document.body.appendChild(i), i.destroy = function () {
                i.parentNode.removeChild(i), i = null
            }
        }
        return i
    }), l = function (e) {
        f().contentWindow.postMessage(JSON.stringify(e), "*")
    }, m = function (e) {
        return new Promise(function (t) {
            var n = d();
            e.type = y();
            var r = function (e) {
                var i = o.parse(e.data);
                "wps.api.reply" === i.eventName && i.msgId === n && (t(i.data), o.remove(r))
            };
            o.add(r), l({eventName: "wps.jssdk.api", data: e, msgId: n})
        })
    }, v = function (e) {
        var t = n({}, e), o = t.headers, r = void 0 === o ? {} : o, i = t.subscriptions, a = void 0 === i ? {} : i,
            p = (t.wpsUrl, r.backBtn), c = void 0 === p ? {} : p, s = r.shareBtn, u = void 0 === s ? {} : s,
            d = r.otherMenuBtn, f = void 0 === d ? {} : d, l = function (e, t) {
                e.subscribe && "function" == typeof e.subscribe && (e.callback = t, a[t] = e.subscribe, delete e.subscribe)
            };
        if (l(c, "wpsconfig_back_btn"), l(u, "wpsconfig_share_btn"), l(f, "wpsconfig_other_menu_btn"), f.items && Array.isArray(f.items)) {
            var m = [];
            f.items.forEach(function (e, t) {
                switch (void 0 === e && (e = {}), e.type) {
                    case"export_img":
                        e.type = 1, e.callback = "export_img";
                        break;
                    case"export_pdf":
                        e.type = 1, e.callback = "export_pdf";
                        break;
                    case"save_version":
                        e.type = 1, e.callback = "save_version";
                        break;
                    case"about_wps":
                        e.type = 1, e.callback = "about_wps";
                        break;
                    case"split_line":
                        e.type = 2;
                        break;
                    case"custom":
                        e.type = 3, l(e, "wpsconfig_other_menu_btn_" + t), m.push(e)
                }
            }), m.length && (x || b) && (f.items = m)
        }
        if ("object" == typeof a.print) {
            var v = "wpsconfig_print";
            "function" == typeof a.print.subscribe && (a[v] = a.print.subscribe, t.print = {callback: v}, void 0 !== a.print.custom && (t.print.custom = a.print.custom)), delete a.print
        }
        "function" == typeof a.exportPdf && (a[v = "wpsconfig_export_pdf"] = a.exportPdf, t.exportPdf = {callback: v}, delete a.exportPdf);
        return n({}, t, {subscriptions: a})
    }, y = (a = "", function (n) {
        if (void 0 === n && (n = ""), !a && n) {
            var o = n.toLowerCase();
            -1 !== o.indexOf("/office/s/") && (a = e.spreadsheet), -1 !== o.indexOf("/office/w/") && (a = e.writer), -1 !== o.indexOf("/office/p/") && (a = e.presentation), -1 !== o.indexOf("/office/f/") && (a = e.pdf)
        }
        if (!a) {
            var r = n.match(/[\\?&]type=([a-z]+)/) || [];
            a = t[r[1]] || ""
        }
        return a
    }), w = window.navigator.userAgent.toLowerCase(), x = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(w),
    b = function () {
        try {
            return -1 !== window._parent.location.search.indexOf("from=wxminiprogram")
        } catch (e) {
            return !1
        }
    }();
!function (e) {
    e[e.wdExportFormatPDF = 17] = "wdExportFormatPDF", e[e.wdExportFormatXPS = 18] = "wdExportFormatXPS"
}(p || (p = {})), function (e) {
    e[e.wdExportAllDocument = 0] = "wdExportAllDocument", e[e.wdExportSelection = 1] = "wdExportSelection", e[e.wdExportCurrentPage = 2] = "wdExportCurrentPage", e[e.wdExportFromTo = 3] = "wdExportFromTo"
}(c || (c = {})), function (e) {
    e[e.wdExportDocumentContent = 0] = "wdExportDocumentContent", e[e.wdExportDocumentWithMarkup = 7] = "wdExportDocumentWithMarkup"
}(s || (s = {})), function (e) {
    e[e.title = 1] = "title", e[e.tag = 2] = "tag"
}(u || (u = {}));
var F;
!function (e) {
    e[e.xlTypePDF = 0] = "xlTypePDF", e[e.xlTypeXPS = 1] = "xlTypeXPS"
}(F || (F = {}));
var A, g, E;
!function (e) {
    e[e.ppFixedFormatTypePDF = 2] = "ppFixedFormatTypePDF", e[e.ppFixedFormatTypeXPS = 1] = "ppFixedFormatTypeXPS"
}(A || (A = {})), function (e) {
    e[e.ppPrintAll = 1] = "ppPrintAll", e[e.ppPrintCurrent = 3] = "ppPrintCurrent"
}(g || (g = {})), function (e) {
    e[e.msoFalse = 0] = "msoFalse", e[e.msoTrue = -1] = "msoTrue"
}(E || (E = {}));
var h;

function P(e) {
    return e = e || Object.create(null), {
        on: function (t, n) {
            (e[t] || (e[t] = [])).push(n)
        }, off: function (t, n) {
            e[t] && e[t].splice(e[t].indexOf(n) >>> 0, 1)
        }, emit: function (t, n) {
            (e[t] || []).slice().map(function (e) {
                e(n)
            }), (e["*"] || []).slice().map(function (e) {
                e(t, n)
            })
        }
    }
}

var k = "fileOpen", D = function (e) {
    return "wps.advanced.api.ready" === e || "web_loaded" === e
}, _ = function (e, t) {
    void 0 === e && (e = {});
    o.add(function (n) {
        var r = o.parse(n.data), i = r.eventName, a = void 0 === i ? "" : i, p = r.data, c = void 0 === p ? null : p,
            s = r.url, u = void 0 === s ? null : s;
        -1 === ["wps.jssdk.api"].indexOf(a) && ("ready" === a ? (l({
            eventName: "setConfig",
            data: e
        }), h.tokenData && l({
            eventName: "setToken",
            data: h.tokenData
        }), h.iframeReady = !0) : "open.result" === a && h.emit(k, c), D(a) && T(), "function" == typeof t[a] && t[a](h, u || c))
    })
}, T = function () {
    var t = y(h.url);
    t === e.writer && function (e) {
        e.WpsApplication = function () {
            return {
                ActiveDocument: {
                    ExportAsFixedFormatAsync: function (e) {
                        var t = {
                            api: "WpsApplication().ActiveDocument.ExportAsFixedFormatAsync",
                            args: n({
                                ExportFormat: p.wdExportFormatPDF,
                                Range: c.wdExportAllDocument,
                                From: 1,
                                To: 1,
                                Item: s.wdExportDocumentWithMarkup,
                                IncludeDocProps: !0
                            }, "object" == typeof e ? e : {})
                        };
                        return m(t)
                    }, ImportDataIntoFieldsAsync: function (e) {
                        var t = {
                            api: "WpsApplication().ActiveDocument.ImportDataIntoFieldsAsync",
                            args: {Data: e.Data, Options: e.Options}
                        };
                        return m(t)
                    }, ReplaceTextAsync: function (e) {
                        var t = {api: "WpsApplication().ActiveDocument.ReplaceTextAsync", args: {Data: e.Data}};
                        return m(t)
                    }
                }, Enum: n({}, p, c, s)
            }
        }
    }(h), t === e.spreadsheet && function (e) {
        e.EtApplication = function () {
            return {
                ActiveWorkbook: {
                    ExportAsFixedFormatAsync: function (e) {
                        var t = {
                            api: "EtApplication().ActiveWorkbook.ExportAsFixedFormatAsync",
                            args: n({Type: F.xlTypePDF, IncludeDocProps: !0}, "object" == typeof e ? e : {})
                        };
                        return m(t)
                    }, ActiveSheet: {
                        ExportAsFixedFormatAsync: function (e) {
                            var t = {
                                api: "EtApplication().ActiveWorkbook.ActiveSheet.ExportAsFixedFormatAsync",
                                args: n({Type: F.xlTypePDF, IncludeDocProps: !0}, "object" == typeof e ? e : {})
                            };
                            return m(t)
                        }
                    }
                }, Enum: n({}, F)
            }
        }
    }(h), t === e.presentation && function (e) {
        e.WppApplication = function () {
            return {
                ActivePresentation: {
                    ExportAsFixedFormatAsync: function (e) {
                        var t = {
                            api: "WppApplication().ActivePresentation.ExportAsFixedFormatAsync",
                            args: n({
                                FixedFormatType: A.ppFixedFormatTypePDF,
                                RangeType: g.ppPrintAll,
                                FrameSlides: E.msoTrue
                            }, "object" == typeof e ? e : {})
                        };
                        return m(t)
                    }
                }, Enum: n({}, A, g)
            }
        }
    }(h)
};
// console.log("WPS WebOffice JS-SDK V1.0.11");
var O = function (e) {
    void 0 === e && (e = {}), h && h.destroy();
    try {
        var t, r = v(e), i = r.wpsUrl, a = r.subscriptions, p = void 0 === a ? {} : a, c = r.mount,
            s = f(i, void 0 === c ? null : c);
        return delete r.mount, delete r.wpsUrl, delete r.subscriptions, h = {
            url: i,
            version: "1.0.11",
            iframe: s,
            Enum: n({}, E),
            iframeReady: !1,
            tokenData: null,
            setToken: function (e) {
                h.tokenData = e, h.iframeReady && l({eventName: "setToken", data: e})
            },
            ready: function () {
                return t || (t = new Promise(function (e) {
                    var t = function (n) {
                        var r = o.parse(n.data).eventName;
                        D(r) && (e(), o.remove(t))
                    };
                    o.add(t)
                }))
            },
            destroy: function () {
                s.destroy(), o.empty(), h = null
            },
            save: function () {
                return m({api: "save"})
            }
        }, Object.assign(h, new P.prototype.constructor), _(r, p), h.ready(), h
    } catch (e) {
        // console.error(e)
    }
};
export default {config: O};
export {O as config};
//# sourceMappingURL=jwps.es6.js.map
