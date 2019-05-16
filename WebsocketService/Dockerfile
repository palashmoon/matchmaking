FROM openjdk:10

ADD ./target/WebsocketService-1.0.jar /usr/src/WebsocketService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8069/actuator/health || exit 1
EXPOSE 8069
WORKDIR usr/src
ENTRYPOINT ["java","-jar","WebsocketService-1.0.jar"]

