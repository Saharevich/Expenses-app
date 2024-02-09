let LIMIT = 10000;
const CURRENCY = 'руб.'
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status__red';
const STORAGE_LOCAL_EXPENSES = 'expenses';

const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const buttonReset = document.querySelector('.js-reeset-btn');
const historyList = document.querySelector('.js-expenses-list');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categoryNode = document.querySelector('.category-list');


const expensesFromStorage = localStorage.getItem(STORAGE_LOCAL_EXPENSES);
const expensesStorage = JSON.parse(expensesFromStorage);
let expenses = [];
if (Array.isArray(expensesStorage)) {
    expenses = expensesStorage;
};
render(expenses);

initApp(expenses);

buttonNode.addEventListener('click', function() {
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    const currentCategory = getCategory();

    if (currentCategory === 'Категории') {
        alert('Выберите категорию');
        return;
    }

    const newExpense = { category: currentCategory, amount: expense };

    expenses.push(newExpense);

    saveExpensesToStorage();

    render(expenses);

});

buttonReset.addEventListener('click', function() {
    expenses = [];
    resetButton()
})

function initLimit() {
    let storageLimit = parseInt(localStorage.getItem('LIMIT'))
    if (!storageLimit) {
        return
    } 
    
    limitNode.innerText = storageLimit;
    LIMIT = parseInt(limitNode.innerText);
}

initLimit();

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LOCAL_EXPENSES, expensesString);
}

function initApp(expenses) {
    limitNode.innerText = LIMIT;
    initLimit();
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
    renderStatus(calculateExpenses());
}

function trackExpense(expense) {
    expenses.push(expense);
}

function getExpenseFromUser() {
    const expense = parseInt(inputNode.value);

    if (!expense) {
        alert('Введите сумму!');
        return;
    }

    clearInput();

    return expense;
}

function getCategory() {
    return categoryNode.value;
}

function clearInput() {
    inputNode.value = '';
}

function calculateExpenses() {
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpenses();
    
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory() {
    let expensesListHTML = '';

    expenses.forEach(expense => {
        const elementHTML = `<li>${expense.category} - ${expense.amount} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyList.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
    sumNode.innerText = sum;
}

function renderStatus(sum) {
    const total = calculateExpenses(expenses);
    statusNode.innerText = total;

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - total} руб)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
    return;
}

function resetButton() {
    const sum = 0;
    sumNode.innerText = sum;
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    historyList.innerText = '';
    localStorage.removeItem(STORAGE_LOCAL_EXPENSES);
}


