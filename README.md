# HacktivOverFlow
HacktivOverFlow is a platform that allows user to ask questions and reply them

 - Built with Vue CLI, implementing VUE X 
 - Built with rest API
 - Data storage is in mongo atlas utilizing mongoose
# Usage
Make sure to install all dependencies on both client and server side
> npm install

On the client side run :
> npm run serve

On the server side, run:
>npm run dev
# User Route
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /user/register | POST |username, email, password, token|201(Created), 500(Internal Server Error)|Sign in to the website|
| /user/login | POST |email,  password|200(Created), 500(Internal Server Error)|Log in to the website|

# Question Route
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /question/ask | POST |title, description, tag(optional)|201(Created),500(Internal Server Error) |Ask Question
| /question/edit/:id| PUT |title, description, Header: token |201(OK),500(Internal Server Error) |Edit Question (authenticated User)
| /question/allQuestion | GET |null|200(OK), 500(Internal Server Error)|Get All question
| /question/delete/:id| DELETE |null|200(OK),500(Internal Server Error) |Delete Question (authenticated and authorized)
| /question/answers/:id| GET |null|200(OK),500(Internal Server Error) |Get all replies of a question by id
|/question/upvote/:id| PATCH |Header: token|200(OK),500(Internal Server Error) |Upvote question(authenticated)
|/question/downvote/:id| PATCH |Header: token|200(OK),500(Internal Server Error) |Downvote question(authenticated)
| question/oneQuestion/:id| GET |null|200(OK),500(Internal Server Error) |Get question Detail
|question/searchByTitle/:title| GET |null|200(OK),500(Internal Server Error) |Get Article by Title
| question/searchByTag/:tag| POST |null|200(OK),500(Internal Server Error) |Get question by tag

# Answer Route
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| answer/:questionId| POST |Body: title, description, Header: token|200(OK),500(Internal Server Error) |Post An Answer
| answer/:answerId"| PUT |Body: title, description, Header: token|200(OK),401(Unauthorized),500(Internal Server Error) |Edit Answer (authenticated and authorized)
| answer/upvote/:id| PATCH |null|200(OK),500(Internal Server Error) |Upvote answer (Authenticated)
| answer/downvote/:id"| GET |null|200(OK),500(Internal Server Error) |Download (Authenticated)


## Environment
The following variable are the needed environment to be set before running the program
```
JWT_SECRET=
MONGO_URL=
```



