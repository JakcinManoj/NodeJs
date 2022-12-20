const express = require('express')

const { ObjectId } = require('mongodb')

const { connectToDb, getDb } = require('./util/db')

const app= express()
app.use(express.json())

//db connection 
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000)
        db= getDb()
    }
})

//routes
//first page after localhost to  see all books
//get req to fetch all books
app.get('/books',(req,res) => {
    //pagination ?p=
    const page = req.query.p || 0
    const booksperPage = 4

    let books=[]

    db.collection('books')
      .find()
      .sort({ author: 1})
      .skip(page * booksperPage)
      .limit(booksperPage)// to get first 4 books since 0*4=>0
      .forEach(book => books.push(book))
      .then(() => {
        res.status(200).json(books)
      })
      .catch(() => {
        res.status(500).json({error: "Could not fetch the Docs"})
      })

//get req to fetch single book from all
app.get('/books/:id',(req,res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
          .findOne({_id: ObjectId(req.params.id)})
          .then(doc => {
            res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: "Something went wrong in id of fetching single book"})
    })
    }
    else {
        res.status(500).json({ error : "invalid Url"})
    }
    
})

})
//post req to add a single book
app.post('/books',(req,res) => {
    const book = req.body

    db.collection('books')
      .insertOne(book)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({error:"Errpr Inside post req.body"})
      })

})

//delete a single doc by id
app.delete('/books/:id',(req,res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
          .deleteOne({_id: ObjectId(req.params.id)})
          .then(doc => {
            res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: "Something went wrong in id of deleteOne"})
    })
    }
    else {
        res.status(500).json({ error : "invalid Url"})
    }
})


//update a book using id
app.patch('/books/:id',(req,res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
          .updateOne({_id: ObjectId(req.params.id)} , {$set: updates})
          .then(doc => {
            res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: "Something went wrong in id of deleteOne"})
    })
    }
    else {
        res.status(500).json({ error : "invalid Url"})
    }
})