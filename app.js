const express = require('express');
const bodyParser = require('body-parser');
let ejs = require('ejs');
const getDate = require('./date');
const app = express();
const date = require(__dirname+'/date.js');



let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get('/', function (req, res) {
    
    
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

    
    let day = date.getDate();
    res.render('index', { listTitle: day, newItems: items });
});

app.post('/',function(req,res){
    let item = req.body.newItem;
    if(req.body.list=== 'work'){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
    
    
})
app.listen(3000, function () {
    console.log('server is running in port 3000 ');
});

app.get('/work', function(req,res){
    
   res.render('index',{listTitle:'work list', newItems:workItems})
});

app.get('/about',function(req,res){
    res.render('about');
})

// app.post('/work',function(req,res){
//     // let work = req.body.newItem;
//     // workItems.push(work);
//     res.redirect('/work');
// })