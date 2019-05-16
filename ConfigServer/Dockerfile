FROM openjdk:10

ADD ./target/ConfigServer-1.0.jar /usr/src/ConfigServer-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8092/actuator/health || exit 1
EXPOSE 8092
WORKDIR usr/src
ENTRYPOINT ["java","-jar","ConfigServer-1.0.jar"]