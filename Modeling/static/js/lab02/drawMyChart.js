export function drawMyChart(elem, params, coordsX, coordsY) {
    console.log("THIS IS DRAWMYCHART ", coordsX)
    console.log("THIS IS DRAWMYCHART ", coordsY)
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
                },
                line: {
                    tension: 0.2
                }
            },
            scales: {
                x: {
                    min: params.start,
                    max: params.stop,
                    /*
                    ticks: {
                        callback: function(value, index, values) {
                            if(index%params.steps === 0) {
                              return value;
                            }
                        }
                    }
                    */
                },
                y: {
                    //position: "center",
                    /*
                    ticks: {
                        stepSize: 0.2,
                        callback: function(value, index, values) {
                            if(index%params.steps === 0) {
                              return value;
                            }
                        }
                    }
                    */
                }
                /*
                xAxes: {
                    //position: 'center',
                    ticks: {
                        beginAtZero: true,
                        stepValue: 1,
                        max: 10,
                        //maxTicksLimit: 5,
                        //stepSize: 0.5,
                        //suggestedMin: 0.5,
                        //suggestedMax: 5.5,
                    }
                },
                yAxes: {
                    //position: 'center',
                    //min: -1,
                    //max: 1,
                    ticks: {
                        //beginAtZero: true,
                        //stepValue: 1,
                        max: 10,
                        //maxTicksLimit: 5,
                        //stepSize: 0.5,
                        //suggestedMin: 0.5,
                        //suggestedMax: 5.5,
                    }
                }
                */
              }
        }
    }

    let myChart = new Chart(
        ctxCanvas,
        config
    );

    elem.append(myCanvas);
}