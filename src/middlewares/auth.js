import passport from "passport";

export const authenticate = (strategy) => {
  const passportAuthenticate = async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
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
     return res.render("login",{error:"No tienes permisos para entrar a esta seccion"})
    } else {
      next();
    }
  };
};
