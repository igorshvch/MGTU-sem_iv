from flask import Flask, json, request, make_response, render_template

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def return_index(path):
    return render_template("index.html")

@app.route('/hack')
def return_hack():
    return render_template("hack.html")

@app.route('/users/<user_id>', methods=['GET', 'DELETE', 'PUT'])
def process_request(user_id):
    if request.method == "GET":
        for user in users:
            if user and user["id"] == int(user_id):
                return json.jsonify(user)
            else:
                return json.jsonify({"message": "error", "status" : 404})
    elif request.method == "DELETE":
        for enum, user in enumerate(users):
            if user and user["id"] == int(user_id):
                deleted_user = users.pop(enum)
                return json.jsonify({"deletedUser": deleted_user})
        return json.jsonify({"message": "error", "status" : 404})
    elif request.method == "PUT":
        proper_fields = set(users[0].keys())
        all_users_ids = set([user["id"] for user in users])
        data = request.json
        print(data)
        print(proper_fields)
        print(all_users_ids)
        if int(user_id) in all_users_ids:
            for key in data:
                if key in proper_fields:
                    users[int(user_id)][key] = data[key]
        else:
            return json.jsonify({"message": "error", "status" : 404})
        return json.jsonify(users[int(user_id)])
    else:
        return json.jsonify({"message": "error", "status" : 400})

@app.route('/users', methods=['OPTIONS'])
def return_options():
    if request.method == "OPTIONS":
        return json.jsonify({"supportedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]})
    else:
        return json.jsonify({"message": "error", "status" : 400})

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
                    json.jsonify({"message": "error", "status" : 409})
                new_user[key] = data[key]
                keys.add(key)
        if keys == standard:
            users.append(new_user)
            return make_response(json.jsonify({"message": "new user created", "code":"success"}, 201))
        else:
            return json.jsonify({"message": "error", "status" : 404})
    else:
        return json.jsonify({"message": "error", "status" : 400})

@app.route('/users', methods=["GET"])
def process_allUsers():
    if request.method == "GET":
        return json.jsonify(users)
    else:
        return json.jsonify({"message": "error", "status" : 400})