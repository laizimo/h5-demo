// const Koa = require('koa');
// const fs = require('fs');
// const route = require('koa-route');
// const path = require('path');
// const app = new Koa();

// const main = ctx => {
//     ctx.set('Access-Control-Allow-Origin','*');
//     ctx.response.type = 'json';
//     ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'mock.json'));
// };

// app.use(route.get('/', main));

// app.listen(3000);
const Express = require('express');
const fs = require('fs');
const path = require('path');

const app = new Express();

app.get('/', function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    fs.readFile(path.resolve(__dirname, 'mock.json'), function(err, data){
        res.json(JSON.parse(data));
    });
});

app.listen(5000);