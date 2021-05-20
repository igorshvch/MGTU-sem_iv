export function getRandTbl () {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5000/lab01/get_rand_tbl', {method: "GET"})
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            });
        });
}

export function evalRand (data) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5000/lab01/eval_data', {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log("THIS IS POST!")
            console.log(data);
            resolve(data);
        })
    });
}




/*
export function getTask() {
    fetch('http://127.0.0.1:5000/tasks/task_01')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.lw1);
            store.task = data;
        });
}

export function getRandAlg() {
    fetch('http://127.0.0.1:5000/get_rand_alg')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            store.alg = data;
        });
}

export function getRandTbl() {
    fetch('http://127.0.0.1:5000/get_rand_tbl')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            store.tbl = data;
        });
}
*/