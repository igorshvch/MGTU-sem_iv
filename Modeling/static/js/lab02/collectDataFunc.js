import {
    CoordsCall,
} from "./serverCalls.js"

import {
    drawMyChart
} from "./drawMyChart02.js"

export function collectData(urls, chartLabels) {
    let rb_uniform = document.querySelector("#uniform");
    let rb_norm = document.querySelector("#norm");
    let rb_poisson = document.querySelector("#poisson");
    let obj = new Object();
    if (rb_uniform.checked) {
        obj.start = document.querySelector("#start").value;
        obj.stop =  document.querySelector("#stop").value;
        obj.steps = 1000;
        console.log("UNIFORM is CHEKED", obj);
    } else if (rb_norm.checked) {
        obj.start = document.querySelector("#start").value;
        obj.stop =  document.querySelector("#stop").value;
        obj.steps = 100;
        obj.mu = document.querySelector("#mu").value;
        obj.sigma = document.querySelector("#sigma").value;
        console.log("NORM is CHEKED", obj);
    } else if (rb_poisson.checked) {
        obj.start = 0,
        obj.stop = document.querySelector("#stop").value;
        obj.lambda = document.querySelector("#lambda").value;
        console.log("POISSON is CHEKED", obj);
    }

    let container = document.querySelector(".result");

    let oldCharts = document.querySelectorAll(".chart_box");
    for (let oldChart of oldCharts) oldChart.remove();
    
    for (let i=0; i<urls.length; i++) {
        let resp = '';
        let chartBox = document.createElement("div");
        chartBox.classList.add("chart_box");
        container.append(chartBox);
        CoordsCall(urls[i], obj).then((output)=>resp=output);
        setTimeout(()=>google.charts.setOnLoadCallback(drawMyChart(resp, chartBox, chartLabels[i])), 700);
    }
}