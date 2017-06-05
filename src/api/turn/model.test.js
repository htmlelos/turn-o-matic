import { Turn } from '.'

let turn

beforeEach(async () => {
  turn = await Turn.create({ date: 'test', customer: 'test', professional: 'test', category: 'test', comments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = turn.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(turn.id)
    expect(view.date).toBe(turn.date)
    expect(view.customer).toBe(turn.customer)
    expect(view.professional).toBe(turn.professional)
    expect(view.category).toBe(turn.category)
    expect(view.comments).toBe(turn.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = turn.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(turn.id)
    expect(view.date).toBe(turn.date)
    expect(view.customer).toBe(turn.customer)
    expect(view.professional).toBe(turn.professional)
    expect(view.category).toBe(turn.category)
    expect(view.comments).toBe(turn.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
