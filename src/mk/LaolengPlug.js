/**
 * @author 老冷编程学院:http://bbs.laoleng.vip,报名vip课程688元
 * @constructor 20230215
 */
const _docVersion = "1.4.0"

function PlugReceiver() {
}

(function () {
    //1.手动放apk,比如/sdcard/laoleng.apk
    //2.做一个http请求下载,把laoleng.apk放oss里,并下载下来
    // http.downloadFileDefault("http://www.oss地址.com", "/sdcard/laoleng.apk")
    //3.提前做一个判断,apk不存在,则下载
    // if (!file.exists("/sdcard/laoleng.apk")) {
    //     // http.downloadFileDefault("http://www.oss地址.com", "/sdcard/laoleng.apk")
    // }
    let r = loadDex("laoleng.apk")
    if (r) {
        logw("java插件加载成功")
        PlugReceiver.app = new com.laoleng.App(context)
        // PlugReceiver.contact = new com.laoleng.ContactUtils(context)
        PlugReceiver.device = new com.laoleng.Device(context)
        PlugReceiver.email = new com.laoleng.EmailUtils()
        PlugReceiver.encode = new com.laoleng.Encode()
        PlugReceiver.excel = new com.laoleng.ExcelUtils()
        PlugReceiver.file = new com.laoleng.Files()
        PlugReceiver.ftp = new com.laoleng.FTPManager()
        PlugReceiver.http = new com.laoleng.HttpManager()
        PlugReceiver.img = new com.laoleng.Images()
        PlugReceiver.mail = new com.laoleng.MailUtils()
        PlugReceiver.media = new com.laoleng.Medias(context)
        PlugReceiver.permit = new com.laoleng.Permit(context)
        PlugReceiver.plugin = new com.laoleng.Plugin()
        PlugReceiver.rootCmd = new com.laoleng.RootCmd()
        PlugReceiver.smb = new com.laoleng.SMB()
        PlugReceiver.util = new com.laoleng.Utils(context)
        let plugVersion = PlugReceiver.plugin.getPlugVersion() + ""
        logw("当前插件版本:" + plugVersion)
        if (plugVersion !== _docVersion) loge("注意!!!LaolengPlug.js版本{}与laoleng.apk版本{}不符,如遇报错\n" +
            "到" +
            "获取最新版替换", _docVersion, plugVersion)
    } else {
        loge("插件加载失败")
        toast("插件加载失败")
        exit()
    }
})()

/**
 * @description 判断数据类型
 * @param arg{any}
 * @return {string|null|undefined}
 */
function typeOf(arg) {
    if (arg === null) return null
    if (arg === undefined) return undefined
    return arg.constructor.name
}

/**
 * @description 判断数组是否不为空
 * @param arr {Array} 数组
 * @return {boolean}
 */
function isNotEmptyArray(arr) {
    if (!arr) return false
    return arr.length !== 0
}

function LaolengPlug() {
    this.app = new App()
    // this.contact = new Contact()
    this.device = new Device()
    this.email = new EmailUtils()
    this.encode = new Encode()
    this.excel = new ExcelUtils()
    this.file = new Files()
    this.ftp = new FTP()
    this.http = new Http()
    // this.intent = new Intent()
    this.img = new Images()
    this.mail = new Mails()
    this.media = new Medias()
    this.permit = new Permit()
    this.plugin = new Plugin()
    this.root = new Root()
    this.smb = new SMB()
    this.util = new Utils()
}

const ll = new LaolengPlug()

function App() {
}


// function Intent() {
//
// }
//
// Intent.prototype.intent = function (i) {
//     let intent = new android.content.Intent();
//     if (i.className && i.packageName) {
//         intent.setClassName(i.packageName, i.className);
//     }
//     if (i.extras) {
//         for (let key in i.extras) {
//             intent.putExtra(key, i.extras[key]);
//         }
//     }
//     if (i.category) {
//         if (i.category instanceof Array) {
//             for (var j = 0; i < i.category.length; j++) {
//                 intent.addCategory(i.category[j]);
//             }
//         } else {
//             intent.addCategory(i.category);
//         }
//     }
//     if (i.action) {
//         if (i.action.indexOf(".") === -1) {
//             i.action = "android.intent.action." + i.action;
//         }
//         intent.setAction(i.action);
//     }
//     if (i.type) {
//         if (i.data) {
//             intent.setDataAndType(android.net.Uri.parse(i.data), i.type);
//         } else {
//             intent.setType(i.type);
//         }
//     } else if (i.data) {
//         intent.setData(android.net.Uri.parse(i.data));
//     }
//     return intent;
// }


/**
 * @description 通过包名启动app
 * @param{string} packageName 包名
 * @return {boolean} true/false
 */
App.prototype.launchPackage = function (packageName) {
    return PlugReceiver.app.launchPackage(packageName)
}

/**
 * @description 通过应用名启动app
 * @param {string} appName 应用名
 * @return {boolean} true/false
 */
App.prototype.launchApp = function (appName) {
    return PlugReceiver.app.launchApp(appName)
}

/**
 * @description 通过应用名获取包名
 * @param {string?} appName 应用名
 * @return {string} 包名
 */
App.prototype.getPackageName = function (appName) {
    if (appName) {
        return PlugReceiver.app.getPackageName(appName) + ""
    }
    return PlugReceiver.app.getPackageName() + ""
}
/**
 * @description 通过包名获取应用名
 * @param {string?} packageName 包名
 * @return {string} 应用名
 */
App.prototype.getAppName = function (packageName) {
    if (packageName) {
        return PlugReceiver.app.getAppName(packageName) + ""
    }
    return PlugReceiver.app.getAppName() + ""
}

/**
 * @description 通过包名卸载应用
 * @param{string} packageName 包名
 * @return {boolean} true/false
 */
App.prototype.uninstall = function (packageName) {
    return PlugReceiver.app.uninstall(packageName)
}

/**
 * @description 通过包名打开应用设置页
 * @param {string} packageName 包名
 * @return {boolean} true/false
 */
App.prototype.openAppSetting = function (packageName) {
    return PlugReceiver.app.openAppSetting(packageName)
}
/**
 * @description 获取EC的文件路径
 * @return {string} EC的文件路径
 */
App.prototype.getECFilePath = function () {
    return PlugReceiver.app.getECFilePath() + ""
}
/**
 * @description 通过包名获取app路径
 * @param {string} packageName 包名
 * @return {string} app路径
 */
App.prototype.getAppDataPath = function (packageName) {
    return PlugReceiver.app.getAppDataPath(packageName) + ""
}
/**
 * @description 通过应用名获取app路径
 * @param{string} appName 应用名
 * @return {string} app路径
 */
App.prototype.getAppDataPathByName = function (appName) {
    return PlugReceiver.app.getAppDataPathByName(appName) + ""
}
/**
 * @description 通过默认浏览器打开网址
 * @param url 网址
 */
App.prototype.openUrl = function (url) {
    return PlugReceiver.app.openUrl(url)
}
/**
 * @description 获取已安装的三方应用包名
 * @return {null|string[]} 已安装的三方应用包名
 */
App.prototype.getInstalledPkgName = function () {
    let pkgNameList = PlugReceiver.app.getInstalledPkgName()
    let tmp_pkgNameList = []
    for (let i = 0; i < pkgNameList.length; i++) {
        tmp_pkgNameList.push(pkgNameList[i] + "")
    }
    if (tmp_pkgNameList.length === 0) return null
    return tmp_pkgNameList
}
/**
 * @description 获取已安装的三方应用名
 * @return {null|string[]} 已安装的三方应用名
 */
App.prototype.getInstalledAppName = function () {
    let appNameList = PlugReceiver.app.getInstalledAppName()
    let tmp_appNameList = []
    for (let i = 0; i < appNameList.length; i++) {
        tmp_appNameList.push(appNameList[i] + "")
    }
    if (tmp_appNameList.length === 0) return null
    return tmp_appNameList
}
/**
 * @description 获取APP的UID
 * @param pkgName {string} 包名
 * @return {number} APP的UID,-1表示未安装
 */
App.prototype.getPackageUid = function (pkgName) {
    return PlugReceiver.app.getPackageUid(pkgName)
}
/**
 * @description app是否在运行
 * @param pkgName {string} 包名
 * @return {boolean} true/false
 */
App.prototype.isPackageRunning = function (pkgName) {
    return PlugReceiver.app.isPackageRunning(pkgName)
}
/**
 * @description 提取apk安装包
 * @param path {string} 提取到路径
 * @param pkgName {string} apk包名
 * @return {boolean} true/false
 */
App.prototype.extractApk = function (path, pkgName) {
    return PlugReceiver.app.extractApk(path, pkgName)
}
/**
 * @description 获取apk源目录
 * @param pkgName {string} apk包名
 * @return {string}
 */
App.prototype.getApksourceDir = function (pkgName) {
    return PlugReceiver.app.getApksourceDir(pkgName) + ""
}
/**
 * @description 获取apk图标bitmap
 * @param pkgName {string} apk包名
 * @return {ImageBitmap}  图标bitmap
 */
App.prototype.getBitmap = function (pkgName) {
    return PlugReceiver.app.getBitmap(pkgName)
}
App.prototype.getAssetsFiles = function () {
    return PlugReceiver.app.getAssetsFiles()
}


function Device() {

}

/**
 * @description 获取当前的(手动)亮度。
 * @return {number} 范围为0~255
 */
Device.prototype.getBrightness = function () {
    return PlugReceiver.device.getBrightness()
}
/**
 * @description 获取当前的亮度模式
 * @return {number} 0为手动亮度，1为自动亮度。
 */
Device.prototype.getBrightnessMode = function () {
    return PlugReceiver.device.getBrightnessMode()
}

/**
 * @description 设置当前手动亮度。如果当前是自动亮度模式，该函数不会影响屏幕的亮度。
 * @param {number} b  亮度，范围0~255

 */
Device.prototype.setBrightness = function (b) {
    return PlugReceiver.device.setBrightness(b)
}

/**
 * @description 设置当前亮度模式
 * @param {number} mode   亮度模式，0为手动亮度，1为自动亮度

 */
Device.prototype.setBrightnessMode = function (mode) {
    return PlugReceiver.device.setBrightnessMode(mode)
}
/**
 * @description 获取当前媒体音量
 * @return {number} 整数值
 */
Device.prototype.getMusicVolume = function () {
    return PlugReceiver.device.getMusicVolume()
}

/**
 * @description 获取当前通知音量
 * @return {number} 整数值
 */
Device.prototype.getNotificationVolume = function () {
    return PlugReceiver.device.getNotificationVolume()
}
/**
 * @description 获取当前闹钟音量
 * @return {number} 整数值
 */
Device.prototype.getAlarmVolume = function () {
    return PlugReceiver.device.getAlarmVolume()
}
/**
 * @description 获取媒体音量的最大值。
 * @return {number} 整数值
 */
Device.prototype.getMusicMaxVolume = function () {
    return PlugReceiver.device.getMusicMaxVolume()
}

/**
 * @description 获取当前通知音量的最大值
 * @return {number} 整数值
 */
Device.prototype.getNotificationMaxVolume = function () {
    return PlugReceiver.device.getNotificationMaxVolume()
}
/**
 * @description 获取当前闹钟音量的最大值
 * @return {number} 整数值
 */
Device.prototype.getAlarmMaxVolume = function () {
    return PlugReceiver.device.getAlarmMaxVolume()
}
/**
 * @description 设置当前媒体音量
 * @param {number} volume   音量
 */
Device.prototype.setMusicVolume = function (volume) {
    return PlugReceiver.device.setMusicVolume(volume)
}
/**
 * @description 设置当前通知音量
 * @param {number} volume   音量
 */
Device.prototype.setNotificationVolume = function (volume) {
    return PlugReceiver.device.setNotificationVolume(volume)
}
/**
 * @description 设置当前闹钟音量
 * @param {number} volume   音量

 */
Device.prototype.setAlarmVolume = function (volume) {
    return PlugReceiver.device.setAlarmVolume(volume)
}

/**
 * @description 获取当前电量百分比
 * @return {number} 0.0~100.0的浮点数
 */
Device.prototype.getBattery = function () {
    return PlugReceiver.device.getBattery()
}
/**
 * @description 设备是否正在充电
 * @return {boolean} true/false
 */
Device.prototype.isCharging = function () {
    return PlugReceiver.device.isCharging()
}
/**
 * @description 获取设备内存总量，单位字节(B)
 * @return {number} 整数值
 */
Device.prototype.getTotalMem = function () {
    return PlugReceiver.device.getTotalMem()
}
/**
 * @description 获取设备当前可用的内存，单位字节(B)
 * @return {number} 整数值
 */
Device.prototype.getAvailMem = function () {
    return PlugReceiver.device.getAvailMem()
}

/**
 * @description 设备屏幕是否是亮着的
 * @return {boolean} true/false
 */
Device.prototype.isScreenOn = function () {
    return PlugReceiver.device.isScreenOn()
}
/**
 * @description 设备是否锁定
 * @return {boolean} true/false
 */
Device.prototype.isLocked = function () {
    return PlugReceiver.device.isLocked()
}
/**
 * @description 唤醒设备。包括唤醒设备CPU、屏幕等。可以用来点亮屏幕。
 */
Device.prototype.wakeUp = function () {
    return PlugReceiver.device.wakeUp()
}
/**
 * @description 如果屏幕没有点亮，则唤醒设备。
 */
Device.prototype.wakeUpIfNeeded = function () {
    return PlugReceiver.device.wakeUpIfNeeded()
}

/**
 * @description 保持屏幕常亮
 * @param {number} timeout   屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。

 */
Device.prototype.keepScreenOn = function (timeout) {
    if (timeout) {
        return PlugReceiver.device.keepScreenOn(timeout)
    }
    return PlugReceiver.device.keepScreenOn()
}
/**
 * @description 保持屏幕昏暗
 * @param {number} timeout   屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。

 */
Device.prototype.keepScreenDim = function (timeout) {
    return PlugReceiver.device.keepScreenDim(timeout)
}
/**
 * @description 取消设备保持唤醒状态

 */
Device.prototype.cancelKeepingAwake = function () {
    return PlugReceiver.device.cancelKeepingAwake()
}
/**
 * @description 解锁屏幕 不一定成功

 */
Device.prototype.unlockDevice = function () {
    return PlugReceiver.device.unlockDevice()
}
Device.prototype.lockDevice = function () {
    return PlugReceiver.device.lockDevice()
}

/**
 * @description 使设备震动一段时间
 * @param {number} timeout   震动时间，单位毫秒

 */
Device.prototype.vibrate = function (timeout) {
    return PlugReceiver.device.vibrate(timeout)
}
/**
 * @description 取消震动
 */
Device.prototype.cancelVibration = function () {
    return PlugReceiver.device.cancelVibration()
}
/**
 * @description 获取设备mac地址
 * @return {string} mac地址
 */
Device.prototype.getMacAddress = function () {
    return PlugReceiver.device.getMacAddress() + ""
}
/**
 * @description 获取Wifi地址
 * @return {string} Wifi地址
 */
Device.prototype.getWifiAddress = function () {
    return PlugReceiver.device.getWifiAddress() + ""
}
/**
 * @description 获取Wifi名称
 * @return {string} Wifi名称
 */
Device.prototype.getWifiName = function () {
    return PlugReceiver.device.getWifiName() + ""
}


/**
 * @description Wifi开关是否打开
 * @return {boolean} Wifi开关是否打开
 */
Device.prototype.isWifiOpened = function () {
    return PlugReceiver.device.isWifiOpened()
}
/**
 * @description Wifi是否连接成功
 * @return {boolean} Wifi是否连接成功
 */
Device.prototype.isWifiConnected = function () {
    return PlugReceiver.device.isWifiConnected()
}
/**
 * @description 打开wifi
 * @return {boolean} 打开wifi
 */
Device.prototype.openWifi = function () {
    return PlugReceiver.device.openWifi()
}
/**
 * @description 关闭wifi
 * @return {boolean} 关闭wifi
 */
Device.prototype.closeWifi = function () {
    return PlugReceiver.device.closeWifi()
}

/**
 * @description 获取手机卡IccId
 * @return {string} 手机卡IccId
 */
Device.prototype.getIccId = function () {
    return PlugReceiver.device.getIccId() + ""
}
/**
 * @description 获取本机(卡1)手机号
 * @return {string} 手机号
 */
Device.prototype.getPhoneNumber = function () {
    return PlugReceiver.device.getPhoneNumber() + ""
}
/**
 * @description 获取本机DPI
 * @return {number} 本机DPI
 */
Device.prototype.getDPI = function () {
    return PlugReceiver.device.getDPI()
}
/**
 * @description 获取本机getDensity
 * @return {floaty} 本机getDensity
 */
Device.prototype.getDensity = function () {
    return PlugReceiver.device.getDensity()
}
/**
 * @description 获取虚拟按键高度
 * @return {number} 虚拟按键高度
 */
Device.prototype.getNavigationBarHeight = function () {
    return PlugReceiver.device.getNavigationBarHeight()
}
/**
 * @description 获取状态栏高度
 * @return {number} 状态栏高度
 */
Device.prototype.getStatusBarHeight = function () {
    return PlugReceiver.device.getStatusBarHeight()
}

/**
 * @description 获取设备完整信息
 * @return {string} 设备完整信息地址
 */
Device.prototype.toString = function () {
    return PlugReceiver.device.toString() + ""
}
/**
 * @description 获取CPU温度
 * @return {number}获取CPU温度,获取失败返回0
 */
Device.prototype.getCpuTemp = function () {
    return PlugReceiver.device.getCpuTemp()
}
/**
 * @description 获取电池温度
 * @return {number}获取电池温度,获取失败返回0
 */
Device.prototype.getBatteryTemp = function () {
    return PlugReceiver.device.getBatteryTemp()
}
/**
 * @description 获取外置SD卡路径
 * @return {string}外置SD卡路径
 */
Device.prototype.getSDCardPath = function () {
    return PlugReceiver.device.getSDCardPath() + ""
}
/**
 * @description 获取本机IP
 * @return {string} 本机IP
 */
Device.prototype.getIpAddress = function () {
    return PlugReceiver.device.getIpAddress() + ""
}

/**
 * @description 获取内部存储总容量
 * @return {string} 内部存储总容量
 */
Device.prototype.getTotalInternalMemorySize = function () {
    return PlugReceiver.device.getTotalInternalMemorySize() + ""
}
/**
 * @description 获取内部存储剩余容量
 * @return {string} 内部存储剩余容量
 */
Device.prototype.getAvailableInternalMemorySize = function () {
    return PlugReceiver.device.getAvailableInternalMemorySize() + ""
}
Device.prototype.toggleAirplaneMode = function (mode) {
    return PlugReceiver.device.toggleAirplaneMode(mode)
}
/**
 * @description 获取getprop属性
 * @param propName {string} prop属性
 * @return {string} prop属性
 */
Device.prototype.getSystemProperty = function (propName) {
    return PlugReceiver.device.getSystemProperty(propName)
}
/**
 * @description 获取设备经纬度和地址,不支持模拟器
 * @return {json}
 */
Device.prototype.getLocation = function () {
    return PlugReceiver.device.getLocation()
}
/**
 * @description GPS是否打开
 * @return {boolean}
 */
Device.prototype.isGPSOpen = function () {
    return PlugReceiver.device.isGPSOpen()
}


/**
 * @description 获取手机网络类型
 * @return {string} 未联网/wifi/2G/3G/4G/未知移动连网/usb/其他未知网络类型
 */
Device.prototype.getNetworkType = function () {
    let type = PlugReceiver.device.getNetworkType()
    switch (type) {
        case 0:
            return "未联网"
        case 1:
        case 7:
            return "wifi"
        case 2:
            return "2G"
        case 3:
            return "3G"
        case 4:
            return "4G"
        case 5 :
            return "未知移动连网"
        case 6:
            return "usb"
        default:
            return "其他未知网络类型"
    }
}


/**
 * @description 是否是5G网
 * @return  true/false {boolean} 是/否
 */
Device.prototype.is5G = function () {
    return PlugReceiver.device.is5G() === 20
}
/**
 * @description VPN是否打开
 * @return  true/false {boolean} 是/否
 */
Device.prototype.isVPNOpen = function () {
    return PlugReceiver.device.isVPNOpen()
}

/**
 * @description adb调试是否打开
 * @return  true/false {boolean} 是否打开
 */
Device.prototype.isAdbDebugOpen = function () {
    return PlugReceiver.device.isAdbDebugOpen()
}
/**
 * @description 获取默认输入法包名
 * @return {string} 默认输入法包名
 */
Device.prototype.getDefaultImePkgName = function () {
    return PlugReceiver.device.getDefaultImePkgName() + ""
}
/**
 * @description 获取输入法列表
 * @return {[[String],[String]]} 二维数组  包名,类名,包类全名,应用名
 */
Device.prototype.getImeList = function () {
    return PlugReceiver.device.getImeList()
}
/**
 * @description 无障碍开关是否打开
 * @param pkgName {string?} 包名,默认脚本自身包名
 * @return {boolean} 是否打开
 */
Device.prototype.isAccessibilityEnabled = function (pkgName) {
    pkgName = pkgName || ""
    return PlugReceiver.device.isAccessibilityEnabled(pkgName)
}
/**
 * @description 飞行开关是否打开
 * @return {boolean} 是否打开
 */
Device.prototype.isAirplaneModeOn = function () {
    return PlugReceiver.device.isAirplaneModeOn()
}

function EmailUtils() {

}

/**
 * @description 获取email邮件,可过滤
 * @param config {Object} 配置参数
 * @param filter{String?} 过滤发件人,可空,不填则不过滤
 * @param readNum {number?} 读取条数,默认最新一条,一次读取太多条容易造成脚本卡死崩溃
 * @return {[[],[]]} 二维数组,发件人,接收时间,主题,正文
 */
EmailUtils.prototype.getEmail = function (config, filter, readNum) {
    if (!config) {
        loge("getEmail,未输入配置")
        return false
    }
    if (!config.user) {
        loge("getEmail,未输入账号")
        return false
    }
    if (!config.pass) {
        loge("getEmail,未输入密码")
        return false
    }
    filter = filter || ""
    readNum = readNum || 1
    return PlugReceiver.email.getEmail(JSON.stringify(config), readNum, filter)
}
/**
 * @description 发送email邮件
 * @param config {Object} 配置参数
 * @param subject {String} 主题,标题
 * @param content {String} 正文内容
 * @return {boolean}
 */
EmailUtils.prototype.sendEmail = function (config, subject, content) {
    if (!config) {
        loge("sendEmail,未输入配置")
        return false
    }
    if (!config.user) {
        loge("sendEmail,未输入账号")
        return false
    }
    if (!config.pass) {
        loge("sendEmail,未输入密码")
        return false
    }
    if (!config.to) {
        loge("sendEmail,未输入发送给谁")
        return false
    }
    if (!subject) {
        loge("sendEmail,未输入主题,标题")
        return false
    }
    if (!content) {
        loge("sendEmail,未输入正文")
        return false
    }
    return PlugReceiver.email.sendEmail(JSON.stringify(config), subject, content)
}

function Encode() {

}

/**
 * @description 字节集转hex字符串
 * @param {Array}bytes 字节集
 * @return {string} hex字符串
 */
Encode.prototype.bytesToHexString = function (bytes) {
    return PlugReceiver.encode.bytesToHexString(bytes) + ""
}
/**
 * @description 字节集转hex字符串,速度更快
 * @param {Array}bytes 字节集
 * @return {string} hex字符串
 */
Encode.prototype.bytesToHexString2 = function (bytes) {
    return PlugReceiver.encode.bytesToHexString2(bytes) + ""
}

/**
 * @description hex字符串转bytes字节集
 * @param {string}hexString hex字符串
 * @return {string} bytes 字节集
 */
Encode.prototype.hexStringToBytes = function (hexString) {
    return PlugReceiver.encode.hexStringToBytes(hexString)
}

function ExcelUtils() {

}

/**
 * @description 读取Excel所有内容
 * @param filePath {string} Excel路径
 * @return {null|[[],[]]} 返回二维数组
 */
ExcelUtils.prototype.readExcelAll = function (filePath) {
    if (!filePath) {
        loge("readExcelAll,文件路径未填")
        return null
    }
    if (!file.exists(filePath)) {
        loge("readExcelAll,文件不存在")
        return null
    }
    return PlugReceiver.excel.readExcelAll(filePath)
}

/**
 * @description 读取Excel指定行内容
 * @param filePath {string} Excel路径
 * @param lineNum {number?} 行号,默认1
 * @return {null|[]} 返回一维数组
 */
ExcelUtils.prototype.readExcelLine = function (filePath, lineNum) {
    if (!filePath) {
        loge("readLine,文件路径未填")
        return null
    }
    if (!file.exists(filePath)) {
        loge("readLine,文件不存在")
        return null
    }
    lineNum = lineNum || 1
    return PlugReceiver.excel.readExcelLine(filePath, lineNum)
}
/**
 * @description 获取Excel行数
 * @param filePath {string} Excel路径
 * @return {number} 行数
 */
ExcelUtils.prototype.getLineNumber = function (filePath) {
    if (!filePath) {
        loge("getLineNumber,文件路径未填")
        return 0
    }
    if (!file.exists(filePath)) {
        loge("getLineNumber,文件不存在")
        return 0
    }
    return PlugReceiver.excel.getLineNumber(filePath)
}
/**
 * @description 追加写入Excel
 * @param filePath {string} Excel路径
 * @param arrData {[[string],[string]]} 写入数据,二维数组,数组类型为string类型
 * @return {boolean} 是否写入成功
 */
ExcelUtils.prototype.appendExcel = function (filePath, arrData) {
    if (!filePath) {
        loge("appendExcel,文件路径未填")
        return false
    }
    if (!arrData || arrData.length === 0) {
        loge("appendExcel,arrData未传数据")
        return false
    }
    for (let i = 0; i < arrData.length; i++) {
        arrData[i] = arrData[i].map(String)
    }
    if (file.exists(filePath)) {
        return PlugReceiver.excel.appendExcel(filePath, arrData)
    } else {
        this.writeExcel(filePath, arrData)
    }

}
/**
 * @description 修改指定行
 * @param filePath {string} Excel路径
 * @param arrData {[string]} 写入数据,一维数组,数组类型为string类型
 * @param lineNum {number} 行号
 * @return {boolean} 是否写入成功
 */
ExcelUtils.prototype.writeExcelLine = function (filePath, arrData, lineNum) {
    if (!filePath) {
        loge("writeLine,文件路径未填")
        return false
    }
    if (!file.exists(filePath)) {
        loge("writeLine,文件不存在")
        return false
    }
    if (!arrData || arrData.length === 0) {
        loge("writeLine,arrData未传数据")
        return false
    }
    arrData = arrData.map(String)
    return PlugReceiver.excel.writeExcelLine(filePath, arrData, lineNum)
}
/**
 * @description 修改指定数据,通过行&列坐标
 * @param filePath {string} Excel路径
 * @param arrData {string} 写入数据
 * @param rowNum{number} 行号
 * @param columnNum {number} 列号
 * @return {boolean} 是否写入成功
 */
ExcelUtils.prototype.changeExcel = function (filePath, arrData, rowNum, columnNum) {
    if (!filePath || !arrData || !rowNum || !columnNum) {
        loge("changeExcel,参数缺失")
        return false
    }
    if (!file.exists(filePath)) {
        loge("changeExcel,文件不存在")
        return false
    }
    return PlugReceiver.excel.changeExcel(filePath, arrData + "", rowNum, columnNum)
}
/**
 * @description 覆盖写入Excel
 * @param filePath {string} Excel路径
 * @param arrData {[[string],[string]]} 写入数据,二维数组,数组类型为string类型
 * @param colName {[string]?} 标题名,可空,不传则默认写入数据第一条
 * @param sheetName {string?} 表名,可空,默认sheet1
 * @return {boolean} 是否写入成功
 */
ExcelUtils.prototype.writeExcel = function (filePath, arrData, colName, sheetName) {
    sheetName = sheetName || "sheet1"
    if (!filePath) {
        loge("writeExcel,文件路径未填")
        return false
    }
    if (!arrData || arrData.length === 0) {
        loge("writeExcel,arrData未传数据")
        return false
    }
    if (!colName || colName.length === 0) {
        for (let i = 0; i < arrData.length; i++) {
            arrData[i] = arrData[i].map(String)
        }
        colName = arrData[0]
        arrData.shift()
    } else {
        for (let i = 0; i < arrData.length; i++) {
            arrData[i] = arrData[i].map(String)
        }
    }
    return PlugReceiver.excel.writeExcel(filePath, arrData, colName, sheetName)
}


function Files() {

}

/**
 * @description 路径path是否是文件
 * @param {string} path 文件路径
 * @return {boolean} true/false
 */
Files.prototype.isFile = function (path) {
    return PlugReceiver.file.isFile(path)
}
/**
 * @description 路径path是否是文件夹
 * @param {string} path 文件夹路径
 * @return {boolean} true/false
 */
Files.prototype.isDir = function (path) {
    return PlugReceiver.file.isDir(path)
}
/**
 * @description 文件夹path是否为空文件夹
 * @param {string} path 文件夹路径
 * @return {boolean} true/false
 */
Files.prototype.isEmptyDir = function (path) {
    return PlugReceiver.file.isEmptyDir(path)
}
/**
 * @description 连接两个路径并返回
 * @param parent 父目录路径
 * @param child 子路径
 * @return {string} 路径
 */
Files.prototype.join = function (parent, child) {
    return PlugReceiver.file.join(parent, child) + ""
}
/**
 * @description 创建一个文件或文件夹并返回是否创建成功。如果文件已经存在，则直接返回false。
 * @param {string} path 路径
 * @return {boolean} true/false
 */
Files.prototype.create = function (path) {
    return PlugReceiver.file.create(path)
}
/**
 * @description 创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹。如果文件已经存在，则直接返回false。
 * @param {string} path 路径
 * @return {boolean} true/false
 */
Files.prototype.createWithDirs = function (path) {
    return PlugReceiver.file.createWithDirs(path)
}
/**
 * @description 路径path处的文件是否存在
 * @param {string} path 路径
 * @return {boolean} true/false
 */
Files.prototype.exists = function (path) {
    return PlugReceiver.file.exists(path)
}
/**
 * @description 确保路径path所在的文件夹存在。如果该路径所在文件夹不存在，则创建该文件夹
 * @param {string} path 文件夹路径
 * @return {boolean} true/false
 */
Files.prototype.ensureDir = function (path) {
    return PlugReceiver.file.ensureDir(path)
}
/**
 * @description 读取文本文件path的所有内容并返回。
 * @param {string} path 路径
 * @param {string} encoding 字符编码，可选，默认为utf-8
 * @return {string} 文件内容
 */
Files.prototype.read = function (path, encoding) {
    encoding = encoding || "utf-8"
    return PlugReceiver.file.read(path, encoding) + ""
}
/**
 * @description 读取文件path的所有内容并返回一个字节数组
 * @param {string} path 路径
 * @return {Array} 字节数组
 */
Files.prototype.readBytes = function (path) {
    return PlugReceiver.file.readBytes(path)
}
/**
 * @description 读取文件path的所有内容并返回一个base64编码字符串
 * @param {string} path 路径
 * @return {string} base64编码字符串
 */
Files.prototype.readBase64 = function (path) {
    return PlugReceiver.file.readBase64(path) + ""
}
/**
 * @description 把text写入到文件path中。如果文件存在则覆盖，不存在则创建。
 * @param {string} path 路径
 *  @param {string} text 要写入的文本内容
 * @param {string} encoding 字符编码，可选，默认为utf-8
 * @return {boolean} true/false
 */
Files.prototype.write = function (path, text, encoding) {
    encoding = encoding || "utf-8"
    return PlugReceiver.file.write(path, text, encoding)
}
/**
 * @description 把bytes写入到文件path中。如果文件存在则覆盖，不存在则创建。
 * @param {string} path 路径
 *  @param  {Array} bytes 字节数组，要写入的二进制数据
 * @return {boolean} true/false
 */
Files.prototype.writeBytes = function (path, bytes) {
    return PlugReceiver.file.writeBytes(path, bytes)
}
/**
 * @description 把base64写入到文件path中。如果文件存在则覆盖，不存在则创建。
 * @param {string} path 路径
 *  @param  {string} base64 要写入的base数据
 */
Files.prototype.writeBase64 = function (path, base64) {
    if (!base64) return false
    return PlugReceiver.file.writeBase64(path, base64)
}
/**
 * @description 把text追加到文件path的末尾。如果文件不存在则创建
 * @param {string} path 路径
 *  @param {string} text 要写入的文本内容
 * @param {string} encoding 字符编码，可选，默认为utf-8
 * @return {boolean} true/false
 */
Files.prototype.append = function (path, text, encoding) {
    encoding = encoding || "utf-8"
    return PlugReceiver.file.append(path, text, encoding)
}

/**
 * @description 把bytes追加到文件path的末尾。如果文件不存在则创建。
 * @param {string} path 路径
 *  @param  {Array} bytes 字节数组，要写入的二进制数据
 * @return {boolean} true/false
 */
Files.prototype.appendBytes = function (path, bytes) {
    return PlugReceiver.file.appendBytes(path, bytes)
}
/**
 * @description 复制文件
 * @param {string} fromPath 要复制的原文件路径
 *  @param  {string} toPath 复制到的文件路径
 * @return {boolean} true/false
 */
Files.prototype.copy = function (fromPath, toPath) {
    return PlugReceiver.file.copy(fromPath, toPath)
}
/**
 * @description 移动文件
 * @param {string} fromPath 要复制的原文件路径
 *  @param  {string} toPath 复制到的文件路径
 * @return {boolean} true/false
 */
Files.prototype.move = function (fromPath, toPath) {
    return PlugReceiver.file.move(fromPath, toPath)
}
/**
 * @description 重命名文件
 * @param {string} path 要重命名的原文件路径
 *  @param  {string} newName 要重命名的新文件名
 * @return {boolean} true/false
 */
Files.prototype.rename = function (path, newName) {
    return PlugReceiver.file.rename(path, newName)
}
/**
 * @description 重命名文件，不包含拓展名
 * @param {string} path 要重命名的原文件路径
 *  @param  {string} newName 要重命名的新文件名
 * @return {boolean} true/false
 */
Files.prototype.renameWithoutExtension = function (path, newName) {
    return PlugReceiver.file.renameWithoutExtension(path, newName)
}
/**
 * @description 复制文件夹
 * @param fromPath {string} 源文件夹路径
 * @param toPath {string}  目标文件夹路径
 * @return {boolean}
 */
Files.prototype.copyDir = function (fromPath, toPath) {
    return PlugReceiver.file.copyDir(fromPath, toPath)
}
/**
 * @description 移动文件夹
 * @param fromPath {string} 源文件夹路径
 * @param toPath {string}  目标文件夹路径
 * @return {boolean}
 */
Files.prototype.moveDir = function (fromPath, toPath) {
    return PlugReceiver.file.moveDir(fromPath, toPath)
}
/**
 * @description 获取文件的文件名
 * @param {string} path 路径
 * @return {string} 文件的文件名
 */
Files.prototype.getName = function (path) {
    return PlugReceiver.file.getName(path) + ""
}
/**
 * @description 获取不含拓展名的文件名
 * @param {string} path 路径
 * @return {string}不含拓展名的文件名
 */
Files.prototype.getNameWithoutExtension = function (path) {
    return PlugReceiver.file.getNameWithoutExtension(path) + ""
}

/**
 * @description 获取文件的拓展名
 * @param {string} path 路径
 * @return {string} 文件的拓展名
 */
Files.prototype.getExtension = function (path) {
    return PlugReceiver.file.getExtension(path) + ""
}
/**
 * @description 删除文件或空文件夹
 * @param {string} path 路径
 * @return {boolean} true/false
 */
Files.prototype.remove = function (path) {
    return PlugReceiver.file.remove(path)
}
/**
 * @description 删除文件夹，如果文件夹不为空，则删除该文件夹的所有内容再删除该文件夹
 * @param {string} path 路径
 * @return {boolean} true/false
 */
Files.prototype.removeDir = function (path) {
    return PlugReceiver.file.removeDir(path)
}
/**
 * @description 获取SD卡路径。所谓SD卡，即外部存储器。
 * @return {string} SD卡路径
 */
Files.prototype.getSdcardPath = function () {
    return PlugReceiver.file.getSdcardPath() + ""
}
/**
 * @description 列出文件夹path下的满足条件的文件和文件夹的名称的数组。如果不加filter参数，则返回所有文件和文件夹。
 * @param {string} path 路径
 * @param {function?} filter 过滤函数，可选
 * @return {null|string[]} 满足条件的文件和文件夹的名称的数组。如果不加filter参数，则返回所有文件和文件夹。
 */
Files.prototype.listDir = function (path, filter) {
    let fileList = filter ? PlugReceiver.file.listDir(path, filter) : PlugReceiver.file.listDir(path)
    let tmp_fileList = []
    for (let i = 0; i < fileList.length; i++) {
        tmp_fileList.push(fileList[i] + "")
    }
    if (tmp_fileList.length === 0) return null
    return tmp_fileList
}


/**
 * @description 打开一个文件
 * @param {string}path 文件路径
 * @param {string}mode 文件打开模式
 * @param {string}encoding 字符编码
 * @param {number?}bufferSize 文件读写的缓冲区大小
 * @return {Object} 文件对象
 */
Files.prototype.open = function (path, mode, encoding, bufferSize) {
    return PlugReceiver.file.open(path, mode, encoding, bufferSize)
}
/**
 * @description 关闭文件
 * @return {boolean} true/false
 */
Files.prototype.close = function () {
    return PlugReceiver.file.close()
}
/**
 * @description 关闭文件
 * @return {boolean} true/false
 */
Files.prototype.close = function () {
    return PlugReceiver.file.close()
}
/**
 * @description 删除所有空文件夹
 * @param {string} path 路径
 */
Files.prototype.deleteAllEmptyDirs = function (path) {
    let list = this.listDir(path)
    if (list.length === 0) {
        logw("删除目录 " + path + " " + (this.remove(path) ? "成功" : "失败"))
        return
    }
    for (let i = 0; i < list.length; i++) {
        let child = this.join(path, list[i])
        if (this.isDir(child)) {
            PlugReceiver.file.deleteAllEmptyDirs(child)
        }
    }
}
/**
 * @description 文件编码转换
 * @param {string}fromFile 源文件路径
 * @param {string}fromEncoding 源文件编码
 * @param {string}toFile 输出文件路径
 * @param {string}toEncoding 输出文件编码
 */
Files.prototype.convert = function (fromFile, fromEncoding, toFile, toEncoding) {
    fromFile = this.open(fromFile, "r", fromEncoding)
    toFile = this.open(toFile, "w", toEncoding)
    while (true) {
        let line = fromFile.readline()
        if (!line) break
        toFile.writeline(line)
    }
    this.close()
}
/**
 * @description 获取文件行数
 * @param {string} path 路径
 * @return {number} 13
 */
Files.prototype.getLineNumber = function (path) {
    return PlugReceiver.file.getLineNumber(path)
}
/**
 * @description 修改以字符为起始的字符串中的相应文本
 * @param {string}path 路径
 * @param {string}startWord  起始字符串
 * @param {string}oldString 要替换的字符串
 * @param {string}newString 替换成的字符串
 * @param {string?}separator 分割符 可空 默认\n 可填\r\n
 * @return {boolean} true/false
 */
Files.prototype.changeStartWith = function (path, startWord, oldString, newString, separator) {
    separator = separator || "\n"
    return PlugReceiver.file.changeStartWith(path, startWord, oldString, newString, separator)
}
/**
 * @description 修改指定行文本
 * @param {string}path 路径
 * @param {number}lines  指定行数
 * @param {string}content 要替换的字符串
 * @param {string?}separator 分割符 可空 默认\n 可填\r\n
 * @return {boolean} true/false
 */
Files.prototype.changeLine = function (path, lines, content, separator) {
    separator = separator || "\n"
    return PlugReceiver.file.changeLine(path, lines, content, separator)
}
/**
 * @description 获取文件大小字节数(可格式化)
 * @param {string}path 路径
 * @param {boolean?}isFormat 是否格式化
 * @return {number|string} 文件夹大小字节数/格式化
 */
Files.prototype.getFileSize = function (path, isFormat) {
    if (isFormat) {
        return PlugReceiver.file.getFileSize(path, true)
    }
    return PlugReceiver.file.getFileSize(path)
}

/**
 * @description 获取文件夹大小字节数(可格式化)
 * @param {string}path 路径
 * @param {boolean?}isFormat 是否格式化
 * @return {number|string} 文件夹大小字节数/格式化
 */
Files.prototype.getFolderSize = function (path, isFormat) {
    return isFormat ? PlugReceiver.file.getFolderSize(path) : PlugReceiver.file.getFolderSize(path, true)
}
/**
 * @description 格式化字节单位
 * @param {number}size 字节大小
 * @return {string} 格式化字节单位
 */
Files.prototype.getFormatSize = function (size) {
    return PlugReceiver.file.getFormatSize(size) + ""
}
/**
 * @description 获取zip内部所有文件路径
 * @param path {string} zip文件路径
 * @return {null|string[]} 文件路径数组
 */
Files.prototype.readZipInnerFilePathList = function (path) {
    try {
        let fileList = PlugReceiver.file.readZipInnerFilePathList(path)
        let tmp_fileList = []
        for (let i = 0; i < fileList.length; i++) {
            tmp_fileList.push(fileList[i] + "")
        }
        if (tmp_fileList.length === 0) return null
        return tmp_fileList
    } catch (e) {
        loge(e)
        return null
    }

}
/**
 * @description 解压zip,支持密码
 * @param zipFile {string} zip文件路径
 * @param dest {string} 解压路径
 * @param passwd {string} 密码
 */
Files.prototype.unzip = function (zipFile, dest, passwd) {
    passwd = passwd || ""
    PlugReceiver.file.unzip(zipFile, dest, passwd)
}

/**
 * @description 获取zip注释内容
 * @param path {string} zip文件路径
 * @return {string} zip注释内容
 */
Files.prototype.getZipComment = function (path) {
    return PlugReceiver.file.getZipComment(path) + ""
}

/**
 * @description 获取文件修改时间
 * @param path {string} 文件路径
 * @return {string} 修改时间yyyy-MM-dd HH:mm:ss,不存在返回 "0"
 */
Files.prototype.getLastModified = function (path) {
    return PlugReceiver.file.getLastModified(path) + ""
}

/**
 * @description 获取EC下指定源文件夹下文件列表
 * @param filterPath {string?} 指定源文件夹名,默认res
 * @return {null|string[]} 文件列表
 */
Files.prototype.getECInnerFileList = function (filterPath) {
    let filterList = []
    filterPath = filterPath || "res"
    let ecPath = PlugReceiver.app.getECFilePath()
    let iecPath = file.listDir(ecPath).filter(function (filePath) {
        return filePath.substr(filePath.length - 3) === "iec"
    })
    if (iecPath) {
        let zipList = this.readZipInnerFilePathList(iecPath[0])
        if (zipList) {
            for (let i = 0; i < zipList.length; i++) {
                if (zipList[i].indexOf(filterPath + "/") === 0) {
                    filterList.push(zipList[i].replace(filterPath + "/", ""))
                }
            }
        }
    }
    if (filterList.length === 0) return null
    return filterList
}
/**
 * @description 读xml文件为json
 * @param path {string} 文件路径
 * @return {string}
 */
Files.prototype.xmlFileToJson = function (path) {
    return PlugReceiver.file.xmlFileToJson(path) + ""
}
/**
 * @description xml字符串转json
 * @param str {string} xml字符串
 * @return {string}
 */
Files.prototype.xmlStrToJson = function (str) {
    return PlugReceiver.file.xmlStrToJson(str) + ""
}
/**
 * @description json转xml字符串
 * @param str {string} json字符串
 * @return {string}
 */
Files.prototype.jsonToXml = function (str) {
    return PlugReceiver.file.jsonToXml(str) + ""
}


function FTP() {

}

/**
 * @description ftp初始化
 * @param url {string} ip/域名
 * @param user {string} 用户名
 * @param pass{string} 密码
 * @param port{number} 端口,默认21
 */
FTP.prototype.init = function (url, user, pass, port) {
    port = port || 21
    return PlugReceiver.ftp.init(url, user, pass, port)
}
/**
 * @description 连接ftp
 * @return {boolean} true/false
 */
FTP.prototype.connect = function () {
    return PlugReceiver.ftp.connect()
}
/**
 * @description 关闭ftp
 */
FTP.prototype.close = function () {
    return PlugReceiver.ftp.close()
}
/**
 * @description 创建文件夹
 * @param remotePath {string} 远程路径
 * @return {boolean} true/false
 */
FTP.prototype.createDir = function (remotePath) {
    return PlugReceiver.ftp.createDir(remotePath)
}
/**
 * @description 删除服务器文件
 * @param remoteFile {string} 远程文件路径
 * @return {boolean} true/false
 */
FTP.prototype.delFile = function (remoteFile) {
    return PlugReceiver.ftp.delFile(remoteFile)
}
/**
 * @description 遍历目录下所有文件和目录
 * @param remotePath {string} 服务器目录路径
 * @param mode {string?} 空或者不传,为所有目录和文件,f为文件,d为目录
 * @return {null|string[]}
 */
FTP.prototype.listFiles = function (remotePath, mode) {
    mode = mode || ""
    let retArr = PlugReceiver.ftp.listFiles(remotePath, mode), tmpArr = []
    for (let i = 0; i < retArr.length; i++) {
        tmpArr.push(retArr[i] + "")
    }
    if (tmpArr.length === 0) return null
    return tmpArr
}

/**
 * @description 上传文件
 * @param localPath {string} 本地文件路径
 * @param remotePath {string}  远程目录路径
 * @return {boolean} true/false
 */
FTP.prototype.uploadFile = function (localPath, remotePath) {
    return PlugReceiver.ftp.uploadFile(localPath, remotePath)
}
/**
 * @description 下载文件
 * @param localPath {string} 本地目录路径
 * @param remotePath {string}  远程文件路径
 * @return {boolean} true/false
 */
FTP.prototype.downloadFile = function (localPath, remotePath) {
    return PlugReceiver.ftp.downloadFile(localPath, remotePath)
}


function Http() {

}

/**
 * @description post/put上传bytes流文件
 * @param url {String} 网址
 * @param localPath {String} 本地文件路径
 * @param header {Object?} 协议头
 * @param method {String?} 请求方法,支持post/put,默认put
 * @return {boolean} true/false
 */
Http.prototype.postBytes = function (url, localPath, header, method) {
    header = JSON.stringify(header) || null
    method = method || "put"
    return PlugReceiver.http.postBytes(url, localPath, header, method)
}

function Images() {

}

/**
 * @description 旋转图片
 * @param image {ImageBitmap} Bitmap图片对象
 * @param angel  {number} 角度,如旋转90度
 * @returns {null|ImageBitmap} Bitmap图片对象
 */
Images.prototype.rotateBitmap = function (image, angel) {
    if (!image || !angel) return null
    return PlugReceiver.img.rotateBitmap(image, angel)
}
/**
 * @description 通过宽高缩放Bitmap
 * @param image {ImageBitmap} Bitmap图片对象
 * @param newWidth {number} 新宽度
 * @param newHeight {number} 新高度
 * @return {null|ImageBitmap} Bitmap图片对象
 */
Images.prototype.scaleBitmapByWH = function (image, newWidth, newHeight) {
    if (!image || !newWidth) return null
    return PlugReceiver.img.scaleBitmapByWH(image, newWidth, newHeight)
}
/**
 * @description 通过百分比缩放Bitmap
 * @param image {ImageBitmap} Bitmap图片对象
 * @param ratioW {number} 宽百分比
 * @param ratioH {number?} 高百分比,可不填,默认跟宽一样
 * @return {null|ImageBitmap} Bitmap图片对象
 */
Images.prototype.scaleBitmapByRatio = function (image, ratioW, ratioH) {
    if (!image || !ratioW) return null
    ratioH = ratioH || ratioW
    return PlugReceiver.img.scaleBitmapByRatio(image, ratioW / 100, ratioH / 100)
}
/**
 * @description 合并图片,支持方向
 * @param firstBitmap {ImageBitmap} 第一张Bitmap图
 * @param secondBitmap {ImageBitmap} 第二张Bitmap图
 * @param direction {number?} 方向,横向0/纵向1,默认0
 * @return {ImageBitmap} 合并后的Bitmap图
 */
Images.prototype.mergeBitmap = function (firstBitmap, secondBitmap, direction) {
    type = type || 0
    return PlugReceiver.img.mergeBitmap(firstBitmap, secondBitmap, direction)
}

/**
 * @description 通过颜色值二值化
 * @param bitmap {ImageBitmap} bitmap格式图片数据
 * @param color {String} 字符串值,可通过findColor生成
 * @param mode{int?} 二值化模式,默认1,2则为反转
 * @return {ImageBitmap} 二值化后的bitmap图
 */
Images.prototype.binaryzationBitmapByColor = function (bitmap, color, mode) {
    if (!bitmap) {
        loge("binaryzationBitmapByColor,未传图")
        return null
    }
    if (!color) {
        loge("binaryzationBitmapByColor,未传颜色值")
        return null
    }
    mode = mode || 1
    return PlugReceiver.img.binaryzationBitmapByColor(bitmap, color, mode)
}
/**
 * @description 通过阈值范围二值化
 * @param bitmap {Bitmap} bitmap格式图片数据
 * @param start{int} 起始阈值
 * @param end{int?} 结束阈值,可空,默认255
 * @param mode{int?} 二值化模式,默认1,2则为反转
 * @return {null|Bitmap} 二值化后数据
 */
Images.prototype.binaryzationBitmapByRange = function (bitmap, start, end, mode) {
    if (!bitmap) {
        loge("binaryzationBitmapByColor,未传图")
        return null
    }
    if (!start) {
        loge("binaryzationBitmapByColor,未传二值化起始阈值")
        return null
    }
    end = end || 255
    mode = mode || 1
    return PlugReceiver.img.binaryzationBitmapByRange(bitmap, start, end, mode)
}
/**
 * @description 获取图片rgb数据
 * @param bitmap {Bitmap} 图片bitmap数据
 * @param startX{number?} 起始X,可省略
 * @param startY{number?} 起始X,可省略
 * @param endX{number?} 结束X,可省略
 * @param endY{number?} 结束Y,可省略
 * @return {[[],[]]|null} 二维数组
 */
Images.prototype.bitmapToRGBArr = function (bitmap, startX, startY, endX, endY) {
    if (!bitmap) {
        loge("bitmapToRGBArr,未传入图片")
        return null
    }
    startX = startX || 0
    startY = startY || 0
    endX = endX || 0
    endY = endY || 0
    return PlugReceiver.img.bitmapToRGBArr(bitmap, startX, startY, endX, endY)
}
/**
 * @description 获取范围内颜色个数
 * @param bitmap  {Bitmap} 图片bitmap数据
 * @param color {String} 字符串值,可通过findColor生成
 * @param startX{number?} 起始X,可省略
 * @param startY{number?} 起始X,可省略
 * @param endX{number?} 结束X,可省略
 * @param endY{number?} 结束Y,可省略
 * @return {number} 颜色个数
 */
Images.prototype.getColorCount = function (bitmap, color, startX, startY, endX, endY) {
    startX = startX || 0
    startY = startY || 0
    endX = endX || 0
    endY = endY || 0
    if (startX > endX || startY > endY) {
        loge("getColorCount,坐标范围错误")
        return 0
    }
    return PlugReceiver.img.getColorCount(bitmap, color, startX, startY, endX, endY)
}

function Mails() {

}

/**
 * @description 初始化qq邮箱
 * @param fromAdd{string} 发件人账号
 * @param fromPass{string} 发件人秘钥 获取方法https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256
 * @return {null}
 */
Mails.prototype.qqMailInit = function (fromAdd, fromPass) {
    return PlugReceiver.mail.qqMailInit(fromAdd, fromPass)
}
/**
 * @description 发送qq邮件
 * @param toAdd {string} 收件人地址
 * @param title {string} 标题
 * @param content {string} 内容
 * @return {boolean} 是否发送成功
 */
Mails.prototype.qqMailSendText = function (toAdd, title, content) {
    return PlugReceiver.mail.qqMailSendText(toAdd, title, content)
}

function Medias() {

}

/**
 * @description 获取音视频时长
 * @param path{string} 音视频路径
 * @return {number} 音视频时长,秒
 */
Medias.prototype.getAudioDuration = function (path) {
    return PlugReceiver.media.getAudioDuration(path)
}

/**
 * @description 清空相册图片
 * @return {number}清空相册图片,返回清空图片个数
 */
Medias.prototype.clearAllPhotos = function () {
    return PlugReceiver.media.clearAllPhotos()
}
/**
 * @description 清空相册视频
 * @return {number}清空相册视频,返回清空视频个数
 */
Medias.prototype.clearAllVideos = function () {
    return PlugReceiver.media.clearAllVideos()
}
/**
 * @description 清空相册音频
 * @return {number}清空相册音频,返回清空音频个数
 */
Medias.prototype.clearAllAudios = function () {
    return PlugReceiver.media.clearAllAudios()
}
/**
 * @description 获取系统相册路径
 * @return {string}系统相册路径
 */
Medias.prototype.getPhotoPath = function () {
    return PlugReceiver.media.getPhotoPath() + ""
}
/**
 * @description 刷新图库
 * @param path{string?} 目录路径,可空,默认/sdcard
 * @return {boolean} 是否刷新成功
 */
Medias.prototype.scanDirAsync = function (path) {
    return path ? PlugReceiver.media.scanDirAsync(path) : PlugReceiver.media.scanDirAsync("sys")
}
/**
 * @description 播放音频
 * @param path{string} 路径
 */
Medias.prototype.playMusic = function (path) {
    PlugReceiver.media.playMusic(path)
}
/**
 * @description 停止音频
 */
Medias.prototype.stopMusic = function () {
    PlugReceiver.media.stopMusic()
}

/**
 * @description 播放播放系统音频
 * @param mode{number?}模式 1.手机提示音,2.來電鈴聲,3.手机闹钟铃声,默认来电铃声
 */
Medias.prototype.playSystemMusic = function (mode) {
    mode = mode || 4
    PlugReceiver.media.playSystemMusic(mode)
}
/**
 * @description 停止系统音频
 */
Medias.prototype.stopSystemMusic = function () {
    PlugReceiver.media.stopSystemMusic()
}

/**
 * @description 是否有声音正在播放
 */
Medias.prototype.isMusicActive = function () {
    return PlugReceiver.media.isMusicActive()
}

function Permit() {

}

/**
 * @description 检查手机是否有后台打开权限
 * @return {boolean}只支持小米/vivo/oppo,其他自动返回true
 */
Permit.prototype.hasBGStartPermission = function () {
    return PlugReceiver.permit.hasBGStartPermission()
}


function Plugin() {

}

Plugin.prototype.getPlugVersion = function () {
    return PlugReceiver.plugin.getPlugVersion() + ""
}
Plugin.prototype.getDocVersion = function () {
    return _docVersion
}

function Root() {
}

/**
 * @description 是否有root权限
 * @param su {string?} 魔改su接口,可不填
 * @return true/false{boolean} 是/否
 */
Root.prototype.hasRoot = function (su) {
    su = su || "su"
    return PlugReceiver.rootCmd.hasRoot(su)
}
/**
 * @description root执行adb shell命令,无返回值
 * @param cmd {string} adb shell命令
 * @param su {string?} 魔改su接口,可不填
 */
Root.prototype.exec = function (cmd, su) {
    su = su || "su"
    PlugReceiver.rootCmd.execRootCmdSilent(cmd, su)
}
/**
 * @description root执行adb shell命令,有返回值
 * @param cmd {string} adb shell命令
 * @param su {string?} 魔改su接口,可不填
 * @return {string} shell返回值多行用\n分隔
 */
Root.prototype.execWithResult = function (cmd, su) {
    su = su || "su"
    return PlugReceiver.rootCmd.execRootCmd(cmd, su).trim() + ""
}

function SMB() {
}

/**
 * @description 初始化smb连接
 * @param baseUrl {string} smb连接
 */
SMB.prototype.init = function (baseUrl) {
    return !PlugReceiver.smb.init(baseUrl)
}
/**
 * @description 创建文件夹
 * @param folderName {string} 文件夹名
 * @return  true/false{boolean} 是否成功
 */
SMB.prototype.createDir = function (folderName) {
    return PlugReceiver.smb.createDir(folderName)
}
/**
 * @description 读取所有文件(文件夹)的名称
 * @param remotePath {string?} 远程文件夹目录,不填为主目录
 * @return {null|[]} 文件/文件夹列表数组
 */
SMB.prototype.getFileList = function (remotePath) {
    remotePath = remotePath || ""
    let tmpFile = []
    let ret = PlugReceiver.smb.getFileList(remotePath)
    for (let i = 0; i < ret.length; i++) {
        tmpFile.push(ret[i] + "")
    }
    return tmpFile.length === 0 ? null : tmpFile
}

/**
 * @description 删除文件
 * @param remoteFile {string} 远程文件名
 * @return {boolean} true/false
 */
SMB.prototype.deleteFile = function (remoteFile) {
    return PlugReceiver.smb.deleteFile(remoteFile)
}
/**
 * @description 下载文件(并改名)
 * @param remotePath {string} 远程文件
 * @param localPath{string} 本地文件
 * @return {boolean} true/false
 */
SMB.prototype.downloadFile = function (remotePath, localPath) {
    return PlugReceiver.smb.downloadFile(remotePath, localPath)
}
/**
 * @description 上传文件(并改名)
 * @param localFilePath localDir{string} 本地文件
 * @param remotePath {string} 远程文件
 * @return {boolean} true/false
 */
SMB.prototype.uploadFile = function (localFilePath, remotePath) {
    return PlugReceiver.smb.uploadFile(localFilePath, remotePath)
}

function Utils() {
}

/**
 * @description 打开开发者人员选项页面
 * @return true/false {boolean} 是否成功
 */
Utils.prototype.openDevelopmentSettings = function () {
    return PlugReceiver.util.openDevelopmentSettings()
}


