const campo4 = document.querySelector('.request_custom_fields_24963698304667');
const checkBox4 = document.querySelector('#request_custom_fields_24963698304667');
checkBox4.classList.add('checkbox')
const button4 = document.createElement('div');
button4.classList.add('btn-new-ticket-form');
button4.innerHTML = campo4.querySelector('label').innerText;
campo4.appendChild(button4)

const dynamicCheckContainer = document.createElement('div');
dynamicCheckContainer.classList.add('dynamic-check-container');
button4.appendChild(dynamicCheckContainer)

const dynamicCheck = document.createElement('div')
dynamicCheck.classList.add('dynamic-check')
dynamicCheckContainer.appendChild(dynamicCheck)

dynamicCheckContainer.addEventListener('click', (e) => {
    e.preventDefault();

    //checking the checkbox questions
    if (checkBox4.checked) {
        checkBox4.checked = false
    } else {
        checkBox4.checked = true
    }

    //change a dynamic checkbox
    if (dynamicCheck.classList.contains('dynamic-check-checked')) {
        dynamicCheck.classList.remove('dynamic-check-checked');
        dynamicCheckContainer.style.backgroundColor = 'white';
    } else {
        dynamicCheck.classList.add('dynamic-check-checked');
        dynamicCheckContainer.style.backgroundColor = 'black';
    }
});


if (window.location.href.startsWith('https://centraldocliente.lg.com.br/hc/pt-br/requests/new?ticket_form_id=24847865198491')) {
    const label = document.querySelector('.container')
        .querySelector('h1')
        .innerHTML = 'Por que considera ainda não finalizada a sua solicitação?'
};


const regexText = new RegExp("\\(" + "(TXT)" + "\\)")
const h2Textearea = document.querySelectorAll('h1');

h2Textearea.forEach(text => {
    if (regexText.test(text.innerText)) {
        const questionWithTextArea = text.parentNode;
        questionWithTextArea.style.flexDirection = 'column';
        questionWithTextArea.style.alignItems = 'flex-start'
        questionWithTextArea.style.height = '150px';
        const iconContent = questionWithTextArea.querySelectorAll('.icon-content');

        if (regexText.test(title)) {
            const textWithoutTag = title.replace(regexText, `<span class='nps-tag'>$&</span>`);
            titleQuestion.innerHTML = textWithoutTag;
        }

        iconContent.forEach(content => {
            content.style.display = 'none';
        })
        const newTextarea = document.createElement('textarea');
        newTextarea.classList.add('multilinha')
        questionWithTextArea.appendChild(newTextarea)
    }
})

