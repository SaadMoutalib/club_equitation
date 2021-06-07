const db = require("../models/db");

const Task = db.tasks;

exports.findAll = (req, res) => {
    Task.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: err.message,
    });
    });
};

exports.findUserTasks = (req, res) => {
    Task.findAll({
        where: { UserID: req.params.id },
        order: [['startDate','DESC']]
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
      !req.body.startDate ||
      !req.body.durationMinut ||
      !req.body.title ||
      !req.body.detail ||
      !req.body.comments ||
      !req.body.UserID
    ) {
      return res.status(400).send({
        message: "No field should be empty !",
      });
    }
  
    const task = {
        startDate:req.body.startDate,
        durationMinut:req.body.durationMinut,
        title:req.body.title,
        detail:req.body.detail,
        UserID:req.body.UserID
    };
  
    Task.create(task)
    .then((data) => {
        return res.status(200).send({
            success: 1,
            message: "Task created successfuly",
            task: data,
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

    Task.findByPk(id)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error retrieving Task with id = " + id,
    });
    });
};
  
  exports.update = (req, res) => {
    Task.update(req.body, {
      where: { _id: req.params.id },
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error updating Task with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  
  exports.delete = (req, res) => {
    Task.destroy({
      where: {
        _id: req.params.id,
      },
      truncate: false,
    })
    .then((data) => {
    res.status(200).send({
        message: "Task deleted succesfully",
    });
    })
    .catch((err) => {
    res.status(500).send({
        message: "Error deleting Task with id = "+req.params.id+"\n error : "+err,
    });
    });
};
  