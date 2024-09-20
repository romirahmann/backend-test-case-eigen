const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");

const login = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Please provide username." });
  }

  let member = await model.login(username);
  if (!member.length > 0) {
    return res.status(401).json({ message: "Account not found!" });
  }

  // Generate a JWT token and send it in the response
  const payload = {
    id: member.member_id,
    member_code: member.code,
    name: member.name,
  };

  const token = generateToken(payload);
  res.json({ token, data: member });
};

module.exports = {
  login,
};
