<?php
//将数据库连接放入单独文件中，通过php里面提供的函数进行调用。
header('content-type:text/html;charset=utf-8'); //设置中文编码。
//一.php连接数据库。
//当前的页面连接数据库。
//1.定义几个数据库连接的常量
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','wares');//数据库名称

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接成功，没有提示的。
//@符号用来做容错处理，让错误不显示(慎用)

//2.数据库连接自定义错误。
if($conn->connect_error){
    die('数据库连接错误'.$conn->connect_error);
}

//3.设置字符编码
$conn->query('SET NAMES UTF8');//方法帮助我们执行括号里面的代码