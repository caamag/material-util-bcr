
const { getUser } = require('./getUser')

export function getDomain(email) {
    return email.split('@')[1]
}

async function fethData() {

    const users = await getUser();
    console.log(users[1]);
}

fethData()