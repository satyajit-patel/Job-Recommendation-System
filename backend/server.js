const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/data', resumeRoutes);

// check
app.get('/ping', (req, res) => {
  res.json({message: "pong"});
});
app.use('/', (req, res) => {
  res.send("up");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Running a port ${PORT}`);
});

module.exports = app;