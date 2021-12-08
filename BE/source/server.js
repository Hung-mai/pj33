let express = require('express');
let session = require('express-session');

let app = express();
let port = process.env.PORT || 3000;

app.use(express.json(), express.urlencoded({ extended: true }), session({
    key: 'cookey',
    secret: 'this_is_not_a_secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 8640000
    }
}));

const router = require('./models/router');
router(app);
app.listen(port);

console.log('RESTful API server started on: ' + port);
