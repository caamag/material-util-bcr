
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
}