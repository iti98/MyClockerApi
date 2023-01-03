const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

exports.userRegister = (req, res) => {
    let newUser = new User(req.body);
    console.log(req.body);

    newUser.save((error, user) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.send({ message: "Reqûete invalide." });

        }
        else {
            res.status(201);
            res.send({ message: `Utilisateur crée : ${user.email}` });
        }
    })
}

exports.userLogin = (req, res) => {
    // Find user
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            // User not found
            res.status(500);
            console.log(error);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            // User found
            if (user.email == req.body.email && user.password == req.body.password) {
                // Password correct
                let userData = {
                    id: user._id,
                    email: user.email,
                    role: "admin"
                }
                jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                    if (error) {
                        res.status(500)
                            .json({ message: "Impossible de générer le token" });
                        console.log(error);
                    }
                    else {
                        res.status(200)
                            .json({ token });
                    }
                })
            }
            else {
                // Password don't match
                res.status(401)
                    .json({ message: "Email ou Mot de passe incorrect" });
                console.log(error);

            }
        }
    });

}


//Création et enregistrement d'un utilisateur
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //Create a user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    //Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

//Récupère tous les user/ recherche dans la base de données
exports.findAll = (req, res) => {

    console.log("findAll")
    User.find()
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


//Trouver un seul user en fonction de son id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
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

//Update user en fonction de son id
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
    User.findOneAndUpdate(req.params.id, req.body, { new: true }, (error, user) => {
        if (error) {
            console.log(error);
            res.status(401)
                .json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200)
                .json(user);
        }
    });
}


//Supprime un user en fonction de son id
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe this user was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

//Supprime tous les utilisateurs
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} User were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all User."
            });
        });
}
