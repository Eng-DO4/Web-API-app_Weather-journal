// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
// require body-parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* Setup Server */
const port = 8000;
// Spin up the server
app.listen(port, ()=>{
    console.log(`running server at http://localhost:${port}`); // Callback to debug
});

// Initialize all route with a callback function
app.get('/all', getData);
// Callback function to complete GET '/all'
function getData(req, res){
    res.send(projectData);
}

// Post Route
app.post('/addData', (req, res)=>{
    projectData = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content,
    };
    res.send(projectData);
});