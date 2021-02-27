  //1.引入jquery模块
  import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';


  //2.获取本地存储里面的数据进行渲染(渲染过程封装函数实现)
  if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
      let arrsid = localStorage.getItem('localsid').split(','); //编号  [1,2,3,4]
      let arrnum = localStorage.getItem('localnum').split(','); //数量  [10,20,30,40]
      for (let i = 0; i < arrsid.length; i++) {
          renderList(arrsid[i], arrnum[i]); //sid:编号  num:数量。
      }
  };

  //3.封装函数实现渲染过程 - 克隆方式
  //隐藏的元素进行克隆 
  function renderList(sid, num) {
      $.ajax({
          url: 'http://10.31.165.63/youlegou/php/alldata.php',
          dataType: 'json'
      }).done(function(data) {
          //   console.log(data);
          $.each(data, function(index, value) {
              //   console.log(value);
              if (value.sid === sid) {
                  let $clonebox = $('.cart-store:hidden').clone(true, true);
                  $clonebox.find('.item-img img').attr('src', value.picurl);
                  $clonebox.find('.item-title').html(value.title);
                  $clonebox.find('.item-title').attr('sid', value.sid);
                  $clonebox.find('.item-price').html(value.price);
                  $clonebox.find('.item-num input').val(num);
                  $clonebox.find('.item-allprice').html((value.price * num).toFixed(2));
                  $clonebox.css('display', 'block'); //显示克隆的元素
                  $('.mainWrapper').append($clonebox); //追加
                  allprice(); //计算总价
              }
          })
      });
  };

  //4.封装函数统计商品的数量和总价
  function allprice() {
      let $allnum = 0; //数量
      let $allprice = 0; //总价   
      $('.cart-store:visible').each(function(index, element) {
          if ($(this).find('.chk-all').prop('checked')) { //判断当前的商品列表前面的复选框是否是选中的
              $allnum += parseInt($(this).find('.item-num input').val());
              $allprice += parseFloat($(this).find('.item-allprice').html());
          }
      });
      //   console.log($allprice);
      $('.prod-count dd strong').html($allnum); //赋值总的数量
      $('.mainWrapper-top i').html($allnum); //赋值总的数量
      $('.r-box b').html($allnum); //赋值总的数量
      $('.prod-price dd strong em').html($allprice); //赋值总的价格
      $('.prod-totalprices dd em').html($allprice); //赋值总的价格

  };

  //   5.全选
  $('.chk-alls').on('click', function() {
      $('.cart-store:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
      $('.chk-alls').prop('checked', $(this).prop('checked'));
      allprice();
  });


  $('.cart-store').on('click', 'input:checkbox', function() {
      //   console.log($('.cart-store:visible').find('input:checkbox').length);
      if ($('.cart-store:visible').find('input:checkbox').length === $('.cart-store:visible').find('input:checked').length) {
          $('.chk-alls').prop('checked', true);
      } else {
          $('.chk-alls').prop('checked', false);
      }
      allprice();
  });

  //   6.数量的改变
  //   按钮点击增加
  $('.btn-up').on('click', function() {
      let $num = $(this).parents('.cart-store').find('.item-num input').val();
      $num++;
      $(this).parents('.cart-store').find('.item-num input').val($num);

      $(this).parents('.cart-store').find('.item-allprice').html(singleprice($(this))); //计算单价以及赋值
      allprice(); //计算总价
      localStorageData($(this)); //重新将数量添加到本地存储
  });

  //   按钮点击减少
  $('.btn-down').on('click', function() {
      let $num = $(this).parents('.cart-store').find('.item-num input').val();
      $num--;
      if ($num <= 1) {
          $num = 1;
      }
      $(this).parents('.cart-store').find('.item-num input').val($num);
      $(this).parents('.cart-store').find('.item-allprice').html(singleprice($(this))); //计算单价以及赋值
      allprice(); //计算总价
      localStorageData($(this)); //重新将数量添加到本地存储
  });

  //   正则判断input框里面的值为数字
  $('.item-num input').on('input', function() {
      let $reg = /^\d+$/; //行首行尾匹配一个或者多个数字
      if (!$reg.test($(this).val())) { //如果不满足条件，值为1
          $(this).val(1);
      }
      $(this).parents('.cart-store').find('.item-allprice').html(singleprice($(this))); //计算单价以及赋值
      allprice(); //计算总价
      localStorageData($(this)); //重新将数量添加到本地存储
  });

  //   封装函数实现小计的改变
  function singleprice(obj) { //obj:当前操作的元素对象。
      let $price = obj.parents('.cart-store').find('.item-price').html(); //单价
      let $num = obj.parents('.cart-store').find('.item-num input').val(); //数量
      return ($price * $num).toFixed(2); //保留2位小数
  }

  //   7.将修改后的值存到本地存储里面
  let $arrsid = []; //存储的商品编号,以及获取本地存储的商品编号
  let $arrnum = []; //存储商品的数量,以及获取本地存储的商品数量

  function getLocalStorage() {
      if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) { //商品已经存储过
          $arrsid = localStorage.getItem('localsid').split(','); //将获取的编号转换成数组，方便后面判断是否存在当前编号。
          $arrnum = localStorage.getItem('localnum').split(',');
      } else {
          $arrsid = [];
          $arrnum = [];
      }
  }

  //   封装函数实现本地存储
  function localStorageData(obj) { //obj:当前操作的元素对象。
      getLocalStorage(); //获取本地存储，将其转换成数组。
      let $index = obj.parents('.cart-store').find('.item-title').attr('sid'); //获取对应的sid  
      //   console.log($index);
      $arrnum[$arrsid.indexOf($index)] = obj.parents('.cart-store').find('.item-num input').val(); //根据sid将对应的新的数量赋值给数组,重新存储。
      localStorage.setItem('localnum', $arrnum); //本地存储
  }
  const $confirm = $('.confirm');
  const $cancel = $('.cancel');
  const $close = $('.close');

  //   8.删除购物车商品列表
  $('.pass').on('click', function() {
      let $this = $(this);
      //   window.confirm('您确定要从购物车删除该商品？')
      $('.passones').css('display', 'block');
      $('.passone').css('display', 'block');

      $confirm.unbind('click').on('click', function() {
          if (true) {
              $this.parents('.cart-store').remove();
              delstorage($arrsid, $(this).parents('.cart-store').find('.item-title').attr('sid'));
              allprice(); //计算总价   
              $('.passones').css('display', 'none');
              $('.passone').css('display', 'none');
          }
      })
      $cancel.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })
      $close.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })
  });

  $('.btn-delsel').on('click', function() {
      $('.passones').css('display', 'block');
      $('.passone').css('display', 'block');

      $confirm.unbind('click').on('click', function() {
          if (true) {
              $('.cart-store:visible').each(function(index, element) {
                  if ($('.cart-store').find('.item-check input').is(':checked')) {
                      //   $(this).remove();
                      $('.cart-store').remove();
                      delstorage($arrsid, $(this).find('.item-title').attr('sid'));
                      allprice(); //计算总价
                      $('.passones').css('display', 'none');
                      $('.passone').css('display', 'none');
                  }
              });
          }
      })
      $cancel.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })
      $close.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })

  });

  $('.btn-clear').on('click', function() {
      $('.passones').css('display', 'block');
      $('.passone').css('display', 'block');

      $confirm.unbind('click').on('click', function() {
          if (true) {
              $('.cart-store:visible').each(function(index, element) {
                  $('.cart-store').remove();
                  delstorage($arrsid, $(this).find('.item-title').attr('sid'));
                  allprice(); //计算总价
                  $('.passones').css('display', 'none');
                  $('.passone').css('display', 'none');

              });
          }
      })
      $cancel.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })
      $close.unbind('click').on('click', function() {
          $('.passones').css('display', 'none');
          $('.passone').css('display', 'none');
      })

  });

  function delstorage(arrsid, sid) { //arrsid:数组   sid:数组中对应的值
      getLocalStorage(); //将获取的本地存储的值转换成数组
      let $index = -1; //存储索引的
      $.each(arrsid, function(index, valuesid) {
          if (valuesid == sid) {
              $index = index; //满足条件的值对应的索引赋值给$index
          }
      });

      //获取对应的索引进行删除。
      $arrsid.splice($index, 1);
      $arrnum.splice($index, 1);

      //重新设置本地存储。   
      localStorage.setItem('localsid', $arrsid);
      localStorage.setItem('localnum', $arrnum);
  }