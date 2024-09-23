let time = 4000;
let currentImage = 0;
const images = document.querySelectorAll('.banner-container a');
let max = images.length;

const nextImage = () => {
    images[currentImage].classList.remove('selected');
    currentImage++;

    if (currentImage >= max)
        currentImage = 0;

    images[currentImage].classList.add('selected');
}

const start = () => {
    setInterval(() => {
        //change image
        nextImage()
    }, time)
}

document.addEventListener('DOMContentLoaded', () => {
    start()
})


let shoCategories = false;
const showMoreBtn = document.querySelector('.show-more-btn');
const allCategories = document.querySelectorAll('.categorie-card');
showMoreBtn.addEventListener('click', () => {
    shoCategories = !shoCategories;

    allCategories.forEach((categorie, index) => {
        if (index > 7 && !shoCategories) {
            categorie.style.opacity = '0'
            categorie.style.height = '0px'
            categorie.style.diplay = 'none'
        } else {
            categorie.style.opacity = '1'
            categorie.style.height = '120px'
            categorie.style.diplay = 'flex'
        }
    })

    showMoreBtn.innerHTML = !shoCategories ? 'Exibir todas as categorias' : 'Exibir menos'
})

allCategories.forEach((categorie, index) => {
    if (index > 7) {
        categorie.style.opacity = '0'
        categorie.style.height = '0px'
    } else {
        categorie.style.opacity = '1'
        categorie.style.height = '120px'
    }
})

//verify if is end user
const isAdmin = (role) => {
    console.log(role);
}

document.addEventListener('DOMContentLoaded', () => {
    const role = window.HelpCenter.user.role;
    isAdmin(role)
})
