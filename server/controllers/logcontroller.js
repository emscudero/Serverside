let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definitions: req.body.log.definitions,
        results: req.body.log.results,
        owner: req.user.id
    }
    Log.create(logEntry)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/", (req, res) => {
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error:err}))
});
  
  router.get("/:id", validateSession, (req, res) => {
    let userId = req.user.id;
    Log.findAll({
      where: { owner: userId },
    })
      .then((logs) => res.status(200).json(logs))
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  router.get("/:description", function (req, res) {
    let description = req.params.description;
    Log.findAll({
      where: { description: description },
    })
      .then((logs) => res.status(200).json(logs))
      .catch((err) => res.status(500).json({ error: err }));
  });

router.put("/update/:entryId", validateSession, function(req, res){
    const updateLogEntry = {
        description: req.body.log.description,
        definitions: req.body.log.definitions,
        results: req.body.log.results,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id} };

    Log.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error:err}))
});

router.delete("/delete/:id", validateSession, function (req, res){
    const query = { where: { id: req.params.id, owner: req.user.id} };

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Log Entry Removed"}))
    .catch(err => res.status(500).json({error:err}))
});

module.exports = router;





