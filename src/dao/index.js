import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";;
import { UserManager } from "./mongo/usersManagerMongo.js";
import { TicketManager } from "./mongo/ticketsManagerMongo.js";


export const productDao = new ProductsManagerMongo();
export const cartsDao = new CartsManagerMongo();
export const userDao = new UserManager ();
export const ticketsDao = new TicketManager();

