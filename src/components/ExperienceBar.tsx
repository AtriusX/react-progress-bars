import React from 'react'
import styled from 'styled-components'
import { Progress, ProgressData } from './Progress'

export interface ExperienceBarData extends ProgressData {
  min?: number
  max?: number
  value?: number
}

const Container = styled.div`
  position: relative;
  width: 20em;
  display: flex;
  align-items: center;
`

const Indicator = styled.span`
  position: absolute;
  text-align: center;
  width: 100%;
  color: white;
  z-index: 100;
  font-size: 2em;
  font-weight: 700;
`

const Bar = styled(Progress)`
  position: absolute;
  height: 3em;
  width: 100%;
`

export function ExperienceBar({
  min,
  max,
  value,
  look,
  rounded,
  style,
  className
}: ExperienceBarData) {
  const maximum = max || 1
  const offset = (value || 0) - (min || 0)
  console.log(value, min, offset, offset / maximum, offset)

  return (
    <Container style={style} className={className}>
      <Indicator>{Math.floor(offset / maximum)}</Indicator>
      <Bar
        min={min}
        max={max}
        value={(value || 0) % maximum}
        look={look}
        rounded={rounded}
        style={style}
      />
    </Container>
  )
}
