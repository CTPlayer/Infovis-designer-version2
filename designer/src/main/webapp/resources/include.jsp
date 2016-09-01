<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
    String context = request.getContextPath();
    String scheme = request.getScheme();
    String host = request.getServerName();
    String basePath = scheme + "://" + host + ":" + request.getServerPort() + context + "/";
    pageContext.setAttribute("ctx", context);
    pageContext.setAttribute("basePath", basePath);
%>