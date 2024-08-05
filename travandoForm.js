document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[data-form][data-form-type="request"]');
    const firstForm = document.querySelector('#request_custom_fields_30897134051603');
    const popUp = document.querySelector(".csat-popup");

    if (form) {
        const submitBtns = form.querySelectorAll('[type="submit"]')
        submitBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault()

                const npsField = document.querySelector('#request_custom_fields_30588810743571');
                if (npsField.value === '') {
                    e.preventDefault()
                    popUp.querySelector('p').innerHTML = 'Dê uma nota de 0 a 10.'
                    popUp.style.visibility = 'visible'
                    setTimeout(() => {
                        popUp.style.visibility = 'hidden'
                    }, 4000)
                    return
                } 

                if (firstForm.value === '') {
                    e.preventDefault()
                    popUp.style.visibility = 'visible'
                    popUp.querySelector('p').innerHTML = 'Nos diga se o problema foi ou não resolvido.'
                    setTimeout(() => {
                        popUp.style.visibility = 'hidden'
                    }, 4000)
                    return
                }

                setTimeout(() => {
                    window.location.replace('https://www.oppo.com/br/')
                }, 200)
            })  
        })
    }
})