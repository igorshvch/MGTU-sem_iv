from flask import Flask, json, request, render_template

import serverfuncs as srf

app = Flask(__name__, static_folder='static', template_folder='html')

@app.route('/')
def index_html():
    return render_template("index.html")

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

@app.route('/calc_igl_rect', methods=['POST'])
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
        if content["mode"] == "func1":
            func = srf.func1
        elif content["mode"] == "func2":
            func = srf.func2
        elif content["mode"] == "func3":
            func = srf.func3
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
        return '{"status": "ERROR! Incorrect HTTP method"}'

@app.route('/calc_igl_trp', methods=['POST'])
def calc_igl_trp():
    if request.method == "POST":
        content = request.json
        if content:
            print(content["mode"])
            print(type(content["down"]), content["down"])
            print(type(content["up"]), content["up"])
            print(type(content["prc"]), content["prc"])
        else:
            print("Error!")
        if content["mode"] == "func1":
            func = srf.func1
        elif content["mode"] == "func2":
            func = srf.func2
        elif content["mode"] == "func3":
            func = srf.func3
        res = srf.calc_integral_trp(
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
        return '{"status": "ERROR! Incorrect HTTP method"}'

@app.route('/eval_intersect_point', methods=['POST'])
def eval_intersect_point():
    if request.method == "POST":
        content = request.json
        if content:
            print(content["mode"])
            print(type(content["down"]), content["down"])
            print(type(content["up"]), content["up"])
            print(type(content["prc"]), content["prc"])
        else:
            print("Error!")
        if content["mode"] == "func1":
            func = srf.func1
        elif content["mode"] == "func2":
            func = srf.func2
        elif content["mode"] == "func3":
            func = srf.func3
        res = srf.eval_intersection_point(
            func,
            content["down"],
            content["up"],
            content["prc"],
        )
        print("evaluation function exit code:", res[0])
        if res[0]:
            return '{"res" : "%s"}' % str(res[1])
        else:
            return '{"res" : "%s"}' % res[1]
    else:
        return '{"status": "ERROR! Incorrect HTTP method"}'


@app.route('/eval_coords', methods=['POST'])
def eval_coords():
    if request.method == "POST":
        content = request.json
        if content:
            print(content["mode"])
            print(type(content["down"]), content["down"])
            print(type(content["up"]), content["up"])
            print(type(content["prc"]), content["prc"])
        else:
            print("Error!")
        if content["mode"] == "func1":
            func = srf.func1
        elif content["mode"] == "func2":
            func = srf.func2
        elif content["mode"] == "func3":
            func = srf.func3
        res = srf.eval_coords(
            func,
            content["down"],
            content["up"],
            content["prc"],
        )
        print("evaluation function exit code:", res[0])
        print(res)
        if res[0]:
            return {"x": res[1], "y": res[2]}
        else:
            return '{"res" : "%s"}' % res[-1]
    else:
        return '{"status": "ERROR! Incorrect HTTP method"}'

@app.route('/save_coords', methods=['POST'])
def save_coords():
    if request.method == "POST":
        content = request.json
        if content:
            print(content["mode"])
            print(type(content["down"]), content["down"])
            print(type(content["up"]), content["up"])
            print(type(content["prc"]), content["prc"])
        else:
            print("Error!")
        if content["mode"] == "func1":
            func = srf.func1
        elif content["mode"] == "func2":
            func = srf.func2
        elif content["mode"] == "func3":
            func = srf.func3
        res = srf.eval_coords(
            func,
            content["down"],
            content["up"],
            content["prc"],
        )
        print("evaluation function exit code:", res[0])
        print(res)
        if res[0]:
            header = "{},{}\n".format(srf.str_func[content["mode"]], content["prc"])
            formatted_res = ["{},{}".format(x, y) for x,y in zip(res[1],res[2])]
            with open(r"C:\Users\igors\My_Code\iv_sem\FPI\static\saves\coords.csv", mode='w') as f:
                f.write(header)
                f.write('\n'.join(formatted_res))
            return {"x": res[1], "y": res[2]}
        else:
            return '{"res" : "%s"}' % res[-1]
    else:
        return '{"status": "ERROR! Incorrect HTTP method"}'

@app.route('/load_coords', methods=['GET'])
def load_coords():
    if request.method == "GET":
        with open(r"C:\Users\igors\My_Code\iv_sem\FPI\static\saves\coords.csv", mode='r') as f:
            text = f.read()
            print(text)
        if text:
            text = text.strip("\n");
            lines = text.split("\n");
            func, step = lines[0].split(",")
            coords = [[float(coord) for coord in  line.split(",")] for line in lines[1:]]
            coords_x = [item[0] for item in coords]
            coords_y = [item[1] for item in coords]
            return {"func": func, "step": step, "x": coords_x, "y": coords_y}
        else:
            return {"message": "Файл с координатами пуст"}
    else:
        return '{"status": "ERROR! Incorrect HTTP method"}'