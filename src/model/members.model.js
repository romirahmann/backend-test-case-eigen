const db = require("../database/perpustakaan.config");

const getAll = async () => await db.select("*").from("members");

const getMember = async (code) =>
  await db("members").where("code", code).first();

const countBooksBorrowed = async (code) => {
  const result = await db("loans")
    .where("member_code", code)
    .andWhere("is_returned", 0)
    .count("loan_id as total_books");
  return result[0].total_books;
};

const update = async (code, data) =>
  await db("members").where("code", code).update(data);

module.exports = {
  getAll,
  getMember,
  countBooksBorrowed,
  update,
};
