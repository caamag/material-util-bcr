
const url = 'https://lacostebrazil.zendesk.com/api/v2/requests.json'

async function criarTicketZendeskOrder() {
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
            ],
            custom_fields: [
                {
                    id: 27333799571347,
                    value: '123456789'
                },
                {
                    id: 27333882092179,
                    value: 'site_oficial_da_lacoste',
                }
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
        if (!response.ok) {
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(error.message);
    }
}

criarTicketZendeskOrder()

//erro atual na linha 1322 no js do guide