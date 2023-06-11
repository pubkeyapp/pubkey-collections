import { expandTraitSummary } from '../helpers'
import { Collection } from '../types'

export const dripTheFaceless: Collection = {
  id: 'drip_the_faceless',
  compressed: true,
  name: 'The Faceless',
  image:
    'https://i6z5zem6ofbyazty7mmrhz4xohr6lynyrfufwklttgjuytivjgqq.arweave.net/R7PckZ5xQ4BmePsZE-eXcePl4biJaFspc5mTTE0VSaE?ext=gif',
  publisher: 'DRiP',
  marketplace: 'https://www.tensor.trade/trade/drip_the_faceless',
  accounts: ['WoMbiTtXKwUtf4wosoffv45khVF8yA2mPkinGosCFQ4'],
  comboGroups: [
    {
      name: `Collection Combos`,
      combos: [
        {
          id: 'mcdegens',
          name: 'McDegen DAO',
          links: {
            homepage: 'https://mcdegen.xyz/',
            twitter: 'https://twitter.com/McDegensDAO',
          },
          traits: [
            { key: 'Headwear', value: 'McDegens' },
            { key: 'Outfits', value: 'McDegens' },
          ],
        },
        {
          id: 'admiral',
          name: 'Admiral DAO',
          traits: [
            { key: 'Headwear', value: 'Admiral' },
            { key: 'Outfits', value: 'Admiral' },
          ],
        },
        {
          id: 'poncho-and-sombrero',
          name: 'Tequila Cartel DAO',
          traits: [
            { key: 'Headwear', value: 'Sombrero' },
            { key: 'Outfits', value: 'Poncho' },
          ],
        },
        {
          id: 'undead-and-skull',
          name: 'The Soulless DAO',
          traits: [
            { key: 'Hoods', value: 'Undead' },
            { key: 'Masks', value: 'Skull' },
          ],
        },
        {
          id: 'mummy-king',
          name: 'Mummy King',
          traits: [
            { key: 'Headwear', value: 'Crown' },
            { key: 'Outfits', value: 'Mummy' },
          ],
        },
        {
          id: 'Military',
          name: 'Military',
          traits: [
            { key: 'Headwear', value: 'Military' },
            { key: 'Outfits', value: 'Military' },
          ],
        },
        {
          id: 'men-in-black',
          name: 'Men in Black',
          traits: [
            { key: 'Headwear', value: 'UFO' },
            { key: 'Outfits', value: 'Blue Suir|Red Suit' },
          ],
        },
        {
          id: 'protagonist',
          name: 'Protagonist',
          traits: [
            { key: 'Headwear', value: 'Protagonist Headband' },
            { key: 'Outfits', value: 'Protagonist' },
          ],
        },
        {
          id: 'suit-and-fedora',
          name: 'Suit and Fedora',
          traits: [
            { key: 'Headwear', value: 'Fedora' },
            { key: 'Outfits', value: 'Blue Suir|Red Suit' },
          ],
        },
        {
          id: 'monster-hunter',
          name: 'Monster Hunter',
          traits: [
            { key: 'Headwear', value: 'Monster Hunter Cap' },
            { key: 'Outfits', value: 'Monster Hunter' },
          ],
        },
        {
          id: 'tourist',
          name: 'Tourist',
          traits: [
            { key: 'Headwear', value: 'Sun Hat' },
            { key: 'Outfits', value: 'Hawain Shirt' },
          ],
        },
        {
          id: 'howdy-and-explorer',
          name: 'Howdy and Explorer',
          traits: [
            { key: 'Headwear', value: 'Howdy' },
            { key: 'Outfits', value: 'Explorer' },
          ],
        },
      ],
    },
  ],
  traitGroups: ['Headwear', 'Hoods', 'Masks', 'Outfits'],
  traitStats: ['Backgrounds', 'Headwear', 'Hoods', 'Masks', 'Outfits', 'Rarity'],
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
