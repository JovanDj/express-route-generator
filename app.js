const express = require("express");
const app = express();
const generate = require("./lib");

app.use(express.json());

let users = [
  { id: 1, name: "Jovan", url: "http://localhost:3000/users/1" },
  { id: 2, name: "Marko", url: "http://localhost:3000/users/2" },
];

let products = [
  { id: 1, name: "Car", url: "http://localhost:3000/products/1" },
  { id: 2, name: "Guitar", url: "http://localhost:3000/products/2" },
];

const resources = [
  { name: "users", data: users },
  { name: "products", data: products },
  { name: "companies" },
  { name: "vendors" },
];

generate(app, resources);

app.listen(3000);
