import React, { useState, useEffect } from 'react'
import axios from 'axios'
import format from 'date-fns/format'
import StatBox from './StatBox'

function CountryData ({ country, handleGoBack }) {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios.get(`https://api.covid19api.com/dayone/country/${country.Slug}`)
      .then(response => {
        const data = response.data.map(dataByDay => (
          {
            id: dataByDay.ID,
            date: new Date(dataByDay.Date),
            confirmed: dataByDay.Confirmed,
            active: dataByDay.Active,
            recovered: dataByDay.Recovered,
            deaths: dataByDay.Deaths
          }
        ))
        setCountryData(data)
      })
  }, [country])

  const dateOfFirstCase = countryData[0].date
  const currentCases = countryData[countryData.length - 1]

  return (
    <div>
      <h2>
        {country.Country}
        <div className='dib ml2 f5'>
          <button
            className='pa0 bw0 bg-white blue pointer underline-hover'
            onClick={handleGoBack}
          >
            Back to all countries
          </button>
        </div>
      </h2>

      <div className='flex mv4 justify-around'>
        <StatBox label='First case' stat={format(dateOfFirstCase, 'LLL d, yyyy')} />
        <StatBox label='Current cases' stat={currentCases.active.toLocaleString()} />
        <StatBox label='Recovered cases' stat={currentCases.recovered.toLocaleString()} />
      </div>

      <ul>
        {countryData.map(dataByDay => (
          <li key={dataByDay.id}>
            <div>{format(dataByDay.date, 'LLL d, yyyy')}</div>
            <div>Confirmed: {dataByDay.confirmed}</div>
            <div>Active: {dataByDay.active}</div>
            <div>Recovered: {dataByDay.recovered}</div>
            <div>Deaths: {dataByDay.deaths}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// class CountryDataCBC extends React.Component {
//   constructor () {
//     super()

//     this.state = {
//       countryData: []
//     }

//     this.goBack = this.goBack.bind(this)
//   }

//   componentDidMount () {
//     this.getCountryData()
//   }

//   componentDidUpdate (prevProps) {
//     if (this.props.country !== prevProps.country) {
//       this.getCountryData()
//     }
//   }

//   getCountryData () {
//     axios.get(`https://api.covid19api.com/live/country/${this.props.country.Slug}`)
//       .then(response => {
//         const data = response.data.map(dataByDay => (
//           {
//             id: dataByDay.ID,
//             date: new Date(dataByDay.Date),
//             confirmed: dataByDay.Confirmed,
//             active: dataByDay.Active,
//             recovered: dataByDay.Recovered,
//             deaths: dataByDay.Deaths
//           }
//         ))
//         this.setState({ countryData: data })
//       })
//   }

//   goBack () {
//     console.log('going back')
//     this.props.handleGoBack()
//   }

//   render () {
//     return (
//       <div>
//         <h2>{this.props.country.Country}</h2>

//         <button
//           className='pa0 bw0 bg-white blue pointer underline-hover'
//           onClick={this.goBack.bind(this)}
//         >
//           Back to all countries
//         </button>

//         <ul>
//           {this.state.countryData.map(dataByDay => (
//             <li key={dataByDay.id}>
//               {format(dataByDay.date, 'LLL d, yyyy')}
//               <dl>
//                 <dt>Confirmed</dt>
//                 <dd>{dataByDay.confirmed}</dd>
//                 <dt>Active</dt>
//                 <dd>{dataByDay.active}</dd>
//                 <dt>Recovered</dt>
//                 <dd>{dataByDay.recovered}</dd>
//                 <dt>Deaths</dt>
//                 <dd>{dataByDay.deaths}</dd>
//               </dl>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

export default CountryData
