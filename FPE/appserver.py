from flask import Flask, json

app = Flask(__name__, static_folder='static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")

@app.route('/tasks/<path:filename>')
def return_task(filename):
    with open("static/{}".format(filename), mode='r', encoding='utf8') as f:
        text = f.read()
    jsoned = json.loads(text)
    return json.jsonify(jsoned)