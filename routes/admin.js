const express= require('express');
const router = express.Router();

const arr=[]

const path = require('path');

const rootDir = require('../helper/path');

router.get('/add-product',(req,res,next) => {

    res.render('add-product.pug',{pgTitle:"Add Product", path:'/fpage/add-product'});
});

router.post('/add-product',(req,res,next) => {
    arr.push({title: req.body.title});
    res.redirect('/');
});

exports.routes=router;
exports.arr=arr;