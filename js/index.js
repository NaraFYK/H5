(function mapGen(b, c, e, a, m) {
    // 角色控制函数
    function character(a, b) {
        //把像素的颜色从当前细胞和角色应该移动的位置之间的间隙中提取出来。
        var h = d.getImageData(13 * f + 7 + 6 * a, 13 * g + 7 + 6 * b, 1, 1);
        //如果像素的颜色是黑色的，不移动角色(重置dx (a)和dy (b)，否则增加步骤数
        0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3] ? a = b = 0 : document.querySelector("#step").innerHTML = Math.floor(document.querySelector("#step").innerHTML) + 1;
        //涂饰人物
        d.clearRect(13 * f + 3, 13 * g + 3, 10, 10); 
        //改变他目前的位置
        f += a; 
        g += b; 
        // 再一次拒绝它
        d.fillRect(13 * f + 3, 13 * g + 3, 10, 10);
        var circle1 = document.getElementById("circle1")
        circle1.setAttribute('cx', (36-m-m/4) * f+25)
        circle1.setAttribute('cy', (36-m-m/4) * g+25)
        // 如果一个角色走出迷宫，我们就创造一个新的迷宫，重新开始游戏。
        f >= c &&mapGen("#canvas", c+(m-m+1), e+(m-m+1), 0, m + 1)

    }
    //开始
    document.getElementById("mode0").addEventListener("click", function(){
        mode = 0;
        document.getElementsByClassName("index")[0].className = "index show";
        document.getElementsByClassName("index0")[0].className = "index0 hidden";
    })
    //休闲模式
    document.getElementById("mode1").addEventListener("click", function(){
        mode = 1;
        document.getElementsByClassName("direction")[0].className = "direction show";
        document.getElementsByClassName("container")[0].className = "container show";
        document.getElementsByClassName("index")[0].className = "index hidden";
        document.getElementsByClassName("masks")[0].setAttribute("class", "masks hidden")
        
    })
     //计时模式
     time1  = 40+m*2
     function gettime1(){
         time1--;
         document.getElementsByClassName("time1")[0].innerHTML = "剩余" + time1 + "秒";
         if(time1 == 0){
            document.getElementsByClassName("stop")[0].className = "stop show";
            document.getElementsByClassName("container")[0].className = "container hidden";
         }
     }
     document.getElementById("mode2").addEventListener("click", function(){
         mode = 2;
         document.getElementsByClassName("direction")[0].className = "direction show";
         document.getElementsByClassName("container")[0].className = "container show";
         document.getElementsByClassName("time2")[0].className = "time2 hidden";
         document.getElementsByClassName("index")[0].className = "index hidden";
         document.getElementsByClassName("masks")[0].setAttribute("class", "masks hidden")
         document.getElementsByClassName("time1")[0].className = "time1 show"
         gettime1()
         setInterval(gettime1, 1000);
     })
     //黑暗计时模式
     time2  = 60+m*3
     function gettime2(){
         time2--;
         document.getElementsByClassName("time2")[0].innerHTML = "剩余" + time2 + "秒";
         if(time2 == 0){
            document.getElementsByClassName("stop")[0].className = "stop show";
            document.getElementsByClassName("container")[0].className = "container hidden";
         }
     }
     document.getElementById("mode3").addEventListener("click", function(){
         // debugger
         mode = 3;
         document.getElementsByClassName("direction")[0].className = "direction show";
         document.getElementsByClassName("container")[0].className = "container show";
         document.getElementsByClassName("time1")[0].className = "time1 hidden";
         document.getElementsByClassName("index")[0].className = "index hidden";
         document.getElementsByClassName("time2")[0].className = "time2 show"
         gettime2()
         setInterval(gettime2, 1000);
     })
    document.getElementById("mode4").addEventListener("click", function(){
        window.location.reload();
    })
    document.getElementById("mode5").addEventListener("click", function(){
        document.getElementsByClassName("container")[0].className = "container show";
        document.getElementsByClassName("stop")[0].className = "stop hidden";
        mapGen("#canvas", 10, 10, 0, 0);
    })
    document.getElementById("mode6").addEventListener("click", function(){
        window.location.reload();
    })
    document.getElementById("mode7").addEventListener("click", function(){
        document.getElementsByClassName("container")[0].className = "container show";
        document.getElementsByClassName("stop")[0].className = "stop hidden";
        mapGen("#canvas", 10, 10, 0, 0);
    })
    //选择绘画的领域
    b = document.querySelector(b);
    var d = b.getContext("2d");
    
    // 把迷宫的步数和步数加起来。
    document.querySelector("#step").innerHTML = Math.floor(a);
    document.querySelector("#complete").innerHTML = Math.floor(m);
    // 给迷宫区域的宽度和高度
    b.width = 13 * c + 3;
    b.height = 13 * e + 3;
    // 把它涂成黑色。
    d.fillStyle = "black";
    d.fillRect(0, 0, 13 * c + 3, 13 * e + 3);
    
    // 让我们宣布数组来存储当前单元的集合值，右边的墙值，下面的墙值。
    a = Array(c); 
    b = Array(c);
    var k = Array(c),
        // 当前很多
        q = 1;

    // 一行循环
    for (cr_l = 0; cr_l < e; cr_l++) {
        // 对行中的某一集的从属性进行检查        
        for (i = 0; i < c; i++) 
            0 == cr_l && (a[i] = 0), d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10), k[i] = 0, 1 == b[i] && (b[i] = a[i] = 0), 0 == a[i] && (a[i] = q++);

        // 随机创造右下方墙
        for (i = 0; i < c; i++) {
            k[i] = Math.floor(2 * Math.random()), b[i] = Math.floor(2 * Math.random());
            
            if ((0 == k[i] || cr_l == e - 1) && i != c - 1 && a[i + 1] != a[i]) {
                var l = a[i + 1];
                for (j = 0; j < c; j++) a[j] == l && (a[j] = a[i]);
                d.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10)
            }
            cr_l != e - 1 && 0 == b[i] && d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15)
        }

        // 对封闭区域的检查。
        for (i = 0; i < c; i++) {
            var p = l = 0;
            for (j = 0; j < c; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
            0 == p && (b[i] = 0, d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15))
        }
    }

    // 画出走出迷宫的路
    d.clearRect(13 * c, 3, 15, 10);
    // 我们正在重置角色的当前坐标。
    var f = 0,
        g = 0;
    // 给它一个红色的。
    d.fillStyle = "red";
    // 让角色进入迷宫的开始。
    character(-1, -1);
    // 等着枪响。
    document.body.onkeydown = function (a) {
        36 < a.keyCode && 41 > a.keyCode && character((a.keyCode - 38) % 2, (a.keyCode - 39) % 2)
    }
    function fireKeyEvent(el, evtType, keyCode){
        var doc = el.ownerDocument,
            win = doc.defaultView || doc.parentWindow,
            evtObj;
        if(doc.createEvent){
            if(win.KeyEvent) {
                evtObj = doc.createEvent('KeyEvents');
                evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
            }
            else {
                evtObj = doc.createEvent('UIEvents');
                Object.defineProperty(evtObj, 'keyCode', {
                    get : function() { return this.keyCodeVal; }
                });     
                Object.defineProperty(evtObj, 'which', {
                    get : function() { return this.keyCodeVal; }
                });
                evtObj.initUIEvent( evtType, true, true, win, 1 );
                evtObj.keyCodeVal = keyCode;
                if (evtObj.keyCode !== keyCode) {
                    console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
                }
            }
            el.dispatchEvent(evtObj);
        } 
        else if(doc.createEventObject){
            evtObj = doc.createEventObject();
            evtObj.keyCode = keyCode;
            el.fireEvent('on' + evtType, evtObj);
        }
    }
    window.onload = function(){
    document.getElementById("down").addEventListener("click", function(a){ t = {"keyCode": 40}; document.body.onkeydown(t);});
    document.getElementById("right").addEventListener("click", function(a){t = {"keyCode": 39}; document.body.onkeydown(t);});
    document.getElementById("up").addEventListener("click", function(a){t = {"keyCode": 38}; document.body.onkeydown(t);});
    document.getElementById("left").addEventListener("click", function(a){t = {"keyCode": 37}; document.body.onkeydown(t);});
    }
})("#canvas", 10, 10, 0, 0);
