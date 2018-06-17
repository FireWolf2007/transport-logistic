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

# Соглашение по запуску команд из консоли

Везде при описании старался придерживаться порядка запуска команд из корневой папки репозитория.

# Сервисы и репозитории

Сервисы решил формировать в одном репозитории, т.к. они связаны между собой.

Также вокруг сервисов получилась большая обвязка и объемное описание происходящего.

Результат выполнения задачи был практически сразу описан в файле. Получилась своего рода история о том как происходило решение задачи.

## Комментарии по ходу решения задачи


Используется jhipster ([JHipster github](https://github.com/jhipster/generator-jhipster)) для быстрой инициализации кода приложения.

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

заодно не забываем делать pull-request в основной репозиторий со всеми нашими изменениями ([Pull request](https://github.com/jhipster/generator-jhipster/pull/7797)).

### *JDL*
Для простоты идем в online JDL-Studio (можно поставить локально docker контейнер и использовать его для исключения утечек данных)

https://start.jhipster.tech/jdl-studio/

Формируем сущности и экспортируем в файл route-service/route-service.jh

После этого генерим сущности, сервисный слой приложения, миграции liquibase, REST контроллеры и тесты на них:

`cd route-service`

`yo jhipster:import-jdl route-service.jh`

На этапе генерации тоже будут конфликты, т.к. идет добавление данных в существующие файлы (миграции, меню веб-приложения, локализации в json)

На этом этапе начальная часть приложения готова.

## Eclipse
### route-service

При импорте основного проекта в Eclipse добавляем исключения:

`Properties` -> `Resource` -> `Resource Filters` -> нажать `Add Filter...`

В форме `[.] Exclude all`, `[.] Files and folders`, `[v] Add children (recursive)`

Блок `File And Folder Attributes` -> `[Project Relative Path]` `[matches]` `[route-service/node_modules]`

сохраняем -> `OK`

Это исключит валидацию не интересных нам веб-зависимостей. Аналогично надо поступить с каталогом bin.

## Про уязвимости

14/06/2018 вышел отчет о найденных уязвимостях в библиотеках

https://spring.io/blog/2018/06/14/spring-project-vulnerability-reports-published

Соответственно стоит перейти на Spring Boot 1.5.14 или 2.0.3, либо если не используется Spring Boot обновить зависимости Spring Framework на версии 4.3.18 и 5.0.7 соответственно.

Идем в gradle.properties и меняем
`spring_boot_version=1.5.13.RELEASE` -> `spring_boot_version=1.5.14.RELEASE`

Но кажется этот метод уже не работает, т.к. используется зависимость
[https://github.com/jhipster/jhipster-dependencies/blob/v0.1.12/pom.xml](https://github.com/jhipster/jhipster-dependencies/blob/v0.1.12/pom.xml)
где прописана версия 1.5.13.

Обновления пока не последовало, т.к. в проекте что-то поломалось при обновлении [тут идет обсуждение обновления](https://github.com/jhipster/generator-jhipster/issues/7783).

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

Можем открыть angular приложение (логин/пароль: admin/admin) и посмотреть, какие имеются REST API:

### REST API

REST API доступен по адресу http://127.0.0.1:8080/#/docs

Там можно посмотреть описания и подергать вызовы вручную.

## Liquibase

Для инициализации данных из файла `data.csv` мы воспользуемся миграциями liquibase.

### Готовим данные в `route-service/src/main/resources/config/liquibase`

В файле `master.xml` добавляем новый файл для миграции (в конец перед `</databaseChangeLog>`)

```
<include file="config/liquibase/changelog/InitialDataLoading.xml" relativeToChangelogFile="false"/>
```
и создаем `route-service/src/main/resources/config/liquibase/changelog/InitialDataLoading.xml`

Добавляем файлы данных в `route-service/src/main/resources/config/liquibase/initialdata`

### Перегенерация приложения в связи с рефакторингом полей БД

Мы выбрали не удачные имена для полей (`point_one`, `point_two`, а ровно как и `point_one`, `point_second` как в ТЗ) - соответственно делаем более корректные названия полей `point_first`, `point_second`.

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

Есть небольшая проблема - не отображается 0 в angular. Отложим пока это на потом, т.к. для нас это не критично - все работает и компилируется.

## Формируем необходимый REST API

Для удобства выберем отдельный префикс для запросов сделанных мной, а не генератором /api/ext/

Заодно будет проще выполнить настройку security на все эти точки входа.


* Добавить маршрут:

```
POST /api/ext/add-route
Вход: список точек маршрутов (List<Long> routePoints)
Выход: ResponseEntity<Integer>
```

* Получить список маршрутов (со списком точек маршрута)

```
GET /api/ext/get-routes
Вход: пусто или Pageable, в query параметры page, size, sort
Выход: ResponseEntity<Page<ExtRouteDTO>>
```

где ExtRouteDTO - RouteDTO с точками маршрута.

* Получить отдельный маршрут (с массивом точек маршрута).

```
GET /api/ext/get-route
Вход: Long routeId, в query параметр routeId
Выход: ResponseEntity<ExtRouteDTO>
```

где ExtRouteDTO - RouteDTO с точками маршрута.

На этом этапе нам нужен отдельный проект в Eclipse.

## Eclipse project route-service

Импортируем как gradle проект и исключаем лишние папки аналогично тому, что было описано выше в блоке про Eclipse.

## Исправление ошибки вывода ссылок на сущности с id=0

В данном случае проблема в формировании условия *ngIF="routePoint.routeId" при значении routePoint.routeId=0 рассматривается как false.

Самый простой и рабочий способ это выполнить строгое неравенство с пустой строкой.

Примерно такая же проблема была в дочернем проекте ng-jhipster ([Code review](https://github.com/jhipster/ng-jhipster/pull/68#pullrequestreview-121644461)), там вопрос решили с помощью нескольких сравнений (null, undefined и т.д.).

НЕ ЗАБЫТЬ СДЕЛАТЬ pull request.


## Комментарий по выборке в /api/ext/get-routes

ExtRouteRepository.findAll

Для быстроты работы выбран подход с EAGER loading, но это не очень хороший вариант, т.к. все выгребается в память и уже там делается пагинация!

Это проблема пагинации с left outer join, т.к. на каждую строку route мы получаем несколько строк и из них формируются сущности.

Если не подключать EntityGraph - то будет проблема n+1 запроса, что в целом при небольших страницах не будет сильно нагружать БД.

Вариант решения - это выполнить один отдельный запрос к RoutePoints с указанием всех id, что мы собрали в первом запросе без EAGER loading.

## Доступы на /api/ext

Донастраиваем доступы в `SecurityConfiguration` в методе `void configure(HttpSecurity http)` добавлением разрешения доступа к `/api/ext/**`:
`.antMatchers("/api/ext/**").permitAll()`

Перезапускаем приложение и проверяем с помощью curl:

```
curl -v -X GET 'http://127.0.0.1:8080/api/ext/get-routes'
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 127.0.0.1...
* Connected to 127.0.0.1 (127.0.0.1) port 8080 (#0)
> GET /api/ext/get-routes HTTP/1.1
> Host: 127.0.0.1:8080
> User-Agent: curl/7.47.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Expires: 0
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< X-XSS-Protection: 1; mode=block
< Pragma: no-cache
< Date: Sat, 16 Jun 2018 17:07:29 GMT
< Connection: keep-alive
< X-Content-Type-Options: nosniff
< Transfer-Encoding: chunked
< Content-Type: application/json;charset=UTF-8
< X-Application-Context: RouteService:swagger,dev:8080
< 
{
  "content" : [ {
    "id" : 0,
    "isReady" : null,
    "time" : null,
    "routePoints" : [ 0, 4, 5, 6, 7, 8, 9 ]
  }, {
    "id" : 951,
    "isReady" : null,
    "time" : null,
    "routePoints" : [ 1, 2, 3 ]
  }, {
    "id" : 1001,
    "isReady" : null,
    "time" : null,
    "routePoints" : [ 1051, 1052, 1053, 1054 ]
  } ],
  "last" : true,
  "totalElements" : 3,
  "totalPages" : 1,
  "first" : true,
  "numberOfElements" : 3,
  "sort" : null,
  "size" : 0,
  "number" : 0
* Connection #0 to host 127.0.0.1 left intact
}
```

## timing-service

Генерируется аналогично route-service.

Для возможности совместного использования с БД route-service делаем сущность RouteGraph идентичной по структуре с той, что получилась в route-service.

Проект настраиваю именно на совместное использование БД.

Для перенастройки на свою БД нужно исправить `application-prod.yml` (и/или `application-dev.yml`):

Поставить комментарий в настройке url содержащей RouteService и убрать его в настройке url с TimingService:

```
spring:
    datasource:
        type: com.zaxxer.hikari.HikariDataSource
        #url: jdbc:postgresql://localhost:5432/TimingService
        url: jdbc:postgresql://localhost:5432/RouteService
        #username: TimingService
        username: RouteService

```


## REST API

* Рассчитать время маршрута по точкам:

```
POST /api/ext/route-timing
Вход: список точек маршрутов (List<Integer> routePoints)
Выход: ResponseEntity<Long>
```

## route-service расчет времени машрута

На основании сервиса ExtTimingService из timing-service делаем аналогичные расчеты в route-service.

Дополняем ExtTimingService методом 

```
@Async
public void updateRoute(RouteDTO routeDTO, List<Long> routePoints);
```

который нам в фоне просчитает маршрут, обновит его и сделает доступным (isReady=true).

# Docker образ on hub.docker.com

Для упрощения проверки я собрал образы особой конфигурации:
1. Основное приложение будет работать используя dev профиль.
2. Angular приложение будет работать в prod профиле, чтобы не тормозить при первой загрузке на браузере.

Запускать так: `docker-compose -f docker/route-and-timing-service.yml up`

Этот кофиг стянет образы приложений, БД и запустит их, при этом не будет никаких конфликтов с существующими сервисами PostgreSQL.

Первым запустится route-service, вторым timing-service, установлена разница между запуском 20 секунд.

Для остановки использовать Ctrl+C.

## route-service

Порт REST API - 8080.

## timing-service

Порт REST API - 8081.

# Дальнейшее развитие сервисов, проблемы

## route-service

В нашем API мы имеем плохую возможность затереть точки существующего маршрута на вновь добавляемые.

Я бы переделал немного модель таким образом:

* ввел сущность точка:

```
CommonPoint {
    id
}
```

* точки маршрута связал с CommonPont и добавил order:

```
RoutePoint {
    id Long,
    id_route Long (external ref),
    id_common_point (external ref),
    order Long (not null)
}
```

Order даст гарантированную фиксацию порядка обхода маршрута, т.к. при сохранении в БД он может быть потерян (примера причины нет, но интуиция подсказывает если что-то может пойти не так - оно обязательно пойдет не так).

* граф точек маршрута связал с точками, разорвав связь с маршрутом (соответственно надо переименовать сущность):

```
CommonPointGraph {
    id_first_common_point (external ref),
    id_second_common_point (external ref),
    time Integer
}
```

## timing-service

Моя реализация не подразумевает сохранения данных, соответственно timig-service постоянно будет дергать данные о точках из БД в большом количестве.

Подтянув ту же модель из route-service мы можем получить кэширование посредством поиска предложенного точками маршрута в БД и возврата рассчитанного результата при определении маршрута.

Тут на помощь может прийти сохранение некоторой статистической информации, например,  количество точек в маршруте, чтобы отсечь явно не удовлетворяющие маршруты.
