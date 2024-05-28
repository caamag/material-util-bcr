//Pesquisa de CSAT
const linkForm = 'https://centraldocliente.lg.com.br/hc/pt-br/requests/new?ticket_form_id=24263091152283';
const currentURL = window.location.href;

if (currentURL.startsWith(linkForm)) {

    const formTitle = document.querySelector('.container h1');
    formTitle.innerHTML = 'Pesquisa de satisfação';

    const form = document.querySelector('.request-form');
    const formLength = (form.length) - 8;
    const labels = document.querySelectorAll('#new_request div:nth-child(n+7) label');
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < formLength; i++) {

        const question = document.createElement('div');
        question.className = `question-container question${i}`
        var titleQuestion = document.createElement('h1')
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion)

        //icons
        const icons = document.createElement('div');
        icons.className = 'icon-content';
        question.appendChild(icons)

        //number of icons
        var title = titleQuestion.innerText.trim()
        const regex = /\((\d+)\)/;
        const match = title.match(regex)

        const maxIcons = 10;
        let iconsLength = match ? parseInt(match[1], 10) : 5;

        iconsLength = Math.max(2, Math.min(maxIcons, iconsLength));

        //definindo ícones
        let imgSource = '';
        if (title.startsWith('*')) {
            imgSource = 'https://theme.zdassets.com/theme_assets/15904219/e5d7b437e9506d0474f1970f2c50774ae320ff7f.png';
        } else {
            imgSource = 'https://theme.zdassets.com/theme_assets/15904219/e5d7b437e9506d0474f1970f2c50774ae320ff7f.png';
        }

        for (let j = 0; j < iconsLength; j++) {
            const icon = document.createElement('img');
            icon.className = `star-icon icon${i}`
            icon.src = imgSource;
            icon.addEventListener('click', () => { handleClick(icon, j, i) })
            icons.appendChild(icon);
        }
        form.appendChild(question)

        if ((i + 1) === formLength) {
            const submitBtn = document.createElement('input');
            submitBtn.setAttribute('type', 'submit');
            submitBtn.setAttribute('name', 'commit');
            submitBtn.setAttribute('value', 'Enviar avaliação');
            submitBtn.className = 'submit-btn';
            submitBtn.style.display = 'block';
            submitBtn.style.marginTop = '40px';
            form.appendChild(submitBtn)
        }
    }

    const regexText = new RegExp("\\(" + "(TXT)" + "\\)")
    const h2Textearea = document.querySelectorAll('h1');

    h2Textearea.forEach(text => {
        if (regexText.test(text.innerText)) {
            const questionWithTextArea = text.parentNode;
            questionWithTextArea.style.flexDirection = 'column';
            questionWithTextArea.style.marginBottom = '30px';
            questionWithTextArea.style.alignItems = 'start';
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

    //preenchendo conteúdo do campo de texto
    const formZendeskFields = document.querySelectorAll('.form-field');
    const zendeskFields = Array.from(formZendeskFields);
    let zendeskFieldsFilter = zendeskFields.slice(4);
    zendeskFieldsFilter.pop();

    zendeskFieldsFilter.forEach(field => {
        const index = zendeskFieldsFilter.indexOf(field);
        field.classList.add(`question${index}`)
    });

    formZendeskFields.forEach(field => {
        field.classList.add('deleted-field')
    })

    const textareaFields = document.querySelectorAll('.multilinha');
    textareaFields.forEach(field => {
        const classQuestion = field.parentNode.classList[1];
        const indexQuestion = classQuestion[classQuestion.length - 1]

        field.addEventListener('input', () => {
            if (field.parentNode.classList[1] === zendeskFieldsFilter[indexQuestion].classList[4]) {
                zendeskFieldsFilter[indexQuestion].querySelector('input').value = field.value
                field.classList.remove('.delete-field')
            }
        })

        const footerForm = document.querySelector('.request-form footer');
        footerForm.style.display = 'none';
    })


    const apiUrl = 'https://centraldocliente.lg.com.br/api/v2/ticket_forms'
    const campos = [];
    async function getFields() {
        const res = await fetch(apiUrl)
        const data = await res.json()
        const forms = data.ticket_forms;
        const csatForm = forms.filter(form => form.name === 'Formulário de CSAT');
        let sliceNumber = 6;
        if (csatForm[0].ticket_field_ids.length < 12) {
            sliceNumber = 2;
        }
        const IDs = csatForm[0].ticket_field_ids.slice(sliceNumber);

        for (let f = 0; f < IDs.length; f++) {
            const el = document.querySelector(`.request_custom_fields_${IDs[f]}`)
            if (el.classList.contains('string')) {
                campos.push(document.querySelector(`.request_custom_fields_${IDs[f]} input`))
            } else if (el.classList.contains('text')) {
                campos.push(document.querySelector(`.request_custom_fields_${IDs[f]} textarea`))
            }
        }
    }
    getFields()


    function handleClick(star, index, questionIndex) {
        const allStars = star.parentNode.querySelectorAll('.star-icon');
        selectedLengths[questionIndex] = index + 1;

        for (let i = 0; i < allStars.length; i++) {
            if (i <= index) {
                allStars[i].classList.add('selected');
                allStars[i].src = 'https://theme.zdassets.com/theme_assets/15904219/ec8f628882d88500dd00a82f7ef5313585e49fa4.png'
            } else {
                allStars[i].classList.remove('selected');
                allStars[i].src = 'https://theme.zdassets.com/theme_assets/15904219/d4cb6311f25109edeaaba3b334851438a16668ee.png'
            }
        }
        campos[questionIndex].value = selectedLengths[questionIndex];
    }

    //garantindo nota máxima
    form.addEventListener('submit', () => {
        zendeskFieldsFilter.forEach(field => {
            if (field.querySelector('input').value > 5 && !field.classList.contains('question0')) {
                field.querySelector('input').value = 5;
            }
        })
    })
};


if (window.location.href === 'https://centraldocliente.lg.com.br/hc/pt-br/requests/new') {
    const optionContainer = document.querySelector('.options-container');
    const options = document.querySelector('.options');
    let isRendered = false;

    optionContainer.addEventListener('click', async () => {
        if (isRendered) {
            options.innerHTML = '';
            isRendered = false;
            return;
        }

        const res = await fetch('/api/v2/ticket_forms');
        const data = await res.json()
        const forms = data.ticket_forms.filter(form => form.restricted_brand_ids.includes(22592839539611)
            && form.raw_display_name !== "Solicitação não atendida"
            && form.raw_display_name !== "Pesquisa de satisfação"
            && form.restricted_brand_ids != []);

        forms.map(form => {
            let content = `
                <a href="https://centraldocliente.lg.com.br/hc/pt-br/requests/new?ticket_form_id=${form.id}" 
                class="option-name" target='blank'>
                    ${form.display_name}
                </a><br><br>
            `;
            options.insertAdjacentHTML('afterbegin', content);
        })
        isRendered = true;
    })
}
