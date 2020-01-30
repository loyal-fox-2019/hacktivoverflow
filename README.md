# hacktivoverflow - API Server-Okka Linardi

Deploy Link: 

```
http://hacktivoverflow.lieprojects.com.s3-website-ap-southeast-1.amazonaws.com
```



API IP Addresss:

```
http://52.14.182.202:3000
```



Personal Domain Address:

```
http://hacktivoverflow.lieprojects.com
```



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
MONGO_ATLAS= <your mongo atlas network>
JWT_SECRET= <your preferred JWT secret>
```



## Database and ODM

- MongoDB (Mongo Atlas)
- Mongoose ODM



## Main Routes

|  Routes   |
| :-------: |
|   /user   |
| /question |
|  /answer  |



## user Route

| Route  | Method | Body                                                         | query | Result                                                       |
| ------ | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /      | post   | userName: <String><br />email: <String><br />password: <String> |       | Creates User and sends token(automatic login after register) |
| /login | post   | email:<String><br />password: <String>                       |       | Returns token and userName                                   |



## Question Routes

| Routes                | Method | Body                                     | Query | Result                                |
| --------------------- | ------ | ---------------------------------------- | ----- | ------------------------------------- |
| /                     | get    |                                          |       | returns all questions on db           |
| /myQuestions          | get    |                                          |       | returns all logged in user's question |
| /:questionId          | get    |                                          |       | returns a question based on params    |
| /                     | post   | title:<String><br />description:<string> |       | creates a question for logged in user |
| /:questionId          | delete |                                          |       | deletes logged in user's question     |
| /:questionId          | put    | title:<String><br />description:<string> |       | updates logged in user's question     |
| /:questionId          | patch  |                                          |       | adds an up vote                       |
| /:questionId/downVote | patch  |                                          |       | adds a downvote                       |



## Answer Routes

| Routes              | Method | Body                                     | Query | Result                               |
| ------------------- | ------ | ---------------------------------------- | ----- | ------------------------------------ |
| /                   | get    |                                          |       | returns all answers on db            |
| /myAnswer           | get    |                                          |       | returns all logged in user's answers |
| /:answerId          | put    | title:<String><br />description:<string> |       | updates logged in user's answer      |
| /:questionId        | post   | title:<String><br />description:<string> |       | creates an answer for logged in user |
| /:answerId          | patch  |                                          |       | adds an up vote                      |
| /:answerId/downVote | patch  |                                          |       | adds a down vote                     |



# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token



### ErrorHandler:

​		Handles all errors

