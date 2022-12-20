const express= require('express');
const router = express.Router();

const path = require('path');

const rootDir = require('../helper/path'); 
const adminData= require('./admin.js');

router.get('/',(req,res,next) => { 
    
    res.render('Home.pug');
});


router.get('/shop.pug',(req,res,next) => { 
    const arr=adminData.arr
    res.render('shop.pug',{a: arr,DocTitle:"Shop Page",path:'/'});
});


module.exports=router;