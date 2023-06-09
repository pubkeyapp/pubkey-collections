import { expandTraitSummary } from './expand-trait-summary'

describe('expand-trait-summary', () => {
  it('should expand traits', () => {
    // Arrange
    const traits = {
      Background: ['Red', 'Blue'],
      Eyes: ['Green'],
      Hair: [],
    }

    // Act
    const expanded = expandTraitSummary(traits)

    // Assert
    expect(expanded).toMatchSnapshot()
  })
})
