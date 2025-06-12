import React from 'react'
import env from 'react-dotenv'
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import Busca from './components/Busca';

const App = () => {
  const expressaoJSX = <Busca />
  return (
    <div>
      {expressaoJSX}
    </div>
  )
}

export default App