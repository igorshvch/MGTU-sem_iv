import random

from flask import Flask, json

app = Flask(__name__, static_folder='static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")

@app.route('/tasks/<path:filename>')
def return_task(filename):
    with open("static/JSON/{}.json".format(filename), mode='r', encoding='utf8') as f:
        text = f.read()
    jsoned = json.loads(text)
    return json.jsonify(jsoned)

@app.route('/get_rand_alg')
def generate_rand():
    random.seed(5)
    one = [random.randint(0,9) for i in range(10)]
    two = [random.randint(10,99) for i in range(10)]
    three = [random.randint(100,999) for i in range(10)]
    store = {
        "one": one,
        "two": two,
        "three": three
    }
    return json.jsonify(store)

@app.route('/get_rand_tbl')
def return_rand_tbl():
    with open("static/JSON/tableRand.json", mode='r', encoding='utf8') as f:
        text = f.read()
    jsoned = json.loads(text)
    return json.jsonify(jsoned)