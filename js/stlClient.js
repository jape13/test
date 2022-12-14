function StlClient() {}
StlClient.parse = function(e) {
    return e ? JSON.parse(e) : {}
}, StlClient.getQueryString = function() {
    var e, t, n = "",
        r = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    if (0 === r.length) return n;
    for (e = 0, t = r.length; e < t; e += 1) hash = r[e].split("="), hash && 2 == hash.length && (value = encodeURIComponent(decodeURIComponent(decodeURIComponent(hash[1]))), n += hash[0] + "=" + value + "&");
    return n && n.length > 0 && (n = n.substring(0, n.length - 1)), n
}, StlClient.errorCode = function(e) {
    switch (e) {
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 402:
            return "Payment Required";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 405:
            return "Method Not Allowed";
        case 406:
            return "Not Acceptable";
        case 407:
            return "Proxy Authentication Required";
        case 408:
            return "Request Timeout";
        case 409:
            return "Conflict";
        case 410:
            return "Gone";
        case 411:
            return "Length Required";
        case 500:
            return "Internal Server Error"
    }
    return "Unknown Error"
}, StlClient.prototype = {
    _getURL: function(e, t, n) {
        return e += /\?/.test(e) ? "&" : "?", _.isObject(t) && _.indexOf(["GET", "HEAD"], n) > -1 && (e += "&" + _.map(t, function(e, t) {
            return t + "=" + encodeURIComponent(e)
        }).join("&")), e + "&" + (new Date).getTime()
    },
    _request: function(e, t, n, r) {
        var s = new XMLHttpRequest;
        s.open(e, this._getURL(t, n, e), !0), s.withCredentials = !0, r && (s.onreadystatechange = function() {
            if (4 === s.readyState)
                if (s.status < 400) r(null, StlClient.parse(s.responseText), s.status);
                else {
                    var e = StlClient.parse(s.responseText);
                    r({
                        status: s.status,
                        message: e.message || StlClient.errorCode(s.status)
                    }, null, s.status)
                }
        }), s.dataType = "json", s.setRequestHeader("Accept", "application/vnd.siteserver+json; version=1"), s.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n ? s.send(JSON.stringify(n)) : s.send()
    },
    getURL: function(e) {
        return this._getURL(e, null, "get")
    },
    get: function(e, t, n) {
        return this._request("GET", e, t, n)
    },
    post: function(e, t, n) {
        return this._request("POST", e, t, n)
    },
    patch: function(e, t, n) {
        return this._request("PATCH", e, t, n)
    },
    put: function(e, t, n) {
        return this._request("PUT", e, t, n)
    },
    delete: function(e, t, n) {
        return this._request("DELETE", e, t, n)
    }
};
var stlClient = new StlClient;