let storage = storages.create("本地存储");
模块 = require("mk/mk.js")

function main() {

    模块.保存日志到本地()

    模块.保持屏幕唤醒状态()

    模块.关闭日志浮窗()

    模块.设置日志窗口()

    // 检查申请悬浮窗权限()

    // 关闭启停浮窗
    // closeCtrlWindow()

    // // 关闭日志浮窗
    // closeLogWindow();

    // //  释放res资源文件到本地目录
    // saveResToFile("site.png", "/sdcard/site.png");
    // // saveResToFile("登录背景.jpg", "/sdcard/登录背景.jpg");
    // saveResToFile("touxiang.png", "/sdcard/touxiang.png");

    //  删除之前释放的图片资源文件
    file.deleteAllFile("/sdcard/site.png");
    file.deleteAllFile("/sdcard/登录背景.jpg");
    file.deleteAllFile("/sdcard/touxiang.png");
    file.deleteAllFile("/sdcard/80s.jpg");
    file.deleteAllFile("/sdcard/播放器.png");

    //  注入函数到h5
    ui.registeH5Function("获取设备id", function () {
        return 模块.获取设备id()//获取设备id()
    })
    ui.registeH5Function("泡椒云网络验证", function () {
        // 模块 = require("mk/mk.js")
        return 模块.泡椒云网络验证()
    })
    ui.registeH5Function("本地存储激活码剩余时间", function () {
        return storage.getString("激活码时间", "") + ""
    })
    ui.registeH5Function("打开快手", function () {
        return 模块.快手.打开快手()
        // 打开快手()
    })
    ui.registeH5Function("打开抖音", function () {
        return 模块.抖音.打开抖音()
        // 打开抖音()
    })
    ui.registeH5Function("打开小红书", function () {
        return 模块.小红书.打开小红书()
        // 打开抖音()
    })

    //  权限
    ui.registeH5Function("权限申请_悬浮窗", function () {
        return 模块.申请权限.悬浮窗()
    })
    ui.registeH5Function("权限申请_后台无限制", function () {
        return 模块.申请权限.应用管理()
    })
    ui.registeH5Function("权限申请_忽略电池优化", function () {
        return 模块.申请权限.忽略电池优化()
    })
    ui.registeH5Function("权限申请_勿扰", function () {
        return 模块.对话框消息('温馨提醒', '拉出通知栏,开启免打扰或者勿扰模式')
        // return 模块.申请权限.系统设置首页()
    })
    ui.registeH5Function("权限申请_修改系统设置", function () {
        return 模块.申请权限.修改系统设置()
    })
    ui.registeH5Function("权限申请_悬浮窗", function () {
        return 模块.申请权限.悬浮窗()
    })
    ui.registeH5Function("权限申请_后台锁定", function () {
        return 模块.对话框消息('温馨提醒', '打开最近任务,锁住软件')
    })
    ui.registeH5Function("权限申请_通知使用权", function () {
        return 模块.申请权限.通知使用权()
    })

    ui.registeH5Function("关闭日志浮窗", function () {
        return 模块.关闭日志浮窗()
    })
    ui.registeH5Function("显示启停浮窗", function () {
        return 模块.显示启停浮窗()
    })
    ui.registeH5Function("申请悬浮窗权限", function () {
        return 模块.申请悬浮窗权限()
    })
    ui.registeH5Function("忽略电池优化_弹窗", function () {
        return 模块.忽略电池优化_弹窗()
    })
    ui.registeH5Function("显示启停控制窗口", function () {
        return 模块.显示启停控制窗口()
    })
    ui.registeH5Function("显示日志", function () {
        return 模块.显示日志()
    })
    ui.registeH5Function("关闭日志", function () {
        return 模块.关闭日志()
    })
    ui.registeH5Function("系统设置", function () {
        return 模块.系统设置()
    })
    ui.registeH5Function("下载抖音", function () {
        return 模块.下载抖音()
    })

    //  function 显示启停控制窗口() {
    //     logd('显示启停控制窗口');
    //     showCtrlWindow();
    //     //  window.ec.showCtrlWindow();
    // }

    // if (模块.贴牌版本() === '微信加人用') {
    //     切换微信标记 = 0
    //     切换微信()
    // }

    function 切换微信() {

        切换微信标记++

        let 超时秒数 = 20
        let 起始时间 = 模块.获取时间().秒

        while (true) {

            home()
            sleep(2000);

            let re = 模块.微信.获取桌面微信数组()
            if (re) {
                if (切换微信标记 % 2 === 0) {  //整除2就点开第二个
                    clickPoint((re[1].bounds.left + re[1].bounds.right) / 2, (re[1].bounds.top + re[1].bounds.bottom) / 2)
                    sleep(3000);
                    return true
                }
                clickPoint((re[0].bounds.left + re[0].bounds.right) / 2, (re[0].bounds.top + re[0].bounds.bottom) / 2)
                sleep(3000);
                return true
            }

            if ((模块.获取时间().秒 - 起始时间) > 超时秒数) {
                // 模块.气泡弹窗('操作粉丝列表用户,' + '任务超时')
                return null
            }
        }

    }

    if (模块.贴牌版本() === '老李') {
        ui.layout("主ui", "muban/qituibao/main.html");

    } else if (模块.贴牌版本() === '李绍华') {
        ui.layout("主ui", "muban/woketu/main.html");

    } else if (模块.贴牌版本() === '张小泉') {
        ui.layout("主ui", "muban/woketu/main.html");

    } else if (模块.贴牌版本() === '小朱') {
        ui.layout("主ui", "muban/yihuoke/main.html");
        // ui.layout("主ui", "muban/yunkezhushou/main.html");
    } else {
        //  加载ui入口,悬浮窗按钮回到ui界面会自动加载main.html,尽量设置main.html为第一入口
        ui.layout("主ui", "muban/huituibao/main.html");
        // logd('加载tp ui');
        // ui.layout("主ui", "muban/yunkezhushou/index.html");

    }


}

main();
