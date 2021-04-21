import {sayHi} from "./miscellaneous/sayHi.js";
import {createNavBar} from "./views/mainMenu.js"
import {mainMenuNavBar} from "./options/options_mainMenu.js"
/*
import {
    options_inter,
    options_rct,
    options_trp
} from "./options/options_FPI_lw1.js";
import {
    getTask,
    sendData,
    math1
} from "./serverCalls/serverCalls.js"
*/

createNavBar(mainMenuNavBar);
sayHi();


///////////////////////////////////////////////////////

/*
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
            console.log(`btn_mns handler: ${options[i].display_id}`);
            let dsp = document.querySelector(`#${options[i].display_id}`);
            let val = parseFloat(dsp.innerHTML);
            console.log(`btn_mns handler: ${val.toFixed(1)}`);
            if (dsp.id.includes("rct")) {
                val = val - 1;
                dsp.innerHTML = `${val}`;
            }
            else {
                val = val - 0.01;
                dsp.innerHTML = `${val.toFixed(3)}`;
            }
        });
        btn_pls.addEventListener("click", () => {
            console.log(`btn_pls hadler: ${options[i].display_id}`);
            let dsp = document.querySelector(`#${options[i].display_id}`);
            let val = parseFloat(dsp.innerHTML);
            console.log(`btn_pls hadler: ${val}`);
            if (dsp.id.includes("rct")) {
                val = val + 1;
                dsp.innerHTML = `${val}`;
            }
            else {
                val = val + 0.01;
                dsp.innerHTML = `${val.toFixed(3)}`;
            }
        });

        display.classList.add("ctr_pan_display");
        label.classList.add("ctr_pan_label");
        if (display.id.includes("up")) {
            display.append("3.14");
        }
        else {
            display.append("0");
        }

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
        if (!dsp_prc) {
            dsp_prc = document.querySelector("#dsp_prc_rct");
        }
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.innerHTML)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.innerHTML)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.innerHTML)}`);
        let content = new Object;
        content.down = dsp_dwn.innerHTML;
        content.up = dsp_up.innerHTML;
        content.prc = dsp_prc.innerHTML;
        content.mode = "f1";
        console.log(content);

        let container = document.querySelector("#content");
        let result = document.querySelector("#math_res");
        if (result) {
            result.remove();
        }
        result = document.createElement("div");
        result.id = "math_res";
        container.append(result);

        math1(content, result);
    });

    container.append(evalButton);

    elem.append(container);
}

createContentBox();
makeControlPanel();

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

*/