import React, { useState, useEffect } from "react"
import { defaults, Line } from "react-chartjs-2"
import moment from "moment"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { Row, Col } from "react-bootstrap"

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

  const radios = [{ name: "Ideal", class: "ideal mx-2 my-2" }]
  const radioWarn = [
    { name: "Expression of pain on face", class: "warn mx-2 my-2" },
    {
      name: "Movement requiring gentle immobilization",
      class: "warn mx-2 my-2",
    },
  ]
  const radioPmip = [
    {
      name: "Pain and movement impeding procedure",
      class: "pain mx-2 my-2",
    },
  ]

  const radioPain = [
    {
      name: "Movement impeding procedure",
      class: "pain mx-2 my-2",
    },
    {
      name: "Pain impeding procedure",
      class: "pain mx-2 my-2",
    },
  ]

  const radioSed = [
    {
      name: "Airway intervention",
      class: "airway mx-2 my-2",
    },
    {
      name: "Over-sedated",
      class: "sed mx-2 my-2",
    },
  ]

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
          labels: [
            "Pain and movement impeding procedure",
            "Movement impeding procedure",
            "Pain impeding procedure",
            "Expression of pain on face",
            "Movement requiring gentle immobilization",
            "Ideal",
            "Airway intervention",
            "Over-sedated",
          ],
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
    <>
      <Row className="mx-auto text-center">
        <Col>
          <ButtonGroup toggle vertical="true">
            <ButtonGroup toggle>
              {radioPmip.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  size="xxl"
                  type="radio"
                  variant="light"
                  name="state"
                  value={radio.name}
                  checked={state === radio.name}
                  onChange={e => setState(e.currentTarget.value)}
                  className={radio.class}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br></br>
            <ButtonGroup toggle>
              {radioPain.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  size="xxl"
                  type="radio"
                  variant="light"
                  name="state"
                  value={radio.name}
                  checked={state === radio.name}
                  onChange={e => setState(e.currentTarget.value)}
                  className={radio.class}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br></br>
            <ButtonGroup toggle>
              {radioWarn.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  size="xxl"
                  type="radio"
                  variant="light"
                  name="state"
                  value={radio.name}
                  checked={state === radio.name}
                  onChange={e => setState(e.currentTarget.value)}
                  className={radio.class}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br></br>
            <ButtonGroup toggle>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  size="xxl"
                  type="radio"
                  variant="light"
                  name="state"
                  value={radio.name}
                  checked={state === radio.name}
                  onChange={e => setState(e.currentTarget.value)}
                  className={radio.class}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br></br>
            <ButtonGroup toggle>
              {radioSed.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  size="xxl"
                  type="radio"
                  variant="light"
                  name="state"
                  value={radio.name}
                  checked={state === radio.name}
                  onChange={e => setState(e.currentTarget.value)}
                  className={radio.class}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line data={data} options={options} />
        </Col>
      </Row>
    </>
  )
}
