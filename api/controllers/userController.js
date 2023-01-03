const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

userRegister = (req, res) => {
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

userLogin = (req, res) => {
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

module.exports = { userRegister, userLogin }