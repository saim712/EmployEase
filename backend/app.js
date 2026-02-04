const cors = require('cors');
require('dotenv').config()
const express = require('express');
const authRouter = require('./routes/auth.route');
const taskRouter = require('./routes/task.route');
const app = express();


// seting middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow frontend requests
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// setting the routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

module.exports = app;