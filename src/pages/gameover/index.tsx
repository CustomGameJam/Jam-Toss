import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const GameOver = () => {
    return (
        <div className='p-3 fullH' style={{ backgroundColor: 'black' }}>

            <Row style={{
                display:'flex',
                justifyContent:'center'
            }}>
                <Col className='gameovergif' xs={12}>
                </Col>
                <Col xs={12}>
                    <div className='writeEditing mb-5'>
                        <h4>Score</h4>
                        <h1>90</h1>
                    </div>

                </Col>
                <Col xs={6}>
                    <Form style={{display: "flex",  alignItems: "baseline", justifyContent:"center"}}>
                        <Form.Group className="mb-3 white" controlId="formBasicEmail">
                            {/* <Form.Label style={{color:"white"}}>Username :</Form.Label> */}
                            <Form.Control style={{border: "1px solid #141619", borderRadius:"unset"}} type="email" placeholder='Enter username' />
                            
                        </Form.Group>

                        <Button variant="danger" type="submit" style={{
                            border: "1px solid #141619",
                            borderRadius:"unset",
                            backgroundColor:"grey"
                        }}>
                            Save
                        </Button>
                    </Form>

                </Col>
            </Row>

        </div>
    )
}

export default GameOver;