
const url = 'https://lacostebrazil.zendesk.com/api/v2/requests.json'

const customFields = [
    {id: 27333159915411, value: 'quero_falar_sobre_um_pedido'}
];

async function criarTicketZendeskOrder () {
    const ticketData = {
        request: {
            subject: 'Dúvida sobre: pedido',
            comment: {
                body: 'Ticket criado por api'
            },
            requester: {
                email: 'caiolopesfv@gmail.com',
                name: 'Caio Lopes'
            },
            tags: [
                'form_guide_brasil'
            ]
        }
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData)
        })
        const data = await response.json()
        console.log(data);
        showToast('Ticket criado com sucesso');
        if (!response.ok) {
            throw new Error(response.status)
        }
    } catch (error) {
        showToast('Erro ao criar o ticket');
        console.log(error.message);
    }
}

criarTicketZendeskOrder()

//erro atual na linha 1322 no js do guide