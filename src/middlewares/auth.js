import { AuthError } from "../utils/errors.js";
import passport from "passport";
import { logger } from "../helpers/logger.js";


export const authenticate = (strategy) => {
  const passportAuthenticate = async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        logger.error(info.toString())
        return res.status(401).json({ error: info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
  return passportAuthenticate;
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AuthError("No esta autorizado para acceder a esta ruta");
    } else {
      next();
    }
  };
};
