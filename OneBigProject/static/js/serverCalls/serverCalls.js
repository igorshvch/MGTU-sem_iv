export function getTask(header, task) {
    fetch('http://127.0.0.1:5000/tasks/task_01')
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            header.innerHTML = data.lab_works.lw_one.name;
            task.innerHTML = data.lab_works.lw_one.task;
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
        const json = await response.json();
        console.log('Успех:', json.status);
      } catch (error) {
        console.error('Ошибка:', error);
      }
}

export async function math1(content, elem) {
  const url = "http://127.0.0.1:5000/calc_igl_rect";
  try {
      const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(content), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Everything is ok in MATH1!");
      const json = await response.json();
      console.log('Успех:', json);
      elem.append(json.res);
    } catch (error) {
      console.error('Ошибка:', error);
    }
}