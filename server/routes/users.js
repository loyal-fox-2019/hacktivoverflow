const usersRouter = require("express").Router();
const UserController = require("../controllers/userController.js");

const authentication = require("../middlewares/authentication");
const authorisation = require("../middlewares/authorisation").user_authorisation;

const generateTokenGoogle = require("../middlewares/generateTokenGoogle");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken"); 

usersRouter.post('/register', UserController.registerUser);

usersRouter.post('/login', UserController.loginUser);

usersRouter.post('/gsignin',verifyGoogleToken,generateTokenGoogle);

usersRouter.use('/',authentication);

usersRouter.get('/myquestions',UserController.getMyQuestions);

usersRouter.get('/tags',authorisation,UserController.getUserTags);

usersRouter.patch('/tags',authorisation,UserController.updateUserTags);

module.exports = usersRouter;