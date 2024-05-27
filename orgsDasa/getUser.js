
const { access } = require('./data')

async function getUser() {

    let users = [];
    let page = 1;
    let newPages = true;

    while (newPages) {
        const res = await fetch(`https://con-bcrcx-caio.zendesk.com/api/v2/users?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${access}`
            }
        })

        const data = await res.json()
        users = users.concat(data.users.filter(user => user.email && user.email.trim() !== null));

        //nextPage
        if (data.next_page) {
            page++
            console.log('Usuários capturados' + users.length);
        } else {
            newPages = false;
        }
    }
    return users;
}

module.exports = { getUser }