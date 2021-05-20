import {
    evalRand
} from "./serverCalls.js"

export function create_control_panel(parent, options, options_tbl, data) {    
    let ctrl_pan = document.createElement("div");
    ctrl_pan.classList.add("control_area");
    parent.append(ctrl_pan);

    let form = document.createElement("form");
    form.id = "rb_form";
    for (let i=0; i<options.length; i++) {
        let box = document.createElement("div");
        let rb = document.createElement("input");
        let lb = document.createElement("label");
        
        box.classList.add("ctr_pan_box");

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
                parent,
                options_tbl.tables[i].label,
                options_tbl.headers,
                options_tbl.rand_crt,
                data,
                rb.id//table_rd, generated_rd, user_input_rd
            );
        });
        box.append(rb,lb)
        form.append(box);
    }
    ctrl_pan.append(form);
}

export function create_table(parent, label, headers, rand_crt, data, input_mode) {
    console.log("FROM CREATE_TABLE ", data)
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
        row.classList.add("hoverable");
        let first_cell = document.createElement("th");
        first_cell.append(i+1);
        row.append(first_cell);
        for (let j=0; j<3; j++) {
            let cell = document.createElement("td");
            cell.classList.add("tbl_cell");
            if (input_mode === "user_input_rd") {
                let input_form = document.createElement("input");
                input_form.type = "number";
                input_form.value = 0;
                input_form.classList.add("tbl_input");
                //input_form.size = i+1;
                cell.append(input_form);
            }
            else if (input_mode === "table_rd") {
                cell.append(data.static_data[j][i]);
            }
            else if (input_mode === "generated_rd") {
                cell.append(data.generated_data[j][i]);
            }
            row.append(cell);
            tbody.append(row);
        }
    }

    let row = document.createElement("tr");
    row.id = "eval_row";

    let cell = document.createElement("td");

    cell.id = "eval_cell";
    cell.colSpan = "4";

    let evalButton = document.createElement("button");
    evalButton.id = "eval_button";
    evalButton.append("Оценить случайность");

    console.log(evalButton);

    evalButton.addEventListener("click", ()=> {
        console.log("this is EVAL BUTTON press!");

        let collectedData = collectData(input_mode);
        let data = '';
        evalRand(collectedData)
        .then(resp => {data = resp})
        .then(() => {
            console.log("THIS IS EVAL RESULTS");
            console.log(data);
    
            for (let i=0; i<tfoot.rows.length; i++) {
                tfoot.rows[0].cells[i+1].innerHTML = data.stdd[i];
                tfoot.rows[1].cells[i+1].innerHTML = data.chsq[i];
                tfoot.rows[2].cells[i+1].innerHTML = data.kst[i];
            }
        })
    });
    
    cell.append(evalButton);
    row.append(cell);
    tbody.append(row);

    thead.append(row_header);
    table.append(thead, tfoot, tbody);
    container.append(tb_label, table);
    parent.append(container);
}

function collectData (input_mode) {
    let store = new Object();
    store.one = new Array();
    store.two = new Array();
    store.three = new Array();
    let tbody = document.querySelector("tbody");
    //tbody.rows[0].cells.length;
    console.log(tbody.rows.length);
    console.log(tbody.rows[0].cells.length);
    if (input_mode !== "user_input_rd") {
        for(let i=0; i<tbody.rows.length-1; i++) {
            store.one.push(tbody.rows[i].cells[1].innerHTML);
            store.two.push(tbody.rows[i].cells[2].innerHTML);
            store.three.push(tbody.rows[i].cells[3].innerHTML);
        }
    }
    else {
        for(let i=0; i<tbody.rows.length-1; i++) {
            store.one.push(tbody.rows[i].cells[1].children[0].value);
            store.two.push(tbody.rows[i].cells[2].children[0].value);
            store.three.push(tbody.rows[i].cells[3].children[0].value);
        }
    }
    console.log(store);
    return store;
}