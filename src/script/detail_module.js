  //1.引入jquery模块
  import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';

  //2.在详情页面获取商品的sid - 列表传入一个sid到详情页。
  let $sid = location.search.substring(1).split('=')[1];

  // 如果sid不存在，默认sid为1
  if (!$sid) {
      $sid = 1;
  }


  const $spic = $('#spic'); //小图
  const $smallpic = $('#spic img'); //小图里面的图片
  const $bpic = $('#bpic'); //小图
  const $loadtitle = $('.loadtitle'); //标题loadpcp
  const $loadpcp = $('.loadpcp'); //价格
  const $list = $('#list ul'); //存放小图
  const $sf = $('#sf');
  const $bf = $('#bf');
  const $goodsinfo = $('.goodsinfo');
  let $liwidth = 0; //li的宽度
  let $lilenth = 0; //所有li的个数


  //2.将当前的sid传给后端，后返数据给前
  $.ajax({
      url: 'http://10.31.165.63/youlegou/php/getsid.php',
      data: {
          datasid: $sid
      },
      dataType: 'json'
  }).done(function(data) {
      //   console.log(data);
      $smallpic.attr('src', data.picurl);
      $bpic.attr('src', data.picurl)
      $loadtitle.html(data.title);
      $loadpcp.html(data.price);

      //渲染放大镜下面的小图
      let $picarr = data.piclisturl.split(','); //数组
      let $strHtml = '';
      $.each($picarr, function(index, value) {
          $strHtml += ` 
                <li>
                    <img src="${value}"/>    
                </li>
            `;
          $list.html($strHtml);
      });

      //这里可以任意的获取渲染的数据。
      $lilenth = $('#list ul li').length; //存储li的个数
      if ($lilenth < 5) {
          $('#right').css('color', '#fff');
      }
      $liwidth = $('#list ul li').eq(0).outerWidth(true); //存储一个li的宽度
  });

  //   3.放大镜效果
  //3.1.鼠标移入小图，显示小放和大放
  $spic.hover(function() {
      $sf.css('visibility', 'visible');
      $bf.css('visibility', 'visible');
      //3.2.计算小放的尺寸和比例
      $sf.width($spic.outerWidth() * $bf.outerWidth() / $bpic.outerWidth());
      $sf.height($spic.outerHeight() * $bf.outerHeight() / $bpic.outerHeight());
      let $bili = $bpic.outerWidth() / $spic.outerWidth(); //比例
      //3.3.鼠标在小图里面移动，小放跟随鼠标
      $spic.on('mousemove', function(ev) {
          let $leftvalue = ev.pageX - $goodsinfo.offset().left - $sf.outerWidth() / 2;
          let $topvalue = ev.pageY - $goodsinfo.offset().top - $sf.outerHeight() / 2;
          if ($leftvalue < 0) {
              $leftvalue = 0;
          } else if ($leftvalue >= $spic.outerWidth() - $sf.outerWidth()) {
              $leftvalue = $spic.outerWidth() - $sf.outerWidth();
          }

          if ($topvalue < 0) {
              $topvalue = 0;
          } else if ($topvalue >= $spic.outerHeight() - $sf.outerHeight()) {
              $topvalue = $spic.outerHeight() - $sf.outerHeight();
          }

          $sf.css({
              left: $leftvalue,
              top: $topvalue
          });

          $bpic.css({
              left: -$bili * $leftvalue,
              top: -$bili * $topvalue
          });
      });
  }, function() {
      $sf.css('visibility', 'hidden');
      $bf.css('visibility', 'hidden');
  });

  //   3.4.点击小图，切换大图
  //无法获取渲染的元素，渲染的过程是异步的ajax，只能采用事件委托。
  const $listul = $('#list ul');
  $listul.on('mouseover', 'li', function() { //注意委托的元素就是内部的元素，设置的时候可以忽略
      // console.log($(this)); //委托的元素
      //获取委托元素li里面的img下面的src的路径。
      let $url = $(this).find('img').attr('src');
      //对应的赋值
      $smallpic.attr('src', $url);
      $bpic.attr('src', $url);
  });

  //3.5.通过小图两侧的按钮，切换小图。
  //每点击一次箭头，图片移动一张。
  let $num = 5; //这里的6是固有的值。表示显示的张数。
  $('#right').on('click', function() {
      if ($lilenth > $num) {
          $num++;
          $('#left').css('color', '#333');
          if ($num === $lilenth) { //右箭头无法点击
              $('#right').css('color', '#ccc');
          }
      }
      $listul.animate({
          left: -$liwidth * ($num - 5)
      });
  });
  $('#left').on('click', function() {
      if ($num > 5) {
          $num--;
          $('#right').css('color', '#333');
          if ($num === 5) {
              $('#left').css('color', '#ccc');
          }
      }
      $listul.animate({
          left: -$liwidth * ($num - 5)
      });
  });

  //   4.购物车
  let $arrsid = []; //存商品编号
  let $arrnum = []; //存商品数量

  function getLocalStorage() {
      if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) { //商品已经存储过
          $arrsid = localStorage.getItem('localsid').split(','); //将获取的编号转换成数组，方便后面判断是否存在当前编号。
          $arrnum = localStorage.getItem('localnum').split(',');
      } else {
          $arrsid = [];
          $arrnum = [];
      }
  }




  //   5.开始存储商品的编号和数量
  const $btn = $('.p-btn a').eq(1); //存储商品的按钮
  const $count = $('#count');
  $btn.on('click', function() {
      //判断是第一次存储，还是多次存储。
      getLocalStorage()
      if ($arrsid.includes($sid)) { //存在,不是第一次添加，改变数量
          let $index = $arrsid.indexOf($sid); //sid在数组中的位置，sid的位置和数量是匹配的。通过sid的位置找数量的位置
          $arrnum[$index] = parseInt($arrnum[$index]) + parseInt($count.val()); //重新赋值
          localStorage.setItem('localnum', $arrnum); //重新添加到本地存储，覆盖前面的值
      } else { //不存在,第一次添加
          $arrsid.push($sid); //将sid添加到存储sid的数组中。
          localStorage.setItem('localsid', $arrsid); //添加到本地存储中。
          $arrnum.push($count.val()); //将数量添加到存储数量的数组中。
          localStorage.setItem('localnum', $arrnum); //添加到本地存储中。
      }
      console.log('存储按钮被点击了');
  });

  //   点击按钮增加减少数量

  const $nbtn = $('.btn1');
  const $abtn = $('.btn2');
  let $nums = $count.val();
  $nbtn.on('click', function() {
      if ($nums > 1) {
          $nums--;
          $count.val($nums);
      }
  });
  $abtn.on('click', function() {
      $nums++;
      $count.val($nums);
  });

  //6.正则判断选框里面的值是否为数字
  $('.p-num input').on('input', function() {
      let $reg = /^\d+$/; //行首行尾匹配一个或者多个数字
      if (!$reg.test($(this).val())) { //如果不满足条件，值为1
          $(this).val(1);
          console.log($(this));
      }
  });