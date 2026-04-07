const express = require('express');
const os = require('os');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME   = 'lab6';

let db;

// Connect to MongoDB, then start the server
MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log('--------------------------------------------------');
      console.log(`  CISC 886 Lab 6 — App started`);
      console.log(`  Port:  ${PORT}`);
      console.log(`  Mode:  ${process.env.MODE || 'local'}`);
      console.log(`  Node:  ${process.version}`);
      console.log(`  Host:  ${os.hostname()}`);
      console.log('--------------------------------------------------');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Route 1: basic info
app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 6',
    mode: process.env.MODE || 'local',
    node: process.version,
    host: os.hostname(),
  });
});

// Route 2: tasks grouped by status (fetched from MongoDB)
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.collection('tasks').find({}, { projection: { _id: 0 } }).toArray();

    const grouped = tasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
