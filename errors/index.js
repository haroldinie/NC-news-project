exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};
exports.handleAll404 =
  ("*",
  (req, res, next) => {
    res.status(404).send({ msg: "not found" });
  });

exports.handleInvalidPath = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid path" });
  } else {
    next(err);
  }
};

exports.handleInvalidColumn = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Invalid column value" });
  }
  next(err);
};

exports.handleInvalidKey = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(400).send({ msg: "Invalid key value insert" });
  }
  next(err);
};

exports.handle400 = (err, req, res, next) => {
  res.status(400).send({ message: "Bad request" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
};
