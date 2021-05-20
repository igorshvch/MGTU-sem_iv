export let optionsRangeInput = [
    {
        type: "range",
        min: 1,
        max: 10,
        step: 1,
        value: 5,
        id: "range_input",
        name: "range_input"
    },
]

export let labelsRangeInput = [
    "Введите количество состояний системы"
]

export let selectionOptions = [
    {
        label: "Заполнить 1",
        value: "one",
        selected: 'selected'
    },
    {
        label: "Заполнить произвольно значениями от 1 до 3",
        value: "rand_min",
        selected: ''
    },
    {
        label: "Заполнить произвольно значениями от 0 до 9",
        value: "rand",
        selected: ''
    },
]

export let resTableHeaders = [
    "Состояния",
    "Предельные вероятности",
    "Время стабилизации"
]