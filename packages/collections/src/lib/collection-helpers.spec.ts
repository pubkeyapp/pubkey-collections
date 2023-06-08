import { expandTraits } from './collection-helpers'

describe('collections', () => {
  it('should expand traits', () => {
    // Arrange
    const traits = {
      Background: ['Red', 'Blue'],
      Eyes: ['Green'],
      Hair: [],
    }

    // Act
    const expanded = expandTraits(traits)

    // Assert
    expect(expanded).toMatchSnapshot()
  })
})
