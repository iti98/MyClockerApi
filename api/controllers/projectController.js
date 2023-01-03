const jwt = require("jsonwebtoken");
const Projet = require('../models/projectModel')


//Création et enregistrement un nouveau projet
exports.create = (req, res) => {

  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //Create a project
  const projet = new Projet({
    name: req.body.name,
    date: new Date(),
    description: req.body.description,
    created_by: req.body.currentUser
  });

  // Save project in the database
  projet
    .save(projet)
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

//Récupère tous les projets/ recherche dans la base de données
exports.findAll = (req, res) => {
 
  console.log("findAll")
  Projet.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving project."
      });
    });
};


//Trouver un seul projet en fonction de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Projet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving project with id=" + id });
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


//Supprimer un projet en fonction de son id
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Projet.findByIdAndRemove(id)
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

//Supprime tous les projets
exports.deleteAll = (req, res) => {
  Projet.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Project were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all project."
      });
    });
};