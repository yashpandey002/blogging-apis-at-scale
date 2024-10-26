# API

BaseURL: `https://api.blog.site/api/v1`

## Responses

### Success

```json
{
    "status": "success",
    "code": 200,
    "message": "Success",
    "data": {},
    "meta": {
        "page": 1,
        "total_pages": 1,
        "per_page": 10,
        "total": 0
    }
}
```

### Error

```json
{
    "status": "error",
    "code": 400,
    "message": "Bad Request",
    "data": {},
    "meta": {}
}
```

## Endpoints

### Users

#### `POST /users/` - Signup / Create User

Responses:

-   201: User Created
-   400: Bad Request (wrong email / short password)
-   409: Conflict (email/username already exists)

#### `POST /users/login` - Login User

Responses:

-   200: User Logged In
-   400: Bad Request (wrong email format)
-   404: Username/email not found
-   401: Unauthorized (wrong password)

> [!NOTE]
> Some APIs chose to return 401 for both wrong password as well as non-existent email/username.

#### `GET /users/{username}` - Get User Profile

Responses:

-   200: User Profile
-   404: User Not Found

#### `PUT /users/{username}/follow` 🔐 - Follow User

Responses:

-   202: User Followed
-   401: Unauthorized
-   404: User Not Found

#### `DELETE /users/{username}/follow` 🔐 - Unfollow User

Responses:

-   202: User Unfollowed
-   401: Unauthorized
-   404: User Not Found

### Articles

#### `GET /articles/` - Get All Articles

Responses:

-   200: List of Articles

#### `GET /articles/{slug}` - Get Single Article

Responses:

-   200: Article
-   404: Article Not Found

#### `POST /articles/` 🔐 - Create Article

Responses:

-   201: Article Created
-   400: Bad Request (missing title etc)
-   401: Unauthorized

#### `PATCH /articles/{slug}` 🔐 - Update Article

Responses:

-   202: Article Updated
-   400: Bad Request (missing title etc)
-   401: Unauthorized
-   403: Forbidden (not the author)
-   404: Article Not Found

#### `DELETE /articles/{slug}` 🔐 - Delete Article

Responses:

-   202: Article Deleted
-   401: Unauthorized
-   403: Forbidden (not the author)
-   404: Article Not Found

#### `PUT /articles/{slug}/like` 🔐 - Favourite Article

Responses:

-   202: Article Favourited
-   401: Unauthorized
-   404: Article Not Found

#### `DELETE /articles/{slug}/like` 🔐 - Unfavourite Article

Responses:

-   202: Article Unfavourited
-   401: Unauthorized
-   404: Article Not Found

### Comments

#### `GET /articles/{slug}/comments` - Get All Comments of an Article

Responses:

-   200: List of Comments
-   404: Article Not Found

#### `POST /articles/{slug}/comments` 🔐 - Create Comment

Responses:

-   201: Comment Created
-   400: Bad Request (missing body)
-   401: Unauthorized
-   404: Article Not Found

#### `DELETE /articles/{slug}/comments/{id}` 🔐 - Delete Comment

Responses:

-   202: Comment Deleted
-   401: Unauthorized
-   403: Forbidden (not the author)
-   404: Comment Not Found or Article Not Found
