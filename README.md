# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the user input, hashes the password, and stores the user information in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:

| Field                | Type   | Required | Description                                       |
|----------------------|--------|----------|---------------------------------------------------|
| `fullName.firstName` | String | Yes      | The first name of the user (minimum 3 characters).|
| `fullName.lastName`  | String | No       | The last name of the user (minimum 3 characters). |
| `email`              | String | Yes      | The email address of the user (must be valid).    |
| `password`           | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "your-jwt-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
1. **Validation Errors**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "First name must be at least 3 characters.",
           "param": "fullName.firstName",
           "location": "body"
         },
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Missing Fields**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "All fields are required."
     }
     ```

### Notes
- The password is hashed before being stored in the database.
- The `password` field is excluded from the user object in the response for security reasons.
- Ensure that the `JWT_SECRET` environment variable is set in your application for token generation.

### How to Use
1. Send a `POST` request to `/users/register` with the required JSON body.
2. Handle the response to retrieve the JWT and user details.
3. Use the JWT for authentication in subsequent requests.

KshitizRajan7: create a readme.md file to docs the /users/register endpoint with description and status code , also write how the data is required in the end point, create md file in the backend folder

GitHub Copilot: ```markdown
# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the user input, hashes the password, and stores the user information in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:

| Field                | Type   | Required | Description                                       |
|----------------------|--------|----------|---------------------------------------------------|
| `fullName.firstName` | String | Yes      | The first name of the user (minimum 3 characters).|
| `fullName.lastName`  | String | No       | The last name of the user (minimum 3 characters). |
| `email`              | String | Yes      | The email address of the user (must be valid).    |
| `password`           | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "your-jwt-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
1. **Validation Errors**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "First name must be at least 3 characters.",
           "param": "fullName.firstName",
           "location": "body"
         },
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Missing Fields**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "All fields are required."
     }
     ```

### Notes
- The password is hashed before being stored in the database.
- The `password` field is excluded from the user object in the response for security reasons.
- Ensure that the `JWT_SECRET` environment variable is set in your application for token generation.

### How to Use
1. Send a `POST` request to `/users/register` with the required JSON body.
2. Handle the response to retrieve the JWT and user details.
3. Use the JWT for authentication in subsequent requests.
```

KshitizRajan7: add docs for /user/login endpoint

GitHub Copilot: ```markdown
# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the user input, hashes the password, and stores the user information in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:

| Field                | Type   | Required | Description                                       |
|----------------------|--------|----------|---------------------------------------------------|
| `fullName.firstName` | String | Yes      | The first name of the user (minimum 3 characters).|
| `fullName.lastName`  | String | No       | The last name of the user (minimum 3 characters). |
| `email`              | String | Yes      | The email address of the user (must be valid).    |
| `password`           | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "your-jwt-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
1. **Validation Errors**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "First name must be at least 3 characters.",
           "param": "fullName.firstName",
           "location": "body"
         },
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Missing Fields**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "All fields are required."
     }
     ```

---

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It validates the user input, checks the credentials against the database, and returns a JSON Web Token (JWT) upon successful login.

### Method
`POST`

### Request Body
The request body should be in JSON format and must include the following fields:

| Field      | Type   | Required | Description                                       |
|------------|--------|----------|---------------------------------------------------|
| `email`    | String | Yes      | The email address of the user (must be valid).    |
| `password` | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "your-jwt-token",
    "user": {
      "_id": "user-id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
1. **Validation Errors**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         },
         {
           "msg": "Password must be of 6 characters at least.",
           "param": "password",
           "location": "body"
         }
       ]
     }
     ```

2. **Invalid Credentials**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Invalid email or password"
     }
     ```

---

### Notes
- The `password` is compared with the hashed password stored in the database.
- Ensure that the `JWT_SECRET` environment variable is set in your application for token generation.

### How to Use
1. Send a `POST` request to `/users/login` with the required JSON body.
2. Handle the response to retrieve the JWT and user details.
3. Use the JWT for authentication in subsequent requests.
```

## Endpoint: `/users/profile`

### Description
This endpoint retrieves the profile information of the currently authenticated user.

### Method
`GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Example Request
```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response
```json
{
  "user": {
    "_id": "645a1d7b8d2f1d3c4c8b4567",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```
## Endpoint: `/users/profile` 

### Description
This endpoint retrieves the profile information of the currently authenticated user.

### Method
`GET`

### Authentication
Requires a valid JWT token in either:
- Authorization header: `Bearer <token>`
- Cookie: `token=<token>`

### Example Request
```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhMWQ3YjhkMmYxZDNjNGM4YjQ1NjciLCJpYXQiOjE2ODM2NjQ4NDB9.tJ1JKzFxPh1JvG4k9iV7P8Fe8Llxz78NT1JQ2E0dTFc
```

### Example Responses

#### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "_id": "645a1d7b8d2f1d3c4c8b4567",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses

1. **No Token Provided**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Authentication required"
     }
     ```

2. **Invalid Token**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Invalid token"
     }
     ```

3. **Blacklisted Token**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Token has been invalidated"
     }
     ```

4. **User Not Found**
   - **Status Code:** `404 Not Found`
   - **Body:**
     ```json
     {
       "message": "User not found"
     }
     ```

## Endpoint: `/users/logout`

### Description
This endpoint logs out the currently authenticated user by invalidating (blacklist) their token and clearing the cookie.

### Method
`GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Example Request
```http
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Response
```json
{
  "message": "Logged out successfully"
}
```

### Example Error Response
```json
{
  "message": "No token provided"
}
```