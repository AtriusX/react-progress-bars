import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { Progress, ProgressData } from './Progress'

const Badge = styled.div`
  position: relative;
  font-size: 1.75em;
  font-weight: 700;
  border-radius: 10px;
  width: 10em;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`

const Bar = styled(Progress)`
  width: 100%;
`

const Title = styled.p`
  margin: 0.5em;
  vertical-align: middle;
`

export interface ProgressBadgeData extends ProgressData {
  text: string
  double?: boolean
  barThickness?: string
}

export function ProgressBadge({
  min,
  max,
  value,
  look,
  text,
  double,
  barThickness,
  style,
  className
}: ProgressBadgeData) {
  const bar: CSSProperties = {
    height: barThickness || '6px'
  }
  return (
    <Badge style={style} className={className}>
      <Bar style={bar} min={min} max={max} value={value} look={look} />
      <Title>{text}</Title>
      {double ? (
        <Bar style={bar} min={min} max={max} value={value} look={look} />
      ) : undefined}
    </Badge>
  )
}
