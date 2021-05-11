//import {sayHi} from "./sayHi.js";
import {
    getTask,
    sendData,
    math1,
    math2,
    math3,
    renderChart,
    saveCoords,
    loadCoords,
} from "./serverCalls.js"

import {createContentBox} from "./components/contentBox.js"
import {makeControlPanel} from "./components/controlPanel.js"

//sayHi();

///////////////////////////////////////////////////////

createContentBox();
makeControlPanel(math1, math2, math3, renderChart, saveCoords, loadCoords);

function fillBox() {
    let header = document.querySelector('#header');
    let task = document.querySelector('#task_descr');
    header.innerHTML = "";
    //task.innerHTML = "";
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    header.append(p1);
    task.append(p2);
    getTask(p1, p2);
}

fillBox();
sendData();