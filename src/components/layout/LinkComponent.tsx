import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'
import { THEME_COLOR_SCHEME } from '../../utils/config'

interface Props {
  href: string
  children: ReactNode
  isExternal?: boolean
  className?: string
  target?: string
  color?: string
}

export function LinkComponent(props: Props) {
  const className = props.className ?? ''
  const isExternal = props.href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || props.isExternal
  const color = useColorModeValue(`red.600`, `red.600`)

  if (isExternal) {
    return (
      <Link className={className} _hover={{ color: props.color }} href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </Link>
    )
  }

  return (
    <Link target={props.target} as={NextLink} className={className} _hover={{ color: props.color }} href={props.href}>
      {props.children}
    </Link>
  )
}
