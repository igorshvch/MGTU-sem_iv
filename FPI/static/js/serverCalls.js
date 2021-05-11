import {
  makeCoordsTable,
  drawMyChart
} from "./components/resultPanel.js"

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

export async function math2(content, elem) {
  const url = "http://127.0.0.1:5000/calc_igl_trp";
  try {
      const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(content), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Everything is ok in MATH2!");
      const json = await response.json();
      console.log('Успех:', json);
      elem.append(json.res);
    } catch (error) {
      console.error('Ошибка:', error);
    }
}

export async function math3(content, elem) {
  const url = "http://127.0.0.1:5000/eval_intersect_point";
  try {
      const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(content), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Everything is ok in MATH3!");
      const json = await response.json();
      console.log('Успех:', json);
      elem.append(json.res);
    } catch (error) {
      console.error('Ошибка:', error);
    }
}

export async function renderChart(content, elem) {
  const url = "http://127.0.0.1:5000/eval_coords";
  try {
    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(content), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Everything is ok in EVAL_COORDS!");
    const json = await response.json();
    if (json.x) {
      console.log('Успех:', json);
      let arrX = Array.from(json.x);
      let arrY = Array.from(json.y);
      drawMyChart(elem, arrX, arrY);
      makeCoordsTable(elem, arrX, arrY);
    }
    else {
      alert(json.res);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function saveCoords(content, elem) {
  const url = "http://127.0.0.1:5000/save_coords";
  try {
    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(content), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Everything is ok in EVAL_COORDS!");
    const json = await response.json();
    if (json.x) {
      console.log('Успех:', json);
      let arrX = Array.from(json.x);
      let arrY = Array.from(json.y);
      makeCoordsTable(elem, arrX, arrY);
      drawMyChart(elem, arrX, arrY);
      alert("Таблица координат для построения графика успешно сохранена");
    }
    else {
      alert(json.res);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

export async function loadCoords(elem) {
  const url = "http://127.0.0.1:5000/load_coords";
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Everything is ok in EVAL_COORDS!");
    const json = await response.json();
    if (json.x) {
      console.log('Успех:', json);
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      p1.classList.add("elem_tbl");
      p2.classList.add("elem_tbl");
      p1.append(`Функция: ${json.func}`);
      p2.append(`Шаг: ${json.step}`);
      elem.append(p1, p2);
      let arrX = Array.from(json.x);
      let arrY = Array.from(json.y);
      drawMyChart(elem, arrX, arrY);
      makeCoordsTable(elem, arrX, arrY);
    }
    else {
      console.log(json);
      alert("Файл с координатами пуст!");
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}