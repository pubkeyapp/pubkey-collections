import { expandTraitSummary } from '../helpers'
import { Collection, CollectionCombo, CollectionTrait } from '../types'

enum TraitType {
  Backgrounds = 'Backgrounds',
  Headwear = 'Headwear',
  Hoods = 'Hoods',
  Masks = 'Masks',
  Outfits = 'Outfits',
  Rarity = 'Rarity',
}

type Headwear =
  | 'Big Brain Cap'
  | 'Crown'
  | 'UFO'
  | 'Admiral'
  | 'Purple Cap'
  | 'Blue Cap'
  | 'Monster Hunter Cap'
  | 'Top Hat'
  | 'Sun Hat'
  | 'Green Cap'
  | 'Protagonist Headband'
  | 'McDegens'
  | 'Military'
  | 'Pirate'
  | 'Sombrero'
  | 'Fedora'
  | 'Howdy'
  | 'Arrow'
type Hoods =
  | 'Gold'
  | 'Undead'
  | 'Black'
  | 'Mint'
  | 'Purple'
  | 'Orange'
  | 'Red'
  | 'Turquoise'
  | 'Blue'
  | 'White'
  | 'Brown'
type Masks = 'Gold' | 'Blue' | 'Orange' | 'Wood' | 'Pink' | 'Green' | 'White' | 'Clown' | 'Skull' | 'Jason' | 'Hacker'
type Outfits =
  | 'Hawain Shirt'
  | 'Protagonist'
  | 'Monster Hunter'
  | 'Red Suit'
  | 'Blue Suir'
  | 'McDegens'
  | 'Prisoner'
  | 'Explorer'
  | 'Superhero'
  | 'Military'
  | 'Poncho'
  | 'Mummy'
  | 'Police'
  | 'Admiral'
  | 'Overalls'
type Rarity = 'Legendary' | 'Rare' | 'Common'
type Backgrounds =
  | 'Solana Gradient'
  | 'Sunset Orange'
  | 'Riley Yellow'
  | 'Space Gray'
  | 'Pastel Red'
  | 'Faded Purple'
  | 'Piggy Pink'
  | 'Forest Green'
  | 'Paper'
  | 'Dessert'
  | 'Mint'
  | 'Clouded'
  | 'Purple'
  | 'Aquamarine'

type Trait = {
  key: TraitType
  value: string
}

function Backgrounds(value: Backgrounds): Trait {
  return { key: TraitType.Backgrounds, value }
}
function Headwear(value: Headwear): Trait {
  return { key: TraitType.Headwear, value }
}
function HeadwearDouble(value1: Headwear, value2: Headwear): Trait {
  return { key: TraitType.Headwear, value: `${value1}|${value2}` }
}
function Hoods(value: Hoods): Trait {
  return { key: TraitType.Hoods, value }
}
function Masks(value: Masks): Trait {
  return { key: TraitType.Masks, value }
}
function Outfits(value: Outfits): Trait {
  return { key: TraitType.Outfits, value }
}
function OutfitsDouble(value1: Outfits, value2: Outfits): Trait {
  return { key: TraitType.Outfits, value: `${value1}|${value2}` }
}

function createCombo(name: string, traits: CollectionTrait[]): CollectionCombo {
  return {
    id: name.toLowerCase().replace(/\s/g, '-'),
    name,
    traits,
  }
}

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
      name: `McDegens DAO`,
      combos: [
        {
          ...createCombo('McDegens DAO', [Headwear('McDegens'), Outfits('McDegens')]),
          links: { homepage: 'https://mcdegen.xyz/', twitter: 'https://twitter.com/McDegensDAO' },
        },
        createCombo('McDegens Trainee', [Headwear('McDegens'), Outfits('Hawain Shirt')]),
        createCombo('McDegens CEO', [Headwear('McDegens'), Outfits('Red Suit')]),
      ],
    },
    {
      name: `Other Faceless Combos`,
      combos: [
        createCombo('Admiral DAO', [Headwear('Admiral'), Outfits('Admiral')]),
        createCombo('Tequila Cartel DAO', [Headwear('Sombrero'), Outfits('Poncho')]),
        createCombo('The Soulless DAO', [Hoods('Undead'), Masks('Skull')]),
        { ...createCombo('Minifig', [Hoods('Gold'), Masks('Gold')]), sortKey: 'Outfits' },
        createCombo('Mafia', [Headwear('Fedora'), OutfitsDouble('Blue Suir', 'Red Suit')]),
        createCombo('NYPD', [Headwear('Blue Cap'), Outfits('Police')]),
        createCombo('Prison Gang', [Headwear('Fedora'), Outfits('Prisoner')]),
        createCombo('Tomb Raider', [Headwear('Howdy'), Outfits('Explorer')]),
        createCombo('Mummy King', [Headwear('Crown'), Outfits('Mummy')]),
        createCombo('Last Crusade', [Headwear('Arrow'), Outfits('Explorer')]),
        createCombo('Military', [Headwear('Military'), Outfits('Military')]),
        createCombo('Gangs of New York', [HeadwearDouble('Top Hat', 'Fedora'), Outfits('Overalls')]),
        createCombo('Gentleman', [Headwear('Top Hat'), OutfitsDouble('Blue Suir', 'Red Suit')]),
        createCombo('Vendetta', [Headwear('Pirate'), Masks('Hacker')]),
        createCombo('Men in Black', [Headwear('UFO'), OutfitsDouble('Blue Suir', 'Red Suit')]),
        createCombo('Everyday Hero', [Headwear('Blue Cap'), Outfits('Superhero')]),
        createCombo('Cowboy', [Headwear('Howdy'), Outfits('Overalls')]),
        createCombo('Farmer', [HeadwearDouble('Sun Hat', 'Sombrero'), Outfits('Overalls')]),
        createCombo('Pioneer', [Headwear('Arrow'), Outfits('Overalls')]),
        createCombo('Bandito', [Headwear('Sombrero'), Outfits('Military')]),
        createCombo('Roughneck', [Headwear('Admiral'), Outfits('Overalls')]),
        createCombo('Swash Buckler', [Headwear('Pirate'), Outfits('Mummy')]),
        createCombo('Prince', [Headwear('Crown'), Outfits('Admiral')]),
        createCombo('King', [Headwear('Crown'), Outfits('McDegens')]),
        createCombo('Hawaiian King', [Headwear('Crown'), Outfits('Hawain Shirt')]),
        createCombo('Tourist', [Headwear('Sun Hat'), Outfits('Hawain Shirt')]),
        createCombo('Fiesta', [Headwear('Sombrero'), Outfits('Hawain Shirt')]),
        createCombo('Only Possible On Solana', [Headwear('Big Brain Cap'), Backgrounds('Solana Gradient')]),
        createCombo('Protagonist', [Headwear('Protagonist Headband'), Outfits('Protagonist')]),
        createCombo('Monster Hunter', [Headwear('Monster Hunter Cap'), Outfits('Monster Hunter')]),
        createCombo('Zombie', [Hoods('Undead'), Masks('Green')]),
        { ...createCombo('Monke', [Hoods('Black'), Masks('Wood')]), sortKey: 'Outfits' },
        createCombo('Ape', [Hoods('Black'), Masks('Skull')]),
        { ...createCombo('Boogle', [Hoods('Black'), Masks('White')]), sortKey: 'Outfits' },
        createCombo('Mountie', [Headwear('Howdy'), Outfits('McDegens')]),
        createCombo('Wombo Combo', [Headwear('Fedora'), Outfits('Hawain Shirt')]),
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
