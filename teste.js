function criarTicketZendesk() {
    const token = 'cnZhdXRpZXJAbGFjb3N0ZS5jb206TGFjb3N0ZTIwMjQ=';
    const url = 'https://lacostebrazil.zendesk.com/api/v2/tickets';
  

    const motivo = document.querySelector('.modal-open-button.active').value;
    const numeroPedido = document.getElementById('numero-pedido').value;
    const canalCompra = document.getElementById('canal-compra').value;
    const formaRecebimento = document.getElementById('forma-recebimento').value;
    const marketplace = document.getElementById('if-marketplace').value;
    const formaPagamento = document.getElementById('forma-pagamento').value;
    const quemComprou = document.getElementById('quem-comprou').value;
    const marca = document.getElementById('qual-multimarca').value;

    // Montando os campos customizados
    const customFields = [];

   // Campo "Motivo de contato"
   const motivoContatoOptions = {
        "pedido": "Falar sobre pedido",
        "cadastro": "Quero falar sobre meu cadastro",
        "boutiques": "Informações sobre nossas boutiques"
    };
	'X'
    const modalOpenButtonTag = document.querySelector('.modal-open-button.active').id;
    const motivoContatoValue = motivoContatoOptions[modalOpenButtonTag];
    customFields.push({
        "id": 27333159915411,
        "value": motivoContatoValue,
      	"tag":modalOpenButtonTag
    });
  
  // Campo "Qual a forma de recebimento?"
const formaRecebimentoOption={
  "retira-residencial":"Receber em casa",
  "retira-loja":"Retirar na loja",
}
const formaRecebimentoTag = document.getElementById('forma-recebimento').value;
const formaRecebimentoValue = formaRecebimentoOption[formaRecebimentoTag]
customFields.push({
    "id": 27344294054675,
    "value": formaRecebimentoValue,
    "tag": formaRecebimentoTag
});


// Campo "Qual foi a forma de pagamento?"
  
const formaPagamentoOption={
  "credito":"Crédito",
  "pix":"Pix",
  "mercado-pago":"Mercado Pago",
}
const formaPagamentoTag = document.getElementById('forma-pagamento').value;
const formaPagamentoValue = formaPagamentoOption[formaPagamentoTag]
customFields.push({
    "id": 27344449233683, 
    "value": formaPagamentoValue,
    "tag": formaPagamentoTag
});


// Campo "Onde a compra foi feita?"

const ondeCompraOption={
  "site_oficial_da_lacoste":"Site Oficial da Lacoste",
  "marketplace":"Marketplace",
  "multimarca":"Multimarca",
  "boutique-lacoste":"Boutique Lacoste"
}
const ondeCompraTag = document.getElementById('canal-compra').value;
const ondeCompraValue = ondeCompraOption[ondeCompraTag]
customFields.push({
    "id": 27333882092179,
    "value": ondeCompraValue,
    "tag": ondeCompraTag
});


    // Campo "Marketplace"
if (canalCompra === 'marketplace') {
  	const marketplaceOptions = {
      "dafiti":"Dafiti",
      "netshoes":"Netshoes",
      "mercado-livre":"Mercado Livre"
    }
  
		const marketplaceTag= document.getElementById('if-marketplace').value;
    const marketplaceValue = marketplaceOptions[marketplaceTag]
    customFields.push({
        "id": 27334023544211,
        "value": marketplaceValue,
        "tag": marketplaceTag
    });
}

    // Campo "A compra foi feita por você?"
  
  
if (canalCompra !== 'site_oficial_da_lacoste') {
  const quemComprouOption={
  "o-proprio":"Sim, fui eu que fiz a compra",
  "presente":"Não, eu ganhei de presente",
  "parente":"Não, mas sou parente de quem fez a compra",
}
    
 	const quemComprouTag = document.getElementById('quem-comprou').value;
  	const quemComprouValue = quemComprouOption[quemComprouTag];
    customFields.push({
        "id": 27344494307731, 
        "value": quemComprouValue,
        "tag": quemComprouTag 
    });
}
  // numero do pedido
  customFields.push({
    "id": 27333799571347,
    "value": numeroPedido
    });
  
  // Campo "Qual multimarca?"
const qualMultimarca = document.getElementById('qual-multimarca').value;

customFields.push({
    "id": 27344548186131, 
    "value": qualMultimarca

}); 

  const data = {
    ticket: {
        subject: motivo,
        comment: {
            body: `
            Número do pedido: ${numeroPedido}
            Onde a compra foi feita: ${ondeCompraValue}
            Forma de recebimento: ${formaRecebimento}
            Marketplace: ${marketplace}
            Forma de pagamento: ${formaPagamento}
            Quem comprou: ${quemComprou}
            Marca: ${marca}
            `
        },
        custom_fields: customFields
    }
};
console.log(data)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao criar o ticket');
        }
        return response.json();
    })
    .then(data => {
        alert('Ticket criado com sucesso:', data);
        console.log('Ticket criado com sucesso:', data);
        showSuccessMessage();
        closeModal();
    })
    .catch(error => {
        console.error('Erro:', error);
        showErrorMessage(error.message);
    });
}

document.getElementById('enviar').addEventListener('click', function() {
    criarTicketZendesk();
});