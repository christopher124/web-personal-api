function register(req, res) {
  console.log("Se a ejecutado el registro");

  res.status(200).send({ msg: "Todo ok" });
}

module.exports = {
  register,
};
