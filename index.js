const express = require("express");
const server = express();

server.use(express.json());

let customers = [
  { id: 1, name: "Linkedin", site: "https://linkedin.com/in/alexandre-delaboneta" },
  { id: 2, name: "Instagram", site: "https://instagram.com/imxandx" },
  { id: 3, name: "Portfolio", site: "https://imxandx.github.io/portfolio" }
];

// Listando todos os customers (GET all customers)

server.get("/customers", (req, res) => {
  return res.json(customers);
});

// Obtendo um customer específico pelo ID (GET customer by ID)

server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(item => item.id === id);
  const status = customer ? 200 : 404;

  return res.status(status).json(customer);
});

// Criando um novo customer (POST create new customer)

server.post("/customers", (req, res) => {
  const { name, site } = req.body;
  const id = customers[customers.length - 1].id + 1;

  const newCustomer = { id, name, site };
  customers.push(newCustomer);

  return res.status(201).json(newCustomer);
});

// Atualizando um customer existente pelo ID (PUT update customer by ID)

server.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, site } = req.body;

  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers[index] = { id: parseInt(id), name, site };
  }

  return res.status(status).json(customers[index]);
});

// Deletando um customer pelo ID (DELETE remove customer by ID)

server.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers.splice(index, 1);
  }

  return res.status(status).json();
});

// Inicializando o servidor na porta 3000

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
});
