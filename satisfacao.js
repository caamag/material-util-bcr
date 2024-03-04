const linkForm = 'https://con-bcrcx-fabio.zendesk.com/hc/pt-br/requests/new?ticket_form_id=22597685887899';
const urlAtual = window.location.href;

if (urlAtual.startsWith(linkForm)) {

    const form = document.querySelector('.request-form');
    const questionLength = (form.length) - 9;
    const labels = document.querySelectorAll('#new_request div:nth-child(n+8) label');
    const selectedLengths = [0, 0, 0, 0];

    //questions
    for (let i = 0; i < questionLength; i++) {
        const question = document.createElement('div');
        question.className = `question-container question${i}`;
        const titleQuestion = document.createElement('h2');
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion);

        //stars
        const stars = document.createElement('div');
        stars.className = 'stars-content';
        question.appendChild(stars);

        //definindo quantidade de ícones
        const titleField = titleQuestion.innerText.trim()
        const regex1 = new RegExp("\\(" + "(NPS)" + "\\)")
        const regex2 = new RegExp("\\(" + "(2)" + "\\)")
        const regex3 = new RegExp("\\(" + "(3)" + "\\)")
        const regex4 = new RegExp("\\(" + "(4)" + "\\)")
        const regex5 = new RegExp("\\(" + "(5)" + "\\)")
        const regex6 = new RegExp("\\(" + "(6)" + "\\)")
        const regex7 = new RegExp("\\(" + "(7)" + "\\)")
        const regex8 = new RegExp("\\(" + "(8)" + "\\)")
        const regex9 = new RegExp("\\(" + "(9)" + "\\)")

        if (regex1.test(titleField) || titleQuestion.innerText.trim().endsWith("(10)")) {
            iconsLength = 10;
        } else if (regex2.test(titleField)) {
            iconsLength = 2;
        } else if (regex3.test(titleField)) {
            iconsLength = 3;
        } else if (regex4.test(titleField)) {
            iconsLength = 4;
        } else if (regex5.test(titleField)) {
            iconsLength = 5;
        } else if (regex6.test(titleField)) {
            iconsLength = 6;
        } else if (regex7.test(titleField)) {
            iconsLength = 7;
        } else if (regex8.test(titleField)) {
            iconsLength = 8;
        } else if (regex9.test(titleField)) {
            iconsLength = 9;
        } else {
            iconsLength = 5;
        }

        //definindo icone
        let imgSource = ''
        if (titleQuestion.innerText.trim().startsWith("*")) {
            imgSource = 'https://www.svgrepo.com/show/533052/star.svg'
        } else if (titleQuestion.innerText.trim().startsWith("S2")) {
            imgSource = 'https://cdn.iconscout.com/icon/free/png-256/free-heart-1161-457786.png'
        } else {
            imgSource = 'https://www.svgrepo.com/show/533052/star.svg'
        }

        for (let j = 0; j < iconsLength; j++) {
            const star = document.createElement('img');
            star.src = imgSource;
            star.className = `star-icon icon${j}`;
            star.addEventListener('click', () => { handleClick(star, j, i); });
            stars.appendChild(star);
        }
        form.appendChild(question);
    }

    //definindo se campo de texto/número ou multilinha
    const regexText = /^.*\(TXT\).*$/
    const h2Textearea = document.querySelectorAll('h2')

    h2Textearea.forEach((txt) => {
        if (regexText.test(txt.innerText)) {
            const questionWithTextArea = txt.parentNode
            const starContent = questionWithTextArea.querySelectorAll('.stars-content')
            starContent.forEach((content) => {
                content.style.display = 'none'
            })
            const newTextarea = document.createElement('textarea')
            newTextarea.classList.add('multilinha')
            questionWithTextArea.appendChild(newTextarea)
        }
    })

    //preenchendo campo de texto com valor de textarea
    const formZendeskFields = document.querySelectorAll('.form-field')
    const zendeskFields = Array.from(formZendeskFields)
    let zendeskFieldsFilter = zendeskFields.slice(5)
    zendeskFieldsFilter.pop()

    zendeskFieldsFilter.forEach((field) => {
        const index = zendeskFieldsFilter.indexOf(field)
        field.classList.add(`question${index}`)
    })

    const textareaFields = document.querySelectorAll('.multilinha')
    textareaFields.forEach((field) => {
        const classQuestion = field.parentNode.classList[1]
        const indexQuestion = classQuestion[classQuestion.length - 1]

        field.addEventListener('input', () => {
            if (field.classList === zendeskFieldsFilter[indexQuestion].classList) {
                zendeskFieldsFilter[indexQuestion].querySelector('input').value = field.value
            }
        })
    })



    const apiUrl = 'https://con-bcrcx-fabio.zendesk.com/api/v2/ticket_forms'
    const campos = [];
    async function getFields() {
        const res = await fetch(apiUrl)
        const data = await res.json()
        const IDs = data.ticket_forms[2].ticket_field_ids.slice(3)

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
            } else {
                allStars[i].classList.remove('selected');
            }
        }

        campos[questionIndex].value = selectedLengths[questionIndex];
    }
}




//ocultando campos, trocando título e prevenindo envio de form vazio
const emailField = document.querySelector('#request_anonymous_requester_email').value
const subjectField = document.querySelector('#request_subject').value
const descriptionField = document.querySelector('#request_description').value
const ticketIDField = document.querySelector('#request_custom_fields_22621760476571').value

const encodedSubject = encodeURIComponent(subjectField)
const encodedDescription = encodeURIComponent(descriptionField)

const customerUrl = `${linkForm}&tf_subject=${encodedSubject}&tf_description=${encodedDescription}&tf_anonymous_requester_email=${emailField}&tf_22621760476571=${ticketIDField}`

if (urlAtual.startsWith(linkForm)) {

    const fields = document.querySelectorAll('.form-field')
    fields.forEach((item) => {
        item.classList.add('delete-field ')
    })
    const formTitle = document.querySelector('.container h1')
    formTitle.innerHTML = 'Ajude-nos com sua opinião'

    const form = document.querySelector('.request-form')
    form.addEventListener('submit', () => {

        let empty = false

        const fields = document.querySelectorAll('.form-field')
        fields.forEach((input) => {
            if (input.value === '' && !input.classList.contains('optional')) {
                empty = true;
            }
        })

        if (empty) {
            alert('Formulário não enviado! Favor preencher todos os campos.')
            setTimeout(() => {
                window.location.assign(customerUrl);
            }, 100);

        }
    })

}