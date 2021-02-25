const pool = require("./db.js");

// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = async (newCustomer) => {
  const [res] = await pool.query("INSERT INTO customers SET ?", newCustomer);
  console.log("created customer: ", { id: res.insertId, ...newCustomer });
  return { id: res.insertId, ...newCustomer };
};

Customer.findById = async (customerId) => {
  const [res] = await pool.query("SELECT * FROM customers WHERE id = ?", [
    customerId,
  ]);
  if (!res.length) {
    // not found Customer with the id
    throw new Error("not_found");
    return;
  }
  return res[0];
};

Customer.getAll = async (result) => {
  const [res] = await pool.query("SELECT * FROM customers");
  console.log("customers: ", res);
  return res;
};

Customer.updateById = async (id, customer) => {
  const [
    res,
  ] = await pool.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id]
  );
  if (res.affectedRows == 0) {
    // not found Customer with the id
    throw new Error("not_found");
    return;
  }
  console.log("updated customer: ", { id: id, ...customer });
  return { id: id, ...customer };
};

Customer.remove = async (id) => {
  const [res] = await pool.query("DELETE FROM customers WHERE id = ?", id);
  console.log(res);
  if (res.affectedRows == 0) {
    // not found Customer with the id
    throw new Error("not_found");
    return;
  }
  console.log("deleted customer with id: ", id);
  return res;
};

Customer.removeAll = async () => {
  const res = await pool.query("DELETE FROM customers");
  console.log(`deleted ${res.affectedRows} customers`);
  return res;
};

module.exports = Customer;
