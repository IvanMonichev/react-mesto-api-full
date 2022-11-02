#  Проект «Место»

### ⚙️ Технологии
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

___

### 📄 Описание
**Сайт «Место»** – это проект, который был разработан в рамках изучения
онлайн-курса [Яндекс.Практикум](https://practicum.yandex.ru/) на освоение профессии «Веб-разработчик».

**Цель проекта** – закрепленние изученных знаний по вёрстке, программированию и развёртыванию.

Структура проекта разделена на 2 части: *фронтенд* и *бэекенд*. Взаимосвязь выстроена по архитектуре REST.

Веб-приложение является агрегатором фотографий, которые зарегисрированные пользователи могут загрузить в общую коллекцию.

___

### 💻 Функциональность:
- регистрация;
- авторизация;
- редактирование профиля (аватар, имя, почта);
- загрузка фотографий;
- удаление фотографий;
- открытие фотографии в модальном окне;
- установка лайков.

___
### 📌 Планы по доработке
- настроить фронтенд валидацию;
- добавить функционал по восстановлению пароля.

___

### 💡 Запуск проекта:
1. Для запуска проекта потребуется установленная база данных [MongoDB](https://mongodb.prakticum-team.ru/try/download/community?jmp=docs).
2. Запустите базу данных. Веб-сервер подключается к базе данных по адресу — `mongodb://localhost:27017/`.
3. Установите бэкенд зависимости и запустите сервер — `cd backend && npm install && npm run dev`.
4. Установите фронтенд зависимости и запустите React приложение — `cd ../frontend && npm install && npm start`.