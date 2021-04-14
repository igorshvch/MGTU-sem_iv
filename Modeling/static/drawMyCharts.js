var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
myCharts = new Object;

function myDraw() {
    var myChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [{
                label: '# of Votes',
                data: [0.5440211108893698, -0.4121184852417566, -0.9893582466233818, -0.6569865987187891, 0.27941549819892586, 0.9589242746631385, 0.7568024953079282, -0.1411200080598672, -0.9092974268256817, -0.8414709848078965, 0.0, 0.8414709848078965, 0.9092974268256817, 0.1411200080598672, -0.7568024953079282, -0.9589242746631385, -0.27941549819892586, 0.6569865987187891, 0.9893582466233818, 0.4121184852417566, -0.5440211108893698],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive:false,
            tension:0.35,
            scales: {
                y: {
                    beginAtZero: false,
                    position: "center",
                    suggestedMin: -3,
                    suggestedMax: 3
                },
                x: {
                    beginAtZero: false,
                    position: "center",
                    suggestedMin: -10,
                    suggestedMax: 10
                }
            }
        }
    });
    myCharts.mch1 = myChart;
}

function myDraw2() {
    var myChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['pi/-6', 'pi/-5', 'pi/-4', 'pi/-3', 'pi/-2', 'pi/-1', '0', 'pi/1', 'pi/2', 'pi/3', 'pi/4', 'pi/5', 'pi/6'],
            datasets: [{
                label: '# of Votes',
                data: [-0.49999999999999994, -0.5877852522924731, -0.7071067811865476, -0.8660254037844386, -1.0, -1.2246467991473532e-16, 0, 1.2246467991473532e-16, 1.0, 0.8660254037844386, 0.7071067811865476, 0.5877852522924731, 0.49999999999999994],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive:false,
            tension:0.35,
            scales: {
                y: {
                    beginAtZero: false,
                    position: "center",
                    suggestedMin: -3,
                    suggestedMax: 3
                },
                x: {
                    beginAtZero: false,
                    position: "center",
                    suggestedMin: -10,
                    suggestedMax: 10
                }
            }
        }
    });
    myCharts.mch2 = myChart;
}

let buttonDraw = document.querySelector("#drawbutton");
buttonDraw.addEventListener("click", myDraw);

let buttonDraw2 = document.querySelector("#drawbutton2");
buttonDraw2.addEventListener("click", myDraw2);

let buttonClear1 = document.querySelector("#clear1");
buttonClear1.addEventListener("click", () => {
    console.log("Trying to clear plot # 1");
    myCharts.mch1.destroy();
});

let buttonClear2 = document.querySelector("#clear2");
buttonClear2.addEventListener("click", () => {
    console.log("Trying to clear plot # 2");
    myCharts.mch2.destroy();
});