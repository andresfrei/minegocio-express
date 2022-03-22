const handleHttpError = (res, e, status = 403) => {
  console.log(e);
  return res.send({ error: e }).status(status);
};

module.exports = { handleHttpError };
