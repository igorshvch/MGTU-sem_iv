from flask import Flask, jsonify
app = Flask(__name__, static_folder='static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")

@app.route('/movies')
def func():
    return jsonify({"status": "You are on 'movies' page"})


@app.route('/address')#, methods = ['POST', 'GET'])
def address1():
    return jsonify({"status": "You are on 'address' page"})

@app.route('/tst')#, methods = ['POST', 'GET'])
def address2():
    return jsonify(
        {
            "status": "You are on 'test' page",
            "message": "I'm okay!"
        }
    )



