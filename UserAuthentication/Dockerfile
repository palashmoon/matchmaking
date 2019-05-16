FROM openjdk:10

ADD ./target/UserAuthentication-1.0.jar /usr/src/UserAuthentication-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8088/actuator/health || exit 1
EXPOSE 8088
WORKDIR usr/src
ENTRYPOINT ["java","-jar","UserAuthentication-1.0.jar"]

