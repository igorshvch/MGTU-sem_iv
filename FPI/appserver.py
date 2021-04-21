from flask import Flask, json, request

import serverfuncs as srf

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

@app.route('/send_data', methods=['GET', 'POST'])
def add_message():
    if request.method == "POST":
        content = request.json
        print (content["message"])
        return {"status":"success"}
    else:
        return '{"status": "GET"}'

@app.route('/calc_igl_rect', methods=['GET', 'POST'])
def calc_igl_rect():
    if request.method == "POST":
        content = request.json
        if content:
            print(content["mode"])
            print(type(content["down"]), content["down"])
            print(type(content["up"]), content["up"])
            print(type(content["prc"]), content["prc"])
        else:
            print("Error!")
        if content["mode"] == "f1":
            func = srf.func1
        elif content["mode"] == "f2":
            func = srf.func2
        res = srf.calc_integral_rct(
            func,
            content["down"],
            content["up"],
            content["prc"],
        )
        if res[0]:
            return '{"res" : "%s"}' % str(res[1])
        else:
            return '{"res" : "%s"}' % res[1]
    else:
        return '{"status": "GET"}'