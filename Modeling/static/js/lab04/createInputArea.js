export function createInputArea(parent, options, labels) {
    let container = document.createElement("div");
    container.classList.add("control_area");

    for (let i=0; i<options.length; i++) {
        let inner_container = document.createElement("div");
        inner_container.classList.add("form_inner_container");

        let input_field = document.createElement("input");
        let label = document.createElement("label");
        label.append(labels[i]);
        
        for (let property of Object.keys(options[i])) {
            input_field[property] = options[i][property];
        }
        
        inner_container.append(label, input_field);
        container.append(inner_container); 
    }

    parent.append(container);
}