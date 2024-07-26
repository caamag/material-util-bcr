function isMobileScreen () {
    return window.innerWidth < 600;
}

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('[role="main"]');
    if (!isMobileScreen && window.location.href === 'https://solicita.rivierasl.com.br/hc/pt-br') {
        main.style.height = '80vh'
        main.style.backgroundColor = 'rgb(9, 112, 181)'
    } else {
        main.style.minHeight = '60vh'
        main.style.backgroundColor = 'rgb(9, 112, 181)'
    }

    if (isMobileScreen && window.location.href === 'https://solicita.rivierasl.com.br/hc/pt-br') {
        main.style.height = '60vh'
        main.style.backgroundColor = 'rgb(9, 112, 181)'
    }
})

//Removendo seletor de formulário.
if (window.location.href.startsWith("https://solicita.rivierasl.com.br/hc/pt-br/requests/")) {
    const formSelect = document.querySelector(".request_ticket_form_id")
    .style.display = 'none'
}