FROM openjdk:10

ADD ./target/QueryService-1.0.jar /usr/src/QueryService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8095/actuator/health || exit 1
EXPOSE 8095
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "QueryService-1.0.jar"]