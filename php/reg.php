<?php

// 通过include函数或者require函数加载数据库连接的文件。
include "conn.php";

// isset():判断括号里面的值是否存在。

// 1.用户名手机号码重名检测
if(isset($_POST['checkname'])){  
    $checkname = $_POST['checkname'];
    $result=$conn->query("SELECT * FROM registry WHERE tel = '$checkname'");//where后面跟的是数据库查询的条件。
    //查询所有的信息来自于registry表，但是条件是用户名和传入的用户信息相等。

    //$result->fetch_assoc():逐条获取$result里面每一条记录,返回值是一个数组。
    if($result->fetch_assoc()){//满足条件，存在值，说明此用户名不能被注册。
        echo 'true';
    }else{
        echo 'false';
    }
}


// 2.将前端传入的值放入数据库
// $_POST['submit']:获取提交注册按钮的值
if(isset($_POST['submit'])){//存在，说明前端已经点击了提交注册的按钮。
    $tel=$_POST['tel'];//获取用户名
    $pass=sha1($_POST['password']);//获取用密码
    $repass=sha1($_POST['repass']);//获取密码重复


    //将前端提交的数据存入数据库 - sql语句
    $conn->query("insert registry values(null,'$tel','$pass','$repass')");

    //后端跳转
    header('location:http://10.31.165.63/youlegou/src/login.html');

    //后端跳转前端，前端跳转后端都需要采用绝对路径，但是如果是前端跳转前端，后端跳转后端可以使用相对路径。
}