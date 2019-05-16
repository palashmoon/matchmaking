FROM openjdk:10

ADD ./target/LocationService-1.0.jar /usr/src/LocationService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8084/actuator/health || exit 1
EXPOSE 8084

WORKDIR usr/src
ENTRYPOINT ["java","-jar", "LocationService-1.0.jar"]