const express = require('express');
const bodyParser = require('body-parser');
let ejs = require('ejs');
const app = express();

var items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', function (req, res) {
    var today = new Date();
    var day = '';
    var currentDay = today.getDay();
    
    // old code:
    // switch (currentDay) {
    //     case 0:
    //         day = 'Sunday';
    //         break;

    //     case 1:
    //         day = 'Monday';
    //         break;

    //     case 2:
    //         day = 'tuesday';
    //         break;


    //     case 3:
    //         day = 'Wednesday';
    //         break;

    //     case 4:
    //         day = 'Thursday';
    //         break;

    //     case 5:
    //         day = 'Friday';
    //         break;

    //     default:
    //         day: 'Saturday'
    //         break;
    // }
    // updated and better code down here:

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    
    var day = today.toLocaleDateString('en-US', options);

    res.render('index', { kindofDay: day, newItems: items });
});

app.post('/',function(req,res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect('/')
})
app.listen(3000, function () {
    console.log('server is running in port 3000 ');
});