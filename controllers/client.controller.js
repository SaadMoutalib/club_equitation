const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Client = db.clients;

exports.login = (req, res) => {
    Client.findOne({
      where: { clientEmail: req.body.clientEmail },
    })
    .then((data) => {
        if (!data) {
            return res.status(400).send({
            message: "Il n'existe aucun compte avec cet email",
            });
        } else {
            const result = bcrypt.compareSync(req.body.passwd, data.passwd);
            data.passwd = undefined;
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
      !req.body.clientEmail ||
      !req.body.fName ||
      !req.body.lName ||
      !req.body.birthDate ||
      !req.body.identityDoc ||
      !req.body.identityNumber ||
      !req.body.inscriptionDate ||
      !req.body.ensurenceValidity||
      !req.body.licenceValidity||
      !req.body.passwd ||
      !req.body.clientPhone||
      !req.body.priceRate
    ) {
      return res.status(400).send({
        message: req.body.clientEmail+"No field should be empty !",
      });
    }

    Client.findOne({
        where: { clientEmail: req.body.clientEmail },
      })
        .then((data) => {
          if (data) {
            return res.status(400).send({
              message: "Un client avec cet e-mail existe deja",
            });
          } else {
            const salt = bcrypt.genSaltSync(10);

            const client = {
                clientEmail:req.body.clientEmail,
                fName:req.body.fName,
                lName:req.body.lName,
                birthDate:req.body.birthDate,
                birthDate:req.body.photo,
                identityDoc:req.body.identityDoc,
                identityNumber:req.body.identityNumber,
                inscriptionDate:req.body.inscriptionDate,
                ensurenceValidity:req.body.ensurenceValidity,
                licenceValidity:req.body.licenceValidity,
                passwd:bcrypt.hashSync(req.body.passwd, salt),
                clientPhone:req.body.clientPhone,
                priceRate:req.body.priceRate
            };

            if(req.file){
                const url = req.protocol + "://" + req.get("host");
                const image = url + "/public/user/" + req.file.filename;
                
                client.photo = image;
            }
            
            Client.create(client)
            .then((data) => {
                return res.status(200).send({
                    success: 1,
                    message: "Client created successfuly",
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
    Client.findAll()
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

    Client.findByPk(id, {include:db.seances})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error retrieving Client with id = " + id,
    });
    });
};
  
  exports.update = (req, res) => {
    Client.update(req.body, {
      where: { _id: req.params.id },
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error updating Client with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  
  exports.delete = (req, res) => {
    Client.destroy({
      where: {
        _id: req.params.id,
      },
      truncate: false,
    })
    .then((data) => {
    res.status(200).send({
        message: "Client deleted succesfully",
    });
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error deleting Client with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  