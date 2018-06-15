window.onload = function() {
	getRem(750, 100)
	addBtn()
	getList(function(rdata) {
		console.log(rdata);
	})
};
var hxArr = window.location.hash.length > 0 ?
	window.location.hash.substring(1).split("+") : []
var apiHost = hxArr[0] || "http://172.18.0.10:8083/erchu"
var userId = hxArr[1] || "1"
sessionStorage.setItem("apiHost", apiHost)
sessionStorage.setItem("userId", userId)
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
	if(scrollTop + clientHeight == htmlHeight) {
		getList();
	}
})
//获取list数据，滚动加载
function getList(callback) {
	pageCode += 1
	pageSize += 10
	var parms = {
		uid: userId,
		pageCode: pageCode,
		pageSize: pageSize,
	}
	$.ajax({
		type: "post",
		data: parms,
		url: apiHost + "/appOutStorage/list",
		success: function(rdata) {
			console.log(parms)
			callback(rdata)
		}
	});
}

function addBtn() {
	$(".addBtnBox").click(function() {
		location.href = "addOutBound.html"
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