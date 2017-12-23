'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const REST_PORT = (process.env.PORT || 8080);

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
    res.send("Get petition");
});

app.post('/webhook', (req, res) => {

    if(req.body.result.action === 'solve') {
        
        var result;
        
        var number1 = parseFloat(req.body.result.parameters.number);
        var number2 = parseFloat(req.body.result.parameters.number1);
        
        switch(req.body.result.metadata.intentName) {
            case 'plus':
                result = number1 + number2;
                break;
                
            case 'subtract':
                result = number1 - number2;
                break;
            
            case 'multiply':
                result = number1 * number2;
                break;
                
            case 'divide':
                result = number1 / number2;
                break;
        }
        
        return res.status(200).json({
            "speech": result,
            "displayText": result,
        });
    }
});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});

