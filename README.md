# transport-logistic

## Задача

```
Первый сервис(серв1 - route-service) должен предоставить api следующего функционала:
    1. Добавить маршрут;
        На вход мы передаем массив ид точек маршрута, на выход возвращаем ид маршрута. При добавлении маршрута нужно подсчитать время, которое на него потратится.
    2. Список маршрутов ( с массивом точек маршрута).
    3. Отдельный маршрут ( с массивом точек маршрута).
Второй сервис(Серв2 - timing-service) по точкам из маршрута возвращает время, которое нужно затратить на этот маршрут(-1 если не достижимо).

Функциональные требования:
1. Предусмотреть, что каждый сервис может использовать свою базу данных.
2. Формат api – JSON
3. Серв1 могут использовать все, Серв2 только другие сервисы (организовать доступ по ролям).

Сущности:
    Маршрут (Route):
        id – int
        is_ready – bool //посчитано ли время на маршрут
        time – int // время на маршрут в минутах
    Точки маршрута (RoutePoint):
        id – int
        id_route – int //ид маршрута
    Граф точек маршрутов (RouteGraph): (в файле data.csv данные для этой сущности)
        id_point_one – int // ид первой точки
        id_point_second -  int //ид второй точки
        time – int // время на преодоления расстояния между двумя точками
```

## Комментарии по ходу решения задачи


Используется jhipster (https://github.com/jhipster/generator-jhipster) для быстрой инициализации кода приложения.

**Предварительно надо поставить nodejs, npm, yo, yarn, generator-jhipster.**

## route-service

### *generator-jhipster*

`mkdir route-service`

`cd route-service`

`yo jhipster`

Т.к. локально может быть старая версия (в моем случае была 4.14.3) правим 2 файла:
1. `packaje.json` секция devDependencies

`"generator-jhipster": "4.14.3"` -> `"generator-jhipster": "4.14.4"`

2. `.yo-rc.json`

`"jhipsterVersion": "4.14.3"` -> `"jhipsterVersion": "4.14.4"`

и перезапускаем генерацию заново:

`yo jhsipter`

Получаем небольшие конфликты из-за изменения версий и частично изменившегося кода - соглашаемся на все "a" - all.

И при компиляции файлов angular получаем конфликт переменных.

Тут все просто идем в node_modules/generator-jhipster и правим `route: ActivatedRoute` -> `activatedRoute: ActivatedRoute` и соответственно по коду `this.route` -> `this.activatedRoute`

заодно не забываем делать pull-request в основной репозиторий со всеми нашими изменениями (https://github.com/jhipster/generator-jhipster/pull/7797).

### *JDL*
Для простоты идем в online JDL-Studio (можно поставить локально docker контейнер и использовать его для исключения утечек данных)

https://start.jhipster.tech/jdl-studio/

Формируем сущности и экспортируем в файл route-service/route-service.jh

После этого генерим сущности, сервисный слой приложения, миграции liquibase, REST контроллеры и тесты на них:

`cd route-service`

`yo jhipster:import-jdl route-service.jh`

На этапе генерации тоже будут конфликты, т.к. идет добавление данных в существующие файлы (миграции, меню веб-приложения, локализации в json)

На этом этапе начальная часть приложения готова.

## База данных

**Предварительно надо поставить docker, docker-compose.**

При генерации приложения была выбрана БД PostgreSQL.

Соответственно, если имеется локальная БД её требуется либо остановить, либо настроить.

1. Для настройки: пользователь RouteService, пароль пустой, название БД RouteService

2. Либо можно поступить проще приостановить локальный сервис и запустить БД в docker с использованием docker-compose:

`cd route-service`

`docker-compose -f src/main/docker/postgresql.yml up` либо в фоновом режиме: `docker-compose -f src/main/docker/postgresql.yml up -d`

Если требуется, чтобы БД в docker работала всегда (в т.ч. и после перезапуска) в yml-конфиг нужно добавить `restart: always`

Я выбрал для себя вариант с остановкой лолкальной БД и запуском приложения в docker по необходимости.

## Первый запуск приложения

**Предварительно убедиться, что порт 8080 свободен**

Для сборки и запуска приложения выполняем `gradle`

Приложение запустится в dev профиле, соответственно создаст таблички и затянет все данные (если они есть) миграциями с помощью liquibase.

После того как мы увидим следующее:

```
2018-06-16 10:11:01.955  INFO 23170 --- [  restartedMain] r.wolfa.transport.route.RouteServiceApp  :
----------------------------------------------------------
        Application 'RouteService' is running! Access URLs:
        Local:          http://localhost:8080
        External:       http://127.0.1.1:8080
        Profile(s):     [swagger, dev]
----------------------------------------------------------
```

Сервер запущен и готов к работе.

Можем открыть angular приложение и посмотреть, какие имеются REST API:

### REST API

REST API доступен по адресу http://127.0.0.1:8080/#/docs

Там можно посмотреть описания и подергать вызовы варучную.

## Liquibase

Для инициализации данных из файла `data.csv` мы воспользуемся миграциями liquibase.

### Готовим данные в `route-service/src/main/resources/config/liquibase`

В файле `master.xml` добавляем новый файл для миграции (в конец перед `</databaseChangeLog>`)

```
<include file="config/liquibase/changelog/InitialDataLoading.xml" relativeToChangelogFile="false"/>
```
и создаем `route-service/src/main/resources/config/liquibase/changelog/InitialDataLoading.xml`

Добаляем файлы данных в `route-service/src/main/resources/config/liquibase/initialdata`

### Перегенерация приложения в связи с рефакторингом полей БД

Мы выбрали не удачные имена для полей (point_one, point_two, а ровно как и point_one, point_second как в ТЗ) - соответственно делаем более корректные названия полей point_first, point_second.

Останавливаем наш процесс `gradle` и продолжаем.

Меняем `route-service.jh` и перегенерируем сущности

`cd route-service`

`yo jhipster:import-jdl route-service.jh`

Также нам надо пересоздать БД для этого останавливаем на docker с БД, удаляем его:

Получаем id существующего docker контейнера: `docker ps -a | grep docker_routeservice-postgresql | awk '{print $1}'`

в моем случае это `6ad333cc272d`

и удаляем его: `docker rm 6ad333cc272d`

если не удаляется контейнер (есть ошибки), то скорее всего он запущен и его надо остановить: `docker stop 6ad333cc272d`

или все одной командой: `docker rm &#96;docker ps -a | grep docker_routeservice-postgresql | awk '{print $1}'&#96;`

и запускаем заново БД: `cd route-service && docker-compose -f src/main/docker/postgresql.yml up`

Запускаем приложение: `gradle`

Есть небольшая проблема - не отобажается 0 в angular. Отложим пока это на потом, т.к. для нас это не критично - все работает и компилируется.


# Eclipse
## route-service

При импорте основного проекта в Eclipse добавляем исключения:

`Properties` -> `Resource` -> `Resource Filters` -> нажать `Add Filter...`

В форме `[.] Exclude all`, `[.] Files and folders`, `[v] Add children (recursive)`

Блок `File And Folder Attributes` -> `[Project Relative Path]` `[matches]` `[route-service/node_modules]`

сохраняем -> `OK`

Это исключит валидацию не интересных нам веб-зависимостей.

# Про уязвимости

14/06/2018 вышел отчет о найденных уязвимостях в библиотеках

https://spring.io/blog/2018/06/14/spring-project-vulnerability-reports-published

Соответственно стоит перейти на Spring Boot 1.5.14 или 2.0.3, либо если не используется Spring Boot обновить зависимости Spring Framework на версии 4.3.18 и 5.0.7 соответственно.

Идем в gradle.properties и меняем
`spring_boot_version=1.5.13.RELEASE` -> `spring_boot_version=1.5.14.RELEASE`