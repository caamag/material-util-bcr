function redirectFormRequest(role) {
    const login = document.querySelector('.header-links')
    login.classList.add(`${role === 'anonymous' ? 'delete' : 'visible'}`)
}

const userRole = window.HelpCenter.user.role;
redirectFormRequest(userRole)

const showLogOutBtn = document.querySelector('.dropdown-toggle')
const dropDownContent = document.querySelector('.profile-content-dropdown')

let isVisible = false;
showLogOutBtn.addEventListener('click', () => {
    isVisible = !isVisible;
    dropDownContent.style.display = isVisible ? 'block' : 'none'
})

//ajustando página de seleção de formulário:
const getAllTicketForms = async () => {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json();

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const forms = data.ticket_forms.filter(form => !regexCSAT.test(form.name) &&
        !regexNPS.test(form.name) && form.end_user_visible === true && form.active === true && form.restricted_brand_ids[0] === 16092059503380
    )
    const selectFormContainer = document.querySelector(".select-form-content");

    forms.map(form => {
        let content = `
            <a href="https://niky8517.zendesk.com/hc/pt-br/requests/new?ticket_form_id=${form.id}">${form.name}</a>    
        `;

        selectFormContainer.insertAdjacentHTML('afterbegin', content);
    })

    let isVisible = false;
    const showLinksBtn = document.querySelector(".show-form-btn");
    showLinksBtn.addEventListener("click", () => {
        const links = document.querySelectorAll('.select-form-content a')
        links.forEach(link => {
            link.style.display = isVisible ? 'flex' : 'none'
        })

        isVisible = !isVisible
    });
}


const getTicketForms = async () => {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json()

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const forms = data.ticket_forms.filter(form => !regexCSAT.test(form.name) &&
        !regexNPS.test(form.name) && form.end_user_visible === true &&
        form.active === true &&
        form.restricted_brand_ids[0] === 16092059503380
    )

    const baseURL = 'ticket_form_id=';
    const urls = forms.map(form => `${baseURL}${form.id}`)
    return urls.some(url => window.location.href.includes(url))

}

const showLinks = async () => {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json()

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const forms = data.ticket_forms.filter(form => !regexCSAT.test(form.name) &&
        !regexNPS.test(form.name) && form.end_user_visible === true &&
        form.active === true &&
        form.restricted_brand_ids[0] === 16092059503380
    )

    forms.map(form => {
        let content = `
            <a href="https://niky8517.zendesk.com/hc/pt-br/requests/new?ticket_form_id=${form.id}" class="link-form">${form.display_name}</a><br>
        `
        const links = document.querySelector('.forms-link')
        links.insertAdjacentHTML('afterend', content);
    })
}

getTicketForms()
    .then(isCustomerForm => {
        if (isCustomerForm) {
            const requestFormID = document.querySelector('.request_ticket_form_id')
            const firtInput = document.querySelector('.nesty-input').style.display = 'none'

            let content = `
                <button class="select-form-btn-first">-</button>
                <div class="forms-link"></div>
            `
            requestFormID.insertAdjacentHTML('afterend', content)

            showLinks()
            let isVisible = false;

            const showLinkdBtn = document.querySelector('.select-form-btn-first')
            showLinkdBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                isVisible = !isVisible;
                const links = document.querySelectorAll('.link-form');
                links.forEach(link => {
                    link.classList.add(isVisible ? 'visible-links' : 'invisible-links')
                })
            })
        }
    })
