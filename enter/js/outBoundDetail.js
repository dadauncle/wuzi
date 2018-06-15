window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})

	$('input,textarea').attr('readonly', 'readonly').css('outline', 'none')

	//获取详情
	getInfo()
	function getInfo() {
		$.ajax({
			type: "get",
			url: apiHost + "/appOutStorage/findById",
			data: {
				'uid': userId,
				"outStorageId":"1"
			},
			async: true,
			success: function(data) {
				console.log(data);
				//渲染仓库
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

window.onresize = function() {
	getRem(750, 100)
};

function getRem(pwidth, prem) {
	var html = document.getElementsByTagName("html")[0];
	var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = oWidth / pwidth * prem + "px";
}