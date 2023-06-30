//imports for getting data from backend
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CircleLoader from "../components/CircleLoader";
import TeamInfo from "../components/TeamInfo";
import GameGrid from "../components/GameGrid";
import Multiple from "../components/Multiple";

function Dashboard() {
  // const that were alr in TeamData
  const [matchData, setMatchData] = useState([]);
  const [pitData, setPitData] = useState([]);
  const [teamNumber, setTeamNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamComponent, setTeamComponent] = useState(<div></div>);
  const [error, setError] = useState(false);
  useEffect(() => {}, []);

  function getTeam() {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("jwt"),
      },
    };
    let matchEntries = [];
    let pitEntry = {};
    axios
      .get(
        `https://backend2022-ss-production.up.railway.app/api/v1/datasets/datasetId/635f3325d8d60836449c42ac/teamNumber/${teamNumber}`,
        config
      )
      .then((res) => {
        pitEntry = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const xLabels = new Array(9).fill(0).map((_, i) => `${i}`);
  const yLabels = ["High", "Mid", "Low"];
  const data = new Array(yLabels.length)
    .fill(0)

    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );

  // ReactDOM.render(
  //   <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />,
  //   document.getElementById("app")
  // );

  const options = {};

  return (
    <div>
      {/* <Bar data={data} options={options}></Bar> */}
      {/* <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} /> */}
      <GameGrid></GameGrid>
      {/* <Multiple></Multiple> */}
    </div>
  );
}
export default Dashboard;
