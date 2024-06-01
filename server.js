const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3500

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// digital signature
app.use('/', require('./routes/degital-signature.route'));

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})