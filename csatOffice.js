const linkFormCSAT = 'https://office-total.zendesk.com/hc/pt-br/requests/new?ticket_form_id=26870173758349';

if (currentURL.startsWith(linkFormCSAT)) {

    const formTitle = document.querySelector('.container h1')
    formTitle.innerHTML = 'Pesquisa de Satisfação'

    const form = document.querySelector('.request-form')
    const formLength = form.length - 8
    let childCut = 7;
    if (formLength > 13) childCut = 8

    const labels = document.querySelectorAll(`#new_request div:nth-child(n+${childCut}) label`)
    const selectedLengths = [0, 0, 0, 0];

    for (let i = 0; i < formLength; i++) {
        const question = document.createElement('div');
        question.className = `question-container question${i}`
        var titleQuestion = document.createElement('h1')
        titleQuestion.innerText = labels[i].innerText;
        question.appendChild(titleQuestion)

        //icons
        const icons = document.createElement('div');
        icons.className = 'icon-content-csat';
        question.appendChild(icons)

        var title = titleQuestion.innerText.trim()
        const regexNumber = /\((\d+)\)/;
        const match = title.match(regexNumber)

        const maxIcons = 5;
        let iconsLength = match ? parseInt(match[1], 10) : 5;
        let imgSource = ''
        if (title.startsWith('*')) {
            imgSource = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ766D2D0YKEBCEWCR05CAD'
        } else {
            imgSource = 'https://office-total.zendesk.com/hc/theming_assets/01HZJ766D2D0YKEBCEWCR05CAD'
        }

        for (let j = 0; j < iconsLength; j++) {
            const icon = document.createElement('img');
            icon.className = `star-icon icon${i}`
            icon.src = imgSource;
            icons.appendChild(icon);
        }
        form.appendChild(question)

        if ((i + 1) === formLength) {
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

    //excluindo campo de id do ticket na área não logada
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(question => {
        const title = question.querySelector('h1')
        if (title.innerText === 'Ticket Original(opcional)') {
            question.style.display = 'none'
        }
    })

    const regexText = new RegExp("\\(" + "(TXT)" + "\\)")
    const h2Textearea = document.querySelectorAll('h1');
    h2Textearea.forEach(text => {
        if (regexText.test(text.innerText)) {
            const questionWithTextArea = text.parentNode;
            questionWithTextArea.style.flexDirection = 'column';
            questionWithTextArea.style.marginBottom = '30px';
            questionWithTextArea.style.alignItems = 'start';
            const iconContent = questionWithTextArea.querySelectorAll('.icon-content-csat');

            if (regexText.test(title)) {
                const textWithoutTag = title.replace(regexText, `<span class='nps-tag'>$&</span>`);
                titleQuestion.innerHTML = textWithoutTag;
            }

            iconContent.forEach(content => {
                content.style.display = 'none';
            })
            const newTextarea = document.createElement('textarea');
            newTextarea.classList.add('multilinha')
            questionWithTextArea.appendChild(newTextarea)
        }
    })

    const apiUrl = 'https://office-total.zendesk.com/api/v2/ticket_forms'
    const campos = [];
    const getFields = async () => {
        const res = await fetch(apiUrl);
        const data = await res.json()
        const forms = data.ticket_forms;
        const csatForm = forms.filter(form => form.name === 'Pesquisa de CSAT')

        const IDs = csatForm[0].ticket_field_ids.slice(9)

    }

    getFields()

}