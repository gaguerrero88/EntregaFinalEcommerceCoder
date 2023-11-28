import fs from "fs";

export class ProductsManagerFiles {
  constructor(path) {
    this.path = path;
  }

  fileExists() {
    return fs.existsSync(this.path);
  }

  async addProduct(newProduct) {
    if (this.fileExists()) {
      let newID;
      const allProducts = await fs.promises.readFile(this.path, "utf8");
      const JSONFile = JSON.parse(allProducts);
      if (JSONFile.length === 0) {
        newID = 1;
      } else {
        newID = JSONFile[JSONFile.length - 1].id + 1;
      }
      const arrayThumb = [];
      arrayThumb[0] = newProduct.thumbnails;
      const productToPush = { id: newID, ...newProduct, thumbnails: arrayThumb };
      JSONFile.push(productToPush);
      await fs.promises.writeFile(this.path, JSON.stringify(JSONFile, null, "\t"));
      return productToPush;
    } else {
      throw new Error("El archivo no existe");
    }
  }

  async getProductsByID(id) {
    if (this.fileExists()) {
      const file = await fs.promises.readFile(this.path, "utf-8");
      const fileJSON = JSON.parse(file);
      const ProductbyID = fileJSON.find((product) => {
        return product.id === id;
      });
      return ProductbyID;
    } else {
      throw new Error("El archivo no existe");
    }
  }

  async updateProduct(newID, productUpdate) {
    if (this.fileExists()) {
      const productById = await fs.promises.readFile(this.path, "utf-8");
      const JSONFile = JSON.parse(productById);
      const productToUpdate = JSONFile.filter((p) => {
        return p.id == newID;
      });
      const indexUpdate = JSONFile.findIndex((p) => {
        return p.id == newID;
      });
      const thumbnails = productUpdate.thumbnails;
      console.log(thumbnails);
      const arrayThumb = [];
      if (!productUpdate.thumbnails) {
        arrayThumb[0] = productToUpdate[0].thumbnails[0];
      } else {
        arrayThumb[0] = productUpdate.thumbnails;
      }
      const newProduct2 = { ...productToUpdate[0], ...productUpdate, thumbnails: arrayThumb };
      JSONFile[indexUpdate] = newProduct2;
      await fs.promises.writeFile(this.path, JSON.stringify(JSONFile, null, "\t"));
      return newProduct2;
    } else {
      throw new Error("El archivo no existe");
    }
  }

  async deleteProduct(id) {
    if (this.fileExists()) {
      const file = await fs.promises.readFile(this.path, "utf-8");
      const fileJSON = JSON.parse(file);
      const ProductbyID = fileJSON.find((product) => {
        return product.id === id;
      });
      const index = fileJSON.findIndex((e) => e.id === id);
      fileJSON.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(fileJSON, null, "\t"));
      return ProductbyID;
    } else {
      throw new Error("El archivo no existe");
    }
  }

  async getProducts() {
    if (this.fileExists()) {
      const file = await fs.promises.readFile(this.path, "utf-8");
      const fileJSON = JSON.parse(file);
      return fileJSON;
    } else {
      throw new Error("El archivo no existe");
    }
  }
}
