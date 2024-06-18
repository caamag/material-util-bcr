document.querySelectorAll('.website-links li').forEach(item => {
    const headerSections = document.querySelectorAll('.hover-content');

    item.addEventListener('mouseover', () => {
        headerSections.forEach(section => {
            if (section.classList.contains(item.classList[0])) {
                section.classList.add('show-hover-content')
            }else{
                section.classList.remove('show-hover-content')
            }
        })
    })

    item.addEventListener('mouseout', () => {
        headerSections.forEach(section => {
            section.classList.remove('show-hover-content')
        })
    })

    headerSections.forEach(section => {
        section.addEventListener('mouseover', () => {
            section.classList.add('show-hover-content')
        })
        section.addEventListener('mouseout', () => {
            section.classList.remove('show-hover-content')
        })
    })
})

if (window.location.href !== 'https://obrtecnologia.zendesk.com/hc/pt-br') {
    const websiteLinks = document.querySelector('.website-links ul')
    websiteLinks.style.display = 'none'
}