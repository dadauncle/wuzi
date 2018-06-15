window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})

	$('input,textarea').attr('readonly', 'readonly').css('outline', 'none')

	var apiHost = sessionStorage.getItem("apiHost")||"http://172.18.0.10:8083/erchu"
	var userId = sessionStorage.getItem("userId")||"1"
	var outStorageId = sessionStorage.getItem("outStorageId")||"1"
	//获取详情
	getInfo()
	function getInfo() {
		$.ajax({
			type: "get",
			url: apiHost + "/appOutStorage/findById",
			data: {
				'uid': userId,
				"outStorageId": outStorageId
			},
			async: true,
			success: function(data) {
				console.log(data);
				//渲染详情
				var info = data.data;
				renderInfo(info)
			},
			error: function(data) {
				console.log(data)
			}
		});
	}
};
$(".row").css({
	border: "none",
	padding: "0rem"
})

//渲染详情
function renderInfo(info){
	
}
window.onresize = function() {
	getRem(750, 100)
};

function getRem(pwidth, prem) {
	var html = document.getElementsByTagName("html")[0];
	var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = oWidth / pwidth * prem + "px";
}