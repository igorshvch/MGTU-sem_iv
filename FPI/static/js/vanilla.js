import {sayHi} from "./sayHi.js";
import {
    options_inter,
    options_rct,
    options_trp
} from "./options.js";
import {
    getTask,
    sendData
} from "./serverCalls.js"

sayHi();

///////////////////////////////////////////////////////

function createContentBox() {
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

    let p1 = document.createElement("p");
    p1.append(dummy_headers.header);
    let p2 = document.createElement("p");
    p2.append(dummy_headers.task);
    let p3 = document.createElement("p")
    p3.append(dummy_headers.ctrl_pan);
    let p4 = document.createElement("p");
    p4.append(dummy_headers.content);

    header_container.append(p1);
    task_description.append(p2);
    control_panel.append(p3);
    content_div.append(p4);

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


function makeControlPanel() {
    let options = [
        {
            "type": "radio",
            "id": "rectangle",
            "name": "lw1_math_func",
            "value": "rectangle",
            "class": "rb_group",
            "label": "Метод прямоугольников",
        },
        {
            "type": "radio",
            "id": "trapezoid",
            "name": "lw1_math_func",
            "value": "trapezoid",
            "class": "rb_group",
            "label": "Метод трапеций",
        },
        {
            "type": "radio",
            "id": "intersection",
            "name": "lw1_math_func",
            "value": "intersection",
            "class": "rb_group",
            "label": "Найти пересечение",
        }
    ]
    
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
        /*
        rb.addEventListener("change", (event) => {
            console.log(event.target.value);
        });
        */
       form.append(rb, lb);
    }
    ctrl_pan.append(form);
    
    document.querySelector("#rectangle").addEventListener("change", (event) => {
        console.log(event.target.value);
        makeInputForm(form, options_rct);
    });
    document.querySelector("#trapezoid").addEventListener("change", (event) => {
        console.log(event.target.value);
        makeInputForm(form, options_trp);
    });
    document.querySelector("#intersection").addEventListener("change", (event) => {
        console.log(event.target.value);
        makeInputForm(form, options_inter);
    });
}

function makeInputForm(elem, options) {
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

        btn_mns.addEventListener("click", () => {
            console.log(`btn_mns hadler: ${options[i].display_id}`);
            let dsp = document.querySelector(`#${options[i].display_id}`);
            let val = parseFloat(dsp);
            console.log(`pls hadler: ${val.toFixed(2)}`);
            val = val - 0.01;
            dsp.append(val);
        });
        btn_pls.addEventListener("click", () => {
            console.log(`btn_pls hadler: ${options[i].display_id}`);
            let dsp = document.querySelector(`#${options[i].display_id}`);
            let val = parseFloat(dsp.innerHTML);
            console.log(`pls hadler: ${val}`);
            val = val + 0.01;
            dsp.innerHTML = `${val.toFixed(2)}`;
        });

        display.classList.add("ctr_pan_display");
        label.classList.add("ctr_pan_label");
        display.append("0");

        inner_container.append(label, display, btn_mns, btn_pls);
        container.append(inner_container);
    }

    let evalButton = document.createElement("button");
    evalButton.append("Вычислить");
    evalButton.classList.add("eval_btn")
    evalButton.addEventListener("click", (event) => {
        event.preventDefault();
        let dsp_dwn = document.querySelector("#dsp_dwn");
        let dsp_up = document.querySelector("#dsp_up");
        let dsp_prc = document.querySelector("#dsp_prc");
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.innerHTML)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.innerHTML)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.innerHTML)}`);
    });

    container.append(evalButton);

    elem.append(container);
}

createContentBox();
makeControlPanel();

getTask();
sendData();