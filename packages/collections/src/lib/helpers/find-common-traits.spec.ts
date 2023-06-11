import { CollectionCombo, CollectionItem, CollectionTrait } from '../types'
import { findCommonTraits } from './find-common-traits'

describe('find-common-traits', () => {
  it('should find common traits', () => {
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
      },
      {
        id: 'item-2',
        name: 'Item 2',
        traits: [
          { key: 'Background', value: 'Blue' },
          { key: 'Foreground', value: 'Yellow' },
        ],
        collectionId: 'items',
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
      },
      {
        id: 'item-5',
        name: 'Item 5',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'White' },
          { key: 'Shape', value: 'Triangle' },
        ],
        collectionId: 'items',
      },
      {
        id: 'item-6',
        name: 'Item 6',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'White' },
          { key: 'Shape', value: 'Oval' },
          { key: 'Border', value: 'Black' },
        ],
        collectionId: 'items',
      },
      {
        id: 'item-7',
        name: 'Item 7',
        traits: [
          { key: 'Background', value: 'Red' },
          { key: 'Foreground', value: 'White' },
          { key: 'Shape', value: 'Oval' },
          { key: 'Border', value: 'Black' },
        ],
        collectionId: 'items',
      },
    ]
    const keys: string[] = ['Background', 'Foreground', 'Shape', 'Border']

    // Act
    const result = findCommonTraits(items, keys)

    // Assert
    expect(result).toMatchSnapshot()
  })

  it('should work with another example', () => {
    // Arrange
    const items: CollectionItem[] = [
      {
        id: 'id1',
        name: '1',
        collectionId: 'c1',
        traits: [
          { key: 'a', value: '1' },
          { key: 'b', value: '1' },
          { key: 'c', value: '1' },
          { key: 'd', value: 'X' },
        ],
      },
      {
        id: 'id2',
        name: '2',
        collectionId: 'c1',
        traits: [
          { key: 'a', value: '1' },
          { key: 'b', value: '1' },
          { key: 'c', value: '2' },
          { key: 'd', value: 'X' },
        ],
      },
      {
        id: 'id3',
        name: '3',
        collectionId: 'c1',
        traits: [
          { key: 'a', value: '1' },
          { key: 'b', value: '2' },
          { key: 'c', value: '3' },
          { key: 'd', value: 'X' },
        ],
      },
      {
        id: 'id4',
        name: '4',
        collectionId: 'c1',
        traits: [
          { key: 'a', value: '1' },
          { key: 'b', value: '2' },
          { key: 'c', value: '4' },
          { key: 'd', value: 'X' },
        ],
      },
    ]
    // The keys we want to find common traits for
    const keys: string[] = ['a', 'b', 'c']

    // Act
    const result: CollectionCombo[] = findCommonTraits(items, keys)

    // Assert
    expect(result).toMatchSnapshot()
  })
})
