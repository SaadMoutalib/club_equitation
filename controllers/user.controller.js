const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = db.users;

exports.login = (req, res) => {
    User.findOne({
      where: { userEmail: req.body.userEmail },
    })
    .then((data) => {
        if (!data) {
            return res.status(400).send({
            message: "Il n'existe aucun compte avec cet email",
            });
        } else {
            const result = bcrypt.compareSync(req.body.userPasswd, data.userPasswd);
            data.password = undefined;
            if (result) {
            const jsontoken = jwt.sign({ id: data._id }, config.secret, {
                expiresIn: "1h",
            });
            return res.status(200).send({
                message: "Authentifié avec succès",
                user: data,
                token: jsontoken,
            });
            } else {
            return res.status(401).send({
                message: "Mot de passe incorrect",
            });
            }
        }
    })
    .catch((err) => {
        res.status(400).send({
            message: err.message,
        });
    });
};

exports.create = (req, res) => {
    if (
      !req.body.userEmail ||
      !req.body.userPasswd ||
      !req.body.userFName ||
      !req.body.userLName ||
      !req.body.description ||
      !req.body.userType ||
      !req.body.contractDate||
      !req.body.userPhone||
      !req.body.displayColor
    ) {
      return res.status(400).send({
        message: "No field should be empty !",
      });
    }

    User.findOne({
        where: { userEmail: req.body.userEmail },
      })
        .then((data) => {
          if (data) {
            return res.status(400).send({
              message: "Un utilisateur avec cet e-mail existe deja",
            });
          } else {
            const salt = bcrypt.genSaltSync(10);
            
            const user = {
                userEmail:req.body.userEmail,
                userPasswd:bcrypt.hashSync(req.body.userPasswd, salt),
                userFName:req.body.userFName,
                userLName:req.body.userLName,
                description:req.body.description,
                userType:req.body.userType,
                contractDate:req.body.contractDate,
                userPhone:req.body.userPhone,
                displayColor:req.body.displayColor
            };

            const url = req.protocol + "://" + req.get("host");
            if(!req.file){
              user.userphoto = url + "/public/user/default.jpg";
            }else{
              user.userphoto = url + "/public/user/" + req.file.filename;
            }
            
            User.create(user)
            .then((data) => {
                return res.status(200).send({
                    success: 1,
                    message: "User created successfuly",
                    annonce: data,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message,
                });
            });
          }
        })
        .catch((err) => {
          res.status(400).send({
            message: err.message,
          });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: err.message,
    });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id,{include:[{model:db.seances, as:"seances"},{model:db.tasks, as:"tasks"}]})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error retrieving User with id = " + id,
    });
    });
};
  
  exports.update = (req, res) => {
    User.update(req.body, {
      where: { _id: req.params.id },
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error updating User with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  
  exports.delete = (req, res) => {
    User.destroy({
      where: {
        _id: req.params.id,
      },
      truncate: false,
    })
    .then((data) => {
    res.status(200).send({
        message: "User deleted succesfully",
    });
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error deleting User with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  