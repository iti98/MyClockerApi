const jwt = require("jsonwebtoken");
const Group = require('../models/userGroupModel')


//Création et enregistrement un nouveau group
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //Create a Group
  const groupe = new Group({
    name: req.body.name,
    user_group: [
      req.body.currentUser
    ],
    created_by: req.body.currentUser
  });

  // Save Group in the database
  groupe
    .save(groupe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Group."
      });
    });
};

//Récupère tous les groups/ recherche dans la base de données
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  console.log("findAll")
  Group.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving group."
      });
    });
};


//Trouver un seul group en fonction de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Group with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Group with id=" + id });
    });
};

//Mettez à jour un group en fonction de son id
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Group.findByIdAndUpdate(id, req.body, { new: true })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Group with id=${id}. Maybe Group was not found!`
//         });
//       } else {
//         res.send({ message: "Group was updated successfully." });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Group with id=" + id
//       });
//     });
// };
exports.update = (req, res) => {
  Group.findOneAndUpdate(req.params.id, req.body, { new: true }, (error, post) => {
    if (error) {
      console.log(error);
      res.status(401)
        .json({ message: "Reqûete invalide." });
    }
    else {
      res.status(200)
        .json(post);
    }
  });
}


//Supprimer un group en fonction de son id
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Group with id=${id}. Maybe this group was not found!`
        });
      } else {
        res.send({
          message: "Group was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Group with id=" + id
      });
    });
};

//Supprimer tous les groups
exports.deleteAll = (req, res) => {
  Group.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Group were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Group."
      });
    });
};