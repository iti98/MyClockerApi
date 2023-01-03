module.exports = (server) => {
    const group = require("../controllers/userGroupController");
  
    // Create a new Group
    server.post("/", group.create);
  
    // Retrieve all group
    server.get("/group", group.findAll);
  
    // Retrieve a single group with id
    server.get("/groud/:id", group.findOne);
  
    // Update a group with id
    server.put("/groud/:id", group.update);
  
    // Delete a group with id
    server.delete("groud/:id", group.delete);
  
    // Delete all group
    server.delete("/", group.deleteAll);

  };