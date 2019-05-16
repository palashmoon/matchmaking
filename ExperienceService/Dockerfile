FROM openjdk:10

ADD ./target/ExperienceService-1.0.jar  /usr/src/ExperienceService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8087/actuator/health || exit 1
EXPOSE 8087
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "ExperienceService-1.0.jar"]
