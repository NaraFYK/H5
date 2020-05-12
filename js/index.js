(function mapGen(b, c, e, a, m) {
  // 角色控制函数
  function character(a, b) {
    //把像素的颜色从当前格子和角色应该移动的位置之间的间隙中提取出来。
    var h = d.getImageData(13 * f + 7 + 6 * a, 13 * g + 7 + 6 * b, 1, 1);
    //如果像素的颜色是黑色的，不移动角色（重置dx (a)和dy (b)），否则增加步骤数
    0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3]
      ? (a = b = 0)
      : (document.querySelector("#step").innerHTML =
          Math.floor(document.querySelector("#step").innerHTML) + 1);
    //绘制角色
    d.clearRect(13 * f + 3, 13 * g + 3, 10, 10);
    //改变他目前的位置
    f += a;
    g += b;
    //绘制角色
    d.fillRect(13 * f + 3, 13 * g + 3, 10, 10);
    var circle1 = document.getElementById("circle1");
    if (f == 0 && g == 0) {
      circle1.setAttribute("cx", 16 * 2);
      circle1.setAttribute("cy", 16 * 2);
    } else {
      circle1.setAttribute("cx", (20 + 13 * f) * (2-m/10));
      circle1.setAttribute("cy", (20 + 13 * g) * (2-m/10));
    }
    // 如果一个角色走出迷宫，我们就创造一个新的迷宫，开始游戏。
    f >= c && mapGen("#canvas", c + (m - m + 1), e + (m - m + 1), 0, m + 1);
  }
  //开始
  document.querySelector("#step").innerHTML = Math.floor(a);
  document.querySelector("#complete").innerHTML = Math.floor(m);
  document.querySelector("#complete1").innerHTML = Math.floor(m);
  document.getElementById("mode0").addEventListener("click", function () {
    mode = 0;
    document.getElementsByClassName("index")[0].className = "index show";
    document.getElementsByClassName("index0")[0].className = "index0 hidden";
  });
  //Mazelord
  if (m == 20) {
    document.getElementsByClassName("win")[0].className = "win show";
    document.getElementsByClassName("container")[0].className =
      "container hidden";
  }
  //休闲模式
  document.getElementById("mode1").addEventListener("click", function () {
    mode = 1;
    document.getElementsByClassName("direction")[0].className =
      "direction show";
    document.getElementsByClassName("container")[0].className =
      "container show";
    document.getElementsByClassName("index")[0].className = "index hidden";
    document
      .getElementsByClassName("masks")[0]
      .setAttribute("class", "masks hidden");
  });
  //计时模式
  var t1 = 0;
  time1 = 40 + m * 2;
  function gettime1() {
    if (t1 == 1) return;
    time1--;
    document.getElementsByClassName("time1")[0].innerHTML =
      "剩余" + time1 + "秒";
    if (time1 == 0) {
      document.getElementsByClassName("stop")[0].className = "stop show";
      document.getElementsByClassName("container")[0].className =
        "container hidden";
    }
  }
  document.getElementById("mode2").addEventListener("click", function () {
    mode = 2;
    document.getElementsByClassName("direction")[0].className =
      "direction show";
    document.getElementsByClassName("container")[0].className =
      "container show";
    document.getElementsByClassName("time2")[0].className = "time2 hidden";
    document.getElementsByClassName("index")[0].className = "index hidden";
    document
      .getElementsByClassName("masks")[0]
      .setAttribute("class", "masks hidden");
    document.getElementsByClassName("time1")[0].className = "time1 show";
    gettime1();
    setInterval(gettime1, 1000);
  });
  //黑暗计时模式
  var t1 = 0;
  time2 = 60 + m * 3;
  function gettime2() {
    if (t1 == 1) return;
    time2--;
    document.getElementsByClassName("time2")[0].innerHTML =
      "剩余" + time2 + "秒";
    if (time2 == 0) {
      document.getElementsByClassName("stop")[0].className = "stop show";
      document.getElementsByClassName("container")[0].className =
        "container hidden";
    }
  }
  //
  document.getElementById("mode3").addEventListener("click", function () {
    mode = 3;
    document.getElementsByClassName("direction")[0].className =
      "direction show";
    document.getElementsByClassName("container")[0].className =
      "container show";
    document.getElementsByClassName("time1")[0].className = "time1 hidden";
    document.getElementsByClassName("index")[0].className = "index hidden";
    document.getElementsByClassName("time2")[0].className = "time2 show";
    gettime2();
    setInterval(gettime2, 1000);
  });
  document.getElementById("mode4").addEventListener("click", function () {
    window.location.reload();
  });
  document.getElementById("mode5").addEventListener("click", function () {
    document.getElementsByClassName("container")[0].className =
      "container show";
    document.getElementsByClassName("stop")[0].className = "stop hidden";
    mapGen("#canvas", 10, 10, 0, 0);
  });
  document.getElementById("mode6").addEventListener("click", function () {
    window.location.reload();
  });
  document.getElementById("mode7").addEventListener("click", function () {
    document.getElementsByClassName("container")[0].className =
      "container show";
    document.getElementsByClassName("stop")[0].className = "stop hidden";
    mapGen("#canvas", 10, 10, 0, 0);
  });
  //选择迷宫绘制的范围
  b = document.querySelector(b);
  var d = b.getContext("2d");
  // 给迷宫区域宽度和高度
  b.width = 13 * c + 3;
  b.height = 13 * e + 3;
  // 把墙涂成黑色。
  d.fillStyle = "black";
  d.fillRect(0, 0, 13 * c + 3, 13 * e + 3);

  //创建迷宫数组
  a = Array(c);
  b = Array(c);
  var k = Array(c),
    q = 1;

  // 一行循环
  for (cr_l = 0; cr_l < e; cr_l++) {
    // 对行中的某一集的从属性进行检查
    for (i = 0; i < c; i++)
      0 == cr_l && (a[i] = 0),
        d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10),
        (k[i] = 0),
        1 == b[i] && (b[i] = a[i] = 0),
        0 == a[i] && (a[i] = q++);

    // 随机创造右下方墙
    for (i = 0; i < c; i++) {
      (k[i] = Math.floor(2 * Math.random())),
        (b[i] = Math.floor(2 * Math.random()));

      if ((0 == k[i] || cr_l == e - 1) && i != c - 1 && a[i + 1] != a[i]) {
        var l = a[i + 1];
        for (j = 0; j < c; j++) a[j] == l && (a[j] = a[i]);
        d.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10);
      }
      cr_l != e - 1 &&
        0 == b[i] &&
        d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15);
    }

    // 对封闭区域的检查。
    for (i = 0; i < c; i++) {
      var p = (l = 0);
      for (j = 0; j < c; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
      0 == p && ((b[i] = 0), d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15));
    }
  }
  // 画出走出迷宫的路
  d.clearRect(13 * c, 3, 15, 10);
  // 我们正在重置角色的当前坐标，赋予颜色
  var f = 0,
    g = 0;
  d.fillStyle = "black";
  // 让角色进入迷宫的开始。
  character(-1, -1);
  //移动
  document.body.onkeydown = function (a) {
    36 < a.keyCode &&
      41 > a.keyCode &&
      character((a.keyCode - 38) % 2, (a.keyCode - 39) % 2);
  };
  //mazelord
  window.onload = function () {
    document.getElementById("down").addEventListener("click", function (a) {
      t = { keyCode: 40 };
      document.body.onkeydown(t);
    });
    document.getElementById("right").addEventListener("click", function (a) {
      t = { keyCode: 39 };
      document.body.onkeydown(t);
    });
    document.getElementById("up").addEventListener("click", function (a) {
      t = { keyCode: 38 };
      document.body.onkeydown(t);
    });
    document.getElementById("left").addEventListener("click", function (a) {
      t = { keyCode: 37 };
      document.body.onkeydown(t);
    });
  };
  document.getElementById("pauseTime").addEventListener("click", function () {
    t1 = 1;
    document.getElementsByClassName("pause")[0].className = "pause show";
    document.getElementsByClassName("container")[0].className =
      "container hidden";
  });
  document.getElementById("continue").addEventListener("click", function () {
    t1 = 0;
    document.getElementsByClassName("pause")[0].className = "pause hidden";
    document.getElementsByClassName("container")[0].className =
      "container show";
  });
})("#canvas", 11, 11, 0, 0);
document.addEventListener("touchstart", function () {
  document.getElementById("audios").play();
});
