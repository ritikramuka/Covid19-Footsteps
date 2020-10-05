import "./infoBox.css";
import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox_title" color="textPrimary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <h3 className="infoBox_total">{total} Total</h3>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
