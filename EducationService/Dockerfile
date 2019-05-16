FROM openjdk:10

ADD ./target/EducationService-1.0.jar /usr/src/EducationService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8082/actuator/health || exit 1
EXPOSE 8082
WORKDIR usr/src
ENTRYPOINT ["java","-jar","EducationService-1.0.jar"]