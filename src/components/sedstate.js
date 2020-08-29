import React, { useState, useEffect, useRef } from "react"
import { gql, useMutation } from "@apollo/client"
import { getProfile } from "../utils/auth"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap"
import moment from "moment"
import { FaCheck } from "react-icons/fa"

//Optional chart
// import { defaults, Line } from "react-chartjs-2"
// defaults.global.defaultFontFamily = "Fira Code"
//

export default function SedationState({ client }) {
  const [pid, setPid] = useState(null)
  const [state, setState] = useState(null)
  const [sync, setSync] = useState("Synced time")
  const mutation = gql`
    mutation statesMutation(
      $user_id: String = ""
      $time: String = ""
      $state: String = ""
      $pid: String = ""
    ) {
      insert_states(
        objects: { pid: $pid, state: $state, time: $time, user_id: $user_id }
      ) {
        returning {
          id
        }
      }
    }
  `
  const [
    updateStates,
    {
      // loading: mutationLoading, //uncomment if a loading sign is wanted
      error: mutationError,
    },
  ] = useMutation(mutation)

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

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const user = getProfile()
      updateStates({
        variables: {
          pid: pid,
          state: state,
          time: moment().format("YYYY-MM-DD h:mm:ss SSS"),
          user_id: user["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
        },
      })
    } else {
      isMounted.current = true
    }
  }, [state])

  //Chart

  // const [states, setStates] = useState([])
  // const [times, setTimes] = useState([])
  // const data = {
  //   labels: times,
  //   datasets: [
  //     {
  //       label: "Sedation state",
  //       fill: false,
  //       borderColor: "#e4e4e4",
  //       data: states,
  //       steppedLine: true,
  //     },
  //   ],
  // }

  // const options = {
  //   elements: {
  //     point: {
  //       radius: 0,
  //     },
  //   },
  //   scales: {
  //     yAxes: [
  //       {
  //         type: "category",
  //         labels: [
  //           "Pain and movement impeding procedure",
  //           "Movement impeding procedure",
  //           "Pain impeding procedure",
  //           "Expression of pain on face",
  //           "Movement requiring gentle immobilization",
  //           "Ideal",
  //           "Airway intervention",
  //           "Over-sedated",
  //         ],
  //       },
  //     ],
  //   },
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStates(states => states.concat(state))
  //     setTimes(times => times.concat(moment().format("h:mm:ss A")))
  //     //   console.log(states)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // })

  ///

  return (
    <>
      <Container className="mx-auto text-center">
        <Row>
          <Col>
            {/* {mutationLoading && (
              <Alert variant="info">Sending to database...</Alert>
            )} */}
            {mutationError && (
              <Alert variant="warning">Error sending to database</Alert>
            )}
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Enter a participant ID in this box to enable the buttons"
              onChange={e => setPid(e.currentTarget.value)}
            />
            <br></br>
            <Row>
              <Col className="mx-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={e =>
                    setSync(moment().format("YYYY-MM-DD h:mm:ss SSS"))
                  }
                >
                  Sync with video
                </Button>
              </Col>
              <Col className="mx-auto">
                <Button variant="outline-light disabled" size="lg">
                  {sync}
                </Button>
              </Col>
            </Row>
            <br></br>
            <p>Select sedation state</p>
            <ButtonGroup toggle vertical="true">
              <ButtonGroup toggle>
                {radioPmip.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    size="lg"
                    type="radio"
                    variant="light"
                    name="state"
                    value={radio.name}
                    checked={state === radio.name}
                    onChange={e => setState(e.currentTarget.value)}
                    className={radio.class}
                    disabled={pid === null}
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
                    size="lg"
                    type="radio"
                    variant="light"
                    name="state"
                    value={radio.name}
                    checked={state === radio.name}
                    onChange={e => setState(e.currentTarget.value)}
                    className={radio.class}
                    disabled={pid === null}
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
                    size="lg"
                    type="radio"
                    variant="light"
                    name="state"
                    value={radio.name}
                    checked={state === radio.name}
                    onChange={e => setState(e.currentTarget.value)}
                    className={radio.class}
                    disabled={pid === null}
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
                    size="lg"
                    type="radio"
                    variant="light"
                    name="state"
                    value={radio.name}
                    checked={state === radio.name}
                    onChange={e => setState(e.currentTarget.value)}
                    className={radio.class}
                    disabled={pid === null}
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
                    size="lg"
                    type="radio"
                    variant="light"
                    name="state"
                    value={radio.name}
                    checked={state === radio.name}
                    onChange={e => setState(e.currentTarget.value)}
                    className={radio.class}
                    disabled={pid === null}
                    icon="add"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </ButtonGroup>
          </Col>
        </Row>
        {/* <Row>
          <Col><Line data={data} options={options} /></Col>
        </Row> */}
      </Container>
    </>
  )
}
