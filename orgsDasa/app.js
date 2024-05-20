
const { getUser } = require('./getUser')
const { getOrgs } = require('./getOrgs')

function getDomain(email) { return email.split('@')[1] }

async function fethData() {

    const users = await getUser();
    console.log('usuários carregados');

    const orgs = await getOrgs();
    console.log('Organizações carregadas');

    users.forEach(user => {
        const userDomain = getDomain(user.email);


    })

}

fethData()

module.exports = { getDomain }