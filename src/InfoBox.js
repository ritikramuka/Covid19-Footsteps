import { Card, Typography, CardContent } from '@material-ui/core'
import React from 'react'

function InfoBox({title, cases, total}) {
    return (
        <div>
            <Card className="InfoBox">
                <CardContent>
                    <Typography className="InfoBox_title" color="textPrimary">{title}</Typography>
                    <h2>{cases}</h2>
                    <h3 className="InfoBox_total">
                        {total} Total
                    </h3>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
