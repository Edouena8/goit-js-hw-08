import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const dataForm = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', (evt) => {
    
    dataForm[evt.target.name] = evt.target.value;
});

refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

function populateTextarea() {
    
    const savedData = localStorage.getItem(STORAGE_KEY);

    if(savedData) {
        const parsedData = JSON.parse(savedData);
        
        refs.input.value = parsedData.email;
        refs.textarea.value = parsedData.message;
    }
}

function onTextareaInput() {
    const dataFormString = JSON.stringify(dataForm);

    localStorage.setItem(STORAGE_KEY, dataFormString);
};

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.target.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(dataForm);
}

