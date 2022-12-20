const express= require("express");
const app= express();
const bodyParser = require("body-parser");

const path= require('path');
const aroutes = require('./routes/admin.js');
const broutes = require('./routes/shop.js');


app.use(bodyParser.urlencoded({extended:false}));

app.use('/fpage',aroutes);
app.use(broutes);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);



 