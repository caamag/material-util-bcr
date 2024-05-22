
const { access } = require('./data')

async function updateUser(userID, orgID) {

    const res = await fetch(`https://con-bcrcx-caio.zendesk.com/api/v2/users/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${access}`
        },
        body: JSON.stringify({
            user: {
                organization_id: orgID
            }
        })
    })

    const data = await res.json()
    console.log('Usuário atualizado com sucesso');
}

module.exports = { updateUser }