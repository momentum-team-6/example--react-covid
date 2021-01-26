import React, { useState, useEffect } from 'react'
import axios from 'axios'
import format from 'date-fns/format'

function CountryData ({ country, handleGoBack }) {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios.get(`https://api.covid19api.com/live/country/${country.Slug}`)
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

  return (
    <div>
      <h2>{country.Country}</h2>

      <button
        className='pa0 bw0 bg-white blue pointer underline-hover'
        onClick={handleGoBack}
      >
        Back to all countries
      </button>

      <ul>
        {countryData.map(dataByDay => (
          <li key={dataByDay.id}>
            {format(dataByDay.date, 'LLL d, yyyy')}
            <dl>
              <dt>Confirmed</dt>
              <dd>{dataByDay.confirmed}</dd>
              <dt>Active</dt>
              <dd>{dataByDay.active}</dd>
              <dt>Recovered</dt>
              <dd>{dataByDay.recovered}</dd>
              <dt>Deaths</dt>
              <dd>{dataByDay.deaths}</dd>
            </dl>
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
