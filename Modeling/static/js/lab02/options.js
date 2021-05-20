export let rbtnsLabels = [
    "Равномерное распределение",
    "Нормальное распределение",
    "Распределение Пуассона"
]

export let rbtnsOptions = [
    {
        id: "uniform",
        name: "distribution",
        value: "uniform"
    },
    {
        id: "norm",
        name: "distribution",
        value: "norm"
    },
    {
        id: "poisson",
        name: "distribution",
        value: "poisson"
    }
]

export let normLabels = [
    "Начало интервала",
    "Конец интервала",
    "Математическое ожидание (мю)",
    "Среднеквадратичное отклонение (сигма)"
]

export let normInputOptions = [
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
]

export let uniformLabels = [
    "Начало интервала",
    "Конец интервала"
]

export let uniformInputOptions = [
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
    }
]

export let poissonLabels = [
    "Количество опытов (k)",
    "Дисперсия случайной величины (лямбда)",
]

export let poissonInputOptions = [
    {
        id: "stop",
        type: "number",
        step: "1",
        value: "0"
    },
    {
        id: "lambda",
        type: "number",
        step: "0.1",
        value: "0"
    },
]