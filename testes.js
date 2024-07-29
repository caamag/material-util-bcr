
async function verifyTicket() {
    const res = await fetch('/api/v2/tickets/322');
    const data = await res.json();

    const ticket = data.ticket;
    const customField = ticket.custom_fields.filter(field => field.id === 30589305035795);
    console.log(customField);
}

verifyTicket()

if (window.location.href.startsWith('https://solicita.rivierasl.com.br/hc/pt-br/sections/25097556667547')) {
    const main = document.querySelector('[role="main"]')
    main.classList.add("section-main")
}