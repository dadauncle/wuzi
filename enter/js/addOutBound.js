window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})
	$(".leftIcon").click(function(){
		back()
	})
	var hxArr = window.location.hash.length > 0 ? window.location.hash.substring(1).split("+") : []

	var apiHost = sessionStorage.getItem(apiHost)
	var userId = sessionStorage.getItem(userId)

	$("button").click(function() {
		save()
	})
	//获取仓库列表
	$.ajax({
		type: "get",
		url: apiHost + "/appWarehouse/getWarehouses",
		data: {
			'uid': userId
		},
		async: true,
		success: function(data) {
			console.log(data);
			//渲染仓库
			var info = data.data;
			renderWarehouse(info)
		},
		error: function(data) {
			console.log(data)
		}
	});
	//获取供应商
	$.ajax({
		type: "get",
		url: apiHost + "/appContractParty/queryByType",
		data: {
			'uid': userId
		},
		async: true,
		success: function(data) {
			console.log(data);
			//渲染仓库
			var info = data.data;
			renderSupplier(info)
		},
		error: function(data) {
			console.log(data)
		}
	});
	//获取物资科目
	$.ajax({
		type: "get",
		url: apiHost + "/appDictionary/getMaterialSubjects",
		data: {
			'uid': userId
		},
		async: true,
		success: function(data) {
			console.log(data);
			//渲染仓库
			var info = data.data;
			renderSubjects(info)
		},
		error: function(data) {
			console.log(data)
		}
	});
	//点击单选框
	clickRadio()
	//点击添加细项
	addItem()

};
function back () {
	history.go(-1)
}
function clickRadio() {

	$('.check').click(function() {

		$('.check img').attr('src', 'img/mind_login_n@3x.png')
		$('.check').attr('type', '0');

		$(this).find('img').attr('src', 'img/mind_login_h@3x.png');
		$(this).attr('type', '1');
	})
}

function addItem() {

	$('#addItem').click(function() {
		window.location.href = "chuku_specificPoint.html";
	})
}

function renderWarehouse(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.WAREHOUSE_ID + '">' + ele.NAME + '</option>';
	})
	$('#warehouse').append(html);
}

function renderSupplier(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.CONTRACT_PARTY_ID + '">' + ele.NAME + '</option>';
	})
	$('#supplier').append(html);
}

function renderSubjects(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.bianma + '">' + ele.name + '</option>';
	})
	$('#subjects').append(html);
	$('#subjects').on('change', function() {
		$('.checkBox').css('display', 'none');
		if($(this).val() == '02401') {
			$('.checkBox').css('display', 'flex');
		}
	})
}

function save() {
	
	var parms = {
		"uid": "1",
		"positionId": "1",
		"partBId": "1",
		"subjectId": "1",
		"purpose": "1",
		"userPart": "1",
		"company": "1",
		"outUserId":"",
		"materialIds": [],
		"materialCategoryIds": [],
		"numbers": []
	}

	if($("#warehouse").val() && $("#warehouse").val() != "") {
		parms.positionId = $("#warehouse").val()
	} else {
		alert("请选择发货仓库")
		return
	}

	if($("#supplier").val() && $("#supplier").val() != "") {
		parms.partBId = $("#supplier").val()
	} else {
		alert("请选择供应商")
		return
	}

	if($("#subjects").val() && $("#subjects").val() != "") {
		parms.subjectId = $("#subjects").val()
	} else {
		alert("请选择物资科目")
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