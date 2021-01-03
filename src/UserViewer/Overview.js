import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { getActiveness } from './UserStatistics';

export default class Overview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Activeness</Typography>
                <br />
                <Typography variant="h4">{getActiveness()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>

          </Grid>
        </Grid>
      </Container>
    );
  }
}