// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

// 点击登录按钮，将用户名和密码传输给后端
const $span = $('form span');
const $btn = $('.btn');
const $tel = $('.tel');
const $checkbox = $('.checkboxs');
const $Sem = $('em');

const $password = $('.password');
$btn.on('click', function() {
    $.ajax({
        type: 'post',
        url: 'http://10.31.165.63/youlegou/php/login.php',
        data: {
            tel: $tel.val(),
            pass: $password.val()
        }
    }).done(function(data) { //data:后端返回的值
        if (data === 'true') { //登录成功:跳转首页，同时首页应该出现用户名等信息(本地存储)。
            window.localStorage.setItem('loginname', $tel.val());

        } else { //登录失败
            $span.html('用户名或者密码错误,请重新输入!');
            // alert('用户名或者密码错误');
            $password.val(''); //清空密码
        }
        if ($checkbox.prop("checked") != true) {
            $Sem.html('请先阅读并同意相关协议');
            $Sem.css('color', '#c52e15');
        } else {
            location.href = 'index1.html';
        }
    })
});

// // 表单验证
// //1.手机号码验证
// //得到焦点，显示提示信息
// $tel.on('focus', function() {
//     $span1.html('请输入正确的手机号码');
//     $span1.css('color', '#333');
// });
// $tel.on('blur', function() {
//     if ($tel.val() !== '') {
//         var $reg = /^1[35789]\d{9}$/;
//         if ($reg.test($tel.val())) {
//             $span1.html('√');
//             $span1.css('color', 'green');
//             $telflag = true;
//         } else {
//             $span1.html('手机号码格式有误');
//             $span1.css('color', '#c52e15');
//             $telflag = false;
//         }
//     } else {
//         $span1.html('手机号码不能为空');
//         $span1.css('color', '#c52e15');
//         $telflag = false;
//     }
// })

// //2.密码验证
// //检测弱中强 - 数字，大写字母，小写字母，特殊字符(#$@^&%)
// //弱：同一类字符
// //中：两类或者三类
// //强：四类字符

// //得到焦点
// $password.on('focus', function() {
//     $span2.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
//     $span2.css('color', '#c52e15');
// });

// //新的事件：oninput:文本框里面的内容发生改变就会触发事件。
// $password.on('input', function() {

//     if ($password.val().length >= 6 && $password.val().length <= 20) {
//         //检测类型
//         var $reg1 = /\d+/; //数字
//         var $reg2 = /[a-z]+/; //小写字母
//         var $reg3 = /[A-Z]+/; //大写字母
//         var $reg4 = /[\W\_]+/; //特殊字符

//         //a1B$a2c#$D
//         var $count = 0; //计算字符的种类
//         if ($reg1.test($password.val())) {
//             $count++;
//         }
//         if ($reg2.test($password.val())) {
//             $count++;
//         }
//         if ($reg3.test($password.val())) {
//             $count++;
//         }
//         if ($reg4.test($password.val())) {
//             $count++;
//         }

//         switch ($count) {
//             case 1:
//                 $span2.html('密码安全级别较低，建议密码最好包含数字，大小写字母，特殊符号');
//                 $span2.css('color', '#333');
//                 $passflag = false;
//                 break;
//             case 2:
//             case 3:
//                 $span2.html('密码安全级别中等');
//                 $span2.css('color', '#333');
//                 $passflag = true;
//                 break;
//             case 4:
//                 $span2.html('密码安全级别较高');
//                 $span2.css('color', '#333');
//                 $passflag = true;
//                 break;
//         }
//     } else {
//         $span2.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
//         $span2.css('color', '#c52e15');
//         $passflag = false;
//     }
// });

// //失去焦点
// $password.on('blur', function() {
//     if ($password.val() !== '') {
//         if ($passflag) {
//             $span2.html('√');
//             $span2.css('color', 'green');
//         }
//     } else {
//         $span2.html('密码不能为空');
//         $span2.css('color', '#c52e15');
//     }
// })