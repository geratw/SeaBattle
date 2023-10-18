# SeaBattle

Это игра Морской бой.
Всего в приложении 5 страниц :

- Страница авторизации (localhost:3000/signIn)

- Страница регистрации (localhost:3000/signUp)

- На главной странице (localhost:3000/) расположены игровые поля игроков (вас и PC) а также кнопка начала игры. После нажатия на кнопку начинается расстановка кораблей

- Рейтинг лучших игроков (localhost:3000/bestPlayers). На данной странице отображаются только те игроки, кто сыграл более 10 раз

- Страница с вашей статистикой (localhost:3000/myStats)

После нажатия на кнопку начинается расстановка кораблей.
Механизм расстановки таков: под полем расположена секция с перечислением кораблей, после клика на любой корабль он подсвечивается в секции, вы кликаете первый раз на клетку игрового поля (это начальная координата корабля), после надо кликнуть на последнюю координату корабля. Запускается функция проверки, если все указано корректно, то корабль 'устанавливается' на поле. После расстановки всех кораблей автоматически начинается бой (макет страницы после старта игры). Корабли противника расстанавливаются автоматически (рандомно). Далее начинается знакомый всем процесс игры — игроки поочередно делают ход и выбирают клетку противника куда делается выстрел. Если игрок попал в корабль, то это отображается на интерфейсе и право хода остается за попавшим игроком. После уничтожения всех кораблей одной из сторон игра заканчивается.

Правила для расстановки кораблей:

1. Между кораблями должна быть минимум одна клетка.
2. Корабли могут располагаться только горизонтально или вертикально.

Важно! Если вы закрыли приложение пока игра не закончена, то игра автоматически считается проигранной.
Модели для БД остаются на ваше усмотрение.
В макетах указаны схематичные расположения блоков разметки, в данном проекте вы можете проявить фантазию и попробовать реализовать свой стиль!
Вы можете использовать Canvas для того, чтобы рисовать игровые поля. Тут можно почитать подробнее.
Мы можете использовать любые дополнительные библиотеки для работы с игровыми полями и логикой игры.
Вы можете использовать любые css-бибилиотеки (MUI, AntDesign, Bootstrap etc).
