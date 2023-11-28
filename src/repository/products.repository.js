


 export class ProductsRepository {
  constructor (dao){
this.dao = dao
  }

    async addProduct(newProduct) {
        const result = await this.dao.addProduct (newProduct);
        return result;
    }
  
    async getProducts() {
      {
          const result = await this.dao.getProducts()
          return result;
      }
    }
  
    async getProductsByID(id) {
        const result = await this.dao.getProductsByID(id);
        return result;
      }
    
  
    async updateProduct(newID, productUpdate) {
        const result = await this.dao.updateProduct (newID,productUpdate)
      return result;
  }
  
  
     async deleteProduct(id){
          const result = await this.dao.deleteProduct (id)
          return result;
    }
  
    async getProductsPaginate(query,options) {
      {
          const result = await this.dao.getProductsPaginate (query,options)
          return result;
      }
    }
  }
  

