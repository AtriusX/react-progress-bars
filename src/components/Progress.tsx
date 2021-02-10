import React, { HTMLProps } from 'react'
import styled, { CSSProperties } from 'styled-components'

const Track = styled.div`
  position: relative;
  background: #333;
  height: 0.5em;
  width: 15%;
`

const Bar = styled.div`
  position: relative;
  height: 100%;
  width: 0;
  transition: all 0.3s;
`

export interface ProgressData extends HTMLProps<HTMLDivElement> {
  min?: number
  max?: number
  value?: number | string
  look?: string
}

export function Progress({
  min,
  max,
  value,
  look,
  style,
  className
}: ProgressData) {
  const minimum = min || 0
  const maximum = max || 1
  const percent =
    typeof value === 'number' ? `${value / (maximum - minimum)}%` : value
  console.log(percent)
  const progress: CSSProperties = {
    width: percent,
    background: look || '#06F'
  }
  return (
    <Track {...[style, className]}>
      <Bar style={progress} />
    </Track>
  )
}
