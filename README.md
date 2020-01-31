# hacktivoverflow

#### Getting Started

Welcome to HacktivOverflow API Documentation, You can use the API to access HacktivOverflow API endpoints.

First of All you need some dependencies

```
//install some core application
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo apt-get install redis-server

//install dependencies
$ npm install

//running the server
$ npm run dev
```

All API can be accessed from the `http://localhost:3000`

To Use API Endpoints, the format is as follows:

`http://localhost:3000/{resource}`

### Users Login & Register

------

##### POST `/users/register/`

```
url:'http://localhost:3000/users/',
method:'POST',
body:{
	'name' : 'Your Full Name',
	'username' : 'yourusername',
	'email': your@mail.com,
	'password' : 'yoursuperpassword'
}

response:{
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yjc2YjQwZCIsInVzZXJuYW1lIjoidXNlcnRlc3Rkb2MiLCJpYXQiOjE1ODAzOTA4NjF9.BQy_CFlWbEN3_HR9i2hiYnledD2ojH3YPFmp7iHj36Q",
    "id": "5e32d9cde88759227b76b40d"
}
```

##### POST `/users/login/`

```
url:'http://localhost:3000/users/',
method:'POST',
body:{
	'email': your@mail.com,
	'password' : 'yoursuperpassword'
}

response:{
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yjc2YjQwZCIsInVzZXJuYW1lIjoidXNlcnRlc3Rkb2MiLCJpYXQiOjE1ODAzOTA4NjF9.BQy_CFlWbEN3_HR9i2hiYnledD2ojH3YPFmp7iHj36Q",
    "id": "5e32d9cde88759227b76b40d"
}

```

### QUESTION

------

##### GET `/questions/`

```
url:'http://localhost:3000/questions',
method:'GET'

response:[
	{
        "upvote": [],
        "downvote": [],
        "_id": "5e32b78ce88759227b76b40b",
        "userId": {
            "_id": "5e32b691e88759227b76b40a",
            "username": "yourusername"
        },
        "title": "Your Question",
        "description": "<p>Your Description with WYSIWIG</p>",
        "__v": 0
    },
    ....
]
```

##### GET `/questions/{id}`

```
url:'http://localhost:3000/questions/5e33068be88759227b76b411'
method: 'GET'

response :{
    "upvote": [],
    "downvote": [],
    "_id": "5e33068be88759227b76b411",
    "userId": "5e32c9b6e88759227b76b40c",
    "title": "Your Question Detail",
    "description": "Your Question Description",
    "__v": 0
}
```

##### POST `/questions/`

```
url:'http://localhost:3000/questions/',
method:'POST',
headers:{
	token:{token}
},
body:{
	'title':'Your Question Title',
	'description':'<p>Your Description with WYSIWIG</p>'
}

response:{
    "upvote": [],
    "downvote": [],
    "_id": "5e33068be88759227b76b411",
    "userId": "5e32c9b6e88759227b76b40c",
    "title": "Your Question Detail",
    "description": "Your Question Description",
    "__v": 0
}
```

##### PUT `/question/{id}`

```
url:'http://localhost:3000/questions/5e33068be88759227b76b411'
method:'PUT',
headers:{
	token:{token}
},
body:{
	'title':'Your Edited Title',
	'description':'<p>Your Edited Description</p>'
}

response :{
    "message": "Question Updated"
}
```

##### DELETE `/question/{id}`

```
url:'http://localhost:3000/questions/5e33068be88759227b76b411'
method:'DELETE'
headers:{
	token:{token}
}

response: {
    "message": "Question Deleted"
}
```



### ANSWER

------

##### GET `/answers/`

```
url:'http://localhost:3000/answers/'
method:'GET',

response : [
    {
        "upvote": [],
        "downvote": [],
        "_id": "5e330892e88759227b76b413",
        "description": "<p>Your Answer Description/p>",
        "questionId": "5e32b06de2097511f6af3f48",
        "userId": "5e330877e88759227b76b412",
        "__v": 0
    },
    ....
]
```

##### GET `/answers/{questionId}`

```
url:'http://localhost:3000/answers/5e330892e88759227b76b413'
method:'GET',

response:[
	    {
        "upvote": [],
        "downvote": [],
        "_id": "5e330892e88759227b76b413",
        "description": "<p>Your Answer Description/p>",
        "questionId": "5e32b06de2097511f6af3f48",
        "userId": "5e330877e88759227b76b412",
        "__v": 0
    },
    ....
]
```

##### POST `/answers/`

```
url:'http://localhost:3000/answers/'
method:'POST',
headers:{
	token:{token}
},
body:{
	description:'<p>Your Answer Description</p>'
	questionId:'5e32b06de2097511f6af3f48'
}

response:{
    "upvote": [],
    "downvote": [],
    "_id": "5e330d04e88759227b76b417",
    "description": "Your Answer",
    "questionId": "5e32b06de2097511f6af3f48",
    "userId": "5e32c9b6e88759227b76b40c",
    "__v": 0
}
```

##### PUT `/answers/{id}`

```
url:'http://localhost:3000/answers/5e330d04e88759227b76b417'
method:'POST',
headers:{
	token:{token}
},
body:{
	description:'<p>Your Answer Description</p>'
}

response:{
    "message": "Answer Edited"
}
```



### ERROR HANDLING

------


- Validation Login

  ```
  Status Code : 400

  response : {
  	message: "Email / Password Wrong"
  }
  ```

- Not Found

  ```
  Status Code : 404

  response:{
  	message:"Item Not Found"
  }
  ```

- Token Validation

  ```
  Status Code : 400

  response:{
  	message:"Invalid Token"
  }
  ```

- Unauthorized

  ```
  Status Code : 401

  response:{
  	message:"Authentication Required"
  }
  ```

- Validation Error

  ```
  Status Code : 400

  response:{
  	message:"Invalid Email Format"
  }
  ```

- Internal Server Error

  ```
  Status Code : 500

  response:{
  	message:"Internal Server Error"
  }
  ```

