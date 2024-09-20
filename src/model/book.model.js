const db = require("../database/perpustakaan.config");

const getAll = async () => await db.select("*").from("books");

const getBookAvailable = async () => await db("books").where("stock", ">", 0);

const getStock = async (code) =>
  await db.select("code", "stock").from("books").where("code", code).first();

const update = async (code, data) =>
  await db("books").where("code", code).update(data);

module.exports = {
  getAll,
  getStock,
  update,
  getBookAvailable,
};
