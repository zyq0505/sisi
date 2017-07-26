//通过ajax加载部门列表
function loadDepts(target){
	//通过ajax请求获取部门信息
	$.ajax({
		url:"emp/selectDepts",
		type:"POST",
		success:function(data){
		//清空下拉框中数据
		$(target).empty();
		
		//data表示要遍历的集合或数组
		//index表示下标
		//obj表示各个元素
			$.each(data,function(index,obj){
				//创建option标签
				//var option = $("<option></option>").attr("value",obj.dept_id).text(obj.dept_name);
				var option = $("<option value='"+obj.dept_id+"'>"+obj.dept_name+"</option>");
				//添加到部门的下拉框中
				$(target).append(option);
			});
		}
	});
}	

$(function(){
  			//对新增按钮绑定事件
  			$("#addEmpBtn").click(function(){
  				//加载部门列表
  				loadDepts("#addEmpModal select");
  				
  				//打开新增用的模态框
  				$("#addEmpModal").modal("show");
  			});
  			
  			//对保存按钮绑定事件
  			$("#saveEmpBtn").click(function(){
  				var data = $("#addEmpModal form").serialize();
  				$.post("emp/save",data,function(){
  					//关闭模态框
  					$("#addEmpModal").modal("hide");
  					//重新加载当前页面
  					window.location.reload();
  				} );
  			});
  			
  			//对删除按钮绑定事件
  			$(".delEmpBtn").click(function(){
  				$("#deleteEmpModal").modal("show");
  			});
  			
  			
  			
  			//对各行的修改按钮绑定事件
  			$(".editEmpBtn").click(function(){
  				
  				//加载部门列表
  				loadDepts("#updateEmpModal select");
  				//
  				$("#updateEmpModal :radio").attr("checked",false);
  				$("#updateEmpModal select option").attr("selected",false);
  			
  				//获取该行员工数据
  				//var empId = $(this).parent().parent().find("td:first-child").text();
  				var trEle = $(this).parent().parent();
  				var empId = $(trEle).find("td:eq(0)").text().trim();
  				var empName = $(trEle).find("td:eq(1)").text().trim();
  				var empGender = $(trEle).find("td:eq(2)").text().trim();
  				var empEmail = $(trEle).find("td:eq(3)").text().trim();
  				var empDept = $(trEle).find("td:eq(4)").text().trim();
  				
  				//alert(empId+","+empName+","+empGender+","+empEmail+","+empDept);
  				//对修改用的模态框进行赋值
  				$("#updateEmpModal input[name=emp_id]").val(empId);
  				$("#updateEmpModal input[name=emp_name]").val(empName);
  				$("#updateEmpModal input[name=email]").val(empEmail);
  			    /*$("#updateEmpModal :radio[value="+empGender+"]").attr("checked",true);
  				$("#updateEmpModal select option").attr("selected",false);*/
  				
  				$("#updateEmpModal :radio[name=gender]").val([empGender]);
  				alert($("#updateEmpModal option[value=3]").text());
  				//$("#updateEmpModal option[value='3']").attr("selected",true);
  				
  				//打开修改用的模态框
  				//$("#updateEmpModal").modal("show");
  			});
  		});
  		