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

