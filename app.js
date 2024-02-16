const express = require('express');
const bodyParser = require('body-parser');
let ejs = require('ejs');
const getDate = require('./date');
const app = express();
const date = require(__dirname+'/date.js');
const mongoose = require('mongoose')




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

// 1. create a data base
mongoose.connect("mongodb+srv://asifrequest:123456789Asif@todolist.g310pbw.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout in milliseconds to attempt server selection
  socketTimeoutMS: 45000, // Timeout in milliseconds for socket connection
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(3000, function () {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// 2. create new schema

const itemsSchema = {
    name: String
}

// 3. create new model

const Item = mongoose.model('Item',
itemsSchema
);

// create same data

const item1 = new Item({
    name: 'item number 1 is here'
});




// array for data base

const defaultItems = [item1];

//insert to database
Item.insertMany(defaultItems);

app.get('/', function (req, res) {

    Item.find({})
    .then((foundItems) => {
        if(foundItems.length === 0){
            res.redirect('/')
        }else{
             
             res.render('index', { listTitle: 'Today', newItems: foundItems });
        }
    });

    
});





//save list item from form
app.post('/',function(req,res){
    let itemName = req.body.newItem;
    
    const item = new Item({
        name:itemName
    });

    item.save();
    res.redirect('/');
    
    
});

// delete from data base using checkbox
app.post('/delete',function(req,res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndDelete(checkedItemId)
    .then(deletedProduct => {
        if (!deletedProduct) {
            console.log('No product found with that ID');
        } else {
            console.log('Product deleted:', deletedProduct);
        }
    })
    .catch(err => {
        console.error('Error deleting product:', err);
    });
      
    res.redirect('/')
});

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