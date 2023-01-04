const jwt = require("jsonwebtoken");
const timeModel = require('../models/timeModel')


//Création et enregistrement un nouveau temps
exports.create = (req, res) => {

  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //Create a time
  const time = new timeModel({
    time: req.body.time,
    project: req.body.project,
    created_by: req.body.currentUser
  });

  // Save time in the database
  time
    .save(time)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Time."
      });
    });
};

//All times
exports.findAll = (req, res) => {

  console.log("findAll")
  timeModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving time."
      });
    });
};


//Trouver une seule session de temps en fonction de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  timeModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found time with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving time with id=" + id });
    });
};

exports.update = (req, res) => {
  timeModel.findOneAndUpdate(req.params.id, req.body, { new: true }, (error, post) => {
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


//Supprimer un time en fonction de son id
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  timeModel.findByIdAndRemove(id)
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
        message: "Could not delete time with id=" + id
      });
    });
};

//Supprime tous
exports.deleteAll = (req, res) => {
  timeModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Time were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all time's."
      });
    });
};