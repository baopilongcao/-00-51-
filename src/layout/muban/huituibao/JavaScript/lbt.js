      // index：索引， len：长度
      var index = 0, len;
      // 类似获取一个元素数组
      var imgBox = document.getElementsByClassName("img-slide");
      len = imgBox.length;
      imgBox[index].style.display = 'block';
      // 逻辑控制函数
      function slideShow() {
          index ++;
          // 防止数组溢出
          if(index >= len) index = 0;
          // 遍历每一个元素
          for(var i=0; i<len; i++) {
              imgBox[i].style.display = 'none';
          }
          // 每次只有一张图片显示
          imgBox[index].style.display = 'block';
      }
      
      // 定时器，间隔3s切换图片
      setInterval(slideShow, 3000);

    //   定位
      function scrollToAnchor(anchor_id){
        var a = document.getElementById(anchor_id);
        if(a){
            //计算目标元素上方50px的位置
            var targetOffset = a.offsetTop - 80;
            //滚动页面到目标位置
            window.scrollTo(0, targetOffset);
        }
    }