import { expandTraitSummary } from '../helpers'
import { Collection, CollectionCombo } from '../types'

function createDrop(drop: string, rarity?: string): CollectionCombo {
  return {
    id: 'drop-' + drop + (rarity ? '-' + rarity : ''),
    group: true,
    traits: [{ key: 'drop', value: drop }, ...(rarity ? [{ key: 'rarity', value: rarity }] : [])],
  }
}

export const dripDegenPoetSeasonOne: Collection = {
  id: 'drip_degenpoet',
  compressed: true,
  name: 'DegenPoet Season 1',
  image:
    'https://frzovltfodfxl2dqnxiklane2vmsbyl3yh6tnkl3mudmpf4yvkbq.arweave.net/LHLqrmVwy3XocG3QpYGk1Vkg4XvB_Tape2UGx5eYqoM?ext=jpg',
  publisher: 'DRiP',
  accounts: ['DGPTxgKaBPJv3Ng7dc9AFDpX6E7kgUMZEgyTm3VGWPW6'],
  comboGroups: [
    { name: 'Drop 1', combos: [createDrop('1')] },
    { name: 'Drop 2', combos: [createDrop('2', 'common'), createDrop('2', 'rare'), createDrop('2', 'legendary')] },
    { name: 'Drop 3', combos: [createDrop('3', 'common'), createDrop('3', 'rare'), createDrop('3', 'legendary')] },
    { name: 'Drop 4', combos: [createDrop('4', 'common'), createDrop('4', 'rare'), createDrop('4', 'legendary')] },
    { name: 'Drop 5', combos: [createDrop('5', 'common'), createDrop('5', 'rare'), createDrop('5', 'legendary')] },
    { name: 'Drop 6', combos: [createDrop('6', 'common'), createDrop('6', 'rare'), createDrop('6', 'legendary')] },
    { name: 'Drop 7', combos: [createDrop('7', 'common'), createDrop('7', 'rare'), createDrop('7', 'legendary')] },
    { name: 'Drop 8', combos: [createDrop('8', 'common'), createDrop('8', 'rare'), createDrop('8', 'legendary')] },
  ],
  traitGroups: ['drop', 'rarity'],
  traitStats: ['created', 'dimensions', 'drop', 'filetype', 'orientation', 'rarity'],
  traits: expandTraitSummary({
    created: [
      '2023-05-22',
      '2023-05-15',
      '2023-05-08',
      '2023-05-01',
      '2023-04-24',
      '2023-04-17',
      '2023-05-29',
      '2023-06-05',
    ],
    dimensions: [
      '1600 x 2000',
      '928 x 928',
      '4000 x 3000',
      '1098 x 1098',
      '4000 x 4000',
      '2000 x 1500',
      '3000 x 4000',
      '3500 x 2489',
      '4500 × 6000',
      '6000 x 4500',
      '2000 x 2000',
      '1200 x 675',
      '1700 x 1700',
      '4500 X 6000',
      '1200 x 1200',
      '1776 × 1776',
      '3232 x 4000',
    ],
    drop: ['1', '2', '3', '4', '5', '6', '7', '8'],
    filetype: ['png', 'jpeg', 'mp4', 'gif', 'jpg'],
    orientation: ['portrait', 'landscape', 'square'],
    rarity: ['common', 'rare', 'legendary'],
  }),
}
