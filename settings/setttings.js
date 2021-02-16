'use strict'
// TODO(Zerbats): 美化界面(不会CSS写出来丑哭了)
// TODO(Zerbats): 编辑页面增加图标预览
// TODO(Zerbats): 网站调序(目前为按钮调序)改成拖动调序
// TODO(Zerbats): 把alert和confirm改成好看点的样子
// TODO(Zerbats): 自动获取图标可以尝试获取高清图标,如果没有的话可以尝试用缩略图+右下角小图标的方式显示(参照firefox的启动页面,缩略图网上貌似有api)
// 挖了好多坑...

let sites = [];//全局变量

function SaveBackgroundUrl(){
    let bkgUrl = document.getElementById('BkgUrl').value;
    if (bkgUrl == '') {
        localStorage.removeItem("customBkgUrl");
        return;
    }
    localStorage.setItem("customBkgUrl", bkgUrl);
    location.reload();
}

function SaveSitesInfo() {
    localStorage.setItem('sites', JSON.stringify(sites));
}

function Delete(id) {
    if(confirm("真的要删除吗?此操作不可逆")){
        sites.splice(id,1);
        SaveSitesInfo();
        document.body.querySelector(`ul li:nth-child(${id})`)
        location.reload();
    }
}

function Save(id) {
    if(id==sites.length){
        let newSite={
            "name": document.getElementById('name'+id).value,
            "url": document.getElementById('url'+id).value,
            "cover": document.getElementById('cover'+id).value
        }
        sites.push(newSite);
        SaveSitesInfo();
        location.reload();
        return;//可以但没必要
    }
    sites[id].url = document.getElementById('url'+id).value;
    sites[id].name = document.getElementById('name'+id).value;
    sites[id].cover = document.getElementById('cover'+id).value;
    SaveSitesInfo();
    alert("保存成功");
}

function Edit(id) {
    $(`#form${id}`).slideToggle();
}

function Up(id) {
    if (id != 0) {
        let temp = sites[id];
        sites[id] = sites[id - 1];
        sites[id - 1] = temp;
        SaveSitesInfo();
        document.body.querySelector(`ul li:nth-child(${id}) > .name`).innerHTML = sites[id - 1].name;
        document.body.querySelector(`ul li:nth-child(${id + 1}) > .name`).innerHTML = sites[id].name;
    }
}

function Down(id) {
    if (id != sites.length - 1) {
        let temp = sites[id];
        sites[id] = sites[id + 1];
        sites[id + 1] = temp;
        SaveSitesInfo();
        document.body.querySelector(`ul li:nth-child(${id + 2}) > .name`).innerHTML = sites[id + 1].name;
        document.body.querySelector(`ul li:nth-child(${id + 1}) > .name`).innerHTML = sites[id].name;
    }
}

function GetCoverUrl(id){
    if(!confirm("是否尝试自动获取网站图标(可能会很糊)")){
        return;
    }
    let url = document.getElementById('url'+id).value;
    let coverUrl = ''
    if (url.match('http')){
        coverUrl = `${url.replace(/([^\/]+\.[a-z]+)\/.*/,"$1")}/favicon.ico`;
    } else {
        coverUrl = `https://${url.replace(/([^\/]+\.[a-z]+)\/.*/,"$1")}/favicon.ico`;
    }
    document.getElementById('cover'+id).value = coverUrl;
}

$(document).ready(() => {
    let customBkgUrl = localStorage.getItem("customBkgUrl");
    if(customBkgUrl == null){
        let bkgurl = localStorage.getItem("bkgurl");
        let date = localStorage.getItem("today");
        let datenow = new Date().getDate();
        if (!bkgurl || !date || datenow != date) {
            bkgurl = "https://jsonp.afeld.me/?url=https%3A%2F%2Fwww.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1%26mkt%3Dzh-CN";
            fetch(bkgurl).then(function (rep) {
                rep.json()
                    .then(function (v) {
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
    } else {
        $("body").css("background-image", "url(" + customBkgUrl + ")");
        document.getElementById("BkgUrl").value = customBkgUrl;
    }

    sites = JSON.parse(localStorage.getItem("sites"));
    if (sites == null) { sites = [{ "name": "省安全教育平台", "url": "https://putian.xueanquan.com/", "cover": "images/省安全教育平台.png" }, { "name": "半月谈", "url": "http://tv.cctv.com/lm/xwzk/", "cover": "images/半月谈.png" }, { "name": "新闻周刊", "url": "http://tv.cctv.com/lm/xwzk/", "cover": "images/新闻周刊.png" }, { "name": "微笙文章站", "url": "https://post.weisheng.cf/", "cover": "images/微笙文章站.png" }, { "name": "微信网页版", "url": "https://wx.qq.com/", "cover": "images/微信网页版.png" }, { "name": "百度网盘", "url": "https://pan.baidu.com/", "cover": "images/百度网盘.png" }, { "name": "网易邮箱", "url": "https://mail.163.com/", "cover": "images/网易邮箱.png" }, { "name": "QQ邮箱", "url": "https://mail.qq.com/", "cover": "images/QQ邮箱.png" }, { "name": "微笙抽号鸭", "url": "https://weisheng.cf/randQAQ/", "cover": "images/微笙抽号鸭.png" }, { "name": "微博", "url": "https://weibo.com/", "cover": "images/微博.png" }, { "name": "知乎", "url": "https://zhihu.com/", "cover": "images/知乎.png" }, { "name": "哔哩哔哩", "url": "https://www.bilibili.com/", "cover": "images/哔哩哔哩.png" }]; }
    let i = 0;
    for (let site of sites) {
        let siteItem = document.createElement('li');
        siteItem.innerHTML =
            `<svg viewBox="0 0 1024 1024" width="30" height="30"><path d="M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path></svg>
            <span class = "name">${site.name}</span>
            <span style="float:right;display:none" class="hide">
                <svg viewBox="0 0 1024 1024" width="25" height="30" onclick="Up(${i})"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z"></path></svg>
                <svg viewBox="0 0 1024 1024" width="25" height="30" onclick="Down(${i})"><path d="M904.533333 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 644.266667 179.2 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333l362.666666 362.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8l362.666666-362.666667c17.066667-17.066667 17.066667-42.666667 0-59.733333z" ></path></svg>
                <svg viewBox="0 0 1024 1024" width="20" height="30" onclick="Edit(${i})"><path d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z" ></path><path d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z" ></path></svg>
            </span>
            <div id="form${i}" style="display: none">
                    <hr>
                    <p>网址 :</p>
                    <input type="url" id="url${i}" value="${site.url}" onchange="GetCoverUrl(${i})">
                    <p>名称 :</p>
                    <input type="text" id="name${i}" value="${site.name}">
                    <p>图标 (输入图片链接) :</p>
                    <input type="url" id="cover${i}" value="${site.cover}">
                    <p>
                        <span style="font-size: 20px; margin-bottom: 10px;">改完记得点右边的勾号保存!!</span>
                        <!--(不想写css了qwq,偷个懒,哪位大神路过可以帮忙用css改下<li>元素的长度)-->
                        <span style="float:right;">
                            <svg viewBox="0 0 1024 1024" width="25" height="25" onclick="Delete(${i})"><path d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"  fill="#d81e06"></path><path d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z" fill="#d81e06"></path></svg>
                            <svg viewBox="0 0 1024 1024" width="25" height="25" onclick="Save(${i})"><path id="check${i}" d="M883.2 247.466667c-17.066667-17.066667-44.8-17.066667-59.733333 0L409.6 665.6l-209.066667-204.8c-17.066667-17.066667-44.8-17.066667-59.733333 0-17.066667 17.066667-17.066667 44.8 0 59.733333l238.933333 234.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l443.733333-448c17.066667-17.066667 17.066667-42.666667 0-59.733333z"></path></svg>
                        </span>
                    </p>
                </div> `;
        document.body.querySelector("ul").append(siteItem);
        i++;
    }
    let siteItem = document.createElement('li');
        siteItem.innerHTML =
            `<svg viewBox="0 0 1024 1024" width="30" height="30"><path d="M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path><path d="M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" ></path></svg>
            <span class = "name" onclick="Edit(${i})">+添加新网站+</span>
            <div id="form${i}" style="display: none">
                    <hr>
                    <p>网址 :</p>
                    <input type="url" id="url${i}" onchange="GetCoverUrl(${i})">
                    <p>名称 :</p>
                    <input type="text" id="name${i}">
                    <p>图标 (输入图片链接) :</p>
                    <input type="url" id="cover${i}">
                    <p>
                        <span style="font-size: 20px; margin-bottom: 10px;">改完记得点右边的勾号保存!!</span>
                        <span style="float:right;">
                            <svg viewBox="0 0 1024 1024" width="25" height="25" onclick="Save(${i})"><path id="check${i}" d="M883.2 247.466667c-17.066667-17.066667-44.8-17.066667-59.733333 0L409.6 665.6l-209.066667-204.8c-17.066667-17.066667-44.8-17.066667-59.733333 0-17.066667 17.066667-17.066667 44.8 0 59.733333l238.933333 234.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l443.733333-448c17.066667-17.066667 17.066667-42.666667 0-59.733333z"></path></svg>
                        </span>
                    </p>
                </div> `;
        document.body.querySelector("ul").append(siteItem);
});