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

export async function sendData() {
    const data = {message: "Hello, world!"};
    const url = "http://127.0.0.1:5000/send_data";
    try {
        const response = await fetch(url, {
          method: 'POST', // или 'PUT'
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Everything is ok!");
        //const json = await response.json();
        //console.log('Успех:', JSON.stringify(json));
      } catch (error) {
        console.error('Ошибка:', error);
      }
}