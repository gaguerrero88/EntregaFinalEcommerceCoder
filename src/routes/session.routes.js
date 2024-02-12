import { Router } from "express";
import { userController } from "../controllers/usersController.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticate} from "../middlewares/auth.js"
import { uploadProfile } from "../utils.js";

const router = Router();

router
  .route("/register")
  .post(uploadProfile.single("avatar"),
    passport.authenticate("signupLocalStrategy",{session:false, failureRedirect: "/api/session/fail-signup" }),
    userController.registerUser
  );


router.route("/logout").get(authenticate("jwtAuth"),userController.logoutUser);

router.route("/fail-signup").get((req, res) => {
  res.render("register", { error: "El usuario ya se encuentra registrado" });
});

router.route ("/forgot-password").post(userController.forgotPassword)

router.route ("/reset-password").post(userController.resetPassword)

router
  .route("/")
  .post(
    passport.authenticate("loginLocalStrategy",{session:false, failureRedirect: "/api/session/fail-login" }),
    userController.loginUser
  );

router.route("/fail-login").get((req, res) => {
  res.render("login", { error: "No se pudo iniciar sesion" });
});

router.route("/fail-loginauth").get((req, res) => {
  res.render("login", {error: "Inicie sesion para poder acceder" });
});


router.route("/signup-github").get(passport.authenticate("signupGithubStrategy"));

router.route(config.github.callbackUrlReg).get(
  passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/session/fail-signup",session:false
  }),userController.loginUser,
  (req, res) => {
    res.redirect("/profile");
  }
);

export { router as sessionRoute };
