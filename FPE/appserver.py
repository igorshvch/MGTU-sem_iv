from flask import Flask, jsonify

import serverfuncs as srvf

print(srvf.__version__)

app = Flask(__name__, static_folder='static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")