
const linkForm = 'https://pandorabrasil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=27014006985235';
const urlAtual = window.location.href;

if (urlAtual.startsWith(linkForm)) {
    
    const form = document.querySelector('.request-form')
    const questionLength = (form.length) - 9
    const labels = document.querySelectorAll('#new_request div:nth-child(n+8) label')
    const selectedLengths = [0, 0, 0, 0];

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

        let originalTitle = titleQuestion.innerText.trim()
        let imgSource = 'https://theme.zdassets.com/theme_assets/16231370/76e11baadb52ef6e072544b46625aee03d6c69eb.png';

        const regexStar = /\*/;
        if (originalTitle.startsWith("*")) {
            titleQuestion.innerHTML = originalTitle.replace(regexStar, '<span class="styled-term">*</span>');
            imgSource = 'https://theme.zdassets.com/theme_assets/16231370/76e11baadb52ef6e072544b46625aee03d6c69eb.png';
        }

        const regexNumber = /\((\d+)\)/;
        const matchNumber = originalTitle.match(regexNumber)
        if (matchNumber) {
            titleQuestion.innerHTML = titleQuestion.innerHTML.replace(regexNumber, `<span class="styled-number">$&</span>`);
        }

        const regexHeart = /S2/;
        if (originalTitle.startsWith("S2")) {
            titleQuestion.innerHTML = originalTitle.replace(regexHeart, '<span class="styled-term">S2</span>');
            imgSource = 'https://cdn.iconscout.com/icon/free/png-256/free-heart-1161-457786.png';
        }



        for (let j = 0; j < iconsLength; j++) {
            const star = document.createElement('img');
            star.src = imgSource;
            star.className = `star-icon icon${j}`;
            star.addEventListener('click', () => { handleClick(star, j, i); });
            stars.appendChild(star);
        }

        form.appendChild(question);

        //criando botão de submit
        if ((i + 1) === questionLength) {
            const submitBtn = document.createElement('input')
            submitBtn.setAttribute("type", "submit")
            submitBtn.setAttribute("name", "commit")
            submitBtn.setAttribute("value", "Enviar")
            submitBtn.classList.add('submit-btn')

            form.appendChild(submitBtn)
        }

        //removendo botão tradicional
        const currentSubmitBtn = document.querySelector('#new_request footer input')
        currentSubmitBtn.style.display = 'none'
    }

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

        const classQuestion = field.parentNode.classList[1]; 
        const indexQuestion = classQuestion[classQuestion.length - 1]
        
        field.addEventListener('input', () => {
            if (classQuestion === zendeskFieldsFilter[indexQuestion].classList[4]) {
                zendeskFieldsFilter[indexQuestion].querySelector('input').value = field.value; 
                field.classList.remove('.delete-field')
            }
        })
    })

    const apiUrl = 'https://pandorabrasil.zendesk.com/api/v2/ticket_forms'
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
    getFields(); 

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

    const fields = document.querySelectorAll('.form-field')
    fields.forEach((item) => {
        item.classList.add('delete-field')
    })

    const formContainer = document.querySelector('.form'); 
    formContainer.classList.add('form-container');

    const formTitle = document.querySelector('.container h1')
    formTitle.classList.add('form-title')
    formTitle.innerHTML = 'Avalie o nosso atendimento'

}

//envio de form com dados incompletos
const emailField = document.querySelector('#request_anonymous_requester_email').value 
const ticketIDField = document.querySelector('#request_custom_fields_27062271901843').value

const customerUrl = `${linkForm}&tf_subject=Pesquisa%20de%20Csat&tf_description=Pesquisa%20de%20Csat&tf_anonymous_requester_email=${emailField}&tf_27062271901843=${ticketIDField}`; 

if (urlAtual.startsWith(linkForm)) {

    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.addEventListener('click', () => {

        const formInputs = document.querySelectorAll('.form-field input');
        formInputs.forEach((input) => {

            if (input.value === '' && input.parentNode.classList.contains('required')) {
                alert("Preencha o formulário completamente."); 
                setTimeout(() => {
                    window.location.assign(customerUrl)
                }, 100)
            }
        })
    })
}




//formulário de NPS
const NPSLink = 'https://pandorabrasil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=27017620445971';
if (urlAtual.startsWith(NPSLink)) {

    const form = document.querySelector('.request-form')
    const questionLength = (form.length) - 9
    const labels = document.querySelectorAll('#new_request div:nth-child(n+8) label')
    const selectedLengths = [0, 0, 0, 0];

    for(let i=0;i<questionLength;i++) {

        const question = document.createElement('div')
        question.className = `question-container question${i}`;
        const titleQuestion = document.createElement('h2')
        titleQuestion.innerText = labels[i].innerText; 
        question.appendChild(titleQuestion)

        //icons
        const icons = document.createElement('div');
        icons.className = 'stars-content';
        question.appendChild(icons);

        form.appendChild(question)

        const titleField = titleQuestion.innerText.trim()
        const regexNPS = new RegExp("\\(" + "(NPS)" + "\\)")
        const regexTXT = new RegExp("\\(" + "(TXT)" + "\\)")
        let iconsLength = 0; 
    
        if (regexNPS.test(titleField)) {
            iconsLength = 11;
        }else if (regexTXT.test(titleField)){
            iconsLength = 0;
        }
    
        for (let icon = 0;icon < iconsLength;icon++) {
    
            const box = document.createElement('div')
            box.classList.add('box')
            icons.appendChild(box)
    
        }
    }
}