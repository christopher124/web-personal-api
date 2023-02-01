const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");

// md de avatar del usuario
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

// obtener la informacion de usuario
api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
// ibtener todos los usuarios
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
// creaccion de usuario
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
// Actulizacion parcial
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
);
// Eliminar usuario
api.delete("/user/:id", [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;
