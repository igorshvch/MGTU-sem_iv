export let store = {
    "task": undefined,
    "alg": undefined,
    "tbl": undefined,
}

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

getTask();
getRandAlg();
getRandTbl();

console.log(store);

export let outer_store = store;
