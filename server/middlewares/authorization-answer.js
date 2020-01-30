const Model = require("../models/answer");

module.exports = (req, res, next) => {
  Model.findById(req.params.id)
    .then(answer => {
      if (answer) {
        if (req.loginData.id != answer.userId) {
          let err = {
            name: "Unauthorized",
            message: "You're not authorized"
          };
          throw err;
        } else {
          next();
        }
      } else {
        let err = {
          name: "Not Found",
          message: "Cannot Find answer"
        };
        throw err;
      }
    })
    .catch(next);
};
