<?php
//引入数据库连接的文件
include "conn.php";
//后端获取用户名和密码去和数据库里面的数据进行匹配
if(isset($_POST['tel']) && isset($_POST['pass'])){//接收用户名和密码存在
    $tel = $_POST['tel'];//获取的用户名
    $pass = sha1($_POST['pass']);//获取的密码,加密和加密后数据进行匹配
    $result = $conn->query("SELECT * FROM registry WHERE tel='$tel' and password='$pass'");
    //如果$result存在，说明数据库存在这条注册的信息。用户输入的用户名和密码是正确的。
    if($result->fetch_assoc()){
        echo "true";
    }else{
        echo "false";
    } 
}