let fun = {}

let 抖音_版本号 = utils.getAppVersionName('com.ss.android.ugc.aweme')
logd('抖音_版本号:' + 抖音_版本号);
let 抖音火山版_版本号 = utils.getAppVersionName('com.ss.android.ugc.live')
logd('抖音火山版_版本号:' + 抖音火山版_版本号);
let 快手_版本号 = utils.getAppVersionName('com.smile.gifmaker')
logd('快手_版本号:' + 快手_版本号);
let 小红书_版本号 = utils.getAppVersionName('com.xingin.xhs')
logd('小红书_版本号:' + 小红书_版本号);

fun.分辨率x = device.getScreenWidth()
fun.分辨率y = device.getScreenHeight()
fun.抖音版本号 = 抖音_版本号
fun.抖音火山版_版本号 = 抖音火山版_版本号
fun.快手_版本号 = 快手_版本号
fun.小红书_版本号 = 小红书_版本号

fun.获取设备id = function () {
    let id = device.getSerial();
    if (id == null || id === "" || id === "unknown") {
        id = device.getAndroidId();
    }
    if (id == null || id === "" || id === "unknown") {
        id = device.getIMEI();
    }
    return id;
}

fun.设备标识 = fun.获取设备id()
logd('设备标识:' + fun.设备标识);

fun.读取文本 = function (目录) {
    // 判断文件存在
    if (!file.exists(目录)) {
        logd(目录 + ' 目录不存在');
        return
    }
    let data = file.readFile(目录);
    if (data) {
        return data
    }
}

/*
    obj:找到的控件对象
    关系:控件对象的子或者父
    层次:第几个子或者父
    点击成功返回true

    还没用过
 */
fun.控件点击 = function (obj, 关系, 层次) {

    let 控件对象 = obj
    let 控件关系 = 关系 // 子 父 兄弟节点
    let 关系层次 = 层次 // 多少个 子 父 兄弟

    if (控件对象.clickable()) {
        logd(控件对象 + ',对象可以控件点击');
        控件对象.clickCenter()
        return true
    }

    if (控件关系 === '父') {
        //i的值从0开始循环,依次输出0~4,i < 5 表示i循环5次
        for (let i = 1; i < 关系层次; i++) {
            控件对象 = 控件对象.parent()
        }
        if (控件对象.clickable()) {
            logd(控件对象 + ',对象可以控件点击');
            控件对象.clickCenter()
            return true
        }
    }

    if (控件关系 === '子') {
        //i的值从0开始循环,依次输出0~4,i < 5 表示i循环5次
        for (let i = 1; i < 关系层次; i++) {
            控件对象 = 控件对象.child(0)
        }
        if (控件对象.clickable()) {
            logd(控件对象 + ',对象可以控件点击');
            控件对象.clickCenter()
            return true
        }
    }

}

fun.抖音 = {

    点击延时: 3500,//  模块.抖音.点击延时

    控件: {

        '抖音火山_前台': {
            '15.0.5': pkg("com.ss.android.ugc.live"),
        },
        '抖音火山_桌面抖音火山版': {
            '15.0.5': text("抖音火山版"),
        },
        '抖音火山_打开': {
            '15.0.5': text("打开"),
        },
        '抖音火山_安装完成': {
            '15.0.5': text("完成"),
        },
        '抖音火山_安装包': {
            '15.0.5': text("安装包"),
        },
        '抖音火山_安装': {
            '15.0.5': text("安装"),
        },
        '抖音火山_上传管理': {
            '15.0.5': text("上传管理"),
        },
        '抖音火山_点击屏幕重试': {
            '15.0.5': text("点击屏幕重试"),
        },
        '抖音火山_用户_没有更多了': {
            '15.0.5': text("没有更多了"),
        },
        '抖音火山_主页_分享_火山昵称': {
            '15.0.5': id("com.ss.android.ugc.live:id/gej"),
        },
        '抖音火山_主页_分享_火山号': { // 火山号:  w13605122825
            '15.0.5': textMatch(".*火山号:.*"),
        },
        '抖音火山_主页_分享': {
            '15.0.5': desc("分享"),
        },
        '抖音火山_确认拨打': {
            '15.0.5': textMatch(".*确认拨打：.*"),
        },
        '抖音火山_黄色拨号': {
            '15.0.5': id("com.ss.android.ugc.live:id/c8h"),
        },
        '抖音火山_主页联系方式': {
            '15.0.5': id("com.ss.android.ugc.live:id/hxf"),
        },
        '抖音火山_主页昵称': {
            '15.0.5': id("com.ss.android.ugc.live:id/ffn"),
        },
        '抖音火山_作品发布时间': {
            '15.0.5': id("com.ss.android.ugc.live:id/fjv"),
        },
        '抖音火山_作品列表': {
            '15.0.5': clz("android.widget.Button").descMatch(".*点赞.*"),
        },
        '抖音火山_用户_粉丝数': {
            '15.0.5': id("com.ss.android.ugc.live:id/cbl"),
        },
        '抖音火山_用户': {
            '15.0.5': text("用户"),
        },
        '抖音火山_搜索按钮': {
            '15.0.5': text("搜索"),
        },
        '抖音火山_搜索编辑框': {
            '15.0.5': text("搜索，编辑框"),
        },
        '抖音火山_搜索放大镜': {
            '15.0.5': id("com.ss.android.ugc.live:id/h54"),
        },
        '抖音火山_同意': {
            '15.0.5': text("同意"),
        },
        '私信给朋友': {
            '25.7.0': text("私信给朋友"),
            '25.6.0': text("私信给朋友"),
            '25.5.0': text("私信给朋友"),
            '25.4.0': text("私信给朋友"),
            '25.3.0': text("私信给朋友"),
            '25.2.0': text("私信给朋友"),
            '25.1.0': text("私信给朋友"),
            '25.0.0': text("私信给朋友"),
            '24.9.0': text("私信给朋友"),
            '24.8.0': text("私信给朋友"),
            '24.7.0': text("私信给朋友"),
            '24.6.0': text("私信给朋友"),
            '24.5.0': text("私信给朋友"),
            '24.4.0': text("私信给朋友"),
            '24.3.0': text("私信给朋友"),
            '24.2.0': text("私信给朋友"),
            '24.1.0': text("私信给朋友"),
            '24.0.0': text("私信给朋友"),
        },
        '已被他人认领': {
            '25.3.0': text("播放速度"),
            '25.2.0': text("播放速度"),
            '25.1.0': text("播放速度"),
            '25.0.0': text("播放速度"),
            '24.9.0': text("播放速度"),
            '24.8.0': text("播放速度"),
            '24.7.0': text("播放速度"),
            '24.6.0': text("播放速度"),
            '24.5.0': text("播放速度"),
            '24.4.0': text("播放速度"),
            '24.3.0': text("播放速度"),
            '24.2.0': text("播放速度"),
            '24.1.0': text("已被他人认领"),
            '24.0.0': text("播放速度"),
        },
        '播放速度': {
            '25.7.0': text("播放速度"),
            '25.6.0': text("播放速度"),
            '25.5.0': text("播放速度"),
            '25.4.0': text("播放速度"),
            '25.3.0': text("播放速度"),
            '25.2.0': text("播放速度"),
            '25.1.0': text("播放速度"),
            '25.0.0': text("播放速度"),
            '24.9.0': text("播放速度"),
            '24.8.0': text("播放速度"),
            '24.7.0': text("播放速度"),
            '24.6.0': text("播放速度"),
            '24.5.0': text("播放速度"),
            '24.4.0': text("播放速度"),
            '24.3.0': text("播放速度"),
            '24.2.0': text("播放速度"),
            '24.1.0': text("播放速度"),
            '24.0.0': text("播放速度"),
        },
        '左上返回': {
            '25.7.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/back_btn"),
        },
        '同城第一个搜索结果': {
            '25.7.0': text("自动定位"),
            '25.6.0': text("自动定位"),
            '25.5.0': text("自动定位"),
            '25.4.0': text("自动定位"),
            '25.3.0': text("自动定位"),
            '25.2.0': text("自动定位"),
            '25.1.0': text("自动定位"),
            '25.0.0': text("自动定位"),
            '24.9.0': text("自动定位"),
            '24.8.0': text("自动定位"),
            '24.7.0': text("自动定位"),
            '24.6.0': text("自动定位"),
            '24.5.0': text("自动定位"),
            '24.4.0': text("自动定位"),
            '24.3.0': text("自动定位"),
            '24.2.0': text("自动定位"),
            '24.1.0': text("自动定位"),
            '24.0.0': text("自动定位"),
        },
        '同城切换城市输入框': {
            '25.7.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
        },
        '同城切换城市': { // 可以识别到地名那个同城的
            '26.5.0': id("com.ss.android.ugc.aweme:id/y__"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/y6o"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/y4t"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/yud"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/ya1"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/x7e"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/x1t"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/xwn"),
            '25.7.0': id("com.ss.android.ugc.aweme:id/xtz"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/xqk"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/xr-"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/xni"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/xjf"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/xkl"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/xgi"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/xd6"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/xbr"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/w=n"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/w7_"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/w=m"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/w=s"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/w5o"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/wu6"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/wqe"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/wi0"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/wcm"),
        },
        '团购_有团购': {
            '24.9.0': id("com.ss.android.ugc.aweme:id/gft"),
            '24.8.0': desc("搜地点"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': text("您今日的搜索次数已达上限"),
            '24.0.0': desc("搜地点"),
        },
        '团购_搜索放大镜': {
            '24.9.0': desc("搜地点"),
            '24.8.0': desc("搜地点"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': desc("搜地点"),
            '24.0.0': desc("搜地点"),
        },
        '团购_智能排序': {
            '24.9.0': text("智能排序"),
            '24.8.0': text("智能排序"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': text("您今日的搜索次数已达上限"),
            '24.0.0': text("您今日的搜索次数已达上限"),
        },
        '团购_搜索': { // 用id不会出问题,有个返回人均需要判断精准的id
            '24.9.0': id("com.ss.android.ugc.aweme:id/vgn"),
            '24.8.0': desc("搜索").id("com.ss.android.ugc.aweme:id/va3"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/uo-"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/ujc"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/s=_"),
        },
        '主页右上三个点': {
            '25.7.0': desc("更多"),
            '25.6.0': desc("更多"),
            '25.5.0': desc("更多"),
            '25.4.0': desc("更多"),
            '25.3.0': desc("更多"),
            '25.2.0': desc("更多"),
            '25.1.0': desc("更多"),
            '25.0.0': desc("更多"),
            '24.9.0': desc("更多"),
            '24.8.0': desc("更多"),
            '24.7.0': desc("更多"),
            '24.6.0': desc("更多"),
            '24.5.0': desc("更多"),
            '24.4.0': desc("更多"),
            '24.3.0': desc("更多"),
            '24.2.0': desc("更多"),
            '24.1.0': desc("更多"),
            '24.0.0': desc("更多"),
            '23.0.0': desc("更多"),
        },
        '团购_商家主页': {
            '24.9.0': text("商家主页"),
            '24.8.0': text("商家主页"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': text("商家主页"),
            '24.0.0': text("商家主页"),
            '23.0.0': text("商家主页"),
        },
        '团购_联系号码': { // 点开电话按钮,商家主页私信那里的
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/qp"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/qe"),
            '24.0.0': id('com.ss.android.ugc.aweme:id/qa'),
            '23.0.0': id("com.ss.android.ugc.aweme:id/pu"),
        },
        '团购_电话按钮': {
            '25.1.0': desc("电话按钮"),
            '24.9.0': desc("电话按钮"),
            '24.8.0': desc("电话按钮"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': desc("电话按钮"),
            '24.0.0': desc("电话按钮"),
            '23.0.0': desc("电话按钮"),
        },
        '团购_¥': {
            '25.1.0': descMatch(".*人均.*"),
            '24.9.0': descMatch(".*人均.*"),
            '24.8.0': descMatch(".*人均.*"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': descMatch(".*人均.*"),
            '24.0.0': descMatch(".*人均.*"),
            '23.0.0': descMatch(".*¥.*"),
        },
        '团购_人均': {
            '25.1.0': descMatch(".*人均.*"),
            '24.9.0': descMatch(".*人均.*"),
            '24.8.0': descMatch(".*人均.*"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': descMatch(".*人均.*"),
            '24.0.0': descMatch(".*人均.*"),
            '23.0.0': descMatch(".*人均.*"),
        },
        '您今日的搜索次数已达上限': {
            '25.7.0': text("您今日的搜索次数已达上限"),
            '25.6.0': text("您今日的搜索次数已达上限"),
            '25.5.0': text("您今日的搜索次数已达上限"),
            '25.4.0': text("您今日的搜索次数已达上限"),
            '25.3.0': text("您今日的搜索次数已达上限"),
            '25.2.0': text("您今日的搜索次数已达上限"),
            '25.1.0': text("您今日的搜索次数已达上限"),
            '25.0.0': text("您今日的搜索次数已达上限"),
            '24.9.0': text("您今日的搜索次数已达上限"),
            '24.8.0': text("您今日的搜索次数已达上限"),
            '24.7.0': text("您今日的搜索次数已达上限"),
            '24.6.0': text("您今日的搜索次数已达上限"),
            '24.5.0': text("您今日的搜索次数已达上限"),
            '24.4.0': text("您今日的搜索次数已达上限"),
            '24.3.0': text("您今日的搜索次数已达上限"),
            '24.2.0': text("您今日的搜索次数已达上限"),
            '24.1.0': text("您今日的搜索次数已达上限"),
            '24.0.0': text("您今日的搜索次数已达上限"),
        },
        '没有搜到相关的内容': {
            '25.7.0': text("没有搜到相关的内容"),
            '25.6.0': text("没有搜到相关的内容"),
            '25.5.0': text("没有搜到相关的内容"),
            '25.4.0': text("没有搜到相关的内容"),
            '25.3.0': text("没有搜到相关的内容"),
            '25.2.0': text("没有搜到相关的内容"),
            '25.1.0': text("没有搜到相关的内容"),
            '25.0.0': text("没有搜到相关的内容"),
            '24.9.0': text("没有搜到相关的内容"),
            '24.8.0': text("没有搜到相关的内容"),
            '24.7.0': text("没有搜到相关的内容"),
            '24.6.0': text("没有搜到相关的内容"),
            '24.5.0': text("没有搜到相关的内容"),
            '24.4.0': text("没有搜到相关的内容"),
            '24.3.0': text("没有搜到相关的内容"),
            '24.2.0': text("没有搜到相关的内容"),
            '24.1.0': text("没有搜到相关的内容"),
            '24.0.0': text("没有搜到相关的内容"),
        },
        '拖动滑块完成拼图': {
            '25.7.0': textMatch("拖动滑块，完成拼图"),
            '25.6.0': textMatch("拖动滑块，完成拼图"),
            '25.5.0': textMatch("拖动滑块，完成拼图"),
            '25.4.0': textMatch("拖动滑块，完成拼图"),
            '25.3.0': textMatch("拖动滑块，完成拼图"),
            '25.2.0': textMatch("拖动滑块，完成拼图"),
            '25.1.0': textMatch("拖动滑块，完成拼图"),
            '25.0.0': textMatch("拖动滑块，完成拼图"),
            '24.9.0': textMatch("拖动滑块，完成拼图"),
            '24.8.0': textMatch("拖动滑块，完成拼图"),
            '24.7.0': textMatch("拖动滑块，完成拼图"),
            '24.6.0': textMatch("拖动滑块，完成拼图"),
            '24.5.0': textMatch("拖动滑块，完成拼图"),
            '24.4.0': textMatch("拖动滑块，完成拼图"),
            '24.3.0': textMatch("拖动滑块，完成拼图"),
            '24.2.0': textMatch("拖动滑块，完成拼图"),
            '24.1.0': textMatch("拖动滑块，完成拼图"),
            '24.0.0': textMatch("拖动滑块，完成拼图"),
        },
        '依次点击文字': {
            '25.7.0': textMatch("依次点击文字:"),
            '25.6.0': textMatch("依次点击文字:"),
            '25.5.0': textMatch("依次点击文字:"),
            '25.4.0': textMatch("依次点击文字:"),
            '25.3.0': textMatch("依次点击文字:"),
            '25.2.0': textMatch("依次点击文字:"),
            '25.1.0': textMatch("依次点击文字:"),
            '25.0.0': textMatch("依次点击文字:"),
            '24.9.0': textMatch("依次点击文字:"),
            '24.8.0': textMatch("依次点击文字:"),
            '24.7.0': textMatch("依次点击文字:"),
            '24.6.0': textMatch("依次点击文字:"),
            '24.5.0': textMatch("依次点击文字:"),
            '24.4.0': textMatch("依次点击文字:"),
            '24.3.0': textMatch("依次点击文字:"),
            '24.2.0': textMatch("依次点击文字:"),
            '24.1.0': textMatch("依次点击文字:"),
            '24.0.0': textMatch("依次点击文字:"),
        },
        '请完成下列验证': {
            '25.7.0': text("请完成下列验证后继续:"),
            '25.6.0': text("请完成下列验证后继续:"),
            '25.5.0': text("请完成下列验证后继续:"),
            '25.4.0': text("请完成下列验证后继续:"),
            '25.3.0': text("请完成下列验证后继续:"),
            '25.2.0': text("请完成下列验证后继续:"),
            '25.1.0': text("请完成下列验证后继续:"),
            '25.0.0': text("请完成下列验证后继续:"),
            '24.9.0': text("请完成下列验证后继续:"),
            '24.8.0': text("请完成下列验证后继续:"),
            '24.7.0': text("请完成下列验证后继续:"),
            '24.6.0': text("请完成下列验证后继续:"),
            '24.5.0': text("请完成下列验证后继续:"),
            '24.4.0': text("请完成下列验证后继续:"),
            '24.3.0': text("请完成下列验证后继续:"),
            '24.2.0': text("请完成下列验证后继续:"),
            '24.1.0': text("请完成下列验证后继续:"),
            '24.0.0': text("请完成下列验证后继续:"),
        },
        '粉丝0_粉丝列表': {
            '25.7.0': text("粉丝 0"),
            '25.6.0': text("粉丝 0"),
            '25.5.0': text("粉丝 0"),
            '25.4.0': text("粉丝 0"),
            '25.3.0': text("粉丝 0"),
            '25.2.0': text("粉丝 0"),
            '25.1.0': text("粉丝 0"),
            '25.0.0': text("粉丝 0"),
            '24.9.0': text("粉丝 0"),
            '24.8.0': text("粉丝 0"),
            '24.7.0': text("粉丝 0"),
            '24.6.0': text("粉丝 0"),
            '24.5.0': text("粉丝 0"),
            '24.4.0': text("粉丝 0"),
            '24.3.0': text("粉丝 0"),
            '24.2.0': text("粉丝 0"),
            '24.1.0': text("粉丝 0"),
            '24.0.0': text("粉丝 0"),
        },
        '点击左上角返回': {//点击左上角返回
            '25.7.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/back_btn").desc("返回"),
        },
        '点击进入直播间按钮': {//抖音首页点击进入直播间
            '25.7.0': desc("点击进入直播间按钮"),
            '25.6.0': desc("点击进入直播间按钮"),
            '25.5.0': desc("点击进入直播间按钮"),
            '25.4.0': desc("点击进入直播间按钮"),
            '25.3.0': desc("点击进入直播间按钮"),
            '25.2.0': desc("点击进入直播间按钮"),
            '25.1.0': desc("点击进入直播间按钮"),
            '25.0.0': desc("点击进入直播间按钮"),
            '24.9.0': desc("点击进入直播间按钮"),
            '24.8.0': desc("点击进入直播间按钮"),
            '24.7.0': desc("点击进入直播间按钮"),
            '24.6.0': desc("点击进入直播间按钮"),
            '24.5.0': desc("点击进入直播间按钮"),
            '24.4.0': desc("点击进入直播间按钮"),
            '24.3.0': desc("点击进入直播间按钮"),
            '24.2.0': desc("点击进入直播间按钮"),
            '24.1.0': desc("点击进入直播间按钮"),
            '24.0.0': desc("点击进入直播间按钮"),
        },
        '关闭评论': {//评论页面中间右边的X
            '25.7.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.6.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.5.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.4.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.3.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.2.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.1.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '25.0.0': desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn"),
            '24.9.0': desc("关闭"),
            '24.8.0': desc("关闭"),
            '24.7.0': desc("关闭"),
            '24.6.0': desc("关闭"),
            '24.5.0': desc("关闭"),
            '24.4.0': desc("关闭"),
            '24.3.0': desc("关闭"),
            '24.2.0': desc("关闭"),
            '24.1.0': desc("关闭"),
            '24.0.0': desc("关闭"),
        },
        '首页': {//抖音首页
            '25.7.0': text("首页"),
            '25.6.0': text("首页"),
            '25.5.0': text("首页"),
            '25.4.0': text("首页"),
            '25.3.0': text("首页"),
            '25.2.0': text("首页"),
            '25.1.0': text("首页"),
            '25.0.0': text("首页"),
            '24.9.0': text("首页"),
            '24.8.0': text("首页"),
            '24.7.0': text("首页"),
            '24.6.0': text("首页"),
            '24.5.0': text("首页"),
            '24.4.0': text("首页"),
            '24.3.0': text("首页"),
            '24.2.0': text("首页"),
            '24.1.0': text("首页"),
            '24.0.0': text("首页"),
        },
        '点赞': {//点赞头像
            '25.7.0': text("点赞"),
            '25.6.0': text("点赞"),
            '25.5.0': text("点赞"),
            '25.4.0': text("点赞"),
            '25.3.0': text("点赞"),
            '25.2.0': text("点赞"),
            '25.1.0': text("点赞"),
            '25.0.0': text("点赞"),
            '24.9.0': text("点赞"),
            '24.8.0': text("点赞"),
            '24.7.0': text("点赞"),
            '24.6.0': text("点赞"),
            '24.5.0': text("点赞"),
            '24.4.0': text("点赞"),
            '24.3.0': text("点赞"),
            '24.2.0': text("点赞"),
            '24.1.0': text("点赞"),
            '24.0.0': text("点赞"),
        },
        '用户头像': {//点赞头像
            '25.7.0': desc("用户头像"),
            '25.6.0': desc("用户头像"),
            '25.5.0': desc("用户头像"),
            '25.4.0': desc("用户头像"),
            '25.3.0': desc("用户头像"),
            '25.2.0': desc("用户头像"),
            '25.1.0': desc("用户头像"),
            '25.0.0': desc("用户头像"),
            '24.9.0': desc("用户头像"),
            '24.8.0': desc("用户头像"),
            '24.7.0': desc("用户头像"),
            '24.6.0': desc("用户头像"),
            '24.5.0': desc("用户头像"),
            '24.4.0': desc("用户头像"),
            '24.3.0': desc("用户头像"),
            '24.2.0': desc("用户头像"),
            '24.1.0': desc("用户头像"),
            '24.0.0': desc("用户头像"),
        },
        '直播间_来了': {
            '25.7.0': textMatch(".*来了.*"),
            '25.6.0': textMatch(".*来了.*"),
            '25.5.0': textMatch(".*来了.*"),
            '25.4.0': textMatch(".*来了.*"),
            '25.3.0': textMatch(".*来了.*"),
            '25.2.0': textMatch(".*来了.*"),
            '25.1.0': textMatch(".*来了.*"),
            '25.0.0': textMatch(".*来了.*"),
            '24.9.0': textMatch(".*来了.*"),
            '24.8.0': textMatch(".*来了.*"),
            '24.7.0': textMatch(".*来了.*"),
            '24.6.0': textMatch(".*来了.*"),
            '24.5.0': textMatch(".*来了.*"),
            '24.4.0': textMatch(".*来了.*"),
            '24.3.0': textMatch(".*来了.*"),
            '24.2.0': textMatch(".*来了.*"),
            '24.1.0': textMatch(".*来了.*"),
            '24.0.0': textMatch(".*来了.*"),
        },
        '直播间_收到礼物': {
            '25.7.0': descMatch(".*送出.*"),
            '25.6.0': descMatch(".*送出.*"),
            '25.5.0': descMatch(".*送出.*"),
            '25.4.0': descMatch(".*送出.*"),
            '25.3.0': descMatch(".*送出.*"),
            '25.2.0': descMatch(".*送出.*"),
            '25.1.0': descMatch(".*送出.*"),
            '25.0.0': descMatch(".*送出.*"),
            '24.9.0': descMatch(".*送出.*"),
            '24.8.0': descMatch(".*送出.*"),
            '24.7.0': descMatch(".*送出.*"),
            '24.6.0': descMatch(".*送出.*"),
            '24.5.0': descMatch(".*送出.*"),
            '24.4.0': descMatch(".*送出.*"),
            '24.3.0': descMatch(".*送出.*"),
            '24.2.0': descMatch(".*送出.*"),
            '24.1.0': descMatch(".*送出.*"),
            '24.0.0': descMatch(".*送出.*"),
        },
        '直播间_发送': {
            '25.7.0': desc("发送"),
            '25.6.0': desc("发送"),
            '25.5.0': desc("发送"),
            '25.4.0': desc("发送"),
            '25.3.0': desc("发送"),
            '25.2.0': desc("发送"),
            '25.1.0': desc("发送"),
            '25.0.0': desc("发送"),
            '24.9.0': desc("发送"),
            '24.8.0': desc("发送"),
            '24.7.0': desc("发送"),
            '24.6.0': desc("发送"),
            '24.5.0': desc("发送"),
            '24.4.0': desc("发送"),
            '24.3.0': desc("发送"),
            '24.2.0': desc("发送"),
            '24.1.0': desc("发送"),
            '24.0.0': desc("发送"),
        },
        '直播间_评论输入框': {
            '25.7.0': clz("android.widget.EditText"),
            '25.6.0': clz("android.widget.EditText"),
            '25.5.0': clz("android.widget.EditText"),
            '25.4.0': clz("android.widget.EditText"),
            '25.3.0': clz("android.widget.EditText"),
            '25.2.0': clz("android.widget.EditText"),
            '25.1.0': clz("android.widget.EditText"),
            '25.0.0': clz("android.widget.EditText"),
            '24.9.0': clz("android.widget.EditText"),
            '24.8.0': clz("android.widget.EditText"),
            '24.7.0': clz("android.widget.EditText"),
            '24.6.0': clz("android.widget.EditText"),
            '24.5.0': clz("android.widget.EditText"),
            '24.4.0': clz("android.widget.EditText"),
            '24.3.0': clz("android.widget.EditText"),
            '24.2.0': clz("android.widget.EditText"),
            '24.1.0': clz("android.widget.EditText"),
            '24.0.0': clz("android.widget.EditText"),
        },
        '直播间_评论': {
            '25.7.0': text("评论"),
            '25.6.0': text("评论"),
            '25.5.0': text("评论"),
            '25.4.0': text("评论"),
            '25.3.0': text("评论"),
            '25.2.0': text("评论"),
            '25.1.0': text("评论"),
            '25.0.0': text("评论"),
            '24.9.0': text("评论"),
            '24.8.0': text("评论"),
            '24.7.0': text("评论"),
            '24.6.0': text("评论"),
            '24.5.0': text("评论"),
            '24.4.0': text("评论"),
            '24.3.0': text("评论"),
            '24.2.0': text("评论"),
            '24.1.0': text("评论"),
            '24.0.0': text("评论"),
        },
        //直播间三个点
        '直播间_更多': {
            '25.7.0': desc("更多面板 按钮").visible(true),
            '25.6.0': desc("更多面板 按钮").visible(true),
            '25.5.0': desc("更多面板 按钮").visible(true),
            '25.4.0': desc("更多面板 按钮").visible(true),
            '25.3.0': desc("更多面板 按钮").visible(true),
            '25.2.0': desc("更多面板 按钮").visible(true),
            '25.1.0': desc("更多面板 按钮").visible(true),
            '25.0.0': desc("更多面板 按钮").visible(true),
            '24.9.0': desc("更多面板 按钮").visible(true),
            '24.8.0': desc("更多面板 按钮").visible(true),
            '24.7.0': desc("更多面板 按钮").visible(true),
            '24.6.0': desc("更多面板 按钮").visible(true),
            '24.5.0': desc("更多面板 按钮").visible(true),
            '24.4.0': desc("更多面板 按钮").visible(true),
            '24.3.0': desc("更多面板 按钮").visible(true),
            '24.2.0': desc("更多面板 按钮").visible(true),
            '24.1.0': desc("更多面板 按钮").visible(true),
            '24.0.0': desc("更多面板 按钮").visible(true),
        },

        //====== 只有当点赞评论收藏分享父控件找到时才会生效
        '已点赞': {
            '25.7.0': descMatch(".*已点赞.*"),
            '25.6.0': descMatch(".*已点赞.*"),
            '25.5.0': descMatch(".*已点赞.*"),
            '25.4.0': descMatch(".*已点赞.*"),
            '25.3.0': descMatch(".*已点赞.*"),
            '25.2.0': descMatch(".*已点赞.*"),
            '25.1.0': descMatch(".*已点赞.*"),
            '25.0.0': descMatch(".*已点赞.*"),
            '24.9.0': descMatch(".*已点赞.*"),
            '24.8.0': descMatch(".*已点赞.*"),
            '24.7.0': descMatch(".*已点赞.*"),
            '24.6.0': descMatch(".*已点赞.*"),
            '24.5.0': descMatch(".*已点赞.*"),
            '24.4.0': descMatch(".*已点赞.*"),
            '24.3.0': descMatch(".*已点赞.*"),
            '24.2.0': descMatch(".*已点赞.*"),
            '24.1.0': descMatch(".*已点赞.*"),
            '24.0.0': descMatch(".*已点赞.*"),
        },
        '点赞控件': {
            '25.7.0': descMatch(".*未点赞.*"),
            '25.6.0': descMatch(".*未点赞.*"),
            '25.5.0': descMatch(".*未点赞.*"),
            '25.4.0': descMatch(".*未点赞.*"),
            '25.3.0': descMatch(".*未点赞.*"),
            '25.2.0': descMatch(".*未点赞.*"),
            '25.1.0': descMatch(".*未点赞.*"),
            '25.0.0': descMatch(".*未点赞.*"),
            '24.9.0': descMatch(".*未点赞.*"),
            '24.8.0': descMatch(".*未点赞.*"),
            '24.7.0': descMatch(".*未点赞.*"),
            '24.6.0': descMatch(".*未点赞.*"),
            '24.5.0': descMatch(".*未点赞.*"),
            '24.4.0': descMatch(".*未点赞.*"),
            '24.3.0': descMatch(".*未点赞.*"),
            '24.2.0': descMatch(".*未点赞.*"),
            '24.1.0': descMatch(".*未点赞.*"),
            '24.0.0': descMatch(".*未点赞.*"),
        },
        '收藏': {
            '25.7.0': text("收藏"),
            '25.6.0': text("收藏"),
            '25.5.0': text("收藏"),
            '25.4.0': text("收藏"),
            '25.3.0': text("收藏"),
            '25.2.0': text("收藏"),
            '25.1.0': text("收藏"),
            '25.0.0': text("收藏"),
            '24.9.0': text("收藏"),
            '24.8.0': text("收藏"),
            '24.7.0': text("收藏"),
            '24.6.0': text("收藏"),
            '24.5.0': text("收藏"),
            '24.4.0': text("收藏"),
            '24.3.0': text("收藏"),
            '24.2.0': text("收藏"),
            '24.1.0': text("收藏"),
            '24.0.0': text("收藏"),
        },
        '评论区用户头像': {
            '25.7.0': descMatch(".*的头像.*"),
            '25.6.0': descMatch(".*的头像.*"),
            '25.5.0': descMatch(".*的头像.*"),
            '25.4.0': descMatch(".*的头像.*"),
            '25.3.0': descMatch(".*的头像.*"),
            '25.2.0': descMatch(".*的头像.*"),
            '25.1.0': descMatch(".*的头像.*"),
            '25.0.0': descMatch(".*的头像.*"),
            '24.9.0': descMatch(".*的头像.*"),
            '24.8.0': descMatch(".*的头像.*"),
            '24.7.0': descMatch(".*的头像.*"),
            '24.6.0': descMatch(".*的头像.*"),
            '24.5.0': descMatch(".*的头像.*"),
            '24.4.0': descMatch(".*的头像.*"),
            '24.3.0': descMatch(".*的头像.*"),
            '24.2.0': descMatch(".*的头像.*"),
            '24.1.0': descMatch(".*的头像.*"),
            '24.0.0': descMatch(".*的头像.*"),
        },
        '评论控件': {
            '25.7.0': descMatch(".*评论.*"),
            '25.6.0': descMatch(".*评论.*"),
            '25.5.0': descMatch(".*评论.*"),
            '25.4.0': descMatch(".*评论.*"),
            '25.3.0': descMatch(".*评论.*"),
            '25.2.0': descMatch(".*评论.*"),
            '25.1.0': descMatch(".*评论.*"),
            '25.0.0': descMatch(".*评论.*"),
            '24.9.0': descMatch(".*评论.*"),
            '24.8.0': descMatch(".*评论.*"),
            '24.7.0': descMatch(".*评论.*"),
            '24.6.0': descMatch(".*评论.*"),
            '24.5.0': descMatch(".*评论.*"),
            '24.4.0': descMatch(".*评论.*"),
            '24.3.0': descMatch(".*评论.*"),
            '24.2.0': descMatch(".*评论.*"),
            '24.1.0': descMatch(".*评论.*"),
            '24.0.0': descMatch(".*评论.*"),
        },
        '关注控件': {
            '25.7.0': desc("关注").visible(true),
            '25.6.0': desc("关注").visible(true),
            '25.5.0': desc("关注").visible(true),
            '25.4.0': desc("关注").visible(true),
            '25.3.0': desc("关注").visible(true),
            '25.2.0': desc("关注").visible(true),
            '25.1.0': desc("关注").visible(true),
            '25.0.0': desc("关注").visible(true),
            '24.9.0': desc("关注").visible(true),
            '24.8.0': desc("关注").visible(true),
            '24.7.0': desc("关注").visible(true),
            '24.6.0': desc("关注").visible(true),
            '24.5.0': desc("关注").visible(true),
            '24.4.0': desc("关注").visible(true),
            '24.3.0': desc("关注").visible(true),
            '24.2.0': desc("关注").visible(true),
            '24.1.0': desc("关注").visible(true),
            '24.0.0': desc("关注").visible(true),
        },
        //========


        '点击评论输入框发送': {
            '25.7.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.6.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.5.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.4.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.3.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.2.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.1.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '25.0.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.9.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.8.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.7.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.6.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.5.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.4.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.3.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.2.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.1.0': text("发送").pkg("com.ss.android.ugc.aweme"),
            '24.0.0': text("发送").pkg("com.ss.android.ugc.aweme"),
        },
        '点击评论输入框': {
            '25.7.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.6.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.5.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.4.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.3.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.2.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.1.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '25.0.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.9.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.8.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.7.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.6.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.5.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.4.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.3.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.2.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.1.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
            '24.0.0': clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme"),
        },
        '点赞评论收藏分享父控件': {
            '26.5.0': id("com.ss.android.ugc.aweme:id/riz"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/rfq"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/rep"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/q_a"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/q0d"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/qvx"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/qre"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/qnt"),
            '25.7.0': id("com.ss.android.ugc.aweme:id/qlx"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/qji"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/qk3"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/qhc"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/qd7"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/qd5"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/qa9"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p+m"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/p6l"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/p39"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/p49"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/p4l"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/p0t"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/pr1"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/poh"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/pic"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/oqt"),
        },
        '爱心表情_收藏': {//  爱心表情
            '25.7.0': desc("自定义表情"),
            '25.6.0': desc("自定义表情"),
            '25.5.0': desc("自定义表情"),
            '25.4.0': desc("自定义表情"),
            '25.3.0': desc("自定义表情"),
            '25.2.0': desc("自定义表情"),
            '25.1.0': desc("自定义表情"),
            '25.0.0': desc("自定义表情"),
            '24.9.0': desc("自定义表情"),
            '24.8.0': desc("自定义表情"),
            '24.7.0': desc("自定义表情"),
            '24.6.0': desc("自定义表情"),
            '24.5.0': desc("自定义表情"),
            '24.4.0': desc("自定义表情"),
            '24.3.0': desc("自定义表情"),
            '24.2.0': desc("自定义表情"),
            '24.1.0': desc("自定义表情"),
            '24.0.0': desc("自定义表情"),
        },
        '自定义表情1': {//  第一个收藏的表情
            '25.7.0': desc("自定义表情1, 按钮"),
            '25.6.0': desc("自定义表情1, 按钮"),
            '25.5.0': desc("自定义表情1, 按钮"),
            '25.4.0': desc("自定义表情1, 按钮"),
            '25.3.0': desc("自定义表情1, 按钮"),
            '25.2.0': desc("自定义表情1, 按钮"),
            '25.1.0': desc("自定义表情1, 按钮"),
            '25.0.0': desc("自定义表情1, 按钮"),
            '24.9.0': desc("自定义表情1, 按钮"),
            '24.8.0': desc("自定义表情1, 按钮"),
            '24.7.0': desc("自定义表情1, 按钮"),
            '24.6.0': desc("自定义表情1, 按钮"),
            '24.5.0': desc("自定义表情1, 按钮"),
            '24.4.0': desc("自定义表情1, 按钮"),
            '24.3.0': desc("自定义表情1, 按钮"),
            '24.2.0': desc("自定义表情1, 按钮"),
            '24.1.0': desc("自定义表情1, 按钮"),
            '24.0.0': desc("自定义表情1, 按钮"),
        },
        '同城_四宫格_用户名': {//  有的同城是四宫格的,点击第一个用户名 user_name
            '25.7.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/user_name"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/user_name"),
        },
        '评论_表情': {//  评论输入框表情
            '25.7.0': desc("表情"),
            '25.6.0': desc("表情"),
            '25.5.0': desc("表情"),
            '25.4.0': desc("表情"),
            '25.3.0': desc("表情"),
            '25.2.0': desc("表情"),
            '25.1.0': desc("表情"),
            '25.0.0': desc("表情"),
            '24.9.0': desc("表情"),
            '24.8.0': desc("表情"),
            '24.7.0': desc("表情"),
            '24.6.0': desc("表情"),
            '24.5.0': desc("表情"),
            '24.4.0': desc("表情"),
            '24.3.0': desc("表情"),
            '24.2.0': desc("表情"),
            '24.1.0': desc("表情"),
            '24.0.0': desc("表情"),
        },
        '点击评论区所有爱心': {//  赞0,未选中
            '25.7.0': descMatch('^赞.*未选中$'),
            '25.6.0': descMatch('^赞.*未选中$'),
            '25.5.0': descMatch('^赞.*未选中$'),
            '25.4.0': descMatch('^赞.*未选中$'),
            '25.3.0': descMatch('^赞.*未选中$'),
            '25.2.0': descMatch('^赞.*未选中$'),
            '25.1.0': descMatch('^赞.*未选中$'),
            '25.0.0': descMatch('^赞.*未选中$'),
            '24.9.0': descMatch('^赞.*未选中$'),
            '24.8.0': descMatch('^赞.*未选中$'),
            '24.7.0': descMatch('^赞.*未选中$'),
            '24.6.0': descMatch('^赞.*未选中$'),
            '24.5.0': descMatch('^赞.*未选中$'),
            '24.4.0': descMatch('^赞.*未选中$'),
            '24.3.0': descMatch('^赞.*未选中$'),
            '24.2.0': descMatch('^赞.*未选中$'),
            '24.1.0': descMatch('^赞.*未选中$'),
            '24.0.0': descMatch('^赞.*未选中$'),
        },
        '点击第一个作品': {
            '25.7.0': descMatch(".*点赞数.*"),
            '25.6.0': descMatch(".*点赞数.*"),
            '25.5.0': descMatch(".*点赞数.*"),
            '25.4.0': descMatch(".*点赞数.*"),
            '25.3.0': descMatch(".*点赞数.*"),
            '25.2.0': descMatch(".*点赞数.*"),
            '25.1.0': descMatch(".*点赞数.*"),
            '25.0.0': descMatch(".*点赞数.*"),
            '24.9.0': descMatch(".*点赞数.*"),
            '24.8.0': descMatch(".*点赞数.*"),
            '24.7.0': descMatch(".*点赞数.*"),
            '24.6.0': descMatch(".*点赞数.*"),
            '24.5.0': descMatch(".*点赞数.*"),
            '24.4.0': descMatch(".*点赞数.*"),
            '24.3.0': descMatch(".*点赞数.*"),
            '24.2.0': descMatch(".*点赞数.*"),
            '24.1.0': descMatch(".*点赞数.*"),
            '24.0.0': descMatch(".*点赞数.*"),
        },
        '作品列表': {
            '25.7.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout"),
        },
        '作品发布时间': {
            '25.7.0': descMatch("发布时间："),
            '25.6.0': descMatch("发布时间："),
            '25.5.0': descMatch("发布时间："),
            '25.4.0': descMatch("发布时间："),
            '25.3.0': descMatch("发布时间："),
            '25.2.0': descMatch("发布时间："),
            '25.1.0': descMatch("发布时间："),
            '25.0.0': descMatch("发布时间："),
            '24.9.0': descMatch("发布时间："),
            '24.8.0': descMatch("发布时间："),
            '24.7.0': descMatch("发布时间："),
            '24.6.0': descMatch("发布时间："),
            '24.5.0': descMatch("发布时间："),
            '24.4.0': descMatch("发布时间："),
            '24.3.0': descMatch("发布时间："),
            '24.2.0': descMatch("发布时间："),
            '24.1.0': descMatch("发布时间："),
            '24.0.0': descMatch("发布时间："),
            '23.0.0': descMatch("发布时间："),
        },
        '最新': {
            '25.7.0': text("最新"),
            '25.6.0': text("最新"),
            '25.5.0': text("最新"),
            '25.4.0': text("最新"),
            '25.3.0': text("最新"),
            '25.2.0': text("最新"),
            '25.1.0': text("最新"),
            '25.0.0': text("最新"),
            '24.9.0': text("最新"),
            '24.8.0': text("最新"),
            '24.7.0': text("最新"),
            '24.6.0': text("最新"),
            '24.5.0': text("最新"),
            '24.4.0': text("最新"),
            '24.3.0': text("最新"),
            '24.2.0': text("最新"),
            '24.1.0': text("最新"),
            '24.0.0': text("最新"),
        },
        '获取作品数量': {
            '25.7.0': textMatch(".*作品.*"),
            '25.6.0': textMatch(".*作品.*"),
            '25.5.0': textMatch(".*作品.*"),
            '25.4.0': textMatch(".*作品.*"),
            '25.3.0': textMatch(".*作品.*"),
            '25.2.0': textMatch(".*作品.*"),
            '25.1.0': textMatch(".*作品.*"),
            '25.0.0': textMatch(".*作品.*"),
            '24.9.0': textMatch(".*作品.*"),
            '24.8.0': textMatch(".*作品.*"),
            '24.7.0': textMatch(".*作品.*"),
            '24.6.0': textMatch(".*作品.*"),
            '24.5.0': textMatch(".*作品.*"),
            '24.4.0': textMatch(".*作品.*"),
            '24.3.0': textMatch(".*作品.*"),
            '24.2.0': textMatch(".*作品.*"),
            '24.1.0': textMatch(".*作品.*"),
            '24.0.0': textMatch(".*作品.*"),
            '23.0.0': textMatch(".*作品.*"),
        },
        '作品数量0': {
            '25.7.0': text("作品 0"),
            '25.6.0': text("作品 0"),
            '25.5.0': text("作品 0"),
            '25.4.0': text("作品 0"),
            '25.3.0': text("作品 0"),
            '25.2.0': text("作品 0"),
            '25.1.0': text("作品 0"),
            '25.0.0': text("作品 0"),
            '24.9.0': text("作品 0"),
            '24.8.0': text("作品 0"),
            '24.7.0': text("作品 0"),
            '24.6.0': text("作品 0"),
            '24.5.0': text("作品 0"),
            '24.4.0': text("作品 0"),
            '24.3.0': text("作品 0"),
            '24.2.0': text("作品 0"),
            '24.1.0': text("作品 0"),
            '24.0.0': text("作品 0"),
        },
        '私密账号': {
            '25.7.0': text("私密账号"),
            '25.6.0': text("私密账号"),
            '25.5.0': text("私密账号"),
            '25.4.0': text("私密账号"),
            '25.3.0': text("私密账号"),
            '25.2.0': text("私密账号"),
            '25.1.0': text("私密账号"),
            '25.0.0': text("私密账号"),
            '24.9.0': text("私密账号"),
            '24.8.0': text("私密账号"),
            '24.7.0': text("私密账号"),
            '24.6.0': text("私密账号"),
            '24.5.0': text("私密账号"),
            '24.4.0': text("私密账号"),
            '24.3.0': text("私密账号"),
            '24.2.0': text("私密账号"),
            '24.1.0': text("私密账号"),
            '24.0.0': text("私密账号"),
        },
        '主页用户昵称': {
            '25.7.0': descMatch("复制名字"),
            '25.6.0': descMatch("复制名字"),
            '25.5.0': descMatch("复制名字"),
            '25.4.0': descMatch("复制名字"),
            '25.3.0': descMatch("复制名字"),
            '25.2.0': descMatch("复制名字"),
            '25.1.0': descMatch("复制名字"),
            '25.0.0': descMatch("复制名字"),
            '24.9.0': descMatch("复制名字"),
            '24.8.0': descMatch("复制名字"),
            '24.7.0': descMatch("复制名字"),
            '24.6.0': descMatch("复制名字"),
            '24.5.0': descMatch("复制名字"),
            '24.4.0': descMatch("复制名字"),
            '24.3.0': descMatch("复制名字"),
            '24.2.0': descMatch("复制名字"),
            '24.1.0': descMatch("复制名字"),
            '24.0.0': descMatch("复制名字"),
            '23.0.0': descMatch("复制名字"),
        },
        '获取粉丝数量': {//粉丝数量,显示主页多少粉丝
            '26.5.0': id("com.ss.android.ugc.aweme:id/x-r"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/x7f"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/x5r"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/xvb"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/xb0"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/w8s"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/w28"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/wx7"),
            '25.7.0': id("com.ss.android.ugc.aweme:id/wvu"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/ws0"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/wuh"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/wpw"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/wlp"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/wlq"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/whm"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/we="),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/v=_"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/v8x"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/v=v"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/v=y"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/v5x"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/vvn"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/vq7"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/vki"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/vd="),
            '23.0.0': id("com.ss.android.ugc.aweme:id/t3-"),
        },
        '关注数量': {//粉丝数量,显示主页多少粉丝
            '25.7.0': id("com.ss.android.ugc.aweme:id/wvu"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/wsw"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/wuh"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/wpw"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/wlp"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/wlq"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/whm"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/we="),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/v=_"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/v8x"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/v=v"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/v=y"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/v5x"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/vvn"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/vq7"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/vki"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/vd="),
            '23.0.0': id("com.ss.android.ugc.aweme:id/t3-"),
        },
        '粉丝列表所有用户': { //昵称
            '26.5.0': id("com.ss.android.ugc.aweme:id/xtj"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/xo7"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/xne"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/xc0"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/wxn"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/wq7"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/wlo"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/wgo"),
            '25.7.0': id("com.ss.android.ugc.aweme:id/wec"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/wbo"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/wc="),
            '25.4.0': id("com.ss.android.ugc.aweme:id/v-n"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/v8g"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/v8j"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/v4g"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/v19"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/vz0"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/vua"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/vr0"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/vty"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/vt2"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/vo4"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/vew"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/vad"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/u70"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/u1u"),
        },
        '粉丝列表界面': {//粉丝列表最上面昵称
            '26.5.0': id("com.ss.android.ugc.aweme:id/bi"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/bi"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/bi"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/bi"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/bi"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/bj"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/bj"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/bj"),
            '25.7.0': id("com.ss.android.ugc.aweme:id/bj"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/bj"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/bi"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/bi"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/bi"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/bi"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/bi"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/bi"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/bj"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/bj"),
        },
        '当前无网络': {
            '25.7.0': textMatch(".*当前无网络.*"),
            '25.6.0': textMatch(".*当前无网络.*"),
            '25.5.0': textMatch(".*当前无网络.*"),
            '25.4.0': textMatch(".*当前无网络.*"),
            '25.3.0': textMatch(".*当前无网络.*"),
            '25.2.0': textMatch(".*当前无网络.*"),
            '25.1.0': textMatch(".*当前无网络.*"),
            '25.0.0': textMatch(".*当前无网络.*"),
            '24.9.0': textMatch(".*当前无网络.*"),
            '24.8.0': textMatch(".*当前无网络.*"),
            '24.7.0': textMatch(".*当前无网络.*"),
            '24.6.0': textMatch(".*当前无网络.*"),
            '24.5.0': textMatch(".*当前无网络.*"),
            '24.4.0': textMatch(".*当前无网络.*"),
            '24.3.0': textMatch(".*当前无网络.*"),
            '24.2.0': textMatch(".*当前无网络.*"),
            '24.1.0': textMatch(".*当前无网络.*"),
            '24.0.0': textMatch(".*当前无网络.*"),
        },
        '点击粉丝': {
            '25.7.0': text("粉丝"),
            '25.6.0': text("粉丝"),
            '25.5.0': text("粉丝"),
            '25.4.0': text("粉丝"),
            '25.3.0': text("粉丝"),
            '25.2.0': text("粉丝"),
            '25.1.0': text("粉丝"),
            '25.0.0': text("粉丝"),
            '24.9.0': text("粉丝"),
            '24.8.0': text("粉丝"),
            '24.7.0': text("粉丝"),
            '24.6.0': text("粉丝"),
            '24.5.0': text("粉丝"),
            '24.4.0': text("粉丝"),
            '24.3.0': text("粉丝"),
            '24.2.0': text("粉丝"),
            '24.1.0': text("粉丝"),
            '24.0.0': text("粉丝"),
        },
        '主页_关注': { // 要用id,text和desc容易误判
            '26.5.0': id("com.ss.android.ugc.aweme:id/qbe"),
            '26.4.0': id("com.ss.android.ugc.aweme:id/p-p"),
            '26.3.0': id("com.ss.android.ugc.aweme:id/p=9"),
            '26.2.0': id("com.ss.android.ugc.aweme:id/p3y"),
            '26.1.0': id("com.ss.android.ugc.aweme:id/ptc"),
            '26.0.0': id("com.ss.android.ugc.aweme:id/po9"),
            '25.9.0': id("com.ss.android.ugc.aweme:id/pk_"),
            '25.8.0': id("com.ss.android.ugc.aweme:id/phr"),
            '25.7.0': text("关注").id("com.ss.android.ugc.aweme:id/pf2"),
            '25.6.0': text("关注").id("com.ss.android.ugc.aweme:id/pck"),
            '25.5.0': text("关注").id("com.ss.android.ugc.aweme:id/pck"),
            '25.4.0': text("关注").id("com.ss.android.ugc.aweme:id/pck"),
            '25.3.0': text("关注").id("com.ss.android.ugc.aweme:id/o+j"),
            '25.2.0': text("关注").id("com.ss.android.ugc.aweme:id/o+d"),
            '25.1.0': text("关注").id("com.ss.android.ugc.aweme:id/o=p"),
            '25.0.0': text("关注").id("com.ss.android.ugc.aweme:id/o89"),
            '24.9.0': text("关注"),
            '24.8.0': text("关注"),
            '24.7.0': text("关注"),
            '24.6.0': text("关注"),
            '24.5.0': text("关注"),
            '24.4.0': text("关注"),
            '24.3.0': text("关注"),
            '24.2.0': text("关注"),
            '24.1.0': text("关注"),
            '24.0.0': text("关注"),
        },
        '关注': {
            '25.7.0': textMatch(".*关注.*"),
            '25.6.0': textMatch(".*关注.*"),
            '25.5.0': textMatch(".*关注.*"),
            '25.4.0': textMatch(".*关注.*"),
            '25.3.0': textMatch(".*关注.*"),
            '25.2.0': textMatch(".*关注.*"),
            '25.1.0': textMatch(".*关注.*"),
            '25.0.0': textMatch(".*关注.*"),
            '24.9.0': textMatch(".*关注.*"),
            '24.8.0': textMatch(".*关注.*"),
            '24.7.0': textMatch(".*关注.*"),
            '24.6.0': textMatch(".*关注.*"),
            '24.5.0': textMatch(".*关注.*"),
            '24.4.0': textMatch(".*关注.*"),
            '24.3.0': textMatch(".*关注.*"),
            '24.2.0': textMatch(".*关注.*"),
            '24.1.0': textMatch(".*关注.*"),
            '24.0.0': textMatch(".*关注.*"),
        },
        '搜索_用户_关注按钮': {
            '25.7.0': text("关注按钮"),
            '25.6.0': text("关注按钮"),
            '25.5.0': text("关注按钮"),
            '25.4.0': text("关注按钮"),
            '25.3.0': text("关注按钮"),
            '25.2.0': text("关注按钮"),
            '25.1.0': text("关注按钮"),
            '25.0.0': text("关注按钮"),
            '24.9.0': text("关注按钮"),
            '24.8.0': text("关注按钮"),
            '24.7.0': text("关注按钮"),
            '24.6.0': text("关注按钮"),
            '24.5.0': text("关注按钮"),
            '24.4.0': text("关注按钮"),
            '24.3.0': text("关注按钮"),
            '24.2.0': text("关注按钮"),
            '24.1.0': text("关注按钮"),
            '24.0.0': text("关注按钮"),
        },
        '主页_三个点_抖音号': {
            '25.1.0': id("com.ss.android.ugc.aweme:id/p37"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p2m"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/pvo"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/o-g"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/o8j"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/n6n"),
        },
        '取消': {
            '25.1.0': id("com.ss.android.ugc.aweme:id/p37"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p2m"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/pvo"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/o-g"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/o8j"),
            '23.0.0': text("取消"),
        },
        '附近美食': {
            '25.1.0': id("com.ss.android.ugc.aweme:id/p37"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p2m"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/pvo"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/o-g"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/o8j"),
            '23.0.0': text("附近美食 按钮"),
        },
        '主页_蓝V': {
            '25.1.0': id("com.ss.android.ugc.aweme:id/p37"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p2m"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/pvo"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/vk8"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/vew"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/t4z"),
        },
        '主页_三个点_昵称': {
            '25.1.0': id("com.ss.android.ugc.aweme:id/p35"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/p2k"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/p0a"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/pvm"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/o-e"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/o8h"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/n6l"),
        },
        '团购_取消': {
            '25.0.0': text("取消"),
            '24.9.0': text("取消"),
            '24.8.0': text("取消"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': text("取消"),
            '24.0.0': text("取消"),
            '23.0.0': text("取消"),
        },
        '团购_暂时没有更多了': {

            '25.0.0': text("暂时没有更多了"),
            '24.9.0': text("暂时没有更多了"),
            '24.8.0': text("暂时没有更多了"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': text("暂时没有更多了"),
            '24.0.0': text("暂时没有更多了"),
            '23.0.0': text("暂时没有更多了"),
        },
        '抖音号': {
            '25.7.0': textMatch(".*抖音号：.*"),
            '25.6.0': textMatch(".*抖音号：.*"),
            '25.5.0': textMatch(".*抖音号：.*"),
            '25.4.0': textMatch(".*抖音号：.*"),
            '25.3.0': textMatch(".*抖音号：.*"),
            '25.2.0': textMatch(".*抖音号：.*"),
            '25.1.0': textMatch(".*抖音号：.*"),
            '25.0.0': textMatch(".*抖音号：.*"),
            '24.9.0': textMatch(".*抖音号：.*"),
            '24.8.0': textMatch(".*抖音号：.*"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': textMatch(".*抖音号：.*"),
            '24.0.0': textMatch(".*抖音号：.*"),
        },
        '搜索结果粉丝': {
            '25.7.0': textMatch(".*粉丝:.*"),
            '25.6.0': textMatch(".*粉丝:.*"),
            '25.5.0': textMatch(".*粉丝:.*"),
            '25.4.0': textMatch(".*粉丝:.*"),
            '25.3.0': textMatch(".*粉丝:.*"),
            '25.2.0': textMatch(".*粉丝:.*"),
            '25.1.0': textMatch(".*粉丝:.*"),
            '25.0.0': textMatch(".*粉丝:.*"),
            '24.9.0': textMatch(".*粉丝:.*"),
            '24.8.0': textMatch(".*粉丝:.*"),
            '24.7.0': textMatch(".*粉丝:.*"),
            '24.6.0': textMatch(".*粉丝:.*"),
            '24.5.0': textMatch(".*粉丝:.*"),
            '24.4.0': textMatch(".*粉丝:.*"),
            '24.3.0': textMatch(".*粉丝:.*"),
            '24.2.0': textMatch(".*粉丝:.*"),
            '24.1.0': textMatch(".*粉丝:.*"),
            '24.0.0': textMatch(".*粉丝:.*"),
        },
        '点击搜索结果抖音号': {
            '25.7.0': textMatch(".*抖音号：.*"),
            '25.6.0': textMatch(".*抖音号：.*"),
            '25.5.0': textMatch(".*抖音号：.*"),
            '25.4.0': textMatch(".*抖音号：.*"),
            '25.3.0': textMatch(".*抖音号：.*"),
            '25.2.0': textMatch(".*抖音号：.*"),
            '25.1.0': textMatch(".*抖音号：.*"),
            '25.0.0': textMatch(".*抖音号：.*"),
            '24.9.0': textMatch(".*抖音号：.*"),
            '24.8.0': textMatch(".*抖音号：.*"),
            '24.7.0': textMatch(".*抖音号：.*"),
            '24.6.0': textMatch(".*抖音号：.*"),
            '24.5.0': textMatch(".*抖音号：.*"),
            '24.4.0': textMatch(".*抖音号：.*"),
            '24.3.0': textMatch(".*抖音号：.*"),
            '24.2.0': textMatch(".*抖音号：.*"),
            '24.1.0': textMatch(".*抖音号：.*"),
            '24.0.0': textMatch(".*抖音号：.*"),
        },
        '综合_用户': {
            '25.7.0': text("用户").desc("用户"),
            '25.6.0': text("用户").desc("用户"),
            '25.5.0': text("用户").desc("用户"),
            '25.4.0': text("用户").desc("用户"),
            '25.3.0': text("用户").desc("用户"),
            '25.2.0': text("用户").desc("用户"),
            '25.1.0': text("用户").desc("用户"),
            '25.0.0': text("用户").desc("用户"),
            '24.9.0': text("用户").desc("用户"),
            '24.8.0': text("用户").desc("用户"),
            '24.7.0': text("用户").desc("用户"),
            '24.6.0': text("用户").desc("用户"),
            '24.5.0': text("用户").desc("用户"),
            '24.4.0': text("用户").desc("用户"),
            '24.3.0': text("用户").desc("用户"),
            '24.2.0': text("用户").desc("用户"),
            '24.1.0': text("用户").desc("用户"),
            '24.0.0': text("用户").desc("用户"),
        },
        '综合_搜索结果_反馈入口': {
            '25.7.0': desc("反馈入口"),
            '25.6.0': desc("反馈入口"),
            '25.5.0': desc("反馈入口"),
            '25.4.0': desc("反馈入口"),
            '25.3.0': desc("反馈入口"),
            '25.2.0': desc("反馈入口"),
            '25.1.0': desc("反馈入口"),
            '25.0.0': desc("反馈入口"),
            '24.9.0': desc("反馈入口"),
            '24.8.0': desc("反馈入口"),
            '24.7.0': desc("反馈入口"),
            '24.6.0': desc("反馈入口"),
            '24.5.0': desc("反馈入口"),
            '24.4.0': desc("反馈入口"),
            '24.3.0': desc("反馈入口"),
            '24.2.0': desc("反馈入口"),
            '24.1.0': desc("反馈入口"),
            '24.0.0': desc("反馈入口"),
        },
        '用户': {
            '25.7.0': text("用户").clz("android.widget.Button"),
            '25.6.0': text("用户").clz("android.widget.Button"),
            '25.5.0': text("用户").clz("android.widget.Button"),
            '25.4.0': text("用户").clz("android.widget.Button"),
            '25.3.0': text("用户").clz("android.widget.Button"),
            '25.2.0': text("用户").clz("android.widget.Button"),
            '25.1.0': text("用户").clz("android.widget.Button"),
            '25.0.0': text("用户").clz("android.widget.Button"),
            '24.9.0': text("用户").clz("android.widget.Button"),
            '24.8.0': text("用户").clz("android.widget.Button"),
            '24.7.0': text("用户").clz("android.widget.Button"),
            '24.6.0': text("用户").clz("android.widget.Button"),
            '24.5.0': text("用户").clz("android.widget.Button"),
            '24.4.0': text("用户").clz("android.widget.Button"),
            '24.3.0': text("用户").clz("android.widget.Button"),
            '24.2.0': text("用户").clz("android.widget.Button"),
            '24.1.0': text("用户").clz("android.widget.Button"),
            '24.0.0': text("用户").clz("android.widget.Button"),
        },
        '点击搜索按钮': {
            '25.7.0': desc("搜索"),
            '25.6.0': desc("搜索"),
            '25.5.0': desc("搜索"),
            '25.4.0': desc("搜索"),
            '25.3.0': desc("搜索"),
            '25.2.0': desc("搜索"),
            '25.1.0': desc("搜索"),
            '25.0.0': desc("搜索"),
            '24.9.0': desc("搜索"),
            '24.8.0': desc("搜索"),
            '24.7.0': desc("搜索"),
            '24.6.0': desc("搜索"),
            '24.5.0': desc("搜索"),
            '24.4.0': desc("搜索"),
            '24.3.0': desc("搜索"),
            '24.2.0': desc("搜索"),
            '24.1.0': desc("搜索"),
            '24.0.0': desc("搜索"),
        },
        '同城_团购_搜索放大镜': {
            '25.7.0': desc("搜索"),
            '25.6.0': desc("搜索"),
            '25.5.0': desc("搜索"),
            '25.4.0': desc("搜索"),
            '25.3.0': desc("搜索"),
            '25.2.0': desc("搜索"),
            '25.1.0': desc("搜索"),
            '25.0.0': desc("搜索"),
            '24.9.0': desc("搜索"),
            '24.8.0': desc("搜索"),
            '24.7.0': desc("搜索"),
            '24.6.0': desc("搜索"),
            '24.5.0': desc("搜索"),
            '24.4.0': desc("搜索"),
            '24.3.0': desc("搜索"),
            '24.2.0': desc("搜索"),
            '24.1.0': desc("搜索"),
            '24.0.0': desc("搜索"),
            '23.0.0': text("搜索").clz("android.widget.Button"),
        },
        '点击搜索框': {
            '25.7.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.6.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.5.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.4.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.3.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.2.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.1.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '25.0.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.9.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.8.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.7.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.6.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.5.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.4.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.3.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.2.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.1.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '24.0.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
            '23.0.0': id("com.ss.android.ugc.aweme:id/et_search_kw"),
        },
    },

    打开抖音: function () {
        fun.保持屏幕唤醒状态()
        utils.openAppByName("抖音");
    },

    评论区用户头像点赞: function () {

        let 超时秒数 = 80
        let 起始时间 = fun.获取时间().秒

        logd('评论区用户头像点赞')

        while (true) {

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('评论区用户头像点赞,' + '任务超时')
                return null
            }

            fun.强制刷新节点()

            let re = id("com.smile.gifmaker:id/comment_like").getNodeInfo(0)
            if (re) {
                logd('找到集合:' + 提示信息)
                for (let i = 0; i < re.length; i++) {
                    //logd(re[i]);
                    clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
                    // this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
                    sleep(1000)
                }
                // fun.释放节点的锁()
                return re
            }
            logd('没找到:' + 提示信息)
            // fun.释放节点的锁()
            return null

        }
    },

    往右滑动寻找用户: function () {

        let 超时秒数 = 20
        let 起始时间 = fun.获取时间().秒

        logd('往右滑动寻找用户')

        while (true) {

            if (this.点击搜索结果抖音号() || this.粉丝列表所有用户()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                if (fun.抖音.搜索按钮()) {
                    fun.纵向滑动屏幕(0.7, 0)
                    sleep(3000);
                }

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('往右滑动寻找用户,' + '任务超时')
                return null
            }

        }
    },

    下拉点击综合_抖音号_粉丝: function () { //下一步是操作粉丝列表用户,所有只要等在这里就行

        let 超时秒数 = 20
        let 起始时间 = fun.获取时间().秒

        logd('下拉点击综合_抖音号_粉丝')

        while (true) {

            if (this.点击搜索结果抖音号() || this.粉丝列表所有用户()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                if (fun.抖音.搜索按钮()) {
                    fun.纵向滑动屏幕(0.7, 0)
                    sleep(3000);
                }

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('下拉点击综合_抖音号_粉丝,' + '任务超时')
                return null
            }

        }
    },

    进入指定同城: function () {

        logd('mk进入指定同城')

        let 超时秒数 = 25 // 走一遍就行
        let 起始时间 = fun.获取时间().秒

        while (true) {

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('mk进入指定同城,' + '任务超时')
                // toast('mk进入指定同城,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            function 获取ui指定同城() {
                try {
                    let 配置对象 = readConfigString("jsonCfg")
                    配置对象 = JSON.parse(配置对象)
                    let 指定同城 = 配置对象.同城引流_指定同城 + ''
                    if (指定同城 && !(指定同城 === '')) {
                        return 指定同城
                    }
                } catch (error) {
                    loge('获取ui指定同城:' + error);
                    return
                }
            }

            let 城市 = 获取ui指定同城() //fun.读取文本('/sdcard/城市.txt')

            if (!城市) {
                return
            }

            fun.抖音.点击同城切换城市()

            if (fun.抖音.点击同城切换城市输入框()) {
                inputText(clz("android.widget.EditText"), 城市)
                sleep(2000);
                if (fun.抖音.点击同城第一个搜索结果()) {
                    sleep(2000);
                    return true
                }
            }

        }

    },
    私信给朋友: function () {
        let 提示信息 = '私信给朋友'
        //logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = text("私信给朋友").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        //logd('没找到:' + 提示信息)
        return null

    },
    同城下滑视频_检测异常界面: function () {

        logd('同城下滑视频_检测异常界面')

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('同城下滑视频_检测异常界面,' + '任务超时')
                // toast('同城下滑视频_检测异常界面,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            模块.抖音.点击关闭评论()
            模块.纵向滑动屏幕(0.8, 0)
            sleep(2000)
            // keepNode(true)
            模块.抖音.点击关闭评论()

            if (模块.抖音.播放速度()) {
                back()
                sleep(2000);
            }

            if (模块.抖音.获取粉丝数量()) {
                模块.抖音.点击左上角返回()
            }

            if (fun.抖音.首页()) {
                return true
            }


        }


    },
    播放速度: function () {
        let 提示信息 = '播放速度'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = text("播放速度").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    转发: function () {
        let 提示信息 = '转发'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = text("转发").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    推荐给朋友: function () {
        let 提示信息 = '推荐给朋友'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = textMatch("推荐给朋友").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击左上返回: function () {
        let 提示信息 = '左上返回'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = id("com.ss.android.ugc.aweme:id/back_btn").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击同城第一个搜索结果: function () {
        let 提示信息 = '同城第一个搜索结果'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = text("自动定位").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击同城切换城市输入框: function () {
        let 提示信息 = '同城切换城市输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = id("com.ss.android.ugc.aweme:id/et_search_kw").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击同城切换城市: function () {
        let 提示信息 = '同城切换城市'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.同城切换城市[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_主页_分享: function () {
        let 提示信息 = '抖音火山_主页_分享'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_主页_分享[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_用户: function () {
        let 提示信息 = '抖音火山_用户'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_用户[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_搜索按钮: function () {
        let 提示信息 = '抖音火山_搜索按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_搜索按钮[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_搜索编辑框: function () {
        let 提示信息 = '抖音火山_搜索编辑框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_搜索编辑框[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_搜索放大镜: function () {
        let 提示信息 = '抖音火山_搜索放大镜'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_搜索放大镜[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回抖音火山_搜索放大镜: function () {

        logd('返回抖音火山_搜索放大镜')

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回抖音火山_搜索放大镜,' + '任务超时')
                toast('返回抖音火山_搜索放大镜,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (this.抖音火山_搜索放大镜()) {
                return true
            }

            back()
            sleep(this.点击延时);

        }


    },
    返回抖音火山_搜索放大镜: function () {

        logd('返回抖音火山_搜索放大镜')

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回抖音火山_搜索放大镜,' + '任务超时')
                toast('返回抖音火山_搜索放大镜,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (this.抖音火山_搜索放大镜()) {
                return true
            }

            back()
            sleep(this.点击延时);

        }


    },
    点击抖音火山_搜索放大镜: function () {
        let 提示信息 = '抖音火山_搜索放大镜'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_搜索放大镜[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_同意: function () {
        let 提示信息 = '抖音火山_同意'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_同意[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击左上角返回: function () {
        let 提示信息 = '点击左上角返回'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = id("com.ss.android.ugc.aweme:id/back_btn").desc("返回").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击进入直播间按钮: function () {
        let 提示信息 = '点击进入直播间按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("点击进入直播间按钮").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击关闭评论: function () {
        let 提示信息 = '关闭评论'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("关闭").id("com.ss.android.ugc.aweme:id/back_btn").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    粉丝0_粉丝列表: function () {
        let 提示信息 = '粉丝0_粉丝列表'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("粉丝 0").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    您今日的搜索次数已达上限: function () {
        let 提示信息 = '您今日的搜索次数已达上限'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("您今日的搜索次数已达上限").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    没有搜到相关的内容: function () {
        let 提示信息 = '没有搜到相关的内容'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("没有搜到相关的内容").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    拖动滑块完成拼图: function () {
        let 提示信息 = '拖动滑块完成拼图'
        // logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch("拖动滑块，完成拼图").getOneNodeInfo(0)
        if (re) {
            // logd('找到:' + 提示信息)
            return re
        }
        // logd('没找到:' + 提示信息)
        return null

    },
    依次点击文字: function () {
        let 提示信息 = '依次点击文字'
        // logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch("依次点击文字:").getOneNodeInfo(0)
        if (re) {
            // logd('找到:' + 提示信息)
            return re
        }
        // logd('没找到:' + 提示信息)
        return null

    },
    请完成下列验证: function () {
        let 提示信息 = '请完成下列验证'
        // logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("请完成下列验证后继续:").getOneNodeInfo(0)
        if (re) {
            // logd('找到:' + 提示信息)
            return re
        }
        // logd('没找到:' + 提示信息)
        return null

    },
    首页: function () {
        let 提示信息 = '首页'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("首页").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回抖音首页: function () {

        let 超时秒数 = 30
        let 起始时间 = fun.获取时间().秒

        logd('返回抖音首页')

        while (true) {

            keepNode(true)
            if (this.点击关闭评论()) {
                sleep(this.点击延时)
                releaseNode()
                return true
            }

            // keepNode(true)
            if (this.首页()) {
                releaseNode()
                return true
            }

            // 下面的代码必须在最下面,否则back以后锁定会出问题
            // keepNode(true)
            if (!this.点击关闭评论()) {
                logd('按下返回');
                back()  //这个是个危险操作,很容易返回过头,导致不再抖音同城界面
                sleep(2500)
            } else {
                sleep(this.点击延时)
                releaseNode()
                return true
            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回抖音首页,' + '任务超时')
                releaseNode()
                return null
            }

        }
    },
    点击点赞: function () {
        let 提示信息 = '点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("点赞").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击用户头像: function () {
        let 提示信息 = '用户头像'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("用户头像").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    直播间_来了: function () { //   * 微微一笑 来了
        let 提示信息 = '直播间_来了'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取节点集合
        let re = textMatch(".*来了.*").getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            let 最后一个来了 = re[re.length - 1].text
            最后一个来了 = 最后一个来了.split(' 来了')
            最后一个来了 = 最后一个来了[0]
            logd('最后一个来了:' + 最后一个来了)
            return 最后一个来了
        }
        logd('没找到:' + 提示信息)
        return null

    },
    直播间_收到礼物: function () {
        let 提示信息 = '直播间_收到礼物'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取节点集合
        let re = descMatch(".*送出.*").getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            let 最后一个收到礼物 = re[re.length - 1].text
            logd('最后一个收到礼物:' + 最后一个收到礼物)
            return 最后一个收到礼物
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击直播间_发送: function () {
        let 提示信息 = '直播间_发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("发送").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击直播间_评论输入框: function () {
        let 提示信息 = '直播间_评论输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = clz("android.widget.EditText").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击直播间_评论: function () {
        let 提示信息 = '直播间_评论'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("评论").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击直播间_更多: function () {
        let 提示信息 = '直播间_更多'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("更多面板 按钮").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            // re.click()
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回个人主页: function () {

        let 超时秒数 = 20
        let 起始时间 = fun.获取时间().秒

        logd('返回个人主页')

        while (true) {

            if (this.作品列表()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回个人主页,' + '任务超时')
                return null
            }

        }
    },
    返回评论界面: function () {

        let 超时秒数 = 30
        let 起始时间 = fun.获取时间().秒

        logd('返回评论界面')

        while (true) {

            if (this.评论区所有用户头像() || this.首页()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回评论界面,' + '任务超时')
                return null
            }

        }
    },
    返回粉丝列表: function () {

        let 超时秒数 = 30
        let 起始时间 = fun.获取时间().秒

        logd('返回粉丝列表')

        while (true) {

            if (this.粉丝列表界面()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                if (fun.获取设备id() === 'e4df750f0adcb6ce') {
                    //
                    fun.抖音.点击左上返回()
                } else {
                    back()
                }
                // back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回粉丝列表,' + '任务超时')
                return null
            }

        }
    },
    计算百分比概率: function (a) {
        logd('计算百分比概率')

        let 概率值 = a * 1
        logd('概率值:' + 概率值)
        if (概率值 == 0) {
            logd('概率值:' + 概率值 + ',不执行任何操作')
            return null
        }
        let 随机整数 = random(0, 100)
        logd('随机整数:' + 随机整数)
        if (概率值 >= 随机整数) {
            return true
        } else {
            return null
        }
    },
    点击评论输入框发送: function () {
        let 提示信息 = '点击评论输入框发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("发送").pkg("com.ss.android.ugc.aweme").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            re = re.parent()
            if (!re) {
                logd('没找到:' + 提示信息 + '的父控件')
                return null
            }
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    猪蹄_点击评论输入框发送: function () {
        let 提示信息 = '猪蹄_点击评论输入框发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = id("com.ss.android.ugc.aweme:id/c_a").text("发送").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            logd((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    评论_表情: function () {
        let 提示信息 = '评论_表情'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("表情").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击同城_四宫格_用户名: function () {
        let 提示信息 = '同城_四宫格_用户名'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = id("com.ss.android.ugc.aweme:id/user_name").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击自定义表情1: function () {
        let 提示信息 = '自定义表情1'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("自定义表情1, 按钮").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击评论_表情: function () {
        let 提示信息 = '评论_表情'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("表情").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击爱心表情_收藏: function () {
        let 提示信息 = '爱心表情_收藏'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("自定义表情").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击评论输入框: function () {
        let 提示信息 = '评论输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = clz('android.widget.EditText').pkg("com.ss.android.ugc.aweme").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    同城点赞评论收藏分享父控件: function () {
        let 提示信息 = '点赞评论收藏分享父控件'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.点赞评论收藏分享父控件[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点赞评论收藏分享父控件: function () {
        let 提示信息 = '点赞评论收藏分享父控件'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.点赞评论收藏分享父控件[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    单个点击评论区未点赞: function () {
        let 提示信息 = '单个点击评论区未点赞'
        logd('寻找:' + 提示信息)
        // fun.强制刷新节点()
        //获取单个节点
        let re = descMatch('^赞.*未选中$').getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(2000); // 这个速度没法再调快了,因为点了喜欢以后会跳出来新的页面
            // sleep(1000)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击评论区第几个爱心: function (i) {
        let 第几个 = i
        let 提示信息 = '点击评论区第几个爱心:' + 第几个
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        let re = descMatch('^赞.*未选中$').getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },
    点击评论区所有爱心: function () {
        let 提示信息 = '评论区点赞按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        let re = descMatch('^赞.*未选中$').getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            for (let i = 0; i < re.length; i++) {
                //logd(re[i]);
                // clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
                let storage = storages.create("本地存储");
                if (storage.getString("同城引流", "") + "" === 'true') {
                    if (fun.贴牌版本() === '老李') {
                        clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
                        sleep(1000);
                    } else {
                        this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
                    }
                } else {
                    this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
                    // sleep(800)
                }
            }
            // fun.释放节点的锁()
            return re
        }
        logd('没找到:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },
    点击视频关注: function () {
        let 提示信息 = '视频关注'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("关注").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频评论: function () {
        let 提示信息 = '视频评论'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = descMatch(".*评论.*").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    取消视频点赞: function () {
        let 提示信息 = '已点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = descMatch(".*已点赞.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频收藏: function () {
        let 提示信息 = '收藏'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("收藏").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频点赞: function () {
        let 提示信息 = '视频点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = descMatch(".*未点赞.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击第一个作品: function () {
        let 提示信息 = '第一个作品'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = descMatch(".*点赞数.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            logd((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击最新: function () {
        let 提示信息 = '最新'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("最新").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击作品数量: function () {
        let 提示信息 = '作品数量'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*作品.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    获取作品数量: function () {
        let 提示信息 = '作品数量'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*作品.*").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            let 分割 = re.text.split('作品 ')
            let 作品数量 = 分割[1] * 1
            return 作品数量
        }
        logd('没找到:' + 提示信息)
        return null

    },
    作品数量0: function () {
        let 提示信息 = '作品数量0'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("作品 0").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    私密账号: function () {
        let 提示信息 = '私密账号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("私密账号").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    主页用户昵称: function () {
        let 提示信息 = '主页用户昵称'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = descMatch("复制名字").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            let 昵称 = re.text;
            logd('用户昵称:' + 昵称);
            return 昵称
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_用户_粉丝数: function () {
        let 提示信息 = '抖音火山_用户_粉丝数'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.抖音火山_用户_粉丝数[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回抖音火山_用户_粉丝数: function () {

        logd('返回抖音火山_用户_粉丝数')

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回抖音火山_用户_粉丝数,' + '任务超时')
                toast('返回抖音火山_用户_粉丝数,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (this.抖音火山_用户_粉丝数()) {
                return true
            }

            back()
            sleep(3000);

        }


    },

    返回所有符合抖音火山_用户_粉丝数的控件对象: function (筛选粉丝数量) {

        let 筛选数量 = 筛选粉丝数量
        let 符合_arr = []
        let 控件对象 = {}
        let 数量 = 0
        let 提示信息 = '抖音火山_用户_粉丝数'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let arr = this.控件.抖音火山_用户_粉丝数[fun.抖音火山版_版本号].visible(true).getNodeInfo(0)
        if (arr) {
            logd('找到集合:' + 提示信息)

            for (let i = 0; i < arr.length; i++) {
                try {
                    // 粉丝数: 6.9万
                    let 控件文本 = arr[i].text
                    logd(控件文本);
                    控件文本 = 控件文本.split(': ') // 获取 6.9万
                    logd(控件文本);
                    控件文本 = 控件文本[1]
                    logd(控件文本);
                    if (控件文本.indexOf('万', 0) != -1) {
                        logd('找到字符串:' + '万')
                        let 分割 = 控件文本.split('.')
                        数量 = 分割[0] * 10000
                    } else {
                        logd('没找到字符串:' + '万')
                        数量 = 控件文本 * 1
                    }
                    if (数量 < 筛选数量) {
                        logd('粉丝数量:' + 数量 + ',符合条件')
                        // toast('粉丝数量:' + 数量 + ',符合条件')
                        控件对象 = arr[i]
                        符合_arr.push(控件对象)
                    } else {
                        logd('粉丝数量:' + 数量 + ',不符合条件')
                        // toast('粉丝数量:' + 数量 + ',不符合条件')
                    }
                } catch (error) {
                    loge('获取抖音火山_用户_粉丝数:' + error)
                    return null
                }
            }

            return 符合_arr
        }
        logd('没找到:' + 提示信息)
        return null

    },
    获取粉丝数量: function () {

        let 数量 = 0
        let 提示信息 = '粉丝数量'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.获取粉丝数量[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)

            try {
                let 控件文本 = re.text
                if (控件文本.indexOf('万', 0) != -1) {//在销量里面查找w字符串
                    logd('找到字符串:' + '万')
                    let 分割 = 控件文本.split('.')
                    数量 = 分割[0] * 10000
                } else {
                    logd('没找到字符串:' + '万')
                    数量 = 控件文本 * 1
                }
            } catch (error) {
                loge('获取粉丝数量:' + error)
                return null
            }

            return 数量
        }
        logd('没找到:' + 提示信息)
        return null

    },
    关注数量: function () {

        let 数量 = 0
        let 提示信息 = '关注数量'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.关注数量[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)

            try {
                let 控件文本 = re.text
                if (控件文本.indexOf('万', 0) != -1) {//在销量里面查找w字符串
                    logd('找到字符串:' + '万')
                    let 分割 = 控件文本.split('.')
                    数量 = 分割[0] * 10000
                } else {
                    logd('没找到字符串:' + '万')
                    数量 = 控件文本 * 1
                }
            } catch (error) {
                loge('获取粉丝数量:' + error)
                return null
            }

            return 数量
        }
        logd('没找到:' + 提示信息)
        return null

    },
    获取种子用户: function () {

        logd('获取种子用户,zj')

        // d9b3a8dd04a8a4d6
        // if (fun.设备标识 === '9391f943f83fd371' || fun.设备标识 === '40ec1624663ea2cc') {
        //     logd('测试自己的种子账号');
        //     toast('测试自己的种子账号');
        //     return fun.数据库.小武_取数据()
        // }

        return fun.数据库.取数据()

        if (fun.设备标识 === '00000000000000') { // 没用
            logd('测试设备');
            return fun.数据库.取数据()
        } else {
            let 链接 = 'http://123.57.133.12/api/getSeed?code=64e62c6126e24bd2'
            // try {
            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                return null
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);
            if (结果.code == 0) {
                logd('获取种子用户成功')
                let 种子用户 = 结果.data.userCode
                return 种子用户
            }
            return null
            // } catch (error) {
            //     loge('获取种子用户:' + error)
            //     return null
            // }
        }

        // return fun.数据库.取数据()


        // let 链接 = 'http://123.57.133.12/api/getSeed?code=64e62c6126e24bd2'
        // try {
        //     let 结果 = fun.网络访问(链接)
        //     sleep(500)
        //     if (!结果) {
        //         return null
        //     }
        //     // 结果 = 结果.网页内容
        //     logd(结果)
        //     结果 = JSON.parse(结果);
        //     if (结果.code == 0) {
        //         logd('获取种子用户成功')
        //         let 种子用户 = 结果.data.userCode
        //         return 种子用户
        //     }
        //     return null
        // } catch (error) {
        //     loge('获取种子用户:' + error)
        //     return null
        // }

    },
    评论区所有用户头像: function () {
        let 提示信息 = '评论区所有用户头像'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = descMatch(".*的头像.*").visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    粉丝列表所有用户: function () {
        let 提示信息 = '粉丝列表所有用户'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.粉丝列表所有用户[fun.抖音版本号].getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    点击抖音火山_黄色拨号: function () {
        let 提示信息 = '抖音火山_黄色拨号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_黄色拨号[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_主页联系方式: function () {
        let 提示信息 = '抖音火山_主页联系方式'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_主页联系方式[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_桌面抖音火山版: function () {
        let 提示信息 = '抖音火山_桌面抖音火山版'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_桌面抖音火山版['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_打开: function () {
        let 提示信息 = '抖音火山_打开'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_打开['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    安装抖音火山版: function () {

        logd('安装抖音火山版')

        let 超时秒数 = 90 // 好像没用,是死循环
        let 起始时间 = fun.获取时间().秒

        if (this.抖音火山_前台()) {
            let 抖音火山版_版本号 = utils.getAppVersionName('com.ss.android.ugc.live')
            logd('抖音火山版_版本号:' + 抖音火山版_版本号);
            fun.抖音火山版_版本号 = 抖音火山版_版本号
            logd('抖音火山版已安装完成');
            return true
        }

        home()
        sleep(3000);

        if (this.抖音火山_桌面抖音火山版()) {
            logd('抖音火山版已安装完成');
            return true
        }

        while (true) {

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('安装抖音火山版,' + '任务超时,返回一下')
                back()
                sleep(this.点击延时)
                this.点击抖音火山_打开()
                起始时间 = fun.获取时间().秒  //重置超时时间
            }

            this.点击抖音火山_上传管理()
            this.点击抖音火山_安装()
            this.点击抖音火山_安装包()
            if (this.抖音火山_安装完成()) {
                if (this.点击抖音火山_打开()) {
                    logd('安装抖音火山版成功')
                    sleep(this.点击延时);
                    let 抖音火山版_版本号 = utils.getAppVersionName('com.ss.android.ugc.live')
                    logd('抖音火山版_版本号:' + 抖音火山版_版本号);
                    fun.抖音火山版_版本号 = 抖音火山版_版本号
                    return true
                }
            }

        }


    },
    抖音火山_安装完成: function () {
        let 提示信息 = '抖音火山_安装完成'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_安装完成['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_安装包: function () {
        let 提示信息 = '抖音火山_安装包'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_安装包['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_安装: function () {
        let 提示信息 = '抖音火山_安装'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_安装['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击抖音火山_上传管理: function () {
        let 提示信息 = '抖音火山_上传管理'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_上传管理['15.0.5'].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_点击屏幕重试: function () {

        let 提示信息 = '抖音火山_点击屏幕重试'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_点击屏幕重试[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_前台: function () {

        try {

            let 提示信息 = '抖音火山_前台'
            logd('寻找:' + 提示信息)
            fun.强制刷新节点()
            let re = this.控件.抖音火山_前台[fun.抖音火山版_版本号].visible(true).getOneNodeInfo(0)
            if (re) {
                logd('找到:' + 提示信息)
                return re
            }
            logd('没找到:' + 提示信息)
            return null

        } catch (error) {

            loge('main:' + error);
            return null

        }


    },
    抖音火山_用户_没有更多了: function () {

        let 提示信息 = '抖音火山_用户_没有更多了'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_用户_没有更多了[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_主页_分享_火山昵称: function () {

        let 控件文本
        let 提示信息 = '抖音火山_主页_分享_火山昵称'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_主页_分享_火山昵称[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            控件文本 = re.text // text("菲林酒店")
            // 控件文本 = 控件文本.split('：')
            // 控件文本 = 控件文本[1]
            return 控件文本
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_主页_分享_火山号: function () {

        let 控件文本
        let 提示信息 = '抖音火山_主页_分享_火山号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_主页_分享_火山号[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            控件文本 = re.text // text("火山号:  1708069306")
            logd(控件文本);
            控件文本 = 控件文本.split(': ')
            logd(控件文本);
            控件文本 = 控件文本[1]
            logd(控件文本);
            return 控件文本
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_确认拨打_手机号码: function () {

        let 控件文本
        let 提示信息 = '抖音火山_确认拨打'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_确认拨打[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            控件文本 = re.text // text("确认拨打：19373137310")
            控件文本 = 控件文本.split('：')
            控件文本 = 控件文本[1]

            logd(控件文本);
            if (fun.字符串长度(控件文本) === 11 && 控件文本.charAt(0) === '1') {
                logd('1开头,并且号码长度为11位,是手机号码');
                return 控件文本
            }
            logd('联系方式不是手机号码');
            return null
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山_主页昵称: function () {
        let 提示信息 = '抖音火山_主页昵称'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_主页昵称[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re.text
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回抖音火山主页界面: function () {

        logd('返回抖音火山主页界面')

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回抖音火山主页界面,' + '任务超时')
                toast('返回抖音火山主页界面,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (this.抖音火山_作品列表()) {
                return true
            }

            back()
            sleep(this.点击延时);

        }


    },
    抖音火山_作品列表: function () {
        let 提示信息 = '抖音火山_作品列表'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_作品列表[fun.抖音火山版_版本号].getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    作品列表: function () {
        let 提示信息 = '作品列表'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = id("com.ss.android.ugc.aweme:id/container").clz("android.widget.FrameLayout").visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    抖音火山版点击第一个未置顶作品: function () {
        let 置顶 = null
        let 提示信息 = '抖音火山版点击第一个未置顶作品'
        logd('寻找:' + 提示信息)
        let arr = this.抖音火山_作品列表() //是否存在作品列表
        if (!arr) {
            return null
        }
        for (let i = 0; i < arr.length; i++) {
            // console.info(arr[i]);
            fun.强制刷新节点()
            置顶 = arr[i].getOneNodeInfo(text("置顶"), 1000);
            if (置顶) {
                logd('此作品存在置顶,不操作');
                continue
            }
            logd('此作品不存在置顶,点击第:' + (i + 1) + '个作品');
            logd((arr[i].bounds.left + arr[i].bounds.right) / 2, (arr[i].bounds.top + arr[i].bounds.bottom) / 2)
            clickPoint((arr[i].bounds.left + arr[i].bounds.right) / 2, (arr[i].bounds.top + arr[i].bounds.bottom) / 2)
            sleep(this.点击延时)
            return arr[i] // 第一个非置顶的对象
        }
        logd('当前页面所有作品都是置顶,不操作');
        return null
    },
    点击第一个未置顶作品: function () {
        let 置顶 = null
        let 提示信息 = '点击第一个未置顶作品'
        logd('寻找:' + 提示信息)
        let arr = this.作品列表() //是否存在作品列表
        if (!arr) {
            return null
        }
        for (let i = 0; i < arr.length; i++) {
            // console.info(arr[i]);
            fun.强制刷新节点()
            置顶 = arr[i].getOneNodeInfo(text("置顶"), 1000);
            if (置顶) {
                logd('此作品存在置顶,不操作');
                continue
            }
            logd('此作品不存在置顶,点击第:' + (i + 1) + '个作品');
            clickPoint((arr[i].bounds.left + arr[i].bounds.right) / 2, (arr[i].bounds.top + arr[i].bounds.bottom) / 2)
            sleep(this.点击延时)
            return arr[i] // 第一个非置顶的对象
        }
        logd('当前页面所有作品都是置顶,不操作');
        return null
    },
    抖音火山_作品发布时间: function () {
        let 提示信息 = '抖音火山_作品发布时间'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.抖音火山_作品发布时间[fun.抖音火山版_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re.text
        }
        logd('没找到:' + 提示信息)
        return null

    },
    作品发布时间: function () {
        let 提示信息 = '作品发布时间'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.作品发布时间[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            let 发布时间 = re.text;
            logd('作品发布时间:' + 发布时间);
            return 发布时间
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音火山版判断作品超过天数: function (d) { // 年份不同的直接返回null,这个bug有空在修复吧

        //播放作品界面调用

        let 提示信息 = '抖音火山版判断作品超过天数'
        logd('寻找:' + 提示信息)

        let 超过天数 = d

        let 作品发布时间 = this.抖音火山_作品发布时间()
        if (!作品发布时间) {
            return null
        }

        // 2023-06-02 21:58
        let 时间 = 作品发布时间.split(' ');
        时间 = 时间[0].split('-');
        let 年 = 时间[0]
        let 月 = 时间[1]
        let 日 = 时间[2]

        logd('第一条作品发布时间为:' + 年 + '年' + 月 + '月' + 日 + '日')
        logd('当前时间为:' + fun.获取时间().年份 + '年' + fun.获取时间().月份 + '月' + fun.获取时间().几号 + '日')

        let 年份相差 = fun.获取时间().年份 - 年

        if (年份相差 != 0) {
            logd('年份不符合要求,相差:' + 年份相差 + '年,返回获取下一个用户')
            return '时间不对'
        }

        let 当前日 = 0
        当前日 = fun.获取时间().几号
        if (fun.获取时间().月份 - 月 != 0) {
            //不是同一个月,当前的天数等于月数差多少乘以30
            当前日 = 当前日 + (fun.获取时间().月份 - 月) * 30
            logd('当前日:' + 当前日);
        }

        let 作品发布过去天数 = 当前日 - 日
        logd(作品发布过去天数);

        if (作品发布过去天数 > d) {
            logd('作品发布时间过去了' + 作品发布过去天数 + '天,不符合要求,返回获取下一个用户')
            return '时间不对'
        }

        logd('作品发布时间过去' + 作品发布过去天数 + '天,符合要求')
        return true
    },
    判断作品超过天数: function (d) { // 年份不同的直接返回null,这个bug有空在修复吧

        //播放作品界面调用

        let 提示信息 = '判断作品超过天数'
        logd('寻找:' + 提示信息)

        let 超过天数 = d

        let 作品发布时间 = this.作品发布时间()
        if (!作品发布时间) {
            return null
        }

        let 时间 = 作品发布时间.split(' ');
        时间 = 时间[0].split('-');
        let 年 = 时间[0]
        let 月 = 时间[1]
        let 日 = 时间[2]

        logd('第一条作品发布时间为:' + 年 + '年' + 月 + '月' + 日 + '日')
        logd('当前时间为:' + fun.获取时间().年份 + '年' + fun.获取时间().月份 + '月' + fun.获取时间().几号 + '日')

        let 年份相差 = fun.获取时间().年份 - 年

        if (年份相差 != 0) {
            logd('年份不符合要求,相差:' + 年份相差 + '年,返回获取下一个用户')
            return '时间不对'
        }

        let 当前日 = 0
        当前日 = fun.获取时间().几号
        if (fun.获取时间().月份 - 月 != 0) {
            //不是同一个月,当前的天数等于月数差多少乘以30
            当前日 = 当前日 + (fun.获取时间().月份 - 月) * 30
            logd('当前日:' + 当前日);
        }

        let 作品发布过去天数 = 当前日 - 日
        logd(作品发布过去天数);

        if (作品发布过去天数 > d) {
            logd('作品发布时间过去了' + 作品发布过去天数 + '天,不符合要求,返回获取下一个用户')
            return '时间不对'
        }

        logd('作品发布时间过去' + 作品发布过去天数 + '天,符合要求')
        return true
    },
    抖音火山版_下滑寻找蓝V: function () {

        logd('抖音火山版_下滑寻找蓝V')

        let 超时秒数 = 30
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('抖音火山版_下滑寻找蓝V,' + '任务超时')
                toast('抖音火山版_下滑寻找蓝V,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (fun.抖音.团购_¥()) {
                return true
            }

            fun.纵向滑动屏幕(0.8, 0)
            sleep(this.点击延时);

        }


    },
    下滑寻找人均: function () {

        logd('下滑寻找人均')

        let 超时秒数 = 30
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('下滑寻找人均,' + '任务超时')
                toast('下滑寻找人均,' + '任务超时')
                return null
            }

            // 起始时间 = 模块.获取时间().秒  //重置超时时间
            // 这里开始往下写代码

            if (fun.抖音.团购_¥()) {
                return true
            }

            fun.纵向滑动屏幕(0.8, 0)
            sleep(this.点击延时);

        }


    },
    团购_¥: function () {
        let 提示信息 = '团购_¥'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()

        let re = this.控件.团购_¥[fun.抖音版本号].visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    团购_所有人均: function () {
        let 提示信息 = '团购_所有人均'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()

        let 上x = 0
        let 上y = Math.round(fun.分辨率y * 0.2)
        let 下x = fun.分辨率x
        let 下y = fun.分辨率y

        logd(上x, 上y, 下x, 下y);

        //[888,588][1020,639]

        let re = this.控件.团购_人均[fun.抖音版本号].visible(true).bounds(上x, 上y, 下x, 下y).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    点击团购_电话按钮: function () {
        let 提示信息 = '团购_电话按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_电话按钮[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    所有团购_联系号码: function () {
        let 提示信息 = '团购_联系号码'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.团购_联系号码[fun.抖音版本号].visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            let 第一个号码 = null
            let 号码数组 = []
            let 控件文本 = null
            for (let i = 0; i < re.length; i++) {
                控件文本 = re[i].text
                logd(控件文本);
                if (fun.字符串长度(控件文本) === 11 && 控件文本.charAt(0) === '1') {
                    logd('1开头,并且号码长度为11位,是手机号码');
                    if (第一个号码 === null) {
                        第一个号码 = 控件文本
                        logd('第一个号码:' + 第一个号码);
                    }
                    号码数组.push(控件文本)
                }
            }
            return {'号码数组': 号码数组, '第一个号码': 第一个号码}
        }
        logd('没找到:' + 提示信息)
        return null
    },
    点击团购_商家主页: function () {
        let 提示信息 = '团购_商家主页'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_商家主页[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击团购_搜索放大镜: function () {
        let 提示信息 = '团购_搜索放大镜'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_搜索放大镜[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击团购_有团购: function () {
        let 提示信息 = '团购_有团购'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_有团购[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            re = re.parent()
            if (!re) {
                logd('没找到:' + 提示信息 + ',的父控件')
                return null
            }
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击主页右上三个点: function () {
        let 提示信息 = '主页右上三个点'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("更多").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    团购_搜索: function () {
        let 提示信息 = '团购_搜索'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_搜索[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击团购_搜索: function () {
        let 提示信息 = '团购_搜索'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_搜索[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    团购_智能排序: function () {
        let 提示信息 = '团购_智能排序'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_智能排序[fun.抖音版本号].visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    返回团购_人均: function () {

        let 超时秒数 = 30
        let 起始时间 = fun.获取时间().秒

        logd('返回团购_人均')

        while (true) {

            if (this.团购_搜索()) {
                sleep(1000);
                return true
            }

            back()
            sleep(1500);

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回团购_人均,' + '任务超时')
                return null
            }

        }
    },
    粉丝列表界面: function () {
        let 提示信息 = '粉丝列表界面'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.粉丝列表界面[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    当前无网络: function () {
        let 提示信息 = '当前无网络'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*当前无网络.*").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击附近美食: function () {
        let 提示信息 = '附近美食'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.附近美食[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击粉丝: function () {
        let 提示信息 = '粉丝'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("粉丝").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    抖音号: function () {
        let 提示信息 = '抖音号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*抖音号：.*").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            let 控件文本 = re.text
            let 抖音号码 = 控件文本.split('：')
            抖音号码 = 抖音号码[1]
            return 抖音号码
        }
        logd('没找到:' + 提示信息)
        return null

    },
    团购_取消: function () {
        let 提示信息 = '团购_取消'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_取消[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    团购_暂时没有更多了: function () {
        let 提示信息 = '团购_暂时没有更多了'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.团购_暂时没有更多了[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    主页_蓝V: function () {
        let 提示信息 = '主页_蓝V'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.主页_蓝V[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    主页_三个点_昵称: function () {
        let 提示信息 = '主页_三个点_昵称'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.主页_三个点_昵称[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re.text
        }
        logd('没找到:' + 提示信息)
        return null

    },
    主页_三个点_抖音号: function () {
        let 提示信息 = '主页_三个点_抖音号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.主页_三个点_抖音号[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            let 控件文本 = re.text
            logd('控件文本:' + 控件文本);
            let 抖音号码 = 控件文本.split(': ')
            抖音号码 = 抖音号码[1]
            logd('抖音号码:' + 抖音号码);
            return 抖音号码
        }
        logd('没找到:' + 提示信息)
        return null

    },
    搜索_用户_关注按钮: function () {
        let 提示信息 = '搜索_用户_关注按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("关注按钮").visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    // 搜索_用户_关注按钮: function () {
    //     let 提示信息 = '搜索_用户_关注按钮'
    //     logd('寻找:' + 提示信息)
    //     fun.强制刷新节点()
    //     //获取单个节点
    //     let re = this.控件.搜索_用户_关注按钮[fun.抖音版本号].getOneNodeInfo(0)
    //     if (re) {
    //         logd('找到:' + 提示信息)
    //         return re
    //     }
    //     logd('没找到:' + 提示信息)
    //     return null
    //
    // },
    点击主页_关注: function () {
        let 提示信息 = '主页_关注'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.主页_关注[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击关注: function () {
        let 提示信息 = '关注'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*关注.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    综合_抖音号_粉丝: function () {
        let 提示信息 = '综合_抖音号_粉丝'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        // let re = this.控件.搜索结果粉丝[fun.抖音版本号].getOneNodeInfo(0)
        // let re2 = this.控件.点击搜索结果抖音号[fun.抖音版本号].getOneNodeInfo(0)
        // if (re || re2) {
        //     logd('找到:' + 提示信息)
        //     return true
        // }

        let re = null

        re = textMatch(".*粉丝:.*").getOneNodeInfo(0)

        if (re) {
            logd('找到:' + '搜索结果粉丝')
            return re
        }

        re = textMatch(".*抖音号：.*").getOneNodeInfo(0)

        if (re) {
            logd('找到:' + '点击搜索结果抖音号')
            return re
        }

        logd('没找到:' + 提示信息)
        return null

    },
    综合_用户: function () {
        let 提示信息 = '综合_用户'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("用户").desc("用户").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            return true
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击搜索结果粉丝: function () {
        let 提示信息 = '搜索结果粉丝'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*粉丝:.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击取消: function () {
        let 提示信息 = '取消'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.取消[fun.抖音版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击搜索结果抖音号: function () {
        let 提示信息 = '搜索结果抖音号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = textMatch(".*抖音号：.*").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击用户: function () {
        let 提示信息 = '用户'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = text("用户").clz("android.widget.Button").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时 + 2000) // 时间尽量调长一点,点击用户加载需要时间
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    综合_搜索结果_反馈入口: function () {
        let 提示信息 = '综合_搜索结果_反馈入口'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("反馈入口").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时 + 2000) // 时间尽量调长一点,点击用户加载需要时间
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击同城_团购_搜索放大镜: function () {
        let 提示信息 = '同城_团购_搜索放大镜'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("搜索").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            longClickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // logd((re.bounds.left + re.bounds.right) * 0.55, (re.bounds.top + re.bounds.bottom) / 2)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击搜索按钮: function () {
        let 提示信息 = '搜索按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("搜索").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            longClickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            //clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    搜索按钮: function () {
        let 提示信息 = '搜索按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = desc("搜索").getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // longClickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // //clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    意图跳转搜索页面: function () {
        utils.openActivity({
            //action: "android.intent.action.VIEW",
            uri: "snssdk1128://search",
            pkg: "com.ss.android.ugc.aweme",
        });
        sleep(2500)
    },
    意图跳转指定团购界面: function () {
        utils.openActivity({
            //action: "android.intent.action.VIEW",
            uri: "snssdk1128://poi/detail/?enter_from=link&extra_session_params=%7B%22life_extra_info%22%3A%22%7B%5C%22life_share_ext%5C%22%3A%5C%22wyo80n%5C%5C%5C%2FOK4Wb5DZs%2B711YPgmAHw1p6QvMunsMLuJWRNmktUa9rMdAZE2VpoKw2CZTbBUvgOF6QhV%5C%5CnnYd9daVtDw%3D%3D%5C%5Cn%5C%22%7D%22%7D&id=6601141142320842759&track_enter_detail=1&zlink=https%3A%2F%2Fz.douyin.com%2F6qoT&zlink_click_time=1680696988&__reporte_stage=launch",
            pkg: "com.ss.android.ugc.aweme",
        });
        sleep(6000)
    },
    意图跳转搜索结果: function (搜索内容) {
        utils.openActivity({
            //action: "android.intent.action.VIEW",
            uri: "snssdk1128://search?keyword=" + 搜索内容,
            pkg: "com.ss.android.ugc.aweme",
        });
        sleep(4000)
        return true
    },
    意图跳转同城: function () {
        utils.openActivity({
            //action: "android.intent.action.VIEW",
            uri: "snssdk1128://nearby/main?gd_label=click_schema_lhft_ads_r_inm_dy",
            pkg: "com.ss.android.ugc.aweme",
        });
        sleep(7000)
        return true
    },
    抖音火山跳转首页: function () {
        logd('抖音火山跳转首页'); // 没用
        utils.openActivity({
            //action: "android.intent.action.VIEW",
            uri: "snssdk1112://",
            pkg: "com.ss.android.ugc.live",
        });
        sleep(7000)
        return true
    },
    点击搜索框: function () {
        let 提示信息 = '搜索框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        //获取单个节点
        let re = id("com.ss.android.ugc.aweme:id/et_search_kw").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
};
fun.快手 = {

    点击延时: 5000,

    控件: {

        '评论输入框': {
            '11.2.20.30066': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.2.10.29991': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.1.40.29872': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.1.30.29775': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.1.20.29611': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.1.11.29558': id("com.smile.gifmaker:id/editor_holder_text"),
            '11.1.10.29502': id("com.smile.gifmaker:id/editor_holder_text"),
        },
        '点击评论区所有爱心': {
            '11.2.20.30066': id("com.smile.gifmaker:id/comment_like"),
            '11.2.10.29991': id("com.smile.gifmaker:id/comment_like"),
            '11.1.40.29872': id("com.smile.gifmaker:id/comment_like"),
            '11.1.30.29775': id("com.smile.gifmaker:id/comment_like"),
            '11.1.20.29611': id("com.smile.gifmaker:id/comment_like"),
            '11.1.11.29558': id("com.smile.gifmaker:id/comment_like"),
            '11.1.10.29502': id("com.smile.gifmaker:id/comment_like"),
        },
        '输入框发送': {
            '11.2.20.30066': text("发送"),
            '11.2.10.29991': text("发送"),
            '11.1.40.29872': text("发送"),
            '11.1.30.29775': text("发送"),
            '11.1.20.29611': text("发送"),
            '11.1.11.29558': text("发送"),
            '11.1.10.29502': text("发送"),
        },
        '评论区按钮': {
            '11.2.20.30066': id("com.smile.gifmaker:id/comment_icon"),
            '11.2.10.29991': id("com.smile.gifmaker:id/comment_icon"),
            '11.1.40.29872': id("com.smile.gifmaker:id/comment_icon"),
            '11.1.30.29775': id("com.smile.gifmaker:id/comment_icon"),
            '11.1.20.29611': id("com.smile.gifmaker:id/comment_icon"),
            '11.1.11.29558': id("com.smile.gifmaker:id/comment_icon"),
            '11.1.10.29502': id("com.smile.gifmaker:id/comment_icon"),
        },
        '视频关注': {
            '11.2.20.30066': id("com.smile.gifmaker:id/follow_button"),
            '11.2.10.29991': id("com.smile.gifmaker:id/follow_button"),
            '11.1.40.29872': id("com.smile.gifmaker:id/follow_button"),
            '11.1.30.29775': id("com.smile.gifmaker:id/follow_button"),
            '11.1.20.29611': id("com.smile.gifmaker:id/follow_button"),
            '11.1.11.29558': id("com.smile.gifmaker:id/follow_button"),
            '11.1.10.29502': id("com.smile.gifmaker:id/follow_button"),
        },
        '视频点赞': {
            '11.2.20.30066': id("com.smile.gifmaker:id/like_button"),
            '11.2.10.29991': id("com.smile.gifmaker:id/like_button"),
            '11.1.40.29872': id("com.smile.gifmaker:id/like_button"),
            '11.1.30.29775': id("com.smile.gifmaker:id/like_button"),
            '11.1.20.29611': id("com.smile.gifmaker:id/like_button"),
            '11.1.11.29558': id("com.smile.gifmaker:id/like_button"),
            '11.1.10.29502': id("com.smile.gifmaker:id/like_button"),
        },

    },

    打开快手: function () {
        fun.保持屏幕唤醒状态()
        utils.openAppByName("快手");
    },

    返回播放视频页面: function () {

        let 超时秒数 = 60
        let 起始时间 = fun.获取时间().秒

        logd('返回播放视频页面')

        while (true) {

            if (this.视频点赞页面()) {
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回播放视频页面,' + '任务超时')
                return null
            }

        }
    },
    点击评论区所有爱心: function () {
        let 提示信息 = '点击评论区所有爱心'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        // let re = this.控件.点击评论区所有爱心[fun.快手_版本号].getNodeInfo(0)
        let re = id("com.smile.gifmaker:id/comment_like").getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            for (let i = 0; i < re.length; i++) {
                //logd(re[i]);
                clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
                // this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
                sleep(1000)
            }
            // fun.释放节点的锁()
            return re
        }
        logd('没找到:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },
    点击输入框发送: function () {
        let 提示信息 = '输入框发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.输入框发送[fun.快手_版本号].getOneNodeInfo(0)
        let re = text("发送").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击评论输入框: function () {
        let 提示信息 = '评论输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.评论输入框[fun.快手_版本号].getOneNodeInfo(0)
        let re = id("com.smile.gifmaker:id/editor_holder_text").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击评论区按钮: function () {
        let 提示信息 = '评论区按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.评论区按钮[fun.快手_版本号].getOneNodeInfo(0)
        let re = id("com.smile.gifmaker:id/comment_icon").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频关注: function () {
        let 提示信息 = '视频关注'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.视频关注[fun.快手_版本号].getOneNodeInfo(0)
        let re = id("com.smile.gifmaker:id/follow_button").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频点赞: function () {
        let 提示信息 = '视频点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.视频点赞[fun.快手_版本号].getOneNodeInfo(0)
        let re = id("com.smile.gifmaker:id/like_button").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    视频点赞页面: function () {
        let 提示信息 = '视频点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // let re = this.控件.视频点赞[fun.快手_版本号].getOneNodeInfo(0)
        let re = id("com.smile.gifmaker:id/like_button").getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
}
fun.小红书 = {

    点击延时: 2500,

    控件: {

        '同城视频图文列表': { // 同城昵称
            '7.84.3': id("com.xingin.xhs:id/esn"),
            '7.83.0': id("com.xingin.xhs:id/era"),
            '7.82.0': id("com.xingin.xhs:id/eqm"),
            '7.80.0': id("com.xingin.xhs:id/hj2"),
        },
        '视频图文列表': { // 发现页昵称
            '7.84.3': id("com.xingin.xhs:id/hqk"),
            '7.83.0': id("com.xingin.xhs:id/hoj"),
            '7.82.0': id("com.xingin.xhs:id/hng"),
            '7.80.0': id("com.xingin.xhs:id/hj2"),
        },
        '评论区爱心': {
            '7.84.3': id("com.xingin.xhs:id/dtv"),
            '7.83.0': id("com.xingin.xhs:id/dsn"),
            '7.82.0': id("com.xingin.xhs:id/ds2"),
            '7.80.0': id("com.xingin.xhs:id/dph"),
        },
        '评论输入框': {
            '7.84.3': id("com.xingin.xhs:id/dw_"),
            '7.83.0': id("com.xingin.xhs:id/cus"),
            '7.82.0': id("com.xingin.xhs:id/dug"),
            '7.80.0': id("com.xingin.xhs:id/drw"),
        },
        '输入框发送': {
            '7.84.3': text("发送"),
            '7.83.0': text("发送"),
            '7.82.0': text("发送"),
            '7.80.0': text("发送"),
        },
        '图文评论图标': { //大框
            '7.84.3': id("com.xingin.xhs:id/evt"),
            '7.83.0': id("com.xingin.xhs:id/euf"),
            '7.82.0': id("com.xingin.xhs:id/etp"),
            '7.80.0': id("com.xingin.xhs:id/eqi"),
        },
        '视频评论图标': { //大框
            '7.84.3': id("com.xingin.xhs:id/commentLayout"),
            '7.83.0': id("com.xingin.xhs:id/commentLayout"),
            '7.82.0': id("com.xingin.xhs:id/commentLayout"),
            '7.80.0': id("com.xingin.xhs:id/e8l"),
        },
        '评论输入框_表情按钮': {
            '7.84.3': id("com.xingin.xhs:id/e76"),
            '7.83.0': id("com.xingin.xhs:id/e5x"),
            '7.82.0': id("com.xingin.xhs:id/e5b"),
            '7.80.0': id("com.xingin.xhs:id/e2m"),
        },
        '关注': {
            '7.84.3': text("关注"),
            '7.83.0': text("关注"),
            '7.82.0': text("关注"),
            '7.80.0': text("关注"),
        },
        '视频点赞': {
            '7.84.3': id("com.xingin.xhs:id/eca"),
            '7.83.0': id("com.xingin.xhs:id/eb2"),
            '7.82.0': id("com.xingin.xhs:id/eag"),
            '7.80.0': id("com.xingin.xhs:id/erp"),
        },
        '视频分享按钮': {
            '7.84.3': id("com.xingin.xhs:id/shareButton"),
            '7.83.0': id("com.xingin.xhs:id/shareButton"),
            '7.82.0': id("com.xingin.xhs:id/shareButton"),
            '7.80.0': id("com.xingin.xhs:id/shareButton"),
        },
        '图文分享按钮': {
            '7.84.3': id("com.xingin.xhs:id/moreOperateIV"),
            '7.83.0': id("com.xingin.xhs:id/moreOperateIV"),
            '7.82.0': id("com.xingin.xhs:id/moreOperateIV"),
            '7.80.0': id("com.xingin.xhs:id/moreOperateIV"),
        },

    },

    打开小红书: function () {
        fun.保持屏幕唤醒状态()
        utils.openAppByName("小红书");
    },

    遍历同城视频图文列表: function () {
        let 提示信息 = '同城视频图文列表'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        let re = this.控件.同城视频图文列表[fun.小红书_版本号].visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            // for (let i = 0; i < re.length; i++) {
            //     //logd(re[i]);
            //     clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
            //     // this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
            //     sleep(1000)
            // }
            // fun.释放节点的锁()
            return re
        }
        logd('没找到集合:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },

    遍历视频图文列表: function () {
        let 提示信息 = '遍历视频图文列表'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        let re = this.控件.视频图文列表[fun.小红书_版本号].visible(true).getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            // for (let i = 0; i < re.length; i++) {
            //     //logd(re[i]);
            //     clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
            //     // this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
            //     sleep(1000)
            // }
            // fun.释放节点的锁()
            return re
        }
        logd('没找到集合:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },

    返回视频图文列表: function () {

        let 超时秒数 = 60
        let 起始时间 = fun.获取时间().秒

        logd('返回视频图文列表')

        while (true) {

            if (this.遍历视频图文列表()) {
                sleep(1000);
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回播放视频页面,' + '任务超时')
                return null
            }

        }
    },

    返回同城视频图文列表: function () {

        let 超时秒数 = 60
        let 起始时间 = fun.获取时间().秒

        logd('返回同城视频图文列表')

        while (true) {

            if (this.遍历同城视频图文列表()) {
                sleep(1000);
                return true
            } else {

                /* if (!this.点击关闭评论() && !this.点击左上角返回()) {
                    back()
                    sleep(2500)
                } */

                back()
                sleep(2500)

            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回同城视频图文列表,' + '任务超时')
                return null
            }

        }
    },

    评论输入框_表情按钮: function () {
        let 提示信息 = '评论输入框_表情按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.评论输入框_表情按钮[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击图文评论图标: function () {
        let 提示信息 = '图文评论图标'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.图文评论图标[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频评论图标: function () {
        let 提示信息 = '视频评论图标'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.视频评论图标[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击视频或者图文评论图标: function () {

        let re = null

        re = this.点击图文评论图标()
        if (re) {
            return re
        }

        re = this.点击视频评论图标()
        if (re) {
            return re
        }

    },
    点击视频点赞: function () {
        let 提示信息 = '视频点赞'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.视频点赞[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击关注: function () {
        let 提示信息 = '关注'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.关注[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    评论区爱心: function () {
        let 提示信息 = '评论区爱心'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.评论区爱心[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    视频分享按钮: function () {
        let 提示信息 = '视频分享按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.视频分享按钮[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    图文分享按钮: function () {
        let 提示信息 = '图文分享按钮'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.图文分享按钮[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    分享按钮: function () {

        let re = null

        re = this.视频分享按钮()
        if (re) {
            return re
        }

        re = this.图文分享按钮()
        if (re) {
            return re
        }

    },
    点击评论区所有爱心: function () {
        let 提示信息 = '点击评论区所有爱心'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        // fun.锁定节点()
        //获取节点集合
        let re = this.控件.评论区爱心[fun.小红书_版本号].getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            for (let i = 0; i < re.length; i++) {
                //logd(re[i]);
                clickPoint((re[i].bounds.left + re[i].bounds.right) / 2, (re[i].bounds.top + re[i].bounds.bottom) / 2)
                // this.单个点击评论区未点赞()   //必须要调用这个不能直接点喜欢,因为点了评论喜欢会跳出来新界面,必须要重新检索判断
                sleep(1000)
            }
            // fun.释放节点的锁()
            return re
        }
        logd('没找到:' + 提示信息)
        // fun.释放节点的锁()
        return null

    },
    点击评论输入框: function () {
        let 提示信息 = '评论输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.评论输入框[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击输入框发送: function () {
        let 提示信息 = '输入框发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.输入框发送[fun.小红书_版本号].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
}
fun.微信 = {

    点击延时: 2000,

    控件: {

        '加号': {
            '8.0.32': id("com.tencent.mm:id/hy6").visible(true),
        },
        '添加朋友': {
            '8.0.32': text("添加朋友"),
        },
        '帐号手机号': {
            '8.0.32': text("帐号/手机号"),
        },
        '搜索': { //搜索:15397893254
            '8.0.32': textMatch(".*搜索.*"),
        },
        '添加到通讯录': {
            '8.0.32': text("添加到通讯录"),
        },
        '验证信息输入框': {
            '8.0.32': id("com.tencent.mm:id/j0w"),
        },
        '备注输入框': {
            '8.0.32': id("com.tencent.mm:id/j0z"),
        },
        '发送': {
            '8.0.32': text("发送"),
        },

    },

    微信版本号: function () {
        let 微信_版本号 = utils.getAppVersionName('com.tencent.mm')
        logd('微信_版本号:' + 微信_版本号);
        return 微信_版本号
    },
    获取桌面微信数组: function () {
        let 提示信息 = '桌面微信'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = desc('微信').getNodeInfo(0)
        if (re) {
            logd('找到集合:' + 提示信息)
            return re
        }
        logd('没找到:' + 提示信息)
        return null
    },
    返回加号界面: function () {

        let 超时秒数 = 60
        let 起始时间 = fun.获取时间().秒

        logd('返回加号界面')

        while (true) {

            if (this.加号()) {
                return true
            } else {
                back()
                sleep(2000)
            }

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('返回加号界面,' + '任务超时')
                return null
            }

        }
    },
    加号: function () {
        let 提示信息 = '加号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.加号[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到:' + 提示信息)
            // clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            // sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击加号: function () {
        let 提示信息 = '加号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.加号[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击添加朋友: function () {
        let 提示信息 = '添加朋友'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.添加朋友[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击帐号手机号: function () {
        let 提示信息 = '帐号手机号'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.帐号手机号[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击搜索: function () {
        let 提示信息 = '搜索'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.搜索[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击添加到通讯录: function () {
        let 提示信息 = '添加到通讯录'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.添加到通讯录[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击验证信息输入框: function () {
        let 提示信息 = '验证信息输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.验证信息输入框[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击备注输入框: function () {
        let 提示信息 = '备注输入框'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.备注输入框[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击发送: function () {
        let 提示信息 = '发送'
        logd('寻找:' + 提示信息)
        fun.强制刷新节点()
        let re = this.控件.发送[this.微信版本号()].getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },

}
fun.随机毫秒等待 = function (a, b) {
    let time = random(a, b)
    sleep(time);
}
fun.关闭干扰窗口 = function () {
    let re = null
    //  华为nova2s  系统更新 稍后
    re = text('稍后').getOneNodeInfo(0)
    if (re) {
        logd('点击稍后');
        clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
        return true
    }
    re = desc('稍后').getOneNodeInfo(0)
    if (re) {
        logd('点击稍后');
        clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
        return true
    }
    // 抖音卡死 关闭应用
    re = text('关闭应用').getOneNodeInfo(0)
    if (re) {
        logd('点击关闭应用');
        clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
        return true
    }
    re = desc('关闭应用').getOneNodeInfo(0)
    if (re) {
        logd('点击关闭应用');
        clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
        return true
    }
}
fun.释放节点的锁 = function () {
    releaseNode()
}
fun.锁定节点 = function () {
    lockNode()
}
fun.强制刷新节点 = function () {
    removeNodeFlag(0);
}
fun.申请悬浮窗权限 = function () {
    logd('申请悬浮窗权限');
    if (hasFloatViewPermission()) {
        logd('已授权悬浮窗权限')
        return true
    }
    logd('未授权悬浮窗权限,申请中..');
    requestFloatViewPermission(2);
    return false
}
fun.忽略电池优化_弹窗 = function () {

    // importClass(android.content.Intent);
    importPackage(android.os);
    importPackage(android.content);
    importPackage(android.net);
    importPackage(android.app);

    logd('忽略电池优化_弹窗');

    let powerManager = context.getSystemService(Context.POWER_SERVICE)
    if (powerManager != null) {

        isIgnoring = powerManager.isIgnoringBatteryOptimizations(context.packageName)
        logd(isIgnoring)
        if (isIgnoring) {
            logd('已经授权忽略电池优化权限');
            return true
        }
        logd('没有忽略电池优化权限,弹窗申请忽略电池优化权限');
        let intent = new Intent(android.provider.Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
        intent.setData(Uri.parse("package:" + context.packageName));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent);

    }
}
fun.显示启停控制窗口 = function () {
    logd('显示启停控制窗口');
    showCtrlWindow();
}
fun.显示日志 = function () {
    logd('显示日志');
    showLogWindow()
}
fun.关闭日志 = function () {
    logd('关闭日志');
    closeLogWindow()
}
fun.系统设置 = function () {
    logd('系统设置');
    openECSystemSetting()
}
fun.下载抖音 = function () {
    logd('下载抖音');
    utils.openActivity({
        action: "android.intent.action.VIEW",
        uri: 'https://wwez.lanzoul.com/iAMPH125jd1c',
    })
}
fun.设置启停控制窗口 = function () {

    let m = {
        "x": 0, // x: 起始X位置
        "y": fun.分辨率y * 0.3, // y: 起始Y位置
        //"backgroundColor": "#336699" // backgroundColor:背景颜色，例如#336699
    }

    setCtrlViewSizeEx(m)

}
//获取系统时间,
fun.获取时间 = function () {
    //模块.获取时间().秒
    let date = new Date();

    //这个时间只是拿来计算任务超时的时间,不是当时的年月日时分秒时间
    let 毫秒 = date.getTime(); //(从1970.1.1开始的毫秒数)
    let 秒 = 毫秒 / 1000;
    let 分钟 = 秒 / 60;

    //当前年月日时间
    let 年份 = date.getFullYear();    //  返回的是年份
    let 月份 = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
    let 几号 = date.getDate();       //  返回的是几号
    let 哪一天 = date.getDay();          //  周一返回的是1，周六是6，但是周日是0
    let 每一天 = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
    let 小时 = date.getHours();                 // 获取当前小时数(0-23)
    let 分钟数 = date.getMinutes();              // 获取当前分钟数(0-59)
    let 秒数 = date.getSeconds();             // 获取当前秒数(0-59)
    let 周几 = 每一天[哪一天]

    //logd("今天是" + 年份 + "年" + 月份 + "月" + 几号 + "日" + 周几);

    return {'毫秒': 毫秒, '秒': 秒, '分钟': 分钟, '年份': 年份, '月份': 月份, '几号': 几号, '周几': 周几, '小时': 小时, '分钟数': 分钟数, '秒数': 秒数}
};

fun.字符串长度 = function (a) {

    let str = a + ''
    let 长度 = str.length
    return 长度


};

fun.网络访问 = function (a) {
    let 网址 = a;
    let 参数map表 = {
        "code": "64e62c6126e24bd2"
    }
    let 超时 = 10;//秒数
    let res = http.httpGet(网址, null, 超时 * 1000, null);
    // 等待(1);
    if (res == null && res != '') {
        loge("网络访问,网络错误");
        return;
    }
    return res
}

fun.随机地名 = function () {

    logd('随机地名');

    let 链接 = 'https://zxm-1304278145.cos.ap-nanjing.myqcloud.com/%E5%85%A8%E5%9B%BD%E5%8E%BF%E5%9F%8E.txt'

    let 结果 = 模块.网络访问(链接)

    sleep(500)

    if (!结果) {
        return null
    }
    // 结果 = 结果.网页内容
    // logd(结果)

    let 随机分割 = 模块.随机获取数组元素(结果, '\n')

    // logd(随机分割)

    return 随机分割 + ''

}

fun.随机姓氏 = function () {

    logd('随机姓氏');

    let 链接 = 'https://zxm-1304278145.cos.ap-nanjing.myqcloud.com/%E5%A7%93.txt'

    let 结果 = 模块.网络访问(链接)

    sleep(500)

    if (!结果) {
        return null
    }
    // 结果 = 结果.网页内容
    // logd(结果)

    let 随机分割 = 模块.随机获取数组元素(结果, '\n')

    // logd(随机分割)

    return 随机分割 + ''

}


fun.刷新控件缓存 = function (a, b) {
    return true
}
fun.纵向滑动屏幕 = function (a, b) {
    logd('纵向滑动屏幕:' + a + '=>' + b)
    swipeToPoint(fun.分辨率x * 0.5, fun.分辨率y * a, fun.分辨率x * 0.5, fun.分辨率y * b, 1000);
}
fun.横向滑动屏幕 = function (a, b) { //方便右滑寻找关注,进入粉丝列表那个操作,分辨率y是计算纵向坐标在哪
    logd('横向滑动屏幕:' + a + '=>' + b)
    swipeToPoint(fun.分辨率x * a, fun.分辨率y * 0.7, fun.分辨率x * b, fun.分辨率y * 0.7, 1000);
}
fun.当前APP包名 = function () {
    let 包名 = context.getPackageName()
    // logd(包名);
    return 包名 + ''
}
fun.贴牌版本 = function () {

    let 兰总热更地址 = 'http://47.92.148.1/update?pkg=DY'
    let 测试热更地址 = 'http://47.92.148.1/update?pkg=test_5_6'

    if (fun.获取本地热更新地址() === 测试热更地址) {
        logd('公司内部测试包名');
        toast('公司内部测试包名');
        return '内部测试'
    }

    if (fun.当前APP包名() === 'com.huituibao.huituibao' || fun.当前APP包名() === 'com.jiutuibao.jiutuibao') {
        logd('LZBM');
        return '兰总'
    }
    if (fun.当前APP包名() === 'com.qituibao.qituibao') {    //李总
        logd('LLBM');
        if (fun.获取本地热更新地址() === 兰总热更地址) {
            toast('此版本已停止维护,禁止运行')
            exit()
        }
        return '老李'
    }
    if (fun.当前APP包名() === 'com.woketu.woketu') {    //李绍华
        logd('lshBM');
        return '李绍华'
    }
    if (fun.当前APP包名() === 'com.aimakeji.aimakeji') {    //爱玛,王总
        logd('AMBM');
        // if (fun.获取本地热更新地址() === 兰总热更地址) {
        //     toast('此版本已停止维护,禁止运行')
        //     exit()
        // }
        return '爱玛'
    }
    if (fun.当前APP包名() === 'com.weixin.weixin') { //
        logd('微信加人用');
        return '微信加人用'
    }
    if (fun.当前APP包名() === 'com.chuangkeyou.chuangkeyou') {    //张小泉
        logd('ZXQBM');
        if (fun.获取本地热更新地址() === 兰总热更地址) {
            toast('此版本已停止维护,禁止运行')
            exit()
        }
        return '张小泉'
    }
    if (fun.当前APP包名() === 'com.caiji.caiji') {    //抖音团购采集
        logd('CJBM');
        return '采集'
    }
    if (fun.当前APP包名() === 'com.dyhsb.dyhsb') {    //抖音火山版采集
        logd('DYHSBBM');
        return '抖音火山版采集'
    }
    if (fun.当前APP包名() === 'com.zhuti.zhuti') {    //猪蹄_同城引流
        logd('zhuti包名');
        return '猪蹄'
    }
    if (fun.当前APP包名() === 'com.yihuoke.yihuoke') {    //小朱
        logd('XZBM');
        if (fun.获取本地热更新地址() === 兰总热更地址) {
            toast('此版本已停止维护,禁止运行')
            exit()
        }
        return '小朱'
    }
    if (fun.当前APP包名() === 'com.yunkezhushou.yunkezhushou') {    //郑总
        logd('ZZBM');
        if (fun.获取本地热更新地址() === 兰总热更地址) {
            toast('此版本已停止维护,禁止运行')
            exit()
        }
        return '郑总'
    }
    if (fun.当前APP包名() === 'com.kexianfeng.kexianfeng') {    //康敏富
        logd('KZBM');
        if (fun.获取本地热更新地址() === 兰总热更地址) {
            toast('此版本已停止维护,禁止运行')
            exit()
        }
        return '康总'
    }
}
fun.申请权限 = {

    悬浮窗: function () {
        utils.openIntentAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
    },
    通知: function () {
        utils.openIntentAction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
    },
    勿扰: function () {
        utils.openIntentAction("android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS");
    },
    忽略电池优化: function () {
        utils.openIntentAction("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS");
    },
    节电助手: function () {
        utils.openIntentAction("android.settings.BATTERY_SAVER_SETTINGS");
    },
    后台弹出: function () {
        utils.openIntentAction("");
    },
    自启动: function () {
        utils.openIntentAction("");
    },
    关联启动: function () {
        utils.openIntentAction("");
    },
    修改系统设置: function () {
        utils.openIntentAction("android.settings.action.MANAGE_WRITE_SETTINGS");
    },
    输入法: function () {
        utils.openIntentAction("android.settings.HARD_KEYBOARD_SETTINGS");
    },
    系统设置首页: function () {
        utils.openIntentAction("android.settings.AIRPLANE_MODE_SETTINGS");
    },
    应用管理: function () {
        utils.openIntentAction("android.settings.APPLICATION_SETTINGS");
    },
    通知使用权: function () {
        utils.openIntentAction("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
    },

}
fun.数据库 = {

    获取脚本远程参数: function (a) { // 打包的包名必须要吻合

        logd('获取脚本远程参数');
        toast('获取脚本远程参数');

        // let 脚本功能 // 区分获取参数用的

        this.脚本功能 = fun.贴牌版本()

        // this.脚本功能 = '抖音火山版采集' // 测试用的,打包要注释

        let 链接 = 'https://zxm-1304278145.cos.ap-nanjing.myqcloud.com/%E6%8A%96%E9%9F%B3%E8%BF%9C%E7%A8%8B%E5%8F%82%E6%95%B0/%E8%84%9A%E6%9C%AC%E9%87%87%E9%9B%86%E8%BF%9C%E7%A8%8B%E5%8F%82%E6%95%B0.json'

        while (true) {

            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                continue
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);

            // logd(this.脚本功能);

            let 存入环境 = 结果[this.脚本功能]['存入环境']

            let 筛选粉丝数量 = 结果[this.脚本功能][存入环境]['筛选粉丝数量']
            let 筛选作品天数 = 结果[this.脚本功能][存入环境]['筛选作品天数']

            logd(存入环境, 筛选粉丝数量, 筛选作品天数);

            return {'存入环境': 存入环境, '筛选粉丝数量': 筛选粉丝数量, '筛选作品天数': 筛选作品天数}

        }
    },
    存数据: function (a) { // 最后一个 Z592915

        let 链接 = 'http://47.92.148.1:3002/api/v1/tiTok/push?userID=' + a
        // try {
        let 结果 = fun.网络访问(链接)
        sleep(500)
        if (!结果) {
            return null
        }
        // 结果 = 结果.网页内容
        logd(结果)
        结果 = JSON.parse(结果);
        if (结果.code == 0) {
            logd('存数据成功')
            let 存入数据 = 结果.data.userID
            return 存入数据
        }
        return null
        // } catch (error) {
        //     loge('存数据:' + error)
        //     return null
        // }
    },
    取数据: function () {

        let 链接 = 'http://47.92.148.1:3002/api/v1/tiTok/get?deviceName=' + fun.设备标识
        // try {
        let 结果 = fun.网络访问(链接)
        sleep(500)
        if (!结果) {
            return null
        }
        // 结果 = 结果.网页内容
        logd(结果)
        结果 = JSON.parse(结果);
        if (结果.code == 0) {
            logd('取数据成功')
            let 抖音id = 结果.data.userID
            return 抖音id
        }
        return null
        // } catch (error) {
        //     loge('取数据:' + error)
        //     return null
        // }
    },
    巨推宝_取数据: function () {

        logd('巨推宝_取数据')

        let 链接 = "http://123.57.133.12/api/getSeed?code=64e62c6126e24bd2"
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        // try {
        let 结果 = fun.网络访问(链接)
        sleep(500)
        if (!结果) {
            return null
        }
        // 结果 = 结果.网页内容
        logd(结果)
        结果 = JSON.parse(结果);
        if (结果.code == 0) {
            logd('巨推宝_取数据成功')
            let 抖音id = 结果.data.userCode
            if (抖音id === null) {
                logd('巨推宝_取数据没有数据了');
                return '没数据了'
            }
            return 抖音id
        }
        return null
        // } catch (error) {
        //     loge('巨推宝_取数据:' + error)
        //     return null
        // }
    },
    小武_取数据: function () {

        let 链接 = "http://120.78.148.192:5000/dy-id/query2/zjsjk"
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        // try {
        let 结果 = fun.网络访问(链接)
        sleep(500)
        if (!结果) {
            return null
        }
        // 结果 = 结果.网页内容
        logd(结果)
        结果 = JSON.parse(结果);
        if (结果.code == 0) {
            logd('小武_取数据成功')
            let 抖音id = 结果.data.displayId
            if (抖音id === null) {
                logd('数据库没有数据了');
                return '没数据了'
            }
            return 抖音id
        }
        return null
        // } catch (error) {
        //     loge('小武_取数据:' + error)
        //     return null
        // }
    },
    小武_999_wgq已存在电话号码: function (电话号码) {

        logd('小武_999_wgq已存在电话号码');
        logd('电话号码:' + 电话号码);

        let 链接 = 'http://120.78.148.192:5000/dy-id/check/dy999_wgq?type=phone&value=' + 电话号码
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        while (true) {
            // try {
            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                return null
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);
            if (结果.code == 0) {
                if (结果.data.value) {
                    logd('小武_999_wgq已存在电话号码')
                    return true
                } else {
                    logd('小武_999_wgq没有存在此电话号码')
                    return null
                }
            }
            // return null
            // } catch (error) {
            //     loge('小武_999_wgq已存在电话号码:' + error)
            //     // return null
            // }
        }
    },
    小武_999已存在电话号码: function (电话号码) {

        logd('小武_999已存在电话号码');
        logd('电话号码:' + 电话号码);

        let 链接 = 'http://120.78.148.192:5000/dy-id/check/dy999?type=phone&value=' + 电话号码
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        while (true) {
            // try {
            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                return null
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);
            if (结果.code == 0) {
                if (结果.data.value) {
                    logd('小武_999已存在电话号码')
                    return true
                } else {
                    logd('小武_999没有存在此电话号码')
                    return null
                }
            }
            // return null
            // } catch (error) {
            //     loge('小武_已存在电话号码:' + error)
            //     // return null
            // }
        }
    },
    小武_兰总全数据库已存在电话号码: function (电话号码) {

        logd('小武_兰总全数据库已存在电话号码');
        logd('电话号码:' + 电话号码);

        let 手机号码 = 电话号码
        let x = ""
        let url = "http://120.78.148.192:5000/dy-id/unique";
        let pa = {
            "phone": 手机号码,
            "filterTableName": [
                "dy999",
                "xnhmzzc",
                "tg",
                'hs',
            ]
        }

        while (true) {
            try {
                x = http.postJSON(url, pa, 10 * 1000, {"User-Agent": "test"});
                logd(x);
                x = JSON.parse(x);
                if (x.code == 0) {
                    if (x.data.value) {
                        logd('小武_兰总数据库没有存在电话号码')
                        return null
                    } else {
                        logd('小武_兰总数据库已经存在电话号码')
                        return true
                    }
                }
            } catch (error) {
                loge('小武_兰总全数据库已存在电话号码:' + error);
            }
        }
    },
    小武_wgq全数据库已存在电话号码: function (电话号码) {

        logd('小武_wgq全数据库已存在电话号码');
        logd('电话号码:' + 电话号码);

        let 手机号码 = 电话号码
        let x = ""
        let url = "http://120.78.148.192:5000/dy-id/unique";
        let pa = {
            "phone": 手机号码,
            "filterTableName": [
                "dy999_wgq",
                "xnhmzzc_wgq",
                "tg_wgq",
                'hs_wgq',
            ]
        }

        while (true) {
            try {
                x = http.postJSON(url, pa, 10 * 1000, {"User-Agent": "test"});
                logd(x);
                x = JSON.parse(x);
                if (x.code == 0) {
                    if (x.data.value) {
                        logd('小武_wgq数据库没有存在电话号码')
                        return null
                    } else {
                        logd('小武_wgq数据库已经存在电话号码')
                        return true
                    }
                }
            } catch (error) {
                loge('小武_wgq全数据库已存在电话号码:' + error);
            }
        }
    },
    小武_xnhmzzc已存在电话号码: function (电话号码) {

        logd('小武_xnhmzzc已存在电话号码');
        logd('电话号码:' + 电话号码);

        let 链接 = 'http://120.78.148.192:5000/dy-id/check/xnhmzzc?type=phone&value=' + 电话号码
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        while (true) {
            // try {
            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                return null
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);
            if (结果.code == 0) {
                if (结果.data.value) {
                    logd('小武_xnhmzzc已存在电话号码')
                    return true
                } else {
                    logd('小武_xnhmzzc没有存在此电话号码')
                    return null
                }
            }
            // return null
            // } catch (error) {
            //     loge('小武_xnhmzzc已存在电话号码:' + error)
            //     // return null
            // }
        }
    },
    小武_上传数据到dy: function (环境名, 昵称, id, 电话号码) {

        logd('小武_上传数据到dy')
        logd('环境名:' + 环境名)
        logd('昵称:' + 昵称)
        logd('id:' + id)
        logd('电话号码:' + 电话号码)

        let 链接 = 'http://120.78.148.192:5000/dy-id/add/' + 环境名 + '?nickname=' + 昵称 + '&displayId=' + id + '&phone=' + 电话号码
        // {"code":0,"data":{"method":null,"displayId":"85858475582","nickname":"85858475582","gender":null,"uid":null,"secUid":null,"phone":"85858475582","info":null}}
        while (true) {
            // try {
            let 结果 = fun.网络访问(链接)
            sleep(500)
            if (!结果) {
                return null
            }
            // 结果 = 结果.网页内容
            logd(结果)
            结果 = JSON.parse(结果);
            if (结果.code == 0) {
                if (结果.data.success == 1) {
                    logd('小武_上传数据到dy' + '成功')
                }
                return true
            }
            // return null
            // } catch (error) {
            //     loge('小武_上传数据到dy:' + error)
            //     // return null
            // }
        }
    },

}

// pkgName = APP包名
fun.打开APP详情页 = function (pkgName) {
    return utils.openActivity({
        "action": "android.settings.APPLICATION_DETAILS_SETTINGS",
        "uri": "package:" + pkgName
    })
}

fun.关闭无障碍自动化 = function () {
    let re = closeEnv(false)
    logd('关闭无障碍自动化:' + re);
}

fun.获取本地热更新地址 = function () {
    let 本地热更新地址 = JSON.parse(readIECFileAsString("update.json")).update_url
    // logd('本地热更新地址:' + 本地热更新地址);
    return 本地热更新地址
}

fun.运行中热更_死循环 = function () {

    logd('运行中热更_死循环')

    let 超时秒数 = 60
    let 起始时间 = fun.获取时间().秒

    while (true) {

        try {

            if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
                logd('运行中热更_死循环,' + '任务超时,请检查手机网络')
                toast('运行中热更_死循环,' + '任务超时,请检查手机网络')
                //loge('下载IEC文件错误信息:' + error)
                // restartScript(null, true, 3)
                // exit()
                // return null
            }

            // while (true) {
            // 获取本地update.json里面的update version版本号
            let version = JSON.parse(readIECFileAsString("update.json")).version
            logd('本地版本号:' + version);
            // toast("Hello World -> " + version);
            //请求服务器是否有新版本,请求的地址是获取本地update.json里面的update_url
            let updateResult = hotupdater.updateReq();
            logd("请求更新是否有: " + updateResult);

            if (!updateResult) {
                logw("请求失败错误信息: " + hotupdater.getErrorMsg());
                // toast(hotupdater.getErrorMsg())
                return true
                //if (hotupdater.getErrorMsg() === '版本一致无需更新'){
                //return true
                //}
            } else {
                logd("请求数据: " + hotupdater.getUpdateResp());
                toast('更新中...');
                //有更新得情况下进行下载新的版本
                let path = hotupdater.updateDownload();
                logd("下载路径为: " + path);
                if (!path) {
                    logw("下载IEC文件错误信息: " + hotupdater.getErrorMsg());
                } else {
                    logd('下载新iec成功,启动新');
                    toast('更新成功,重新启动...');
                    restartScript(path, true, 3)
                    exit()
                    return
                }
            }
            // sleep(10 * 1000);
            // }
        } catch (error) {
            loge('运行中热更_死循环,下载IEC文件错误信息:' + error)
            //restartScript(null, true, 3)
            //exit()
            //return
        }

        sleep(7000);

    }


}

fun.运行中热更 = function () {

    logd('运行中热更')

    let 超时秒数 = 60
    let 起始时间 = fun.获取时间().秒

    //while (true) {

    try {

        if ((fun.获取时间().秒 - 起始时间) > 超时秒数) {
            logd('运行中热更,' + '任务超时,请检查手机网络')
            toast('运行中热更,' + '任务超时,请检查手机网络')
            //loge('下载IEC文件错误信息:' + error)
            restartScript(null, true, 3)
            exit()
            return null
        }

        // while (true) {
        // 获取本地update.json里面的update version版本号
        let version = JSON.parse(readIECFileAsString("update.json")).version
        logd('本地版本号:' + version);
        // toast("Hello World -> " + version);
        //请求服务器是否有新版本,请求的地址是获取本地update.json里面的update_url
        let updateResult = hotupdater.updateReq();
        logd("请求更新是否有: " + updateResult);

        if (!updateResult) {
            logw("请求失败错误信息: " + hotupdater.getErrorMsg());
            // toast(hotupdater.getErrorMsg())
            return true
            //if (hotupdater.getErrorMsg() === '版本一致无需更新'){
            //return true
            //}
        } else {
            logd("请求数据: " + hotupdater.getUpdateResp());
            toast('更新中...');
            //有更新得情况下进行下载新的版本
            let path = hotupdater.updateDownload();
            logd("下载路径为: " + path);
            if (!path) {
                logw("下载IEC文件错误信息: " + hotupdater.getErrorMsg());
            } else {
                logd('下载新iec成功,启动新');
                toast('更新成功,重新启动...');
                restartScript(path, true, 3)
                exit()
                return
            }
        }
        // sleep(10 * 1000);
        // }
    } catch (error) {
        loge('下载IEC文件错误信息:' + error)
        //restartScript(null, true, 3)
        //exit()
        //return
    }

    sleep(1500);

    //}


}

fun.设备 = {

    点击延时: 2500,

    控件: {

        '强行停止': text("强行停止"),
        '结束运行': text("结束运行"),
        '确定': text("确定"),

    },

    点击强行停止: function () {

        let 提示信息 = '强行停止'
        logd('寻找:' + 提示信息)
        if (fun.获取设备id() != 'FJH7N18916010166') {
            logd('不是华为nova3');
            fun.强制刷新节点()
        } else {
            logd('是华为nova3');
        }
        // fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.强行停止.visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击确定: function () {

        let 提示信息 = '确定'
        logd('寻找:' + 提示信息)
        if (fun.获取设备id() != 'FJH7N18916010166') {
            logd('不是华为nova3');
            fun.强制刷新节点()
        } else {
            logd('是华为nova3');
        }
        // fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.确定.visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },
    点击结束运行: function () {

        let 提示信息 = '结束运行'
        logd('寻找:' + 提示信息)
        if (fun.获取设备id() != 'FJH7N18916010166') {
            logd('不是华为nova3');
            fun.强制刷新节点()
        } else {
            logd('是华为nova3');
        }
        // fun.强制刷新节点()
        //获取单个节点
        let re = this.控件.结束运行.visible(true).getOneNodeInfo(0)
        if (re) {
            logd('找到点击:' + 提示信息)
            clickPoint((re.bounds.left + re.bounds.right) / 2, (re.bounds.top + re.bounds.bottom) / 2)
            sleep(this.点击延时)
            return re
        }
        logd('没找到:' + 提示信息)
        return null

    },

}

fun.随机获取数组元素 = function (文本, 分割符号) {
    let arr = 文本.split(分割符号)
    // logd('arr:' + arr)
    let 下标 = random(0, arr.length - 1)
    // logd('下标:' + 下标)
    let 元素 = arr[下标]
    // logd('元素:' + 元素)
    return 元素
}

fun.判断是否是最新版 = function (url) {
    try {
        let 本地版本号 = JSON.parse(readIECFileAsString("update.json")).version
        logd('本地版本号:' + 本地版本号);

        let 热更新版本号
        let 热更新地址 = url
        let 结果 = fun.网络访问(url)
        if (结果) {
            结果 = JSON.parse(结果);
            热更新版本号 = 结果.version
            logd('热更新版本号:' + 热更新版本号)

        }

    } catch (error) {
        loge('判断是否是最新版:' + error);
    }

}

//  依托于老冷的js插件
//  对话框消息('警告!!', '验证失败,禁止运行')
fun.对话框消息 = function (a, b) {
    logd('对话框标题:' + a);
    logd('对话框内容:' + b);
    toast(a + ',' + b);
    laoleng.Alert.dialog(a, b)
}
fun.保持屏幕唤醒状态 = function () {    //autojs文档说要在脚本本身界面执行才会生效
    logd('bcpmhxzt');
    device.keepScreenOn();
}
fun.显示启停浮窗 = function () {

    logd('显示启停浮窗');

    let re = showCtrlWindow()
    logd(re);

    return re

}
fun.关闭日志浮窗 = function () {

    logd('关闭日志浮窗');

    if (fun.贴牌版本() === '采集') {
        logd('采集软件,不关闭日志浮窗');
        return
    }
    if (fun.贴牌版本() === '抖音火山版采集') {
        logd('抖音火山版采集,不关闭日志浮窗');
        return
    }

    let re = closeLogWindow()
    logd(re);

    return re

}
fun.关闭日志浮窗_不区分包名 = function () {

    logd('关闭日志浮窗_不区分包名');

    let re = closeLogWindow()
    logd(re);

    return re

}
fun.保存日志到本地 = function () {

    logd('保存日志到本地');

    try {

        if (fun.贴牌版本() === '兰总') {

            let myDate = new Date()
            let 最长毫秒数 = myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)

            let 日志文件名 = 最长毫秒数 + ''
            logd(日志文件名);
            setSaveLogEx(true, "/sdcard/日志/", 1024 * 1024, 日志文件名);

            // let s = setSaveLog(true, "/sdcard/a_rizhi/", 1024 * 1024);
            // logd("save dir is:" + s);
        } else {
            file.deleteAllFile("/sdcard/日志/");
        }
    } catch (error) {
        loge('保存日志到本地:' + error);
    }

}
fun.设置日志窗口 = function () {
    logd('设置日志窗口')
    if (fun.贴牌版本() === '兰总') {
        setLogViewSizeEx(
            {
                "x": fun.分辨率x * 0.1,
                "y": fun.分辨率y * 0.5,
                "w": fun.分辨率x * 0.5,
                "h": fun.分辨率y * 0.4,
                "textSize": 12,
                "backgroundColor": "#FCFCFC",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '老李') {
        setLogViewSizeEx(
            {
                "x": 0,
                "y": fun.分辨率y * 0.6,
                "w": 500,
                "h": 700,
                "textSize": 12,
                "backgroundColor": "#616130",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '李绍华') {
        setLogViewSizeEx(
            {
                "x": 0,
                "y": fun.分辨率y * 0.5,
                "w": 500,
                "h": 700,
                "textSize": 12,
                "backgroundColor": "#4F4F4F",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '张小泉') {
        setLogViewSizeEx(
            {
                "x": 0,
                "y": fun.分辨率y * 0.5,
                "w": 500,
                "h": 700,
                "textSize": 12,
                "backgroundColor": "#4F4F4F",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '小朱') {
        setLogViewSizeEx(
            {
                "x": 0,
                "y": fun.分辨率y * 0.5,
                "w": 500,
                "h": 700,
                "textSize": 12,
                "backgroundColor": "#5B5B00",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '康总') {
        setLogViewSizeEx(
            {
                "x": 0,
                "y": fun.分辨率y * 0.5,
                "w": 500,
                "h": 700,
                "textSize": 12,
                "backgroundColor": "#5B5B00",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '抖音火山版采集') {
        setLogViewSizeEx(
            {
                "x": fun.分辨率x * 0.3,
                "y": fun.分辨率y * 0.5,
                "w": 350,
                "h": 500,
                "textSize": 12,
                "backgroundColor": "#5B5B00",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }
    if (fun.贴牌版本() === '猪蹄') {
        setLogViewSizeEx(
            {
                "x": fun.分辨率x * 0.1,
                "y": fun.分辨率y * 0.5,
                "w": fun.分辨率x * 0.5,
                "h": fun.分辨率y * 0.4,
                "textSize": 12,
                "backgroundColor": "#5B5B00",
                "backgroundImg": "res/a.png",
                "title": "",
                "backgroundAlpha": 200,
                "showTitle": false
            }
        )
        setLogFixedViewEx({
            "show": false,
            "h": 0,
            "textSize": 0,
            "textColor": "#000000",
            "backgroundColor": "#ffffff"
        })
        return true
    }

    setLogViewSizeEx(
        {
            "x": 200,
            "y": 350,
            "w": 500,
            "h": 700,
            "textSize": 12,
            "backgroundColor": "#5B4B00",
            "backgroundImg": "res/a.png",
            "title": "",
            "backgroundAlpha": 200,
            "showTitle": false
        }
    )
    setLogFixedViewEx({
        "show": false,
        "h": 0,
        "textSize": 0,
        "textColor": "#000000",
        "backgroundColor": "#ffffff"
    })
    return true

}
fun.停止脚本 = function () {
    logd('停止脚本');
    // thread.stopAll();//取消所有正在运行的线程
    exit();//退出脚本
    // ui.stopTask();//停止脚本
}
fun.写入正常退出到本地存储 = function () {
    logd('写入正常退出到本地存储');
    let storage = storages.create("判断正常退出");
    // logd(storage);
    //存储数据
    let r = storage.putString("正常退出", "true");
    logd('写入正常退出到本地存储结果:' + r);
}
// 如果是正常退出,清空本地存储数据,方便下次再判断
// 不准,原本是打算用来判断重启继续运行
fun.判断是否正常退出 = function () {
    logd('判断是否正常退出');
    let storage = storages.create("判断正常退出");
    // logd(storage);
    //读取数据
    let r = storage.getString("正常退出", "") + ""
    logd(r)
    if (r === "true") {
        logd('是正常退出');
        //正常退出,清空本地存储数据,方便下次再判断
        let 清空 = storage.clear()
        logd('清空存储:' + 清空);
        return true
    }
    logd('不是正常退出');
    // logd(r);
}
fun.泡椒云网络验证 = function () {

    // 采集的不需要验证
    if (fun.贴牌版本() === '采集') {
        return true
    }
    if (fun.贴牌版本() === '抖音火山版采集') {
        return true
    }

    // 猪蹄
    if (fun.贴牌版本() === '猪蹄') {
        return true
    }

    // 内部测试的不需要验证
    if (fun.贴牌版本() === '内部测试') {
        return true
    }

    // 猪蹄的不需要验证
    if (fun.获取设备id() === '3e6327a39f624960') {
        logd('猪蹄的不需要验证')
        return true
    }

    // 测试设备不验证
    //if (模块.获取设备id() === 'e4df750f0adcb6ce') {
    //logd('测试设备不验证');
    //return true
    //}

    let storage = storages.create("本地存储");
    storage.putString("登录成功", 'false');

    let AppKey = ''
    let AppSecret = ''
    //  默认慧推宝的泡椒云后台
    logd('MRBM');
    AppKey = "cem3sebdqusush5t2540"
    AppSecret = "XHcLzzZp6sZ9U7PZr6ReBMcAQknSpHE4"
    if (fun.贴牌版本() === '兰总') {
        AppKey = "cem3sebdqusush5t2540"
        AppSecret = "XHcLzzZp6sZ9U7PZr6ReBMcAQknSpHE4"
    }
    if (fun.贴牌版本() === '老李') {    //李总
        AppKey = "cfedo7bdqusrmjaho5mg"
        AppSecret = "arpo6u1ZdP5JKafyVjD9rtztzv3N1sD7"
    }
    if (fun.贴牌版本() === '李绍华') {    //李绍华
        AppKey = "cg1e1krdqustfmclskkg"
        AppSecret = "tVCDNg2cKKk3FxAr0tJshVRpldXOjxKR"
    }
    if (fun.贴牌版本() === '爱玛') {    //爱玛,王总
        AppKey = "chl242bdqusu4ths2tn0"
        AppSecret = "MjG37F3popAVsYI4qk29GolCDnvQQLDh"
    }
    if (fun.贴牌版本() === '张小泉') {    //张小泉
        AppKey = "cgh908jdquson7or9tr0"
        AppSecret = "5h1puzaMCBjJ2O3Sv34ivvhc60lSErUg"
    }
    if (fun.贴牌版本() === '小朱') {    //小朱
        AppKey = "ch1qku3dqusp5jsaiaog"
        AppSecret = "VeDQtOGGaauY8zJHKpyqu4g3OlbCrkXb"
    }
    if (fun.贴牌版本() === '郑总') {    //郑总
        AppKey = "ch45d0bdqusp5jsghco0"
        AppSecret = "pxPPvLPN3NuAFhOUnqbHqiSF1tU1jrT9"
    }
    if (fun.贴牌版本() === '康总') {    //康敏富
        AppKey = "ciangd3dqusrfik4dslg"
        AppSecret = "vkO7H6etapx5laIfc6etpvQ76HmLKdzY"
    }

    let PJYSDK = (function () {
        function PJYSDK(app_key, app_secret) {
            this.debug = true;
            this._lib_version = "v1.05";
            this._protocol = "http";
            this._hosts = ["api3.paojiaoyun.com", "api2.paojiaoyun.com", "api.paojiaoyun.com"];
            this._host = this._hosts[0];
            this._device_id = this.getDeviceID();
            this._retry_count = 50;  //登录失败重试次数
            this._switch_count = 0;
            this._default_timeout = 5 * 1000;

            this._app_key = app_key;
            this._app_secret = app_secret;

            this._card = null;
            this._username = null;
            this._password = null;
            this._token = null;

            this.is_trial = false;  // 是否是试用用户
            this.login_result = {
                "card_type": "",
                "expires": "",
                "expires_ts": 0,
                "config": "",
            };

            this._auto_heartbeat = false // true;  // 是否自动开启心跳任务
            this._heartbeat_gap = 55 * 60 * 1000; // 默认120秒 心跳最大间隔
            this._heartbeat_task = null;
            this._check_time_remaining_task = null;
            this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};

            this._prev_nonce = null;
            this._is_ping = false;
            this._onHeartbeatFailed = function (ret) {
                logd("心跳失败 -> code: " + ret.code + " message: " + ret.message);
            }
        }

        PJYSDK.prototype.SetBackupHosts = function (hosts) { // 设置备用 api host
            this._hosts.concat(hosts);
        }
        PJYSDK.prototype.switchHost = function () { // 切换备用 api host
            this._switch_count++;
            this._host = this._hosts[this._switch_count % this._hosts.length];
        }
        PJYSDK.prototype.onHeartbeatFailed = function (callback) {
            this._onHeartbeatFailed = callback
        }
        PJYSDK.prototype.SetCard = function (card) {
            this._card = card.trim();
        }
        PJYSDK.prototype.SetUser = function (username, password) {
            this._username = username.trim();
            this._password = password;
        }
        PJYSDK.prototype.getDeviceID = function () {
            let id = device.getSerial();
            if (id == null || id === "" || id === "unknown") {
                id = device.getAndroidId();
            }
            if (id == null || id === "" || id === "unknown") {
                id = device.getIMEI();
            }
            return id;
        }
        PJYSDK.prototype.MD5 = function (str) {
            return utils.dataMd5(str);
        }
        PJYSDK.prototype.getTimestamp = function () {
            try {
                let res = this.httpGet("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
                let data = JSON.parse(res);
                return Math.floor(data["data"]["t"] / 1000) - 3;
            } catch (error) {
                try {
                    let res = this.httpGet("https://tptm.hd.mi.com/gettimestamp");
                    let data = JSON.parse(res);
                    return parseInt(data.replace('var servertime=', '')) - 3;
                } catch (error) {
                    return Math.floor(new Date().getTime() / 1000) - 3;
                }
            }
        }
        PJYSDK.prototype._draw_cc_params = function (body) {
            if (!body) return "";
            start = body.indexOf('?');
            if (start < 0) return "";
            end = body.indexOf('";');
            if (end < 0 || end < start) return "";
            return body.substring(start, end);
        }
        PJYSDK.prototype.Ping = function () {
            if (this._is_ping) return;
            try {
                let path = "/v1/ping"
                let url = this._protocol + "://" + this._host + path;
                let resp = http.get(url);
                let body = resp.body.string();
                if (body == "Pong") {
                    log("api连接成功")
                    this._is_ping = true;
                    return
                }
                let params = this._draw_cc_params(body);
                if (params) {
                    let resp2 = http.get(url + params);
                    if (resp2.body.string() == "Pong") {
                        log("api连接成功")
                        this._is_ping = true;
                    }
                } else {
                    this.switchHost();
                }
            } catch (error) {
                this.switchHost();
            }
        }
        PJYSDK.prototype.genNonce = function () {
            const ascii_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let tmp = '';
            for (let i = 0; i < 20; i++) {
                tmp += ascii_str.charAt(Math.round(Math.random() * ascii_str.length));
            }
            return this.MD5(this.getDeviceID() + this._prev_nonce + new Date().getTime() + tmp);
        }
        PJYSDK.prototype.joinParams = function (params) {
            let ps = [];
            for (let k in params) {
                ps.push(k + "=" + params[k])
            }
            ps.sort();
            return ps.join("&")
        }
        PJYSDK.prototype.CheckRespSign = function (resp) {
            if (resp.code !== 0 && resp.nonce === "" && resp.sign === "") {
                return resp
            }

            let ps = "";
            if (resp["result"]) {
                ps = this.joinParams(resp["result"]);
            }

            let s = resp["code"] + resp["message"] + ps + resp["nonce"] + this._app_secret;
            let sign = this.MD5(s);
            if (sign === resp["sign"]) {
                if (this._prev_nonce === null) {
                    this._prev_nonce = resp["nonce"];
                    return {"code": 0, "message": "OK"};
                } else {
                    if (resp["nonce"] > this._prev_nonce) {
                        this._prev_nonce = resp["nonce"];
                        return {"code": 0, "message": "OK"};
                    } else {
                        return {"code": -98, "message": "CRS:nonce校验失败"};
                    }
                }
            }
            return {"code": -99, "message": "CRS:签名校验失败"};
        }
        PJYSDK.prototype.retry_fib = function (num) {
            if (num > 9) {
                return 34
            }
            let a = 0;
            let b = 1;
            for (let i = 0; i < num; i++) {
                let tmp = a + b;
                a = b;
                b = tmp;
            }
            return a
        }
        PJYSDK.prototype._debug = function (path, params, result) {
            if (this.debug) {
                logd("\n" + path + "\nparams:" + JSON.stringify(params, null, "    ") + "\nresult:" + JSON.stringify(result, null, "    "));
            }
        }
        PJYSDK.prototype.httpGet = function (path) {
            let param = {
                "url": path,
                "method": "GET",
                "userAgent": "EasyClick",
                "ignoreHttpErrors": true,
                "timeout": this._default_timeout,
            };
            return http.request(param).body;
        }
        PJYSDK.prototype.httpPost = function (path, data) {
            let param = {
                "url": path,
                "method": "POST",
                "userAgent": "EasyClick",
                "ignoreHttpErrors": true,
                "timeout": this._default_timeout,
                "data": data,
            };
            return http.request(param).body;
        }
        PJYSDK.prototype.Request = function (method, path, params) {
            this.Ping();
            // 构建公共参数
            params["app_key"] = this._app_key;

            method = method.toUpperCase();
            let max_retries = this._retry_count;
            let retries_count = 0;

            let data = {"code": -1, "message": "连接服务器失败"};
            do {
                let url = this._protocol + "://" + this._host + path;
                retries_count++;
                let sec = this.retry_fib(retries_count);

                delete params["sign"];
                params["nonce"] = this.genNonce();
                params["timestamp"] = this.getTimestamp();
                let ps = this.joinParams(params);
                let s = method + this._host + path + ps + this._app_secret;
                let sign = this.MD5(s);
                params["sign"] = sign;

                let resp;
                try {
                    if (method === "GET") {
                        resp = this.httpGet(url + "?" + ps + "&sign=" + sign);
                    } else {  // POST
                        resp = this.httpPost(url, params);
                    }
                    data = JSON.parse(resp);
                    this._debug(method + '-' + path + ':', params, data);

                    let crs = this.CheckRespSign(data);
                    if (crs.code !== 0) {
                        return crs;
                    } else {
                        return data;
                    }
                } catch (error) {
                    if (this._debug) {
                        logd("[*] request error: ", error, sec + "s后重试");
                    }
                    this._debug(method + '-' + path + ':', params, resp);
                    this.switchHost();
                    sleep(sec * 1000);
                }
            } while (retries_count < max_retries);

            return data;
        }
        /* 通用 */
        PJYSDK.prototype.GetHeartbeatResult = function () {
            return this._heartbeat_ret;
        }
        PJYSDK.prototype.GetTimeRemaining = function () {
            let g = this.login_result.expires_ts - this.getTimestamp();
            if (g < 0) {
                return 0;
            }
            return g;
        }
        PJYSDK.prototype._clearTask = function () {
            if (this._heartbeat_task !== null) {
                thread.cancelThread(this._heartbeat_task);
                this._heartbeat_task = null;
            }
            if (this._check_time_remaining_task !== null) {
                thread.cancelThread(this._check_time_remaining_task);
                this._check_time_remaining_task = null;
            }
            this._prev_nonce = null;
        }
        /* 卡密相关 */
        PJYSDK.prototype.CardLogin = function () {  // 卡密登录
            if (!this._card) {
                return {"code": -4, "message": "请先设置卡密"};
            }
            let method = "POST";
            let path = "/v1/card/login";
            let data = {"card": this._card, "device_id": this._device_id};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this._token = ret.result.token;
                this.login_result = ret.result;
                if (this._auto_heartbeat) {
                    this._startCardHeartbeat();
                }
            }
            return ret;
        }
        PJYSDK.prototype.CardHeartbeat = function () {  // 卡密心跳，默认会自动调用
            if (!this._token) {
                return {"code": -2, "message": "请在卡密登录成功后调用"};
            }
            let method = "POST";
            let path = "/v1/card/heartbeat";
            let data = {"card": this._card, "token": this._token};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this.login_result.expires = ret.result.expires;
                this.login_result.expires_ts = ret.result.expires_ts;
            } else {
                this._onHeartbeatFailed(ret);
                this._clearTask();
            }
            return ret;
        }
        PJYSDK.prototype._startCardHeartbeat = function () {  // 开启卡密心跳任务
            this._clearTask();
            let self = this;
            self._heartbeat_ret = self.CardHeartbeat();

            // this._heartbeat_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         self._heartbeat_ret = self.CardHeartbeat();
            //         sleep(self._heartbeat_gap);
            //     }
            // });
            // this._check_time_remaining_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         if (self.GetTimeRemaining() === 0) {
            //             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
            //         }
            //         sleep(5000);
            //     }
            // });

            /* let hbTask = function() {
                self._heartbeat_ret = self.CardHeartbeat();
            };
            this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
            let checkTimeRemaining = function() {
                if (self.GetTimeRemaining() === 0) {
                    self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
                }
            };
            this._check_time_remaining_task = setInterval(checkTimeRemaining, 5000); */
        }
        PJYSDK.prototype.CardLogout = function () {  // 卡密退出登录
            this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
            this._clearTask(); // 结束心跳任务
            if (!this._token) {
                return {"code": 0, "message": "OK"};
            }
            let method = "POST";
            let path = "/v1/card/logout";
            let data = {"card": this._card, "token": this._token};
            let ret = this.Request(method, path, data);
            // 清理
            this._token = null;
            this.login_result = {
                "card_type": "",
                "expires": "",
                "expires_ts": 0,
                "config": "",
            };
            return ret;
        }
        PJYSDK.prototype.CardUnbindDevice = function () { // 卡密解绑设备，需开发者后台配置
            if (!this._token) {
                return {"code": -2, "message": "请在卡密登录成功后调用"};
            }
            let method = "POST";
            let path = "/v1/card/unbind_device";
            let data = {"card": this._card, "device_id": this._device_id, "token": this._token};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.SetCardUnbindPassword = function (password) { // 自定义设置解绑密码
            if (!this._token) {
                return {"code": -2, "message": "请在卡密登录成功后调用"};
            }
            let method = "POST";
            let path = "/v1/card/unbind_password";
            let data = {"card": this._card, "password": password, "token": this._token};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.CardUnbindDeviceByPassword = function (password) { // 用户通过解绑密码解绑设备
            let method = "POST";
            let path = "/v1/card/unbind_device/by_password";
            let data = {"card": this._card, "password": password};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.CardRecharge = function (card, use_card) { // 以卡充卡
            let method = "POST";
            let path = "/v1/card/recharge";
            let data = {"card": card, "use_card": use_card};
            return this.Request(method, path, data);
        }
        /* 用户相关 */
        PJYSDK.prototype.UserRegister = function (username, password, card) {  // 用户注册（通过卡密）
            let method = "POST";
            let path = "/v1/user/register";
            let data = {"username": username, "password": password, "card": card, "device_id": this._device_id};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UserLogin = function () {  // 用户账号登录
            if (!this._username || !this._password) {
                return {"code": -4, "message": "请先设置用户账号密码"};
            }
            let method = "POST";
            let path = "/v1/user/login";
            let data = {"username": this._username, "password": this._password, "device_id": this._device_id};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this._token = ret.result.token;
                this.login_result = ret.result;
                if (this._auto_heartbeat) {
                    this._startUserHeartbeat();
                }
            }
            return ret;
        }
        PJYSDK.prototype.UserHeartbeat = function () {  // 用户心跳，默认会自动开启
            if (!this._token) {
                return {"code": -2, "message": "请在用户登录成功后调用"};
            }
            let method = "POST";
            let path = "/v1/user/heartbeat";
            let data = {"username": this._username, "token": this._token};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this.login_result.expires = ret.result.expires;
                this.login_result.expires_ts = ret.result.expires_ts;
            } else {
                this._onHeartbeatFailed(ret);
                this._clearTask();
            }
            return ret;
        }
        PJYSDK.prototype._startUserHeartbeat = function () {  // 开启用户心跳任务
            this._clearTask();
            let self = this;
            self._heartbeat_ret = self.UserHeartbeat();

            // this._heartbeat_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         self._heartbeat_ret = self.UserHeartbeat();
            //         sleep(self._heartbeat_gap);
            //     }
            // });
            // this._check_time_remaining_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         if (self.GetTimeRemaining() === 0) {
            //             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
            //         }
            //         sleep(5000);
            //     }
            // });

            /* let hbTask = function() {
                self._heartbeat_ret = self.UserHeartbeat();
            };
            this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
            let checkTimeRemaining = function() {
                if (self.GetTimeRemaining() === 0) {
                    self._onHeartbeatFailed({"code": 10250, "message": "用户已到期！"});
                }
            };
            this._check_time_remaining_task = setInterval(checkTimeRemaining, 1000); */
        }
        PJYSDK.prototype.UserLogout = function () {  // 用户退出登录
            this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
            this._clearTask(); // 结束心跳任务
            if (!this._token) {
                return {"code": 0, "message": "OK"};
            }
            let method = "POST";
            let path = "/v1/user/logout";
            let data = {"username": this._username, "token": this._token};
            let ret = this.Request(method, path, data);
            // 清理
            this._token = null;
            this.login_result = {
                "card_type": "",
                "expires": "",
                "expires_ts": 0,
                "config": "",
            };
            return ret;
        }
        PJYSDK.prototype.UserChangePassword = function (username, password, new_password) {  // 用户修改密码
            let method = "POST";
            let path = "/v1/user/password";
            let data = {"username": username, "password": password, "new_password": new_password};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UserRecharge = function (username, card) { // 用户通过卡密充值
            let method = "POST";
            let path = "/v1/user/recharge";
            let data = {"username": username, "card": card};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UserUnbindDevice = function () { // 用户解绑设备，需开发者后台配置
            if (!this._token) {
                return {"code": -2, "message": "请在用户登录成功后调用"};
            }
            let method = "POST";
            let path = "/v1/user/unbind_device";
            let data = {"username": this._username, "device_id": this._device_id, "token": this._token};
            return this.Request(method, path, data);
        }
        /* 配置相关 */
        PJYSDK.prototype.GetCardConfig = function () { // 获取卡密配置
            let method = "GET";
            let path = "/v1/card/config";
            let data = {"card": this._card};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UpdateCardConfig = function (config) { // 更新卡密配置
            let method = "POST";
            let path = "/v1/card/config";
            let data = {"card": this._card, "config": config};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.GetUserConfig = function () { // 获取用户配置
            let method = "GET";
            let path = "/v1/user/config";
            let data = {"user": this._username};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UpdateUserConfig = function (config) { // 更新用户配置
            let method = "POST";
            let path = "/v1/user/config";
            let data = {"username": this._username, "config": config};
            return this.Request(method, path, data);
        }
        /* 软件相关 */
        PJYSDK.prototype.GetSoftwareConfig = function () { // 获取软件配置
            let method = "GET";
            let path = "/v1/software/config";
            return this.Request(method, path, {});
        }
        PJYSDK.prototype.GetSoftwareNotice = function () { // 获取软件通知
            let method = "GET";
            let path = "/v1/software/notice";
            return this.Request(method, path, {});
        }
        PJYSDK.prototype.GetSoftwareLatestVersion = function (current_ver) { // 获取软件最新版本
            let method = "GET";
            let path = "/v1/software/latest_ver";
            let data = {"version": current_ver};
            return this.Request(method, path, data);
        }
        /* 试用功能 */
        PJYSDK.prototype.TrialLogin = function () {  // 试用登录
            let method = "POST";
            let path = "/v1/trial/login";
            let data = {"device_id": this._device_id};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this.is_trial = true;
                this.login_result = ret.result;
                if (this._auto_heartbeat) {
                    this._startTrialHeartbeat();
                }
            }
            return ret;
        }
        PJYSDK.prototype.TrialHeartbeat = function () {  // 试用心跳，默认会自动调用
            let method = "POST";
            let path = "/v1/trial/heartbeat";
            let data = {"device_id": this._device_id};
            let ret = this.Request(method, path, data);
            if (ret.code === 0) {
                this.login_result.expires = ret.result.expires;
                this.login_result.expires_ts = ret.result.expires_ts;
            } else {
                this._onHeartbeatFailed(ret);
                this._clearTask();
            }
            return ret;
        }
        PJYSDK.prototype._startTrialHeartbeat = function () {  // 开启试用心跳任务
            this._clearTask();
            let self = this;
            self._heartbeat_ret = self.TrialHeartbeat();

            // this._heartbeat_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         self._heartbeat_ret = self.TrialHeartbeat();
            //         sleep(self._heartbeat_gap);
            //     }
            // });
            // this._check_time_remaining_task = thread.execAsync(function () {
            //     while (self._heartbeat_ret.code === 0) {
            //         if (self.GetTimeRemaining() === 0) {
            //             self._onHeartbeatFailed({"code": 10210, "message": "卡密已过期！"});
            //         }
            //         sleep(5000);
            //     }
            // });

            /* let hbTask = function() {
                self._heartbeat_ret = self.TrialHeartbeat();
            };
            this._heartbeat_task = setInterval(hbTask, self._heartbeat_gap);
            let checkTimeRemaining = function() {
                if (self.GetTimeRemaining() === 0) {
                    self._onHeartbeatFailed({"code": 10406, "message": "试用已到期！"});
                }
            };
            this._check_time_remaining_task = setInterval(checkTimeRemaining, 1000); */
        }
        PJYSDK.prototype.TrialLogout = function () {  // 试用退出登录，没有http请求，只是清理本地记录
            this.is_trial = false;
            this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
            this._clearTask(); // 结束心跳任务
            // 清理
            this._token = null;
            this.login_result = {
                "card_type": "",
                "expires": "",
                "expires_ts": 0,
                "config": "",
            };
            return {"code": 0, "message": "OK"};
            ;
        }
        /* 高级功能 */
        PJYSDK.prototype.GetRemoteVar = function (key) { // 获取远程变量
            let method = "GET";
            let path = "/v1/af/remote_var";
            let data = {"key": key};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.GetRemoteData = function (key) { // 获取远程数据
            let method = "GET";
            let path = "/v1/af/remote_data";
            let data = {"key": key};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.CreateRemoteData = function (key, value) { // 创建远程数据
            let method = "POST";
            let path = "/v1/af/remote_data";
            let data = {"action": "create", "key": key, "value": value};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.UpdateRemoteData = function (key, value) { // 修改远程数据
            let method = "POST";
            let path = "/v1/af/remote_data";
            let data = {"action": "update", "key": key, "value": value};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.DeleteRemoteData = function (key, value) { // 删除远程数据
            let method = "POST";
            let path = "/v1/af/remote_data";
            let data = {"action": "delete", "key": key};
            return this.Request(method, path, data);
        }
        PJYSDK.prototype.CallRemoteFunc = function (func_name, params) { // 执行远程函数
            let method = "POST";
            let path = "/v1/af/call_remote_func";
            let ps = JSON.stringify(params);
            let data = {"func_name": func_name, "params": ps};
            let ret = this.Request(method, path, data);
            if (ret.code === 0 && ret.result.return) {
                ret.result = JSON.parse(ret.result.return);
            }
            return ret;
        }
        return PJYSDK;
    })();

    let pjysdk = new PJYSDK(AppKey, AppSecret);

    let 激活码 = readConfigString("激活码")   //本地存储里面读取激活码
    logd('激活码:' + 激活码)
    pjysdk.debug = false;
    pjysdk.SetCard(激活码);

    // 心跳失败回调
    // pjysdk.onHeartbeatFailed(function (hret) {
    //     logd(hret.message);
    //     if (hret.code === 10214) {
    //         sleep(200);
    //         fun.停止脚本()
    //         // setTimeout(exit(), 100); // 退出脚本
    //         return;
    //     }
    //     logd("心跳失败，2s后尝试重登...");
    //     sleep(2000);
    //     let login_ret = pjysdk.CardLogin();
    //     if (login_ret.code === 0) {
    //         logd("重登成功");
    //     } else {
    //         logd(login_ret.message);  // 重登失败
    //         sleep(200);
    //         fun.停止脚本()
    //         // setTimeout(exit(), 100); // 退出脚本
    //     }
    // });

    // 监听正常退出和异常退出执行退出登录操作
    // setStopCallback(function () {
    //     pjysdk.CardLogout(); // 调用退出登录
    //     logd("正常退出,调用退出登录");
    //     fun.关闭无障碍自动化()
    // });
    // setExceptionCallback(function (msg) {
    //     pjysdk.CardLogout(); // 调用退出登录
    //     logd(" 异常退出: " + msg);
    //     fun.关闭无障碍自动化()
    // });

    let login_ret = pjysdk.CardLogin();
    if (login_ret.code !== 0) {
        // 登录失败提示
        toast(login_ret.message);
        storage.putString("登录成功", 'false');
        // 退出脚本()   //退出反正也不生效
        // setTimeout(exit(), 100); // 退出脚本
        return null;
    }

    // 登录成功，后面写你的业务代码

    storage.putString("登录成功", 'true');

    logd(JSON.stringify(pjysdk.login_result, null, "    "));

    写入存储激活码剩余时间()

    logd('泡椒云登录成功,调用退出登录');
    pjysdk.CardLogout(); // 调用退出登录

    return true

    //  泡椒云登录成功以后才能调用
    function 写入存储激活码剩余时间() {

        let ret = pjysdk.GetTimeRemaining() * 1
        let num = ret / 60 / 60 / 24
        num = num.toFixed(2)    //取小数点后两位,比如359.96
        num = num.split('.')
        let 整数部分 = num[0]
        let 小数部分 = '0.' + num[1]
        小数部分 = 小数部分 * 24
        小数部分 = 小数部分.toFixed(2)    //取小数点后两位,比如359.96
        let 显示时间 = 整数部分 + '天' + 小数部分 + '小时'
        logd('剩余时间(秒):' + ret) // 调试的时候方便看时间有没有变动 剩余时间(秒):31103374
        logd('剩余时间:' + 显示时间) // 剩余时间:359天23.76小时

        let 卡密配置 = pjysdk.login_result.config
        //logdo('卡密配置:' + 卡密配置)
        if (卡密配置.indexOf('显示时间', 0) != -1) {
            //logdo('找到字符串:' + '显示时间')
            激活码时间 = 显示时间 + ''
        } else {
            //logdo('没找到字符串:' + '显示时间')
            激活码时间 = 获取设备id() + ''
        }
        storage.putString("激活码时间", 激活码时间);

    }

    function 获取设备id() {
        let id = device.getSerial();
        if (id == null || id === "" || id === "unknown") {
            id = device.getAndroidId();
        }
        if (id == null || id === "" || id === "unknown") {
            id = device.getIMEI();
        }
        return id;
    }

}

module.exports = fun;