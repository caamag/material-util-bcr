const linkForm = 'https://lacostebrazil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=29035139635219';
const currentURL = window.location.href;
if (currentURL.startsWith(linkForm)) {

    //delete default submit input
    const defaultInput = document.querySelector('input[type=submit]')
    defaultInput.style.display = 'none'

    //changing title form
    const formTitle = document.querySelector('.container h1');
    formTitle.innerHTML = 'Pesquisa de satisfação';
    formTitle.style.textAlign = 'center'

    const form = document.querySelector('.request-form');
    let sliceLabels = 8;
    let formLength = (form.length) - 9;
    if (formLength < 3) {
        formLength = 3;
        sliceLabels = 7;
    }
    const labels = document.querySelectorAll(`#new_request div:nth-child(n+${sliceLabels}) label`);
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < formLength; i++) {

        //creating a question with dynamic title
        const question = document.createElement('div')
        question.className = `question-container question${i}`
        const titleQuestion = document.createElement('h1')
        titleQuestion.innerText = labels[i].innerText
        question.appendChild(titleQuestion)

        //icons
        const icons = document.createElement('div')
        icons.className = 'icon-content'
        question.appendChild(icons)

        const title = titleQuestion.innerText.trim()
        const regex = /\((\d+)\)/
        const match = title.match(regex)

        const maxIcons = 10;
        let iconsLength = match ? parseInt(match[1], 10) : 5;
        iconsLength = Math.max(2, Math.min(maxIcons, iconsLength));

        //defining icon imagew
        let imgSource = '';
        if (title.startsWith('*')) {
            imgSource = 'https://theme.zdassets.com/theme_assets/19445438/ef3110d121e79b05a3cae002f417c6a78f460c5b.png'
        } else {
            imgSource = 'https://theme.zdassets.com/theme_assets/19445438/ef3110d121e79b05a3cae002f417c6a78f460c5b.png'
        }

        for (let j = 0; j < iconsLength; j++) {
            const icon = document.createElement('img')
            icon.className = `star-icon icon${i}`
            icon.src = imgSource;
            icon.addEventListener('click', () => { handleClick(icon, j, i) })
            icons.appendChild(icon)
        }


        //verify NPS question
        const NPSRegex = /\(NPS\)/;
        if (NPSRegex.test(titleQuestion.innerText)) {

            const newTitle = titleQuestion.innerText.replace(NPSRegex, '');
            titleQuestion.innerText = newTitle;
            const iconContent = titleQuestion.parentNode.querySelector('.icon-content')
            iconContent.style.display = 'none'

            const NPSContainer = document.createElement('div');
            NPSContainer.classList.add('nps-container');

            for (let n = 0; n < 11; n++) {
                const npsBox = document.createElement('div')
                npsBox.classList.add('nps-box')
                npsBox.classList.add(`box-${n}`)
                npsBox.innerText = n;
                NPSContainer.appendChild(npsBox)

                npsBox.addEventListener('click', () => { handleClickNps(npsBox, n, i) })
            }
            titleQuestion.parentNode.appendChild(NPSContainer)
        }

        form.appendChild(question)

        const textRegex = /\(TXT\)/
        const optionText = /\(opcional\)/
        if (textRegex.test(titleQuestion.innerText)) {
            const iconContent = titleQuestion.parentNode.querySelector('.icon-content')
            iconContent.style.display = 'none'

            const newTitle = titleQuestion.innerText
                .replace(textRegex, '')
                .replace(optionText, '')
            titleQuestion.innerText = newTitle;

            const textarea = document.createElement('textarea')
            textarea.classList.add('multilinha')
            titleQuestion.parentNode.append(textarea)
        }

        const fields = document.querySelectorAll('.form-field')
        fields.forEach(field => {
            field.classList.add('deleted-field')
        })
        const ZendeskFields = Array.from(fields)
        let fieldSlice = 5;
        if (ZendeskFields.length < 9) {
            fieldSlice = 4
        }
        const ZendeskFieldsFilter = ZendeskFields.slice(fieldSlice)
        ZendeskFieldsFilter.pop()

        ZendeskFieldsFilter.forEach((field, index) => {
            field.classList.add(`question${index}`)
        })

        const textareaField = document.querySelectorAll('.multilinha')
        textareaField.forEach(field => {
            const classQuestion = field.parentNode.classList[1];
            const indexQuestion = classQuestion[classQuestion.length - 1]

            field.addEventListener('input', () => {
                console.log(ZendeskFieldsFilter)
                console.log(ZendeskFieldsFilter[indexQuestion].classList[5])
                if (field.parentNode.classList[1] === ZendeskFieldsFilter[indexQuestion].classList[5]) {
                    ZendeskFieldsFilter[indexQuestion].querySelector('input').value = field.value
                    field.classList.remove('.delete-field')
                }
            })
        })

        //creating a submit button
        if ((i + 1) === formLength) {
            const submitBtn = document.createElement('input')
            submitBtn.setAttribute('type', 'submit')
            submitBtn.setAttribute('name', 'commit')
            submitBtn.setAttribute('value', 'Enviar avaliação')
            submitBtn.className = 'submit-btn';
            submitBtn.style.display = 'block';
            submitBtn.style.marginTop = '40px';
            form.appendChild(submitBtn)
        }
    }

    //getting fields
    const apiUrl = 'https://lacostebrazil.zendesk.com/api/v2/ticket_forms'
    const campos = [];
    async function getFields() {

        const res = await fetch(apiUrl)
        const data = await res.json()
        const forms = data.ticket_forms;
        const csatForm = forms.filter(form => form.name === 'Pesquisa de Satisfação');

        let sliceNumber = 9;
        if (csatForm[0].ticket_field_ids.length < 9) {
            sliceNumber = 3;
        }

        const IDs = csatForm[0].ticket_field_ids.slice(sliceNumber)

        for (let f = 0; f < IDs.length; f++) {
            const el = document.querySelector(`.request_custom_fields_${IDs[f]}`)
            if (el.classList.contains('string')) {
                campos.push(document.querySelector(`.request_custom_fields_${IDs[f]} input`))
            } else {
                campos.push(document.querySelector(`.request_custom_fields_${IDs[f]} textarea`))
            }
        }
    }
    getFields()

    function handleClick(star, index, questionIndex) {
        const allStars = star.parentNode.querySelectorAll('.star-icon');

        selectedLengths[questionIndex] = index + 1;

        for (let i = 0; i < allStars.length; i++) {
            if (i <= index) {
                allStars[i].classList.add('selected');
            } else {
                allStars[i].classList.remove('selected');
            }
        }
        campos[questionIndex].value = selectedLengths[questionIndex];
    }

    function handleClickNps(star, index, questionIndex) {
        const allNPSIcons = star.parentNode.querySelectorAll('.nps-box');

        selectedLengths[questionIndex] = index;

        for (let i = 0; i < allNPSIcons.length; i++) {
            if (i <= index) {
                allNPSIcons[i].classList.add('selected');
            } else {
                allNPSIcons[i].classList.remove('selected');
            }
        }
        campos[questionIndex].value = selectedLengths[questionIndex];
    }

    const heroInner = document.querySelector('.hero')
    heroInner.style.display = 'none'

    //removendo outros na página de csat
    const outros = document.querySelector('.outros')
    outros.style.display = 'none'
}

//ajustes no formulário de abertura de ticket 
if (window.location.href === 'https://lacostebrazil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=24141230581395'
    || window.location.href === 'https://lacostebrazil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=24141230581395&tf_27333159915411=outros_assuntos'
) {
    const heroContainer = document.querySelector('.hero-inner')
    heroContainer.style.display = 'none'

    //centralizando título
    const title = document.querySelectorAll('h1')
    title.forEach(title => {
        title.style.textAlign = 'center'
    })

    //removendo campo 'outros'
    const outros = document.querySelector('.outros')
    outros.style.display = 'none'

    //ajustando search
    const searchForm = document.querySelector('.search');
    searchForm.style.width = '20vw'

    //removendo campo de seleção de formulários
    const selectFormField = document.querySelector('.request_ticket_form_id')
    selectFormField.style.display = 'none'
}


//ajustando página de new request
if (window.location.href === 'https://lacoste-argentina.zendesk.com/hc/pt-br/requests/new') {

    //removendo cards de seleção
    const heroContainer = document.querySelector('.hero-inner')
    heroContainer.style.display = 'none'

    //centralizando título
    const title = document.querySelectorAll('h1')
    title.forEach(title => {
        title.style.textAlign = 'center'
    })

    //ajustando search
    const searchForm = document.querySelector('.search');
    searchForm.style.width = '20vw'

    //diminuindo espaçamento de cima
    const divider = document.querySelector('.container-divider')
    divider.style.height = '20px'
    const subNav = document.querySelector('.sub-nav')
    subNav.style.marginTop = '20px'

    //removendo campo 'outros'
    const outros = document.querySelector('.outros')
    outros.style.display = 'none'
}

const container = document.querySelector('.container');
container.style.marginTop = '-300px'





//código para monitorar se o footer está sendo focado
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector('footer');

    // Verifique se o footer está sendo focado automaticamente
    if (document.activeElement === footer) {
        document.activeElement.blur();
    }

    // Verifique se há alguma função de rolagem ativa
    window.scrollTo(0, 0);

    // Monitorar se há rolagens adicionais
    setTimeout(() => {
        if (window.scrollY > 0) {
            window.scrollTo(0, 0);
        }
    }, 1000);
});