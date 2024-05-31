const { access } = require('./data')

async function getUser() {

    let users = [];
    let page = 1;
    let newPages = true;

    while (newPages) {
        try {
            const res = await fetch(`https://gestohelp.zendesk.com/api/v2/users?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${access}`
                }
            })

            const data = await res.json()
            users = users.concat(data.users)

            //nextPage
            if (data.next_page) {
                page++
                console.log(`Usuários carregados ${users.length}`);
            } else {
                newPages = false;
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return users;
}

getUser()

module.exports = { getUser }