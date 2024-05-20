
const email = 'excelenciaoperacional@gesto.com.br';
const pass = 'D@saEXP2024';
const authString = `${email}:${pass}`
const access = Buffer.from(authString).toString('base64')

module.exports = { access }