FROM openjdk:10
ADD ./target/ZuulGateway-1.0.jar /usr/src/ZuulGateway-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8085/actuator/health || exit 1
EXPOSE 8081
WORKDIR usr/src
ENTRYPOINT ["java","-jar","ZuulGateway-1.0.jar"]