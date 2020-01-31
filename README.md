# hacktivoverflow

## Register User**

Returns json data about newly registered user.

- **URL**

  /user/register

- **Method:**

  `POST`

- **Data Params**

  &nbsp; name: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

- **Success Response:**

  - **Code:** 201 <br />

    ```javascript
        {
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "$2a$10$8S4ZHyFYKZmiO4enOcYpKOBnl5EY.utDcrdlSLTTs3zG5QdFMDcVS",
        "watchedTags": [],
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />

    ```javascript
    {
        "error": ['Input name','Input email','Input password','Password must be at    least 6 characters']
    }
    ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/register`,
        method: `post`,
        data: {
            name: Username,
            email: user@email.com,
            password: `password`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Login User**

Returns json data Delete a answer and return JSON data.

URL

/answer

Method:

DELETE

Success Response:

Code: 201<br />Content:

￼
{
    "token": "2av23jjfsdjfpoiqyudb89qw6e7800sad9678fb6a98asdy8979tba8shvas87d6"
}

 Error Response:

Code: 400 Error <br />Content:

￼
{
      "errors": ['Input email','Input password']
  }
Sample Call:

￼
  $.ajax({
        method:"post",
        url:"http://localhost:3000/user/login",
        data:{
            email,	password

   		}
    })
  ## 

￼
- ## **Vote answer**
Update an answer and return JSON data.about a single user.

- **URL**

  /answer/:id

- **Method:**

  `PATCH`

- **Data**

  Vote:1 / -1
  
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    {   "n": 1,
         "nModified": 1,
        "ok": 1}
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "errors": "Internal server error",
    }
    ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/answer/:id`,
        method: `patch`,
        data: {
            vote: 1
        },
        headers: {token: localStorage.getItem('token')}
    })
  ```

## 

- ## Vote question**

  Update an answer and return JSON data.about a single user.

- **URL**

  /question/:id

- **Method:**

  `PATCH`

- **Data**

  Vote:1 / -1

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    {   "n": 1,
         "nModified": 1,
        "ok": 1}
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "errors": "Internal server error",
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/question/:id`,
        method: `patch`,
        data: {
            vote: 1
        },
        headers: {token: localStorage.getItem('token')}
    })
  ```

## 

## Get Questions**

Returns json data of questions.

- **URL**

  /question

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
    {
        "answers": [],
        "tags": [
            "asdf"
        ],
        "_id": "5dfc14a3613ffe60fab711de",
        "title": "asdf",
        "description": "asdf",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
    },
    {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "title": "How to python?",
        "description": "Just python",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `get`
    })
  ```

  ## 

  - ## Create Question**

Add a question.

- **URL**

  /question

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "title": "How to python?",
        "description": "Just python",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
        }
    ]
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": ['Input title','Input description','Input tags'],
    }
    ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `post`,
        data:{
            title,description,tags
        },
        headers: {token: localStorage.getItem('token')}
    })
```
  
## 
  
  - ## **Update question**

Update a question and return JSON data.

- **URL**

  /question/:id

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        Errors: ['Internal server error']
    }
  ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/question/:id",
          data:{
              title,description,tsgs
          },
          headers: { token: localStorage.getItem('token')}
      })
```
  
  ## 
  
    -   ## Delete Question**

Delete a question and return JSON data.

- **URL**

  /question/:id

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        Errors: ['Internal server error']
    }
  ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
          method:"delete",
          url:"http://localhost:3000/question/:id",
          headers: {token: localStorage.getItem('token')}
      })
  ```
  
    ## 

    ## 

## Get Answers**

Returns json data of answers.

- **URL**

  /answer

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
    {
    {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "description": "Just python",
        "question": "5dfc40d919fcf32c05e92c6c",
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "votes": []
        "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `get`
    })
  ```

  ## 

  - ## Create Answer**

Add a answer.

- **URL**

  /answer

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "description": "Just python",
        "question": "5dfc40d919fcf32c05e92c6c",
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "votes": []
        "__v": 0
        }   
    ]
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": ['Internal Server Error']
    }
    ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/answer`,
        method: `post`,
        data:{
            description
        },
        headers: {token: localStorage.getItem('token')}
    })
```
  
## 
  
  - ## **Update answer**

Update an answer and return JSON data.

- **URL**

  /answer/:id

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "nModified": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/answer",
          data:{
              description
          },
          headers: { token: localStorage.getItem('token')}
      })
```
  
 
  
