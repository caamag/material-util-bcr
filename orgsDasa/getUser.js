const axios = require('axios');
const { access } = require('./data');

//1717428601
const endpoint = 'https://gestohelp.zendesk.com/api/v2/incremental/users';
async function getUser (page = 1, users = []) {
    if (page === 10) {
        return;
    }

    try {
        const response = await axios.get(endpoint, {
            params: {
                start_time: 1717428601,
                page: page
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${access}`
            }
        });

        const data = response.data;
        users.push(...data.users)
        console.log(`Página ${page} - ${users.length} usuários recebidos`);

        if (data.next_page) {
            await new Promise(res => setTimeout(res, 2500))
            await getUser(page + 1, users)
        } else {
            console.log(`Usuários carregados`);
        }
    } catch (error) {
        console.error(error.message);
    }

    return users;
}

module.exports = { getUser }
