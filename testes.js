function redirectFormRequest(role) {
    const login = document.querySelector('.header-links')
    login.classList.add(`${role === 'anonymous' ? 'delete' : 'visible'}`)
}

const userRole = window.HelpCenter.user.role;
redirectFormRequest(userRole)


const orangeBtn = document.querySelectorAll(".orange-btn");
orangeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.replace('https://api.whatsapp.com/send?1=pt_BR&phone=551130038397&text=Ol%C3%A1,%20gostaria%20da%202%C2%AA%20via%20do%20meu%20boleto')
    })
})

let isClicked = false;
const menuIcon = document.querySelector('.menu-icon')
menuIcon.addEventListener('click', () => {
    isClicked = !isClicked;
    const menuMobile = document.querySelector('.menu-mobile')
    menuMobile.style.visibility = `${isClicked ? 'visible' : 'hidden'}`
    menuMobile.style.opacity = `${isClicked ? '1' : '0'}`
})


yesAnswer.addEventListener('change', () => {
    notAnswer.style.backgroundColor = 'white'
    notAnswer.style.border = '2px solid rgb(200,200,200)'
    notAnswer.style.boxShadow = 'none'
    solvedInput.value = 'csat_sim'
    console.log(solvedInput.value)
})

notAnswer.addEventListener('change', () => {
    yesAnswer.style.backgroundColor = 'white'
    yesAnswer.style.border = '2px solid rgb(200,200,200)'
    yesAnswer.style.boxShadow = 'none'
    solvedInput.value = 'csat_não'
    console.log(solvedInput.value)
})

if (solvedInput.value === '') {
    console.log(solvedInput.value)
    e.preventDefault()
    popUp.style.visibility = 'visible'
    popUp.querySelector("p").innerHTML = 'Nos diga se o problema foi ou não resolvido.'
    setTimeout(() => {
        popUp.style.visibility = 'hidden'
    }, 4000)
}

const defaultChecks = document.querySelectorAll('input[type="checkbox"]');
defaultChecks.forEach(check => {
    if (check.id !== 'yes-answer' && check.id !== 'no-answer') {
        check.addEventListener('change', () => {
            const csatValue = `${yesAnswer.checked ? 'csat_sim' : notAnswer.checked ? 'csat_não' : ''}`;
            solvedInput.value = csatValue
        })
    }
})

const submitBtnOppo = document.querySelector(".oppo-submit-btn")
submitBtnOppo.addEventListener("click", (e) => {
    const popUp = document.querySelector(".csat-popup")

    if (solvedInput.value === '' && yesAnswer.checked) {
        solvedInput.value = 'csat_sim'
    } else if (solvedInput.value === '' && notAnswer.checked) {
        solvedInput.value = 'csat_não'
    } else if (solvedInput.value === '') {
        console.log(solvedInput.value)
        e.preventDefault()
        popUp.style.visibility = 'visible'
        popUp.querySelector("p").innerHTML = 'Nos diga se o problema foi ou não resolvido.'
        setTimeout(() => {
            popUp.style.visibility = 'hidden'
        }, 4000)
    }

    const questions = document.querySelectorAll(".iRSmTf");
    questions.forEach(question => {
        const title = question.querySelector("label").innerText
        if (title.includes('Na escala de 1 a 10')) {
            const npsInput = question.querySelector("input")
            if (npsInput.value === '') {
                e.preventDefault()
                popUp.style.visibility = 'visible'
                popUp.querySelector("p").innerHTML = 'Nos dê uma nota de 0 a 10 para o atendimento.'
                setTimeout(() => {
                    popUp.style.visibility = 'hidden'
                }, 4000)
            }
        }
    })
})


const toggleBtn = document.querySelector(".dropdown-toggle");
const profileContent = document.querySelector('.profile-content-dropdown');

let isVisible = false;
toggleBtn.addEventListener('click', () => {
    isVisible = !isVisible;
    profileContent.style.display = isVisible ? 'block' : 'none';
})