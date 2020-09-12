import React, { useState } from "react"
import moment from "moment"

import boopSfx from "../sounds/boop.mp3"
import useSound from "use-sound"
import { Row, Col, Button } from "react-bootstrap"

export default function Sync() {
  const [sync, setSync] = useState("Synced time")
  const [play] = useSound(boopSfx)

  return (
    <Row>
      <Col className="mx-auto">
        <Button
          size="lg"
          variant="secondary"
          onClick={e => {
            setSync(moment().format("YYYY-MM-DD h:mm:ss SSS"))
            play()
          }}
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
  )
}
