import express from "express";
import "express-async-errors";
import {config} from "./config/config.js"
import {swaggerSpecs} from "./config/swagger.config.js";
import swaggerUI from "swagger-ui-express"
import { __dirname } from "./utils.js";
import { productsRoute } from "./routes/products.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { cartRoute } from "./routes/cart.routes.js"
import { sessionRoute } from "./routes/session.routes.js";
import { viewsRoutes } from "./routes/views.routes.js";
import path from "path";
import { productServices } from "./repository/index.js";
import { Server } from "socket.io";
import { connectionDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import handlebars from "handlebars";
import exphbs from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import passport from "passport";
import { initializePassport } from "./config/passportconfig.js";
import {logger} from "./helpers/logger.js"

// Configuración de Handlebars
const hbs = exphbs.create({
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(handlebars), // Utilizar la instancia importada de Handlebars
});

const app = express();

app.use (cookieParser())
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
// app.use (session({
//   store: MongoStore.create({
//     ttl:6000,
//     mongoUrl:config.mongo.url
//   }
//     ),
//   secret: config.server.secretSession,
//   resave: true,
//   saveUninitialized:true,
// }))

initializePassport();
app.use (passport.initialize())
// app.use (passport.session())

const port = 8080;

const httpServer = app.listen(port, () => {
  logger.info(`Escuchando en puerto ${port}...`);
});

const io = new Server(httpServer);
connectionDB();

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/session",sessionRoute);
app.use("/api/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpecs))
app.use(viewsRoutes);



//nuevo manejador de errores de express porque tiene los 4 parametros
app.use(errorHandler);
app.use(notFound);






io.on("connection", async (socket) => {
  const products = await productServices.getProducts();
  socket.emit("productsArray", products);

  socket.on("addProduct", async (data) => {
    await productServices.addProduct(data);
    const products = await productServices.getProducts();
    io.emit("productsArray", products);
  });

  socket.on("productID", async (productID) => {
    await productServices.deleteProduct(productID);
    const products = await productServices.getProducts();
    io.emit("productsArray", products);
  });


});
