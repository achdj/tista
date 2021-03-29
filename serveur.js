const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/tista'));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname+'/dist/tista/index.html'));
})

app.listen(process.env.PORT);

