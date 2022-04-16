from flask import (
    Flask,
    json,
    request,
    make_response,
    render_template,
    url_for
)

from SimpleServer.logger import logger

users = [
    {
        "id": 1,
        "name": "John",
        "age": 20
    },
    {
        "id": 2,
        "name": "Kate",
        "age": 21,
    },
    {
        "id": 3,
        "name": "Harry",
        "age": 22
    },
    {
        "id": 4,
        "name": "Mary",
        "age": 23
    }
]

app = Flask(__name__, template_folder="html", static_folder='static')

@app.before_request
def logging_request():
    logger.info(' : '.join(("REQUEST", request.method, request.url, "====", request.host)))

@app.after_request
def logging_response(response):
    logger.info(' : '.join(("RESPONSE", request.method, request.url, "====", request.host, response.status)))
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def return_index(path):
    response = make_response(render_template("index.html"))
    return response

@app.route('/hack')
def return_hack():
    response = make_response(render_template("hack.html"))
    response.headers["Content-Type"] = "text/html; charset=utf-8"
    return response

@app.route('/users/<user_id>', methods=['GET', 'DELETE', 'PUT'])
def process_request(user_id):
    if request.method == "GET":
        for user in users:
            if user and user["id"] == int(user_id):
                response = make_response(json.jsonify(user))
                return response
        response = make_response(json.jsonify({"message": "Not Found", "status" : 404}))
        response.status = "404 Not Found"
        return response
    elif request.method == "DELETE":
        for enum, user in enumerate(users):
            if user and user["id"] == int(user_id):
                deleted_user = users.pop(enum)
                response = make_response(json.jsonify({"deletedUser": deleted_user}))
                return response
        response = make_response(json.jsonify({"message": "Not Found", "status" : 404}))
        response.status = "404 Not Found"
        return response
    elif request.method == "PUT":
        proper_fields = set(users[0].keys())
        all_users_ids = set([user["id"] for user in users])
        data = request.json
        if int(user_id) in all_users_ids:
            for key in data:
                if key in proper_fields:
                    users[int(user_id)][key] = data[key]
        else:
            response = make_response(json.jsonify({"message": "Not Found", "status" : 404}))
            response.status = "404 Not Found"
            return response
        response = make_response(json.jsonify(users[int(user_id)]))
        
        return response
    else:
        response = make_response(json.jsonify({"message": "Bad Request", "status" : 400}))
        response.status = "400 Bad Request"
        return response

@app.route('/users', methods=['OPTIONS'])
def return_options():
    
    if request.method == "OPTIONS":
        response = make_response(json.jsonify({"supportedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}))
        return response
    else:
        response = make_response(json.jsonify({"message": "Bad Request", "status" : 400}))
        response.status = "400 Bad Request"
        return response

@app.route('/users', methods=["POST"])
def process_addUser():
    if request.method == "POST":
        new_user = dict()
        standard = {"id", "name", "age"}
        all_users_ids = set([user["id"] for user in users])
        keys = set()
        data = request.json
        for key in data:
            if key in standard:
                if key == "id" and int(data[key]) in all_users_ids:
                    response = make_response(json.jsonify({"message": "Conflict", "status" : 409}))
                    response.status = "409 Conflict"
                    return response
                new_user[key] = data[key]
                keys.add(key)
        if keys == standard:
            users.append(new_user)
            response = make_response(make_response(json.jsonify({"message": "new user created", "code":"success"}, 201)))
            return response
        else:
            response = make_response(json.jsonify({"message": "error", "status" : 404}))
            response.status = "404 Not Found"
            return response
    else:
        response = make_response(json.jsonify({"message": "error", "status" : 400}))
        response.status = "400 Bad Request"
        return response

@app.route('/users', methods=["GET"])
def process_allUsers():
    if request.method == "GET":
        response = make_response(json.jsonify(users))
        return response
    else:
        response = make_response(json.jsonify({"message": "error", "status" : 400}))
        response.status = "400 Bad Request"
        return response


if __name__ == "__main__":
    app.run()