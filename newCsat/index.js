//getting fields
let notes = [];
async function getCsatFields() {

    const fieldsResponse = await fetch('/api/v2/ticket_fields')
    const fieldsData = await fieldsResponse.json()
    const csatFields = fieldsData.ticket_fields.filter(field => field.title.startsWith('(CSAT)'))
    notes.length = csatFields.length;

    //change position of txt field
    const regex = /\(TXT\)/;
    const txtFields = csatFields.filter(field => regex.test(field.title_in_portal))
    const fieldWithoutTxt = csatFields.filter(field => !regex.test(field.title_in_portal))
    const orderFields = txtFields.concat(fieldWithoutTxt)

    orderFields.map((field, index) => {
        const title = field.title_in_portal;
        let titleWithouTXT = title
        if (regex.test(title)) {
            titleWithouTXT = title.replace(regex, '')
        }

        let content = `
            <div class="question-container question${orderFields.length - index}">
                <h3 class="question-title">${titleWithouTXT}</h3>
                <div class="icons-container"></div>
            </div>
        `
        const formContainer = document.querySelector('.csat-form')
        formContainer.insertAdjacentHTML('afterbegin', content)
        const iconsContainer = formContainer.querySelector('.icons-container')

        if (!regex.test(field.title_in_portal)) {
            let regexIconsLength = /\((\d+)\)/;
            let match = regexIconsLength.exec(field.title_in_portal);
            let iconsLength = match ? parseInt(match[1], 10) : 5;

            for (let i = 0; i < iconsLength; i++) {
                const icon = document.createElement('img');
                icon.className = `icon icon${i}`;
                icon.src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSRF1J6ECTZNDGM54G5627V'
                icon.addEventListener('click', () => { handleClick(icon, i, index) })
                iconsContainer.appendChild(icon)
            }
        } else {
            const newTextarea = document.createElement('textarea')
            newTextarea.classList.add('free-comment')
            iconsContainer.appendChild(newTextarea)
        }
    });

    function handleClick(icon, indexIcon, indexQuestion) {
        const allIcons = icon.parentNode.querySelectorAll('.icon')
        for (let i = 0; i < allIcons.length; i++) {
            if (i < indexIcon + 1) {
                allIcons[i].classList.add('selected')
                allIcons[i].src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSTYTC3Q59YES4XWCPX6Q11'
            } else {
                allIcons[i].classList.remove('selected')
                allIcons[i].src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSRF1J6ECTZNDGM54G5627V'
            }
        }

        //updating notes
        notes[indexQuestion] = indexIcon + 1
    }
}
getCsatFields()

function lastString(string) { return string.charAt(string.length - 1) }

function handleSubmit() {
    const textarea = document.querySelector('.free-comment')
    const iconsContainerWithTextarea = textarea.parentNode
    const indexTextarea = iconsContainerWithTextarea.parentNode.classList[1]
    const index = parseInt(lastString(indexTextarea))

    const notesToSubmit = notes.reverse()
    notesToSubmit[notes.length - 1] = textarea.value;
    console.log(notesToSubmit);
}

const submitBnt = document.querySelector('.csat-btn')
submitBnt.addEventListener('click', () => { handleSubmit() })


//atualização do ticket
async function criarTicketRegister() {
    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacoste-argentina.zendesk.com/api/v2/requests.json';
    const customFields = [
        { id: 27333159915411, value: document.getElementById('open-cadastro-button').value },
        { id: 27345085222419, value: document.getElementById('registration').value },
    ];

    const payloadTicket = {
        request: {
            subject: "Dúvida sobre: cadastro",
            requester: {
                email: document.getElementById('email-cadastro').value,
                name: document.getElementById('name-cadastro').value
            },
            comment: {
                body: document.getElementById('description-cadastro').value,
            },
            custom_fields: customFields
        }
    };

    try {
        const response = await fetch(urlZendesk, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadTicket)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o ticket');
        }
        closeAllModals();
        showToast('Ticket criado com sucesso!');

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar o ticket');
    }
}