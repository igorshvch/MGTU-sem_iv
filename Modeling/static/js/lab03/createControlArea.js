export function createRangeInput(parent, options, labels) {
    let container = document.querySelector(".control_area");
    if (!container) {
        container = document.createElement("div");
        container.classList.add("control_area");
    }
    let form = document.createElement("form");
    form.classList.add("form_input");

    for (let i=0; i<options.length; i++) {
        let inner_container = document.createElement("div");
        inner_container.classList.add("form_inner_container");
        
        let input_field = document.createElement("input");
        let label = document.createElement("label");
        label.append(labels[i]);
        
        for (let property of Object.keys(options[i])) {
            input_field[property] = options[i][property];
        }

        let display = document.createElement("div");
        display.classList.add("displ");
        display.append(options[i].value);

        inner_container.append(label, input_field, display);
        form.append(inner_container);

        input_field.addEventListener("input", ()=>{
            display.innerHTML = input_field.value;
            console.log(input_field.value);
        });
    }

    container.append(form);
    parent.append(container);
}

export function createFillerOptions(parent, options, selectionLabel) {
    let container = document.querySelector(".control_area");
    if (!container) {
        container = document.createElement("div");
        container.classList.add("control_area");
    }

    let form = document.createElement("form");
    form.classList.add("form_input");

    let inner_container = document.createElement("div");
    inner_container.classList.add("form_inner_container");

    let selection = document.createElement("select");
    selection.id = "selected_item";
    
    let label = document.createElement("label");
    label.append(selectionLabel);

    for (let i=0; i<options.length; i++) {
        let option = document.createElement("option");

        for (let property of Object.keys(options[i])) {
            option[property] = options[i][property];
        }
        
        option.append(options[i]["label"]);
        selection.append(option);
    }

    inner_container.append(label, selection)
    form.append(inner_container)
    container.append(form);
    parent.append(container);
}