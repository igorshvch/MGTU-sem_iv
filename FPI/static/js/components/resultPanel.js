export function makeCoordsTable(elem, ...data) {
    let table = document.createElement("table");
    table.classList.add("coords_tbl");

    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let header_row = document.createElement("tr");
    let headerCol1 = document.createElement("th");
    let headerCol2 = document.createElement("th");
    headerCol1.innerHTML = "Координаты по оси Х";
    headerCol2.innerHTML = "Координаты по оси Y";
    header_row.append(headerCol1, headerCol2);
    thead.append(header_row);

    let coordsX = data[0];
    let cooresY = data[1];

    for (let i=0; i<coordsX.length; i++) {
        let row = document.createElement("tr");
        let cellX = document.createElement("td");
        let cellY = document.createElement("td");

        cellX.innerHTML = coordsX[i];
        cellY.innerHTML = cooresY[i];

        row.append(cellX, cellY);
        tbody.append(row);
    }

    table.append(thead, tbody);
    elem.append(table);
}

export function drawMyChart(elem, coordsX, coordsY) {
    let myCanvas = document.querySelector("#my_chart");
    if (!myCanvas) {
        myCanvas = document.createElement("canvas");
        myCanvas.id = "my_chart";
    }
    let ctxCanvas = myCanvas.getContext("2d");

    const labels = coordsX;
    const data = {
        labels: labels,
        datasets: [{
            label: "f(x)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: coordsY,
        }]
    };

    const config = {
        type: 'line',
        data,
        options: {
            elements: {
                point:{
                    radius: 0
                }
            },
            scales: {
                x: {
                    position: 'center'
                },
                y: {
                    position: 'center'
                }
              }
        }
    }

    let myChart = new Chart(
        ctxCanvas,
        config
    );

    elem.append(myCanvas);
}