import React from 'react'
import styled from 'styled-components'
import { Progress, ProgressData } from './Progress'

const Badge = styled.div`
  position: relative;
  border-radius: 10px;
  width: 15em;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`

const Box = styled.div`
  padding: 1em;
`

const Bar = styled(Progress)`
  position: relative;
  width: 100%;
  height: 10px;
`

const Title = styled.p`
  display: table-cell;
  vertical-align: middle;
  font-size: 1.75em;
  font-weight: 700;
  padding-bottom: 0.5em;
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
  className,
  children
}: ProgressBadgeData) {
  const props = {
    min: min,
    max: max,
    value: value,
    look: look,
    style: {
      height: barThickness
    }
  }
  return (
    <Badge {...{ style: style, className: className }}>
      <Bar {...props} />
      <Box>
        <Title>{text}</Title>
        {children}
      </Box>
      {double ? <Bar {...props} /> : undefined}
    </Badge>
  )
}
