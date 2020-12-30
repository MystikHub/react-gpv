# react-gpv
Web app that provides insights and visualizations for GitHub profiles

This Node.js app provides a simple interface to make two types of requests to the GitHub API. The app takes in a username and "List repos" or "User info" and makes the appropriate API calls to `api.github.com`.

The app uses [Material UI](https://material-ui.com/) for the user interface and runs on Node 14.15.3 (LTS at the time of writing, based on the `node` container with the `lts` tag on [Docker Hub](https://hub.docker.com/_/node/)).[

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

If you're on macOS or Linux, you can run the bash script `run.sh` to build and run the docker container. If you're on Windows, open the script and run the commands manually.

## Remaining tasks:
- [ ] Rough user interface mockup

Overview and influence page
- [ ] User summary
- [ ] Level of activity: Enthusiast (100%-50% days) Active member (50-30% days), Lurker (<30%)
- [ ] Role (Programmer, maintainer, problem solver)
- [ ] User frequently works with 
- [ ] Network
- [ ] User's repositories

Proficiency
- [ ] Favorite languages
- [ ] Code changes (+x lines - y lines, bar graph up to 1 month, dropdown menu, hidden for no data)
- [ ] ???

Achievements (extra features, only if there's extra time available): 
- List of locked and unlocked achievements
- [ ] We have a problem - open 10 issues
- [ ] Got the bug repellant! - close 10 issues
- [ ] Age - >10 years: veteran, >4 years:  >2 years: apprentice, >1 year: novice, <1 year: newbie

Other visualizations
- [ ] Node graph of lanugages -> projects
- [ ] Node graph of users -> projects