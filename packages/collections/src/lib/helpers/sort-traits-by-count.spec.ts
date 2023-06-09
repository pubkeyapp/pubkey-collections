import { CollectionTrait } from '../types'
import { sortTraitsByCount } from './sort-traits-by-count'

describe('sort-traits-by-count', () => {
  it('should sort traits', () => {
    // Arrange
    const traits: CollectionTrait[] = [
      { key: 'Background', value: 'Red', count: 10 },
      { key: 'Background', value: 'Blue', count: 100 },
      { key: 'Eyes', value: 'Blue', count: 30 },
      { key: 'Background', value: 'Blue', count: 30 },
      { key: 'Eyes', value: 'Green', count: 2 },
    ]
    // Act
    const result = sortTraitsByCount(traits)

    // Assert
    expect(result).toEqual([
      { key: 'Background', value: 'Blue', count: 100 },
      { key: 'Eyes', value: 'Blue', count: 30 },
      { key: 'Background', value: 'Blue', count: 30 },
      { key: 'Background', value: 'Red', count: 10 },
      { key: 'Eyes', value: 'Green', count: 2 },
    ])
  })
})
