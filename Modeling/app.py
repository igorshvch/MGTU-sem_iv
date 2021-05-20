from flask import Flask, render_template, request

import numpy as np

import servfuncs as srf

app = Flask(__name__, static_folder='static', template_folder="html")

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/lab<string:lab_id>')
def lab_renderer(lab_id):
    return render_template("lab{}.html".format(lab_id))

@app.route('/lab01/get_rand_tbl', methods=["GET"])
def get_rand():
    #random.seed = 5
    static_data = [
        [0, 2, 3, 5, 7, 5, 0, 7, 5, 3],
        [57, 30, 80, 80, 76, 49, 35, 44, 64, 43],
        [694, 256, 918, 903, 819, 417, 936, 434, 245, 294]
    ]
    generated_data = [
        [np.random.randint(0,10) for i in range(10)],
        [np.random.randint(0,100) for i in range(10)],
        [np.random.randint(0,1000) for i in range(10)]
    ]
    return {
        "static_data": static_data,
        "generated_data": generated_data
    }

@app.route('/lab01/eval_data', methods=["POST"])
def eval_data_lab01():
    content = request.json
    print(content)
    one = np.array([int(content["one"][i])/10 for i in range(len(content["one"]))])
    two = np.array([int(content["two"][i])/100 for i in range(len(content["two"]))])
    three = np.array([int(content["three"][i])/1000 for i in range(len(content["three"]))])
    print(one, two, three)
    one_sd = srf.standard_deviation([i*10 for i in one])
    two_sd = srf.standard_deviation([i*100 for i in two])
    three_sd = srf.standard_deviation([i*1000 for i in three])
    print("standard dev ===>", one_sd, two_sd, three_sd)
    ch_one = srf.chisquare_measure(one)
    ch_two = srf.chisquare_measure(two)
    ch_three = srf.chisquare_measure(three)
    print("chisquare ===>", ch_one, ch_two, ch_three)
    kst_one = srf.ks_test(one)
    kst_two = srf.ks_test(two)
    kst_three = srf.ks_test(three)
    return {
        "stdd": [one_sd, two_sd, three_sd],
        "chsq": [ch_one, ch_two, ch_three],
        "kst": [kst_one, kst_two, kst_three]
    }

@app.route('/lab02/eval_data_uniform_pdf', methods=["POST"])
def eval_data_lab02_uniform_pdf():
    content = request.json
    print(content)
    coords_X = srf.create_x_coords_array(float(content["start"]), float(content["stop"]), int(content["steps"]))
    coords_Y_pdf = srf.create_y_for_uniform_pdf(coords_X)
    #print(coords_X, coords_Y_pdf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": [item for item in coords_Y_pdf]
    }

@app.route('/lab02/eval_data_uniform_cdf', methods=["POST"])
def eval_data_lab02_uniform_cdf():
    content = request.json
    print(content)
    coords_X = srf.create_x_coords_array(float(content["start"]), float(content["stop"]), int(content["steps"]))
    coords_Y_pdf = srf.create_y_for_uniform_cdf(coords_X)
    #print(coords_X, coords_Y_pdf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": [item for item in coords_Y_pdf]
    }

@app.route('/lab02/eval_data_norm_pdf', methods=["POST"])
def eval_data_lab02_norm_pdf():
    content = request.json
    print(content)
    coords_X = srf.create_x_coords_array(float(content["start"]), float(content["stop"]), int(content["steps"]))
    coords_Y_pdf = srf.create_y_for_norm_pdf(coords_X, float(content["mu"]), float(content["sigma"]))
    #print(coords_X, coords_Y_pdf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": [item for item in coords_Y_pdf]
    }

@app.route('/lab02/eval_data_norm_cdf', methods=["POST"])
def eval_data_lab02_norm_cdf():
    content = request.json
    print(content)
    coords_X = srf.create_x_coords_array(float(content["start"]), float(content["stop"]), int(content["steps"]))
    coords_Y_pdf = srf.create_y_for_norm_cdf(coords_X, float(content["mu"]), float(content["sigma"]))
    #print(coords_X, coords_Y_pdf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": [item for item in coords_Y_pdf]
    }

@app.route('/lab02/eval_data_poisson_pmf', methods=["POST"])
def eval_data_lab02_poisson_pmf():
    content = request.json
    print(content)
    coords_X = list(range(int(content["start"]), int(content["stop"])))
    coords_Y_pmf = srf.create_y_for_poisson_pmf(int(content["stop"]), float(content["lambda"]))
    #print(coords_X, coords_Y_pmf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": coords_Y_pmf
    }

@app.route('/lab02/eval_data_poisson_cdf', methods=["POST"])
def eval_data_lab02_poisson_cdf():
    content = request.json
    print(content)
    coords_X = list(range(int(content["start"]), int(content["stop"])))
    coords_Y_pmf = srf.create_y_for_poisson_cdf(int(content["stop"]), float(content["lambda"]))
    #print(coords_X, coords_Y_pmf)
    return {
        "coordsX": [item for item in coords_X],
        "coordsY": coords_Y_pmf
    }

@app.route('/lab03/eval_data', methods=["POST"])
def eval_data_lab03():
    content = request.json
    print(content)
    matr = []
    for row in content["matr"]:
        matr.append([int(item) for item in row])
    print("this is matr", matr)
    resp = srf.lab03_main(matr)
    return {
        "message": "success",
        "eval_res": resp
    }

@app.route('/lab04/eval_data', methods=["POST"])
def eval_data_lab04():
    content = request.json
    print(content)
    ev_m, dt_m = srf.lab04_main(
        a = float(content["start"]),
        b = float(content["stop"]),
        mu = float(content["mu"]),
        sigma = float(content["sigma"]),
        total_tasks = int(content["tasks"]),
        repeat_percentage = int(content["repeat"]),
        step = float(content["step"])
    )
    return {
        "ev_m": ev_m,
        "dt_m": dt_m
    }

@app.route('/lab05/eval_data', methods=["POST"])
def eval_data_lab05():
    content = request.json
    for key, val in content.items():
        content[key] = int(val)
    print(content)
    res = srf.lab05_main(content)
    return res