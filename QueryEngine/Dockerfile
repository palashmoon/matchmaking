FROM openjdk:10

ADD ./target/QueryEngine-1.0.jar /usr/src/QueryEngine-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:7001/actuator/health || exit 1
EXPOSE 7001
WORKDIR usr/src
ENTRYPOINT ["java","-jar","QueryEngine-1.0.jar"]
