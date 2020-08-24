import React, { useState, useEffect } from "react"
import { defaults, Line } from "react-chartjs-2"
import moment from "moment"
defaults.global.defaultFontFamily = "Fira Code"

export default function RadioHook() {
  const [state, setState] = useState("ideal")

  const [states, setStates] = useState([])
  const [times, setTimes] = useState([])
  const data = {
    labels: times,
    datasets: [
      {
        label: "Sedation state",
        fill: false,
        borderColor: "#e4e4e4",
        data: states,
        steppedLine: true,
      },
    ],
  }

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          type: "category",
          labels: ["pain", "ideal"],
        },
      ],
    },
  }

  useEffect(() => {
    // change this to sending to database
    const time = Date()
    const data = [state, time]
    console.log(data)
  }, [state])

  //code below logs state and time to console every second

  useEffect(() => {
    const interval = setInterval(() => {
      setStates(states => states.concat(state))
      setTimes(times => times.concat(moment().format("h:mm:ss A")))
      //   console.log(states)
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <input
        checked={state === "ideal"}
        type="radio"
        id="ideal"
        name="state"
        value="ideal"
        onChange={e => setState(e.currentTarget.value)}
      />
      <label htmlFor="ideal">Ideal</label>
      <br />
      <input
        checked={state === "pain"}
        type="radio"
        id="pain"
        name="state"
        value="pain"
        onChange={e => setState(e.currentTarget.value)}
      />
      <label htmlFor="pain">Pain</label>
      <br />
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
