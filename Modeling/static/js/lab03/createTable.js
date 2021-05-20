export function createTable(parent, size, mode="one") {
    let container = document.querySelector(".state_table_container");
    if (container) {
        container.remove();
    }
    container = document.createElement("div");
    container.classList.add("state_table_container");

    let table = document.createElement("table");
    table.id = "dataTable";
    let first_row = document.createElement("tr");

    for (let i=0; i<size+1; i++) {
        let cell = document.createElement("th");
        if (i>0) {
            cell.append(`S${i}`);
        }
        first_row.append(cell);
    }
    table.append(first_row);

    for (let i=0; i<size; i++) {
        let row = document.createElement("tr");
        row.classList.add("hoverable");
        for (let j=0; j<size+1; j++) {
            let cell;
            if (j === 0) {
                cell = document.createElement("th");
                cell.append(`S${i+1}`);
            } else {
                cell = document.createElement("td");
                if (mode === "one") {
                    let tbl_input = document.createElement("input");
                    tbl_input.classList.add("tbl_input");
                    tbl_input.type = "number";
                    tbl_input.value = 1;
                    cell.append(tbl_input);
                } else if (mode === "rand") {
                    let tbl_input = document.createElement("input");
                    tbl_input.classList.add("tbl_input");
                    tbl_input.type = "number";
                    tbl_input.value = getRandomInt(10);
                    cell.append(tbl_input);
                } else if (mode === "rand_min") {
                    let tbl_input = document.createElement("input");
                    tbl_input.classList.add("tbl_input");
                    tbl_input.type = "number";
                    let rndVal = getRandomInt(4);
                    tbl_input.value = rndVal>0 ? rndVal : 1;
                    cell.append(tbl_input);
                }
            }
            row.append(cell);
        }
        table.append(row);
    }

    container.append(table);
    parent.append(container);
}

export function createResultTable(parent, size, data, labels) {
    let container = document.querySelector(".res_table_container");
    if (container) {
        container.remove();
    }
    container = document.createElement("div");
    container.classList.add("res_table_container");

    let table = document.createElement("table");
    table.id = "resTable";
    let first_row = document.createElement("tr");

    for (let i=0; i<3; i++) {
        let cell = document.createElement("th");
        cell.append(labels[i]);
        first_row.append(cell);
    }
    table.append(first_row);

    for (let i=0; i<size; i++) {
        let row = document.createElement("tr");
        row.classList.add("hoverable");
        let cell = document.createElement("th");
        cell.append(`S${i+1}`);
        row.append(cell);
        for (let j=0; j<2; j++) {
            let cell = document.createElement("td");
            cell.append(data[i][j]);
            row.append(cell);
        }
        table.append(row);
    }

    container.append(table);
    parent.append(container);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}