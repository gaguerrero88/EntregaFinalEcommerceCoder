import { Router } from "express";
import { productControllers } from "../controllers/productsController.js";
import { checkRole, authenticate } from "../middlewares/auth.js";
import { uploadProduct} from "../utils.js";

const router = Router();

router.route("/mockingproducts").get(productControllers.generateMockProduct);

router
  .route("/")
  .get(productControllers.getProducts)
  .post(authenticate('jwtAuth'),checkRole(["Admin","Premium"]),uploadProduct.single('imageProd'),productControllers.createProduct);

router
  .route("/:pid")
  .put(authenticate("jwtAuth"), checkRole(["Admin"]), productControllers.updateProductsByID)
  .delete(authenticate('jwtAuth'), checkRole(["Admin","Premium"]), productControllers.deleteProductByID)
  .get(productControllers.getProductsByID);

export { router as productsRoute };
