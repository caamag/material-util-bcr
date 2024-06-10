
async function fetchData() {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json();
    const forms = data.ticket_forms[2]
    console.log(forms);
}

fetchData()