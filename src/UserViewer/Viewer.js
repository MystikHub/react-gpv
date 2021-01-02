import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visualization-tabpanel-${index}`}
      aria-labelledby={`visualization-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function generateTabProps(index) {
  return {
    id: `visualization-tab-${index}`,
    'aria-controls': `visualization-tabpanel-${index}`,
  };
}

export default class Viewer extends Component {
  constructor(props) {
    super(props);

    console.log(localStorage.lastVisitedUser)
    this.state = {
      parsedUser: JSON.parse(localStorage.lastVisitedUser),
      selectedTab: 0
    }
  }

  handleTabChange = (event, newValue) => {this.setState({selectedTab: newValue})}

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          {/* Profile picture */}
          <Grid item xs="auto">
            <Avatar alt={this.state.parsedUser.login} src={this.state.parsedUser.avatar_url}
              style={{ width:"10rem", height:"10rem"}} />
          </Grid>
          {/* Account description */}
          <Grid item xs>
            <Typography variant="h4">{this.state.parsedUser.login}</Typography>
            <br />
            <Typography variant="body1">{this.state.parsedUser.bio}</Typography>
            <br />
            <a href={this.state.parsedUser.html_url} className="link-white" 
              target="_blank" rel="noreferrer">
              <Button variant="contained" color="primary">View profile</Button>
            </a>
          </Grid>
        </Grid>

        <AppBar position="static" style={{marginTop: "4rem"}}>
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange} aria-label="Visualization tabs"
            centered>
            <Tab label="Overview" {...generateTabProps(0)} />
            <Tab label="Proficiency" {...generateTabProps(1)} />
            <Tab label="Achievements" {...generateTabProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.selectedTab} index={0}>
          Overview
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          Proficiency
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
          Achievements
        </TabPanel>
      </Container>
    );
  }
}