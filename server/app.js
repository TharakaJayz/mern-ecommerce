const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use("/auth",authRoutes)

app.use((error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message})
});


app.listen(8080, ()=>{
    console.log("server running on 8080");
})