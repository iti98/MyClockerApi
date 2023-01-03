module.exports = (server) => {
    const groupController = require("../controllers/userGroupController");
  
    // Create a new Group
    server.post("/group", groupController.create);
  
    // Retrieve all group
    server.get("/groups", groupController.findAll);
  
    // Retrieve a single group with id
    server.get("/group/:id", groupController.findOne);
  
    // Update a group with id
    server.put("/group/:id", groupController.update);
  
    // Delete a group with id
    server.delete("/group/:id", groupController.deleteOne);
  
    // Delete all group
    // server.delete("/", groupController.deleteAll);

  };