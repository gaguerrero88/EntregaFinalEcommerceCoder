import { createHash, generateToken, isValidPassword } from "../utils.js";
import {
  sendChangePasswordEmail,
  generateEmailToken,
  verifyEmailToken,
  sendDletedUserEmail,
} from "../helpers/email.js";
import { cartsServices, userServices } from "../repository/index.js";
import { AuthError, ClientError } from "../utils/errors.js";
import { response } from "../utils/response.js";
import { UsersDto } from "../dao/dto/users.dto.js";

class UserController {
  async registerUser(req, res) {
    res.render("register", { message: "User registerd" });
  }

  async loginUser(req, res) {
    const user = req.user;
    const token = generateToken(user);
    res.cookie("cookieToken", token, { httpOnly: true }).redirect("/home");
  }

  async logoutUser(req, res) {
    const date = Date.now();
    const { _id } = req.user;
    await userServices.updateUserById(_id, { last_connection: date });
    res.clearCookie("cookieToken").redirect("/");
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      throw new ClientError("Usuario no existe");
    }
    const emailToken = generateEmailToken(email, 5 * 60);
    await sendChangePasswordEmail(req, email, emailToken);
    res.render("login", { message: "Mail de reseteo de password enviado" });
  }

  async resetPassword(req, res) {
    const { token } = req.query;
    const email = verifyEmailToken(token);
    if (!email) {
      return res.send(
        "El enlace ya no es valido, genere uno nuevo en el siguiente enlace <a href='/forgot-password'>enlace</a>"
      );
    }
    const { password } = req.body;
    const hashPassword = createHash(password);
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      return res.send("operacion no valida");
    }
    if (isValidPassword(hashPassword, user)) {
      return res.render("resetPassView", { error: "Password invalido", token });
    }
    await userServices.updateUserById(user._id, { password: hashPassword });
    res.render("login", { message: "Password actualizado" });
  }

  async changeUserRole(req, res) {
    const userId = req.params.uid;
    const user = await userServices.getUserById(userId);
    if (user.status !== "completo") {
     throw new ClientError ("El usuario no ha cargado todos los documentos")
    }
    if (user.role === "Premium") {
      user.role = "User";
    } else if (user.role === "User") {
      user.role = "Premium";
    } else {
      throw new AuthError("No se puede cambiar el rol del usuario");
    }
    await userServices.updateUserById(user._id, user);
    res.status(200).json({ message: 'Rol del usuario modificado con éxito' });
  }

  async uploadUserdocuments(req, res) {
    const userId = req.params.uid;
    const user = await userServices.getUserById(userId);
    const identificacion = req.files["identificacion"]?.[0] || null;
    const domicilio = req.files["domicilio"]?.[0] || null;
    const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null;
    const docs = [];
    if (identificacion) {
      docs.push({ name: "identificacion", reference: identificacion.filename });
    }
    if (domicilio) {
      docs.push({ name: "domicilio", reference: domicilio.filename });
    }
    if (estadoDeCuenta) {
      docs.push({ name: "estadoDeCuenta", reference: estadoDeCuenta.filename });
    }
    user.documents = docs;
    if (docs.length < 3) {
      user.status = "incompleto";
    } else {
      user.status = "completo";
    }
    await userServices.updateUserById(userId, user);
    res.redirect("/profile?message=Documentos cargados correctamente");
  }

  async getAllUsers(req, res) {
    const users = await userServices.getUsers();
    const userfilter = users.map((u) => {
      return new UsersDto(u);
    });

    response(res, 200, userfilter);
  }

  async deleteInactiveUser(req, res) {
    const users = await userServices.getUsers();
    const twoDaysInMillis = 1000 * 60 * 60 * 24 * 2;
    const currentDate = new Date().getTime();
    for (const u of users) {
      if (u.last_connection.getTime() + twoDaysInMillis < currentDate) {
        await userServices.deleteInactiveUser(u._id);
        sendDletedUserEmail(req, u.email);
      }
    }

    response(res, 200, "Inactive users deleted");
  }

  async deleteUserById(req, res) {
    const uid = req.params.uid;
   const user= await userServices.deleteInactiveUser(uid);
    await cartsServices.deleteCart(user.cartId)
    res.status(200).json({ message: 'Usuario eliminado con exito' });
  }
}

export const userController = new UserController();
