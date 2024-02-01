// function main() {
//
//     thread.execAsync(function () {
//
//         logd('成功引用泡椒云验证模块');
//
//         let storage = storages.create("本地存储");
//         storage.putString("登录成功", 'false');
//
//         const PJYSDK = (function () {
//             function PJYSDK(app_key, app_secret) {
//                 this.debug = true;
//                 this._lib_version = "v1.05";
//                 this._protocol = "http";
//                 this._hosts = ["api3.paojiaoyun.com", "api2.paojiaoyun.com", "api.paojiaoyun.com"];
//                 this._host = this._hosts[0];
//                 this._device_id = this.getDeviceID();
//                 this._retry_count = 9;
//                 this._switch_count = 0;
//                 this._default_timeout = 5 * 1000;
//
//                 this._app_key = app_key;
//                 this._app_secret = app_secret;
//
//                 this._card = null;
//                 this._username = null;
//                 this._password = null;
//                 this._token = null;
//
//                 this.is_trial = false;  // 是否是试用用户
//                 this.login_result = {
//                     "card_type": "",
//                     "expires": "",
//                     "expires_ts": 0,
//                     "config": "",
//                 };
//
//                 this._auto_heartbeat = true;  // 是否自动开启心跳任务
//                 this._heartbeat_gap = 120 * 1000; // 默认120秒
//                 this._heartbeat_task = null;
//                 this._check_time_remaining_task = null;
//                 this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
//
//                 this._prev_nonce = null;
//                 this._is_ping = false;
//                 this._onHeartbeatFailed = function (ret) {
//                     logd("心跳失败 -> code: " + ret.code + " message: " + ret.message);
//                 }
//             }
//
//             PJYSDK.prototype.SetBackupHosts = function (hosts) { // 设置备用 api host
//                 this._hosts.concat(hosts);
//             }
//             PJYSDK.prototype.switchHost = function () { // 切换备用 api host
//                 this._switch_count++;
//                 this._host = this._hosts[this._switch_count % this._hosts.length];
//             }
//             PJYSDK.prototype.onHeartbeatFailed = function (callback) {
//                 this._onHeartbeatFailed = callback
//             }
//             PJYSDK.prototype.SetCard = function (card) {
//                 this._card = card.trim();
//             }
//             PJYSDK.prototype.SetUser = function (username, password) {
//                 this._username = username.trim();
//                 this._password = password;
//             }
//             PJYSDK.prototype.getDeviceID = function () {
//                 let id = device.getSerial();
//                 if (id == null || id === "" || id === "unknown") {
//                     id = device.getAndroidId();
//                 }
//                 if (id == null || id === "" || id === "unknown") {
//                     id = device.getIMEI();
//                 }
//                 return id;
//             }
//             PJYSDK.prototype.MD5 = function (str) {
//                 return utils.dataMd5(str);
//             }
//             PJYSDK.prototype.getTimestamp = function () {
//                 try {
//                     let res = this.httpGet("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
//                     let data = JSON.parse(res);
//                     return Math.floor(data["data"]["t"] / 1000) - 3;
//                 } catch (error) {
//                     try {
//                         let res = this.httpGet("https://tptm.hd.mi.com/gettimestamp");
//                         let data = JSON.parse(res);
//                         return parseInt(data.replace('var servertime=', '')) - 3;
//                     } catch (error) {
//                         return Math.floor(new Date().getTime() / 1000) - 3;
//                     }
//                 }
//             }
//             PJYSDK.prototype._draw_cc_params = function (body) {
//                 if (!body) return "";
//                 start = body.indexOf('?');
//                 if (start < 0) return "";
//                 end = body.indexOf('";');
//                 if (end < 0 || end < start) return "";
//                 return body.substring(start, end);
//             }
//             PJYSDK.prototype.Ping = function () {
//                 if (this._is_ping) return;
//                 try {
//                     let path = "/v1/ping"
//                     let url = this._protocol + "://" + this._host + path;
//                     let resp = http.get(url);
//                     let body = resp.body.string();
//                     if (body == "Pong") {
//                         log("api连接成功")
//                         this._is_ping = true;
//                         return
//                     }
//                     let params = this._draw_cc_params(body);
//                     if (params) {
//                         let resp2 = http.get(url + params);
//                         if (resp2.body.string() == "Pong") {
//                             log("api连接成功")
//                             this._is_ping = true;
//                         }
//                     } else {
//                         this.switchHost();
//                     }
//                 } catch (error) {
//                     this.switchHost();
//                 }
//             }
//             PJYSDK.prototype.genNonce = function () {
//                 const ascii_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//                 let tmp = '';
//                 for (let i = 0; i < 20; i++) {
//                     tmp += ascii_str.charAt(Math.round(Math.random() * ascii_str.length));
//                 }
//                 return this.MD5(this.getDeviceID() + this._prev_nonce + new Date().getTime() + tmp);
//             }
//             PJYSDK.prototype.joinParams = function (params) {
//                 let ps = [];
//                 for (let k in params) {
//                     ps.push(k + "=" + params[k])
//                 }
//                 ps.sort();
//                 return ps.join("&")
//             }
//             PJYSDK.prototype.CheckRespSign = function (resp) {
//                 if (resp.code !== 0 && resp.nonce === "" && resp.sign === "") {
//                     return resp
//                 }
//
//                 let ps = "";
//                 if (resp["result"]) {
//                     ps = this.joinParams(resp["result"]);
//                 }
//
//                 let s = resp["code"] + resp["message"] + ps + resp["nonce"] + this._app_secret;
//                 let sign = this.MD5(s);
//                 if (sign === resp["sign"]) {
//                     if (this._prev_nonce === null) {
//                         this._prev_nonce = resp["nonce"];
//                         return {"code": 0, "message": "OK"};
//                     } else {
//                         if (resp["nonce"] > this._prev_nonce) {
//                             this._prev_nonce = resp["nonce"];
//                             return {"code": 0, "message": "OK"};
//                         } else {
//                             return {"code": -98, "message": "CRS:nonce校验失败"};
//                         }
//                     }
//                 }
//                 return {"code": -99, "message": "CRS:签名校验失败"};
//             }
//             PJYSDK.prototype.retry_fib = function (num) {
//                 if (num > 9) {
//                     return 34
//                 }
//                 let a = 0;
//                 let b = 1;
//                 for (let i = 0; i < num; i++) {
//                     let tmp = a + b;
//                     a = b;
//                     b = tmp;
//                 }
//                 return a
//             }
//             PJYSDK.prototype._debug = function (path, params, result) {
//                 if (this.debug) {
//                     logd("\n" + path + "\nparams:" + JSON.stringify(params, null, "    ") + "\nresult:" + JSON.stringify(result, null, "    "));
//                 }
//             }
//             PJYSDK.prototype.httpGet = function (path) {
//                 let param = {
//                     "url": path,
//                     "method": "GET",
//                     "userAgent": "EasyClick",
//                     "ignoreHttpErrors": true,
//                     "timeout": this._default_timeout,
//                 };
//                 return http.request(param).body;
//             }
//             PJYSDK.prototype.httpPost = function (path, data) {
//                 let param = {
//                     "url": path,
//                     "method": "POST",
//                     "userAgent": "EasyClick",
//                     "ignoreHttpErrors": true,
//                     "timeout": this._default_timeout,
//                     "data": data,
//                 };
//                 return http.request(param).body;
//             }
//             PJYSDK.prototype.Request = function (method, path, params) {
//                 this.Ping();
//                 // 构建公共参数
//                 params["app_key"] = this._app_key;
//
//                 method = method.toUpperCase();
//                 let max_retries = this._retry_count;
//                 let retries_count = 0;
//
//                 let data = {"code": -1, "message": "连接服务器失败"};
//                 do {
//                     let url = this._protocol + "://" + this._host + path;
//                     retries_count++;
//                     let sec = this.retry_fib(retries_count);
//
//                     delete params["sign"];
//                     params["nonce"] = this.genNonce();
//                     params["timestamp"] = this.getTimestamp();
//                     let ps = this.joinParams(params);
//                     let s = method + this._host + path + ps + this._app_secret;
//                     let sign = this.MD5(s);
//                     params["sign"] = sign;
//
//                     let resp;
//                     try {
//                         if (method === "GET") {
//                             resp = this.httpGet(url + "?" + ps + "&sign=" + sign);
//                         } else {  // POST
//                             resp = this.httpPost(url, params);
//                         }
//                         data = JSON.parse(resp);
//                         this._debug(method + '-' + path + ':', params, data);
//
//                         let crs = this.CheckRespSign(data);
//                         if (crs.code !== 0) {
//                             return crs;
//                         } else {
//                             return data;
//                         }
//                     } catch (error) {
//                         if (this._debug) {
//                             logd("[*] request error: ", error, sec + "s后重试");
//                         }
//                         this._debug(method + '-' + path + ':', params, resp);
//                         this.switchHost();
//                         sleep(sec * 1000);
//                     }
//                 } while (retries_count < max_retries);
//
//                 return data;
//             }
//             /* 通用 */
//             PJYSDK.prototype.GetHeartbeatResult = function () {
//                 return this._heartbeat_ret;
//             }
//             PJYSDK.prototype.GetTimeRemaining = function () {
//                 let g = this.login_result.expires_ts - this.getTimestamp();
//                 if (g < 0) {
//                     return 0;
//                 }
//                 return g;
//             }
//             PJYSDK.prototype._clearTask = function () {
//                 if (this._heartbeat_task !== null) {
//                     thread.cancelThread(this._heartbeat_task);
//                     this._heartbeat_task = null;
//                 }
//                 if (this._check_time_remaining_task !== null) {
//                     thread.cancelThread(this._check_time_remaining_task);
//                     this._check_time_remaining_task = null;
//                 }
//                 this._prev_nonce = null;
//             }
//             /* 卡密相关 */
//             PJYSDK.prototype.CardLogin = function () {  // 卡密登录
//                 if (!this._card) {
//                     return {"code": -4, "message": "请先设置卡密"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/card/login";
//                 let data = {"card": this._card, "device_id": this._device_id};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this._token = ret.result.token;
//                     this.login_result = ret.result;
//                     if (this._auto_heartbeat) {
//                         this._startCardHeartbeat();
//                     }
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype.CardHeartbeat = function () {  // 卡密心跳，默认会自动调用
//                 if (!this._token) {
//                     return {"code": -2, "message": "请在卡密登录成功后调用"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/card/heartbeat";
//                 let data = {"card": this._card, "token": this._token};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this.login_result.expires = ret.result.expires;
//                     this.login_result.expires_ts = ret.result.expires_ts;
//                 } else {
//                     this._onHeartbeatFailed(ret);
//                     this._clearTask();
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype._startCardHeartbeat = function () {  // 开启卡密心跳任务
//                 this._clearTask();
//                 let self = this;
//                 self._heartbeat_ret = self.CardHeartbeat();
//
//                 this._heartbeat_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         self._heartbeat_ret = self.CardHeartbeat();
//                         sleep(self._heartbeat_gap);
//                     }
//                 });
//                 this._check_time_remaining_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         if (self.GetTimeRemaining() === 0) {
//                             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
//                         }
//                         sleep(5000);
//                     }
//                 });
//
//                 /* let hbTask = function() {
//                     self._heartbeat_ret = self.CardHeartbeat();
//                 };
//                 this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
//                 let checkTimeRemaining = function() {
//                     if (self.GetTimeRemaining() === 0) {
//                         self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
//                     }
//                 };
//                 this._check_time_remaining_task = setInterval(checkTimeRemaining, 5000); */
//             }
//             PJYSDK.prototype.CardLogout = function () {  // 卡密退出登录
//                 this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
//                 this._clearTask(); // 结束心跳任务
//                 if (!this._token) {
//                     return {"code": 0, "message": "OK"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/card/logout";
//                 let data = {"card": this._card, "token": this._token};
//                 let ret = this.Request(method, path, data);
//                 // 清理
//                 this._token = null;
//                 this.login_result = {
//                     "card_type": "",
//                     "expires": "",
//                     "expires_ts": 0,
//                     "config": "",
//                 };
//                 return ret;
//             }
//             PJYSDK.prototype.CardUnbindDevice = function () { // 卡密解绑设备，需开发者后台配置
//                 if (!this._token) {
//                     return {"code": -2, "message": "请在卡密登录成功后调用"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/card/unbind_device";
//                 let data = {"card": this._card, "device_id": this._device_id, "token": this._token};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.SetCardUnbindPassword = function (password) { // 自定义设置解绑密码
//                 if (!this._token) {
//                     return {"code": -2, "message": "请在卡密登录成功后调用"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/card/unbind_password";
//                 let data = {"card": this._card, "password": password, "token": this._token};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.CardUnbindDeviceByPassword = function (password) { // 用户通过解绑密码解绑设备
//                 let method = "POST";
//                 let path = "/v1/card/unbind_device/by_password";
//                 let data = {"card": this._card, "password": password};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.CardRecharge = function (card, use_card) { // 以卡充卡
//                 let method = "POST";
//                 let path = "/v1/card/recharge";
//                 let data = {"card": card, "use_card": use_card};
//                 return this.Request(method, path, data);
//             }
//             /* 用户相关 */
//             PJYSDK.prototype.UserRegister = function (username, password, card) {  // 用户注册（通过卡密）
//                 let method = "POST";
//                 let path = "/v1/user/register";
//                 let data = {"username": username, "password": password, "card": card, "device_id": this._device_id};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UserLogin = function () {  // 用户账号登录
//                 if (!this._username || !this._password) {
//                     return {"code": -4, "message": "请先设置用户账号密码"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/user/login";
//                 let data = {"username": this._username, "password": this._password, "device_id": this._device_id};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this._token = ret.result.token;
//                     this.login_result = ret.result;
//                     if (this._auto_heartbeat) {
//                         this._startUserHeartbeat();
//                     }
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype.UserHeartbeat = function () {  // 用户心跳，默认会自动开启
//                 if (!this._token) {
//                     return {"code": -2, "message": "请在用户登录成功后调用"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/user/heartbeat";
//                 let data = {"username": this._username, "token": this._token};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this.login_result.expires = ret.result.expires;
//                     this.login_result.expires_ts = ret.result.expires_ts;
//                 } else {
//                     this._onHeartbeatFailed(ret);
//                     this._clearTask();
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype._startUserHeartbeat = function () {  // 开启用户心跳任务
//                 this._clearTask();
//                 let self = this;
//                 self._heartbeat_ret = self.UserHeartbeat();
//
//                 this._heartbeat_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         self._heartbeat_ret = self.UserHeartbeat();
//                         sleep(self._heartbeat_gap);
//                     }
//                 });
//                 this._check_time_remaining_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         if (self.GetTimeRemaining() === 0) {
//                             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
//                         }
//                         sleep(5000);
//                     }
//                 });
//
//                 /* let hbTask = function() {
//                     self._heartbeat_ret = self.UserHeartbeat();
//                 };
//                 this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
//                 let checkTimeRemaining = function() {
//                     if (self.GetTimeRemaining() === 0) {
//                         self._onHeartbeatFailed({"code": 10250, "message": "用户已到期！"});
//                     }
//                 };
//                 this._check_time_remaining_task = setInterval(checkTimeRemaining, 1000); */
//             }
//             PJYSDK.prototype.UserLogout = function () {  // 用户退出登录
//                 this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
//                 this._clearTask(); // 结束心跳任务
//                 if (!this._token) {
//                     return {"code": 0, "message": "OK"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/user/logout";
//                 let data = {"username": this._username, "token": this._token};
//                 let ret = this.Request(method, path, data);
//                 // 清理
//                 this._token = null;
//                 this.login_result = {
//                     "card_type": "",
//                     "expires": "",
//                     "expires_ts": 0,
//                     "config": "",
//                 };
//                 return ret;
//             }
//             PJYSDK.prototype.UserChangePassword = function (username, password, new_password) {  // 用户修改密码
//                 let method = "POST";
//                 let path = "/v1/user/password";
//                 let data = {"username": username, "password": password, "new_password": new_password};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UserRecharge = function (username, card) { // 用户通过卡密充值
//                 let method = "POST";
//                 let path = "/v1/user/recharge";
//                 let data = {"username": username, "card": card};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UserUnbindDevice = function () { // 用户解绑设备，需开发者后台配置
//                 if (!this._token) {
//                     return {"code": -2, "message": "请在用户登录成功后调用"};
//                 }
//                 let method = "POST";
//                 let path = "/v1/user/unbind_device";
//                 let data = {"username": this._username, "device_id": this._device_id, "token": this._token};
//                 return this.Request(method, path, data);
//             }
//             /* 配置相关 */
//             PJYSDK.prototype.GetCardConfig = function () { // 获取卡密配置
//                 let method = "GET";
//                 let path = "/v1/card/config";
//                 let data = {"card": this._card};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UpdateCardConfig = function (config) { // 更新卡密配置
//                 let method = "POST";
//                 let path = "/v1/card/config";
//                 let data = {"card": this._card, "config": config};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.GetUserConfig = function () { // 获取用户配置
//                 let method = "GET";
//                 let path = "/v1/user/config";
//                 let data = {"user": this._username};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UpdateUserConfig = function (config) { // 更新用户配置
//                 let method = "POST";
//                 let path = "/v1/user/config";
//                 let data = {"username": this._username, "config": config};
//                 return this.Request(method, path, data);
//             }
//             /* 软件相关 */
//             PJYSDK.prototype.GetSoftwareConfig = function () { // 获取软件配置
//                 let method = "GET";
//                 let path = "/v1/software/config";
//                 return this.Request(method, path, {});
//             }
//             PJYSDK.prototype.GetSoftwareNotice = function () { // 获取软件通知
//                 let method = "GET";
//                 let path = "/v1/software/notice";
//                 return this.Request(method, path, {});
//             }
//             PJYSDK.prototype.GetSoftwareLatestVersion = function (current_ver) { // 获取软件最新版本
//                 let method = "GET";
//                 let path = "/v1/software/latest_ver";
//                 let data = {"version": current_ver};
//                 return this.Request(method, path, data);
//             }
//             /* 试用功能 */
//             PJYSDK.prototype.TrialLogin = function () {  // 试用登录
//                 let method = "POST";
//                 let path = "/v1/trial/login";
//                 let data = {"device_id": this._device_id};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this.is_trial = true;
//                     this.login_result = ret.result;
//                     if (this._auto_heartbeat) {
//                         this._startTrialHeartbeat();
//                     }
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype.TrialHeartbeat = function () {  // 试用心跳，默认会自动调用
//                 let method = "POST";
//                 let path = "/v1/trial/heartbeat";
//                 let data = {"device_id": this._device_id};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0) {
//                     this.login_result.expires = ret.result.expires;
//                     this.login_result.expires_ts = ret.result.expires_ts;
//                 } else {
//                     this._onHeartbeatFailed(ret);
//                     this._clearTask();
//                 }
//                 return ret;
//             }
//             PJYSDK.prototype._startTrialHeartbeat = function () {  // 开启试用心跳任务
//                 this._clearTask();
//                 let self = this;
//                 self._heartbeat_ret = self.TrialHeartbeat();
//
//                 this._heartbeat_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         self._heartbeat_ret = self.TrialHeartbeat();
//                         sleep(self._heartbeat_gap);
//                     }
//                 });
//                 this._check_time_remaining_task = thread.execAsync(function () {
//                     while (self._heartbeat_ret.code === 0) {
//                         if (self.GetTimeRemaining() === 0) {
//                             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
//                         }
//                         sleep(5000);
//                     }
//                 });
//
//                 /* let hbTask = function() {
//                     self._heartbeat_ret = self.TrialHeartbeat();
//                 };
//                 this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
//                 let checkTimeRemaining = function() {
//                     if (self.GetTimeRemaining() === 0) {
//                         self._onHeartbeatFailed({"code": 10406, "message": "试用已到期！"});
//                     }
//                 };
//                 this._check_time_remaining_task = setInterval(checkTimeRemaining, 1000); */
//             }
//             PJYSDK.prototype.TrialLogout = function () {  // 试用退出登录，没有http请求，只是清理本地记录
//                 this.is_trial = false;
//                 this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
//                 this._clearTask(); // 结束心跳任务
//                 // 清理
//                 this._token = null;
//                 this.login_result = {
//                     "card_type": "",
//                     "expires": "",
//                     "expires_ts": 0,
//                     "config": "",
//                 };
//                 return {"code": 0, "message": "OK"};
//                 ;
//             }
//             /* 高级功能 */
//             PJYSDK.prototype.GetRemoteVar = function (key) { // 获取远程变量
//                 let method = "GET";
//                 let path = "/v1/af/remote_var";
//                 let data = {"key": key};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.GetRemoteData = function (key) { // 获取远程数据
//                 let method = "GET";
//                 let path = "/v1/af/remote_data";
//                 let data = {"key": key};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.CreateRemoteData = function (key, value) { // 创建远程数据
//                 let method = "POST";
//                 let path = "/v1/af/remote_data";
//                 let data = {"action": "create", "key": key, "value": value};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.UpdateRemoteData = function (key, value) { // 修改远程数据
//                 let method = "POST";
//                 let path = "/v1/af/remote_data";
//                 let data = {"action": "update", "key": key, "value": value};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.DeleteRemoteData = function (key, value) { // 删除远程数据
//                 let method = "POST";
//                 let path = "/v1/af/remote_data";
//                 let data = {"action": "delete", "key": key};
//                 return this.Request(method, path, data);
//             }
//             PJYSDK.prototype.CallRemoteFunc = function (func_name, params) { // 执行远程函数
//                 let method = "POST";
//                 let path = "/v1/af/call_remote_func";
//                 let ps = JSON.stringify(params);
//                 let data = {"func_name": func_name, "params": ps};
//                 let ret = this.Request(method, path, data);
//                 if (ret.code === 0 && ret.result.return) {
//                     ret.result = JSON.parse(ret.result.return);
//                 }
//                 return ret;
//             }
//             return PJYSDK;
//         })();
//
// // AppKey 和 AppSecret 在泡椒云开发者后台获取
//         let pjysdk = new PJYSDK("cem3sebdqusush5t2540", "XHcLzzZp6sZ9U7PZr6ReBMcAQknSpHE4");
//         let 激活码 = readConfigString("激活码")
//         logd('激活码:' + 激活码)
//         pjysdk.debug = false;
//         pjysdk.SetCard(激活码);
//
// // 心跳失败回调
//         pjysdk.onHeartbeatFailed(function (hret) {
//             logd(hret.message);
//             if (hret.code === 10214) {
//                 sleep(200);
//                 退出脚本()
//                 // setTimeout(exit(), 100); // 退出脚本
//                 return;
//             }
//             logd("心跳失败，2s后尝试重登...");
//             sleep(2000);
//             let login_ret = pjysdk.CardLogin();
//             if (login_ret.code === 0) {
//                 logd("重登成功");
//             } else {
//                 logd(login_ret.message);  // 重登失败
//                 sleep(200);
//                 退出脚本()
//                 // setTimeout(exit(), 100); // 退出脚本
//             }
//         });
//
// // 监听正常退出和异常退出执行退出登录操作
//         setStopCallback(function () {
//             pjysdk.CardLogout(); // 调用退出登录
//             logd("结束运行");
//         });
//         setExceptionCallback(function (msg) {
//             pjysdk.CardLogout(); // 调用退出登录
//             logd(" 异常停止消息: " + msg);
//         });
//
//
//         let login_ret = pjysdk.CardLogin();
//         if (login_ret.code !== 0) {
//             // 登录失败提示
//             toast(login_ret.message);
//             storage.putString("登录成功", 'false');
//             退出脚本()
//             // setTimeout(exit(), 100); // 退出脚本
//             return null;
//         }
//         // 登录成功，后面写你的业务代码
//
//         storage.putString("登录成功", 'true');
//
//         logd(JSON.stringify(pjysdk.login_result, null, "    "));
//
//         写入存储激活码剩余时间()
//
//         return true
//
//         //  泡椒云登录成功以后才能调用
//         function 写入存储激活码剩余时间() {
//             let ret = pjysdk.GetTimeRemaining() * 1
//             let num = ret / 60 / 60 / 24
//             num = num.toFixed(2)    //取小数点后两位,比如359.96
//             num = num.split('.')
//             let 整数部分 = num[0]
//             let 小数部分 = '0.' + num[1]
//             小数部分 = 小数部分 * 24
//             小数部分 = 小数部分.toFixed(2)    //取小数点后两位,比如359.96
//             let 显示时间 = 整数部分 + '天' + 小数部分 + '小时'
//             logd('剩余时间(秒):' + ret) // 调试的时候方便看时间有没有变动 剩余时间(秒):31103374
//             logd('剩余时间:' + 显示时间) // 剩余时间:359天23.76小时
//
//             let 卡密配置 = pjysdk.login_result.config
//             //logdo('卡密配置:' + 卡密配置)
//             if (卡密配置.indexOf('显示时间', 0) != -1) {
//                 //logdo('找到字符串:' + '显示时间')
//                 激活码时间 = 显示时间 + ''
//             } else {
//                 //logdo('没找到字符串:' + '显示时间')
//                 激活码时间 = 获取设备id() + ''
//             }
//             storage.putString("激活码时间", 激活码时间);
//         }
//
//         //window.open('gnxz.html','_self')
//
//         // 测试用，hold住主线程不要退出，记得删除，后面应该是你的代码了
//         // while (true) {
//         //     // let ret = pjysdk.GetHeartbeatResult();
//         //     // logd("心跳结果： " + ret.code + " " + ret.message);
//         //     // // toast(ret.code + " " + ret.message);
//         //     // sleep(2000);
//         //     写入存储激活码剩余时间()
//         //     sleep(5000);
//         // }
//
//     });
//
//
// }
//
// function 获取设备id() {
//     let id = device.getSerial();
//     if (id == null || id === "" || id === "unknown") {
//         id = device.getAndroidId();
//     }
//     if (id == null || id === "" || id === "unknown") {
//         id = device.getIMEI();
//     }
//     return id;
// }
//
// function 退出脚本() {
//     thread.stopAll();//取消所有正在运行的线程
//     exit();//退出脚本
//     ui.stopTask();//停止脚本
// }
//
// // main();
//
// module.exports = main();