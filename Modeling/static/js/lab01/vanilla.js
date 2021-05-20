import {
    options_ctr_pan,
    options_tbl
} from "../lab01/options.js"

import {
    create_control_panel
} from "../lab01/createTable.js"

import {getRandTbl} from "../lab01/serverCalls.js"

let data = '';
getRandTbl().then(resp => {data = resp});

setTimeout(()=>console.log("From Vanilla: ", data), 200);


let parent = document.querySelector(".result");
if (!parent) console.log("ERROR! There is no #result selector!");
console.log("Printing parent: ", parent);

setTimeout(() => create_control_panel(parent, options_ctr_pan, options_tbl, data), 300);