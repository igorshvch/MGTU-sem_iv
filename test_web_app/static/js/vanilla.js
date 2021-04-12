let clock = [];

function myPrint() {
    console.log(new Date().toLocaleTimeString());
  }

function startTimer() {
    clock.push(setInterval(myPrint, 500));
}

function stopTimer() {
    for (let cur_clock of clock) {
        clearInterval(cur_clock);
    }
}

let buttonStart = document.querySelector("#starttimer");
let buttonStop = document.querySelector("#stoptimer");

console.log(buttonStart);

buttonStart.addEventListener("click", startTimer);
buttonStop.addEventListener("click", stopTimer);

/*
function startTimer() {
    clock = setInterval(() => {
        console.clear();
        console.log(new Date().toLocaleTimeString());
    }, 1000);

    setTimeout(() => { clearInterval(clock); }, 10000);
}  
*/

function createTable() {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    table.append(thead, tbody);
    //create table header
    header_row1 = document.createElement("tr");
    cell11 = document.createElement("td");
    cell11.rowSpan = 2;
    cell11.append(" ")
    cell12 = document.createElement("th");
    cell12.colSpan = 3;
    cell12.append("Табличные значения")
    cell13 = document.createElement("th");
    cell13.colSpan = 3;
    cell13.append("Алгоритмические значения")

    header_row1.append(cell11, cell12, cell13);

    header_row2 = document.createElement("tr");
    cell21 = document.createElement("th");
    cell22 = document.createElement("th");
    cell23 = document.createElement("th");
    cell24 = document.createElement("th");
    cell25 = document.createElement("th");
    cell26 = document.createElement("th");

    cell21.append("Одноразрядные");
    cell22.append("Двухразрядные");
    cell23.append("Трехразрядные");
    cell24.append("Одноразрядные");
    cell25.append("Двухразрядные");
    cell26.append("Трехразрядные");

    header_row2.append(cell21, cell22, cell23, cell24, cell25, cell26);

    //create table body
    //for(let i=0; i<10; i++) {
    //
    //}
    thead.append(header_row1, header_row2);
    document.querySelector("#content").append(table);
}

let buttonCreateTable = document.querySelector("#createTable");
buttonCreateTable.addEventListener("click", createTable);

function removeTable() {
    let tables = document.querySelectorAll("table");
    if (tables !== null) {
      for (let table of tables) {
          table.remove();
      }
    }
}

let buttonRemoveTables = document.querySelector("#removeTable");
buttonRemoveTables.addEventListener("click", removeTable);

function printRecivedData(data) {
    let par = document.createElement("p");
    par.append(data.status);
    document.querySelector("#content").append(par);
}


function ffunc1() {
    fetch('http://127.0.0.1:5000/movies')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.status);
            printRecivedData(data);
        });
}

function ffunc2() {
    fetch('http://127.0.0.1:5000/address')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.status);
            printRecivedData(data);
        });
}

function reqTst() {
    fetch('http://127.0.0.1:5000/tst')
        .then((response) => {
            if (response.ok) {
                console.log("response is ok");
            }
            //else {
            //    console.log("respomse failed");
            //}
            //return response.json();
            console.log(response.ok);
            console.log(response.headers);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.message);
            printRecivedData(data);
        });
}

let buttonFetch1 = document.querySelector("#fetch1");
buttonFetch1.addEventListener("click", ffunc1);

let buttonFetch2 = document.querySelector("#fetch2");
buttonFetch2.addEventListener("click", ffunc2);

let buttonFetch3 = document.querySelector("#fetch3");
buttonFetch3.addEventListener("click", reqTst);