# Фронтенд проекта «Stellar Burgers»

## Описание

Десктоп веб-приложение для сборки и заказа космических бургеров.
Оформление заказа осуществляется перетаскиванием ингредиентов в конструктор.
Пользователь может расположить ингредиенты в соответствии со своими предпочтениями.
Оформление заказа доступно только авторизованным пользователям.
Для новых пользователей предусмотрена регистрация, которая подтверждается по email.
В приложении реализована лента готовности заказов и профиль пользователя.

Приложение доступно на [GitHub Pages](https://niksmo.github.io/stellar-burgers-frontend/)

### Планируемые доработки

- Подсказка о необходимости перетащить ингредиент в конструктор бургера
- Визуализация дроп сектора конструктора

### Технологии

[![React][React-badge]][React-url]
[![Redux][Redux-badge]][Redux-url]
[![React-Router][React-Router-badge]][React-Router-url]

## Установка и запуск в режиме разработки

У вас должнен быть установлен NodeJS v18.15

1. Клонировать репозиторий

   ```shell
   git clone git@github.com:niksmo/stellar-burgers-frontend.git
   cd stellar-burgers-frontend
   ```

2. Установить зависимости

   ```shell
   npm i
   ```

3. Запустить скрипт

   ```shell
   npm run start
   ```

4. Браузер автоматически откроет новую вкладку с адресом локального сервера http://localhost:3000/

## Сборка для деплоя

1.  В файле `src/index.tsx` удалить проп `basename="/stellar-burgers-frontend"` компонента `Router`

2.  В файле `package.json` удалить свойство `"homepage"`

3.  Запустить скрипт

    ```shell
    npm run build
    ```

4.  Бандл для переноса на сервер будет собран в папке `build`

<!-- MARKDOWN LINKS & BADGES -->

[React-url]: https://react.dev/
[React-badge]: https://img.shields.io/badge/React-23272f?style=for-the-badge&logo=react
[Redux-url]: https://redux.js.org/
[Redux-badge]: https://img.shields.io/badge/Redux-23272f?style=for-the-badge&logo=redux&logoColor=764abc
[React-Router-url]: https://reactrouter.com/en/main
[React-Router-badge]: https://img.shields.io/badge/React%20Router-23272f?style=for-the-badge&logo=reactrouter
