import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  async addProduct(newProduct) {
      const addedProduct = await this.model.create(newProduct);
      return addedProduct;
  }

  async getProducts() {
    {
        const allProduct = await this.model.find().lean ();
        return allProduct;
    }
  }

  async getProductsByID(id) {
      const productById = await this.model.findById(id);
      return productById;
    }
  

  async updateProduct(newID, productUpdate) {
      const productUpdateById = await this.model.findByIdAndUpdate(newID, productUpdate, { new: true });
    return productUpdateById;
}


   async deleteProduct(id){
        const productDeleteById = await this.model.findByIdAndDelete(id);
        return productDeleteById;
  }

  async getProductsPaginate(query,options) {
    {
        const result = await this.model.paginate(query,options)
        return result;
    }
  }
}

