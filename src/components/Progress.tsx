import React, { HTMLProps, useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import styled, { CSSProperties } from 'styled-components'

const Track = styled.div`
  position: relative;
  background: #333;
  height: 0.5em;
  width: 15%;
  overflow: hidden;
`

const Bar = styled.div`
  position: relative;
  height: 100%;
  width: 0;
  transition: all 0.5s;
`

export interface ProgressData extends HTMLProps<HTMLDivElement> {
  min?: number | string
  max?: number | string
  value?: number | string
  look?: string
  rounded?: boolean
}

export function Progress({
  min,
  max,
  value,
  look,
  rounded,
  style,
  className
}: ProgressData) {
  const minimum = typeof min === 'string' ? parseFloat(min) : min || 0
  const maximum = typeof max === 'string' ? parseFloat(max) : max || 1
  const percent =
    (typeof value === 'number'
      ? `${Math.min(100, ((value - minimum) / maximum) * 100)}%` // Prevent the bar from overflowing past 100%
      : value) || '0'
  const [state, setState] = useState('0%')
  console.log(value, percent);

  const round = rounded ? '50px' : undefined
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
      <Track style={{ ...style, borderRadius: round }} className={className}>
        <Bar style={progress} />
      </Track>
    </ReactVisibilitySensor>
  )
}
