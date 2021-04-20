export function getTask() {
    fetch('http://127.0.0.1:5000/tasks/task_01')
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.status);
            //printRecivedData(data);
        });
}