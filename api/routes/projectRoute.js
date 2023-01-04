module.exports = (server) => {
  const projectController = require("../controllers/projectController");

  // All project
  server.get("/projects", projectController.findAll());

  // A single project with id
  server.get("/project/:id", projectController.findOne());

  // Create a new project
  server.post("/project", projectController.create());

  // Update a project with id
  server.put("/project/:id", projectController.update());

  // Delete a project with id
  server.delete("/project/:id", projectController.deleteOne());

};