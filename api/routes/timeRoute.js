module.exports = (server) => {
  const timeController = require('../controllers/timeController')

  // All times
  server.get("/times", timeController.findAll);

  // A single time with id
  server.get("/time/:id", timeController.findOne);

  // Create a new time
  server.post("/time", timeController.create);

  // Update a time with id
  server.put("/time/:id", timeController.update);

  // Delete a time with id
  server.delete("/time/:id", timeController.deleteOne);

};