function hide(elem) {
    elem.classList.add("hidden");
}

function removeFromPage(elem) {
    elem.remove();
}

function sayHi() {
    const phrase = "Hello, world!";
    const btn_txt_hide = "Скрыть";
    const btn_txt_rmv = "Удалить";

    let body = document.querySelector("body");

    let content_div = document.createElement("div");
    let header = document.createElement("h1");
    let btn_hide = document.createElement("button");
    let btn_rmv = document.createElement("button");
    
    btn_hide.addEventListener("click", () => {
        hide(content_div);
    });
    btn_rmv.addEventListener("click", () => {
        removeFromPage(content_div)
    })

    header.append(phrase);
    btn_hide.append(btn_txt_hide);
    btn_rmv.append(btn_txt_rmv);
    content_div.append(header);
    content_div.append(btn_hide);
    content_div.append(btn_rmv);
    body.append(content_div);
}

sayHi();

///////////////////////////////////////////////////////

function create_content_box() {
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

    p1 = document.createElement("p");
    p1.append(dummy_headers.header);
    p2 = document.createElement("p");
    p2.append(dummy_headers.task);
    p3 = document.createElement("p")
    p3.append(dummy_headers.ctrl_pan);
    p4 = document.createElement("p");
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


function make_control_panel() {
    options = [
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

create_content_box();
make_control_panel();

///////////////////////////////////////////////////

function ffunc1() {
    fetch('http://127.0.0.1:5000/tasks/task_01')
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.status);
            //printRecivedData(data);
        });
}

ffunc1();

//////////////////////////////////////////////////


options_rct = [
    {
        "label": "Введите нижний предел",
        "label_id": "label_dwn",
        "display_id": "dsp_dwn",
        "btn_mns_id": "btn_mns_dwn",
        "btn_pls_id": "btn_pls_dwn",
    },
    {
        "label": "Введите верхний предел",
        "label_id": "label_up",
        "display_id": "dsp_up",
        "btn_mns_id": "btn_mns_up",
        "btn_pls_id": "btn_pls_up",
    },
    {
        "label": "Введите точность",
        "label_id": "label_prc",
        "display_id": "dsp_prc",
        "btn_mns_id": "btn_mns_prc",
        "btn_pls_id": "btn_pls_prc",
    },
];
options_trp = [
    {
        "label": "Введите нижний предел",
        "label_id": "label_dwn",
        "display_id": "dsp_dwn",
        "btn_mns_id": "btn_mns_dwn",
        "btn_pls_id": "btn_pls_dwn",
    },
    {
        "label": "Введите верхний предел",
        "label_id": "label_up",
        "display_id": "dsp_up",
        "btn_mns_id": "btn_mns_up",
        "btn_pls_id": "btn_pls_up",
    },
    {
        "label": "Введите шаг",
        "label_id": "label_prc",
        "display_id": "dsp_prc",
        "btn_mns_id": "btn_mns_prc",
        "btn_pls_id": "btn_pls_prc",
    },
];
options_inter = [
    {
        "label": "Введите левую границу",
        "label_id": "label_dwn",
        "display_id": "dsp_dwn",
        "btn_mns_id": "btn_mns_dwn",
        "btn_pls_id": "btn_pls_dwn",
    },
    {
        "label": "Введите правую границу",
        "label_id": "label_up",
        "display_id": "dsp_up",
        "btn_mns_id": "btn_mns_up",
        "btn_pls_id": "btn_pls_up",
    },
    {
        "label": "Введите эпсилон",
        "label_id": "label_prc",
        "display_id": "dsp_prc",
        "btn_mns_id": "btn_mns_prc",
        "btn_pls_id": "btn_pls_prc",
    },
];

storage = new Object();