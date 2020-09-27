import React from "react";
import numerals from "numeral";
import {Circle, Popup} from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recoverd: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    }
}

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if(a.cases > b.cases) 
            return -1;
        else
            return 1;
    });

    return sortedData;
}

// DRAW circles on th amp with interactive toolip
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <h1>Im a popup</h1>
            </Popup>
        </Circle>
    ))
    
);