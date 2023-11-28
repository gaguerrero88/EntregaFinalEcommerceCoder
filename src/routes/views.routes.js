import { Router } from "express";
import passport from "passport";
import { viewController } from "../controllers/viewsController.js";

const router = Router();

router.route("/home").get(passport.authenticate("jwtAuth",{session:false,failureRedirect:"/api/session/fail-loginauth"}),viewController.homeView);

router.route("/realtimeproducts").get(passport.authenticate("jwtAuth",{session:false,failureRedirect:"/api/session/fail-loginauth"}),viewController.realTimeProductsView);

router.route("/carts").get(passport.authenticate("jwtAuth",{session:false,failureRedirect:"/api/session/fail-loginauth"},),viewController.cartsView);

router.route("/register").get(viewController.registerView);

router.route("/").get (passport.authenticate("jwtAuth",{session:false,failureRedirect:"/api/session/fail-loginauth"}),viewController.homePageView);

router.route("/profile").get(passport.authenticate("jwtAuth",{session:false,failureRedirect:"/api/session/fail-loginauth"}),viewController.profileView);

router.route("/fail-auth").get((req, res) => {
    res.redirect("home", { error: "Por favor inicie sesion para acceder" });
  });


export { router as viewsRoutes };
