import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import Typography from '@mui/material/Typography';

import { getActiveness } from './UserStatistics';

function activenessTitle(activeness) {
  if(activeness >= 50)
    return "Enthusiast"
  else if(activeness >= 30)
    return "Active member"
  else
    return "Lurker"
}

export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats_activeness: 0.0
    };
  }

  componentDidMount() {
    getActiveness((result) => {this.setState({stats_activeness: result});});
  }

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Activity this month</Typography>
                <Typography variant="h4" gutterBottom><Box component="span" color="info.main">{this.state.stats_activeness}%</Box> - {activenessTitle(this.state.stats_activeness)}</Typography>
                <Typography variant="body1" color="textSecondary">Measured as the percentage of days with at least one event done by this user (commits, comments, watches, etc.) over the past month.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
