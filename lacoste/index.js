const { couldStartTrivia } = require("typescript");

const dataForm = {
    nome: "",
    email: "",
    decricao: "",
    anexo: [],
    motivo: "",
    numeroPedido: "",
    canalCompra: "",
    formaRecebimento: "",
    marketplace: "",
    formaPagamento: "",
    quemComprou: "",
    marca: "",
};


////modal

const openPedidoButton = document.querySelector('.modal-open-button.card:nth-of-type(1)');
const openCadastroButton = document.querySelector('.modal-open-button.card:nth-of-type(2)');
const openBoutiquesButton = document.querySelector('.modal-open-button.card:nth-of-type(3)');
const pedidoModal = document.querySelector('.modal.pedido');
const cadastroModal = document.querySelector('.modal.cadastro');
const boutiquesModal = document.querySelector('.modal.boutiques');


function limparCampos() {
    document.getElementById('numero-pedido').value = '';
    document.getElementById('canal-compra').selectedIndex = 0;
    document.getElementById('opcoes-compra').style.display = 'none';
}
const closeButtons = document.querySelectorAll('.close-modal');

openPedidoButton.addEventListener('click', () => {
    pedidoModal.style.display = 'block';
});

openCadastroButton.addEventListener('click', () => {
    cadastroModal.style.display = 'block';
});

openBoutiquesButton.addEventListener('click', () => {
    boutiquesModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        pedidoModal.style.display = 'none';
        cadastroModal.style.display = 'none';
        boutiquesModal.style.display = 'none';
    });
});

// Opcional: Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target === pedidoModal) {
        pedidoModal.style.display = 'none';
    }
    if (event.target === cadastroModal) {
        cadastroModal.style.display = 'none';
    }
    if (event.target === boutiquesModal) {
        boutiquesModal.style.display = 'none';
    }
});





let accButtons = document.querySelectorAll(".accordion");

accButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Toggle entre adicionar e remover a classe "active" para destacar o botão que controla o painel
        this.classList.toggle("active");

        // Toggle entre ocultar e mostrar o painel ativo
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }

        // Selecionar a imagem dentro do botão clicado
        let image = this.querySelector(".marker");
        // Toggle entre girar a imagem quando o botão estiver ativo
        if (this.classList.contains("active")) {
            image.style.transform = "rotate(180deg)";
        } else {
            image.style.transform = "none";
        }
    });
});

document.querySelectorAll('.modal-open-button').forEach(button => {
    button.addEventListener('click', function () {
        // Remove a classe .active de todos os botões
        document.querySelectorAll('.modal-open-button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        const modalOpenButtonId = this.id;
    });
});
function limparCamposZendesk() {
    document.getElementById('open-pedido-button').value = '';
    document.getElementById('name-purchase').value = '';
    document.getElementById('email-purchase').value = '';
    document.getElementById('description').value = '';
}
// Function to open modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Function to close all modals
function closeAllModals() {
    limparCamposZendesk();
    pedidoModal.style.display = 'none';
    cadastroModal.style.display = 'none';
    boutiquesModal.style.display = 'none';
}

openPedidoButton.addEventListener('click', () => openModal(pedidoModal));
openCadastroButton.addEventListener('click', () => openModal(cadastroModal));
openBoutiquesButton.addEventListener('click', () => openModal(boutiquesModal));

closeButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
});

window.addEventListener('click', (event) => {
    if (event.target === pedidoModal) pedidoModal.style.display = 'none';
    if (event.target === cadastroModal) cadastroModal.style.display = 'none';
    if (event.target === boutiquesModal) boutiquesModal.style.display = 'none';
});

// Form functionality
const responsiblePurchaseSelect = document.getElementById('responsible-purchase');
const productProblemSelect = document.getElementById('product-problem');
const wherePurchadeWasMade = document.getElementById('purchase-location');
const subProductProblem = document.getElementById('subproduct-problem');
const subproductProblemSpan = document.querySelector('.subproduct-problem-span');
const accessoryOptions = document.querySelector('.accessory-options');
const accessoryOptionsSpan = document.querySelector('.accessory-options-span');
const footwearOptions = document.querySelector('.footwear-options');
const footwearOptionsSpan = document.querySelector('.footwear-options-span');
const clothingOptions = document.querySelector('.clothing-77options');
const clothingOptionsSpan = document.querySelector('.clothing-options-span');
const whereProductLateHidden = document.querySelector('.where-product-late');
const whereProductLateHiddenSpan = document.querySelector('.where-product-late-span');
const colorProductSpan = document.querySelector('.order-returned-span');
const colorProduct = document.getElementById('color-input1');
const reasonCancellation = document.getElementById('reason-cancellation');
const reasonCancellationSpan = document.querySelector('.reason-cancellation-span');
const reasonReturn = document.getElementById('reason-return');
const reasonReturnSpan = document.querySelector('.reason-return-span');
const defect = document.getElementById('defect');
const defectSpan = document.querySelector('.defect-span');
const receiptProductMethodSpan = document.querySelector('.receipt-product-method-span');
const receiptProductMethod = document.getElementById('receipt-product-method');
const paymentMethodSpan = document.querySelector('.payment-method-span');
const paymentMethod = document.getElementById('payment-method');
const responsiblePurchaseSpan = document.getElementById('responsible-purchase-span')
const productProblemSpan = document.getElementById('product-problem-span');
const brandInput = document.getElementById('brand-input');
const brandInputSpan = document.querySelector('.brand');
const marketplacePurchaseLocation = document.getElementById('marketplace-purchase-location');
const marketplacePurchaseLocationSpan = document.querySelector('.marketplace-purchase-location-span');
const numberPurchase = document.querySelector('#number-purchase')
const numberPurchaseSpan = document.querySelector('.number-purchase-span')

wherePurchadeWasMade.addEventListener('change', () => {
    problemValueBuy = wherePurchadeWasMade.value;

    if (problemValueBuy === 'site_oficial_da_lacoste') {
        showElements([receiptProductMethodSpan, receiptProductMethod, paymentMethodSpan, paymentMethod, numberPurchase, numberPurchaseSpan]);
        hideElements([brandInputSpan, brandInput, marketplacePurchaseLocation, marketplacePurchaseLocationSpan]);
    } else if (problemValueBuy === 'marketplace') {
        showElements([marketplacePurchaseLocation, marketplacePurchaseLocationSpan]);
        hideElements([brandInputSpan, brandInput, receiptProductMethodSpan, receiptProductMethod, paymentMethodSpan, paymentMethod]);
    } else if (problemValueBuy === 'boutique_lacoste') {
        showElements([]);
        hideElements([brandInputSpan, brandInput, receiptProductMethodSpan, receiptProductMethod, paymentMethodSpan, paymentMethod, marketplacePurchaseLocation, marketplacePurchaseLocationSpan, numberPurchase, numberPurchaseSpan]);
    } else if (problemValueBuy === 'multimarca') {
        showElements([brandInput, brandInputSpan]);
        hideElements([receiptProductMethodSpan, receiptProductMethod, paymentMethodSpan, paymentMethod, marketplacePurchaseLocation, marketplacePurchaseLocationSpan, numberPurchase, numberPurchaseSpan]);
    }

})
responsiblePurchaseSelect.addEventListener('change', () => {
    const isPurchaseMadeByUser = responsiblePurchaseSelect.value === 'sim__fui_eu_que_fiz_a_compra_';
    document.getElementById('product-problem-span').style.display = isPurchaseMadeByUser ? 'block' : 'none';
    productProblemSelect.style.display = isPurchaseMadeByUser ? 'block' : 'none';

    if (!isPurchaseMadeByUser) {
        resetProblemRelatedFields();
    }
});

productProblemSelect.addEventListener('change', () => {
    resetProblemRelatedFields();

    const problemValue = productProblemSelect.value;
    const subProductProblemSpan = document.querySelector('.subproduct-problem-span');

    if (problemValue === 'meu_pedido_está_atrasado') {
        showElements([subProductProblemSpan, subProductProblem, whereProductLateHidden, whereProductLateHiddenSpan]);
    } else if (problemValue === 'quero_cancelar_meu_pedido') {
        showElements([subProductProblemSpan, subProductProblem, reasonCancellation, reasonCancellationSpan, colorProduct, colorProductSpan]);
    } else if (problemValue === 'quero_devolver_meu_pedido') {
        showElements([subProductProblemSpan, subProductProblem, reasonReturn, reasonReturnSpan, colorProduct, colorProductSpan]);
    } else if (['meu_pedido_consta_como_entregue_mas_não_recebi', 'meu_pedido_chegou_incompleto', 'devolvi_meu_pedido_e_não_recebi_o_estorno'].includes(problemValue)) {
        showElements([subProductProblemSpan, subProductProblem, colorProduct, colorProductSpan]);
    } else if (problemValue === 'status_do_pedido') {
        showElements([subProductProblemSpan, subProductProblem]);
    } else if (problemValue === 'meu_pedido_está_com_defeito') {
        showElements([subProductProblemSpan, subProductProblem, defect, defectSpan]);
    } else if (problemValue === 'informações_sobre_clique_e_retire') {
        showElements([subProductProblemSpan, subProductProblem]);
    } else {
        resetProblemRelatedFields();
    }
});

subProductProblem.addEventListener('change', () => {
    const subProductValue = subProductProblem.value;
    if (subProductValue === 'acessório') {
        showElements([accessoryOptions, accessoryOptionsSpan]);
        hideElements([footwearOptions, footwearOptionsSpan, clothingOptions, clothingOptionsSpan]);
    } else if (subProductValue === 'calçado') {
        showElements([footwearOptions, footwearOptionsSpan]);
        hideElements([accessoryOptions, accessoryOptionsSpan, clothingOptions, clothingOptionsSpan]);
    } else if (subProductValue === 'vestuário') {
        showElements([clothingOptions, clothingOptionsSpan]);
        hideElements([accessoryOptions, accessoryOptionsSpan, footwearOptions, footwearOptionsSpan]);
    } else {
        hideElements([accessoryOptions, accessoryOptionsSpan, footwearOptions, footwearOptionsSpan, clothingOptions, clothingOptionsSpan]);
    }
});

function resetProblemRelatedFields() {
    hideElements([
        document.querySelector('.subproduct-problem'),
        subProductProblem,
        subproductProblemSpan,
        accessoryOptions,
        footwearOptions,
        footwearOptionsSpan,
        clothingOptions,
        clothingOptionsSpan,
        whereProductLateHidden,
        whereProductLateHiddenSpan,
        colorProduct,
        reasonCancellation,
        reasonCancellationSpan,
        reasonReturn,
        reasonReturnSpan,
        defect,
        defectSpan
    ]);
}

function showElements(elements) {
    elements.forEach(el => el.style.display = 'block');
}

function hideElements(elements) {
    elements.forEach(el => el.style.display = 'none');
}
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.style.display = 'block';
    toast.classList.add('show');

    // Oculta o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        // Esconde o toast após a animação de fade-out
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 3000);
}

// Função para criar ticket
async function criarTicketZendeskOrder() {

    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacostebrazil.zendesk.com/api/v2/requests.json';

    const payloadTicket = {
        request: {
            subject: "Dúvida sobre: pedido",
            comment: {
                body: document.getElementById('description').value,
            },
            requester: {
                email: document.getElementById('email-purchase').value,
                name: document.getElementById('name-purchase').value
            },
            tags: [
                "form_guide_brasil"
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
        const data = await response.json()
        console.log(data)
        console.log(payloadTicket.request)
        closeAllModals();
        showToast('Sua solicitação foi enviada com sucesso!');

    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao criar o ticket');
    }
}


async function criarTicketRegister() {
    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacostebrazil.zendesk.com/api/v2/requests.json';
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
            throw new Error('Erro ao criar o ticket');
        }
        closeAllModals();
        showToast('Sua solicitação foi enviada com sucesso!');
        limparCamposZendesk();

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar o ticket');
    }
}

async function criarTicketBoutiques() {
    const urlZendesk = 'https://bcrcxproxyapi.azurewebsites.net/proxy/lacostebrazil.zendesk.com/api/v2/requests.json';
    const customFields = [
        { id: 27333159915411, value: document.getElementById('open-boutiques-button').value },
    ];

    const payloadTicket = {
        request: {
            subject: "Dúvida sobre: lojas físicas",
            requester: {
                email: document.getElementById('email-boutique').value,
                name: document.getElementById('name-boutique').value
            },
            comment: {
                body: document.getElementById('description-boutique').value,
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
            throw new Error('Erro ao criar o ticket');
        }
        closeAllModals();
        showToast('Sua solicitação foi enviada com sucesso!');
        limparCamposZendesk();

    } catch (error) {
        console.error('Erro:', error);
        alert('Preencha todos os campos!');
    }
}

function sendTicketOrder() {
    criarTicketZendeskOrder();
}

function sendTicketRegister() {
    criarTicketRegister();
}

function sendTicketBoutiques() {
    criarTicketBoutiques();
}

// Ticket submission
const sendTicketButton = document.getElementById('send-ticket-button');
sendTicketButton.addEventListener('click', sendTicketOrder);

const sendTicketButton2 = document.getElementById('send-ticket-button2');
sendTicketButton2.addEventListener('click', sendTicketRegister);

const sendTicketButton3 = document.getElementById('send-ticket-button3');
sendTicketButton3.addEventListener('click', sendTicketBoutiques);

window.addEventListener('load', () => {
    window.scrollTo(0, 0)
})


//alterando texto de pop-up de envio de formulário.
function changePopupMessage () {
    const popUp = document.querySelector('[data-test-id="notification"]')
    if (popUp) {
        const popUpText = popUp.querySelector('strong')
        popUpText.innerText = 'Su solicitd fue enviada enviada con éxito'
    }
}

changePopupMessage();
