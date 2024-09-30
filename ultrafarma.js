const redirectToHomePage = (url) => {
    if (url.includes('?ticket_form_id=26714695567003')) {
        const submitBtn = document.querySelector("input[type=submit]");
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const zendeskField = document.querySelector(".request_custom_fields_29068697247131")
                .querySelector('input')
                .value;
            if (zendeskField === 'alteração_de_endereço' || zendeskField === 'alteração_de_produto') {
                e.preventDefault();
                alert("Retornando para Home page");
                window.location.replace('https://ultrafarma2803.zendesk.com/hc/pt-br')
            }

        })
    }
}

const getTicket = async (ticketID) => {
    const urlSplited = window.location.href.split('&')[1].split('=')[1];
    const encoded = atob(urlSplited).split(':');
    const credentials = btoa(`${encoded[0]}:${encoded[1]}`);

    try {
        const response = await fetch(`/api/v2/tickets/${ticketID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

const verifyTicketExist = (url) => {
    if (url.includes('?ticket_form_id=28841186648475')) {
        const submitBtn = document.querySelector("input[type=submit]");
        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            const ticketID = document.querySelector('.request_custom_fields_28841017446683')
                .querySelector("input")
                .value;

            const popUpWarning = document.querySelector('.pop-up-warning');
            const warningtext = document.querySelector('.pop-up-warning')
                .querySelector('p');

            const requiredFields = document.querySelectorAll('.required');
            for (const field of requiredFields) {
                const requiredInput = field.querySelector('input');

                if (requiredInput && requiredInput.type === 'file') {
                    continue;
                }

                if (requiredInput && requiredInput.value === '') {
                    popUpWarning.style.display = 'flex';
                    warningtext.innerHTML = 'Preencher todos os campos obrigatórios.'

                    setTimeout(() => {
                        popUpWarning.style.display = 'none';
                    }, 4000)

                    alert('Preencher todos os campos obrigatórios.');
                    console.log('Campo vazio:', requiredInput);
                    return;
                }
            }

            const ticket = await getTicket(ticketID);
            if (ticket.ticket) {
                e.target.form.submit();
            } else {
                popUpWarning.style.display = 'flex';
                warningtext.innerHTML = 'Ticket não localizado. Verificar o ID.'

                setTimeout(() => {
                    popUpWarning.style.display = 'none';
                }, 4000)
            }
        })

    }
}

verifyTicketExist(window.location.href);

if (window.location.href.includes('new?ticket_form_id=28841186648475')) {
    const description = document.querySelector('#request_description')
    const relato = document.querySelector('.request_custom_fields_29064349543451').style.display = 'none'

    const removeHtmlTags = (htmlString) => {
        return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
    };

    description.addEventListener('input', () => {
        const relatoField = document.querySelector('#request_custom_fields_29064349543451');
        const cleanText = removeHtmlTags(description.value)

        relatoField.value = cleanText;
        console.log(relatoField.value);
    })
}

const requestFormId = document.querySelector('.request_ticket_form_id');
if (requestFormId) {
    requestFormId.style.display = 'none'
}

//alert messages
const setMessagesAlert = (url) => {
    if (url.includes('new?ticket_form_id=26714695567003')) {
        const registerMessageField = document.querySelector('.request_custom_fields_29284127697435');
        const registerMessage = document.createElement('p');
        registerMessage.classList.add('alert-message');
        registerMessage.innerHTML = `
            Cumpre esclarecer que, solicitamos a confirmação de seus dados por meio de segurança. A ULTRAFARMA se reserva o
            direito de solicitar documentação adicional e informações complementares para garantir a privacidade de seus dados
            pessoais. A ULTRAFARMA tem o direito de declinar da requisição, visto que os dados assinalados podem estar inexatos ou
            insuficientes. É notório que vossa requisição é baseada no inciso VI do artigo 18 da Lei n.o 13.709/2018 (Lei Geral de
            Proteção de Dados Pessoais).
        `
        registerMessageField.insertBefore(registerMessage, registerMessageField.firstChild);

        const registerCNPJ = document.querySelector('.request_custom_fields_29283605970843');
        const registerCNPJMessage = document.createElement('p');
        registerCNPJMessage.classList.add('alert-message');
        registerCNPJMessage.innerHTML = `
            O cadastro CNPJ é possível somente após uma análise junto ao setor responsável. Caso a Razão Social da empresa for do
            ramo Farmacêutico ou Perfumaria, não será possível ser realizado o cadastro CNPJ.
        `
        registerCNPJ.insertBefore(registerCNPJMessage, registerCNPJ.firstChild)

        const adressChangeField = document.querySelector('.request_custom_fields_29363445044507');
        const adressChangeFieldMessage = document.createElement('p');
        adressChangeFieldMessage.classList.add('alert-message');
        adressChangeFieldMessage.innerHTML = `
            Após a finalização dos pedidos não é possível realizar qualquer tipo de alteração. 
            Caso desejar, é possível solicitar o cancelamento do pedido (dependendo do status do pedido). 
            Se o pedido for entregue no endereço de finalização, fica de responsabilidade do cliente a coleta.
        `
        adressChangeField.insertBefore(adressChangeFieldMessage, adressChangeField.firstChild)

        const changeField = document.querySelector('.request_custom_fields_29368908375195');
        const changeFieldMessage = document.createElement('p')
        changeFieldMessage.classList.add('alert-message')
        changeFieldMessage.innerHTML = `
            Não realizamos trocas em nosso site, somente devolução e ressarcimento do valor mediante o item intacto e 
            lacrado, com prazo de 7 dias corridos após o recebimento. 
            As trocas podem ser realizadas somente nas lojas físicas da Av. Jabaquara, 
            mediante o item intacto e lacrado, com nota fiscal em mãos, prazo de 30 dias corridos após o recebimento. 
            Ressaltamos que o vencimento disponibilizado em site é o mesmo disponível em loja.
        `
        changeField.insertBefore(changeFieldMessage, changeField.firstChild);
    }
}

setMessagesAlert(window.location.href);


/*
    - Redirecionar para a home no caso de não seguir com a troca;
    - Tentar ver popUp que esconderá o assunto e demais campos no caso especificado;
*/