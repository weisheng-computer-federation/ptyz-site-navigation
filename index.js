var flag = 1;
function Search () {
    var input = document.getElementById("search_text").value;
    if ($('.fir')[0].id == 'bing')
        window.open("https://cn.bing.com/search?q=" + input, "blank");
    else
        window.open("https://www.baidu.com/s?ie={inputEncoding}&wd=" + input, "blank");
}

function Check () {
    if (event.keyCode == 13)
        Search ();
}

function Change (x) {
    $('.search_engine').attr('class','search_engine');
    $(x).attr('class','search_engine fir');
}