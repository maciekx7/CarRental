import React from 'react'
import MarkList from "./lists/MarkList"
import ModelList from "./lists/ModelList"
import { Col, Form } from 'react-bootstrap'


function Filter()
{

return(
    <Col>
                <Form >
                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <h3 className="title3">Marka:</h3>
                        <MarkList />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <h3 className="title3">Model:</h3>
                        <ModelList />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State of Car:</Form.Label>
                        <Form.Check name="state" label="Avilable" type="radio"/>
                        <Form.Check name="state" label="All" type="radio"/>
                    </Form.Group>
                </Form>
            </Col>
)
}


export default Filter