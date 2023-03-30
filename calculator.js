// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
app.use(express.json());

// server configuration
const PORT = 3000;

// import winston for logging
const winston = require('winston');

// create logger
const logger = winston.createLogger({ 
    level: 'info', 
    format: winston.format.json(), 
    defaultMeta: { service: 'calculator-microservice' }, 
    transports: [ new winston.transports.Console({ format: winston.format.simple(), }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }), ], });


// insert endpoint - addition
app.post('/addition', (req, res) => {
  // setup operation variable
  const operation = "Addition"
  // first input
  const num1 = Number(req.body.num1);

  // second input
  const num2 = Number(req.body.num2);

  // log operation
  logger.log({ level: 'info', message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`, });

  // check error in inputs - general check if inputs are not numeric
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  // perform basic arithmetic operation
  const result = num1 + num2;
  
  // return results
  res.json({ result });

  
});

// insert endpoint - subtraction
app.post('/subtraction', (req, res) => {
  // setup operation variable
  const operation = "Subtraction"
  
  // first input
  const num1 = Number(req.body.num1);
  
  // second input
  const num2 = Number(req.body.num2);
  
  // log operation
  logger.log({ level: 'info', message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`, });

  // check error in inputs - general check if inputs are not numeric
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  
  // perform basic arithmetic operation
  const result = num1 - num2;
  
  // return results
  res.json({ result });
});

// insert endpoint - multiplication
app.post('/multiplication', (req, res) => {
  // setup operation variable
  const operation = "Multliplication"
  
  // first input
  const num1 = Number(req.body.num1);
  
  // second input
  const num2 = Number(req.body.num2);
  
  // log operation
  logger.log({ level: 'info', message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`, });

  // check error in inputs - general check if inputs are not numeric
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  
  // perform basic arithmetic operation
  const result = num1 * num2;
  
  // return results
  res.json({ result });
});

// insert endpoint - division
app.post('/division', (req, res) => {
  // setup operation variable
  const operation = "Division"
  
  // first input
  const num1 = Number(req.body.num1);
  
  // second input
  const num2 = Number(req.body.num2);
 
  // log operation
  logger.log({ level: 'info', message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`, });

  // check error in inputs - general check if inputs are not numeric
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  if (num2 === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }
  
  // perform basic arithmetic operation
  const result = num1 / num2;
  
  // return results
  res.json({ result });
});


// create a route for the app
app.get('/', function (req, res) {
    res.send('This is a Calculator microservice \n \
                <br>On this microservice, there are four endpoints:</br> \n \
                    <li>POST /addition</li> \n \
                    <li>POST /subtraction</li> \n\
                    <li>POST /multiplication</li> \n\
                    <li>POST /division</li> \n \
                        <br>Each endpoint should take two input parameters: num1 and num2 </br>\n \
            ');
  });

  
// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Calculator microservice listening at: http://localhost:${PORT}/`);
  });

