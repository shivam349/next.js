import { validateInList, validateAllInList } from './validate-in-list'

describe('validateInList', () => {
  test('Valid value in list', () => {
    expect(() =>
      validateInList('latin', ['latin', 'greek'], 'subset')
    ).not.toThrow()
  })

  test('Invalid value without font family', () => {
    expect(() =>
      validateInList('invalid', ['latin', 'greek'], 'subset')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unknown subset \`invalid\`.
      Available subsets: \`latin\`, \`greek\`"
    `)
  })

  test('Invalid value with font family', () => {
    expect(() =>
      validateInList('invalid', ['latin', 'greek'], 'subset', 'Inter')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unknown subset \`invalid\` for font \`Inter\`.
      Available subsets: \`latin\`, \`greek\`"
    `)
  })

  test('Weight validation', () => {
    expect(() =>
      validateInList('400', ['100', '400', '700'], 'weight', 'Roboto')
    ).not.toThrow()

    expect(() =>
      validateInList('500', ['100', '400', '700'], 'weight', 'Roboto')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unknown weight \`500\` for font \`Roboto\`.
      Available weights: \`100\`, \`400\`, \`700\`"
    `)
  })

  test('Style validation', () => {
    expect(() =>
      validateInList('italic', ['normal', 'italic'], 'style', 'Arial')
    ).not.toThrow()

    expect(() =>
      validateInList('oblique', ['normal', 'italic'], 'style', 'Arial')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unknown style \`oblique\` for font \`Arial\`.
      Available styles: \`normal\`, \`italic\`"
    `)
  })
})

describe('validateAllInList', () => {
  test('All valid values in list', () => {
    expect(() =>
      validateAllInList(['latin', 'greek'], ['latin', 'greek', 'cyrillic'], 'subset', 'Inter')
    ).not.toThrow()
  })

  test('One invalid value in list', () => {
    expect(() =>
      validateAllInList(['latin', 'invalid'], ['latin', 'greek'], 'subset', 'Inter')
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unknown subset \`invalid\` for font \`Inter\`.
      Available subsets: \`latin\`, \`greek\`"
    `)
  })

  test('Empty array should not throw', () => {
    expect(() =>
      validateAllInList([], ['latin', 'greek'], 'subset', 'Inter')
    ).not.toThrow()
  })
})
