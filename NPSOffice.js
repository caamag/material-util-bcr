const linkForm = 'https://office-total.zendesk.com/hc/pt-br/requests/new?ticket_form_id=26870369309965';
const currentURL = window.location.href;

if (currentURL.startsWith(linkForm)) {

    const formTitle = document.querySelector('.container h1')
    formTitle.style.display = 'none'

    const form = document.querySelector('.request-form')
    let childCut = 7;
    if (form.length > 9) {childCut = 8}
    const formLength = (form.length) - 8;
    const labels = document.querySelectorAll(`#new_request div:nth-child(n+${childCut}) label`)
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < formLength; i++) {
        const question = document.createElement('div');
        question.className = `question-container question${i}`
        const titleQuestion = document.createElement('h1')
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion)
      	
      	const regexNPS = new RegExp("\\(" + "(NPS)" + "\\)")
        if (regexNPS.test(titleQuestion.innerText)) {
            const textWithoutTag = titleQuestion.innerText.replace(regexNPS, ``)
            titleQuestion.innerText = textWithoutTag;
        }

        //icons
        const icons = document.createElement('div');
        icons.className = 'icon-content';
        question.appendChild(icons)
        
        for (let j = 0; j < 11; j++) {
            const icon = document.createElement('div')
            icon.classList.add('box')
            icon.innerHTML = j
            icons.appendChild(icon)
            icon.addEventListener('click', () => { handleClick(icon, j, i) })
        }

        form.append(question);

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

    const apiUrl = 'https://office-total.zendesk.com/api/v2/ticket_forms';
    const campos = [];

    const getFields = async () => {
        const res = await fetch(apiUrl)
        const data = await res.json()
        const forms = data.ticket_forms
        const csatForm = forms.filter(form => form.name === 'NPS')
        let sliceNumber = 9;
        if (csatForm[0].ticket_field_ids.length < 10) {
            sliceNumber = 3;
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

    const handleClick = (star, index, questionIndex) => {
        const allStars = star.parentNode.querySelectorAll('.box')
        selectedLengths[questionIndex] = index
        
        for (let i = 0; i < allStars.length; i++) {
            if (i <= index) {
                allStars[i].classList.add('selected-box');
            } else {
                allStars[i].classList.remove('selected-box');
            }
        }
        campos[questionIndex].value = selectedLengths[questionIndex];
    }
  
    const defaultSubmitBtn = document.querySelector('input[type=submit]');
    defaultSubmitBtn.style.display = 'none';
  
    const regexText = new RegExp("\\(" + "(TXT)" + "\\)")
    const h2Textearea = document.querySelectorAll('h1')
    h2Textearea.forEach(text => {
        if (regexText.test(text.innerText)) {
            const questionWithTextArea = text.parentNode;
            questionWithTextArea.style.flexDirection = 'column';
            questionWithTextArea.style.marginBottom = '30px';
            questionWithTextArea.style.alignItems = 'start';
            const iconContent = questionWithTextArea.querySelector('.icon-content');
            iconContent.style.display = 'none';

            const newTextarea = document.createElement('textarea')
            newTextarea.classList.add('multilinha')
            questionWithTextArea.appendChild(newTextarea)

            //removeno tag (TXT)
            const textWithoutTag = text.innerText.replace(regexText, '')
            text.innerText = textWithoutTag;
        }
    })


    const formZendeskFields = document.querySelectorAll('.form-field');
    formZendeskFields.forEach(field => {
        field.classList.add('deleted-field')
    })

    let sliceNumber  = 4
    if (form.length > 12) {
        sliceNumber  = 5
    }
    const zendeskFields = Array.from(formZendeskFields);
    let zendeskFieldsFilter = zendeskFields.slice(sliceNumber);
    zendeskFieldsFilter.pop();

    zendeskFieldsFilter.forEach(field => {
        const index = zendeskFieldsFilter.indexOf(field)
        field.classList.add(`question${index}`)
    })

    const textareaFields = document.querySelectorAll('.multilinha')
    textareaFields.forEach(field => {
        const classQuestion = field.parentNode.classList[1]
        const indexQuestion = classQuestion[classQuestion.length - 1]

        field.addEventListener('input', () => {
            if (field.parentNode.classList[1] === zendeskFieldsFilter[indexQuestion].classList[5]) {
                zendeskFieldsFilter[indexQuestion].querySelector('input').value = field.value
                field.classList.remove('.delete-field')
            }
        })
    })

    //garantindo que não apareça campo de anexo
    const attachmentField = document.querySelectorAll('.question-container')
    attachmentField.forEach(field => {
        const title = field.querySelector('h1')
        if (title.innerText.includes('Anexos')) {
            console.log(field);
            field.style.display = 'none';
        }
    })
}