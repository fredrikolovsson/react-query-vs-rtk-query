import React from 'react'

import './App.css'
import { RtkQueryExample } from './components/RtkQueryExample'

const EXAMPLES = {
  RTK_QUERY: 'rtk-query',
  REACT_QUERY: 'react-query',
}

function App() {
  const [example, setExample] = React.useState(EXAMPLES.RTK_QUERY)

  const getOtherExampleName = () => {
    if (example === EXAMPLES.RTK_QUERY) {
      return EXAMPLES.REACT_QUERY
    }

    return EXAMPLES.RTK_QUERY
  }

  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        <h2>Infinite scroll & pull-to-refresh using {example}</h2>
        <button onClick={() => setExample(getOtherExampleName())}>
          Change to {getOtherExampleName()}
        </button>
      </div>
      <RtkQueryExample />
    </div>
  )
}

export default App
