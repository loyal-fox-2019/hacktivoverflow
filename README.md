# hacktivoverflow

# User

## Register

Melakukan register customer

**URL** : `/users/register`

**Method** : `POST`

**Auth Required** : NO

**Success Status Code** : 201

## Login

Melakukan login

**URL** : `/users/login`

**Method** : `POST`

**Auth Required** : NO

**Request Body**

```json
{
  "email": "harrypotter@hogwarts",
  "password": "password"
}
```

**Success Status Code** : 200

## Logout

Untuk logout

**URL** : `/users/logout`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Get Profile

Untuk mendapatkan informasi login user dengan menggunakan token yang di simpan
pada browser

**URL** : `/`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

# Content

## Get Contents

Mendapat semua content yang ada

**URL** : `/`

**Method** : `GET`

**Auth Required** : NO

**Success Status Code** : 200

## Post Question

Menambahkan pertanyaan kedalam database

**URL** : `/`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 201

## Like Question

Upvote/like pertanyaan

**URL** : `/like/:id`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Dislike Question

Downvote/Dislike pertanyaan

**URL** : `/dislike/:id`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Edit Question

Mengedit question kedalam database

**URL** : `/:id`

**Method** : `PATCH`

**Auth Required** : YES (Owner Only)

## DELETE Question

Menghapus Question dari database

**URL** : `/:id`

**Method** : `DELETE`

**Auth Required** : YES (Owner Only)

**Success Status Code** : 200

# Answer

## Post Answer

Menambahkan transaksi kedalam database

**URL** : `/comment/:id`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 201

## Edit Answer

Mengedit transaksi kedalam database

**URL** : `/comment/:id`

**Method** : `PATCH`

**Auth Required** : YES

## Like Answer

Upvote/like pertanyaan

**URL** : `/likeAnswer/:commentId`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Dislike Answer

Downvote/Dislike pertanyaan

**URL** : `/dislikeAnswer/:commentId`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Get User Question

Mendapatkan seluruh transaksi user

**URL** : `/userContent`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

#ERROR

## Error

**CODE RESPONSE**

403 => diakibatkan oleh email/password salah, token tidak valid yang membuat
aplikasi logout.

401 => request tidak memiliki authorisasi

400 => Bad Request, kesalahan dari client

500 => Error berasal dari internal server
