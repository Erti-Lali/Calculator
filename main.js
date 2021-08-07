const buttons = document.querySelectorAll('input[type="button"]');
const resultElement = document.querySelector('#result');
const BUTTON_EVENT_NAME = 'click';
const PROCESS_ATTRIBUTE_NAME = 'value';
const INCREASE_KEY = '+';
const DECREASE_KEY = '-';
const DIVIDE_KEY = '÷';
const IMPACT_KEY = '*';
const PERECENT_KEY = '%';
let previousNumber;
let process;

const del = () => {
    let newValue = resultElement.value;

    newValue = newValue.slice(0, (newValue.length - 1));
    resultElement.value = newValue;
}

const clearAll = () => {
    previousNumber = undefined;
    resultElement.value = '';
};

const printResult = (result) => {
    // sonucu inputubn içine yazdrıcan
    resultElement.value = result;
}

const getResult = () => {
    const newValue = Number(resultElement.value);

    switch(process) {
        case INCREASE_KEY:
            printResult(previousNumber + newValue);
            break;
        case DECREASE_KEY:
            printResult(previousNumber - newValue);
            break;
        case DIVIDE_KEY:
            printResult(previousNumber / newValue);
            break;
        case IMPACT_KEY:
            printResult(previousNumber * newValue);
            break;
        case PERECENT_KEY:
            printResult(previousNumber % newValue);
            break;
    };
};

const processControl = (processKey) => {
    const isNaN = Number.isNaN(Number(processKey));
    
    if (!isNaN) {
        // not nan
        const number = Number(processKey);

        resultElement.value += number;
    } else {
        if (processKey !== '=' && processKey !== 'C' && processKey !== 'DEL') {
            process = processKey;
            previousNumber = Number(resultElement.value);
            resultElement.value = '';
        } else if (processKey === 'C') clearAll();
        else if (processKey === 'DEL') del();
        else getResult();
    }
};

buttons.forEach((element) => {
    const index = element.getAttribute(PROCESS_ATTRIBUTE_NAME);

    element.addEventListener(BUTTON_EVENT_NAME, () => processControl(index));
});
