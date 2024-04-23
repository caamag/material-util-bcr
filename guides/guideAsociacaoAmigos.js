
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.style.backgroundColor = 'transparent';
    card.style.border = 'none';

    card.addEventListener('mouseover', () => {
        card.style.backgroundColor = 'rgb(230, 230, 230, 0.2)';
        card.style.marginRight = '20px'
    })

    card.addEventListener('mouseout', () => {
        card.style.backgroundColor = 'rgb(230, 230, 230, 0)';
        card.style.marginRight = '0px'
    })
})