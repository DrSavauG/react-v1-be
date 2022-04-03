# 8. TODO List BE

Task: https://github.com/rolling-scopes-school/RS-Short-Track/wiki/8.-TODO-List-BE

# Run app:

 ```
 npm i
 npm audit fix
 MONGO_CONNECTION='put-in-yours-mongoDB-link'
 echo "MONGO_CONNECTION=$MONGO_CONNECTION">.env
 npm start
 ```

## Usage guide

GET /todos/?(page=1&limit=10) returns all todos
GET /todos/:id return one todo by id
POST /todos creates a todo
PATCH /todos/:id patches todo by id
DELETE /todos/:id deletes todo by id


Your POST request should include:
* **title (required)** - string|number
* **body (optional, false by default)** - : boolean

# Example:

    {
        "title": "todo something",
        "body": false
    }
