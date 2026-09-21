# Rioni ЛК Брокера — Frontend

Фронтенд личного кабинета брокера. Сервис собирается и разворачивается через Docker.

## Стек

- Vue 3 + TypeScript + Vite
- Vuetify 3, Tailwind CSS
- Pinia (состояние), vue-i18n (локализация: ru/en/ge)
- Chart.js, ApexCharts, lightweight-charts (графики)
- Nginx (продакшн-раздача статики)
- Пакетный менеджер: yarn 1.22

## Требования

- Node.js (для локальной разработки)
- Docker + Docker Compose (для деплоя)
- Внешняя docker-сеть `dev` (используется в docker-compose.yaml)

## Локальная разработка

```bash
yarn install
yarn dev
```

Приложение поднимется на порту 5173, запросы `/api` проксируются на `http://localhost:8081` (см. `vite.config.ts`).

Сборка без Docker:

```bash
yarn build
```

## Запуск/развёртывание через Docker

Команды из корня проекта (см. `Makefile`):

```bash
make build-prod   # сборка образа (docker compose build)
make up-prod      # запуск контейнера (docker compose up)
```

Внешний порт контейнера — `8080:80` (nginx). Контейнер подключается к существующей docker-сети `dev`.

## Переменные окружения

| Файл                 | Назначение                                       |
|----------------------|--------------------------------------------------|
| `.env`               | Локальные значения по умолчанию (development)   |
| `.env.development`   | VITE_API_BASE_URL / VITE_API_HOST для dev       |
| `.env.production`    | VITE_API_BASE_URL / VITE_API_HOST для продакшена|

Используемые переменные:

- `VITE_API_BASE_URL` — базовый URL API (путь `/api` подставляется в конфиге сборки)
- `VITE_API_HOST` — хост API (проксируется в `vite.config.ts`)
- `VITE_SENTRY_KEY` — ключ Sentry (опционально)

Файл `.env` в `.gitignore` — закоммичены только шаблоны `.env.development` / `.env.production`.

## Доступ и авторизация (basic auth)

Nginx защищает сайт basic auth. Пароли хранятся в файле `.htpasswd` в корне проекта, который копируется в образ при сборке.

Команда на добавление или смену пароля:

```bash
htpasswd -c ./.htpasswd user87
```

Внимание: не коммитьте реальные пароли в репозиторий.

## Структура проекта

```
src/
├── api/         # сервисы работы с API (auth, account, portfolio, orders...)
├── components/  # переиспользуемые компоненты
├── modules/     # функциональные модули (market, portfolio, profile, reports...)
├── views/       # страницы и layout
├── stores/      # Pinia-состояния
├── router/      # маршрутизация
├── langs/       # локализация (ru/en/ge)
├── interfaces/  # типы и интерфейсы
├── utils/       # утилиты
└── styles/      # глобальные стили (scss)
```