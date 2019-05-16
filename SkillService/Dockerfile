FROM openjdk:10-jre
ADD ./target/SkillService-1.0.jar /usr/app/SkillService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8085/actuator/health || exit 1
EXPOSE 8081

WORKDIR usr/app

ENTRYPOINT ["java","-jar", "SkillService-1.0.jar"]