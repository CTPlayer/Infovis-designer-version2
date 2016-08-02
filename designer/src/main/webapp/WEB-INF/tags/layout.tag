<%@tag description="页面模板" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@attribute name="title"%>
<%@attribute name="script" fragment="true"%>
<%@attribute name="style" fragment="true"%>
<!DOCTYPE html>
<html>
<head>
<base href='<spring:url value="/"></spring:url>' />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="description" content="C-Care" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>${title}</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<jsp:invoke fragment="style"></jsp:invoke>
</head>
<jsp:doBody />
<jsp:invoke fragment="script" />
</html>