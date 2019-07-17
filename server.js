const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


const Cars = require('./models/cars');

// Index
app.get('/cars', (req, res) => {
    res.render('index.ejs', {
        cars: Cars
    });
});

//Delete
app.delete('/cars/:index', (req, res) => {
    Cars.splice(req.params.index, 1);
    res.redirect('/cars');
})

//Edit
app.get('/cars/:index/edit', (req, res) => {
    res.render("edit.ejs", {
        car: Cars[req.params.index],
        index: req.params.index
    })
})

//Update
app.put('/cars/:index', (req, res) => {
    Cars[req.params.index] = req.body,
    res.redirect('/cars')
})

// New
app.get('/cars/new', (req, res) => {
    res.render('new.ejs')
});

//Post(create)
app.post('/cars', (req, res) => {
    console.log(req.body, "this is the new car")
    Cars.push(req.body)
    res.redirect('/cars')
});

// Show
app.get('/cars/:index', (req, res)=> {
    res.render('show.ejs', {
        cars: Cars[req.params.index]
    });
});









app.listen(3000, () => {
    console.log("the server is up") 
})