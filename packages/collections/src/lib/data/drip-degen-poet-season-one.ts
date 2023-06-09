import { expandTraitSummary } from '../helpers'
import { Collection } from '../types'

export const dripDegenPoetSeasonOne: Collection = {
  id: 'drip_degenpoet',
  compressed: true,
  name: 'DegenPoet Season 1',
  image:
    'https://frzovltfodfxl2dqnxiklane2vmsbyl3yh6tnkl3mudmpf4yvkbq.arweave.net/LHLqrmVwy3XocG3QpYGk1Vkg4XvB_Tape2UGx5eYqoM?ext=jpg',
  publisher: 'DRiP',
  accounts: ['DGPTxgKaBPJv3Ng7dc9AFDpX6E7kgUMZEgyTm3VGWPW6'],
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
