const linkFormCSAT = 'https://office-total.zendesk.com/hc/pt-br/requests/new?ticket_form_id=26870173758349';

if (currentURL.startsWith(linkFormCSAT)) {

    const formTitle = document.querySelector('.container h1')
    formTitle.innerHTML = 'Pesquisa de Satisfação'

    const form = document.querySelector('.request-form')
    const formLength = form.length - 8
    let childCut = 7;
    if (formLength > 13) childCut = 8

    const labels = document.querySelectorAll(`#new_request div:nth-child(n+${childCut}) label`)
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < formLength; i++) {
        const question = document.createElement('div');
        question.className = `question-container question${i}`
        var titleQuestion = document.createElement('h1')
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion)

        //icons
        const icons = document.createElement('div')
        icons.className = 'icon-content-csat';
        question.appendChild(icons)
        var title = titleQuestion.innerText.trim()
    
        let imgSource = ''
        if (title.startsWith('*')) {
            imgSource = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ766D2D0YKEBCEWCR05CAD'
            titleQuestion.innerText = title.substring(1)
        } else {
            imgSource = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ766D2D0YKEBCEWCR05CAD'
        }

        const regexNumber = /\((\d+)\)/;
        const match = regexNumber.exec(title)
        let iconsLength;
        if (regexNumber.test(title)) {
            iconsLength = match ? parseInt(match[1], 10) : 5;
            const textWithoutTag = title.replace(regexNumber, `<span class='nps-tag'>$&</span>`)
            titleQuestion.innerHTML = textWithoutTag;
            if (title.startsWith('*')) {
                titleQuestion.innerHTML = textWithoutTag.substring(1)
            }
        }else{
            iconsLength = 5;
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

    //excluindo campo de id do ticket na área não logada
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(question => {
        const title = question.querySelector('h1')
        if (title.innerText === 'Ticket Original(opcional)') {
            question.style.display = 'none'
        }
    })

    const regexText = new RegExp("\\(" + "(TXT)" + "\\)")
    const h2Textearea = document.querySelectorAll('h1');
    h2Textearea.forEach(text => {
        if (regexText.test(text.innerText)) {
            const questionWithTextArea = text.parentNode;
            questionWithTextArea.style.flexDirection = 'column';
            questionWithTextArea.style.marginBottom = '30px';
            questionWithTextArea.style.alignItems = 'start';
            const iconContent = questionWithTextArea.querySelectorAll('.icon-content-csat');

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

    const textareaFields = document.querySelectorAll('.multilinha')
    textareaFields.forEach(field => {
        const classQuestion = field.parentNode.classList[1]
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

    //ajustar o indice no slice do zendeskFieldsFilter pois está sendo incluido o ticket_field_id 



    const apiUrl = 'https://office-total.zendesk.com/api/v2/ticket_forms'
    const campos = [];
    const getFields = async () => {
        const res = await fetch(apiUrl);
        const data = await res.json()
        const forms = data.ticket_forms;
        const csatForm = forms.filter(form => form.name === 'Pesquisa de CSAT')

        let sliceNumber = 9;
        if (csatForm[0].ticket_field_ids.length < 14) {
            sliceNumber = 3
        }            

        const IDs = csatForm[0].ticket_field_ids.slice(sliceNumber)
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
                allStars[i].src = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ7YMYHCP9JFM0RNGN1WYQK'
            } else {
                allStars[i].classList.remove('selected');
                allStars[i].src = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ766D2D0YKEBCEWCR05CAD'
            }
        }
        campos[questionIndex].value = selectedLengths[questionIndex];
    }

}