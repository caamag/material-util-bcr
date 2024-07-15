document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[data-form][data-form-type="request"]');

    if (form) {
        const submitBtns = form.querySelectorAll('[type="submit"]')
        submitBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault()
                
                const npsField = document.querySelector('#request_custom_fields_30588810743571');
                if (npsField.value === '') {
                    alert('Nos dê uma nota de 0 a 10 para que o formulário seja enviado!')
                    e.preventDefault()
                    return;
                } 

                form.submit();
            })  
        })
    }
})

if (/https:\/\/oppo-do-brasil\.zendesk\.com\/hc\/pt-br\/requests\/\d+/.test(window.location.href)) {
    window.location.href = 'https://centraldocliente.lg.com.br/hc/pt-br'
}