const { getUser } = require('./getUser')
const { getOrgs } = require('./getOrgs')
const { updateUser } = require('./updateData')

function getDomain(email) { return email.split('@')[1] }

async function fethData() {

    const users = await getUser()
    console.log('Usuários capturados');
    users.map(user => {
        if (user.email) {
            console.log(user.email);
        }
    })

    const orgs = await getOrgs();
    console.log('Organizações carregadas ' + orgs.length);

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