const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const route = express.Router();

app.use(express.static('./'));

route.get('/api/person', function(req, res, next){
  fs.readFile(path.resolve(__dirname, 'data.json'),'utf-8', function(err, data){
    res.json(data);
  });
});

app.use(route);

app.listen(3111);