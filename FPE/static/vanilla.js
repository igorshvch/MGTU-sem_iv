function sayHi() {
    const phrase = "Hello, world!";
    let body = document.querySelector("body");
    let content_div = document.createElement("div");
    let header = document.createElement("h1");
    header.append(phrase);
    content_div.append(header);
    body.append(content_div);
}

sayHi();

///////////////////////////////////////////////////////

function create_content_box() {

    const header_phrase = "Дабораторная работа по Основам программной инженерии № 1";

    let box = document.createElement("div")
    let header_container = document.createElement("div");
    let task_description = document.createElement("div");
    let control_panel = document.createElement("div");
    let content_div = document.createElement("div");

    header_container.append(phrase);



}