const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001;
const apiRoute = require('./routes/index')

app.use(bodyParser.json())
app.use(cors())

app.use("/", apiRoute)


app.listen(port, () => console.log(`Server Started on port ${port}`))
