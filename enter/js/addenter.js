window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})
};
var hxArr=window.location.hash.length > 0 ? window.location.hash.substring(1).split("+") : []
var apiHost=hxArr[0]
var userId=hxArr[1]
function save() {
	var parms={
		uid:userId,
	}
	$.ajax({
		type: "post",
		url:apiHost+"/appInStorage/save:",
		data:parms
		
	});
}

window.onresize = function() {
	getRem(750, 100)
};

function getRem(pwidth, prem) {
	var html = document.getElementsByTagName("html")[0];
	var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = oWidth / pwidth * prem + "px";
}