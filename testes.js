// const anexo = document.querySelector('.upload-dropzone')
// anexo.style.border = '1px solid yellow'
// const label = anexo.parentNode.querySelector('label')
// label.innerHTML = 'Anexo';



// //ocultadno segundo formulário:
// const url = 'https://con-bcrcx-fabio.zendesk.com/hc/pt-br/requests/new?ticket_form_id=23060614730779'
// const segundaURL = window.location.href
// if (segundaURL.startsWith(url)) {

//     const fields = document.querySelectorAll('#new_request div:nth-child(n-1)')
//     fields[1].classList.add('delete-field')
//     fields[2].classList.add('delete-field')
//     fields[3].classList.add('delete-field')
//     fields[4].classList.add('delete-field')
//     fields[5].classList.add('delete-field')

// }

async function getForm() {
    const res = await fetch('/api/v2/ticket_forms')
    const data = await res.json();
    const forms = data.ticket_forms;
    const csatForm = forms.filter(form => form.name === 'Formulário de CSAT');
    const IDs = csatForm[0].ticket_field_ids.slice(6);
    console.log(IDs);
}

getForm()
