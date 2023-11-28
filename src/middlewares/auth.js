import { AuthError } from "../utils/errors.js";


export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AuthError("No esta autorizado para acceder a esta ruta");
    } else {
      next();
    }
  };
};


