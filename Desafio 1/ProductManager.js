class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProducts(title, description, price, thumbnail, code, stock) {
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
    if (this.products.length === 0) {
      product["id"] = 1;
    } else {
      product["id"] = this.products[this.products.length - 1]["id"] + 1;
    }
    if (this.products.find((e) => e.code === code)) {
      console.log("El codigo ya existe");
    } else {
      this.products.push(product);
    }
  }
  getProductById(id) {
    let product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
    }
  }
}
//Agrega un producto
const products = new ProductManager();
//Agrega un producto
products.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
//Agrega el mismo producto esperando error por codigo repetido
products.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
//Agrega un producto sin algun campo
products.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abcd123"
);
//Agrega otro producto
products.addProducts(
  "producto prueba 2",
  "Este es un producto prueba 2",
  200,
  "Sin imagen",
  "abc1234",
  25
);
//Busca un producto por id
console.log(products.getProductById(2));
console.log(products.getProducts());
