import React, { useState, useEffect, useRef } from "react"
import { getProfile } from "../utils/auth"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import Sync from "../components/sync"
import moment from "moment"
import CsvDownloader from "react-csv-downloader"
import { useMutation } from "@apollo/client"
import mutation from "../queries/mutation.gql"

//classNames and values for sedation state buttons
const radios = require("../data/radio.json")

export default function SedationState({ client }) {
  //hook for entering participant ID
  const [pid, setPid] = useState(null)
  //hook for value of sedation state buttons
  const [state, setState] = useState(null)
  //hook for csv download
  const [states, setStates] = useState([])

  //hook for sending query to database
  const [updateStates, { error: mutationError }] = useMutation(mutation)

  //hook for updating state on button press but not on first load
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

      // data for csv download
      setStates(states => [
        ...states,
        { states: state, time: moment().format("YYYY-MM-DD h:mm:ss SSS") },
      ])
      //
    } else {
      isMounted.current = true
    }
  }, [state])

  //object format for csv download

  const columns = [
    {
      id: "states",
      displayName: "State",
    },
    {
      id: "time",
      displayName: "Time",
    },
  ]

  return (
    <>
      <Container className="mx-auto text-center">
        <Row>
          <Col>
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
            <Sync />
            <br></br>
            <p>Select sedation state</p>
            <ButtonGroup toggle vertical="true">
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
                  <span
                    style={{
                      display: state === radio.name ? "" : "none",
                    }}
                  >
                    <FaCheck />
                  </span>
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
            <br></br>
            <CsvDownloader
              className="btn btn-primary"
              filename={pid}
              columns={columns}
              datas={states}
            >
              <Button>Download to CSV</Button>
            </CsvDownloader>
          </Col>
        </Row>
      </Container>
    </>
  )
}
