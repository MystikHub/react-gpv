
export const getActiveness = () => {
  // Get the user's public events

  let publicEvents = new XMLHttpRequest();
  publicEvents.onreadystatechange = () => {
    if(publicEvents.readyState === 4) {
      if(publicEvents.status === 200) {
        let events = JSON.parse(publicEvents.response);
      }
    }
  }
  let username = JSON.parse(localStorage.lastVisitedUser).login;
  publicEvents.open('GET', `https://api.github.com/users/${username}/events/public`);
  publicEvents.send();
}
