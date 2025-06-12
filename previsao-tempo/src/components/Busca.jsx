import striptags from 'striptags'
import React, { useEffect, useState } from 'react'
import weatherCliente from './../utils/weatherCliente'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
const Busca = () => {
  const [termoDeBusca, setTermoDeBusca] = useState('São Paulo')
  const [resultados, setResultados ] = useState([])
  const	withZero = (str, quant=3, sep='0') => {	return	str.toString().padStart(quant, sep);	}
  useEffect(() => {
    try{
      const fazerBusca = async () => {
        const { data } = await weatherCliente.get('/search', {
          params: {
            query: termoDeBusca
          }
        })
        let items   =   {}
        if(data)    for(var i=0; i < data.length; i++){
            const item  =   new Date(data[i].dt * 1000).getFullYear() + withZero(new Date(data[i].dt * 1000).getMonth(), 2) + 
             withZero(new Date(data[i].dt * 1000).getDate(), 2)
             console.log(item)
            if(!items[item])  items[item]  =   []
            items[item][items[item].length]    =   data[i];
        }
        console.log(items)
        setResultados(items)
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
      {
        Object.keys(resultados).map((id, index) => (
            <div 
            key={id}
            className='my-2 border-round-md text-center border border-1 font-bold'>
              <div
                className='p-3'
                style={{ background: 'cyan' }}>
                    {new Date(id.slice(0, 4), (id[4] + id[5]), id[6] + id[7]).
                    toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className='p-2 grid  text-xs'>
                {
                  resultados[id].map((item => (
                    <div
                     key={item.dt}
                     className="sm:col-6 md:col-3 lg:col-1 xl:col mb-4"
                     style={{ background: 'linear-gradient(cyan, white)' }}>
                        <b className="w-full inline-block">
                          {
                            withZero(new Date(item.dt * 1000).getHours(), 2) + ":" +
                            withZero(new Date(item.dt * 1000).getMinutes(), 2)
                          }
                        </b>
                        <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="icone" />
                        <i className='w-full inline-block'>
                            <span className="pi pi-cloud px-2" style={{ color: 'blue' }}></span>
                            <span className="p-2 mb-2">{item.humidade}%</span>
                        </i>
                        <i className='w-full inline-block'>
                            <span className="pi pi-sun px-2" style={{ color: 'red' }}></span>
                            <span className="p-2 mb-2">{item.tempMax}ºC</span>
                        </i>
                        <i className='w-full inline-block'>
                            <span className="pi pi-sun px-2" style={{ color: 'navy' }}></span>
                            <span className="p-2 mb-2">{item.tempMin}ºC</span>
                        </i>
                    </div>
                  )))
                }
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default Busca