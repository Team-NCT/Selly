FROM openjdk:11 AS build

COPY gradlew .

COPY gradle gradle

COPY build.gradle .

COPY settings.gradle .

COPY src src

RUN chmod +x gradlew

RUN ["./gradlew", "bootJar"]

FROM openjdk:11

COPY --from=build build/libs/*.jar app.jar

EXPOSE 8101

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "/app.jar"]