<?php
//准备list页面的数据
//1.连接数据库
include "conn.php";


//2.查询渲染数据
$result=$conn->query("select * from shoplists"); //获取所有的数据
$num = $result->num_rows; //记录集的总条数   60


$pagesize = 20; //单个页面展示的数据条数 自定义每页的条数

$pagenum = ceil($num / $pagesize); //获取页数，一定选择向上取整。 3页

//获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//判断前端传入的页面是否存在，
    $pagevalue = $_GET['page'];//获取页面
} else {
    $pagevalue = 1;//默认为1
}

//根据传入的页码，计算起始的偏移值。
// limit 后面有两个参数
// 参1：起始的偏移值的索引，从0开始
// 参2：数据的条数
// select * from shoplist limit 0,10 -> 查询所有的数据 从0索引位置开始(第一个数据) 获取10条

// 1.select * from shoplist limit 0,15
// 2.select * from shoplist limit 15,15
// 3.select * from shoplist limit 30,15

$page = ($pagevalue - 1) * $pagesize; //根据limit的第一个参数和页码得到这个等式。
$sql1 = "select * from shoplists limit $page,$pagesize";//这里的sql语句跟页码有关，返回当前和页码相对应的数据。
$res = $conn->query($sql1);//执行sql语句


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
//输出复杂接口
class pagedata{

}
$page = new pagedata();//实例化对象
$page->pagesize =  $pagenum; //将页数传递给实例对象
$page->pagecontent = $arr;//将数据传递给实例对象
echo json_encode($page);//接口返回总的页数和当页对应的数据。



