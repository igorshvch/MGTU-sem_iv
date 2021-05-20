export function drawMyChart(resp, parent, myTitle){
    // Create the data table.
    let data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'y');
    for (let i=0; i<resp.coordsX.length; i++) {
        data.addRow([resp.coordsX[i], resp.coordsY[i]]);
    }
    // Set chart options
    let options = {
        title: myTitle,
        //width: 600,
        //height: 600,
        legend: 'none',
        colors: ['#4caf50'],
    };
    // Instantiate and draw our chart, passing in some options.
    let chart = new google.visualization.LineChart(parent);
    chart.draw(data, options);
}