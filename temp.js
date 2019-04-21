var flag = 1;
function Function1 () {
    window.open("https://putian.xueanquan.com/", "blank");
}

function Function2 () {
    window.open("https://ciwong.com/index.html", "blank");
}

function Function3 () {
    window.open("https://mail.qq.com/", "blank");
}

function Function4 () {
    window.open("https://www.weisheng.cf/games/RandQAQ/", "blank");
}

function Function5 () {
    window.open("https://www.bilibili.com/", "blank");
}

function Function6 () {
    window.open("https://wx.qq.com/", "blank");
}

function Function7 () {
    window.open("", "blank");
}

function Function8 () {
    window.open("", "blank");
}

function Search () {
    var input = document.getElementById("search_text").value;
    if (flag == 1)
        window.open("https://cn.bing.com/search?q=" + input, "blank");
    else
        window.open("https://www.baidu.com/s?ie={inputEncoding}&wd=" + input, "blank");
}

function Check () {
    if (event.keyCode == 13)
        Search ();
}

function Change () {
    document.getElementById(search_fir).className = "search_engine2";
    document.getElementById(search_sec).className = "search_engine1";

    // alert ("asdsad");
        // document.getElementById(search_engine1).style.padding = "0";
        // document.getElementById(search_engine2).style.padding = "15px";
    // if (flag == 1 && x == 2) {
    //     document.getElementById("search_engine1").src="png/Baidu.png";
    //     document.getElementById("search_engine2").src="png/Bing.png";
    //     flag = 2;
    // }
    // else if (flag == 2 && x == 1){
    //     document.getElementById("search_engine1").src="png/Bing.png";
    //     document.getElementById("search_engine2").src="png/Baidu.png";
    //     flag = 1;
    // }
}