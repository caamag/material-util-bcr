
const { access } = require('./data')
const { domains } = require('./domainList')

async function getOrgs() {

    let orgs = [];
    let page = 1;
    let newPages = true;

    while (newPages) {
        const res = await fetch(`https://con-bcrcx-caio.zendesk.com/api/v2/organizations?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${access}`
            }
        })

        const data = await res.json()
        const filteredOrgs = data.organizations.filter(org => {
            return org.domain_names.some(domain => domains.includes(domain));
        });

        orgs = orgs.concat(filteredOrgs);

        if (data.next_page) {
            page++
        } else {
            newPages = false;
        }
    }

    return orgs;
}

module.exports = { getOrgs }