import Router from "express";
import { userController } from "../controllers/usersController.js";
import { authenticate, checkRole } from "../middlewares/auth.js";
import { uploadDocuments } from "../utils.js";

const router = Router();

router
  .route("/premium/:uid")
  .put(authenticate("jwtAuth"), checkRole(["Admin"]), userController.changeUserRole)
  .delete(authenticate("jwtAuth"), checkRole(["Admin"]), userController.deleteUserById);

router.route("/:uid/documents").post(
  authenticate("jwtAuth"),
  uploadDocuments.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
  ]),
  userController.uploadUserdocuments
);

router
  .route("/")
  .get(authenticate("jwtAuth"), checkRole(["Admin"]), userController.getAllUsers)
  .delete(authenticate("jwtAuth"), checkRole(["Admin"]), userController.deleteInactiveUser);

export { router as userRoute };
