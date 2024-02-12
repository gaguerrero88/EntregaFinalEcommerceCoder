
export class CartsRepository {
constructor (dao){
  this.dao = dao
}
   
    async createCarts(cart) {
      const newCart = await this.dao.createCarts (cart);
      return newCart;
    }
    async getCartByID(Id) {
      const getCartByID = await this.dao.getCartByID(Id);
      return getCartByID;
    }
  
    async deleteProductsCart(Id) {
      const cart = await this.dao.deleteProductsCart (Id);
      return cart;
    }
  
    async deleteProduct(cartId, prodId) {
  const result = await this.dao.deleteProduct (cartId,prodId)
      return result;
    }
  
    async productQuantity(cartId, prodId, prodQuantity) {
        const result = await this.dao.productQuantity (cartId,prodId,prodQuantity)
        return result;
    }
  
    async addProductToCart(cartId, prodId) {
        const result = await this.dao.addProductToCart (cartId,prodId)
        return result;
    }
  
  
    async updateCart(cartId, product) {
        const result = await this.dao.updateCart (cartId,product)
        return result;
    }

    async deleteCart(cartId, product) {
      const result = await this.dao.deleteCart (cartId)
      return result;
  }


}

