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
    .then(isCSAtForm => {
        if (isCSAtForm) {
          	
          	//centralizando form
            const title = document.querySelectorAll('h1');
            title.forEach(title => {
                title.style.textAlign = 'center';
                title.innerHTML = `Questionário`
                const subtitle = document.createElement('h3')
                subtitle.classList.add('subtitle-csat')
                
                subtitle.innerHTML = `Olá, gostaríamos de convidá-lo a preencher
                este questionário para que possamos oferecer melhores serviços. Obrigado 
                pelo seu comentário.`
                
                title.appendChild(subtitle)
            })
          
            const customFieldsDropDown = document.querySelectorAll('.eZAVpC')
            customFieldsDropDown[0].style.display = 'none';
            
            const questions = document.querySelectorAll(".iRSmTf");
            questions[0].style.display = 'none'
            questions[2].style.display = 'none'
            
            
            questions.forEach(question => {
              
              	const labelDelected = question.querySelector('label').innerText
                if (labelDelected.includes('Assunto') ||
                    labelDelected.includes('Descrição') ||
                    labelDelected.includes('Anexos') ||
                    labelDelected.includes('Ticket Original')) {

                    question.style.display = 'none';
                }
              
              	if (labelDelected.includes('Outros aspectos')) {
                    question.querySelector('label').style.display = 'none'
                    question.querySelector('input').style.display = 'none'
                    question.querySelector(".cmCBdM").style.display = 'none'
                }

                if (question.querySelector('input[type="checkbox"]')) {
                    const label = question.querySelector('label');
                    label.style.cssText = `
                        margin-left: 10px;
                        font-size: 18px;
                        font-weight: 500;
                        cursor: pointer;
                    `;
            
                    const checkBox = question.querySelector('input[type=checkbox]');
                    checkBox.style.cssText = `
                        width: 10px;
                        height: 10px;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        border-radius: 5px;
                        border: 2px solid #ccc;
                        background-color: white;
                        position: relative;
                        cursor: pointer;
                        transition: background-color 0.2s, border-color 0.2s;
                    `;
            
                    checkBox.addEventListener('change', () => {
                        if (checkBox.checked) {
                            checkBox.style.border = '4px solid #3cb757'
                            checkBox.style.boxShadow = '0px 0px 7px #3cb757'
                            label.style.color = '#3cb757';
                        }else{
                            checkBox.style.backgroundColor = 'white'
                            checkBox.style.border = '2px solid rgb(200,200,200)'
                            checkBox.style.boxShadow = 'none'
                            label.style.color = 'black';
                        }
                    })    
                }
              
                const title = question.querySelector("label").innerText
                if (title.includes("Na escala de 1 a 10")) {
                    const npsContainer = document.createElement('div')
                    npsContainer.classList.add('nps-container')
                    question.appendChild(npsContainer)
                  
                  	const subtitleNPSField = document.createElement('h3')
                    subtitleNPSField.innerHTML = 'Por favor diga-nos quais dos seguintes aspectos se refere à sua avaliação:'
                    subtitleNPSField.classList.add('subtitle-nps')
                    question.appendChild(subtitleNPSField)

                    const npsInput = question.querySelector('input')
                    npsInput.style.display = 'none'

                    function handleClick (index) {
                        const allIcons = document.querySelectorAll('.nps-icon');
                        allIcons.forEach((icon, idx) => {
                            if (idx <= index) {
                                icon.classList.add('selected')
                            }else{
                                icon.classList.remove('selected')
                            }
                        })
                    
                        npsInput.value = index + 1
                    }

                    for (let i = 0; i < 10; i++) {
                        const npsIcon = document.createElement('div')
                        npsIcon.classList.add(`nps-icon`)
                        npsIcon.innerHTML = i + 1;
                        npsContainer.appendChild(npsIcon)
                        npsIcon.addEventListener('click', () => {handleClick(i)})
                    }
                }  
            })  
          
            const solvedField = customFieldsDropDown[1]
            const firstQuestion = document.createElement('div')
            firstQuestion.classList.add('first-question-box')
            solvedField.appendChild(firstQuestion)
            firstQuestion.innerHTML = `
                <h3>Seu problema foi resolvido?</h3>
                <div class="answer-box">
                    <label for="yes-answer">Sim</label>
                    <input type="checkbox" id="yes-answer">
                </div>

                <div class="answer-box">
                    <label for="no-answer">Não</label>
                    <input type="checkbox" id="no-answer">
                </div>
        		`;
          
            const answerCheckbox = document.querySelectorAll('.answer-box input');
            answerCheckbox.forEach(input => {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        input.style.border = '4px solid #3cb757'
                        input.style.boxShadow = '0px 0px 7px #3cb757'
                    }else{
                        input.style.backgroundColor = 'white'
                        input.style.border = '2px solid rgb(200,200,200)'
                        input.style.boxShadow = 'none'
                    }
                })
            })
          
            const yesAnswer = document.querySelector('#yes-answer');
            const notAnswer = document.querySelector('#no-answer');
            const solvedInput = document.querySelector('input[name="request[custom_fields][30897134051603]"]')
          	
            yesAnswer.addEventListener('change', () => {
                notAnswer.style.backgroundColor = 'white'
                notAnswer.style.border = '2px solid rgb(200,200,200)'
                notAnswer.style.boxShadow = 'none'
                solvedInput.value = 'csat_sim'
              	solvedInput.removeAttribute('readonly')
            })

            notAnswer.addEventListener('change', () => {
                yesAnswer.style.backgroundColor = 'white'
                yesAnswer.style.border = '2px solid rgb(200,200,200)'
                yesAnswer.style.boxShadow = 'none'
                solvedInput.value = 'csat_não'
              	solvedInput.removeAttribute('readonly')
            })

						solvedField.querySelector("label").style.display = 'none'
          	solvedField.querySelector('div[data-garden-id="dropdowns.combobox"]').style.display = 'none'
          
          	//comentários
            const othersDefaultField = questions[11]
            const othersField = document.createElement('div');
            othersField.innerHTML = `
                <div class="others">
                    <div class="answer-box">
                        <label for="others-check" id="others-label">Outros aspectos ___________ (especificar):</label>
                        <input type="checkbox" id="others-check" style="border-radius: 5px;">
                    </div>
                    <textarea id="others-content" style="display: none;"></textarea>
                </div>
            `;

            othersDefaultField.appendChild(othersField)

            const othersCheck = document.querySelector('#others-check')
            const othersText = document.querySelector('#others-content')
            const otherLabel = document.querySelector('#others-label')
            othersCheck.addEventListener('change', () => {
                if (othersCheck.checked) {
                    othersText.style.display = 'block';
                    othersCheck.style.border = '4px solid #3cb757'
                    othersCheck.style.boxShadow = '0px 0px 7px #3cb757'
                    otherLabel.style.color = 'rgb(60, 183, 87)'
                }else{
                    othersText.style.display = 'none';
                    othersCheck.style.backgroundColor = 'white'
                    othersCheck.style.border = '2px solid rgb(200,200,200)'
                    othersCheck.style.boxShadow = 'none'
                    otherLabel.style.color = 'black'
                }
            })
          
            const othersContent = document.querySelector("#others-content");
            othersContent.addEventListener("input", () => {
				othersDefaultField.querySelector('input').value = othersContent.value;
                console.log(othersDefaultField.querySelector('input').value);
            })
        }
    })



(function() {
    const originalConsoleError = console.error;
    console.error = function(...args) {
        originalConsoleError.apply(console, args);
        window.location.reload();
    };
    
    window.addEventListener('error', function(event) {
        console.error(event.message);
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error(event.reason);
    });
    })();
      


const currentUrl = window.location.href;
const baseUrl = 'https://oppo-do-brasil.zendesk.com/hc/pt-br';
if (currentUrl === baseUrl || /https:\/\/oppo-do-brasil\.zendesk\.com\/hc\/pt-br\/requests\/\d+/.test(currentUrl)
    || currentUrl === 'https://oppo-do-brasil.zendesk.com/hc/pt-br?return_to=%2Fhc%2Frequests') {

        window.location.href = 'https://www.oppo.com/br/';
        
}