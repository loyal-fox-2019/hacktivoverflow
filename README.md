# hacktivoverflow

hackoverflow.alvinatjia.com

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `name=[string]` <br />
  `email=[string]` <br />
  `password=[string]`
  
- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://34.67.170.173/users/register",
        "data": {
            "name": "Jone Doe",
            "email": "jane@mail.com",
            "password": "PASSWORD"
        }
    })
```

- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5e337728a7f9620ffb01dc81",
            "name": "Jane Doe",
            "email": "jane@mail.com",
            "image": "https://ui-avatars.com/api/?name=Jane Doe&size=512",
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzM3NzI4YTdmOTYyMGZmYjAxZGM4MSIsImlhdCI6MTU4MDQzMTE0NH0.E2TDwJ7TrbZMiTxVDOMSc6QRQf1fSESBtwwFs3i49nY"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "This email jane@mail.com has already been used!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "" }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Sample Request:**

  ```javascript
      axios({
          "method": "POST",
          "url": "http://34.67.170.173/users/login",
          "data": {
              "email": "jane@mail.com",
              "password": "PASSWORD"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e337728a7f9620ffb01dc81",
        "name": "Jane Doe",
        "email": "jane@mail.com",
        "image": "https://ui-avatars.com/api/?name=Jane Doe&size=512",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzM3NzI4YTdmOTYyMGZmYjAxZGM4MSIsImlhdCI6MTU4MDQzMTMxOX0.xjEN9kbswhM2j0oJix3uOKLorYgLLzgLs54IO9_dv3E"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Incorrect email/password" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find logged in user's profile**

- **URL**
  <_/users/profile_>

- **Method:**
  `GET`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
  ```javascript
      axios({
          "method": "GET",
          "url": "http://34.67.170.173/users/5e186c14af790e1a58535cdd",
          "headers": {
              "access_token": "YOUR_ACCESS_TOKEN"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "tags": [],
        "_id": "5e337728a7f9620ffb01dc81",
        "name": "Jane Doe",
        "email": "jane@mail.com",
        "image": "https://ui-avatars.com/api/?name=Jane Doe&size=512",
        "createdAt": "2020-01-31T00:39:04.740Z",
        "updatedAt": "2020-01-31T00:39:04.740Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "User not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all questions in database**

- **URL**
  <_/questions_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/questions",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "tags": [
                "aws"
            ],
            "upvotes": [
                "5e31400cad2361046500bd97"
            ],
            "downvotes": [],
            "answers": 2,
            "_id": "5e32986aa2fa777119184ce7",
            "title": "How to copy files from S3 bucket from one region to another region using aws java sdk?",
            "content": "<p>We have two regions in AWS, where there is a AWS S3 Bucket in each region. How do i copy the files inside the bucket from one region to another using AWS Java SDK?&nbsp;We do not have access to credentials of the source region bucket, but We have a presigned URL for the source of each file in the source region bucket, using which we can download the file and then use the AWS Upload URL to upload it to destination region bucket.&nbsp;There are space constraints while downloading the file, so we are trying to find a way to copy files from bucket in one region to another using AWS Java SDK. is this achievable?&nbsp;Edit:&nbsp;For some more clarity, both buckets are already created, and it is a continuous process to be implemented as part of our code. It is not a one time activity.</p>",
            "poster": {
                "_id": "5e31400cad2361046500bd97",
                "name": "John Doe",
                "email": "john@mail.com"
            },
            "createdAt": "2020-01-30T08:48:42.217Z",
            "updatedAt": "2020-01-30T11:01:32.472Z"
        },
        {
            "tags": [
                "PostgreSQL",
                " array"
            ],
            "upvotes": [],
            "downvotes": [],
            "answers": 1,
            "_id": "5e329d4b1e3d4a721e416bbe",
            "title": "PostgreSQL: Query that splits array of one element into multiple elements based on a delimiter and unnest it",
            "content": "<p>I am new to PostgreSQl and I am not able to find a solution to get the output mentioned below.&nbsp;I have created a table with a column of data type text[], which is an array of text strings (single element).&nbsp;My table looks like this:&nbsp;col1&nbsp;&nbsp;&nbsp;&nbsp;col2 ID1&nbsp;&nbsp;&nbsp;{\"P25963(MI:0326), Homo sapiens);O14920(MI:0326), Homo sapiens)\"} ID2&nbsp;&nbsp;&nbsp;{\"Q8NFZ0(MI:0326), Homo sapiens);P12931(MI:0326), Homo sapiens)\"} ID3&nbsp;&nbsp;&nbsp;{\"P26368(MI:0326), Homo sapiens);Q15637(MI:0326), Homo sapiens); Q15638(MI:0326), Homo sapiens)\"} When I try to access the first and second element of col2, I get below output.&nbsp;SELECT col2[1] FROM table;&nbsp;P25963(MI:0326), Homo sapiens);O14920(MI:0326), Homo sapiens Q8NFZ0(MI:0326), Homo sapiens);P12931(MI:0326), Homo sapiens P26368(MI:0326), Homo sapiens);Q15637(MI:0326), Homo sapiens); Q15638(MI:0326), Homo sapiens SELECT col2[2] FROM table;&nbsp;NULL NULL NULL I would like to split this array element into multiple elements (presence of ;), unnest them and later perform some regex on the unnested rows.&nbsp;The desired output after splitting is:&nbsp;col1&nbsp;&nbsp;&nbsp;&nbsp;col2 ID1&nbsp;&nbsp;&nbsp;&nbsp;{P25963(MI:0326), Homo sapiens},{O14920(MI:0326), Homo sapiens} ID2&nbsp;&nbsp;&nbsp;&nbsp;{Q8NFZ0(MI:0326), Homo sapiens},{P12931(MI:0326), Homo sapiens} ID3&nbsp;&nbsp;&nbsp;&nbsp;{P26368(MI:0326), Homo sapiens},{Q15637(MI:0326), Homo sapiens}, {Q15638(MI:0326), Homo sapiens} The desired output after unnesting is:&nbsp;col1&nbsp;&nbsp;&nbsp;col3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;col4&nbsp;&nbsp;ID1&nbsp;&nbsp;&nbsp;P25963(MI:0326), Homo sapiens&nbsp;&nbsp;&nbsp;&nbsp;O14920(MI:0326), Homo sapiens&nbsp;&nbsp;&nbsp;ID2&nbsp;&nbsp;&nbsp;Q8NFZ0(MI:0326), Homo sapiens&nbsp;&nbsp;&nbsp;&nbsp;P12931(MI:0326), Homo sapiens&nbsp;&nbsp;ID3&nbsp;&nbsp;&nbsp;P26368(MI:0326), Homo sapiens&nbsp;&nbsp;&nbsp;&nbsp;Q15637(MI:0326), Homo sapiens ID3&nbsp;&nbsp;&nbsp;P26368(MI:0326), Homo sapiens&nbsp;&nbsp;&nbsp;&nbsp;Q15638(MI:0326), Homo sapiens Any suggestion would be really helpful.&nbsp;Thanks</p>",
            "poster": {
                "_id": "5e31400cad2361046500bd97",
                "name": "John Doe",
                "email": "john@mail.com"
            },
            "createdAt": "2020-01-30T09:09:31.649Z",
            "updatedAt": "2020-01-30T10:22:21.282Z"
        },
        {
            "tags": [
                "javascript",
                " vue.js"
            ],
            "upvotes": [],
            "downvotes": [],
            "answers": 0,
            "_id": "5e32b93bda8b61185b80e1eb",
            "title": "Condition on value for style on Vue.js",
            "content": "<p>I'd like to check the value of my template</p><pre class=\"ql-syntax\" spellcheck=\"false\">        &lt;template slot=\"projected_end_date\" slot-scope=\"{ line }\"&gt;\n            &lt;datetime-display :value=\"line.projected_end_date\"\n                              type=\"date\"\n            style= \"color: red\"&gt;&lt;/datetime-display&gt;\n         &lt;/template&gt;\n</pre><p>and only set the style for red color when my value is less than current date. Any suggestion? I'm assuming it should be something like</p><pre class=\"ql-syntax\" spellcheck=\"false\">value &gt; DateHelper.now()? style = ...\n</pre><p><br></p>",
            "poster": {
                "_id": "5e31400cad2361046500bd97",
                "name": "John Doe",
                "email": "john@mail.com"
            },
            "createdAt": "2020-01-30T11:08:43.620Z",
            "updatedAt": "2020-01-30T11:08:43.620Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/questions/5e32a3a12008757dc611411d",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "answers": [
            {
                "upvotes": [],
                "downvotes": [
                    "5e31400cad2361046500bd97"
                ],
                "_id": "5e32a3a12008757dc611411d",
                "content": "<p>safasfasf</p>",
                "QuestionId": "5e32986aa2fa777119184ce7",
                "poster": {
                    "_id": "5e31400cad2361046500bd97",
                    "name": "John Doe",
                    "email": "john@mail.com"
                },
                "createdAt": "2020-01-30T09:36:33.029Z",
                "updatedAt": "2020-01-30T10:04:11.437Z"
            },
            {
                "upvotes": [
                    "5e31400cad2361046500bd97"
                ],
                "downvotes": [],
                "_id": "5e32a7952008757dc611411f",
                "content": "<p>When you write&nbsp;<code style=\"background-color: rgb(239, 240, 241);\">handleClick(1)</code>&nbsp;you are actually calling the function at that moment, which causes the function to re-call the&nbsp;<code style=\"background-color: rgb(239, 240, 241);\">render</code>&nbsp;function and anyway to call the same function and so you enter an endless loop. To send the&nbsp;<strong>reference</strong>&nbsp;to a function (that is, the pointer), you have to write it like this:</p><pre class=\"ql-syntax\" spellcheck=\"false\">&lt;button onClick={() =&gt; handleClick(1)}&gt;\n</pre><p><br></p>",
                "QuestionId": "5e32986aa2fa777119184ce7",
                "poster": {
                    "_id": "5e31400cad2361046500bd97",
                    "name": "John Doe",
                    "email": "john@mail.com"
                },
                "createdAt": "2020-01-30T09:53:25.448Z",
                "updatedAt": "2020-01-30T09:53:33.736Z"
            }
        ],
        "_id": "5e32986aa2fa777119184ce7",
        "upvotes": [
            "5e31400cad2361046500bd97"
        ],
        "downvotes": [],
        "title": "How to copy files from S3 bucket from one region to another region using aws java sdk?",
        "content": "<p>We have two regions in AWS, where there is a AWS S3 Bucket in each region. How do i copy the files inside the bucket from one region to another using AWS Java SDK?&nbsp;We do not have access to credentials of the source region bucket, but We have a presigned URL for the source of each file in the source region bucket, using which we can download the file and then use the AWS Upload URL to upload it to destination region bucket.&nbsp;There are space constraints while downloading the file, so we are trying to find a way to copy files from bucket in one region to another using AWS Java SDK. is this achievable?&nbsp;Edit:&nbsp;For some more clarity, both buckets are already created, and it is a continuous process to be implemented as part of our code. It is not a one time activity.</p>",
        "poster": "5e31400cad2361046500bd97",
        "tags": [
            "aws"
        ],
        "createdAt": "2020-01-30T08:48:42.217Z",
        "updatedAt": "2020-01-30T11:01:32.472Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`

---

**Search questions by title**

- **URL**
  <_/questions/filter/title/{keyword}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `keyword=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/questions/filter/title/how",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "tags": [
                "aws"
            ],
            "upvotes": [
                "5e31400cad2361046500bd97"
            ],
            "downvotes": [],
            "answers": 2,
            "_id": "5e32986aa2fa777119184ce7",
            "title": "How to copy files from S3 bucket from one region to another region using aws java sdk?",
            "content": "<p>We have two regions in AWS, where there is a AWS S3 Bucket in each region. How do i copy the files inside the bucket from one region to another using AWS Java SDK?&nbsp;We do not have access to credentials of the source region bucket, but We have a presigned URL for the source of each file in the source region bucket, using which we can download the file and then use the AWS Upload URL to upload it to destination region bucket.&nbsp;There are space constraints while downloading the file, so we are trying to find a way to copy files from bucket in one region to another using AWS Java SDK. is this achievable?&nbsp;Edit:&nbsp;For some more clarity, both buckets are already created, and it is a continuous process to be implemented as part of our code. It is not a one time activity.</p>",
            "poster": {
                "_id": "5e31400cad2361046500bd97",
                "name": "John Doe",
                "email": "john@mail.com"
            },
            "createdAt": "2020-01-30T08:48:42.217Z",
            "updatedAt": "2020-01-30T11:01:32.472Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Filter questions by tag**

- **URL**
  <_/questions/filter/tag/{keyword}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `keyword=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/questions/filter/tag/aws",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "tags": [
                "aws"
            ],
            "upvotes": [
                "5e31400cad2361046500bd97"
            ],
            "downvotes": [],
            "answers": 2,
            "_id": "5e32986aa2fa777119184ce7",
            "title": "How to copy files from S3 bucket from one region to another region using aws java sdk?",
            "content": "<p>We have two regions in AWS, where there is a AWS S3 Bucket in each region. How do i copy the files inside the bucket from one region to another using AWS Java SDK?&nbsp;We do not have access to credentials of the source region bucket, but We have a presigned URL for the source of each file in the source region bucket, using which we can download the file and then use the AWS Upload URL to upload it to destination region bucket.&nbsp;There are space constraints while downloading the file, so we are trying to find a way to copy files from bucket in one region to another using AWS Java SDK. is this achievable?&nbsp;Edit:&nbsp;For some more clarity, both buckets are already created, and it is a continuous process to be implemented as part of our code. It is not a one time activity.</p>",
            "poster": {
                "_id": "5e31400cad2361046500bd97",
                "name": "John Doe",
                "email": "john@mail.com"
            },
            "createdAt": "2020-01-30T08:48:42.217Z",
            "updatedAt": "2020-01-30T11:01:32.472Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Post a question**

- **URL**
  <_/questions_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  **Required:**
  `title=[string]` <br />
  `content=[string]`

  **Optional:**
  `tags=[array of string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://34.67.170.173/questions",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "JsonWebTokenError: jwt malformed",
            "content": "I am getting this error when I try and verify. var decoded = jwt.verify(req.headers.authorization, "12345"); req.headers.authorization is giving me this value: Basic TGlua1NoYWRlc0FsZXhhOjEyMzQ1. I've tried this as well but get the same error: var decoded = jwt.verify(req.headers.authorization.split(' ')[1]), "12345"); Any ideas?",
            "tags": "jwt, jsonwebtoken"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "tags": [
                "jwt",
                " jsonwebtoken"
            ],
            "upvotes": [],
            "downvotes": [],
            "answers": 0,
            "_id": "5e337b57a7f9620ffb01dc83",
            "title": "JsonWebTokenError: jwt malformed",
            "content": "I am getting this error when I try and verify.\n\nvar decoded = jwt.verify(req.headers.authorization, \"12345\");\n\nreq.headers.authorization is giving me this value: Basic TGlua1NoYWRlc0FsZXhhOjEyMzQ1\n\nI've tried this as well but get the same error:\n\nvar decoded = jwt.verify(req.headers.authorization.split(' ')[1]), \"12345\");\n\nAny ideas?",
            "poster": "5e337728a7f9620ffb01dc81",
            "createdAt": "2020-01-31T00:56:55.579Z",
            "updatedAt": "2020-01-31T00:56:55.579Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Question's name is required" }`
  - **Code:** 401 Forbidden <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Vote a question**

- **URL**
  <_/questions/{id}?vote={type}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `id=[string]` <br />
  `type=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "PATCH",
        "url": "http://34.67.170.173/questions/5e337b57a7f9620ffb01dc83?vote=up",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "tags": [
            "jwt",
            " jsonwebtoken"
        ],
        "upvotes": [
            "5e337728a7f9620ffb01dc81"
        ],
        "downvotes": [],
        "answers": 0,
        "_id": "5e337b57a7f9620ffb01dc83",
        "title": "JsonWebTokenError: jwt malformed",
        "content": "I am getting this error when I try and verify.\n\nvar decoded = jwt.verify(req.headers.authorization, \"12345\");\n\nreq.headers.authorization is giving me this value: Basic TGlua1NoYWRlc0FsZXhhOjEyMzQ1\n\nI've tried this as well but get the same error:\n\nvar decoded = jwt.verify(req.headers.authorization.split(' ')[1]), \"12345\");\n\nAny ideas?",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T00:56:55.579Z",
        "updatedAt": "2020-01-31T01:00:45.335Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Edit a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Optional:**
  `title=[string]` <br />
  `content=[string]` <br />
  `tags=[array of string]`

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://34.67.170.173/questions/5e337b57a7f9620ffb01dc83",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "JWT Error malformed"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "tags": [
            "jwt",
            " jsonwebtoken"
        ],
        "upvotes": [
            "5e337728a7f9620ffb01dc81"
        ],
        "downvotes": [],
        "answers": 0,
        "_id": "5e337b57a7f9620ffb01dc83",
        "title": "JWT Error malformed",
        "content": "I am getting this error when I try and verify.\n\nvar decoded = jwt.verify(req.headers.authorization, \"12345\");\n\nreq.headers.authorization is giving me this value: Basic TGlua1NoYWRlc0FsZXhhOjEyMzQ1\n\nI've tried this as well but get the same error:\n\nvar decoded = jwt.verify(req.headers.authorization.split(' ')[1]), \"12345\");\n\nAny ideas?",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T00:56:55.579Z",
        "updatedAt": "2020-01-31T01:03:40.771Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://34.67.170.173/questions/5e337b57a7f9620ffb01dc83",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      "Question successfully deleted"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get an answer**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/answers/5e337e7aa7f9620ffb01dc84",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e337e7aa7f9620ffb01dc84",
        "content": "This is my answer",
        "QuestionId": "5e32986aa2fa777119184ce7",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T01:10:18.149Z",
        "updatedAt": "2020-01-31T01:10:18.149Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Answer not found" }`

---

**Post an answer**

- **URL**
  <_/answers_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  **Required:**
  `QuestionId=[string]` <br />
  `content=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://34.67.170.173/answers",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "QuestionId": "5e32986aa2fa777119184ce7",
            "content": "This is my answer"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5e337e7aa7f9620ffb01dc84",
        "content": "This is my answer",
        "QuestionId": "5e32986aa2fa777119184ce7",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T01:10:18.149Z",
        "updatedAt": "2020-01-31T01:10:18.149Z"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Answer's content is required" }`
  - **Code:** 401 Forbidden <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Vote an answer**

- **URL**
  <_/answers/{id}?vote={type}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `id=[string]` <br />
  `type=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "PATCH",
        "url": "http://34.67.170.173/answers/5e337e7aa7f9620ffb01dc84?vote=down",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "downvotes": [
            "5e337728a7f9620ffb01dc81"
        ],            
        "upvotes": [],
        "downvotes": [],
        "_id": "5e337e7aa7f9620ffb01dc84",
        "content": "This is my answer",
        "QuestionId": "5e32986aa2fa777119184ce7",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T01:10:18.149Z",
        "updatedAt": "2020-01-31T01:10:18.149Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Edit an answer**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `content=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://34.67.170.173/answers/5e337e7aa7f9620ffb01dc84",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "content": "This is not your answer"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "downvotes": [
            "5e337728a7f9620ffb01dc81"
        ],            
        "upvotes": [],
        "downvotes": [],
        "_id": "5e337e7aa7f9620ffb01dc84",
        "content": "This is not your answer",
        "QuestionId": "5e32986aa2fa777119184ce7",
        "poster": "5e337728a7f9620ffb01dc81",
        "createdAt": "2020-01-31T01:10:18.149Z",
        "updatedAt": "2020-01-31T01:10:18.149Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete an answer**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://34.67.170.173/answers/5e337e7aa7f9620ffb01dc84",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      "Answer successfully deleted"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all tags in database**

- **URL**
  <_/tags_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/tags",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        "aws",
        "PostgreSQL",
        " array",
        "javascript",
        " vue.js",
        "jwt",
        " jsonwebtoken"
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Filter tags**

- **URL**
  <_/tags/filter/{keyword}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `keyword=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://34.67.170.173/tags/vu",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        " vue.js"
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Watch a tag**

- **URL**
  <_/tags_>

- **Method:**
  `POST`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `tag=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://34.67.170.173/tags",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "tag": "aws"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "tags": [
            "aws"
        ],
        "_id": "5e337728a7f9620ffb01dc81",
        "name": "Jane Doe",
        "email": "jane@mail.com",
        "password": "$2a$08$V4xGkC8Yx8Q9DDy3jg1zYe89irMxwrFCXOPjfa6KiPwCSoKxAGwqi",
        "image": "https://ui-avatars.com/api/?name=Jane Doe&size=512",
        "createdAt": "2020-01-31T00:39:04.740Z",
        "updatedAt": "2020-01-31T01:21:19.193Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Tag not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---
