import { useState, useEffect } from 'react'
import axios from 'axios'

function App () {
  const [countries, setCountries] = useState([])

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
    <div className='App'>
      <h1>Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country.Slug}>{country.Country}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
