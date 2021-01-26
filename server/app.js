require("dotenv").config;
let express = require('express');
let app = express();
let sequelize = require('./db.js');

let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');
sequelize.sync();
app.use(require('./middleware/headers'));

app.use(express.json());
app.use('/log', log); 
app.use('/user', user);




app.listen(3001, function() {
    console.log("App is listening on port 3001");
});
