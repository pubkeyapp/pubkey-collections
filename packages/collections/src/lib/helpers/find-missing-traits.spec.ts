import { CollectionTraitMap } from '../types'
import { findMissingTraits } from './find-missing-traits'

describe('find-missing-traits', () => {
  it('should find missing traits', () => {
    // Arrange
    const traits: CollectionTraitMap = {
      Background: [
        { key: 'Background', value: 'Red' },
        { key: 'Background', value: 'Blue' },
      ],
      Eyes: [{ key: 'Eyes', value: 'Green' }],
      Hair: [],
    }
    const owned: CollectionTraitMap = {
      Background: [{ key: 'Background', value: 'Red' }],
      Eyes: [{ key: 'Eyes', value: 'Green' }],
      Hair: [],
    }

    // Act
    const missing = findMissingTraits(traits, owned)

    // Assert
    expect(missing).toMatchSnapshot()
  })
})
