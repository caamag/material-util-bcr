
async function getCSATForms() {
    const res = await fetch('/api/v2/ticket_forms');
    const data = await res.json()

    const regexCSAT = /CSAT/
    const regexNPS = /NPS/

    const csatForms = data.ticket_forms.filter(form => regexCSAT.test(form.name) || regexNPS.test(form.name));
    const baseURL = '/requests/new?ticket_form_id='
    const urls = csatForms.map(form => `${baseURL}${form.id}`)

    return urls.some(url => window.location.href.includes(url))
}

getCSATForms()
    .then(isCSATForm => {
        if (isCSATForm) {
            const formTitle = document.querySelector('.container h1');
            formTitle.innerHTML = 'Pesquisa de satisfação';

            const form = document.querySelector('.request-form')
            const formFields = document.querySelectorAll('.form-field');
            const customFields = Array.from(formFields).filter(field => {
                return Array.from(field.classList).some(className => {
                    return className.startsWith('request_custom_fields_')
                })
            });
            const labels = customFields.map(field => { return field.querySelector('label').innerText })

            for (let i = 0; i < customFields.length; i++) {
                const question = document.createElement('div');
                question.className = `question-container question${i}`
                var titleQuestion = document.createElement('h1')
                titleQuestion.innerText = labels[i];
                question.appendChild(titleQuestion)

                //icons
                const icons = document.createElement('div');
                icons.className = 'icon-content';
                question.appendChild(icons)

                //number of icons
                var title = titleQuestion.innerText.trim()
                const regex = /\((\d+)\)/;
                const match = title.match(regex)

                const maxIcons = 10;
                let iconsLength = match ? parseInt(match[1], 10) : 5;
                iconsLength = Math.max(2, Math.min(maxIcons, iconsLength));

                //definindo ícones
                let imgSource = '';
                if (title.startsWith('*')) {
                    imgSource = 'https://aarsl6161.zendesk.com/hc/theming_assets/01J0P1YJDE71CHZPZ6KGVX6KJJ';
                } else {
                    imgSource = 'https://aarsl6161.zendesk.com/hc/theming_assets/01J0P1YJDE71CHZPZ6KGVX6KJJ';
                }

                for (let j = 0; j < iconsLength; j++) {
                    const icon = document.createElement('img');
                    icon.className = `star-icon icon${j + 1}`
                    icon.src = imgSource;
                    icon.addEventListener('click', () => { handleClick(icon, j, i) })
                    icons.appendChild(icon);
                }
                form.appendChild(question)

                if ((i + 1) === customFields.length) {
                    const submitBtn = document.createElement('input');
                    submitBtn.setAttribute('type', 'submit');
                    submitBtn.setAttribute('name', 'commit');
                    submitBtn.setAttribute('value', 'Enviar avaliação');
                    submitBtn.className = 'submit-btn';
                    submitBtn.style.display = 'block';
                    submitBtn.style.marginTop = '40px';
                    form.appendChild(submitBtn)
                }
            }

            //removing original ticket field
            const questionContainers = document.querySelectorAll('.question-container');
            questionContainers.forEach(question => {
                const title = question.querySelector('h1');
                if (title.innerText.toLocaleLowerCase().includes('ticket original')) {
                    question.style.display = 'none'
                }
            })

            //getting zendesk fields Ids
            const ids = [];
            const campos = [];
            const regexFieldId = /^request_custom_fields_(\d+)$/;
            customFields.forEach(field => {
                field.classList.forEach(className => {
                    const match = className.match(regexFieldId)
                    if (match) ids.push(match[1])
                })
            })

            for (f + 0; f < ids.length; f++) {
                const el = document.querySelector(`.request_custom_fields_${ids[f]}`)
                if (el.classList.contains('string')) {
                    campos.push(document.querySelector(`.request_custom_fields_${ids[f]} input`))
                } else if (el.classList.contains('text')) {
                    campos.push(document.querySelector(`.request_custom_fields_${ids[f]} textarea`))
                }
            }
            console.log(campos);
        }
    })