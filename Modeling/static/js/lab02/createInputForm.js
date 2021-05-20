export function createInputArea(parent, options, labels, func) {
    let oldCharts = document.querySelectorAll(".chart_box");
    for (let oldChart of oldCharts) oldChart.remove();

    let container = document.querySelector(".container_input");
    if (container) {
        container.remove();
    }
    container = document.createElement("div");
    container.classList.add("container_input");
    let form = document.createElement("form");
    form.id = "form_rbtns";
    
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
        form.append(inner_container);
    }
    
    let evalButton = document.querySelector("#eval_button");
    if (evalButton) {
        evalButton.remove();
    }
    evalButton = document.createElement("button");
    evalButton.id = "eval_button";
    evalButton.append("Обработать данные");
    evalButton.addEventListener("click", func);
    
    container.append(form)
    parent.append(container);
    parent.parentNode.append(evalButton);
}