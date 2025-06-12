import axios from 'axios'
import striptags from 'striptags'
import React, { useEffect, useState } from 'react'
import weatherCliente from './../utils/weatherCliente'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
const Busca = () => {
  const [termoDeBusca, setTermoDeBusca] = useState('')
  const [resultados, setResultados ] = useState([])

  useEffect(() => {
    try{
      const fazerBusca = async () => {
        const { data } = await weatherCliente.get('/search', {
          params: {
            query: termoDeBusca
          }
        })
        console.log(data)
        setResultados(data)
      }
      const timeoutID = setTimeout(() => {
        if(termoDeBusca && termoDeBusca.length >= 3)  fazerBusca()
      }, 1000)
      return () => {  clearTimeout(timeoutID)  }
    }catch(e){ console.log(e) }
  }, [termoDeBusca])

  return (
    <div>
      <IconField iconPosition='left'>
        <InputIcon className='pi pi-search'/>
        <InputText 
          placeholder='Buscar...'
          onChange={(e) => {setTermoDeBusca(e.target.value)}}
          value={termoDeBusca} />
      </IconField>
    </div>
  )
}

export default Busca