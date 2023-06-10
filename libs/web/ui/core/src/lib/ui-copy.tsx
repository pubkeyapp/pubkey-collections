import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react'

export function UiCopy({ text, tooltip }: { text: string; tooltip?: string }) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : tooltip ?? 'Copy'} withArrow position="top">
          <ActionIcon size="sm" color={copied ? 'green' : 'brand'} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}

export function UiExplorerIcon({ path }: { path: string }) {
  return (
    <Tooltip label="Open in Explorer" withArrow position="top">
      <ActionIcon size="sm" color="brand" component="a" href={`https://xray.helius.xyz/${path}`} target="_blank">
        <IconExternalLink size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
