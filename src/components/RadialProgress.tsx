import React, { SVGProps, useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import { ProgressData } from './Progress'

const Indicator = styled.text`
  position: relative;
  text-align: center;
  width: 100%;
  text-anchor: middle;
  dominant-baseline: middle;
  font-weight: 700;
  font-size: 2em;
  transform: translateY(2%);
`

type Rotation = 45 | 90 | 135 | 180 | 225 | 270 | 315 | 360 | number

type Size = 100 | 75 | 50 | 25 | number

interface CircleData extends SVGProps<SVGCircleElement> {
  rotation?: Rotation
  barSize?: Size
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
  rotation?: Rotation
  barSize?: Size
  rounded?: boolean
  radius?: number
  showValue?: boolean
  filled?: boolean
}

export function RadialProgress(props: RadialProgressData) {
  const {
    value,
    barSize,
    radius,
    width,
    rotation,
    rounded,
    showValue,
    filled,
    ...others
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
    showValue: showValue,
    ...circleData
  }
  // Dynamic track element
  const ProgressTrack = Track(data)
  return (
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
      <svg {...(others as object)} height={diameter} width={diameter}>
        <ProgressTrack
          {...circleData}
          fill={filled ? '#454545' : 'transparent'}
        />
        <Progress {...data} />
        {showValue ? (
          <Indicator x='50%' y='50%' fill={filled ? 'white' : 'black'}>
            {value}%
          </Indicator>
        ) : undefined}
      </svg>
    </ReactVisibilitySensor>
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
