import React, { HTMLProps, useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
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
  transition: all 0.5s;
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
    (typeof value === 'number' ? `${value / (maximum - minimum)}%` : value) ||
    '0'
  const [state, setState] = useState('0%')
  console.log(percent)
  const progress: CSSProperties = {
    width: state,
    background: look || '#06F'
  }
  return (
    <ReactVisibilitySensor
      onChange={(v) => {
        if (v) setState(percent)
      }}
    >
      <Track style={style} className={className}>
        <Bar style={progress} />
      </Track>
    </ReactVisibilitySensor>
  )
}
