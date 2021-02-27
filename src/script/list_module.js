//引入jquery模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

//引入懒加载模块
import {} from "./jquery.lazyload.js";

//引入分页的模块
import {} from "./jquery.pagination.js";
/* 
图片懒加载的使用。
1.给图片对象设置宽高。
2.给图片对象添加一个类 -> class='lazy';
3.将图片对象src属性 -> data-original
4.添加js代码执行懒加载动作。
*/

//渲染
const $list = $('.list ul');
let $page = null;

// 排序的操作-设置初始变量
let $array = [];
let $array_default = [];
let $prev = 0;
let $next = 0;

$.ajax({
    url: 'http://10.31.165.63/youlegou/php/list.php',
    dataType: 'json'
}).done(function(data) {
    $page = data.pagesize;
    // console.log(data);
    let $arrdata = data.pagecontent; //获取初始的数据。
    let $strhtml = '';
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
    });
    $list.html($strhtml); //追加

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
    $('.page').pagination({
        pageCount: $page, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) { //包含当前点击的分页的页码
            // console.log(api.getCurrent()); //获取当前的点击的页码。

            // 将获取的页面传递给后端
            $.ajax({
                url: 'http://10.31.165.63/youlegou/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $arrdata = data.pagecontent; //获取初始的数据
                let $strhtml = '';
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
                });
                $list.html($strhtml); //追加

                // 分页也要重排序
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

            });

        }

    });
    // 分页-点击触发
    $('.page').pagination({
        pageCount: $page, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) { //包含当前点击的分页的页码
            // console.log(api.getCurrent()); //获取当前的点击的页码。

            // 将获取的页面传递给后端
            $.ajax({
                url: 'http://10.31.165.63/youlegou/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $arrdata = data.pagecontent; //获取初始的数据
                let $strhtml = '';
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
                });
                $list.html($strhtml); //追加

                // 分页也要重排序
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
            });
        }
    });

});


// 排序-点击按钮事件-冒泡排序
$('p button').eq(0).on('click', function() {
    $.each($array_default, function(index, value) { //value每一个li的元素
        $list.append(value);
    });
    return;
});
$('p button').eq(1).on('click', function() {
    for (let i = 0; i < $array.length - 1; i++) {
        for (let j = 0; j < $array.length - i - 1; j++) {
            $prev = parseFloat($array[j].find('span').html().substring(1)); //第一个价格
            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //第二个价格
            if ($prev > $next) { //交换位置。
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
            }
        }
    }
    $.each($array, function(index, value) {
        $list.append(value);
    });
});

// 实现按钮效果切换
$('p button').on('click', function() {

    $(this).addClass('active').siblings('button').removeClass('active'); //当前点击的按

});