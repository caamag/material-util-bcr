//csat
async function getCSATForms() {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json()

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const csatForms = data.ticket_forms.filter(form => regexCSAT.test(form.name) || regexNPS.test(form.name));
    const baseURL = 'ticket_form_id='
    const urls = csatForms.map(form => `${baseURL}${form.id}`)

    return urls.some(url => window.location.href.includes(url))
}

