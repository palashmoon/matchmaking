package com.stackroute.config;

// custom jwt filter and wired that into the Spring Security filter chain.

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
public class JwtFilter  extends GenericFilterBean {
    @Value("${jwtfilter.messages.exception1}")
    private String exceptionMessage1;
    @Value("${jwtfilter.messages.exception2}")
    private String exceptionMessage2;

    public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain)
            throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) req;
        final HttpServletResponse response = (HttpServletResponse) res;
        final String authHeader = request.getHeader("authorization");

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);

            chain.doFilter(req, res);
        } else {

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new ServletException(exceptionMessage1);
            }

            System.out.println(authHeader);
            System.out.println("after");
            final String token = authHeader.substring(7);
            System.out.println(token);

            try {
                final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
                request.setAttribute("claims", claims);
            } catch (final SignatureException e) {
                throw new ServletException(exceptionMessage2);
            }

            chain.doFilter(req, res);
        }
    }
}

