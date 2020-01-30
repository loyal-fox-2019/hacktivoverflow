# hacktivoverflow

#### This app was build by Express and Mongoose

#### All routes must initially be given _http://18.218.235.90:3000_

# List of User routes:

### User Register

*POST* _http://18.218.235.90:3000/user/register_ 

```javascript
method: 'post',
url: 'http://18.218.235.90:3000/user/register',
data: {
    email: 'rafael@mail.com',
    name: 'Rafael Alviano Dafito',
    password: 'b1625nfb'
}

response: {
    "message": "New user has been created",
    "body": {
        "_id": "5e32b20321611e640ede77a6",
        "email": "rafael.hrhp123@gmail.com",
        "name": "Rafael Alviano Dafito",
        "password": "$2b$08$K4Gw9K5H5lnq14KGtObDlec4wZJ0lBF4npQtNn2kOiYtdWY2ZLoBO",
        "__v": 0
    }
}
```
### User Login

*POST* _http://18.218.235.90:3000/user/login_

```javascript
method: 'post',
url: 'http://18.218.235.90:3000/user/privateAuth',
data: {
    email: 'rafael.hrhp@yahoo.com',
    paswsword: 'b1625nfb'
}

response: {
    "message": "OK",
    "body": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJhNzVkMGYyZmJmNjFmNzQ1Mjk1ZCIsImlhdCI6MTU4MDM4MDcxNH0.kYLyqS4l2FTn-krtEnPVHDyP0CHqpvzbKlILgF1MXcg"
}
```

### User Payload

```javascript
method: 'post',
url: 'http://18.218.235.90:3000/user/payload',
headers: {
    token: ('Your user token')
}

response: {
    "message": "OK",
    "body": "5e32a75d0f2fbf61f745295d"
}
```

# List of question routes: 

### Get All Question

*GET* _http://18.218.235.90:3000/question_

```javascript
method: 'get',
url: 'http://18.218.235.90:3000/question'

response: {
    "message": "OK",
    "body": [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5e32af5518794422e4c2019d",
            "title": "asd",
            "description": "asd",
            "userId": {
                "_id": "5e32a75d0f2fbf61f745295d",
                "email": "rafael.hrhp@yahoo.com",
                "name": "Rafael Alviano Dafito",
                "password": "$2b$08$bN53xoYLZ5c/N5hiiygdD.240SZMGrMC/.swiiTJ.x2HBirXEIS06",
                "__v": 0
            },
            "__v": 0
        }
    ]
}
```

### Get One Question

*GET* _http://18.218.235.90:3000/question/:id_

```javascript
method: 'get',
url: 'http://18.218.235.90:3000/question/:id',

response: {
    "message": "OK",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e3290846c90ec18ad231d3a",
        "title": "Lorem ipsum",
        "description": "Lorem ipsum sitamet awdawdawdawdafienf;infiasnnagnasigafjefoeajfaesgasgegnsgnsiagaewgea",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```

### Create Question

*POST* _http://18.218.235.90:3000/question_

```javascript
method: 'post',
url: 'http://18.218.235.90:3000/question',
data: {
    title: 'Ayuk kita ngoding',
    description: "Ngocing itu asik loh guys"
},
headers: {
    token: (Your userToken)
}

response: {
    "message": "New question have been posted",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32b62ce0787e654e116da6",
        "title": "Ayuk kita ngoding",
        "description": "Ngocing itu asik loh guys",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```

### Update Question

*PUT* _http://18.218.235.90:3000/question/:id_

```javascript
method: 'put',
url: 'http://18.218.235.90:3000/question/:id',
data: {
    title: "I've got javascript problem",
    description: 'This time i have to solve realy quickly'
}
headers: {
    token: (Your userToken)
}

(Data yang dikembalikan belom terupdate tetapi data di database sudah terupdate)
response: {
    "message": "Question have been updated",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32b62ce0787e654e116da6",
        "title": "Ayuk kita ngoding",
        "description": "Ngocing itu asik loh guys",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```
### Delete Question

*DELETE* _http://18.218.235.90:3000/question/:id_

```javascript 
method: 'delete',
url: 'http://18.218.235.90:3000/question/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "Question have been deleted",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32b62ce0787e654e116da6",
        "title": "I've got javascript problem",
        "description": "This time i have to solve realy quickly",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```

### Downvote Question

*PATCH* _http://18.218.235.90:3000/question/downvotes/:id_

```javascript 
method: 'patch',
url: 'http://18.218.235.90:3000/question/downvotes/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "Question have been downvoted",
    "body": {
        "upvotes": [],
        "downvotes": [
            "5e30570b51d2f582129ce3a1"
        ],
        "_id": "5e3290846c90ec18ad231d3a",
        "title": "Lorem ipsum",
        "description": "Lorem ipsum sitamet awdawdawdawdafienf;infiasnnagnasigafjefoeajfaesgasgegnsgnsiagaewgea",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```

### Upvotes Question

*PATCH* _http://18.218.235.90:3000/question/upvotes/:id_

```javascript 
method: 'PATCH',
url: 'http://18.218.235.90:3000/question/upvotes/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "Question have been upvoted",
    "body": {
        "upvotes": [
            "5e30570b51d2f582129ce3a1"
        ],
        "downvotes": [],
        "_id": "5e3290846c90ec18ad231d3a",
        "title": "Lorem ipsum",
        "description": "Lorem ipsum sitamet awdawdawdawdafienf;infiasnnagnasigafjefoeajfaesgasgegnsgnsiagaewgea",
        "userId": "5e30570b51d2f582129ce3a1",
        "__v": 0
    }
}
```

# List Of Answer Routes: 

### Get All Answer

*GET* _http://18.218.235.90:3000/answer/:id(QuestionId)_

```javascript
method: 'get',
url: 'http://18.218.235.90:3000/answer/:id(QuestionId)'

response: {
    "message": "OK",
    "body": [
        {
            "upvotes": [],
            "downvotes": [],
            "title": "Lorem Ipsum",
            "description": "Lorem Ipsum sit amet",
            "userId": {
                "$oid": "5e30570b51d2f582129ce3a1"
            },
            "questionId": {
                "$oid": "5e31ef85f3115f7a7724dc94"
            },
            "__v": {
                "$numberInt": "0"
            }
        }
    ]
}
```

### Get One Answer

*GET* _http://18.218.235.90:3000/answer/:id(AnswerId)_

```javascript
method: 'get',
url: 'http://18.218.235.90:3000/answer/:id',

response: {
    "message": "OK",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "title": "wadwad",
        "description": "awdwdaw",
        "userId": {
            "$oid": "5e30570b51d2f582129ce3a1"
        },
        "questionId": {
            "$oid": "5e31ef85f3115f7a7724dc94"
        },
        "__v": {
            "$numberInt": "0"
        }
    }
}
```

### Create Answer

*POST* _http://18.218.235.90:3000/answer/:id(questionId)_

```javascript
method: 'post',
url: 'http://18.218.235.90:3000/answer/:id(questionId)',
data: {
    title: 'Yakin?',
    description: "Ngoding itu asik kalo kita jago guyss",
    
},
headers: {
    token: (Your userToken)
}

response: {
    "message": "Answer have been posted",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32c613e0787e654e116da7",
        "title": "Yakin?",
        "description": "Ngoding itu asik kalo kita jago guyss",
        "userId": {
            "_id": "5e30570b51d2f582129ce3a1",
            "email": "rafael.hrhp@yahoo.com",
            "name": "Rafael Alviano Dafito",
            "password": "$2b$08$Dtxj71u2YZobEQuoA4r/PuH57poC7X0IL56TkwoPKqW7h.aWHTVTW",
            "__v": 0
        },
        "questionId": "5e3290846c90ec18ad231d3a",
        "__v": 0
    }
}
```

### Update Answer

*PUT* _http://18.218.235.90:3000/answer/:id_

```javascript
method: 'put',
url: 'http://18.218.235.90:3000/answer/:id',
data: {
    title: "I've got javascript problem",
    description: 'Ngoding itu asik kalo kita jago guyss'
}
headers: {
    token: (Your userToken)
}

(Data yang dikembalikan belom terupdate tetapi data di database sudah terupdate)
response: {
    "message": "OK",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32c613e0787e654e116da7",
        "title": "Yakin?",
        "description": "Ngoding itu asik kalo kita jago guyss",
        "userId": "5e30570b51d2f582129ce3a1",
        "questionId": "5e3290846c90ec18ad231d3a",
        "__v": 0
    }
}
```
### Delete Answer

*DELETE* _http://18.218.235.90:3000/answer/:id_

```javascript 
method: 'delete',
url: 'http://18.218.235.90:3000/answer/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "OK",
    "body": {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e32c613e0787e654e116da7",
        "title": "Yakin kok",
        "description": "Asikk kok sambil belajar",
        "userId": "5e30570b51d2f582129ce3a1",
        "questionId": "5e3290846c90ec18ad231d3a",
        "__v": 0
    }
}
```

### Downvote Answer

*PATCH* _http://18.218.235.90:3000/question/answer/:id_

```javascript 
method: 'patch',
url: 'http://18.218.235.90:3000/answer/downvotes/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "OK",
    "body": {
        "upvotes": [],
        "downvotes": [
            "5e30570b51d2f582129ce3a1"
        ],
        "_id": "5e32c828e0787e654e116da8",
        "title": "Yakin?",
        "description": "Ngoding itu asik kalo kita jago guyss",
        "userId": {
            "_id": "5e30570b51d2f582129ce3a1",
            "email": "rafael.hrhp@yahoo.com",
            "name": "Rafael Alviano Dafito",
            "password": "$2b$08$Dtxj71u2YZobEQuoA4r/PuH57poC7X0IL56TkwoPKqW7h.aWHTVTW",
            "__v": 0
        },
        "questionId": "5e3290846c90ec18ad231d3a",
        "__v": 0
    }
}
```

### Upvotes Question

*PATCH* _http://18.218.235.90:3000/answer/upvotes/:id_

```javascript 
method: 'PATCH',
url: 'http://18.218.235.90:3000/answer/upvotes/:id',
headers: {
    token: (Your userToken)
}

response: {
    "message": "OK",
    "body": {
        "upvotes": [
            "5e30570b51d2f582129ce3a1"
        ],
        "downvotes": [],
        "_id": "5e32c828e0787e654e116da8",
        "title": "Yakin?",
        "description": "Ngoding itu asik kalo kita jago guyss",
        "userId": {
            "_id": "5e30570b51d2f582129ce3a1",
            "email": "rafael.hrhp@yahoo.com",
            "name": "Rafael Alviano Dafito",
            "password": "$2b$08$Dtxj71u2YZobEQuoA4r/PuH57poC7X0IL56TkwoPKqW7h.aWHTVTW",
            "__v": 0
        },
        "questionId": "5e3290846c90ec18ad231d3a",
        "__v": 0
    }
}
```

# ErrorHandler:

*Status 400* _ValidationError_

#### This Error will happen if:

- User email already been used
- One of the required field is empty

```javascript 
{
    errors: ['Email field cannot be empty', 'Name field cannot be empty']
}
```

*Status 400* _BadRequest_

#### This Error will happen if:

- User input the wrong email or password

```javascript 
{
    errors: 'email / password incorrect'
}
```

*Status 400* _JsonWebTokenErro_

#### This Error will happen if:

- User doesn't have or provide token when accessing feature

```javascript 
{
    errors: 'You have to login first to access this area'
}
```

*Status 404* _NotFound_

#### This Error will happen if:

- User edit or delete question that doen't exist
- User edit or delete answer that doen't exist

```javascript 
{
    errors: 'No data were found'
}
```

*Status 403* _NotAuthorized_

#### This Error will happen if:

- User want to delete or update that wasn't theirs

```javascript 
{
    errors: 'You do not have permission to update / delete this data'
}
```
Make sure you have Node.js and npm installed in your computer, and then run these commands:

* $ npm install
* $ npm start
* $ npm run dev