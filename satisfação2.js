//retirando campo de seleção de form
const linkForm1 = 'https://atendimento.bauducco.com.br/hc/pt-br/requests/new?ticket_form_id=21887213686171'; 
const linkForm2 = 'https://atendimento.bauducco.com.br/hc/pt-br/requests/new?ticket_form_id=8469070107931'
const urlAtual = window.location.href; 
if (urlAtual.startsWith(linkForm1) || urlAtual.startsWith(linkForm2)) {
    const field = document.querySelector('.request-form .request_ticket_form_id')
    field.style.display = 'none'
}


document.getElementById('selectTypeSearch').addEventListener('change', updateMiddlewareUrl)

//estrela amarela = https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png
//estrela padrão = 'https://www.svgrepo.com/show/533052/star.svg'

const apiUrl = 'https://con-bcrcx-fabio.zendesk.com/api/v2/ticket_forms'
async function getFields () {
    const response = await fetch(apiUrl)
    const data = await response.json()

    const idsFields = []
    data.ticket_forms.forEach((form) => {
        if (form.name === 'Formulário de Csat') {
            idsFields.push(form.ticket_field_ids)
        }
    })
    console.log(idsFields);
}

getFields()