FROM openjdk:10

ADD ./target/RegistrationService-1.0.jar /usr/src/RegistrationService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8086/actuator/health || exit 1
EXPOSE 8086
WORKDIR usr/src
ENTRYPOINT ["java","-jar","RegistrationService-1.0.jar"]