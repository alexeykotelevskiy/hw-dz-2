Клонируем репозиторий

Скомпилируем:
```bash
mvn clean
mvn install
```

В командной строке в корне выполняем:

```bash
    npm install
    gulp sass
    webpack
```
Зпускаем
```bash
    mvn exec:java -Dexec.mainClass="ru.polis.ApplicationLauncher"

```

Приложение доступно в браузере по адресу http://localhost:5555

Основная страница - форма добавления. 
Валидируемые поля - name (должно состоять из букв, пробела или знака -, длина не более 30) и e-mail

Чтобы увидеть список добавленных записей, нужно нажать на ссылку "Список" слева вверху главной страницы.

В списке находятся все добавленные записи, их можно удалять и изменять