window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})
	$(".leftIcon").click(function() {
		back()
	})

	var apiHost = sessionStorage.getItem("apiHost")
	var userId = sessionStorage.getItem("userId")
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

function back() {
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
	var apiHost = sessionStorage.getItem("apiHost")
	var userId = sessionStorage.getItem("userId")
	
	var parms = {
		"uid": userId,
		"positionId": "",
		"partBId": "",
		"subjectId": "",
		"purpose": "",
		"userPart": "",
		"company": "",
		"outUserId": userId,
		"remark": "",
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

	if($("#materialUsage").val() && $("#materialUsage").val() != "") {
		parms.purpose = $("#materialUsage").val()
	} else {
		alert("请填入材料用途")
		return
	}
	if($("#useParts").val() && $("#useParts").val() != "") {
		parms.userPart = $("#useParts").val()
	} else {
		alert("请填入使用部位")
		return
	}
	if($("#company").val() && $("#company").val() != "") {
		parms.company = $("#company").val()
	} else {
		alert("请填入领用单位")
		return
	}

	parms.remark = $("#remark").val();//备注
	
	console.log(parms);
	$(".Name").each(function(index, val) {
		parms.materialIds.push($(this).attr("dataName"))
	})
	$(".category").each(function(index, val) {
		parms.materialCategoryIds.push($(this).attr("dataCategory"))
	})
	$(".number").each(function(index, val) {
		parms.numbers.push($(this).attr("dataNumbers"))
	})

	$("button").css('background-color', "#CCCCCC")
	$("button").click(function() {
		alert("正在提交，请稍等")
	})

	$.ajax({
		type: "post",
		url: apiHost + "/appOutStorage/save",
		data: parms,
		success: function(rdata) {
			if(rdata.success) {
				alert("提交成功")
				history.go(-1);
			} else {
				alert(rdata.message)
				$("button").css('background-color', "#F16412")
				$("button").click(function() {
					save()
				})
			}
		},
		error: function(err) {
			alert("提交失败请稍后重试");
			$("button").css('background-color', "#F16412")
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