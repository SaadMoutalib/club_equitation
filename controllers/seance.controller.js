const db = require("../config/db");

const Seance = db.seances;

exports.findAll = (req, res) => {
    Seance.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: err.message,
    });
    });
};

exports.create = (req, res) => {
    if (
      !req.body.seanceGrpID ||
      !req.body.startDate ||
      !req.body.durationMinut ||
      !req.body.isDone ||
      !req.body.paymentID ||
      !req.body.comments
    ) {
      return res.status(400).send({
        message: "No field should be empty !",
      });
    }
  
    const seance = {
        seanceGrpID:req.body.seanceGrpID,
        startDate:req.body.startDate,
        durationMinut:req.body.durationMinut,
        isDone:req.body.isDone,
        paymentID:req.body.paymentID ,
        comments:req.body.comments
    };
  
    Seance.create(seance)
    .then((data) => {
        return res.status(200).send({
            success: 1,
            message: "Seance created successfuly",
            annonce: data,
        });
        })
    .catch((err) => {
        res.status(500).send({
            message: err.message,
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Seance.findByPk(id, {include:db.clients})
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error retrieving seance with id = " + id,
    });
    });
};
  
exports.update = (req, res) => {
    Seance.update(req.body, {
        where: { _id: req.params.id },
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error updating seance with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  
exports.delete = (req, res) => {
    Seance.destroy({
        where: {
        _id: req.params.id,
        },
        truncate: false,
    })
    .then((data) => {
        res.status(200).send({
            message: "Seance deleted succesfully",
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error deleting seance with id = "+req.params.id+"\n error : "+err,
        });
    });
};
  