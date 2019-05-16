//package com.stackroute.educationservice.zuulgateway.configuration;
//
//
//import com.netflix.ribbon.proxy.annotation.Http;
//import org.apache.catalina.Context;
//import org.apache.catalina.connector.Connector;
//import org.apache.http.protocol.HTTP;
//import org.apache.tomcat.util.descriptor.web.SecurityCollection;
//import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
//import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
//import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//@Configuration
//    public class ConnectorConfig {
//
//    @Bean
//    public ServletWebServerFactory servletContainer() {
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
//            @Override
//            protected void postProcessContext(Context context) {
//                SecurityConstraint securityConstraint = new SecurityConstraint();
//                securityConstraint.setUserConstraint("CONFIDENTIAL");
//                SecurityCollection collection = new SecurityCollection();
//                collection.addPattern("/*");
//                securityConstraint.addCollection(collection);
//                context.addConstraint(securityConstraint);
//
//              }
//        };
//        tomcat.addAdditionalTomcatConnectors(redirectConnector());
//
//        return tomcat;
//
//    }
//
//
//
//    private Connector redirectConnector() {
//
//        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
//        connector.setScheme("http");
//        connector.setPort(8080);
//
//        connector.setSecure(false);
//        connector.setRedirectPort(8097);
//        return connector;
//
//    }
//
//}
//
