import React from 'react'

import { ExperienceBar } from 'react-progress-bars'
import styled from 'styled-components'

const Badge = styled(ExperienceBar)`
  margin: 10em;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    background: #EEE;
  }
`

const App = () => {
  // return <Badge text="Hello world!" barThickness="25px" double look="linear-gradient(to bottom right, orange 0%, purple 100%)" value="50%">
  //   Hello world!
  // </Badge>
  return <Badge max={20} value={530} rounded />

}

export default App
