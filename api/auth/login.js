const handler = require("../auth");
module.exports = (req, res) => {
  req.url = "/login";
  return handler(req, res);
};
