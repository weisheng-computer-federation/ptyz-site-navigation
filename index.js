var flag = 1;
function Search() {
    var input = document.getElementById("search_text").value;
    if ($(".fir")[0].id == "bing") window.open("https://cn.bing.com/search?q=" + input, "blank");
    else window.open("https://www.baidu.com/s?ie={inputEncoding}&wd=" + input, "blank");
}

function Check() {
    if (event.keyCode == 13) Search();
}

function Change(x) {
    $(".search_engine").attr("class", "search_engine");
    $(x).attr("class", "search_engine fir");
}

function StyleToggleMenu() {
    let el = $(".style_toggle_menu");
    el.slideToggle();
}

function StyleToggle(sty, el) {
    $(".style_toggle_item").css("background-color", "rgba(0,0,0,0)");
    $(el).css("background-color", "rgba(0,120,215,.12)");
    $("#sty").attr("href", "sty_" + sty + ".css");
}

window.onload = function() {
    let bkgurl = "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN";
    $("body").css("background-image", "url(" + bkgurl + ")");
};


$(document).bind("click",function(e){
    let el  = $(e.target);
    if(el[0] != $("#style_toggle_btn")[0]){
        if(el[0].parentElement)
        $(".style_toggle_menu").slideUp();
    }
});