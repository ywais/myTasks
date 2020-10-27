import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [charted, setCharted] = useState([]);
  const [pieData, setPieData] = useState([]);

  const getData = async () => {
    let { data: imported } = await axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv');
    imported = imported.replace("Korea,", "Korea");
    imported = imported.replace("Bonaire,", "Bonaire");
    const lines = imported.split("\n");
    const resultArray = [];
    const headers = lines[0].split(",");
    for(let i = 1; i < lines.length; i++) {
      let lineObject = {display: ''};
      let currentline = lines[i].split(",");
      for(let j = 0; j < headers.length; j++) {
        lineObject[headers[j]] = currentline[j];
      }
      if(lineObject["Province/State"]) {
        lineObject.display = `${lineObject["Country/Region"]} (${lineObject["Province/State"]})`;
      } else {
        lineObject.display = lineObject["Country/Region"];
      }
      resultArray.push(lineObject);
    }
    resultArray.pop();
    setData(resultArray);
    setKeys(Object.keys(resultArray[0]));
  };

  useEffect(() => {
    getData();
  }, []);

  const getCharted = () => {
    const initCharted = [];
    for(let i = 5; i < keys.length; i++) {
      initCharted[i - 5] = {date: keys[i]};
    }
    setCharted(initCharted);
  }

  if(charted.length === 0) {
    if(keys.length > 0) {
      getCharted();
    }
  }

  const getCountries = () => {
    return data.map(line => {
      return <option value={line.display} key={line.display}>{line.display}</option>
    })
  }

  const firstChange = (value) => {
    setFirst(value);
    const selectedLine = data.findIndex(element => element.display === value);
    const newFirstCharted = [...charted];
    newFirstCharted.forEach(dot => {
      dot.first = parseInt(data[selectedLine][dot.date]);
    })
    setCharted(newFirstCharted);
    const newPieData = [...pieData];
    newPieData[0] = { name: value, value: parseInt(data[selectedLine][keys[keys.length - 1]]) };
    setPieData(newPieData);
  }

  const secondChange = (value) => {
    setSecond(value);
    const selectedLine = data.findIndex(element => element.display === value);
    const newSecondCharted = [...charted];
    newSecondCharted.forEach(dot => {
      dot.second = parseInt(data[selectedLine][dot.date]);
    });
    setCharted(newSecondCharted);
    const newPieData = [...pieData];
    newPieData[1] = { name: value, value: parseInt(data[selectedLine][keys[keys.length - 1]]) };
    setPieData(newPieData);
  }

  return (
    <div className="App">
      <label htmlFor="first">Choose first country: </label>
      <select name="first" id="first" onChange={event => firstChange(event.target.value)}>
        {getCountries()}
      </select><br />
      <label htmlFor="second">Choose second country: </label>
      <select name="second" id="second" onChange={event => secondChange(event.target.value)}>
        {getCountries()}
      </select>
      <h2>Confirmed cases - over time</h2>
      <LineChart width={600} height={300} data={charted}>
        <Line type="monotone" dataKey="first" name={first} stroke="blue" />
        <Line type="monotone" dataKey="second" name={second} stroke="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
      <h2>Confirmed cases - last day</h2>
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" cx={150} cy={150} >
          { pieData.map((element, index) => {
            return <Cell key={`cell-${index}`} fill={index === 0 ? "blue" : "red"} />
          }) }
        </Pie>
        <Tooltip />
      </PieChart>

    </div>
  );
}

export default App;
