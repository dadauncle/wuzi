window.onload = function() {
  getRem(750, 100)
  addBtn()
  jumpInfo()
	getList(function(rdata) {
			var data=rdata.data
			var html=``
			if (data.length==0) {
				$(".bodyCon").append('<div class="span" style="padding: .5rem;color:#aaa; text-align: center;font-size: .3rem;">暂无数据</div>')
				return;
			}
			for (var i = 0; i < data.length; i++) {
				html+=`
					<div class="listRow" data="${data[i].inStorageId}">
				<p>
					<strong>${data[i].partBName}</strong>
				</p>
				<p>
					<span class="leftCon">
						物资名称：<span class="name">${data[i].partBName}</span>
					</span>
					<span class="right">
						入库数量：<span class="number">${data[i].number}</span>
					</span>
				</p>
				<p>
					<span class="leftCon">
						入库日期：<span class="date">${data[i].createTime}</span>
					</span>
					<span class="right">
						收料人：<span class="people">${data[i].reciveUserName}</span>
					</span>
				</p>
			</div>
				`
			}
			$(".bodyCon").append(html)
			jumpInfo()
	})
};
var hxArr = window.location.hash.length > 0
  ? window.location.hash.substring(1).split("+")
  : []
var apiHost = hxArr[0]||"http://172.18.0.10:8083";
var userId = hxArr[1]|| "1";
sessionStorage.setItem("apiHost",apiHost)
sessionStorage.setItem("userId",userId)
var pageCode = 0;
var pageSize = 0;
$(window).scroll(function() {
  //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
  var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  //clientHeight是网页在浏览器中的可视高度，
  var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
  //scrollTop是浏览器滚动条的top位置，
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
  if (scrollTop + clientHeight == htmlHeight) {
    getList();
  }
})
//获取list数据，滚动加载
function getList( callback) {
	apiHost = "http://172.18.0.10:8083/erchu";
	userId=5;
  pageCode += 1
  pageSize += 10
	var parms={
		uid:userId,
		pageCode:pageCode,
		pageSize:pageSize,
	}
  $.ajax({
    type: "post",
    data:parms,
    url: apiHost + "/appInStorage/list",
    success:function(rdata) {
    	console.log(parms)
			callback(rdata)
    }
  });
}
function addBtn(){
	$(".addBtnBox").click(function () {
		location.href="addenter.html"
	})
}

//跳转详情页
function jumpInfo () {
	$(".listRow").click(function(){
		sessionStorage.setItem("enterStorageId",$(this).attr("data"))
		location.href="enterinfo.html"
	})
}

window.onresize = function() {
  getRem(750, 100)
};

function getRem(pwidth, prem) {
  var html = document.getElementsByTagName("html")[0];
  var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
  html.style.fontSize = oWidth / pwidth * prem + "px";
}
