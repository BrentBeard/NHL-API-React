import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state={
      player : "",
      playerObject: {} 
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.secondStats = this.secondStats.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  search(e) {
    e.preventDefault();
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
            axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/?expand=person.stats&stats=statsSingleSeason`, {
            }).then((playerList) => {
              const playerObject = playerList.data.people[0];
              if (playerObject.fullName === this.state.player) {
                this.setState({
                  playerObject
                })

                // console.log(playerObject.stats[0].splits[0].season)
                // console.log(playerObject.stats[0].splits[0].stat);
                let secondID = this.state.playerObject.id
                let playerSeason = playerObject.stats[0].splits[0].stat
                let iceTime = parseInt(playerSeason.timeOnIce)
                // console.log(iceTime)
              
                let perSixty =  (iceTime/60)
                console.log(playerSeason);
                console.log(perSixty);
                let shots60 = Math.round((playerSeason.shots / perSixty) *10 ) / 10;
                console.log(`shots60  ${shots60}`);
                let shotPct = playerSeason.shotPct;
                console.log(`sh%  ${shotPct}`);
                let goals60 = Math.round((playerSeason.goals / perSixty) *10 ) / 10;
                console.log(`goals60  ${goals60}`);
                let points60 = Math.round((playerSeason.points / perSixty) *10 ) / 10;
                console.log(`points60  ${points60}`)


            // axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/?expand=person.stats&stats=gameLog`, {
            // }).then((playerList) => {
            //   const playerObject = playerList.data.people[0];
            //   if (playerObject.fullName === this.state.player) {
            //     this.setState({
            //       playerObject
            //     }) 

            //     // console.log(playerObject.stats[0].splits[0].season)
            //     // console.log(playerObject.stats[0].splits[0].stat);
            //     let secondID = this.state.playerObject.id
            //     let playerGameLog = playerObject.stats[0].splits
            //     console.log(playerGameLog)



            //     for(let i = playerGameLog.length; i <= 0; i = i - 1){
            //     let roll = playerGameLog.pop()
            //     let tenGame = []
            //     tenGame.push(roll);
            //     while(tenGame.length === 10){
            //     console.log(tenGame);
            //     }
            //     }

            //     while(playerGameLog.length) {
            //       // console.log(playerGameLog.splice(0, 10));
            //       let tenGameArray= playerGameLog.splice(0, 10);
            //       console.log(tenGameArray)
            //       tenGameArray.map((game) => {
            //         console.log(game.stat.shotPct) 
                  
            //         // console.log(tenGameTotal)
            //       })
            //     }

                axios.get(`https://statsapi.web.nhl.com/api/v1/people/${secondID}/?expand=person.stats&stats=careerRegularSeason`, {
                }).then((res) => {
                  let playerCareer = res.data.people[0].stats[0].splits[0].stat;
                  console.log(playerCareer);
                  let iceTimeCareer = parseInt(playerCareer.timeOnIce)

                  let perSixtyCareer = (iceTimeCareer / 60)
                  console.log(playerCareer);
                  console.log(perSixtyCareer);
                  let shots60Career = Math.round((playerCareer.shots / perSixtyCareer) * 10) / 10;
                  console.log(`shots60Career  ${shots60Career}`);
                  let shotPctCareer = playerCareer.shotPct;
                  console.log(`sh%Career  ${shotPctCareer}`);
                  let goals60Career = Math.round((playerCareer.goals / perSixtyCareer) * 10) / 10;
                  console.log(`goals60Career  ${goals60Career}`);
                  let points60Career = Math.round((playerCareer.points / perSixtyCareer) * 10) / 10;
                  console.log(`points60Career  ${points60Career}`)
                  // let seasons = secondStats.stats[0].splits;
                  // seasons.map((season) => {
                  //   if(season.league.name === `National Hockey League`) {
                  //     console.log(season.stat);
                  //   }
                  // })
                }) 
              } 

            })
          })
        })

      })
    }) 
  }

  // secondStats() {
  //   if(this.state.playerObject !== '') {
  //     let secondID = this.state.playerObject.id
  //     axios.get(`https://statsapi.web.nhl.com/api/v1/people/${secondID}/?expand=person.stats&stats=yearByYear`, {
  //     }).then((res) => {
  //       console.log(res);
  //     }) 
  //   } 
  // } 


    render() {
      return (
        <div>
          <form onSubmit={this.search}>
          <label htmlFor="player">Player Name:</label>
            <input type="text" value={this.state.player} id="player" onChange={this.handleChange} />
            <input type="submit"/>
            <p>{this.state.playerObject.fullName}</p>
          </form>
          
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
