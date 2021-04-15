/////////////////////////////////////
//options for radio buttons
/////////////////////////////////////
export const options_ctr_pan = [
    {
        "type": "radio",
        "id": "table_rd",
        "name": "lw1_table",
        "value": "table",
        "class": "rb_group",
        "label": "Табличные случайные величины",
    },
    {
        "type": "radio",
        "id": "generated_rd",
        "name": "lw1_table",
        "value": "generated",
        "class": "rb_group",
        "label": "Алгоритмически сгенерированные случайные величины",
    },
    {
        "type": "radio",
        "id": "user_input_rd",
        "name": "lw1_table",
        "value": "user_input",
        "class": "rb_group",
        "label": "Пользовательский ввод",
    },
]
export const options_tbl = {
    "headers": ["Одноразрядные", "Двухразрядные", "Трехразрядные"],
    "rand_crt": ["Первый", "Второй", "Третий"],
    "tables": [
        {
            "label": "Табличные СВ",
            "id": "rn_tbl",
        },
        {
            "label": "Сгенерированные СВ",
            "id": "rn_gen",
        },
        {
            "label": "Пользовательский ввод",
            "id": "rn_gen",
        }
    ]
}

/*
export const options_trp = [
    {
        "label": "Введите нижний предел",
        "label_id": "label_dwn",
        "display_id": "dsp_dwn",
        "btn_mns_id": "btn_mns_dwn",
        "btn_pls_id": "btn_pls_dwn",
    },
    {
        "label": "Введите верхний предел",
        "label_id": "label_up",
        "display_id": "dsp_up",
        "btn_mns_id": "btn_mns_up",
        "btn_pls_id": "btn_pls_up",
    },
    {
        "label": "Введите шаг",
        "label_id": "label_prc",
        "display_id": "dsp_prc",
        "btn_mns_id": "btn_mns_prc",
        "btn_pls_id": "btn_pls_prc",
    },
];
export const options_inter = [
    {
        "label": "Введите левую границу",
        "label_id": "label_dwn",
        "display_id": "dsp_dwn",
        "btn_mns_id": "btn_mns_dwn",
        "btn_pls_id": "btn_pls_dwn",
    },
    {
        "label": "Введите правую границу",
        "label_id": "label_up",
        "display_id": "dsp_up",
        "btn_mns_id": "btn_mns_up",
        "btn_pls_id": "btn_pls_up",
    },
    {
        "label": "Введите эпсилон",
        "label_id": "label_prc",
        "display_id": "dsp_prc",
        "btn_mns_id": "btn_mns_prc",
        "btn_pls_id": "btn_pls_prc",
    },
];
*/