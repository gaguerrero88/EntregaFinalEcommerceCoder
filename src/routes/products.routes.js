import { Router } from "express";
import { productControllers } from "../controllers/productsController.js";
import { checkRole } from "../middlewares/auth.js";
import passport from "passport";


const router = Router();

router.route("/mockingproducts").get(productControllers.generateMockProduct)

router
  .route("/")
  .get(productControllers.getProducts)
  .post(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["Admin"]),
    productControllers.createProduct
  );

router
  .route("/:pid")
  .put(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["Admin"]),
    productControllers.updateProductsByID
  )
  .delete(
    passport.authenticate("jwtAuth", { session: false, failureRedirect: "/api/session/fail-loginauth" }),
    checkRole(["Admin"]),
    productControllers.deleteProductByID
  )
  .get(productControllers.getProductsByID);

 

export { router as productsRoute };
