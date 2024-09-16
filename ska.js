let time = 4000;
let currentImage = 0;
const images = document.querySelectorAll('.banner-container img');
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
const allCategories = document.querySelectorAll('.categories-container a');
showMoreBtn.addEventListener('click', () => {
    shoCategories = !shoCategories;

    allCategories.forEach((categorie, index) => {
        if (index > 7 && !shoCategories) {
            categorie.style.visibility = 'hidden'
        } else {
            categorie.style.visibility = 'visible'
        }
    })

    showMoreBtn.innerHTML = !shoCategories ? 'Exibir todas as categorias' : 'Exibir menos'
})

allCategories.forEach((categorie, index) => {
    if (index > 7) {
        categorie.style.visibility = 'hidden'
    } else {
        categorie.style.visibility = 'visible'
    }
})