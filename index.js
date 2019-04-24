var flag = 1;
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

function Change (x) {
    if (x == 1 && flag == 2) {
        $("#search_fir").css("padding", "0 15px");
        $("#search_sec").css("padding", "0");
        flag = 1;
    }
    else if (x == 2 && flag == 1) { 

        $("#search_fir").css("padding", "0");
        $("#search_sec").css("padding", "0 15px");
        flag = 2;
    }
}