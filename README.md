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
    Маршрут:
        id – int
        is_ready – bool //посчитано ли время на маршрут
        time – int // время на маршрут в минутах
    Точки маршрута:
        id – int
        id_route – int //ид маршрута
    Граф точек маршрутов: (в файле data.csv данные для этой сущности)
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



 
# Eclipse
## route-service

При импорте основного проекта в Eclipse добавляем исключения:

`Properties` -> `Resource` -> `Resource Filters` -> нажать `Add Filter...`

В форме `[.] Exclude all`, `[.] Files and folders`, `[v] Add children (recursive)`

Блок `File And Folder Attributes` -> `[Project Relative Path]` `[matches]` `[route-service/node_modules]`

сохраняем -> `OK`

Это исключит валидацию не интересных нам веб-зависимостей.

