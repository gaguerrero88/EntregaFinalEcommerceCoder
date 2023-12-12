import { Router } from "express";
import { productControllers } from "../controllers/productsController.js";
import { checkRole } from "../middlewares/auth.js";
import { authenticate } from "../middlewares/auth.js";
import passport from "passport";


const router = Router();

router.route("/mockingproducts").get(productControllers.generateMockProduct)

router
  .route("/")
  .get(productControllers.getProducts)
  .post(
    authenticate("jwtAuth"),
    checkRole(["Admin"]),
    productControllers.createProduct
  );

router
  .route("/:pid")
  .put(
    authenticate("jwtAuth"),
    checkRole(["Admin"]),
    productControllers.updateProductsByID
  )
  .delete(
    authenticate("jwtAuth"),
    checkRole(["Admin"]),
    productControllers.deleteProductByID
  )
  .get(productControllers.getProductsByID);

 

export { router as productsRoute };
