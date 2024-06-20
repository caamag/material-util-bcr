
const customFields = [
    { id: 28362344838035, value: document.querySelector('#purchase-registro').value }
];

const payloadTicket = {
    request: {
        subject: "Hablar sobre el orden",
        requester: {
            email: document.getElementById('email-purchase').value,
            name: document.getElementById('name-purchase').value
        },
        comment: {
            body: document.getElementById('description').value,
        },
        custom_fields: customFields,
          tags: [
          "form_guide_argentina"
        ]
    }
};



if (window.location.href.startsWith('https://lacostebrazil.zendesk.com/hc/pt-br/sections/')) {
    const duplicateChild = document.querySelector('.blocks-list li:last-child');
    duplicateChild.style.display = 'none'
}

if (window.location.href === 'https://lacoste-argentina.zendesk.com/hc/pt-br/requests/new?ticket_form_id=28362721571859') {
    const fieldEmail = document.querySelector('.request_anonymous_requester_email label')
    fieldEmail.innerText = 'Correo Electronico'
}