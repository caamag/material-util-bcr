
async function createTicket() {

    const name = document.querySelector('#nome-pedido').value;
    const email = document.querySelector('#email-pedido').value;
    const description = document.querySelector('#decricao').value;
    const requestNumber = document.querySelector('#numero-pedido').value;
    const purchaseOptions = document.querySelector('#canal-compra').value;

    const ticketData = {
        ticket: {
            comment: {
                body: "Ticket criado por api"
            },
            priority: "normal",
            subject: requestNumber
        }
    }

    const res = await fetch('/api/v2/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData),
    });

    const data = await res.json();
    console.log(data);
};

const SubmitBtn = document.querySelector('#enviar');
SubmitBtn.addEventListener('click', () => { createTicket() });