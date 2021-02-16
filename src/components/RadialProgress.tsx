// eslint-disable-next-line no-use-before-define
import React, { SVGProps, useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import { ProgressData } from './Progress'

type Size = 100 | 50 | 25

const Container = styled.div`
  position: relative;
  width: fit-content;
`
const Label = styled.p`
  position: relative;
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin-top: 0;
`

interface CircleData extends SVGProps<SVGCircleElement> {
  rotation?: number
  barSize?: number
  circumference: number
  width?: number
  rounded?: boolean
}

export interface ProgressBarData extends CircleData {
  min?: number
  max?: number
  look?: string
  progress?: number
}

interface RadialProgressData extends ProgressData {
  min?: number
  max?: number
  width?: number
  value?: number
  label?: string
  rotation?: number
  barSize?: Size
  rounded?: boolean
  radius?: number
}

export function RadialProgress(props: RadialProgressData) {
  const {
    value,
    barSize,
    radius,
    width,
    rotation,
    label,
    rounded,
    className,
    style
  } = props
  // Circle data
  const rad = radius || 50
  const diameter = rad * 2
  const normalRadius = rad - (width || 4) * 2
  const circumference = normalRadius * 2 * Math.PI
  // State
  const [progress, setProgress] = useState(getPercentage(circumference, 0))
  // Define objects
  const circleData = {
    r: normalRadius,
    cx: rad,
    cy: rad
  }

  const data = {
    circumference: circumference,
    progress: progress,
    width: width,
    rotation: rotation,
    barSize: barSize,
    rounded: rounded,
    ...circleData
  }
  // Dynamic track element
  const ProgressTrack = Track(data)
  return (
    <Container className={className} style={style}>
      <ReactVisibilitySensor
        partialVisibility
        onChange={(v) => {
          if (v)
            setProgress(
              getPercentage(
                circumference,
                ((barSize || 100) / 100) * (value || 0)
              )
            )
        }}
      >
        <svg height={diameter} width={diameter}>
          <ProgressTrack {...circleData} />
          <Progress {...data} />
        </svg>
      </ReactVisibilitySensor>
      <Label>{label}</Label>
    </Container>
  )
}

function getPercentage(circ: number, value: number) {
  return circ - (value / 100) * circ
}

function Track({
  circumference,
  width,
  rotation,
  barSize,
  rounded
}: CircleData) {
  return styled.circle`
    position: absolute;
    transform: rotate(${90 + (rotation || 0)}deg);
    transform-origin: 50% 50%;
    fill: transparent;
    stroke: #333;
    stroke-dasharray: ${circumference} ${circumference};
    stroke-width: ${width || 4};
    stroke-dashoffset: ${getPercentage(circumference, barSize || 100)};
    stroke-linecap: ${rounded ? 'round' : undefined};
  `
}

function Progress({
  min,
  max,
  circumference,
  width,
  rotation,
  look,
  progress,
  rounded,
  ...others
}: ProgressBarData) {
  return (
    <circle
      {...others}
      style={{
        transform: `rotate(${90 + (rotation || 0)}deg)`,
        transformOrigin: '50% 50%',
        transition: 'all 0.5s',
        fill: 'transparent',
        stroke: look || '#06F',
        strokeDasharray: `${circumference} ${circumference}`,
        strokeWidth: width || 4,
        strokeDashoffset: progress,
        strokeLinecap: rounded ? 'round' : undefined
      }}
    />
  )
}
