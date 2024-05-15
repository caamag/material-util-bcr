
const linkForm = 'https://lacostebrazil.zendesk.com/hc/pt-br/requests/new?ticket_form_id=29035139635219';
const currentURL = window.location.href;
if (currentURL.startsWith(linkForm)) {

    //changing title form
    const formTitle = document.querySelector('.container h1');
    formTitle.innerHTML = 'Pesquisa de satisfação';

    const form = document.querySelector('.request-form');
    const formLength = (form.length) - 8;
    const labels = document.querySelectorAll('#new_request div:nth-child(n+7) label');
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

        //defining icon image
        let imgSource = '';
        if (title.startsWith('*')) {
            imgSource = 'https://theme.zdassets.com/theme_assets/18268840/48b68ac03a2936b3b0c23e11ed213f0261d56efa.jpg'
        } else {
            imgSource = 'https://theme.zdassets.com/theme_assets/18268840/48b68ac03a2936b3b0c23e11ed213f0261d56efa.jpg'
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
            const iconContent = titleQuestion.parentNode.querySelector('.icon-content')
            iconContent.style.display = 'none'

            const NPSContainer = document.createElement('div');
            NPSContainer.classList.add('nps-container');

            for (let n = 0; n < 11; n++) {
                const npsBox = document.createElement('div')
                npsBox.classList.add('npx-box')
                npsBox.classList.add(`box-${n}`)
                npsBox.innerText = n;
                NPSContainer.appendChild(npsBox)

                npsBox.addEventListener('click', () => {handleClick(npsBox, n, i)})
            }
            titleQuestion.parentNode.appendChild(NPSContainer)
        }

        form.appendChild(question)

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
    async function getFields () {

        const res = await fetch(apiUrl)
        const data = await res.json()
        const forms = data.ticket_forms;
        const csatForm = forms.filter(form => form.name === 'Pesquisa de Satisfação');

        const IDs = csatForm[0].ticket_field_ids.slice(9)
        console.log(IDs);
        for (let f = 0; f < IDs.length; f++) {
            const el = document.querySelector(`.request_custom_fields_${IDs[f]}`)
            if (el.classList.contains('string')) {
                campos.push(document.querySelector(`.request_custom_fields_${IDs[f]} input`))
            }else{
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

}