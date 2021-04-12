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