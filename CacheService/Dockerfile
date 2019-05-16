FROM openjdk:10

ADD ./target/CacheService-1.0.jar /usr/src/CacheService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8008/actuator/health || exit 1
EXPOSE 8008
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "CacheService-1.0.jar"]