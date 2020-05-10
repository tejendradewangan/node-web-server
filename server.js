const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'html');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var logger = `${now}: ${req.method} ${req.url}`;
    console.log(logger);
    fs.appendFile('server.log', logger + '\n', (error) => {
        if (error) {
            console.log('Error : Log not inserted in server.log file');
        }
    });
    next();
});



app.use('/client',(req, res, next) => {
    var now = new Date().toString();
    var logger = `${now}: ${req.method} ${req.url}`;
    console.log(logger);
    fs.appendFile('client.log', logger + '\n', (error) => {
        if (error) {
            console.log('Error : Log not inserted in server.log file');
        }
    });
    next();
});

// app.use((req,res,next) =>{
// 	res.send('We are in maintance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.render('home.hbs', {
        welcomeMsg: "Welcome",
        pageTitle: "Home Page",
        pageBody: "This is osom page"
        // currentYear: new Date().getFullYear()
    });
});


app.get('/project', (req, res) => {
    res.render('project.hbs', {
        welcomeMsg: "Welcome",
        pageTitle: "Project Page",
        pageBody: "Find the project list below"
    });
});


app.get('/about', (req, res) => {
    /*res.send({
    		name :'jarivs',
    		likes:'games'
    });*/
    res.render('about.hbs', {
        pageTitle: "About Page",
        aboutBody: "About page body"
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        "Error": "Page not found",
        "Status Code": "400"
    });
});




app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});