<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>我的邮箱</title>
	
	<link rel="stylesheet" type="text/css" href="static/bootstrap-3.3.7-dist/css/bootstrap.min.css">
	<script type="text/javascript" src="static/js/jquery-3.2.1.js"></script>
	<script type="text/javascript" src="static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/angular/angular.min.js"></script>
	<script type="text/javascript">
		
	</script>
	 
  </head>
  
  <body>
  	<div class="contrainer">
    	<table>
    		<tr>
    			<td><span class="glyphicon glyphicon-user" aria-hidden="true"></span></td>
    			<td><button type="button" class="btn btn-success">批量设为已读</button></td>
    			<td><button type="button" class="btn btn-danger">批量删除</button></td>
    			<td><button type="button" class="btn btn-primary">按时间升序排列</button></td>
    			<td><button type="button" class="btn btn-info">按时间降序排列</button></td>
    		</tr>
    		<tr>
    			<td><input type="checkbox" ></td>
    			<td>发件人</td>
    			<td>阅读状态</td>
    			<td>邮件标题</td>
    			<td>发送时间</td>
    		</tr>
    		<c:forEach items="${allInfo }" var="all">
    			<tr>
    			<td></td>
    			<td></td>
    			<td></td>
    			<td></td>
    			<td></td>
    		</tr>
    		</c:forEach>
    		
    	</table>
    </div>
  </body>
</html>
