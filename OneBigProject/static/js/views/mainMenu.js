export function createNavBar(options) {
    let body = document.querySelector("body");

    let navBar = document.createElement("div");
    navBar.classList.add("nav-bar");

    let upperList = document.createElement("ul");
    
    for (let subj of options) {
        let upperLi = document.createElement("li");
        let a = document.createElement("a");
        a.append(subj.subject);
        upperLi.append(a)
        
        let innerList = document.createElement("ul");
        innerList.classList.add("hidden");
        for (let lw of subj.lws) {
            let innerLi = document.createElement("li");
            let a = document.createElement("a");
            a.append(lw);
            innerLi.append(a);
            innerList.append(innerLi);
        }
        upperLi.append(innerList);
        upperList.append(upperLi);
    }

    navBar.append(upperList);
    body.append(navBar);
}