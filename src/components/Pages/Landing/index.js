import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import * as Settings from '../../../constants/settings';


class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playersRankInfo: []
    }
  };

  componentDidMount() {
    console.log('123');
    this.props.firebase.playerDatas().once('value').then((snapshot) => {
      if (snapshot.val()) {
        console.log(snapshot.val());
        const playerDataList = Object.keys(snapshot.val()).map(key => ({
          name: key,
          ...snapshot.val()[key],
        }))
        console.log(playerDataList);
        this.sortPlayerData(snapshot.val());



      }
    })
  }

  sortPlayerData = (data) => {
    let output = []

    for (let playerName in data) {
      let totalScore = 0;
      let totalExp = 0;
      let name = playerName;

      for (let key in data[playerName]) {
        let playerData = data[playerName][key];
        totalScore += playerData.score;

        if (playerData.score > 0)
          totalExp += playerData.score;
      }
      let playerRankInfo = {
        name,
        totalScore,
        totalExp,
        totalMoney: totalScore * Settings.pointValue
      };
      output.push(playerRankInfo);
    }

    output.sort(function (a, b) {
      return new Date(b.totalScore) - new Date(a.totalScore);
    });

    this.setState({
      playersRankInfo: output
    })
  }

  render() {

    const {
      playersRankInfo
    } = this.state;
    console.log(playersRankInfo);

    return (
      <div>
        landing
        <table className="table" style={{maxWidth:'0%'}}>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Score</td>
              <td>Money</td>
              <td>Exp</td>
            </tr>
          </thead>
          <tbody>
            {
              playersRankInfo.map((item, i) =>
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.name}</td>
                  <td>{item.totalScore}</td>
                  <td>{item.totalMoney>0 ? '$' + item.totalMoney : '-$' + item.totalMoney * -1}</td>
                  <td>{item.totalExp}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default withFirebase(Landing);
