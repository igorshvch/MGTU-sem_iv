import {
    optionsRangeInput,
    labelsRangeInput,
    selectionOptions,
    resTableHeaders,
} from "./options.js"

import {
    createRangeInput,
    createFillerOptions,
} from "./createControlArea.js"

import {
    createTable,
    createResultTable,
} from "./createTable.js"

import {
    serverCallPost,
} from "./serverCalls.js"

let parent = document.querySelector(".result");
createRangeInput(parent, optionsRangeInput, labelsRangeInput);
createFillerOptions(parent, selectionOptions, "Выберите вариант заполнения таблицы");
createTable(parent, 5, "one");

let table_container = document.createElement("div");
parent.append(table_container);

let rangeInput = document.querySelector("#range_input");
rangeInput.addEventListener("input", (event)=> {
    console.log("CALLBACK", event.target.value);
    createTable(table_container, parseInt(event.target.value), document.querySelector("#selected_item").value);
})

let evalButton = document.createElement("button");
evalButton.append("Вычислить");
evalButton.id = "eval_button";
evalButton.addEventListener("click", ()=>{
    console.log("EVAL BUTTON PRESS");
    let data = collectData();
    let resp = ''
    serverCallPost(
        "http://127.0.0.1:5000/lab03/eval_data", data
        )
        .then((output)=>{
            resp=output
            return resp
        })
        .then((output2)=>{
            createResultTable(parent, data.length, output2["eval_res"], resTableHeaders)
        })
        .then(console.log(resp))
});
parent.append(evalButton);

function collectData() {
    let table = document.querySelector("#dataTable");
    console.log("THIS IS COLLECDATA!", table);
    let store = new Array();
    for (let i=0; i<table.rows.length-1; i++) {
        store[i] = new Array();
    }
    console.log("THIS IS MTD ARRAY!", store);

    for (let i=1, rows=table.rows.length; i<rows; i++){
        for (let j=1, cols=table.rows[0].cells.length; j<cols; j++) {
            store[i-1].push(table.rows[i].cells[j].children[0].value);
        }
    }

    console.log("THIS IS MTD ARRAY!", store);
    return store;
}