import React, { useState , useEffect } from 'react';
import './App.css';
import {FormControl, Select, MenuItem} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['Globe']);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso3
          }
        ));
        setCountries(countries);
      });
    }
    getCountriesData();
  }, []);

  const onCountryCahnge = async (event) => {
    const temp = event.target.value;
    setCountry(temp);
  }

  return (
    <div className="app">   {/*BEM Naming Conventions*/}
      
      <div class="app_header">
      
        <h1>Covid-19 Footprints</h1>
        
        <div class="app_header_right">
          <FormControl class="app_dropdown">
            <Select value={country} onChange={onCountryCahnge}>
              <MenuItem value="Globe">Globe</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>  
                ))
              }
            </Select>
          </FormControl>

        </div>
      
      </div>
      
      {/* header */}
      {/* h1+dropdorn+switch(night-mode) */}

      {/* infoboxes */}
      {/* infoboxes */}
      {/* infoboxes */}

      {/* worldwide stat */}

      {/* map */}

      {/* graph */}

    </div>
  );
}

export default App;
