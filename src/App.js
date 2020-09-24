import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, CardContent, Card, FormGroup , Switch} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData} from "./utils";
import LineChart from "./LineChart";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["Globe"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryCahnge = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "globe" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch (url) 
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };

  return (
    <div className="app">

      <div className="app_left">
      {/*BEM Naming Conventions*/}
        <div class="app_header">

          {/* header */}
          {/* h1+dropdorn+switch(night-mode) */}
          <div className="app_header_left">
            <h1>Covid-19 Footprints</h1>
          </div>
          <FormGroup>
            <FormControl class="app_dropdown">
              <Select varient="outlined" value={country} onChange={onCountryCahnge}>
                <MenuItem value="Globe">Globe</MenuItem>
                {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
            <FormControl class="app_nightmode">
              <Switch></Switch>
            </FormControl>      
        </div>
        <div className="app_content">
          {/* infoboxes */}
          {/* infoboxes */}
          {/* infoboxes */}
          <div className="app_stat">
            <InfoBox title = "Active" cases = {countryInfo.todayCases} total = {countryInfo.cases}/>
            <InfoBox title = "Recoverd" cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}/>
            <InfoBox title = "Deaths" cases = {countryInfo.todayDeaths} total = {countryInfo.deaths}/>
          </div>
            
          {/* map */}
          <Map></Map>
        </div>
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            {/* worldwide stat */}
            <h3>Live Cases By Country</h3>
            <Table countries={tableData}></Table>
            {/* graph */}
            <h3>Worldwide New Cases</h3>
            <LineChart></LineChart>
          </CardContent>
        </Card>
      </div>
    
    </div>
  );
}

export default App;
