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

export const getLanguagePreferences = (callback) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN ?? ""}`
    },
    body: JSON.stringify({
      query: `
        {
          user(login: "${JSON.parse(localStorage.lastVisitedUser).login}") {
            repositories(last: 100) {
              nodes {
                name
                collaborators(last: 100) {
                  nodes {
                    login
                  }
                }
              }
            }
          }
        }`
    })
  })
    .then(response => response.json());
  return 0;
}

async function getRepositoryNetworkGraphData() {
  let nodes = [
    {
      id: -1,
      label: localStorage.lastVisitedUser === undefined ?
        "" :
        JSON.parse(localStorage.lastVisitedUser).login
    }
  ];

  let edges = [];
	
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN ?? ""}`
    },
    body: JSON.stringify({
      query: `
        {
          user(login: "${JSON.parse(localStorage.lastVisitedUser).login}") {
            repositories(last: 100) {
              nodes {
                name
                collaborators(last: 100) {
                  nodes {
                    login
                  }
                }
              }
            }
          }
        }`
    })
  })
    .then(response => response.json());

  if(response.data === undefined)
    return {nodes: [], edges: []};
  
  // Add repo nodes and edges
  console.log(response.data);
  console.log(`Response length: ${response.data.user.repositories.nodes.length}`);
  let latestNodeId = -1;
  for(let i = 0; i < response.data.user.repositories.nodes.length; i++) {
    latestNodeId++;
    nodes.push({
      id: latestNodeId,
      label: response.data.user.repositories.nodes[i].name
    });
    edges.push({ from: -1, to: i });
  }

  // Add contributor nodes and edges
  for(let i = 0; i < response.data.user.repositories.nodes.length; i++) {
    // Check if we got back any collaborators
    if(response.data.user.repositories.nodes[i].collaborators !== null) {
      for(let j = 0; j < response.data.user.repositories.nodes[i].collaborators.nodes.length; j++) {
        // Don't add the analyzed user
        if(response.data.user.repositories.nodes[i].collaborators.nodes[j].login !== JSON.parse(localStorage.lastVisitedUser).login) {
          latestNodeId++;
          nodes.push({
            id: latestNodeId,
            label: response.data.user.repositories.nodes[i].collaborators.nodes[j].login
          });
          edges.push({ from: i, to: latestNodeId });
        }
      }
    }
  }

  return {nodes, edges};
}
export { getRepositoryNetworkGraphData };
