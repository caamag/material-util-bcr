
const url = 'https://lacostebrazil.zendesk.com/api/v2/requests.json'

async function createRequests() {

    const payloadTicket = {
        request: {
            subject: 'Hablar sobre la orden',
            comment: {
                body: 'Teste de criação de ticket'
            },
            requester: {
                email: 'caiolopesfv@gmail.com',
                name: 'Caio'
            },
            tags: [
                'teste_interno'
            ],
            fields: [
                {
                    id: 28361907533075,
                    value: 'estado_del_pedido'
                }
            ]
        }
    }

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadTicket)
        })

        const data = await res.json()
        console.log(data.request);
    } catch (error) {
        console.log(error.message);
    }
}

createRequests()


//ajustando formulário de negativa de ticket
if (window.location.href === 'https://lacoste-argentina.zendesk.com/hc/pt-br/requests/new?ticket_form_id=30425996426003') {
    const subject = document.querySelector('.request_subject')
    subject.style.display = 'none'

    const description = document.querySelector('.request_description');
    description.style.display = 'none'

    const ticketIDField = document.querySelector('.request_custom_fields_29035220664979')
    ticketIDField.style.display = 'none'

    const title = document.querySelector('h1')
    title.style.textAlign = 'center'
    title.innerText = 'Enviar Solicitación'

    const hero = document.querySelector('.hero')
    hero.style.display = 'none'

    const selectedForm = document.querySelector('.request_ticket_form_id')
    selectedForm.style.display = 'none'

    const fields = document.querySelectorAll('.form-field')
    fields.forEach(field => {
        if (field.querySelector('.upload-dropzone')) {
            field.style.display = 'none'
        }
    })
}


async function getCSATForms() {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json()

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const csatForms = data.ticket_forms.filter(form => regexCSAT.test(form.name) || regexNPS.test(form.name));
    const baseURL = '/requests/new?ticket_form_id='
    const urls = csatForms.map(form => `${baseURL}${form.id}`)

    return urls.some(url => window.location.href.includes(url))
}

getCSATForms()
    .then(isCSAtForm => {
        if (isCSAtForm) {

            //exluindo campos desnecessários
            const requestFormField = document.querySelector('.request_ticket_form_id').style.display = 'none';
            const requestSubject = document.querySelector('.request_subject').style.display = 'none';
            const requestDescription = document.querySelector('.request_description').style.display = 'none';
            const originalTicketField = document.querySelector('.request_custom_fields_30589371227923').style.display = 'none';

            //centralizando form
            const form = document.querySelector(".form").style.margin = '0 auto'
            const title = document.querySelectorAll('h1');
            title.forEach(title => {
                title.style.textAlign = 'center';
                title.innerHTML = `Questionário`
                const subtitle = document.createElement('h3')
                subtitle.classList.add('subtitle-csat')

                subtitle.innerHTML = `Olá, gostaríamos de convidá-lo a preencher
                este questionário para que possamos oferecer melhores serviços. Obrigado 
                pelo seu comentário.`

                title.appendChild(subtitle)
            })

            const booleanQuestions = document.querySelectorAll('.boolean');
            booleanQuestions.forEach((question, index) => {
                const optionalSpan = question.querySelector('.optional').style.display = 'none'
                question.style.cssText = `
                        display: flex;
                        justify-content: left;
                        flex-direction: row-reverse;
                    `;

                const label = question.querySelector('label');
                label.style.cssText = `
                        margin-left: 10px;
                        font-size: 18px;
                        font-weight: 500;
                        cursor: pointer;
                    `;

                const checkBox = question.querySelector('input[type=checkbox]');
                checkBox.style.cssText = `
                        width: 10px;
                        height: 10px;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        border-radius: 5px;
                        border: 2px solid #ccc;
                        background-color: white;
                        position: relative;
                        cursor: pointer;
                        transition: background-color 0.2s, border-color 0.2s;
                    `;

                checkBox.addEventListener('change', () => {
                    if (checkBox.checked) {
                        checkBox.style.border = '4px solid #3cb757'
                        checkBox.style.boxShadow = '0px 0px 7px #3cb757'
                        label.style.color = '#3cb757';
                    } else {
                        checkBox.style.backgroundColor = 'white'
                        checkBox.style.border = '2px solid rgb(200,200,200)'
                        checkBox.style.boxShadow = 'none'
                        label.style.color = 'black';
                    }
                })
            })

            //estilizando nota do nps
            const npsField = document.querySelector('.request_custom_fields_30588810743571');
            const npsContainer = document.createElement('div')
            npsContainer.classList.add('nps-container')
            npsField.appendChild(npsContainer)
            const npsInput = document.querySelector('#request_custom_fields_30588810743571');
            npsInput.style.display = 'none'

            function handleClick(index) {
                const allIcons = document.querySelectorAll('.nps-icon');
                allIcons.forEach((icon, idx) => {
                    if (idx <= index) {
                        icon.classList.add('selected')
                    } else {
                        icon.classList.remove('selected')
                    }
                })
                npsInput.value = index + 1
            }

            for (let i = 0; i < 10; i++) {
                const npsIcon = document.createElement('div')
                npsIcon.classList.add(`nps-icon`)
                npsIcon.innerHTML = i + 1;
                npsContainer.appendChild(npsIcon)
                npsIcon.addEventListener('click', () => { handleClick(i) })
            }

            const subtitleNPSField = document.createElement('h3')
            subtitleNPSField.innerHTML = 'Por favor diga-nos qual dos seguintes aspectos se refere ao seu atendimento:'
            subtitleNPSField.classList.add('subtitle-nps')
            npsField.appendChild(subtitleNPSField)

            //first question settings
            const firstQuestion = document.createElement('div');
            firstQuestion.classList.add('first-question-box');
            const firstFormField = document.querySelector('.request_custom_fields_30897134051603');
            firstFormField.appendChild(firstQuestion)

            firstQuestion.innerHTML = `
                <h3>Seu problema foi resolvido?</h3>
                <div class="answer-box">
                    <label for="yes-answer">Sim</label>
                    <input type="checkbox" id="yes-answer">
                </div>

                <div class="answer-box">
                    <label for="no-answer">Não</label>
                    <input type="checkbox" id="no-answer">
                </div>
            `;

            const answerCheckbox = document.querySelectorAll('.answer-box input');
            const nestyInput = document.querySelector('[aria-labelledby="request_custom_fields_30897134051603_label"]')
            answerCheckbox.forEach(input => {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        input.style.border = '4px solid #3cb757'
                        input.style.boxShadow = '0px 0px 7px #3cb757'
                    } else {
                        input.style.backgroundColor = 'white'
                        input.style.border = '2px solid rgb(200,200,200)'
                        input.style.boxShadow = 'none'
                    }
                })
            })

            const yesAnswer = document.querySelector('#yes-answer');
            const notAnswer = document.querySelector('#no-answer');

            yesAnswer.addEventListener('change', () => {
                notAnswer.style.backgroundColor = 'white'
                notAnswer.style.border = '2px solid rgb(200,200,200)'
                notAnswer.style.boxShadow = 'none'
                nestyInput.value = 'csat_sim'
            })

            notAnswer.addEventListener('change', () => {
                yesAnswer.style.backgroundColor = 'white'
                yesAnswer.style.border = '2px solid rgb(200,200,200)'
                yesAnswer.style.boxShadow = 'none'
                nestyInput.value = 'csat_não'
            })

            const defaultFirstLabel = document.querySelector('#request_custom_fields_30897134051603_label').style.display = 'none'
            const defaultField = document.querySelectorAll('[aria-labelledby="request_custom_fields_30897134051603_label"]')
            defaultField.forEach(field => {
                field.style.display = 'none'
            })

            const othersDefaultField = document.querySelector('.request_custom_fields_30589227222035');
            const othersField = document.createElement('div');
            othersField.innerHTML = `
                <div class="others">
                    <div class="answer-box">
                    		<label for="others-check" id="others-label">Outros aspectos ___________ (especificar):</label>
                        <input type="checkbox" id="others-check" style="border-radius: 5px;">
                    </div>
                    <textarea id="others-content" style="display: none;"></textarea>
                </div>
            `;
            othersDefaultField.appendChild(othersField);

            const othersCheck = document.querySelector('#others-check')
            const othersText = document.querySelector('#others-content')
            const otherLabel = document.querySelector('#others-label')
            othersCheck.addEventListener('change', () => {
                if (othersCheck.checked) {
                    othersText.style.display = 'block';
                    othersCheck.style.border = '4px solid #3cb757'
                    othersCheck.style.boxShadow = '0px 0px 7px #3cb757'
                    otherLabel.style.color = 'rgb(60, 183, 87)'
                } else {
                    othersText.style.display = 'none';
                    othersCheck.style.backgroundColor = 'white'
                    othersCheck.style.border = '2px solid rgb(200,200,200)'
                    othersCheck.style.boxShadow = 'none'
                    otherLabel.style.color = 'black'
                }
            })

            const defaulttextField = document.querySelector('#request_custom_fields_30589227222035').style.display = 'none'
            const defaultTextLabel = document.querySelector("#request_custom_fields_30589227222035_label").style.display = 'none'
            const defaultDescription = document.querySelector('#request_custom_fields_30589227222035_hint').style.display = 'none'

            othersText.addEventListener('input', () => {
                defaulttextField.value = othersText.value;
            });

            //excluindo campo anexo
            const anexo = document.querySelector('#upload-dropzone')
            anexo.parentNode.style.display = 'none'

        }
    })