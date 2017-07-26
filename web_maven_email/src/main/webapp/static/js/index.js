var total;//总记录数
var curPage;//当前页
//跳转到第num页
function toPage(num){
	$.ajax({
		url:"emp/selectPage",
		//async:false,
		data:"pageno="+num,
		type:"GET",
		success:function(result){
			//创建列表页面
			buildTable(result);
			//创建分页条
			buildPageBar(result);
			
			//创建分页导航
			buildPageNav(result);
			
			//为总记录数赋值
			total =  result.extend.pageInfo.total;
			//为当前页赋值
			curPage = result.extend.pageInfo.pageNum;
			$("#check_all").prop("checked",false);
		}
	});
}
//通过ajax加载部门列表
function loadDepts(target,deptId){
	//通过ajax请求获取部门信息
	$.ajax({
		url:"emp/selectDepts",
		type:"GET",
		//async:false,
		success:function(data){
			//清空下拉框中数据
			$(target).empty();
			
			//data表示要遍历的集合或数组
			//index表示下标
			//obj表示各个元素
			$.each(data.extend.deptList,function(index,obj){
				//创建option标签
				//var option = $("<option></option>").attr("value",obj.dept_id).text(obj.dept_name);
				var option = 
					$("<option value='"+obj.dept_id+"'>"
							+obj.dept_name
					+"</option>");
				//如果跟指定的部门id值匹配，则设为选中状态
				if(obj.dept_id == deptId){
					option.attr("selected",true);
				}
				//添加到部门的下拉框中
				$(target).append(option);
			});
		}
	});
}	

//构建列表页面
function buildTable(result){
	$("#empTable tr:gt(0)").remove();
	
	var empList = result.extend.pageInfo.list;
	//遍历
	$.each(empList,function(index,item){
		var checkboxTd = $("<td></td>").append($("<input  type='checkbox' class='check_item'/>").val(item.emp_id));
		var empIdTd = $("<td></td>").append(item.emp_id);
		var empNameTd = $("<td></td>").append(item.emp_name);
		var genderTd = $("<td></td>").append(item.gender);
		var emailTd = $("<td></td>").append(item.email);
		var deptNameTd = $("<td></td>").append(item.dept.dept_name);
		var editBtn = $("<button></button>").addClass("btn btn-primary editEmpBtn")
					.append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden",true))
					.append("修改")
					.attr("edit_emp_id",item.emp_id);
		var delBtn = $("<button></button>").addClass("btn btn-danger delEmpBtn")
					.append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden",true))
					.append("删除")
					.attr("del_emp_id",item.emp_id);
		var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
		
		//将各单元格添加到行中
		var trElement = $("<tr></tr>")
				.append(checkboxTd)
				.append(empIdTd)
				.append(empNameTd)
				.append(genderTd)
				.append(emailTd)
				.append(deptNameTd)
				.append(btnTd)
				; 
		//将行添加到表格中
		$("#empTable").append(trElement);
	});
}
//构建分页条
function buildPageBar(result){
	$("#pageBarInfo").empty();
	//共有${pageInfo.total }条数据,共有${pageInfo.pages}页
	var pageInfo =result.extend.pageInfo;
	$("#pageBarInfo").text("共有"+pageInfo.total+"条数据,共有"+pageInfo.pages+"页,当前为第"+pageInfo.pageNum+"页");
}

//创建分页导航
function buildPageNav(result){
	$("nav").empty();
	var pageInfo = result.extend.pageInfo;
	var ul = $("<ul></ul>").addClass("pagination");
	var firstPageLi = $("<li></li>")
				.append($("<a></a>").append("首页").attr("href","#"));
	var lastPageLi = $("<li></li>")
				.append($("<a></a>").append("末页").attr("href","#"));
	
	var prevPageLi = $("<li></li>")
			.append($("<a></a>").append("&laquo;"));
	var nextPageLi = $("<li></li>")
			.append($("<a></a>").append("&raquo;"));
	
	//添加首页和前一页
	ul.append(firstPageLi).append(prevPageLi);
	//如果有前一页，则给前一页和首页绑定事件
	if(pageInfo.hasPreviousPage){
		firstPageLi.click(function(){
			toPage(1);			
		});
		prevPageLi.click(function(){
			toPage(pageInfo.pageNum-1);			
		});
	}else{
		//否则禁用
		firstPageLi.addClass("disabled");
		prevPageLi.addClass("disabled");
	}
	
	$.each(pageInfo.navigatepageNums,function(index,obj){
		var numLi = $("<li></li>")
			.append($("<a></a>").append(obj).attr("href","#"));
		//如果是当前页，则高亮显示
		if(obj == pageInfo.pageNum){
			numLi.addClass("active");
		}
		
		numLi.click(function(){
			
			toPage(obj);
		});
		
		//添加中间的各页
		ul.append(numLi);
	});
	//添加后一页和末页
	ul.append(nextPageLi).append(lastPageLi);
	
	//如果有前一页，则给前一页和首页绑定事件
	if(pageInfo.hasNextPage){
		lastPageLi.click(function(){
			toPage(pageInfo.pages);			
		});
		nextPageLi.click(function(){
			toPage(pageInfo.pageNum+1);			
		});
	}else{
		//否则禁用
		lastPageLi.addClass("disabled");
		nextPageLi.addClass("disabled");
	}
	
	$("nav").append(ul);
}


//校验添加表单
function validate_add_form(){
	/*var empName = $("#inputEmpName").val();
	alert(empName);
	if(empName == "张三"){
		return false;
	}else{
		return true;
	}*/
	var empEmail = $("#addInputEmail").val();
	var emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if(!emailReg.test(empEmail)){
		return false;
	}else{
		return true;
	}
}
$(function(){
	//请求分页数据
	toPage(1);

	//对新增按钮绑定事件
	$("#addEmpBtn").click(function(){
		//清空text
		$("#addEmpModal :text").val("");
		//加载部门列表
		loadDepts("#addEmpModal select");
		
		//打开新增用的模态框
		$("#addEmpModal").modal("show");
	});
	
	//对保存按钮绑定事件
	$("#saveEmpBtn").click(function(){
		/*if(!validate_add_form()){
			
			$("#addInputEmail").parent().parent().addClass("has-error");
			$("#addInputEmail").next("span").text("用户名不能是张三");
			
			return false;
		}else{
			$("#addInputEmail").parent().parent().removeClass("has-error").addClass("has-success");
			$("#addInputEmail").next("span").text("用户名可用");
			
			return true;
		}*/
		
		var data = $("#addEmpModal form").serialize();
		$.post("emp/save",data,function(){
			//关闭模态框
			$("#addEmpModal").modal("hide");
			//跳转到最后一页
			toPage(total);			
		});
	});
	//对提交修改按钮绑定事件
	$("#updateEmpBtn").click(function(){
		var data = $("#updateEmpModal form").serialize();
		$.post("emp/update",data,function(){
			//关闭模态框
			$("#updateEmpModal").modal("hide");
			//跳转到当前页
			toPage(curPage);			
		});
	});
	//对提交删除按钮绑定事件
	$("#deleteEmpBtn").click(function(){
		var empId = $("#deleteEmpModal input[name=emp_id]").val();
		$.ajax({
			url:"emp/delete/"+empId,
			type:"DELETE",
			dataType:"json",
			success:function(result){
				
				$("#deleteEmpModal").modal("hide");
				//跳转到当前页
				toPage(curPage);	
				
			}
		});
	});
	
	//对批量删除按钮绑定事件
	$("#toBatchDelEmpBtn").click(function(){
		var empIdArr = new Array();
		var length = $(".check_item:checked").length;
		if(length == 0){
			$("#alertModal").modal("show");
		}else{
			$.each($(".check_item:checked"),function(index,item){
				var empId = $(item).val();
				empIdArr.push(empId);
			});
			var empIds = empIdArr.join(",");
			$("#deleteModelLabel").text("确认要批量删除选中的数据吗?");
			//设置要提交的员工ids
			$("#deleteEmpModal input[name=emp_id]").val(empIds);
			//显示确认框
			$("#deleteEmpModal").modal("show");
		}
		
	});
	
	
	//对各行的删除按钮绑定事件
	$(document).on("click",".delEmpBtn",function(){
		//为隐藏域中的emp_id赋值
		var empId = $(this).attr("del_emp_id");
		$("#deleteEmpModal input[name=emp_id]").val(empId);
		$("#deleteEmpModal").modal("show");
	});
	
	
	//对各行的修改按钮绑定事件
	$(document).on("click",".editEmpBtn",function(){

		//2.查询员工信息
		var empId = $(this).attr("edit_emp_id");
		//
		$("#updateEmpModal :radio").attr("checked",false);
		$("#updateEmpModal select option").attr("selected",false);
	
		$.ajax({
			url:"emp/selectEmp/"+empId,
			type:"GET",
			javaType:"json",
			success:function(msg){
				var emp = msg.extend.emp;
				//加载部门列表
				loadDepts("#updateEmpModal select",emp.dept.dept_id);
				
				//获取该行员工数据
				//var empId = $(this).parent().parent().find("td:first-child").text();
				/*var trEle = $(this).parent().parent();
				var empId = $(trEle).find("td:eq(0)").text().trim();
				var empName = $(trEle).find("td:eq(1)").text().trim();
				var empGender = $(trEle).find("td:eq(2)").text().trim();
				var empEmail = $(trEle).find("td:eq(3)").text().trim();
				var empDept = $(trEle).find("td:eq(4)").text().trim();*/
				
				//alert(empId+","+empName+","+empGender+","+empEmail+","+empDept);
				//对修改用的模态框进行赋值
				$("#updateEmpModal input[name=emp_id]").val(emp.emp_id);
				$("#updateEmpModal input[name=emp_name]").val(emp.emp_name);
				$("#updateEmpModal input[name=email]").val(emp.email);
				
				$("#updateEmpModal :radio[name=gender]").val([emp.gender]);
				$("#updateEmpModal select").val(emp.dept.dept_id);
				//$("#updateEmpModal option[value='3']").attr("selected",true);
				
				//打开修改用的模态框
				$("#updateEmpModal").modal("show");
			}
			
		});
		
		
	});
	
	//全选、全部选
	$("#check_all").click(function(){
		//attr获取checked是undefined
		//我们这些dom原生的属性用prop来获取
		//而自定义属性用attr来获取
		$(".check_item").prop("checked",$(this).prop("checked"));
	});
	
	//为单个复选框绑定事件，以便在全部选择后，check_all复选框自动勾选
	$(document).on("click",".check_item",function(){
		//判断是否全选
		var flag = $(".check_item:checked").length == $(".check_item").length;
		$("#check_all").prop("checked",flag);
	});
 });
 