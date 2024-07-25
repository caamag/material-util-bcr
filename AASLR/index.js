
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('[role="main"]');
    if (window.location.href === 'https://solicita.rivierasl.com.br/hc/pt-br') {
        main.style.height = '60vh'
        main.style.backgroundColor = 'rgb(9, 112, 181)'
    } else {
        main.style.minHeight = '80vh'
    }
})