const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

// funcition para obtener los dotos del usuario logueado
async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}
// funcition para obtener los dotos de los usuario en el sistema
async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

// funcition para crear un usuario
async function createUser(req, res) {
  // obtenemos el password que ingreso el usuario
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });
  // Incriptamos la contraseña del usuario
  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  // validos si el usuario manda imagen o no
  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
    console.log(req.files.avatar);
  }
  // Guardamos el usuario en la base de datos
  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
};
