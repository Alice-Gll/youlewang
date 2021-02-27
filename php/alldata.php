<?php
//准备list页面的数据
//1.连接数据库
include "conn.php";


//2.查询渲染数据
$result=$conn->query("select * from shoplists"); //获取所有的数据
$num = $result->num_rows; //记录集的总条数   40 


$arr = array();
for($i=0;$i<$num;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);

