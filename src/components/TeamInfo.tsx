import { Grid, Typography, FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import DataEntry from "../pages/DataEntry";

interface Sums {
  [key: string]: number;
}


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

//This page could be done with loops but I am too fucking lazy and my brain is fried before comp
//Absolutely redo this page next year
function TeamInfo(props) {
  const [proportions, setProportions] = useState<Sums>({});
  const [averages, setAverages] = useState<Sums>({});
  const [list, setList] = useState<
  Array<{
      key: number,
      value: number
  }>
>([])
  const [comments, setComments] = useState([]);

  var dataGridSuccess = [
    {  C1: 0, C2: 0, C3: 0 , C4: 0, C5: 0, C6: 0, C7: 0, C8: 0, C9: 0 },//The table, goal is to fill these 0s with the values in the 2d array
    {  C1: 0, C2: 0, C3: 0 , C4: 0, C5: 0, C6: 0, C7: 0, C8: 0, C9: 0},
    { C1: 0, C2: 0, C3: 0 , C4: 0, C5: 0, C6: 0, C7: 0, C8: 0, C9: 0},
  ]
  const [dataType, setDataType] = useState('');//On change components
  let matchNumber: number[] = [0,12];//used to test if chart works, you may deleted these
  let gridCompleted: number[] = [0,3];//used to test if chart works, you may deleted these
  let gridAutonSuccess: number[][] = [];//tring to get the 2D array
  var data = {//data input for the line charts
    labels: matchNumber,//x values, 1D array fitable
    datasets: [
      {
        label: "data",
        data: gridCompleted,//y values, 1D array fitable
        backgroundColor: "#d89ce4",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  var dataDoughnut = {//data input for the doughnut charts
    labels: ["1", "2"],
    datasets: [
      {
        label: "data",
        data: [2,9],//Variables in the doughnut chart,an 1D array is fitable.
        backgroundColor: ["#d89ce4", "#88a4e2"],
        borderColor: ["black", "#d89ce4"],
        borderWidth: 1,
      },
    ],
  };
  var options = { aspectRatio: 2 };//size of the graphs, used by both line and doughnut chart
  console.log(props.matchEntries)

  let handler = {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : 0;
    },
  };
  let stats = {};
  useEffect(() => {
    getTeamStats();
    console.log(props.pitEntry);
    const resp = axios.get('`https://backend2022-ss-production.up.railway.app/api/v1/datasets/datasetId/63cca5ef93416092590040f9/teamNumber/${teamNumber}`');
    console.log(resp)
    console.log(gridAutonSuccess[0])//this code have successfully got out the 2D array, but I'm currently thinking about how to get it into Line 47, because it only exist in useEffect
    // if (props.teamEntries.length > 0) {
    //   console.log("hi");
    // }
  }, []);

  function handleChange(e) {
    setDataType(e.target.value);
    console.log(dataType)//The variable dataType gets whatever the user choose in the dropdown, update eachtime the user make changes to the dropdown
    // console.log(user);
  }

  function getTeamStats() {
    let tempSum = {};
    let tempRates = {};
    let tempLists = [{},{}];//Casey made this function which fried my head
    let rates = new Proxy(tempRates, handler);
    let sums = new Proxy(tempSum, handler);
    let lists = new Proxy(tempLists, handler);
    let tempComments = [];
    // props.matchEntries.forEach((entry) => {
    //   Object.keys(entry.fields).forEach((field) => {
    //     console.log(entry.fields[field]);
    //     if (
    //       typeof entry.fields[field] === "object" &&
    //       entry.fields[field] != null
    //     ) {
    //       Object.keys(entry.fields[field]).forEach((option) => {
    //         if (typeof entry.fields[field][option] === "number") {
    //           sums[field + option] = entry.fields[field][option];
    //         } else {
    //           sums[field + option] = 1;
    //         }
    //       });
    //     }
    //     // else if (typeof entry[field] === 'string')
    //     // {

    //     // }
    //     else if (typeof entry.fields[field] === "number") {
    //       sums[field] = entry.fields[field];
    //     }
    //   });
    // });
    let entryFields = props.matchEntries
      .map((entry) => {
        return entry.fields;
      })
      .filter(
        (obj) => obj.matchType !== "Practice" && !obj.markForReview.review
      );
    console.log(entryFields);
    entryFields.forEach((entry) => {
      rates["exitTarmac"] +=
        entry["leftTarmac"] === "Yes" || entry["leftTarmac"] === "Yes\n"//IDK what these parts are for
          ? 1
          : 0;
      rates["climbed"] +=
        entry["climbed"] === "Attempted" || entry["climbed"] === "Attempted\n"
          ? 1
          : 0;
      rates["rungLow"] +=
        entry["maxRung"] === "Low" || entry["maxRung"] === "Low\n" ? 1 : 0;
      rates["rungMid"] +=
        entry["maxRung"] === "Mid" || entry["maxRung"] === "Mid\n" ? 1 : 0;
      rates["rungHigh"] +=
        entry["maxRung"] === "High" || entry["maxRung"] === "High\n" ? 1 : 0;
      rates["rungTraversal"] +=
        entry["maxRung"] === "Traversal" || entry["maxRung"] === "Traversal\n"
          ? 1
          : 0;
      rates["collectOrNo"] +=
        entry["collectOrNo"] === "Yes" || entry["collectOrNo"] === "Yes\n"
          ? 1
          : 0;
      rates["shootOrNo"] +=
        entry["shootOrNo"] === "Yes" || entry["shootOrNo"] === "Yes\n" ? 1 : 0;
      rates["robotDefenseOrNo"] +=
        entry["robotDefenseOrNo"] === "Yes" ||
        entry["robotDefenseOrNo"] === "Yes\n"
          ? 1
          : 0;
      // sums["lowPortAutonFail"] += entry.lowPortAuton.fail;
      // sums["lowPortAutonSuccess"] += entry.lowPortAuton.success;
      // sums["highPortAutonFail"] += entry.highPortAuton.fail;
      // sums["highPortAutonSuccess"] += entry.highPortAuton.success;
      // sums["lowPortTeleopFail"] += entry.lowPortTeleop.fail;
      // sums["lowPortTeleopSuccess"] += entry.lowPortTeleop.success;
      // sums["highPortTeleopFail"] += entry.highPortTeleop.fail;
      // sums["highPortTeleopSuccess"] += entry.highPortTeleop.success;
      // sums["terminalFail"] += entry.terminal.failure;
      // sums["terminalSuccess"] += entry.terminal.success;
      sums["driverSkill"] += entry.driverSkill;
      sums["robotSpeed"] += entry.robotSpeed;//These entries no longer exist, so i commented them out
      sums["defense"] += entry.defense;
      console.log(entry.gridAuton)
      //sums["dockedSuccess"] += entry.dockedSuccess;
      // sums["bottomRowAutonCones"] += entry.bottomRowAuton.Cones;
      // sums["bottomRowAutonCubes"] += entry.bottomRowAuton.Cubes;
      // sums["middleRowAutonCones"] += entry.middleRowAuton.Cones;
      // sums["middleRowAutonCubes"] += entry.middleRowAuton.Cubes;
      // sums["topRowAutonCones"] += entry.topRowAuton.Cones;
      // sums["topRowAutonCubes"] += entry.topRowAuton.Cubes;
      // sums["chargingStationAuton"] = entry.chargingStationAuton;
      // sums["bottomRowTeleopCones"] += entry.bottomRowTeleop.Cones;
      // sums["bottomRowTeleopCubes"] += entry.bottomRowTeleop.Cubes;
      // sums["middleRowTeleopCones"] += entry.middleRowTeleop.Cones;
      // sums["middleRowTeleopCubes"] += entry.middleRowTeleop.Cubes;
      // sums["topRowTeleopCones"] += entry.topRowTeleop.Cones;
      // sums["topRowTeleopCubes"] += entry.topRowTeleop.Cubes;
      // matchNumber.push(entry.matchNumber)
      // gridCompleted.push(entry.bottomRowTeleop.Cones+entry.bottomRowTeleop.Cubes+entry.middleRowTeleop.Cones+entry.middleRowTeleop.Cubes+entry.topRowTeleop.Cones+entry.topRowTeleop.Cubes)
      // console.log(matchNumber);
      // console.log(gridCompleted);
      //sums["gridAuton"] += entry.gridAuton[0][0];
      console.log(entry.gridAuton);
      gridAutonSuccess = entry.gridAuton;//tested to print out the 2d arry
      console.log(gridAutonSuccess);
      lists["gridAuton"] += entry.gridAuton;
      // Object.keys(entry).forEach((field) => {
      //   if (typeof entry[field] === "number") {
      //     sums[field] += entry[field];
      //   }
      // });
      tempComments.push(entry.comments);
    });
    Object.keys(rates).forEach((i) => {
      rates[i] /= entryFields.length;
    });
    Object.keys(sums).forEach((i) => {
      sums[i] /= entryFields.length;
    });
    rates = {
      ...rates,
      rungLow: rates.rungLow / rates.climbed,
      rungMid: rates.rungMid / rates.climbed,
      rungHigh: rates.rungHigh / rates.climbed,
      rungTraversal: rates.rungTraversal / rates.climbed,
    };
    setProportions(rates);
    setAverages(sums);
    setList(lists);
    setComments(tempComments);
    console.log(rates);//Casey created these "rates" and "sums" and I do not understand their reason of existence
    console.log(sums);
    console.log(lists);
  }

  console.log(gridAutonSuccess);

  return (
    <Grid className="py-5">
      <hr />
      <Typography variant="h4">Team {props.teamNumber}</Typography>
      <br />

      <Typography variant="h5">Average Stats</Typography>
      <br></br>
      <Typography variant="h5">Auton</Typography>
      {/* <Typography>Bottom Row Cones: {averages.bottomRowAutonCones}</Typography>
      <Typography>Bottom Row Cubes: {averages.bottomRowAutonCubes}</Typography>
      <Typography>Middle Row Cones: {averages.middleRowAutonCones}</Typography>
      <Typography>Middle Row Cubes: {averages.middleRowAutonCubes}</Typography>
      <Typography>Top Row Cones: {averages.topRowAutonCones}</Typography>
      <Typography>Top Row Cubes: {averages.topRowAutonCubes}</Typography>
      <Typography>
        chargingStationAuton: {averages.chargingStationAuton}
      </Typography>
      <Typography>
        Exited Tarmac Rate: {Math.floor(100 * proportions.exitTarmac) + "%"}
      </Typography> */}

{ <Typography>Bottom Row Cubes: {gridAutonSuccess}</Typography> }
{/* { <Typography>Bottom Row Cubes: {props.matchEntries}</Typography> } */}

      
      <table>
        <tr>
          {/* table components */}
          <th>Col 1</th>
          <th>Col 2</th>
          <th>Col 3</th>
          <th>Col 4</th>
          <th>Col 5</th>
          <th>Col 6</th>
          <th>Col 7</th>
          <th>Col 8</th>
          <th>Col 9</th>
        </tr>
        {dataGridSuccess.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.C9}</td>
              <td>{val.C8}</td>
              <td>{val.C7}</td>
              <td>{val.C6}</td>
              <td>{val.C5}</td>
              <td>{val.C4}</td>
              <td>{val.C3}</td>
              <td>{val.C2}</td>
              <td>{val.C1}</td>
            </tr>
          )
        })}
      </table>



      {/* Everything below may be changed according to what data is needed */}
      <hr />
      <Typography variant="h5">Teleop</Typography>
      <Typography>Bottom Row Cones: {averages.bottomRowTeleopCones}</Typography>
      <Typography>Bottom Row Cubes: {averages.bottomRowTeleopCubes}</Typography>
      <Typography>Middle Row Cones: {averages.middleRowTeleopCones}</Typography>
      <Typography>Middle Row Cubes: {averages.middleRowTeleopCubes}</Typography>
      <Typography>Top Row Cones: {averages.topRowTeleopCones}</Typography>
      <Typography>Top Row Cubes: {averages.topRowTeleopCubes}</Typography>
      <hr />

      <Typography variant="h5">Endgame</Typography>
      <Typography>
        Climb Attempt Rate: {Math.floor(100 * proportions.climbed) + "%"}
      </Typography>
      <Typography>
        Low Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungLow) + "%"}
      </Typography>
      <Typography>
        Mid Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungMid) + "%"}
      </Typography>
      <Typography>
        High Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungHigh) + "%"}
      </Typography>
      <Typography>
        Traversal Rung Percent of Attempted:{" "}
        {Math.floor(100 * proportions.rungTraversal) + "%"}
      </Typography>
      <hr />

      <Typography variant="h5">Match Review</Typography>
      <Typography>
        Did the Robot Collect Cargo:{" "}
        {Math.floor(100 * proportions.collectOrNo) + "%"}
      </Typography>
      <Typography>
        Did the Robot Shoot Cargo:{" "}
        {Math.floor(100 * proportions.shootOrNo) + "%"}
      </Typography>
      <Typography>Driver Skill: {averages.driverSkill}</Typography>
      <Typography>Robot Speed: {averages.robotSpeed}</Typography>
      <Typography>
        Did the Robot play Defense:{" "}
        {Math.floor(100 * proportions.robotDefenseOrNo) + "%"}
      </Typography>
      <Typography>Defense: {averages.defense}</Typography>
      <Typography>Comments: </Typography>
      {comments.map((comment) => (
        <div>
          <Typography>{comment + "\n"} </Typography>
          <br />
        </div>
      ))}
      <hr />

      <Typography variant="h5">Robot Info</Typography>
      {props.pitEntry.length > 0 ? (
        <img
          src={props.pitEntry[0].imageLink}
          style={{ width: 300, float: "left" }}
        ></img>
      ) : (
        <Typography>No image found</Typography>
      )}
      <FormControl fullWidth>
  <InputLabel id="lineChartData">Data Type</InputLabel>
  <Select
    labelId="lineChartData"
    id="lineChartData"
    value={dataType}
    label="Data Type"
    onChange={handleChange}
  >
    {/* The dropdown components, you can change the "twenty" to whatever types of graph you want */}
    <MenuItem value={'Auton'}>Auton</MenuItem>
    <MenuItem value={'Teleop'}>Teleop</MenuItem>
  </Select>
</FormControl>
{/* Line Chart components */}
      <div>
        <Line id="choice" data={data} options={options}></Line>
      </div>
      {/* Doughnut chart componenets */}
      <div>
        <Doughnut data={dataDoughnut} options={options}></Doughnut>
        <Doughnut data={dataDoughnut} options={options}></Doughnut>
      </div>
    </Grid>
  );
}

export default TeamInfo;