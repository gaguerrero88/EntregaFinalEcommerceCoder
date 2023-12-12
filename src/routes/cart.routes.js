import { Router } from "express";
import { cartsControllers } from "../controllers/cartsController.js";
import passport from "passport";
import { authenticate, checkRole } from "../middlewares/auth.js";

const router = Router();

router.route("/").post(cartsControllers.createCart);

router
  .route("/:cid")
  .get(authenticate("jwtAuth"),
  checkRole(["User"]),cartsControllers.getCartByID)
  .delete(
   authenticate("jwtAuth"),
    checkRole(["User"]),
    cartsControllers.deleteProductsCart
  )
  .put(passport.authenticate("jwtAuth", { session: false }), checkRole(["User"]), cartsControllers.updateCart);

router
  .route("/:cid/product/:pid")
  .post(authenticate("jwtAuth"), checkRole(["User"]), cartsControllers.addProductToCart)
  .delete(authenticate("jwtAuth"), checkRole(["User"]), cartsControllers.deleteProduct)
  .put(cartsControllers.productQuantity);

router
  .route("/:cid/purchase")
  .post(authenticate("jwtAuth"), checkRole(["User"]), cartsControllers.purchaseCart);

export { router as cartRoute };
