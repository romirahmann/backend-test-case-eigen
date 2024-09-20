const db = require("../database/perpustakaan.config");
const getAll = async () => await db.select("*").from("loans");

const getLoanByCode = async (member_code, book_code) =>
  await db
    .select("*")
    .from("loans")
    .where("member_code", member_code)
    .andWhere("book_code", book_code)
    .first();

const getLoansByMembers = async (code) =>
  await db
    .select(
      "l.loan_id",
      "l.member_code",
      "l.book_code",
      "l.loan_date",
      "l.due_date",
      "l.return_date",
      "l.is_returned",
      "m.name"
    )
    .from("loans AS l")
    .innerJoin("members as m", "m.code", "l.member_code");
const insertLoans = async (data) => await db("loans").insert(data);
const update = async (member_code, book_code, data) =>
  await db("loans")
    .where("member_code", member_code)
    .andWhere("book_code", book_code)
    .update(data);

module.exports = {
  getAll,
  getLoansByMembers,
  insertLoans,
  update,
  getLoanByCode,
};
