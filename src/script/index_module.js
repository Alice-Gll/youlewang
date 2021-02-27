// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

const $login = $('.login'); //登录前显示
const $admin = $('.admin'); //登录成功显示的
const $btn = $('.admin a'); //退出
const $spans = $('.spans');
const $btns = $('.spans span'); //添加用户名
const $headtopright = $('.head-top-right'); //

//通过本地存储的值判断是否登录成
if (window.localStorage.getItem('loginname')) {
    $admin.show();
    $spans.show();
    $login.hide();
    // $btn.html(window.localStorage.getItem('loginname'));
    // console.log(window.localStorage.getItem('loginname'));
    $btns.html(window.localStorage.getItem('loginname'));
    $headtopright.css('width', '980');
}

//点击退出按钮，让本地存储清空。
$btn.on('click', function() {
    $admin.hide();
    $spans.hide();
    $login.show();
    $headtopright.css('width', '880');
    window.localStorage.removeItem('loginname'); //删除本地存储
});



//引入懒加载模块
import {} from "./jquery.lazyload.js";

//引入分页的模块
import {} from "./jquery.pagination.js";


//渲染
const $list = $('.list ul');
const $midmid = $('.mid-mid ul');
let $page = null;

// 排序的操作-设置初始变量
let $array = [];
let $array_default = [];
let $prev = 0;
let $next = 0;

$.ajax({
    // url: 'http://10.31.165.63/youlegou/php/alldata.php',
    url: 'http://10.31.165.63/youlegou/php/list.php',
    dataType: 'json'
}).done(function(data) {
    $page = data.pagesize;
    // console.log(data);
    let $arrdata = data.pagecontent; //获取初始的数据。
    // console.log($arrdata);
    let $strhtml = '';
    let $strhtmls = '';

    $.each($arrdata, function(index, value) {
        $strhtml += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                    <p>${value.title}</p>
                    <span>￥${value.price}</span>
                    <em>限</em>
                    <p>九洲科瑞数码专营店<br>店铺评分：5.0
                    </p>
                </a>
            </li>
        `;
        $strhtmls += `
        <li>
            <a href="detail.html?sid=${value.sid}">
                <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                <p>${value.title}</p>
                <span>￥${value.price}</span>
            </a>
        </li>
    `;
    });
    $list.html($strhtml); //追加
    $midmid.html($strhtmls); //追加

    // 第一页进行排序
    // 将所有的li添加到数组中
    // 重新重置数组
    $array = [];
    $array_default = [];

    $('.list li').each(function(index, value) {
        $array[index] = $(this);
        $array_default[index] = $(this); //默认状态
    });

    // 添加懒加载
    $('img.lazy').lazyload({
        effect: "fadeIn" //切换形式
    });


    // 分页-点击触发
    // $('.page').pagination({
    //     pageCount: $page, //总的页数
    //     jump: true, //是否开启跳转到指定的页数，布尔值。
    //     prevContent: '上一页',
    //     nextContent: '下一页',
    //     callback: function(api) { //包含当前点击的分页的页码
    //         // console.log(api.getCurrent()); //获取当前的点击的页码。

    //         // 将获取的页面传递给后端
    //         $.ajax({
    //             url: 'http://10.31.165.63/youlegou/php/list.php',
    //             data: {
    //                 page: api.getCurrent()
    //             },
    //             dataType: 'json'
    //         }).done(function(data) {
    //             let $arrdata = data.pagecontent; //获取初始的数据
    //             let $strhtml = '';
    //             $.each($arrdata, function(index, value) {
    //                 $strhtml += `
    //                 <li>
    //                     <a href="detail.html?sid=${value.sid}">
    //                         <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
    //                         <p>${value.title}</p>
    //                         <span>￥${value.price}</span>
    //                         <em>限</em>
    //                         <p>九洲科瑞数码专营店<br>店铺评分：5.0
    //                         </p>
    //                     </a>
    //                 </li>
    //             `;
    //             });
    //             $list.html($strhtml); //追加

    //             // 分页也要重排序
    //             $array = [];
    //             $array_default = [];

    //             $('.list li').each(function(index, value) {
    //                 $array[index] = $(this);
    //                 $array_default[index] = $(this); //默认状态
    //             });

    //             // 添加懒加载
    //             $('img.lazy').lazyload({
    //                 effect: "fadeIn" //切换形式
    //             });

    //         });

    //     }

    // });
    // 分页 - 点击触发
    // $('.page').pagination({
    //     pageCount: $page, //总的页数
    //     jump: true, //是否开启跳转到指定的页数，布尔值。
    //     prevContent: '上一页',
    //     nextContent: '下一页',
    //     callback: function(api) { //包含当前点击的分页的页码
    //         // console.log(api.getCurrent()); //获取当前的点击的页码。

    //         // 将获取的页面传递给后端
    //         $.ajax({
    //             url: 'http://10.31.165.63/youlegou/php/list.php',
    //             data: {
    //                 page: api.getCurrent()
    //             },
    //             dataType: 'json'
    //         }).done(function(data) {
    //             let $arrdata = data.pagecontent; //获取初始的数据
    //             let $strhtml = '';
    //             $.each($arrdata, function(index, value) {
    //                 $strhtml += `
    //                 <li>
    //                     <a href="detail.html?sid=${value.sid}">
    //                         <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
    //                         <p>${value.title}</p>
    //                         <span>￥${value.price}</span>
    //                         <em>限</em>
    //                         <p>九洲科瑞数码专营店<br>店铺评分：5.0
    //                         </p>
    //                     </a>
    //                 </li>
    //             `;
    //             });
    //             $list.html($strhtml); //追加

    //             // 分页也要重排序
    //             $array = [];
    //             $array_default = [];

    //             $('.list li').each(function(index, value) {
    //                 $array[index] = $(this);
    //                 $array_default[index] = $(this); //默认状态
    //             });

    //             // 添加懒加载
    //             $('img.lazy').lazyload({
    //                 effect: "fadeIn" //切换形式
    //             });
    //         });
    //     }
    // });

});




//二.二级菜单

// const $navbox = $('.nav-box');
const $lists = $('.nav-box>.menu>ul>li'); //18
const $cartlist = $('.cartlist');
const $contentlist = $('.cartlist .item'); //18

//1.对应的菜单添加鼠标移入移出的事件。
$lists.hover(function() {
    //当前的li添加样式以及cartlist显示
    $(this).addClass('active').siblings('li').removeClass('active');
    $cartlist.show();

    //内容的切换
    $contentlist.eq($(this).index()).show().siblings('.item').hide();

    //cartlist完全展示出来
    //获取$banner的top值
    //获取滚动条的top值
    //将滚动条的top - $banner的top值 = 结构赋值给cartlist。
    //前提是滚动条的top值大于banner的top值。
    // let $bannertop = $navbox.offset().top;
    // let $scrolltop = $(window).scrollTop();
    // if ($scrolltop > $bannertop) {
    //     $cartlist.css({
    //         top: $scrolltop - $bannertop
    //     })
    // } else {
    //     $cartlist.css({
    //         top: 0
    //     })
    // }

}, function() {
    $cartlist.hide();
    $(this).removeClass('active');
});


//2.给$cartlist添加移入移出的事件。
$cartlist.hover(function() {
    $cartlist.show();
}, function() {
    $cartlist.hide();
});

//三.添加轮播图
const $banner = $('.banner');
const $piclist = $('.banner ul li'); //10张图
const $btnlist = $('.banner ol li'); //10个按钮
const $leftarrow = $('#leftarrow'); //左右箭头
const $rightarrow = $('#rightarrow');

// const $navboxs = $('.nav-box');
const $navboxsbg = $('.nav-box>ul>li'); //10张背景颜色



let $index = 0; //存放索引的变量。
let $timer = null;

//1.鼠标移入小圆圈，进行图片切换 - onmouseover
$btnlist.on('mouseover', function() {
    $index = $(this).index(); //当前的索引
    tabswitch();
});

// //2.点击左右箭头
$rightarrow.on('click', function() {
    $index++;
    if ($index > $btnlist.length - 1) {
        $index = 0;
    }
    tabswitch();
});


$leftarrow.on('click', function() {
    $index--;
    if ($index < 0) {
        $index = $btnlist.length - 1;
    }
    tabswitch();
    $('title').html($index);
});

function tabswitch() {
    $btnlist.eq($index).addClass('active').siblings('ol li').removeClass('active'); //当前的按钮添加类，其他的按钮删除类。
    $piclist.eq($index).stop(true).animate({ //当前的图片显示，其他的图片隐藏  eq支持负数，负数从-1开始从后往前数。
        opacity: 1
    }).siblings('ul li').stop(true).animate({
        opacity: 0
    });
    $navboxsbg.eq($index).stop(true).animate({ //当前的图片显示，其他的图片隐藏  eq支持负数，负数从-1开始从后往前数。
        opacity: 1
    }).siblings('ul li').stop(true).animate({
        opacity: 0
    });
}

//3.自动轮播
//约定的时间自动点击右键头事件。
$timer = setInterval(function() {
    $rightarrow.click();
}, 3000);

//4.鼠标移入bannner停止自动轮播，移出开启自动轮播
$banner.hover(function() {
    clearInterval($timer);
}, function() {
    $timer = setInterval(function() {
        $rightarrow.click();
    }, 3000);
});


// 四.顶部悬浮
//1.思路    
//触发滚轮事件，当scrollTop达到一定的值，让nav隐藏在浏览器的上面。

$(window).on('scroll', function() {
    let $top = $(window).scrollTop();
    // console.log($top);
    if ($top >= 800) {
        $('.fixed-top').css('top', '0');
    } else {
        $('.fixed-top').css('top', '-52px')
    }
});

// 5楼梯效果
//1.楼梯的显示与隐藏 - onscroll事件。
let $stairs = $('.stairs'); //整个楼梯
let $floor = $('.floor'); //3个楼层
let $stairsnav = $('.stairs li').not('.last'); //3个楼梯
function scroll() {
    let $top = $(window).scrollTop();
    if ($top >= 700) {
        $stairs.show();
    } else {
        $stairs.hide();
    }
    //4.通过滚动条的改变，给对应的楼梯添加激活状态(active)
    //核心：滚动条的top和楼层的top值(如果楼层的top值>滚动条的top值，给楼层对应的楼梯添加一个激活状态)
    //获取9个楼层的top值。
    $floor.each(function(index, element) {
        let $floortop = $(element).offset().top + 200; //每一个楼层的top值。
        if ($floortop >= $top) {
            $stairsnav.removeClass('lisbg'); //清除所有的楼梯上面的active。
            $stairsnav.eq(index).addClass('lisbg'); //当前对应的楼梯显示
            return false; //保证都是满足条件的第一个添加active.
        }
    });

    // $('title').html($top);
}
scroll();

$(window).on('scroll', function() {
    scroll();
});

//2.点击楼梯切换到对应的楼层(运动)
//任意的获取每一个楼层的top值。
//点击楼梯，将楼梯对应的楼层的top值给滚动条的top值。
$stairsnav.on('click', function() {
    $(window).off('scroll'); //取消滚轮事件。
    $(this).addClass('lisbg').siblings('li').removeClass('lisbg');
    let $top = $floor.eq($(this).index()).offset().top;
    //赋值给滚动条
    $('html').animate({
        scrollTop: $top
    }, function() { //点击运动结束，开启滚轮事件
        $(window).on('scroll', function() {
            scroll();
        });
    });
});

//3.回到顶部
$('.last').on('click', function() {
    //赋值给滚动条
    $('html').animate({
        scrollTop: 0
    });
});
$('.returntop').on('click', function() {
    //赋值给滚动条
    $('html').animate({
        scrollTop: 0
    });
});