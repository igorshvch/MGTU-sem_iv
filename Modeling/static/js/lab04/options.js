export let commonLabels = [
    "Начало интервала",
    "Конец интервала",
    "Математическое ожидание (мю)",
    "Среднеквадратичное отклонение (сигма)",
    "Общее количество заданий",
    "Процент повторной обработки (в %)",
    "Шаг (dt)"
];

export let commonInputFields = [    
    {
        id: "start",
        type: "number",
        step: "0.1",
        value: "0"
    },
    {
        id: "stop",
        type: "number",
        step: "0.1",
        value: "0"
    },
    {
        id: "mu",
        type: "number",
        step: "0.1",
        value: "0"
    },
    {
        id: "sigma",
        type: "number",
        step: "0.1",
        value: "0"
    },
    {
        id: "tasks",
        type: "number",
        step: "1",
        value: "0"
    },
    {
        id: "repeat",
        type: "number",
        step: "1",
        value: "0"
    },
    {
        id: "step",
        type: "number",
        step: "0.01",
        value: "0"
    },
];

export let resTableHeaders = [
    "Параметр",
    "Пошаговое моделирование",
    "Событийное моделирование"
]