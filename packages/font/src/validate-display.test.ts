import { validateDisplay } from './validate-display'

describe('validateDisplay', () => {
  test('Valid display values', () => {
    expect(() => validateDisplay('auto')).not.toThrow()
    expect(() => validateDisplay('block')).not.toThrow()
    expect(() => validateDisplay('swap')).not.toThrow()
    expect(() => validateDisplay('fallback')).not.toThrow()
    expect(() => validateDisplay('optional')).not.toThrow()
  })

  test('Invalid display value without font family', () => {
    expect(() => validateDisplay('invalid')).toThrowErrorMatchingInlineSnapshot(`
      "Invalid display value \`invalid\`.
      Available display values: \`auto\`, \`block\`, \`swap\`, \`fallback\`, \`optional\`"
    `)
  })

  test('Invalid display value with font family', () => {
    expect(() =>
      validateDisplay('invalid', 'Inter')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Invalid display value \`invalid\` for font \`Inter\`.
      Available display values: \`auto\`, \`block\`, \`swap\`, \`fallback\`, \`optional\`"
    `)
  })
})
