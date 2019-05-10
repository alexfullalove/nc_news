exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = {
    "22P02": { message: "bad request", status: 400 },
    "42703": { message: "invalid sort request", status: 400 },
    "23502": { message: "bad request", status: 400 }
  };

  if (psqlCodes[err.code]) {
    console.log(err.code);
    res
      .status(psqlCodes[err.code].status)
      .send({ message: psqlCodes[err.code].message });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
