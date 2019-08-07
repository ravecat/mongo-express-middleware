export default {
  read: function({ req, res, next, cb, model, key }) {
    return model.find(function(err, data) {
      if (err) return res.status(500).send(err);

      res.data = data;

      cb(req, res, next);
    });
  },
  create: function({ req, res, next, cb, model, key }) {
    return model.create(req.body, function(err, data) {
      if (err) return res.status(500).send(err);

      res.data = data;

      cb(req, res, next);
    });
  },
  readEntity: function({ req, res, next, cb, model, key }) {
    return model.findOne({ _id: req.params.id }, function(err, data) {
      if (err) return res.status(500).send(err);

      res.data = data;

      cb(req, res, next);
    });
  },
  update: function({ req, res, next, cb, model, key }) {
    return model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(
      err,
      data,
    ) {
      if (err) return res.status(500).send(err);

      res.data = data;

      cb(req, res, next);
    });
  },
  delete: function({ req, res, next, cb, model, key }) {
    return model.findOneAndDelete({ _id: req.params.id }, null, function(err, data) {
      if (err) return res.status(500).send(err);

      res.data = {
        id: data._id,
      };

      cb(req, res, next);
    });
  },
};
