export function makeInputForm(elem, options, func) {
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
        let userinput = document.createElement("input");

        userinput.type = "number";
        userinput.step = 0.01;
        userinput.value = 0;

        inner_container.classList.add("ctr_pan_inner_ctr");

        label.append(options[i].label);
        label.id = options[i].label_id;
        userinput.id = options[i].userinput_id;
        if (userinput.id.includes("prc_rct") || userinput.id.includes("prc_trp")) {
            userinput.step = 1;
        }
        
        userinput.classList.add("ctr_pan_userinput");
        label.classList.add("ctr_pan_label");

        inner_container.append(label, userinput);
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
        if (!dsp_prc) {
            dsp_prc = document.querySelector("#dsp_prc_trp");
        }
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.value)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.value)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.value)}`);
        let content = new Object;
        content.down = dsp_dwn.value;
        content.up = dsp_up.value;
        content.prc = dsp_prc.value;
        if (document.querySelector("#func1").checked) content.mode = document.querySelector("#func1").value;
        else if (document.querySelector("#func2").checked) content.mode = document.querySelector("#func2").value;
        else if (document.querySelector("#func3").checked) content.mode = document.querySelector("#func3").value;
        console.log(content);

        let container = document.querySelector("#content");
        let result = document.querySelector("#math_res");
        if (result) {
            result.remove();
        }
        result = document.createElement("div");
        result.id = "math_res";
        container.append(result);

        func(content, result);
    });

    container.append(evalButton);

    elem.append(container);
}

export function makeSaveLoadForm (elem, options, renderChart, saveCoords, loadCoords) {
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
        let userinput = document.createElement("input");

        userinput.type = "number";
        userinput.step = 0.01;
        userinput.value = 0;

        inner_container.classList.add("ctr_pan_inner_ctr");

        label.append(options[i].label);
        label.id = options[i].label_id;
        userinput.id = options[i].userinput_id;
        if (userinput.id.includes("prc_rct") || userinput.id.includes("prc_trp")) {
            userinput.step = 1;
        }
        
        userinput.classList.add("ctr_pan_userinput");
        label.classList.add("ctr_pan_label");

        inner_container.append(label, userinput);
        container.append(inner_container);
    }

    
    let showplotButton = document.createElement("button");
    showplotButton.append("Построить график");
    showplotButton.classList.add("ssl_btn")
    let saveButton = document.createElement("button");
    saveButton.append("Сохранить");
    saveButton.classList.add("ssl_btn")
    let loadButton = document.createElement("button");
    loadButton.append("Загрузить последнее построение");
    loadButton.classList.add("ssl_btn")
    
    showplotButton.addEventListener("click", (event) => {
        event.preventDefault();
        let dsp_dwn = document.querySelector("#dsp_dwn");
        let dsp_up = document.querySelector("#dsp_up");
        let dsp_prc = document.querySelector("#dsp_prc");
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.value)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.value)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.value)}`);
        let content = new Object;
        content.down = dsp_dwn.value;
        content.up = dsp_up.value;
        content.prc = dsp_prc.value;
        if (document.querySelector("#func1").checked) content.mode = document.querySelector("#func1").value;
        else if (document.querySelector("#func2").checked) content.mode = document.querySelector("#func2").value;
        else if (document.querySelector("#func3").checked) content.mode = document.querySelector("#func3").value;
        console.log(content);

        let container = document.querySelector("#content");
        let result = document.querySelector("#math_res");
        if (result) {
            result.remove();
        }
        result = document.createElement("div");
        result.id = "math_res";
        //let chartArea = document.createElement("canvas");
        //chartArea.id = "myChart";
        //result.append(chartArea);
        container.append(result);

        renderChart(content, result);
    });

    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        let dsp_dwn = document.querySelector("#dsp_dwn");
        let dsp_up = document.querySelector("#dsp_up");
        let dsp_prc = document.querySelector("#dsp_prc");
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.value)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.value)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.value)}`);
        let content = new Object;
        content.down = dsp_dwn.value;
        content.up = dsp_up.value;
        content.prc = dsp_prc.value;
        if (document.querySelector("#func1").checked) content.mode = document.querySelector("#func1").value;
        else if (document.querySelector("#func2").checked) content.mode = document.querySelector("#func2").value;
        else if (document.querySelector("#func3").checked) content.mode = document.querySelector("#func3").value;
        console.log(content);

        let container = document.querySelector("#content");
        let result = document.querySelector("#math_res");
        if (result) {
            result.remove();
        }
        result = document.createElement("div");
        result.id = "math_res";
        container.append(result);
        saveCoords(content, result);
    });
    loadButton.addEventListener("click", (event) => {
        event.preventDefault();
        let dsp_dwn = document.querySelector("#dsp_dwn");
        let dsp_up = document.querySelector("#dsp_up");
        let dsp_prc = document.querySelector("#dsp_prc");
        console.log(`dsp_dwn: ${Number.parseFloat(dsp_dwn.value)}`);
        console.log(`dsp_up: ${Number.parseFloat(dsp_up.value)}`);
        console.log(`dsp_prc: ${Number.parseFloat(dsp_prc.value)}`);
        let content = new Object;
        content.down = dsp_dwn.value;
        content.up = dsp_up.value;
        content.prc = dsp_prc.value;
        if (document.querySelector("#func1").checked) content.mode = document.querySelector("#func1").value;
        else if (document.querySelector("#func2").checked) content.mode = document.querySelector("#func2").value;
        else if (document.querySelector("#func3").checked) content.mode = document.querySelector("#func3").value;
        console.log(content);

        let container = document.querySelector("#content");
        let result = document.querySelector("#math_res");
        if (result) {
            result.remove();
        }
        result = document.createElement("div");
        result.id = "math_res";
        container.append(result);
        loadCoords(result);
    });

    container.append(showplotButton, saveButton, loadButton);

    elem.append(container);
}