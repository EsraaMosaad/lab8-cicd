// init-mongo.js
// Runs automatically when the MongoDB container starts for the first time.
// Creates the 'lab6' database, the 'tasks' collection, and seeds sample data.

db = db.getSiblingDB('lab6');

db.createCollection('tasks');

db.tasks.insertMany([
  { id: 1, name: 'Milk',         status: 'done'    },
  { id: 2, name: 'Eggs',         status: 'done'    },
  { id: 3, name: 'Bread',        status: 'pending' },
  { id: 4, name: 'Butter',       status: 'pending' },
  { id: 5, name: 'Orange juice', status: 'pending' },
  { id: 6, name: 'Tea', status: 'pending' },
]);

print('Database initialised and seeded successfully.');
