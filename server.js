var path = require('path')
var express = require('express');
var dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
var app = express();
const users = require('./routes/Users')
const products = require('./routes/Products')
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Connectioin to Db Using mongoose
const Url = 'mongodb+srv://log:log1234@cluster0-gakn1.mongodb.net/loginDB'
mongoose.connect(Url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false, useCreateIndex: true
}, () => {
    console.log('connected')
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods',
            'PUT,PATCH,POST,DELETE,GET'
        )
        return res.status(200).json({});
    }
    next();

})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Router middlewares
app.use(users)
app.use(products)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})