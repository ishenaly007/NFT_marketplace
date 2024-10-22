# Используем базовый образ OpenJDK
FROM openjdk:17-jdk-slim

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем собранный .jar файл приложения в контейнер
COPY build/libs/backend-0.0.1-SNAPSHOT.jar /app/backend-0.0.1-SNAPSHOT.jar

# Устанавливаем команду для запуска приложения
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
