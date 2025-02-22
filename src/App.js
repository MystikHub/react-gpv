import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import Splash from './Splash';
import Viewer from './UserViewer/Viewer'

const theme = createTheme({
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
        <ThemeProvider theme={theme}>
            <header className="App-header">
              <Splash onUserInfoFetched={() => this.setState({currentUser: localStorage.lastVisitedUser})}/>
            </header>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <Viewer user={this.state.currentUser} onUserChanged={() => this.setState({ currentUser: localStorage.lastVisitedUser }) }/>
          </header>
        </ThemeProvider>
      );
    }
  }
}

export default App;
