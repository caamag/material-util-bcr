async function criarTicketZendesk() {
    const motivo = document.querySelector('.modal-open-button.active').value;
    const numeroPedido = document.getElementById('numero-pedido').value;
    const canalCompra = document.getElementById('canal-compra').value;
    const formaRecebimento = document.getElementById('forma-recebimento').value;
    const marketplace = document.getElementById('if-marketplace').value;
    const formaPagamento = document.getElementById('forma-pagamento').value;
    const quemComprou = document.getElementById('quem-comprou').value;
    const marca = document.getElementById('qual-multimarca').value;

    const idMotivoContato = 27333159915411;
    const idFormaRecebimento = 27344294054675;
    const idFormaPagamento = 2734444923368;
    const idOndeCompra = 27333882092179;
    const idMarketplace = 27334023544211;
    const idQuemComprou = 27344494307731;
    const idNumeroPedido = 27333799571347;
    const idQualMultimarca = 27344548186131;

    const customFields = [];

    const motivoContatoOptions = {
        "Falar sobre pedido": "quero_falar_sobre_um_pedido",
        "Quero falar sobre meu cadastro": "quero_falar_sobre_meu_cadastro",
        "Informações sobre nossas boutiques": "informações_sobre_nossas_boutiques"
    };
    const modalOpenButtonTag = document.querySelector('.modal-open-button.active').id;
    const motivoContatoValue = motivoContatoOptions[modalOpenButtonTag];
    customFields.push({
        "id": idMotivoContato,
        "value": motivoContatoValue,
        "tag": modalOpenButtonTag
    });

    const formaRecebimentoOption = {
        "Receber em casa": "optei_por_receber_em_um_endereço_residencial_",
        "Retirar na loja": "optei_por_retirar_na_loja",
    };
    const formaRecebimentoTag = document.getElementById('forma-recebimento').value;
    const formaRecebimentoValue = formaRecebimentoOption[formaRecebimentoTag];
    customFields.push({
        "id": idFormaRecebimento,
        "value": formaRecebimentoValue,
        "tag": formaRecebimentoTag
    });

    const formaPagamentoOption = {
        "Crédito": "cartão_de_crédito",
        "Pix": "pix",
        "Mercado Pago": "mercado_pago",
    };
    const formaPagamentoTag = document.getElementById('forma-pagamento').value;
    const formaPagamentoValue = formaPagamentoOption[formaPagamentoTag];
    customFields.push({
        "id": idFormaPagamento,
        "value": formaPagamentoValue,
        "tag": formaPagamentoTag
    });

    const ondeCompraOption = {
        "Site Oficial da Lacoste": "site_oficial_da_lacoste",
        "Marketplace": "marketplace",
        "Multimarca": "multimarca",
        "Boutique Lacoste": "boutique_lacoste"
    };
    const ondeCompraTag = document.getElementById('canal-compra').value;
    const ondeCompraValue = ondeCompraOption[ondeCompraTag];
    customFields.push({
        "id": idOndeCompra,
        "value": ondeCompraValue,
        "tag": ondeCompraTag
    });

    if (canalCompra === 'marketplace') {
        const marketplaceOptions = {
            "Dafiti": "dafiti",
            "Netshoes": "netshoes",
            "Mercado Livre": "mercado_livre"
        };
        const marketplaceTag = document.getElementById('if-marketplace').value;
        const marketplaceValue = marketplaceOptions[marketplaceTag];
        customFields.push({
            "id": idMarketplace,
            "value": marketplaceValue,
            "tag": marketplaceTag
        });
    }

    if (canalCompra !== 'site_oficial_da_lacoste') {
        const quemComprouOption = {
            "Sim, fui eu que fiz a compra": "sim__fui_eu_que_fiz_a_compra_",
            "Não, eu ganhei de presente": "não__eu_ganhei_de_presente_",
            "Não, mas sou parente de quem fez a compra": "não__mas_sou_parente_de_quem_fez_a_compra",
        };
        const quemComprouTag = document.getElementById('quem-comprou').value;
        const quemComprouValue = quemComprouOption[quemComprouTag];
        customFields.push({
            "id": idQuemComprou,
            "value": quemComprouValue,
            "tag": quemComprouTag
        });
    }

    customFields.push({
        "id": idNumeroPedido,
        "value": numeroPedido
    });

    const qualMultimarca = document.getElementById('qual-multimarca').value;
    customFields.push({
        "id": idQualMultimarca,
        "value": qualMultimarca
    });

    try {
        const response = await fetch('https://lacostebrazil.zendesk.com/api/v2/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket: {
                    subject: motivo,
                    comment: {
                        body: `
                            Número do pedido: ${numeroPedido}
                            Onde a compra foi: ${ondeCompraValue}
                            Forma de recebimento: ${formaRecebimento}
                            Marketplace: ${marketplace}
                            Forma de pagamento: ${formaPagamento}
                            Quem comprou: ${quemComprou}
                            Marca: ${marca}
                        `
                    },
                    custom_fields: customFields
                }
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o ticket');
        }

        const data = await response.json();
        alert('Ticket criado com sucesso:', data);
        console.log('Ticket criado com sucesso:', data);
        showSuccessMessage();
        closeModal();
    } catch (error) {
        console.error('Erro:', error);
        showErrorMessage(error.message);
    }
}

document.getElementById('enviar').addEventListener('click', function () {
    criarTicketZendesk();
});