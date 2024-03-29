import localStrategy from "passport-local";
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";
import { userServices, cartsServices } from "../repository/index.js";
import { config } from "./config.js";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const initializePassport = () => {
  passport.use(
    "signupLocalStrategy",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { name, lastname, age } = req.body;
        try {
          const user = await userServices.getUserByEmail(username);
          if (user) {
            return done(null, false);
          }
          let role;
          if (username.includes("@coder.com")) {
            role = "Admin";
          }
          const cart = await cartsServices.createCarts();
          const newUser = {
            name,
            lastname,
            age,
            email: username,
            password: createHash(password),
            role,
            cartId: cart._id,
            avatar: req.file.filename
          };
          const userCreated = await userServices.createUser(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "loginLocalStrategy",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userServices.getUserByEmail(username);
          if (!user) {
            return done(null, false);
          }
          const validPass = isValidPassword(password, user);
          if (!validPass) {
            return done(null, false);
          }
          user.last_connection = new Date ()
          await userServices.updateUserById (user._id,user)
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "signupGithubStrategy",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackUrlReg: `http://localhost:8080/api/session${config.github.callbackUrlReg}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userServices.getUserByEmail(profile.username);
          if (user) {
            return done(null, user);
          }
          const newUser = {
            name: profile._json.name,
            lastname: profile._json.name,
            age: 10,
            email: profile.username,
            password: createHash(profile.id),
          };
          const userCreated = await userServices.createUser(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwtAuth",
    new JWTStrategy(
      {
        //Extraer la informacion del token
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.pass,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload); //req.user = info del token
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

//funcion para extraer el token de la cookie
const cookieExtractor = (req) => {
  let token;
  if (req && req.cookies) {
    //req?.cookies
    token = req.cookies["cookieToken"];
  } else {
    token = null;
  }
  return token;
};
