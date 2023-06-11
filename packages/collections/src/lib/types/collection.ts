import { CollectionComboGroup } from './collection-combo-group'
import { CollectionTraitMap } from './collection-trait-map'

export interface Collection {
  id: string
  compressed: boolean
  name: string
  image: string
  publisher: string
  marketplace?: string
  accounts: string[]
  traits: CollectionTraitMap
  traitGroups: string[]
  traitStats: string[]
  comboGroups?: CollectionComboGroup[]
}

export interface CollectionWallet {
  picture?: string
  address?: string
}
