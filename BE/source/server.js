let express = require('express');
let session = require('express-session');
let cors = require('cors');

let app = express();
let port = process.env.PORT || 3000;

app
.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
})) // Using cors allow all request from browser
.use(express.json(), express.urlencoded({ extended: true }), session({
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

console.log('API server started on: ' + port);
