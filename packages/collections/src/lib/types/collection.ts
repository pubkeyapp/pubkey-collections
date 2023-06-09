import { CollectionCombo } from './collection-combo'
import { CollectionTraitMap } from './collection-trait-map'

export interface Collection {
  id: string
  compressed: boolean
  name: string
  image: string
  publisher: string
  accounts: string[]
  traits: CollectionTraitMap
  combos?: CollectionCombo[]
}
