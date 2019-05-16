FROM openjdk:10

ADD ./target/UpstreamService-1.0.jar /usr/src/UpstreamService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:9191/actuator/health || exit 1
EXPOSE 9191
WORKDIR usr/src
ENTRYPOINT ["java","-jar","UpstreamService-1.0.jar"]