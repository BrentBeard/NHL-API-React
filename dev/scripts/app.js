import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {

  componentDidMount() {
    axios.get(`https://statsapi.web.nhl.com/api/v1/teams/`, {
    }).then((res) => {
      const teams = res.data.teams;
      teams.map((team) => {
      const teamID = team.id;
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamID}/roster`, {
        }).then((newRes) => {
          const roster = newRes.data.roster;
          roster.map((player) => {
            const playerID = player.person.id;
            axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/?expand=person.stats&stats=gameLog`, {
            }).then((playerList) => {
              const playerObject = playerList.data.people[0];
              // console.log(playerObject);
            })
          })
        })

      })
    }) 
  }
    render() {
      return (
        <div>
          
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
