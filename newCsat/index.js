
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

        let content = `
            <div class="question-container question${orderFields.length - index}">
                <h3 class="question-title">${field.title_in_portal}</h3>
                <div class="icons-container"></div>
            </div>
        `
        const formContainer = document.querySelector('.csat-form')
        formContainer.insertAdjacentHTML('afterbegin', content)
        const iconsContainer = formContainer.querySelector('.icons-container')

        if (!regex.test(field.title_in_portal)) {
            let regexIconsLength = /\((\d+)\)/;
            let match = regexIconsLength.exec(field.title_in_portal);
            let iconsLength = match ? parseInt(match[1], 10) : 5;

            for (let i = 0; i < iconsLength; i++) {
                const icon = document.createElement('img');
                icon.className = `icon icon${i}`;
                icon.src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSRF1J6ECTZNDGM54G5627V'
                icon.addEventListener('click', () => { handleClick(icon, i, index) })
                iconsContainer.appendChild(icon)
            }
        } else {
            const newTextarea = document.createElement('textarea')
            newTextarea.classList.add('free-comment')
            iconsContainer.appendChild(newTextarea)
        }
    });

    function handleClick(icon, indexIcon, indexQuestion) {
        const allIcons = icon.parentNode.querySelectorAll('.icon')
        for (let i = 0; i < allIcons.length; i++) {
            if (i < indexIcon + 1) {
                allIcons[i].classList.add('selected')
                allIcons[i].src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSTYTC3Q59YES4XWCPX6Q11'
            } else {
                allIcons[i].classList.remove('selected')
                allIcons[i].src = 'https://con-bcrcx-caio.zendesk.com/hc/theming_assets/01HZSRF1J6ECTZNDGM54G5627V'
            }
        }

        //updating notes
        notes[indexQuestion] = indexIcon + 1;
    }
}
getCsatFields()

function lastString(string) { return string.charAt(string.length - 1) }

function handleSubmit() {
    const textarea = document.querySelector('.free-comment')
    const iconsContainerWithTextarea = textarea.parentNode
    const indexTextarea = iconsContainerWithTextarea.parentNode.classList[1]
    const index = parseInt(lastString(indexTextarea))

    const notesToSubmit = notes.reverse()
    notesToSubmit[index - 1] = textarea.value;


}

const submitBnt = document.querySelector('.csat-btn')
submitBnt.addEventListener('click', () => { handleSubmit() })
