import { userDao,cartsDao,productDao,ticketsDao } from "../dao/index.js";
import { CartsRepository } from "./carts.repository.js";
import { ProductsRepository } from "./products.repository.js";
import { TicketsRepository } from "./tickets.repository.js";
import { UserRepository } from "./user.repository.js";

const cartsServices = new CartsRepository (cartsDao)
const productServices = new ProductsRepository (productDao)
const ticketsService = new TicketsRepository (ticketsDao)
const userServices = new UserRepository(userDao);

export {cartsServices,productServices,ticketsService,userServices}