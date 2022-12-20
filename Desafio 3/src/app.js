import express from "express";
import ProductManager from "./ProductManager.js";

const productMg = new ProductManager("src/products.JSON");

const app = express();
app.get("/bienvenida/:nombre", (req, res) => {
  res.send(`<h1 style="color:blue">hola ${req.params.nombre}</h1>`);
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productMg.getProducts();
  res.send(limit ? products.splice(0, limit) : products);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  console.log("id", pid);
  const product = await productMg.getProductById(pid);
  res.send(product);
});

app.get("*", (req, res) => {
  res.send("Error");
});
app.listen(3000, () => console.log("Server listening on port 3000"));
