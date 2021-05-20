export function createRBtns(parent, options, labels, ...funcs) {
    if (options.length !== funcs.length) {
        console.log("CREATEBTNS: ERROR!");
        return 0;
    }

    let container = document.createElement("div");
    container.classList.add("container_form");
    let form = document.createElement("form");
    form.id = "form_rbtns";
    
    for (let i=0; i<options.length; i++) {
        let inner_container = document.createElement("div");
        inner_container.classList.add("form_inner_container");
        
        let rbtn = document.createElement("input");
        rbtn.type = "radio";
        let label = document.createElement("label");
        label.append(labels[i]);
        
        for (let property of Object.keys(options[i])) {
            rbtn[property] = options[i][property];
        }

        rbtn.addEventListener("change", funcs[i]);
        
        inner_container.append(rbtn, label);
        form.append(inner_container);
    }
    
    container.append(form)
    parent.append(container);
}