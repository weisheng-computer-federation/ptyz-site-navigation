var flag = 1;
function Search() {
    var input = document.getElementById("search_text").value;
    if ($(".fir")[0].id == "bing") window.open(`https://cn.bing.com/search?q=${input}`, "blank");
    else if($(".fir")[0].id == "baidu") window.open(`https://www.baidu.com/s?ie={inputEncoding}&wd=${input}`, "blank")
    else if($(".fir")[0].id == "google") window.open(`https://search.library.edu.eu.org/search?q=${input}`, "blank");
}

function Check() {
    if (event.keyCode == 13) Search();
}

function Change(x) {
    $(".search_engine").attr("class", "search_engine");
    $(x).attr("class", "search_engine fir");
    localStorage.setItem("search", x);
}

function StyleToggleMenu() {
    let el = $(".style_toggle_menu");
    el.slideToggle();
    event.stopPropagation();
}

function StyleToggle(sty, el) {
    $(".style_toggle_item").css("background-color", "rgba(0,0,0,0)");
    $(el).css("background-color", "rgba(0,120,215,.12)");
    $("#sty").attr("href", "sty_" + sty + ".css");
    
    localStorage.setItem("sty", sty);
    if (event) {
        event.stopPropagation();
    }
}

$(document).ready(() => {
    let bkgurl = localStorage.getItem("bkgurl");
    let style = localStorage.getItem("sty");
    let date = localStorage.getItem("today");
    let datenow = new Date().getDate();
    let search = localStorage.getItem("search");

    if(search) {
        Change(search);
    }
    
    if (style) {
        StyleToggle(style, document.getElementById("style_toggle_item_" + localStorage.getItem("sty")));
    }

    if (!bkgurl || !date || datenow != date) {
        bkgurl = "https://jsonp.afeld.me/?url=https%3A%2F%2Fwww.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1%26mkt%3Dzh-CN";
        fetch(bkgurl).then(function(rep) {
            rep.json()
                .then(function(v) {
                    bkgurl = "https://cn.bing.com/" + v["images"][0].url;
                    localStorage.setItem("bkgurl", bkgurl);
                    localStorage.setItem("today", datenow);
                    $("body").css("background-image", "url(" + bkgurl + ")")
                });
        });
    } else {
        bkgurl = localStorage.getItem("bkgurl");
        $("body").css("background-image", "url(" + bkgurl + ")");
    }
});

window.onload = function() {
    $(".style_toggle_menu").click(function(e) {
        e.stopPropagation();
    });

    $(document).click(function(e) {
        let el = $(".style_toggle_menu");
        el.slideUp();
    });
};
