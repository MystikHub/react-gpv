import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import 'fontsource-roboto';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './App.css';
import JSONTree from 'react-json-tree';

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

const monokaiTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      githubUsername: "",
      requestType: "",
      response: ""
    }
  }

  makeRequest() {
    let apiRequest = new XMLHttpRequest();
    apiRequest.app = this;
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if(apiRequest.status === 200) {
          apiRequest.app.setState({response: JSON.parse(apiRequest.response)});
        }
      }
    }

    if(this.state.requestType === "repoList") {
      apiRequest.open('GET', 'https://api.github.com/users/' + this.state.githubUsername + '/repos')
      apiRequest.send();
    } else if(this.state.requestType === "userInfo") {
      apiRequest.open('GET', 'https://api.github.com/users/' + this.state.githubUsername)
      apiRequest.send();
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header" style={{paddingTop: "3rem", paddingBottom: "3rem"}}>
            <Container maxWidth="sm">
              <Typography variant="h3">GitHub API access demo</Typography>
              <br /><br />
              <form className={useStyles.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs>
                    <TextField value={this.state.githubUsername} label="GitHub username" variant="outlined"
                      style={{minWidth: '12rem', textAlign: 'left'}} onChange={event => this.setState({githubUsername: event.target.value})}/>
                  </Grid>
                  <Grid item xs>
                    <FormControl variant="outlined" style={{minWidth: '12rem', textAlign: 'left'}}>
                      <InputLabel>Request type</InputLabel>
                      <Select
                        value={this.state.requestType}
                        onChange={event => this.setState({requestType: event.target.value})}
                        label="Request type"
                      >
                        <MenuItem value="">
                          - Select -
                        </MenuItem>
                        <MenuItem value="repoList">List repos</MenuItem>
                        <MenuItem value="userInfo">User info</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
                    <Button variant="contained" color="primary" size="large" onClick={() => this.makeRequest()}>
                      Go!
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Paper style={{padding: '1rem'}} hidden={this.state.requestType === ""}>
                    <code hidden={this.state.requestType !== "repoList"}>
                      GET https://api.github.com/users/{this.state.githubUsername}/repos
                    </code>
                    <code hidden={this.state.requestType !== "userInfo"}>
                      GET https://api.github.com/users/{this.state.githubUsername}
                    </code>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="md">
              <Grid container>
                <Grid item xs hidden={this.state.response === ""}>
                  <br />
                  <br />
                  <Typography  variant="h4">API Response:</Typography>
                  <br />
                  <JSONTree data={this.state.response} theme={monokaiTheme} invertTheme={false}/>
                </Grid>
              </Grid>
            </Container>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
