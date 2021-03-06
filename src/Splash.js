import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      githubUsername: "",
      loadingUser: false,
    }
  }
  
  loadUser() {
    if(this.state.githubUsername === "")
      return;
    
    this.setState({ loadingUser: true });

    var userInfoReq = new XMLHttpRequest();
    userInfoReq.app = this;
    userInfoReq.onreadystatechange = () => {
      if(userInfoReq.readyState === 4) {
        if(userInfoReq.status === 200) {
          console.log(userInfoReq.responseText);
          localStorage.setItem('lastVisitedUser', userInfoReq.responseText);
          this.props.onUserInfoFetched();
        }
      }
    };
    userInfoReq.open('GET', `https://api.github.com/users/${this.state.githubUsername}`);
    userInfoReq.send();
  }
  
  
  render() {
    return (
      <Container maxWidth="sm" style={{paddingTop: "3rem", paddingBottom: "3rem"}}>
        <Typography variant="h3" style={{textAlign: "center"}}>GitHub Profile Viewer</Typography>
        <br /><br />
        <form noValidate autoComplete="off" onSubmit={e => {e.preventDefault(); this.loadUser();}}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <TextField value={this.state.githubUsername} label="GitHub username" variant="outlined"
                fullWidth onChange={event => this.setState({githubUsername: event.target.value})}/>
              </Grid>
            <Grid item xs={1} hidden={this.state.loadingUser}>
            <Button variant="contained" color="primary" size="large" onClick={() => this.loadUser()}>
              GO
              </Button>
            </Grid>
            <Grid item xs={1} hidden={!this.state.loadingUser}>
              <CircularProgress />
            </Grid>
          </Grid>
        </form>
      </Container>
      );
    }
  }