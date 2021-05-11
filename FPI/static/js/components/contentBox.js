export function createContentBox() {
    const dummy_headers = {
        "header" : "Заголовок",
        "task" : "Описание задания",
        "ctrl_pan" : "Опции",
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
    p1.classList.add("descr");
    p2.classList.add("descr");
    p3.classList.add("descr");
    p4.classList.add("descr");

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