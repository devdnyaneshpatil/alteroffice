# Multi-Level Comment System

## Description

This project is a social media API built using Node.js, Express, and MongoDB. It supports user authentication, posting, commenting, and replying to comments, with nested replies and pagination. The project is dockerized for easy setup and deployment.

## Features

- **User Registration:** Users can create their acoount.
- **User Login:**
  - User can login to account
- **Create Post:** Users can create a post.
- **Comment on Post:** Users can comment on post.
- **Reply To Comment:** Users can reply to any comment.
- **See Comments:** Users can see what are the comments on the post. -**Expand Perticular Comment:** Users can expand the perticular comment.

## Installation

### For Backend Server

1. Clone the repository: `git clone https://github.com/devdnyaneshpatil/alteroffice.git`
2. Install dependencies: `npm install`
3. Create a `.env` file.
4. Add MongoDB URL in the `.env` file for connection: `MONGO_DB_URI = <Mongo Database URL>`
5. Add JWT_SECRET_KEY in the `.env` file: `JWT_SECRET_KEY = <Your JWT secret key>`
6. Add the port number in the `.env` file: `PORT = <port number>`
7. Start the backend server: `npm run dev`

### For Swagger Documentation

- Link:- `https://user-manangement-2.onrender.com/api/v1/docs/`

## Tech Stack

- **Backend:** NodeJs, Express, MongoDB, JSON Web Token (JWT),bcrypt.

## API Endpoints

-**BaseUrl** `https://user-manangement-2.onrender.com/api/v1`

### Auth Routes

#### 1. Register

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Parameters:**
  - `userName` (string): User's name.
  - `password` (string): User's password.
- **Response:**
  - Success: 201 OK, User Created successfully, along with user details and authentication token.
  - Conflict: 409 conflict, User already exists.
  - Error: 400 Bad Request, Error message.

#### 2. Login

- **Endpoint:** `POST /auth/login`
- **Description:** Logs in an existing user.
- **Parameters:**
  - `userName` (string): User's userName.
  - `password` (string): User's password.
- **Response:**
  - Success: 200 OK, Login successful, along with authentication token.
  - Not Found: 404 OK, User not found.
  - Unauthorized: 401 OK, Incorrect password.
  - Error: 400 Bad Request, Error message.

### Post Routes

### 1. Create Post

- **Endpoint:** `POST /posts/create-post`
- **Description:** This endpoint allows users to create a new post.

#### Request

- **Headers:**

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

- **Body:**
  ```json
  {
    "title": "Your Post Title",
    "content": "Your post content goes here."
  }
  ```

#### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "msg": "Post Created Successfully",
      "newPost": {
        "title": "First post",
        "content": "First post content",
        "userId": "66c222ef12dd5c0ec2f70500",
        "_id": "66c432046e92922f9cc095a8",
        "createdAt": "2024-08-20T06:04:52.528Z",
        "__v": 0
      }
    }
    ```

### Comment Routes

#### 1. Add Comment

- **Endpoint:** `POST /posts/:postId/comments`
- **Description:** This endpoint allows users to comment on a post.
- **Parameters:**
  - `postId` (string): Post ID.
#### Request

- **Headers:**

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

- **Body:**
  ```json
  {
    "postId": "Id of the post",
    "text": "Text of a comment"
  }
  ```
#### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "msg": "Comment added successfully",
      "newComment": {
        "postId": "66c432046e92922f9cc095a8",
        "parentCommentId": null,
        "userId": "66c222ef12dd5c0ec2f70500",
        "text": "third parent comment on first post",
        "replies": [],
        "_id": "66c432e06e92922f9cc095b5",
        "createdAt": "2024-08-20T06:08:32.720Z",
        "__v": 0
      }
    }
    ```


#### 2. Reply To Comment

- **Endpoint:** `POST /posts/:postId/comments/:commentId/reply`
- **Description:** This endpoint allows users to reply on a comment.
- **Parameters:**
  - `postId` (string): Post ID.
  - `commentId` (string): Comment ID.
#### Request

- **Headers:**

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

- **Body:**
  ```json
  {
    "postId": "Id of the post",
    "commentId":"Comment ID of the comment which you want to reply",
    "text": "Text of a reply"
  }
  ```
#### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
  {
    "msg": "Reply added successfully",
    "newReply": {
        "postId": "66c432046e92922f9cc095a8",
        "parentCommentId": "66c433ac6e92922f9cc095c0",
        "userId": "66c431305ef1265292294b59",
        "text": "first replies reply to second parent comment of firt postt",
        "replies": [],
        "_id": "66c434756e92922f9cc095da",
        "createdAt": "2024-08-20T06:15:17.982Z",
        "__v": 0
    }
  }
    ```

### 3. Get All Comments

- **Endpoint:** `GET /posts/:postId/comments`
- **Description:** Retrieve all comments for a specific post.

#### Parameters

- `postId` (string): The ID of the post for which comments are being retrieved.

#### Request

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

#### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "data": {
        "docs": [
          {
            "_id": "66c432d96e92922f9cc095b2",
            "postId": "66c432046e92922f9cc095a8",
            "parentCommentId": null,
            "userId": "66c222ef12dd5c0ec2f70500",
            "text": "second parent comment on first post",
            "replies": [
              {
                "_id": "66c433ac6e92922f9cc095c0",
                "text": "first reply to second parent comment of first post",
                "replies": [
                  {
                    "_id": "66c434756e92922f9cc095da",
                    "text": "first replies reply to second parent comment of first post",
                    "createdAt": "2024-08-20T06:15:17.982Z"
                  }
                ],
                "createdAt": "2024-08-20T06:11:56.126Z"
              },
              {
                "_id": "66c433cd6e92922f9cc095ca",
                "text": "second reply to second parent comment of first post",
                "replies": [],
                "createdAt": "2024-08-20T06:12:29.179Z"
              }
            ],
            "createdAt": "2024-08-20T06:08:25.210Z",
            "__v": 2,
            "totalReplies": 2
          },
          {
            "_id": "66c432cd6e92922f9cc095af",
            "postId": "66c432046e92922f9cc095a8",
            "parentCommentId": null,
            "userId": "66c222ef12dd5c0ec2f70500",
            "text": "first parent comment on first post",
            "replies": [],
            "createdAt": "2024-08-20T06:08:13.465Z",
            "__v": 0,
            "totalReplies": 0
          },
          {
            "_id": "66c432e06e92922f9cc095b5",
            "postId": "66c432046e92922f9cc095a8",
            "parentCommentId": null,
            "userId": "66c222ef12dd5c0ec2f70500",
            "text": "third parent comment on first post",
            "replies": [],
            "createdAt": "2024-08-20T06:08:32.720Z",
            "__v": 0,
            "totalReplies": 0
          }
        ],
        "totalDocs": 3,
        "limit": 3,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
      }
    }
    ```
### 4. Expand Particular Comment

- **Endpoint:** `GET /posts/:postId/comments/:commentId/expand`
- **Description:** Retrieve and expand a specific comment along with its replies for a given post.

#### Parameters

- `postId` (string): The ID of the post containing the comment.
- `commentId` (string): The ID of the comment to expand and retrieve replies.

#### Request

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

#### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "data": {
        "comment": "second parent comment on first post",
        "_id": "66c432d96e92922f9cc095b2",
        "postId": "66c432046e92922f9cc095a8",
        "paginatedReplies": [
          {
            "_id": "66c433cd6e92922f9cc095ca",
            "text": "second reply to second parent comment of first post",
            "replies": [],
            "createdAt": "2024-08-20T06:12:29.179Z",
            "repliesCount": 0
          },
          {
            "_id": "66c4468589ecf669d100c83c",
            "text": "third reply to second parent comment of first post",
            "replies": [],
            "createdAt": "2024-08-20T07:32:21.515Z",
            "repliesCount": 0
          }
        ],
        "totalReplies": 3,
        "currentPage": 1,
        "totalPages": 2
      }
    }
    ```


## Deployed Links

## demo admin credentials

email:- omkar@gmail.com
password: Password@123

- **Backend:** [https://user-manangement-2.onrender.com]


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for detai
