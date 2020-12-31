import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import Splash from './Splash';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <header className="App-header">
            <Splash onUserinfoFetched={() => this.showUser()} />
          </header>
      </MuiThemeProvider>
    );
  }
}

export default App;
