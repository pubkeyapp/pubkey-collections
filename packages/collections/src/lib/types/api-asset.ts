export interface ApiAsset {
  id: string
  content: {
    metadata: {
      name: string
      description: string
      attributes: Array<{
        trait_type: string
        value: string
      }>
    }
    files: {
      uri: string
      cdn_uri: string
      mime: string
    }
  }
  grouping: Array<{
    group_type: string
    group_value: string
  }>
}
