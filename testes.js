const deleteItem = (url, element) => {
    const currentUrl = window.location.href
    if (currentUrl !== url) {
        element.style.display = 'none'
    }
}

const iconHeader = document.querySelector('.logo-header')
deleteItem('https://solicita.rivierasl.com.br/hc/pt-br', iconHeader)
