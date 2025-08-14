require('dotenv').config();
const express = require('express');
const { router } = require('./routes/route');
const { connectToDb } = require('./db/db');
const { requestLogger, responseLogger } = require('./middlewares/logger');
const app = express();
const PORT = process.env.PORT;

connectToDb()

app.use(express.json());
app.use(requestLogger)
app.use(responseLogger)
app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})