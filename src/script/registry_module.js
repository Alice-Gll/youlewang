// 操作过程：
// 引入或者加载jquey模块 
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

const $tel = $('.tel');
const $password = $('.password');
const $repass = $('.repass');
const $span1 = $('.span1');
const $span2 = $('.span2');
const $span3 = $('.span3');
const $form = $('form');
const $checkbox = $('.checkboxs');
const $Sem = $('.sem em');
let $flag = true;

//失去焦点将前端的用户名传给后端
$tel.on('blur', function() {
    $.ajax({
        type: 'post',
        url: 'http://10.31.165.63/youlegou/php/reg.php',
        data: {
            checkname: $tel.val()
        }
    }).done(function(data) { //根据后端的返回值确定是否重名
        if (data === 'true') { //存在
            $span1.html('×该手机号已注册，请登录');
            $span1.css('color', '#c52e15');
            $flag = false;
        }
        // else if (data === 'false') {
        //     // $span1.html('√;');

        //     $span1.css('color', 'green');
        //     $flag = true;
        // }
    });
});

//阻止浏览器的submit跳转，如果用户名不能通过，不允许提交注册。
$form.on('submit', function() {
    if (!$flag) {
        return false;
    }
});

// 表单验证

let $telflag = true;
let $passflag = true;
let $repassflag = true;
let $checkboxflag = true;

$form.on('submit', function() {
    if ($tel.val() === '') {
        $span1.html('手机号码不能为空');
        $span1.css('color', '#c52e15');
        $telflag = false;
    }
    if ($password.val() === '') {
        $span2.html('密码不能为空');
        $span2.css('color', '#c52e15');
        $passflag = false;
    }
    if ($repass.val() === '') {
        $span3.html('密码不能为空');
        $span3.css('color', '#c52e15');
        $repassflag = false;
    }
    if ($checkbox.prop("checked") != true) {
        $Sem.html('抱歉，您必须同意邮乐网的服务条款后才能提交注册。');
        $Sem.css('color', '#c52e15');
        $checkboxflag = false;
    } else {
        $checkboxflag = true;
    }


    if (!$telflag || !$passflag || !$repassflag || !$checkboxflag) {

        return false;

    }
})




//1.手机号码验证
//得到焦点，显示提示信息
$tel.on('focus', function() {
    $span1.html('请输入正确的手机号码');
    $span1.css('color', '#333');
});
$tel.on('blur', function() {
    if ($tel.val() !== '') {
        var $reg = /^1[35789]\d{9}$/;
        if ($reg.test($tel.val())) {
            $span1.html('√');
            $span1.css('color', 'green');
            $telflag = true;
        } else {
            $span1.html('手机号码格式有误');
            $span1.css('color', '#c52e15');
            $telflag = false;
        }
    } else {
        $span1.html('手机号码不能为空');
        $span1.css('color', '#c52e15');
        $telflag = false;
    }
})

//2.密码验证
//检测弱中强 - 数字，大写字母，小写字母，特殊字符(#$@^&%)
//弱：同一类字符
//中：两类或者三类
//强：四类字符

//得到焦点
$password.on('focus', function() {
    $span2.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
    $span2.css('color', '#c52e15');
});

//新的事件：oninput:文本框里面的内容发生改变就会触发事件。
$password.on('input', function() {

    if ($password.val().length >= 6 && $password.val().length <= 20) {
        //检测类型
        var $reg1 = /\d+/; //数字
        var $reg2 = /[a-z]+/; //小写字母
        var $reg3 = /[A-Z]+/; //大写字母
        var $reg4 = /[\W\_]+/; //特殊字符

        //a1B$a2c#$D
        var $count = 0; //计算字符的种类
        if ($reg1.test($password.val())) {
            $count++;
        }
        if ($reg2.test($password.val())) {
            $count++;
        }
        if ($reg3.test($password.val())) {
            $count++;
        }
        if ($reg4.test($password.val())) {
            $count++;
        }

        switch ($count) {
            case 1:
                $span2.html('密码安全级别较低，建议密码最好包含数字，大小写字母，特殊符号');
                $span2.css('color', '#333');
                $passflag = false;
                break;
            case 2:
            case 3:
                $span2.html('密码安全级别中等');
                $span2.css('color', '#333');
                $passflag = true;
                break;
            case 4:
                $span2.html('密码安全级别较高');
                $span2.css('color', '#333');
                $passflag = true;
                break;
        }
    } else {
        $span2.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
        $span2.css('color', '#c52e15');
        $passflag = false;
    }
});

//失去焦点
$password.on('blur', function() {
    if ($password.val() !== '') {
        if ($passflag) {
            $span2.html('√');
            $span2.css('color', 'green');
        }
    } else {
        $span2.html('密码不能为空');
        $span2.css('color', '#c52e15');
    }
})



//3.确认密码验证：
//得到焦点
$repass.on('focus', function() {
    $span3.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
    $span3.css('color', '#c52e15');
});

//新的事件：oninput:文本框里面的内容发生改变就会触发事件。
$repass.on('input', function() {

    if ($repass.val().length >= 6 && $repass.val().length <= 20) {
        //检测类型
        var $reg1 = /\d+/; //数字
        var $reg2 = /[a-z]+/; //小写字母
        var $reg3 = /[A-Z]+/; //大写字母
        var $reg4 = /[\W\_]+/; //特殊字符

        //a1B$a2c#$D
        var $count = 0; //计算字符的种类
        if ($reg1.test($repass.val())) {
            $count++;
        }
        if ($reg2.test($repass.val())) {
            $count++;
        }
        if ($reg3.test($repass.val())) {
            $count++;
        }
        if ($reg4.test($repass.val())) {
            $count++;
        }

        switch ($count) {
            case 1:
                $span3.html('密码安全级别较低，建议密码最好包含数字，大小写字母，特殊符号');
                $span3.css('color', '#333');
                $repassflag = false;
                break;
            case 2:
            case 3:
                $span3.html('密码安全级别中等');
                $span3.css('color', '#333');
                $repassflag = true;
                break;
            case 4:
                $span3.html('密码安全级别较高');
                $span3.css('color', '#333');
                $repassflag = true;
                break;
        }
    } else {
        $span3.html('建议使用大小写字母、数字和符号两种以上的组合，6-20个字符');
        $span3.css('color', '#c52e15');
        $repassflag = false;
    }
});


// 失去焦点
$repass.on('blur', function() {

    if ($repass.val() === $password.val()) {
        $span3.html('√');
        $span3.css('color', 'green');
    } else {
        $span3.html('两次密码输入不一致');
        $span3.css('color', '#c52e15');
    }
    if ($repass.val() !== '') {
        if ($repassflag) {
            $span3.html('√');
            $span3.css('color', 'green');
        }
    } else {
        $span3.html('密码不能为空');
        $span3.css('color', '#c52e15');
    }

})