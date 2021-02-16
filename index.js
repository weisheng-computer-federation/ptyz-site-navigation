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
    let sites = JSON.parse(localStorage.getItem("sites"));
    if(sites==null){sites=[/*{"name":'test',"url":'test.test',"cover":'test'},*/{"name":"省安全教育平台","url":"https://putian.xueanquan.com/","cover":"images/省安全教育平台.png"},{"name":"半月谈","url":"http://tv.cctv.com/lm/xwzk/","cover":"images/半月谈.png"},{"name":"新闻周刊","url":"http://tv.cctv.com/lm/xwzk/","cover":"images/新闻周刊.png"},{"name":"微笙文章站","url":"https://post.weisheng.cf/","cover":"images/微笙文章站.png"},{"name":"微信网页版","url":"https://wx.qq.com/","cover":"images/微信网页版.png"},{"name":"百度网盘","url":"https://pan.baidu.com/","cover":"images/百度网盘.png"},{"name":"网易邮箱","url":"https://mail.163.com/","cover":"images/网易邮箱.png"},{"name":"QQ邮箱","url":"https://mail.qq.com/","cover":"images/QQ邮箱.png"},{"name":"微笙抽号鸭","url":"https://weisheng.cf/randQAQ/","cover":"images/微笙抽号鸭.png"},{"name":"微博","url":"https://weibo.com/","cover":"images/微博.png"},{"name":"知乎","url":"https://zhihu.com/","cover":"images/知乎.png"},{"name":"哔哩哔哩","url":"https://www.bilibili.com/","cover":"images/哔哩哔哩.png"}];}

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

    for (let site of sites) {
        let siteItem = document.createElement('div');
        siteItem.setAttribute("onclick", `window.location.href='${site.url}'`);
        let img = document.createElement('img'), p = document.createElement('p');
        img.src = site.cover;
        img.alt = site.name;
        img.className = "comweb_png";
        p.className = "comweb_p";
        p.innerText = site.name
        siteItem.append(img);
        siteItem.append(p);
        document.body.querySelector(".comweb").append(siteItem);
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
