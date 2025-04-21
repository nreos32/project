const handler = require("../auth");
module.exports = (req, res) => {
  req.url = "/register";
  return handler(req, res);
};
