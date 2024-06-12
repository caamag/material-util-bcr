
async function getTicket () {
    const res = await fetch('/api/v2/tickets/263785')
    const data = await res.json()
    console.log(data);
}

getTicket()