import { Router } from "express";
import { cartsControllers } from "../controllers/cartsController.js";
import passport from "passport";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

router.route("/").post(cartsControllers.createCart);

router
  .route("/:cid")
  .get(cartsControllers.getCartByID)
  .delete(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["User"]),
    cartsControllers.deleteProductsCart
  )
  .put(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["User"]),
    cartsControllers.updateCart
  );

router
  .route("/:cid/product/:pid")
  .post(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["User"]),
    cartsControllers.addProductToCart
  )
  .delete(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["User"]),
    cartsControllers.deleteProduct
  )
  .put(cartsControllers.productQuantity);

router
  .route("/:cid/purchase")
  .post(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["User"]),
    cartsControllers.purchaseCart
  );

export { router as cartRoute };
