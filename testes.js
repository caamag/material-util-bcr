//formulário para tickets não atendidos
const campo1 = document.querySelector('.request_custom_fields_24962896919323');
const checkBox1 = document.querySelector('#request_custom_fields_24962896919323')
checkBox1.classList.add('checkbox')
const button1 = document.createElement('button');
button1.classList.add('btn-new-ticket-form')
button1.innerHTML = campo1.querySelector('label').innerText;
campo1.appendChild(button1)

//img
const img1 = document.createElement('img');
img1.src = 'https://theme.zdassets.com/theme_assets/15904219/f89a8313fd36509ef929c8b2f7c6bdf936321ec0.png'
button1.firstChild(img1)

button1.addEventListener('click', (e) => {
    e.preventDefault()
    if (checkBox1.checked) {
        checkBox1.checked = false
        button1.classList.remove('btn-checked')
        button1.innerHTML = 'Marcar'
    } else {
        checkBox1.checked = true
        button1.classList.add('btn-checked')
        button1.innerHTML = 'Desmarcar'
    }
})
