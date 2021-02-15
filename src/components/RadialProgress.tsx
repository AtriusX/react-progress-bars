// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'
import { ProgressData } from './Progress'

type Vertical = 'top' | 'bottom'

type Horizontal = 'left' | 'right'

type Direction = Vertical | Horizontal

type Orientation = Direction | `${Vertical}-${Horizontal}`

type Size = 'full' | 'half' | 'quarter' | `${number}deg`

const Container = styled.div`
  position: relative;
`

export interface RadialProgressData extends ProgressData {
  direction?: Direction
  orientation?: Orientation
  sizing?: Size
}

export function RadialProgress() {
  return <Container></Container>
}
