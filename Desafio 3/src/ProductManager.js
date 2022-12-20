import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        let arrayProducts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(arrayProducts);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son requeridos");
        return { error: true };
      }
      let product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      let products = await this.getProducts();
      console.log("productos", products.length);
      if (products.length === 0) {
        product["id"] = 1;
      } else {
        product["id"] = products[products.length - 1]["id"] + 1;
      }
      if (products.find((e) => e.code === code)) {
        console.log("El codigo ya existe");
      } else {
        products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return products;
      }
    } catch (err) {
      console.log("error:", err);
    }
  }
  async getProductById(idParam) {
    try {
      let products = await this.getProducts();
      const idToFind = parseInt(idParam);
      let product = products.find((p) => p.id === idToFind);
      if (product) {
        return product;
      } else {
        console.log("Not found");
        return {};
      }
    } catch (err) {
      console.log("error:", err);
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        myProduct.title = title;
        myProduct.description = description;
        myProduct.price = price;
        myProduct.thumbnail = thumbnail;
        myProduct.code = code;
        myProduct.stock = stock;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        products.splice(products.indexOf(myProduct), 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
