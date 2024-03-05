
const apiUrl = 'https://pandorabrasil.zendesk.com/api/v2/ticket_forms'
async function getFields() {

    const res = await fetch(apiUrl)
    const data = await res.json()
    const IDS = data.ticket_forms[4].ticket_field_ids
    console.log(IDS);

}

getFields()