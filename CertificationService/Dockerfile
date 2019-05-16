FROM openjdk:10

ADD ./target/CertificationService-1.0.jar /usr/src/CertificationService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8085/actuator/health || exit 1
EXPOSE 8085
WORKDIR usr/src
ENTRYPOINT ["java","-jar","CertificationService-1.0.jar"]