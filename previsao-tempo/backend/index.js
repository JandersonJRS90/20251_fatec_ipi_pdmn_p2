require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
const weathermap = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

//http://localhost:3000/search
app.get('/search', async (req, res) => {
  const query = req.query.query
  try{
    const result = await weathermap.get('/forecast', {
      params: { 
        q:  query + ',br',
        lang: 'pt',
        units:  'metric',
        appid:  process.env.WEATHER_KEY
      }
    })
    res.json(result.data.list.map((item) => {
      return  {dt: item.dt, tempMax: item.main.temp_max, tempMin: item.main.temp_min, humidade: item.main.humidity, 
        desc: item.weather[0].description, icon: item.weather[0].icon}
    }))
  }catch(e){  res.json('')  }
})

const port = 3000
app.listen(port, () => console.log (`Back End OK! Porta ${port}.`))