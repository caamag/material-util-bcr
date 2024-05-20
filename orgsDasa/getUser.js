
const { access } = require('./data')

async function getUser() {
    const res = await fetch('https://gestohelp.zendesk.com/api/v2/users', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${access}`
        }
    })
    const data = await res.json()
    const users = data.users
    const userWithEmail = users.filter(user => user.email && user.email.trim() !== null)
    return userWithEmail;

}

module.exports = { getUser }