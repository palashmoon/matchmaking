FROM openjdk:10

ADD ./target/NlpPipeline-1.0.jar /usr/src/NlpPipeline-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8093/actuator/health || exit 1
EXPOSE 8093

WORKDIR usr/src
ENTRYPOINT ["java","-jar", "NlpPipeline-1.0.jar"]