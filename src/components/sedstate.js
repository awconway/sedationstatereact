import React, { useState, useEffect, useRef } from "react"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { Container, Row, Col, Form } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import Sync from "../components/sync"
import moment from "moment"
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//classNames and values for sedation state buttons
const radios = require("../data/radio.json")

export default function SedationState({ client }) {
  //hook for entering participant ID
  const [pid, setPid] = useState(null)
  //hook for value of sedation state buttons
  const [state, setState] = useState(null)
  //hook for csv download
  const [states, setStates] = useState([])


  //hook for updating state on button press but not on first load
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {


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

  return (
    <>
      <Container className="mx-auto text-center">
        <Row>
          <Col>
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
            <ExcelFile element={<button 
            className="btn btn-primary">Download Data</button>}
            filename={pid}>
                <ExcelSheet data={states} name="States">
                    <ExcelColumn label="State" value="states"/>
                    <ExcelColumn label="Time" value="time"/>
                </ExcelSheet>
                </ExcelFile>
          </Col>
        </Row>
      </Container>
    </>
  )
}
