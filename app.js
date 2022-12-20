const express= require("express");
const app= express();
const bodyParser = require("body-parser");

app.set('view engine', 'pug');
app.set('views','views'); 

const path= require('path');
const adminData = require('./routes/admin.js');
const broutes = require('./routes/shop.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'CSS')));

app.use('/fpage',adminData.routes);
app.use(broutes);



app.use((req,res,next) => {
    res.status(404).render('404.pug');
});

app.listen(3000);



 