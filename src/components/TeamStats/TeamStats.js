import React, { useState, useEffect } from "react";
import { Line,Bar , Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";

const TeamStats = () => {
  const [chartData, setChartData] = useState({});
  const [teamName, setteamName] = useState([]);
  const [participantNumber, setparticipantNumber] = useState([]);

  const chart = () => {
    let teamName = [];
    let participantNumber = [];
      axios.get('http://localhost:8082/teams/allTeams')
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
            teamName.push((dataObj.teamName));
            participantNumber.push(parseInt(dataObj.participantNumber));
        }
        setChartData({
          labels: teamName ,
          datasets: [
            {
              label: "Number of participants",
              data: participantNumber,
              backgroundColor: ["rgb(61, 105, 175)"],
              borderWidth: 3
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(teamName, participantNumber);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
      <>


      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>


    </>
  );
};

export default TeamStats;