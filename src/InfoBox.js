import "./infoBox.css";
import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${
        props.Active
          ? props.Red
            ? "infoBox--selected-red"
            : "infoBox--selected-green"
          : null
      }`}
    >
      <CardContent>
        <Typography variant="h5" className="infoBox_title" color="textPrimary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${!props.Red ? "infoBox_cases-green" : null}`}>{cases}</h2>
        <h3 className="infoBox_total">{total} Total</h3>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
