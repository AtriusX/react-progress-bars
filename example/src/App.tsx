import React from 'react'

import { Progress } from 'react-progress-bars'
import 'react-progress-bars/dist/index.css'

const App = () => {
  return <Progress look="linear-gradient(to bottom right, orange 0%, purple 100%)" value="50%" />
}

export default App
