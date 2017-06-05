import { Professional } from '.'

let professional

beforeEach(async () => {
  professional = await Professional.create({ name: 'test', categories: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = professional.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(professional.id)
    expect(view.name).toBe(professional.name)
    expect(view.categories).toBe(professional.categories)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = professional.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(professional.id)
    expect(view.name).toBe(professional.name)
    expect(view.categories).toBe(professional.categories)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
