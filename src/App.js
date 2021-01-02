import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import Splash from './Splash';
import Viewer from './UserViewer/Viewer'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: localStorage.lastVisitedUser
    }
  }

  render() {
    if(this.state.currentUser === undefined) {
      return (
        <MuiThemeProvider theme={theme}>
            <header className="App-header">
              <Splash onUserInfoFetched={() => this.setState({currentUser: localStorage.lastVisitedUser})}/>
            </header>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider theme={theme}>
          <header className="App-header">
            <Viewer user={this.state.currentUser}/>
          </header>
      </MuiThemeProvider>
    );
  }
}

export default App;
