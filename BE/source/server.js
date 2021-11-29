let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.use(express.json(), express.urlencoded({extended: true}));

const router = require('./models/router');
router(app);
app.listen(port);

console.log('RESTful API server started on: ' + port);