const model = require("../../model/members.model");
const api = require("../../tools/common");

const getMembers = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getMembers,
};
