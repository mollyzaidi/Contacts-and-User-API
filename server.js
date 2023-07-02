const express = require("express");
const errorhandler = require("./routes/controllers/middleware/errorhandler");
const connectDB = require("./config/dbconnection");

const dotenv = require("dotenv").config()

connectDB()
const app = express();

const port=process.env.PORT || 5000;

app.use(express.json()); //this is a parser
app.use('/api/contacts',require("./routes/contacts_routes"));
app.use('/api/users',require("./routes/user_routes"));
app.use(errorhandler)

app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT : ${port}`);
});