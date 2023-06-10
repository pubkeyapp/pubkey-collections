import { CollectionTrait, CollectionTraitMap } from '../types'
import { createTraitMap } from './create-trait-map'
import { expandTraitSummary } from './expand-trait-summary'

describe('create-trait-map', () => {
  it('should create a trait map', () => {
    // Arrange
    const collectionTraits: CollectionTraitMap = expandTraitSummary({
      Background: ['Yellow', 'Blue', 'Red'],
      Eyes: ['Brown', 'Blue', 'Green'],
    })
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
    const result = createTraitMap(collectionTraits, traits)

    // Assert
    expect(result).toEqual({
      Background: [
        { count: 2, key: 'Background', value: 'Blue' },
        { count: 1, key: 'Background', value: 'Red' },
        { key: 'Background', value: 'Yellow' },
      ],
      Eyes: [
        { count: 4, key: 'Eyes', value: 'Green' },
        { count: 1, key: 'Eyes', value: 'Blue' },
        { key: 'Eyes', value: 'Brown' },
      ],
    })
  })
})
