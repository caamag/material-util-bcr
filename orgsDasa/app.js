
const { getUser } = require('./getUser')

function getDomain(email) { return email.split('@')[1] }

async function fethData() {

    const users = await getUser();
    const emails = users.map(user => {
        return user.email
    })

}

fethData()

module.exports = { getDomain }