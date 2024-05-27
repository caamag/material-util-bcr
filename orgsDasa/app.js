
const { getUser } = require('./getUser')
const { getOrgs } = require('./getOrgs')
const { updateUser } = require('./updateData')

function getDomain(email) { return email.split('@')[1] }

async function fethData() {

    const users = await getUser();
    console.log('usuários carregados');

    const orgs = await getOrgs();
    console.log('Organizações carregadas');

    users.forEach(user => {
        const userDomain = getDomain(user.email);
        orgs.map(org => {
            if (org.domain_names.includes(userDomain)) {
                console.log(`${user.email} | ${org.domain_names}`);
                updateUser(user.id, org.id)
            }
        })
    })
}

fethData()
