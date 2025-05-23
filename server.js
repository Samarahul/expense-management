const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const path=require('path')

// Load environment variables
dotenv.config();

// Connect to database and handle connection events
connectDb()
  .then(() => {
    console.log('MongoDB connected successfully'.green.bold);
  })
  .catch((err) => {
    console.error('MongoDB connection error:'.red.bold, err);
    process.exit(1); // exit if DB connection fails
  });

// Initialize express app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));
 

// static file
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
// Fix port usage: prefer env PORT, fallback to 8080
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.bold);
});
