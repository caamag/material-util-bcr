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

//verify if is end user
const isAdmin = (role) => {
    console.log(role);
}

document.addEventListener('DOMContentLoaded', () => {
    const role = window.HelpCenter.user.role;
    isAdmin(role)
})