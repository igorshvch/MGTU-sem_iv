function hide(elem) {
    elem.classList.add("hidden");
}

function removeFromPage(elem) {
    elem.remove();
}

export function sayHi() {
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