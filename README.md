# Hacktiv Overflow

An app for posting and asking questions with the world

#### Base URL : `http://localhost:3000`

#### Prerequisites : 
- NodeJS
- NPM
- Vue Cli
- Google credential json file, redirect the path to your credential.json in articleCon.js
- run `npm run dev` on server and `parcel index.html` on client to start both localhost servers

#### Endpoints : 
- ##### Users : 
    - ###### Register
        - URL : `/user/register/`
        - Register a new user
        - Method : `POST`
        - Body : 
            - email : `String`
            - password : `String`
        - On Success : 
            - Status Code : `201`
            - Response : returns a jsonwebtoken
                ````
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlhYmNAbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE1Nzk0NzM0Mjl9.8hkUzVZNQEFHEFnrsDyQybMz9OmdJ_RXxuvOR4CE8ks"
                ````
        - On Fail : 
            - Cause : email/password is required
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "password": {
                                    "message": "Path `password` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `password` is required.",
                                        "type": "required",
                                        "path": "password",
                                        "value": ""
                                    },
                                    "kind": "required",
                                    "path": "password",
                                    "value": ""
                                }
                            },
                            "_message": "User validation failed",
                            "message": "User validation failed: password: Path `password` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````

            - Cause : email is registered
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "password": {
                                    "message": "Path `password` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `password` is required.",
                                        "type": "required",
                                        "path": "password",
                                        "value": ""
                                    },
                                    "kind": "required",
                                    "path": "password",
                                    "value": ""
                                }
                            },
                            "_message": "User validation failed",
                            "message": "User validation failed: password: Path `password` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````
    - ###### Login
        - URL : `/user/login/`
        - Register a new user
        - Method : `POST`
        - Body : 
            - email : `String`
            - password : `String`
        - On Success : 
            - Status Code : `200`
            - Response : returns a jsonwebtoken
                ````
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlhYmNAbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE1Nzk0NzM0Mjl9.8hkUzVZNQEFHEFnrsDyQybMz9OmdJ_RXxuvOR4CE8ks"
                ````
        - On Fail : 
            - Cause : email is not registered
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "user is not registered"
                    }
                    ````

            - Cause : email/password is invalid
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "invalid email/password"
                    }
                    ````
    
- ##### Questions : 
    - All access on this route has to have a valid token in the headers, retrieve a valid token by signing in or signing up
    - Headers : 
        - `token` : `String` __required__
        - On fail :
            ````
            {
                "message": "invalid token"
            }
            ````
    - ###### Create
        - URL : `/questions/register/`
        - Creates a new article
        - Method : `POST`
        - Body : 
            - title : `String` __required__
            - content : `String` __required__
            - author : `String`
            - tags : `Array`
            - upvotes : `Number`
            - replies : `Array`
        - On Success : 
            - Status Code : `201`
            - Response :
                ````
                {
                    "tags": [
                        "test , satu, dua"
                    ],
                    "replies": [
                        "test"
                    ],
                    "_id": "5e31827d0d4e107e9b2d5331",
                    "title": "Ini kenapa yah",
                    "content": "Ada yang tau gak ini kenapa",
                    "author": "Jovi",
                    "upvotes": 100,
                    "createdAt": "2020-01-29T13:02:53.032Z",
                    "updatedAt": "2020-01-29T13:02:53.032Z",
                    "__v": 0
                }
                ````
        - On Fail : 
            - Cause : content/title is required
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "content": {
                                    "message": "Path `content` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `content` is required.",
                                        "type": "required",
                                        "path": "content"
                                    },
                                    "kind": "required",
                                    "path": "content"
                                }
                            },
                            "_message": "Article validation failed",
                            "message": "Article validation failed: content: Path `content` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````

    - ###### Get One Questions
        - URL : `/questions/:_id`
        - Get One Question
        - Method : `GET`
        - On Success : 
            - Status Code : `200`
            - Response : returns an object of one question
                ````
                {
                    "tags": [
                        "test , satu, dua"
                    ],
                    "replies": [
                        "test"
                    ],
                    "_id": "5e31827d0d4e107e9b2d5331",
                    "title": "Ini kenapa yah",
                    "content": "Ada yang tau gak ini kenapa",
                    "author": "Jovi",
                    "upvotes": 100,
                    "createdAt": "2020-01-29T13:02:53.032Z",
                    "updatedAt": "2020-01-29T13:02:53.032Z",
                    "__v": 0
                }
                ````
    - ###### Update
        - URL : `/questions/:_id`
        - Updates a question
        - Method : `PUT`
        - Params : 
            - id : `String`
        - Body : 
            - title : `String` __required__
            - content : `String` __required__
            - author : `String`
            - tags : `Array`
            - upvotes : `Number`
            - replies : `Array`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "message": "updated successfully"
                }
                ````
    - ###### Delete
        - URL : `/article/:_id`
        - Deletes a question
        - Method : `DELETE`
        - Params : 
            - id : `String`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "message": "deleted successfully"
                }
                ````
    
    