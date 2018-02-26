export var offline = false;

export var apiPrefix = offline ? "//localhost:8000/havefun/" : "//localhost:8000/havefun/";
export var winWidth = 0;
export var winHeight = 0;
export var browser = {
    versions: function () {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            mac: u.indexOf('Macintosh') > -1,
            spot: u.indexOf('Spot') > -1,
            webApp: u.indexOf('Safari') == -1 //是否web程序，没有头部与底部
        };
    }()
};
export var language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;

export function getBrowserLanguage() {
    if(language.indexOf('zh') == 0){
        return 'cn';
    }
    return 'en';
}

export function setTitle(wording){
    document.title = wording;
    if(browser.versions.ios) {
        var $body = $('body');
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    }
}

export function setCookie(name, value, mins) {
    var exp = new Date();
    exp.setTime(exp.getTime() + mins*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return void 0;
}

export function arrayRemove(array, val) {
    var index = array.indexOf(val);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}

export function shuffle(aArr){
    var iLength = aArr.length,
        i = iLength,
        mTemp,
        iRandom;

    while(i--){
        if(i !== (iRandom = Math.floor(Math.random() * iLength))){
            mTemp = aArr[i];
            aArr[i] = aArr[iRandom];
            aArr[iRandom] = mTemp;
        }
    }

    return aArr;
}

export function getTimeStamp(){
    var timestamp = Date.parse(new Date());
    return timestamp;
}

export function getProfileUrl(photo, suffix){
    if(photo.indexOf('getremark.com') != -1 && suffix != undefined){
        photo += '!' + suffix;
        photo = photo.replace(/http:\/\/pic1.getremark.com/g, "https://ocdebr4ln.qnssl.com");
        photo = photo.replace(/http:\/\/pic4.getremark.com/g, "https://ocdebr4ln.qnssl.com");
    }
    else if(photo.indexOf('http') == -1){
        photo = "https://ocdebr4ln.qnssl.com/" + photo;
    }
    else{
        photo = photo.replace(/http/g, "https");
    }
    return photo
}

export function getHttpProfileUrl(photo, suffix){
    if(photo.indexOf('getremark.com') != -1 && suffix != undefined){
        photo += '!' + suffix;
    }
    else if(photo.indexOf('http') == -1){
        photo = "http://pic1.getremark.com/" + photo;
    }
    return photo
}

export function getDecodeQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

export function imgPreload(url, cache){
    img = new Image();
    url = cache == false ? url + "?" + Math.random() : url;
    img.src = url;
}

export function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    }
    else {
        return false;
    }
}

export function is_weibo(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/WeiBo/i)=="weibo") {
        return true;
    }
    else {
        return false;
    }
}

export function is_fb(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/FBAN/i)=="fban") {
        return true;
    }
    else {
        return false;
    }
}

export function is_qq(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/QQ/i)=="qq" && ua.match(/MicroMessenger/i)!="micromessenger") {
        return true;
    }
    else {
        return false;
    }
}

export function windowSize(){
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    // 获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
}

export function download(){
    var platform = browser.versions.mobile ? 'mobile': 'pc';
    var sys = browser.versions.ios ? 'ios': 'android';
    location.href = "https://api.getremark.com/havefun/ChillDownload?platform=" + platform + "&system=" + sys;
}

function wx_events(share_title, share_link, share_content, share_imgurl){
    var share_dict = {
        title: share_title,
        desc: share_content,
        link: share_link,
        imgUrl: share_imgurl,
        success: function () {
        }
    };
    wx.ready(function () {
        wx.onMenuShareTimeline(share_dict);
        wx.onMenuShareAppMessage(share_dict);
        wx.onMenuShareQQ(share_dict);
        wx.onMenuShareWeibo(share_dict);
        wx.showAllNonBaseMenuItem({
            success: function () {
            }
        });
    });
}

export function initWeixin(share_type, share_title, share_link, share_content, share_imgurl){
    if(is_weixin()) {
        $.ajax({
            type: 'GET',
            url: apiPrefix + 'WxAccessNew?callback=?',
            data: {
                'url': location.href,
                'type': share_type
            },
            dataType: 'jsonp',
            jsonp: 'access',
            success: function (data) {
                wx.config({
                    debug: false,
                    appId: data['signature']['appid'],
                    timestamp: data['signature']['time'],
                    nonceStr: data['signature']['noncestr'],
                    signature: data['signature']['signature'],
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareWeibo',
                        'showAllNonBaseMenuItem',
                        'chooseImage',
                        'uploadImage'
                    ]
                });
                wx_events(share_title, share_link, share_content, share_imgurl);
            }
        });
    }
}

/*
* 解析matrix矩阵，0°-360°，返回旋转角度
* 当a=b||-a=b,0<=deg<=180
* 当-a+b=180,180<=deg<=270
* 当a+b=180,270<=deg<=360
*
* 当0<=deg<=180,deg=d;
* 当180<deg<=270,deg=180+c;
* 当270<deg<=360,deg=360-(c||d);
* */
export function getmatrix(a,b,c,d,e,f){
    var aa = Math.round(180 * Math.asin(a)/ Math.PI);
    var bb = Math.round(180 * Math.acos(b)/ Math.PI);
    var cc = Math.round(180 * Math.asin(c)/ Math.PI);
    var dd = Math.round(180 * Math.acos(d)/ Math.PI);
    var deg = 0;
    if(aa == bb||-aa == bb){
        deg = dd;
    }else if(-aa + bb == 180){
        deg = 180 + cc;
    }else if(aa + bb == 180){
        deg = 360-cc || 360-dd;
    }
    return deg >= 360 ? 0: deg;
}

export function needFBLogin() {
    var safariParam = getQueryString('safari');
    return is_fb() || (browser.versions.mobile && safariParam == 1 && !is_weixin() && !is_qq());
}

export function needQQLogin() {
    var qqParam = getQueryString('qq');
    return is_qq() || (browser.versions.mobile && qqParam == 1 && !is_weixin() && !is_fb());
}

export function getSourceCode() {
    if(is_weixin()){
        return 'wc'
    }
    else if(needQQLogin()){
        return 'qq'
    }
    else if(needFBLogin()){
        return 'fb'
    }
    else{
        return 'sms'
    }
}