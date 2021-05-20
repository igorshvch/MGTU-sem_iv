export function createResultTable(parent, data, labels) {
    let container = document.querySelector(".res_table_container");
    if (container) {
        container.remove();
    }
    container = document.createElement("div");
    container.classList.add("res_table_container");

    let table = document.createElement("table");
    table.id = "resTable";
    
    let first_row = document.createElement("tr");
    for (let i=0; i<labels.length; i++) {
        let cell = document.createElement("th");
        cell.append(labels[i]);
        first_row.append(cell);
    }
    table.append(first_row);

    let second_row = document.createElement("tr");
    let cell1 = document.createElement("th");
    cell1.append("Длина очереди");
    let cell2 = document.createElement("td");
    cell2.append(data["dt_m"]);
    let cell3 = document.createElement("td");
    cell3.append(data["ev_m"]);
    second_row.append(cell1, cell2, cell3);
    table.append(second_row);

    /*
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
    */

    container.append(table);
    parent.append(container);
}