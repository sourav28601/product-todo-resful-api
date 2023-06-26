const express = require('express');
const connectDB = require('./db/connectdb');
const web = require('./routes/web');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
var cors = require('cors')
app.use(cors())


app.use(express.json())
app.use(cookieParser())
// Middleware
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/products',web);  

// app.set('view engine','ejs'); // SET EJS TEMPLATE ENGINE
// app.use(express.static('public'))

connectDB();


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })




module.exports = app
