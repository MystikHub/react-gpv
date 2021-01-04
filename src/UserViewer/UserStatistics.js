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

async function getRepositoryNetworkGraphData() {
  let nodes = [
    {
      id: 0,
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
      'Authorization': `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
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
  
  console.log(response.data);
  console.log(`Response length: ${response.data.user.repositories.nodes.length}`);
  for(let i = 0; i < response.data.user.repositories.nodes.length; i++) {
    nodes.push({
      id: i + 1,
      label: response.data.user.repositories.nodes[i].name
    });
    edges.push({ from: 0, to: i + 1 });
  }

  console.log("Gonna return " + JSON.stringify({nodes, edges}) + "!");
  return {nodes, edges};
}
export { getRepositoryNetworkGraphData };
