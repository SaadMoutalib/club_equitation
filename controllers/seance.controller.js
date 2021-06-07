const db = require("../models/db");
const { Op } = require("sequelize");

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

exports.findClientSeance = (req, res) => {
    Seance.findAll({
        where: { ClientID: req.params.id },
        order: [['startDate','DESC']],
        include: [{ model: db.clients }, {model:db.users}]
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message: err.message,
          });
    });
}

exports.setIsDone = (req, res) => {
    const id = req.params.id;
    
    Seance.findByPk(id)
    .then((data)=>{
        data.update({
            isDone : data.isDone == 1 ? 0 : 1
        }).then((data)=>{
            res.send(data);
        }).catch((err)=>{
            res.status(500).send({
                message: err.message,
            });
        });
    }).catch((err)=>{
        res.status(500).send({
            message: err.message,
        });
    });
}

exports.findMonitorSeance = (req, res) => {
    Seance.findAll({
        where: { MonitorID: req.params.id },
        order: [['startDate','DESC']],
        include: [{ model: db.clients }, {model:db.users}]
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message: err.message,
          });
    });
}

exports.create = (req, res) => {
    if (
      !req.body.seanceGrpID ||
      !req.body.startDate ||
      !req.body.durationMinut ||
      !req.body.paymentID ||
      !req.body.comments ||
      !req.body.ClientID ||
      !req.body.MonitorID 
    ) {
      return res.status(400).send({
        message: "No field should be empty !",
      });
    }
  
    const seance = {
        seanceGrpID:req.body.seanceGrpID,
        startDate:req.body.startDate,
        durationMinut:req.body.durationMinut,
        paymentID:req.body.paymentID ,
        comments:req.body.comments,
        MonitorID:req.body.MonitorID,
        ClientID:req.body.ClientID
    };
  
    Seance.create(seance)
    .then((data) => {
        return res.status(200).send({
            success: 1,
            message: "Seance created successfuly",
            seance: data,
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
        where: { seanceID: req.params.id },
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
            seanceID: req.params.id,
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
  