import { Router } from "express";
import passport from "passport";
import { viewController } from "../controllers/viewsController.js";
import { logger } from "../helpers/logger.js";
import { checkRole } from "../middlewares/auth.js";


const router = Router();

router
  .route("/home")
  .get(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    viewController.homeView
  );

router
  .route("/realtimeproducts")
  .get(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),checkRole(["Admin","Premium"]),
    viewController.realTimeProductsView
  );

router
  .route("/carts")
  .get(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),checkRole(["User","Premium"])
    ,viewController.cartsView
  );

router.route("/register").get(viewController.registerView);

router.route("/").get(viewController.homePageView);

router.route("/profile").get(passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),viewController.profileView);

router.route("/fail-auth").get((req, res) => {
  res.redirect("home", { error: "Por favor inicie sesion para acceder" });
});

router.route("/testLogger").get((req, res) => {
  logger.fatal("log fatal");
  logger.error("log error");
  logger.warning("log warning");
  logger.info("log info");
  logger.http("log http");
  logger.debug("log debug");
  res.send("prueba logger");
});

router.route("/forgot-password").get((req, res) => {
  res.render("forgotPassView");
});

router.route("/reset-password").get((req, res) => {
  const { token } = req.query;
  res.render("resetPassView", { token })
});

router
  .route("/administration")
  .get(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),checkRole(["Admin"]),
    viewController.usersEcommerce
  );

export { router as viewsRoutes };
