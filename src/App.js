import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
  FormGroup,
  Switch,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./utils";
import LineChart from "./LineChart";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["Worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 28.703011200000002,
    lng: 77.1624847,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryCahnge = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "Worldwide"
          ? setMapCenter([28.703011200000002, 77.1624847])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "Worldwide" ? setMapZoom(3) : setMapZoom(4);
      });
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
              <Select
                varient="outlined"
                value={country}
                onChange={onCountryCahnge}
              >
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
          {/* <FormControl class="app_nightmode">
            <Switch></Switch>
          </FormControl> */}
        </div>
        {/* infoboxes */}
        {/* infoboxes */}
        {/* infoboxes */}
        <div className="app_stat">
          <InfoBox
            Red={true}
            Active={caseType === "cases"}
            onClick={() => setCaseType("cases")}
            title="Active"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            Red={false}
            Active={caseType === "recovered"}
            onClick={() => setCaseType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            Red={true}
            Active={caseType === "deaths"}
            onClick={() => setCaseType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/* map */}
        <Map
          casesType={caseType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        ></Map>
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            {/* worldwide stat */}
            <h3>Live Cases By Country</h3>
            <Table countries={tableData}></Table>
            {/* graph */}
            <h3>Worldwide New {caseType}</h3>
            <LineChart className="app_graph" casesType={caseType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
