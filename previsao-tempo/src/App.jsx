import React from 'react'
import env from 'react-dotenv'
import weatherCliente from './utils/weatherCliente'

const App = () => {
  weatherCliente.get('/search', {
      params: {
        query: "são paulo"
      }
    }).then(result => console.log({dados: result.data}))
  return (
    <div>Olhar no Console log</div>
  )
}

export default App