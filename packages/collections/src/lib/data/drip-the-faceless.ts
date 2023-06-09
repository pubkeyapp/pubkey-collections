import { expandTraitSummary } from '../helpers'
import { Collection } from '../types'

export const dripTheFaceless: Collection = {
  id: 'drip_the_faceless',
  compressed: true,
  name: 'The Faceless',
  image:
    'https://i6z5zem6ofbyazty7mmrhz4xohr6lynyrfufwklttgjuytivjgqq.arweave.net/R7PckZ5xQ4BmePsZE-eXcePl4biJaFspc5mTTE0VSaE?ext=gif',
  publisher: 'DRiP',
  accounts: ['WoMbiTtXKwUtf4wosoffv45khVF8yA2mPkinGosCFQ4'],
  combos: [
    {
      name: 'McDegens',
      traits: [
        { key: 'Headwear', value: 'McDegens' },
        { key: 'Outfits', value: 'McDegens' },
      ],
    },
    {
      name: 'Admiral',
      traits: [
        { key: 'Headwear', value: 'Admiral' },
        { key: 'Outfits', value: 'Admiral' },
      ],
    },
    {
      name: 'Military',
      traits: [
        { key: 'Headwear', value: 'Military' },
        { key: 'Outfits', value: 'Military' },
      ],
    },
    {
      name: 'Monster Hunter',
      traits: [
        { key: 'Headwear', value: 'Monster Hunter Cap' },
        { key: 'Outfits', value: 'Monster Hunter' },
      ],
    },
    {
      name: 'Poncho and Sombrero',
      traits: [
        { key: 'Headwear', value: 'Sombrero' },
        { key: 'Outfits', value: 'Poncho' },
      ],
    },
    {
      name: 'Protagonist',
      traits: [
        { key: 'Headwear', value: 'Protagonist Headband' },
        { key: 'Outfits', value: 'Protagonist' },
      ],
    },
    {
      name: 'Hawain Shirt and Sun Hat',
      traits: [
        { key: 'Headwear', value: 'Sun Hat' },
        { key: 'Outfits', value: 'Hawain Shirt' },
      ],
    },
  ],
  traitStats: ['Background', 'Headwear', 'Hoods', 'Masks', 'Outfits', 'Rarity'],
  traits: expandTraitSummary({
    Backgrounds: [
      'Solana Gradient',
      'Sunset Orange',
      'Riley Yellow',
      'Space Gray',
      'Pastel Red',
      'Faded Purple',
      'Piggy Pink',
      'Forest Green',
      'Paper',
      'Dessert',
      'Mint',
      'Clouded',
      'Purple',
      'Aquamarine',
    ],
    Headwear: [
      'Big Brain Cap',
      'Crown',
      'UFO',
      'Admiral',
      'Purple Cap',
      'Blue Cap',
      'Monster Hunter Cap',
      'Top Hat',
      'Sun Hat',
      'Green Cap',
      'Protagonist Headband',
      'McDegens',
      'Military',
      'Pirate',
      'Sombrero',
      'Fedora',
      'Howdy',
      'Arrow',
    ],
    Hoods: ['Gold', 'Undead', 'Black', 'Mint', 'Purple', 'Orange', 'Red', 'Turquoise', 'Blue', 'White', 'Brown'],
    Masks: ['Gold', 'Blue', 'Orange', 'Wood', 'Pink', 'Green', 'White', 'Clown', 'Skull', 'Jason', 'Hacker'],
    Outfits: [
      'Hawain Shirt',
      'Protagonist',
      'Monster Hunter',
      'Red Suit',
      'Blue Suir',
      'McDegens',
      'Prisoner',
      'Explorer',
      'Superhero',
      'Military',
      'Poncho',
      'Mummy',
      'Police',
      'Admiral',
      'Overalls',
    ],
    Rarity: ['Legendary', 'Rare', 'Common'],
  }),
}
