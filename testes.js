
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