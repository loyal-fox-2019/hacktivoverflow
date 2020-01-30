# hackoverflow

**Base URL:** http://stackoverflow2.s3-website-ap-southeast-1.amazonaws.com/

**User Routes:**

| Routes             | Method | Description                    |
| ------------------ | ------ | ------------------------------ |
| /users/login       | POST   | Sign in / login User           |
| /users/register    | POST   | Sign Up / Register new user    |


**Question Routes:**

| Routes              | Method | Description                          |
| --------------------| ------ | ------------------------------------ |
| /questions          | GET    | Find all question user               |
| /questions/:id      | GET    | Find one question user               |
| /questions          | POST   | Add new question                     |
| /questions/:id      | DELETE | Delete one question with id          |
| /questions/:id      | PUT    | Update question with id todo         |
| /questions/up/:id   | PATCH  | Update upvotes on question           |
| /questions/down/:id | PATCH  | Update downvotes on question         |


**Answer Routes:**

| Routes              | Method | Description                        |
| --------------------| ------ | ---------------------------------- |
| /answers            | GET    | Find all answer user               |
| /answers/:id        | GET    | Find one answer user               |
| /answers            | POST   | Add new answer                     |
| /answers/:id        | DELETE | Delete one answer with id          |
| /answers/:id        | PUT    | Update answer with id todo         |
| /answers/up/:id     | PATCH  | Update upvotes on answer           |
| /answers/down/:id   | PATCH  | Update downvotes on answer         |

**Question Routes:**

| Routes              | Method | Description                          |
| --------------------| ------ | ------------------------------------ |
| /questions          | GET    | Find all question user               |


**Errors:**

| Code | Name                          | Description                  |
| ---- | ----------------------------- | ---------------------------- |
| 401  | ValidationError               | error by validation database |
| 401  | UnAuthorise                   | user not autorised           |
| 400  | CastError / JsonWebTokenError | error about token            |
| 404  | Not found                     | data not found               |
| 500  | internal server error         | error by server              |


## **Register User**
- **URL:** `/users/register`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`username: user`
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`201`**Content:**
    ```
  {
    "message": "register succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjU1MmNkZmM2YjY4NjYyZWM4ZmQwNCIsIm5hbWUiOiJ0aW5hIiwiZW1haWwiOiJ0aW5hQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkRkVmQVR5RHE2ZWZ0UGRJWDdaNzBHdU9yd2pVdVBUWWZ2Sk1WcnlpWHJYYzNJOUwzdUNsNi4iLCJfX3YiOjB9LCJpYXQiOjE1Nzk1MDQzMzN9.rNL8H5XvdZtGbjcDrYAMzBbjIBwYu5CZS0Pv3HBqivM",
    "user": {
        "email": "user@mail.com",
        "_id": "5e2552cdfc6b68662ec8fd04",
        "username": "user"
    }
}
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`401`**Content:**
    ```
        [
            'message' : 'Validation Error'
        ]
    ```

## **Login User**
- **URL:** `/users/login`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
   {
    "message": "login succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjFlYzVkYjk5ZTIyMWE1MTNjNDIxZSIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZVhBZjZ4TDhvMHlDRkFWa0VDV21MTy5BcU1DY1ZuY1pCSFlsZ0VmempUSEFvS0p3aFg0WGUiLCJfX3YiOjB9LCJpYXQiOjE1Nzk1MDQyOTZ9.-HPvoj-nYjahSYE8qqA1ErHGUlOEQQPjpfLVBby30WM",
    "user": {
        "email": "user@mail.com",
        "_id": "5e21ec5db99e221a513c421e",
        "username": "user"
    }
}
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`404`**Content:**
    ```
        [
            'message' : 'not found'
        ]
    ```


## **Find All Question**
- **URL:** `/questions`
- **Method:** `GET`
- **URL Params:** `None` 
- **Headers:** `none`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        [
            {
                "tags": [],
                "upVotes": [],
                "downVotes": [],
                "_id": "5e31312efc4ff2411a42de0a",
                "title": "test question",
                "desc": "description",
                "user_id": "5e312ed97ba3d63f23b69dae",
                "createdAt": "2020-01-29T07:15:58.649Z",
                "updatedAt": "2020-01-29T07:15:58.649Z",
                "__v": 0
            },
            {
                "tags": [],
                "upVotes": [],
                "downVotes": [
                    "5e312ed97ba3d63f23b69dae"
                ],
                "_id": "5e313151c67d24413cd6c7b0",
                "title": "test question",
                "desc": "updated title2",
                "user_id": "5e312ed97ba3d63f23b69dae",
                "createdAt": "2020-01-29T07:16:33.304Z",
                "updatedAt": "2020-01-29T07:19:24.577Z",
                "__v": 0
            }
        ]
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

## **Create Question**
- **URL:** `/questions`
- **Method:** `POST`
- **URL Params:** `None` 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** 
    -`title: test`
    -`description: test description`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "message": "new Question created!",
            "question": {
                "upVotes": [],
                "downVotes": [],
                "_id": "5e313151c67d24413cd6c7b0",
                "title": "test,
                "desc": "test description",
                "user_id": "5e312ed97ba3d63f23b69dae",
                "createdAt": "2020-01-29T07:16:33.304Z",
                "updatedAt": "2020-01-29T07:16:33.304Z",
                "__v": 0
            }
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Delete Question**
- **URL:** `/articles`
- **Method:** `DELETE`
- **URL Params:** `id` **id of question** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Upvote Question**
- **URL:** `/questions/up`
- **Method:** `PATCH`
- **URL Params:** `id` **id of question** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Downvote Question**
- **URL:** `/questions/down`
- **Method:** `PATCH`
- **URL Params:** `id` **id of question** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

## **Find All Answer**
- **URL:** `/questions`
- **Method:** `GET`
- **URL Params:** `None` 
- **Headers:** `none`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        [
            {
                "upVotes": [],
                "downVotes": [],
                "_id": "5e313209c67d24413cd6c7b1",
                "desc": "test answer ketiga",
                "idQuestion": "5df9c1881b9c370366c0bfca",
                "idUser": "5e312ed97ba3d63f23b69dae",
                "__v": 0
            }
        ]
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```


## **Create Answer**
- **URL:** `/answers`
- **Method:** `POST`
- **URL Params:** `None` 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** 
    -`title: test`
    -`description: test description`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "message": "new Answers created!",
            "answer": {
                "upVotes": [],
                "downVotes": [],
                "_id": "5e313151c67d24413cd6c7b0",
                "title": "test,
                "desc": "test description",
                "user_id": "5e312ed97ba3d63f23b69dae",
                "createdAt": "2020-01-29T07:16:33.304Z",
                "updatedAt": "2020-01-29T07:16:33.304Z",
                "__v": 0
            }
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Upvote Answer**
- **URL:** `/answers/up`
- **Method:** `PATCH`
- **URL Params:** `id` **id of answer** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Downvote Answer**
- **URL:** `/answers/down`
- **Method:** `PATCH`
- **URL Params:** `id` **id of answer** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```