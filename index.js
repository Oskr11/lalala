const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Устанавливаем путь к папке с шаблонами EJS
app.set('views', __dirname);
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    // Устанавливаем конкретное время 9 марта до 10 утра UTC+5
    const targetDateUtc5 = new Date('2024-03-09T10:10:00+05:00');
    const currentTimeUtc5 = new Date();
    let timeRemaining = targetDateUtc5 - currentTimeUtc5;

    // Если текущее время больше или равно целевому времени, добавляем день
    if (currentTimeUtc5 >= targetDateUtc5) {
        timeRemaining = 0;
    }

    // Вычисляем дни, часы, минуты и секунды
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Отправляем шаблон с данными о времени
    res.render('index', { daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining });
});



const port = process.env.PORT || 3000; 

app.listen(port, function () {
    console.log(`Server started on ${port}`);
});
