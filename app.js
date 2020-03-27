const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/route');
const port = 5501;
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Welcome to Mirrorly');
    res.end();
});
app.use('/api', indexRouter);
app.listen(port, () => {});
console.log(`Example app listening on port ${port}!`)