
const { getDomain } = require('./app')

test('return email domain', () => {
    expect(getDomain('caiolopesfv@gmail.com')).toBe('gmail.com')
})