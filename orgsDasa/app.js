
const { email } = require('./accsess');
const { getUser } = require('./getUser')

function getDomain(email) {
    return email.split('@')[1]
}

async function fethData() {

    const users = await getUser();
    const emails = users.map(user => {
        return user.email
    })
    console.log(emails.length);

}

fethData()

module.exports = { getDomain }