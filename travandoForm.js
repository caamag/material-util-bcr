const submitBtnOppo = document.querySelector(".oppo-submit-btn")
submitBtnOppo.addEventListener("click", (e) => {
    const popUp = document.querySelector(".csat-popup")
    e.preventDefault()

    if (solvedInput.value === '') {
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