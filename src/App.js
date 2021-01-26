import { useState, useEffect } from 'react'
import axios from 'axios'
import 'tachyons'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'

function App () {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://api.covid19api.com/countries')
      .then(response => {
        const newCountries = response.data
        newCountries.sort((a, b) => {
          if (a.Country > b.Country) {
            return 1
          } else if (b.Country > a.Country) {
            return -1
          } else {
            return 0
          }
        })
        setCountries(newCountries)
      })
  }, [])

  return (
    <div className='App mw8 center mv3 ph3 sans-serif'>
      <h1 className='pa2 bg-orange white'>COVID-19 Data Explorer</h1>
      {selectedCountry
        ? <CountryData country={selectedCountry} handleGoBack={() => setSelectedCountry(null)} />
        : <CountryList countries={countries} setSelectedCountry={setSelectedCountry} />}

    </div>
  )
}

export default App
