import {Col, Row, Container} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function LeaderBoard() {
    return (
        <div className='p-3 bgDark fullH'>
            
            <Row>
                <Col className='winnergif' xs={12}>
                </Col>
                <Col xs={12}>
                    <Table striped bordered hover variant="dark" className='m-0 px-5'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Player</th>
                                <th>Score</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>

                                <td>1500</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>2000</td>
                            </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>

        </div>
    );
}

export default LeaderBoard;