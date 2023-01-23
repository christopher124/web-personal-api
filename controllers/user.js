const bcrypt = require("bcryptjs");
const User = require("../models/user");

// funcion para obtener la informacion de usuario logueado
async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}
// funcion para obetener todos los usuarios del sistema
async function getUser(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }
  res.status(200).send(response);
}
// funcion para crear un usuario en el sistema
async function createUser(req, res) {
  const { password } = req.body;
  //Encriptar la contraseña del usuario
  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  // Creacion del usuario
  const user = new User({ ...req.body, active: false, password: hasPassword });
  // creacion con avatar o no
  if (req.files.avatar) {
    //TODO:
    console.log("Procesar avatar");
  }

  user.save((error, userStored) => {
    if (error) {
      res
        .status(400)
        .send({ msg: "Error al crear el usuario, intentelo mas tarde" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

module.exports = {
  getMe,
  getUser,
  createUser,
};
