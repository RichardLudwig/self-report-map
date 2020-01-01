const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/v1/reports', require('./routes/reports'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});