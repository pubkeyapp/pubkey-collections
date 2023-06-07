import { Anchor, Box, Image } from '@mantine/core'
import Linkify from 'linkify-react'
import { IntermediateRepresentation, Opts as LinkifyOpts } from 'linkifyjs'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function UiLinkify({ children }: { children: ReactNode }) {
  const options: LinkifyOpts = {
    render: ({ attributes, content, tagName }: IntermediateRepresentation) => {
      const { href, ...props } = attributes
      const currentUrl = window.location.origin

      if (href.startsWith(currentUrl)) {
        const localPath = href.replace(currentUrl, '')
        return (
          <Anchor component={Link} to={localPath} {...props}>
            {content}
          </Anchor>
        )
      }

      if (href.endsWith('.png') || href.endsWith('.jpg') || href.endsWith('.jpeg') || href.endsWith('.gif')) {
        return (
          <Box maw={300} sx={{ textAlign: 'left' }} my="xs">
            <Image radius="md" src={href} alt="Embedded image" />
          </Box>
        )
      }

      return (
        <Anchor href={href} target="_blank" {...props}>
          {content}
        </Anchor>
      )
    },
  }
  return (
    <Linkify tagName="span" options={options}>
      {children}
    </Linkify>
  )
}
