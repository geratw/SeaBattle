![Alt text](imgForReadme/example.png)

1. ***GET "/api/register"*** — клиент регистрируется.<br>

   Пример запроса

    `{
    "username": "maks",
    "password": "fda135"
    }`

    вернет 

![Alt text](imgForReadme/sign.png)


2. ***GET "/api/signIn"*** — вход в систему.<br>

   Пример запроса

    `{
    "username": "maks",
    "password": "fda135"
    }`

    ![Alt text](imgForReadme/login.png)

3. ***GET "/api/bestPlayers"*** — получить массив объектов игроков, у которых число игр больше 10.<br>

    ![Alt text](imgForReadme/bestplay.png)

4. ***POST "/api/"*** — добавление игры.<br>

   Пример запроса

    `{
    "user_id": 1,
    "isWin": true
    }`

    ![Alt text](imgForReadme/newgame.png)

5.  ***GET "/api/myStats/:user_id"*** — получение данных о пользователе.<br>

    ![Alt text](imgForReadme/mystat.png)