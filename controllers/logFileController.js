var constants = require("../config/constants");

module.exports = {
  setCookie: (req, res, next) => {
    if (req.file) {
      var maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      res.cookie(constants.APP_NAME + "_file", req.file.filename, {
        maxAge: maxAge,
        httpOnly: true,
      });
      return res.redirect(
        req.headers.referrer || req.headers.referer || "/nginx"
      );
    } else {
      return res.render("error", { error: "Only .txt and .log file allowed" });
    }
  },
};
