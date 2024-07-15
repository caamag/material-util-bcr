
async function verifyTicket () {
    const res = await fetch('/api/v2/tickets/322');
    const data = await res.json();

    const ticket = data.ticket;
    const customField = ticket.custom_fields.filter(field => field.id === 30589305035795);
    console.log(customField);
}

verifyTicket()