import React from 'react'

import './App.css'
import { ReactQueryExample } from './components/ReactQueryExample'
import { RtkQueryExample } from './components/RtkQueryExample'

const EXAMPLES = {
  RTK_QUERY: 'rtk-query',
  REACT_QUERY: 'react-query',
}

function App() {
  const [example, setExample] = React.useState(EXAMPLES.REACT_QUERY)

  const getOtherExampleName = () => {
    if (example === EXAMPLES.RTK_QUERY) {
      return EXAMPLES.REACT_QUERY
    }

    return EXAMPLES.RTK_QUERY
  }

  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        <h2>{example}</h2>
        <p>Infinite scroll example</p>
        <button onClick={() => setExample(getOtherExampleName())}>
          Change to {getOtherExampleName()}
        </button>
      </div>
      {example === EXAMPLES.REACT_QUERY && <ReactQueryExample />}
      {example === EXAMPLES.RTK_QUERY && <RtkQueryExample />}
    </div>
  )
}

export default App
