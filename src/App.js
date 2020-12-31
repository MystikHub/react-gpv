import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import 'fontsource-roboto';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      githubUsername: "",
      loadingUser: false,
    }
  }

  loadUser() {
    if(this.state.githubUsername === "")
      return;

    this.setState({ loadingUser: true });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <header className="App-header">
            <Container maxWidth="sm" style={{paddingTop: "3rem", paddingBottom: "3rem"}}>
              <Typography variant="h3" style={{textAlign: "center"}}>GitHub Profile Viewer</Typography>
              <br /><br />
              <form className={useStyles.root} noValidate autoComplete="off">
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
          </header>
      </MuiThemeProvider>
    );
  }
}

export default App;
