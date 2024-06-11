//getting fields
let notes = [];
async function getCsatFields() {

    const fieldsResponse = await fetch('/api/v2/ticket_fields')
    const fieldsData = await fieldsResponse.json()
    const csatFields = fieldsData.ticket_fields.filter(field => field.title.startsWith('(CSAT)'))
    notes.length = csatFields.length;

    //change position of txt field
    const regex = /\(TXT\)/;
    const txtFields = csatFields.filter(field => regex.test(field.title_in_portal))
    const fieldWithoutTxt = csatFields.filter(field => !regex.test(field.title_in_portal))
    const orderFields = txtFields.concat(fieldWithoutTxt)

    orderFields.map((field, index) => {
        const title = field.title_in_portal;
        let titleWithouTXT = title
        if (regex.test(title)) {
            titleWithouTXT = title.replace(regex, '')
        }

        let content = `
            <h3 class="question-title">${field.title_in_portal}</h3>
            <div class="icons-container"></div>
        `
        const formContainer = document.querySelector('.csat-form')
        formContainer.insertAdjacentHTML('afterbegin', content)
        const iconsContainer = formContainer.querySelector('.icons-container')

        if (!regex.test(field.title_in_portal)) {
            let regexIconsLength = /\((\d+)\)/;
            let match = regexIconsLength.exec(field.title_in_portal);
            let iconsLength = match ? parseInt(match[1], 10) : 5;

            if (iconsLength) {
                iconsLength = iconsLength;
            } else {
                iconsLength = 5;
            }

            const iconsContainer = document.querySelectorAll('.icons-container')[index];
            for (let i = 0; i < iconsLength; i++) {
                const icon = document.createElement('img');
                icon.className = `icon icon${i}`;
                iconsContainer.appendChild(icon);
            }
        });

}

getCsatFields()

function handleclick() {



}


