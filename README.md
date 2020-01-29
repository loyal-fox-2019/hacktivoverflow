#  Hacktiv Overflow

This is a simple application for share question

## Installation

Use the package.json 

```bash
npm i axios bcrypt cors dotenv express jsonwebtoken mongoose
```

## Routes
User:

| Route       | HTTP | Header(s) | Body                                                       | Description              |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | 
| /users/signup  | POST  | null      | {email, password}                                                       |Login & get token |
| /user/signin | POST | null      | {first_name, last_name,email,password}              | Create Account

Question:

| Route       | HTTP | Header(s) | Body                                                       | Description              |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | 
| /questions  | GET | null      | Null                     | Get all Questions   
| /questions/:id  | GET | null      | Null                     | Get a Question   
| /questions/:id  | DELETE | {token}      | Null                     | Delete a Question               |
| /questions/:id  | PUT | {token}      | {title, description, tag}                     | Update a Question               |
| /questions  | POST | {token}      | {title, description, tag}                     |  Create a Question               |
| /questions/upvote/:id  | PATCH | {token}      | null                     |  upvote Question               |
| /questions/upvote/:id  | PATCH | {token}      | null                     |  downvote Question               |
Answer:

| Route       | HTTP | Header(s) | Body                                                       | Description              |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | 
| /answers/:id  | GET | null      | Null                     | Get all Answer with specific Question   
| /answers  | POST | {token}      | {title, description}                     | Create a new answer   
| /answers/:id  | PUT | {token}      | {title, description}                     | update a Answer               |
| /answers/upvote/:id  | PATCH | {token}      | null                     |  upvote Answer               |
| /answers/downvote/:id  | PATCH | {token}      | null                     |  downvote Answer               |

## Deployment

```bash
npm run dev (on folder server)
npm run dev (on folder client) => open on your browser "http://localhost:1234"
```

## Required
you need make file env and fill with:


SECRET = 



## License
Riko Orlando