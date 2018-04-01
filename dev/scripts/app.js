import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Bar, Doughnut} from 'react-chartjs-2';

class App extends React.Component {
  constructor() {
    super();
    this.state={
      player : "",
      chart: '',
      playerObject: {},
      shootingData: {},
      productionData: {},
      pointTotals: {},
      points: '',
      toi: '',
      shots60: '',
      shotPct: '',
      goals60: '',
      points60: '',
      shots60Career: '',
      shotPctCareer: '',
      goals60Career: '',
      points60Career: ''
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
                let playerSeason = playerObject.stats[0].splits[0].stat
                let iceTime = parseInt(playerSeason.timeOnIce)
                // console.log(iceTime)

                let perSixty = (iceTime / 60)
                console.log(playerSeason);
                // console.log(perSixty);
                let shots60 = Math.round((playerSeason.shots / perSixty) * 10) / 10;
                // console.log(`shots60  ${shots60}`);
                let shotPct = playerSeason.shotPct;
                // console.log(`sh%  ${shotPct}`);
                let goals60 = Math.round((playerSeason.goals / perSixty) * 10) / 10;
                // console.log(`goals60  ${goals60}`);
                let points60 = Math.round((playerSeason.points / perSixty) * 10) / 10;
                // console.log(`points60  ${points60}`)
                let ppGoals = playerSeason.powerPlayGoals;
                let ppAssists = playerSeason.powerPlayPoints - ppGoals;
                let evGoals = playerSeason.goals - ppGoals;
                let evAssists = playerSeason.assists - ppAssists;
                let points = playerSeason.points;
                let toi = playerSeason.timeOnIcePerGame;


                this.setState({
                  playerObject,
                  chart: 'go',
                  points,
                  toi
                  // shots60,
                  // shotPct,
                  // goals60,
                  // points60
                })
                console.log({playerObject})
                // console.log(playerObject.stats[0].splits[0].season)
                // console.log(playerObject.stats[0].splits[0].stat);
                
                let secondID = this.state.playerObject.id




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

                  this.setState({
                    shootingData: {
                      // labels: [`Shots/60`, `Career Shots/60`, `Sh%`, `Career sh%`],
                      labels: [`Shots/60 Mins`, `Sh%`],
                      // datasets: [
                      // REGULAR BAR CHART SETUP
                      //   {
                      //     data: [shots60, shots60Career, shotPct, shotPctCareer],
                      //     backgroundColor: [`#FF652F`, `#FFE400`, `#FF652F`, `#FFE400`],
                      //     borderColor: 'black',
                      //     borderWidth: 2
                      //   }
                      // ]
                      datasets: [
                        // GROUPED BAR CHART SET UP
                        {
                          label: `This Season`,
                          backgroundColor: `#9a3334`,
                          borderColor: 'black',
                          borderWidth: 2,
                          data: [shots60, shotPct]
                        },
                        {
                          label: `Career Average`,
                          backgroundColor: `#217c7e`,
                          borderColor: 'black',
                          borderWidth: 2,
                          data: [shots60Career, shotPctCareer]
                        }
                      ]
                    },
                    productionData: {
                      // labels: [`Goals/60`, `Career Goals/60`, `Points/60`, `Career Points/60`],
                      labels: [`Goals/60 Mins`, `Points/60 Mins`],
                      // datasets: [
                      //   {
                      //     data: [goals60, goals60Career, points60, points60Career],
                      //     backgroundColor: [`#FF652F`, `#FFE400`, `#FF652F`, `#FFE400`],
                      //     borderColor: 'black',
                      //     borderWidth: 2
                      //   }
                      // ]
                      datasets: [
                        // GROUPED BAR CHART SET UP
                        {
                          label: `This Season`,
                          backgroundColor: `#9a3334`,
                          borderColor: 'black',
                          borderWidth: 2,
                          data: [goals60, points60]
                        },
                        {
                          label: `Career Average`,
                          backgroundColor: `#217c7e`,
                          borderColor: 'black',
                          borderWidth: 2,
                          data: [goals60Career, points60Career]
                        }
                      ]
                    }, 
                    pointTotals: {
                      labels: [`PP Goals`, `PP Assists`, `ES Goals`, `ES Assists`],
                      datasets: [
                        {
                          label: `Season Point Totals`,
                          data: [ppGoals, ppAssists, evGoals, evAssists],
                          backgroundColor: [`#24305E`, `#374785`, `#F76C6C`, `#FCCD04` ],
                          borderColor: `black`,
                          borderWidth: 2
                        }
                      ]
                    }                   
                  })

                  // this.setState({
                  //   shots60Career,
                  //   shotPctCareer,
                  //   goals60Career,
                  //   points60Career
                  // })
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



    render() {
      let ShootingChart;
      if(this.state.chart !== '') {
        ShootingChart = ( <React.Fragment><Bar data={this.state.shootingData} options={{
          title: {
            display: true,
            text: `Shooting: Season vs Career`
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [],
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 25,
                }
              }
            ]
          }
        }} /></React.Fragment> )
      }
      else {
        ShootingChart = (<div></div>)
      }
      let ProductionChart;
      if(this.state.chart !== '') {
        ProductionChart = ( <React.Fragment>
          <Bar data={this.state.productionData} options={{
            title: {
              display: true,
              text: `Production: Season vs Career`
            },
            legend: {
              display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [],
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 4,
                  },
                }
              ]
            }
          }} />
        </React.Fragment> )
      } else {
        ProductionChart = (<div></div>)
      }
      let PointTotals;
      if(this.state.chart !== '') {
        PointTotals = ( <React.Fragment>
          <p>{`${this.state.points} Points`}</p>
          <p>{`Average TOI/Game: ${this.state.toi}`}</p>
          <Doughnut data={this.state.pointTotals} options={{
            title: {
              display: true,
              text: `Season Point Totals`
            },
            responsive: true,
            maintainAspectRatio: false,
          }} />
        </React.Fragment> )
      }
      return (
        <React.Fragment>
          <h1>Shooting Talent Evaluations</h1>
          <h2>Hot or cold? Born this way? Find out, search any active NHL player.</h2>

          <form className="playerForm" onSubmit={this.search}>
          <label htmlFor="player">Spelling is important(for now):</label>
            <input className="playerInput" type="text" value={this.state.player} id="player" onChange={this.handleChange} />
            <input className="submit" type="submit"/>
          </form>          
          <p className="playerName">{this.state.playerObject.fullName}</p>


          <div className="chartContainer">
            <div className="barBox">
            {ShootingChart}
            </div>
            <div className="barBox">
            {ProductionChart}
            </div>
            <div className="doughnutBox">
              {PointTotals}
            </div>

          </div>
        </React.Fragment>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
