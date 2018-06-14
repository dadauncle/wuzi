window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})
	$("button").click(function() {
		save()
	})
	//	$.ajax({
	//		type:"post",
	//		url:apiHost+"/appWarehouse/getWarehouses",
	//		async:true
	//	});
	
	//点击单选框
	clickRadio()

};
var hxArr = window.location.hash.length > 0 ? window.location.hash.substring(1).split("+") : []
var apiHost = hxArr[0]
var userId = hxArr[1]

function clickRadio() {

	$('.check').click(function() {
		
		$('.check img').attr('src', 'img/mind_login_n@3x.png')
		$('.check').attr('type', '0');
		
		$(this).find('img').attr('src', 'img/mind_login_h@3x.png');
		$(this).attr('type', '1');
	})
}

function save() {
	var parms = {
		uid: userId,
		reciveUserId: userId,
		submitUserId: userId,
		materialIds: [],
		materialCategoryIds: [],
		numbers: []
	}

	if($("contractId").val() && $("contractId").val() != "") {
		parms.contractId = $("contractId").val()
	} else {
		alert("请选择合同")
		return
	}

	if($("subjectId	").val() && $("subjectId	").val() != "") {
		parms.subjectId = $("subjectId	").val()
	} else {
		alert("请选择物资科目")
		return
	}

	if($("positionId").val() && $("positionId").val() != "") {
		parms.positionId = $("positionId").val()
	} else {
		alert("请选择存储位置")
		return
	}
	$(".Name").each(function(index, val) {
		parms.materialIds.push(val.attr("dataName"))
	})
	$(".category").each(function(index, val) {
		parms.materialIds.push(val.attr("dataCategory"))
	})
	$(".number").each(function(index, val) {
		parms.materialIds.push(val.attr("dataNumbers"))
	})

	$("button").css('background-color', "#CCCCCC")
	$("button").click(function() {
		alert("正在提交，请稍等")
	})

	$.ajax({
		type: "post",
		url: apiHost + "/appInStorage/save:",
		data: parms,
		success: function(rdata) {
			if(rdata.success) {
				alert("提交成功")
				history.go(-1);
			} else {
				alert("提交失败请稍后重试")
				$("button").css('background-color', "#F4F4F4")
				$("button").click(function() {
					save()
				})
			}
		},
		error: function(err) {
			alert("提交失败请稍后重试");
			$("button").css('background-color', "#F4F4F4")
			$("button").click(function() {
				save()
			})
		}

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