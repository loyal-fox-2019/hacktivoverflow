# hacktivoverflow

### <u>Shema</u>

All API access is over HTTP, and accessed from `http://localhost:8080`.

### <u>Authentication</u>

```
headers: {
  token: UserToken
}
```

# REST API


| Method | URL                          | Headers      | Data                                                                             | Description                                                                                   |
|--------|------------------------------|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| POST   | /user/register              | None         | username: string<br> email: string<br> password: string                          | Register a new user                                                                           |
| POST   | /user/login                 | None         | email: string<br> password: string                                               | Login an existing user using email                                             |
| GET    | /question                    | token:string | None                                                                             | Get all questions                                                                    |
| GET    | /question/user                    | token:string | None                                                                             | Get all user's questions                                                                    |
| GET    | /question/:id            | token:string | None                                                                             | Get one specific question                                           |
| POST   | /question                       | token:string | title:string<br> description:string<br> | Create a new question |
| PUT  | /question/:id                   | token:string | name:string<br> description:string<br>  picture:string<br> price:integer |  update question|
| DELETE  | /question/:id                   | token:string |  |  delete question|
| PATCH  | /question/upvote/:id                   | token:string |  |   upvote a question|    
| PATCH  | /question/downvote/:id                   | token:string |  |  downvote a question|
| DELETE | /question/:id                   | token:string | None                                                                             | Delete a question with the specified id                                                           |
| GET   | /answer/:questionId                       | token:string |  | get all answers of a question |
| POST  | /answer               | token:string | title:string<br> description:string<br> |                       create new answer            |
| PUT   | /answer/:answerId                       | token:string |  title:string<br> description:string<br> | update answer |
| DELETE | /answer/:answerId                   | token:string | None                                                                             | Delete an answer with the specified id                                                           |
| PATCH  | /answer/upvote/:answerId                   | token:string |  |   upvote a question|    
| PATCH  | /answer/downvote/:answerId                   | token:string |  |  downvote a question|


### <u>Register User</u>

*return user name and token*

* **URL**

  /users/register

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   username: 123,
   email: 123@mail.com,
   password: 123,
  }
  ```

  

* **Success Response**

    ```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxN2IxOGUwNjIxZTBhOTM1M2RkYzAiLCJlbWFpbCI6IjEyM0BtYWlsLmNvbSIsImlhdCI6MTU4MDMwMTA4MX0.z2w5CX7EhxexTdP-I4Kn26TL91bumZ0Lg0rCroyhwN8",
    "payload": {
        "_id": "5e317b18e0621e0a9353ddc0",
        "email": "123@mail.com"
    }
}
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```


### <u>Login User</u>

*return user name and token*

* **URL**

  /user/login

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   email: 123@format.com,
   password: 123,
  }
  ```

* **Data headers**

  ```
  none
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxN2IxOGUwNjIxZTBhOTM1M2RkYzAiLCJlbWFpbCI6IjEyM0BtYWlsLmNvbSIsImlhdCI6MTU4MDMwMTE0NX0.Fh9Oe9HTPr80nKgrMU45fl6kA6pKC2rdDq3uGoX-I7s",
    "payload": {
        "_id": "5e317b18e0621e0a9353ddc0",
        "email": "123@mail.com"
    }
}
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Create Question</u>

*return created question's info*

* **URL**

  /question

* **Method**

  `POST`

* **Body**


  ```
    {
        title: pisang,
        description: enak
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
{
    "upvotes": [],
    "downvotes": [],
    "_id": "5e31a27d2bcbb816d369499e",
    "title": "pisang",
    "description": "enak",
    "user": "5e302d742a14c60f0a9d8106",
    "createdAt": "2020-01-29T15:19:25.738Z",
    "updatedAt": "2020-01-29T15:19:25.738Z",
    "__v": 0
}
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Get all questions</u>

*return  questions list*

* **URL**

  /question

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e30e5459f790f32dcdef3d3",
        "title": "di update",
        "description": "update-an baru yakk",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T01:52:05.973Z",
        "updatedAt": "2020-01-29T09:33:26.520Z",
        "__v": 0
        }
    ]
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    
### <u>Get user's questions</u>

*return  user's questions list*

* **URL**

  /question/user

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e30e5459f790f32dcdef3d3",
        "title": "di update",
        "description": "update-an baru yakk",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T01:52:05.973Z",
        "updatedAt": "2020-01-29T09:33:26.520Z",
        "__v": 0
        }
    ]
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }

### <u>Get one question</u>

*return  one question*

* **URL**

  /question/:id

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
        {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e30e5459f790f32dcdef3d3",
        "title": "di update",
        "description": "update-an baru yakk",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T01:52:05.973Z",
        "updatedAt": "2020-01-29T09:33:26.520Z",
        "__v": 0
        }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }

### <u>Update Question</u>

*return  updated question*

* **URL**

  /question/:id

* **Method**

  `PUT`

* **Data params**

  {
      title: 'pisang',
      description: 'enak'
  }

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
        {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e30e5459f790f32dcdef3d3",
        "title": "pisang",
        "description": "enak",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T01:52:05.973Z",
        "updatedAt": "2020-01-29T09:33:26.520Z",
        "__v": 0
        }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }


### <u>Delete question</u>

*return delete information*

* **URL**

  /question/:id

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        
        "_id": "5e22e8bf6638e22141c6f657",
        "name": "pisang",
        "description": "enak",
        "stock": "20",
        "price": 15000,
        "picture": "https://storage.googleapis.com/mini-wp-upload/1579348811875-irene-3.jpg",
        "UserId": {
            "_id": "5e22e8af6638e22141c6f656",
            "username": "sera",
            "email": "sera@mail.com"
            "__v": 0
            }
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
 

### <u>Update question's upvotes</u>

*return updated question information*

* **URL**

  /question/upvote/:id

* **Method**

  `PATCH`

* **Data params**


  ```
  none
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
        "upvotes": [
            "5e302d742a14c60f0a9d8106"
        ],
        "downvotes": [],
        "_id": "5e31a27d2bcbb816d369499e",
        "title": "test",
        "description": "ada tagnya",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T15:19:25.738Z",
        "updatedAt": "2020-01-29T15:29:03.106Z",
        "__v": 0
    }
    
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Update question's downvotes</u>

*return updated question information*

* **URL**

  /question/downvote/:id

* **Method**

  `PATCH`

* **Data params**


  ```
  none
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
        "upvotes": [],
        "downvotes":  [
            "5e302d742a14c60f0a9d8106"
        ],
        "_id": "5e31a27d2bcbb816d369499e",
        "title": "test",
        "description": "ada tagnya",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T15:19:25.738Z",
        "updatedAt": "2020-01-29T15:29:03.106Z",
        "__v": 0
    }
    
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Get one question's answers</u>

*return answers list*

* **URL**

  /answer/:questionId

* **Method**

  `GET`

* **Data params**


  ```
  none
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    [ {
        "upvotes": [],
        "downvotes": [],
        "question": "5e31a27d2bcbb816d369499e"
        "_id": "5e30e5459f790f32dcdef3d3",
        "title": "di update",
        "description": "update-an baru yakk",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "createdAt": "2020-01-29T01:52:05.973Z",
        "updatedAt": "2020-01-29T09:33:26.520Z",
        "__v": 0
    }]
    
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```



  ### <u>Create answer</u>

*return created product's info*

* **URL**

  /answer

* **Method**

  `POST`

* **Data body**


  ```
  {
      title: 'pisang',
      description: 'enak',
      questionId: '5e31a27d2bcbb816d369499e'
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
        "tags": [],
        "upvotes": [],
        "downvotes": [],
        "_id": "5e31a6f22bcbb816d36949a0",
        "title": "pisang",
        "description": "enak",
        "user": "5e302d742a14c60f0a9d8106",
        "question": "5e302e022a14c60f0a9d8107",
        "createdAt": "2020-01-29T15:38:26.555Z",
        "updatedAt": "2020-01-29T15:38:26.555Z",
        "__v": 0
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Update Answer</u>

*return  updated answer*

* **URL**

  /answer/:answerId

* **Method**

  `PUT`

* **Data params**

  ```
  {
      title: 'update',
      description: 'new description'
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
        "tags": [],
        "upvotes": [],
        "downvotes": [],
        "_id": "5e31a6f22bcbb816d36949a0",
        "title": "updated",
        "description": "new description",
        "user": "5e302d742a14c60f0a9d8106",
        "question": "5e302e022a14c60f0a9d8107",
        "createdAt": "2020-01-29T15:38:26.555Z",
        "updatedAt": "2020-01-29T15:38:26.555Z",
        "__v": 0
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    

### <u>Delete answer</u>

*return delete information*

* **URL**

  /answer/:answerId

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "tags": [],
        "upvotes": [],
        "downvotes": [],
        "_id": "5e31a6f22bcbb816d36949a0",
        "title": "updated",
        "description": "new description",
        "user": "5e302d742a14c60f0a9d8106",
        "question": "5e302e022a14c60f0a9d8107",
        "createdAt": "2020-01-29T15:38:26.555Z",
        "updatedAt": "2020-01-29T15:38:26.555Z",
        "__v": 0
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
 
 ### <u>Update answers's downvotes</u>

*return updated answer information*

* **URL**

  /answer/downvote/:answerId

* **Method**

  `PATCH`

* **Data params**


  ```
  none
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
        "upvotes": [],
        "downvotes":  [
            "5e302d742a14c60f0a9d8106"
        ],
        "_id": "5e31a27d2bcbb816d369499e",
        "title": "test",
        "description": "ada tagnya",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "question": "5e302e022a14c60f0a9d8107",
        "createdAt": "2020-01-29T15:19:25.738Z",
        "updatedAt": "2020-01-29T15:29:03.106Z",
        "__v": 0
    }
    
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```
### <u>Update answers's upvotes</u>

*return updated answer information*

* **URL**

  /answer/upvotes/:answerId

* **Method**

  `PATCH`

* **Data params**


  ```
  none
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
        "upvotes": [
            "5e302d742a14c60f0a9d8106"
        ],
        "downvotes":  [],
        "_id": "5e31a27d2bcbb816d369499e",
        "title": "test",
        "description": "ada tagnya",
        "user": {
            "_id": "5e302d742a14c60f0a9d8106",
            "username": "sera",
            "email": "sera@mail.com",
            "createdAt": "2020-01-28T12:47:48.516Z",
            "updatedAt": "2020-01-28T12:47:48.516Z",
            "__v": 0
        },
        "question": "5e302e022a14c60f0a9d8107",
        "createdAt": "2020-01-29T15:19:25.738Z",
        "updatedAt": "2020-01-29T15:29:03.106Z",
        "__v": 0
    }
    
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```