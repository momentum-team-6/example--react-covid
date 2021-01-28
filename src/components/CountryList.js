import toPairs from 'lodash/toPairs'

function CountryList ({ countries, setSelectedCountry }) {
  return (
    <div>
      <h2>List of countries</h2>
      <ul className='list pl0'>
        {toPairs(countries).sort(p => p[0]).map(([letter, cs]) => (
          <li className='mb2' key={letter}>
            <div className='flex items-center'>
              <div className='w2 f3 b' style={{ flexShrink: 0 }}>{letter}</div>
              <div className='flex-auto'>
                <ul className='list pl0'>
                  {cs.map(country => (
                    <li className='mb2 mr2 dib' key={country.code}>
                      <button
                        className='pa0 bw0 bg-white blue pointer underline-hover'
                        onClick={() => setSelectedCountry(country)}
                      >
                        {country.name}
                      </button>
                    </li>
                  ))}

                </ul>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList
