import {
    options_ctr_pan,
    options_tbl
} from "./options.js";

import {
    store
} from "./serverCalls.js";


//console.log("Begining of module vanilla");
//console.log(outer_store);
/*
let store = {
    "task": undefined,
    "alg": undefined,
    "tbl": undefined,
}

getTask();
getRandAlg();
getRandTbl();
*/

///////////////////////////////////////////////////////

function create_content_box(lw_info) {
    const dummy_headers = {
        "header" : "Заголовок",
        "task" : "Описание задания",
        "ctrl_pan" : "Панель управления",
        "content" : "Результат"
    }

    let body = document.querySelector("body");

    let box = document.createElement("div")
    let header_container = document.createElement("div");
    let task_description = document.createElement("div");
    let control_panel = document.createElement("div");
    let content_div = document.createElement("div");

    header_container.id="header";
    task_description.id="task_descr";
    control_panel.id="ctrl_pan";
    content_div.id="content";

    let label1 = document.createElement("label");
    label1.append(dummy_headers.header);
    label1.classList.add("label_main");
    let label2 = document.createElement("label");
    label2.append(dummy_headers.task);
    label2.classList.add("label_main");
    let label3 = document.createElement("label")
    label3.append(dummy_headers.ctrl_pan);
    label3.classList.add("label_main");
    let label4 = document.createElement("label");
    label4.append(dummy_headers.content);
    label4.classList.add("label_main");

    let name = document.createElement("h1");
    let task = document.createElement("h2");
    name.append(lw_info.task.lw1.name);
    task.append(lw_info.task.lw1.task);

    header_container.append(label1);
    header_container.append(name)
    task_description.append(label2);
    task_description.append(task)
    control_panel.append(label3);
    content_div.append(label4);

    box.append(header_container, task_description, control_panel, content_div);

    box.classList.add("box");
    for (let elem of box.children) {
        elem.classList.add("inner-container");
    }

    task_description.classList.add("task");
    control_panel.classList.add("ctr_pan");
    content_div.classList.add("content");

    body.append(box)
}

function create_control_panel(options) {    
    let ctrl_pan = document.querySelector("#ctrl_pan");

    let form = document.createElement("form");
    form.id = "rb_form";
    for (let i=0; i<options.length; i++) {
        let rb = document.createElement("input");
        let lb = document.createElement("label");

        rb.type = options[i].type;
        rb.id = options[i].id;
        rb.name = options[i].name;
        rb.value = options[i].value;
        lb.for = options[i].id;
        lb.classList.add(options[i].class);
        lb.append(options[i].label);

        rb.addEventListener("change", (event) => {
            console.log(event.target.value);
            create_table(
                document.querySelector("#content"),
                options_tbl.tables[i].label,
                options_tbl.headers,
                options_tbl.rand_crt,
                rb.id === "user_input_rd" ? true : false
            );
        });

        form.append(rb, lb);
    }
    ctrl_pan.append(form);
}
/*
function bind_raddiobuttons(selectors) {
    document.querySelector("#rectangle").addEventListener("change", (event) => {
        console.log(event.target.value);
        make_input_form(form, options_rct);
    });
    document.querySelector("#trapezoid").addEventListener("change", (event) => {
        console.log(event.target.value);
        make_input_form(form, options_trp);
    });
    document.querySelector("#intersection").addEventListener("change", (event) => {
        console.log(event.target.value);
        make_input_form(form, options_inter);
    });
}
*/

function create_table(parent, label, headers, rand_crt, user_input=false) {
    let container = document.querySelector("#res_tbl");
    if (container) {
        container.remove();
    } 
    container = document.createElement("div");
    container.id = "res_tbl";

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tfoot = document.createElement("tfoot");
    let tbody = document.createElement("tbody")
    
    let tb_label = document.createElement("label");
    tb_label.append(label);

    let row_header = document.createElement("tr");
    let th = document.createElement("th");
    row_header.append(th);
    for (let i_header of headers) {
        th = document.createElement("th");
        th.append(i_header);
        row_header.append(th);
    }
    for (let i_crt of rand_crt) {
        let row_foot = document.createElement("tr");
        let first_cell = document.createElement("th");
        first_cell.append(i_crt)
        row_foot.append(first_cell);
        for (let j=0; j<3; j++) {
            let cell = document.createElement("td");
            row_foot.append(cell);
        }
        tfoot.append(row_foot);
    }
    for (let i=0; i<10; i++) {
        let row = document.createElement("tr");
        let first_cell = document.createElement("th");
        first_cell.append(i+1);
        row.append(first_cell);
        for (let j=0; j<3; j++) {
            let cell = document.createElement("td");
            if (user_input) {
                for (let k=0; k<3; k++) {
                    let input_form = document.createElement("input");
                    input_form.type = "text";
                    input_form.size = i+1;
                    cell.append(input_form);
                    row.append(cell);

                }
                tbody.append(row);
                console.log("it works!");
            }
        }
    }
    thead.append(row_header);
    table.append(thead, tfoot, tbody);
    container.append(tb_label, table);
    parent.append(container);
}

/*
function make_input_form(elem, options) {
    let container = document.querySelector("#cur_ctrl");
    if (container) {
        container.remove();
    }  
    container = document.createElement("div");
    container.classList.add("ctr_pan_ctr");
    container.id = "cur_ctrl";

    for (let i=0; i<options.length; i++) {
        let inner_container = document.createElement("div");
        let label = document.createElement("label");
        let display = document.createElement("div");
        let btn_mns = document.createElement("button");
        let btn_pls = document.createElement("button");

        inner_container.classList.add("ctr_pan_inner_ctr");
        btn_mns.append("-");
        btn_pls.append("+");

        label.append(options[i].label);
        label.id = options[i].label_id;
        display.id = options[i].display_id;
        btn_mns.id = options[i].btn_mns_id;
        btn_pls.id = options[i].btn_pls_id;

        btn_mns.addEventListener("click", (event) => {
            event.preventDefault();
        });
        btn_pls.addEventListener("click", (event) => {
            event.preventDefault();
        });

        display.classList.add("ctr_pan_display");
        label.classList.add("ctr_pan_label");
        display.append("0.00");

        inner_container.append(label, display, btn_mns, btn_pls);
        container.append(inner_container);
    }

    elem.append(container);
}
*/
console.log(store);
console.log("=====================");
console.log(store);
console.log("=====================");
setTimeout( ()=>{create_content_box(store)}, 20);
setTimeout( ()=>{create_control_panel(options_ctr_pan)}, 20);

/*
document.querySelector("#table_rd").addEventListener("change", () =>{
    create_table(
        document.querySelector("#rb_form"),
        options_tbl.tables[0].label,
        options_tbl.headers
        );
});
document.querySelector("#generated_rd").addEventListener("change", () =>{
    create_table(
        document.querySelector("#rb_form"),
        options_tbl.tables[0].label,
        options_tbl.headers
        );
});
document.querySelector("#user_input_rd").addEventListener("change", () =>{
    create_table(
        document.querySelector("#rb_form"),
        options_tbl.tables[0].label,
        options_tbl.headers
        );
});
*/
