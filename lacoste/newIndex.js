function showElements(elements) {
    elements.forEach(el => el.style.display = 'block');
}

function hideElements(elements) {
    elements.forEach(el => el.style.display = 'none');
}


function limparCamposZendesk() {
    purchaseLocation.value = ''
    purchaseNumber.value = ''
    whoMakePurchase.value = ''
    receiveMethod.value = ''
    paymentMethod.value = ''
    purchaseDetails.value = ''
    purchaseItem.value = ''
    marketShop.value = ''
    brandInput.value = ''
}

const purchaseLocation = document.querySelector('#purchase-location')
const purchaseNumber = document.querySelector('#purchase-number')
const purchaseNumberSpan = document.querySelector('.purchase-number-span')
const whoMakePurchase = document.querySelector('#who-make-purchase')
const receiveMethodSpan = document.querySelector('.receiveMethod-span')
const receiveMethod = document.querySelector('#receiveMethod')
const paymentMethodSpan = document.querySelector('.paymentMethod-span')
const paymentMethod = document.querySelector('#paymentMethod')
const purchaseDetailsSpan = document.querySelector('.purchaseDetails-span')
const purchaseDetails = document.querySelector('#purchaseDetails')
const purchaseItemSpan = document.querySelector('.purchaseItem-span')
const purchaseItem = document.querySelector('#purchaseItem')

//PRODUCT DEFECT
//VESTUÁRIO
const productDefectSpan = document.querySelector('.productDefect-span')
const productDefect = document.querySelector('#productDefect')
//CALÇADO
const calcadoSpan = document.querySelector('.calcado-span')
const calcadoInput = document.querySelector('#calcado')
//ACESSÓRIO
const acessorioSpan = document.querySelector('.acessorio-span')
const acessorioInput = document.querySelector('#acessorio')

//MARKETPLACE FIELD
const marketShopSpan = document.querySelector('.marketplace-shop-span')
const marketShop = document.querySelector('#marketplace-shop')

//BRANDS FIELD
const brandsSpan = document.querySelector('.brands-span')
const brandInput = document.querySelector('#brands')

purchaseLocation.addEventListener('change', () => {
    if (purchaseLocation.value === 'site_oficial_da_lacoste') {
        showElements([
            purchaseNumber, purchaseNumberSpan, receiveMethodSpan, receiveMethod, paymentMethodSpan, paymentMethod,
            purchaseItemSpan, purchaseItem
        ])
        hideElements([
            marketShop, marketShopSpan, purchaseItemSpan, purchaseItem, brandInput, brandsSpan
        ])
    } else if (purchaseLocation.value === 'marketplace') {
        showElements([
            purchaseNumber, purchaseNumberSpan, marketShopSpan, marketShop, purchaseItemSpan, purchaseItem
        ])
        hideElements([
            receiveMethodSpan, receiveMethod, paymentMethodSpan, paymentMethod, purchaseItemSpan, purchaseItem, brandInput, brandsSpan
        ])
    } else if (purchaseLocation.value === 'boutique_lacoste') {
        showElements([
            purchaseNumber, purchaseNumberSpan, purchaseItemSpan, purchaseItem
        ])
        hideElements([
            marketShopSpan, marketShop, paymentMethod, paymentMethodSpan, receiveMethod, receiveMethodSpan, brandInput, brandsSpan
        ])
    } else if (purchaseLocation.value === 'multimarca') {
        showElements([
            purchaseNumber, purchaseNumberSpan, purchaseItemSpan, purchaseItem, brandInput, brandsSpan
        ])
        hideElements([
            paymentMethod, paymentMethodSpan, receiveMethod, receiveMethodSpan,
        ])
    }
})


whoMakePurchase.addEventListener('change', () => {
    if (whoMakePurchase.value === 'sim__fui_eu_que_fiz_a_compra_') {
        showElements([
            purchaseDetails, purchaseDetailsSpan
        ])
    } else {
        hideElements([
            purchaseDetails, purchaseDetailsSpan
        ])
    }
})

purchaseItem.addEventListener('change', () => {
    if (purchaseItem.value === 'vestuário') {
        showElements([productDefect, productDefectSpan])
        hideElements([
            calcadoInput, calcadoSpan, acessorioSpan, acessorioInput
        ])
    }else if (purchaseItem.value === 'calçado') {
        showElements([calcadoInput, calcadoSpan])
        hideElements([
            productDefect, productDefectSpan, acessorioSpan, acessorioInput
        ])
    }else if (purchaseItem.value === 'acessório') {
        showElements([acessorioSpan, acessorioInput])
        hideElements([
            productDefect, productDefectSpan, calcadoInput, calcadoSpan
        ])
    }
})

// Função para criar ticket
async function criarTicketZendeskOrder() {

    const urlZendesk = 'https://lacostebrazil.zendesk.com/api/v2/requests.json';

    const payloadTicket = {
        request: {
            subject: "Dúvida sobre: pedido",
            comment: {
                body: 'teste'
            },
            requester: {
                email: 'caiolopesfv@gmail.com',
                name: 'Caio'
            },
            tags: [
                "form_guide_brasil"
            ],
            custom_fields: [
                {
                    id: 27333882092179,
                    value: purchaseLocation.value
                },
                {
                    id: 27344548186131,
                    value: brandInput.value
                },
                {
                    id: 27344494307731,
                    value: whoMakePurchase.value
                },
                {
                    id: 27344294054675,
                    value: receiveMethod.value
                },
                {
                    id: 27344449233683,
                    value: paymentMethod.value
                },
                {
                    id: 27333799571347,
                    value: purchaseNumber.value
                },
                {
                    id: 27334023544211,
                    value: marketShop.value
                },
                {
                    id: 27368743669523,
                    value: purchaseDetails.value
                },
                {
                    id: 27382123663251,
                    value: purchaseItem.value
                },
                {
                    id: 30524686901523,
                    value: productDefect.value
                },
                {
                    id: 30545218221971,
                    value: calcadoInput.value
                },
                {
                    id: 30549785563155,
                    value: acessorioInput.value
                }
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
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Erro:', error.message);
    }
}


const form = document.querySelector('.request-form')
const othersField = form.querySelector('.request_custom_fields_27345830251923')
form.prepend(othersField)

//colocando campo "De onde você é?" para o segundo lugar na hierarquia do form
const whereDoYouFromField = document.querySelector('.request_custom_fields_27345952143123')
const secondSunForm = form.children[1]
form.insertBefore(whereDoYouFromField, secondSunForm)