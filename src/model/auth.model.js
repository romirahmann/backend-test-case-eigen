const db = require("./../database/perpustakaan.config");

login = async (username) =>
  await db.select("code", "name").from("members").where("name", username);

module.exports = {
  login,
};
