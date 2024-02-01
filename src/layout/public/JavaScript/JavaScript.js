//隐藏开始按钮
window.ec.hideStartBtn();

关闭日志浮窗();

$(function () {

    let 激活码 = window.ec.getConfig("激活码");
    $("#激活码").val(激活码);

    let 设备id = window.ec.call('获取设备id', null);
    // console.log("设备id:"+设备id)

    // 更改显示设备标识
    // let res=$('#sbbs').text();
    $('#sbbs').text(设备id);
    $('#sbbs').val(设备id);

    let 本地存储激活码剩余时间 = window.ec.call('本地存储激活码剩余时间', null);
    $('#注册信息').text(本地存储激活码剩余时间);
});

function 关闭日志浮窗() {
    console.log('执行注入的关闭日志浮窗函数')
    window.ec.call('关闭日志浮窗', null);
}

function 泡椒云网络验证() {
    console.log('执行注入的泡椒云网络验证函数')
    // window.ec.call('泡椒云网络验证', null);

    // sleep(2000)
    let 验证结果 = window.ec.call('泡椒云网络验证', null);
    console.log('验证结果:' + 验证结果)
    if (验证结果 != 'true') { // 我也不知道为啥返回的明明是布尔值,用布尔值判断反而不成立,只能用字符串才能成立
        console.log('验证失败,禁止运行')
        window.ec.toast('验证失败,禁止运行')
        $('#设备标识').text('已到期');
    } else {
        console.log('验证成功,加载功能页面')
        window.ec.toast('验证成功,加载功能页面')
        window.open('index.html', '_self');
    }
    // // 判断是否验证成功
    // let storage = storages.create("本地存储");
    // let re = storage.getString("登录成功", "") + ""
    // if (re != 'true') {
    //     console.log('警告!!', '验证失败,禁止运行')
    // } else {
    //     window.open('gnxz.html', '_self');
    // }
}

//保存参数的函数
function save() {
    let 激活码 = $("#激活码").val();
    window.ec.saveConfig("激活码", 激活码);
    console.log('保存激活码成功:' + 激活码)
    window.ec.toast("保存激活码成功:" + 激活码);
}

function 忽略电池优化_弹窗() {
    console.log('忽略电池优化_弹窗');
    window.ec.call('忽略电池优化_弹窗', null);
}

function 显示启停控制窗口() {
    console.log('显示启停控制窗口');
    window.ec.call('显示启停控制窗口', null);
    // console.log(re)
    // return re
}

function 显示日志() {
    console.log('显示日志');
    window.ec.call('显示日志', null);
}

function 关闭日志() {
    console.log('关闭日志');
    window.ec.call('关闭日志', null);
}

function 系统设置() {
    console.log('系统设置');
    window.ec.call('系统设置', null);
}

function 下载抖音() {
    console.log('下载抖音');
    window.ec.call('下载抖音', null);
}