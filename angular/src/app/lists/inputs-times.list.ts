let index: number = 0;

export const INPUTS_TIMES = [
    {
        id: index++,
        title: "Temps de préparation :",
        name: 'makingTime',
        condition: {
            name: 'makingCondition',
            selected: 'yes',
            yes: 'Oui',
            no: 'Non'
        },
        hours: {
            type: 'number',
            inputId: 'makingTimeHours',
            placeholder: 'Heures',
            required: false
        },
        minutes: {
            type: 'number',
            inputId: 'makingTimeMinutes',
            placeholder: 'Minutes',
            required: true
        },
        required: true,
    }, {
        id: index++,
        title: "Temps de cuisson :",
        name: 'cookingTime',
        condition: {
            name: 'cookingCondition',
            selected: 'no',
            yes: 'Oui',
            no: 'Non'
        },
        hours: {
            type: 'number',
            inputId: 'cookingTimeHours',
            placeholder: 'Heures',
            required: false
        },
        minutes: {
            type: 'number',
            inputId: 'cookingTimeMinutes',
            placeholder: 'Minutes',
            required: false
        },
        required: false,
    }, {
        id: index++,
        title: "Temps de pause :",
        name: 'pauseTime',
        condition: {
            name: 'pauseCondition',
            selected: 'no',
            yes: 'Oui',
            no: 'Non'
        },
        hours: {
            type: 'number',
            inputId: 'pauseTimeHours',
            placeholder: 'Heures',
            required: false
        },
        minutes: {
            type: 'number',
            inputId: 'pauseTimeMinutes',
            placeholder: 'Minutes',
            required: false
        },
        required: false,
    }, 
];
