// import modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import db connection
const connDBs = require('./src/config/conn');
connDBs();

// global middlewares
const app = express();
app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require('./src/routes/AuthRoutes');

// routes
app.use('/auth', authRoutes);

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});