const app = require('./app')
const dotenv = require('dotenv')
const { path } = require('./app')

dotenv.config({path:'.env'})


app.listen(process.env.PORT,() => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})


