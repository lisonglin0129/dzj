window.__require = function e(t, i, a) {
function n(s, o) {
if (!i[s]) {
if (!t[s]) {
var r = s.split("/");
r = r[r.length - 1];
if (!t[r]) {
var l = "function" == typeof __require && __require;
if (!o && l) return l(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var d = i[s] = {
exports: {}
};
t[s][0].call(d.exports, function(e) {
return n(t[s][1][e] || e);
}, d, d.exports, e, t, i, a);
}
return i[s].exports;
}
for (var c = "function" == typeof __require && __require, s = 0; s < a.length; s++) n(a[s]);
return n;
}({
ActionEvent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6cec81E6xpJha9kLGshjdk8", "ActionEvent");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
onClick: function(e, t) {
this.node.dispatchEvent(new cc.Event.EventCustom(t, !0));
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
AnimEvent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ed85cO6wFBO1oa4VrDfi3g7", "AnimEvent");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onAnimCompleted: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
Audio: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d983bGxrrZHt6V//bCOnrSX", "Audio");
cc.Class({
extends: cc.Component,
properties: {
bgVolume: 1,
deskVolume: 1,
bgAudioID: -1
},
init: function() {
var e;
null != (e = cc.sys.localStorage.getItem("bgVolume")) && (this.bgVolume = parseFloat(e));
null != (e = cc.sys.localStorage.getItem("deskVolume")) && (this.deskVolume = parseFloat(e));
cc.game.on(cc.game.EVENT_HIDE, function() {
cc.audioEngine.pauseAll();
});
cc.game.on(cc.game.EVENT_SHOW, function() {
cc.audioEngine.resumeAll();
});
},
getUrl: function(e) {
return cc.url.raw("resources/sounds/" + e);
},
playBGM: function(e) {
var t = this.getUrl(e);
this.bgAudioID >= 0 && cc.audioEngine.stop(this.bgAudioID);
this.bgAudioID = cc.audioEngine.play(t, !0, this.bgVolume);
},
playSFX: function(e) {
var t = this.getUrl(e);
if (this.sfxVolume > 0) cc.audioEngine.play(t, !1, this.deskVolume);
},
setSFXVolume: function(e) {
if (this.sfxVolume != e) {
cc.sys.localStorage.setItem("deskVolume", e);
this.deskVolume = e;
}
},
getState: function() {
return cc.audioEngine.getState(this.bgAudioID);
},
setBGMVolume: function(e, t) {
this.bgAudioID >= 0 && (e > 0 && cc.audioEngine.getState(this.bgAudioID) === cc.audioEngine.AudioState.PAUSED ? cc.audioEngine.resume(this.bgAudioID) : 0 == e && cc.audioEngine.pause(this.bgAudioID));
if (this.bgVolume != e || t) {
cc.sys.localStorage.setItem("bgVolume", e);
this.bgmVolume = e;
cc.audioEngine.setVolume(this.bgAudioID, e);
}
},
pauseAll: function() {
cc.audioEngine.pauseAll();
},
resumeAll: function() {
cc.audioEngine.resumeAll();
}
});
cc._RF.pop();
}, {} ],
Base64: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8a9bcPo4GZL2aYuqS5Gbs8/", "Base64");
cc.Class({
extends: cc.Component,
properties: {},
statics: {
decode: function(e) {
var t = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ], i = e.length, a = 0;
if ("=" == e.charAt(i - 1)) if ("=" == e.charAt(i - 2)) {
a = 4;
e = e.substring(0, i - 2);
} else {
a = 2;
e = e.substring(0, i - 1);
}
for (var n = [], c = 0, s = e.length; c < s; ++c) for (var o = e.charAt(c), r = 0, l = t.length; r < l; ++r) if (o == t[r]) {
var d = this._toBinary(r), u = d.length;
if (6 - u > 0) for (var p = 6 - u; p > 0; --p) d.unshift(0);
n = n.concat(d);
break;
}
a > 0 && (n = n.slice(0, n.length - a));
var h = [], m = [];
for (c = 0, s = n.length; c < s; ) if (0 == n[c]) {
h = h.concat(this._toDecimal(n.slice(c, c + 8)));
c += 8;
} else {
for (var f = 0; c < s && 1 == n[c]; ) {
++f;
++c;
}
m = m.concat(n.slice(c + 1, c + 8 - f));
c += 8 - f;
for (;f > 1; ) {
m = m.concat(n.slice(c + 2, c + 8));
c += 8;
--f;
}
h = h.concat(this._toDecimal(m));
m = [];
}
return h;
},
_toBinary: function(e) {
for (var t = new Array(); e > 0; ) {
var i = e % 2;
e = Math.floor(e / 2);
t.push(i);
}
t.reverse();
return t;
},
_toDecimal: function(e) {
for (var t = 0, i = 0, a = e.length - 1; a >= 0; --a) {
1 == e[a] && (t += Math.pow(2, i));
++i;
}
return t;
}
},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
BeiMiCard: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "98564jYdD5LFJWUjTOZJZYQ", "BeiMiCard");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
card: cc.Integer,
initcard: {
default: null,
type: cc.Node
},
normal: {
default: null,
type: cc.Node
},
lefttop: {
default: null,
type: cc.Node
},
leftcolor: {
default: null,
type: cc.Node
},
rightbottom: {
default: null,
type: cc.Node
},
rightcolor: {
default: null,
type: cc.Node
},
kingbg: {
default: null,
type: cc.Node
},
king: {
default: null,
type: cc.Node
},
atlas: {
default: null,
type: cc.SpriteAtlas
}
},
proxy: function(e) {
this.game = e;
},
onLoad: function() {
this.initcard.active = !0;
this.normal.active = !1;
this.selected = !1;
this.kingbg.active = !1;
},
setCard: function(e) {
this.card = e;
this.normal.y = 0;
this.normal.active = !1;
this.kingbg.y = 0;
this.kingbg.active = !1;
},
unselected: function() {
this.selected && (this.card >= 52 ? this.kingbg.y = 0 : this.normal.y = 0);
this.selected = !1;
},
doselect: function() {
if (0 == this.selected) {
this.card >= 52 ? this.kingbg.y = this.kingbg.y + 30 : this.normal.y = this.normal.y + 30;
this.selected = !0;
} else this.unselected();
},
order: function() {
var e, t;
if (this.card < 52) {
var i = this.card + 1;
i % 4 == 0 ? e = this.atlas.getSpriteFrame("方片") : i % 4 == 1 ? e = this.atlas.getSpriteFrame("黑桃") : i % 4 == 2 ? e = this.atlas.getSpriteFrame("红心") : i % 4 == 3 && (e = this.atlas.getSpriteFrame("梅花"));
var a = (this.card - this.card % 4) / 4 + 1 + 2;
14 == a ? a = 1 : 15 == a && (a = 2);
t = this.card % 2 == 0 ? this.atlas.getSpriteFrame(a) : this.atlas.getSpriteFrame("r" + a);
this.leftcolor.getComponent(cc.Sprite).spriteFrame = e;
this.lefttop.getComponent(cc.Sprite).spriteFrame = t;
this.rightcolor.getComponent(cc.Sprite).spriteFrame = e;
this.rightbottom.getComponent(cc.Sprite).spriteFrame = t;
this.initcard.active = !1;
this.normal.active = !0;
this.kingbg.active = !1;
this.normal.y = 0;
} else if (52 == this.card) {
e = this.atlas.getSpriteFrame("小王_大");
this.king.getComponent(cc.Sprite).spriteFrame = e;
this.initcard.active = !1;
this.normal.active = !1;
this.kingbg.active = !0;
this.kingbg.y = 0;
} else if (53 == this.card) {
e = this.atlas.getSpriteFrame("大王_大");
this.king.getComponent(cc.Sprite).spriteFrame = e;
this.initcard.active = !1;
this.normal.active = !1;
this.kingbg.active = !0;
this.kingbg.y = 0;
}
},
reset: function() {
this.normal.y = 0;
this.kingbg.y = 0;
this.normal.active = !1;
this.kingbg.active = !1;
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
BeiMiCommon: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4442aLvATdDQqqq9ihQ2QP7", "BeiMiCommon");
var a = e("Base64");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.beimi.room_callback = null;
},
ready: function() {
var e = !1;
cc.beimi ? e = !0 : this.scene("login", this);
return e;
},
connect: function() {
var e = this;
if (null != cc.beimi.socket) {
cc.beimi.socket.disconnect();
cc.beimi.socket = null;
}
cc.beimi.socket = window.io.connect(cc.beimi.http.wsURL + "/bm/game", {
reconnection: !0
});
cc.game.on(cc.game.EVENT_HIDE, function(e) {});
cc.game.on(cc.game.EVENT_SHOW, function(e) {
console.log("SHOW TRUE");
});
cc.beimi.socket.on("connect", function(e) {
console.log("connected to server");
});
cc.beimi.socket.on("disconnect", function(e) {
console.log("disconnected from server");
});
var t = {
token: cc.beimi.authorization,
orgi: cc.beimi.user.orgi,
userid: cc.beimi.user.id
};
cc.beimi.socket.exec("gamestatus", t);
cc.beimi.socket.on("gamestatus", function(t) {
if (null != t) {
var i = e.parse(t);
if (null != cc.beimi.extparams) if ("playing" == i.gamestatus && null != i.gametype) {
if (null != cc.beimi.extparams) {
cc.beimi.extparams.playway = i.playway;
cc.beimi.extparams.gametype = i.gametype;
null != i.cardroom && 1 == i.cardroom && (cc.beimi.extparams.gamemodel = "room");
}
e.scene(i.gametype, e);
} else if ("timeout" == i.gamestatus) {
cc.beimi.sessiontimeout = !0;
e.alert("登录已过期，请重新登录");
} else e.scene(cc.beimi.extparams.gametype, e);
cc.beimi.gamestatus = i.gamestatus;
}
});
cc.beimi.socket.on("searchroom", function(t) {
null != t && null != cc.beimi.room_callback && cc.beimi.room_callback(t, e);
});
return cc.beimi.socket;
},
disconnect: function() {
if (null != cc.beimi.socket) {
cc.beimi.socket.disconnect();
cc.beimi.socket = null;
}
},
registercallback: function(e) {
cc.beimi.room_callback = e;
},
cleancallback: function() {
cc.beimi.room_callback = null;
},
getCommon: function(e) {
return cc.find("Canvas/script/" + e).getComponent(e);
},
loadding: function() {
if (cc.beimi.loadding.size() > 0) {
this.loaddingDialog = cc.beimi.loadding.get();
this.loaddingDialog.parent = cc.find("Canvas");
this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
this._animCtrl.play("loadding").wrapMode = cc.WrapMode.Loop;
}
},
alert: function(e) {
this.alertForCallBack(e, null);
},
alertForCallBack: function(e, t) {
if (cc.beimi.dialog.size() > 0) {
this.alertdialog = cc.beimi.dialog.get();
this.alertdialog.parent = cc.find("Canvas");
var i = this.alertdialog.getChildByName("message");
null != i && i.getComponent(cc.Label) && (i.getComponent(cc.Label).string = e);
if (null != t) {
var a = this.alertdialog.getComponent("BeiMiDialog");
null != a && a.callback(t);
}
}
this.closeloadding();
},
closeloadding: function() {
cc.find("Canvas/loadding") && cc.beimi.loadding.put(cc.find("Canvas/loadding"));
},
closeOpenWin: function() {
if (null != cc.beimi.openwin) {
cc.beimi.openwin.destroy();
cc.beimi.openwin = null;
}
},
openWin: function(e) {
if (null != e) {
cc.beimi.openwin = cc.instantiate(e);
cc.beimi.openwin.parent = this.root();
}
},
pvalistener: function(e, t) {
cc.beimi.listener = t;
cc.beimi.context = e;
},
cleanpvalistener: function() {
if (null != cc.beimi) {
cc.beimi.listener = null;
cc.beimi.context = null;
}
},
pva: function(e, t) {
null != e && ("gold" == e ? cc.beimi.user.goldcoins = t : "cards" == e ? cc.beimi.user.cards = t : "diamonds" == e && (cc.beimi.user.diamonds = t));
},
updatepva: function() {
null != cc.beimi && null != cc.beimi.listener && null != cc.beimi.context && cc.beimi.listener(cc.beimi.context);
},
subsidy: function() {
var e = !1;
if (cc.beimi.user.goldcoins <= 0) {
var t = this;
e = !0;
if (1 == cc.beimi.data.subsidy && cc.beimi.data.subtimes > 0 && cc.beimi.data.subgolds > 0 && cc.beimi.data.lefttimes > 0) {
var i = "金币不足，您可以领取救济金。";
null != cc.beimi.data.submsg && (i = cc.beimi.data.submsg);
this.alertForCallBack(i, function() {
t.welfareDialog();
});
} else {
var a = "金币不足，请充值。";
null != cc.beimi.data.recmsg && (a = cc.beimi.data.recmsg);
this.alertForCallBack(a, function() {
t.shopDialog();
});
}
}
return e;
},
welfareDialog: function() {
cc.loader.loadRes("prefab/welfare/over", function(e, t) {
cc.beimi.openwin = cc.instantiate(t);
cc.beimi.openwin.parent = cc.beimi.context.root();
});
},
shopDialog: function() {
cc.loader.loadRes("prefab/welfare/shop", function(e, t) {
cc.beimi.openwin = cc.instantiate(t);
cc.beimi.openwin.parent = cc.beimi.context.root();
});
},
resize: function() {
var e = cc.director.getWinSize();
cc.view.setDesignResolutionSize(e.width, e.height, cc.ResolutionPolicy.EXACT_FIT);
},
closealert: function() {
cc.find("Canvas/alert") && cc.beimi.dialog.put(cc.find("Canvas/alert"));
},
scene: function(e, t) {
cc.director.preloadScene(e, function() {
cc.beimi && t.closeloadding(t.loaddingDialog);
cc.director.loadScene(e);
});
},
preload: function(e, t) {
this.loadding();
cc.beimi.extparams = e;
var i = {
token: cc.beimi.authorization,
orgi: cc.beimi.user.orgi,
userid: cc.beimi.user.id
};
cc.beimi.socket.exec("gamestatus", i);
},
root: function() {
return cc.find("Canvas");
},
decode: function(e) {
return a.decode(e);
},
parse: function(e) {
return JSON.parse(e);
},
reset: function(e, t) {
cc.beimi.authorization = e.token.id;
cc.beimi.user = e.data;
cc.beimi.games = e.games;
cc.beimi.gametype = e.gametype;
cc.beimi.data = e;
cc.beimi.playway = null;
this.io.put("token", e.token.id);
},
logout: function() {
this.closeOpenWin();
cc.beimi.authorization = null;
cc.beimi.user = null;
cc.beimi.games = null;
cc.beimi.playway = null;
this.disconnect();
},
socket: function() {
var e = cc.beimi.socket;
null == e && (e = this.connect());
return e;
},
map: function(e, t) {
null != cc.beimi && null == cc.beimi.routes[e] && (cc.beimi.routes[e] = t || function() {});
},
cleanmap: function() {
if (null != cc.beimi && null != cc.beimi.routes) for (var e in cc.beimi.routes) delete cc.beimi.routes[e];
},
route: function(e) {
return cc.beimi.routes[e] || function() {};
},
layout: function(e, t) {
if (null != e) {
for (var i = new Array(), a = e.children, n = 0; n < a.length; n++) i.push(a[n]);
for (n = 0; n < i.length; n++) e.removeChild(i[n]);
i.sort(t);
for (n = 0; n < i.length; n++) i[n].parent = e;
i.splice(0, i.length);
}
}
});
cc._RF.pop();
}, {
Base64: "Base64"
} ],
BeiMiDialog: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7c2f5/wtw5P0LyzuKEzV2dP", "BeiMiDialog");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
e.stopPropagation();
});
this.node.on("close", function(e) {
if (null != cc.beimi && 1 == cc.beimi.sessiontimeout) {
cc.beimi.sessiontimeout = null;
self.scene("login", self);
}
e.stopPropagation();
});
},
onClose: function() {
var e = cc.find("Canvas/alert");
cc.beimi.dialog.put(e);
this.node.dispatchEvent(new cc.Event.EventCustom("close", !0));
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
BeiMiQR: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cfbb8w3UbVOA4QUUKGuCXS8", "BeiMiQR");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
qrgraphics: {
default: null,
type: cc.Node
},
roomid: {
default: null,
type: cc.Label
}
},
onLoad: function() {},
init: function(e) {
null != e && "" != e && (this.roomid.string = "让好友扫描加入房间，房间号：" + e);
var t = new QRCode(6, QRErrorCorrectLevel.H);
t.addData(e);
t.make();
var i = this.qrgraphics.width, a = t.getModuleCount(), n = this.qrgraphics.getComponent(cc.Graphics);
n.clear();
n.fillColor = cc.Color.BLACK;
for (var c = i / a, s = i / a, o = 0; o < a; o++) for (var r = 0; r < a; r++) if (t.isDark(o, r)) {
var l = Math.ceil((r + 1) * c) - Math.floor(r * c), d = Math.ceil((o + 1) * c) - Math.floor(o * c);
n.rect(Math.round(r * c), i - s - Math.round(o * s), l, d);
n.fill();
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
BeiMiRoomOption: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "214d0MHSC5DcoE4sSZlfyz2", "BeiMiRoomOption");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
playway: {
default: null,
type: cc.Node
}
},
onLoad: function() {},
onClick: function() {
if (null != this.playway) {
var e = this.playway.getComponent("RoomPlayway"), t = cc.instantiate(e.roomoption);
cc.beimi.openwin = t;
cc.beimi.openwin.parent = this.root();
var i = t.getComponent("RoomOption");
null != i && i.init(e.data);
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
BeiMiTimer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "39256C0d5RLXatej7GTm9/q", "BeiMiTimer");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
text: {
default: null,
type: cc.Label
}
},
onLoad: function() {},
init: function(e, t, i) {
var a = this;
this.remaining = t;
this.text.string = e + "（" + this.remaining + "）";
this.schedule(function() {
this.remaining = this.remaining - 1;
this.remaining < 0 ? a.unschedule(this) : a.text.string = e + "（" + this.remaining + "）";
}, 1, t);
},
stop: function(e) {
this.remaining = 0;
e.destroy();
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
DefaultHallDataBind: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4b325WE1kpIToU13vjdwCfd", "DefaultHallDataBind");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
username: {
default: null,
type: cc.Label
},
goldcoins: {
default: null,
type: cc.Label
},
cards: {
default: null,
type: cc.Label
},
girl: {
default: null,
type: cc.Node
}
},
onLoad: function() {
if (this.ready()) {
this.username.string = cc.beimi.user.username;
this.pva_format(cc.beimi.user.goldcoins, cc.beimi.user.cards, cc.beimi.user.diamonds, this);
this.pvalistener(this, function(e) {
e.pva_format(cc.beimi.user.goldcoins, cc.beimi.user.cards, cc.beimi.user.diamonds, e);
});
}
},
pva_format: function(e, t, i, a) {
if (e > 9999) {
var n = e / 1e4;
a.goldcoins.string = n.toFixed(2) + "万";
} else a.goldcoins.string = e;
a.cards.string = t + "张";
},
playToLeft: function() {
this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
this._girlAnimCtrl.play("girl_to_left");
},
playToRight: function() {
this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
this._girlAnimCtrl.play("girl_to_right");
},
onDestroy: function() {
this.cleanpvalistener();
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
DeskCards: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b8da7m1o6lOnpZbARNcuqt/", "DeskCards");
cc.Class({
extends: cc.Component,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
},
beimi0: {
default: null,
type: cc.SpriteAtlas
},
cardvalue: {
default: null,
type: cc.Node
},
target: {
default: null,
type: cc.Node
}
},
init: function(e) {
this.value = e;
var t, i = parseInt(this.value / 4), a = parseInt(i / 9), n = void 0;
i < 0 ? n = "wind" + (i + 8) : 0 == a ? n = "wan" + (parseInt(this.value % 36 / 4) + 1) : 1 == a ? n = "tong" + (parseInt(this.value % 36 / 4) + 1) : 2 == a && (n = "suo" + (parseInt(this.value % 36 / 4) + 1));
t = this.atlas.getSpriteFrame("牌面-" + n);
this.cardvalue.getComponent(cc.Sprite).spriteFrame = t;
}
});
cc._RF.pop();
}, {} ],
DiZhuSummaryClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4e980BPHPtCgozJhOw88LZe", "DiZhuSummaryClick");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onBegin: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("begin", !0));
},
opendeal: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("opendeal", !0));
},
onClose: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("close", !0));
}
});
cc._RF.pop();
}, {} ],
DialogClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "a07b3XLiwVBk5RFzHmd50Gx", "DialogClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
onClick: function(e) {
e.stopPropagation();
},
onCloseClick: function() {
this.closeOpenWin();
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
DizhuBegin: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "cc414fafx1EfIEhdfVAesnW", "DizhuBegin");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
gamebtn: {
default: null,
type: cc.Node
},
continuegamebtn: {
default: null,
type: cc.Node
},
poker: {
default: null,
type: cc.Node
},
lastCardsPanel: {
default: null,
type: cc.Node
},
waitting: {
default: null,
type: cc.Prefab
},
ratio: {
default: null,
type: cc.Label
},
summary_win: {
default: null,
type: cc.Prefab
},
summary: {
default: null,
type: cc.Prefab
},
inviteplayer: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
this.resize();
this.player = new Array();
this.pokercards = new Array();
this.lastcards = new Array();
this.lastCardsPanel.active = !1;
this.summarypage = null;
this.inited = !1;
this.lasttip = null;
if (null != cc.beimi) {
null != cc.beimi.gamestatus && "playing" == cc.beimi.gamestatus ? this.recovery() : null != cc.beimi.extparams && "room" == cc.beimi.extparams.gamemodel && (this.invite = cc.instantiate(this.inviteplayer));
this.initgame();
}
},
begin: function() {
null != cc.beimi.data && 1 == cc.beimi.data.enableai ? this.statictimer("正在匹配玩家", cc.beimi.data.waittime) : this.statictimer("正在匹配玩家，请稍候", cc.beimi.data.noaiwaitime);
this.startgame("false");
},
opendeal: function() {
null != cc.beimi.data && 1 == cc.beimi.data.enableai ? this.statictimer("正在匹配玩家", cc.beimi.data.waittime) : this.statictimer("正在匹配玩家，请稍候", cc.beimi.data.noaiwaitime);
this.startgame("true");
},
recovery: function() {
this.statictimer("正在恢复数据，请稍候", cc.beimi.data.waittime);
},
initgame: function() {
var e = this;
this.gamebtn.active = !0;
this.continuegamebtn.active = !1;
if (this.ready()) {
var t = this.socket();
this.game = this.getCommon("DizhuDataBind");
this.map("joinroom", this.joinroom_event);
this.map("players", this.players_event);
this.map("catch", this.catch_event);
this.map("catchresult", this.catchresult_event);
this.map("lasthands", this.lasthands_event);
this.map("takecards", this.takecards_event);
this.map("ratio", this.ratio_event);
this.map("play", this.play_event);
this.map("allcards", this.allcards_event);
this.map("cardtips", this.cardtips_event);
this.map("roomready", this.roomready_event);
this.map("playeready", this.playeready_event);
this.map("cardtips", this.cardtips_event);
this.map("recovery", this.recovery_event);
t.on("command", function(t) {
cc.beimi.gamestatus = "playing";
if (1 == e.inited) {
var i = e.parse(t);
e.route(i.command)(i, e);
}
});
t.on("ping", function() {});
var i = {
token: cc.beimi.authorization,
playway: cc.beimi.extparams.playway,
orgi: cc.beimi.user.orgi,
extparams: cc.beimi.extparams
};
t.exec("joinroom", i);
this.inited = !0;
}
},
joinroom_event: function(e, t) {
if (1 == e.cardroom && null != t.inviteplayer) {
t.invite.getComponent("BeiMiQR").init(e.roomid);
t.invite.parent = t.root();
}
if (e.player.id && e.player.id == cc.beimi.user.id) t.index = e.index; else {
for (var i = !1, a = 0; a < t.player.length; a++) {
t.player[a].getComponent("PlayerRender").userid == e.player.id && (i = !0);
}
0 == i && t.newplayer(t.player.length, t, e.player, t.index + 1 == e.index);
}
},
roomready_event: function(e, t) {
1 == e.cardroom && null != t.invite && t.invite.destroy();
},
playeready_event: function(e, t) {
e.userid == cc.beimi.user.id && (t.gamebtn.active = !1);
},
players_event: function(e, t) {
for (var i = -1, a = 0; a < e.player.length; a++) if (e.player[a].id == cc.beimi.user.id) {
i = a;
break;
}
if (e.player.length > 1 && i >= 0) for (var n = i + 1; ;) {
n == e.player.length && (n = 0);
0 == t.playerexist(e.player[n], t) && t.newplayer(t.player.length, t, e.player[n], 0 == t.player.length && !(0 == n && e.player.length < e.maxplayers));
if (n == i) break;
n += 1;
}
},
playerexist: function(e, t) {
var i = !1;
if (e.id == cc.beimi.user.id) i = !0; else for (var a = 0; a < t.player.length; a++) if (t.player[a].id == e.id) {
i = !0;
break;
}
return i;
},
catch_event: function(e, t) {
t.ratio && (t.ratio.string = e.ratio + "倍");
if (e.userid == cc.beimi.user.id) t.game.catchtimer(15); else for (var i = 0; i < t.player.length; i++) {
var a = t.player[i].getComponent("PlayerRender");
if (a.userid && a.userid == e.userid) {
a.catchtimer(15);
break;
}
}
},
recovery_event: function(e, t) {
var i = t.decode(e.player.cards);
if (null != t.waittimer) {
var a = t.waittimer.getComponent("BeiMiTimer");
a && a.stop(t.waittimer);
}
t.gamebtn.active = !1;
t.ratio && (t.ratio.string = e.ratio + "倍");
t.doLastCards(t.game, t, 3, 0);
for (var n = 0; n < i.length; n++) {
var c = t.playcards(t.game, t, 50 * n - 300, i[n]);
t.registerProxy(c);
}
for (var s = 0; s < t.pokercards.length; s++) {
t.pokercards[s].getComponent("BeiMiCard").order();
}
t.lastCardsPanel.active = !0;
if (e.lasthands) {
var o = t.decode(e.lasthands);
for (s = 0; s < t.lastcards.length; s++) {
var r = t.lastcards[s].getComponent("BeiMiCard");
r.setCard(o[s]);
r.order();
}
e.banker.userid == cc.beimi.user.id ? t.game.lasthands(t, t.game, e.data) : t.getPlayer(e.banker.userid).setDizhuFlag(e.data);
}
if (null != e.last) {
var l = t.decode(e.last.cards);
e.last.userid == cc.beimi.user.id ? t.game.lasttakecards(t.game, t, e.last.cardsnum, l, e.last) : t.getPlayer(e.last.userid).lasttakecards(t.game, t, e.last.cardsnum, l, e.last);
e.nextplayer == cc.beimi.user.id ? t.game.playtimer(t.game, 25, e.automic) : t.getPlayer(e.nextplayer).playtimer(t.game, 25);
}
if (null != e.cardsnum && e.cardsnum.length > 0) for (s = 0; s < e.cardsnum.length; s++) t.getPlayer(e.cardsnum[s].userid).resetcards(e.cardsnum[s].cardsnum);
},
ratio_event: function(e, t) {
1 == e.king || e.bomb;
t.ratio && (t.ratio.string = e.ratio + "倍");
},
catchresult_event: function(e, t) {
t.ratio && (t.ratio.string = e.ratio + "倍");
e.userid == cc.beimi.user.id ? t.game.catchresult(e) : setTimeout(function() {
t.getPlayer(e.userid).catchresult(e);
}, 1500);
},
lasthands_event: function(e, t) {
for (var i = t.decode(e.lasthands), a = 0; a < t.lastcards.length; a++) {
var n = t.lastcards[a].getComponent("BeiMiCard");
n.setCard(i[a]);
n.order();
}
if (e.userid == cc.beimi.user.id) {
t.game.lasthands(t, t.game, e);
for (var c = 0; c < t.player.length; c++) {
t.player[c].getComponent("PlayerRender").hideresult();
}
for (a = 0; a < i.length; a++) {
var s = null;
a == i.length - 1 && (s = cc.callFunc(function(e, t) {
t.tempcontext && t.tempcontext.layout(t.tempcontext.poker, function(e, t) {
return e.zIndex - t.zIndex;
});
}, this, {
tempcontext: t
}));
var o = t.current(t.game, t, 600 + 50 * (6 + a) - 300, i[a], s);
o.getComponent("BeiMiCard").order();
t.registerProxy(o);
}
t.game.playtimer(t.game, 25, !0);
} else {
t.game.hideresult();
for (c = 0; c < t.player.length; c++) {
t.player[c].getComponent("PlayerRender").hideresult();
}
t.getPlayer(e.userid).lasthands(t, t.game, e);
t.getPlayer(e.userid).playtimer(t.game, 25);
}
for (c = 0; c < t.pokercards.length; c++) {
var r = t.pokercards[c];
r.zIndex = 54 - r.card;
}
},
takecards_event: function(e, t) {
t.lasttip = null;
if (1 == e.allow) {
var i;
0 == e.donot && (i = t.decode(e.cards));
if (e.userid == cc.beimi.user.id) {
t.game.unselected(t, t.game);
t.game.lasttakecards(t.game, t, e.cardsnum, i, e);
} else t.getPlayer(e.userid).lasttakecards(t.game, t, e.cardsnum, i, e);
t.game.selectedcards.splice(0, t.game.selectedcards.length);
0 == e.over && (e.nextplayer == cc.beimi.user.id ? t.game.playtimer(t.game, 25, e.automic) : t.getPlayer(e.nextplayer).playtimer(t.game, 25));
} else {
t.game.notallow.active = !0;
setTimeout(function() {
t.game.notallow.active = !1;
}, 2e3);
t.game.unselected(t, t.game);
}
},
cardtips_event: function(e, t) {
t.game.unselected(t, t.game);
if (1 == e.allow) {
var i = t.decode(e.cards);
t.lasttip = i.join(",");
for (var a = 0; a < i.length; a++) t.game.cardtips(t, i[a], i);
} else t.game.cardtipsfornot(t, t.game);
},
play_event: function(e, t) {
cc.beimi.gamestatus = "playing";
var i = t.decode(e.player.cards);
if (t.waittimer) {
var a = t.waittimer.getComponent("BeiMiTimer");
a && a.stop(t.waittimer);
}
var n = t.game.pokerpool.get(), c = t.game.pokerpool.get(), s = t.game.pokerpool.get();
n.parent = t.root();
c.parent = t.root();
s.parent = t.root();
n.setPosition(0, 200);
c.setPosition(0, 200);
s.setPosition(0, 200);
var o = cc.callFunc(function(e, t) {
if (t.game) {
t.game.pokerpool.put(t.current);
t.game.pokerpool.put(t.left);
t.game.pokerpool.put(t.right);
for (var i = 0; i < t.self.pokercards.length; i++) {
t.self.pokercards[i].getComponent("BeiMiCard").order();
}
t.self.lastCardsPanel.active = !0;
}
}, this, {
game: t.game,
self: t,
left: c,
right: s,
current: n
});
t.doLastCards(t.game, t, 3, 0);
setTimeout(function() {
t.dealing(t.game, 6, t, 0, c, s, i);
setTimeout(function() {
t.dealing(t.game, 6, t, 1, c, s, i);
setTimeout(function() {
t.dealing(t.game, 5, t, 2, c, s, i, o);
t.reordering(t);
}, 500);
}, 500);
}, 0);
},
allcards_event: function(e, t) {
cc.beimi.gamestatus = "notready";
for (var i = void 0, a = 0; a < e.players.length; a++) {
var n = e.players[a];
if (n.userid != cc.beimi.user.id) for (var c = t.decode(n.cards), s = (t.getPlayer(n.userid), 
0); s < c.length; s++) ; else i = n;
}
if (null != i) {
t.pva("gold", i.balance);
t.updatepva();
}
setTimeout(function() {
if (null != i) {
1 == i.win ? t.summarypage = cc.instantiate(t.summary_win) : t.summarypage = cc.instantiate(t.summary);
t.summarypage.parent = t.root();
t.summarypage.getComponent("SummaryDetail").create(t, e);
}
t.lastCardsPanel.active = !1;
if (1 == e.gameRoomOver) {
for (var a = 0; a < t.player.length; a++) t.player[a].destroy();
t.player.splice(0, t.player.length);
t.player = new Array();
t.clean();
}
}, 2e3);
},
getPlayer: function(e) {
for (var t, i = 0; i < this.player.length; i++) {
var a = this.player[i].getComponent("PlayerRender");
if (a.userid && a.userid == e) {
t = a;
break;
}
}
return t;
},
dealing: function(e, t, i, a, n, c, s, o) {
for (var r = 0; r < t; r++) {
var l = i.current(e, i, 300 * a + 50 * r - 300, s[6 * a + r], o);
this.registerProxy(l);
}
i.otherplayer(n, 0, t, e, i);
i.otherplayer(c, 1, t, e, i);
},
otherplayer: function(e, t, i, a, n) {
if (0 == t) {
var c = cc.sequence(cc.spawn(cc.moveTo(.2, -350, 50), cc.scaleTo(.2, .3, .3)), cc.moveTo(0, 0, 200), cc.scaleTo(0, 1, 1));
e.runAction(c);
} else {
var s = cc.sequence(cc.spawn(cc.moveTo(.2, 350, 50), cc.scaleTo(.2, .3, .3)), cc.moveTo(0, 0, 200), cc.scaleTo(0, 1, 1));
e.runAction(s);
}
for (var o = n.player[t].getComponent("PlayerRender"), r = 0; r < i; r++) o.countcards(1);
},
doLastCards: function(e, t, i, a) {
for (var n = 0; n < i; n++) {
var c = 80 * n - 80, s = e.minpokerpool.get();
s.getComponent("BeiMiCard").setCard(a);
s.card = a;
s.parent = this.lastCardsPanel;
s.setPosition(c, 0);
t.lastcards[t.lastcards.length] = s;
}
},
registerProxy: function(e) {
if (e) {
e.getComponent("BeiMiCard").proxy(this.game);
}
},
playcards: function(e, t, i, a) {
return t.current(e, t, i, a, null);
},
current: function(e, t, i, a, n) {
var c = e.pokerpool.get();
c.getComponent("BeiMiCard").setCard(a);
c.card = a;
c.parent = t.poker;
c.setPosition(0, 200);
c.setScale(1, 1);
c.zIndex = 100 - a;
t.pokercards.push(c);
if (null != n) {
var s = cc.sequence(cc.moveTo(.2, i, -180), n);
c.runAction(s);
} else {
var o = cc.moveTo(.2, i, -180);
c.runAction(o);
}
return c;
},
reordering: function(e) {
for (var t = 0; t < e.pokercards.length; t++) e.pokercards[t].parent = e.poker;
},
newplayer: function(e, t, i, a) {
var n = cc.v2(520, 100);
0 == a && (n = cc.v2(-520, 100));
var c = t.getCommon("DizhuDataBind");
if (c && c.playerspool.size() > 0) {
t.player[e] = c.playerspool.get();
t.player[e].parent = t.root();
t.player[e].setPosition(n);
t.player[e].getComponent("PlayerRender").initplayer(i, a);
}
},
givup: function() {
if (this.ready()) {
this.socket().emit("giveup", "giveup");
}
},
startgame: function(e) {
if (this.ready()) {
this.socket().emit("start", e);
}
},
cardtips: function() {
if (this.ready()) {
var e = this.socket();
null != this.lasttip ? e.emit("cardtips", this.lasttip) : e.emit("cardtips", "");
this.lasttip = null;
}
},
docatch: function() {
if (this.ready()) {
this.socket().emit("docatch", "docatch");
}
},
doPlayCards: function() {
if (this.ready()) {
var e = this.socket();
this.game.selectedcards.splice(0, this.game.selectedcards.length);
for (var t = 0; t < this.pokercards.length; t++) {
var i = this.pokercards[t].getComponent("BeiMiCard");
1 == i.selected && this.game.selectedcards.push(i.card);
}
e.emit("doplaycards", this.game.selectedcards.join());
}
this.lasttip = null;
},
noCards: function() {
if (this.ready()) {
this.socket().emit("nocards", "nocards");
}
this.lasttip = null;
},
clean: function() {
for (var e = 0; e < this.pokercards.length; e++) {
var t = this.pokercards[e];
this.game.pokerpool.put(t);
}
this.pokercards.splice(0, this.pokercards.length);
for (var i = 0; i < this.lastcards.length; i++) this.game.minpokerpool.put(this.lastcards[i]);
this.lastcards.splice(0, this.lastcards.length);
for (i = 0; i < this.player.length; i++) {
this.player[i].getComponent("PlayerRender").clean(this.game);
}
this.player.splice(0, this.player.length);
this.game.clean(this);
this.ratio.string = "15倍";
},
onCloseClick: function() {
this.continuegamebtn.active = !0;
},
restart: function(e) {
this.game.restart();
this.statictimer("正在匹配玩家", 5);
if (this.ready()) {
this.socket().emit("restart", e);
}
},
continuegame: function() {
this.continuegamebtn.active = !1;
this.restart("begin");
},
statictimer: function(e, t) {
this.waittimer = cc.instantiate(this.waitting);
this.waittimer.parent = this.root();
var i = this.waittimer.getComponent("BeiMiTimer");
i && i.init(e, t, this.waittimer);
},
onDestroy: function() {
this.inited = !1;
this.cleanmap();
if (this.ready()) {
this.socket().emit("leave", "leave");
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
DizhuButton: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "74593mJuotD0Y/H/yjldfAs", "DizhuButton");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
back: function() {
this.loadding();
var e = this;
setTimeout(function() {
e.scene(cc.beimi.gametype, e);
}, 500);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
DizhuDataBind: [ function(e, t, a) {
"use strict";
cc._RF.push(t, "eb412rJilJPFo/eaLVo2ey6", "DizhuDataBind");
var n = e("BeiMiCommon");
cc.Class({
extends: n,
properties: {
goldcoins: {
default: null,
type: cc.Label
},
cards: {
default: null,
type: cc.Label
},
player: {
default: null,
type: cc.Prefab
},
poker: {
default: null,
type: cc.Prefab
},
poker_min: {
default: null,
type: cc.Prefab
},
myself: {
default: null,
type: cc.Prefab
},
atlas: {
default: null,
type: cc.SpriteAtlas
},
catchbtn: {
default: null,
type: cc.Node
},
timer: {
default: null,
type: cc.Node
},
timer_num: {
default: null,
type: cc.Label
},
lastcards: {
default: null,
type: cc.Node
},
playbtn: {
default: null,
type: cc.Node
},
notallow: {
default: null,
type: cc.Node
},
operesult: {
default: null,
type: cc.Node
},
donottake: {
default: null,
type: cc.Node
},
cardtipmsg: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.timer && (this.timer.active = !1);
this.catchbtn && (this.catchbtn.active = !1);
this.playbtn && (this.playbtn.active = !1);
this.notallow && (this.notallow.active = !1);
this.operesult && (this.operesult.active = !1);
this.cardtipmsg && (this.cardtipmsg.active = !1);
this.playerspool = new cc.NodePool();
this.myselfpool = new cc.NodePool();
this.pokerpool = new cc.NodePool();
this.minpokerpool = new cc.NodePool();
this.selectedcards = new Array();
this.cardslist = new Array();
for (i = 0; i < 2; i++) this.playerspool.put(cc.instantiate(this.player));
for (i = 0; i < 25; i++) this.pokerpool.put(cc.instantiate(this.poker));
for (i = 0; i < 60; i++) this.minpokerpool.put(cc.instantiate(this.poker_min));
this.myselfpool.put(cc.instantiate(this.myself));
if (this.ready()) {
this.pva_format(cc.beimi.user.goldcoins, cc.beimi.user.cards, cc.beimi.user.diamonds, this);
this.pvalistener(this, function(e) {
e.pva_format(cc.beimi.user.goldcoins, cc.beimi.user.cards, cc.beimi.user.diamonds, e);
});
}
if (this.myselfpool.size() > 0 && null != cc.beimi) {
this.playermysql = this.myselfpool.get();
this.playermysql.parent = this.root();
this.playermysql.setPosition(-520, -180);
this.playermysql.getComponent("PlayerRender").initplayer(cc.beimi.user);
}
},
pva_format: function(e, t, i, a) {
if (e > 9999) {
var n = e / 1e4;
a.goldcoins.string = n.toFixed(2) + "万";
} else a.goldcoins.string = e;
a.cards.string = t + "张";
},
catchtimer: function(t) {
this.playbtn && (this.playbtn.active = !1);
this.timer && (this.timer.active = !0);
this.catchbtn && (this.catchbtn.active = !0);
this.operesult && (this.operesult.active = !1);
var i = e("GameTimer");
this.beimitimer = new i();
this.timesrc = this.beimitimer.runtimer(this, this.timer, this.atlas, this.timer_num, this.timer_num, t);
},
catchresult: function(e) {
this.timer && (this.timer.active = !1);
this.catchbtn && (this.catchbtn.active = !1);
this.playbtn && (this.playbtn.active = !1);
this.timesrc && this.beimitimer.stoptimer(this, this.timer, this.timesrc);
this.doOperatorResult("catch", e.docatch, !1);
},
hideresult: function() {
this.operesult && (this.operesult.active = !1);
},
lasthands: function(e, t, i) {
this.setDizhuFlag(i);
this.operesult && (this.operesult.active = !1);
},
setDizhuFlag: function(e) {
this.playermysql.getComponent("PlayerRender").setDizhuFlag(e);
},
lasttakecards: function(e, t, i, a, n) {
this.result && (this.result.active = !1);
this.playbtn && (this.playbtn.active = !1);
this.catchbtn && (this.catchbtn.active = !1);
this.jsq && (this.jsq.active = !1);
this.lastcards && (this.lastcards.active = !0);
this.timesrc && this.beimitimer.stoptimer(this, this.timer, this.timesrc);
for (var c = 0; c < this.cardslist.length; c++) this.pokerpool.put(this.cardslist[c]);
this.cardslist.splice(0, this.cardslist.length);
if (0 == n.donot) {
for (c = 0; c < a.length; c++) this.playcards(t, c, a[c], a);
this.layout(this.lastcards, function(e, t) {
return e.zIndex - t.zIndex;
});
} else this.doOperatorResult("lasttakecards", !0, n.sameside);
},
cardtips: function(e, t, i) {
for (var a, n = 0; n < e.pokercards.length; n++) {
var c = e.pokercards[n];
if (c.getComponent("BeiMiCard").card == t) {
a = c;
break;
}
}
null != a && a.getComponent("BeiMiCard").doselect();
},
cardtipsfornot: function(e, t) {
t.cardtipmsg.active = !0;
setTimeout(function() {
t.cardtipmsg.active = !1;
}, 1e3);
t.unselected(e, t);
},
unselected: function(e, t) {
for (var i = 0; i < e.pokercards.length; i++) {
e.pokercards[i].getComponent("BeiMiCard").unselected();
}
},
playcards: function(e, t, i, a) {
for (var n, c = 0; c < e.pokercards.length; c++) {
var s = e.pokercards[c];
if (s.card == i) {
n = s;
break;
}
}
if (null != n) {
n.getComponent("BeiMiCard").unselected();
n.x = 30 * t - 30;
n.y = 0;
var o = this.countcard(i, a);
n.zIndex = 4 - o;
n.setScale(.5, .5);
n.parent = this.lastcards;
this.cardslist.push(n);
}
},
countcard: function(e, t) {
for (var i = parseInt(e / 4), a = 0, n = 0; n < t.length; n++) {
i == parseInt(t[n] / 4) && (a += 1);
}
return a;
},
playtimer: function(t, i, a) {
this.timer && (this.timer.active = !0);
this.playbtn && (this.playbtn.active = !0);
this.catchbtn && (this.catchbtn.active = !1);
this.lastcards && (this.lastcards.active = !1);
this.operesult && (this.operesult.active = !1);
this.donottake.active = 1 != a;
for (var n = 0; n < this.cardslist.length; n++) t.pokerpool.put(this.cardslist[n]);
var c = e("GameTimer");
this.beimitimer = new c();
this.timesrc = this.beimitimer.runtimer(this, this.timer, this.atlas, this.timer_num, this.timer_num, i);
},
doOperatorResult: function(e, t, i) {
this.operesult.active = !0;
if ("catch" == e) if (1 == t) for (var a = 0; a < this.operesult.children.length; a++) {
this.operesult.children[a].active = !1;
"提示_抢地主" == this.operesult.children[a].name && (this.operesult.children[a].active = !0);
} else for (a = 0; a < this.operesult.children.length; a++) {
this.operesult.children[a].active = !1;
"提示_不抢" == this.operesult.children[a].name && (this.operesult.children[a].active = !0);
} else if ("lasttakecards" == e) if (1 == i) for (a = 0; a < this.operesult.children.length; a++) {
this.operesult.children[a].active = !1;
"不要" == this.operesult.children[a].name && (this.operesult.children[a].active = !0);
} else for (a = 0; a < this.operesult.children.length; a++) {
this.operesult.children[a].active = !1;
"要不起" == this.operesult.children[a].name && (this.operesult.children[a].active = !0);
}
},
doSelectCard: function(e) {
void 0 == this.selectedcards.find(function(e) {
e.card;
}) && this.selectedcards.push(e);
},
doUnSelectCard: function(e) {
var t = this.selectedcards.indexOf(e);
t >= 0 && this.selectedcards.splice(t, t + 1);
},
clean: function(e) {
this.catchbtn && (this.catchbtn.active = !1);
this.lastcards && (this.lastcards.active = !1);
this.operesult && (this.operesult.active = !1);
this.playermysql.getComponent("PlayerRender").clean(e);
},
restart: function() {
for (var e = 0; e < 2; e++) this.playerspool.put(cc.instantiate(this.player));
this.pokerpool.clear();
this.minpokerpool.clear();
for (var t = 0; t < 25; t++) this.pokerpool.put(cc.instantiate(this.poker));
for (t = 0; t < 60; t++) this.minpokerpool.put(cc.instantiate(this.poker_min));
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon",
GameTimer: "GameTimer"
} ],
EventStop: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ac9b4vOTi9OKqQ68Kuj6+oT", "EventStop");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
e.stopPropagation();
});
}
});
cc._RF.pop();
}, {} ],
FeedBackDialog: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "789dcDahxtFoaHaAAyS85K3", "FeedBackDialog");
cc.Class({
extends: cc.Component,
properties: {
title_feedback: {
default: null,
type: cc.Node
},
title_reply: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.title_feedback.active = !0;
this.title_reply.active = !1;
},
onFeedBack: function() {
this.title_feedback.active = !0;
this.title_reply.active = !1;
},
onReply: function() {
this.title_feedback.active = !1;
this.title_reply.active = !0;
}
});
cc._RF.pop();
}, {} ],
GameMenu: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8ed13WRoL5Mv7fLyNGLHVpu", "GameMenu");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
back: function() {}
});
cc._RF.pop();
}, {} ],
GameRoom: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e9bfb1QJiRAHJZMZ1KPDpqH", "GameRoom");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
roomidDialog: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {},
onClick: function(e, t) {
this.loadding();
var i = this;
setTimeout(function() {
i.scene(t, i);
}, 200);
},
onClickJoinRoom: function() {
if (this.roomidDialog) {
cc.beimi.openwin = cc.instantiate(this.roomidDialog);
cc.beimi.openwin.parent = this.root();
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
GameTimer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "35465tZFoBKsKL/r5rkrS4C", "GameTimer");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
runtimer: function(e, t, i, a, n, c) {
var s = this;
this.remaining = c;
a.string = c;
t && (t.active = !0);
this.timersrc = function() {
s.remaining = s.remaining - 1;
if (s.remaining < 0) {
e.unschedule(this);
t.active = !1;
} else a.string = s.remaining;
};
e.schedule(this.timersrc, 1, c, 0);
return this.timersrc;
},
stoptimer: function(e, t, i) {
t && (t.active = !1);
this.remaining = 0;
i && e.unscheduleAllCallbacks();
}
});
cc._RF.pop();
}, {} ],
GangAction: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0fe67JecMpLz5GGCrRtpy0D", "GangAction");
cc.Class({
extends: cc.Component,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
},
beimi0: {
default: null,
type: cc.SpriteAtlas
},
card_one: {
default: null,
type: cc.Node
},
card_two: {
default: null,
type: cc.Node
},
card_three: {
default: null,
type: cc.Node
},
card_four: {
default: null,
type: cc.Node
},
card_last: {
default: null,
type: cc.Node
},
target: {
default: null,
type: cc.Node
}
},
onLoad: function() {},
init: function(e, t) {
this.value = e;
var i = parseInt(this.value / 4), a = parseInt(i / 9);
this.mjtype = a;
this.mjvalue = parseInt(this.value % 36 / 4);
var n = void 0, c = void 0;
i < 0 ? n = "wind" + (i + 8) : 0 == a ? n = "wan" + (parseInt(this.value % 36 / 4) + 1) : 1 == a ? n = "tong" + (parseInt(this.value % 36 / 4) + 1) : 2 == a && (n = "suo" + (parseInt(this.value % 36 / 4) + 1));
c = "suo2" == n ? this.beimi0.getSpriteFrame("牌面-" + n) : this.atlas.getSpriteFrame("牌面-" + n);
this.card_one.getComponent(cc.Sprite).spriteFrame = c;
this.card_two && (this.card_two.getComponent(cc.Sprite).spriteFrame = c);
this.card_three && (this.card_three.getComponent(cc.Sprite).spriteFrame = c);
this.card_four && (this.card_four.getComponent(cc.Sprite).spriteFrame = c);
this.card_last && (this.card_last.active = 0 != t);
}
});
cc._RF.pop();
}, {} ],
HTTP: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bf72714t+NASJp+J1e5wv0I", "HTTP");
cc.VERSION = 2017061001;
var a = cc.Class({
extends: cc.Component,
properties: {},
statics: {
baseURL: "http://129.28.151.103:8080",
wsURL: "ws://129.28.151.103:9081",
authorization: null,
httpGet: function(e, t, i, n) {
var c = cc.loader.getXMLHttpRequest();
c.onreadystatechange = function() {
if (4 === c.readyState) if (c.status >= 200 && c.status < 300) {
var e = c.responseText;
t && t(e, n);
} else i && i(n);
};
var s = "";
null != cc.beimi && null != cc.beimi.authorization && (s = cc.beimi.authorization);
e.indexOf("?") > 0 ? c.open("GET", a.baseURL + e + "&authorization=" + s, !0) : c.open("GET", a.baseURL + e + "?authorization=" + s, !0);
cc.sys.isNative && c.setRequestHeader("Accept-Encoding", "gzip,deflate");
c.ontimeout = function(e) {
i(n);
};
c.onerror = function(e) {
i(n);
};
c.timeout = 3e3;
c.send();
},
encodeFormData: function(e) {
var t = [], i = /%20/g;
for (var a in e) {
var n = e[a].toString(), c = encodeURIComponent(a).replace(i, "+") + "=" + encodeURIComponent(n).replace(i, "+");
t.push(c);
}
return t.join("&");
},
httpPost: function(e, t, i, n, c) {
var s = cc.loader.getXMLHttpRequest();
s.onreadystatechange = function() {
if (4 === s.readyState) if (s.status >= 200 && s.status < 300) {
var e = s.responseText;
i && i(e, c);
} else n && n(c);
};
s.open("POST", a.baseURL + e, !0);
null != cc.beimi && null != cc.beimi.authorization && s.setRequestHeader("authorization", cc.beimi.authorization);
cc.sys.isNative && s.setRequestHeader("Accept-Encoding", "gzip,deflate");
s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
s.timeout = 5e3;
s.send(a.encodeFormData(t));
}
},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
HandCards: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ea8287c50lMKb/Afb/yUYFR", "HandCards");
cc.Class({
extends: cc.Component,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
},
beimi0: {
default: null,
type: cc.SpriteAtlas
},
cardvalue: {
default: null,
type: cc.Node
},
target: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.lastonecard = !1;
this.take = !1;
this.node.on("mousedown", function(e) {
console.log("Hello!");
});
this.node.on("mousemove", function(e) {
console.log("Hello Mover!");
});
},
init: function(e) {
this.value = e;
var t = void 0, i = parseInt(this.value / 4), a = parseInt(i / 9);
this.mjtype = a;
this.mjvalue = parseInt(this.value % 36 / 4);
var n = void 0;
this.lastonecard = !1;
i < 0 ? n = "wind" + (i + 8) : 0 == a ? n = "wan" + (parseInt(this.value % 36 / 4) + 1) : 1 == a ? n = "tong" + (parseInt(this.value % 36 / 4) + 1) : 2 == a && (n = "suo" + (parseInt(this.value % 36 / 4) + 1));
t = "suo2" == n ? this.beimi0.getSpriteFrame("牌面-" + n) : this.atlas.getSpriteFrame("牌面-" + n);
this.cardvalue.getComponent(cc.Sprite).spriteFrame = t;
this.getComponent(cc.Animation).play("majiang_current");
},
lastone: function() {
if (0 == this.lastonecard) {
this.lastonecard = !0;
this.target.width = this.target.width + 30;
}
},
selected: function() {
this.target.opacity = 168;
this.selectcolor = !0;
},
relastone: function() {
if (1 == this.lastonecard) {
this.lastonecard = !1;
this.target.width = this.target.width - 30;
}
},
reinit: function() {
this.relastone();
this.lastonecard = !1;
this.selectcolor = !1;
this.target.opacity = 255;
if (this.take) {
this.target.y = this.target.y - 30;
this.take = !1;
}
}
});
cc._RF.pop();
}, {} ],
IOUtils: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "39610X6GEFHlrTGAdd3Wcer", "IOUtils");
cc.Class({
extends: cc.Component,
properties: {},
statics: {
get: function(e) {
return cc.sys.localStorage.getItem(e);
},
put: function(e, t) {
cc.sys.localStorage.setItem(e, t);
},
remove: function(e) {
cc.sys.localStorage.removeItem(e);
}
}
});
cc._RF.pop();
}, {} ],
JoinRoomClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "dca015EOkRD8b5hkhNcAXkU", "JoinRoomClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
numdata: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.roomid = new Array();
},
onClick: function(e, t) {
if (this.roomid.length < 6) {
this.roomid.push(t);
this.disRoomId();
}
if (6 == this.roomid.length) {
this.closeOpenWin();
if (this.ready()) {
var i = this.socket(), a = {
token: cc.beimi.authorization,
roomid: this.roomid.join(""),
orgi: cc.beimi.user.orgi,
userid: cc.beimi.user.id
};
i.exec("searchroom", a);
this.registercallback(this.roomCallBack);
}
this.loadding();
}
},
roomCallBack: function(e, t) {
var i = t.parse(e);
if ("ok" == i.result) {
var a = {
gametype: i.code,
playway: i.id,
gamemodel: "room"
};
t.preload(a, t);
} else "notexist" == i.result ? t.alert("房间号不存在。") : "full" == i.result && t.alert("房间已满员。");
},
onDeleteClick: function() {
this.roomid.splice(this.roomid.length - 1, this.roomid.length);
this.disRoomId();
},
onCleanClick: function() {
this.roomid.splice(0, this.roomid.length);
this.disRoomId();
},
disRoomId: function() {
for (var e = this.numdata.children, t = 0; t < 6; t++) t < this.roomid.length ? e[t].children[0].getComponent(cc.Label).string = this.roomid[t] : e[t].children[0].getComponent(cc.Label).string = "";
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
JoinRoomEvent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "43eb6PT5ldCaKJaeJn7zVx4", "JoinRoomEvent");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
LogoutClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c02c1wqe0JFrrSphy0Aek62", "LogoutClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
onClick: function() {
this.logout();
this.scene("login", this);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
MJMenuClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ce2c1CkWWFBsK4mdw3v5/n2", "MJMenuClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
onBackClick: function() {
this.scene(cc.beimi.gametype, this);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
MaJiangPlayer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e95383hjkFI0LhTixqeMZQ5", "MaJiangPlayer");
cc.Class({
extends: cc.Component,
properties: {
username: {
default: null,
type: cc.Label
},
goldcoins: {
default: null,
type: cc.Label
},
selected: {
default: null,
type: cc.Node
},
creator: {
default: null,
type: cc.Node
},
selectcards: {
default: null,
type: cc.Node
},
selectcolor: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.selected.active = !1;
this.creator.active = !1;
},
init: function(e, t, i) {
this.data = e;
this.tablepos = i;
0 == t ? this.selectcards.parent.x = -1 * this.selectcards.parent.x : 1 == t && (this.selectcards.parent.x = -1 * this.selectcards.parent.x);
this.username.string = e.username;
this.goldcoins.string = e.goldcoins;
},
banker: function() {
this.creator.active = !0;
},
selecting: function() {
if (this.data.id != cc.beimi.user.id) {
this.selectcards.active = !0;
var e = this.selectcolor.getComponent(cc.Animation);
this.animState = e.play("majiang_select");
this.animState.wrapMode = cc.WrapMode.Loop;
this.animState.repeatCount = 20;
}
},
selectresult: function(e) {
for (var t = 0; t < this.selected.children.length; t++) {
this.selected.children[t].active = !1;
this.selected.children[t].name == e.color && (this.selected.children[t].active = !0);
}
this.selected.active = !0;
this.data.id != cc.beimi.user.id && null != this.animState && this.animState.stop("majiang_select");
},
clean: function() {
this.creator.active = !1;
for (var e = 0; e < this.selected.children.length; e++) this.selected.children[e].active = !1;
}
});
cc._RF.pop();
}, {} ],
MaJiangSummary: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "1d5bextO+xAqpCMOUoxJgQb", "MaJiangSummary");
cc.Class({
extends: cc.Component,
properties: {
workitem: {
default: null,
type: cc.Node
},
myscore: {
default: null,
type: cc.Label
},
myflag: {
default: null,
type: cc.Node
},
player_1: {
default: null,
type: cc.Node
},
player_1_flag: {
default: null,
type: cc.Node
},
player_1_name: {
default: null,
type: cc.Label
},
player_1_score: {
default: null,
type: cc.Label
},
player_2: {
default: null,
type: cc.Node
},
player_2_flag: {
default: null,
type: cc.Node
},
player_2_name: {
default: null,
type: cc.Label
},
player_2_score: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var e = this;
this.workitem.on("begin", function(t) {
if (null != e.context) {
e.context.summarypage.destroy();
e.context.restart();
}
t.stopPropagation();
});
this.workitem.on("close", function(t) {
null != e.context && e.context.summarypage.destroy();
t.stopPropagation();
});
},
create: function(e, t) {
this.context = e;
for (var i = 0; i < t.players.length; i++) t.players[i];
}
});
cc._RF.pop();
}, {} ],
MajiangDataBind: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d95a8lKtJpJP42PDp+oYIJT", "MajiangDataBind");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
playerprefab: {
default: null,
type: cc.Prefab
},
statebtn: {
default: null,
type: cc.Node
},
mjtimer: {
default: null,
type: cc.Label
},
desk_tip: {
default: null,
type: cc.Node
},
desk_cards: {
default: null,
type: cc.Label
},
cards_current: {
default: null,
type: cc.Prefab
},
cards_panel: {
default: null,
type: cc.Node
},
one_card_panel: {
default: null,
type: cc.Node
},
left_panel: {
default: null,
type: cc.Node
},
right_panel: {
default: null,
type: cc.Node
},
top_panel: {
default: null,
type: cc.Node
},
cards_left: {
default: null,
type: cc.Prefab
},
cards_right: {
default: null,
type: cc.Prefab
},
cards_top: {
default: null,
type: cc.Prefab
},
takecards_one: {
default: null,
type: cc.Prefab
},
takecards_left: {
default: null,
type: cc.Prefab
},
takecards_right: {
default: null,
type: cc.Prefab
},
deskcards_current_panel: {
default: null,
type: cc.Node
},
deskcards_right_panel: {
default: null,
type: cc.Node
},
deskcards_top_panel: {
default: null,
type: cc.Node
},
deskcards_left_panel: {
default: null,
type: cc.Node
},
searchlight: {
default: null,
type: cc.Node
},
actionnode_two: {
default: null,
type: cc.Node
},
actionnode_two_list: {
default: null,
type: cc.Node
},
actionnode_three: {
default: null,
type: cc.Node
},
actionnode_three_list: {
default: null,
type: cc.Node
},
actionnode_deal: {
default: null,
type: cc.Node
},
action_gang_ming_prefab: {
default: null,
type: cc.Prefab
},
action_gang_an_prefab: {
default: null,
type: cc.Prefab
},
cards_gang_ming_prefab: {
default: null,
type: cc.Prefab
},
cards_gang_an_prefab: {
default: null,
type: cc.Prefab
},
roomid: {
default: null,
type: cc.Label
},
gang_current: {
default: null,
type: cc.Node
},
summary: {
default: null,
type: cc.Prefab
},
inviteplayer: {
default: null,
type: cc.Prefab
},
hu_cards_current: {
default: null,
type: cc.Node
},
hu_cards_top: {
default: null,
type: cc.Node
},
hu_cards_left: {
default: null,
type: cc.Node
},
hu_cards_right: {
default: null,
type: cc.Node
},
mask: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.initdata(!0);
this.resize();
var e = this;
null != this.mask && (this.mask.active = !1);
if (this.ready()) {
var t = this.socket();
this.routes = {};
this.playersarray = new Array();
this.playercards = new Array();
this.leftcards = new Array();
this.rightcards = new Array();
this.topcards = new Array();
this.deskcards = new Array();
this.actioncards = new Array();
this.inited = !1;
this.centertimer = null;
this.summarypage = null;
this.exchange_state("init", this);
this.node.on("takecard", function(e) {
var i = e.target.getComponent("TakeMJCard");
if (null != i) {
var a = i.target.getComponent("HandCards");
t.emit("doplaycards", a.value);
}
e.stopPropagation();
});
this.node.on("gang", function(i) {
e.dealActionProcess(e);
t.emit("selectaction", "gang");
i.stopPropagation();
});
this.node.on("peng", function(i) {
e.dealActionProcess(e);
t.emit("selectaction", "peng");
i.stopPropagation();
});
this.node.on("chi", function(i) {
e.dealActionProcess(e);
t.emit("selectaction", "chi");
i.stopPropagation();
});
this.node.on("hu", function(i) {
e.dealActionProcess(e);
t.emit("selectaction", "hu");
i.stopPropagation();
});
this.node.on("guo", function(i) {
e.dealActionProcess(e);
t.emit("selectaction", "guo");
i.stopPropagation();
});
if (null != cc.beimi) {
null != cc.beimi.gamestatus && "playing" == cc.beimi.gamestatus ? this.recovery() : null != cc.beimi.extparams && "room" == cc.beimi.extparams.gamemodel && (this.invite = cc.instantiate(this.inviteplayer));
this.initgame();
}
}
},
initgame: function() {
var e = this;
if (this.ready()) {
var t = this.socket();
this.map("joinroom", this.joinroom_event);
this.map("players", this.players_event);
this.map("banker", this.banker_event);
this.map("play", this.play_event);
this.map("selectcolor", this.selectcolor_event);
this.map("selectresult", this.selectresult_event);
this.map("lasthands", this.lasthands_event);
this.map("takecards", this.takecard_event);
this.map("action", this.action_event);
this.map("selectaction", this.selectaction_event);
this.map("dealcard", this.dealcard_event);
this.map("allcards", this.allcards_event);
this.map("recovery", this.recovery_event);
this.map("roomready", this.roomready_event);
this.map("playeready", this.playeready_event);
t.on("command", function(t) {
cc.beimi.gamestatus = "playing";
if (1 == e.inited) {
var i = e.parse(t);
e.route(i.command)(i, e);
}
});
var i = {
token: cc.beimi.authorization,
playway: cc.beimi.extparams.playway,
orgi: cc.beimi.user.orgi,
extparams: cc.beimi.extparams
};
t.exec("joinroom", i);
this.inited = !0;
}
},
initdata: function(e) {
if (1 == e) {
this.playerspool = new cc.NodePool();
for (var t = 0; t < 4; t++) this.playerspool.put(cc.instantiate(this.playerprefab));
}
this.cardpool = new cc.NodePool();
for (t = 0; t < 14; t++) this.cardpool.put(cc.instantiate(this.cards_current));
},
joinroom_event: function(e, t) {
if (1 == e.cardroom && null != t.inviteplayer) {
t.invite.getComponent("BeiMiQR").init(e.roomid);
t.invite.parent = t.root();
null != t.roomid && (t.roomid.string = e.roomid);
} else null != t.roomid && (t.roomid.string = "大厅房间");
var i = t.playerspool.get(), a = i.getComponent("MaJiangPlayer"), n = null, c = "";
if (e.player.id == cc.beimi.user.id) {
i.setPosition(-570, -150);
c = "current";
t.index = e.index;
} else if (1 == (n = e.index - t.index)) {
i.setPosition(570, 50);
c = "right";
} else if (2 == n) {
i.setPosition(400, 300);
c = "top";
} else if (3 == n) {
i.setPosition(-570, 50);
c = "left";
}
a.init(e.player, n, c);
i.parent = t.root();
t.playersarray.push(i);
},
roomready_event: function(e, t) {
null != t.invite && t.invite.destroy();
},
playeready_event: function(e, t) {
e.userid == cc.beimi.user.id && t.exchange_state("ready", t);
},
takecard_event: function(e, t) {
if (e.userid == cc.beimi.user.id) {
for (var i = 0; i < t.playercards.length; ) {
var a = t.playercards[i].getComponent("HandCards");
if (e.card == a.value) {
t.playercards[i].zIndex = 0;
t.playercards[i].parent = null;
a.reinit();
t.cardpool.put(t.playercards[i]);
t.playercards.splice(i, 1);
var n = cc.instantiate(t.takecards_one);
n.getComponent("DeskCards").init(a.value);
t.deskcards.push(n);
n.parent = t.deskcards_current_panel;
} else {
a.relastone();
1 == a.selectcolor ? t.playercards[i].zIndex = 1e3 + a.value : a.value >= 0 ? t.playercards[i].zIndex = a.value : t.playercards[i].zIndex = 200 + a.value;
i += 1;
}
}
t.layout(t.cards_panel, function(e, t) {
return e.zIndex - t.zIndex;
});
t.exchange_state("takecard", t);
} else {
var c = t.player(e.userid, t), s = void 0, o = void 0, r = void 0;
if ("right" == c.tablepos) {
for (i = 0; i < t.right_panel.children.length; i++) {
t.right_panel.children[i].getComponent("SpecCards").reinit();
}
s = t.right_panel;
o = t.takecards_right;
r = t.deskcards_right_panel;
} else if ("left" == c.tablepos) {
for (i = 0; i < t.left_panel.children.length; i++) {
t.left_panel.children[i].getComponent("SpecCards").reinit();
}
s = t.left_panel;
o = t.takecards_left;
r = t.deskcards_left_panel;
} else if ("top" == c.tablepos) {
for (i = 0; i < t.top_panel.children.length; i++) {
t.top_panel.children[i].getComponent("SpecCards").reinit();
}
s = t.top_panel;
o = t.takecards_one;
r = t.deskcards_top_panel;
}
null != s && s.children[s.children.length - 1].destroy();
var l = cc.instantiate(o);
l.getComponent("DeskCards").init(e.card);
l.parent = r;
t.deskcards.push(l);
}
},
recover_desk_cards: function(e, t, i) {
if (e == cc.beimi.user.id) {
var a = cc.instantiate(i.takecards_one);
a.getComponent("DeskCards").init(t);
i.deskcards.push(a);
a.parent = i.deskcards_current_panel;
} else {
var n = i.player(e, i), c = void 0, s = void 0;
if ("right" == n.tablepos) {
i.right_panel;
c = i.takecards_right;
s = i.deskcards_right_panel;
} else if ("left" == n.tablepos) {
i.left_panel;
c = i.takecards_left;
s = i.deskcards_left_panel;
} else if ("top" == n.tablepos) {
i.top_panel;
c = i.takecards_one;
s = i.deskcards_top_panel;
}
var o = cc.instantiate(c);
o.getComponent("DeskCards").init(t);
o.parent = s;
}
},
dealcard_event: function(e, t) {
var i = t.player(e.userid, t);
t.select_action_searchlight(e, t, i);
if (e.userid == cc.beimi.user.id) t.initDealHandCards(t, e); else {
var a = 0;
"top" == i.tablepos ? a = 1 : "left" == i.tablepos && (a = 2);
t.initPlayerHandCards(0, 1, a, t, !0);
}
t.desk_cards.string = e.deskcards;
"deal" == t.action && e.userid == cc.beimi.user.id || t.exchange_state("action", t);
},
select_action_searchlight: function(e, t, i) {
t.exchange_searchlight(i.tablepos, t);
t.exchange_state("nextplayer", t);
},
allcards_event: function(e, t) {
cc.beimi.gamestatus = "notready";
t.gameover = !1;
setTimeout(function() {
t.summarypage = cc.instantiate(t.summary);
t.summarypage.parent = t.root();
t.summarypage.getComponent("MaJiangSummary").create(t, e);
1 == e.gameRoomOver && (t.gameover = !0);
}, 2e3);
t.exchange_state("allcards", t);
},
recoverboard: function(e, t) {},
setAction: function(e, t) {
t.action = e;
},
players_event: function(e, t) {
t.collect(t);
for (var i = 0; i < e.player.length; i++) {
if (e.player[i].id == cc.beimi.user.id) {
t.index = i;
break;
}
}
if (e.player.length > 1) for (var a = 1; ;) {
a == e.player.length && (a = 0);
if (0 == t.playerexist(e.player[a], t)) {
var n = t.playerspool.get(), c = n.getComponent("MaJiangPlayer"), s = "", o = a - t.index;
if (1 == o || -3 == o) {
n.setPosition(570, 50);
s = "right";
} else if (2 == o || -2 == o) {
n.setPosition(400, 300);
s = "top";
} else if (3 == o || -1 == o) {
n.setPosition(-570, 50);
s = "left";
}
c.init(e.player[a], 0, s);
n.parent = t.root();
t.playersarray.push(n);
}
if (0 == a) break;
a += 1;
}
},
playerexist: function(e, t) {
var i = !1;
if (e.id == cc.beimi.user.id) i = !0; else for (var a = 0; a < t.playersarray.length; a++) {
if (t.playersarray[a].getComponent("MaJiangPlayer").data.id == e.id) {
i = !0;
break;
}
}
return i;
},
banker_event: function(e, t) {
for (var i = 0; i < t.playersarray.length; i++) {
var a = t.playersarray[i].getComponent("MaJiangPlayer");
if (a.data.id == e.userid) {
a.banker();
break;
}
}
},
recovery_event: function(e, t) {
t.decode(e.player.cards);
t.play_event(e.userboard, t);
t.banker_event(e.banker, t);
t.selectresult_event(e.selectcolor, t);
for (var i = 0; i < e.cardsnum.length; i++) {
var a = e.cardsnum[i];
t.selectresult_event(a.selectcolor, t);
for (var n = t.decode(a.hiscards), c = 0; c < n.length; c++) t.recover_desk_cards(a.userid, n[c], t);
}
for (n = t.decode(e.hiscards), c = 0; c < n.length; c++) t.recover_desk_cards(e.userid, n[c], t);
},
action_event: function(e, t) {
t.setAction("take", t);
if (cc.beimi.user.id == e.userid) {
t.exchange_state("action", t);
var i = void 0, a = void 0, n = void 0, c = void 0, s = void 0;
if (1 == e.deal) {
for (var o = 0; o < t.actionnode_deal.children.length; o++) {
var r = t.actionnode_deal.children[o];
"gang" == r.name && (i = r);
"peng" == r.name && (a = r);
"chi" == r.name && (n = r);
"hu" == r.name && (c = r);
r.active = !1;
}
e.gang && (i.active = !0);
e.peng && (a.active = !0);
e.chi && (n.active = !0);
e.hu && (c.active = !0);
t.actionnode_deal.active = !0;
t.setAction("deal", t);
} else {
var l = 0;
if (1 == e.gang || 1 == e.peng || 1 == e.chi || 1 == e.hu) {
t.actionnode_three.getComponent("DeskCards").init(e.card);
for (o = 0; o < t.actionnode_three_list.children.length; o++) {
var d = t.actionnode_three_list.children[o];
"gang" == d.name && (i = d);
"peng" == d.name && (a = d);
"chi" == d.name && (n = d);
"hu" == d.name && (c = d);
"guo" == d.name && (s = d);
d.active = !1;
}
if (e.gang) {
i.active = !0;
l += 1;
}
if (e.peng) {
a.active = !0;
l += 1;
}
if (e.chi) {
n.active = !0;
l += 1;
}
if (e.hu) {
c.active = !0;
l += 1;
}
if (0 == e.deal) {
s.active = !0;
l += 1;
}
var u = 1080 - 124 * (l + 1), p = cc.moveTo(.5, u, -147);
p.easing(cc.easeIn(3));
t.actionnode_three.runAction(p);
setTimeout(function() {
null != t.action && t.dealActionProcess(t);
}, 5e3);
}
}
}
},
selectaction_event: function(e, t) {
var i = t.player(e.userid, t);
if (cc.beimi.user.id == e.userid) {
if ("all" == e.target) {
cc.instantiate(t.action_gang_ming_prefab).parent = t.deskcards_right_panel.parent;
cc.instantiate(t.action_gang_ming_prefab).parent = t.deskcards_top_panel.parent;
cc.instantiate(t.action_gang_ming_prefab).parent = t.deskcards_left_panel.parent;
} else t.select_action_searchlight(e, t, i);
if ("hu" == e.action) {
var a = cc.instantiate(t.takecards_one);
a.getComponent("DeskCards").init(e.card);
t.deskcards.push(a);
a.setScale(.5, .5);
a.parent = t.hu_cards_current;
t.mask.active = !0;
} else {
for (var n = 0; n < t.playercards.length; ) {
var c = t.playercards[n].getComponent("HandCards");
if (e.cardtype == c.mjtype && e.cardvalue == c.mjvalue) {
t.cardpool.put(t.playercards[n]);
t.playercards.splice(n, 1);
} else n++;
}
var s = void 0, o = (s = "an" == e.actype ? cc.instantiate(t.cards_gang_an_prefab) : cc.instantiate(t.cards_gang_ming_prefab)).getComponent("GangAction");
"gang" == e.action ? o.init(e.card, !0) : o.init(e.card, !1);
if ("peng" == e.action || "chi" == e.action) {
var r = t.cards_panel.children[t.cards_panel.children.length - 1];
if (null != r) {
var l = r.getComponent("HandCards");
null != l && l.lastone();
}
}
s.parent = t.gang_current;
t.actioncards.push(s);
for (n = 0; n < t.deskcards.length; n++) {
var d = t.deskcards[n];
if (null != d) {
var u = d.getComponent("DeskCards");
if (null != u && u.value == e.card) {
d.destroy();
t.deskcards.splice(n, n + 1);
break;
}
}
}
}
t.exchange_state("nextplayer", t);
t.exchange_state("action", t);
} else {
var p = t.player(e.target, t), h = void 0;
"right" == p.tablepos ? h = t.deskcards_right_panel : "left" == p.tablepos ? h = t.deskcards_left_panel : "top" == p.tablepos && (h = t.deskcards_top_panel);
h.children.length > 0 && h.children[h.children.length - 1].destroy();
}
},
play_event: function(e, t) {
cc.beimi.gamestatus = "playing";
t.exchange_state("begin", t);
var i = e.player, a = t.decode(i.cards);
setTimeout(function() {
t.calcdesc_cards(t, 136, e.deskcards);
}, 0);
for (var n = 0, c = 0; c < 4; c++) {
t.initMjCards(n, t, a, i.banker);
for (var s = 0, o = 0; o < e.players.length; o++) e.players[o].playuser != cc.beimi.user.id && t.initPlayerHandCards(n, e.players[s++].deskcards, s, t, !1);
n += 1;
}
t.cards_panel.getComponent(cc.Animation).play("majiang_reorder");
var r, l = -100;
for (o = 0; o < t.playercards.length; o++) {
var d = t.playercards[o].getComponent("HandCards");
d.value >= 0 ? t.playercards[o].zIndex = d.value : t.playercards[o].zIndex = 200 + d.value;
if (t.playercards[o].zIndex > l) {
l = t.playercards[o].zIndex;
r = t.playercards[o];
}
}
t.layout(t.cards_panel, function(e, t) {
return e.zIndex - t.zIndex;
});
setTimeout(function() {
1 == i.banker && null != r && r.getComponent("HandCards").lastone();
}, 200);
t.exchange_state("play", t);
},
selectcolor_event: function(e, t) {
for (var i = 0; i < t.playersarray.length; i++) {
var a = t.playersarray[i].getComponent("MaJiangPlayer");
a.data.id == cc.beimi.user.id && a.selecting();
}
t.exchange_state("selectcolor", t);
},
selectresult_event: function(e, t) {
for (var i = 0; i < t.playersarray.length; i++) {
var a = t.playersarray[i].getComponent("MaJiangPlayer");
if (a.data.id == e.userid) {
a.selectresult(e);
break;
}
}
if (e.userid == cc.beimi.user.id) {
t.exchange_state("selectresult", t);
e.color < 10 && t.changecolor(e, t);
}
},
lasthands_event: function(e, t) {
if (e.userid == cc.beimi.user.id) {
t.exchange_state("lasthands", t);
t.exchange_searchlight("current", t);
} else {
t.exchange_state("otherplayer", t);
for (var i = 0; i < t.playersarray.length; i++) {
var a = t.playersarray[i].getComponent("MaJiangPlayer");
if (a.data.id == e.userid) {
t.exchange_searchlight(a.tablepos, t);
break;
}
}
}
},
changecolor: function(e, t) {
for (var i = void 0, a = 0; a < t.playercards.length; a++) {
var n = t.playercards[a].getComponent("HandCards");
n.relastone();
if (parseInt(n.value / 36) == e.color && n.value >= 0) {
n.selected();
t.playercards[a].zIndex = 1e3 + n.value;
(null == i || i.zIndex < t.playercards[a].zIndex) && (i = t.playercards[a]);
}
}
t.layout(t.cards_panel, function(e, t) {
return e.zIndex - t.zIndex;
});
if (e.banker == cc.beimi.user.id && null != i) {
i.getComponent("HandCards").lastone();
}
},
calcdesc_cards: function(e, t, i) {
if ((t -= 1) > i) {
e.desk_cards.string = t;
setTimeout(function() {
e.calcdesc_cards(e, t, i);
}, 15);
}
},
initDealHandCards: function(e, t) {
var i = e.cardpool.get(), a = i.getComponent("HandCards");
e.playercards.push(i);
a.init(t.card);
a.lastone();
parseInt(t.card / 36) == t.color && t.card >= 0 && a.selected();
i.zIndex = 2e3;
i.parent = e.cards_panel;
},
initPlayerHandCards: function(e, t, i, a, n) {
var c = a.right_panel, s = a.rightcards, o = a.cards_right;
if (1 == i) {
c = a.top_panel;
s = a.topcards;
o = a.cards_top;
} else if (2 == i) {
c = a.left_panel;
s = a.leftcards;
o = a.cards_left;
}
a.initOtherCards(e, a, t, o, s, c, n, i);
},
initOtherCards: function(e, t, i, a, n, c, s, o) {
for (var r = 4 * e; r < i && r < 4 * (e + 1); r++) {
var l = cc.instantiate(a);
l.getComponent("SpecCards").init(s, o);
l.parent = c;
n.push(l);
}
},
initMjCards: function(e, t, i, a) {
for (var n = function() {
var e = t.cardpool.get(), n = e.getComponent("HandCards");
t.playercards.push(e);
n.init(i[c]);
1 == a && c == i.length - 1 ? e.parent = t.one_card_panel : e.parent = t.cards_panel;
setTimeout(function() {
e.parent = t.cards_panel;
}, 200);
}, c = 4 * e; c < i.length && c < 4 * (e + 1); c++) n();
},
collect: function(e) {
for (var t = 0; t < e.playersarray.length; ) {
var i = e.playersarray[t];
if (i.getComponent("MaJiangPlayer").data.id != cc.beimi.user.id) {
e.playerspool.put(i);
e.playersarray.splice(t, 1);
} else t++;
}
},
waittingForPlayers: function() {
this.exchange_state("ready", this);
},
player: function(e, t) {
for (var i = void 0, a = 0; a < t.playersarray.length; a++) {
var n = t.playersarray[a].getComponent("MaJiangPlayer");
if (n.data.id == e) {
i = n;
break;
}
}
return i;
},
exchange_state: function(e, t) {
for (var i = null, a = null, n = null, c = null, s = 0; s < t.statebtn.children.length; s++) {
var o = t.statebtn.children[s];
"readybtn" == o.name ? i = o : "waitting" == o.name ? a = o : "select" == o.name ? n = o : "banker" == o.name && (c = o);
o.active = !1;
}
switch (e) {
case "init":
t.desk_tip.active = !1;
i.active = !0;
t.actionnode_deal.active = !1;
t.exchange_searchlight("none", t);
break;

case "ready":
a.active = !0;
null != cc.beimi.data && 1 == cc.beimi.data.enableai ? t.timer(t, cc.beimi.data.waittime) : t.timer(t, cc.beimi.data.noaiwaitime);
break;

case "begin":
a.active = !1;
t.desk_tip.active = !0;
t.canceltimer(t);
break;

case "play":
t.timer(t, 2);
break;

case "selectcolor":
t.exchange_searchlight("current", t);
n.active = !0;
t.timer(t, 5);
break;

case "selectresult":
n.active = !1;
t.canceltimer(t);
break;

case "lasthands":
c.active = !0;
t.timer(t, 8);
break;

case "otherplayer":
t.timer(t, 8);
break;

case "takecard":
c.active = !1;
break;

case "action":
t.dealActionProcess(t);
break;

case "nextplayer":
t.timer(t, 8);
break;

case "allcards":
for (s = 0; s < t.playersarray.length; s++) {
t.playersarray[s].getComponent("MaJiangPlayer").clean();
}
t.canceltimer(t);
}
},
exchange_searchlight: function(e, t) {
for (var i = 0; i < t.searchlight.children.length; i++) e == t.searchlight.children[i].name ? t.searchlight.children[i].active = !0 : t.searchlight.children[i].active = !1;
},
dealActionProcess: function(e) {
var t = cc.moveTo(.5, 1080, -147);
t.easing(cc.easeIn(3));
e.actionnode_three.runAction(t);
"deal" == e.action && (e.actionnode_deal.active = !1);
e.action = null;
},
canceltimer: function(e) {
e.unscheduleAllCallbacks();
e.mjtimer.string = "00";
},
recovery: function() {},
timer: function(e, t) {
e.mjtimer.string = t > 9 ? t : "0" + t;
e.callback = function() {
if ((t -= 1) >= 0) {
var i = t;
t < 10 && (i = "0" + t);
e.mjtimer.string = i;
}
};
e.unscheduleAllCallbacks();
e.schedule(e.callback, 1, t, 0);
},
clean: function() {
for (var e = 0; e < this.playercards.length; e++) this.playercards[e].destroy();
this.playercards.splice(0, this.playercards.length);
for (e = 0; e < this.deskcards.length; e++) this.deskcards[e].destroy();
this.deskcards.splice(0, this.deskcards.length);
for (e = 0; e < this.leftcards.length; e++) this.leftcards[e].destroy();
this.leftcards.splice(0, this.leftcards.length);
for (e = 0; e < this.rightcards.length; e++) this.rightcards[e].destroy();
this.rightcards.splice(0, this.rightcards.length);
for (e = 0; e < this.topcards.length; e++) this.topcards[e].destroy();
this.topcards.splice(0, this.topcards.length);
for (e = 0; e < this.actioncards.length; e++) this.actioncards[e].destroy();
this.actioncards.splice(0, this.actioncards.length);
this.mask.active = !1;
},
restart: function() {
this.clean();
if (1 == this.gameover) {
for (var e = 0; e < this.player.length; e++) this.player[e].destroy();
this.player.splice(0, this.player.length);
this.player = new Array();
this.initdata(!0);
} else this.initdata(!1);
if (this.ready()) {
this.socket().emit("restart", "restart");
}
},
startgame: function() {
if (this.ready()) {
this.socket().emit("start", "true");
}
},
onDestroy: function() {
this.inited = !1;
this.cleanmap();
if (this.ready()) {
this.socket().emit("leave", "leave");
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
MenuClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4ee59TGB3VFZLQuujavmCxG", "MenuClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
setting: {
default: null,
type: cc.Prefab
},
message: {
default: null,
type: cc.Prefab
},
share: {
default: null,
type: cc.Prefab
},
playway: {
default: null,
type: cc.Prefab
},
feedback: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {},
onSettingClick: function() {
cc.beimi.openwin = cc.instantiate(this.setting);
cc.beimi.openwin.parent = this.root();
},
onMessageClick: function() {
cc.beimi.openwin = cc.instantiate(this.message);
cc.beimi.openwin.parent = this.root();
},
onShareClick: function() {
cc.beimi.openwin = cc.instantiate(this.share);
cc.beimi.openwin.parent = this.root();
},
onPlaywayClick: function() {
cc.beimi.openwin = cc.instantiate(this.playway);
cc.beimi.openwin.parent = this.root();
},
onRecordClick: function() {
cc.beimi.openwin = cc.instantiate(this.playway);
cc.beimi.openwin.parent = this.root();
},
onFeedBackClick: function() {
cc.beimi.openwin = cc.instantiate(this.feedback);
cc.beimi.openwin.parent = this.root();
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
MessageDialog: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c56edHPmRpESZK38dhRM8Dx", "MessageDialog");
cc.Class({
extends: cc.Component,
properties: {
title_message: {
default: null,
type: cc.Node
},
title_contact: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.title_contact.active = !1;
this.title_message.active = !0;
},
onContacts: function() {
this.title_contact.active = !0;
this.title_message.active = !1;
},
onMessage: function() {
this.title_contact.active = !1;
this.title_message.active = !0;
}
});
cc._RF.pop();
}, {} ],
PlayGame: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6643cbk+6NH4aV0uFiz0KPh", "PlayGame");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {
this.resize();
},
onClickDizhu: function() {
this.loadding();
var e = this;
setTimeout(function() {
e.scene("dizhu", e);
}, 200);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
PlayPoker: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0da62UUiKFCy6UjmbXoH553", "PlayPoker");
cc.Class({
extends: cc.Component,
properties: {
posy: cc.Integer,
card: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.posy = this.card.y;
},
takecard: function(e) {
var t = e.target.parent.getComponent("BeiMiCard");
if (null != t.game) if (e.target.y == this.posy) {
e.target.y = e.target.y + 30;
t.selected = !0;
} else {
e.target.y = e.target.y - 30;
t.selected = !1;
}
}
});
cc._RF.pop();
}, {} ],
PlayerRender: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "04f19Z9BnFGC5KENS4kRc0S", "PlayerRender");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
username: {
default: null,
type: cc.Label
},
goldcoins: {
default: null,
type: cc.Label
},
dizhu: {
default: null,
type: cc.Node
},
pokertag: {
default: null,
type: cc.Node
},
pokercards: {
default: null,
type: cc.Label
},
timer: {
default: null,
type: cc.Node
},
jsq: {
default: null,
type: cc.Node
},
headimg: {
default: null,
type: cc.Node
},
atlas: {
default: null,
type: cc.SpriteAtlas
},
timer_num: {
default: null,
type: cc.Label
},
result: {
default: null,
type: cc.Node
},
lastcards: {
default: null,
type: cc.Node
},
cannot: {
default: null,
type: cc.Node
},
donot: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.cardcount = 0;
this.cardslist = new Array();
this.isRight = !1;
},
initplayer: function(e, t) {
this.username.string = e.username;
this.userid = e.id;
if (1 == t) {
this.pokertag.x = -1 * this.pokertag.x;
this.timer.x = -1 * this.timer.x;
this.headimg.x = -1 * this.headimg.x;
this.result.x = -1 * this.result.x;
this.cannot.x = -1 * this.cannot.x;
this.donot.x = -1 * this.donot.x;
this.jsq.x = -1 * this.jsq.x;
this.dizhu.x = -1 * this.dizhu.x;
this.lastcards.getComponent(cc.Layout).horizontalDirection = 0;
this.isRight = t;
}
if (this.goldcoins) if (e.goldcoins > 1e4) {
var i = this.goldcoins / 1e4;
this.goldcoins.string = i.toFixed(2) + "万";
} else this.goldcoins.string = e.goldcoins;
this.dizhu && (this.dizhu.active = !1);
this.jsq && (this.jsq.active = !1);
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
this.takecards && (this.takecards.active = !1);
},
countcards: function(e) {
this.cardcount = this.cardcount + e;
this.pokercards.string = this.cardcount;
},
resetcards: function(e) {
this.cardcount = e;
null != this.pokercards && (this.pokercards.string = this.cardcount);
},
catchtimer: function(t) {
this.jsq && (this.jsq.active = !0);
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
var i = e("GameTimer");
this.beimitimer = new i();
this.timesrc = this.beimitimer.runtimer(this, this.jsq, this.atlas, this.timer_num, this.timer_num, t);
},
catchresult: function(e) {
if (this.beimitimer) {
this.beimitimer.stoptimer(this, this.jsq, this.timesrc);
var t = this.atlas.getSpriteFrame("提示_抢地主"), i = this.atlas.getSpriteFrame("提示_不抢");
if (e.grab) {
if (this.result) {
this.result.getComponent(cc.Sprite).spriteFrame = t;
this.result.active = !0;
}
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
} else {
if (this.result) {
this.result.getComponent(cc.Sprite).spriteFrame = i;
this.result.active = !0;
}
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
}
}
},
hideresult: function() {
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
},
lasthands: function(e, t, i) {
this.hideresult();
this.beimitimer && this.timesrc && this.beimitimer.stoptimer(this, this.jsq, this.timesrc);
if (this.userid == i.userid) {
this.pokercards && this.countcards(3);
this.playtimer(t, 25);
}
this.setDizhuFlag(i);
},
setDizhuFlag: function(e) {
this.userid == e.userid ? this.dizhu.active = !0 : this.dizhu.active = !1;
},
lasttakecards: function(e, t, i, a, n) {
this.beimitimer && this.timesrc && this.beimitimer.stoptimer(this, this.jsq, this.timesrc);
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
this.jsq && (this.jsq.active = !1);
this.lastcards && (this.lastcards.active = !0);
if (this.cardslist.length > 0) {
for (var c = 0; c < this.cardslist.length; c++) e.minpokerpool.put(this.cardslist[c]);
this.cardslist.splice(0, this.cardslist.length);
}
if (0 == n.donot || 1 == n.finished) {
this.resetcards(i);
for (c = 0; c < a.length; c++) this.playcards(e, c, a[c], a);
this.layout(this.lastcards, function(e, t) {
return e.zIndex - t.zIndex;
});
} else "1" == n.sameside ? t.getPlayer(n.userid).tipdonot() : t.getPlayer(n.userid).tipcannot();
},
tipcannot: function() {
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !0);
this.donot && (this.donot.active = !1);
},
tipdonot: function() {
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !0);
},
playcards: function(e, t, i, a) {
var n = e.minpokerpool.get();
n.x = 30 * t - 30;
var c = this.countcard(i, a);
n.zIndex = 4 - c;
n.parent = this.lastcards;
this.cardslist.push(n);
var s = n.getComponent("BeiMiCard");
s.setCard(i);
s.order();
},
countcard: function(e, t) {
for (var i = parseInt(e / 4), a = 0, n = 0; n < t.length; n++) {
i == parseInt(t[n] / 4) && (a += 1);
}
return a;
},
playtimer: function(t, i) {
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
this.lastcards && (this.lastcards.active = !1);
for (var a = 0; a < this.cardslist.length; a++) t.minpokerpool.put(this.cardslist[a]);
var n = e("GameTimer");
this.beimitimer = new n();
this.timesrc = this.beimitimer.runtimer(this, this.jsq, this.atlas, this.timer_num, this.timer_num, i);
},
clean: function(e) {
for (var t = 0; t < this.cardslist.length; t++) e.minpokerpool.put(this.cardslist[t]);
this.resetcards(0);
this.dizhu && (this.dizhu.active = !1);
this.jsq && (this.jsq.active = !1);
this.result && (this.result.active = !1);
this.cannot && (this.cannot.active = !1);
this.donot && (this.donot.active = !1);
this.takecards && (this.takecards.active = !1);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon",
GameTimer: "GameTimer"
} ],
PlayersEvent: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f88a1eHh9tCsqfPY5gVf+/A", "PlayersEvent");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
PlaywayClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "917d5CY9nhAg4c6kp0gnisn", "PlaywayClick");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
playway: {
default: null,
type: cc.Node
}
},
onLoad: function() {},
onClick: function() {
this.getCommon("SelectPlayway");
var e = this.playway.getComponent("Playway"), t = {
gametype: e.data.code,
playway: e.data.id
};
this.closeOpenWin();
this.preload(t, this);
},
createRoom: function(e, t) {
var i = this;
this.loadding();
setTimeout(function() {
i.scene(t, i);
}, 200);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
PlaywayGroup: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "23db4wB+L1AhpChiA3tHB3S", "PlaywayGroup");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
grouptitle: {
default: null,
type: cc.Label
},
groupbox: {
default: null,
type: cc.Node
},
groupbox_four: {
default: null,
type: cc.Node
},
content: {
default: null,
type: cc.Node
},
itemname: {
default: null,
type: cc.Label
},
checkbox: {
default: null,
type: cc.Node
},
checkboxnode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
var e = this;
this.node.on("checkbox", function(t) {
if (null != e.checkbox) if (0 == e.checked) {
if ("radio" == e.data.type) for (var i = 0; i < e.options.length; i++) {
e.options[i].doUnChecked();
}
e.doChecked();
} else if ("radio" == e.data.type) {
for (i = 0; i < e.options.length; i++) {
e.options[i].doUnChecked();
}
e.doChecked();
} else e.doUnChecked();
t.stopPropagation();
});
},
init: function(e, t, i, a) {
this.data = e;
this.options = a;
this.groupoptions = new Array();
this.checked = !1;
this.grouptitle.string = e.name;
if (null != this.groupbox && null != t) {
for (var n = 0, c = 0; c < i.length; c++) if (i[c].groupid == e.id) {
n += 1;
var s = cc.instantiate(t);
if (null != e.style && "three" == e.style) {
s.parent = this.groupbox;
this.groupbox_four.active = !1;
this.groupbox.active = !0;
} else {
s.parent = this.groupbox_four;
this.groupbox_four.active = !0;
this.groupbox.active = !1;
}
var o = s.getComponent("PlaywayGroup");
this.groupoptions.push(o);
o.inititem(i[c], e, this.groupoptions);
}
if (null != e.style && "three" == e.style) {
if (n > 4) {
this.content.height = 35 + 50 * (parseInt((n - 1) / 3) + 1);
this.groupbox.height = 50 * (parseInt((n - 1) / 3) + 1);
}
} else if (n > 4) {
this.content.height = 35 + 50 * (parseInt((n - 1) / 4) + 1);
this.groupbox_four.height = 50 * (parseInt((n - 1) / 4) + 1);
}
}
},
inititem: function(e, t, i) {
this.data = t;
this.item = e;
this.options = i;
this.itemname.string = e.name;
if ("three" == t.style) {
this.itemname.node.width = 160;
this.itemname.node.x = 107;
} else {
this.itemname.node.width = 105;
this.itemname.node.x = 77;
}
1 == e.defaultvalue ? this.doChecked() : this.doUnChecked();
null != t && null != t.style && "three" == t.style && (this.checkboxnode.x = -76);
},
doChecked: function() {
this.checked = !0;
this.checkbox.active = !0;
},
doUnChecked: function() {
this.checked = !1;
this.checkbox.active = !1;
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
Playway: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bc637Rt3XZNHq0lqg8C5lYR", "Playway");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
tag: {
default: null,
type: cc.Node
},
score: {
default: null,
type: cc.Label
},
onlineusers: {
default: null,
type: cc.Label
},
scorelimit: {
default: null,
type: cc.Label
},
atlas: {
default: null,
type: cc.SpriteAtlas
}
},
onLoad: function() {},
init: function(e) {
if (e) {
var t = "初级";
"2" == e.level && (t = "高级");
this.data = e;
0 == e.shuffle ? this.tag.active = !1 : this.tag.active = !0;
t += e.skin;
this.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame(t);
this.onlineusers.string = e.onlineusers + " 人 ";
var i = parseInt(e.mincoins / 1e3) + "千";
e.mincoins >= 1e4 && (i = parseInt(e.mincoins / 1e4) + "万");
var a = parseInt(e.maxcoins / 1e3) + "千";
e.maxcoins >= 1e4 && (a = parseInt(e.maxcoins / 1e4) + "万");
this.scorelimit.string = i + "-" + a;
this.score.string = e.score;
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
Ready: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "752c7696GJE1bnLAB2ZAIEG", "Ready");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
target: {
default: null,
type: cc.Node
}
},
onLoad: function() {},
onClick: function(e) {
this.target.getComponent("MajiangDataBind").startgame();
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
RoomClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f9e4fYjsVRIGLcQEne6Zyt1", "RoomClick");
cc.Class({
extends: cc.Component,
properties: {},
onClick: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("checkbox", !0));
},
onCreateRoom: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("createroom", !0));
}
});
cc._RF.pop();
}, {} ],
RoomOption: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "69fc37PjLpDHJPum+0hWtu/", "RoomOption");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
},
memo: {
default: null,
type: cc.Label
},
optionsnode: {
default: null,
type: cc.Node
},
roomtitle: {
default: null,
type: cc.Node
},
optiongroup: {
default: null,
type: cc.Prefab
},
optiongroupitem: {
default: null,
type: cc.Prefab
},
memonode: {
default: null,
type: cc.Node
},
createroom: {
default: null,
type: cc.Node
},
freeopt: {
default: null,
type: cc.Node
}
},
onLoad: function() {
var e = this;
this.group = new Array();
this.node.on("createroom", function(t) {
for (var i = {}, a = (new Array(), 0); a < e.group.length; a++) {
for (var n = e.group[a], c = "", s = 0; s < n.groupoptions.length; s++) {
var o = n.groupoptions[s];
if (1 == o.checked) {
"" != c && (c += ",");
c += o.item.value;
}
}
i[n.data.code] = c;
}
i.gametype = e.data.code;
i.playway = e.data.id;
i.gamemodel = "room";
t.stopPropagation();
e.preload(i, e);
});
},
init: function(e) {
this.data = e;
if (null != this.memo && null != e.memo && "" != e.memo) {
this.memonode.active = !0;
this.memo.string = e.memo;
} else null != this.memonode && (this.memonode.active = !1);
if (1 == e.free) {
this.freeopt.active = !0;
this.createroom.active = !1;
} else {
this.freeopt.active = !1;
this.createroom.active = !0;
}
if (null != e.roomtitle && "" != e.roomtitle) {
var t = this.atlas.getSpriteFrame(e.roomtitle);
null != t && (this.roomtitle.getComponent(cc.Sprite).spriteFrame = t);
}
if (null != this.optiongroup && null != e.groups) for (var i = 0; i < e.groups.length; i++) {
var a = cc.instantiate(this.optiongroup), n = a.getComponent("PlaywayGroup");
n.init(e.groups[i], this.optiongroupitem, e.items);
this.group.push(n);
a.parent = this.optionsnode;
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
RoomPlayway: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3086d4/qp5Fs4lHZ22cK68H", "RoomPlayway");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
},
gametype: {
default: null,
type: cc.Node
},
roomoption: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {},
init: function(e) {
e && (this.data = e);
"dizhu" == e.code ? this.gametype.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("斗地主") : "majiang" == e.code ? this.gametype.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("广东麻将") : "poker" == e.code && (this.gametype.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("德州扑克"));
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
Room: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ad979AdLn9Cd6FhwY0F5RKz", "Room");
cc.Class({
extends: cc.Component,
properties: {
playway: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
this.playwaypool = new cc.NodePool();
for (var e = 0; e < 5; e++) this.playwaypool.put(cc.instantiate(this.playway));
this.playwayarray = new Array();
},
init: function() {
var e = cc.beimi.game.type(data);
if (null != e) for (var t = 0; t < e.playways.length; t++) {
var i = this.playwaypool.get();
i.getComponent("Playway").init(e.playways[t]);
i.parent = this.content;
this.playwayarray.push(i);
}
}
});
cc._RF.pop();
}, {} ],
SelectColor: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f8327R8gFFLi72Qcm9IEpSQ", "SelectColor");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {},
onClick: function(e, t) {
if (this.ready()) {
this.socket().emit("selectcolor", t);
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
SelectPlayway: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "b0664oMnHlOK5okeYWUYZ/B", "SelectPlayway");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {
first: {
default: null,
type: cc.Node
},
second: {
default: null,
type: cc.Node
},
gamepoint: {
default: null,
type: cc.Node
},
title: {
default: null,
type: cc.Node
},
global: {
default: null,
type: cc.Node
},
playway: {
default: null,
type: cc.Prefab
},
content: {
default: null,
type: cc.Node
}
},
onLoad: function() {
if (null != cc.beimi && null != cc.beimi.user) {
this.disMenu("first");
this.playwaypool = new cc.NodePool();
for (var e = 0; e < 20; e++) this.playwaypool.put(cc.instantiate(this.playway));
this.playwayarray = new Array();
if (this.gamepoint && null != cc.beimi && null != cc.beimi.games) for (var t = 0; t < this.gamepoint.children.length; t++) {
var i = this.gamepoint.children[t].name, a = !1;
for (e = 0; e < cc.beimi.games.length; e++) {
for (var n = cc.beimi.games[e], c = 0; c < n.types.length; c++) {
if (n.types[c].code == i) {
a = !0;
break;
}
}
if (1 == a) break;
}
this.gamepoint.children[t].active = 1 == a;
}
}
},
onClick: function(e, t) {
this.disMenu("second");
this.global.getComponent("DefaultHallDataBind").playToLeft();
this._secondAnimCtrl = this.second.getComponent(cc.Animation);
this._secondAnimCtrl.play("playway_display");
if (this.title) for (var i = 0; i < this.title.children.length; i++) this.title.children[i].name == t ? this.title.children[i].active = !0 : this.title.children[i].active = !1;
var a = cc.beimi.game.type(t);
if (null != a) for (i = 0; i < a.playways.length; i++) {
var n = this.playwaypool.get(), c = n.getComponent("Playway");
null == c && (c = n.getComponent("RoomPlayway"));
c.init(a.playways[i]);
n.parent = this.content;
this.playwayarray.push(n);
}
},
onRoomClick: function() {
this.disMenu("third");
this._menuDisplay = this.third.getComponent(cc.Animation);
this._menuDisplay.play("play_room_display");
},
onSecondBack: function(e, t) {
this.global.getComponent("DefaultHallDataBind").playToRight();
this.collect();
this.disMenu("first");
},
onThirddBack: function(e, t) {
this.disMenu("first");
},
collect: function() {
for (var e = 0; e < this.playwayarray.length; e++) this.playwaypool.put(this.playwayarray[e]);
this.playwayarray.splice(0, this.playwayarray.length);
},
disMenu: function(e) {
if ("first" == e) {
this.first.active = !0;
this.second.active = !1;
null != this.third && (this.third.active = !1);
} else if ("second" == e) {
this.first.active = !1;
this.second.active = !0;
null != this.third && (this.third.active = !1);
} else if ("third" == e) {
this.first.active = !1;
this.second.active = !1;
null != this.third && (this.third.active = !0);
}
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
SettingClide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "90431f23JhC0KoTIGgpT8b7", "SettingClide");
cc.Class({
extends: cc.Component,
properties: {
music: {
default: null,
type: cc.Sprite
},
musicSlider: {
default: null,
type: cc.Slider
},
sound: {
default: null,
type: cc.Sprite
},
soundSlider: {
default: null,
type: cc.Slider
},
musicon: {
default: null,
type: cc.Node
},
musicoff: {
default: null,
type: cc.Node
},
soundon: {
default: null,
type: cc.Node
},
soundoff: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.musicSlider.progress = cc.beimi.audio.bgVolume;
this.music.fillRange = cc.beimi.audio.bgVolume;
if (cc.beimi.audio.getState() == cc.audioEngine.AudioState.PLAYING) {
this.musicon.active = !0;
this.musicoff.active = !1;
} else {
this.musicon.active = !1;
this.musicoff.active = !0;
}
},
onMusicSlide: function(e) {
this.music.fillRange = e.progress;
cc.beimi.audio.setBGMVolume(e.progress);
this.musicon.active = !0;
this.musicoff.active = !1;
},
onSoundSlide: function(e) {
this.sound.fillRange = e.progress;
},
onMusiceBtnClick: function() {
if (cc.beimi.audio.getState() == cc.audioEngine.AudioState.PLAYING) {
this.musicon.active = !1;
this.musicoff.active = !0;
cc.beimi.audio.pauseAll();
} else {
this.musicon.active = !0;
this.musicoff.active = !1;
cc.beimi.audio.resumeAll();
}
}
});
cc._RF.pop();
}, {} ],
SpecCards: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "92a2dUdJFBDKb8JTWhMyGZu", "SpecCards");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
init: function(e, t) {
this.spec = e;
this.inx = t;
1 == this.spec && (0 == this.inx || 2 == this.inx ? this.node.height = this.node.height + 50 : this.node.width = this.node.width + 30);
},
reinit: function() {
1 == this.spec && (0 == this.inx || 2 == this.inx ? this.node.height = this.node.height - 50 : this.node.width = this.node.width - 30);
this.spec = !1;
}
});
cc._RF.pop();
}, {} ],
SummaryClick: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "72e3dJ9+HxO36v85+BG/64a", "SummaryClick");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onBGClick: function(e) {
e.stopPropagation();
},
onCloseClick: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("close", !0));
},
onBeginClick: function() {
this.node.dispatchEvent(new cc.Event.EventCustom("begin", !0));
}
});
cc._RF.pop();
}, {} ],
SummaryDetail: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4b94d75s1JMlLg4UokBmvtU", "SummaryDetail");
cc.Class({
extends: cc.Component,
properties: {
workitem: {
default: null,
type: cc.Node
},
myscore: {
default: null,
type: cc.Label
},
myflag: {
default: null,
type: cc.Node
},
player_1: {
default: null,
type: cc.Node
},
player_1_flag: {
default: null,
type: cc.Node
},
player_1_name: {
default: null,
type: cc.Label
},
player_1_score: {
default: null,
type: cc.Label
},
player_2: {
default: null,
type: cc.Node
},
player_2_flag: {
default: null,
type: cc.Node
},
player_2_name: {
default: null,
type: cc.Label
},
player_2_score: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var e = this;
this.workitem.on("begin", function(t) {
if (null != e.context) {
e.context.summarypage.destroy();
e.context.restart("begin");
}
t.stopPropagation();
});
this.workitem.on("opendeal", function(t) {
if (null != e.context) {
e.context.summarypage.destroy();
e.context.restart("opendeal");
}
t.stopPropagation();
});
this.workitem.on("close", function(t) {
if (null != e.context) {
e.context.onCloseClick();
e.context.summarypage.destroy();
}
t.stopPropagation();
});
},
create: function(e, t) {
this.context = e;
for (var i = 0, a = 0; a < t.players.length; a++) {
var n = t.players[a];
if (n.userid == cc.beimi.user.id) this.process(n, null, this.myscore, this.myflag); else {
0 == i ? this.process(n, this.player_1_name, this.player_1_score, this.player_1_flag) : 1 == i && this.process(n, this.player_2_name, this.player_2_score, this.player_2_flag);
i += 1;
}
}
},
process: function(e, t, i, a) {
null != t && (t.string = e.username);
1 == e.win ? i.string = e.score : i.string = "-" + e.score;
1 == e.dizhu ? a.active = !0 : a.active = !1;
}
});
cc._RF.pop();
}, {} ],
TakeMJCard: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "09db6qY1x9IrIdvV3VFAYc8", "TakeMJCard");
cc.Class({
extends: cc.Component,
properties: {
target: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.clickstate = !1;
},
onClick: function() {
var e = this.target.getComponent("HandCards"), t = this;
if (1 == this.clickstate) this.node.dispatchEvent(new cc.Event.EventCustom("takecard", !0)); else {
if (1 == e.take) {
e.take = !1;
this.target.y = this.target.y - 30;
} else {
e.take = !0;
this.target.y = this.target.y + 30;
}
this.clickstate = !0;
setTimeout(function() {
t.clickstate = !1;
}, 500);
}
}
});
cc._RF.pop();
}, {} ],
common: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c20fdJA4UpBA5zauiK5QF44", "common");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
onLoad: function() {},
login: function() {
this.io = e("IOUtils");
this.loadding();
if (null == this.io.get("userinfo")) cc.beimi.http.httpGet("/api/guest", this.sucess, this.error, this); else {
var t = JSON.parse(this.io.get("userinfo"));
if (null != t.token) cc.beimi.http.httpGet("/api/guest?token=" + t.token.id, this.sucess, this.error, this);
}
},
sucess: function(e, t) {
var i = JSON.parse(e);
if (null != i && null != i.token && null != i.data) {
t.reset(i, e);
cc.beimi.gamestatus = i.data.gamestatus;
t.connect();
null != cc.beimi.gametype && "" != cc.beimi.gametype && t.scene(cc.beimi.gametype, t);
}
},
error: function(e) {
e.closeloadding(e.loaddingDialog);
e.alert("网络异常，服务访问失败");
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon",
IOUtils: "IOUtils"
} ],
form: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3c448sm7ERFGonudseXdiiB", "form");
cc.Class({
extends: cc.Component,
properties: {
username: cc.EditBox,
password: cc.EditBox
},
onLoad: function() {
this._prefab = cc.find("Canvas/login");
},
submit: function() {
if ("" == !this.username.string && "" == !this.password.string) {
this._prefab.destroy();
if (cc.beimi.loadding.size() > 0) {
var e = cc.beimi.loadding.get(), t = cc.find("Canvas");
e.parent = t;
this._animCtrl = e.getComponent(cc.Animation);
this._animCtrl.play("loadding").wrapMode = cc.WrapMode.Loop;
}
}
},
guest: function() {}
});
cc._RF.pop();
}, {} ],
init: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2b60bxhrRtJ44oyACJf+UrI", "init");
cc.Class({
extends: cc.Component,
properties: {
_progress: 0,
_splash: null,
_isLoading: !1,
loaddingPrefab: {
default: null,
type: cc.Prefab
},
alertPrefab: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
if (!cc.sys.isNative && cc.sys.isMobile) {
var e = this.node.getComponent(cc.Canvas);
e.fitHeight = !0;
e.fitWidth = !0;
}
var t = cc.director.getWinSize();
cc.view.setDesignResolutionSize(t.width, t.height, cc.ResolutionPolicy.EXACT_FIT);
this.initMgr();
},
start: function() {},
initMgr: function() {
if (null == cc.beimi) {
cc.beimi = {};
cc.beimi.routes = {};
cc.beimi.event = {};
cc.beimi.http = e("HTTP");
cc.beimi.seckey = "beimi";
cc.beimi.gamestatus = "none";
cc.beimi.dialog = null;
cc.beimi.openwin = null;
cc.beimi.loadding = new cc.NodePool();
cc.beimi.loadding.put(cc.instantiate(this.loaddingPrefab));
cc.beimi.dialog = new cc.NodePool();
cc.beimi.dialog.put(cc.instantiate(this.alertPrefab));
cc.beimi.game = {
model: null,
playway: null,
type: function(e) {
var t;
if (null != cc.beimi.games) for (var i = 0; i < cc.beimi.games.length; i++) for (var a = cc.beimi.games[i], n = 0; n < a.types.length; n++) {
var c = a.types[n];
c.code == e && (t = c);
}
return t;
}
};
var t = e("Audio");
cc.beimi.audio = new t();
cc.beimi.audio.init();
var i = e("socket.io");
window.io = new i();
cc.beimi.audio.playBGM("bgMain.mp3");
cc.Button.prototype.touchEndedClone = cc.Button.prototype._onTouchEnded;
cc.Button.prototype._soundOn = !0;
cc.Button.prototype.setSoundEffect = function(e) {
this._soundOn = e;
};
cc.Button.prototype._onTouchEnded = function(e) {
this.interactable && this.enabledInHierarchy && this._pressed && 1 == this._soundOn && cc.beimi.audio.playSFX("select.mp3");
this.touchEndedClone(e);
};
}
}
});
cc._RF.pop();
}, {
Audio: "Audio",
HTTP: "HTTP",
"socket.io": "socket.io"
} ],
logindialog: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6a4c7+ASWxPzb8+X9E5tU/a", "logindialog");
var a = e("BeiMiCommon");
cc.Class({
extends: a,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
e.stopPropagation();
});
},
onCloseClick: function() {
var e = this.getCommon("common");
null != e && e.loginFormPool.put(e.dialog);
}
});
cc._RF.pop();
}, {
BeiMiCommon: "BeiMiCommon"
} ],
"socket.io": [ function(e, t, i) {
"use strict";
cc._RF.push(t, "83e71BFtMFHUZ8vefL8Yxl5", "socket.io");
cc.Class({
extends: cc.Component,
properties: {},
connect: function(e, t) {
var i = this;
this.ws = new WebSocket(e + "?userid=" + cc.beimi.user.id);
this.ws.onopen = function(e) {
console.log("Send Text WS was opened.");
};
this.ws.onmessage = function(e) {
var t = i.parse(e.data);
null != t && null != t.event && cc.beimi.event[t.event](e.data);
console.log("response text msg: " + e.data);
};
this.ws.onerror = function(e) {
console.log("Send Text fired an error");
};
this.ws.onclose = function(e) {
console.log("WebSocket instance closed.");
};
return this;
},
on: function(e, t) {
cc.beimi.event[e] = t;
},
exec: function(e, t) {
if (this.ws.readyState === WebSocket.OPEN) {
t.command = e;
t.userid = cc.beimi.user.id;
t.orgi = cc.beimi.user.orgi;
t.token = cc.beimi.authorization;
this.ws.send(JSON.stringify(t));
}
},
emit: function(e, t) {
var i = {
data: t
};
this.exec(e, i);
},
disconnect: function() {},
parse: function(e) {
return JSON.parse(e);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "DiZhuSummaryClick", "DizhuBegin", "DizhuButton", "DizhuDataBind", "GameMenu", "PlayPoker", "SelectColor", "SummaryDetail", "MJMenuClick", "MaJiangPlayer", "MaJiangSummary", "MajiangDataBind", "Ready", "DeskCards", "HandCards", "SpecCards", "TakeMJCard", "ActionEvent", "AnimEvent", "JoinRoomEvent", "PlayersEvent", "GangAction", "SummaryClick", "DefaultHallDataBind", "GameRoom", "PlayGame", "Playway", "PlaywayClick", "Room", "RoomPlayway", "SelectPlayway", "DialogClick", "FeedBackDialog", "JoinRoomClick", "LogoutClick", "MenuClick", "MessageDialog", "SettingClide", "PlaywayGroup", "RoomClick", "RoomOption", "common", "form", "init", "BeiMiQR", "GameTimer", "PlayerRender", "BeiMiCard", "BeiMiCommon", "BeiMiDialog", "BeiMiRoomOption", "BeiMiTimer", "EventStop", "IOUtils", "logindialog", "Audio", "Base64", "HTTP", "socket.io" ]);
//# sourceMappingURL=project.js.map