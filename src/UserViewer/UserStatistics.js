import moment from 'moment';

export const getActiveness = (callback) => {
  // Get the user's public events

  let publicEvents = new XMLHttpRequest();
  publicEvents.onreadystatechange = () => {
    if(publicEvents.readyState === 4) {
      if(publicEvents.status === 200) {
        let events = JSON.parse(publicEvents.response);
        console.log(publicEvents.responseText);

        // Make an array with 31 elements set to false, indicating
        //   that no event happened n days ago
        let activeDays = Array(31).fill(false);

        // Go through the timestamp of each event and set n days ago
        //   to true if the event happened n days ago
        for(let i = 0; i < events.length; i++) {
          // Days since event = (now - timestamp) days, type int
          let daysSinceEvent = moment.duration(moment().diff(events[i].created_at)).days();
          if(daysSinceEvent < activeDays.length && daysSinceEvent >= 0) {
            if(!activeDays[daysSinceEvent])
              console.log(`Set day ${daysSinceEvent} to true`);
            activeDays[daysSinceEvent] = true;
          }

          console.log(daysSinceEvent);
        }

        // Count the number of days with events
        let numberOfActiveDays = 0;
        for(let eventDay = 0; eventDay < events.length; eventDay++)
          if(activeDays[eventDay] === true)
            numberOfActiveDays++;
        
        let activeness = Math.round(numberOfActiveDays / 31 * 100 * 100) / 100;
        
        callback(activeness);
      }
    }
  }
  let username = JSON.parse(localStorage.lastVisitedUser).login;
  publicEvents.open('GET', `https://api.github.com/users/${username}/events/public?per_page=100`);
  publicEvents.send();
}

export const getRepoList = (callback) => {
  // Get the data needed by vis-react for the repository network

  let repositoryData = new XMLHttpRequest();
  repositoryData.onreadystatechange = () => {
    if(repositoryData.readyState === 4) {
      if(repositoryData.status === 200) {
        let repos = JSON.parse(repositoryData.response);
        console.log(repositoryData.responseText);

        callback(repos);
      }
    }
  }
  let username = JSON.parse(localStorage.lastVisitedUser).login;
  repositoryData.open('GET', `https://api.github.com/users/${username}/repos`);
  repositoryData.setRequestHeader('Authorization', `token ${process.env.REACT_APP_GITHUB_API_TOKEN}`);
  repositoryData.send();
}

export const getRepositoryNetworkGraph = () => {
  let nodes = [
          {
            id: 1,
            label: localStorage.lastVisitedUser === undefined ?
              "" :
              JSON.parse(localStorage.lastVisitedUser).login
          },
          { id: 2, label: 'Node 2' },
          { id: 3, label: 'Node 3' },
          { id: 4, label: 'Node 4' },
          { id: 5, label: 'Node 5' }
      ];

  let edges = [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 2, to: 5 }
      ];

  var graph = {
      nodes: nodes,
      edges: edges
  };

  return graph;
}