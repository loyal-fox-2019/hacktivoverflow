const usersRouter = require("express").Router();
const UserController = require("../controllers/userController.js");

const authentication = require("../middlewares/authentication");

const generateTokenGoogle = require("../middlewares/generateTokenGoogle");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken"); 

usersRouter.post('/register', UserController.registerUser);

usersRouter.post('/login', UserController.loginUser);

usersRouter.post('/gsignin',verifyGoogleToken,generateTokenGoogle);

usersRouter.use('/',authentication);

usersRouter.get('/myquestions',UserController.getMyQuestions);

module.exports = usersRouter;