const { getUser } = require('./getUser')
const { getOrgs } = require('./getOrgs')
const { updateUser } = require('./updateData')

function getDomain(email) { return email.split('@')[1] }

async function fethData() {

    const users = await getUser()
    console.log('Usuários capturados');

    const orgs = await getOrgs();
    console.log('Organizações carregadas');

    users.map(user => {
        const userDomain = user.email ? getDomain(user.email) : ''
        orgs.map(org => {
            if (userDomain !== '' && org.domain_names.includes(userDomain)) {
                console.log(`${user.email} | ${org.domain_names}`);
            }
        })
    })
}

fethData()
