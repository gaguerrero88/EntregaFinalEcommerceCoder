import { UsersDto } from "../dao/dto/users.dto.js";
import { productServices,cartsServices, userServices } from "../repository/index.js";


class ViewsController {
  async homeView(req, res) {
    const { limit = 3, page = 1, category, stock } = req.query;
    let sort = req.query.sort;
    const filter = {};
    if (category !== undefined) {
      filter.category = category;
    }
    if (stock !== undefined) {
      filter.stock = stock;
    }
    if (sort === "asc") {
      sort = 1;
    }
    if (sort === "desc") {
      sort = -1;
    }
    const options = {
      limit,
      page,
      sort: { price: sort },
      lean: true,
    };
    const result = await productServices.getProductsPaginate(filter, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    let userEmail;
    let userRole;
    let cartID
    if (req.user?.email) {
      userEmail = req.user.email;
    }
    if (req.user?.role) {
      userRole = req.user.role;
    }
    if (req.user?.cartId) {
      cartID = req.user.cartId;
    }
    const dataProducts = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
      nextLink: result.hasNextPage
        ? baseUrl.includes("page")
          ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)
          : baseUrl.concat(`?page=${result.nextPage}`)
        : null,
    };
    res.status(200).render("home", { dataProducts, userEmail, userRole,cartID });
  }

async realTimeProductsView (req,res) {
    let userRole;
  if (req.user?.role) {
    userRole = req.user.role;
  }
  if (userRole == "Admin") {
    userRole = true;
  } else {
    userRole = false;
  }
  const products = await productServices.getProducts();
  res.render("realTimeProducts", { products, userRole });
}

async cartsView (req,res) {
  const {cartId} = req.user
    const result = await cartsServices.getCartByID(cartId);
    const { products } = result[0];
    res.render("cartproducts", { products,cartId});
}

async profileView (req,res){
    if (req.user && req.user.email) {
        const userEmail = req.user.email;
        const result = await userServices.getUserByEmail (userEmail)
        const user = new UsersDto (result)
        return res.render("profile", {user});
      }
      res.render("profile", { message: `Inicie sesión para visualizar su perfil` });
}

async registerView (req,res){
    res.render("register")
}

async homePageView (req,res){
    res.render("login");
}


}


export const viewController = new ViewsController ()