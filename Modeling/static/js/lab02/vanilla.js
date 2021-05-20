/*
import {
    drawMyChart
} from "./drawMyChart.js"
*/

import {
    rbtnsLabels,
    rbtnsOptions,
    uniformLabels,
    uniformInputOptions,
    normLabels,
    normInputOptions,
    poissonLabels,
    poissonInputOptions
} from "./options.js"

import {
    createRBtns,
} from "./createRBtns.js"

import {
    createInputArea,
} from "./createInputForm.js"

import {
    collectData
} from "./collectDataFunc.js"

google.charts.load('current', {'packages':['corechart']});

let container = document.querySelector(".result");
let controlAreaContainer = document.createElement("div");
controlAreaContainer.classList.add("control_area");


container.append(controlAreaContainer);

createRBtns(
    controlAreaContainer,
    rbtnsOptions,
    rbtnsLabels,
    ()=>{
        createInputArea(
            controlAreaContainer,
            uniformInputOptions,
            uniformLabels,
            ()=>{
                collectData(
                    [
                        "http://127.0.0.1:5000/lab02/eval_data_uniform_pdf",
                        "http://127.0.0.1:5000/lab02/eval_data_uniform_cdf"
                    ],
                    [
                        "Функция плотности",
                        "Функция распределения"
                    ]
                )
            });
    },
    ()=>{
        createInputArea(
            controlAreaContainer,
            normInputOptions,
            normLabels,
            ()=>{
                collectData(
                    [
                        "http://127.0.0.1:5000/lab02/eval_data_norm_pdf",
                        "http://127.0.0.1:5000/lab02/eval_data_norm_cdf"
                    ],
                    [
                        "Функция плотности",
                        "Функция распределения"
                    ]
                )
            });
    },
    ()=>{
        createInputArea(
            controlAreaContainer,
            poissonInputOptions,
            poissonLabels, 
            ()=>{
                collectData(
                    [
                        "http://127.0.0.1:5000/lab02/eval_data_poisson_pmf",
                        "http://127.0.0.1:5000/lab02/eval_data_poisson_cdf"
                    ],
                    [
                        "Функция плотности",
                        "Функция распределения"
                    ]
                )
            });
    },
);

/*
function createChartBox(parent) {
    let chartBox = document.createElement("div");
    chartBox.classList.add("chart_box");
    parent.append(chartBox);
    return chartBox
}

let params1 = {
    "start": -10,
    "stop": 10,
    "steps": 100,
    "mu": 3.2,
    "sigma": 2
};

let params2 = {
    "start": 0,
    "stop": 25,
    "lambda": 10
};

let resp11 = "";
let resp12 = "";

let resp21 = "";
let resp22 = "";


let parent1 = document.createElement("div");
let parent2 = document.createElement("div");

container.append(parent1, parent2)

let chartBox11 = createChartBox(parent1);
let chartBox12 = createChartBox(parent1);

let chartBox21 = createChartBox(parent2);
let chartBox22 = createChartBox(parent2);


CoordsCall("http://127.0.0.1:5000/lab02/eval_data_norm_pdf",params1).then(output => {resp11 = output});
CoordsCall("http://127.0.0.1:5000/lab02/eval_data_norm_cdf", params1).then(output => {resp12 = output});

CoordsCall("http://127.0.0.1:5000/lab02/eval_data_poisson_pmf", params2).then(output => {resp21 = output});
CoordsCall("http://127.0.0.1:5000/lab02/eval_data_poisson_cdf", params2).then(output => {resp22 = output});
//CoordsCall22(params2).then(output => {resp22 = output});

setTimeout(()=>console.log("From Vanilla CoordsCall11: ", resp11), 400);
setTimeout(()=>console.log("From Vanilla CoordsCall12: ", resp12), 400);
setTimeout(()=>console.log("From Vanilla CoordsCall21: ", resp21), 400);
setTimeout(()=>console.log("From Vanilla CoordsCall22: ", resp22), 400);
//setTimeout(()=>drawMyChart(parent, params, resp1.coordsX, resp1.coordsY), 500);

setTimeout(()=>google.charts.setOnLoadCallback(drawMyChart(resp11, chartBox11, "Функция плотности")), 700);
setTimeout(()=>google.charts.setOnLoadCallback(drawMyChart(resp12, chartBox12, "Функция распределения")), 700);

setTimeout(()=>google.charts.setOnLoadCallback(drawMyChart(resp21, chartBox21, "Функция плотности")), 700);
setTimeout(()=>google.charts.setOnLoadCallback(drawMyChart(resp22, chartBox22, "Функция распределения")), 700);
*/

