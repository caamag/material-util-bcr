const urlAtual = window.location.href; 
const linkForm = 'https://pandorabrasil.zendesk.com/hc/pt-br'

if (urlAtual.startsWith(`${linkForm}/requests/new?ticket_form_id=(id do form NPS)`)) {

    const form = document.querySelector('.request-form')
    const questionLength = (form.length) - 9
    const labels = document.querySelectorAll('#new_request div:nth-child(n+8) label')
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < questionLength; i++) {

        const question = document.createElement('div');
        question.className = `question-container question${i}`;
        const titleQuestion = document.createElement('h2');
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion);

        const icons = document.createElement('div');
        icons.className = 'stars-content';
        question.appendChild(icons);

        const titleQuestionContent = titleQuestion.innerText.trim()
        const regex1 = new RegExp("\\(" + "(NPS)" + "\\)")
        const regex3 = new RegExp("\\(" + "(3)" + "\\)")
        const regex5 = new RegExp("\\(" + "(5)" + "\\)")
        const regexText = /^.*\(TXT\).*$/

        let iconsLength = 0;
        if (regex1.test(titleQuestionContent)) {
            iconsLength = 10;
        }else if (regex3.test(titleQuestionContent)) {
            iconsLength = 3;
        }else if (regex5.test(titleQuestionContent)) {
            iconsLength = 5;
        }

        let imgSource = 'link da imagem';
        const regexStar = /\*/;
        if (regexStar.startsWith("*")) {
            imgSource = "link da imagem estrela"
            titleQuestion.innerHTML = originalTitle.replace(regexStar, '<span class="styled-number">*</span>');
        }

        for (let j = 0; j < iconsLength; j++) {
            const icon = document.createElement('img');
            icon.src = imgSource;
            icon.className = `star-icon icon${j}`;
            icon.addEventListener('click', () => { handleClick(star, j, i); });
            icons.appendChild(icon);
        }

    }
}

