const express = require('express');
const bodyParser = require('body-parser');
let ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    var today = new Date();
    var day = '';
    var currentDay = today.getDay();

    switch (currentDay) {
        case 0:
            day = 'Sunday';
            break;

        case 1:
            day = 'Monday';
            break;

        case 2:
            day = 'tuesday';
            break;


        case 3:
            day = 'Wednesday';
            break;

        case 4:
            day = 'Thursday';
            break;

        case 5:
            day = 'Friday';
            break;

        default:
            day: 'Saturday'
            break;
    }

    res.render('index', { kindofDay: day });
});

app.listen(3000, function () {
    console.log('server is running in port 3000 ');
});