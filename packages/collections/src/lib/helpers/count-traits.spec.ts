import { CollectionTrait } from '../types'
import { countTraits } from './count-traits'

describe('count-traits', () => {
  it('should count traits', () => {
    // Arrange
    const traits: CollectionTrait[] = [
      { key: 'Background', value: 'Red', count: 10 },
      { key: 'Eyes', value: 'Blue', count: 30 },
      { key: 'Eyes', value: 'Green' },
      { key: 'Background', value: 'Blue', count: 30 },
      { key: 'Eyes', value: 'Green' },
      { key: 'Background', value: 'Blue', count: 100 },
      { key: 'Eyes', value: 'Green' },
      { key: 'Eyes', value: 'Green' },
    ]

    // Act
    const result = countTraits(traits)

    // Assert
    expect(result).toEqual([
      { key: 'Background', value: 'Red', count: 1 },
      { key: 'Eyes', value: 'Blue', count: 1 },
      { key: 'Eyes', value: 'Green', count: 4 },
      { key: 'Background', value: 'Blue', count: 2 },
    ])
  })
})
