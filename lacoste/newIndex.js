function showElements(elements) {
     elements.forEach(el => el.style.display = 'block');
}

function hideElements(elements) {
    elements.forEach(el => el.style.display = 'none');
}


function limparCamposZendesk () {

}

const purchaseLocation = document.querySelector('#purchase-location')
const purchaseNumber = document.querySelector('#purchase-number')
const purchaseNumberSpan = document.querySelector('.purchase-number-span')


purchaseLocation.addEventListener('change', () => {
    if (purchaseLocation.value === 'site_oficial_da_lacoste') {
        showElements([
            purchaseNumber, purchaseNumberSpan
        ])
    }else if (purchaseLocation.value === 'marketplace') {
        showElements([
            purchaseNumber, purchaseNumberSpan
        ])
    }
})

async function criarTicketZendeskOrder() {
        
    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacostebrazil.zendesk.com/api/v2/requests.json';

    const customFields = [
        {id: 27333159915411, value: 'quero_falar_sobre_um_pedido'}
    ];

    const payloadTicket = {
        request: {
            subject: "Dúvida sobre: pedido",
            requester: {
                email: document.getElementById('email-purchase').value,
                name: document.getElementById('name-purchase').value
            },
            comment: {
                body: document.getElementById('description').value,
            },
            custom_fields: customFields,
              tags: [
                  "form_guide_brasil"
            ]
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
            console.log(payloadTicket.request)
            throw new Error('Erro ao criar o ticket');
        }
          console.log(payloadTicket.request)
        closeAllModals();
        showToast('Sua solicitação foi enviada com sucesso!');
        limparCamposZendesk();
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao criar o ticket');
    }
}

