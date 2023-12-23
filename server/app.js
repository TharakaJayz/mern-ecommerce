const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use("/auth",authRoutes)


app.listen(8080, ()=>{
    console.log("server running on 8080");
})