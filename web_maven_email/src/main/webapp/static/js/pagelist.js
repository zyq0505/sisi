//ͨ��ajax���ز����б�
function loadDepts(target){
	//ͨ��ajax�����ȡ������Ϣ
	$.ajax({
		url:"emp/selectDepts",
		type:"POST",
		success:function(data){
		//���������������
		$(target).empty();
		
		//data��ʾҪ�����ļ��ϻ�����
		//index��ʾ�±�
		//obj��ʾ����Ԫ��
			$.each(data,function(index,obj){
				//����option��ǩ
				//var option = $("<option></option>").attr("value",obj.dept_id).text(obj.dept_name);
				var option = $("<option value='"+obj.dept_id+"'>"+obj.dept_name+"</option>");
				//��ӵ����ŵ���������
				$(target).append(option);
			});
		}
	});
}	

$(function(){
  			//��������ť���¼�
  			$("#addEmpBtn").click(function(){
  				//���ز����б�
  				loadDepts("#addEmpModal select");
  				
  				//�������õ�ģ̬��
  				$("#addEmpModal").modal("show");
  			});
  			
  			//�Ա��水ť���¼�
  			$("#saveEmpBtn").click(function(){
  				var data = $("#addEmpModal form").serialize();
  				$.post("emp/save",data,function(){
  					//�ر�ģ̬��
  					$("#addEmpModal").modal("hide");
  					//���¼��ص�ǰҳ��
  					window.location.reload();
  				} );
  			});
  			
  			//��ɾ����ť���¼�
  			$(".delEmpBtn").click(function(){
  				$("#deleteEmpModal").modal("show");
  			});
  			
  			
  			
  			//�Ը��е��޸İ�ť���¼�
  			$(".editEmpBtn").click(function(){
  				
  				//���ز����б�
  				loadDepts("#updateEmpModal select");
  				//
  				$("#updateEmpModal :radio").attr("checked",false);
  				$("#updateEmpModal select option").attr("selected",false);
  			
  				//��ȡ����Ա������
  				//var empId = $(this).parent().parent().find("td:first-child").text();
  				var trEle = $(this).parent().parent();
  				var empId = $(trEle).find("td:eq(0)").text().trim();
  				var empName = $(trEle).find("td:eq(1)").text().trim();
  				var empGender = $(trEle).find("td:eq(2)").text().trim();
  				var empEmail = $(trEle).find("td:eq(3)").text().trim();
  				var empDept = $(trEle).find("td:eq(4)").text().trim();
  				
  				//alert(empId+","+empName+","+empGender+","+empEmail+","+empDept);
  				//���޸��õ�ģ̬����и�ֵ
  				$("#updateEmpModal input[name=emp_id]").val(empId);
  				$("#updateEmpModal input[name=emp_name]").val(empName);
  				$("#updateEmpModal input[name=email]").val(empEmail);
  			    /*$("#updateEmpModal :radio[value="+empGender+"]").attr("checked",true);
  				$("#updateEmpModal select option").attr("selected",false);*/
  				
  				$("#updateEmpModal :radio[name=gender]").val([empGender]);
  				alert($("#updateEmpModal option[value=3]").text());
  				//$("#updateEmpModal option[value='3']").attr("selected",true);
  				
  				//���޸��õ�ģ̬��
  				//$("#updateEmpModal").modal("show");
  			});
  		});
  		