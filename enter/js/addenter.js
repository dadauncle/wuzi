window.onload = function() {
	getRem(750, 100)
	var mySwiper = new Swiper('.entTable', {
		autoHeight: true,
		slidesPerView: 4,
	})
	$(".leftIcon").click(function(){
		back()
	})
	//点击单选框
	clickRadio()
	addItem()
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
};

function back () {
	history.go(-1)
}

var apiHost = sessionStorage.getItem("apiHost")
var userId = sessionStorage.getItem("userId")

//获取所有仓库
function getHouse () {
	var parms={
		uid:userId
	}
	$.ajax({
		type:"post",
		data:parms,
		url:apiHost+"/appWarehouse/getWarehouses",
		success:function(rdata){
			console.log(rdata)
			var data=rdata.data
			var html='<option value="">请选择</option>'
			for (var i = 0; i < data.length; i++) {
				html+=`
					<option value="${data[i].WAREHOUSE_ID}">${data[i].NAME}</option>
				`
			}
			$(".positionId").html(html)
		}
	});
	
}

//获取供应商
function getHouse () {
	var parms={
		uid:userId
	}
	console.log(apiHost)
	$.ajax({
		type:"post",
		data:parms,
		url:apiHost+"/appDictionary/getMaterialSubjects",
		success:function(rdata){
			console.log(rdata)
			var data=rdata.data
			var html='<option value="">请选择</option>'
			for (var i = 0; i < data.length; i++) {
				html+=`
					<option value="${data[i].WAREHOUSE_ID}">${data[i].NAME}</option>
				`
			}
			$(".positionId").html(html)
		}
	});
	
}

//获取物资科目
function getMaterialSubjects () {
	var parms={
		uid:userId
	}
	console.log(apiHost)
	$.ajax({
		type:"post",
		data:parms,
		url:apiHost+"/appDictionary/getMaterialSubjects",
		success:function(rdata){
			console.log(rdata)
			var data=rdata.data
			var html='<option value="">请选择</option>'
			for (var i = 0; i < data.length; i++) {
				html+=`
					<option value="${data[i].bianma}">${data[i].name}</option>
				`
			}
			$(".subjectId").html(html)
		}
	});
	
}


function addItem() {

	$('#addItem').click(function() {
		window.location.href = "ruku_specificPoint.html";
	})
}
// 渲染仓库
function renderWarehouse(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.WAREHOUSE_ID + '">' + ele.NAME + '</option>';
	})
	$('.positionId').append(html);
}
//渲染供应商
function renderSupplier(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.CONTRACT_PARTY_ID + '">' + ele.NAME + '</option>';
	})
	$('.contractUser').append(html);
}
//渲染物资科目
function renderSubjects(info) {
	var html = '';
	$.each(info || [], function(index, ele) {
		html += '<option value="' + ele.bianma + '">' + ele.name + '</option>';
	})
	$('.subjectId').append(html);
	$('.subjectId').on('change',function(){
		$('.checkBox').css('display','none');
		if($(this).val()=='02401'){
			$('.checkBox').css('display','flex');
		}
	})
}



//点击单选

function clickRadio() {

	$('.check').click(function() {

		$('.check img').attr('src', 'img/mind_login_n@3x.png')
		$('.check').attr('type', '0');

		$(this).find('img').attr('src', 'img/mind_login_h@3x.png');
		$(this).attr('type', '1');
	})
}

//保存
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
