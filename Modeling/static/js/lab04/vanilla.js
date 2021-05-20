import {
    createInputArea
} from "./createInputArea.js"

import {
    commonLabels,
    commonInputFields,
    resTableHeaders
} from "./options.js"

import {
    serverCallPost
} from "./serverCalls.js"

import {
    createResultTable
} from "./createTable.js"

function collectInputData(options) {
    let obj = new Object();
    for (let i=0; i<options.length; i++) {
        console.log("field id:", options[i]["id"]);
        let id = options[i]["id"]
        let node = document.querySelector(`#${id}`);
        obj[id] = node.value;
    }
    console.log("THIS IS OBJ", obj);
    return obj;
}

let parent = document.querySelector(".result");
createInputArea(parent, commonInputFields, commonLabels);

let evalButton = document.createElement("button");
evalButton.append("Определить длину очереди");
evalButton.id = "eval_button";
parent.append(evalButton);

evalButton.addEventListener("click", ()=>{
    console.log("EVALUATE!");
    let obj = collectInputData(commonInputFields);
    let resp = '';
    serverCallPost(
        "http://127.0.0.1:5000/lab04/eval_data", obj
        )
        .then((output)=>{
            resp = output;
        })
        .then(()=>{
            createResultTable(parent, resp, resTableHeaders);
        })
})
