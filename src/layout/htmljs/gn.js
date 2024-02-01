new Vue({
    el: '#app',
    data: function () {
        return {
            cards: [
                {
                    title: '某音',
                    fold: true,
                    products: [
                        {
                            name: '智能引流',
                            id:1,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html',
                        },
                        {
                            name: '精准截流',
                            id:2,
                            img_src: 'images/site.png',
                            href: '../../dy_jzyl.html'
                        },
                        {
                            name: '直播场控',
                            id:3,
                            img_src: 'images/site.png',
                            href: '../../dy_zbck.html'
                        },
                        {
                            name: '同城引流',
                            id:4,
                            img_src: 'images/site.png',
                            href: '../../dy_tcyl.html'
                        },
                        {
                            name: '粉丝画像引流',
                            id:5,
                            img_src: 'images/site.png',
                            href: '../../dy_fshxyl.html'
                        },
                        {
                            name: '取消视频点赞',
                            id:6,
                            img_src: 'images/site.png',
                            href: '../../dy_qxspdz.html'
                        },
                    ]
                },
                {
                    title: '某手',
                    fold: true,
                    products: [
                        {
                            name: '万能引流',
                            id:7,
                            img_src: 'images/site.png',
                            href: '../../ks_wnyl.html'
                        },
                        {
                            name: '同城引流',
                            id:8,
                            img_src: 'images/site.png',
                            href: '../../ks_tcyl.html'
                        },
                        {
                            name: '直播场控',
                            id:9,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '智能养号',
                            id:10,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '行业转化',
                            id:11,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '群成员转化',
                            id:12,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '截流评论',
                            id:13,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '精准引流',
                            id:14,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '精准评论',
                            id:15,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        }
                    ]
                },
                {
                    title: '某红书',
                    fold: false,
                    products: [
                        {
                            name: '万能引流',
                            id:16,
                            img_src: 'images/site.png',
                            href: '../../xhs_wnyl.html'
                        },
                        {
                            name: '粉丝转化',
                            id:17,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '行业转化',
                            id:18,
                            img_src: 'images/site.png',
                            href: '../../dy_znyl.html'
                        },
                        {
                            name: '同城引流',
                            id:19,
                            img_src: 'images/site.png',
                            href: '../../xhs_tcyl.html'
                        }
                    ]
                },
                {
                    title: '保活设置',
                    fold: true,
                    products: [
                        {
                            name: '悬浮窗',
                            id:20,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_xfc.html'
                        },
                        {
                            name: '后台无限制',
                            id:21,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_htwxz.html'
                        },
                        {
                            name: '忽略电池优化',
                            id:22,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_hldcyh.html'
                        },
                        {
                            name: '勿扰模式',
                            id:23,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_wrms.html'
                        },
                        {
                            name: '修改系统设置',
                            id:24,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_xgxtsz.html'
                        },
                        {
                            name: '后台锁定',
                            id:25,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_htsd.html'
                        },
                        {
                            name: '通知使用权',
                            id:25,
                            img_src: 'images/qxgl_1.jpg',
                            href: '../../qx_tzsyq.html'
                        }
                    ]
                }
            ]
        }
    },

    methods: {
        toggleCard: function (index) {
            this.cards[index].fold = !this.cards[index].fold
        }
    },
})

//隐藏开始按钮
window.ec.hideStartBtn();

$(function () {

    let 本地存储激活码剩余时间 = window.ec.call('本地存储激活码剩余时间', null);
    $('#注册信息').text(本地存储激活码剩余时间);
    // let 激活码 = window.ec.getConfig("激活码");
    // $("#注册信息").val(激活码);

    let 设备id = window.ec.call('获取设备id', null);
    // console.log("设备id:"+设备id)

    // 更改显示设备标识
    // let res=$('#sbbs').text();
    $('#设备标识').text(设备id);

});