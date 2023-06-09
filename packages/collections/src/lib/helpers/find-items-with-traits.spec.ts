import { CollectionItem, CollectionTrait } from '../types'
import { findItemsWithTraits } from './find-items-with-traits'

describe('find-items-with-traits', () => {
  it('should find items with traits', () => {
    // Arrange
    const items: CollectionItem[] = [
      {
        id: 'item-1',
        name: 'Item 1',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'Green' },
        ],
        collectionId: 'items',
        image: 'image-1',
      },
      {
        id: 'item-2',
        name: 'Item 2',
        traits: [
          { key: 'Background', value: 'Blue' },
          { key: 'Foreground', value: 'Yellow' },
        ],
        collectionId: 'items',
        image: 'image-2',
      },
      {
        id: 'item-3',
        name: 'Item 3',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'White' },
          { key: 'Shape', value: 'Square' },
        ],
        collectionId: 'items',
        image: 'image-3',
      },
      {
        id: 'item-4',
        name: 'Item 4',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'White' },
          { key: 'Shape', value: 'Circle' },
        ],
        collectionId: 'items',
        image: 'image-4',
      },
    ]
    const traits: CollectionTrait[] = [
      { key: 'Background', value: 'Red' },
      { key: 'Foreground', value: 'White' },
    ]

    // Act
    const result = findItemsWithTraits(items, traits)

    // Assert
    expect(result).toMatchSnapshot()
  })
})
