const User = require("../models/user");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El correo es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatorio" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
    password,
  });

  console.log(user);

  res.status(200).send({ msg: "Todo ok" });
}

module.exports = {
  register,
};
