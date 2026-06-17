const express = require("express");
const dotenv = require("dotenv");
const noteRoute = require("./src/routes/note.route");
// const logger = require("./src/middleware/logger.js")

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
// app.use(logger());

//features
app.use("/api/note", noteRoute)

//server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;