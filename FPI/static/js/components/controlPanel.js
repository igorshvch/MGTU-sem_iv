import {
    makeInputForm,
    makeSaveLoadForm
} from "./inputForm.js"
import {
    options_inter,
    options_rct,
    options_trp,
    options_ssl
} from "../options.js";

export function makeControlPanel(...funcs) {
    let options1 = [
        {
            "type": "radio",
            "id": "func1",
            "name": "lw1_task_func",
            "value": "func1",
            "class": "rb_group1",
            "label": "cos(x)",
        },
        {
            "type": "radio",
            "id": "func2",
            "name": "lw1_task_func",
            "value": "func2",
            "class": "rb_group1",
            "label": "sin(2*x)*(ln(x+5))**2",
        },
        {
            "type": "radio",
            "id": "func3",
            "name": "lw1_task_func",
            "value": "func3",
            "class": "rb_group1",
            "label": "a1*x^8 + a2*x^7 + a3*x^6 + a4*x^5 + a5*x^4 + a6*x^3 + a7*x^2 + a8*x + a9",
        },
    ]
    let options2 = [
        {
            "type": "radio",
            "id": "rectangle",
            "name": "lw1_math_func",
            "value": "rectangle",
            "class": "rb_group2",
            "label": "Метод прямоугольников",
        },
        {
            "type": "radio",
            "id": "trapezoid",
            "name": "lw1_math_func",
            "value": "trapezoid",
            "class": "rb_group2",
            "label": "Метод трапеций",
        },
        {
            "type": "radio",
            "id": "intersection",
            "name": "lw1_math_func",
            "value": "intersection",
            "class": "rb_group2",
            "label": "Найти пересечение",
        },
        {
            "type": "radio",
            "id": "show_save_load",
            "name": "lw1_math_func",
            "value": "show_save_load",
            "class": "rb_group2",
            "label": "Отобразить / сохранить / загрузить",
        }
    ]
    
    let ctrl_pan = document.querySelector("#ctrl_pan");
    
    let form1 = document.createElement("form");
    form1.id = "rb_form1";
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let divs = [div1, div2, div3];
    for (let i=0; i<options1.length; i++) {
        let rb = document.createElement("input");
        let lb = document.createElement("label");

        rb.type = options1[i].type;
        rb.id = options1[i].id;
        rb.name = options1[i].name;
        rb.value = options1[i].value;
        lb.for = options1[i].id;
        lb.classList.add(options1[i].class);
        lb.append(options1[i].label);

        divs[i].append(rb, lb);
        divs[i].classList.add("form_divs");

        form1.append(divs[i]);
    }


    let form2 = document.createElement("form");
    form2.id = "rb_form2";

    for (let i=0; i<options2.length; i++) {
        let rb = document.createElement("input");
        let lb = document.createElement("label");
        
        rb.type = options2[i].type;
        rb.id = options2[i].id;
        rb.name = options2[i].name;
        rb.value = options2[i].value;
        lb.for = options2[i].id;
        lb.classList.add(options2[i].class);
        lb.append(options2[i].label);
        form2.append(rb, lb);
    }
    ctrl_pan.append(form1, form2);
    
    let mode = undefined;

    document.querySelector("#func1").addEventListener("change", (event) => {
        console.log(options1[0].label);
        mode = event.target.value;
        cleanRes();
    });
    document.querySelector("#func2").addEventListener("change", (event) => {
        console.log(options1[1].label);
        mode = event.target.value;
        cleanRes();
    });
    document.querySelector("#func3").addEventListener("change", (event) => {
        console.log(options1[2].label);
        mode = event.target.value;
        cleanRes();
    });

    document.querySelector("#rectangle").addEventListener("change", (event) => {
        console.log(event.target.value, mode);
        makeInputForm(form2, options_rct, funcs[0]);
        cleanRes();
    });
    document.querySelector("#trapezoid").addEventListener("change", (event) => {
        console.log(event.target.value, mode);
        makeInputForm(form2, options_trp, funcs[1]);
        cleanRes();
    });
    document.querySelector("#intersection").addEventListener("change", (event) => {
        console.log(event.target.value, mode);
        makeInputForm(form2, options_inter, funcs[2]);
        cleanRes();
    });
    document.querySelector("#show_save_load").addEventListener("change", (event) => {
        console.log(event.target.value, mode);
        makeSaveLoadForm(form2, options_ssl, funcs[3], funcs[4], funcs[5]);
        cleanRes();
    });
}

function cleanRes() {
    let result = document.querySelector("#math_res");
    if (result) {
        result.remove();
    }
}