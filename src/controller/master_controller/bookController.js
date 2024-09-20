const model = require("../../model/book.model");
const api = require("../../tools/common");

const getBooks = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

const getBooksAvailable = async (req, res) => {
  try {
    let data = await model.getBookAvailable();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getBooks,
  getBooksAvailable,
};
