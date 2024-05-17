
const { email, pass } = require('./accsess')

const authString = `${email}:${pass}`
const access = Buffer.from(authString).toString('base64')

async function getUser() {
    const res = await fetch('https://gestohelp.zendesk.com/api/v2/users', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${access}`
        }
    })
    const data = await res.json();
    const users = data.users;
    return users;
}

module.exports = { getUser }