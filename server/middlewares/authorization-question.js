const Model = require("../models/question");

module.exports = (req, res, next) => {
  Model.findById(req.params.id)
    .then(question => {
      if (question) {
        console.log(req.loginData.id, question.userId);
        if (req.loginData.id != question.userId) {
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
          message: "Cannot Find Question"
        };
        throw err;
      }
    })
    .catch(next);
};
