import React from 'react'

import { ProgressBadge } from 'react-progress-bars'

const App = () => {
  return <ProgressBadge style={{
    margin: '10em'
  }} text="Hello world!"  double look="linear-gradient(to bottom right, orange 0%, purple 100%)" value="50%" />
}

export default App
