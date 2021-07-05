# hacktivoverflow

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
