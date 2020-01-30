# API Documentation

## CRUD Users

### Register

**Endpoint**: `POST /users/register`

**Headers**: `none`

**Body**:

```json
{
  "email": String,
  "password": String
}
```

**Responses**:

201 Created

```json
{
  "message": "User has been successfully created!",
  "token": String
}
```

400 Bad Request

```json
{
  "message": "Email and password are required!"
}
```

403 Forbidden

```json
{
  "message": "Email is already registered!"
}
```

### Login

**Endpoint**: `POST /users/login`

**Headers**: `none`

**Body**:

```json
{
  "email": String,
  "password": String
}
```

**Responses**:

200

```json
{
  "message": "User has been successfully login!",
  "token": String
}
```

400 Bad Request

```json
{
  "message": "Email and password are required!"
}
```

403 Forbidden

```json
{
  "message": "Email or password is invalid!"
}
```

---

## CRUD Question

### Create Question

**Endpoint**: `POST /questions`

**Headers**:

```json
{
  "token": String
}
```

**Body**:

```json
{
  "title": String,
  "description": String
}
```

**Response**:

200 OK

```json
{
  "message": "Question succesfully created!"
}
```

400 Bad Request

```json
{
  "message": "Title and description are required!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Read All Question

**Endpoint**: `GET /questions`

**Headers**: `none`

**Body**: `none`

**Response**:

200 OK

```json
{
  "message": "All question successfully fetched!",
  "data": Array
}
```

404 Bad Request

```json
{
  "message": "Question collection is empty!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Read One Question

**Endpoint**: `GET /questions/:id`

**Headers**: `none`

**Body**: `none`

**Response**:

200 OK

```json
{
  "message": "Question successfully fetched!",
  "data": Object
}
```

404 Not Found

```json
{
  "message": "Question is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Update Question

**Endpoint**: `PUT /questions/:id`

**Headers**:

```json
{
  "token": String
}
```

**Body**:

```json
{
  "title": String,
  "description": String
}
```

**Response**:

200 OK

```json
{
  "message": "Question successfully updated!",
  "data": Object
}
```

404 Not Found

```json
{
  "message": "Question is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Delete Question

**Endpoint**: `DELETE /questions/:id`

**Headers**:

```json
{
  "token": String
}
```

**Body**: `none`

**Responses**:

200 OK

```json
{
  "message": "Question successfully deleted!"
}
```

404 Not Found

```json
{
  "message": "Question is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error!"
}
```

---

## CRUD Answer

### Create Answer

**Endpoint**: `POST /answers`

**Headers**:

```json
{
  "token": String
}
```

**Body**:

```json
{
  "content": String
}
```

**Response**:

200 OK

```json
{
  "message": "Answer succesfully created!"
}
```

400 Bad Request

```json
{
  "message": "Content is required!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Read All Answer

**Endpoint**: `GET /answers`

**Headers**: `none`

**Body**: `none`

**Response**:

200 OK

```json
{
  "message": "All answer successfully fetched!",
  "data": Array
}
```

404 Bad Request

```json
{
  "message": "Answer collection is empty!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Read One Answer

**Endpoint**: `GET /answers/:id`

**Headers**: `none`

**Body**: `none`

**Response**:

200 OK

```json
{
  "message": "Answer successfully fetched!",
  "data": Object
}
```

404 Not Found

```json
{
  "message": "Answer is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Update Answer

**Endpoint**: `PUT /answers/:id`

**Headers**:

```json
{
  "token": String
}
```

**Body**:

```json
{
  "title": String,
  "description": String
}
```

**Response**:

200 OK

```json
{
  "message": "Answer successfully updated!",
  "data": Object
}
```

404 Not Found

```json
{
  "message": "Answer is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### Delete Answer

**Endpoint**: `DELETE /answers/:id`

**Headers**:

```json
{
  "token": String
}
```

**Body**: `none`

**Responses**:

200 OK

```json
{
  "message": "Answer successfully deleted!"
}
```

404 Not Found

```json
{
  "message": "Answer is not found!"
}
```

500 Internal Server Error

```json
{
  "message": "Internal server error!"
}
```
