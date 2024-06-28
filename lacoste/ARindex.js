
const pedidosCompras = document.querySelector('#pedidosCompras')
const registerInput = document.querySelector('#purchase-registro')
const boutiqueInput = document.querySelector('#purchase-boutique')

function limparCamposZendesk() {
    document.getElementById('description').value = ''
    document.getElementById('email-purchase').value = ''
    document.getElementById('name-purchase').value = ''
    pedidosCompras.value = ''
}

async function criarTicketZendeskOrder() {
    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacostebrazil.zendesk.com/api/v2/requests.json';

    const payloadTicket = {
        request: {
            "subject": 'Hablar sobre la orden',
            "comment": {
                body: document.getElementById('description').value
            },
            "requester": {
                email: document.getElementById('email-purchase').value,
                name: document.getElementById('name-purchase').value
            },
            "tags": [
                'form_guide_argentina',
                pedidosCompras.value
            ],
        }
    }

    try {
        const response = await fetch(urlZendesk, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadTicket)
        })

        if (!response.ok) {
            throw new Error('Erro ao criar o ticket');
        }

        const data = await response.json()
        console.log(data.request);
        console.log(`ID do ticket ${data.request.id}`);

        closeAllModals();
        limparCampos();
        showToast('Ticket creado con éxito!');
    } catch (error) {
        showToast('Erro ao criar ticket')
    }
}