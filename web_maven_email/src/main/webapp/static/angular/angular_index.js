
//创建一个模块
var empApp = angular.module("empApp",[]); 
var total = 0;//总条数
var curPageNum = 1;//当前页
//创建一个控制器
empApp.controller("EmpAppController",["$scope","$http",function($scope,$http){
	//复选框的默认选中状态
	$scope.itemCheckedFlag = false;
	//跳转页面
	$scope.toPage = function(num){
		$http({
				url:"emp/selectPage?pageno="+num,
				method:'GET'
			}).success(function(data,header,config,status){
				//响应成功
				//console.log(data);
				//表格数据对应的模型
				$scope.empList = data.extend.pageInfo.list;
				//分页区
				$scope.pageInfo = data.extend.pageInfo;
				//总条数
				total = data.extend.pageInfo.total;
				//当前页
				curPageNum = data.extend.pageInfo.pageNum;
				
		});
	};
	
	//默认跳转到第一页
	$scope.toPage(1);
	
	//全选或全不选
	$scope.checkAll = function(){
		$scope.itemCheckedFlag = !$scope.itemCheckedFlag;		
	};
	
	//表单重置
	$scope.reset = function(type){
		if(type == "add"){
			angular.element("#addInputEmpName").val("");
			angular.element("#addInputEmail").val("");
		}else{
			angular.element("#updateEmpName").val("");
			angular.element("#updateEmpModal :radio").val("男");
			angular.element("#updateInputEmail").val("");
		}
	};
	
	//加载部门列表
	$scope.loadDepts = function(deptId){
		$http({
			url:"emp/selectDepts",
			method:'GET'
		}).success(function(data,header,config,status){
			//响应成功
			//console.log(data);
			//下拉框对应的模型
			$scope.deptList = data.extend.deptList;
			//设置当前部门id
			$scope.currentDeptId = deptId;
		});
	};	
	//加载员工
	$scope.loadEmp = function(empId){
		$http({
			url:"emp/selectEmp/"+empId,
			method:'GET'
		}).success(function(data,header,config,status){
			//响应成功
			$scope.currentEmp = data.extend.emp;
		});
	};	
	
	//显示修改模态框
	$scope.showUpdateModal = function(empId,deptId){
		//表单重置
		$scope.reset("update");
		//加载部门列表
		$scope.loadDepts(deptId);
		//查询修改当前要修改的员工
		$scope.loadEmp(empId);
		angular.element("#updateEmpModal").modal("show");
	};
	
	//显示新增模态框
	$scope.showAddModal = function(){
		//表单重置
		$scope.reset("add");
		//加载部门列表
		$scope.loadDepts();
		angular.element("#addEmpModal").modal("show");
	};
	
	//新增员工
	$scope.saveEmp = function(){
		
		//console.log($scope.newEmpModel);
		var data = angular.element("#addEmpModal form").serialize();
		$http({
			url:"emp/save",
			method:"POST",
			data:data,
			headers : {"Content-Type":"application/x-www-form-urlencoded"} // set the headers so angular passing info as form data (not request payload)
		}).success(function(data,header,config,status){
			//响应成功
			angular.element("#addEmpModal").modal("hide");
			//跳转到最后一页
			$scope.toPage(total);
		});
	};
	//修改员工
	$scope.updateEmp = function(){
		
		//console.log($scope.newEmpModel);
		var data = angular.element("#updateEmpModal form").serialize();
		$http({
			url:"emp/update",
			method:"POST",
			data:data,
			headers : {"Content-Type":"application/x-www-form-urlencoded"} // set the headers so angular passing info as form data (not request payload)
		}).success(function(data,header,config,status){
			//响应成功
			angular.element("#updateEmpModal").modal("hide");
			//跳转到最后一页
			$scope.toPage(curPageNum);
		});
	};
	
	
	
	
}]);