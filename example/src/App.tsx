import React from 'react'

import { RadialProgress } from 'react-progress-bars'
import styled from 'styled-components'

const Badge = styled(RadialProgress)`
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
  // return <Badge max={20} value={530} rounded />
  return <Badge barSize={25} value={50} label="HELLwO WORLD" radius={100} width={15} rotation={45} />
}

export default App
