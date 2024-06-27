
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