# hacktivoverflow

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## API DOCUMENTATION

#### This app was build by Express and Mongoose

#### Currently run on _http://localhost:3000_

User routes:

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_user/register_ | **POST** | none | name, email, password | Register new uer | (201) Success, (400) Validate error
_user/login_ | **POST** | none | email, password | Normal login with jwt | (200) Success, (404) Not Found, need register
_user/google_ | **POST"** | none | id_token | Login with google account | (200) Success, (500) Server Error
 
Question routes: 

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_/question_ | **GET**| none | none | Get all question list | (200) Success, (404) no data
_/question/:id_ | **GET** | none | none | Get one specific question | (200) Success, (500) server error |
_/question/my-question/:id_  | **GET**  | usertoken | none  | Get all user's question | (200) OK, (500) server error
_/question/:id_| *DELETE* | userToken | none | Delete one specific user's question | (200) OK, (403) not authorize
_/question_   | **POST** | usertoken | {title, content} | Add new question | (201) OK, (500) server error
_/question/:id_ | **PUT**| usertoken | {title, content} | Edit one specific question | (200) OK, (500) server error
_/question/upvote/:id_ | **PATCH**| usertoken | none | PATCH upvote | (200) OK, (500) server error
_/question/downvote/:id_ | **PATCH**| usertoken | none | PATCH downvote | (200) OK, (500) server error
_/question/clicks/:id_ | **PATCH**| usertoken | none | PATCH question views | (200) OK, (500) server error

Answer routes: 

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_/answer/:id_| *GET* | none | none | Get all specific question's answer | (200) OK, (403) not authorize
_/answer/:id_| *POST* | userToken | {content} | Add answer to one question | (201) OK, (403) not authorize
_/answer/:id_| *PUT | userToken | none | Update a question's answer | (200) OK, (403) not authorize
_/answer/upvote/:id_| *PATCH* | userToken | none | Patch upvote for answer | (200) OK, (403) server error
_/answer/downvote/:id_| *PATCH* | userToken | none | Patch downvote for answer | (200) OK, (403) not authorize


```
$ npm install
$ npm start
$ npm run dev
```
